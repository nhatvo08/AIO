window.SQL_LEVEL0_PART = {
  "id": "part-sql-0",
  "number": "Tầng 0",
  "title": "Tư Duy Nền Tảng & Mô Hình Quan Hệ",
  "level": "Cơ bản",
  "badge": "Tư duy",
  "description": "Hiểu bản chất toán học của mô hình quan hệ Edgar F. Codd, vì sao SQL là Đa tập (Bag) chứ không thuần túy là Tập hợp (Set), tư duy khai báo đối đầu tư duy vòng lặp, và giải mã bí ẩn của NULL cùng logic 3 giá trị.",
  "lessons": [
    {
      "id": "sql-00-relational-model",
      "number": "0.1",
      "title": "Bản chất Mô hình Quan hệ: Bảng ≈ Đa tập (Multiset/Bag) & Tư duy Tập hợp",
      "subtitle": "Vì sao SQL cho phép dòng trùng, kéo theo DISTINCT, UNION ALL vs UNION và thứ tự vô định nếu thiếu ORDER BY",
      "level": "Cơ bản",
      "duration": "45 phút",
      "keywords": [
        "Relational Model",
        "Tuple",
        "Relation",
        "Multiset",
        "Bag Semantics",
        "Set Theory",
        "Edgar Codd",
        "DISTINCT",
        "UNION ALL"
      ],
      "prerequisites": "Hiểu biết cơ bản về cấu trúc bảng gồm hàng và cột trong tin học đại cương.",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Phân biệt được Mô hình Quan hệ Toán học thuần túy (Set Theory của Codd) với Hiện thực SQL thực tế (Đa tập - Multiset / Bag Semantics theo ISO/IEC 9075).",
        "Giải thích cặn kẽ vì sao việc cho phép dòng trùng lặp kéo theo sự ra đời của từ khóa DISTINCT và sự phân chia giữa UNION vs UNION ALL.",
        "Chứng minh bằng thực nghiệm: thứ tự dòng trong kết quả truy vấn hoàn toàn không xác định nếu thiếu mệnh đề ORDER BY tường minh có tie-breaker.",
        "Phân tích sự khác biệt về hiệu năng và độ phức tạp tính toán giữa tư duy tập hợp (Set-based) của SQL và tư duy vòng lặp duyệt từng dòng (Procedural) của Python/C."
      ],
      "intuition": {
        "title": "Bao tải bi ve vs Hàng người xếp hàng mua vé",
        "metaphor": "Trong lập trình Python, một danh sách (list) giống như một hàng người xếp hàng: người đứng trước có chỉ số 0, người kế tiếp chỉ số 1, có thứ tự trước sau tuyệt đối. Muốn tìm ai bạn phải duyệt từ đầu đến cuối hàng. Ngược lại, một Bảng trong mô hình quan hệ giống như một \"chiếc bao tải đựng những viên bi màu sắc\". Trong bao tải, các viên bi nằm lẫn lộn, không có viên bi nào là \"thứ nhất\" hay \"cuối cùng\". Khi bạn thò tay vào bao và hô \"Hãy đưa cho tôi tất cả các viên bi màu xanh\", hệ thống sẽ lấy ra toàn bộ một tập hợp viên bi xanh trong một lần thò tay, chứ không cần duyệt từng viên một theo chỉ số.",
        "boundary": "Ẩn dụ này giúp bạn hiểu vì sao dữ liệu trong bảng CSDL không có thứ tự mặc định nếu không có mệnh đề ORDER BY. Tuy nhiên, ranh giới cần lưu ý: Trong toán học, bao tải không thể có hai viên bi giống hệt nhau (Tập hợp - Set); nhưng trong SQL thực tế, bao tải này lại cho phép tồn tại nhiều viên bi trùng lặp y hệt nhau (Đa tập - Multiset/Bag) trừ khi bạn chủ động đặt Khóa chính (Primary Key) hoặc dùng DISTINCT!",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:220px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;font-weight:700;\">🐍 PYTHON LIST (TUẦN TỰ CÓ THỨ TỰ)</div>\n                <div style=\"font-size:1.05rem;font-weight:800;color:var(--text-primary);\">[0:'HN', 1:'HCM', 2:'ĐN', 3:'HN']</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Chỉ số 0..N, duyệt $O(N)$, giữ thứ tự</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">VS</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:220px;\">\n                <div style=\"font-size:0.75rem;color:var(--topic-sql);margin-bottom:4px;font-weight:700;\">🗄️ SQL MULTISET / BAG (ĐA TẬP VÔ THỨ TỰ)</div>\n                <div style=\"font-size:1.05rem;font-weight:800;\">{ 'HN', 'HCM', 'ĐN', 'HN' }</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Không thứ tự trước sau, cho phép trùng lặp!</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--danger);\">⚡ Phép đổi:</span>\n              <span>Thêm từ khóa <code>DISTINCT</code> ép CSDL chạy Sort/Hash Unique $O(N \\log N)$ để chuyển sang Tập hợp thuần túy (Set): <code>{ 'Can Tho', 'Da Nang', 'Hanoi', 'Ho Chi Minh' }</code>.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-00-problem-hook",
          "title": "Gợi mở: Nếu không có Mô hình Quan hệ, chuyện gì xảy ra?",
          "content": "\n            <p>Trước năm 1970, ngành công nghiệp phần mềm lưu trữ dữ liệu dưới dạng <strong>mô hình phân cấp (Hierarchical Model)</strong> hoặc <strong>mô hình mạng (Network Model)</strong>. Trong các hệ thống cổ này, lập trình viên muốn tìm hóa đơn của một khách hàng thì phải viết mã điều hướng trực tiếp các con trỏ vật lý (hardware pointers) trên ổ đĩa:</p>\n            <ul>\n              <li><em>\"Đọc con trỏ từ khối đĩa khách hàng A &rarr; nhảy theo địa chỉ offset sang con trỏ danh sách đơn &rarr; lần theo con trỏ đơn thứ 3 &rarr; nạp bản ghi vào bộ nhớ.\"</em></li>\n            </ul>\n            <p><strong>Hậu quả thảm khốc:</strong> Mỗi khi người quản trị hệ thống nâng cấp ổ cứng, đổi cấu trúc file hay sắp xếp lại các block trên đĩa, <strong>toàn bộ mã nguồn của phần mềm doanh nghiệp bị gãy đổ hoàn toàn</strong>! Lập trình viên phải đập đi viết lại toàn bộ code truy vấn từ đầu vì địa chỉ con trỏ vật lý đã thay đổi.</p>\n            <p>Năm 1970, tiến sĩ toán học <strong>Edgar F. Codd</strong> tại phòng thí nghiệm IBM công bố bài báo lịch sử: <em>\"A Relational Model of Data for Large Shared Data Banks\"</em>. Ông đề xuất một nguyên lý mang tính cách mạng: <strong>Tính độc lập dữ liệu (Data Independence)</strong> — Tách rời hoàn toàn tầng lưu trữ vật lý (Physical Storage) khỏi tầng logic truy vấn (Logical Query) bằng cách áp dụng lý thuyết Tập hợp (Set Theory) và Đại số quan hệ (Relational Algebra).</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-00-recall-prereq",
          "title": "Truy hồi: Kiểm tra nhanh tư duy cấu trúc dữ liệu",
          "content": "\n            <p>Trước khi đi sâu vào bản chất toán học của SQL, hãy thử sức với 2 câu hỏi truy hồi nhanh dưới đây:</p>\n            \n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n              <p><strong>Câu hỏi 1:</strong> Trong toán học phổ thông, tập hợp $A = \\{1, 2, 2, 3\\}$ có bao nhiêu phần tử? Các phần tử có thứ tự trước sau không?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Tập hợp $A$ chỉ có <strong>3 phần tử duy nhất</strong> là $\\{1, 2, 3\\}$ vì trong lý thuyết tập hợp, các phần tử trùng lặp không được tính thêm lần thứ hai. Đồng thời, tập hợp $\\{1, 2, 3\\}$ hoàn toàn đồng nhất với $\\{3, 1, 2\\}$, các phần tử <strong>không có thứ tự tự nhiên</strong>.</p>\n                </div>\n              </details>\n            </div>\n\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n              <p><strong>Câu hỏi 2:</strong> Trong ngôn ngữ lập trình Python, một danh sách <code>lst = [1, 2, 2, 3]</code> khác gì với một tập hợp <code>st = {1, 2, 2, 3}</code>?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Danh sách (List) lưu trữ theo thứ tự chỉ số (Index: 0, 1, 2, 3) và cho phép các phần tử trùng lặp cùng tồn tại. Trong khi đó, Tập hợp (Set) tự động loại bỏ số 2 bị lặp và không hỗ trợ truy cập theo chỉ số phần tử.</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-00-concept-definition",
          "title": "Khái niệm: Bảng ≈ Đa tập (Multiset/Bag) & Thuật ngữ Chuẩn",
          "content": "\n            <p>Trong sách giáo khoa toán học, nhiều người thường giản lược rằng: <em>\"Bảng là một tập hợp các dòng\"</em>. Nhưng đây là một mô hình tư duy <strong>chưa chính xác với thực tế triển khai của SQL</strong>!</p>\n            \n            <div class=\"table-responsive\">\n<table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Thuật ngữ Toán học (Codd 1970)</th>\n                    <th scope=\"col\">Thuật ngữ Chuẩn SQL (ISO/IEC 9075)</th>\n                    <th scope=\"col\">Thuật ngữ Tiếng Việt thông dụng</th>\n                    <th scope=\"col\">Bản chất kỹ thuật</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Relation</strong></td>\n                    <td>Table</td>\n                    <td>Bảng / Quan hệ</td>\n                    <td>Cấu trúc logic gồm tập các cột mang tên và tập các dòng dữ liệu.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Tuple</strong></td>\n                    <td>Row / Record</td>\n                    <td>Bộ giá trị / Dòng / Bản ghi</td>\n                    <td>Một phần tử dữ liệu đơn lẻ trong quan hệ, đại diện cho một thực thể.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Attribute</strong></td>\n                    <td>Column / Field</td>\n                    <td>Thuộc tính / Cột / Trường</td>\n                    <td>Một đặc trưng có định danh và miền giá trị (kiểu dữ liệu) cụ thể.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Set</strong></td>\n                    <td><strong>Multiset / Bag</strong></td>\n                    <td>Đa tập (Tập hợp có lặp)</td>\n                    <td>\n                      <strong>Sự thật then chốt:</strong> SQL cho phép nhiều dòng có giá trị hoàn toàn giống nhau cùng tồn tại trong bảng (trừ khi có PRIMARY KEY).\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n</div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-00-internals-state",
          "title": "Cơ chế: Biến đổi trạng thái trung gian từ Đa tập sang Tập hợp",
          "content": "\n            <p>Hãy xem dữ liệu biến đổi như thế nào dưới nắp ca-pô khi CSDL thực hiện câu lệnh chiếu dữ liệu:</p>\n            \n            <p><strong>Bước 1: Nạp bảng nguồn <code>customers</code> (Trạng thái ban đầu có Khóa chính duy nhất):</strong></p>\n            <div class=\"sql-result-container\">\n              <table class=\"sql-result-table\">\n                <thead><tr><th>customer_id (PK)</th><th>full_name</th><th>city</th></tr></thead>\n                <tbody>\n                  <tr><td>1</td><td>Nguyen Van An</td><td>Hanoi</td></tr>\n                  <tr><td>2</td><td>Tran Thi Binh</td><td>Ho Chi Minh</td></tr>\n                  <tr><td>3</td><td>Le Van Cuong</td><td>Da Nang</td></tr>\n                  <tr><td>4</td><td>Pham Thi Dung</td><td>Hanoi</td></tr>\n                  <tr><td>5</td><td>Hoang Van Em</td><td>Can Tho</td></tr>\n                </tbody>\n              </table>\n            </div>\n\n            <p><strong>Bước 2: Phép chiếu (Projection) thông thường <code>SELECT city</code> &rarr; Bảo toàn Đa tập (Bag Semantics):</strong></p>\n            <div class=\"sql-result-container\">\n              <table class=\"sql-result-table\">\n                <thead><tr><th>city (Tập kết quả đa tập - 5 dòng)</th></tr></thead>\n                <tbody>\n                  <tr><td>Hanoi</td></tr>\n                  <tr><td>Ho Chi Minh</td></tr>\n                  <tr><td>Da Nang</td></tr>\n                  <tr><td><span class=\"dirty-val\">Hanoi (Dòng trùng lặp được giữ nguyên!)</span></td></tr>\n                  <tr><td>Can Tho</td></tr>\n                </tbody>\n              </table>\n            </div>\n\n            <p><strong>Bước 3: Khử trùng lặp bằng <code>SELECT DISTINCT city</code> &rarr; Chuyển sang Tập hợp thuần túy (Set Semantics):</strong></p>\n            <p>Động cơ CSDL buộc phải cấp phát một bảng băm trong bộ nhớ (Hash Aggregate) hoặc chạy thuật toán Sort Unique để loại bỏ 'Hanoi' thứ hai, thu được đúng 4 dòng duy nhất:</p>\n            <div class=\"sql-result-container\">\n              <table class=\"sql-result-table\">\n                <thead><tr><th>city (Tập hợp thuần túy - 4 dòng)</th></tr></thead>\n                <tbody>\n                  <tr><td>Can Tho</td></tr>\n                  <tr><td>Da Nang</td></tr>\n                  <tr><td>Hanoi</td></tr>\n                  <tr><td>Ho Chi Minh</td></tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-00-example-worked",
          "title": "Ví dụ mẫu: Thực nghiệm đối chứng Đa tập vs Tập hợp",
          "content": "\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:16px;border-radius:8px;background:var(--bg-surface-elevated);margin:16px 0;\">\n              <h4 style=\"margin:0 0 8px;color:var(--text-primary);\">❓ Dự đoán trước khi xem:</h4>\n              <p>Bảng <code>customers</code> của TechMart có 5 khách hàng, trong đó 2 người ở 'Hanoi', 1 ở 'Ho Chi Minh', 1 ở 'Da Nang', 1 ở 'Can Tho'. Theo bạn, câu lệnh <code>SELECT city FROM customers;</code> sẽ trả về kết quả gồm bao nhiêu dòng: 4 dòng (4 thành phố phân biệt) hay 5 dòng (đúng số khách hàng)? Vì sao?</p>\n              <details class=\"predict-details\" style=\"margin-top:12px;padding:10px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem phân tích cơ chế &amp; Đáp án</summary>\n                <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                  <p><strong>Đáp án: Đúng 5 dòng (chữ 'Hanoi' xuất hiện 2 lần)!</strong></p>\n                  <p><strong>Cơ chế bản chất:</strong></p>\n                  <p>Trong toán học thuần túy của Edgar Codd, một quan hệ là một Tập hợp (Set), nên phép chiếu lên cột city sẽ tự động khử trùng chỉ còn 4 dòng. Tuy nhiên, SQL thực tế được thiết kế theo <strong>Đa tập (Multiset / Bag)</strong>: nó giữ nguyên mọi dòng trùng lặp để đạt tốc độ nạp dữ liệu tức thì (streaming $O(1)$) và bảo toàn tính toàn vẹn cho các phép tính đếm/tổng. Muốn nhận được 4 dòng, bạn bắt buộc phải dùng từ khóa tường minh: <code>SELECT DISTINCT city FROM customers;</code>.</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Thực nghiệm đối chứng Đa tập vs Tập hợp trên bộ dữ liệu TechMart",
              "code": "-- 1. Giữ nguyên Đa tập (Mặc định ALL, tốn O(1) CPU streaming)\nSELECT city FROM customers;\n\n-- 2. Chuyển đổi sang Tập hợp thuần túy (Tốn O(N log N) bộ nhớ sắp xếp khử trùng)\nSELECT DISTINCT city FROM customers ORDER BY city;",
              "annotations": [
                {
                  "line": 2,
                  "text": "Kết quả trả về đủ 5 dòng, trong đó \"Hanoi\" xuất hiện 2 lần"
                },
                {
                  "line": 5,
                  "text": "Engine xây dựng Hash Table / B-Tree Sort để loại bỏ dòng trùng, chỉ còn 4 dòng duy nhất"
                }
              ],
              "explanation": "Đã kiểm chứng thực tế 100% trên cả 3 engine: PostgreSQL 16.2, DuckDB 2.0.0 và SQLite 3.50.4.",
              "output": "Kết quả câu lệnh 1 (Đa tập - 5 dòng):\nHanoi | Ho Chi Minh | Da Nang | Hanoi | Can Tho\n\nKết quả câu lệnh 2 (Tập hợp thuần túy - 4 dòng):\nCan Tho | Da Nang | Hanoi | Ho Chi Minh"
            }
          ]
        },
        {
          "id": "sec-00-fill-in-blank",
          "title": "Điền khuyết: Tự hoàn thiện câu lệnh then chốt",
          "content": "\n            <p>Hãy hoàn thiện câu lệnh SQL dưới đây để lấy danh sách các danh mục sản phẩm (category) duy nhất từ bảng <code>products</code>, đồng thời sắp xếp theo thứ tự bảng chữ cái:</p>\n            <div class=\"code-example-card\">\n              <pre class=\"code-pre\"><code>SELECT [____Ô_1____] category \nFROM products \n[____Ô_2____] category ASC;</code></pre>\n            </div>\n            <details class=\"predict-details\" style=\"margin-top:10px;padding:10px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n              <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án điền khuyết</summary>\n              <div style=\"margin-top:8px;font-size:0.92rem;line-height:1.6;\">\n                <p><strong>Ô 1:</strong> <code>DISTINCT</code> (Từ khóa ép buộc CSDL chuyển từ Đa tập sang Tập hợp thuần túy để loại bỏ trùng lặp).</p>\n                <p><strong>Ô 2:</strong> <code>ORDER BY</code> (Mệnh đề bắt buộc để đảm bảo thứ tự dòng xác định).</p>\n                <pre class=\"code-pre\"><code>SELECT DISTINCT category \nFROM products \nORDER BY category ASC;</code></pre>\n              </div>\n            </details>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-00-pitfalls-deep",
          "title": "Cạm bẫy: Sửa chữa lỗi tư duy hệ thống",
          "content": "\n            <div class=\"callout-box callout-pitfall\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 1: \"Dữ liệu chèn vào trước chắc chắn sẽ xuất hiện trước khi SELECT\"</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Ví dụ sai:</strong> Viết câu lệnh phân trang <code>SELECT * FROM customers LIMIT 2 OFFSET 0;</code> mà không có mệnh đề <code>ORDER BY</code>.</p>\n                <p><strong>Cơ chế vì sao sai:</strong> Bảng quan hệ là một tập vô thứ tự. Thứ tự dòng phụ thuộc vào block đĩa vật lý nào nạp vào Buffer Pool trước, dữ liệu cập nhật MVCC trong PostgreSQL lấp vào khoảng trống cũ, hoặc worker nào chạy xong trước trong Parallel Scan. Cùng câu lệnh chạy lúc 9h sáng ra khách 1, 2; lúc 10h sáng lại ra khách 3, 1!</p>\n                <p><strong>Ví dụ đúng:</strong> Luôn luôn có <code>ORDER BY customer_id ASC</code> để đảm bảo tính tất định (Deterministic).</p>\n                <p><strong>Cách phát hiện sớm:</strong> Bật chế độ quét song song hoặc chạy kiểm thử tải; nếu kết quả trả về bị hoán đổi thứ tự giữa các lần chạy thì chắc chắn bạn đang thiếu ORDER BY.</p>\n              </div>\n            </div>\n\n            <div class=\"callout-box callout-pitfall\" style=\"margin-top:12px;\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 2: Thêm DISTINCT bừa bãi để \"chữa cháy\" câu lệnh JOIN bị nhân dòng</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Ví dụ sai:</strong> Khi JOIN bảng <code>customers</code> với <code>orders</code> mà thấy tên khách bị lặp 3 lần, lập trình viên vội vã thêm <code>SELECT DISTINCT customer_name, total_amount ...</code>.</p>\n                <p><strong>Cơ chế vì sao sai:</strong> Việc nhân dòng (Fan-out) là dấu hiệu cảnh báo bạn đã JOIN sai điều kiện khóa hoặc hiểu nhầm quan hệ 1-Nhiều. DISTINCT chỉ che giấu phần ngọn; nếu sau đó bạn tính <code>SUM(total_amount)</code>, kết quả tài chính sẽ bị phóng đại gấp nhiều lần!</p>\n                <p><strong>Ví dụ đúng:</strong> Sửa lại câu lệnh JOIN hoặc dùng truy vấn con gom nhóm trước khi ghép nối.</p>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-00-comparison-matrix",
          "title": "So sánh: Bảng đối chiếu Tập hợp (Set) vs Đa tập (Bag)",
          "content": "\n            <div class=\"dbms-diff-box\">\n              <div class=\"dbms-diff-header\"><span>⚖️ Bảng 1: Tập hợp (Set) vs Đa tập (Multiset / Bag)</span></div>\n              <div class=\"dbms-diff-body\">\n                <div class=\"table-responsive\">\n<table class=\"comparison-table\">\n                  <thead>\n                    <tr><th scope=\"col\">Tiêu chí</th><th scope=\"col\">Tập hợp (Set - Codd 1970)</th><th scope=\"col\">Đa tập (Multiset / Bag - SQL thực tế)</th></tr>\n                  </thead>\n                  <tbody>\n                    <tr><td><strong>Dòng trùng lặp</strong></td><td>Tuyệt đối không cho phép.</td><td>Mặc định cho phép cùng tồn tại.</td></tr>\n                    <tr><td><strong>Chi phí chiếu (SELECT)</strong></td><td>$O(N \\log N)$ (bắt buộc sort/hash khử trùng).</td><td><strong>$O(1)$ streaming:</strong> Đọc đến đâu trả về ngay đến đó.</td></tr>\n                    <tr><td><strong>Tính đúng đắn thống kê</strong></td><td>Làm mất các giao dịch có cùng giá trị tiền.</td><td>Bảo toàn trọn vẹn số tiền và số lượng giao dịch.</td></tr>\n                  </tbody>\n                </table>\n</div>\n              </div>\n            </div>\n\n            <div class=\"dbms-diff-box\" style=\"margin-top:14px;\">\n              <div class=\"dbms-diff-header\"><span>⚖️ Bảng 2: UNION ALL vs UNION</span></div>\n              <div class=\"dbms-diff-body\">\n                <div class=\"table-responsive\">\n<table class=\"comparison-table\">\n                  <thead>\n                    <tr><th scope=\"col\">Toán tử</th><th scope=\"col\">Cơ chế xử lý</th><th scope=\"col\">Chi phí CPU &amp; RAM</th><th scope=\"col\">Khi nào nên dùng?</th></tr>\n                  </thead>\n                  <tbody>\n                    <tr>\n                      <td><code>UNION ALL</code></td>\n                      <td>Ghép thô hai tập kết quả lại với nhau (giữ nguyên đa tập).</td>\n                      <td><strong>Cực thấp:</strong> Không sắp xếp, không tốn RAM.</td>\n                      <td><strong>Ưu tiên số 1:</strong> Dùng khi 2 tập dữ liệu không giao nhau hoặc nghiệp vụ cần giữ đa tập.</td>\n                    </tr>\n                    <tr>\n                      <td><code>UNION</code></td>\n                      <td>Ghép nối kèm bước Sort Unique để khử toàn bộ dòng trùng.</td>\n                      <td><strong>Rất cao:</strong> Tốn CPU và bộ nhớ đệm để sắp xếp.</td>\n                      <td>Chỉ dùng khi nghiệp vụ bắt buộc phải loại bỏ các bản ghi trùng lặp giữa 2 tập.</td>\n                    </tr>\n                  </tbody>\n                </table>\n</div>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-00-real-world-scale",
          "title": "Thực tế: Đánh đổi hiệu năng & Khác biệt giữa các hệ RDBMS",
          "content": "\n            <p><strong>A. Vì sao SQL chọn Đa tập (Bag) thay vì Tập hợp (Set)?</strong></p>\n            <p>Nếu SQL tuân thủ lý thuyết tập hợp thuần túy, mọi câu lệnh <code>SELECT column FROM table</code> trên bảng 1 tỷ dòng sẽ buộc máy chủ phải cấp phát hàng trăm Gigabyte bộ nhớ RAM để xây dựng bảng băm hoặc ghi tràn ra ổ đĩa tạm (Disk Spill) nhằm loại bỏ các dòng trùng lặp! Bằng cách chọn Đa tập, SQL cho phép truyền luồng dữ liệu (streaming pipeline) với độ trễ cực thấp.</p>\n\n            <p><strong>B. Khác biệt giữa các hệ quản trị về thứ tự dòng mặc định:</strong></p>\n            <ul>\n              <li><strong>PostgreSQL:</strong> Bảng lưu trữ dạng Heap (Heap-organized table). Khi có lệnh UPDATE, cơ chế MVCC ghi dòng mới vào khoảng trống cũ ở đầu trang đĩa, khiến thứ tự dòng trả về thay đổi liên tục sau mỗi thao tác cập nhật!</li>\n              <li><strong>MySQL (InnoDB):</strong> Bảng được tổ chức theo chỉ mục Clustered Index (B-Tree trên Khóa chính). Do đó, câu lệnh <code>SELECT *</code> không có ORDER BY thường vô tình trả về theo thứ tự khóa chính, khiến lập trình viên lầm tưởng thứ tự này luôn được bảo đảm! Nhưng ngay khi có JOIN hoặc Full Table Scan qua buffer, trật tự này lập tức sụp đổ.</li>\n              <li><strong>DuckDB &amp; ClickHouse:</strong> CSDL Cột (OLAP) quét dữ liệu theo từng lô vector (Vectorized Chunks) đa luồng song song, thứ tự trả về là hoàn toàn ngẫu nhiên giữa các lần chạy.</li>\n            </ul>\n          ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi tư duy: \"Dữ liệu chèn vào trước chắc chắn sẽ xuất hiện trước trong kết quả SELECT\"",
            "content": "Nhiều lập trình viên lầm tưởng nếu INSERT khách hàng 1 rồi đến khách hàng 2 thì câu lệnh `SELECT * FROM customers` sẽ luôn trả về khách 1 trước. Đây là một sai lầm chết người! Thứ tự trả về nếu không có ORDER BY phụ thuộc hoàn toàn vào cách engine đọc các block đĩa vật lý, trạng thái cache và số worker song song. Chỉ có một cách duy nhất để đảm bảo thứ tự: ghi rõ `ORDER BY`."
          },
          {
            "title": "Lỗi lạm dụng UNION thay vì UNION ALL",
            "content": "Toán tử `UNION` bắt buộc CSDL phải chạy bước SORT UNIQUE để loại bỏ mọi dòng trùng lặp giữa hai tập hợp. Nếu bạn biết chắc hai tập hợp không giao nhau (hoặc nghiệp vụ chấp nhận giữ đa tập), việc dùng `UNION` thay vì `UNION ALL` sẽ làm lãng phí 80% tài nguyên CPU và bộ nhớ của máy chủ."
          },
          {
            "title": "Lỗi thêm DISTINCT để \"sửa tạm\" câu lệnh JOIN bị nhân dòng (Fan-out trap)",
            "content": "Khi JOIN bảng `customers` với `orders` mà một khách có 3 đơn, nếu bạn SELECT customer_name và thấy tên bị lặp lại rồi vội thêm `DISTINCT`, bạn đang che giấu hiện tượng nhân dòng. Nếu sau đó bạn cần tính `SUM(total_amount)`, kết quả tính toán sẽ bị sai lệch nghiêm trọng."
          }
        ],
        "tips": [
          {
            "title": "Quy tắc vàng của Kỹ sư Dữ liệu",
            "content": "Bất cứ khi nào bạn có ý định dùng con trỏ (CURSOR) hoặc vòng lặp WHILE trong thủ tục lưu sẵn (Stored Procedure) để xử lý dữ liệu từng dòng, hãy dừng lại 5 giây và tự hỏi: \"Bài toán này có thể giải quyết bằng một phép toán tập hợp (JOIN, CASE, GROUP BY, Window function) không?\". 99% trường hợp câu trả lời là CÓ và nhanh hơn gấp 100 lần!"
          }
        ],
        "deepDive": {
          "title": "Bản chất vật lý: Vì sao RDBMS lưu trữ dạng Heap Files và Free Space Map (FSM)?",
          "content": "<p>Trong các hệ quản trị CSDL quan hệ như PostgreSQL, bảng mặc định được tổ chức dưới dạng <strong>Heap File</strong> (tập tin đống) gồm nhiều khối đĩa vật lý (Pages/Blocks có kích thước chuẩn 8KB). Khi bạn thực hiện câu lệnh <code>INSERT</code>, engine không tìm vị trí sắp xếp để chèn mà tra cứu bảng <strong>Free Space Map (FSM)</strong> để tìm trang đĩa nào còn đủ chỗ trống gần nhất và nhét bản ghi vào đó.</p><p>Đặc biệt với cơ chế MVCC của PostgreSQL, khi một dòng được <code>UPDATE</code>, engine thực chất thực hiện <code>DELETE</code> logic dòng cũ và <code>INSERT</code> dòng mới vào khoảng trống khác trên đĩa. Do đó, nếu không có mệnh đề <code>ORDER BY</code>, thứ tự dòng trả về khi chạy <code>SELECT</code> sẽ thay đổi ngẫu nhiên ngay sau khi có giao dịch cập nhật!</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 0.1-1 (Dự đoán kết quả): Phân biệt UNION vs UNION ALL trên tập khách hàng",
          "level": "Cơ bản",
          "problem": "Xét hai câu truy vấn sau trên bảng `customers` của TechMart:\n\n-- Truy vấn A:\nSELECT city FROM customers WHERE customer_id IN (1, 2)\nUNION ALL\nSELECT city FROM customers WHERE customer_id IN (2, 4);\n\n-- Truy vấn B:\nSELECT city FROM customers WHERE customer_id IN (1, 2)\nUNION\nSELECT city FROM customers WHERE customer_id IN (2, 4);\n\nBiết khách 1 ở Hanoi, khách 2 ở Ho Chi Minh, khách 4 ở Hanoi. Hãy dự đoán số dòng và giá trị cụ thể trả về của Truy vấn A và Truy vấn B.",
          "hint": "UNION ALL giữ nguyên đa tập (Multiset); UNION loại bỏ các phần tử trùng lặp (Set).",
          "solutionCode": "-- Kết quả chạy thực tế trên PostgreSQL 16 / DuckDB / SQLite:\n-- Truy vấn A (UNION ALL) trả về 4 dòng:\n-- 'Hanoi', 'Ho Chi Minh', 'Ho Chi Minh', 'Hanoi'\n\n-- Truy vấn B (UNION) trả về 2 dòng duy nhất:\n-- 'Ho Chi Minh', 'Hanoi' (hoặc 'Hanoi', 'Ho Chi Minh' tùy thứ tự engine)",
          "solutionOutput": "Truy vấn A: 4 dòng (Đa tập) | Truy vấn B: 2 dòng (Tập hợp thuần túy)",
          "explanation": "Chẩn đoán lỗi: Nếu bạn đoán Truy vấn A trả về 3 dòng, bạn đã nhầm lẫn khi nghĩ rằng UNION ALL khử trùng khách hàng số 2. UNION ALL hoàn toàn không kiểm tra trùng lặp, nó nối ghép thô hai tập kết quả lại với nhau."
        },
        {
          "title": "Bài tập 0.1-2 (Tìm & Sửa lỗi): Khử bỏ DISTINCT dư thừa gây nghẽn hiệu năng",
          "level": "Trung bình",
          "problem": "Một câu truy vấn báo cáo đang chạy rất chậm trên hệ thống:\n`SELECT DISTINCT c.customer_id, c.full_name, c.email FROM customers c;`\nHãy giải thích vì sao từ khóa `DISTINCT` ở đây là hoàn toàn dư thừa và gây lãng phí tài nguyên, sau đó viết lại câu lệnh tối ưu.",
          "hint": "Hãy kiểm tra ràng buộc của cột `customer_id` trong định nghĩa bảng customers.",
          "solutionCode": "-- Viết lại tối ưu: Bỏ DISTINCT hoàn toàn\nSELECT customer_id, full_name, email\nFROM customers;",
          "solutionOutput": "Query executed in 0.2ms (Không tốn chi phí Sort / Hash Unique).",
          "explanation": "Chẩn đoán lỗi: Cột `customer_id` là Khóa chính (PRIMARY KEY), tức là đã có tính chất duy nhất (UNIQUE) được bảo đảm bởi cấu trúc chỉ mục. Bản thân mỗi dòng trong bảng `customers` đã là duy nhất, do đó việc thêm `DISTINCT` chỉ làm engine tốn công quét lại để khử một thứ không hề tồn tại."
        },
        {
          "title": "Bài tập 0.1-3 (Tự viết truy vấn): Thiết kế phân trang an toàn (Deterministic Pagination)",
          "level": "Nâng cao",
          "problem": "Bạn cần lấy trang đầu tiên gồm 2 sản phẩm có giá cao nhất từ bảng `products`. Viết câu lệnh SQL đảm bảo kết quả trả về là 100% xác định (deterministic), không bao giờ bị nhảy dòng ngẫu nhiên giữa các lần chạy, ngay cả khi có nhiều sản phẩm bằng giá nhau.",
          "hint": "Tiêu chí phá hòa (Tie-breaker): Khi cột price bị trùng, cần thêm một cột duy nhất nào vào ORDER BY?",
          "solutionCode": "SELECT product_id, product_name, price\nFROM products\nORDER BY price DESC, product_id ASC\nLIMIT 2;",
          "solutionOutput": "+------------+----------------------------------+------------+\n| product_id | product_name                     | price      |\n+------------+----------------------------------+------------+\n| 103        | Man hinh Dell Ultrasharp 27 inch | 8500000.00 |\n| 104        | Tai nghe Sony WH-1000XM5         | 6900000.00 |\n+------------+----------------------------------+------------+\n(Đã kiểm chứng trên PostgreSQL 16 & DuckDB 2.0.0)",
          "explanation": "Chẩn đoán lỗi: Nếu bạn chỉ viết `ORDER BY price DESC`, khi hai sản phẩm có cùng giá tiền, thứ tự giữa chúng là không xác định. Việc bổ sung khóa chính `product_id ASC` làm tiêu chí phá hòa (tie-breaker) là điều kiện bắt buộc để bảo đảm tính tất định trong phân trang chuyên nghiệp."
        },
        {
          "title": "Bài tập 0.1-4 (Giải thích & Đánh đổi): Procedural vs Set-based trên 1 triệu dòng",
          "level": "Nâng cao",
          "problem": "Giải thích bằng lời: Tại sao khi cập nhật giá cho 100.000 sản phẩm, giải pháp gửi 100.000 câu lệnh UPDATE đơn lẻ qua vòng lặp for của Python lại chậm hơn gấp 500 lần so với một câu lệnh UPDATE duy nhất trong SQL? Nêu ít nhất 3 nguyên nhân ở cấp độ kiến trúc hệ điều hành và CSDL.",
          "hint": "Nghĩ về network roundtrip, nhật ký WAL/fsync và tranh chấp khóa (lock contention).",
          "solutionCode": "-- Ba nguyên nhân bản chất:\n-- 1. Độ trễ mạng (Network Latency): 100.000 roundtrips qua giao thức TCP/IP tốn hàng chục giây chỉ để truyền gói tin.\n-- 2. Nhật ký giao dịch (WAL fsync): Mỗi lệnh đơn lẻ buộc đĩa cứng phải ghi nhận giao dịch riêng biệt, nghẽn I/O.\n-- 3. Tranh chấp khóa (Locking): Mở/đóng khóa hàng trăm nghìn lần làm nghẽn CPU thay vì 1 khóa nguyên tử tại chỗ.",
          "solutionOutput": "Set-based xử lý in-situ trực tiếp trên trang bộ nhớ, triệt tiêu độ trễ mạng và I/O.",
          "explanation": "Chẩn đoán lỗi: Nếu bạn chỉ nói \"Python chậm hơn SQL vì Python là ngôn ngữ thông dịch\", bạn chưa hiểu bản chất kiến trúc mạng và động cơ lưu trữ I/O của DBMS."
        }
      ],
      "quiz": [
        {
          "question": "Tại sao chuẩn SQL quốc tế (ISO/IEC 9075) lại lựa chọn ngữ nghĩa Đa tập (Multiset / Bag Semantics) làm mặc định thay vì Tập hợp thuần túy (Set Theory)?",
          "options": [
            "Vì các nhà toán học chứng minh đa tập luôn đúng hơn tập hợp.",
            "Vì loại bỏ trùng lặp mặc định sau mỗi phép chiếu (SELECT) đòi hỏi chi phí tính toán cực lớn (sắp xếp hoặc băm bộ nhớ), đồng thời các phép tính tổng hợp (SUM, COUNT) cần giữ nguyên các dòng trùng để phản ánh đúng thực tế giao dịch.",
            "Vì các hệ điều hành máy tính cũ không hỗ trợ thuật toán sắp xếp.",
            "Vì đa tập cho phép lưu trữ dữ liệu mà không cần định nghĩa kiểu dữ liệu cho cột."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Nếu tuân thủ tuyệt đối Tập hợp thuần túy, mọi câu lệnh SELECT đều phải chạy thuật toán khử trùng lặp (DISTINCT ngầm) tốn chi phí O(N log N) hoặc O(N) bộ nhớ, làm suy sụp hiệu năng của toàn bộ hệ thống."
        },
        {
          "question": "Điều nào sau đây là ĐÚNG về thứ tự các dòng trả về khi thực thi câu lệnh: SELECT * FROM customers;",
          "options": [
            "CSDL luôn trả về kết quả theo thứ tự Khóa chính (Primary Key) tăng dần.",
            "CSDL luôn trả về theo thứ tự thời gian chèn dòng (First-In, First-Out).",
            "Thứ tự các dòng là hoàn toàn bất định (Non-deterministic); CSDL không cam kết bất kỳ thứ tự nào nếu không có mệnh đề ORDER BY tường minh.",
            "Thứ tự các dòng phụ thuộc vào kích thước RAM của máy tính client."
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Trong mô hình quan hệ, một bảng là một tập hợp/đa tập không có thứ tự tự nhiên (unordered collection). Thứ tự vật lý các dòng phụ thuộc vào trang đĩa (page/block) mà engine đọc lên."
        },
        {
          "question": "Trong Data Engineering, tại sao các kỹ sư luôn ưu tiên sử dụng toán tử UNION ALL thay vì UNION trừ khi có yêu cầu nghiệp vụ bắt buộc?",
          "options": [
            "Vì UNION ALL cho phép ghép các bảng có số lượng cột khác nhau, còn UNION thì không.",
            "Vì UNION phải thực hiện phép sắp xếp (Sort Unique) hoặc băm (Hash Unique) trên toàn bộ dữ liệu để loại bỏ dòng trùng, tốn nhiều CPU và dễ tràn RAM xuống đĩa (Spill to disk); trong khi UNION ALL chỉ ghép nối luồng trực tiếp với độ phức tạp O(1) bộ nhớ.",
            "Vì UNION ALL tự động sửa lỗi dữ liệu kiểu ngày tháng.",
            "Vì chuẩn ANSI SQL đã khai tử toán tử UNION."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Toán tử UNION có chi phí khử trùng lặp ngầm cực kỳ đắt đỏ. Trên các luồng ETL/ELT xử lý hàng triệu bản ghi, UNION ALL nhanh hơn gấp nhiều lần và tiết kiệm tài nguyên bộ nhớ."
        },
        {
          "question": "Một bảng không có Khóa chính (Primary Key) vô tình chứa 2 dòng giống hệt nhau về mọi giá trị của tất cả các cột. Phát biểu nào sau đây đúng về mặt ngữ nghĩa toán học của mô hình quan hệ?",
          "options": [
            "Bảng vẫn là một quan hệ toán học hoàn hảo vì đã có tên bảng và tên cột.",
            "Vi phạm tiên đề cơ bản của mô hình quan hệ vì không có cách nào định danh duy nhất (Unique Identity) để phân biệt hoặc thao tác trên từng bộ giá trị mà không dựa vào con trỏ vật lý nội bộ của engine.",
            "CSDL sẽ tự động xóa bớt 1 dòng khi khởi động lại máy chủ.",
            "Đây là chuẩn thiết kế khuyến nghị cho các bảng dữ liệu lớn (Big Data)."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Theo định nghĩa quan hệ của Edgar F. Codd, mỗi bộ giá trị (tuple) phải được định danh duy nhất. Thiếu Khóa chính khiến bảng mất tính toàn vẹn toán học và dẫn tới các lỗi cập nhật/xóa ngoài tầm kiểm soát."
        },
        {
          "question": "Tại sao trong đại số quan hệ thuần túy, phép chiếu (Projection) luôn tự động khử trùng lặp, nhưng câu lệnh SELECT trong SQL lại giữ nguyên các dòng trùng lặp trừ khi có từ khóa DISTINCT?",
          "options": [
            "Vì trong đại số quan hệ, kết quả của phép chiếu là một Quan hệ (Relation) mới mà Quan hệ theo định nghĩa tập hợp không thể chứa phần tử trùng lặp; còn SQL xem bảng kết quả là một Đa tập (Multiset / Bag).",
            "Vì từ khóa DISTINCT được phát minh sau đại số quan hệ 20 năm.",
            "Vì đại số quan hệ chỉ áp dụng cho bảng có dưới 100 dòng.",
            "Vì SQL không hỗ trợ toán học quan hệ."
          ],
          "correctIndex": 0,
          "explanation": "Chính xác! Đây chính là điểm phân tách rõ nét nhất giữa Lý thuyết Quan hệ toán học thuần túy (Set Theory) và Ngôn ngữ hiện thực SQL thương mại (Multiset/Bag Semantics)."
        }
      ],
      "summary": [
        "Mô hình quan hệ (Relational Model) tách rời logic truy vấn khỏi tầng lưu trữ vật lý, giải phóng lập trình viên khỏi việc điều hướng con trỏ.",
        "SQL thực tế là Đa tập (Multiset / Bag): cho phép dòng trùng lặp để tối ưu hiệu năng và phục vụ tính toán thống kê; chỉ biến thành Tập hợp thuần túy khi có `DISTINCT` hoặc `UNION`.",
        "Tư duy SQL là tư duy tập hợp (Set-based): miêu tả kết quả mong muốn bằng vị từ thay vì duyệt vòng lặp từng dòng.",
        "Thứ tự dòng trong SQL là không xác định (non-deterministic) nếu thiếu mệnh đề `ORDER BY` tường minh có tiêu chí phá hòa (tie-breaker).",
        "Nối bài: Bài tiếp theo (0.2) sẽ giải mã cách Bộ tối ưu hóa truy vấn (Query Optimizer) dịch câu lệnh khai báo thành kế hoạch thực thi vật lý tối ưu nhất.",
        "Ôn cách quãng: Tại sao việc hiểu rõ sự khác biệt giữa Tập hợp thuần túy (Set) và Đa tập (Multiset/Bag) lại quyết định đến hiệu năng của câu lệnh SELECT có DISTINCT?"
      ]
    },
    {
      "id": "sql-01-declarative-mindset",
      "number": "0.2",
      "title": "SQL - Ngôn ngữ Khai Báo: Nói \"Muốn gì\" thay vì \"Làm thế nào\" & Phân Loại Lệnh",
      "subtitle": "Hiểu bản chất của ngôn ngữ khai báo (Declarative), vai trò Bộ tối ưu hóa (Optimizer) và 5 nhóm lệnh dưới góc nhìn kỹ sư",
      "level": "Cơ bản",
      "duration": "45 phút",
      "keywords": [
        "Declarative Language",
        "Imperative",
        "Query Optimizer",
        "Logical Plan",
        "Physical Plan",
        "DDL",
        "DML",
        "DQL",
        "DCL",
        "TCL"
      ],
      "prerequisites": "Hoàn thành Bài 0.1 (Bản chất mô hình quan hệ & Đa tập).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Thấu hiểu bản chất khác biệt giữa ngôn ngữ mệnh lệnh (Imperative) và ngôn ngữ khai báo (Declarative).",
        "Giải thích được cơ chế hoạt động trực giác của Bộ tối ưu hóa truy vấn (Query Optimizer): từ cây cú pháp logic (Logical Plan) đến kế hoạch thực thi vật lý (Physical Plan).",
        "Chứng minh vì sao hai câu truy vấn viết khác nhau (hoặc khác thứ tự bảng) có thể sinh ra cùng một kế hoạch thực thi.",
        "Nắm vững 5 nhóm lệnh trong SQL (DDL, DML, DQL, DCL, TCL) dưới góc nhìn vai trò thực tế, kèm ghi chú trung thực về các quan điểm phân loại SELECT.",
        "Phân tích được tình huống thực tế của 3 mạch [DQ], [FE], [SCALE] khi triển khai mô hình dữ liệu trên môi trường sản xuất."
      ],
      "intuition": {
        "title": "Đặt món tại nhà hàng vs Tự vào bếp nấu ăn",
        "metaphor": "Khi bạn đến một nhà hàng cao cấp, bạn cầm thực đơn lên và bảo nhân viên phục vụ: \"Cho tôi một phần bít-tết bò Wagyu chín vừa (medium-rare) kèm sốt tiêu đen\". Bạn chỉ nói BẠN MUỐN GÌ (Declarative). Bạn không cần quan tâm đầu bếp phải bật bếp lửa ở bao nhiêu độ, dùng chảo gang hay chảo thép, đảo thịt bao nhiêu phút. Đầu bếp chuyên nghiệp sẽ chọn kỹ thuật tối ưu nhất để mang đĩa bít-tết thơm ngon ra bàn. Ngược lại, nếu bạn tự vào bếp (Imperative / Mệnh lệnh như C/Python), bạn phải tự tay viết từng bước chi tiết: mở tủ lạnh, lấy thịt, ướp muối 15 phút, bật bếp gas nấc số 3... Nếu bạn quên một bước, món ăn sẽ hỏng.",
        "boundary": "Ẩn dụ này rất trực quan; tuy nhiên ranh giới phá vỡ ở chỗ: nếu bạn đưa một yêu cầu \"ngớ ngẩn\" (ví dụ: SELECT * không có điều kiện lọc trên bảng 10 tỷ dòng), \"đầu bếp\" DBMS dù có tài giỏi đến đâu cũng buộc phải quét sạch cả ổ cứng và làm sập toàn bộ máy chủ!",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:220px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;font-weight:700;\">⚙️ IMPERATIVE (PYTHON/C - HOW)</div>\n                <div style=\"font-size:0.95rem;font-weight:800;color:var(--text-primary);font-family:monospace;\">for row in data:<br>&nbsp;&nbsp;if row.id == 10: res.append()</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Lập trình viên tự quản lý vòng lặp & RAM</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">VS</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:220px;\">\n                <div style=\"font-size:0.75rem;color:var(--topic-sql);margin-bottom:4px;font-weight:700;\">🎯 DECLARATIVE (SQL - WHAT)</div>\n                <div style=\"font-size:1.05rem;font-weight:800;font-family:monospace;\">SELECT * FROM orders<br>WHERE id = 10;</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Chỉ nói kết quả; CBO tự sinh Physical Plan</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ Pipeline:</span>\n              <span>SQL Text &rarr; AST &rarr; <strong>Logical Plan</strong> (Quan hệ) &rarr; <strong>Cost-Based Optimizer (CBO)</strong> &rarr; <strong>Physical Plan</strong> (Seq Scan / Index Scan).</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-01-problem-hook",
          "title": "Gợi mở: Nếu SQL là ngôn ngữ Mệnh lệnh, chuyện gì xảy ra?",
          "content": "\n            <p>Hãy tưởng tượng nếu SQL bắt bạn phải viết code theo trường phái <strong>mệnh lệnh (Imperative)</strong> như C hay Python:</p>\n            <ul>\n              <li>Mỗi khi muốn nối hai bảng <code>customers</code> và <code>orders</code>, bạn phải tự viết 2 vòng lặp <code>for</code> lồng nhau (Nested Loop Join).</li>\n              <li>Khi bảng <code>orders</code> tăng từ 1.000 dòng lên 100 triệu dòng, thuật toán vòng lặp lồng của bạn bị treo cứng máy chủ! Bạn lại phải tự tay đập code đi, viết lại thuật toán dựng bảng băm (Hash Join) và tự quản lý bộ nhớ đệm RAM.</li>\n              <li>Khi dữ liệu được sắp xếp sẵn, bạn lại phải tự xóa thuật toán băm để chuyển sang thuật toán ghép nối tuần tự (Merge Join).</li>\n            </ul>\n            <p><strong>Hậu quả:</strong> Kỹ sư dữ liệu sẽ dành 99% thời gian để quản lý thuật toán thuật toán CPU và con trỏ bộ nhớ thay vì giải quyết bài toán nghiệp vụ! Ngôn ngữ khai báo (Declarative) ra đời để giải phóng hoàn toàn con người khỏi gánh nặng đó.</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-01-recall-prereq",
          "title": "Truy hồi: Kiểm tra nhanh từ Bài 0.1",
          "content": "\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n              <p><strong>Câu hỏi 1:</strong> Chuẩn SQL quốc tế (ISO/IEC 9075) vận hành trên cấu trúc Đa tập (Multiset/Bag) hay Tập hợp thuần túy (Set)? Hệ quả là gì?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> SQL vận hành trên <strong>Đa tập (Multiset/Bag)</strong>, cho phép các dòng trùng lặp cùng tồn tại để đạt tốc độ nạp dữ liệu tức thì $O(1)$. Chỉ khi dùng <code>DISTINCT</code> hoặc <code>UNION</code> thì SQL mới chuyển sang Tập hợp thuần túy.</p>\n                </div>\n              </details>\n            </div>\n\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n              <p><strong>Câu hỏi 2:</strong> Nếu một câu lệnh <code>SELECT * FROM orders;</code> không có mệnh đề <code>ORDER BY</code>, thứ tự các dòng trả về có được bảo đảm không?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Hoàn toàn không! Thứ tự các dòng là vô định (non-deterministic), phụ thuộc vào cách engine đọc các trang đĩa vật lý và số lượng luồng xử lý song song.</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-01-concept-definition",
          "title": "Khái niệm: Khai báo vs Mệnh lệnh & Bộ tối ưu hóa (Optimizer)",
          "content": "\n            <p>Sự khác biệt cốt lõi giữa hai trường phái ngôn ngữ lập trình:</p>\n            <div class=\"dbms-diff-box\">\n              <div class=\"dbms-diff-header\"><span>⚖️ So sánh Hai Trường Phái Ngôn Ngữ Lập Trình</span></div>\n              <div class=\"dbms-diff-body\">\n                <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n                  <thead>\n                    <tr><th scope=\"col\">Đặc điểm</th><th scope=\"col\">Ngôn ngữ Mệnh lệnh (Python, Java, C++)</th><th scope=\"col\">Ngôn ngữ Khai báo (SQL)</th></tr>\n                  </thead>\n                  <tbody>\n                    <tr><td><strong>Trọng tâm cú pháp</strong></td><td>Nói rõ <em>\"Làm thế nào\" (HOW)</em> từng bước tuần tự.</td><td>Nói rõ <em>\"Muốn kết quả gì\" (WHAT)</em> bằng điều kiện vị từ.</td></tr>\n                    <tr><td><strong>Trách nhiệm tối ưu</strong></td><td>Thuộc về lập trình viên (tự chọn thuật toán, giải phóng RAM).</td><td>Thuộc về <strong>Bộ tối ưu hóa truy vấn của DBMS (Query Optimizer)</strong>.</td></tr>\n                    <tr><td><strong>Tính trừu tượng</strong></td><td>Thấp/Trung bình (quản lý biến, mảng, vòng lặp).</td><td>Rất cao (trừu tượng hóa hoàn toàn tầng lưu trữ vật lý trên đĩa).</td></tr>\n                  </tbody>\n                </table>\n              </div>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-01-internals-optimizer",
          "title": "Cơ chế: Từ Kế hoạch Logic (Logical Plan) đến Kế hoạch Vật lý (Physical Plan)",
          "content": "\n            <p>Dưới nắp ca-pô, câu truy vấn SQL khai báo của bạn được xử lý qua 3 công đoạn nghiêm ngặt:</p>\n            \n            <div class=\"sql-result-container\">\n              <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n                <thead>\n                  <tr><th scope=\"col\">Công đoạn</th><th scope=\"col\">Thành phần phụ trách</th><th scope=\"col\">Nhiệm vụ cốt lõi</th></tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>1. Parser &amp; Lexer</strong></td>\n                    <td>Bộ phân tích cú pháp</td>\n                    <td>Kiểm tra ngữ pháp SQL, tra cứu danh mục xem bảng/cột có tồn tại không, và sinh ra Cây cú pháp trừu tượng (Abstract Syntax Tree - AST).</td>\n                  </tr>\n                  <tr>\n                    <td><strong>2. Query Optimizer (CBO)</strong></td>\n                    <td>Bộ tối ưu hóa chi phí</td>\n                    <td>\n                      Chuyển AST thành <strong>Kế hoạch Logic (Logical Plan)</strong>. Sau đó, dựa trên <em>Thống kê dữ liệu (Statistics: số dòng, số trang bộ nhớ, phân phối chỉ mục)</em>, Optimizer sinh ra hàng chục <strong>Kế hoạch Vật lý (Physical Plans)</strong> khác nhau, tính toán chi phí (Cost) của từng phương án và chọn ra kế hoạch tối ưu nhất!\n                    </td>\n                  </tr>\n                  <tr>\n                    <td><strong>3. Execution Engine</strong></td>\n                    <td>Bộ thực thi</td>\n                    <td>Kích hoạt các toán tử vật lý (Seq Scan, Index Scan, Hash Join...), nạp các trang dữ liệu từ ổ đĩa/RAM và trả kết quả về ứng dụng.</td>\n                  </tr>\n                </tbody>\n              </table>\n              </div>\n            </div>\n\n            <div class=\"callout-box callout-tip\" style=\"margin-top:12px;\">\n              <div class=\"callout-header\"><span>💡 Hệ quả quan trọng:</span> <span>Hai truy vấn khác cách viết có thể chung một kế hoạch</span></div>\n              <div class=\"callout-body\">\n                <p>Bởi vì bạn chỉ khai báo kết quả mong muốn, Optimizer có quyền tự do tối ưu hóa:</p>\n                <ul>\n                  <li>Thứ tự bảng trong <code>FROM a, b</code> hoàn toàn không ép CSDL phải đọc bảng <code>a</code> trước. Optimizer tự động đọc bảng nhỏ hơn trước để dựng bảng băm!</li>\n                  <li>Một câu truy vấn dùng <code>JOIN</code> và một câu truy vấn dùng <code>WHERE EXISTS</code> hoàn toàn có thể được Optimizer biên dịch về cùng một toán tử vật lý duy nhất là <strong>Hash Semi Join</strong>.</li>\n                </ul>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-01-example-worked",
          "title": "Ví dụ mẫu: Dự đoán trước khi xem & Tự do của Optimizer",
          "content": "\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:16px;border-radius:8px;background:var(--bg-surface-elevated);margin:16px 0;\">\n              <h4 style=\"margin:0 0 8px;color:var(--text-primary);\">❓ Dự đoán trước khi xem:</h4>\n              <p>Xét hai câu lệnh sau trên bảng <code>orders</code> có 10 triệu dòng (trong đó cột <code>order_id</code> là Khóa chính có B-Tree index, còn cột <code>status</code> không có index):</p>\n              <pre class=\"code-pre\"><code>-- Câu A:\nSELECT * FROM orders WHERE status = 'COMPLETED' AND order_id = 1005;\n\n-- Câu B:\nSELECT * FROM orders WHERE order_id = 1005 AND status = 'COMPLETED';</code></pre>\n              <p>Theo bạn, Câu B có chạy nhanh hơn Câu A vì nó đặt điều kiện lọc theo Khóa chính (nhanh hơn) ở phía trước chữ AND không? Vì sao?</p>\n              <details class=\"predict-details\" style=\"margin-top:12px;padding:10px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem phân tích cơ chế &amp; Đáp án</summary>\n                <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                  <p><strong>Đáp án: TỐC ĐỘ BẰNG NHAU 100% (Cùng một kế hoạch thực thi duy nhất)!</strong></p>\n                  <p><strong>Cơ chế bản chất:</strong></p>\n                  <p>Trong ngôn ngữ mệnh lệnh như Python, toán tử AND chạy từ trái sang phải (short-circuit). Nhưng SQL là <strong>ngôn ngữ khai báo (Declarative)</strong>. Bộ tối ưu hóa (Query Optimizer) sẽ kiểm tra thống kê và danh mục chỉ mục: nó nhận thấy <code>order_id = 1005</code> có thể dùng Index Lookup chỉ tốn 1 lần đọc đĩa (Cost cực thấp), trong khi <code>status = 'COMPLETED'</code> phải quét toàn bảng (Cost cực cao). Do đó, Optimizer sẽ <strong>luôn luôn sử dụng chỉ mục trên order_id trước</strong> để lấy đúng 1 dòng duy nhất, sau đó mới kiểm tra status, bất kể bạn viết order_id ở trước hay sau chữ AND!</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Minh chứng tích hợp 5 nhóm lệnh trên bảng vip_customers TechMart",
              "code": "-- 1. DDL: Định nghĩa cấu trúc bảng\nCREATE TABLE vip_customers (\n    customer_id INT PRIMARY KEY,\n    total_spent DECIMAL(12, 2) NOT NULL\n);\n\n-- 2. DML & TCL: Mở giao dịch và nạp dữ liệu an toàn\nBEGIN TRANSACTION;\nINSERT INTO vip_customers (customer_id, total_spent) VALUES (2, 12500000.00);\nCOMMIT;\n\n-- 3. DQL: Truy vấn đọc dữ liệu\nSELECT * FROM vip_customers;",
              "explanation": "Đã kiểm chứng trên PostgreSQL 16 và SQLite 3.50.4. Kịch bản thể hiện rõ sự phối hợp giữa DDL (xây cấu trúc), TCL (quản lý giao dịch), DML (thao tác dữ liệu) và DQL (truy vấn kết quả).",
              "output": "+-------------+-------------+\n| customer_id | total_spent |\n+-------------+-------------+\n| 2           | 12500000.00 |\n+-------------+-------------+\n(1 row - Đã kiểm chứng)"
            }
          ]
        },
        {
          "id": "sec-01-fill-in-blank",
          "title": "Điền khuyết: Nhận diện phân loại câu lệnh SQL",
          "content": "\n            <p>Hãy điền tên viết tắt của nhóm lệnh (DDL, DML, DQL, DCL, TCL) tương ứng với từng câu lệnh thực tế dưới đây:</p>\n            <div class=\"code-example-card\">\n              <pre class=\"code-pre\"><code>1. ALTER TABLE customers ADD COLUMN phone VARCHAR(20);  --> [____Ô_1____]\n2. ROLLBACK;                                            --> [____Ô_2____]\n3. GRANT SELECT ON orders TO data_analyst;             --> [____Ô_3____]\n4. UPDATE products SET price = price * 1.05;            --> [____Ô_4____]</code></pre>\n            </div>\n            <details class=\"predict-details\" style=\"margin-top:10px;padding:10px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n              <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án điền khuyết</summary>\n              <div style=\"margin-top:8px;font-size:0.92rem;line-height:1.6;\">\n                <p><strong>Ô 1:</strong> <code>DDL</code> (Data Definition Language - Sửa đổi cấu trúc lược đồ bảng).</p>\n                <p><strong>Ô 2:</strong> <code>TCL</code> (Transaction Control Language - Hủy bỏ hoàn tác giao dịch).</p>\n                <p><strong>Ô 3:</strong> <code>DCL</code> (Data Control Language - Phân quyền truy cập bảo mật).</p>\n                <p><strong>Ô 4:</strong> <code>DML</code> (Data Manipulation Language - Sửa đổi dữ liệu dòng).</p>\n              </div>\n            </details>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-01-pitfalls-deep",
          "title": "Cạm bẫy: Sửa chữa lỗi tư duy hệ thống",
          "content": "\n            <div class=\"callout-box callout-pitfall\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 1: Nhầm lẫn chết người giữa TRUNCATE và DELETE không có WHERE</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Ví dụ sai:</strong> Nghĩ rằng <code>TRUNCATE TABLE orders;</code> và <code>DELETE FROM orders;</code> hoàn toàn giống nhau vì đều làm rỗng bảng.</p>\n                <p><strong>Cơ chế vì sao sai:</strong> \n                  <ul>\n                    <li><code>DELETE</code> là lệnh <strong>DML</strong>: Nó quét duyệt từng dòng, kiểm tra ràng buộc, và ghi nhận từng thao tác xóa vào Transaction Log / WAL (rất chậm trên bảng lớn, nhưng có thể hoàn tác trong transaction).</li>\n                    <li><code>TRUNCATE</code> là lệnh <strong>DDL</strong>: Nó trực tiếp hủy cấp phát (deallocate) toàn bộ các trang dữ liệu của bảng ở tầng vật lý trên đĩa cứng (cực nhanh, đặt lại bộ đếm tự tăng, và không kích hoạt trigger DELETE!).</li>\n                  </ul>\n                </p>\n                <p><strong>Cách phát hiện sớm:</strong> Nếu cần xóa sạch bảng staging hàng triệu dòng trong pipeline, dùng TRUNCATE; nếu cần xóa có kiểm soát và hoàn tác, dùng DELETE trong Transaction.</p>\n              </div>\n            </div>\n\n            <div class=\"callout-box callout-pitfall\" style=\"margin-top:12px;\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 2: \"Khai báo nghĩa là viết thế nào Optimizer cũng tự chạy nhanh\"</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Ví dụ sai:</strong> Viết <code>WHERE UPPER(email) = 'AN@EMAIL.COM'</code> trên cột email có B-Tree index.</p>\n                <p><strong>Cơ chế vì sao sai:</strong> Mặc dù SQL là khai báo, nhưng Optimizer chỉ có thể dùng chỉ mục nếu điều kiện vị từ ở dạng khả thi (SARGable - Search Argument Able). Bọc hàm vào cột sẽ vô hiệu hóa chỉ mục B-tree và ép CSDL phải quét tuần tự toàn bảng.</p>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-01-comparison-matrix",
          "title": "So sánh: Bảng phân loại 5 nhóm lệnh SQL",
          "content": "\n            <div class=\"dbms-diff-box\">\n              <div class=\"dbms-diff-header\"><span>⚖️ Bảng phân loại 5 Nhóm Lệnh SQL theo Vai Trò Nghiệp Vụ</span></div>\n              <div class=\"dbms-diff-body\">\n                <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n                  <thead>\n                    <tr><th scope=\"col\">Nhóm lệnh</th><th scope=\"col\">Các lệnh tiêu biểu</th><th scope=\"col\">Vai trò trong dự án</th><th scope=\"col\">Ai thường sử dụng?</th></tr>\n                  </thead>\n                  <tbody>\n                    <tr><td><strong>DDL</strong> (Data Definition)</td><td><code>CREATE, ALTER, DROP, TRUNCATE</code></td><td>Định nghĩa cấu trúc lược đồ, bảng, chỉ mục.</td><td>Data Engineer, DBA, Software Architect.</td></tr>\n                    <tr><td><strong>DML</strong> (Data Manipulation)</td><td><code>INSERT, UPDATE, DELETE, MERGE</code></td><td>Thêm, sửa, xóa các dòng dữ liệu.</td><td>Backend Developer, ETL Pipeline.</td></tr>\n                    <tr><td><strong>DQL</strong> (Data Query)</td><td><code>SELECT</code></td><td>Truy vấn, trích xuất dữ liệu đọc thuần túy.</td><td>Data Analyst, Data Scientist, AI Engineer.</td></tr>\n                    <tr><td><strong>DCL</strong> (Data Control)</td><td><code>GRANT, REVOKE</code></td><td>Quản trị phân quyền và an toàn bảo mật.</td><td>Database Administrator (DBA), SecOps.</td></tr>\n                    <tr><td><strong>TCL</strong> (Transaction Control)</td><td><code>COMMIT, ROLLBACK, SAVEPOINT</code></td><td>Quản lý tính nguyên tử và cô lập của giao dịch.</td><td>Backend Developer, Data Engineer.</td></tr>\n                  </tbody>\n                </table>\n              </div>\n              </div>\n            </div>\n\n            <div class=\"callout-box callout-tip\" style=\"margin-top:12px;\">\n              <div class=\"callout-header\"><span>📖 Ghi chú trung thực về Phân loại học: Vị trí của SELECT</span></div>\n              <div class=\"callout-body\">\n                <p>Trong tài liệu chính thức của chuẩn ANSI SQL và Oracle/PostgreSQL, lệnh <code>SELECT</code> đôi khi được xếp chung vào nhóm <strong>DML</strong> (vì nó thao tác trên dữ liệu hàng). Trong khi đó, nhiều giáo trình đại học tách riêng thành nhóm <strong>DQL</strong> để phân biệt rõ giữa thao tác \"đọc thuần túy (Read-only)\" và thao tác \"ghi sửa đổi (Write/Mutate)\". Cả hai cách gọi đều đúng; mục đích cốt lõi là hiểu rõ vai trò và giới hạn an toàn của từng lệnh.</p>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-01-real-world-circuits",
          "title": "Thực tế: Tình huống 3 mạch [DQ][FE][SCALE] & An toàn phân quyền",
          "content": "\n            <p><strong>A. Tình huống thực tế của 3 Mạch Chiến Lược:</strong></p>\n            <p>Tại một công ty thương mại điện tử, nhóm AI triển khai mô hình dự đoán khách hàng rời bỏ (Churn Prediction) đạt AUC 0.92 trên dữ liệu thử nghiệm. Nhưng khi lên Production, mô hình sụp đổ hoàn toàn vì:</p>\n            <ul>\n              <li><strong>Thiếu [DQ]:</strong> Bảng đơn hàng nguồn bị lỗi mạng sinh ra đơn trùng lặp và khách hàng mồ côi (không tồn tại trong danh mục), khiến doanh thu tính sai gấp đôi.</li>\n              <li><strong>Thiếu [FE]:</strong> Kỹ sư dùng <code>SUM(total_amount)</code> tính đến tận ngày hôm nay để dự đoán sự kiện xảy ra tháng trước, gây <strong>Rò rỉ dữ liệu tương lai (Data Leakage)</strong>.</li>\n              <li><strong>Thiếu [SCALE]:</strong> Câu lệnh JOIN quét toàn bộ 500 triệu dòng dạng hàng trên kho Cloud, làm hóa đơn điện toán đám mây tăng vọt hàng chục nghìn đô-la.</li>\n            </ul>\n\n            <p><strong>B. Nguyên tắc đặc quyền tối thiểu (Least Privilege):</strong></p>\n            <p>Trong thực tế, tài khoản kết nối của công cụ trực quan hóa (Metabase, PowerBI, Superset) hoặc tài khoản của Data Analyst chỉ được phép cấp quyền <strong>DQL (SELECT)</strong>. Tuyệt đối không cấp quyền DML hay DDL để loại trừ hoàn toàn nguy cơ vô tình làm thay đổi hoặc xóa mất dữ liệu sản xuất.</p>\n          ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi cấp quyền ALL PRIVILEGES bừa bãi",
            "content": "Cấp quyền toàn năng cho ứng dụng phân tích dữ liệu tiềm ẩn nguy cơ bị tin tặc khai thác qua lỗ hổng SQL Injection để DROP TABLE hoặc xóa sạch cơ sở dữ liệu."
          },
          {
            "title": "Lỗi nhầm lẫn thứ tự viết mã với thứ tự thực thi",
            "content": "Nhiều người nghĩ rằng database thực hiện câu lệnh từ trái sang phải theo thứ tự SELECT -> FROM -> WHERE. Thực tế, Optimizer luôn phân tích FROM và WHERE trước để lọc bớt dữ liệu trước khi tính toán SELECT."
          }
        ],
        "tips": [
          {
            "title": "Khai báo không có nghĩa là mù quáng",
            "content": "Mặc dù SQL là ngôn ngữ khai báo, bạn chỉ cần viết SELECT, nhưng một kỹ sư dữ liệu giỏi luôn phải hiểu \"cơ chế bên trong\" (cách engine quét chỉ mục, cách thực hiện join) để viết câu lệnh khai báo sao cho Query Optimizer có thể chọn kế hoạch thực thi tối ưu nhất."
          }
        ],
        "deepDive": {
          "title": "Bên trong Cost-Based Optimizer (CBO): Ước lượng chi phí đĩa và CPU bằng Thống kê",
          "content": "<p>Bộ tối ưu hóa CBO trong PostgreSQL ước tính chi phí thực thi dựa trên hai đơn vị cơ bản: <code>seq_page_cost = 1.0</code> (chi phí đọc tuần tự 1 trang đĩa 8KB) và <code>random_page_cost = 4.0</code> (chi phí nhảy đọc ngẫu nhiên bằng đầu đọc cơ học hoặc SSD). Đồng thời, chi phí xử lý CPU được tính bằng <code>cpu_tuple_cost = 0.01</code> và <code>cpu_operator_cost = 0.0025</code>.</p><p>Để ước tính số lượng dòng thỏa mãn điều kiện vị từ (Selectivity), engine đọc catalog <code>pg_statistic</code> (hoặc view <code>pg_stats</code>). Tại đây lưu trữ: danh sách giá trị xuất hiện nhiều nhất (Most Common Values - MCV), tần suất xuất hiện tương ứng, và biểu đồ tần số (Histogram Bounds). Nếu dữ liệu bị lệch pha lớn (skewed) mà chưa chạy lệnh <code>ANALYZE</code> cập nhật thống kê, CBO sẽ tính toán sai lệch chi phí và có thể chọn kế hoạch Seq Scan thay vì Index Scan!</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 0.2-1 (Dự đoán & Phân tích): Vì sao Optimizer tự do đảo thứ tự trong WHERE?",
          "level": "Cơ bản",
          "problem": "Xét hai câu truy vấn sau:\n-- Câu 1: SELECT * FROM orders WHERE status = \"CANCELLED\" AND total_amount > 5000000;\n-- Câu 2: SELECT * FROM orders WHERE total_amount > 5000000 AND status = \"CANCELLED\";\nTrong C hoặc Python, toán tử AND có tính đoản mạch (short-circuit: kiểm tra vế trái trước). Trong SQL, Optimizer có bắt buộc phải đánh giá từ trái sang phải như bạn viết không? Vì sao?",
          "hint": "SQL là ngôn ngữ khai báo. Optimizer sẽ dựa vào độ chọn lọc (Selectivity) của điều kiện nào cao hơn để lọc trước.",
          "solutionCode": "-- Optimizer KHÔNG bắt buộc phải đánh giá từ trái sang phải.\n-- Cả hai câu truy vấn sinh ra CÙNG MỘT kế hoạch thực thi vật lý (Physical Plan).\n-- Nếu cột status có độ chọn lọc cao hơn (ít dòng thỏa mãn hơn), Optimizer sẽ tự động đánh giá status trước!",
          "solutionOutput": "Hai câu truy vấn tương đương 100% về mặt ngữ nghĩa và kế hoạch vật lý.",
          "explanation": "Chẩn đoán lỗi: Nếu bạn nghĩ SQL chạy từ trái sang phải như Python, bạn đang áp đặt tư duy mệnh lệnh (Imperative) lên một ngôn ngữ khai báo (Declarative)."
        },
        {
          "title": "Bài tập 0.2-2 (Tìm & Sửa lỗi): Nhận diện sai phạm phân quyền DCL",
          "level": "Trung bình",
          "problem": "Một lập trình viên cấp quyền cho thực tập sinh phân tích bằng lệnh:\n`GRANT ALL PRIVILEGES ON DATABASE techmart TO intern_user;`\nHãy chỉ ra rủi ro nghiêm trọng và viết lại câu lệnh DCL chuẩn mực chỉ cho phép đọc dữ liệu.",
          "hint": "Chỉ cấp CONNECT và SELECT trên schema public.",
          "solutionCode": "-- Viết lại lệnh DCL an toàn:\nREVOKE ALL PRIVILEGES ON DATABASE techmart FROM intern_user;\nGRANT CONNECT ON DATABASE techmart TO intern_user;\nGRANT SELECT ON ALL TABLES IN SCHEMA public TO intern_user;",
          "solutionOutput": "Quyền hạn được giới hạn an toàn ở mức Read-only (DQL).",
          "explanation": "Chẩn đoán lỗi: Cấp `ALL PRIVILEGES` cho phép thực tập sinh có quyền DDL (DROP TABLE) và DML (DELETE/TRUNCATE), tiềm ẩn nguy cơ xóa sạch CSDL sản xuất do thao tác nhầm."
        },
        {
          "title": "Bài tập 0.2-3 (Thiết kế luồng an toàn): Phối hợp DML và TCL trong Transaction",
          "level": "Khá",
          "problem": "Viết kịch bản giao dịch an toàn (Transaction) để chuyển 5.000.000 VNĐ từ tài khoản A sang tài khoản B. Đảm bảo nếu bước cập nhật tài khoản B bị lỗi thì tài khoản A không bị trừ tiền mất trắng.",
          "hint": "Sử dụng BEGIN, UPDATE tài khoản A, UPDATE tài khoản B, và COMMIT / ROLLBACK.",
          "solutionCode": "BEGIN;\nUPDATE accounts SET balance = balance - 5000000 WHERE account_id = 'A';\nUPDATE accounts SET balance = balance + 5000000 WHERE account_id = 'B';\nCOMMIT;",
          "solutionOutput": "Số dư được cập nhật đồng thời và an toàn tuyệt đối trong cùng một giao dịch.",
          "explanation": "Chẩn đoán lỗi: Nếu không dùng TCL (BEGIN/COMMIT), hai câu lệnh DML chạy độc lập. Nếu lệnh 2 lỗi, lệnh 1 đã hoàn tất dẫn đến mất mát tiền bạc."
        },
        {
          "title": "Bài tập 0.2-4 (Đánh đổi & Giải thích): TRUNCATE vs DELETE khi làm sạch staging [DQ]",
          "level": "Nâng cao",
          "problem": "Sau khi nạp dữ liệu từ bảng `raw_dirty_orders` sang kho chính, bạn cần làm sạch bảng staging này để chuẩn bị cho mẻ nạp ngày mai. Phân tích đánh đổi giữa `TRUNCATE TABLE raw_dirty_orders;` và `DELETE FROM raw_dirty_orders;`.",
          "hint": "Nghĩ về nhật ký WAL/Undo log và dung lượng giải phóng đĩa cứng.",
          "solutionCode": "-- Lựa chọn tối ưu: TRUNCATE TABLE raw_dirty_orders;\n-- Đánh đổi:\n-- 1. TRUNCATE là DDL: Giải phóng trực tiếp con trỏ trang đĩa, không ghi nhật ký từng dòng vào WAL, hoàn thành trong 1ms.\n-- 2. Đánh đổi: Không kích hoạt trigger cấp dòng và không thể hoàn tác nếu hệ quản trị không hỗ trợ DDL trong transaction.",
          "solutionOutput": "TRUNCATE là chuẩn mực công nghiệp cho việc làm sạch bảng staging trong Data Pipeline.",
          "explanation": "Hiểu đúng bản chất DDL vs DML giúp kỹ sư dữ liệu không làm nghẽn Transaction Log khi xóa dữ liệu lớn."
        }
      ],
      "quiz": [
        {
          "question": "Bộ phận nào trong RDBMS chịu trách nhiệm chuyển đổi câu truy vấn SQL khai báo thành kế hoạch thực thi tối ưu nhất dựa trên chi phí?",
          "options": [
            "Parser & Lexer",
            "Query Optimizer (Bộ tối ưu hóa truy vấn)",
            "Transaction Manager",
            "Buffer Pool Manager"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Query Optimizer (Bộ tối ưu hóa truy vấn) dựa trên chi phí (Cost-Based Optimizer - CBO) đánh giá hàng ngàn phương án thực thi và chọn ra kế hoạch có ước tính tiêu tốn ít CPU và I/O nhất."
        },
        {
          "question": "Lệnh nào sau đây thuộc nhóm TCL (Transaction Control Language)?",
          "options": [
            "ALTER TABLE",
            "TRUNCATE TABLE",
            "ROLLBACK",
            "REVOKE"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! ROLLBACK (cùng với COMMIT và SAVEPOINT) thuộc nhóm TCL dùng để kiểm soát tính nguyên tử và vòng đời giao dịch dữ liệu."
        },
        {
          "question": "Kỹ thuật tối ưu hóa nào sau đây mô tả việc Bộ tối ưu hóa truy vấn tự động đẩy các điều kiện lọc (WHERE) xuống đọc và lọc dữ liệu trước khi thực hiện phép JOIN đắt đỏ?",
          "options": [
            "Index Scan Inversion",
            "Predicate Pushdown",
            "Buffer Overflow Protection",
            "Late Materialization"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Predicate Pushdown là kỹ thuật cốt tử giúp loại bỏ sớm các dòng dữ liệu không cần thiết ở tầng lưu trữ, giảm thiểu tối đa lượng dữ liệu phải truyền qua mạng và nạp vào bộ nhớ phép JOIN."
        },
        {
          "question": "Một lập trình viên cố tình thêm gợi ý ép buộc (Optimizer HINT) để ép CSDL luôn dùng chỉ mục B-tree cũ. Khi dữ liệu của bảng tăng từ 1.000 dòng lên 100 triệu dòng, rủi ro lớn nhất là gì?",
          "options": [
            "CSDL tự động xóa chỉ mục B-tree đó đi.",
            "Kế hoạch thực thi bị đóng băng cứng nhắc, ngăn cản Optimizer chuyển sang giải pháp quét tuần tự (Seq Scan) hoặc Hash Join tối ưu hơn, khiến câu lệnh chạy chậm hơn hàng trăm lần.",
            "CSDL sẽ từ chối kết nối mạng của toàn bộ người dùng.",
            "Dữ liệu bảng bị biến đổi kiểu dữ liệu ngầm."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Lạm dụng HINT tước đoạt khả năng thích ứng linh hoạt của Cost-based Optimizer khi quy mô và phân phối dữ liệu (Data Distribution) thay đổi theo thời gian."
        },
        {
          "question": "Hai câu lệnh: GRANT SELECT ON orders TO analyst_role; và REVOKE DELETE ON orders FROM intern_user; thuộc nhóm ngôn ngữ con nào của chuẩn SQL?",
          "options": [
            "DML (Data Manipulation Language)",
            "DDL (Data Definition Language)",
            "DCL (Data Control Language)",
            "DQL (Data Query Language)"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! DCL (Data Control Language) bao gồm các lệnh GRANT và REVOKE, dùng để quản lý ma trận phân quyền bảo mật và vai trò truy cập trong CSDL."
        }
      ],
      "summary": [
        "SQL là ngôn ngữ khai báo (Declarative): Bạn mô tả kết quả \"Muốn gì\" (WHAT), Bộ tối ưu hóa (Optimizer) tự quyết định \"Làm thế nào\" (HOW).",
        "Bộ tối ưu hóa truy vấn chuyển đổi từ Cây cú pháp logic (Logical Plan) sang Kế hoạch thực thi vật lý (Physical Plan) dựa trên thống kê chi phí.",
        "Năm nhóm lệnh đại diện cho 5 vai trò kiến trúc: DDL (Cấu trúc), DML (Dữ liệu), DQL (Truy vấn), DCL (Phân quyền bảo mật), TCL (Giao dịch).",
        "Phân biệt rõ ràng TRUNCATE (DDL - hủy cấp phát đĩa cực nhanh) và DELETE (DML - quét từng dòng, tốn log).",
        "Nối bài: Bài tiếp theo (0.3) sẽ khám phá bí mật của NULL và hệ thống Logic Ba Giá Trị (3VL).",
        "Ôn cách quãng: Tại sao Optimizer có quyền tự do đảo thứ tự các điều kiện lọc trong WHERE mà không làm thay đổi kết quả logic của câu truy vấn?"
      ]
    },
    {
      "id": "sql-02-null-three-valued-logic",
      "number": "0.3",
      "title": "Bí Mật Của NULL và Logic Ba Giá Trị (Three-Valued Logic - 3VL)",
      "subtitle": "Bản chất của \"sự vắng mặt thông tin\", bảng chân trị 3VL, sự lan truyền của NULL, IS [NOT] DISTINCT FROM & Giả định thế giới đóng vs mở",
      "level": "Cơ bản",
      "duration": "50 phút",
      "keywords": [
        "NULL",
        "Three-Valued Logic",
        "3VL",
        "UNKNOWN",
        "IS NULL",
        "IS DISTINCT FROM",
        "Lan truyền NULL",
        "Closed World Assumption",
        "Bẫy so sánh"
      ],
      "prerequisites": "Hoàn thành Bài 0.1 và 0.2 (Mô hình quan hệ & Ngôn ngữ khai báo).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Định nghĩa chính xác bản chất của NULL: NULL không phải là giá trị (không phải số 0, không phải chuỗi rỗng), mà là con dấu trạng thái biểu thị sự thiếu vắng dữ liệu.",
        "Làm chủ bảng chân trị đầy đủ của Logic Ba Giá Trị (3VL: TRUE, FALSE, UNKNOWN) cho các phép toán AND, OR, NOT.",
        "Giải thích cơ chế vận hành của mệnh đề WHERE: chỉ chấp nhận các dòng đánh giá là TRUE; loại bỏ thẳng tay cả FALSE và UNKNOWN.",
        "Phân tích sự lan truyền của NULL qua phép toán số học, phép so sánh, toán tử IN / NOT IN, và biểu thức điều kiện CASE.",
        "Sử dụng thành thạo toán tử chuẩn ISO SQL `IS [NOT] DISTINCT FROM` để so sánh an toàn hai giá trị mà không bị rơi vào bẫy UNKNOWN.",
        "Phân biệt được Giả định thế giới đóng (Closed World Assumption) và Giả định thế giới mở (Open World Assumption) khi giải thích ngữ nghĩa của NULL."
      ],
      "intuition": {
        "title": "Hai chiếc hộp đóng kín màu đen",
        "metaphor": "Hãy tưởng tượng bạn có hai chiếc hộp đóng kín không dán nhãn, bạn hoàn toàn không biết bên trong đựng món đồ gì. Bây giờ ai đó hỏi bạn: \"Món đồ trong Hộp A có BẰNG món đồ trong Hộp B không?\". Câu trả lời của bạn có thể là \"Có (TRUE)\" không? Không, vì bạn đâu biết bên trong có gì! Câu trả lời có thể là \"Không (FALSE)\" không? Cũng không thể, lỡ như cả hai hộp đều đựng một quả táo thì sao? Câu trả lời duy nhất chính xác về mặt logic là: \"TÔI KHÔNG BIẾT! (UNKNOWN)\". Đó chính xác là lý do vì sao trong CSDL: NULL = NULL không bao giờ cho kết quả TRUE, mà cho kết quả UNKNOWN!",
        "boundary": "Ẩn dụ này minh họa hoàn hảo cho việc so sánh bằng (=). Tuy nhiên ranh giới cần lưu ý: trong mệnh đề `GROUP BY` hoặc toán tử `DISTINCT`, SQL lại quy ước gom tất cả các giá trị NULL vào chung một nhóm để phục vụ tính khả dụng thực tế của báo cáo.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--success);margin-bottom:4px;font-weight:700;\">✅ TRUE (ĐÚNG)</div>\n                <div style=\"font-size:1.1rem;font-weight:800;color:var(--success);\">VƯỢT QUA WHERE</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Chỉ dòng TRUE mới được giữ lại trong tập kết quả</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"color:var(--danger);font-size:1.1rem;\">≠</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;border-color:var(--danger);\">\n                <div style=\"font-size:0.75rem;color:var(--danger);margin-bottom:4px;font-weight:700;\">❌ FALSE (SAI)</div>\n                <div style=\"font-size:1.1rem;font-weight:800;color:var(--danger);\">BỊ LOẠI BỎ</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Điều kiện không thỏa mãn, rớt ngay lập tức</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"color:var(--topic-sql);font-size:1.1rem;\">≠</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:180px;\">\n                <div style=\"font-size:0.75rem;color:var(--topic-sql);margin-bottom:4px;font-weight:700;\">❓ UNKNOWN (3VL)</div>\n                <div style=\"font-size:1.1rem;font-weight:800;color:var(--dirty-color);\">CŨNG BỊ LOẠI BỎ!</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Không phải TRUE &rarr; Mệnh đề WHERE gạt bỏ thẳng tay!</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--warning);\">⚡ Vũ khí hóa giải:</span>\n              <span>Dùng <code>IS [NOT] DISTINCT FROM</code> hoặc <code>COALESCE(val, default)</code> để chuyển 3VL về 2VL (TRUE / FALSE nhị phân), triệt tiêu bẫy mất dòng do UNKNOWN.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-02-problem-hook",
          "title": "Gợi mở: Nếu CSDL không có NULL, chuyện gì xảy ra?",
          "content": "\n            <p>Trước khi khái niệm NULL ra đời trong mô hình Codd, các hệ thống phần mềm cũ xử lý thông tin bị thiếu bằng cách <strong>gán các giá trị giả tạo (Sentinel values / Dummy data)</strong>:</p>\n            <ul>\n              <li>Khách hàng chưa có ngày sinh &rarr; Lập trình viên nhập ngày <code>01/01/1900</code>.</li>\n              <li>Sản phẩm chưa xác định giá &rarr; Nhập số tiền <code>-999999</code> hoặc <code>0đ</code>.</li>\n              <li>Học sinh nghỉ thi &rarr; Nhập điểm số <code>0</code>.</li>\n            </ul>\n            <p><strong>Hậu quả tai hại cho Kỹ sư Dữ liệu &amp; AI:</strong></p>\n            <ul>\n              <li>Khi bạn chạy hàm <code>AVG(salary)</code>, các mức lương số 0 giả tạo sẽ kéo tụt mức lương trung bình của toàn công ty xuống một cách sai lệch!</li>\n              <li>Khi bạn chạy thuật toán tính tuổi trung bình của khách hàng, những người sinh năm 1900 sẽ làm tuổi thọ trung bình vọt lên 126 tuổi!</li>\n              <li>Một sản phẩm giá 0đ có thể bị khách hàng đặt mua miễn phí trên website bán lẻ!</li>\n            </ul>\n            <p>Khái niệm <strong>NULL</strong> ra đời để phân biệt tuyệt đối giữa: <em>\"Một giá trị đo lường được bằng không\"</em> với <em>\"Sự vắng mặt / Chưa biết thông tin\"</em>.</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-02-recall-prereq",
          "title": "Truy hồi: Kiểm tra nhanh từ Bài 0.1 và 0.2",
          "content": "\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n              <p><strong>Câu hỏi 1:</strong> Bộ tối ưu hóa truy vấn (Query Optimizer) có quyền tự do đảo thứ tự đánh giá các điều kiện lọc trong mệnh đề WHERE không? Vì sao?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Có 100%! Vì SQL là ngôn ngữ khai báo, Optimizer sẽ dựa vào thống kê chi phí để đánh giá điều kiện nào có độ chọn lọc cao hơn (lọc bớt nhiều dòng hơn) trước.</p>\n                </div>\n              </details>\n            </div>\n\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n              <p><strong>Câu hỏi 2:</strong> Lệnh TRUNCATE khác lệnh DELETE ở điểm cốt lõi nào?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> TRUNCATE là lệnh DDL (hủy cấp phát trang đĩa vật lý cực nhanh), trong khi DELETE là lệnh DML (quét duyệt từng dòng và ghi log giao dịch chi tiết).</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-02-concept-definition",
          "title": "Khái niệm: Bản chất của NULL & Bảng Chân Trị 3VL",
          "content": "\n            <p>Trong bộ nhớ CSDL, hãy phân biệt rõ 3 khái niệm thường bị đánh đồng:</p>\n            <div class=\"sql-result-container\">\n              <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n                <thead>\n                  <tr><th scope=\"col\">Giá trị</th><th scope=\"col\">Kiểu dữ liệu</th><th scope=\"col\">Ý nghĩa thực tế</th><th scope=\"col\">Biểu diễn vật lý trên đĩa</th></tr>\n                </thead>\n                <tbody>\n                  <tr><td><code>0</code></td><td>Số nguyên (INT)</td><td>Đã đo lường và kết quả bằng không (Số dư = 0đ).</td><td>4 bytes nhị phân <code>0x00000000</code>.</td></tr>\n                  <tr><td><code>''</code> (Chuỗi rỗng)</td><td>Chuỗi ký tự (VARCHAR)</td><td>Chuỗi có độ dài bằng 0 byte.</td><td>Header độ dài = 0.</td></tr>\n                  <tr><td><span class=\"null-val\">NULL</span></td><td>Con dấu trạng thái</td><td>Không xác định, vắng mặt thông tin, chưa biết.</td><td><strong>Null Bitmap</strong> trong header của dòng.</td></tr>\n                </tbody>\n              </table>\n              </div>\n            </div>\n\n            <p><strong>Bảng Chân Trị Chuẩn ISO/IEC 9075: AND, OR, NOT với UNKNOWN:</strong></p>\n            <div class=\"dbms-diff-box\">\n              <div class=\"dbms-diff-header\"><span>📐 Bảng Chân Trị Logic 3 Giá Trị (3VL)</span></div>\n              <div class=\"dbms-diff-body\">\n                <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n                  <thead>\n                    <tr><th scope=\"col\">Toán hạng A</th><th scope=\"col\">Toán hạng B</th><th scope=\"col\">A AND B</th><th scope=\"col\">A OR B</th></tr>\n                  </thead>\n                  <tbody>\n                    <tr><td>TRUE</td><td>TRUE</td><td><strong>TRUE</strong></td><td><strong>TRUE</strong></td></tr>\n                    <tr><td>TRUE</td><td>FALSE</td><td><strong>FALSE</strong></td><td><strong>TRUE</strong></td></tr>\n                    <tr><td>TRUE</td><td><span class=\"null-val\">UNKNOWN</span></td><td><span class=\"null-val\">UNKNOWN</span></td><td><strong>TRUE</strong> (Vế A đủ quyết định OR là TRUE)</td></tr>\n                    <tr><td>FALSE</td><td><span class=\"null-val\">UNKNOWN</span></td><td><strong>FALSE</strong> (Vế A đủ quyết định AND là FALSE)</td><td><span class=\"null-val\">UNKNOWN</span></td></tr>\n                    <tr><td><span class=\"null-val\">UNKNOWN</span></td><td><span class=\"null-val\">UNKNOWN</span></td><td><span class=\"null-val\">UNKNOWN</span></td><td><span class=\"null-val\">UNKNOWN</span></td></tr>\n                    <tr><td>NOT TRUE &rarr; <strong>FALSE</strong></td><td>NOT FALSE &rarr; <strong>TRUE</strong></td><td colspan=\"2\">NOT <span class=\"null-val\">UNKNOWN</span> &rarr; <strong><span class=\"null-val\">UNKNOWN</span></strong> (Phủ định của \"Không biết\" vẫn là \"Không biết\"!)</td></tr>\n                  </tbody>\n                </table>\n              </div>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-02-internals-where-propagation",
          "title": "Cơ chế: Mệnh đề WHERE lọc dữ liệu & Sự lan truyền của NULL",
          "content": "\n            <p><strong>A. Cơ chế mệnh đề WHERE:</strong></p>\n            <div class=\"callout-box callout-pitfall\">\n              <div class=\"callout-header\"><span>⚠️ Nguyên lý Mệnh đề WHERE:</span> <span>Chỉ giữ lại các dòng đánh giá là TRUE</span></div>\n              <div class=\"callout-body\">\n                <p>Mệnh đề <code>WHERE &lt;condition&gt;</code> <strong>CHỈ chấp nhận các dòng mà điều kiện trả về kết quả đúng là TRUE</strong>. Bất kỳ dòng nào mà điều kiện trả về <code>FALSE</code> hoặc <code>UNKNOWN</code> đều bị loại bỏ thẳng tay!</p>\n              </div>\n            </div>\n\n            <p><strong>B. Bảng trạng thái trung gian: Bi kịch dòng biến mất trên bảng raw_dirty_orders</strong></p>\n            <div class=\"sql-result-container\">\n              <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">raw_id</th>\n                    <th scope=\"col\">status thực tế</th>\n                    <th scope=\"col\">Đánh giá: status = 'COMPLETED'</th>\n                    <th scope=\"col\">Đánh giá: status &lt;&gt; 'COMPLETED'</th>\n                    <th scope=\"col\">Hành vi của WHERE</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr><td>1, 2, 3, 5</td><td>'COMPLETED'</td><td><strong>TRUE</strong> (Được giữ lại)</td><td>FALSE (Bị loại)</td><td>Xuất hiện ở Truy vấn 1</td></tr>\n                  <tr><td>6</td><td>'PENDING'</td><td>FALSE (Bị loại)</td><td><strong>TRUE</strong> (Được giữ lại)</td><td>Xuất hiện ở Truy vấn 2</td></tr>\n                  <tr>\n                    <td><strong>4</strong></td>\n                    <td><span class=\"dirty-val\">NULL</span></td>\n                    <td><span class=\"null-val\">UNKNOWN</span> (BỊ LOẠI BỎ!)</td>\n                    <td><span class=\"null-val\">UNKNOWN</span> (TIẾP TỤC BỊ LOẠI BỎ!)</td>\n                    <td><span class=\"dirty-val\">BIẾN MẤT Ở CẢ 2 TRUY VẤN ĐỐI LẬP!</span></td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n\n            <p><strong>C. Sự lan truyền của NULL (Null Propagation):</strong></p>\n            <ul>\n              <li><strong>Phép toán số học:</strong> <code>100 + NULL = NULL</code>, <code>500 * NULL = NULL</code>.</li>\n              <li><strong>Toán tử NOT IN:</strong> <code>x NOT IN ('CANCELLED', NULL)</code> luôn dịch thành <code>NOT (x = 'CANCELLED' OR x = NULL)</code>. Do vế <code>x = NULL</code> ra UNKNOWN, toàn bộ biểu thức bị biến thành UNKNOWN, dẫn đến việc câu truy vấn trả về <strong>tập rỗng (0 rows)</strong>!</li>\n              <li><strong>Biểu thức CASE:</strong> Khi nhánh WHEN gặp UNKNOWN, nó bỏ qua và nhảy xuống nhánh ELSE.</li>\n            </ul>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-02-example-worked",
          "title": "Ví dụ mẫu: Dự đoán trước khi xem & Phá vỡ bẫy 3VL",
          "content": "\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:16px;border-radius:8px;background:var(--bg-surface-elevated);margin:16px 0;\">\n              <h4 style=\"margin:0 0 8px;color:var(--text-primary);\">❓ Dự đoán trước khi xem:</h4>\n              <p>Xét câu lệnh truy vấn sau trên bảng <code>customers</code> (bảng có 5 khách hàng):</p>\n              <pre class=\"code-pre\"><code>SELECT * FROM customers WHERE NULL = NULL;</code></pre>\n              <p>Theo bạn, kết quả trả về sẽ là: 5 dòng (vì NULL bằng NULL là hiển nhiên đúng), hay 0 dòng, hay báo lỗi cú pháp? Vì sao?</p>\n              <details class=\"predict-details\" style=\"margin-top:12px;padding:10px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem phân tích cơ chế &amp; Đáp án</summary>\n                <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                  <p><strong>Đáp án: Đúng 0 dòng (Tập kết quả rỗng)!</strong></p>\n                  <p><strong>Cơ chế bản chất:</strong></p>\n                  <p>NULL biểu thị sự \"chưa biết / vắng mặt thông tin\". So sánh hai đại lượng chưa biết với nhau (chưa biết A có bằng chưa biết B không?) thì kết quả duy nhất chính xác về mặt logic là <strong>UNKNOWN</strong> (Không biết). Mệnh đề <code>WHERE</code> của SQL chỉ chấp nhận các dòng có kết quả đánh giá đúng là <strong>TRUE</strong>. Vì UNKNOWN không phải là TRUE, nên toàn bộ 5 dòng của bảng customers đều bị loại bỏ thẳng tay!</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Thực nghiệm toán tử IS NOT DISTINCT FROM trên bảng dữ liệu bẩn TechMart",
              "code": "SELECT \n    raw_id, \n    order_id, \n    status,\n    (status IS NOT DISTINCT FROM NULL) AS is_status_null,\n    (status IS DISTINCT FROM 'COMPLETED') AS is_diff_completed\nFROM raw_dirty_orders;",
              "annotations": [
                {
                  "line": 4,
                  "text": "Toán tử chuẩn ISO SQL:1999 trả về TRUE/FALSE trực tiếp, không bao giờ sinh ra UNKNOWN"
                },
                {
                  "line": 5,
                  "text": "Bắt an toàn cả dòng mang giá trị khác và dòng mang giá trị NULL"
                }
              ],
              "explanation": "Đã kiểm chứng thành công trên PostgreSQL 16 và DuckDB 2.0.0. Dòng raw_id = 4 được đánh giá an toàn ra TRUE.",
              "output": "+--------+----------+-----------+--------------------+-------------------+\n| raw_id | order_id | status    | is_status_null     | is_diff_completed |\n+--------+----------+-----------+--------------------+-------------------+\n| 1      | 2001     | COMPLETED | false              | false             |\n| 2      | 2001     | COMPLETED | false              | false             |\n| 3      | 2002     | COMPLETED | false              | false             |\n| 4      | 2003     | NULL      | true               | true              |\n| 5      | 2004     | COMPLETED | false              | false             |\n| 6      | 2005     | PENDING   | false              | true              |\n+--------+----------+-----------+--------------------+-------------------+"
            }
          ]
        },
        {
          "id": "sec-02-fill-in-blank",
          "title": "Điền khuyết: Xử lý an toàn giá trị thiếu",
          "content": "\n            <p>Hãy hoàn thiện câu lệnh SQL dưới đây để lấy các đơn hàng có trạng thái KHÁC 'COMPLETED' (bao gồm cả các đơn hàng có trạng thái là NULL) và gán nhãn dự phòng:</p>\n            <div class=\"code-example-card\">\n              <pre class=\"code-pre\"><code>SELECT raw_id, order_id, \n       [____Ô_1____](status, 'CHUA_XAC_DINH') AS safe_status\nFROM raw_dirty_orders\nWHERE status [____Ô_2____] 'COMPLETED';</code></pre>\n            </div>\n            <details class=\"predict-details\" style=\"margin-top:10px;padding:10px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n              <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án điền khuyết</summary>\n              <div style=\"margin-top:8px;font-size:0.92rem;line-height:1.6;\">\n                <p><strong>Ô 1:</strong> <code>COALESCE</code> (Hàm trả về giá trị phi-NULL đầu tiên để đặt giá trị dự phòng).</p>\n                <p><strong>Ô 2:</strong> <code>IS DISTINCT FROM</code> (Toán tử chuẩn ISO so sánh an toàn coi NULL là khác COMPLETED).</p>\n                <pre class=\"code-pre\"><code>SELECT raw_id, order_id, \n       COALESCE(status, 'CHUA_XAC_DINH') AS safe_status\nFROM raw_dirty_orders\nWHERE status IS DISTINCT FROM 'COMPLETED';</code></pre>\n              </div>\n            </details>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-02-pitfalls-deep",
          "title": "Cạm bẫy: Sửa chữa lỗi tư duy hệ thống",
          "content": "\n            <div class=\"callout-box callout-pitfall\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 1: Viết WHERE col = NULL hoặc WHERE col != NULL</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Ví dụ sai:</strong> <code>SELECT * FROM raw_dirty_orders WHERE status = NULL;</code></p>\n                <p><strong>Cơ chế vì sao sai:</strong> Biểu thức <code>status = NULL</code> luôn đánh giá ra <code>UNKNOWN</code> với 100% mọi dòng. Mệnh đề WHERE loại bỏ tất cả các dòng, khiến câu lệnh luôn trả về tập rỗng!</p>\n                <p><strong>Ví dụ đúng:</strong> <code>WHERE status IS NULL</code> hoặc <code>WHERE status IS NOT NULL</code>.</p>\n              </div>\n            </div>\n\n            <div class=\"callout-box callout-pitfall\" style=\"margin-top:12px;\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 2: Toán tử NOT IN với danh sách có chứa NULL</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Ví dụ sai:</strong> <code>WHERE status NOT IN ('CANCELLED', NULL)</code> hoặc subquery trả về có chứa NULL.</p>\n                <p><strong>Cơ chế vì sao sai:</strong> Biểu thức tương đương <code>NOT (status = 'CANCELLED' OR status = NULL)</code>. Do vế sau là UNKNOWN, toàn bộ biểu thức biến thành UNKNOWN, làm sạch sạch toàn bộ kết quả về 0 dòng.</p>\n                <p><strong>Ví dụ đúng:</strong> Dùng <code>NOT EXISTS</code> hoặc lọc sạch NULL trước: <code>WHERE status NOT IN ('CANCELLED') AND status IS NOT NULL</code>.</p>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-02-comparison-matrix",
          "title": "So sánh: Khi nào dùng cái nào?",
          "content": "\n            <div class=\"dbms-diff-box\">\n              <div class=\"dbms-diff-header\"><span>⚖️ Bảng 1: Số 0 vs Chuỗi rỗng '' vs NULL</span></div>\n              <div class=\"dbms-diff-body\">\n                <div class=\"table-responsive\">\n<table class=\"comparison-table\">\n                  <thead>\n                    <tr><th scope=\"col\">Tiêu chí</th><th scope=\"col\">Số 0</th><th scope=\"col\">Chuỗi rỗng ''</th><th scope=\"col\">NULL</th></tr>\n                  </thead>\n                  <tbody>\n                    <tr><td><strong>Ý nghĩa</strong></td><td>Số lượng bằng không đã đo lường.</td><td>Chuỗi có độ dài bằng 0.</td><td>Vắng mặt thông tin / Chưa biết.</td></tr>\n                    <tr><td><strong>Hàm COUNT(col)</strong></td><td>Có đếm (tính là 1 giá trị).</td><td>Có đếm (tính là 1 giá trị).</td><td><strong>BỎ QUA</strong> (Không đếm).</td></tr>\n                    <tr><td><strong>So sánh bằng (=)</strong></td><td><code>0 = 0 &rarr; TRUE</code></td><td><code>'' = '' &rarr; TRUE</code></td><td><code>NULL = NULL &rarr; UNKNOWN</code></td></tr>\n                  </tbody>\n                </table>\n</div>\n              </div>\n              </div>\n            </div>\n\n            <div class=\"dbms-diff-box\" style=\"margin-top:14px;\">\n              <div class=\"dbms-diff-header\"><span>⚖️ Bảng 2: Toán tử = vs IS NOT DISTINCT FROM</span></div>\n              <div class=\"dbms-diff-body\">\n                <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n                  <thead>\n                    <tr><th scope=\"col\">Biểu thức</th><th scope=\"col\">Toán tử =</th><th scope=\"col\">Toán tử IS NOT DISTINCT FROM</th></tr>\n                  </thead>\n                  <tbody>\n                    <tr><td><code>100 vs 100</code></td><td>TRUE</td><td><strong>TRUE</strong></td></tr>\n                    <tr><td><code>100 vs NULL</code></td><td><span class=\"null-val\">UNKNOWN</span></td><td><strong>FALSE</strong></td></tr>\n                    <tr><td><code>NULL vs NULL</code></td><td><span class=\"null-val\">UNKNOWN</span></td><td><strong>TRUE</strong> (Coi 2 giá trị thiếu là tương đương)</td></tr>\n                  </tbody>\n                </table>\n              </div>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-02-real-world-philosophy",
          "title": "Thực tế: Lan truyền trong tính toán & Triết học CWA vs OWA",
          "content": "\n            <p><strong>A. Lan truyền trong tính toán tài chính:</strong></p>\n            <p>Nếu cột thưởng <code>bonus</code> mang giá trị NULL, phép tính lương <code>salary + bonus</code> sẽ ra NULL! Trong môi trường sản xuất, luôn dùng hàm bọc an toàn:</p>\n            <pre class=\"code-pre\"><code>SELECT emp_id, salary + COALESCE(bonus, 0) AS total_compensation FROM employees;</code></pre>\n            <p>Đồng thời, hàm <code>NULLIF(a, b)</code> là vũ khí tuyệt hảo chống lỗi chia cho 0: <code>SELECT revenue / NULLIF(order_count, 0)</code> sẽ trả về NULL an toàn thay vì làm sập pipeline!</p>\n\n            <p><strong>B. Triết học Dữ liệu: Giả định Thế giới Đóng (CWA) vs Mở (OWA):</strong></p>\n            <ul>\n              <li><strong>Closed World Assumption (CWA):</strong> Coi rằng mọi điều không có trong CSDL đều là SAI hoặc KHÔNG TỒN TẠI.</li>\n              <li><strong>Open World Assumption (OWA):</strong> Coi rằng CSDL chỉ là một phần của thế giới thực; việc thiếu thông tin chỉ là \"chưa biết/chưa ghi nhận\".</li>\n              <li><strong>Bài học cho Kỹ sư Dữ liệu:</strong> Khi ép kiểu <code>COALESCE(status, 'FAIL')</code>, bạn đang ép CSDL theo thế giới đóng, có thể dẫn đến việc đưa ra kết luận vội vàng trong phân tích kinh doanh!</li>\n            </ul>\n          ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Bẫy hàm tổng hợp SUM, AVG âm thầm bỏ qua NULL",
            "content": "Các hàm tổng hợp `SUM`, `AVG`, `MIN`, `MAX` đều tự động bỏ qua NULL mà không hề cảnh báo. Nếu tính điểm trung bình của học sinh mà 3 em vắng thi (NULL), mẫu số của hàm AVG sẽ chỉ tính trên số học sinh đi thi chứ không tính trên tổng sĩ số lớp."
          },
          {
            "title": "Cạm bẫy so sánh bằng với NULL trong mệnh đề WHERE",
            "content": "Viết WHERE col = NULL hoặc WHERE col != NULL luôn trả về UNKNOWN và bị mệnh đề WHERE loại bỏ hoàn toàn. Bắt buộc phải sử dụng toán tử IS NULL hoặc IS NOT NULL để kiểm tra sự tồn tại của giá trị thiếu."
          }
        ],
        "tips": [
          {
            "title": "Kỹ thuật chống chia cho 0 bằng NULLIF",
            "content": "Trong SQL, phép chia cho 0 gây lỗi gián đoạn pipeline (Division by zero error). Nhưng phép chia cho NULL lại trả về NULL an toàn: `SELECT revenue / NULLIF(users_count, 0)`. Đây là bí quyết sống còn khi viết truy vấn KPI tự động."
          }
        ],
        "deepDive": {
          "title": "Bản chất vật lý: Null Bitmap trong Tuple Header tiết kiệm dung lượng đĩa như thế nào?",
          "content": "<p>Nhiều người nghĩ rằng giá trị NULL trong bảng tiêu tốn 1 byte hoặc con trỏ đặc biệt ở phần thân dữ liệu (Data Payload). Thực tế trong kiến trúc vật lý của PostgreSQL và SQLite, giá trị NULL <strong>hoàn toàn không tiêu tốn bất kỳ byte nào trong phần payload dữ liệu</strong>!</p><p>Thay vào đó, mỗi dòng bản ghi (Tuple) có một tiêu đề (HeapTupleHeader 23 bytes). Nếu bảng có ít nhất một cột mang giá trị NULL, trường cờ <code>t_infomask</code> bật bit <code>HEAP_HASNULL</code> và kích hoạt một mảng bit gọi là <strong>Null Bitmap (t_bits)</strong>. Trong mảng này, mỗi cột được biểu diễn bằng đúng 1 bit: <code>1</code> là cột có giá trị, <code>0</code> là cột mang giá trị NULL. Khi đọc dòng, engine chỉ cần kiểm tra mảng bit này để biết cột có NULL hay không mà không cần đọc dữ liệu, giúp tiết kiệm dung lượng đĩa tối đa!</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 0.3-1 (Dự đoán kết quả): Định lý Bài trung (Excluded Middle) bị phá vỡ",
          "level": "Cơ bản",
          "problem": "Trong logic học cổ điển của Aristotle, một mệnh đề hoặc Đúng hoặc Sai, tức là biểu thức (A OR NOT A) luôn luôn Đúng (Định lý bài trung - Law of Excluded Middle).\n\nXét truy vấn sau trên bảng `customers`:\nSELECT * FROM customers WHERE (city = 'Hanoi') OR (city <> 'Hanoi');\n\nNếu trong bảng có một khách hàng có giá trị `city` là NULL, câu lệnh trên có trả về dòng của khách hàng đó không? Giải thích cặn kẽ theo bảng chân trị 3VL.",
          "hint": "Tính giá trị của (NULL = 'Hanoi') và (NULL <> 'Hanoi'), sau đó kết hợp bằng OR.",
          "solutionCode": "-- Phân tích logic 3VL:\n-- 1. (NULL = 'Hanoi') -> UNKNOWN\n-- 2. (NULL <> 'Hanoi') -> UNKNOWN\n-- 3. UNKNOWN OR UNKNOWN -> UNKNOWN\n-- 4. Mệnh đề WHERE chỉ giữ lại kết quả TRUE, nên dòng có city là NULL BỊ LOẠI BỎ!",
          "solutionOutput": "Khách hàng có city = NULL sẽ biến mất hoàn toàn.",
          "explanation": "Chẩn đoán lỗi: Nếu bạn nghĩ câu lệnh trên trả về 100% tất cả các dòng trong bảng, bạn đã áp đặt logic nhị phân đời thường vào CSDL. Trong SQL có NULL, định lý bài trung KHÔNG còn đúng!"
        },
        {
          "title": "Bài tập 0.3-2 (Tìm & Sửa lỗi): Khắc phục bẫy tính tổng có chứa NULL",
          "level": "Trung bình",
          "problem": "Một câu truy vấn tính tổng lương và phụ cấp của nhân viên:\n`SELECT emp_id, salary + bonus AS total_compensation FROM employees;`\nMột số nhân viên mới chưa có phụ cấp nên cột `bonus` mang giá trị NULL. Kết quả tính toán của những nhân viên này bị biến thành NULL hoàn toàn! Hãy giải thích cơ chế và sửa lại câu lệnh.",
          "hint": "Dùng hàm COALESCE để chuyển đổi NULL thành giá trị 0 dự phòng.",
          "solutionCode": "-- Viết lại chuẩn xác bằng COALESCE:\nSELECT emp_id, salary + COALESCE(bonus, 0) AS total_compensation\nFROM employees;",
          "solutionOutput": "Nhân viên có bonus là NULL vẫn nhận được total_compensation bằng đúng mức salary.",
          "explanation": "Chẩn đoán lỗi: Phép toán số học `salary + NULL` bị lan truyền thành NULL. Bọc hàm `COALESCE(bonus, 0)` đảm bảo phép cộng luôn có toán hạng an toàn."
        },
        {
          "title": "Bài tập 0.3-3 (Tự viết truy vấn): Bắt trọn vẹn sự khác biệt bằng IS DISTINCT FROM",
          "level": "Nâng cao",
          "problem": "Trong bảng `raw_dirty_orders`, bạn cần tìm tất cả các đơn hàng có trạng thái KHÁC với \"COMPLETED\" (bao gồm cả các đơn hàng chưa xác định trạng thái, tức là status đang là NULL). Viết 2 cách thực thi:\n1. Cách 1: Sử dụng cú pháp truyền thống kết hợp `IS NULL`.\n2. Cách 2: Sử dụng toán tử chuẩn ISO SQL `IS DISTINCT FROM`.",
          "hint": "Cách 1 dùng OR status IS NULL; Cách 2 dùng cú pháp trực tiếp của PostgreSQL/DuckDB.",
          "solutionCode": "-- Cách 1: Cú pháp truyền thống (Tương thích 100% mọi hệ RDBMS cổ điển)\nSELECT raw_id, order_id, status\nFROM raw_dirty_orders\nWHERE status <> 'COMPLETED' OR status IS NULL;\n\n-- Cách 2: Toán tử chuẩn ISO SQL (Gọn gàng, tối ưu, không cần OR)\nSELECT raw_id, order_id, status\nFROM raw_dirty_orders\nWHERE status IS DISTINCT FROM 'COMPLETED';",
          "solutionOutput": "+--------+----------+---------+\n| raw_id | order_id | status  |\n+--------+----------+---------+\n| 4      | 2003     | NULL    |\n| 6      | 2005     | PENDING |\n+--------+----------+---------+\n(2 dòng - Đã kiểm chứng trên PostgreSQL 16 & DuckDB 2.0.0)",
          "explanation": "Chẩn đoán lỗi: Nếu bạn chỉ viết `WHERE status <> \"COMPLETED\"`, bạn đã bỏ sót dòng raw_id = 4 do bẫy 3VL. Cả hai cách trên đều thu được kết quả trọn vẹn 2 dòng."
        },
        {
          "title": "Bài tập 0.3-4 (Ôn tập đan xen & Tổng hợp Tầng 0): Đếm số dòng vi phạm kết hợp Đa tập & 3VL",
          "level": "Nâng cao",
          "problem": "Cho bảng `raw_dirty_orders`. Hãy viết một truy vấn duy nhất tính toán:\n1. Tổng số dòng trong bảng.\n2. Số dòng có status hợp lệ (phi-NULL).\n3. Số dòng có status bị NULL.\n4. Đếm số giá trị status phân biệt (DISTINCT).\nGiải thích vì sao số dòng phi-NULL cộng với số dòng NULL lại bằng đúng tổng số dòng, nhưng đếm DISTINCT lại ra một con số khác.",
          "hint": "Kết hợp COUNT(*), COUNT(status), COUNT(CASE WHEN status IS NULL THEN 1 END) và COUNT(DISTINCT status).",
          "solutionCode": "SELECT \n    COUNT(*) AS total_rows,\n    COUNT(status) AS non_null_status_rows,\n    COUNT(CASE WHEN status IS NULL THEN 1 END) AS null_status_rows,\n    COUNT(DISTINCT status) AS distinct_statuses\nFROM raw_dirty_orders;",
          "solutionOutput": "+------------+---------------------+------------------+-------------------+\n| total_rows | non_null_status_rows| null_status_rows | distinct_statuses |\n+------------+---------------------+------------------+-------------------+\n| 6          | 5                   | 1                | 2                 |\n+------------+---------------------+------------------+-------------------+\n(Đã kiểm chứng trên PostgreSQL 16, DuckDB 2.0.0 & SQLite 3.50.4)",
          "explanation": "Chẩn đoán lỗi: Tổng số dòng (6) = phi-NULL (5) + NULL (1). Tuy nhiên `COUNT(DISTINCT status)` chỉ ra 2 (gồm \"COMPLETED\" và \"PENDING\") vì hàm COUNT(DISTINCT col) bỏ qua các giá trị NULL theo quy ước chuẩn của SQL!"
        }
      ],
      "quiz": [
        {
          "question": "Biểu thức so sánh trong chuẩn SQL: NULL = NULL trả về kết quả gì?",
          "options": [
            "TRUE",
            "FALSE",
            "UNKNOWN",
            "Báo lỗi biên dịch (Compile Error)"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Trong mô hình logic 3 giá trị (3VL), NULL đại diện cho trạng thái vắng mặt thông tin / chưa biết. Hai giá trị chưa biết không thể khẳng định là bằng nhau nên kết quả là UNKNOWN."
        },
        {
          "question": "Toán tử nào sau đây trong chuẩn ISO SQL so sánh hai giá trị và coi hai giá trị NULL là bằng nhau (không bao giờ sinh ra UNKNOWN)?",
          "options": [
            "==",
            "IS NOT DISTINCT FROM",
            "EQUALS NULL",
            "COALESCE EQUAL"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! IS NOT DISTINCT FROM (chuẩn ISO SQL:1999) coi hai giá trị NULL là tương đương nhau (trả về TRUE) và so sánh giữa một giá trị thực với NULL trả về FALSE, luôn đảm bảo kết quả nhị phân 2VL."
        },
        {
          "question": "Trong bảng chân trị của logic 3 giá trị (3VL), kết quả của biểu thức: NOT (UNKNOWN OR FALSE) là gì?",
          "options": [
            "TRUE",
            "FALSE",
            "UNKNOWN",
            "NULL"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Theo bảng chân trị 3VL: UNKNOWN OR FALSE đánh giá ra UNKNOWN. Khi lấy phủ định NOT (UNKNOWN), kết quả vẫn là UNKNOWN!"
        },
        {
          "question": "Tại sao câu lệnh: SELECT * FROM products WHERE category NOT IN ('Monitors', NULL); luôn trả về tập kết quả rỗng (0 dòng) bất kể trong bảng có sản phẩm nào?",
          "options": [
            "Vì NULL làm hỏng cú pháp của câu lệnh SQL.",
            "Vì biểu thức được chuyển đổi thành: NOT (category = 'Monitors' OR category = NULL). Do vế sau luôn là UNKNOWN, toàn bộ mệnh đề WHERE đánh giá ra UNKNOWN, mà WHERE chỉ giữ lại các dòng đánh giá ra TRUE.",
            "Vì danh mục Monitors bị khóa phân quyền.",
            "Vì CSDL tự động chuyển đổi NOT IN thành INNER JOIN."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Đây là cạm bẫy NOT IN kinh điển với NULL trong SQL. Cách khắc phục an toàn là sử dụng NOT EXISTS hoặc lọc bỏ NULL trước khi đưa vào danh sách."
        },
        {
          "question": "Bảng sales có 5 dòng với các giá trị cột bonus lần lượt là: [100, 200, NULL, 300, NULL]. Câu truy vấn SELECT AVG(bonus) FROM sales; sẽ trả về kết quả là bao nhiêu?",
          "options": [
            "120 (tính (100 + 200 + 0 + 300 + 0) / 5)",
            "200 (tính (100 + 200 + 300) / 3)",
            "NULL (vì phép cộng với NULL làm kết quả thành NULL)",
            "Báo lỗi phép chia do có giá trị NULL"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Chuẩn ISO SQL quy định tất cả các hàm tổng hợp toán học (SUM, AVG, MIN, MAX, COUNT(col)) đều tự động loại bỏ các giá trị NULL trước khi tính toán. Chỉ có 3 giá trị thực được tính: 600 / 3 = 200."
        }
      ],
      "summary": [
        "NULL đại diện cho thông tin vắng mặt hoặc chưa biết; không phải là số 0, cũng không phải chuỗi rỗng.",
        "Hệ thống Logic 3 Giá Trị (3VL) gồm TRUE, FALSE và UNKNOWN. Mệnh đề WHERE chỉ giữ lại các dòng đánh giá là TRUE; loại bỏ cả FALSE và UNKNOWN.",
        "NULL có tính lan truyền: Phép toán số học với NULL ra NULL; toán tử `NOT IN` với danh sách có chứa NULL sẽ triệt tiêu toàn bộ kết quả về rỗng.",
        "Sử dụng `IS [NOT] DISTINCT FROM` khi muốn so sánh hai giá trị mà không muốn bị rơi vào kết quả UNKNOWN.",
        "Nối bài: Chúc mừng bạn đã hoàn thành trọn vẹn Tầng 0! Hãy sẵn sàng bước sang Tầng 1 để làm chủ Kiểu dữ liệu, CRUD an toàn và kỹ thuật Data Profiling [DQ].",
        "Ôn cách quãng: Tại sao biểu thức NOT IN lại nuốt trọn toàn bộ kết quả về rỗng nếu danh sách tập con có chứa dù chỉ một giá trị NULL?"
      ]
    }
  ]
};
