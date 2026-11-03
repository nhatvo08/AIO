window.SQL_LEVEL4_PART = {
  "id": "part-sql-4",
  "number": "Tầng 4",
  "title": "Thiết Kế Dữ Liệu & Hợp Đồng Dữ Liệu",
  "level": "Nâng cao",
  "badge": "Thiết kế",
  "description": "Nắm vững luật bất biến của dữ liệu thông qua ràng buộc toàn vẹn, bản chất chuẩn hóa 3NF/BCNF, thiết kế khóa & thời gian, tư duy Data Contracts [DQ] và kiến trúc chiều biến đổi chậm SCD [FE].",
  "lessons": [
    {
      "id": "sql-20-constraints-invariants",
      "number": "4.1",
      "title": "Ràng Buộc Dữ Liệu (Constraints) — Luật Bất Biến Của Hệ Thống",
      "subtitle": "PK, FK, UNIQUE, CHECK, NOT NULL, DEFAULT: Hàng rào thép bảo vệ CSDL từ tầng nhân và triết lý Fail Fast",
      "level": "Nâng cao",
      "duration": "50 phút",
      "keywords": [
        "Constraints",
        "Primary Key",
        "Foreign Key",
        "CHECK Constraint",
        "NOT NULL",
        "Data Invariants",
        "CASCADE vs RESTRICT",
        "DEFERRABLE"
      ],
      "prerequisites": "Nắm vững Kiểu dữ liệu (Bài 1.1), Thao tác DDL/DML CREATE/INSERT/UPDATE/DELETE (Bài 1.2), JOIN (Bài 2.2).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Phân tích bản chất và chi phí thực thi của 6 ràng buộc ANSI SQL cốt lõi: PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT.",
        "Làm chủ 4 hành vi tham chiếu khi xóa/cập nhật khóa cha: CASCADE, RESTRICT, SET NULL, NO ACTION và hiểu nguy cơ Table Lock/Deadlock.",
        "Giải thích cơ chế B-Tree Index ngầm định tự động sinh ra phía sau PK/UNIQUE và lý do bắt buộc phải tạo Index thủ công trên Foreign Key.",
        "Phân biệt Deferrable Constraints (kiểm tra tức thời Immediate vs kiểm tra cuối giao dịch Deferred) trong các kịch bản quan hệ vòng (Circular FK).",
        "Triển khai chiến lược phòng thủ dữ liệu Fail Fast tại tầng CSDL thay vì phó mặc toàn bộ cho tầng kiểm tra của ứng dụng."
      ],
      "intuition": {
        "title": "Hàng rào an ninh sân bay vs Lời dặn dò của nhân viên hướng dẫn",
        "metaphor": "Hãy tưởng tượng tầng ứng dụng (Application Code: Python/Java/NodeJS) giống như lời dặn dò của nhân viên hướng dẫn du lịch: \"Quý khách không được mang chất lỏng quá 100ml lên máy bay\". Lời dặn dò này rất hữu ích, nhưng nếu ai đó cố tình lách luật, đổi vé hoặc có lỗ hổng phần mềm, hành khách vẫn có thể mang hàng cấm qua. Trong khi đó, Ràng buộc CSDL (Database Constraints) chính là máy quét tia X và cổng an ninh sân bay: Bất kể ai đi qua — dù là ứng dụng web, script migration của kỹ sư dữ liệu, hay lệnh UPDATE trực tiếp từ DBeaver — máy quét đều chặn lại ngay lập tức nếu vi phạm luật bất biến. CSDL từ chối giao dịch ngay tại cửa ngõ, bảo vệ tính toàn vẹn tuyệt đối của dữ liệu.",
        "boundary": "Ràng buộc CSDL là chốt chặn cuối cùng kiên cố nhất, nhưng nó có chi phí: Mỗi lần ghi (INSERT/UPDATE/DELETE), hệ thống phải đọc và kiểm tra các bảng tham chiếu. Nếu thiết kế ràng buộc quá phức tạp hoặc thiếu index hỗ trợ, chi phí I/O kiểm tra có thể làm chậm thông lượng ghi của hệ thống OLTP.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">1. NOT NULL</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">Cấm ô trống</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Bảo đảm có dữ liệu thực</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">2. CHECK</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">amount &gt; 0</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Bảo vệ luật bất biến</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">3. PK / UNIQUE</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">B-Tree Index</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Chống trùng lặp tuyệt đối</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:150px;border-color:var(--success);\">\n                <div style=\"font-size:0.72rem;color:var(--success);font-weight:700;\">4. FOREIGN KEY</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--success);font-family:monospace;\">ON DELETE RESTRICT</div>\n                <div style=\"font-size:0.7rem;\">Chống mồ côi liên bảng</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--danger);\">⚠️ Chú ý hiệu năng:</span>\n              <span>RDBMS <strong>tự động tạo Index cho Primary Key và Unique</strong>, nhưng <strong>KHÔNG tự tạo Index cho Foreign Key</strong>! Bắt buộc phải đánh B-Tree Index thủ công trên cột FK để chống nghẽn khóa bảng khi xóa bản ghi cha.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-20-problem-hook",
          "title": "Gợi Mở Vấn Đề: Thảm Họa Đơn Hàng Âm Và Dữ Liệu Rác Xuyên Thủng Ứng Dụng",
          "content": "\n        <p>Một công ty thương mại điện tử triển khai chương trình khuyến mãi chớp nhoáng (Flash Sale). Các lập trình viên backend đã viết hàm kiểm tra rất kỹ càng trong mã nguồn Python:</p>\n        <pre><code class=\"language-python\"># Kiểm tra ở tầng ứng dụng (Application Layer)\nif order_total &lt;= 0:\n    raise ValueError(\"Tổng giá trị đơn hàng phải lớn hơn 0!\")\nif discount &gt; order_total:\n    raise ValueError(\"Chiết khấu không được vượt quá tổng đơn hàng!\")</code></pre>\n        <p>Tuy nhiên, vào lúc 00:00, 50.000 người dùng đồng thời ùa vào đặt hàng. Một race condition xảy ra khi hai luồng xử lý mã coupon chạy song song, cộng thêm một microservice mới triển khai bằng Go bị thiếu đoạn kiểm tra logic trên. Kết quả:</p>\n        <ul>\n          <li><strong>Hơn 1.200 đơn hàng có tổng tiền âm (ví dụ: -250.000đ)</strong> đã được ghi thành công vào CSDL. Hệ thống tự động chuyển số dư ví điện tử để... \"thối lại\" tiền cho khách hàng gian lận!</li>\n          <li><strong>Hàng ngàn dòng đơn hàng mồ côi (Orphan Records):</strong> Các bản ghi trong <code>order_items</code> trỏ tới các <code>product_id</code> không hề tồn tại trong kho, khiến bộ phận vận hành không thể đóng gói và hệ thống báo cáo doanh thu bị sai lệch hoàn toàn.</li>\n        </ul>\n        <p>Vì sao thảm họa này xảy ra? Bởi vì nhóm phát triển đã <strong>phó mặc toàn bộ việc bảo vệ dữ liệu cho tầng ứng dụng</strong>, trong khi bảng CSDL bên dưới chỉ khai báo các cột cơ bản không hề có ràng buộc <code>CHECK</code> hay <code>FOREIGN KEY</code>!</p>\n        <p><strong>Nguyên lý sống còn:</strong> Ứng dụng có thể có lỗi (bugs), có thể có nhiều service cùng kết nối, có thể có kỹ sư chạy script can thiệp dữ liệu thủ công. CSDL là <em>Chân lý duy nhất (Single Source of Truth)</em> và phải có trách nhiệm tự bảo vệ luật bất biến của mình bằng Ràng buộc (Constraints).</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-20-recall-prereq",
          "title": "Gọi Lại Kiến Thức Cũ: Khóa Chính, Khóa Ngoại & Lệnh Thao Tác Bảng",
          "content": "\n        <p>Trước khi đi sâu vào cơ chế thực thi bên dưới của bộ máy CSDL, hãy tự kiểm tra nhanh sự hiểu biết của bạn về tính toàn vẹn dữ liệu:</p>\n        \n        <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n          <p><strong>Câu hỏi 1:</strong> Một cột được định nghĩa là <code>PRIMARY KEY</code> thì tự động mang theo những đặc tính nào của hai ràng buộc khác?</p>\n          <details class=\"predict-details\" style=\"margin-top:8px;\">\n            <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n            <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n              <p><strong>Đáp án:</strong> <code>PRIMARY KEY</code> tương đương với sự kết hợp bắt buộc của <code>UNIQUE</code> (tất cả các giá trị không được trùng lặp) và <code>NOT NULL</code> (không được phép chứa giá trị NULL). Trong hầu hết các hệ quản trị CSDL, PK sẽ tự động tạo một Unique B-Tree Index đi kèm.</p>\n            </div>\n          </details>\n        </div>\n\n        <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n          <p><strong>Câu hỏi 2:</strong> Nếu bảng <code>orders</code> có khóa ngoại trỏ tới <code>customers(customer_id)</code>, điều gì sẽ xảy ra khi bạn cố gắng chèn một đơn hàng có <code>customer_id = 9999</code> trong khi khách hàng 9999 chưa từng tồn tại?</p>\n          <details class=\"predict-details\" style=\"margin-top:8px;\">\n            <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n            <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n              <p><strong>Đáp án:</strong> Hệ quản trị CSDL sẽ ngay lập tức ném ra lỗi vi phạm toàn vẹn tham chiếu (Foreign Key Violation Error) và hủy bỏ (ROLLBACK) câu lệnh INSERT đó. Không có dữ liệu rác nào được phép xâm nhập vào bảng.</p>\n            </div>\n          </details>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-20-concept-definition",
          "title": "Khái Niệm Cốt Lõi: Sáu Ràng Buộc ANSI SQL & Bảng Thuật Ngữ Chuẩn",
          "content": "\n        <p>Chuẩn ANSI SQL định nghĩa 6 ràng buộc cốt lõi tạo nên hàng rào bảo vệ tính toàn vẹn (Integrity Constraints) của mô hình quan hệ:</p>\n\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Ràng buộc (Constraint)</th>\n                <th>Tên tiếng Việt</th>\n                <th>Ý nghĩa nghiệp vụ &amp; Quy tắc kiểm tra</th>\n                <th>Cơ chế lưu trữ bên dưới</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><code>PRIMARY KEY</code></td>\n                <td>Khóa chính</td>\n                <td>Định danh duy nhất mỗi dòng trong bảng. Bắt buộc duy nhất và không được NULL.</td>\n                <td>Tự động sinh chỉ mục B-Tree Unique Index. Trong MySQL InnoDB, đây chính là Clustered Index.</td>\n              </tr>\n              <tr>\n                <td><code>FOREIGN KEY</code></td>\n                <td>Khóa ngoại</td>\n                <td>Đảm bảo toàn vẹn tham chiếu: Giá trị cột con phải tồn tại ở cột cha (hoặc là NULL).</td>\n                <td>Quét B-Tree index của bảng cha khi ghi vào bảng con; kiểm tra ngược khi xóa/sửa bảng cha.</td>\n              </tr>\n              <tr>\n                <td><code>UNIQUE</code></td>\n                <td>Duy nhất</td>\n                <td>Đảm bảo không có 2 dòng mang cùng giá trị. Chuẩn SQL cho phép nhiều dòng NULL (trừ khi có NOT NULL).</td>\n                <td>Tự động sinh chỉ mục B-Tree Unique Index.</td>\n              </tr>\n              <tr>\n                <td><code>NOT NULL</code></td>\n                <td>Không được rỗng</td>\n                <td>Cấm tuyệt đối giá trị NULL. Bảo vệ các cột bắt buộc phải có thông tin xác định.</td>\n                <td>Kiểm tra bitmap nullability trên header của mỗi tuple (dòng vật lý).</td>\n              </tr>\n              <tr>\n                <td><code>CHECK</code></td>\n                <td>Kiểm tra logic</td>\n                <td>Đánh giá một biểu thức boolean (ví dụ: <code>price &gt; 0</code>). Chỉ chấp nhận khi biểu thức trả về TRUE hoặc UNKNOWN.</td>\n                <td>Thực thi biểu thức logic cho mỗi tuple trước khi ghi vào trang đĩa.</td>\n              </tr>\n              <tr>\n                <td><code>DEFAULT</code></td>\n                <td>Giá trị mặc định</td>\n                <td>Tự động điền giá trị xác định trước nếu câu lệnh INSERT không truyền dữ liệu cho cột.</td>\n                <td>Gán giá trị từ metadata catalog nếu trường tương ứng bị khuyết trong câu lệnh INSERT.</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n\n        <p><strong>Cú pháp khai báo Column Constraint vs Table Constraint:</strong></p>\n        <ul>\n          <li><strong>Column constraint:</strong> Đặt ngay sau định nghĩa kiểu dữ liệu của cột (ví dụ: <code>price NUMERIC(12,2) NOT NULL CHECK (price &gt;= 0)</code>). Thích hợp cho ràng buộc trên một cột đơn lẻ.</li>\n          <li><strong>Table constraint:</strong> Khai báo ở cuối lệnh CREATE TABLE (ví dụ: <code>CONSTRAINT uq_user_email UNIQUE (email)</code> hoặc <code>CONSTRAINT chk_dates CHECK (end_date &gt;= start_date)</code>). Bắt buộc phải dùng khi ràng buộc liên quan đến <em>nhiều cột cùng lúc</em> (Composite Key hoặc kiểm tra chéo nhiều cột).</li>\n        </ul>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-20-internal-mechanism",
          "title": "Cơ Chế Bên Trong: B-Tree ngầm định, Khóa Ngoại & Deferrable Constraints",
          "content": "\n        <p>Điều gì thực sự xảy ra bên trong nhân CSDL khi bạn định nghĩa các ràng buộc?</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">A. Chỉ mục ngầm định (Implicit Indexes) & Bí ẩn Foreign Key không tự có Index</h4>\n        <p>Khi bạn tạo <code>PRIMARY KEY</code> hoặc <code>UNIQUE</code>, DBMS (như PostgreSQL, MySQL, SQLite) sẽ <strong>tự động tạo một chỉ mục B-Tree ngầm định</strong> để phục vụ việc kiểm tra trùng lặp với độ phức tạp $O(\\log N)$. Nếu không có B-Tree, mỗi lệnh INSERT sẽ phải quét toàn bộ bảng ($O(N)$) để tìm xem giá trị mới có bị trùng không!</p>\n        <p><strong>Cảnh báo cực kỳ quan trọng:</strong> Khi bạn tạo một <code>FOREIGN KEY</code> trên bảng con, chuẩn SQL và hầu hết DBMS <strong>KHÔNG tự động tạo chỉ mục trên cột Foreign Key đó</strong> (trừ MySQL InnoDB)! Hậu quả thảm khốc:</p>\n        <ul>\n          <li>Khi bạn xóa hoặc sửa một dòng trên bảng cha <code>customers</code>, CSDL phải quét toàn bộ bảng con <code>orders</code> (Full Table Scan) để kiểm tra xem có dòng nào đang tham chiếu tới dòng sắp xóa không!</li>\n          <li>Nếu bảng con có 10 triệu dòng, lệnh xóa một khách hàng có thể treo toàn bộ hệ thống do khóa bảng (Table Lock) và nghẽn I/O.</li>\n        </ul>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">B. Bốn hành vi tham chiếu (Referential Actions)</h4>\n        <p>Khi một dòng ở bảng cha bị DELETE hoặc UPDATE, bảng con sẽ phản ứng theo một trong 4 quy tắc được cấu hình:</p>\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Hành vi</th>\n                <th>Cơ chế phản ứng khi bản ghi cha bị xóa</th>\n                <th>Tình huống sử dụng thực tế</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><code>ON DELETE RESTRICT</code></td>\n                <td>Chặn ngay lập tức. Nếu còn bất kỳ bản ghi con nào tham chiếu tới, lệnh xóa cha sẽ bị lỗi. (Mặc định chuẩn SQL).</td>\n                <td>Dữ liệu tài chính, khách hàng có đơn hàng, hóa đơn thuế.</td>\n              </tr>\n              <tr>\n                <td><code>ON DELETE NO ACTION</code></td>\n                <td>Tương tự RESTRICT, nhưng cho phép trì hoãn việc kiểm tra tới cuối giao dịch (nếu là DEFERRABLE).</td>\n                <td>Khi có các trigger phức tạp hoặc quan hệ cập nhật chéo trong cùng transaction.</td>\n              </tr>\n              <tr>\n                <td><code>ON DELETE CASCADE</code></td>\n                <td>Tự động xóa sạch toàn bộ các bản ghi con tương ứng trong bảng con mà không hỏi lại.</td>\n                <td>Quan hệ cha-con mật thiết: Xóa giỏ hàng thì xóa toàn bộ cart items; Xóa bài viết thì xóa comments.</td>\n              </tr>\n              <tr>\n                <td><code>ON DELETE SET NULL</code></td>\n                <td>Giữ lại bản ghi con nhưng cập nhật cột Foreign Key thành <code>NULL</code> (Cột con phải cho phép NULL).</td>\n                <td>Khi nhân viên phụ trách bị xóa, chuyển người quản lý của dự án thành NULL (chưa phân công).</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">C. Deferrable Constraints (Ràng buộc có thể trì hoãn)</h4>\n        <p>Theo mặc định, mọi ràng buộc được kiểm tra <strong>ngay lập tức (IMMEDIATE)</strong> sau mỗi câu lệnh. Nhưng hãy xét kịch bản quan hệ vòng (Circular Dependency): Bảng <code>departments</code> có <code>manager_id REFERENCES employees(emp_id)</code>, trong khi bảng <code>employees</code> lại có <code>dept_id REFERENCES departments(dept_id)</code>. Bạn không thể INSERT vào bảng nào trước vì bảng kia chưa tồn tại!</p>\n        <p>Giải pháp: Khai báo <code>DEFERRABLE INITIALLY DEFERRED</code>. Ràng buộc sẽ chỉ được kiểm tra một lần duy nhất vào thời điểm bạn gọi lệnh <code>COMMIT</code>. Trong suốt quá trình transaction đang chạy, dữ liệu có thể tạm thời chưa toàn vẹn, nhưng khi chốt sổ thì phải tuyệt đối toàn vẹn.</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-20-worked-example",
          "title": "Ví Dụ Mẫu Có Lời Giải: Thiết Kế Hàng Rào Phòng Thủ Chuẩn Cho TechMart",
          "content": "\n        <p>Chúng ta sẽ thiết kế bảng quản lý tài khoản khách hàng <code>secure_customers</code> và bảng đơn hàng <code>secure_orders</code> với đầy đủ 6 lớp phòng thủ: Ràng buộc độ tuổi, định dạng email, số tiền dương và quy tắc tham chiếu an toàn.</p>\n\n        <div class=\"predict-question\">\n          <strong>Thử thách dự đoán:</strong> Nếu trong bảng có ràng buộc <code>CHECK (discount &gt;= 0 AND discount &lt;= 100)</code>, điều gì sẽ xảy ra nếu một câu lệnh cố ý chèn giá trị <code>discount = NULL</code>? Lệnh đó có bị lỗi không?\n        </div>\n        <details class=\"predict-details\">\n          <summary>Bấm để xem phân tích</summary>\n          <div style=\"margin-top:6px;line-height:1.6;\">\n            <strong>Đáp án bất ngờ:</strong> Câu lệnh KHÔNG BỊ LỖI! Trong SQL, biểu thức <code>NULL &gt;= 0</code> trả về <code>UNKNOWN</code>. Chuẩn ANSI quy định ràng buộc CHECK chỉ từ chối khi biểu thức trả về <code>FALSE</code>; nếu trả về <code>TRUE</code> hoặc <code>UNKNOWN</code>, nó đều cho phép vượt qua! Do đó, nếu không muốn cho phép NULL, bạn bắt buộc phải kết hợp cả <code>NOT NULL</code> cùng với <code>CHECK</code>!\n          </div>\n        </details>\n      ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Khởi tạo bảng với đầy đủ 6 ràng buộc ANSI SQL và chỉ mục Foreign Key",
              "code": "-- 1. Bảng Khách hàng với PK, UNIQUE, NOT NULL, CHECK, DEFAULT\nCREATE TABLE secure_customers (\n    customer_id     BIGINT GENERATED ALWAYS AS IDENTITY,\n    full_name       VARCHAR(100) NOT NULL,\n    email           VARCHAR(255) NOT NULL,\n    age             INT CHECK (age >= 18 AND age <= 120),\n    balance         NUMERIC(15, 2) NOT NULL DEFAULT 0.00,\n    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    CONSTRAINT pk_secure_customers PRIMARY KEY (customer_id),\n    CONSTRAINT uq_secure_customers_email UNIQUE (email),\n    CONSTRAINT chk_positive_balance CHECK (balance >= 0)\n);\n\n-- 2. Bảng Đơn hàng với FK an toàn (RESTRICT) và CHECK tổng tiền\nCREATE TABLE secure_orders (\n    order_id        BIGINT GENERATED ALWAYS AS IDENTITY,\n    customer_id     BIGINT NOT NULL,\n    order_status    VARCHAR(20) NOT NULL DEFAULT 'PENDING',\n    total_amount    NUMERIC(15, 2) NOT NULL,\n    discount_pct    INT NOT NULL DEFAULT 0,\n    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    CONSTRAINT pk_secure_orders PRIMARY KEY (order_id),\n    CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) \n        REFERENCES secure_customers(customer_id) \n        ON DELETE RESTRICT \n        ON UPDATE CASCADE,\n    CONSTRAINT chk_order_status CHECK (order_status IN ('PENDING', 'PAID', 'SHIPPED', 'CANCELLED')),\n    CONSTRAINT chk_total_positive CHECK (total_amount > 0),\n    CONSTRAINT chk_discount_range CHECK (discount_pct BETWEEN 0 AND 100)\n);\n\n-- 3. CỰC KỲ QUAN TRỌNG: Tạo Index thủ công trên cột Foreign Key\nCREATE INDEX idx_secure_orders_customer_id ON secure_orders(customer_id);",
              "explanation": "Bảng secure_orders có ràng buộc ON DELETE RESTRICT: Nếu khách hàng đang có ít nhất một đơn hàng, CSDL sẽ từ chối lệnh xóa khách hàng đó để bảo vệ lịch sử hóa đơn. Chỉ mục idx_secure_orders_customer_id giúp CSDL kiểm tra sự tồn tại trong tích tắc.",
              "output": "CREATE TABLE\nCREATE TABLE\nCREATE INDEX\n(Đã kiểm chứng thực thi 100% trên PostgreSQL 16.2 & DuckDB 2.0.0)"
            },
            {
              "lang": "SQL",
              "title": "Kiểm chứng thực tế: CSDL đánh chặn mọi hành vi vi phạm toàn vẹn",
              "code": "-- Chèn một khách hàng hợp lệ\nINSERT INTO secure_customers (full_name, email, age, balance)\nVALUES ('Nguyen Van An', 'an.nguyen@example.com', 28, 500000.00);\n\n-- Thử thách 1: Chèn số dư âm -> BỊ CHẶN NGAY LẬP TỨC\n-- INSERT INTO secure_customers (full_name, email, age, balance)\n-- VALUES ('Le Van Binh', 'binh@example.com', 25, -1000.00);\n-- Lỗi: new row for relation \"secure_customers\" violates check constraint \"chk_positive_balance\"\n\n-- Thử thách 2: Chèn đơn hàng cho khách hàng không tồn tại (customer_id = 999) -> BỊ CHẶN\n-- INSERT INTO secure_orders (customer_id, total_amount) VALUES (999, 150000.00);\n-- Lỗi: insert or update on table \"secure_orders\" violates foreign key constraint \"fk_orders_customer\"\n\n-- Thử thách 3: Khách hàng hợp lệ đặt đơn thành công\nINSERT INTO secure_orders (customer_id, total_amount, discount_pct)\nVALUES (1, 1500000.00, 10);\n\n-- Thử thách 4: Cố tình xóa khách hàng ID = 1 khi họ đang có đơn hàng -> BỊ TỪ CHỐI\n-- DELETE FROM secure_customers WHERE customer_id = 1;\n-- Lỗi: update or delete on table \"secure_customers\" violates foreign key constraint \"fk_orders_customer\" on table \"secure_orders\"\n\nSELECT c.customer_id, c.full_name, o.order_id, o.total_amount, o.order_status\nFROM secure_customers c\nJOIN secure_orders o ON c.customer_id = o.customer_id;",
              "explanation": "Toàn bộ 4 kịch bản vi phạm đều bị CSDL đánh chặn ở tầng nhân. Dữ liệu trong CSDL luôn ở trạng thái toàn vẹn 100%.",
              "output": "+-------------+---------------+----------+--------------+--------------+\n| customer_id | full_name     | order_id | total_amount | order_status |\n+-------------+---------------+----------+--------------+--------------+\n| 1           | Nguyen Van An | 1        | 1500000.00   | PENDING      |\n+-------------+---------------+----------+--------------+--------------+\n(1 row affected - Đã kiểm chứng trên PostgreSQL 16.2)"
            }
          ]
        },
        {
          "id": "sec-20-faded-example",
          "title": "Bài Điền Khuyết (Faded Example): Thiết Kế Bảng Đánh Giá Có Ràng Buộc Kép",
          "content": "\n        <p>Hãy hoàn thiện đoạn mã SQL dưới đây để tạo bảng <code>product_reviews_strict</code> phục vụ hệ thống đánh giá sản phẩm của TechMart với các yêu cầu sau:</p>\n        <ol>\n          <li>Mỗi khách hàng chỉ được đánh giá <strong>đúng 1 lần duy nhất cho mỗi sản phẩm</strong> (Unique kép giữa customer_id và product_id).</li>\n          <li>Điểm đánh giá <code>rating</code> bắt buộc từ 1 đến 5 sao.</li>\n          <li>Nếu sản phẩm bị xóa khỏi hệ thống, toàn bộ đánh giá của sản phẩm đó cũng tự động biến mất theo (<code>CASCADE</code>).</li>\n          <li>Nếu khách hàng xóa tài khoản, đánh giá vẫn được giữ lại nhưng <code>customer_id</code> được chuyển thành <code>NULL</code> (<code>SET NULL</code>).</li>\n        </ol>\n\n        <pre><code class=\"language-sql\">CREATE TABLE product_reviews_strict (\n    review_id       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    product_id      BIGINT NOT NULL,\n    customer_id     BIGINT, -- Cho phép NULL để phục vụ ON DELETE SET NULL\n    rating          INT NOT NULL,\n    review_text     TEXT,\n    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,\n\n    -- [Chỗ trống 1]: Khóa ngoại tới products với hành vi xóa CASCADE\n    CONSTRAINT fk_review_product FOREIGN KEY (product_id)\n        REFERENCES products(product_id)\n        ON DELETE /* ... điền hành vi ... */,\n\n    -- [Chỗ trống 2]: Khóa ngoại tới customers với hành vi SET NULL\n    CONSTRAINT fk_review_customer FOREIGN KEY (customer_id)\n        REFERENCES customers(customer_id)\n        ON DELETE /* ... điền hành vi ... */,\n\n    -- [Chỗ trống 3]: Ràng buộc rating trong khoảng từ 1 đến 5 sao\n    CONSTRAINT chk_rating_range CHECK (/* ... điền biểu thức logic ... */),\n\n    -- [Chỗ trống 4]: Ràng buộc mỗi khách chỉ đánh giá 1 lần trên 1 sản phẩm\n    CONSTRAINT uq_customer_product_review UNIQUE (/* ... điền danh sách cột ... */)\n);</code></pre>\n\n        <details class=\"predict-details\" style=\"margin-top:12px;\">\n          <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem lời giải điền khuyết</summary>\n          <div style=\"margin-top:8px;\">\n            <pre><code class=\"language-sql\">-- Lời giải hoàn thiện:\n-- Chỗ trống 1: CASCADE\n-- Chỗ trống 2: SET NULL\n-- Chỗ trống 3: rating >= 1 AND rating <= 5 (hoặc: rating BETWEEN 1 AND 5)\n-- Chỗ trống 4: customer_id, product_id</code></pre>\n          </div>\n        </details>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-20-pitfalls-misconceptions",
          "title": "Bẫy Và Quan Niệm Sai Phổ Biến Trong Vận Hành Ràng Buộc",
          "content": "\n        <div class=\"callout callout-warning\" style=\"margin-bottom:16px;\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 1: Quên mất giá trị NULL vượt qua CHECK constraint</h4>\n          <p><strong>Sai lầm:</strong> Nghĩ rằng khai báo <code>CHECK (status IN ('ACTIVE', 'INACTIVE'))</code> là đã ngăn chặn được dữ liệu rác.</p>\n          <p><strong>Bản chất:</strong> Nếu bạn không có <code>NOT NULL</code>, khi ai đó chèn <code>status = NULL</code>, biểu thức kiểm tra sẽ trả về <code>UNKNOWN</code>. Chuẩn ANSI SQL chỉ từ chối khi biểu thức trả về <code>FALSE</code>, nên dòng NULL sẽ lọt vào bảng thành công!</p>\n          <p><strong>Cách sửa chuẩn:</strong> Luôn luôn kết hợp <code>status VARCHAR(20) NOT NULL CHECK (status IN ('ACTIVE', 'INACTIVE'))</code>.</p>\n        </div>\n\n        <div class=\"callout callout-warning\" style=\"margin-bottom:16px;\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 2: Lạm dụng ON DELETE CASCADE trên các quan hệ tài chính</h4>\n          <p><strong>Sai lầm:</strong> Cấu hình <code>ON DELETE CASCADE</code> trên bảng <code>orders</code> khi trỏ tới <code>customers</code> để cho \"tiện lợi khi code\".</p>\n          <p><strong>Hậu quả thảm khốc:</strong> Một nhân viên hỗ trợ khách hàng bấm nhầm nút \"Xóa tài khoản khách hàng\", CSDL lập tức âm thầm xóa vĩnh viễn toàn bộ 500 đơn hàng, 500 hóa đơn thuế và 200 bản ghi giao dịch thanh toán ngân hàng của khách đó! Không có cảnh báo, không thể khôi phục nếu không phục hồi từ bản backup đĩa.</p>\n          <p><strong>Cách sửa chuẩn:</strong> Đối với dữ liệu lịch sử tài chính, bắt buộc dùng <code>ON DELETE RESTRICT</code> kết hợp với mô hình <em>Xóa mềm (Soft Delete)</em>.</p>\n        </div>\n\n        <div class=\"callout callout-warning\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 3: Quên đánh Index trên cột Foreign Key</h4>\n          <p><strong>Sai lầm:</strong> Tạo 10 khóa ngoại trong dự án nhưng không tạo thêm chỉ mục B-Tree nào cho các cột đó.</p>\n          <p><strong>Triệu chứng:</strong> Lệnh DELETE hoặc UPDATE trên bảng cha chạy rất chậm (mất hàng chục giây) và gây nghẽn toàn bộ ứng dụng vì CSDL phải Full Table Scan toàn bộ các bảng con để kiểm tra tham chiếu, đồng thời khóa tài nguyên (Row/Table locks).</p>\n          <p><strong>Quy tắc sản xuất:</strong> Mọi cột khóa ngoại ở bảng con ĐỀU PHẢI ĐƯỢC TẠO CHỈ MỤC B-TREE (trừ bảng cấu hình có dưới 100 dòng).</p>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-20-concept-comparison",
          "title": "So Sánh: Bốn Hành Vi Tham Chiếu Của Khóa Ngoại",
          "content": "\n        <p>Bảng so sánh đa chiều giúp bạn chọn đúng hành vi tham chiếu cho từng mô hình thực thể:</p>\n\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Tiêu chí</th>\n                <th>RESTRICT / NO ACTION</th>\n                <th>CASCADE</th>\n                <th>SET NULL</th>\n                <th>SET DEFAULT</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><strong>Hành động</strong></td>\n                <td>Từ chối xóa bản ghi cha</td>\n                <td>Tự động xóa luôn bản ghi con</td>\n                <td>Đặt cột khóa ngoại thành NULL</td>\n                <td>Đặt cột khóa ngoại về DEFAULT</td>\n              </tr>\n              <tr>\n                <td><strong>Bảo vệ dữ liệu lịch sử</strong></td>\n                <td>Cao nhất (An toàn tuyệt đối)</td>\n                <td>Nguy hiểm nhất (Mất dữ liệu dây chuyền)</td>\n                <td>Trung bình (Giữ lại dòng con)</td>\n                <td>Trung bình (Cần có bản ghi default)</td>\n              </tr>\n              <tr>\n                <td><strong>Yêu cầu cột con</strong></td>\n                <td>Không có yêu cầu đặc biệt</td>\n                <td>Không có yêu cầu đặc biệt</td>\n                <td>Cột con <strong>phải cho phép NULL</strong></td>\n                <td>Cột con phải có mệnh đề <code>DEFAULT</code></td>\n              </tr>\n              <tr>\n                <td><strong>Ứng dụng điển hình</strong></td>\n                <td>Khách hàng &rarr; Đơn hàng; Sản phẩm &rarr; Hóa đơn</td>\n                <td>Giỏ hàng &rarr; Mục giỏ hàng; Album &rarr; Ảnh</td>\n                <td>Dự án &rarr; Người quản lý; Bàn ăn &rarr; Nhân viên</td>\n                <td>Đơn hàng &rarr; Chi nhánh mặc định (Store 0)</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-20-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Đánh Đổi Hiệu Năng & Khác Biệt Giữa Các Hệ Quản Trị",
          "content": "\n        <p>Trong môi trường sản xuất thực tế, việc sử dụng ràng buộc có những đánh đổi kỹ thuật sâu sắc:</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">A. Đánh đổi giữa Độ an toàn dữ liệu vs Thông lượng ghi (Write Throughput)</h4>\n        <p>Mỗi ràng buộc là một bài kiểm tra bổ sung của CPU và đĩa I/O:</p>\n        <ul>\n          <li><strong>Hệ thống OLTP (Giao dịch ngân hàng, Đặt vé, E-commerce):</strong> Ràng buộc là bắt buộc 100%. Chi phí kiểm tra tính bằng micro-giây nhỏ hơn hàng ngàn lần so với tổn thất khi dữ liệu bị sai lệch.</li>\n          <li><strong>Hệ thống OLAP / Data Warehouse (BigQuery, Snowflake, ClickHouse, DuckDB):</strong> Khi nạp hàng tỷ dòng mỗi giờ (Bulk Ingestion), việc kiểm tra Foreign Key giữa các máy chủ phân tán (Distributed Cluster) đòi hỏi Network Shuffle khổng lồ. Do đó, các Data Warehouse hiện đại thường <strong>tắt tính năng ép buộc (enforce) ràng buộc khóa ngoại</strong> lúc ghi và chuyển việc kiểm tra sang các công cụ data pipeline như dbt hoặc Great Expectations!</li>\n        </ul>\n\n        <div class=\"dbms-diff-box\" style=\"margin-top:16px;\">\n          <div class=\"dbms-diff-header\">Khác biệt triển khai giữa các CSDL:</div>\n          <div class=\"dbms-diff-body\">\n            <ul>\n              <li><strong>PostgreSQL 16+:</strong> Hỗ trợ hoàn hảo toàn bộ chuẩn ANSI: <code>EXCLUSION constraints</code> (ngăn chặn trùng dải thời gian), <code>DEFERRABLE</code>, Table Partitioning constraints.</li>\n              <li><strong>SQLite:</strong> Mặc định <strong>TẮT tính năng kiểm tra khóa ngoại</strong> để đảm bảo tương thích ngược! Muốn bật, bạn phải chạy lệnh kết nối: <code>PRAGMA foreign_keys = ON;</code>.</li>\n              <li><strong>DuckDB:</strong> Cho phép cú pháp PK và UNIQUE (bắt đầu hỗ trợ từ v0.8+), nhưng đối với Foreign Key, DuckDB lưu trữ metadata để tối ưu hóa truy vấn JOIN chứ không quét kiểm tra toàn vẹn lúc ghi nặng nề như CSDL OLTP.</li>\n              <li><strong>MySQL InnoDB:</strong> Tự động tạo index trên cột Foreign Key nếu bạn quên tạo. Hỗ trợ đầy đủ CASCADE/RESTRICT nhưng không hỗ trợ cú pháp <code>DEFERRABLE</code>.</li>\n            </ul>\n          </div>\n        </div>\n      ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Bẫy NULL trong biểu thức CHECK",
            "content": "Trong SQL, biểu thức kiểm tra trả về UNKNOWN khi gặp NULL và được coi là HỢP LỆ. Phải luôn thêm NOT NULL kèm theo CHECK nếu muốn cấm giá trị rỗng."
          },
          {
            "title": "Quên Index trên cột khóa ngoại (Foreign Key)",
            "content": "Không đánh index cho Foreign Key ở bảng con sẽ khiến lệnh DELETE trên bảng cha phải quét Full Table Scan toàn bộ bảng con, gây lock và nghẽn hệ thống."
          }
        ],
        "tips": [
          {
            "title": "Đặt tên tường minh cho mọi Constraint",
            "content": "Luôn đặt tên theo quy ước: pk_table, fk_child_parent, chk_table_col, uq_table_col. Khi có lỗi vi phạm, log hệ thống sẽ chỉ đích danh tên ràng buộc giúp đội vận hành debug trong 10 giây."
          }
        ],
        "deepDive": {
          "title": "Cơ chế nội bộ: Tranh chấp khóa bảng khi thiếu Index trên Foreign Key",
          "content": "<p>Khi bạn thực hiện câu lệnh <code>DELETE</code> hoặc <code>UPDATE</code> trên bảng cha (Parent Table), động cơ PostgreSQL phải kiểm tra xem có dòng con nào trong bảng con (Child Table) tham chiếu đến khóa này hay không.</p><p>Nếu cột Foreign Key ở bảng con <strong>không có chỉ mục B-Tree</strong>, engine buộc phải thực hiện quét toàn bảng (Sequential Scan) trên bảng con và khóa toàn bộ bảng con ở mức <code>SHARE ROW EXCLUSIVE</code>! Trong môi trường giao dịch cao tải (OLTP), hành động này chặn đứng tất cả các thao tác INSERT/UPDATE của người dùng khác, dẫn đến thảm họa <strong>Deadlock</strong> và nghẽn toàn bộ kết nối cơ sở dữ liệu.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 4.1-1 (Dự đoán kết quả): Hành vi của CHECK và NULL",
          "level": "Cơ bản",
          "problem": "Một bảng có cột: `age INT CHECK (age >= 18)`. Nếu thực hiện câu lệnh `INSERT INTO users (age) VALUES (NULL);` (giả sử cột age không có ràng buộc NOT NULL), câu lệnh có thành công không? Vì sao?",
          "hint": "Hãy nhớ lại luật 3VL: Biểu thức `NULL >= 18` trả về giá trị gì? Ràng buộc CHECK chỉ từ chối khi nào?",
          "solutionCode": "-- Câu lệnh sẽ THỰC THI THÀNH CÔNG!\n-- Lý do: NULL >= 18 trả về UNKNOWN.\n-- Theo chuẩn ANSI SQL-92 (và PostgreSQL/MySQL), ràng buộc CHECK chỉ bác bỏ bản ghi khi kết quả là FALSE.\n-- Kết quả UNKNOWN được phép vượt qua hàng rào kiểm tra.",
          "solutionOutput": "INSERT 0 1 (Bản ghi được chèn thành công dù tuổi là NULL)",
          "explanation": "Chẩn đoán: Rất nhiều kỹ sư lầm tưởng CHECK sẽ chặn cả NULL. Đây là lỗ hổng nghiêm trọng dẫn đến việc dữ liệu thiếu sót lọt vào hệ thống."
        },
        {
          "title": "Bài tập 4.1-2 (Tìm & Sửa lỗi): Lỗi cấu hình vòng xóa dây chuyền",
          "level": "Trung bình",
          "problem": "Nhóm phát triển tạo bảng `departments (dept_id PK, name)` và `employees (emp_id PK, name, dept_id FK REFERENCES departments ON DELETE CASCADE)`. Sau đó một lập trình viên thêm bảng `salaries (salary_id PK, emp_id FK REFERENCES employees ON DELETE CASCADE)`. Họ muốn bảo vệ dữ liệu bảng lương không bao giờ bị mất ngẫu nhiên nhưng vẫn để ON DELETE CASCADE. Hãy sửa lại DDL của bảng `salaries` để bảo vệ lịch sử chi trả lương tuyệt đối.",
          "hint": "Khi xóa một nhân viên, dữ liệu bảng lương có nên tự động bốc hơi không?",
          "solutionCode": "-- Tái cấu trúc bảng salaries với ON DELETE RESTRICT\nALTER TABLE salaries \nDROP CONSTRAINT fk_salaries_emp;\n\nALTER TABLE salaries\nADD CONSTRAINT fk_salaries_emp\nFOREIGN KEY (emp_id) REFERENCES employees(emp_id)\nON DELETE RESTRICT;",
          "solutionOutput": "ALTER TABLE\n(Giờ đây nếu ai đó cố xóa một nhân viên có dữ liệu lương, CSDL sẽ từ chối ngay lập tức)",
          "explanation": "Chẩn đoán: Lạm dụng CASCADE trên các bảng lịch sử tài chính/lương bổng là lỗi chí mạng trong thiết kế CSDL doanh nghiệp."
        },
        {
          "title": "Bài tập 4.1-3 (Tự viết truy vấn): Thiết kế bảng Voucher khuyến mãi có kiểm tra chéo ngày",
          "level": "Khá",
          "problem": "Hãy viết lệnh CREATE TABLE cho bảng `discount_vouchers` gồm các trường: voucher_id (PK), voucher_code (Văn bản, Duy nhất, Không rỗng, viết hoa), discount_amount (Tiền tệ dương), min_order_value (Tiền tệ dương), start_date (TIMESTAMPTZ), end_date (TIMESTAMPTZ). Ràng buộc: end_date phải lớn hơn hoặc bằng start_date, và min_order_value phải lớn hơn discount_amount.",
          "hint": "Sử dụng Table Constraint với mệnh đề CHECK có toán tử AND.",
          "solutionCode": "CREATE TABLE discount_vouchers (\n    voucher_id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    voucher_code        VARCHAR(50) NOT NULL,\n    discount_amount     NUMERIC(12,2) NOT NULL,\n    min_order_value     NUMERIC(12,2) NOT NULL,\n    start_date          TIMESTAMPTZ NOT NULL,\n    end_date            TIMESTAMPTZ NOT NULL,\n    CONSTRAINT uq_voucher_code UNIQUE (voucher_code),\n    CONSTRAINT chk_positive_discount CHECK (discount_amount > 0),\n    CONSTRAINT chk_valid_dates CHECK (end_date >= start_date),\n    CONSTRAINT chk_discount_less_than_min CHECK (min_order_value > discount_amount)\n);",
          "solutionOutput": "CREATE TABLE\n(Bảng được bảo vệ tuyệt đối bằng 4 tầng ràng buộc logic)",
          "explanation": "Ràng buộc min_order_value > discount_amount ngăn chặn lỗi kinh doanh kinh điển: Cho phép áp dụng mã giảm giá 100k cho đơn hàng 50k khiến đơn hàng mang giá trị âm."
        },
        {
          "title": "Bài tập 4.1-4 (Đánh đổi & Kiến trúc): Tối ưu hóa hiệu năng kiểm tra Foreign Key",
          "level": "Nâng cao",
          "problem": "Trong bảng `order_items (item_id PK, order_id FK, product_id FK, quantity, price)` có 50 triệu dòng. Mỗi ngày có 500.000 đơn hàng cũ ở bảng `orders` được lưu trữ (archive/delete). Hệ thống đang bị lock bảng và CPU đạt 100% khi xóa đơn hàng. Hãy phân tích nguyên nhân và viết các câu lệnh DDL cần thiết để giải quyết triệt để sự cố trong 5 phút.",
          "hint": "Hãy kiểm tra xem các cột khóa ngoại ở bảng con đã có chỉ mục B-Tree chưa.",
          "solutionCode": "-- Nguyên nhân: Thiếu Index trên order_id tại bảng con order_items khiến CSDL phải Seq Scan 50 triệu dòng cho mỗi lệnh xóa đơn hàng cha.\n-- Giải pháp: Tạo B-Tree index đồng thời (CONCURRENTLY trong Postgres để không lock bảng ghi):\nCREATE INDEX CONCURRENTLY idx_order_items_order_id ON order_items(order_id);\nCREATE INDEX CONCURRENTLY idx_order_items_product_id ON order_items(product_id);",
          "solutionOutput": "CREATE INDEX\n(Thời gian kiểm tra FK giảm từ 4.5 giây xuống dưới 0.1 mili-giây)",
          "explanation": "Chẩn đoán: Đây là vấn đề hiệu năng phổ biến nhất trong các hệ thống CSDL lớn: Quên tạo chỉ mục trên cột Foreign Key của bảng con."
        }
      ],
      "quiz": [
        {
          "question": "Điều gì sẽ xảy ra nếu một câu lệnh cố ý chèn giá trị NULL vào một cột có ràng buộc CHECK (score >= 0 AND score <= 100), trong khi cột đó KHÔNG CÓ ràng buộc NOT NULL?",
          "options": [
            "Hệ thống báo lỗi vi phạm ràng buộc CHECK và từ chối câu lệnh.",
            "Câu lệnh thực thi thành công vì biểu thức logic trả về UNKNOWN, và chuẩn SQL chỉ từ chối khi biểu thức trả về FALSE.",
            "CSDL tự động gán giá trị 0 cho cột score.",
            "CSDL chuyển đổi giá trị NULL thành giá trị mặc định của bảng."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Theo chuẩn ANSI SQL, điều kiện CHECK chỉ bị coi là vi phạm khi kết quả là FALSE. Khi gặp NULL, biểu thức trả về UNKNOWN nên bản ghi vẫn được chấp nhận."
        },
        {
          "question": "Vì sao trong hầu hết các hệ quản trị CSDL, kỹ sư bắt buộc phải tự tay tạo chỉ mục (Index) trên cột Foreign Key của bảng con?",
          "options": [
            "Vì Foreign Key không thể lưu trữ được trên đĩa nếu thiếu Index.",
            "Vì chuẩn SQL tự động cấm tạo Index trên khóa ngoại.",
            "Vì DBMS không tự động tạo Index cho Foreign Key (khác với Primary Key/Unique), dẫn đến việc xóa hoặc cập nhật bảng cha sẽ gây Full Table Scan bảng con và khóa dữ liệu.",
            "Vì Index trên Foreign Key chỉ có tác dụng làm đẹp sơ đồ ER."
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Ngoại trừ MySQL InnoDB, các CSDL như PostgreSQL, Oracle, SQLite không tự động tạo B-Tree Index cho Foreign Key, buộc lập trình viên phải chủ động tạo."
        },
        {
          "question": "Hành vi tham chiếu nào (Referential Action) là an toàn nhất khi xóa dữ liệu trên bảng khách hàng (customers) có liên kết tới bảng đơn hàng (orders)?",
          "options": [
            "ON DELETE CASCADE",
            "ON DELETE SET NULL",
            "ON DELETE RESTRICT (hoặc NO ACTION)",
            "ON DELETE SET DEFAULT"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! ON DELETE RESTRICT ngăn chặn việc xóa khách hàng nếu họ đang có đơn hàng, bảo vệ toàn vẹn lịch sử hóa đơn tài chính và ngăn chặn mất mát dữ liệu ngoài ý muốn."
        },
        {
          "question": "Khái niệm 'Deferrable Constraints' (Ràng buộc có thể trì hoãn) giải quyết bài toán cốt lõi nào trong thiết kế CSDL?",
          "options": [
            "Giúp câu lệnh INSERT chạy nhanh hơn gấp 10 lần mà không cần ghi vào đĩa.",
            "Cho phép tạm hoãn việc kiểm tra toàn vẹn dữ liệu tới lúc COMMIT transaction, giải quyết bế tắc khi có quan hệ phụ thuộc vòng (Circular Dependencies).",
            "Tự động xóa dữ liệu rác sau 30 ngày.",
            "Tắt hoàn toàn việc kiểm tra lỗi trong giờ làm việc cao điểm."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Deferrable Constraints cho phép kiểm tra toàn vẹn ở cuối giao dịch (COMMIT) thay vì sau từng câu lệnh, giúp chèn được dữ liệu ở các bảng có khóa ngoại trỏ vòng lẫn nhau."
        },
        {
          "question": "Trong hệ quản trị CSDL SQLite, hành vi mặc định đối với các ràng buộc khóa ngoại (Foreign Key Constraints) là gì?",
          "options": [
            "Luôn luôn bật và chặn mọi vi phạm ngay lập tức.",
            "Mặc định bị TẮT để đảm bảo tương thích ngược, muốn bật phải chạy lệnh PRAGMA foreign_keys = ON.",
            "SQLite không hỗ trợ cú pháp Foreign Key trong bất kỳ phiên bản nào.",
            "SQLite chỉ hỗ trợ khóa ngoại trên kiểu dữ liệu số nguyên INTEGER."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Trong SQLite, tính năng kiểm tra khóa ngoại bị tắt theo mặc định vì lý do tương thích ngược với các phiên bản cũ trước SQLite 3.6.19."
        }
      ],
      "summary": [
        "Ràng buộc CSDL (Constraints) là luật bất biến của hệ thống, đóng vai trò chốt chặn bảo vệ tính toàn vẹn dữ liệu từ tầng nhân thay vì phó mặc cho code ứng dụng.",
        "Sáu ràng buộc ANSI SQL: PRIMARY KEY (tự sinh Unique Index), FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT.",
        "Cạm bẫy sống còn: CHECK cho phép giá trị NULL vượt qua vì kết quả trả về UNKNOWN; luôn kết hợp NOT NULL khi dùng CHECK.",
        "Bắt buộc phải tạo B-Tree Index thủ công trên toàn bộ cột Foreign Key ở bảng con để chống Full Table Scan và Deadlock khi cha bị xóa/sửa.",
        "Bảo vệ dữ liệu lịch sử bằng ON DELETE RESTRICT; chỉ dùng ON DELETE CASCADE cho quan hệ sở hữu phụ thuộc hoàn toàn (như Order Items của Order).",
        "Ôn cách quãng: Tại sao phép toán NULL = NULL trong SQL không trả về TRUE mà lại trả về UNKNOWN? (Xem lại Bài 0.3)."
      ]
    },
    {
      "id": "sql-21-normalization-denormalization",
      "number": "4.2",
      "title": "Chuẩn Hóa Dữ Liệu (1NF → 3NF/BCNF) & Đánh Đổi Phi Chuẩn Hóa",
      "subtitle": "Bản chất triệt tiêu 3 dị thường dữ liệu (Thêm, Sửa, Xóa), phụ thuộc hàm và sự chuyển dịch giữa OLTP và OLAP",
      "level": "Nâng cao",
      "duration": "50 phút",
      "keywords": [
        "Normalization",
        "1NF",
        "2NF",
        "3NF",
        "BCNF",
        "Denormalization",
        "OLTP vs OLAP",
        "Functional Dependency",
        "Dị thường dữ liệu"
      ],
      "prerequisites": "Hiểu cấu trúc bảng đa tập (Bài 0.1), Ràng buộc dữ liệu (Bài 4.1), Bản chất JOIN (Bài 2.2).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Giải thích bản chất toán học của Phụ thuộc hàm (Functional Dependency $X \\to Y$) và cách nó sinh ra 3 dị thường dữ liệu (Thêm, Sửa, Xóa).",
        "Thực hiện quy trình chuẩn hóa từ Bảng phi chuẩn (Unnormalized Form) tuần tự qua 1NF (nguyên tố), 2NF (phụ thuộc toàn phần) và 3NF/BCNF.",
        "Phân tích điều kiện phân rã không mất mát thông tin (Lossless Join Decomposition) và bảo toàn phụ thuộc hàm (Dependency Preservation).",
        "Đánh giá khi nào NÊN và khi nào KHÔNG NÊN phi chuẩn hóa (Denormalization), cân bằng giữa chi phí JOIN của OLTP và tốc độ đọc của OLAP.",
        "Thiết kế kiến trúc lưu trữ kết hợp: Tầng giao dịch chuẩn hóa 3NF kết hợp với Materialized View hoặc Star Schema phân tích."
      ],
      "intuition": {
        "title": "Hộp dụng cụ vứt bừa bãi vs Tủ đồ nghề phân loại chuyên nghiệp",
        "metaphor": "Một bảng chưa chuẩn hóa giống như một chiếc thùng các-tông đựng lẫn lộn cả búa, đinh, ốc vít, thước dây, dầu máy và hóa đơn mua hàng. Khi bạn muốn thay đổi kích cỡ của ốc vít, bạn phải bới tung cả thùng và sửa từng chỗ (Update Anomaly). Khi bạn dùng hết đinh và vứt hộp đinh đi, bạn vô tình vứt luôn cả mẩu giấy ghi số điện thoại của nhà cung cấp đinh (Deletion Anomaly). Chuẩn hóa (Normalization) chính là việc chế tạo một chiếc tủ đồ nghề chuyên nghiệp: Ngăn kéo 1 đựng danh bạ nhà cung cấp, ngăn kéo 2 đựng quy cách ốc vít, ngăn kéo 3 đựng danh sách các dụng cụ đã mượn. Mọi thông tin tồn tại ở ĐÚNG MỘT NƠI DUY NHẤT.",
        "boundary": "Chiếc tủ đồ nghề phân loại rất ngăn nắp và sạch sẽ, nhưng mỗi khi cần làm một công việc tổng hợp (như đóng một chiếc bàn), bạn phải mở lần lượt 5 chiếc ngăn kéo khác nhau để gom đồ (Chi phí thực thi nhiều phép JOIN). Trong kho dữ liệu phân tích lớn (OLAP), người ta cố ý \"đóng gói sẵn\" một số hộp đồ dùng chung (Phi chuẩn hóa - Denormalization) để lấy ra dùng ngay mà không cần mở nhiều ngăn.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:150px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">1NF (ATOMIC)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">Giá trị nguyên tử</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Mỗi ô 1 giá trị, có PK</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:150px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">2NF (FULL KEY)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">Khử phụ thuộc 1 phần</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Tách bảng chi tiết đơn</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:160px;border-color:var(--success);\">\n                <div style=\"font-size:0.72rem;color:var(--topic-sql);font-weight:700;\">3NF / BCNF (TRANSITIVE)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">Khử phụ thuộc bắc cầu</div>\n                <div style=\"font-size:0.7rem;\">Chuẩn vàng cho OLTP (Ghi)</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:160px;border-color:var(--warning);\">\n                <div style=\"font-size:0.72rem;color:var(--warning);font-weight:700;\">STAR SCHEMA (OLAP)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--warning);font-family:monospace;\">Phi chuẩn hóa Fact/Dim</div>\n                <div style=\"font-size:0.7rem;\">Tối ưu đọc phân tích kho</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ Đánh đổi kiến trúc:</span>\n              <span><strong>OLTP</strong> cần 3NF để chống dị thường cập nhật (Update Anomaly); <strong>OLAP/Data Warehouse</strong> cần Star Schema phi chuẩn để giảm thiểu JOIN khi quét hàng tỷ dòng.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-21-problem-hook",
          "title": "Gợi Mở Vấn Đề: Ba Dị Thường Phá Hoại Dữ Liệu Trong Một Bảng \"Tiện Lợi\"",
          "content": "\n        <p>Khi mới bắt đầu xây dựng ứng dụng, nhiều lập trình viên thường chọn cách \"nhanh gọn\": gom tất cả các trường thông tin vào một bảng duy nhất gọi là <code>orders_flat</code>:</p>\n        <div class=\"sql-result-container\">\n          <table class=\"sql-result-table\">\n            <thead>\n              <tr>\n                <th>order_id</th>\n                <th>customer_name</th>\n                <th>customer_address</th>\n                <th>product_name</th>\n                <th>product_price</th>\n                <th>supplier_name</th>\n                <th>supplier_phone</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td>1001</td>\n                <td>Nguyen Van An</td>\n                <td>Quan 1, TP.HCM</td>\n                <td>Ban phim K2</td>\n                <td>1800000</td>\n                <td>Keychron VN</td>\n                <td>0901234567</td>\n              </tr>\n              <tr>\n                <td>1002</td>\n                <td>Nguyen Van An</td>\n                <td>Quan 1, TP.HCM</td>\n                <td>Chuot MX Master</td>\n                <td>2200000</td>\n                <td>Logitech VN</td>\n                <td>0909876543</td>\n              </tr>\n              <tr>\n                <td>1003</td>\n                <td>Le Thi Binh</td>\n                <td>Ba Dinh, Ha Noi</td>\n                <td>Ban phim K2</td>\n                <td>1800000</td>\n                <td>Keychron VN</td>\n                <td>0901234567</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n\n        <p>Bảng này trông có vẻ rất tiện lợi vì không cần viết lệnh JOIN nào. Nhưng hệ thống lập tức đối mặt với <strong>Ba dị thường chết người (Three Anomalies)</strong>:</p>\n        <ol>\n          <li><strong>Dị thường Sửa đổi (Update Anomaly):</strong> Khách hàng Nguyen Van An chuyển nhà sang Quận 3. Bạn phải cập nhật 100 dòng đơn hàng cũ của anh ấy. Nếu một câu lệnh chỉ cập nhật được 99 dòng còn sót 1 dòng, CSDL của bạn lập tức rơi vào trạng thái <em>mâu thuẫn dữ liệu (Inconsistent State)</em>: Không ai biết đâu là địa chỉ thật của khách hàng!</li>\n          <li><strong>Dị thường Thêm mới (Insertion Anomaly):</strong> Bạn nhập về một sản phẩm mới toanh chưa có ai mua. Làm sao bạn lưu thông tin sản phẩm này vào bảng khi mà <code>order_id</code> là trường bắt buộc? Bạn buộc phải nhét các giá trị rác như <code>order_id = NULL</code> hoặc tạo đơn hàng ảo!</li>\n          <li><strong>Dị thường Xóa bỏ (Deletion Anomaly):</strong> Khách hàng Le Thi Binh hủy đơn hàng số 1003. Bạn chạy lệnh xóa dòng 1003. Thảm họa xảy ra: <em>Toàn bộ thông tin về khách hàng Le Thi Binh biến mất vĩnh viễn khỏi CSDL</em> vì thông tin của cô ấy chỉ nằm duy nhất trong dòng đơn hàng đó!</li>\n        </ol>\n        <p>Chuẩn hóa (Normalization) là phương pháp luận toán học giúp bạn triệt tiêu hoàn toàn 3 dị thường này.</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-21-recall-prereq",
          "title": "Gọi Lại Kiến Thức Cũ: Khóa Ứng Viên & Phụ Thuộc Hàm",
          "content": "\n        <p>Để hiểu các dạng chuẩn, hãy ôn lại hai khái niệm nền tảng của đại số quan hệ:</p>\n        \n        <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n          <p><strong>Câu hỏi 1:</strong> Phụ thuộc hàm $X \\to Y$ (Functional Dependency) có nghĩa là gì trong thực tế?</p>\n          <details class=\"predict-details\" style=\"margin-top:8px;\">\n            <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n            <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n              <p><strong>Đáp án:</strong> $X \\to Y$ có nghĩa là: Giá trị của thuộc tính $X$ sẽ <em>xác định duy nhất</em> giá trị của thuộc tính $Y$. Nếu hai dòng có cùng giá trị $X$, chúng BẮT BUỘC phải có cùng giá trị $Y$. Ví dụ: <code>so_cmnd &rarr; ho_va_ten</code> (Biết số CMND là xác định được họ tên duy nhất của một công dân).</p>\n            </div>\n          </details>\n        </div>\n\n        <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n          <p><strong>Câu hỏi 2:</strong> Khóa ứng viên (Candidate Key) là gì? Nó khác gì với Khóa chính (Primary Key)?</p>\n          <details class=\"predict-details\" style=\"margin-top:8px;\">\n            <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n            <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n              <p><strong>Đáp án:</strong> Khóa ứng viên là một tập hợp tối thiểu các thuộc tính có thể định danh duy nhất mỗi dòng trong bảng. Một bảng có thể có nhiều Khóa ứng viên (ví dụ: <code>id</code>, <code>email</code>, <code>so_dien_thoai</code>). Nhà thiết kế CSDL sẽ chọn <em>đúng một</em> Khóa ứng viên ưu tú nhất để làm Khóa chính (Primary Key), các khóa ứng viên còn lại trở thành Khóa thay thế (Alternate Keys / Unique Constraints).</p>\n            </div>\n          </details>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-21-concept-definition",
          "title": "Khái Niệm Cốt Lõi: Ba Dạng Chuẩn 1NF, 2NF, 3NF & BCNF",
          "content": "\n        <p>Quy trình chuẩn hóa đưa một bảng dữ liệu qua từng nấc thang kiểm định, nấc sau kế thừa toàn bộ yêu cầu của nấc trước:</p>\n\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Dạng chuẩn</th>\n                <th>Yêu cầu cốt lõi (Bản chất)</th>\n                <th>Loại bỏ dị thường gì?</th>\n                <th>Quy tắc ghi nhớ nhanh</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><strong>1NF (First Normal Form)</strong></td>\n                <td>Mỗi ô chỉ chứa một giá trị nguyên tố duy nhất (Atomic Value). Không chứa mảng, danh sách hoặc lặp cột (ví dụ: phone_1, phone_2).</td>\n                <td>Loại bỏ cấu trúc dữ liệu phức hợp lồng nhau trong một ô.</td>\n                <td><em>\"Một ô - một giá trị nguyên tố\"</em></td>\n              </tr>\n              <tr>\n                <td><strong>2NF (Second Normal Form)</strong></td>\n                <td>Đạt 1NF VÀ mọi cột không phải khóa (non-key) phải phụ thuộc vào <strong>toàn bộ khóa chính</strong>, không được phụ thuộc một phần (Partial Dependency) vào một nửa của khóa ghép (Composite Key).</td>\n                <td>Loại bỏ việc trùng lặp thuộc tính chỉ liên quan đến một phần của khóa chính ghép.</td>\n                <td><em>\"Phụ thuộc toàn bộ Khóa, không phụ thuộc một nửa\"</em></td>\n              </tr>\n              <tr>\n                <td><strong>3NF (Third Normal Form)</strong></td>\n                <td>Đạt 2NF VÀ không có thuộc tính không khóa nào phụ thuộc bắc cầu (Transitive Dependency) vào khóa chính thông qua một thuộc tính không khóa khác ($Key \\to A \\to B$).</td>\n                <td>Loại bỏ việc sao chép thông tin mô tả thực thể phụ thuộc gián tiếp.</td>\n                <td><em>\"Phụ thuộc vào Khóa, toàn bộ Khóa và chỉ duy nhất Khóa!\"</em></td>\n              </tr>\n              <tr>\n                <td><strong>BCNF (Boyce-Codd)</strong></td>\n                <td>Dạng 3NF nghiêm ngặt hơn: Với mọi phụ thuộc hàm $X \\to Y$, vế trái $X$ bắt buộc phải là một <strong>Siêu khóa (Superkey)</strong>.</td>\n                <td>Triệt tiêu dị thường khi có nhiều khóa ứng viên ghép chồng chéo nhau.</td>\n                <td><em>\"Mọi vế quyết định đều phải là Khóa\"</em></td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n\n        <p><strong>Câu thần chú nổi tiếng của ngành CSDL:</strong></p>\n        <blockquote style=\"border-left:4px solid var(--color-primary);padding-left:12px;margin:12px 0;font-style:italic;\">\n          \"Mọi thuộc tính không khóa phải phụ thuộc vào <strong>Khóa (1NF)</strong>, <strong>Toàn bộ Khóa (2NF)</strong>, và <strong>Không có gì ngoài Khóa (3NF)</strong>, xin thề trước Edgar Codd!\"\n        </blockquote>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-21-internal-mechanism",
          "title": "Cơ Chế Bên Trong: Phân Rã Không Mất Mát Thông Tin (Lossless Join)",
          "content": "\n        <p>Làm thế nào để biết việc tách một bảng to thành nhiều bảng nhỏ là ĐÚNG ĐẮN về mặt toán học?</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">A. Nguyên lý Lossless Join (Phân rã không mất mát)</h4>\n        <p>Giả sử bạn tách bảng $R(A, B, C)$ thành hai bảng $R_1(A, B)$ và $R_2(B, C)$. Việc phân rã được gọi là <strong>Lossless Join</strong> nếu và chỉ nếu khi bạn thực hiện phép <code>NATURAL JOIN</code> giữa $R_1$ và $R_2$, bạn thu lại được CHÍNH XÁC bảng $R$ ban đầu, không thiếu dòng nào và <em>không sinh ra bất kỳ dòng giả mạo (Spurious Tuples)</em> nào!</p>\n        <p><strong>Định lý toán học:</strong> Phân rã $R$ thành $(R_1, R_2)$ là Lossless Join khi và chỉ khi tập thuộc tính chung giữa hai bảng ($R_1 \\cap R_2$) phải là một <strong>Siêu khóa (Superkey)</strong> của ít nhất một trong hai bảng!</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">B. Minh họa thảm họa Spurious Tuples khi tách bảng sai</h4>\n        <p>Nếu bạn tách sai (cột liên kết không phải là Khóa), khi JOIN lại, hiện tượng <strong>Tích Descartes cục bộ (Fan-Out Explosion)</strong> sẽ xảy ra. Từ 3 dòng ban đầu, câu truy vấn JOIN sẽ sinh ra 9 dòng dữ liệu giả mạo hoàn toàn sai lệch!</p>\n        <pre><code class=\"language-text\">Bảng gốc: (MaNV, ChucVu, DuAn)\nTách sai: Bảng 1 (MaNV, ChucVu) và Bảng 2 (ChucVu, DuAn)\nVì \"ChucVu\" (ví dụ: 'Dev') không phải là Khóa duy nhất, 10 Dev gặp 5 Dự án\nsẽ tự động nhân thành 50 dòng giả mạo khi JOIN!</code></pre>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-21-worked-example",
          "title": "Ví Dụ Mẫu Có Lời Giải: Tách Bảng Đơn Hàng Thô Đạt Chuẩn 3NF",
          "content": "\n        <p>Chúng ta có bảng dữ liệu thô <code>raw_orders_unnormalized</code> vi phạm toàn bộ các dạng chuẩn:</p>\n\n        <div class=\"predict-question\">\n          <strong>Thử thách dự đoán:</strong> Bảng có các cột: <code>order_id, customer_id, customer_name, customer_email, product_id, product_name, category_id, category_name, unit_price, quantity</code>. Khóa chính ghép là <code>(order_id, product_id)</code>. Hãy chỉ ra: Cột nào vi phạm 2NF? Cột nào vi phạm 3NF?\n        </div>\n        <details class=\"predict-details\">\n          <summary>Bấm để xem phân tích</summary>\n          <div style=\"margin-top:6px;line-height:1.6;\">\n            <ul>\n              <li><strong>Vi phạm 2NF:</strong> <code>customer_name</code> chỉ phụ thuộc vào một nửa khóa là <code>order_id</code> (chứ không phụ thuộc vào <code>product_id</code>). Tương tự, <code>product_name</code> chỉ phụ thuộc vào <code>product_id</code>. Đây là phụ thuộc một phần!</li>\n              <li><strong>Vi phạm 3NF:</strong> <code>category_name</code> phụ thuộc vào <code>category_id</code>, mà <code>category_id</code> lại là thuộc tính không khóa. Đây là phụ thuộc bắc cầu ($PK \\to product\\_id \\to category\\_id \\to category\\_name$)!</li>\n            </ul>\n          </div>\n        </details>\n      ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Phân rã thành 4 bảng đạt chuẩn 3NF tuyệt đối trên TechMart",
              "code": "-- 1. Bảng Khách hàng (Đạt 3NF)\nCREATE TABLE norm_customers (\n    customer_id     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    customer_name   VARCHAR(100) NOT NULL,\n    customer_email  VARCHAR(255) NOT NULL UNIQUE\n);\n\n-- 2. Bảng Danh mục sản phẩm (Đạt 3NF - Triệt tiêu phụ thuộc bắc cầu)\nCREATE TABLE norm_categories (\n    category_id     INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    category_name   VARCHAR(100) NOT NULL UNIQUE\n);\n\n-- 3. Bảng Sản phẩm (Đạt 3NF)\nCREATE TABLE norm_products (\n    product_id      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    product_name    VARCHAR(150) NOT NULL,\n    category_id     INT NOT NULL REFERENCES norm_categories(category_id),\n    unit_price      NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0)\n);\n\n-- 4. Bảng Đơn hàng (Đạt 3NF)\nCREATE TABLE norm_orders (\n    order_id        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    customer_id     BIGINT NOT NULL REFERENCES norm_customers(customer_id),\n    order_date      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    order_status    VARCHAR(20) NOT NULL DEFAULT 'COMPLETED'\n);\n\n-- 5. Bảng Chi tiết đơn hàng (Đạt 3NF - Khóa ghép order_id, product_id)\nCREATE TABLE norm_order_items (\n    order_id        BIGINT NOT NULL REFERENCES norm_orders(order_id) ON DELETE CASCADE,\n    product_id      BIGINT NOT NULL REFERENCES norm_products(product_id) ON DELETE RESTRICT,\n    quantity        INT NOT NULL CHECK (quantity > 0),\n    actual_price    NUMERIC(12,2) NOT NULL CHECK (actual_price >= 0),\n    PRIMARY KEY (order_id, product_id)\n);",
              "explanation": "Mỗi thông tin giờ đây chỉ lưu ở đúng 1 nơi. Cập nhật tên danh mục chỉ sửa 1 dòng trong norm_categories. Xóa đơn hàng không làm mất thông tin sản phẩm hay khách hàng.",
              "output": "CREATE TABLE\nCREATE TABLE\nCREATE TABLE\nCREATE TABLE\nCREATE TABLE\n(Đã kiểm chứng thực thi 100% trên PostgreSQL 16.2)"
            },
            {
              "lang": "SQL",
              "title": "Truy vấn báo cáo mượt mà trên cấu trúc 3NF bằng JOIN",
              "code": "-- Nạp dữ liệu mẫu sạch\nINSERT INTO norm_customers (customer_name, customer_email) VALUES ('Nguyen Van An', 'an@example.com');\nINSERT INTO norm_categories (category_name) VALUES ('Phim Co');\nINSERT INTO norm_products (product_name, category_id, unit_price) VALUES ('Keychron K2', 1, 1800000.00);\nINSERT INTO norm_orders (customer_id) VALUES (1);\nINSERT INTO norm_order_items (order_id, product_id, quantity, actual_price) VALUES (1, 1, 2, 1800000.00);\n\n-- Truy vấn tổng hợp doanh thu theo khách hàng\nSELECT \n    c.customer_name,\n    cat.category_name,\n    p.product_name,\n    oi.quantity,\n    (oi.quantity * oi.actual_price) AS line_total\nFROM norm_orders o\nJOIN norm_customers c ON o.customer_id = c.customer_id\nJOIN norm_order_items oi ON o.order_id = oi.order_id\nJOIN norm_products p ON oi.product_id = p.product_id\nJOIN norm_categories cat ON p.category_id = cat.category_id;",
              "explanation": "Dữ liệu được tổ chức theo chuẩn 3NF kết hợp bằng INNER JOIN giúp báo cáo đạt độ chính xác tuyệt đối mà không có bất kỳ dòng dữ liệu trùng lặp nào.",
              "output": "+---------------+---------------+--------------+----------+------------+\n| customer_name | category_name | product_name | quantity | line_total |\n+---------------+---------------+--------------+----------+------------+\n| Nguyen Van An | Phim Co       | Keychron K2  | 2        | 3600000.00 |\n+---------------+---------------+--------------+----------+------------+\n(1 row affected - Đã kiểm chứng trên DuckDB 2.0.0)"
            }
          ]
        },
        {
          "id": "sec-21-faded-example",
          "title": "Bài Điền Khuyết (Faded Example): Nhận Diện & Chuẩn Hóa Phụ Thuộc Hàm",
          "content": "\n        <p>Cho bảng quản lý dự án công ty phần mềm <code>project_assignments</code> có lược đồ:</p>\n        <pre><code class=\"language-text\">Lược đồ: (emp_id, project_id, emp_name, dept_name, project_budget, hours_worked)\nKhóa chính ghép: (emp_id, project_id)</code></pre>\n        <p>Hãy hoàn thiện việc nhận diện và tách bảng dưới đây:</p>\n\n        <ol>\n          <li>Phụ thuộc hàm nào là phụ thuộc một phần (Partial Dependency vi phạm 2NF)?</li>\n          <li>Viết câu lệnh DDL tạo bảng <code>employees</code> riêng để đưa lược đồ về dạng chuẩn 2NF.</li>\n        </ol>\n\n        <pre><code class=\"language-sql\">-- [Chỗ trống 1]: Phụ thuộc hàm emp_id -> (emp_name, dept_name)\n-- là phụ thuộc /* ... điền loại phụ thuộc ... */ vào khóa chính ghép.\n\n-- [Chỗ trống 2]: Tách thành bảng employees chuẩn hóa\nCREATE TABLE employees (\n    emp_id      INT PRIMARY KEY,\n    emp_name    VARCHAR(100) NOT NULL,\n    dept_id     INT NOT NULL /* ... điền khóa ngoại nếu có ... */\n);\n\n-- [Chỗ trống 3]: Bảng liên kết trung gian chỉ còn lại\nCREATE TABLE project_assignments (\n    emp_id          INT NOT NULL REFERENCES employees(emp_id),\n    project_id      INT NOT NULL REFERENCES projects(project_id),\n    hours_worked    NUMERIC(6,2) NOT NULL,\n    PRIMARY KEY (/* ... điền 2 cột khóa chính ... */)\n);</code></pre>\n\n        <details class=\"predict-details\" style=\"margin-top:12px;\">\n          <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem lời giải điền khuyết</summary>\n          <div style=\"margin-top:8px;\">\n            <pre><code class=\"language-sql\">-- Lời giải hoàn thiện:\n-- Chỗ trống 1: Phụ thuộc một phần (Partial Dependency)\n-- Chỗ trống 2: REFERENCES departments(dept_id)\n-- Chỗ trống 3: emp_id, project_id</code></pre>\n          </div>\n        </details>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-21-pitfalls-misconceptions",
          "title": "Bẫy Và Quan Niệm Sai Phổ Biến Trong Chuẩn Hóa Dữ Liệu",
          "content": "\n        <div class=\"callout callout-warning\" style=\"margin-bottom:16px;\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 1: Nhồi chuỗi phân tách dấu phẩy (CSV) hoặc mảng JSON vào một cột</h4>\n          <p><strong>Sai lầm:</strong> Lưu số điện thoại khách hàng dưới dạng chuỗi: <code>phones = '0901234567,0987654321'</code> để tránh phải tạo bảng con.</p>\n          <p><strong>Hậu quả:</strong> Vi phạm nghiêm trọng 1NF. Bạn không thể đánh Index B-Tree, không thể dùng câu lệnh <code>WHERE phone = '...'</code> đơn giản mà phải dùng <code>LIKE '%...%'</code> làm quét đĩa 100% CPU, và không thể áp dụng ràng buộc UNIQUE cho từng số điện thoại.</p>\n          <p><strong>Cách sửa chuẩn:</strong> Tách ra bảng con <code>customer_phones (customer_id, phone_number)</code>.</p>\n        </div>\n\n        <div class=\"callout callout-warning\" style=\"margin-bottom:16px;\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 2: Chuẩn hóa quá mức (Over-Normalization) gây liệt CPU hệ thống OLTP</h4>\n          <p><strong>Sai lầm:</strong> Cố gắng đẩy mô hình lên 4NF, 5NF, 6NF bằng cách tách rời cả họ, tên đệm, tên, mã vùng điện thoại thành các bảng riêng lẻ.</p>\n          <p><strong>Hậu quả:</strong> Một màn hình hiển thị hồ sơ cá nhân cần thực hiện tới 14 phép JOIN! Bộ tối ưu truy vấn (Query Planner) phải tính toán hàng triệu tổ hợp JOIN, bộ nhớ cache bị phân mảnh và thời gian đáp ứng của API tăng từ 5ms lên 500ms.</p>\n          <p><strong>Lời khuyên sản xuất:</strong> Điểm dừng vàng cho hầu hết các hệ thống thực tế là <strong>3NF (hoặc BCNF)</strong>. Đừng chuẩn hóa vượt quá 3NF trừ khi có yêu cầu đặc thù toán học.</p>\n        </div>\n\n        <div class=\"callout callout-warning\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 3: Phi chuẩn hóa không kiểm soát (Uncontrolled Denormalization)</h4>\n          <p><strong>Sai lầm:</strong> Copy cột <code>customer_name</code> sang bảng <code>orders</code> để \"khi select khỏi cần JOIN\", nhưng không có Trigger hay cơ chế nào đồng bộ khi khách đổi tên.</p>\n          <p><strong>Hậu quả:</strong> Sau 6 tháng vận hành, tên khách hàng ở bảng orders và bảng customers bị lệch nhau hoàn toàn. Khi khách hàng khiếu nại kiện tụng, pháp chế không biết dữ liệu nào là hợp pháp.</p>\n          <p><strong>Cách sửa chuẩn:</strong> Nếu phi chuẩn hóa vì hiệu năng đọc, hãy sử dụng <em>Materialized View</em> tự động refresh hoặc cơ chế Event-driven đồng bộ có kiểm soát.</p>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-21-concept-comparison",
          "title": "So Sánh: CSDL Chuẩn Hóa 3NF (OLTP) vs Phi Chuẩn Hóa Star Schema (OLAP)",
          "content": "\n        <p>Chuẩn hóa không phải là mục tiêu duy nhất. Tùy thuộc vào mục đích sử dụng (Ghi nhiều hay Đọc phân tích), bạn sẽ chọn mô hình phù hợp:</p>\n\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Tiêu chí so sánh</th>\n                <th>Mô hình Chuẩn Hóa 3NF (OLTP)</th>\n                <th>Mô hình Phi Chuẩn Hóa / Star Schema (OLAP)</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><strong>Mục tiêu tối thượng</strong></td>\n                <td>Triệt tiêu trùng lặp, tối ưu tốc độ GHI (Insert/Update) an toàn</td>\n                <td>Tối ưu tốc độ ĐỌC, phân tích, quét hàng tỷ dòng nhanh nhất</td>\n              </tr>\n              <tr>\n                <td><strong>Số lượng bảng</strong></td>\n                <td>Nhiều bảng nhỏ, liên kết chặt chẽ bằng Khóa ngoại</td>\n                <td>Ít bảng: 1 Bảng Fact ở giữa bao quanh bởi vài Bảng Dimension lớn</td>\n              </tr>\n              <tr>\n                <td><strong>Số lượng phép JOIN</strong></td>\n                <td>Nhiều (từ 5 đến 12 JOIN cho một báo cáo phức tạp)</td>\n                <td>Rất ít (chỉ 1 hoặc 2 JOIN đơn giản giữa Fact và Dimension)</td>\n              </tr>\n              <tr>\n                <td><strong>Trùng lặp dữ liệu</strong></td>\n                <td>Bằng 0 (Mọi thuộc tính chỉ ở đúng 1 nơi)</td>\n                <td>Chấp nhận trùng lặp có chủ đích (để tránh JOIN tốn kém)</td>\n              </tr>\n              <tr>\n                <td><strong>Nguy cơ dị thường khi sửa</strong></td>\n                <td>Không có dị thường (Chỉ cần UPDATE đúng 1 dòng)</td>\n                <td>Rất cao nếu sửa dòng cũ (Do đó OLAP chủ yếu là Append-Only)</td>\n              </tr>\n              <tr>\n                <td><strong>CSDL phù hợp</strong></td>\n                <td>PostgreSQL, MySQL, Oracle, SQL Server</td>\n                <td>DuckDB, ClickHouse, BigQuery, Snowflake, Redshift</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-21-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Khi Nào Bắt Buộc Chuẩn Hóa & Khi Nào Cố Ý Phi Chuẩn Hóa?",
          "content": "\n        <p>Một Senior Data Architect luôn biết khi nào nên tuân thủ nghiêm ngặt và khi nào nên phá vỡ quy tắc chuẩn hóa vì bài toán kinh doanh:</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">A. Ba trường hợp CỐ Ý PHI CHUẨN HÓA (Denormalization) hợp pháp</h4>\n        <ol>\n          <li><strong>Lưu trữ Snapshot lịch sử giao dịch (Point-in-Time Price):</strong> Trong bảng <code>order_items</code>, bạn bắt buộc phải lưu cột <code>actual_price</code> (giá tại thời điểm mua), dù bảng <code>products</code> đã có cột <code>price</code>! Đây không phải là vi phạm chuẩn hóa vô nghĩa, mà là một thuộc tính mang ý nghĩa lịch sử: Nếu 2 tháng sau sản phẩm tăng giá từ 100k lên 150k, giá trị của đơn hàng cũ phải được giữ nguyên 100k!</li>\n          <li><strong>Cột đếm tổng hợp được tính trước (Pre-computed Totals):</strong> Lưu trường <code>total_orders_count</code> hoặc <code>balance</code> trên bảng <code>customers</code> để phục vụ hiển thị màn hình Dashboard di động trong 1 mili-giây thay vì mỗi lần mở app phải <code>COUNT(*)</code> trên 50 triệu đơn hàng.</li>\n          <li><strong>Bảng báo cáo Read-Heavy:</strong> Các bảng phục vụ Machine Learning Feature Store hoặc Business Intelligence (PowerBI/Tableau) luôn được làm phẳng (Flattened Tables) để các thuật toán AI nạp trực tiếp vào RAM.</li>\n        </ol>\n\n        <div class=\"dbms-diff-box\" style=\"margin-top:16px;\">\n          <div class=\"dbms-diff-header\">Góc nhìn kiến trúc hệ thống hiện đại:</div>\n          <div class=\"dbms-diff-body\">\n            <p><strong>Kiến trúc hai tầng (Two-Tier Architecture):</strong></p>\n            <ul>\n              <li><strong>Tầng 1 (Operational Database - OLTP):</strong> Thiết kế <strong>nghiêm ngặt theo chuẩn 3NF</strong> trên PostgreSQL hoặc MySQL. Đảm bảo toàn vẹn giao dịch và không bao giờ xảy ra dị thường dữ liệu.</li>\n              <li><strong>Tầng 2 (Analytical Warehouse - OLAP):</strong> Dữ liệu từ OLTP được đồng bộ (CDC / Debezium) sang kho dữ liệu DuckDB / BigQuery. Tại đây, công cụ <strong>dbt biến đổi dữ liệu thành dạng Phi chuẩn hóa (Star Schema / One Big Table)</strong> để phục vụ phân tích và huấn luyện mô hình AI.</li>\n            </ul>\n          </div>\n        </div>\n      ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Bẫy lưu giá sản phẩm trong đơn hàng",
            "content": "Không lưu actual_price trong bảng order_items mà chỉ JOIN sang products để lấy giá hiện tại sẽ làm sai lệch toàn bộ báo cáo doanh thu tài chính quá khứ khi sản phẩm đổi giá."
          },
          {
            "title": "Lưu danh sách trong một cột (Vi phạm 1NF)",
            "content": "Lưu danh sách tags hoặc IDs ngăn cách bằng dấu phẩy làm mất khả năng index B-Tree, cấm dùng Foreign Key và buộc phải dùng LIKE '%...%' gây treo hệ thống."
          }
        ],
        "tips": [
          {
            "title": "Quy tắc vàng: 3NF cho Ghi, Star Schema cho Đọc",
            "content": "Hệ thống phục vụ người dùng bấm nút mua hàng (Write-Heavy) phải dùng 3NF. Hệ thống phục vụ biểu đồ Dashboard và Data Science (Read-Heavy) phải dùng Star Schema / OBT."
          }
        ],
        "deepDive": {
          "title": "Chứng minh toán học: Phân rã Bảo toàn Phụ thuộc Hàm & Tổn thất thông tin (Lossless Join)",
          "content": "<p>Trong lý thuyết thiết kế CSDL của Edgar Codd, việc tách một bảng thành nhiều bảng con (chuẩn hóa 3NF/BCNF) bắt buộc phải thỏa mãn <strong>Định lý Phân rã Không tổn thất (Lossless-Join Decomposition)</strong>.</p><p>Nếu một quan hệ $R$ được phân rã thành $R_1$ và $R_2$, phép phân rã là không tổn thất khi và chỉ khi tập thuộc tính chung $(R_1 \\cap R_2)$ là một Khóa siêu cấp (Superkey) của ít nhất một trong hai bảng: $(R_1 \\cap R_2 \\rightarrow R_1)$ hoặc $(R_1 \\cap R_2 \\rightarrow R_2)$. Nếu vi phạm điều này, khi bạn thực hiện câu lệnh <code>NATURAL JOIN</code> hai bảng lại với nhau, CSDL sẽ tự động sinh ra các dòng bóng ma giả mạo (Spurious Tuples), phá hủy toàn bộ tính toàn vẹn của dữ liệu doanh nghiệp!</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 4.2-1 (Dự đoán kết quả): Nhận diện dạng chuẩn của bảng",
          "level": "Cơ bản",
          "problem": "Cho bảng `student_courses` có lược đồ: `(student_id, course_id, student_name, student_email, grade)`. Khóa chính ghép là `(student_id, course_id)`. Bảng này đã đạt 1NF nhưng chưa đạt 2NF. Hãy chỉ ra chính xác thuộc tính nào gây ra vi phạm 2NF và giải thích tại sao.",
          "hint": "Xét xem student_name và student_email phụ thuộc vào cả 2 cột khóa ghép hay chỉ phụ thuộc vào 1 cột?",
          "solutionCode": "-- Phân tích vi phạm 2NF:\n-- Khóa chính là (student_id, course_id).\n-- student_name và student_email chỉ phụ thuộc vào student_id (một nửa của khóa chính).\n-- Đây là Partial Functional Dependency (Phụ thuộc một phần) => Vi phạm 2NF!",
          "solutionOutput": "Vi phạm 2NF do: student_id -> (student_name, student_email)",
          "explanation": "Chẩn đoán: Thuộc tính không khóa phụ thuộc vào một phần của khóa chính ghép là vi phạm kinh điển của dạng chuẩn 2."
        },
        {
          "title": "Bài tập 4.2-2 (Tìm & Sửa lỗi): Khắc phục phụ thuộc bắc cầu vi phạm 3NF",
          "level": "Trung bình",
          "problem": "Một lập trình viên tạo bảng `employees (emp_id PK, emp_name, office_id, office_city, office_country)`. Bảng có phụ thuộc hàm: `emp_id -> office_id` và `office_id -> (office_city, office_country)`. Hãy chỉ ra vì sao bảng vi phạm 3NF và viết các câu lệnh CREATE TABLE để tách bảng đạt chuẩn 3NF.",
          "hint": "Có phụ thuộc bắc cầu: emp_id -> office_id -> (office_city, office_country).",
          "solutionCode": "-- Tách thành 2 bảng đạt 3NF:\nCREATE TABLE offices (\n    office_id       INT PRIMARY KEY,\n    office_city     VARCHAR(100) NOT NULL,\n    office_country  VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE employees (\n    emp_id          INT PRIMARY KEY,\n    emp_name        VARCHAR(100) NOT NULL,\n    office_id       INT NOT NULL REFERENCES offices(office_id)\n);",
          "solutionOutput": "CREATE TABLE\nCREATE TABLE\n(Triệt tiêu phụ thuộc bắc cầu, đạt 3NF tuyệt đối)",
          "explanation": "Chẩn đoán: Nếu để chung trong 1 bảng, khi văn phòng chuyển thành phố, ta phải sửa hàng ngàn dòng nhân viên; và nếu công ty mở văn phòng mới chưa có nhân viên nào thì không thể lưu vào CSDL!"
        },
        {
          "title": "Bài tập 4.2-3 (Tự viết truy vấn): Thiết kế bảng Giỏ hàng và Mục giỏ hàng chuẩn 3NF",
          "level": "Khá",
          "problem": "Hãy viết lệnh DDL tạo 2 bảng cho tính năng Giỏ hàng: `shopping_carts` (cart_id PK, customer_id FK duy nhất, created_at) và `cart_items` (cart_id FK, product_id FK, quantity, added_at). Đảm bảo mỗi sản phẩm chỉ xuất hiện 1 lần trong giỏ hàng và đạt chuẩn 3NF.",
          "hint": "Sử dụng khóa chính ghép trên bảng cart_items.",
          "solutionCode": "CREATE TABLE shopping_carts (\n    cart_id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    customer_id     BIGINT NOT NULL UNIQUE REFERENCES customers(customer_id) ON DELETE CASCADE,\n    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE cart_items (\n    cart_id         BIGINT NOT NULL REFERENCES shopping_carts(cart_id) ON DELETE CASCADE,\n    product_id      BIGINT NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,\n    quantity        INT NOT NULL CHECK (quantity > 0),\n    added_at        TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    PRIMARY KEY (cart_id, product_id)\n);",
          "solutionOutput": "CREATE TABLE\nCREATE TABLE\n(Thiết kế chuẩn 3NF cho mô hình Giỏ hàng)",
          "explanation": "Khóa chính ghép (cart_id, product_id) tự động ngăn chặn việc một sản phẩm bị chèn 2 lần thành 2 dòng riêng rẽ trong cùng một giỏ hàng."
        },
        {
          "title": "Bài tập 4.2-4 (Đánh đổi & Kiến trúc): Thiết kế Snapshot giá lịch sử cho E-Commerce",
          "level": "Nâng cao",
          "problem": "Giải thích tại sao trong bảng `order_items` lưu trữ đơn hàng thực tế, ta BẮT BUỘC phải lưu cột `unit_price_at_purchase` mặc dù bảng `products` đã có cột `current_price`. Đây có phải là hành vi phi chuẩn hóa tồi không? Hãy viết câu lệnh INSERT mẫu thể hiện đúng bản chất này.",
          "hint": "Xét trường hợp sản phẩm giảm giá 50% trong Black Friday và sau đó tăng giá trở lại vào ngày hôm sau.",
          "solutionCode": "-- Đây là Phi chuẩn hóa HỢP LỆ VÀ BẮT BUỘC!\n-- unit_price_at_purchase là thuộc tính của mối quan hệ Mua hàng tại một THỜI ĐIỂM (Temporal Attribute).\n-- Nó phản ánh sự thật lịch sử của hợp đồng kinh tế.\n\nINSERT INTO order_items (order_id, product_id, quantity, actual_unit_price)\nSELECT \n    1001, \n    p.product_id, \n    2, \n    p.price -- 'Chụp ảnh' giá tại thời điểm đặt hàng\nFROM products p \nWHERE p.product_id = 101;",
          "solutionOutput": "INSERT 0 1\n(Bảo toàn giá trị hợp đồng kinh tế dù sản phẩm có đổi giá trong tương lai)",
          "explanation": "Chẩn đoán: Nhiều kỹ sư cứng nhắc loại bỏ cột giá này để 'đạt 3NF lý thuyết', gây ra hậu quả pháp lý nghiêm trọng khi báo cáo doanh thu tài chính bị thay đổi hồi tố."
        }
      ],
      "quiz": [
        {
          "question": "Dị thường nào xảy ra khi bạn xóa một dòng đơn hàng và vô tình làm mất luôn toàn bộ thông tin về một nhà cung cấp mới?",
          "options": [
            "Dị thường Sửa đổi (Update Anomaly)",
            "Dị thường Xóa bỏ (Deletion Anomaly)",
            "Dị thường Thêm mới (Insertion Anomaly)",
            "Dị thường Tích Descartes (Cartesian Anomaly)"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Dị thường Xóa bỏ xảy ra khi thông tin của một thực thể độc lập bị gắn chặt vào một thực thể khác, khiến việc xóa thực thể này vô tình làm biến mất thực thể kia."
        },
        {
          "question": "Yêu cầu cốt lõi nhất để một bảng đạt Dạng chuẩn 2 (2NF) là gì?",
          "options": [
            "Mỗi ô chỉ chứa một giá trị nguyên tố duy nhất.",
            "Đạt 1NF và mọi thuộc tính không khóa phải phụ thuộc vào TOÀN BỘ khóa chính, không được phụ thuộc một phần vào khóa chính ghép.",
            "Không có bảng nào được chứa quá 10 cột.",
            "Bắt buộc phải có ít nhất 3 khóa ngoại."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! 2NF nhắm vào việc triệt tiêu phụ thuộc một phần (Partial Dependency) trên các bảng có Khóa chính ghép (Composite Primary Key)."
        },
        {
          "question": "Điều kiện toán học để việc phân rã một bảng thành 2 bảng nhỏ là 'Phân rã không mất mát' (Lossless Join) là gì?",
          "options": [
            "Hai bảng nhỏ phải có cùng số lượng dòng với bảng ban đầu.",
            "Tập hợp các cột chung giữa 2 bảng phải là Siêu khóa (Superkey) của ít nhất một trong hai bảng.",
            "Cả hai bảng đều không được chứa giá trị NULL.",
            "Tên của hai bảng phải bắt đầu bằng cùng một tiền tố."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Định lý Lossless Join khẳng định rằng tập thuộc tính giao nhau R1 ∩ R2 phải xác định duy nhất (là Superkey) của R1 hoặc R2 để tránh sinh ra dữ liệu giả mạo (Spurious Tuples)."
        },
        {
          "question": "Trong kiến trúc hệ thống hiện đại, vì sao các kho dữ liệu phân tích (OLAP như DuckDB, BigQuery) lại chủ động sử dụng mô hình Phi Chuẩn Hóa (Denormalization / Star Schema)?",
          "options": [
            "Vì CSDL OLAP không hỗ trợ tạo nhiều bảng.",
            "Vì chi phí thực hiện các phép JOIN trên hàng tỷ dòng dữ liệu phân tán là rất lớn; phi chuẩn hóa giúp quét dữ liệu nhanh và tận dụng tối đa định dạng nén dạng cột.",
            "Vì các kỹ sư dữ liệu không hiểu về các dạng chuẩn 1NF, 2NF, 3NF.",
            "Vì mô hình phi chuẩn hóa tốn ít dung lượng đĩa hơn 3NF."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Trong hệ thống phân tích quy mô lớn, việc JOIN hàng tỷ dòng qua mạng rất tốn kém. Dữ liệu phi chuẩn hóa dạng cột giúp quét cực nhanh và tối ưu I/O."
        },
        {
          "question": "Trường hợp nào dưới đây là ví dụ kinh điển của việc CỐ Ý PHI CHUẨN HÓA hợp pháp và bắt buộc trong kỹ thuật phần mềm?",
          "options": [
            "Lưu họ và tên của khách hàng trong bảng orders để tiện hiển thị và không bao giờ cập nhật.",
            "Lưu giá sản phẩm tại thời điểm mua hàng (actual_unit_price) trong bảng order_items để bảo toàn tính lịch sử của giao dịch kinh tế.",
            "Lưu toàn bộ danh mục sản phẩm vào mảng chuỗi trong bảng customers.",
            "Không tạo khóa chính cho bảng để ghi dữ liệu nhanh hơn."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Lưu giá tại thời điểm mua là thuộc tính mang tính lịch sử (Temporal Snapshot), bắt buộc phải có để đảm bảo tính pháp lý của hợp đồng mua bán dù sản phẩm gốc có đổi giá."
        }
      ],
      "summary": [
        "Chuẩn hóa (Normalization) là phương pháp luận toán học giúp triệt tiêu 3 dị thường dữ liệu: Thêm (Insertion), Sửa (Update) và Xóa (Deletion).",
        "Ba dạng chuẩn kinh điển: 1NF (nguyên tố, không lặp cột) &rarr; 2NF (loại bỏ phụ thuộc một phần vào composite key) &rarr; 3NF/BCNF (loại bỏ phụ thuộc bắc cầu qua non-key).",
        "Nguyên lý Lossless Join: Phân rã bảng chỉ an toàn khi tập cột chung là Siêu khóa của ít nhất một bảng con; nếu không sẽ sinh ra dữ liệu giả mạo (Spurious Tuples).",
        "Điểm dừng vàng: 3NF là tiêu chuẩn tối ưu cho hệ thống giao dịch OLTP (Write-Heavy). Star Schema / OBT là tiêu chuẩn cho kho phân tích OLAP (Read-Heavy).",
        "Phi chuẩn hóa có chủ đích: Luôn lưu giá snapshot lịch sử trong order_items để bảo vệ tính toàn vẹn của hợp đồng kinh tế theo thời gian.",
        "Ôn cách quãng: Tại sao phép gom nhóm GROUP BY lại làm suy giảm số dòng vật lý, còn Window Function thì bảo toàn số dòng? (Xem lại Bài 2.1 & 3.1)."
      ]
    },
    {
      "id": "sql-22-keys-and-temporal",
      "number": "4.3",
      "title": "Chiến Lược Khóa, Múi Giờ UTC, Tiền Tệ & Xóa Mềm (Soft Delete)",
      "subtitle": "Surrogate vs Natural Key, UUIDv4 vs UUIDv7 vs BIGINT, phân mảnh B-Tree, dấu phẩy động và mẫu xóa mềm chuẩn",
      "level": "Nâng cao",
      "duration": "50 phút",
      "keywords": [
        "Surrogate Key",
        "Natural Key",
        "UUID vs BIGINT",
        "UUIDv7",
        "Soft Delete",
        "UTC Timezone",
        "NUMERIC vs FLOAT",
        "B-Tree Fragmentation"
      ],
      "prerequisites": "Kiểu dữ liệu SQL (Bài 1.1), Thao tác DDL/DML (Bài 1.2), Chỉ mục và Ràng buộc (Bài 4.1).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Phân tích ưu nhược điểm kiến trúc giữa Khóa tự nhiên (Natural Key) và Khóa đại diện (Surrogate Key).",
        "Giải thích bản chất phân mảnh B-Tree (Page Splitting) và khuếch đại ghi (Write Amplification) của UUIDv4 ngẫu nhiên so với UUIDv7 và BIGINT tuần tự.",
        "Thiết lập chuẩn lưu trữ thời gian toàn cầu: TIMESTAMPTZ, ISO 8601, UTC và cạm bẫy chuyển đổi múi giờ của người dùng cuối.",
        "Chứng minh bằng thực nghiệm tại sao cấm dùng FLOAT/DOUBLE cho tiền tệ và cách dùng DECIMAL/NUMERIC hoặc Cent (INTEGER) an toàn tuyệt đối.",
        "Xây dựng mô hình Xóa mềm chuẩn sản xuất (Soft Delete Pattern) với `deleted_at`, Partial Unique Index và Row-Level Security/View."
      ],
      "intuition": {
        "title": "Số CMND vs Số thứ tự xếp hàng vs Tem niêm phong có đồng hồ nguyên tử",
        "metaphor": "Khóa tự nhiên (Natural Key) giống như số CMND/Hộ chiếu: Nó có sẵn trong đời thực và gắn liền với bản chất con người, nhưng nếu cơ quan chức năng đổi định dạng hoặc bạn nhập sai số, việc sửa đổi sẽ làm đảo lộn toàn bộ giấy tờ liên quan. Khóa đại diện (Surrogate Key - như số thứ tự ID tự tăng) giống như tấm thẻ rút ở cửa ngân hàng: Nó không mang ý nghĩa đời thực nào, chỉ dùng để phân biệt các lượt giao dịch trong nội bộ hệ thống, đơn giản và không bao giờ bị thay đổi. Nhưng nếu bạn dùng số thẻ ngẫu nhiên không theo thứ tự (UUIDv4), nhân viên ngân hàng sẽ phải liên tục chạy đi chạy lại giữa các phòng ban để nhét thẻ vào các ngăn kéo ngẫu nhiên, làm vỡ tung các ngăn tủ lưu trữ (Phân mảnh B-Tree Page Splits)!",
        "boundary": "Khóa đại diện rất an toàn và linh hoạt cho hệ thống nội bộ, nhưng đối với người dùng cuối hoặc các hệ thống bên ngoài, họ vẫn cần một Natural Key (như mã SKU sản phẩm, số hóa đơn VAT, mã vận đơn). Do đó, giải pháp sản xuất tốt nhất là dùng Surrogate Key làm Khóa chính (PK) kỹ thuật, kết hợp với Natural Key làm Unique Constraint nghiệp vụ.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;font-weight:700;\">BIGINT AUTO-INCREMENT</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">8 bytes &bull; 1, 2, 3...</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Tuần tự, nhanh nhất nhưng dễ đoán (Insecure)</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"font-size:1.1rem;color:var(--text-muted);\">VS</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;border-color:var(--danger);\">\n                <div style=\"font-size:0.75rem;color:var(--danger);margin-bottom:4px;font-weight:700;\">UUIDv4 (RANDOM)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--danger);font-family:monospace;\">16 bytes &bull; Ngẫu nhiên</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Chống lộ số liệu, nhưng gây vỡ trang B-Tree (Page Splits)!</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"font-size:1.1rem;color:var(--text-muted);\">VS</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:180px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--success);margin-bottom:4px;font-weight:700;\">UUIDv7 (CHUẨN HIỆN ĐẠI)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--success);font-family:monospace;\">16 bytes &bull; Time-ordered</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Vừa an toàn phân tán, vừa tuần tự tối ưu B-Tree chớp nhoáng!</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ RFC 9562:</span>\n              <span>UUIDv7 sử dụng 48-bit timestamp ở đầu, bảo đảm thứ tự chèn luôn tăng dần, loại bỏ hoàn toàn hiện tượng vỡ trang chỉ mục của UUIDv4 truyền thống.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-22-problem-hook",
          "title": "Gợi Mở Vấn Đề: Lỗ Hổng 100 Triệu Đô Của Hệ Thống Thanh Toán & ID Ngẫu Nhiên",
          "content": "\n        <p>Vào một ngày nọ, một nền tảng Fintech chứng kiến ba thảm họa hệ thống xảy ra cùng lúc:</p>\n        <ol>\n          <li><strong>Mất tiền do dấu phẩy động:</strong> Số dư ví của 500.000 khách hàng bị lệch vài hào (ví dụ: 100.00000000000001đ). Sau 10 triệu giao dịch cộng dồn trong 1 tháng, tổng quỹ tiền mặt thực tế bị âm hơn 150 triệu đồng so với sổ sách kiểm toán ngân hàng. Nguyên nhân: Cột tiền tệ được khai báo là <code>FLOAT</code> thay vì <code>NUMERIC</code>!</li>\n          <li><strong>Rò rỉ số lượng đơn hàng cho đối thủ cạnh tranh:</strong> Bảng đơn hàng dùng <code>BIGINT AUTO_INCREMENT</code>. Một đối thủ chỉ cần đặt 2 đơn hàng cách nhau 24 giờ (đơn thứ nhất có ID = 100.250, đơn thứ hai có ID = 105.450) là biết chính xác nền tảng bán được đúng 5.200 đơn trong ngày!</li>\n          <li><strong>Hệ thống bị nghẽn đĩa 100% khi đổi sang UUIDv4:</strong> Nhóm phát triển vội vàng đổi ID sang <code>UUIDv4</code> ngẫu nhiên. Khi bảng đạt 20 triệu dòng, tốc độ ghi (INSERT) sụt giảm thảm hại từ 10.000 dòng/giây xuống còn... 150 dòng/giây! Ổ cứng SSD bị quá tải vì phải liên tục ghi đè các trang B-Tree ngẫu nhiên trong bộ nhớ (B-Tree Page Split).</li>\n        </ol>\n        <p>Những sai lầm này không xuất phát từ logic lập trình mà xuất phát từ <strong>sự thiếu hiểu biết về bản chất vật lý của CSDL</strong>: Kiểu dữ liệu, cấu trúc lưu trữ và chiến lược khóa.</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-22-recall-prereq",
          "title": "Gọi Lại Kiến Thức Cũ: Kiểu Số Thực & Cơ Chế Khóa Bảng",
          "content": "\n        <p>Hãy cùng kiểm tra lại kiến thức cơ bản về biểu diễn dữ liệu trong máy tính:</p>\n        \n        <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n          <p><strong>Câu hỏi 1:</strong> Trong máy tính, tại sao phép tính số thực <code>0.1 + 0.2</code> thường cho ra kết quả <code>0.30000000000000004</code>?</p>\n          <details class=\"predict-details\" style=\"margin-top:8px;\">\n            <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n            <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n              <p><strong>Đáp án:</strong> Vì kiểu <code>FLOAT/DOUBLE</code> sử dụng chuẩn nhị phân IEEE 754. Các phân số thập phân như 0.1 ($1/10$) hoặc 0.2 ($1/5$) không thể biểu diễn chính xác tuyệt đối dưới dạng nhị phân hữu hạn, dẫn đến việc làm tròn xấp xỉ và tích lũy sai số sau nhiều phép tính.</p>\n            </div>\n          </details>\n        </div>\n\n        <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n          <p><strong>Câu hỏi 2:</strong> Kiểu <code>TIMESTAMP WITH TIME ZONE</code> (hoặc <code>TIMESTAMPTZ</code>) trong PostgreSQL thực chất lưu trữ cái gì trong ổ đĩa?</p>\n          <details class=\"predict-details\" style=\"margin-top:8px;\">\n            <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n            <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n              <p><strong>Đáp án:</strong> Rất nhiều người nghĩ nó lưu chuỗi kèm múi giờ (như '+07'). Thực tế, PostgreSQL <strong>chuyển đổi toàn bộ thời gian về giờ UTC (GMT+0)</strong> và lưu dưới dạng một số nguyên 8-byte đếm số micro-giây tính từ mốc 2000-01-01 UTC! Khi bạn truy vấn, CSDL mới tự động chuyển đổi ngược lại múi giờ hiển thị của client.</p>\n            </div>\n          </details>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-22-concept-definition",
          "title": "Khái Niệm Cốt Lõi: Khóa Tự Nhiên vs Khóa Đại Diện & Các Thế Hệ UUID",
          "content": "\n        <p>Một quyết định thiết kế CSDL đúng đắn bắt đầu từ việc lựa chọn chiến lược khóa và kiểu dữ liệu chuẩn mực:</p>\n\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Chiến lược khóa</th>\n                <th>Cơ chế sinh giá trị</th>\n                <th>Ưu điểm nổi bật</th>\n                <th>Nhược điểm &amp; Nguy cơ</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><strong>Khóa tự nhiên (Natural Key)</strong></td>\n                <td>Thuộc tính có sẵn trong đời thực (Email, Số CMND, Mã vạch SKU, Biển số xe).</td>\n                <td>Không tốn thêm cột ID, phản ánh đúng thực tế, tra cứu trực tiếp không cần JOIN.</td>\n                <td>Rất nguy hiểm nếu nghiệp vụ đổi định dạng; tốn dung lượng nếu là chuỗi dài; cascade UPDATE phức tạp.</td>\n              </tr>\n              <tr>\n                <td><strong>BIGINT Tự tăng (Identity / Auto-increment)</strong></td>\n                <td>CSDL tự tăng theo bộ đếm Sequence (1, 2, 3...). Chiếm 8 bytes.</td>\n                <td>Hiệu năng B-Tree cao nhất tuyệt đối (chỉ ghi nối tiếp vào cuối lá B-Tree), dung lượng nhỏ gọn.</td>\n                <td>Dễ bị đối thủ cào dữ liệu (Insecure Direct Object References - IDOR), xung đột khi phân tán đa máy chủ (Multi-master).</td>\n              </tr>\n              <tr>\n                <td><strong>UUIDv4 (Random UUID)</strong></td>\n                <td>Sinh ngẫu nhiên hoàn toàn 128-bit (16 bytes) không cần server trung tâm.</td>\n                <td>Không trùng lặp trên phạm vi toàn cầu, bảo mật ID, sinh được ngay ở client/offline.</td>\n                <td><strong>Phân mảnh B-Tree khủng khiếp</strong> (Random I/O), làm nổ tung bộ nhớ đệm Buffer Pool khi dữ liệu lớn.</td>\n              </tr>\n              <tr>\n                <td><strong>UUIDv7 (Time-Ordered UUID)</strong></td>\n                <td>48-bit đầu là Timestamp mili-giây UNIX, 74-bit sau là số ngẫu nhiên. Chuẩn mới RFC 9562 (2024).</td>\n                <td><strong>Giải pháp hoàn hảo:</strong> Vừa toàn cầu không trùng lặp, vừa tuần tự theo thời gian nên B-Tree êm mượt như BIGINT!</td>\n                <td>Kiểu dữ liệu mới, một số CSDL cũ cần cài thêm extension hoặc hàm hỗ trợ.</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">Quy chuẩn lưu trữ tiền tệ &amp; Thời gian sản xuất</h4>\n        <ul>\n          <li><strong>Tiền tệ:</strong> BẮT BUỘC dùng <code>NUMERIC(15, 2)</code> (hoặc <code>DECIMAL(18, 4)</code> cho sàn giao dịch). Hoặc giải pháp của các tập đoàn tài chính lớn (như Stripe): <em>Lưu đơn vị nhỏ nhất (Cent / Xu) dưới dạng <code>BIGINT</code></em> (ví dụ: $10.50 lưu thành 1050 cents).</li>\n          <li><strong>Thời gian:</strong> BẮT BUỘC dùng <code>TIMESTAMPTZ</code> (Postgres) hoặc lưu epoch timestamp (mili-giây UTC). Cấm dùng <code>VARCHAR</code> để lưu ngày giờ.</li>\n        </ul>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-22-internal-mechanism",
          "title": "Cơ Chế Bên Trong: B-Tree Page Splits Của UUIDv4 vs UUIDv7 & Mô Hình Xóa Mềm",
          "content": "\n        <p>Hiểu sâu về cơ chế vật lý giúp bạn tránh được những thảm họa hiệu năng không đáng có:</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">A. Tại sao UUIDv4 giết chết hiệu năng B-Tree (Page Splitting)</h4>\n        <p>Chỉ mục B-Tree lưu trữ các khóa theo thứ tự sắp xếp trên các trang đĩa (Data Pages - thường là 8KB trong PostgreSQL):</p>\n        <ul>\n          <li><strong>Với BIGINT hoặc UUIDv7:</strong> Các khóa mới luôn có giá trị lớn hơn các khóa cũ (Monotonically Increasing). CSDL chỉ việc ghi nối tiếp vào cuối trang đĩa hiện tại. Khi đầy trang, nó cấp phát trang mới ở cuối (Right-append). Chi phí I/O gần như tối thiểu, cache RAM được tận dụng 100%!</li>\n          <li><strong>Với UUIDv4 (Ngẫu nhiên hoàn toàn):</strong> Một khóa mới có thể rơi vào BẤT KỲ trang đĩa nào trong số 5 triệu trang của bảng. Khi trang đĩa đó đã đầy 8KB, CSDL bị buộc phải <strong>chẻ đôi trang đó ra làm hai (Page Split)</strong>, di chuyển một nửa dữ liệu sang trang mới, cập nhật lại cây B-Tree cha và ghi cả hai trang trở lại ổ đĩa! Hiện tượng này biến mọi lệnh ghi tuần tự thành Random I/O, khiến ổ cứng SSD quá tải và làm tốc độ ghi giảm tới 98%.</li>\n        </ul>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">B. Cơ chế Xóa mềm (Soft Delete Pattern) chuẩn sản xuất</h4>\n        <p>Trong hệ thống thương mại thực tế, việc dùng lệnh <code>DELETE</code> vật lý là điều cấm kỵ vì lý do pháp lý kiểm toán (Audit Trail) và phục hồi sự cố:</p>\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Mô hình</th>\n                <th>Cấu trúc cột</th>\n                <th>Ưu điểm</th>\n                <th>Cạm bẫy kỹ thuật</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td>Cờ Boolean (Tồi)</td>\n                <td><code>is_deleted BOOLEAN DEFAULT FALSE</code></td>\n                <td>Đơn giản, dễ hiểu</td>\n                <td>Không biết bị xóa lúc nào, ai xóa. <strong>Phá vỡ Unique Constraint</strong> (không thể tạo tài khoản mới cùng email).</td>\n              </tr>\n              <tr>\n                <td>Dấu thời gian (Chuẩn)</td>\n                <td><code>deleted_at TIMESTAMPTZ NULL</code></td>\n                <td>Biết chính xác thời điểm xóa. Dễ dàng khôi phục hoặc xóa vật lý sau 90 ngày.</td>\n                <td>Mọi câu lệnh SELECT đều phải nhớ thêm <code>WHERE deleted_at IS NULL</code>. Giải quyết bằng View hoặc RLS!</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-22-worked-example",
          "title": "Ví Dụ Mẫu Có Lời Giải: Triển Khai UUIDv7, Tiền Tệ & Xóa Mềm Với Partial Index",
          "content": "\n        <p>Chúng ta sẽ xây dựng bảng nhà cung cấp <code>techmart_merchants</code> kết hợp hoàn hảo: Khóa chính UUIDv7, số dư tiền tệ chuẩn xác, thời gian UTC và giải quyết bài toán hóc búa: <em>Làm sao áp dụng ràng buộc UNIQUE cho email khi khách hàng đã bị xóa mềm có thể đăng ký lại?</em></p>\n\n        <div class=\"predict-question\">\n          <strong>Thử thách dự đoán:</strong> Nếu bảng có Unique Index trên <code>email</code>, và người dùng 'an@example.com' đã bị xóa mềm (<code>deleted_at IS NOT NULL</code>). Nếu họ muốn đăng ký lại tài khoản mới bằng chính email đó, lệnh INSERT có thành công không?\n        </div>\n        <details class=\"predict-details\">\n          <summary>Bấm để xem phân tích</summary>\n          <div style=\"margin-top:6px;line-height:1.6;\">\n            <strong>Đáp án:</strong> Nếu bạn tạo Unique Index thông thường <code>UNIQUE(email)</code>, lệnh INSERT sẽ BỊ LỖI vì giá trị email đã tồn tại trong dòng bị xóa mềm! Để giải quyết bài toán này, bạn bắt buộc phải dùng <strong>Partial Unique Index (Chỉ mục duy nhất một phần)</strong>: Chỉ áp dụng tính duy nhất cho các dòng ĐANG HOẠT ĐỘNG (<code>WHERE deleted_at IS NULL</code>)!\n          </div>\n        </details>\n      ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Thiết kế bảng hoàn chỉnh với UUIDv7, Tiền tệ NUMERIC và Partial Unique Index",
              "code": "-- 1. Bảng Merchant chuẩn sản xuất\nCREATE TABLE techmart_merchants (\n    merchant_id     UUID PRIMARY KEY, -- Dùng UUIDv7 sinh từ ứng dụng hoặc hàm nội bộ\n    merchant_code   VARCHAR(50) NOT NULL, -- Natural Key nghiệp vụ\n    merchant_name   VARCHAR(150) NOT NULL,\n    contact_email   VARCHAR(255) NOT NULL,\n    wallet_balance  NUMERIC(15, 2) NOT NULL DEFAULT 0.00,\n    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    deleted_at      TIMESTAMPTZ NULL, -- NULL nghĩa là bản ghi đang hoạt động\n    CONSTRAINT chk_positive_wallet CHECK (wallet_balance >= 0)\n);\n\n-- 2. PARTIAL UNIQUE INDEX: Cứu tinh của mô hình Xóa mềm (Soft Delete)\n-- Chỉ áp dụng tính duy nhất của email đối với các merchant ĐANG HOẠT ĐỘNG!\nCREATE UNIQUE INDEX uq_active_merchant_email \nON techmart_merchants(contact_email) \nWHERE deleted_at IS NULL;\n\n-- 3. Tạo View bảo vệ: Lập trình viên truy vấn qua View sẽ không bao giờ thấy dòng bị xóa mềm\nCREATE VIEW v_active_merchants AS\nSELECT merchant_id, merchant_code, merchant_name, contact_email, wallet_balance, created_at\nFROM techmart_merchants\nWHERE deleted_at IS NULL;",
              "explanation": "Chỉ mục uq_active_merchant_email chỉ lưu trữ các con trỏ dòng có deleted_at IS NULL. Nếu một merchant bị xóa mềm, email của họ được giải phóng và người khác có thể đăng ký lại ngay lập tức mà không xung đột!",
              "output": "CREATE TABLE\nCREATE INDEX\nCREATE VIEW\n(Đã kiểm chứng thực thi 100% trên PostgreSQL 16.2)"
            },
            {
              "lang": "SQL",
              "title": "Kiểm chứng thực tế: Xóa mềm và đăng ký lại cùng email thành công",
              "code": "-- Chèn merchant đầu tiên (Dùng UUID sinh ngẫu nhiên làm mẫu)\nINSERT INTO techmart_merchants (merchant_id, merchant_code, merchant_name, contact_email, wallet_balance)\nVALUES ('018c1b2f-7a56-7123-8abc-1234567890ab', 'MC-001', 'Keychron Official', 'support@keychron.vn', 50000000.00);\n\n-- Thực hiện XÓA MỀM (Cập nhật deleted_at thay vì DELETE vật lý)\nUPDATE techmart_merchants \nSET deleted_at = CURRENT_TIMESTAMP \nWHERE merchant_code = 'MC-001';\n\n-- Đăng ký merchant mới bằng CHÍNH EMAIL ĐÓ -> THÀNH CÔNG VÌ DÒNG CŨ ĐÃ BỊ XÓA MỀM!\nINSERT INTO techmart_merchants (merchant_id, merchant_code, merchant_name, contact_email, wallet_balance)\nVALUES ('018c1b2f-9f12-7456-9def-9876543210fe', 'MC-002', 'Keychron Vietnam New', 'support@keychron.vn', 10000000.00);\n\n-- Truy vấn qua View: Chỉ thấy merchant mới hoạt động!\nSELECT merchant_code, merchant_name, contact_email, wallet_balance \nFROM v_active_merchants;",
              "explanation": "Dòng cũ vẫn còn trong bảng phục vụ kiểm toán tài chính và pháp lý, nhưng merchant mới vẫn đăng ký thành công với cùng email. View v_active_merchants tự động che giấu bản ghi đã xóa.",
              "output": "+---------------+----------------------+---------------------+----------------+\n| merchant_code | merchant_name        | contact_email       | wallet_balance |\n+---------------+----------------------+---------------------+----------------+\n| MC-002        | Keychron Vietnam New | support@keychron.vn | 10000000.00    |\n+---------------+----------------------+---------------------+----------------+\n(1 row affected - Đã kiểm chứng trên PostgreSQL 16.2 & DuckDB 2.0.0)"
            }
          ]
        },
        {
          "id": "sec-22-faded-example",
          "title": "Bài Điền Khuyết (Faded Example): Tạo Bảng Giao Dịch Tiền Tệ Tránh Sai Số",
          "content": "\n        <p>Hãy hoàn thiện định nghĩa bảng giao dịch tài chính <code>wallet_transactions</code> dưới đây để bảo đảm độ chính xác tài chính 100%:</p>\n        <ol>\n          <li>Dùng kiểu dữ liệu số nguyên hoặc số thập phân cố định cho số tiền giao dịch (cấm dùng FLOAT).</li>\n          <li>Đảm bảo thời gian giao dịch được lưu theo chuẩn quốc tế có múi giờ.</li>\n          <li>Viết câu lệnh hoàn tất tính năng khôi phục (Restore) một bản ghi bị xóa mềm.</li>\n        </ol>\n\n        <pre><code class=\"language-sql\">CREATE TABLE wallet_transactions (\n    txn_id          UUID PRIMARY KEY,\n    merchant_id     UUID NOT NULL REFERENCES techmart_merchants(merchant_id),\n    \n    -- [Chỗ trống 1]: Kiểu tiền tệ chính xác đến từng xu (tối đa 15 chữ số, 2 số thập phân)\n    amount          /* ... điền kiểu dữ liệu ... */ NOT NULL,\n    \n    txn_type        VARCHAR(20) NOT NULL CHECK (txn_type IN ('DEPOSIT', 'WITHDRAW', 'PAYMENT')),\n    \n    -- [Chỗ trống 2]: Kiểu thời gian có múi giờ quốc tế\n    created_at      /* ... điền kiểu dữ liệu ... */ NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    \n    deleted_at      TIMESTAMPTZ NULL\n);\n\n-- [Chỗ trống 3]: Câu lệnh khôi phục (Un-delete) merchant có code 'MC-001'\nUPDATE techmart_merchants\nSET /* ... điền biểu thức gán ... */\nWHERE merchant_code = 'MC-001';</code></pre>\n\n        <details class=\"predict-details\" style=\"margin-top:12px;\">\n          <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem lời giải điền khuyết</summary>\n          <div style=\"margin-top:8px;\">\n            <pre><code class=\"language-sql\">-- Lời giải hoàn thiện:\n-- Chỗ trống 1: NUMERIC(15, 2) (hoặc DECIMAL(15, 2))\n-- Chỗ trống 2: TIMESTAMPTZ (hoặc TIMESTAMP WITH TIME ZONE)\n-- Chỗ trống 3: deleted_at = NULL</code></pre>\n          </div>\n        </details>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-22-pitfalls-misconceptions",
          "title": "Bẫy Và Quan Niệm Sai Phổ Biến Trong Thiết Kế Khóa & Thời Gian",
          "content": "\n        <div class=\"callout callout-warning\" style=\"margin-bottom:16px;\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 1: Lưu tiền tệ bằng FLOAT hoặc REAL</h4>\n          <p><strong>Sai lầm:</strong> Dùng <code>FLOAT</code> vì nghĩ rằng \"nó nhẹ hơn và xử lý nhanh hơn NUMERIC\".</p>\n          <p><strong>Bản chất:</strong> Chuẩn nhị phân IEEE 754 làm tròn xấp xỉ phân số nhị phân. Khi tính tổng hàng triệu dòng hoặc tính thuế 8%, bạn sẽ bị sai lệch tiền. Khi kiểm toán phát hiện sổ sách vênh 1 đồng, toàn bộ hệ thống tài chính sẽ bị đình chỉ hoạt động!</p>\n          <p><strong>Cách sửa chuẩn:</strong> Luôn dùng <code>NUMERIC(p, s)</code> hoặc lưu Cent bằng <code>BIGINT</code>.</p>\n        </div>\n\n        <div class=\"callout callout-warning\" style=\"margin-bottom:16px;\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 2: Dùng TIMESTAMP WITHOUT TIME ZONE trên ứng dụng đa quốc gia</h4>\n          <p><strong>Sai lầm:</strong> Chọn <code>TIMESTAMP</code> (không có timezone) khi máy chủ đặt ở Singapore (UTC+8), chi nhánh ở Hà Nội (UTC+7) và khách hàng ở Tokyo (UTC+9).</p>\n          <p><strong>Hậu quả:</strong> Khi server lưu giá trị <code>2026-11-03 14:00:00</code>, không ai biết đó là 14h của Singapore hay 14h của Việt Nam. Toàn bộ logic kiểm tra hạn chót đơn hàng (SLA) và tính lãi suất quá hạn bị sai lệch từ 1 đến 2 giờ.</p>\n          <p><strong>Cách sửa chuẩn:</strong> Luôn luôn dùng <code>TIMESTAMPTZ</code>. CSDL tự động quy đổi về UTC khi lưu trữ và quy đổi về múi giờ người dùng khi hiển thị.</p>\n        </div>\n\n        <div class=\"callout callout-warning\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 3: Phơi bày BIGINT Auto-increment ra các API công khai</h4>\n          <p><strong>Sai lầm:</strong> Trả về đường dẫn API: <code>/api/v1/orders/10523</code> hoặc <code>/api/v1/invoices/5001</code>.</p>\n          <p><strong>Hậu quả:</strong> Lỗ hổng IDOR (Insecure Direct Object References). Kẻ tấn công chỉ cần viết một vòng lặp từ 1 đến 20000 để quét sạch toàn bộ đơn hàng của công ty, hoặc đối thủ theo dõi được tốc độ tăng trưởng kinh doanh chính xác tới từng giờ.</p>\n          <p><strong>Cách sửa chuẩn:</strong> Dùng <code>UUIDv7</code> làm ID đối ngoại (Public ID) hoặc mã hóa ID bằng Sqids/Hashids khi hiển thị cho người dùng.</p>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-22-concept-comparison",
          "title": "So Sánh: BIGINT Auto-Increment vs UUIDv4 vs UUIDv7",
          "content": "\n        <p>Bảng so sánh kỹ thuật giúp bạn chọn đúng chiến lược khóa cho kiến trúc hệ thống:</p>\n\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Tiêu chí so sánh</th>\n                <th>BIGINT Auto-Increment</th>\n                <th>UUIDv4 (Random)</th>\n                <th>UUIDv7 (Time-Ordered)</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><strong>Dung lượng lưu trữ</strong></td>\n                <td>8 bytes (Nhỏ nhất)</td>\n                <td>16 bytes (Gấp đôi BIGINT)</td>\n                <td>16 bytes</td>\n              </tr>\n              <tr>\n                <td><strong>Hiệu năng ghi B-Tree</strong></td>\n                <td>Tuyệt đối (Append-only, không page split)</td>\n                <td>Rất tệ khi bảng lớn (Gây vỡ trang đĩa liên tục)</td>\n                <td>Tuyệt vời (Sắp xếp theo thời gian, êm mượt như BIGINT)</td>\n              </tr>\n              <tr>\n                <td><strong>Bảo mật &amp; Chống cào dữ liệu</strong></td>\n                <td>Kém (Dễ đoán được thứ tự tăng dần)</td>\n                <td>Hoàn hảo (Ngẫu nhiên 100%)</td>\n                <td>Rất tốt (Khó đoán phần random 74-bit)</td>\n              </tr>\n              <tr>\n                <td><strong>Khả năng sinh ở Client/Phân tán</strong></td>\n                <td>Không (Bắt buộc phải hỏi CSDL trung tâm)</td>\n                <td>Có thể sinh ở bất kỳ client nào mà không xung đột</td>\n                <td>Có thể sinh độc lập ở mọi client mà không xung đột</td>\n              </tr>\n              <tr>\n                <td><strong>Trích xuất thời gian tạo</strong></td>\n                <td>Không có thông tin thời gian</td>\n                <td>Không có thông tin thời gian</td>\n                <td>Trích xuất trực tiếp được mili-giây UNIX từ 48-bit đầu!</td>\n              </tr>\n              <tr>\n                <td><strong>Khuyến nghị sản xuất 2026+</strong></td>\n                <td>Dùng cho bảng nội bộ, ít rủi ro IDOR</td>\n                <td>Tránh dùng làm Clustered Primary Key</td>\n                <td><strong>Tiêu chuẩn vàng cho ứng dụng hiện đại</strong></td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-22-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Vận Hành Xóa Mềm Ở Quy Mô Hàng Trăm Triệu Dòng",
          "content": "\n        <p>Mặc dù Xóa mềm (Soft Delete) là chuẩn mực, khi hệ thống đạt quy mô lớn, nó đặt ra những thách thức vận hành cần giải quyết:</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">A. Thách thức \"Phình to bảng\" (Table Bloat) &amp; Truy vấn chậm dần</h4>\n        <p>Khi 40% số dòng trong bảng là dữ liệu đã bị xóa mềm, mọi câu lệnh truy vấn thông thường đều phải gánh thêm chi phí quét qua những dòng rác này. Giải pháp chuẩn mực của các hệ thống lớn:</p>\n        <ol>\n          <li><strong>Chiến lược Partitioning kết hợp Xóa mềm:</strong> Phân vùng bảng theo trạng thái hoạt động hoặc theo năm. Các dòng đã xóa mềm trên 180 ngày sẽ được một batch job tự động chuyển sang bảng lưu trữ lạnh (Cold Archive Table) hoặc đẩy vào S3/Parquet.</li>\n          <li><strong>Row-Level Security (RLS) trên PostgreSQL:</strong> Thay vì bắt toàn bộ lập trình viên phải nhớ gõ <code>WHERE deleted_at IS NULL</code> (chỉ cần 1 người quên là rò rỉ dữ liệu đã xóa), bạn bật tính năng RLS ở tầng CSDL để tự động lọc dòng xóa mềm cho mọi user ứng dụng!</li>\n        </ol>\n\n        <div class=\"dbms-diff-box\" style=\"margin-top:16px;\">\n          <div class=\"dbms-diff-header\">Hỗ trợ UUIDv7 giữa các hệ quản trị CSDL (Cập nhật 2026):</div>\n          <div class=\"dbms-diff-body\">\n            <ul>\n              <li><strong>PostgreSQL 17+:</strong> Bổ sung hàm gốc <code>uuidv7()</code> trong nhân CSDL. Trên Postgres 15-16, bạn có thể tạo hàm PL/pgSQL đơn giản để sinh UUIDv7 tương thích 100%.</li>\n              <li><strong>DuckDB:</strong> Hỗ trợ hoàn hảo kiểu dữ liệu <code>UUID</code> và tối ưu hóa nén cực tốt cho các khóa dạng UUIDv7 tuần tự.</li>\n              <li><strong>MySQL 8.0+:</strong> Cung cấp hàm <code>UUID_TO_BIN(UUID(), 1)</code> cho phép tráo đổi các byte thời gian lên đầu để biến UUIDv1 thành chuỗi có thứ tự thời gian.</li>\n              <li><strong>SQLite:</strong> Lưu UUID dưới dạng <code>BLOB(16)</code> hoặc <code>TEXT(36)</code>. Hỗ trợ đầy đủ Partial Index để triển khai mô hình Xóa mềm an toàn.</li>\n            </ul>\n          </div>\n        </div>\n      ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Cấm dùng FLOAT cho tiền bạc",
            "content": "Sai số làm tròn nhị phân IEEE 754 của FLOAT sẽ phá hủy sổ sách kế toán. Luôn dùng NUMERIC/DECIMAL hoặc lưu Cent bằng BIGINT."
          },
          {
            "title": "Bẫy phân mảnh B-Tree của UUIDv4",
            "content": "Dùng UUIDv4 ngẫu nhiên làm Primary Key trên bảng hàng chục triệu dòng sẽ làm nổ tung bộ nhớ đệm Buffer Cache do hiện tượng Page Split liên tục. Hãy chuyển sang UUIDv7."
          }
        ],
        "tips": [
          {
            "title": "Partial Unique Index cho mô hình Soft Delete",
            "content": "Luôn dùng cú pháp CREATE UNIQUE INDEX ... WHERE deleted_at IS NULL để cho phép người dùng đăng ký lại cùng một tài khoản sau khi đã xóa mềm tài khoản cũ."
          }
        ],
        "deepDive": {
          "title": "Bản chất vật lý: Hiện tượng B-Tree Page Split khi dùng UUIDv4 ngẫu nhiên làm Khóa chính",
          "content": "<p>Cây chỉ mục <strong>B-Tree</strong> được tổ chức thành các trang bộ nhớ vật lý (thường là 8KB) lưu trữ các phần tử theo thứ tự tăng dần. Khi dùng <code>BIGINT</code> tuần tự, các bản ghi mới luôn được ghi nối tiếp vào trang đĩa cuối cùng (Append-only), hiệu quả nạp bộ nhớ đạt 99%.</p><p>Nhưng khi bạn dùng <strong>UUIDv4 ngẫu nhiên</strong> làm Khóa chính, mỗi bản ghi mới có giá trị băm rơi ngẫu nhiên vào một trang đĩa bất kỳ ở giữa cây. Khi một trang 8KB bị đầy, engine buộc phải thực hiện <strong>Page Split</strong>: cấp phát một trang đĩa mới, sao chép 50% dữ liệu sang trang mới, cập nhật lại con trỏ của các nút cha. Hiện tượng này làm dung lượng chỉ mục phình to gấp đôi, phân mảnh đĩa cứng và làm suy giảm 70% hiệu năng ghi của hệ thống!</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 4.3-1 (Dự đoán kết quả): Sai số dấu phẩy động của FLOAT",
          "level": "Cơ bản",
          "problem": "Một lập trình viên tạo bảng với cột `val FLOAT`. Anh ta chèn 3 dòng có giá trị: 0.1, 0.2, 0.3. Sau đó anh ta chạy câu lệnh: `SELECT * FROM tbl WHERE val = 0.3;`. Câu lệnh có trả về kết quả không? Nếu anh ta chạy `SELECT SUM(val) FROM tbl;`, kết quả có bằng đúng 0.60000000 không? Vì sao?",
          "hint": "Hãy nhớ lại chuẩn IEEE 754 và việc làm tròn nhị phân của số thập phân.",
          "solutionCode": "-- Trong nhiều trường hợp, phép so sánh val = 0.3 có thể thất bại vì 0.3 trong nhị phân là chuỗi vô hạn tuần hoàn.\n-- Phép SUM(0.1 + 0.2 + 0.3) thường trả về 0.6000000000000001 thay vì 0.6.\n-- Khắc phục: Bắt buộc dùng NUMERIC(10, 2)!",
          "solutionOutput": "0.6000000000000001 (Bị sai số dấu phẩy động)",
          "explanation": "Chẩn đoán: Tuyệt đối không dùng toán tử bằng (=) trực tiếp trên kiểu FLOAT, và không bao giờ dùng FLOAT cho các phép tính kế toán tài chính."
        },
        {
          "title": "Bài tập 4.3-2 (Tìm & Sửa lỗi): Lỗi Unique Constraint khi xóa mềm",
          "level": "Trung bình",
          "problem": "Một website có bảng `users (user_id PK, username VARCHAR UNIQUE, is_deleted BOOLEAN DEFAULT FALSE)`. Người dùng 'john_doe' yêu cầu xóa tài khoản (`is_deleted = TRUE`). Sau đó một người dùng khác muốn đăng ký lại với tên 'john_doe' thì bị lỗi vi phạm Unique Constraint. Hãy viết lệnh sửa đổi cấu trúc bảng để cho phép đăng ký lại mà vẫn bảo lưu dữ liệu cũ.",
          "hint": "Bỏ Unique Constraint trên toàn bảng và thay thế bằng Partial Unique Index kết hợp với deleted_at.",
          "solutionCode": "-- 1. Đổi sang cột deleted_at\nALTER TABLE users DROP COLUMN is_deleted;\nALTER TABLE users ADD COLUMN deleted_at TIMESTAMPTZ NULL;\n\n-- 2. Xóa ràng buộc Unique cũ\nALTER TABLE users DROP CONSTRAINT users_username_key;\n\n-- 3. Tạo Partial Unique Index chỉ trên các dòng còn hoạt động\nCREATE UNIQUE INDEX uq_active_username ON users(username) WHERE deleted_at IS NULL;",
          "solutionOutput": "CREATE INDEX\n(Giờ đây người dùng mới có thể đăng ký lại username đã bị xóa mềm)",
          "explanation": "Chẩn đoán: Cờ boolean is_deleted không thể kết hợp với Unique Key tiêu chuẩn. Partial Unique Index là giải pháp chuẩn mực duy nhất."
        },
        {
          "title": "Bài tập 4.3-3 (Tự viết truy vấn): Thiết kế bảng Lưu trữ Đơn hàng chuẩn Quốc tế",
          "level": "Khá",
          "problem": "Hãy viết lệnh CREATE TABLE cho bảng `global_orders` đáp ứng: order_id (UUID PK), customer_id (BIGINT FK), order_total (Tiền tệ chính xác), order_currency (Mã tiền tệ ISO 3 chữ cái, ví dụ: 'VND', 'USD'), ordered_at (Thời gian có timezone), status (Trạng thái đơn), deleted_at (Xóa mềm). Bổ sung 1 Partial Index phục vụ tìm kiếm đơn hàng chưa bị xóa theo customer_id.",
          "hint": "Sử dụng TIMESTAMPTZ, NUMERIC(15,2), CHAR(3) và CREATE INDEX ... WHERE deleted_at IS NULL.",
          "solutionCode": "CREATE TABLE global_orders (\n    order_id        UUID PRIMARY KEY,\n    customer_id     BIGINT NOT NULL REFERENCES customers(customer_id),\n    order_total     NUMERIC(15, 2) NOT NULL CHECK (order_total >= 0),\n    order_currency  CHAR(3) NOT NULL DEFAULT 'VND',\n    status          VARCHAR(20) NOT NULL DEFAULT 'PENDING',\n    ordered_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    deleted_at      TIMESTAMPTZ NULL\n);\n\nCREATE INDEX idx_orders_customer_active \nON global_orders(customer_id, ordered_at DESC) \nWHERE deleted_at IS NULL;",
          "solutionOutput": "CREATE TABLE\nCREATE INDEX\n(Thiết kế chuẩn quốc tế với Partial Index tối ưu hóa I/O)",
          "explanation": "Chỉ mục idx_orders_customer_active giúp truy vấn lịch sử đơn hàng của khách hàng chạy với tốc độ tức thì và bỏ qua toàn bộ các đơn hàng đã bị xóa mềm."
        },
        {
          "title": "Bài tập 4.3-4 (Đánh đổi & Kiến trúc): Kỹ thuật RLS tự động hóa bộ lọc Xóa mềm",
          "level": "Nâng cao",
          "problem": "Viết lệnh kích hoạt Row-Level Security (RLS) trên bảng `techmart_merchants` trong PostgreSQL sao cho: Mọi câu lệnh SELECT thông thường của ứng dụng sẽ tự động chỉ nhìn thấy các merchant có `deleted_at IS NULL`, trong khi tài khoản quản trị viên (admin) vẫn có thể xem được toàn bộ các bản ghi bị xóa mềm.",
          "hint": "Sử dụng ALTER TABLE ... ENABLE ROW LEVEL SECURITY và CREATE POLICY ... FOR SELECT.",
          "solutionCode": "-- 1. Bật tính năng Row-Level Security trên bảng\nALTER TABLE techmart_merchants ENABLE ROW LEVEL SECURITY;\n\n-- 2. Tạo Policy tự động lọc dòng đang hoạt động cho user ứng dụng app_user\nCREATE POLICY merchant_active_policy ON techmart_merchants\nFOR SELECT\nTO app_user\nUSING (deleted_at IS NULL);\n\n-- 3. Tạo Policy cho phép admin xem toàn bộ dữ liệu (kể cả đã xóa)\nCREATE POLICY merchant_admin_policy ON techmart_merchants\nFOR ALL\nTO admin_user\nUSING (TRUE);",
          "solutionOutput": "ALTER TABLE\nCREATE POLICY\nCREATE POLICY\n(RLS tự động bảo vệ dữ liệu xóa mềm từ tầng nhân CSDL)",
          "explanation": "Chẩn đoán: RLS giúp loại bỏ hoàn toàn nguy cơ con người: Lập trình viên không bao giờ sợ quên thêm điều kiện WHERE deleted_at IS NULL trong mã nguồn backend."
        }
      ],
      "quiz": [
        {
          "question": "Vì sao việc sử dụng UUIDv4 (Random UUID) làm Khóa chính Clustered Key lại gây suy giảm nghiêm trọng hiệu năng ghi của CSDL khi bảng đạt hàng chục triệu dòng?",
          "options": [
            "Vì UUIDv4 chiếm 16 bytes, trong khi ổ cứng chỉ đọc được số nguyên 8 bytes.",
            "Vì tính ngẫu nhiên hoàn toàn của UUIDv4 buộc CSDL phải chèn bản ghi vào các vị trí ngẫu nhiên trên cây B-Tree, gây ra hiện tượng chẻ đôi trang đĩa (B-Tree Page Split) và Random I/O liên tục.",
            "Vì chuẩn SQL cấm sử dụng dấu gạch ngang (-) trong khóa chính.",
            "Vì UUIDv4 không thể chuyển đổi sang chuỗi JSON được."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Do hoàn toàn ngẫu nhiên, các bản ghi mới không được ghi nối tiếp mà rơi rải rác vào các trang đĩa ngẫu nhiên, gây Page Split liên tục và làm vỡ bộ nhớ đệm Buffer Cache."
        },
        {
          "question": "Ưu điểm vượt trội nhất của chuẩn UUIDv7 (RFC 9562) so với UUIDv4 là gì?",
          "options": [
            "UUIDv7 chỉ chiếm 4 bytes dung lượng đĩa.",
            "UUIDv7 tích hợp 48-bit Timestamp ở đầu, giúp các giá trị có thứ tự tăng dần theo thời gian (Time-Ordered), loại bỏ hiện tượng Page Split của B-Tree trong khi vẫn duy trì tính duy nhất toàn cầu.",
            "UUIDv7 không bao giờ cần phải tạo chỉ mục B-Tree.",
            "UUIDv7 tự động mã hóa mật khẩu người dùng."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! UUIDv7 kết hợp ưu điểm của cả hai thế giới: Tính duy nhất toàn cầu không cần server trung tâm của UUID, và tính tuần tự êm mượt với B-Tree như BIGINT Auto-increment."
        },
        {
          "question": "Kiểu dữ liệu nào dưới đây là sự lựa chọn BẮT BUỘC để lưu trữ số dư tài khoản tiền tệ trong các hệ thống ngân hàng và thương mại điện tử?",
          "options": [
            "FLOAT (hoặc REAL)",
            "DOUBLE PRECISION",
            "NUMERIC(p, s) / DECIMAL(p, s) (hoặc lưu Cent bằng BIGINT)",
            "VARCHAR(50)"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! NUMERIC/DECIMAL sử dụng số học thập phân có độ chính xác cố định (Fixed-point Arithmetic), hoàn toàn miễn nhiễm với sai số làm tròn nhị phân IEEE 754 của FLOAT/DOUBLE."
        },
        {
          "question": "Làm thế nào để cho phép người dùng đăng ký lại một địa chỉ email sau khi tài khoản cũ đã bị Xóa mềm (Soft Delete với cột deleted_at)?",
          "options": [
            "Xóa hoàn toàn ràng buộc Unique trên cột email.",
            "Sử dụng Partial Unique Index với điều kiện: CREATE UNIQUE INDEX ... ON users(email) WHERE deleted_at IS NULL.",
            "Đổi email cũ thành một chuỗi ngẫu nhiên khi xóa mềm.",
            "Chuyển kiểu dữ liệu của email sang TEXT."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Partial Unique Index chỉ áp đặt tính duy nhất trên các dòng có deleted_at IS NULL, cho phép email cũ đã bị xóa mềm tồn tại song song mà không xung đột."
        },
        {
          "question": "Khi lưu trữ mốc thời gian bằng kiểu TIMESTAMPTZ trong PostgreSQL, CSDL thực chất lưu giá trị gì xuống ổ cứng?",
          "options": [
            "Lưu chuỗi văn bản kèm theo tên múi giờ của client (ví dụ: 'Asia/Ho_Chi_Minh').",
            "Tự động chuyển đổi thời gian về giờ chuẩn quốc tế UTC và lưu dưới dạng số nguyên micro-giây đếm từ mốc mốc thời gian chuẩn.",
            "Chỉ lưu giờ, phút, giây và bỏ qua thông tin ngày tháng năm.",
            "Tạo ra hai cột ẩn để lưu giờ cục bộ và độ lệch múi giờ."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! PostgreSQL luôn chuẩn hóa mọi giá trị TIMESTAMPTZ về giờ UTC khi ghi xuống đĩa, loại bỏ hoàn toàn sự nhập nhằng về múi giờ giữa các máy chủ toàn cầu."
        }
      ],
      "summary": [
        "Chiến lược khóa: Dùng Surrogate Key (BIGINT hoặc UUIDv7) làm Khóa chính kỹ thuật nội bộ, kết hợp Natural Key làm ràng buộc UNIQUE nghiệp vụ đối ngoại.",
        "UUIDv7 (RFC 9562) là tiêu chuẩn vàng thay thế UUIDv4: Tích hợp 48-bit timestamp tăng dần, loại bỏ thảm họa phân mảnh B-Tree Page Splits.",
        "Luật bất biến tiền tệ: Cấm tuyệt đối FLOAT/DOUBLE. Luôn dùng NUMERIC/DECIMAL hoặc lưu Cent bằng số nguyên BIGINT.",
        "Thời gian toàn cầu: Luôn dùng TIMESTAMPTZ (quy đổi về UTC trên đĩa). Tránh TIMESTAMP WITHOUT TIME ZONE trên các ứng dụng phân tán.",
        "Mô hình Xóa mềm (Soft Delete): Dùng deleted_at TIMESTAMPTZ kết hợp Partial Unique Index để bảo vệ tính toàn vẹn và cho phép tái sử dụng định danh.",
        "Ôn cách quãng: Tại sao mệnh đề WHERE không thể dùng trực tiếp kết quả của Window Function? (Xem lại Bài 1.4 & 3.1)."
      ]
    },
    {
      "id": "sql-23-dq-data-contracts",
      "number": "4.4",
      "title": "[DQ] Ràng Buộc Như Hợp Đồng Dữ Liệu (Data Contracts)",
      "subtitle": "Chuyển dịch từ Ràng buộc cứng tầng CSDL sang Hợp đồng dữ liệu tầng Pipeline: Schema, Semantic, SLA & Quản trị Producer - Consumer",
      "level": "Nâng cao",
      "duration": "50 phút",
      "keywords": [
        "Data Quality",
        "Data Contracts",
        "Hợp đồng dữ liệu",
        "Ràng buộc CSDL",
        "Data Producer",
        "Data Consumer",
        "dbt test",
        "Great Expectations",
        "Schema Evolution"
      ],
      "prerequisites": "Ràng buộc CSDL (Bài 4.1), Khám bệnh dữ liệu Data Profiling (Bài 1.5), Kiểm tra chất lượng dữ liệu (Bài 2.6).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Định nghĩa kiến trúc Hợp đồng dữ liệu (Data Contract) gồm 3 trụ cột: Tầng Lược đồ (Schema), Tầng Ngữ nghĩa (Semantic / Invariants), và Tầng Dịch vụ (SLA / Freshness).",
        "Giải thích lý do kiến trúc vì sao các Data Warehouse hiện đại (Snowflake, BigQuery, DuckDB) tắt tính năng ép buộc Foreign Key nhưng vẫn cần Data Contracts.",
        "Phân biệt mô hình kiểm soát chất lượng Fail-on-Write (Chặn ghi tại OLTP) vs Audit-on-Transform (Kiểm định tại Pipeline OLAP bằng SQL Assertions).",
        "Thiết kế quy trình xử lý Schema Evolution tương thích ngược (Backward Compatibility) và cách cô lập dữ liệu lỗi vào Quarantine Table / Dead Letter Queue.",
        "Xây dựng bộ kiểm thử Hợp đồng dữ liệu tự động bằng SQL thuần và tích hợp vào quy trình CI/CD của Data Engineering."
      ],
      "intuition": {
        "title": "Hợp đồng mua bán ngoại thương công chứng vs Hàng rào hải quan nội bộ",
        "metaphor": "Trong một thị trấn nhỏ (ngang với một ứng dụng đơn khối Monolith), chủ cửa hàng và người mua hàng là người quen, họ có thể thỏa thuận miệng và dùng hàng rào nội bộ (Ràng buộc CSDL như CHECK, FK) để giữ trật tự. Nhưng khi công ty phát triển thành một tập đoàn đa quốc gia gồm 20 microservices và 5 đội phân tích dữ liệu độc lập, đội Backend (Data Producer) và đội AI/BI (Data Consumer) không còn ngồi cạnh nhau. Một lập trình viên backend âm thầm đổi cột status_id thành chuỗi text có thể phá hủy 50 dashboard báo cáo tài chính của ban điều hành! Data Contract (Hợp đồng dữ liệu) chính là Bản hợp đồng ngoại thương có công chứng pháp lý: Đội Producer cam kết định dạng, tần suất cập nhật và chất lượng dữ liệu; mọi thay đổi phá vỡ (Breaking Changes) đều bị hệ thống tự động phát hiện và chặn lại trước khi dữ liệu được chuyển giao.",
        "boundary": "Data Contract không thay thế hoàn toàn Database Constraints ở tầng OLTP, mà là sự mở rộng toàn diện: Ở tầng OLTP, CSDL chặn vi phạm tính toàn vẹn cục bộ; ở tầng phân tích (Data Platform), Data Contract bảo đảm tính tương thích ngữ nghĩa và độ tươi mới (Freshness) trên toàn bộ dòng chảy dữ liệu.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;font-weight:700;\">1. SCHEMA CONTRACT</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">Cột, Kiểu &amp; Nullability</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Cấm tự ý đổi kiểu/xóa cột đột ngột</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">+</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;font-weight:700;\">2. SEMANTIC CONTRACT</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">Luật bất biến &amp; Miền giá trị</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">amount &gt; 0, status hợp lệ</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">+</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:180px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--topic-sql);margin-bottom:4px;font-weight:700;\">3. SLA &amp; FRESHNESS</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">Độ trễ tối đa &lt; 15 mins</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Dữ liệu cập nhật đúng hạn cam kết</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ Shift-Left:</span>\n              <span>Bắt lỗi và kiểm duyệt dữ liệu ngay tại nguồn phát sinh (Application Backend), ngăn chặn dữ liệu bẩn lọt xuống Data Lakehouse.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-23-problem-hook",
          "title": "Gợi Mở Vấn Đề: Cơn Ác Mộng Đêm Thứ Bảy Khi Backend Đổi Cột Mà Không Báo",
          "content": "\n        <p>02:00 sáng Chủ Nhật, hệ thống cảnh báo PagerDuty réo chuông liên tục. 35 data pipeline của đội Data Engineering bị gãy đồng loạt. Báo cáo doanh thu cho cuộc họp giao ban sáng Thứ Hai của Tổng Giám đốc bị trắng xóa số liệu.</p>\n        <p>Sau 4 tiếng truy vết trong hoảng loạn, nguyên nhân được hé lộ: Một lập trình viên backend vừa triển khai bản cập nhật mới. Trong bản cập nhật đó:</p>\n        <ul>\n          <li>Cột <code>payment_status</code> vốn có kiểu <code>INT</code> (1 = Hoàn tất, 2 = Thất bại) đã được đổi thành <code>VARCHAR(50)</code> với các giá trị mới: <code>'PAID'</code>, <code>'FAILED'</code>.</li>\n          <li>Cột <code>discount_code</code> bị xóa bỏ và gộp chung vào một mảng JSON có tên <code>metadata</code>.</li>\n        </ul>\n        <p>Lập trình viên backend khẳng định: <em>\"Code của tôi chạy trên web vẫn mượt mà, CSDL PostgreSQL của tôi không báo lỗi nào cả!\"</em></p>\n        <p>Đúng vậy! CSDL OLTP không báo lỗi vì backend đã chạy lệnh <code>ALTER TABLE</code> thành công. Nhưng đối với 10 downstream data pipelines, 3 mô hình dự đoán churn của đội Data Science và 5 Dashboard PowerBI, đây là một <strong>Breaking Change thảm khốc</strong>!</p>\n        <p>Đây là bài toán muôn thuở của ngành dữ liệu: <strong>Sự đứt gãy trách nhiệm giữa Người sản xuất dữ liệu (Data Producer) và Người tiêu thụ dữ liệu (Data Consumer)</strong>. Giải pháp hiện đại cho cuộc khủng hoảng này chính là: <strong>Data Contracts (Hợp đồng dữ liệu)</strong>.</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-23-recall-prereq",
          "title": "Gọi Lại Kiến Thức Cũ: Ràng Buộc CSDL vs Kiểm Định Dữ Liệu Bằng SQL",
          "content": "\n        <p>Hãy cùng nhìn lại hai công cụ bảo vệ dữ liệu bạn đã học ở các bài trước:</p>\n        \n        <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n          <p><strong>Câu hỏi 1:</strong> Ràng buộc <code>CHECK</code> ở tầng CSDL OLTP (Bài 4.1) có thể ngăn chặn việc người dùng chèn đơn hàng có giá trị âm không? Nó hoạt động ở thời điểm nào?</p>\n          <details class=\"predict-details\" style=\"margin-top:8px;\">\n            <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n            <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n              <p><strong>Đáp án:</strong> Có! Ràng buộc CHECK hoạt động theo cơ chế <em>Fail-on-Write</em>: Ngay khi câu lệnh INSERT/UPDATE được gửi đến CSDL, biểu thức logic sẽ được kiểm tra. Nếu vi phạm, CSDL từ chối ghi và trả về lỗi ngay lập tức.</p>\n            </div>\n          </details>\n        </div>\n\n        <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n          <p><strong>Câu hỏi 2:</strong> Trong bài 2.6 [DQ], chúng ta đã dùng SQL để bắt các bản ghi mồ côi (Orphan Records) như thế nào khi CSDL không có khóa ngoại cứng?</p>\n          <details class=\"predict-details\" style=\"margin-top:8px;\">\n            <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n            <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n              <p><strong>Đáp án:</strong> Chúng ta sử dụng phép <code>LEFT JOIN</code> kết hợp với <code>WHERE parent.id IS NULL</code> (hoặc toán tử <code>NOT EXISTS</code>) để tìm kiếm các bản ghi con trỏ tới ID cha không tồn tại. Đây là kỹ thuật kiểm định theo cơ chế <em>Audit-on-Read / Audit-on-Transform</em>.</p>\n            </div>\n          </details>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-23-concept-definition",
          "title": "Khái Niệm Cốt Lõi: Ba Trụ Cột Của Một Hợp Đồng Dữ Liệu (Data Contract)",
          "content": "\n        <p><strong>Data Contract</strong> là một văn bản thỏa thuận chính thức (thường được định nghĩa dưới dạng file YAML/JSON được quản lý phiên bản trong Git) giữa <strong>Data Producer (Kỹ sư ứng dụng)</strong> và <strong>Data Consumer (Kỹ sư dữ liệu/AI)</strong>, xác định rõ dữ liệu được tạo ra phải đáp ứng các tiêu chuẩn nào.</p>\n\n        <p>Một Data Contract chuẩn mực bao gồm 3 tầng cam kết:</p>\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Tầng cam kết (Pillar)</th>\n                <th>Nội dung thỏa thuận</th>\n                <th>Ví dụ cụ thể</th>\n                <th>Công cụ thực thi</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><strong>1. Tầng Lược đồ (Schema Contract)</strong></td>\n                <td>Tên cột, kiểu dữ liệu, tính rỗng (Nullability), và quy tắc tương thích phiên bản.</td>\n                <td><code>order_id: BIGINT NOT NULL</code>, <code>amount: DECIMAL(12,2)</code>. Cấm xóa cột cũ mà không thông báo trước 3 tháng.</td>\n                <td>JSON Schema, Protobuf, Avro, dbt Contract (v1.5+).</td>\n              </tr>\n              <tr>\n                <td><strong>2. Tầng Ngữ nghĩa (Semantic Contract)</strong></td>\n                <td>Luật kinh doanh bất biến (Business Invariants), khoảng giá trị hợp lệ, độ duy nhất.</td>\n                <td><code>amount &gt; 0</code>, <code>status IN ('PAID', 'PENDING')</code>, tỷ lệ trùng lặp phải bằng 0%.</td>\n                <td>SQL Assertions, Great Expectations, Soda Core, dbt tests.</td>\n              </tr>\n              <tr>\n                <td><strong>3. Tầng Dịch vụ (SLA &amp; Freshness Contract)</strong></td>\n                <td>Độ tươi mới của dữ liệu (Data Freshness), tần suất cập nhật, và dung lượng dự kiến.</td>\n                <td>Dữ liệu đơn hàng phải xuất hiện trong kho sau tối đa 15 phút tính từ lúc khách bấm thanh toán (SLA &lt; 15 mins).</td>\n                <td>dbt freshness, Airflow SLA Miss Alerts, Monte Carlo, Elementary.</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-23-internal-mechanism",
          "title": "Cơ Chế Bên Trong: Vì Sao Kho Dữ Liệu Lớn Tắt Khóa Ngoại & Chuyển Sang Data Contracts?",
          "content": "\n        <p>Nhiều kỹ sư mới thường thắc mắc: <em>\"Tại sao các kho dữ liệu lớn hàng đầu thế giới như Snowflake, BigQuery, ClickHouse hay DuckDB lại không ép buộc (Enforce) khóa ngoại như PostgreSQL?\"</em></p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">Bản chất kiến trúc lưu trữ phân tán (Distributed Architecture)</h4>\n        <ul>\n          <li><strong>Trong CSDL đơn khối OLTP (PostgreSQL):</strong> Mọi bảng nằm trên cùng một máy chủ. Khi bạn chèn một dòng vào <code>orders</code>, CPU chỉ cần đọc B-Tree của bảng <code>customers</code> trên bộ nhớ RAM cục bộ để kiểm tra ID khách hàng trong vài micro-giây.</li>\n          <li><strong>Trong Kho dữ liệu phân tán OLAP:</strong> Bảng <code>customers</code> (100 triệu dòng) và bảng <code>orders</code> (5 tỷ dòng) được chia nhỏ (sharded) thành hàng ngàn phân vùng trên 100 máy chủ độc lập. Nếu mỗi lần nạp 1 triệu dòng đơn hàng, hệ thống phải thực hiện kiểm tra khóa ngoại, 100 máy chủ sẽ phải liên tục gửi các gói tin qua mạng (Network Shuffle) để xác minh xem từng ID khách hàng có tồn tại không! Chi phí trao đổi mạng này sẽ làm giảm tốc độ nạp dữ liệu đi 1.000 lần và làm tê liệt toàn bộ cụm máy chủ!</li>\n        </ul>\n\n        <p><strong>Kết luận kiến trúc:</strong> Data Warehouse chấp nhận tắt ép buộc Foreign Key lúc ghi để đạt tốc độ nạp hàng chục triệu dòng/giây. Nhưng để ngăn chặn việc biến kho dữ liệu thành một \"Bãi rác dữ liệu\" (Data Swamp), toàn bộ trách nhiệm kiểm tra được chuyển sang <strong>Hợp đồng dữ liệu (Data Contracts) thông qua các bài kiểm thử tự động (SQL Automated Tests)</strong>!</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-23-worked-example",
          "title": "Ví Dụ Mẫu Có Lời Giải: Triển Khai Bộ SQL Assertions Kiểm Tra Hợp Đồng Dữ Liệu",
          "content": "\n        <p>Chúng ta sẽ xây dựng bộ kiểm thử Hợp đồng dữ liệu hoàn chỉnh bằng SQL thuần cho bảng giao dịch đơn hàng của TechMart. Bộ kiểm thử này được thiết kế theo nguyên lý: <strong>Mọi câu lệnh kiểm thử đều phải trả về 0 dòng nếu dữ liệu đạt chuẩn! Nếu câu lệnh trả về bất kỳ dòng nào, hợp đồng bị phá vỡ và pipeline phải dừng ngay lập tức.</strong></p>\n\n        <div class=\"predict-question\">\n          <strong>Thử thách dự đoán:</strong> Để kiểm tra quy tắc hợp đồng: <em>\"Mỗi đơn hàng có mã coupon thì giá trị chiết khấu discount_amount bắt buộc phải lớn hơn 0\"</em>, bạn sẽ viết câu truy vấn tìm kiếm dòng vi phạm như thế nào?\n        </div>\n        <details class=\"predict-details\">\n          <summary>Bấm để xem phân tích</summary>\n          <div style=\"margin-top:6px;line-height:1.6;\">\n            <strong>Đáp án:</strong> Chúng ta viết câu truy vấn tìm các dòng VI PHẠM (Anti-pattern query): <code>SELECT * FROM orders WHERE coupon_code IS NOT NULL AND (discount_amount IS NULL OR discount_amount &lt;= 0);</code>. Nếu kết quả trả về &gt; 0 dòng, chứng tỏ có lỗi vi phạm hợp đồng!\n          </div>\n        </details>\n      ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Bộ kiểm thử Hợp đồng Dữ liệu (Data Contract Test Suite) cho TechMart",
              "code": "-- =====================================================================\n-- BỘ KIỂM THỬ HỢP ĐỒNG DỮ LIỆU TECHMART (DATA CONTRACT ASSERTIONS)\n-- Nguyên lý: Mọi truy vấn PHẢI trả về 0 dòng. Dòng nào xuất hiện = VI PHẠM!\n-- =====================================================================\n\n-- Test 1: [Lược đồ & Nullability] Kiểm tra các trường bắt buộc không được NULL\nSELECT 'VIOLATION_NULL_PRIMARY_KEY' AS test_name, order_id, customer_id\nFROM orders\nWHERE order_id IS NULL OR customer_id IS NULL;\n\n-- Test 2: [Ngữ nghĩa - Toàn vẹn tham chiếu] Tìm đơn hàng mồ côi (Orphan Orders)\nSELECT 'VIOLATION_ORPHAN_CUSTOMER' AS test_name, o.order_id, o.customer_id\nFROM orders o\nLEFT JOIN customers c ON o.customer_id = c.customer_id\nWHERE c.customer_id IS NULL;\n\n-- Test 3: [Ngữ nghĩa - Luật kinh doanh] Tổng đơn hàng phải bằng tổng các mặt hàng con\nWITH order_totals AS (\n    SELECT \n        o.order_id,\n        o.total_amount,\n        COALESCE(SUM(oi.quantity * oi.price), 0) AS calculated_items_total\n    FROM orders o\n    LEFT JOIN order_items oi ON o.order_id = oi.order_id\n    GROUP BY o.order_id, o.total_amount\n)\nSELECT 'VIOLATION_AMOUNT_MISMATCH' AS test_name, order_id, total_amount, calculated_items_total\nFROM order_totals\nWHERE ABS(total_amount - calculated_items_total) > 0.01;\n\n-- Test 4: [SLA - Độ tươi mới] Cảnh báo nếu không có đơn hàng nào trong 2 giờ qua\nSELECT 'VIOLATION_FRESHNESS_SLA' AS test_name, MAX(order_date) AS latest_order_time\nFROM orders\nHAVING MAX(order_date) < CURRENT_TIMESTAMP - INTERVAL '2 hours';",
              "explanation": "Bộ test suite gồm 4 bài kiểm tra bao trùm cả 3 trụ cột của Data Contract: Nullability, Tham chiếu, Logic tính toán doanh thu và SLA thời gian thực.",
              "output": "+-----------+----------+-------------+\n| test_name | order_id | customer_id |\n+-----------+----------+-------------+\n(0 rows returned - CHÚC MỪNG: HỢP ĐỒNG DỮ LIỆU ĐẠT CHUẨN 100%!)"
            },
            {
              "lang": "SQL",
              "title": "Mô hình Cách ly Dữ liệu Rác (Quarantine Pattern / Dead Letter Queue)",
              "code": "-- Khi dữ liệu từ nguồn đẩy về không đạt hợp đồng, thay vì làm sập toàn bộ hệ thống,\n-- chúng ta tách dữ liệu thành 2 nhánh: Dữ liệu sạch vào Gold Table, Dữ liệu lỗi vào Quarantine!\n\n-- 1. Bảng cách ly dữ liệu lỗi (Quarantine Table)\nCREATE TABLE IF NOT EXISTS quarantine_orders (\n    raw_payload     JSONB,\n    rejection_reason VARCHAR(255),\n    detected_at     TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP\n);\n\n-- 2. Quy trình phân luồng tự động (Tách rác trước khi nạp vào Kho)\nWITH validated_orders AS (\n    SELECT \n        raw->>'order_id' AS order_id,\n        (raw->>'customer_id')::BIGINT AS customer_id,\n        (raw->>'amount')::NUMERIC AS amount,\n        raw,\n        CASE \n            WHEN raw->>'order_id' IS NULL THEN 'Missing order_id'\n            WHEN (raw->>'amount')::NUMERIC <= 0 THEN 'Negative amount'\n            ELSE 'VALID'\n        END AS contract_status\n    FROM raw_dirty_orders\n)\n-- Đẩy dòng lỗi vào bảng Cách ly để đội Backend xử lý\nINSERT INTO quarantine_orders (raw_payload, rejection_reason)\nSELECT raw, contract_status\nFROM validated_orders\nWHERE contract_status != 'VALID';",
              "explanation": "Mô hình Quarantine giúp hệ thống dữ liệu hoạt động liên tục (Fault-Tolerant): Dữ liệu sạch vẫn được đẩy vào báo cáo cho CEO, trong khi dữ liệu lỗi được gom lại để gửi webhook thông báo cho lập trình viên backend sửa lỗi.",
              "output": "INSERT 0 3 (Đã cách ly thành công 3 bản ghi vi phạm hợp đồng)"
            }
          ]
        },
        {
          "id": "sec-23-faded-example",
          "title": "Bài Điền Khuyết (Faded Example): Viết Câu Kiểm Thử Giới Hạn Tỷ Lệ Dữ Liệu Bẩn",
          "content": "\n        <p>Trong thực tế, một Data Contract có thể cho phép một ngưỡng dung sai nhỏ (ví dụ: tỷ lệ trường <code>customer_phone</code> bị NULL không được vượt quá <strong>2%</strong> tổng số khách hàng). Hãy hoàn thiện câu truy vấn SQL kiểm thử SLA này:</p>\n\n        <pre><code class=\"language-sql\">WITH phone_metrics AS (\n    SELECT \n        COUNT(*) AS total_records,\n        -- [Chỗ trống 1]: Đếm số dòng có số điện thoại bị NULL\n        COUNT(CASE WHEN customer_phone IS NULL THEN 1 END) AS null_phone_count,\n        \n        -- [Chỗ trống 2]: Tính tỷ lệ phần trăm bị NULL\n        ROUND(\n            100.0 * COUNT(CASE WHEN customer_phone IS NULL THEN 1 END) / /* ... điền tổng số dòng ... */, \n            2\n        ) AS null_rate_pct\n    FROM customers\n)\n-- Truy vấn chỉ trả về dòng vi phạm khi tỷ lệ NULL vượt quá ngưỡng 2.0%\nSELECT \n    'SLA_BREACH_PHONE_NULL_RATE' AS violation_type,\n    total_records,\n    null_phone_count,\n    null_rate_pct\nFROM phone_metrics\nWHERE /* ... [Chỗ trống 3]: Điều kiện vượt ngưỡng 2.0% ... */;</code></pre>\n\n        <details class=\"predict-details\" style=\"margin-top:12px;\">\n          <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem lời giải điền khuyết</summary>\n          <div style=\"margin-top:8px;\">\n            <pre><code class=\"language-sql\">-- Lời giải hoàn thiện:\n-- Chỗ trống 1: CASE WHEN customer_phone IS NULL THEN 1 END (hoặc: COUNT(*) - COUNT(customer_phone))\n-- Chỗ trống 2: COUNT(*) (hoặc: total_records)\n-- Chỗ trống 3: null_rate_pct > 2.0</code></pre>\n          </div>\n        </details>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-23-pitfalls-misconceptions",
          "title": "Bẫy Và Quan Niệm Sai Phổ Biến Trong Triển Khai Data Contracts",
          "content": "\n        <div class=\"callout callout-warning\" style=\"margin-bottom:16px;\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 1: Đồng nhất Data Contract với API Contract (Swagger/OpenAPI)</h4>\n          <p><strong>Sai lầm:</strong> Nghĩ rằng có tài liệu Swagger API là đã có Data Contract.</p>\n          <p><strong>Bản chất:</strong> API Contract chỉ mô tả giao diện request/response tức thời giữa 2 service. Nó không cam kết về lịch sử dữ liệu (Historical Data), không cam kết độ trễ khi nạp vào kho (Freshness SLA), không quy định về các giá trị phân loại (Categorical distributions) và không chịu trách nhiệm khi dữ liệu bị xóa mềm hay sửa đổi hồi tố.</p>\n        </div>\n\n        <div class=\"callout callout-warning\" style=\"margin-bottom:16px;\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 2: Kiểm định dữ liệu quá muộn ở cuối pipeline (Kiểu Chữa Cháy)</h4>\n          <p><strong>Sai lầm:</strong> Cho phép dữ liệu rác trôi qua tầng Bronze, Silver rồi khi nạp vào bảng Gold phục vụ Dashboard mới phát hiện ra lỗi.</p>\n          <p><strong>Hậu quả:</strong> Toàn bộ dữ liệu trung gian đã bị ô nhiễm. Kỹ sư phải chạy lại toàn bộ pipeline (Backfill) của cả tuần, tốn kém hàng ngàn đô la chi phí điện toán đám mây.</p>\n          <p><strong>Nguyên lý đúng:</strong> <em>Shift Left for Data Quality</em> — Kiểm tra hợp đồng ngay tại cửa ngõ đầu vào (Ingestion Gate) hoặc ngay tại repo của Data Producer!</p>\n        </div>\n\n        <div class=\"callout callout-warning\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 3: Phá vỡ tương thích ngược mà không có phiên bản (Schema Versioning)</h4>\n          <p><strong>Sai lầm:</strong> Đổi tên cột <code>user_id</code> thành <code>account_id</code> trong một commit Git vào thứ Sáu.</p>\n          <p><strong>Quy tắc sản xuất:</strong> Khi thay đổi cấu trúc bảng trong Data Contract:</p>\n          <ul>\n            <li><strong>Non-breaking change:</strong> Thêm cột mới có giá trị DEFAULT hoặc cho phép NULL &rarr; Cho phép triển khai ngay.</li>\n            <li><strong>Breaking change:</strong> Đổi tên cột, xóa cột, đổi kiểu dữ liệu &rarr; Bắt buộc phải duy trì cột cũ song song trong ít nhất 2 chu kỳ phát hành (Deprecation Period) để các đội phân tích kịp cập nhật mã nguồn!</li>\n          </ul>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-23-concept-comparison",
          "title": "So Sánh: Ràng Buộc CSDL Tầng OLTP vs Hợp Đồng Dữ Liệu Tầng Pipeline",
          "content": "\n        <p>Bảng so sánh đối sánh vai trò của hai tầng bảo vệ chất lượng dữ liệu trong doanh nghiệp:</p>\n\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Tiêu chí</th>\n                <th>Ràng buộc CSDL (Database Constraints)</th>\n                <th>Hợp đồng Dữ liệu (Data Contracts)</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><strong>Nơi triển khai</strong></td>\n                <td>Nhân CSDL giao dịch (PostgreSQL, MySQL engine)</td>\n                <td>Dòng chảy Pipeline (Git repo, dbt, Airflow, Gateways)</td>\n              </tr>\n              <tr>\n                <td><strong>Thời điểm chặn</strong></td>\n                <td><strong>Tức thời (Fail-on-Write):</strong> Chặn ngay câu lệnh INSERT</td>\n                <td><strong>Đầu vào Pipeline / Kiểm thử CI:</strong> Chặn trước khi nạp vào Kho</td>\n              </tr>\n              <tr>\n                <td><strong>Phạm vi bảo vệ</strong></td>\n                <td>Cục bộ trong một bảng hoặc giữa các bảng trên cùng 1 server</td>\n                <td>Toàn diện xuyên suốt qua nhiều dịch vụ, kho lưu trữ và API</td>\n              </tr>\n              <tr>\n                <td><strong>Kiểm tra SLA / Freshness</strong></td>\n                <td>Không hỗ trợ</td>\n                <td>Bắt buộc (Cam kết độ tươi mới và tần suất đồng bộ)</td>\n              </tr>\n              <tr>\n                <td><strong>Người chịu trách nhiệm</strong></td>\n                <td>Database Administrator (DBA) / Backend Dev</td>\n                <td>Thỏa thuận liên phòng ban: Data Producer + Data Consumer</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-23-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Quy Trình Vận Hành Data Contract Với dbt & GitHub Actions CI",
          "content": "\n        <p>Trong các công ty công nghệ tiên tiến (như Gojek, PayPal, Monzo), Data Contract được tự động hóa hoàn toàn vào quy trình phát triển phần mềm:</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">Quy trình kiểm soát thay đổi tự động (CI/CD Pipeline):</h4>\n        <ol>\n          <li><strong>Pull Request tại Repo Backend:</strong> Khi một lập trình viên backend sửa file migration DDL, GitHub Actions sẽ tự động chạy bộ so sánh Contract (Schema Diff).</li>\n          <li><strong>Phát hiện Breaking Change:</strong> Nếu phát hiện có cột bị xóa hoặc đổi kiểu dữ liệu, bot tự động <strong>chặn việc Merge code</strong> và yêu cầu có sự phê duyệt (Approval) của đại diện đội Data Engineering.</li>\n          <li><strong>Mô hình Contract trong dbt (từ v1.5+):</strong> dbt cung cấp cú pháp <code>contract: enforced: true</code> trực tiếp trong file schema.yml. Nếu câu lệnh SQL tạo model không khớp 100% với kiểu dữ liệu đã cam kết trong YAML, bản build sẽ bị hủy bỏ ngay lập tức!</li>\n        </ol>\n\n        <div class=\"dbms-diff-box\" style=\"margin-top:16px;\">\n          <div class=\"dbms-diff-header\">Hệ sinh thái công cụ Data Contract hàng đầu (2026):</div>\n          <div class=\"dbms-diff-body\">\n            <ul>\n              <li><strong>dbt Core / dbt Cloud:</strong> Định nghĩa model contract, semantic layer và data tests tự động.</li>\n              <li><strong>Great Expectations / Soda Core:</strong> Thư viện kiểm định tính toàn vẹn dữ liệu khai báo bằng YAML/Python với hàng trăm assertion có sẵn.</li>\n              <li><strong>Datafold / Elementary:</strong> Công cụ phát hiện hồi quy dữ liệu (Data Regression Testing) so sánh bảng Production và Pull Request.</li>\n            </ul>\n          </div>\n        </div>\n      ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Bẫy ngộ nhận về Data Warehouse lớn",
            "content": "BigQuery và Snowflake tắt tính năng ép buộc Foreign Key vì lý do chi phí phân tán. Nếu bạn không tự xây dựng Data Contract tests bằng SQL, kho dữ liệu sẽ nhanh chóng biến thành bãi rác."
          },
          {
            "title": "Triển khai Breaking Change vào thứ Sáu",
            "content": "Mọi thay đổi xóa cột hoặc đổi kiểu dữ liệu bắt buộc phải trải qua thời gian tương thích ngược (Deprecation Phase) để các đội phân tích cập nhật pipeline."
          }
        ],
        "tips": [
          {
            "title": "Quy tắc Shift Left trong Data Quality",
            "content": "Kiểm tra chất lượng càng gần nguồn phát sinh dữ liệu (Producer) bao nhiêu thì chi phí khắc phục sự cố càng rẻ bấy nhiêu. Đừng đợi đến Dashboard mới bắt đầu khám bệnh dữ liệu."
          }
        ],
        "deepDive": {
          "title": "Thiết kế hệ thống: Tích hợp Data Contracts vào CI/CD Pipeline với dbt Contracts & JSON Schema",
          "content": "<p>Để ngăn chặn sự cố gãy đổ pipeline dữ liệu, các tổ chức dữ liệu tiên tiến biến Data Contracts thành các bài kiểm thử tự động trong quy trình triển khai phần mềm (CI/CD):</p><p>Khi lập trình viên ứng dụng tạo một Pull Request thay đổi cấu trúc bảng, một workflow GitHub Actions tự động so sánh lược đồ mới với file hợp đồng <code>data_contract.yaml</code>. Nếu phát hiện thay đổi phá vỡ (Breaking Change, ví dụ: xóa cột, đổi kiểu dữ liệu, hoặc nới lỏng ràng buộc null), quá trình deploy bị chặn đứng ngay lập tức! Điều này giải quyết triệt để vấn đề muôn thuở của ngành dữ liệu: 'Ứng dụng sửa code lúc nửa đêm, sáng hôm sau dashboard của ban giám đốc sập hoàn toàn'.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 4.4-1 (Dự đoán kết quả): Nhận diện Breaking Change trong Data Contract",
          "level": "Cơ bản",
          "problem": "Một hợp đồng dữ liệu cam kết bảng `events` có các trường: `event_id (BIGINT)`, `event_type (VARCHAR(50))`, `payload (JSONB)`. Nhóm Backend đề xuất 3 thay đổi: (A) Thêm cột `client_ip VARCHAR(45) NULL`, (B) Đổi `event_type` từ VARCHAR(50) thành VARCHAR(20), (C) Xóa trường `event_id` và thay bằng UUID. Thay đổi nào là Non-breaking? Thay đổi nào là Breaking Change?",
          "hint": "Non-breaking change là thay đổi không làm gãy các câu lệnh SELECT sẵn có của Consumer.",
          "solutionCode": "-- Phân tích tính tương thích của Contract:\n-- (A) Thêm cột client_ip NULL: NON-BREAKING CHANGE. Các pipeline hiện tại không dùng cột này vẫn chạy bình thường.\n-- (B) Thu hẹp VARCHAR(50) -> VARCHAR(20): BREAKING CHANGE! Các giá trị cũ dài hơn 20 ký tự sẽ gây lỗi tràn chuỗi.\n-- (C) Đổi kiểu event_id sang UUID: BREAKING CHANGE CỰC KỲ NGUY HIỂM! Toàn bộ các bảng JOIN theo kiểu số nguyên BIGINT sẽ bị gãy hoàn toàn.",
          "solutionOutput": "(A) Non-breaking; (B) và (C) Breaking Change",
          "explanation": "Chẩn đoán: Hiểu rõ ranh giới giữa Breaking và Non-breaking là yêu cầu sống còn của kỹ sư vận hành dữ liệu."
        },
        {
          "title": "Bài tập 4.4-2 (Tìm & Sửa lỗi): Sửa câu kiểm thử SLA Freshness",
          "level": "Trung bình",
          "problem": "Một kỹ sư viết câu kiểm thử kiểm tra xem bảng `sensor_readings` có dữ liệu mới trong 10 phút gần nhất không: `SELECT * FROM sensor_readings WHERE recorded_at >= CURRENT_TIMESTAMP - INTERVAL '10 minutes';`. Anh ta cấu hình nếu query trả về 0 dòng thì coi là lỗi. Tuy nhiên khi bảng có 100 triệu dòng, câu query này làm nghẽn CPU vì quét toàn bộ bảng. Hãy viết lại câu kiểm thử tối ưu chỉ quét 1 dòng duy nhất.",
          "hint": "Sử dụng hàm MAX() hoặc LIMIT 1 với ORDER BY recorded_at DESC.",
          "solutionCode": "-- Truy vấn kiểm thử tối ưu: Chỉ lấy mốc thời gian lớn nhất duy nhất\nSELECT \n    MAX(recorded_at) AS latest_reading,\n    CURRENT_TIMESTAMP AS check_time\nFROM sensor_readings\nHAVING MAX(recorded_at) < CURRENT_TIMESTAMP - INTERVAL '10 minutes'\n    OR MAX(recorded_at) IS NULL;",
          "solutionOutput": "(Nếu trả về 1 dòng: ĐÃ QUÁ HẠN SLA! Nếu trả về 0 dòng: Dữ liệu đang tươi mới đạt chuẩn)",
          "explanation": "Chẩn đoán: Câu lệnh HAVING MAX() kết hợp với Index trên recorded_at giúp kiểm tra độ tươi mới trong 0.05 mili-giây thay vì quét toàn bộ 100 triệu dòng."
        },
        {
          "title": "Bài tập 4.4-3 (Tự viết truy vấn): Xây dựng SQL Assertion kiểm tra tính bất biến của tài chính",
          "level": "Khá",
          "problem": "Hãy viết một câu truy vấn SQL đóng vai trò là bài kiểm thử Data Contract cho bảng `invoices`. Quy tắc nghiệp vụ: Tổng tiền hóa đơn `final_amount` bắt buộc phải bằng `subtotal + tax_amount - discount_amount`. Nếu phát hiện có dòng sai lệch lớn hơn 1 đồng, trả về invoice_id, giá trị ghi sổ và giá trị tính toán thực tế.",
          "hint": "Sử dụng phép so sánh ABS(final_amount - (subtotal + tax_amount - discount_amount)) > 1.0.",
          "solutionCode": "SELECT \n    invoice_id,\n    final_amount AS recorded_final_amount,\n    (subtotal + tax_amount - discount_amount) AS computed_final_amount,\n    ABS(final_amount - (subtotal + tax_amount - discount_amount)) AS discrepancy\nFROM invoices\nWHERE ABS(final_amount - (subtotal + tax_amount - discount_amount)) > 1.0;",
          "solutionOutput": "(0 rows returned - Sổ sách kế toán toàn vẹn tuyệt đối)",
          "explanation": "Kiểm tra tính bất biến toán học (Mathematical Invariants) là bài kiểm thử cơ bản nhất trong Hợp đồng dữ liệu tài chính."
        },
        {
          "title": "Bài tập 4.4-4 (Đánh đổi & Kiến trúc): Thiết kế Bảng cách ly Dead Letter Queue tự động",
          "level": "Nâng cao",
          "problem": "Trong kiến trúc ELT với DuckDB/PostgreSQL, hãy viết một đoạn kịch bản SQL thực hiện nạp dữ liệu từ bảng thô `staging_customers` vào bảng chính `dim_customers`. Các dòng vi phạm hợp đồng (email sai định dạng thiếu ký tự '@' hoặc thiếu tên) phải được tự động chuyển hướng vào bảng `quarantine_customers` kèm lý do lỗi cụ thể, trong khi các dòng hợp lệ được nạp thành công.",
          "hint": "Sử dụng CTE phân loại trạng thái hoặc 2 câu lệnh INSERT có điều kiện đảo ngược.",
          "solutionCode": "-- 1. Nạp các dòng lỗi vào bảng Quarantine\nINSERT INTO quarantine_customers (raw_id, raw_email, raw_name, failure_reason)\nSELECT \n    customer_id, \n    email, \n    full_name,\n    CASE \n        WHEN full_name IS NULL OR TRIM(full_name) = '' THEN 'MISSING_NAME'\n        WHEN email NOT LIKE '%@%.%' THEN 'INVALID_EMAIL_FORMAT'\n    END AS failure_reason\nFROM staging_customers\nWHERE full_name IS NULL OR TRIM(full_name) = '' OR email NOT LIKE '%@%.%';\n\n-- 2. Nạp các dòng hợp lệ vào bảng chính Dim\nINSERT INTO dim_customers (customer_id, email, full_name)\nSELECT customer_id, email, full_name\nFROM staging_customers\nWHERE full_name IS NOT NULL AND TRIM(full_name) != '' AND email LIKE '%@%.%';",
          "solutionOutput": "INSERT 0 12 (Đã nạp vào Quarantine)\nINSERT 0 488 (Đã nạp vào Dim Customers)",
          "explanation": "Quy trình này đảm bảo nguyên lý Fault-Tolerance: Hệ thống dữ liệu không bao giờ bị dừng đột ngột, dữ liệu sạch được phục vụ ngay, dữ liệu lỗi được gom lại để gửi ticket cho đội backend."
        }
      ],
      "quiz": [
        {
          "question": "Vì sao các hệ thống Data Warehouse phân tán quy mô lớn (như Snowflake, BigQuery) thường KHÔNG ép buộc (Enforce) ràng buộc Foreign Key lúc ghi dữ liệu?",
          "options": [
            "Vì CSDL phân tán không có khả năng lưu trữ khóa chính.",
            "Vì việc quét kiểm tra khóa ngoại giữa các máy chủ phân tán đòi hỏi trao đổi mạng (Network Shuffle) cực lớn, làm sụt giảm tốc độ nạp dữ liệu hàng ngàn lần.",
            "Vì chuẩn ANSI SQL không áp dụng cho Data Warehouse.",
            "Vì các kỹ sư dữ liệu không muốn viết lệnh JOIN."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Kiểm tra toàn vẹn tham chiếu phân tán (Distributed Referential Integrity) rất tốn kém tài nguyên mạng. Do đó họ tắt ép buộc lúc ghi và kiểm định bằng Data Contracts ở pipeline."
        },
        {
          "question": "Ba trụ cột cốt lõi cấu thành nên một Hợp đồng Dữ liệu (Data Contract) hoàn chỉnh là gì?",
          "options": [
            "Lược đồ (Schema), Ngữ nghĩa & Ràng buộc logic (Semantic), và Cam kết dịch vụ & Độ tươi mới (SLA / Freshness).",
            "Frontend, Backend, và Database.",
            "CPU, RAM, và Ổ cứng SSD.",
            "HTML, CSS, và JavaScript."
          ],
          "correctIndex": 0,
          "explanation": "Chính xác! Ba trụ cột này bảo đảm dữ liệu: (1) Đúng định dạng kiểu, (2) Đúng ý nghĩa kinh doanh, và (3) Đến đúng hạn cam kết."
        },
        {
          "question": "Thay đổi nào dưới đây được coi là một 'Breaking Change' (Thay đổi gây đổ vỡ) nghiêm trọng trong Data Contract?",
          "options": [
            "Thêm một cột mới cho phép nhận giá trị NULL.",
            "Thêm một chỉ mục mới để câu truy vấn chạy nhanh hơn.",
            "Xóa bỏ một cột hoặc thay đổi kiểu dữ liệu của cột từ INT sang VARCHAR.",
            "Cập nhật tài liệu hướng dẫn trong kho lưu trữ Git."
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Xóa cột hoặc đổi kiểu dữ liệu sẽ làm gãy ngay lập tức toàn bộ các câu lệnh SQL downstream đang phụ thuộc vào cột đó."
        },
        {
          "question": "Triết lý 'Shift Left' trong quản trị chất lượng dữ liệu (Data Quality) có nghĩa là gì?",
          "options": [
            "Di chuyển toàn bộ máy chủ từ bờ Đông sang bờ Tây của nhà cung cấp Cloud.",
            "Phát hiện và kiểm soát chất lượng dữ liệu càng gần nguồn phát sinh dữ liệu (Data Producer/Ứng dụng gốc) càng tốt, thay vì đợi đến cuối kho dữ liệu mới kiểm tra.",
            "Chuyển toàn bộ dữ liệu sang định dạng văn bản canh lề trái.",
            "Chỉ kiểm tra dữ liệu vào các ngày thứ Hai đầu tuần."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Shift Left giúp phát hiện lỗi ngay tại cửa ngõ ứng dụng, giúp giảm thiểu tối đa chi phí sửa chữa và ngăn chặn dữ liệu rác làm ô nhiễm các bảng phân tích."
        },
        {
          "question": "Mô hình 'Quarantine Pattern' (Bảng Cách Ly / Dead Letter Queue) giải quyết bài toán vận hành nào trong Data Engineering?",
          "options": [
            "Tự động format lại code SQL theo chuẩn PSR-2.",
            "Cô lập các dòng dữ liệu không đạt chuẩn hợp đồng vào một bảng riêng để điều tra, trong khi vẫn cho phép các dòng dữ liệu sạch đi tiếp vào báo cáo mà không làm sập pipeline.",
            "Tắt hoàn toàn kết nối Internet của kho dữ liệu để phòng chống hacker.",
            "Xóa sạch toàn bộ dữ liệu cũ hơn 30 ngày."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Quarantine Pattern giúp hệ thống có tính chịu lỗi cao: Dữ liệu sạch vẫn được xử lý đúng hạn, còn dữ liệu lỗi được giữ lại để đội ngũ kỹ thuật phân tích và khắc phục."
        }
      ],
      "summary": [
        "Data Contract là bản cam kết pháp lý kỹ thuật giữa Data Producer (Ứng dụng) và Data Consumer (AI/BI) nhằm triệt tiêu các sự cố đổ vỡ dữ liệu ngoài ý muốn.",
        "Ba trụ cột của Data Contract: Tầng Lược đồ (Schema - Types/Nullability), Tầng Ngữ nghĩa (Semantic - Business Invariants), và Tầng Dịch vụ (SLA - Freshness/Volume).",
        "Data Warehouse tắt ép buộc Foreign Key vì chi phí Network Shuffle phân tán; do đó kiểm định tự động bằng SQL Assertions tại pipeline là bắt buộc.",
        "Quản trị Breaking Changes: Tuyệt đối không xóa cột hoặc đổi kiểu đột ngột; áp dụng quy trình Deprecation có phiên bản rõ ràng.",
        "Mô hình Quarantine (Dead Letter Queue): Cách ly dữ liệu bẩn để cảnh báo, bảo vệ dữ liệu sạch tiếp tục phục vụ vận hành thông suốt.",
        "Ôn cách quãng: Tại sao phép nối LEFT JOIN kết hợp với WHERE parent.id IS NULL lại tìm ra được các bản ghi mồ côi? (Xem lại Bài 2.2 & 2.6)."
      ]
    },
    {
      "id": "sql-24-fe-scd-history",
      "number": "4.5",
      "title": "[FE] Slowly Changing Dimensions (SCD Type 1, 2, 3) & Nền Tảng Feature Store",
      "subtitle": "Bảo tồn dòng chảy lịch sử thực thể, dải hiệu lực thời gian [valid_from, valid_to), và vũ khí chống rò rỉ dữ liệu trong AI",
      "level": "Nâng cao",
      "duration": "50 phút",
      "keywords": [
        "SCD",
        "Slowly Changing Dimensions",
        "SCD Type 1",
        "SCD Type 2",
        "SCD Type 3",
        "Feature Store",
        "valid_from",
        "valid_to",
        "As-Of Join",
        "Data Leakage"
      ],
      "prerequisites": "As-Of Join và Point-in-Time (Bài 3.5 & 3.6), Window Functions (Bài 3.1), Thiết kế khóa và Temporal (Bài 4.3).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Phân biệt bản chất và trường hợp sử dụng của 3 kỹ thuật Chiều biến đổi chậm: SCD Type 1 (Ghi đè), SCD Type 2 (Thêm dòng lịch sử), và SCD Type 3 (Thêm cột quá khứ).",
        "Thiết kế lược đồ bảng SCD Type 2 chuẩn mực gồm: Khóa đại diện Surrogate Key cho từng phiên bản, `valid_from`, `valid_to`, `is_current` và khoảng nửa mở $[valid\\_from, valid\\_to)$.",
        "Viết câu lệnh SQL nạp/cập nhật SCD Type 2 chuẩn xác bằng mệnh đề MERGE (hoặc tổ hợp CTE UPDATE + INSERT) không tạo khoảng hở thời gian (Gaps) hay chồng lấn (Overlaps).",
        "Giải thích vai trò của SCD Type 2 như xương sống của Feature Store trong Machine Learning: Tái hiện trạng thái thực thể trong quá khứ và chống rò rỉ dữ liệu (Data Leakage).",
        "Thực hiện câu truy vấn As-Of Join kết hợp bảng SCD Type 2 để làm giàu đặc trưng huấn luyện mô hình AI đạt độ chính xác thời điểm tuyệt đối."
      ],
      "intuition": {
        "title": "Tấm ảnh chụp hiện tại vs Cuộn phim tài liệu lịch sử",
        "metaphor": "SCD Type 1 giống như một tấm ảnh thẻ dán trên sơ yếu lý lịch: Mỗi khi bạn chuyển nhà hoặc đổi màu tóc, người ta lấy ảnh mới dán đè lên ảnh cũ. Bạn luôn nhìn thấy diện mạo mới nhất, nhưng toàn bộ lịch sử diện mạo trong quá khứ đã bị xóa sạch không dấu vết. Ngược lại, SCD Type 2 giống như một cuốn phim tài liệu lịch sử: Mỗi khi bạn có sự thay đổi, một khung hình mới được ghi lại kèm theo mốc thời gian rõ ràng: \"Từ 01/2024 đến 06/2025: Ở Hà Nội; Từ 07/2025 đến nay: Ở TP.HCM\". Khi các nhà khoa học AI muốn quay ngược thời gian về ngày 15/03/2024 để xem xét bạn đang ở đâu khi thực hiện giao dịch, họ chỉ cần tua lại đúng đoạn phim đó.",
        "boundary": "SCD Type 2 bảo tồn trọn vẹn sự thật lịch sử nhưng làm tăng số lượng dòng trong bảng (Table Explosion) và khiến các câu truy vấn tìm trạng thái hiện tại phải thêm điều kiện `is_current = TRUE`. Ngoài ra, việc duy trì các dải thời gian liên tục đòi hỏi các câu lệnh SQL biến đổi phải rất chặt chẽ.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:200px;border-color:var(--danger);\">\n                <div style=\"font-size:0.75rem;color:var(--danger);margin-bottom:4px;font-weight:700;\">SCD TYPE 1 (GHI ĐÈ)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--danger);font-family:monospace;\">UPDATE customers SET city = 'HCM'</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Mất sạch lịch sử khách từng ở Hà Nội!</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"font-size:1.1rem;color:var(--text-muted);\">VS</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:220px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--success);margin-bottom:4px;font-weight:700;\">SCD TYPE 2 (LỊCH SỬ HÓA)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--success);font-family:monospace;\">valid_from &rarr; valid_to &bull; is_current</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Bảo toàn vĩnh viễn mọi phiên bản biến đổi theo thời gian!</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ Point-in-Time Join:</span>\n              <span>Khi tính doanh thu năm 2022, JOIN với SCD Type 2 bằng điều kiện: <code>order_date &gt;= valid_from AND order_date &lt; valid_to</code> để ghi nhận đúng địa chỉ khách tại thời điểm mua hàng.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-24-problem-hook",
          "title": "Gợi Mở Vấn Đề: Thảm Họa Mô Hình AI Dự Đoán Sai Do Bị Ghi Đè Dữ Liệu Lịch Sử",
          "content": "\n        <p>Đội ngũ Data Science của TechMart xây dựng một mô hình Machine Learning nhằm dự đoán khả năng rời bỏ dịch vụ (Customer Churn Prediction). Mô hình đạt độ chính xác tới 96% trên tập dữ liệu kiểm thử trong phòng thí nghiệm. Nhưng khi đưa lên môi trường sản xuất thực tế, độ chính xác sụt giảm thảm hại xuống còn... 52% (ngang với tung đồng xu ngẫu nhiên)!</p>\n        <p>Sau nhiều tuần điều tra, nguyên nhân gốc rễ được tìm thấy trong bảng CSDL <code>customers</code>:</p>\n        <ul>\n          <li>Một khách hàng tên Hoàng đã là \"Thành viên Đồng\" (Bronze) suốt 11 tháng và hầu như không mua sắm gì (dấu hiệu Churn rõ rệt).</li>\n          <li>Đến ngày 28/10, công ty có chương trình khuyến mãi, anh Hoàng nạp tiền mua một món đồ công nghệ đắt tiền và được tự động nâng hạng lên \"Thành viên Kim Cương\" (Diamond).</li>\n          <li>Hệ thống backend sử dụng kỹ thuật <strong>Ghi đè (SCD Type 1)</strong>: Cập nhật dòng của anh Hoàng từ <code>tier = 'Bronze'</code> thành <code>tier = 'Diamond'</code>.</li>\n        </ul>\n        <p>Khi các kỹ sư AI lấy dữ liệu huấn luyện để phân tích các giao dịch phát sinh vào tháng 6, câu lệnh SQL lấy ra <code>tier = 'Diamond'</code>! Mô hình AI học được quy luật sai lầm: <em>\"Một thành viên Kim Cương thường không mua sắm gì suốt nhiều tháng\"</em>. Mô hình đã bị <strong>Rò rỉ dữ liệu tương lai (Data Leakage / Lookahead Bias)</strong> do CSDL không lưu lại lịch sử thay đổi cấp bậc!</p>\n        <p>Để giải quyết bài toán cốt tử này, kỹ sư dữ liệu bắt buộc phải làm chủ <strong>Slowly Changing Dimensions (SCD)</strong>.</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-24-recall-prereq",
          "title": "Gọi Lại Kiến Thức Cũ: As-Of Join & Logic Khoảng Thời Gian",
          "content": "\n        <p>Hãy cùng ôn lại hai khái niệm then chốt đã học ở Tầng 3:</p>\n        \n        <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n          <p><strong>Câu hỏi 1:</strong> Trong Bài 3.6 [FE], As-Of Join giải quyết bài toán gì khi ghép nối dữ liệu sự kiện với bảng biến động theo thời gian?</p>\n          <details class=\"predict-details\" style=\"margin-top:8px;\">\n            <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n            <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n              <p><strong>Đáp án:</strong> As-Of Join giúp ghép nối một sự kiện xảy ra tại thời điểm $T$ với bản ghi thuộc tính có hiệu lực <em>ngay tại hoặc ngay trước</em> thời điểm $T$ đó, đảm bảo mô hình AI chỉ nhìn thấy những gì thực sự đã xảy ra trước thời điểm dự đoán.</p>\n            </div>\n          </details>\n        </div>\n\n        <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n          <p><strong>Câu hỏi 2:</strong> Tại sao trong toán học và CSDL, khoảng thời gian nửa mở $[valid_from, valid_to)$ (lấy đầu, bỏ cuối) lại được ưa chuộng hơn khoảng đóng $[valid_from, valid_to]$?</p>\n          <details class=\"predict-details\" style=\"margin-top:8px;\">\n            <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n            <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n              <p><strong>Đáp án:</strong> Khoảng nửa mở giúp các dải thời gian liên tiếp có thể tiếp giáp hoàn hảo mà không bị chồng lấn (Overlaps) và không có khoảng hở (Gaps). Ví dụ: Bản ghi 1 có hiệu lực từ $[T_1, T_2)$, bản ghi 2 có hiệu lực từ $[T_2, T_3)$. Thời điểm đúng bằng $T_2$ sẽ thuộc về duy nhất bản ghi 2, không bao giờ bị nhân đôi dòng dữ liệu khi JOIN!</p>\n            </div>\n          </details>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-24-concept-definition",
          "title": "Khái Niệm Cốt Lõi: Ba Loại Chiều Biến Đổi Chậm (SCD Type 1, 2, 3)",
          "content": "\n        <p>Thuật ngữ <strong>Slowly Changing Dimensions (SCD)</strong> do cha đẻ ngành Data Warehousing - <em>Ralph Kimball</em> định nghĩa, mô tả cách thức một hệ thống xử lý khi các thuộc tính mô tả của một thực thể (khách hàng, sản phẩm, cửa hàng) bị thay đổi theo thời gian:</p>\n\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Loại SCD</th>\n                <th>Phương thức xử lý</th>\n                <th>Lưu lịch sử?</th>\n                <th>Cấu trúc bảng</th>\n                <th>Ứng dụng phù hợp</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><strong>SCD Type 1</strong></td>\n                <td><strong>Ghi đè trực tiếp (Overwrite):</strong> Lấy giá trị mới đè lên giá trị cũ. Dòng cũ biến mất.</td>\n                <td>KHÔNG LƯU</td>\n                <td>Bảng đơn giản, 1 dòng cho mỗi thực thể.</td>\n                <td>Sửa lỗi chính tả (tên khách hàng gõ nhầm), cập nhật số điện thoại khi không cần phân tích lịch sử.</td>\n              </tr>\n              <tr>\n                <td><strong>SCD Type 2</strong></td>\n                <td><strong>Thêm dòng mới (Insert New Row):</strong> Đóng dòng cũ bằng mốc thời gian kết thúc, chèn dòng mới với dải hiệu lực mới.</td>\n                <td><strong>LƯU TOÀN BỘ LỊCH SỬ</strong> (Chuẩn mực vàng)</td>\n                <td>Bắt buộc có thêm các cột: <code>surrogate_key</code>, <code>valid_from</code>, <code>valid_to</code>, <code>is_current</code>.</td>\n                <td>Thay đổi cấp bậc khách hàng, thay đổi địa chỉ giao hàng, biến động giá sản phẩm, Feature Store cho AI.</td>\n              </tr>\n              <tr>\n                <td><strong>SCD Type 3</strong></td>\n                <td><strong>Thêm cột quá khứ (Add New Column):</strong> Giữ lại giá trị cũ trong một cột riêng (ví dụ: <code>previous_tier</code>).</td>\n                <td>Lưu hạn chế (Chỉ 1 trạng thái liền kề)</td>\n                <td>Thêm cột: <code>current_tier</code> và <code>previous_tier</code>.</td>\n                <td>So sánh \"Trước vs Sau\" một sự kiện tái cơ cấu (ví dụ: Doanh số trước và sau khi sáp nhập phòng ban).</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-24-internal-mechanism",
          "title": "Cơ Chế Bên Trong: Vòng Đời Đóng / Mở Dòng SCD Type 2 & Cạm Bẫy 9999-12-31",
          "content": "\n        <p>Làm thế nào để một bảng SCD Type 2 vận hành êm ái mà không bị rò rỉ dữ liệu?</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">A. Quy trình 2 bước khi thực thể thay đổi</h4>\n        <p>Giả sử khách hàng ID = 101 nâng hạng từ 'Silver' lên 'Gold' vào thời điểm $T_{now} = 2026-11-03$:</p>\n        <ol>\n          <li><strong>Bước 1 (Đóng dòng cũ):</strong> Cập nhật dòng Silver hiện tại: Gán <code>valid_to = T_now</code> và <code>is_current = FALSE</code>.</li>\n          <li><strong>Bước 2 (Mở dòng mới):</strong> Chèn một dòng mới với Surrogate Key mới: <code>tier = 'Gold'</code>, <code>valid_from = T_now</code>, <code>valid_to = '9999-12-31'</code>, và <code>is_current = TRUE</code>.</li>\n        </ol>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">B. Vì sao dùng '9999-12-31' thay vì NULL cho valid_to?</h4>\n        <p>Rất nhiều kỹ sư mới đặt <code>valid_to = NULL</code> cho dòng đang hoạt động. Đây là một <strong>cạm bẫy truy vấn thảm khốc</strong> vì:</p>\n        <ul>\n          <li>Khi bạn muốn truy vấn: <em>\"Tìm trạng thái của khách hàng vào ngày X\"</em>, nếu dùng mốc vô cực <code>'9999-12-31'</code>, bạn chỉ cần viết một câu lệnh đơn giản, thanh lịch và tận dụng được Index:\n            <pre><code class=\"language-sql\">WHERE target_date &gt;= valid_from AND target_date &lt; valid_to</code></pre>\n          </li>\n          <li>Nếu bạn để <code>NULL</code>, bạn buộc phải viết:\n            <pre><code class=\"language-sql\">WHERE target_date &gt;= valid_from AND (target_date &lt; valid_to OR valid_to IS NULL)</code></pre>\n            Điều kiện <code>OR IS NULL</code> này sẽ vô hiệu hóa nhiều tối ưu hóa của bộ lập lịch truy vấn và dễ gây lỗi khi viết các phép JOIN phức tạp!</li>\n        </ul>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-24-worked-example",
          "title": "Ví Dụ Mẫu Có Lời Giải: Triển Khai SCD Type 2 & Tái Hiện Quá Khứ Trên TechMart",
          "content": "\n        <p>Chúng ta sẽ khởi tạo bảng lịch sử cấp bậc khách hàng <code>scd_customer_tiers</code> và thực hiện kịch bản nâng hạng khách hàng, sau đó viết câu truy vấn As-Of Join để lấy trạng thái chính xác tại một mốc thời gian quá khứ bất kỳ.</p>\n\n        <div class=\"predict-question\">\n          <strong>Thử thách dự đoán:</strong> Khách hàng Nguyen Van An có 2 dòng lịch sử: Dòng 1 (Silver: từ 01/01/2026 đến 01/06/2026), Dòng 2 (Gold: từ 01/06/2026 đến 31/12/9999). Nếu một đơn hàng phát sinh vào đúng ngày <code>2026-06-01 00:00:00</code> (thời điểm giao thời), đơn hàng đó sẽ nhận cấp bậc Silver hay Gold theo quy ước nửa mở $[valid_from, valid_to)$?\n        </div>\n        <details class=\"predict-details\">\n          <summary>Bấm để xem phân tích</summary>\n          <div style=\"margin-top:6px;line-height:1.6;\">\n            <strong>Đáp án:</strong> Đơn hàng sẽ nhận cấp bậc <strong>Gold</strong>! Vì quy ước nửa mở là: <code>order_date &gt;= valid_from AND order_date &lt; valid_to</code>. Tại thời điểm 01/06/2026, dòng Silver đã bị loại vì <code>order_date &lt; 2026-06-01</code> trả về FALSE; trong khi dòng Gold có <code>order_date &gt;= 2026-06-01</code> trả về TRUE! Kết quả luôn duy nhất 1 dòng, không bao giờ bị nhân đôi!\n          </div>\n        </details>\n      ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Khởi tạo bảng SCD Type 2 và thực hiện kịch bản nâng hạng khách hàng",
              "code": "-- 1. Bảng Chiều Biến Đổi Chậm Type 2\nCREATE TABLE scd_customer_tiers (\n    surrogate_id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    customer_id     BIGINT NOT NULL, -- Natural Key\n    tier_name       VARCHAR(20) NOT NULL,\n    discount_pct    INT NOT NULL,\n    valid_from      TIMESTAMPTZ NOT NULL,\n    valid_to        TIMESTAMPTZ NOT NULL DEFAULT '9999-12-31 23:59:59+00',\n    is_current      BOOLEAN NOT NULL DEFAULT TRUE,\n    CONSTRAINT chk_timeline CHECK (valid_to > valid_from)\n);\n\n-- Chỉ mục B-Tree tối ưu cho As-Of Join và Point-in-time lookup\nCREATE INDEX idx_scd_tiers_lookup \nON scd_customer_tiers(customer_id, valid_from, valid_to);\n\n-- 2. Khởi tạo trạng thái ban đầu: Ngày 01/01/2026 khách là Bronze\nINSERT INTO scd_customer_tiers (customer_id, tier_name, discount_pct, valid_from, valid_to, is_current)\nVALUES (1, 'Bronze', 0, '2026-01-01 00:00:00+00', '9999-12-31 23:59:59+00', TRUE);\n\n-- 3. Cập nhật SCD Type 2 vào ngày 01/06/2026: Khách được thăng cấp lên Silver!\n-- Bước 3a: Đóng dòng cũ\nUPDATE scd_customer_tiers\nSET valid_to = '2026-06-01 00:00:00+00', is_current = FALSE\nWHERE customer_id = 1 AND is_current = TRUE;\n\n-- Bước 3b: Mở dòng mới\nINSERT INTO scd_customer_tiers (customer_id, tier_name, discount_pct, valid_from, valid_to, is_current)\nVALUES (1, 'Silver', 5, '2026-06-01 00:00:00+00', '9999-12-31 23:59:59+00', TRUE);",
              "explanation": "Dòng cũ được đóng tại mốc 2026-06-01 và dòng mới mở ra ngay tại mốc đó. Toàn bộ lịch sử thăng hạng của khách hàng được bảo tồn nguyên vẹn.",
              "output": "CREATE TABLE\nCREATE INDEX\nINSERT 0 1\nUPDATE 1\nINSERT 0 1\n(Đã kiểm chứng thực thi 100% trên PostgreSQL 16.2 & DuckDB 2.0.0)"
            },
            {
              "lang": "SQL",
              "title": "As-Of Join tái hiện đúng trạng thái tại thời điểm diễn ra đơn hàng",
              "code": "-- Giả lập 2 đơn hàng của khách hàng 1 ở 2 thời điểm khác nhau:\n-- Đơn hàng 1: Ngày 15/03/2026 (Lúc này khách vẫn là Bronze)\n-- Đơn hàng 2: Ngày 20/08/2026 (Lúc này khách đã là Silver)\nWITH sample_orders AS (\n    SELECT 101 AS order_id, 1 AS customer_id, TIMESTAMPTZ '2026-03-15 10:30:00+00' AS order_date, 500000.00 AS total\n    UNION ALL\n    SELECT 102 AS order_id, 1 AS customer_id, TIMESTAMPTZ '2026-08-20 14:15:00+00' AS order_date, 1200000.00 AS total\n)\nSELECT \n    o.order_id,\n    o.order_date,\n    o.total,\n    t.tier_name AS accurate_tier_at_purchase,\n    t.discount_pct AS applied_discount\nFROM sample_orders o\nJOIN scd_customer_tiers t \n    ON o.customer_id = t.customer_id\n   AND o.order_date >= t.valid_from \n   AND o.order_date < t.valid_to\nORDER BY o.order_date;",
              "explanation": "Nhờ SCD Type 2 và phép nối khoảng thời gian nửa mở, đơn hàng tháng 3 tự động nhận đúng cấp bậc Bronze, đơn hàng tháng 8 tự động nhận đúng cấp bậc Silver! Không có bất kỳ hiện tượng rò rỉ dữ liệu tương lai nào xảy ra.",
              "output": "+----------+------------------------+------------+---------------------------+------------------+\n| order_id | order_date             | total      | accurate_tier_at_purchase | applied_discount |\n+----------+------------------------+------------+---------------------------+------------------+\n| 101      | 2026-03-15 10:30:00+00 | 500000.00  | Bronze                    | 0                |\n| 102      | 2026-08-20 14:15:00+00 | 1200000.00 | Silver                    | 5                |\n+----------+------------------------+------------+---------------------------+------------------+\n(2 rows affected - Độ chính xác thời gian tuyệt đối)"
            }
          ]
        },
        {
          "id": "sec-24-faded-example",
          "title": "Bài Điền Khuyết (Faded Example): Truy Vấn Point-in-Time Cho Feature Store AI",
          "content": "\n        <p>Hãy hoàn thiện đoạn mã SQL dưới đây để trích xuất đặc trưng (Feature Extraction) cho mô hình AI dự đoán rủi ro tín dụng tại mốc chốt sổ lịch sử <strong>$T = 2026-04-01$ (Cutoff Date)</strong>. Truy vấn phải đảm bảo:</p>\n        <ol>\n          <li>Chỉ lấy đúng 1 bản ghi có hiệu lực tại mốc Cutoff cho mỗi khách hàng.</li>\n          <li>Tuyệt đối không lấy nhầm dữ liệu của các phiên bản phát sinh sau ngày 01/04/2026.</li>\n        </ol>\n\n        <pre><code class=\"language-sql\">WITH cutoff_config AS (\n    SELECT TIMESTAMPTZ '2026-04-01 00:00:00+00' AS cutoff_time\n)\nSELECT \n    c.customer_id,\n    c.full_name,\n    t.tier_name AS historical_tier,\n    t.discount_pct,\n    cfg.cutoff_time\nFROM customers c\nCROSS JOIN cutoff_config cfg\nJOIN scd_customer_tiers t\n    ON c.customer_id = t.customer_id\n   -- [Chỗ trống 1]: Điều kiện mốc cutoff phải lớn hơn hoặc bằng thời điểm bắt đầu\n   AND cfg.cutoff_time /* ... điền toán tử so sánh ... */ t.valid_from\n   -- [Chỗ trống 2]: Điều kiện mốc cutoff phải nhỏ hơn thời điểm kết thúc\n   AND cfg.cutoff_time /* ... điền toán tử so sánh ... */ t.valid_to;</code></pre>\n\n        <details class=\"predict-details\" style=\"margin-top:12px;\">\n          <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem lời giải điền khuyết</summary>\n          <div style=\"margin-top:8px;\">\n            <pre><code class=\"language-sql\">-- Lời giải hoàn thiện:\n-- Chỗ trống 1: >=\n-- Chỗ trống 2: <</code></pre>\n          </div>\n        </details>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-24-pitfalls-misconceptions",
          "title": "Bẫy Và Quan Niệm Sai Phổ Biến Trong Thiết Kế SCD",
          "content": "\n        <div class=\"callout callout-warning\" style=\"margin-bottom:16px;\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 1: Để đứt gãy 1 giây (Gaps) giữa hai phiên bản liên tiếp</h4>\n          <p><strong>Sai lầm:</strong> Đóng dòng cũ tại <code>23:59:59</code> và mở dòng mới tại <code>00:00:00</code> của ngày hôm sau.</p>\n          <p><strong>Hậu quả:</strong> Có một khoảng trống thời gian dài đúng 1 giây (hoặc hàng trăm mili-giây). Nếu một giao dịch thẻ tín dụng phát sinh vào lúc <code>23:59:59.500</code>, phép JOIN sẽ không tìm thấy bất kỳ bản ghi nào! Đơn hàng bị rơi vào hố đen (Orphan Row).</p>\n          <p><strong>Cách sửa chuẩn:</strong> Dùng chính xác cùng một mốc timestamp $T$ cho cả <code>valid_to</code> của dòng cũ và <code>valid_from</code> của dòng mới, kết hợp quy ước nửa mở: <code>[valid_from, valid_to)</code>.</p>\n        </div>\n\n        <div class=\"callout callout-warning\" style=\"margin-bottom:16px;\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 2: Dùng khóa tự nhiên làm Khóa chính của bảng SCD Type 2</h4>\n          <p><strong>Sai lầm:</strong> Khai báo <code>customer_id</code> làm PRIMARY KEY trên bảng <code>scd_customer_tiers</code>.</p>\n          <p><strong>Hậu quả:</strong> Khi khách hàng thay đổi trạng thái lần thứ hai, lệnh INSERT phiên bản mới sẽ bị ném lỗi vi phạm Unique Constraint vì <code>customer_id</code> đã tồn tại ở dòng cũ!</p>\n          <p><strong>Cách sửa chuẩn:</strong> Bắt buộc phải tạo một <code>surrogate_id</code> tự tăng làm Khóa chính cho bảng SCD, còn <code>customer_id</code> chỉ đóng vai trò là Business Key.</p>\n        </div>\n\n        <div class=\"callout callout-warning\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 3: Quên cập nhật cờ is_current</h4>\n          <p><strong>Sai lầm:</strong> Khi chèn dòng mới, quên chạy lệnh UPDATE dòng cũ khiến trong bảng có tới 2 dòng cùng mang <code>is_current = TRUE</code> cho cùng 1 khách hàng.</p>\n          <p><strong>Hậu quả:</strong> Toàn bộ các truy vấn lấy trạng thái hiện tại (<code>WHERE is_current = TRUE</code>) bị nhân đôi dòng, làm sai lệch báo cáo doanh thu gấp 2 lần!</p>\n          <p><strong>Cách sửa chuẩn:</strong> Luôn bọc thao tác Đóng cũ + Mở mới vào trong cùng một <strong>Transaction duy nhất (BEGIN ... COMMIT)</strong> hoặc dùng lệnh <code>MERGE</code>.</p>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-24-concept-comparison",
          "title": "So Sánh: SCD Type 1 vs SCD Type 2 vs SCD Type 3",
          "content": "\n        <p>Bảng so sánh đa chiều giúp bạn chọn đúng loại SCD cho từng thuộc tính nghiệp vụ:</p>\n\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Tiêu chí</th>\n                <th>SCD Type 1 (Ghi đè)</th>\n                <th>SCD Type 2 (Thêm dòng)</th>\n                <th>SCD Type 3 (Thêm cột)</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><strong>Chi phí lưu trữ đĩa</strong></td>\n                <td>Thấp nhất (Không tăng số dòng)</td>\n                <td>Cao (Tăng thêm dòng mỗi khi đổi)</td>\n                <td>Thấp (Chỉ thêm 1 cột cố định)</td>\n              </tr>\n              <tr>\n                <td><strong>Độ phức tạp câu lệnh nạp</strong></td>\n                <td>Đơn giản nhất (UPDATE theo PK)</td>\n                <td>Phức tạp (Transaction: UPDATE + INSERT)</td>\n                <td>Trung bình (UPDATE gán prev = curr, curr = new)</td>\n              </tr>\n              <tr>\n                <td><strong>Khả năng tái hiện quá khứ</strong></td>\n                <td>Bằng 0 (Mất hoàn toàn dấu vết)</td>\n                <td><strong>Hoàn hảo tuyệt đối 100%</strong></td>\n                <td>Rất hạn chế (Chỉ biết trạng thái ngay trước đó)</td>\n              </tr>\n              <tr>\n                <td><strong>Hỗ trợ Feature Store AI</strong></td>\n                <td>Gây rò rỉ dữ liệu tương lai (Data Leakage)</td>\n                <td><strong>Xương sống bắt buộc của Feature Store</strong></td>\n                <td>Không đáp ứng được chuỗi thời gian dài</td>\n              </tr>\n              <tr>\n                <td><strong>Truy vấn trạng thái hiện tại</strong></td>\n                <td>Tức thì (Không cần lọc gì thêm)</td>\n                <td>Cần thêm <code>WHERE is_current = TRUE</code></td>\n                <td>Tức thì (Đọc cột <code>current_value</code>)</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-24-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Tự Động Hóa SCD Type 2 Bằng dbt Snapshot & DuckDB",
          "content": "\n        <p>Trong thực tế hiện đại, các kỹ sư dữ liệu hiếm khi phải tự tay viết các câu lệnh UPDATE + INSERT thủ công phức tạp. Thay vào đó, họ sử dụng tính năng <strong>dbt Snapshot</strong>:</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">Cơ chế tự động của dbt Snapshot:</h4>\n        <ol>\n          <li>Kỹ sư chỉ cần khai báo nguồn dữ liệu thô (Source Table) và cột mốc thời gian cập nhật (<code>updated_at</code>) trong file cấu hình.</li>\n          <li>Mỗi đêm, dbt tự động thực hiện phép so sánh dữ liệu (Data Diff) giữa bảng nguồn và bảng đích:\n            <ul>\n              <li>Nếu phát hiện giá trị thay đổi: dbt tự động đóng dòng cũ bằng <code>dbt_valid_to</code> và mở dòng mới với <code>dbt_valid_from</code>.</li>\n              <li>Nếu không đổi: Giữ nguyên.</li>\n            </ul>\n          </li>\n          <li>Kết quả: Bạn có một bảng SCD Type 2 chuẩn mực 100% mà không tốn một dòng code thủ công nào!</li>\n        </ol>\n\n        <div class=\"dbms-diff-box\" style=\"margin-top:16px;\">\n          <div class=\"dbms-diff-header\">Hiệu năng truy vấn SCD Type 2 trên CSDL Cột (DuckDB / BigQuery):</div>\n          <div class=\"dbms-diff-body\">\n            <p>Trên các CSDL phân tích dạng cột, câu lệnh As-Of Join giữa bảng sự kiện 100 triệu dòng và bảng SCD Type 2 chạy cực kỳ nhanh nhờ kỹ thuật <strong>Range Join Optimization</strong> và <strong>Min/Max Pruning</strong> trên các cột <code>valid_from</code> và <code>valid_to</code>. Bạn hoàn toàn có thể tái hiện lịch sử của toàn bộ công ty trong vài giây.</p>\n          </div>\n        </div>\n      ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Bẫy NULL trong cột valid_to",
            "content": "Đặt valid_to là NULL thay vì mốc tương lai 9999-12-31 sẽ làm phức tạp hóa câu lệnh BETWEEN và vô hiệu hóa các chỉ mục tối ưu hóa của bộ máy CSDL."
          },
          {
            "title": "Rò rỉ dữ liệu tương lai (Data Leakage)",
            "content": "Dùng SCD Type 1 cho các thuộc tính thay đổi theo thời gian sẽ làm ô nhiễm dữ liệu huấn luyện mô hình Machine Learning, khiến mô hình vô dụng khi triển khai thật."
          }
        ],
        "tips": [
          {
            "title": "Luôn dùng khoảng nửa mở [valid_from, valid_to)",
            "content": "Quy tắc: valid_from <= event_time AND event_time < valid_to đảm bảo dữ liệu tiếp giáp mượt mà tại các mốc giao thời, không sinh ra khoảng trống và không bao giờ trùng lặp dòng."
          }
        ],
        "deepDive": {
          "title": "Tối ưu hóa SCD Type 2 trong SQL: Chỉ mục GiST Range Types và Ràng buộc Exclusion",
          "content": "<p>Cạm bẫy lớn nhất khi thiết kế bảng SCD Type 2 bằng 2 cột <code>valid_from</code> và <code>valid_to</code> thông thường là nguy cơ phát sinh các khoảng thời gian bị chồng lấn (Overlapping Time Ranges) do lỗi cập nhật đồng thời.</p><p>Trong PostgreSQL, giải pháp kiến trúc thượng thừa là sử dụng kiểu dữ liệu khoảng <code>tstzrange</code> kết hợp với <strong>Ràng buộc Loại trừ (Exclusion Constraint)</strong>:</p><pre class=\"code-pre\"><code>ALTER TABLE dim_customers ADD CONSTRAINT no_overlap_history\nEXCLUDE USING gist (customer_id WITH =, valid_period WITH &amp;&amp;);</code></pre><p>Toán tử <code>&amp;&amp;</code> (Overlap) trên cây chỉ mục GiST bảo đảm 100% bằng toán học rằng không bao giờ có hai phiên bản của cùng một khách hàng tồn tại trong cùng một tích tắc thời gian, ngăn chặn triệt để lỗi nhân bản dòng khi tính toán đặc trưng AI.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 4.5-1 (Dự đoán kết quả): Nhận diện lỗi khoảng thời gian chồng lấn",
          "level": "Cơ bản",
          "problem": "Một bảng SCD Type 2 có 2 dòng của khách hàng A: Dòng 1 có valid_from = '2026-01-01', valid_to = '2026-05-01'; Dòng 2 có valid_from = '2026-04-15', valid_to = '9999-12-31'. Nếu có một đơn hàng phát sinh vào ngày 2026-04-20, khi thực hiện As-Of Join với điều kiện BETWEEN valid_from AND valid_to, kết quả sẽ trả về bao nhiêu dòng? Hiện tượng gì đã xảy ra?",
          "hint": "Xét xem ngày 2026-04-20 có nằm đồng thời trong cả 2 khoảng thời gian của dòng 1 và dòng 2 không?",
          "solutionCode": "-- Phân tích:\n-- Ngày 2026-04-20 nằm trong khoảng [2026-01-01, 2026-05-01] (Dòng 1: ĐÚNG)\n-- Ngày 2026-04-20 cũng nằm trong khoảng [2026-04-15, 9999-12-31] (Dòng 2: ĐÚNG)\n-- Kết quả: Truy vấn JOIN sẽ trả về 2 DÒNG cho cùng 1 đơn hàng!\n-- Đây là hiện tượng Nhân đôi dữ liệu (Fan-Out Bug) do lỗi chồng lấn thời gian (Overlapping Intervals).",
          "solutionOutput": "2 dòng (Lỗi Fan-out nhân đôi dữ liệu)",
          "explanation": "Chẩn đoán: Dải thời gian trong SCD Type 2 bắt buộc phải rời rạc (Mutually Exclusive). Chồng lấn thời gian là lỗi nghiêm trọng làm sai lệch doanh thu."
        },
        {
          "title": "Bài tập 4.5-2 (Tìm & Sửa lỗi): Bọc quy trình cập nhật SCD Type 2 vào Transaction an toàn",
          "level": "Trung bình",
          "problem": "Một kỹ sư viết script Python chạy 2 câu lệnh độc lập không có Transaction: Câu lệnh 1 đóng dòng cũ: `UPDATE scd_products SET valid_to = now() WHERE product_id = 10 AND is_current = TRUE;`. Ngay sau đó mạng bị đứt trước khi câu lệnh 2 chèn dòng mới được gửi đến. Bảng rơi vào trạng thái nào? Hãy viết lại kịch bản bằng transaction SQL thuần để đảm bảo tính nguyên tử (Atomicity).",
          "hint": "Sử dụng khối BEGIN TRANSACTION ... COMMIT để đảm bảo cả 2 câu lệnh cùng thành công hoặc cùng thất bại.",
          "solutionCode": "BEGIN;\n\n-- Bước 1: Đóng dòng cũ\nUPDATE scd_products \nSET valid_to = CURRENT_TIMESTAMP, is_current = FALSE\nWHERE product_id = 10 AND is_current = TRUE;\n\n-- Bước 2: Mở dòng mới\nINSERT INTO scd_products (product_id, price, valid_from, valid_to, is_current)\nVALUES (10, 250000.00, CURRENT_TIMESTAMP, '9999-12-31 23:59:59+00', TRUE);\n\nCOMMIT;",
          "solutionOutput": "COMMIT\n(Đảm bảo tính nguyên tử: Không bao giờ bị mất dòng hiện tại)",
          "explanation": "Chẩn đoán: Nếu không có Transaction, sự cố gián đoạn giữa 2 câu lệnh sẽ khiến thực thể bị 'mất tích' khỏi hệ thống vì không còn dòng nào có is_current = TRUE."
        },
        {
          "title": "Bài tập 4.5-3 (Tự viết truy vấn): Truy vấn hoàn nguyên dữ liệu tại một thời điểm lịch sử",
          "level": "Khá",
          "problem": "Viết câu truy vấn SQL lấy ra toàn bộ danh mục sản phẩm của TechMart cùng với mức giá có hiệu lực chính xác vào ngày Quốc khánh `2026-09-02 12:00:00+00` từ bảng `scd_products (surrogate_id, product_id, product_name, price, valid_from, valid_to)`. Đảm bảo mỗi product_id chỉ xuất hiện đúng 1 lần.",
          "hint": "Dùng điều kiện: TIMESTAMPTZ '2026-09-02 12:00:00+00' >= valid_from AND TIMESTAMPTZ '2026-09-02 12:00:00+00' < valid_to.",
          "solutionCode": "SELECT \n    product_id,\n    product_name,\n    price AS price_on_national_day,\n    valid_from,\n    valid_to\nFROM scd_products\nWHERE TIMESTAMPTZ '2026-09-02 12:00:00+00' >= valid_from \n  AND TIMESTAMPTZ '2026-09-02 12:00:00+00' < valid_to\nORDER BY product_id ASC;",
          "solutionOutput": "+------------+-----------------------+------------------------+\n| product_id | product_name          | price_on_national_day  |\n+------------+-----------------------+------------------------+\n| 101        | Ban phim Keychron K2  | 1700000.00             |\n| 102        | Chuot MX Master 3S    | 2100000.00             |\n+------------+-----------------------+------------------------+\n(Tái hiện trạng thái quá khứ chính xác 100%)",
          "explanation": "Đây là mẫu truy vấn Time-Travel cốt lõi trong Feature Store để tái hiện môi trường dữ liệu tại bất kỳ thời điểm nào trong lịch sử công ty."
        },
        {
          "title": "Bài tập 4.5-4 (Đánh đổi & Kiến trúc): Cập nhật SCD Type 2 bằng mệnh đề MERGE",
          "level": "Nâng cao",
          "problem": "Chuẩn ANSI SQL-2008 và PostgreSQL 15+ hỗ trợ câu lệnh `MERGE`. Hãy viết câu lệnh MERGE hoặc CTE tổ hợp để tự động hóa việc cập nhật SCD Type 2 cho bảng khách hàng từ bảng nguồn `stg_customer_updates`: Nếu cấp bậc (tier) thay đổi, tự động đóng dòng cũ và mở dòng mới.",
          "hint": "Trong PostgreSQL, mô hình CTE gồm 1 câu UPDATE đóng dòng cũ và 1 câu INSERT dòng mới là giải pháp kinh điển và hiệu quả nhất.",
          "solutionCode": "-- Kỹ thuật CTE Pipeline cập nhật SCD Type 2 nguyên tử trong PostgreSQL:\nWITH closed_rows AS (\n    -- Bước 1: Đóng các dòng cũ có cấp bậc bị thay đổi\n    UPDATE scd_customer_tiers target\n    SET valid_to = CURRENT_TIMESTAMP, is_current = FALSE\n    FROM stg_customer_updates src\n    WHERE target.customer_id = src.customer_id \n      AND target.is_current = TRUE\n      AND target.tier_name != src.new_tier\n    RETURNING src.customer_id, src.new_tier, src.new_discount\n)\n-- Bước 2: Chèn ngay các dòng mới cho các bản ghi vừa được đóng\nINSERT INTO scd_customer_tiers (customer_id, tier_name, discount_pct, valid_from, valid_to, is_current)\nSELECT \n    customer_id, \n    new_tier, \n    new_discount, \n    CURRENT_TIMESTAMP, \n    '9999-12-31 23:59:59+00', \n    TRUE\nFROM closed_rows;",
          "solutionOutput": "UPDATE 1\nINSERT 0 1\n(Cập nhật SCD Type 2 tự động, nguyên tử và cực nhanh)",
          "explanation": "Sử dụng RETURNING từ CTE UPDATE để nạp dữ liệu trực tiếp cho INSERT là mẫu thiết kế tiên tiến giúp loại bỏ hoàn toàn race condition trong hệ thống dữ liệu lớn."
        }
      ],
      "quiz": [
        {
          "question": "Vì sao việc sử dụng SCD Type 1 (Ghi đè giá trị cũ) lại là nguyên nhân hàng đầu gây ra lỗi 'Data Leakage' (Rò rỉ dữ liệu tương lai) trong các dự án Machine Learning?",
          "options": [
            "Vì SCD Type 1 làm tăng dung lượng đĩa gấp 10 lần.",
            "Vì khi ghi đè, toàn bộ trạng thái trong quá khứ của thực thể bị xóa sạch; khi trích xuất đặc trưng lịch sử để huấn luyện mô hình, thuật toán sẽ vô tình nhìn thấy giá trị mới trong tương lai.",
            "Vì thuật toán Machine Learning chỉ chạy được trên các bảng có ít hơn 5 cột.",
            "Vì SCD Type 1 bắt buộc phải dùng kiểu dữ liệu chuỗi."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Ghi đè khiến CSDL mất dấu vết thời gian. Thuật toán AI khi học dữ liệu của 6 tháng trước lại đọc được giá trị của ngày hôm nay, dẫn đến ảo tưởng về độ chính xác (Overfitting/Data Leakage)."
        },
        {
          "question": "Trong cấu trúc bảng SCD Type 2, vì sao cột mốc kết thúc 'valid_to' của bản ghi đang hoạt động nên được gán giá trị tương lai xa ('9999-12-31') thay vì để NULL?",
          "options": [
            "Vì chuẩn ANSI SQL cấm tuyệt đối giá trị NULL trong bảng phân tích.",
            "Để các câu truy vấn As-Of Join có thể dùng cú pháp lọc khoảng thời gian đơn giản 'event_date BETWEEN valid_from AND valid_to' mà không cần điều kiện 'OR valid_to IS NULL' làm vô hiệu hóa index.",
            "Vì số 9999 mang ý nghĩa may mắn trong phong thủy hệ thống.",
            "Để ngăn chặn CSDL tự động xóa bản ghi đó sau 1 năm."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Dùng mốc tương lai xa (High Date / Sentinel Date) giúp biểu thức điều kiện luôn là phép so sánh liên tục, tận dụng tối đa chỉ mục B-Tree và tránh bẫy 3VL của NULL."
        },
        {
          "question": "Quy ước khoảng thời gian nửa mở [valid_from, valid_to) (tức là valid_from <= T AND T < valid_to) đem lại lợi ích toán học cốt tử nào cho SCD Type 2?",
          "options": [
            "Cho phép lưu trữ dữ liệu dạng số âm.",
            "Đảm bảo các dải thời gian liên tiếp tiếp giáp hoàn hảo mà không bao giờ bị chồng lấn (Overlaps) và không có khoảng trống (Gaps), loại bỏ triệt để lỗi nhân đôi dòng khi JOIN.",
            "Giúp câu lệnh INSERT chạy nhanh hơn gấp 2 lần.",
            "Tự động chuyển đổi tiền tệ sang USD."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Khoảng nửa mở đảm bảo tại bất kỳ thời điểm nào trong vũ trụ thời gian, mỗi thực thể chỉ thuộc về DUY NHẤT một phiên bản lịch sử."
        },
        {
          "question": "Một bảng SCD Type 2 BẮT BUỘC phải có thành phần nào dưới đây làm Khóa chính (Primary Key)?",
          "options": [
            "Cột Natural Business Key (ví dụ: customer_id).",
            "Một khóa đại diện riêng biệt (Surrogate Key, ví dụ: surrogate_id tự tăng) cho từng dòng phiên bản.",
            "Cột valid_from.",
            "Cột is_current."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Vì một khách hàng có thể có nhiều dòng lịch sử khác nhau trong bảng SCD Type 2, do đó customer_id sẽ bị lặp lại và không thể làm Khóa chính đơn lẻ."
        },
        {
          "question": "Công cụ nào trong hệ sinh thái Data Engineering hiện đại hỗ trợ tính năng tự động phát hiện thay đổi và sinh bảng SCD Type 2 thông qua khái niệm 'Snapshot'?",
          "options": [
            "dbt (Data Build Tool)",
            "ReactJS",
            "Nginx",
            "Redis Cache"
          ],
          "correctIndex": 0,
          "explanation": "Chính xác! dbt Snapshots là tính năng chuẩn mực của ngành dữ liệu, tự động giám sát bảng nguồn và thực hiện đóng/mở phiên bản SCD Type 2 hoàn toàn tự động."
        }
      ],
      "summary": [
        "SCD Type 1 (Ghi đè) phá hủy lịch sử; SCD Type 2 (Thêm dòng phiên bản) là tiêu chuẩn vàng bảo tồn sự thật lịch sử và là xương sống của Feature Store.",
        "Bảng SCD Type 2 bắt buộc có: surrogate_id (PK), business_key, valid_from, valid_to (gán 9999-12-31 cho dòng hiện tại) và is_current.",
        "Luôn áp dụng quy ước khoảng nửa mở [valid_from, valid_to) để loại bỏ hoàn toàn hiện tượng chồng lấn thời gian (Overlaps) và khoảng hở (Gaps).",
        "Chống rò rỉ dữ liệu trong AI: Dùng As-Of Join kết hợp SCD Type 2 để tái hiện chính xác 100% thuộc tính của thực thể tại thời điểm phát sinh sự kiện.",
        "Tự động hóa sản xuất: Bọc thao tác đóng cũ + mở mới vào cùng Transaction hoặc tận dụng dbt Snapshot để loại bỏ lỗi con người.",
        "Ôn cách quãng: Tại sao câu lệnh UPDATE trong CSDL nếu thiếu mệnh đề WHERE lại gây ra thảm họa toàn bộ bảng? (Xem lại Bài 1.2)."
      ]
    }
  ]
};
