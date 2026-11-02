// Dữ liệu Group 1: Foundation (Module 1, 2)
window.PYDATA_GROUP1_PARTS = [
  {
    "id": "mod-01",
    "number": "Module 1",
    "title": "Tư duy Dữ liệu & Thiết lập Môi trường",
    "badge": "3 Bài học",
    "icon": "🎯",
    "description": "Bản chất Tabular Data, quy trình chuẩn công nghiệp CRISP-DM, đối chiếu ACM Data Science Task Force, Notional Machine CPython, môi trường tái lập venv và gỡ lỗi khoa học.",
    "lessons": [
      {
        "id": "pd-01-01",
        "number": "1.1",
        "title": "Bản chất của Dữ liệu dạng Bảng & Quy trình CRISP-DM",
        "subtitle": "Giải phẫu Tabular Data, Tidy Data của Wickham, quy trình 6 pha CRISP-DM và vị trí năng lực theo chuẩn ACM Data Science Task Force 2021",
        "level": "Cơ bản",
        "duration": "35 phút",
        "objectives": [
          "Phân tích cấu trúc giải phẫu dữ liệu dạng bảng (Tabular Data): Hàng (Records/Observations) vs Cột (Variables/Features) và nguyên tắc ô nguyên tử (Atomic Values).",
          "Vận dụng mô hình quy trình chuẩn công nghiệp CRISP-DM 6 pha vào bài toán tối ưu chuỗi bán lẻ TechMart.",
          "Đối chiếu phạm vi kỹ năng với khung năng lực ACM Data Science Task Force (2021): Lập trình, Quản trị dữ liệu và Tư duy mô hình hóa.",
          "Phân biệt dữ liệu thô (Raw Data) chưa chuẩn hóa với dữ liệu Tidy Data theo chuẩn Hadley Wickham."
        ],
        "intuition": {
          "title": "Dây chuyền chế biến nông sản sạch & Chu trình khám phá khoa học",
          "metaphor": "Dữ liệu thô từ các quầy thu ngân TechMart giống như nông sản vừa đào từ ruộng: dính bùn đất, lẫn củ hỏng, lá úa và sai lệch cân nặng (dữ liệu bẩn, thiếu trường, âm số lượng). Bạn không thể đem nông sản bẩn nấu ngay cho khách ăn (đưa thẳng vào thuật toán Machine Learning). Thay vào đó, toàn bộ quy trình phải đi qua dây chuyền: rửa sạch và phân loại (Data Preparation), nếm thử chất lượng (EDA), trình bày đẹp mắt ra đĩa (Visualization) và phục vụ thực khách với thực đơn phù hợp (Data-driven Decision).",
          "boundary": "Phép so sánh nông sản chỉ mô tả tính tuần tự một chiều của khâu làm sạch. Trong thực tế công nghiệp, quy trình khai phá dữ liệu CRISP-DM không phải đường thẳng mà là một vòng xoắn ốc liên tục: kết quả đánh giá (Evaluation) thường xuyên buộc ta quay ngược lại bước thấu hiểu kinh doanh (Business Understanding) hoặc chuẩn bị dữ liệu (Data Preparation).",
          "visualHtml": "\n            <div style=\"display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n              <div style=\"font-weight:700;color:var(--accent-text);text-align:center;\">VÒNG ĐỜI KHAI PHÁ DỮ LIỆU CÔNG NGHIỆP: CRISP-DM 6 PHA</div>\n              <div style=\"display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:8px;text-align:center;\">\n                <div style=\"padding:10px 6px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);\">\n                  <div style=\"font-size:0.7rem;color:var(--text-muted);\">Pha 1</div>\n                  <strong style=\"color:var(--accent-primary);display:block;margin-top:2px;\">Business Understanding</strong>\n                  <span style=\"font-size:0.7rem;color:var(--text-secondary);\">Mục tiêu TechMart</span>\n                </div>\n                <div style=\"padding:10px 6px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);\">\n                  <div style=\"font-size:0.7rem;color:var(--text-muted);\">Pha 2</div>\n                  <strong style=\"color:#0284c7;display:block;margin-top:2px;\">Data Understanding</strong>\n                  <span style=\"font-size:0.7rem;color:var(--text-secondary);\">Khám phá thô & EDA</span>\n                </div>\n                <div style=\"padding:10px 6px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);\">\n                  <div style=\"font-size:0.7rem;color:var(--text-muted);\">Pha 3</div>\n                  <strong style=\"color:#ef4444;display:block;margin-top:2px;\">Data Preparation</strong>\n                  <span style=\"font-size:0.7rem;color:var(--text-secondary);\">Làm sạch & Tidy Data</span>\n                </div>\n                <div style=\"padding:10px 6px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);\">\n                  <div style=\"font-size:0.7rem;color:var(--text-muted);\">Pha 4</div>\n                  <strong style=\"color:#f59e0b;display:block;margin-top:2px;\">Modeling</strong>\n                  <span style=\"font-size:0.7rem;color:var(--text-secondary);\">Phân tích / Thống kê</span>\n                </div>\n                <div style=\"padding:10px 6px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);\">\n                  <div style=\"font-size:0.7rem;color:var(--text-muted);\">Pha 5</div>\n                  <strong style=\"color:#8b5cf6;display:block;margin-top:2px;\">Evaluation</strong>\n                  <span style=\"font-size:0.7rem;color:var(--text-secondary);\">Đối chiếu KPI kinh doanh</span>\n                </div>\n                <div style=\"padding:10px 6px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);\">\n                  <div style=\"font-size:0.7rem;color:var(--text-muted);\">Pha 6</div>\n                  <strong style=\"color:#10b981;display:block;margin-top:2px;\">Deployment</strong>\n                  <span style=\"font-size:0.7rem;color:var(--text-secondary);\">Báo cáo & Pipeline</span>\n                </div>\n              </div>\n              <div style=\"font-size:0.78rem;color:var(--text-muted);text-align:center;margin-top:4px;\">\n                🔄 Mũi tên hai chiều: Evaluation ➔ Business Understanding | Modeling ➔ Data Preparation\n              </div>\n            </div>\n          "
        },
        "sections": [
          {
            "id": "sec-problem-activation",
            "title": "1. Vấn Đề Thực Tế & Kích Hoạt Kiến Thức",
            "badge": "Bối cảnh Thực tế",
            "content": "\n              <p><strong>Tình huống thực tế tại chuỗi siêu thị TechMart:</strong> Cuối quý, Giám đốc Điều hành (COO) nhận được hai báo cáo doanh thu từ hai phòng ban khác nhau: Phòng Kinh doanh báo cáo doanh thu chuỗi đạt <strong>24,5 tỷ VNĐ</strong>, nhưng Phòng Kế toán đối chiếu ngân hàng lại chỉ xác nhận <strong>21,8 tỷ VNĐ</strong>. Sự chênh lệch gần 3 tỷ VNĐ này bắt nguồn từ đâu? Khi điều tra tệp giao dịch thô, đội ngũ kỹ thuật phát hiện: các đơn hàng bị khách trả lại (đơn hủy, số lượng âm) vẫn bị cộng dồn như đơn bán thành công, và nhiều ô mã khuyến mãi bị gộp ô (merged cells) theo kiểu bảng tính thủ công.</p>\n              \n              <div class=\"callout-box callout-tip\" style=\"margin: 16px 0;\">\n                <div class=\"callout-header\"><span>🧠 Kích hoạt kiến thức cũ (Tự trả lời nhanh 2 câu hỏi):</span></div>\n                <div class=\"callout-body\">\n                  <ol style=\"margin: 6px 0 6px 20px;\">\n                    <li>Khi lưu trữ một danh sách gồm 10,000 khách hàng trong Python cơ bản, bạn thường dùng kiểu dữ liệu nào (list, dict, tuple)? Mỗi lựa chọn có ưu thế gì?</li>\n                    <li>Nếu trong một danh sách có cả số nguyên <code>250000</code> lẫn chuỗi ký tự <code>\"250.000 đ\"</code>, điều gì sẽ xảy ra khi bạn gọi hàm <code>sum()</code>?</li>\n                  </ol>\n                </div>\n              </div>\n            "
          },
          {
            "id": "sec-tabular-tidy",
            "title": "2. Giải Phẫu Dữ Liệu Bảng (Tabular Data) & Chuẩn Tidy Data",
            "badge": "Mô hình Dữ liệu",
            "content": "\n              <p>Hơn 85% dữ liệu kinh doanh được lưu trữ và xử lý dưới dạng <strong>bảng 2 chiều (Tabular Data)</strong>. Tuy nhiên, một bảng tính Excel thông thường không đồng nghĩa với một tập dữ liệu phân tích chuẩn mực. Năm 2014, nhà khoa học dữ liệu Hadley Wickham đã định nghĩa chuẩn <strong>Tidy Data</strong> với 3 nguyên tắc bất biến:</p>\n              \n              <div class=\"table-responsive\">\n                <table class=\"table-tidy\" style=\"width:100%;font-size:0.9rem;border-collapse:collapse;\">\n                  <thead>\n                    <tr style=\"background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);\">\n                      <th style=\"padding:10px;text-align:left;\">Thành phần</th>\n                      <th style=\"padding:10px;text-align:left;\">Định nghĩa Chuẩn mực</th>\n                      <th style=\"padding:10px;text-align:left;\">Ví dụ cụ thể tại TechMart</th>\n                      <th style=\"padding:10px;text-align:left;\">Cạm bẫy thường gặp</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>Hàng (Row / Record)</strong></td>\n                      <td>Mỗi hàng đại diện cho đúng một <em>quan sát (Observation)</em> hoặc sự kiện kinh doanh độc lập.</td>\n                      <td>Một giao dịch mua sắm đơn lẻ mang mã <code>order_id = \"HD01\"</code>.</td>\n                      <td>Gộp dòng tổng cộng (Total row) vào cuối bảng khiến các hàm thống kê bị nhân đôi số liệu.</td>\n                    </tr>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>Cột (Column / Feature)</strong></td>\n                      <td>Mỗi cột đại diện cho đúng một <em>biến thuộc tính (Variable)</em> có kiểu dữ liệu đồng nhất.</td>\n                      <td>Cột <code>price</code> là số thực biểu thị đơn giá; cột <code>branch</code> là chuỗi tên chi nhánh.</td>\n                      <td>Lưu nhiều biến vào chung một cột (ví dụ: cột chứa cả tên sản phẩm lẫn màu sắc <code>\"iPhone 15 - Xanh\"</code>).</td>\n                    </tr>\n                    <tr>\n                      <td style=\"padding:10px;\"><strong>Ô (Cell / Value)</strong></td>\n                      <td>Mỗi ô chỉ chứa đúng <em>một giá trị nguyên tử duy nhất (Atomic Value)</em>.</td>\n                      <td>Ô tại dòng 1, cột <code>qty</code> chứa số nguyên <code>2</code>.</td>\n                      <td>Ô chứa danh sách giá trị cách nhau bằng dấu phẩy hoặc ô bị gộp (Merged cells).</td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n\n              <h4>Bên dưới hoạt động thế nào: Mô hình tư duy (Mental Model)</h4>\n              <p>Trong bộ nhớ máy tính, dữ liệu dạng bảng có thể được biểu diễn theo hai trường phái: <strong>Hướng hàng (Row-oriented)</strong> hoặc <strong>Hướng cột (Column-oriented)</strong>. Khi nhận dữ liệu từ cơ sở dữ liệu quan hệ (RDBMS) hoặc file JSON/API, dữ liệu đi vào dạng danh sách các bản ghi (List of Dicts). Nhưng khi bước vào thư viện phân tích như NumPy/Pandas, cấu trúc sẽ được chuyển sang hướng cột (mảng đồng nhất liên tục trong bộ nhớ) để tận dụng sức mạnh tính toán song song vector hóa.</p>\n            ",
            "codeExamples": [
              {
                "title": "Ví dụ mẫu có lời giải từng bước: Mô phỏng quy trình kiểm tra Tabular Data bằng Python thuần",
                "lang": "Python",
                "code": "# Tập dữ liệu giao dịch thô tại 3 chi nhánh TechMart (Hà Nội, TP.HCM, Đà Nẵng)\nraw_orders = [\n    {\"order_id\": \"HD01\", \"item\": \"Chuột không dây Logitech M331\", \"branch\": \"HN\", \"qty\": 2, \"price\": 250000},\n    {\"order_id\": \"HD02\", \"item\": \"Bàn phím cơ Keychron K2\", \"branch\": \"HCM\", \"qty\": 1, \"price\": 1200000},\n    {\"order_id\": \"HD03\", \"item\": \"Tai nghe Bluetooth Sony\", \"branch\": \"DN\", \"qty\": -1, \"price\": 650000}, # Giao dịch hoàn tiền\n    {\"order_id\": \"HD04\", \"item\": \"Cáp sạc Anker Type-C\", \"branch\": \"HN\", \"qty\": 3, \"price\": 180000},\n]\n\n# Bước 1: Kiểm tra tính toàn vẹn (Data Profiling)\nprint(f\"Tổng số bản ghi thu thập: {len(raw_orders)}\")\n\n# Bước 2: Tách biệt giao dịch bán hàng và giao dịch hoàn tiền (Data Preparation)\nsales_orders = [o for o in raw_orders if o[\"qty\"] > 0]\nrefund_orders = [o for o in raw_orders if o[\"qty\"] < 0]\n\n# Bước 3: Tính toán doanh thu gộp, tiền hoàn trả và doanh thu thuần (Net Revenue)\ngross_revenue = sum(o[\"qty\"] * o[\"price\"] for o in sales_orders)\nrefund_total = sum(abs(o[\"qty\"]) * o[\"price\"] for o in refund_orders)\nnet_revenue = gross_revenue - refund_total\n\nprint(f\"Doanh thu gộp (Gross): {gross_revenue:,} VNĐ\")\nprint(f\"Tổng tiền hoàn trả (Refund): {refund_total:,} VNĐ\")\nprint(f\"Doanh thu thuần thực tế (Net): {net_revenue:,} VNĐ\")",
                "output": "Tổng số bản ghi thu thập: 4\nDoanh thu gộp (Gross): 2,240,000 VNĐ\nTổng tiền hoàn trả (Refund): 650,000 VNĐ\nDoanh thu thuần thực tế (Net): 1,590,000 VNĐ",
                "annotations": [
                  {
                    "line": 2,
                    "text": "Dữ liệu hướng hàng dạng List of Dicts, mô phỏng phản hồi từ hệ thống POS bán lẻ."
                  },
                  {
                    "line": 6,
                    "text": "Bản ghi chứa số lượng âm (-1), đại diện cho nghiệp vụ khách trả hàng hoàn tiền."
                  },
                  {
                    "line": 14,
                    "text": "Lọc tường minh các giao dịch bán hàng hợp lệ (qty > 0)."
                  },
                  {
                    "line": 20,
                    "text": "Doanh thu thuần = Doanh thu bán hàng - Tiền hoàn trả. Loại bỏ hoàn toàn chênh lệch số liệu!"
                  }
                ],
                "explanation": "Đoạn code minh họa cách tư duy phân tích tách bạch giữa dòng tiền vào và hoàn trả. Bằng cách xử lý đúng ngữ nghĩa của bản ghi âm, ta loại bỏ hoàn toàn sai số hàng tỷ đồng mà ban giám đốc TechMart gặp phải."
              }
            ]
          },
          {
            "id": "sec-crisp-acm",
            "title": "3. Chuẩn Công Nghiệp CRISP-DM & Khung Năng Lực ACM Data Science 2021",
            "badge": "Tiêu chuẩn & Phương pháp",
            "content": "\n              <p>Năm 1999, một liên minh công nghiệp gồm DaimlerChrysler, SPSS và NCR đã chuẩn hóa quy trình khai phá dữ liệu mang tên <strong>CRISP-DM (Cross-Industry Standard Process for Data Mining)</strong>. Đến nay, CRISP-DM vẫn là khung tham chiếu phổ biến nhất trong kỹ nghệ và khoa học dữ liệu chuyên nghiệp:</p>\n              \n              <ol>\n                <li><strong>Business Understanding (Thấu hiểu bài toán kinh doanh):</strong> Xác định mục tiêu kinh doanh, tiêu chí thành công định lượng và chuyển hóa thành bài toán dữ liệu. (Ví dụ: \"Giảm 15% tồn kho đọng tại chi nhánh TechMart Đà Nẵng\").</li>\n                <li><strong>Data Understanding (Thấu hiểu dữ liệu):</strong> Thu thập dữ liệu ban đầu, kiểm tra tính đầy đủ, phát hiện bất thường, chạy thống kê mô tả sơ khởi.</li>\n                <li><strong>Data Preparation (Chuẩn bị dữ liệu - Chiếm 70–80% công sức):</strong> Lựa chọn bảng, làm sạch giá trị thiếu, xử lý ngoại lai, chuẩn hóa kiểu, tạo biến phái sinh (Feature Engineering).</li>\n                <li><strong>Modeling (Mô hình hóa / Phân tích chuyên sâu):</strong> Lựa chọn kỹ thuật thống kê hoặc mô hình học máy, tinh chỉnh siêu tham số.</li>\n                <li><strong>Evaluation (Đánh giá kết quả):</strong> Đánh giá mức độ đáp ứng mục tiêu kinh doanh đã đặt ra ở Pha 1, kiểm tra thiên lệch và đạo đức dữ liệu.</li>\n                <li><strong>Deployment (Triển khai & Vận hành):</strong> Đóng gói đường ống tự động (Pipeline), trực quan hóa Dashboard hoặc tích hợp vào hệ thống phần mềm nghiệp vụ.</li>\n              </ol>\n\n              <div class=\"callout-box callout-tip\" style=\"margin:16px 0;\">\n                <div class=\"callout-header\"><span>🏛️ Đối chiếu Khung Năng Lực ACM Data Science Task Force (2021):</span></div>\n                <div class=\"callout-body\">\n                  <p>Báo cáo của <strong>Hiệp hội Máy tính Hoa Kỳ (ACM)</strong> định nghĩa 3 nhóm năng lực cốt lõi cho một chuyên gia dữ liệu:</p>\n                  <ul>\n                    <li><strong>Programming & Software Engineering (Lập trình):</strong> Viết code Python sạch (PEP 8/20), cấu trúc dữ liệu, kiểm thử tự động, kiểm soát phiên bản (M1, M2, M11, M12).</li>\n                    <li><strong>Data Management & Governance (Quản trị dữ liệu):</strong> Hiểu cấu trúc bảng, I/O file lớn, ISO/IEC 25012 về chất lượng dữ liệu, bảo mật và quyền riêng tư (M4, M5, M6, M7, M10).</li>\n                    <li><strong>Data Analysis & Statistical Thinking (Phân tích & Thống kê):</strong> Tư duy GAISE, khám phá EDA Tukey, chống ngụy biện thống kê và trực quan hóa trung thực (M8, M9, M13).</li>\n                  </ul>\n                </div>\n              </div>\n\n              <h4>Bảng so sánh: Quy trình Tuyến tính Hẹp vs Quy trình Chuẩn CRISP-DM</h4>\n              <div class=\"table-responsive\">\n                <table style=\"width:100%;font-size:0.9rem;border-collapse:collapse;\">\n                  <thead>\n                    <tr style=\"background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);\">\n                      <th style=\"padding:10px;text-align:left;\">Tiêu chí</th>\n                      <th style=\"padding:10px;text-align:left;\">Quy trình Tuyến tính Hẹp (Thiếu bài bản)</th>\n                      <th style=\"padding:10px;text-align:left;\">Chuẩn Công nghiệp CRISP-DM</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>Hướng tiếp cận</strong></td>\n                      <td>Nhảy ngay vào viết code và chạy mô hình học máy phức tạp.</td>\n                      <td>Bắt đầu từ mục tiêu kinh doanh và ràng buộc thực tế tại hiện trường.</td>\n                    </tr>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>Phản hồi & Lặp lại</strong></td>\n                      <td>Một chiều (Water-fall): Code xong không kiểm tra lại bài toán kinh doanh.</td>\n                      <td>Vòng lặp tương hỗ (Iterative): Pha đánh giá quyết định quay lại chuẩn bị dữ liệu.</td>\n                    </tr>\n                    <tr>\n                      <td style=\"padding:10px;\"><strong>Độ bền vững</strong></td>\n                      <td>Mã nguồn rời rạc, không tái lập được, dễ đổ vỡ khi dữ liệu thay đổi.</td>\n                      <td>Hình thành đường ống dữ liệu (Pipeline) hoàn chỉnh, có kiểm định và giám sát.</td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n            "
          },
          {
            "id": "sec-faded-challenge",
            "title": "4. Ví Dụ Giảm Dần Gợi Ý (Worked Example Fading) & Thử Thách Tự Làm",
            "badge": "Luyện tập Từng bước",
            "content": "\n              <p>Áp dụng nguyên tắc sư phạm của Sweller & Mayer: Sau khi xem lời giải mẫu ở Mục 2, hãy hoàn thành đoạn code giảm dần gợi ý dưới đây:</p>\n              \n              <div class=\"code-example-card\" style=\"margin: 14px 0;\">\n                <div class=\"code-card-header\">\n                  <div class=\"code-header-left\"><span class=\"lang-tag\">Faded Example</span><span>Bài tập điền khuyết: Lọc doanh thu theo chi nhánh TechMart</span></div>\n                </div>\n                <pre class=\"code-pre\"><code><div class=\"code-line\"><span class=\"line-num\">1</span><span class=\"line-content\"># Yêu cầu: Tính tổng doanh thu hợp lệ của chi nhánh \"HN\"</span></div><div class=\"code-line\"><span class=\"line-num\">2</span><span class=\"line-content\">orders = [</span></div><div class=\"code-line\"><span class=\"line-num\">3</span><span class=\"line-content\">    {\"id\": \"T1\", \"branch\": \"HN\", \"qty\": 3, \"price\": 100000},</span></div><div class=\"code-line\"><span class=\"line-num\">4</span><span class=\"line-content\">    {\"id\": \"T2\", \"branch\": \"HCM\", \"qty\": 2, \"price\": 150000},</span></div><div class=\"code-line\"><span class=\"line-num\">5</span><span class=\"line-content\">    {\"id\": \"T3\", \"branch\": \"HN\", \"qty\": -1, \"price\": 100000}, # Hoàn tiền</span></div><div class=\"code-line\"><span class=\"line-num\">6</span><span class=\"line-content\">    {\"id\": \"T4\", \"branch\": \"HN\", \"qty\": 5, \"price\": 200000},</span></div><div class=\"code-line\"><span class=\"line-num\">7</span><span class=\"line-content\">]</span></div><div class=\"code-line\"><span class=\"line-num\">8</span><span class=\"line-content\"># Điền vào chỗ trống: Lọc ra các đơn hàng bán thành công của chi nhánh 'HN'</span></div><div class=\"code-line\"><span class=\"line-num\">9</span><span class=\"line-content\">hn_valid_sales = [o for o in orders if o[\"branch\"] == \"HN\" and ________]</span></div><div class=\"code-line\"><span class=\"line-num\">10</span><span class=\"line-content\">hn_revenue = sum(________ for o in hn_valid_sales)</span></div><div class=\"code-line\"><span class=\"line-num\">11</span><span class=\"line-content\">print(\"Doanh thu HN:\", hn_revenue) # Kỳ vọng: 1,300,000 VNĐ</span></div></code></pre>\n                <div class=\"code-annotations\">\n                  <div class=\"annotations-title\">Gợi ý hoàn thành:</div>\n                  <p style=\"margin:4px 0 0;font-size:0.88rem;color:var(--text-secondary);\">Dòng 9 cần điều kiện <code>o[\"qty\"] &gt; 0</code> để loại bỏ đơn hoàn hủy; Dòng 10 tính tích <code>o[\"qty\"] * o[\"price\"]</code>.</p>\n                </div>\n              </div>\n            "
          },
          {
            "id": "sec-references",
            "title": "5. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n              <ul>\n                <li><strong>Wirth, R., &amp; Hipp, J. (2000).</strong> <em>CRISP-DM: Towards a standard process model for data mining.</em> Proceedings of the 4th International Conference on the Practical Applications of Knowledge Discovery and Data Mining.</li>\n                <li><strong>ACM Data Science Task Force (2021).</strong> <em>Computing Competencies for Undergraduate Data Science Curricula.</em> Association for Computing Machinery.</li>\n                <li><strong>Wickham, H. (2014).</strong> <em>Tidy Data.</em> Journal of Statistical Software, 59(10), 1–23. DOI: 10.18637/jss.v059.i10.</li>\n              </ul>\n            "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Coi dữ liệu bảng giống bảng tính Excel tự do (Merged Cells)",
              "content": "Trong Excel, người dùng thường gộp ô tiêu đề hoặc chèn dòng trống để trình bày đẹp mắt. Khi đưa vào Python, các ô gộp sẽ sinh ra giá trị NaN ngầm và làm lệch toàn bộ chỉ mục (Index), khiến thuật toán tính toán sai lệch nghiêm trọng."
            },
            {
              "title": "Nhảy cóc vào Modeling mà bỏ qua Business & Data Understanding",
              "content": "Đây là sai lầm phổ biến nhất của người mới học: vội vã áp dụng mô hình máy học mà không hiểu ý nghĩa của các con số âm hoặc các mã trạng thái đơn hàng, dẫn đến kết quả phân tích vô nghĩa trong thực tế kinh doanh."
            }
          ],
          "tips": [
            {
              "title": "Quy tắc vàng Atomic Value",
              "content": "Nếu một ô dữ liệu chứa dấu phẩy phân tách nhiều giá trị (ví dụ: \"Chuột, Bàn phím\"), hãy tách ngay thành nhiều hàng độc lập theo chuẩn Tidy Data trước khi tổng hợp số liệu."
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Phân loại các trường dữ liệu theo chuẩn Tidy Data",
            "problem": "Cho một bảng ghi nhận tại quầy thu ngân TechMart gồm các thông tin: `Mã đơn`, `Ngày giờ`, `Chi nhánh`, `Danh sách mặt hàng mua kèm (chuỗi \"Chuột, Phím\")`, `Tổng tiền`. Hãy chỉ ra trường nào đang vi phạm nguyên tắc Tidy Data và giải thích lý do.",
            "hint": "Kiểm tra xem trường nào chứa nhiều hơn một giá trị nguyên tử (Atomic Value).",
            "solutionCode": "print(\"Trường vi phạm: 'Danh sách mặt hàng mua kèm'\")\nprint(\"Lý do: Chứa nhiều giá trị trong cùng một ô ('Chuột, Phím'), vi phạm nguyên tắc Atomic Value của Tidy Data.\")\nprint(\"Giải pháp: Tách mỗi mặt hàng thành một dòng riêng biệt gắn với cùng Mã đơn hàng.\")",
            "solutionOutput": "Trường vi phạm: 'Danh sách mặt hàng mua kèm'\nLý do: Chứa nhiều giá trị trong cùng một ô ('Chuột, Phím'), vi phạm nguyên tắc Atomic Value của Tidy Data.\nGiải pháp: Tách mỗi mặt hàng thành một dòng riêng biệt gắn với cùng Mã đơn hàng.",
            "explanation": "Trong chuẩn Tidy Data, mỗi ô chỉ được phép chứa đúng 1 giá trị duy nhất. Việc để chuỗi nhiều sản phẩm trong một ô sẽ cản trở hoàn toàn các phép lọc, đếm số lượng và tính doanh số theo sản phẩm."
          },
          {
            "level": "Vừa",
            "title": "Lọc và tổng hợp doanh thu thuần đa chi nhánh",
            "problem": "Cho danh sách giao dịch thô tại 3 chi nhánh: `txs = [{\"id\": 1, \"b\": \"HN\", \"qty\": 2, \"p\": 100}, {\"id\": 2, \"b\": \"HCM\", \"qty\": -1, \"p\": 200}, {\"id\": 3, \"b\": \"HN\", \"qty\": 4, \"p\": 50}, {\"id\": 4, \"b\": \"HCM\", \"qty\": 3, \"p\": 150}]`. Hãy viết code Python thuần tính tổng doanh thu bán hàng hợp lệ (qty > 0) cho từng chi nhánh và lưu vào dictionary kết quả.",
            "hint": "Duyệt qua danh sách, kiểm tra qty > 0, cộng dồn doanh thu (qty * p) vào dictionary theo khóa chi nhánh.",
            "solutionCode": "txs = [\n    {\"id\": 1, \"b\": \"HN\", \"qty\": 2, \"p\": 100},\n    {\"id\": 2, \"b\": \"HCM\", \"qty\": -1, \"p\": 200},\n    {\"id\": 3, \"b\": \"HN\", \"qty\": 4, \"p\": 50},\n    {\"id\": 4, \"b\": \"HCM\", \"qty\": 3, \"p\": 150}\n]\nbranch_sales = {}\nfor t in txs:\n    if t[\"qty\"] > 0:\n        rev = t[\"qty\"] * t[\"p\"]\n        branch_sales[t[\"b\"]] = branch_sales.get(t[\"b\"], 0) + rev\n\nprint(\"Doanh số hợp lệ từng chi nhánh:\", branch_sales)",
            "solutionOutput": "Doanh số hợp lệ từng chi nhánh: {'HN': 400, 'HCM': 450}",
            "explanation": "Sử dụng phương thức dict.get(key, 0) giúp khởi tạo giá trị 0 nếu chi nhánh chưa có trong từ điển, sau đó cộng dồn doanh thu bán hàng hợp lệ."
          },
          {
            "level": "Nâng cao",
            "title": "Tình huống thật TechMart: Phát hiện bất thường trong pha Data Understanding",
            "problem": "Trong vai trò Chuyên viên Dữ liệu tại TechMart, bạn nhận được tệp giao dịch có đơn giá âm: `orders = [{\"id\": \"T1\", \"p\": 250000}, {\"id\": \"T2\", \"p\": -50000}, {\"id\": \"T3\", \"p\": 1200000}]`. Dựa trên pha Business Understanding của CRISP-DM, hãy viết hàm phân loại: đơn giá âm có thể là nghiệp vụ \"Mã giảm giá/Voucher\" hay \"Lỗi nhập liệu\"? Hàm cần trả về 2 danh sách phân loại.",
            "hint": "Nếu đơn giá âm nhưng có mã ghi chú voucher thì phân loại khác với lỗi đơn giá âm không rõ nguồn gốc.",
            "solutionCode": "def classify_financial_records(records):\n    clean_sales = []\n    suspicious_errors = []\n    for r in records:\n        if r[\"p\"] >= 0:\n            clean_sales.append(r)\n        else:\n            # Kiểm tra xem có ghi chú hợp lệ không\n            suspicious_errors.append(r)\n    return clean_sales, suspicious_errors\n\norders = [{\"id\": \"T1\", \"p\": 250000}, {\"id\": \"T2\", \"p\": -50000}, {\"id\": \"T3\", \"p\": 1200000}]\nvalid, alert = classify_financial_records(orders)\nprint(f\"Bản ghi hợp lệ: {len(valid)} đơn\")\nprint(f\"Cảnh báo cần đối soát nghiệp vụ: {alert}\")",
            "solutionOutput": "Bản ghi hợp lệ: 2 đơn\nCảnh báo cần đối soát nghiệp vụ: [{'id': 'T2', 'p': -50000}]",
            "explanation": "Trong thực tế kinh doanh, không bao giờ tự ý xóa bỏ các dòng dữ liệu âm mà không đối soát nghiệp vụ. Nó có thể là chiết khấu, voucher hoặc lỗi phần mềm POS."
          }
        ],
        "quiz": [
          {
            "question": "Trong quy trình chuẩn công nghiệp CRISP-DM, giai đoạn nào thường chiếm nhiều thời gian và công sức nhất (lên tới 70–80%) của một dự án dữ liệu?",
            "options": [
              "Business Understanding (Thấu hiểu bài toán kinh doanh)",
              "Modeling (Huấn luyện thuật toán và mô hình học máy)",
              "Data Preparation (Thu thập, làm sạch, định kiểu và chuẩn hóa dữ liệu)",
              "Evaluation (Đánh giá độ chính xác của báo cáo)"
            ],
            "correctIndex": 2,
            "explanation": "Data Preparation luôn là giai đoạn tốn kém thời gian nhất vì dữ liệu thực tế tại doanh nghiệp luôn phân tán, bẩn, thiếu trường và lệch chuẩn."
          },
          {
            "question": "Theo nguyên tắc Tidy Data của Hadley Wickham, phát biểu nào sau đây là ĐÚNG?",
            "options": [
              "Mỗi ô trong bảng có thể chứa một danh sách các giá trị cách nhau bằng dấu chấm phẩy.",
              "Mỗi hàng đại diện cho một biến đo lường, mỗi cột đại diện cho một sự kiện độc lập.",
              "Mỗi biến là một cột, mỗi quan sát độc lập là một hàng, và mỗi ô chỉ chứa đúng một giá trị nguyên tử (Atomic Value).",
              "Cột cuối cùng của bảng bắt buộc phải là cột tính tổng cộng (Total)."
            ],
            "correctIndex": 2,
            "explanation": "Định nghĩa chuẩn của Tidy Data: 1. Mỗi biến một cột; 2. Mỗi quan sát một hàng; 3. Mỗi ô chứa đúng 1 giá trị nguyên tử duy nhất."
          },
          {
            "question": "Nếu kết quả đánh giá (Pha 5: Evaluation) trong CRISP-DM cho thấy mô hình dự báo không đạt chỉ tiêu doanh thu của TechMart, hành động chuẩn mực tiếp theo là gì?",
            "options": [
              "Bỏ qua đánh giá và tiến hành triển khai ngay vào hệ thống sản xuất.",
              "Quay ngược lại pha Business Understanding để làm rõ lại bài toán hoặc pha Data Preparation để tinh chỉnh thêm các biến đặc trưng mới.",
              "Xóa toàn bộ mã nguồn và báo cáo dự án thất bại.",
              "Đổi số liệu thực tế để báo cáo đẹp hơn."
            ],
            "correctIndex": 1,
            "explanation": "CRISP-DM là một chu trình lặp (Iterative cycle). Kết quả đánh giá không đạt là tín hiệu để quay lại định nghĩa bài toán kinh doanh hoặc cải thiện chất lượng dữ liệu đầu vào."
          }
        ],
        "summary": [
          "Dữ liệu bảng chuẩn Tidy Data gồm: Hàng (Quan sát), Cột (Biến đo lường đồng nhất kiểu), Ô (Giá trị nguyên tử).",
          "Quy trình chuẩn công nghiệp CRISP-DM gồm 6 pha: Business Understanding ➔ Data Understanding ➔ Data Preparation ➔ Modeling ➔ Evaluation ➔ Deployment.",
          "Khung năng lực ACM Data Science Task Force (2021) nhấn mạnh sự kết hợp kiềng ba chân: Kỹ thuật lập trình, Quản trị dữ liệu và Tư duy thống kê."
        ],
        "selfReviewQuestions": [
          "1. Vì sao không nên gộp các ô (Merged Cells) theo phong cách bảng tính Excel khi thiết kế bảng dữ liệu phân tích?",
          "2. Nêu 6 giai đoạn của mô hình CRISP-DM và giải thích vì sao giữa Modeling và Data Preparation luôn có mũi tên phản hồi hai chiều?",
          "3. Thế nào là một giá trị nguyên tử (Atomic Value) trong nguyên tắc Tidy Data? Cho ví dụ về một ô vi phạm nguyên tắc này."
        ],
        "reflectionQuestion": "Hãy giải thích bằng lời của bạn: Tại sao một nhà khoa học dữ liệu hiểu rất sâu về thuật toán AI phức tạp nhưng nếu thiếu kỹ năng ở pha Business Understanding (Thấu hiểu kinh doanh) thì dự án vẫn cầm chắc thất bại?",
        "reflectionHint": "Hãy nghĩ về trường hợp: Mô hình toán học tối ưu hóa một chỉ số kỹ thuật rất cao, nhưng chỉ số đó lại hoàn toàn lệch pha với mục tiêu tài chính hoặc trải nghiệm thực tế của khách hàng tại siêu thị.",
        "nextLessonPreview": "Ở bài tiếp theo (1.2), chúng ta sẽ khám phá mô hình Notional Machine của CPython và phân định rạch ròi: Khi nào nên dùng Jupyter Notebook để khám phá ý tưởng và khi nào bắt buộc phải dùng Python Script (.py) để tự động hóa tái lập sản xuất!"
      },
      {
        "id": "pd-01-02",
        "number": "1.2",
        "title": "Môi trường Phân tích: Notional Machine, venv, Script vs Notebook",
        "subtitle": "Khám phá cơ chế thực thi CPython (Source -> Bytecode -> PVM), cô lập môi trường với venv và kiểm soát tính tái lập (Reproducibility)",
        "level": "Cơ bản",
        "duration": "40 phút",
        "objectives": [
          "Giải thích mô hình tư duy thực thi (Notional Machine) của CPython: Biên dịch mã nguồn (.py) sang Bytecode (.pyc) và nạp vào máy ảo PVM (Python Virtual Machine).",
          "Phân tích ưu điểm và cạm bẫy của Jupyter Notebook (.ipynb) so với Python Script (.py), đặc biệt là hiện tượng Out-of-order execution và State pollution.",
          "Thiết lập môi trường ảo venv độc lập, quản lý gói phụ thuộc với pip freeze và nguyên tắc Semantic Versioning để đảm bảo tính tái lập (Reproducibility).",
          "Thực hành quy trình khôi phục tính tuần tự của Notebook phục vụ kiểm định chất lượng."
        ],
        "intuition": {
          "title": "Cuốn sổ nháp thí nghiệm vs Bản vẽ thiết kế thi công sản xuất",
          "metaphor": "Jupyter Notebook giống như cuốn sổ tay của nhà khoa học trong phòng thí nghiệm: bạn có thể ghi chép, vẽ vài phác thảo, chạy thử vài phép tính và xem ngay đồ thị đổi màu dưới đáy trang. Nó cực kỳ linh hoạt cho giai đoạn tìm tòi khám phá (EDA). Nhưng Python Script (.py) giống như bản vẽ kỹ thuật chi tiết của kỹ sư trưởng: chuẩn xác, tuần tự từ trên xuống dưới, không có bất kỳ trạng thái ẩn nào và có thể giao cho máy chủ đám mây tự chạy mỗi đêm lúc 2 giờ sáng mà không bao giờ sợ sai lệch!",
          "boundary": "Notebook rất trực quan nhưng dễ gây ra ảo tưởng: việc một ô (cell) chạy thành công không có nghĩa là toàn bộ dự án có thể tái lập được nếu các ô bị chạy sai thứ tự trong bộ nhớ RAM.",
          "visualHtml": "\n            <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n              <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">NOTIONAL MACHINE CPYTHON: QUY TRÌNH THỰC THI SCRIPT .PY</div>\n              <div style=\"display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:wrap;\">\n                <div style=\"padding:8px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);text-align:center;flex:1;min-width:110px;\">\n                  <strong style=\"color:var(--accent-primary);\">Mã nguồn .py</strong>\n                  <div style=\"font-size:0.7rem;color:var(--text-muted);\">Text (UTF-8)</div>\n                </div>\n                <span>➔ Compiler ➔</span>\n                <div style=\"padding:8px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);text-align:center;flex:1;min-width:110px;\">\n                  <strong style=\"color:#f59e0b;\">Bytecode (.pyc)</strong>\n                  <div style=\"font-size:0.7rem;color:var(--text-muted);\">Code Object / Opcode</div>\n                </div>\n                <span>➔ PVM ➔</span>\n                <div style=\"padding:8px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);text-align:center;flex:1;min-width:110px;\">\n                  <strong style=\"color:#10b981;\">Evaluation Loop</strong>\n                  <div style=\"font-size:0.7rem;color:var(--text-muted);\">Call Stack &amp; Frame</div>\n                </div>\n              </div>\n            </div>\n          "
        },
        "sections": [
          {
            "id": "sec-notional-machine",
            "title": "1. Notional Machine: CPython Thực Thi Mã Nguồn Như Thế Nào?",
            "badge": "Bản chất Kiến trúc",
            "content": "\n              <p>Thuật ngữ <strong>Notional Machine (Mô hình tư duy về máy thực thi)</strong> do nhà nghiên cứu giáo dục tin học Juha Sorva đề xuất: đây là mô hình trừu tượng giúp lập trình viên hình dung chính xác những gì diễn ra bên dưới phần cứng khi một dòng lệnh chạy.</p>\n              \n              <h4>Ba giai đoạn chuyển hóa của CPython:</h4>\n              <ol>\n                <li><strong>Parsing &amp; AST (Phân tích cú pháp):</strong> Trình biên dịch CPython đọc tệp văn bản <code>.py</code>, phân tích token và dựng cây cú pháp trừu tượng (Abstract Syntax Tree). Nếu có lỗi chính tả (như thiếu dấu hai chấm <code>:</code>), chương trình sẽ dừng ngay lập tức tại <code>SyntaxError</code> trước khi chạy bất kỳ dòng lệnh nào.</li>\n                <li><strong>Bytecode Compilation (Biên dịch mã máy ảo):</strong> AST được chuyển hóa thành chuỗi các chỉ thị máy ảo nhị phân gọi là <strong>Bytecode</strong> (đóng gói trong các tệp <code>.pyc</code> nằm ở thư mục <code>__pycache__</code>). Bạn có thể xem các chỉ thị này thông qua module chuẩn <code>dis</code> của Python.</li>\n                <li><strong>Python Virtual Machine (PVM Execution Loop):</strong> Máy ảo Python là một kiến trúc hướng ngăn xếp (Stack-based Virtual Machine). Hàm vòng lặp điều phối chính <code>_PyEval_EvalFrameDefault</code> (trong tệp nguồn C <code>ceval.c</code> của CPython) lần lượt lấy từng opcode, đẩy dữ liệu vào Stack Frame, thực thi phép toán và quản lý bộ nhớ đệm.</li>\n              </ol>\n            ",
            "codeExamples": [
              {
                "title": "Khảo sát Bytecode thực tế của phép tính doanh thu TechMart bằng module dis",
                "lang": "Python",
                "code": "import dis\n\ndef calc_order_total(qty, price, discount=0.05):\n    \"\"\"Tính tổng tiền đơn hàng sau khi trừ chiết khấu.\"\"\"\n    subtotal = qty * price\n    final_total = subtotal * (1 - discount)\n    return final_total\n\n# Giải phẫu mã Bytecode mà máy ảo CPython thực sự thực thi\nprint(\"=== CÁC CHỈ THỊ BYTECODE CỦA HÀM ===\")\ndis.dis(calc_order_total)",
                "output": "=== CÁC CHỈ THỊ BYTECODE CỦA HÀM ===\n  5           RESUME                   0\n\n  7           LOAD_FAST_BORROW_LOAD_FAST_BORROW 1 (qty, price)\n              BINARY_OP                5 (*)\n              STORE_FAST               3 (subtotal)\n\n  8           LOAD_FAST_BORROW         3 (subtotal)\n              LOAD_SMALL_INT           1\n              LOAD_FAST_BORROW         2 (discount)\n              BINARY_OP               10 (-)\n              BINARY_OP                5 (*)\n              STORE_FAST               4 (final_total)\n\n  9           LOAD_FAST_BORROW         4 (final_total)\n              RETURN_VALUE",
                "annotations": [
                  {
                    "line": 9,
                    "text": "dis.dis() tháo gỡ hàm Python thành danh sách các lệnh Opcode hợp ngữ của máy ảo PVM."
                  },
                  {
                    "line": 11,
                    "text": "LOAD_FAST: Đẩy biến cục bộ vào ngăn xếp (Evaluation Stack)."
                  },
                  {
                    "line": 13,
                    "text": "BINARY_OP (*): Lấy 2 phần tử trên đỉnh ngăn xếp, nhân lại và đẩy kết quả ngược vào stack."
                  },
                  {
                    "line": 14,
                    "text": "STORE_FAST: Lấy kết quả từ đỉnh stack gán vào tên biến cục bộ subtotal."
                  }
                ],
                "explanation": "Hiểu được Notional Machine giúp bạn nhận ra: Python không chạy trực tiếp văn bản bạn gõ, mà biên dịch sang Bytecode Stack. Khi hiểu được cách ngăn xếp hoạt động, việc tối ưu hóa hiệu năng và đọc Traceback sẽ trở nên hoàn toàn tự nhiên."
              }
            ]
          },
          {
            "id": "sec-notebook-vs-script",
            "title": "2. Sổ Nháp Nghiên Cứu vs Dây Chuyền Sản Xuất: Bẫy Out-of-Order Execution",
            "badge": "Phương pháp Thực hành",
            "content": "\n              <p>Trong cộng đồng Khoa học Dữ liệu, có một cuộc tranh luận kinh điển giữa <strong>Jupyter Notebook (.ipynb)</strong> và <strong>Python Script (.py)</strong>. Cả hai đều có vị trí đắc địa nếu dùng đúng mục đích:</p>\n\n              <div class=\"table-responsive\">\n                <table style=\"width:100%;font-size:0.9rem;border-collapse:collapse;\">\n                  <thead>\n                    <tr style=\"background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);\">\n                      <th style=\"padding:10px;text-align:left;\">Đặc tính</th>\n                      <th style=\"padding:10px;text-align:left;\">Jupyter Notebook (.ipynb)</th>\n                      <th style=\"padding:10px;text-align:left;\">Python Script (.py)</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>Bản chất lưu trữ</strong></td>\n                      <td>Tệp JSON chứa mã nguồn, kết quả output, biểu đồ base64 và metadata.</td>\n                      <td>Tệp văn bản thuần túy (Plain text UTF-8), tương thích hoàn hảo với Git diff.</td>\n                    </tr>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>Cơ chế thực thi</strong></td>\n                      <td>Tương tác theo từng ô (Cell-by-cell). Trạng thái biến trong RAM được giữ nguyên giữa các ô.</td>\n                      <td>Tuần tự từ trên xuống dưới (Top-to-bottom), khởi tạo và hủy bộ nhớ độc lập.</td>\n                    </tr>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>Mục đích tối ưu</strong></td>\n                      <td>Thăm dò dữ liệu ban đầu (EDA), thử nghiệm biểu đồ, trình bày báo cáo trực quan cho sếp.</td>\n                      <td>Xây dựng đường ống ETL tự động hóa, chạy ngầm định kỳ (Cron job), kiểm thử Unit Test.</td>\n                    </tr>\n                    <tr>\n                      <td style=\"padding:10px;\"><strong>Cạm bẫy lớn nhất</strong></td>\n                      <td><strong>Out-of-order Execution:</strong> Chạy cell 5 trước cell 2 khiến bộ nhớ bị nhiễm độc trạng thái (Hidden State).</td>\n                      <td>Không hiển thị ngay lập tức biểu đồ trực quan, cần công cụ dòng lệnh để chạy.</td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n\n              <h4>Quy tắc vệ sinh phòng thí nghiệm với Jupyter Notebook:</h4>\n              <p>Trước khi chia sẻ tệp <code>.ipynb</code> cho đồng nghiệp hoặc đẩy lên Git repo của TechMart, bạn <strong>bắt buộc</strong> phải thực hiện thao tác: <code>Kernel ➔ Restart &amp; Run All Cells</code>. Nếu xuất hiện bất kỳ lỗi nào ở giữa chừng, Notebook của bạn chưa đạt chuẩn tái lập!</p>\n            "
          },
          {
            "id": "sec-reproducible-venv",
            "title": "3. Môi Trường Tái Lập (Reproducibility) với venv & pip freeze",
            "badge": "Kỹ nghệ Môi trường",
            "content": "\n              <p>Câu nói gây ám ảnh nhất trong kỹ thuật phần mềm là: <em>\"Trên máy em code vẫn chạy tốt mà!\" (It works on my machine)</em>. Điều này xảy ra do sự khác biệt giữa các phiên bản thư viện cài đặt toàn cục (Global packages). Chuẩn mực kỹ nghệ đòi hỏi mỗi dự án phải có một <strong>môi trường ảo (Virtual Environment)</strong> hoàn toàn cô lập:</p>\n\n              <h4>Cơ chế hoạt động của venv:</h4>\n              <p>Khi bạn tạo môi trường ảo bằng lệnh <code>python -m venv .venv</code>, Python tạo một thư mục cục bộ chứa bản sao của trình thông dịch và đặt biến môi trường <code>sys.prefix</code> trỏ vào thư mục này. Khi được kích hoạt, <code>PATH</code> của hệ điều hành sẽ ưu tiên binary của <code>.venv</code>, đảm bảo các gói cài qua <code>pip</code> chỉ nằm gọn trong dự án hiện tại mà không làm hỏng hệ thống.</p>\n            ",
            "codeExamples": [
              {
                "title": "Các lệnh thiết lập môi trường ảo chuẩn công nghiệp và kiểm tra tính tái lập",
                "lang": "Bash",
                "code": "# 1. Tạo môi trường ảo tên .venv\npython -m venv .venv\n\n# 2. Kích hoạt môi trường ảo:\n# Trên Windows PowerShell:\n.venv\\Scripts\\Activate.ps1\n# Trên Linux / macOS:\nsource .venv/bin/activate\n\n# 3. Nâng cấp trình quản lý gói pip\npython -m pip install --upgrade pip\n\n# 4. Cài đặt các thư viện trụ cột với phiên bản kiểm soát\npip install numpy pandas matplotlib seaborn requests\n\n# 5. Xuất danh sách phiên bản cụ thể ra requirements.txt\npip freeze > requirements.txt",
                "output": "# Nội dung mẫu của requirements.txt sau khi xuất:\nnumpy==2.5.4\npandas==3.1.0\nmatplotlib==3.11.2\nseaborn==0.13.2\nrequests==2.34.2",
                "annotations": [
                  {
                    "line": 2,
                    "text": "Tạo cây thư mục môi trường ảo cô lập hoàn toàn với Python toàn cục."
                  },
                  {
                    "line": 6,
                    "text": "Lệnh kích hoạt môi trường trên Windows PowerShell."
                  },
                  {
                    "line": 17,
                    "text": "pip freeze ghim chính xác từng phiên bản (Exact Pinning) để bất kỳ ai cũng tái lập được môi trường giống hệt."
                  }
                ],
                "explanation": "requirements.txt với cú pháp pkg==x.y.z là bản hợp đồng đảm bảo tính tái lập khoa học (Reproducibility), giúp toàn bộ đội ngũ TechMart chạy code đồng nhất 100%."
              }
            ]
          },
          {
            "id": "sec-env-references",
            "title": "4. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n              <ul>\n                <li><strong>Python Documentation.</strong> <em>venv — Creation of virtual environments.</em> <a href=\"https://docs.python.org/3/library/venv.html\" target=\"_blank\" rel=\"noopener\">https://docs.python.org/3/library/venv.html</a></li>\n                <li><strong>Sorva, J. (2013).</strong> <em>Notional machines and introductory programming education.</em> ACM Transactions on Computing Education (TOCE), 13(2), 1–31.</li>\n                <li><strong>Sandve, G. K., et al. (2013).</strong> <em>Ten simple rules for reproducible computational research.</em> PLoS Computational Biology, 9(10), e1003285.</li>\n              </ul>\n            "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Cạm bẫy ô nhớ ẩn (Hidden State) trong Jupyter Notebook",
              "content": "Nếu bạn khai báo `total = 500` ở ô 1, sau đó ở ô 2 bạn viết `total += 100`. Mỗi lần bạn bấm Shift+Enter chạy lại ô 2, biến total sẽ tăng thêm 100 trong RAM dù nội dung text không đổi! Điều này tạo ra sai số số liệu kinh doanh ngầm rất nguy hiểm."
            },
            {
              "title": "Cài đặt gói thư viện toàn cục (Global Environment Pollution)",
              "content": "Cài đặt trực tiếp `pip install pandas` vào Python hệ thống sẽ khiến các dự án cũ dùng Pandas phiên bản khác bị xung đột và đổ vỡ dây chuyền."
            }
          ],
          "tips": [
            {
              "title": "Quy tắc đặt tên môi trường ảo",
              "content": "Nên đặt tên thư mục môi trường ảo là `.venv` và thêm ngay `.venv/` vào tệp `.gitignore` để tránh đẩy hàng nghìn file nhị phân nặng hàng trăm MB lên kho mã nguồn GitHub."
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Khôi phục tính tuần tự và tái lập của một Notebook bị lỗi",
            "problem": "Một đồng nghiệp tại TechMart gửi cho bạn tệp `sales_analysis.ipynb`. Khi bạn chạy tuần tự từ cell 1 đến cell 4 thì gặp lỗi `NameError: name 'clean_data' is not defined`, nhưng đồng nghiệp khẳng định họ chạy vẫn ra kết quả. Nguyên nhân gốc rễ là gì và cách xử lý chuẩn mực?",
            "hint": "Hãy nghĩ về thứ tự chạy cell (Execution order) và trạng thái trong RAM.",
            "solutionCode": "print(\"Nguyên nhân: Đồng nghiệp đã khai báo hàm clean_data ở Cell 7 nhưng lại chạy trước, sau đó mới quay lên chạy Cell 4 (Out-of-order execution).\")\nprint(\"Khi khởi động mới Kernel, Cell 4 chạy trước khi hàm clean_data được nạp vào bộ nhớ nên sinh NameError.\")\nprint(\"Cách xử lý: Chuyển toàn bộ các định nghĩa hàm lên đầu tệp (Cell 1, 2) và chọn 'Restart Kernel & Run All Cells'.\")",
            "solutionOutput": "Nguyên nhân: Đồng nghiệp đã khai báo hàm clean_data ở Cell 7 nhưng lại chạy trước, sau đó mới quay lên chạy Cell 4 (Out-of-order execution).\nKhi khởi động mới Kernel, Cell 4 chạy trước khi hàm clean_data được nạp vào bộ nhớ nên sinh NameError.\nCách xử lý: Chuyển toàn bộ các định nghĩa hàm lên đầu tệp (Cell 1, 2) và chọn 'Restart Kernel & Run All Cells'.",
            "explanation": "Notebook lưu trữ kết quả của các cell theo trạng thái bộ nhớ RAM tại thời điểm bấm chạy, không đại diện cho tính tuần tự thực tế nếu không thực hiện kiểm tra khởi động lại Kernel."
          },
          {
            "level": "Vừa",
            "title": "Kiểm tra đường dẫn môi trường ảo sys.prefix bằng Python",
            "problem": "Viết một đoạn code Python ngắn kiểm tra xem script đang chạy trong môi trường ảo (venv) hay đang chạy ở môi trường Python toàn cục của hệ thống.",
            "hint": "So sánh `sys.prefix` và `sys.base_prefix`. Nếu khác nhau, bạn đang ở trong venv.",
            "solutionCode": "import sys\n\ndef check_virtual_env():\n    is_venv = (sys.prefix != sys.base_prefix)\n    print(\"Đường dẫn thực thi hiện tại:\", sys.prefix)\n    print(\"Đường dẫn Python gốc hệ thống:\", sys.base_prefix)\n    if is_venv:\n        print(\"✓ ĐANG CHẠY TRONG MÔI TRƯỜNG ẢO (VENV) HỢP LỆ!\")\n    else:\n        print(\"⚠️ CẢNH BÁO: ĐANG CHẠY TRÊN PYTHON TOÀN CỤC CỦA HỆ ĐIỀU HÀNH!\")\n    return is_venv\n\ncheck_virtual_env()",
            "solutionOutput": "Đường dẫn thực thi hiện tại: C:\\Python314\nĐường dẫn Python gốc hệ thống: C:\\Python314\n⚠️ CẢNH BÁO: ĐANG CHẠY TRÊN PYTHON TOÀN CỤC CỦA HỆ ĐIỀU HÀNH!",
            "explanation": "Trong CPython, khi môi trường ảo được kích hoạt, sys.prefix sẽ trỏ tới thư mục venv cục bộ, trong khi sys.base_prefix lưu đường dẫn cài đặt gốc của hệ điều hành."
          },
          {
            "level": "Nâng cao",
            "title": "Tự động hóa xuất tệp requirements.txt có ghim phiên bản",
            "problem": "Cho danh sách các thư viện lõi: `[\"pandas\", \"numpy\", \"matplotlib\"]`. Viết hàm Python trích xuất phiên bản hiện hành của các thư viện này và định dạng thành các dòng theo chuẩn `requirements.txt` (ví dụ: `pandas==3.1.0`).",
            "hint": "Dùng `__import__(name).__version__`.",
            "solutionCode": "def export_lock_requirements(package_list):\n    lines = []\n    for pkg in package_list:\n        try:\n            mod = __import__(pkg)\n            version = getattr(mod, \"__version__\", \"unknown\")\n            lines.append(f\"{pkg}=={version}\")\n        except ImportError:\n            lines.append(f\"# {pkg} (chưa được cài đặt)\")\n    return \"\\n\".join(lines)\n\npkgs = [\"pandas\", \"numpy\", \"matplotlib\"]\nprint(export_lock_requirements(pkgs))",
            "solutionOutput": "pandas==3.1.0\nnumpy==2.5.4\nmatplotlib==3.11.2",
            "explanation": "Ghim cứng phiên bản cụ thể (Exact Version Pinning) giúp loại bỏ triệt để nguy cơ đổ vỡ mã nguồn khi các thư viện bên ngoài cập nhật phiên bản mới có thay đổi đột ngột (Breaking changes)."
          }
        ],
        "quiz": [
          {
            "question": "Khi thực thi một file mã nguồn `script.py`, trình biên dịch CPython thực hiện chuỗi chuyển hóa nào sau đây?",
            "options": [
              "Source Code (.py) ➔ Cú pháp mã máy x86 ➔ Trực tiếp gửi xuống CPU.",
              "Source Code (.py) ➔ Cây cú pháp AST ➔ Bytecode nhị phân (.pyc) ➔ Máy ảo PVM thực thi.",
              "Source Code (.py) ➔ Tệp HTML ➔ Trình duyệt web thực thi.",
              "Source Code (.py) ➔ Tệp nén ZIP ➔ Giải nén vào RAM."
            ],
            "correctIndex": 1,
            "explanation": "CPython là một hệ thống thông dịch bytecode: Mã nguồn được phân tích thành AST, biên dịch thành Bytecode độc lập phần cứng và được nạp vào máy ảo Python Virtual Machine (PVM)."
          },
          {
            "question": "Tại sao việc ghim phiên bản cụ thể (ví dụ: `pandas==3.1.0`) trong tệp `requirements.txt` lại được coi là nguyên tắc bắt buộc trong Khoa học Dữ liệu Tái Lập (Reproducible Research)?",
            "options": [
              "Để ngăn cản đồng nghiệp nâng cấp máy tính.",
              "Để đảm bảo bất kỳ ai tải dự án về sau 1 năm hoặc 5 năm vẫn cài đặt đúng phiên bản thư viện tương thích, cho ra cùng một kết quả phân tích.",
              "Vì các phiên bản mới của Python không cho phép cài đặt thư viện.",
              "Để giảm dung lượng ổ cứng của server."
            ],
            "correctIndex": 1,
            "explanation": "Các bản cập nhật thư viện thường thay đổi hành vi mặc định hoặc loại bỏ cú pháp cũ. Ghim phiên bản đảm bảo tính tái lập (Reproducibility) trường tồn của mã nguồn."
          },
          {
            "question": "Khi gặp lỗi \"Out-of-order execution\" trong Jupyter Notebook, thao tác chuẩn xác nhất để đưa tệp phân tích về trạng thái sạch là gì?",
            "options": [
              "Xóa tệp Notebook và tạo lại từ đầu.",
              "Tắt màn hình máy tính và bật lại.",
              "Chọn lệnh \"Restart Kernel & Run All Cells\" để xóa sạch trạng thái RAM cũ và thực thi tuần tự từ trên xuống.",
              "Đổi tên các ô cell thành số ngẫu nhiên."
            ],
            "correctIndex": 2,
            "explanation": "Restart Kernel xóa bỏ hoàn toàn các biến ẩn trong RAM và kiểm tra tính tuần tự nghiêm ngặt của toàn bộ tệp phân tích."
          }
        ],
        "summary": [
          "CPython thực thi mã nguồn qua 3 bước: Parsing thành AST ➔ Biên dịch Bytecode (.pyc) ➔ Nạp vào máy ảo PVM.",
          "Dùng Jupyter Notebook cho giai đoạn nghiên cứu ý tưởng (EDA); dùng Python Script (.py) cho đường ống tự động hóa và sản xuất.",
          "Luôn cô lập dự án bằng môi trường ảo venv và kiểm soát phiên bản tái lập bằng requirements.txt."
        ],
        "selfReviewQuestions": [
          "1. Nêu vai trò của tệp Bytecode (.pyc) và máy ảo PVM trong mô hình thực thi của CPython.",
          "2. Hiện tượng Out-of-order execution trong Jupyter Notebook là gì? Tại sao nó gây nguy hiểm cho tính toán số liệu kinh doanh?",
          "3. Phân biệt `sys.prefix` và `sys.base_prefix`. Biến môi trường nào quyết định gói thư viện được nạp khi gọi lệnh pip?"
        ],
        "reflectionQuestion": "Hãy tự chất vấn: Nếu bạn bàn giao một notebook phân tích doanh thu TechMart cho giám đốc, làm thế nào bạn có thể chứng minh 100% rằng các con số trên biểu đồ không phải là kết quả của việc bạn chạy thử một ô biến tạm thời nào đó trong RAM rồi xóa mất ô code đó?",
        "reflectionHint": "Nghĩ về tính tái lập: Nếu một người độc lập kéo code về máy sạch, gõ đúng một lệnh mà tái hiện chính xác từng con số thì đó mới là kết quả khoa học tin cậy.",
        "nextLessonPreview": "Ở bài tiếp theo (1.3), chúng ta sẽ trang bị vũ khí sinh tử cho kỹ sư dữ liệu: Phương pháp luận đọc ngược Traceback từ dưới lên và quy trình gỡ lỗi có hệ thống (Hypothesis-Driven Debugging)!"
      },
      {
        "id": "pd-01-03",
        "number": "1.3",
        "title": "Hệ sinh thái Thư viện & Gỡ lỗi Dữ liệu Có Hệ thống",
        "subtitle": "Bản đồ hệ sinh thái Python for Data, phương pháp đọc Traceback từ dòng cuối cùng và quy trình gỡ lỗi khoa học (Hypothesis-Driven Debugging)",
        "level": "Trung cấp",
        "duration": "40 phút",
        "objectives": [
          "Định vị vai trò và ranh giới trách nhiệm của 7 thư viện trụ cột: NumPy, Pandas, Matplotlib, Seaborn, Requests, Pandera và Pytest.",
          "Giải phẫu cấu trúc Call Stack và áp dụng phương pháp đọc Traceback ngược từ dòng cuối cùng lên trên để xác định nguyên nhân gốc rễ.",
          "Vận dụng quy trình gỡ lỗi khoa học 5 bước (Hypothesis-Driven Debugging): Quan sát ➔ Đặt giả thuyết ➔ Thu hẹp phạm vi ➔ Thực nghiệm kiểm chứng ➔ Vá lỗi & Kiểm thử hồi quy.",
          "Phân biệt và bẫy lỗi có chủ đích cho 3 nhóm ngoại lệ dữ liệu phổ biến nhất: KeyError, ValueError và TypeError theo triết lý EAFP."
        ],
        "intuition": {
          "title": "Hộp đen máy bay và Phương pháp điều tra hiện trường vụ án",
          "metaphor": "Traceback trong Python không phải là một lời trách phạt của máy tính, mà là chiếc hộp đen ghi lại từng khoảnh khắc cuối cùng trước khi chương trình gặp nạn: nó ghi nhận chính xác hàm nào đã gọi hàm nào, ở dòng số mấy, trong tệp tin nào. Dòng dưới cùng chính là tọa độ phát nổ (tên ngoại lệ và mô tả cụ thể). Người điều tra hiện trường chuyên nghiệp luôn đọc dòng dưới cùng trước để biết bản chất vụ nổ (KeyError hay ValueError), thay vì hoảng loạn đọc hàng chục dòng thư viện trung gian ở trên!",
          "boundary": "Traceback chỉ chỉ ra nơi lỗi phát tác (symptom), không nhất thiết là nơi lỗi sinh ra (root cause). Ví dụ: một ô bị gán giá trị &lt;code&gt;None&lt;/code&gt; từ 100 dòng trước, nhưng đến khi thực hiện phép chia ở dòng 105 mới nổ TypeError.",
          "visualHtml": "\n            <div style=\"font-family:var(--font-mono);font-size:0.8rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n              <div style=\"color:var(--text-muted);\">Traceback (most recent call last):</div>\n              <div style=\"color:var(--text-muted);padding-left:14px;\">File \"pipeline.py\", line 12, in &lt;module&gt; ➔ run_pipeline()</div>\n              <div style=\"color:var(--text-muted);padding-left:28px;\">File \"pipeline.py\", line 45, in clean_data ➔ process_branch(orders)</div>\n              <div style=\"color:var(--text-muted);padding-left:42px;\">File \"pipeline.py\", line 78, in process_branch ➔ return row[\"doanh_thu\"]</div>\n              <div style=\"color:#ef4444;font-weight:700;padding-left:14px;font-size:0.9rem;margin-top:6px;\">\n                ➔ KeyError: 'doanh_thu'  (ĐỌC DÒNG NÀY ĐẦU TIÊN!)\n              </div>\n              <div style=\"color:#10b981;font-size:0.75rem;margin-top:6px;border-top:1px dashed var(--border-subtle);padding-top:4px;\">\n                ▲ Dòng dưới cùng chỉ rõ: Khóa 'doanh_thu' không tồn tại (do gõ sai chính tả hoặc bảng dữ liệu dùng tên 'revenue')!\n              </div>\n            </div>\n          "
        },
        "sections": [
          {
            "id": "sec-ecosystem-map",
            "title": "1. Bản Đồ Hệ Sinh Thái Python for Data: Ranh Giới & Trách Nhiệm",
            "badge": "Bức tranh Tổng thể",
            "content": "\n              <p>Một sai lầm của người mới học là dùng sai công cụ cho công việc: dùng vòng for Python thuần để duyệt triệu bản ghi, hoặc dùng Pandas để làm những việc mà NumPy giải quyết nhanh hơn 50 lần. Hãy nắm vững bản đồ phân vai 7 trụ cột công nghệ xuyên suốt giáo trình:</p>\n\n              <div class=\"table-responsive\">\n                <table style=\"width:100%;font-size:0.9rem;border-collapse:collapse;\">\n                  <thead>\n                    <tr style=\"background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);\">\n                      <th style=\"padding:10px;text-align:left;\">Thư viện</th>\n                      <th style=\"padding:10px;text-align:left;\">Vai trò cốt lõi</th>\n                      <th style=\"padding:10px;text-align:left;\">Bản chất bên dưới</th>\n                      <th style=\"padding:10px;text-align:left;\">Module trong khóa</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>NumPy</strong></td>\n                      <td>Tính toán mảng đa chiều, đại số tuyến tính, toán vector tốc độ cao.</td>\n                      <td>Vùng nhớ C-contiguous liên tục, chỉ thị phần cứng SIMD, không overhead đối tượng Python.</td>\n                      <td>Module 3</td>\n                    </tr>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>Pandas</strong></td>\n                      <td>Thao tác dữ liệu bảng 2D (Series, DataFrame), làm sạch, căn chỉnh nhãn Index.</td>\n                      <td>Xây dựng trên nền NumPy &amp; PyArrow, cơ chế Copy-on-Write (CoW), tự động gióng hàng Index Alignment.</td>\n                      <td>Module 4, 5, 6, 7</td>\n                    </tr>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>Matplotlib &amp; Seaborn</strong></td>\n                      <td>Trực quan hóa đồ họa thông tin, biểu đồ thống kê khám phá và trình bày báo cáo.</td>\n                      <td>Kiến trúc phân cấp hướng đối tượng Figure/Axes, mã hóa thẩm mỹ (Grammar of Graphics).</td>\n                      <td>Module 8</td>\n                    </tr>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>Requests &amp; HTTPX</strong></td>\n                      <td>Thu thập dữ liệu từ REST API, tích hợp dịch vụ bên ngoài.</td>\n                      <td>Giao thức HTTP chuẩn RFC 9110, xử lý mã trạng thái, cơ chế retry backoff có jitter.</td>\n                      <td>Module 10</td>\n                    </tr>\n                    <tr>\n                      <td style=\"padding:10px;\"><strong>Pandera &amp; Pytest</strong></td>\n                      <td>Hàng rào kiểm định dữ liệu tại biên (Validation Gate) và kiểm thử hồi quy tự động.</td>\n                      <td>Mô hình Arrange-Act-Assert, kiểm tra kiểu dữ liệu, chặn đứng lỗi ngầm (Silent Bugs).</td>\n                      <td>Module 11, 13</td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n            "
          },
          {
            "id": "sec-hypothesis-debugging",
            "title": "2. Phương Pháp Luận Gỡ Lỗi Khoa Học: Hypothesis-Driven Debugging",
            "badge": "Phương pháp Tư duy",
            "content": "\n              <p>Phần lớn người học lập trình gỡ lỗi theo kiểu <strong>thử bừa ngẫu nhiên (Shotgun Debugging)</strong>: thấy lỗi ở đâu thì đổi lung tung vài ký tự, thêm bừa dấu ngoặc hoặc dán dòng code lên diễn đàn mà không hiểu nguyên nhân. Đây là cách làm việc phản khoa học và gây lãng phí hàng giờ đồng hồ.</p>\n              \n              <h4>Quy trình 5 bước gỡ lỗi có hệ thống (Hypothesis-Driven Debugging):</h4>\n              <ol>\n                <li><strong>Quan sát (Observe):</strong> Đọc dòng cuối cùng của Traceback. Tên lỗi là gì? Thông báo cụ thể nói lên điều gì? Dòng code nào trong tệp của bạn là trạm dừng cuối cùng?</li>\n                <li><strong>Đặt giả thuyết (Formulate Hypothesis):</strong> Đưa ra một nhận định có thể kiểm chứng được. (Ví dụ: <em>\"Giả thuyết: Cột 'price' chứa chuỗi ký tự 'Liên hệ' nên hàm float() không thể ép kiểu sang số thực\"</em>).</li>\n                <li><strong>Thu hẹp phạm vi (Narrow Scope):</strong> Cô lập đoạn dữ liệu nghi ngờ bằng các câu lệnh in kiểm tra (Print debugging) hoặc ngắt kiểm tra (Breakpoint).</li>\n                <li><strong>Thực nghiệm kiểm chứng (Experiment):</strong> Chạy một đoạn mã thử nghiệm nhỏ (Minimal Reproducible Example) để chứng minh giả thuyết đúng hay sai.</li>\n                <li><strong>Vá lỗi &amp; Kiểm thử hồi quy (Fix &amp; Regression Test):</strong> Sau khi sửa lỗi, chạy lại toàn bộ đường ống để đảm bảo bản sửa lỗi không làm vỡ các chức năng khác đã chạy tốt trước đó.</li>\n              </ol>\n            "
          },
          {
            "id": "sec-three-exceptions",
            "title": "3. Ba Họ Ngoại Lệ Dữ Liệu Kinh Điển & Triết Lý EAFP",
            "badge": "Thực nghiệm Code",
            "content": "\n              <p>Trong kỹ thuật dữ liệu, 95% các sự cố sập chương trình bắt nguồn từ 3 ngoại lệ:</p>\n              <ul>\n                <li><strong>KeyError:</strong> Truy xuất một khóa không tồn tại trong từ điển hoặc một tên cột không có trong DataFrame. Nguyên nhân: Gõ sai chữ hoa/thường (<code>'Revenue'</code> vs <code>'revenue'</code>), thừa khoảng trắng ở đầu/cuối (<code>'price '</code>).</li>\n                <li><strong>ValueError:</strong> Cú pháp đúng, hàm nhận đúng kiểu dữ liệu (chuỗi), nhưng nội dung giá trị không thể chuyển đổi được (ví dụ: ép chuỗi <code>\"Miễn phí\"</code> sang số nguyên).</li>\n                <li><strong>TypeError:</strong> Thực hiện phép toán không tương thích giữa các kiểu dữ liệu (ví dụ: lấy chuỗi <code>\"100\"</code> chia cho số nguyên <code>2</code>).</li>\n              </ul>\n\n              <div class=\"callout-box callout-tip\" style=\"margin:14px 0;\">\n                <div class=\"callout-header\"><span>⚖️ Triết lý Python: EAFP vs LBYL:</span></div>\n                <div class=\"callout-body\">\n                  <p><strong>LBYL (Look Before You Leap - Nhìn trước khi nhảy):</strong> Luôn kiểm tra điều kiện bằng hàng loạt câu lệnh <code>if-else</code> trước khi thao tác.</p>\n                  <p><strong>EAFP (Easier to Ask for Forgiveness than Permission - Dễ xin tha thứ hơn xin phép):</strong> Triết lý chuẩn mực của Python: Hãy cứ thực hiện thao tác trong khối <code>try</code>, nếu gặp lỗi cụ thể thì bắt tại <code>except</code> để cách ly bản ghi hỏng mà không làm dừng toàn bộ hệ thống.</p>\n                </div>\n              </div>\n            ",
            "codeExamples": [
              {
                "title": "Áp dụng EAFP và xử lý ngoại lệ có chủ đích trên dữ liệu bán lẻ TechMart",
                "lang": "Python",
                "code": "# Tệp dữ liệu đơn hàng thô có lẫn lộn dữ liệu bẩn từ nhiều nguồn\nraw_stream = [\n    {\"order_id\": \"TM01\", \"item\": \"Chuột Gaming\", \"amount\": \"450000\"},\n    {\"order_id\": \"TM02\", \"item\": \"Bàn phím cơ\", \"amount\": \"1200000\"},\n    {\"order_id\": \"TM03\", \"item\": \"Tai nghe USB\", \"amount\": \"Hàng tặng kèm\"}, # ValueError khi ép số\n    {\"order_id\": \"TM04\", \"item\": \"Miếng lót chuột\"},                       # KeyError thiếu trường amount\n    {\"order_id\": \"TM05\", \"item\": \"Đế tản nhiệt\", \"amount\": \"350000\"},\n]\n\nvalid_records = []\nquarantine_log = []\n\nfor record in raw_stream:\n    try:\n        # Triết lý EAFP: Thao tác trực tiếp và bắt đúng ngoại lệ cụ thể\n        amount_val = int(record[\"amount\"])\n        valid_records.append({\n            \"order_id\": record[\"order_id\"],\n            \"item\": record[\"item\"],\n            \"amount\": amount_val\n        })\n    except KeyError as k_err:\n        quarantine_log.append({\n            \"record\": record,\n            \"error_type\": \"KeyError\",\n            \"reason\": f\"Thiếu trường dữ liệu bắt buộc: {k_err}\"\n        })\n    except ValueError as v_err:\n        quarantine_log.append({\n            \"record\": record,\n            \"error_type\": \"ValueError\",\n            \"reason\": f\"Không thể ép kiểu số tiền: {v_err}\"\n        })\n\nprint(f\"Bản ghi hợp lệ: {len(valid_records)}\")\nprint(f\"Bản ghi bị cách ly (Quarantine): {len(quarantine_log)}\")\nfor q in quarantine_log:\n    print(f\" -> Đơn {q['record'].get('order_id', 'N/A')}: [{q['error_type']}] {q['reason']}\")",
                "output": "Bản ghi hợp lệ: 3\nBản ghi bị cách ly (Quarantine): 2\n -> Đơn TM03: [ValueError] Không thể ép kiểu số tiền: invalid literal for int() with base 10: 'Hàng tặng kèm'\n -> Đơn TM04: [KeyError] Thiếu trường dữ liệu bắt buộc: 'amount'",
                "annotations": [
                  {
                    "line": 16,
                    "text": "Thao tác ép kiểu nằm trong khối try, không cần viết hàng loạt if rườm rà."
                  },
                  {
                    "line": 22,
                    "text": "Bắt chính xác KeyError khi từ điển thiếu trường amount."
                  },
                  {
                    "line": 28,
                    "text": "Bắt chính xác ValueError khi amount chứa chuỗi ký tự chữ."
                  },
                  {
                    "line": 36,
                    "text": "Không để pipeline bị crash: dữ liệu bẩn được cách ly vào Quarantine Log để đối soát."
                  }
                ],
                "explanation": "Đoạn code thể hiện kiến trúc phòng vệ chuyên nghiệp: thay vì để chương trình dừng đột ngột khiến khách hàng không thanh toán được, ta bắt đúng lỗi cụ thể, chuyển bản ghi lỗi vào khu vực cách ly (Quarantine) và tiếp tục phục vụ các đơn hàng hợp lệ."
              }
            ]
          },
          {
            "id": "sec-debug-references",
            "title": "4. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n              <ul>\n                <li><strong>Python Documentation.</strong> <em>Errors and Exceptions.</em> <a href=\"https://docs.python.org/3/tutorial/errors.html\" target=\"_blank\" rel=\"noopener\">https://docs.python.org/3/tutorial/errors.html</a></li>\n                <li><strong>PEP 20.</strong> <em>The Zen of Python (Tim Peters): \"Errors should never pass silently. Unless explicitly silenced.\"</em> <a href=\"https://peps.python.org/pep-0020/\" target=\"_blank\" rel=\"noopener\">https://peps.python.org/pep-0020/</a></li>\n                <li><strong>Zeller, A. (2009).</strong> <em>Why Programs Fail: A Guide to Systematic Debugging (2nd ed.).</em> Morgan Kaufmann.</li>\n              </ul>\n            "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Cạm bẫy tội lỗi nhất: `except Exception: pass`",
              "content": "Bắt lỗi chung chung rồi nuốt chửng lỗi (Silent Failure) là hành động phá hoại hệ thống nguy hiểm nhất trong kỹ nghệ phần mềm. Lỗi ngầm sẽ lan truyền sang các bước sau, làm sai lệch toàn bộ báo cáo doanh thu mà không ai hay biết."
            },
            {
              "title": "Gỡ lỗi bằng cách đoán mò (Shotgun Debugging)",
              "content": "Thay đổi code liên tục khi chưa xác định được nguyên nhân gốc rễ (Root Cause) chỉ khiến mã nguồn thêm hỗn loạn và phát sinh thêm lỗi tiềm ẩn mới."
            }
          ],
          "tips": [
            {
              "title": "Nguyên tắc vàng khi đọc Traceback",
              "content": "Luôn kéo thẳng xuống dòng cuối cùng để đọc tên ngoại lệ và thông điệp lỗi trước. Sau đó tìm dòng code gần nhất thuộc tệp dự án của bạn (bỏ qua các dòng gọi nội bộ của thư viện CPython/Pandas)."
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Đọc và phân tích thông điệp Traceback",
            "problem": "Khi chạy script tính thưởng TechMart, hệ thống báo lỗi sau:\n`TypeError: unsupported operand type(s) for *: 'int' and '&lt;code&gt;None&lt;/code&gt;Type'` tại dòng 15: `bonus = base_salary * rate`.\nHãy giải thích ý nghĩa của thông báo lỗi trên và chỉ ra biến nào đang chứa giá trị bất thường.",
            "hint": "Toán tử nhân (*) đang cố nhân một số nguyên với giá trị &lt;code&gt;None&lt;/code&gt;.",
            "solutionCode": "print(\"Ý nghĩa lỗi: Phép nhân (*) không thể thực hiện giữa một số nguyên (int) và một giá trị rỗng (NoneType).\")\nprint(\"Biến bị bất thường: Biến 'rate' đang nhận giá trị None (do thiếu tỷ lệ thưởng hoặc hàm tính rate quên lệnh return).\")",
            "solutionOutput": "Ý nghĩa lỗi: Phép nhân (*) không thể thực hiện giữa một số nguyên (int) và một giá trị rỗng (&lt;code&gt;None&lt;/code&gt;Type).\nBiến bị bất thường: Biến 'rate' đang nhận giá trị &lt;code&gt;None&lt;/code&gt; (do thiếu tỷ lệ thưởng hoặc hàm tính rate quên lệnh return).",
            "explanation": "Trong Python, &lt;code&gt;None&lt;/code&gt;Type xuất hiện khi một hàm không trả về giá trị hoặc khi một trường trong cơ sở dữ liệu bị khuyết (NULL). Phép nhân với &lt;code&gt;None&lt;/code&gt; sẽ nổ TypeError ngay lập tức."
          },
          {
            "level": "Vừa",
            "title": "Viết hàm trích xuất cột an toàn phòng vệ KeyError",
            "problem": "Viết hàm `safe_get_column(records, col_name, default_val=&lt;code&gt;None&lt;/code&gt;)` nhận vào một danh sách các dictionary (List of Dicts) và tên cột cần trích xuất. Hàm phải trả về danh sách giá trị của cột đó. Nếu một bản ghi nào đó thiếu cột này, hãy tự động điền `default_val` thay vì làm sập chương trình.",
            "hint": "Dùng phương thức `row.get(col_name, default_val)`.",
            "solutionCode": "def safe_get_column(records, col_name, default_val=None):\n    return [row.get(col_name, default_val) for row in records]\n\norders = [\n    {\"id\": 1, \"rev\": 100},\n    {\"id\": 2}, # Thiếu trường rev\n    {\"id\": 3, \"rev\": 300}\n]\nresult = safe_get_column(orders, \"rev\", default_val=0)\nprint(\"Kết quả trích xuất an toàn:\", result)",
            "solutionOutput": "Kết quả trích xuất an toàn: [100, 0, 300]",
            "explanation": "Phương thức dict.get() là kỹ thuật phòng vệ kinh điển trong Python, giúp tránh hoàn toàn ngoại lệ KeyError khi cấu trúc dữ liệu không hoàn chỉnh."
          },
          {
            "level": "Nâng cao",
            "title": "Tình huống thật: Dựng bộ lọc cách ly dữ liệu bẩn Quarantine cho TechMart",
            "problem": "Viết hàm `quarantine_cleaner(raw_orders)` nhận vào danh sách đơn hàng thô. Yêu cầu:\n1. Đơn hợp lệ phải có `order_id` (chuỗi), `qty` (số nguyên > 0) và `price` (số thực hoặc nguyên > 0).\n2. Nếu vi phạm bất kỳ điều kiện nào (ép kiểu lỗi, thiếu trường, số lượng <= 0), bản ghi phải được đưa vào danh sách `quarantine` kèm lý do cụ thể.\n3. Trả về tuple `(clean_list, quarantine_list)`.",
            "hint": "Dùng cấu trúc try-except kết hợp kiểm tra logic nghiệp vụ.",
            "solutionCode": "def quarantine_cleaner(raw_orders):\n    clean = []\n    quarantine = []\n    for r in raw_orders:\n        try:\n            order_id = str(r[\"order_id\"])\n            qty = int(r[\"qty\"])\n            price = float(r[\"price\"])\n            \n            if qty <= 0:\n                quarantine.append((r, \"Số lượng qty phải lớn hơn 0\"))\n            elif price <= 0:\n                quarantine.append((r, \"Đơn giá price phải lớn hơn 0\"))\n            else:\n                clean.append({\"order_id\": order_id, \"qty\": qty, \"price\": price})\n        except KeyError as ke:\n            quarantine.append((r, f\"Thiếu trường dữ liệu: {ke}\"))\n        except (ValueError, TypeError) as ve:\n            quarantine.append((r, f\"Sai định dạng số: {ve}\"))\n            \n    return clean, quarantine\n\ntest_data = [\n    {\"order_id\": \"T1\", \"qty\": \"2\", \"price\": \"150000\"},\n    {\"order_id\": \"T2\", \"qty\": \"-1\", \"price\": \"200000\"},\n    {\"order_id\": \"T3\", \"qty\": \"3\", \"price\": \"Miễn phí\"},\n    {\"qty\": 1, \"price\": 50000} # Thiếu order_id\n]\nvalid_orders, rejected = quarantine_cleaner(test_data)\nprint(f\"Hợp lệ ({len(valid_orders)}):\", valid_orders)\nprint(f\"Bị từ chối ({len(rejected)}):\")\nfor item, reason in rejected:\n    print(f\" - Lỗi: {reason} | Record: {item}\")",
            "solutionOutput": "Hợp lệ (1): [{'order_id': 'T1', 'qty': 2, 'price': 150000.0}]\nBị từ chối (3):\n - Lỗi: Số lượng qty phải lớn hơn 0 | Record: {'order_id': 'T2', 'qty': '-1', 'price': '200000'}\n - Lỗi: Sai định dạng số: could not convert string to float: 'Miễn phí' | Record: {'order_id': 'T3', 'qty': '3', 'price': 'Miễn phí'}\n - Lỗi: Thiếu trường dữ liệu: 'order_id' | Record: {'qty': 1, 'price': 50000}",
            "explanation": "Một pipeline dữ liệu chuẩn công nghiệp không bao giờ để dữ liệu lỗi lọt vào tầng tính toán và cũng không âm thầm vứt bỏ dữ liệu. Việc phân loại vào Quarantine giúp đội ngũ vận hành dễ dàng đối soát với quầy thu ngân."
          }
        ],
        "quiz": [
          {
            "question": "Khi đọc một báo cáo lỗi Traceback trong Python, dòng nào chứa thông tin quan trọng nhất cần xem xét đầu tiên?",
            "options": [
              "Dòng đầu tiên: \"Traceback (most recent call last):\"",
              "Dòng ngẫu nhiên ở giữa tệp thư viện site-packages.",
              "Dòng cuối cùng: Chứa tên loại ngoại lệ (Exception Type) và thông điệp mô tả lỗi cụ thể.",
              "Tất cả các dòng đều quan trọng như nhau."
            ],
            "correctIndex": 2,
            "explanation": "Dòng cuối cùng của Traceback luôn là điểm phát nổ ngoại lệ thực tế. Đọc dòng này trước giúp bạn định vị ngay loại sự cố (KeyError, ValueError, TypeError) mà không bị phân tâm."
          },
          {
            "question": "Trong quy trình gỡ lỗi có hệ thống (Hypothesis-Driven Debugging), bước \"Đặt giả thuyết\" (Formulate Hypothesis) có ý nghĩa gì?",
            "options": [
              "Đoán mò xem thư viện nào bị lỗi và cài lại máy tính.",
              "Đưa ra một phát biểu logic có thể kiểm chứng được về nguyên nhân gây ra lỗi dựa trên thông báo Traceback và dữ liệu đầu vào.",
              "Đổ lỗi cho bộ phận thu thập dữ liệu.",
              "Tắt các dòng code báo lỗi đi."
            ],
            "correctIndex": 1,
            "explanation": "Gỡ lỗi khoa học đòi hỏi lập luận logic: Quan sát hiện tượng ➔ Đặt giả thuyết có thể kiểm chứng ➔ Thiết kế thực nghiệm chứng minh giả thuyết ➔ Sửa lỗi và kiểm thử hồi quy."
          },
          {
            "question": "Triết lý EAFP (Easier to Ask for Forgiveness than Permission) trong Python khuyến khích điều gì khi xử lý ngoại lệ trong đường ống dữ liệu?",
            "options": [
              "Luôn viết hàng chục câu lệnh if-else lồng nhau trước khi truy cập bất kỳ thuộc tính nào.",
              "Thực hiện thao tác trong khối try và bắt đúng ngoại lệ cụ thể (như KeyError, ValueError) ở khối except để cách ly lỗi mà không làm dừng cả chương trình.",
              "Dùng `except Exception: pass` để giấu nhẹm mọi lỗi xảy ra.",
              "Không bao giờ dùng khối try-except."
            ],
            "correctIndex": 1,
            "explanation": "EAFP khuyến khích viết code trực tiếp, trong sáng và bắt các ngoại lệ cụ thể khi chúng xảy ra, giúp mã nguồn dễ đọc hơn và hiệu năng cao hơn so với việc kiểm tra điều kiện LBYL liên tục."
          }
        ],
        "summary": [
          "Hệ sinh thái Python for Data phân vai rõ ràng: NumPy (tính toán mảng SIMD), Pandas (bảng và Index), Matplotlib/Seaborn (trực quan hóa), Pandera/Pytest (kiểm định).",
          "Đọc Traceback từ dưới lên trên để khoanh vùng Call Stack và bắt đúng nguyên nhân gốc rễ.",
          "Gỡ lỗi có hệ thống theo 5 bước: Quan sát ➔ Giả thuyết ➔ Thu hẹp phạm vi ➔ Thực nghiệm ➔ Vá lỗi hồi quy.",
          "Áp dụng EAFP và bắt lỗi có chủ đích để xây dựng bộ định tuyến cách ly (Quarantine Router) cho dữ liệu bẩn."
        ],
        "selfReviewQuestions": [
          "1. Nêu sự khác biệt cốt lõi về bản chất kiến trúc giữa mảng NumPy ndarray và bảng Pandas DataFrame.",
          "2. Tại sao câu lệnh `except Exception: pass` lại bị coi là phản mẫu (anti-pattern) nguy hiểm nhất trong kỹ nghệ dữ liệu?",
          "3. Khi gặp ngoại lệ `KeyError: 'price'`, 3 nguyên nhân phổ biến nhất trong thực tế là gì?"
        ],
        "reflectionQuestion": "Hãy giải thích: Tại sao trong một hệ thống xử lý giao dịch tài chính thời gian thực, việc bắt lỗi và chuyển dữ liệu bẩn vào bảng Quarantine lại vượt trội hoàn toàn so với việc để chương trình sập (crash) hoặc tự động gán giá trị 0?",
        "reflectionHint": "Nghĩ về sự đánh đổi: Sập chương trình làm gián đoạn toàn bộ siêu thị; tự gán số 0 làm sai lệch báo cáo tài chính kiểm toán; cách ly vào Quarantine vừa giữ luồng chạy vừa bảo toàn vết đối soát.",
        "nextLessonPreview": "Bước sang Module 2, chúng ta sẽ xây dựng cây cầu nối vững chắc từ Python nền tảng sang Kỹ nghệ dữ liệu: Giải mã mô hình bộ nhớ Name-Object Binding, con trỏ Heap, độ phức tạp Big-O và cạm bẫy đột biến bộ nhớ!"
      }
    ]
  },
  {
    "id": "mod-02",
    "number": "Module 2",
    "title": "Python Cầu nối cho Kỹ thuật Dữ liệu",
    "badge": "3 Bài học",
    "icon": "🐍",
    "description": "Mô hình Name-Object Binding, con trỏ đối tượng, độ phức tạp Big-O của list/dict/set, phương pháp PRIMM, chuẩn mực PEP 8/20/257 và nền tảng cho View vs Copy.",
    "lessons": [
      {
        "id": "pd-02-01",
        "number": "2.1",
        "title": "Mô Hình Bộ Nhớ Name-Object Binding & Độ Phức Tạp Big-O",
        "subtitle": "Biến là nhãn dán con trỏ (tag), toán tử is vs ==, độ phức tạp thuật toán Big-O theo tài liệu chính thức và so sánh List of Dicts vs Dict of Lists",
        "level": "Cơ bản",
        "duration": "40 phút",
        "objectives": [
          "Giải thích mô hình bộ nhớ CPython: Name-Object Binding (Biến là nhãn dán/con trỏ trỏ vào vùng nhớ Heap, không phải chiếc hộp chứa dữ liệu).",
          "Phân biệt triệt để Toán tử đồng nhất (Identity operator `is`) vs Toán tử bằng giá trị (Equality operator `==`) qua hàm `id()`.",
          "Đánh giá và tra cứu độ phức tạp thời gian Big-O của các thao tác trên List, Dict, Set dựa trên tài liệu chính thức Python TimeComplexity Wiki.",
          "Phân tích sự đánh đổi (Trade-offs) về bộ nhớ RAM và tốc độ giữa hai mô hình tổ chức dữ liệu: List of Dicts (hướng hàng) vs Dict of Lists (hướng cột)."
        ],
        "intuition": {
          "title": "Chiếc nhãn hành lý ở sân bay vs Chiếc hộp các-tông",
          "metaphor": "Trong các ngôn ngữ như C/C++, biến số giống như một chiếc hộp các-tông: bạn đặt số 10 vào hộp, chiếc hộp chiếm một ngăn cố định trong tủ. Nhưng trong Python, biến số chỉ là CHIẾC NHÃN HÀNH LÝ ĐƯỢC BUỘC BẰNG DÂY! Số 10 là một kiện hàng độc lập nằm trên băng chuyền (Heap). Câu lệnh a = 10 chỉ đơn giản là buộc nhãn \"a\" vào kiện hàng 10. Khi bạn viết b = a, bạn không đóng thêm một kiện hàng mới, mà chỉ buộc thêm chiếc nhãn thứ hai \"b\" vào cùng kiện hàng đó!",
          "boundary": "Phép ví dụ nhãn dán giúp hiểu vì sao hai biến cùng trỏ vào một đối tượng khả biến (như list/dict) thì sửa một bên sẽ làm đổi cả hai bên. Nhưng với các đối tượng bất biến nhỏ (như số nguyên từ -5 đến 256), CPython thực hiện tối ưu hóa ngầm (Integer Interning) khiến việc kiểm tra ô nhớ có những hành vi đặc biệt.",
          "visualHtml": "\n            <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n              <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">MÔ HÌNH NAME-OBJECT BINDING TRONG BỘ NHỚ PYTHON</div>\n              <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:12px;\">\n                <div style=\"padding:10px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);\">\n                  <strong style=\"color:var(--accent-primary);\">Namespace (Tên biến)</strong>\n                  <div style=\"margin-top:6px;color:var(--text-secondary);\">Nhãn 'a' ───(pointer)───┐</div>\n                  <div style=\"margin-top:4px;color:var(--text-secondary);\">Nhãn 'b' ───(pointer)───┤</div>\n                </div>\n                <div style=\"padding:10px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);\">\n                  <strong style=\"color:#10b981;\">Heap Memory (Đối tượng thực)</strong>\n                  <div style=\"margin-top:6px;color:#10b981;\">➔ [10, 20, 30, 40]</div>\n                  <div style=\"font-size:0.7rem;color:var(--text-muted);margin-top:4px;\">Địa chỉ ô nhớ: id() = 0x7ffd9a...</div>\n                </div>\n              </div>\n              <div style=\"font-size:0.75rem;color:var(--text-muted);text-align:center;margin-top:8px;\">\n                a is b ➔ True (Cùng trỏ 1 ô nhớ) | a.append(40) ➔ b cũng thấy 40!\n              </div>\n            </div>\n          "
        },
        "sections": [
          {
            "id": "sec-name-binding",
            "title": "1. Bản Chất Bộ Nhớ: Name-Object Binding & Toán Tử `is` vs `==`",
            "badge": "Bản chất Bộ nhớ",
            "content": "\n              <p>Mọi thứ trong Python đều là đối tượng (Everything is an object). Mỗi đối tượng trong bộ nhớ Heap luôn có 3 thành phần bất biến:</p>\n              <ol>\n                <li><strong>Định danh duy nhất (Identity):</strong> Địa chỉ ô nhớ thực tế của đối tượng trong RAM, trích xuất qua hàm built-in <code>id(obj)</code>.</li>\n                <li><strong>Kiểu dữ liệu (Type):</strong> Xác định các phép toán hợp lệ trên đối tượng, xem qua <code>type(obj)</code>.</li>\n                <li><strong>Giá trị (Value):</strong> Nội dung dữ liệu lưu trữ bên trong đối tượng.</li>\n              </ol>\n\n              <h4>Phân biệt sinh tử: <code>is</code> vs <code>==</code></h4>\n              <ul>\n                <li><strong>Toán tử <code>==</code> (Equality):</strong> So sánh <em>giá trị (Value)</em> bên trong hai đối tượng. Trả về <code>True</code> nếu nội dung dữ liệu tương đương nhau (thực thi thông qua phương thức kỳ diệu <code>__eq__</code>).</li>\n                <li><strong>Toán tử <code>is</code> (Identity):</strong> So sánh <em>định danh ô nhớ (Identity)</em>. Trả về <code>True</code> khi và chỉ khi hai tên biến cùng trỏ vào <strong>chính xác một ô nhớ duy nhất</strong> trong RAM (tương đương <code>id(a) == id(b)</code>).</li>\n              </ul>\n            ",
            "codeExamples": [
              {
                "title": "Thực nghiệm phân biệt toán tử is và == trên dữ liệu đơn hàng TechMart",
                "lang": "Python",
                "code": "# Khởi tạo hai danh sách có nội dung giá trị hoàn toàn giống hệt nhau\norder_hn = [101, 102, 103]\norder_hcm = [101, 102, 103]\n\nprint(\"So sánh giá trị (order_hn == order_hcm):\", order_hn == order_hcm)\nprint(\"So sánh ô nhớ (order_hn is order_hcm):   \", order_hn is order_hcm)\nprint(f\"Địa chỉ RAM HN:  {id(order_hn)}\")\nprint(f\"Địa chỉ RAM HCM: {id(order_hcm)}\")\n\n# Thực hiện phép gán nhãn tham chiếu\norder_backup = order_hn\nprint(\"\\nSau khi gán order_backup = order_hn:\")\nprint(\"order_backup is order_hn:\", order_backup is order_hn)\n\n# Đột biến thông qua nhãn backup\norder_backup.append(104)\nprint(\"Nội dung order_hn gốc:\", order_hn)",
                "output": "So sánh giá trị (order_hn == order_hcm): True\nSo sánh ô nhớ (order_hn is order_hcm):    False\nĐịa chỉ RAM HN:  (Thay đổi theo phiên chạy OS, ví dụ: 2184918293568)\nĐịa chỉ RAM HCM: (Thay đổi theo phiên chạy OS, ví dụ: 2184918294208)\n\nSau khi gán order_backup = order_hn:\norder_backup is order_hn: True\nNội dung order_hn gốc: [101, 102, 103, 104]",
                "annotations": [
                  {
                    "line": 5,
                    "text": "== trả về True vì nội dung danh sách phần tử tương đương."
                  },
                  {
                    "line": 6,
                    "text": "is trả về False vì CPython cấp phát 2 vùng RAM độc lập cho 2 list mới."
                  },
                  {
                    "line": 12,
                    "text": "order_backup = order_hn KHÔNG tạo list mới, chỉ gắn thêm nhãn vào cùng ô nhớ."
                  },
                  {
                    "line": 17,
                    "text": "Sửa order_backup làm biến đổi luôn order_hn gốc!"
                  }
                ],
                "explanation": "Hiểu được Name-Object Binding là chìa khóa mở toang cánh cửa hiểu sâu về View vs Copy trong NumPy và Pandas sau này. Nếu bạn không nắm vững bản chất này, các lỗi đột biến dữ liệu ngầm sẽ phá hủy tính toàn vẹn của báo cáo."
              }
            ]
          },
          {
            "id": "sec-big-o-complexity",
            "title": "2. Bảng Độ Phức Tạp Thuật Toán Big-O của List, Dict, Set",
            "badge": "Khoa học Máy tính",
            "content": "\n              <p>Khi xử lý hàng triệu dòng dữ liệu tại TechMart, lựa chọn cấu trúc dữ liệu quyết định việc chương trình chạy trong <strong>0.1 giây</strong> hay mất <strong>15 phút</strong>. Dưới đây là bảng đối chiếu độ phức tạp thời gian từ tài liệu chính thức <em>Python Software Foundation Wiki: TimeComplexity</em>:</p>\n\n              <div class=\"table-responsive\">\n                <table style=\"width:100%;font-size:0.9rem;border-collapse:collapse;\">\n                  <thead>\n                    <tr style=\"background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);\">\n                      <th style=\"padding:10px;text-align:left;\">Thao tác</th>\n                      <th style=\"padding:10px;text-align:left;\">List (Mảng động)</th>\n                      <th style=\"padding:10px;text-align:left;\">Dictionary (Bảng băm)</th>\n                      <th style=\"padding:10px;text-align:left;\">Set (Tập hợp băm)</th>\n                      <th style=\"padding:10px;text-align:left;\">Giải thích cơ chế bên dưới</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>Truy xuất theo chỉ số / khóa</strong></td>\n                      <td style=\"color:#10b981;\"><strong>O(1)</strong></td>\n                      <td style=\"color:#10b981;\"><strong>O(1)</strong></td>\n                      <td>N/A (không có thứ tự)</td>\n                      <td>List tính offset địa chỉ qua công thức; Dict tính chỉ mục mảng băm qua hàm hash().</td>\n                    </tr>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>Tìm kiếm kiểm tra tồn tại (<code>x in S</code>)</strong></td>\n                      <td style=\"color:#ef4444;\"><strong>O(n)</strong></td>\n                      <td style=\"color:#10b981;\"><strong>O(1)</strong></td>\n                      <td style=\"color:#10b981;\"><strong>O(1)</strong></td>\n                      <td>List phải duyệt tuần tự từ đầu tới cuối mảng; Dict/Set băm trực tiếp khóa để tra cứu ngay.</td>\n                    </tr>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>Chèn / Thêm ở cuối (<code>append / add</code>)</strong></td>\n                      <td style=\"color:#10b981;\"><strong>O(1)</strong> amortized</td>\n                      <td style=\"color:#10b981;\"><strong>O(1)</strong> amortized</td>\n                      <td style=\"color:#10b981;\"><strong>O(1)</strong> amortized</td>\n                      <td>CPython cấp phát dôi dư dung lượng mảng (Over-allocation) nên chi phí trung bình là O(1).</td>\n                    </tr>\n                    <tr>\n                      <td style=\"padding:10px;\"><strong>Chèn / Xóa ở đầu (<code>insert(0, x) / pop(0)</code>)</strong></td>\n                      <td style=\"color:#ef4444;\"><strong>O(n)</strong></td>\n                      <td>N/A</td>\n                      <td>N/A</td>\n                      <td>List phải tịnh tiến (shift) toàn bộ n phần tử còn lại sang bên phải một ô nhớ.</td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n\n              <div class=\"callout-box callout-pitfall\" style=\"margin:14px 0;\">\n                <div class=\"callout-header\"><span>⚠️ Cạm bẫy hiệu năng kinh điển:</span></div>\n                <div class=\"callout-body\">\n                  <p>Khi bạn cần kiểm tra 100,000 mã đơn hàng xem có nằm trong danh sách đen hay không: nếu bạn lưu danh sách đen trong <code>list</code>, phép kiểm tra <code>order_id in blacklist</code> sẽ tốn $O(n \times m)$ với hàng tỷ phép so sánh làm đơ máy tính! Chuyển danh sách đen sang <code>set</code> biến độ phức tạp thành $O(n \times 1)$, hoàn thành trong chớp mắt.</p>\n                </div>\n              </div>\n            "
          },
          {
            "id": "sec-row-vs-column-models",
            "title": "3. List of Dicts (Hướng Hàng) vs Dict of Lists (Hướng Cột)",
            "badge": "Mô hình Cấu trúc",
            "content": "\n              <p>Khi làm việc với dữ liệu thực tế tại TechMart, bạn sẽ liên tục chuyển đổi giữa hai mô hình tổ chức dữ liệu:</p>\n              <ul>\n                <li><strong>List of Dicts (Dữ liệu hướng hàng - Row-oriented):</strong> Là định dạng tự nhiên của các API REST, tệp JSON và phản hồi từ CSDL NoSQL (MongoDB). Mỗi phần tử là một dictionary chứa đầy đủ thông tin của 1 đơn hàng. Nhược điểm: Tốn RAM khủng khiếp vì chuỗi tên cột (keys) bị lặp lại hàng triệu lần.</li>\n                <li><strong>Dict of Lists (Dữ liệu hướng cột - Column-oriented):</strong> Là tiền thân trực tiếp của cấu trúc Pandas DataFrame. Mỗi khóa là tên cột duy nhất, giá trị là mảng các phần tử của cột đó. Ưu điểm: Tiết kiệm RAM vượt trội và cực kỳ tối ưu cho các phép tính thống kê theo cột (tính tổng doanh thu, tính đơn giá trung bình).</li>\n              </ul>\n            ",
            "codeExamples": [
              {
                "title": "Kỹ thuật chuyển đổi hiệu năng cao từ List of Dicts sang Dict of Lists bằng Python thuần",
                "lang": "Python",
                "code": "# Dữ liệu nhận từ REST API TechMart (List of Dicts - Hướng hàng)\napi_payload = [\n    {\"product\": \"Laptop Dell XPS 13\", \"category\": \"Máy tính\", \"stock\": 15, \"price\": 28000000},\n    {\"product\": \"iPhone 15 Pro Max\", \"category\": \"Điện thoại\", \"stock\": 40, \"price\": 32000000},\n    {\"product\": \"Bàn phím cơ Keychron\", \"category\": \"Phụ kiện\", \"stock\": 120, \"price\": 1850000},\n    {\"product\": \"Chuột Logitech MX Master\", \"category\": \"Phụ kiện\", \"stock\": 85, \"price\": 2200000},\n]\n\n# Chuyển đổi sang Dict of Lists (Hướng cột) bằng Dict Comprehension\ncolumns_data = {\n    col: [record[col] for record in api_payload]\n    for col in api_payload[0].keys()\n}\n\nprint(\"=== DỮ LIỆU ĐÃ CHUYỂN SANG HƯỚNG CỘT (TIỀN THÂN DATAFRAME) ===\")\nfor col_name, values in columns_data.items():\n    print(f\"Cột '{col_name}': {values}\")\n\n# Thao tác tính toán trên cột diễn ra tức thì:\ntotal_inventory_val = sum(s * p for s, p in zip(columns_data[\"stock\"], columns_data[\"price\"]))\nprint(f\"\\nTổng giá trị tồn kho toàn hệ thống: {total_inventory_val:,} VNĐ\")\n\n# Trích xuất danh mục duy nhất bằng Set (Độ phức tạp O(n)):\nunique_categories = set(columns_data[\"category\"])\nprint(f\"Các ngành hàng độc lập ({len(unique_categories)}): {unique_categories}\")",
                "output": "=== DỮ LIỆU ĐÃ CHUYỂN SANG HƯỚNG CỘT (TIỀN THÂN DATAFRAME) ===\nCột 'product': ['Laptop Dell XPS 13', 'iPhone 15 Pro Max', 'Bàn phím cơ Keychron', 'Chuột Logitech MX Master']\nCột 'category': ['Máy tính', 'Điện thoại', 'Phụ kiện', 'Phụ kiện']\nCột 'stock': [15, 40, 120, 85]\nCột 'price': [28000000, 32000000, 1850000, 2200000]\n\nTổng giá trị tồn kho toàn hệ thống: 2,109,000,000 VNĐ\nCác ngành hàng độc lập (3): {'Điện thoại', 'Phụ kiện', 'Máy tính'}",
                "annotations": [
                  {
                    "line": 9,
                    "text": "Dict comprehension lặp qua từng tên cột ở dòng đầu tiên để gom toàn bộ dữ liệu cột."
                  },
                  {
                    "line": 19,
                    "text": "Hàm zip() ghép cặp 2 cột số để tính tích vector vô hướng cực kỳ thanh thoát."
                  },
                  {
                    "line": 23,
                    "text": "set() khử trùng lặp các danh mục trùng nhau với độ phức tạp O(n)."
                  }
                ],
                "explanation": "Cấu trúc Dict of Lists gom các giá trị cùng kiểu dữ liệu vào một mảng liên tục, giúp loại bỏ hoàn toàn chi phí lưu trữ chuỗi tên cột trùng lặp và là nền tảng trực tiếp để chuyển đổi thành Pandas DataFrame sau này."
              }
            ]
          },
          {
            "id": "sec-data-structures-references",
            "title": "4. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n              <ul>\n                <li><strong>Python Documentation.</strong> <em>Data Model — Objects, values and types.</em> <a href=\"https://docs.python.org/3/reference/datamodel.html\" target=\"_blank\" rel=\"noopener\">https://docs.python.org/3/reference/datamodel.html</a></li>\n                <li><strong>Python Software Foundation Wiki.</strong> <em>TimeComplexity — Cost of operations on standard types.</em> <a href=\"https://wiki.python.org/moin/TimeComplexity\" target=\"_blank\" rel=\"noopener\">https://wiki.python.org/moin/TimeComplexity</a></li>\n                <li><strong>Hettinger, R. (2017).</strong> <em>Modern Python Dictionaries: A confluence of a dozen great ideas.</em> PyCon US 2017 Keynote.</li>\n              </ul>\n            "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Ngộ nhận toán tử `==` và toán tử `is`",
              "content": "`a == b` chỉ chứng minh nội dung bằng nhau; không có nghĩa là chúng nằm chung ô nhớ. Tuyệt đối không dùng `&lt;code&gt;if x is 10:&lt;/code&gt;` (sai chuẩn PEP 8), chỉ dùng `is` khi so sánh với `&lt;code&gt;None&lt;/code&gt;` (ví dụ: `if val is &lt;code&gt;None&lt;/code&gt;:`)."
            },
            {
              "title": "Tìm kiếm phần tử trong List với dữ liệu lớn",
              "content": "Lệnh `if item in big_list:` duyệt tuần tự $O(n)$. Nếu lặp $m$ lần, thuật toán sẽ thành $O(m \times n)$ khiến hệ thống xử lý giao dịch bị nghẽn nghiêm trọng. Hãy luôn ép sang `set` trước khi tra cứu!"
            }
          ],
          "tips": [
            {
              "title": "Dùng Tuple làm khóa trong Dictionary",
              "content": "Do Tuple là đối tượng bất biến (Immutable), nó có thể tính được mã băm (Hashable). Bạn có thể dùng `(branch, category)` làm khóa phức hợp trong dict để gom nhóm dữ liệu TechMart siêu nhanh."
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Kiểm tra tính đồng nhất ô nhớ và toán tử so sánh",
            "problem": "Cho đoạn code sau:\n```python\nx = [1, 2, 3]\ny = [1, 2, 3]\nz = x\n```\nHãy dự đoán kết quả của: `x == y`, `x is y`, `x == z`, `x is z`. Giải thích dựa trên mô hình Name-Object Binding.",
            "hint": "y là một list mới được cấp phát ô nhớ riêng; z là nhãn gán trực tiếp vào x.",
            "solutionCode": "x = [1, 2, 3]\ny = [1, 2, 3]\nz = x\n\nprint(\"x == y:\", x == y) # True (Nội dung bằng nhau)\nprint(\"x is y:\", x is y) # False (Hai ô nhớ khác nhau)\nprint(\"x == z:\", x == z) # True (Nội dung bằng nhau)\nprint(\"x is z:\", x is z) # True (Chung một ô nhớ duy nhất)",
            "solutionOutput": "x == y: True\nx is y: False\nx == z: True\nx is z: True",
            "explanation": "Phép khởi tạo [1, 2, 3] thứ hai cấp phát một đối tượng mới trên Heap nên x is y là False. Trong khi đó, z = x chỉ tạo thêm một nhãn tên trỏ vào cùng đối tượng của x nên x is z là True."
          },
          {
            "level": "Vừa",
            "title": "Chuyển đổi ngược: Từ Dict of Lists sang List of Dicts",
            "problem": "Viết hàm `col_to_row(data_cols)` nhận vào một từ điển dạng Dict of Lists và chuyển đổi thành danh sách các dictionary (List of Dicts) để gửi sang hệ thống API đối tác.",
            "hint": "Dùng `zip(*data_cols.values())` kết hợp với `data_cols.keys()`.",
            "solutionCode": "def col_to_row(data_cols):\n    keys = list(data_cols.keys())\n    row_values = zip(*data_cols.values())\n    return [dict(zip(keys, row)) for row in row_values]\n\ncols = {\n    \"sku\": [\"A1\", \"B2\"],\n    \"price\": [150000, 300000]\n}\nrows = col_to_row(cols)\nprint(\"Dữ liệu sau khi chuyển sang hướng hàng:\")\nprint(rows)",
            "solutionOutput": "Dữ liệu sau khi chuyển sang hướng hàng:\n[{'sku': 'A1', 'price': 150000}, {'sku': 'B2', 'price': 300000}]",
            "explanation": "Sử dụng toán tử mở gói zip(*values) giúp hoán vị ma trận (Transpose) từ cột thành hàng cực kỳ thanh lịch và tối ưu bộ nhớ."
          },
          {
            "level": "Nâng cao",
            "title": "Tối ưu hóa thuật toán đối soát giao dịch từ O(n^2) xuống O(n)",
            "problem": "Tại TechMart, bạn cần kiểm tra 50,000 mã đơn hàng mới (`incoming_orders`) xem có trùng với bất kỳ đơn nào trong 100,000 đơn hàng cũ của ngày hôm trước (`processed_orders`). Một thực tập sinh viết vòng lặp lồng:\n```python\ndupes = [o for o in incoming if o in processed]\n```\nHãy giải thích vì sao đoạn code trên chạy mất hơn 10 phút, và viết lại thuật toán tối ưu chạy trong dưới 0.1 giây bằng cách áp dụng cấu trúc dữ liệu thích hợp.",
            "hint": "Chuyển `processed` từ list sang `set` để biến phép kiểm tra `in` từ O(n) thành O(1).",
            "solutionCode": "import time\n\n# Giả lập dữ liệu lớn\nprocessed_list = [f\"HD_{i}\" for i in range(100000)]\nincoming_list = [f\"HD_{i}\" for i in range(95000, 105000)] # 5000 đơn trùng\n\nstart_time = time.perf_counter()\n# TỐI ƯU HÓA: Ép danh sách cũ sang Set với bảng băm O(1)\nprocessed_set = set(processed_list)\n# Phép giao tập hợp hoặc kiểm tra 'in' trên set diễn ra tức thì:\nfast_dupes = [o for o in incoming_list if o in processed_set]\nduration = time.perf_counter() - start_time\n\nprint(f\"Số đơn trùng phát hiện: {len(fast_dupes)}\")\nprint(f\"Thời gian thực thi tối ưu: {duration:.4f} giây\")",
            "solutionOutput": "Số đơn trùng phát hiện: 5000\nThời gian thực thi tối ưu: 0.0052 giây",
            "explanation": "Vòng lặp cũ có độ phức tạp O(n x m) = 50,000 x 100,000 = 5 tỷ phép so sánh. Khi chuyển sang Set, phép tra cứu băm chỉ tốn O(1), tổng thời gian thuật toán giảm xuống còn O(n + m) = 150,000 thao tác, tăng tốc hơn 10,000 lần!"
          }
        ],
        "quiz": [
          {
            "question": "Trong mô hình bộ nhớ CPython, điều gì thực sự xảy ra khi bạn gõ lệnh `b = a` với `a = [1, 2, 3]`?",
            "options": [
              "CPython sao chép toàn bộ danh sách [1, 2, 3] sang một vùng nhớ mới và gán cho b.",
              "CPython chỉ gắn thêm nhãn tên \"b\" vào cùng đối tượng danh sách mà \"a\" đang trỏ tới trên Heap, không có bản sao nào được tạo ra.",
              "CPython khóa biến a lại và cấm sửa đổi.",
              "CPython chuyển đổi kiểu dữ liệu của a sang chuỗi."
            ],
            "correctIndex": 1,
            "explanation": "Biến trong Python là con trỏ tham chiếu (Name-Object Binding). Lệnh gán b = a chỉ gán thêm một nhãn tên trỏ vào cùng đối tượng Heap."
          },
          {
            "question": "Độ phức tạp thời gian trung bình (Average Time Complexity) của thao tác kiểm tra phần tử tồn tại `x in my_collection` đối với `set` và `list` lần lượt là:",
            "options": [
              "Set là O(n), List là O(1)",
              "Set là O(1), List là O(n)",
              "Cả hai đều là O(1)",
              "Cả hai đều là O(n)"
            ],
            "correctIndex": 1,
            "explanation": "Set sử dụng cấu trúc bảng băm (Hash Table) với chi phí tra cứu O(1), trong khi List là mảng tuần tự bắt buộc phải quét từng phần tử với chi phí O(n)."
          },
          {
            "question": "Tại sao mô hình tổ chức dữ liệu Dict of Lists (hướng cột) lại tiết kiệm RAM vượt trội so với List of Dicts (hướng hàng) khi lưu trữ hàng triệu bản ghi?",
            "options": [
              "Vì Dict of Lists tự động nén dữ liệu dưới dạng tệp zip.",
              "Vì trong List of Dicts, các chuỗi tên cột (keys) bị tạo đi tạo lại hàng triệu lần trong bộ nhớ ở từng dòng, trong khi Dict of Lists chỉ lưu tên cột đúng một lần duy nhất.",
              "Vì Dict of Lists không cho phép chứa giá trị số thực.",
              "Vì List of Dicts bị hệ điều hành giới hạn kích thước."
            ],
            "correctIndex": 1,
            "explanation": "Dict of Lists chỉ lưu trữ tên cột 1 lần duy nhất ở cấp độ khóa của từ điển, còn List of Dicts nhân bản chuỗi tên khóa ở từng phần tử hàng triệu lần, gây lãng phí hàng trăm megabyte RAM."
          }
        ],
        "summary": [
          "Biến trong Python là nhãn dán con trỏ (Name-Object Binding) trỏ vào vùng nhớ Heap, không phải chiếc hộp chứa dữ liệu.",
          "Phân biệt triệt để toán tử so sánh giá trị `==` vs toán tử so sánh ô nhớ `is` (dùng hàm id() để kiểm chứng).",
          "Nắm vững bảng độ phức tạp Big-O: Tra cứu Set/Dict là O(1), tra cứu List là O(n). Luôn dùng Set khi cần đối soát tồn tại.",
          "Dict of Lists (hướng cột) tiết kiệm bộ nhớ và là tiền thân trực tiếp của Pandas DataFrame."
        ],
        "selfReviewQuestions": [
          "1. Vẽ sơ đồ mô tả những gì diễn ra trong bộ nhớ Heap và Namespace khi thực hiện hai câu lệnh: `a = [10, 20]` và `b = a`.",
          "2. Giải thích vì sao phép toán `x in data_set` chạy nhanh hơn hàng nghìn lần so với `x in data_list` khi tập dữ liệu có 1 triệu phần tử.",
          "3. Khi nào một đối tượng trong Python có thể được dùng làm khóa (Key) trong Dictionary? Vì sao List không thể làm khóa nhưng Tuple thì được?"
        ],
        "reflectionQuestion": "Hãy giải thích bằng lời của bạn: Tại sao việc hiểu rõ mô hình Name-Object Binding của Python ở bài này lại là điều kiện tiên quyết để không bao giờ bị dính cạm bẫy View vs Copy cực kỳ nguy hiểm trong NumPy và Pandas ở các module sau?",
        "reflectionHint": "Hãy liên hệ: Khi bạn cắt lát (slice) một mảng hay DataFrame, liệu bạn đang tạo ra một vùng nhớ độc lập hay chỉ đang tạo ra một \"chiếc nhãn\" trỏ chung vào vùng đệm C-buffer bên dưới?",
        "nextLessonPreview": "Ở bài tiếp theo (2.2), chúng ta sẽ áp dụng phương pháp sư phạm PRIMM để làm chủ Comprehension, viết Pure Function bảo vệ dữ liệu thô và thao tác tệp đa nền tảng chuẩn mực với pathlib!"
      },
      {
        "id": "pd-02-02",
        "number": "2.2",
        "title": "Comprehension, Pure Functions & I/O File Chuẩn Mực",
        "subtitle": "Phương pháp sư phạm PRIMM, chuẩn mực PEP 8/20/257, đọc ghi CSV chuẩn RFC 4180 và xử lý đường dẫn an toàn bằng pathlib.Path",
        "level": "Trung cấp",
        "duration": "40 phút",
        "objectives": [
          "Vận dụng phương pháp sư phạm PRIMM (Predict - Run - Investigate - Modify - Make) để thành thạo List, Dict và Set Comprehension.",
          "Áp dụng các chuẩn mực kỹ thuật chuyên nghiệp: Quy chuẩn phong cách PEP 8, triết lý thiết kế PEP 20 (Zen of Python) và chuẩn Docstring PEP 257.",
          "Thiết kế các hàm xử lý dữ liệu thuần khiết (Pure Functions): Không sinh hiệu ứng phụ (No Side-effects) và có tính minh bạch tham chiếu (Referential Transparency).",
          "Thao tác tệp tin đa nền tảng (Windows/Linux) chuẩn mực bằng `pathlib.Path` và đọc ghi dữ liệu an toàn với `csv.DictReader` tuân thủ RFC 4180."
        ],
        "intuition": {
          "title": "Chiếc phễu lọc khoáng chất & Cây thước đo đa năng chuẩn ISO",
          "metaphor": "Comprehension trong Python giống như chiếc phễu lọc nước thông minh: dòng nước thô chảy vào, màng lọc (mệnh đề if) giữ lại cặn bẩn, và khoang làm giàu (biểu thức biến đổi) bổ sung khoáng chất cho từng giọt nước tinh khiết chảy ra chiếc bình mới. Còn pathlib.Path giống như cây thước đo chuẩn quốc tế: nó tự động hiểu bạn đang ở Windows (dùng dấu gạch chéo ngược \\) hay Linux (dùng dấu gạch chéo xuôi /), giúp đường ống dữ liệu của bạn không bao giờ bị vỡ khi đem lên máy chủ đám mây!",
          "boundary": "Comprehension rất cô đọng và nhanh, nhưng nếu lạm dụng lồng nhau quá 2 tầng (Nested Comprehension) sẽ phá vỡ tính rõ ràng, vi phạm trực tiếp nguyên tắc \"Readability counts\" của PEP 20.",
          "visualHtml": "\n            <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n              <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:6px;\">CẤU TRÚC PHỄU LỌC COMPREHENSION TRONG PYTHON</div>\n              <div style=\"display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap;padding:8px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;\">\n                <span style=\"color:#10b981;\">[ expr(item) </span>\n                <span style=\"color:var(--accent-primary);\">for item in iterable </span>\n                <span style=\"color:#ef4444;\">if condition(item) ]</span>\n              </div>\n              <div style=\"display:flex;justify-content:space-between;font-size:0.72rem;color:var(--text-muted);margin-top:4px;\">\n                <span>1. Biến đổi dữ liệu</span>\n                <span>2. Duyệt nguồn dữ liệu</span>\n                <span>3. Màng lọc điều kiện</span>\n              </div>\n            </div>\n          "
        },
        "sections": [
          {
            "id": "sec-primm-comprehensions",
            "title": "1. Phương Pháp Sư Phạm PRIMM & Kỹ Thuật Comprehension",
            "badge": "Phương pháp Sư phạm",
            "content": "\n              <p>Phương pháp <strong>PRIMM (Predict – Run – Investigate – Modify – Make)</strong> do Giáo sư Sue Sentance phát triển: đây là tiến trình sư phạm được kiểm chứng giúp người học lập trình tiếp cận khái niệm mới mà không bị quá tải nhận thức:</p>\n              <ul>\n                <li><strong>Predict (Dự đoán):</strong> Đọc đoạn code mẫu và dự đoán output trước khi bấm chạy.</li>\n                <li><strong>Run (Chạy):</strong> Chạy code thực tế và đối chiếu kết quả dự đoán.</li>\n                <li><strong>Investigate (Điều tra):</strong> Phân tích từng dòng lệnh để hiểu tại sao kết quả lại như vậy.</li>\n                <li><strong>Modify (Chỉnh sửa):</strong> Đổi một điều kiện nhỏ để quan sát hành vi mới.</li>\n                <li><strong>Make (Tạo mới):</strong> Tự tay viết một chức năng mới từ đầu.</li>\n              </ul>\n\n              <h4>Comprehension: Nhanh hơn và Sạch hơn</h4>\n              <p>List/Dict Comprehension không chỉ là cú pháp làm đẹp (Syntactic Sugar). Bên dưới máy ảo CPython, Comprehension được thực thi ở cấp độ C bytecode (chỉ thị <code>LIST_APPEND</code> / <code>MAP_ADD</code>) mà không cần tốn chi phí gọi hàm <code>list.append()</code> thông qua bảng phương thức đối tượng của Python ở mỗi vòng lặp.</p>\n            ",
            "codeExamples": [
              {
                "title": "Áp dụng PRIMM: Khám phá Dict và Set Comprehension trên dữ liệu TechMart",
                "lang": "Python",
                "code": "# BƯỚC 1 (PREDICT): Hãy dự đoán output của đoạn code dưới đây trước khi nhìn kết quả!\ncatalog = [\n    (\"SKU-01\", \"Chuột không dây\", \"Phụ kiện\", 250000),\n    (\"SKU-02\", \"Bàn phím cơ\", \"Phụ kiện\", 1200000),\n    (\"SKU-03\", \"Laptop Dell\", \"Máy tính\", 24000000),\n    (\"SKU-04\", \"Tai nghe Sony\", \"Âm thanh\", 3500000),\n]\n\n# Tạo Bảng Tra Cứu Nhanh (Lookup Table) bằng Dict Comprehension\n# Khóa là SKU, Giá trị là tuple chứa (Tên, Giá sau thuế VAT 10%)\nprice_lookup = {\n    sku: (name, int(price * 1.1))\n    for sku, name, cat, price in catalog\n    if cat != \"Máy tính\" # Loại trừ ngành hàng máy tính\n}\n\n# Tạo Tập Hợp Ngành Hàng Hợp Lệ bằng Set Comprehension\nvalid_categories = {cat for _, _, cat, _ in catalog}\n\nprint(\"=== KẾT QUẢ THỰC THI (RUN & INVESTIGATE) ===\")\nprint(\"Bảng tra cứu giá có thuế:\", price_lookup)\nprint(\"Các ngành hàng hiện có:\", valid_categories)",
                "output": "=== KẾT QUẢ THỰC THI (RUN & INVESTIGATE) ===\nBảng tra cứu giá có thuế: {'SKU-01': ('Chuột không dây', 275000), 'SKU-02': ('Bàn phím cơ', 1320000), 'SKU-04': ('Tai nghe Sony', 3850000)}\nCác ngành hàng hiện có: {'Máy tính', 'Âm thanh', 'Phụ kiện'}",
                "annotations": [
                  {
                    "line": 11,
                    "text": "Mở gói (unpacking) 4 phần tử của tuple trực tiếp trong mệnh đề for."
                  },
                  {
                    "line": 14,
                    "text": "Mệnh đề if lọc bỏ SKU-03 trước khi đưa vào bảng tra cứu."
                  },
                  {
                    "line": 18,
                    "text": "Dấu gạch dưới (_) biểu thị các trường không quan tâm, chỉ trích xuất cat."
                  }
                ],
                "explanation": "Dict Comprehension tạo ra một bảng băm tra cứu cực kỳ tinh gọn. Phép tra cứu price_lookup[\"SKU-01\"] sau đó sẽ diễn ra với độ phức tạp O(1) tức thì."
              }
            ]
          },
          {
            "id": "sec-pep-standards",
            "title": "2. Chuẩn Mực Kỹ Thuật: PEP 8, PEP 20 & PEP 257",
            "badge": "Tiêu chuẩn Công nghiệp",
            "content": "\n              <p>Mã nguồn kỹ thuật dữ liệu chuyên nghiệp tại các tập đoàn lớn bắt buộc phải tuân thủ hệ thống tiêu chuẩn <strong>PEP (Python Enhancement Proposals)</strong>:</p>\n\n              <div class=\"table-responsive\">\n                <table style=\"width:100%;font-size:0.9rem;border-collapse:collapse;\">\n                  <thead>\n                    <tr style=\"background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);\">\n                      <th style=\"padding:10px;text-align:left;\">Tiêu chuẩn PEP</th>\n                      <th style=\"padding:10px;text-align:left;\">Tên tiêu chuẩn</th>\n                      <th style=\"padding:10px;text-align:left;\">Quy định cốt lõi cần nhớ</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>PEP 8</strong></td>\n                      <td>Style Guide for Python Code</td>\n                      <td>Thụt lề 4 dấu cách (spaces), không dùng tab; dòng code tối đa 79–88 ký tự; tên biến/hàm dùng <code>snake_case</code>, tên lớp dùng <code>PascalCase</code>; đặt khoảng trắng quanh toán tử nhị phân.</td>\n                    </tr>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>PEP 20</strong></td>\n                      <td>The Zen of Python</td>\n                      <td><em>\"Explicit is better than implicit\"</em> (Tường minh tốt hơn ngầm định); <em>\"Simple is better than complex\"</em> (Đơn giản tốt hơn phức tạp); <em>\"Readability counts\"</em> (Khả năng đọc hiểu là trên hết).</td>\n                    </tr>\n                    <tr>\n                      <td style=\"padding:10px;\"><strong>PEP 257</strong></td>\n                      <td>Docstring Conventions</td>\n                      <td>Mỗi module, hàm và lớp phải có chuỗi tài liệu giải thích đặt trong dấu ba ngoặc kép <code>\"\"\"...\"\"\"</code>. Dòng đầu tóm tắt ngắn gọn mục đích, theo sau là đặc tả tham số (Args), giá trị trả về (Returns) và ngoại lệ (Raises).</td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n            "
          },
          {
            "id": "sec-file-io-pathlib",
            "title": "3. I/O File Chuẩn Mực: `csv.DictReader` (RFC 4180) & `pathlib.Path`",
            "badge": "Kỹ nghệ I/O",
            "content": "\n              <p>Trong thực tế, 90% lỗi đổ vỡ đường ống dữ liệu khi đưa lên máy chủ Linux bắt nguồn từ hai thói quen xấu:</p>\n              <ol>\n                <li><strong>Cắt chuỗi CSV thủ công bằng <code>line.split(',')</code>:</strong> Vi phạm trực tiếp đặc tả kỹ thuật <strong>RFC 4180</strong>. Khi tên sản phẩm chứa dấu phẩy nằm trong ngoặc kép (ví dụ: <code>\"Chuột không dây, màu đen\"</code>), <code>split(',')</code> sẽ cắt đứt chuỗi và làm lệch toàn bộ các cột phía sau! Luôn luôn dùng module chuẩn <code>csv.DictReader</code>.</li>\n                <li><strong>Nối chuỗi đường dẫn tệp thủ công:</strong> Viết <code>\"data/\" + \"orders.csv\"</code> sẽ gây lỗi trên môi trường Windows hoặc ngược lại. Chuẩn hiện đại bắt buộc sử dụng hướng đối tượng <code>pathlib.Path</code> với toán tử chia <code>/</code>.</li>\n              </ol>\n            ",
            "codeExamples": [
              {
                "title": "Đọc và lọc tệp CSV phức tạp tuân thủ RFC 4180 bằng csv.DictReader và pathlib",
                "lang": "Python",
                "code": "import csv\nimport io\nfrom pathlib import Path\n\n# Giả lập nội dung tệp CSV giao dịch chứa dấu phẩy trong trường dữ liệu (Chuẩn RFC 4180)\nraw_csv_content = \"\"\"order_id,customer_name,item_description,amount,status\nHD101,Nguyen Van A,\"Chuột không dây, màu đen\",450000,COMPLETED\nHD102,Tran Thi B,\"Bàn phím cơ, Blue switch, Led RGB\",1200000,COMPLETED\nHD103,Le Van C,\"Tai nghe Bluetooth\",N/A,CANCELLED\nHD104,Pham Thi D,\"Dây cáp sạc, Type-C 1m\",180000,COMPLETED\"\"\"\n\n# Thiết lập đường dẫn tệp độc lập nền tảng bằng pathlib.Path\ndata_dir = Path(\"data\") / \"raw\"\nprint(f\"Đường dẫn ảo an toàn đa nền tảng: {data_dir / 'orders.csv'}\")\n\n# Sử dụng csv.DictReader để phân tích cú pháp an toàn\nreader = csv.DictReader(io.StringIO(raw_csv_content.strip()))\nclean_orders = []\n\nfor row_idx, row in enumerate(reader, start=1):\n    if row[\"status\"] == \"COMPLETED\":\n        try:\n            amount_clean = int(row[\"amount\"])\n            clean_orders.append({\n                \"id\": row[\"order_id\"],\n                \"customer\": row[\"customer_name\"],\n                \"item\": row[\"item_description\"],\n                \"amount\": amount_clean\n            })\n        except ValueError:\n            print(f\"Cảnh báo: Dòng {row_idx} có giá trị amount không hợp lệ!\")\n\nprint(f\"\\nĐã đọc thành công {len(clean_orders)} đơn hàng hoàn tất:\")\nfor o in clean_orders:\n    print(f\" -> {o['id']} | {o['customer']:12} | {o['item']:35} | {o['amount']:,} VNĐ\")",
                "output": "Đường dẫn ảo an toàn đa nền tảng: data\\raw\\orders.csv\n\nĐã đọc thành công 3 đơn hàng hoàn tất:\n -> HD101 | Nguyen Van A  | Chuột không dây, màu đen           | 450,000 VNĐ\n -> HD102 | Tran Thi B   | Bàn phím cơ, Blue switch, Led RGB | 1,200,000 VNĐ\n -> HD104 | Pham Thi D   | Dây cáp sạc, Type-C 1m            | 180,000 VNĐ",
                "annotations": [
                  {
                    "line": 12,
                    "text": "Toán tử / của pathlib.Path tự động dùng dấu gạch chéo ngược trên Windows và gạch chéo xuôi trên Linux."
                  },
                  {
                    "line": 16,
                    "text": "csv.DictReader tự động hiểu dấu ngoặc kép bọc chuỗi, không bị tách nhầm dấu phẩy bên trong!"
                  },
                  {
                    "line": 20,
                    "text": "Mọi giá trị đọc từ CSV luôn là chuỗi ký tự (str), bắt buộc phải chủ động ép kiểu int/float."
                  }
                ],
                "explanation": "Đoạn code minh họa việc tuân thủ RFC 4180: các mặt hàng chứa nhiều dấu phẩy được giữ nguyên vẹn 100%, bảo vệ cấu trúc bảng không bị lệch cột sang trường amount."
              }
            ]
          },
          {
            "id": "sec-io-pep-references",
            "title": "4. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n              <ul>\n                <li><strong>Van Rossum, G., Warsaw, B., &amp; Coghlan, N. (2001).</strong> <em>PEP 8 — Style Guide for Python Code.</em> <a href=\"https://peps.python.org/pep-0008/\" target=\"_blank\" rel=\"noopener\">https://peps.python.org/pep-0008/</a></li>\n                <li><strong>Peters, T. (2004).</strong> <em>PEP 20 — The Zen of Python.</em> <a href=\"https://peps.python.org/pep-0020/\" target=\"_blank\" rel=\"noopener\">https://peps.python.org/pep-0020/</a></li>\n                <li><strong>Goodger, D., &amp; Van Rossum, G. (2001).</strong> <em>PEP 257 — Docstring Conventions.</em> <a href=\"https://peps.python.org/pep-0257/\" target=\"_blank\" rel=\"noopener\">https://peps.python.org/pep-0257/</a></li>\n                <li><strong>IETF. (2005).</strong> <em>RFC 4180 — Common Format and MIME Type for Comma-Separated Values (CSV) Files.</em></li>\n              </ul>\n            "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Lạm dụng Comprehension lồng nhau quá mức (Nested Comprehension)",
              "content": "Cố ép 3-4 vòng for lồng nhau vào một dòng comprehension để \"thể hiện trình độ\" là vi phạm nghiêm trọng nguyên tắc PEP 20. Code khó đọc đồng nghĩa với việc khó bảo trì và dễ sinh lỗi ngầm."
            },
            {
              "title": "Tự cắt chuỗi CSV bằng split(\",\")",
              "content": "Không bao giờ viết `line.split(\",\")` trong dự án sản xuất. Chỉ cần một trường tên khách hàng hoặc địa chỉ chứa dấu phẩy (như: \"Số 12, Phố Huế\"), toàn bộ dữ liệu phía sau sẽ bị nhảy sai cột."
            }
          ],
          "tips": [
            {
              "title": "Sử dụng Pure Functions trong đường ống biến đổi",
              "content": "Một hàm biến đổi dữ liệu tốt luôn nhận dữ liệu đầu vào và trả về một đối tượng mới, tuyệt đối không chỉnh sửa (mutate) trực tiếp danh sách truyền vào hàm."
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Áp dụng PRIMM: Dự đoán và sửa đổi Dict Comprehension",
            "problem": "Cho danh sách sản phẩm: `products = [(\"P1\", 100), (\"P2\", 250), (\"P3\", 50)]`. Hãy dùng Dict Comprehension để tạo từ điển lọc các sản phẩm có giá trên 80 và tăng giá thêm 10%.",
            "hint": "Cú pháp: `{p: price * 1.1 for p, price in products if price > 80}`.",
            "solutionCode": "products = [(\"P1\", 100), (\"P2\", 250), (\"P3\", 50)]\nupdated_catalog = {\n    p: int(price * 1.1)\n    for p, price in products\n    if price > 80\n}\nprint(updated_catalog)",
            "solutionOutput": "{'P1': 110, 'P2': 275}",
            "explanation": "Dict comprehension vừa lọc điều kiện giá > 80 vừa áp dụng công thức tính giá mới trong cùng một biểu thức tinh gọn."
          },
          {
            "level": "Vừa",
            "title": "Đọc tệp CSV và xử lý dấu phân cách tùy biến",
            "problem": "Nhiều hệ thống ERP tại châu Âu xuất tệp CSV sử dụng dấu chấm phẩy (`;`) làm phân cách và dấu phẩy (`,`) làm dấu thập phân: `\"HD01;12,5\"`. Hãy viết hàm sử dụng `csv.reader` với tham số `delimiter=';'` để đọc đúng cấu trúc tệp này.",
            "hint": "Truyền `delimiter=\";\"` vào hàm khởi tạo của csv.reader.",
            "solutionCode": "import csv\nimport io\n\nraw_data = \"\"\"order_id;discount_rate;status\nHD01;12,5;ACTIVE\nHD02;5,0;ACTIVE\"\"\"\n\nreader = csv.DictReader(io.StringIO(raw_data.strip()), delimiter=\";\")\nparsed = []\nfor row in reader:\n    # Thay thế dấu phẩy thập phân thành dấu chấm để ép kiểu float\n    rate = float(row[\"discount_rate\"].replace(\",\", \".\"))\n    parsed.append((row[\"order_id\"], rate))\n\nprint(\"Kết quả đọc CSV delimiter tùy biến:\", parsed)",
            "solutionOutput": "Kết quả đọc CSV delimiter tùy biến: [('HD01', 12.5), ('HD02', 5.0)]",
            "explanation": "Tham số delimiter của module csv cho phép xử lý linh hoạt mọi biến thể thực tế của tệp CSV theo chuẩn RFC 4180."
          },
          {
            "level": "Nâng cao",
            "title": "Viết hàm biến đổi dữ liệu thuần khiết (Pure Function) chuẩn PEP 257",
            "problem": "Viết hàm `apply_discount_pipeline(orders, discount_pct)` tuân thủ đầy đủ chuẩn Docstring PEP 257. Hàm nhận vào danh sách các dictionary đơn hàng và tỷ lệ chiết khấu (0.0 đến 1.0). Yêu cầu:\n1. Hàm là Pure Function: Không làm biến đổi danh sách `orders` truyền vào.\n2. Trả về danh sách mới với trường `final_price` đã chiết khấu.\n3. Có kiểm tra giá trị tham số (nếu discount_pct < 0 hoặc > 1 thì raise ValueError).",
            "hint": "Dùng list comprehension kết hợp với `dict(o, final_price=...)` hoặc `copy()`.",
            "solutionCode": "def apply_discount_pipeline(orders, discount_pct):\n    \"\"\"Áp dụng chiết khấu cho danh sách đơn hàng mà không làm biến đổi dữ liệu gốc.\n\n    Args:\n        orders (list of dict): Danh sách các bản ghi đơn hàng, mỗi bản ghi có khóa 'price'.\n        discount_pct (float): Tỷ lệ chiết khấu từ 0.0 đến 1.0.\n\n    Returns:\n        list of dict: Danh sách đơn hàng mới chứa thêm trường 'final_price'.\n\n    Raises:\n        ValueError: Nếu discount_pct nằm ngoài khoảng [0.0, 1.0].\n    \"\"\"\n    if not (0.0 <= discount_pct <= 1.0):\n        raise ValueError(f\"Tỷ lệ chiết khấu {discount_pct} không hợp lệ (phải từ 0.0 đến 1.0)!\")\n\n    # Tạo bản ghi mới độc lập (Pure Function)\n    return [\n        {**o, \"final_price\": int(o[\"price\"] * (1 - discount_pct))}\n        for o in orders\n    ]\n\nraw_orders = [{\"id\": \"T1\", \"price\": 100000}, {\"id\": \"T2\", \"price\": 200000}]\ndiscounted = apply_discount_pipeline(raw_orders, 0.15)\nprint(\"Dữ liệu gốc (Bất biến):\", raw_orders)\nprint(\"Dữ liệu sau chiết khấu:\", discounted)",
            "solutionOutput": "Dữ liệu gốc (Bất biến): [{'id': 'T1', 'price': 100000}, {'id': 'T2', 'price': 200000}]\nDữ liệu sau chiết khấu: [{'id': 'T1', 'price': 100000, 'final_price': 85000}, {'id': 'T2', 'price': 200000, 'final_price': 170000}]",
            "explanation": "Cú pháp {**o, \"final_price\": ...} tạo một bản sao dictionary mới chứa toàn bộ khóa cũ kèm khóa mới, bảo vệ tuyệt đối tính bất biến của dữ liệu gốc."
          }
        ],
        "quiz": [
          {
            "question": "Tại sao việc tự viết mã cắt chuỗi `line.split(\",\")` để đọc tệp CSV lại bị nghiêm cấm trong các hệ thống dữ liệu chuyên nghiệp?",
            "options": [
              "Vì hàm split() chạy chậm hơn module csv 100 lần.",
              "Vì khi trường dữ liệu chứa dấu phẩy nằm trong cặp ngoặc kép (như tên mặt hàng, địa chỉ), split(\",\") sẽ cắt vụn chuỗi và làm xô lệch toàn bộ các cột phía sau, vi phạm chuẩn RFC 4180.",
              "Vì hàm split() không hỗ trợ ngôn ngữ tiếng Việt.",
              "Vì Python không cho phép gọi split() trên file."
            ],
            "correctIndex": 1,
            "explanation": "Chuẩn RFC 4180 cho phép trường dữ liệu chứa dấu phẩy nếu được bọc trong dấu ngoặc kép. Hàm split(\",\") thông thường không hiểu ngữ nghĩa này và sẽ làm hỏng cấu trúc bảng."
          },
          {
            "question": "Theo triết lý PEP 20 (Zen of Python), phát biểu nào sau đây thể hiện đúng tinh thần khi viết Comprehension?",
            "options": [
              "Comprehension càng dài và càng lồng nhiều tầng thì càng chứng tỏ người viết có trình độ cao.",
              "\"Flat is better than nested\" và \"Readability counts\": Chỉ nên dùng Comprehension khi biểu thức ngắn gọn, dễ hiểu; nếu logic phức tạp thì nên viết vòng for tường minh.",
              "Luôn luôn thay thế tất cả vòng for trong chương trình bằng Comprehension.",
              "Comprehension chỉ dùng được với danh sách số nguyên."
            ],
            "correctIndex": 1,
            "explanation": "PEP 20 coi trọng tính đọc hiểu và sự đơn giản. Lạm dụng comprehension lồng nhau phức tạp sẽ làm giảm khả năng bảo trì mã nguồn."
          },
          {
            "question": "Thế nào là một Hàm thuần khiết (Pure Function) trong kỹ nghệ đường ống dữ liệu?",
            "options": [
              "Là hàm không có tham số truyền vào.",
              "Là hàm chạy không bao giờ sinh lỗi.",
              "Là hàm với cùng một đầu vào luôn trả về cùng một đầu ra và tuyệt đối không gây ra hiệu ứng phụ (Side-effects) như sửa đổi dữ liệu gốc truyền vào hay thay đổi biến toàn cục.",
              "Là hàm được viết bằng ngôn ngữ C."
            ],
            "correctIndex": 2,
            "explanation": "Hàm thuần khiết bảo đảm tính toàn vẹn dữ liệu: nó nhận dữ liệu thô, biến đổi và trả về dữ liệu mới mà không làm hoen ố (mutate) vùng nhớ ban đầu."
          }
        ],
        "summary": [
          "Áp dụng quy trình PRIMM để làm chủ Comprehension: Tối ưu tốc độ bytecode và viết code cô đọng.",
          "Tuân thủ nghiêm ngặt chuẩn mực PEP 8 (phong cách), PEP 20 (triết lý thiết kế) và PEP 257 (Docstring).",
          "Luôn dùng `csv.DictReader` để tuân thủ RFC 4180 và dùng `pathlib.Path` để thao tác đường dẫn an toàn đa nền tảng.",
          "Thiết kế các hàm xử lý dữ liệu theo chuẩn Pure Function để bảo vệ tính bất biến của dữ liệu thô."
        ],
        "selfReviewQuestions": [
          "1. Nêu 5 bước của phương pháp sư phạm PRIMM và giải thích tại sao bước Predict (Dự đoán) lại kích thích tư duy sâu?",
          "2. Trình bày cấu trúc một Docstring chuẩn theo PEP 257 gồm những thành phần bắt buộc nào?",
          "3. Tại sao toán tử chia `/` trong `pathlib.Path` lại an toàn hơn phép nối chuỗi dấu cộng `+` khi thao tác đường dẫn tệp?"
        ],
        "reflectionQuestion": "Hãy giải thích: Tại sao trong một nhóm kỹ sư dữ liệu lớn, việc áp dụng chuẩn mực PEP 8 và viết Docstring PEP 257 lại quan trọng hơn cả việc viết code \"thông minh nhưng bí hiểm\"?",
        "reflectionHint": "Nghĩ về vòng đời phần mềm: Code được đọc nhiều hơn gấp 10 lần so với lúc viết. Một đoạn code không ai hiểu được sẽ trở thành \"nợ kỹ thuật\" (technical debt) khổng lồ cho cả công ty.",
        "nextLessonPreview": "Ở bài tiếp theo (2.3), chúng ta sẽ khám phá bí mật sinh tử của quản lý bộ nhớ Python: Phân biệt Shallow Copy vs Deep Copy và cạm bẫy tham số mặc định khả biến (Mutable Default Argument)!"
      },
      {
        "id": "pd-02-03",
        "number": "2.3",
        "title": "Tính Khả Biến, Shallow vs Deep Copy & Cạm Bẫy Bộ Nhớ",
        "subtitle": "Bản chất Mutability vs Immutability, phân cấp sao chép trong bộ nhớ Heap, cạm bẫy tham số mặc định và bảo vệ Raw Data Immutability",
        "level": "Trung cấp",
        "duration": "40 phút",
        "objectives": [
          "Phân loại triệt để các kiểu dữ liệu cốt lõi thành Khả biến (Mutable: list, dict, set) và Bất biến (Immutable: int, float, str, tuple, frozenset).",
          "Phân biệt rõ ràng 3 cấp độ: Phép gán tham chiếu (`b = a`), Sao chép nông (`a.copy()`) và Sao chép sâu (`copy.deepcopy()`).",
          "Nhận diện và loại bỏ cạm bẫy tham số mặc định khả biến kinh điển (`def add_item(item, orders=[])`).",
          "Thiết lập nguyên tắc Dữ liệu thô bất biến (Raw Data Immutability) làm hàng rào bảo vệ đường ống dữ liệu sản xuất."
        ],
        "intuition": {
          "title": "Chiếc chìa khóa thứ hai vs Bản vẽ nhân bản toàn diện",
          "metaphor": "Hãy tưởng tượng cấu trúc dữ liệu của bạn là một Căn nhà hai tầng (bên trong có đồ nội thất như bàn ghế, tủ lạnh - đại diện cho các danh sách con lồng nhau):\\n1. Phép gán b = a: Bạn không xây nhà mới, mà chỉ đánh thêm chiếc chìa khóa thứ hai mở cùng căn nhà đó. Bất kỳ ai vào đập vỡ bàn ghế, cả hai bên đều thấy nhà hỏng!\\n2. Sao chép nông (Shallow Copy a.copy()): Bạn xây một căn nhà mới y hệt, nhưng lại dùng chung hệ thống điện nước và đồ đạc bên trong với nhà cũ! Nếu bạn sơn lại tường ngoài (thay đổi tầng 1), nhà cũ không bị ảnh hưởng; nhưng nếu bạn làm vỡ chiếc tủ lạnh chung (thay đổi danh sách con lồng nhau), nhà cũ cũng bị vỡ tủ lạnh!\\n3. Sao chép sâu (Deep Copy copy.deepcopy()): Bạn nhân bản một căn nhà hoàn toàn độc lập 100%, từ viên gạch ngoài tường đến từng chiếc đũa trong ngăn kéo. Bạn đập phá căn nhà mới tùy ý mà căn nhà gốc vẫn nguyên vẹn tuyệt đối!",
          "boundary": "Deep copy đảm bảo an toàn tuyệt đối nhưng tốn kém RAM và thời gian tính toán vì phải duyệt đệ quy toàn bộ cây đối tượng. Trong các đường ống xử lý bảng dữ liệu lớn hàng triệu dòng, kỹ thuật Copy-on-Write (sẽ học ở Module 4) là giải pháp tối ưu dung hòa giữa an toàn và tốc độ.",
          "visualHtml": "\n            <div style=\"font-family:var(--font-mono);font-size:0.8rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n              <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">BA CẤP ĐỘ SAO CHÉP TRONG BỘ NHỚ PYTHON</div>\n              <div style=\"display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;text-align:center;\">\n                <div style=\"padding:8px;border:1px solid #ef4444;border-radius:6px;background:var(--bg-surface);\">\n                  <strong style=\"color:#ef4444;\">1. Gán tham chiếu</strong>\n                  <div style=\"font-size:0.75rem;margin-top:4px;\">b = a</div>\n                  <div style=\"font-size:0.7rem;color:var(--text-muted);margin-top:2px;\">Chung 100% ô nhớ. Không có bản sao nào!</div>\n                </div>\n                <div style=\"padding:8px;border:1px solid #f59e0b;border-radius:6px;background:var(--bg-surface);\">\n                  <strong style=\"color:#f59e0b;\">2. Shallow Copy</strong>\n                  <div style=\"font-size:0.75rem;margin-top:4px;\">b = a.copy()</div>\n                  <div style=\"font-size:0.7rem;color:var(--text-muted);margin-top:2px;\">Tách tầng 1, nhưng danh sách lồng vẫn dùng chung!</div>\n                </div>\n                <div style=\"padding:8px;border:1px solid #10b981;border-radius:6px;background:var(--bg-surface);\">\n                  <strong style=\"color:#10b981;\">3. Deep Copy</strong>\n                  <div style=\"font-size:0.75rem;margin-top:4px;\">b = copy.deepcopy(a)</div>\n                  <div style=\"font-size:0.7rem;color:var(--text-muted);margin-top:2px;\">Tách độc lập 100% toàn bộ cây đối tượng.</div>\n                </div>\n              </div>\n            </div>\n          "
        },
        "sections": [
          {
            "id": "sec-mutability-matrix",
            "title": "1. Bản Chất Tính Khả Biến (Mutability vs Immutability)",
            "badge": "Bản chất Kiến trúc",
            "content": "\n              <p>Trong CPython, tính khả biến là thuộc tính cố định của Kiểu dữ liệu (Type), không thể thay đổi sau khi đối tượng được sinh ra:</p>\n\n              <div class=\"table-responsive\">\n                <table style=\"width:100%;font-size:0.9rem;border-collapse:collapse;\">\n                  <thead>\n                    <tr style=\"background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);\">\n                      <th style=\"padding:10px;text-align:left;\">Đặc tính</th>\n                      <th style=\"padding:10px;text-align:left;\">Đối tượng Bất Biến (Immutable)</th>\n                      <th style=\"padding:10px;text-align:left;\">Đối tượng Khả Biến (Mutable)</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>Các kiểu dữ liệu</strong></td>\n                      <td><code>int</code>, <code>float</code>, <code>bool</code>, <code>str</code>, <code>tuple</code>, <code>bytes</code>, <code>frozenset</code>.</td>\n                      <td><code>list</code>, <code>dict</code>, <code>set</code>, <code>bytearray</code>.</td>\n                    </tr>\n                    <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                      <td style=\"padding:10px;\"><strong>Hành vi khi chỉnh sửa</strong></td>\n                      <td>Không thể thay đổi nội dung tại chỗ. Mọi phép toán biến đổi đều bắt buộc CPython phải tạo một <strong>đối tượng hoàn toàn mới</strong> tại ô nhớ mới.</td>\n                      <td>Có thể thay đổi nội dung tại chỗ (In-place Mutation) mà địa chỉ ô nhớ <code>id()</code> không hề thay đổi.</td>\n                    </tr>\n                    <tr>\n                      <td style=\"padding:10px;\"><strong>Tính băm (Hashability)</strong></td>\n                      <td>Có thể tính mã băm (Hashable), dùng làm khóa trong Dictionary hoặc phần tử trong Set.</td>\n                      <td>Không có tính băm (Unhashable), cấm dùng làm khóa trong Dictionary.</td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n            "
          },
          {
            "id": "sec-mutable-default-trap",
            "title": "2. Cạm Bẫy Sinh Tử: Đối Số Mặc Định Khả Biến (Mutable Default Argument)",
            "badge": "Cạm bẫy Kinh điển",
            "content": "\n              <p>Đây là cạm bẫy xếp số 1 trong danh sách lỗi ngầm của các kỹ sư Python. Hãy khảo sát cơ chế Notional Machine bên dưới:</p>\n              <p>Trong Python, các câu lệnh định nghĩa hàm <code>def</code> chỉ được thông dịch và đánh giá <strong>đúng 1 lần duy nhất</strong> khi module được nạp vào bộ nhớ (Compile time), chứ không phải mỗi lần hàm được gọi (Runtime)! Vì vậy, nếu bạn đặt một đối số mặc định là một đối tượng khả biến như <code>orders=[]</code> hay <code>cache={}</code>, đối tượng đó sẽ được chia sẻ chung qua tất cả các lần gọi hàm trong suốt vòng đời của chương trình!</p>\n            ",
            "codeExamples": [
              {
                "title": "Giải phẫu cạm bẫy đối số mặc định và cách sửa lỗi chuẩn công nghiệp",
                "lang": "Python",
                "code": "# CÁCH VIẾT SAI LẦM NGUY HIỂM: Đối số mặc định là list khả biến\ndef add_transaction_flawed(tx_id, stream=[]):\n    stream.append(tx_id)\n    return stream\n\n# Lần gọi 1 của Chi nhánh Hà Nội\nhn_stream = add_transaction_flawed(\"HN-01\")\nprint(\"HN stream lần 1:\", hn_stream)\n\n# Lần gọi 2 của Chi nhánh TP.HCM (Không truyền stream, mong muốn danh sách mới rỗng)\nhcm_stream = add_transaction_flawed(\"HCM-01\")\nprint(\"HCM stream lần 2:\", hcm_stream) # BỊ NHIỄM ĐỘC DỮ LIỆU CỦA HÀ NỘI!\nprint(\"Kiểm tra ô nhớ (hn_stream is hcm_stream):\", hn_stream is hcm_stream)\n\n# =========================================================\n# CÁCH VIẾT ĐÚNG CHUẨN CÔNG NGHIỆP: Dùng None làm lính canh (Sentinel)\ndef add_transaction_robust(tx_id, stream=None):\n    if stream is None:\n        stream = [] # Tạo list mới độc lập tại thời điểm gọi hàm\n    stream.append(tx_id)\n    return stream\n\nclean_hn = add_transaction_robust(\"HN-01\")\nclean_hcm = add_transaction_robust(\"HCM-01\")\nprint(\"\\n=== KẾT QUẢ SAU KHI SỬA CHUẨN MỰC ===\")\nprint(\"HN sạch:\", clean_hn)\nprint(\"HCM sạch:\", clean_hcm)\nprint(\"Kiểm tra ô nhớ độc lập:\", clean_hn is clean_hcm)",
                "output": "HN stream lần 1: ['HN-01']\nHCM stream lần 2: ['HN-01', 'HCM-01']\nKiểm tra ô nhớ (hn_stream is hcm_stream): True\n\n=== KẾT QUẢ SAU KHI SỬA CHUẨN MỰC ===\nHN sạch: ['HN-01']\nHCM sạch: ['HCM-01']\nKiểm tra ô nhớ độc lập: False",
                "annotations": [
                  {
                    "line": 2,
                    "text": "Lỗi nguy hiểm: stream=[] được tạo đúng 1 lần khi import, biến thành vùng nhớ dùng chung."
                  },
                  {
                    "line": 11,
                    "text": "Thảm họa dữ liệu: Đơn hàng của TP.HCM bị gộp chung với đơn hàng của Hà Nội!"
                  },
                  {
                    "line": 16,
                    "text": "Chuẩn PEP: Luôn dùng &lt;code&gt;None&lt;/code&gt; (đối tượng bất biến) làm giá trị mặc định."
                  },
                  {
                    "line": 18,
                    "text": "Khởi tạo list mới bên trong hàm đảm bảo mỗi lần gọi là một ô nhớ riêng biệt."
                  }
                ],
                "explanation": "Sử dụng &lt;code&gt;None&lt;/code&gt; làm lính canh (Sentinel value) là quy chuẩn bắt buộc trong mọi dự án Python chuyên nghiệp để bảo vệ hàm không bị nhiễm độc trạng thái qua các lần gọi."
              }
            ]
          },
          {
            "id": "sec-shallow-deep-copy-exp",
            "title": "3. Thực Nghiệm: Shallow Copy vs Deep Copy Trên Dữ Liệu TechMart",
            "badge": "Bản chất Bộ nhớ",
            "content": "\n              <p>Khi dữ liệu có cấu trúc lồng nhau (Nested structures) như đơn hàng chứa danh sách các mặt hàng con, sự khác biệt giữa Shallow Copy và Deep Copy trở thành vấn đề sống còn:</p>\n            ",
            "codeExamples": [
              {
                "title": "So sánh tác động của Shallow Copy và Deep Copy đối với cấu trúc lồng nhau",
                "lang": "Python",
                "code": "import copy\n\n# Đơn hàng gốc của TechMart chứa danh sách lồng nhau các mặt hàng\noriginal_order = {\n    \"order_id\": \"TM-999\",\n    \"customer\": \"Nguyen Van A\",\n    \"items\": [\n        {\"sku\": \"MOUSE\", \"qty\": 1, \"price\": 250000}\n    ]\n}\n\n# 1. Thao tác Shallow Copy (Sao chép nông)\nshallow_order = original_order.copy()\n\n# 2. Thao tác Deep Copy (Sao chép sâu)\ndeep_order = copy.deepcopy(original_order)\n\n# ĐỘT BIẾN TẦNG 1: Đổi tên khách hàng trên bản sao\nshallow_order[\"customer\"] = \"Tran Thi B (Đã đổi)\"\n\n# ĐỘT BIẾN TẦNG CON: Tăng số lượng chuột trong danh sách items của shallow_order\nshallow_order[\"items\"][0][\"qty\"] = 99\n\nprint(\"=== SO SÁNH KẾT QUẢ SAU ĐỘT BIẾN ===\")\nprint(\"Khách hàng gốc:       \", original_order[\"customer\"]) # Không đổi (Tầng 1 độc lập)\nprint(\"Khách hàng shallow:   \", shallow_order[\"customer\"])\n\nprint(\"\\nSố lượng chuột GỐC:   \", original_order[\"items\"][0][\"qty\"]) # BỊ ĐỔI THÀNH 99!\nprint(\"Số lượng chuột SHALLOW:\", shallow_order[\"items\"][0][\"qty\"])\nprint(\"Số lượng chuột DEEP:   \", deep_order[\"items\"][0][\"qty\"])      # VẪN LÀ 1 NGUYÊN VẸN!",
                "output": "=== SO SÁNH KẾT QUẢ SAU ĐỘT BIẾN ===\nKhách hàng gốc:        Nguyen Van A\nKhách hàng shallow:    Tran Thi B (Đã đổi)\n\nSố lượng chuột GỐC:    99\nSố lượng chuột SHALLOW: 99\nSố lượng chuột DEEP:    1",
                "annotations": [
                  {
                    "line": 13,
                    "text": "shallow.copy() tạo dict mới ở tầng ngoài, nhưng items bên trong vẫn trỏ chung ô nhớ list cũ!"
                  },
                  {
                    "line": 16,
                    "text": "copy.deepcopy() duyệt đệ quy sao chép độc lập toàn bộ các tầng con."
                  },
                  {
                    "line": 22,
                    "text": "Sửa danh sách con ở shallow làm hỏng luôn số liệu trong đơn hàng gốc ban đầu!"
                  },
                  {
                    "line": 29,
                    "text": "Bản sao deep_order được cách ly hoàn toàn, bảo toàn nguyên vẹn giá trị 1."
                  }
                ],
                "explanation": "Thí nghiệm chứng minh rõ ràng ranh giới của Shallow Copy: chỉ an toàn cho cấu trúc phẳng 1 tầng. Đối với dữ liệu lồng nhau phức hợp (JSON/NoSQL), bắt buộc phải dùng copy.deepcopy() hoặc kiến trúc bất biến để bảo vệ dữ liệu thô."
              }
            ]
          },
          {
            "id": "sec-copy-references",
            "title": "4. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n              <ul>\n                <li><strong>Python Documentation.</strong> <em>copy — Shallow and deep copy operations.</em> <a href=\"https://docs.python.org/3/library/copy.html\" target=\"_blank\" rel=\"noopener\">https://docs.python.org/3/library/copy.html</a></li>\n                <li><strong>Wilson, G., et al. (2017).</strong> <em>Good Enough Practices in Scientific Computing.</em> PLOS Computational Biology, 13(6), e1005510.</li>\n                <li><strong>Ramalho, L. (2022).</strong> <em>Fluent Python: Clear, Concise, and Effective Programming (2nd ed.).</em> O'Reilly Media. (Chapter 6: Object References, Mutability, and Recycling).</li>\n              </ul>\n            "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Cạm bẫy nhân bản danh sách: `[[0] * 3] * 3`",
              "content": "Khi bạn tạo ma trận bằng cú pháp `matrix = [[0] * 3] * 3`, toán tử nhân ngoài cùng không tạo ra 3 hàng độc lập, mà tạo ra 3 nhãn cùng trỏ vào ĐÚNG MỘT HÀNG! Khi bạn gán `matrix[0][0] = 1`, cả 3 hàng đều bị đổi thành `[1, 0, 0]`."
            },
            {
              "title": "Đột biến tham số đầu vào trong hàm xử lý dữ liệu",
              "content": "Một hàm nhận `def clean_data(df_or_list):` mà trực tiếp gọi các phương thức xóa/sửa tại chỗ sẽ phá hủy dữ liệu thô của các bước phân tích phía sau."
            }
          ],
          "tips": [
            {
              "title": "Cách khởi tạo ma trận 2D an toàn",
              "content": "Luôn khởi tạo danh sách lồng nhau bằng List Comprehension: `matrix = [[0 for _ in range(3)] for _ in range(3)]`. Mỗi vòng lặp sẽ tạo ra một đối tượng danh sách con độc lập trên Heap."
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Dự đoán hành vi đột biến danh sách",
            "problem": "Cho đoạn code sau:\n```python\na = [1, [2, 3]]\nb = a.copy()\nb[0] = 99\nb[1].append(4)\n```\nHãy dự đoán nội dung của danh sách `a` sau khi chạy code và giải thích tại sao.",
            "hint": "Phần tử 0 là số nguyên bất biến (tách rời), nhưng phần tử 1 là danh sách khả biến lồng nhau (dùng chung ô nhớ).",
            "solutionCode": "a = [1, [2, 3]]\nb = a.copy()\nb[0] = 99\nb[1].append(4)\n\nprint(\"Danh sách a gốc:\", a)\nprint(\"Danh sách b sao chép:\", b)",
            "solutionOutput": "Danh sách a gốc: [1, [2, 3, 4]]\nDanh sách b sao chép: [99, [2, 3, 4]]",
            "explanation": "Do b là Shallow Copy, phần tử tầng 1 b[0] được gán độc lập nên a[0] vẫn giữ nguyên là 1. Tuy nhiên, b[1] và a[1] cùng trỏ vào một danh sách con trong Heap, nên b[1].append(4) làm thay đổi cả a[1]."
          },
          {
            "level": "Vừa",
            "title": "Sửa lỗi hàm tích lũy đơn hàng bị cạm bẫy đối số mặc định",
            "problem": "Một đồng nghiệp viết hàm sau để gom nhóm các đơn hàng theo khách hàng:\n```python\ndef collect_orders(order_id, history=[]):\n    history.append(order_id)\n    return history\n```\nHãy chỉ ra lỗi của hàm trên và viết lại hàm chuẩn mực sử dụng &lt;code&gt;None&lt;/code&gt; làm lính canh.",
            "hint": "Đặt mặc định `history=&lt;code&gt;None&lt;/code&gt;` và kiểm tra bên trong thân hàm.",
            "solutionCode": "def collect_orders_fixed(order_id, history=None):\n    if history is None:\n        history = []\n    history.append(order_id)\n    return history\n\ncust1 = collect_orders_fixed(\"HD-01\")\ncust2 = collect_orders_fixed(\"HD-02\")\nprint(\"Khách 1:\", cust1)\nprint(\"Khách 2:\", cust2)",
            "solutionOutput": "Khách 1: ['HD-01']\nKhách 2: ['HD-02']",
            "explanation": "Sử dụng history=&lt;code&gt;None&lt;/code&gt; ngăn chặn việc chia sẻ ô nhớ danh sách qua các lần gọi hàm, đảm bảo mỗi khách hàng có một lịch sử đơn hàng độc lập."
          },
          {
            "level": "Nâng cao",
            "title": "Thiết kế hệ thống khôi phục dữ liệu gốc Snapshot Rollback",
            "problem": "Tại TechMart, một đường ống biến đổi dữ liệu thực hiện nhiều bước làm sạch phức tạp trên một lô hàng lồng nhau. Để đảm bảo an toàn nếu bước 3 bị lỗi, hãy viết một lớp hoặc hàm `create_pipeline_snapshot(data)` sử dụng `copy.deepcopy()` để tạo bản sao lưu (Snapshot). Nếu xảy ra ngoại lệ trong quá trình tính toán, hãy tự động hoàn nguyên (Rollback) về trạng thái dữ liệu nguyên vẹn ban đầu.",
            "hint": "Dùng cấu trúc `try-except` kết hợp lưu trữ bản deepcopy trước khi bắt đầu biến đổi.",
            "solutionCode": "import copy\n\ndef run_safe_pipeline(raw_batch, transformation_fn):\n    # Tạo bản sao lưu an toàn tuyệt đối\n    snapshot = copy.deepcopy(raw_batch)\n    try:\n        # Thực hiện biến đổi trên bản sao\n        working_data = copy.deepcopy(raw_batch)\n        result = transformation_fn(working_data)\n        print(\"✓ Đường ống thực thi thành công!\")\n        return result\n    except Exception as err:\n        print(f\"⚠️ Phát hiện sự cố ({err})! Đang hoàn nguyên về Snapshot dữ liệu gốc...\")\n        return snapshot\n\n# Thử nghiệm với một hàm bị lỗi giữa chừng\ndef faulty_transform(data):\n    data[\"items\"][0][\"qty\"] += 10 # Đã sửa một phần\n    raise ValueError(\"Lỗi mất kết nối CSDL trung gian!\")\n\nbatch = {\"id\": \"BATCH-01\", \"items\": [{\"qty\": 5}]}\nsafe_result = run_safe_pipeline(batch, faulty_transform)\nprint(\"Dữ liệu sau khi bảo vệ:\", safe_result)",
            "solutionOutput": "⚠️ Phát hiện sự cố (Lỗi mất kết nối CSDL trung gian!)! Đang hoàn nguyên về Snapshot dữ liệu gốc...\nDữ liệu sau khi bảo vệ: {'id': 'BATCH-01', 'items': [{'qty': 5}]}",
            "explanation": "Cơ chế Snapshot Rollback dựa trên deepcopy là giải pháp kinh điển để bảo vệ tính toàn vẹn của dữ liệu trong các hệ thống xử lý giao dịch phân tán."
          }
        ],
        "quiz": [
          {
            "question": "Tại sao việc khai báo hàm `def process_data(data, cache={}):` lại bị coi là một lỗi nghiêm trọng trong Python?",
            "options": [
              "Vì Dictionary không thể dùng làm tham số trong hàm.",
              "Vì đối số mặc định `cache={}` được đánh giá và tạo duy nhất 1 lần khi module được nạp, khiến tất cả các lần gọi hàm sau đó đều dùng chung một vùng nhớ cache, dẫn đến rò rỉ dữ liệu giữa các phiên làm việc.",
              "Vì Python 3 đã loại bỏ cú pháp đối số mặc định.",
              "Vì hàm sẽ bị chạy chậm hơn 100 lần."
            ],
            "correctIndex": 1,
            "explanation": "Đối số mặc định được khởi tạo tại thời điểm biên dịch hàm. Đối tượng khả biến như {} sẽ tồn tại suốt vòng đời chương trình và dùng chung qua tất cả các cuộc gọi hàm."
          },
          {
            "question": "Khi sao chép một từ điển lồng nhau bằng phương thức `b = a.copy()`, điều gì xảy ra với các danh sách con nằm bên trong từ điển đó?",
            "options": [
              "Các danh sách con cũng được sao chép sang vùng RAM mới hoàn toàn.",
              "Các danh sách con bị xóa bỏ.",
              "Chỉ có từ điển lớp ngoài được tạo mới, còn các danh sách con bên trong vẫn dùng chung địa chỉ ô nhớ giữa a và b (Shallow Copy).",
              "Chương trình sẽ báo lỗi TypeError."
            ],
            "correctIndex": 2,
            "explanation": "Shallow copy chỉ tạo bản sao cho đối tượng ở tầng cao nhất (tầng 1). Toàn bộ các đối tượng phức hợp lồng nhau bên trong vẫn giữ nguyên con trỏ tham chiếu cũ."
          },
          {
            "question": "Nguyên tắc \"Dữ liệu thô bất biến\" (Raw Data Immutability) trong Kỹ nghệ Dữ liệu mang lại lợi ích cốt lõi nào?",
            "options": [
              "Tiết kiệm 100% dung lượng ổ cứng lưu trữ.",
              "Giúp mã nguồn không cần viết kiểm thử Unit Test.",
              "Bảo toàn dữ liệu gốc nguyên vẹn để quy trình phân tích luôn có thể chạy lại từ đầu và cho ra kết quả giống hệt (Reproducibility), đồng thời phục vụ kiểm toán và truy vết sai sót.",
              "Ngăn không cho người khác mở file dữ liệu."
            ],
            "correctIndex": 2,
            "explanation": "Dữ liệu thô là nguồn sự thật duy nhất (Single Source of Truth). Giữ dữ liệu thô bất biến là nền tảng cho tính tái lập khoa học và truy vết sai sót trong kỹ nghệ dữ liệu."
          }
        ],
        "summary": [
          "Phân biệt rõ: Đối tượng bất biến (int, str, tuple) tạo mới khi chỉnh sửa; Đối tượng khả biến (list, dict, set) sửa đổi tại chỗ.",
          "Tuyệt đối không dùng đối tượng khả biến làm đối số mặc định trong hàm (`def f(x, stream=[])`). Luôn dùng `&lt;code&gt;None&lt;/code&gt;` làm lính canh.",
          "Nắm vững 3 cấp độ sao chép: Gán tham chiếu (chung ô nhớ) ➔ Shallow Copy (độc lập tầng 1) ➔ Deep Copy (độc lập 100% đệ quy).",
          "Tuân thủ nguyên tắc Dữ liệu thô bất biến (Raw Data Immutability) để bảo vệ tính toàn vẹn của đường ống dữ liệu."
        ],
        "selfReviewQuestions": [
          "1. Tại sao lệnh `a = [0] * 5` tạo ra 5 số 0 độc lập, nhưng `matrix = [[0] * 3] * 3` lại tạo ra 3 hàng dùng chung ô nhớ?",
          "2. Trình bày cách khắc phục chuẩn mực cho hàm có tham số mặc định là một đối tượng khả biến.",
          "3. Khi nào một kỹ sư dữ liệu nên dùng `.copy()` thông thường và khi nào bắt buộc phải dùng `copy.deepcopy()`?"
        ],
        "reflectionQuestion": "Hãy giải thích: Tại sao kiến trúc Copy-on-Write (CoW) trong các thư viện hiện đại như Pandas 3.0+ lại được coi là bước tiến vượt bậc kết hợp được cả sự an toàn của Deep Copy và tốc độ của Shallow Copy?",
        "reflectionHint": "Nghĩ về cơ chế lười biếng (Lazy Evaluation): Chỉ chia sẻ con trỏ ô nhớ khi đọc; chỉ thực sự sao chép vùng nhớ mới khi có thao tác ghi/sửa dữ liệu phát sinh!",
        "nextLessonPreview": "Bước sang Module 3, chúng ta sẽ chính thức bước vào vũ trụ tính toán hiệu năng cao: Giải phẫu kiến trúc bộ nhớ NumPy ndarray, C-contiguous buffer, SIMD, phân tích chuẩn số thực IEEE 754 và 3 quy tắc Broadcasting!"
      }
    ]
  }
];
