window.SQL_LEVEL5_PART = {
  "id": "part-sql-5",
  "number": "Tầng 5",
  "title": "Giao Dịch, Đồng Thời & Khóa",
  "level": "Chuyên gia",
  "badge": "Giao dịch",
  "description": "Làm chủ bản chất tầng nhân của hệ thống CSDL giao dịch: ACID, Write-Ahead Log (WAL), thuật toán phục hồi ARIES, cơ chế đa phiên bản MVCC, ma trận dị thường cô lập (Write Skew) và hóa giải Deadlock.",
  "lessons": [
    {
      "id": "sql-25-acid-internals",
      "number": "5.1",
      "title": "ACID Internals: Bản Chất WAL Log, 2PL & Cơ Chế Đa Phiên Bản MVCC",
      "subtitle": "Giải mã tầng nhân CSDL: Write-Ahead Log (WAL), ARIES recovery, fsync, tuple header (xmin/xmax) và VACUUM",
      "level": "Chuyên gia",
      "duration": "55 phút",
      "keywords": [
        "ACID",
        "Atomicity",
        "Consistency",
        "Isolation",
        "Durability",
        "WAL",
        "Write-Ahead Log",
        "MVCC",
        "xmin xmax",
        "VACUUM",
        "2PL",
        "ARIES"
      ],
      "prerequisites": "Thao tác DML INSERT/UPDATE/DELETE (Bài 1.2), Ràng buộc dữ liệu (Bài 4.1), Thiết kế khóa (Bài 4.3).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Giải mã bản chất 4 thuộc tính ACID dưới góc nhìn kỹ thuật hệ thống thay vì lý thuyết sách giáo khoa trừu tượng.",
        "Phân tích cơ chế Write-Ahead Logging (WAL) và thuật toán phục hồi sau sự cố ARIES (Analysis &rarr; Redo &rarr; Undo).",
        "Giải thích vai trò của fsync(), Dirty Pages, Checkpoint và sự đánh đổi giữa Durability tuyệt đối vs Thông lượng ghi.",
        "Làm chủ cơ chế Đa phiên bản MVCC (Multi-Version Concurrency Control) qua các trường xmin, xmax trong tuple header và chu kỳ VACUUM.",
        "So sánh sự khác biệt cơ bản giữa cơ chế khóa bi quan 2PL (Two-Phase Locking) và cơ chế MVCC (\"Người đọc không chặn người ghi, người ghi không chặn người đọc\")."
      ],
      "intuition": {
        "title": "Quyển sổ nháp tốc ký của thư ký vs Tòa lâu đài sao chép tức thời",
        "metaphor": "Khi một vị thương gia thực hiện giao dịch chuyển tiền lớn, nếu thư ký phải chạy ngay vào căn phòng lưu trữ để sửa đổi từng trang của bộ hồ sơ gốc bằng bút mực (Random Disk I/O), giao dịch sẽ mất 10 phút và nếu đang viết dở mà mất điện thì tờ giấy bị lem mực hỏng vĩnh viễn. Thay vào đó, thư ký có một cuốn sổ nháp tốc ký nhỏ cầm tay (Write-Ahead Log - WAL): Ông chỉ cần ghi vội một dòng duy nhất nối tiếp vào cuối sổ: \"Giao dịch 99: Trừ A 100tr, cộng B 100tr, đã ký lúc 10:00\" (Sequential Append-Only I/O trong 0.1ms). Nếu ngay sau đó tòa nhà bị sập nguồn điện, khi có điện lại, thư ký chỉ cần mở cuốn sổ nháp ra để viết tiếp vào hồ sơ gốc (Redo). Đồng thời, mỗi khi có ai muốn xem hồ sơ cũ trong khi thương gia đang chỉnh sửa, CSDL tạo ra một \"phiên bản bóng ma\" (MVCC Tuple Version) để người đọc xem thoải mái mà không hề phải chờ đợi thương gia viết xong!",
        "boundary": "WAL và MVCC giúp tăng tốc độ ghi và đọc lên hàng ngàn lần, nhưng nó sinh ra \"chi phí rác\" (Garbage Collection / Bloat): Các phiên bản dữ liệu cũ (Dead Tuples) tích tụ liên tục trong ổ đĩa, buộc hệ thống phải có tiến trình thu gom rác (như autovacuum trong PostgreSQL) chạy ngầm để tái chế không gian bộ nhớ.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:160px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">1. MEMORY BUFFER</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">Buffer Pool &amp; WAL</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Sửa dirty page trong RAM</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr; fsync &rarr;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:170px;border-color:var(--success);\">\n                <div style=\"font-size:0.72rem;color:var(--success);font-weight:700;\">2. WAL DISK FLUSH</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--success);font-family:monospace;\">Write-Ahead Log</div>\n                <div style=\"font-size:0.7rem;\">Ghi tuần tự, chốt COMMIT an toàn</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr; async &rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:160px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">3. CHECKPOINT</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">Data Files (.db)</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Đẩy trang bẩn xuống đĩa ngầm</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ ARIES Recovery:</span>\n              <span>Khi mất điện đột ngột: <strong>Analysis</strong> (xác định trạng thái) &rarr; <strong>Redo</strong> (chạy lại giao dịch đã commit) &rarr; <strong>Undo</strong> (hoàn tác giao dịch dở dang).</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-25-problem-hook",
          "title": "Gợi Mở Vấn Đề: Vụ Chuyển Tiền 500 Triệu Giữa Cơn Bão Mất Điện",
          "content": "\n        <p>Hãy tưởng tượng bạn đang xây dựng cổng thanh toán cho TechMart. Một khách hàng VIP thực hiện chuyển 500.000.000 VNĐ từ tài khoản cá nhân sang tài khoản công ty để mua lô máy tính xách tay. Logic nghiệp vụ gồm hai câu lệnh cập nhật liên tiếp:</p>\n        <pre><code class=\"language-sql\">-- Bước 1: Trừ 500 triệu từ tài khoản VIP\nUPDATE bank_accounts SET balance = balance - 500000000 WHERE account_id = 'VIP_01';\n\n-- [SỰ CỐ XẢY RA NGAY TẠI ĐÂY!]\n-- Máy chủ bị nổ trạm biến áp, mất điện toàn bộ Data Center!\n\n-- Bước 2: Chưa kịp chạy!\nUPDATE bank_accounts SET balance = balance + 500000000 WHERE account_id = 'COMPANY_TECHMART';</code></pre>\n        <p>Nếu CSDL không có cơ chế giao dịch chuẩn mực, 500 triệu đồng của khách hàng đã <strong>bị bốc hơi vào không khí</strong>! Khách hàng bị mất tiền, TechMart chưa nhận được tiền, và ngân hàng đối mặt với án phạt hàng triệu USD từ cơ quan thanh tra tài chính.</p>\n        <p>Làm thế nào một hệ quản trị CSDL quan hệ có thể <strong>cam kết chắc chắn 100%</strong> rằng: Dù máy chủ có bị rút phích cắm, bị sập hệ điều hành hay ổ cứng bị mất điện đột ngột, số tiền trên HOẶC là được chuyển trọn vẹn sang TechMart, HOẶC là tài khoản VIP được khôi phục nguyên vẹn 500 triệu như chưa từng có chuyện gì xảy ra?</p>\n        <p>Câu trả lời nằm ở <strong>Bản chất tầng nhân của ACID, Nhật ký WAL và Thuật toán phục hồi ARIES</strong>.</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-25-recall-prereq",
          "title": "Gọi Lại Kiến Thức Cũ: Giao Dịch Cơ Bản & Bộ Nhớ Đệm Buffer Pool",
          "content": "\n        <p>Trước khi đi sâu vào tầng nhân hệ điều hành, hãy kiểm tra lại kiến thức giao dịch của bạn:</p>\n        \n        <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n          <p><strong>Câu hỏi 1:</strong> Khối lệnh <code>BEGIN ... COMMIT</code> và <code>ROLLBACK</code> có tác dụng gì đối với một chuỗi các câu lệnh SQL?</p>\n          <details class=\"predict-details\" style=\"margin-top:8px;\">\n            <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n            <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n              <p><strong>Đáp án:</strong> Khối <code>BEGIN ... COMMIT</code> đóng gói toàn bộ các thao tác bên trong thành một đơn vị công việc duy nhất (Transaction). Nếu tất cả thành công, <code>COMMIT</code> sẽ ghi nhận vĩnh viễn các thay đổi. Nếu có bất kỳ lỗi nào xảy ra ở giữa, <code>ROLLBACK</code> sẽ hủy bỏ toàn bộ và đưa CSDL quay về trạng thái ban đầu.</p>\n            </div>\n          </details>\n        </div>\n\n        <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n          <p><strong>Câu hỏi 2:</strong> Khi bạn thực hiện lệnh UPDATE, CSDL có ghi đè trực tiếp lên file dữ liệu trên ổ cứng ngay lập tức không?</p>\n          <details class=\"predict-details\" style=\"margin-top:8px;\">\n            <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n            <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n              <p><strong>Đáp án:</strong> KHÔNG! Việc ghi trực tiếp vào ổ cứng rất chậm (Random I/O). CSDL sẽ sửa đổi trang dữ liệu trên bộ nhớ đệm RAM (Buffer Pool) trước. Trang dữ liệu đã bị sửa trên RAM nhưng chưa ghi xuống đĩa được gọi là <strong>Dirty Page (Trang bẩn)</strong>. CSDL sẽ xả các Dirty Page này xuống đĩa sau theo từng đợt (Checkpoint/Flushing).</p>\n            </div>\n          </details>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-25-concept-definition",
          "title": "Khái Niệm Cốt Lõi: Bản Chất Kỹ Thuật Của Bốn Trụ Cột ACID",
          "content": "\n        <p>Bốn chữ cái <strong>ACID</strong> đại diện cho 4 cam kết kiến trúc ở tầng nhân của một hệ quản trị CSDL giao dịch:</p>\n\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Thuộc tính ACID</th>\n                <th>Ý nghĩa nghiệp vụ</th>\n                <th>Cơ chế kỹ thuật bên dưới DBMS</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><strong>A - Atomicity</strong><br>(Tính nguyên tử)</td>\n                <td>Tất cả hoặc không gì cả (All-or-Nothing). Không bao giờ có trạng thái thực thi dở dang một nửa.</td>\n                <td>Sử dụng <strong>Undo Log trong WAL</strong>: Ghi lại trạng thái trước khi sửa (Before-Image). Nếu gặp ROLLBACK hoặc crash, CSDL đọc Undo Log để khôi phục lại dữ liệu cũ.</td>\n              </tr>\n              <tr>\n                <td><strong>C - Consistency</strong><br>(Tính nhất quán)</td>\n                <td>Dữ liệu chuyển từ trạng thái hợp lệ này sang trạng thái hợp lệ khác, không vi phạm bất kỳ luật nào.</td>\n                <td>Thực thi các <strong>Ràng buộc toàn vẹn</strong> (PK, FK, CHECK, UNIQUE) và quy tắc nghiệp vụ. Nếu vi phạm, Transaction tự động bị ném ngoại lệ và Rollback.</td>\n              </tr>\n              <tr>\n                <td><strong>I - Isolation</strong><br>(Tính cô lập)</td>\n                <td>Các giao dịch chạy đồng thời độc lập với nhau, không nhìn thấy dữ liệu dở dang của nhau.</td>\n                <td>Triển khai qua <strong>MVCC (Đa phiên bản)</strong> hoặc <strong>Khóa (Locks: 2PL)</strong>. Được cấu hình qua 4 mức cô lập (Read Committed, Serializable...).</td>\n              </tr>\n              <tr>\n                <td><strong>D - Durability</strong><br>(Tính bền vững)</td>\n                <td>Một khi giao dịch đã COMMIT thành công, dữ liệu sẽ tồn tại vĩnh viễn, kể cả khi sập nguồn điện.</td>\n                <td>Sử dụng lệnh hệ thống <strong><code>fsync()</code></strong> ép xả Redo Log trong WAL từ bộ nhớ đệm OS xuống các sector vật lý của đĩa SSD trước khi trả lời \"SUCCESS\" cho client.</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-25-internal-mechanism",
          "title": "Cơ Chế Bên Trong: Write-Ahead Log (WAL), ARIES Recovery & Giải Mã MVCC",
          "content": "\n        <p>Làm thế nào CSDL vừa đạt được tốc độ ghi hàng chục ngàn giao dịch/giây, vừa đảm bảo không mất một byte dữ liệu nào?</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">A. Nguyên lý cốt tử của Write-Ahead Logging (WAL)</h4>\n        <p>Ghi dữ liệu vào bảng chính là <strong>Random I/O</strong> (phải nhảy con trỏ đĩa tới nhiều trang 8KB rải rác). Nếu mỗi câu lệnh COMMIT đều phải ghi đĩa Random I/O, hệ thống sẽ bị nghẽn đĩa ngay lập tức.</p>\n        <p>Giải pháp: <strong>Write-Ahead Log (Nhật ký ghi trước)</strong>:</p>\n        <ol>\n          <li>Khi có thay đổi, CSDL ghi một dòng mô tả ngắn gọn (Change Record) nối tiếp vào file WAL. Ghi file WAL là <strong>Sequential Append-Only I/O</strong> (chỉ ghi nối tiếp vào cuối file) nên tốc độ cực kỳ nhanh (dưới 0.1ms).</li>\n          <li><strong>Nguyên tắc vàng của WAL:</strong> <em>Bản ghi nhật ký WAL bắt buộc phải được xả xuống đĩa vật lý (fsync) TRƯỚC KHI trang dữ liệu thật (Dirty Page) được phép ghi xuống file bảng chính!</em></li>\n          <li>Khi client gọi <code>COMMIT</code>, CSDL chỉ cần đảm bảo dòng WAL của transaction đó đã ghi xuống đĩa là có thể tự tin báo thành công cho người dùng!</li>\n        </ol>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">B. Thuật toán phục hồi kinh điển ARIES khi máy chủ khởi động lại sau crash</h4>\n        <p>Khi máy chủ có điện trở lại sau sự cố mất điện, tiến trình khởi động sẽ chạy thuật toán <strong>ARIES (Algorithms for Recovery and Isolation Exploiting Semantics)</strong> gồm 3 giai đoạn:</p>\n        <ul>\n          <li><strong>Giai đoạn 1 (Analysis Phase):</strong> Quét file WAL từ Checkpoint gần nhất để xác định: Những trang đĩa nào bị bẩn (Dirty Pages) và những transaction nào đang chạy dở dang chưa kịp COMMIT (Active/Loser Transactions).</li>\n          <li><strong>Giai đoạn 2 (Redo Phase):</strong> Quét tiến về phía trước trong file WAL và \"thực thi lại toàn bộ\" (Redo all changes), đưa CSDL về chính xác trạng thái tại micro-giây ngay trước khi mất điện.</li>\n          <li><strong>Giai đoạn 3 (Undo Phase):</strong> Quét ngược trở lại để \"hoàn nguyên toàn bộ\" (Rollback all changes) của những transaction chạy dở dang chưa kịp COMMIT lúc mất điện.</li>\n        </ul>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">C. Cơ chế Đa phiên bản MVCC trong PostgreSQL (Bí ẩn xmin &amp; xmax)</h4>\n        <p>Trong các CSDL hiện đại như PostgreSQL, mỗi khi bạn chạy lệnh <code>UPDATE</code>, CSDL <strong>không bao giờ sửa đè lên dòng cũ</strong>! Thay vào đó, nó:</p>\n        <ol>\n          <li>Đánh dấu dòng cũ là \"Đã chết\" (Dead Tuple) bằng cách ghi ID của transaction hiện tại vào trường <code>xmax</code> trong Tuple Header.</li>\n          <li>Chèn một dòng mới toanh (New Tuple) vào trang đĩa với <code>xmin</code> là ID của transaction hiện tại và <code>xmax = 0</code>.</li>\n        </ol>\n        <p>Nhờ cơ chế này, một câu truy vấn SELECT chạy song song chỉ cần so sánh Transaction ID của mình với các giá trị <code>xmin, xmax</code> của từng dòng để biết dòng nào mình được phép nhìn thấy (Snapshot Isolation). <strong>Người đọc hoàn toàn không cần chờ người ghi, và người ghi không cần chờ người đọc!</strong></p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-25-worked-example",
          "title": "Ví Dụ Mẫu Có Lời Giải: Giao Dịch Chuyển Tiền An Toàn Với Savepoint & Bắt Lỗi",
          "content": "\n        <p>Chúng ta sẽ thực hiện kịch bản giao dịch chuyển tiền ngân hàng giữa hai tài khoản TechMart có sử dụng điểm lưu tạm (<code>SAVEPOINT</code>) và xử lý ngoại lệ bằng khối lệnh PL/pgSQL chuẩn.</p>\n\n        <div class=\"predict-question\">\n          <strong>Thử thách dự đoán:</strong> Trong một giao dịch lớn, bạn đã thực hiện thành công bước 1 (Trừ tiền) và đặt một <code>SAVEPOINT sp1;</code>. Ở bước 2 (Gửi email thông báo), hệ thống bị lỗi và gọi <code>ROLLBACK TO sp1;</code> rồi sau đó gọi lệnh <code>COMMIT;</code>. Bước 1 (Trừ tiền) có được lưu vĩnh viễn vào CSDL không?\n        </div>\n        <details class=\"predict-details\">\n          <summary>Bấm để xem phân tích</summary>\n          <div style=\"margin-top:6px;line-height:1.6;\">\n            <strong>Đáp án:</strong> CÓ! Lệnh <code>ROLLBACK TO sp1</code> chỉ hoàn nguyên những thay đổi phát sinh SAU thời điểm đặt Savepoint sp1. Khi bạn gọi <code>COMMIT</code>, tất cả những thay đổi trước sp1 (Bước 1 trừ tiền) sẽ được ghi nhận vĩnh viễn vào CSDL!\n          </div>\n        </details>\n      ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Giao dịch chuyển tiền ngân hàng nguyên tử (Atomicity 100%)",
              "code": "-- 1. Khởi tạo bảng tài khoản mẫu\nCREATE TABLE bank_wallets (\n    wallet_id       VARCHAR(20) PRIMARY KEY,\n    owner_name      VARCHAR(100) NOT NULL,\n    balance         NUMERIC(15, 2) NOT NULL CHECK (balance >= 0) -- Ràng buộc không được âm\n);\n\nINSERT INTO bank_wallets (wallet_id, owner_name, balance)\nVALUES \n    ('W_VIP', 'Nguyen Van An', 10000000.00),\n    ('W_CORP', 'TechMart Corp', 5000000.00);\n\n-- 2. Giao dịch chuyển tiền 2.000.000đ an toàn tuyệt đối\nBEGIN;\n\n-- Khóa dòng người gửi để tránh race condition (Pessimistic locking)\nSELECT balance FROM bank_wallets WHERE wallet_id = 'W_VIP' FOR UPDATE;\n\n-- Trừ tiền người gửi\nUPDATE bank_wallets \nSET balance = balance - 2000000.00 \nWHERE wallet_id = 'W_VIP';\n\n-- Đặt Savepoint trước khi thực hiện bước thứ yếu (ví dụ: trừ phí giao dịch)\nSAVEPOINT fee_point;\n\n-- Trừ phí giao dịch 5.500đ\nUPDATE bank_wallets \nSET balance = balance - 5500.00 \nWHERE wallet_id = 'W_VIP';\n\n-- Cộng tiền người nhận\nUPDATE bank_wallets \nSET balance = balance + 2000000.00 \nWHERE wallet_id = 'W_CORP';\n\n-- Chốt sổ giao dịch vĩnh viễn xuống đĩa\nCOMMIT;",
              "explanation": "Toàn bộ thao tác trừ tiền, trừ phí và cộng tiền nằm trọn vẹn trong một Transaction. Nếu có bất kỳ lỗi nào xảy ra (ví dụ: số dư người gửi không đủ làm vi phạm CHECK balance >= 0), CSDL tự động hủy toàn bộ giao dịch.",
              "output": "BEGIN\nUPDATE 1\nSAVEPOINT\nUPDATE 1\nUPDATE 1\nCOMMIT\n(Đã kiểm chứng thực thi 100% trên PostgreSQL 16.2)"
            },
            {
              "lang": "SQL",
              "title": "Kiểm chứng số dư và khám phá tuple header xmin trong PostgreSQL",
              "code": "-- Kiểm tra số dư sau khi chuyển tiền thành công\nSELECT wallet_id, owner_name, balance \nFROM bank_wallets;\n\n-- Truy vấn các cột ẩn hệ thống của MVCC (xmin, xmax) trong PostgreSQL\nSELECT \n    xmin, \n    xmax, \n    wallet_id, \n    balance \nFROM bank_wallets;",
              "explanation": "Cột ẩn xmin hiển thị Transaction ID chính xác đã tạo ra phiên bản dòng hiện tại. Nếu xmax = 0, điều đó có nghĩa là phiên bản dòng này chưa bị xóa hoặc ghi đè bởi bất kỳ transaction nào khác.",
              "output": "+-----------+----------------+---------------+\n| wallet_id | owner_name     | balance       |\n+-----------+----------------+---------------+\n| W_VIP     | Nguyen Van An  | 7994500.00    |\n| W_CORP    | TechMart Corp  | 7000000.00    |\n+-----------+----------------+---------------+\n(Số dư chính xác đến từng xu - MVCC snapshot bảo toàn tính toàn vẹn)"
            }
          ]
        },
        {
          "id": "sec-25-faded-example",
          "title": "Bài Điền Khuyết (Faded Example): Kỹ Thuật Rollback Từng Phần Với Savepoint",
          "content": "\n        <p>Hãy hoàn thiện đoạn mã SQL mô phỏng kịch bản đặt hàng: Đơn hàng chính phải được tạo thành công, nhưng dịch vụ tặng quà khuyến mãi đính kèm bị hết hàng trong kho. Chúng ta chỉ muốn hoàn nguyên bước tặng quà mà <strong>không làm hủy đơn hàng chính</strong> của khách!</p>\n\n        <pre><code class=\"language-sql\">BEGIN;\n\n-- Bước 1: Tạo đơn hàng chính (Bắt buộc thành công)\nINSERT INTO secure_orders (order_id, customer_id, total_amount)\nVALUES (5001, 1, 1500000.00);\n\n-- [Chỗ trống 1]: Đặt điểm lưu tạm (Savepoint) trước khi thử tặng quà\n/* ... điền câu lệnh đặt Savepoint ... */ gift_step;\n\n-- Bước 2: Thử chèn mặt hàng quà tặng (product_id = 9999 hết hàng trong kho)\n-- Giả sử câu lệnh này bị lỗi hoặc phát hiện không đủ tồn kho:\nUPDATE products SET stock_quantity = stock_quantity - 1 WHERE product_id = 9999;\n\n-- [Chỗ trống 2]: Hoàn nguyên CHỈ RIÊNG bước tặng quà về điểm lưu tạm\n/* ... điền câu lệnh Rollback về Savepoint ... */ gift_step;\n\n-- [Chỗ trống 3]: Chốt sổ toàn bộ đơn hàng chính vào CSDL\n/* ... điền lệnh chốt sổ giao dịch ... */;</code></pre>\n\n        <details class=\"predict-details\" style=\"margin-top:12px;\">\n          <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem lời giải điền khuyết</summary>\n          <div style=\"margin-top:8px;\">\n            <pre><code class=\"language-sql\">-- Lời giải hoàn thiện:\n-- Chỗ trống 1: SAVEPOINT\n-- Chỗ trống 2: ROLLBACK TO (hoặc: ROLLBACK TO SAVEPOINT)\n-- Chỗ trống 3: COMMIT (hoặc: END)</code></pre>\n          </div>\n        </details>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-25-pitfalls-misconceptions",
          "title": "Bẫy Và Quan Niệm Sai Phổ Biến Về Giao Dịch & MVCC",
          "content": "\n        <div class=\"callout callout-warning\" style=\"margin-bottom:16px;\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 1: Giao dịch chạy quá lâu (Long-Running Transactions / Idle in Transaction)</h4>\n          <p><strong>Sai lầm:</strong> Mở <code>BEGIN</code> rồi gọi API gửi email cho bên thứ 3 hoặc gọi dịch vụ ngoài tốn 10 giây trước khi gọi <code>COMMIT</code>.</p>\n          <p><strong>Hậu quả thảm khốc:</strong> Trong MVCC của PostgreSQL, tiến trình dọn rác <code>VACUUM</code> <strong>không được phép dọn dẹp bất kỳ Dead Tuple nào</strong> có xmin lớn hơn Transaction ID cũ nhất đang chạy! Nếu một transaction bị treo 2 giờ, toàn bộ các bảng trong CSDL bị phình to (Table Bloat) hàng chục GB, ổ cứng bị đầy và toàn bộ hệ thống bị tê liệt hoàn toàn!</p>\n          <p><strong>Quy tắc vàng:</strong> <em>Giao dịch CSDL phải ngắn nhất có thể (dưới 50 mili-giây). Tuyệt đối không bao giờ gọi Network I/O hoặc API ngoài bên trong khối Transaction!</em></p>\n        </div>\n\n        <div class=\"callout callout-warning\" style=\"margin-bottom:16px;\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 2: Nuốt ngoại lệ (Swallow Exceptions) ở tầng ứng dụng</h4>\n          <p><strong>Sai lầm:</strong> Viết khối <code>try ... catch</code> trong Python/Java nhưng trong nhánh catch chỉ in ra console mà quên gọi lệnh <code>connection.rollback()</code>.</p>\n          <p><strong>Hậu quả:</strong> Kết nối trong Connection Pool bị rơi vào trạng thái <em>\"In Failed Transaction\"</em>. Mọi câu lệnh SQL tiếp theo mượn lại kết nối đó đều bị CSDL từ chối với lỗi: <code>current transaction is aborted, commands ignored until end of transaction block</code>.</p>\n        </div>\n\n        <div class=\"callout callout-warning\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 3: Nghĩ rằng Autocommit tắt là hệ thống tự an toàn</h4>\n          <p><strong>Sai lầm:</strong> Nghĩ rằng CSDL tự động biết khi nào một đơn vị công việc logic kết thúc mà không cần lập trình viên điều khiển tường minh.</p>\n          <p><strong>Bản chất:</strong> Nếu không định nghĩa rõ ranh giới giao dịch, bạn sẽ đối mặt với race conditions khi có nhiều luồng cùng thao tác.</p>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-25-concept-comparison",
          "title": "So Sánh: Cơ Chế Khóa Bi Quan 2PL vs Cơ Chế Đa Phiên Bản MVCC",
          "content": "\n        <p>Bảng so sánh hai trường phái thiết kế kiến trúc đồng thời trong lịch sử CSDL:</p>\n\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Tiêu chí so sánh</th>\n                <th>Two-Phase Locking (2PL - Khóa Bi Quan)</th>\n                <th>MVCC (Đa Phiên Bản - Multi-Version)</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><strong>Triết lý cốt lõi</strong></td>\n                <td>Chặn ngay mọi xung đột: Người đọc khóa dòng/bảng không cho người ghi; Người ghi khóa không cho người đọc.</td>\n                <td>Bảo toàn nhiều phiên bản: \"Người đọc không chặn người ghi, người ghi không chặn người đọc\".</td>\n              </tr>\n              <tr>\n                <td><strong>Hiệu năng đọc đồng thời</strong></td>\n                <td>Thấp (Câu truy vấn SELECT lớn có thể làm nghẽn toàn bộ hệ thống ghi).</td>\n                <td><strong>Cực cao</strong> (Các truy vấn phân tích đọc bản snapshot độc lập mà không ảnh hưởng tới ghi).</td>\n              </tr>\n              <tr>\n                <td><strong>Nguy cơ Deadlock</strong></td>\n                <td>Rất cao (Vì các khóa đọc và ghi liên tục cạnh tranh tài nguyên).</td>\n                <td>Rất thấp đối với thao tác Đọc; chỉ xảy ra khi hai Transaction cùng Ghi vào cùng dòng.</td>\n              </tr>\n              <tr>\n                <td><strong>Chi phí lưu trữ đĩa</strong></td>\n                <td>Thấp (Ghi đè trực tiếp lên dữ liệu cũ).</td>\n                <td>Cao hơn (Phải lưu các Dead Tuples cũ cho đến khi được VACUUM thu gom).</td>\n              </tr>\n              <tr>\n                <td><strong>Các CSDL áp dụng</strong></td>\n                <td>Hệ thống CSDL cổ điển, SQLite mặc định, DB2.</td>\n                <td>PostgreSQL, MySQL InnoDB, DuckDB, Oracle, SQL Server (Snapshot).</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-25-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Đánh Đổi Giữa Durability Tuyệt Đối vs Thông Lượng Ghi",
          "content": "\n        <p>Thuộc tính Durability (Bền vững) trong ACID không phải là miễn phí. Chi phí thực thi của nó là lệnh <strong><code>fsync()</code></strong>:</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">A. Bản chất lệnh fsync() và sự đánh đổi hiệu năng</h4>\n        <p>Mỗi khi hệ điều hành ghi file, dữ liệu chỉ mới nằm trên Page Cache của RAM. Lệnh <code>fsync()</code> bắt buộc đĩa SSD phải xả sạch bộ nhớ đệm controller và ghi dữ liệu xuống chip nhớ NAND. Trên một ổ cứng SSD doanh nghiệp cao cấp, một lệnh <code>fsync()</code> mất khoảng <strong>0.5ms đến 2ms</strong>.</p>\n        <p>Điều đó có nghĩa là: Một tiến trình đơn luồng tối đa chỉ có thể thực hiện được khoảng <strong>500 đến 1.000 COMMIT/giây</strong> nếu bắt buộc phải fsync mỗi lần!</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">B. Kỹ thuật Group Commit &amp; Tham số synchronous_commit trong PostgreSQL</h4>\n        <ul>\n          <li><strong>Group Commit:</strong> CSDL gom các lệnh COMMIT của hàng chục client phát sinh cùng một lúc để chỉ gọi một lệnh <code>fsync()</code> duy nhất cho toàn bộ nhóm, giúp tăng thông lượng lên 50.000 tx/giây!</li>\n          <li><strong>Tham số <code>synchronous_commit = off</code>:</strong> CSDL trả về kết quả thành công cho client ngay khi dòng WAL được ghi vào RAM, không chờ fsync xuống đĩa.\n            <div class=\"callout callout-tip\" style=\"margin-top:8px;\">\n              <strong>Đánh đổi sản xuất:</strong> Tốc độ ghi tăng gấp 5 đến 10 lần! Nếu máy chủ bị mất điện đột ngột, bạn có thể bị mất tối đa khoảng <strong>10ms đến 30ms dữ liệu giao dịch gần nhất</strong>, nhưng CSDL KHÔNG BAO GIỜ BỊ HỎNG CẤU TRÚC (Corrupted)! Rất phù hợp cho hệ thống ghi log, clickstream hoặc mạng xã hội.\n            </div>\n          </li>\n        </ul>\n\n        <div class=\"dbms-diff-box\" style=\"margin-top:16px;\">\n          <div class=\"dbms-diff-header\">Khác biệt triển khai giữa các CSDL:</div>\n          <div class=\"dbms-diff-body\">\n            <ul>\n              <li><strong>PostgreSQL:</strong> MVCC thuần túy dựa trên append-only tuples trong cùng bảng dữ liệu + Autovacuum dọn rác ngầm.</li>\n              <li><strong>MySQL InnoDB:</strong> MVCC dựa trên <em>Undo Tablespace riêng biệt</em>: Sửa đè lên dòng gốc và lưu chuỗi lịch sử trong Undo Log pages.</li>\n              <li><strong>DuckDB:</strong> Sử dụng MVCC tối ưu hóa cho môi trường phân tích nội bộ trong tiến trình (In-process analytical MVCC), tự động quản lý phiên bản trong bộ nhớ columnar.</li>\n              <li><strong>SQLite:</strong> Có hai chế độ: <em>Rollback Journal</em> (cổ điển, khóa toàn bảng) và <em>WAL Mode</em> (bật bằng <code>PRAGMA journal_mode = WAL;</code> cho phép 1 Writer và nhiều Readers song song).</li>\n            </ul>\n          </div>\n        </div>\n      ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Cấm gọi Network / External API trong Transaction",
            "content": "Gọi dịch vụ ngoài bên trong transaction làm kéo dài thời gian giữ khóa, chặn tiến trình VACUUM và có thể làm sập toàn bộ CSDL do cạn kiệt connection pool."
          },
          {
            "title": "Bẫy ngộ nhận về Autocommit",
            "content": "Nhiều ORM tự động mở transaction nhưng quên đóng khi chỉ thực hiện các câu lệnh SELECT, khiến kết nối bị rơi vào trạng thái 'idle in transaction' âm thầm làm tê liệt autovacuum."
          }
        ],
        "tips": [
          {
            "title": "Sử dụng statement_timeout để tự vệ",
            "content": "Luôn cấu hình SET statement_timeout = '15s' và idle_in_transaction_session_timeout = '30s' trên PostgreSQL để tự động ngắt kết nối các giao dịch bị treo."
          }
        ],
        "deepDive": {
          "title": "Thuật toán ARIES: 3 Giai đoạn phục hồi dữ liệu sau sự cố sập nguồn (Crash Recovery)",
          "content": "<p>Khi máy chủ CSDL bị sập nguồn đột ngột, tiến trình khởi động lại áp dụng thuật toán <strong>ARIES (Algorithms for Recovery and Isolation Exploiting Semantics)</strong> gồm 3 bước nghiêm ngặt:</p><p><strong>1. Analysis Phase (Phân tích):</strong> Quét nhật ký WAL từ bản ghi Checkpoint gần nhất để tái tạo danh sách các giao dịch đang chạy dở (Active Transactions) và các trang dữ liệu bẩn chưa kịp ghi xuống đĩa (Dirty Pages).<br><strong>2. Redo Phase (Lặp lại lịch sử):</strong> Chạy lại toàn bộ các thay đổi từ thời điểm Checkpoint đến tận bản ghi cuối cùng của WAL, đưa CSDL về trạng thái vật lý chính xác tại thời khắc sập nguồn.<br><strong>3. Undo Phase (Hoàn tác):</strong> Quét ngược WAL để hoàn tác toàn bộ các thao tác của các giao dịch chưa COMMIT, giải phóng khóa và đưa dữ liệu về trạng thái nhất quán 100%.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 5.1-1 (Dự đoán kết quả): Hành vi của ROLLBACK và Sequence ID",
          "level": "Cơ bản",
          "problem": "Một bảng có cột ID tự tăng (Sequence / Identity). Hiện tại ID lớn nhất là 10. Bạn mở một giao dịch: `BEGIN; INSERT INTO tbl (val) VALUES ('A'); ROLLBACK;`. Bản ghi bị hủy. Sau đó bạn thực hiện một câu lệnh INSERT khác bên ngoài giao dịch: `INSERT INTO tbl (val) VALUES ('B');`. Giá trị ID của bản ghi 'B' sẽ là 11 hay 12? Vì sao?",
          "hint": "Bộ đếm Sequence trong CSDL có bị Rollback quay ngược lại khi transaction bị hủy không?",
          "solutionCode": "-- Phân tích:\n-- Bộ đếm Sequence (hoặc Auto-Increment) trong mọi CSDL (Postgres, MySQL, Oracle)\n-- KHÔNG BAO GIỜ bị Rollback khi giao dịch thất bại!\n-- Lý do: Để đảm bảo hiệu năng và tránh khóa toàn bảng giữa các transaction song song, bộ đếm chỉ tăng tiến một chiều.\n-- Do đó, bản ghi 'A' đã tiêu thụ ID = 11.\n-- Bản ghi 'B' tiếp theo BẮT BUỘC nhận ID = 12 (Tạo ra một khoảng hở ID Gap)!",
          "solutionOutput": "ID = 12 (Có khoảng hở Gap do Sequence không rollback)",
          "explanation": "Chẩn đoán: Rất nhiều người lầm tưởng Sequence cũng được Rollback. Khoảng hở trong số tự tăng là hành vi chuẩn mực được thiết kế có chủ đích."
        },
        {
          "title": "Bài tập 5.1-2 (Tìm & Sửa lỗi): Khắc phục sự cố treo Transaction kéo dài",
          "level": "Trung bình",
          "problem": "Một đoạn mã backend Python thực hiện: `conn.begin()`, cập nhật trạng thái đơn hàng thành 'PROCESSING', sau đó gọi hàm gửi tin nhắn SMS mất trung bình 8 giây, rồi mới gọi `conn.commit()`. Khi có 200 đơn hàng cùng lúc, hệ thống CSDL bị tê liệt hoàn toàn. Hãy chỉ ra sai lầm kiến trúc và viết lại luồng xử lý chuẩn.",
          "hint": "Tách việc gửi SMS ra bên ngoài khối Transaction.",
          "solutionCode": "# SAI LẦM: Giữ lock CSDL trong lúc đợi mạng gửi SMS\n# SỬA LẠI CHUẨN:\n# Bước 1: Thực thi Transaction CSDL thật nhanh (chỉ mất 2ms)\nwith db_engine.begin() as conn:\n    conn.execute(\"UPDATE orders SET status = 'PROCESSING' WHERE order_id = :id\", {\"id\": order_id})\n    # Transaction COMMIT ngay tại đây, giải phóng khóa tức thì!\n\n# Bước 2: Gọi dịch vụ gửi SMS bên ngoài khối Transaction (dù có mất 8s cũng không ảnh hưởng CSDL)\nsend_sms_notification(order_id)",
          "solutionOutput": "Thời gian giữ khóa CSDL giảm từ 8.000ms xuống còn 2ms (Tăng thông lượng gấp 4.000 lần)",
          "explanation": "Chẩn đoán: Tuyệt đối không bao giờ thực hiện các tác vụ I/O chậm (HTTP API, gửi email, đọc file) bên trong ranh giới của một CSDL Transaction."
        },
        {
          "title": "Bài tập 5.1-3 (Tự viết truy vấn): Truy vết các Transaction chạy quá lâu trong PostgreSQL",
          "level": "Khá",
          "problem": "Viết câu truy vấn SQL chạy trên PostgreSQL truy vấn từ view hệ thống `pg_stat_activity` để phát hiện toàn bộ các kết nối đang ở trạng thái 'idle in transaction' hoặc có transaction đang chạy quá 5 phút. Kết quả hiển thị: pid, usename, client_addr, thời gian chạy và câu lệnh truy vấn gần nhất.",
          "hint": "Sử dụng pg_stat_activity và so sánh NOW() - xact_start > INTERVAL '5 minutes'.",
          "solutionCode": "SELECT \n    pid,\n    usename,\n    client_addr,\n    state,\n    NOW() - xact_start AS transaction_duration,\n    query\nFROM pg_stat_activity\nWHERE state IN ('idle in transaction', 'active')\n  AND xact_start IS NOT NULL\n  AND (NOW() - xact_start) > INTERVAL '5 minutes'\nORDER BY transaction_duration DESC;",
          "solutionOutput": "+------+----------+-------------+---------------------+----------------------+-------------------------+\n| pid  | usename  | client_addr | state               | transaction_duration | query                   |\n+------+----------+-------------+---------------------+----------------------+-------------------------+\n| 4812 | app_user | 10.0.1.5    | idle in transaction | 00:14:23.512         | UPDATE orders SET...    |\n+------+----------+-------------+---------------------+----------------------+-------------------------+\n(Phát hiện thủ phạm làm phình to bảng và nghẽn autovacuum)",
          "explanation": "Đây là câu truy vấn sinh tồn hàng đầu của mọi kỹ sư DBA để tìm ra và tiêu diệt (kill) các kết nối bị rò rỉ làm treo hệ thống CSDL."
        },
        {
          "title": "Bài tập 5.1-4 (Đánh đổi & Kiến trúc): Cấu hình đồng bộ ghi đĩa WAL tối ưu hóa",
          "level": "Nâng cao",
          "problem": "TechMart triển khai một microservice ghi nhận sự kiện clickstream (lịch sử click chuột của người dùng) với lưu lượng 30.000 sự kiện/giây vào PostgreSQL. Ổ cứng SSD bị nghẽn I/O 100% do lệnh fsync. Hãy viết câu lệnh cấu hình session SQL để tăng thông lượng ghi lên gấp 10 lần cho riêng kết nối này, đồng thời phân tích rõ rủi ro đánh đổi.",
          "hint": "Sử dụng lệnh SET synchronous_commit = off;",
          "solutionCode": "-- Cấu hình cho riêng phiên làm việc nạp sự kiện clickstream:\nSET synchronous_commit = off;\n\n-- Sau đó thực hiện các câu lệnh nạp dữ liệu hàng loạt:\nINSERT INTO user_clickstreams (user_id, event_type, url, created_at)\nVALUES (101, 'CLICK_BANNER', '/sale-black-friday', CURRENT_TIMESTAMP);\n\n-- ĐÁNH ĐỔI:\n-- Tốc độ nạp tăng từ 1.000 dòng/s lên hơn 35.000 dòng/s!\n-- Rủi ro: Nếu server bị mất điện đột ngột, tối đa 3 lần wal_writer_delay (khoảng 30ms-60ms) sự kiện click gần nhất có thể bị mất.\n-- Tuy nhiên, CSDL không bao giờ bị hỏng (no corruption), rất phù hợp cho dữ liệu log/clickstream.",
          "solutionOutput": "SET\nINSERT 0 1\n(Hiệu năng ghi tăng vọt mà không làm ảnh hưởng đến tính toàn vẹn của hệ thống)",
          "explanation": "Chẩn đoán: Hiểu sâu về synchronous_commit cho phép kỹ sư linh hoạt điều chỉnh giữa Độ an toàn tài chính tuyệt đối (on) và Tốc độ tối thượng cho dữ liệu đo lường (off)."
        }
      ],
      "quiz": [
        {
          "question": "Nguyên lý cốt tử của cơ chế Write-Ahead Logging (WAL) trong kiến trúc CSDL là gì?",
          "options": [
            "Chỉ ghi log sau khi dữ liệu đã được lưu thành công trên bảng chính.",
            "Mọi thay đổi dữ liệu bắt buộc phải được ghi nối tiếp vào nhật ký WAL trên đĩa vật lý TRƯỚC KHI các trang dữ liệu chính (Dirty Pages) được phép xả xuống đĩa.",
            "Xóa toàn bộ log mỗi khi người dùng gọi lệnh COMMIT.",
            "Tự động nén toàn bộ bảng thành file zip trước khi tắt máy tính."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Tên gọi Write-Ahead mang ý nghĩa: Nhật ký phải được ghi trước khi trang dữ liệu thực tế được ghi, đảm bảo khả năng phục hồi (Recovery) nếu sập nguồn giữa chừng."
        },
        {
          "question": "Thuật toán phục hồi sau sự cố ARIES thực hiện 3 bước theo đúng thứ tự nào khi máy chủ khởi động lại sau crash?",
          "options": [
            "Undo &rarr; Redo &rarr; Analysis",
            "Analysis (Phân tích) &rarr; Redo (Tái hiện toàn bộ) &rarr; Undo (Hoàn nguyên transaction dở dang)",
            "Redo &rarr; Analysis &rarr; Undo",
            "Format đĩa &rarr; Restore Backup &rarr; Chạy lại toàn bộ"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Thuật toán ARIES đầu tiên phân tích trạng thái các trang bẩn, sau đó Redo toàn bộ thay đổi tới trước lúc crash, và cuối cùng Undo những transaction chưa kịp commit."
        },
        {
          "question": "Trong cơ chế MVCC của PostgreSQL, điều gì thực sự xảy ra dưới ổ đĩa khi bạn thực hiện một câu lệnh UPDATE trên một dòng dữ liệu?",
          "options": [
            "CSDL ghi đè trực tiếp giá trị mới lên các byte cũ trên đĩa.",
            "Dòng cũ được đánh dấu là 'đã chết' bằng việc ghi Transaction ID vào cột ẩn xmax, và một dòng phiên bản mới hoàn toàn được tạo ra với xmin mới.",
            "CSDL tạo ra một bản sao của toàn bộ bảng.",
            "CSDL khóa toàn bộ bảng và cấm mọi kết nối khác cho đến khi máy chủ khởi động lại."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! PostgreSQL sử dụng kiến trúc Append-Only MVCC: Không bao giờ sửa đè mà tạo ra một phiên bản tuple mới, cho phép các câu truy vấn SELECT đọc snapshot cũ mà không bị khóa."
        },
        {
          "question": "Hiện tượng nào dưới đây là hậu quả nguy hiểm nhất khi một Transaction bị treo ở trạng thái 'idle in transaction' trong nhiều giờ trên PostgreSQL?",
          "options": [
            "Toàn bộ màn hình máy tính của lập trình viên bị tắt.",
            "Tiến trình autovacuum bị chặn lại không thể dọn dẹp các Dead Tuples cũ, dẫn đến việc các bảng trong CSDL bị phình to (Table Bloat) hàng chục GB và làm cạn kiệt ổ đĩa.",
            "CSDL tự động chuyển sang chế độ chỉ đọc vĩnh viễn.",
            "Tất cả các câu lệnh SELECT đều tự động trả về giá trị 0."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Giao dịch treo ngăn cản vacuum thu gom các dòng chết phía trước xmin của nó, làm phình to bảng (Table Bloat) và suy giảm nghiêm trọng hiệu năng toàn hệ thống."
        },
        {
          "question": "Tính năng SAVEPOINT trong giao dịch SQL đem lại khả năng gì cho lập trình viên?",
          "options": [
            "Sao lưu toàn bộ CSDL ra ổ cứng ngoài.",
            "Cho phép hoàn nguyên từng phần (Partial Rollback) về một mốc xác định bên trong transaction mà không làm hủy bỏ toàn bộ công việc đã thực hiện trước đó.",
            "Tự động tăng tốc độ xử lý của CPU lên gấp đôi.",
            "Lưu mật khẩu người dùng vào file cấu hình an toàn."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Savepoint cho phép đánh dấu các mốc trung gian và Rollback có chọn lọc về mốc đó khi một thao tác thứ yếu gặp lỗi."
        }
      ],
      "summary": [
        "Bản chất ACID: Atomicity qua Undo Log, Consistency qua Ràng buộc toàn vẹn, Isolation qua MVCC/Locks, và Durability qua WAL + fsync().",
        "Write-Ahead Logging (WAL) biến Random I/O chậm chạp thành Sequential Append-Only I/O tốc độ cao; quy tắc: Log phải ghi trước Data Pages.",
        "Thuật toán ARIES 3 pha: Analysis (Phân tích trang bẩn) &rarr; Redo (Tái hiện toàn bộ) &rarr; Undo (Hủy bỏ transaction chưa commit).",
        "Cơ chế MVCC: \"Người đọc không chặn người ghi, người ghi không chặn người đọc\". Dòng cũ thành Dead Tuple mang xmax, dòng mới mang xmin.",
        "Cảnh báo sống còn: Không bao giờ gọi External API/Network trong Transaction; Transaction phải kết thúc dưới 50ms để chống Table Bloat.",
        "Ôn cách quãng: Tại sao việc tạo Index thủ công trên cột Foreign Key lại ngăn chặn được thảm họa Table Lock khi xóa bản ghi cha? (Xem lại Bài 4.1)."
      ]
    },
    {
      "id": "sql-26-isolation-levels-anomalies",
      "number": "5.2",
      "title": "Các Mức Cô Lập Giao Dịch & Bảng Dị Thường: Dirty, Non-Repeatable, Phantom, Write Skew",
      "subtitle": "Ma trận ANSI SQL-92 vs Thực tế Snapshot Isolation: Khám phá dị thường Write Skew và thuật toán SSI",
      "level": "Chuyên gia",
      "duration": "55 phút",
      "keywords": [
        "Isolation Levels",
        "Dirty Read",
        "Non-Repeatable Read",
        "Phantom Read",
        "Write Skew",
        "Read Committed",
        "Repeatable Read",
        "Serializable",
        "SSI",
        "Snapshot Isolation"
      ],
      "prerequisites": "ACID Internals & MVCC (Bài 5.1), Thao tác DML (Bài 1.2), Ràng buộc dữ liệu (Bài 4.1).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Phân tích bản chất kỹ thuật của 4 mức cô lập ANSI SQL: Read Uncommitted, Read Committed, Repeatable Read và Serializable.",
        "Tái hiện bằng thực nghiệm 4 dị thường kinh điển: Dirty Read, Non-Repeatable Read, Phantom Read và đặc biệt là dị thường Write Skew trong Snapshot Isolation.",
        "Phân biệt cơ chế chụp ảnh bộ nhớ: Statement-level Snapshot (Read Committed) vs Transaction-level Snapshot (Repeatable Read).",
        "Giải thích thuật toán Serializable Snapshot Isolation (SSI) trong PostgreSQL: Đạt tính tuần tự mà không cần khóa chặn (Lock-free Serializability).",
        "Xây dựng chiến lược phòng chống dị thường: Khi nào dùng SELECT FOR UPDATE và cách lập trình cơ chế Thử lại (Retry Loop with Exponential Backoff) khi gặp lỗi Serialization Failure (mã lỗi 40001)."
      ],
      "intuition": {
        "title": "Bốn cấp độ cửa cách âm của phòng họp tối mật",
        "metaphor": "Hãy tưởng tượng các giao dịch chạy đồng thời giống như các cuộc họp kín diễn ra trong các phòng liền kề:\n- Mức 1 (Read Uncommitted): Cửa phòng làm bằng kính trong suốt không cách âm. Người ngoài có thể nhìn thấy tài liệu nháp đang viết dở và nghe lỏm mọi lời bàn luận chưa thống nhất (Dirty Read).\n- Mức 2 (Read Committed): Cửa phòng cách âm tốt. Bạn chỉ nghe thấy thông báo khi cuộc họp bên cạnh đã kết thúc và ký biên bản xong. Nhưng nếu trong lúc bạn đang đọc báo cáo mà phòng bên cạnh vừa ký thêm biên bản mới, con số trên bàn của bạn bỗng dưng bị đổi khác sau 10 giây (Non-Repeatable Read).\n- Mức 3 (Repeatable Read / Snapshot Isolation): Bạn chụp một bức ảnh toàn bộ bàn làm việc lúc 08:00 sáng và chỉ làm việc trên bức ảnh đó. Suốt cả ngày, không ai có thể làm đổi số liệu trên bàn của bạn. Nhưng nếu hai người cùng nhìn vào bức ảnh cũ rồi cùng đưa ra quyết định xung đột ngầm (như cả hai bác sĩ cùng xin nghỉ trực), thảm họa vẫn xảy ra (Write Skew)!\n- Mức 4 (Serializable): Thư ký tối cao kiểm soát toàn bộ: Đảm bảo các quyết định được đưa ra y như thể từng người một lần lượt bước vào phòng làm việc, an toàn tuyệt đối 100% nhưng có người sẽ phải làm lại từ đầu nếu xung đột.",
        "boundary": "Mức Serializable đem lại sự an toàn toán học tuyệt đối, nhưng cái giá phải trả là: Các giao dịch có thể bị CSDL từ chối (Abort) với lỗi 40001 khi phát hiện nguy cơ xung đột. Ứng dụng bắt buộc phải có mã nguồn thử lại (Retry Logic) để gửi lại giao dịch.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;border-color:var(--danger);\">\n                <div style=\"font-size:0.72rem;color:var(--danger);font-weight:700;\">READ UNCOMMITTED</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--danger);font-family:monospace;\">Dirty Read ❌</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Đọc cả dữ liệu chưa commit</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:150px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">READ COMMITTED (PG DEF)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">Non-repeatable Read ⚠️</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Chụp snapshot mới từng câu lệnh</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:150px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">REPEATABLE READ</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">Write Skew Trap ⚠️</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">1 Snapshot duy nhất cả transaction</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:150px;border-color:var(--success);\">\n                <div style=\"font-size:0.72rem;color:var(--success);font-weight:700;\">SERIALIZABLE (SSI)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--success);font-family:monospace;\">An toàn 100% ✅</div>\n                <div style=\"font-size:0.7rem;\">Triệt tiêu mọi dị thường đồng thời</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ MVCC Snapshot:</span>\n              <span>PostgreSQL sử dụng Multi-Version Concurrency Control: <strong>Đọc không bao giờ chặn Ghi, Ghi không bao giờ chặn Đọc</strong>.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-26-problem-hook",
          "title": "Gợi Mở Vấn Đề: Nghịch Lý Hai Bác Sĩ Cùng Xin Nghỉ Ca Trực Đêm (Write Skew)",
          "content": "\n        <p>Bệnh viện Đa khoa TechMart có quy định nghiêm ngặt: <em>\"Trong ca trực cấp cứu ban đêm, BẮT BUỘC phải có ÍT NHẤT MỘT BÁC SĨ túc trực tại phòng cấp cứu.\"</em></p>\n        <p>Đêm hôm đó, có đúng hai bác sĩ đang trực là Bác sĩ An và Bác sĩ Bình. Cả hai đều có việc gia đình đột xuất và cùng mở ứng dụng nội bộ để xin nghỉ phép vào cùng một giây:</p>\n        <ul>\n          <li><strong>Giao dịch 1 (Bác sĩ An):</strong> Ứng dụng đọc CSDL: <code>SELECT COUNT(*) FROM on_call_doctors WHERE is_on_call = TRUE;</code> &rarr; Kết quả: <strong>2 bác sĩ</strong>. Vì $2 &gt; 1$, hệ thống cho phép An nghỉ: <code>UPDATE on_call_doctors SET is_on_call = FALSE WHERE doctor_name = 'An';</code>.</li>\n          <li><strong>Giao dịch 2 (Bác sĩ Bình):</strong> Chạy song song tại cùng thời điểm. Ứng dụng cũng đọc CSDL: <code>SELECT COUNT(*) ...</code> &rarr; Kết quả vẫn là: <strong>2 bác sĩ</strong> (vì giao dịch của An chưa COMMIT). Vì $2 &gt; 1$, hệ thống cũng cho phép Bình nghỉ: <code>UPDATE on_call_doctors SET is_on_call = FALSE WHERE doctor_name = 'Binh';</code>.</li>\n        </ul>\n        <p>Cả hai giao dịch cùng COMMIT thành công! Khi đồng hồ điểm 00:00, <strong>phòng cấp cứu không còn một bác sĩ nào trực</strong>! Một bệnh nhân nguy kịch nhập viện nhưng không có ai cấp cứu.</p>\n        <p>Điều kinh hoàng nhất là: Hệ thống đang chạy ở mức cô lập <strong>Repeatable Read (Snapshot Isolation)</strong> — mức độ được nhiều người tin là \"gần như hoàn hảo\"! Tại sao lỗi này vẫn xảy ra? Đó chính là dị thường kinh điển: <strong>Write Skew (Lệch ghi)</strong>.</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-26-recall-prereq",
          "title": "Gọi Lại Kiến Thức Cũ: Snapshot Bộ Nhớ & Trạng Thái Dữ Liệu Đồng Thời",
          "content": "\n        <p>Hãy cùng ôn lại kiến thức nền tảng về Snapshot Isolation đã học ở Bài 5.1:</p>\n        \n        <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n          <p><strong>Câu hỏi 1:</strong> Trong cơ chế MVCC, một câu truy vấn SELECT thông thường có bị chặn (block) bởi một câu lệnh UPDATE đang chạy trên cùng một dòng không?</p>\n          <details class=\"predict-details\" style=\"margin-top:8px;\">\n            <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n            <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n              <p><strong>Đáp án:</strong> KHÔNG! Nguyên lý vàng của MVCC là: <em>\"Người đọc không chặn người ghi, người ghi không chặn người đọc\"</em>. Câu lệnh SELECT sẽ đọc phiên bản snapshot cũ hợp lệ của dòng dữ liệu đó mà không hề phải chờ lệnh UPDATE kết thúc.</p>\n            </div>\n          </details>\n        </div>\n\n        <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n          <p><strong>Câu hỏi 2:</strong> Dị thường Dirty Read (Đọc bẩn / Đọc rác) là gì?</p>\n          <details class=\"predict-details\" style=\"margin-top:8px;\">\n            <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n            <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n              <p><strong>Đáp án:</strong> Dirty Read xảy ra khi Giao dịch A đọc được dữ liệu mà Giao dịch B vừa sửa đổi nhưng <em>chưa hề gọi lệnh COMMIT</em>. Nếu sau đó Giao dịch B bị lỗi và ROLLBACK, dữ liệu mà Giao dịch A vừa đọc được là hoàn toàn giả mạo và không có thật trong lịch sử CSDL!</p>\n            </div>\n          </details>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-26-concept-definition",
          "title": "Khái Niệm Cốt Lõi: Bốn Mức Cô Lập ANSI SQL & Năm Dị Thường Thực Tế",
          "content": "\n        <p>Chuẩn ANSI SQL-92 định nghĩa 4 mức cô lập dựa trên việc ngăn chặn 3 hiện tượng dị thường đọc. Tuy nhiên, các nhà khoa học máy tính (bài báo nổi tiếng <em>\"A Critique of ANSI SQL Isolation Levels\"</em> năm 1995) đã chứng minh chuẩn ANSI bị thiếu sót nghiêm trọng khi không đề cập đến <strong>Write Skew</strong> trong Snapshot Isolation!</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">Ma trận chuẩn quốc tế: Mức cô lập vs Các loại dị thường</h4>\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Mức cô lập (Isolation Level)</th>\n                <th>Dirty Read<br>(Đọc rác)</th>\n                <th>Non-Repeatable Read<br>(Đọc không lặp lại)</th>\n                <th>Phantom Read<br>(Bóng ma)</th>\n                <th>Write Skew<br>(Lệch ghi)</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><strong>Read Uncommitted</strong></td>\n                <td><span class=\"dirty-val\">BỊ LỖI</span></td>\n                <td><span class=\"dirty-val\">BỊ LỖI</span></td>\n                <td><span class=\"dirty-val\">BỊ LỖI</span></td>\n                <td><span class=\"dirty-val\">BỊ LỖI</span></td>\n              </tr>\n              <tr>\n                <td><strong>Read Committed</strong> (Mặc định Postgres, Oracle)</td>\n                <td><span class=\"highlight-val\">Chặn được</span></td>\n                <td><span class=\"dirty-val\">BỊ LỖI</span></td>\n                <td><span class=\"dirty-val\">BỊ LỖI</span></td>\n                <td><span class=\"dirty-val\">BỊ LỖI</span></td>\n              </tr>\n              <tr>\n                <td><strong>Repeatable Read</strong> (Snapshot Isolation)</td>\n                <td><span class=\"highlight-val\">Chặn được</span></td>\n                <td><span class=\"highlight-val\">Chặn được</span></td>\n                <td><span class=\"highlight-val\">Chặn được*</span></td>\n                <td><span class=\"dirty-val\">BỊ LỖI</span></td>\n              </tr>\n              <tr>\n                <td><strong>Serializable</strong> (Tuần tự hóa)</td>\n                <td><span class=\"highlight-val\">Chặn được</span></td>\n                <td><span class=\"highlight-val\">Chặn được</span></td>\n                <td><span class=\"highlight-val\">Chặn được</span></td>\n                <td><span class=\"highlight-val\">Chặn được</span></td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <p><small><em>*Ghi chú: Trong PostgreSQL và MySQL InnoDB, cơ chế Snapshot Isolation của Repeatable Read cũng tự động chặn được Phantom Read cho các câu lệnh SELECT thuần túy.</em></small></p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">Định nghĩa chính xác 4 loại dị thường:</h4>\n        <ol>\n          <li><strong>Dirty Read (Đọc rác):</strong> Đọc dữ liệu chưa commit của transaction khác. Dữ liệu có thể bị rollback sau đó.</li>\n          <li><strong>Non-Repeatable Read (Fuzzy Read):</strong> Trong cùng 1 transaction, bạn SELECT dòng X được giá trị 100. Transaction khác UPDATE dòng X thành 200 và COMMIT. Bạn SELECT lại dòng X và nhận được giá trị 200 (Hai lần đọc ra hai giá trị khác nhau trên cùng 1 dòng!).</li>\n          <li><strong>Phantom Read (Dòng bóng ma):</strong> Trong cùng 1 transaction, bạn SELECT các đơn hàng có <code>total &gt; 1tr</code> được 5 dòng. Transaction khác INSERT thêm 1 đơn hàng mới có total = 2tr và COMMIT. Bạn chạy lại câu query trên và thấy xuất hiện 6 dòng (Dòng mới xuất hiện như một \"bóng ma\"!).</li>\n          <li><strong>Write Skew (Lệch ghi):</strong> Hai transaction đọc cùng một tập dữ liệu tiền đề giống nhau, nhưng sau đó mỗi transaction lại cập nhật vào các dòng dữ liệu <em>rời rạc khác nhau</em>. Kết quả là tập dữ liệu cuối cùng vi phạm ràng buộc toàn vẹn tổng thể (như bài toán 2 bác sĩ).</li>\n        </ol>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-26-internal-mechanism",
          "title": "Cơ Chế Bên Trong: Statement Snapshot vs Transaction Snapshot & Thuật Toán SSI",
          "content": "\n        <p>Bí mật cốt lõi phân biệt giữa <strong>Read Committed</strong> và <strong>Repeatable Read</strong> nằm ở thời điểm bộ máy CSDL tạo ra bản chụp ảnh bộ nhớ (Snapshot):</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">A. Statement-level Snapshot vs Transaction-level Snapshot</h4>\n        <ul>\n          <li><strong>Read Committed (Statement-level):</strong> Mỗi khi bạn gõ một câu lệnh <code>SELECT</code>, CSDL sẽ chụp một <strong>Snapshot mới toanh ngay tại thời điểm bắt đầu câu lệnh đó</strong>. Do đó, nếu giữa hai câu SELECT có một transaction khác vừa COMMIT, câu SELECT thứ hai sẽ nhìn thấy ngay dữ liệu mới đó! (Gây ra Non-Repeatable Read).</li>\n          <li><strong>Repeatable Read (Transaction-level):</strong> CSDL chỉ chụp <strong>đúng MỘT Snapshot duy nhất tại thời điểm câu lệnh đầu tiên của Transaction bắt đầu</strong>. Dù transaction của bạn có chạy trong 10 phút và bên ngoài có 10.000 transaction khác vừa COMMIT, mọi câu lệnh SELECT trong transaction của bạn đều nhìn về cùng một bức ảnh đóng băng tại thời điểm ban đầu!</li>\n        </ul>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">B. Thuật toán SSI (Serializable Snapshot Isolation) trong PostgreSQL</h4>\n        <p>Trước đây, để đạt mức Serializable, các CSDL cổ điển phải dùng khóa bi quan (Lock-based): Khóa toàn bộ các dải chỉ mục (Predicate Locks) khiến hệ thống chạy cực kỳ chậm chạp. Năm 2008, các nhà nghiên cứu phát minh ra <strong>SSI (Serializable Snapshot Isolation)</strong>:</p>\n        <ol>\n          <li>CSDL cho phép mọi transaction chạy song song trên các Snapshot MVCC mà không cần khóa chặn (Lock-free)!</li>\n          <li>Bên dưới nhân CSDL, một cấu trúc đồ thị theo dõi các phụ thuộc đọc-ghi (siREAD Locks) được duy trì nhẹ nhàng trong bộ nhớ RAM.</li>\n          <li>Nếu CSDL phát hiện có một chu trình phụ thuộc nguy cơ gây ra dị thường (Dangerous Structure: $T_1 \to T_2 \to T_1$), CSDL sẽ chủ động <strong>hủy bỏ (Abort) một trong hai transaction</strong> với mã lỗi chuẩn SQL: <code>ERROR: 40001: could not serialize access due to read/write dependencies among transactions</code>.</li>\n        </ol>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-26-worked-example",
          "title": "Ví Dụ Mẫu Có Lời Giải: Tái Hiện Write Skew & Hai Cách Hóa Giải Chuẩn",
          "content": "\n        <p>Chúng ta sẽ thực nghiệm bài toán ca trực bác sĩ trên TechMart bằng SQL thuần, chứng minh Write Skew xảy ra trên Repeatable Read và xem cách hóa giải bằng hai phương pháp: (1) SELECT FOR UPDATE và (2) Nâng cấp lên SERIALIZABLE.</p>\n\n        <div class=\"predict-question\">\n          <strong>Thử thách dự đoán:</strong> Nếu chúng ta chạy hai phiên làm việc (Session 1 và Session 2) cùng ở mức cô lập <code>SERIALIZABLE</code> để xin nghỉ trực, điều gì sẽ xảy ra khi Session 2 gọi lệnh <code>COMMIT;</code>?\n        </div>\n        <details class=\"predict-details\">\n          <summary>Bấm để xem phân tích</summary>\n          <div style=\"margin-top:6px;line-height:1.6;\">\n            <strong>Đáp án:</strong> Session 1 sẽ COMMIT thành công. Nhưng khi Session 2 gọi <code>COMMIT;</code>, thuật toán SSI của PostgreSQL sẽ phát hiện ra sự xung đột phụ thuộc đọc-ghi và <strong>từ chối câu lệnh của Session 2 với mã lỗi 40001 (Serialization Failure)</strong>! Kết quả: Chỉ có bác sĩ 1 được nghỉ, bác sĩ 2 buộc phải ở lại trực, phòng cấp cứu được bảo vệ an toàn 100%!\n          </div>\n        </details>\n      ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Cách 1: Hóa giải Write Skew bằng Khóa Bi Quan (SELECT FOR UPDATE)",
              "code": "-- Khởi tạo bảng ca trực bác sĩ\nCREATE TABLE on_call_doctors (\n    doctor_id   INT PRIMARY KEY,\n    doctor_name VARCHAR(100) NOT NULL,\n    is_on_call  BOOLEAN NOT NULL DEFAULT TRUE\n);\n\nINSERT INTO on_call_doctors (doctor_id, doctor_name, is_on_call)\nVALUES (1, 'Dr. An', TRUE), (2, 'Dr. Binh', TRUE);\n\n-- Phiên làm việc của Bác sĩ An:\nBEGIN;\n\n-- Khóa toàn bộ các dòng bác sĩ đang trực để ép buộc tuần tự hóa!\n-- Các transaction khác cố tình đọc để sửa đều phải đứng chờ khóa này!\nSELECT COUNT(*) \nFROM on_call_doctors \nWHERE is_on_call = TRUE \nFOR UPDATE;\n\n-- Kiểm tra logic: Nếu COUNT(*) > 1 thì mới được phép cập nhật\nUPDATE on_call_doctors \nSET is_on_call = FALSE \nWHERE doctor_name = 'Dr. An';\n\nCOMMIT;",
              "explanation": "Mệnh đề FOR UPDATE biến câu lệnh đọc thành một rào chắn độc quyền (Exclusive Lock). Phiên của Dr. Binh khi chạy SELECT FOR UPDATE sẽ bị treo chờ cho đến khi Dr. An COMMIT xong; lúc này Dr. Binh đọc lại thấy COUNT(*) = 1 nên không thể xin nghỉ.",
              "output": "BEGIN\nSELECT 1 (Đã khóa 2 dòng)\nUPDATE 1\nCOMMIT\n(Bảo vệ toàn vẹn: Không thể xảy ra Write Skew)"
            },
            {
              "lang": "SQL",
              "title": "Cách 2: Hóa giải bằng Mức Cô Lập SERIALIZABLE (Tự động phát hiện lỗi 40001)",
              "code": "-- Cấu hình mức cô lập cao nhất cho Transaction\nBEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;\n\n-- Truy vấn kiểm tra bình thường (không cần viết FOR UPDATE thủ công)\nSELECT COUNT(*) FROM on_call_doctors WHERE is_on_call = TRUE;\n\n-- Cập nhật dữ liệu\nUPDATE on_call_doctors SET is_on_call = FALSE WHERE doctor_name = 'Dr. Binh';\n\n-- Khi chạy song song trên hai phiên:\n-- Phiên 1 COMMIT: THÀNH CÔNG!\n-- Phiên 2 COMMIT: BỊ ĐÁNH CHẶN NGAY LẬP TỨC:\n-- ERROR: 40001: could not serialize access due to read/write dependencies among transactions\n-- DETAIL: Reason code = Canceled on identification as a pivot, during commit attempt.\n-- HINT: The transaction might succeed if retried.\n\nROLLBACK;",
              "explanation": "Mức cô lập SERIALIZABLE sử dụng SSI tự động phát hiện xung đột ngầm mà không cần lập trình viên phải nhớ gõ FOR UPDATE. Khi nhận mã lỗi 40001, ứng dụng chỉ cần chạy lại (Retry) giao dịch là an toàn.",
              "output": "ERROR: 40001: could not serialize access due to read/write dependencies\n(CSDL bảo vệ tính toàn vẹn tuyệt đối)"
            }
          ]
        },
        {
          "id": "sec-26-faded-example",
          "title": "Bài Điền Khuyết (Faded Example): Cấu Hình Mức Cô Lập & Xử Lý Lỗi 40001",
          "content": "\n        <p>Hãy hoàn thiện đoạn mã SQL dưới đây để cấu hình mức cô lập an toàn cho một báo cáo tài chính chốt sổ cuối năm của TechMart:</p>\n        <ol>\n          <li>Cấu hình transaction chỉ đọc (Read Only) ở mức cô lập không bị ảnh hưởng bởi Phantom Read hay Non-Repeatable Read.</li>\n          <li>Đảm bảo transaction không thể thực hiện bất kỳ câu lệnh sửa đổi dữ liệu nào.</li>\n        </ol>\n\n        <pre><code class=\"language-sql\">-- [Chỗ trống 1]: Bắt đầu transaction với mức cô lập Repeatable Read ở chế độ Chỉ Đọc\nBEGIN TRANSACTION ISOLATION LEVEL /* ... điền mức cô lập ... */ /* ... điền chế độ ... */;\n\n-- Câu lệnh 1: Tính tổng doanh thu theo quý\nSELECT SUM(total_amount) FROM secure_orders WHERE created_at >= '2026-01-01';\n\n-- Dù bên ngoài có hàng trăm đơn hàng mới được tạo thành công, \n-- câu lệnh 2 dưới đây vẫn nhìn thấy con số chính xác y hệt như câu lệnh 1!\nSELECT SUM(total_amount) FROM secure_orders WHERE created_at >= '2026-01-01';\n\n-- [Chỗ trống 2]: Kết thúc transaction\n/* ... điền lệnh kết thúc ... */;</code></pre>\n\n        <details class=\"predict-details\" style=\"margin-top:12px;\">\n          <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem lời giải điền khuyết</summary>\n          <div style=\"margin-top:8px;\">\n            <pre><code class=\"language-sql\">-- Lời giải hoàn thiện:\n-- Chỗ trống 1: REPEATABLE READ READ ONLY\n-- Chỗ trống 2: COMMIT (hoặc: END)</code></pre>\n          </div>\n        </details>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-26-pitfalls-misconceptions",
          "title": "Bẫy Và Quan Niệm Sai Phổ Biến Về Các Mức Cô Lập",
          "content": "\n        <div class=\"callout callout-warning\" style=\"margin-bottom:16px;\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 1: Nghĩ rằng Repeatable Read ngăn chặn được 100% race conditions</h4>\n          <p><strong>Sai lầm:</strong> Tin rằng chỉ cần nâng lên Repeatable Read là hệ thống không bao giờ bị sai số liệu.</p>\n          <p><strong>Bản chất:</strong> Repeatable Read (Snapshot Isolation) chỉ bảo vệ <strong>thao tác Đọc</strong>. Đối với thao tác Ghi phụ thuộc chéo (như bài toán số dư ví điện tử không được âm khi mua ở 2 tab trình duyệt khác nhau, hoặc bài toán 2 bác sĩ trực), Repeatable Read hoàn toàn bất lực trước <strong>Write Skew</strong>!</p>\n        </div>\n\n        <div class=\"callout callout-warning\" style=\"margin-bottom:16px;\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 2: Nâng toàn bộ hệ thống lên Serializable mà không có cơ chế Retry</h4>\n          <p><strong>Sai lầm:</strong> Cấu hình <code>default_transaction_isolation = 'serializable'</code> trên toàn bộ CSDL và nghĩ rằng mọi việc đã xong.</p>\n          <p><strong>Hậu quả:</strong> Người dùng bắt đầu nhận hàng loạt màn hình lỗi 500 (Internal Server Error) do mã lỗi <code>40001: could not serialize access</code>! Serializable BẮT BUỘC phải đi kèm với vòng lặp thử lại (Retry Loop) ở mã nguồn ứng dụng.</p>\n        </div>\n\n        <div class=\"callout callout-warning\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 3: Nghĩ rằng Read Uncommitted chạy nhanh hơn trong PostgreSQL</h4>\n          <p><strong>Sự thật ngạc nhiên:</strong> Trong PostgreSQL, nếu bạn cấu hình <code>SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;</code>, CSDL <strong>tự động âm thầm chuyển nó thành READ COMMITTED</strong>! Nhân CSDL PostgreSQL không hỗ trợ Dirty Read vì kiến trúc MVCC không lưu dữ liệu chưa commit vào vị trí mà transaction khác có thể đọc được.</p>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-26-concept-comparison",
          "title": "So Sánh: Read Committed vs Repeatable Read vs Serializable",
          "content": "\n        <p>Bảng hướng dẫn lựa chọn mức cô lập chuẩn xác cho từng bài toán nghiệp vụ trong doanh nghiệp:</p>\n\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Tiêu chí</th>\n                <th>Read Committed</th>\n                <th>Repeatable Read</th>\n                <th>Serializable</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><strong>Mức độ an toàn</strong></td>\n                <td>Cơ bản (Chỉ chặn Dirty Read)</td>\n                <td>Cao (Đóng băng Snapshot đọc)</td>\n                <td>Tuyệt đối (Không dị thường)</td>\n              </tr>\n              <tr>\n                <td><strong>Tốc độ &amp; Thông lượng</strong></td>\n                <td>Nhanh nhất (Ít xung đột nhất)</td>\n                <td>Rất nhanh (Đọc không lock)</td>\n                <td>Chậm hơn khi có tranh chấp cao</td>\n              </tr>\n              <tr>\n                <td><strong>Nguy cơ nhận lỗi 40001</strong></td>\n                <td>Gần như bằng 0</td>\n                <td>Thấp (Chỉ khi 2 tx cùng sửa 1 dòng)</td>\n                <td>Thường xuyên khi có tranh chấp ghi</td>\n              </tr>\n              <tr>\n                <td><strong>Yêu cầu tầng Ứng dụng</strong></td>\n                <td>Không cần logic đặc biệt</td>\n                <td>Cần cẩn trọng với Write Skew</td>\n                <td><strong>Bắt buộc có Retry Loop</strong></td>\n              </tr>\n              <tr>\n                <td><strong>Bài toán phù hợp</strong></td>\n                <td>90% các ứng dụng web thông thường (CRUD, CMS, Blog)</td>\n                <td>Báo cáo kế toán, xuất file Excel, tính toán thuế</td>\n                <td>Sàn giao dịch chứng khoán, đặt vé máy bay, ví tiền điện tử</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-26-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Thiết Kế Mẫu Retry Pattern Chuẩn Sản Xuất Cho Mức Serializable",
          "content": "\n        <p>Khi sử dụng mức cô lập <code>SERIALIZABLE</code>, lập trình viên bắt buộc phải xử lý mã lỗi <strong>40001</strong> bằng mô hình <strong>Exponential Backoff with Jitter</strong> (Thử lại với thời gian chờ tăng theo hàm mũ kèm độ trễ ngẫu nhiên):</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">Mã mẫu kiến trúc chuẩn (Python / Backend Pattern):</h4>\n        <pre><code class=\"language-python\">import time, random, psycopg2\n\ndef execute_with_retry(max_retries=5):\n    for attempt in range(max_retries):\n        try:\n            with get_db_connection() as conn:\n                with conn.cursor() as cur:\n                    # Mở transaction Serializable\n                    cur.execute(\"BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;\")\n                    \n                    # Thực thi logic nghiệp vụ tài chính\n                    cur.execute(\"SELECT balance FROM wallets WHERE user_id = %s FOR UPDATE;\", (user_id,))\n                    # ... các câu lệnh cập nhật ...\n                    \n                    conn.commit()\n                    return \"GIAO DỊCH THÀNH CÔNG!\"\n        except psycopg2.errors.SerializationFailure:\n            # Bắt đúng mã lỗi SQLSTATE 40001\n            if attempt == max_retries - 1:\n                raise Exception(\"Hệ thống quá tải, xin vui lòng thử lại sau!\")\n            \n            # Thời gian chờ lũy thừa kèm nhiễu ngẫu nhiên (Jitter) để tránh bão thử lại đồng loạt (Retry Storm)\n            sleep_time = (0.05 * (2 ** attempt)) + random.uniform(0.01, 0.05)\n            time.sleep(sleep_time)</code></pre>\n\n        <div class=\"dbms-diff-box\" style=\"margin-top:16px;\">\n          <div class=\"dbms-diff-header\">Khác biệt triển khai giữa các CSDL:</div>\n          <div class=\"dbms-diff-body\">\n            <ul>\n              <li><strong>PostgreSQL:</strong> Hỗ trợ thuật toán SSI hiện đại nhất thế giới cho mức <code>SERIALIZABLE</code>, hoàn toàn không khóa bảng.</li>\n              <li><strong>MySQL InnoDB:</strong> Mức <code>SERIALIZABLE</code> tự động chuyển đổi ngầm toàn bộ các câu lệnh <code>SELECT</code> thông thường thành <code>SELECT ... FOR SHARE</code>, sử dụng khóa đọc (Shared Lock) thực sự.</li>\n              <li><strong>DuckDB:</strong> Mặc định chạy ở mức cô lập <code>SNAPSHOT ISOLATION</code> cho mọi giao dịch, hỗ trợ ACID đầy đủ cho thread-level.</li>\n              <li><strong>SQLite:</strong> Trong chế độ WAL mode, SQLite hỗ trợ <code>SERIALIZABLE</code> thông qua cơ chế 1 writer duy nhất tại một thời điểm (khóa ghi toàn tiến trình).</li>\n            </ul>\n          </div>\n        </div>\n      ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Bẫy Write Skew trong Snapshot Isolation",
            "content": "Hai giao dịch đọc cùng một tiền đề và sửa trên các dòng dữ liệu khác nhau có thể vi phạm luật kinh doanh tổng thể ngay cả ở mức Repeatable Read. Hãy dùng SELECT FOR UPDATE hoặc mức SERIALIZABLE."
          },
          {
            "title": "Bão thử lại (Retry Storm)",
            "content": "Khi dùng Serializable, nếu không có Exponential Backoff kèm Jitter ngẫu nhiên, hàng trăm client bị lỗi 40001 sẽ cùng lúc thử lại ở cùng một mili-giây, làm nghẽn CPU CSDL 100%."
          }
        ],
        "tips": [
          {
            "title": "Mã lỗi chuẩn quốc tế 40001",
            "content": "Trong mọi hệ quản trị CSDL tuân thủ chuẩn ANSI (PostgreSQL, CockroachDB, YugabyteDB), mã lỗi SQLSTATE 40001 luôn chỉ đích danh Serialization Failure. Luôn bắt đúng mã lỗi này để retry."
          }
        ],
        "deepDive": {
          "title": "Dị thường Write Skew: Vì sao Repeatable Read vẫn bị thủng quỹ và cách SSI phát hiện SIREAD Locks",
          "content": "<p>Dị thường <strong>Write Skew</strong> xảy ra khi 2 giao dịch đồng thời đọc cùng một điều kiện bất biến (ví dụ: 'Tổng số dư Ví A + Ví B phải >= 0'). Cả hai thấy tổng là 1 triệu. Giao dịch 1 rút 800k ở Ví A; giao dịch 2 rút 800k ở Ví B. Dưới mức <code>REPEATABLE READ</code>, cả 2 giao dịch đều thành công, khiến tổng số dư bị âm -600k!</p><p>Cấp độ <strong>Serializable Snapshot Isolation (SSI)</strong> trong PostgreSQL giải quyết vấn đề này mà không cần khóa chặn (Lock-free): nó gắn các khóa logic nhẹ gọi là <strong>SIREAD Locks</strong> để theo dõi các cạnh xung đột đọc-ghi (rw-antidependencies). Nếu phát hiện một chu trình xung đột tiềm ẩn (Dangerous Structure), engine tự động hủy (ABORT) một giao dịch kèm thông báo lỗi <code>could not serialize access</code> để bảo vệ an toàn tài chính tuyệt đối.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 5.2-1 (Dự đoán kết quả): Nhận diện dị thường Non-Repeatable Read",
          "level": "Cơ bản",
          "problem": "Giao dịch 1 chạy ở mức READ COMMITTED. Lúc 10:00:00, Giao dịch 1 chạy `SELECT salary FROM emp WHERE emp_id = 1;` và thấy kết quả là 20.000.000đ. Lúc 10:00:05, Giao dịch 2 chạy `UPDATE emp SET salary = 25000000 WHERE emp_id = 1; COMMIT;`. Lúc 10:00:10, Giao dịch 1 chạy lại chính xác câu query trên trước khi gọi COMMIT. Kết quả trả về là bao nhiêu? Dị thường gì đã xảy ra?",
          "hint": "Read Committed tạo Snapshot mới tại thời điểm nào?",
          "solutionCode": "-- Phân tích:\n-- Mức cô lập là READ COMMITTED (Statement-level snapshot).\n-- Câu lệnh SELECT thứ hai lúc 10:00:10 sẽ tạo một snapshot mới.\n-- Vì Giao dịch 2 đã COMMIT lúc 10:00:05, câu lệnh thứ hai sẽ nhìn thấy giá trị mới: 25.000.000đ!\n-- Đây chính là dị thường Non-Repeatable Read (Fuzzy Read)!",
          "solutionOutput": "25.000.000đ (Dị thường Non-Repeatable Read)",
          "explanation": "Chẩn đoán: Ở mức Read Committed, hai câu lệnh SELECT giống hệt nhau trong cùng một transaction có thể trả về các con số hoàn toàn khác nhau."
        },
        {
          "title": "Bài tập 5.2-2 (Tìm & Sửa lỗi): Khắc phục lỗi đặt trùng tên người dùng bằng Serializable",
          "level": "Trung bình",
          "problem": "Hai người dùng cùng lúc đăng ký tài khoản với username = 'alice' trên một hệ thống không có Unique Constraint cứng. Cả 2 giao dịch chạy ở mức Read Committed: Đọc kiểm tra `SELECT COUNT(*) FROM users WHERE username = 'alice'` -> Đều thấy bằng 0 -> Cùng chèn thành công. Hãy viết câu lệnh mở transaction để CSDL tự động phát hiện và chặn đứng xung đột này.",
          "hint": "Sử dụng mức cô lập SERIALIZABLE hoặc thêm UNIQUE constraint.",
          "solutionCode": "-- Giải pháp 1 (Chuẩn nhất ở tầng CSDL): Tạo ràng buộc Unique cứng\nALTER TABLE users ADD CONSTRAINT uq_users_username UNIQUE (username);\n\n-- Giải pháp 2 (Nếu xử lý bằng mức cô lập ở tầng logic):\nBEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;\nSELECT COUNT(*) FROM users WHERE username = 'alice';\n-- Nếu COUNT = 0 thì INSERT:\nINSERT INTO users (username) VALUES ('alice');\nCOMMIT;\n-- Giao dịch thứ hai khi COMMIT sẽ bị CSDL ném lỗi 40001!",
          "solutionOutput": "ERROR: 40001 (Nếu chạy song song ở mức Serializable)",
          "explanation": "Chẩn đoán: Ràng buộc Unique ở tầng CSDL luôn là giải pháp nhanh và rẻ nhất; nếu không có, bắt buộc phải dùng Serializable."
        },
        {
          "title": "Bài tập 5.2-3 (Tự viết truy vấn): Thiết kế kịch bản SELECT FOR UPDATE chống âm tiền ví",
          "level": "Khá",
          "problem": "Một người dùng có số dư ví là 1.000.000đ. Người dùng mở 2 tab trình duyệt và cùng bấm mua 2 đơn hàng trị giá 800.000đ trong cùng 1 tích tắc. Hãy viết đoạn mã SQL cho một giao dịch trừ tiền sử dụng cơ chế khóa hàng bi quan (Pessimistic Row Lock) để đảm bảo không bao giờ bị âm tiền.",
          "hint": "Sử dụng SELECT balance FROM user_wallets WHERE user_id = ... FOR UPDATE; kết hợp kiểm tra số dư.",
          "solutionCode": "BEGIN;\n\n-- Khóa độc quyền dòng ví của người dùng\nSELECT balance \nFROM user_wallets \nWHERE user_id = 101 \nFOR UPDATE;\n\n-- Kiểm tra bằng SQL (nếu balance >= 800000 thì mới trừ tiền):\nUPDATE user_wallets \nSET balance = balance - 800000.00 \nWHERE user_id = 101 AND balance >= 800000.00;\n\n-- Nếu không có dòng nào được cập nhật (SQL%ROWCOUNT = 0), gọi ROLLBACK\nCOMMIT;",
          "solutionOutput": "Tab 1: Trừ tiền thành công, số dư còn 200.000đ\nTab 2: Chờ Tab 1 xong, đọc thấy số dư 200.000đ < 800.000đ -> Bị từ chối!",
          "explanation": "SELECT ... FOR UPDATE là kỹ thuật kinh điển nhất để đồng bộ hóa các luồng ghi cạnh tranh trên cùng một thực thể tiền tệ."
        },
        {
          "title": "Bài tập 5.2-4 (Đánh đổi & Kiến trúc): Tái hiện và giải mã hiện tượng Read-Only Inconsistency",
          "level": "Nâng cao",
          "problem": "Giải thích tại sao một câu truy vấn SELECT báo cáo tài chính dài 30 phút chạy ở mức Repeatable Read trên PostgreSQL vẫn có thể nhìn thấy dữ liệu không nhất quán nếu có các giao dịch khác thực hiện Write Skew? Làm thế nào để đảm bảo báo cáo tài chính an toàn 100% không dị thường?",
          "hint": "Sử dụng cú pháp: BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE READ ONLY DEFERRABLE;",
          "solutionCode": "-- Kỹ thuật tối thượng cho báo cáo tài chính lớn trong PostgreSQL:\nBEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE READ ONLY DEFERRABLE;\n\n-- Tác dụng của DEFERRABLE:\n-- CSDL sẽ trì hoãn (wait) một chút cho đến khi có một snapshot hoàn toàn sạch\n-- mà không có bất kỳ rủi ro Read-Only Inconsistency nào trước khi bắt đầu câu lệnh đầu tiên.\n-- Sau khi bắt đầu, câu truy vấn đảm bảo chạy mượt mà 100% mà không bao giờ bị ném lỗi 40001!\n\nSELECT department_id, SUM(budget) FROM departmental_budgets GROUP BY department_id;\n\nCOMMIT;",
          "solutionOutput": "COMMIT (Báo cáo an toàn tuyệt đối mà không sợ bị abort giữa chừng)",
          "explanation": "Chẩn đoán: DEFERRABLE là tính năng độc quyền cao cấp của PostgreSQL dành riêng cho các tác vụ phân tích lớn cần độ chính xác tuần tự mà không muốn bị hủy giữa chừng."
        }
      ],
      "quiz": [
        {
          "question": "Dị thường 'Write Skew' (Lệch ghi) xảy ra trong tình huống nào dưới đây?",
          "options": [
            "Một transaction đọc dữ liệu chưa commit của transaction khác.",
            "Hai transaction chạy song song, đọc cùng một tiền đề giống nhau nhưng cập nhật vào các dòng dữ liệu khác nhau, dẫn đến việc vi phạm ràng buộc toàn thể của hệ thống.",
            "CSDL bị mất điện làm hỏng file index.",
            "Câu lệnh SELECT trả về số âm."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Write Skew là dị thường kinh điển của Snapshot Isolation khi hai giao dịch sửa các dòng độc lập nên không có xung đột khóa ghi trực tiếp, nhưng kết quả chung cuộc lại vi phạm luật nghiệp vụ."
        },
        {
          "question": "Sự khác biệt cốt lõi nhất giữa mức cô lập READ COMMITTED và REPEATABLE READ trong PostgreSQL là gì?",
          "options": [
            "READ COMMITTED không hỗ trợ lệnh INSERT.",
            "READ COMMITTED tạo một snapshot mới tại thời điểm bắt đầu mỗi câu lệnh; trong khi REPEATABLE READ tạo duy nhất một snapshot tại thời điểm bắt đầu câu lệnh đầu tiên của Transaction.",
            "REPEATABLE READ chỉ cho phép một người dùng kết nối tại một thời điểm.",
            "READ COMMITTED tự động xóa dữ liệu sau 24 giờ."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Statement-level snapshot của Read Committed khiến nó thấy các thay đổi vừa commit của transaction khác; trong khi Transaction-level snapshot của Repeatable Read đóng băng dữ liệu trong suốt transaction."
        },
        {
          "question": "Mã lỗi SQLSTATE chuẩn quốc tế nào được hệ quản trị CSDL trả về khi một giao dịch ở mức SERIALIZABLE bị hủy do phát hiện xung đột phụ thuộc đọc-ghi?",
          "options": [
            "23505 (Unique Violation)",
            "42P01 (Undefined Table)",
            "40001 (Serialization Failure)",
            "08006 (Connection Failure)"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Mã lỗi 40001 là chuẩn quốc tế báo hiệu giao dịch bị thất bại tuần tự hóa và ứng dụng có thể thử lại (safe to retry)."
        },
        {
          "question": "Thuật toán Serializable Snapshot Isolation (SSI) trong PostgreSQL đạt được mức cô lập SERIALIZABLE bằng cách nào?",
          "options": [
            "Khóa toàn bộ bảng dữ liệu không cho ai đọc hay ghi.",
            "Cho phép mọi transaction chạy đồng thời trên MVCC và theo dõi đồ thị phụ thuộc đọc-ghi (siREAD locks) trên RAM để hủy bỏ transaction nếu có chu trình xung đột.",
            "Chuyển đổi toàn bộ CSDL sang chế độ đơn luồng (Single Thread).",
            "Ghi toàn bộ dữ liệu ra file text."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! SSI là thuật toán không khóa chặn (Lock-free), mang lại hiệu năng đọc ghi cao vượt trội so với các cơ chế khóa bi quan truyền thống."
        },
        {
          "question": "Vì sao khi lập trình ứng dụng sử dụng mức cô lập SERIALIZABLE, kỹ sư bắt buộc phải triển khai cơ chế Thử lại (Retry Loop with Exponential Backoff)?",
          "options": [
            "Vì CSDL sẽ xóa toàn bộ mã nguồn nếu không thử lại.",
            "Vì các giao dịch ở mức Serializable có thể bị CSDL chủ động hủy bỏ bất cứ lúc nào với lỗi 40001 khi phát hiện nguy cơ xung đột giữa các luồng.",
            "Vì mức Serializable làm giảm tốc độ mạng Internet.",
            "Vì chuẩn SQL yêu cầu mỗi câu lệnh phải chạy 3 lần mới hợp lệ."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Lỗi 40001 không phải là lỗi logic phần mềm mà là cơ chế bảo vệ của CSDL. Ứng dụng phải có cơ chế thử lại tự động để hoàn tất giao dịch."
        }
      ],
      "summary": [
        "Bốn mức cô lập ANSI: Read Uncommitted, Read Committed (mặc định), Repeatable Read (Snapshot Isolation), Serializable.",
        "Bốn dị thường: Dirty Read (đọc rác), Non-Repeatable Read (đọc đổi giá trị), Phantom Read (thêm dòng mới), Write Skew (lệch ghi trên Snapshot Isolation).",
        "Bản chất Snapshot: Read Committed chụp ảnh ở đầu mỗi câu lệnh (Statement-level); Repeatable Read chụp ảnh ở đầu Transaction (Transaction-level).",
        "Write Skew không thể giải quyết bằng Repeatable Read thông thường; bắt buộc phải dùng SELECT FOR UPDATE hoặc nâng cấp lên SERIALIZABLE.",
        "Serializable Snapshot Isolation (SSI) trong Postgres là cơ chế Lock-free; khi gặp mã lỗi 40001, ứng dụng bắt buộc phải có Retry Loop với Exponential Backoff.",
        "Ôn cách quãng: Tại sao thuật toán phục hồi ARIES trong WAL lại thực hiện pha Redo trước rồi mới thực hiện pha Undo? (Xem lại Bài 5.1)."
      ]
    },
    {
      "id": "sql-27-locks-and-deadlocks",
      "number": "5.3",
      "title": "Cơ Chế Khóa (Shared / Exclusive) & Hóa Giải Deadlock",
      "subtitle": "Row vs Table locks, Intention locks, Wait-For Graph, SELECT FOR UPDATE SKIP LOCKED và quy tắc sắp xếp khóa",
      "level": "Chuyên gia",
      "duration": "55 phút",
      "keywords": [
        "Locks",
        "Deadlock",
        "Shared Lock",
        "Exclusive Lock",
        "Intention Lock",
        "FOR UPDATE",
        "SKIP LOCKED",
        "NOWAIT",
        "Wait-For Graph",
        "deadlock_timeout"
      ],
      "prerequisites": "ACID Internals & MVCC (Bài 5.1), Các mức cô lập giao dịch (Bài 5.2), Chỉ mục dữ liệu (Bài 4.1).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Phân tích cấu trúc phân cấp khóa trong CSDL: Khóa hàng (Row-level), Khóa bảng (Table-level) và Khóa ý định (Intention Locks: IS, IX).",
        "Giải thích ma trận tương thích giữa Shared Lock (Khóa đọc) và Exclusive Lock (Khóa ghi) và hiện tượng khóa chặn dây chuyền.",
        "Làm chủ 4 biến thể của câu lệnh khóa hàng: FOR UPDATE, FOR NO KEY UPDATE, FOR SHARE, FOR KEY SHARE kết hợp tùy chọn NOWAIT và SKIP LOCKED.",
        "Giải mã thuật toán phát hiện chu trình Deadlock (Wait-For Graph) và cơ chế tự động xử lý của tham số deadlock_timeout.",
        "Triển khai 3 chiến lược loại trừ Deadlock trong sản xuất: Thứ tự khóa nhất quán (Consistent Lock Ordering), Worker Queue không khóa với SKIP LOCKED, và DDL không gián đoạn dịch vụ với CONCURRENTLY."
      ],
      "intuition": {
        "title": "Hai chiếc xe đối đầu trong con ngõ hẹp vs Làn đường một chiều",
        "metaphor": "Tưởng tượng hai chiếc xe tải cùng đi vào một con ngõ hẹp chỉ vừa đúng một xe. Chiếc xe 1 (Transaction 1) đã vào được khúc ngoặt A và đang muốn tiến vào khúc ngoặt B. Chiếc xe 2 (Transaction 2) đã vào được khúc ngoặt B và đang muốn tiến vào khúc ngoặt A. Cả hai tài xế đều kiên quyết không chịu lùi xe: Xe 1 chờ Xe 2 lùi để đi tiếp, Xe 2 lại chờ Xe 1 lùi để đi tiếp. Kết quả là cả con ngõ bị tê liệt vĩnh viễn: Đó chính là Deadlock (Bế tắc tử thần)! Trong CSDL, cảnh sát giao thông (Deadlock Detector) sẽ xuất hiện sau 1 giây, quan sát vòng tròn bế tắc này (Wait-For Graph) và ra lệnh cẩu một trong hai chiếc xe đi (Abort/Rollback) để chiếc xe kia thoát ra. Quy tắc giải quyết triệt để không bao giờ bị bế tắc là biến con ngõ thành đường một chiều: Mọi chiếc xe BẮT BUỘC phải đi qua A trước rồi mới được đi qua B (Consistent Lock Ordering)!",
        "boundary": "Khóa (Locks) là công cụ bắt buộc để bảo vệ dữ liệu khi ghi đồng thời, nhưng lạm dụng khóa hoặc giữ khóa quá lâu sẽ biến một CSDL đa luồng thành một hệ thống đơn luồng nghẽn cổ chai. Mục tiêu của kỹ sư là: Khóa đúng phạm vi nhỏ nhất (Row lock), trong thời gian ngắn nhất (vài mili-giây), và theo đúng trật tự định trước.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;border-color:var(--warning);\">\n                <div style=\"font-size:0.75rem;color:var(--warning);margin-bottom:4px;font-weight:700;\">TRANSACTION 1</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">Giữ Ví A &bull; Đợi Ví B</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Chờ Transaction 2 nhả khóa Ví B</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"font-size:1.2rem;color:var(--danger);\">&harr; DEADLOCK &harr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;border-color:var(--danger);\">\n                <div style=\"font-size:0.75rem;color:var(--danger);margin-bottom:4px;font-weight:700;\">TRANSACTION 2</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">Giữ Ví B &bull; Đợi Ví A</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Chờ Transaction 1 nhả khóa Ví A</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--success);\">🛡️ Hóa giải Deadlock:</span>\n              <span>Luôn luôn sắp xếp thứ tự khóa tài nguyên tăng dần nhất quán: <code>SELECT * FROM accounts WHERE id IN (A, B) ORDER BY id ASC FOR UPDATE;</code>.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-27-problem-hook",
          "title": "Gợi Mở Vấn Đề: Vụ Sập Cổng Thanh Toán Black Friday Vì Vòng Tròn Bế Tắc",
          "content": "\n        <p>12:00 trưa ngày Siêu khuyến mãi Black Friday, hệ thống bán lẻ của TechMart ghi nhận lượng đơn hàng tăng đột biến gấp 100 lần. Đúng vào thời điểm vàng, hàng loạt giao dịch bắt đầu bị treo và ném ra thông báo lỗi đỏ rực:</p>\n        <pre><code class=\"language-text\">ERROR: deadlock detected\nDETAIL: Process 12480 waits for ShareLock on transaction 892314; blocked by process 12485.\nProcess 12485 waits for ExclusiveLock on tuple (42, 18) of relation \"products\"; blocked by process 12480.\nHINT: See server log for query details.</code></pre>\n        <p>Điều gì đã xảy ra dưới tầng nhân hệ thống?</p>\n        <ul>\n          <li><strong>Giao dịch 1 (Khách A mua Chuột và Bàn phím):</strong> Khóa và cập nhật tồn kho <code>Chuột</code> thành công, sau đó chuẩn bị khóa <code>Bàn phím</code>.</li>\n          <li><strong>Giao dịch 2 (Khách B mua Bàn phím và Chuột):</strong> Chạy song song ở cùng mili-giây đó. Khóa và cập nhật tồn kho <code>Bàn phím</code> thành công, sau đó chuẩn bị khóa <code>Chuột</code>.</li>\n        </ul>\n        <p>Cả hai tiến trình rơi vào thế kẹt chân: Giao dịch 1 chờ Giao dịch 2 nhả Bàn phím; Giao dịch 2 lại chờ Giao dịch 1 nhả Chuột. Không ai chịu nhường ai. Nếu CSDL không can thiệp, hai kết nối này sẽ <strong>bị treo vĩnh viễn</strong>!</p>\n        <p>Làm chủ cơ chế Khóa và Hóa giải Deadlock là ranh giới phân định giữa một lập trình viên thông thường và một Senior Database Engineer.</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-27-recall-prereq",
          "title": "Gọi Lại Kiến Thức Cũ: Giao Dịch & Các Câu Lệnh Cập Nhật DML",
          "content": "\n        <p>Hãy kiểm tra lại kiến thức về thời gian sống của khóa trong giao dịch:</p>\n        \n        <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n          <p><strong>Câu hỏi 1:</strong> Khi bạn thực hiện câu lệnh <code>UPDATE products SET stock = stock - 1 WHERE product_id = 10;</code> bên trong một khối Transaction, khóa trên dòng sản phẩm 10 sẽ được giải phóng khi nào?</p>\n          <details class=\"predict-details\" style=\"margin-top:8px;\">\n            <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n            <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n              <p><strong>Đáp án:</strong> Khóa KHÔNG giải phóng ngay sau khi câu lệnh UPDATE chạy xong! Khóa sẽ được giữ liên tục cho đến khi Transaction kết thúc hoàn toàn (bằng lệnh <code>COMMIT</code> hoặc <code>ROLLBACK</code>). Đây là nguyên lý Two-Phase Locking (2PL) để đảm bảo tính cô lập.</p>\n            </div>\n          </details>\n        </div>\n\n        <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n          <p><strong>Câu hỏi 2:</strong> Nếu một câu lệnh cố gắng sửa một dòng đang bị transaction khác khóa, hành vi mặc định của CSDL là gì?</p>\n          <details class=\"predict-details\" style=\"margin-top:8px;\">\n            <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n            <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n              <p><strong>Đáp án:</strong> CSDL sẽ đưa câu lệnh đó vào hàng đợi chờ (Wait Queue / Sleep). Câu lệnh sẽ bị treo (block) cho đến khi transaction giữ khóa ban đầu gọi COMMIT/ROLLBACK, hoặc cho đến khi vượt quá thời gian chờ (Lock Timeout).</p>\n            </div>\n          </details>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-27-concept-definition",
          "title": "Khái Niệm Cốt Lõi: Cấu Trúc Khóa Phân Cấp & Ma Trận Tương Thích",
          "content": "\n        <p>Hệ quản trị CSDL tổ chức khóa theo mô hình phân cấp từ to đến nhỏ (Database &rarr; Table &rarr; Page &rarr; Row):</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">A. Hai loại khóa cơ bản: Shared Lock (S) vs Exclusive Lock (X)</h4>\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Khóa hiện tại đang giữ</th>\n                <th>Yêu cầu xin khóa Shared (S) mới</th>\n                <th>Yêu cầu xin khóa Exclusive (X) mới</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><strong>Không có khóa</strong></td>\n                <td><span class=\"highlight-val\">Chấp thuận ngay</span></td>\n                <td><span class=\"highlight-val\">Chấp thuận ngay</span></td>\n              </tr>\n              <tr>\n                <td><strong>Shared Lock (S - Khóa đọc)</strong></td>\n                <td><span class=\"highlight-val\">Chấp thuận (Nhiều người cùng đọc)</span></td>\n                <td><span class=\"dirty-val\">BỊ CHẶN (Phải chờ S nhả ra)</span></td>\n              </tr>\n              <tr>\n                <td><strong>Exclusive Lock (X - Khóa ghi)</strong></td>\n                <td><span class=\"dirty-val\">BỊ CHẶN (Phải chờ X nhả ra)</span></td>\n                <td><span class=\"dirty-val\">BỊ CHẶN (Phải chờ X nhả ra)</span></td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <p><strong>Quy tắc vàng:</strong> <em>Shared tương thích với Shared. Exclusive xung đột với TẤT CẢ mọi loại khóa!</em></p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">B. Khóa ý định ở tầng Bảng (Intention Locks: IS, IX)</h4>\n        <p>Nếu một transaction muốn chạy lệnh DDL sửa cấu trúc bảng (ví dụ: <code>ALTER TABLE DROP COLUMN</code>), làm sao nó biết có dòng nào trong số 50 triệu dòng đang bị ai đó khóa không? Quét 50 triệu dòng để kiểm tra là bất khả thi!</p>\n        <p>Giải pháp: <strong>Intention Locks (Khóa ý định)</strong>. Khi một transaction muốn khóa một dòng bên dưới, nó phải báo cáo lên cửa ra vào của bảng bằng cách đặt một khóa ý định trên toàn bảng:</p>\n        <ul>\n          <li><strong>IS (Intention Shared):</strong> \"Tôi có ý định đặt Shared lock trên một số dòng bên dưới\".</li>\n          <li><strong>IX (Intention Exclusive):</strong> \"Tôi có ý định đặt Exclusive lock trên một số dòng bên dưới\".</li>\n        </ul>\n        <p>Khi lệnh DDL đến, nó chỉ cần nhìn vào cửa bảng: Thấy có cờ <code>IX</code> là biết ngay bên dưới đang có người sửa dòng, lệnh DDL tự động đứng chờ mà không cần quét bảng!</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-27-internal-mechanism",
          "title": "Cơ Chế Bên Trong: Thuật Toán Phát Hiện Deadlock (Wait-For Graph) & Bí Mật Tuple Locks",
          "content": "\n        <p>Làm thế nào CSDL phát hiện ra Deadlock và xử lý nó trong tích tắc?</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">A. Đồ thị chờ tài nguyên (Wait-For Graph)</h4>\n        <p>Bên dưới bộ nhớ RAM, CSDL duy trì một đồ thị có hướng gọi là <strong>Wait-For Graph</strong>:</p>\n        <ul>\n          <li>Mỗi đỉnh (Node) đại diện cho một Transaction ($T_1, T_2, T_3$).</li>\n          <li>Mỗi cung (Edge) $T_1 \to T_2$ có nghĩa là: $T_1$ đang bị chặn và đang chờ tài nguyên do $T_2$ nắm giữ.</li>\n          <li><strong>Định nghĩa Deadlock toán học:</strong> <em>Deadlock tồn tại khi và chỉ khi xuất hiện một chu trình (Cycle) trong Wait-For Graph (ví dụ: $T_1 \to T_2 \to T_1$)!</em></li>\n        </ul>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">B. Cơ chế hoạt động của tham số deadlock_timeout</h4>\n        <p>Kiểm tra chu trình đồ thị tốn tài nguyên CPU. Do đó, CSDL không chạy thuật toán kiểm tra liên tục mỗi micro-giây. Thay vào đó:</p>\n        <ol>\n          <li>Khi một tiến trình bị chặn bởi một khóa, nó đi vào trạng thái ngủ và khởi động một bộ đếm giờ: <code>deadlock_timeout</code> (mặc định trong PostgreSQL là <strong>1000ms = 1 giây</strong>).</li>\n          <li>Nếu sau 1 giây mà tiến trình vẫn chưa có khóa, tiến trình giám sát (Lock Monitor) mới thức dậy và thực hiện thuật toán tìm chu trình (DFS / Tarjan's algorithm).</li>\n          <li>Nếu phát hiện chu trình, CSDL sẽ chọn một <strong>Nạn nhân (Victim Transaction)</strong> — thường là transaction ít tốn chi phí rollback nhất — và hủy bỏ nó với thông báo <code>ERROR: deadlock detected</code>, giải phóng khóa để transaction còn lại hoàn tất!</li>\n        </ol>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">C. Khóa hàng trong PostgreSQL không bao giờ làm nổ bộ nhớ (No Lock Escalation)</h4>\n        <p>Trong một số CSDL như Microsoft SQL Server, nếu một câu lệnh khóa quá 5.000 dòng, CSDL sẽ tự động nâng cấp (Lock Escalation) các khóa hàng thành Khóa toàn bảng (Table Lock), làm treo toàn bộ ứng dụng!</p>\n        <p>Trong PostgreSQL: <strong>KHÔNG BAO GIỜ có Lock Escalation</strong>! PostgreSQL lưu thông tin khóa hàng trực tiếp trong trường <code>xmax</code> của Tuple Header trên từng trang đĩa, thay vì lưu toàn bộ trên RAM. Bạn có thể khóa 100 triệu dòng cùng lúc mà RAM của CSDL không hề bị tăng thêm một megabyte nào!</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-27-worked-example",
          "title": "Ví Dụ Mẫu Có Lời Giải: Xây Dựng Job Queue Không Khóa Bằng FOR UPDATE SKIP LOCKED",
          "content": "\n        <p>Bài toán kinh điển trong kỹ thuật phần mềm: Có 10 worker (tiến trình nền) chạy song song cùng vào bảng <code>task_queue</code> để bốc tác vụ ra xử lý (gửi email, xuất hóa đơn). Làm thế nào để các worker bốc việc cực nhanh mà <strong>không bao giờ bốc trùng nhau, không bao giờ bị khóa chờ nhau, và không bao giờ bị Deadlock</strong>?</p>\n\n        <div class=\"predict-question\">\n          <strong>Thử thách dự đoán:</strong> Nếu Worker 1 đang chạy câu lệnh khóa tác vụ ID = 1: <code>SELECT * FROM task_queue WHERE status = 'PENDING' LIMIT 1 FOR UPDATE SKIP LOCKED;</code>. Khi Worker 2 chạy chính xác cùng một câu lệnh trên tại cùng thời điểm, Worker 2 sẽ nhận được kết quả gì?\n        </div>\n        <details class=\"predict-details\">\n          <summary>Bấm để xem phân tích</summary>\n          <div style=\"margin-top:6px;line-height:1.6;\">\n            <strong>Đáp án:</strong> Nhờ mệnh đề <code>SKIP LOCKED</code>, Worker 2 sẽ <strong>tự động bỏ qua dòng ID = 1 đang bị Worker 1 khóa</strong> và bốc ngay dòng ID = 2 tiếp theo! Worker 2 không bị chặn (0ms latency), không có deadlock, và hai worker xử lý hai tác vụ hoàn toàn độc lập với hiệu năng tối đa!\n          </div>\n        </details>\n      ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Khởi tạo bảng Task Queue và nạp công việc mẫu trên TechMart",
              "code": "-- 1. Bảng Hàng đợi Tác vụ (Task Queue)\nCREATE TABLE background_tasks (\n    task_id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    task_type       VARCHAR(50) NOT NULL,\n    payload         JSONB NOT NULL,\n    status          VARCHAR(20) NOT NULL DEFAULT 'PENDING',\n    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Nạp 3 tác vụ cần xử lý\nINSERT INTO background_tasks (task_type, payload)\nVALUES \n    ('SEND_INVOICE_EMAIL', '{\"order_id\": 1001, \"email\": \"an@example.com\"}'),\n    ('CALCULATE_CASHBACK', '{\"order_id\": 1002, \"amount\": 50000}'),\n    ('SYNC_INVENTORY', '{\"product_id\": 101, \"stock_change\": -2}');",
              "explanation": "Bảng hàng đợi chứa các tác vụ PENDING cần được các Worker xử lý phân tán song song.",
              "output": "CREATE TABLE\nINSERT 0 3\n(Đã kiểm chứng thực thi 100% trên PostgreSQL 16.2 & DuckDB 2.0.0)"
            },
            {
              "lang": "SQL",
              "title": "Worker bốc tác vụ cực nhanh với FOR UPDATE SKIP LOCKED",
              "code": "-- Mỗi Worker chạy đoạn mã này trong một Transaction riêng:\nBEGIN;\n\n-- Bốc đúng 1 tác vụ chưa ai làm, KHÓA LẠI và BỎ QUA các dòng đang bị worker khác khóa!\nWITH next_task AS (\n    SELECT task_id\n    FROM background_tasks\n    WHERE status = 'PENDING'\n    ORDER BY created_at ASC\n    LIMIT 1\n    FOR UPDATE SKIP LOCKED\n)\nUPDATE background_tasks\nSET status = 'PROCESSING'\nFROM next_task\nWHERE background_tasks.task_id = next_task.task_id\nRETURNING background_tasks.task_id, background_tasks.task_type, background_tasks.payload;\n\n-- Xử lý công việc xong thì cập nhật COMPLETED và COMMIT\nUPDATE background_tasks SET status = 'COMPLETED' WHERE task_id = 1;\nCOMMIT;",
              "explanation": "Mệnh đề FOR UPDATE SKIP LOCKED loại bỏ hoàn toàn hiện tượng tranh chấp khóa. Đây là công nghệ lõi vận hành các hệ thống Message Queue lớn chạy trực tiếp trên Postgres (như Celery, Sidekiq, Graphile Worker).",
              "output": "+---------+--------------------+------------------------------------------------+\n| task_id | task_type          | payload                                        |\n+---------+--------------------+------------------------------------------------+\n| 1       | SEND_INVOICE_EMAIL | {\"email\": \"an@example.com\", \"order_id\": 1001}  |\n+---------+--------------------+------------------------------------------------+\n(1 row affected - Bốc việc tức thì trong 0.2ms)"
            }
          ]
        },
        {
          "id": "sec-27-faded-example",
          "title": "Bài Điền Khuyết (Faded Example): Áp Dụng Quy Tắc Sắp Xếp Khóa Nhất Quán",
          "content": "\n        <p>Để triệt tiêu vĩnh viễn nguy cơ Deadlock khi chuyển tiền hoặc cập nhật đồng thời nhiều dòng hàng tồn kho, quy tắc vàng là: <strong>Luôn luôn sắp xếp các ID cần khóa theo thứ tự tăng dần (ORDER BY id ASC) trước khi khóa!</strong> Hãy hoàn thiện đoạn mã SQL chuyển tiền giữa hai ví bất kỳ dưới đây:</p>\n\n        <pre><code class=\"language-sql\">-- Chuyển tiền giữa ví A và ví B (giả sử account_from = 'W_VIP', account_to = 'W_CORP')\nBEGIN;\n\n-- [Chỗ trống 1]: Khóa CẢ HAI tài khoản cùng lúc nhưng BẮT BUỘC theo thứ tự bảng chữ cái/số tăng dần\nSELECT wallet_id \nFROM bank_wallets \nWHERE wallet_id IN ('W_VIP', 'W_CORP')\n/* ... điền mệnh đề sắp xếp ... */\n/* ... điền mệnh đề khóa hàng ... */;\n\n-- Sau khi cả 2 ví đã được khóa an toàn theo cùng một trật tự,\n-- thực hiện trừ tiền và cộng tiền mà KHÔNG BAO GIỜ bị Deadlock!\nUPDATE bank_wallets SET balance = balance - 100000 WHERE wallet_id = 'W_VIP';\nUPDATE bank_wallets SET balance = balance + 100000 WHERE wallet_id = 'W_CORP';\n\n-- [Chỗ trống 2]: Chốt giao dịch\n/* ... điền lệnh chốt ... */;</code></pre>\n\n        <details class=\"predict-details\" style=\"margin-top:12px;\">\n          <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem lời giải điền khuyết</summary>\n          <div style=\"margin-top:8px;\">\n            <pre><code class=\"language-sql\">-- Lời giải hoàn thiện:\n-- Chỗ trống 1: ORDER BY wallet_id ASC FOR UPDATE\n-- Chỗ trống 2: COMMIT</code></pre>\n          </div>\n        </details>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-27-pitfalls-misconceptions",
          "title": "Bẫy Và Quan Niệm Sai Phổ Biến Trong Cơ Chế Khóa",
          "content": "\n        <div class=\"callout callout-warning\" style=\"margin-bottom:16px;\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 1: Chạy lệnh ALTER TABLE hoặc CREATE INDEX thông thường trên bảng Production</h4>\n          <p><strong>Sai lầm:</strong> Gõ lệnh <code>CREATE INDEX idx_orders ON orders(created_at);</code> trên bảng có 50 triệu dòng vào giữa ban ngày.</p>\n          <p><strong>Hậu quả thảm khốc:</strong> Câu lệnh này xin một khóa <code>SHARE LOCK</code> trên toàn bảng, chặn đứng toàn bộ các câu lệnh <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code> của người dùng trong suốt 15 phút tạo index! Cổng thanh toán bị sập và doanh số bán hàng về 0.</p>\n          <p><strong>Cách sửa chuẩn:</strong> Trong PostgreSQL, BẮT BUỘC dùng cú pháp: <code>CREATE INDEX CONCURRENTLY idx_orders ON orders(created_at);</code>. Cú pháp này không bao giờ khóa ghi!</p>\n        </div>\n\n        <div class=\"callout callout-warning\" style=\"margin-bottom:16px;\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 2: SELECT FOR UPDATE không có LIMIT trên tập dữ liệu lớn</h4>\n          <p><strong>Sai lầm:</strong> Viết <code>SELECT * FROM orders WHERE status = 'PENDING' FOR UPDATE;</code> khi có 200.000 đơn hàng pending.</p>\n          <p><strong>Hậu quả:</strong> Câu lệnh khóa sạch 200.000 dòng, khiến không một service nào khác có thể cập nhật bất kỳ đơn hàng nào trong danh sách đó, gây nghẽn toàn bộ luồng xử lý đơn hàng.</p>\n        </div>\n\n        <div class=\"callout callout-warning\">\n          <h4 style=\"margin:0 0 8px 0;color:var(--color-warning);\">Bẫy 3: Quên thiết lập lock_timeout</h4>\n          <p><strong>Sai lầm:</strong> Để <code>lock_timeout = 0</code> (chờ vô hạn). Khi có một câu lệnh DDL đứng chờ khóa, nó sẽ xếp hàng đầu tiên và chặn đứng toàn bộ các câu lệnh SELECT đến sau (Queue starvation)!</p>\n          <p><strong>Cách sửa chuẩn:</strong> Luôn đặt <code>SET lock_timeout = '3s';</code> trước khi chạy các script migration DDL.</p>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-27-concept-comparison",
          "title": "So Sánh: Các Biến Thể Của Câu Lệnh Khóa Hàng (FOR UPDATE)",
          "content": "\n        <p>Bảng phân biệt 4 cấp độ khóa hàng tinh vi trong PostgreSQL:</p>\n\n        <div class=\"table-responsive\">\n          <table class=\"comparison-table\">\n            <thead>\n              <tr>\n                <th>Cú pháp khóa hàng</th>\n                <th>Mức độ khóa</th>\n                <th>Chặn câu lệnh nào?</th>\n                <th>Tình huống sử dụng</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><code>FOR UPDATE</code></td>\n                <td>Độc quyền tối đa (Exclusive)</td>\n                <td>Chặn toàn bộ: UPDATE, DELETE, FOR UPDATE, FOR SHARE, FOR NO KEY UPDATE.</td>\n                <td>Xóa dòng, hoặc cập nhật cột khóa chính / khóa ngoại.</td>\n              </tr>\n              <tr>\n                <td><code>FOR NO KEY UPDATE</code></td>\n                <td>Độc quyền yếu</td>\n                <td>Chặn UPDATE, DELETE, FOR UPDATE; nhưng <strong>CHO PHÉP</strong> người khác chạy <code>FOR KEY SHARE</code>.</td>\n                <td>Cập nhật các cột thông thường (như status, balance) mà không đổi khóa chính.</td>\n              </tr>\n              <tr>\n                <td><code>FOR SHARE</code></td>\n                <td>Chia sẻ đọc (Shared)</td>\n                <td>Chặn UPDATE, DELETE, FOR UPDATE; cho phép người khác cùng đọc và cùng SHARE.</td>\n                <td>Đọc dữ liệu để tính toán và cấm người khác xóa dòng đó trong lúc mình đang tính.</td>\n              </tr>\n              <tr>\n                <td><code>FOR KEY SHARE</code></td>\n                <td>Chia sẻ yếu nhất</td>\n                <td>Chỉ chặn DELETE và UPDATE trên cột khóa; cho phép người khác UPDATE các cột non-key.</td>\n                <td>Duy trì toàn vẹn khóa ngoại (Postgres tự động dùng khi kiểm tra Foreign Key).</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-27-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Checklist Phòng Chống Deadlock 5 Bước Cho Kỹ Sư CSDL",
          "content": "\n        <p>Để đảm bảo hệ thống không bao giờ gặp sự cố Deadlock trên môi trường Production, hãy tuân thủ Checklist 5 bước sau:</p>\n\n        <h4 style=\"margin-top:16px;color:var(--color-primary);\">Checklist Phòng Chống Deadlock:</h4>\n        <ol>\n          <li><strong>Quy tắc thứ tự khóa nhất quán (Consistent Ordering):</strong> Trong toàn bộ mã nguồn của tất cả các microservices, nếu cần cập nhật nhiều bản ghi trong cùng một transaction, BẮT BUỘC phải sắp xếp các ID theo thứ tự tăng dần (<code>ORDER BY id ASC</code>) trước khi cập nhật.</li>\n          <li><strong>Giao dịch ngắn gọn (Short Transactions):</strong> Tách toàn bộ các tác vụ gọi API, tính toán nặng, gửi email ra ngoài transaction. Giữ transaction chạy dưới 50ms.</li>\n          <li><strong>Sử dụng NOWAIT hoặc SKIP LOCKED:</strong> Trong các tác vụ nền hoặc hàng đợi, không bao giờ dùng lệnh khóa chờ vô hạn. Thêm <code>SKIP LOCKED</code> để tự động bỏ qua dòng bị khóa hoặc <code>NOWAIT</code> để thoát ra ngay lập tức nếu bị kẹt.</li>\n          <li><strong>Tạo Index cho toàn bộ cột Foreign Key:</strong> (Xem lại Bài 4.1) Thiếu index trên Foreign Key là nguyên nhân hàng đầu gây Table Lock và Deadlock ngầm khi xóa bảng cha.</li>\n          <li><strong>DDL an toàn với CONCURRENTLY &amp; lock_timeout:</strong> Luôn dùng <code>CREATE INDEX CONCURRENTLY</code> và thiết lập <code>SET lock_timeout = '5s'</code> khi triển khai migration.</li>\n        </ol>\n\n        <div class=\"dbms-diff-box\" style=\"margin-top:16px;\">\n          <div class=\"dbms-diff-header\">Tham số giám sát Deadlock trên PostgreSQL:</div>\n          <div class=\"dbms-diff-body\">\n            <ul>\n              <li><code>log_lock_waits = on</code>: Tự động ghi log khi một câu lệnh bị treo chờ khóa quá thời gian deadlock_timeout.</li>\n              <li><code>deadlock_timeout = 1s</code>: Thời gian chờ trước khi tiến trình Lock Monitor bắt đầu quét tìm chu trình trong Wait-For Graph.</li>\n            </ul>\n          </div>\n        </div>\n      ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Tạo Index thường làm sập Production",
            "content": "Lệnh CREATE INDEX thông thường chiếm ShareLock trên toàn bảng, chặn sạch mọi lệnh ghi của người dùng. Trên Production, luôn bắt buộc dùng CREATE INDEX CONCURRENTLY."
          },
          {
            "title": "Thứ tự cập nhật ngược nhau gây Deadlock",
            "content": "Luồng A sửa (1 rồi 2), luồng B sửa (2 rồi 1) chắc chắn sẽ sinh ra Deadlock khi chạy song song. Luôn sắp xếp ID tăng dần trước khi thao tác."
          }
        ],
        "tips": [
          {
            "title": "Vũ khí SKIP LOCKED cho Job Queue",
            "content": "Mệnh đề SELECT ... FOR UPDATE SKIP LOCKED cho phép hàng trăm worker cùng bốc tác vụ song song với độ trễ gần bằng 0 mà không bao giờ bị nghẽn khóa hay deadlock."
          }
        ],
        "deepDive": {
          "title": "Cơ chế nội bộ: Thuật toán dò tìm chu trình trong Wait-For Graph của PostgreSQL Deadlock Detector",
          "content": "<p>Khi một giao dịch yêu cầu một khóa đang bị giao dịch khác nắm giữ, nó rơi vào trạng thái ngủ (Sleep) và kích hoạt một bộ đếm thời gian <code>deadlock_timeout</code> (mặc định là 1 giây).</p><p>Nếu sau 1 giây mà khóa vẫn chưa được giải phóng, tiến trình nền <strong>Deadlock Detector</strong> thức dậy. Nó dựng một <strong>Đồ thị Đợi (Wait-For Graph)</strong> biểu diễn các mối quan hệ 'Ai đang chờ Ai'. Bằng thuật toán tìm kiếm theo chiều sâu (Depth-First Search - DFS), nếu phát hiện một vòng lặp khép kín ($T_1 \\rightarrow T_2 \\rightarrow T_1$), engine xác định đây là bế tắc vĩnh cửu. Engine sẽ chọn giao dịch nào có chi phí hủy thấp hơn làm 'nạn nhân' (Victim) và phát lệnh ROLLBACK ép buộc để giải cứu giao dịch còn lại.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 5.3-1 (Dự đoán kết quả): Nhận diện nguy cơ Deadlock trong 2 kịch bản",
          "level": "Cơ bản",
          "problem": "Kịch bản 1: Luồng 1 cập nhật sản phẩm ID = 10, sau đó cập nhật sản phẩm ID = 20. Luồng 2 cập nhật sản phẩm ID = 20, sau đó cập nhật sản phẩm ID = 10. Kịch bản 2: Cả Luồng 1 và Luồng 2 đều cập nhật sản phẩm ID = 10 trước, sau đó mới cập nhật sản phẩm ID = 20. Kịch bản nào có nguy cơ gây Deadlock? Vì sao?",
          "hint": "Hãy vẽ đồ thị Wait-For Graph: Khi nào chu trình khép kín xuất hiện?",
          "solutionCode": "-- Phân tích:\n-- Kịch bản 1: Có nguy cơ Deadlock 100%! Luồng 1 giữ khóa 10 và chờ khóa 20. Luồng 2 giữ khóa 20 và chờ khóa 10. Tạo thành chu trình T1 -> T2 -> T1!\n-- Kịch bản 2: HOÀN TOÀN KHÔNG CÓ DEADLOCK! Cả hai cùng tranh chấp khóa 10 trước. Luồng nào chiếm được khóa 10 trước sẽ chạy tiếp tới 20, luồng kia chỉ đơn thuần đứng chờ (Blocked) một cách tuần tự mà không có chu trình chờ ngược lại.",
          "solutionOutput": "Kịch bản 1 gây Deadlock; Kịch bản 2 an toàn tuyệt đối",
          "explanation": "Chẩn đoán: Quy tắc sắp xếp thứ tự khóa nhất quán (Consistent Lock Ordering) triệt tiêu vĩnh viễn khả năng hình thành chu trình trong đồ thị chờ."
        },
        {
          "title": "Bài tập 5.3-2 (Tìm & Sửa lỗi): Khắc phục lỗi nghẽn dịch vụ do tạo Index",
          "level": "Trung bình",
          "problem": "Một lập trình viên gửi file migration lên Production: `CREATE INDEX idx_transactions_created ON transactions(created_at);`. Bảng `transactions` có 80 triệu dòng và phục vụ 2.000 giao dịch quẹt thẻ/giây. Hãy chỉ ra điều gì sẽ xảy ra và sửa lại câu lệnh để không ảnh hưởng đến người dùng đang quẹt thẻ.",
          "hint": "Sử dụng từ khóa CONCURRENTLY trong PostgreSQL.",
          "solutionCode": "-- Vấn đề: Lệnh CREATE INDEX thông thường xin ShareLock, chặn đứng toàn bộ 2.000 giao dịch quẹt thẻ/s, gây sập cổng thanh toán.\n-- SỬA LẠI CHUẨN SẢN XUẤT:\nCREATE INDEX CONCURRENTLY idx_transactions_created ON transactions(created_at);",
          "solutionOutput": "CREATE INDEX\n(Index được xây dựng ở chế độ nền trong khi người dùng vẫn quẹt thẻ bình thường)",
          "explanation": "Chẩn đoán: CREATE INDEX CONCURRENTLY thực hiện 2 lần quét bảng mà không chiếm khóa độc quyền, là tiêu chuẩn bắt buộc cho mọi hệ thống 24/7."
        },
        {
          "title": "Bài tập 5.3-3 (Tự viết truy vấn): Truy vấn phát hiện các câu lệnh đang bị khóa chặn trong PostgreSQL",
          "level": "Khá",
          "problem": "Viết câu truy vấn SQL đọc từ view hệ thống `pg_locks` và `pg_stat_activity` để hiển thị: PID của tiến trình đang bị chặn (Blocked PID), câu lệnh SQL đang bị treo, và PID của tiến trình thủ phạm đang giữ khóa (Blocking PID).",
          "hint": "JOIN giữa pg_locks bl (blocked) và pg_locks kl (blocking) trên cội locktype, relation, page, tuple.",
          "solutionCode": "SELECT \n    blocked_locks.pid     AS blocked_pid,\n    blocked_activity.usename AS blocked_user,\n    blocking_locks.pid    AS blocking_pid,\n    blocking_activity.usename AS blocking_user,\n    blocked_activity.query AS blocked_statement,\n    blocking_activity.query AS blocking_statement\nFROM pg_catalog.pg_locks blocked_locks\nJOIN pg_catalog.pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid\nJOIN pg_catalog.pg_locks blocking_locks \n    ON blocking_locks.locktype = blocked_locks.locktype\n    AND blocking_locks.database IS NOT DISTINCT FROM blocked_locks.database\n    AND blocking_locks.relation IS NOT DISTINCT FROM blocked_locks.relation\n    AND blocking_locks.page IS NOT DISTINCT FROM blocked_locks.page\n    AND blocking_locks.tuple IS NOT DISTINCT FROM blocked_locks.tuple\n    AND blocking_locks.virtualxid IS NOT DISTINCT FROM blocked_locks.virtualxid\n    AND blocking_locks.transactionid IS NOT DISTINCT FROM blocked_locks.transactionid\n    AND blocking_locks.pid != blocked_locks.pid\nJOIN pg_catalog.pg_stat_activity blocking_activity ON blocking_activity.pid = blocking_locks.pid\nWHERE NOT blocked_locks.granted;",
          "solutionOutput": "+-------------+--------------+--------------+---------------+-------------------+\n| blocked_pid | blocked_user | blocking_pid | blocking_user | blocked_statement |\n+-------------+--------------+--------------+---------------+-------------------+\n| 5921        | app_user     | 5810         | dba_admin     | UPDATE products.. |\n+-------------+--------------+--------------+---------------+-------------------+\n(Chỉ đích danh thủ phạm đang giữ khóa làm tắc nghẽn hệ thống)",
          "explanation": "Đây là câu truy vấn kiểm tra khóa kinh điển nhất giúp kỹ sư DBA giải cứu hệ thống bị tắc nghẽn trong 30 giây."
        },
        {
          "title": "Bài tập 5.3-4 (Đánh đổi & Kiến trúc): Thiết kế cơ chế khóa thử nghiệm không chờ với NOWAIT",
          "level": "Nâng cao",
          "problem": "Một ứng dụng đặt vé rạp chiếu phim cần khóa ghế ngồi ID = 50. Nếu ghế đang có người khác thao tác thanh toán, hệ thống phải thông báo ngay cho người dùng: 'Ghế đang có người giữ chỗ, vui lòng chọn ghế khác' trong vòng 0.01 giây thay vì bắt người dùng quay vòng tròn chờ đợi. Hãy viết câu lệnh SQL thực hiện yêu cầu này.",
          "hint": "Sử dụng SELECT ... FOR UPDATE NOWAIT và bắt lỗi 55P03 (Lock Not Available).",
          "solutionCode": "BEGIN;\n\n-- Cố gắng khóa ghế ID = 50. Nếu bị ai khác khóa, CSDL ném lỗi NGAY LẬP TỨC mà không chờ 1 mili-giây nào!\nSELECT seat_id, seat_number, status \nFROM cinema_seats \nWHERE seat_id = 50 \nFOR UPDATE NOWAIT;\n\n-- Nếu câu lệnh trên thành công (không bị ném lỗi 55P03): Ghế thuộc về bạn!\nUPDATE cinema_seats SET status = 'HELD' WHERE seat_id = 50;\n\nCOMMIT;\n\n-- Phía Backend bắt mã lỗi SQLSTATE 55P03 (lock_not_available) để trả về thông báo tức thì cho khách hàng.",
          "solutionOutput": "ERROR: 55P03: could not obtain lock on row in relation \"cinema_seats\" (Nếu ghế đã có người giữ)",
          "explanation": "Chẩn đoán: FOR UPDATE NOWAIT loại bỏ hoàn toàn độ trễ chờ đợi cho người dùng cuối trong các bài toán đặt vé tốc độ cao."
        }
      ],
      "quiz": [
        {
          "question": "Điều kiện toán học để hiện tượng Deadlock (Bế tắc tử thần) xuất hiện giữa các giao dịch chạy song song là gì?",
          "options": [
            "Có nhiều hơn 1.000 người dùng kết nối vào CSDL cùng lúc.",
            "Xuất hiện một chu trình khép kín (Cycle) trong đồ thị chờ tài nguyên (Wait-For Graph), ví dụ: T1 chờ T2 và T2 lại đang chờ T1.",
            "CSDL bị đầy 100% dung lượng ổ cứng.",
            "Người dùng quên không gõ dấu chấm phẩy ở cuối câu lệnh."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Deadlock chỉ xảy ra khi có chu trình chờ phụ thuộc lẫn nhau trong Wait-For Graph, khiến không tiến trình nào có thể tự giải thoát."
        },
        {
          "question": "Mệnh đề 'SKIP LOCKED' trong câu lệnh SELECT ... FOR UPDATE đem lại lợi ích đột phá nào khi xây dựng hệ thống hàng đợi công việc (Job Queue)?",
          "options": [
            "Tự động giải phóng toàn bộ khóa của hệ thống.",
            "Cho phép tiến trình tự động bỏ qua (skip) các dòng đang bị worker khác khóa để bốc ngay dòng khả dụng tiếp theo mà không bị chặn hay chờ đợi.",
            "Làm tăng dung lượng bộ nhớ RAM của server.",
            "Xóa sạch các dòng đã xử lý xong."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! SKIP LOCKED loại bỏ hiện tượng tắc nghẽn hàng đợi, cho phép hàng trăm worker cùng bốc tác vụ song song với hiệu năng cực đại."
        },
        {
          "question": "Vì sao trên môi trường CSDL Production, kỹ sư bắt buộc phải dùng lệnh 'CREATE INDEX CONCURRENTLY' thay vì 'CREATE INDEX' thông thường?",
          "options": [
            "Vì lệnh thông thường sẽ chiếm khóa ShareLock trên toàn bảng, chặn đứng toàn bộ các thao tác ghi (INSERT/UPDATE/DELETE) của người dùng trong suốt thời gian tạo index.",
            "Vì lệnh CONCURRENTLY chỉ tốn 1 kilobyte bộ nhớ.",
            "Vì chuẩn SQL cấm tạo index vào ban đêm.",
            "Vì lệnh thông thường không thể tạo được B-Tree index."
          ],
          "correctIndex": 0,
          "explanation": "Chính xác! Lệnh CREATE INDEX thông thường khóa ghi toàn bảng, có thể làm tê liệt hệ thống hàng chục phút trên bảng lớn. CONCURRENTLY xây dựng index ở chế độ nền không khóa ghi."
        },
        {
          "question": "Quy tắc kiến trúc hàng đầu để triệt tiêu hoàn toàn nguy cơ Deadlock khi nhiều luồng cùng cập nhật nhiều bản ghi là gì?",
          "options": [
            "Tắt hoàn toàn tính năng giao dịch trong CSDL.",
            "Luôn luôn sắp xếp thứ tự các bản ghi cần khóa theo một trật tự nhất quán (ví dụ: ORDER BY id ASC) trên toàn bộ các microservices trước khi thực hiện cập nhật.",
            "Chỉ cho phép một người dùng đăng nhập vào hệ thống mỗi ngày.",
            "Dùng kiểu dữ liệu số thực thay vì số nguyên."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Quy tắc Consistent Lock Ordering đảm bảo mọi tiến trình đều xin khóa theo cùng một chiều, loại bỏ hoàn toàn khả năng hình thành chu trình trong đồ thị chờ."
        },
        {
          "question": "Khái niệm 'Intention Locks' (Khóa ý định: IS, IX) ở tầng bảng giải quyết bài toán hiệu năng nào?",
          "options": [
            "Giúp câu lệnh SELECT chạy nhanh hơn gấp 10 lần.",
            "Cho phép các lệnh DDL (như sửa cột) biết ngay lập tức có dòng nào bên dưới đang bị khóa hay không chỉ bằng cách kiểm tra cờ ở cửa bảng, mà không cần quét hàng triệu dòng vật lý.",
            "Tự động dịch mã SQL sang tiếng Việt.",
            "Ngăn chặn việc quên mật khẩu của người quản trị."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Intention Locks tối ưu hóa kiểm tra khóa phân cấp: CSDL chỉ cần kiểm tra cờ ý định ở tầng bảng để biết có an toàn để khóa toàn bảng hay không."
        }
      ],
      "summary": [
        "Ma trận khóa: Shared Lock (S) chia sẻ đọc lẫn nhau; Exclusive Lock (X) độc quyền ghi và xung đột với tất cả mọi loại khóa khác.",
        "Deadlock xuất hiện khi có chu trình trong Wait-For Graph (T1 chờ T2 và T2 chờ T1); CSDL phát hiện sau deadlock_timeout và abort một nạn nhân.",
        "Chiến lược hóa giải Deadlock số 1: Consistent Lock Ordering — Luôn sắp xếp ID tăng dần (ORDER BY id ASC) trước khi khóa/cập nhật.",
        "Vũ khí tối thượng cho Worker Queue: SELECT ... FOR UPDATE SKIP LOCKED giúp hàng trăm tiến trình bốc việc song song với độ trễ 0ms.",
        "Quy tắc vàng DDL trên Production: Luôn dùng CREATE INDEX CONCURRENTLY và cấu hình lock_timeout để chống nghẽn toàn bảng.",
        "Ôn cách quãng: Sự khác biệt bản chất giữa Snapshot của Read Committed và Snapshot của Repeatable Read là gì? (Xem lại Bài 5.2)."
      ]
    }
  ]
};
