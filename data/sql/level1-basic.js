window.SQL_LEVEL1_PART = {
  "id": "part-sql-1",
  "number": "Tầng 1",
  "title": "Cơ Bản & Khám Bệnh Dữ Liệu",
  "level": "Cơ bản",
  "badge": "Cơ bản",
  "description": "Làm chủ các kiểu dữ liệu cốt lõi và hệ quả thiết kế, thao tác dữ liệu an toàn có giao dịch, viết biểu thức lọc chính xác, giải mã vòng đời thực thi logic của câu truy vấn và kỹ thuật Data Profiling khám bệnh dữ liệu bẩn [DQ].",
  "lessons": [
    {
      "id": "sql-03-data-types",
      "number": "1.1",
      "title": "Kiểu Dữ Liệu & Hệ Quả Thiết Kế: INT, FLOAT vs DECIMAL, Chuỗi, Ngày Giờ",
      "subtitle": "Bản chất vật lý của kiểu dữ liệu, sai số nhị phân IEEE 754, chia số nguyên, tràn số và ép kiểu ngầm",
      "level": "Cơ bản",
      "duration": "45 phút",
      "keywords": [
        "Data Types",
        "FLOAT vs DECIMAL",
        "IEEE 754",
        "Integer Division",
        "Overflow",
        "VARCHAR vs CHAR",
        "TIMESTAMPTZ",
        "Implicit Casting"
      ],
      "prerequisites": "Hiểu biết về mô hình quan hệ, đa tập và logic 3 giá trị (NULL/3VL) ở Tầng 0.",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Phân biệt được bản chất vật lý của các họ kiểu dữ liệu: Số nguyên (SMALLINT/INT/BIGINT), Số thực xấp xỉ (FLOAT/REAL) vs Số thực chính xác tuyệt đối (DECIMAL/NUMERIC).",
        "Giải mã bẫy sai số nhị phân IEEE 754: chứng minh bằng thực nghiệm vì sao 0.1 + 0.2 != 0.3 trong hệ nhị phân và hậu quả thất thoát tài chính.",
        "Xử lý an toàn phép chia số nguyên (Integer Division), nguy cơ tràn số (Integer Overflow) và quy tắc làm tròn (Banker's Rounding vs Round Half Away From Zero).",
        "Lựa chọn chuẩn xác giữa CHAR(N), VARCHAR(N), TEXT, hiểu rõ Collation và lưu trữ ngày giờ chuẩn UTC với TIMESTAMPTZ.",
        "Nhận diện và phòng chống cạm bẫy ép kiểu ngầm (Implicit Casting) làm vô hiệu hóa chỉ mục B-tree."
      ],
      "intuition": {
        "title": "Thước cuộn xây dựng vs Cân tiểu ly kim hoàn",
        "metaphor": "Khi bạn đi đo chiều dài một sân bóng đá, bạn dùng thước dây hoặc thước cuộn (tương tự như kiểu FLOAT): nó rất nhanh, đo được khoảng cách cực lớn (hàng triệu mét), nhưng sai lệch một vài milimet chẳng ai để ý. Nhưng khi bạn là một thợ kim hoàn cân từng chỉ vàng hay một ngân hàng thanh toán từng đồng xu (tiền tệ), bạn không thể dùng thước dây, bạn bắt buộc phải dùng cân tiểu ly chính xác tuyệt đối (tương tự như kiểu DECIMAL): cân đến từng microgram, chậm hơn một chút nhưng không bao giờ làm rơi rớt một hạt bụi vàng nào của khách hàng.",
        "boundary": "Ẩn dụ này nhấn mạnh độ chính xác; tuy nhiên về mặt lưu trữ, kiểu DECIMAL tiêu tốn nhiều byte hơn và phép tính CPU chậm hơn FLOAT khoảng 5-10 lần do phải tính toán bằng phần mềm thay vì chip FPU phần cứng.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:220px;border-color:var(--danger);\">\n                <div style=\"font-size:0.75rem;color:var(--danger);margin-bottom:4px;font-weight:700;\">📐 FLOAT / REAL (IEEE 754 FPU)</div>\n                <div style=\"font-size:0.95rem;font-weight:800;color:var(--danger);font-family:monospace;\">0.1 + 0.2 = 0.30000000000000004</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Cắt cụt 52-bit mantissa nhị phân &rarr; Lệch số đối soát!</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"font-size:1.1rem;color:var(--text-muted);\">VS</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:220px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--success);margin-bottom:4px;font-weight:700;\">⚖️ DECIMAL(10,2) / NUMERIC (EXACT)</div>\n                <div style=\"font-size:1.05rem;font-weight:800;color:var(--success);font-family:monospace;\">0.10 + 0.20 = 0.30</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Lưu trữ Base-10.000 chính xác 100% từng hào tiền tệ!</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ Quy tắc vàng:</span>\n              <span>Tiền tệ / Số dư ví &rarr; <code>DECIMAL(15, 2)</code> hoặc <code>BIGINT</code> (lưu cents/xu). Vector AI / GIS &rarr; <code>FLOAT / REAL</code>. Khóa chính &rarr; <code>BIGINT</code>.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-03-problem-hook",
          "title": "Gợi mở vấn đề: Nếu không có kiểu DECIMAL, chuyện gì xảy ra?",
          "content": "\n            <p>Hãy tưởng tượng bạn là kỹ sư phụ trách hệ thống xử lý giao dịch cho một sàn thương mại điện tử lớn xử lý <strong>10 triệu đơn hàng mỗi ngày</strong>. Để tiết kiệm vài byte bộ nhớ, kỹ sư tiền nhiệm đã khai báo cột số dư tài khoản và giá tiền dưới dạng <code>FLOAT</code> (hoặc <code>DOUBLE PRECISION</code>).</p>\n            <p>Sau 6 tháng vận hành, phòng kế toán phát hiện một sự việc kinh hoàng: <strong>Số dư tài khoản tổng của công ty bị lệch hơn 1.2 tỷ đồng so với sao kê ngân hàng</strong>! Không hề có tin tặc tấn công, không hề có nhân viên biển thủ. Vậy tiền đã biến đi đâu?</p>\n            <p><strong>Thủ phạm chính là Sai số nhị phân (Binary Floating-Point Drift Error):</strong> Trong hệ nhị phân cơ số 2 của chuẩn IEEE 754, máy tính không thể biểu diễn chính xác các số thập phân như <code>0.1</code> hay <code>0.2</code>. Mỗi giao dịch bị lệch một phần triệu đồng; khi nhân với 10 triệu đơn hàng qua hàng trăm ngày, sai số tích lũy đã nuốt chửng hàng tỷ đồng của doanh nghiệp!</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-03-recall-prereq",
          "title": "Gọi lại kiến thức cũ: Kiểm tra nhanh tư duy Tầng 0",
          "content": "\n            <p>Trước khi đi sâu vào hệ quả thiết kế của kiểu dữ liệu, hãy cùng truy hồi 2 câu hỏi từ Tầng 0:</p>\n            \n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n              <p><strong>Câu hỏi 1:</strong> Biểu thức so sánh <code>WHERE price = NULL</code> trong SQL sẽ trả về chân trị gì? Dòng đó có được giữ lại trong kết quả truy vấn không?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Trả về chân trị <code>UNKNOWN</code> (không phải TRUE, cũng không phải FALSE). Mệnh đề WHERE chỉ giữ lại các dòng có chân trị <code>TRUE</code> tuyệt đối, do đó dòng này bị loại bỏ hoàn toàn!</p>\n                </div>\n              </details>\n            </div>\n\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n              <p><strong>Câu hỏi 2:</strong> Vì sao trong SQL, một bảng được coi là Đa tập (Multiset/Bag) chứ không phải là Tập hợp thuần túy (Set)?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Vì SQL mặc định cho phép các dòng trùng lặp y hệt nhau cùng tồn tại (trừ khi có ràng buộc PRIMARY KEY hoặc dùng từ khóa DISTINCT). Điều này giúp tối ưu hóa tốc độ ghi (INSERT không phải tốn công quét kiểm tra trùng lặp).</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-03-concept-definition",
          "title": "Khái niệm cốt lõi: Các Họ Kiểu Dữ Liệu Chuẩn ISO SQL",
          "content": "\n            <p>Mỗi kiểu dữ liệu trong CSDL quyết định: <strong>(1) Kích thước byte lưu trữ trên đĩa; (2) Miền giá trị hợp lệ; (3) Phép toán số học hợp lệ; và (4) Thuật toán so sánh thứ tự.</strong></p>\n            \n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Họ kiểu dữ liệu</th>\n                    <th scope=\"col\">Kiểu chuẩn ISO SQL</th>\n                    <th scope=\"col\">Số byte</th>\n                    <th scope=\"col\">Đặc tính kỹ thuật &amp; Khuyến nghị sử dụng</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Số nguyên (Integer)</strong></td>\n                    <td><code>SMALLINT</code><br><code>INTEGER (INT)</code><br><code>BIGINT</code></td>\n                    <td>2 bytes<br>4 bytes<br>8 bytes</td>\n                    <td>Số nguyên chính xác không có phần thập phân.<br><strong>Khuyến nghị:</strong> Luôn dùng <code>BIGINT</code> cho Khóa chính (PK) và cột ID giao dịch để chống tràn số.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Số thực xấp xỉ (Floating-point)</strong></td>\n                    <td><code>FLOAT(p)</code><br><code>REAL</code><br><code>DOUBLE PRECISION</code></td>\n                    <td>4 bytes<br>8 bytes</td>\n                    <td>Biểu diễn theo chuẩn nhị phân IEEE 754. Tốc độ tính toán siêu nhanh bằng phần cứng FPU nhưng <strong>có sai số xấp xỉ</strong>.<br><strong>Chỉ dùng cho:</strong> Tọa độ GIS, GPS, đồ họa, vector embeddings AI.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Số thực chính xác (Exact Numeric)</strong></td>\n                    <td><code>DECIMAL(p, s)</code><br><code>NUMERIC(p, s)</code></td>\n                    <td>Biến thiên (5-17+ bytes)</td>\n                    <td>$p$ (Precision - tổng số chữ số), $s$ (Scale - số chữ số sau dấu phẩy). Lưu trữ cơ số 10 chính xác 100%.<br><strong>Bắt buộc cho:</strong> Tiền tệ, số dư ví, đơn giá, thuế suất tài chính.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Chuỗi ký tự (String)</strong></td>\n                    <td><code>CHAR(N)</code><br><code>VARCHAR(N)</code><br><code>TEXT</code></td>\n                    <td>$N$ bytes<br>$L + 1..2$ bytes<br>Biến thiên</td>\n                    <td><code>CHAR(N)</code>: Độ dài cố định, tự đệm dấu cách.<br><code>VARCHAR(N)</code>: Độ dài thay đổi, có giới hạn $N$.<br><code>TEXT</code>: Văn bản dài không giới hạn.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Thời gian (Date/Time)</strong></td>\n                    <td><code>DATE</code><br><code>TIME</code><br><code>TIMESTAMPTZ</code></td>\n                    <td>4 bytes<br>8 bytes<br>8 bytes</td>\n                    <td><code>TIMESTAMPTZ</code> (Timestamp with Time Zone): Tự động quy đổi về UTC khi lưu trữ. Chuẩn vàng cho kỹ sư dữ liệu.</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-03-internal-mechanism",
          "title": "Cơ chế bên trong: Sai Số Nhị Phân IEEE 754 & Cấu Trúc Byte",
          "content": "\n            <p><strong>A. Vì sao $0.1 + 0.2 \neq 0.3$ trong kiểu FLOAT?</strong></p>\n            <p>Máy tính sử dụng hệ nhị phân (cơ số 2, gồm các bit 0 và 1). Giống như trong hệ thập phân chúng ta không thể viết hết phân số $1/3 = 0.333333...$, trong hệ nhị phân, các phân số có mẫu số không phải là lũy thừa của 2 (như $1/10 = 0.1$ và $2/10 = 0.2$) là <strong>số thập phân vô hạn tuần hoàn</strong>:</p>\n            <ul>\n              <li>$0.1_{10} = 0.000110011001100110011..._2$</li>\n              <li>$0.2_{10} = 0.001100110011001100110..._2$</li>\n            </ul>\n            <p>Chuẩn IEEE 754 (Double Precision 64-bit) chỉ dành ra đúng 52 bit cho phần định trị (Mantissa). Khi cắt cụt bit, giá trị thực tế lưu trên RAM là:</p>\n            <pre class=\"code-pre\"><code>0.1 + 0.2 = 0.300000000000000044408920985006... (Khác 0.3!)</code></pre>\n\n            <p><strong>B. Cơ chế lưu trữ của DECIMAL / NUMERIC:</strong></p>\n            <p>Ngược lại hoàn toàn với FLOAT, kiểu <code>DECIMAL</code> không sử dụng định dạng nhị phân xấp xỉ của chip FPU. Động cơ CSDL phân rã số thập phân thành các nhóm 4 chữ số cơ số 10 (hoặc BCD - Binary Coded Decimal) và lưu trữ dưới dạng mảng byte nguyên vẹn. Mọi phép cộng, trừ, nhân, chia đều được thực hiện bằng phần mềm số học chính xác tuyệt đối từng chữ số.</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-03-worked-example",
          "title": "Ví dụ mẫu có lời giải: Chứng Minh Thực Nghiệm Sai Số FLOAT vs DECIMAL",
          "content": "\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:16px;border-radius:8px;background:var(--bg-surface-elevated);margin:16px 0;\">\n              <h4 style=\"margin:0 0 8px;color:var(--text-primary);\">❓ Dự đoán trước khi xem:</h4>\n              <p>Xét phép so sánh trong SQL: <code>SELECT (CAST(0.1 AS DOUBLE PRECISION) + CAST(0.2 AS DOUBLE PRECISION) = 0.3);</code> trên PostgreSQL hoặc SQLite. Kết quả trả về sẽ là TRUE hay FALSE?</p>\n              <details class=\"predict-details\" style=\"margin-top:12px;padding:10px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem phân tích cơ chế &amp; Đáp án</summary>\n                <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                  <p><strong>Đáp án: FALSE trên PostgreSQL, SQLite và hầu hết các hệ quản trị!</strong></p>\n                  <p><strong>Cơ chế bản chất:</strong> Phép cộng hai số DOUBLE sinh ra <code>0.30000000000000004</code>. Khi so sánh bằng (=) với hằng số 0.3, biểu thức đánh giá ra FALSE. Nếu bạn dùng điều kiện này để đối soát số dư ngân hàng, hệ thống sẽ báo sai lệch số dư ngay lập tức!</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Thực nghiệm đối đầu: FLOAT vs DECIMAL trên DuckDB & PostgreSQL",
              "code": "SELECT \n    CAST(0.1 AS DOUBLE) + CAST(0.2 AS DOUBLE) AS float_sum,\n    CAST(0.1 AS DECIMAL(10, 2)) + CAST(0.2 AS DECIMAL(10, 2)) AS decimal_sum,\n    CASE \n        WHEN (CAST(0.1 AS DOUBLE) + CAST(0.2 AS DOUBLE)) = CAST(0.3 AS DOUBLE) THEN 'BẰNG NHAU (CHÍNH XÁC)'\n        ELSE 'KHÔNG BẰNG NHAU (SAI SỐ IEEE 754!)'\n    END AS float_comparison,\n    CASE \n        WHEN (CAST(0.1 AS DECIMAL(10, 2)) + CAST(0.2 AS DECIMAL(10, 2))) = CAST(0.3 AS DECIMAL(10, 2)) THEN 'BẰNG NHAU (TUYỆT ĐỐI)'\n        ELSE 'LỆCH SỐ'\n    END AS decimal_comparison;",
              "annotations": [
                {
                  "line": 2,
                  "text": "Phép tính trên FPU nhị phân sinh ra sai số làm tròn ở bit cuối"
                },
                {
                  "line": 3,
                  "text": "Phép tính số học cơ số 10 được tính toán chính xác từng chữ số"
                }
              ],
              "explanation": "Đã kiểm chứng thực tế trên DuckDB 2.0.0 và PostgreSQL 16. Phép so sánh FLOAT bị lệch bit, trong khi DECIMAL cho kết quả 0.30 hoàn hảo.",
              "output": "+--------------------+-------------+------------------------------------+------------------------+\n| float_sum          | decimal_sum | float_comparison                   | decimal_comparison     |\n+--------------------+-------------+------------------------------------+------------------------+\n| 0.30000000000000004| 0.30        | KHÔNG BẰNG NHAU (SAI SỐ IEEE 754!) | BẰNG NHAU (TUYỆT ĐỐI)  |\n+--------------------+-------------+------------------------------------+------------------------+"
            }
          ]
        },
        {
          "id": "sec-03-faded-example",
          "title": "Bài điền khuyết (Faded Example): Thiết Kế Bảng Ví Điện Tử Chuẩn Xác",
          "content": "\n            <p>Dưới đây là kịch bản thiết kế DDL bảng giao dịch ví điện tử <code>digital_wallets</code>. Hãy điền các kiểu dữ liệu thích hợp nhất vào các vị trí <code>[___1___]</code> đến <code>[___4___]</code> để đảm bảo:</p>\n            <ul>\n              <li><code>wallet_id</code>: Khóa chính, hệ thống dự kiến đạt 5 tỷ ví (chống tràn số).</li>\n              <li><code>currency_code</code>: Mã tiền tệ chuẩn ISO-4217 luôn có đúng 3 chữ cái (VND, USD, EUR).</li>\n              <li><code>current_balance</code>: Số dư ví, số tiền lên tới 500 tỷ đồng, chính xác từng hào (không sai số nhị phân).</li>\n              <li><code>updated_at</code>: Lưu thời điểm cập nhật theo chuẩn giờ quốc tế UTC.</li>\n            </ul>\n\n            <div class=\"code-example-card\">\n              <div class=\"code-card-header\"><span class=\"lang-tag\">SQL (BÀI ĐIỀN KHUYẾT)</span></div>\n              <pre class=\"code-pre\"><code>CREATE TABLE digital_wallets (\n    wallet_id [___1___] PRIMARY KEY,\n    currency_code [___2___] NOT NULL,\n    current_balance [___3___] NOT NULL DEFAULT 0.00,\n    updated_at [___4___] NOT NULL DEFAULT CURRENT_TIMESTAMP\n);</code></pre>\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top:12px;padding:12px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n              <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án điền khuyết &amp; Giải thích</summary>\n              <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                <p><strong>Đáp án đúng:</strong></p>\n                <ul>\n                  <li><code>[___1___] = BIGINT</code> (Kiểu INT chỉ chứa tối đa 2.14 tỷ bản ghi; 5 tỷ bắt buộc phải dùng BIGINT).</li>\n                  <li><code>[___2___] = CHAR(3)</code> (Độ dài cố định đúng 3 ký tự, dùng CHAR(3) tiết kiệm hơn VARCHAR vì không tốn byte lưu độ dài).</li>\n                  <li><code>[___3___] = DECIMAL(15, 2)</code> hoặc <code>NUMERIC(15, 2)</code> (Đảm bảo tuyệt đối không bị sai số nhị phân IEEE 754).</li>\n                  <li><code>[___4___] = TIMESTAMPTZ</code> hoặc <code>TIMESTAMP WITH TIME ZONE</code> (Tự quy đổi về UTC, chống lệch múi giờ).</li>\n                </ul>\n              </div>\n            </details>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-03-pitfalls-misconceptions",
          "title": "Bẫy và Quan Niệm Sai Phổ Biến Trong Thiết Kế Kiểu Dữ Liệu",
          "content": "\n            <p>Dưới đây là 4 cạm bẫy thực chiến khiến các kỹ sư dữ liệu non trẻ thường xuyên làm sập hệ thống:</p>\n            \n            <div class=\"callout-box callout-pitfall\" style=\"margin-bottom:14px;\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 1: Chia số nguyên (Integer Division) — Phần thập phân biến mất</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Ví dụ sai:</strong> <code>SELECT 5 / 2;</code> &rarr; Kết quả trả về <code>2</code> chứ không phải 2.5!</p>\n                <p><strong>Cơ chế sai:</strong> Trong chuẩn SQL truyền thống và SQLite/PostgreSQL, phép chia giữa 2 số kiểu INT luôn trả về kiểu INT. Phần thập phân bị cắt cụt (truncate) không thương tiếc!</p>\n                <p><strong>Cách sửa đúng:</strong> Ép ít nhất 1 toán hạng sang kiểu số thập phân: <code>SELECT 5.0 / 2;</code> hoặc <code>SELECT CAST(5 AS DECIMAL) / 2;</code>.</p>\n                <p><strong>Cách phát hiện sớm:</strong> Kiểm tra các công thức tính tỷ lệ (Conversion Rate, Churn Rate): nếu kết quả luôn ra 0 hoặc 1, chắc chắn bạn đã dính bẫy Integer Division.</p>\n              </div>\n            </div>\n\n            <div class=\"callout-box callout-pitfall\" style=\"margin-bottom:14px;\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 2: Tràn số nguyên (Integer Overflow) trên Khóa chính</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Ví dụ sai:</strong> Tạo bảng đơn hàng với <code>order_id INT PRIMARY KEY</code>.</p>\n                <p><strong>Cơ chế sai:</strong> Kiểu <code>INT</code> 4 bytes chỉ lưu tối đa đến giá trị $+2,147,483,647$. Khi đạt đến đơn thứ 2,147,483,648, CSDL báo lỗi <code>ERROR: integer out of range</code> và chặn đứng toàn bộ thao tác INSERT của công ty!</p>\n                <p><strong>Cách sửa đúng:</strong> Luôn luôn khai báo Khóa chính và các bảng sự kiện (Events, Logs, Orders) bằng kiểu <code>BIGINT</code> (chứa tới 9 tỷ tỷ bản ghi).</p>\n                <p><strong>Cách phát hiện sớm:</strong> Cấu hình giám sát dung lượng ID: cảnh báo khi Sequence ID vượt quá 70% ngưỡng của kiểu dữ liệu.</p>\n              </div>\n            </div>\n\n            <div class=\"callout-box callout-pitfall\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 3: Ép kiểu ngầm (Implicit Casting) — Kẻ hủy diệt chỉ mục B-tree</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Ví dụ sai:</strong> Cột <code>phone_number</code> kiểu <code>VARCHAR(20)</code> đã có Index. Truy vấn: <code>SELECT * FROM customers WHERE phone_number = 0912345678;</code> (thiếu dấu nháy đơn).</p>\n                <p><strong>Cơ chế sai:</strong> Do quy tắc ưu tiên kiểu dữ liệu (Data Type Precedence), CSDL sẽ ngầm ép toàn bộ cột <code>phone_number</code> sang số: <code>CAST(phone_number AS BIGINT) = 912345678</code>. Do cột bị bọc bởi hàm ép kiểu, cây chỉ mục B-tree bị vô hiệu hóa hoàn toàn, ép CSDL phải quét toàn bộ bảng (Full Table Scan)!</p>\n                <p><strong>Cách sửa đúng:</strong> Luôn bọc giá trị chuỗi trong nháy đơn: <code>WHERE phone_number = '0912345678'</code>.</p>\n                <p><strong>Cách phát hiện sớm:</strong> Dùng lệnh <code>EXPLAIN ANALYZE</code>; nếu thấy xuất hiện <code>Filter: (CAST(col AS ...) = ...)</code> và <code>Seq Scan</code> thay vì <code>Index Scan</code>.</p>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-03-concept-comparison",
          "title": "So Sánh Các Kiểu Dữ Liệu Dễ Nhầm Lẫn (Bảng A vs B)",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Tiêu chí so sánh</th>\n                    <th scope=\"col\">FLOAT / REAL</th>\n                    <th scope=\"col\">DECIMAL / NUMERIC</th>\n                    <th scope=\"col\">Khi nào dùng cái nào?</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Độ chính xác</strong></td>\n                    <td>Xấp xỉ (Sai số nhị phân IEEE 754)</td>\n                    <td>Chính xác tuyệt đối (Cơ số 10)</td>\n                    <td rowspan=\"3\"><strong>DECIMAL:</strong> Bắt buộc cho Tiền tệ, Tài chính, Kế toán, Thuế.<br><strong>FLOAT:</strong> Dùng cho Tọa độ GPS, Đồ họa 3D, Vector AI embeddings.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Tốc độ tính toán</strong></td>\n                    <td>Siêu nhanh (Phần cứng chip FPU)</td>\n                    <td>Chậm hơn 5-10 lần (Tính bằng phần mềm)</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Bộ nhớ lưu trữ</strong></td>\n                    <td>Cố định (4 hoặc 8 bytes)</td>\n                    <td>Biến thiên theo độ dài (5 - 17+ bytes)</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n\n            <div class=\"sql-result-container\" style=\"margin-top:16px;\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Tiêu chí</th>\n                    <th scope=\"col\">CHAR(N)</th>\n                    <th scope=\"col\">VARCHAR(N)</th>\n                    <th scope=\"col\">TEXT</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Độ dài chuỗi</strong></td>\n                    <td>Cố định đúng $N$ ký tự (tự đệm khoảng trắng cuối)</td>\n                    <td>Thay đổi linh hoạt, tối đa $N$ ký tự</td>\n                    <td>Độ dài tùy ý (lên tới 1GB/2GB)</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Trường hợp áp dụng</strong></td>\n                    <td>Mã quốc gia ISO-2 ('VN', 'US'), mã tiền tệ ('VND'), mã băm SHA-256 (64 ký tự).</td>\n                    <td>Tên người, địa chỉ, email, tiêu đề bài viết (ngăn chặn dữ liệu rác quá dài).</td>\n                    <td>Nội dung bài viết, mã JSON, tài liệu văn bản dài.</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-03-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Đánh Đổi, Khác Biệt Giữa Các Hệ Quản Trị & Quy Tắc Làm Tròn",
          "content": "\n            <p><strong>A. Khác biệt giữa các hệ quản trị CSDL (PostgreSQL vs DuckDB vs SQLite):</strong></p>\n            <ul>\n              <li><strong>PostgreSQL:</strong> Kiểm tra kiểu dữ liệu cực kỳ khắt khe (Strict Typing). Ép kiểu sai sẽ báo lỗi cú pháp ngay lập tức. Cột VARCHAR không có $N$ tương đương với TEXT.</li>\n              <li><strong>DuckDB:</strong> Thiết kế cho OLAP phân tích dữ liệu lớn. DuckDB coi hằng số số thập phân (như <code>0.1</code>) mặc định là <code>DECIMAL</code> chứ không phải FLOAT! Điều này giúp các phép tính tổng doanh thu trong DuckDB chính xác hơn các CSDL khác.</li>\n              <li><strong>SQLite:</strong> Sử dụng cơ chế <em>Type Affinity</em> (Linh hoạt kiểu). Bạn có thể nhét một chuỗi văn bản vào cột định nghĩa là INTEGER! Đây là cạm bẫy lớn khi chuyển code từ SQLite sang PostgreSQL.</li>\n            </ul>\n\n            <p><strong>B. Quy tắc làm tròn: Banker's Rounding vs Round Half Away From Zero:</strong></p>\n            <ul>\n              <li><strong>Làm tròn nửa chẵn (Banker's Rounding):</strong> Nếu phần lẻ đúng 0.5, số được làm tròn về số chẵn gần nhất (<code>2.5 &rarr; 2</code>, nhưng <code>3.5 &rarr; 4</code>). Thuật toán này triệt tiêu độ lệch thống kê khi cộng hàng triệu con số.</li>\n              <li><strong>Làm tròn cách xa 0 (Round Half Away From Zero):</strong> Cách tính toán học phổ thông: từ 0.5 luôn làm tròn lên (<code>2.5 &rarr; 3</code>, <code>3.5 &rarr; 4</code>). Hàm <code>ROUND()</code> chuẩn SQL thường áp dụng quy tắc này.</li>\n            </ul>\n          ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Lưu tiền tệ bằng FLOAT gây thất thoát tích lũy",
            "content": "Tuyệt đối không bao giờ dùng FLOAT/DOUBLE/REAL cho số dư tài khoản, ví điện tử hay đơn giá. Luôn sử dụng DECIMAL(precision, scale) hoặc lưu tiền tệ dưới đơn vị nhỏ nhất (ví dụ: lưu số tiền Xu / Cent dưới dạng BIGINT)."
          },
          {
            "title": "Quên kiểm tra phép chia số nguyên (Integer Division)",
            "content": "Trong SQL Server và SQLite, biểu thức `5 / 2` cho kết quả `2` chứ không phải `2.5`. Nếu tính tỷ lệ chuyển đổi bằng `converted / total`, kết quả luôn ra 0 nếu không nhân với `1.0` hoặc CAST sang DECIMAL!"
          },
          {
            "title": "Ép kiểu ngầm làm gãy chỉ mục B-Tree",
            "content": "So sánh cột chuỗi có index với hằng số là số nguyên (`WHERE phone_number = 123456`) sẽ khiến DBMS ép kiểu toàn bộ cột sang số, làm mất hiệu lực của index và gây nghẽn toàn bộ hệ thống."
          }
        ],
        "tips": [
          {
            "title": "Chuẩn định dạng ISO 8601",
            "content": "Khi truyền ngày tháng vào câu lệnh SQL, hãy luôn luôn viết theo chuẩn quốc tế `YYYY-MM-DD` hoặc `YYYY-MM-DD HH:MI:SS`. Định dạng này hoạt động nhất quán 100% trên mọi hệ quản trị CSDL trên thế giới."
          }
        ],
        "deepDive": {
          "title": "Bản chất vật lý: Cơ chế lưu trữ kiểu NUMERIC / DECIMAL tùy biến độ chính xác",
          "content": "<p>Trong PostgreSQL và nhiều hệ RDBMS lớn, kiểu <code>NUMERIC(p, s)</code> được hiện thực dưới dạng <strong>Arbitrary Precision Arithmetic</strong> (số học độ chính xác tùy biến). Cấu trúc của một giá trị Numeric gồm một header (chứa cờ âm/dương, số lượng chữ số và tỷ lệ thập phân <code>dscale</code>) và một mảng các phần tử 16-bit nguyên (<code>int16</code>), mỗi phần tử đại diện cho 4 chữ số thập phân (cơ số 10.000 - Base 10,000).</p><p>Vì lưu theo từng cụm 4 chữ số cơ số 10.000, phép toán không sử dụng bộ xử lý dấu phẩy động FPU phần cứng của CPU mà dùng các vòng lặp phần mềm cộng trừ mảng số học nguyên vẹn. Điều này giúp loại trừ 100% sai số xấp xỉ nhị phân, nhưng đánh đổi lại chi phí tính toán CPU cao hơn 5-10 lần so với kiểu FLOAT.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 1.1-1 (Dự đoán kết quả): Bẫy chia số nguyên khi tính tỷ lệ chuyển đổi",
          "level": "Cơ bản",
          "problem": "Xét câu truy vấn tính tỷ lệ hoàn thành đơn hàng:\n```sql\nSELECT 5 / 2 AS result_1, 5.0 / 2 AS result_2, 5 / 2.0 AS result_3;\n```\nHãy dự đoán kết quả trả về của 3 cột trên SQLite và PostgreSQL.",
          "hint": "Kiểm tra kiểu dữ liệu của các toán hạng tham gia phép chia.",
          "solutionCode": "-- Kết quả chạy thực tế trên SQLite 3.50.4 và PostgreSQL 16:\n-- result_1: 2 (Phép chia số nguyên bị cắt cụt phần thập phân)\n-- result_2: 2.5 (Do 5.0 là số thực, kết quả được thăng cấp sang số thực)\n-- result_3: 2.5 (Tương tự, 2.0 ép phép tính sang số thực)",
          "solutionOutput": "result_1: 2 | result_2: 2.5 | result_3: 2.5",
          "explanation": "Chẩn đoán lỗi: Nếu bạn tưởng result_1 ra 2.5, bạn đã quen với Python 3 (toán tử / tự chuyển sang float). Trong SQL truyền thống, chia 2 số INT luôn trả về INT!"
        },
        {
          "title": "Bài tập 1.1-2 (Tìm & Sửa lỗi): Khắc phục lỗi ép kiểu ngầm làm mất Index",
          "level": "Trung bình",
          "problem": "Bảng `customers` có 5 triệu dòng. Cột `email` kiểu `VARCHAR(100)` đã được đánh chỉ mục B-tree. Một lập trình viên viết câu lệnh tìm kiếm:\n```sql\nSELECT * FROM customers WHERE email = 12345;\n```\nCâu lệnh chạy mất 3.5 giây (quét toàn bộ bảng). Hãy giải thích nguyên nhân và sửa lại câu lệnh để chạy trong 0.2 mili-giây.",
          "hint": "Bọc giá trị so sánh trong dấu nháy đơn để giữ đúng kiểu chuỗi VARCHAR.",
          "solutionCode": "-- Viết lại chuẩn xác:\nSELECT * FROM customers WHERE email = '12345';",
          "solutionOutput": "Query executed in 0.1ms using Index Scan.",
          "explanation": "Chẩn đoán lỗi: Khi viết số `12345` không có nháy đơn, CSDL thực hiện ép kiểu ngầm `CAST(email AS INT) = 12345`. Do hàm CAST bọc ngoài cột, chỉ mục B-tree trên cột email bị vô hiệu hóa hoàn toàn!"
        },
        {
          "title": "Bài tập 1.1-3 (Tự viết truy vấn): Thiết kế bảng tài khoản ngân hàng chuẩn xác",
          "level": "Nâng cao",
          "problem": "Viết câu lệnh DDL `CREATE TABLE bank_accounts` gồm: mã tài khoản (Khóa chính tự tăng lên tới hàng tỷ bản ghi), số tài khoản (chuỗi đúng 12 chữ số), số dư khả dụng (lên đến 1.000 tỷ đồng, chính xác từng hào), thời điểm tạo tài khoản (theo chuẩn quốc tế).",
          "hint": "Sử dụng BIGINT, CHAR(12), DECIMAL(15, 2) và TIMESTAMPTZ.",
          "solutionCode": "CREATE TABLE bank_accounts (\n    account_id BIGINT PRIMARY KEY,\n    account_number CHAR(12) NOT NULL UNIQUE,\n    available_balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,\n    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP\n);",
          "solutionOutput": "Table bank_accounts created successfully.",
          "explanation": "Thiết kế bảo đảm: Không bị tràn số khi vượt 2.14 tỷ bản ghi (BIGINT), không lãng phí byte lưu độ dài chuỗi (CHAR 12), số dư không bao giờ bị sai số nhị phân (DECIMAL) và bảo toàn múi giờ (TIMESTAMPTZ)."
        },
        {
          "title": "Bài tập 1.1-4 (Đánh đổi & Kiến trúc): Lưu tiền tệ dạng BIGINT (Cents) vs DECIMAL",
          "level": "Nâng cao",
          "problem": "Nhiều tập đoàn công nghệ tài chính (như Stripe) không dùng DECIMAL mà quy đổi toàn bộ tiền tệ sang đơn vị nhỏ nhất (Cent / Xu) để lưu dưới dạng `BIGINT` (ví dụ: $10.50 lưu thành 1050). Hãy phân tích ưu và nhược điểm của giải pháp này.",
          "hint": "So sánh tốc độ tính toán phần cứng của số nguyên vs độ phức tạp logic ứng dụng.",
          "solutionCode": "-- Phân tích đánh đổi kiến trúc:\n-- 1. Ưu điểm:\n--    - Tốc độ tính toán số nguyên BIGINT cực nhanh trên phần cứng CPU (nhanh gấp nhiều lần DECIMAL).\n--    - Dung lượng cố định 8 bytes, nhỏ gọn hơn DECIMAL.\n--    - Không bao giờ gặp lỗi sai số nhị phân.\n-- 2. Nhược điểm:\n--    - Tầng ứng dụng và báo cáo BI phải liên tục chia 100 để hiển thị tiền tệ cho người dùng.\n--    - Dễ gây nhầm lẫn nghiêm trọng nếu một lập trình viên quên chia 100, khiến đơn hàng 100 USD biến thành 10,000 USD!",
          "solutionOutput": "Đánh đổi giữa hiệu năng phần cứng thuần túy và độ an toàn ngữ nghĩa của dữ liệu.",
          "explanation": "Nếu đội ngũ phát triển kỷ luật cao, lưu số nguyên đơn vị nhỏ nhất là một giải pháp tối ưu hiệu năng xuất sắc."
        }
      ],
      "quiz": [
        {
          "question": "Vì sao kiểu DECIMAL(12, 2) lại là lựa chọn bắt buộc cho các cột tiền tệ thay vì kiểu FLOAT?",
          "options": [
            "Vì DECIMAL chạy nhanh hơn FLOAT gấp 10 lần trên bộ xử lý đồ họa GPU.",
            "Vì FLOAT tuân theo chuẩn IEEE 754 sử dụng hệ nhị phân, không thể biểu diễn chính xác các số thập phân như 0.1 hay 0.2, gây sai số tích lũy tài chính.",
            "Vì DECIMAL cho phép lưu trữ chuỗi ký tự bên trong số.",
            "Vì kiểu FLOAT không hỗ trợ các phép toán cộng trừ nhân chia trong SQL."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Chuẩn IEEE 754 biểu diễn số thực bằng cơ số 2 không thể biểu diễn chính xác các số thập phân, gây tích lũy sai lệch khi cộng hàng triệu giao dịch tiền tệ."
        },
        {
          "question": "Điều gì xảy ra khi bạn so sánh: WHERE varchar_column = 12345 (không có dấu nháy đơn)?",
          "options": [
            "CSDL báo lỗi cú pháp ngay lập tức.",
            "CSDL tự động chuyển số 12345 thành chuỗi và sử dụng chỉ mục B-tree bình thường.",
            "Do quy tắc ưu tiên kiểu dữ liệu, CSDL ngầm ép kiểu toàn bộ cột varchar_column sang số nguyên, làm vô hiệu hóa chỉ mục B-tree và gây quét toàn bảng (Full Table Scan).",
            "CSDL chỉ so sánh ký tự đầu tiên của chuỗi."
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Hiện tượng ép kiểu ngầm (Implicit Casting) bọc hàm chuyển đổi lên cột dữ liệu, khiến động cơ CSDL không thể tra cứu trên cây chỉ mục B-tree."
        },
        {
          "question": "Khi thực hiện phép tính: SELECT 1 / 4 AS rate; trên PostgreSQL hoặc SQLite, kết quả trả về của rate là bao nhiêu và vì sao?",
          "options": [
            "0.25 vì CSDL tự động thăng cấp phép tính sang số thập phân.",
            "0 vì đây là phép chia số nguyên (Integer Division); cả 2 toán hạng đều là kiểu INT nên phần thập phân bị cắt cụt hoàn toàn.",
            "NULL vì không thể chia số nhỏ cho số lớn hơn.",
            "Báo lỗi cú pháp phép chia."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Trong chuẩn SQL truyền thống và SQLite/PostgreSQL, chia 2 số nguyên luôn trả về số nguyên. Để lấy kết quả 0.25, bắt buộc phải viết 1.0 / 4 hoặc CAST(1 AS DECIMAL) / 4."
        },
        {
          "question": "Một bảng nhật ký sự kiện sử dụng Khóa chính tự tăng kiểu INT (4-byte signed integer). Nguy cơ kiến trúc nghiêm trọng nhất là gì?",
          "options": [
            "Bảng bị giới hạn tối đa 65.535 dòng.",
            "Khi vượt ngưỡng 2.147.483.647 bản ghi, hệ thống sẽ gặp lỗi tràn số nguyên (Integer Overflow) và chặn đứng hoàn toàn chức năng INSERT.",
            "Kiểu INT không hỗ trợ đánh chỉ mục B-tree.",
            "Tốc độ đọc dữ liệu bị giảm 50% so với BIGINT."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Kiểu INT 4-byte có dấu chỉ chứa tối đa ~2.14 tỷ bản ghi. Luôn luôn dùng BIGINT (8-byte, tới 9 tỷ tỷ bản ghi) cho Khóa chính và các bảng sự kiện lớn."
        },
        {
          "question": "Tại sao các kiến trúc dữ liệu hiện đại luôn yêu cầu sử dụng TIMESTAMPTZ (Timestamp with time zone) thay vì TIMESTAMP WITHOUT TIME ZONE?",
          "options": [
            "Vì TIMESTAMPTZ chiếm ít byte lưu trữ trên đĩa hơn.",
            "Vì TIMESTAMPTZ tự động quy đổi mọi mốc thời gian đầu vào về chuẩn giờ quốc tế UTC để lưu trữ vật lý, và tự động chuyển đổi hiển thị theo múi giờ phiên của người dùng, loại bỏ nguy cơ lệch múi giờ trong báo cáo toàn cầu.",
            "Vì TIMESTAMP WITHOUT TIME ZONE không hỗ trợ các hàm trích xuất năm và tháng.",
            "Vì TIMESTAMPTZ tự động cập nhật thời gian mỗi khi bảng bị sửa đổi."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! TIMESTAMPTZ bảo đảm tính đồng nhất tuyệt đối về thời gian khi hệ thống có người dùng hoặc máy chủ đặt tại nhiều múi giờ khác nhau trên thế giới."
        }
      ],
      "summary": [
        "Luôn dùng DECIMAL/NUMERIC cho tiền tệ và số liệu tài chính; FLOAT chỉ dùng cho tọa độ GIS hoặc vector embeddings AI.",
        "Cẩn trọng với phép chia số nguyên (luôn nhân 1.0 hoặc CAST sang DECIMAL); dùng BIGINT cho Khóa chính để chống tràn số.",
        "Dùng CHAR(N) cho chuỗi độ dài cố định; VARCHAR(N) cho văn bản có giới hạn; TIMESTAMPTZ để lưu thời gian theo chuẩn UTC.",
        "Tránh ép kiểu ngầm bằng cách luôn đặt giá trị chuỗi trong dấu nháy đơn để bảo vệ chỉ mục B-tree.",
        "Ôn cách quãng: Tại sao phép so sánh WHERE col = NULL luôn trả về UNKNOWN thay vì TRUE/FALSE? (Xem lại Bài 0.3)."
      ]
    },
    {
      "id": "sql-04-crud-operations",
      "number": "1.2",
      "title": "Khởi Tạo & Thao Tác Dữ Liệu: CREATE, INSERT, UPDATE, DELETE & Thảm Họa Thiếu WHERE",
      "subtitle": "Thực thi vòng đời dữ liệu an toàn, mệnh đề RETURNING và quy trình phòng thủ 4 bước chống lệnh DELETE cuốn trôi bảng production",
      "level": "Cơ bản",
      "duration": "45 phút",
      "keywords": [
        "CRUD",
        "CREATE TABLE",
        "Bulk Insert",
        "UPDATE",
        "DELETE",
        "RETURNING clause",
        "Safe Mode",
        "Soft Delete"
      ],
      "prerequisites": "Nắm vững kiểu dữ liệu (Bài 1.1) và các nhóm lệnh DDL, DML, TCL (Bài 0.2).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Nắm vững cú pháp khởi tạo bảng (CREATE TABLE) với các ràng buộc cột cơ bản (PRIMARY KEY, NOT NULL, UNIQUE, CHECK).",
        "Phân biệt hiệu năng giữa chèn từng dòng đơn lẻ và chèn hàng loạt (Bulk / Multi-row Insert).",
        "Sử dụng mệnh đề RETURNING (PostgreSQL, DuckDB, SQLite 3.35+) để thu nhận ngay dữ liệu vừa biến đổi mà không cần truy vấn lại.",
        "Làm chủ quy trình phòng thủ 4 bước khi thực thi UPDATE / DELETE trên môi trường thực tế.",
        "Phân tích đánh đổi giữa Xóa cứng (Hard Delete) và Xóa mềm (Soft Delete) dưới góc nhìn toàn vẹn dữ liệu và tuân thủ pháp lý."
      ],
      "intuition": {
        "title": "Bút dạ quang xóa vết mực vs Cần gạt nước trên kính xe",
        "metaphor": "Lệnh UPDATE có mệnh đề WHERE giống như bạn dùng chiếc bút dạ quang cẩn thận tô đúng vào dòng chữ cần sửa trên tài liệu. Nhưng nếu bạn quên mệnh đề WHERE, nó biến thành một chiếc cần gạt nước xe tải nhúng sơn đen quét ngang toàn bộ trang giấy: nó sẽ xóa sạch hoặc đè bẹp tất cả mọi dòng từ đầu đến cuối bảng chỉ trong 0.1 giây mà không hề có tiếng chuông cảnh báo nào vang lên!",
        "boundary": "Ẩn dụ này nhắc nhở bạn về mức độ nguy hiểm; tuy nhiên trên CSDL chuyên nghiệp, nếu bạn chạy bên trong một Giao dịch (Transaction - BEGIN), bạn vẫn có thể ấn nút hoàn tác (ROLLBACK) cứu mạng trước khi nhấn COMMIT.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:2px;font-weight:700;\">BƯỚC 1</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">BEGIN;</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Mở giao dịch an toàn</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:2px;font-weight:700;\">BƯỚC 2</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">SELECT COUNT(*)</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Đo trước số dòng ảnh hưởng</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.75rem;color:var(--topic-sql);margin-bottom:2px;font-weight:700;\">BƯỚC 3</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">UPDATE/RETURNING</div>\n                <div style=\"font-size:0.7rem;\">Kiểm tra số dòng bị sửa</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--success);margin-bottom:2px;font-weight:700;\">BƯỚC 4</div>\n                <div style=\"font-size:0.95rem;font-weight:800;color:var(--success);font-family:monospace;\">COMMIT / ROLLBACK</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Chốt hoặc hoàn tác cứu mạng</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--danger);\">⚠️ Báo động đỏ:</span>\n              <span>Lệnh <code>UPDATE</code> hoặc <code>DELETE</code> thiếu <code>WHERE</code> sẽ cuốn phăng toàn bộ dữ liệu bảng Production chỉ trong 0.1 giây! Luôn luôn bật Safe Updates Mode và bọc trong Transaction.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-04-problem-hook",
          "title": "Gợi mở vấn đề: Nếu quên mệnh đề WHERE khi UPDATE/DELETE, chuyện gì xảy ra?",
          "content": "\n            <p>Trong lịch sử ngành công nghệ thông tin, một trong những thảm họa kinh điển nhất đã từng xóa sổ toàn bộ dữ liệu của một công ty khởi nghiệp chỉ trong 0.1 giây: Một lập trình viên nhận được yêu cầu đổi trạng thái đơn hàng của khách hàng VIP mã số 1005 thành 'VIP_CONFIRMED'.</p>\n            <p>Anh ta mở phần mềm quản trị CSDL, gõ câu lệnh:</p>\n            <pre class=\"code-pre\"><code>UPDATE orders SET status = 'VIP_CONFIRMED' -- Quên gõ WHERE order_id = 1005!</code></pre>\n            <p>Do sơ suất nhấn phím tắt thực thi <code>Ctrl + Enter</code> quá nhanh, <strong>toàn bộ 5 triệu đơn hàng của toàn bộ khách hàng trên toàn quốc đều bị chuyển thành 'VIP_CONFIRMED'</strong>! Mọi đơn hàng đã hủy, đơn đang chờ, đơn lỗi đều biến thành xác nhận, kho hàng tự động xuất hàng loạt, thiệt hại hàng chục tỷ đồng.</p>\n            <p>Tại sao CSDL lại cho phép một hành động nguy hiểm như vậy diễn ra mà không hề có hộp thoại hỏi lại \"Bạn có chắc chắn muốn sửa 5 triệu dòng không?\"? Vì SQL vận hành theo <strong>Tư duy Khai báo (Declarative Mindset)</strong>: bạn ra lệnh gì, động cơ CSDL sẽ thực thi chính xác mệnh lệnh đó trên toàn bộ tập hợp dữ liệu!</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-04-recall-prereq",
          "title": "Gọi lại kiến thức cũ: Kiểm tra nhanh phân loại lệnh SQL",
          "content": "\n            <p>Trước khi thực hiện thao tác dữ liệu, hãy truy hồi nhanh 2 kiến thức nền tảng:</p>\n            \n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n              <p><strong>Câu hỏi 1:</strong> Câu lệnh <code>CREATE TABLE</code> thuộc nhóm lệnh nào (DDL, DML, DQL hay TCL)? Khác gì với <code>INSERT INTO</code>?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> <code>CREATE TABLE</code> thuộc nhóm DDL (Data Definition Language - Định nghĩa cấu trúc lược đồ). Trong khi đó, <code>INSERT INTO</code> thuộc nhóm DML (Data Manipulation Language - Thao tác trên nội dung các dòng dữ liệu).</p>\n                </div>\n              </details>\n            </div>\n\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n              <p><strong>Câu hỏi 2:</strong> Nếu một giao dịch đang chạy mà gặp lệnh <code>ROLLBACK</code>, dữ liệu trong bảng sẽ ra sao?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Toàn bộ các thao tác INSERT, UPDATE, DELETE vừa thực hiện trong giao dịch đó sẽ bị hủy bỏ hoàn toàn, bảng dữ liệu quay trở về trạng thái nguyên vẹn 100% trước khi mở BEGIN.</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-04-concept-definition",
          "title": "Khái niệm cốt lõi: Vòng Đời CRUD & Các Ràng Buộc Toàn Vẹn",
          "content": "\n            <p><strong>CRUD</strong> đại diện cho 4 thao tác sinh tử của dữ liệu: <strong>C</strong>reate (INSERT), <strong>R</strong>ead (SELECT), <strong>U</strong>pdate (UPDATE), <strong>D</strong>elete (DELETE).</p>\n            \n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Ràng buộc toàn vẹn</th>\n                    <th scope=\"col\">Cú pháp SQL</th>\n                    <th scope=\"col\">Bản chất kỹ thuật</th>\n                    <th scope=\"col\">Hệ quả nếu vi phạm</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Khóa chính (PRIMARY KEY)</strong></td>\n                    <td><code>PRIMARY KEY</code></td>\n                    <td>Định danh duy nhất mỗi dòng; tương đương với <code>UNIQUE + NOT NULL</code> và tự động tạo chỉ mục B-tree.</td>\n                    <td>Từ chối chèn nếu giá trị bị trùng hoặc mang giá trị NULL.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Bắt buộc có giá trị (NOT NULL)</strong></td>\n                    <td><code>NOT NULL</code></td>\n                    <td>Cấm không cho ô dữ liệu nhận giá trị NULL.</td>\n                    <td>Báo lỗi <code>null value violates not-null constraint</code>.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Giá trị duy nhất (UNIQUE)</strong></td>\n                    <td><code>UNIQUE</code></td>\n                    <td>Đảm bảo không có 2 dòng mang cùng giá trị (ngoại trừ NULL).</td>\n                    <td>Báo lỗi vi phạm trùng lặp khóa duy nhất.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Kiểm tra miền giá trị (CHECK)</strong></td>\n                    <td><code>CHECK (price &gt; 0)</code></td>\n                    <td>Vị từ logic kiểm tra dữ liệu trước khi nạp vào đĩa.</td>\n                    <td>Báo lỗi nếu biểu thức đánh giá ra FALSE.</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-04-internal-mechanism",
          "title": "Cơ chế bên trong: Write-Ahead Log (WAL), Bulk Insert & Mệnh Đề RETURNING",
          "content": "\n            <p><strong>A. Tại sao Chèn hàng loạt (Multi-row Insert) nhanh hơn chèn từng dòng gấp 60 lần?</strong></p>\n            <ul>\n              <li><strong>Chèn từng dòng (Single INSERT):</strong> Ứng dụng gửi 1 dòng &rarr; CSDL phân tích cú pháp &rarr; Mở giao dịch &rarr; Ghi nhật ký vào Write-Ahead Log (WAL) &rarr; Ép ổ đĩa ghi xuống phiến đĩa vật lý (lệnh <code>fsync</code> tốn 5-10ms) &rarr; Trả kết quả mạng về ứng dụng. Chèn 10.000 dòng mất 10.000 lần roundtrip mạng và 10.000 lần fsync!</li>\n              <li><strong>Chèn hàng loạt (Multi-row Bulk Insert):</strong> Gộp 1.000 dòng vào 1 câu lệnh phân tách bởi dấu phẩy. Toàn bộ 1.000 dòng được phân tích 1 lần, ghi vào WAL 1 lần và chỉ tốn 1 lần fsync đĩa!</li>\n            </ul>\n\n            <p><strong>B. Mệnh đề RETURNING loại bỏ bẫy tương tranh (Race Condition):</strong></p>\n            <p>Trong các ứng dụng cũ, sau khi INSERT một dòng có ID tự tăng, lập trình viên thường gọi tiếp <code>SELECT MAX(id) FROM table</code> để lấy ID vừa sinh. Đây là một cạm bẫy Race Condition chết người: trong phần nghìn giây giữa hai câu lệnh, một người dùng khác có thể đã chèn thêm một dòng mới, khiến ứng dụng lấy nhầm ID của người khác!</p>\n            <p>Mệnh đề <code>RETURNING</code> trong PostgreSQL, DuckDB và SQLite (3.35+) giải quyết triệt để vấn đề này bằng cách trả về trực tiếp giá trị của các cột vừa được tạo ra ngay trong câu lệnh INSERT/UPDATE/DELETE một cách nguyên tử (atomic).</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-04-worked-example",
          "title": "Ví dụ mẫu có lời giải: Chèn Hàng Loạt Kết Hợp RETURNING Trên TechMart",
          "content": "\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:16px;border-radius:8px;background:var(--bg-surface-elevated);margin:16px 0;\">\n              <h4 style=\"margin:0 0 8px;color:var(--text-primary);\">❓ Dự đoán trước khi xem:</h4>\n              <p>Giả sử bạn chạy câu lệnh xóa: <code>DELETE FROM order_items WHERE item_id = 99999;</code> (mã item 99999 hoàn toàn không tồn tại trong bảng). Theo bạn, CSDL sẽ báo lỗi làm gián đoạn chương trình hay chạy thành công mà không xóa dòng nào? Vì sao?</p>\n              <details class=\"predict-details\" style=\"margin-top:12px;padding:10px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem phân tích cơ chế &amp; Đáp án</summary>\n                <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                  <p><strong>Đáp án: CHẠY THÀNH CÔNG HOÀN TOÀN và thông báo \"DELETE 0\" (0 rows affected)!</strong></p>\n                  <p><strong>Cơ chế bản chất:</strong> Trong tư duy tập hợp, câu lệnh DELETE có nghĩa là: <em>\"Hãy xóa tất cả các phần tử thuộc tập con thỏa mãn vị từ WHERE\"</em>. Nếu tập con thỏa mãn vị từ là một <strong>tập rỗng ($emptyset$)</strong>, CSDL chỉ đơn giản là không cần xóa phần tử nào cả, hoàn toàn không xem đây là một lỗi ngoại lệ (Exception)! Do đó bạn luôn phải kiểm tra số dòng bị ảnh hưởng (Affected Rows) trả về từ driver.</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Chèn hàng loạt kết hợp RETURNING lấy ngay ID và giá trị trên TechMart",
              "code": "INSERT INTO products (product_id, product_name, category, price, cost)\nVALUES \n    (106, 'Webcam Logitech C920 Full HD', 'Accessories', 1950000.00, 1400000.00),\n    (107, 'Lot chuot Gaming Size XL', 'Accessories', 250000.00, 120000.00)\nRETURNING product_id, product_name, price;",
              "annotations": [
                {
                  "line": 2,
                  "text": "Chèn cùng lúc nhiều bộ giá trị chỉ trong 1 roundtrip mạng"
                },
                {
                  "line": 5,
                  "text": "Mệnh đề RETURNING trả về ngay các cột vừa chèn mà không cần chạy thêm câu lệnh SELECT"
                }
              ],
              "explanation": "Đã kiểm chứng trên PostgreSQL 16 và DuckDB 2.0.0. Hai sản phẩm được nạp vào kho và trả về kết quả tức thì.",
              "output": "+------------+-------------------------------+------------+\n| product_id | product_name                  | price      |\n+------------+-------------------------------+------------+\n| 106        | Webcam Logitech C920 Full HD  | 1950000.00 |\n| 107        | Lot chuot Gaming Size XL      | 250000.00  |\n+------------+-------------------------------+------------+\n(2 rows returned)"
            }
          ]
        },
        {
          "id": "sec-04-faded-example",
          "title": "Bài điền khuyết (Faded Example): Cập Nhật Trạng Thái An Toàn Có Giao Dịch",
          "content": "\n            <p>Dưới đây là khung câu lệnh cập nhật trạng thái đơn hàng an toàn cho đơn hàng <code>order_id = 1005</code> trên môi trường sản xuất. Hãy điền các từ khóa còn thiếu vào các vị trí <code>[___1___]</code> đến <code>[___4___]</code>:</p>\n\n            <div class=\"code-example-card\">\n              <div class=\"code-card-header\"><span class=\"lang-tag\">SQL (BÀI ĐIỀN KHUYẾT)</span></div>\n              <pre class=\"code-pre\"><code>-- Bước 1: Mở giao dịch an toàn\n[___1___] TRANSACTION;\n\n-- Bước 2: Cập nhật có điều kiện và trả về dòng bị tác động\nUPDATE orders\nSET status = 'CANCELLED'\n[___2___] order_id = 1005\n[___3___] order_id, customer_id, status;\n\n-- Bước 3: Nếu quan sát thấy đúng chính xác 1 dòng bị ảnh hưởng:\n[___4___]; -- Chốt lưu dữ liệu vĩnh viễn</code></pre>\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top:12px;padding:12px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n              <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án điền khuyết &amp; Giải thích</summary>\n              <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                <p><strong>Đáp án đúng:</strong></p>\n                <ul>\n                  <li><code>[___1___] = BEGIN</code> (Mở giao dịch tường minh để có thể ROLLBACK).</li>\n                  <li><code>[___2___] = WHERE</code> (Bắt buộc phải có vị từ WHERE để không cập nhật nhầm cả bảng).</li>\n                  <li><code>[___3___] = RETURNING</code> (Lấy trực tiếp dữ liệu vừa cập nhật để kiểm chứng mắt thấy tai nghe).</li>\n                  <li><code>[___4___] = COMMIT</code> (Nếu thấy thông báo UPDATE 1 dòng thì chốt COMMIT; nếu thấy số dòng bất thường thì gõ ROLLBACK).</li>\n                </ul>\n              </div>\n            </details>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-04-pitfalls-misconceptions",
          "title": "Bẫy và Quan Niệm Sai Phổ Biến Khi Thao Tác Dữ Liệu",
          "content": "\n            <div class=\"callout-box callout-pitfall\" style=\"margin-bottom:14px;\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 1: Tự tin gõ lệnh trực tiếp trên Production mà không dùng Transaction</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Hiện tượng:</strong> Mở công cụ DBeaver hoặc pgAdmin kết nối thẳng vào CSDL máy chủ thật và gõ <code>UPDATE</code> hoặc <code>DELETE</code> trong chế độ Auto-commit.</p>\n                <p><strong>Hậu quả:</strong> Chỉ cần một cú click chuột trượt tay hoặc mất mạng giữa chừng, câu lệnh dở dang được ghi đè vĩnh viễn vào CSDL mà không thể hoàn tác!</p>\n                <p><strong>Quy tắc sinh tồn:</strong> Luôn luôn gõ <code>BEGIN;</code> trước bất kỳ thao tác ghi nào trên môi trường thực tế.</p>\n              </div>\n            </div>\n\n            <div class=\"callout-box callout-pitfall\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 2: Quên lọc các bản ghi đã xóa mềm (Soft Delete) trong báo cáo</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Hiện tượng:</strong> Bảng <code>orders</code> áp dụng xóa mềm (thêm cột <code>deleted_at TIMESTAMP NULL</code>). Nhưng khi viết truy vấn tính doanh thu tháng, kỹ sư viết: <code>SELECT SUM(total_amount) FROM orders;</code>.</p>\n                <p><strong>Hậu quả:</strong> Toàn bộ các đơn hàng đã bị khách hủy hoặc xóa mềm vẫn bị tính gộp vào doanh thu, làm số liệu tài chính bị phóng đại bất thường!</p>\n                <p><strong>Cách sửa đúng:</strong> Luôn luôn thêm điều kiện <code>WHERE deleted_at IS NULL</code> trong mọi truy vấn phân tích.</p>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-04-concept-comparison",
          "title": "So Sánh: Xóa Cứng (Hard Delete) vs Xóa Mềm (Soft Delete) vs TRUNCATE",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Tiêu chí</th>\n                    <th scope=\"col\">Xóa Cứng (DELETE FROM)</th>\n                    <th scope=\"col\">Xóa Mềm (Soft Delete - Cột deleted_at)</th>\n                    <th scope=\"col\">TRUNCATE TABLE</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Phân loại lệnh</strong></td>\n                    <td>DML (Thao tác từng dòng)</td>\n                    <td>DML (Thực chất là lệnh UPDATE)</td>\n                    <td>DDL (Thao tác trên cấu trúc bảng)</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Khả năng hoàn tác</strong></td>\n                    <td>ROLLBACK được nếu trong transaction.</td>\n                    <td>Khôi phục dễ dàng bằng lệnh UPDATE gán lại NULL.</td>\n                    <td>Không thể hoàn tác trong nhiều hệ quản trị (hoặc rất hạn chế).</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Lưu vết kiểm toán &amp; AI [FE]</strong></td>\n                    <td>Mất dấu lịch sử, làm sai lệch mô hình Machine Learning.</td>\n                    <td><strong>Bảo toàn 100% dữ liệu lịch sử</strong> cho đối soát và huấn luyện AI.</td>\n                    <td>Xóa sạch toàn bộ không dấu vết.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Tốc độ thực thi</strong></td>\n                    <td>Chậm trên bảng lớn (ghi WAL từng dòng).</td>\n                    <td>Trung bình (ghi log cập nhật).</td>\n                    <td><strong>Cực nhanh</strong> (giải phóng toàn bộ trang đĩa, reset con trỏ High Water Mark).</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-04-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Quy Trình Phòng Thủ 4 Bước & Đánh Đổi Luật GDPR",
          "content": "\n            <div class=\"callout-box callout-tip\" style=\"margin-bottom:16px;\">\n              <div class=\"callout-header\"><span>🛡️ Quy trình phòng thủ 4 bước bắt buộc của Kỹ sư Dữ liệu</span></div>\n              <div class=\"callout-body\">\n                <ol>\n                  <li><strong>Bước 1: Viết câu lệnh SELECT với đúng mệnh đề WHERE trước!</strong>\n                    <pre class=\"code-pre\"><code>SELECT order_id, status FROM orders WHERE order_id = 1005;</code></pre>\n                    Kiểm tra bằng mắt xem kết quả trả về có đúng chính xác 1 dòng cần sửa hay không.\n                  </li>\n                  <li><strong>Bước 2: Mở giao dịch tường minh (Explicit Transaction):</strong>\n                    <pre class=\"code-pre\"><code>BEGIN TRANSACTION; -- Khóa chốt an toàn</code></pre>\n                  </li>\n                  <li><strong>Bước 3: Thực thi lệnh UPDATE / DELETE và kiểm tra số dòng bị ảnh hưởng:</strong>\n                    <pre class=\"code-pre\"><code>UPDATE orders SET status = 'CANCELLED' WHERE order_id = 1005;\n-- Quan sát thông báo: \"UPDATE 1\" -> Đúng mục tiêu!\n-- Nếu thấy: \"UPDATE 5000000\" -> BÁO ĐỘNG ĐỎ!</code></pre>\n                  </li>\n                  <li><strong>Bước 4: Xác nhận hoặc Hoàn tác cứu mạng:</strong>\n                    <pre class=\"code-pre\"><code>-- Nếu đúng 1 dòng: COMMIT;\n-- Nếu phát hiện sai sót: ROLLBACK; (Dữ liệu phục hồi nguyên vẹn 100%!)</code></pre>\n                  </li>\n                </ol>\n              </div>\n            </div>\n\n            <p><strong>Xung đột kiến trúc giữa Xóa mềm và Luật GDPR (Quyền được lãng quên):</strong></p>\n            <p>Quy định bảo vệ dữ liệu chung châu Âu (GDPR) yêu cầu doanh nghiệp phải xóa vĩnh viễn thông tin cá nhân (PII) của khách hàng khi họ yêu cầu. Nếu hệ thống chỉ áp dụng Xóa mềm (gán cờ <code>deleted_at</code>), dữ liệu nhạy cảm vẫn còn nằm trên đĩa cứng, doanh nghiệp có thể bị phạt hàng chục triệu Euro!</p>\n            <p><strong>Giải pháp chuẩn quốc tế: Xóa mềm kết hợp Ẩn danh hóa (Crypto-shredding / Data Masking):</strong></p>\n            <pre class=\"code-pre\"><code>UPDATE customers \nSET full_name = 'ANONYMOUS_USER_' || customer_id,\n    email = 'redacted_' || customer_id || '@privacy.local',\n    deleted_at = CURRENT_TIMESTAMP\nWHERE customer_id = 5;</code></pre>\n            <p>Giải pháp này vừa thỏa mãn 100% luật GDPR vừa bảo toàn nguyên vẹn tính toàn vẹn tham chiếu cho các báo cáo doanh thu lịch sử.</p>\n          ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi tự tin gõ lệnh trực tiếp trên Production mà không dùng Transaction",
            "content": "Không bao giờ được mở tool gõ lệnh UPDATE/DELETE trực tiếp bằng tay trên CSDL Production. Bắt buộc phải mở BEGIN TRANSACTION trước khi chạm vào dữ liệu thật."
          },
          {
            "title": "Quên lọc dòng đã xóa mềm trong các truy vấn phân tích doanh thu",
            "content": "Nếu bảng `orders` áp dụng xóa mềm mà truy vấn tính doanh thu quên điều kiện `WHERE deleted_at IS NULL`, bạn sẽ tính nhầm cả những đơn hàng đã bị người dùng hủy bỏ, làm sai lệch báo cáo tài chính."
          }
        ],
        "tips": [
          {
            "title": "Kích hoạt Safe Updates Mode trong công cụ quản trị",
            "content": "Trong DBeaver hoặc MySQL Workbench, hãy luôn bật tính năng \"Safe Updates\" (chặn đứng mọi câu lệnh UPDATE/DELETE không có mệnh đề WHERE hoặc không sử dụng Khóa chính)."
          }
        ],
        "deepDive": {
          "title": "Bên trong Engine: MVCC và Write-Ahead Logging (WAL) khi chạy UPDATE / DELETE",
          "content": "<p>Trong PostgreSQL, câu lệnh <code>UPDATE</code> thực chất không ghi đè dữ liệu trực tiếp lên dòng cũ. Thay vào đó, engine tạo ra một phiên bản dòng mới (tuple version) với <code>xmin</code> bằng mã giao dịch hiện tại, đồng thời đánh dấu <code>xmax</code> trên dòng cũ trỏ tới mã giao dịch này.</p><p>Dòng cũ trở thành <strong>Dead Tuple</strong> và tiếp tục tồn tại trên đĩa cứng cho đến khi tiến trình <strong>VACUUM</strong> dọn dẹp giải phóng không gian. Đồng thời, mọi thay đổi đều được ghi tuần tự vào nhật ký <strong>Write-Ahead Log (WAL)</strong> trước khi ghi xuống bảng dữ liệu, đảm bảo nguyên tắc ACID và khả năng phục hồi hoàn toàn khi mất điện đột ngột.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 1.2-1 (Tìm & Sửa lỗi): Khắc phục câu lệnh cập nhật mất kiểm soát",
          "level": "Cơ bản",
          "problem": "Một lập trình viên muốn cập nhật trạng thái đơn hàng 1003 thành \"REFUNDED\". Do sơ suất, anh ta chạy câu lệnh:\n`UPDATE orders SET status = \"REFUNDED\";`\nNếu câu lệnh trên chưa được COMMIT bên trong một transaction, hãy viết câu lệnh để hủy bỏ ngay lập tức thao tác sai lầm đó.",
          "hint": "Dùng lệnh của TCL.",
          "solutionCode": "ROLLBACK;",
          "solutionOutput": "Toàn bộ dữ liệu của bảng orders được hoàn tác nguyên vẹn về trạng thái trước lệnh UPDATE.",
          "explanation": "Chẩn đoán lỗi: Nếu bạn không mở BEGIN TRANSACTION từ trước, câu lệnh trên sẽ tự động COMMIT ngầm (Auto-commit) và thảm họa mất dữ liệu không thể hoàn tác!"
        },
        {
          "title": "Bài tập 1.2-2 (Tự viết truy vấn): Thao tác Xóa mềm an toàn với RETURNING",
          "level": "Trung bình",
          "problem": "Viết câu lệnh cập nhật xóa mềm cho khách hàng có `customer_id = 5` trong bảng `customers` bằng cách cập nhật cột email thành `em.hoang@email.com.deleted` và sử dụng mệnh đề `RETURNING` để trả về họ tên và email mới của khách hàng.",
          "hint": "Dùng UPDATE ... SET ... WHERE ... RETURNING ...",
          "solutionCode": "UPDATE customers\nSET email = email || '.deleted'\nWHERE customer_id = 5\nRETURNING customer_id, full_name, email;",
          "solutionOutput": "+-------------+---------------+---------------------------+\n| customer_id | full_name     | email                     |\n+-------------+---------------+---------------------------+\n| 5           | Hoang Van Em  | em.hoang@email.com.deleted|\n+-------------+---------------+---------------------------+\n(1 row updated)",
          "explanation": "Chẩn đoán lỗi: Đổi đuôi email sang .deleted là một thủ thuật kinh điển giúp giải phóng giá trị email gốc để người dùng có thể đăng ký lại tài khoản mới mà không vi phạm ràng buộc UNIQUE."
        },
        {
          "title": "Bài tập 1.2-3 (Đánh đổi & Kiến trúc): Quyền được lãng quên (GDPR) vs Xóa mềm",
          "level": "Nâng cao",
          "problem": "Quy định bảo vệ dữ liệu chung của châu Âu (GDPR) có điều khoản \"Quyền được lãng quên\", yêu cầu doanh nghiệp phải xóa vĩnh viễn thông tin cá nhân của người dùng khi có yêu cầu. Kiến trúc Xóa Mềm (Soft Delete) có thỏa mãn yêu cầu này không? Kỹ sư dữ liệu cần giải quyết mâu thuẫn này thế nào?",
          "hint": "Nghĩ về phương pháp ẩn danh hóa (Anonymization) thay vì chỉ đánh dấu cờ xóa.",
          "solutionCode": "-- Giải pháp kỹ thuật chuẩn GDPR cho kiến trúc Soft Delete:\n-- Không thể chỉ đánh dấu deleted_at (vì dữ liệu cá nhân vẫn còn lưu trên đĩa).\n-- Bắt buộc phải kết hợp Xóa mềm với Ẩn danh hóa (Crypto-shredding / Masking):\nUPDATE customers\nSET full_name = 'ANONYMOUS_USER_' || customer_id,\n    email = 'deleted_' || customer_id || '@redacted.local',\n    city = 'UNKNOWN'\nWHERE customer_id = 5;",
          "solutionOutput": "Thông tin định danh cá nhân (PII) bị xóa sạch vĩnh viễn trong khi bản ghi giao dịch vẫn giữ nguyên tính toàn vẹn tham chiếu.",
          "explanation": "Giải pháp này giúp hệ thống vừa tuân thủ 100% luật GDPR vừa không làm gãy các phép phân tích tổng doanh thu lịch sử."
        },
        {
          "title": "Bài tập 1.2-4 (Dự đoán kết quả): Hành vi của DELETE khi điều kiện WHERE không khớp",
          "level": "Cơ bản",
          "problem": "Xét câu lệnh sau trên bảng `orders` của TechMart: `DELETE FROM orders WHERE total_amount < 0;` (biết rằng bảng orders hiện tại không có đơn nào tiền âm). CSDL sẽ báo lỗi ngoại lệ hay trả về thông báo gì?",
          "hint": "Nhớ lại tính chất tập con rỗng trong mô hình quan hệ.",
          "solutionCode": "-- Câu lệnh thực thi thành công hoàn toàn:\nDELETE 0 (0 rows affected)",
          "solutionOutput": "Query executed successfully with 0 rows affected.",
          "explanation": "Chẩn đoán lỗi: Nếu bạn nghĩ CSDL sẽ văng Exception \"RecordNotFound\", bạn đang nhầm lẫn giữa ORM/Backend với động cơ CSDL quan hệ."
        }
      ],
      "quiz": [
        {
          "question": "Mệnh đề RETURNING trong PostgreSQL, DuckDB và SQLite mang lại lợi ích kỹ thuật lớn nhất nào?",
          "options": [
            "Tự động sao lưu bảng sang một ổ đĩa khác.",
            "Cho phép nhận lại trực tiếp giá trị của các cột vừa được INSERT / UPDATE / DELETE mà không cần thực hiện thêm câu lệnh SELECT phụ, loại bỏ nguy cơ Race Condition.",
            "Bắt buộc người dùng phải nhập mật khẩu trước khi xóa.",
            "Tự động hoàn tác nếu có lỗi xảy ra."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! RETURNING trả về dữ liệu nguyên tử ngay tại thời điểm biến đổi, giúp ứng dụng lấy ID tự tăng hoặc trạng thái mới mà không sợ bị lệch do các phiên chạy song song."
        },
        {
          "question": "Khi thực thi câu lệnh: DELETE FROM orders WHERE customer_id = 99999; (trong đó mã khách hàng 99999 hoàn toàn không tồn tại trong CSDL), động cơ RDBMS sẽ phản hồi như thế nào?",
          "options": [
            "Văng lỗi ngoại lệ RecordNotFoundException làm gián đoạn chương trình.",
            "Tự động xóa dòng đầu tiên của bảng.",
            "Thực thi thành công hoàn toàn và trả về thông báo 0 dòng bị ảnh hưởng (DELETE 0) mà không văng lỗi.",
            "Đưa giao dịch vào trạng thái treo (Deadlock)."
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Trong tư duy tập hợp của SQL, xóa trên một tập con rỗng là một thao tác hợp lệ và thành công với 0 dòng bị tác động. Không bao giờ dựa vào lỗi của CSDL để kiểm tra bản ghi có tồn tại hay không."
        },
        {
          "question": "Về mặt cơ chế lưu trữ vật lý, nguyên nhân chính khiến Multi-row Insert (gộp 1.000 dòng vào 1 câu lệnh) nhanh hơn gấp hàng chục lần so với 1.000 câu lệnh Single Insert riêng lẻ là gì?",
          "options": [
            "Vì Multi-row Insert không cần kiểm tra kiểu dữ liệu của các cột.",
            "Vì giảm thiểu số lần ghi nhật ký Write-Ahead Log (WAL), giảm số lần gọi hàm fsync ép ghi dữ liệu xuống đĩa vật lý và giảm số lượng roundtrip truyền nhận gói tin qua mạng.",
            "Vì Multi-row Insert tự động tắt bỏ các ràng buộc Khóa chính.",
            "Vì CSDL chỉ lưu trữ dòng đầu tiên và dòng cuối cùng."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Thao tác fsync ép đĩa cứng quay và ghi tốn hàng mili-giây cho mỗi transaction. Gộp hàng ngàn dòng vào một transaction duy nhất giúp tăng tốc độ nạp dữ liệu vượt bậc."
        },
        {
          "question": "Trong quy trình phòng thủ 4 bước khi thực thi UPDATE/DELETE trực tiếp trên môi trường Production, thao tác nào đóng vai trò là chốt an toàn giúp cứu vãn dữ liệu nếu lỡ tay quên mệnh đề WHERE?",
          "options": [
            "Luôn mở giao dịch tường minh bằng lệnh BEGIN TRANSACTION trước khi chạy lệnh sửa đổi để có thể dùng ROLLBACK hoàn tác nguyên vẹn dữ liệu.",
            "Tắt kết nối mạng của máy chủ CSDL.",
            "Chạy câu lệnh vào ban đêm khi không có ai truy cập.",
            "Thêm từ khóa QUICK vào sau câu lệnh DELETE."
          ],
          "correctIndex": 0,
          "explanation": "Chính xác! Lệnh BEGIN TRANSACTION biến toàn bộ thao tác thành tạm thời trong phiên làm việc. Nếu phát hiện số dòng bị ảnh hưởng bất thường (ví dụ: định sửa 1 dòng mà thông báo UPDATE 5.000.000 dòng), lệnh ROLLBACK sẽ cứu mạng toàn bộ hệ thống."
        },
        {
          "question": "Khi áp dụng kiến trúc Xóa Mềm (Soft Delete) với cột deleted_at, cạm bẫy kỹ thuật phổ biến nhất đối với cột có ràng buộc UNIQUE (như email người dùng) là gì và cách giải quyết chuẩn trong PostgreSQL?",
          "options": [
            "Cột deleted_at làm chậm tốc độ đọc dữ liệu gấp 10 lần.",
            "Người dùng đã xóa tài khoản không thể đăng ký lại bằng email cũ vì vi phạm ràng buộc UNIQUE; cách giải quyết là dùng Partial Index: CREATE UNIQUE INDEX ON users(email) WHERE deleted_at IS NULL;",
            "Xóa mềm làm mất toàn bộ các ràng buộc Khóa ngoại.",
            "PostgreSQL cấm sử dụng kiểu TIMESTAMP cho các bảng có ràng buộc UNIQUE."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Ràng buộc UNIQUE thông thường coi các dòng đã xóa mềm vẫn đang tồn tại. Partial Index (Chỉ mục từng phần) chỉ áp đặt tính duy nhất lên các dòng còn đang hoạt động (deleted_at IS NULL)."
        }
      ],
      "summary": [
        "Dùng Multi-row Bulk INSERT để tăng tốc độ nạp dữ liệu gấp hàng chục lần so với chèn từng dòng đơn lẻ.",
        "Mệnh đề RETURNING giúp thu nhận ngay kết quả vừa biến đổi một cách an toàn và nguyên tử.",
        "Khắc cốt ghi tâm 4 bước phòng thủ khi UPDATE/DELETE: SELECT kiểm tra trước &rarr; BEGIN &rarr; Thực thi & kiểm tra số dòng &rarr; COMMIT/ROLLBACK.",
        "Áp dụng Xóa mềm (Soft Delete) kết hợp ẩn danh hóa PII để bảo toàn tính toàn vẹn dữ liệu cho mô hình AI và tuân thủ GDPR.",
        "Ôn cách quãng: Tại sao kiểu dữ liệu BIGINT lại được khuyến nghị cho Khóa chính thay vì INT? (Xem lại Bài 1.1)."
      ]
    },
    {
      "id": "sql-05-select-filtering",
      "number": "1.3",
      "title": "SELECT, WHERE, Operators, LIKE, BETWEEN, IN, CASE & Hàm Tích Hợp",
      "subtitle": "Kỹ nghệ bóc tách dữ liệu chính xác, thoát ký tự ESCAPE trong LIKE, bẫy BETWEEN ngày giờ, ORDER BY với NULL & CASE WHEN",
      "level": "Cơ bản",
      "duration": "50 phút",
      "keywords": [
        "SELECT",
        "WHERE",
        "LIKE ESCAPE",
        "BETWEEN trap",
        "IN predicate",
        "CASE WHEN",
        "NULLS FIRST/LAST",
        "LIMIT OFFSET determinism"
      ],
      "prerequisites": "Thành thạo cú pháp CRUD cơ bản (Bài 1.2) và logic 3 giá trị 3VL với NULL (Bài 0.3).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Làm chủ các toán tử so sánh (=, !=, <>, >, <, >=, <=) và logic (AND, OR, NOT) với cơ chế Short-circuit.",
        "Giải mã cạm bẫy kinh điển của toán tử BETWEEN khi lọc dữ liệu ngày có kèm giờ (TIMESTAMP).",
        "Thành thạo kỹ thuật tìm kiếm chuỗi với LIKE / ILIKE, sử dụng mệnh đề ESCAPE để tìm chính xác các ký tự đại diện % và _.",
        "Kiểm soát tuyệt đối thứ tự sắp xếp với ORDER BY khi có giá trị NULL bằng cú pháp chuẩn ISO `NULLS FIRST` và `NULLS LAST`.",
        "Sử dụng biểu thức rẽ nhánh có điều kiện `CASE WHEN` đa nhánh, hiểu rõ cơ chế Short-circuit và tầm quan trọng sống còn của nhánh ELSE."
      ],
      "intuition": {
        "title": "Bộ rây bột nhiều tầng và Băng chuyền phân loại trái cây",
        "metaphor": "Mệnh đề WHERE giống như một chiếc rây bột nhiều tầng: tầng 1 chỉ cho những hạt có kích thước nhỏ hơn 2mm lọt qua (toán tử số học), tầng 2 chỉ cho những hạt màu vàng lọt qua (toán tử chuỗi). Chỉ những hạt nào thỏa mãn tất cả các mắt lưới mới rơi xuống bát. Còn biểu thức CASE WHEN giống như một cảm biến quang học trên băng chuyền phân loại xoài: xoài nặng trên 500g thì gạt vào thùng loại 1 (\"VIP\"), từ 300g-500g vào thùng loại 2 (\"Medium\"), còn lại vào thùng loại 3 (\"Standard\").",
        "boundary": "Ẩn dụ này rất trực quan; tuy nhiên cần lưu ý: toán tử LIKE với ký tự đại diện đứng đầu như `%abc` sẽ khiến engine không thể tận dụng cây chỉ mục B-tree (tương tự như việc bạn tra từ điển mà người ta chỉ cho bạn biết chữ cái cuối cùng của từ, bạn buộc phải lật từng trang từ đầu đến cuối sách!).",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:220px;border-color:var(--danger);\">\n                <div style=\"font-size:0.75rem;color:var(--danger);margin-bottom:4px;font-weight:700;\">❌ NON-SARGABLE (GÃY B-TREE INDEX)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--danger);font-family:monospace;\">WHERE EXTRACT(year FROM d) = 2023<br>WHERE phone = 12345 (implicit cast)</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Bọc hàm vào cột &rarr; Engine bắt buộc quét toàn bảng $O(N)$!</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"font-size:1.1rem;color:var(--text-muted);\">VS</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:220px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--success);margin-bottom:4px;font-weight:700;\">✅ SARGABLE (TỐI ƯU B-TREE INDEX SEEK)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--success);font-family:monospace;\">WHERE d &gt;= '2023-01-01' AND d &lt; '2024-01-01'<br>WHERE phone = '12345' (đúng kiểu)</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Tra cứu chỉ mục trực tiếp $O(log N)$, phản hồi tức thì 0.1ms!</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--warning);\">⚡ Khoảng nửa mở:</span>\n              <span>Với TIMESTAMP, tuyệt đối không dùng <code>BETWEEN</code>. Luôn dùng <code>[start, end)</code> để không bỏ sót 23h59:59 của ngày cuối kỳ.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-05-problem-hook",
          "title": "Gợi mở vấn đề: Nếu dùng BETWEEN cho ngày giờ, chuyện gì xảy ra?",
          "content": "\n            <p>Vào ngày đầu tiên của tháng 7, Giám đốc Tài chính của TechMart yêu cầu bạn trích xuất tổng doanh thu của toàn bộ tháng 6 năm 2023. Bạn mở máy và viết câu lệnh:</p>\n            <pre class=\"code-pre\"><code>SELECT SUM(total_amount) FROM orders WHERE order_date BETWEEN '2023-06-01' AND '2023-06-30';</code></pre>\n            <p>Con số bạn báo cáo lên là <strong>24.5 tỷ đồng</strong>. Tuy nhiên hệ thống thanh toán của ngân hàng lại ghi nhận đúng <strong>26.8 tỷ đồng</strong>! Doanh nghiệp bị lệch mất hơn 2 tỷ đồng doanh thu chỉ trong 1 tháng. Bạn bị triệu tập giải trình khẩn cấp.</p>\n            <p><strong>Bẫy tử huyệt BETWEEN:</strong> Nếu cột <code>order_date</code> là kiểu <code>TIMESTAMP</code> (có giờ phút giây), hằng số chuỗi <code>'2023-06-30'</code> khi ép sang timestamp sẽ tự động biến thành <code>'2023-06-30 00:00:00'</code>! Toàn bộ các đơn hàng phát sinh vào lúc 9h sáng, 14h chiều, hay 23h59 đêm ngày 30/06 <strong>đã bị câu lệnh của bạn loại bỏ hoàn toàn</strong> khỏi báo cáo!</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-05-recall-prereq",
          "title": "Gọi lại kiến thức cũ: Kiểm tra nhanh Logic 3VL & Mệnh đề WHERE",
          "content": "\n            <p>Trước khi bóc tách dữ liệu phức tạp, hãy truy hồi 2 câu hỏi từ Bài 0.3 và Bài 1.2:</p>\n            \n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n              <p><strong>Câu hỏi 1:</strong> Trong bảng chân trị của logic 3 giá trị, biểu thức <code>TRUE AND UNKNOWN</code> sẽ cho ra kết quả gì? Biểu thức <code>FALSE AND UNKNOWN</code> cho ra gì?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> <code>TRUE AND UNKNOWN &rarr; UNKNOWN</code>; nhưng <code>FALSE AND UNKNOWN &rarr; FALSE</code> (vì chỉ cần 1 vế FALSE thì phép AND chắc chắn FALSE bất kể vế kia là gì).</p>\n                </div>\n              </details>\n            </div>\n\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n              <p><strong>Câu hỏi 2:</strong> Mệnh đề RETURNING trong INSERT/UPDATE có công dụng cốt tử gì?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Trả về ngay các cột của bản ghi vừa biến đổi mà không cần thực hiện thêm câu lệnh SELECT phụ, loại bỏ nguy cơ Race Condition và giảm roundtrip mạng.</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-05-concept-definition",
          "title": "Khái niệm cốt lõi: Các Nhóm Toán Tử Lọc & Biểu Thức CASE WHEN",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Nhóm toán tử</th>\n                    <th scope=\"col\">Các toán tử tiêu biểu</th>\n                    <th scope=\"col\">Bản chất kỹ thuật &amp; Hành vi</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Toán tử so sánh</strong></td>\n                    <td><code>=</code>, <code>!=</code>, <code>&lt;&gt;</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code></td>\n                    <td>So sánh giá trị vô hướng. Gặp NULL luôn trả về <code>UNKNOWN</code>.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Toán tử tập hợp</strong></td>\n                    <td><code>IN (...)</code><br><code>NOT IN (...)</code></td>\n                    <td>Kiểm tra phần tử có thuộc danh sách hay không.<br><strong>Cảnh báo:</strong> <code>NOT IN</code> sẽ sụp đổ thành tập rỗng nếu danh sách có chứa NULL!</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Toán tử chuỗi</strong></td>\n                    <td><code>LIKE</code>, <code>ILIKE</code></td>\n                    <td>Khớp mẫu chuỗi. <code>%</code> (0 hoặc nhiều ký tự), <code>_</code> (đúng 1 ký tự). <code>ILIKE</code> (PostgreSQL) không phân biệt hoa thường.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Biểu thức điều kiện</strong></td>\n                    <td><code>CASE WHEN ... THEN ... ELSE ... END</code></td>\n                    <td>Rẽ nhánh logic trong SQL. Hoạt động theo cơ chế đoản mạch (Short-circuit).</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-05-internal-mechanism",
          "title": "Cơ chế bên trong: Đoản Mạch (Short-circuit) & Vị Trí NULL Khi Sắp Xếp",
          "content": "\n            <p><strong>A. Cơ chế Đoản mạch (Short-circuit Evaluation):</strong></p>\n            <p>Trong biểu thức điều kiện <code>CASE WHEN</code> và các phép toán logic <code>AND / OR</code>, động cơ CSDL đánh giá các biểu thức từ trên xuống dưới, từ trái sang phải:</p>\n            <ul>\n              <li>Trong <code>CASE WHEN</code>: Ngay khi gặp nhánh <code>WHEN</code> đầu tiên đánh giá ra <code>TRUE</code>, CSDL trả về giá trị ở nhánh <code>THEN</code> tương ứng và <strong>dừng lại ngay lập tức</strong>, không bao giờ đánh giá các nhánh WHEN phía sau!</li>\n              <li>Nhờ cơ chế này, bạn có thể viết biểu thức chống chia cho 0 an toàn:\n                <pre class=\"code-pre\"><code>CASE WHEN total_orders = 0 THEN 0.0 ELSE total_amount / total_orders END</code></pre>\n              </li>\n            </ul>\n\n            <p><strong>B. Vị trí sắp xếp mặc định của NULL trên các RDBMS:</strong></p>\n            <p>Chuẩn ISO SQL không ép buộc NULL phải đứng đầu hay cuối khi ORDER BY, dẫn đến sự khác biệt giữa các hệ thống:</p>\n            <ul>\n              <li><strong>PostgreSQL / Oracle:</strong> Coi NULL là giá trị lớn nhất. Khi <code>ORDER BY col ASC</code>, NULL mặc định nằm ở <strong>CUỐI (NULLS LAST)</strong>.</li>\n              <li><strong>DuckDB / SQLite / MySQL:</strong> Coi NULL là giá trị nhỏ nhất. Khi <code>ORDER BY col ASC</code>, NULL mặc định nằm ở <strong>ĐẦU (NULLS FIRST)</strong>!</li>\n            </ul>\n            <p><em>Quy tắc vàng của Kỹ sư Dữ liệu:</em> Luôn viết tường minh <code>NULLS FIRST</code> hoặc <code>NULLS LAST</code> trong câu lệnh ORDER BY để mã nguồn chạy đồng nhất 100% trên mọi nền tảng.</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-05-worked-example",
          "title": "Ví dụ mẫu có lời giải: Thoát Ký Tự ESCAPE Trong LIKE & Phân Tầng CASE WHEN",
          "content": "\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:16px;border-radius:8px;background:var(--bg-surface-elevated);margin:16px 0;\">\n              <h4 style=\"margin:0 0 8px;color:var(--text-primary);\">❓ Dự đoán trước khi xem:</h4>\n              <p>Một đơn hàng phát sinh vào lúc <code>'2023-06-30 18:30:00'</code>. Biểu thức điều kiện <code>WHERE order_date BETWEEN '2023-06-01' AND '2023-06-30'</code> có giữ lại đơn hàng này không? Vì sao?</p>\n              <details class=\"predict-details\" style=\"margin-top:12px;padding:10px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem phân tích cơ chế &amp; Đáp án</summary>\n                <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                  <p><strong>Đáp án: HOÀN TOÀN KHÔNG! Đơn hàng bị mất tích!</strong></p>\n                  <p><strong>Cơ chế bản chất:</strong> Chuỗi '2023-06-30 18:30:00' lớn hơn '2023-06-30 00:00:00'. Do đó điều kiện <code>order_date &lt;= '2023-06-30 00:00:00'</code> đánh giá ra FALSE. Đây là nguyên nhân khiến doanh thu ngày cuối tháng bị thiếu hụt.</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Thực nghiệm: Tìm ký tự đặc biệt % bằng ESCAPE và phân loại đơn hàng an toàn",
              "code": "SELECT \n    order_id,\n    total_amount,\n    CASE \n        WHEN total_amount >= 5000000 THEN 'High Value'\n        WHEN total_amount >= 3000000 THEN 'Medium Value'\n        WHEN total_amount > 0 THEN 'Standard Value'\n        ELSE 'Invalid / Zero Amount'\n    END AS amount_tier\nFROM orders\nORDER BY total_amount DESC NULLS LAST;",
              "annotations": [
                {
                  "line": 4,
                  "text": "Đánh giá đoản mạch từ ngưỡng cao xuống ngưỡng thấp"
                },
                {
                  "line": 7,
                  "text": "Bắt buộc có nhánh ELSE dự phòng để không sinh ra NULL ngầm"
                }
              ],
              "explanation": "Đã kiểm chứng trên PostgreSQL 16 và DuckDB 2.0.0. Toàn bộ 6 đơn hàng TechMart được phân hạng chính xác.",
              "output": "+----------+--------------+---------------+\n| order_id | total_amount | amount_tier   |\n+----------+--------------+---------------+\n| 1002     | 8500000.00   | High Value    |\n| 1005     | 6900000.00   | High Value    |\n| 1001     | 4000000.00   | Medium Value  |\n| 1006     | 4000000.00   | Medium Value  |\n| 1004     | 2250000.00   | Standard Value|\n| 1003     | 2200000.00   | Standard Value|\n+----------+--------------+---------------+"
            }
          ]
        },
        {
          "id": "sec-05-faded-example",
          "title": "Bài điền khuyết (Faded Example): Viết Bộ Lọc Nửa Mở [start, end) Cho Thời Gian",
          "content": "\n            <p>Để tính tổng doanh thu quý 2 năm 2023 (từ ngày 01/04/2023 đến hết ngày 30/06/2023), hãy điền các toán tử và giá trị mốc vào vị trí <code>[___1___]</code> đến <code>[___4___]</code> theo chuẩn nửa mở <code>[start, end)</code>:</p>\n\n            <div class=\"code-example-card\">\n              <div class=\"code-card-header\"><span class=\"lang-tag\">SQL (BÀI ĐIỀN KHUYẾT)</span></div>\n              <pre class=\"code-pre\"><code>SELECT \n    COUNT(*) AS total_orders,\n    SUM(total_amount) AS total_revenue\nFROM orders\nWHERE order_date [___1___] '2023-04-01'\n  AND order_date [___2___] [___3___]\n  AND status [___4___] ('COMPLETED', 'SHIPPED');</code></pre>\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top:12px;padding:12px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n              <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án điền khuyết &amp; Giải thích</summary>\n              <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                <p><strong>Đáp án đúng:</strong></p>\n                <ul>\n                  <li><code>[___1___] = >=</code> (Lấy từ 00:00:00 của ngày bắt đầu quý).</li>\n                  <li><code>[___2___] = <</code> (Toán tử nhỏ hơn nghiêm ngặt, không dùng <=).</li>\n                  <li><code>[___3___] = '2023-07-01'</code> (Mốc 00:00:00 của ngày đầu tiên của quý tiếp theo).</li>\n                  <li><code>[___4___] = IN</code> (Toán tử tập hợp kiểm tra trạng thái thành công).</li>\n                </ul>\n                <p>Khoảng nửa mở <code>order_date &gt;= '2023-04-01' AND order_date &lt; '2023-07-01'</code> bảo đảm bắt trọn vẹn từng phần nghìn giây cuối cùng của ngày 30/06 mà không bao giờ bỏ sót bản ghi.</p>\n              </div>\n            </details>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-05-pitfalls-misconceptions",
          "title": "Bẫy và Quan Niệm Sai Phổ Biến Khi Viết Mệnh Đề Lọc",
          "content": "\n            <div class=\"callout-box callout-pitfall\" style=\"margin-bottom:14px;\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 1: Dùng toán tử LIKE với ký tự đại diện đứng đầu (%keyword)</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Hiện tượng:</strong> Viết <code>WHERE product_name LIKE '%Dell%'</code> để tìm kiếm sản phẩm.</p>\n                <p><strong>Hậu quả:</strong> Do ký tự <code>%</code> nằm ở đầu chuỗi, động cơ CSDL không thể tra cứu trên cây chỉ mục B-tree (tương tự việc tra từ điển mà chỉ biết chữ cái cuối cùng). CSDL buộc phải quét toàn bộ bảng (Seq Scan), làm chậm hệ thống khi bảng có hàng triệu dòng!</p>\n                <p><strong>Cách khắc phục:</strong> Chuyển sang sử dụng Full-Text Search hoặc chỉ mục Trigram (pg_trgm trên PostgreSQL).</p>\n              </div>\n            </div>\n\n            <div class=\"callout-box callout-pitfall\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 2: Quên nhánh ELSE trong biểu thức CASE WHEN</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Hiện tượng:</strong> Viết <code>CASE WHEN status = 'COMPLETED' THEN 'Hoàn thành' END</code>.</p>\n                <p><strong>Hậu quả:</strong> Nếu đơn hàng có trạng thái 'CANCELLED' hoặc NULL, biểu thức CASE sẽ tự động trả về <strong>NULL</strong>! Điều này sinh ra các khoảng trống vô hình trên bảng điều khiển BI.</p>\n                <p><strong>Cách sửa đúng:</strong> Luôn luôn có nhánh <code>ELSE 'Khác / Chưa xác định'</code> rõ ràng.</p>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-05-concept-comparison",
          "title": "So Sánh: BETWEEN vs [start, end) & NULLS FIRST vs NULLS LAST",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Tiêu chí</th>\n                    <th scope=\"col\">BETWEEN val1 AND val2</th>\n                    <th scope=\"col\">col &gt;= val1 AND col &lt; val2</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Bản chất toán học</strong></td>\n                    <td>Khoảng đóng <code>[val1, val2]</code> bao gồm cả 2 đầu mút.</td>\n                    <td>Khoảng nửa mở <code>[val1, val2)</code>.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>An toàn với TIMESTAMP?</strong></td>\n                    <td><span class=\"dirty-val\">NGUY HIỂM:</span> Bỏ sót dữ liệu ngày cuối sau 00:00:00.</td>\n                    <td><strong>AN TOÀN TUYỆT ĐỐI:</strong> Bắt trọn 100% từng tích tắc của ngày cuối.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Khuyến nghị sử dụng</strong></td>\n                    <td>Chỉ dùng cho số nguyên (ví dụ: tuổi từ 18 đến 60).</td>\n                    <td><strong>Chuẩn mực bắt buộc cho thời gian</strong> trong Data Engineering.</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-05-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Phân Trang Tất Định (Keyset Pagination) Thay Vì OFFSET",
          "content": "\n            <p>Khi xây dựng giao diện xem danh sách đơn hàng cho người dùng, nhiều lập trình viên thường dùng <code>LIMIT 20 OFFSET 100000</code>. Đây là một thảm họa hiệu năng (O(N)): CSDL phải quét qua và bỏ đi 100.000 dòng trước khi lấy 20 dòng tiếp theo!</p>\n            <p><strong>Kỹ thuật Keyset Pagination (Seek Method):</strong> Dùng chính giá trị của dòng cuối cùng ở trang trước để làm mốc lọc tiếp theo bằng mệnh đề WHERE:</p>\n            <pre class=\"code-pre\"><code>-- Lấy trang tiếp theo mà không tốn công quét lại 100.000 dòng:\nSELECT order_id, order_date, total_amount\nFROM orders\nWHERE (order_date, order_id) < ('2023-06-15', 1005)\nORDER BY order_date DESC, order_id DESC\nLIMIT 20;</code></pre>\n            <p>Kỹ thuật này tận dụng trực tiếp chỉ mục B-tree (độ phức tạp O(log N)), tốc độ phản hồi trang thứ 1 triệu cũng nhanh y hệt như trang số 1!</p>\n          ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Dùng BETWEEN lọc ngày có giờ (TIMESTAMP) làm mất dữ liệu ngày cuối",
            "content": "Tuyệt đối không dùng BETWEEN cho cột TIMESTAMP. Hãy luôn dùng khoảng nửa mở: `WHERE order_date >= \"2023-06-01\" AND order_date < \"2023-07-01\"` để bắt trọn vẹn 100% giây cuối cùng của tháng."
          },
          {
            "title": "Tìm kiếm chuỗi với `%` ở đầu làm sụp đổ chỉ mục B-tree",
            "content": "Cú pháp `WHERE product_name LIKE \"%Dell%\"` buộc CSDL phải quét toàn bộ bảng (Seq Scan) vì không thể tra cứu tiền tố. Nếu cần tìm kiếm từ khóa linh hoạt trên bảng lớn, hãy chuyển sang Full-Text Search hoặc chỉ mục Trigram (pg_trgm)."
          }
        ],
        "tips": [
          {
            "title": "Luôn chỉ định tie-breaker trong ORDER BY để phân trang tất định",
            "content": "Khi sắp xếp phân trang, nếu cột sắp xếp có giá trị trùng nhau, hãy luôn thêm Khóa chính vào cuối: `ORDER BY created_at DESC, id ASC` để đảm bảo thứ tự các trang không bao giờ bị nhảy ngẫu nhiên."
          }
        ],
        "deepDive": {
          "title": "Tối ưu hóa tìm kiếm chuỗi: Giới hạn của LIKE '%abc%' và Chỉ mục Trigram (pg_trgm)",
          "content": "<p>Chỉ mục B-Tree truyền thống chỉ hỗ trợ tìm kiếm tiền tố cố định (ví dụ: <code>WHERE col LIKE 'Hanoi%'</code>). Khi gặp ký tự đại diện ở đầu như <code>'%Hanoi%'</code> hoặc <code>'%Hanoi'</code>, B-Tree hoàn toàn bị vô hiệu hóa vì engine không biết bắt đầu duyệt từ nhánh nào của cây, buộc phải quét toàn bảng (Sequential Scan).</p><p>Để khắc phục trên bảng hàng triệu dòng, PostgreSQL cung cấp extension <code>pg_trgm</code> (Trigram). Trigram chia chuỗi thành các cụm 3 ký tự liên tiếp (ví dụ: 'tech' &rarr; '  t', ' te', 'ech', 'ch ') và lưu vào chỉ mục <strong>GIN (Generalized Inverted Index)</strong> hoặc <strong>GiST</strong>. Nhờ đó, các câu lệnh tìm kiếm gần đúng (Fuzzy Search) hay LIKE hai đầu đều được tăng tốc gấp hàng trăm lần!</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 1.3-1 (Dự đoán & Phân tích): Bẫy lọc doanh thu ngày cuối tháng",
          "level": "Cơ bản",
          "problem": "Xét hai câu truy vấn tính tổng doanh thu tháng 6/2023 trên bảng `orders`:\n\n-- Truy vấn A:\nSELECT SUM(total_amount) FROM orders WHERE order_date BETWEEN \"2023-06-01\" AND \"2023-06-15\";\n\n-- Truy vấn B:\nSELECT SUM(total_amount) FROM orders WHERE order_date >= \"2023-06-01\" AND order_date < \"2023-06-16\";\n\nNếu cột `order_date` là kiểu DATE (không có giờ) thì hai câu truy vấn trên có ra kết quả giống nhau không? Nếu `order_date` đổi thành TIMESTAMP (có giờ) thì chuyện gì sẽ xảy ra?",
          "hint": "Kiểm tra kiểu dữ liệu DATE vs TIMESTAMP khi gặp cận 2023-06-15 14:00:00.",
          "solutionCode": "-- Phân tích bản chất:\n-- 1. Nếu order_date là kiểu DATE: Cả hai câu đều bắt được ngày 2023-06-15 (Kết quả bằng nhau).\n-- 2. Nếu order_date là kiểu TIMESTAMP: \n--    Truy vấn A chỉ lấy đến 2023-06-15 00:00:00 (MẤT toàn bộ đơn hàng phát sinh trong ngày 15/06 sau 0h sáng!).\n--    Truy vấn B lấy trọn vẹn đến 2023-06-15 23:59:59 (ĐÚNG tuyệt đối).",
          "solutionOutput": "Khoảng nửa mở [start, end) luôn là chuẩn mực an toàn duy nhất cho thời gian.",
          "explanation": "Chẩn đoán lỗi: Nếu bạn nghĩ BETWEEN luôn an toàn cho mọi kiểu dữ liệu ngày tháng, bạn sẽ làm mất hàng triệu doanh thu ngày cuối kỳ của doanh nghiệp."
        },
        {
          "title": "Bài tập 1.3-2 (Tìm & Sửa lỗi): Thoát ký tự đặc biệt trong LIKE",
          "level": "Trung bình",
          "problem": "Trong bảng `products`, bạn cần tìm các sản phẩm có tên chứa chuỗi \"Keychron K2\". Một lập trình viên viết: `WHERE product_name LIKE \"%Keychron_K2%\";`. Hãy giải thích vì sao câu lệnh này có thể trả về cả sản phẩm \"Keychron-K2\" hoặc \"Keychron K2\" và viết lại câu lệnh nếu chỉ muốn tìm đúng ký tự dấu cách hoặc gạch dưới.",
          "hint": "Ký tự gạch dưới _ trong LIKE là wildcard đại diện cho 1 ký tự bất kỳ.",
          "solutionCode": "-- Viết lại chuẩn xác chỉ tìm đúng chuỗi \"Keychron K2\":\nSELECT product_id, product_name\nFROM products\nWHERE product_name LIKE '%Keychron K2%';\n\n-- Nếu muốn tìm sản phẩm có chứa ký tự gạch dưới thực sự \"_\":\n-- SELECT * FROM products WHERE product_name LIKE '%!_%' ESCAPE '!';",
          "solutionOutput": "Khớp chính xác chuỗi mong muốn, không bị khớp nhầm ký tự đại diện.",
          "explanation": "Chẩn đoán lỗi: Dấu gạch dưới `_` trong LIKE là wildcard. Nếu không chú ý, nó sẽ khớp với bất kỳ ký tự nào (khoảng trắng, dấu gạch nối, chữ cái)."
        },
        {
          "title": "Bài tập 1.3-3 (Tự viết truy vấn): Phân vùng địa lý và kiểm soát NULLS LAST",
          "level": "Nâng cao",
          "problem": "Từ bảng `customers`, viết truy vấn lấy danh sách khách hàng gồm: `customer_id`, `full_name`, `city` và cột `market_region` được tính bằng CASE WHEN (Hanoi &rarr; \"North\", Ho Chi Minh &rarr; \"South\", Da Nang &rarr; \"Central\", còn lại &rarr; \"Other\"). Sắp xếp kết quả theo `market_region` tăng dần, nếu có giá trị NULL phải đẩy xuống cuối cùng bằng cú pháp chuẩn ISO.",
          "hint": "Dùng CASE WHEN, ORDER BY ... ASC NULLS LAST.",
          "solutionCode": "SELECT \n    customer_id, \n    full_name, \n    city,\n    CASE \n        WHEN city = 'Hanoi' THEN 'North'\n        WHEN city = 'Ho Chi Minh' THEN 'South'\n        WHEN city = 'Da Nang' THEN 'Central'\n        ELSE 'Other'\n    END AS market_region\nFROM customers\nORDER BY market_region ASC NULLS LAST;",
          "solutionOutput": "+-------------+---------------+-------------+---------------+\n| customer_id | full_name     | city        | market_region |\n+-------------+---------------+-------------+---------------+\n| 3           | Le Van Cuong  | Da Nang     | Central       |\n| 1           | Nguyen Van An | Hanoi       | North         |\n| 4           | Pham Thi Dung | Hanoi       | North         |\n| 5           | Hoang Van Em  | Can Tho     | Other         |\n| 2           | Tran Thi Binh | Ho Chi Minh | South         |\n+-------------+---------------+-------------+---------------+\n(5 rows - Đã kiểm chứng trên PostgreSQL 16 & DuckDB 2.0.0)",
          "explanation": "Truy vấn kết hợp mượt mà giữa biến đổi dữ liệu phân nhóm bằng CASE WHEN và sắp xếp an toàn với NULLS LAST."
        },
        {
          "title": "Bài tập 1.3-4 (Đánh đổi & Kiến trúc): IN vs EXISTS khi danh sách có giá trị NULL",
          "level": "Nâng cao",
          "problem": "Xét câu lệnh lọc đơn hàng của khách hàng VIP: `WHERE customer_id IN (SELECT customer_id FROM vip_customers)`. Nếu trong bảng `vip_customers` có 1 dòng chứa `customer_id IS NULL`, câu lệnh có chạy đúng không? Nếu đổi thành `NOT IN` thì chuyện gì xảy ra?",
          "hint": "Nhớ lại bẫy NOT IN với NULL ở Bài 0.3.",
          "solutionCode": "-- 1. Với IN: Vẫn chạy bình thường cho các customer_id khác NULL.\n-- 2. Với NOT IN: Thảm họa xảy ra! Do bẫy 3VL (NOT (UNKNOWN) = UNKNOWN),\n--    toàn bộ biểu thức đánh giá ra UNKNOWN, truy vấn trả về tập RỖNG hoàn toàn!\n-- Khắc phục: Luôn dùng NOT EXISTS hoặc thêm WHERE customer_id IS NOT NULL.",
          "solutionOutput": "NOT IN với NULL luôn sinh ra tập kết quả rỗng.",
          "explanation": "Chẩn đoán lỗi: Nếu bạn dùng NOT IN mà không lọc NULL ở subquery, pipeline dữ liệu sẽ bị mất trắng dữ liệu."
        }
      ],
      "quiz": [
        {
          "question": "Tại sao việc sử dụng toán tử BETWEEN cho cột kiểu TIMESTAMP thường bị coi là cạm bẫy trong Data Engineering?",
          "options": [
            "Vì BETWEEN chạy chậm hơn toán tử so sánh >= gấp 10 lần.",
            "Vì khi truyền ngày kết thúc dạng YYYY-MM-DD, CSDL sẽ tự động ép thành YYYY-MM-DD 00:00:00, làm bỏ sót toàn bộ các bản ghi phát sinh trong ngày cuối cùng sau 0 giờ sáng.",
            "Vì BETWEEN không hỗ trợ kiểu dữ liệu ngày tháng trong chuẩn ANSI SQL.",
            "Vì BETWEEN luôn tự động làm tròn giờ về đầu tháng."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Chuẩn mực của Kỹ sư Dữ liệu là luôn dùng khoảng nửa mở: WHERE col >= start_date AND col < end_date để bảo đảm tính trọn vẹn của dữ liệu."
        },
        {
          "question": "Bạn cần tìm các sản phẩm có mã hàng chứa chính xác ký tự gạch dưới _ (ví dụ: SP_01). Câu lệnh chuẩn ANSI SQL nào sau đây thực hiện chính xác yêu cầu mà không bị CSDL hiểu _ là ký tự đại diện?",
          "options": [
            "WHERE product_code LIKE '%_%';",
            "WHERE product_code LIKE '%!_%' ESCAPE '!';",
            "WHERE product_code = '%_%';",
            "WHERE product_code CONTAINS '_';"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Ký tự gạch dưới _ trong LIKE là wildcard đại diện cho 1 ký tự bất kỳ. Để tìm chính xác ký tự _, bắt buộc phải sử dụng mệnh đề ESCAPE để chỉ định ký tự thoát."
        },
        {
          "question": "Xét biểu thức: CASE WHEN 1 = 1 THEN 'A' WHEN (10 / 0) = 1 THEN 'B' ELSE 'C' END. Khi chạy trên các RDBMS tuân theo chuẩn ANSI, điều gì sẽ xảy ra?",
          "options": [
            "Hệ thống văng lỗi chia cho 0 (Division by zero) ngay khi phân tích câu lệnh.",
            "Biểu thức trả về 'A' an toàn do cơ chế đoản mạch (Short-circuit Evaluation); nhánh WHEN đầu tiên đúng nên CSDL dừng đánh giá ngay lập tức.",
            "Biểu thức trả về 'C' từ nhánh ELSE.",
            "Biểu thức trả về NULL."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Biểu thức CASE WHEN đánh giá đoản mạch từ trên xuống dưới. Nhánh đầu tiên 1=1 ra TRUE nên CSDL trả về 'A' mà không bao giờ thực thi phép tính lỗi 10/0 ở nhánh thứ hai."
        },
        {
          "question": "Khi thực hiện câu lệnh: SELECT * FROM orders ORDER BY shipped_date ASC; trên PostgreSQL và SQLite, các đơn hàng có shipped_date mang giá trị NULL sẽ xuất hiện ở đâu?",
          "options": [
            "Cả hai hệ quản trị đều đẩy NULL lên vị trí đầu tiên.",
            "Cả hai hệ quản trị đều đẩy NULL xuống vị trí cuối cùng.",
            "Trên PostgreSQL, NULL mặc định nằm ở CUỐI CÙNG (NULLS LAST); trên SQLite / DuckDB, NULL mặc định nằm ở ĐẦU TIÊN (NULLS FIRST).",
            "CSDL sẽ tự động loại bỏ các dòng có shipped_date mang giá trị NULL."
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Chuẩn ISO SQL không ép buộc vị trí mặc định của NULL. Luôn luôn viết tường minh NULLS FIRST hoặc NULLS LAST trong ORDER BY để đảm bảo tính nhất quán giữa các hệ thống."
        },
        {
          "question": "Bảng inactive_users có 3 bản ghi chứa user_id là: [10, 20, NULL]. Truy vấn: SELECT * FROM users WHERE user_id NOT IN (SELECT user_id FROM inactive_users); sẽ trả về kết quả gì?",
          "options": [
            "Trả về các user có user_id khác 10 và 20.",
            "Luôn trả về tập kết quả RỖNG (0 dòng) đối với mọi bản ghi trong bảng users do bẫy chân trị UNKNOWN của toán tử NOT IN.",
            "Báo lỗi cú pháp vì subquery chứa giá trị NULL.",
            "Chỉ trả về các user có user_id bằng 10 hoặc 20."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Biểu thức NOT IN tương đương với phép AND giữa các phép so sánh !=. Khi gặp NULL, phép so sánh sinh ra UNKNOWN, khiến toàn bộ biểu thức NOT IN trở thành UNKNOWN và mệnh đề WHERE loại bỏ tất cả các dòng."
        }
      ],
      "summary": [
        "Tránh dùng BETWEEN cho TIMESTAMP; luôn dùng khoảng nửa mở `[start, end)` để không bỏ sót ngày cuối kỳ.",
        "Sử dụng mệnh đề `ESCAPE` trong LIKE khi cần tìm kiếm chính xác các ký tự đặc biệt `%` và `_`.",
        "Luôn viết tường minh `NULLS FIRST` hoặc `NULLS LAST` trong ORDER BY để đảm bảo tính nhất quán trên mọi hệ quản trị.",
        "Mệnh đề CASE WHEN đánh giá đoản mạch (short-circuit); bắt buộc phải có nhánh `ELSE` để phòng ngừa sinh ra giá trị NULL ngầm.",
        "Ôn cách quãng: Tại sao phép chia 5 / 2 trong SQL lại ra 2 thay vì 2.5? (Xem lại Bài 1.1)."
      ],
      "deepDive": {
        "title": "Tối ưu hóa tìm kiếm chuỗi: Giới hạn của LIKE '%abc%' và Chỉ mục Trigram (pg_trgm)",
        "content": "<p>Chỉ mục B-Tree truyền thống chỉ hỗ trợ tìm kiếm tiền tố cố định (ví dụ: <code>WHERE col LIKE 'Hanoi%'</code>). Khi gặp ký tự đại diện ở đầu như <code>'%Hanoi%'</code> hoặc <code>'%Hanoi'</code>, B-Tree hoàn toàn bị vô hiệu hóa vì engine không biết bắt đầu duyệt từ nhánh nào của cây, buộc phải quét toàn bảng (Sequential Scan).</p><p>Để khắc phục trên bảng hàng triệu dòng, PostgreSQL cung cấp extension <code>pg_trgm</code> (Trigram). Trigram chia chuỗi thành các cụm 3 ký tự liên tiếp (ví dụ: 'tech' &rarr; '  t', ' te', 'ech', 'ch ') và lưu vào chỉ mục <strong>GIN (Generalized Inverted Index)</strong> hoặc <strong>GiST</strong>. Nhờ đó, các câu lệnh tìm kiếm gần đúng (Fuzzy Search) hay LIKE hai đầu đều được tăng tốc gấp hàng trăm lần!</p>"
      }
    },
    {
      "id": "sql-06-execution-order",
      "number": "1.4",
      "title": "Vòng Đời Thực Thi Logic Của Một Truy Vấn (Logical Execution Order)",
      "subtitle": "FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT: Ngữ nghĩa vs Kế hoạch vật lý",
      "level": "Cơ bản",
      "duration": "45 phút",
      "keywords": [
        "Logical Execution Order",
        "Query Lifecycle",
        "Predicate Pushdown",
        "Alias Scope",
        "WHERE vs HAVING",
        "Physical Plan"
      ],
      "prerequisites": "Thành thạo SELECT, WHERE, CASE WHEN (Bài 1.3) và tư duy khai báo (Bài 0.2).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Khắc cốt ghi tâm thứ tự 8 bước thực thi logic của câu truy vấn SQL chuẩn: FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT.",
        "Phân biệt rạch ròi giữa Thứ tự Ngữ nghĩa Logic (Logical Semantics) và Kế hoạch thực thi Vật lý (Physical Execution Plan) của Bộ tối ưu hóa (Optimizer).",
        "Giải thích cặn kẽ bản chất vì sao chuẩn ANSI SQL cấm dùng bí danh (Alias) của SELECT trong mệnh đề WHERE và GROUP BY.",
        "Phân tích sự khác biệt về mặt hiệu năng và cơ chế lưu vết giữa WHERE (lọc dòng thô trước gom nhóm) và HAVING (lọc nhóm sau tính toán).",
        "Nhận diện các mở rộng riêng của từng hệ quản trị (DuckDB/MySQL/SQLite) và rủi ro khi viết code không tương thích chuẩn."
      ],
      "intuition": {
        "title": "Quy trình sản xuất nước cam đóng chai tại nhà máy",
        "metaphor": "Hãy tưởng tượng quy trình chế biến nước cam tại một nhà máy:\n1. Bước 1 (FROM): Xe tải chở cam từ các nông trại về xưởng tập kết.\n2. Bước 2 (WHERE): Công nhân nhặt bỏ những quả cam bị sâu, thối hoặc dập nát trước khi ép (lọc dòng thô).\n3. Bước 3 (GROUP BY): Cam đạt chuẩn được chia vào các thùng theo giống: Cam sành, Cam sành Hà Giang, Cam mật (gom nhóm).\n4. Bước 4 (HAVING): Quản đốc kiểm tra: \"Thùng giống cam nào vắt ra dưới 50 lít nước thì bỏ qua không đóng chai\" (lọc nhóm).\n5. Bước 5 (SELECT): Nước cam từ các thùng đạt chuẩn được rót vào chai và DÁN NHÃN MÁC THƯƠNG HIỆU (bước đặt tên Alias).\n6. Bước 6 (DISTINCT): Loại bỏ các chai nước bị dán nhãn trùng lặp.\n7. Bước 7 (ORDER BY): Xếp các thùng nước cam lên kệ theo thứ tự giá từ cao xuống thấp.\n8. Bước 8 (LIMIT): Xe giao hàng chỉ bốc đúng 10 thùng đầu tiên đi giao.",
        "boundary": "Ẩn dụ này giải thích vì sao bạn không thể dùng \"Nhãn chai\" (Alias ở SELECT) ngay từ Bước 2 (WHERE): lúc ở Bước 2 quả cam còn chưa được ép lấy nước và chưa hề được dán nhãn thì làm sao bạn gọi tên nhãn đó được!",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"padding:6px 10px;min-width:95px;text-align:center;\">\n                <div style=\"font-size:0.68rem;color:var(--text-muted);font-weight:700;\">1. TẬP KẾT</div>\n                <div style=\"font-size:0.88rem;font-weight:800;font-family:monospace;\">FROM / JOIN</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"margin:auto 0;\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"padding:6px 10px;min-width:95px;text-align:center;\">\n                <div style=\"font-size:0.68rem;color:var(--text-muted);font-weight:700;\">2. LỌC THÔ</div>\n                <div style=\"font-size:0.88rem;font-weight:800;font-family:monospace;\">WHERE</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"margin:auto 0;\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"padding:6px 10px;min-width:95px;text-align:center;\">\n                <div style=\"font-size:0.68rem;color:var(--text-muted);font-weight:700;\">3. GOM NHÓM</div>\n                <div style=\"font-size:0.88rem;font-weight:800;font-family:monospace;\">GROUP BY</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"margin:auto 0;\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"padding:6px 10px;min-width:95px;text-align:center;\">\n                <div style=\"font-size:0.68rem;color:var(--text-muted);font-weight:700;\">4. LỌC NHÓM</div>\n                <div style=\"font-size:0.88rem;font-weight:800;font-family:monospace;\">HAVING</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"margin:auto 0;\">&rarr;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"padding:6px 10px;min-width:95px;text-align:center;\">\n                <div style=\"font-size:0.68rem;color:var(--topic-sql);font-weight:700;\">5. CHIẾU/ĐẶT TÊN</div>\n                <div style=\"font-size:0.88rem;font-weight:800;font-family:monospace;\">SELECT</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"margin:auto 0;\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"padding:6px 10px;min-width:95px;text-align:center;\">\n                <div style=\"font-size:0.68rem;color:var(--text-muted);font-weight:700;\">6. KHỬ TRÙNG</div>\n                <div style=\"font-size:0.88rem;font-weight:800;font-family:monospace;\">DISTINCT</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"margin:auto 0;\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"padding:6px 10px;min-width:95px;text-align:center;\">\n                <div style=\"font-size:0.68rem;color:var(--text-muted);font-weight:700;\">7. SẮP XẾP</div>\n                <div style=\"font-size:0.88rem;font-weight:800;font-family:monospace;\">ORDER BY</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"margin:auto 0;\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"padding:6px 10px;min-width:95px;text-align:center;\">\n                <div style=\"font-size:0.68rem;color:var(--text-muted);font-weight:700;\">8. CẮT DÒNG</div>\n                <div style=\"font-size:0.88rem;font-weight:800;font-family:monospace;\">LIMIT</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ Tầm vực bí danh:</span>\n              <span>Bí danh sinh ra ở <strong>Bước 5 (SELECT)</strong>, do đó Bước 2 (WHERE) và Bước 3 (GROUP BY) hoàn toàn KHÔNG THỂ gọi tên bí danh; nhưng <strong>Bước 7 (ORDER BY)</strong> thì nhận diện trọn vẹn!</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-06-problem-hook",
          "title": "Gợi mở vấn đề: Vì sao ORDER BY nhận diện được Alias nhưng WHERE thì không?",
          "content": "\n            <p>Hầu như mọi lập trình viên khi mới học SQL đều từng gặp lỗi biên dịch kỳ lạ này: Bạn tính lợi nhuận đơn hàng bằng công thức <code>(price - cost) AS profit</code> ở mệnh đề SELECT, sau đó bạn muốn lọc các sản phẩm có lãi trên 500.000đ:</p>\n            <pre class=\"code-pre\"><code>SELECT product_name, (price - cost) AS profit\nFROM products\nWHERE profit > 500000; -- LỖI BIÊN DỊCH: column \"profit\" does not exist!</code></pre>\n            <p>Nhưng điều kỳ lạ là, nếu bạn viết <code>ORDER BY profit DESC</code>, câu lệnh lại chạy mượt mà 100%! Tại sao cùng là bí danh <code>profit</code>, mệnh đề WHERE thì bảo \"không tồn tại\", còn mệnh đề ORDER BY lại hiểu rất rõ?</p>\n            <p><strong>Bản chất vấn đề:</strong> Câu lệnh SQL được VIẾT bắt đầu bằng chữ <code>SELECT</code>, nhưng CSDL lại THỰC THI theo một thứ tự hoàn toàn khác! Hiểu được <strong>Vòng đời thực thi logic 8 bước</strong> sẽ giúp bạn làm chủ hoàn toàn tầm vực của biến và bí danh trong SQL.</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-06-recall-prereq",
          "title": "Gọi lại kiến thức cũ: Kiểm tra tư duy Khai báo vs Thực thi",
          "content": "\n            <p>Trước khi giải mã 8 bước thực thi, hãy truy hồi 2 câu hỏi từ Bài 0.2 và Bài 1.3:</p>\n            \n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n              <p><strong>Câu hỏi 1:</strong> Trong tư duy Khai báo (Declarative Mindset), người viết SQL chỉ định \"CÁI GÌ\" (What) hay chỉ định \"CÁCH LÀM\" (How)?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Người viết chỉ định \"CÁI GÌ\" (tập kết quả mong muốn). Bộ tối ưu hóa truy vấn (Query Optimizer) sẽ tự động tìm ra \"CÁCH LÀM\" tối ưu nhất bằng Kế hoạch thực thi vật lý (Physical Plan).</p>\n                </div>\n              </details>\n            </div>\n\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n              <p><strong>Câu hỏi 2:</strong> Khi nào một biểu thức CASE WHEN tự động trả về giá trị NULL?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Khi không có nhánh WHEN nào thỏa mãn TRUE và biểu thức không có nhánh ELSE dự phòng.</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-06-concept-definition",
          "title": "Khái niệm cốt lõi: Bảng 8 Bước Thực Thi Logic Chuẩn ISO SQL",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Thứ tự</th>\n                    <th scope=\"col\">Mệnh đề</th>\n                    <th scope=\"col\">Hành động thực thi của CSDL</th>\n                    <th scope=\"col\">Dữ liệu trung gian tạo ra</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>1</strong></td>\n                    <td><code>FROM / JOIN</code></td>\n                    <td>Xác định bảng nguồn, nạp các trang dữ liệu và thực hiện tích ghép các bảng</td>\n                    <td>Bảng ảo VT1 chứa tất cả các cột của các bảng tham gia</td>\n                  </tr>\n                  <tr>\n                    <td><strong>2</strong></td>\n                    <td><code>WHERE</code></td>\n                    <td>Lọc từng dòng thô dựa trên các vị từ điều kiện (chỉ giữ lại TRUE)</td>\n                    <td>Bảng ảo VT2 gồm các dòng thỏa mãn điều kiện</td>\n                  </tr>\n                  <tr>\n                    <td><strong>3</strong></td>\n                    <td><code>GROUP BY</code></td>\n                    <td>Gom các dòng có chung giá trị khóa gom nhóm thành các cụm (Buckets)</td>\n                    <td>Bảng ảo VT3 gồm các nhóm phân vùng</td>\n                  </tr>\n                  <tr>\n                    <td><strong>4</strong></td>\n                    <td><code>HAVING</code></td>\n                    <td>Lọc các nhóm thỏa mãn điều kiện hàm tổng hợp (SUM, COUNT, AVG)</td>\n                    <td>Bảng ảo VT4 gồm các nhóm đạt chuẩn chất lượng</td>\n                  </tr>\n                  <tr>\n                    <td><strong>5</strong></td>\n                    <td><code>SELECT</code></td>\n                    <td>Tính toán biểu thức toán học, chọn cột cần lấy và gán bí danh (Alias)</td>\n                    <td>Bảng ảo VT5 gồm các cột kết quả cuối cùng</td>\n                  </tr>\n                  <tr>\n                    <td><strong>6</strong></td>\n                    <td><code>DISTINCT</code></td>\n                    <td>Loại bỏ các dòng có giá trị hoàn toàn trùng lặp</td>\n                    <td>Bảng ảo VT6 gồm các dòng duy nhất</td>\n                  </tr>\n                  <tr>\n                    <td><strong>7</strong></td>\n                    <td><code>ORDER BY</code></td>\n                    <td>Sắp xếp tập kết quả theo tiêu chí tăng/giảm dần</td>\n                    <td>Bảng ảo VT7 đã được định thứ tự</td>\n                  </tr>\n                  <tr>\n                    <td><strong>8</strong></td>\n                    <td><code>LIMIT / OFFSET</code></td>\n                    <td>Cắt bớt số lượng dòng trả về cho ứng dụng</td>\n                    <td>Tập kết quả cuối cùng chuyển lên tầng mạng</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-06-internal-mechanism",
          "title": "Cơ chế bên trong: Ma Trận Tầm Vực Bí Danh (Alias Scope Matrix)",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Mệnh đề</th>\n                    <th scope=\"col\">Có thấy Alias của SELECT không?</th>\n                    <th scope=\"col\">Giải thích cơ chế &amp; Chuẩn ANSI SQL</th>\n                    <th scope=\"col\">Ngoại lệ giữa các hệ quản trị</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><code>WHERE</code></td>\n                    <td><span class=\"dirty-val\">KHÔNG</span></td>\n                    <td>WHERE chạy ở Bước 2; bí danh ở SELECT mãi đến Bước 5 mới ra đời!</td>\n                    <td>Chuẩn ANSI, PostgreSQL, Oracle, SQL Server đều cấm tuyệt đối.</td>\n                  </tr>\n                  <tr>\n                    <td><code>GROUP BY</code></td>\n                    <td><span class=\"dirty-val\">KHÔNG (Theo chuẩn)</span></td>\n                    <td>GROUP BY chạy ở Bước 3, trước Bước 5 (SELECT).</td>\n                    <td>PostgreSQL cấm; DuckDB, SQLite và MySQL cho phép dùng alias của SELECT.</td>\n                  </tr>\n                  <tr>\n                    <td><code>HAVING</code></td>\n                    <td><span class=\"dirty-val\">KHÔNG (Theo chuẩn)</span></td>\n                    <td>HAVING chạy ở Bước 4, trước Bước 5 (SELECT).</td>\n                    <td>PostgreSQL cấm; DuckDB và MySQL hỗ trợ mở rộng.</td>\n                  </tr>\n                  <tr>\n                    <td><code>ORDER BY</code></td>\n                    <td><strong>CÓ (100%)</strong></td>\n                    <td>ORDER BY chạy ở Bước 7, NẰM SAU Bước 5 (SELECT). Lúc này Alias đã tồn tại hoàn chỉnh!</td>\n                    <td>Tất cả các hệ quản trị chuẩn (PostgreSQL, DuckDB, Oracle, SQL Server) đều hỗ trợ.</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n\n            <p><strong>Lưu ý sâu sắc về kiến trúc: Logic Semantics vs Physical Execution Plan</strong></p>\n            <p>Thứ tự 8 bước trên là thứ tự định nghĩa <strong>ngữ nghĩa toán học</strong> của câu lệnh. Tuy nhiên, Bộ tối ưu hóa truy vấn (Query Optimizer) có quyền tự do thực thi theo thứ tự vật lý khác miễn là kết quả không đổi:</p>\n            <ul>\n              <li><strong>Predicate Pushdown:</strong> Optimizer đẩy điều kiện lọc trong <code>WHERE</code> xuống sâu bên dưới để lọc bớt dòng <em>trước khi</em> thực hiện phép JOIN đắt đỏ!</li>\n              <li><strong>Early Projection:</strong> Engine chỉ nạp đúng các cột cần thiết ở SELECT từ đĩa cứng lên RAM thay vì nạp toàn bộ các cột của bảng.</li>\n            </ul>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-06-worked-example",
          "title": "Ví dụ mẫu có lời giải: 2 Cách Khắc Phục Lỗi Alias Trong WHERE",
          "content": "\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:16px;border-radius:8px;background:var(--bg-surface-elevated);margin:16px 0;\">\n              <h4 style=\"margin:0 0 8px;color:var(--text-primary);\">❓ Dự đoán trước khi xem:</h4>\n              <p>Xét câu truy vấn sau nhằm tìm các thành phố có từ 2 khách hàng trở lên:</p>\n              <pre class=\"code-pre\"><code>SELECT city, COUNT(*) AS total_cust\nFROM customers\nWHERE total_cust >= 2\nGROUP BY city;</code></pre>\n              <p>Theo bạn, câu lệnh trên có chạy thành công không hay báo lỗi gì? Vì sao?</p>\n              <details class=\"predict-details\" style=\"margin-top:12px;padding:10px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem phân tích cơ chế &amp; Đáp án</summary>\n                <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                  <p><strong>Đáp án: BÁO LỖI BIÊN DỊCH NGAY LẬP TỨC! (ERROR: column \"total_cust\" does not exist)</strong></p>\n                  <p><strong>Cơ chế bản chất:</strong> Mệnh đề <code>WHERE</code> chạy ở Bước 2, trước khi hàm gom nhóm <code>COUNT(*)</code> được tính toán ở Bước 3 và Bước 5! Điều kiện lọc trên hàm tổng hợp bắt buộc phải đặt ở mệnh đề <code>HAVING COUNT(*) >= 2</code> (thực thi ở Bước 4 sau GROUP BY).</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Lỗi biên dịch khi dùng Alias trong WHERE và 2 cách khắc phục chuẩn mực",
              "code": "-- CÁCH 1: Lặp lại biểu thức gốc trong WHERE (Query Optimizer tự tối ưu, không tính 2 lần)\nSELECT product_id, product_name, (price - cost) AS profit\nFROM products\nWHERE (price - cost) > 500000;\n\n-- CÁCH 2: Bọc bằng CTE (Phong cách kỹ sư dữ liệu sạch sẽ, chuẩn ANSI SQL)\nWITH product_profits AS (\n    SELECT product_id, product_name, (price - cost) AS profit\n    FROM products\n)\nSELECT product_id, product_name, profit\nFROM product_profits\nWHERE profit > 500000;",
              "annotations": [
                {
                  "line": 4,
                  "text": "Lặp lại biểu thức giúp tuân thủ chuẩn ANSI mà không sợ tốn CPU vì Optimizer tự nhận diện"
                },
                {
                  "line": 7,
                  "text": "Dùng CTE đóng gói giúp tái sử dụng alias ở mọi mệnh đề phía sau"
                }
              ],
              "explanation": "Đã kiểm chứng thành công trên PostgreSQL 16 và DuckDB 2.0.0. Cả hai cách đều trả về chính xác 4 sản phẩm có lợi nhuận trên 500.000đ.",
              "output": "+------------+----------------------------------+------------+\n| product_id | product_name                     | profit     |\n+------------+----------------------------------+------------+\n| 101        | Ban phim co Keychron K2          | 600000.00  |\n| 102        | Chuot Logitech MX Master 3S      | 700000.00  |\n| 103        | Man hinh Dell Ultrasharp 27 inch | 2000000.00 |\n| 104        | Tai nghe Sony WH-1000XM5         | 1800000.00 |\n+------------+----------------------------------+------------+"
            }
          ]
        },
        {
          "id": "sec-06-faded-example",
          "title": "Bài điền khuyết (Faded Example): Tối Ưu Hóa Truy Vấn Chuyển Lọc Sang WHERE",
          "content": "\n            <p>Một truy vấn báo cáo đang chạy chậm vì đặt điều kiện lọc dòng thô vào mệnh đề HAVING. Hãy điền các từ khóa và mệnh đề thích hợp vào vị trí <code>[___1___]</code> đến <code>[___4___]</code> để tối ưu hóa truy vấn:</p>\n\n            <div class=\"code-example-card\">\n              <div class=\"code-card-header\"><span class=\"lang-tag\">SQL (BÀI ĐIỀN KHUYẾT)</span></div>\n              <pre class=\"code-pre\"><code>SELECT \n    city, \n    COUNT(*) AS total_orders, \n    SUM(total_amount) AS total_revenue\nFROM customers c\nJOIN orders o ON c.customer_id = o.customer_id\n[___1___] o.status = 'COMPLETED'\n[___2___] city\n[___3___] [___4___] >= 2;</code></pre>\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top:12px;padding:12px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n              <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án điền khuyết &amp; Giải thích</summary>\n              <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                <p><strong>Đáp án đúng:</strong></p>\n                <ul>\n                  <li><code>[___1___] = WHERE</code> (Đẩy điều kiện lọc trạng thái 'COMPLETED' xuống Bước 2 để loại bỏ dòng rác trước khi gom nhóm).</li>\n                  <li><code>[___2___] = GROUP BY</code> (Gom nhóm theo thành phố ở Bước 3).</li>\n                  <li><code>[___3___] = HAVING</code> (Lọc nhóm ở Bước 4 sau khi gom cụm).</li>\n                  <li><code>[___4___] = COUNT(*)</code> (Điều kiện lọc trên hàm tổng hợp bắt buộc phải viết ở HAVING).</li>\n                </ul>\n              </div>\n            </details>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-06-pitfalls-misconceptions",
          "title": "Bẫy và Quan Niệm Sai Phổ Biến Về Vòng Đời Thực Thi",
          "content": "\n            <div class=\"callout-box callout-pitfall\" style=\"margin-bottom:14px;\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 1: Đẩy điều kiện lọc dòng thô vào mệnh đề HAVING</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Ví dụ sai:</strong> Viết <code>HAVING category = 'Accessories'</code> thay vì <code>WHERE category = 'Accessories'</code>.</p>\n                <p><strong>Cơ chế sai:</strong> CSDL vẫn trả về kết quả đúng nhưng nó buộc phải gom nhóm toàn bộ sản phẩm của tất cả các danh mục vào bộ nhớ rồi mới lọc bỏ, làm chậm truy vấn gấp 20 lần trên bảng lớn!</p>\n                <p><strong>Quy tắc vàng:</strong> Điều kiện nào không chứa hàm tổng hợp (COUNT, SUM, AVG) thì <strong>bắt buộc phải nằm ở WHERE</strong>.</p>\n              </div>\n            </div>\n\n            <div class=\"callout-box callout-pitfall\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 2: Viết code phụ thuộc vào tính năng nới lỏng của MySQL / DuckDB</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Hiện tượng:</strong> Dùng alias của SELECT trong mệnh đề WHERE hoặc GROUP BY. Câu lệnh chạy được trên máy cá nhân (chạy DuckDB hoặc MySQL) nhưng khi deploy lên Production chạy PostgreSQL, BigQuery hay Snowflake thì sập hoàn toàn do lỗi cú pháp!</p>\n                <p><strong>Cách khắc phục:</strong> Luôn bọc bằng CTE hoặc lặp lại biểu thức để giữ mã nguồn chuẩn ANSI 100%.</p>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-06-concept-comparison",
          "title": "So Sánh Bản Chất: WHERE vs HAVING",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Tiêu chí so sánh</th>\n                    <th scope=\"col\">Mệnh đề WHERE</th>\n                    <th scope=\"col\">Mệnh đề HAVING</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Thời điểm thực thi</strong></td>\n                    <td>Bước 2 (Trước khi gom nhóm GROUP BY)</td>\n                    <td>Bước 4 (Sau khi gom nhóm GROUP BY)</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Đối tượng tác động</strong></td>\n                    <td>Từng dòng dữ liệu thô đơn lẻ</td>\n                    <td>Tập hợp các nhóm sau tính toán</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Hỗ trợ chỉ mục B-tree?</strong></td>\n                    <td><strong>CÓ:</strong> Tận dụng B-tree index để lọc cực nhanh</td>\n                    <td><strong>KHÔNG:</strong> Quét trên các nhóm trong bộ nhớ RAM</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Chứa hàm tổng hợp?</strong></td>\n                    <td><span class=\"dirty-val\">CẤM:</span> Không được chứa SUM, COUNT, AVG</td>\n                    <td><strong>BẮT BUỘC / KHUYẾN NGHỊ:</strong> Chuyên dụng cho hàm tổng hợp</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-06-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Khi Nào Optimizer Tự Đẩy Điều Kiện (Predicate Pushdown)?",
          "content": "\n            <p>Trong các hệ thống phân tích hiện đại (như DuckDB, Spark SQL, PostgreSQL), Bộ tối ưu hóa truy vấn (Query Optimizer) rất thông minh. Khi bạn viết một câu truy vấn có lồng Subquery hoặc CTE:</p>\n            <pre class=\"code-pre\"><code>WITH raw_orders AS (\n    SELECT * FROM orders\n)\nSELECT * FROM raw_orders WHERE customer_id = 1;</code></pre>\n            <p>Optimizer sẽ tự động thực hiện <strong>Predicate Pushdown</strong>: đẩy điều kiện <code>WHERE customer_id = 1</code> vào sâu bên trong bảng <code>orders</code> trước khi nạp dữ liệu lên, chứ không bao giờ nạp toàn bộ 5 triệu dòng vào CTE rồi mới lọc!</p>\n            <p>Tuy nhiên, Optimizer sẽ <strong>bất lực không thể pushdown</strong> nếu trong Subquery/CTE có chứa: <code>OFFSET</code>, các hàm Volatile (như <code>RANDOM()</code>), hoặc các câu lệnh phân tích cửa sổ phức tạp. Hiểu rõ vòng đời thực thi logic giúp bạn viết truy vấn hỗ trợ tốt nhất cho Optimizer.</p>\n          ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi đẩy điều kiện lọc dòng thô vào mệnh đề HAVING",
            "content": "Viết `HAVING category = \"Accessories\"` thay vì `WHERE category = \"Accessories\"`. CSDL vẫn chạy ra kết quả đúng nhưng nó buộc phải gom nhóm toàn bộ sản phẩm của tất cả các danh mục rồi mới lọc bỏ, làm chậm truy vấn gấp 20 lần trên bảng lớn!"
          },
          {
            "title": "Viết SQL phụ thuộc vào tính năng nới lỏng của MySQL / DuckDB",
            "content": "Dùng alias của SELECT trong mệnh đề WHERE hoặc GROUP BY. Câu lệnh sẽ chạy được trên máy cá nhân (chạy DuckDB/MySQL) nhưng khi đưa lên môi trường sản xuất chạy PostgreSQL, BigQuery hay Snowflake sẽ bị sập hoàn toàn do lỗi cú pháp."
          }
        ],
        "tips": [
          {
            "title": "Dùng CTE để giữ mã nguồn tuân thủ chuẩn ANSI SQL",
            "content": "Bất cứ khi nào bạn có một biểu thức tính toán phức tạp (như tính khoảng cách ngày, CASE WHEN dài) mà muốn lọc ở WHERE hoặc GROUP BY, hãy bọc câu lệnh trong một Common Table Expression (CTE). Mã nguồn vừa sáng sủa, vừa tối ưu, vừa tương thích 100% mọi engine."
          }
        ],
        "deepDive": {
          "title": "Bên trong Engine: Vì sao SQL Compiler phân tách Logical Semantics khỏi Physical Plan?",
          "content": "<p>Khi bạn gửi một câu truy vấn SQL, Compiler trước tiên xây dựng Cây Cú pháp Trừu tượng (AST) và diễn giải theo đúng <strong>Thứ tự Ngữ nghĩa Logic (Logical Semantics: FROM &rarr; WHERE &rarr; GROUP BY &rarr; HAVING &rarr; SELECT &rarr; ORDER BY)</strong> để kiểm tra phạm vi biến và tính hợp lệ của câu lệnh.</p><p>Tuy nhiên, tầng <strong>Cost-Based Optimizer (CBO)</strong> sẽ biến đổi cây logic này thành <strong>Kế hoạch Thực thi Vật lý (Physical Plan)</strong>. CBO có thể đảo thứ tự thực tế: ví dụ kỹ thuật <strong>Predicate Pushdown</strong> đẩy điều kiện WHERE xuống đọc lọc dữ liệu trước khi JOIN, hoặc kỹ thuật <strong>Early Distinct</strong>. Việc phân tách giữa Logic (What) và Physical (How) chính là sức mạnh tối thượng giúp SQL tồn tại hơn 50 năm qua.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 1.4-1 (Dự đoán & Phân tích): Vì sao ORDER BY nhận diện được Alias nhưng WHERE thì không?",
          "level": "Cơ bản",
          "problem": "Xét hai câu truy vấn sau:\n-- Câu A:\nSELECT customer_id, (total_amount * 0.1) AS tax FROM orders WHERE tax > 400000;\n-- Câu B:\nSELECT customer_id, (total_amount * 0.1) AS tax FROM orders ORDER BY tax DESC;\n\nGiải thích cặn kẽ theo vòng đời 8 bước thực thi: Vì sao Câu A báo lỗi cú pháp trên PostgreSQL nhưng Câu B lại chạy mượt mà?",
          "hint": "Đối chiếu vị trí của WHERE (Bước 2), SELECT (Bước 5) và ORDER BY (Bước 7).",
          "solutionCode": "-- Giải thích cơ chế bên trong:\n-- 1. Câu A: WHERE thực thi ở Bước 2. Lúc này mệnh đề SELECT (Bước 5) chưa hề chạy,\n--    bí danh \"tax\" chưa tồn tại trong bộ nhớ -> CSDL báo lỗi column \"tax\" does not exist.\n-- 2. Câu B: ORDER BY thực thi ở Bước 7. Lúc này mệnh đề SELECT (Bước 5) đã hoàn tất,\n--    cột ảo \"tax\" đã được đặt tên và lưu trong tập kết quả trung gian -> ORDER BY nhận diện tốt 100%.",
          "solutionOutput": "Câu A: Syntax Error | Câu B: Thành công 100%",
          "explanation": "Chẩn đoán lỗi: Nếu bạn nghĩ SQL chạy từ trên xuống dưới theo thứ tự dòng code, bạn sẽ không thể hiểu được tại sao ORDER BY lại thấy được alias mà WHERE lại không."
        },
        {
          "title": "Bài tập 1.4-2 (Tìm & Sửa lỗi): Tối ưu hóa truy vấn chuyển điều kiện từ HAVING sang WHERE",
          "level": "Trung bình",
          "problem": "Một truy vấn báo cáo đang chạy rất chậm:\n```sql\nSELECT city, COUNT(*) AS total_orders, SUM(total_amount) AS total_revenue\nFROM customers c\nJOIN orders o ON c.customer_id = o.customer_id\nGROUP BY city, o.status\nHAVING o.status = \"COMPLETED\" AND COUNT(*) >= 2;```\nHãy chỉ ra lỗi phản hiệu năng trong mệnh đề HAVING và viết lại câu lệnh tối ưu.",
          "hint": "Điều kiện o.status = \"COMPLETED\" là lọc dòng thô hay lọc hàm tổng hợp?",
          "solutionCode": "-- Viết lại tối ưu: Đẩy điều kiện status xuống WHERE (Bước 2)\nSELECT city, COUNT(*) AS total_orders, SUM(total_amount) AS total_revenue\nFROM customers c\nJOIN orders o ON c.customer_id = o.customer_id\nWHERE o.status = 'COMPLETED'\nGROUP BY city\nHAVING COUNT(*) >= 2;",
          "solutionOutput": "Query executed 10x faster (Giảm 80% số dòng nạp vào bộ nhớ gom nhóm).",
          "explanation": "Chẩn đoán lỗi: Điều kiện `o.status = \"COMPLETED\"` không hề chứa hàm tổng hợp (SUM, COUNT). Đẩy nó xuống WHERE giúp loại bỏ các đơn hàng CANCELLED/PENDING trước khi đưa vào GROUP BY."
        },
        {
          "title": "Bài tập 1.4-3 (Tự viết truy vấn): Tái sử dụng biểu thức tính toán bằng CTE",
          "level": "Nâng cao",
          "problem": "Từ bảng `products`, bạn cần tính tỷ suất lợi nhuận phần trăm: `(price - cost) * 100.0 / price` (gán tên là `margin_pct`). Viết câu lệnh lấy các sản phẩm có `margin_pct >= 30.0%`, sắp xếp theo `margin_pct` giảm dần, bằng cách sử dụng CTE để tuân thủ 100% chuẩn ANSI SQL.",
          "hint": "WITH product_margins AS (...) SELECT ... FROM product_margins WHERE ...",
          "solutionCode": "WITH product_margins AS (\n    SELECT \n        product_id, \n        product_name, \n        price, \n        cost,\n        ROUND((price - cost) * 100.0 / price, 2) AS margin_pct\n    FROM products\n)\nSELECT product_id, product_name, price, cost, margin_pct\nFROM product_margins\nWHERE margin_pct >= 30.0\nORDER BY margin_pct DESC;",
          "solutionOutput": "+------------+----------------------------------+------------+------------+------------+\n| product_id | product_name                     | price      | cost       | margin_pct |\n+------------+----------------------------------+------------+------------+------------+\n| 105        | Gia do Laptop nhom Hop kim       | 450000.00  | 250000.00  | 44.44      |\n| 101        | Ban phim co Keychron K2          | 1800000.00 | 1200000.00 | 33.33      |\n| 102        | Chuot Logitech MX Master 3S      | 2200000.00 | 1500000.00 | 31.82      |\n+------------+----------------------------------+------------+------------+------------+\n(3 rows - Đã kiểm chứng trên PostgreSQL 16 & DuckDB 2.0.0)",
          "explanation": "Cách viết dùng CTE giúp biểu thức margin_pct chỉ cần định nghĩa một lần duy nhất, mã nguồn cực kỳ chuyên nghiệp và tối ưu."
        },
        {
          "title": "Bài tập 1.4-4 (Đánh đổi & Kiến trúc): DISTINCT vs GROUP BY khi khử trùng lặp",
          "level": "Nâng cao",
          "problem": "Để lấy danh sách các thành phố duy nhất có khách hàng, bạn có thể viết: `SELECT DISTINCT city FROM customers` hoặc `SELECT city FROM customers GROUP BY city`. Bộ tối ưu hóa truy vấn xử lý 2 câu lệnh này khác nhau như thế nào về kế hoạch thực thi vật lý?",
          "hint": "Xem xét thuật ngữ Hash Aggregate vs Sort Unique.",
          "solutionCode": "-- Phân tích kế hoạch vật lý:\n-- Trên hầu hết RDBMS hiện đại (PostgreSQL, DuckDB), Optimizer nhận diện cả 2 câu\n-- đều tương đương nhau về ngữ nghĩa và sinh ra cùng một kế hoạch thực thi (HashAggregate).\n-- Tuy nhiên, DISTINCT thể hiện đúng bản chất ý định khử trùng lặp hơn,\n-- còn GROUP BY nên dành riêng cho các tác vụ có kèm hàm tổng hợp (COUNT, SUM).",
          "solutionOutput": "Kế hoạch thực thi vật lý tương đương nhau trên các RDBMS hiện đại.",
          "explanation": "Viết đúng ngữ nghĩa giúp người đọc code hiểu ngay mục đích mà không làm thay đổi hiệu năng."
        }
      ],
      "quiz": [
        {
          "question": "Theo vòng đời thực thi logic của một truy vấn SQL chuẩn, mệnh đề nào được thực thi ngay trước mệnh đề SELECT?",
          "options": [
            "WHERE",
            "GROUP BY",
            "HAVING",
            "ORDER BY"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Thứ tự logic là: FROM &rarr; WHERE &rarr; GROUP BY &rarr; HAVING &rarr; SELECT &rarr; DISTINCT &rarr; ORDER BY &rarr; LIMIT."
        },
        {
          "question": "Tại sao chuẩn ANSI SQL nghiêm cấm sử dụng bí danh (Alias) được định nghĩa ở SELECT trong mệnh đề WHERE của cùng câu truy vấn?",
          "options": [
            "Vì bí danh chỉ được dùng cho mục đích đổi tên tiêu đề cột khi xuất file Excel.",
            "Vì theo vòng đời thực thi logic, mệnh đề WHERE chạy ở Bước 2 để lọc dòng thô, trong khi mệnh đề SELECT và các bí danh của nó mãi đến Bước 5 mới được đánh giá và đặt tên.",
            "Vì mệnh đề WHERE chỉ chấp nhận số nguyên.",
            "Vì CSDL tự động mã hóa bí danh thành chuỗi nhị phân."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Khi engine đang đứng ở Bước 2 (WHERE), bí danh ở Bước 5 (SELECT) hoàn toàn chưa tồn tại trong bộ nhớ, do đó CSDL sẽ báo lỗi column does not exist."
        },
        {
          "question": "Tại sao một điều kiện lọc dòng thô đơn lẻ như: status = 'COMPLETED' luôn phải được đặt ở mệnh đề WHERE thay vì đặt ở mệnh đề HAVING?",
          "options": [
            "Vì mệnh đề HAVING không hỗ trợ kiểu dữ liệu chuỗi VARCHAR.",
            "Vì đặt ở WHERE giúp loại bỏ các dòng không hợp lệ ngay từ Bước 2, giảm thiểu tối đa số dòng phải nạp vào RAM để gom nhóm (Hash Aggregate) ở Bước 3, tăng tốc độ truy vấn gấp nhiều lần.",
            "Vì mệnh đề HAVING sẽ tự động xóa các dòng có status khác COMPLETED khỏi ổ đĩa.",
            "Vì chuẩn SQL cấm dùng toán tử so sánh = trong HAVING."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Lọc càng sớm càng tốt (Early Filtering) là nguyên tắc vàng. Đẩy điều kiện dòng thô vào HAVING buộc CSDL phải gom nhóm toàn bộ dữ liệu rác rồi mới lọc bỏ, gây lãng phí bộ nhớ và CPU."
        },
        {
          "question": "Tại sao mệnh đề ORDER BY lại nhận diện và sử dụng được toàn bộ các bí danh (Alias) được định nghĩa ở mệnh đề SELECT?",
          "options": [
            "Vì ORDER BY là từ khóa đặc biệt chạy đầu tiên trong câu lệnh.",
            "Vì theo vòng đời thực thi logic, mệnh đề ORDER BY chạy ở Bước 7, nằm SAU mệnh đề SELECT (Bước 5), lúc này các cột tính toán và bí danh đã được tạo ra đầy đủ trong tập kết quả trung gian.",
            "Vì ORDER BY không cần quan tâm đến kiểu dữ liệu của cột.",
            "Vì ORDER BY được thực thi trực tiếp trên trình duyệt của người dùng."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Do ORDER BY thực thi sau SELECT, nó có toàn quyền truy cập vào các bí danh đã được đặt tên ở bước SELECT."
        },
        {
          "question": "Sự khác biệt cốt tử giữa Thứ tự Thực thi Logic (Logical Order) và Kế hoạch Thực thi Vật lý (Physical Execution Plan) là gì?",
          "options": [
            "Thứ tự logic chỉ áp dụng cho máy chủ Linux, còn kế hoạch vật lý áp dụng cho Windows.",
            "Thứ tự logic định nghĩa ngữ nghĩa toán học của câu truy vấn; trong khi Bộ tối ưu hóa (Query Optimizer) có toàn quyền thay đổi thứ tự thực thi vật lý (như Predicate Pushdown) miễn là kết quả đầu ra không thay đổi.",
            "Thứ tự logic luôn chạy chậm hơn kế hoạch vật lý 10 lần.",
            "Kế hoạch vật lý được viết bằng tay bởi quản trị viên CSDL, còn thứ tự logic do AI tạo ra."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Người viết SQL chỉ định ngữ nghĩa logic theo chuẩn ISO. Optimizer là bộ não trung tâm tự động tìm kiếm đường đi vật lý tối ưu nhất dựa trên thống kê chi phí."
        }
      ],
      "summary": [
        "Vòng đời 8 bước: FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT.",
        "WHERE thực thi trước SELECT nên không thể dùng bí danh (Alias) của SELECT.",
        "ORDER BY thực thi sau SELECT nên nhận diện và sử dụng được toàn bộ các bí danh.",
        "Luôn lọc tối đa bằng WHERE để loại bỏ dòng thô trước khi đưa vào gom nhóm GROUP BY và lọc HAVING.",
        "Ôn cách quãng: Tại sao không nên dùng toán tử BETWEEN để lọc dữ liệu cột kiểu TIMESTAMP? (Xem lại Bài 1.3)."
      ]
    },
    {
      "id": "sql-07-dq-data-profiling",
      "number": "1.5",
      "title": "[DQ] Data Profiling — Dùng Chính SQL \"Khám Bệnh\" Dữ Liệu Bẩn",
      "subtitle": "Khám bệnh dữ liệu 6 chiều theo chuẩn ISO/IEC 25012 và bóc trần 6 dị thường trên bảng raw_dirty_orders của TechMart",
      "level": "Cơ bản",
      "duration": "50 phút",
      "keywords": [
        "Data Quality",
        "Data Profiling",
        "ISO/IEC 25012",
        "Khám bệnh dữ liệu",
        "Tỷ lệ NULL",
        "Cardinality",
        "Outlier",
        "Audit"
      ],
      "prerequisites": "Nắm vững vòng đời thực thi (Bài 1.4), các hàm COUNT(*)/COUNT(col) và logic NULL (Bài 0.3).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Thấm nhuần tôn chỉ vàng của Kỹ sư Dữ liệu & AI: \"Nhìn dữ liệu trước khi tin dữ liệu (Profile before you trust)\".",
        "Vận dụng thành thạo 6 chiều chất lượng dữ liệu theo chuẩn quốc tế ISO/IEC 25012: Đầy đủ (Completeness), Duy nhất (Uniqueness), Hợp lệ (Validity), Nhất quán (Consistency), Đúng hạn (Timeliness) và Chính xác (Accuracy).",
        "Phân biệt rõ ràng chiều chất lượng nào SQL có thể tự kiểm tra nội tại và chiều nào bắt buộc phải có nguồn đối chiếu bên ngoài (Ground Truth).",
        "Xây dựng Bản báo cáo khám bệnh dữ liệu (Data Healthcheck Matrix) bằng các truy vấn SQL tổng hợp tái sử dụng được.",
        "Bóc trần trọn vẹn toàn bộ 6 dị thường đã được cài cắm trong bảng dữ liệu bẩn `raw_dirty_orders` của bộ mẫu TechMart."
      ],
      "intuition": {
        "title": "Bác sĩ xét nghiệm máu trước khi kê đơn thuốc",
        "metaphor": "Một bác sĩ giỏi không bao giờ vừa nhìn thấy bệnh nhân bước vào phòng khám là kê ngay thuốc kháng sinh liều cao. Bác sĩ sẽ yêu cầu làm xét nghiệm máu: kiểm tra lượng hồng cầu, bạch cầu, chỉ số men gan, đường huyết. Toàn bộ bảng xét nghiệm đó cho thấy bức tranh sức khỏe thực sự của cơ thể. Trong ngành kỹ nghệ dữ liệu, Data Profiling chính là bước xét nghiệm máu đó: trước khi bạn nạp dữ liệu vào báo cáo KPI hay đưa vào mô hình học máy (Machine Learning), bạn bắt buộc phải dùng SQL để \"khám bệnh\" xem dữ liệu có bị nhiễm trùng (trùng lặp, mồ côi, âm tiền, tương lai) hay không.",
        "boundary": "Ẩn dụ này nhấn mạnh tính chẩn đoán; tuy nhiên lưu ý rằng Data Profiling chỉ giúp bạn \"phát hiện bệnh\", còn việc \"chữa bệnh\" (làm sạch dữ liệu, cách ly dòng lỗi) sẽ được thực hiện ở các tầng tiếp theo bằng Anti-join và Clean Pipeline.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;font-weight:700;\">1. COMPLETENESS (ĐẦY ĐỦ)</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">NULL Rate %</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">100.0 * (COUNT(*) - COUNT(col)) / COUNT(*)</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"font-size:1.1rem;color:var(--text-muted);\">+</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;font-weight:700;\">2. UNIQUENESS (DUY NHẤT)</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">Duplicate Key Count</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">COUNT(*) - COUNT(DISTINCT col)</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"font-size:1.1rem;color:var(--text-muted);\">+</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:180px;\">\n                <div style=\"font-size:0.75rem;color:var(--topic-sql);margin-bottom:4px;font-weight:700;\">3. VALIDITY &amp; ACCURACY</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">Range &amp; Anti-Join</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Bắt tiền âm, ngày tương lai, khóa mồ côi</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ Nguyên tắc Kỹ sư Dữ liệu:</span>\n              <span><strong>Profile before you trust</strong>: Luôn chạy kịch bản khám bệnh dữ liệu tự động để chặn đứng dữ liệu bẩn trước khi đưa vào kho hoặc nạp vào mô hình AI.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-07-problem-hook",
          "title": "Gợi mở vấn đề: Nếu không khám bệnh dữ liệu (Data Profiling), chuyện gì xảy ra?",
          "content": "\n            <p>Vào đầu quý 3, TechMart triển khai mô hình Trí tuệ Nhân tạo dự báo khách hàng rời bỏ (Churn ML) với ngân sách hàng trăm ngàn USD. Nhóm Data Scientist lấy trực tiếp dữ liệu đơn hàng từ bảng staging của hệ thống CRM để huấn luyện mô hình.</p>\n            <p>Sau 2 tuần chạy thật, mô hình đưa ra những dự báo hoàn toàn kỳ quặc: dự báo một khách hàng VIP đã rời bỏ công ty... vào ngày <strong>31/12/2099</strong>, và tính ra giá trị vòng đời (LTV) của nhiều khách hàng là <strong>âm hàng trăm triệu đồng</strong>!</p>\n            <p>Toàn bộ dự án AI bị đình chỉ khẩn cấp. Nguyên nhân không nằm ở thuật toán Machine Learning mà nằm ở <strong>Dữ liệu rác (Garbage In, Garbage Out)</strong>: Bảng dữ liệu thô chứa ngày tương lai, số tiền âm, mã đơn trùng lặp và khóa ngoại mồ côi mà không một ai trong nhóm kỹ sư thực hiện bước \"khám bệnh\" dữ liệu trước khi nạp vào pipeline!</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-07-recall-prereq",
          "title": "Gọi lại kiến thức cũ: Kiểm tra nhanh COUNT(*) vs COUNT(cột)",
          "content": "\n            <p>Trước khi viết script khám bệnh dữ liệu, hãy truy hồi 2 kiến thức cốt tử:</p>\n            \n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n              <p><strong>Câu hỏi 1:</strong> Giả sử một cột có 10 dòng, trong đó có 2 dòng mang giá trị NULL. Hàm <code>COUNT(*)</code> trả về bao nhiêu và hàm <code>COUNT(tên_cột)</code> trả về bao nhiêu?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> <code>COUNT(*)</code> trả về <strong>10</strong> (đếm toàn bộ số dòng vật lý); trong khi <code>COUNT(tên_cột)</code> chỉ trả về <strong>8</strong> (bỏ qua các giá trị NULL).</p>\n                </div>\n              </details>\n            </div>\n\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n              <p><strong>Câu hỏi 2:</strong> Theo vòng đời 8 bước thực thi logic, mệnh đề nào chạy đầu tiên trong một câu truy vấn SQL chuẩn?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Mệnh đề <code>FROM / JOIN</code> thực thi ở Bước 1 để xác định bảng nguồn và nạp các trang dữ liệu từ đĩa cứng.</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-07-concept-definition",
          "title": "Khái niệm cốt lõi: Sáu Chiều Chất Lượng Dữ Liệu ISO/IEC 25012",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Chiều chất lượng</th>\n                    <th scope=\"col\">Ý nghĩa kỹ thuật</th>\n                    <th scope=\"col\">Kỹ thuật kiểm tra bằng SQL</th>\n                    <th scope=\"col\">SQL có tự kiểm tra được không?</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>1. Đầy đủ (Completeness)</strong></td>\n                    <td>Dữ liệu có bị khuyết thiếu hay mang giá trị NULL không?</td>\n                    <td><code>100.0 * (COUNT(*) - COUNT(col)) / COUNT(*)</code> (Đo tỷ lệ NULL rate).</td>\n                    <td><strong>CÓ 100%:</strong> SQL đo lường chính xác từng ô trống.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>2. Duy nhất (Uniqueness)</strong></td>\n                    <td>Bản ghi hoặc khóa có bị lặp lại không?</td>\n                    <td><code>COUNT(*) - COUNT(DISTINCT col)</code> hoặc <code>GROUP BY col HAVING COUNT(*) &gt; 1</code>.</td>\n                    <td><strong>CÓ 100%:</strong> Bắt trọn vẹn các dòng trùng lặp.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>3. Hợp lệ (Validity)</strong></td>\n                    <td>Giá trị có nằm trong miền cho phép, đúng định dạng và kiểu dữ liệu?</td>\n                    <td><code>MIN(col)</code>, <code>MAX(col)</code>, bắt số tiền âm, ngày tương lai, kiểm tra regex định dạng email.</td>\n                    <td><strong>CÓ 100%:</strong> So sánh trực tiếp với luật nghiệp vụ.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>4. Nhất quán (Consistency)</strong></td>\n                    <td>Dữ liệu giữa các bảng có khớp nhau không? Có khóa mồ côi không?</td>\n                    <td>Anti-join (<code>LEFT JOIN ... IS NULL</code>) để tìm đơn hàng trỏ tới khách hàng không tồn tại.</td>\n                    <td><strong>CÓ 100%:</strong> Đối soát chéo giữa các bảng nội bộ.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>5. Đúng hạn (Timeliness)</strong></td>\n                    <td>Dữ liệu có tươi mới không? Pipeline có bị trễ nhịp không?</td>\n                    <td><code>CURRENT_TIMESTAMP - MAX(created_at)</code> đo lường độ trễ (Data Freshness / Latency).</td>\n                    <td><strong>CÓ 100%:</strong> So sánh với đồng hồ hệ thống.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>6. Chính xác (Accuracy)</strong></td>\n                    <td>Dữ liệu số liệu có phản ánh đúng thực tế khách quan ngoài đời thực không?</td>\n                    <td>Ví dụ: Cột địa chỉ ghi \"Hà Nội\" nhưng khách hàng thực tế đang sống tại \"Đà Nẵng\".</td>\n                    <td>\n                      <span class=\"dirty-val\">KHÔNG THỂ TỰ KIỂM:</span> SQL chỉ biết dữ liệu hợp lệ về mặt cú pháp; để kiểm tra độ chính xác bắt buộc phải có <strong>nguồn đối chiếu độc lập bên ngoài (Ground Truth)</strong>.\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-07-internal-mechanism",
          "title": "Cơ chế bên trong: Công Thức Toán Học Đo Lường Sức Khỏe Dữ Liệu",
          "content": "\n            <p>Để tự động hóa quá trình khám bệnh dữ liệu, kỹ sư dữ liệu áp dụng các công thức đo lường chuẩn hóa:</p>\n            <ul>\n              <li><strong>Tỷ lệ khuyết thiếu (Missing / NULL Rate):</strong>\n                $$\text{Null Rate} = \frac{\text{COUNT}(*) - \text{COUNT}(\text{column})}{\text{COUNT}(*)} \times 100%$$\n              </li>\n              <li><strong>Tỷ lệ trùng lặp khóa (Duplicate Key Rate):</strong>\n                $$\text{Duplicate Rate} = \frac{\text{COUNT}(*) - \text{COUNT}(\text{DISTINCT } \text{column})}{\text{COUNT}(*)} \times 100%$$\n              </li>\n              <li><strong>Độ đa dạng dữ liệu (Cardinality Ratio):</strong>\n                $$\text{Cardinality Ratio} = \frac{\text{COUNT}(\text{DISTINCT } \text{column})}{\text{COUNT}(*)}$$\n                (Tỷ lệ gần bằng 1 cho biết cột có tính phân biệt rất cao, phù hợp làm Khóa chính hoặc phân đoạn).\n              </li>\n            </ul>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-07-worked-example",
          "title": "Ví dụ mẫu có lời giải: Khám Bệnh Bảng raw_dirty_orders Của TechMart",
          "content": "\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:16px;border-radius:8px;background:var(--bg-surface-elevated);margin:16px 0;\">\n              <h4 style=\"margin:0 0 8px;color:var(--text-primary);\">❓ Dự đoán trước khi xem:</h4>\n              <p>Bảng <code>raw_dirty_orders</code> của TechMart có 6 dòng, trong đó có 1 dòng (raw_id = 4) có giá trị cột <code>status</code> là NULL. Theo bạn, hai câu lệnh sau sẽ trả về con số bao nhiêu:</p>\n              <pre class=\"code-pre\"><code>-- Câu A: SELECT COUNT(*) FROM raw_dirty_orders;\n-- Câu B: SELECT COUNT(status) FROM raw_dirty_orders;</code></pre>\n              <details class=\"predict-details\" style=\"margin-top:12px;padding:10px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem phân tích cơ chế &amp; Đáp án</summary>\n                <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                  <p><strong>Đáp án: Câu A trả về 6, nhưng Câu B chỉ trả về 5!</strong></p>\n                  <p><strong>Cơ chế bản chất:</strong> Hàm <code>COUNT(*)</code> đếm toàn bộ số dòng vật lý trong bảng. Trong khi <code>COUNT(status)</code> chỉ đếm các dòng có status khác NULL. Chênh lệch <code>COUNT(*) - COUNT(status) = 1</code> chính là số dòng bị khuyết thiếu!</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Mẫu Báo cáo Khám bệnh Dữ liệu 1 câu lệnh (Reusable Data Healthcheck Query)",
              "code": "SELECT \n    COUNT(*) AS total_rows,\n    COUNT(order_id) AS non_null_orders,\n    COUNT(DISTINCT order_id) AS unique_orders,\n    -- 1. Đo lường khuyết thiếu (Completeness)\n    SUM(CASE WHEN status IS NULL THEN 1 ELSE 0 END) AS null_status_count,\n    ROUND(100.0 * SUM(CASE WHEN status IS NULL THEN 1 ELSE 0 END) / COUNT(*), 2) AS null_status_pct,\n    -- 2. Đo lường hợp lệ miền giá trị (Validity)\n    MIN(total_amount) AS min_amount,\n    MAX(total_amount) AS max_amount,\n    SUM(CASE WHEN total_amount < 0 THEN 1 ELSE 0 END) AS negative_amount_count,\n    -- 3. Đo lường miền thời gian (Validity & Freshness)\n    MIN(order_date) AS min_date,\n    MAX(order_date) AS max_date,\n    SUM(CASE WHEN order_date > '2026-11-03' THEN 1 ELSE 0 END) AS future_date_count,\n    -- 4. Đo lường chuẩn hóa chuỗi (Validity)\n    SUM(CASE WHEN LENGTH(customer_name) != LENGTH(TRIM(customer_name)) THEN 1 ELSE 0 END) AS whitespace_anomaly_count\nFROM raw_dirty_orders;",
              "annotations": [
                {
                  "line": 2,
                  "text": "Đo lường dung lượng bản ghi vật lý"
                },
                {
                  "line": 6,
                  "text": "Đo lường tỷ lệ khuyết thiếu của cột trạng thái"
                },
                {
                  "line": 10,
                  "text": "Bắt dị thường vi phạm miền tiền tệ âm"
                },
                {
                  "line": 14,
                  "text": "Bắt dị thường ngày tương lai gây rò rỉ dữ liệu [FE]"
                }
              ],
              "explanation": "Chỉ bằng một câu truy vấn tổng hợp duy nhất, toàn bộ bức tranh sức khỏe dữ liệu của bảng staging được phơi bày rõ ràng.",
              "output": "+------------+-----------------+---------------+-------------------+-----------------+------------+------------+-----------------------+------------+------------+-------------------+--------------------------+\n| total_rows | non_null_orders | unique_orders | null_status_count | null_status_pct | min_amount | max_amount | negative_amount_count | min_date   | max_date   | future_date_count | whitespace_anomaly_count |\n+------------+-----------------+---------------+-------------------+-----------------+------------+------------+-----------------------+------------+------------+-------------------+--------------------------+\n| 6          | 6               | 5             | 1                 | 16.67           | -500000.00 | 3200000.00 | 1                     | 2023-09-01 | 2099-12-31 | 1                 | 1                        |\n+------------+-----------------+---------------+-------------------+-----------------+------------+------------+-----------------------+------------+------------+-------------------+--------------------------+\n(Đã kiểm chứng trên PostgreSQL 16 & DuckDB 2.0.0)"
            }
          ]
        },
        {
          "id": "sec-07-faded-example",
          "title": "Bài điền khuyết (Faded Example): Bắt Khóa Ngoại Mồ Côi Bằng Anti-join",
          "content": "\n            <p>Để tìm ra các đơn hàng trong <code>raw_dirty_orders</code> trỏ tới khách hàng không hề tồn tại trong bảng <code>customers</code> (vi phạm tính Nhất quán - Consistency), hãy điền các từ khóa vào vị trí <code>[___1___]</code> đến <code>[___3___]</code>:</p>\n\n            <div class=\"code-example-card\">\n              <div class=\"code-card-header\"><span class=\"lang-tag\">SQL (BÀI ĐIỀN KHUYẾT)</span></div>\n              <pre class=\"code-pre\"><code>SELECT \n    r.raw_id, \n    r.order_id, \n    r.customer_id, \n    r.customer_name\nFROM raw_dirty_orders r\n[___1___] JOIN customers c ON r.customer_id = c.customer_id\nWHERE [___2___] [___3___];</code></pre>\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top:12px;padding:12px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n              <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án điền khuyết &amp; Giải thích</summary>\n              <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                <p><strong>Đáp án đúng:</strong></p>\n                <ul>\n                  <li><code>[___1___] = LEFT</code> (Giữ lại toàn bộ các dòng của bảng bên trái raw_dirty_orders).</li>\n                  <li><code>[___2___] = c.customer_id</code> (Cột khóa chính của bảng bên phải).</li>\n                  <li><code>[___3___] = IS NULL</code> (Điều kiện chỉ giữ lại các dòng không tìm thấy bản ghi tương ứng bên bảng customers).</li>\n                </ul>\n              </div>\n            </details>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-07-pitfalls-misconceptions",
          "title": "Bẫy và Quan Niệm Sai Phổ Biến Trong Khám Bệnh Dữ Liệu",
          "content": "\n            <div class=\"callout-box callout-pitfall\" style=\"margin-bottom:14px;\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 1: Tưởng rằng dữ liệu từ hệ thống CRM / ERP thì chắc chắn sạch</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Hiện tượng:</strong> Bỏ qua bước Data Profiling vì tin tưởng rằng phần mềm bán hàng nổi tiếng đã có kiểm tra dữ liệu đầu vào.</p>\n                <p><strong>Thực tế phũ phàng:</strong> Dữ liệu từ CRM luôn luôn bị suy thoái do lỗi mạng, lỗi người dùng nhập tắt, lỗi đồng bộ API hoặc lỗi cập nhật phiên bản phần mềm. Không bao giờ tin dữ liệu nếu bạn chưa tự tay chạy profiling!</p>\n              </div>\n            </div>\n\n            <div class=\"callout-box callout-pitfall\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 2: Nhầm lẫn giữa tính Hợp lệ (Validity) và tính Chính xác (Accuracy)</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Hiện tượng:</strong> Khách hàng nhập email <code>test@gmail.com</code> hoặc ngày sinh <code>1900-01-01</code>. CSDL kiểm tra thấy đúng định dạng email và đúng kiểu DATE nên coi là hợp lệ.</p>\n                <p><strong>Bản chất:</strong> Dữ liệu hoàn toàn <strong>Hợp lệ (Valid)</strong> về mặt cú pháp nhưng <strong>Hoàn toàn sai sự thật (Inaccurate)</strong>! SQL không thể tự phát hiện lỗi này mà bắt buộc phải có nguồn đối chiếu bên ngoài (Ground Truth) như gửi mã xác thực OTP.</p>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-07-concept-comparison",
          "title": "So Sánh: Bóc Trần Toàn Bộ 6 Dị Thường Cố Ý Trong TechMart",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Mã dị thường</th>\n                    <th scope=\"col\">Loại bệnh [DQ]</th>\n                    <th scope=\"col\">Dấu hiệu nhận biết</th>\n                    <th scope=\"col\">Dòng vi phạm cụ thể trên TechMart</th>\n                    <th scope=\"col\">Hậu quả nếu đưa vào AI / BI</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>#1</strong></td>\n                    <td>Trùng lặp bản ghi (Uniqueness)</td>\n                    <td><code>total_rows (6) &gt; unique_orders (5)</code></td>\n                    <td>Đơn hàng <code>order_id = 2001</code> xuất hiện 2 lần (raw_id: 1 và 2).</td>\n                    <td>Thổi phồng doanh thu gấp đôi trên báo cáo tài chính.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>#2</strong></td>\n                    <td>Bản ghi mồ côi (Consistency)</td>\n                    <td>Khóa ngoại không khớp bảng cha.</td>\n                    <td>Đơn hàng <code>order_id = 2002</code> có <code>customer_id = 999</code> (không có trong bảng customers).</td>\n                    <td>Làm gãy câu lệnh INNER JOIN (mất đơn) hoặc báo cáo khách vô danh.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>#3</strong></td>\n                    <td>Khuyết thiếu trạng thái (Completeness)</td>\n                    <td><code>null_status_count = 1</code></td>\n                    <td>Đơn hàng <code>raw_id = 4</code> (order_id 2003) có <code>status = NULL</code>.</td>\n                    <td>Bị mệnh đề WHERE bỏ sót do bẫy 3VL.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>#4</strong></td>\n                    <td>Vi phạm miền tiền tệ (Validity)</td>\n                    <td><code>min_amount = -500,000</code></td>\n                    <td>Đơn hàng <code>raw_id = 5</code> (order_id 2004) có tiền âm.</td>\n                    <td>Làm sai lệch thuật toán tính giá trị vòng đời khách hàng (LTV).</td>\n                  </tr>\n                  <tr>\n                    <td><strong>#5</strong></td>\n                    <td>Vi phạm miền thời gian (Validity)</td>\n                    <td><code>max_date = '2099-12-31'</code></td>\n                    <td>Đơn hàng <code>raw_id = 6</code> (order_id 2005) sai năm tương lai.</td>\n                    <td>Gây rò rỉ dữ liệu nghiêm trọng cho mô hình dự báo chuỗi thời gian [FE].</td>\n                  </tr>\n                  <tr>\n                    <td><strong>#6</strong></td>\n                    <td>Chuỗi thừa khoảng trắng (Validity)</td>\n                    <td><code>raw_length (19) != trimmed_length (13)</code></td>\n                    <td>Khách hàng <code>raw_id = 1</code> có tên <code>'  nguyen van an  '</code>.</td>\n                    <td>Gây lỗi phân nhóm (GROUP BY coi chuỗi có khoảng trắng là một người khác!).</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-07-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Đóng Gói Data Profiling Vào CI/CD Pipeline (dbt Tests)",
          "content": "\n            <p>Trong kiến trúc Modern Data Stack hiện đại, các kỹ sư dữ liệu không chạy các câu lệnh profiling bằng tay mỗi sáng. Thay vào đó, toàn bộ các quy tắc kiểm tra 6 chiều trên được đóng gói thành các file cấu hình tự động (như <strong>dbt tests</strong> hoặc <strong>Great Expectations</strong>):</p>\n            <pre class=\"code-pre\"><code># Ví dụ cấu hình dbt test tự động kiểm tra trên bảng orders:\nmodels:\n  - name: stg_orders\n    columns:\n      - name: order_id\n        tests:\n          - unique\n          - not_null\n      - name: status\n        tests:\n          - accepted_values:\n              values: ['COMPLETED', 'PENDING', 'CANCELLED']\n      - name: total_amount\n        tests:\n          - dbt_expectations.expect_column_values_to_be_between:\n              min_value: 0</code></pre>\n            <p>Mỗi khi có một mẻ dữ liệu mới được nạp vào kho, hệ thống CI/CD sẽ tự động chạy các test này. Nếu có bất kỳ dòng nào vi phạm (tiền âm, trùng lặp, mồ côi), đường ống dữ liệu sẽ <strong>lập tức dừng lại và gửi cảnh báo về kênh Slack của đội kỹ sư</strong>, ngăn chặn dữ liệu rác tràn vào dashboard của ban giám đốc!</p>\n          ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi tư duy: \"Dữ liệu xuất từ hệ thống CRM/ERP thì chắc chắn sạch\"",
            "content": "Không bao giờ tin tưởng dữ liệu thô nếu bạn chưa tự tay chạy script Data Profiling. Dữ liệu thực tế luôn luôn bị suy thoái do lỗi nhập liệu, lỗi frontend không validate hoặc lỗi mạng truyền gói tin."
          },
          {
            "title": "Bẫy đếm `COUNT(col)` vs `COUNT(*)` khi profiling",
            "content": "`COUNT(*)` đếm toàn bộ số dòng, còn `COUNT(col)` bỏ qua NULL. Nếu lấy `COUNT(status) / COUNT(*)` bạn đang đo tỷ lệ ĐẦY ĐỦ chứ không phải tỷ lệ KHUYẾT THIẾU. Hãy luôn nhớ trừ cho nhau để tìm số dòng NULL."
          }
        ],
        "tips": [
          {
            "title": "Đóng gói Data Profiling thành hàng rào CI/CD tự động",
            "content": "Trong kiến trúc Modern Data Stack, kịch bản profiling trên được cấu hình thành các dbt test (`not_null`, `unique`, `accepted_values`) chạy tự động mỗi khi có mẻ dữ liệu mới được nạp vào kho."
          }
        ],
        "deepDive": {
          "title": "Tự động hóa Data Profiling: Khai thác Information Schema & PostgreSQL System Catalogs",
          "content": "<p>Thay vì viết tay hàng trăm câu lệnh profiling cho từng bảng, các Data Engineer chuyên nghiệp truy vấn trực tiếp vào <strong>Information Schema</strong> và <strong>System Catalogs (pg_stats, pg_class, pg_attribute)</strong>.</p><p>Catalog <code>pg_stats</code> của PostgreSQL cung cấp sẵn các chỉ số thống kê siêu giá trị do tiến trình ANALYZE thu thập: tỷ lệ NULL (<code>null_frac</code>), số giá trị phân biệt ước tính (<code>n_distinct</code>), danh sách các giá trị xuất hiện nhiều nhất (<code>most_common_vals</code>) và hệ số tương quan vật lý trên đĩa (<code>correlation</code>). Tận dụng các catalog này cho phép bạn xây dựng dashboard giám sát chất lượng dữ liệu tự động cho toàn bộ Data Warehouse mà không tốn tài nguyên quét lại dữ liệu bảng!</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 1.5-1 (Dự đoán & Phân tích): Phân biệt tính Hợp lệ (Validity) và Chính xác (Accuracy)",
          "level": "Cơ bản",
          "problem": "Một khách hàng nhập số điện thoại là `0912345678` vào form đăng ký. Hệ thống kiểm tra thấy đúng 10 chữ số, bắt đầu bằng số 0, kiểu chuỗi hợp lệ (Validity đạt chuẩn). Tuy nhiên số điện thoại này thuộc về một người hoàn toàn khác chứ không phải của khách hàng đó. Hãy phân tích: Chiều chất lượng nào bị vi phạm và vì sao SQL không thể tự phát hiện lỗi này?",
          "hint": "Phân biệt giữa kiểm tra cú pháp quy tắc vs sự thật thế giới khách quan.",
          "solutionCode": "-- Phân tích bản chất:\n-- 1. Chiều bị vi phạm: Tính Chính xác (Accuracy).\n-- 2. Vì sao SQL không tự phát hiện được: CSDL chỉ lưu trữ dữ liệu logic và kiểm tra\n--    các quy tắc cú pháp (Regex, độ dài, miền số). CSDL không có kết nối viễn thông\n--    để biết ai đang thực sự cầm chiếc SIM điện thoại đó ngoài đời thực!\n-- 3. Giải pháp thực tế: Gửi mã xác thực OTP qua SMS để đối chiếu với thế giới thực.",
          "solutionOutput": "Độ chính xác (Accuracy) bắt buộc phải có nguồn đối chiếu bên ngoài (Ground Truth).",
          "explanation": "Chẩn đoán lỗi: Nếu bạn nghĩ SQL kiểm tra được 100% mọi lỗi dữ liệu, bạn đang nhầm lẫn giữa tính Hợp lệ (Validity - đúng form) với tính Chính xác (Accuracy - đúng sự thật)."
        },
        {
          "title": "Bài tập 1.5-2 (Tìm & Sửa lỗi): Bắt trọn vẹn các đơn hàng trùng lặp hoàn toàn",
          "level": "Trung bình",
          "problem": "Viết câu truy vấn tìm các đơn hàng bị trùng lặp mã `order_id` trong bảng `raw_dirty_orders`. Truy vấn phải trả về mã `order_id` và số lần lặp lại của nó, chỉ hiển thị những mã bị lặp từ 2 lần trở lên.",
          "hint": "Dùng GROUP BY order_id kết hợp HAVING COUNT(*) > 1.",
          "solutionCode": "SELECT order_id, COUNT(*) AS duplicate_count\nFROM raw_dirty_orders\nGROUP BY order_id\nHAVING COUNT(*) > 1;",
          "solutionOutput": "+----------+-----------------+\n| order_id | duplicate_count |\n+----------+-----------------+\n| 2001     | 2               |\n+----------+-----------------+\n(1 mã đơn hàng bị trùng lặp)",
          "explanation": "Chẩn đoán lỗi: Đơn hàng 2001 xuất hiện 2 lần ở raw_id: 1 và 2. Câu lệnh bắt đúng 100% bản ghi vi phạm chiều Uniqueness."
        },
        {
          "title": "Bài tập 1.5-3 (Tự viết truy vấn): Thiết kế bộ lọc dữ liệu sạch loại bỏ 6 dị thường",
          "level": "Nâng cao",
          "problem": "Viết câu truy vấn chuyển đổi dữ liệu từ bảng staging `raw_dirty_orders` sang bảng sạch `clean_orders` thỏa mãn đồng thời các điều kiện:\n1. Loại bỏ các dòng có tiền âm hoặc ngày tương lai (> 2026-11-03).\n2. Điền giá trị mặc định \"UNKNOWN\" cho các dòng có status bị NULL.\n3. Chuẩn hóa tên khách hàng: cắt khoảng trắng thừa ở 2 đầu và chuyển thành chữ in hoa.\n4. Khử trùng lặp theo `order_id` (chỉ lấy 1 dòng đại diện có `raw_id` nhỏ nhất).",
          "hint": "Kết hợp WHERE, COALESCE, TRIM, UPPER và ROW_NUMBER hoặc MIN(raw_id).",
          "solutionCode": "WITH filtered_orders AS (\n    SELECT \n        raw_id,\n        order_id,\n        customer_id,\n        UPPER(TRIM(customer_name)) AS customer_name,\n        order_date,\n        COALESCE(status, 'UNKNOWN') AS status,\n        total_amount,\n        ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY raw_id ASC) AS rn\n    FROM raw_dirty_orders\n    WHERE total_amount > 0 \n      AND order_date <= '2026-11-03'\n)\nSELECT \n    order_id, \n    customer_id, \n    customer_name, \n    order_date, \n    status, \n    total_amount\nFROM filtered_orders\nWHERE rn = 1;",
          "solutionOutput": "+----------+-------------+---------------+------------+-----------+--------------+\n| order_id | customer_id | customer_name | order_date | status    | total_amount |\n+----------+-------------+---------------+------------+-----------+--------------+\n| 2001     | 1           | NGUYEN VAN AN | 2023-09-01 | COMPLETED | 1800000.00   |\n| 2002     | 999         | KHACH LA VO   | 2023-09-02 | COMPLETED | 2500000.00   |\n| 2003     | 2           | TRAN THI BINH | 2023-09-03 | UNKNOWN   | 3200000.00   |\n+----------+-------------+---------------+------------+-----------+--------------+\n(3 đơn hàng đạt chuẩn được làm sạch hoàn hảo)",
          "explanation": "Một pipeline làm sạch mẫu mực: bắt gọn dị thường, xử lý NULL an toàn, khử trùng lặp và chuẩn hóa chuỗi dữ liệu."
        },
        {
          "title": "Bài tập 1.5-4 (Đánh đổi & Kiến trúc): Xử lý dòng lỗi: Loại bỏ (Drop) vs Cách ly (Quarantine)",
          "level": "Nâng cao",
          "problem": "Khi phát hiện một đơn hàng bị âm tiền hoặc mồ côi khóa ngoại trong pipeline, kỹ sư dữ liệu nên loại bỏ thẳng tay (`DELETE / WHERE total_amount > 0`) hay nên ghi vào một bảng cách ly (`quarantine_orders`)? Hãy phân tích đánh đổi.",
          "hint": "Nghĩ về khả năng đối soát kế toán và giải trình kiểm toán.",
          "solutionCode": "-- Phân tích đánh đổi kiến trúc:\n-- 1. Nếu Loại bỏ thẳng tay (Drop silently):\n--    - Dữ liệu sạch sẽ ngay lập tức.\n--    - Nhược điểm chí tử: Mất dấu dòng tiền, kế toán không thể đối soát vì sao\n--      doanh thu trên kho dữ liệu lệch so với cổng thanh toán ngân hàng!\n-- 2. Nếu Cách ly vào bảng Quarantine (Dead Letter Queue):\n--    - Bảng chính vẫn sạch 100%.\n--    - Bảng cách ly lưu lại toàn bộ dòng lỗi kèm lý do vi phạm (error_reason).\n--    - Đội vận hành có thể tra cứu, sửa lỗi và nạp bù (replay) mà không mất mát dữ liệu.",
          "solutionOutput": "Cách ly dòng lỗi là chuẩn mực kiến trúc cấp doanh nghiệp duy nhất.",
          "explanation": "Không bao giờ được vứt bỏ dữ liệu mà không để lại vết kiểm toán."
        }
      ],
      "quiz": [
        {
          "question": "Theo mô hình chất lượng dữ liệu ISO/IEC 25012, chiều chất lượng nào sau đây KHÔNG THỂ kiểm tra tự động chỉ bằng các truy vấn SQL nội bộ trong CSDL?",
          "options": [
            "Tính Đầy đủ (Completeness - đo lường tỷ lệ NULL)",
            "Tính Duy nhất (Uniqueness - kiểm tra trùng lặp khóa)",
            "Tính Hợp lệ (Validity - kiểm tra miền giá trị min/max)",
            "Tính Chính xác (Accuracy - kiểm tra xem số liệu có phản ánh đúng thực tế khách quan ngoài đời thực)"
          ],
          "correctIndex": 3,
          "explanation": "Chính xác! SQL chỉ kiểm tra được tính hợp lệ về mặt quy tắc và cấu trúc logic. Để biết dữ liệu có chính xác với thực tế khách quan hay không bắt buộc phải có nguồn đối chiếu độc lập bên ngoài (Ground Truth)."
        },
        {
          "question": "Để tính tỷ lệ khuyết thiếu (NULL rate) của cột status trong bảng orders có 10.000 dòng, công thức SQL nào sau đây là chính xác nhất?",
          "options": [
            "100.0 * COUNT(status) / COUNT(*)",
            "100.0 * (COUNT(*) - COUNT(status)) / COUNT(*)",
            "COUNT(*) / COUNT(status)",
            "AVG(status)"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! COUNT(*) đếm toàn bộ số dòng, còn COUNT(status) chỉ đếm các dòng phi-NULL. Chênh lệch (COUNT(*) - COUNT(status)) chính là số dòng NULL, chia cho tổng số dòng ra tỷ lệ khuyết thiếu."
        },
        {
          "question": "Câu truy vấn nào sau đây giúp phát hiện các mã order_id bị trùng lặp từ 2 lần trở lên trong bảng dữ liệu staging raw_dirty_orders?",
          "options": [
            "SELECT DISTINCT order_id FROM raw_dirty_orders;",
            "SELECT order_id, COUNT(*) FROM raw_dirty_orders GROUP BY order_id HAVING COUNT(*) > 1;",
            "SELECT order_id FROM raw_dirty_orders WHERE order_id = order_id;",
            "SELECT order_id FROM raw_dirty_orders ORDER BY order_id DESC;"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Cấu trúc GROUP BY col HAVING COUNT(*) > 1 là mẫu truy vấn kinh điển trong Data Engineering để bóc trần các bản ghi vi phạm tính Duy nhất (Uniqueness)."
        },
        {
          "question": "Để phát hiện các đơn hàng mồ côi (Orphan records) trong bảng orders có customer_id không hề tồn tại trong bảng customers, kỹ thuật SQL chuẩn mực nào được sử dụng?",
          "options": [
            "INNER JOIN orders và customers theo customer_id.",
            "CROSS JOIN orders và customers.",
            "LEFT JOIN customers c ON o.customer_id = c.customer_id WHERE c.customer_id IS NULL; (Anti-join)",
            "SELECT * FROM orders WHERE customer_id > 0;"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Phép ghép ngoài kết hợp lọc IS NULL (Anti-join) là vũ khí sắc bén nhất để phát hiện dữ liệu vi phạm tính Toàn vẹn tham chiếu / Nhất quán (Consistency)."
        },
        {
          "question": "Sự khác biệt căn bản về vai trò giữa giai đoạn Data Profiling (Khám bệnh dữ liệu) và Data Cleaning (Làm sạch dữ liệu) là gì?",
          "options": [
            "Data Profiling chỉ chạy trên Excel, còn Data Cleaning chạy trên SQL.",
            "Data Profiling là bước quan sát, đo lường và lập báo cáo sức khỏe khách quan mà KHÔNG làm biến đổi dữ liệu; còn Data Cleaning là bước can thiệp sửa chữa, điền khuyết, chuẩn hóa hoặc cách ly các dòng lỗi.",
            "Data Cleaning được thực hiện trước khi nhận dữ liệu từ đối tác.",
            "Hai khái niệm này hoàn toàn đồng nhất và thay thế cho nhau."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Tôn chỉ vàng là Khám bệnh trước khi kê đơn. Bạn phải đo lường bức tranh chất lượng tổng thể (Profiling) trước khi quyết định chiến lược làm sạch phù hợp (Cleaning)."
        }
      ],
      "summary": [
        "Tôn chỉ vàng của Kỹ sư Dữ liệu & AI: \"Nhìn dữ liệu trước khi tin dữ liệu (Profile before you trust)\".",
        "Nắm vững 6 chiều chất lượng dữ liệu chuẩn ISO/IEC 25012: Completeness, Uniqueness, Validity, Consistency, Timeliness và Accuracy.",
        "Sử dụng các hàm COUNT, COUNT DISTINCT, MIN, MAX, LENGTH, TRIM và CASE WHEN để lập Báo cáo khám bệnh dữ liệu định kỳ.",
        "Vạch trần trọn vẹn 6 dị thường trên bảng raw_dirty_orders của TechMart và xây dựng pipeline làm sạch dữ liệu an toàn.",
        "Ôn cách quãng: Mệnh đề nào trong SQL thực thi ở Bước 2 ngay sau FROM/JOIN? (Xem lại Bài 1.4)."
      ]
    }
  ]
};
