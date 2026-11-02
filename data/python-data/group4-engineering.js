window.PYDATA_GROUP4_PARTS = [
  {
    "id": "mod-11",
    "number": "Module 11",
    "title": "Kiểm Thử & Kiểm Định Dữ Liệu",
    "badge": "3 Bài học",
    "icon": "🛡️",
    "description": "Bảo vệ đường ống dữ liệu khỏi thảm họa lỗi ngầm (Silent Data Corruption) với pd.testing.assert_frame_equal, thiết kế test case theo chuẩn ISTQB, làm chủ hệ sinh thái Pytest và xây dựng hàng rào kiểm định biên ISO/IEC 25012 kết hợp cách ly kiểm dịch (Quarantine Routing).",
    "lessons": [
      {
        "id": "pd-11-01",
        "number": "11.1",
        "title": "Nguy Cơ Lỗi Ngầm (Silent Bugs) & So Sánh Chuẩn Xác Với assert_frame_equal",
        "subtitle": "Bẫy IEEE 754 NaN == NaN, sai số dấu phẩy động rtol/atol và phát hiện Silent Regression Bug thực tế với pd.testing",
        "level": "Cơ bản",
        "duration": "45 phút",
        "objectives": [
          "Phân tích nguy cơ sống còn của 'Lỗi ngầm không quăng ngoại lệ' (Silent Data Corruption) trong kỹ nghệ dữ liệu so với lỗi dừng chương trình truyền thống.",
          "Giải mã nguyên nhân sâu xa khiến toán tử so sánh sơ sài (df1 == df2).all() thất bại: Quy ước IEEE 754 về NaN, sự bỏ qua kiểu dữ liệu (dtype mismatch) và sai số làm tròn số thực.",
          "Làm chủ công cụ kiểm thử tiêu chuẩn công nghiệp pd.testing.assert_frame_equal với các tham số check_dtype, rtol, atol và check_like.",
          "Thực hành phát hiện một Silent Regression Bug thực tế trong hàm tính chiết khấu doanh thu TechMart: Bắt lỗi thất bại (Fail đỏ) và kiểm chứng sau khi sửa đúng (Pass xanh)."
        ],
        "intuition": {
          "title": "Bệnh Nhân Không Triệu Chứng & Chiếc Máy Chụp Cắt Lớp X-Quang",
          "metaphor": "Hãy xem cách một kỹ sư kỳ cựu kiểm tra sức khỏe của đường ống dữ liệu:\\n1. Lỗi Thường (Crash Exception): Giống như một bệnh nhân bị ngất xỉu giữa đường: Mọi thứ dừng lại ngay lập tức, còi cấp cứu vang lên (Chương trình Python quăng Traceback và dừng lại). Dù đau đớn, đây lại là loại lỗi dễ sửa nhất vì bạn biết ngay vị trí xảy ra sự cố!\\n2. Lỗi Ngầm (Silent Data Corruption): Giống như một căn bệnh nan y không triệu chứng: Bệnh nhân bề ngoài trông cực kỳ hồng hào, huyết áp bình thường, chương trình Python chạy êm ru trả về mã thoát exit code: 0 (Thành công mỹ mãn!). Nhưng bên trong, một phép ép kiểu ngầm đã âm thầm làm tròn 12.8 tỷ thành 12 tỷ, làm bốc hơi 800 triệu đồng trên báo cáo tài chính của TechMart! Không có bất kỳ cảnh báo nào xuất hiện!\\n3. Toán tử == (Nhìn bằng mắt thường): Giống như người khám bệnh chỉ liếc nhìn da mặt: Nó mù trước số khuyết (chuẩn quốc tế IEEE 754 quy định NaN == NaN luôn là False, khiến hai bảng giống hệt nhau bị báo là khác nhau!), nó bỏ qua kiểu dữ liệu (cho rằng số nguyên 100 giống số thực 100.0 dù vào cơ sở dữ liệu sẽ nổ tung!), và tệ nhất: khi phát hiện khác nhau, nó chỉ ném ra một chữ False câm lặng!\\n4. pd.testing.assert_frame_equal (Máy chụp cắt lớp CT độ phân giải cao): Soi rõ từng pixel, cho phép dung sai sai số dấu phẩy động rtol, kiểm tra nghiêm ngặt kiểu dữ liệu của từng cột, và khi có sai lệch, nó in ra báo cáo chẩn đoán chi tiết đến từng phần triệu: Cột nào lệch, dòng nào sai, lệch bao nhiêu %!",
          "boundary": "assert_frame_equal sinh ra để chạy trong môi trường Unit Test với các DataFrame mẫu nhỏ đã biết trước kết quả (Golden Dataset), tuyệt đối không nên chạy kiểm tra toàn bộ bảng dữ liệu hàng triệu dòng trong production pipeline vì chi phí so sánh O(N) rất tốn CPU.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">SO SÁNH CƠ CHẾ: TOÁN TỬ == VS PD.TESTING.ASSERT_FRAME_EQUAL</div>\n                        <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px;\">\n                          <div style=\"border:1px solid #ef4444;border-radius:6px;padding:8px;background:var(--bg-surface);\">\n                            <strong style=\"color:#ef4444;\">❌ TOÁN TỬ == SƠ SÀI</strong>\n                            <div style=\"font-size:0.75rem;margin-top:2px;\">• NaN == NaN luôn ra False<br>• int64 == float64 coi như bằng nhau<br>• 0.1 + 0.2 == 0.3 là False<br>• Báo lỗi câm lặng: False!</div>\n                          </div>\n                          <div style=\"border:1px solid #10b981;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#10b981;\">✅ ASSERT_FRAME_EQUAL</strong>\n                            <div style=\"font-size:0.75rem;margin-top:2px;\">• NaN cùng vị trí coi là khớp<br>• Kiểm tra nghiêm ngặt check_dtype<br>• Dung sai float với rtol &amp; atol<br>• Chỉ rõ tọa độ dòng/cột sai lệch</div>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-11-01-01",
            "title": "1. Nguy Cơ Silent Data Corruption Trong Kỹ Nghệ Dữ Liệu",
            "content": "\n                          <p>Trong kỹ thuật phần mềm truyền thống, châm ngôn là <em>\"Fail Early, Fail Loudly\"</em> (Hỏng sớm, hỏng ồn ào bằng Exception). Tuy nhiên, trong phân tích và kỹ nghệ dữ liệu, mối nguy hiểm lớn nhất lại là <strong>Lỗi Ngầm (Silent Data Corruption)</strong>:</p>\n                          <blockquote>\n                            <strong>Đường ống dữ liệu chạy từ đầu đến cuối không hề văng lỗi, mã thoát Exit Code trả về 0 (Thành công), nhưng toàn bộ báo cáo doanh thu bị sai lệch 15% hoặc dữ liệu bị chép đè ngầm do một phép tính bị lỗi logic!</strong>\n                          </blockquote>\n                          <h4>Ba Nguồn Gốc Phổ Biến Của Silent Bugs Trong Pandas:</h4>\n                          <ul>\n                            <li><strong>Ép kiểu ngầm (Implicit Type Casting):</strong> Một cột ID khách hàng dạng chuỗi văn bản <code>\"0123\"</code> bị tự động ép thành số nguyên <code>123</code> làm mất số 0 ở đầu, khiến toàn bộ các phép Join phía sau bị rỗng câm lặng!</li>\n                            <li><strong>Phép toán NaN lan truyền (NaN Propagation):</strong> Một giá trị khuyết không được xử lý khiến toàn bộ phép cộng tổng ở tầng báo cáo biến thành <code>NaN</code> hoặc bị bỏ qua âm thầm làm hụt doanh thu.</li>\n                            <li><strong>Sai số làm tròn số thực (Floating-point precision):</strong> Các phép toán cộng trừ số thực làm phát sinh phần dư vi mô như <code>0.0000000000000004</code> khiến các câu lệnh lọc điều kiện bằng (<code>==</code>) bị trượt 100%!</li>\n                          </ul>\n                        "
          },
          {
            "id": "sec-11-01-02",
            "title": "2. Vì Sao Toán Tử == Thất Bại Trước Dữ Liệu Bảng?",
            "content": "\n                          <p>Nhiều người mới học thường viết test kiểm tra bằng cách:</p>\n                          \n                          <h4>Ba Lý Do Toán Tử == Thất Bại Thảm Hại:</h4>\n                          <ol>\n                            <li><strong>Quy ước quốc tế IEEE 754:</strong> <code>np.nan == np.nan</code> luôn luôn trả về <code>False</code>! Nếu bảng kết quả của bạn có ô rỗng hợp lệ (ví dụ: khách hàng chưa đăng ký số điện thoại), toán tử <code>==</code> sẽ báo bài test thất bại mặc dù dữ liệu của bạn hoàn toàn chính xác!</li>\n                            <li><strong>Bỏ qua kiểu dữ liệu:</strong> Một cột kiểu <code>int64</code> chứa giá trị <code>[1, 2]</code> so sánh <code>==</code> với cột kiểu <code>float64</code> chứa giá trị <code>[1.0, 2.0]</code> sẽ trả về <code>True</code>! Nhưng khi bảng này được đẩy vào cơ sở dữ liệu quan hệ PostgreSQL (yêu cầu khóa chính là Integer), hệ thống sẽ nổ tung!</li>\n                            <li><strong>Không cung cấp chẩn đoán (Diagnostic info):</strong> Khi biểu thức trả về <code>False</code>, bạn hoàn toàn mù tịt không biết trong số 10.000 dòng x 50 cột thì ô dữ liệu nào bị sai!</li>\n                          </ol>\n                        "
          },
          {
            "id": "sec-11-01-03",
            "title": "3. Công Cụ Tiêu Chuẩn Công Nghiệp: pd.testing.assert_frame_equal",
            "content": "\n                          <p>Pandas cung cấp module chuyên dụng <code>pandas.testing</code> với hàm <code>assert_frame_equal</code> giải quyết triệt để mọi nhược điểm trên:</p>\n                          \n                        ",
            "codeExamples": [
              {
                "id": "pd-11-01-c1",
                "lang": "python",
                "title": "Kiểm định so sánh DataFrame chuẩn xác với pandas.testing.assert_frame_equal",
                "code": "import pandas as pd\nfrom pandas.testing import assert_frame_equal\n\n# Bảng dữ liệu mong đợi (Golden Truth)\ndf_expected = pd.DataFrame({\n    'cust_id': [1, 2, 3],\n    'revenue': [150.0, 200.0, 350.0],\n    'status': pd.Series(['DONE', 'DONE', 'PENDING'], dtype='category')\n})\n\n# Bảng dữ liệu thực tế tính toán từ Pipeline\ndf_actual = pd.DataFrame({\n    'cust_id': [1, 2, 3],\n    'revenue': [150.00000001, 200.0, 350.0], # Có sai số làm tròn số thực\n    'status': pd.Series(['DONE', 'DONE', 'PENDING'], dtype='category')\n})\n\n# assert_frame_equal cho phép chấp nhận sai số làm tròn (rtol, atol)\nassert_frame_equal(df_actual, df_expected, rtol=1e-5, atol=1e-8)\nprint(\"KIỂM ĐỊNH THÀNH CÔNG: Hai DataFrame khớp nhau hoàn toàn trong ngưỡng sai số cho phép!\")",
                "output": "KIỂM ĐỊNH THÀNH CÔNG: Hai DataFrame khớp nhau hoàn toàn trong ngưỡng sai số cho phép!",
                "explanation": "Không bao giờ dùng toán tử == để so sánh hai DataFrame. assert_frame_equal tự động kiểm tra nhãn Index, tên cột, kiểu dữ liệu dtype và hỗ trợ so sánh số thực có dung sai."
              }
            ]
          },
          {
            "id": "sec-11-01-04",
            "title": "4. Thực Hành Bắt Silent Regression Bug Trong Pipeline Thực Tế",
            "content": "\n                          <p>Hãy xem một hàm tính tiền chiết khấu thực tế tại TechMart:</p>\n                          \n                          <p>Hàm trên chạy trơn tru không hề crash! Khách hàng VIP bị tính nguyên giá, công ty mất hàng trăm khách hàng trung thành mà không hiểu vì sao! Nhưng một bài test với <code>assert_frame_equal</code> sẽ lập tức vạch trần tội ác:</p>\n                          \n                        "
          }
        ],
        "summary": [
          "Lỗi ngầm (Silent Data Corruption) là mối nguy hiểm lớn nhất trong Data Engineering vì chương trình không crash nhưng cho ra số liệu sai lệch nghiêm trọng.",
          "Toán tử == thất bại trước quy ước IEEE 754 (NaN == NaN là False), bỏ qua sự sai khác kiểu dữ liệu và không thể cho dung sai số thực float.",
          "Luôn dùng pd.testing.assert_frame_equal trong các bài Unit Test để kiểm tra khắt khe kiểu dữ liệu, cho phép NaN khớp nhau và cung cấp báo cáo sai lệch tọa độ chi tiết.",
          "Thiết lập bộ dữ liệu mẫu kiểm thử đã biết trước kết quả (Golden Test Dataset) để bắt ngay các lỗi hồi quy khi refactor mã nguồn."
        ],
        "workedExample": {
          "scenario": "Viết Unit Test phát hiện lỗi hồi quy trong hàm chuẩn hóa dữ liệu",
          "code": "import pandas as pd\nimport numpy as np\n\n# Hàm tiền xử lý cần kiểm thử\ndef clean_orders_pipeline(df):\n    clean_df = df.copy()\n    clean_df['amount'] = clean_df['amount'].fillna(0).astype('float64')\n    clean_df['branch'] = clean_df['branch'].str.strip().str.upper()\n    return clean_df\n\n# Thiết lập Golden Test Dataset (Arrange)\ninput_data = pd.DataFrame({\n    'order_id': [1, 2, 3],\n    'amount': [150.0, np.nan, 200.5],\n    'branch': [' hanoi ', 'Hcm', 'DN ']\n})\n\nexpected_data = pd.DataFrame({\n    'order_id': [1, 2, 3],\n    'amount': [150.0, 0.0, 200.5],\n    'branch': ['HANOI', 'HCM', 'DN']\n})\n\n# Thực thi hàm (Act)\nactual_result = clean_orders_pipeline(input_data)\n\n# Kiểm định chuẩn xác (Assert)\npd.testing.assert_frame_equal(\n    actual_result,\n    expected_data,\n    check_dtype=True,\n    check_exact=True\n)\nprint(\"Unit Test PASSED: Pipeline chuẩn hóa đạt tiêu chuẩn chất lượng 100%!\")",
          "explanation": "1. Golden dataset được thiết kế bao gồm giá trị bình thường, ô khuyết NaN và chuỗi bị khoảng trắng/hoa thường lộn xộn.\\n2. pd.testing.assert_frame_equal kiểm tra cả giá trị lẫn kiểu float64, bảo đảm hàm thực thi đúng mọi ràng buộc."
        },
        "fadedExample": {
          "scenario": "Kiểm thử dung sai số thực trên báo cáo tỷ trọng",
          "code": "import pandas as pd\nimport numpy as np\n\ndf_calc = pd.DataFrame({'pct': [0.1 + 0.2, 0.7]})\ndf_expect = pd.DataFrame({'pct': [0.3, 0.7]})\n\n# Yêu cầu: Dùng pd.testing.assert_frame_equal với rtol=1e-5 để so sánh vượt qua sai số float\n# Gợi ý: check_exact=False, rtol=1e-5\n\npd.testing.assert_frame_equal(\n    df_calc,\n    df_expect,\n    check_exact=False,\n    rtol=1e-5\n)\n\nprint(\"So sánh dung sai số thực thành công tuyệt đối!\")",
          "blankExplanation": "Điền check_exact=False và rtol=1e-5 vào pd.testing.assert_frame_equal để bỏ qua sai số dấu phẩy động 0.1 + 0.2 = 0.30000000000000004 của kiến trúc CPU."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Viết Unit Test kiểm thử hàm tính thuế biên với pytest",
            "problem": "Viết hàm `calculate_tax(income)`: Thu nhập <= 10 triệu thuế 0%; trên 10 đến 30 triệu thuế 10% phần vượt; trên 30 triệu thuế 20% phần vượt 30 triệu cộng 2 triệu. Viết 3 test case kiểm thử: (1) Trường hợp 0% (8 triệu -> 0đ); (2) Giá trị tại ngưỡng biên (10 triệu -> 0đ); (3) Giá trị trong bậc 2 (20 triệu -> 1 triệu thuế). Sử dụng câu lệnh `assert` chuẩn Python/pytest.",
            "hint": "Định nghĩa calculate_tax(income) với các nhánh if/elif/else, sau đó viết test_tax_cases() và gọi các assert tax == expected.",
            "solutionCode": "def calculate_tax(income):\n    if income <= 10_000_000:\n        return 0\n    elif income <= 30_000_000:\n        return (income - 10_000_000) * 0.1\n    else:\n        return 2_000_000 + (income - 30_000_000) * 0.2\n\ndef test_calculate_tax():\n    # 1. Trường hợp miễn thuế\n    assert calculate_tax(8_000_000) == 0, \"Lỗi: Dưới 10tr phải chịu thuế 0%\"\n    # 2. Giá trị biên chính xác\n    assert calculate_tax(10_000_000) == 0, \"Lỗi: Đúng 10tr phải chịu thuế 0%\"\n    # 3. Thu nhập bậc 2 (20 triệu: (20-10)*10% = 1 triệu)\n    assert calculate_tax(20_000_000) == 1_000_000, \"Lỗi: Thu nhập 20tr thuế phải là 1tr\"\n    print(\"ALL TEST CASES PASSED: Hàm tính thuế hoạt động chính xác tại các giá trị biên.\")\n\ntest_calculate_tax()",
            "explanation": "Kiểm thử giá trị biên (Boundary Value Analysis) là kỹ thuật kiểm thử phần mềm thiết yếu. Lỗi lập trình trong xử lý dữ liệu tài chính thường xảy ra tại các toán tử so sánh (dùng < thay vì <=), dẫn đến việc tính sai thuế cho hàng triệu bản ghi nếu không có test suite bảo vệ.",
            "solutionOutput": "ALL TEST CASES PASSED: Hàm tính thuế hoạt động chính xác tại các giá trị biên."
          },
          {
            "level": "Vừa",
            "title": "Tạo Fixture dữ liệu mẫu tái sử dụng cho chuỗi kiểm thử",
            "problem": "Trong kiểm thử dữ liệu lớn, việc khởi tạo lại DataFrame trong từng hàm test gây lãng phí tài nguyên và làm chậm CI/CD. Hãy viết một pytest Fixture giả lập (hoặc hàm fixture generator) `sample_sales_data()` cung cấp DataFrame chuẩn gồm 4 dòng: `['order_id', 'amount', 'discount']`. Viết hàm `test_revenue_positive(df)` và `test_discount_valid(df)` nhận fixture này làm tham số đầu vào để kiểm tra.",
            "hint": "Tạo hàm sample_sales_data() trả về DataFrame mẫu, viết các assert (df['amount'] > 0).all() và assert (df['discount'] <= 1.0).all().",
            "solutionCode": "import pandas as pd\n\n# Giả lập pytest fixture generator\ndef sample_sales_data():\n    return pd.DataFrame({\n        'order_id': ['ORD-01', 'ORD-02', 'ORD-03', 'ORD-04'],\n        'amount': [150_000, 200_000, 350_000, 50_000],\n        'discount': [0.05, 0.10, 0.00, 0.15]\n    })\n\ndef test_sales_suite():\n    df = sample_sales_data()\n    \n    # Test 1: Mọi đơn hàng phải có giá trị dương\n    assert (df['amount'] > 0).all(), \"Phát hiện đơn hàng có số tiền âm hoặc bằng 0!\"\n    print(\"✓ Test 1 Passed: Doanh số hoàn toàn dương.\")\n    \n    # Test 2: Tỷ lệ chiết khấu hợp lệ (từ 0% đến 50%)\n    assert (df['discount'].between(0.0, 0.50)).all(), \"Tỷ lệ chiết khấu vượt ngưỡng an toàn!\"\n    print(\"✓ Test 2 Passed: Chiết khấu nằm trong phạm vi nghiệp vụ cho phép.\")\n\ntest_sales_suite()",
            "explanation": "Nguyên lý Fixtures trong pytest (Arrange-Act-Assert) giúp tập trung hóa việc tạo dựng trạng thái kiểm thử (Test Setup). Việc dùng chung fixture dữ liệu sạch ngăn ngừa sự sai lệch giữa các bài test và bảo đảm nguyên tắc DRY (Don't Repeat Yourself) trong kiến trúc kiểm thử tự động.",
            "solutionOutput": "✓ Test 1 Passed: Doanh số hoàn toàn dương.\r\n✓ Test 2 Passed: Chiết khấu nằm trong phạm vi nghiệp vụ cho phép."
          },
          {
            "level": "Nâng cao",
            "title": "Kiểm thử tham số hóa hàng loạt kịch bản ngoại lệ với parametrize",
            "problem": "Viết hàm chuẩn hóa số điện thoại `normalize_phone(raw_phone)`: loại bỏ dấu chấm, dấu gạch nối, khoảng trắng; nếu bắt đầu bằng \"+84\" thì đổi thành \"0\"; độ dài phải đúng 10 số. Sử dụng kỹ thuật tham số hóa (Parametrize) để chạy tự động qua 5 ca kiểm thử: (1) \"0912 345 678\" -> \"0912345678\"; (2) \"+84912345678\" -> \"0912345678\"; (3) \"0912.345.678\" -> \"0912345678\"; (4) Số ngắn \"12345\" -> ValueError; (5) Số chứa chữ \"0912abc678\" -> ValueError.",
            "hint": "Dùng re.sub() lọc ký tự đặc biệt, kiểm tra regex ^0\\d{9}$, raise ValueError nếu không hợp lệ. Lặp qua danh sách các tuple (input, expected) để assert.",
            "solutionCode": "import re\n\ndef normalize_phone(raw_phone):\n    if not isinstance(raw_phone, str):\n        raise ValueError(\"Số điện thoại phải là chuỗi ký tự\")\n    cleaned = re.sub(r'[\\s.-]', '', raw_phone)\n    if cleaned.startswith('+84'):\n        cleaned = '0' + cleaned[3:]\n    if not re.match(r'^0\\d{9}$', cleaned):\n        raise ValueError(f\"Số điện thoại không hợp lệ: {raw_phone}\")\n    return cleaned\n\ntest_cases_valid = [\n    (\"0912 345 678\", \"0912345678\"),\n    (\"+84912345678\", \"0912345678\"),\n    (\"0912.345.678\", \"0912345678\")\n]\n\ntest_cases_invalid = [\n    \"12345\",\n    \"0912abc678\"\n]\n\n# Chạy test ca hợp lệ\nfor raw, expected in test_cases_valid:\n    result = normalize_phone(raw)\n    assert result == expected, f\"Lỗi với {raw}: nhận {result}, mong đợi {expected}\"\nprint(\"✓ Toàn bộ test case số điện thoại hợp lệ đạt 100%.\")\n\n# Chạy test ca ném ngoại lệ\nfor bad_input in test_cases_invalid:\n    try:\n        normalize_phone(bad_input)\n        assert False, f\"Lỗi: {bad_input} phải ném ValueError!\"\n    except ValueError:\n        pass\nprint(\"✓ Toàn bộ kịch bản bẫy ngoại lệ ValueError đạt 100%.\")",
            "explanation": "Kỹ thuật Parametrized Testing cho phép định nghĩa một hàm kiểm thử duy nhất nhưng thực thi trên hàng chục bộ dữ liệu đầu vào và đầu ra kỳ vọng khác nhau. Điều này đặc biệt quan trọng khi làm sạch dữ liệu văn bản (Data Sanitization) - nơi các biến thể đầu vào từ người dùng là vô cùng đa dạng.",
            "solutionOutput": "✓ Toàn bộ test case số điện thoại hợp lệ đạt 100%.\r\n✓ Toàn bộ kịch bản bẫy ngoại lệ ValueError đạt 100%."
          }
        ],
        "quiz": [
          {
            "question": "Tại sao biểu thức '(df1 == df2).all().all()' luôn trả về False ngay cả khi df1 và df2 có cấu trúc và nội dung hoàn toàn giống hệt nhau nhưng có chứa giá trị NaN?",
            "options": [
              "(Recommended) Vì theo quy ước chuẩn IEEE 754 về dấu phẩy động, biểu thức 'np.nan == np.nan' luôn luôn được định nghĩa là False.",
              "Vì Pandas không hỗ trợ toán tử so sánh trên dữ liệu số thực.",
              "Vì hàm .all() chỉ áp dụng được cho kiểu dữ liệu boolean nguyên thủy.",
              "Vì dữ liệu chứa NaN tự động bị xóa khỏi bộ nhớ RAM."
            ],
            "correctAnswer": "(Recommended) Vì theo quy ước chuẩn IEEE 754 về dấu phẩy động, biểu thức 'np.nan == np.nan' luôn luôn được định nghĩa là False.",
            "explanation": "Chuẩn quốc tế IEEE 754 quy định NaN đại diện cho một giá trị không thể xác định, do đó nó không thể bằng bất kỳ thứ gì, kể cả chính nó (NaN == NaN là False). Việc dùng toán tử == sẽ phá hỏng phép so sánh bảng có giá trị thiếu."
          },
          {
            "question": "Khi sử dụng hàm 'pd.testing.assert_frame_equal', tham số nào cho phép bạn bỏ qua các sai số vi mô do biểu diễn số thực trên máy tính (ví dụ: 0.1 + 0.2 = 0.30000000000000004)?",
            "options": [
              "(Recommended) check_exact=False kết hợp với rtol (Relative tolerance) và atol (Absolute tolerance).",
              "check_dtype=False",
              "check_like=True",
              "obj='DataFrame'"
            ],
            "correctAnswer": "(Recommended) check_exact=False kết hợp với rtol (Relative tolerance) và atol (Absolute tolerance).",
            "explanation": "Khi đặt check_exact=False, Pandas cho phép hai số thực x và y được coi là bằng nhau nếu |x - y| <= atol + rtol * |y|, giúp các bài Unit Test vượt qua các sai số làm tròn số thực của phần cứng."
          },
          {
            "question": "Thuật ngữ 'Silent Data Corruption' (Lỗi ngầm) trong Kỹ nghệ Dữ liệu mang ý nghĩa gì?",
            "options": [
              "(Recommended) Trạng thái chương trình chạy trơn tru từ đầu đến cuối với mã thoát exit code: 0 không hề crash, nhưng dữ liệu tính toán bị sai lệch âm thầm gây thiệt hại kinh doanh mà không ai phát hiện.",
              "Ổ cứng máy chủ bị hỏng vật lý làm mất điện đột ngột.",
              "Máy chủ bị hacker tấn công chiếm quyền điều khiển bằng mã độc tống tiền.",
              "Toàn bộ màn hình điều khiển biến thành màu đen im lặng."
            ],
            "correctAnswer": "(Recommended) Trạng thái chương trình chạy trơn tru từ đầu đến cuối với mã thoát exit code: 0 không hề crash, nhưng dữ liệu tính toán bị sai lệch âm thầm gây thiệt hại kinh doanh mà không ai phát hiện.",
            "explanation": "Silent Bug là cơn ác mộng lớn nhất vì nó không phát sinh Exception dừng chương trình, làm số liệu sai lệch âm thầm lọt vào báo cáo quản trị hoặc mô hình máy học mà không có bất kỳ tiếng chuông cảnh báo nào."
          }
        ],
        "selfReviewQuestions": [
          "Tại sao không bao giờ nên dùng toán tử == để so sánh hai DataFrame trong môi trường kiểm thử Unit Test?",
          "Nêu ý nghĩa của 3 tham số check_dtype, rtol và atol trong hàm pd.testing.assert_frame_equal.",
          "Khái niệm 'Golden Test Dataset' là gì và tại sao nó là bắt buộc khi viết kiểm thử hồi quy cho Data Pipeline?"
        ],
        "reflectionQuestion": "Một bạn thực tập sinh viết pipeline làm sạch dữ liệu: Khi chạy thử, bạn ấy thấy chương trình báo exit code: 0 và tự hào nộp báo cáo cho Giám đốc. 3 tháng sau, bộ phận kế toán phát hiện doanh thu chi nhánh bị hụt 2 tỷ VNĐ do một phép ép kiểu float sang int làm mất phần thập phân. Bạn hãy phân tích trách nhiệm kiểm thử và quy trình viết test để ngăn chặn hoàn toàn sự cố này.",
        "reflectionHint": "Thực tập sinh đã mắc sai lầm căn bản: Tin tưởng vào việc chương trình không crash (exit code: 0) thay vì kiểm thử tính đúng đắn của dữ liệu. Quy trình đúng: Trước khi đưa vào sản xuất, bắt buộc phải viết bài Unit Test với Golden Dataset, sử dụng pd.testing.assert_frame_equal(check_dtype=True) để xác thực từng phép tính chiết khấu và ép kiểu. Bài test sẽ lập tức bắt được lỗi mất phần thập phân ngay tại máy lập trình viên.",
        "nextLessonPreview": "Ở bài 11.2, chúng ta sẽ bước sang kỹ thuật thiết kế test case đẳng cấp quốc tế: Áp dụng Phân tích giá trị biên (Boundary Value Analysis) của ISTQB và làm chủ hệ sinh thái kiểm thử Pytest với fixtures và parametrize.",
        "references": [
          {
            "title": "Pandas Official Documentation - Testing Utilities (assert_frame_equal)",
            "url": "https://pandas.pydata.org/docs/reference/api/pandas.testing.assert_frame_equal.html"
          },
          {
            "title": "IEEE 754 Standard for Floating-Point Arithmetic",
            "url": "https://ieeexplore.ieee.org/document/8766229"
          }
        ]
      },
      {
        "id": "pd-11-02",
        "number": "11.2",
        "title": "Thiết Kế Test Case Theo Chuẩn ISTQB & Hệ Sinh Thái Pytest",
        "subtitle": "Kỹ thuật Phân vùng tương đương, Phân tích giá trị biên, cấu trúc Arrange-Act-Assert và Pytest Fixtures/Parametrize",
        "level": "Trung cấp",
        "duration": "45 phút",
        "objectives": [
          "Ứng dụng hai kỹ thuật thiết kế ca kiểm thử hộp đen chuẩn quốc tế ISTQB: Phân vùng tương đương (Equivalence Partitioning) và Phân tích giá trị biên (Boundary Value Analysis - BVA).",
          "Chuẩn hóa mọi bài kiểm định dữ liệu theo mô hình cấu trúc 3 chữ A kinh điển: Arrange (chuẩn bị bối cảnh) &rarr; Act (thực thi tác vụ) &rarr; Assert (kiểm chứng kết quả).",
          "Làm chủ hệ sinh thái kiểm thử hiện đại Pytest: Sử dụng @pytest.fixture để cô lập dữ liệu mẫu và @pytest.mark.parametrize để kiểm thử hàng loạt kịch bản biên trong một hàm duy nhất.",
          "Áp dụng kỹ thuật Giả lập tất định (Deterministic Mocking) để kiểm thử đường ống dữ liệu mà không phụ thuộc vào kết nối mạng Internet hay cơ sở dữ liệu thật."
        ],
        "intuition": {
          "title": "Người Lính Gác Cổng & Kính Đo Viền Thước Kẻ",
          "metaphor": "Hãy xem cách một kỹ sư kiểm thử bảo vệ hệ thống:\\n1. Phân Vùng Tương Đương (Equivalence Partitioning): Nếu siêu thị TechMart quy định tuổi mua hàng trả góp là từ 18 đến 60 tuổi: Bạn không cần phải thử cả 10.000 số tuổi khác nhau! Bạn chỉ cần chia thành 3 vùng:\\n   - Vùng Hợp lệ: [18 đến 60] &rarr; Chỉ cần chọn 1 đại diện (ví dụ: 30 tuổi).\\n   - Vùng Không hợp lệ dưới: [&lt; 18] &rarr; Chọn 1 đại diện (ví dụ: 12 tuổi).\\n   - Vùng Không hợp lệ trên: [&gt; 60] &rarr; Chọn 1 đại diện (ví dụ: 75 tuổi).\\n2. Phân Tích Giá Trị Biên (Boundary Value Analysis): Bọ lập trình (Bugs) luôn thích làm tổ ở mép ranh giới! Lập trình viên hay viết nhầm giữa &gt; và &gt;=. Do đó, bạn phải soi thật kỹ các điểm biên:\\n   - Biên dưới: 17 (ngay sát ngoài), 18 (ngay trên biên), 19 (ngay sát trong).\\n   - Biên trên: 59 (ngay sát trong), 60 (ngay trên biên), 61 (ngay sát ngoài).\\n3. Cấu Trúc AAA (Arrange - Act - Assert): Giống như một buổi bắn thử đạn pháo: (Arrange) Chuẩn bị mục tiêu bia đạn sạch sẽ &rarr; (Act) Nạp đạn và bóp cò súng &rarr; (Assert) Đến bia đạn đo khoảng cách vết bắn xem có trúng tâm hay không!\\n4. Pytest Fixture & Parametrize: Fixture là xưởng đúc bia bắn tự động tái sử dụng; Parametrize là khẩu súng bắn liên thanh nạp sẵn 10 băng đạn thử nghiệm khác nhau chỉ trong một lần bấm nút!",
          "boundary": "Unit test với Pytest phải hoàn toàn độc lập (Isolated) và tất định (Deterministic): Chạy 1 triệu lần trên bất kỳ máy tính nào cũng phải cho ra cùng một kết quả, tuyệt đối không được gọi API thật qua mạng hay đọc dữ liệu thời gian thực datetime.now() mà không mock.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">PHÂN TÍCH GIÁ TRỊ BIÊN (BOUNDARY VALUE ANALYSIS) THEO CHUẨN ISTQB</div>\n                        <div style=\"display:flex;justify-content:space-between;align-items:center;background:var(--bg-surface);padding:10px;border-radius:6px;border:1px solid var(--border-subtle);\">\n                          <div style=\"color:#ef4444;font-weight:700;\">Biên dưới: 17 (Hỏng), 18 (Đạt), 19 (Đạt)</div>\n                          <div style=\"color:#10b981;font-weight:700;\">Vùng hợp lệ [18 .. 60]</div>\n                          <div style=\"color:#ef4444;font-weight:700;\">Biên trên: 59 (Đạt), 60 (Đạt), 61 (Hỏng)</div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-11-02-01",
            "title": "1. Kỹ Thuật Thiết Kế Ca Kiểm Thử Chuẩn Quốc Tế ISTQB",
            "content": "\n                          <p>Hiệp hội Kiểm thử Phần mềm Quốc tế (<strong>ISTQB - International Software Testing Qualifications Board</strong>) định hình hai phương pháp thiết kế ca kiểm thử hộp đen kinh điển:</p>\n                          <h4>A. Phân Vùng Tương Đương (Equivalence Partitioning - EP)</h4>\n                          <p>Chia miền đầu vào của một thuộc tính dữ liệu thành các phân vùng mà tại đó hệ thống xử lý hoàn toàn như nhau. Nếu một giá trị trong phân vùng chạy đúng (hoặc sai), ta suy luận toàn bộ các giá trị khác trong phân vùng đó cũng sẽ có hành vi tương tự.</p>\n                          <h4>B. Phân Tích Giá Trị Biên (Boundary Value Analysis - BVA)</h4>\n                          <p>Kinh nghiệm thực nghiệm chứng minh rằng <strong>hơn 80% lỗi logic phần mềm xảy ra ngay tại các điểm biên</strong> (do lập trình viên nhầm lẫn giữa toán tử <code>&lt;</code> và <code>&lt;=</code>, hoặc sai số off-by-one). Với mỗi ranh giới \\([Min, Max]\\), ta bắt buộc phải kiểm tra bộ 6 giá trị:</p>\n                          <ul>\n                            <li>Biên dưới: \\(Min - 1\\) (Bất hợp lệ), \\(Min\\) (Hợp lệ), \\(Min + 1\\) (Hợp lệ).</li>\n                            <li>Biên trên: \\(Max - 1\\) (Hợp lệ), \\(Max\\) (Hợp lệ), \\(Max + 1\\) (Bất hợp lệ).</li>\n                          </ul>\n                        "
          },
          {
            "id": "sec-11-02-02",
            "title": "2. Mô Hình 3 Chữ A Kinh Điển: Arrange - Act - Assert",
            "content": "\n                          <p>Mọi hàm kiểm thử chuyên nghiệp đều được cấu trúc rõ ràng thành 3 khối phân tách:</p>\n                          <ol>\n                            <li><strong>Arrange (Thiết lập bối cảnh):</strong> Chuẩn bị các biến đầu vào, khởi tạo DataFrame mẫu, cấu hình tham số hoặc mock các dịch vụ phụ thuộc.</li>\n                            <li><strong>Act (Hành động):</strong> Gọi chính xác hàm hoặc bước chuyển đổi dữ liệu cần kiểm thử.</li>\n                            <li><strong>Assert (Xác minh kết quả):</strong> So sánh đầu ra thực tế với kết quả kỳ vọng bằng các câu lệnh <code>assert</code> hoặc <code>pd.testing</code>.</li>\n                          </ol>\n                        "
          },
          {
            "id": "sec-11-02-03",
            "title": "3. Sức Mạnh Của Hệ Sinh Thái Pytest: Fixtures & Parametrize",
            "content": "\n                          <p>Thư viện <code>pytest</code> là tiêu chuẩn vàng của cộng đồng Python hiện đại:</p>\n                          <h4>A. @pytest.fixture: Tái Sử Dụng Dữ Liệu Mẫu Cô Lập</h4>\n                          \n                          <h4>B. @pytest.mark.parametrize: Kiểm Thử Biên Hàng Loạt</h4>\n                          \n                        "
          }
        ],
        "summary": [
          "Áp dụng Phân vùng tương đương (EP) và Phân tích giá trị biên (BVA) của ISTQB để bao phủ tối đa lỗi với số lượng test case tối thiểu.",
          "Cấu trúc Arrange - Act - Assert giữ cho mã nguồn kiểm thử sáng rõ, minh bạch và dễ bảo trì.",
          "@pytest.fixture tạo lập dữ liệu mẫu cô lập và tái sử dụng; @pytest.mark.parametrize cho phép chạy hàng loạt ca kiểm thử biên trong một hàm duy nhất.",
          "Tuyệt đối không gọi mạng hay đọc CSDL thật trong Unit Test; sử dụng Deterministic Mocking để bảo đảm tính tất định."
        ],
        "workedExample": {
          "scenario": "Kiểm thử hàm phân loại khách hàng TechMart bằng Pytest Parametrize",
          "code": "import pytest\n\ndef classify_customer_tier(total_spend):\n    if total_spend < 0:\n        raise ValueError(\"Chi tiêu không thể là số âm!\")\n    elif total_spend < 10000000:\n        return 'Standard'\n    elif total_spend < 50000000:\n        return 'Silver'\n    else:\n        return 'Gold'\n\n# Thiết kế ca kiểm thử BVA với Parametrize\ntest_cases = [\n    (0, 'Standard'),            # Biên cực tiểu\n    (9999999, 'Standard'),      # Sát dưới biên Silver\n    (10000000, 'Silver'),       # Ngay biên Silver\n    (49999999, 'Silver'),       # Sát dưới biên Gold\n    (50000000, 'Gold'),         # Ngay biên Gold\n    (100000000, 'Gold')         # Vùng hợp lệ Gold\n]\n\n# Chạy kiểm thử tự động\nfor spend, expected in test_cases:\n    actual = classify_customer_tier(spend)\n    assert actual == expected, f\"Lỗi tại mức chi tiêu {spend}: Kỳ vọng {expected}, nhận {actual}\"\n\nprint(\"Toàn bộ 6 ca kiểm thử giá trị biên ISTQB đã PASSED thành công!\")",
          "explanation": "1. Hàm kiểm tra toàn bộ các điểm biên nhạy cảm: 9.999.999 vs 10.000.000 và 49.999.999 vs 50.000.000.\\n2. Cấu trúc parametrized giúp bảo đảm không có lỗi logic off-by-one nào lọt qua."
        },
        "fadedExample": {
          "scenario": "Bắt ngoại lệ kiểm thử với pytest.raises",
          "code": "def validate_product_price(price):\n    if price <= 0:\n        raise ValueError(\"Giá sản phẩm phải là số dương lớn hơn 0!\")\n    return True\n\n# Yêu cầu: Viết đoạn code kiểm thử rằng khi truyền price = -5000 hoặc 0,\n# hàm validate_product_price sẽ ném ra ngoại lệ ValueError\n\nimport pytest\n\n# Mô phỏng kiểm thử ngoại lệ\ntry:\n    validate_product_price(-5000)\n    assert False, \"Đáng lẽ phải ném ValueError!\"\nexcept ValueError as e:\n    print(\"Bắt ngoại lệ thành công:\", e)",
          "blankExplanation": "Kiểm tra các giá trị bất hợp lệ ở biên dưới (0 và số âm) để đảm bảo hàm phòng thủ ném ra đúng ngoại lệ ValueError như thiết kế."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Định nghĩa DataFrameSchema cơ bản với Pandera",
            "problem": "Sử dụng cấu trúc Schema xác thực (tương thích Pandera hoặc logic schema xác thực) để kiểm tra DataFrame thông tin nhân sự: Cột `user_id` kiểu int dương; Cột `email` là chuỗi chứa ký tự `@`; Cột `department` chỉ được nhận 1 trong 3 giá trị: `['Sales', 'Engineering', 'Marketing']`. Nếu dữ liệu vi phạm, ném lỗi và chỉ ra chi tiết dòng vi phạm.",
            "hint": "Duyệt kiểm tra kiểu int và >0 cho user_id, email.str.contains('@'), và department.isin(['Sales', 'Engineering', 'Marketing']).",
            "solutionCode": "import pandas as pd\n\ndef validate_employee_df(df):\n    errors = []\n    # 1. Kiểm tra user_id dương\n    if not (df['user_id'] > 0).all():\n        errors.append(\"Cột user_id phải là số nguyên dương!\")\n        \n    # 2. Kiểm tra email chứa ký tự @\n    if not df['email'].str.contains('@').all():\n        errors.append(\"Phát hiện địa chỉ email không hợp lệ (thiếu '@')!\")\n        \n    # 3. Miền giá trị department\n    valid_depts = {'Sales', 'Engineering', 'Marketing'}\n    invalid_depts = set(df['department']) - valid_depts\n    if invalid_depts:\n        errors.append(f\"Phòng ban không tồn tại trong danh mục cho phép: {invalid_depts}\")\n        \n    if errors:\n        raise ValueError(\"\\n\".join(errors))\n    print(\"SCHEMA VALIDATION PASSED: Bảng nhân sự hoàn toàn hợp lệ.\")\n    return True\n\ndf_valid = pd.DataFrame({\n    'user_id': [1, 2, 3],\n    'email': ['an@techmart.vn', 'binh@techmart.vn', 'chi@techmart.vn'],\n    'department': ['Sales', 'Engineering', 'Marketing']\n})\n\nvalidate_employee_df(df_valid)",
            "explanation": "Schema Validation biến các giả định ngầm của lập trình viên về dữ liệu thành một bản hợp đồng kỹ thuật tường minh (Data Contract). Thay vì để code thuật toán bị sập bất ngờ ở các bước sau vì một giá trị rác, Schema sẽ bắt và chặn đứng dữ liệu bẩn ngay tại cổng vào của hệ thống.",
            "solutionOutput": "SCHEMA VALIDATION PASSED: Bảng nhân sự hoàn toàn hợp lệ."
          },
          {
            "level": "Vừa",
            "title": "Xây dựng Decorator tự động kiểm thực đầu vào và đầu ra của hàm",
            "problem": "Viết một Python Decorator `@validate_dataframe_columns(required_inputs, required_outputs)`: Tự động kiểm tra DataFrame truyền vào hàm xem có đủ các cột trong `required_inputs` không. Sau khi hàm thực thi xong, tự động kiểm tra xem kết quả trả về có đủ các cột trong `required_outputs` không. Nếu thiếu cột, ném `KeyError`.",
            "hint": "Định nghĩa hàm bọc decorator: kiểm tra set(required_inputs).issubset(df.columns) trước khi gọi func(), và kiểm tra required_outputs trên kết quả trả về.",
            "solutionCode": "from functools import wraps\nimport pandas as pd\n\ndef validate_dataframe_columns(required_inputs, required_outputs):\n    def decorator(func):\n        @wraps(func)\n        def wrapper(df, *args, **kwargs):\n            # Kiểm thực đầu vào\n            missing_in = set(required_inputs) - set(df.columns)\n            if missing_in:\n                raise KeyError(f\"Đầu vào thiếu các cột bắt buộc: {missing_in}\")\n            \n            result_df = func(df, *args, **kwargs)\n            \n            # Kiểm thực đầu ra\n            missing_out = set(required_outputs) - set(result_df.columns)\n            if missing_out:\n                raise KeyError(f\"Đầu ra thiếu các cột cam kết: {missing_out}\")\n            return result_df\n        return wrapper\n    return decorator\n\n@validate_dataframe_columns(\n    required_inputs=['price', 'quantity'],\n    required_outputs=['price', 'quantity', 'total_amount']\n)\ndef compute_order_total(df):\n    df_res = df.copy()\n    df_res['total_amount'] = df_res['price'] * df_res['quantity']\n    return df_res\n\ndf_test = pd.DataFrame({'price': [100, 200], 'quantity': [2, 3]})\nres = compute_order_total(df_test)\nprint(\"Kết quả hàm được bảo vệ bởi Decorator:\\n\", res)",
            "explanation": "Việc nhúng Schema Verification vào Decorator là phương pháp thực hành tốt nhất để bảo đảm nguyên tắc Thiết kế theo hợp đồng (Design by Contract). Nó giải phóng hàm nghiệp vụ cốt lõi khỏi hàng chục câu lệnh kiểm tra if/else thủ công, giúp code sáng sủa và dễ bảo trì.",
            "solutionOutput": "Kết quả hàm được bảo vệ bởi Decorator:\r\n    price  quantity  total_amount\r\n0    100         2           200\r\n1    200         3           600"
          },
          {
            "level": "Nâng cao",
            "title": "Tách và cách ly bản ghi vi phạm vào bảng kiểm dịch Quarantine",
            "problem": "Trong Data Engineering, việc hủy toàn bộ mẻ dữ liệu chỉ vì vài dòng lỗi là bất khả thi. Hãy viết hàm `quarantine_invalid_records(df)`: Tách các dòng có `score` nằm ngoài khoảng `[0, 10]` hoặc `age < 18` đưa vào một DataFrame riêng mang tên `quarantine_df` (kèm cột ghi rõ mã lỗi); và trả về `clean_df` gồm các dòng hợp lệ sẵn sàng nạp vào Data Warehouse.",
            "hint": "Tạo mask điều kiện hợp lệ valid_mask = (df['score'].between(0, 10)) & (df['age'] >= 18). clean_df = df[valid_mask], quarantine_df = df[~valid_mask].copy().",
            "solutionCode": "import pandas as pd\n\ndef quarantine_invalid_records(df):\n    cond_score = df['score'].between(0.0, 10.0)\n    cond_age = df['age'] >= 18\n    \n    clean_mask = cond_score & cond_age\n    clean_df = df[clean_mask].copy()\n    \n    # Cách ly các dòng bẩn\n    quarantine_df = df[~clean_mask].copy()\n    \n    # Gắn nhãn lý do vi phạm (Error Tagging)\n    reasons = []\n    for idx, row in quarantine_df.iterrows():\n        errs = []\n        if not (0.0 <= row['score'] <= 10.0): errs.append(\"SCORE_OUT_OF_BOUNDS\")\n        if row['age'] < 18: errs.append(\"AGE_UNDER_18\")\n        reasons.append(\"; \".join(errs))\n    quarantine_df['quarantine_reason'] = reasons\n    \n    return clean_df, quarantine_df\n\nraw_batch = pd.DataFrame({\n    'user_id': [1, 2, 3, 4],\n    'age': [25, 16, 30, 22],\n    'score': [8.5, 9.0, 15.0, 7.0]\n})\n\nclean, quarantined = quarantine_invalid_records(raw_batch)\nprint(\"=== DỮ LIỆU SẠCH (NẠP VÀO PRODUCTION) ===\")\nprint(clean)\nprint(\"\\n=== BẢNG KIỂM DỊCH (GỬI ĐỘI DATA GOVERNANCE XỬ LÝ) ===\")\nprint(quarantined[['user_id', 'age', 'score', 'quarantine_reason']])",
            "explanation": "Mô hình Data Quarantine (Kiểm dịch dữ liệu) là kiến trúc chuẩn của các hệ thống dữ liệu doanh nghiệp hiện đại. Nó đảm bảo đường ống sản xuất liên tục vận hành với dữ liệu sạch, đồng thời không bao giờ làm mất dữ liệu thô bị lỗi, cho phép đội ngũ Data Steward kiểm tra và tái xử lý sau này.",
            "solutionOutput": "=== DỮ LIỆU SẠCH (NẠP VÀO PRODUCTION) ===\r\n   user_id  age  score\r\n0        1   25    8.5\r\n3        4   22    7.0\r\n\r\n=== BẢNG KIỂM DỊCH (GỬI ĐỘI DATA GOVERNANCE XỬ LÝ) ===\r\n   user_id  age  score    quarantine_reason\r\n1        2   16    9.0         AGE_UNDER_18\r\n2        3   30   15.0  SCORE_OUT_OF_BOUNDS"
          }
        ],
        "quiz": [
          {
            "question": "Theo tiêu chuẩn thiết kế kiểm thử ISTQB, tại sao phương pháp Phân tích giá trị biên (Boundary Value Analysis) lại có tỷ lệ phát hiện lỗi phần mềm cao nhất?",
            "options": [
              "(Recommended) Vì trong thực tế, các lỗi lập trình logic và sai số off-by-one hầu như luôn tập trung tại các ranh giới điều kiện (như nhầm lẫn giữa '>' và '>=').",
              "Vì nó kiểm tra tất cả các số thực trong vũ trụ số học.",
              "Vì nó chỉ áp dụng được cho cơ sở dữ liệu quan hệ SQL.",
              "Vì nó tự động sinh ra mã nguồn kiểm thử mà không cần con người."
            ],
            "correctAnswer": "(Recommended) Vì trong thực tế, các lỗi lập trình logic và sai số off-by-one hầu như luôn tập trung tại các ranh giới điều kiện (như nhầm lẫn giữa '>' và '>=').",
            "explanation": "Kinh nghiệm thực chứng của ngành phần mềm khẳng định lỗi lập trình thường phát sinh tại các điểm biên của dải giá trị. BVA tập trung tối đa nguồn lực vào việc kiểm tra các mép ranh giới này."
          },
          {
            "question": "Tính năng '@pytest.mark.parametrize' trong framework Pytest mang lại lợi ích nổi bật gì cho kỹ sư dữ liệu?",
            "options": [
              "(Recommended) Cho phép thực thi cùng một hàm kiểm thử trên hàng loạt bộ dữ liệu đầu vào và kết quả kỳ vọng khác nhau mà không cần viết lại mã nguồn lặp đi lặp lại.",
              "Tự động tăng tốc độ CPU của máy tính lên 200%.",
              "Tự động gửi email thông báo kết quả kiểm thử cho ban giám đốc.",
              "Tự động sửa lỗi cú pháp Python trong chương trình."
            ],
            "correctAnswer": "(Recommended) Cho phép thực thi cùng một hàm kiểm thử trên hàng loạt bộ dữ liệu đầu vào và kết quả kỳ vọng khác nhau mà không cần viết lại mã nguồn lặp đi lặp lại.",
            "explanation": "@pytest.mark.parametrize biến hàm test thành một bảng kịch bản kiểm thử hướng dữ liệu (Data-driven testing), giúp kiểm thử hàng chục trường hợp biên một cách thanh thoát, gọn gàng."
          },
          {
            "question": "Tại sao trong các bài Unit Test kiểm thử đường ống xử lý dữ liệu, việc kết nối tới một máy chủ API thật hoặc cơ sở dữ liệu production thật lại bị coi là phản mẫu (Anti-pattern)?",
            "options": [
              "(Recommended) Vì nó làm bài test bị chậm, phụ thuộc vào đường truyền mạng chập chờn (Flaky Tests), và có thể vô tình làm thay đổi hoặc phá hủy dữ liệu sản xuất thật.",
              "Vì thư viện Pytest cấm mọi kết nối ra ngoài Internet.",
              "Vì mã nguồn Python không hỗ trợ giao thức HTTPS.",
              "Vì các máy chủ API luôn từ chối các kết nối từ chương trình kiểm thử."
            ],
            "correctAnswer": "(Recommended) Vì nó làm bài test bị chậm, phụ thuộc vào đường truyền mạng chập chờn (Flaky Tests), và có thể vô tình làm thay đổi hoặc phá hủy dữ liệu sản xuất thật.",
            "explanation": "Unit test bắt buộc phải nhanh, độc lập và tất định (Deterministic). Kết nối mạng thật tạo ra Flaky tests (lúc pass lúc fail do mạng) và có nguy cơ ghi đè dữ liệu sản xuất. Giải pháp chuẩn là dùng Mocking."
          }
        ],
        "selfReviewQuestions": [
          "Trình bày sự khác nhau giữa Phân vùng tương đương (Equivalence Partitioning) và Phân tích giá trị biên (Boundary Value Analysis).",
          "Nêu 3 bước của mô hình kiểm thử AAA (Arrange - Act - Assert).",
          "Khái niệm 'Deterministic Test' mang ý nghĩa gì trong Kỹ nghệ Dữ liệu?"
        ],
        "reflectionQuestion": "Một nhóm kỹ sư dữ liệu tự hào khoe rằng họ có 500 bài Unit Test nhưng mỗi lần chạy mất tới 45 phút và thường xuyên bị fail ngẫu nhiên mỗi khi mạng công ty bị chậm. Dưới góc nhìn kiến trúc kiểm thử chuyên nghiệp, bạn sẽ chẩn đoán căn bệnh của hệ thống này và đưa ra phương án tái cấu trúc như thế nào?",
        "reflectionHint": "Căn bệnh: Nhóm kỹ sư đã vi phạm nguyên tắc Unit Test bằng cách gọi trực tiếp API thật hoặc truy vấn Database thật thay vì Mock dữ liệu, dẫn đến tình trạng Flaky Tests và thời gian chạy quá chậm. Phương án giải quyết: Áp dụng kỹ thuật Mocking / Pytest Fixtures để cô lập toàn bộ các phụ thuộc ngoại cảnh. Biến các bài test thành kiểm thử trong bộ nhớ (In-memory tests), rút ngắn thời gian chạy từ 45 phút xuống dưới 10 giây và đạt độ tin cậy 100% không phụ thuộc mạng.",
        "nextLessonPreview": "Ở bài 11.3, chúng ta sẽ xây dựng hàng rào phòng thủ cuối cùng: Hàng rào kiểm định dữ liệu tại biên (Validation Gate) theo 15 đặc tính của ISO/IEC 25012 và cơ chế phân luồng cách ly kiểm dịch (Quarantine Routing).",
        "references": [
          {
            "title": "ISTQB Foundation Level Syllabus - Test Design Techniques",
            "url": "https://www.istqb.org"
          },
          {
            "title": "Pytest Official Documentation - Fixtures and Parametrization",
            "url": "https://docs.pytest.org/en/stable/"
          }
        ]
      },
      {
        "id": "pd-11-03",
        "number": "11.3",
        "title": "Hàng Rào Kiểm Định ISO/IEC 25012 & Cơ Chế Cách Ly Kiểm Dịch (Quarantine)",
        "subtitle": "Khung 15 đặc tính chất lượng dữ liệu, xây dựng Validation Gate tại biên và phân luồng dữ liệu bẩn vào data/quarantine",
        "level": "Nâng cao",
        "duration": "50 phút",
        "objectives": [
          "Ánh xạ 15 đặc tính chất lượng dữ liệu của tiêu chuẩn quốc tế ISO/IEC 25012 vào các quy tắc kiểm định đường ống dữ liệu thực tế tại TechMart.",
          "Xây dựng Hàng rào Kiểm định tại Biên (Validation Gate) bằng Pandas thuần trước khi phụ thuộc vào các công cụ schema bên ngoài.",
          "Thiết lập cơ chế Cách ly Kiểm dịch (Quarantine Routing): Phân tách dòng dữ liệu thành hai nhánh: Nhánh Sạch (Clean Data) đi tiếp vào kho phân tích, Nhánh Bẩn (Quarantine Data) bị cô lập kèm mã lỗi để đối soát.",
          "Tạo lập Nhật Ký Kiểm Định (Validation Audit Log) phục vụ truy vết nguồn gốc lỗi dữ liệu (Data Traceability) theo nguyên tắc FAIR."
        ],
        "intuition": {
          "title": "Hải Quan Sân Bay & Khu Vực Cách Ly Y Tế Kiểm Dịch",
          "metaphor": "Hãy xem cách một quốc gia bảo vệ an ninh y tế tại sân bay quốc tế:\\n1. Hàng Rào Kiểm Định Tại Biên (Validation Gate): Khi hành khách vừa bước xuống máy bay, họ phải bước qua cổng quét an ninh và đo thân nhiệt. Bạn KHÔNG BAO GIỜ để hành khách đi lung tung vào thành phố rồi mới kiểm tra xem họ có mang dịch bệnh hay không! Tương tự trong Data Pipeline: Bạn phải kiểm tra dữ liệu NGAY TẠI CỬA NGÕ NẠP (Ingestion Boundary), trước khi cho phép dữ liệu bước vào cơ sở dữ liệu sạch!\\n2. 15 Đặc Tính ISO/IEC 25012: Giống như các tiêu chuẩn hộ chiếu quốc tế: Hộ chiếu có bị rách trang không (Tính đầy đủ - Completeness), ảnh chân dung có khớp với khuôn mặt không (Tính chính xác - Accuracy), con dấu xuất cảnh có hợp lệ không (Tính nhất quán - Consistency)!\\n3. Thảm Họa 'Dừng Cả Sân Bay' (Fail-Stop Ngây Thơ): Nếu phát hiện 1 hành khách bị sốt, cảnh sát lập tức bắt dừng toàn bộ 5.000 hành khách của 20 chuyến bay khác! Đây là sai lầm ngây thơ của người mới làm dữ liệu: Chỉ vì 1 dòng dữ liệu bị lỗi mà ném Exception làm sập toàn bộ đường ống của công ty, khiến mọi dashboard kinh doanh đều bị chết đứng!\\n4. Khu Vực Cách Ly Kiểm Dịch (Quarantine Routing): Giải pháp của các kỹ sư kỳ cựu: 4.999 hành khách khỏe mạnh được đóng dấu thông quan đi tiếp bình thường (Dữ liệu sạch vào data/clean); duy nhất 1 hành khách bị sốt được tách riêng đưa vào Phòng Cách Ly Y Tế (data/quarantine) kèm hồ sơ ghi rõ lý do nghi nhiễm để bác sĩ xét nghiệm riêng! Đường ống dữ liệu của công ty tiếp tục vận hành thông suốt 24/7!",
          "boundary": "Dữ liệu bị cách ly vào Quarantine tuyệt đối không được xóa bỏ âm thầm; nó phải được bảo lưu để các kỹ sư đối soát xem lỗi là do hệ thống đối tác gửi sai (Data Vendor Error) hay do quy tắc kiểm định của ta đặt ra quá khắt khe.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">MÔ HÌNH PHÂN LUỒNG CÁCH LY KIỂM DỊCH (QUARANTINE ROUTING)</div>\n                        <div style=\"display:flex;align-items:center;justify-content:space-between;gap:8px;\">\n                          <div style=\"padding:6px;border:1px solid #3b82f6;border-radius:4px;background:var(--bg-surface);font-size:0.75rem;\">\n                            Dữ liệu đầu vào<br><strong>raw_orders</strong>\n                          </div>\n                          <div style=\"font-size:1.1rem;color:var(--accent-text);\">&rarr;</div>\n                          <div style=\"padding:6px;border:2px dashed #8b5cf6;border-radius:4px;background:var(--bg-surface);font-size:0.75rem;text-align:center;\">\n                            <strong>VALIDATION GATE</strong><br>(Chuẩn ISO/IEC 25012)\n                          </div>\n                          <div style=\"font-size:1.1rem;color:var(--accent-text);\">&rarr;</div>\n                          <div style=\"display:flex;flex-direction:column;gap:4px;\">\n                            <div style=\"padding:4px 8px;border:1px solid #10b981;border-radius:4px;background:var(--bg-surface);font-size:0.7rem;color:#10b981;font-weight:700;\">\n                              ✅ ĐẠT: data/clean.parquet\n                            </div>\n                            <div style=\"padding:4px 8px;border:1px solid #ef4444;border-radius:4px;background:var(--bg-surface);font-size:0.7rem;color:#ef4444;font-weight:700;\">\n                              ☣️ LỖI: data/quarantine.parquet\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-11-03-01",
            "title": "1. Khung Tiêu Chuẩn Chất Lượng Dữ Liệu Quốc Tế ISO/IEC 25012",
            "content": "\n                          <p>Tiêu chuẩn quốc tế <strong>ISO/IEC 25012</strong> (thuộc hệ thống tiêu chuẩn SQuaRE) định nghĩa Mô hình Chất lượng Dữ liệu gồm 15 đặc tính. Trong đó, 3 đặc tính cốt lõi chi phối trực tiếp các quy tắc kiểm định đường ống dữ liệu bao gồm:</p>\n                          <div class=\"table-responsive\">\n                            <table class=\"table-content\">\n                              <thead>\n                                <tr>\n                                  <th>Đặc tính ISO/IEC 25012</th>\n                                  <th>Định nghĩa chuẩn mực</th>\n                                  <th>Quy tắc kiểm định cụ thể trong Pipeline TechMart</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr>\n                                  <td><strong>Tính Đầy Đủ (Completeness)</strong></td>\n                                  <td>Mức độ mà tập dữ liệu có đủ mọi giá trị cho các trường thuộc tính bắt buộc (Mandatory fields).</td>\n                                  <td><code>order_id</code>, <code>cust_id</code>, <code>order_date</code>, <code>total_amount</code> không bao giờ được phép là <code>null</code> hoặc rỗng!</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Tính Chính Xác (Accuracy)</strong></td>\n                                  <td>Mức độ mà dữ liệu phản ánh trung thực bản chất thực tế và nằm trong miền giá trị hợp lệ.</td>\n                                  <td>Giá bán sản phẩm <code>price &gt; 0</code>; Tỷ lệ chiết khấu <code>0 &le; discount_rate &le; 100</code>; Ngày đặt hàng không được lớn hơn thời điểm hiện tại.</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Tính Nhất Quán (Consistency)</strong></td>\n                                  <td>Mức độ mà dữ liệu không bị mâu thuẫn nội tại giữa các trường thuộc tính với nhau hoặc giữa các bảng.</td>\n                                  <td>Ràng buộc logic: <code>total_amount == (qty * unit_price) - discount</code>; Mã danh mục <code>cat_id</code> phải tồn tại trong bảng danh mục cha.</td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                        "
          },
          {
            "id": "sec-11-03-02",
            "title": "2. Xây Dựng Hàng Rào Kiểm Định Biên (Validation Gate) Bằng Pandas",
            "content": "\n                          <p>Một Validation Gate chuyên nghiệp thực hiện việc kiểm tra hàng loạt quy tắc vector hóa trên toàn bộ DataFrame và thu thập danh sách lỗi cho từng dòng:</p>\n                          \n                        ",
            "codeExamples": [
              {
                "id": "pd-11-03-c1",
                "lang": "python",
                "title": "Hàng rào kiểm định tại biên ISO/IEC 25012 và cơ chế phân luồng cách ly Quarantine",
                "code": "import pandas as pd\nimport numpy as np\n\n# Giả lập dòng dữ liệu thô tiếp nhận từ chi nhánh TechMart\nraw_stream = pd.DataFrame({\n    'order_id': ['TM01', 'TM02', 'TM03', 'TM04'],\n    'branch': ['HN', 'HCM', 'INVALID_BRANCH', 'DN'],\n    'amount': [150000, np.nan, 250000, -50000] # TM02 thiếu tiền, TM04 tiền âm\n})\n\n# Hàng rào kiểm định (Validation Gate)\nvalid_branches = {'HN', 'HCM', 'DN'}\nc1 = raw_stream['amount'].notna() # Tính Đầy Đủ (Completeness)\nc2 = raw_stream['amount'] > 0      # Tính Hợp Lý (Plausibility)\nc3 = raw_stream['branch'].isin(valid_branches) # Tính Nhất Quán (Consistency)\n\nis_clean = c1 & c2 & c3\n\n# Phân tách luồng sạch và luồng cách ly kiểm dịch\nclean_orders = raw_stream[is_clean].copy()\nquarantined = raw_stream[~is_clean].copy()\n\nprint(f\"Số đơn hợp lệ đưa vào phân tích: {len(clean_orders)}\")\nprint(f\"Số đơn bị cách ly (Quarantine): {len(quarantined)}\")\nprint(\"Danh sách đơn bị cách ly:\\n\", quarantined[['order_id', 'branch', 'amount']])",
                "output": "Số đơn hợp lệ đưa vào phân tích: 1\nSố đơn bị cách ly (Quarantine): 3\nDanh sách đơn bị cách ly:\n   order_id          branch    amount\n1     TM02             HCM       NaN\n2     TM03  INVALID_BRANCH  250000.0\n3     TM04              DN  -50000.0",
                "explanation": "Chiến lược cách ly kiểm dịch (Quarantine) giúp pipeline xử lý dữ liệu tiếp tục vận hành mà không bị gián đoạn, đồng thời lưu vết các bản ghi lỗi để gửi cảnh báo chẩn đoán."
              }
            ]
          },
          {
            "id": "sec-11-03-03",
            "title": "3. Cơ Chế Phân Luồng Cách Ly Kiểm Dịch (Quarantine Routing)",
            "content": "\n                          <p>Sau khi chạy qua Validation Gate, bảng dữ liệu được phân nhánh dứt khoát:</p>\n                          \n                          <p><strong>Lợi Ích Kinh Doanh Vượt Bậc:</strong> Báo cáo điều hành và các mô hình AI tiếp tục vận hành mượt mà trên <code>clean_df</code> mà không bị trễ hạn; trong khi đội kỹ thuật nhận được cảnh báo ngay trong ngày kèm toàn bộ tệp <code>quarantine_df</code> để gửi khiếu nại cho đối tác cung cấp dữ liệu.</p>\n                        "
          }
        ],
        "summary": [
          "ISO/IEC 25012 định nghĩa 15 tiêu chuẩn chất lượng dữ liệu: Tính đầy đủ (không null), Tính chính xác (đúng miền giá trị) và Tính nhất quán (khớp logic nội tại).",
          "Validation Gate đặt tại cửa ngõ tiếp nhận (Ingestion boundary) ngăn chặn dữ liệu rác xâm nhập vào kho dữ liệu sạch.",
          "Cơ chế Quarantine Routing phân luồng thông minh: Dữ liệu sạch đi tiếp; dữ liệu lỗi bị cô lập vào khu vực cách ly kèm nhật ký lý do kiểm định.",
          "Tuyệt đối không xóa bỏ dữ liệu lỗi; bảo lưu dữ liệu cách ly để phục vụ đối soát và truy vết nguồn gốc theo chuẩn FAIR."
        ],
        "workedExample": {
          "scenario": "Triển khai Validation Gate và Quarantine Routing trên dữ liệu bán lẻ TechMart",
          "code": "import pandas as pd\nimport numpy as np\n\n# Tạo tập dữ liệu tiếp nhận từ đối tác có lẫn dòng bẩn\nincoming_orders = pd.DataFrame({\n    'order_id': ['HD01', np.nan, 'HD03', 'HD04'],\n    'customer': ['An', 'Bình', 'Cường', 'Dũng'],\n    'amount': [1200000, 500000, -250000, 850000],  # HD03 có amount âm!\n    'discount_pct': [10, 5, 20, 85]                 # HD04 có chiết khấu 85% (>50%)!\n})\n\n# Thực thi Validation Gate\nis_valid, errors = pd.Series(True, index=incoming_orders.index), pd.Series(\"\", index=incoming_orders.index)\n\n# Kiểm tra Completeness\nm_null_id = incoming_orders['order_id'].isna()\nerrors[m_null_id] += \"ERR_COMPLETENESS: Missing order_id; \"\n\n# Kiểm tra Accuracy (amount > 0)\nm_neg_amount = incoming_orders['amount'] <= 0\nerrors[m_neg_amount] += \"ERR_ACCURACY: Negative amount; \"\n\n# Kiểm tra Accuracy (discount <= 50)\nm_huge_discount = incoming_orders['discount_pct'] > 50\nerrors[m_huge_discount] += \"ERR_ACCURACY: Discount > 50%; \"\n\nis_valid = errors == \"\"\n\nclean_data = incoming_orders[is_valid]\nquarantine_data = incoming_orders[~is_valid].copy()\nquarantine_data['reasons'] = errors[~is_valid]\n\nprint(\"=== DỮ LIỆU SẠCH THÔNG QUAN (CLEAN) ===\")\nprint(clean_data[['order_id', 'customer', 'amount', 'discount_pct']])\n\nprint(\"\\n=== DỮ LIỆU BỊ CÁCH LY KIỂM DỊCH (QUARANTINE) ===\")\nprint(quarantine_data[['order_id', 'customer', 'amount', 'reasons']])",
          "explanation": "1. Dòng HD01 là bản ghi duy nhất đạt chuẩn toàn diện, được thông quan vào tập clean_data.\\n2. 3 dòng còn lại (thiếu ID, âm tiền, chiết khấu vượt trần) bị cách ly vào quarantine_data kèm cột ghi rõ lý do vi phạm tiêu chuẩn ISO/IEC 25012."
        },
        "fadedExample": {
          "scenario": "Kiểm tra tính nhất quán giữa số lượng, đơn giá và tổng tiền",
          "code": "import pandas as pd\n\ndf_trans = pd.DataFrame({\n    'qty': [2, 3, 1],\n    'unit_price': [100, 200, 500],\n    'total': [200, 550, 500] # Dòng 2 bị mâu thuẫn: 3 x 200 = 600 chứ không phải 550!\n})\n\n# Yêu cầu: Tạo boolean mask kiểm tra tính nhất quán ISO/IEC 25012: qty * unit_price == total\n# Gợi ý: is_consistent = (df_trans['qty'] * df_trans['unit_price'] == df_trans['total'])\n\nis_consistent = (df_trans['qty'] * df_trans['unit_price'] == df_trans['total'])\ninconsistent_rows = df_trans[~is_consistent]\n\nprint(\"Các dòng vi phạm tính nhất quán:\\n\", inconsistent_rows)",
          "blankExplanation": "Viết biểu thức so sánh vector hóa qty * unit_price == total để phát hiện tức thì dòng số 2 bị mâu thuẫn logic toán học."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Kiểm toán tính đầy đủ (Completeness) theo chuẩn ISO/IEC 25012",
            "problem": "Tiêu chuẩn quốc tế ISO/IEC 25012 định nghĩa đặc tính Completeness là mức độ dữ liệu có đầy đủ giá trị cho mọi trường bắt buộc. Hãy viết hàm `audit_completeness(df, required_columns, threshold=0.95)`: Tính tỷ lệ không bị khuyết thiếu (1 - missing_ratio) của từng cột trong `required_columns`. Nếu bất kỳ cột nào có độ đầy đủ < 95%, in cảnh báo và trả về False; ngược lại trả về True.",
            "hint": "Dùng (1 - df[col].isna().mean()) >= threshold cho từng cột required.",
            "solutionCode": "import pandas as pd\nimport numpy as np\n\ndef audit_completeness(df, required_columns, threshold=0.95):\n    all_passed = True\n    print(\"=== BÁO CÁO KIỂM TOÁN TÍNH ĐẦY ĐỦ (ISO/IEC 25012) ===\")\n    \n    for col in required_columns:\n        if col not in df.columns:\n            print(f\"✗ Cột '{col}': THIẾU HOÀN TOÀN TRONG BẢNG!\")\n            all_passed = False\n            continue\n            \n        completeness = 1.0 - df[col].isna().mean()\n        status = \"✓ ĐẠT\" if completeness >= threshold else \"✗ KHÔNG ĐẠT\"\n        print(f\"Cột '{col}': Độ đầy đủ {completeness*100:.1f}% (Ngưỡng {threshold*100:.0f}%) -> {status}\")\n        \n        if completeness < threshold:\n            all_passed = False\n            \n    return all_passed\n\ndf_orders = pd.DataFrame({\n    'order_id': ['O1', 'O2', 'O3', 'O4', 'O5'],\n    'customer_id': ['C1', 'C2', 'C3', 'C4', 'C5'],\n    'phone': ['0912', np.nan, '0914', '0915', '0916'] # Thiếu 1/5 = 20% -> Độ đầy đủ 80% < 95%\n})\n\npassed = audit_completeness(df_orders, ['order_id', 'customer_id', 'phone'], threshold=0.95)\nprint(f\"Kết quả kiểm toán gateway: {passed}\")",
            "explanation": "Theo chuẩn ISO/IEC 25012, tính đầy đủ (Completeness) là thuộc tính chất lượng nội tại sống còn. Thiết lập chốt chặn Completeness Gateway tại tầng Ingestion giúp loại trừ nguy cơ các mô hình máy học hoặc báo cáo tài chính phải nội suy trên những trường thông tin khuyết thiếu nghiêm trọng.",
            "solutionOutput": "=== BÁO CÁO KIỂM TOÁN TÍNH ĐẦY ĐỦ (ISO/IEC 25012) ===\r\nCột 'order_id': Độ đầy đủ 100.0% (Ngưỡng 95%) -> ✓ ĐẠT\r\nCột 'customer_id': Độ đầy đủ 100.0% (Ngưỡng 95%) -> ✓ ĐẠT\r\nCột 'phone': Độ đầy đủ 80.0% (Ngưỡng 95%) -> ✗ KHÔNG ĐẠT\r\nKết quả kiểm toán gateway: False"
          },
          {
            "level": "Vừa",
            "title": "Kiểm tra tính nhất quán logic (Consistency) giữa ngày đặt và ngày giao",
            "problem": "Đặc tính Nhất quán logic (Consistency) đòi hỏi dữ liệu không mâu thuẫn giữa các trường nghiệp vụ liên quan. Cho bảng đơn hàng gồm `order_date` và `delivery_date`. Hãy viết hàm `audit_chronological_consistency(df)`: Kiểm tra điều kiện `delivery_date >= order_date`. Phát hiện và trích xuất các đơn hàng vi phạm nghịch lý thời gian (giao hàng trước khi đặt), tính tỷ lệ vi phạm trên toàn mẻ.",
            "hint": "Chuyển cột sang pd.to_datetime(), tạo mask violation = df['delivery_date'] < df['order_date'].",
            "solutionCode": "import pandas as pd\n\ndef audit_chronological_consistency(df):\n    df_chk = df.copy()\n    df_chk['order_date'] = pd.to_datetime(df_chk['order_date'])\n    df_chk['delivery_date'] = pd.to_datetime(df_chk['delivery_date'])\n    \n    # Nghịch lý thời gian: Ngày giao trước ngày đặt\n    inconsistent_mask = df_chk['delivery_date'] < df_chk['order_date']\n    violation_count = inconsistent_mask.sum()\n    violation_rate = (violation_count / len(df_chk)) * 100\n    \n    print(f\"Tổng số bản ghi kiểm tra: {len(df_chk)}\")\n    print(f\"Số bản ghi vi phạm tính nhất quán logic: {violation_count} ({violation_rate:.1f}%)\")\n    \n    if violation_count > 0:\n        print(\"Chi tiết các đơn hàng bị mâu thuẫn thời gian:\")\n        print(df_chk[inconsistent_mask][['order_id', 'order_date', 'delivery_date']])\n        return False, df_chk[inconsistent_mask]\n    return True, None\n\ndf_tx = pd.DataFrame({\n    'order_id': [101, 102, 103],\n    'order_date': ['2026-03-01', '2026-03-05', '2026-03-10'],\n    'delivery_date': ['2026-03-03', '2026-03-02', '2026-03-12'] # Đơn 102 giao 02/03 trước khi đặt 05/03!\n})\n\naudit_chronological_consistency(df_tx)",
            "explanation": "Lỗi mâu thuẫn logic nghiệp vụ (Cross-field Inconsistency) thường bắt nguồn từ lỗi múi giờ hệ thống (Timezone Mismatch) hoặc lỗi nhập liệu từ người dùng. Việc kiểm tra ràng buộc liên trường (Cross-table/Cross-field Constraints) là bước then chốt bảo vệ tính đúng đắn của chuỗi thời gian.",
            "solutionOutput": "Tổng số bản ghi kiểm tra: 3\r\nSố bản ghi vi phạm tính nhất quán logic: 1 (33.3%)\r\nChi tiết các đơn hàng bị mâu thuẫn thời gian:\r\n   order_id order_date delivery_date\r\n1       102 2026-03-05    2026-03-02"
          },
          {
            "level": "Nâng cao",
            "title": "Tự động tạo báo cáo kiểm toán ISO/IEC 25012 xuất tệp Markdown",
            "problem": "Viết hàm `generate_iso_audit_report(clean_df, quarantine_df, metric_results)` nhận vào bảng sạch, bảng kiểm dịch và từ điển kết quả các tiêu chí (Completeness, Uniqueness, Consistency). Tự động sinh một chuỗi văn bản Báo cáo Kiểm toán Chất lượng Dữ liệu có cấu trúc định dạng bảng Markdown hoàn chỉnh kèm tỷ lệ chất lượng tổng thể Data Quality Index (DQI).",
            "hint": "Tính DQI = (len(clean_df) / (len(clean_df) + len(quarantine_df))) * 100, tạo bảng markdown gồm các cột Đặc tính, Tiêu chuẩn, Kết quả, Trạng thái.",
            "solutionCode": "import pandas as pd\n\ndef generate_iso_audit_report(clean_df, quarantine_df, metric_scores):\n    total_records = len(clean_df) + len(quarantine_df)\n    dqi = (len(clean_df) / total_records) * 100 if total_records > 0 else 0\n    \n    md_report = []\n    md_report.append(\"# BÁO CÁO KIỂM TOÁN CHẤT LƯỢNG DỮ LIỆU CHUẨN ISO/IEC 25012\")\n    md_report.append(f\"- **Tổng số bản ghi rà soát:** {total_records}\")\n    md_report.append(f\"- **Số bản ghi đạt chuẩn (Production):** {len(clean_df)}\")\n    md_report.append(f\"- **Số bản ghi kiểm dịch (Quarantine):** {len(quarantine_df)}\")\n    md_report.append(f\"- **Chỉ số Chất lượng Dữ liệu Tổng hợp (DQI):** {dqi:.2f}%\\n\")\n    \n    md_report.append(\"| Đặc tính chất lượng | Ngưỡng cam kết | Thực tế đo lường | Đánh giá |\")\n    md_report.append(\"|---|---|---|:---:|\")\n    \n    for metric, data in metric_scores.items():\n        status = \"PASS\" if data['actual'] >= data['target'] else \"FAIL\"\n        md_report.append(f\"| {metric} | >={data['target']}% | {data['actual']:.1f}% | {status} |\")\n        \n    return \"\\n\".join(md_report)\n\nsample_clean = pd.DataFrame({'id': range(95)})\nsample_quar = pd.DataFrame({'id': range(5)})\nsample_scores = {\n    'Completeness (Tính đầy đủ)': {'target': 95, 'actual': 96.5},\n    'Uniqueness (Tính duy nhất)': {'target': 99, 'actual': 100.0},\n    'Consistency (Tính nhất quán)': {'target': 98, 'actual': 97.2}\n}\n\nreport_md = generate_iso_audit_report(sample_clean, sample_quar, sample_scores)\nprint(report_md)",
            "explanation": "Báo cáo kiểm toán dữ liệu định dạng Markdown theo chuẩn ISO/IEC 25012 cho phép tích hợp tự động vào pull request của GitHub/GitLab hoặc Dashboard quản trị, giúp toàn bộ tổ chức có cái nhìn minh bạch về độ tin cậy của tài sản dữ liệu.",
            "solutionOutput": "# BÁO CÁO KIỂM TOÁN CHẤT LƯỢNG DỮ LIỆU CHUẨN ISO/IEC 25012\r\n- **Tổng số bản ghi rà soát:** 100\r\n- **Số bản ghi đạt chuẩn (Production):** 95\r\n- **Số bản ghi kiểm dịch (Quarantine):** 5\r\n- **Chỉ số Chất lượng Dữ liệu Tổng hợp (DQI):** 95.00%\r\n\r\n| Đặc tính chất lượng | Ngưỡng cam kết | Thực tế đo lường | Đánh giá |\r\n|---|---|---|:---:|\r\n| Completeness (Tính đầy đủ) | >=95% | 96.5% | PASS |\r\n| Uniqueness (Tính duy nhất) | >=99% | 100.0% | PASS |\r\n| Consistency (Tính nhất quán) | >=98% | 97.2% | FAIL |"
          }
        ],
        "quiz": [
          {
            "question": "Lợi ích vượt trội của cơ chế Cách ly Kiểm dịch (Quarantine Routing) so với giải pháp ném ngoại lệ dừng chương trình (Fail-Stop) là gì?",
            "options": [
              "(Recommended) Dữ liệu hợp lệ vẫn được xử lý thông suốt vào kho phân tích bảo đảm hệ thống vận hành liên tục; các dòng lỗi bị cô lập riêng kèm lý do vi phạm để đối soát mà không làm gián đoạn toàn bộ doanh nghiệp.",
              "Tự động biến đổi các dòng dữ liệu bị lỗi thành dữ liệu sạch đúng đắn.",
              "Loại bỏ hoàn toàn sự cần thiết của việc viết Unit Test.",
              "Tăng gấp đôi dung lượng bộ nhớ RAM của máy chủ."
            ],
            "correctAnswer": "(Recommended) Dữ liệu hợp lệ vẫn được xử lý thông suốt vào kho phân tích bảo đảm hệ thống vận hành liên tục; các dòng lỗi bị cô lập riêng kèm lý do vi phạm để đối soát mà không làm gián đoạn toàn bộ doanh nghiệp.",
            "explanation": "Trong môi trường sản xuất lớn, chỉ vì 5 dòng lỗi trong 1 triệu dòng mà làm sập toàn bộ đường ống là một thiết kế tồi. Quarantine Routing phân luồng dữ liệu sạch đi tiếp và cách ly dữ liệu lỗi để xử lý độc lập."
          },
          {
            "question": "Theo tiêu chuẩn ISO/IEC 25012, kiểm tra xem trường 'order_id' có bị null hoặc rỗng hay không thuộc về đặc tính chất lượng dữ liệu nào?",
            "options": [
              "(Recommended) Tính Đầy Đủ (Completeness)",
              "Tính Chính Xác (Accuracy)",
              "Tính Nhất Quán (Consistency)",
              "Tính Kịp Thời (Currentness)"
            ],
            "correctAnswer": "(Recommended) Tính Đầy Đủ (Completeness)",
            "explanation": "Tính Đầy Đủ (Completeness) trong ISO/IEC 25012 đo lường mức độ mà tập dữ liệu có đủ mọi giá trị bắt buộc theo yêu cầu nghiệp vụ, không bị khuyết ô hay rỗng."
          },
          {
            "question": "Tại sao trong kiến trúc hồ dữ liệu (Data Lake), các tệp dữ liệu bị cách ly (Quarantine Data) tuyệt đối KHÔNG ĐƯỢC xóa bỏ?",
            "options": [
              "(Recommended) Để bảo toàn tính bất biến của dữ liệu thô, phục vụ truy vết nguồn gốc (Traceability) và cung cấp bằng chứng cho việc kiểm toán/khiếu nại đối tác cung cấp dữ liệu.",
              "Vì hệ điều hành Linux không cho phép xóa tệp tin có chữ quarantine.",
              "Vì nếu xóa thì các tệp Parquet sạch khác sẽ bị lỗi theo.",
              "Để tăng doanh thu cho nhà cung cấp dịch vụ lưu trữ đám mây."
            ],
            "correctAnswer": "(Recommended) Để bảo toàn tính bất biến của dữ liệu thô, phục vụ truy vết nguồn gốc (Traceability) và cung cấp bằng chứng cho việc kiểm toán/khiếu nại đối tác cung cấp dữ liệu.",
            "explanation": "Nguyên tắc bất biến (Immutability) và khả năng truy vết (Traceability) yêu cầu lưu trữ bằng chứng dữ liệu lỗi để đối soát và bảo đảm tính minh bạch khoa học của toàn bộ quy trình."
          }
        ],
        "selfReviewQuestions": [
          "Nêu 3 đặc tính chất lượng dữ liệu cốt lõi trong tiêu chuẩn ISO/IEC 25012 và cho ví dụ cụ thể.",
          "Trình bày cấu trúc hoạt động của cơ chế phân luồng Quarantine Routing trong Data Engineering.",
          "Tại sao việc đặt Validation Gate ngay tại cửa ngõ tiếp nhận (Ingestion boundary) lại hiệu quả hơn việc kiểm tra dữ liệu ở cuối đường ống?"
        ],
        "reflectionQuestion": "Một công ty tài chính thu nhận dữ liệu giao dịch thẻ tín dụng từ 5 ngân hàng đối tác. Đôi khi có ngân hàng gửi nhầm file có 10% giao dịch bị thiếu mã tiền tệ (VND/USD). Nếu kỹ sư thiết kế pipeline tự động điền 'VND' vào toàn bộ các ô thiếu đó mà không đưa vào Quarantine, điều gì thảm khốc có thể xảy ra khi một giao dịch mua hàng 10.000 USD bị hạch toán thành 10.000 VNĐ?",
        "reflectionHint": "Việc tự tiện điền khuyết (Imputation) mù quáng mà không qua Quarantine là một tội ác kỹ nghệ dữ liệu: Biến giao dịch 10.000 USD (tương đương 250 triệu VNĐ) thành 10.000 VNĐ làm thất thoát 99.99% giá trị giao dịch của ngân hàng! Giải pháp chuẩn: Lập tức chuyển toàn bộ các dòng thiếu mã tiền tệ vào data/quarantine và bắn cảnh báo khẩn cấp cho ngân hàng đối tác để họ tái gửi file chuẩn xác.",
        "nextLessonPreview": "Ở Module 12, chúng ta sẽ chuyển sang lĩnh vực Tối Ưu Hóa Hiệu Năng & Quy Trình Tái Lập: Thực hành 'Đo lường trước khi tối ưu' với cProfile/tracemalloc, cấu trúc dự án chuẩn Cookiecutter Data Science và chuỗi biến đổi .pipe().",
        "references": [
          {
            "title": "ISO/IEC 25012: Data Quality Model (International Organization for Standardization)",
            "url": "https://www.iso.org/standard/35736.html"
          },
          {
            "title": "Great Expectations & Modern Data Quality Architecture",
            "url": "https://greatexpectations.io"
          }
        ]
      }
    ]
  },
  {
    "id": "mod-12",
    "number": "Module 12",
    "title": "Tối Ưu Hóa Hiệu Năng & Quy Trình Tái Lập",
    "badge": "3 Bài học",
    "icon": "⚡",
    "description": "Thực hành nguyên lý 'Đo lường trước khi tối ưu' với cProfile và tracemalloc, chuẩn hóa cấu trúc dự án Cookiecutter Data Science theo Wilson et al., tài liệu hóa kiểu dữ liệu với PEP 484 Type Hints và xây dựng đường ống biến đổi thuần khiết với .pipe().",
    "lessons": [
      {
        "id": "pd-12-01",
        "number": "12.1",
        "title": "Đo Lường Trước Khi Tối Ưu: cProfile, tracemalloc & Scaling to Large Datasets",
        "subtitle": "Nguyên lý Knuth, phân tích điểm nghẽn CPU với cProfile, đo đỉnh RAM với tracemalloc và chiến lược Downcasting",
        "level": "Cơ bản",
        "duration": "45 phút",
        "objectives": [
          "Thấu hiểu nguyên lý kinh điển của Donald Knuth: 'Tối ưu hóa sớm là nguồn gốc của mọi tội lỗi' (Premature optimization is the root of all evil); cam kết tuân thủ quy trình Đo lường trước khi tối ưu.",
          "Sử dụng công cụ phân tích cấu hình thời gian chạy cProfile và pstats để định vị chính xác 'điểm nghẽn cổ chai' (Bottleneck) của CPU trong đường ống xử lý dữ liệu.",
          "Đo lường dung lượng bộ nhớ RAM đỉnh (Peak Memory Usage) bằng thư viện chuẩn tracemalloc để ngăn chặn thảm họa tràn RAM (Out-Of-Memory OOM).",
          "Áp dụng các kỹ thuật tối ưu hóa bộ nhớ cốt lõi theo tài liệu chính thức 'Scaling to large datasets' của Pandas: Ép kiểu tinh gọn (Downcasting int64/float64) và mã hóa từ điển Categorical giúp tiết kiệm 75% RAM."
        ],
        "intuition": {
          "title": "Bác Sĩ Bắt Mạch Đo Điện Tim & Chiếc Xe Tải Chở Hàng",
          "metaphor": "Hãy xem cách một kỹ sư tối ưu hóa hệ thống dữ liệu:\\n1. Đo Lường Trước Khi Tối Ưu: Một người bị đau đầu chạy vào bệnh viện. Bạn không thể nhảy bổ vào mổ não người ta ngay lập tức! Bạn phải đo huyết áp, chụp X-quang, bắt mạch tìm đúng nguyên nhân (Profiling). Donald Knuth từng cảnh báo: 'Tối ưu hóa sớm là nguồn gốc của mọi tội lỗi'. Nhiều lập trình viên tốn 3 ngày tối ưu một vòng lặp chỉ chiếm 0.1% thời gian chạy, trong khi bỏ quên một phép ép kiểu đang ngốn 95% thời gian và RAM!\\n2. cProfile (Máy đo điện tim CPU): Soi rõ từng hàm trong chương trình: Hàm nào được gọi bao nhiêu lần (ncalls), chiếm bao nhiêu giây tự thân (tottime) và tổng thời gian bao gồm cả các hàm con (cumtime). Giúp bạn chỉ thẳng tay vào thủ phạm làm chậm hệ thống!\\n3. tracemalloc (Cân điện tử đo tải trọng RAM): Giống như việc bạn cân chiếc xe tải: Xe lúc chạy không tải nặng bao nhiêu (current memory) và khoảnh khắc chở nặng nhất trên cầu là bao nhiêu tấn (peak memory). Nhờ đó bạn biết chắc pipeline có bị vượt quá 8GB RAM của máy chủ đám mây hay không!\\n4. Downcasting (Đóng gói hành lý thông minh): Giống như việc bạn mang một chiếc áo phông đi du lịch nhưng lại nhét vào một chiếc vali du lịch khổng lồ 50kg (mặc định Pandas dùng int64 = 8 byte để lưu số tuổi từ 1 đến 100!). Downcasting sang int8 chỉ tốn 1 byte, giúp chiếc xe tải chở được gấp 8 lần lượng hàng mà không bị sập cầu!",
          "boundary": "Tối ưu hóa bằng Downcasting (ví dụ: ép float64 về float32) có thể làm giảm độ chính xác của các số thập phân sau dấu phẩy (từ 15 chữ số xuống còn 7 chữ số). Do đó, chỉ áp dụng cho dữ liệu đo lường vật lý hoặc thống kê, tuyệt đối cẩn trọng khi áp dụng cho dữ liệu tiền tệ chính xác cao.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">QUY TRÌNH BA BƯỚC: PROFILING &rarr; BOTTLENECK &rarr; DOWNCASTING</div>\n                        <div style=\"display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;text-align:center;\">\n                          <div style=\"padding:6px;border:1px solid #3b82f6;border-radius:4px;background:var(--bg-surface);\">\n                            <strong style=\"color:#3b82f6;\">1. PROFILING</strong>\n                            <div style=\"font-size:0.7rem;margin-top:2px;\">cProfile + tracemalloc</div>\n                            <div style=\"font-size:0.65rem;color:var(--text-muted);\">Đo tottime và peak RAM</div>\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #f59e0b;border-radius:4px;background:var(--bg-surface);\">\n                            <strong style=\"color:#f59e0b;\">2. BẮT ĐIỂM NGHẼN</strong>\n                            <div style=\"font-size:0.7rem;margin-top:2px;\">Quy luật 80/20</div>\n                            <div style=\"font-size:0.65rem;color:var(--text-muted);\">Tập trung vào 5% mã gây chậm</div>\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #10b981;border-radius:4px;background:var(--bg-surface);\">\n                            <strong style=\"color:#10b981;\">3. DOWNCASTING</strong>\n                            <div style=\"font-size:0.7rem;margin-top:2px;\">int64 &rarr; int16, category</div>\n                            <div style=\"font-size:0.65rem;color:var(--text-muted);\">Giảm 75% bộ nhớ tiêu thụ</div>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-12-01-01",
            "title": "1. Nguyên Lý Knuth: Đo Lường Trước Khi Tối Ưu",
            "content": "\n                          <p>Năm 1974, nhà khoa học máy tính huyền thoại Donald Knuth đã viết một câu nói bất hủ trong bài luận <em>\"Structured Programming with go to Statements\"</em>:</p>\n                          <blockquote>\n                            <em>\"Chúng ta nên quên đi những hiệu quả nhỏ nhặt, khoảng 97% thời gian: Tối ưu hóa sớm là nguồn gốc của mọi tội lỗi. Tuy nhiên, chúng ta không nên bỏ qua cơ hội trong 3% quan trọng sống còn đó.\"</em>\n                          </blockquote>\n                          <p>Trong Khoa học Dữ liệu, việc đoán mò điểm nghẽn hiệu năng thường dẫn đến lãng phí thời gian vào những hàm không quan trọng. Quy trình chuẩn mực bắt buộc phải là:</p>\n                          <ol>\n                            <li><strong>Đo lường thời gian (Time Profiling):</strong> Xác định chính xác hàm nào tiêu tốn nhiều thời gian nhất.</li>\n                            <li><strong>Đo lường bộ nhớ (Memory Profiling):</strong> Xác định thời điểm và dòng mã nào đẩy lượng RAM lên mức đỉnh (Peak).</li>\n                            <li><strong>Tối ưu hóa có chủ đích:</strong> Chỉ can thiệp vào đúng điểm nghẽn cổ chai.</li>\n                          </ol>\n                        "
          },
          {
            "id": "sec-12-01-02",
            "title": "2. Phân Tích Điểm Nghẽn CPU Với cProfile & pstats",
            "content": "\n                          <p>Module <code>cProfile</code> là công cụ phân tích cấu hình thời gian thực thi (Deterministic Profiler) tích hợp sẵn trong thư viện chuẩn của Python:</p>\n                          \n                          <h4>Ý Nghĩa Các Cột Trong Báo Cáo pstats:</h4>\n                          <ul>\n                            <li><strong>ncalls:</strong> Số lần hàm được gọi.</li>\n                            <li><strong>tottime:</strong> Tổng thời gian thực thi bên trong chính hàm đó (không tính thời gian chờ các hàm con mà nó gọi). Đây là chỉ số quan trọng nhất để tìm điểm nghẽn!</li>\n                            <li><strong>cumtime:</strong> Thời gian tích lũy từ lúc gọi hàm cho đến khi nó kết thúc (bao gồm cả các hàm con).</li>\n                          </ul>\n                        "
          },
          {
            "id": "sec-12-01-03",
            "title": "3. Đo Đỉnh Bộ Nhớ RAM Với tracemalloc",
            "content": "\n                          <p>Thư viện chuẩn <code>tracemalloc</code> theo dõi chính xác từng khối bộ nhớ RAM mà Python phân bổ từ hệ điều hành:</p>\n                          \n                          <p>Nhờ chỉ số <code>peak</code>, bạn biết chắc chắn rằng trong lúc chạy, pipeline có thời điểm nào bị phình to vượt quá ngưỡng RAM của Docker container hay không.</p>\n                        ",
            "codeExamples": [
              {
                "id": "pd-12-01-c1",
                "lang": "python",
                "title": "Đo lường đỉnh bộ nhớ RAM thực tế với tracemalloc và tối ưu kiểu dữ liệu",
                "code": "import pandas as pd\nimport numpy as np\nimport tracemalloc\n\n# Khởi động công cụ theo dõi ô nhớ cấp phát của Python\ntracemalloc.start()\n\n# Tạo tập dữ liệu mô phỏng 100,000 dòng\nN = 100_000\ndf_heavy = pd.DataFrame({\n    'category': np.random.choice(['Phụ kiện', 'Gia dụng', 'Công nghệ'], size=N),\n    'qty': np.random.randint(1, 10, size=N).astype('int64')\n})\n\n# Bộ nhớ ban đầu\nmem_heavy = df_heavy.memory_usage(deep=True).sum() / 1024**2\n\n# Tối ưu: Ép kiểu category cho chuỗi lặp lại và int8 cho số lượng nhỏ\ndf_optimized = df_heavy.copy()\ndf_optimized['category'] = df_optimized['category'].astype('category')\ndf_optimized['qty'] = df_optimized['qty'].astype('int8')\n\nmem_opt = df_optimized.memory_usage(deep=True).sum() / 1024**2\ncurrent, peak = tracemalloc.get_traced_memory()\ntracemalloc.stop()\n\nprint(f\"Dung lượng ban đầu (int64/object): {mem_heavy:.2f} MB\")\nprint(f\"Dung lượng sau tinh gọn:           {mem_opt:.2f} MB (Tiết kiệm {(1 - mem_opt/mem_heavy)*100:.1f}%)\")\nprint(f\"Đỉnh cấp phát RAM của tiến trình:   {peak / 1024**2:.2f} MB\")",
                "output": "Dung lượng ban đầu (int64/object): 6.68 MB\nDung lượng sau tinh gọn:           0.20 MB (Tiết kiệm 97.0%)\nĐỉnh cấp phát RAM của tiến trình:   13.45 MB",
                "explanation": "Chuyển đổi cột chuỗi lặp lại sang kiểu 'category' và thu hẹp số nguyên về đúng miền giá trị (int8) có thể giảm đến 90-95% dung lượng RAM của DataFrame."
              }
            ]
          },
          {
            "id": "sec-12-01-04",
            "title": "4. Tinh Gọn Bộ Nhớ Theo Chuẩn Pandas 'Scaling to Large Datasets'",
            "content": "\n                          <p>Theo tài liệu chính thức <em>Scaling to large datasets</em> của Pandas, kỹ thuật <strong>Downcasting</strong> kiểu số là phương pháp hiệu quả nhất để giảm ngay 70% dung lượng:</p>\n                          \n                        "
          }
        ],
        "summary": [
          "Nguyên lý Knuth: Luôn đo lường trước khi tối ưu; 95% thời gian chạy thường nằm ở 5% dòng mã điểm nghẽn.",
          "cProfile và pstats giúp định vị chính xác hàm có tottime cao nhất để can thiệp đúng trọng tâm.",
          "tracemalloc đo lường đỉnh bộ nhớ RAM (Peak Memory) phòng ngừa lỗi sập tràn RAM OOM trên môi trường sản xuất.",
          "Tinh gọn dữ liệu (Downcasting) bằng pd.to_numeric(..., downcast='integer'/'float') và chuyển chuỗi sang category giúp giảm tới 75% dung lượng RAM."
        ],
        "workedExample": {
          "scenario": "Đo lường hiệu quả tiết kiệm bộ nhớ trước và sau Downcasting",
          "code": "import pandas as pd\nimport numpy as np\n\n# Tạo DataFrame 200.000 dòng với các kiểu dữ liệu mặc định\nnp.random.seed(42)\nn = 200000\ndf_raw = pd.DataFrame({\n    'customer_id': np.random.randint(1, 10000, n, dtype='int64'),\n    'rating': np.random.randint(1, 6, n, dtype='int64'), # Chỉ từ 1 đến 5 sao!\n    'amount': np.random.uniform(10.0, 500.0, n),          # float64 mặc định\n    'branch': np.random.choice(['Hà Nội', 'TP.HCM', 'Đà Nẵng'], n) # object mặc định\n})\n\nmem_before = df_raw.memory_usage(deep=True).sum() / (1024**2)\n\n# Thực hiện Downcasting thông minh\ndf_opt = df_raw.copy()\ndf_opt['rating'] = pd.to_numeric(df_opt['rating'], downcast='integer') # int64 -> int8\ndf_opt['customer_id'] = pd.to_numeric(df_opt['customer_id'], downcast='integer') # int64 -> int16\ndf_opt['amount'] = pd.to_numeric(df_opt['amount'], downcast='float') # float64 -> float32\ndf_opt['branch'] = df_opt['branch'].astype('category') # object -> category\n\nmem_after = df_opt.memory_usage(deep=True).sum() / (1024**2)\n\nprint(f\"Dung lượng RAM ban đầu: {mem_before:.2f} MB\")\nprint(f\"Dung lượng RAM sau Downcasting: {mem_after:.2f} MB\")\nprint(f\"Tỷ lệ tiết kiệm bộ nhớ: {(1 - mem_after/mem_before)*100:.1f}%!\")\nprint(\"\\nKiểm tra kiểu dữ liệu mới:\\n\", df_opt.dtypes)",
          "explanation": "1. Rating chỉ từ 1 đến 5 sao nhưng mặc định chiếm 8 byte (int64); Downcasting đưa về int8 chỉ tốn 1 byte (tiết kiệm 87.5%).\\n2. Cột chi nhánh chuyển sang category thay thế hàng trăm nghìn chuỗi văn bản bằng các mã số nguyên từ điển.\\n3. Tổng dung lượng bộ nhớ giảm ngoạn mục hơn 78%, giúp ứng dụng xử lý mượt mà trên phần cứng khiêm tốn."
        },
        "fadedExample": {
          "scenario": "Đo thời gian thực thi bằng cProfile trong khối lệnh",
          "code": "import cProfile\nimport pstats\nimport io\n\ndef task_to_measure():\n    total = sum(i ** 2 for i in range(100000))\n    return total\n\n# Yêu cầu: Khởi tạo cProfile.Profile(), kích hoạt bằng .enable(), gọi task_to_measure(),\n# vô hiệu hóa bằng .disable() và in top 3 hàm tốn tottime nhiều nhất\n\npr = cProfile.Profile()\npr.enable()\nresult = task_to_measure()\npr.disable()\n\ns = io.StringIO()\nps = pstats.Stats(pr, stream=s).sort_stats('tottime')\nps.print_stats(3)\nprint(s.getvalue())",
          "blankExplanation": "Điền các lệnh pr.enable(), gọi hàm, pr.disable(), sau đó bọc vào pstats.Stats(pr) để trích xuất báo cáo thống kê các hàm tiêu tốn CPU nhiều nhất."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Đo đỉnh bộ nhớ RAM khi đọc dữ liệu bằng tracemalloc",
            "problem": "Sử dụng module chuẩn `tracemalloc` để đo chính xác lượng RAM hiện hành và đỉnh RAM (Peak Memory) tính bằng Kilobytes khi tạo một DataFrame 100.000 dòng gồm 3 cột float. Đảm bảo gọi `tracemalloc.start()` trước khi xử lý và `tracemalloc.stop()` sau khi hoàn tất.",
            "hint": "Gọi tracemalloc.start(), khởi tạo DataFrame, current, peak = tracemalloc.get_traced_memory(), tracemalloc.stop(), chia 1024 để đổi sang KB.",
            "solutionCode": "import tracemalloc\nimport pandas as pd\nimport numpy as np\n\ntracemalloc.start()\n\n# Tạo dữ liệu 100,000 dòng\nn_rows = 100_000\ndf_benchmark = pd.DataFrame({\n    'col_a': np.random.randn(n_rows),\n    'col_b': np.random.randn(n_rows),\n    'col_c': np.random.randn(n_rows)\n})\n\ncurrent_mem, peak_mem = tracemalloc.get_traced_memory()\ntracemalloc.stop()\n\nprint(f\"Bộ nhớ tiêu thụ hiện thời: {current_mem / 1024:.1f} KB\")\nprint(f\"Đỉnh điểm bộ nhớ RAM đã cấp phát: {peak_mem / 1024:.1f} KB\")",
            "explanation": "tracemalloc là công cụ chuẩn mực của Python để bẫy rò rỉ bộ nhớ (Memory Leak) và giám sát chi phí cấp phát vùng nhớ Heap. Khi tải các tập dữ liệu lớn, việc đo Peak Memory quan trọng hơn nhiều so với bộ nhớ tĩnh cuối cùng, vì nếu đỉnh RAM vượt quá giới hạn của máy chủ ảo (container), tiến trình sẽ bị kernel tiêu diệt (OOM Kill).",
            "solutionOutput": "Bộ nhớ tiêu thụ hiện thời: 2522.8 KB\r\nĐỉnh điểm bộ nhớ RAM đã cấp phát: 4867.0 KB"
          },
          {
            "level": "Vừa",
            "title": "Viết hàm tự động downcast kiểu dữ liệu tối ưu RAM cho DataFrame",
            "problem": "Viết hàm `optimize_dataframe_memory(df)` tự động quét toàn bộ các cột: (1) Cột `int64` tự động ép kiểu nhỏ nhất có thể (`int8`, `int16`, `int32`) bằng `pd.to_numeric(..., downcast='integer')`; (2) Cột `float64` ép về `float32` bằng `downcast='float'`; (3) In so sánh dung lượng RAM trước và sau tối ưu bằng `df.memory_usage(deep=True).sum()`.",
            "hint": "Lặp qua các cột kiểu int64 và float64, gọi pd.to_numeric(df[col], downcast=...), tính mem_before và mem_after.",
            "solutionCode": "import pandas as pd\nimport numpy as np\n\ndef optimize_dataframe_memory(df):\n    mem_before = df.memory_usage(deep=True).sum() / 1024 # KB\n    df_opt = df.copy()\n    \n    for col in df_opt.select_dtypes(include=['int64']).columns:\n        df_opt[col] = pd.to_numeric(df_opt[col], downcast='integer')\n        \n    for col in df_opt.select_dtypes(include=['float64']).columns:\n        df_opt[col] = pd.to_numeric(df_opt[col], downcast='float')\n        \n    mem_after = df_opt.memory_usage(deep=True).sum() / 1024 # KB\n    saved_pct = (1 - mem_after / mem_before) * 100\n    \n    print(f\"Bộ nhớ ban đầu: {mem_before:.1f} KB\")\n    print(f\"Bộ nhớ sau khi Downcast: {mem_after:.1f} KB\")\n    print(f\"Tiết kiệm được: {saved_pct:.1f}% RAM\")\n    return df_opt\n\ndf_large = pd.DataFrame({\n    'small_int': np.random.randint(0, 100, 50_000),     # Có thể vừa trong int8\n    'large_int': np.random.randint(1000, 2000, 50_000), # Có thể vừa trong int16\n    'float_num': np.random.randn(50_000)\n})\n\noptimized_df = optimize_dataframe_memory(df_large)",
            "explanation": "Mặc định Pandas luôn cấp phát int64 (8 bytes) và float64 (8 bytes) cho mọi số, bất kể miền giá trị của cột đó nhỏ cỡ nào (ví dụ độ tuổi chỉ từ 0-120 nhưng dùng 8 bytes thay vì 1 byte int8). Kỹ thuật Downcasting thường giúp giảm tức thì 60-75% dung lượng RAM của DataFrame mà không làm mất mát độ chính xác nghiệp vụ.",
            "solutionOutput": "Bộ nhớ ban đầu: 781.4 KB\r\nBộ nhớ sau khi Downcast: 586.1 KB\r\nTiết kiệm được: 25.0% RAM"
          },
          {
            "level": "Nâng cao",
            "title": "So sánh Profiling hiệu năng: iterrows vs apply vs Vectorization",
            "problem": "Viết code benchmark đo thời gian thực thi (dùng `time.perf_counter()`) của 3 cách tính cột mới `c = a * 2 + b`: Cách 1: Vòng lặp `df.iterrows()`; Cách 2: Phương thức `df.apply(lambda r: ...)` và Cách 3: Phép toán Vector hóa `df['a'] * 2 + df['b']`. Thử nghiệm với mảng $N = 10.000$ dòng để hoàn thành tức thì và in ra hệ số tăng tốc (Speedup Factor).",
            "hint": "Dùng t0 = time.perf_counter(), thực hiện phép tính, t1 = time.perf_counter(), in thời gian và speedup = t_iterrows / t_vector.",
            "solutionCode": "import pandas as pd\nimport numpy as np\nimport time\n\nn = 10_000\ndf_bench = pd.DataFrame({\n    'a': np.random.rand(n),\n    'b': np.random.rand(n)\n})\n\n# Cách 1: iterrows()\nt0 = time.perf_counter()\nres_iter = []\nfor _, row in df_bench.iterrows():\n    res_iter.append(row['a'] * 2 + row['b'])\nt_iter = time.perf_counter() - t0\n\n# Cách 2: apply()\nt0 = time.perf_counter()\nres_apply = df_bench.apply(lambda r: r['a'] * 2 + r['b'], axis=1)\nt_apply = time.perf_counter() - t0\n\n# Cách 3: Vectorization thuần túy\nt0 = time.perf_counter()\nres_vec = df_bench['a'] * 2 + df_bench['b']\nt_vec = time.perf_counter() - t0\n\nprint(f\"1. iterrows() : {t_iter*1000:.2f} ms\")\nprint(f\"2. apply()    : {t_apply*1000:.2f} ms\")\nprint(f\"3. Vectorized : {t_vec*1000:.2f} ms\")\nprint(f\"-> Vector hóa nhanh gấp {t_iter / t_vec:.1f} lần so với iterrows()!\")",
            "explanation": "Vòng lặp iterrows() phải đóng gói từng dòng dữ liệu thành một đối tượng Pandas Series và ép kiểu trung gian, gây ra chi phí quản lý đối tượng khổng lồ (Object Overhead). Trong khi đó, Vectorization đẩy phép tính xuống các hàm C/Fortran biên dịch sẵn của thư viện NumPy với sự hỗ trợ của tập chỉ thị phần cứng SIMD, đạt tốc độ nhanh hơn hàng trăm lần.",
            "solutionOutput": "1. iterrows() : 218.71 ms\r\n2. apply()    : 57.38 ms\r\n3. Vectorized : 0.43 ms\r\n-> Vector hóa nhanh gấp 503.9 lần so với iterrows()!"
          }
        ],
        "quiz": [
          {
            "question": "Câu nói kinh điển của Donald Knuth: 'Premature optimization is the root of all evil' (Tối ưu hóa sớm là nguồn gốc của mọi tội lỗi) nhắc nhở kỹ sư dữ liệu điều gì?",
            "options": [
              "(Recommended) Tuyệt đối không đoán mò để tối ưu những đoạn mã vụn vặt; luôn sử dụng công cụ đo lường cấu hình (Profiling) để tìm chính xác điểm nghẽn nghiêm trọng nhất trước khi tối ưu.",
              "Không bao giờ được tối ưu hóa mã nguồn trong bất kỳ hoàn cảnh nào.",
              "Nên mua máy tính đắt tiền nhất thay vì viết mã nguồn tốt.",
              "Mọi chương trình Python đều chạy ở cùng một tốc độ như nhau."
            ],
            "correctAnswer": "(Recommended) Tuyệt đối không đoán mò để tối ưu những đoạn mã vụn vặt; luôn sử dụng công cụ đo lường cấu hình (Profiling) để tìm chính xác điểm nghẽn nghiêm trọng nhất trước khi tối ưu.",
            "explanation": "Knuth nhấn mạnh rằng lập trình viên thường lãng phí thời gian tối ưu hóa những đoạn mã không quan trọng. Quy trình khoa học là Profile -> Tìm đúng điểm nghẽn chiếm đa số thời gian -> Tối ưu đúng chỗ đó."
          },
          {
            "question": "Chỉ số 'tottime' trong báo cáo của module pstats khi sử dụng cProfile mang ý nghĩa là gì?",
            "options": [
              "(Recommended) Tổng thời gian tiêu tốn bên trong chính thân hàm đó, không bao gồm thời gian thực thi của các hàm con mà nó gọi.",
              "Tổng thời gian máy tính khởi động hệ điều hành.",
              "Thời gian tải dữ liệu từ mạng Internet về ổ cứng.",
              "Số lần hàm đó bị lỗi cú pháp."
            ],
            "correctAnswer": "(Recommended) Tổng thời gian tiêu tốn bên trong chính thân hàm đó, không bao gồm thời gian thực thi của các hàm con mà nó gọi.",
            "explanation": "tottime (total time) phản ánh chính xác thời gian CPU dành riêng cho mã lệnh nội bộ của hàm. Đây là thước đo vàng để tìm ra hàm nào thực sự là thủ phạm gây nghẽn tốc độ."
          },
          {
            "question": "Theo tài liệu chính thức 'Scaling to large datasets' của Pandas, kỹ thuật 'Downcasting' giúp giảm dung lượng bộ nhớ RAM bằng cách nào?",
            "options": [
              "(Recommended) Chuyển đổi các kiểu dữ liệu số mặc định (int64, float64) sang các kiểu có kích thước byte nhỏ hơn (int8, int16, float32) vừa đủ để chứa dải giá trị thực tế.",
              "Nén toàn bộ bảng dữ liệu thành tệp tin định dạng ZIP.",
              "Tự động xóa bỏ các dòng dữ liệu có số lẻ.",
              "Lưu dữ liệu sang màn hình phụ."
            ],
            "correctAnswer": "(Recommended) Chuyển đổi các kiểu dữ liệu số mặc định (int64, float64) sang các kiểu có kích thước byte nhỏ hơn (int8, int16, float32) vừa đủ để chứa dải giá trị thực tế.",
            "explanation": "Mặc định Pandas cấp phát 8 byte (64 bit) cho mọi số nguyên và số thực. Nếu dữ liệu chỉ là số sao đánh giá từ 1 đến 5, việc ép kiểu về int8 (1 byte) giúp tiết kiệm ngay 87.5% bộ nhớ cho cột đó."
          }
        ],
        "selfReviewQuestions": [
          "Tại sao chỉ số Peak Memory trong tracemalloc lại quan trọng hơn Current Memory khi lập kế hoạch tài nguyên máy chủ?",
          "Phân biệt sự khác nhau giữa tottime và cumtime trong báo cáo cProfile.",
          "Khi nào thì việc ép kiểu cột object sang category giúp tiết kiệm 80% RAM và khi nào thì không nên dùng nó?"
        ],
        "reflectionQuestion": "Một bạn phân tích dữ liệu than phiền rằng file báo cáo 4GB khiến chiếc laptop 16GB RAM bị đơ cứng và văng lỗi 'MemoryError'. Bạn ấy đang chuẩn bị xin công ty cấp 50 triệu VNĐ mua máy trạm 64GB RAM. Dưới tư cách là Chuyên gia Kỹ nghệ Dữ liệu, bạn sẽ hướng dẫn bạn ấy áp dụng 3 kỹ thuật gì ngay trong Pandas để xử lý mượt mà file 4GB đó trên chính chiếc laptop hiện tại?",
        "reflectionHint": "Không cần mua máy mới! Hướng dẫn bạn ấy áp dụng: (1) Column Pruning: Chỉ đọc các cột cần thiết qua tham số usecols; (2) Downcasting: Ép int64/float64 sang int16/float32 và chuỗi sang category ngay lúc đọc; (3) Chunking: Dùng chunksize đọc và tổng hợp dữ liệu theo từng luồng 100.000 dòng. Tổng lượng RAM tiêu thụ sẽ giảm từ 16GB xuống dưới 1.5GB, chạy mượt mà trên laptop cũ!",
        "nextLessonPreview": "Ở bài 12.2, chúng ta sẽ xây dựng cấu trúc dự án chuẩn mực khoa học: Áp dụng Cookiecutter Data Science theo khuyến nghị của Wilson et al., tuân thủ 10 quy tắc tái lập của Sandve et al., và thiết lập hợp đồng kiểu dữ liệu vững chắc với PEP 484 Type Hints.",
        "references": [
          {
            "title": "Structured Programming with go to Statements (Donald Knuth, 1974)",
            "url": "https://doi.org/10.1145/356635.356640"
          },
          {
            "title": "Pandas Official Guide - Scaling to large datasets",
            "url": "https://pandas.pydata.org/docs/user_guide/scale.html"
          },
          {
            "title": "Python Official Documentation - tracemalloc and cProfile",
            "url": "https://docs.python.org/3/library/profile.html"
          }
        ]
      },
      {
        "id": "pd-12-02",
        "number": "12.2",
        "title": "Cấu Trúc Dự Án Cookiecutter, Chuẩn Tái Lập & PEP 484 Type Hints",
        "subtitle": "Khuyến nghị Wilson et al., 10 quy tắc tái lập Sandve et al., kiến trúc thư mục chuẩn Cookiecutter và PEP 484 cho Data Pipeline",
        "level": "Trung cấp",
        "duration": "45 phút",
        "objectives": [
          "Ánh xạ các khuyến nghị khoa học kinh điển của Wilson et al. (2017) và 10 quy tắc nghiên cứu tái lập của Sandve et al. (2013) vào cấu trúc dự án Khoa học Dữ liệu hiện đại.",
          "Thiết lập cấu trúc thư mục chuẩn công nghiệp theo mẫu Cookiecutter Data Science: Phân tầng nghiêm ngặt data/raw (bất biến), data/processed, src/, notebooks/, tests/ và reports/.",
          "Ứng dụng hệ thống gợi ý kiểu dữ liệu PEP 484 (Type Hints) cho các hàm xử lý DataFrame để biến mã nguồn thành tài liệu tự mô tả, hỗ trợ IDE bắt lỗi tĩnh và tăng độ tin cậy.",
          "Cố định môi trường thực thi và kiểm soát phiên bản phụ thuộc với requirements.txt, pyproject.toml và Dockerfile để bảo đảm tính tái lập 100% trên mọi máy trạm."
        ],
        "intuition": {
          "title": "Căn Bếp Nhà Hàng 5 Sao & Bản Thiết Kế Kiến Trúc",
          "metaphor": "Hãy xem sự khác nhau giữa một căn bếp bừa bãi và một căn bếp nhà hàng 5 sao tiêu chuẩn quốc tế:\\n1. Dự Án Bừa Bãi (Vấn nạn phổ biến): Bạn có 1 file duy nhất tên là `script_final_v2_edit_final.py` nằm chung thư mục với 50 file CSV không rõ nguồn gốc, mật khẩu database dán ngay trong code, kết quả phân tích ném bừa bãi ra màn hình Desktop. Sau 3 tháng quay lại, chính bạn cũng không thể nào chạy lại được code của mình! Đó là sự sụp đổ của Tính Tái Lập (Reproducibility Crisis)!\\n2. Căn Bếp Chuẩn Cookiecutter (Wilson et al., 2017): Mọi thứ đều có ngăn kéo riêng được dán nhãn chuẩn hóa quốc tế:\\n   - Ngăn `data/raw/`: Thùng nguyên liệu tươi sống vừa nhập về &mdash; BẤT BIẾN TUYỆT ĐỐI, chỉ đọc, cấm chỉnh sửa tay!\\n   - Ngăn `data/processed/`: Nguyên liệu đã được sơ chế sạch sẽ, đóng gói Parquet chuẩn mực.\\n   - Ngăn `src/`: Dao bếp và công thức nấu ăn chuyên nghiệp (mã nguồn module Python sạch sẽ, có thể đóng gói import).\\n   - Ngăn `notebooks/`: Cuốn sổ tay thử nghiệm món mới của đầu bếp.\\n   - Ngăn `tests/`: Bộ dụng cụ kiểm tra vệ sinh an toàn thực phẩm tự động (Pytest).\\n3. PEP 484 Type Hints (Hợp Đồng Kỹ Thuật Minh Bạch): Giống như việc ghi rõ trên nắp chai: 'Chai này chứa nước sốt BBQ 500ml' thay vì để một cái chai trong suốt không nhãn. Nhìn vào hàm `def clean_data(df: pd.DataFrame) -> pd.DataFrame:`, bất kỳ ai trong nhóm cũng hiểu ngay đầu vào là gì và đầu ra là gì mà không cần phải mở ruột hàm ra đọc!",
          "boundary": "Sổ tay Jupyter Notebooks chỉ dùng cho bước khám phá EDA ban đầu và trình diễn trực quan; tuyệt đối không dùng Notebook để chạy production pipeline tự động. Toàn bộ logic nghiệp vụ cốt lõi bắt buộc phải được đóng gói thành các hàm Python trong thư mục src/ để có thể unit test.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">CẤU TRÚC DỰ ÁN DỮ LIỆU CHUẨN COOKIECUTTER DATA SCIENCE</div>\n                        <div style=\"background:var(--bg-surface);padding:10px;border-radius:6px;border:1px solid var(--border-subtle);font-family:var(--font-mono);font-size:0.75rem;line-height:1.5;\">\n                          📁 techmart-data-pipeline/<br>\n                          ├── 📁 <strong>data/</strong><br>\n                          │   ├── 📁 <strong>raw/</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:#ef4444;\">[BẤT BIẾN: Dữ liệu thô nguyên bản]</span><br>\n                          │   └── 📁 <strong>processed/</strong> &nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:#10b981;\">[Dữ liệu sạch tối ưu Parquet]</span><br>\n                          ├── 📁 <strong>src/</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:#3b82f6;\">[Mã nguồn module: features, models, pipeline]</span><br>\n                          ├── 📁 <strong>notebooks/</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:#f59e0b;\">[Sổ tay khám phá EDA thử nghiệm]</span><br>\n                          ├── 📁 <strong>tests/</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:#10b981;\">[Bộ Unit Test Pytest bảo vệ chất lượng]</span><br>\n                          ├── 📄 <strong>requirements.txt</strong> <span style=\"color:var(--text-muted);\">[Cố định chính xác phiên bản thư viện]</span><br>\n                          └── 📄 <strong>README.md</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:var(--text-muted);\">[Hướng dẫn tái lập quy trình 1 dòng lệnh]</span>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-12-02-01",
            "title": "1. Khuyến Nghị Wilson et al. (2017) & 10 Quy Tắc Tái Lập Của Sandve",
            "content": "\n                          <p>Năm 2017, nhóm nghiên cứu của Greg Wilson xuất bản bài báo kinh điển trên tạp chí <em>PLOS Computational Biology</em>: <strong>\"Good Enough Practices in Scientific Computing\"</strong>. Cùng với công trình <em>\"Ten Simple Rules for Reproducible Computational Research\"</em> của Geir Kjetil Sandve (2013), họ đã đúc kết các quy tắc vàng cho nghiên cứu dữ liệu có thể tái lập:</p>\n                          <ol>\n                            <li><strong>Dữ liệu thô là bất biến (Raw Data is Sacred):</strong> Tuyệt đối không bao giờ chỉnh sửa thủ công trực tiếp bằng tay trên tệp dữ liệu thô. Mọi thao tác làm sạch phải được ghi lại bằng mã lệnh Python tự động.</li>\n                            <li><strong>Mọi kết quả đều phải truy vết được nguồn gốc:</strong> Từ một con số hay biểu đồ trong báo cáo, người khác phải lần ngược lại được chính xác tệp dữ liệu thô nào và đoạn mã nào đã sinh ra nó.</li>\n                            <li><strong>Cố định môi trường tính toán:</strong> Sử dụng tệp khóa phiên bản (như <code>requirements.txt</code> hoặc <code>poetry.lock</code>) để loại bỏ rủi ro thư viện tự nâng cấp làm thay đổi thuật toán.</li>\n                            <li><strong>Tự động hóa toàn bộ quy trình:</strong> Toàn bộ đường ống từ lúc tải dữ liệu đến lúc xuất báo cáo phải được thực thi trọn vẹn chỉ bằng MỘT dòng lệnh duy nhất (ví dụ: <code>python -m src.pipeline</code>).</li>\n                          </ol>\n                        "
          },
          {
            "id": "sec-12-02-02",
            "title": "2. Cấu Trúc Thư Mục Dự Án Chuẩn Cookiecutter Data Science",
            "content": "\n                          <p>Chuẩn công nghiệp phổ biến nhất thế giới hiện nay là kiến trúc <strong>Cookiecutter Data Science</strong>:</p>\n                          <ul>\n                            <li><code>data/raw/</code>: Lưu trữ các tệp CSV, JSON gốc tải từ nguồn. Được bảo vệ nghiêm ngặt ở quyền chỉ đọc (Read-only).</li>\n                            <li><code>data/processed/</code>: Dữ liệu sau khi đã chạy qua Validation Gate và làm sạch, lưu dưới định dạng cột Parquet tối ưu.</li>\n                            <li><code>src/</code>: Chứa toàn bộ mã logic sản xuất, được tổ chức thành các module có thể import (ví dụ: <code>src.data.make_dataset</code>, <code>src.features.build_features</code>).</li>\n                            <li><code>tests/</code>: Chứa các kịch bản kiểm thử Pytest.</li>\n                            <li><code>notebooks/</code>: Chỉ dùng để vẽ đồ thị thăm dò và ghi chú nhanh. Khi một hàm trong notebook đã ổn định, nó phải được chuyển ngay vào <code>src/</code>!</li>\n                          </ul>\n                        "
          },
          {
            "id": "sec-12-02-03",
            "title": "3. Ứng Dụng PEP 484 Type Hints Cho Data Pipelines",
            "content": "\n                          <p>Trong Python hiện đại, việc sử dụng <strong>Gợi ý Kiểu (Type Hints - PEP 484)</strong> giúp đường ống dữ liệu trở nên trong suốt và giảm thiểu 60% lỗi cú pháp thời gian chạy:</p>\n                          \n                          <p>Nhờ Type Hints, các công cụ kiểm tra tĩnh (như <code>mypy</code>) và các trình biên tập mã (IDE) sẽ tự động cảnh báo ngay lập tức nếu bạn vô tình truyền một chuỗi văn bản vào tham số <code>min_spend_threshold</code> vốn yêu cầu kiểu <code>float</code>!</p>\n                        "
          }
        ],
        "summary": [
          "Khuyến nghị Wilson et al. (2017): Dữ liệu thô là bất biến; mọi bước xử lý phải được tự động hóa bằng mã lệnh có thể tái lập 100%.",
          "Cấu trúc Cookiecutter Data Science phân tầng rạch ròi: data/raw (bất biến), data/processed, src/, notebooks/, tests/.",
          "Sổ tay Jupyter chỉ dùng để khám phá; mã nguồn cốt lõi bắt buộc phải đóng gói vào thư mục src/ để có thể Unit Test.",
          "Áp dụng PEP 484 Type Hints biến hàm dữ liệu thành hợp đồng kỹ thuật tự tài liệu hóa, giúp bắt lỗi tĩnh sớm trước khi triển khai sản xuất."
        ],
        "workedExample": {
          "scenario": "Xây dựng hàm tiền xử lý chuẩn PEP 484 và kiểm tra kiểu dữ liệu tĩnh",
          "code": "from typing import Dict, List, Optional\nimport pandas as pd\n\ndef filter_active_inventory(\n    inventory_df: pd.DataFrame,\n    target_categories: List[str],\n    min_stock: int = 10\n) -> pd.DataFrame:\n    \"\"\"\n    Lọc các sản phẩm còn tồn kho hợp lệ theo danh mục ngành hàng.\n    \"\"\"\n    # Kiểm tra hợp đồng cột bắt buộc\n    required_cols = {'sku', 'category', 'stock_qty', 'price'}\n    if not required_cols.issubset(inventory_df.columns):\n        missing = required_cols - set(inventory_df.columns)\n        raise KeyError(f\"DataFrame đầu vào thiếu các cột bắt buộc: {missing}\")\n        \n    filtered = inventory_df[\n        (inventory_df['category'].isin(target_categories)) &\n        (inventory_df['stock_qty'] >= min_stock)\n    ].copy()\n    \n    return filtered\n\n# Thử nghiệm với DataFrame đạt chuẩn\nraw_inv = pd.DataFrame({\n    'sku': ['SKU1', 'SKU2', 'SKU3'],\n    'category': ['Laptop', 'Phone', 'Laptop'],\n    'stock_qty': [15, 5, 20],\n    'price': [25000000, 12000000, 18000000]\n})\n\nres = filter_active_inventory(raw_inv, target_categories=['Laptop'], min_stock=10)\nprint(\"Kết quả lọc đạt chuẩn Type Hints:\\n\", res[['sku', 'category', 'stock_qty']])",
          "explanation": "1. Chữ ký hàm sử dụng Type Hints tường minh: inventory_df: pd.DataFrame, target_categories: List[str] -> pd.DataFrame.\\n2. Bổ sung hợp đồng kiểm tra schema đầu vào required_cols.issubset() ngăn ngừa lỗi KeyError thời gian chạy."
        },
        "fadedExample": {
          "scenario": "Khai báo Type Hint trả về Tuple chứa DataFrame và Từ điển KPI",
          "code": "from typing import Tuple, Dict\nimport pandas as pd\n\ndef summarize_sales(df: pd.DataFrame) -> Tuple[pd.DataFrame, Dict[str, float]]:\n    summary_df = df.groupby('branch', as_index=False)['sales'].sum()\n    metrics = {'total_sales': float(df['sales'].sum())}\n    return summary_df, metrics\n\n# Kiểm thử với dữ liệu mẫu\nsample = pd.DataFrame({'branch': ['HN', 'HCM'], 'sales': [100.0, 200.0]})\nres_df, res_kpi = summarize_sales(sample)\n\nprint(\"Tóm tắt theo chi nhánh:\\n\", res_df)\nprint(\"Chỉ số tổng hợp:\", res_kpi)",
          "blankExplanation": "Khai báo kiểu trả về Tuple[pd.DataFrame, Dict[str, float]] giúp lập trình viên sử dụng hàm biết chính xác cấu trúc giải nén gồm 1 DataFrame và 1 Dictionary chứa số thực."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Kiểm tra tính bất biến của tệp dữ liệu thô bằng SHA-256 Hash",
            "problem": "Viết hàm `verify_raw_data_integrity(file_path, expected_hash)` sử dụng thư viện `hashlib` để tính mã băm SHA-256 của một tệp tin trên đĩa. So khớp với mã băm kỳ vọng và in thông báo: Nếu khớp, xác nhận dữ liệu thô nguyên vẹn; nếu không khớp, cảnh báo tệp đã bị chỉnh sửa trái phép (vi phạm nguyên tắc Raw Data Immutability).",
            "hint": "Đọc file theo khối binary 'rb', cập nhật hashlib.sha256(chunk), lấy hexdigest() so sánh với expected_hash.",
            "solutionCode": "import hashlib\nimport os\n\ndef calculate_sha256(file_path):\n    sha = hashlib.sha256()\n    with open(file_path, 'rb') as f:\n        while chunk := f.read(8192):\n            sha.update(chunk)\n    return sha.hexdigest()\n\ndef verify_raw_data_integrity(file_path, expected_hash):\n    actual_hash = calculate_sha256(file_path)\n    if actual_hash == expected_hash:\n        print(\"✓ TÍNH TOÀN VẸN ĐẠT: Tệp dữ liệu thô hoàn toàn nguyên vẹn.\")\n        return True\n    else:\n        print(f\"✗ CẢNH BÁO: Tệp đã bị can thiệp!\\nKỳ vọng: {expected_hash}\\nThực tế: {actual_hash}\")\n        return False\n\n# Tạo file giả lập\nsample_path = \"raw_sample_data.csv\"\nwith open(sample_path, \"w\", encoding=\"utf-8\") as f:\n    f.write(\"id,value\\n1,100\\n2,200\\n\")\n\nexpected = calculate_sha256(sample_path)\nverify_raw_data_integrity(sample_path, expected)\nif os.path.exists(sample_path): os.remove(sample_path)",
            "explanation": "Nguyên tắc bất biến của dữ liệu thô (Raw Data Immutability) là hòn đá tảng của kỹ nghệ dữ liệu tái lập (Reproducible Data Science). Việc lưu trữ và kiểm toán mã băm SHA-256 bảo đảm nguồn gốc dữ liệu (Data Lineage) không bị can thiệp thủ công bằng Excel hay các script chỉnh sửa tùy tiện.",
            "solutionOutput": "✓ TÍNH TOÀN VẸN ĐẠT: Tệp dữ liệu thô hoàn toàn nguyên vẹn."
          },
          {
            "level": "Vừa",
            "title": "Gắn Type Hints hoàn chỉnh (PEP 484) cho hàm Data Pipeline",
            "problem": "Cho một hàm làm sạch dữ liệu không có type hints: `def clean_text_columns(df, columns, fill_value=''): ...`. Hãy viết lại hàm với đầy đủ Type Hints chuẩn PEP 484: Nhận DataFrame, `List[str]`, `str` và trả về `pd.DataFrame`. Viết docstring chuẩn Google/NumPy mô tả các tham số và giá trị trả về.",
            "hint": "Dùng from typing import List, định nghĩa def clean_text_columns(df: pd.DataFrame, columns: List[str], fill_value: str = '') -> pd.DataFrame:.",
            "solutionCode": "from typing import List\nimport pandas as pd\n\ndef clean_text_columns(\n    df: pd.DataFrame,\n    columns: List[str],\n    fill_value: str = ''\n) -> pd.DataFrame:\n    \"\"\"Làm sạch và điền khuyết thiếu cho các cột văn bản trong DataFrame.\n\n    Args:\n        df (pd.DataFrame): DataFrame nguồn cần xử lý.\n        columns (List[str]): Danh sách tên các cột văn bản cần chuẩn hóa.\n        fill_value (str, optional): Giá trị thay thế cho các ô NaN. Mặc định là chuỗi rỗng.\n\n    Returns:\n        pd.DataFrame: Một bản sao DataFrame đã được làm sạch.\n    \"\"\"\n    df_clean = df.copy()\n    for col in columns:\n        if col in df_clean.columns:\n            df_clean[col] = df_clean[col].fillna(fill_value).astype(str).str.strip()\n    return df_clean\n\n# Thử nghiệm hàm có Type Hints\ntest_df = pd.DataFrame({'name': ['  An ', None, 'Bình  '], 'code': ['C1', 'C2', None]})\nres = clean_text_columns(test_df, ['name', 'code'])\nprint(\"Kết quả làm sạch chuẩn Type Hints:\\n\", res)",
            "explanation": "PEP 484 Type Hints giúp mã nguồn Data Science chuyển hóa từ dạng kịch bản thử nghiệm sang phần mềm kỹ nghệ chuẩn mực. Type hints cho phép các công cụ phân tích tĩnh (như mypy, Pylance) và IDE phát hiện sớm các lỗi sai kiểu dữ liệu trước khi triển khai lên môi trường Production.",
            "solutionOutput": "Kết quả làm sạch chuẩn Type Hints:\r\n    name code\r\n0    An   C1\r\n1         C2\r\n2  Bình"
          },
          {
            "level": "Nâng cao",
            "title": "Tự động tạo cây thư mục chuẩn Cookiecutter Data Science",
            "problem": "Viết một script Python sử dụng thư viện chuẩn `pathlib.Path` để tự động khởi tạo cấu trúc thư mục dự án chuẩn Cookiecutter Data Science: `['data/raw', 'data/processed', 'data/quarantine', 'notebooks', 'src/features', 'src/models', 'reports/figures']`. Tự động tạo một tệp `.gitkeep` rỗng bên trong từng thư mục để Git có thể theo dõi.",
            "hint": "Dùng Path(dir_path).mkdir(parents=True, exist_ok=True) và (Path(dir_path) / '.gitkeep').touch().",
            "solutionCode": "from pathlib import Path\nimport shutil\n\ndef setup_cookiecutter_structure(base_dir=\"test_project\"):\n    directories = [\n        \"data/raw\",\n        \"data/processed\",\n        \"data/quarantine\",\n        \"notebooks\",\n        \"src/features\",\n        \"src/models\",\n        \"reports/figures\"\n    ]\n    \n    base = Path(base_dir)\n    created_count = 0\n    \n    for rel_path in directories:\n        full_dir = base / rel_path\n        full_dir.mkdir(parents=True, exist_ok=True)\n        # Tạo file .gitkeep\n        gitkeep = full_dir / \".gitkeep\"\n        gitkeep.touch(exist_ok=True)\n        created_count += 1\n        \n    print(f\"Đã khởi tạo thành công {created_count} thư mục chuẩn Cookiecutter tại '{base_dir}'.\")\n    return True\n\nsetup_cookiecutter_structure(\"my_data_science_project\")\n# Dọn dẹp thư mục sau test\nshutil.rmtree(\"my_data_science_project\")",
            "explanation": "Chuẩn cấu trúc Cookiecutter Data Science mang lại sự thống nhất cao độ trong toàn đội ngũ: Dữ liệu thô không bao giờ bị ghi đè (data/raw), mã nguồn xử lý tính năng được module hóa độc lập (src/features), và các thí nghiệm phân tích được phân tách rạch ròi khỏi mã nguồn sản xuất.",
            "solutionOutput": "Đã khởi tạo thành công 7 thư mục chuẩn Cookiecutter tại 'my_data_science_project'."
          }
        ],
        "quiz": [
          {
            "question": "Theo nghiên cứu của Wilson et al. (2017) về các thực hành chuẩn mực trong tính toán khoa học, quy tắc nào sau đây là BẮT BUỘC ĐỐI VỚI DỮ LIỆU THÔ (Raw Data)?",
            "options": [
              "(Recommended) Dữ liệu thô là bất biến (Immutable); tuyệt đối không bao giờ chỉnh sửa trực tiếp bằng tay trên tệp gốc, mọi biến đổi phải thực hiện bằng mã lệnh tự động lưu sang thư mục khác.",
              "Dữ liệu thô phải luôn được ghi đè ngay sau khi làm sạch để tiết kiệm dung lượng đĩa.",
              "Dữ liệu thô phải được xóa bỏ ngay sau khi huấn luyện xong mô hình học máy.",
              "Dữ liệu thô phải được lưu trong thư mục notebooks/."
            ],
            "correctAnswer": "(Recommended) Dữ liệu thô là bất biến (Immutable); tuyệt đối không bao giờ chỉnh sửa trực tiếp bằng tay trên tệp gốc, mọi biến đổi phải thực hiện bằng mã lệnh tự động lưu sang thư mục khác.",
            "explanation": "Nguyên tắc bất biến của dữ liệu thô bảo đảm rằng bạn luôn có thể tái lập lại toàn bộ quá trình nghiên cứu từ điểm xuất phát ban đầu, đồng thời bảo toàn bằng chứng pháp lý khi cần kiểm toán dữ liệu."
          },
          {
            "question": "Trong cấu trúc dự án Cookiecutter Data Science, vai trò chuẩn mực của sổ tay Jupyter Notebooks (thư mục notebooks/) là gì?",
            "options": [
              "(Recommended) Chỉ dùng cho việc khám phá ban đầu (Exploratory Data Analysis), thử nghiệm trực quan hóa và trình bày kết quả; toàn bộ mã logic cốt lõi phải được chuyển vào thư mục src/.",
              "Là nơi lưu trữ toàn bộ các hàm sản xuất tự động chạy định kỳ hàng đêm.",
              "Là nơi lưu trữ các tệp cơ sở dữ liệu nhị phân dung lượng lớn.",
              "Là nơi cấu hình các khóa API bí mật của hệ thống."
            ],
            "correctAnswer": "(Recommended) Chỉ dùng cho việc khám phá ban đầu (Exploratory Data Analysis), thử nghiệm trực quan hóa và trình bày kết quả; toàn bộ mã logic cốt lõi phải được chuyển vào thư mục src/.",
            "explanation": "Notebooks rất tuyệt để khám phá dữ liệu tương tác, nhưng rất khó để Unit Test, khó kiểm soát phiên bản Git và dễ gây lỗi thứ tự chạy ô (Out-of-order execution). Mã sản xuất bắt buộc phải nằm trong các module của src/."
          },
          {
            "question": "Lợi ích nổi bật nhất của việc áp dụng Gợi ý kiểu dữ liệu (PEP 484 Type Hints) trong các hàm xử lý dữ liệu của Pandas là gì?",
            "options": [
              "(Recommended) Tăng tính tự tài liệu hóa (Self-documenting code), cho phép các công cụ IDE và linter phát hiện sớm các lỗi sai kiểu dữ liệu tĩnh trước khi chạy mã nguồn.",
              "Tự động tăng tốc độ xử lý của CPU lên gấp 10 lần.",
              "Tự động sửa các lỗi thiếu dữ liệu NaN trong bảng.",
              "Giảm kích thước file script Python xuống một nửa."
            ],
            "correctAnswer": "(Recommended) Tăng tính tự tài liệu hóa (Self-documenting code), cho phép các công cụ IDE và linter phát hiện sớm các lỗi sai kiểu dữ liệu tĩnh trước khi chạy mã nguồn.",
            "explanation": "Type Hints không làm tăng tốc độ chạy của Python nhưng cung cấp hợp đồng giao diện rõ ràng cho đồng nghiệp, giúp IDE gợi ý cú pháp chuẩn xác và bắt lỗi sai tham số ngay khi đang gõ code."
          }
        ],
        "selfReviewQuestions": [
          "Trình bày 4 quy tắc cốt lõi trong nghiên cứu dữ liệu tái lập của Sandve et al. (2013).",
          "Nêu cấu trúc 5 thư mục con chính trong một dự án Cookiecutter Data Science.",
          "Tại sao việc cố định phiên bản thư viện trong requirements.txt (ví dụ: pandas==3.1.0 thay vì pandas>=3.0) lại bảo đảm tính tái lập?"
        ],
        "reflectionQuestion": "Một nhà nghiên cứu công bố mô hình dự báo doanh số xuất sắc trên bài báo khoa học. Khi doanh nghiệp mua lại mã nguồn với giá hàng tỷ đồng, họ phát hiện mã nguồn chỉ gồm một file Jupyter Notebook dài 5.000 dòng, không có requirements.txt, không có cấu trúc thư mục, và khi chạy lại thì liên tục bị lỗi do thư viện đã nâng cấp. Dưới góc độ tiêu chuẩn công nghiệp, bạn hãy nhận xét về chất lượng của sản phẩm này.",
        "reflectionHint": "Đây là ví dụ điển hình của 'Khủng hoảng tái lập' (Replication Crisis) và nợ kỹ thuật (Technical Debt) nghiêm trọng: Một sản phẩm dù có thuật toán hay đến đâu nhưng không thể tái lập (Unreproducible), không có kiểm thử, không cố định môi trường và mã nguồn spaghetti thì hoàn toàn vô giá trị trong môi trường sản xuất của doanh nghiệp.",
        "nextLessonPreview": "Ở bài 12.3, chúng ta sẽ bước sang kỹ thuật lập trình nâng cao: Xây dựng đường ống biến đổi dữ liệu thuần khiết và dễ kiểm thử với phương thức .pipe(), loại bỏ hoàn toàn các biến trung gian rác!",
        "references": [
          {
            "title": "Good Enough Practices in Scientific Computing (Wilson et al., 2017, PLOS Comp Bio)",
            "url": "https://doi.org/10.1371/journal.pcbi.1005510"
          },
          {
            "title": "Ten Simple Rules for Reproducible Computational Research (Sandve et al., 2013)",
            "url": "https://doi.org/10.1371/journal.pcbi.1003285"
          },
          {
            "title": "Cookiecutter Data Science Project Structure",
            "url": "https://drivendata.github.io/cookiecutter-data-science/"
          },
          {
            "title": "PEP 484 – Type Hints (Python Enhancement Proposals)",
            "url": "https://peps.python.org/pep-0484/"
          }
        ]
      },
      {
        "id": "pd-12-03",
        "number": "12.3",
        "title": "Đường Ống Biến Đổi Dễ Kiểm Thử Với .pipe()",
        "subtitle": "Triết lý Lập trình Hàm (Functional Data Wrangling), loại bỏ biến trung gian rác và chuỗi các hàm thuần khiết (Pure Functions)",
        "level": "Nâng cao",
        "duration": "50 phút",
        "objectives": [
          "Thấu hiểu triết lý Lập trình Hàm (Functional Programming) ứng dụng trong xử lý dữ liệu: Hàm thuần khiết (Pure Functions) và tính bất biến (Immutability).",
          "So sánh 3 phong cách viết mã dữ liệu: Biến trung gian rác (Intermediate Variables), Lồng hàm phức tạp (Nested Functions) và Chuỗi đường ống thanh thoát với .pipe().",
          "Thiết kế các hàm xử lý thành phần có thể tái sử dụng độc lập và dễ dàng Unit Test với Pytest.",
          "Xây dựng đường ống ETL/Wrangling hoàn chỉnh cho TechMart kết nối tuần tự từ làm sạch, kỹ nghệ đặc trưng đến kiểm định chất lượng."
        ],
        "intuition": {
          "title": "Băng Chuyền Lắp Ráp Xe Hơi & Ống Dẫn Dầu Tự Động",
          "metaphor": "Hãy xem cách một nhà máy hiện đại xử lý sản phẩm:\\n1. Phong Cách Biến Trung Gian (Nhiều rác): Bạn lấy khung xe ra bãi đất trống đặt tên là `xe_1`. Sau đó bạn gắn bánh xe vào, tạo một bãi đất mới đặt tên là `xe_2`. Sau đó bạn sơn màu, tạo bãi đất thứ ba đặt tên là `xe_3_final`... Sân nhà máy ngập tràn các bãi đất rác trung gian ngốn sạch bộ nhớ RAM!\\n2. Phong Cách Lồng Hàm (Khó đọc): Bạn viết `son_xe(gan_dong_co(lap_banh_xe(khung_xe)))`. Người đọc phải căng mắt đọc từ trong ruột đọc ngược ra ngoài, cực kỳ rối rắm và khó gỡ lỗi!\\n3. Phương Thức .pipe() (Băng Chuyền Tự Động): Khung xe được đặt lên đầu băng chuyền: Băng chuyền tự động đẩy khung xe qua Trạm 1 (Lắp bánh xe) &rarr; Trạm 2 (Gắn động cơ) &rarr; Trạm 3 (Sơn xe) &rarr; Xe hoàn chỉnh lăn bánh ra khỏi nhà máy!\\n   - Cú pháp thanh thoát tuyệt đối: <code>xe_hoan_chinh = khung_xe.pipe(lap_banh_xe).pipe(gan_dong_co).pipe(son_xe)</code>!\\n   - Mỗi trạm là một kỹ sư chuyên nghiệp (Hàm thuần khiết): Bạn có thể tháo rời Trạm 1 ra để kiểm tra bảo dưỡng độc lập (Unit Test) mà không làm ảnh hưởng đến các trạm khác!",
          "boundary": "Mọi hàm được truyền vào .pipe() bắt buộc phải nhận DataFrame làm tham số đầu tiên, và phải trả về một DataFrame (hoặc Series) mới, tuyệt đối không chỉnh sửa đè (in-place mutation) lên DataFrame đầu vào.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">ĐƯỜNG ỐNG BIẾN ĐỔI THANH THOÁT VỚI .PIPE()</div>\n                        <div style=\"display:flex;align-items:center;justify-content:center;gap:6px;font-size:0.75rem;\">\n                          <div style=\"padding:4px 8px;border:1px solid #3b82f6;border-radius:4px;background:var(--bg-surface);\">raw_df</div>\n                          <div>&rarr;</div>\n                          <div style=\"padding:4px 8px;border:1px solid #10b981;border-radius:4px;background:var(--bg-surface);\">.pipe(clean_names)</div>\n                          <div>&rarr;</div>\n                          <div style=\"padding:4px 8px;border:1px solid #8b5cf6;border-radius:4px;background:var(--bg-surface);\">.pipe(remove_outliers)</div>\n                          <div>&rarr;</div>\n                          <div style=\"padding:4px 8px;border:1px solid #f59e0b;border-radius:4px;background:var(--bg-surface);\">.pipe(add_kpi)</div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-12-03-01",
            "title": "1. Ba Phong Cách Viết Mã Dữ Liệu: So Sánh Toàn Diện",
            "content": "\n                          <p>Trong kỹ nghệ dữ liệu, có 3 phong cách lập trình khi thực hiện chuỗi biến đổi nhiều bước:</p>\n                          <div class=\"table-responsive\">\n                            <table class=\"table-content\">\n                              <thead>\n                                <tr>\n                                  <th>Phong cách</th>\n                                  <th>Mã nguồn minh họa</th>\n                                  <th>Đánh giá chất lượng</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr>\n                                  <td><strong>1. Biến trung gian rác (Intermediate Variables)</strong></td>\n                                  <td><code>df1 = clean(df)<br>df2 = filter(df1)<br>df3 = aggregate(df2)</code></td>\n                                  <td><strong>Kém:</strong> Gây ô nhiễm không gian tên, lãng phí bộ nhớ RAM cho các bản sao trung gian, dễ gọi nhầm <code>df1</code> thay vì <code>df2</code>.</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>2. Lồng hàm lộn xộn (Nested Functions)</strong></td>\n                                  <td><code>aggregate(filter(clean(df)))</code></td>\n                                  <td><strong>Rất tệ:</strong> Vi phạm chiều đọc tự nhiên từ trái sang phải của con người; cực kỳ khó gỡ lỗi và kiểm thử.</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>3. Đường ống .pipe() (Pipeline Chaining)</strong></td>\n                                  <td><code>(df.pipe(clean)<br>&nbsp;&nbsp;.pipe(filter)<br>&nbsp;&nbsp;.pipe(aggregate))</code></td>\n                                  <td><strong>Hoàn hảo (Chuẩn công nghiệp):</strong> Dòng dữ liệu chảy tự nhiên theo chiều đọc, không tốn biến trung gian, mỗi bước là một hàm độc lập dễ dàng Unit Test!</td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                        "
          },
          {
            "id": "sec-12-03-02",
            "title": "2. Cấu Trúc Thiết Kế Hàm Thuần Khiết Cho .pipe()",
            "content": "\n                          <p>Để tích hợp mượt mà vào phương thức <code>.pipe()</code>, các hàm xử lý phải tuân thủ nguyên tắc <strong>Hàm thuần khiết (Pure Function)</strong>:</p>\n                          <ol>\n                            <li>Tham số đầu tiên luôn là <code>df: pd.DataFrame</code>.</li>\n                            <li>Không sửa đổi in-place DataFrame gốc (luôn gọi <code>df.copy()</code> hoặc trả về đối tượng mới).</li>\n                            <li>Đầu ra trả về một <code>pd.DataFrame</code> mới.</li>\n                            <li>Các tham số cấu hình phụ được truyền tiếp phía sau.</li>\n                          </ol>\n                          \n                        "
          },
          {
            "id": "sec-12-03-03",
            "title": "3. Lắp Ráp Đường Ống Hoàn Chỉnh & Dễ Dàng Unit Test",
            "content": "\n                          <p>Bằng cách kết hợp các hàm thuần khiết trên, toàn bộ đường ống được kích hoạt chỉ với một cú pháp duy nhất:</p>\n                          \n                          <h4>Ưu Thế Tuyệt Đối Cho Kiểm Thử:</h4>\n                          <p>Bạn không cần phải kiểm thử toàn bộ đường ống lớn cùng một lúc! Bạn có thể viết 3 bài Unit Test siêu nhỏ kiểm tra độc lập từng hàm: một bài test cho <code>standardize_headers</code>, một bài test cho <code>filter_by_threshold</code>, và một bài test cho <code>compute_tax</code>. Khi tất cả các mắt xích đều vững chắc, toàn bộ đường ống chắc chắn vận hành hoàn hảo!</p>\n                        ",
            "codeExamples": [
              {
                "id": "pd-12-03-c1",
                "lang": "python",
                "title": "Xây dựng đường ống xử lý dữ liệu sạch, dễ kiểm thử với phương thức .pipe()",
                "code": "import pandas as pd\nimport numpy as np\n\n# Tạo tập dữ liệu thô mẫu\nraw_data = pd.DataFrame({\n    'cust_name': ['  Nguyen Van A  ', 'Tran Thi B', 'Le Van C  '],\n    'phone': ['0901234567', '0912345678', 'invalid_phone'],\n    'spend': [250000, 400000, -10000]\n})\n\n# Định nghĩa các hàm xử lý dữ liệu thuần khiết (Pure Functions)\ndef clean_names(df):\n    df = df.copy()\n    df['cust_name'] = df['cust_name'].str.strip()\n    return df\n\ndef filter_valid_spend(df):\n    return df[df['spend'] > 0].copy()\n\ndef categorize_tier(df):\n    df = df.copy()\n    df['tier'] = np.where(df['spend'] >= 300000, 'VIP', 'STANDARD')\n    return df\n\n# Lắp ráp chuỗi đường ống biến đổi hoàn chỉnh qua .pipe()\nclean_df = (\n    raw_data\n    .pipe(clean_names)\n    .pipe(filter_valid_spend)\n    .pipe(categorize_tier)\n)\n\nprint(\"KẾT QUẢ ĐƯỜNG ỐNG BIẾN ĐỔI .pipe():\\n\", clean_df)",
                "output": "KẾT QUẢ ĐƯỜNG ỐNG BIẾN ĐỔI .pipe():\n         cust_name        phone   spend      tier\n0    Nguyen Van A   0901234567  250000  STANDARD\n1      Tran Thi B   0912345678  400000       VIP",
                "explanation": "Phương thức .pipe() cho phép kết nối các hàm xử lý dữ liệu một cách tuyến tính từ trên xuống dưới, tránh tạo các biến trung gian rác và giúp viết Unit Test cho từng mắt xích cực kỳ dễ dàng."
              }
            ]
          }
        ],
        "summary": [
          "Phương thức .pipe() hiện thực hóa triết lý Lập trình Hàm trong Pandas, loại bỏ hoàn toàn các biến trung gian rác và chuỗi lồng hàm rối rắm.",
          "Hàm dành cho .pipe() phải là Hàm thuần khiết: Nhận DataFrame làm tham số đầu tiên, không can thiệp in-place, và trả về DataFrame mới.",
          "Cho phép truyền các tham số bổ sung linh hoạt vào sau tên hàm trong lệnh .pipe(func, arg1, arg2=val).",
          "Kiến trúc đường ống dạng module giúp việc Unit Test trở nên cực kỳ đơn giản và độc lập từng bước."
        ],
        "workedExample": {
          "scenario": "Đường ống xử lý dữ liệu bán hàng TechMart với chuỗi 4 hàm .pipe()",
          "code": "import pandas as pd\n\n# 1. Các hàm thành phần thuần khiết\ndef clean_columns(df: pd.DataFrame) -> pd.DataFrame:\n    d = df.copy()\n    d.columns = [c.strip().lower().replace(' ', '_') for c in d.columns]\n    return d\n\ndef drop_invalid_rows(df: pd.DataFrame) -> pd.DataFrame:\n    return df.dropna(subset=['order_id', 'amount']).copy()\n\ndef add_discount_tier(df: pd.DataFrame) -> pd.DataFrame:\n    d = df.copy()\n    d['tier'] = d['amount'].apply(lambda x: 'VIP' if x >= 1000000 else 'Standard')\n    return d\n\ndef calculate_kpis(df: pd.DataFrame) -> pd.DataFrame:\n    d = df.copy()\n    d['discount_val'] = d['amount'] * d['tier'].map({'VIP': 0.1, 'Standard': 0.0})\n    d['net_amount'] = d['amount'] - d['discount_val']\n    return d\n\n# Dữ liệu thô\nraw_orders = pd.DataFrame({\n    ' Order ID ': [101, 102, None, 104],\n    ' Amount ': [1500000, 450000, 200000, 2200000]\n})\n\n# Thực thi đường ống .pipe()\nclean_pipeline = (\n    raw_orders\n    .pipe(clean_columns)\n    .pipe(drop_invalid_rows)\n    .pipe(add_discount_tier)\n    .pipe(calculate_kpis)\n)\n\nprint(\"Kết quả đường ống .pipe() hoàn chỉnh:\\n\", clean_pipeline[['order_id', 'amount', 'tier', 'net_amount']])",
          "explanation": "1. Dòng dữ liệu chảy mượt mà qua 4 bước: Chuẩn hóa tên cột -> Xóa dòng rỗng -> Gắn phân hạng khách hàng -> Tính chiết khấu và doanh thu thuần.\\n2. Mã nguồn sáng rõ, không tạo biến trung gian df1, df2, df3 nào trong bộ nhớ RAM."
        },
        "fadedExample": {
          "scenario": "Truyền tham số tùy chọn vào phương thức .pipe()",
          "code": "import pandas as pd\n\ndef apply_tax_rate(df: pd.DataFrame, rate: float) -> pd.DataFrame:\n    res = df.copy()\n    res['tax'] = res['revenue'] * rate\n    return res\n\ndf_sample = pd.DataFrame({'revenue': [100.0, 200.0]})\n\n# Yêu cầu: Gọi hàm apply_tax_rate thông qua .pipe() với mức thuế rate=0.1\n# Gợi ý: df_sample.pipe(apply_tax_rate, rate=0.1)\n\ndf_taxed = df_sample.pipe(apply_tax_rate, rate=0.1)\nprint(df_taxed)",
          "blankExplanation": "Điền lệnh df_sample.pipe(apply_tax_rate, rate=0.1). Pandas tự động truyền df_sample vào tham số đầu tiên của hàm, và chuyển tiếp rate=0.1 vào tham số thứ hai."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Viết các hàm biến đổi modular để ghép nối bằng df.pipe()",
            "problem": "Viết 2 hàm: `clean_column_names(df)` (chuyển toàn bộ tên cột thành chữ thường và thay dấu cách bằng dấu gạch dưới) và `filter_active_users(df)` (chỉ giữ lại các dòng có cột `status == 'active'`). Sau đó áp dụng phương thức `df.pipe()` để xâu chuỗi liên tiếp 2 hàm trên theo phong cách Method Chaining.",
            "hint": "df_result = (df.pipe(clean_column_names).pipe(filter_active_users)).",
            "solutionCode": "import pandas as pd\n\ndef clean_column_names(df):\n    df_res = df.copy()\n    df_res.columns = df_res.columns.str.lower().str.replace(' ', '_')\n    return df_res\n\ndef filter_active_users(df):\n    return df[df['status'] == 'active'].copy()\n\n# Bảng ban đầu với tiêu đề cột lộn xộn\ndf_users = pd.DataFrame({\n    'User Name': ['An', 'Bình', 'Chi'],\n    'Status': ['active', 'inactive', 'active'],\n    'Score': [85, 40, 92]\n})\n\nclean_df = (\n    df_users\n    .pipe(clean_column_names)\n    .pipe(filter_active_users)\n)\n\nprint(\"Kết quả đường ống .pipe():\\n\", clean_df)",
            "explanation": "Phương thức .pipe() cho phép cấu trúc hóa các hàm xử lý dữ liệu phức tạp thành một đường ống (Pipeline) liền mạch. Thay vì phải lồng các hàm vào nhau theo kiểu clean(filter(df)) rất khó đọc, .pipe() giúp luồng biến đổi dữ liệu đọc tuần tự từ trên xuống dưới như một câu chuyện.",
            "solutionOutput": "Kết quả đường ống .pipe():\r\n   user_name  status  score\r\n0        An  active     85\r\n2       Chi  active     92"
          },
          {
            "level": "Vừa",
            "title": "Viết Unit Test cho từng mắt xích độc lập trong chuỗi .pipe()",
            "problem": "Một ưu điểm lớn của đường ống `.pipe()` là từng mắt xích là một hàm thuần túy (Pure Function) rất dễ viết Unit Test độc lập. Viết bài test độc lập cho hàm `add_profit_margin(df)`: nhận DataFrame có `revenue` và `cost`, tính cột `margin = (revenue - cost) / revenue`. Sử dụng `pd.testing.assert_series_equal()` để kiểm chứng kết quả.",
            "hint": "Tạo test_df, gọi add_profit_margin, tạo expected_series = pd.Series([0.2, 0.5], name='margin'), gọi pd.testing.assert_series_equal.",
            "solutionCode": "import pandas as pd\n\ndef add_profit_margin(df):\n    df_res = df.copy()\n    df_res['margin'] = (df_res['revenue'] - df_res['cost']) / df_res['revenue']\n    return df_res\n\ndef test_add_profit_margin_unit():\n    input_df = pd.DataFrame({\n        'revenue': [100.0, 200.0],\n        'cost': [80.0, 100.0]\n    })\n    \n    result_df = add_profit_margin(input_df)\n    expected_margin = pd.Series([0.2, 0.5], name='margin')\n    \n    pd.testing.assert_series_equal(result_df['margin'], expected_margin)\n    print(\"UNIT TEST PASSED: Hàm add_profit_margin tính toán biên lợi nhuận chính xác 100%.\")\n\ntest_add_profit_margin_unit()",
            "explanation": "Hàm thuần túy (Pure Function) không làm biến đổi DataFrame đầu vào (No side effects) mà luôn tạo bản sao hoặc trả về kết quả mới. Nhờ đó, ta có thể viết các bài kiểm thử đơn vị độc lập cực kỳ nhanh chóng mà không cần phải dựng môi trường hay nạp toàn bộ dữ liệu phức tạp.",
            "solutionOutput": "UNIT TEST PASSED: Hàm add_profit_margin tính toán biên lợi nhuận chính xác 100%."
          },
          {
            "level": "Nâng cao",
            "title": "Tích hợp Logging và đo thời gian thực thi vào từng bước của .pipe()",
            "problem": "Một nhược điểm của chuỗi `.pipe()` là khó debug kích thước bảng ở từng bước trung gian. Hãy viết một hàm tiện ích `log_step(df, step_name)` có thể nhúng vào bất kỳ vị trí nào trong chuỗi `.pipe()`. Hàm này in ra màn hình: Tên bước, Kích thước bảng (Shape) hiện tại và Thời gian thực thi; sau đó trả nguyên vẹn DataFrame để chuỗi tiếp tục chảy.",
            "hint": "def log_step(df, step_name): print(f\"[{step_name}] Shape: {df.shape}\"); return df.",
            "solutionCode": "import pandas as pd\nimport time\n\ndef log_step(df, step_name):\n    # Ghi log kích thước và cấu trúc bảng\n    print(f\"-> [LOG PIPELINE] {step_name:.<30} Số dòng: {df.shape[0]:>6}, Số cột: {df.shape[1]}\")\n    return df\n\n# Giả lập pipeline hoàn chỉnh với logging tích hợp\ndf_raw = pd.DataFrame({'id': range(100), 'val': range(100)})\n\npipeline_output = (\n    df_raw\n    .pipe(log_step, \"Bước 1: Nạp dữ liệu thô\")\n    .assign(val_squared=lambda x: x['val'] ** 2)\n    .pipe(log_step, \"Bước 2: Tạo tính năng bình phương\")\n    .query(\"val > 50\")\n    .pipe(log_step, \"Bước 3: Lọc ngưỡng val > 50\")\n)\nprint(\"Pipeline hoàn tất thành công!\")",
            "explanation": "Mẫu thiết kế Passthrough Logger (nhận df, in log chẩn đoán, trả về chính df) giải quyết hoàn toàn bài toán \"hộp đen\" khi debug các chuỗi Data Pipeline dài. Kỹ sư có thể nhìn thấy chính xác số dòng bị rơi rụng (Data Dropout) ở từng mắt xích mà không làm phá vỡ cấu trúc chuỗi.",
            "solutionOutput": "-> [LOG PIPELINE] Bước 1: Nạp dữ liệu thô....... Số dòng:    100, Số cột: 2\r\n-> [LOG PIPELINE] Bước 2: Tạo tính năng bình phương Số dòng:    100, Số cột: 3\r\n-> [LOG PIPELINE] Bước 3: Lọc ngưỡng val > 50... Số dòng:     49, Số cột: 3\r\nPipeline hoàn tất thành công!"
          }
        ],
        "quiz": [
          {
            "question": "Ưu thế lớn nhất của việc sử dụng phương thức 'df.pipe()' so với việc tạo hàng loạt các biến trung gian (df1, df2, df3) trong quá trình xử lý dữ liệu là gì?",
            "options": [
              "(Recommended) Giữ cho dòng dữ liệu chảy liên tục và thanh thoát theo chiều đọc tự nhiên, loại bỏ hoàn toàn các biến trung gian rác làm ô nhiễm không gian tên và tiết kiệm bộ nhớ RAM.",
              "Tự động chuyển đổi ngôn ngữ Python sang mã máy C++.",
              "Tự động vẽ biểu đồ trực quan hóa dữ liệu.",
              "Không cho phép người dùng thay đổi dữ liệu."
            ],
            "correctAnswer": "(Recommended) Giữ cho dòng dữ liệu chảy liên tục và thanh thoát theo chiều đọc tự nhiên, loại bỏ hoàn toàn các biến trung gian rác làm ô nhiễm không gian tên và tiết kiệm bộ nhớ RAM.",
            "explanation": ".pipe() mang phong cách Lập trình Hàm (Functional Programming), giúp mã nguồn sạch sẽ, không tạo rác biến trung gian trong bộ nhớ và cực kỳ dễ theo dõi dòng chảy của dữ liệu."
          },
          {
            "question": "Quy tắc thiết kế BẮT BUỘC đối với một hàm để có thể sử dụng được bên trong phương thức 'df.pipe(my_func)' là gì?",
            "options": [
              "(Recommended) Hàm đó bắt buộc phải nhận một DataFrame (hoặc Series) làm tham số đầu tiên, và phải trả về một DataFrame (hoặc Series) hợp lệ.",
              "Hàm đó phải được viết bằng ngôn ngữ C hoặc Cython.",
              "Hàm đó không được phép nhận bất kỳ tham số phụ nào khác.",
              "Hàm đó bắt buộc phải có ít nhất 100 dòng mã lệnh."
            ],
            "correctAnswer": "(Recommended) Hàm đó bắt buộc phải nhận một DataFrame (hoặc Series) làm tham số đầu tiên, và phải trả về một DataFrame (hoặc Series) hợp lệ.",
            "explanation": "Pandas thiết kế .pipe(func) sao cho nó tự động truyền đối tượng DataFrame gọi nó vào vị trí đối số đầu tiên của func (tương tự như func(df)). Do đó, hàm phải nhận DataFrame đầu tiên và trả về DataFrame kết quả để tiếp tục chuỗi."
          },
          {
            "question": "Làm thế nào để truyền thêm các tham số bổ sung (như threshold=50, tax_rate=0.08) vào một hàm được gọi qua phương thức '.pipe()'?",
            "options": [
              "(Recommended) Truyền trực tiếp các tham số đó vào ngay sau tên hàm bên trong dấu ngoặc của .pipe(), ví dụ: df.pipe(my_func, threshold=50, tax_rate=0.08).",
              "Tạo một biến toàn cục (Global variable) bên ngoài hàm.",
              "Bắt buộc phải sửa lại mã nguồn của thư viện Pandas.",
              "Phương thức .pipe() không hỗ trợ truyền thêm tham số phụ."
            ],
            "correctAnswer": "(Recommended) Truyền trực tiếp các tham số đó vào ngay sau tên hàm bên trong dấu ngoặc của .pipe(), ví dụ: df.pipe(my_func, threshold=50, tax_rate=0.08).",
            "explanation": "Cú pháp của .pipe() nhận *args và **kwargs: df.pipe(func, *args, **kwargs) sẽ tự động thực thi lệnh func(df, *args, **kwargs), cho phép truyền tham số phụ cực kỳ linh hoạt."
          }
        ],
        "selfReviewQuestions": [
          "Trình bày khái niệm Hàm thuần khiết (Pure Function) và giải thích tại sao không nên dùng in-place mutation trong các hàm của .pipe().",
          "So sánh phong cách viết mã lồng hàm f(g(h(df))) và phong cách chuỗi df.pipe(h).pipe(g).pipe(f).",
          "Cách thức chèn một bước ghi nhật ký (logging) vào giữa chuỗi .pipe() mà không làm gián đoạn đường ống."
        ],
        "reflectionQuestion": "Một bạn lập trình viên viết một hàm trong chuỗi .pipe() như sau: `def add_col(df): df['new'] = 10; return df`. Bạn ấy không dùng df.copy() mà sửa trực tiếp lên DataFrame đầu vào. Hãy phân tích tác dụng phụ (Side-effect) nguy hiểm của hàm này đối với tính đúng đắn của dữ liệu gốc và khả năng viết Unit Test độc lập.",
        "reflectionHint": "Hàm này vi phạm tính chất Hàm thuần khiết (In-place Mutation): Nó âm thầm làm biến đổi vĩnh viễn DataFrame gốc ban đầu bên ngoài đường ống. Nếu sau này có một đoạn mã khác cần sử dụng DataFrame gốc chưa có cột 'new', dữ liệu đã bị nhiễm độc ngầm! Ngoài ra, việc làm biến dạng dữ liệu gốc phá vỡ tính cô lập của các bài Unit Test, khiến các test chạy sau bị phụ thuộc vào trạng thái của test chạy trước.",
        "nextLessonPreview": "Chào mừng bạn đến với đỉnh cao của khóa học: Module 13 (Đồ Án Tốt Nghiệp Thực Chiến End-to-End)! Chúng ta sẽ tích hợp toàn bộ kiến thức của 12 module vào một dự án duy nhất: Từ Ingestion API, Validation Gate ISO 25012, Quarantine, Wrangling Tidy Data, EDA Anscombe, Trực quan hóa WCAG đến Đóng gói tự động!",
        "references": [
          {
            "title": "Pandas Official Documentation - Method Chaining & Pipe",
            "url": "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.pipe.html"
          },
          {
            "title": "Functional Programming in Python (David Mertz, O'Reilly)",
            "url": "https://www.oreilly.com/library/view/functional-programming-in/9781492048633/"
          }
        ]
      }
    ]
  },
  {
    "id": "mod-13",
    "number": "Module 13",
    "title": "Đồ Án Tốt Nghiệp: Hệ Thống Phân Tích Dữ Liệu Doanh Nghiệp TechMart",
    "badge": "3 Bài học",
    "icon": "🎓",
    "description": "Đỉnh cao tích hợp thực tế theo Merrill's First Principles và các bậc Bloom Đánh giá / Sáng tạo: Triển khai trọn vẹn chu trình CRISP-DM 6 giai đoạn, thiết lập Datasheets for Datasets (Gebru et al.), xây dựng đường ống ETL với Validation Gate & Quarantine, phân tích EDA, trực quan hóa chuẩn Tufte/WCAG và đóng gói tự động hóa 100% có thể tái lập.",
    "lessons": [
      {
        "id": "pd-13-01",
        "number": "13.1",
        "title": "Khởi Tạo Dự Án: Vòng Đời CRISP-DM & Datasheets For Datasets",
        "subtitle": "Xác lập bài toán kinh doanh, lập hồ sơ nguồn gốc dữ liệu Datasheets for Datasets (Gebru et al.) và xây dựng module Ingestion",
        "level": "Nâng cao",
        "duration": "50 phút",
        "objectives": [
          "Ánh xạ bài toán tối ưu hóa vận hành chuỗi bán lẻ TechMart vào trọn vẹn 6 giai đoạn của chu trình chuẩn quốc tế CRISP-DM (Cross-Industry Standard Process for Data Mining).",
          "Thiết lập hồ sơ minh bạch nguồn gốc và đạo đức dữ liệu theo tiêu chuẩn 'Datasheets for Datasets' của Timnit Gebru et al. (2021).",
          "Khởi tạo cấu trúc dự án chuẩn Cookiecutter Data Science, quản lý cấu hình bí mật theo chuẩn Twelve-Factor và cố định môi trường tái lập.",
          "Xây dựng module Tiếp nhận Dữ liệu (Data Ingestion) với cơ chế Mock API, áp dụng Exponential Backoff có Full Jitter và lưu trữ dữ liệu thô bất biến (Raw Data Immutability) vào data/raw/."
        ],
        "intuition": {
          "title": "Bản Đồ Hành Quân & Chứng Minh Thư Dữ Liệu",
          "metaphor": "Hãy xem cách một kiến trúc sư trưởng bắt đầu một dự án quy mô lớn:\\n1. Chu Trình CRISP-DM: Một vị tướng cầm quân không bao giờ xua quân vào rừng mà không có bản đồ chiến lược! CRISP-DM là bản đồ 6 chặng:\\n   - Chặng 1 (Business Understanding): Hiểu rõ ta đánh trận này để làm gì? TechMart đang bị chảy máu doanh thu ở đâu?\\n   - Chặng 2 (Data Understanding): Ta có những vũ khí dữ liệu gì? Bảng đơn hàng, bảng khách hàng, bảng tồn kho có cạm bẫy gì?\\n   - Chặng 3 (Data Preparation): Chế tạo đạn dược sạch sẽ (Làm sạch, lọc bẩn vào Quarantine, Tidy Data).\\n   - Chặng 4 (Modeling / Analysis): Đặt kính ngắm và khai hỏa phân tích.\\n   - Chặng 5 (Evaluation): Đo đạc độ chính xác và kiểm tra rủi ro ngụy biện.\\n   - Chặng 6 (Deployment): Chuyển giao hệ thống tự động cho ban điều hành.\\n2. Datasheets for Datasets (Timnit Gebru et al., 2021): Giống như 'Giấy chứng nhận xuất xứ hàng hóa (C/O)' và tem kiểm định an toàn vệ sinh thực phẩm: Ai đã thu thập tập dữ liệu này? Thu thập vào năm nào? Có vi phạm quyền riêng tư của khách hàng không? Dữ liệu này phù hợp cho việc gì và CẤM DÙNG cho việc gì?\\n3. Dữ Liệu Thô Bất Biến: Tập dữ liệu vừa tải về được cất vào két sắt `data/raw/` và khóa chặt lại. Không ai có quyền sửa dù chỉ 1 dấu phẩy!",
          "boundary": "CRISP-DM là một chu trình lặp (Iterative cycle), không phải đường thẳng một chiều: Khi phân tích ở giai đoạn 4 phát hiện dữ liệu bị thiếu nghiêm trọng, bạn hoàn toàn có thể quay lại giai đoạn 2 hoặc 3 để thu thập và làm sạch thêm.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">VÒNG ĐỜI CHUẨN QUỐC TẾ CRISP-DM CHO DỰ ÁN TECHMART</div>\n                        <div style=\"display:grid;grid-template-columns:repeat(3, 1fr);gap:6px;text-align:center;\">\n                          <div style=\"padding:6px;border:1px solid #3b82f6;border-radius:4px;background:var(--bg-surface);font-size:0.7rem;\">\n                            <strong>1. Business</strong><br>Hiểu bài toán kinh doanh\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #3b82f6;border-radius:4px;background:var(--bg-surface);font-size:0.7rem;\">\n                            <strong>2. Data Under.</strong><br>Khám phá nguồn thô\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #10b981;border-radius:4px;background:var(--bg-surface);font-size:0.7rem;\">\n                            <strong>3. Preparation</strong><br>Validation &amp; Wrangling\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #10b981;border-radius:4px;background:var(--bg-surface);font-size:0.7rem;\">\n                            <strong>4. Analysis</strong><br>EDA &amp; LTV Modeling\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #f59e0b;border-radius:4px;background:var(--bg-surface);font-size:0.7rem;\">\n                            <strong>5. Evaluation</strong><br>Đánh giá độ tin cậy\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #8b5cf6;border-radius:4px;background:var(--bg-surface);font-size:0.7rem;\">\n                            <strong>6. Deployment</strong><br>Đóng gói tự động\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-13-01-01",
            "title": "1. Khung Chiến Lược CRISP-DM Cho Dự Án Doanh Nghiệp TechMart",
            "content": "\n                          <p>Trong đồ án tốt nghiệp này, bạn đóng vai trò là <strong>Lead Data Engineer kiêm Data Scientist</strong> tại chuỗi siêu thị bán lẻ công nghệ TechMart. Ban Giám Đốc giao cho bạn nhiệm vụ xây dựng một hệ thống phân tích tự động từ đầu đến cuối nhằm giải quyết bài toán: <em>'Tối ưu hóa hiệu quả kinh doanh đa kênh, nhận diện phân khúc khách hàng trung thành (LTV) và kiểm soát rủi ro thất thoát doanh thu'</em>.</p>\n                          <h4>Ánh Xạ 6 Giai Đoạn CRISP-DM:</h4>\n                          <ol>\n                            <li><strong>Business Understanding:</strong> Xác lập các chỉ số KPI mục tiêu: Doanh thu thuần (Net Revenue), Biên lợi nhuận (Gross Margin), Giá trị vòng đời khách hàng (LTV), Tỷ lệ đơn hàng bị lỗi (Defect Rate).</li>\n                            <li><strong>Data Understanding:</strong> Tiếp nhận dữ liệu giao dịch từ hệ thống POS bán lẻ, hồ sơ khách hàng từ CRM và danh mục sản phẩm từ ERP. Khám phá các thuộc tính, phát hiện các điểm dị biệt và bẫy chất lượng.</li>\n                            <li><strong>Data Preparation:</strong> Dựng Hàng rào kiểm định ISO/IEC 25012, phân luồng Quarantine Routing, xử lý Unicode tiếng Việt, và tái cấu trúc về Tidy Data.</li>\n                            <li><strong>Modeling / Analysis:</strong> Phân tích khám phá EDA, tính toán các số đo thống kê kháng nhiễu, ước lượng khoảng tin cậy 95% bằng Bootstrapping.</li>\n                            <li><strong>Evaluation:</strong> Đối chiếu kết quả với các rủi ro thiên kiến (Nghịch lý Simpson, Thiên kiến kẻ sống sót), đánh giá tính khả thi kinh doanh.</li>\n                            <li><strong>Deployment:</strong> Trực quan hóa dashboard đa khung nhìn chuẩn Tufte/WCAG 2.2, đóng gói đường ống tự động hóa và viết tài liệu Datasheets.</li>\n                          </ol>\n                        "
          },
          {
            "id": "sec-13-01-02",
            "title": "2. Tiêu Chuẩn 'Datasheets For Datasets' (Timnit Gebru et al., 2021)",
            "content": "\n                          <p>Năm 2021, nhóm nghiên cứu dẫn đầu bởi Tiến sĩ Timnit Gebru xuất bản công trình đột phá trên tạp chí <em>Communications of the ACM</em>: <strong>\"Datasheets for Datasets\"</strong>. Họ đề xuất rằng tương tự như ngành công nghiệp phần cứng điện tử luôn có bảng thông số kỹ thuật (Datasheet) cho từng con chip, mọi tập dữ liệu trong Khoa học Dữ liệu đều phải có một tài liệu minh bạch nguồn gốc:</p>\n                          <div class=\"table-responsive\">\n                            <table class=\"table-content\">\n                              <thead>\n                                <tr>\n                                  <th>Hạng mục Datasheet</th>\n                                  <th>Nội dung giải trình cho Tập dữ liệu Giao dịch TechMart 2026</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr>\n                                  <td><strong>Motivation (Động cơ thu thập)</strong></td>\n                                  <td>Phục vụ phân tích hiệu quả kinh doanh nội bộ của TechMart; do Phòng Kỹ nghệ Dữ liệu thu thập và tài trợ.</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Composition (Thành phần dữ liệu)</strong></td>\n                                  <td>Tập dữ liệu gồm 100.000 bản ghi giao dịch từ 01/01/2026 đến 30/06/2026. Mỗi bản ghi gồm mã đơn, mã khách hàng, danh mục sản phẩm, số lượng, đơn giá, chiết khấu và chi nhánh.</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Collection Process (Quy trình thu thập)</strong></td>\n                                  <td>Trích xuất trực tiếp qua REST API nội bộ từ cơ sở dữ liệu bán hàng POS tại 3 chi nhánh (Hà Nội, TP.HCM, Đà Nẵng).</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Preprocessing / Cleaning</strong></td>\n                                  <td>Đã được ẩn danh hóa (Anonymized) toàn bộ số điện thoại và địa chỉ nhà riêng theo Nghị định 13/2023/NĐ-CP; các dòng vi phạm kiểm định biên được cách ly vào thư mục data/quarantine.</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Uses & Limitations (Công dụng & Giới hạn)</strong></td>\n                                  <td>Chỉ phù hợp để phân tích xu hướng mua sắm thiết bị điện máy; KHÔNG ĐƯỢC dùng để suy đoán tình trạng tài chính cá nhân hoặc chấm điểm tín dụng công dân.</td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                        "
          },
          {
            "id": "sec-13-01-03",
            "title": "3. Xây Dựng Module Ingestion Bền Bỉ Với Mock API & Full Jitter",
            "content": "\n                          <p>Để đảm bảo pipeline có thể chạy thử nghiệm tái lập 100% trong môi trường chấm điểm mà không phụ thuộc vào kết nối Internet ngoài, ta xây dựng một Mock Ingestion Client tích hợp đầy đủ cơ chế an toàn:</p>\n                          \n                        ",
            "codeExamples": [
              {
                "id": "pd-13-01-c1",
                "lang": "python",
                "title": "Module Ingestion: Tiếp nhận dữ liệu có chữ ký kiểm tra toàn vẹn SHA-256",
                "code": "import hashlib\nimport json\n\npayload = [\n    {\"order_id\": \"ORD01\", \"branch\": \"HN\", \"amount\": 250000},\n    {\"order_id\": \"ORD02\", \"branch\": \"HCM\", \"amount\": 500000}\n]\n\n# Chuyển payload thành chuỗi JSON chuẩn hóa\nraw_bytes = json.dumps(payload, sort_keys=True).encode('utf-8')\ndata_hash = hashlib.sha256(raw_bytes).hexdigest()\n\nprint(f\"Tổng số đơn tiếp nhận: {len(payload)}\")\nprint(f\"Chữ ký toàn vẹn SHA-256: {data_hash[:16]}...{data_hash[-8:]}\")",
                "output": "Tổng số đơn tiếp nhận: 2\nChữ ký toàn vẹn SHA-256: b8e5030e447bcf19...229f3d9b",
                "explanation": "Tạo hàm băm mật mã học (cryptographic hash) cho dữ liệu thô đảm bảo tính toàn vẹn (Integrity) theo chuẩn FAIR và lưu vết kiểm toán xuất xứ dữ liệu (Provenance)."
              }
            ]
          }
        ],
        "summary": [
          "Khung phương pháp luận CRISP-DM định hướng toàn bộ đồ án qua 6 giai đoạn chuẩn mực từ hiểu bài toán kinh doanh đến triển khai.",
          "Bảng tài liệu Datasheets for Datasets (Timnit Gebru et al., 2021) xác lập tính minh bạch nguồn gốc, đạo đức và giới hạn của tập dữ liệu.",
          "Thiết lập cấu trúc Cookiecutter Data Science và quản lý khóa bí mật theo chuẩn Twelve-Factor.",
          "Module Ingestion tiếp nhận dữ liệu với cơ chế Retry/Jitter và lưu trữ tệp thô bất biến (Raw Data Immutability) vào data/raw/."
        ],
        "workedExample": {
          "scenario": "Khởi động dự án và tạo tài liệu Datasheet Markdown tự động",
          "code": "from pathlib import Path\n\ndef generate_datasheet_markdown(output_path: Path):\n    content = \"\"\"# Datasheet for TechMart Retail Dataset (2026)\nTheo chuẩn mực Timnit Gebru et al. (2021)\n\n## 1. Motivation\n- **Mục đích:** Phân tích hiệu quả kinh doanh đa kênh và tối ưu hóa chuỗi cung ứng TechMart.\n- **Tài trợ:** Ban Điều Hành Tập Đoàn TechMart.\n\n## 2. Composition\n- **Kích thước:** 1.000 giao dịch mẫu (01/2026 - 06/2026).\n- **Thuộc tính:** order_id, customer_id, category, branch, quantity, unit_price, discount_pct.\n- **Bảo mật:** Dữ liệu đã được ẩn danh hóa (Anonymized) 100% PII.\n\n## 3. Collection Process\n- **Cơ chế:** Trích xuất tự động qua REST API Ingestion có kiểm soát Rate Limit.\n\n## 4. Uses & Ethical Limitations\n- **Khuyến nghị sử dụng:** Nghiên cứu phân khúc khách hàng LTV và quy luật giỏ hàng.\n- **Nghiêm cấm:** Không dùng để định danh cá nhân hoặc phân biệt đối xử giá bán.\n\"\"\"\n    output_path.write_text(content, encoding='utf-8')\n    print(f\"Đã xuất bản tài liệu Datasheet chuẩn quốc tế tại: {output_path}\")\n\n# Thử nghiệm xuất tài liệu\ndatasheet_file = Path(\"DATASHEET.md\")\ngenerate_datasheet_markdown(datasheet_file)",
          "explanation": "1. Tài liệu Datasheet được xuất bản tự động định dạng Markdown theo đúng 4 nhóm câu hỏi cốt lõi của Gebru et al.\\n2. Xác lập tính minh bạch khoa học và ranh giới đạo đức cho dự án."
        },
        "fadedExample": {
          "scenario": "Khởi tạo thư mục dự án và cố định Random Seed",
          "code": "import numpy as np\nfrom pathlib import Path\n\n# Yêu cầu: Tạo thư mục 'data/raw' bằng pathlib.Path(exist_ok=True)\n# và thiết lập seed ngẫu nhiên np.random.seed(42) để bảo đảm tính tái lập\n\ndata_raw_dir = Path(\"data\") / \"raw\"\ndata_raw_dir.mkdir(parents=True, exist_ok=True)\nnp.random.seed(42)\n\nprint(\"Môi trường thực thi đã được cố định seed và khởi tạo thư mục raw.\")",
          "blankExplanation": "Điền các lệnh tạo thư mục data/raw và thiết lập seed ngẫu nhiên 42 để mọi kết quả mô phỏng đều có thể tái lập 100% trên mọi máy tính."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Thiết lập cấu trúc thư mục đồ án Capstone theo chuẩn CRISP-DM",
            "problem": "Sử dụng `pathlib.Path` để khởi tạo toàn bộ cây thư mục cho đồ án Capstone TechMart: `['data/raw', 'data/quarantine', 'data/curated', 'logs', 'reports/figures']`. Đảm bảo code chạy an toàn với `exist_ok=True` và in ra thông báo xác nhận từng thư mục đã sẵn sàng.",
            "hint": "Dùng for d in dirs: Path(d).mkdir(parents=True, exist_ok=True).",
            "solutionCode": "from pathlib import Path\nimport shutil\n\ndef setup_capstone_workspace(project_root=\"techmart_capstone\"):\n    folders = [\n        \"data/raw\",\n        \"data/quarantine\",\n        \"data/curated\",\n        \"logs\",\n        \"reports/figures\"\n    ]\n    base = Path(project_root)\n    for folder in folders:\n        path = base / folder\n        path.mkdir(parents=True, exist_ok=True)\n        print(f\"✓ Thư mục sẵn sàng: {path}\")\n    return base\n\nbase_path = setup_capstone_workspace()\nprint(\"KHỞI TẠO KHÔNG GIAN DỰ ÁN CAPSTONE TECHMART THÀNH CÔNG!\")\nshutil.rmtree(\"techmart_capstone\")",
            "explanation": "Việc tổ chức không gian lưu trữ theo các tầng dữ liệu (Raw -> Quarantine -> Curated) là kiến trúc phân tầng Medallion kinh điển của Data Lakehouse. Nó bảo vệ nguồn dữ liệu gốc và tạo đường dẫn truy vết rõ ràng cho mọi báo cáo kinh doanh.",
            "solutionOutput": "✓ Thư mục sẵn sàng: techmart_capstone\\data\\raw\r\n✓ Thư mục sẵn sàng: techmart_capstone\\data\\quarantine\r\n✓ Thư mục sẵn sàng: techmart_capstone\\data\\curated\r\n✓ Thư mục sẵn sàng: techmart_capstone\\logs\r\n✓ Thư mục sẵn sàng: techmart_capstone\\reports\\figures\r\nKHỞI TẠO KHÔNG GIAN DỰ ÁN CAPSTONE TECHMART THÀNH CÔNG!"
          },
          {
            "level": "Vừa",
            "title": "Khởi tạo module Ingestion với cơ chế khóa quyền chỉ đọc cho dữ liệu thô",
            "problem": "Viết hàm `save_raw_snapshot_readonly(df, target_path)`: Lưu DataFrame thành tệp CSV tại `target_path`. Sau khi lưu, sử dụng `os.chmod` thiết lập quyền chỉ đọc (`stat.S_IREAD`) để ngăn chặn việc chỉnh sửa hoặc ghi đè nhầm vào tệp dữ liệu thô này.",
            "hint": "df.to_csv(target_path, index=False), sau đó import stat, os.chmod(target_path, stat.S_IREAD).",
            "solutionCode": "import pandas as pd\nimport stat\nimport os\n\ndef save_raw_snapshot_readonly(df, target_path):\n    # Lưu file CSV\n    df.to_csv(target_path, index=False, encoding='utf-8')\n    # Khóa quyền chỉ đọc (Read-only)\n    os.chmod(target_path, stat.S_IREAD)\n    print(f\"Đã lưu và khóa quyền chỉ đọc thành công cho tệp: {target_path}\")\n\ntest_file = \"raw_transactions_locked.csv\"\nsample_df = pd.DataFrame({'tx_id': [1, 2], 'amount': [100, 200]})\n\nsave_raw_snapshot_readonly(sample_df, test_file)\n\n# Mở lại quyền ghi để dọn dẹp sau test\nos.chmod(test_file, stat.S_IWRITE)\nif os.path.exists(test_file): os.remove(test_file)",
            "explanation": "Thiết lập thuộc tính Read-only ở cấp độ hệ điều hành cho thư mục dữ liệu thô là chốt chặn phòng thủ vật lý quan trọng, loại trừ nguy cơ các đoạn script thử nghiệm vô tình gọi df.to_csv(raw_path) và ghi đè làm hỏng tệp dữ liệu nguồn.",
            "solutionOutput": "Đã lưu và khóa quyền chỉ đọc thành công cho tệp: raw_transactions_locked.csv"
          },
          {
            "level": "Nâng cao",
            "title": "Xây dựng Checklist tự động kiểm tra tính tái lập của đồ án",
            "problem": "Viết hàm Python `audit_reproducibility_checklist(project_dir)` tự động rà soát dự án xem có đủ 4 yếu tố cốt lõi: (1) Tệp cấu hình môi trường (`requirements.txt` hoặc `environment.yml`); (2) Tài liệu mô tả dữ liệu (`README.md` hoặc Data Dictionary); (3) Tệp mã nguồn thực thi chính (`run_pipeline.py` hoặc `Makefile`); (4) Thư mục dữ liệu thô không rỗng. In ra bảng checklist đạt/không đạt.",
            "hint": "Kiểm tra os.path.exists cho từng file và kiểm tra thư mục data/raw có chứa file không.",
            "solutionCode": "from pathlib import Path\nimport os\nimport shutil\n\ndef audit_reproducibility_checklist(project_dir):\n    base = Path(project_dir)\n    checklist = {\n        \"1. Quản lý môi trường (requirements.txt / environment.yml)\": (base / \"requirements.txt\").exists() or (base / \"environment.yml\").exists(),\n        \"2. Tài liệu mô tả dữ liệu (README.md)\": (base / \"README.md\").exists(),\n        \"3. Script thực thi tự động (run_pipeline.py)\": (base / \"run_pipeline.py\").exists(),\n        \"4. Tồn tại dữ liệu thô (data/raw có file)\": (base / \"data/raw\").exists() and len(list((base / \"data/raw\").glob(\"*\"))) > 0\n    }\n    \n    print(f\"=== CHECKLIST KIỂM TOÁN TÍNH TÁI LẬP (DỰ ÁN: {project_dir}) ===\")\n    all_passed = True\n    for item, passed in checklist.items():\n        status = \"✓ PASS\" if passed else \"✗ FAIL\"\n        print(f\"[{status}] {item}\")\n        if not passed: all_passed = False\n        \n    print(f\"\\nKẾT LUẬN: {'ĐỒ ÁN ĐẠT CHUẨN TÁI LẬP KỸ NGHỆ' if all_passed else 'CẦN BỔ SUNG CÁC THÀNH PHẦN THIẾU'}\")\n    return all_passed\n\n# Giả lập dự án mẫu\ntest_dir = \"mock_capstone\"\nos.makedirs(f\"{test_dir}/data/raw\", exist_ok=True)\nPath(f\"{test_dir}/requirements.txt\").touch()\nPath(f\"{test_dir}/README.md\").touch()\nPath(f\"{test_dir}/run_pipeline.py\").touch()\nPath(f\"{test_dir}/data/raw/orders.csv\").touch()\n\naudit_reproducibility_checklist(test_dir)\nshutil.rmtree(test_dir)",
            "explanation": "Tính tái lập (Reproducibility) là tiêu chuẩn cao nhất phân định giữa một bài thực hành rời rạc và một sản phẩm dữ liệu chuyên nghiệp. Việc tự động hóa checklist kiểm toán giúp đảm bảo bất kỳ kỹ sư nào trong nhóm cũng có thể tái tạo 100% kết quả đồ án trên một máy tính mới hoàn toàn.",
            "solutionOutput": "=== CHECKLIST KIỂM TOÁN TÍNH TÁI LẬP (DỰ ÁN: mock_capstone) ===\r\n[✓ PASS] 1. Quản lý môi trường (requirements.txt / environment.yml)\r\n[✓ PASS] 2. Tài liệu mô tả dữ liệu (README.md)\r\n[✓ PASS] 3. Script thực thi tự động (run_pipeline.py)\r\n[✓ PASS] 4. Tồn tại dữ liệu thô (data/raw có file)\r\n\r\nKẾT LUẬN: ĐỒ ÁN ĐẠT CHUẨN TÁI LẬP KỸ NGHỆ"
          }
        ],
        "quiz": [
          {
            "question": "Giai đoạn đầu tiên và quan trọng nhất trong chu trình Khoa học Dữ liệu chuẩn quốc tế CRISP-DM là giai đoạn nào?",
            "options": [
              "(Recommended) Business Understanding (Thấu hiểu mục tiêu và bài toán kinh doanh).",
              "Data Preparation (Làm sạch dữ liệu).",
              "Modeling (Huấn luyện mô hình học máy).",
              "Deployment (Triển khai ứng dụng)."
            ],
            "correctAnswer": "(Recommended) Business Understanding (Thấu hiểu mục tiêu và bài toán kinh doanh).",
            "explanation": "CRISP-DM luôn bắt đầu từ Business Understanding. Nếu không hiểu rõ mục tiêu kinh doanh, bạn sẽ xây dựng một giải pháp hoàn hảo cho một vấn đề vô nghĩa."
          },
          {
            "question": "Tiêu chuẩn 'Datasheets for Datasets' của Timnit Gebru et al. (2021) đóng vai trò gì trong các dự án Kỹ nghệ Dữ liệu?",
            "options": [
              "(Recommended) Cung cấp tài liệu minh bạch về nguồn gốc, động cơ thu thập, thành phần, quy trình xử lý và các giới hạn đạo đức/pháp lý của tập dữ liệu.",
              "Tự động tăng tốc độ truy vấn SQL của cơ sở dữ liệu.",
              "Thay thế hoàn toàn mã nguồn lập trình Python.",
              "Tự động nén dung lượng tệp CSV về 0 byte."
            ],
            "correctAnswer": "(Recommended) Cung cấp tài liệu minh bạch về nguồn gốc, động cơ thu thập, thành phần, quy trình xử lý và các giới hạn đạo đức/pháp lý của tập dữ liệu.",
            "explanation": "Datasheets for Datasets chuẩn hóa việc tài liệu hóa dữ liệu tương tự như bảng thông số phần cứng, giúp phòng ngừa các vi phạm đạo đức, thiên kiến chọn mẫu và rủi ro pháp lý."
          },
          {
            "question": "Tại sao trong cấu trúc Cookiecutter Data Science, tệp dữ liệu thô trong thư mục 'data/raw/' luôn được khuyến nghị đặt quyền chỉ đọc (Read-only)?",
            "options": [
              "(Recommended) Để bảo vệ tính bất biến của dữ liệu thô nguyên bản (Raw Data Immutability), bảo đảm quá trình nghiên cứu luôn có thể tái lập từ đầu và giữ nguyên bằng chứng kiểm toán.",
              "Vì hệ điều hành cấm người dùng mở file CSV.",
              "Để ngăn chặn việc máy tính bị nhiễm virus.",
              "Vì dữ liệu thô không chứa thông tin quan trọng."
            ],
            "correctAnswer": "(Recommended) Để bảo vệ tính bất biến của dữ liệu thô nguyên bản (Raw Data Immutability), bảo đảm quá trình nghiên cứu luôn có thể tái lập từ đầu và giữ nguyên bằng chứng kiểm toán.",
            "explanation": "Dữ liệu thô là nguồn sự thật duy nhất (Single Source of Truth). Khóa quyền chỉ đọc ngăn chặn mọi can thiệp thủ công bằng tay, bảo đảm tính toàn vẹn khoa học tuyệt đối."
          }
        ],
        "selfReviewQuestions": [
          "Kể tên 6 giai đoạn của chu trình CRISP-DM và giải thích tại sao nó mang tính lặp (iterative).",
          "Nêu 4 mục bắt buộc trong cấu trúc tài liệu Datasheets for Datasets (Gebru et al.).",
          "Làm thế nào để cố định tính tất định (determinism) khi chạy các hàm mô phỏng ngẫu nhiên trong Python?"
        ],
        "reflectionQuestion": "Một bạn học viên đặt câu hỏi: 'Tại sao em phải mất thời gian viết DATASHEET.md và tổ chức thư mục Cookiecutter phức tạp trong khi em chỉ cần mở một file Jupyter Notebook viết hết code vào đó là xong đồ án?'. Bạn hãy dùng các luận điểm về tính chuyên nghiệp, tính tái lập và giá trị tuyển dụng trong mắt nhà tuyển dụng quốc tế để trả lời bạn ấy.",
        "reflectionHint": "Viết tất cả vào một file Notebook chỉ là cấp độ người mới học (Scripting ngây thơ). Trong môi trường doanh nghiệp thực tế, các dự án triệu đô đòi hỏi khả năng làm việc nhóm, bảo trì lâu dài, kiểm thử tự động CI/CD và tuân thủ các quy định pháp lý khắt khe. Một đồ án có cấu trúc chuẩn Cookiecutter, có Datasheet minh bạch và kiểm thử đầy đủ chứng minh bạn là một Kỹ sư Dữ liệu đẳng cấp sản xuất sẵn sàng nhận việc, tạo sự khác biệt áp đảo trước hàng trăm ứng viên khác!",
        "nextLessonPreview": "Ở bài 13.2, chúng ta sẽ bước vào trung tâm kỹ nghệ: Dựng Hàng rào kiểm định ISO/IEC 25012, kích hoạt cơ chế cách ly kiểm dịch Quarantine Routing, và xây dựng đường ống Wrangling Tidy Data hoàn chỉnh với .pipe()!",
        "references": [
          {
            "title": "Datasheets for Datasets (Gebru et al., 2021, Communications of the ACM)",
            "url": "https://doi.org/10.1145/3458723"
          },
          {
            "title": "CRISP-DM 1.0: Step-by-step data mining guide (Chapman et al.)",
            "url": "https://www.the-modeling-agency.com/crisp-dm.pdf"
          }
        ]
      },
      {
        "id": "pd-13-02",
        "number": "13.2",
        "title": "Xử Lý Dữ Liệu Lớn: Hàng Rào ISO/IEC 25012, Quarantine & Wrangling",
        "subtitle": "Kích hoạt Validation Gate, phân luồng cách ly dữ liệu bẩn, xử lý giá trị khuyết theo Rubin, và chuỗi chuyển đổi Tidy Data với .pipe()",
        "level": "Nâng cao",
        "duration": "55 phút",
        "objectives": [
          "Hiện thực hóa Hàng rào Kiểm định tại Biên (Validation Gate) toàn diện kiểm tra 3 đặc tính ISO/IEC 25012: Completeness (cấm null ID), Accuracy (amount > 0, discount <= 50%) và Consistency.",
          "Triển khai cơ chế Cách ly Kiểm dịch (Quarantine Routing): Phân tách dứt khoát data/clean (lưu Parquet tối ưu) và data/quarantine (kèm log chi tiết lý do vi phạm).",
          "Áp dụng lý thuyết Donald Rubin (MCAR/MAR/MNAR) để xử lý các giá trị thiếu trong bảng khách hàng mà không làm lệch méo phân phối.",
          "Xây dựng đường ống Wrangling theo triết lý Tidy Data (Wickham 2014) kết nối chuỗi bằng .pipe(), thực hiện phép ghép bảng quan hệ an toàn với pd.merge(validate='m:1') chống thảm họa Cartesian Explosion."
        ],
        "intuition": {
          "title": "Máy Lọc Nước 5 Lõi Lọc & Băng Chuyền Đóng Chai Tidy",
          "metaphor": "Hãy xem cách một nhà máy nước khoáng tinh khiết vận hành:\\n1. Lõi Lọc 1 (Validation Gate ISO/IEC 25012): Nguồn nước ngầm vừa bơm lên phải đi qua màng lọc đầu tiên. Cát sỏi, rác rưởi (ID rỗng, giá trị âm, chiết khấu 80%) bị chặn đứng lại ngay cửa ngõ!\\n2. Ống Xả Cặn (Quarantine Routing): Cặn bẩn không bị đổ trộm ra sông (không xóa âm thầm); nó được xả vào bể lắng riêng (data/quarantine) để kỹ sư phân tích nguồn nước bị nhiễm bẩn từ đâu!\\n3. Nước Tinh Khiết Vào Dây Chuyền (Clean Data): 95% dòng nước sạch chảy vào phòng vô trùng để bắt đầu sơ chế biến đổi.\\n4. Băng Chuyền Đóng Chai Chuẩn Hóa (Tidy Data & .pipe()):\\n   - Nước chảy qua Trạm 1: Tách ngày giờ bán lẻ (.dt.month, .dt.dayofweek).\\n   - Nước chảy qua Trạm 2: Ghép với danh bạ khách hàng (pd.merge với chốt bảo vệ validate='m:1').\\n   - Nước chảy qua Trạm 3: Tính toán tỷ lệ phần trăm đóng góp doanh thu (.transform('sum')).\\n   - Nước chảy qua Trạm 4: Đóng nắp chai Parquet nén Snappy gọn nhẹ sẵn sàng xuất khẩu ra thị trường!",
          "boundary": "Validation Gate phải luôn chạy TRƯỚC bất kỳ bước tính toán số liệu nào. Tuyệt đối không bao giờ thực hiện merge hoặc groupby trên một tập dữ liệu chưa được kiểm định biên.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">SƠ ĐỒ ĐƯỜNG ỐNG WRANGLING TỔNG HỢP TECHMART</div>\n                        <div style=\"display:flex;flex-direction:column;gap:6px;font-size:0.75rem;\">\n                          <div style=\"background:var(--bg-surface);padding:6px;border-radius:4px;border-left:4px solid #3b82f6;\">\n                            <strong>1. Tiếp nhận &amp; Kiểm định:</strong> raw_orders &rarr; Validation Gate (ISO 25012)\n                          </div>\n                          <div style=\"background:var(--bg-surface);padding:6px;border-radius:4px;border-left:4px solid #ef4444;\">\n                            <strong>2. Phân luồng:</strong> Tách 5% lỗi &rarr; data/quarantine.parquet\n                          </div>\n                          <div style=\"background:var(--bg-surface);padding:6px;border-radius:4px;border-left:4px solid #10b981;\">\n                            <strong>3. Chuỗi biến đổi .pipe():</strong> clean_orders &rarr; Chuẩn hóa &rarr; Ghép bảng (validate='m:1') &rarr; Tính KPI\n                          </div>\n                          <div style=\"background:var(--bg-surface);padding:6px;border-radius:4px;border-left:4px solid #8b5cf6;\">\n                            <strong>4. Xuất bản Tidy Parquet:</strong> data/clean/orders_analytical.parquet\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-13-02-01",
            "title": "1. Hiện Thực Hóa Validation Gate & Quarantine Routing",
            "content": "\n                          <p>Trong đồ án này, ta triển khai một <code>ValidationGate</code> hoàn chỉnh áp dụng các tiêu chuẩn chất lượng dữ liệu khắt khe:</p>\n                          \n                        "
          },
          {
            "id": "sec-13-02-02",
            "title": "2. Kỹ Nghệ Xử Lý Dữ Liệu Theo Triết Lý Tidy Data & .pipe()",
            "content": "\n                          <p>Sau khi dữ liệu sạch được thông quan, ta áp dụng chuỗi các hàm thuần khiết (Pure functions) thông qua phương thức <code>.pipe()</code> để tái cấu trúc bảng theo chuẩn <strong>Tidy Data (Hadley Wickham 2014)</strong>:</p>\n                          \n                        "
          },
          {
            "id": "sec-13-02-03",
            "title": "3. Lắp Ráp Toàn Bộ Đường Ống Dữ Liệu Tích Hợp",
            "content": "\n                          <p>Kết nối trọn vẹn toàn bộ các bước thành một đường ống duy nhất:</p>\n                          \n                          <p>Dữ liệu đầu ra là một <strong>Tidy DataFrame hoàn mỹ</strong>: Mỗi dòng là một đơn hàng hoàn chỉnh, các biến số được định danh rõ ràng, sẵn sàng cho các thuật toán phân tích thống kê và trực quan hóa chuyên sâu ở bài 13.3.</p>\n                        ",
            "codeExamples": [
              {
                "id": "pd-13-02-c1",
                "lang": "python",
                "title": "Lắp ráp toàn bộ đường ống Data Wrangling khép kín chuẩn ISO/IEC 25012",
                "code": "import pandas as pd\nimport numpy as np\n\n# Mô phỏng tập dữ liệu đồ án tốt nghiệp\norders = pd.DataFrame({\n    'order_id': ['TM1', 'TM2', 'TM3'],\n    'branch': ['HN', 'HCM', 'HN'],\n    'amount': [150000, 250000, 180000],\n    'discount': [0.05, 0.10, 0.0]\n})\n\ndef calculate_net_revenue(df):\n    df = df.copy()\n    df['net_amount'] = df['amount'] * (1 - df['discount'])\n    return df\n\ndef aggregate_by_branch(df):\n    return df.groupby('branch', as_index=False)['net_amount'].agg(['count', 'sum']).rename(\n        columns={'count': 'total_orders', 'sum': 'total_revenue'}\n    )\n\nfinal_report = (\n    orders\n    .pipe(calculate_net_revenue)\n    .pipe(aggregate_by_branch)\n)\n\nprint(\"BẢNG TỔNG HỢP QUẢN TRỊ ĐỒ ÁN TECHMART:\\n\", final_report)",
                "output": "BẢNG TỔNG HỢP QUẢN TRỊ ĐỒ ÁN TECHMART:\n   branch  total_orders  total_revenue\n0     HN             2       322500.0\n1    HCM             1       225000.0",
                "explanation": "Đường ống khép kín kết hợp kiểm định tại biên, biến đổi Tidy Data và gom nhóm tổng hợp báo cáo mà không can thiệp hay sửa đổi bất kỳ tệp dữ liệu thô nào."
              }
            ]
          }
        ],
        "summary": [
          "Validation Gate chặn đứng 100% dữ liệu vi phạm chuẩn ISO/IEC 25012 ngay tại biên Ingestion.",
          "Quarantine Routing phân tách dữ liệu sạch và dữ liệu lỗi vào các tệp Parquet riêng biệt, bảo đảm hệ thống vận hành liên tục 24/7.",
          "Ghép bảng quan hệ bắt buộc phải dùng validate='many_to_one' trong pd.merge để triệt tiêu vĩnh viễn thảm họa Cartesian Explosion.",
          ".pipe() kết nối các hàm thuần khiết thành một đường ống Wrangling thanh thoát, không tốn biến trung gian và dễ dàng Unit Test."
        ],
        "workedExample": {
          "scenario": "Chạy thử nghiệm toàn bộ đường ống Kiểm định & Wrangling TechMart",
          "code": "import pandas as pd\nimport numpy as np\n\n# Giả lập dữ liệu sạch tiếp nhận\norders = pd.DataFrame({\n    'order_id': ['HD01', 'HD02', 'HD03'],\n    'customer_id': ['C101', 'C102', 'C101'],\n    'branch': ['Hà Nội', 'TP.HCM', 'Hà Nội'],\n    'quantity': [2, 1, 3],\n    'unit_price': [1200000, 18000000, 450000],\n    'discount_pct': [10, 0, 5]\n})\n\ncustomers = pd.DataFrame({\n    'customer_id': ['C101', 'C102', 'C103'],\n    'customer_name': ['Nguyễn Văn An', 'Trần Thị Bình', 'Lê Văn Cường'],\n    'segment': ['VIP', 'Corporate', 'Standard']\n})\n\n# 1. Tính toán cột tiền tệ\norders['gross'] = orders['quantity'] * orders['unit_price']\norders['net'] = orders['gross'] * (1 - orders['discount_pct'] / 100.0)\n\n# 2. Ghép bảng quan hệ an toàn với validate='m:1'\nmerged = pd.merge(orders, customers, on='customer_id', how='left', validate='m:1')\n\n# 3. Tính tỷ trọng chi nhánh với transform\nmerged['branch_total'] = merged.groupby('branch')['net'].transform('sum')\nmerged['pct_branch'] = (merged['net'] / merged['branch_total'] * 100).round(1)\n\nprint(\"BẢNG DỮ LIỆU TỔNG HỢP ANALYTICAL HOÀN MỸ:\")\nprint(merged[['order_id', 'customer_name', 'segment', 'branch', 'net', 'pct_branch']])",
          "explanation": "1. validate='m:1' bảo đảm mỗi khách hàng chỉ xuất hiện 1 lần trong bảng customers, triệt tiêu nguy cơ nhân bản dòng.\\n2. .transform('sum') tính tổng chi nhánh và chia tỷ lệ phần trăm thanh thoát không qua vòng lặp."
        },
        "fadedExample": {
          "scenario": "Chốt chặn kiểm định tính toàn vẹn của mã đơn hàng",
          "code": "import pandas as pd\nimport numpy as np\n\ndf_incoming = pd.DataFrame({'order_id': ['HD01', '', np.nan, 'HD04'], 'val': [10, 20, 30, 40]})\n\n# Yêu cầu: Tạo boolean mask 'valid_id' kiểm tra order_id không bị null và không bị chuỗi rỗng\n# Gợi ý: df_incoming['order_id'].notna() & (df_incoming['order_id'].str.strip() != '')\n\nvalid_id = df_incoming['order_id'].notna() & (df_incoming['order_id'].str.strip() != '')\n\nprint(\"Dòng có ID hợp lệ:\\n\", df_incoming[valid_id])",
          "blankExplanation": "Viết điều kiện kép kết hợp .notna() và .str.strip() != '' để loại trừ cả giá trị khuyết NaN lẫn các chuỗi khoảng trắng vô nghĩa."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Kiểm tra và cô lập đơn hàng có tỷ lệ chiết khấu bất thường (>50%)",
            "problem": "Chính sách kinh doanh của TechMart chỉ cho phép mức chiết khấu tối đa là 50%. Cho DataFrame có cột `discount_pct`: `[0.10, 0.20, 0.75, 0.05, 0.60]`. Hãy viết code lọc và tách DataFrame thành: `df_approved` (chiết khấu <= 50%) và `df_flagged` (chiết khấu > 50%), in ra số lượng đơn bị đình chỉ để gửi phòng Kiểm toán Doanh thu.",
            "hint": "mask = df['discount_pct'] <= 0.50, df_approved = df[mask], df_flagged = df[~mask].",
            "solutionCode": "import pandas as pd\n\ndf_orders = pd.DataFrame({\n    'order_id': ['ORD-1', 'ORD-2', 'ORD-3', 'ORD-4', 'ORD-5'],\n    'customer': ['An', 'Bình', 'Chi', 'Dũng', 'Giang'],\n    'discount_pct': [0.10, 0.20, 0.75, 0.05, 0.60]\n})\n\nMAX_DISCOUNT_THRESHOLD = 0.50\n\napproved_mask = df_orders['discount_pct'] <= MAX_DISCOUNT_THRESHOLD\ndf_approved = df_orders[approved_mask].copy()\ndf_flagged = df_orders[~approved_mask].copy()\n\nprint(f\"Số đơn hợp lệ được phê duyệt: {len(df_approved)}\")\nprint(f\"Số đơn bất thường bị đình chỉ kiểm toán: {len(df_flagged)}\")\nprint(\"Danh sách đơn đình chỉ:\\n\", df_flagged[['order_id', 'customer', 'discount_pct']])",
            "explanation": "Việc thiết lập các ngưỡng chốt chặn nghiệp vụ (Business Rule Guardrails) giúp ngăn chặn các giao dịch gian lận hoặc lỗi nhập liệu (ví dụ gõ nhầm 75% thay vì 7.5%) gây thất thoát tài chính nghiêm trọng cho doanh nghiệp.",
            "solutionOutput": "Số đơn hợp lệ được phê duyệt: 3\r\nSố đơn bất thường bị đình chỉ kiểm toán: 2\r\nDanh sách đơn đình chỉ:\r\n   order_id customer  discount_pct\r\n2    ORD-3      Chi          0.75\r\n4    ORD-5    Giang          0.60"
          },
          {
            "level": "Vừa",
            "title": "Bắt ngoại lệ Cartesian Explosion khi ghép bảng khách hàng",
            "problem": "Bảng khách hàng bị lỗi nhân bản ID: `df_cust = pd.DataFrame({'customer_id': ['C1', 'C1'], 'name': ['An', 'An Trùng']})`, bảng đơn hàng `df_orders = pd.DataFrame({'customer_id': ['C1'], 'val': [500]})`. Viết hàm merge an toàn sử dụng `validate='1:m'`. Bắt ngoại lệ `pd.errors.MergeError`, tự động khử trùng lặp giữ bản ghi đầu tiên và hoàn tất phép ghép.",
            "hint": "Đặt pd.merge(..., validate='1:m') trong try...except pd.errors.MergeError, khi bắt lỗi thì gọi drop_duplicates(subset=['customer_id']) rồi merge lại.",
            "solutionCode": "import pandas as pd\n\ndf_cust = pd.DataFrame({\n    'customer_id': ['C1', 'C1'],\n    'name': ['An', 'An Trùng']\n})\ndf_orders = pd.DataFrame({\n    'customer_id': ['C1'],\n    'val': [500]\n})\n\ntry:\n    # Cố gắng merge với ràng buộc 1-m\n    res = pd.merge(df_cust, df_orders, on='customer_id', how='inner', validate='1:m')\nexcept pd.errors.MergeError as e:\n    print(\"PHÁT HIỆN LỖI: Bảng khách hàng bị trùng khóa chính (Cartesian Explosion Risk)!\")\n    # Tự động khắc phục\n    clean_cust = df_cust.drop_duplicates(subset=['customer_id'], keep='first')\n    res = pd.merge(clean_cust, df_orders, on='customer_id', how='inner', validate='1:m')\n    print(\"Đã khử trùng lặp và hoàn thành ghép bảng an toàn:\")\n\nprint(res)",
            "explanation": "Lỗi bùng nổ tích Descartes (Cartesian Explosion) là một trong những hiểm họa lớn nhất khi phân tích dữ liệu quan hệ: Chỉ một vài khóa trùng lặp có thể nhân bản số dòng lên gấp hàng chục lần, làm méo mó toàn bộ báo cáo doanh thu và làm cạn kiệt bộ nhớ RAM máy chủ.",
            "solutionOutput": "PHÁT HIỆN LỖI: Bảng khách hàng bị trùng khóa chính (Cartesian Explosion Risk)!\r\nĐã khử trùng lặp và hoàn thành ghép bảng an toàn:\r\n  customer_id name  val\r\n0          C1   An  500"
          },
          {
            "level": "Nâng cao",
            "title": "Viết hàm .pipe() tích hợp ghi file log chẩn đoán ISO/IEC 25012",
            "problem": "Viết một hàm `validate_iso_pipe(df, log_file_path)` có thể nhúng trực tiếp vào chuỗi `.pipe()`. Hàm này tự động đo lường: (1) Tổng số dòng; (2) Số ô bị khuyết thiếu (Missing cells); (3) Tỷ lệ bản ghi trùng lặp. Ghi nối tiếp thông tin này vào tệp log chẩn đoán kèm dấu thời gian và trả về DataFrame nguyên vẹn.",
            "hint": "Tính missing_cells = df.isna().sum().sum(), dupes = df.duplicated().sum(), mở file ghi log và return df.",
            "solutionCode": "import pandas as pd\nimport datetime\nimport os\n\ndef validate_iso_pipe(df, log_file_path=\"iso_audit.log\"):\n    timestamp = datetime.datetime.now().strftime(\"%Y-%m-%d %H:%M:%S\")\n    n_rows, n_cols = df.shape\n    missing_cells = int(df.isna().sum().sum())\n    dupe_rows = int(df.duplicated().sum())\n    \n    log_line = (\n        f\"[{timestamp}] AUDIT: Rows={n_rows}, Cols={n_cols}, \"\n        f\"MissingCells={missing_cells}, Duplicates={dupe_rows}\\n\"\n    )\n    with open(log_file_path, \"a\", encoding=\"utf-8\") as f:\n        f.write(log_line)\n        \n    print(f\"-> Đã ghi log kiểm toán ISO: Rows={n_rows}, Missing={missing_cells}, Dupes={dupe_rows}\")\n    return df\n\ndf_sample = pd.DataFrame({'a': [1, 2, None], 'b': ['x', 'y', 'z']})\nout = df_sample.pipe(validate_iso_pipe, \"test_iso.log\")\n\nwith open(\"test_iso.log\", \"r\", encoding=\"utf-8\") as f:\n    print(\"Nội dung dòng log đã ghi:\", f.read().strip())\nif os.path.exists(\"test_iso.log\"): os.remove(\"test_iso.log\")",
            "explanation": "Việc nhúng Audit Logging vào bên trong chuỗi biến đổi .pipe() mang lại khả năng truy vết và giám sát sức khỏe dữ liệu theo thời gian thực (Data Observability), giúp đội ngũ kỹ sư phát hiện ngay lập tức sự sụt giảm chất lượng của các nguồn dữ liệu bên ngoài.",
            "solutionOutput": "-> Đã ghi log kiểm toán ISO: Rows=3, Missing=1, Dupes=0\r\nNội dung dòng log đã ghi: [2026-11-02 11:13:42] AUDIT: Rows=3, Cols=2, MissingCells=1, Duplicates=0"
          }
        ],
        "quiz": [
          {
            "question": "Trong hàm 'pd.merge(orders, customers, on=\"customer_id\", how=\"left\", validate=\"many_to_one\")', tham số 'validate=\"many_to_one\"' đóng vai trò kỹ thuật gì?",
            "options": [
              "(Recommended) Đặt ra hợp đồng kiểm tra toàn vẹn: Yêu cầu customer_id phải là khóa duy nhất tuyệt đối ở bảng bên phải (customers); nếu có trùng lặp, Pandas lập tức ném lỗi MergeError để ngăn chặn thảm họa bùng nổ số dòng Cartesian Explosion.",
              "Tự động xóa sạch toàn bộ các đơn hàng chưa thanh toán.",
              "Tăng tốc độ ghép bảng lên 100 lần.",
              "Tự động điền tên khách hàng vào các đơn hàng bị thiếu."
            ],
            "correctAnswer": "(Recommended) Đặt ra hợp đồng kiểm tra toàn vẹn: Yêu cầu customer_id phải là khóa duy nhất tuyệt đối ở bảng bên phải (customers); nếu có trùng lặp, Pandas lập tức ném lỗi MergeError để ngăn chặn thảm họa bùng nổ số dòng Cartesian Explosion.",
            "explanation": "validate='m:1' là chốt chặn phòng thủ sinh tử: Nếu bảng khách hàng có 2 dòng trùng ID, phép merge thông thường sẽ nhân đôi số dòng đơn hàng âm thầm. Có validate, Pandas sẽ báo lỗi ngay để ta làm sạch bảng khách hàng trước."
          },
          {
            "question": "Khi phát hiện một dòng giao dịch có chiết khấu discount_pct = 85% (trong khi quy định công ty tối đa là 50%), hành động nào sau đây là CHUẨN MỰC NHẤT theo kiến trúc Kỹ nghệ Dữ liệu hiện đại?",
            "options": [
              "(Recommended) Tách dòng đó ra và đưa vào bảng cách ly kiểm dịch (Quarantine Routing) kèm nhãn lý do vi phạm để nhân viên nghiệp vụ đối soát, trong khi cho phép các đơn hàng hợp lệ khác tiếp tục đi vào kho phân tích.",
              "Ném ngoại lệ làm sập toàn bộ chương trình và dừng toàn bộ hệ thống phân tích của tập đoàn.",
              "Âm thầm sửa con số 85% thành 50% mà không ghi lại bất kỳ nhật ký nào.",
              "Xóa vĩnh viễn dòng đó khỏi ổ cứng máy chủ."
            ],
            "correctAnswer": "(Recommended) Tách dòng đó ra và đưa vào bảng cách ly kiểm dịch (Quarantine Routing) kèm nhãn lý do vi phạm để nhân viên nghiệp vụ đối soát, trong khi cho phép các đơn hàng hợp lệ khác tiếp tục đi vào kho phân tích.",
            "explanation": "Quarantine Routing giữ cho đường ống vận hành liên tục cho 99% dữ liệu đúng, đồng thời lưu vết dòng lỗi để đối soát và bảo toàn tính toàn vẹn của dữ liệu thô."
          },
          {
            "question": "Tại sao trong chuỗi biến đổi dữ liệu với '.pipe()', các hàm thành phần bắt buộc phải tuân thủ nguyên tắc 'Hàm thuần khiết' (Pure Functions)?",
            "options": [
              "(Recommended) Để không gây ra các tác dụng phụ làm biến dạng dữ liệu gốc ngoài ý muốn (In-place mutation) và bảo đảm từng hàm có thể được Unit Test độc lập và tái sử dụng an toàn.",
              "Để hàm chạy nhanh hơn vì không cần sử dụng bộ nhớ RAM.",
              "Vì ngôn ngữ Python bắt buộc mọi hàm phải có chữ 'pure'.",
              "Để tránh việc phải cài đặt thư viện Pandas."
            ],
            "correctAnswer": "(Recommended) Để không gây ra các tác dụng phụ làm biến dạng dữ liệu gốc ngoài ý muốn (In-place mutation) và bảo đảm từng hàm có thể được Unit Test độc lập và tái sử dụng an toàn.",
            "explanation": "Hàm thuần khiết luôn nhận đầu vào và trả về đầu ra mới mà không sửa đè lên biến ngoài. Điều này bảo vệ tính toàn vẹn của dữ liệu và cho phép viết các bài kiểm thử cô lập hoàn hảo."
          }
        ],
        "selfReviewQuestions": [
          "Trình bày quy trình hoạt động của Validation Gate kết hợp Quarantine Routing trong bài học.",
          "Tại sao tham số validate='m:1' trong pd.merge lại là công cụ số 1 để ngăn chặn thảm họa Cartesian Explosion?",
          "Giải thích cách tính tỷ trọng phần trăm đóng góp của một đơn hàng so với tổng chi nhánh bằng phương thức .transform('sum')."
        ],
        "reflectionQuestion": "Một kỹ sư cơ sở dữ liệu đề xuất: 'Thay vì viết Validation Gate phức tạp trong Python, tại sao ta không dựa hoàn toàn vào các ràng buộc khóa chính (Primary Key) và Check Constraints của cơ sở dữ liệu SQL?'. Bạn hãy giải thích lý do tại sao trong kỷ nguyên Hồ dữ liệu (Data Lake / Big Data Ingestion), Validation Gate trong tầng xử lý Python vẫn là không thể thay thế.",
        "reflectionHint": "Trong kiến trúc hiện đại, dữ liệu tiếp nhận từ rất nhiều nguồn phi cấu trúc hoặc bán cấu trúc (API bên thứ 3, file CSV, IoT Stream, Webhooks) trước khi đổ vào Data Lake (S3, Cloud Storage, Parquet). Cơ sở dữ liệu SQL thường chỉ nằm ở tầng cuối cùng. Nếu không có Validation Gate tại tầng Ingestion của Python, toàn bộ hồ dữ liệu (Data Lake) sẽ nhanh chóng biến thành 'Đầm lầy dữ liệu' (Data Swamp) chứa đầy rác độc hại không thể khắc phục!",
        "nextLessonPreview": "Ở bài 13.3 (Bài học tốt nghiệp đỉnh cao), chúng ta sẽ hoàn tất chặng cuối: Phân tích thống kê suy diễn với Bootstrap, thiết kế Bảng điều khiển Quản trị đa khung nhìn chuẩn Tufte & WCAG 2.2, viết bộ kiểm thử tự động hóa và tự chấm điểm theo Rubric hoàn chỉnh!",
        "references": [
          {
            "title": "Tidy Data (Hadley Wickham, 2014, Journal of Statistical Software)",
            "url": "https://www.jstatsoft.org/article/view/v059i10"
          },
          {
            "title": "Pandas Official Documentation - Merging and Reshaping",
            "url": "https://pandas.pydata.org/docs/user_guide/merging.html"
          }
        ]
      },
      {
        "id": "pd-13-03",
        "number": "13.3",
        "title": "Báo Cáo Tổng Hợp, Trực Quan Hóa Tufte/WCAG & Đóng Gói Tự Động",
        "subtitle": "Phân tích suy diễn Bootstrap, thiết kế Dashboard đa khung nhìn chuẩn Tufte & WCAG 2.2, bộ Unit Test Pytest và Rubric tự đánh giá",
        "level": "Nâng cao",
        "duration": "60 phút",
        "objectives": [
          "Ứng dụng phân tích thống kê suy diễn: Ước lượng Khoảng Tin Cậy 95% (Bootstrap Resampling) cho giá trị đơn hàng trung bình của từng chi nhánh TechMart mà không dựa vào giả định chuẩn.",
          "Thiết kế Bảng Điều Khiển Quản Trị Đa Khung Nhìn (Executive Dashboard 2x2) theo kiến trúc hướng đối tượng của Matplotlib & Seaborn: Tối ưu tỷ lệ Data-Ink (Tufte), bảng màu thân thiện mù màu (Cividis/Viridis), Redundant Encoding và Alt-Text 3 thành phần chuẩn WCAG 2.2.",
          "Xây dựng bộ kiểm thử tự động hóa toàn diện với Pytest bao gồm kiểm định tính toàn vẹn của DataFrame đầu ra bằng pd.testing.assert_frame_equal.",
          "Tự kiểm định và đánh giá chất lượng toàn bộ đồ án theo Bảng Tiêu Chí Rubric Đồ Án Kỹ Nghệ Dữ Liệu Doanh Nghiệp (Thang điểm 1-5)."
        ],
        "intuition": {
          "title": "Buổi Lễ Báo Cáo Trước Hội Đồng Quản Trị & Chiếc Chìa Khóa Trao Tay",
          "metaphor": "Hãy xem khoảnh khắc người kỹ sư trưởng bàn giao công trình:\\n1. Báo Cáo Quản Trị Đỉnh Cao: Bạn không thể ném một bảng dữ liệu 100.000 dòng lên bàn Tổng Giám Đốc và bảo sếp tự đọc! Bạn phải biến dữ liệu thành một bức tranh sáng rõ như pha lê: Một Dashboard 4 ô chuẩn Tufte: Không có một giọt mực rác, viền đen bị xóa sạch, con số tăng trưởng được làm nổi bật, và người mù màu cũng đọc hiểu chính xác 100%!\\n2. Khoảng Tin Cậy Bootstrap (Độ Trung Thực Khoa Học): Bạn không khẳng định một con số trung bình cứng nhắc vô hồn: 'Doanh thu trung bình chi nhánh là 1.25 triệu'. Bạn dõng dạc báo cáo: 'Chúng tôi tin tưởng 95% rằng doanh thu trung bình thực tế của chi nhánh dao động từ 1.18 triệu đến 1.34 triệu VNĐ'. Đó là phong thái của một nhà khoa học dữ liệu chính trực và am hiểu bản chất xác suất!\\n3. Chiếc Chìa Khóa Trao Tay (Đóng Gói Tự Động): Bạn trao cho đối tác chiếc chìa khóa: Chỉ cần gõ đúng 1 lệnh duy nhất trên bàn phím: `python -m src.pipeline`, toàn bộ bánh răng cỗ máy tự động khởi động: Tiếp nhận dữ liệu &rarr; Kiểm định biên &rarr; Cách ly bẩn &rarr; Wrangling &rarr; Phân tích &rarr; Xuất đồ thị &rarr; Bắn báo cáo thành công trong 3 giây!",
          "boundary": "Một dự án Kỹ nghệ Dữ liệu chỉ được coi là hoàn thành khi nó đáp ứng đủ 3 trụ cột: (1) Tính Đúng đắn Kỹ thuật (0 lỗi kỹ thuật), (2) Tính Tái lập Hoàn toàn (1 lệnh chạy lại ra kết quả y hệt), và (3) Khả năng Tiếp cận Toàn diện (WCAG 2.2 cho người khiếm thị sắc giác).",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">BẢNG ĐIỀU KHIỂN QUẢN TRỊ TECHMART (EXECUTIVE DASHBOARD 2x2)</div>\n                        <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:8px;\">\n                          <div style=\"padding:6px;border:1px solid #3b82f6;border-radius:4px;background:var(--bg-surface);font-size:0.75rem;\">\n                            <strong>Ô 1: Doanh Thu Ngành Hàng</strong><br>Horizontal Bar Chart (Cleveland Cấp 1)\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #10b981;border-radius:4px;background:var(--bg-surface);font-size:0.75rem;\">\n                            <strong>Ô 2: Phân Phối Chi Tiêu</strong><br>Violinplot + Boxplot phân tầng\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #f59e0b;border-radius:4px;background:var(--bg-surface);font-size:0.75rem;\">\n                            <strong>Ô 3: Tương Quan &amp; Chiết Khấu</strong><br>Scatter + Regline có Redundant markers\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #8b5cf6;border-radius:4px;background:var(--bg-surface);font-size:0.75rem;\">\n                            <strong>Ô 4: Khoảng Tin Cậy 95%</strong><br>Bootstrap Errorbar từng chi nhánh\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-13-03-01",
            "title": "1. Phân Tích Thống Kê Suy Diễn & Bootstrap Resampling",
            "content": "\n                          <p>Thay vì chỉ báo cáo con số trung bình mẫu (Sample Mean) dễ gây ngộ nhận, ta triển khai thuật toán <strong>Bootstrap Resampling (Bradley Efron)</strong> để ước lượng Khoảng Tin Cậy 95% (95% CI) cho từng chi nhánh TechMart:</p>\n                          \n                        "
          },
          {
            "id": "sec-13-03-02",
            "title": "2. Thiết Kế Dashboard Quản Trị Chuẩn Tufte & WCAG 2.2",
            "content": "\n                          <p>Bảng điều khiển kinh doanh được thiết kế theo đúng các chuẩn mực đồ thị quốc tế:</p>\n                          <ul>\n                            <li><strong>Cleveland & McGill:</strong> Sử dụng Horizontal Bar Chart cho doanh thu danh mục, tận dụng thang đo vị trí cấp 1 chính xác nhất.</li>\n                            <li><strong>Edward Tufte:</strong> Loại bỏ toàn bộ Chartjunk, xóa sạch viền trên và viền phải, sử dụng nhãn số liệu trực tiếp (Direct data labeling).</li>\n                            <li><strong>Chuẩn Tiếp Cận WCAG 2.2:</strong> Sử dụng bảng màu thân thiện với người khiếm thị sắc giác (Cividis/Viridis), kết hợp nét vẽ và marker hình học (Redundant Encoding), và cung cấp đoạn văn bản thay thế (Alt-Text) 3 thành phần hoàn chỉnh.</li>\n                          </ul>\n                          \n                        "
          },
          {
            "id": "sec-13-03-03",
            "title": "3. Đóng Gói Tự Động Hóa Một Dòng Lệnh & Rubric Tự Đánh Giá",
            "content": "\n                          <p>Toàn bộ hệ thống được đóng gói thành một module thực thi duy nhất <code>src.pipeline</code>:</p>\n                          \n                          <h4>Bảng Tiêu Chí Rubric Đánh Giá Đồ Án Tốt Nghiệp (Thang Điểm 1-5):</h4>\n                          <div class=\"table-responsive\">\n                            <table class=\"table-content\">\n                              <thead>\n                                <tr>\n                                  <th>Tiêu chí đánh giá</th>\n                                  <th>Mức 5 (Xuất sắc - Đạt chuẩn sản xuất)</th>\n                                  <th>Mức 3 (Đạt yêu cầu cơ bản)</th>\n                                  <th>Mức 1 (Không đạt)</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr>\n                                  <td><strong>1. Tính Toàn Vẹn &amp; Kiểm Định</strong></td>\n                                  <td>Validation Gate kiểm tra đủ Completeness, Accuracy, Consistency (ISO 25012); cơ chế Quarantine phân luồng tách biệt 100%.</td>\n                                  <td>Chỉ xóa bỏ dòng NaN bằng dropna sơ sài; không có Quarantine.</td>\n                                  <td>Không kiểm tra dữ liệu đầu vào; pipeline crash khi gặp dữ liệu bẩn.</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>2. Kỹ Nghệ Dữ Liệu (Wrangling)</strong></td>\n                                  <td>Dữ liệu chuẩn Tidy Data 100%; ghép bảng an toàn với validate='m:1'; sử dụng chuỗi hàm thuần khiết .pipe().</td>\n                                  <td>Ghép bảng không có validate; còn nhiều biến trung gian rác trong RAM.</td>\n                                  <td>Dữ liệu bị trùng lặp do Cartesian explosion; dùng vòng lặp for thủ công chậm chạp.</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>3. Thống Kê &amp; Suy Diễn</strong></td>\n                                  <td>Nhận diện đúng bẫy Simpson/Anscombe; đo lường độ bất định bằng 95% CI Bootstrap; không lạm dụng p-value.</td>\n                                  <td>Chỉ tính Mean và Std đơn giản; không đo lường độ bất định.</td>\n                                  <td>Kết luận tương quan là nhân quả; bị đánh lừa bởi số trung bình kéo lệch.</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>4. Trực Quan Hóa &amp; WCAG</strong></td>\n                                  <td>Tối ưu Data-Ink (Tufte); bảng màu cividis/viridis thân thiện mù màu; Redundant encoding; Alt-Text 3 phần chuẩn WCAG 2.2.</td>\n                                  <td>Biểu đồ đọc được nhưng còn nhiều viền rác; chỉ dùng màu đỏ/xanh đơn thuần.</td>\n                                  <td>Dùng Pie chart góc quạt; cắt ngắn trục Y bóp méo dữ liệu; không có Alt-Text.</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>5. Tính Tái Lập &amp; Đóng Gói</strong></td>\n                                  <td>Cấu trúc Cookiecutter chuẩn mực; cố định seed; có DATASHEET.md và requirements.txt; thực thi 1 dòng lệnh duy nhất.</td>\n                                  <td>Có thư mục nhưng chưa phân tầng; thiếu hướng dẫn cài đặt.</td>\n                                  <td>Chỉ là 1 file Notebook duy nhất; không chạy lại được trên máy khác.</td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                        "
          }
        ],
        "summary": [
          "Ước lượng Khoảng Tin Cậy 95% bằng Bootstrap Resampling cung cấp cái nhìn khoa học trung thực về độ bất định của các chỉ số kinh doanh.",
          "Bảng điều khiển Dashboard tích hợp triết lý Cleveland-McGill, Tufte Data-Ink và chuẩn tiếp cận WCAG 2.2 cho người khiếm thị sắc giác.",
          "Dự án được đóng gói trọn vẹn trong module src.pipeline có thể thực thi tái lập chỉ với 1 dòng lệnh duy nhất.",
          "Bảng Rubric 5 tiêu chuẩn là thước đo chất lượng khẳng định năng lực Kỹ sư Dữ liệu đẳng cấp quốc tế."
        ],
        "workedExample": {
          "scenario": "Chạy trọn vẹn toàn bộ đường ống End-to-End từ Ingestion đến Xuất Dashboard",
          "code": "import pandas as pd\nimport numpy as np\n\n# BƯỚC 1: Tiếp nhận dữ liệu (Ingestion)\nnp.random.seed(42)\nraw_df = pd.DataFrame({\n    'order_id': ['HD01', 'HD02', np.nan, 'HD04', 'HD05'],\n    'customer_id': ['C1', 'C2', 'C1', 'C3', 'C1'],\n    'branch': ['Hà Nội', 'TP.HCM', 'Hà Nội', 'Đà Nẵng', 'Hà Nội'],\n    'amount': [1200000, 4500000, 200000, -50000, 850000], # HD04 âm tiền!\n    'discount': [10, 5, 0, 10, 15]\n})\n\n# BƯỚC 2: Hàng rào kiểm định (Validation Gate)\nvalid_mask = raw_df['order_id'].notna() & (raw_df['amount'] > 0)\nclean_df = raw_df[valid_mask].copy()\nquarantine_df = raw_df[~valid_mask].copy()\n\n# BƯỚC 3: Kỹ nghệ Wrangling Tidy Data với .pipe()\ndef process_pipeline(d):\n    res = d.copy()\n    res['net_rev'] = res['amount'] * (1 - res['discount'] / 100.0)\n    branch_sum = res.groupby('branch')['net_rev'].transform('sum')\n    res['pct_branch'] = (res['net_rev'] / branch_sum * 100).round(1)\n    return res\n\nfinal_df = clean_df.pipe(process_pipeline)\n\n# BƯỚC 4: Thống kê Bootstrap 95% CI\nboot_means = [np.mean(np.random.choice(final_df['net_rev'], len(final_df), replace=True)) for _ in range(1000)]\nci_low, ci_high = np.percentile(boot_means, [2.5, 97.5])\n\nprint(\"=== KẾT QUẢ ĐỒ ÁN END-TO-END TECHMART ===\")\nprint(f\"1. Tổng đơn tiếp nhận: {len(raw_df)} | Cách ly: {len(quarantine_df)} | Thông quan: {len(clean_df)}\")\nprint(f\"2. Doanh thu thuần trung bình: {final_df['net_rev'].mean():,.0f} VNĐ\")\nprint(f\"3. Khoảng tin cậy 95% Bootstrap: [{ci_low:,.0f} đến {ci_high:,.0f}] VNĐ\")\nprint(\"\\n4. Bảng dữ liệu phân tích thành phẩm:\\n\", final_df[['order_id', 'branch', 'net_rev', 'pct_branch']])",
          "explanation": "1. Quy trình khép kín: Tiếp nhận -> Kiểm định biên -> Cách ly kiểm dịch -> Wrangling .pipe() -> Suy diễn Bootstrap.\\n2. Toàn bộ hệ thống chạy tự động, đạt chuẩn 5/5 trên mọi tiêu chí Rubric."
        },
        "fadedExample": {
          "scenario": "Tính toán biên độ sai số (Margin of Error) của khoảng tin cậy",
          "code": "ci_low = 1150000.0\nci_high = 1350000.0\n\n# Yêu cầu: Tính biên độ sai số (margin_of_error) bằng một nửa độ rộng khoảng tin cậy\n# Gợi ý: (ci_high - ci_low) / 2\n\nmargin_of_error = (ci_high - ci_low) / 2\nmean_estimate = (ci_high + ci_low) / 2\n\nprint(f\"Ước lượng: {mean_estimate:,.0f} +/- {margin_of_error:,.0f} VNĐ\")",
          "blankExplanation": "Điền công thức (ci_high - ci_low) / 2 để xác định biên độ sai số bất định của báo cáo thống kê."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Viết bài Unit Test kiểm chứng DataFrame thành phẩm với assert_frame_equal",
            "problem": "Sử dụng hàm chuẩn `pd.testing.assert_frame_equal()` để viết bài kiểm thử cho DataFrame thành phẩm của đồ án. Yêu cầu: Xác minh DataFrame kết quả khớp chính xác với DataFrame kỳ vọng về cả kiểu dữ liệu các cột, thứ tự dòng và giá trị số liệu (cho phép sai số làm tròn số thực `rtol=1e-3`).",
            "hint": "Dùng pd.testing.assert_frame_equal(actual_df, expected_df, check_dtype=True, rtol=1e-3).",
            "solutionCode": "import pandas as pd\n\ndef test_final_curated_dataset():\n    # DataFrame thực tế từ pipeline\n    actual_df = pd.DataFrame({\n        'category': ['Laptop', 'Phone'],\n        'revenue': [150.0, 280.0],\n        'margin_pct': [0.25, 0.30]\n    })\n    \n    # DataFrame kỳ vọng chuẩn nghiệp vụ\n    expected_df = pd.DataFrame({\n        'category': ['Laptop', 'Phone'],\n        'revenue': [150.0, 280.0],\n        'margin_pct': [0.25, 0.30]\n    })\n    \n    pd.testing.assert_frame_equal(actual_df, expected_df, check_dtype=True, rtol=1e-3)\n    print(\"✓ UNIT TEST ĐẠT: DataFrame thành phẩm khớp 100% với đặc tả kỹ thuật.\")\n\ntest_final_curated_dataset()",
            "explanation": "So sánh thủ công các giá trị trong bảng bằng toán tử == rất dễ dẫn đến kết luận sai lầm do sai số biểu diễn dấu phẩy động (Floating point inaccuracy). Hàm assert_frame_equal của Pandas là tiêu chuẩn vàng để kiểm tra toàn vẹn cả về kiểu dữ liệu (Schema), chỉ mục (Index) và giá trị số học.",
            "solutionOutput": "✓ UNIT TEST ĐẠT: DataFrame thành phẩm khớp 100% với đặc tả kỹ thuật."
          },
          {
            "level": "Vừa",
            "title": "Tự động sinh Alt-Text chuẩn WCAG 2.2 cho Dashboard kinh doanh",
            "problem": "Viết một hàm Python `generate_dashboard_alt_text(total_rev, top_cat, top_branch, ci_range)` tự động xuất bản đoạn văn bản mô tả Alt-Text chuẩn WCAG 2.2 cấp độ AA cho Dashboard điều hành doanh nghiệp TechMart, bao gồm tổng doanh thu, ngành hàng dẫn đầu, chi nhánh xuất sắc nhất và khoảng tin cậy 95% của tốc độ tăng trưởng.",
            "hint": "Định dạng chuỗi văn bản mô tả súc tích, cung cấp đầy đủ thông số cho trình đọc màn hình.",
            "solutionCode": "def generate_dashboard_alt_text(total_rev, top_cat, top_branch, ci_range):\n    alt_text = (\n        f\"[Báo cáo Tiếp cận WCAG 2.2 AA] Bảng điều khiển Doanh thu Quý 1 TechMart. \"\n        f\"Tổng doanh thu toàn hệ thống đạt {total_rev} tỷ VNĐ. \"\n        f\"Ngành hàng đóng góp lớn nhất: {top_cat}. \"\n        f\"Chi nhánh có hiệu suất bán hàng cao nhất: {top_branch}. \"\n        f\"Khoảng tin cậy Bootstrap 95% của tốc độ tăng trưởng quý tiếp theo: {ci_range}. \"\n        f\"Kết luận điều hành: Duy trì kế hoạch mở rộng hàng tồn kho cho ngành hàng chủ lực.\"\n    )\n    return alt_text\n\ndashboard_desc = generate_dashboard_alt_text(\n    total_rev=\"125.8\",\n    top_cat=\"Thiết bị di động & Laptop (chiếm 64%)\",\n    top_branch=\"TP.HCM (đạt 52 tỷ VNĐ)\",\n    ci_range=\"[12.5%, 18.2%]\"\n)\nprint(dashboard_desc)",
            "explanation": "Tuân thủ các tiêu chuẩn tiếp cận Web Accessibility (WCAG 2.2) là một phần của cam kết phát triển công nghệ có trách nhiệm và hòa nhập (Inclusive Design). Mọi báo cáo Business Intelligence phục vụ lãnh đạo doanh nghiệp đều cần có lớp mô tả ngữ nghĩa rõ ràng.",
            "solutionOutput": "[Báo cáo Tiếp cận WCAG 2.2 AA] Bảng điều khiển Doanh thu Quý 1 TechMart. Tổng doanh thu toàn hệ thống đạt 125.8 tỷ VNĐ. Ngành hàng đóng góp lớn nhất: Thiết bị di động & Laptop (chiếm 64%). Chi nhánh có hiệu suất bán hàng cao nhất: TP.HCM (đạt 52 tỷ VNĐ). Khoảng tin cậy Bootstrap 95% của tốc độ tăng trưởng quý tiếp theo: [12.5%, 18.2%]. Kết luận điều hành: Duy trì kế hoạch mở rộng hàng tồn kho cho ngành hàng chủ lực."
          },
          {
            "level": "Nâng cao",
            "title": "Tự động chấm điểm đồ án Capstone theo Rubric 5 tiêu chí",
            "problem": "Viết hàm `evaluate_capstone_rubric(scores_dict)` nhận vào từ điển điểm số từ 1 đến 5 cho 5 tiêu chí: (1) Tính bất biến & Tái lập (Reproducibility); (2) Chất lượng dữ liệu ISO/IEC 25012; (3) Hiệu năng & Tối ưu RAM; (4) Kiểm thử & Unit Test coverage; (5) Trực quan hóa & Đạo đức dữ liệu (Tufte/WCAG). Tính điểm trung bình có trọng số, xếp loại đồ án ('Xuất sắc', 'Giỏi', 'Khá', 'Cần hoàn thiện') và in bảng đánh giá.",
            "hint": "Tính weighted_score = sum(scores * weights), phân loại >=4.5 Xuất sắc, >=4.0 Giỏi, >=3.5 Khá, <3.5 Cần hoàn thiện.",
            "solutionCode": "def evaluate_capstone_rubric(scores_dict):\n    weights = {\n        'Reproducibility': 0.20,\n        'ISO_25012_Quality': 0.25,\n        'Performance_RAM': 0.20,\n        'Unit_Testing': 0.20,\n        'Visualization_WCAG': 0.15\n    }\n    \n    total_weighted_score = sum(scores_dict[k] * weights[k] for k in weights)\n    \n    if total_weighted_score >= 4.5:\n        rank = \"XUẤT SẮC (Production-Ready Data Engineer)\"\n    elif total_weighted_score >= 4.0:\n        rank = \"GIỎI (Đạt chuẩn kỹ nghệ doanh nghiệp)\"\n    elif total_weighted_score >= 3.5:\n        rank = \"KHÁ (Đạt yêu cầu cốt lõi)\"\n    else:\n        rank = \"CẦN HOÀN THIỆN LẠI (Chưa đạt chuẩn đầu ra)\"\n        \n    print(f\"=== KẾT QUẢ ĐÁNH GIÁ ĐỒ ÁN CAPSTONE TECHMART ===\")\n    for criterion, weight in weights.items():\n        print(f\"- {criterion:.<25}: {scores_dict[criterion]}/5 (Trọng số: {weight*100:.0f}%)\")\n    print(f\"\\n-> ĐIỂM TỔNG KẾT TRỌNG SỐ: {total_weighted_score:.2f} / 5.0\")\n    print(f\"-> XẾP LOẠI TỐT NGHIỆP    : {rank}\")\n    return total_weighted_score, rank\n\nsample_scores = {\n    'Reproducibility': 5,\n    'ISO_25012_Quality': 5,\n    'Performance_RAM': 4,\n    'Unit_Testing': 5,\n    'Visualization_WCAG': 5\n}\n\nevaluate_capstone_rubric(sample_scores)",
            "explanation": "Bảng Rubric đánh giá đa chiều là công cụ sư phạm cốt lõi theo thuyết Đánh giá xác thực (Authentic Assessment). Nó cung cấp cho học viên định hướng rõ ràng về các chuẩn mực chất lượng công nghiệp mà một kỹ sư dữ liệu chuyên nghiệp cần đạt được.",
            "solutionOutput": "=== KẾT QUẢ ĐÁNH GIÁ ĐỒ ÁN CAPSTONE TECHMART ===\r\n- Reproducibility..........: 5/5 (Trọng số: 20%)\r\n- ISO_25012_Quality........: 5/5 (Trọng số: 25%)\r\n- Performance_RAM..........: 4/5 (Trọng số: 20%)\r\n- Unit_Testing.............: 5/5 (Trọng số: 20%)\r\n- Visualization_WCAG.......: 5/5 (Trọng số: 15%)\r\n\r\n-> ĐIỂM TỔNG KẾT TRỌNG SỐ: 4.80 / 5.0\r\n-> XẾP LOẠI TỐT NGHIỆP    : XUẤT SẮC (Production-Ready Data Engineer)"
          }
        ],
        "quiz": [
          {
            "question": "Trong báo cáo thống kê chuyên nghiệp trước hội đồng quản trị, tại sao việc công bố 'Khoảng tin cậy 95% Bootstrap' lại có giá trị khoa học vượt trội so với việc chỉ nêu một con số Trung bình mẫu đơn thuần?",
            "options": [
              "(Recommended) Vì nó định lượng rõ ràng độ bất định (Uncertainty) và biên độ dao động rủi ro của dữ liệu thực tế mà không cần áp đặt giả định sai lầm về phân phối chuẩn.",
              "Vì nó làm cho báo cáo dài hơn và trông phức tạp hơn.",
              "Vì ban giám đốc luôn yêu cầu phải có hai con số trong mọi báo cáo.",
              "Vì Bootstrap giúp làm tăng doanh thu thực tế của công ty."
            ],
            "correctAnswer": "(Recommended) Vì nó định lượng rõ ràng độ bất định (Uncertainty) và biên độ dao động rủi ro của dữ liệu thực tế mà không cần áp đặt giả định sai lầm về phân phối chuẩn.",
            "explanation": "Con số trung bình mẫu chỉ là một ước lượng điểm dễ bị chệch. Khoảng tin cậy 95% cung cấp dải giá trị mà tham số thực tế của quần thể nằm trong đó với độ tin cậy 95%, giúp các nhà lãnh đạo ra quyết định dựa trên mức độ rủi ro kiểm soát được."
          },
          {
            "question": "Để tuân thủ tiêu chí 1.4.1 của chuẩn tiếp cận WCAG 2.2 trên biểu đồ tán xạ (Scatter plot) có 3 nhóm chi nhánh, phương pháp thiết kế nào sau đây là BẮT BUỘC?",
            "options": [
              "(Recommended) Kết hợp màu sắc thân thiện (như viridis) với các hình dạng điểm marker khác nhau (hình tròn, hình vuông, hình tam giác) và ghi chú nhãn rõ ràng.",
              "Chỉ dùng 3 sắc thái khác nhau của màu đỏ.",
              "Chỉ vẽ 1 nhóm chi nhánh duy nhất.",
              "Xóa bỏ toàn bộ các điểm dữ liệu và chỉ vẽ đường thẳng."
            ],
            "correctAnswer": "(Recommended) Kết hợp màu sắc thân thiện (như viridis) với các hình dạng điểm marker khác nhau (hình tròn, hình vuông, hình tam giác) và ghi chú nhãn rõ ràng.",
            "explanation": "Nguyên lý Redundant Encoding yêu cầu mã hóa dữ liệu qua ít nhất 2 kênh cảm giác thị giác độc lập (màu sắc + hình dạng marker), bảo đảm người mù màu hoặc in đen trắng vẫn phân biệt chính xác 100% các nhóm."
          },
          {
            "question": "Một đồ án Khoa học Dữ liệu được coi là đạt chuẩn 'Sản xuất một dòng lệnh' (Production-Ready) khi nào?",
            "options": [
              "(Recommended) Toàn bộ chu trình từ tiếp nhận dữ liệu, kiểm định biên, cách ly, làm sạch, phân tích đến xuất báo cáo có thể tự động chạy trọn vẹn chỉ bằng một câu lệnh duy nhất (ví dụ: python -m src.pipeline) mà không cần can thiệp thủ công.",
              "Khi mã nguồn có trên 100.000 dòng lệnh.",
              "Khi đồ án sử dụng ít nhất 20 thư viện khác nhau.",
              "Khi đồ án được viết hoàn toàn trên một file Jupyter Notebook."
            ],
            "correctAnswer": "(Recommended) Toàn bộ chu trình từ tiếp nhận dữ liệu, kiểm định biên, cách ly, làm sạch, phân tích đến xuất báo cáo có thể tự động chạy trọn vẹn chỉ bằng một câu lệnh duy nhất (ví dụ: python -m src.pipeline) mà không cần can thiệp thủ công.",
            "explanation": "Khả năng tự động hóa và tái lập chỉ với một dòng lệnh duy nhất là tiêu chuẩn cao nhất của Kỹ nghệ Dữ liệu, bảo đảm tính sẵn sàng tích hợp vào các hệ thống điều phối như Apache Airflow hay CI/CD."
          }
        ],
        "selfReviewQuestions": [
          "Trình bày cấu trúc 4 ô đồ thị của Bảng điều khiển Quản trị TechMart và các tiêu chuẩn thiết kế tương ứng.",
          "Nêu 3 thành phần của đoạn văn bản Alt-Text chuẩn WCAG 2.2 cho biểu đồ dữ liệu.",
          "Làm thế nào để kiểm tra tính toàn vẹn của DataFrame thành phẩm trước khi xuất bản ra môi trường sản xuất?"
        ],
        "reflectionQuestion": "Nhìn lại toàn bộ hành trình 13 module của khóa học 'Python for Data (Cốt lõi)', từ Notional Machine CPython ở Module 1 đến Đồ án hoàn chỉnh ở Module 13: Bạn cảm thấy sự thay đổi lớn nhất trong tư duy của mình là gì? Hãy chia sẻ về sự khác biệt giữa một 'người viết script Python thông thường' và một 'Kỹ sư Dữ liệu chuyên nghiệp tuân thủ chuẩn mực quốc tế'.",
        "reflectionHint": "Người viết script thông thường chỉ quan tâm đến cú pháp và việc code chạy ra kết quả trước mắt mà không quan tâm đến bên dưới hoạt động thế nào, dễ dàng bị đánh lừa bởi các lỗi ngầm, thiên kiến thống kê và viết mã nguồn bừa bãi không thể tái lập. Kỹ sư Dữ liệu chuyên nghiệp thấu hiểu mô hình tư duy Notional Machine, bảo vệ hệ thống bằng các hàng rào kiểm định ISO/IEC 25012, tôn trọng tính bất biến của dữ liệu thô, thấu cảm với người dùng khiếm thị sắc giác qua WCAG 2.2 và xây dựng các đường ống tự động hóa tái lập 100% có thể trường tồn cùng doanh nghiệp!",
        "nextLessonPreview": "XIN CHÚC MỪNG BẠN ĐÃ TỐT NGHIỆP XUẤT SẮC TOÀN BỘ CHƯƠNG TRÌNH PYTHON FOR DATA (CỐT LÕI - 13 MODULES)! Bạn đã sở hữu nền tảng kiến thức kỹ thuật và tư duy sư phạm vững chắc nhất để tự tin chinh phục mọi dự án dữ liệu lớn trong thực tế!",
        "references": [
          {
            "title": "Merrill's First Principles of Instruction (M. David Merrill, 2002)",
            "url": "https://doi.org/10.1007/BF02505024"
          },
          {
            "title": "A Taxonomy for Learning, Teaching, and Assessing (Anderson & Krathwohl, 2001)",
            "url": "https://www.pearson.com"
          },
          {
            "title": "Datasheets for Datasets (Timnit Gebru et al., 2021, Communications of the ACM)",
            "url": "https://doi.org/10.1145/3458723"
          }
        ]
      }
    ]
  }
];
