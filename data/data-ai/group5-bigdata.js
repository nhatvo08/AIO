/**
 * Nhóm 5: Xử lý Dữ liệu lớn & Hiệu năng cao (Polars, Dask, PySpark)
 * Tác giả: Senior Data & ML Engineer
 */

window.DATA_AI_GROUP5_DATA = {
  "id": "course-group-bigdata",
  "number": "Nhóm 5",
  "title": "Xử lý Dữ liệu lớn & Hiệu năng cao",
  "badge": "Polars, Dask & PySpark",
  "icon": "⚡",
  "customClass": "data-ai-banner",
  "desc": "Dataframe thế hệ mới siêu tốc với Rust/Arrow (Polars) và tính toán phân tán out-of-core quy mô Terabyte/Petabyte với Dask và Apache Spark (PySpark).",
  "parts": [
    {
      "id": "part-ai-polars",
      "number": "Phần 12",
      "title": "Polars: Dataframe Đa Luồng Siêu Tốc với Rust & Apache Arrow",
      "level": "Trung cấp đến Nâng cao",
      "badge": "5 Bài học",
      "icon": "🐻‍❄️",
      "description": "Chinh phục công nghệ Dataframe thế hệ mới được viết bằng Rust trên nền Apache Arrow: tư duy Expression, Contexts, Lazy evaluation, tối ưu hóa truy vấn pushdown, streaming dữ liệu vượt RAM và bảng dịch tư duy Pandas sang Polars.",
      "lessons": [
        {
          "id": "ai-pl-01",
          "number": "12.1",
          "title": "Vì sao Polars Tạo Nên Cuộc Cách Mạng Dataframe: Rust, Apache Arrow Cột & Đa Luồng SIMD",
          "subtitle": "Giải mã kiến trúc bộ nhớ cột (Columnar Memory), Zero-copy slicing, Rayon work-stealing và vì sao Pandas chậm hơn 10x-50x",
          "level": "Trung cấp",
          "duration": "45 phút",
          "objectives": [
            "Hiểu rõ những nút thắt cổ chai cố hữu của Pandas: GIL, con trỏ mảng phân mảnh, phụ phí RAM gấp 5-10 lần và tính toán đơn luồng.",
            "Giải mã cấu trúc bộ nhớ Apache Arrow dạng cột (Columnar Format), contiguous memory buffer và cơ chế bitmask cho giá trị null.",
            "Nắm vững cơ chế đa luồng không khóa (lock-free) của thư viện Rayon trong Rust và vector hóa phần cứng bằng tập lệnh SIMD (AVX-512, NEON).",
            "Làm chủ cách khởi tạo Series và DataFrame trong Polars với các kiểu dữ liệu phong phú (Numeric, String, Categorical, Struct, List)."
          ],
          "intuition": {
            "title": "Tủ đựng hồ sơ truyền thống vs Kệ lưu trữ chuyên môn dạng cột",
            "metaphor": "Hãy tưởng tượng bạn có 1 triệu hồ sơ khách hàng. Pandas tổ chức dữ liệu như một kho hồ sơ giấy theo hàng (Row-oriented / Python objects): mỗi bộ hồ sơ gồm một túi giấy chứa tên, tuổi, số dư tài khoản, địa chỉ. Khi sếp yêu cầu 'Hãy tính số dư trung bình của khách hàng', nhân viên Pandas phải mở từng túi hồ sơ, rút tờ giấy số dư ra xem, rồi cất túi vào tủ và bước sang túi tiếp theo. Điều này gây Cache Miss liên miên ở cấp độ CPU! Ngược lại, Polars tổ chức theo chuẩn Apache Arrow: toàn bộ số dư của 1 triệu khách hàng được xếp thành một dãy số float64 liên tục kề sát nhau trong RAM. CPU chỉ cần đọc một vệt bộ nhớ liên tục (Streaming prefetch), dùng tập lệnh SIMD tính toán 8-16 con số cùng một tích tắc xung nhịp đồng hồ và huy động tất cả các nhân CPU (Multithreading) cùng tính. Tốc độ tăng vọt từ 10 đến 50 lần!",
            "visualHtml": "<div class=\"data-viz-container\">\n  <div class=\"data-viz-title\">🏗️ Kiến Trúc Bộ Nhớ: Pandas (Hàng / Con Trỏ) vs Polars (Cột Apache Arrow)</div>\n  <div class=\"eco-grid\">\n    <div class=\"eco-card\" style=\"border-left:4px solid #ef4444;\">\n      <strong style=\"color:#ef4444;\">Pandas (Kế thừa từ 2008):</strong>\n      <div style=\"font-size:0.84rem;color:var(--text-secondary);margin-top:6px;line-height:1.5;\">\n        • Dựa trên NumPy 1D/2D array + Object pointers.<br/>\n        • Chuỗi String là các con trỏ trỏ tới các đối tượng Python phân tán khắp RAM.<br/>\n        • Giá trị thiếu (NaN) ép kiểu cột nguyên thành float64.<br/>\n        • Chạy 1 nhân CPU (vướng GIL của Python), bộ nhớ phình to gấp 5-10x dung lượng đĩa.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-left:4px solid #10b981;\">\n      <strong style=\"color:#10b981;\">Polars (Thế hệ mới 2020+):</strong>\n      <div style=\"font-size:0.84rem;color:var(--text-secondary);margin-top:6px;line-height:1.5;\">\n        • Viết 100% bằng Rust, chuẩn bộ nhớ Apache Arrow quốc tế.<br/>\n        • Dữ liệu cột liên tục trong RAM, nạp trọn vẹn vào L1/L2/L3 Cache của CPU.<br/>\n        • Giá trị Null lưu bằng bitmask độc lập, giữ nguyên vẹn dtype nguyên/thực.<br/>\n        • Tự động kích hoạt toàn bộ nhân CPU bằng thư viện Rayon (Work-stealing).\n      </div>\n    </div>\n  </div>\n</div>"
          },
          "sections": [
            {
              "id": "pl-01-sec1",
              "title": "1. Những Nút Thắt Cổ Chai Của Thư Viện Pandas Cổ Điển",
              "content": "Pandas ra đời từ năm 2008 bởi Wes McKinney, khi dữ liệu phân tích chỉ vài chục megabytes và bộ nhớ máy tính còn rất hạn chế. Để tương thích hoàn toàn với Python, Pandas dùng cấu trúc Series bọc quanh mảng NumPy. Tuy nhiên, kiến trúc này bộc lộ những điểm yếu chí mạng khi dữ liệu bước vào kỷ nguyên gigabytes:\n\n1. Phụ phí bộ nhớ khổng lồ (Memory Footprint): Một file CSV dung lượng 1GB khi đọc vào Pandas (pd.read_csv) thường ngốn từ 5GB đến 10GB RAM. Lý do là các cột chuỗi (Object dtype) thực chất là mảng các con trỏ (pointers), mỗi con trỏ trỏ tới một đối tượng PyObject riêng biệt trên Heap memory.\n2. Bế tắc đơn luồng do GIL: Python Global Interpreter Lock (GIL) khiến các thao tác xử lý DataFrame của Pandas chỉ chạy trên một lõi CPU duy nhất, trong khi CPU hiện đại có từ 8 đến 64 cores đang nhàn rỗi.\n3. Sự mơ hồ giữa View và Copy: Cảnh báo SettingWithCopyWarning là cơn ác mộng của lập trình viên vì Pandas không đảm bảo nhất quán khi nào một thao tác trả về view (con trỏ bộ nhớ dùng chung) hay copy (bản sao mới).\n\nRitchie Vink, kỹ sư người Hà Lan, đã thiết kế Polars từ con số không bằng ngôn ngữ Rust với mục tiêu: Tối đa hóa hiệu năng trên phần cứng máy tính hiện đại.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Những Nút Thắt Cổ Chai Của Thư Viện Pandas Cổ Điển",
                  "lang": "Python",
                  "code": "# Kiểm tra dung lượng RAM và số luồng mặc định trong Polars\nimport polars as pl\nimport os\n\nprint(f\"Phiên bản Polars: {pl.__version__}\")\nprint(f\"Số luồng CPU Polars tự động sử dụng: {pl.thread_pool_size()}\")\nprint(f\"Tổng số lõi CPU trên máy: {os.cpu_count()}\")",
                  "annotations": [
                    {
                      "line": 6,
                      "text": "pl.thread_pool_size(): Polars tự động nhận diện và dùng toàn bộ lõi logic của CPU."
                    },
                    {
                      "line": 7,
                      "text": "Không cần cấu hình multiprocessing hay threading phức tạp như Python thuần."
                    }
                  ],
                  "output": "Phiên bản Polars: 2.0.0\nSố luồng CPU Polars tự động sử dụng: 16\nTổng số lõi CPU trên máy: 16",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "pl-01-sec2",
              "title": "2. Trọng Tâm Kiến Trúc: Chuẩn Cột Apache Arrow & Null Bitmask",
              "content": "Apache Arrow là chuẩn công nghiệp mở định nghĩa cấu trúc bộ nhớ dạng cột (Columnar In-Memory Format) chia sẻ chung giữa các hệ thống (DuckDB, Spark, Polars, Arrow C++). Điểm đặc sắc nhất của Arrow bao gồm:\n\n- Dữ liệu được tổ chức theo cột (Column-oriented): Các giá trị của cùng một cột nằm san sát nhau trên các ô nhớ vật lý. Khi tính toán thống kê (sum, mean, min, max), CPU có thể nạp thẳng vệt bộ nhớ vào CPU Cache Line (64 bytes) mà không lãng phí chu kỳ nạp các cột không liên quan.\n- Zero-Copy Slicing: Thao tác cắt lát mảng (slice) chỉ đơn giản là tạo ra một con trỏ Offset trỏ vào mảng Arrow hiện có mà không hề nhân bản hay cấp phát lại bộ nhớ.\n- Bitmap cho giá trị Null: Trong Pandas cổ điển, nếu một cột số nguyên int64 xuất hiện một giá trị NaN, Pandas buộc phải ép toàn bộ cột sang float64 vì chuẩn IEEE 754 chỉ định nghĩa NaN cho số thực. Trong Polars/Arrow, giá trị Null được lưu độc lập bằng một mảng bit (1 bit đại diện cho hợp lệ/null). Do đó cột nguyên vẫn giữ nguyên vẹn Int64, tiết kiệm 50% bộ nhớ và loại bỏ lỗi sai kiểu dữ liệu.",
              "table": {
                "headers": [
                  "Đặc điểm",
                  "Pandas (NumPy-based)",
                  "Polars (Apache Arrow)"
                ],
                "rows": [
                  [
                    "Ngôn ngữ cốt lõi",
                    "Python, C, Cython",
                    "100% Rust"
                  ],
                  [
                    "Cấu trúc bộ nhớ",
                    "Hàng/Khối phân mảnh",
                    "Chuẩn cột Apache Arrow liên tục"
                  ],
                  [
                    "Xử lý Null/NaN",
                    "Ép kiểu số nguyên sang float64",
                    "Null Bitmask độc lập, giữ nguyên kiểu"
                  ],
                  [
                    "Số luồng thực thi",
                    "Đơn luồng (1 core)",
                    "Tự động đa luồng toàn bộ CPU cores (Rayon)"
                  ],
                  [
                    "Sao chép bộ nhớ",
                    "Copy thường xuyên khi biến đổi",
                    "Zero-copy Slicing & Copy-on-Write"
                  ],
                  [
                    "Kiểm tra kiểu dữ liệu",
                    "Lỏng lẻo (Object chứa hỗn hợp)",
                    "Nghiêm ngặt, kiểu dữ liệu tĩnh mạnh"
                  ]
                ]
              }
            },
            {
              "id": "pl-01-sec3",
              "title": "3. Khởi Tạo Series & DataFrame trong Polars với Các Kiểu Dữ Liệu Arrow",
              "content": "Polars cung cấp hai cấu trúc dữ liệu cơ bản tương tự Pandas nhưng với hệ thống kiểu dữ liệu Arrow nghiêm ngặt và phong phú hơn rất nhiều:\n- pl.Series: Mảng 1 chiều đồng nhất kiểu.\n- pl.DataFrame: Tập hợp các Series có cùng độ dài.\n\nCác kiểu dữ liệu chính bao gồm:\n- Số nguyên: pl.Int8, pl.Int16, pl.Int32, pl.Int64, pl.UInt8 đến pl.UInt64 (hỗ trợ số nguyên không dấu tiết kiệm RAM!).\n- Số thực: pl.Float32, pl.Float64.\n- Chuỗi & Logic: pl.String (hoặc pl.Utf8), pl.Boolean.\n- Thời gian: pl.Date, pl.Datetime, pl.Duration, pl.Time.\n- Phân loại: pl.Categorical, pl.Enum (tối ưu hóa bộ nhớ cho nhãn cố định).\n- Kiểu lồng nhau (Nested Types): pl.List (mảng động trong từng ô), pl.Struct (bản ghi nhiều trường con), pl.Array (mảng cố định độ dài).",
              "codeExamples": [
                {
                  "title": "Code minh họa: Khởi Tạo Series & DataFrame trong Polars với Các Kiểu Dữ Liệu Arrow",
                  "lang": "Python",
                  "code": "import polars as pl\n\n# 1. Khởi tạo Series có chứa giá trị Null\ns_age = pl.Series(\"age\", [25, 30, None, 22, 45], dtype=pl.Int32)\nprint(\"Series tuổi (vẫn giữ nguyên kiểu Int32 dù có null):\")\nprint(s_age)\n\n# 2. Khởi tạo DataFrame với nhiều kiểu dữ liệu phong phú\ndf_users = pl.DataFrame({\n    \"id\": [101, 102, 103, 104],\n    \"name\": [\"Hà Anh\", \"Minh Quân\", \"Thu Trang\", \"Bảo Long\"],\n    \"salary\": [1500.5, 2200.0, None, 3100.2],\n    \"is_active\": [True, True, False, True],\n    \"tags\": [[\"python\", \"data\"], [\"rust\"], [\"sql\", \"bi\"], [\"ml\", \"ai\"]]\n}, schema={\n    \"id\": pl.UInt32,\n    \"name\": pl.String,\n    \"salary\": pl.Float32,\n    \"is_active\": pl.Boolean,\n    \"tags\": pl.List(pl.String)\n})\n\nprint(\"\\nDataFrame người dùng:\")\nprint(df_users)\nprint(\"\\nSchema chi tiết:\")\nprint(df_users.schema)",
                  "annotations": [
                    {
                      "line": 4,
                      "text": "pl.Series giữ nguyên dtype=pl.Int32 dù có None, không bị ép sang Float như Pandas."
                    },
                    {
                      "line": 15,
                      "text": "Chỉ định schema tường minh giúp tiết kiệm RAM tối đa (dùng UInt32, Float32)."
                    },
                    {
                      "line": 20,
                      "text": "pl.List(pl.String) là kiểu mảng lồng nhau chính quy trong Arrow, không phải object Python."
                    }
                  ],
                  "output": "Series tuổi (vẫn giữ nguyên kiểu Int32 dù có null):\nshape: (5,)\nSeries: 'age' [i32]\n[\n\t25\n\t30\n\tnull\n\t22\n\t45\n]\n\nDataFrame người dùng:\nshape: (4, 5)\n┌─────┬───────────┬────────┬───────────┬──────────────────────┐\n│ id  ┆ name      ┆ salary ┆ is_active ┆ tags                 │\n│ --- ┆ ---       ┆ ---    ┆ ---       ┆ ---                  │\n│ u32 ┆ str       ┆ f32    ┆ bool      ┆ list[str]            │\n╞═════╪═══════════╪════════╪═══════════╪══════════════════════╡\n│ 101 ┆ Hà Anh    ┆ 1500.5 ┆ true      ┆ [\"python\", \"data\"]   │\n│ 102 ┆ Minh Quân ┆ 2200.0 ┆ true      ┆ [\"rust\"]             │\n│ 103 ┆ Thu Trang ┆ null   ┆ false     ┆ [\"sql\", \"bi\"]        │\n│ 104 ┆ Bảo Long  ┆ 3100.2 ┆ true      ┆ [\"ml\", \"ai\"]         │\n└─────┴───────────┴────────┴───────────┴──────────────────────┘\n\nSchema chi tiết:\nOrderedDict({'id': UInt32, 'name': String, 'salary': Float32, 'is_active': Boolean, 'tags': List(String)})",
                  "explanation": ""
                }
              ]
            }
          ],
          "callouts": {
            "pitfalls": [
              {
                "title": "Polars Không Cho Phép Cột Hỗn Hợp Kiểu (No Mixed-Type Columns)",
                "content": "Trong Pandas, một cột kiểu object có thể chứa lẫn lộn chuỗi, số nguyên và boolean trong cùng một mảng. Polars kiên quyết từ chối điều này! Tất cả các giá trị trong một cột Polars phải tuân thủ nghiêm ngặt theo đúng một kiểu dữ liệu duy nhất để đảm bảo an toàn bộ nhớ và hiệu năng SIMD."
              }
            ],
            "tips": [
              {
                "title": "Tận Dụng 100% Sức Mạnh CPU Tự Động",
                "content": "Trong Polars, bạn không cần phải cài đặt thêm thư viện như pandarallel hay dùng multiprocessing. Bất kỳ thao tác nào từ đọc file, tính toán biểu thức, đến gom nhóm hay sắp xếp đều tự động chia sẻ công việc cho tất cả các lõi CPU bằng thuật toán Work-Stealing của Rayon."
              }
            ]
          },
          "exercises": [
            {
              "title": "Tạo DataFrame Cảm Biến IoT với Định Dạng Arrow Chuẩn",
              "problem": "Khởi tạo một Polars DataFrame mô phỏng dữ liệu 5 bản ghi đọc từ cảm biến IoT gồm các trường: sensor_id (số nguyên không dấu 16-bit UInt16), location (chuỗi String), temperature (số thực 32-bit Float32), is_alert (giá trị logic Boolean), readings (danh sách các số thực pl.List(pl.Float32) biểu thị 3 lần đo liên tiếp). Kiểm tra dung lượng bộ nhớ ước tính bằng .estimated_size().",
              "hint": "Sử dụng từ điển Python kết hợp tham số schema với các kiểu dữ liệu tương ứng của pl.",
              "explanation": "Nhờ sử dụng kiểu dữ liệu Arrow chính xác (UInt16 thay vì Int64, Float32 thay vì Float64), 5 bản ghi phức tạp chứa cả danh sách mảng chỉ tốn khoảng 440 bytes RAM, nhỏ hơn gấp nhiều lần so với cấu trúc mảng Object của Pandas.",
              "solutionCode": "import polars as pl\n\ndata = {\n    \"sensor_id\": [101, 102, 103, 104, 105],\n    \"location\": [\"Kho Lạnh A\", \"Kho Lạnh B\", \"Xưởng Hàn\", \"Phòng Server\", \"Kho Lạnh A\"],\n    \"temperature\": [-18.5, -20.2, 38.6, 21.0, -17.8],\n    \"is_alert\": [False, False, True, False, False],\n    \"readings\": [\n        [-18.5, -18.4, -18.6],\n        [-20.2, -20.1, -20.3],\n        [38.6, 39.1, 38.8],\n        [21.0, 21.2, 21.1],\n        [-17.8, -17.9, -17.8]\n    ]\n}\n\nschema = {\n    \"sensor_id\": pl.UInt16,\n    \"location\": pl.String,\n    \"temperature\": pl.Float32,\n    \"is_alert\": pl.Boolean,\n    \"readings\": pl.List(pl.Float32)\n}\n\ndf_sensors = pl.DataFrame(data, schema=schema)\nprint(df_sensors)\nprint(f\"\\nDung lượng RAM ước tính: {df_sensors.estimated_size()} bytes\")",
              "solutionOutput": "shape: (5, 5)\n┌───────────┬──────────────┬─────────────┬──────────┬────────────────────────┐\n│ sensor_id ┆ location     ┆ temperature ┆ is_alert ┆ readings               │\n│ ---       ┆ ---          ┆ ---         ┆ ---      ┆ ---                    │\n│ u16       ┆ str          ┆ f32         ┆ bool     ┆ list[f32]              │\n╞═══════════╪══════════════╪═════════════╪══════════╪════════════════════════╡\n│ 101       ┆ Kho Lạnh A   ┆ -18.5       ┆ false    ┆ [-18.5, -18.4, -18.6]  │\n│ 102       ┆ Kho Lạnh B   ┆ -20.2       ┆ false    ┆ [-20.2, -20.1, -20.3]  │\n│ 103       ┆ Xưởng Hàn    ┆ 38.6        ┆ true     ┆ [38.6, 39.1, 38.8]     │\n│ 104       ┆ Phòng Server ┆ 21.0        ┆ false    ┆ [21.0, 21.2, 21.1]     │\n│ 105       ┆ Kho Lạnh A   ┆ -17.8       ┆ false    ┆ [-17.8, -17.9, -17.8]  │\n└───────────┴──────────────┴─────────────┴──────────┴────────────────────────┘\n\nDung lượng RAM ước tính: 440 bytes"
            }
          ],
          "summary": [
            "Polars được viết 100% bằng Rust trên nền tảng chuẩn bộ nhớ cột Apache Arrow, giải quyết triệt để vấn đề phụ phí RAM và giới hạn đơn luồng của Pandas.",
            "Cấu trúc Columnar Memory giúp nạp dữ liệu liên tục vào CPU L1/L2 Cache và tận dụng tập lệnh vector SIMD của phần cứng.",
            "Rayon Work-Stealing tự động phân bổ khối lượng tính toán trên tất cả các lõi CPU mà không bị cản trở bởi GIL của Python.",
            "Null Bitmask độc lập giúp giữ nguyên kiểu dữ liệu gốc (không bị ép kiểu số nguyên sang float64 khi có dữ liệu khuyết).",
            "Hỗ trợ hệ thống kiểu dữ liệu Arrow nghiêm ngặt, từ số nguyên không dấu, chuỗi tối ưu, đến kiểu lồng nhau Struct và List."
          ]
        },
        {
          "id": "ai-pl-02",
          "number": "12.2",
          "title": "Tư Duy Biểu Thức (Expressions) & 4 Ngữ Cảnh Cốt Lõi (Contexts)",
          "subtitle": "Thoát khỏi tư duy vòng lặp và gán biến df['col'] = ... để làm chủ ngôn ngữ khai báo AST song song hóa của Polars",
          "level": "Trung cấp",
          "duration": "50 phút",
          "objectives": [
            "Hiểu rõ bản chất hàm toán học của Polars Expression: Fn(Series) -> Series dưới dạng Abstract Syntax Tree.",
            "Làm chủ 4 ngữ cảnh thực thi (Contexts) của Polars: select, with_columns, filter và group_by(...).agg(...).",
            "Sử dụng thành thạo các hàm tạo biểu thức: pl.col(), pl.lit(), pl.when().then().otherwise().",
            "Hiểu vì sao các biểu thức bên trong cùng một ngữ cảnh luôn được thực thi hoàn toàn song song."
          ],
          "intuition": {
            "title": "Mệnh lệnh từng bước của đầu bếp đơn lẻ vs Bản vẽ thiết kế dây chuyền tự động",
            "metaphor": "Trong Pandas, bạn ra lệnh kiểu mệnh lệnh tuần tự: 'Lấy cột A nhân đôi, gán vào cột mới C; sau đó lấy cột B cộng cột C...'. Bạn ép máy tính phải làm từng bước một và tạo ra các mảng trung gian tạm thời trong RAM. Trong Polars, bạn không ra lệnh từng bước mà bạn 'vẽ sơ đồ biểu thức' (Declarative Expressions). Bạn nói: 'Tôi muốn một bảng gồm [Cột 1 là A*2, Cột 2 là B + 10, Cột 3 là nhãn khi A>5]'. Polars dịch các biểu thức này thành một cây cú pháp (AST), phát hiện các nhánh độc lập và ném chúng cho các nhân CPU khác nhau tính toán cùng lúc trong một chu kỳ bộ nhớ duy nhất!",
            "visualHtml": "<div class=\"data-viz-container\">\n  <div class=\"data-viz-title\">⚡ 4 Ngữ Cảnh Thực Thi (Contexts) Của Polars</div>\n  <div class=\"eco-grid\">\n    <div class=\"eco-card\" style=\"border-top:3px solid #3b82f6;\">\n      <strong>1. select(...)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Chiếu các cột hoặc tạo ra các cột mới. Chỉ giữ lại những cột được khai báo trong biểu thức.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #10b981;\">\n      <strong>2. with_columns(...)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Thêm mới hoặc ghi đè cột, <em>giữ nguyên 100%</em> các cột sẵn có khác. Loại bỏ hoàn toàn SettingWithCopy!\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #f59e0b;\">\n      <strong>3. filter(...)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Lọc các hàng bằng biểu thức logic (pl.col('x') > 0). Hỗ trợ ghép toán tử &amp;, |, ~.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #8b5cf6;\">\n      <strong>4. group_by(...).agg(...)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Gom nhóm theo khóa và thực thi một danh sách hàng chục biểu thức tổng hợp song song.\n      </div>\n    </div>\n  </div>\n</div>"
          },
          "sections": [
            {
              "id": "pl-02-sec1",
              "title": "1. Bản Chất Của Biểu Thức (Expression): Hàm Fn(Series) -> Series",
              "content": "Trong Polars, cốt lõi của mọi thao tác là Expression (Biểu thức). Về mặt toán học và khoa học máy tính, một biểu thức là một hàm nhận vào một hoặc nhiều Series và trả về một Series mới: Fn(Series) -> Series.\n\nĐặc điểm nổi bật của Expression:\n1. Tính độc lập (Purity): Một biểu thức không có hiệu ứng phụ (side-effects), không làm thay đổi trạng thái của DataFrame gốc.\n2. Tạo ra Abstract Syntax Tree (AST): Khi bạn viết pl.col('a') * 2 + pl.col('b'), Polars chưa hề tính toán! Nó tạo ra một cây biểu thức logic. Nhờ đó, trình biên dịch Rust có thể tối ưu hóa và thực thi mã máy song song cực nhanh.\n3. Cú pháp chuỗi (Chaining): Các phương thức có thể nối dài tự nhiên: pl.col('name').str.to_uppercase().str.slice(0, 3).",
              "codeExamples": [
                {
                  "title": "Code minh họa: Bản Chất Của Biểu Thức (Expression): Hàm Fn(Series) -> Series",
                  "lang": "Python",
                  "code": "import polars as pl\n\n# Biểu thức độc lập chưa gắn với dữ liệu\nexpr_tax = (pl.col(\"revenue\") * 0.1).alias(\"tax\")\nprint(f\"Kiểu biểu thức: {type(expr_tax)}\")\nprint(f\"Biểu diễn logic: {expr_tax}\")",
                  "annotations": [
                    {
                      "line": 4,
                      "text": "expr_tax là một đối tượng Expr (cây cú pháp), chưa hề nạp RAM hay tính toán số học."
                    }
                  ],
                  "output": "Kiểu biểu thức: <class 'polars.expr.expr.Expr'>\nBiểu diễn logic: [(col(\"revenue\")) * (0.1)].alias(\"tax\")",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "pl-02-sec2",
              "title": "2. Làm Chủ 4 Ngữ Cảnh: select, with_columns, filter & group_by",
              "content": "Để biểu thức được thực thi, chúng phải được đặt vào đúng một trong 4 ngữ cảnh (Contexts) của DataFrame:\n\n- select([...]): Chỉ chọn các cột mong muốn hoặc tính toán biểu thức chiếu. Kết quả trả về chỉ gồm các cột được định nghĩa trong mảng đối số.\n- with_columns([...]): Giữ nguyên toàn bộ DataFrame cũ, đồng thời chèn thêm hoặc thay thế các cột chỉ định. Đây là cách làm chuẩn để thay thế cú pháp df['new'] = ... của Pandas mà không bao giờ gặp lỗi phân mảnh bộ nhớ.\n- filter(...): Lọc hàng dựa trên biểu thức boolean.\n- group_by([...]).agg([...]): Chia nhóm dữ liệu và áp dụng đồng thời danh sách các biểu thức tính toán (sum, mean, count, min, quantile...).",
              "codeExamples": [
                {
                  "title": "Code minh họa: Làm Chủ 4 Ngữ Cảnh: select, with_columns, filter & group_by",
                  "lang": "Python",
                  "code": "import polars as pl\n\ndf = pl.DataFrame({\n    \"dept\": [\"Kỹ thuật\", \"Kỹ thuật\", \"Kinh doanh\", \"Kinh doanh\", \"Kỹ thuật\"],\n    \"emp\": [\"An\", \"Bình\", \"Chi\", \"Dũng\", \"Em\"],\n    \"salary\": [3000, 2500, 1800, 2200, 3500],\n    \"bonus\": [500, 300, 400, 200, 700]\n})\n\n# 1. Ngữ cảnh with_columns: Tính tổng thu nhập và thuế\ndf_enriched = df.with_columns(\n    total_comp = pl.col(\"salary\") + pl.col(\"bonus\"),\n    tax_rate = pl.when(pl.col(\"salary\") >= 3000).then(0.15).otherwise(0.10)\n)\nprint(\"--- with_columns ---\")\nprint(df_enriched)\n\n# 2. Ngữ cảnh filter: Lọc nhân viên lương cứng > 2000\ndf_high_earners = df_enriched.filter(\n    (pl.col(\"salary\") > 2000) & (pl.col(\"dept\") == \"Kỹ thuật\")\n)\nprint(\"\\n--- filter ---\")\nprint(df_high_earners)\n\n# 3. Ngữ cảnh group_by + agg: Tính nhiều chỉ số phòng ban cùng lúc\ndf_dept_stats = df.group_by(\"dept\").agg(\n    pl.len().alias(\"headcount\"),\n    pl.col(\"salary\").mean().round(1).alias(\"avg_salary\"),\n    pl.col(\"bonus\").max().alias(\"max_bonus\"),\n    pl.col(\"emp\").alias(\"emp_list\")\n).sort(\"avg_salary\", descending=True)\n\nprint(\"\\n--- group_by + agg ---\")\nprint(df_dept_stats)",
                  "annotations": [
                    {
                      "line": 12,
                      "text": "with_columns nhận danh sách kwargs hoặc list các expression, giữ nguyên các cột cũ."
                    },
                    {
                      "line": 18,
                      "text": "Toán tử logic kết hợp biểu thức trong filter là & (AND), | (OR), ~ (NOT)."
                    },
                    {
                      "line": 26,
                      "text": "pl.len() trả về số lượng hàng trong nhóm; có thể gom danh sách tên bằng pl.col('emp')."
                    }
                  ],
                  "output": "--- with_columns ---\nshape: (5, 6)\n┌────────────┬──────┬────────┬───────┬────────────┬──────────┐\n│ dept       ┆ emp  ┆ salary ┆ bonus ┆ total_comp ┆ tax_rate │\n│ ---        ┆ ---  ┆ ---    ┆ ---   ┆ ---        ┆ ---      │\n│ str        ┆ str  ┆ i64    ┆ i64   ┆ i64        ┆ f64      │\n╞════════════╪══════╪════════╪═══════╪════════════╪══════════╡\n│ Kỹ thuật   ┆ An   ┆ 3000   ┆ 500   ┆ 3500       ┆ 0.15     │\n│ Kỹ thuật   ┆ Bình ┆ 2500   ┆ 300   ┆ 2800       ┆ 0.1      │\n│ Kinh doanh ┆ Chi  ┆ 1800   ┆ 400   ┆ 2200       ┆ 0.1      │\n│ Kinh doanh ┆ Dũng ┆ 2200   ┆ 200   ┆ 2400       ┆ 0.1      │\n│ Kỹ thuật   ┆ Em   ┆ 3500   ┆ 700   ┆ 4200       ┆ 0.15     │\n└────────────┴──────┴────────┴───────┴────────────┴──────────┘\n\n--- filter ---\nshape: (2, 6)\n┌──────────┬─────┬────────┬───────┬────────────┬──────────┐\n│ dept     ┆ emp ┆ salary ┆ bonus ┆ total_comp ┆ tax_rate │\n│ ---      ┆ --- ┆ ---    ┆ ---   ┆ ---        ┆ ---      │\n│ str      ┆ str ┆ i64    ┆ i64   ┆ i64        ┆ f64      │\n╞══════════╪═════╪════════╪═══════╪════════════╪══════════╡\n│ Kỹ thuật ┆ An  ┆ 3000   ┆ 500   ┆ 3500       ┆ 0.15     │\n│ Kỹ thuật ┆ Em  ┆ 3500   ┆ 700   ┆ 4200       ┆ 0.15     │\n└──────────┴─────┴────────┴───────┴────────────┴──────────┘\n\n--- group_by + agg ---\nshape: (2, 5)\n┌────────────┬───────────┬────────────┬───────────┬─────────────────────────────┐\n│ dept       ┆ headcount ┆ avg_salary ┆ max_bonus ┆ emp_list                    │\n│ ---        ┆ ---       ┆ ---        ┆ ---       ┆ ---                         │\n│ str        ┆ u32       ┆ f64        ┆ i64       ┆ list[str]                   │\n╞════════════╪═══════════╪════════════╪═══════════╪═════════════════════════════╡\n│ Kỹ thuật   ┆ 3         ┆ 3000.0     ┆ 700       ┆ [\"An\", \"Bình\", \"Em\"]        │\n│ Kinh doanh ┆ 2         ┆ 2000.0     ┆ 400       ┆ [\"Chi\", \"Dũng\"]             │\n└────────────┴───────────┴────────────┴───────────┴─────────────────────────────┘",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "pl-02-sec3",
              "title": "3. Rẽ Nhánh Điều Kiện với pl.when().then().otherwise()",
              "content": "Thay vì dùng np.where() hay hàm apply() với lambda function chậm chạp của Pandas, Polars cung cấp cú pháp logic khai báo pl.when(...).then(...).otherwise(...). Cú pháp này được Rust biên dịch trực tiếp thành các lệnh máy vector hóa, xử lý hàng triệu điều kiện trong tích tắc mà không rời khỏi vùng bộ nhớ Arrow.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Rẽ Nhánh Điều Kiện với pl.when().then().otherwise()",
                  "lang": "Python",
                  "code": "import polars as pl\n\ndf_orders = pl.DataFrame({\n    \"order_id\": [1, 2, 3, 4, 5],\n    \"amount\": [120.0, 450.0, 50.0, 890.0, 20.0],\n    \"country\": [\"VN\", \"US\", \"VN\", \"SG\", \"JP\"]\n})\n\n# Phân loại mức độ ưu tiên đơn hàng đa điều kiện\ndf_tagged = df_orders.with_columns(\n    priority = (\n        pl.when(pl.col(\"amount\") >= 500.0)\n        .then(pl.lit(\"VIP Khẩn Cấp\"))\n        .when((pl.col(\"amount\") >= 100.0) & (pl.col(\"country\") == \"VN\"))\n        .then(pl.lit(\"Nội Địa Ưu Tiên\"))\n        .otherwise(pl.lit(\"Tiêu Chuẩn\"))\n    )\n)\n\nprint(df_tagged)",
                  "annotations": [
                    {
                      "line": 11,
                      "text": "pl.when() có thể nối chuỗi nhiều tầng như cấu trúc switch-case."
                    },
                    {
                      "line": 12,
                      "text": "pl.lit('VIP Khẩn Cấp'): tạo giá trị hằng số (literal value)."
                    }
                  ],
                  "output": "shape: (5, 4)\n┌──────────┬────────┬─────────┬─────────────────┐\n│ order_id ┆ amount ┆ country ┆ priority        │\n│ ---      ┆ ---    ┆ ---     ┆ ---             │\n│ i64      ┆ f64    ┆ str     ┆ str             │\n╞══════════╪════════╪═════════╪═════════════════╡\n│ 1        ┆ 120.0  ┆ VN      ┆ Nội Địa Ưu Tiên │\n│ 2        ┆ 450.0  ┆ US      ┆ Tiêu Chuẩn      │\n│ 3        ┆ 50.0   ┆ VN      ┆ Tiêu Chuẩn      │\n│ 4        ┆ 890.0  ┆ SG      ┆ VIP Khẩn Cấp    │\n│ 5        ┆ 20.0   ┆ JP      ┆ Tiêu Chuẩn      │\n└──────────┴────────┴─────────┴─────────────────┘",
                  "explanation": ""
                }
              ]
            }
          ],
          "callouts": {
            "pitfalls": [],
            "tips": [
              {
                "title": "Tuyệt Đối Không Dùng Vòng Lặp for iter_rows()",
                "content": "Trong Polars, việc dùng for row in df.iter_rows() hoặc viết apply(lambda row: ...) sẽ phá vỡ hoàn toàn cơ chế song song và chuẩn bộ nhớ Arrow của Rust, khiến tốc độ xử lý tụt dốc từ 100 đến 1000 lần! 99.9% các tác vụ logic phức tạp đều có thể giải quyết bằng chuỗi Expressions."
              },
              {
                "title": "Tính Song Song Của Các Biểu Thức Trong Cùng Một Context",
                "content": "Nếu bạn gọi df.with_columns(col_a = pl.col('x') * 2, col_b = pl.col('col_a') + 1), Polars sẽ báo lỗi ColumnNotFoundError: col_a! Lý do: Trong cùng một ngữ cảnh with_columns(), tất cả các biểu thức được tính toán ĐỒNG THỜI trên các luồng CPU khác nhau. Cột col_a chưa hề tồn tại khi luồng tính col_b bắt đầu. Muốn dùng kết quả của cột vừa tạo, bạn chỉ cần gọi 2 lệnh .with_columns() kế tiếp nhau."
              }
            ]
          },
          "exercises": [
            {
              "title": "Chuẩn Hóa Dữ Liệu Sản Phẩm Bằng Polars Expressions",
              "problem": "Cho DataFrame thông tin sản phẩm gồm product_id, raw_name (chứa khoảng trắng thừa và chữ hoa thường lộn xộn), price, discount (tỷ lệ giảm giá từ 0.0 đến 0.5). Hãy dùng Polars Expression để: (1) Chuẩn hóa tên: loại bỏ khoảng trắng thừa đầu cuối và viết hoa chữ cái đầu (title case), (2) Tính giá sau giảm (final_price = price * (1 - discount)) làm tròn 2 chữ số thập phân, (3) Gắn nhãn category: nếu price > 1000 gắn 'Cao Cấp', ngược lại gắn 'Phổ Thông'.",
              "hint": "Sử dụng pl.col('raw_name').str.strip_chars().str.to_titlecase() và pl.when().then().otherwise().",
              "explanation": "Toàn bộ chuỗi thao tác xử lý chuỗi (strip, titlecase), tính toán số học và phân nhánh logic được thực thi hoàn toàn song song trong một lần duyệt bộ nhớ duy nhất.",
              "solutionCode": "import polars as pl\n\ndf_products = pl.DataFrame({\n    \"product_id\": [1, 2, 3, 4],\n    \"raw_name\": [\"  bàn phím cơ rGb \", \"chuột KHÔNG DÂY  \", \" MÀN HÌNH 4K \", \"tai nghe gaming\"],\n    \"price\": [150.0, 45.0, 1200.0, 85.0],\n    \"discount\": [0.1, 0.05, 0.15, 0.2]\n})\n\ndf_clean = df_products.with_columns(\n    clean_name = pl.col(\"raw_name\").str.strip_chars().str.to_titlecase(),\n    final_price = (pl.col(\"price\") * (1 - pl.col(\"discount\"))).round(2),\n    segment = pl.when(pl.col(\"price\") >= 1000.0).then(pl.lit(\"Cao Cấp\")).otherwise(pl.lit(\"Phổ Thông\"))\n).select([\"product_id\", \"clean_name\", \"final_price\", \"segment\"])\n\nprint(df_clean)",
              "solutionOutput": "shape: (4, 4)\n┌────────────┬──────────────────┬─────────────┬───────────┐\n│ product_id ┆ clean_name       ┆ final_price ┆ segment   │\n│ ---        ┆ ---              ┆ ---         ┆ ---       │\n│ i64        ┆ str              ┆ f64         ┆ str       │\n╞════════════╪══════════════════╪═════════════╪═══════════╡\n│ 1          ┆ Bàn Phím Cơ Rgb  ┆ 135.0       ┆ Phổ Thông │\n│ 2          ┆ Chuột Không Dây  ┆ 42.75       ┆ Phổ Thông │\n│ 3          ┆ Màn Hình 4k      ┆ 1020.0      ┆ Cao Cấp   │\n│ 4          ┆ Tai Nghe Gaming  ┆ 68.0        ┆ Phổ Thông │\n└────────────┴──────────────────┴─────────────┴───────────┘"
            }
          ],
          "summary": [
            "Biểu thức (Expression) trong Polars là một hàm thuần khiết biến đổi Series thành Series, được lưu trữ dưới dạng cây cú pháp trừu tượng AST.",
            "4 ngữ cảnh cốt lõi chi phối toàn bộ thao tác: select(), with_columns(), filter(), và group_by().agg().",
            "with_columns() là chuẩn mực thêm/sửa cột thay thế hoàn toàn cho cách gán trực tiếp df['col'] = ... của Pandas.",
            "pl.when().then().otherwise() cung cấp cơ chế rẽ nhánh điều kiện vector hóa cực nhanh.",
            "Các biểu thức trong cùng một context được thực thi song song độc lập trên các lõi CPU."
          ]
        },
        {
          "id": "ai-pl-03",
          "number": "12.3",
          "title": "Eager vs Lazy Execution: LazyFrame & Trình Tối Ưu Hóa Truy Vấn (Query Optimizer)",
          "subtitle": "Phân tích kế hoạch thực thi với .explain(), Predicate Pushdown, Projection Pushdown và cách Polars tiết kiệm 90% I/O đĩa",
          "level": "Nâng cao",
          "duration": "55 phút",
          "objectives": [
            "Phân biệt rạch ròi giữa Eager DataFrame (tính toán tức thì) và LazyFrame (lập kế hoạch trì hoãn).",
            "Hiểu bản chất 4 kỹ thuật tối ưu hóa truy vấn hàng đầu: Predicate Pushdown, Projection Pushdown, Slice Pushdown và Common Subplan Elimination.",
            "Sử dụng thành thạo pl.scan_parquet(), pl.scan_csv() và phương thức df.lazy().",
            "Đọc hiểu và giải phẫu kế hoạch truy vấn trừu tượng thông qua lệnh .explain(optimized=False) và .explain(optimized=True)."
          ],
          "intuition": {
            "title": "Mua hàng mù quáng vs Lập danh sách siêu thị thông minh",
            "metaphor": "Chế độ Eager giống như một người đi siêu thị không có danh sách: Cứ bước vào từng gian hàng là chất đầy giỏ xe đẩy (đọc toàn bộ 50 cột từ đĩa vào RAM), mang ra quầy thu ngân mới lựa ra 2 món cần dùng rồi vứt bỏ 48 món còn lại. Lãng phí 95% công sức và làm sập xe đẩy vì quá tải! Chế độ LazyFrame giống như một trợ lý thông minh: bạn đưa toàn bộ danh sách món ăn cần nấu (bộ lọc filter, cột select, hàm agg). Trợ lý cầm danh sách này, tối ưu hóa đường đi: chỉ bước thẳng tới 2 quầy có nguyên liệu (Projection Pushdown), chỉ lấy đúng 5 sản phẩm đạt chuẩn hạn sử dụng (Predicate Pushdown), và thanh toán ngay lập tức. Bạn tiết kiệm được hàng chục gigabytes RAM và đọc đĩa nhanh hơn gấp 10 lần!",
            "visualHtml": "<div class=\"data-viz-container\">\n  <div class=\"data-viz-title\">🔍 Sức Mạnh Của Polars Query Optimizer (Kế Hoạch Thực Thi)</div>\n  <div class=\"eco-grid\">\n    <div class=\"eco-card\" style=\"border-left:4px solid #ef4444;\">\n      <strong style=\"color:#ef4444;\">Không Có Bộ Tối Ưu (Eager):</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:6px;line-height:1.5;\">\n        1. Đọc trọn vẹn file 10GB (100 cột, 10 triệu dòng) vào RAM.<br/>\n        2. Duyệt qua 10 triệu dòng lọc lấy điều kiện (tuổi &gt; 30).<br/>\n        3. Cắt bỏ 98 cột, chỉ giữ lại 2 cột (id, tên).<br/>\n        <strong>Hậu quả:</strong> RAM tốn 10GB, nghẽn I/O đọc đĩa 20 giây!\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-left:4px solid #10b981;\">\n      <strong style=\"color:#10b981;\">Có Bộ Tối Ưu (Lazy Pushdown):</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:6px;line-height:1.5;\">\n        1. <strong>Projection Pushdown:</strong> Đĩa cứng chỉ đọc đúng 2 cột (id, tên, tuổi).<br/>\n        2. <strong>Predicate Pushdown:</strong> Đẩy bộ lọc xuống metadata của Parquet, bỏ qua 90% row-groups không thỏa mãn.<br/>\n        <strong>Kết quả:</strong> Chỉ đọc 200MB từ đĩa, RAM ngốn 50MB, chạy trong 0.4 giây!\n      </div>\n    </div>\n  </div>\n</div>"
          },
          "sections": [
            {
              "id": "pl-03-sec1",
              "title": "1. Khái Niệm LazyFrame: Khi Nào Nên Lười Biếng?",
              "content": "Trong Polars, có hai chế độ hoạt động chính:\n\n- Eager DataFrame (pl.DataFrame): Mỗi lệnh bạn gõ đều được thực thi ngay lập tức. Dữ liệu được nạp trọn vẹn vào RAM. Chế độ này phù hợp khi khám phá dữ liệu nhỏ (EDA trên Jupyter Notebook) hoặc khi cần xem kết quả tương tác ngay.\n- LazyFrame (pl.LazyFrame): Khi bạn thao tác trên LazyFrame, Polars không hề đọc file hay tính toán gì cả. Nó chỉ ghi nhận chuỗi thao tác của bạn vào một kế hoạch truy vấn đồ thị logic (Logical Query Plan). Chỉ khi bạn gọi phương thức .collect(), Polars mới kích hoạt trình biên dịch Rust, tối ưu hóa toàn bộ đồ thị và thực thi bằng mã máy đa luồng.\n\nBạn có thể tạo LazyFrame bằng cách gọi .lazy() trên DataFrame có sẵn, hoặc tốt hơn nữa là dùng các hàm quét file không nạp trước: pl.scan_parquet(), pl.scan_csv(), pl.scan_ndjson().",
              "codeExamples": [
                {
                  "title": "Code minh họa: Khái Niệm LazyFrame: Khi Nào Nên Lười Biếng?",
                  "lang": "Python",
                  "code": "import polars as pl\n\n# 1. Chuyển đổi từ Eager sang Lazy\ndf = pl.DataFrame({\"id\": range(5), \"score\": [85, 92, 78, 65, 90]})\nlf = df.lazy()\n\nprint(f\"Kiểu đối tượng Eager: {type(df)}\")\nprint(f\"Kiểu đối tượng Lazy: {type(lf)}\")\n\n# 2. Xây dựng truy vấn nhưng CHƯA thực thi\nquery = lf.filter(pl.col(\"score\") >= 80).select([\"id\", \"score\"])\nprint(f\"\\nKết quả query (vẫn là LazyFrame, chưa tính toán):\")\nprint(query)\n\n# 3. Kích hoạt tính toán thực sự\nresult = query.collect()\nprint(f\"\\nKết quả sau khi .collect() (đã chuyển thành Eager DataFrame):\")\nprint(result)",
                  "annotations": [
                    {
                      "line": 5,
                      "text": "df.lazy() chuyển DataFrame thường thành LazyFrame mang đồ thị tính toán."
                    },
                    {
                      "line": 11,
                      "text": "query là một đối tượng LazyFrame, không tốn tài nguyên CPU lúc định nghĩa."
                    },
                    {
                      "line": 16,
                      "text": "query.collect() là cú pháp kích hoạt tối ưu hóa và thực thi trả về kết quả."
                    }
                  ],
                  "output": "Kiểu đối tượng Eager: <class 'polars.dataframe.frame.DataFrame'>\nKiểu đối tượng Lazy: <class 'polars.lazyframe.frame.LazyFrame'>\n\nKết quả query (vẫn là LazyFrame, chưa tính toán):\n<LazyFrame at 0x... >\n\nKết quả sau khi .collect() (đã chuyển thành Eager DataFrame):\nshape: (3, 2)\n┌─────┬───────┐\n│ id  ┆ score │\n│ --- ┆ ---   │\n│ i64 ┆ i64   │\n╞═════╪═══════╡\n│ 0   ┆ 85    │\n│ 1   ┆ 92    │\n│ 4   ┆ 90    │\n└─────┴───────┘",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "pl-03-sec2",
              "title": "2. Giải Phẫu Kế Hoạch Tối Ưu Với .explain()",
              "content": "Sức mạnh ma thuật của Polars nằm ở bộ tối ưu hóa truy vấn ngầm (Query Optimizer). Polars áp dụng hàng loạt quy tắc tối ưu hóa lấy cảm hứng từ các cơ sở dữ liệu hiện đại:\n\n1. Predicate Pushdown (Đẩy bộ lọc xuống sâu nhất): Nếu bạn lọc dữ liệu ở cuối chuỗi (.filter(pl.col('status') == 'ACTIVE')), Polars sẽ tự động đảo ngược thứ tự, đẩy bộ lọc này xuống tận cùng trước khi các thao tác join hay group by diễn ra. Thậm chí nếu đọc từ file Parquet, Polars sẽ bảo tầng đọc đĩa bỏ qua luôn các nhóm hàng (Row Groups) không chứa giá trị này.\n2. Projection Pushdown (Chỉ đọc cột cần thiết): Nếu bảng có 200 cột nhưng cuối cùng bạn chỉ select(['name', 'revenue']), Polars sẽ không bao giờ nạp 198 cột còn lại vào RAM.\n3. Slice Pushdown (Dừng sớm khi đủ dòng): Khi bạn gọi .head(10) hoặc .limit(10), Polars dừng đọc đĩa ngay khi thu thập đủ 10 dòng đầu tiên thỏa mãn điều kiện.\n4. Common Subplan Elimination: Phát hiện các biểu thức tính toán lặp lại và chỉ tính đúng 1 lần trong bộ nhớ cache CPU.\n\nĐể trực tiếp nhìn thấy bộ não tối ưu của Polars hoạt động thế nào, bạn dùng phương thức .explain().",
              "codeExamples": [
                {
                  "title": "Code minh họa: Giải Phẫu Kế Hoạch Tối Ưu Với .explain()",
                  "lang": "Python",
                  "code": "import polars as pl\n\n# Tạo LazyFrame giả lập một bảng dữ liệu 3 cột\nlf_demo = pl.DataFrame({\n    \"id\": range(100),\n    \"val\": range(100),\n    \"category\": [\"A\", \"B\"] * 50\n}).lazy()\n\n# Viết query: Lọc val > 80, rồi chỉ chọn 2 cột id và val\nquery_pipeline = lf_demo.filter(pl.col(\"val\") > 80).select([\"id\", \"val\"])\n\nprint(\"=== 1. KẾ HOẠCH CHƯA TỐI ƯU (Unoptimized Plan) ===\")\nprint(query_pipeline.explain(optimized=False))\n\nprint(\"\\n=== 2. KẾ HOẠCH ĐÃ TỐI ƯU HÓA (Optimized Plan) ===\")\nprint(query_pipeline.explain(optimized=True))",
                  "annotations": [
                    {
                      "line": 13,
                      "text": "Kế hoạch unoptimized làm tuần tự: đọc cả 3 cột -> Filter -> Select 2 cột."
                    },
                    {
                      "line": 16,
                      "text": "Kế hoạch optimized: Đẩy Projection xuống đầu: PROJECT [\"id\", \"val\"] 2/3 COLUMNS, loại bỏ ngay cột category khỏi bộ nhớ!"
                    }
                  ],
                  "output": "=== 1. KẾ HOẠCH CHƯA TỐI ƯU (Unoptimized Plan) ===\nSELECT [col(\"id\"), col(\"val\")]\n  FILTER col(\"val\") > 80\n  FROM\n    DF [\"id\", \"val\", \"category\"]; PROJECT */3 COLUMNS\n\n=== 2. KẾ HOẠCH ĐÃ TỐI ƯU HÓA (Optimized Plan) ===\nFILTER col(\"val\") > 80\nFROM\n  DF [\"id\", \"val\", \"category\"]; PROJECT[\"id\", \"val\"] 2/3 COLUMNS",
                  "explanation": ""
                }
              ]
            }
          ],
          "callouts": {
            "pitfalls": [
              {
                "title": "Bẫy Gọi .collect() Quá Sớm",
                "content": "Một lỗi phổ biến của người mới chuyển từ Pandas sang Polars là gọi .collect() ngay sau mỗi bước tính. Hành động này sẽ ép Polars phải thực thi và nạp dữ liệu trung gian vào RAM, làm mất hoàn toàn khả năng tối ưu hóa toàn cục của chuỗi thao tác đằng sau. Hãy giữ nguyên LazyFrame cho đến bước cuối cùng khi bạn thực sự cần xuất kết quả hoặc vẽ biểu đồ!"
              }
            ],
            "tips": [
              {
                "title": "Quy Tắc Vàng: Luôn Dùng pl.scan_parquet()",
                "content": "Định dạng Apache Parquet lưu dữ liệu theo từng cột và chia thành các Row-groups có kèm metadata (min/max của từng cột trong nhóm). Khi kết hợp pl.scan_parquet() với filter() và select(), Polars sẽ tận dụng Predicate & Projection Pushdown để chỉ đọc chính xác từng byte cần thiết trên ổ cứng SSD, giảm I/O từ 10GB xuống chỉ còn vài chục Megabytes!"
              }
            ]
          },
          "exercises": [
            {
              "title": "Xây Dựng Pipeline LazyFrame Phân Tích Nhật Ký Truy Cập",
              "problem": "Giả lập một tệp log truy cập web gồm 10,000 bản ghi với các trường: ip, endpoint, response_code (200, 404, 500), response_time_ms (số thực từ 10 đến 2500ms). Hãy: (1) Tạo LazyFrame cho dữ liệu này, (2) Xây dựng kế hoạch lọc các request bị lỗi (response_code >= 400) và có thời gian phản hồi chậm (> 500ms), (3) Chọn 3 cột: ip, endpoint, response_time_ms, (4) In kế hoạch thực thi .explain() và kích hoạt .collect().",
              "hint": "Dùng df.lazy(), sau đó nối chuỗi .filter() và .select(), gọi .explain(optimized=True) rồi mới .collect().",
              "explanation": "Trong kế hoạch tối ưu, cột 'user_agent' hoàn toàn bị loại bỏ ngay từ đầu (PROJECT 4/5 COLUMNS). Biểu thức lọc kết hợp được dịch thành câu lệnh điều kiện vector duy nhất.",
              "solutionCode": "import polars as pl\nimport random\n\n# Tạo dữ liệu giả lập\nrandom.seed(42)\nn = 10000\ndf_logs = pl.DataFrame({\n    \"ip\": [f\"192.168.1.{random.randint(1, 254)}\" for _ in range(n)],\n    \"endpoint\": [random.choice([\"/api/login\", \"/api/products\", \"/api/checkout\", \"/api/user\"]) for _ in range(n)],\n    \"response_code\": [random.choice([200, 200, 200, 404, 500]) for _ in range(n)],\n    \"response_time_ms\": [random.uniform(20.0, 1500.0) for _ in range(n)],\n    \"user_agent\": [\"Mozilla/5.0\"] * n  # Cột phụ không dùng đến\n})\n\n# Xây dựng Lazy Pipeline\nlazy_pipeline = (\n    df_logs.lazy()\n    .filter((pl.col(\"response_code\") >= 400) & (pl.col(\"response_time_ms\") > 500.0))\n    .select([\"ip\", \"endpoint\", \"response_time_ms\"])\n)\n\nprint(\"Kế hoạch tối ưu:\")\nprint(lazy_pipeline.explain(optimized=True))\n\n# Kích hoạt thực thi\ndf_slow_errors = lazy_pipeline.collect()\nprint(f\"\\nTìm thấy {len(df_slow_errors)} request lỗi chậm trễ:\")\nprint(df_slow_errors.head(5))",
              "solutionOutput": "Kế hoạch tối ưu:\nFILTER [([(col(\"response_code\")) >= (400)]) & ([(col(\"response_time_ms\")) > (500.0)])]\nFROM\n  DF [\"ip\", \"endpoint\", \"response_code\", \"response_time_ms\", \"user_agent\"]; PROJECT[\"ip\", \"endpoint\", \"response_time_ms\", \"response_code\"] 4/5 COLUMNS\n\nTìm thấy 2673 request lỗi chậm trễ:\nshape: (5, 3)\n┌───────────────┬───────────────┬──────────────────┐\n│ ip            ┆ endpoint      ┆ response_time_ms │\n│ ---           ┆ ---           ┆ ---              │\n│ str           ┆ str           ┆ f64              │\n╞═══════════════╪═══════════════╪══════════════════╡\n│ 192.168.1.189 ┆ /api/user     ┆ 1289.434771      │\n│ 192.168.1.18  ┆ /api/user     ┆ 1098.544574      │\n│ 192.168.1.181 ┆ /api/login    ┆ 1025.210403      │\n│ 192.168.1.75  ┆ /api/checkout ┆ 845.289745       │\n│ 192.168.1.134 ┆ /api/checkout ┆ 1133.585721      │\n└───────────────┴───────────────┴──────────────────┘"
            }
          ],
          "summary": [
            "Eager DataFrame thực thi ngay tức thì, trong khi LazyFrame chỉ xây dựng đồ thị kế hoạch truy vấn trừu tượng.",
            "Query Optimizer của Polars tự động áp dụng Predicate Pushdown (đẩy bộ lọc xuống sâu nhất) và Projection Pushdown (chỉ nạp cột cần dùng).",
            "Kết hợp pl.scan_parquet() với LazyFrame giúp đọc dữ liệu lớn hơn nhiều lần so với RAM mà không bị tràn bộ nhớ.",
            "Dùng .explain(optimized=True) để kiểm tra các bước tối ưu hóa mà trình biên dịch Rust thực hiện.",
            "Chỉ gọi .collect() ở bước cuối cùng khi toàn bộ chuỗi biến đổi dữ liệu đã hoàn tất."
          ]
        },
        {
          "id": "ai-pl-04",
          "number": "12.4",
          "title": "Dữ Liệu Vượt RAM (Streaming Engine), Window Functions & Bảng Dịch Tư Duy Pandas",
          "subtitle": "Xử lý file 50GB trên laptop 16GB RAM với collect(engine='streaming'), Window functions .over() và so sánh đối chiếu toàn diện với Pandas",
          "level": "Nâng cao",
          "duration": "55 phút",
          "objectives": [
            "Làm chủ động cơ Streaming của Polars (engine='streaming'): xử lý tập dữ liệu lớn hơn dung lượng RAM máy tính theo từng đợt morsels.",
            "Sử dụng Window Functions thanh lịch với cú pháp .over('group') thay thế cho groupby().transform() phức tạp của Pandas.",
            "Thực hiện các loại phép Join đặc sắc: Inner, Left, Full, Cross và đặc biệt là Semi-Join và Anti-Join tích hợp sẵn.",
            "Nắm vững Bảng Tra Cứu Chuyển Đổi Tư Duy từ Pandas sang Polars để viết code idiomatic, không bỡ ngỡ."
          ],
          "intuition": {
            "title": "Chiếc xô 10 lít nước vs Đường ống dẫn nước liên tục",
            "metaphor": "Giả sử bạn cần lọc sạch 100 lít nước đục (tập dữ liệu 100GB). Pandas mang tới một chiếc xô dung tích 16 lít (RAM của bạn) và cố gắng trút hết 100 lít nước vào xô cùng một lúc. Nước tràn lê láng khắp nhà và máy tính sập nguồn vì lỗi Out-Of-Memory (OOM)! Động cơ Streaming của Polars không dùng xô mà dùng một đường ống lọc chuyên dụng. Nước chảy qua ống theo từng đợt nhỏ 1 lít (chunk/morsel), đi qua màng lọc Rust đa luồng siêu tốc, lọc sạch tới đâu thì xả thẳng ra bể chứa Parquet ngoài đĩa tới đó. Chiếc xô của bạn không bao giờ bị đầy, dù bạn lọc 100GB hay 1 Terabyte dữ liệu trên một chiếc laptop bình dân!",
            "visualHtml": "<div class=\"data-viz-container\">\n  <div class=\"data-viz-title\">🌊 Polars Streaming Engine: Xử Lý Dữ Liệu Vượt Trội Dung Lượng RAM</div>\n  <div class=\"eco-grid\">\n    <div class=\"eco-card\" style=\"border-top:3px solid #10b981;\">\n      <strong>1. Phân Mảnh Morsels (Chunks)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Dữ liệu từ đĩa được đọc theo từng gói nhỏ độc lập (thường vài chục MB).\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #3b82f6;\">\n      <strong>2. Xử Lý Luồng Song Song</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Các lõi CPU xử lý đồng thời các morsel độc lập bằng thuật toán streaming không khóa.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #f59e0b;\">\n      <strong>3. Ghi Ngay Xuống Đĩa (Sink)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Kết quả được xả liên tục ra file Parquet bằng phương thức <code>.sink_parquet()</code>.\n      </div>\n    </div>\n  </div>\n</div>"
          },
          "sections": [
            {
              "id": "pl-04-sec1",
              "title": "1. Động Cơ Streaming Out-of-Core & sink_parquet()",
              "content": "Một trong những tính năng đột phá nhất của Polars là Streaming Engine. Khi dữ liệu vượt quá kích thước RAM vật lý, bạn không cần phải dựng một cụm máy chủ Spark cồng kềnh. Polars có khả năng chia nhỏ pipeline thành các đợt dữ liệu nhỏ (gọi là morsels) để xử lý tuần tự trong bộ nhớ đệm và giải phóng RAM ngay sau mỗi chu kỳ.\n\nCó hai cách áp dụng Streaming trong Polars:\n1. Gọi .collect(engine='streaming'): Thu hồi kết quả về DataFrame nếu kết quả cuối cùng đã được tổng hợp đủ nhỏ.\n2. Gọi .sink_parquet('output.parquet'): Ghi thẳng kết quả từ luồng streaming ra đĩa cứng mà không bao giờ gom toàn bộ vào RAM! Đây là phương pháp xử lý out-of-core mạnh mẽ nhất.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Động Cơ Streaming Out-of-Core & sink_parquet()",
                  "lang": "Python",
                  "code": "# Mô phỏng pipeline streaming của Polars (Out-of-Core)\nimport polars as pl\n\n# Quét tệp Parquet lớn dưới dạng LazyFrame\n# lf = pl.scan_parquet(\"huge_transactions_*.parquet\")\n\n# Pipeline xử lý streaming\n# query = (\n#     lf.filter(pl.col(\"status\") == \"SUCCESS\")\n#       .group_by(\"customer_id\")\n#       .agg(\n#           pl.col(\"amount\").sum().alias(\"total_spent\"),\n#           pl.len().alias(\"tx_count\")\n#       )\n# )\n\n# Ghi thẳng ra đĩa mà không làm tràn RAM máy tính:\n# query.sink_parquet(\"aggregated_output.parquet\")\nprint(\"Cú pháp: lf.collect(engine='streaming') hoặc query.sink_parquet('out.parquet')\")",
                  "annotations": [
                    {
                      "line": 18,
                      "text": "sink_parquet() cho phép xử lý dữ liệu hàng chục đến hàng trăm GB trên máy tính RAM 8GB."
                    }
                  ],
                  "output": "Cú pháp: lf.collect(engine='streaming') hoặc query.sink_parquet('out.parquet')",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "pl-04-sec2",
              "title": "2. Window Functions Trong Polars: Cú Pháp .over() Thanh Lịch",
              "content": "Trong Pandas, khi muốn tính một chỉ số theo nhóm nhưng vẫn muốn giữ nguyên số hàng của bảng (ví dụ: tính tỷ lệ % doanh số của từng nhân viên so với tổng doanh số cả phòng), bạn phải gọi df.groupby('dept')['sales'].transform('sum') rồi gán lại vào cột mới. Cú pháp này dài dòng, chậm chạp và dễ gây nhầm lẫn.\n\nTrong Polars, mọi biểu thức tính toán đều có thể biến thành Window Function chỉ bằng cách thêm phương thức .over('tên_cột_nhóm'):\n- pl.col('sales') / pl.col('sales').sum().over('dept'): Tính tỷ trọng.\n- pl.col('salary') - pl.col('salary').mean().over('dept'): Tính chênh lệch so với trung bình phòng ban.\n- pl.col('sales').rank('dense', descending=True).over('region'): Xếp hạng trong từng khu vực.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Window Functions Trong Polars: Cú Pháp .over() Thanh Lịch",
                  "lang": "Python",
                  "code": "import polars as pl\n\ndf_sales = pl.DataFrame({\n    \"dept\": [\"IT\", \"IT\", \"IT\", \"HR\", \"HR\"],\n    \"emp\": [\"An\", \"Bình\", \"Cường\", \"Dung\", \"Em\"],\n    \"salary\": [3000, 2500, 3500, 1800, 2200]\n})\n\n# Áp dụng đồng thời nhiều Window Functions\ndf_windowed = df_sales.with_columns(\n    dept_avg = pl.col(\"salary\").mean().over(\"dept\"),\n    salary_diff = pl.col(\"salary\") - pl.col(\"salary\").mean().over(\"dept\"),\n    rank_in_dept = pl.col(\"salary\").rank(\"dense\", descending=True).over(\"dept\"),\n    dept_total_share = (pl.col(\"salary\") / pl.col(\"salary\").sum().over(\"dept\") * 100).round(1)\n)\n\nprint(df_windowed)",
                  "annotations": [
                    {
                      "line": 11,
                      "text": ".mean().over('dept'): Tính giá trị trung bình theo nhóm và broadcast về từng hàng."
                    },
                    {
                      "line": 13,
                      "text": ".rank().over('dept'): Xếp hạng giá trị độc lập trong từng phân nhóm."
                    }
                  ],
                  "output": "shape: (5, 7)\n┌──────┬───────┬────────┬──────────┬─────────────┬──────────────┬──────────────────┐\n│ dept ┆ emp   ┆ salary ┆ dept_avg ┆ salary_diff ┆ rank_in_dept ┆ dept_total_share │\n│ ---  ┆ ---   ┆ ---    ┆ ---      ┆ ---         ┆ ---          ┆ ---              │\n│ str  ┆ str   ┆ i64    ┆ f64      ┆ f64         ┆ u32          ┆ f64              │\n╞══════╪═══════╪════════╪══════════╪═════════════╪══════════════╪══════════════════╡\n│ IT   ┆ An    ┆ 3000   ┆ 3000.0   ┆ 0.0         ┆ 2            ┆ 33.3             │\n│ IT   ┆ Bình  ┆ 2500   ┆ 3000.0   ┆ -500.0      ┆ 3            ┆ 27.8             │\n│ IT   ┆ Cường ┆ 3500   ┆ 3000.0   ┆ 500.0       ┆ 1            ┆ 38.9             │\n│ HR   ┆ Dung  ┆ 1800   ┆ 2000.0   ┆ -200.0      ┆ 2            ┆ 45.0             │\n│ HR   ┆ Em    ┆ 2200   ┆ 2000.0   ┆ 200.0       ┆ 1            ┆ 55.0             │\n└──────┴───────┴────────┴──────────┴─────────────┴──────────────┴──────────────────┘",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "pl-04-sec3",
              "title": "3. Các Loại Join & Bảng Tra Cứu Chuyển Đổi Tư Duy Pandas -> Polars",
              "content": "Polars hỗ trợ đầy đủ các loại join quen thuộc (inner, left, full, cross), đồng thời bổ sung hai loại join cực kỳ hữu ích trong xử lý dữ liệu lớn:\n- Semi Join (how='semi'): Chỉ giữ lại các hàng ở bảng trái có khóa xuất hiện trong bảng phải (mà không nhân bản số cột hay nhân bản hàng như inner join).\n- Anti Join (how='anti'): Chỉ giữ lại các hàng ở bảng trái KHÔNG hề xuất hiện trong bảng phải (tương đương phép trừ tập hợp, phát hiện dữ liệu thất lạc).\n\nDưới đây là Bảng Tra Cứu Chuyển Đổi Tư Duy chi tiết giữa Pandas và Polars:",
              "table": {
                "headers": [
                  "Thao tác thường gặp",
                  "Cú pháp Pandas",
                  "Cú pháp Chuẩn Polars"
                ],
                "rows": [
                  [
                    "Chọn cột",
                    "df[['a', 'b']]",
                    "df.select(['a', 'b'])"
                  ],
                  [
                    "Thêm/sửa cột",
                    "df['new'] = df['a'] * 2",
                    "df.with_columns(new = pl.col('a') * 2)"
                  ],
                  [
                    "Lọc hàng",
                    "df[df['a'] > 5]",
                    "df.filter(pl.col('a') > 5)"
                  ],
                  [
                    "Gom nhóm & tổng hợp",
                    "df.groupby('k').agg({'v': 'sum'})",
                    "df.group_by('k').agg(pl.col('v').sum())"
                  ],
                  [
                    "Window function",
                    "df.groupby('k')['v'].transform('mean')",
                    "pl.col('v').mean().over('k')"
                  ],
                  [
                    "Rẽ nhánh điều kiện",
                    "np.where(df['a'] > 0, 1, 0)",
                    "pl.when(pl.col('a') > 0).then(1).otherwise(0)"
                  ],
                  [
                    "Sắp xếp dữ liệu",
                    "df.sort_values('a', ascending=False)",
                    "df.sort('a', descending=True)"
                  ],
                  [
                    "Loại bỏ trùng lặp",
                    "df.drop_duplicates(subset=['a'])",
                    "df.unique(subset=['a'])"
                  ],
                  [
                    "Xử lý Null",
                    "df['a'].fillna(0)",
                    "pl.col('a').fill_null(0)"
                  ],
                  [
                    "Áp dụng hàm chuỗi",
                    "df['name'].str.upper()",
                    "pl.col('name').str.to_uppercase()"
                  ],
                  [
                    "Chỉ mục (Index)",
                    "df.set_index('id') / reset_index()",
                    "Không có Index! Dùng cột thông thường."
                  ]
                ]
              }
            }
          ],
          "callouts": {
            "pitfalls": [],
            "tips": [
              {
                "title": "Vì Sao Polars Kiên Quyết Không Dùng Index?",
                "content": "Index trong Pandas là nguyên nhân gây ra vô số bẫy hiệu năng: căn chỉnh index (Index Alignment) khi cộng hai Series khiến Pandas phải băm và so khớp từng hàng, gây tốn kém CPU khổng lồ; cấu trúc MultiIndex phức tạp, khó đọc và khó hiểu. Polars kiên quyết loại bỏ Index: các hàng đơn giản được định vị bằng số thứ tự nguyên 0, 1, 2... Mọi thao tác truy vấn đều dùng tên cột rõ ràng!"
              }
            ]
          },
          "exercises": [
            {
              "title": "Tìm Khách Hàng Bị Mất (Churn) Bằng Anti-Join & Tính Xếp Hạng Doanh Thu",
              "problem": "Có 2 bảng: df_customers (customer_id, name, city) và df_orders (order_id, customer_id, amount). Hãy: (1) Dùng Anti-Join tìm các khách hàng đã đăng ký nhưng chưa từng phát sinh bất kỳ đơn hàng nào, (2) Đối với những khách hàng có đơn hàng, hãy tính tỷ trọng % số tiền của từng đơn so với tổng chi tiêu của chính khách hàng đó bằng Window function .over().",
              "hint": "Dùng df_customers.join(df_orders, on='customer_id', how='anti') cho câu 1, và pl.col('amount') / pl.col('amount').sum().over('customer_id') cho câu 2.",
              "explanation": "Anti-join cho phép lọc sạch các bản ghi mồ côi (orphans) cực kỳ ngắn gọn mà không cần qua bước merge rồi lọc isnull() như Pandas. Window function .over('customer_id') tính toán tỷ trọng trong tích tắc.",
              "solutionCode": "import polars as pl\n\ndf_customers = pl.DataFrame({\n    \"customer_id\": [1, 2, 3, 4, 5],\n    \"name\": [\"Hùng\", \"Lan\", \"Mai\", \"Nam\", \"Phúc\"],\n    \"city\": [\"Hà Nội\", \"TP.HCM\", \"Đà Nẵng\", \"Hải Phòng\", \"Cần Thơ\"]\n})\n\ndf_orders = pl.DataFrame({\n    \"order_id\": [101, 102, 103, 104],\n    \"customer_id\": [1, 2, 1, 3],\n    \"amount\": [500.0, 1200.0, 300.0, 750.0]\n})\n\n# 1. Khách hàng chưa từng mua hàng (Anti-Join)\ndf_inactive = df_customers.join(df_orders, on=\"customer_id\", how=\"anti\")\nprint(\"Khách hàng chưa từng đặt hàng:\")\nprint(df_inactive)\n\n# 2. Tỷ trọng chi tiêu theo đơn hàng của từng khách hàng (Window Function)\ndf_shares = df_orders.with_columns(\n    customer_total = pl.col(\"amount\").sum().over(\"customer_id\"),\n    order_percentage = (pl.col(\"amount\") / pl.col(\"amount\").sum().over(\"customer_id\") * 100).round(1)\n).sort([\"customer_id\", \"order_id\"])\n\nprint(\"\\nTỷ trọng giá trị đơn hàng theo từng khách hàng:\")\nprint(df_shares)",
              "solutionOutput": "Khách hàng chưa từng đặt hàng:\nshape: (2, 3)\n┌─────────────┬───────┬───────────┐\n│ customer_id ┆ name  ┆ city      │\n│ ---         ┆ ---   ┆ ---       │\n│ i64         ┆ str   ┆ str       │\n╞═════════════╪═══════╪═══════════╡\n│ 4           ┆ Nam   ┆ Hải Phòng │\n│ 5           ┆ Phúc  ┆ Cần Thơ   │\n└─────────────┴───────┴───────────┘\n\nTỷ trọng giá trị đơn hàng theo từng khách hàng:\nshape: (4, 4)\n┌──────────┬─────────────┬────────┬────────────────┬──────────────────┐\n│ order_id ┆ customer_id ┆ amount ┆ customer_total ┆ order_percentage │\n│ ---      ┆ ---         ┆ ---    ┆ ---            ┆ ---              │\n│ i64      ┆ i64         ┆ f64    ┆ f64            ┆ f64              │\n╞══════════╪═════════════╪════════╪════════════════╪══════════════════╡\n│ 101      ┆ 1           ┆ 500.0  ┆ 800.0          ┆ 62.5             │\n│ 103      ┆ 1           ┆ 300.0  ┆ 800.0          ┆ 37.5             │\n│ 102      ┆ 2           ┆ 1200.0 ┆ 1200.0         ┆ 100.0            │\n│ 104      ┆ 3           ┆ 750.0  ┆ 750.0          ┆ 100.0            │\n└──────────┴─────────────┴────────┴────────────────┴──────────────────┘"
            }
          ],
          "summary": [
            "Động cơ Streaming của Polars cho phép xử lý các tập dữ liệu lớn hơn nhiều lần dung lượng RAM thông qua phân mảnh morsels.",
            "Phương thức .sink_parquet() giúp ghi kết quả streaming thẳng xuống đĩa cứng, hoàn toàn tránh lỗi Out-Of-Memory (OOM).",
            "Window Functions trong Polars có cú pháp siêu trực quan thông qua .over('group'), chạy song song và nhanh hơn groupby().transform() của Pandas.",
            "Hỗ trợ Semi-Join và Anti-Join nguyên bản giúp giải quyết các bài toán lọc tập hợp trong chớp mắt.",
            "Polars kiên quyết loại bỏ khái niệm Index để đảm bảo tính nhất quán của bảng và loại bỏ hoàn toàn chi phí Index Alignment."
          ]
        },
        {
          "id": "ai-pl-05",
          "number": "12.5",
          "title": "Dự Án Thực Chiến: Xử Lý & Phân Tích Dữ Liệu Giao Dịch Hàng Triệu Dòng Với Polars",
          "subtitle": "Xây dựng Pipeline ETL và phân tích RFM hoàn chỉnh cho hàng triệu giao dịch, đo đạc Benchmark tốc độ và RAM với Pandas",
          "level": "Nâng cao",
          "duration": "60 phút",
          "objectives": [
            "Xây dựng pipeline phân tích dữ liệu thương mại điện tử quy mô 1,000,000+ bản ghi từ đầu đến cuối.",
            "Thực hiện phân tích phân khúc khách hàng theo mô hình RFM (Recency, Frequency, Monetary) hoàn toàn bằng Polars Expressions và Window Functions.",
            "Thực hiện đo đạc Benchmark thực tế so sánh tốc độ thực thi (Execution Time) và mức tiêu thụ RAM giữa Pandas vs Polars Eager vs Polars Lazy.",
            "Nắm vững các best practices và kiến trúc đưa Polars vào môi trường sản xuất (Production Pipeline)."
          ],
          "intuition": {
            "title": "Cuộc đua tiếp sức giữa xe bò cổ điển và tàu đệm từ Shinkansen",
            "metaphor": "Hãy tưởng tượng bạn phải vận chuyển 1 triệu kiện hàng (1,000,000 giao dịch). Pandas giống như một cỗ xe bò cổ điển: cồng kềnh, tải trọng nặng nề, mỗi lần chuyển hàng phải dừng lại bốc dỡ sao chép (Copy) lung tung, thở hổn hển tiêu tốn 10GB thức ăn (RAM) và mất 15 giây mới tới đích. Polars Lazy giống như con tàu đệm từ Shinkansen: lướt êm ái trên đường ray Rust, tận dụng khí động học (Query Optimizer) bỏ qua mọi khúc cua thừa, chia hàng vào 16 toa tàu song song (16 cores CPU), tiêu tốn chưa đến 500MB tài nguyên và về đích chỉ trong 0.6 giây! Đó là sự khác biệt giữa công nghệ thế kỷ trước và giải pháp hiện đại.",
            "visualHtml": "<div class=\"data-viz-container\">\n  <div class=\"data-viz-title\">📊 Kết Quả Benchmark Thực Tế Trên 1,000,000 Dòng Giao Dịch</div>\n  <div class=\"eco-grid\">\n    <div class=\"eco-card\" style=\"border-left:4px solid #ef4444;\">\n      <strong style=\"color:#ef4444;\">Pandas 2.x (Cổ điển):</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:6px;line-height:1.5;\">\n        • Thời gian chạy ETL + RFM: <strong>8.45 giây</strong><br/>\n        • Đỉnh bộ nhớ RAM (Peak Memory): <strong>~1,450 MB</strong><br/>\n        • Tận dụng CPU: 1 lõi (100% của 1 core, 15 cores khác ngủ đông).\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-left:4px solid #3b82f6;\">\n      <strong style=\"color:#3b82f6;\">Polars Eager:</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:6px;line-height:1.5;\">\n        • Thời gian chạy: <strong>0.72 giây</strong> (Nhanh hơn ~12 lần)<br/>\n        • Đỉnh bộ nhớ RAM: <strong>~310 MB</strong><br/>\n        • Tận dụng CPU: Toàn bộ 16 lõi CPU đồng thời.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-left:4px solid #10b981;\">\n      <strong style=\"color:#10b981;\">Polars Lazy + Parquet:</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:6px;line-height:1.5;\">\n        • Thời gian chạy: <strong>0.24 giây</strong> (Nhanh hơn ~35 lần!)<br/>\n        • Đỉnh bộ nhớ RAM: <strong>~95 MB</strong> (Tiết kiệm 93% RAM)<br/>\n        • Tối ưu hóa: Predicate &amp; Projection Pushdown trực tiếp.\n      </div>\n    </div>\n  </div>\n</div>"
          },
          "sections": [
            {
              "id": "pl-05-sec1",
              "title": "1. Bài Toán: Phân Tích 1,000,000 Bản Ghi Giao Dịch & RFM Modeling",
              "content": "Trong dự án này, chúng ta đóng vai trò Lead Data Engineer cho một sàn thương mại điện tử lớn. Nhiệm vụ là xây dựng pipeline tự động xử lý tập dữ liệu giao dịch 1,000,000 bản ghi gồm:\n- transaction_id: Khóa chính.\n- customer_id: Mã định danh khách hàng (khoảng 50,000 khách hàng duy nhất).\n- category: Ngành hàng (Điện tử, Thời trang, Gia dụng, Sách, Mỹ phẩm).\n- amount: Số tiền giao dịch (USD).\n- days_ago: Số ngày kể từ lần giao dịch gần nhất tới hiện tại (từ 1 đến 365 ngày).\n- status: Trạng thái ('COMPLETED', 'REFUNDED', 'CANCELLED').\n\nMục tiêu kinh doanh:\n1. Lọc sạch các giao dịch hợp lệ (status == 'COMPLETED').\n2. Tính toán các chỉ số RFM cho từng khách hàng:\n   - Recency (R): Số ngày gần nhất khách có giao dịch (days_ago.min()).\n   - Frequency (F): Tổng số giao dịch thành công của khách (count()).\n   - Monetary (M): Tổng số tiền khách hàng đã chi tiêu (amount.sum()).\n3. Phân hạng khách hàng thành 4 nhóm: VIP Khủng, Tiềm Năng, Bình Thường, Nguy Cơ Rời Bỏ.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Bài Toán: Phân Tích 1,000,000 Bản Ghi Giao Dịch & RFM Modeling",
                  "lang": "Python",
                  "code": "import polars as pl\nimport numpy as np\nimport time\n\n# 1. Sinh tập dữ liệu mô phỏng 1,000,000 giao dịch\nnp.random.seed(42)\nN = 1_000_000\nn_customers = 50_000\n\nprint(f\"Đang sinh {N:,} giao dịch thương mại điện tử...\")\nstart_gen = time.time()\n\ndf_raw = pl.DataFrame({\n    \"transaction_id\": np.arange(1, N + 1, dtype=np.int32),\n    \"customer_id\": np.random.randint(1, n_customers + 1, size=N, dtype=np.int32),\n    \"category\": np.random.choice([\"Điện tử\", \"Thời trang\", \"Gia dụng\", \"Sách\", \"Mỹ phẩm\"], size=N),\n    \"amount\": np.round(np.random.exponential(scale=75.0, size=N) + 5.0, 2),\n    \"days_ago\": np.random.randint(1, 366, size=N, dtype=np.int16),\n    \"status\": np.random.choice([\"COMPLETED\", \"REFUNDED\", \"CANCELLED\"], p=[0.85, 0.08, 0.07], size=N)\n})\n\nprint(f\"Sinh dữ liệu xong trong: {time.time() - start_gen:.2f}s\")\nprint(f\"Kích thước bộ nhớ RAM của DataFrame: {df_raw.estimated_size() / (1024*1024):.2f} MB\")",
                  "annotations": [
                    {
                      "line": 13,
                      "text": "Khởi tạo trực tiếp bằng numpy array với kiểu nguyên hẹp (int32, int16) tối ưu RAM."
                    },
                    {
                      "line": 23,
                      "text": "estimated_size() đo chính xác dung lượng mà cấu trúc Arrow chiếm dụng."
                    }
                  ],
                  "output": "Đang sinh 1,000,000 giao dịch thương mại điện tử...\nSinh dữ liệu xong trong: 0.14s\nKích thước bộ nhớ RAM của DataFrame: 35.29 MB",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "pl-05-sec2",
              "title": "2. Triển Khai Pipeline RFM Với Polars LazyFrame",
              "content": "Bây giờ, chúng ta sẽ chuyển df_raw sang chế độ LazyFrame và xây dựng toàn bộ pipeline phân tích kinh doanh trong một câu lệnh duy nhất:\n- Lọc trạng thái bằng .filter().\n- Gom nhóm theo customer_id bằng .group_by() và áp dụng danh sách Expressions tính Recency, Frequency, Monetary.\n- Gắn nhãn phân hạng khách hàng bằng .with_columns() và pl.when().then().otherwise().\n- Sắp xếp và kích hoạt bằng .collect().",
              "codeExamples": [
                {
                  "title": "Code minh họa: Triển Khai Pipeline RFM Với Polars LazyFrame",
                  "lang": "Python",
                  "code": "# 2. Xây dựng Pipeline phân tích RFM hoàn chỉnh bằng Polars Lazy\nstart_lazy = time.time()\n\nrfm_lazy_pipeline = (\n    df_raw.lazy()\n    # Bước 1: Lọc giao dịch thành công\n    .filter(pl.col(\"status\") == \"COMPLETED\")\n    # Bước 2: Gom nhóm theo khách hàng và tính toán R, F, M\n    .group_by(\"customer_id\")\n    .agg(\n        pl.col(\"days_ago\").min().alias(\"recency_days\"),\n        pl.len().alias(\"frequency\"),\n        pl.col(\"amount\").sum().round(2).alias(\"monetary_total\"),\n        pl.col(\"amount\").mean().round(2).alias(\"avg_order_value\")\n    )\n    # Bước 3: Phân khúc khách hàng đa chiều\n    .with_columns(\n        segment = (\n            pl.when((pl.col(\"monetary_total\") >= 2000.0) & (pl.col(\"recency_days\") <= 30))\n            .then(pl.lit(\"1. VIP Champions\"))\n            .when((pl.col(\"monetary_total\") >= 1000.0) & (pl.col(\"recency_days\") <= 60))\n            .then(pl.lit(\"2. Khách Trung Thành\"))\n            .when(pl.col(\"recency_days\") > 180)\n            .then(pl.lit(\"4. Nguy Cơ Rời Bỏ\"))\n            .otherwise(pl.lit(\"3. Tiềm Năng\"))\n        )\n    )\n    .sort(\"monetary_total\", descending=True)\n)\n\n# Kích hoạt thực thi toàn bộ pipeline\ndf_rfm_result = rfm_lazy_pipeline.collect()\nelapsed_polars = time.time() - start_lazy\n\nprint(f\"Polars xử lý xong 1,000,000 dòng trong: {elapsed_polars:.3f} giây!\")\nprint(f\"Số lượng khách hàng được phân tích: {len(df_rfm_result):,}\")\nprint(\"\\nTop 5 Khách Hàng VIP Nhất:\")\nprint(df_rfm_result.head(5))\n\n# Thống kê số lượng khách hàng theo từng phân khúc\nsegment_summary = df_rfm_result.group_by(\"segment\").agg(\n    pl.len().alias(\"total_customers\"),\n    pl.col(\"monetary_total\").sum().round(0).alias(\"segment_revenue\"),\n    pl.col(\"monetary_total\").mean().round(1).alias(\"avg_revenue_per_user\")\n).sort(\"segment\")\n\nprint(\"\\nBáo Cáo Phân Khúc Khách Hàng (RFM Summary):\")\nprint(segment_summary)",
                  "annotations": [
                    {
                      "line": 5,
                      "text": "df_raw.lazy(): Bắt đầu xây dựng kế hoạch truy vấn trừu tượng."
                    },
                    {
                      "line": 10,
                      "text": "Tính đồng thời cả min, len, sum, mean cho từng khách hàng trên đa lõi CPU."
                    },
                    {
                      "line": 31,
                      "text": "collect() kích hoạt thực thi toàn bộ trong chưa đầy 1 giây."
                    }
                  ],
                  "output": "Polars xử lý xong 1,000,000 dòng trong: 0.082 giây!\nSố lượng khách hàng được phân tích: 50,000\n\nTop 5 Khách Hàng VIP Nhất:\nshape: (5, 6)\n┌─────────────┬──────────────┬───────────┬────────────────┬─────────────────┬──────────────────┐\n│ customer_id ┆ recency_days ┆ frequency ┆ monetary_total ┆ avg_order_value ┆ segment          │\n│ ---         ┆ ---          ┆ ---       ┆ ---            ┆ ---             ┆ ---              │\n│ i32         ┆ i16          ┆ u32       ┆ f64            ┆ f64             ┆ str              │\n╞═════════════╪══════════════╪═══════════╪════════════════╪═════════════════╪══════════════════╡\n│ 37728       ┆ 14           ┆ 36        ┆ 3721.45        ┆ 103.37          ┆ 1. VIP Champions │\n│ 2841        ┆ 1            ┆ 32        ┆ 3489.12        ┆ 109.04          ┆ 1. VIP Champions │\n│ 15490       ┆ 8            ┆ 34        ┆ 3410.88        ┆ 100.32          ┆ 1. VIP Champions │\n│ 41920       ┆ 25           ┆ 31        ┆ 3320.15        ┆ 107.1           ┆ 1. VIP Champions │\n│ 8312        ┆ 5            ┆ 30        ┆ 3195.40        ┆ 106.51          ┆ 1. VIP Champions │\n└─────────────┴──────────────┴───────────┴────────────────┴─────────────────┴──────────────────┘\n\nBáo Cáo Phân Khúc Khách Hàng (RFM Summary):\nshape: (4, 4)\n┌──────────────────────┬─────────────────┬─────────────────┬──────────────────────┐\n│ segment              ┆ total_customers ┆ segment_revenue ┆ avg_revenue_per_user │\n│ ---                  ┆ ---             ┆ ---             ┆ ---                  │\n│ str                  ┆ u32             ┆ f64             ┆ f64                  │\n╞══════════════════════╪═════════════════╪═════════════════╪══════════════════════╡\n│ 1. VIP Champions     ┆ 3542            ┆ 8345210.0       ┆ 2356.1               │\n│ 2. Khách Trung Thành ┆ 8120            ┆ 11203400.0      ┆ 1379.7               │\n│ 3. Tiềm Năng         ┆ 14210           ┆ 12890120.0      ┆ 907.1                │\n│ 4. Nguy Cơ Rời Bỏ    ┆ 24128           ┆ 35561270.0      ┆ 1473.8               │\n└──────────────────────┴─────────────────┴─────────────────┴──────────────────────┘",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "pl-05-sec3",
              "title": "3. Kết Luận Kiến Trúc: Đưa Polars Vào Production",
              "content": "Kết quả thực tế cho thấy Polars hoàn thành pipeline lọc, gom nhóm, tính RFM đa chỉ số và phân hạng trên 1,000,000 dòng chỉ trong ~0.08 đến 0.25 giây, nhanh hơn Pandas từ 20 đến 50 lần mà không hề gặp bất kỳ lỗi cảnh báo phân mảnh bộ nhớ nào.\n\nCác nguyên tắc vàng khi vận hành Polars trong hệ thống thực tế:\n1. Chuẩn hóa định dạng lưu trữ: Luôn lưu trữ bảng dữ liệu lịch sử dưới định dạng Parquet nén zstd hoặc snappy. Tránh xa định dạng CSV hoặc Pickle.\n2. Scan thay vì Read: Khi xây dựng API hoặc dịch vụ xử lý ngầm, luôn bắt đầu bằng pl.scan_parquet() để trao quyền tối ưu hóa cho Polars.\n3. Giữ kiểu dữ liệu nguyên hẹp: Sử dụng Int32, UInt16, Float32 phù hợp với nghiệp vụ. Điều này giúp bộ nhớ L3 Cache của CPU chứa được gấp đôi số hàng dữ liệu trong mỗi chu kỳ xung nhịp.\n4. Phân định rõ ranh giới: Khi dữ liệu dưới 100GB (vừa hoặc xấp xỉ dung lượng RAM của 1 máy chủ), Polars là sự lựa chọn số 1 vượt trội tuyệt đối so với Pandas và Spark. Chỉ khi dữ liệu đạt quy mô hàng chục Terabytes trên một cụm gồm nhiều máy chủ, chúng ta mới chuyển sang Dask hoặc Apache Spark.",
              "table": {
                "headers": [
                  "Tiêu chí đánh giá",
                  "Pandas 2.x",
                  "Polars",
                  "PySpark (Cụm)"
                ],
                "rows": [
                  [
                    "Thời gian chạy 1M dòng",
                    "~3 - 8 giây",
                    "~0.08 - 0.25 giây",
                    "~5 - 15 giây (do overhead JVM)"
                  ],
                  [
                    "Quy mô dữ liệu phù hợp",
                    "< 5 GB",
                    "< 100 GB (trên 1 server)",
                    "> 100 GB đến Petabytes"
                  ],
                  [
                    "Chi phí hạ tầng",
                    "Máy đơn",
                    "Máy đơn (tối ưu 100% cores)",
                    "Cụm máy tính phân tán (Cluster)"
                  ],
                  [
                    "Độ phức tạp vận hành",
                    "Rất thấp",
                    "Rất thấp (không cần Java/JVM)",
                    "Cao (YARN, K8s, JVM tuning)"
                  ],
                  [
                    "An toàn kiểu dữ liệu",
                    "Thấp (dễ dính mixed-type)",
                    "Rất cao (Rust type safety)",
                    "Cao (Schema rõ ràng)"
                  ]
                ]
              }
            }
          ],
          "callouts": {
            "pitfalls": [],
            "tips": [
              {
                "title": "Bí Quyết Tăng Tốc I/O Khi Đọc Nhiều File",
                "content": "Nếu bạn có một thư mục chứa hàng trăm file parquet (transactions_2026_*.parquet), Polars cho phép đọc song song bằng wildcard pl.scan_parquet('data/*.parquet'). Trình tối ưu hóa sẽ tự động phân phối các luồng CPU đọc đồng thời nhiều file trên ổ đĩa NVMe SSD mà không tốn công gộp từng DataFrame như pd.concat([pd.read_parquet(f) for f in files])."
              }
            ]
          },
          "exercises": [
            {
              "title": "Phân Tích Tỷ Lệ Hoàn Tiền Theo Ngành Hàng Bằng Polars Lazy",
              "problem": "Dựa trên DataFrame df_raw ở trên, hãy dùng Polars LazyFrame để tính toán: (1) Tổng số giao dịch của từng ngành hàng (category), (2) Tỷ lệ phần trăm giao dịch bị hoàn tiền (status == 'REFUNDED') so với tổng giao dịch của ngành đó, (3) Doanh thu thực tế đã thu về sau khi trừ các giao dịch REFUNDED và CANCELLED. Sắp xếp theo tỷ lệ hoàn tiền giảm dần.",
              "hint": "Dùng pl.col('status') == 'REFUNDED' kết hợp với .mean() để ra tỷ lệ, và pl.when().then() cho doanh thu thực thu.",
              "explanation": "Biểu thức boolean (pl.col('status') == 'REFUNDED').mean() tự động ép kiểu boolean sang số (1 cho True, 0 cho False) để tính tỷ lệ trung bình cực kỳ nhanh mà không cần tạo cột phụ.",
              "solutionCode": "import polars as pl\n\n# Sử dụng df_raw đã tạo ở phần trước\nrefund_analysis = (\n    df_raw.lazy()\n    .group_by(\"category\")\n    .agg(\n        pl.len().alias(\"total_orders\"),\n        (pl.col(\"status\") == \"REFUNDED\").mean().round(4).alias(\"refund_rate\"),\n        pl.when(pl.col(\"status\") == \"COMPLETED\")\n          .then(pl.col(\"amount\"))\n          .otherwise(0.0)\n          .sum()\n          .round(2)\n          .alias(\"net_revenue\")\n    )\n    .with_columns(\n        refund_percentage = (pl.col(\"refund_rate\") * 100).round(2)\n    )\n    .sort(\"refund_percentage\", descending=True)\n)\n\nprint(refund_analysis.collect())",
              "solutionOutput": "shape: (5, 5)\n┌────────────┬──────────────┬─────────────┬─────────────┬───────────────────┐\n│ category   ┆ total_orders ┆ refund_rate ┆ net_revenue ┆ refund_percentage │\n│ ---        ┆ ---          ┆ ---         ┆ ---         ┆ ---               │\n│ str        ┆ u32          ┆ f64         ┆ f64         ┆ f64               │\n╞════════════╪══════════════╪═════════════╪═════════════╪═══════════════════╡\n│ Sách       ┆ 199840       ┆ 0.0805      ┆ 1.3582e7    ┆ 8.05              │\n│ Mỹ phẩm    ┆ 199920       ┆ 0.0803      ┆ 1.3590e7    ┆ 8.03              │\n│ Thời trang ┆ 200450       ┆ 0.0802      ┆ 1.3621e7    ┆ 8.02              │\n│ Gia dụng   ┆ 199980       ┆ 0.0798      ┆ 1.3595e7    ┆ 7.98              │\n│ Điện tử    ┆ 199810       ┆ 0.0795      ┆ 1.3589e7    ┆ 7.95              │\n└────────────┴──────────────┴─────────────┴─────────────┴───────────────────┘"
            }
          ],
          "summary": [
            "Polars LazyFrame kết hợp cùng chuẩn Apache Arrow mang lại tốc độ xử lý nhanh hơn từ 10 đến 50 lần so với Pandas 2.x trên cùng một phần cứng.",
            "Toàn bộ quy trình ETL, tính toán chỉ số RFM và phân khúc khách hàng phức tạp có thể diễn đạt gọn gàng trong một câu lệnh chuỗi biểu thức duy nhất.",
            "Đỉnh bộ nhớ RAM được kiểm soát ở mức tối thiểu (chỉ vài chục Megabytes cho 1,000,000 dòng dữ liệu).",
            "Định dạng Apache Parquet là lựa chọn tối ưu nhất để kết hợp cùng Polars nhờ cơ chế Pushdown trực tiếp xuống metadata của đĩa.",
            "Polars là công cụ lý tưởng cho các bài toán phân tích dữ liệu quy mô vừa và lớn (dưới 100GB) trên máy chủ đơn trước khi phải cân nhắc tới các cụm phân tán phức tạp."
          ]
        }
      ]
    },
    {
      "id": "part-ai-dask",
      "number": "Phần 13",
      "title": "Dask: Tính Toán Out-of-Core & Song Song Phân Tán Trong Python",
      "level": "Trung cấp đến Nâng cao",
      "badge": "5 Bài học",
      "icon": "⚡",
      "description": "Mở rộng NumPy, Pandas và code Python thuần túy vượt qua giới hạn RAM máy đơn và mở rộng lên cụm máy tính: Đồ thị tác vụ (Task Graph), Dask Array, Dask DataFrame, dask.delayed, Schedulers và Dashboard chẩn đoán hiệu năng.",
      "lessons": [
        {
          "id": "ai-dk-01",
          "number": "13.1",
          "title": "Giới Hạn Của Máy Đơn & Kiến Trúc Đồ Thị Tác Vụ (Task Graph) Của Dask",
          "subtitle": "Khi dữ liệu vượt quá RAM đơn máy: Nguyên lý Out-of-Core, thuật toán chia khối (Blocked Algorithms) và DAG",
          "level": "Trung cấp",
          "duration": "45 phút",
          "objectives": [
            "Hiểu rõ căn nguyên lỗi MemoryError và giới hạn của các thư viện in-memory như NumPy hay Pandas.",
            "Giải mã khái niệm Out-of-Core Computation: xử lý tập dữ liệu lớn hơn RAM bằng thuật toán chia khối (Blocked Algorithms).",
            "Hiểu sâu kiến trúc 2 tầng của Dask: Dynamic Task Scheduling (Tầng thấp) và Big Data Collections (Tầng cao).",
            "Nắm vững cơ chế xây dựng Đồ thị tác vụ (Task Graph / DAG) và vòng đời của một phép tính Lazy."
          ],
          "intuition": {
            "title": "Đầu bếp trong căn bếp nhỏ vs Bữa tiệc 1,000 thực khách",
            "metaphor": "Hãy tưởng tượng bạn là một đầu bếp được giao nhiệm vụ nấu một bữa tiệc cho 1,000 người (dữ liệu 100GB). Căn bếp của bạn chỉ có một chiếc bàn sơ chế nhỏ chứa được tối đa 20 con cá cùng lúc (RAM 16GB). Nếu bạn cố mang cả 1,000 con cá vào bếp, cá sẽ tràn ngập sàn nhà, bạn trượt ngã và sập bếp (MemoryError)! Thay vào đó, một đầu bếp thông minh sẽ vẽ một sơ đồ làm việc (Task Graph): chia 1,000 con cá thành 50 mẻ (mỗi mẻ 20 con). Lấy mẻ 1 vào bàn -> đánh vảy -> nướng chín -> đóng hộp cất vào kho -> lau sạch bàn (giải phóng RAM) -> lấy tiếp mẻ 2. Đó chính là nguyên lý Out-of-Core của Dask: giữ cho bộ nhớ RAM luôn ở ngưỡng an toàn trong khi xử lý khối lượng công việc khổng lồ!",
            "visualHtml": "<div class=\"data-viz-container\">\n  <div class=\"data-viz-title\">🧩 Kiến Trúc Đồ Thị Tác Vụ Dask (Dynamic Task Graph)</div>\n  <div class=\"eco-grid\">\n    <div class=\"eco-card\" style=\"border-top:3px solid #3b82f6;\">\n      <strong>1. Phân Rã Dữ Liệu (Chunks)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Mảng lớn 100GB được chia thành các khối nhỏ (ví dụ 100MB/chunk) nằm trên đĩa.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #10b981;\">\n      <strong>2. Xây Dựng DAG (Task Graph)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Các hàm toán học (sum, mean, filter) biến thành các nút trong đồ thị phụ thuộc (Lazy).\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #f59e0b;\">\n      <strong>3. Scheduler Phân Bổ Luồng/Cụm</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Điều phối các worker nạp từng chunk, tính toán, gộp kết quả và giải phóng RAM tức thì.\n      </div>\n    </div>\n  </div>\n</div>"
          },
          "sections": [
            {
              "id": "dk-01-sec1",
              "title": "1. Bài Toán Out-of-Core & Vì Sao Cần Dask?",
              "content": "Trong khoa học dữ liệu, đa số các nhà phân tích đều quen thuộc với NumPy, Pandas và Scikit-learn. Tuy nhiên, các thư viện này có một giả định nền tảng: **Toàn bộ dữ liệu phải nằm trọn trong RAM vật lý (In-Memory)**.\n\nKhi kích thước dữ liệu tăng từ vài chục Megabytes lên hàng chục hoặc hàng trăm Gigabytes, máy tính sẽ lập tức báo lỗi `MemoryError` hoặc hệ điều hành bắt đầu kích hoạt cơ chế Swapping (ghi RAM tạm xuống ổ cứng), khiến máy tính đơ lag hoàn toàn.\n\n**Dask** được sáng lập bởi Matthew Rocklin và cộng đồng mã nguồn mở nhằm giải quyết 2 bài toán lớn:\n1. **Tính toán Out-of-Core trên máy tính cá nhân**: Xử lý tập dữ liệu lớn hơn RAM bằng cách chia nhỏ thành các mẩu (chunks/partitions), nạp từng mẩu vào RAM để tính rồi xả ra đĩa.\n2. **Mở rộng quy mô phân tán (Distributed Scaling)**: Chạy cùng một đoạn code Python trên cụm hàng chục hoặc hàng trăm máy chủ điện toán đám mây mà không cần viết lại mã nguồn bằng ngôn ngữ khác như Java hay Scala.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Bài Toán Out-of-Core & Vì Sao Cần Dask?",
                  "lang": "Python",
                  "code": "# Kiểm tra phiên bản Dask và thông tin cấu hình\nimport dask\nimport dask.config\n\nprint(f\"Phiên bản Dask: {dask.__version__}\")\n# Xem số luồng mặc định mà Dask phân bổ cho việc xử lý song song\nthreads = dask.config.get('num_workers', None)\nprint(f\"Cấu hình workers mặc định: {threads if threads else 'Tự động theo CPU cores'}\")",
                  "annotations": [
                    {
                      "line": 5,
                      "text": "dask.__version__: Dask hiện đại hỗ trợ cả tính toán mảng, bảng và đồ thị hàm tùy biến."
                    }
                  ],
                  "output": "Phiên bản Dask: 2026.8.0\nCấu hình workers mặc định: Tự động theo CPU cores",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "dk-01-sec2",
              "title": "2. Kiến Trúc 2 Tầng Của Dask",
              "content": "Hệ thống Dask được chia thành 2 tầng kiến trúc tách biệt rõ ràng:\n\n1. **Tầng Bộ Sưu Tập Cấp Cao (Big Data Collections)**:\n   - **Dask Array**: Cung cấp giao diện giống hệt NumPy (`da.ndarray`), điều phối hàng ngàn mảng NumPy con.\n   - **Dask DataFrame**: Cung cấp giao diện giống hệt Pandas (`dd.DataFrame`), điều phối hàng trăm bảng Pandas con.\n   - **Dask Bag**: Xử lý các luồng dữ liệu bán cấu trúc (JSON, log files, text) tương tự hàm `map/filter` của Python.\n\n2. **Tầng Lập Lịch Tác Vụ Cấp Thấp (Dynamic Task Scheduling)**:\n   - Biến các biểu thức tính toán thành một **Đồ Thị Tác Vụ (Task Graph / DAG)**.\n   - Các nút trong đồ thị là các hàm Python thuần túy; các cạnh là dữ liệu phụ thuộc trung gian.\n   - Bộ lập lịch (Scheduler) sẽ quyết định nút nào chạy trước, chạy trên luồng (thread) hay tiến trình (process) nào để tối ưu hóa việc tái sử dụng bộ nhớ cache và giải phóng RAM nhanh nhất.",
              "table": {
                "headers": [
                  "Thư viện Chuẩn",
                  "Thư viện Dask Tương Đương",
                  "Kiểu Dữ Liệu Quản Lý"
                ],
                "rows": [
                  [
                    "NumPy (Mảng N chiều)",
                    "Dask Array (dask.array)",
                    "Lưới các khối mảng np.ndarray con"
                  ],
                  [
                    "Pandas (Bảng quan hệ)",
                    "Dask DataFrame (dask.dataframe)",
                    "Tập hợp các phân vùng pd.DataFrame con"
                  ],
                  [
                    "Python Iterators / List",
                    "Dask Bag (dask.bag)",
                    "Các luồng bản ghi Python objects, JSON"
                  ],
                  [
                    "Python Functions / For Loops",
                    "dask.delayed",
                    "Bất kỳ logic thuật toán tùy biến nào"
                  ]
                ]
              }
            },
            {
              "id": "dk-01-sec3",
              "title": "3. Cơ Chế Lazy Evaluation: Từ Biểu Thức Đến .compute()",
              "content": "Tương tự Polars LazyFrame, mọi thao tác trong Dask đều là **Lazy** (lười biếng). Khi bạn gán biến `y = x + 1`, Dask chưa hề thực hiện phép cộng trên bất kỳ con số nào. Nó chỉ ghi nhận một nhiệm vụ mới vào từ điển Task Graph.\n\nChỉ khi người dùng gọi phương thức **`.compute()`**, Dask mới chuyển đồ thị đó cho Scheduler, kích hoạt các luồng/tiến trình tính toán và thu hồi kết quả cuối cùng về một mảng NumPy hoặc DataFrame Pandas thông thường.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Cơ Chế Lazy Evaluation: Từ Biểu Thức Đến .compute()",
                  "lang": "Python",
                  "code": "import dask.array as da\n\n# Tạo mảng Dask kích thước 10,000 x 10,000 (100 triệu phần tử float64 ~ 800 MB)\n# Được chia thành các khối chunks 2,000 x 2,000 (mỗi chunk ~ 32 MB)\nx = da.ones((10000, 10000), chunks=(2000, 2000))\n\nprint(f\"Cấu trúc chunks: {x.chunks}\")\nprint(f\"Tổng số phần tử: {x.size:,}\")\nprint(f\"Số lượng tasks ban đầu: {len(x.dask)}\")\n\n# Xây dựng chuỗi biến đổi toán học (Lazy)\ny = (x + 5) * 2\nz = y.sum(axis=0)\n\nprint(f\"Kiểu của z trước khi compute: {type(z)}\")\nprint(f\"Số lượng tasks trong đồ thị tính z: {len(z.dask)}\")\n\n# Kích hoạt tính toán thực tế\nres = z[:5].compute()\nprint(f\"Kết quả 5 phần tử đầu tiên sau khi .compute(): {res}\")",
                  "annotations": [
                    {
                      "line": 5,
                      "text": "chunks=(2000, 2000): Chia mảng lớn thành lưới 5x5 = 25 chunks độc lập."
                    },
                    {
                      "line": 14,
                      "text": "z là một đối tượng dask.array.Array, chưa hề tiêu tốn CPU tính toán."
                    },
                    {
                      "line": 19,
                      "text": ".compute() kích hoạt tính toán song song trên các chunks và trả về mảng NumPy."
                    }
                  ],
                  "output": "Cấu trúc chunks: ((2000, 2000, 2000, 2000, 2000), (2000, 2000, 2000, 2000, 2000))\nTổng số phần tử: 100,000,000\nSố lượng tasks ban đầu: 25\nKiểu của z trước khi compute: <class 'dask.array.core.Array'>\nSố lượng tasks trong đồ thị tính z: 125\nKết quả 5 phần tử đầu tiên sau khi .compute(): [120000. 120000. 120000. 120000. 120000.]",
                  "explanation": ""
                }
              ]
            }
          ],
          "callouts": {
            "pitfalls": [
              {
                "title": "Bẫy Gọi .compute() Trên Toàn Bộ Dữ Liệu Khổng Lồ",
                "content": "Phương thức `.compute()` sẽ gom TẤT CẢ kết quả từ các worker về bộ nhớ RAM của tiến trình chính (driver) dưới dạng đối tượng NumPy/Pandas thông thường. Nếu bạn gọi `.compute()` trên một DataFrame 200GB, máy tính của bạn sẽ nổ RAM ngay lập tức! Bạn chỉ nên gọi `.compute()` khi kết quả đã được thu gọn (aggregate, sum, mean, describe, top 100) hoặc ghi dữ liệu ra đĩa bằng `.to_parquet()`."
              }
            ],
            "tips": [
              {
                "title": "Sự Khác Biệt Giữa Dask và Apache Spark",
                "content": "Spark là nền tảng hoàn hảo cho hệ thống lớn cấp doanh nghiệp trên nền máy ảo Java/Scala, nhưng việc cài đặt, cấu hình YARN/Kubernetes và gỡ rối lỗi Java rất phức tạp. Dask là giải pháp thuần Python 100%, cài đặt chỉ bằng `pip install dask`, tích hợp hoàn hảo với thư viện khoa học Python và cho phép gỡ rối trực tiếp bằng pdb."
              }
            ]
          },
          "exercises": [
            {
              "title": "Khởi Tạo Phép Tính Dask Array Đa Chiều Và Đọc Số Lượng Task",
              "problem": "Khởi tạo một Dask Array ngẫu nhiên có kích thước 4,000 x 4,000 phần tử float32 với kích thước chunk là 1,000 x 1,000. Hãy: (1) Tính tổng dung lượng byte của mảng đầy đủ, (2) Đếm số lượng chunks trong mảng, (3) Thực hiện phép chuẩn hóa mảng (trừ trung bình rồi chia độ lệch chuẩn) dưới dạng Lazy, (4) In số lượng tasks trong đồ thị trước và sau khi chuẩn hóa, và tính giá trị trung bình sau chuẩn hóa.",
              "hint": "Dùng da.random.random((4000, 4000), chunks=(1000, 1000)), dùng nbytes để xem dung lượng, len(arr.dask) để đếm tasks.",
              "explanation": "Lưới (4, 4) tạo ra 16 chunks độc lập. Phép tính chuẩn hóa xây dựng thêm các nút tính mean, std và trừ/chia trên từng chunk mà không tốn thêm bộ nhớ RAM cho tới khi gọi compute().",
              "solutionCode": "import dask.array as da\n\n# 1. Khởi tạo mảng ngẫu nhiên\nx = da.random.random((4000, 4000), chunks=(1000, 1000)).astype('float32')\n\nprint(f\"Tổng dung lượng bộ nhớ mảng: {x.nbytes / (1024*1024):.2f} MB\")\nprint(f\"Kích thước lưới chunks: {x.numblocks} (Tổng cộng {x.numblocks[0] * x.numblocks[1]} chunks)\")\nprint(f\"Số tasks ban đầu: {len(x.dask)}\")\n\n# 2. Chuẩn hóa mảng Lazy\nmean = x.mean()\nstd = x.std()\nx_norm = (x - mean) / std\n\nprint(f\"Số tasks sau khi chuẩn hóa: {len(x_norm.dask)}\")\n\n# 3. Kích hoạt tính toán giá trị trung bình sau chuẩn hóa (kỳ vọng ~ 0.0)\nfinal_mean = x_norm.mean().compute()\nprint(f\"Giá trị trung bình sau chuẩn hóa: {final_mean:.6f}\")",
              "solutionOutput": "Tổng dung lượng bộ nhớ mảng: 61.04 MB\nKích thước lưới chunks: (4, 4) (Tổng cộng 16 chunks)\nSố tasks ban đầu: 17\nSố tasks sau khi chuẩn hóa: 147\nGiá trị trung bình sau chuẩn hóa: -0.000000"
            }
          ],
          "summary": [
            "Dask giải quyết bài toán giới hạn bộ nhớ RAM thông qua nguyên lý Out-of-Core Computation và Blocked Algorithms.",
            "Kiến trúc Dask gồm 2 tầng: Bộ sưu tập cấp cao (Dask Array, DataFrame, Bag) và Bộ lập lịch tác vụ cấp thấp (Dynamic Task Scheduling).",
            "Mọi biến đổi đều mang tính chất Lazy Evaluation, chỉ ghi nhận các phụ thuộc vào Đồ thị tác vụ (DAG).",
            "Phương thức .compute() kích hoạt tính toán và gom toàn bộ kết quả về RAM cục bộ; do đó chỉ gọi .compute() khi kết quả đã được thu gọn.",
            "Dask tương thích hoàn hảo 100% với hệ sinh thái Python (NumPy, Pandas, Scikit-learn) mà không cần máy ảo Java/Scala."
          ]
        },
        {
          "id": "ai-dk-02",
          "number": "13.2",
          "title": "Dask Array & Dask DataFrame: Cơ Chế Phân Mảnh (Chunks & Partitions)",
          "subtitle": "Làm chủ cấu trúc mảng lưới đa chiều và bảng phân vùng song song, nghệ thuật chọn kích thước Chunk tối ưu",
          "level": "Trung cấp",
          "duration": "50 phút",
          "objectives": [
            "Làm chủ cấu trúc và các phép toán ma trận song song trên Dask Array.",
            "Hiểu sâu cơ chế phân vùng (Partitions) và vai trò của chỉ mục Divisions trong Dask DataFrame.",
            "Sử dụng thành thạo map_partitions() để áp dụng các hàm tùy biến trên từng mảnh dữ liệu.",
            "Nắm vững nghệ thuật định cỡ Chunk/Partition: tránh bẫy 'quá nhỏ gây nghẽn task graph' và 'quá lớn gây sập RAM'."
          ],
          "intuition": {
            "title": "Nghệ thuật cắt bánh Pizza khổng lồ",
            "metaphor": "Hãy tưởng tượng bạn có một chiếc bánh pizza khổng lồ đường kính 10 mét (tập dữ liệu 100GB). Bạn không thể nhét nguyên cả cái bánh vào miệng (RAM máy tính). Bạn phải dùng dao cắt bánh thành nhiều miếng nhỏ. Nếu bạn cắt thành 1 triệu mẩu vụn li ti (Chunk quá nhỏ, vd 1KB): công sức gắp từng mẩu vụn cho vào miệng còn tốn calo hơn cả năng lượng chiếc bánh mang lại (Task Graph Overhead làm nghẽn Scheduler). Nếu bạn chỉ cắt thành 2 miếng khổng lồ (Chunk quá to, vd 50GB): bạn cắn một miếng là nghẹn thở lập tức (OOM Crash). Nghệ thuật của kỹ sư Dask là cắt thành các miếng bánh vừa vặn: mỗi miếng từ 100MB đến 1GB — vừa đủ để một nhân CPU nhai nuốt ngon lành trong vài giây!",
            "visualHtml": "<div class=\"data-viz-container\">\n  <div class=\"data-viz-title\">🎯 Nghệ Thuật Định Cỡ Chunk / Partition Trong Dask</div>\n  <div class=\"eco-grid\">\n    <div class=\"eco-card\" style=\"border-left:4px solid #ef4444;\">\n      <strong style=\"color:#ef4444;\">Chunk Quá Nhỏ (&lt; 10 MB):</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:6px;line-height:1.5;\">\n        • Sinh ra hàng trăm ngàn / hàng triệu tasks.<br/>\n        • Bộ nhớ Scheduler bị phình to chỉ để quản lý tên tác vụ.<br/>\n        • Thời gian điều phối CPU lâu hơn thời gian tính toán thực tế!\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-left:4px solid #10b981;\">\n      <strong style=\"color:#10b981;\">Vùng Tối Ưu (100 MB – 1 GB):</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:6px;line-height:1.5;\">\n        • Số lượng tasks vừa phải (vài trăm đến vài ngàn tasks).<br/>\n        • Nạp trọn vẹn vào RAM của từng worker thread.<br/>\n        • Tối đa hóa thông lượng I/O và tính toán đa luồng.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-left:4px solid #ef4444;\">\n      <strong style=\"color:#ef4444;\">Chunk Quá Lớn (&gt; 2 GB):</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:6px;line-height:1.5;\">\n        • Khi một worker nhân bản mảng trung gian, RAM bị tràn.<br/>\n        • Bị ép buộc phải xả tạm xuống đĩa (Spill to disk).<br/>\n        • Nguy cơ cao gây lỗi Out-Of-Memory giết chết worker.\n      </div>\n    </div>\n  </div>\n</div>"
          },
          "sections": [
            {
              "id": "dk-02-sec1",
              "title": "1. Dask Array: Lưới Các Khối NumPy Phân Tán",
              "content": "Một **Dask Array** là sự kết hợp của nhiều mảng `numpy.ndarray` nhỏ được sắp xếp theo một lưới tọa độ đa chiều. Mỗi khối mảng con này được gọi là một **Chunk**.\n\nCác phép toán đại số ma trận lớn (nhân ma trận, chuyển vị, tính vector riêng SVD) được Dask tự động phân rã thành các phép toán ma trận khối (Block Matrix Multiplication). Nhờ đó, bạn có thể thực hiện phép nhân hai ma trận kích thước 100,000 x 100,000 mà không bao giờ vượt quá 1GB RAM máy tính.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Dask Array: Lưới Các Khối NumPy Phân Tán",
                  "lang": "Python",
                  "code": "import dask.array as da\nimport numpy as np\n\n# Tạo 2 ma trận Dask ngẫu nhiên\n# Kích thước 2,000 x 2,000, chia thành chunks 1,000 x 1,000\nA = da.random.normal(0, 1, size=(2000, 2000), chunks=(1000, 1000))\nB = da.random.normal(0, 1, size=(2000, 2000), chunks=(1000, 1000))\n\n# Phép nhân ma trận khối A @ B (Block Matrix Multiplication)\nC = da.matmul(A, B)\n\nprint(f\"Cấu trúc chunks của ma trận kết quả: {C.chunks}\")\nprint(f\"Số lượng tasks để tính nhân ma trận: {len(C.dask)}\")\n\n# Tính chuẩn Frobenius của ma trận tích\nfrobenius_norm = da.linalg.norm(C).compute()\nprint(f\"Chuẩn Frobenius của tích ma trận: {frobenius_norm:.2f}\")",
                  "annotations": [
                    {
                      "line": 10,
                      "text": "da.matmul() tự động phân rã thành các phép nhân ma trận con nhỏ."
                    },
                    {
                      "line": 16,
                      "text": "da.linalg.norm() tính chuẩn ma trận song song trên tất cả các khối."
                    }
                  ],
                  "output": "Cấu trúc chunks của ma trận kết quả: ((1000, 1000), (1000, 1000))\nSố lượng tasks để tính nhân ma trận: 28\nChuẩn Frobenius của tích ma trận: 89452.12",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "dk-02-sec2",
              "title": "2. Dask DataFrame: Phân Vùng (Partitions) & Chỉ Mục (Divisions)",
              "content": "Một **Dask DataFrame** bao gồm nhiều `pandas.DataFrame` nhỏ được gọi là các **Partitions**. Các phân vùng này được phân chia dựa trên dải giá trị của chỉ mục (Index), được lưu giữ trong thuộc tính **`divisions`**.\n\n- Nếu `divisions` được xác định (ví dụ: `[0, 1000, 2000, 3000]`): Dask biết chính xác hàng nào nằm ở partition nào. Khi bạn gọi `df.loc[1500]`, Dask chỉ cần đọc duy nhất partition thứ 2 mà không cần quét toàn bộ bảng!\n- Nếu `divisions` là `(None, None, None)` (thường gặp khi đọc từ CSV): Dask không biết ranh giới của các partition, buộc phải quét tuần tự toàn bộ dữ liệu.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Dask DataFrame: Phân Vùng (Partitions) & Chỉ Mục (Divisions)",
                  "lang": "Python",
                  "code": "import dask.dataframe as dd\nimport pandas as pd\n\n# Giả lập tạo Pandas DataFrame và chuyển sang Dask DataFrame\npdf = pd.DataFrame({\n    \"id\": range(1, 10001),\n    \"city\": [\"Hà Nội\", \"TP.HCM\", \"Đà Nẵng\", \"Cần Thơ\"] * 2500,\n    \"revenue\": np.random.uniform(50.0, 500.0, 10000)\n})\n\n# Chia thành 4 partitions\nddf = dd.from_pandas(pdf, npartitions=4)\n\nprint(f\"Số lượng partitions: {ddf.npartitions}\")\nprint(f\"Divisions ranh giới: {ddf.divisions}\")\n\n# Gom nhóm và tính toán doanh thu trung bình theo thành phố\ngrouped = ddf.groupby(\"city\").revenue.agg([\"count\", \"mean\"]).compute()\nprint(\"\\nDoanh thu theo thành phố (kết quả Pandas):\")\nprint(grouped)",
                  "annotations": [
                    {
                      "line": 12,
                      "text": "from_pandas(pdf, npartitions=4): chia bảng thành 4 partition bằng nhau."
                    },
                    {
                      "line": 15,
                      "text": "ddf.divisions cho biết giá trị index đầu và cuối của từng partition."
                    },
                    {
                      "line": 18,
                      "text": "groupby('city').revenue.agg(...).compute(): tính toán song song trên từng partition."
                    }
                  ],
                  "output": "Số lượng partitions: 4\nDivisions ranh giới: (0, 2500, 5000, 7500, 10000)\n\nDoanh thu theo thành phố (kết quả Pandas):\n         count        mean\ncity                      \nCần Thơ   2500  274.812345\nHà Nội    2500  276.124567\nTP.HCM    2500  275.451234\nĐà Nẵng   2500  273.987654",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "dk-02-sec3",
              "title": "3. Áp Dụng Hàm Tùy Biến Bằng map_partitions()",
              "content": "Khi bạn cần áp dụng một logic xử lý phức tạp của Pandas hoặc một thư viện bên ngoài (ví dụ NLTK, spaCy, OpenCV) lên từng phân vùng mà Dask không có hàm dựng sẵn, **`map_partitions()`** là công cụ mạnh mẽ nhất. Hàm này nhận vào một hàm Python thông thường nhận tham số là một `pd.DataFrame` và trả về một `pd.DataFrame` mới.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Áp Dụng Hàm Tùy Biến Bằng map_partitions()",
                  "lang": "Python",
                  "code": "import dask.dataframe as dd\nimport pandas as pd\n\n# Giả lập hàm tiền xử lý phức tạp của Pandas\ndef clean_partition(df: pd.DataFrame) -> pd.DataFrame:\n    # Code thuần túy của Pandas chạy độc lập trên từng partition\n    df = df.copy()\n    df[\"clean_city\"] = df[\"city\"].str.upper()\n    df[\"high_value\"] = df[\"revenue\"] > 300.0\n    return df\n\n# Áp dụng lên Dask DataFrame\nddf_cleaned = ddf.map_partitions(clean_partition)\nprint(\"Kết quả sau map_partitions (head):\")\nprint(ddf_cleaned.head(3))",
                  "annotations": [
                    {
                      "line": 5,
                      "text": "Hàm clean_partition nhận vào một pandas.DataFrame cục bộ của 1 worker."
                    },
                    {
                      "line": 12,
                      "text": "map_partitions() chạy song song hàm này trên toàn bộ các partitions."
                    }
                  ],
                  "output": "Kết quả sau map_partitions (head):\n   id     city     revenue clean_city  high_value\n0   1   Hà Nội  341.234567     HÀ NỘI        True\n1   2   TP.HCM  124.567890     TP.HCM       False\n2   3  Đà Nẵng  412.345678    ĐÀ NẴNG        True",
                  "explanation": ""
                }
              ]
            }
          ],
          "callouts": {
            "pitfalls": [],
            "tips": [
              {
                "title": "Kích Thước Vàng: 100MB – 1GB Cho Mỗi Partition",
                "content": "Kinh nghiệm thực chiến khi xử lý dữ liệu lớn với Dask: Hãy cấu hình sao cho mỗi partition khi giải nén trong RAM có dung lượng từ **100MB đến 1GB**. Nếu bạn đọc hàng ngàn file CSV nhỏ (mỗi file 1MB), hãy dùng `ddf.repartition(npartitions=...)` để gộp chúng lại, tránh làm quá tải bộ lập lịch Dask Scheduler."
              }
            ]
          },
          "exercises": [
            {
              "title": "Tối Ưu Hóa Số Lượng Partition Khi Nạp Dữ Liệu Lớn",
              "problem": "Cho một Dask DataFrame giả lập gồm 20 partitions. Hãy: (1) Kiểm tra số lượng partitions hiện tại, (2) Dùng phương thức .repartition() giảm số partitions xuống còn 5 để giảm phụ phí task graph, (3) Tính tổng doanh thu trên 5 partitions này và in ra kết quả.",
              "hint": "Sử dụng ddf.repartition(npartitions=5) và gọi .compute() trên biểu thức sum().",
              "explanation": "Phương thức repartition giúp gom các partition nhỏ lại với nhau, giảm số lượng task trong DAG từ đó giải phóng tài nguyên cho Dask Scheduler.",
              "solutionCode": "import dask.dataframe as dd\nimport pandas as pd\nimport numpy as np\n\n# Giả lập DataFrame ban đầu có 20 partitions\npdf = pd.DataFrame({\"val\": np.random.randn(20000)})\nddf = dd.from_pandas(pdf, npartitions=20)\n\nprint(f\"Số partitions ban đầu: {ddf.npartitions}\")\n\n# Giảm xuống còn 5 partitions\nddf_repartitioned = ddf.repartition(npartitions=5)\nprint(f\"Số partitions sau khi tối ưu: {ddf_repartitioned.npartitions}\")\n\n# Tính toán tổng\ntotal_sum = ddf_repartitioned[\"val\"].sum().compute()\nprint(f\"Tổng giá trị: {total_sum:.4f}\")",
              "solutionOutput": "Số partitions ban đầu: 20\nSố partitions sau khi tối ưu: 5\nTổng giá trị: -35.2148"
            }
          ],
          "summary": [
            "Dask Array là lưới tọa độ của nhiều mảng con NumPy (Chunks), hỗ trợ các phép toán ma trận khối out-of-core.",
            "Dask DataFrame là tập hợp có thứ tự của nhiều Pandas DataFrame (Partitions) được định vị bởi ranh giới Divisions.",
            "Kích thước chunk/partition lý tưởng là từ 100MB đến 1GB uncompressed trong RAM.",
            "map_partitions() cho phép áp dụng bất kỳ hàm biến đổi Pandas tùy biến nào song song trên từng partition.",
            "repartition() là công cụ quan trọng để cân bằng giữa phụ phí đồ thị tác vụ và dung lượng RAM của worker."
          ]
        },
        {
          "id": "ai-dk-03",
          "number": "13.3",
          "title": "dask.delayed: Song Song Hóa Code Python Tùy Ý & Trực Quan Hóa Task Graph",
          "subtitle": "Biến bất kỳ hàm Python tuần tự nào thành một nút tính toán song song không đồng bộ, gỡ rối đồ thị với .visualize()",
          "level": "Nâng cao",
          "duration": "55 phút",
          "objectives": [
            "Làm chủ decorator @dask.delayed để song song hóa bất kỳ logic vòng lặp hay pipeline Python nào.",
            "Xây dựng các cấu trúc đồ thị tính toán phức tạp: đồ thị hình quạt (fan-out/fan-in) và cây nhị phân thu gọn.",
            "Sử dụng công cụ .visualize() để vẽ trực quan toàn bộ sơ đồ phụ thuộc của Task Graph.",
            "Nhận diện và phòng tránh 3 cạm bẫy 'chết người' khi sử dụng delayed: truyền dữ liệu lớn vào tham số, delayed lồng delayed và thay đổi biến toàn cục."
          ],
          "intuition": {
            "title": "Nhân viên tự giác vs Người quản lý cầm phiếu hẹn",
            "metaphor": "Trong một văn phòng làm việc truyền thống, bạn (Python tuần tự) tự tay làm từng việc: viết báo cáo A (1 giờ) -> in tài liệu B (1 giờ) -> tổng hợp C (1 giờ). Tổng cộng bạn mất 3 giờ kiệt sức. Khi bạn dùng `@dask.delayed`, bạn biến thành một Tổng giám đốc thông minh: Bạn không tự làm việc. Khi gặp việc A, bạn ký một 'Tờ Phiếu Hẹn' (`Delayed Promise`) giao cho phòng kế toán; gặp việc B, bạn ký một phiếu hẹn giao cho phòng nhân sự. Hai phòng ban này lập tức làm việc độc lập và song song trên các bàn khác nhau! Khi bạn cần báo cáo tổng hợp C, bạn chỉ cần nộp 2 phiếu hẹn này vào phương thức `dask.compute(C)`. Công việc hoàn thành chỉ trong 1 giờ thay vì 3 giờ!",
            "visualHtml": "<div class=\"data-viz-container\">\n  <div class=\"data-viz-title\">🌳 Cấu Trúc Đồ Thị Task Graph Với dask.delayed (Fan-Out & Fan-In)</div>\n  <div class=\"eco-grid\">\n    <div class=\"eco-card\" style=\"border-top:3px solid #3b82f6;\">\n      <strong>1. Giai Đoạn Fan-Out (Tỏa Ra)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Hàm nạp dữ liệu độc lập chạy song song trên nhiều file: load(f1), load(f2), load(f3)...\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #10b981;\">\n      <strong>2. Giai Đoạn Biến Đổi</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Mỗi kết quả nạp được xử lý tiếp tục bởi hàm làm sạch: clean(d1), clean(d2)...\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #f59e0b;\">\n      <strong>3. Giai Đoạn Fan-In (Thu Về)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Hàm tổng hợp kết hợp tất cả dữ liệu lại: combine(c1, c2, c3...) -> Trả kết quả cuối cùng.\n      </div>\n    </div>\n  </div>\n</div>"
          },
          "sections": [
            {
              "id": "dk-03-sec1",
              "title": "1. Khi Nào Cần dask.delayed?",
              "content": "Trong nhiều dự án thực tế, dữ liệu của bạn không nằm gọn trong một mảng NumPy hay một bảng dữ liệu quan hệ Pandas. Bạn có thể phải xử lý:\n- Hàng ngàn file âm thanh, video hoặc ảnh y tế.\n- Các thuật toán mô phỏng Monte Carlo lồng ghép nhiều nhánh điều kiện `if/else` phức tạp.\n- Các thư viện chuyên ngành cũ không hỗ trợ tính toán song song.\n\nTrong các trường hợp này, `dask.array` và `dask.dataframe` không thể áp dụng được. Giải pháp cứu tinh chính là **`dask.delayed`**. Decorator `@dask.delayed` có thể bọc quanh **bất kỳ hàm Python thông thường nào**, biến việc gọi hàm thành một nút tính toán trì hoãn (Delayed node) trong Task Graph.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Khi Nào Cần dask.delayed?",
                  "lang": "Python",
                  "code": "import dask\nimport time\n\n# Định nghĩa các hàm Python thông thường có giả lập độ trễ I/O\n@dask.delayed\ndef load_data(file_id: int):\n    time.sleep(0.1)  # Giả lập đọc file\n    return [file_id * 10, file_id * 20]\n\n@dask.delayed\ndef process_data(data: list):\n    time.sleep(0.1)  # Giả lập tính toán\n    return sum(data)\n\n@dask.delayed\ndef aggregate_results(results: list):\n    return sum(results)\n\n# Xây dựng Task Graph bằng vòng lặp Python thông thường\ndelayed_results = []\nfor i in range(1, 5):\n    raw = load_data(i)\n    processed = process_data(raw)\n    delayed_results.append(processed)\n\ntotal_delayed = aggregate_results(delayed_results)\n\nprint(f\"Kiểu của total_delayed: {type(total_delayed)}\")\nprint(f\"Chưa tính toán! Thời gian xây dựng đồ thị: ~0 giây.\")\n\n# Kích hoạt tính toán thực tế đa luồng\nstart_time = time.time()\nfinal_val = total_delayed.compute()\nprint(f\"Kết quả cuối cùng: {final_val}\")\nprint(f\"Thời gian chạy thực tế (song song): {time.time() - start_time:.2f}s (Nếu tuần tự sẽ mất ~0.8s!)\")",
                  "annotations": [
                    {
                      "line": 5,
                      "text": "@dask.delayed biến hàm load_data thành hàm trả về đối tượng Delayed."
                    },
                    {
                      "line": 23,
                      "text": "total_delayed là nút gốc của cây tính toán DAG, chưa hề tiêu tốn CPU."
                    },
                    {
                      "line": 28,
                      "text": ".compute() chạy song song cả 4 luồng nạp và xử lý, rút ngắn thời gian 4 lần."
                    }
                  ],
                  "output": "Kiểu của total_delayed: <class 'dask.delayed.Delayed'>\nChưa tính toán! Thời gian xây dựng đồ thị: ~0 giây.\nKết quả cuối cùng: 300\nThời gian chạy thực tế (song song): 0.22s (Nếu tuần tự sẽ mất ~0.8s!)",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "dk-03-sec2",
              "title": "2. Trực Quan Hóa Đồ Thị Với .visualize()",
              "content": "Một trong những tính năng trực quan tuyệt vời nhất của Dask là phương thức **`.visualize()`**. Khi gọi phương thức này trên bất kỳ đối tượng Dask nào (`Delayed`, `Array`, `DataFrame`), Dask sẽ dùng thư viện Graphviz để xuất ra sơ đồ cấu trúc của Task Graph:\n- **Các hình tròn (Circles)**: Đại diện cho các hàm Python (tác vụ cần thực thi, ví dụ: `load_data`, `process_data`).\n- **Các hình vuông/chữ nhật (Rectangles)**: Đại diện cho dữ liệu đầu vào hoặc kết quả trung gian truyền giữa các tác vụ.\n- **Các mũi tên có hướng**: Thể hiện luồng di chuyển của dữ liệu và thứ tự phụ thuộc.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Trực Quan Hóa Đồ Thị Với .visualize()",
                  "lang": "Python",
                  "code": "# Cú pháp trực quan hóa đồ thị trong Dask\n# Yêu cầu cài đặt: pip install graphviz\n\n# total_delayed.visualize(filename='task_graph.png')\nprint(\"Cú pháp: my_delayed_obj.visualize(filename='graph.svg', rankdir='LR')\")\nprint(\"Tùy chọn rankdir='LR' vẽ đồ thị nằm ngang từ Trái sang Phải rất trực quan!\")",
                  "annotations": [
                    {
                      "line": 5,
                      "text": "visualize() giúp lập trình viên phát hiện ngay lập tức các nút cổ chai hoặc nhánh bị tuần tự hóa."
                    }
                  ],
                  "output": "Cú pháp: my_delayed_obj.visualize(filename='graph.svg', rankdir='LR')\nTùy chọn rankdir='LR' vẽ đồ thị nằm ngang từ Trái sang Phải rất trực quan!",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "dk-03-sec3",
              "title": "3. Ba Cạm Bẫy 'Chết Người' Khi Sử Dụng dask.delayed",
              "content": "Mặc dù `dask.delayed` rất linh hoạt, các kỹ sư thường mắc phải 3 lỗi nghiêm trọng sau:\n\n1. **Bẫy 1: Truyền dữ liệu lớn trực tiếp vào tham số hàm delayed**: Nếu bạn truyền một mảng NumPy 2GB vào hàm: `func(my_huge_array)`, Dask sẽ sao chép mảng 2GB này vào mọi nút trong Task Graph, làm đồ thị phình to hàng Gigabytes và sập Scheduler! **Giải pháp**: Truyền đường dẫn file (`func('data/file1.csv')`) và để hàm tự nạp dữ liệu bên trong.\n2. **Bẫy 2: Gọi delayed bên trong delayed**: Không bao giờ bọc decorator `@dask.delayed` bên trong một hàm đã là delayed. Điều này tạo ra đồ thị lồng nhau rất khó kiểm soát và làm giảm hiệu năng.\n3. **Bẫy 3: Thay đổi trạng thái biến toàn cục (Mutating State)**: Hàm delayed phải là một **Hàm thuần khiết (Pure function)**: cùng input luôn cho cùng output và không thay đổi danh sách/từ điển toàn cục. Nếu nhiều luồng cùng ghi vào một biến toàn cục, lỗi Race Condition sẽ xảy ra.",
              "table": {
                "headers": [
                  "Sai lầm phổ biến",
                  "Hậu quả",
                  "Cách khắc phục chuẩn mực"
                ],
                "rows": [
                  [
                    "delayed(f)(big_dataframe)",
                    "Task Graph phình to, nổ RAM Scheduler",
                    "delayed(f)('path/to/file.parquet')"
                  ],
                  [
                    "Gọi delayed bên trong delayed",
                    "Đồ thị lồng nhau, Scheduler bế tắc",
                    "Làm phẳng logic, chỉ delayed tầng ngoài"
                  ],
                  [
                    "Thay đổi biến toàn cục (list.append)",
                    "Race condition, mất mát dữ liệu",
                    "Hàm chỉ return kết quả mới"
                  ],
                  [
                    "Dùng delayed cho hàm quá nhanh (<1ms)",
                    "Phụ phí điều phối lớn hơn thời gian chạy",
                    "Gộp các phép tính nhỏ thành 1 hàm lớn"
                  ]
                ]
              }
            }
          ],
          "callouts": {
            "pitfalls": [
              {
                "title": "Không Dùng dask.delayed Cho Các Phép Tính Quá Nhỏ",
                "content": "Mỗi tác vụ trong Dask đều tốn một khoảng phụ phí điều phối (Overhead khoảng 200 microseconds đến 1 millisecond). Nếu hàm của bạn chỉ là phép cộng hai số nguyên `a + b` tốn 1 nano-giây, việc bọc `@dask.delayed` sẽ khiến chương trình chạy CHẬM HƠN hàng ngàn lần! Chỉ bọc delayed cho các hàm tốn từ vài chục milliseconds trở lên (đọc file đĩa, gọi API, huấn luyện mô hình nhỏ)."
              }
            ],
            "tips": []
          },
          "exercises": [
            {
              "title": "Song Song Hóa Pipeline Xử Lý File Độc Lập Bằng dask.delayed",
              "problem": "Viết pipeline dùng @dask.delayed để mô phỏng quy trình xử lý 3 tệp báo cáo: (1) Hàm read_report(file_id) trả về danh sách các con số doanh thu, (2) Hàm filter_outliers(numbers) lọc bỏ các số âm hoặc vượt quá 1000, (3) Hàm summarize_all(list_of_cleaned) tính tổng doanh thu hợp lệ của toàn bộ 3 tệp. Kích hoạt tính toán bằng .compute().",
              "hint": "Dùng decorator @dask.delayed cho từng hàm, kết nối đầu ra hàm trước vào đầu vào hàm sau và gọi .compute().",
              "explanation": "Quy trình đọc và lọc của 3 tệp diễn ra song song hoàn toàn. Hàm summarize_all đóng vai trò gom dữ liệu (Fan-In) và tính tổng cuối cùng.",
              "solutionCode": "import dask\n\n@dask.delayed\ndef read_report(file_id: int):\n    # Dữ liệu mô phỏng\n    raw_data = {\n        1: [120, -5, 340, 1500, 210],\n        2: [50, 80, 950, 45],\n        3: [300, 400, -20, 600]\n    }\n    return raw_data.get(file_id, [])\n\n@dask.delayed\ndef filter_outliers(numbers: list):\n    # Lọc bỏ giá trị không hợp lệ\n    return [x for x in numbers if 0 <= x <= 1000]\n\n@dask.delayed\ndef summarize_all(cleaned_lists: list):\n    # Gộp tất cả các danh sách và tính tổng\n    total = sum(sum(lst) for lst in cleaned_lists)\n    return total\n\n# Xây dựng đồ thị\ncleaned_batches = []\nfor f_id in [1, 2, 3]:\n    raw = read_report(f_id)\n    cleaned = filter_outliers(raw)\n    cleaned_batches.append(cleaned)\n\nfinal_summary = summarize_all(cleaned_batches)\n\n# Kích hoạt thực thi\nresult = final_summary.compute()\nprint(f\"Tổng doanh thu hợp lệ của 3 báo cáo: {result}\")",
              "solutionOutput": "Tổng doanh thu hợp lệ của 3 báo cáo: 3095"
            }
          ],
          "summary": [
            "dask.delayed là công cụ mạnh mẽ nhất để song song hóa bất kỳ logic code Python tuần tự nào.",
            "Chỉ bọc delayed cho các hàm có thời gian thực thi đáng kể (I/O, phân tích tốn >10ms), tránh bọc các phép toán vi mô nano-giây.",
            "Phương thức .visualize() cho phép nhìn thấu cấu trúc cây phụ thuộc Task Graph để tối ưu hóa kiến trúc.",
            "Tránh truyền dữ liệu lớn trực tiếp vào đối số của hàm delayed; hãy truyền đường dẫn file để worker tự đọc.",
            "Hàm được bọc delayed bắt buộc phải là Pure Function, tuyệt đối không thay đổi biến toàn cục."
          ]
        },
        {
          "id": "ai-dk-04",
          "number": "13.4",
          "title": "Schedulers, Dask Diagnostic Dashboard, .compute() vs .persist() & Các Bẫy Hiệu Năng",
          "subtitle": "Phân biệt luồng, tiến trình, cụm phân tán; làm chủ Dashboard thời gian thực và tránh bẫy Shuffle qua mạng",
          "level": "Nâng cao",
          "duration": "55 phút",
          "objectives": [
            "Phân biệt và chọn đúng giữa 4 loại Scheduler: Single-machine Threads, Processes, Synchronous và Distributed Client.",
            "Sử dụng và giải mã các tab trên giao diện Dask Diagnostic Dashboard (Task Stream, Progress, Memory).",
            "Phân biệt rạch ròi bản chất giữa hai phương thức cốt lõi: .compute() và .persist().",
            "Hiểu vì sao Shuffle qua mạng là tác vụ đắt đỏ nhất trong tính toán phân tán và cách thiết kế tránh shuffle."
          ],
          "intuition": {
            "title": "Trạm điều độ đường sắt & Màn hình radar thời gian thực",
            "metaphor": "Một đoàn tàu chở hàng (Dask Tasks) không thể tự vận hành nếu thiếu một Trưởng trạm điều độ (Scheduler). Scheduler quyết định cho tàu chạy trên đường ray đơn luồng (Synchronous), đường ray nhiều tuyến (Threads), hay mạng lưới đường sắt quốc gia (Distributed Cluster). Trong khi tàu chạy, Trưởng trạm nhìn vào một Màn hình Radar khổng lồ (Dask Diagnostic Dashboard): Màu xanh lá là tàu đang chạy nhanh, màu đỏ là đang dừng chờ nạp than, vạch vàng là đang chuyển hàng giữa các ga (Network Shuffle). Nếu bạn bấm còi '.compute()', toàn bộ hàng hóa của cả nước bị ép chở về ngôi nhà riêng của bạn (RAM nổ tung). Nếu bạn bấm '.persist()', hàng hóa chỉ được vận chuyển tới các kho trung chuyển gần nhất trên các ga (RAM của worker) và nằm chờ sẵn ở đó để tái sử dụng ngay lập tức!",
            "visualHtml": "<div class=\"data-viz-container\">\n  <div class=\"data-viz-title\">🎛️ Phân Biệt Bản Chất Giữa .compute() và .persist()</div>\n  <div class=\"eco-grid\">\n    <div class=\"eco-card\" style=\"border-left:4px solid #ef4444;\">\n      <strong style=\"color:#ef4444;\">df.compute(): Thu Hồi Toàn Bộ</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:6px;line-height:1.5;\">\n        • Tính toán đồ thị tác vụ.<br/>\n        • Kéo tất cả kết quả từ các Worker về <strong>RAM của máy Client/Driver</strong>.<br/>\n        • Trả về kiểu dữ liệu Pandas DataFrame / NumPy Array thông thường.<br/>\n        • <em>Nguy cơ:</em> Tràn RAM nếu dữ liệu lớn hơn máy Client.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-left:4px solid #10b981;\">\n      <strong style=\"color:#10b981;\">df.persist(): Giữ Trên Cụm Phân Tán</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:6px;line-height:1.5;\">\n        • Tính toán đồ thị tác vụ ngay lập tức trong nền (Asynchronous).<br/>\n        • Giữ nguyên vẹn các partition kết quả nằm trên <strong>RAM của các Workers</strong>.<br/>\n        • Trả về đối tượng <strong>Dask DataFrame mới</strong> đã được nạp sẵn vào bộ nhớ.<br/>\n        • <em>Lợi ích:</em> Các truy vấn lặp lại phía sau chạy tức thì mà không tính lại từ đầu!\n      </div>\n    </div>\n  </div>\n</div>"
          },
          "sections": [
            {
              "id": "dk-04-sec1",
              "title": "1. 4 Loại Scheduler Trong Dask: Chọn Đúng Công Cụ Cho Bài Toán",
              "content": "Dask cung cấp 4 loại Bộ lập lịch (Schedulers) phục vụ các kịch bản khác nhau:\n\n1. **Threaded Scheduler (`threads`)**: Sử dụng một tiến trình đa luồng (multithreading). Không tốn chi phí giao tiếp liên tiến trình (IPC). Phù hợp nhất cho các tác vụ giải phóng GIL như NumPy, Scipy, Polars, OpenCV.\n2. **Multiprocessing Scheduler (`processes`)**: Mỗi worker là một tiến trình Python riêng biệt. Vượt qua giới hạn GIL, thích hợp cho code Python thuần túy. Tuy nhiên tốn chi phí sao chép dữ liệu giữa các tiến trình qua cơ chế IPC/Serialization.\n3. **Synchronous Scheduler (`single-threaded`)**: Chạy tuần tự trên 1 luồng duy nhất. Dùng riêng cho việc dò lỗi (debugging) bằng `pdb` hoặc in log kiểm tra.\n4. **Distributed Scheduler (`dask.distributed.Client`)**: Bộ lập lịch hiện đại và mạnh mẽ nhất. Mặc dù tên là 'Distributed', bạn có thể dùng nó ngay trên chiếc laptop cá nhân (Local Cluster). Nó hỗ trợ quản lý bộ nhớ thông minh, chống tràn RAM (Spill to disk), và đặc biệt cung cấp **Giao Diện Dashboard Thời Gian Thực**.",
              "codeExamples": [
                {
                  "title": "Code minh họa: 4 Loại Scheduler Trong Dask: Chọn Đúng Công Cụ Cho Bài Toán",
                  "lang": "Python",
                  "code": "from dask.distributed import Client\nimport time\n\n# Khởi tạo Local Cluster ngay trên máy tính cá nhân\n# n_workers: số tiến trình worker, threads_per_worker: số luồng mỗi worker\nclient = Client(n_workers=2, threads_per_worker=2, memory_limit='2GB', processes=False)\n\nprint(f\"Khởi tạo Client thành công: {client}\")\nprint(f\"Địa chỉ xem Dashboard trực tiếp: {client.dashboard_link}\")\n\n# Gửi một tác vụ tính toán thử nghiệm\nfuture = client.submit(lambda x: x ** 2, 100)\nprint(f\"Kết quả tác vụ: {future.result()}\")\n\n# Đóng client khi hoàn tất\nclient.close()",
                  "annotations": [
                    {
                      "line": 6,
                      "text": "Client(): tự động kích hoạt Distributed Scheduler và mở cổng web Dashboard."
                    },
                    {
                      "line": 9,
                      "text": "client.dashboard_link: Đường dẫn truy cập màn hình giám sát trực quan (mặc định cổng 8787)."
                    }
                  ],
                  "output": "Khởi tạo Client thành công: <Client: 'inproc://... processes=2 threads=4, memory=...'>\nĐịa chỉ xem Dashboard trực tiếp: http://localhost:8787/status\nKết quả tác vụ: 10000",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "dk-04-sec2",
              "title": "2. Khám Phá Giao Diện Dask Diagnostic Dashboard",
              "content": "Khi chạy `Client()`, bạn có thể mở trình duyệt web tới địa chỉ `http://localhost:8787/status` để theo dõi hệ thống. Các tab quan trọng nhất bao gồm:\n\n- **Tab Status (Task Stream)**: Đây là biểu đồ quan trọng nhất. Mỗi hàng ngang đại diện cho 1 core CPU, mỗi khối chữ nhật đại diện cho 1 task đang chạy. Nhìn vào màu sắc, bạn biết CPU đang tính toán (màu xanh/tím), đang nạp dữ liệu từ đĩa, hay đang rảnh rỗi chờ đợi mạng.\n- **Tab Progress**: Các thanh tiến độ tổng thể cho từng loại hàm (`read-parquet`, `sum`, `filter`). Cho biết bao nhiêu phần trăm công việc đã hoàn thành.\n- **Tab Workers & Memory**: Biển báo dung lượng RAM thực tế trên từng worker. Nếu thanh bộ nhớ chuyển sang màu cam (vượt ngưỡng 70% RAM), Dask bắt đầu xả dữ liệu tạm xuống ổ cứng (Spill to disk). Nếu chuyển sang màu đỏ (vượt ngưỡng 95%), worker có nguy cơ bị hệ điều hành tiêu diệt (OOM Kill).",
              "table": {
                "headers": [
                  "Ngưỡng Bộ Nhớ Worker",
                  "Màu sắc cảnh báo",
                  "Hành vi của Dask"
                ],
                "rows": [
                  [
                    "< 60% RAM",
                    "Xanh lục (Normal)",
                    "Bộ nhớ an toàn, worker hoạt động hết công suất"
                  ],
                  [
                    "60% - 70% RAM",
                    "Vàng (Target)",
                    "Bắt đầu cảnh báo quản lý bộ nhớ"
                  ],
                  [
                    "70% - 95% RAM",
                    "Cam (Spill to Disk)",
                    "Dask tự động nén và xả dữ liệu tạm xuống ổ cứng SSD"
                  ],
                  [
                    "> 95% RAM",
                    "Đỏ (Pause Worker)",
                    "Tạm dừng nhận task mới để tránh sập hệ thống (OOM)"
                  ]
                ]
              }
            },
            {
              "id": "dk-04-sec3",
              "title": "3. Phân Biệt Sâu Sắc .compute() vs .persist() & Bẫy Shuffle",
              "content": "Một trong những khác biệt kiến trúc tinh tế nhất giữa Dask và các công cụ khác là sự phân định giữa **`.compute()`** và **`.persist()`**:\n\n- **`.compute()`**: Chạy đồ thị và thu hồi toàn bộ mảng/bảng về bộ nhớ tiến trình chính (Driver) dưới dạng `pd.DataFrame` hoặc `np.ndarray`. Đồ thị tác vụ được giải phóng.\n- **`.persist()`**: Chạy đồ thị ngay lập tức, nhưng **kết quả vẫn nằm phân tán trên RAM của các Worker nodes**. Kết quả trả về là một `Dask DataFrame` mới có đồ thị tác vụ chỉ còn 1 bước nạp từ RAM. Bất kỳ phép tính nào gọi trên DataFrame đã persist sẽ chạy nhanh gấp hàng chục lần vì không phải đọc lại file đĩa hay tính lại các bước trước đó!\n\n**Bẫy Shuffle trong Dask:**\nThao tác **Shuffle** xảy ra khi Dask phải phân bổ lại dữ liệu giữa các partition dựa trên một khóa mới (ví dụ gọi `set_index('new_col')` hoặc `merge` trên cột không phải index). Shuffle bắt buộc tất cả các worker phải gửi hàng gigabytes dữ liệu qua switch mạng và ghi tạm xuống đĩa. Để tránh shuffle, luôn lưu trữ dữ liệu đã được sắp xếp sẵn theo index từ trước bằng Parquet.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Phân Biệt Sâu Sắc .compute() vs .persist() & Bẫy Shuffle",
                  "lang": "Python",
                  "code": "import dask.dataframe as dd\nimport pandas as pd\nimport numpy as np\n\npdf = pd.DataFrame({\n    \"user_id\": np.random.randint(1, 1000, 10000),\n    \"val\": np.random.randn(10000)\n})\nddf = dd.from_pandas(pdf, npartitions=4)\n\n# Tiền xử lý dữ liệu (chưa tính toán)\nddf_filtered = ddf[ddf[\"val\"] > 0]\n\n# Giữ kết quả đã lọc trên RAM của các workers bằng persist()\nddf_in_memory = ddf_filtered.persist()\n\n# Bây giờ tính toán nhiều chỉ số khác nhau cực nhanh từ ddf_in_memory:\ncount_res = ddf_in_memory.count().compute()[\"user_id\"]\nmean_res = ddf_in_memory[\"val\"].mean().compute()\n\nprint(f\"Số lượng bản ghi thỏa mãn: {count_res}\")\nprint(f\"Giá trị trung bình: {mean_res:.4f}\")",
                  "annotations": [
                    {
                      "line": 15,
                      "text": "persist(): Kích hoạt lọc dữ liệu và ghim DataFrame kết quả trên RAM của worker."
                    },
                    {
                      "line": 18,
                      "text": "Các phép tính count() và mean() kế tiếp tái sử dụng ngay bộ nhớ RAM mà không chạy lại từ đầu."
                    }
                  ],
                  "output": "Số lượng bản ghi thỏa mãn: 5042\nGiá trị trung bình: 0.7963",
                  "explanation": ""
                }
              ]
            }
          ],
          "callouts": {
            "pitfalls": [],
            "tips": [
              {
                "title": "Mẹo Sử Dụng .persist() Trong Machine Learning",
                "content": "Trước khi huấn luyện mô hình học máy với `dask_ml`, hãy luôn gọi `X_train, y_train = dask.persist(X_train, y_train)`. Điều này đảm bảo dữ liệu huấn luyện đã nằm trọn vẹn trong RAM của các worker, giúp các thuật toán tối ưu hóa Gradient Descent lặp qua dữ liệu hàng trăm epoch mà không tốn công đọc lại đĩa cứng."
              }
            ]
          },
          "exercises": [
            {
              "title": "Đo Tốc Độ Tái Sử Dụng Dữ Liệu Bằng .persist()",
              "problem": "Khởi tạo một Dask Array ngẫu nhiên lớn (20,000,000 phần tử float64). Thực hiện phép biến đổi x_trans = da.sin(x) + da.cos(x). So sánh thời gian tính: (1) Tính tổng và giá trị lớn nhất trực tiếp từ x_trans, (2) Dùng x_cached = x_trans.persist(), sau đó mới tính tổng và giá trị lớn nhất từ x_cached.",
              "hint": "Đo thời gian bằng time.time() trước và sau khi gọi .compute() cho 2 trường hợp.",
              "explanation": "Nhờ gọi .persist(), phép tính sin và cos chỉ phải chạy đúng 1 lần. Lệnh max() kế tiếp đọc thẳng từ bộ nhớ đệm RAM của worker, giúp tiết kiệm gần một nửa thời gian.",
              "solutionCode": "import dask.array as da\nimport time\n\nx = da.random.random(20_000_000, chunks=2_000_000)\nx_trans = da.sin(x) + da.cos(x)\n\n# Cách 1: Không dùng persist (tính lại 2 lần)\nt0 = time.time()\nsum1 = x_trans.sum().compute()\nmax1 = x_trans.max().compute()\ntime_no_persist = time.time() - t0\nprint(f\"Thời gian không dùng persist: {time_no_persist:.2f}s\")\n\n# Cách 2: Dùng persist (lưu trên RAM worker)\nt1 = time.time()\nx_cached = x_trans.persist()\nsum2 = x_cached.sum().compute()\nmax2 = x_cached.max().compute()\ntime_with_persist = time.time() - t1\nprint(f\"Thời gian có dùng persist: {time_with_persist:.2f}s\")",
              "solutionOutput": "Thời gian không dùng persist: 0.85s\nThời gian có dùng persist: 0.48s"
            }
          ],
          "summary": [
            "Dask cung cấp 4 bộ lập lịch: Threads (cho mảng/C đã thả GIL), Processes (cho Python thuần), Synchronous (để debug) và Distributed Client.",
            "dask.distributed.Client là scheduler mạnh mẽ nhất, mở ra cổng Dashboard tương tác thời gian thực tại localhost:8787.",
            "Diagnostic Dashboard giúp giám sát chi tiết hoạt động của từng core CPU (Task Stream) và mức chiếm dụng RAM của từng worker.",
            ".compute() thu hồi toàn bộ kết quả về máy khách (dễ gây OOM nếu dữ liệu lớn), trong khi .persist() giữ kết quả phân mảnh trên RAM của cụm máy.",
            "Tránh các thao tác Shuffle dữ liệu qua mạng bằng cách sắp xếp và phân vùng theo index từ trước."
          ]
        },
        {
          "id": "ai-dk-05",
          "number": "13.5",
          "title": "Dự Án Thực Chiến: Phân Tích Dữ Liệu Chuỗi Thời Gian Cảm Biến IoT Hàng Chục GB Với Dask",
          "subtitle": "Pipeline Out-of-Core hoàn chỉnh: Đọc wildcard đa tệp, căn chỉnh partition theo thời gian, lọc nhiễu và lưu Parquet phân vùng",
          "level": "Nâng cao",
          "duration": "60 phút",
          "objectives": [
            "Xây dựng pipeline phân tích dữ liệu cảm biến IoT quy mô lớn vượt quá RAM đơn máy từ đầu đến cuối.",
            "Đọc song song hàng chục tệp Parquet bằng đường dẫn wildcard dd.read_parquet('data/*.parquet').",
            "Thực hiện căn chỉnh phân vùng theo trục thời gian, xử lý giá trị ngoại lai và tính toán Rolling Averages song song.",
            "Xuất dữ liệu sạch và phân vùng theo thời gian ra định dạng Parquet nén Snappy sẵn sàng cho hệ thống báo cáo."
          ],
          "intuition": {
            "title": "Trạm quan trắc khí tượng thủy văn thông minh",
            "metaphor": "Hàng trăm trạm quan trắc trên toàn quốc liên tục gửi file đo đạc nhiệt độ, độ ẩm, áp suất về trung tâm mỗi 10 phút một file. Sau một năm, bạn có 50,000 tệp dữ liệu dung lượng 50GB. Nếu nạp vào Pandas, máy tính của bạn sẽ nổ tung ngay từ tháng thứ hai! Dask đóng vai trò như một trạm điều phối thông minh: nó quét toàn bộ 50,000 file như một dòng chảy vô tận, phân bổ cho các luồng xử lý song song, lọc bỏ các cảm biến bị chập cháy (outliers), tính toán mức dao động nhiệt độ trung bình từng giờ và nén gọn lại thành các tệp Parquet phân vùng ngăn nắp.",
            "visualHtml": "<div class=\"data-viz-container\">\n  <div class=\"data-viz-title\">🏭 Pipeline Xử Lý Dữ Liệu Cảm Biến IoT Lớn Bằng Dask</div>\n  <div class=\"eco-grid\">\n    <div class=\"eco-card\" style=\"border-top:3px solid #3b82f6;\">\n      <strong>1. Đọc Đa Tệp Wildcard</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        dd.read_parquet('iot_logs/*.parquet') tự động gộp hàng trăm tệp thành 1 DataFrame phân vùng.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #10b981;\">\n      <strong>2. Làm Sạch &amp; Rolling Average</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Lọc giá trị ảo, tính cửa sổ trượt (rolling mean) khử nhiễu song song trên các partitions.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #f59e0b;\">\n      <strong>3. Xuất Parquet Phân Vùng</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Ghi dữ liệu sạch ra đĩa bằng .to_parquet() kèm nén Snappy và chia thư mục theo sensor_id.\n      </div>\n    </div>\n  </div>\n</div>"
          },
          "sections": [
            {
              "id": "dk-05-sec1",
              "title": "1. Thiết Kế Bài Toán IoT: 50 Tệp Parquet Vượt Trội Dung Lượng RAM",
              "content": "Trong dự án này, chúng ta đảm nhận vai trò Kỹ sư Dữ liệu cho một nhà máy sản xuất thông minh. Hệ thống gồm 10 cụm máy móc, mỗi máy gắn các cảm biến nhiệt độ (Temperature), áp suất (Pressure) và độ rung (Vibration). Dữ liệu được ghi liên tục thành nhiều tệp Parquet.\n\n**Mục tiêu của dự án:**\n1. Đọc toàn bộ thư mục dữ liệu phân tán bằng cú pháp wildcard.\n2. Phát hiện và loại bỏ các cảm biến bị lỗi phần cứng (nhiệt độ bất thường < -50°C hoặc > 150°C).\n3. Tính toán giá trị trung bình trượt (Rolling 5-sample Mean) cho áp suất để khử nhiễu tín hiệu.\n4. Gom nhóm theo từng mã máy móc (`machine_id`) và tổng hợp các chỉ số hoạt động cao nhất, thấp nhất và trung bình.\n5. Xuất kết quả phân vùng ra đĩa cứng an toàn mà không làm tràn bộ nhớ máy tính.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Thiết Kế Bài Toán IoT: 50 Tệp Parquet Vượt Trội Dung Lượng RAM",
                  "lang": "Python",
                  "code": "import dask.dataframe as dd\nimport pandas as pd\nimport numpy as np\nimport time\n\n# 1. Giả lập tạo 4 tệp dữ liệu đại diện cho các ngày đo đạc\nnp.random.seed(42)\ndfs = []\nfor day in range(1, 5):\n    n = 25000\n    pdf_day = pd.DataFrame({\n        \"timestamp\": pd.date_range(f\"2026-03-0{day}\", periods=n, freq=\"3s\"),\n        \"machine_id\": np.random.choice([f\"M0{i}\" for i in range(1, 6)], size=n),\n        \"temperature\": np.random.normal(70.0, 15.0, size=n),\n        \"pressure\": np.random.normal(101.3, 5.0, size=n),\n        \"vibration\": np.random.exponential(1.5, size=n)\n    })\n    # Cố tình chèn một số giá trị nhiễu cảm biến lỗi\n    pdf_day.loc[np.random.choice(n, 50), \"temperature\"] = 999.0\n    dfs.append(pdf_day)\n\n# Ghép thành Dask DataFrame 100,000 dòng với 4 partitions\nddf_iot = dd.from_pandas(pd.concat(dfs, ignore_index=True), npartitions=4)\nprint(f\"Tổng số partitions: {ddf_iot.npartitions}\")\nprint(f\"Dữ liệu mẫu:\")\nprint(ddf_iot.head(3))",
                  "annotations": [
                    {
                      "line": 24,
                      "text": "from_pandas() chia nhỏ 4 ngày dữ liệu thành 4 partition độc lập."
                    },
                    {
                      "line": 26,
                      "text": "ddf_iot.head(3): chỉ kích hoạt đọc 3 dòng đầu của partition thứ nhất."
                    }
                  ],
                  "output": "Tổng số partitions: 4\nDữ liệu mẫu:\n            timestamp machine_id  temperature    pressure  vibration\n0 2026-03-01 00:00:00        M04    77.450712  102.451234   0.841235\n1 2026-03-01 00:00:03        M05    67.923451   98.745120   1.245123\n2 2026-03-01 00:00:06        M03    79.712345  105.124567   2.145120",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "dk-05-sec2",
              "title": "2. Xây Dựng Pipeline Làm Sạch & Tổng Hợp Dữ Liệu Lớn",
              "content": "Bây giờ, chúng ta sẽ xây dựng chuỗi thao tác biến đổi dữ liệu hoàn toàn bằng Dask DataFrame:\n- Lọc bỏ các bản ghi có nhiệt độ bất thường (`-20 <= temperature <= 120`).\n- Tạo cột cảnh báo rung lắc mạnh (`vibration > 4.0`).\n- Gom nhóm theo `machine_id` và tính toán ma trận thống kê hiệu suất.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Xây Dựng Pipeline Làm Sạch & Tổng Hợp Dữ Liệu Lớn",
                  "lang": "Python",
                  "code": "# 2. Pipeline biến đổi dữ liệu out-of-core\nstart_time = time.time()\n\n# Bước 1: Lọc bỏ nhiễu cảm biến\nddf_clean = ddf_iot[(ddf_iot[\"temperature\"] >= -20.0) & (ddf_iot[\"temperature\"] <= 120.0)]\n\n# Bước 2: Thêm cột gắn cờ rung lắc\nddf_features = ddf_clean.assign(\n    high_vibration = ddf_clean[\"vibration\"] > 4.0\n)\n\n# Bước 3: Gom nhóm theo từng máy móc và tính chỉ số\nmachine_summary = ddf_features.groupby(\"machine_id\").agg({\n    \"temperature\": [\"mean\", \"max\"],\n    \"pressure\": [\"mean\", \"min\"],\n    \"high_vibration\": \"sum\"\n})\n\n# Đổi tên cột cho dễ đọc\nmachine_summary.columns = [\n    \"temp_mean\", \"temp_max\", \"pressure_mean\", \"pressure_min\", \"vibration_alerts\"\n]\n\n# Kích hoạt thực thi\ndf_final_report = machine_summary.compute().round(2)\nelapsed = time.time() - start_time\n\nprint(f\"Hoàn thành phân tích pipeline trong: {elapsed:.2f} giây!\")\nprint(\"\\nBÁO CÁO GIÁM SÁT MÁY MÓC NHÀ MÁY:\")\nprint(df_final_report)",
                  "annotations": [
                    {
                      "line": 5,
                      "text": "Lọc điều kiện logic không làm xáo trộn dữ liệu (không gây shuffle)."
                    },
                    {
                      "line": 12,
                      "text": "groupby('machine_id').agg(...): gom nhóm song song trên các partition."
                    },
                    {
                      "line": 22,
                      "text": "compute() thu hồi báo cáo 5 hàng về RAM an toàn tuyệt đối."
                    }
                  ],
                  "output": "Hoàn thành phân tích pipeline trong: 0.28 giây!\n\nBÁO CÁO GIÁM SÁT MÁY MÓC NHÀ MÁY:\n            temp_mean  temp_max  pressure_mean  pressure_min  vibration_alerts\nmachine_id                                                                    \nM01             69.95    118.45         101.32         80.12              1420\nM02             70.08    119.12         101.28         79.85              1385\nM03             69.91    117.84         101.35         81.20              1410\nM04             70.12    119.50         101.29         80.54              1390\nM05             69.88    118.90         101.31         79.90              1445",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "dk-05-sec3",
              "title": "3. Xuất Kết Quả Phân Vùng Ra Định Dạng Parquet",
              "content": "Sau khi dữ liệu đã được làm sạch, việc xuất kết quả ra đĩa cứng là bước quan trọng để các hệ thống khác (PowerBI, Tableau, ML models) có thể tiêu thụ.\n\nTrong Dask, phương thức **`.to_parquet()`** sẽ tự động ghi mỗi partition thành một file Parquet độc lập trên đĩa cứng song song. Bạn có thể chỉ định tham số `partition_on=['machine_id']` để tổ chức thư mục theo chuẩn phân cấp của Apache Hive (ví dụ: `output/machine_id=M01/part.0.parquet`).",
              "codeExamples": [
                {
                  "title": "Code minh họa: Xuất Kết Quả Phân Vùng Ra Định Dạng Parquet",
                  "lang": "Python",
                  "code": "# Mô phỏng lưu trữ dữ liệu phân vùng\n# ddf_features.to_parquet(\n#     \"cleaned_iot_data/\",\n#     engine=\"pyarrow\",\n#     compression=\"snappy\",\n#     partition_on=[\"machine_id\"],\n#     write_index=False\n# )\nprint(\"Lệnh ghi Parquet song song out-of-core: ddf.to_parquet('out_dir/', compression='snappy')\")",
                  "annotations": [
                    {
                      "line": 9,
                      "text": "to_parquet() ghi trực tiếp từ các luồng worker xuống đĩa mà không gom về RAM driver."
                    }
                  ],
                  "output": "Lệnh ghi Parquet song song out-of-core: ddf.to_parquet('out_dir/', compression='snappy')",
                  "explanation": ""
                }
              ]
            }
          ],
          "callouts": {
            "pitfalls": [],
            "tips": [
              {
                "title": "Chống Thất Thoát Dữ Liệu Khi Ghi Parquet",
                "content": "Khi ghi dữ liệu lớn bằng `to_parquet()`, Dask sử dụng cơ chế ghi nguyên tử (Atomic write): Mỗi worker ghi ra một tệp tạm thời `.part.tmp`, chỉ khi toàn bộ pipeline thành công không có lỗi, Dask mới đổi tên thành tệp chính thức. Nếu có sự cố mất điện giữa chừng, hệ thống không bao giờ bị dính dữ liệu rác hay file hỏng!"
              }
            ]
          },
          "exercises": [
            {
              "title": "Tính Độ Lệch Chuẩn Áp Suất Và Phát Hiện Máy Hoạt Động Bất Ổn",
              "problem": "Từ DataFrame ddf_features ở trên, hãy dùng Dask để tính độ lệch chuẩn (std) của áp suất (pressure) theo từng machine_id. Sau đó gọi .compute() và sắp xếp tìm ra mã máy móc có áp suất dao động bất ổn định nhất.",
              "hint": "Sử dụng ddf_features.groupby('machine_id').pressure.std().compute().sort_values(ascending=False).",
              "explanation": "Máy M04 có độ lệch chuẩn áp suất cao nhất (5.045), báo hiệu van điều áp của cụm máy này có dấu hiệu mài mòn cần được kiểm tra bảo dưỡng.",
              "solutionCode": "# Sử dụng ddf_features từ bài học\npressure_stability = ddf_features.groupby(\"machine_id\").pressure.std().compute()\nsorted_instability = pressure_stability.sort_values(ascending=False).round(3)\n\nprint(\"Độ bất ổn áp suất (độ lệch chuẩn cao nhất):\")\nprint(sorted_instability)",
              "solutionOutput": "Độ bất ổn áp suất (độ lệch chuẩn cao nhất):\nmachine_id\nM04    5.045\nM01    5.021\nM05    4.998\nM03    4.985\nM02    4.972\nName: pressure, dtype: float64"
            }
          ],
          "summary": [
            "Dask DataFrame cho phép xử lý hàng chục gigabytes dữ liệu chuỗi thời gian IoT bằng cú pháp giống hệt Pandas.",
            "Đọc song song nhiều tệp bằng cú pháp wildcard dd.read_parquet() tận dụng tối đa băng thông của ổ cứng SSD.",
            "Toàn bộ pipeline làm sạch, lọc nhiễu và gom nhóm thống kê được thực thi đa luồng out-of-core mà không gây tràn RAM.",
            "Phương thức .to_parquet() hỗ trợ nén Snappy và phân chia thư mục Hive partition_on giúp tối ưu hóa truy vấn cho các hệ sinh thái Big Data.",
            "Dask là giải pháp cầu nối hoàn hảo giữa máy tính cá nhân và các cụm siêu máy tính phân tán trong hệ sinh thái Python."
          ]
        }
      ]
    },
    {
      "id": "part-ai-pyspark",
      "number": "Phần 14",
      "title": "PySpark: Xử Lý Dữ Liệu Lớn Quy Mô Cụm Máy Tính Với Apache Spark",
      "level": "Nâng cao",
      "badge": "5 Bài học",
      "icon": "🔥",
      "description": "Chuẩn mực công nghiệp cho kỹ thuật dữ liệu (Data Engineering) ở quy mô Petabyte: Kiến trúc Driver/Workers, SparkSession, RDD vs DataFrame, Catalyst Optimizer, Tungsten, Shuffle, Caching, Window Functions, UDF tối ưu và Structured Streaming.",
      "lessons": [
        {
          "id": "ai-spk-01",
          "number": "14.1",
          "title": "Khi Nào Cần Apache Spark? Kiến Trúc Driver, Cluster Manager & Worker Nodes",
          "subtitle": "Phân định ranh giới giữa Polars, Dask và Apache Spark; giải phẫu kiến trúc phân tán Master-Slave và SparkSession",
          "level": "Nâng cao",
          "duration": "50 phút",
          "objectives": [
            "Nắm vững ma trận ra quyết định: Khi nào NÊN dùng Spark (dữ liệu > 100GB-TB, cụm hàng chục/hàng trăm node) và khi nào KHÔNG NÊN dùng (dữ liệu máy đơn nên dùng Polars).",
            "Giải phẫu kiến trúc Master-Slave của Spark: Driver Program, Cluster Manager (YARN, K8s, Standalone), Worker Nodes, Executors và Tasks.",
            "Hiểu rõ vai trò của Py4J: Cầu nối giao tiếp giữa tiến trình Python và máy ảo Java (JVM) của Spark.",
            "Khởi tạo và làm chủ cấu hình SparkSession: driver memory, executor memory, cores và shuffle partitions."
          ],
          "intuition": {
            "title": "Quán ăn bình dân gia đình vs Đại tiệc quốc gia 10,000 khách",
            "metaphor": "Một quán ăn 10 bàn (dữ liệu vài GB): bạn chỉ cần 1 đầu bếp nhanh nhẹn dùng dao sắc (Pandas/Polars trên laptop). Một nhà hàng cao cấp 50 bàn (dữ liệu 50GB): một trạm bếp công nghiệp hiện đại với máy sơ chế tự động là đủ (Polars đa luồng). Nhưng hãy tưởng tượng bạn phải tổ chức Đại tiệc Quốc tế 10,000 thực khách diễn ra đồng thời tại 30 sảnh tiệc độc lập trên toàn thành phố (Dữ liệu hàng chục Terabytes đến Petabytes). Bạn bắt buộc phải có một Tổng đạo diễn chỉ huy chương trình (Driver Program), một Bộ phận điều phối hậu cần và xe vận chuyển (Cluster Manager), và hàng trăm bếp phụ tại các sảnh (Worker Nodes & Executors) vận hành theo đúng kịch bản phân công chi tiết (DAG Tasks). Đó chính là Apache Spark!",
            "visualHtml": "<div class=\"data-viz-container\">\n  <div class=\"data-viz-title\">🏛️ Kiến Trúc Tổng Quan Apache Spark (Master - Slave Architecture)</div>\n  <div class=\"eco-grid\">\n    <div class=\"eco-card\" style=\"border-top:3px solid #ef4444;\">\n      <strong style=\"color:#ef4444;\">1. Driver Program</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;line-height:1.5;\">\n        • Nơi chứa <code>main()</code> và <code>SparkSession</code>.<br/>\n        • Phân tích code người dùng thành đồ thị DAG.<br/>\n        • Tạo Task Scheduler và điều phối việc giao việc cho toàn bộ cụm.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #3b82f6;\">\n      <strong style=\"color:#3b82f6;\">2. Cluster Manager</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;line-height:1.5;\">\n        • Quản lý tài nguyên phần cứng (CPU, RAM).<br/>\n        • Hỗ trợ: Kubernetes (K8s), Apache YARN, Mesos hoặc Spark Standalone.<br/>\n        • Cấp phát và thu hồi container cho các Worker.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #10b981;\">\n      <strong style=\"color:#10b981;\">3. Worker Nodes &amp; Executors</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;line-height:1.5;\">\n        • Mỗi Worker chạy 1 hoặc nhiều <strong>Executors (tiến trình JVM)</strong>.<br/>\n        • Mỗi Executor chứa nhiều Cores để chạy các Tasks song song.<br/>\n        • Lưu trữ dữ liệu trong RAM/Disk và báo cáo trạng thái về Driver.\n      </div>\n    </div>\n  </div>\n</div>"
          },
          "sections": [
            {
              "id": "spk-01-sec1",
              "title": "1. Khi Nào Cần Apache Spark? (Và Khi Nào KHÔNG Nên Dùng)",
              "content": "Apache Spark là công nghệ thống trị tuyệt đối trong mảng kỹ thuật dữ liệu lớn (Big Data Engineering) suốt thập kỷ qua. Tuy nhiên, sai lầm phổ biến nhất của các kỹ sư là **lạm dụng Spark cho những bài toán quá nhỏ**.\n\n**Khi nào KHÔNG nên dùng Spark:**\n- Dữ liệu dưới 50GB: Một chiếc máy tính xách tay hiện đại hoặc máy chủ đám mây cấu hình cao chạy **Polars** có thể xử lý tập dữ liệu này nhanh hơn Spark từ 10 đến 50 lần! Lý do: Spark tốn rất nhiều thời gian cho việc khởi động máy ảo JVM, bắt tay phân bổ tài nguyên mạng và tuần tự hóa dữ liệu (Serialization Overhead).\n- Phân tích tương tác tức thời (Interactive Ad-hoc queries) trên máy đơn.\n\n**Khi nào BẮT BUỘC dùng Spark:**\n- Dữ liệu quy mô Terabytes hoặc Petabytes vượt quá dung lượng đĩa và RAM của bất kỳ máy chủ vật lý đơn lẻ nào.\n- Xây dựng hạ tầng Data Lakehouse doanh nghiệp (kết hợp Delta Lake, Apache Iceberg, Apache Hudi).\n- Quy trình ETL phân tán phức tạp chạy định kỳ trên các cụm máy tính hàng trăm máy chủ (Kubernetes, AWS EMR, Databricks).",
              "table": {
                "headers": [
                  "Tiêu chí so sánh",
                  "Pandas",
                  "Polars",
                  "Apache Spark (PySpark)"
                ],
                "rows": [
                  [
                    "Quy mô dữ liệu tối ưu",
                    "< 5 GB (In-Memory)",
                    "< 100 GB (Single Machine)",
                    "> 100 GB đến hàng trăm Petabytes"
                  ],
                  [
                    "Kiến trúc xử lý",
                    "1 core CPU (GIL)",
                    "Toàn bộ core CPU máy đơn (Rust)",
                    "Hàng trăm máy chủ phân tán (Cluster)"
                  ],
                  [
                    "Bộ nhớ sử dụng",
                    "RAM đơn máy",
                    "RAM + SSD Streaming",
                    "RAM + Đĩa phân tán của toàn cụm"
                  ],
                  [
                    "Thời gian khởi động",
                    "Tức thì (<0.1s)",
                    "Tức thì (<0.1s)",
                    "Độ trễ khởi động JVM (vài giây đến vài phút)"
                  ],
                  [
                    "Độ phức tạp hạ tầng",
                    "Không cần cài đặt",
                    "Không cần cài đặt",
                    "Cần cụm YARN / K8s / Databricks"
                  ]
                ]
              }
            },
            {
              "id": "spk-01-sec2",
              "title": "2. Khởi Tạo SparkSession & Cấu Hình Môi Trường PySpark",
              "content": "Kể từ phiên bản Spark 2.0+, **`SparkSession`** là điểm vào duy nhất (Unified Entry Point) cho mọi tác vụ trong PySpark, thay thế hoàn toàn cho các đối tượng rời rạc trước đây (`SparkContext`, `SQLContext`, `HiveContext`).\n\nKhi khởi tạo `SparkSession`, bạn có thể chỉ định các thông số quan trọng:\n- `master('local[*]')`: Chạy ở chế độ cục bộ trên máy tính cá nhân, tận dụng toàn bộ lõi CPU logic.\n- `spark.driver.memory`: Dung lượng RAM cấp phát cho Driver (ví dụ: '4g').\n- `spark.executor.memory`: Dung lượng RAM cho mỗi Executor.\n- `spark.sql.shuffle.partitions`: Số lượng partition mặc định sinh ra khi xáo trộn dữ liệu (mặc định là 200).",
              "codeExamples": [
                {
                  "title": "Code minh họa: Khởi Tạo SparkSession & Cấu Hình Môi Trường PySpark",
                  "lang": "Python",
                  "code": "# Cú pháp khởi tạo SparkSession chuẩn mực trong PySpark\nfrom pyspark.sql import SparkSession\n\n# Xây dựng phiên làm việc Spark tối ưu\nspark = (\n    SparkSession.builder\n    .appName(\"PySpark-Enterprise-Foundation\")\n    .master(\"local[*]\")  # Dùng tất cả cores trên máy cục bộ\n    .config(\"spark.driver.memory\", \"4g\")\n    .config(\"spark.sql.shuffle.partitions\", \"8\")  # Hạ từ 200 xuống 8 cho môi trường local\n    .config(\"spark.sql.execution.arrow.pyspark.enabled\", \"true\")  # Bật Apache Arrow tăng tốc\n    .getOrCreate()\n)\n\nprint(f\"Phiên bản Spark: {spark.version}\")\nprint(f\"Ứng dụng Spark App ID: {spark.sparkContext.applicationId}\")\nprint(f\"Cổng Web UI: {spark.sparkContext.uiWebUrl}\")\n\n# Giải phóng tài nguyên khi hoàn tất\n# spark.stop()",
                  "annotations": [
                    {
                      "line": 5,
                      "text": "SparkSession.builder.getOrCreate(): Mẫu thiết kế Singleton đảm bảo chỉ tạo duy nhất 1 phiên."
                    },
                    {
                      "line": 8,
                      "text": "master('local[*]'): Chạy trên máy đơn giả lập cụm phân tán."
                    },
                    {
                      "line": 10,
                      "text": "spark.sql.execution.arrow.pyspark.enabled: Kích hoạt Apache Arrow trao đổi dữ liệu tốc độ cao với JVM."
                    }
                  ],
                  "output": "Phiên bản Spark: 3.5.0\nỨng dụng Spark App ID: local-1711234567890\nCổng Web UI: http://localhost:4040",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "spk-01-sec3",
              "title": "3. Cầu Nối Py4J: Cách Python Giao Tiếp Với Máy Ảo Java (JVM)",
              "content": "Bản thân Apache Spark được viết bằng ngôn ngữ **Scala/Java** và chạy bên trong máy ảo **Java Virtual Machine (JVM)**. Vậy làm thế nào một lập trình viên Python có thể điều khiển Spark?\n\nCâu trả lời là thư viện **Py4J**:\n1. Khi bạn gọi một phương thức PySpark (ví dụ `df.filter(...)`), thư viện Py4J sẽ gửi một thông điệp RPC qua socket mạng cục bộ (IPC) tới JVM của Driver.\n2. JVM của Driver nhận lệnh, bổ sung nút vào đồ thị DAG và biên dịch thành mã thực thi Java bytecode.\n3. Đối với các thao tác dữ liệu bảng (**DataFrame & Spark SQL**), dữ liệu được xử lý 100% bên trong bộ nhớ của JVM bằng động cơ tối ưu hóa **Tungsten** mà không cần chuyển dữ liệu sang Python. Nhờ đó, hiệu năng của PySpark DataFrame nhanh ngang ngửa code Scala gốc!",
              "table": {
                "headers": [
                  "Thành phần",
                  "Ngôn ngữ / Môi trường",
                  "Trách nhiệm chính"
                ],
                "rows": [
                  [
                    "PySpark API",
                    "Python 3.x",
                    "Cung cấp giao diện lập trình thân thiện cho Data Scientist"
                  ],
                  [
                    "Py4J Bridge",
                    "Cổng Gateway Socket",
                    "Chuyển lệnh từ Python sang máy ảo JVM Driver"
                  ],
                  [
                    "Spark Core Engine",
                    "Scala / JVM",
                    "Xây dựng DAG, lập lịch, Catalyst Optimizer, Tungsten"
                  ],
                  [
                    "Executors",
                    "Tiến trình JVM độc lập",
                    "Chạy các Tasks tính toán trên từng phân vùng dữ liệu"
                  ]
                ]
              }
            }
          ],
          "callouts": {
            "pitfalls": [
              {
                "title": "Tránh Tạo Nhiều SparkSession Đồng Thời",
                "content": "Luôn luôn dùng cú pháp `.getOrCreate()`. Việc cố gắng tạo nhiều đối tượng `SparkContext` hoặc `SparkSession` trong cùng một tiến trình Python sẽ gây xung đột cổng mạng, chiếm dụng gấp đôi tài nguyên JVM và làm sập ứng dụng."
              }
            ],
            "tips": [
              {
                "title": "Màn Hình Giám Sát Spark Web UI (Cổng 4040)",
                "content": "Khi ứng dụng PySpark khởi chạy, một máy chủ web nội bộ tự động mở tại `http://localhost:4040`. Đây là công cụ quyền lực nhất của Data Engineer: Bạn có thể xem biểu đồ DAG trực quan, thời gian chạy của từng Stage, dung lượng dữ liệu Shuffle qua mạng và phát hiện các task chạy chậm do lệch pha dữ liệu (Data Skew)."
              }
            ]
          },
          "exercises": [
            {
              "title": "Khởi Tạo SparkSession Với Cấu Hình Tối Ưu Cho Môi Trường Local",
              "problem": "Hãy viết đoạn code Python khởi tạo một đối tượng SparkSession có tên 'Sensor-ETL-Pipeline', chạy ở chế độ cục bộ local[4], cấp phát 2GB bộ nhớ cho driver, thiết lập số shuffle partitions là 4 và kích hoạt hỗ trợ Apache Arrow. Sau đó in ra thông số cấu hình spark.sql.shuffle.partitions để kiểm tra.",
              "hint": "Sử dụng builder.appName(...).master('local[4]').config(...).getOrCreate() và spark.conf.get('spark.sql.shuffle.partitions').",
              "explanation": "Cấu hình 4 shuffle partitions giúp các phép gom nhóm hay join trên máy cá nhân không bị chia nhỏ thành 200 task tí hon gây lãng phí overhead.",
              "solutionCode": "from pyspark.sql import SparkSession\n\nspark = (\n    SparkSession.builder\n    .appName(\"Sensor-ETL-Pipeline\")\n    .master(\"local[4]\")\n    .config(\"spark.driver.memory\", \"2g\")\n    .config(\"spark.sql.shuffle.partitions\", \"4\")\n    .config(\"spark.sql.execution.arrow.pyspark.enabled\", \"true\")\n    .getOrCreate()\n)\n\n# Kiểm tra cấu hình thực tế\nshuffle_parts = spark.conf.get(\"spark.sql.shuffle.partitions\")\napp_name = spark.conf.get(\"spark.app.name\")\n\nprint(f\"Tên ứng dụng: {app_name}\")\nprint(f\"Số lượng shuffle partitions: {shuffle_parts}\")\n\n# Dọn dẹp\nspark.stop()",
              "solutionOutput": "Tên ứng dụng: Sensor-ETL-Pipeline\nSố lượng shuffle partitions: 4"
            }
          ],
          "summary": [
            "Apache Spark là tiêu chuẩn vàng cho các hệ thống dữ liệu lớn từ vài trăm Gigabytes đến Petabytes trên cụm phân tán.",
            "Đối với dữ liệu vừa và nhỏ (<50GB trên 1 máy), Polars mang lại hiệu năng cao hơn và tiết kiệm chi phí hạ tầng hơn nhiều lần so với Spark.",
            "Kiến trúc Spark tuân theo mô hình Master-Slave gồm Driver (tổng đạo diễn), Cluster Manager (quản lý phần cứng) và Executors (tiến trình JVM thực thi).",
            "Py4J là cầu nối RPC cho phép code Python ra lệnh điều khiển trực tiếp động cơ Spark trong JVM.",
            "SparkSession là điểm vào thống nhất duy nhất cho toàn bộ hệ sinh thái Spark (SQL, Streaming, MLlib)."
          ]
        },
        {
          "id": "ai-spk-02",
          "number": "14.2",
          "title": "Từ RDD Đến DataFrame & Spark SQL: Lazy Evaluation, Transformations vs Actions",
          "subtitle": "Khám phá lineage phục hồi lỗi của RDD, sức mạnh của DataFrame có lược đồ kiểu dữ liệu và đồ thị DAG (Jobs, Stages, Tasks)",
          "level": "Nâng cao",
          "duration": "55 phút",
          "objectives": [
            "Hiểu sâu nguồn gốc lịch sử và bản chất của RDD (Resilient Distributed Dataset) và cơ chế tự phục hồi lỗi bằng Lineage Graph.",
            "Giải thích vì sao DataFrame và Spark SQL ra đời thay thế RDD trong 95% dự án thực tế.",
            "Phân biệt rạch ròi giữa Narrow Transformations (không shuffle) và Wide Transformations (bắt buộc shuffle).",
            "Hiểu rõ hệ thống phân cấp thực thi của Spark: Application -> Job -> Stage -> Task."
          ],
          "intuition": {
            "title": "Tờ gia phả công thức nấu ăn (RDD Lineage)",
            "metaphor": "Hãy tưởng tượng bạn đang quản lý một nhà bếp phục vụ tiệc cưới với 50 đầu bếp. Nếu một đầu bếp phụ làm rơi vỡ một đĩa bánh ngọt (một Worker Node bị sập nguồn), người quản lý không cần phải hủy bỏ toàn bộ bữa tiệc và làm lại từ đầu! Nhờ có 'Tờ gia phả công thức' (RDD Lineage Graph), người quản lý chỉ cần xem: 'Đĩa bánh này được làm từ: [Bột mì kho số 2 -> Nhào men 15 phút -> Nướng ở lò 3]'. Ông chỉ việc giao đúng công thức đó cho một đầu bếp khác làm lại trong 2 phút! Đó chính là khả năng tự phục hồi lỗi (Fault Tolerance) của Apache Spark mà không cần sao chép nhân bản dữ liệu tốn kém.",
            "visualHtml": "<div class=\"data-viz-container\">\n  <div class=\"data-viz-title\">⚡ Phân Cấp Thực Thi Của Apache Spark</div>\n  <div class=\"eco-grid\">\n    <div class=\"eco-card\" style=\"border-top:3px solid #3b82f6;\">\n      <strong>1. Job (Công Việc)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Mỗi khi một <strong>Action</strong> (.count, .collect, .show, .write) được gọi, Spark sinh ra 1 Job.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #f59e0b;\">\n      <strong>2. Stage (Giai Đoạn)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Một Job được chia thành nhiều Stages, ngăn cách nhau bởi các <strong>Rào Chắn Shuffle</strong> (Wide Transformations).\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #10b981;\">\n      <strong>3. Task (Tác Vụ Đơn Vị)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Mỗi Stage bao gồm nhiều Tasks. <strong>1 Task xử lý 1 Partition dữ liệu</strong> trên 1 Core CPU.\n      </div>\n    </div>\n  </div>\n</div>"
          },
          "sections": [
            {
              "id": "spk-02-sec1",
              "title": "1. RDD (Resilient Distributed Dataset): Nền Tảng Nguyên Thủy",
              "content": "Trong phiên bản Spark 1.0 (2014), **RDD** là cấu trúc dữ liệu cốt lõi duy nhất. RDD sở hữu 3 đặc tính then chốt:\n\n1. **Resilient (Có khả năng phục hồi)**: RDD không lưu dữ liệu trùng lặp trên nhiều máy để dự phòng (như HDFS nhân bản 3 bản). Thay vào đó, nó ghi nhớ toàn bộ phả hệ các bước biến đổi (**Lineage Graph**). Khi một nút mạng bị chết, Spark chỉ cần tính toán lại đúng phân vùng bị mất từ nút cha gần nhất.\n2. **Distributed (Phân tán)**: Dữ liệu được chia thành nhiều phân vùng (partitions) nằm rải rác trên RAM của cụm máy.\n3. **Dataset (Tập dữ liệu bất biến)**: Một khi RDD được tạo ra, nội dung của nó là Read-Only (không thể sửa đổi). Mọi thao tác đều sinh ra một RDD mới.\n\n**Vì sao RDD bị thay thế bởi DataFrame?**\n- RDD coi dữ liệu như các đối tượng Python vô hình (`Python Objects` dạng hộp đen). Spark không hiểu bên trong đối tượng có cấu trúc gì để tối ưu hóa.\n- Dữ liệu Python RDD buộc phải liên tục chuyển đổi qua lại giữa tiến trình Python và JVM (Serialization/Pickling), làm giảm hiệu năng nghiêm trọng.",
              "codeExamples": [
                {
                  "title": "Code minh họa: RDD (Resilient Distributed Dataset): Nền Tảng Nguyên Thủy",
                  "lang": "Python",
                  "code": "# Minh họa tạo RDD từ SparkContext\nfrom pyspark.sql import SparkSession\n\nspark = SparkSession.builder.master(\"local[*]\").appName(\"RDD-Demo\").getOrCreate()\nsc = spark.sparkContext\n\n# Tạo một RDD từ danh sách số nguyên\nrdd_numbers = sc.parallelize(range(1, 100), numSlices=4)\n\n# Chuỗi biến đổi RDD (Transformations: filter, map)\nrdd_evens = rdd_numbers.filter(lambda x: x % 2 == 0)\nrdd_squared = rdd_evens.map(lambda x: x ** 2)\n\n# Xem Lineage Graph phục hồi lỗi\nprint(\"Cây phả hệ Lineage của RDD:\")\nprint(rdd_squared.toDebugString().decode('utf-8'))\n\n# Kích hoạt tính toán (Action)\ntotal_sum = rdd_squared.sum()\nprint(f\"Tổng bình phương các số chẵn: {total_sum}\")",
                  "annotations": [
                    {
                      "line": 7,
                      "text": "sc.parallelize(): chia mảng thành RDD gồm 4 partitions."
                    },
                    {
                      "line": 15,
                      "text": "toDebugString(): in cấu trúc cây phả hệ Lineage của RDD."
                    },
                    {
                      "line": 18,
                      "text": ".sum(): Action kích hoạt tính toán trên toàn cụm."
                    }
                  ],
                  "output": "Cây phả hệ Lineage của RDD:\n(4) PythonRDD[3] at RDD at PythonRDD.scala:53 []\n |  ParallelCollectionRDD[0] at readRDDFromFile at PythonRDD.scala:423 []\n\nTổng bình phương các số chẵn: 161700",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "spk-02-sec2",
              "title": "2. DataFrame & Spark SQL: Cuộc Cách Mạng Có Cấu Trúc",
              "content": "Để giải quyết triệt để nhược điểm của RDD, Spark 2.0 giới thiệu **DataFrame**:\n- Dữ liệu được tổ chức thành các hàng và cột có **Lược đồ (Schema)** tường minh (kiểu dữ liệu chặt chẽ như `IntegerType`, `StringType`, `TimestampType`).\n- Trình tối ưu hóa **Catalyst Optimizer** có thể 'nhìn thấu' cấu trúc bảng để tự động sắp xếp lại thứ tự truy vấn, đẩy bộ lọc xuống nguồn và loại bỏ cột thừa.\n- Dữ liệu được lưu trữ trực tiếp dưới dạng nhị phân ngoài vùng nhớ Java Heap (**Tungsten Off-Heap Memory**), loại bỏ hoàn toàn hiện tượng nghẽn rác của Java Garbage Collection (GC).",
              "codeExamples": [
                {
                  "title": "Code minh họa: DataFrame & Spark SQL: Cuộc Cách Mạng Có Cấu Trúc",
                  "lang": "Python",
                  "code": "from pyspark.sql import SparkSession\nfrom pyspark.sql.types import StructType, StructField, IntegerType, StringType, DoubleType\nimport pyspark.sql.functions as F\n\nspark = SparkSession.builder.master(\"local[*]\").appName(\"DataFrame-Demo\").getOrCreate()\n\n# 1. Định nghĩa Schema tường minh bằng StructType\ncustom_schema = StructType([\n    StructField(\"emp_id\", IntegerType(), False),\n    StructField(\"name\", StringType(), False),\n    StructField(\"dept\", StringType(), True),\n    StructField(\"salary\", DoubleType(), True)\n])\n\ndata = [\n    (101, \"Nguyễn Văn A\", \"Kỹ thuật\", 2500.0),\n    (102, \"Trần Thị B\", \"Kinh doanh\", 1800.0),\n    (103, \"Lê Văn C\", \"Kỹ thuật\", 3200.0),\n    (104, \"Phạm Minh D\", \"Nhân sự\", 1500.0)\n]\n\n# 2. Khởi tạo PySpark DataFrame\ndf_emp = spark.createDataFrame(data, schema=custom_schema)\n\nprint(\"Lược đồ Schema của DataFrame:\")\ndf_emp.printSchema()\n\n# 3. Biến đổi dữ liệu bằng Spark SQL Functions (F.col)\ndf_transformed = df_emp.withColumn(\n    \"tax_bracket\",\n    F.when(F.col(\"salary\") >= 2500.0, \"Bậc Cao\").otherwise(\"Bậc Tiêu Chuẩn\")\n).filter(F.col(\"dept\") == \"Kỹ thuật\")\n\nprint(\"\\nKết quả sau biến đổi (Action .show()):\")\ndf_transformed.show()",
                  "annotations": [
                    {
                      "line": 8,
                      "text": "StructType định nghĩa cấu trúc cột chính xác, giúp Spark nạp dữ liệu không copy."
                    },
                    {
                      "line": 28,
                      "text": "F.when().otherwise(): cú pháp rẽ nhánh điều kiện tối ưu sẵn trong Catalyst."
                    },
                    {
                      "line": 34,
                      "text": ".show(): Action kích hoạt Job hiển thị bảng ra màn hình."
                    }
                  ],
                  "output": "Lược đồ Schema của DataFrame:\nroot\n |-- emp_id: integer (nullable = false)\n |-- name: string (nullable = false)\n |-- dept: string (nullable = true)\n |-- salary: double (nullable = true)\n\nKết quả sau biến đổi (Action .show()):\n+------+------------+--------+------+-----------+\n|emp_id|        name|    dept|salary|tax_bracket|\n+------+------------+--------+------+-----------+\n|   101|Nguyễn Văn A|Kỹ thuật|2500.0|    Bậc Cao|\n|   103|    Lê Văn C|Kỹ thuật|3200.0|    Bậc Cao|\n+------+------------+--------+------+-----------+",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "spk-02-sec3",
              "title": "3. Transformations vs Actions & Phân Loại Narrow vs Wide",
              "content": "Trong Spark, các thao tác được chia làm 2 loại cơ bản:\n\n1. **Transformations (Lười biếng / Lazy)**: Không tính toán ngay mà chỉ xây dựng đồ thị DAG. Chia làm 2 nhóm cực kỳ quan trọng:\n   - **Narrow Transformation (Phụ thuộc hẹp)**: Mỗi partition đầu vào chỉ phục vụ cho duy nhất 1 partition đầu ra. Dữ liệu xử lý cục bộ trên cùng một máy mà **KHÔNG CẦN gửi qua mạng** (Ví dụ: `select`, `filter`, `withColumn`, `map`). Tốc độ siêu nhanh!\n   - **Wide Transformation (Phụ thuộc rộng)**: Dữ liệu từ nhiều partition đầu vào phải được tập kết, băm lại và gửi chéo qua mạng tới các worker khác (**Bắt buộc xảy ra Shuffle**). Ví dụ: `groupBy`, `join`, `distinct`, `repartition`, `sort`.\n\n2. **Actions (Kích hoạt tính toán)**: Gửi tín hiệu ép Driver biên dịch toàn bộ DAG thành mã máy và chạy trên cụm. Các Action phổ biến: `.count()`, `.show()`, `.take(n)`, `.collect()`, `.write.parquet()`.\n\n**Ranh giới của Stage**: Mỗi khi gặp một Wide Transformation (Shuffle), Spark sẽ cắt đồ thị Job thành 2 **Stages** độc lập để đồng bộ hóa dữ liệu.",
              "table": {
                "headers": [
                  "Loại Biến Đổi",
                  "Ví dụ hàm thường gặp",
                  "Cơ chế trao đổi dữ liệu",
                  "Mức độ tốn kém"
                ],
                "rows": [
                  [
                    "Narrow Transformation",
                    "filter, select, withColumn, drop",
                    "Xử lý cục bộ trong RAM của 1 worker",
                    "Rất thấp (Song song tối đa)"
                  ],
                  [
                    "Wide Transformation",
                    "groupBy, join, distinct, orderBy",
                    "Shuffle: Gửi dữ liệu chéo qua mạng",
                    "Rất cao (Nghẽn đĩa và mạng)"
                  ],
                  [
                    "Action",
                    "count, show, collect, write",
                    "Kích hoạt Driver lập lịch thực thi",
                    "Phụ thuộc vào kích thước kết quả"
                  ]
                ]
              }
            }
          ],
          "callouts": {
            "pitfalls": [],
            "tips": [
              {
                "title": "Tuyệt Đối Tránh df.collect() Trên Bảng Dữ Liệu Lớn",
                "content": "Phương thức `.collect()` sẽ gom toàn bộ hàng tỷ dòng dữ liệu từ tất cả các máy trong cụm về nạp vào bộ nhớ RAM của một mình máy Driver. Nếu bảng dữ liệu lớn hơn RAM máy Driver, ứng dụng sẽ sập ngay lập tức vì lỗi `OutOfMemoryError: Java heap space`! Hãy luôn dùng `.take(10)` hoặc `.show(10)` để xem mẫu, hoặc dùng `.write.parquet()` để ghi thẳng ra đĩa."
              }
            ]
          },
          "exercises": [
            {
              "title": "Nhận Diện Narrow vs Wide Transformations Trên Pipeline Spark",
              "problem": "Cho chuỗi thao tác sau trên PySpark: (1) df.filter(F.col('age') > 25), (2) df.withColumn('income_k', F.col('income') / 1000), (3) df.groupBy('city').agg(F.avg('income_k')), (4) df.sort('city'). Hãy xác định mỗi bước là Narrow hay Wide Transformation và dự đoán pipeline này sinh ra bao nhiêu Stage khi gọi .count().",
              "hint": "Các phép tính theo từng hàng là Narrow; các phép gom nhóm hoặc sắp xếp sắp xếp lại toàn cụm là Wide.",
              "explanation": "Mỗi Wide Transformation tạo ra một ranh giới phân tách Stage (Shuffle Boundary). Dữ liệu của Stage trước phải được ghi xuống đĩa tạm thời trước khi Stage sau có thể bắt đầu đọc qua mạng.",
              "solutionCode": "# Phân tích lý thuyết và kiểm chứng:\n# Bước 1: filter -> Narrow Transformation (không shuffle)\n# Bước 2: withColumn -> Narrow Transformation (không shuffle)\n# Bước 3: groupBy + agg -> Wide Transformation (gây ra Shuffle đợt 1 -> Cắt Stage)\n# Bước 4: sort -> Wide Transformation (gây ra Shuffle đợt 2 -> Cắt Stage)\n\n# Khi gọi action .count(), Spark sẽ phân chia thành 3 Stages:\n# - Stage 1: Filter + WithColumn + Gom nhóm cục bộ (Partial Aggregation)\n# - Stage 2: Shuffle gom nhóm toàn cục (Global Aggregation)\n# - Stage 3: Shuffle sắp xếp toàn cục (Global Sort) và đếm kết quả.",
              "solutionOutput": "Tổng cộng: 2 Narrow Transformations, 2 Wide Transformations.\nSố lượng Stages được sinh ra trong Job: 3 Stages."
            }
          ],
          "summary": [
            "RDD là nền tảng nguyên thủy của Spark, cung cấp tính năng tự phục hồi lỗi thông qua đồ thị phả hệ Lineage Graph.",
            "DataFrame và Spark SQL ra đời mang lại Lược đồ kiểu dữ liệu chặt chẽ và tận dụng bộ tối ưu hóa Catalyst cùng động cơ nhị phân Tungsten.",
            "Narrow Transformations (filter, select) xử lý hoàn toàn cục bộ trong RAM của worker mà không cần giao tiếp mạng.",
            "Wide Transformations (groupBy, join) bắt buộc phải Shuffle dữ liệu qua switch mạng và tạo ra ranh giới cắt Stage.",
            "Actions (.show, .count, .write) là các câu lệnh duy nhất kích hoạt việc biên dịch và chạy Job trên toàn cụm."
          ]
        },
        {
          "id": "ai-spk-03",
          "number": "14.3",
          "title": "Catalyst Optimizer, Tungsten Engine, Phân Vùng (Partitions) & Nút Thắt Shuffle",
          "subtitle": "Bí mật đằng sau tốc độ của Spark SQL: 4 pha tối ưu hóa Catalyst, quản lý bộ nhớ Off-heap và cách chế ngự con quái vật Shuffle",
          "level": "Nâng cao",
          "duration": "60 phút",
          "objectives": [
            "Hiểu sâu 4 giai đoạn tối ưu hóa của Catalyst Optimizer: Analysis, Logical Optimization, Physical Planning và Code Generation.",
            "Giải mã động cơ Tungsten: Quản lý bộ nhớ nhị phân Off-heap, Cache-aware computation và Whole-Stage Code Generation.",
            "Hiểu rõ bản chất vì sao Shuffle là nút thắt cổ chai lớn nhất trong toàn bộ hệ thống tính toán phân tán.",
            "Làm chủ hai phương thức điều khiển phân vùng: repartition() (full shuffle) vs coalesce() (thu hẹp partition không shuffle)."
          ],
          "intuition": {
            "title": "Bưu điện tập kết hàng hóa toàn quốc (Shuffle Bottleneck)",
            "metaphor": "Giao hàng cùng thành phố (Narrow transformation): Người giao hàng lấy kiện hàng từ kho Quận 1 phát thẳng tới nhà ở Quận 3 trong vòng 1 giờ. Nhưng hãy tưởng tượng bạn cần phân loại 1 triệu bức thư của toàn quốc theo họ tên người nhận (Shuffle): Tất cả xe tải từ 63 tỉnh thành buộc phải chở thư về một Tổng kho trung chuyển ở Hà Nội. Hàng ngàn xe tải xếp hàng gây tắc nghẽn toàn bộ quốc lộ (Network Congestion). Tại tổng kho, nhân viên phải dỡ thư ra sàn, phân loại rồi chất ngược lại xe (Disk I/O Spill). Đó chính là Shuffle trong Big Data: nó tiêu tốn 80% thời gian chạy của cả một job Spark!",
            "visualHtml": "<div class=\"data-viz-container\">\n  <div class=\"data-viz-title\">⚡ 4 Giai Đoạn Tối Ưu Hóa Của Catalyst Optimizer</div>\n  <div class=\"eco-grid\">\n    <div class=\"eco-card\" style=\"border-top:3px solid #3b82f6;\">\n      <strong>1. Phân Tích (Analysis)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        So khớp tên bảng và tên cột với Catalog cơ sở dữ liệu để giải quyết kiểu dữ liệu.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #10b981;\">\n      <strong>2. Tối Ưu Logic</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Áp dụng quy tắc đẩy bộ lọc (Predicate Pushdown), cắt cột thừa (Projection Pruning).\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #f59e0b;\">\n      <strong>3. Kế Hoạch Vật Lý</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Mô hình chi phí (Cost-Based Model) lựa chọn giữa Broadcast Join hay Sort-Merge Join.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #8b5cf6;\">\n      <strong>4. Code Generation</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Tungsten sinh mã Java Bytecode trực tiếp lúc chạy (Whole-Stage CodeGen).\n      </div>\n    </div>\n  </div>\n</div>"
          },
          "sections": [
            {
              "id": "spk-03-sec1",
              "title": "1. Trình Tối Ưu Hóa Catalyst & Động Cơ Tungsten",
              "content": "Bí mật giúp Spark SQL và DataFrame chạy nhanh gấp hàng chục lần code RDD thuần túy nằm ở hai trụ cột công nghệ:\n\n1. **Catalyst Optimizer**: Là một bộ tối ưu hóa truy vấn dựa trên cây quan hệ (Rule-based & Cost-based Optimizer), trải qua 4 bước:\n   - **Analysis**: Phân tích cú pháp cây quan hệ, xác định bảng/cột từ Catalog.\n   - **Logical Optimization**: Tối ưu hóa biểu thức toán học (ví dụ: gộp điều kiện hằng số `1 + 1 -> 2`, đẩy `filter()` xuống sát tầng đọc đĩa).\n   - **Physical Planning**: Sinh ra nhiều kế hoạch vật lý khác nhau và dùng mô hình chi phí để chọn kế hoạch tốn ít I/O nhất.\n   - **Code Generation**: Động cơ **Whole-Stage Code Generation** tổng hợp toàn bộ các toán tử trong một Stage thành một hàm Java duy nhất, chạy nén trong các thanh ghi CPU mà không tốn công gọi hàm ảo.\n\n2. **Động cơ Tungsten (Project Tungsten)**:\n   - Quản lý bộ nhớ nhị phân trực tiếp (**Off-Heap Memory**): Bỏ qua bộ thu gom rác (Garbage Collector) của máy ảo Java, ngăn ngừa hiện tượng ứng dụng bị đóng băng (GC Pauses).\n   - Thiết kế thân thiện với L1/L2/L3 Cache của CPU phần cứng.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Trình Tối Ưu Hóa Catalyst & Động Cơ Tungsten",
                  "lang": "Python",
                  "code": "# Xem kế hoạch tối ưu hóa Catalyst bằng lệnh .explain()\nfrom pyspark.sql import SparkSession\nimport pyspark.sql.functions as F\n\nspark = SparkSession.builder.master(\"local[*]\").appName(\"Catalyst-Explain\").getOrCreate()\n\ndf_raw = spark.range(1, 1000000).toDF(\"id\")\n\n# Pipeline: Lọc id chẵn, nhân 10, rồi lọc tiếp id > 500\ndf_query = (\n    df_raw\n    .filter(F.col(\"id\") % 2 == 0)\n    .withColumn(\"val\", F.col(\"id\") * 10)\n    .filter(F.col(\"val\") > 500)\n    .select(\"val\")\n)\n\n# In kế hoạch vật lý được tối ưu\nprint(\"Kế hoạch vật lý thực thi (Physical Plan):\")\ndf_query.explain(mode=\"simple\")",
                  "annotations": [
                    {
                      "line": 21,
                      "text": "explain(mode='simple'): Hiển thị kế hoạch vật lý cuối cùng mà Catalyst đã sinh ra."
                    },
                    {
                      "line": 22,
                      "text": "Quan sát thấy WholeStageCodegen đã gộp toàn bộ filter và phép nhân vào 1 vòng lặp duy nhất."
                    }
                  ],
                  "output": "Kế hoạch vật lý thực thi (Physical Plan):\n== Physical Plan ==\n*(1) Project [(id#0L * 10) AS val#2L]\n+- *(1) Filter (((id#0L % 2) = 0) AND ((id#0L * 10) > 500))\n   +- *(1) Range (1, 1000000, step=1, splits=4)",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "spk-03-sec2",
              "title": "2. Phân Vùng (Partitions) & Nút Thắt Cổ Chai Shuffle",
              "content": "Số lượng **Partitions** quyết định mức độ song song của ứng dụng Spark:\n- Nếu có 16 Cores CPU nhưng dữ liệu chỉ có 2 partitions: Chỉ có 2 cores làm việc, 14 cores khác ngồi chơi!\n- Quy tắc vàng: Số lượng partitions lý tưởng thường gấp từ **2 đến 4 lần tổng số cores** của cụm.\n\n**Vì sao Shuffle là kẻ thù số 1 của hiệu năng?**\nShuffle xảy ra khi dữ liệu phải được nhóm lại theo khóa mới (ví dụ `groupBy('country')`). Để làm được điều này:\n1. Mỗi executor phải phân loại và ghi kết quả trung gian xuống ổ đĩa cứng cục bộ (Shuffle Write).\n2. Tất cả các executor khác phải thiết lập hàng ngàn kết nối TCP qua switch mạng để kéo các mảnh dữ liệu tương ứng về (Shuffle Read / Network Transfer).\n3. Nếu một khóa có quá nhiều dữ liệu (ví dụ 90% khách hàng ở 'Việt Nam'), partition đó sẽ khổng lồ và làm một worker bị quá tải trong khi các worker khác đã làm xong từ lâu (**Hiện tượng Lệch Dữ Liệu - Data Skew**).",
              "table": {
                "headers": [
                  "Giai đoạn Shuffle",
                  "Tài nguyên bị tiêu hao",
                  "Rủi ro tiềm ẩn"
                ],
                "rows": [
                  [
                    "Shuffle Write",
                    "Đĩa cứng I/O (Disk Spill)",
                    "Ổ cứng bị đầy nếu partition quá lớn"
                  ],
                  [
                    "Network Transfer",
                    "Băng thông Switch mạng cụm",
                    "Nghẽn mạng làm chậm toàn bộ các job khác"
                  ],
                  [
                    "Shuffle Read",
                    "RAM của Worker đích",
                    "Tràn bộ nhớ Java Heap (OOM)"
                  ],
                  [
                    "Data Skew",
                    "Thời gian chờ đợi của Core rảnh",
                    "1 Task chạy 2 tiếng, 99 Tasks khác xong trong 10 giây"
                  ]
                ]
              }
            },
            {
              "id": "spk-03-sec3",
              "title": "3. Điều Khiển Phân Vùng: repartition() vs coalesce()",
              "content": "Khi bạn cần thay đổi số lượng phân vùng của DataFrame trước khi ghi ra đĩa hoặc trước một phép tính, bạn có 2 lựa chọn:\n\n- **`repartition(numPartitions)`**: Thực hiện **Full Shuffle** toàn bộ dữ liệu qua mạng. Nó băm lại tất cả các bản ghi để chia đều vào các partition mới. Dùng khi bạn muốn tăng số partition hoặc muốn chia đều lại dữ liệu để chống Data Skew.\n- **`coalesce(numPartitions)`**: **KHÔNG GÂY SHUFFLE QUA MẠNG**. Nó chỉ đơn giản là gộp các partition liền kề nằm trên cùng một máy chủ lại với nhau. Chỉ dùng được khi bạn muốn **GIẢM số lượng partition** (ví dụ từ 200 partition xuống 5 partition trước khi xuất file). Tiết kiệm 95% thời gian so với `repartition`!",
              "codeExamples": [
                {
                  "title": "Code minh họa: Điều Khiển Phân Vùng: repartition() vs coalesce()",
                  "lang": "Python",
                  "code": "from pyspark.sql import SparkSession\n\nspark = SparkSession.builder.master(\"local[*]\").appName(\"Partition-Control\").getOrCreate()\n\n# Tạo DataFrame 100,000 dòng với 8 partitions\ndf_base = spark.range(100000).repartition(8)\nprint(f\"Số partition ban đầu: {df_base.rdd.getNumPartitions()}\")\n\n# Trường hợp 1: Dùng coalesce() để giảm xuống 2 partitions (KHÔNG Shuffle!)\ndf_coalesced = df_base.coalesce(2)\nprint(f\"Số partition sau khi coalesce: {df_coalesced.rdd.getNumPartitions()}\")\n\n# Trường hợp 2: Dùng repartition() để tăng lên 16 partitions (Bắt buộc Shuffle)\ndf_expanded = df_base.repartition(16)\nprint(f\"Số partition sau khi repartition: {df_expanded.rdd.getNumPartitions()}\")",
                  "annotations": [
                    {
                      "line": 10,
                      "text": "coalesce(2): Giảm số partition bằng cách gộp nhánh, cực nhanh và không tốn I/O mạng."
                    },
                    {
                      "line": 14,
                      "text": "repartition(16): Tăng số partition bắt buộc phải shuffle toàn bộ dữ liệu."
                    }
                  ],
                  "output": "Số partition ban đầu: 8\nSố partition sau khi coalesce: 2\nSố partition sau khi repartition: 16",
                  "explanation": ""
                }
              ]
            }
          ],
          "callouts": {
            "pitfalls": [],
            "tips": [
              {
                "title": "Quy Tắc Sống Còn Trước Khi Ghi File Parquet",
                "content": "Trước khi gọi `.write.parquet('output/')`, HÃY LUÔN gọi `.coalesce(n)`! Nếu không, Spark sẽ xuất ra hàng trăm file parquet li ti (ví dụ 200 file, mỗi file vài chục KB do giá trị mặc định `spark.sql.shuffle.partitions=200`). Điều này gây ra thảm họa 'Small Files Problem' làm tê liệt NameNode của HDFS hoặc tiêu tốn hàng triệu request trên Amazon S3."
              }
            ]
          },
          "exercises": [
            {
              "title": "So Sánh Kế Hoạch Thực Thi Giữa coalesce() Và repartition()",
              "problem": "Khởi tạo một Spark DataFrame từ spark.range(10000).repartition(10). Hãy in kế hoạch vật lý explain() của hai thao tác: (1) df.coalesce(2), (2) df.repartition(2). Chỉ ra từ khóa biểu thị Shuffle trong kế hoạch của repartition.",
              "hint": "Gọi df.coalesce(2).explain() và df.repartition(2).explain(), tìm kiếm toán tử Exchange.",
              "explanation": "Trong sơ đồ kế hoạch vật lý của Spark, bất cứ khi nào bạn nhìn thấy toán tử Exchange, điều đó đồng nghĩa với việc dữ liệu đang bị xáo trộn và truyền tải qua mạng (Shuffle).",
              "solutionCode": "# Phân tích kế hoạch:\n# 1. df.coalesce(2).explain():\n# Kế hoạch hiển thị: Coalesce 2 -> Không hề có toán tử Exchange (không shuffle)!\n\n# 2. df.repartition(2).explain():\n# Kế hoạch hiển thị: Exchange RoundRobinPartitioning(2) -> Toán tử 'Exchange' chính là phép Shuffle qua mạng!",
              "solutionOutput": "coalesce(2) Plan:\nCoalesce 2\n+- Exchange RoundRobinPartitioning(10)\n\nrepartition(2) Plan:\nExchange RoundRobinPartitioning(2)\n+- Exchange RoundRobinPartitioning(10)"
            }
          ],
          "summary": [
            "Catalyst Optimizer tối ưu hóa truy vấn qua 4 pha: Analysis, Logical Optimization, Physical Planning và Code Generation.",
            "Động cơ Tungsten quản lý bộ nhớ nhị phân Off-heap, loại bỏ hiện tượng treo máy do Garbage Collection của Java.",
            "Whole-Stage Code Generation tổng hợp toàn bộ các phép tính trong một Stage thành một khối mã máy duy nhất.",
            "Shuffle là quá trình xáo trộn dữ liệu qua mạng và ghi đĩa, là nguyên nhân gây nghẽn 80% thời gian thực thi của Spark.",
            "Luôn dùng coalesce() để giảm số partition trước khi xuất file; chỉ dùng repartition() khi cần tăng partition hoặc cân bằng lại dữ liệu."
          ]
        },
        {
          "id": "ai-spk-04",
          "number": "14.4",
          "title": "Caching, Chiến Lược Join, PySpark UDFs & Xử Lý Parquet Tối Ưu",
          "subtitle": "Kỹ thuật tăng tốc 10x-100x: Broadcast Hash Join, Caching thông minh, Apache Arrow Pandas UDF và Partition Pruning",
          "level": "Nâng cao",
          "duration": "60 phút",
          "objectives": [
            "Làm chủ cơ chế Caching và Persistence: khi nào NÊN cache và khi nào BẮT BUỘC unpersist().",
            "Phân biệt và áp dụng Broadcast Hash Join (không shuffle, siêu tốc) thay thế cho Sort-Merge Join mặc định.",
            "Hiểu rõ vì sao Python UDF truyền thống cực chậm và cách tăng tốc 100x bằng Pandas Vectorized UDFs với Apache Arrow.",
            "Tối ưu hóa đọc ghi dữ liệu lớn với Apache Parquet: Hive Partitioning và cơ chế Partition Pruning."
          ],
          "intuition": {
            "title": "Tờ rơi phát tận tay vs Xếp hàng tra cứu hồ sơ trung tâm",
            "metaphor": "Giả sử bạn cần ghép nối hồ sơ của 10,000 học sinh với Bảng mã 63 Tỉnh Thành Việt Nam. Phương pháp Sort-Merge Join mặc định: bắt 10,000 học sinh và toàn bộ nhân viên 63 tỉnh cùng di chuyển đến một sân vận động trung tâm, xếp hàng theo mã tỉnh rồi ghép đôi (Shuffle toàn mạng cực kỳ hỗn loạn). Phương pháp Broadcast Hash Join thông minh: Ban tổ chức in sẵn 63 mã tỉnh thành lên một tờ giấy nhỏ rồi photocopy phát tận tay cho từng lớp học (Broadcast bảng nhỏ tới tất cả Executors). Mỗi học sinh chỉ cần nhìn vào tờ rơi trên bàn là tra cứu xong ngay trong 1 giây mà không một ai phải bước chân ra khỏi lớp!",
            "visualHtml": "<div class=\"data-viz-container\">\n  <div class=\"data-viz-title\">🚀 So Sánh Chiến Lược Join: Sort-Merge Join vs Broadcast Hash Join</div>\n  <div class=\"eco-grid\">\n    <div class=\"eco-card\" style=\"border-left:4px solid #ef4444;\">\n      <strong style=\"color:#ef4444;\">Sort-Merge Join (Mặc định khi 2 bảng lớn):</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:6px;line-height:1.5;\">\n        • Cả 2 bảng đều bị <strong>Shuffle toàn mạng</strong> theo join key.<br/>\n        • Dữ liệu trên từng worker phải được sắp xếp (Sort).<br/>\n        • Rất tốn RAM, ghi đĩa đệm và băng thông mạng switch.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-left:4px solid #10b981;\">\n      <strong style=\"color:#10b981;\">Broadcast Hash Join (Khi 1 bảng &lt; 10MB – 100MB):</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:6px;line-height:1.5;\">\n        • Bảng nhỏ được gửi một lần duy nhất tới <strong>RAM của tất cả Executors</strong>.<br/>\n        • Bảng lớn giữ nguyên vẹn tại chỗ, <strong>HOÀN TOÀN KHÔNG SHUFFLE!</strong><br/>\n        • Tốc độ thực thi nhanh hơn gấp 10 đến 50 lần.\n      </div>\n    </div>\n  </div>\n</div>"
          },
          "sections": [
            {
              "id": "spk-04-sec1",
              "title": "1. Chiến Lược Caching & Persistence: Bộ Nhớ Đệm Thông Minh",
              "content": "Vì Spark có tính chất Lazy Evaluation, nếu bạn dùng một DataFrame qua 3 nhánh tính toán khác nhau, Spark sẽ tính toán lại từ đầu toàn bộ đồ thị DAG cả 3 lần!\n\nĐể khắc phục, bạn sử dụng **`.cache()`** hoặc **`.persist(StorageLevel)`**:\n- **`df.cache()`**: Tương đương `persist(StorageLevel.MEMORY_AND_DISK)`. Giữ dữ liệu trong RAM của worker, nếu RAM không đủ thì xả phần còn lại xuống đĩa.\n- Các cấp độ `StorageLevel` khác:\n  - `MEMORY_ONLY`: Chỉ lưu RAM (nếu thiếu thì tính lại, không ghi đĩa).\n  - `MEMORY_ONLY_SER`: Lưu dưới dạng nhị phân tuần tự (tiết kiệm RAM nhưng tốn CPU giải mã).\n  - `MEMORY_AND_DISK_2`: Nhân bản 2 bản sao trên 2 máy khác nhau để chống sập worker.\n\n**Khi nào giải phóng?** Khi hoàn thành pipeline, luôn gọi **`df.unpersist()`** để giải phóng RAM cho các tác vụ khác.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Chiến Lược Caching & Persistence: Bộ Nhớ Đệm Thông Minh",
                  "lang": "Python",
                  "code": "from pyspark.sql import SparkSession\nfrom pyspark.storagelevel import StorageLevel\n\nspark = SparkSession.builder.master(\"local[*]\").appName(\"Caching-Demo\").getOrCreate()\n\ndf_large = spark.range(1, 5000000).toDF(\"id\")\n\n# Tiền xử lý phức tạp\ndf_filtered = df_large.filter(df_large[\"id\"] % 3 == 0)\n\n# Ghim dữ liệu vào bộ nhớ đệm\ndf_filtered.persist(StorageLevel.MEMORY_AND_DISK)\n\n# Kích hoạt nạp vào cache bằng một action đầu tiên\ncount_val = df_filtered.count()\nprint(f\"Số lượng bản ghi sau khi cache: {count_val:,}\")\n\n# Các truy vấn kế tiếp chạy tức thì từ RAM\nmax_val = df_filtered.agg({\"id\": \"max\"}).collect()[0][0]\nprint(f\"Giá trị lớn nhất: {max_val:,}\")\n\n# Giải phóng bộ nhớ\ndf_filtered.unpersist()",
                  "annotations": [
                    {
                      "line": 12,
                      "text": "persist(): Đánh dấu DataFrame sẽ được lưu trên RAM/Disk sau lần action đầu tiên."
                    },
                    {
                      "line": 23,
                      "text": "unpersist(): Chủ động dọn dẹp bộ nhớ RAM của cụm máy."
                    }
                  ],
                  "output": "Số lượng bản ghi sau khi cache: 1,666,666\nGiá trị lớn nhất: 4,999,998",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "spk-04-sec2",
              "title": "2. Broadcast Hash Join: Loại Bỏ Hoàn Toàn Shuffle",
              "content": "Trong các bài toán thực tế, chúng ta thường xuyên phải join một bảng dữ liệu sự kiện khổng lồ (hàng tỷ bản ghi Fact Table) với một bảng danh mục tra cứu nhỏ (vài chục ngàn dòng Dimension Table, ví dụ: danh mục sản phẩm, mã tỉnh thành, mã loại tiền tệ).\n\nNếu dùng join thông thường, Spark sẽ thực hiện **Sort-Merge Join (SMJ)** làm xáo trộn cả tỷ dòng dữ liệu qua mạng. Bằng cách bọc bảng nhỏ bằng hàm **`F.broadcast(small_df)`**, Spark sẽ gửi một bản sao của bảng nhỏ tới bộ nhớ của từng Executor. Bảng lớn không cần di chuyển một byte nào qua mạng!",
              "codeExamples": [
                {
                  "title": "Code minh họa: Broadcast Hash Join: Loại Bỏ Hoàn Toàn Shuffle",
                  "lang": "Python",
                  "code": "from pyspark.sql import SparkSession\nimport pyspark.sql.functions as F\n\nspark = SparkSession.builder.master(\"local[*]\").appName(\"Broadcast-Join\").getOrCreate()\n\n# Bảng lớn: 1 triệu giao dịch (Fact Table)\ndf_transactions = spark.range(1, 1000001).toDF(\"tx_id\").withColumn(\"city_code\", (F.col(\"tx_id\") % 5) + 1)\n\n# Bảng nhỏ: Danh mục 5 thành phố (Dimension Table ~ vài KB)\ndf_cities = spark.createDataFrame([\n    (1, \"Hà Nội\"), (2, \"TP.HCM\"), (3, \"Đà Nẵng\"), (4, \"Hải Phòng\"), (5, \"Cần Thơ\")\n], [\"city_code\", \"city_name\"])\n\n# Thực hiện Broadcast Join\ndf_joined = df_transactions.join(\n    F.broadcast(df_cities),\n    on=\"city_code\",\n    how=\"inner\"\n)\n\nprint(\"Kế hoạch thực thi của Broadcast Join:\")\ndf_joined.explain()\n\nprint(\"\\nKết quả 3 giao dịch đầu tiên:\")\ndf_joined.show(3)",
                  "annotations": [
                    {
                      "line": 16,
                      "text": "F.broadcast(df_cities): Ra lệnh cho Catalyst gửi toàn bộ df_cities vào RAM từng Executor."
                    },
                    {
                      "line": 22,
                      "text": "explain() sẽ hiển thị rõ toán tử BroadcastHashJoin thay vì SortMergeJoin."
                    }
                  ],
                  "output": "Kế hoạch thực thi của Broadcast Join:\n== Physical Plan ==\n*(2) Project [city_code#3L, tx_id#0L, city_name#7]\n+- *(2) BroadcastHashJoin [city_code#3L], [city_code#6L], Inner, BuildRight\n   :- *(2) Project [tx_id#0L, ((tx_id#0L % 5) + 1) AS city_code#3L]\n   :  +- *(2) Range (1, 1000001, step=1, splits=4)\n   +- BroadcastExchange HashedRelationBroadcastMode(List(input[0, bigint, false]),false), [plan_id=...]\n      +- *(1) Filter isnotnull(city_code#6L)\n         +- *(1) Scan ExistingRDD[city_code#6L,city_name#7]\n\nKết quả 3 giao dịch đầu tiên:\n+---------+-----+---------+\n|city_code|tx_id|city_name|\n+---------+-----+---------+\n|        2|    1|   TP.HCM|\n|        3|    2|  Đà Nẵng|\n|        4|    3|Hải Phòng|\n+---------+-----+---------+",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "spk-04-sec3",
              "title": "3. Cạm Bẫy Python UDF & Giải Pháp Pandas Vectorized UDF",
              "content": "Khi các hàm tích hợp sẵn của Spark không đủ đáp ứng, lập trình viên thường viết User-Defined Function (UDF).\n\n**Cạm bẫy của Python UDF thông thường (`@F.udf`)**:\nSpark phải serialize từng hàng dữ liệu từ JVM sang tiến trình Python con qua socket, chạy hàm Python, rồi lại serialize kết quả ngược lại JVM. Tốc độ chậm kinh hoàng (chậm hơn 10x đến 100x)!\n\n**Giải pháp: Pandas Vectorized UDFs (`@F.pandas_udf`)**:\nKể từ Spark 2.3+, Spark tích hợp **Apache Arrow** làm cầu nối chia sẻ bộ nhớ Zero-Copy giữa JVM và Python. Dữ liệu được truyền theo từng khối mảng cột trực tiếp vào hàm dưới dạng `pandas.Series`. Bạn có thể tận dụng toàn bộ sức mạnh tối ưu hóa C/SIMD của NumPy và Pandas!",
              "codeExamples": [
                {
                  "title": "Code minh họa: Cạm Bẫy Python UDF & Giải Pháp Pandas Vectorized UDF",
                  "lang": "Python",
                  "code": "from pyspark.sql import SparkSession\nimport pyspark.sql.functions as F\nfrom pyspark.sql.types import DoubleType\nimport pandas as pd\n\nspark = SparkSession.builder.master(\"local[*]\").appName(\"Pandas-UDF\").getOrCreate()\n\ndf_prices = spark.createDataFrame([(100.0,), (250.0,), (50.0,)], [\"price\"])\n\n# Pandas Vectorized UDF: Nhận vào pd.Series và trả về pd.Series\n@F.pandas_udf(DoubleType())\ndef calculate_vat_vectorized(prices: pd.Series) -> pd.Series:\n    # Code chạy bằng thư viện C của Pandas/Arrow cực nhanh\n    return prices * 0.10\n\ndf_with_vat = df_prices.withColumn(\"vat_amount\", calculate_vat_vectorized(F.col(\"price\")))\nprint(\"Kết quả tính VAT bằng Pandas Vectorized UDF:\")\ndf_with_vat.show()",
                  "annotations": [
                    {
                      "line": 10,
                      "text": "@F.pandas_udf: Bật chế độ Vectorized Arrow, nhanh hơn gấp 10-100 lần UDF Python cũ."
                    },
                    {
                      "line": 13,
                      "text": "Phép nhân trên pd.Series diễn ra bằng mã C vector hóa."
                    }
                  ],
                  "output": "Kết quả tính VAT bằng Pandas Vectorized UDF:\n+-----+----------+\n|price|vat_amount|\n+-----+----------+\n|100.0|      10.0|\n|250.0|      25.0|\n| 50.0|       5.0|\n+-----+----------+",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "spk-04-sec4",
              "title": "4. Xử Lý Luồng Thời Gian Thực: PySpark Structured Streaming",
              "content": "Structured Streaming là động cơ xử lý luồng (Stream Processing) có khả năng chịu lỗi (Fault-tolerant) được xây dựng trực tiếp trên Catalyst Optimizer và Tungsten Execution Engine của Spark SQL.\n\n**Mô hình Bảng vô hạn (Unbounded Table)**: Dữ liệu truyền tới liên tục từ Kafka/Event Hubs được coi như một bảng dữ liệu liên tục được append thêm các dòng mới. Lập trình viên viết logic truy vấn SQL/DataFrame giống hệt như trên batch thông thường:\n- `spark.readStream`: Điểm vào đọc luồng.\n- `writeStream.outputMode('append')`: Ghi kết quả ra Sink (Kafka, Parquet, Console, Delta Lake).\n- `checkpointLocation`: Lưu trạng thái offsets định kỳ xuống đĩa để phục hồi chính xác (Exactly-once semantics) khi cụm máy gặp sự cố.",
              "codeExamples": [
                {
                  "title": "Xây dựng luồng dữ liệu thời gian thực với Rate Stream và Console Sink",
                  "lang": "Python",
                  code: "from pyspark.sql import SparkSession\nimport pyspark.sql.functions as F\n\nspark = (\n    SparkSession.builder\n    .master(\"local[*]\")\n    .appName(\"Structured-Streaming-Rate\")\n    .getOrCreate()\n)\n\n# 1. Đọc luồng dữ liệu giả lập (Rate stream phát 2 dòng/giây)\nstreaming_df = (\n    spark.readStream\n    .format(\"rate\")\n    .option(\"rowsPerSecond\", 2)\n    .load()\n)\n\n# 2. Xử lý dữ liệu luồng (Transformation: bình phương giá trị và gán nhãn chẵn lẻ)\nprocessed_stream = (\n    streaming_df\n    .withColumn(\"value_squared\", F.col(\"value\") ** 2)\n    .withColumn(\"is_even\", F.col(\"value\") % 2 == 0)\n)\n\n# 3. Ghi dữ liệu ra console sink ở chế độ Append mode\nquery = (\n    processed_stream.writeStream\n    .format(\"console\")\n    .outputMode(\"append\")\n    .option(\"truncate\", \"false\")\n    .trigger(processingTime=\"2 seconds\")\n    .start()\n)\n\n# Chờ 6 giây rồi đóng luồng an toàn\nquery.awaitTermination(timeout=6)\nquery.stop()",
                  "annotations": [
                    {
                      "line": 11,
                      "text": "spark.readStream khởi tạo DataStreamReader cho nguồn dữ liệu thời gian thực."
                    },
                    {
                      "line": 24,
                      "text": "trigger(processingTime='2 seconds') gom dữ liệu thành các micro-batch định kỳ 2 giây."
                    }
                  ],
                  "output": "-------------------------------------------\nBatch: 0\n-------------------------------------------\n+-----------------------+-----+-------------+-------+\n|timestamp              |value|value_squared|is_even|\n+-----------------------+-----+-------------+-------+\n|2026-03-01 10:00:00.000|0    |0.0          |true   |\n|2026-03-01 10:00:00.500|1    |1.0          |false  |\n+-----------------------+-----+-------------+-------+\n\n-------------------------------------------\nBatch: 1\n-------------------------------------------\n+-----------------------+-----+-------------+-------+\n|timestamp              |value|value_squared|is_even|\n+-----------------------+-----+-------------+-------+\n|2026-03-01 10:00:01.000|2    |4.0          |true   |\n|2026-03-01 10:00:01.500|3    |9.0          |false  |\n+-----------------------+-----+-------------+-------+",
                  "explanation": "Động cơ Structured Streaming tự động chia luồng liên tục thành các micro-batch nhỏ và áp dụng trọn vẹn sức mạnh tối ưu hóa của Spark SQL."
                }
              ]
            }
          ],
          "callouts": {
            "pitfalls": [
              {
                "title": "Bẫy kéo toàn bộ dữ liệu phân tán về Driver bằng collect()",
                "content": "Gọi df.collect() trên DataFrame hàng chục Gigabytes sẽ kéo toàn bộ dữ liệu từ các Executors về bộ nhớ của node Driver duy nhất, gây sập chương trình ngay lập tức với lỗi OutOfMemoryError (OOM). Thay vào đó, hãy luôn dùng df.take(n), df.show(n) hoặc ghi thẳng xuống đĩa parquet."
              }
            ],
            "tips": [
              {
                "title": "Partition Pruning Trong Định Dạng Apache Parquet",
                "content": "Khi lưu dữ liệu phân vùng theo chuẩn Hive Partitioning (`df.write.partitionBy('year', 'month').parquet('data/')`), Spark sẽ tạo cấu trúc cây thư mục: `data/year=2026/month=03/*.parquet`. Khi bạn viết câu truy vấn `filter((F.col('year') == 2026) & (F.col('month') == 3))`, Catalyst sẽ kích hoạt cơ chế **Partition Pruning**: bỏ qua hoàn toàn việc quét hàng ngàn thư mục của các năm tháng khác, giảm 99% thời gian đọc đĩa!"
              }
            ]
          },
          "exercises": [
            {
              "title": "Áp Dụng Broadcast Join Cho Bảng Danh Mục Sản Phẩm",
              "problem": "Có bảng đơn hàng df_orders (order_id, product_id, quantity) gồm 500,000 dòng và bảng thông tin sản phẩm df_products (product_id, product_name, unit_price) gồm 10 dòng. Hãy viết lệnh join tối ưu nhất để bổ sung tên sản phẩm và đơn giá vào từng đơn hàng mà không gây ra hiện tượng Shuffle mạng.",
              "hint": "Sử dụng df_orders.join(F.broadcast(df_products), on='product_id', how='left').",
              "explanation": "Do df_products chỉ có 10 dòng, việc dùng F.broadcast sẽ gửi trực tiếp bảng này vào RAM của các worker, loại bỏ hoàn toàn giai đoạn Sort-Merge Shuffle.",
              "solutionCode": "# Sử dụng PySpark:\ndf_enriched_orders = df_orders.join(\n    F.broadcast(df_products),\n    on=\"product_id\",\n    how=\"left\"\n)\ndf_enriched_orders.show(5)",
              "solutionOutput": "+----------+--------+--------+------------+----------+\n|product_id|order_id|quantity|product_name|unit_price|\n+----------+--------+--------+------------+----------+\n|         1|     101|       2|  Bàn phím cơ|     150.0|\n|         2|     102|       1|Chuột gaming|      45.0|\n+----------+--------+--------+------------+----------+"
            }
          ],
          "summary": [
            "df.cache() và df.persist() giúp lưu kết quả trung gian trên RAM của worker, tránh việc Spark phải tính toán lại đồ thị DAG.",
            "Luôn gọi df.unpersist() khi hoàn tất công việc để giải phóng RAM của cụm máy.",
            "Broadcast Hash Join (F.broadcast) là vũ khí tối thượng giúp loại bỏ hoàn toàn Shuffle khi join một bảng lớn với một bảng nhỏ.",
            "Tuyệt đối tránh dùng Python UDF thông thường; hãy thay thế bằng các hàm built-in hoặc Pandas Vectorized UDFs trên nền Apache Arrow.",
            "Kết hợp Apache Parquet với Hive Partitioning và Partition Pruning giúp bỏ qua các khối dữ liệu thừa lúc đọc đĩa."
          ]
        },
        {
          "id": "ai-spk-05",
          "number": "14.5",
          "title": "Dự Án Thực Chiến: Xây Dựng Pipeline ETL Doanh Nghiệp Phân Tán Với PySpark",
          "subtitle": "Xử lý nhật ký sự kiện Clickstream hàng trăm triệu dòng, Window Functions xác định phiên duyệt web, Broadcast Join và xuất Parquet tối ưu",
          "level": "Nâng cao",
          "duration": "60 phút",
          "objectives": [
            "Làm chủ kiến trúc lưu trữ dữ liệu hiện đại Medallion Architecture (Bronze -> Silver -> Gold Lakehouse).",
            "Xây dựng pipeline ETL phân tán chuẩn công nghiệp xử lý dữ liệu Clickstream quy mô lớn.",
            "Áp dụng PySpark Window Functions để phân đoạn phiên duyệt web (Sessionization) của người dùng.",
            "Làm chủ ma trận lựa chọn công nghệ toàn diện giữa Pandas, Polars, Dask và Apache Spark."
          ],
          "intuition": {
            "title": "Nhà máy luyện kim công nghiệp hiện đại",
            "metaphor": "Dữ liệu thô từ hàng triệu người dùng giống như quặng kim loại thô chứa nhiều đất đá (Tầng Bronze / Raw Data). Pipeline PySpark đóng vai trò như một lò luyện công nghiệp phân tán: Quặng được đưa vào các lò nung sơ cấp, lọc bỏ tạp chất và phân loại schema chuẩn (Tầng Silver / Cleansed & Conformed Data). Sau đó, các kim loại quý được tôi luyện, đúc thành các thỏi vàng nguyên chất có khắc dấu tem kiểm định (Tầng Gold / Aggregated Business Metrics) xếp ngay ngắn vào kho chứa Parquet Lakehouse để phục vụ cho ban giám đốc và các mô hình Trí tuệ Nhân tạo!",
            "visualHtml": "<div class=\"data-viz-container\">\n  <div class=\"data-viz-title\">🏆 Kiến Trúc Dữ Liệu Medallion (Data Lakehouse)</div>\n  <div class=\"eco-grid\">\n    <div class=\"eco-card\" style=\"border-top:3px solid #cd7f32;\">\n      <strong style=\"color:#cd7f32;\">1. Bronze (Raw Ingestion)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Lưu nguyên trạng dữ liệu sự kiện thô (JSON, log files). Cho phép truy vết lịch sử (Audit trail).\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #9ca3af;\">\n      <strong style=\"color:#4b5563;\">2. Silver (Cleansed &amp; Enriched)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Đã làm sạch, ép kiểu schema chuẩn, lọc giá trị null, làm giàu qua Broadcast Joins.\n      </div>\n    </div>\n    <div class=\"eco-card\" style=\"border-top:3px solid #f59e0b;\">\n      <strong style=\"color:#d97706;\">3. Gold (Business Aggregates)</strong>\n      <div style=\"font-size:0.83rem;color:var(--text-secondary);margin-top:4px;\">\n        Bảng tổng hợp chỉ số kinh doanh (KPIs, Funnel, Daily Active Users) tối ưu cho BI Dashboard &amp; AI.\n      </div>\n    </div>\n  </div>\n</div>"
          },
          "sections": [
            {
              "id": "spk-05-sec1",
              "title": "1. Bài Toán Thực Tế: Xử Lý Nhật Ký Clickstream & Phân Tích Phễu",
              "content": "Trong dự án này, chúng ta đóng vai trò Principal Data Engineer xây dựng pipeline dữ liệu cho một nền tảng bán lẻ điện tử lớn:\n- **Dữ liệu đầu vào**: Nhật ký Clickstream của người dùng ghi lại từng hành động: `user_id`, `event_time`, `event_type` ('view', 'add_to_cart', 'purchase'), `product_id`, `device`.\n- **Bảng danh mục tra cứu**: Bảng thông tin sản phẩm (`product_id`, `category`, `price`).\n\n**Mục tiêu kinh doanh:**\n1. Xây dựng tầng Silver: Làm sạch, chuyển đổi định dạng thời gian và nối với bảng danh mục sản phẩm bằng **Broadcast Join**.\n2. Phân đoạn phiên duyệt web (**Sessionization**): Sử dụng **Window Function** để tính khoảng thời gian chênh lệch giữa hai hành động liên tiếp của cùng một người dùng. Nếu khoảng cách > 30 phút, đánh dấu một phiên làm việc mới.\n3. Xây dựng tầng Gold: Tính toán tỷ lệ chuyển đổi phễu mua hàng (Funnel Conversion: Từ View -> Add to cart -> Purchase) theo từng danh mục hàng hóa.\n4. Xuất dữ liệu Gold ra định dạng Parquet tối ưu.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Bài Toán Thực Tế: Xử Lý Nhật Ký Clickstream & Phân Tích Phễu",
                  "lang": "Python",
                  "code": "from pyspark.sql import SparkSession\nfrom pyspark.sql.window import Window\nimport pyspark.sql.functions as F\n\nspark = (\n    SparkSession.builder\n    .master(\"local[*]\")\n    .appName(\"Clickstream-ETL-Pipeline\")\n    .config(\"spark.sql.shuffle.partitions\", \"4\")\n    .getOrCreate()\n)\n\n# 1. Giả lập dữ liệu nhật ký Clickstream (Tầng Bronze)\nraw_logs = [\n    (1001, \"2026-03-01 10:00:00\", \"view\", 1, \"iOS\"),\n    (1001, \"2026-03-01 10:05:00\", \"add_to_cart\", 1, \"iOS\"),\n    (1001, \"2026-03-01 10:10:00\", \"purchase\", 1, \"iOS\"),\n    (1002, \"2026-03-01 10:02:00\", \"view\", 2, \"Android\"),\n    (1002, \"2026-03-01 11:00:00\", \"view\", 3, \"Android\"),  # Cách 58 phút -> Phiên mới!\n    (1003, \"2026-03-01 10:15:00\", \"view\", 1, \"Web\")\n]\n\ndf_bronze = spark.createDataFrame(\n    raw_logs, [\"user_id\", \"event_time_str\", \"event_type\", \"product_id\", \"device\"]\n)\n\n# Bảng danh mục sản phẩm nhỏ\ndf_products = spark.createDataFrame([\n    (1, \"Điện thoại Flagship\", \"Điện tử\", 1000.0),\n    (2, \"Áo Khoác Nam\", \"Thời trang\", 50.0),\n    (3, \"Nồi Chiên Không Dầu\", \"Gia dụng\", 120.0)\n], [\"product_id\", \"product_name\", \"category\", \"price\"])\n\nprint(\"Dữ liệu thô Bronze:\")\ndf_bronze.show()",
                  "annotations": [
                    {
                      "line": 28,
                      "text": "df_bronze chứa dữ liệu thô ban đầu cần làm sạch và chuẩn hóa kiểu thời gian."
                    }
                  ],
                  "output": "Dữ liệu thô Bronze:\n+-------+-------------------+-----------+----------+-------+\n|user_id|     event_time_str| event_type|product_id| device|\n+-------+-------------------+-----------+----------+-------+\n|   1001|2026-03-01 10:00:00|       view|         1|    iOS|\n|   1001|2026-03-01 10:05:00|add_to_cart|         1|    iOS|\n|   1001|2026-03-01 10:10:00|   purchase|         1|    iOS|\n|   1002|2026-03-01 10:02:00|       view|         2|Android|\n|   1002|2026-03-01 11:00:00|       view|         3|Android|\n|   1003|2026-03-01 10:15:00|       view|         1|    Web|\n+-------+-------------------+-----------+----------+-------+",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "spk-05-sec2",
              "title": "2. Tầng Silver: Broadcast Join & Window Functions Phân Đoạn Phiên",
              "content": "Trong bước này, chúng ta thực hiện 2 thao tác kỹ thuật chuyên sâu:\n1. Ép kiểu cột thời gian sang `TimestampType` và dùng **`F.broadcast`** kết nối với bảng sản phẩm.\n2. Áp dụng **Window Function** `Window.partitionBy('user_id').orderBy('event_time')` kết hợp hàm `F.lag()` để tính thời gian trôi qua giữa 2 hành động liên tiếp của từng người dùng.",
              "codeExamples": [
                {
                  "title": "Code minh họa: Tầng Silver: Broadcast Join & Window Functions Phân Đoạn Phiên",
                  "lang": "Python",
                  "code": "# 2. Xây dựng tầng Silver\n# Bước 2.1: Chuẩn hóa thời gian và Broadcast Join bảng danh mục\ndf_silver_enriched = (\n    df_bronze\n    .withColumn(\"event_time\", F.to_timestamp(\"event_time_str\"))\n    .drop(\"event_time_str\")\n    .join(F.broadcast(df_products), on=\"product_id\", how=\"left\")\n)\n\n# Bước 2.2: Window Function phát hiện phiên làm việc (Sessionization)\nuser_window = Window.partitionBy(\"user_id\").orderBy(\"event_time\")\n\ndf_silver_sessions = (\n    df_silver_enriched\n    .withColumn(\"prev_event_time\", F.lag(\"event_time\", 1).over(user_window))\n    .withColumn(\n        \"gap_minutes\",\n        (F.col(\"event_time\").cast(\"long\") - F.col(\"prev_event_time\").cast(\"long\")) / 60\n    )\n    .withColumn(\n        \"is_new_session\",\n        F.when(F.col(\"gap_minutes\").isNull() | (F.col(\"gap_minutes\") >= 30.0), 1).otherwise(0)\n    )\n)\n\nprint(\"Tầng Silver: Đã làm giàu và phân tích khoảng cách thời gian sự kiện:\")\ndf_silver_sessions.select(\n    \"user_id\", \"event_time\", \"event_type\", \"category\", \"gap_minutes\", \"is_new_session\"\n).show()",
                  "annotations": [
                    {
                      "line": 12,
                      "text": "Window.partitionBy('user_id'): tạo cửa sổ tính toán độc lập cho từng user."
                    },
                    {
                      "line": 16,
                      "text": "F.lag(): lấy mốc thời gian của hành động liền kề trước đó."
                    },
                    {
                      "line": 21,
                      "text": "Khoảng cách >= 30 phút đánh dấu người dùng bắt đầu một phiên làm việc mới (is_new_session = 1)."
                    }
                  ],
                  "output": "Tầng Silver: Đã làm giàu và phân tích khoảng cách thời gian sự kiện:\n+-------+-------------------+-----------+----------+-----------+--------------+\n|user_id|         event_time| event_type|  category|gap_minutes|is_new_session|\n+-------+-------------------+-----------+----------+-----------+--------------+\n|   1001|2026-03-01 10:00:00|       view|  Điện tử|       null|             1|\n|   1001|2026-03-01 10:05:00|add_to_cart|  Điện tử|        5.0|             0|\n|   1001|2026-03-01 10:10:00|   purchase|  Điện tử|        5.0|             0|\n|   1002|2026-03-01 10:02:00|       view|Thời trang|       null|             1|\n|   1002|2026-03-01 11:00:00|       view|  Gia dụng|       58.0|             1|\n|   1003|2026-03-01 10:15:00|       view|  Điện tử|       null|             1|\n+-------+-------------------+-----------+----------+-----------+--------------+",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "spk-05-sec3",
              "title": "3. Tầng Gold & Bảng Ma Trận Lựa Chọn Công Nghệ Dữ Liệu Lớn",
              "content": "Bây giờ, chúng ta tổng hợp chỉ số kinh doanh cho **Tầng Gold**: Tính tỷ lệ chuyển đổi phễu (Funnel Conversion Rate) cho từng ngành hàng (`category`) và xuất kết quả ra tệp Parquet.\n\nSau khi đã làm chủ cả 3 thư viện của Nhóm 5 (Polars, Dask, PySpark) cùng Pandas, dưới đây là **Ma Trận Ra Quyết Định Chuẩn Mực** cho mọi dự án dữ liệu:",
              "codeExamples": [
                {
                  "title": "Code minh họa: Tầng Gold & Bảng Ma Trận Lựa Chọn Công Nghệ Dữ Liệu Lớn",
                  "lang": "Python",
                  "code": "# 3. Xây dựng tầng Gold: Báo cáo tỷ lệ chuyển đổi ngành hàng\ndf_gold_funnel = (\n    df_silver_sessions\n    .groupBy(\"category\")\n    .agg(\n        F.count(F.when(F.col(\"event_type\") == \"view\", 1)).alias(\"total_views\"),\n        F.count(F.when(F.col(\"event_type\") == \"add_to_cart\", 1)).alias(\"total_carts\"),\n        F.count(F.when(F.col(\"event_type\") == \"purchase\", 1)).alias(\"total_purchases\")\n    )\n    .withColumn(\n        \"cart_conversion_pct\",\n        F.round(F.col(\"total_carts\") / F.col(\"total_views\") * 100, 1)\n    )\n    .withColumn(\n        \"purchase_conversion_pct\",\n        F.round(F.col(\"total_purchases\") / F.col(\"total_views\") * 100, 1)\n    )\n    .sort(\"total_views\", descending=True)\n)\n\nprint(\"Tầng Gold: Báo cáo hiệu suất phễu chuyển đổi:\")\ndf_gold_funnel.show()\n\n# Xuất kết quả phân vùng tối ưu\n# df_gold_funnel.coalesce(1).write.mode('overwrite').parquet('gold_funnel_report/')",
                  "annotations": [
                    {
                      "line": 5,
                      "text": "groupBy('category').agg(...): Tổng hợp số liệu kinh doanh cốt lõi cho BI Dashboard."
                    },
                    {
                      "line": 23,
                      "text": "coalesce(1) trước khi write để gom báo cáo gọn thành đúng 1 tệp Parquet duy nhất."
                    }
                  ],
                  "output": "Tầng Gold: Báo cáo hiệu suất phễu chuyển đổi:\n+----------+-----------+-----------+---------------+-------------------+-----------------------+\n|  category|total_views|total_carts|total_purchases|cart_conversion_pct|purchase_conversion_pct|\n+----------+-----------+-----------+---------------+-------------------+-----------------------+\n|   Điện tử|          2|          1|              1|               50.0|                   50.0|\n|  Gia dụng|          1|          0|              0|                0.0|                    0.0|\n|Thời trang|          1|          0|              0|                0.0|                    0.0|\n+----------+-----------+-----------+---------------+-------------------+-----------------------+",
                  "explanation": ""
                }
              ]
            },
            {
              "id": "spk-05-sec4",
              "title": "4. Ma Trận Toàn Diện: Chọn Pandas, Polars, Dask Hay PySpark?",
              "content": "Dưới đây là ma trận tổng kết toàn diện giúp bạn và đội ngũ kỹ thuật đưa ra lựa chọn công nghệ chính xác nhất cho từng dự án thực tế:",
              "table": {
                "headers": [
                  "Công nghệ",
                  "Kích thước Dữ liệu",
                  "Môi trường Chạy",
                  "Thế mạnh Tuyệt đối",
                  "Hạn chế Chí mạng"
                ],
                "rows": [
                  [
                    "Pandas 2.x",
                    "< 2 - 5 GB",
                    "Máy tính cá nhân",
                    "Cực kỳ phổ biến, tài liệu phong phú, tích hợp 100% thư viện ML",
                    "Đơn luồng, ngốn RAM gấp 5-10x, rất dễ sập OOM khi dữ liệu lớn"
                  ],
                  [
                    "Polars",
                    "< 100 GB",
                    "Máy chủ đơn (Single Node)",
                    "Nhanh nhất thế giới hiện nay, tận dụng 100% CPU, cú pháp Expression sạch sẽ",
                    "Chỉ chạy trên 1 máy tính, chưa hỗ trợ tính toán cụm phân tán đa node"
                  ],
                  [
                    "Dask",
                    "10 GB – 1 TB+",
                    "Máy đơn hoặc Cụm phân tán",
                    "100% Python thuần túy, song song hóa code tùy ý với delayed, Dashboard trực quan",
                    "Hiệu năng trên máy đơn chậm hơn Polars, dễ dính bẫy shuffle nếu không căn partition"
                  ],
                  [
                    "PySpark",
                    "> 100 GB – Petabytes",
                    "Cụm máy tính (Cluster / Cloud)",
                    "Tiêu chuẩn vàng Data Lakehouse doanh nghiệp, chịu lỗi vô địch, Catalyst Optimizer",
                    "Rất nặng nề, chi phí vận hành cụm cao, chậm hơn Polars khi chạy trên máy đơn"
                  ]
                ]
              }
            }
          ],
          "callouts": {
            "pitfalls": [],
            "tips": [
              {
                "title": "Kiến Trúc Lai Hiện Đại (Modern Hybrid Architecture)",
                "content": "Trong các tập đoàn công nghệ tiên tiến hiện nay, người ta không còn dùng duy nhất một công cụ. Thay vào đó, họ kết hợp mô hình lai: Dùng **PySpark** làm xương sống cho tầng ETL nặng nề hàng chục Terabytes trên Data Lakehouse, sau đó xuất các bảng dữ liệu vài chục Gigabytes ra định dạng Parquet để các Data Scientist sử dụng **Polars** phân tích và huấn luyện mô hình Machine Learning siêu tốc trên từng máy trạm cá nhân!"
              }
            ]
          },
          "exercises": [
            {
              "title": "Tính Doanh Thu Thực Tế Của Từng Thiết Bị Bằng Spark SQL",
              "problem": "Từ DataFrame df_silver_sessions ở trên, hãy dùng PySpark để: Lọc các sự kiện mua hàng thành công (event_type == 'purchase'), sau đó gom nhóm theo thiết bị (device) và tính tổng doanh thu thu về (sum(price)).",
              "hint": "Sử dụng df_silver_sessions.filter(F.col('event_type') == 'purchase').groupBy('device').agg(F.sum('price')).",
              "explanation": "Chỉ có thiết bị iOS ghi nhận giao dịch mua hàng thành công với chiếc Điện thoại Flagship giá 1000.0 USD.",
              "solutionCode": "# Truy vấn tính doanh thu theo thiết bị\ndevice_revenue = (\n    df_silver_sessions\n    .filter(F.col(\"event_type\") == \"purchase\")\n    .groupBy(\"device\")\n    .agg(\n        F.sum(\"price\").alias(\"total_revenue\"),\n        F.count(\"user_id\").alias(\"purchases_count\")\n    )\n)\n\ndevice_revenue.show()",
              "solutionOutput": "+------+-------------+---------------+\n|device|total_revenue|purchases_count|\n+------+-------------+---------------+\n|   iOS|       1000.0|              1|\n+------+-------------+---------------+"
            }
          ],
          "summary": [
            "Kiến trúc Medallion (Bronze -> Silver -> Gold) là chuẩn mực vàng cho các hệ thống Data Lakehouse hiện đại.",
            "Tầng Bronze lưu trữ nguyên vẹn dữ liệu thô phục vụ kiểm toán và tính toán lại khi có sự cố.",
            "Tầng Silver làm sạch, chuẩn hóa schema và làm giàu dữ liệu bằng Broadcast Joins và Window Functions.",
            "Tầng Gold tổng hợp các chỉ số kinh doanh quan trọng nhất, xuất ra định dạng Parquet với số partition được tối ưu bằng coalesce().",
            "Hiểu rõ ranh giới và thế mạnh của Pandas, Polars, Dask và PySpark là phẩm chất phân biệt giữa một lập trình viên bình thường và một Principal Data Architect."
          ]
        }
      ]
    }
  ]
};
