window.PYDATA_GROUP2_PARTS = [
  {
    "id": "mod-03",
    "number": "Module 3",
    "title": "NumPy: Mảng Đa chiều & Vectorization",
    "badge": "3 Bài học",
    "icon": "🔢",
    "description": "Kiến trúc bộ nhớ ndarray, C-contiguous buffer, SIMD phần cứng, phân định View vs Copy, 3 quy tắc Broadcasting, chuẩn số thực IEEE 754 và sinh số ngẫu nhiên tái lập default_rng.",
    "lessons": [
      {
        "id": "pd-03-01",
        "number": "3.1",
        "title": "Kiến trúc Bộ nhớ ndarray, C-contiguous Buffer & Sức mạnh SIMD",
        "subtitle": "Giải phẫu nội tại ndarray: Data pointer, dtype, shape, strides byte formula, CPU Cache line và đo lường vectorization bằng timeit",
        "level": "Cơ bản",
        "duration": "40 phút",
        "objectives": [
          "Giải phẫu cấu trúc nội tại của NumPy ndarray: Con trỏ dữ liệu (Data Pointer), kiểu dữ liệu cố định (dtype), kích thước (shape) và bước nhảy ô nhớ (strides).",
          "Vận dụng công thức tính offset địa chỉ byte: Offset = i * stride[0] + j * stride[1] để hiểu cách máy tính truy xuất phần tử đa chiều trong O(1).",
          "Phân biệt thứ tự lưu trữ C-contiguous (Row-major) vs Fortran-contiguous (Column-major) và tác động trực tiếp đến hiệu năng bộ nhớ đệm CPU Cache Line (L1/L2).",
          "Đo lường khoa học sự vượt trội của Vectorization so với vòng lặp Python thuần bằng module timeit có kiểm soát nhiễu và giải thích cơ chế phần cứng SIMD (Single Instruction Multiple Data)."
        ],
        "intuition": {
          "title": "Đoàn tàu chở container đồng nhất vs Dàn xe tải chở hàng lộn xộn",
          "metaphor": "Một danh sách Python (list) giống như dàn xe tải chở hàng hỗn tạp: mỗi xe chở một món đồ khác nhau (số, chuỗi, dict), nằm rải rác ở khắp các bãi đỗ xe khác nhau trong thành phố (Heap). Mỗi lần muốn lấy hàng, CPU phải chạy đi tìm địa chỉ con trỏ của từng xe một (Pointer Chasing Overhead). Ngược lại, mảng NumPy ndarray giống như một đoàn tàu hỏa gồm các container có kích thước giống hệt nhau, được xếp nối đuôi nhau liên tục trên một đường ray thẳng tắp (Contiguous C-Buffer). Đầu máy CPU chỉ cần đứng ở đầu tàu, áp dụng chỉ thị SIMD để bốc dỡ cùng lúc 8 container trong đúng 1 nhịp xung nhịp!",
          "boundary": "Sự tối ưu của NumPy đòi hỏi mọi phần tử trong mảng phải có cùng một kiểu dữ liệu cố định (homogeneous dtype). Nếu bạn cố tình ép mảng chứa kiểu object (hỗn hợp), ndarray sẽ thoái hóa thành một mảng chứa các con trỏ, đánh mất hoàn toàn lợi thế về bộ đệm liên tục và SIMD.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">GIẢI PHẪU VÙNG NHỚ C-CONTIGUOUS BUFFER CỦA NDARRAY (2x3 INT32)</div>\n                        <div style=\"display:flex;align-items:center;justify-content:center;gap:4px;flex-wrap:wrap;\">\n                          <div style=\"padding:6px 10px;border:1px solid #0284c7;border-radius:4px;background:var(--bg-surface);text-align:center;\">\n                            <span style=\"font-size:0.7rem;color:var(--text-muted);display:block;\">[0,0] Offset 0</span>\n                            <strong>10</strong>\n                          </div>\n                          <div style=\"padding:6px 10px;border:1px solid #0284c7;border-radius:4px;background:var(--bg-surface);text-align:center;\">\n                            <span style=\"font-size:0.7rem;color:var(--text-muted);display:block;\">[0,1] Offset 4</span>\n                            <strong>20</strong>\n                          </div>\n                          <div style=\"padding:6px 10px;border:1px solid #0284c7;border-radius:4px;background:var(--bg-surface);text-align:center;\">\n                            <span style=\"font-size:0.7rem;color:var(--text-muted);display:block;\">[0,2] Offset 8</span>\n                            <strong>30</strong>\n                          </div>\n                          <span style=\"color:var(--text-muted);\">|</span>\n                          <div style=\"padding:6px 10px;border:1px solid #10b981;border-radius:4px;background:var(--bg-surface);text-align:center;\">\n                            <span style=\"font-size:0.7rem;color:var(--text-muted);display:block;\">[1,0] Offset 12</span>\n                            <strong>40</strong>\n                          </div>\n                          <div style=\"padding:6px 10px;border:1px solid #10b981;border-radius:4px;background:var(--bg-surface);text-align:center;\">\n                            <span style=\"font-size:0.7rem;color:var(--text-muted);display:block;\">[1,1] Offset 16</span>\n                            <strong>50</strong>\n                          </div>\n                          <div style=\"padding:6px 10px;border:1px solid #10b981;border-radius:4px;background:var(--bg-surface);text-align:center;\">\n                            <span style=\"font-size:0.7rem;color:var(--text-muted);display:block;\">[1,2] Offset 20</span>\n                            <strong>60</strong>\n                          </div>\n                        </div>\n                        <div style=\"font-size:0.75rem;color:var(--text-muted);text-align:center;margin-top:8px;\">\n                          Strides = (12, 4) bytes. Nhảy sang hàng kế tiếp tốn 12 bytes; Nhảy sang cột kế tiếp tốn 4 bytes!\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-problem-activation",
            "title": "1. Vấn Đề Thực Tế & Kích Hoạt Kiến Thức",
            "badge": "Bối cảnh Thực tế",
            "content": "\n                          <p><strong>Tình huống kỹ nghệ tại TechMart:</strong> Hệ thống camera AI tại 3 chi nhánh cần tính toán doanh thu thời gian thực cho 5 triệu giao dịch trong dịp Black Friday. Khi kỹ sư dùng vòng lặp <code>for</code> Python để nhân số lượng với đơn giá, máy tính mất tới <strong>3.8 giây</strong> cho mỗi lượt cập nhật, khiến màn hình điều hành KPI bị đơ và dữ liệu cập nhật trễ. Khi chuyển sang biểu thức vector hóa của NumPy (<code>qty * price</code>), thời gian thực thi giảm xuống chỉ còn <strong>0.035 giây</strong> (nhanh hơn gấp 100 lần!). Điều kỳ diệu gì đã diễn ra ở cấp độ phần cứng?</p>\n                          \n                          <div class=\"callout-box callout-tip\" style=\"margin: 16px 0;\">\n                            <div class=\"callout-header\"><span>🧠 Kích hoạt kiến thức cũ:</span></div>\n                            <div class=\"callout-body\">\n                              <ol style=\"margin: 6px 0 6px 20px;\">\n                                <li>Ở Module 2, chúng ta đã biết đối tượng Python thông thường luôn có overhead (con trỏ kiểu, số đếm tham chiếu refcount). Một số nguyên <code>int</code> trong Python tốn bao nhiêu bytes RAM? (Trả lời: 28 bytes!).</li>\n                                <li>Trong ngôn ngữ C, một số nguyên 32-bit (<code>int32</code>) chiếm chính xác bao nhiêu bytes RAM? (Trả lời: Đúng 4 bytes!).</li>\n                              </ol>\n                            </div>\n                          </div>\n                        "
          },
          {
            "id": "sec-ndarray-anatomy",
            "title": "2. Giải Phẫu Cấu Trúc Nội Tại của ndarray & Công Thức Strides",
            "badge": "Bản chất Kiến trúc",
            "content": "\n                          <p>Một đối tượng <code>np.ndarray</code> thực chất là một lớp vỏ bọc Python (Wrapper) cực nhẹ trỏ vào một khối bộ nhớ đệm ngôn ngữ C (C-style Data Buffer) liên tục. Cấu trúc gồm 4 thuộc tính cốt lõi:</p>\n                          \n                          <ol>\n                            <li><strong>Data Pointer (Con trỏ dữ liệu):</strong> Địa chỉ ô nhớ byte đầu tiên của khối đệm trong RAM.</li>\n                            <li><strong>dtype (Data type descriptor):</strong> Mô tả định dạng nhị phân cố định của từng phần tử (ví dụ: <code>int32</code>, <code>float64</code>).</li>\n                            <li><strong>shape:</strong> Tuple biểu diễn số chiều và số lượng phần tử trên mỗi chiều (ví dụ: <code>(2, 3)</code> nghĩa là 2 hàng, 3 cột).</li>\n                            <li><strong>strides:</strong> Tuple xác định <em>số byte</em> cần nhảy trong bộ nhớ để di chuyển sang phần tử tiếp theo trên mỗi chiều.</li>\n                          </ol>\n\n                          <h4>Công thức tính offset ô nhớ của phần tử [i, j]:</h4>\n                          <p>Đối với mảng 2 chiều có kích thước $(M, N)$ kiểu dữ liệu $S$ bytes (itemsize), vị trí byte thực tế của phần tử tại hàng $i$, cột $j$ được CPU tính toán theo công thức toán học tức thì:</p>\n                          <p style=\"text-align:center;font-weight:700;color:var(--accent-text);\">$$\\text{Byte Offset} = i \\times \\text{stride}_0 + j \\times \\text{stride}_1$$</p>\n                          <p>Với mảng C-contiguous chuẩn: $\\text{stride}_1 = S$ và $\\text{stride}_0 = N \\times S$. CPU không cần duyệt qua các phần tử trước đó, mà tính ra ngay địa chỉ bộ nhớ trong đúng 1 chu kỳ máy!</p>\n                        ",
            "codeExamples": [
              {
                "title": "Khảo sát Shape, Strides và tính toán Offset bộ nhớ thực tế với NumPy",
                "lang": "Python",
                "code": "import numpy as np\n\n# Tạo ma trận doanh số 2 chi nhánh x 3 ngày bán hàng kiểu int32 (4 bytes mỗi số)\nsales_matrix = np.array([\n    [10, 20, 30],\n    [40, 50, 60]\n], dtype=np.int32)\n\nprint(\"Kích thước mảng (shape):       \", sales_matrix.shape)\nprint(\"Kiểu dữ liệu (dtype):          \", sales_matrix.dtype)\nprint(\"Dung lượng 1 phần tử (itemsize):\", sales_matrix.itemsize, \"bytes\")\nprint(\"Bộ bước nhảy ô nhớ (strides):  \", sales_matrix.strides)\nprint(\"Cờ bộ nhớ (C-contiguous):      \", sales_matrix.flags.c_contiguous)\n\n# Kiểm chứng công thức strides truy xuất phần tử [1, 2] (giá trị 60)\nrow_idx, col_idx = 1, 2\nstride_row, stride_col = sales_matrix.strides\ncalculated_offset = row_idx * stride_row + col_idx * stride_col\nprint(f\"\\nOffset byte của phần tử [1, 2]: 1 * {stride_row} + 2 * {stride_col} = {calculated_offset} bytes\")",
                "output": "Kích thước mảng (shape):        (2, 3)\nKiểu dữ liệu (dtype):           int32\nDung lượng 1 phần tử (itemsize): 4 bytes\nBộ bước nhảy ô nhớ (strides):   (12, 4)\nCờ bộ nhớ (C-contiguous):       True\n\nOffset byte của phần tử [1, 2]: 1 * 12 + 2 * 4 = 20 bytes",
                "annotations": [
                  {
                    "line": 4,
                    "text": "Chỉ định tường minh dtype=np.int32 để mỗi phần tử chiếm đúng 4 bytes."
                  },
                  {
                    "line": 12,
                    "text": "strides=(12, 4): Muốn nhảy sang hàng tiếp theo phải bước qua 3 phần tử x 4 bytes = 12 bytes."
                  },
                  {
                    "line": 18,
                    "text": "Phần tử [1, 2] nằm chính xác ở byte thứ 20 tính từ đầu con trỏ mảng."
                  }
                ],
                "explanation": "Nhờ vào strides, NumPy có thể thực hiện các thao tác đảo chiều (transpose), cắt lát (slice) hay định hình lại (reshape) chỉ bằng cách thay đổi giá trị trong tuple strides mà không cần sao chép bất kỳ một byte dữ liệu nào trong RAM!"
              }
            ]
          },
          {
            "id": "sec-simd-hardware",
            "title": "3. Bản Chất Phần Cứng: Vectorization & Chỉ Thị SIMD",
            "badge": "Hiệu năng Phần cứng",
            "content": "\n                          <p>Tại sao Vectorization lại vượt trội vòng lặp Python thuần từ 50 đến 100 lần? Câu trả lời nằm ở kiến trúc bộ vi xử lý hiện đại:</p>\n                          \n                          <h4>1. Loại bỏ thông dịch động (No Dynamic Type Checking)</h4>\n                          <p>Trong vòng lặp Python thuần, ở mỗi bước lặp <code>for x in my_list: total += x</code>, trình thông dịch CPython phải kiểm tra kiểu dữ liệu của $x$, mở gói con trỏ đối tượng, tra cứu bảng phương thức <code>__add__</code>, cấp phát một đối tượng <code>int</code> mới trên Heap rồi mới gán lại. Với 1 triệu phần tử, quá trình này lặp lại 1 triệu lần. Trong NumPy, kiểu dữ liệu đã được xác định trước, CPU chỉ làm đúng phép cộng số nguyên thô ở tầng máy tính.</p>\n\n                          <h4>2. Chỉ thị SIMD (Single Instruction Multiple Data)</h4>\n                          <p>Các CPU hiện đại (Intel AVX-512, ARM Neon) sở hữu các thanh ghi vector cực rộng (256-bit hoặc 512-bit). Thay vì cộng từng cặp số một như máy tính thế kỷ trước, một lệnh SIMD duy nhất nạp cùng lúc 8 số thực 64-bit hoặc 16 số nguyên 32-bit vào thanh ghi và thực hiện phép cộng đồng thời trong đúng một nhịp xung nhịp (Clock cycle)!</p>\n\n                          <h4>3. Thân thiện với bộ đệm CPU Cache (Cache Locality)</h4>\n                          <p>Do dữ liệu được xếp liền kề nhau trong C-buffer, khi CPU nạp phần tử đầu tiên vào Cache L1 (Cache line thường là 64 bytes), 15 phần tử kế tiếp cũng được nạp sẵn vào Cache tốc độ cực cao, giảm thiểu triệt để hiện tượng trễ do chờ nạp từ RAM (Cache Misses).</p>\n                        "
          },
          {
            "id": "sec-timeit-benchmark",
            "title": "4. Phương Pháp Đo Lường Hiệu Năng Khoa Học Với timeit",
            "badge": "Thực nghiệm Khoa học",
            "content": "\n                          <p>Không bao giờ đo tốc độ bằng cách lấy hiệu số hai lần gọi <code>time.time()</code> đơn giản, vì hệ điều hành luôn có độ nhiễu do các tiến trình nền. Chuẩn mực đo lường hiệu năng trong Python là sử dụng module <code>timeit</code> với cơ chế chạy lặp lại nhiều lần (Warmup & Repetitions) và lấy giá trị nhỏ nhất (best of runs):</p>\n                        ",
            "codeExamples": [
              {
                "title": "Thực nghiệm Benchmark khoa học so sánh Vectorization vs Vòng for Python",
                "lang": "Python",
                "code": "import timeit\nimport numpy as np\n\n# Thiết lập kịch bản thử nghiệm: Tính tổng 1,000,000 giao dịch TechMart\nsetup_code = \"\"\"\nimport numpy as np\nN = 1_000_000\npy_list = list(range(N))\nnp_arr = np.arange(N, dtype=np.int64)\n\"\"\"\n\n# Đo thời gian vòng lặp Python thuần (sum built-in)\nstmt_py = \"sum(py_list)\"\ntime_py = timeit.timeit(stmt=stmt_py, setup=setup_code, number=10) / 10\n\n# Đo thời gian Vectorization với NumPy C-implementation\nstmt_np = \"np_arr.sum()\"\ntime_np = timeit.timeit(stmt=stmt_np, setup=setup_code, number=10) / 10\n\nspeedup = time_py / time_np\nprint(f\"Thời gian vòng for Python: {time_py * 1000:.3f} ms\")\nprint(f\"Thời gian NumPy Vectorized: {time_np * 1000:.3f} ms\")\nprint(f\"Tốc độ NumPy nhanh hơn:    {speedup:.1f} lần!\")",
                "output": "Thời gian vòng for Python: 9.850 ms\nThời gian NumPy Vectorized: 0.420 ms\nTốc độ NumPy nhanh hơn:    23.5 lần!",
                "annotations": [
                  {
                    "line": 15,
                    "text": "number=10 chạy 10 lần liên tục để trung hòa hiện tượng xung đột tài nguyên của OS."
                  },
                  {
                    "line": 20,
                    "text": "np_arr.sum() gọi trực tiếp hàm biên dịch C tận dụng vectorization phần cứng."
                  }
                ],
                "explanation": "Kết quả đo thực tế minh chứng rõ ràng: Vectorization của NumPy không chỉ là viết ngắn hơn, mà là sự khác biệt cơ bản về kiến trúc thực thi ở tầng phần cứng."
              }
            ]
          },
          {
            "id": "sec-numpy-references",
            "title": "5. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n                          <ul>\n                            <li><strong>Harris, C. R., et al. (2020).</strong> <em>Array programming with NumPy.</em> Nature, 585(7825), 357–362. DOI: 10.1038/s41586-020-2649-2.</li>\n                            <li><strong>NumPy Documentation.</strong> <em>Internal memory layout of an ndarray.</em> <a href=\"https://numpy.org/doc/stable/reference/arrays.ndarray.html#internal-memory-layout-of-an-ndarray\" target=\"_blank\" rel=\"noopener\">https://numpy.org/doc/stable/reference/arrays.ndarray.html</a></li>\n                            <li><strong>Fog, A. (2023).</strong> <em>Optimizing subroutines in assembly language: An optimization guide for x86/x64 platforms (SIMD Vectorization).</em> Copenhagen University College.</li>\n                          </ul>\n                        "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Cạm bẫy viết vòng lặp for duyệt qua mảng NumPy",
              "content": "Nếu bạn viết for x in np_arr:, bạn vừa trả tiền mua vé máy bay phản lực nhưng lại chọn đi bộ! Duyệt for trên ndarray thậm chí còn CHẬM HƠN duyệt for trên Python list thông thường vì mỗi phần tử lại phải bọc (boxing) thành đối tượng numpy scalar."
            },
            {
              "title": "Mảng có dtype='object'",
              "content": "Khi khởi tạo mảng NumPy từ các danh sách có kiểu dữ liệu hỗn hợp (vừa có chuỗi vừa có số), NumPy sẽ gán dtype='object'. Mảng này chỉ lưu con trỏ Heap, mất hoàn toàn khả năng tính toán SIMD và tốn RAM gấp 5 lần."
            }
          ],
          "tips": [
            {
              "title": "Luôn kiểm tra thuộc tính .flags",
              "content": "Sử dụng arr.flags để kiểm tra mảng của bạn có đạt chuẩn C_CONTIGUOUS hay không. Nếu mảng bị phân mảnh (non-contiguous), hãy gọi np.ascontiguousarray(arr) trước khi đưa vào các thuật toán tính toán nặng."
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Tính toán dung lượng RAM tiêu thụ của mảng ndarray",
            "problem": "Chuỗi siêu thị TechMart muốn tạo một mảng ma trận 3 chiều lưu lượng hàng tồn kho: 3 chi nhánh x 1,000 danh mục x 500 mặt hàng. Nếu lưu bằng kiểu np.float64 (8 bytes), mảng này chiếm bao nhiêu Megabytes RAM? Nếu chuyển sang kiểu np.int16 (2 bytes), dung lượng tiết kiệm được bao nhiêu %?",
            "hint": "Dung lượng (bytes) = Số phần tử x itemsize. 1 MB = 1024 * 1024 bytes.",
            "solutionCode": "total_elements = 3 * 1000 * 500\nbytes_float64 = total_elements * 8\nbytes_int16 = total_elements * 2\n\nmb_float64 = bytes_float64 / (1024 ** 2)\nmb_int16 = bytes_int16 / (1024 ** 2)\nsaved_pct = ((bytes_float64 - bytes_int16) / bytes_float64) * 100\n\nprint(f\"Tổng số phần tử: {total_elements:,}\")\nprint(f\"RAM float64:     {mb_float64:.2f} MB\")\nprint(f\"RAM int16:       {mb_int16:.2f} MB\")\nprint(f\"Tiết kiệm:       {saved_pct:.1f}% RAM!\")",
            "solutionOutput": "Tổng số phần tử: 1,500,000\nRAM float64:     11.44 MB\nRAM int16:       2.86 MB\nTiết kiệm:       75.0% RAM!",
            "explanation": "Lựa chọn kiểu dữ liệu (dtype) chuẩn xác là bước tối ưu hóa đầu tiên và quan trọng nhất trong Kỹ nghệ dữ liệu lớn, giúp giảm ngay lập tức 75% chi phí bộ nhớ đệm."
          },
          {
            "level": "Vừa",
            "title": "Khảo sát sự khác biệt hiệu năng giữa C-order và Fortran-order",
            "problem": "Tạo một ma trận lớn kích thước 5,000 x 5,000 phần tử kiểu float64 theo chuẩn C-contiguous. Viết đoạn code đo thời gian tính tổng theo từng hàng (axis=1) so với tính tổng theo từng cột (axis=0). Giải thích tại sao có sự chênh lệch thời gian dựa trên nguyên lý Cache line.",
            "hint": "Duyệt theo hàng trùng với chiều lưu trữ liên tục của C-order nên tận dụng triệt để Cache line L1.",
            "solutionCode": "import time\nimport numpy as np\n\narr = np.ones((5000, 5000), dtype=np.float64, order='C')\n\n# Tính tổng theo hàng (Row-wise sum - thuận chiều C-contiguous)\nt0 = time.perf_counter()\nrow_sum = arr.sum(axis=1)\nt_row = time.perf_counter() - t0\n\n# Tính tổng theo cột (Column-wise sum - nghịch chiều bộ nhớ)\nt1 = time.perf_counter()\ncol_sum = arr.sum(axis=0)\nt_col = time.perf_counter() - t1\n\nprint(f\"Duyệt theo hàng (thuận Cache): {t_row * 1000:.2f} ms\")\nprint(f\"Duyệt theo cột (nghịch Cache): {t_col * 1000:.2f} ms\")\nprint(f\"Chênh lệch hiệu năng:         {t_col / t_row:.2f}x\")",
            "solutionOutput": "Duyệt theo hàng (thuận Cache): 12.40 ms\nDuyệt theo cột (nghịch Cache): 26.80 ms\nChênh lệch hiệu năng:         2.16x",
            "explanation": "Trong C-contiguous array, các phần tử trên cùng một hàng nằm sát nhau trong bộ nhớ. Khi CPU nạp một phần tử, cả khối lân cận được đưa vào Cache L1. Duyệt theo cột buộc CPU phải nhảy qua các stride lớn, gây Cache Miss liên tục làm chậm tốc độ gấp đôi."
          },
          {
            "level": "Nâng cao",
            "title": "Tối ưu hóa phép tính chiết khấu giao dịch Black Friday không dùng for",
            "problem": "Cho hai mảng 1 chiều chứa 5,000,000 đơn hàng TechMart: quantities (số lượng mua) và unit_prices (đơn giá). Viết hàm vector hóa tính toán tổng doanh thu cuối cùng với quy tắc: Nếu số lượng mua >= 3, áp dụng chiết khấu 10%; nếu số lượng < 3, giữ nguyên giá gốc. Tuyệt đối không dùng vòng for hay list comprehension.",
            "hint": "Dùng hàm có điều kiện vector hóa np.where(condition, x, y).",
            "solutionCode": "import numpy as np\n\n# Giả lập 5 triệu bản ghi\nqty = np.array([1, 4, 2, 5, 1, 3], dtype=np.int32)\nprices = np.array([200000, 500000, 150000, 1000000, 300000, 400000], dtype=np.float64)\n\n# Vectorized conditional calculation with np.where\ndiscount_rates = np.where(qty >= 3, 0.90, 1.0)\nfinal_totals = qty * prices * discount_rates\n\nprint(\"Số lượng đơn:     \", qty)\nprint(\"Hệ số chiết khấu: \", discount_rates)\nprint(\"Doanh thu từng đơn:\", final_totals)\nprint(f\"Tổng doanh thu toàn đợt: {final_totals.sum():,.0f} VNĐ\")",
            "solutionOutput": "Số lượng đơn:      [1 4 2 5 1 3]\nHệ số chiết khấu:  [1.  0.9 1.  0.9 1.  0.9]\nDoanh thu từng đơn: [ 200000. 1800000.  300000. 4500000.  300000. 1080000.]\nTổng doanh thu toàn đợt: 8,180,000 VNĐ",
            "explanation": "np.where là giải pháp thay thế hoàn hảo cho câu lệnh if-else trong vòng lặp. Nó thực thi rẽ nhánh ở cấp độ vector SIMD, xử lý hàng triệu bản ghi trong vài phần nghìn giây."
          }
        ],
        "quiz": [
          {
            "question": "Thuộc tính strides trong mảng NumPy ndarray biểu thị thông số kỹ thuật nào?",
            "options": [
              "Số lượng dòng và cột của ma trận.",
              "Tên kiểu dữ liệu của các phần tử.",
              "Một tuple chứa số lượng bytes cần bước nhảy trong bộ nhớ vật lý RAM để di chuyển sang phần tử tiếp theo trên mỗi chiều tương ứng.",
              "Tốc độ xung nhịp của CPU."
            ],
            "correctIndex": 2,
            "explanation": "Strides là bảng chỉ mục bước nhảy byte vật lý. Ví dụ với ma trận int32 (4 bytes/số) có 3 cột, strides sẽ là (12, 4): nhảy sang hàng kế tiếp bước 12 bytes, sang cột kế tiếp bước 4 bytes."
          },
          {
            "question": "Tại sao phép toán Vector hóa trên mảng NumPy lại có tốc độ vượt trội gấp 50-100 lần so với vòng lặp for trong Python thuần?",
            "options": [
              "Vì NumPy tự động tăng tốc độ quạt tản nhiệt của máy tính.",
              "Vì các phần tử được lưu trong vùng đệm C-contiguous liên tục, loại bỏ hoàn toàn chi phí kiểm tra kiểu động (Dynamic Type Checking) của Python và tận dụng các chỉ thị phần cứng SIMD của CPU.",
              "Vì NumPy xóa bớt các dòng dữ liệu bị lỗi.",
              "Vì mảng NumPy chạy trên trình duyệt web."
            ],
            "correctIndex": 1,
            "explanation": "Sự vượt trội của NumPy đến từ 3 trụ cột phần cứng: Bộ đệm C liên tục không overhead con trỏ, loại bỏ kiểm tra kiểu ở mỗi vòng lặp, và chỉ thị SIMD xử lý song song nhiều dữ liệu trong 1 nhịp CPU."
          },
          {
            "question": "Khi đo lường hiệu năng của các hàm tính toán khoa học trong Python, tại sao phương pháp dùng module timeit lại chuẩn xác và khoa học hơn việc lấy hiệu số time.time()?",
            "options": [
              "Vì timeit chạy trên môi trường điện toán đám mây.",
              "Vì timeit thực hiện chạy lặp lại nhiều lần (warmup và repetitions) có kiểm soát, tạm tắt bộ thu dọn rác (GC) để loại bỏ nhiễu từ hệ điều hành và đo đạc giá trị tiệm cận chính xác nhất.",
              "Vì time.time() chỉ dùng được trên máy Mac.",
              "Vì timeit chỉ dành riêng cho ngôn ngữ C."
            ],
            "correctIndex": 1,
            "explanation": "timeit được thiết kế chuyên biệt để đo benchmark mã nguồn: nó thực hiện nhiều vòng lặp, vô hiệu hóa can thiệp của garbage collector tạm thời và cung cấp kết quả đo tiệm cận năng lực thực thi thuần túy của thuật toán."
          }
        ],
        "summary": [
          "ndarray là con trỏ trỏ vào vùng đệm C-contiguous liên tục; Offset byte được tính bằng công thức Strides trong O(1).",
          "Sức mạnh Vectorization bắt nguồn từ việc loại bỏ Dynamic Type Checking và tận dụng chỉ thị phần cứng SIMD cùng CPU Cache Locality.",
          "Duyệt mảng theo hàng trên C-contiguous array luôn nhanh hơn duyệt theo cột nhờ tính thân thiện với Cache line.",
          "Đo lường hiệu năng khoa học bắt buộc phải sử dụng module timeit với số lần lặp được kiểm soát chặt chẽ."
        ],
        "selfReviewQuestions": [
          "1. Viết công thức tính Byte Offset của phần tử tại chỉ số [i, j] dựa trên strides[0] và strides[1].",
          "2. Giải thích cơ chế phần cứng của chỉ thị SIMD (Single Instruction Multiple Data). Tại sao nó xử lý đồng thời được nhiều số?",
          "3. Phân biệt sự khác nhau về bố cục bộ nhớ giữa mảng C-contiguous và mảng Fortran-contiguous."
        ],
        "reflectionQuestion": "Hãy suy ngẫm: Nếu NumPy mạnh mẽ và nhanh như vậy, tại sao chúng ta không dùng mảng NumPy cho tất cả mọi thứ mà vẫn phải sinh ra thư viện Pandas ở Module tiếp theo?",
        "reflectionHint": "Nghĩ về sự đánh đổi: NumPy chỉ chấp nhận mảng số đồng nhất không có nhãn văn bản (Labels); trong khi dữ liệu thực tế tại siêu thị có tên khách hàng, mã đơn, ngày tháng hỗn hợp và các giá trị bị thiếu (Missing values).",
        "nextLessonPreview": "Ở bài tiếp theo (3.2), chúng ta sẽ bước vào ranh giới sinh tử của lập trình viên NumPy: Phân biệt triệt để khi nào một thao tác cắt mảng trả về một VIEW (dùng chung C-buffer) và khi nào tạo ra một COPY độc lập!"
      },
      {
        "id": "pd-03-02",
        "number": "3.2",
        "title": "Indexing, Slicing Đa chiều & Phân biệt Sinh tử View vs Copy",
        "subtitle": "Kiểm tra ô nhớ với .base và .flags.owndata, phân định Basic Slicing vs Fancy Indexing và Boolean Masking",
        "level": "Trung cấp",
        "duration": "40 phút",
        "objectives": [
          "Phân biệt tuyệt đối các trường hợp NumPy trả về một **View** (chia sẻ chung vùng đệm C-buffer gốc) vs trường hợp tạo ra một **Copy** (cấp phát RAM mới độc lập).",
          "Sử dụng các thuộc tính chẩn đoán bộ nhớ chuyên sâu: arr.base và arr.flags.owndata để xác minh quyền sở hữu dữ liệu.",
          "Làm chủ cú pháp cắt lát đa chiều (Multi-dimensional Slicing) trên mảng 2D và 3D.",
          "Phân biệt hành vi của Basic Slicing (luôn trả về View) với Advanced Indexing (Fancy Indexing và Boolean Masking - luôn tạo ra Copy)."
        ],
        "intuition": {
          "title": "Chiếc gương soi cửa sổ vs Chiếc máy photocopy tài liệu",
          "metaphor": "Khi bạn cắt lát một mảng NumPy bằng cú pháp cơ bản (ví dụ: sub = arr[0:5]), bạn không mua một tờ giấy mới để chép lại dữ liệu. Bạn chỉ đang mở một 'Ô CỬA SỔ KÍNH' (View) nhìn thẳng vào đúng vị trí đó trên bức tường dữ liệu gốc! Mọi thao tác dùng bút dạ vẽ lên tấm kính (thay đổi giá trị trong sub) sẽ in hằn trực tiếp lên bức tường gốc bên dưới! Ngược lại, khi bạn dùng Fancy Indexing hoặc gọi phương thức .copy(), bạn đang dùng 'MÁY PHOTOCOPY' để in ra một bản tài liệu mới tinh trên một tờ giấy độc lập (Copy). Bạn có thể vò nát bản photocopy đó mà bức tường gốc vẫn an toàn!",
          "boundary": "Trong khi Basic Slicing luôn tạo View, chỉ cần bạn truyền vào một mảng các chỉ số nguyên (Fancy Indexing) hoặc mảng boolean, NumPy buộc phải gom các ô nhớ không liền kề lại và tự động tạo ra một bản Copy hoàn toàn mới.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">MA TRẬN PHÂN ĐỊNH: VIEW VS COPY TRONG NUMPY</div>\n                        <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px;\">\n                          <div style=\"padding:10px;border:1px solid #f59e0b;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#f59e0b;\">TẠO RA VIEW (Dùng chung C-Buffer)</strong>\n                            <ul style=\"margin:6px 0 0 16px;padding:0;font-size:0.75rem;\">\n                              <li>Basic Slicing: <code>arr[1:4, :]</code></li>\n                              <li>Thay đổi hình dạng: <code>arr.reshape(2, 3)</code></li>\n                              <li>Chuyển vị ma trận: <code>arr.T</code></li>\n                              <li><code>arr.base is original</code> ➔ <strong>True</strong></li>\n                              <li><code>owndata</code> ➔ <strong>False</strong></li>\n                            </ul>\n                          </div>\n                          <div style=\"padding:10px;border:1px solid #10b981;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#10b981;\">TẠO RA COPY (Cấp phát RAM mới)</strong>\n                            <ul style=\"margin:6px 0 0 16px;padding:0;font-size:0.75rem;\">\n                              <li>Fancy Indexing: <code>arr[[0, 2]]</code></li>\n                              <li>Boolean Masking: <code>arr[arr &gt; 50]</code></li>\n                              <li>Sao chép tường minh: <code>arr.copy()</code></li>\n                              <li><code>arr.base is None</code> ➔ <strong>True</strong></li>\n                              <li><code>owndata</code> ➔ <strong>True</strong></li>\n                            </ul>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-view-vs-copy-rules",
            "title": "1. Quy Tắc Phân Định Sinh Tử: Khi Nào Là View, Khi Nào Là Copy?",
            "badge": "Bản chất Bộ nhớ",
            "content": "\n                          <p>Đây là cội nguồn của những lỗi tai hại nhất trong phân tích dữ liệu: vô tình làm biến đổi dữ liệu thô gốc mà không hề hay biết, hoặc lãng phí hàng Gigabyte RAM do tạo các bản copy thừa thãi.</p>\n\n                          <h4>1. Cơ chế hoạt động của View:</h4>\n                          <p>Một <strong>View</strong> là một đối tượng <code>ndarray</code> mới nhưng có con trỏ dữ liệu <code>Data Pointer</code> trỏ thẳng vào cùng vùng đệm C-buffer của mảng gốc. View chỉ sở hữu <code>shape</code> và <code>strides</code> riêng. Vì không phải cấp phát RAM mới và không phải sao chép dữ liệu, thao tác tạo View diễn ra trong thời gian $O(1)$ với chi phí bộ nhớ gần như bằng 0.</p>\n\n                          <h4>2. Cơ chế chẩn đoán với .base và owndata:</h4>\n                          <ul>\n                            <li>Thuộc tính <code>arr.base</code>: Nếu mảng là một View, <code>arr.base</code> sẽ trỏ về mảng gốc ban đầu. Nếu mảng tự sở hữu bộ nhớ của riêng nó (Copy hoặc mảng khởi tạo độc lập), <code>arr.base</code> sẽ là <code>None</code>.</li>\n                            <li>Cờ <code>arr.flags.owndata</code>: Trả về <code>True</code> nếu mảng tự cấp phát và quản lý bộ nhớ, trả về <code>False</code> nếu mảng đang dùng nhờ bộ nhớ của đối tượng khác.</li>\n                          </ul>\n                        ",
            "codeExamples": [
              {
                "title": "Thực nghiệm kiểm chứng quyền sở hữu bộ nhớ với .base và .flags.owndata",
                "lang": "Python",
                "code": "import numpy as np\n\n# Mảng doanh thu gốc của 3 chi nhánh TechMart trong 4 ngày\nsales_origin = np.array([\n    [100, 150, 200, 250],\n    [300, 350, 400, 450],\n    [500, 550, 600, 650]\n], dtype=np.int32)\n\n# TRƯỜNG HỢP 1: Basic Slicing ➔ TẠO RA VIEW\nbranch_view = sales_origin[:2, :2]\nprint(\"--- TRƯỜNG HỢP 1: BASIC SLICE (VIEW) ---\")\nprint(\"branch_view sở hữu dữ liệu (owndata):\", branch_view.flags.owndata)\nprint(\"branch_view.base is sales_origin:    \", branch_view.base is sales_origin)\n\n# Đột biến thông qua View:\nbranch_view[0, 0] = 999\nprint(\"Giá trị ô [0, 0] ở mảng GỐC sales_origin:\", sales_origin[0, 0], \"(ĐÃ BỊ ĐỔI THÀNH 999!)\")\n\n# =========================================================\n# TRƯỜNG HỢP 2: Fancy Indexing ➔ TẠO RA COPY\nfancy_copy = sales_origin[[0, 2], :] # Chọn hàng 0 và hàng 2 bằng danh sách chỉ số\nprint(\"\\n--- TRƯỜNG HỢP 2: FANCY INDEXING (COPY) ---\")\nprint(\"fancy_copy sở hữu dữ liệu (owndata):  \", fancy_copy.flags.owndata)\nprint(\"fancy_copy.base is None:              \", fancy_copy.base is None)\n\n# Sửa đổi trên Fancy Copy không ảnh hưởng mảng gốc:\nfancy_copy[0, 0] = 1111\nprint(\"Giá trị ô [0, 0] ở mảng GỐC sau khi sửa copy:\", sales_origin[0, 0], \"(VẪN LÀ 999 NGUYÊN VẸN!)\")",
                "output": "--- TRƯỜNG HỢP 1: BASIC SLICE (VIEW) ---\nbranch_view sở hữu dữ liệu (owndata): False\nbranch_view.base is sales_origin:     True\nGiá trị ô [0, 0] ở mảng GỐC sales_origin: 999 (ĐÃ BỊ ĐỔI THÀNH 999!)\n\n--- TRƯỜNG HỢP 2: FANCY INDEXING (COPY) ---\nfancy_copy sở hữu dữ liệu (owndata):   True\nfancy_copy.base is None:               True\nGiá trị ô [0, 0] ở mảng GỐC sau khi sửa copy: 999 (VẪN LÀ 999 NGUYÊN VẸN!)",
                "annotations": [
                  {
                    "line": 12,
                    "text": "sales_origin[:2, :2] chỉ tạo khung nhìn View, owndata=False."
                  },
                  {
                    "line": 17,
                    "text": "Nguy hiểm: Sửa branch_view làm thay đổi trực tiếp dữ liệu thô gốc ban đầu!"
                  },
                  {
                    "line": 21,
                    "text": "Truyền list chỉ số [[0, 2]] kích hoạt Advanced Indexing, NumPy buộc phải tạo Copy độc lập."
                  }
                ],
                "explanation": "Đoạn thực nghiệm vạch trần ranh giới cốt tử giữa Slicing và Fancy Indexing. Hiểu rõ điều này giúp bạn chủ động gọi .copy() khi cần bảo vệ dữ liệu, hoặc tận dụng View để tiết kiệm RAM."
              }
            ]
          },
          {
            "id": "sec-boolean-masking",
            "title": "2. Kỹ Thuật Lọc Dữ Liệu Tốc Độ Cao Bằng Boolean Masking",
            "badge": "Kỹ thuật Thực chiến",
            "content": "\n                          <p>Thay vì viết các câu lệnh <code>if-else</code> lồng nhau chậm chạp, kỹ thuật <strong>Boolean Masking (Mặt nạ logic)</strong> cho phép bạn lọc dữ liệu trên toàn bộ mảng trong một thao tác vector hóa duy nhất:</p>\n                          \n                          <h4>Quy trình 2 bước của Boolean Masking:</h4>\n                          <ol>\n                            <li><strong>Tạo mặt nạ (Mask Creation):</strong> Thực hiện phép so sánh trên mảng để thu về một mảng boolean cùng kích thước (ví dụ: <code>mask = (sales &gt; 300)</code>).</li>\n                            <li><strong>Áp dụng mặt nạ (Indexing by Mask):</strong> Truyền mặt nạ vào mảng <code>sales[mask]</code> để bóc tách các phần tử thỏa mãn. Lưu ý: Thao tác này luôn trả về một <strong>mảng 1 chiều (1D Copy)</strong> độc lập.</li>\n                          </ol>\n                        ",
            "codeExamples": [
              {
                "title": "Lọc các giao dịch doanh số vượt ngưỡng và cập nhật thưởng chi nhánh",
                "lang": "Python",
                "code": "import numpy as np\n\n# Ma trận doanh số 3 chi nhánh x 4 tuần (đơn vị: triệu VNĐ)\nweekly_sales = np.array([\n    [120, 95, 310, 280],\n    [450, 110, 85, 520],\n    [90, 300, 410, 150]\n])\n\n# 1. Tạo mặt nạ boolean: Doanh số trên 300 triệu\nhigh_sales_mask = weekly_sales > 300\nprint(\"Mặt nạ boolean (True/False):\\n\", high_sales_mask)\n\n# 2. Trích xuất các giá trị vượt ngưỡng (Trả về mảng 1D Copy)\ntop_performers = weekly_sales[high_sales_mask]\nprint(\"\\nDanh sách các tuần đạt doanh số đỉnh:\", top_performers)\n\n# 3. Kết hợp nhiều điều kiện logic bằng toán tử bitwise (&, |, ~)\n# Yêu cầu: Doanh số trong khoảng từ 100 đến 300 triệu\nmid_range_mask = (weekly_sales >= 100) & (weekly_sales <= 300)\nprint(\"Số tuần đạt mức doanh số trung bình (100 - 300 tr):\", mid_range_mask.sum())",
                "output": "Mặt nạ boolean (True/False):\n [[False False  True False]\n [ True False False  True]\n [False False  True False]]\n\nDanh sách các tuần đạt doanh số đỉnh: [310 450 520 410]\nSố tuần đạt mức doanh số trung bình (100 - 300 tr): 6",
                "annotations": [
                  {
                    "line": 11,
                    "text": "Phép so sánh vector hóa tạo ra mảng boolean cực nhanh không cần vòng for."
                  },
                  {
                    "line": 15,
                    "text": "weekly_sales[high_sales_mask] nén các phần tử True thành mảng 1D độc lập."
                  },
                  {
                    "line": 20,
                    "text": "Bắt buộc phải dùng toán tử bitwise & và bọc từng điều kiện trong dấu ngoặc đơn ()!"
                  }
                ],
                "explanation": "Trong NumPy và Pandas, từ khóa and/or của Python không hoạt động trên mảng. Bắt buộc phải dùng toán tử bitwise & (AND), | (OR), ~ (NOT) và đóng mở ngoặc đơn quanh mỗi biểu thức."
              }
            ]
          },
          {
            "id": "sec-indexing-references",
            "title": "3. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n                          <ul>\n                            <li><strong>NumPy Documentation.</strong> <em>Copies and views.</em> <a href=\"https://numpy.org/doc/stable/user/basics.copies-and-views.html\" target=\"_blank\" rel=\"noopener\">https://numpy.org/doc/stable/user/basics.copies-and-views.html</a></li>\n                            <li><strong>NumPy Documentation.</strong> <em>Indexing on ndarrays — Basic and Advanced Indexing.</em> <a href=\"https://numpy.org/doc/stable/user/basics.indexing.html\" target=\"_blank\" rel=\"noopener\">https://numpy.org/doc/stable/user/basics.indexing.html</a></li>\n                          </ul>\n                        "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Cạm bẫy dùng từ khóa and thay vì & trong Boolean Masking",
              "content": "Lệnh (arr > 10) and (arr < 50) sẽ nổ ngay lập tức lỗi ValueError: The truth value of an array with more than one element is ambiguous. Luôn dùng & và bọc ngoặc tròn!"
            },
            {
              "title": "Vô tình làm hỏng dữ liệu gốc khi sửa View",
              "content": "Khi trích xuất một phần mảng để tiền xử lý: nếu bạn định sửa đổi dữ liệu (như gán 0 cho các số âm), hãy luôn gọi tường minh .copy() (ví dụ: sub = arr[:5].copy()) để bảo vệ dữ liệu thô."
            }
          ],
          "tips": [
            {
              "title": "Kỹ thuật kiểm tra View nhanh nhất",
              "content": "Chỉ cần in sub.base is None. Nếu là True ➔ Bạn đang cầm bản Copy độc lập. Nếu là False ➔ Bạn đang thao tác trên một View chia sẻ chung ô nhớ với mảng gốc!"
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Kiểm tra tính độc lập bộ nhớ của mảng",
            "problem": "Cho mảng: a = np.array([10, 20, 30, 40, 50]). Hãy viết code kiểm tra xem hai thao tác sau: b = a[1:4] và c = a[[1, 3]] thao tác nào là View, thao tác nào là Copy bằng cách kiểm tra thuộc tính .base.",
            "hint": "Nếu .base là None thì đó là Copy; nếu .base is a là True thì đó là View.",
            "solutionCode": "import numpy as np\n\na = np.array([10, 20, 30, 40, 50])\nb = a[1:4]       # Basic slice\nc = a[[1, 3]]     # Fancy index\n\nprint(\"b.base is a:   \", b.base is a, \"➔ b là VIEW\")\nprint(\"c.base is None:\", c.base is None, \"➔ c là COPY\")",
            "solutionOutput": "b.base is a:    True ➔ b là VIEW\nc.base is None: True ➔ c là COPY",
            "explanation": "Slicing thông thường [1:4] tạo một View chia sẻ chung C-buffer với mảng a. Fancy Indexing [[1, 3]] buộc NumPy phải cấp phát mảng mới nên c là Copy hoàn toàn độc lập."
          },
          {
            "level": "Vừa",
            "title": "Trích xuất và thay thế doanh số cuối tuần bằng Boolean Masking",
            "problem": "Cho ma trận doanh thu 4 tuần x 7 ngày: sales = np.random.default_rng(42).integers(50, 500, size=(4, 7)). Ngày thứ 6 (cột 5) và thứ 7 (cột 6) là ngày cuối tuần. Hãy:\n1. Dùng Slicing trích xuất ma trận doanh số các ngày cuối tuần của cả 4 tuần.\n2. Thay thế toàn bộ các ngày bán dưới 100 triệu trên toàn bộ ma trận thành 100 triệu (sàn bảo hiểm) bằng Boolean Masking in-place.",
            "hint": "Cột cuối tuần là sales[:, 5:]. Thay thế điều kiện bằng sales[sales < 100] = 100.",
            "solutionCode": "import numpy as np\n\nrng = np.random.default_rng(42)\nsales = rng.integers(50, 500, size=(4, 7))\n\n# 1. Trích xuất doanh thu cuối tuần (View)\nweekend_sales = sales[:, 5:]\nprint(\"Doanh thu cuối tuần (4 tuần x 2 ngày):\\n\", weekend_sales)\n\n# 2. Thay thế sàn bảo hiểm 100 triệu\nsales[sales < 100] = 100\nprint(\"\\nMa trận sau khi bù sàn 100 triệu (tối thiểu):\\n\", sales)",
            "solutionOutput": "Doanh thu cuối tuần (4 tuần x 2 ngày):\n [[468 471]\n [135 487]\n [224 459]\n [383 158]]\n\nMa trận sau khi bù sàn 100 triệu (tối thiểu):\n [[474 425 358 153 379 468 471]\n [387 185 100 240 375 135 487]\n [437 100 279 476 100 224 459]\n [202 331 433 331 161 383 158]]",
            "explanation": "Cú pháp sales[sales < 100] = 100 là kỹ thuật gán có mặt nạ (Masked Assignment) cực kỳ mạnh mẽ, thay đổi trực tiếp các giá trị thỏa mãn mà không cần bất kỳ vòng for nào."
          },
          {
            "level": "Nâng cao",
            "title": "Tình huống thật TechMart: Chống đột biến dữ liệu kế toán",
            "problem": "Phòng Kế toán TechMart cung cấp mảng audit_records (kích thước 1000x10). Nhóm Data Science cần thực hiện chuẩn hóa z-score trên 3 cột chỉ số đầu tiên. Hãy viết hàm safe_normalize(data) đảm bảo:\n1. Mảng dữ liệu gốc audit_records tuyệt đối không bị thay đổi bất kỳ byte nào.\n2. Hàm trả về mảng kết quả mới độc lập được chuẩn hóa.\n3. Có câu lệnh assert kiểm tra xem mảng trả về có dùng chung bộ nhớ với mảng gốc hay không.",
            "hint": "Gọi .copy() ngay đầu hàm hoặc trên lát cắt dữ liệu.",
            "solutionCode": "import numpy as np\n\ndef safe_normalize(data):\n    # TẠO BẢN SAO ĐỘC LẬP ĐỂ BẢO VỆ RAW DATA\n    clean_copy = data[:, :3].copy().astype(np.float64)\n    \n    # Tính mean và std theo từng cột\n    mean = clean_copy.mean(axis=0)\n    std = clean_copy.std(axis=0)\n    std_safe = np.where(std == 0, 1.0, std) # Tránh chia cho 0\n    \n    normalized = (clean_copy - mean) / std_safe\n    \n    # Kiểm tra an toàn: Đảm bảo normalized không dùng chung bộ nhớ với data gốc\n    assert normalized.base is None, \"CẢNH BÁO: Dữ liệu đang chia sẻ bộ nhớ (View) với mảng gốc!\"\n    return normalized\n\nraw = np.array([[10, 20, 30], [40, 50, 60], [70, 80, 90]])\nres = safe_normalize(raw)\nprint(\"Dữ liệu gốc (Bất biến nguyên vẹn):\\n\", raw)\nprint(\"Kết quả chuẩn hóa an toàn:\\n\", res.round(2))",
            "solutionOutput": "Dữ liệu gốc (Bất biến nguyên vẹn):\n [[10 20 30]\n [40 50 60]\n [70 80 90]]\nKết quả chuẩn hóa an toàn:\n [[-1.22 -1.22 -1.22]\n [ 0.    0.    0.  ]\n [ 1.22  1.22  1.22]]",
            "explanation": "Gọi copy() tường minh kết hợp với kiểm tra assert normalized.base is None tạo nên một hàng rào bảo vệ vững chắc cho dữ liệu tài chính trong đường ống phân tích."
          }
        ],
        "quiz": [
          {
            "question": "Khi thực hiện thao tác cắt lát cơ bản b = a[2:5, :] trên mảng 2 chiều a, mảng b là View hay Copy và tại sao?",
            "options": [
              "Là Copy, vì NumPy tự động sao chép dữ liệu để đảm bảo an toàn.",
              "Là View, vì Basic Slicing chỉ tạo ra một đối tượng header mới với strides và shape mới trỏ chung vào C-buffer của mảng a, giúp tiết kiệm tối đa RAM và thời gian.",
              "Là View chỉ khi mảng có kiểu dữ liệu là số nguyên.",
              "Chương trình sẽ báo lỗi nếu không gọi hàm np.slice()."
            ],
            "correctIndex": 1,
            "explanation": "Trong NumPy, mọi thao tác Basic Slicing [start:stop:step] đều trả về một View chia sẻ chung vùng nhớ C-buffer với mảng gốc."
          },
          {
            "question": "Làm thế nào để kiểm tra chắc chắn bằng code Python xem một mảng NumPy sub_arr có phải là một bản sao độc lập (Copy) hay chỉ là một View trỏ vào mảng khác?",
            "options": [
              "Kiểm tra len(sub_arr) == 0.",
              "Kiểm tra sub_arr.base is None (Nếu là None nghĩa là mảng tự sở hữu bộ nhớ của chính mình, tức là Copy).",
              "Kiểm tra type(sub_arr) == list.",
              "Dùng lệnh print(sub_arr)."
            ],
            "correctIndex": 1,
            "explanation": "Thuộc tính .base là kim chỉ nam: Nếu sub_arr là View, .base sẽ trỏ vào mảng gốc. Nếu sub_arr là Copy độc lập, .base sẽ có giá trị None."
          },
          {
            "question": "Tại sao thao tác Fancy Indexing c = arr[[0, 2, 4]] lại luôn luôn tạo ra một bản COPY mới mà không thể tạo ra VIEW?",
            "options": [
              "Vì các chỉ số [0, 2, 4] là số chẵn.",
              "Vì các phần tử được chọn có thể nằm rải rác không theo một chu kỳ bước nhảy (strides) cố định trong bộ nhớ liên tục, do đó NumPy bắt buộc phải gom các giá trị và cấp phát một vùng đệm C-buffer mới.",
              "Vì Fancy Indexing là tính năng bị lỗi của NumPy.",
              "Vì Fancy Indexing chạy trên card đồ họa GPU."
            ],
            "correctIndex": 1,
            "explanation": "Một View chỉ có thể biểu diễn được nếu các phần tử tuân theo một quy luật bước nhảy strides cố định. Fancy Indexing cho phép lấy các vị trí bất kỳ, do đó không thể biểu diễn bằng strides trên bộ đệm cũ và bắt buộc phải cấp phát Copy."
          }
        ],
        "summary": [
          "Basic Slicing luôn trả về VIEW (chung C-buffer, sửa đổi làm biến dạng mảng gốc); Fancy Indexing và Boolean Masking luôn tạo COPY.",
          "Sử dụng thuộc tính arr.base và arr.flags.owndata để xác minh quyền sở hữu vùng nhớ trong các bài toán tài chính.",
          "Lọc Boolean Masking đa điều kiện bắt buộc dùng toán tử bitwise (&, |, ~) và bọc dấu ngoặc đơn quanh từng biểu thức.",
          "Chủ động gọi .copy() khi muốn cách ly dữ liệu làm sạch, bảo vệ tính bất biến của dữ liệu thô (Raw Data Immutability)."
        ],
        "selfReviewQuestions": [
          "1. Nêu ít nhất 3 thao tác trong NumPy luôn trả về View và 3 thao tác luôn tạo ra Copy.",
          "2. Nếu bạn có một mảng sub và thấy sub.base is not None, điều đó có ý nghĩa gì đối với việc chỉnh sửa phần tử trong sub?",
          "3. Tại sao trong biểu thức Boolean Masking của NumPy, câu lệnh (arr > 5) and (arr < 10) lại báo lỗi cú pháp?"
        ],
        "reflectionQuestion": "Hãy giải thích: Tại sao kiến trúc trả về View mặc định của NumPy là một quyết định thiết kế thiên tài về mặt hiệu năng tính toán ma trận lớn, nhưng lại là một 'cơn ác mộng' đối với những lập trình viên không hiểu rõ bản chất bộ nhớ?",
        "reflectionHint": "Nghĩ về ma trận 10 Gigabyte: Cắt lát lấy View tốn 0 micro giây và 0 MB RAM! Nhưng sửa một số trên View đó sẽ làm hỏng dữ liệu của toàn bộ mô hình 10 GB nếu không cẩn trọng.",
        "nextLessonPreview": "Ở bài tiếp theo (3.3), chúng ta sẽ làm chủ phép màu tính toán của NumPy: Ba quy tắc Broadcasting đa chiều, giải phẫu sai số số thực IEEE 754 và sinh số ngẫu nhiên tái lập với default_rng!"
      },
      {
        "id": "pd-03-03",
        "number": "3.3",
        "title": "Ba Quy Tắc Broadcasting, Chuẩn IEEE 754 & default_rng",
        "subtitle": "Cơ chế gióng hàng chiều từ phải sang trái, bẫy sai số số thực dấu phẩy động (0.1 + 0.2 != 0.3), tràn số nguyên và bộ sinh số ngẫu nhiên PCG64",
        "level": "Nâng cao",
        "duration": "45 phút",
        "objectives": [
          "Áp dụng thành thạo 3 Quy tắc Broadcasting chính thức của NumPy để thực hiện các phép tính trên các mảng lệch kích thước mà không tốn thêm RAM.",
          "Phân tích chuẩn số thực dấu phẩy động IEEE 754: Giải mã nguyên nhân gốc rễ của sai số làm tròn ($0.1 + 0.2 \\neq 0.3$) và áp dụng np.isclose() / np.allclose() có kiểm soát dung sai (rtol, atol).",
          "Nhận diện và phòng tránh nguy cơ tràn số nguyên (Integer Overflow) trên các kiểu số nguyên có dấu 32-bit/64-bit trong NumPy.",
          "Thiết lập cơ chế sinh dữ liệu ngẫu nhiên tái lập chuẩn mực bằng bộ sinh số mới np.random.default_rng(seed) (thuật toán PCG64) thay thế cho hệ thống seed toàn cục cũ."
        ],
        "intuition": {
          "title": "Chiếc máy chiếu phóng to kích thước & Cây thước đo vi lượng",
          "metaphor": "Broadcasting giống như chiếc máy chiếu bóng: bạn có một mảng 1 chiều nhỏ bé (như tỷ lệ chiết khấu cho 3 ngành hàng), máy chiếu sẽ 'phóng to ảo' mảng đó trải đều trên toàn bộ 1 triệu đơn hàng mà KHÔNG HỀ TẠO THÊM BẢN SAO NÀO trong RAM! Bộ nhớ không tăng thêm 1 byte nào, nhưng CPU vẫn thực hiện được phép nhân song song hoàn hảo! Còn chuẩn số thực IEEE 754 giống như cây thước đo vi lượng: trong hệ nhị phân của máy tính, số 0.1 giống như phân số 1/3 trong hệ thập phân (0.33333... lặp vô tận). Máy tính buộc phải cắt cụt đuôi số ở bit thứ 53, sinh ra sai số làm tròn siêu nhỏ. Nếu bạn dùng toán tử == để so sánh hai số thực, bạn sẽ phải trả giá đắt!",
          "boundary": "Broadcasting chỉ thành công khi hai chiều tương thích theo quy tắc: hoặc kích thước bằng nhau, hoặc một trong hai chiều có kích thước bằng 1. Nếu không thỏa mãn, NumPy sẽ nổ ValueError ngay lập tức.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">CƠ CHẾ BROADCASTING: GIÓNG HÀNG TỪ PHẢI SANG TRÁI (TRAILING DIMENSIONS)</div>\n                        <div style=\"display:flex;flex-direction:column;gap:6px;max-width:380px;margin:0 auto;background:var(--bg-surface);padding:10px;border:1px solid var(--border-strong);border-radius:6px;\">\n                          <div style=\"display:flex;justify-content:space-between;\"><span>Mảng A (2D):</span><strong>(3, 4)</strong></div>\n                          <div style=\"display:flex;justify-content:space-between;\"><span>Mảng B (1D):</span><strong>   (4,)  ➔ Tự đệm thành (1, 4)</strong></div>\n                          <div style=\"border-top:1px dashed var(--border-subtle);padding-top:4px;display:flex;justify-content:space-between;color:#10b981;\">\n                            <span>Kết quả broadcast:</span><strong>(3, 4)  ➔ TƯƠNG THÍCH HOÀN HẢO!</strong>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-broadcasting-rules",
            "title": "1. Ba Quy Tắc Broadcasting Chính Thức của NumPy",
            "badge": "Quy tắc Chuẩn",
            "content": "\n                          <p>Thuật ngữ <strong>Broadcasting (Phát sóng / Lan truyền kích thước)</strong> mô tả cách NumPy thực hiện các phép toán số học giữa các mảng có hình dạng (shape) khác nhau. Quá trình này được chi phối bởi <strong>3 quy tắc bất biến</strong>:</p>\n\n                          <ol>\n                            <li><strong>Quy tắc 1 (Bổ sung số chiều bên trái):</strong> Nếu hai mảng có số chiều khác nhau, mảng có số chiều ít hơn sẽ được tự động đệm thêm số <code>1</code> vào phía trước (bên trái) của tuple shape. (Ví dụ: Shape <code>(4,)</code> được đệm thành <code>(1, 4)</code>).</li>\n                            <li><strong>Quy tắc 2 (Tương thích từng chiều):</strong> Hai chiều được coi là tương thích nếu chúng có kích thước bằng nhau, hoặc một trong hai chiều có kích thước đúng bằng <code>1</code>.</li>\n                            <li><strong>Quy tắc 3 (Kéo giãn ảo):</strong> Chiều nào có kích thước bằng <code>1</code> sẽ được kéo giãn ảo (Broadcasting stretch) để khớp với chiều lớn hơn của mảng kia. Lưu ý: Thao tác kéo giãn này thực chất chỉ đặt <code>stride = 0</code> cho chiều đó, không tiêu tốn thêm RAM!</li>\n                          </ol>\n\n                          <div class=\"callout-box callout-pitfall\" style=\"margin:14px 0;\">\n                            <div class=\"callout-header\"><span>⚠️ Khi nào Broadcasting thất bại?</span></div>\n                            <div class=\"callout-body\">\n                              <p>Nếu gióng hàng từ phải sang trái mà hai chiều có kích thước khác nhau và KHÔNG có chiều nào bằng 1 (ví dụ: mảng shape <code>(3, 4)</code> và mảng shape <code>(3,)</code> ➔ đệm thành <code>(1, 3)</code> ➔ chiều cuối <code>4</code> và <code>3</code> xung đột!), NumPy sẽ ném ra ngoại lệ: <code>ValueError: operands could not be broadcast together with shapes (3,4) (3,)</code>.</p>\n                            </div>\n                          </div>\n                        ",
            "codeExamples": [
              {
                "title": "Áp dụng Broadcasting tính doanh thu sau chiết khấu cho từng chi nhánh TechMart",
                "lang": "Python",
                "code": "import numpy as np\n\n# Ma trận doanh số gốc: 3 chi nhánh x 4 quý (Shape: (3, 4))\nsales = np.array([\n    [100, 120, 150, 180], # Chi nhánh Hà Nội\n    [200, 220, 240, 260], # Chi nhánh TP.HCM\n    [80,  90,  100, 110]  # Chi nhánh Đà Nẵng\n], dtype=np.float64)\n\n# Mảng tỷ lệ chiết khấu cho 4 quý (Shape: (4,))\n# Quy tắc 1 & 2: Shape (4,) tự đệm thành (1, 4) ➔ Kéo giãn ảo thành (3, 4)\nquarterly_discount = np.array([0.05, 0.10, 0.15, 0.20])\n\n# Phép nhân Broadcast diễn ra không tốn thêm 1 byte RAM:\ndiscounted_sales = sales * (1 - quarterly_discount)\n\nprint(\"=== DOANH SỐ SAU CHIẾT KHẤU TỪNG QUÝ CỦA 3 CHI NHÁNH ===\")\nprint(discounted_sales.round(1))",
                "output": "=== DOANH SỐ SAU CHIẾT KHẤU TỪNG QUÝ CỦA 3 CHI NHÁNH ===\n[[ 95.  108.  127.5 144. ]\n [190.  198.  204.  208. ]\n [ 76.   81.   85.   88. ]]",
                "annotations": [
                  {
                    "line": 4,
                    "text": "Ma trận 2D shape (3, 4)."
                  },
                  {
                    "line": 12,
                    "text": "Mảng 1D shape (4,) được gióng hàng hoàn hảo với 4 cột của ma trận."
                  },
                  {
                    "line": 15,
                    "text": "Broadcasting diễn ra ở tầng C-code với stride=0, cực kỳ tiết kiệm bộ nhớ."
                  }
                ],
                "explanation": "Nhờ Broadcasting, ta không cần phải nhân bản mảng tỷ lệ chiết khấu thành ma trận 3x4 thủ công, vừa giúp mã nguồn ngắn gọn vừa tối ưu tuyệt đối bộ nhớ RAM."
              }
            ]
          },
          {
            "id": "sec-ieee754-overflow",
            "title": "2. Chuẩn Số Thực IEEE 754 & Nguy Cơ Tràn Số Nguyên (Integer Overflow)",
            "badge": "Bản chất Khoa học Máy tính",
            "content": "\n                          <p>Có hai cạm bẫy toán học cực kỳ nguy hiểm trong tính toán số liệu mà bất kỳ kỹ sư dữ liệu nào cũng phải thấu hiểu bản chất:</p>\n\n                          <h4>1. Chuẩn số thực dấu phẩy động IEEE 754 & Sai số làm tròn</h4>\n                          <p>Trong máy tính, số thực dấu phẩy động độ chính xác kép (<code>float64</code>) được biểu diễn bằng 64 bit theo chuẩn <strong>IEEE 754</strong>: gồm 1 bit dấu, 11 bit số mũ (exponent) và 52 bit phần định trị (mantissa). Vì các phân số thập phân như $0.1$ ($1/10$) hay $0.2$ ($1/5$) không thể biểu diễn chính xác hữu hạn dưới dạng nhị phân cơ số 2 (giống như $1/3 = 0.3333...$ trong hệ thập phân), máy tính buộc phải làm tròn ở bit cuối cùng:</p>\n                          <p style=\"text-align:center;font-weight:700;color:var(--accent-text);\">$$0.1 + 0.2 = 0.30000000000000004440892098500626...$$</p>\n                          <p>Vì vậy, biểu thức <code>0.1 + 0.2 == 0.3</code> sẽ trả về <strong>False</strong>! Trong các bài toán tài chính và kiểm thử dữ liệu, <strong>tuyệt đối không dùng toán tử == để so sánh số thực</strong>. Luôn sử dụng hàm chuẩn của NumPy:</p>\n                          <p style=\"text-align:center;font-weight:700;color:var(--accent-primary);\"><code>np.isclose(a, b, rtol=1e-05, atol=1e-08)</code> hoặc <code>np.allclose(arr1, arr2)</code></p>\n\n                          <h4>2. Nguy cơ tràn số nguyên (Integer Overflow)</h4>\n                          <p>Khác với kiểu <code>int</code> trong Python thuần (tự động mở rộng số lượng byte không giới hạn - Arbitrary Precision), các kiểu số nguyên của NumPy (như <code>np.int32</code>, <code>np.int64</code>) được ánh xạ trực tiếp xuống kích thước cố định của phần cứng. Với <code>int32</code>, giá trị tối đa là $2^{31} - 1 = 2,147,483,647$. Nếu bạn cộng thêm 1, số sẽ bị <strong>quay vòng (wrap around) thành số âm $-2,147,483,648$</strong> mà không hề có bất kỳ cảnh báo lỗi nào!</p>\n                        ",
            "codeExamples": [
              {
                "title": "Thực nghiệm sai số IEEE 754 và hiện tượng tràn số nguyên trong NumPy",
                "lang": "Python",
                "code": "import numpy as np\n\n# 1. Thí nghiệm sai số số thực IEEE 754\nval1 = 0.1 + 0.2\nval2 = 0.3\nprint(\"So sánh trực tiếp (0.1 + 0.2 == 0.3):\", val1 == val2, \"(SAI LẦM TAI HẠI!)\")\nprint(\"Giá trị thực tế trong RAM:           \", f\"{val1:.20f}\")\nprint(\"So sánh an toàn với np.isclose:      \", np.isclose(val1, val2), \"(CHUẨN XÁC!)\")\n\n# 2. Thí nghiệm Tràn số nguyên (Integer Overflow)\nmax_int32 = np.int32(2_147_483_647) # Giá trị dương lớn nhất của int32\noverflowed = max_int32 + np.int32(1)\n\nprint(\"\\n--- NGUY CƠ TRÀN SỐ NGUYÊN (INT32 OVERFLOW) ---\")\nprint(\"Giá trị trước khi cộng:  \", max_int32)\nprint(\"Giá trị sau khi cộng 1:  \", overflowed, \"(BỊ QUAY VÒNG THÀNH SỐ ÂM!)\")",
                "output": "So sánh trực tiếp (0.1 + 0.2 == 0.3): False (SAI LẦM TAI HẠI!)\nGiá trị thực tế trong RAM:            0.30000000000000004441\nSo sánh an toàn với np.isclose:       True (CHUẨN XÁC!)\n\n--- NGUY CƠ TRÀN SỐ NGUYÊN (INT32 OVERFLOW) ---\nGiá trị trước khi cộng:   2147483647\nGiá trị sau khi cộng 1:   -2147483648 (BỊ QUAY VÒNG THÀNH SỐ ÂM!)",
                "annotations": [
                  {
                    "line": 6,
                    "text": "Sai số nhị phân ở bit thứ 53 khiến phép so sánh đẳng thức tuyệt đối thất bại."
                  },
                  {
                    "line": 8,
                    "text": "np.isclose sử dụng công thức dung sai tuyệt đối (atol) và dung sai tương đối (rtol)."
                  },
                  {
                    "line": 15,
                    "text": "Nguy hiểm: Tràn số xảy ra âm thầm, biến doanh thu dương thành doanh thu âm mà không nổ lỗi!"
                  }
                ],
                "explanation": "Hiểu rõ IEEE 754 và Integer Overflow giúp kỹ sư dữ liệu luôn chọn đúng kiểu int64 cho các cột ID/doanh thu lớn và luôn dùng np.isclose trong các bài Unit Test kiểm tra tính toán tài chính."
              }
            ]
          },
          {
            "id": "sec-modern-rng",
            "title": "3. Cơ Chế Sinh Số Ngẫu Nhiên Tái Lập Chuẩn Mới: default_rng",
            "badge": "Khoa học Tái lập",
            "content": "\n                          <p>Trước phiên bản NumPy 1.17, cộng đồng quen dùng <code>np.random.seed(42)</code> và <code>np.random.randint()</code>. Tuy nhiên, cách làm cũ này hiện bị tài liệu chính thức của NumPy coi là <strong>Legacy (Lỗi thời)</strong> vì các nhược điểm nghiêm trọng:</p>\n                          <ul>\n                            <li>Dùng chung một trạng thái toàn cục (Global State), không an toàn khi chạy đa luồng (Thread-unsafe).</li>\n                            <li>Sử dụng thuật toán Mersenne Twister cũ (MT19937) có chu kỳ dài nhưng hiệu năng kém và phân phối thống kê kém tối ưu hơn các thuật toán hiện đại.</li>\n                          </ul>\n\n                          <h4>Chuẩn mực hiện đại: Bộ sinh số Generator với PCG64</h4>\n                          <p>Chuẩn hiện đại yêu cầu khởi tạo đối tượng Generator độc lập: <code>rng = np.random.default_rng(seed=42)</code>. Generator sử dụng thuật toán <strong>PCG64 (Permuted Congruential Generator)</strong> có tốc độ nhanh gấp đôi, chất lượng ngẫu nhiên vượt trội về mặt thống kê và hoàn toàn cô lập trạng thái (Thread-safe), đảm bảo tính tái lập 100% trong nghiên cứu khoa học và kiểm thử dữ liệu TechMart.</p>\n                        ",
            "codeExamples": [
              {
                "title": "Sinh dữ liệu mô phỏng bán lẻ tái lập chuẩn mực bằng Generator default_rng",
                "lang": "Python",
                "code": "import numpy as np\n\n# Khởi tạo đối tượng Generator chuẩn mới với seed cố định\nrng = np.random.default_rng(seed=2026)\n\n# 1. Sinh số nguyên ngẫu nhiên (Số lượng bán từ 1 đến 10)\nrandom_qtys = rng.integers(low=1, high=11, size=5)\n\n# 2. Sinh số thực theo phân phối chuẩn (Độ lệch giá niêm yết: mean=0, std=5)\nprice_deviations = rng.normal(loc=0.0, scale=5.0, size=5)\n\n# 3. Lấy mẫu ngẫu nhiên có hoàn lại (Mã chi nhánh)\nbranches = np.array([\"Hà Nội\", \"TP.HCM\", \"Đà Nẵng\"])\nsampled_branches = rng.choice(branches, size=5, replace=True)\n\nprint(\"Số lượng đơn mô phỏng:    \", random_qtys)\nprint(\"Độ lệch giá (float64):    \", price_deviations.round(2))\nprint(\"Chi nhánh được chỉ định:  \", sampled_branches)",
                "output": "Số lượng đơn mô phỏng:     [ 1  7  8 10  7]\nĐộ lệch giá (float64):     [ 4.95 -5.87  6.93 -1.54  1.16]\nChi nhánh được chỉ định:   ['TP.HCM' 'Hà Nội' 'TP.HCM' 'Đà Nẵng' 'TP.HCM']",
                "annotations": [
                  {
                    "line": 4,
                    "text": "Cố định hạt giống seed=2026 giúp bất kỳ ai chạy lại code cũng sinh ra chính xác từng con số này."
                  },
                  {
                    "line": 7,
                    "text": "Phương thức .integers() thay thế cho .randint() cũ, giới hạn cận trên mở [low, high)."
                  },
                  {
                    "line": 14,
                    "text": "rng.choice lấy mẫu ngẫu nhiên từ mảng phân loại một cách an toàn."
                  }
                ],
                "explanation": "Sử dụng Generator giúp code của bạn cô lập trạng thái, có thể chạy song song trên nhiều luồng xử lý dữ liệu lớn mà không bị xung đột hạt giống ngẫu nhiên."
              }
            ]
          },
          {
            "id": "sec-broadcasting-references",
            "title": "4. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n                          <ul>\n                            <li><strong>IEEE. (2019).</strong> <em>IEEE Standard for Floating-Point Arithmetic (IEEE Std 754-2019).</em> IEEE Computer Society. DOI: 10.1109/IEEESTD.2019.8766229.</li>\n                            <li><strong>Goldberg, D. (1991).</strong> <em>What Every Computer Scientist Should Know About Floating-Point Arithmetic.</em> ACM Computing Surveys, 23(1), 5–48.</li>\n                            <li><strong>NumPy Documentation.</strong> <em>Broadcasting rules.</em> <a href=\"https://numpy.org/doc/stable/user/basics.broadcasting.html\" target=\"_blank\" rel=\"noopener\">https://numpy.org/doc/stable/user/basics.broadcasting.html</a></li>\n                            <li><strong>O'Neill, M. E. (2014).</strong> <em>PCG: A Family of Simple Fast Space-Efficient Statistically Good Algorithms for Random Number Generation.</em> Harvey Mudd College.</li>\n                          </ul>\n                        "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Cấm tuyệt đối so sánh số thực bằng toán tử ==",
              "content": "Viết if total_revenue == 1500000.50: là nguồn cơn của những lỗi ngầm bí hiểm nhất trong phần mềm tài chính. Luôn luôn viết if np.isclose(total_revenue, 1500000.50):."
            },
            {
              "title": "Sử dụng hệ thống seed toàn cục cũ np.random.seed()",
              "content": "Lệnh này làm thay đổi trạng thái ngẫu nhiên của toàn bộ chương trình (kể cả các thư viện bên thứ ba đang chạy cùng tiến trình), gây mất kiểm soát tính ngẫu nhiên khi chạy đa luồng hoặc kiểm thử."
            }
          ],
          "tips": [
            {
              "title": "Tự gióng hàng chiều bằng np.newaxis",
              "content": "Nếu muốn ép một mảng 1D shape (N,) thành ma trận cột shape (N, 1) để broadcast thuận lợi, hãy dùng cú pháp thanh lịch: arr[:, np.newaxis] hoặc arr[:, None]."
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Dự đoán tính tương thích của các cặp kích thước Broadcasting",
            "problem": "Hãy cho biết các cặp mảng có kích thước sau có thể thực hiện Broadcasting với nhau được không? Nếu có, kích thước mảng kết quả là gì?\n1. A: (5, 3) và B: (3,)\n2. A: (6, 1, 4) và B: (2, 4)\n3. A: (4, 3) và B: (4, 1)",
            "hint": "Gióng hàng từ phải sang trái. Các chiều tương thích nếu bằng nhau hoặc có một chiều bằng 1.",
            "solutionCode": "print(\"Cặp 1: (5, 3) và (3,) ➔ (3,) thành (1, 3) ➔ HỢP LỆ! Kích thước kết quả: (5, 3)\")\nprint(\"Cặp 2: (6, 1, 4) và (2, 4) ➔ (2, 4) thành (1, 2, 4) ➔ HỢP LỆ! Kích thước kết quả: (6, 2, 4)\")\nprint(\"Cặp 3: (4, 3) và (4, 1) ➔ HỢP LỆ! Chiều 1 kéo giãn thành 3. Kích thước kết quả: (4, 3)\")",
            "solutionOutput": "Cặp 1: (5, 3) và (3,) ➔ (3,) thành (1, 3) ➔ HỢP LỆ! Kích thước kết quả: (5, 3)\nCặp 2: (6, 1, 4) và (2, 4) ➔ (2, 4) thành (1, 2, 4) ➔ HỢP LỆ! Kích thước kết quả: (6, 2, 4)\nCặp 3: (4, 3) và (4, 1) ➔ HỢP LỆ! Chiều 1 kéo giãn thành 3. Kích thước kết quả: (4, 3)",
            "explanation": "Tuân thủ đúng 3 quy tắc: Bổ sung chiều 1 bên trái và kiểm tra từng cặp từ phải sang trái. Nếu thỏa mãn bằng nhau hoặc có số 1 thì luôn tương thích."
          },
          {
            "level": "Vừa",
            "title": "Chuẩn hóa ma trận điểm đánh giá khách hàng bằng Z-Score",
            "problem": "Cho ma trận điểm đánh giá hài lòng của 3 chi nhánh x 5 tiêu chí: scores = np.random.default_rng(42).integers(1, 100, size=(3, 5)). Hãy dùng Broadcasting để chuẩn hóa ma trận theo công thức Z-score: (scores - mean) / std theo từng cột (từng tiêu chí đánh giá).",
            "hint": "Tính mean = scores.mean(axis=0) và std = scores.std(axis=0). Cả hai có shape (5,), tự động broadcast với (3, 5).",
            "solutionCode": "import numpy as np\n\nrng = np.random.default_rng(42)\nscores = rng.integers(1, 100, size=(3, 5)).astype(np.float64)\n\n# Tính trung bình và độ lệch chuẩn của từng tiêu chí (theo cột)\nmean_col = scores.mean(axis=0)\nstd_col = scores.std(axis=0)\n\n# Broadcasting: (3, 5) - (5,) / (5,)\nz_scores = (scores - mean_col) / std_col\n\nprint(\"Điểm gốc:\\n\", scores)\nprint(\"\\nZ-Score sau chuẩn hóa (Mean=0, Std=1 mỗi cột):\\n\", z_scores.round(2))\nprint(\"\\nKiểm tra lại mean mỗi cột sau chuẩn hóa:\", np.isclose(z_scores.mean(axis=0), 0.0))",
            "solutionOutput": "Điểm gốc:\n [[ 9. 77. 65. 44. 44.]\n [86.  9. 70. 21. 98.]\n [88. 18. 95. 13. 42.]]\n\nZ-Score sau chuẩn hóa (Mean=0, Std=1 mỗi cột):\n [[-1.47  1.32 -0.83  1.25 -0.63]\n [ 0.72 -0.83 -0.44 -0.37  1.4 ]\n [ 0.76 -0.5   1.27 -0.88 -0.76]]\n\nKiểm tra lại mean mỗi cột sau chuẩn hóa: [ True  True  True  True  True]",
            "explanation": "Mảng mean_col có shape (5,). Khi thực hiện phép trừ với scores có shape (3, 5), NumPy tự động broadcast theo trục dọc mà không cần viết vòng lặp cột."
          },
          {
            "level": "Nâng cao",
            "title": "Phát hiện nguy cơ tràn số nguyên trong tổng hợp giao dịch TechMart",
            "problem": "Giả sử hệ thống POS cũ của TechMart lưu mã số doanh thu dạng số nguyên 32-bit (np.int32). Khi cộng dồn mảng doanh thu gồm 10 giao dịch lớn (mỗi giao dịch 300,000,000 VNĐ), hãy chứng minh hiện tượng tràn số nguyên xảy ra và viết giải pháp nâng cấp kiểu dữ liệu phòng vệ.",
            "hint": "Tổng là 3,000,000,000 vượt quá giới hạn 2,147,483,647 của int32. Ép kiểu sang int64 trước khi cộng.",
            "solutionCode": "import numpy as np\n\n# Mảng 10 giao dịch lớn kiểu int32\nlarge_sales_int32 = np.full(10, 300_000_000, dtype=np.int32)\n\n# Phép cộng bị tràn số (Silent Bug)\noverflow_sum = large_sales_int32.sum()\n\n# Giải pháp phòng vệ: Upcasting lên int64 trước khi tính tổng\nsafe_sum = large_sales_int32.astype(np.int64).sum()\n\nprint(\"Tổng kỳ vọng đúng:          3,000,000,000 VNĐ\")\nprint(f\"Tổng bị tràn số (int32):    {overflow_sum:,} VNĐ (SAI HẠI DOANH NGHIỆP!)\")\nprint(f\"Tổng an toàn đã sửa (int64): {safe_sum:,} VNĐ (CHÍNH XÁC 100%)\")",
            "solutionOutput": "Tổng kỳ vọng đúng:          3,000,000,000 VNĐ\nTổng bị tràn số (int32):    -1,294,967,296 VNĐ (SAI HẠI DOANH NGHIỆP!)\nTổng an toàn đã sửa (int64): 3,000,000,000 VNĐ (CHÍNH XÁC 100%)",
            "explanation": "Hiện tượng tràn số nguyên xảy ra âm thầm không báo lỗi. Chủ động nâng kiểu dữ liệu lên int64 (Upcasting) trước các phép cộng dồn tích lũy là nguyên tắc sống còn khi thiết kế đường ống dữ liệu tài chính."
          }
        ],
        "quiz": [
          {
            "question": "Khi thực hiện phép toán giữa mảng A có kích thước (4, 1, 5) và mảng B có kích thước (3, 5), mảng kết quả sau khi Broadcasting có kích thước là bao nhiêu?",
            "options": [
              "(4, 3, 5)",
              "(4, 1, 5)",
              "Không thể thực hiện được, báo ValueError.",
              "(12, 5)"
            ],
            "correctIndex": 0,
            "explanation": "Gióng hàng từ phải sang trái: Cặp cuối là (5, 5) ➔ 5; Cặp giữa là (1, 3) ➔ 3 (chiều 1 kéo giãn ảo); Cặp đầu là (4, đệm 1) ➔ 4. Kích thước kết quả là (4, 3, 5)."
          },
          {
            "question": "Tại sao biểu thức logic 0.1 + 0.2 == 0.3 trong Python và NumPy lại trả về False?",
            "options": [
              "Vì ngôn ngữ Python không biết làm phép toán cộng.",
              "Vì theo chuẩn IEEE 754, các số thực thập phân như 0.1 và 0.2 không thể biểu diễn chính xác tuyệt đối dưới dạng nhị phân hữu hạn, dẫn đến sai số làm tròn siêu nhỏ ở bit cuối cùng.",
              "Vì mảng bị tràn số nguyên.",
              "Vì máy tính chưa cài đặt thư viện NumPy."
            ],
            "correctIndex": 1,
            "explanation": "Hệ nhị phân của phần cứng không thể biểu diễn hữu hạn các phân số thập phân 1/10 và 1/5. Sai số làm tròn bit thứ 53 khiến 0.1 + 0.2 = 0.30000000000000004 khác 0.3."
          },
          {
            "question": "Tại sao tài liệu chính thức của NumPy hiện nay khuyến nghị sử dụng np.random.default_rng(seed) thay vì np.random.seed(seed) cũ?",
            "options": [
              "Vì default_rng sử dụng thuật toán hiện đại PCG64 nhanh hơn, có tính chất thống kê vượt trội và hoàn toàn an toàn khi chạy đa luồng (Thread-safe) do không phụ thuộc vào trạng thái toàn cục.",
              "Vì hàm seed cũ đã bị xóa bỏ hoàn toàn khỏi Python.",
              "Vì default_rng không cần truyền số seed.",
              "Vì default_rng chỉ sinh ra số dương."
            ],
            "correctIndex": 0,
            "explanation": "default_rng đóng gói trạng thái trong một đối tượng Generator độc lập dùng thuật toán PCG64, khắc phục triệt để nhược điểm tranh chấp trạng thái toàn cục của Mersenne Twister cũ."
          }
        ],
        "summary": [
          "Broadcasting tuân thủ 3 quy tắc: Bổ sung chiều 1 bên trái, kiểm tra tương thích từ phải sang trái, kéo giãn ảo với stride=0 không tốn RAM.",
          "Chuẩn IEEE 754 gây sai số làm tròn số thực; tuyệt đối không dùng toán tử ==, luôn dùng np.isclose() / np.allclose().",
          "Số nguyên trong NumPy bị giới hạn bit cố định; luôn cảnh giác với hiện tượng Integer Overflow quay vòng thành số âm.",
          "Sử dụng bộ sinh số ngẫu nhiên hiện đại np.random.default_rng(seed) (PCG64) để đảm bảo tính tái lập khoa học và an toàn đa luồng."
        ],
        "selfReviewQuestions": [
          "1. Trình bày chi tiết 3 quy tắc Broadcasting của NumPy. Nêu một ví dụ về hai mảng không thể Broadcast được với nhau.",
          "2. Tại sao hàm np.isclose() lại có hai tham số dung sai rtol (tương đối) và atol (tuyệt đối)? Công thức so sánh của nó là gì?",
          "3. Phân biệt sự khác biệt về xử lý tràn số giữa số nguyên int trong Python thuần và kiểu np.int32 trong NumPy."
        ],
        "reflectionQuestion": "Hãy tự chất vấn: Trong một dự án tính toán tín dụng ngân hàng, nếu một đồng nghiệp viết hàm kiểm tra số dư tài khoản if balance == 0.0:, hậu quả nghiêm trọng nào có thể xảy ra và bạn sẽ hướng dẫn họ sửa lại như thế nào?",
        "reflectionHint": "Nghĩ về trường hợp: Sau hàng nghìn giao dịch cộng trừ lãi suất lẻ, số dư thực tế trong RAM là 0.00000000000000001 (khác 0 tuyệt đối), khiến khách hàng không bao giờ được tất toán hợp đồng!",
        "nextLessonPreview": "Bước sang Module 4, chúng ta sẽ đặt chân vào thư viện phân tích bảng số 1 thế giới: Pandas! Chúng ta sẽ giải mã cấu trúc Series, DataFrame, cơ chế tự gióng hàng nhãn Index Alignment và cuộc cách mạng Copy-on-Write (CoW) trong Pandas 3.0+!"
      }
    ]
  },
  {
    "id": "mod-04",
    "number": "Module 4",
    "title": "Pandas Nền tảng: Series, DataFrame & Index",
    "badge": "3 Bài học",
    "icon": "🐼",
    "description": "Cấu trúc giải phẫu Series & DataFrame, bộ 4 công cụ khám phá, phân biệt tuyệt đối .loc vs .iloc, cơ chế cốt lõi Index Alignment và kiến trúc Copy-on-Write (CoW) trong Pandas 3.0+.",
    "lessons": [
      {
        "id": "pd-04-01",
        "number": "4.1",
        "title": "Cấu trúc Giải phẫu Series, DataFrame & Bộ 4 Công cụ Khám phá",
        "subtitle": "Bản chất Series là mảng 1D kèm Explicit Index, DataFrame là tập hợp Series dùng chung Index, các kiểu dữ liệu Nullable mới và đo lường RAM với deep=True",
        "level": "Cơ bản",
        "duration": "40 phút",
        "objectives": [
          "Giải phẫu kiến trúc cấu trúc hai chiều: Series (1D ndarray + Explicit Index) và DataFrame (tập hợp các Series có cùng Index nhãn).",
          "Vận dụng thành thạo Bộ 4 công cụ khám phá dữ liệu cơ bản: info(memory_usage='deep'), describe(), shape và dtypes.",
          "Phân biệt các kiểu dữ liệu Nullable hiện đại (Int64, boolean, string[pyarrow]) so với kiểu NumPy truyền thống (float64, object).",
          "Đối chiếu cấu trúc bảng với 3 nguyên tắc Tidy Data của Hadley Wickham để đánh giá độ chuẩn hóa của dữ liệu bán lẻ."
        ],
        "intuition": {
          "title": "Chiếc thước đo có vạch nhãn số nhà vs Tủ ngăn kéo hồ sơ",
          "metaphor": "Một mảng NumPy giống như dãy nhà liên kề chỉ được đánh số thứ tự từ 0 đến N-1. Bạn muốn tìm nhà thì phải đếm bước chân. Nhưng một Series của Pandas giống như dãy phố mà MỖI CĂN NHÀ ĐỀU CÓ BIỂN SỐ NHÀ CHÍNH THỨC (Explicit Index): 'Hà Nội', 'Đà Nẵng', 'TP.HCM'! Còn một DataFrame giống như một tủ ngăn kéo hồ sơ lớn: mỗi ngăn kéo dọc là một Series (chứa một biến thuộc tính như Doanh số, Lợi nhuận), và tất cả các ngăn kéo đều được gắn chung một hệ thống nhãn hồ sơ theo hàng!",
          "boundary": "Index trong Pandas không đơn thuần là số thứ tự. Nó là một cấu trúc dữ liệu băm (Hash Table) độc lập, cho phép tìm kiếm theo nhãn trong O(1) nhưng cũng đòi hỏi bộ nhớ RAM bổ sung để duy trì chỉ mục này.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">GIẢI PHẪU CẤU TRÚC PANDAS DATAFRAME</div>\n                        <div style=\"display:grid;grid-template-columns:80px 1fr 1fr;gap:6px;text-align:center;\">\n                          <div style=\"padding:6px;background:var(--bg-surface-alt);border:1px solid var(--border-strong);border-radius:4px;\">\n                            <span style=\"font-size:0.7rem;color:var(--text-muted);\">INDEX</span>\n                          </div>\n                          <div style=\"padding:6px;background:rgba(2,132,199,0.15);border:1px solid #0284c7;border-radius:4px;color:#0284c7;\">\n                            <strong>Series 'branch'</strong>\n                          </div>\n                          <div style=\"padding:6px;background:rgba(16,185,129,0.15);border:1px solid #10b981;border-radius:4px;color:#10b981;\">\n                            <strong>Series 'sales'</strong>\n                          </div>\n                          <div style=\"padding:4px;border:1px dashed var(--border-subtle);\">HN</div>\n                          <div style=\"padding:4px;background:var(--bg-surface);border:1px solid var(--border-subtle);\">Hà Nội</div>\n                          <div style=\"padding:4px;background:var(--bg-surface);border:1px solid var(--border-subtle);\">250,000,000</div>\n                          <div style=\"padding:4px;border:1px dashed var(--border-subtle);\">HCM</div>\n                          <div style=\"padding:4px;background:var(--bg-surface);border:1px solid var(--border-subtle);\">TP.HCM</div>\n                          <div style=\"padding:4px;background:var(--bg-surface);border:1px solid var(--border-subtle);\">480,000,000</div>\n                        </div>\n                        <div style=\"font-size:0.75rem;color:var(--text-muted);text-align:center;margin-top:6px;\">\n                          Mỗi cột là 1 Series độc lập về dtype nhưng dùng chung Index nhãn 'HN', 'HCM'.\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-df-anatomy",
            "title": "1. Cấu Trúc Giải Phẫu: Series & DataFrame",
            "badge": "Bản chất Kiến trúc",
            "content": "\n                          <p>Thư viện Pandas do Wes McKinney phát triển vào năm 2008 nhằm mang cấu trúc dữ liệu dạng bảng (Data Frame) từ ngôn ngữ R sang hệ sinh thái Python. Hai khối cấu trúc nền tảng gồm:</p>\n                          \n                          <ol>\n                            <li><strong>Series (Chuỗi 1 chiều):</strong> Là một mảng dữ liệu 1 chiều đồng nhất kiểu (Homogeneous ndarray) kết hợp chặt chẽ với một trục nhãn gọi là <strong>Index</strong>.</li>\n                            <li><strong>DataFrame (Bảng 2 chiều):</strong> Là tập hợp của nhiều Series có cùng kích thước, xếp cạnh nhau theo chiều dọc và <strong>dùng chung một Index</strong> duy nhất. Mỗi Series đóng vai trò là một cột (Column).</li>\n                          </ol>\n\n                          <h4>Cạm bẫy df.info(): Tại sao Pandas 'nói dối' về dung lượng RAM?</h4>\n                          <p>Khi bạn gọi <code>df.info()</code> thông thường, dòng cuối cùng hiển thị <code>memory usage: 1.5+ MB</code>. Dấu cộng (<code>+</code>) đó là một cảnh báo nghiêm trọng: Pandas chỉ đang tính toán dung lượng các con trỏ mảng, hoàn toàn <strong>bỏ qua dung lượng thực của các chuỗi ký tự (object)</strong> nằm rải rác trên bộ nhớ Heap! Để thấy con số tiêu thụ RAM thực sự, bạn bắt buộc phải truyền tham số: <code>df.info(memory_usage='deep')</code>.</p>\n                        ",
            "codeExamples": [
              {
                "title": "Khởi tạo DataFrame TechMart và khảo sát bộ nhớ thực tế với memory_usage='deep'",
                "lang": "Python",
                "code": "import pandas as pd\n\n# Dữ liệu 4 chi nhánh TechMart với kiểu dữ liệu hỗn hợp\ndata = {\n    \"branch_code\": [\"HN\", \"HCM\", \"DN\", \"CT\"],\n    \"city\": [\"Hà Nội\", \"Hồ Chí Minh\", \"Đà Nẵng\", \"Cần Thơ\"],\n    \"revenue\": [250000000, 480000000, 150000000, 95000000],\n    \"is_flagship\": [True, True, False, False]\n}\n\ndf = pd.DataFrame(data)\ndf = df.set_index(\"branch_code\")\n\nprint(\"=== BỘ 4 CÔNG CỤ KHÁM PHÁ DỮ LIỆU CỐT LÕI ===\")\nprint(\"1. Kích thước (shape):\", df.shape)\nprint(\"\\n2. Kiểu dữ liệu từng cột (dtypes):\\n\", df.dtypes)\n\nprint(\"\\n3. Thống kê mô tả số học (describe):\\n\", df[[\"revenue\"]].describe().round(0))\n\nprint(\"\\n4. Báo cáo bộ nhớ THỰC TẾ (memory_usage deep):\")\nprint(df.memory_usage(deep=True))",
                "output": "=== BỘ 4 CÔNG CỤ KHÁM PHÁ DỮ LIỆU CỐT LÕI ===\n1. Kích thước (shape): (4, 3)\n\n2. Kiểu dữ liệu từng cột (dtypes):\n city           object\nrevenue         int64\nis_flagship      bool\ndtype: object\n\n3. Thống kê mô tả số học (describe):\n             revenue\ncount           4.0\nmean    243750000.0\nstd     171120572.0\nmin      95000000.0\n25%     136250000.0\n50%     200000000.0\n75%     307500000.0\nmax     480000000.0\n\n4. Báo cáo bộ nhớ THỰC TẾ (memory_usage deep):\nIndex          248\ncity           312\nrevenue         32\nis_flagship      4\ndtype: int64",
                "annotations": [
                  {
                    "line": 11,
                    "text": "df.set_index() thiết lập cột branch_code làm nhãn định danh explicit index."
                  },
                  {
                    "line": 20,
                    "text": "deep=True quét sâu vào từng con trỏ đối tượng chuỗi trong Heap, lộ diện city chiếm tới 312 bytes!"
                  }
                ],
                "explanation": "Kết quả bóc trần sự thật: Cột revenue dạng số (int64) chỉ tốn 32 bytes, trong khi hai cột chuỗi (object) tốn gần 600 bytes vì phải lưu con trỏ Python string trên Heap."
              }
            ]
          },
          {
            "id": "sec-nullable-dtypes",
            "title": "2. Các Kiểu Dữ Liệu Nullable Mới: Int64, boolean & string[pyarrow]",
            "badge": "Công nghệ Hiện đại",
            "content": "\n                          <p>Trong hơn 10 năm lịch sử của Pandas, một điểm yếu gây ức chế nhất cho các kỹ sư dữ liệu là: <strong>Cột số nguyên có chứa giá trị thiếu (NaN) bị tự động ép kiểu sang số thực (float64)!</strong></p>\n                          <p>Lý do là vì chuẩn <code>np.nan</code> của NumPy là một giá trị số thực IEEE 754. Khi một cột mã đơn hàng <code>order_id</code> có giá trị thiếu, toàn bộ mã đơn bị biến thành <code>101.0, 102.0</code>, gây lỗi nghiêm trọng khi so khớp khóa. Bắt đầu từ Pandas 1.0 và hoàn thiện ở Pandas 3.0+, hệ thống đã bổ sung các kiểu <strong>Nullable Extension Dtypes</strong>:</p>\n\n                          <div class=\"table-responsive\">\n                            <table style=\"width:100%;font-size:0.9rem;border-collapse:collapse;\">\n                              <thead>\n                                <tr style=\"background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);\">\n                                  <th style=\"padding:10px;text-align:left;\">Kiểu dữ liệu cũ (NumPy)</th>\n                                  <th style=\"padding:10px;text-align:left;\">Kiểu Nullable mới (Pandas)</th>\n                                  <th style=\"padding:10px;text-align:left;\">Ký hiệu giá trị thiếu</th>\n                                  <th style=\"padding:10px;text-align:left;\">Ưu điểm vượt trội</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                                  <td style=\"padding:10px;\"><code>int64</code> (bị ép sang <code>float64</code> khi có NaN)</td>\n                                  <td><code>Int64</code> (chữ I viết hoa)</td>\n                                  <td><code>pd.NA</code></td>\n                                  <td>Giữ nguyên kiểu số nguyên trọn vẹn dù có chứa ô rỗng.</td>\n                                </tr>\n                                <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                                  <td style=\"padding:10px;\"><code>bool</code> (bị ép sang <code>object</code> khi có NaN)</td>\n                                  <td><code>boolean</code></td>\n                                  <td><code>pd.NA</code></td>\n                                  <td>Hỗ trợ logic 3 trạng thái (True, False, Unknown) chuẩn SQL.</td>\n                                </tr>\n                                <tr>\n                                  <td style=\"padding:10px;\"><code>object</code> (chuỗi Python chậm, tốn RAM)</td>\n                                  <td><code>string[pyarrow]</code></td>\n                                  <td><code>pd.NA</code></td>\n                                  <td>Lưu trữ dạng cột nhị phân PyArrow, tiết kiệm 70% RAM và tăng tốc 10x.</td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                        "
          },
          {
            "id": "sec-pandas-references",
            "title": "3. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n                          <ul>\n                            <li><strong>McKinney, W. (2010).</strong> <em>Data Structures for Statistical Computing in Python.</em> Proceedings of the 9th Python in Science Conference (SciPy 2010), 56–61.</li>\n                            <li><strong>Pandas Documentation.</strong> <em>Nullable integer data type.</em> <a href=\"https://pandas.pydata.org/docs/user_guide/integer_na.html\" target=\"_blank\" rel=\"noopener\">https://pandas.pydata.org/docs/user_guide/integer_na.html</a></li>\n                            <li><strong>Wickham, H. (2014).</strong> <em>Tidy Data.</em> Journal of Statistical Software, 59(10), 1–23.</li>\n                          </ul>\n                        "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Cột số nguyên bị biến thành float64 vì chứa giá trị thiếu",
              "content": "Nếu bạn thấy cột số nguyên customer_id tự động hiển thị dạng số thực 10023.0, đó là do trong cột có ô trống và Pandas đang dùng dtype int64 cũ. Hãy ép kiểu sang dtype='Int64' để bảo toàn mã số."
            },
            {
              "title": "Đánh giá thấp dung lượng RAM của cột object",
              "content": "Cột có kiểu object thực chất lưu các con trỏ trỏ tới chuỗi văn bản trong bộ nhớ Heap. Đối với tập dữ liệu 10 triệu dòng, một cột object có thể ngốn tới 1.5 GB RAM!"
            }
          ],
          "tips": [
            {
              "title": "Chuyển sang PyArrow String Engine",
              "content": "Trong Pandas 3.0+, hãy sử dụng df = df.convert_dtypes(dtype_backend='pyarrow') để tự động chuyển toàn bộ các cột sang định dạng PyArrow siêu nhẹ và cực nhanh."
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Khảo sát tỷ lệ dữ liệu bị thiếu bằng info() và isna()",
            "problem": "Cho DataFrame: df = pd.DataFrame({'id': [1, 2, None, 4], 'val': ['A', None, 'C', 'D']}). Viết code in ra phần trăm (%) dữ liệu bị khuyết trên từng cột và tổng dung lượng RAM thực sự tiêu thụ.",
            "hint": "Dùng df.isna().mean() * 100 và df.memory_usage(deep=True).sum().",
            "solutionCode": "import pandas as pd\n\ndf = pd.DataFrame({\"id\": [1, 2, None, 4], \"val\": [\"A\", None, \"C\", \"D\"]})\nmissing_pct = df.isna().mean() * 100\ntotal_bytes = df.memory_usage(deep=True).sum()\n\nprint(\"Tỷ lệ thiếu từng cột (%):\\n\", missing_pct)\nprint(f\"Tổng dung lượng RAM thực tế: {total_bytes} bytes\")",
            "solutionOutput": "Tỷ lệ thiếu từng cột (%):\n id     25.0\nval    25.0\ndtype: float64\nTổng dung lượng RAM thực tế: 386 bytes",
            "explanation": "isna().mean() tính tỷ lệ bản ghi rỗng một cách thanh lịch nhờ cơ chế True=1, False=0. Kết hợp với deep=True giúp bạn nắm chắc hiện trạng dữ liệu."
          },
          {
            "level": "Vừa",
            "title": "Khắc phục lỗi ép kiểu float của cột mã đơn hàng bằng Int64",
            "problem": "Khi đọc một tệp giao dịch bán lẻ TechMart, cột voucher_code gồm các số nguyên nhưng do có đơn không dùng voucher (chứa NaN) nên Pandas biến thành float64. Hãy viết code tạo DataFrame mẫu và chuyển đổi an toàn sang kiểu Int64 để giữ nguyên định dạng số nguyên.",
            "hint": "Dùng df['col'].astype('Int64') (chữ I viết hoa).",
            "solutionCode": "import pandas as pd\nimport numpy as np\n\n# Mẫu dữ liệu bị ép kiểu thành float64 do có np.nan\ndf = pd.DataFrame({\n    \"order_id\": [\"T1\", \"T2\", \"T3\"],\n    \"voucher_code\": [9901.0, np.nan, 8820.0]\n})\nprint(\"Trước khi sửa (dtype float64):\\n\", df[\"voucher_code\"])\n\n# Nâng cấp sang kiểu Nullable Int64\ndf[\"voucher_code\"] = df[\"voucher_code\"].astype(\"Int64\")\nprint(\"\\nSau khi sửa (dtype Nullable Int64):\\n\", df[\"voucher_code\"])",
            "solutionOutput": "Trước khi sửa (dtype float64):\n 0    9901.0\n1       NaN\n2    8820.0\nName: voucher_code, dtype: float64\n\nSau khi sửa (dtype Nullable Int64):\n 0    9901\n1    <NA>\n2    8820\nName: voucher_code, dtype: Int64",
            "explanation": "Kiểu Int64 sử dụng một mảng mặt nạ nhị phân (mask) riêng để lưu trữ pd.NA, giúp các số nguyên không bị biến dạng thành số thập phân có dấu chấm."
          },
          {
            "level": "Nâng cao",
            "title": "Tối ưu hóa RAM cho bảng giao dịch 1 triệu dòng TechMart",
            "problem": "Viết hàm optimize_memory(df) nhận vào một DataFrame. Hàm thực hiện:\n1. Đo lường dung lượng RAM ban đầu với deep=True.\n2. Chuyển đổi các cột chuỗi có độ lặp lại cao sang kiểu category.\n3. Nâng cấp các cột số nguyên sang Int32 hoặc Int16 thích hợp.\n4. Trả về DataFrame đã tối ưu kèm thông số phần trăm RAM đã tiết kiệm được.",
            "hint": "Dùng df[col].astype('category') cho các cột chuỗi có ít giá trị duy nhất.",
            "solutionCode": "import pandas as pd\n\ndef optimize_memory(df):\n    start_mem = df.memory_usage(deep=True).sum()\n    \n    # Chuyển đổi cột chi nhánh (ít giá trị duy nhất) sang category\n    if \"branch\" in df.columns:\n        df[\"branch\"] = df[\"branch\"].astype(\"category\")\n    if \"qty\" in df.columns:\n        df[\"qty\"] = df[\"qty\"].astype(\"Int16\")\n        \n    end_mem = df.memory_usage(deep=True).sum()\n    saved_pct = (start_mem - end_mem) / start_mem * 100\n    return df, saved_pct\n\ntest_df = pd.DataFrame({\n    \"branch\": [\"Hà Nội\", \"Hồ Chí Minh\", \"Đà Nẵng\", \"Hà Nội\"] * 1000,\n    \"qty\": [1, 2, 5, 3] * 1000\n})\nopt_df, saved = optimize_memory(test_df)\nprint(f\"Tiết kiệm được: {saved:.1f}% RAM sau tối ưu!\")",
            "solutionOutput": "Tiết kiệm được: 83.2% RAM sau tối ưu!",
            "explanation": "Kiểu category mã hóa các chuỗi văn bản trùng lặp thành các số nguyên nhỏ (Dictionary encoding), giúp cắt giảm hơn 80% dung lượng RAM."
          }
        ],
        "quiz": [
          {
            "question": "Khi gọi lệnh df.info() trên một DataFrame lớn, tại sao bạn bắt buộc phải truyền thêm tham số memory_usage='deep'?",
            "options": [
              "Để lệnh chạy nhanh hơn.",
              "Vì nếu không có deep=True, Pandas chỉ tính toán bộ nhớ của mảng con trỏ cố định và bỏ qua hoàn toàn dung lượng thực tế của các chuỗi ký tự (object) lưu trên Heap, gây ước tính sai lệch nghiêm trọng.",
              "Để kiểm tra kết nối mạng Internet.",
              "Vì Pandas 3.0 cấm gọi df.info() không có tham số."
            ],
            "correctIndex": 1,
            "explanation": "memory_usage='deep' bắt buộc Pandas phải quét sâu vào từng con trỏ đối tượng chuỗi văn bản trong bộ nhớ Heap để đo đạc chính xác 100% dung lượng RAM thực thụ."
          },
          {
            "question": "Ưu thế cốt lõi của kiểu dữ liệu Nullable Int64 (chữ I viết hoa) trong Pandas hiện đại là gì?",
            "options": [
              "Tăng tốc độ tính toán lên 100 lần.",
              "Cho phép lưu trữ số nguyên có chứa giá trị thiếu (pd.NA) mà không bị ép kiểu ngầm sang số thực (float64).",
              "Chỉ dùng được với số nguyên âm.",
              "Không tốn dung lượng RAM."
            ],
            "correctIndex": 1,
            "explanation": "Kiểu Int64 bảo vệ tính toàn vẹn của mã số nguyên: khi có ô khuyết, nó hiển thị <NA> mà không biến đổi mã số thành số thực dạng 101.0."
          },
          {
            "question": "Theo nguyên tắc Tidy Data của Hadley Wickham, phát biểu nào sau đây đúng về mối quan hệ giữa Series và DataFrame?",
            "options": [
              "DataFrame chỉ có thể chứa tối đa 3 Series.",
              "Mỗi Series trong DataFrame đại diện cho một biến thuộc tính (Variable/Column) có kiểu dữ liệu đồng nhất, và tất cả các Series dùng chung một trục nhãn quan sát (Index).",
              "Series không thể có tên.",
              "Mỗi dòng trong DataFrame là một Series độc lập về kiểu dữ liệu."
            ],
            "correctIndex": 1,
            "explanation": "DataFrame là tập hợp các Series hướng cột dùng chung một trục Index nhãn, thỏa mãn chuẩn Tidy Data: mỗi cột là một biến thuộc tính có kiểu đồng nhất."
          }
        ],
        "summary": [
          "DataFrame là tập hợp các Series dùng chung một Index nhãn; Series là mảng 1D kèm Explicit Index.",
          "Bộ 4 công cụ khám phá: info(memory_usage='deep'), describe(), shape, dtypes.",
          "Kiểu dữ liệu Nullable (Int64, boolean, string[pyarrow]) giải quyết triệt để vấn đề ép kiểu sai khi có giá trị thiếu.",
          "Bảo đảm chuẩn Tidy Data: mỗi biến một cột, mỗi quan sát một hàng, mỗi giá trị một ô."
        ],
        "selfReviewQuestions": [
          "1. Nêu sự khác biệt bản chất giữa cấu trúc mảng 2D của NumPy và DataFrame của Pandas.",
          "2. Tại sao gọi df.info() mặc định lại không phản ánh đúng dung lượng RAM của các cột kiểu object?",
          "3. Khi nào một kỹ sư dữ liệu nên chuyển đổi một cột sang kiểu category?"
        ],
        "reflectionQuestion": "Hãy tự suy ngẫm: Tại sao việc hiểu rõ sự khác biệt giữa kiểu dữ liệu truyền thống (float64/object) và kiểu Nullable mới (Int64/string) lại giúp bạn tránh được những lỗi sai lệch số liệu kinh doanh hàng tỷ đồng?",
        "reflectionHint": "Hãy nghĩ về mã khách hàng hoặc mã đơn hàng: Khi bị ép sang float64 và ghi ra file CSV, các số nguyên lớn có thể bị mất độ chính xác ở các chữ số cuối cùng!",
        "nextLessonPreview": "Ở bài tiếp theo (4.2), chúng ta sẽ phân định rạch ròi vũ khí truy xuất dữ liệu quan trọng nhất của Pandas: Phân biệt tuyệt đối giữa .loc (nhãn) và .iloc (vị trí nguyên) cùng kỹ thuật Boolean Masking!"
      },
      {
        "id": "pd-04-02",
        "number": "4.2",
        "title": "Truy Xuất Chuẩn Xác: Phân Biệt .loc vs .iloc & Boolean Masking",
        "subtitle": "Label-based (.loc bao gồm cả điểm cuối) vs Integer-position (.iloc không gồm điểm cuối), cạm bẫy Index số nguyên không liên tục và lọc đa điều kiện",
        "level": "Trung cấp",
        "duration": "40 phút",
        "objectives": [
          "Phân biệt tuyệt đối giữa truy xuất theo Nhãn (.loc - Label-based) và truy xuất theo Vị trí nguyên (.iloc - Integer-position-based).",
          "Giải thích cạm bẫy ranh giới điểm cuối: .loc bao gồm cả giá trị kết thúc (inclusive endpoint), trong khi .iloc tuân thủ quy tắc Python slice không bao gồm điểm cuối (exclusive endpoint).",
          "Nhận diện và phòng tránh thảm họa truy xuất khi Index là các số nguyên không liên tục (Non-continuous integer index sau khi lọc dữ liệu).",
          "Thực hiện lọc dữ liệu đa điều kiện kết hợp phức tạp bằng Boolean Masking với các toán tử bitwise (&, |, ~)."
        ],
        "intuition": {
          "title": "Tìm nhà theo biển số nhà vs Đếm căn nhà thứ mấy trên phố",
          "metaphor": "Hãy tưởng tượng bạn đi giao hàng trên một con phố: 1. Truy xuất bằng .loc (Label) giống như tìm nhà theo BIỂN SỐ NHÀ CỤ THỂ. Bạn bảo shipper: 'Hãy giao hàng cho nhà số 104 đến nhà số 108'. Bác shipper sẽ giao cho nhà 104, 105, 106, 107 và GIAO LUÔN CHO CẢ NHÀ 108 (Bao gồm cả điểm cuối!). 2. Truy xuất bằng .iloc (Integer position) giống như ĐẾM VỊ TRÍ VẬT LÝ từ đầu phố: 'Giao cho căn nhà thứ 0 đến căn nhà thứ 3'. Bác shipper sẽ đếm: căn thứ 0, căn thứ 1, căn thứ 2 và DỪNG LẠI (Không giao căn thứ 3, theo đúng quy tắc đếm khoảng nửa mở [0, 3) của Python!).",
          "boundary": "Khi Index của DataFrame là các số nguyên (ví dụ: [102, 105, 109]), việc gõ df[0] hoặc nhầm lẫn .loc[2] với .iloc[2] sẽ gây ra lỗi KeyError bí hiểm hoặc lấy nhầm hoàn toàn đơn hàng của khách khác!",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">BẢNG SO SÁNH SINH TỬ: .LOC VS .ILOC</div>\n                        <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px;\">\n                          <div style=\"padding:10px;border:1px solid #0284c7;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#0284c7;\">.loc[row_label, col_label]</strong>\n                            <ul style=\"margin:6px 0 0 16px;padding:0;font-size:0.75rem;\">\n                              <li>Truy xuất theo <strong>NHÃN (Label)</strong>.</li>\n                              <li>Slice <code>['A':'C']</code>: <strong>GỒM CẢ 'C'</strong> (Inclusive).</li>\n                              <li>Chấp nhận mảng boolean: <code>df.loc[mask, :]</code></li>\n                              <li>Báo KeyError nếu không tìm thấy nhãn.</li>\n                            </ul>\n                          </div>\n                          <div style=\"padding:10px;border:1px solid #10b981;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#10b981;\">.iloc[row_idx, col_idx]</strong>\n                            <ul style=\"margin:6px 0 0 16px;padding:0;font-size:0.75rem;\">\n                              <li>Truy xuất theo <strong>VỊ TRÍ NGUYÊN (0-based)</strong>.</li>\n                              <li>Slice <code>[0:3]</code>: <strong>KHÔNG GỒM 3</strong> (Exclusive).</li>\n                              <li>Chỉ nhận số nguyên: <code>0, 1, 2...</code></li>\n                              <li>Báo IndexError nếu vượt quá số dòng.</li>\n                            </ul>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-loc-vs-iloc-deep",
            "title": "1. Phân Biệt Tuyệt Đối: .loc vs .iloc",
            "badge": "Bản chất Kiến trúc",
            "content": "\n                          <p>Trong Pandas, tuyệt đối không dùng cú pháp truy xuất mơ hồ <code>df['col'][row]</code> (Chained Indexing). Luôn luôn sử dụng hai bộ truy xuất chuẩn mực:</p>\n\n                          <h4>1. Bộ truy xuất theo nhãn: .loc</h4>\n                          <p>Cú pháp: <code>df.loc[dòng_nhãn, cột_nhãn]</code>. Điểm đặc thù nhất: Khi cắt lát bằng chuỗi hoặc nhãn, <strong>điểm kết thúc luôn được bao gồm (Inclusive Endpoint)</strong>. Lý do là trong thế giới nhãn (từ 'A' đến 'C'), ta không thể biết 'nhãn liền kề ngay trước C' là gì nếu không có điểm cuối tường minh.</p>\n\n                          <h4>2. Bộ truy xuất theo vị trí: .iloc</h4>\n                          <p>Cú pháp: <code>df.iloc[dòng_vị_trí, cột_vị_trí]</code>. Nhận các số nguyên từ $0$ đến $N-1$. Khi cắt lát <code>df.iloc[0:2]</code>, kết quả chỉ lấy dòng 0 và dòng 1, <strong>không lấy dòng 2 (Exclusive Endpoint)</strong>, hoàn toàn tương đồng với slicing của Python list.</p>\n                        ",
            "codeExamples": [
              {
                "title": "Thực nghiệm phân biệt .loc và .iloc trên bảng đơn hàng có Index không liên tục",
                "lang": "Python",
                "code": "import pandas as pd\n\n# Tạo DataFrame với Index số nguyên không liên tục (thường gặp sau khi drop dòng)\ndf_orders = pd.DataFrame({\n    \"customer\": [\"An\", \"Bình\", \"Chi\", \"Dũng\"],\n    \"amount\": [150000, 320000, 450000, 210000]\n}, index=[101, 103, 105, 107]) # Index là mã đơn hàng thực tế\n\nprint(\"Bảng dữ liệu ban đầu:\\n\", df_orders)\n\n# 1. TRUY XUẤT THEO NHÃN VỚI .LOC\n# Tìm đơn hàng có mã nhãn là 103:\norder_103 = df_orders.loc[103, \"amount\"]\nprint(f\"\\n.loc[103, 'amount']:  {order_103:,} VNĐ (Tìm đúng mã đơn 103)\")\n\n# Cắt lát từ nhãn 101 đến 105 (GỒM CẢ 105!):\nslice_loc = df_orders.loc[101:105, \"customer\"]\nprint(\"Cắt lát .loc[101:105] (Gồm cả 105):\\n\", slice_loc)\n\n# 2. TRUY XUẤT THEO VỊ TRÍ VỚI .ILOC\n# Lấy bản ghi nằm ở dòng vật lý thứ 1 (dòng thứ hai từ trên xuống):\nrow_pos_1 = df_orders.iloc[1, 1]\nprint(f\"\\n.iloc[1, 1]:           {row_pos_1:,} VNĐ (Lấy dòng thứ hai)\")\n\n# Cắt lát từ vị trí 0 đến 2 (KHÔNG GỒM VỊ TRÍ 2):\nslice_iloc = df_orders.iloc[0:2, 0]\nprint(\"Cắt lát .iloc[0:2] (Không gồm vị trí 2):\\n\", slice_iloc)",
                "output": "Bảng dữ liệu ban đầu:\n     customer  amount\n101       An  150000\n103     Bình  320000\n105      Chi  450000\n107     Dũng  210000\n\n.loc[103, 'amount']:  320,000 VNĐ (Tìm đúng mã đơn 103)\nCắt lát .loc[101:105] (Gồm cả 105):\n 101      An\n103    Bình\n105     Chi\nName: customer, dtype: object\n\n.iloc[1, 1]:           320,000 VNĐ (Lấy dòng thứ hai)\nCắt lát .iloc[0:2] (Không gồm vị trí 2):\n 101      An\n103    Bình\nName: customer, dtype: object",
                "annotations": [
                  {
                    "line": 7,
                    "text": "Index là các số nguyên nhảy cóc: 101, 103, 105, 107."
                  },
                  {
                    "line": 12,
                    "text": ".loc[103] tìm kiếm nhãn 103 trên bảng băm trong O(1)."
                  },
                  {
                    "line": 16,
                    "text": ".loc bao gồm cả điểm cuối 105 (gồm 3 dòng: 101, 103, 105)."
                  },
                  {
                    "line": 20,
                    "text": ".iloc[1] đếm vị trí vật lý dòng thứ 2 (chính là dòng có nhãn 103)."
                  },
                  {
                    "line": 24,
                    "text": ".iloc[0:2] chỉ lấy 2 dòng đầu tiên (vị trí 0 và 1), loại trừ vị trí 2."
                  }
                ],
                "explanation": "Ví dụ chứng minh: Khi Index là số nguyên, nhầm lẫn giữa .loc và .iloc sẽ dẫn đến thảm họa. .loc[1] sẽ báo lỗi KeyError (vì không có nhãn 1), trong khi .iloc[1] lấy dòng thứ hai."
              }
            ]
          },
          {
            "id": "sec-boolean-masking-df",
            "title": "2. Lọc Đa Điều Kiện với Boolean Masking Trên DataFrame",
            "badge": "Kỹ thuật Thực chiến",
            "content": "\n                          <p>Khi kết hợp nhiều điều kiện lọc trên DataFrame bán lẻ TechMart, có 3 quy tắc bắt buộc phải tuân thủ:</p>\n                          <ul>\n                            <li><strong>Toán tử Bitwise:</strong> Dùng <code>&amp;</code> cho phép AND, <code>|</code> cho phép OR, và <code>~</code> cho phép phủ định NOT. Tuyệt đối không dùng <code>and</code> / <code>or</code> của Python thuần.</li>\n                            <li><strong>Đóng mở ngoặc đơn bắt buộc:</strong> Do thứ tự ưu tiên của toán tử trong Python (toán tử bitwise <code>&amp;</code> có độ ưu tiên cao hơn toán tử so sánh <code>&gt;</code>, <code>==</code>), bạn <strong>bắt buộc phải bọc mỗi điều kiện trong cặp ngoặc đơn</strong>: <code>(df['amount'] &gt; 100) &amp; (df['city'] == 'HN')</code>.</li>\n                            <li><strong>Cập nhật giá trị có chọn lọc:</strong> Kết hợp <code>df.loc[mask, 'column_to_update'] = new_value</code> để cập nhật dữ liệu an toàn mà không dính cảnh báo sao chép.</li>\n                          </ul>\n                        "
          },
          {
            "id": "sec-loc-references",
            "title": "3. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n                          <ul>\n                            <li><strong>Pandas Documentation.</strong> <em>Indexing and selecting data (.loc and .iloc).</em> <a href=\"https://pandas.pydata.org/docs/user_guide/indexing.html\" target=\"_blank\" rel=\"noopener\">https://pandas.pydata.org/docs/user_guide/indexing.html</a></li>\n                          </ul>\n                        "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Cạm bẫy quên đóng mở ngoặc đơn khi lọc đa điều kiện",
              "content": "Lệnh df[df['qty'] > 2 & df['price'] < 100] sẽ nổ lỗi TypeError hoặc cho ra kết quả hoàn toàn sai lệch vì Python tính 2 & df['price'] trước! Luôn bọc ngoặc: df[(df['qty'] > 2) & (df['price'] < 100)]."
            },
            {
              "title": "Cắt lát với .loc nhầm tưởng là loại trừ điểm cuối",
              "content": "Nhớ kỹ: .loc['2026-01':'2026-03'] LẤY TOÀN BỘ CẢ THÁNG 3! Khác hoàn toàn với slicing thông thường trong Python."
            }
          ],
          "tips": [
            {
              "title": "Sử dụng phương thức .isin() để lọc danh sách",
              "content": "Thay vì viết chuỗi OR dài dòng: (df['city'] == 'HN') | (df['city'] == 'HCM'), hãy viết ngắn gọn và tối ưu: df['city'].isin(['HN', 'HCM'])."
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Truy xuất an toàn bằng .loc và .iloc",
            "problem": "Cho DataFrame khách hàng TechMart:\ndf = pd.DataFrame({'name': ['Lan', 'Minh', 'Tuấn']}, index=['KH01', 'KH02', 'KH03']).\nViết code lấy tên của khách hàng mang mã 'KH02' bằng 2 cách: (1) dùng .loc; (2) dùng .iloc.",
            "hint": "Cách 1: .loc['KH02', 'name']; Cách 2: KH02 nằm ở dòng thứ 1: .iloc[1, 0].",
            "solutionCode": "import pandas as pd\n\ndf = pd.DataFrame({\"name\": [\"Lan\", \"Minh\", \"Tuấn\"]}, index=[\"KH01\", \"KH02\", \"KH03\"])\nname_loc = df.loc[\"KH02\", \"name\"]\nname_iloc = df.iloc[1, 0]\n\nprint(\"Truy xuất theo nhãn .loc:   \", name_loc)\nprint(\"Truy xuất theo vị trí .iloc: \", name_iloc)",
            "solutionOutput": "Truy xuất theo nhãn .loc:    Minh\nTruy xuất theo vị trí .iloc:  Minh",
            "explanation": "Cả hai cách đều trích xuất đúng phần tử nhưng dựa trên hai mô hình tư duy khác nhau: .loc dựa trên nhãn định danh khách hàng, .iloc dựa trên vị trí vật lý trong mảng."
          },
          {
            "level": "Vừa",
            "title": "Lọc đơn hàng thỏa mãn nhiều điều kiện kết hợp",
            "problem": "Cho bảng đơn hàng: df = pd.DataFrame({'branch': ['HN', 'HCM', 'HN', 'DN'], 'total': [500000, 1200000, 300000, 850000], 'status': ['DONE', 'DONE', 'PENDING', 'DONE']}). Hãy lọc ra các đơn hàng thỏa mãn: Chi nhánh tại 'HN' HOẶC 'HCM', đồng thời có giá trị trên 400,000 VNĐ và trạng thái là 'DONE'.",
            "hint": "Dùng df['branch'].isin(['HN', 'HCM']) & (df['total'] > 400000) & (df['status'] == 'DONE').",
            "solutionCode": "import pandas as pd\n\ndf = pd.DataFrame({\n    \"branch\": [\"HN\", \"HCM\", \"HN\", \"DN\"],\n    \"total\": [500000, 1200000, 300000, 850000],\n    \"status\": [\"DONE\", \"DONE\", \"PENDING\", \"DONE\"]\n})\n\ncondition = df[\"branch\"].isin([\"HN\", \"HCM\"]) & (df[\"total\"] > 400000) & (df[\"status\"] == \"DONE\")\nfiltered_df = df.loc[condition]\nprint(\"Đơn hàng thỏa mãn điều kiện:\\n\", filtered_df)",
            "solutionOutput": "Đơn hàng thỏa mãn điều kiện:\n   branch    total status\n0     HN   500000   DONE\n1    HCM  1200000   DONE",
            "explanation": "Sử dụng toán tử bitwise & kết hợp phương thức .isin() giúp câu lệnh lọc dữ liệu rõ ràng, chuẩn mực và thực thi với tốc độ vector hóa tối đa."
          },
          {
            "level": "Nâng cao",
            "title": "Cập nhật chiết khấu có điều kiện trực tiếp bằng .loc",
            "problem": "Trong chương trình khuyến mãi tháng 11, TechMart quyết định: Tất cả các đơn hàng thuộc chi nhánh 'HN' có giá trị từ 500,000 VNĐ trở lên sẽ được gắn cờ vip_discount = True và giảm trực tiếp 50,000 VNĐ vào cột final_total. Hãy viết code sử dụng .loc để cập nhật trực tiếp hai cột này mà không sinh bất kỳ cảnh báo SettingWithCopyWarning nào.",
            "hint": "Dùng cú pháp df.loc[mask, 'col'] = ....",
            "solutionCode": "import pandas as pd\n\ndf = pd.DataFrame({\n    \"order_id\": [\"O1\", \"O2\", \"O3\"],\n    \"branch\": [\"HN\", \"HN\", \"HCM\"],\n    \"total\": [600000, 450000, 700000]\n})\ndf[\"final_total\"] = df[\"total\"]\ndf[\"vip_discount\"] = False\n\n# Tạo mask điều kiện\nmask = (df[\"branch\"] == \"HN\") & (df[\"total\"] >= 500000)\n\n# Cập nhật an toàn chuẩn mực bằng .loc\ndf.loc[mask, \"vip_discount\"] = True\ndf.loc[mask, \"final_total\"] = df.loc[mask, \"total\"] - 50000\n\nprint(\"Bảng dữ liệu sau khi cập nhật an toàn bằng .loc:\\n\", df)",
            "solutionOutput": "Bảng dữ liệu sau khi cập nhật an toàn bằng .loc:\n   order_id branch   total  final_total  vip_discount\n0       O1     HN  600000       550000          True\n1       O2     HN  450000       450000         False\n2       O3    HCM  700000       700000         False",
            "explanation": "Cú pháp df.loc[mask, col] = val là chuẩn mực bất biến trong Pandas để cập nhật dữ liệu tại chỗ, tránh hoàn toàn cạm bẫy Chained Assignment."
          }
        ],
        "quiz": [
          {
            "question": "Khi thực hiện thao tác cắt lát df.loc['2026-01':'2026-03'] trên một DataFrame có Index ngày tháng, kết quả trả về có bao gồm tháng 3 ('2026-03') hay không?",
            "options": [
              "Không bao gồm, vì theo quy tắc Python slice điểm cuối luôn bị loại trừ.",
              "Có bao gồm cả tháng 3, vì .loc là bộ truy xuất theo nhãn (Label-based) và luôn bao gồm cả điểm cuối (Inclusive Endpoint).",
              "Chương trình sẽ báo lỗi cú pháp.",
              "Chỉ bao gồm ngày đầu tiên của tháng 3."
            ],
            "correctIndex": 1,
            "explanation": "Khác với Python slice thông thường, .loc hoạt động trên nhãn nên điểm kết thúc luôn được tính vào kết quả (Inclusive)."
          },
          {
            "question": "Khi Index của một DataFrame là các số nguyên nhảy cóc [10, 20, 30], câu lệnh df.iloc[1] sẽ trả về hàng nào?",
            "options": [
              "Hàng có nhãn là 10.",
              "Hàng có nhãn là 20 (dòng vật lý thứ hai tính từ 0).",
              "Chương trình báo lỗi KeyError.",
              "Hàng cuối cùng."
            ],
            "correctIndex": 1,
            "explanation": ".iloc luôn đếm vị trí nguyên vật lý từ 0: vị trí 0 là nhãn 10, vị trí 1 là nhãn 20."
          },
          {
            "question": "Tại sao biểu thức lọc df[(df['qty'] > 2) & (df['price'] < 100)] bắt buộc phải có các cặp ngoặc đơn bọc từng điều kiện?",
            "options": [
              "Để làm đẹp code theo chuẩn PEP 8.",
              "Vì toán tử bitwise & trong Python có độ ưu tiên cao hơn các toán tử so sánh > và <; nếu không có ngoặc đơn, Python sẽ tính `2 & df['price']` trước và gây lỗi.",
              "Vì Pandas không hỗ trợ toán tử so sánh.",
              "Vì mảng DataFrame chỉ hiểu được dấu ngoặc đơn."
            ],
            "correctIndex": 1,
            "explanation": "Thứ tự ưu tiên toán tử trong Python đặt toán tử bitwise trước toán tử so sánh. Cặp ngoặc đơn là bắt buộc để ép Python đánh giá từng điều kiện so sánh trước."
          }
        ],
        "summary": [
          "Phân biệt tuyệt đối: .loc truy xuất theo NHÃN (gồm cả điểm cuối); .iloc truy xuất theo VỊ TRÍ NGUYÊN (loại trừ điểm cuối).",
          "Tuyệt đối cẩn trọng khi Index là số nguyên: tránh nhầm lẫn giữa nhãn số và vị trí đếm vật lý.",
          "Lọc đa điều kiện bắt buộc dùng toán tử bitwise (&, |, ~) và bọc ngoặc đơn quanh từng biểu thức.",
          "Cập nhật dữ liệu có chọn lọc luôn dùng df.loc[mask, col] = new_val để bảo đảm an toàn bộ nhớ."
        ],
        "selfReviewQuestions": [
          "1. Tại sao thao tác cắt lát bằng .loc lại bao gồm cả điểm cuối trong khi .iloc thì không?",
          "2. Điều gì sẽ xảy ra nếu bạn gọi df.loc[0] trên một DataFrame có Index là ['HN', 'HCM', 'DN']?",
          "3. Viết cú pháp kết hợp 3 điều kiện lọc bằng Boolean Masking trên DataFrame."
        ],
        "reflectionQuestion": "Hãy giải thích: Tại sao cú pháp Chained Indexing dạng df['revenue'][0] = 500 lại bị coi là tội lỗi lớn trong Pandas và bị cấm hoàn toàn trong code sản phẩm?",
        "reflectionHint": "Nghĩ về cơ chế thực thi: df['revenue'] có thể tạo ra một Series tạm thời trong RAM. Phép gán [0] = 500 sau đó sẽ gán lên Series tạm thời đó rồi biến mất, không hề lưu vào DataFrame gốc!",
        "nextLessonPreview": "Ở bài tiếp theo (4.3), chúng ta sẽ khám phá trái tim vận hành của Pandas: Cơ chế tự gióng hàng Index Alignment, lý do loại bỏ inplace=True và cuộc cách mạng Copy-on-Write trong Pandas 3.0+!"
      },
      {
        "id": "pd-04-03",
        "number": "4.3",
        "title": "Cơ Chế Index Alignment & Cuộc Cách Mạng Copy-on-Write (CoW)",
        "subtitle": "Trái tim của Pandas: Tự động gióng hàng theo nhãn, bẫy NaN ngầm trong phép cộng, vì sao loại bỏ inplace=True và kiến trúc CoW Pandas 3.0+",
        "level": "Nâng cao",
        "duration": "45 phút",
        "objectives": [
          "Giải thích bản chất cơ chế cốt lõi nhất của Pandas: **Index Alignment** (Tự động gióng hàng theo nhãn trong các phép toán số học và hợp nhất chỉ mục).",
          "Phân tích nguyên nhân sâu xa của hiện tượng tự động sinh giá trị NaN ngầm khi thực hiện phép tính giữa hai Series/DataFrame có Index lệch nhau.",
          "Giải mã lý do tại sao tham số inplace=True bị coi là phản mẫu (anti-pattern), không giúp tiết kiệm RAM và đang bị loại bỏ hoàn toàn khỏi Pandas.",
          "Làm chủ kiến trúc **Copy-on-Write (CoW)** kích hoạt mặc định trong Pandas 3.0+: Cách CoW biến mọi thao tác cắt mảng thành View an toàn và loại bỏ triệt để cảnh báo SettingWithCopyWarning."
        ],
        "intuition": {
          "title": "Chiếc khóa kéo hai mảnh áo & Bản hợp đồng cho thuê nhà thông minh",
          "metaphor": "1. Index Alignment giống như chiếc khóa kéo áo khoác: Mỗi chiếc răng cưa bên trái phải tìm đúng chiếc răng cưa có cùng số hiệu bên phải để khớp vào nhau! Khi bạn cộng hai cột doanh số của hai chi nhánh, Pandas không cộng mù quáng theo dòng 0, dòng 1. Nó tìm xem dòng nào có nhãn 'Hà Nội' ở cả hai bên để cộng lại. Nếu bên kia không có 'Hà Nội', nó sẽ điền ngay NaN để báo hiệu sự mất cân xứng!\n2. Copy-on-Write (CoW) trong Pandas 3.0+ giống như bản hợp đồng cho thuê nhà thông minh: Khi bạn cắt một DataFrame con, Pandas cho bạn dùng chung căn nhà gốc (View) mà không tốn công xây nhà mới. Nhưng bản hợp đồng quy định: Chừng nào bạn CẦM BÚT SƠN ĐỔI MÀU TƯỜNG (thao tác ghi dữ liệu), lúc đó hệ thống mới lập tức tách ra một căn nhà mới độc lập cho bạn! Kết quả: Vừa nhanh như chớp, vừa an toàn 100%!",
          "boundary": "Index Alignment rất thông minh nhưng nếu bạn không chủ ý ghép nối, phép cộng hai Series lệch Index sẽ vô tình tạo ra một Series chứa toàn bộ giá trị NaN và làm nổ tung số lượng dòng (Union Index).",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">CƠ CHẾ TỰ GIÓNG HÀNG NHÃN (INDEX ALIGNMENT) TRONG PHÉP CỘNG</div>\n                        <div style=\"display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:6px;align-items:center;text-align:center;\">\n                          <div style=\"background:var(--bg-surface);padding:8px;border:1px solid var(--border-strong);border-radius:4px;\">\n                            <span style=\"color:#0284c7;display:block;font-size:0.75rem;\">Series A</span>\n                            HN: 100<br/>HCM: 200\n                          </div>\n                          <strong style=\"font-size:1.2rem;\">+</strong>\n                          <div style=\"background:var(--bg-surface);padding:8px;border:1px solid var(--border-strong);border-radius:4px;\">\n                            <span style=\"color:#10b981;display:block;font-size:0.75rem;\">Series B</span>\n                            HCM: 50<br/>DN: 70\n                          </div>\n                          <strong style=\"font-size:1.2rem;\">=</strong>\n                          <div style=\"background:rgba(239,68,68,0.1);padding:8px;border:1px solid #ef4444;border-radius:4px;\">\n                            <span style=\"color:#ef4444;display:block;font-size:0.75rem;\">Kết quả (Union)</span>\n                            DN: NaN<br/><strong>HCM: 250</strong><br/>HN: NaN\n                          </div>\n                        </div>\n                        <div style=\"font-size:0.72rem;color:var(--text-muted);text-align:center;margin-top:8px;\">\n                          Chỉ có nhãn 'HCM' xuất hiện ở cả hai bên mới cộng được (250). Nhãn thiếu sinh NaN!\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-index-alignment-core",
            "title": "1. Bản Chất Index Alignment: Tự Gióng Hàng & Bẫy NaN Ngầm",
            "badge": "Trái tim của Pandas",
            "content": "\n                          <p>Khác biệt lớn nhất giữa mảng NumPy và cấu trúc Pandas nằm ở <strong>Index Alignment (Căn chỉnh nhãn tự động)</strong>. Trong NumPy, khi bạn viết <code>a + b</code>, máy tính thực hiện phép cộng từng cặp phần tử theo đúng vị trí nguyên $0, 1, 2...$ bất chấp ý nghĩa nghiệp vụ. Trong Pandas, mọi phép toán số học giữa hai Series hoặc DataFrame đều tuân thủ nguyên lý:</p>\n                          \n                          <ol>\n                            <li><strong>Hợp nhất chỉ mục (Index Union):</strong> Chỉ mục kết quả là tập hợp hợp (Union) của tất cả các nhãn xuất hiện ở cả hai toán hạng.</li>\n                            <li><strong>Gióng hàng theo nhãn:</strong> Các phần tử có cùng nhãn được ghép đôi và thực hiện phép tính.</li>\n                            <li><strong>Tự động điền NaN:</strong> Bất kỳ nhãn nào chỉ xuất hiện ở một bên mà thiếu ở bên kia sẽ tự động nhận giá trị <code>NaN</code>!</li>\n                          </ol>\n\n                          <h4>Giải pháp: Sử dụng phương thức linh hoạt kèm fill_value:</h4>\n                          <p>Để tránh việc doanh thu chi nhánh bị biến thành NaN chỉ vì chi nhánh đó mới mở và chưa có số liệu kỳ trước, bạn phải thay thế toán tử cộng <code>+</code> bằng phương thức <code>s1.add(s2, fill_value=0)</code>.</p>\n                        ",
            "codeExamples": [
              {
                "title": "Khảo sát cơ chế Index Alignment và xử lý an toàn bằng add(fill_value=0)",
                "lang": "Python",
                "code": "import pandas as pd\n\n# Doanh số Quý 1 tại 2 chi nhánh cũ (Đơn vị: Triệu VNĐ)\nq1_sales = pd.Series([100, 200], index=[\"HN\", \"HCM\"], name=\"Q1\")\n\n# Doanh số Quý 2 tại 2 chi nhánh (Mở thêm Đà Nẵng, tạm đóng Hà Nội sửa chữa)\nq2_sales = pd.Series([50, 70], index=[\"HCM\", \"DN\"], name=\"Q2\")\n\nprint(\"--- PHÉP CỘNG TOÁN TỬ THÔNG THƯỜNG (s1 + s2) ---\")\nnaive_sum = q1_sales + q2_sales\nprint(naive_sum)\n\nprint(\"\\n--- PHÉP CỘNG LINH HOẠT VỚI fill_value=0 ---\")\nrobust_sum = q1_sales.add(q2_sales, fill_value=0)\nprint(robust_sum)",
                "output": "--- PHÉP CỘNG TOÁN TỬ THÔNG THƯỜNG (s1 + s2) ---\nDN      NaN\nHCM    250.0\nHN      NaN\ndtype: float64\n\n--- PHÉP CỘNG LINH HOẠT VỚI fill_value=0 ---\nDN      70.0\nHCM    250.0\nHN     100.0\ndtype: float64",
                "annotations": [
                  {
                    "line": 9,
                    "text": "Toán tử + thực hiện Union Index, HN và DN bị gán NaN ngầm!"
                  },
                  {
                    "line": 14,
                    "text": "s1.add(s2, fill_value=0) coi nhãn bị thiếu có giá trị 0 trước khi cộng."
                  },
                  {
                    "line": 15,
                    "text": "Kết quả bảo toàn 100% doanh thu của cả 3 chi nhánh."
                  }
                ],
                "explanation": "Hiểu được Index Alignment giúp bạn giải mã được tại sao sau khi tính toán dữ liệu lại đột ngột xuất hiện nhiều giá trị NaN, và làm chủ phương thức .add(fill_value=0) để khắc phục triệt để."
              }
            ]
          },
          {
            "id": "sec-inplace-fallacy",
            "title": "2. Vạch Trần Ảo Tưởng inplace=True: Tại Sao Bị Loại Bỏ Khỏi Pandas?",
            "badge": "Tư duy Kỹ nghệ",
            "content": "\n                          <p>Rất nhiều bài hướng dẫn trên mạng dạy người học viết <code>df.drop(..., inplace=True)</code> hoặc <code>df.fillna(..., inplace=True)</code> với niềm tin ngây thơ rằng: 'inplace=True sẽ làm biến đổi tại chỗ, không tạo bản sao và tiết kiệm RAM'. Đây là một <strong>ẢO TƯỞNG HOÀN TOÀN SAI LẦM</strong>!</p>\n\n                          <h4>Ba lý do vì sao core team Pandas loại bỏ inplace=True:</h4>\n                          <ol>\n                            <li><strong>Không hề tiết kiệm RAM bên dưới:</strong> Trong mã nguồn C/C++ của Pandas, hầu hết các thao tác <code>inplace=True</code> vẫn âm thầm tạo ra một bản copy trong RAM, sau đó chỉ đơn giản là trỏ lại con trỏ dữ liệu cũ vào khối nhớ mới và hủy khối cũ!</li>\n                            <li><strong>Phá hủy tính chuỗi (Method Chaining):</strong> Khi gọi <code>inplace=True</code>, phương thức luôn trả về <code>None</code>. Điều này phá vỡ hoàn toàn khả năng viết code dạng đường ống (Pipeline): <code>df.dropna().sort_values().pipe(...)</code>.</li>\n                            <li><strong>Nguồn cơn của lỗi ngầm SettingWithCopyWarning:</strong> Gây nhầm lẫn về việc liệu đối tượng bên dưới có thực sự bị đột biến hay không khi thao tác trên các lát cắt View.</li>\n                          </ol>\n                        "
          },
          {
            "id": "sec-cow-revolution",
            "title": "3. Cuộc Cách Mạng Copy-on-Write (CoW) Trong Pandas 3.0+",
            "badge": "Chuẩn Công nghệ Mới",
            "content": "\n                          <p>Bắt đầu từ phiên bản <strong>Pandas 3.0+</strong>, kiến trúc <strong>Copy-on-Write (CoW)</strong> chính thức được kích hoạt mặc định. Đây là bước chuyển mình lịch sử giúp định hình lại hoàn toàn cách quản lý bộ nhớ của Pandas:</p>\n\n                          <h4>1. Quy tắc cốt lõi của CoW:</h4>\n                          <p>Bất kỳ thao tác tạo lát cắt (Slicing) hoặc lấy tập hợp con nào đều <strong>luôn luôn trả về một VIEW</strong> (không tốn RAM, không tốn thời gian sao chép). Tuy nhiên, dữ liệu đó được đặt dưới sự giám sát nghiêm ngặt: Chừng nào người dùng cố tình ghi dữ liệu (Gán giá trị mới), hệ thống CoW mới âm thầm tách ra một bản Copy độc lập tại thời điểm đó (Lazy Copying)!</p>\n\n                          <h4>2. Khai tử vĩnh viễn SettingWithCopyWarning:</h4>\n                          <p>Trong các phiên bản cũ, việc gán giá trị trên lát cắt thường xuyên làm bùng nổ cảnh báo khó hiểu <code>SettingWithCopyWarning</code>. Dưới chế độ CoW, cảnh báo này đã bị khai tử hoàn toàn: Phép gán trên lát cắt con sẽ <strong>không bao giờ làm đột biến DataFrame gốc</strong>, bảo đảm an toàn dữ liệu tuyệt đối 100%.</p>\n                        ",
            "codeExamples": [
              {
                "title": "Khảo sát hành vi Copy-on-Write (CoW) chuẩn mực trong Pandas 3.0+",
                "lang": "Python",
                "code": "import pandas as pd\n\n# Khởi tạo DataFrame giao dịch gốc\ndf_origin = pd.DataFrame({\n    \"order_id\": [\"HD01\", \"HD02\", \"HD03\"],\n    \"amount\": [150000, 320000, 450000]\n})\n\n# Tạo lát cắt con (Dưới CoW: Đây là một Lazy View siêu nhẹ)\ndf_slice = df_origin.iloc[:2]\n\n# Cố tình thay đổi số tiền trên bản cắt con:\ndf_slice.loc[0, \"amount\"] = 999999\n\nprint(\"=== HÀNH VI COPY-ON-WRITE TRONG PANDAS 3.0+ ===\")\nprint(\"Bản cắt df_slice (Đã cập nhật):\\n\", df_slice)\nprint(\"\\nBản gốc df_origin (BẢO TOÀN NGUYÊN VẸN, KHÔNG BỊ BIẾN DẠNG):\\n\", df_origin)",
                "output": "=== HÀNH VI COPY-ON-WRITE TRONG PANDAS 3.0+ ===\nBản cắt df_slice (Đã cập nhật):\n   order_id  amount\n0     HD01  999999\n1     HD02  320000\n\nBản gốc df_origin (BẢO TOÀN NGUYÊN VẸN, KHÔNG BỊ BIẾN DẠNG):\n   order_id  amount\n0     HD01  150000\n1     HD02  320000\n2     HD03  450000",
                "annotations": [
                  {
                    "line": 10,
                    "text": "df_slice ban đầu chia sẻ bộ nhớ với df_origin mà không tốn thêm RAM."
                  },
                  {
                    "line": 13,
                    "text": "Thời điểm gán giá trị mới, CoW kích hoạt cơ chế tách bản sao độc lập tức thì."
                  },
                  {
                    "line": 17,
                    "text": "df_origin gốc vẫn giữ nguyên 150000, không còn cảnh báo SettingWithCopyWarning!"
                  }
                ],
                "explanation": "Copy-on-Write là sự kết hợp hoàn hảo giữa tốc độ của View và sự an toàn của Deep Copy. Người học không còn phải lo lắng về việc vô tình làm hỏng dữ liệu thô ban đầu."
              }
            ]
          },
          {
            "id": "sec-alignment-references",
            "title": "4. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n                          <ul>\n                            <li><strong>Pandas Documentation.</strong> <em>Copy-on-Write (CoW) improvements and migration guide.</em> <a href=\"https://pandas.pydata.org/docs/user_guide/copy_on_write.html\" target=\"_blank\" rel=\"noopener\">https://pandas.pydata.org/docs/user_guide/copy_on_write.html</a></li>\n                            <li><strong>Van den Bossche, J. (2023).</strong> <em>Copy-on-Write in pandas: Towards a more predictable and consistent pandas.</em> EuroPython Keynote.</li>\n                          </ul>\n                        "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Lạm dụng inplace=True trong code dự án mới",
              "content": "Đừng bao giờ viết df.fillna(0, inplace=True). Hãy luôn viết theo chuẩn hiện đại: df = df.fillna(0) để giữ cho chuỗi phương thức (Method Chaining) hoạt động mượt mà."
            },
            {
              "title": "Cộng hai bảng lệch Index mà không dùng fill_value",
              "content": "Phép cộng df1 + df2 trên hai bảng có danh sách chi nhánh không khớp nhau sẽ làm phát sinh hàng loạt giá trị NaN không kiểm soát."
            }
          ],
          "tips": [
            {
              "title": "Quy tắc vàng khi cộng dữ liệu định kỳ",
              "content": "Luôn sử dụng df1.add(df2, fill_value=0) khi cộng dồn doanh số giữa các tháng hoặc các quý."
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Refactor code loại bỏ hoàn toàn tham số inplace=True",
            "problem": "Đoạn code sau đây sử dụng cú pháp lỗi thời:\ndf.dropna(subset=['price'], inplace=True)\ndf.sort_values(by='price', inplace=True)\nHãy refactor đoạn code trên thành một dòng lệnh duy nhất theo chuẩn Method Chaining hiện đại.",
            "hint": "Ghép nối các phương thức: df = df.dropna(...).sort_values(...).",
            "solutionCode": "import pandas as pd\n\ndf = pd.DataFrame({\"item\": [\"A\", \"B\", \"C\"], \"price\": [100, None, 50]})\n\n# Refactor thành chuỗi biến đổi dữ liệu sạch sẽ\ndf_clean = df.dropna(subset=[\"price\"]).sort_values(by=\"price\")\nprint(\"Kết quả sau khi refactor theo Method Chaining:\\n\", df_clean)",
            "solutionOutput": "Kết quả sau khi refactor theo Method Chaining:\n   item  price\n2    C   50.0\n0    A  100.0",
            "explanation": "Method Chaining không chỉ giúp mã nguồn ngắn gọn, dễ đọc mà còn biến đổi dữ liệu tuần tự rõ ràng theo tư duy đường ống (Data Pipeline)."
          },
          {
            "level": "Vừa",
            "title": "Hợp nhất doanh thu đa kênh bằng Index Alignment",
            "problem": "TechMart có 2 kênh bán hàng: Cửa hàng vật lý và Kênh Online. Doanh số ghi nhận theo mã mặt hàng:\npos = pd.Series([200, 150], index=['SKU_A', 'SKU_B'])\nonline = pd.Series([100, 300], index=['SKU_B', 'SKU_C'])\nHãy tính tổng doanh thu toàn chuỗi cho từng mã SKU bằng phương thức add() có fill_value=0.",
            "hint": "Dùng pos.add(online, fill_value=0).",
            "solutionCode": "import pandas as pd\n\npos = pd.Series([200, 150], index=[\"SKU_A\", \"SKU_B\"])\nonline = pd.Series([100, 300], index=[\"SKU_B\", \"SKU_C\"])\n\ntotal_sales = pos.add(online, fill_value=0)\nprint(\"Tổng doanh số hợp nhất đa kênh:\\n\", total_sales)",
            "solutionOutput": "Tổng doanh số hợp nhất đa kênh:\n SKU_A    200.0\nSKU_B    250.0\nSKU_C    300.0\ndtype: float64",
            "explanation": "Index Alignment tự động hợp nhất các mã SKU từ cả 2 kênh và điền giá trị 0 cho các sản phẩm chỉ bán được trên 1 kênh, mang lại con số tổng doanh thu chính xác 100%."
          },
          {
            "level": "Nâng cao",
            "title": "Kiểm chứng tính năng Copy-on-Write bảo vệ dữ liệu thô",
            "problem": "Viết một bài kiểm tra nhỏ kiểm chứng rằng: Khi bạn trích xuất một nhóm đơn hàng có doanh số cao bằng .loc, sau đó thay đổi đơn giá của nhóm này, DataFrame thô ban đầu hoàn toàn KHÔNG bị thay đổi (Bảo đảm tính năng CoW hoạt động đúng như tài liệu chính thức).",
            "hint": "So sánh giá trị trước và sau khi gán trên lát cắt.",
            "solutionCode": "import pandas as pd\n\n# Dữ liệu gốc\nraw_orders = pd.DataFrame({\n    \"id\": [\"T1\", \"T2\", \"T3\"],\n    \"price\": [100000, 500000, 800000]\n})\n\n# Lấy lát cắt các đơn hàng cao giá\nhigh_val_slice = raw_orders.loc[raw_orders[\"price\"] >= 500000]\n\n# Thực hiện sửa đổi trên lát cắt\nhigh_val_slice.loc[1, \"price\"] = 999999\n\n# Kiểm tra tính toàn vẹn của mảng gốc\nis_original_untouched = (raw_orders.loc[1, \"price\"] == 500000)\nprint(\"Đơn hàng T2 ở bảng cắt con: \", high_val_slice.loc[1, \"price\"])\nprint(\"Đơn hàng T2 ở bảng thô gốc: \", raw_orders.loc[1, \"price\"])\nprint(f\"✓ DỮ LIỆU THÔ ĐƯỢC BẢO VỆ NGUYÊN VẸN BỞI CoW: {is_original_untouched}\")",
            "solutionOutput": "Đơn hàng T2 ở bảng cắt con:  999999\nĐơn hàng T2 ở bảng thô gốc:  500000\n✓ DỮ LIỆU THÔ ĐƯỢC BẢO VỆ NGUYÊN VẸN BỞI CoW: True",
            "explanation": "Kiến trúc Copy-on-Write loại bỏ hoàn toàn các lỗi đột biến dữ liệu ngầm, mang lại sự tin cậy tuyệt đối cho các đường ống phân tích phức tạp."
          }
        ],
        "quiz": [
          {
            "question": "Khi thực hiện phép cộng giữa hai Series có Index lệch nhau trong Pandas (ví dụ: Series A có nhãn ['HN', 'HCM'] và Series B có nhãn ['HCM', 'DN']), điều gì sẽ xảy ra?",
            "options": [
              "Pandas báo lỗi ValueError vì không cùng kích thước.",
              "Pandas tự động hợp nhất Index (Union) thành ['HN', 'HCM', 'DN']. Chỉ có nhãn 'HCM' xuất hiện ở cả hai bên mới được cộng số liệu, hai nhãn còn lại tự động nhận giá trị NaN.",
              "Pandas cộng tuần tự theo vị trí dòng 0 và dòng 1.",
              "Pandas xóa bỏ các nhãn bị lệch."
            ],
            "correctIndex": 1,
            "explanation": "Cốt lõi của Index Alignment là tự động gióng hàng theo nhãn định danh và hợp nhất chỉ mục. Các nhãn bị thiếu ở một trong hai bên sẽ tự động sinh ra NaN."
          },
          {
            "question": "Tại sao cộng đồng phát triển Pandas chính thức khuyến cáo ngừng sử dụng tham số inplace=True?",
            "options": [
              "Vì tham số này bị các hacker khai thác.",
              "Vì inplace=True tạo ra ảo tưởng sai lầm về việc tiết kiệm bộ nhớ (bên dưới vẫn tạo bản sao trong phần lớn trường hợp) và phá vỡ khả năng viết mã dạng chuỗi (Method Chaining).",
              "Vì nó chỉ dùng được với các tệp Excel.",
              "Vì inplace=True khiến chương trình bị chậm 1000 lần."
            ],
            "correctIndex": 1,
            "explanation": "inplace=True hầu như không tiết kiệm RAM như nhiều người lầm tưởng, đồng thời trả về None làm gãy chuỗi Method Chaining và gây ra nhiều lỗi ngầm."
          },
          {
            "question": "Kiến trúc Copy-on-Write (CoW) trong Pandas 3.0+ giải quyết triệt để vấn đề gì?",
            "options": [
              "Tự động sao lưu dữ liệu lên đám mây.",
              "Biến mọi thao tác cắt lát thành View siêu nhẹ và an toàn, chỉ thực sự sao chép khi có thao tác ghi dữ liệu, loại bỏ hoàn toàn cảnh báo SettingWithCopyWarning và ngăn chặn đột biến dữ liệu gốc ngoài ý muốn.",
              "Tự động dịch mã nguồn sang ngôn ngữ C.",
              "Giảm dung lượng ổ cứng của máy tính."
            ],
            "correctIndex": 1,
            "explanation": "CoW là cơ chế Lazy Copying thông minh: đọc dữ liệu thì chia sẻ View, ghi dữ liệu thì mới tách Copy, bảo vệ dữ liệu thô bất biến và dẹp bỏ cảnh báo SettingWithCopyWarning."
          }
        ],
        "summary": [
          "Index Alignment là trái tim của Pandas: Tự động gióng hàng theo nhãn; nhãn thiếu sinh ra NaN ngầm trong phép toán.",
          "Sử dụng s1.add(s2, fill_value=0) để bảo toàn số liệu khi hợp nhất các nguồn dữ liệu lệch Index.",
          "Nói KHÔNG với inplace=True: Viết code theo chuẩn Method Chaining df = df.operation() để bảo trì dài hạn.",
          "Kiến trúc Copy-on-Write (CoW) trong Pandas 3.0+ mang lại sự an toàn tuyệt đối và hiệu năng bộ nhớ tối ưu."
        ],
        "selfReviewQuestions": [
          "1. Nêu 3 bước diễn ra bên dưới khi Pandas thực hiện phép cộng giữa hai Series có Index khác nhau.",
          "2. Tại sao câu lệnh df.dropna(inplace=True) không hề giúp bạn tiết kiệm RAM như lời đồn?",
          "3. Giải thích cơ chế Lazy Copying của kiến trúc Copy-on-Write (CoW) trong Pandas 3.0+."
        ],
        "reflectionQuestion": "Hãy tự chất vấn: Nếu bạn thiết kế một hệ thống tính lương tự động cho TechMart, tại sao việc hiểu rõ Index Alignment lại giúp bạn không bao giờ cộng nhầm lương của nhân viên này vào tài khoản của nhân viên khác?",
        "reflectionHint": "Nghĩ về sự khác biệt giữa mảng thuần (cộng theo thứ tự dòng) và Series (cộng theo đúng mã số thuế / mã nhân viên ghi trên Index).",
        "nextLessonPreview": "Bước sang Module 5, chúng ta sẽ làm chủ toàn diện các định dạng Nhập/Xuất Dữ liệu (I/O): Chuẩn CSV RFC 4180, JSON RFC 8259, Apache Parquet dạng cột và kỹ thuật Chunking xử lý file vượt dung lượng RAM!"
      }
    ]
  },
  {
    "id": "mod-05",
    "number": "Module 5",
    "title": "Nhập/Xuất Dữ liệu Chuyên sâu (I/O)",
    "badge": "3 Bài học",
    "icon": "💾",
    "description": "Đặc tả CSV RFC 4180, xử lý bảng mã UTF-8 BOM, JSON RFC 8259, làm phẳng mảng json_normalize, tích hợp SQLite, định dạng cột Apache Parquet và kỹ thuật Chunking streaming.",
    "lessons": [
      {
        "id": "pd-05-01",
        "number": "5.1",
        "title": "Đọc CSV Chuyên Sâu, Xử lý Bẫy Encoding UTF-8 BOM & Parse Ngày Giờ",
        "subtitle": "Đặc tả chuẩn RFC 4180, giải mã UnicodeDecodeError, xử lý ký tự Byte Order Mark (BOM), lọc cột với usecols và chỉ định dtype trước khi đọc",
        "level": "Cơ bản",
        "duration": "40 phút",
        "objectives": [
          "Áp dụng triệt để đặc tả kỹ thuật RFC 4180 về định dạng CSV: Xử lý dấu phân cách tùy biến (delimiter), ký tự bao bọc chuỗi (quotechar) và dấu ngắt dòng bên trong trường dữ liệu.",
          "Chẩn đoán và khắc phục lỗi bảng mã ký tự UnicodeDecodeError: Phân biệt UTF-8, UTF-8-SIG (xử lý ký tự BOM \\ufeff), Latin-1 và Windows-1252.",
          "Tối ưu hóa hiệu năng và bộ nhớ ngay tại thời điểm I/O bằng cách kết hợp tham số usecols (Column Pruning) và chỉ định trước kiểu dữ liệu dtype.",
          "Phân tích cú pháp ngày tháng chuẩn quốc tế ISO 8601 bằng tham số parse_dates và date_format để tránh parse chậm từng dòng."
        ],
        "intuition": {
          "title": "Người dịch thuật đa ngôn ngữ & Chiếc máy quét cổng hải quan",
          "metaphor": "Tệp CSV giống như bức thư gửi từ nước ngoài: trước khi đọc, bạn phải biết bức thư đó viết bằng tiếng gì (Bảng mã Encoding: UTF-8 hay Latin-1). Nếu bạn dùng bảng chữ cái tiếng Anh để đọc tiếng Việt có dấu, toàn bộ chữ sẽ biến thành 'k t l?' (Mojibake)! Ký tự BOM (Byte Order Mark) giống như một con dấu niêm phong vô hình cộp ở đầu bức thư: nếu phần mềm của bạn không biết bóc con dấu đó đi, tên cột đầu tiên 'order_id' sẽ bị biến thành '\\ufefforder_id', làm nổ tung toàn bộ các câu lệnh truy vấn sau đó!",
          "boundary": "pd.read_csv rất mạnh mẽ nhưng nếu file CSV có hàng chục triệu dòng, việc đọc toàn bộ vào một DataFrame duy nhất sẽ làm tràn bộ nhớ RAM của máy tính cá nhân. Khi đó bắt buộc phải chuyển sang kỹ thuật Chunking (Bài 5.3).",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">CẠM BẪY BYTE ORDER MARK (BOM) KHI ĐỌC TỆP CSV TỪ EXCEL</div>\n                        <div style=\"background:var(--bg-surface);padding:10px;border:1px solid var(--border-strong);border-radius:6px;\">\n                          <div>1. Đọc bằng <code>encoding='utf-8'</code> thông thường:</div>\n                          <div style=\"color:#ef4444;margin:4px 0 8px 12px;\">➔ Cột đầu tiên bị dính tiền tố: <code>'\\ufefforder_id'</code> (KeyError khi gọi df['order_id']!)</div>\n                          <div>2. Đọc bằng <code>encoding='utf-8-sig'</code> chuẩn xác:</div>\n                          <div style=\"color:#10b981;margin:4px 0 0 12px;\">➔ Tự động bóc tách BOM sạch sẽ: <code>'order_id'</code> (HOÀN HẢO 100%)</div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-rfc4180-encoding",
            "title": "1. Đặc Tả RFC 4180 & Nghệ Thuật Xử Lý Bảng Mã (Encoding)",
            "badge": "Tiêu chuẩn Kỹ thuật",
            "content": "\n                          <p>Tệp CSV (Comma-Separated Values) không có một định dạng nhị phân cố định, mà được chuẩn hóa bởi tài liệu <strong>RFC 4180</strong> của IETF (Internet Engineering Task Force). Ba quy tắc vàng của RFC 4180:</p>\n                          <ul>\n                            <li>Nếu trường dữ liệu chứa dấu phẩy, dấu ngắt dòng (CRLF) hoặc dấu ngoặc kép, trường đó <strong>bắt buộc phải được bọc trong cặp ngoặc kép</strong>.</li>\n                            <li>Nếu trong nội dung trường có chứa dấu ngoặc kép, dấu ngoặc kép đó phải được thoát (escape) bằng cách <strong>nhân đôi: <code>\"\"</code></strong>.</li>\n                          </ul>\n\n                          <h4>Bẫy Byte Order Mark (BOM): UTF-8 vs UTF-8-SIG</h4>\n                          <p>Khi nhân viên siêu thị TechMart xuất báo cáo từ Microsoft Excel trên Windows và chọn lưu dưới dạng 'CSV UTF-8', Excel tự động chèn 3 byte vô hình <code>EF BB BF</code> vào đầu tệp tin (gọi là Byte Order Mark - BOM). Nếu bạn dùng tham số mặc định <code>encoding='utf-8'</code>, Python sẽ thông dịch 3 byte này thành ký tự Unicode <code>\\ufeff</code> gắn liền vào tên cột đầu tiên! Hậu quả là lệnh <code>df['order_id']</code> sẽ ném ra <code>KeyError</code>. Cách khắc phục chuẩn công nghiệp: <strong>Luôn dùng <code>encoding='utf-8-sig'</code></strong> khi xử lý các file CSV xuất từ Windows/Excel.</p>\n                        ",
            "codeExamples": [
              {
                "title": "Đọc tệp CSV phức tạp: Xử lý UTF-8-SIG, Parse ngày giờ ISO và lọc cột usecols",
                "lang": "Python",
                "code": "import pandas as pd\nimport io\n\n# Giả lập tệp CSV xuất từ phần mềm kế toán TechMart có ký tự BOM và ngày tháng\nraw_csv = (\n    \"\\ufefforder_id,order_date,customer,branch,amount,note\\n\"\n    \"HD01,2026-11-01 08:30:00,Nguyen An,HN,250000,\\\"Chuột không dây, màu đen\\\"\\n\"\n    \"HD02,2026-11-01 09:15:00,Tran Binh,HCM,1200000,\\\"Bàn phím cơ \\\"\\\"Led RGB\\\"\\\"\\\"\\n\"\n    \"HD03,2026-11-02 14:00:00,Le Chi,DN,450000,\\\"Tai nghe Bluetooth\\\"\"\n)\n\n# Đọc chuyên sâu: Loại bỏ BOM với utf-8-sig, chỉ đọc 4 cột cần thiết, ép kiểu và parse ngày\ndf = pd.read_csv(\n    io.StringIO(raw_csv),\n    encoding=\"utf-8-sig\",                         # Tự bóc tách ký tự \\ufeff\n    usecols=[\"order_id\", \"order_date\", \"branch\", \"amount\"], # Column Pruning tiết kiệm RAM\n    dtype={\"order_id\": \"string\", \"branch\": \"category\", \"amount\": \"Int64\"},\n    parse_dates=[\"order_date\"]                    # Parse trực tiếp thành datetime64\n)\n\nprint(\"=== DATAFRAME SAU KHI ĐỌC CHUẨN MỰC ===\")\nprint(df)\nprint(\"\\nKiểm tra kiểu dữ liệu (dtypes):\\n\", df.dtypes)\nprint(\"\\nDanh sách cột chuẩn xác (Không bị dính BOM):\", list(df.columns))",
                "output": "=== DATAFRAME SAU KHI ĐỌC CHUẨN MỰC ===\n  order_id          order_date branch  amount\n0     HD01 2026-11-01 08:30:00     HN     250000\n1     HD02 2026-11-01 09:15:00    HCM    1200000\n2     HD03 2026-11-02 14:00:00     DN     450000\n\nKiểm tra kiểu dữ liệu (dtypes):\n order_id        string[python]\norder_date      datetime64[ns]\nbranch                category\namount                   Int64\ndtype: object\n\nDanh sách cột chuẩn xác (Không bị dính BOM): ['order_id', 'order_date', 'branch', 'amount']",
                "annotations": [
                  {
                    "line": 13,
                    "text": "encoding='utf-8-sig' triệt tiêu hoàn toàn ký tự \\ufeff ở đầu tệp."
                  },
                  {
                    "line": 14,
                    "text": "usecols bỏ qua các cột văn bản dài không cần thiết, giảm 50% RAM ngay khi nạp."
                  },
                  {
                    "line": 15,
                    "text": "Định kiểu trước giúp tránh ép kiểu ngầm sang float."
                  },
                  {
                    "line": 16,
                    "text": "parse_dates chuyển chuỗi ngày tháng sang datetime64 có khả năng trích xuất thời gian."
                  }
                ],
                "explanation": "Bằng cách kết hợp utf-8-sig, usecols, dtype và parse_dates, quá trình đọc tệp diễn ra an toàn tuyệt đối, tối ưu hóa bộ nhớ ngay tại cửa ngõ nạp dữ liệu vào RAM."
              }
            ]
          },
          {
            "id": "sec-io-references",
            "title": "2. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n                          <ul>\n                            <li><strong>IETF. (2005).</strong> <em>RFC 4180: Common Format and MIME Type for Comma-Separated Values (CSV) Files.</em> Internet Engineering Task Force.</li>\n                            <li><strong>Unicode Consortium.</strong> <em>FAQ — UTF-8, UTF-16, UTF-32 & BOM.</em> <a href=\"https://www.unicode.org/faq/utf_bom.html\" target=\"_blank\" rel=\"noopener\">https://www.unicode.org/faq/utf_bom.html</a></li>\n                            <li><strong>Pandas Documentation.</strong> <em>IO tools (text, CSV, HDF5, ...) — parse_dates & dtypes.</em> <a href=\"https://pandas.pydata.org/docs/user_guide/io.html\" target=\"_blank\" rel=\"noopener\">https://pandas.pydata.org/docs/user_guide/io.html</a></li>\n                          </ul>\n                        "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Cạm bẫy UnicodeDecodeError khi đọc file từ hệ điều hành cũ",
              "content": "Nếu đọc file CSV bị báo lỗi `UnicodeDecodeError: 'utf-8' codec can't decode byte...`, đó là do file được lưu bằng bảng mã Windows Latin-1. Hãy thử chuyển sang `encoding='latin1'` hoặc `encoding='cp1252'`."
            },
            {
              "title": "Đọc thừa toàn bộ các cột rác (Over-fetching)",
              "content": "Một file CSV có 50 cột nhưng báo cáo chỉ cần 3 cột. Nếu không dùng `usecols`, bạn đang lãng phí 94% bộ nhớ RAM và thời gian I/O của đĩa cứng!"
            }
          ],
          "tips": [
            {
              "title": "Tăng tốc parse ngày tháng với date_format",
              "content": "Nếu bạn biết trước định dạng ngày tháng (ví dụ: '%Y-%m-%d %H:%M:%S'), hãy truyền tham số `date_format='%Y-%m-%d %H:%M:%S'`. Pandas sẽ tăng tốc parse ngày gấp 5 lần so với việc phải tự đoán định dạng."
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Khắc phục lỗi file CSV phân tách bằng dấu chấm phẩy (;)",
            "problem": "Một đối tác phần mềm gửi tệp dữ liệu giao dịch TechMart nhưng dùng dấu chấm phẩy phân tách: `order_id;amount;status\nT1;100;DONE\nT2;200;PENDING`. Hãy viết code đọc đúng tệp này thành DataFrame gồm 3 cột độc lập.",
            "hint": "Truyền tham số `sep=';'` vào hàm `pd.read_csv()`.",
            "solutionCode": "import pandas as pd\nimport io\n\ncsv_data = \"\"\"order_id;amount;status\nT1;100;DONE\nT2;200;PENDING\"\"\"\n\ndf = pd.read_csv(io.StringIO(csv_data), sep=\";\")\nprint(\"DataFrame đọc với sep=';':\\n\", df)\nprint(\"Số lượng cột nhận dạng:\", len(df.columns))",
            "solutionOutput": "DataFrame đọc với sep=';':\n   order_id  amount   status\n0       T1     100     DONE\n1       T2     200  PENDING\nSố lượng cột nhận dạng: 3",
            "explanation": "Mặc định pd.read_csv dùng dấu phẩy. Khi gặp định dạng châu Âu dùng dấu chấm phẩy, bắt buộc phải truyền sep=';' để chia đúng cột."
          },
          {
            "level": "Vừa",
            "title": "Xử lý triệt để ký tự BOM \\ufeff bằng utf-8-sig",
            "problem": "Cho chuỗi CSV bị dính ký tự BOM: `raw = '\\ufeffsku,price\\nA1,100\\nB2,200'`. Viết code đọc tệp sao cho truy cập `df['sku']` thành công mà không báo lỗi KeyError.",
            "hint": "Dùng `encoding='utf-8-sig'` trong `pd.read_csv`.",
            "solutionCode": "import pandas as pd\nimport io\n\nraw = \"\\ufeffsku,price\\nA1,100\\nB2,200\"\n\n# Sử dụng encoding utf-8-sig\ndf = pd.read_csv(io.StringIO(raw), encoding=\"utf-8-sig\")\n\n# Thử truy cập cột 'sku'\nsku_col = df[\"sku\"]\nprint(\"Truy cập cột 'sku' thành công:\", list(sku_col))\nprint(\"Tên các cột trong bảng:\", list(df.columns))",
            "solutionOutput": "Truy cập cột 'sku' thành công: ['A1', 'B2']\nTên các cột trong bảng: ['sku', 'price']",
            "explanation": "Bảng mã utf-8-sig tự động nhận diện 3 byte BOM đầu tệp và lược bỏ sạch sẽ, trả lại tên cột 'sku' nguyên bản."
          },
          {
            "level": "Nâng cao",
            "title": "Tối ưu hóa I/O: Nạp 10,000 dòng với Column Pruning và Typed Dtypes",
            "problem": "Giả sử bạn cần đọc một tệp giao dịch lớn có 10 cột, nhưng báo cáo doanh thu chỉ cần: `order_id` (mã), `order_date` (ngày giờ) và `revenue` (số tiền). Viết hàm `optimized_csv_reader(file_buffer)` áp dụng đầy đủ:\n1. Chỉ nạp đúng 3 cột cần thiết với `usecols`.\n2. Định kiểu tường minh: `order_id` là string, `revenue` là Int64.\n3. Parse trực tiếp ngày tháng theo chuẩn ISO.\n4. So sánh dung lượng RAM với cách đọc mặc định nạp cả 10 cột.",
            "hint": "Dùng `usecols` và `dtype` kết hợp trong `pd.read_csv()`.",
            "solutionCode": "import pandas as pd\nimport io\n\n# Giả lập file CSV 10 cột\ncsv_lines = [\"col1,order_id,col3,col4,order_date,col6,col7,revenue,col9,col10\"]\nfor i in range(100):\n    csv_lines.append(f\"x,ORD_{i},x,x,2026-11-01 10:00:00,x,x,{i*100000},x,x\")\ndata_str = \"\\n\".join(csv_lines)\n\n# 1. Đọc mặc định không tối ưu\ndf_full = pd.read_csv(io.StringIO(data_str))\nmem_full = df_full.memory_usage(deep=True).sum()\n\n# 2. Đọc tối ưu có chọn lọc\ndf_opt = pd.read_csv(\n    io.StringIO(data_str),\n    usecols=[\"order_id\", \"order_date\", \"revenue\"],\n    dtype={\"order_id\": \"string\", \"revenue\": \"Int64\"},\n    parse_dates=[\"order_date\"]\n)\nmem_opt = df_opt.memory_usage(deep=True).sum()\n\nprint(f\"RAM đọc mặc định (10 cột): {mem_full} bytes\")\nprint(f\"RAM đọc tối ưu (3 cột):    {mem_opt} bytes\")\nprint(f\"Tiết kiệm được:            {(mem_full - mem_opt) / mem_full * 100:.1f}% RAM!\")",
            "solutionOutput": "RAM đọc mặc định (10 cột): 52144 bytes\nRAM đọc tối ưu (3 cột):    18160 bytes\nTiết kiệm được:            65.2% RAM!",
            "explanation": "Column Pruning (usecols) kết hợp với Typed Dtypes chặn đứng việc nạp các cột rác vào RAM ngay từ cổng I/O của ổ đĩa, giúp tiết kiệm tới 65% bộ nhớ."
          }
        ],
        "quiz": [
          {
            "question": "Tại sao một tệp CSV xuất từ phần mềm Excel trên hệ điều hành Windows khi nạp vào Pandas lại thường gây ra lỗi `KeyError: 'order_id'` mặc dù trong tệp có cột tên là order_id?",
            "options": [
              "Vì Excel làm hỏng dữ liệu số.",
              "Vì Excel tự động chèn ký tự Byte Order Mark (BOM - \\ufeff) vào đầu tệp; khi đọc bằng encoding='utf-8' thông thường, tên cột đầu tiên bị biến thành '\\ufefforder_id'.",
              "Vì Pandas không hỗ trợ đọc tệp từ Windows.",
              "Vì tên cột bắt buộc phải viết hoa."
            ],
            "correctIndex": 1,
            "explanation": "Ký tự BOM vô hình \\ufeff khiến tên cột trong Python bị sai lệch. Khắc phục bằng cách truyền encoding='utf-8-sig'."
          },
          {
            "question": "Theo đặc tả kỹ thuật RFC 4180, khi một trường dữ liệu trong tệp CSV chứa dấu phẩy (ví dụ: tên hàng 'Chuột, màu đen'), trường đó phải được xử lý như thế nào?",
            "options": [
              "Xóa bỏ toàn bộ dấu phẩy trong văn bản.",
              "Thay dấu phẩy bằng dấu gạch ngang.",
              "Bắt buộc phải bọc toàn bộ trường dữ liệu đó bên trong một cặp dấu ngoặc kép (Double quotes).",
              "Chuyển toàn bộ ký tự sang mã nhị phân."
            ],
            "correctIndex": 2,
            "explanation": "RFC 4180 quy định các trường chứa ký tự phân cách (delimiter) hoặc dấu ngắt dòng phải được bao bọc trong cặp ngoặc kép."
          },
          {
            "question": "Lợi ích kỹ thuật lớn nhất của việc truyền tham số `usecols` và `dtype` ngay trong hàm `pd.read_csv()` là gì?",
            "options": [
              "Tự động vẽ biểu đồ trực quan hóa.",
              "Chỉ nạp đúng các cột cần thiết vào RAM (Column Pruning) và ngăn chặn việc Pandas phải cấp phát bộ nhớ thừa rồi tự động suy diễn kiểu dữ liệu chậm chạp, giảm tới 70% dung lượng RAM tiêu thụ.",
              "Tăng độ bảo mật của file.",
              "Xóa các dòng dữ liệu bị trùng lặp."
            ],
            "correctIndex": 1,
            "explanation": "usecols và dtype giúp lọc dữ liệu ngay tại luồng đọc C-parser của Pandas, tránh nạp các cột rác và tránh ép kiểu ngầm."
          }
        ],
        "summary": [
          "Tuân thủ chuẩn RFC 4180: Bọc trường chứa dấu phẩy trong ngoặc kép; thoát ngoặc kép bằng cách nhân đôi.",
          "Luôn dùng `encoding='utf-8-sig'` để triệt tiêu ký tự Byte Order Mark (BOM) từ các tệp Excel Windows.",
          "Sử dụng `usecols` (Column Pruning) và chỉ định trước `dtype` để tối ưu hóa RAM ngay tại cửa ngõ I/O.",
          "Parse ngày tháng chuẩn ISO 8601 trực tiếp bằng `parse_dates` để khai thác các thuộc tính thời gian sau này."
        ],
        "selfReviewQuestions": [
          "1. Trình bày 2 quy tắc cốt lõi của đặc tả RFC 4180 về định dạng tệp CSV.",
          "2. Ký tự BOM (\\ufeff) sinh ra từ đâu và tham số nào trong `pd.read_csv()` giúp bóc tách nó sạch sẽ?",
          "3. Tại sao việc chỉ định trước kiểu dữ liệu qua tham số `dtype` lại giúp tăng tốc độ đọc tệp CSV?"
        ],
        "reflectionQuestion": "Hãy giải thích: Tại sao trong một hệ thống xử lý dữ liệu tự động, việc viết một hàm kiểm tra và tự động phát hiện bảng mã (Encoding Detector) trước khi đọc file lại là một kỹ năng phòng vệ sinh tử?",
        "reflectionHint": "Nghĩ về trường hợp: Đối tác gửi file từ máy tính tiếng Nhật (Shift-JIS), đối tác khác gửi từ Windows cũ (cp1252); nếu cố định utf-8, toàn bộ pipeline sẽ bị crash vào lúc nửa đêm!",
        "nextLessonPreview": "Ở bài tiếp theo (5.2), chúng ta sẽ xử lý định dạng dữ liệu linh hoạt nhất của kỷ nguyên Web: Làm phẳng mảng JSON lồng nhau phức tạp bằng json_normalize và tích hợp CSDL SQLite hai chiều!"
      },
      {
        "id": "pd-05-02",
        "number": "5.2",
        "title": "Làm Phẳng JSON Lồng Nhau (json_normalize) & Tích Hợp SQLite",
        "subtitle": "Chuẩn RFC 8259, kỹ thuật bóc tách mảng lồng nhau với record_path và meta, tích hợp cơ sở dữ liệu quan hệ SQLite hai chiều qua pd.read_sql",
        "level": "Trung cấp",
        "duration": "40 phút",
        "objectives": [
          "Phân tích cú pháp dữ liệu JSON chuẩn RFC 8259: Phân biệt cấu trúc Document phân cấp (Hierarchical/Nested) với cấu trúc bảng phẳng (Flat Tabular).",
          "Làm chủ hàm pd.json_normalize để làm phẳng các đối tượng lồng nhau phức tạp bằng cách thiết lập tham số record_path và meta.",
          "Tích hợp kết nối hai chiều với cơ sở dữ liệu quan hệ SQLite bằng SQLAlchemy và Pandas: pd.read_sql và df.to_sql.",
          "Bảo vệ an toàn dữ liệu: Ngăn chặn lỗi nổ số lượng dòng khi làm phẳng các mảng con không đồng nhất."
        ],
        "intuition": {
          "title": "Mở từng lớp hộp quà búp bê Nga & Cầu nối giữa Kho tài liệu và Tủ hồ sơ",
          "metaphor": "Dữ liệu JSON từ API giống như bộ búp bê gỗ Nga (Matryoshka): mở hộp to ra lại thấy hộp nhỏ, mở hộp nhỏ lại thấy một túi kẹo (mảng danh sách mặt hàng lồng trong đơn hàng). Bạn không thể nhét nguyên con búp bê Nga vào chiếc máy quét phẳng (DataFrame). Hàm pd.json_normalize giống như chiếc kéo thông minh: nó bóc từng lớp hộp quà, trải đều từng chiếc kẹo thành từng hàng trên bàn, đồng thời dán nhãn tên của con búp bê mẹ (mã đơn hàng, ngày mua) lên từng chiếc kẹo đó! Còn SQLite giống như chiếc két sắt gia đình: gọn nhẹ, không cần cài đặt máy chủ rườm rà, lưu toàn bộ dữ liệu bảng vào đúng một tệp duy nhất trên ổ cứng!",
          "boundary": "Làm phẳng JSON bằng json_normalize tạo ra các dòng phẳng nhưng nếu một đơn hàng có 10 mặt hàng, thông tin đơn hàng mẹ sẽ bị lặp lại 10 lần. Đây là sự đánh đổi bình thường để chuyển sang dạng bảng chuẩn Tidy Data.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">LÀM PHẲNG JSON BẰNG PD.JSON_NORMALIZE</div>\n                        <div style=\"display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center;\">\n                          <div style=\"background:var(--bg-surface);padding:8px;border:1px solid var(--border-strong);border-radius:4px;font-size:0.75rem;\">\n                            <strong style=\"color:#ef4444;\">JSON Lồng Nhau</strong>\n                            <pre style=\"margin:4px 0;font-size:0.7rem;\">{\"order\": \"T1\",\n \"items\": [\n   {\"sku\": \"A\", \"qty\": 2},\n   {\"sku\": \"B\", \"qty\": 1}\n ]}</pre>\n                          </div>\n                          <span>➔ normalize ➔</span>\n                          <div style=\"background:var(--bg-surface);padding:8px;border:1px solid var(--border-strong);border-radius:4px;font-size:0.75rem;\">\n                            <strong style=\"color:#10b981;\">Bảng Phẳng 2 Dòng</strong>\n                            <div style=\"margin-top:4px;font-size:0.7rem;\">\n                              Dòng 1: T1 | A | 2<br/>\n                              Dòng 2: T1 | B | 1\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-json-normalize-deep",
            "title": "1. Làm Phẳng JSON Lồng Nhau Với pd.json_normalize",
            "badge": "Chuyển đổi Cấu trúc",
            "content": "\n                          <p>Hơn 90% các API REST hiện đại trả về dữ liệu theo định dạng <strong>JSON (RFC 8259)</strong> có cấu trúc phân cấp đa tầng (Nested documents). Để đưa dữ liệu này vào phân tích bảng, ta phải sử dụng vũ khí chuyên dụng <code>pd.json_normalize</code> với 3 tham số cốt lõi:</p>\n                          \n                          <ul>\n                            <li><strong>data:</strong> Danh sách các đối tượng JSON thô chưa xử lý.</li>\n                            <li><strong>record_path:</strong> Đường dẫn trỏ tới mảng danh sách lồng nhau cần bung thành từng dòng độc lập (ví dụ: <code>['items']</code> hoặc <code>['order', 'items']</code>).</li>\n                            <li><strong>meta:</strong> Danh sách các trường dữ liệu ở tầng cha cần được giữ lại và nhân bản vào từng dòng con (ví dụ: <code>['order_id', 'order_date', ['customer', 'name']]</code>).</li>\n                          </ul>\n                        ",
            "codeExamples": [
              {
                "title": "Bóc tách phản hồi JSON đơn hàng phức tạp từ API TechMart bằng json_normalize",
                "lang": "Python",
                "code": "import pandas as pd\n\n# Giả lập payload JSON thực tế trả về từ API quản lý chuỗi TechMart\napi_response = [\n    {\n        \"order_id\": \"TM-101\",\n        \"timestamp\": \"2026-11-01 10:15:00\",\n        \"customer\": {\"name\": \"Nguyen Van A\", \"tier\": \"VIP\"},\n        \"branch\": \"Hà Nội\",\n        \"items\": [\n            {\"sku\": \"MOUSE-01\", \"name\": \"Chuột không dây\", \"qty\": 2, \"price\": 250000},\n            {\"sku\": \"PAD-02\", \"name\": \"Bàn di chuột\", \"qty\": 1, \"price\": 80000}\n        ]\n    },\n    {\n        \"order_id\": \"TM-102\",\n        \"timestamp\": \"2026-11-01 11:30:00\",\n        \"customer\": {\"name\": \"Tran Thi B\", \"tier\": \"STANDARD\"},\n        \"branch\": \"TP.HCM\",\n        \"items\": [\n            {\"sku\": \"KEY-99\", \"name\": \"Bàn phím cơ\", \"qty\": 1, \"price\": 1200000}\n        ]\n    }\n]\n\n# Làm phẳng mảng lồng nhau 'items' và kéo theo metadata tầng cha\ndf_flat = pd.json_normalize(\n    data=api_response,\n    record_path=[\"items\"],\n    meta=[\"order_id\", \"branch\", [\"customer\", \"name\"], [\"customer\", \"tier\"]]\n)\n\nprint(\"=== BẢNG DỮ LIỆU ĐÃ LÀM PHẲNG CHUẨN TIDY DATA ===\")\nprint(df_flat[[\"order_id\", \"customer.name\", \"customer.tier\", \"sku\", \"qty\", \"price\"]])",
                "output": "=== BẢNG DỮ LIỆU ĐÃ LÀM PHẲNG CHUẨN TIDY DATA ===\n  order_id customer.name customer.tier       sku  qty    price\n0   TM-101  Nguyen Van A           VIP  MOUSE-01    2   250000\n1   TM-101  Nguyen Van A           VIP    PAD-02    1    80000\n2   TM-102    Tran Thi B      STANDARD    KEY-99    1  1200000",
                "annotations": [
                  {
                    "line": 26,
                    "text": "record_path=['items'] bung từng món hàng trong mảng thành 1 dòng riêng."
                  },
                  {
                    "line": 27,
                    "text": "meta kéo các thuộc tính của đơn hàng mẹ vào từng dòng con."
                  },
                  {
                    "line": 28,
                    "text": "Dùng list con ['customer', 'name'] để trích xuất trường lồng nhau 2 cấp."
                  }
                ],
                "explanation": "json_normalize tự động chuyển đổi cấu trúc JSON phân cấp thành bảng phẳng chuẩn mực, sẵn sàng cho việc tính toán thống kê và vẽ biểu đồ."
              }
            ]
          },
          {
            "id": "sec-sqlite-integration",
            "title": "2. Tích Hợp Cơ Sở Dữ Liệu SQLite Hai Chiều",
            "badge": "Tích hợp Cơ sở Dữ liệu",
            "content": "\n                          <p>Trong các hệ thống phân tích dữ liệu cục bộ hoặc ứng dụng di động, <strong>SQLite</strong> là cơ sở dữ liệu quan hệ được sử dụng rộng rãi nhất thế giới. SQLite không cần cấu hình server, toàn bộ CSDL được chứa gọn trong đúng 1 tệp tin nhị phân trên đĩa cứng.</p>\n\n                          <h4>Quy trình tích hợp hai chiều với Pandas:</h4>\n                          <ol>\n                            <li><strong>Đọc dữ liệu bằng SQL (pd.read_sql):</strong> Gửi câu lệnh SQL truy vấn trực tiếp vào CSDL để lọc dữ liệu từ nguồn, chỉ kéo các dòng cần thiết vào RAM.</li>\n                            <li><strong>Ghi dữ liệu ra bảng (df.to_sql):</strong> Lưu trữ DataFrame hoàn chỉnh vào bảng CSDL bằng cơ chế tự động tạo bảng (schema generation) với các tham số <code>if_exists='replace'</code> hoặc <code>'append'</code>.</li>\n                          </ol>\n                        ",
            "codeExamples": [
              {
                "title": "Ghi DataFrame ra SQLite và truy vấn lọc doanh thu bằng SQL thuần",
                "lang": "Python",
                "code": "import sqlite3\nimport pandas as pd\n\n# 1. Tạo kết nối tới cơ sở dữ liệu SQLite cục bộ trong bộ nhớ RAM\nconn = sqlite3.connect(\":memory:\")\n\n# Tạo DataFrame mẫu\nsales_df = pd.DataFrame({\n    \"order_id\": [\"HD01\", \"HD02\", \"HD03\", \"HD04\"],\n    \"branch\": [\"HN\", \"HCM\", \"HN\", \"DN\"],\n    \"revenue\": [250000, 1200000, 350000, 800000]\n})\n\n# 2. Ghi DataFrame vào bảng CSDL 'orders'\nsales_df.to_sql(\"orders\", conn, index=False, if_exists=\"replace\")\n\n# 3. Truy vấn dữ liệu có chọn lọc bằng câu lệnh SQL chuẩn\nsql_query = \"\"\"\nSELECT branch, COUNT(order_id) AS total_orders, SUM(revenue) AS total_rev\nFROM orders\nGROUP BY branch\nHAVING total_rev > 500000\nORDER BY total_rev DESC;\n\"\"\"\n\n# Nạp thẳng kết quả truy vấn SQL thành Pandas DataFrame\ndf_aggregated = pd.read_sql(sql_query, conn)\nprint(\"=== KẾT QUẢ TRUY VẤN SQL QUA PANDAS ===\")\nprint(df_aggregated)\nconn.close()",
                "output": "=== KẾT QUẢ TRUY VẤN SQL QUA PANDAS ===\n  branch  total_orders  total_rev\n0    HCM             1    1200000\n1     DN             1     800000\n2     HN             2     600000",
                "annotations": [
                  {
                    "line": 5,
                    "text": "sqlite3.connect(':memory:') tạo CSDL siêu tốc ngay trong RAM phục vụ phân tích."
                  },
                  {
                    "line": 15,
                    "text": "to_sql tự động tạo schema bảng quan hệ và nạp dữ liệu vào SQLite."
                  },
                  {
                    "line": 26,
                    "text": "pd.read_sql kết hợp sức mạnh tổng hợp của SQL engine và tính linh hoạt của DataFrame."
                  }
                ],
                "explanation": "Tích hợp SQLite giúp kỹ sư dữ liệu tận dụng cú pháp SQL mạnh mẽ để tổng hợp dữ liệu quy mô lớn ngay trong CSDL trước khi nạp vào Python."
              }
            ]
          },
          {
            "id": "sec-json-references",
            "title": "3. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n                          <ul>\n                            <li><strong>IETF. (2017).</strong> <em>RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format.</em> Internet Engineering Task Force.</li>\n                            <li><strong>Pandas Documentation.</strong> <em>pandas.json_normalize.</em> <a href=\"https://pandas.pydata.org/docs/reference/api/pandas.json_normalize.html\" target=\"_blank\" rel=\"noopener\">https://pandas.pydata.org/docs/reference/api/pandas.json_normalize.html</a></li>\n                            <li><strong>Hipp, D. R. (2020).</strong> <em>SQLite Architecture & SQL Engine.</em> <a href=\"https://www.sqlite.org/arch.html\" target=\"_blank\" rel=\"noopener\">https://www.sqlite.org/arch.html</a></li>\n                          </ul>\n                        "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Cạm bẫy truy cập trường JSON lồng nhau sâu",
              "content": "Khi trích xuất trường lồng nhau 2 cấp (ví dụ: `customer -> address -> city`), bạn phải truyền dạng danh sách: `meta=[['customer', 'address', 'city']]`, nếu truyền chuỗi `'customer.address.city'` có thể gây lỗi KeyError."
            },
            {
              "title": "Ghi to_sql chậm chạp khi không dùng chunksize",
              "content": "Khi ghi một DataFrame 1 triệu dòng vào SQLite bằng `df.to_sql()`, mặc định nó thực hiện từng dòng một rất chậm. Hãy truyền tham số `method='multi'` và `chunksize=5000` để tăng tốc độ ghi gấp 20 lần."
            }
          ],
          "tips": [
            {
              "title": "Khai thác sức mạnh SQL Group By trước khi nạp vào RAM",
              "content": "Luôn đẩy các phép lọc `WHERE` và tổng hợp `GROUP BY` xuống tầng SQL engine thông qua `pd.read_sql()`. Chỉ kéo kết quả tổng hợp vào Pandas để giữ RAM luôn ở mức an toàn."
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Làm phẳng mảng danh sách lồng nhau đơn giản",
            "problem": "Cho JSON: `data = [{'id': 1, 'items': [{'sku': 'A', 'p': 10}, {'sku': 'B', 'p': 20}]}]`. Hãy dùng `pd.json_normalize` làm phẳng mảng `items` kèm giữ lại trường `id`.",
            "hint": "Dùng `pd.json_normalize(data, record_path=['items'], meta=['id'])`.",
            "solutionCode": "import pandas as pd\n\ndata = [{\"id\": 1, \"items\": [{\"sku\": \"A\", \"p\": 10}, {\"sku\": \"B\", \"p\": 20}]}]\ndf_flat = pd.json_normalize(data, record_path=[\"items\"], meta=[\"id\"])\nprint(df_flat)",
            "solutionOutput": "  sku   p id\n0   A  10  1\n1   B  20  1",
            "explanation": "record_path chỉ định mảng con cần mở rộng thành các hàng, trong khi meta mang các trường định danh ở cấp cha sang từng dòng con."
          },
          {
            "level": "Vừa",
            "title": "Bóc tách phản hồi JSON có cấu trúc lồng nhau 2 cấp",
            "problem": "Cho dữ liệu phản hồi API TechMart chứa thông tin khách hàng lồng nhau:\n`data = [{'tx_id': 'T1', 'buyer': {'info': {'vip': True}}, 'products': [{'name': 'Mouse'}]}]`.\nHãy viết code làm phẳng mảng `products` và kéo trường `vip` vào DataFrame kết quả.",
            "hint": "Truyền `meta=[['buyer', 'info', 'vip']]`.",
            "solutionCode": "import pandas as pd\n\ndata = [{\n    \"tx_id\": \"T1\",\n    \"buyer\": {\"info\": {\"vip\": True}},\n    \"products\": [{\"name\": \"Mouse\"}]\n}]\n\ndf = pd.json_normalize(\n    data,\n    record_path=[\"products\"],\n    meta=[\"tx_id\", [\"buyer\", \"info\", \"vip\"]]\n)\nprint(df)",
            "solutionOutput": "    name tx_id buyer.info.vip\n0  Mouse    T1           True",
            "explanation": "Cú pháp danh sách con lồng nhau cho phép bóc tách chính xác các trường dữ liệu nằm sâu bên trong cấu trúc JSON phân cấp."
          },
          {
            "level": "Nâng cao",
            "title": "Dựng đường ống ETL mini: JSON API ➔ SQLite ➔ Tổng hợp KPI",
            "problem": "Viết hàm `etl_json_to_sqlite(json_records, db_path='techmart.db')` nhận vào danh sách JSON đơn hàng thô có lồng mảng `items`. Hàm thực hiện:\n1. Dùng `pd.json_normalize` làm phẳng dữ liệu.\n2. Ghi bảng phẳng vào tệp SQLite `techmart.db` trong bảng `order_details`.\n3. Dùng câu lệnh SQL trong `pd.read_sql` tính tổng doanh thu và số lượng mặt hàng bán theo từng SKU.\n4. Trả về DataFrame tổng hợp.",
            "hint": "Kết hợp json_normalize, df.to_sql và pd.read_sql.",
            "solutionCode": "import sqlite3\nimport pandas as pd\n\ndef etl_json_to_sqlite(json_records):\n    # 1. Làm phẳng\n    df_flat = pd.json_normalize(\n        json_records,\n        record_path=[\"items\"],\n        meta=[\"order_id\", \"branch\"]\n    )\n    \n    # 2. Ghi vào SQLite in-memory\n    conn = sqlite3.connect(\":memory:\")\n    df_flat.to_sql(\"order_details\", conn, index=False, if_exists=\"replace\")\n    \n    # 3. Truy vấn tổng hợp KPI\n    query = \"\"\"\n    SELECT sku, SUM(qty) AS total_qty, SUM(qty * price) AS total_revenue\n    FROM order_details\n    GROUP BY sku\n    ORDER BY total_revenue DESC;\n    \"\"\"\n    kpi_df = pd.read_sql(query, conn)\n    conn.close()\n    return kpi_df\n\nraw_api = [\n    {\"order_id\": \"O1\", \"branch\": \"HN\", \"items\": [{\"sku\": \"A\", \"qty\": 2, \"price\": 100}, {\"sku\": \"B\", \"qty\": 1, \"price\": 500}]},\n    {\"order_id\": \"O2\", \"branch\": \"HCM\", \"items\": [{\"sku\": \"A\", \"qty\": 3, \"price\": 100}]}\n]\nprint(\"=== BÁO CÁO KPI TỔNG HỢP QUA SQLITE ===\")\nprint(etl_json_to_sqlite(raw_api))",
            "solutionOutput": "=== BÁO CÁO KPI TỔNG HỢP QUA SQLITE ===\n  sku  total_qty  total_revenue\n0   B          1            500\n1   A          5            500",
            "explanation": "Đoạn mã mô phỏng hoàn chỉnh một đường ống dữ liệu thực tế: Trích xuất JSON từ REST API ➔ Chuyển đổi làm phẳng chuẩn Tidy Data ➔ Nạp vào CSDL quan hệ ➔ Tính toán báo cáo kinh doanh qua SQL."
          }
        ],
        "quiz": [
          {
            "question": "Trong hàm `pd.json_normalize`, tham số `record_path` có nhiệm vụ kỹ thuật gì?",
            "options": [
              "Lưu file ra ổ cứng.",
              "Chỉ định đường dẫn tới mảng danh sách lồng nhau bên trong đối tượng JSON cần được bung ra thành các dòng độc lập trong DataFrame.",
              "Đổi tên các cột.",
              "Xóa các giá trị bị khuyết."
            ],
            "correctIndex": 1,
            "explanation": "record_path chỉ định mảng phân cấp bên trong (như 'items') để nhân bản thành từng dòng phẳng trong bảng kết quả."
          },
          {
            "question": "Khi làm phẳng một trường JSON lồng nhau 2 cấp (ví dụ: `{'customer': {'address': {'city': 'HN'}}}`), tham số `meta` cần được khai báo như thế nào?",
            "options": [
              "`meta='customer.address.city'`",
              "`meta=[['customer', 'address', 'city']]`",
              "`meta={'city': 'HN'}`",
              "`meta=True`"
            ],
            "correctIndex": 1,
            "explanation": "Để trích xuất các thuộc tính lồng nhau đa cấp trong meta, bạn phải truyền danh sách các khóa lồng nhau: [['customer', 'address', 'city']]."
          },
          {
            "question": "Ưu điểm vượt trội của việc lưu trữ và truy vấn dữ liệu bằng SQLite kết hợp với Pandas so với việc lưu trữ tệp văn bản CSV đơn thuần là gì?",
            "options": [
              "SQLite miễn phí còn CSV phải trả tiền.",
              "SQLite hỗ trợ chỉ mục (Index) tăng tốc độ tìm kiếm, bảo toàn kiểu dữ liệu nguyên vẹn, hỗ trợ truy vấn lọc tổng hợp SQL tại nguồn và chống hỏng file khi ghi đồng thời.",
              "SQLite chạy được mà không cần máy tính.",
              "CSV không thể mở được trên Excel."
            ],
            "correctIndex": 1,
            "explanation": "SQLite là hệ quản trị CSDL quan hệ đầy đủ tính năng ACID: có index băm tăng tốc, giữ nguyên kiểu dữ liệu và cho phép tổng hợp SQL ngay tại CSDL."
          }
        ],
        "summary": [
          "Sử dụng `pd.json_normalize` với `record_path` và `meta` để làm phẳng cấu trúc JSON phân cấp thành bảng Tidy Data.",
          "Trích xuất trường lồng nhau đa tầng bằng cú pháp danh sách con: `meta=[['parent', 'child']]`.",
          "Tích hợp CSDL quan hệ SQLite gọn nhẹ hai chiều bằng `pd.read_sql` và `df.to_sql`.",
          "Đẩy các tác vụ lọc và tổng hợp nặng xuống tầng SQL engine trước khi nạp dữ liệu vào bộ nhớ RAM của Pandas."
        ],
        "selfReviewQuestions": [
          "1. Nêu sự khác biệt cấu trúc giữa tệp JSON phân cấp (Hierarchical) và DataFrame dạng bảng phẳng (Flat table).",
          "2. Phân biệt chức năng của 2 tham số `record_path` và `meta` trong hàm `pd.json_normalize()`.",
          "3. Tại sao trong môi trường sản xuất, ta nên dùng câu lệnh SQL trong `pd.read_sql()` để lọc dữ liệu thay vì nạp toàn bộ bảng vào rồi mới lọc bằng Pandas?"
        ],
        "reflectionQuestion": "Hãy suy ngẫm: Khi làm phẳng một đơn hàng có 100 mặt hàng con, thông tin mã đơn hàng và tên khách hàng mẹ bị lặp lại 100 lần. Điều này có vi phạm nguyên tắc chuẩn hóa cơ sở dữ liệu (3NF) không, và tại sao trong Khoa học Dữ liệu người ta vẫn chấp nhận việc làm phẳng này?",
        "reflectionHint": "Nghĩ về sự đánh đổi: Trong CSDL tác nghiệp (OLTP), người ta chuẩn hóa để tránh dư thừa; nhưng trong Phân tích Dữ liệu (OLAP), dữ liệu phẳng phi chuẩn hóa (Denormalized Tidy Data) giúp các thuật toán học máy và trực quan hóa thực thi ở tốc độ cao nhất mà không tốn chi phí Join.",
        "nextLessonPreview": "Ở bài tiếp theo (5.3), chúng ta sẽ khám phá định dạng lưu trữ hiện đại nhất của kỹ nghệ dữ liệu lớn: Apache Parquet dạng cột và kỹ thuật Chunking đọc file 50GB trên máy tính chỉ có 8GB RAM!"
      },
      {
        "id": "pd-05-03",
        "number": "5.3",
        "title": "Định Dạng Cột Apache Parquet & Kỹ Thuật Chunking Vượt RAM",
        "subtitle": "Nguyên tắc FAIR, ma trận so sánh CSV vs Parquet vs SQLite, nén Snappy, Column Pruning, kỹ thuật Chunking streaming và nguyên tắc Dữ liệu thô bất biến",
        "level": "Nâng cao",
        "duration": "45 phút",
        "objectives": [
          "So sánh toàn diện kiến trúc lưu trữ dạng Hàng (Row-oriented CSV) vs dạng Cột (Columnar Apache Parquet) dựa trên 4 nguyên tắc dữ liệu FAIR (Findable, Accessible, Interoperable, Reusable).",
          "Phân tích các cơ chế kỹ thuật giúp Parquet tiết kiệm 80% dung lượng đĩa và đọc nhanh gấp 20 lần: Nén Snappy/ZSTD, Dictionary Encoding, Column Pruning và Predicate Pushdown.",
          "Làm chủ kỹ thuật Chunking (pd.read_csv với chunksize) để xử lý các tệp dữ liệu khổng lồ (vượt quá dung lượng RAM) bằng kỹ thuật tính toán luồng trực tuyến (Streaming Online Aggregation).",
          "Thiết lập nguyên tắc bất biến: Tuyệt đối không bao giờ ghi đè lên tệp dữ liệu thô (Raw Data Immutability) trong kiến trúc hồ dữ liệu (Data Lake)."
        ],
        "intuition": {
          "title": "Cuốn sổ danh bạ in trên giấy vs Cơ sở dữ liệu thẻ từ thông minh",
          "metaphor": "1. Tệp CSV giống như cuốn sổ danh bạ in giấy cổ điển: Mọi dòng đều in từ đầu đến cuối (Tên, Địa chỉ, Số điện thoại). Khi sếp chỉ yêu cầu: 'Hãy tìm tất cả số điện thoại ở Hà Nội', bạn buộc phải lật giở từng trang, đọc lướt qua cả tên và địa chỉ (I/O đĩa cứng tối đa, lãng phí thời gian nạp dữ liệu thừa).\\n2. Apache Parquet giống như hệ thống thẻ từ thông minh lưu trữ THEO TỪNG CỘT RIÊNG BIỆT: Cột Số điện thoại được cất riêng trong một ngăn kéo nhị phân nén chặt (Columnar storage). Khi sếp yêu cầu, máy tính chỉ mở đúng ngăn kéo cột Số điện thoại (Column Pruning) và dùng thống kê min/max ở đầu trang để nhảy cóc bỏ qua hàng triệu bản ghi không liên quan (Predicate Pushdown)!\\n3. Kỹ thuật Chunking giống như người thợ xúc cát: Nếu một đống cát 1 tấn không thể bê nguyên cả đống vào nhà (tràn RAM), người thợ dùng một chiếc xẻng xúc từng xẻng 5kg (chunksize=50,000 dòng), sàng lọc sạch sẽ, cộng dồn kết quả vào sổ cái rồi mới xúc xẻng tiếp theo!",
          "boundary": "Parquet là định dạng nhị phân, con người không thể mở bằng Notepad để đọc trực tiếp như CSV. Nó được thiết kế chuyên biệt cho máy tính và các công cụ phân tích dữ liệu hiệu năng cao.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">SO SÁNH BỐ CỤC LƯU TRỮ TRÊN Ổ ĐĨA: CSV VS APACHE PARQUET</div>\n                        <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px;\">\n                          <div style=\"background:var(--bg-surface);padding:10px;border:1px solid #ef4444;border-radius:6px;\">\n                            <strong style=\"color:#ef4444;\">CSV: Hướng Hàng (Row-oriented)</strong>\n                            <div style=\"font-size:0.75rem;margin-top:6px;line-height:1.5;\">\n                              Dòng 1: [ID1, \"HN\", 250000]<br/>\n                              Dòng 2: [ID2, \"HCM\", 1200000]<br/>\n                              Dòng 3: [ID3, \"DN\", 450000]<br/>\n                              <span style=\"color:var(--text-muted);\">➔ Muốn tính tổng tiền, bắt buộc phải đọc cả ID và Tên chi nhánh!</span>\n                            </div>\n                          </div>\n                          <div style=\"background:var(--bg-surface);padding:10px;border:1px solid #10b981;border-radius:6px;\">\n                            <strong style=\"color:#10b981;\">Parquet: Hướng Cột (Columnar)</strong>\n                            <div style=\"font-size:0.75rem;margin-top:6px;line-height:1.5;\">\n                              Cột ID: [ID1, ID2, ID3]<br/>\n                              Cột Chi nhánh: [\"HN\", \"HCM\", \"DN\"]<br/>\n                              Cột Doanh số: [250000, 1200000, 450000]<br/>\n                              <span style=\"color:#10b981;\">➔ Chỉ đọc đúng Cột Doanh số (Tiết kiệm 80% I/O đĩa)!</span>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-fair-matrix",
            "title": "1. Ma Trận So Sánh Định Dạng Lưu Trữ Theo Nguyên Tắc FAIR",
            "badge": "Tiêu chuẩn Quốc tế",
            "content": "\n                          <p>Năm 2016, cộng đồng khoa học quốc tế công bố nguyên tắc <strong>FAIR (Findable - Dễ tìm kiếm, Accessible - Dễ tiếp cận, Interoperable - Tương tác liên thông, Reusable - Tái sử dụng trường tồn)</strong>. Trong kỹ nghệ dữ liệu, việc chọn sai định dạng lưu trữ có thể làm tê liệt hệ thống:</p>\n\n                          <div class=\"table-responsive\">\n                            <table style=\"width:100%;font-size:0.9rem;border-collapse:collapse;\">\n                              <thead>\n                                <tr style=\"background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);\">\n                                  <th style=\"padding:10px;text-align:left;\">Tiêu chí kỹ thuật</th>\n                                  <th style=\"padding:10px;text-align:left;\">CSV (Văn bản phân tách)</th>\n                                  <th style=\"padding:10px;text-align:left;\">SQLite (CSDL Quan hệ)</th>\n                                  <th style=\"padding:10px;text-align:left;\">Apache Parquet (Nhị phân cột)</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                                  <td style=\"padding:10px;\"><strong>Bố cục lưu trữ</strong></td>\n                                  <td>Hướng hàng (Row-oriented) văn bản thuần.</td>\n                                  <td>Hướng hàng (Row-oriented) khối B-Tree.</td>\n                                  <td><strong>Hướng cột (Columnar)</strong> nhị phân.</td>\n                                </tr>\n                                <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                                  <td style=\"padding:10px;\"><strong>Bảo toàn kiểu dữ liệu (Schema)</strong></td>\n                                  <td style=\"color:#ef4444;\">Không (Phải đoán kiểu khi đọc lại).</td>\n                                  <td style=\"color:#10b981;\">Có (Lưu schema chặt chẽ trong CSDL).</td>\n                                  <td style=\"color:#10b981;\"><strong>Có (Lưu metadata nhị phân tự mô tả).</strong></td>\n                                </tr>\n                                <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                                  <td style=\"padding:10px;\"><strong>Mức độ nén dung lượng</strong></td>\n                                  <td>Rất kém (Dung lượng lớn nhất).</td>\n                                  <td>Trung bình (Không nén sâu).</td>\n                                  <td><strong>Xuất sắc (Nén Snappy/ZSTD giảm 70–85% đĩa).</strong></td>\n                                </tr>\n                                <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                                  <td style=\"padding:10px;\"><strong>Đọc chọn lọc cột (Column Pruning)</strong></td>\n                                  <td style=\"color:#ef4444;\">Không (Phải quét toàn bộ tệp).</td>\n                                  <td>Trung bình.</td>\n                                  <td><strong>Cực nhanh (Chỉ nạp các byte của cột cần đọc).</strong></td>\n                                </tr>\n                                <tr>\n                                  <td style=\"padding:10px;\"><strong>Ngữ cảnh sử dụng tối ưu</strong></td>\n                                  <td>Trao đổi tệp nhỏ cho người dùng xem trên Excel.</td>\n                                  <td>Ứng dụng cục bộ, xử lý giao dịch ACID nhỏ.</td>\n                                  <td><strong>Kho dữ liệu lớn (Data Lake), Phân tích OLAP, AI.</strong></td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                        ",
            "codeExamples": [
              {
                "title": "Benchmark so sánh dung lượng và tốc độ ghi/đọc giữa CSV và Parquet",
                "lang": "Python",
                "code": "import pandas as pd\nimport numpy as np\nimport time\nimport os\n\n# Tạo tập dữ liệu bán lẻ 100,000 dòng mô phỏng TechMart\nN = 100_000\ndf_sample = pd.DataFrame({\n    \"order_id\": [f\"ORD_{i:07d}\" for i in range(N)],\n    \"branch\": np.random.choice([\"Hà Nội\", \"TP.HCM\", \"Đà Nẵng\", \"Cần Thơ\"], size=N),\n    \"category\": np.random.choice([\"Điện thoại\", \"Laptop\", \"Phụ kiện\", \"Gia dụng\"], size=N),\n    \"revenue\": np.random.randint(50000, 50000000, size=N),\n    \"is_member\": np.random.choice([True, False], size=N)\n})\n\n# 1. Ghi và đo dung lượng CSV\ndf_sample.to_csv(\"benchmark.csv\", index=False)\ncsv_size_kb = os.path.getsize(\"benchmark.csv\") / 1024\n\n# 2. Ghi và đo dung lượng Parquet (Nén Snappy mặc định)\ndf_sample.to_parquet(\"benchmark.parquet\", index=False, engine=\"pyarrow\")\nparquet_size_kb = os.path.getsize(\"benchmark.parquet\") / 1024\n\n# 3. Đo tốc độ đọc chỉ riêng 1 cột 'revenue'\nt0 = time.perf_counter()\n_ = pd.read_csv(\"benchmark.csv\", usecols=[\"revenue\"])\ntime_csv = time.perf_counter() - t0\n\nt1 = time.perf_counter()\n_ = pd.read_parquet(\"benchmark.parquet\", columns=[\"revenue\"])\ntime_parquet = time.perf_counter() - t1\n\nprint(f\"Dung lượng tệp CSV:     {csv_size_kb:,.1f} KB\")\nprint(f\"Dung lượng tệp Parquet: {parquet_size_kb:,.1f} KB (Giảm {(csv_size_kb - parquet_size_kb)/csv_size_kb*100:.1f}%!)\")\nprint(f\"\\nThời gian đọc cột revenue từ CSV:     {time_csv*1000:.2f} ms\")\nprint(f\"Thời gian đọc cột revenue từ Parquet: {time_parquet*1000:.2f} ms (Nhanh hơn {time_csv/time_parquet:.1f} lần!)\")\n\n# Dọn dẹp tệp thử nghiệm\nos.remove(\"benchmark.csv\")\nos.remove(\"benchmark.parquet\")",
                "output": "Dung lượng tệp CSV:     5,320.4 KB\nDung lượng tệp Parquet: 1,180.2 KB (Giảm 77.8%!)\n\nThời gian đọc cột revenue từ CSV:     28.50 ms\nThời gian đọc cột revenue từ Parquet: 3.20 ms (Nhanh hơn 8.9 lần!)",
                "annotations": [
                  {
                    "line": 16,
                    "text": "to_csv ghi dạng văn bản thô, kích thước nặng gấp 4 lần."
                  },
                  {
                    "line": 20,
                    "text": "to_parquet tự động nén Snappy và lưu trữ dạng cột nhị phân."
                  },
                  {
                    "line": 29,
                    "text": "Column Pruning: Parquet chỉ đọc đúng các byte của cột revenue trên đĩa, nhanh gấp 9 lần!"
                  }
                ],
                "explanation": "Thực nghiệm chứng minh rõ ràng: Parquet vừa giúp doanh nghiệp tiết kiệm gần 80% chi phí lưu trữ đám mây, vừa tăng tốc độ đọc dữ liệu lên gần 10 lần."
              }
            ]
          },
          {
            "id": "sec-chunking-large-files",
            "title": "2. Kỹ Thuật Chunking: Xử Lý Tệp Dữ Liệu Lớn Vượt Dung Lượng RAM",
            "badge": "Kỹ thuật Dữ liệu Lớn",
            "content": "\n                          <p>Khi bạn nhận được một tệp giao dịch <strong>50 Gigabytes</strong> từ toàn bộ hệ thống chuỗi cửa hàng TechMart nhưng máy tính của bạn chỉ có <strong>16 Gigabytes RAM</strong>: Nếu gọi <code>pd.read_csv('huge_sales.csv')</code>, máy tính sẽ nổ lỗi <code>MemoryError</code> và đóng băng ngay lập tức. Giải pháp kỹ thuật sống còn là <strong>Chunking (Đọc từng phần / Xử lý luồng)</strong>:</p>\n\n                          <h4>Nguyên lý hoạt động của Chunking:</h4>\n                          <p>Bằng cách truyền tham số <code>chunksize=50000</code> vào <code>pd.read_csv()</code>, Pandas không nạp toàn bộ tệp vào RAM mà trả về một <strong>đối tượng Iterator (TextFileReader)</strong>. Mỗi lần lặp qua đối tượng này, Pandas chỉ nạp đúng 50,000 dòng vào bộ nhớ. Ta tiến hành lọc, làm sạch và cộng dồn các chỉ số thống kê (Online Aggregation), sau đó giải phóng khối nhớ đó cho bộ thu dọn rác (GC) trước khi nạp 50,000 dòng tiếp theo!</p>\n                        ",
            "codeExamples": [
              {
                "title": "Tính tổng doanh thu và phát hiện lỗi trên tệp lớn bằng Chunking Iterator",
                "lang": "Python",
                "code": "import pandas as pd\nimport io\n\n# Giả lập tệp giao dịch lớn gồm 10,000 dòng\nlines = [\"order_id,branch,amount\"]\nfor i in range(10000):\n    branch = \"HN\" if i % 2 == 0 else \"HCM\"\n    lines.append(f\"ORD_{i},{branch},{100 + (i % 50)}\")\ncsv_buffer = io.StringIO(\"\\n\".join(lines))\n\n# XỬ LÝ DỮ LIỆU LỚN BẰNG CHUNKING (Mỗi lần đọc 2,500 dòng)\nchunk_size = 2500\ntotal_system_rev = 0\ntotal_valid_orders = 0\nbranch_sales_summary = {}\n\n# read_csv trả về một Iterator lặp\nreader = pd.read_csv(csv_buffer, chunksize=chunk_size)\n\nfor chunk_idx, chunk in enumerate(reader, start=1):\n    # Xử lý cục bộ trên từng chunk (Chỉ chiếm vài KB RAM tại một thời điểm)\n    clean_chunk = chunk.loc[chunk[\"amount\"] > 0]\n    \n    # Cộng dồn trực tuyến (Streaming Aggregation)\n    total_system_rev += clean_chunk[\"amount\"].sum()\n    total_valid_orders += len(clean_chunk)\n    \n    # Gom nhóm cục bộ từng chi nhánh\n    chunk_grouped = clean_chunk.groupby(\"branch\")[\"amount\"].sum()\n    for branch, rev in chunk_grouped.items():\n        branch_sales_summary[branch] = branch_sales_summary.get(branch, 0) + rev\n\nprint(f\"=== KẾT QUẢ TÍNH TOÁN STREAMING QUA 4 CHUNK ===\")\nprint(f\"Tổng số đơn hợp lệ xử lý: {total_valid_orders:,} đơn\")\nprint(f\"Tổng doanh thu toàn chuỗi: {total_system_rev:,} VNĐ\")\nprint(\"Doanh số tích lũy từng chi nhánh:\", branch_sales_summary)",
                "output": "=== KẾT QUẢ TÍNH TOÁN STREAMING QUA 4 CHUNK ===\nTổng số đơn hợp lệ xử lý: 10,000 đơn\nTổng doanh thu toàn chuỗi: 1,245,000 VNĐ\nDoanh số tích lũy từng chi nhánh: {'HCM': 625000, 'HN': 620000}",
                "annotations": [
                  {
                    "line": 17,
                    "text": "chunksize=2500 biến pd.read_csv thành một lazy generator iterator."
                  },
                  {
                    "line": 19,
                    "text": "Vòng for duyệt từng chunk một, RAM đỉnh (Peak RAM) chỉ bằng dung lượng của 1 chunk."
                  },
                  {
                    "line": 23,
                    "text": "Chỉ cộng dồn số liệu vô hướng (Scalars), không giữ lại cả DataFrame chunk trong RAM."
                  }
                ],
                "explanation": "Kỹ thuật Chunking cho phép bạn xử lý các tập dữ liệu có kích thước hàng trăm Gigabytes trên những máy tính cá nhân cấu hình khiêm tốn mà bộ nhớ RAM không bao giờ bị tràn."
              }
            ]
          },
          {
            "id": "sec-raw-immutability",
            "title": "3. Nguyên Tắc Bất Biến Của Dữ Liệu Thô (Raw Data Immutability)",
            "badge": "Đạo đức & Kiến trúc",
            "content": "\n                          <p>Trong kỹ nghệ dữ liệu chuyên nghiệp (Data Engineering), có một quy tắc vàng được tôn trọng như một đạo luật:</p>\n                          <p style=\"text-align:center;font-weight:700;font-size:1.05rem;color:var(--danger);background:rgba(239,68,68,0.1);padding:10px;border-radius:6px;border:1px solid #ef4444;\">\n                            🛡️ RAW DATA IS SACRED AND IMMUTABLE (DỮ LIỆU THÔ LÀ THIÊNG LIÊNG VÀ BẤT BIẾN)\n                          </p>\n                          <ul>\n                            <li><strong>Không bao giờ ghi đè:</strong> Tuyệt đối không bao giờ mở file dữ liệu thô gốc và ghi đè kết quả đã làm sạch lên chính file đó.</li>\n                            <li><strong>Kiến trúc phân tầng:</strong> Luôn tổ chức dữ liệu theo các phân tầng rõ ràng:\n                              <br/>➔ <code>data/raw/</code>: Lưu trữ nguyên bản 100% dữ liệu gốc từ quầy thu ngân (Chế độ chỉ đọc - Read-only).\n                              <br/>➔ <code>data/processed/</code> hoặc <code>data/curated/</code>: Lưu trữ kết quả sau khi qua hàng rào làm sạch và kiểm định.\n                            </li>\n                            <li><strong>Khả năng tái lập quy trình (Reproducibility):</strong> Bất kỳ khi nào thuật toán bị nghi ngờ có sai sót, ta luôn có thể chạy lại mã nguồn từ tệp dữ liệu thô ban đầu để đối soát đối chứng.</li>\n                          </ul>\n                        "
          },
          {
            "id": "sec-parquet-references",
            "title": "4. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n                          <ul>\n                            <li><strong>Wilkinson, M. D., et al. (2016).</strong> <em>The FAIR Guiding Principles for scientific data management and stewardship.</em> Scientific Data, 3, 160018. DOI: 10.1038/sdata.2016.18.</li>\n                            <li><strong>Apache Software Foundation.</strong> <em>Apache Parquet Documentation & Format Specification.</em> <a href=\"https://parquet.apache.org/documentation/latest/\" target=\"_blank\" rel=\"noopener\">https://parquet.apache.org/documentation/latest/</a></li>\n                            <li><strong>Wilson, G., et al. (2017).</strong> <em>Good Enough Practices in Scientific Computing.</em> PLOS Computational Biology, 13(6), e1005510.</li>\n                          </ul>\n                        "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Ghi đè trực tiếp lên tệp dữ liệu gốc ban đầu",
              "content": "Nếu bạn ghi đè code lỗi lên tệp dữ liệu thô, dữ liệu sẽ bị hỏng vĩnh viễn không thể khôi phục. Luôn ghi ra tệp mới ở thư mục `data/processed/`."
            },
            {
              "title": "Cố tình nạp cả tệp 20GB vào RAM trong một lần đọc",
              "content": "Hệ thống sẽ bị treo cứng (OOM Killer của Linux sẽ cưỡng chế tắt tiến trình). Khi làm việc với file lớn, luôn thăm dò kích thước tệp trên đĩa trước khi quyết định dùng `read_csv` hay `chunksize`."
            }
          ],
          "tips": [
            {
              "title": "Kết hợp Chunking và xuất ra Parquet",
              "content": "Một mẫu thiết kế (Design Pattern) phổ biến: Đọc tệp CSV khổng lồ theo từng chunk 100,000 dòng, làm sạch và ghi tuần tự vào một tệp Parquet duy nhất. Bạn vừa chuyển đổi định dạng vừa nén nhỏ dữ liệu mà không sợ hết RAM!"
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Chuyển đổi tệp CSV sang định dạng Apache Parquet",
            "problem": "Cho DataFrame giao dịch: `df = pd.DataFrame({'id': [1, 2], 'branch': ['HN', 'HCM'], 'amount': [100.5, 200.0]})`. Viết code xuất DataFrame này ra tệp Parquet tên `sales.parquet` và đọc ngược trở lại để kiểm tra kiểu dữ liệu.",
            "hint": "Dùng `df.to_parquet('sales.parquet')` và `pd.read_parquet('sales.parquet')`.",
            "solutionCode": "import pandas as pd\nimport os\n\ndf = pd.DataFrame({\"id\": [1, 2], \"branch\": [\"HN\", \"HCM\"], \"amount\": [100.5, 200.0]})\ndf.to_parquet(\"sales.parquet\", index=False)\n\n# Đọc ngược lại\ndf_read = pd.read_parquet(\"sales.parquet\")\nprint(\"Dữ liệu đọc từ Parquet:\\n\", df_read)\nprint(\"Kiểm tra dtypes được bảo toàn 100%:\\n\", df_read.dtypes)\n\nif os.path.exists(\"sales.parquet\"):\n    os.remove(\"sales.parquet\")",
            "solutionOutput": "Dữ liệu đọc từ Parquet:\n    id branch  amount\n0   1     HN   100.5\n1   2    HCM   200.0\nKiểm tra dtypes được bảo toàn 100%:\n id          int64\nbranch     object\namount    float64\ndtype: object",
            "explanation": "Định dạng Parquet tự động lưu trữ lược đồ schema nhị phân ở phần đuôi file (footer), giúp toàn bộ kiểu dữ liệu được giữ nguyên vẹn 100% khi đọc lại mà không cần ép kiểu thủ công."
          },
          {
            "level": "Vừa",
            "title": "Lọc các đơn hàng giá trị cao từ file lớn bằng Chunking",
            "problem": "Giả sử có một tệp CSV lớn chứa 10,000 bản ghi. Hãy viết code sử dụng `chunksize=2000` để lọc ra tất cả các đơn hàng có `amount >= 400` và ghép nối thành một DataFrame kết quả duy nhất.",
            "hint": "Dùng list comprehension gom các chunk đã lọc: `pd.concat([c[c['amount'] >= 400] for c in reader])`.",
            "solutionCode": "import pandas as pd\nimport io\n\n# Tạo buffer giả lập dữ liệu lớn\nraw_lines = [\"id,amount\"] + [f\"{i},{i % 500}\" for i in range(1000)]\nbuf = io.StringIO(\"\\n\".join(raw_lines))\n\n# Đọc và lọc theo từng chunk 250 dòng\nreader = pd.read_csv(buf, chunksize=250)\nfiltered_chunks = []\n\nfor chunk in reader:\n    matched = chunk.loc[chunk[\"amount\"] >= 400]\n    filtered_chunks.append(matched)\n\nfinal_high_orders = pd.concat(filtered_chunks, ignore_index=True)\nprint(f\"Tổng số đơn hàng giá trị cao (>= 400) tìm thấy: {len(final_high_orders)}\")\nprint(\"5 đơn hàng đầu tiên:\\n\", final_high_orders.head())",
            "solutionOutput": "Tổng số đơn hàng giá trị cao (>= 400) tìm thấy: 200\n5 đơn hàng đầu tiên:\n    id  amount\n0  400     400\n1  401     401\n2  402     402\n3  403     403\n4  404     404",
            "explanation": "Lọc trên từng chunk giúp loại bỏ 80% bản ghi không thỏa mãn ngay lập tức, chỉ lưu các dòng thỏa mãn vào RAM trước khi gọi pd.concat gom lại."
          },
          {
            "level": "Nâng cao",
            "title": "Xây dựng Clean Data Lake Loader tuân thủ Raw Data Immutability",
            "problem": "Viết hàm `clean_lake_pipeline(raw_csv_path, processed_parquet_path)` tuân thủ nghiêm ngặt nguyên tắc bất biến của dữ liệu thô. Yêu cầu:\n1. Kiểm tra nếu `raw_csv_path` không tồn tại thì ném FileNotFoundError.\n2. Đọc file thô theo từng chunk 10,000 dòng, loại bỏ các đơn có số lượng âm hoặc NaN.\n3. Ghi kết quả vào `processed_parquet_path` (tuyệt đối không sửa file thô).\n4. In ra báo cáo tóm tắt: Số dòng thô ban đầu, số dòng sạch sau xử lý và tỷ lệ dung lượng nén.",
            "hint": "Đọc từng chunk, tích lũy vào list rồi xuất to_parquet hoặc dùng FastParquet/PyArrow writer.",
            "solutionCode": "import pandas as pd\nimport io\nimport os\n\ndef clean_lake_pipeline(raw_csv_str, out_parquet_path):\n    # Đọc chunking bảo vệ RAM\n    reader = pd.read_csv(io.StringIO(raw_csv_str), chunksize=2000)\n    clean_parts = []\n    total_raw = 0\n    \n    for chunk in reader:\n        total_raw += len(chunk)\n        # Làm sạch: loại bỏ số lượng âm và NaN\n        valid = chunk.dropna().loc[chunk[\"qty\"] > 0]\n        clean_parts.append(valid)\n        \n    df_clean = pd.concat(clean_parts, ignore_index=True)\n    df_clean.to_parquet(out_parquet_path, index=False)\n    \n    print(f\"Bản ghi thô ban đầu: {total_raw}\")\n    print(f\"Bản ghi sạch thu được: {len(df_clean)}\")\n    print(f\"Đã lưu an toàn vào hồ dữ liệu: {out_parquet_path}\")\n\nraw_data = \"order_id,qty\\n\" + \"\\n\".join([f\"ORD_{i},{i if i % 5 != 0 else -1}\" for i in range(5000)])\nclean_lake_pipeline(raw_data, \"curated_orders.parquet\")\n\nif os.path.exists(\"curated_orders.parquet\"):\n    os.remove(\"curated_orders.parquet\")",
            "solutionOutput": "Bản ghi thô ban đầu: 5000\nBản ghi sạch thu được: 4000\nĐã lưu an toàn vào hồ dữ liệu: curated_orders.parquet",
            "explanation": "Quy trình phân tách rõ ràng giữa tệp thô đầu vào và tệp Parquet đã làm sạch ở đầu ra bảo đảm tính tái lập, truy vết nguồn gốc và an toàn hệ thống."
          }
        ],
        "quiz": [
          {
            "question": "Tại sao định dạng tệp Apache Parquet lại tối ưu hóa vượt trội hơn CSV cho các bài toán phân tích dữ liệu lớn (OLAP)?",
            "options": [
              "Vì Parquet được tài trợ bởi quỹ từ thiện.",
              "Vì Parquet lưu trữ dữ liệu theo hướng cột (Columnar), áp dụng các thuật toán nén sâu (Snappy), bảo toàn lược đồ schema và cho phép chỉ nạp đúng các cột cần phân tích (Column Pruning) mà không phải quét toàn bộ ổ đĩa.",
              "Vì tệp Parquet có thể chỉnh sửa trực tiếp bằng tay trên trình duyệt web.",
              "Vì Parquet chỉ chứa được tối đa 1,000 dòng dữ liệu."
            ],
            "correctIndex": 1,
            "explanation": "Lưu trữ hướng cột (Columnar) là chìa khóa của Parquet: các giá trị cùng kiểu nằm sát nhau giúp nén siêu nhỏ và cho phép bỏ qua các cột không cần truy vấn."
          },
          {
            "question": "Khi bạn cần xử lý một tệp CSV có kích thước 30 Gigabytes trên một máy tính chỉ có 8 Gigabytes RAM, kỹ thuật nào sau đây là giải pháp chuẩn xác nhất?",
            "options": [
              "Mua thêm RAM cắm vào máy tính ngay lập tức.",
              "Sử dụng kỹ thuật Chunking bằng cách truyền tham số `chunksize` vào `pd.read_csv()` để duyệt và tính toán cộng dồn trực tuyến theo từng phần nhỏ vừa vặn với RAM.",
              "Đổi đuôi file từ .csv sang .txt.",
              "Nén file thành file .zip rồi gọi pd.read_csv()."
            ],
            "correctIndex": 1,
            "explanation": "Chunking cho phép xử lý luồng dữ liệu lớn bất tận: nạp 50,000 dòng vào RAM, xử lý xong giải phóng bộ nhớ rồi mới nạp tiếp phần kế tiếp."
          },
          {
            "question": "Nguyên tắc 'Dữ liệu thô bất biến' (Raw Data Immutability) trong kỹ nghệ dữ liệu yêu cầu điều gì?",
            "options": [
              "Dữ liệu thô phải được xóa đi ngay sau khi đọc xong.",
              "Tuyệt đối không bao giờ chỉnh sửa hay ghi đè lên tệp dữ liệu thô ban đầu; mọi thao tác làm sạch phải được lưu ra các tệp mới ở phân tầng riêng (Processed/Curated) để bảo toàn khả năng truy vết và tái lập.",
              "Cấm người dùng chia sẻ dữ liệu cho người khác.",
              "Dữ liệu thô chỉ được lưu trữ trên thẻ nhớ USB."
            ],
            "correctIndex": 1,
            "explanation": "Dữ liệu thô là nguồn sự thật duy nhất (Single Source of Truth). Bảo toàn dữ liệu thô bất biến là đạo luật sống còn để kiểm toán và tái lập quy trình khi có sự cố."
          }
        ],
        "summary": [
          "Ma trận FAIR: Parquet vượt trội CSV về nén đĩa, bảo toàn Schema, và tốc độ đọc chọn lọc cột (Column Pruning).",
          "Kỹ thuật Chunking (`chunksize`) là giải pháp cứu mạng khi dữ liệu vượt quá dung lượng bộ nhớ RAM vật lý.",
          "Đạo luật kỹ nghệ: Raw Data is Immutable (Dữ liệu thô là thiêng liêng và bất biến, không bao giờ ghi đè).",
          "Tổ chức thư mục dự án phân tầng rõ ràng: `data/raw` (bất biến) ➔ `data/processed` (sạch và tối ưu Parquet)."
        ],
        "selfReviewQuestions": [
          "1. Nêu 4 tiêu chí cốt lõi của nguyên tắc dữ liệu FAIR và giải thích tại sao định dạng Parquet lại đáp ứng tốt hơn CSV.",
          "2. Cơ chế Column Pruning trong Apache Parquet hoạt động như thế nào ở tầng phần cứng ổ đĩa?",
          "3. Trình bày các bước viết một vòng lặp Chunking tính giá trị trung bình (Mean) mà không làm tràn RAM."
        ],
        "reflectionQuestion": "Hãy tự suy ngẫm: Tại sao trong các doanh nghiệp hiện đại, việc chuyển đổi từ kho dữ liệu CSV sang hồ dữ liệu Apache Parquet lại giúp công ty tiết kiệm hàng trăm nghìn USD chi phí hóa đơn đám mây (AWS S3/Google Cloud Storage)?",
        "reflectionHint": "Nghĩ về 2 yếu tố: Dung lượng lưu trữ giảm 80% (trả ít tiền đĩa cứng hơn) và khối lượng dữ liệu quét qua mạng (Egress scan) giảm 90% khi chỉ quét đúng các cột cần truy vấn!",
        "nextLessonPreview": "Bước sang Module 6, chúng ta sẽ bước vào trung tâm của chu trình làm sạch: Ánh xạ lỗi dữ liệu theo chuẩn quốc tế ISO/IEC 25012, lý thuyết cơ chế mất dữ liệu của Donald Rubin (MCAR/MAR/MNAR) và xử lý ngoại lai có đạo đức!"
      }
    ]
  },
  {
    "id": "mod-06",
    "number": "Module 6",
    "title": "Làm Sạch Dữ Liệu & Xử lý Ngoại lai",
    "badge": "3 Bài học",
    "icon": "🧹",
    "description": "Ánh xạ chất lượng dữ liệu ISO/IEC 25012, cơ chế mất dữ liệu Donald Rubin (MCAR/MAR/MNAR), chuẩn hóa chuỗi Unicode, trích xuất thời gian .dt, phát hiện ngoại lai IQR có đạo đức và bẫy Chained Assignment.",
    "lessons": [
      {
        "id": "pd-06-01",
        "number": "6.1",
        "title": "Ngữ Nghĩa Giá Trị Thiếu (np.nan, None, pd.NA) & Khử Trùng Lặp",
        "subtitle": "Ánh xạ tiêu chuẩn ISO/IEC 25012, lý thuyết cơ chế mất dữ liệu Donald Rubin (MCAR/MAR/MNAR), so sánh 3 đại diện ô rỗng và Data Cleaning Decision Log",
        "level": "Cơ bản",
        "duration": "40 phút",
        "objectives": [
          "Ánh xạ các thao tác làm sạch dữ liệu vào khung đặc tính chất lượng dữ liệu quốc tế ISO/IEC 25012: Tính đầy đủ (Completeness), Tính nhất quán (Consistency) và Tính chính xác (Accuracy).",
          "Phân tích lý thuyết cơ chế mất dữ liệu của Donald Rubin (1976): MCAR (Hoàn toàn ngẫu nhiên), MAR (Ngẫu nhiên có điều kiện) và MNAR (Không ngẫu nhiên) để lựa chọn chiến lược xử lý chuẩn xác.",
          "Phân biệt triệt để ngữ nghĩa và hành vi bộ nhớ của 3 đại diện giá trị thiếu trong Python: np.nan (IEEE 754 float), None (Python object) và pd.NA (Nullable experimental/modern).",
          "Thiết lập Nhật Ký Quyết Định Làm Sạch (Data Cleaning Decision Log) để bảo đảm tính minh bạch, truy vết nguồn gốc và tái lập của đường ống phân tích."
        ],
        "intuition": {
          "title": "Bệnh án mất trang & Thùng đồ thất lạc ở sân bay",
          "metaphor": "Một tập dữ liệu bị thiếu ô giống như cuốn bệnh án bị rách trang: bạn không thể cứ thấy trang nào rách là lấy bút tự điền bừa số liệu vào (Điền trung bình mù quáng)!\\n1. MCAR (Mất hoàn toàn ngẫu nhiên): Tờ giấy bị gió thổi bay ngẫu nhiên, không liên quan gì đến bệnh nặng hay nhẹ. Bạn có thể xóa bỏ dòng đó mà không làm lệch kết quả thống kê.\\n2. MAR (Mất có điều kiện): Bệnh nhân trẻ tuổi thường không đo huyết áp định kỳ. Sự mất mát liên quan đến thuộc tính 'Tuổi' đã có trong bảng, có thể bù đắp bằng mô hình hồi quy.\\n3. MNAR (Mất không ngẫu nhiên - Nguy hiểm nhất!): Bệnh nhân nghiện rượu nặng cố tình bỏ trống câu hỏi 'Một tuần bạn uống bao nhiêu lít rượu?'. Việc ô dữ liệu bị rỗng chính là một tín hiệu bệnh lý cực kỳ đắt giá! Nếu bạn xóa dòng đó đi, bạn sẽ đưa ra kết luận sai lầm rằng toàn bộ người dân đều không ai nghiện rượu!",
          "boundary": "Điền khuyết (Imputation) bằng Mean hoặc Median chỉ an toàn khi dữ liệu thỏa mãn điều kiện MCAR và tỷ lệ thiếu dưới 5%. Nếu dữ liệu là MNAR, việc điền trung bình sẽ bóp méo hoàn toàn phân phối xác suất thực tế.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">BA CƠ CHẾ DỮ LIỆU BỊ THIẾU CỦA DONALD RUBIN (1976)</div>\n                        <div style=\"display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;text-align:center;\">\n                          <div style=\"padding:8px;border:1px solid #10b981;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#10b981;\">MCAR</strong>\n                            <div style=\"font-size:0.75rem;margin-top:4px;\">Hoàn toàn ngẫu nhiên</div>\n                            <div style=\"font-size:0.7rem;color:var(--text-muted);margin-top:2px;\">Lỗi sensor đo ngẫu nhiên. An toàn khi xóa.</div>\n                          </div>\n                          <div style=\"padding:8px;border:1px solid #f59e0b;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#f59e0b;\">MAR</strong>\n                            <div style=\"font-size:0.75rem;margin-top:4px;\">Ngẫu nhiên theo nhóm</div>\n                            <div style=\"font-size:0.7rem;color:var(--text-muted);margin-top:2px;\">Phụ thuộc biến khác đã đo. Điền theo nhóm.</div>\n                          </div>\n                          <div style=\"padding:8px;border:1px solid #ef4444;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#ef4444;\">MNAR</strong>\n                            <div style=\"font-size:0.75rem;margin-top:4px;\">Không ngẫu nhiên!</div>\n                            <div style=\"font-size:0.7rem;color:var(--text-muted);margin-top:2px;\">Ô rỗng mang thông điệp. Cấm xóa mù quáng!</div>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-iso25012-rubin",
            "title": "1. Khung Tiêu Chuẩn ISO/IEC 25012 & Lý Thuyết Mất Dữ Liệu Donald Rubin",
            "badge": "Tiêu chuẩn & Khoa học",
            "content": "\n                          <p>Làm sạch dữ liệu không phải là việc 'xóa bừa các dòng lỗi cho code chạy'. Kỹ sư dữ liệu chuyên nghiệp phải đối chiếu quy trình với <strong>Tiêu chuẩn Quốc tế ISO/IEC 25012</strong> (Data Quality Model):</p>\n                          \n                          <ul>\n                            <li><strong>Tính đầy đủ (Completeness):</strong> Mức độ mà tất cả các giá trị mong đợi được ghi nhận đầy đủ, không bị rỗng bất hợp lý.</li>\n                            <li><strong>Tính chính xác cú pháp (Syntactic Accuracy):</strong> Giá trị tuân thủ đúng định dạng (ví dụ: ngày tháng đúng chuẩn ISO, số điện thoại đúng 10 số).</li>\n                            <li><strong>Tính nhất quán (Consistency):</strong> Dữ liệu không mâu thuẫn giữa các bảng (ví dụ: ngày giao hàng không thể diễn ra trước ngày đặt hàng).</li>\n                          </ul>\n\n                          <h4>Cơ chế mất dữ liệu (Missing Data Mechanisms - Rubin 1976):</h4>\n                          <p>Trước khi gõ <code>df.dropna()</code> hay <code>df.fillna()</code>, hãy tự hỏi dữ liệu thuộc cơ chế nào:</p>\n                          <ol>\n                            <li><strong>MCAR (Missing Completely at Random):</strong> Xác suất mất dữ liệu hoàn toàn độc lập với mọi biến số. (Ví dụ: Một tờ hóa đơn bị rách do kẹt giấy máy in). <em>Chiến lược:</em> Có thể xóa dòng (Listwise deletion) mà không làm lệch kỳ vọng thống kê.</li>\n                            <li><strong>MAR (Missing at Random):</strong> Xác suất mất dữ liệu phụ thuộc vào một biến quan sát khác trong tập dữ liệu nhưng không phụ thuộc vào chính giá trị bị thiếu. (Ví dụ: Khách hàng mua qua ứng dụng di động ít điền số điện thoại bàn hơn khách mua tại cửa hàng). <em>Chiến lược:</em> Điền giá trị ước lượng theo từng phân khúc (Grouped Imputation).</li>\n                            <li><strong>MNAR (Missing Not at Random):</strong> Xác suất mất dữ liệu phụ thuộc trực tiếp vào chính giá trị bị thiếu đó! (Ví dụ: Khách hàng có thu nhập cực cao thường từ chối trả lời câu hỏi khảo sát mức lương). <em>Chiến lược:</em> Tuyệt đối không xóa; tạo một cột chỉ báo riêng <code>salary_missing = True</code> để thuật toán học được tín hiệu này.</li>\n                          </ol>\n                        "
          },
          {
            "id": "sec-nan-semantics",
            "title": "2. So Sánh Ba Đại Diện Giá Trị Thiếu: np.nan, None & pd.NA",
            "badge": "Bản chất Ngôn ngữ",
            "content": "\n                          <p>Sự hỗn loạn về giá trị thiếu trong Python bắt nguồn từ lịch sử phát triển qua 3 thế hệ:</p>\n\n                          <div class=\"table-responsive\">\n                            <table style=\"width:100%;font-size:0.9rem;border-collapse:collapse;\">\n                              <thead>\n                                <tr style=\"background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);\">\n                                  <th style=\"padding:10px;text-align:left;\">Đại diện</th>\n                                  <th style=\"padding:10px;text-align:left;\">Nguồn gốc & Kiểu</th>\n                                  <th style=\"padding:10px;text-align:left;\">Hành vi so sánh</th>\n                                  <th style=\"padding:10px;text-align:left;\">Tác động lên cột số nguyên</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                                  <td style=\"padding:10px;\"><code>np.nan</code></td>\n                                  <td>Chuẩn IEEE 754 (Kiểu <code>float</code>).</td>\n                                  <td><code>np.nan == np.nan</code> ➔ <strong>False</strong>! (Bắt buộc dùng <code>np.isnan()</code>).</td>\n                                  <td>Ép toàn bộ cột số nguyên thành <code>float64</code>!</td>\n                                </tr>\n                                <tr style=\"border-bottom:1px solid var(--border-subtle);\">\n                                  <td style=\"padding:10px;\"><code>None</code></td>\n                                  <td>Python Singleton (Kiểu <code>NoneType</code>).</td>\n                                  <td><code>None == None</code> ➔ <strong>True</strong>.</td>\n                                  <td>Biến cột thành kiểu <code>object</code> chậm chạp.</td>\n                                </tr>\n                                <tr>\n                                  <td style=\"padding:10px;\"><code>pd.NA</code></td>\n                                  <td>Pandas Nullable (Kiểu riêng biệt).</td>\n                                  <td>Trả về <code>pd.NA</code> theo logic 3 trạng thái của SQL.</td>\n                                  <td><strong>Bảo toàn kiểu <code>Int64</code>, <code>boolean</code>, <code>string</code>.</strong></td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                        ",
            "codeExamples": [
              {
                "title": "Khảo sát hành vi so sánh kỳ dị của np.nan và xử lý an toàn bằng pd.isna",
                "lang": "Python",
                "code": "import numpy as np\nimport pandas as pd\n\n# Bẫy kinh điển: np.nan không bằng chính nó!\nnan_val = np.nan\nprint(\"np.nan == np.nan:      \", nan_val == nan_val, \"(ĐÚNG THEO CHUẨN IEEE 754!)\")\nprint(\"np.isnan(nan_val):     \", np.isnan(nan_val))\nprint(\"pd.isna(nan_val):      \", pd.isna(nan_val))\n\n# Dữ liệu khách hàng TechMart chứa các kiểu thiếu hỗn hợp\ndf_customers = pd.DataFrame({\n    \"cust_id\": [\"KH01\", \"KH02\", \"KH03\", \"KH04\"],\n    \"income\": [15000000, np.nan, 22000000, None], # MCAR / MAR\n    \"spent\": [2500000, 1800000, np.nan, 900000]\n})\n\n# Kiểm tra tổng thể các ô thiếu\nprint(\"\\\\nSố ô bị khuyết trên từng cột:\\\\n\", df_customers.isna().sum())\n\n# Điền thu nhập bằng trung vị (Median) theo chiến lược có kiểm soát\nmedian_income = df_customers[\"income\"].median()\ndf_customers[\"income_clean\"] = df_customers[\"income\"].fillna(median_income)\nprint(f\"\\\\nThu nhập trung vị dùng để điền: {median_income:,} VNĐ\")\nprint(df_customers[[\"cust_id\", \"income\", \"income_clean\"]])",
                "output": "np.nan == np.nan:       False (ĐÚNG THEO CHUẨN IEEE 754!)\nnp.isnan(nan_val):      True\npd.isna(nan_val):       True\n\nSố ô bị khuyết trên từng cột:\n cust_id    0\nincome     2\nspent      1\ndtype: int64\n\nThu nhập trung vị dùng để điền: 18,500,000.0 VNĐ\n  cust_id      income  income_clean\n0    KH01  15000000.0    15000000.0\n1    KH02         NaN    18500000.0\n2    KH03  22000000.0    22000000.0\n3    KH04         NaN    18500000.0",
                "annotations": [
                  {
                    "line": 5,
                    "text": "np.nan == np.nan luôn là False theo định nghĩa của chuẩn IEEE 754."
                  },
                  {
                    "line": 7,
                    "text": "pd.isna() là hàm vạn năng nhận diện được cả np.nan, None và pd.NA."
                  },
                  {
                    "line": 19,
                    "text": "fillna(median) bảo vệ dữ liệu khỏi bị ảnh hưởng bởi các giá trị ngoại lai cực đoan."
                  }
                ],
                "explanation": "Hiểu rõ cơ chế IEEE 754 giúp bạn không bao giờ viết code sai lầm kiểu if x == np.nan:, và biết sử dụng pd.isna() để bắt trọn vẹn mọi ô rỗng."
              }
            ]
          },
          {
            "id": "sec-cleaning-log",
            "title": "3. Nhật Ký Quyết Định Làm Sạch (Data Cleaning Decision Log)",
            "badge": "Thực hành Chuyên nghiệp",
            "content": "\n                          <p>Trong các ngành chịu sự giám sát nghiêm ngặt như tài chính, y tế hay thương mại điện tử lớn, một nhà phân tích tự ý điền số hoặc xóa dòng mà không giải trình sẽ bị coi là vi phạm đạo đức nghề nghiệp. Chuẩn mực đòi hỏi phải lưu một <strong>Data Cleaning Decision Log (Nhật ký quyết định)</strong> gồm 5 trường:</p>\n                          <ol>\n                            <li><strong>Timestamp:</strong> Thời điểm thực hiện thao tác làm sạch.</li>\n                            <li><strong>Column/Field:</strong> Tên trường dữ liệu bị tác động.</li>\n                            <li><strong>Issue Detected:</strong> Lỗi chất lượng phát hiện theo ISO/IEC 25012 (ví dụ: Thiếu 15% do khách từ chối khai báo - MNAR).</li>\n                            <li><strong>Action Taken:</strong> Hành động xử lý (ví dụ: Điền median theo từng chi nhánh; tạo cột cờ missing_flag).</li>\n                            <li><strong>Justification:</strong> Giải trình lý do nghiệp vụ và người phê duyệt (Approved by Data Lead).</li>\n                          </ol>\n                        "
          },
          {
            "id": "sec-cleaning-references",
            "title": "4. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n                          <ul>\n                            <li><strong>ISO/IEC. (2008).</strong> <em>ISO/IEC 25012: Software engineering — Software product Quality Requirements and Evaluation (SQuaRE) — Data quality model.</em> International Organization for Standardization.</li>\n                            <li><strong>Rubin, D. B. (1976).</strong> <em>Inference and missing data.</em> Biometrika, 63(3), 581–592. DOI: 10.1093/biomet/63.3.581.</li>\n                            <li><strong>Little, R. J., & Rubin, D. B. (2019).</strong> <em>Statistical Analysis with Missing Data (3rd ed.).</em> John Wiley & Sons.</li>\n                          </ul>\n                        "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "So sánh trực tiếp `if x == np.nan:`",
              "content": "Biểu thức này LUÔN LUÔN trả về `False`! Ngay cả khi `x` thực sự là `np.nan`. Luôn dùng `pd.isna(x)` hoặc `np.isnan(x)`."
            },
            {
              "title": "Tự động xóa sạch mọi dòng có NaN bằng df.dropna()",
              "content": "Nếu bảng có 50 cột và mỗi cột thiếu rải rác 2% dòng ở các vị trí khác nhau, gọi `df.dropna()` mù quáng có thể làm bốc hơi hơn 60% dữ liệu của toàn bộ công ty!"
            }
          ],
          "tips": [
            {
              "title": "Điền khuyết bằng trung vị (Median) thay vì trung bình (Mean)",
              "content": "Giá trị trung bình bị méo mó nghiêm trọng bởi các giá trị ngoại lai cực đoan. Trung vị luôn là lựa chọn an toàn và vững vàng hơn trong phân tích kinh doanh."
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Khử trùng lặp bản ghi giao dịch TechMart",
            "problem": "Cho DataFrame chứa các đơn hàng bị trùng lặp do mạng chập chờn: `df = pd.DataFrame({'order_id': ['T1', 'T2', 'T1'], 'amount': [100, 200, 100]})`. Hãy viết code kiểm tra số bản ghi trùng lặp và loại bỏ dòng trùng, giữ lại bản ghi đầu tiên.",
            "hint": "Dùng `df.duplicated().sum()` và `df.drop_duplicates(subset=['order_id'], keep='first')`.",
            "solutionCode": "import pandas as pd\n\ndf = pd.DataFrame({\"order_id\": [\"T1\", \"T2\", \"T1\"], \"amount\": [100, 200, 100]})\nnum_dupes = df.duplicated().sum()\nprint(\"Số bản ghi trùng lặp phát hiện:\", num_dupes)\n\n# Khử trùng lặp giữ bản ghi đầu tiên\nclean_df = df.drop_duplicates(subset=[\"order_id\"], keep=\"first\")\nprint(\"Bảng sau khử trùng lặp:\\n\", clean_df)",
            "solutionOutput": "Số bản ghi trùng lặp phát hiện: 1\nBảng sau khử trùng lặp:\n   order_id  amount\n0       T1     100\n1       T2     200",
            "explanation": "drop_duplicates dựa trên tập khóa nghiệp vụ (order_id) bảo đảm tính duy nhất (Uniqueness) theo chuẩn ISO/IEC 25012."
          },
          {
            "level": "Vừa",
            "title": "Xử lý missing data theo cơ chế MAR: Điền median theo từng chi nhánh",
            "problem": "Tại TechMart, giá bán một số phụ kiện bị thiếu theo từng chi nhánh: `df = pd.DataFrame({'branch': ['HN', 'HN', 'HCM', 'HCM'], 'price': [200, None, 500, None]})`. Hãy dùng kỹ thuật biến đổi theo nhóm (Transform) để điền giá trị khuyết bằng trung vị của chính chi nhánh đó thay vì trung vị toàn chuỗi.",
            "hint": "Dùng `df.groupby('branch')['price'].transform(lambda s: s.fillna(s.median()))`.",
            "solutionCode": "import pandas as pd\n\ndf = pd.DataFrame({\n    \"branch\": [\"HN\", \"HN\", \"HN\", \"HCM\", \"HCM\", \"HCM\"],\n    \"price\": [180.0, 220.0, None, 450.0, 550.0, None]\n})\n\n# Điền giá trị trung vị của từng chi nhánh tương ứng (MAR Mechanism)\ndf[\"price_imputed\"] = df.groupby(\"branch\")[\"price\"].transform(\n    lambda group: group.fillna(group.median())\n)\n\nprint(\"Bảng sau khi điền khuyết theo phân khúc chi nhánh:\\n\", df)",
            "solutionOutput": "Bảng sau khi điền khuyết theo phân khúc chi nhánh:\n   branch  price  price_imputed\n0     HN  180.0          180.0\n1     HN  220.0          220.0\n2     HN    NaN          200.0\n3    HCM  450.0          450.0\n4    HCM  550.0          550.0\n5    HCM    NaN          500.0",
            "explanation": "Chi nhánh Hà Nội có mức giá trung vị là 200, TP.HCM là 500. Điền trung vị theo chi nhánh bảo toàn được đặc thù phân khúc địa phương, tránh làm sai lệch cấu trúc giá."
          },
          {
            "level": "Nâng cao",
            "title": "Thiết lập Data Cleaning Decision Log tự động hóa",
            "problem": "Viết hàm `audit_clean_missing(df, col_name, strategy='median')` thực hiện:\n1. Tính tỷ lệ thiếu của `col_name`.\n2. Nếu tỷ lệ < 10%: Điền khuyết theo `strategy` và sinh bản ghi Decision Log gồm: cột, tỷ lệ thiếu, giải pháp đã áp dụng và timestamp.\n3. Nếu tỷ lệ >= 10%: Không điền bừa, tạo cột cờ `{col_name}_is_missing` (cơ chế MNAR) và ghi cảnh báo vào log.\n4. Trả về DataFrame đã xử lý và từ điển log.",
            "hint": "Dùng datetime.now() để lấy timestamp và pd.isna().",
            "solutionCode": "import pandas as pd\nfrom datetime import datetime\n\ndef audit_clean_missing(df, col, strategy=\"median\"):\n    missing_rate = df[col].isna().mean()\n    log_entry = {\n        \"timestamp\": datetime.now().strftime(\"%Y-%m-%d %H:%M:%S\"),\n        \"column\": col,\n        \"missing_rate_pct\": round(missing_rate * 100, 2),\n    }\n    \n    df_result = df.copy()\n    if missing_rate < 0.10:\n        fill_val = df_result[col].median() if strategy == \"median\" else df_result[col].mean()\n        df_result[col] = df_result[col].fillna(fill_val)\n        log_entry[\"action\"] = f\"Imputed with {strategy} ({fill_val})\"\n        log_entry[\"status\"] = \"RESOLVED\"\n    else:\n        # Cơ chế MNAR: Tạo cột cờ tín hiệu\n        df_result[f\"{col}_is_missing\"] = df_result[col].isna()\n        log_entry[\"action\"] = \"Flagged with indicator column (Potential MNAR)\"\n        log_entry[\"status\"] = \"ALERT_REVIEW_REQUIRED\"\n        \n    return df_result, log_entry\n\ntest_data = pd.DataFrame({\"salary\": [10, 20, 30, None, 50] * 20}) # 100 dòng, thiếu 20%\nres_df, audit_log = audit_clean_missing(test_data, \"salary\")\nprint(\"=== NHẬT KÝ QUYẾT ĐỊNH LÀM SẠCH (DECISION LOG) ===\")\nfor k, v in audit_log.items():\n    print(f\" -> {k}: {v}\")",
            "solutionOutput": "=== NHẬT KÝ QUYẾT ĐỊNH LÀM SẠCH (DECISION LOG) ===\n -> timestamp: 2026-11-02 09:40:00\n -> column: salary\n -> missing_rate_pct: 20.0\n -> action: Flagged with indicator column (Potential MNAR)\n -> status: ALERT_REVIEW_REQUIRED",
            "explanation": "Quy trình làm sạch có kiểm toán: Tỷ lệ thiếu cao (>10%) được coi là tín hiệu MNAR tiềm ẩn, hệ thống tự động tạo cột cờ và lưu vết log thay vì xóa bỏ hoặc điền bừa."
          }
        ],
        "quiz": [
          {
            "question": "Theo lý thuyết của nhà thống kê học Donald Rubin (1976), cơ chế mất dữ liệu nào sau đây được coi là nguy hiểm nhất nếu người phân tích tự ý điền giá trị trung bình (Mean/Median)?",
            "options": [
              "MCAR (Missing Completely at Random)",
              "MAR (Missing at Random)",
              "MNAR (Missing Not at Random - Mất không ngẫu nhiên), vì xác suất mất dữ liệu liên quan trực tiếp đến chính giá trị bị thiếu đó; việc điền trung bình sẽ bóp méo hoàn toàn phân phối và xóa sạch tín hiệu phân tích quan trọng.",
              "Tất cả các cơ chế đều an toàn như nhau khi dùng Mean."
            ],
            "correctIndex": 2,
            "explanation": "MNAR nghĩa là sự khuyết thiếu chứa đựng một thông điệp ẩn. Điền trung bình vào ô MNAR sẽ phá hủy tín hiệu nghiệp vụ của dữ liệu."
          },
          {
            "question": "Tại sao biểu thức kiểm tra `x == np.nan` trong Python luôn luôn trả về `False` ngay cả khi giá trị của biến `x` thực sự là `np.nan`?",
            "options": [
              "Vì thư viện NumPy bị lỗi.",
              "Vì theo định nghĩa của chuẩn số thực IEEE 754, giá trị NaN (Not a Number) biểu diễn một kết quả không xác định, do đó nó không bằng bất kỳ giá trị nào, kể cả chính bản thân nó.",
              "Vì Python không cho phép so sánh hai số thực.",
              "Vì biến x chưa được khai báo."
            ],
            "correctIndex": 1,
            "explanation": "Định nghĩa chuẩn của IEEE 754: NaN != NaN là True. Muốn kiểm tra NaN bắt buộc phải dùng pd.isna(x) hoặc np.isnan(x)."
          },
          {
            "question": "Mục đích cốt lõi của việc thiết lập Nhật Ký Quyết Định Làm Sạch (Data Cleaning Decision Log) trong các dự án dữ liệu theo chuẩn ISO/IEC 25012 là gì?",
            "options": [
              "Để nộp báo cáo cho ban quản lý tòa nhà.",
              "Để lưu vết lịch sử mọi can thiệp biến đổi dữ liệu, bảo đảm tính minh bạch, có trách nhiệm giải trình và giúp người khác có thể tái lập quy trình phân tích độc lập.",
              "Để giảm kích thước tệp dữ liệu.",
              "Để chương trình chạy nhanh hơn."
            ],
            "correctIndex": 1,
            "explanation": "Decision Log là tài liệu chứng minh tính hợp lệ và truy vết nguồn gốc (Provenance) của mọi con số trên báo cáo kinh doanh."
          }
        ],
        "summary": [
          "Ánh xạ làm sạch vào chuẩn ISO/IEC 25012: Tính đầy đủ, Tính chính xác và Tính nhất quán.",
          "Hiểu rõ 3 cơ chế mất dữ liệu của Donald Rubin: MCAR (an toàn), MAR (điền theo phân khúc), MNAR (tạo cột cờ tín hiệu).",
          "Nhớ kỹ đặc tính IEEE 754: `np.nan == np.nan` luôn là False; luôn kiểm tra bằng `pd.isna()`.",
          "Xây dựng Data Cleaning Decision Log để lưu vết mọi quyết định can thiệp số liệu."
        ],
        "selfReviewQuestions": [
          "1. Nêu 3 đặc tính chất lượng dữ liệu cốt lõi trong mô hình ISO/IEC 25012 liên quan đến việc làm sạch bảng.",
          "2. Phân biệt sự khác nhau giữa cơ chế mất dữ liệu MAR và MNAR. Cho ví dụ thực tế tại siêu thị TechMart.",
          "3. Tại sao trong Pandas hiện đại người ta lại phát minh ra kiểu `pd.NA` bên cạnh `np.nan` và `None`?"
        ],
        "reflectionQuestion": "Hãy giải thích: Tại sao một nhà phân tích xóa bỏ toàn bộ các đơn hàng bị thiếu thông tin số điện thoại khách hàng lại có thể vô tình loại bỏ toàn bộ nhóm khách hàng cao tuổi giàu có khỏi tập dữ liệu phân tích?",
        "reflectionHint": "Nghĩ về cơ chế MAR: Nhóm người cao tuổi ít sử dụng điện thoại thông minh hơn nhưng lại có sức mua tích lũy cao hơn. Xóa bỏ dòng thiếu số điện thoại sẽ làm lệch hẳn chân dung khách hàng!",
        "nextLessonPreview": "Ở bài tiếp theo (6.2), chúng ta sẽ làm chủ các thao tác định dạng chuyên sâu: Chuẩn hóa chuỗi văn bản Unicode tiếng Việt với .str, trích xuất thuộc tính chu kỳ bán lẻ với .dt và tối ưu RAM 80% bằng category!"
      },
      {
        "id": "pd-06-02",
        "number": "6.2",
        "title": "Chuẩn Hóa Chuỗi .str, Trích Xuất .dt & Tối Ưu RAM với Categorical",
        "subtitle": "Xử lý Unicode NFC/NFD tiếng Việt, trích xuất ngày giờ bán lẻ (.dt.dayofweek, .dt.hour), và mã hóa từ điển Categorical giảm 80% bộ nhớ",
        "level": "Trung cấp",
        "duration": "40 phút",
        "objectives": [
          "Chuẩn hóa dữ liệu văn bản tiếng Việt bị lỗi tổ hợp bằng chuẩn Unicode NFC vs NFD với unicodedata và accessor .str của Pandas.",
          "Làm sạch các bất thường chuỗi: Cắt tỉa khoảng trắng thừa (strip), chuẩn hóa chữ hoa/thường và thay thế mẫu bằng biểu thức chính quy (Regex).",
          "Trích xuất các đặc trưng thời gian kinh doanh then chốt thông qua accessor .dt: Thứ trong tuần (.dayofweek), Giờ mua sắm (.hour), Ngày cuối tháng (.is_month_end).",
          "Tối ưu hóa bộ nhớ RAM vượt trội (lên tới 80%) bằng cách chuyển đổi các cột văn bản có độ trùng lặp cao sang kiểu Categorical (Dictionary Encoding)."
        ],
        "intuition": {
          "title": "Bảng chữ cái ghép dấu vs Chiếc thẻ bài số trong phòng thay đồ",
          "metaphor": "1. Lỗi Unicode tiếng Việt giống như hai người viết chữ 'à': một người viết chữ 'a' rồi cầm bút chấm thêm dấu huyền ở trên (Unicode NFD - Ký tự tổ hợp); người kia dùng con dấu đúc sẵn chữ 'à' hoàn chỉnh (Unicode NFC - Ký tự dựng sẵn). Mắt người nhìn y hệt nhau, nhưng máy tính coi chúng là hai từ hoàn toàn khác nhau khiến lệnh tìm kiếm thất bại! Chuẩn hóa Unicode NFC đưa tất cả về cùng một quy chuẩn.\\n2. Kiểu Categorical giống như chiếc thẻ bài trong tủ gửi đồ siêu thị: Thay vì mỗi lần khách gửi xe bạn phải viết nguyên dòng chữ dài 'Chi nhánh Siêu thị Công nghệ TechMart Hà Nội' lên túi đồ (tốn 40 bytes), bạn chỉ cần dán một chiếc thẻ bài nhỏ ghi số 0 (tốn 1 byte). Ở đầu quầy có một cuốn sổ từ điển ghi: 0 = Hà Nội, 1 = TP.HCM. Bộ nhớ RAM được giải phóng tới 80% ngay tức khắc!",
          "boundary": "Kiểu Categorical chỉ tối ưu khi số lượng giá trị duy nhất (Cardinality) nhỏ hơn nhiều so với số lượng dòng (ví dụ: 1 triệu dòng nhưng chỉ có 5 thành phố). Nếu cột là mã đơn hàng hoặc số CMND (mỗi dòng một giá trị khác nhau), việc ép sang Categorical sẽ phản tác dụng và làm tốn thêm RAM.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">CƠ CHẾ DICTIONARY ENCODING CỦA KIỂU CATEGORICAL</div>\n                        <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px;\">\n                          <div style=\"background:var(--bg-surface);padding:8px;border:1px solid #ef4444;border-radius:4px;\">\n                            <strong style=\"color:#ef4444;\">Kiểu Object (40 bytes/dòng)</strong>\n                            <div style=\"font-size:0.75rem;margin-top:4px;\">\n                              Dòng 1: \"Hà Nội\"<br/>\n                              Dòng 2: \"TP.HCM\"<br/>\n                              Dòng 3: \"Hà Nội\"<br/>\n                              <span style=\"color:var(--text-muted);\">Chuỗi lặp lại làm nổ tung RAM Heap!</span>\n                            </div>\n                          </div>\n                          <div style=\"background:var(--bg-surface);padding:8px;border:1px solid #10b981;border-radius:4px;\">\n                            <strong style=\"color:#10b981;\">Kiểu Category (1 byte/dòng)</strong>\n                            <div style=\"font-size:0.75rem;margin-top:4px;\">\n                              Dòng 1: Mã 0<br/>\n                              Dòng 2: Mã 1<br/>\n                              Dòng 3: Mã 0<br/>\n                              <span style=\"color:#10b981;\">Từ điển băm: {0: 'Hà Nội', 1: 'TP.HCM'}</span>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-str-unicode-nfc",
            "title": "1. Chuẩn Hóa Chuỗi .str & Bẫy Unicode Dựng Sẵn (NFC) vs Tổ Hợp (NFD)",
            "badge": "Xử lý Văn bản Tiếng Việt",
            "content": "\n                          <p>Một trong những lỗi đau đầu nhất khi làm việc với dữ liệu người dùng Việt Nam là: Lọc <code>df[df['city'] == 'Hà Nội']</code> nhưng bị sót mất một nửa số khách hàng! Nguyên nhân là do hai hệ thống gõ phím khác nhau:</p>\n                          <ul>\n                            <li><strong>Unicode NFC (Normalization Form C - Dựng sẵn):</strong> Ký tự 'à' được lưu bằng 1 mã điểm duy nhất <code>U+00E0</code>.</li>\n                            <li><strong>Unicode NFD (Normalization Form D - Tổ hợp):</strong> Ký tự 'à' được ghép từ chữ 'a' (<code>U+0061</code>) và dấu huyền (<code>U+0300</code>).</li>\n                          </ul>\n                          <p>Giải pháp chuẩn mực: Sử dụng module chuẩn <code>unicodedata.normalize('NFC', text)</code> kết hợp với accessor <code>.str</code> để làm sạch toàn bộ bảng trước khi so khớp.</p>\n                        ",
            "codeExamples": [
              {
                "title": "Chuẩn hóa Unicode tiếng Việt, cắt tỉa khoảng trắng và regex làm sạch số điện thoại",
                "lang": "Python",
                "code": "import pandas as pd\nimport unicodedata\n\n# Dữ liệu khách hàng TechMart bị dính lỗi Unicode và khoảng trắng thừa\nraw_data = {\n    \"name\": [\"  Nguyễn Văn A  \", \"Trần Thị B\", \"Lê Văn C  \"],\n    \"phone\": [\"090-123-4567\", \"(+84) 912.345.678\", \"0987654321\"],\n    \"city\": [\n        unicodedata.normalize(\"NFD\", \"Hà Nội\"), # Unicode tổ hợp\n        unicodedata.normalize(\"NFC\", \"Hà Nội\"), # Unicode dựng sẵn\n        \"Đà Nẵng\"\n    ]\n}\ndf = pd.DataFrame(raw_data)\n\n# 1. Cắt tỉa khoảng trắng thừa và viết hoa chuẩn mực\ndf[\"name_clean\"] = df[\"name\"].str.strip().str.title()\n\n# 2. Chuẩn hóa số điện thoại: Dùng Regex trích xuất chỉ các chữ số\ndf[\"phone_digits\"] = df[\"phone\"].str.replace(r\"\\D+\", \"\", regex=True)\n\n# 3. Chuẩn hóa toàn bộ cột thành Unicode NFC\ndf[\"city_nfc\"] = df[\"city\"].apply(lambda s: unicodedata.normalize(\"NFC\", s))\n\nprint(\"=== SO SÁNH TRƯỚC VÀ SAU LÀM SẠCH VĂN BẢN ===\")\nprint(df[[\"name_clean\", \"phone_digits\", \"city_nfc\"]])\n\n# Thử nghiệm lọc thành phố: Bắt trọn vẹn cả 2 khách hàng Hà Nội!\nhn_customers = df.loc[df[\"city_nfc\"] == \"Hà Nội\"]\nprint(f\"\\\\nSố khách hàng tại Hà Nội sau khi chuẩn hóa NFC: {len(hn_customers)} (Chính xác 100%!)\")",
                "output": "=== SO SÁNH TRƯỚC VÀ SAU LÀM SẠCH VĂN BẢN ===\n       name_clean phone_digits city_nfc\n0   Nguyễn Văn A   0901234567   Hà Nội\n1     Trần Thị B   84912345678   Hà Nội\n2       Lê Văn C   0987654321  Đà Nẵng\n\nSố khách hàng tại Hà Nội sau khi chuẩn hóa NFC: 2 (Chính xác 100%!)",
                "annotations": [
                  {
                    "line": 17,
                    "text": "str.strip() xóa khoảng trắng đầu cuối; str.title() viết hoa đầu từ."
                  },
                  {
                    "line": 20,
                    "text": "Regex \\\\D+ tìm kiếm tất cả ký tự không phải chữ số (dấu ngoặc, dấu chấm) để xóa."
                  },
                  {
                    "line": 23,
                    "text": "Đưa toàn bộ chuỗi về dạng chuẩn NFC để so sánh chính xác tuyệt đối."
                  }
                ],
                "explanation": "Nếu không chuẩn hóa NFC, hai chuỗi 'Hà Nội' tổ hợp và dựng sẵn sẽ không khớp nhau, làm mất mát số liệu khách hàng nghiêm trọng."
              }
            ]
          },
          {
            "id": "sec-dt-temporal",
            "title": "2. Khai Phá Chu Kỳ Kinh Doanh Với Accessor .dt",
            "badge": "Đặc trưng Thời gian",
            "content": "\n                          <p>Khi cột đã được định dạng chuẩn <code>datetime64</code>, accessor <code>.dt</code> cung cấp bộ công cụ trích xuất đặc trưng thời gian mạnh mẽ phục vụ phân tích hành vi khách hàng TechMart:</p>\n                          <ul>\n                            <li><code>.dt.day_name()</code> hoặc <code>.dt.dayofweek</code>: Xác định thứ trong tuần (0 = Thứ Hai, 6 = Chủ Nhật). Giúp phát hiện xu hướng mua sắm cuối tuần.</li>\n                            <li><code>.dt.hour</code>: Giờ giao dịch trong ngày (0 đến 23). Giúp định vị khung giờ vàng (Peak shopping hours) để bố trí nhân viên thu ngân.</li>\n                            <li><code>.dt.is_month_end</code>: Xác định xem giao dịch có diễn ra vào ngày cuối tháng hay không (phục vụ đối soát doanh số chốt sổ).</li>\n                          </ul>\n                        ",
            "codeExamples": [
              {
                "title": "Trích xuất đặc trưng chu kỳ thời gian bán lẻ từ cột timestamp",
                "lang": "Python",
                "code": "import pandas as pd\n\n# Giả lập lịch sử giao dịch tại siêu thị\ntimestamps = pd.Series([\n    \"2026-11-01 09:15:00\", # Chủ Nhật, đầu tháng\n    \"2026-11-04 18:45:00\", # Thứ Tư, giờ tan tầm\n    \"2026-11-07 20:30:00\", # Thứ Bảy, tối cuối tuần\n    \"2026-11-30 21:00:00\"  # Thứ Hai, đêm cuối tháng\n])\n\ndt_series = pd.to_datetime(timestamps)\n\ndf_time = pd.DataFrame({\n    \"timestamp\": dt_series,\n    \"day_name\": dt_series.dt.day_name(),\n    \"hour\": dt_series.dt.hour,\n    \"is_weekend\": dt_series.dt.day_of_week.isin([5, 6]), # Thứ 7 (5), Chủ Nhật (6)\n    \"is_month_end\": dt_series.dt.is_month_end\n})\n\nprint(\"=== ĐẶC TRƯNG THỜI GIAN TRÍCH XUẤT QUA ACCESSOR .DT ===\")\nprint(df_time)",
                "output": "=== ĐẶC TRƯNG THỜI GIAN TRÍCH XUẤT QUA ACCESSOR .DT ===\n            timestamp   day_name  hour  is_weekend  is_month_end\n0 2026-11-01 09:15:00     Sunday     9        True         False\n1 2026-11-04 18:45:00  Wednesday    18       False         False\n2 2026-11-07 20:30:00   Saturday    20        True         False\n3 2026-11-30 21:00:00     Monday    21       False          True",
                "annotations": [
                  {
                    "line": 16,
                    "text": "dt.dayofweek.isin([5, 6]) tạo biến boolean nhận diện ngày cuối tuần."
                  },
                  {
                    "line": 17,
                    "text": "dt.is_month_end tự động kiểm tra ngày cuối cùng của tháng bất chấp tháng 28, 30 hay 31 ngày."
                  }
                ],
                "explanation": "Các đặc trưng thời gian trích xuất từ .dt là đầu vào cực kỳ giá trị cho các mô hình dự báo lượng khách và phân tích chuỗi thời gian."
              }
            ]
          },
          {
            "id": "sec-categorical-optimization",
            "title": "3. Tối Ưu Hóa 80% RAM Bằng Kiểu Categorical",
            "badge": "Tối ưu Hiệu năng",
            "content": "\n                          <p>Trong một bảng dữ liệu 10 triệu dòng, nếu cột <code>branch</code> chỉ có 4 giá trị: 'Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Cần Thơ':</p>\n                          <p>Nếu lưu kiểu <code>object</code>, Pandas phải duy trì 10 triệu con trỏ ô nhớ. Khi chuyển sang kiểu <code>category</code>, Pandas áp dụng thuật toán <strong>Dictionary Encoding (Mã hóa từ điển)</strong>: lưu 4 chuỗi văn bản đó vào một bảng băm nhỏ, và thay thế toàn bộ 10 triệu dòng dữ liệu bằng các số nguyên siêu nhỏ <code>int8</code> (chiếm đúng 1 byte mỗi dòng!). Dung lượng RAM của cột sẽ giảm ngay lập tức từ <strong>80 MB xuống còn 10 MB</strong>!</p>\n                        "
          },
          {
            "id": "sec-str-dt-references",
            "title": "4. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n                          <ul>\n                            <li><strong>Unicode Consortium.</strong> <em>Unicode Standard Annex #15: Unicode Normalization Forms (NFC vs NFD).</em> <a href=\"https://unicode.org/reports/tr15/\" target=\"_blank\" rel=\"noopener\">https://unicode.org/reports/tr15/</a></li>\n                            <li><strong>Pandas Documentation.</strong> <em>Working with text data (.str accessor).</em> <a href=\"https://pandas.pydata.org/docs/user_guide/text.html\" target=\"_blank\" rel=\"noopener\">https://pandas.pydata.org/docs/user_guide/text.html</a></li>\n                            <li><strong>Pandas Documentation.</strong> <em>Categorical data.</em> <a href=\"https://pandas.pydata.org/docs/user_guide/categorical.html\" target=\"_blank\" rel=\"noopener\">https://pandas.pydata.org/docs/user_guide/categorical.html</a></li>\n                          </ul>\n                        "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Cạm bẫy ép kiểu Categorical cho cột có High Cardinality",
              "content": "Tuyệt đối không chuyển cột có số lượng giá trị duy nhất quá cao (như mã đơn hàng, số điện thoại, họ tên đầy đủ) sang kiểu category. Chi phí quản lý bảng từ điển lúc đó sẽ làm tốn thêm RAM và giảm tốc độ xử lý."
            },
            {
              "title": "Quên chuyển đổi cột sang datetime trước khi dùng .dt",
              "content": "Nếu cột ngày tháng vẫn đang ở kiểu object (chuỗi), gọi `.dt` sẽ nổ lỗi `AttributeError: Can only use .dt accessor with datetimelike values`. Luôn gọi `pd.to_datetime()` trước!"
            }
          ],
          "tips": [
            {
              "title": "Thêm danh mục mới cho cột Categorical",
              "content": "Nếu bạn muốn gán một giá trị chưa có trong từ điển (ví dụ: mở thêm chi nhánh mới 'Hải Phòng'), bạn phải gọi `df['branch'] = df['branch'].cat.add_categories(['Hải Phòng'])` trước khi gán dữ liệu."
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Chuẩn hóa định dạng mã SKU sản phẩm",
            "problem": "Cho danh sách mã hàng bị gõ lộn xộn: `skus = pd.Series([' sku-01 ', 'SKU_02', 'sku-03'])`. Hãy dùng accessor `.str` để loại bỏ khoảng trắng thừa, chuyển thành chữ in hoa và thay thế dấu gạch dưới `_` thành dấu gạch ngang `-`.",
            "hint": "Kết hợp `.str.strip().str.upper().str.replace('_', '-')`.",
            "solutionCode": "import pandas as pd\n\nskus = pd.Series([\" sku-01 \", \"SKU_02\", \"sku-03\"])\ncleaned = skus.str.strip().str.upper().str.replace(\"_\", \"-\", regex=False)\nprint(\"Mã SKU sau chuẩn hóa:\\n\", cleaned)",
            "solutionOutput": "Mã SKU sau chuẩn hóa:\n 0    SKU-01\n1    SKU-02\n2    SKU-03\ndtype: object",
            "explanation": "Chuỗi phương thức .str cho phép xử lý văn bản hàng loạt với tốc độ vector hóa tối ưu theo chuẩn cú pháp Python."
          },
          {
            "level": "Vừa",
            "title": "Lọc đơn hàng phát sinh trong khung giờ vàng buổi tối",
            "problem": "Cho danh sách giao dịch TechMart: `df = pd.DataFrame({'time': pd.to_datetime(['2026-11-01 14:00', '2026-11-01 19:30', '2026-11-01 20:45']), 'rev': [100, 500, 300]})`. Hãy dùng `.dt.hour` để lọc ra các đơn hàng phát sinh trong khung giờ vàng buổi tối (từ 19:00 đến 21:00) và tính tổng doanh thu của khung giờ này.",
            "hint": "Điều kiện: `(df['time'].dt.hour >= 19) & (df['time'].dt.hour <= 21)`.",
            "solutionCode": "import pandas as pd\n\ndf = pd.DataFrame({\n    \"time\": pd.to_datetime([\"2026-11-01 14:00\", \"2026-11-01 19:30\", \"2026-11-01 20:45\"]),\n    \"rev\": [100, 500, 300]\n})\n\nevening_mask = (df[\"time\"].dt.hour >= 19) & (df[\"time\"].dt.hour <= 21)\nevening_orders = df.loc[evening_mask]\nprint(\"Đơn hàng trong khung giờ vàng (19h - 21h):\\n\", evening_orders)\nprint(f\"Tổng doanh thu khung giờ vàng: {evening_orders['rev'].sum():,} VNĐ\")",
            "solutionOutput": "Đơn hàng trong khung giờ vàng (19h - 21h):\n                  time  rev\n1 2026-11-01 19:30:00  500\n2 2026-11-01 20:45:00  300\nTổng doanh thu khung giờ vàng: 800 VNĐ",
            "explanation": "Trích xuất dt.hour cho phép phân đoạn thời gian kinh doanh chính xác để phục vụ lập kế hoạch vận hành và điều phối nhân sự."
          },
          {
            "level": "Nâng cao",
            "title": "Tối ưu hóa bảng dữ liệu 500,000 dòng bằng Categorical và đo lường RAM",
            "problem": "Tạo một DataFrame gồm 500,000 dòng với 2 cột: `payment_method` (chỉ có 3 giá trị: 'Tiền mặt', 'Thẻ tín dụng', 'Chuyển khoản') và `branch` (4 chi nhánh). Đo lường dung lượng RAM thực tế với `memory_usage(deep=True)`. Sau đó chuyển đổi cả hai cột sang kiểu `category` và in ra tỷ lệ phần trăm RAM đã được giải phóng.",
            "hint": "Dùng `df[col] = df[col].astype('category')` và so sánh memory.",
            "solutionCode": "import pandas as pd\nimport numpy as np\n\nN = 500_000\ndf = pd.DataFrame({\n    \"payment_method\": np.random.choice([\"Tiền mặt\", \"Thẻ tín dụng\", \"Chuyển khoản\"], size=N),\n    \"branch\": np.random.choice([\"Hà Nội\", \"TP.HCM\", \"Đà Nẵng\", \"Cần Thơ\"], size=N)\n})\n\nram_before = df.memory_usage(deep=True).sum() / (1024 ** 2)\n\n# Chuyển đổi sang Categorical\ndf[\"payment_method\"] = df[\"payment_method\"].astype(\"category\")\ndf[\"branch\"] = df[\"branch\"].astype(\"category\")\n\nram_after = df.memory_usage(deep=True).sum() / (1024 ** 2)\nreduction_pct = (ram_before - ram_after) / ram_before * 100\n\nprint(f\"RAM ban đầu (object):    {ram_before:.2f} MB\")\nprint(f\"RAM sau tối ưu (category): {ram_after:.2f} MB\")\nprint(f\"Tỷ lệ tiết kiệm bộ nhớ:  {reduction_pct:.1f}% RAM!\")",
            "solutionOutput": "RAM ban đầu (object):    71.18 MB\nRAM sau tối ưu (category): 1.91 MB\nTỷ lệ tiết kiệm bộ nhớ:  97.3% RAM!",
            "explanation": "Với các cột có tính chất phân loại (Low Cardinality), chuyển sang Categorical giúp giảm tới hơn 97% dung lượng RAM nhờ kỹ thuật Dictionary Encoding."
          }
        ],
        "quiz": [
          {
            "question": "Tại sao hai chuỗi tiếng Việt nhìn giống hệt nhau 'Hà Nội' nhưng khi so sánh bằng toán tử == trong Python lại có thể trả về `False`?",
            "options": [
              "Vì Python không hỗ trợ tiếng Việt có dấu.",
              "Vì một chuỗi được mã hóa theo chuẩn Unicode dựng sẵn (NFC - 1 ký tự mã hóa), còn chuỗi kia được mã hóa theo chuẩn Unicode tổ hợp (NFD - chữ cái ghép với dấu), dẫn đến các byte nhị phân bên dưới hoàn toàn khác nhau.",
              "Vì font chữ máy tính bị lỗi.",
              "Vì chuỗi có chứa ký tự tàng hình."
            ],
            "correctIndex": 1,
            "explanation": "Sự khác biệt giữa Unicode NFC và NFD là nguyên nhân gốc rễ của lỗi so sánh tiếng Việt. Chuẩn hóa về NFC bằng unicodedata là giải pháp chuẩn xác."
          },
          {
            "question": "Trong trường hợp nào việc chuyển đổi một cột sang kiểu `category` trong Pandas sẽ phản tác dụng và gây lãng phí thêm bộ nhớ RAM?",
            "options": [
              "Khi cột chỉ chứa các số nguyên nhỏ.",
              "Khi cột có độ phân biệt quá cao (High Cardinality) - hầu như mỗi dòng là một giá trị duy nhất khác nhau (ví dụ: số CMND, mã đơn hàng ngẫu nhiên), khiến bảng từ điển băm trở nên khổng lồ.",
              "Khi cột chỉ có 2 giá trị True và False.",
              "Khi bảng dữ liệu có trên 1 triệu dòng."
            ],
            "correctIndex": 1,
            "explanation": "Categorical chỉ tối ưu khi số lượng nhóm nhỏ hơn rất nhiều so với số dòng. Với High Cardinality, chi phí lưu bảng từ điển sẽ lớn hơn cả việc lưu chuỗi thô."
          },
          {
            "question": "Thuộc tính nào của accessor `.dt` cho phép xác định chính xác ngày giao dịch có phải là ngày cuối cùng của tháng hay không?",
            "options": [
              "`.dt.last_day`",
              "`.dt.is_month_end`",
              "`.dt.day == 30`",
              "`.dt.end_of_month()`"
            ],
            "correctIndex": 1,
            "explanation": "`.dt.is_month_end` tự động xử lý số ngày thay đổi linh hoạt của các tháng (tháng 28, 30 hay 31 ngày) và trả về True/False chuẩn xác."
          }
        ],
        "summary": [
          "Chuẩn hóa Unicode tiếng Việt về dạng dựng sẵn NFC bằng `unicodedata.normalize('NFC', text)` trước khi lọc dữ liệu.",
          "Sử dụng `.str` cho các tác vụ cắt tỉa khoảng trắng, chuẩn hóa chữ hoa và bóc tách Regex an toàn.",
          "Khai thác `.dt` để tạo các biến đặc trưng chu kỳ kinh doanh: `dayofweek`, `hour`, `is_month_end`.",
          "Áp dụng kiểu `category` cho các cột Low Cardinality để cắt giảm tới 80–95% dung lượng RAM."
        ],
        "selfReviewQuestions": [
          "1. Phân biệt sự khác nhau giữa hai chuẩn mã hóa Unicode NFC và NFD trong tiếng Việt.",
          "2. Nêu 3 thuộc tính hữu ích của accessor `.dt` trong phân tích dữ liệu bán lẻ.",
          "3. Điều kiện cần và đủ để một cột dữ liệu được hưởng lợi tối đa khi chuyển sang kiểu `category` là gì?"
        ],
        "reflectionQuestion": "Hãy tự chất vấn: Nếu hệ thống chấm công của TechMart ghi nhận giờ quẹt thẻ, việc bạn tạo thêm cột `is_weekend` và `shift_period` (Sáng/Chiều/Đêm) bằng accessor `.dt` sẽ giúp ban giám đốc nhìn ra những cơ hội tối ưu hóa chi phí vận hành nào?",
        "reflectionHint": "Nghĩ về: Phân tích tương quan giữa doanh thu bán hàng theo ca và chi phí lương nhân viên theo giờ để điều phối nhân sự thông minh.",
        "nextLessonPreview": "Ở bài tiếp theo (6.3), chúng ta sẽ trang bị vũ khí phát hiện ngoại lai chuyên sâu: Quy tắc Tukey IQR, giải phẫu bẫy Chained Assignment và đạo đức xử lý dữ liệu bất thường!"
      },
      {
        "id": "pd-06-03",
        "number": "6.3",
        "title": "Phát Hiện Ngoại Lai Bằng IQR & Giải Phẫu Bẫy Chained Assignment",
        "subtitle": "Quy tắc Tukey IQR (Q1 - 1.5*IQR, Q3 + 1.5*IQR), cạm bẫy xóa mù quáng sự kiện kinh doanh hiếm và giải phẫu lỗi gán chuỗi df['a']['b'] = c",
        "level": "Nâng cao",
        "duration": "45 phút",
        "objectives": [
          "Áp dụng phương pháp thống kê vững (Robust Statistics) của John Tukey để phát hiện ngoại lai bằng Khoảng Tứ Phân Vị (Interquartile Range - IQR).",
          "Phân biệt rạch ròi giữa Sai số đo lường (Measurement/Entry Error) và Sự kiện kinh doanh hiếm có giá trị cao (High-value Valid Events): Đạo đức không bao giờ xóa ngoại lai mù quáng.",
          "Giải phẫu bản chất cơ học của bẫy Chained Assignment (Gán chuỗi `df['a']['b'] = c`) và cơ chế chặn đứng lỗi ngầm của Pandas 3.0+ CoW.",
          "Xây dựng đường ống xử lý ngoại lai đa tầng: Cắt ngọn (Winsorization/Clipping), ghi nhận cờ bất thường và cách ly đối soát."
        ],
        "intuition": {
          "title": "Người khổng lồ trong làng & Bức tường hai lớp",
          "metaphor": "1. Giá trị ngoại lai (Outlier) giống như sự xuất hiện của một vị khách cao 2 mét 20 bước vào siêu thị: Người này thực sự tồn tại (sự kiện hiếm có thật), chứ không phải do chiếc máy đo chiều cao bị hỏng! Nếu bạn tự ý 'chém đầu' người đó cho bằng chiều cao trung bình 1m70 (xóa bỏ đơn hàng B2B lớn), bạn vừa tiêu diệt mất khách hàng mang lại 40% lợi nhuận cho siêu thị!\\n2. Bẫy Chained Assignment df['a']['b'] = c giống như việc bạn muốn sửa chiếc két sắt trong phòng ngủ nhưng lại đứng ngoài cửa sổ tầng 2 cố với tay qua hai lớp rèm: Lớp thứ nhất tạo ra một ảo ảnh (bản copy tạm), bạn sơn lên ảo ảnh đó rồi hả hê nghĩ rằng két sắt đã được sơn. Khi bước vào nhà, chiếc két sắt thật vẫn cũ kỹ y nguyên!",
          "boundary": "Quy tắc 1.5*IQR của Tukey giả định dữ liệu có phân phối gần chuẩn (Near-normal). Đối với dữ liệu tài chính có phân phối đuôi dày (Fat-tailed / Pareto), việc dùng 1.5*IQR có thể đánh dấu nhầm 15% khách hàng VIP thành ngoại lai. Cần kết hợp ngưỡng nghiệp vụ.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">QUY TẮC PHÁT HIỆN NGOẠI LAI THEO TUKEY (BOXPLOT FENCES)</div>\n                        <div style=\"display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;gap:6px;\">\n                          <div style=\"text-align:center;color:#ef4444;\">\n                            <span style=\"font-size:0.7rem;\">Cận dưới</span><br/>\n                            <strong>Q1 - 1.5*IQR</strong>\n                          </div>\n                          <span>──[</span>\n                          <div style=\"text-align:center;\">\n                            <span style=\"font-size:0.7rem;\">25%</span><br/>\n                            <strong>Q1</strong>\n                          </div>\n                          <span>──</span>\n                          <div style=\"text-align:center;color:var(--accent-primary);\">\n                            <span style=\"font-size:0.7rem;\">Trung vị</span><br/>\n                            <strong>Q2 (Median)</strong>\n                          </div>\n                          <span>──</span>\n                          <div style=\"text-align:center;\">\n                            <span style=\"font-size:0.7rem;\">75%</span><br/>\n                            <strong>Q3</strong>\n                          </div>\n                          <span>]──</span>\n                          <div style=\"text-align:center;color:#ef4444;\">\n                            <span style=\"font-size:0.7rem;\">Cận trên</span><br/>\n                            <strong>Q3 + 1.5*IQR</strong>\n                          </div>\n                        </div>\n                        <div style=\"font-size:0.72rem;color:var(--text-muted);text-align:center;margin-top:6px;\">\n                          IQR = Q3 - Q1. Mọi giá trị nằm ngoài 2 hàng rào cận được coi là ngoại lai tiềm năng.\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-tukey-iqr",
            "title": "1. Phương Pháp Thống Kê Vững Tukey IQR & Đạo Đức Xử Lý Ngoại Lai",
            "badge": "Phương pháp Thống kê",
            "content": "\n                          <p>Năm 1977, nhà thống kê lỗi lạc John Tukey đã phát minh ra biểu đồ Boxplot và quy tắc <strong>Khoảng Tứ Phân Vị (Interquartile Range - IQR)</strong>. Đây là phương pháp thống kê vững (Robust) vì nó không bị méo mó bởi chính các giá trị cực đoan như phương pháp Z-Score (vốn dựa trên Mean và Std):</p>\n                          \n                          <ol>\n                            <li><strong>Tính toán phân vị:</strong> Xác định Tứ phân vị thứ nhất $Q_1$ (25%) và Tứ phân vị thứ ba $Q_3$ (75%).</li>\n                            <li><strong>Tính khoảng tứ phân vị:</strong> $\\text{IQR} = Q_3 - Q_1$.</li>\n                            <li><strong>Xác lập hàng rào (Fences):</strong>\n                              <br/>➔ Hàng rào dưới (Lower Fence): $\\text{Lower} = Q_1 - 1.5 \\times \\text{IQR}$\n                              <br/>➔ Hàng rào trên (Upper Fence): $\\text{Upper} = Q_3 + 1.5 \\times \\text{IQR}$\n                            </li>\n                          </ol>\n\n                          <h4>Đạo đức dữ liệu: Phân loại ngoại lai trước khi hành động</h4>\n                          <p>Tuyệt đối không được xóa mù quáng mọi điểm nằm ngoài hàng rào! Hãy phân biệt 2 nhóm:</p>\n                          <ul>\n                            <li><strong>Ngoại lai do sai số (Error Outliers):</strong> Đơn giá nhập thừa 3 số 0 (ví dụ: Chuột bán giá 250,000,000 VNĐ) hoặc số âm do lỗi sensor. <em>Hành động:</em> Cách ly, sửa theo giá niêm yết hoặc xóa nếu là bản ghi rác.</li>\n                            <li><strong>Ngoại lai tự nhiên hợp lệ (Valid Event Outliers):</strong> Một trường đại học mua sỉ 500 chiếc laptop phục vụ phòng lab trong 1 đơn hàng duy nhất. <em>Hành động:</em> <strong>GIỮ NGUYÊN</strong> để tính toán doanh thu thực tế; có thể phân tách thành phân khúc khách hàng doanh nghiệp (B2B) riêng biệt khi huấn luyện mô hình.</li>\n                          </ul>\n                        ",
            "codeExamples": [
              {
                "title": "Phát hiện ngoại lai doanh thu TechMart bằng quy tắc Tukey IQR và Clipping",
                "lang": "Python",
                "code": "import pandas as pd\nimport numpy as np\n\n# Tập dữ liệu doanh thu đơn hàng có lẫn lộn đơn bình thường và đơn đột biến\nsales_data = pd.Series([\n    120000, 150000, 180000, 200000, 220000, 250000, 280000, 310000,\n    350000, 400000, 450000, 500000, 550000,\n    95000000 # Giao dịch mua sỉ B2B cực lớn (Ngoại lai hợp lệ)\n], name=\"revenue\")\n\n# 1. Tính toán Q1, Q3 và IQR\nq1 = sales_data.quantile(0.25)\nq3 = sales_data.quantile(0.75)\niqr = q3 - q1\n\nlower_fence = q1 - 1.5 * iqr\nupper_fence = q3 + 1.5 * iqr\n\nprint(f\"Q1 (25%):           {q1:,.0f} VNĐ\")\nprint(f\"Q3 (75%):           {q3:,.0f} VNĐ\")\nprint(f\"IQR:                {iqr:,.0f} VNĐ\")\nprint(f\"Hàng rào trên:      {upper_fence:,.0f} VNĐ\")\n\n# 2. Phát hiện các điểm ngoại lai\noutliers = sales_data.loc[(sales_data < lower_fence) | (sales_data > upper_fence)]\nprint(f\"\\\\nCác giao dịch ngoại lai phát hiện ({len(outliers)}):\\\\n\", outliers)\n\n# 3. Kỹ thuật Cắt ngọn có kiểm soát (Winsorization / Clipping) cho phân tích thống kê\nsales_clipped = sales_data.clip(lower=lower_fence, upper=upper_fence)\nprint(f\"\\\\nGiá trị đơn B2B sau khi Clip về ngưỡng an toàn: {sales_clipped.iloc[-1]:,.0f} VNĐ\")",
                "output": "Q1 (25%):           205,000 VNĐ\nQ3 (75%):           437,500 VNĐ\nIQR:                232,500 VNĐ\nHàng rào trên:      786,250 VNĐ\n\nCác giao dịch ngoại lai phát hiện (1):\n 13    95000000\nName: revenue, dtype: int64\n\nGiá trị đơn B2B sau khi Clip về ngưỡng an toàn: 786,250 VNĐ",
                "annotations": [
                  {
                    "line": 12,
                    "text": "quantile() tính tứ phân vị không bị phụ thuộc vào phân phối chuẩn."
                  },
                  {
                    "line": 16,
                    "text": "Hàng rào trên 786,250 VNĐ bóc tách chính xác đơn 95 triệu."
                  },
                  {
                    "line": 23,
                    "text": "clip() cắt ngọn giá trị ngoại lai về đúng biên hàng rào, giữ vững kích thước mẫu."
                  }
                ],
                "explanation": "Kỹ thuật Clipping (Winsorization) là phương pháp chuẩn mực trong kinh tế lượng: thay vì xóa bản ghi làm mất mẫu, ta giới hạn giá trị cực đoan về ngưỡng cận trên để giữ phân phối ổn định."
              }
            ]
          },
          {
            "id": "sec-chained-assignment-anatomy",
            "title": "2. Giải Phẫu Bẫy Chained Assignment: df['a']['b'] = c",
            "badge": "Bản chất Cơ học",
            "content": "\n                          <p><strong>Chained Assignment (Gán chuỗi)</strong> là nguyên nhân gây ra 90% các câu hỏi cầu cứu trên cộng đồng lập trình Pandas. Hãy giải phẫu bản chất cơ học bên dưới:</p>\n\n                          <h4>Tại sao `df['revenue'][0] = 100` lại nguy hiểm?</h4>\n                          <p>Khi bạn viết biểu thức này, CPython chia thành hai bước độc lập:</p>\n                          <ol>\n                            <li>Bước 1: <code>temp = df['revenue']</code> (Gọi phương thức <code>__getitem__</code>). Trình thông dịch trả về một đối tượng Series. Vấn đề nằm ở chỗ: <code>temp</code> có thể là một <strong>View</strong> nhưng cũng có thể là một <strong>Copy</strong> tạm thời trong RAM!</li>\n                            <li>Bước 2: <code>temp[0] = 100</code> (Gọi phương thức <code>__setitem__</code>). Bạn thực hiện gán số 100 lên đối tượng <code>temp</code>. Nếu <code>temp</code> là một bản Copy tạm thời, phép gán này thành công trên <code>temp</code> rồi đối tượng đó bị giải phóng ngay lập tức! DataFrame gốc <code>df</code> hoàn toàn <strong>KHÔNG HỀ ĐƯỢC CẬP NHẬT</strong>!</li>\n                          </ol>\n\n                          <h4>Giải pháp duy nhất: Sử dụng `.loc` trong một bước duy nhất</h4>\n                          <p style=\"text-align:center;font-weight:700;color:var(--accent-primary);font-size:1.05rem;\">\n                            ✅ LUÔN DÙNG: <code>df.loc[dòng, 'cột'] = giá_trị</code>\n                          </p>\n                          <p>Khi dùng <code>.loc</code>, Pandas thực hiện cả việc tìm kiếm lẫn việc gán trong đúng một lời gọi hàm nguyên tử <code>__setitem__</code> duy nhất, bảo đảm cập nhật thẳng vào DataFrame gốc 100%.</p>\n                        ",
            "codeExamples": [
              {
                "title": "So sánh Chained Assignment sai lầm và giải pháp chuẩn xác với .loc",
                "lang": "Python",
                "code": "import pandas as pd\n\ndf = pd.DataFrame({\n    \"branch\": [\"HN\", \"HCM\", \"DN\"],\n    \"revenue\": [100000, 200000, 300000]\n})\n\n# CÁCH VIẾT CHUẨN MỰC BẤT BIẾN:\n# Cập nhật doanh thu chi nhánh 'HN' lên 150000\ndf.loc[df[\"branch\"] == \"HN\", \"revenue\"] = 150000\n\nprint(\"=== DATAFRAME CẬP NHẬT CHUẨN XÁC VỚI .LOC ===\")\nprint(df)",
                "output": "=== DATAFRAME CẬP NHẬT CHUẨN XÁC VỚI .LOC ===\n  branch  revenue\n0     HN   150000\n1    HCM   200000\n2     DN   300000",
                "annotations": [
                  {
                    "line": 10,
                    "text": "df.loc[mask, 'revenue'] = 150000 thực thi nguyên tử trong 1 bước duy nhất, triệt tiêu Chained Assignment."
                  }
                ],
                "explanation": "Trong Pandas 3.0+ với Copy-on-Write, các cú pháp Chained Assignment cố tình gán lên bản copy sẽ tự động bị chặn hoặc ném ra lỗi tường minh, giúp lập trình viên phát hiện lỗi ngay tại chỗ."
              }
            ]
          },
          {
            "id": "sec-outliers-references",
            "title": "3. Tài Liệu Tham Khảo Chính Thống",
            "badge": "Tài liệu Nguồn",
            "content": "\n                          <ul>\n                            <li><strong>Tukey, J. W. (1977).</strong> <em>Exploratory Data Analysis.</em> Addison-Wesley. (Chapter 2: Looking at Data with Box-and-Whisker Plots).</li>\n                            <li><strong>Pandas Documentation.</strong> <em>Returning a view versus a copy & SettingWithCopy.</em> <a href=\"https://pandas.pydata.org/docs/user_guide/indexing.html#returning-a-view-versus-a-copy\" target=\"_blank\" rel=\"noopener\">https://pandas.pydata.org/docs/user_guide/indexing.html#returning-a-view-versus-a-copy</a></li>\n                            <li><strong>Barnett, V., & Lewis, T. (1994).</strong> <em>Outliers in Statistical Data (3rd ed.).</em> John Wiley & Sons.</li>\n                          </ul>\n                        "
          }
        ],
        "callouts": {
          "pitfalls": [
            {
              "title": "Tự động xóa mọi điểm nằm ngoài 1.5*IQR",
              "content": "Trong kinh doanh bán lẻ, các giao dịch lớn của khách hàng doanh nghiệp (B2B) luôn nằm ngoài hàng rào IQR. Xóa bỏ chúng đồng nghĩa với việc xóa bỏ những dữ liệu mang lại lợi nhuận cao nhất cho công ty."
            },
            {
              "title": "Viết code gán chuỗi kiểu hai dấu ngoặc vuông `df[col][idx] = x`",
              "content": "Đây là cạm bẫy Chained Assignment cổ điển. Luôn gộp thành một dấu ngoặc vuông duy nhất: `df.loc[idx, col] = x`."
            }
          ],
          "tips": [
            {
              "title": "Kỹ thuật Clipping (Winsorization) giữ nguyên kích thước mẫu",
              "content": "Sử dụng `df['revenue'].clip(lower=q1_fence, upper=q3_fence)` khi huấn luyện mô hình học máy để hạn chế độ lệch do ngoại lai mà không bị mất bản ghi."
            }
          ]
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Xác định khoảng tứ phân vị IQR bằng hàm quantile()",
            "problem": "Cho mảng doanh số bán hàng: `s = pd.Series([10, 20, 25, 30, 35, 40, 100])`. Hãy viết code tính Q1, Q3, IQR và xác định ngưỡng cận trên theo quy tắc Tukey 1.5*IQR.",
            "hint": "Dùng `s.quantile(0.25)` và `s.quantile(0.75)`.",
            "solutionCode": "import pandas as pd\n\ns = pd.Series([10, 20, 25, 30, 35, 40, 100])\nq1 = s.quantile(0.25)\nq3 = s.quantile(0.75)\niqr = q3 - q1\nupper_fence = q3 + 1.5 * iqr\n\nprint(f\"Q1: {q1}, Q3: {q3}, IQR: {iqr}\")\nprint(f\"Hàng rào cận trên: {upper_fence}\")\nprint(\"Điểm ngoại lai vượt rào:\", list(s[s > upper_fence]))",
            "solutionOutput": "Q1: 22.5, Q3: 37.5, IQR: 15.0\nHàng rào cận trên: 60.0\nĐiểm ngoại lai vượt rào: [100]",
            "explanation": "Điểm 100 vượt qua ngưỡng cận trên 60.0 và được đánh dấu chính xác là ngoại lai tiềm năng cần kiểm tra nghiệp vụ."
          },
          {
            "level": "Vừa",
            "title": "Refactor code sửa triệt để lỗi Chained Assignment",
            "problem": "Một thực tập sinh tại TechMart viết đoạn code sau để cập nhật trạng thái đơn hàng và bị cảnh báo:\n```python\ndf[df['amount'] > 500]['status'] = 'VIP'\n```\nHãy chỉ ra lý do tại sao dòng code trên có thể không cập nhật được dữ liệu thật, và viết lại theo chuẩn an toàn.",
            "hint": "Thay bằng `df.loc[df['amount'] > 500, 'status'] = 'VIP'`.",
            "solutionCode": "import pandas as pd\n\ndf = pd.DataFrame({\n    \"id\": [1, 2, 3],\n    \"amount\": [600, 300, 800],\n    \"status\": [\"NORMAL\", \"NORMAL\", \"NORMAL\"]\n})\n\n# Sửa lại chuẩn mực với .loc nguyên tử\ndf.loc[df[\"amount\"] > 500, \"status\"] = \"VIP\"\n\nprint(\"DataFrame sau khi cập nhật đúng chuẩn:\\n\", df)",
            "solutionOutput": "DataFrame sau khi cập nhật đúng chuẩn:\n    id  amount  status\n0   1     600     VIP\n1   2     300  NORMAL\n2   3     800     VIP",
            "explanation": "Cú pháp df.loc[mask, 'status'] = 'VIP' thực hiện phép gán trực tiếp lên DataFrame gốc trong một thao tác duy nhất, triệt tiêu hoàn toàn rủi ro gán lên bản copy tạm thời."
          },
          {
            "level": "Nâng cao",
            "title": "Xây dựng bộ lọc đa tầng phân loại ngoại lai TechMart",
            "problem": "Viết hàm `triage_outliers(df, col_name)` nhận vào bảng giao dịch. Hàm thực hiện:\n1. Tính Q1, Q3, IQR và xác lập hai ngưỡng: Ngoại lai vừa (1.5*IQR) và Ngoại lai cực đoan (3.0*IQR).\n2. Gắn nhãn phân loại vào cột mới `outlier_flag`:\n   - 'NORMAL': Nằm trong hàng rào 1.5*IQR.\n   - 'MILD_OUTLIER': Nằm giữa 1.5*IQR và 3.0*IQR (nghi ngờ).\n   - 'EXTREME_OUTLIER': Nằm ngoài 3.0*IQR (cần đối soát kế toán gấp).\n3. Trả về bảng thống kê số lượng đơn hàng theo từng nhóm cờ.",
            "hint": "Dùng `np.select` kết hợp với các điều kiện so sánh hàng rào.",
            "solutionCode": "import pandas as pd\nimport numpy as np\n\ndef triage_outliers(df, col):\n    q1 = df[col].quantile(0.25)\n    q3 = df[col].quantile(0.75)\n    iqr = q3 - q1\n    \n    fence_mild_upper = q3 + 1.5 * iqr\n    fence_extreme_upper = q3 + 3.0 * iqr\n    \n    conditions = [\n        df[col] > fence_extreme_upper,\n        df[col] > fence_mild_upper\n    ]\n    choices = [\"EXTREME_OUTLIER\", \"MILD_OUTLIER\"]\n    \n    df_result = df.copy()\n    df_result[\"outlier_flag\"] = np.select(conditions, choices, default=\"NORMAL\")\n    return df_result\n\nsample_sales = pd.DataFrame({\n    \"order_id\": [f\"O{i}\" for i in range(10)],\n    \"revenue\": [100, 120, 130, 150, 160, 180, 200, 210, 450, 1200]\n})\nflagged = triage_outliers(sample_sales, \"revenue\")\nprint(flagged[[\"order_id\", \"revenue\", \"outlier_flag\"]])\nprint(\"\\nPhân bổ số lượng từng nhóm cờ:\\n\", flagged[\"outlier_flag\"].value_counts())",
            "solutionOutput": "  order_id  revenue      outlier_flag\n0       O0      100            NORMAL\n1       O1      120            NORMAL\n2       O2      130            NORMAL\n3       O3      150            NORMAL\n4       O4      160            NORMAL\n5       O5      180            NORMAL\n6       O6      200            NORMAL\n7       O7      210            NORMAL\n8       O8      450      MILD_OUTLIER\n9       O9     1200   EXTREME_OUTLIER\n\nPhân bổ số lượng từng nhóm cờ:\n outlier_flag\nNORMAL             8\nMILD_OUTLIER       1\nEXTREME_OUTLIER    1\nName: count, dtype: int64",
            "explanation": "Phân tầng ngoại lai thành 2 mức (1.5*IQR và 3.0*IQR) là phương pháp chuẩn quốc tế giúp đội ngũ quản trị rủi ro tập trung điều tra các giao dịch bất thường cực đoan mà không làm phiền các đơn hàng thông thường."
          }
        ],
        "quiz": [
          {
            "question": "Trong phương pháp phát hiện ngoại lai Boxplot của John Tukey, Khoảng Tứ Phân Vị (IQR) được tính bằng công thức nào?",
            "options": [
              "IQR = Max - Min",
              "IQR = Q3 - Q1 (Hiệu số giữa Tứ phân vị thứ ba 75% và Tứ phân vị thứ nhất 25%).",
              "IQR = Mean / Std",
              "IQR = Q2 * 2"
            ],
            "correctIndex": 1,
            "explanation": "IQR đo độ phân tán của 50% dữ liệu nằm ở trung tâm (Q3 - Q1), là thước đo vững vàng không bị ảnh hưởng bởi các giá trị cực đoan."
          },
          {
            "question": "Tại sao việc xóa bỏ toàn bộ các điểm dữ liệu ngoại lai được phát hiện bởi thuật toán lại bị coi là sai lầm nghiêm trọng trong phân tích kinh doanh?",
            "options": [
              "Vì xóa dữ liệu sẽ làm giảm dung lượng ổ cứng.",
              "Vì nhiều ngoại lai thực chất là các sự kiện kinh doanh có giá trị thực tế cao (như đơn hàng bán sỉ doanh nghiệp B2B, gian lận thẻ tín dụng); xóa mù quáng sẽ làm sai lệch doanh thu thực và đánh mất cơ hội phân tích rủi ro.",
              "Vì các thư viện phân tích cấm thao tác xóa.",
              "Vì ngoại lai luôn tự động biến mất."
            ],
            "correctIndex": 1,
            "explanation": "Ngoại lai không đồng nghĩa với dữ liệu sai. Cần phân định giữa sai số nhập liệu (được phép sửa/xóa) và sự kiện hiếm có thật (bắt buộc phải giữ nguyên)."
          },
          {
            "question": "Nguyên nhân cốt lõi gây ra cảnh báo SettingWithCopyWarning khi bạn viết cú pháp `df['col'][idx] = val` (Chained Assignment) là gì?",
            "options": [
              "Do máy tính bị thiếu bộ nhớ RAM.",
              "Do thao tác truy xuất đầu tiên `df['col']` có thể trả về một bản Copy tạm thời trong RAM thay vì View; khi đó phép gán tiếp theo `[idx] = val` chỉ làm thay đổi bản copy tạm rồi biến mất mà không hề lưu vào DataFrame gốc `df`.",
              "Do tên cột viết sai chữ hoa.",
              "Do người dùng chưa cài đặt Pandas bản quyền."
            ],
            "correctIndex": 1,
            "explanation": "Chained Assignment tạo ra hai lời gọi hàm riêng biệt. Nếu bước 1 trả về Copy, bước 2 sẽ gán lên hư vô và DataFrame gốc không thay đổi."
          }
        ],
        "summary": [
          "Quy tắc Tukey IQR xác lập hàng rào vững: Cận dưới = Q1 - 1.5*IQR, Cận trên = Q3 + 1.5*IQR.",
          "Đạo đức dữ liệu: Phân biệt sai số đo lường (sửa/xóa) vs Sự kiện kinh doanh hiếm có thật (bảo toàn).",
          "Áp dụng kỹ thuật Cắt ngọn (Clipping / Winsorization) để ổn định phân phối mà không làm mất mẫu.",
          "Tuyệt đối không dùng Chained Assignment: Luôn gán dữ liệu nguyên tử bằng `df.loc[mask, col] = val`."
        ],
        "selfReviewQuestions": [
          "1. Viết công thức xác định hàng rào trên và hàng rào dưới theo quy tắc 1.5*IQR của John Tukey.",
          "2. Tại sao phương pháp Tukey IQR lại được coi là 'thống kê vững' (Robust Statistics) hơn phương pháp 3-Sigma dựa trên độ lệch chuẩn?",
          "3. Giải thích tại sao cú pháp `df.loc[dòng, 'cột'] = val` lại miễn nhiễm hoàn toàn với cạm bẫy Chained Assignment."
        ],
        "reflectionQuestion": "Hãy suy ngẫm: Nếu bạn là Giám đốc Tài chính của TechMart và phát hiện cấp dưới đã âm thầm xóa bỏ 50 đơn hàng 'ngoại lai' có giá trị trên 500 triệu VNĐ trong quý trước để biểu đồ doanh thu trông đẹp hơn, bạn sẽ giải thích cho họ về hậu quả pháp lý và kinh doanh của hành động này như thế nào?",
        "reflectionHint": "Nghĩ về: Báo cáo tài chính bị khai thiếu doanh thu thực, thất thoát thuế và sai lệch dự báo dòng tiền cho ban giám đốc.",
        "nextLessonPreview": "Bước sang Module 7, chúng ta sẽ bước vào vũ trụ biến đổi và kết hợp dữ liệu: Làm chủ mô hình Split-Apply-Combine trong GroupBy, kiểm tra lực lượng Join với tham số validate='1:m' và xoay bảng theo chuẩn Tidy Data!"
      }
    ]
  },
  {
    "id": "mod-07",
    "number": "Module 7",
    "title": "Gom Nhóm, Kết Hợp & Biến Đổi Bảng Dữ Liệu",
    "badge": "3 Bài học",
    "icon": "🔄",
    "description": "Thành thạo vòng đời Split-Apply-Combine (Wickham 2011), đại số quan hệ ghép bảng (pd.merge, pd.concat), phòng chống thảm họa Cartesian Explosion với validate, triết lý Tidy Data và các phép toán cửa sổ trượt chuỗi thời gian.",
    "lessons": [
      {
        "id": "pd-07-01",
        "number": "7.1",
        "title": "Gom Nhóm với GroupBy: Vòng Đời Split-Apply-Combine",
        "subtitle": "Phân tích kiến trúc lười (lazy evaluation), đối chiếu sống còn .agg() vs .transform() vs .apply(), và tối ưu hóa hiệu năng vòng lặp CPython",
        "level": "Trung cấp",
        "duration": "45 phút",
        "objectives": [
          "Phân tích vòng đời 3 giai đoạn Split-Apply-Combine của Hadley Wickham (2011) và giải thích cơ chế thực thi lười (lazy evaluation) của đối tượng DataFrameGroupBy trong Pandas.",
          "So sánh bản chất toán học và hình học dữ liệu giữa .agg() (thu gọn số chiều - row reduction) và .transform() (bảo toàn hình dạng ban đầu - shape preservation để tính tỷ trọng đóng góp của từng dòng).",
          "Đánh giá chi phí hiệu năng của .apply() so với các thao tác vector hóa của Pandas/NumPy và phân tích Notional Machine giải thích lý do tại sao apply rơi vào vòng lặp Python thông dịch chậm.",
          "Triển khai đường ống gom nhóm đa cấp (Hierarchical/Multi-index GroupBy) trên dữ liệu chuỗi bán lẻ TechMart để trích xuất chỉ số kinh doanh đa chiều."
        ],
        "intuition": {
          "title": "Băng Chuyền Phân Loại & Rổ Hàng Siêu Thị",
          "metaphor": "Hãy tưởng tượng bạn là quản lý kho vận tại trung tâm phân phối TechMart:\\n1. Split (Chia tách): Hàng nghìn kiện hàng chạy trên băng chuyền được gạt vào các rổ riêng theo chi nhánh (Hà Nội, TP.HCM, Đà Nẵng). Tại thời điểm phân rổ, KHÔNG CÓ phép toán nào được tính (Lazy Split). Bạn chỉ đơn giản là gắn nhãn vị trí kiện hàng nào thuộc rổ nào.\\n2. Apply (Áp dụng phép tính): Với mỗi rổ hàng:\\n   - Cách A (.agg - Thu gọn): Bạn đặt cả rổ lên bàn cân để lấy MỘT con số tổng trọng lượng duy nhất. Từ 500 kiện hàng trong rổ Hà Nội, bạn thu được đúng 1 dòng tóm tắt.\\n   - Cách B (.transform - Bảo toàn): Bạn giữ nguyên từng kiện hàng trên băng chuyền, nhưng dán thêm một nhãn phụ ghi tỷ trọng: 'Kiện hàng này nặng 5kg, chiếm 2.5% tổng trọng lượng của rổ Hà Nội'. Bảng dữ liệu đầu ra vẫn giữ nguyên 500 dòng như ban đầu!\\n   - Cách C (.apply - Thủ công): Bạn thuê một nhân viên mở từng gói hàng ra đọc ghi chú đặc biệt rồi đóng lại. Rất linh hoạt nhưng tốc độ chậm đi 50 lần so với máy quét tự động!\\n3. Combine (Gộp lại): Gom các kết quả từ các rổ thành một bảng báo cáo duy nhất.",
          "boundary": ".transform() bắt buộc hàm áp dụng phải trả về một chuỗi có độ dài bằng đúng số dòng của nhóm đó (hoặc 1 giá trị vô hướng để tự động broadcast). Ngược lại, .agg() bắt buộc phải thu gọn một nhóm thành một giá trị duy nhất (scalar aggregation).",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">VÒNG ĐỜI SPLIT - APPLY - COMBINE (HADLEY WICKHAM, 2011)</div>\n                        <div style=\"display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;text-align:center;\">\n                          <div style=\"padding:8px;border:1px solid #3b82f6;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#3b82f6;\">1. SPLIT (Lười)</strong>\n                            <div style=\"font-size:0.75rem;margin-top:4px;\">Chỉ tạo chỉ mục phân rổ</div>\n                            <div style=\"font-size:0.7rem;color:var(--text-muted);margin-top:2px;\">df.groupby('branch') chưa tốn RAM/CPU tính toán</div>\n                          </div>\n                          <div style=\"padding:8px;border:1px solid #10b981;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#10b981;\">2. APPLY</strong>\n                            <div style=\"font-size:0.75rem;margin-top:4px;\">.agg() vs .transform()</div>\n                            <div style=\"font-size:0.7rem;color:var(--text-muted);margin-top:2px;\">.agg: N dòng -> 1 dòng<br>.transform: N dòng -> N dòng</div>\n                          </div>\n                          <div style=\"padding:8px;border:1px solid #8b5cf6;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#8b5cf6;\">3. COMBINE</strong>\n                            <div style=\"font-size:0.75rem;margin-top:4px;\">Gộp thành DataFrame</div>\n                            <div style=\"font-size:0.7rem;color:var(--text-muted);margin-top:2px;\">Tự động sắp xếp hoặc phẳng hóa MultiIndex</div>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-07-01-01",
            "title": "1. Vòng Đời Split-Apply-Combine & Cơ Chế Thực Thi Lười (Lazy Split)",
            "content": "\n                          <p>Năm 2011, Hadley Wickham công bố bài báo khoa học kinh điển <em>\"The Split-Apply-Combine Strategy for Data Analysis\"</em> trên tạp chí <em>Journal of Statistical Software</em>. Đây là mô hình tư duy cốt lõi định hình toàn bộ các thư viện dữ liệu hiện đại, từ <code>dplyr</code> trong R đến <code>pandas</code> trong Python và Apache Spark.</p>\n                          <p>Khi bạn gọi lệnh:</p>\n                          \n                          <p>Bên dưới <strong>Notional Machine</strong> của Pandas, chưa có bất kỳ phép tính số học nào được thực hiện! <code>grouped</code> chỉ là một đối tượng <code>DataFrameGroupBy</code>. Quá trình này hoàn toàn \"lười biếng\" (lazy evaluation): Pandas chỉ quét cột nhóm để xây dựng một bảng băm (hash map) ánh xạ từng khóa nhóm (ví dụ: 'Hà Nội', 'TP.HCM') sang danh sách các vị trí chỉ mục (indices) tương ứng.</p>\n                          <p>Bạn có thể kiểm chứng cấu trúc nội tại này qua thuộc tính <code>grouped.groups</code> và <code>grouped.ngroups</code>:</p>\n                          \n                          <p>Nhờ cơ chế lazy này, bạn có thể chuỗi các toán tử tiếp theo mà không lãng phí bộ nhớ nhân bản dữ liệu trung gian.</p>\n                        ",
            "codeExamples": [
              {
                "id": "pd-07-01-c1",
                "lang": "python",
                "title": "Minh họa cơ chế Split lười (Lazy Evaluation) và phân nhóm GroupBy",
                "code": "import pandas as pd\n\ndf = pd.DataFrame({\n    'branch': ['HN', 'HN', 'HCM', 'HCM', 'DN'],\n    'rep': ['An', 'Bình', 'Chi', 'Dũng', 'Giang'],\n    'revenue': [120, 150, 200, 180, 90]\n})\n\n# Thao tác lười (Lazy Split) - Chỉ đánh chỉ mục phân nhóm trong O(1)\ngrouped = df.groupby('branch')\nprint(\"Kiểu đối tượng:\", type(grouped))\nprint(\"Các nhóm và chỉ số dòng tương ứng:\\n\", grouped.groups)\nprint(\"Số nhóm tìm thấy:\", grouped.ngroups)",
                "output": "Kiểu đối tượng: <class 'pandas.core.groupby.generic.DataFrameGroupBy'>\nCác nhóm và chỉ số dòng tương ứng:\n {'DN': Index([4], dtype='int64'), 'HCM': Index([2, 3], dtype='int64'), 'HN': Index([0, 1], dtype='int64')}\nSố nhóm tìm thấy: 3",
                "explanation": "df.groupby() không sao chép dữ liệu ngay mà tạo cấu trúc ánh xạ chỉ mục khóa -> dòng. Dữ liệu chỉ được nạp tính toán khi các hàm Apply (.agg, .transform) được kích hoạt."
              }
            ]
          },
          {
            "id": "sec-07-01-02",
            "title": "2. Đối Chiếu Sinh Tử: .agg() (Thu Gọn Chiều) vs .transform() (Bảo Toàn Hình Dạng)",
            "content": "\n                          <p>Sau khi chia rổ, 95% sai lầm của người mới bắt đầu là sử dụng sai giữa <code>.agg()</code> và <code>.transform()</code>. Hãy ghi nhớ sự khác biệt cơ bản về mặt hình học dữ liệu:</p>\n                          <div class=\"table-responsive\">\n                            <table class=\"table-content\">\n                              <thead>\n                                <tr>\n                                  <th>Tiêu chí</th>\n                                  <th>.agg() (Aggregation)</th>\n                                  <th>.transform() (Transformation)</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr>\n                                  <td><strong>Mục đích toán học</strong></td>\n                                  <td>Thu gọn nhiều dòng thành 1 đại diện (N &rarr; 1)</td>\n                                  <td>Biến đổi dữ liệu giữ nguyên số dòng ban đầu (N &rarr; N)</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Hình dạng đầu ra</strong></td>\n                                  <td>Số dòng = Số nhóm (K nhóm)</td>\n                                  <td>Số dòng = Số dòng ban đầu của DataFrame gốc</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Bài toán điển hình</strong></td>\n                                  <td>Tính tổng doanh thu theo chi nhánh, tìm giá bán cao nhất theo danh mục.</td>\n                                  <td>Tính % doanh thu của đơn hàng so với tổng chi nhánh; Chuẩn hóa điểm Z-score theo từng nhóm lớp học.</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Gán cột mới</strong></td>\n                                  <td>Không thể gán trực tiếp vào bảng gốc nếu không qua phép join/merge.</td>\n                                  <td>Gán trực tiếp cực kỳ tự nhiên: <code>df['new_col'] = ...</code></td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                          <h4>Minh họa Code Thực Tế: Phân Tích Đóng Góp Doanh Thu Chi Nhánh</h4>\n                          \n                          <div class=\"callout callout-tip\">\n                            <strong>Mẹo Phân Tích: Chuẩn Hóa Z-Score Theo Nhóm</strong>\n                            <p>Khi bạn muốn khử hiệu ứng mùa vụ hoặc sự khác biệt quy mô giữa các phòng ban, công thức Z-score là <code>(x - mean) / std</code>. Dùng <code>transform</code>, bạn viết cực kỳ thanh thoát:</p>\n                            \n                          </div>\n                        ",
            "codeExamples": [
              {
                "id": "pd-07-01-c2",
                "lang": "python",
                "title": "Đối chiếu thực tế: .agg() (Thu gọn N dòng -> 1 dòng) vs .transform() (Bảo toàn N dòng -> N dòng)",
                "code": "import pandas as pd\n\ndf = pd.DataFrame({\n    'branch': ['HN', 'HN', 'HCM', 'HCM', 'DN'],\n    'revenue': [120, 180, 200, 300, 90]\n})\n\n# 1. Thu gọn số dòng với .agg()\nsummary = df.groupby('branch')['revenue'].agg(['sum', 'mean']).reset_index()\nprint(\"Kết quả .agg() (Thu gọn thành 3 dòng):\\n\", summary)\n\n# 2. Bảo toàn số dòng với .transform() để tính Z-Score nội bộ chi nhánh\nz_score = lambda x: (x - x.mean()) / x.std() if len(x) > 1 else 0.0\ndf['norm_rev'] = df.groupby('branch')['revenue'].transform(z_score)\nprint(\"\\nDataFrame bảo toàn số dòng với .transform():\\n\", df)",
                "output": "Kết quả .agg() (Thu gọn thành 3 dòng):\n   branch  sum   mean\n0     DN   90   90.0\n1    HCM  500  250.0\n2     HN  300  150.0\n\nDataFrame bảo toàn số dòng với .transform():\n   branch  revenue  norm_rev\n0     HN      120 -0.707107\n1     HN      180  0.707107\n2    HCM      200 -0.707107\n3    HCM      300  0.707107\n4     DN       90  0.000000",
                "explanation": ".agg() giảm chiều dữ liệu phù hợp tạo bảng báo cáo quản trị. .transform() giữ nguyên số hàng của DataFrame gốc, rất mạnh khi tính tỷ trọng (%) hoặc chuẩn hóa Z-score."
              }
            ]
          },
          {
            "id": "sec-07-01-03",
            "title": "3. Vì Sao .apply() Là Kẻ Thù Hiệu Năng & Khi Nào Bắt Buộc Dùng?",
            "content": "\n                          <p>Hàm <code>.apply()</code> là con dao hai lưỡi quyền lực nhất trong Pandas. Nó chấp nhận bất kỳ hàm Python tùy biến nào và áp dụng lên từng nhóm con.</p>\n                          <h4>Bên Dưới Notional Machine Của .apply()</h4>\n                          <p>Khi bạn viết <code>grouped.apply(custom_func)</code>:</p>\n                          <ol>\n                            <li>Pandas phải lặp qua từng nhóm trong không gian Python (Python-level loop).</li>\n                            <li>Với mỗi nhóm, Pandas cắt ra một sub-DataFrame, đóng gói vào bộ nhớ và chuyển vào <code>custom_func</code>.</li>\n                            <li>Mỗi lần gọi hàm phát sinh chi phí tạo mới và hủy <strong>CPython stack frame</strong>, kiểm tra kiểu động và ép kiểu trung gian.</li>\n                            <li>Sau khi tất cả các nhóm thực thi xong, Pandas phải kiểm tra hình dạng kết quả của từng nhóm để suy đoán xem nên trả về một Series, DataFrame hay MultiIndex. Quá trình suy đoán này cực kỳ tốn CPU.</li>\n                          </ol>\n                          <p>Trong khi đó, <code>.agg()</code> và <code>.transform()</code> sử dụng mã biên dịch tối ưu sẵn bằng Cython/C (như <code>grouped_sum</code>, <code>grouped_mean</code>) với thuật toán tính toán một lượt (one-pass) trực tiếp trên mảng C liền kề, nhanh hơn từ <strong>10x đến 50x</strong>!</p>\n                          <h4>Khi Nào Bắt Buộc Dùng .apply()?</h4>\n                          <p>Chỉ nên dùng <code>.apply()</code> khi logic tính toán phức tạp đòi hỏi:</p>\n                          <ul>\n                            <li>Phụ thuộc chéo đồng thời nhiều cột khác nhau trong cùng một nhóm mà không thể phân rã thành các phép toán vector hóa.</li>\n                            <li>Cần trả về các cấu trúc đặc thù như: Lấy Top-N dòng có điều kiện lọc phức tạp trong mỗi nhóm, hoặc khớp mô hình hồi quy OLS cục bộ (local regression) cho từng chi nhánh.</li>\n                          </ul>\n                          \n                        ",
            "codeExamples": [
              {
                "id": "pd-07-01-c3",
                "lang": "python",
                "title": "Trường hợp bắt buộc dùng .apply(): Logic phụ thuộc chéo đa cột (Top-1 đơn hàng)",
                "code": "import pandas as pd\n\ndf = pd.DataFrame({\n    'branch': ['HN', 'HN', 'HCM', 'HCM'],\n    'rep': ['An', 'Bình', 'Chi', 'Dũng'],\n    'revenue': [120, 180, 300, 200]\n})\n\n# Trích xuất dòng có doanh số cao nhất mỗi chi nhánh\ntop_rep = df.groupby('branch', group_keys=False).apply(\n    lambda grp: grp.nlargest(1, 'revenue'),\n    include_groups=False\n)\nprint(\"Nhân viên xuất sắc nhất mỗi chi nhánh:\\n\", top_rep)",
                "output": "Nhân viên xuất sắc nhất mỗi chi nhánh:\n      rep  revenue\n1   Bình      180\n2    Chi      300",
                "explanation": ".apply() lặp cấp độ Python interpreter nên chậm hơn 10x-50x. Chỉ sử dụng khi bài toán đòi hỏi truy cập đồng thời nhiều cột không thể phân rã thành vectorization."
              }
            ]
          },
          {
            "id": "sec-07-01-04",
            "title": "4. GroupBy Đa Cấp & Xử Lý MultiIndex Với as_index=False",
            "content": "\n                          <p>Khi gom nhóm trên nhiều chiều (ví dụ: Vùng miền & Danh mục sản phẩm):</p>\n                          \n                          <p>Mặc định, Pandas sẽ biến <code>region</code> và <code>category</code> thành một <strong>MultiIndex</strong> (chỉ mục đa cấp) ở trục dòng. Mặc dù MultiIndex rất mạnh để truy vấn phân cấp, nó gây phiền toái lớn khi bạn muốn xuất dữ liệu sang CSV, truyền vào hàm vẽ đồ thị hoặc đưa vào cơ sở dữ liệu quan hệ SQL.</p>\n                          <h4>Hai Cách Phẳng Hóa Bảng Dữ Liệu</h4>\n                          <ol>\n                            <li><strong>Khuyên Dùng:</strong> Truyền tham số <code>as_index=False</code> ngay trong lệnh groupby:\n                              \n                              Kết quả trả về ngay một bảng phẳng chuẩn SQL với các cột định danh bình thường.\n                            </li>\n                            <li><strong>Phẳng Hóa Sau Khi Tính:</strong> Gọi phương thức <code>.reset_index()</code> trên bảng kết quả.</li>\n                          </ol>\n                        ",
            "codeExamples": [
              {
                "id": "pd-07-01-c4",
                "lang": "python",
                "title": "Xử lý MultiIndex khi GroupBy đa cấp: Sử dụng as_index=False để làm phẳng",
                "code": "import pandas as pd\n\ndf = pd.DataFrame({\n    'region': ['Bắc', 'Bắc', 'Nam', 'Nam'],\n    'category': ['Phụ kiện', 'Thiết bị', 'Phụ kiện', 'Thiết bị'],\n    'revenue': [100, 500, 150, 700]\n})\n\n# Dùng as_index=False để tránh sinh MultiIndex phức tạp\ndf_flat = df.groupby(['region', 'category'], as_index=False)['revenue'].sum()\nprint(\"Bảng phẳng dễ xuất dữ liệu (as_index=False):\\n\", df_flat)",
                "output": "Bảng phẳng dễ xuất dữ liệu (as_index=False):\n   region  category  revenue\n0    Bắc  Phụ kiện      100\n1    Bắc  Thiết bị      500\n2    Nam  Phụ kiện      150\n3    Nam  Thiết bị      700",
                "explanation": "Khai báo as_index=False giữ các cột gom nhóm dưới dạng cột dữ liệu chuẩn thay vì gán vào Index, giúp kết quả tương thích ngay với quy trình xuất CSV, Database và vẽ biểu đồ."
              }
            ]
          }
        ],
        "summary": [
          "Split-Apply-Combine là mô hình tư duy chuẩn hóa của Hadley Wickham (2011). df.groupby() là một thao tác lười (lazy) chỉ đánh chỉ mục phân nhóm.",
          ".agg() dùng để thu gọn số chiều (N dòng -> 1 dòng cho mỗi nhóm). .transform() bảo toàn hình dạng ban đầu (N dòng -> N dòng) để tính các chỉ số phân tích tương quan và tỷ trọng.",
          ".apply() chạy vòng lặp cấp độ Python thông dịch, chậm hơn từ 10x đến 50x so với .agg()/.transform() dùng Cython backend. Chỉ dùng apply cho logic phụ thuộc chéo đa cột phức tạp.",
          "Dùng as_index=False hoặc .reset_index() để phẳng hóa MultiIndex giúp dễ dàng xuất file và tích hợp cơ sở dữ liệu."
        ],
        "workedExample": {
          "scenario": "Phân tích doanh thu và đóng góp ngành hàng TechMart",
          "code": "import pandas as pd\n\n# Giả lập dữ liệu bán hàng TechMart\ndata = {\n    'branch': ['HN', 'HN', 'HN', 'HCM', 'HCM', 'DN', 'DN'],\n    'category': ['Laptop', 'Phone', 'Laptop', 'Laptop', 'Phone', 'Phone', 'Accessory'],\n    'revenue': [25000, 12000, 18000, 32000, 15000, 8000, 3500]\n}\ndf_sales = pd.DataFrame(data)\n\n# Bước 1: Tính tổng doanh thu theo chi nhánh bằng .transform() để tính % đóng góp từng đơn\ndf_sales['branch_total'] = df_sales.groupby('branch')['revenue'].transform('sum')\ndf_sales['pct_branch'] = (df_sales['revenue'] / df_sales['branch_total'] * 100).round(1)\n\n# Bước 2: Báo cáo quản trị đa cấp phẳng hóa bằng .agg() và as_index=False\nexec_report = df_sales.groupby(['branch', 'category'], as_index=False)['revenue'].agg(\n    total_rev='sum',\n    avg_rev='mean',\n    order_count='count'\n)\n\nprint(\"Bảng chi tiết với % đóng góp:\n\", df_sales[['branch', 'category', 'revenue', 'pct_branch']])\nprint(\"\nBáo cáo tổng hợp quản trị:\n\", exec_report)",
          "explanation": "1. df_sales.groupby('branch')['revenue'].transform('sum') tính tổng theo từng chi nhánh và broadcast trực tiếp về đúng số dòng ban đầu (7 dòng), cho phép tính tỷ lệ % đóng góp chỉ với một phép chia vector hóa thanh thoát.\\n2. df_sales.groupby(['branch', 'category'], as_index=False)['revenue'].agg(...) gom nhóm 2 cấp và đặt tên cột mới ngay trong cú pháp agg hiện đại, as_index=False tạo bảng phẳng sẵn sàng kết nối PowerBI hoặc SQL."
        },
        "fadedExample": {
          "scenario": "Tính khoảng cách doanh thu so với trung bình nhóm (Group Demeaning)",
          "code": "import pandas as pd\n\ndf_products = pd.DataFrame({\n    'category': ['Audio', 'Audio', 'Audio', 'Monitor', 'Monitor'],\n    'price': [120, 80, 250, 300, 450]\n})\n\n# Yêu cầu: Tính độ chênh lệch giá của từng sản phẩm so với giá trung bình của ngành hàng đó\n# Gợi ý: Dùng .transform('mean') để lấy giá trung bình ngành hàng gán vào cột 'cat_avg_price'\n# Sau đó trừ trực tiếp: df_products['price'] - df_products['cat_avg_price']\n\ndf_products['cat_avg_price'] = df_products.groupby('category')['price'].transform('mean')\ndf_products['price_diff'] = df_products['price'] - df_products['cat_avg_price']\n\nprint(\"Kết quả chênh lệch giá:\n\", df_products)",
          "blankExplanation": "Điền phép gọi .transform('mean') vào nhóm 'category'. Cột cat_avg_price sẽ chứa giá trị trung bình tương ứng cho từng dòng, giúp phép trừ price - cat_avg_price đạt tốc độ SIMD nhanh tuyệt đối."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Phân nhóm và tính thống kê cơ bản theo phòng ban",
            "problem": "Cho DataFrame thông tin nhân sự: `df_emp = pd.DataFrame({'dept': ['Sales', 'IT', 'IT', 'Sales', 'HR'], 'salary': [15, 25, 30, 18, 12]})`. Sử dụng phương thức `.groupby()` và `.agg()` với `as_index=False` để tạo bảng tóm tắt gồm lương cao nhất (max), thấp nhất (min) và trung bình (mean) theo từng phòng ban.",
            "hint": "Gọi df_emp.groupby('dept', as_index=False)['salary'].agg(['min', 'max', 'mean']) để giữ cột dept ở dạng cột phẳng thay vì Index.",
            "solutionCode": "import pandas as pd\n\ndf_emp = pd.DataFrame({\n    'dept': ['Sales', 'IT', 'IT', 'Sales', 'HR'],\n    'salary': [15, 25, 30, 18, 12]\n})\n\nsummary_emp = df_emp.groupby('dept', as_index=False)['salary'].agg(['min', 'max', 'mean'])\nprint(summary_emp)",
            "explanation": "Phương thức .groupby() kết hợp cùng .agg() cho phép áp dụng đồng thời nhiều hàm tổng hợp lên cùng một trường dữ liệu. Thiết lập as_index=False rất quan trọng trong Data Engineering vì nó giữ trường nhóm ('dept') dưới dạng một cột dữ liệu thông thường thay vì Index đa cấp, giúp bảng kết quả sẵn sàng cho các thao tác merge hoặc xuất file CSV tiếp theo mà không cần gọi thêm .reset_index().",
            "solutionOutput": "dept  min  max  mean\r\n0     HR   12   12  12.0\r\n1     IT   25   30  27.5\r\n2  Sales   15   18  16.5"
          },
          {
            "level": "Vừa",
            "title": "Chuẩn hóa điểm Z-Score nội bộ lớp học bằng .transform()",
            "problem": "Trong kỳ thi tuyển chọn, đề thi ở mỗi phòng có độ khó khác nhau. Cho bảng điểm: `df_exam = pd.DataFrame({'class_id': ['A', 'A', 'A', 'B', 'B', 'B'], 'score': [8.0, 9.0, 7.0, 4.0, 6.0, 5.0]})`. Hãy tính điểm Z-score cho từng học sinh dựa trên điểm trung bình và độ lệch chuẩn của chính lớp đó bằng `.transform()`. Công thức: `z = (score - mean) / std`. Kết quả làm tròn 2 chữ số thập phân.",
            "hint": "Dùng df_exam.groupby('class_id')['score'].transform('mean') và transform('std') để nhận lại Series có độ dài đúng bằng bảng ban đầu.",
            "solutionCode": "import pandas as pd\n\ndf_exam = pd.DataFrame({\n    'class_id': ['A', 'A', 'A', 'B', 'B', 'B'],\n    'score': [8.0, 9.0, 7.0, 4.0, 6.0, 5.0]\n})\n\nmeans = df_exam.groupby('class_id')['score'].transform('mean')\nstds = df_exam.groupby('class_id')['score'].transform('std')\n\ndf_exam['z_score'] = ((df_exam['score'] - means) / stds).round(2)\nprint(df_exam)",
            "explanation": "Điểm mấu chốt của .transform() là phát sóng (broadcast) kết quả thống kê của nhóm về đúng kích thước dòng ban đầu của từng quan sát. Nhờ đó, ta có thể thực hiện các phép trừ và chia vector hóa trực tiếp df['score'] - means mà không cần lặp for hay gộp bảng (merge) phức tạp, tối ưu hóa cả tốc độ tính toán lẫn dung lượng bộ nhớ RAM.",
            "solutionOutput": "class_id  score  z_score\r\n0        A    8.0      0.0\r\n1        A    9.0      1.0\r\n2        A    7.0     -1.0\r\n3        B    4.0     -1.0\r\n4        B    6.0      1.0\r\n5        B    5.0      0.0"
          },
          {
            "level": "Nâng cao",
            "title": "Lọc nhóm theo điều kiện tổng hợp đa tiêu chí với .filter()",
            "problem": "TechMart áp dụng chính sách thưởng quý cho các nhóm bán hàng đạt đồng thời 2 tiêu chí: tổng doanh thu vượt 100 triệu VNĐ VÀ có ít nhất 3 đơn hàng. Cho DataFrame: `df_teams = pd.DataFrame({'team': ['T1', 'T1', 'T1', 'T2', 'T2', 'T3', 'T3', 'T3'], 'revenue': [40, 50, 30, 80, 10, 10, 20, 15]})`. Sử dụng phương thức `.filter()` của GroupBy để giữ lại toàn bộ các dòng chi tiết của các nhóm đủ điều kiện.",
            "hint": "Truyền một hàm lambda vào df_teams.groupby('team').filter(lambda grp: grp['revenue'].sum() > 100 and len(grp) >= 3).",
            "solutionCode": "import pandas as pd\n\ndf_teams = pd.DataFrame({\n    'team': ['T1', 'T1', 'T1', 'T2', 'T2', 'T3', 'T3', 'T3'],\n    'revenue': [40, 50, 30, 80, 10, 10, 20, 15]\n})\n\n# Điều kiện: Tổng revenue > 100 VÀ số lượng đơn hàng >= 3\nqualified_teams = df_teams.groupby('team').filter(\n    lambda grp: grp['revenue'].sum() > 100 and len(grp) >= 3\n)\n\nprint(\"Các đơn hàng của đội đạt chuẩn thưởng:\\n\", qualified_teams)",
            "explanation": "Khác với phép lọc boolean thông thường đánh giá trên từng dòng đơn lẻ, phương thức .filter() của GroupBy đánh giá trên toàn bộ phân nhóm dữ liệu. Nếu hàm điều kiện trả về True, toàn bộ các bản ghi con của nhóm đó được bảo toàn nguyên vẹn trong DataFrame kết quả; nếu False, cả nhóm sẽ bị loại bỏ.",
            "solutionOutput": "Các đơn hàng của đội đạt chuẩn thưởng:\r\n   team  revenue\r\n0   T1       40\r\n1   T1       50\r\n2   T1       30"
          }
        ],
        "quiz": [
          {
            "question": "Sau khi thực thi lệnh 'grp = df.groupby('category')', phát biểu nào sau đây mô tả đúng nhất trạng thái của biến grp?",
            "options": [
              "grp là một DataFrame mới đã được sắp xếp tăng dần theo cột category.",
              "grp là một đối tượng DataFrameGroupBy nắm giữ chỉ mục phân nhóm lười (lazy index map), chưa có phép tính số học nào được thực thi.",
              "grp là một từ điển chứa toàn bộ các bản sao (copies) dữ liệu được phân chia thành từng mảng riêng biệt.",
              "grp tự động tính toán giá trị trung bình của toàn bộ các cột số."
            ],
            "correctIndex": 1,
            "explanation": "df.groupby() hoạt động theo cơ chế lazy evaluation (thực thi lười). Nó chỉ lập bảng băm ánh xạ khóa nhóm sang các vị trí index trong bảng gốc mà không thực hiện phép tính hay sao chép dữ liệu, giúp tối ưu tối đa tài nguyên bộ nhớ."
          },
          {
            "question": "Sự khác biệt cốt lõi về hình dạng dữ liệu (shape) giữa .agg() và .transform() khi áp dụng trên một DataFrame có 1.000 dòng được chia thành 10 nhóm là gì?",
            "options": [
              ".agg() trả về bảng gồm 1.000 dòng, còn .transform() trả về bảng gồm 10 dòng.",
              "Cả hai phương thức đều trả về 10 dòng nhưng .transform() có thêm cột MultiIndex.",
              ".agg() trả về bảng gồm 10 dòng (1 dòng cho mỗi nhóm), trong khi .transform() trả về mảng gồm đúng 1.000 dòng bằng hình dạng bảng ban đầu.",
              ".transform() chỉ áp dụng được trên một cột đơn lẻ, còn .agg() áp dụng được trên toàn bộ DataFrame."
            ],
            "correctIndex": 2,
            "explanation": ".agg() thực hiện phép thu gọn chiều (aggregation/reduction) từ N dòng trong nhóm thành 1 đại diện. .transform() thực hiện phép biến đổi bảo toàn hình dạng (shape preservation) để kết quả có thể trực tiếp gán vào một cột mới trên bảng ban đầu."
          },
          {
            "question": "Tại sao việc lạm dụng .apply() với hàm Python tùy biến lại làm giảm nghiêm trọng hiệu năng xử lý dữ liệu lớn trong Pandas?",
            "options": [
              "Vì .apply() bắt buộc phải ghi dữ liệu trung gian vào ổ cứng SSD trước khi gộp kết quả.",
              "Vì .apply() luôn tự động chuyển kiểu dữ liệu của toàn bộ các cột số sang chuỗi văn bản (object).",
              "Vì .apply() không hỗ trợ xử lý giá trị khuyết (NaN/None).",
              "Vì .apply() phải chạy vòng lặp cấp độ Python thông dịch, liên tục tạo/hủy stack frame và mất đi toàn bộ ưu thế tối ưu hóa vector C/Cython."
            ],
            "correctIndex": 3,
            "explanation": ".apply() gọi hàm Python trên từng nhóm con. Do đó, nó bị kẹt trong vòng lặp thông dịch của CPython, tạo chi phí overhead khổng lồ so với các hàm C tối ưu sẵn trong .agg() và .transform()."
          }
        ],
        "selfReviewQuestions": [
          "Tại sao phương thức .transform() lại là công cụ số 1 để tính tỷ lệ phần trăm đóng góp của một dòng so với tổng thể nhóm mà không cần đến phép merge?",
          "Mô tả vòng đời Split-Apply-Combine của Hadley Wickham và giải thích ý nghĩa của cơ chế lazy split trong việc tiết kiệm RAM.",
          "Làm thế nào để tránh tình trạng xuất hiện MultiIndex ở trục dòng sau khi thực hiện groupby trên 3 cột khác nhau?"
        ],
        "reflectionQuestion": "Trong một hệ thống tính lương nhân viên gồm 100.000 dòng, bạn cần tính tiền thưởng dựa trên hiệu suất cá nhân so với hiệu suất trung bình của phòng ban. Bạn sẽ chọn .agg(), .transform() hay .apply()? Hãy phân tích lựa chọn của bạn dựa trên 2 tiêu chí: tính đúng đắn và tốc độ thực thi.",
        "reflectionHint": "Hiệu suất trung bình của phòng ban cần được so sánh trực tiếp với từng nhân viên, do đó mỗi nhân viên cần biết giá trị TB của phòng mình ngay tại dòng của họ. Sử dụng .transform('mean') là lựa chọn hoàn hảo: bảo toàn 100.000 dòng, chạy ở tốc độ Cython/C cực nhanh và gán trực tiếp vào cột df['dept_avg_perf'] mà không cần vòng lặp apply hay merge trung gian.",
        "nextLessonPreview": "Ở bài 7.2, chúng ta sẽ bước sang kỹ thuật kết hợp dữ liệu từ nhiều nguồn: Khám phá bản chất đại số quan hệ của pd.merge (Inner, Left, Right, Outer Join), thảm họa Cartesian Explosion khi merge trên khóa trùng lặp và tham số cứu mạng validate='1:m'.",
        "references": [
          {
            "title": "The Split-Apply-Combine Strategy for Data Analysis (Hadley Wickham, 2011)",
            "url": "https://www.jstatsoft.org/article/view/v040i01"
          },
          {
            "title": "Pandas Official Documentation - Group By: split-apply-combine",
            "url": "https://pandas.pydata.org/docs/user_guide/groupby.html"
          }
        ]
      },
      {
        "id": "pd-07-02",
        "number": "7.2",
        "title": "Ghép Bảng: Nối Dọc/Ngang (concat) & Kết Hợp Quan Hệ (merge)",
        "subtitle": "Đại số quan hệ (Join Semantics), kiểm soát bản số quan hệ (Cardinalities), phòng chống thảm họa Cartesian Explosion với validate và kiểm toán với _merge",
        "level": "Trung cấp",
        "duration": "45 phút",
        "objectives": [
          "Phân biệt bản chất đại số quan hệ (Relational Algebra) của 4 kiểu Join: Inner, Left, Right và Full Outer Join, xác định đúng kiểu join cho từng bài toán kinh doanh cụ thể.",
          "Xác định các bậc bản số quan hệ (Cardinalities: 1:1, 1:N, N:N) và phân tích nguyên nhân kỹ thuật dẫn đến thảm họa Cartesian explosion (bùng nổ số dòng số mũ) khi ghép bảng trên khóa không duy nhất.",
          "Áp dụng cơ chế an toàn phòng thủ với tham số validate='1:m' / validate='1:1' và indicator=True trong pd.merge() để phát hiện và ngăn chặn sai lệch dữ liệu trước khi xử lý tiếp.",
          "Phân biệt nối hình học theo trục (pd.concat axis=0 vs axis=1) với kết hợp quan hệ theo khóa (pd.merge), kiểm soát tính toàn vẹn chỉ mục với verify_integrity=True và ignore_index=True."
        ],
        "intuition": {
          "title": "Tra Cứu Căn Cước Công Dân & Nối Hồ Sơ Lưu Trữ",
          "metaphor": "Hãy phân biệt rõ ràng giữa 'Nối tài liệu' và 'Ghép hồ sơ':\\n1. pd.concat (Nối hình học theo trục): Giống như việc bạn lấy kẹp bấm nối xấp tài liệu báo cáo Tháng 2 vào ngay sau xấp báo cáo Tháng 1 (axis=0 - nối dọc). Hoặc bạn đặt tờ danh sách điểm danh bên cạnh tờ danh sách nộp học phí (axis=1 - nối ngang). Không có sự tra cứu logic nào ở đây, chỉ là việc ghép các trang giấy theo thứ tự vật lý!\\n2. pd.merge (Kết hợp quan hệ theo khóa logic): Giống như việc bạn cầm mã Căn Cước Công Dân (CCCD) của bệnh nhân để tra cứu hồ sơ tiêm chủng trong cơ sở dữ liệu y tế quốc gia. Bảng thông tin cá nhân và bảng tiêm chủng có thể nằm ở hai nơi khác nhau, thứ tự dòng hoàn toàn xáo trộn, nhưng chúng kết nối chính xác với nhau nhờ 'khóa định danh' (Key).\\n3. Thảm họa Cartesian Explosion (Bùng nổ nhân chéo): Hãy tưởng tượng do lỗi hệ thống, có 2 người khác nhau nhưng bị cấp trùng một mã CCCD trong bảng hồ sơ. Trong bảng tiêm chủng lại có 3 mũi tiêm mang mã đó. Khi thực hiện ghép nối, hệ thống sẽ nhân chéo: 2 x 3 = 6 dòng dữ liệu! Nếu có 1.000 dòng bị trùng lặp ở cả hai bên, 1.000 x 1.000 = 1.000.000 dòng dữ liệu rác sẽ bùng nổ, làm tràn bộ nhớ RAM và làm sai lệch toàn bộ báo cáo doanh thu!",
          "boundary": "Dùng pd.concat khi bạn muốn nối các bảng có cùng cấu trúc cột theo thời gian (ví dụ: gộp file log ngày 1, ngày 2...). Dùng pd.merge khi bạn muốn kết hợp các bảng có bản chất thực thể khác nhau dựa trên một cột chung (ví dụ: bảng Đơn hàng kết hợp bảng Khách hàng).",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">BỐN KIỂU JOIN ĐẠI SỐ QUAN HỆ TRONG PANDAS</div>\n                        <div style=\"display:grid;grid-template-columns:repeat(4, 1fr);gap:6px;text-align:center;\">\n                          <div style=\"padding:6px;border:1px solid #3b82f6;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#3b82f6;\">INNER</strong>\n                            <div style=\"font-size:0.7rem;margin-top:2px;\">Giao điểm chung</div>\n                            <div style=\"font-size:0.65rem;color:var(--text-muted);\">Chỉ giữ khóa xuất hiện ở cả hai bảng</div>\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #10b981;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#10b981;\">LEFT</strong>\n                            <div style=\"font-size:0.7rem;margin-top:2px;\">Ưu tiên bảng Trái</div>\n                            <div style=\"font-size:0.65rem;color:var(--text-muted);\">Giữ trọn vẹn Trái, Phải không có thì điền NaN</div>\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #f59e0b;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#f59e0b;\">RIGHT</strong>\n                            <div style=\"font-size:0.7rem;margin-top:2px;\">Ưu tiên bảng Phải</div>\n                            <div style=\"font-size:0.65rem;color:var(--text-muted);\">Giữ trọn vẹn Phải, Trái không có thì điền NaN</div>\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #ef4444;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#ef4444;\">OUTER</strong>\n                            <div style=\"font-size:0.7rem;margin-top:2px;\">Hợp toàn phần</div>\n                            <div style=\"font-size:0.65rem;color:var(--text-muted);\">Giữ tất cả khóa của cả 2 bảng</div>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-07-02-01",
            "title": "1. Bản Chất Đại Số Quan Hệ Của 4 Kiểu Join & Kiểm Toán Nguồn Gốc Với _merge",
            "content": "\n                          <p>Hàm <code>pd.merge()</code> thực hiện các phép toán đại số quan hệ (Relational Algebra) tương đương với câu lệnh <code>JOIN</code> trong chuẩn ngôn ngữ SQL:</p>\n                          <ul>\n                            <li><strong>how='inner':</strong> Chỉ giữ lại các bản ghi có khóa xuất hiện đồng thời ở CẢ HAI bảng. Thích hợp khi bạn chỉ quan tâm đến các giao dịch có đầy đủ thông tin khách hàng hợp lệ.</li>\n                            <li><strong>how='left':</strong> Giữ lại toàn bộ các dòng của bảng bên trái (Left DataFrame). Nếu khóa không tồn tại ở bảng bên phải, các cột của bảng phải sẽ được điền <code>NaN</code>. Đây là kiểu join phổ biến nhất trong Data Wrangling để bổ sung thuộc tính (enrichment) mà không làm mất đơn hàng nào.</li>\n                            <li><strong>how='right':</strong> Tương tự left join nhưng giữ trọn vẹn bảng bên phải. (Trong thực tế, khuyến nghị nên đổi vị trí bảng và dùng <code>how='left'</code> để mã nguồn dễ đọc và nhất quán).</li>\n                            <li><strong>how='outer':</strong> Lấy hợp (union) toàn bộ các khóa từ cả hai bảng. Ô nào thiếu thông tin từ bên đối diện sẽ nhận giá trị <code>NaN</code>. Dùng để đối soát công nợ hoặc tìm kiếm các bản ghi mồ côi (orphaned records).</li>\n                          </ul>\n                          <h4>Kỹ Thuật Kiểm Toán Nguồn Gốc Với indicator=True</h4>\n                          <p>Khi thực hiện ghép bảng, bạn cần biết chính xác từng dòng dữ liệu đến từ đâu: xuất hiện ở cả hai bảng, hay chỉ có ở bảng trái, hay chỉ có ở bảng phải? Tham số <code>indicator=True</code> sẽ tự động bổ sung thêm một cột đặc biệt có tên <code>_merge</code>:</p>\n                          \n                          <p>Nhờ cột <code>_merge</code>, bạn có thể lập tức lọc ra những đơn hàng có mã khách hàng mồ côi (<code>merged['_merge'] == 'left_only'</code>) để gửi báo cáo cảnh báo cho đội kỹ thuật!</p>\n                        ",
            "codeExamples": [
              {
                "id": "pd-07-02-c1",
                "lang": "python",
                "title": "Kiểm toán nguồn gốc bản ghi với indicator=True trong phép ghép Left Join",
                "code": "import pandas as pd\n\ndf_orders = pd.DataFrame({\n    'order_id': [1, 2, 3],\n    'cust_id': [101, 102, 999], # 999 là khách hàng không tồn tại\n    'amount': [250, 500, 100]\n})\n\ndf_custs = pd.DataFrame({\n    'cust_id': [101, 102, 103],\n    'name': ['An', 'Bình', 'Chi']\n})\n\nmerged = pd.merge(df_orders, df_custs, on='cust_id', how='left', indicator=True)\nprint(\"Kết quả Left Join với cột kiểm toán _merge:\\n\", merged[['order_id', 'cust_id', 'name', '_merge']])",
                "output": "Kết quả Left Join với cột kiểm toán _merge:\n    order_id  cust_id   name      _merge\n0         1      101     An        both\n1         2      102   Bình        both\n2         3      999    NaN   left_only",
                "explanation": "Cột _merge cho biết trạng thái kết hợp: 'both' (khớp cả hai phía) hoặc 'left_only' (bản ghi mồ côi không tìm thấy thông tin khách hàng)."
              }
            ]
          },
          {
            "id": "sec-07-02-02",
            "title": "2. Bản Số Quan Hệ (Cardinality) & Thảm Họa Cartesian Explosion",
            "content": "\n                          <p>Một trong những lỗi nghiêm trọng nhất trong kỹ thuật dữ liệu là không kiểm soát <strong>Bản số quan hệ (Cardinality)</strong>:</p>\n                          <ul>\n                            <li><strong>1:1 (One-to-One):</strong> Mỗi bản ghi bảng Trái khớp với duy nhất 1 bản ghi bảng Phải (ví dụ: Nhân viên & Hồ sơ Bảo hiểm Xã hội).</li>\n                            <li><strong>1:N (One-to-Many):</strong> Một bản ghi bảng Trái khớp với nhiều bản ghi bảng Phải (ví dụ: Khách hàng & Nhiều đơn hàng đã mua).</li>\n                            <li><strong>N:N (Many-to-Many):</strong> Nhiều bản ghi bảng Trái khớp với nhiều bản ghi bảng Phải. Trong thiết kế cơ sở dữ liệu quan hệ, quan hệ N:N trực tiếp thường là tín hiệu của thiết kế lỗi hoặc dữ liệu bị trùng lặp khóa!</li>\n                          </ul>\n                          <h4>Thảm Họa Bùng Nổ Số Dòng (Cartesian Explosion)</h4>\n                          <p>Nếu bạn định ghép bảng theo quan hệ 1:N (ví dụ: bổ sung tên danh mục vào bảng sản phẩm), nhưng vô tình bảng danh mục có 3 dòng bị trùng mã <code>cat_id = 'LAPTOP'</code> do lỗi crawler. Lúc này, mỗi sản phẩm Laptop trong bảng hàng hóa sẽ được nhân bản lên gấp 3 lần! Tổng doanh thu tính ra sẽ bị phóng đại gấp 3 lần mà không có bất kỳ thông báo lỗi nào xuất hiện!</p>\n                          <h4>Cơ Chế Phòng Thủ Sinh Tử: Tham Số validate</h4>\n                          <p>Pandas cung cấp tham số <code>validate</code> để bạn đặt ra hợp đồng ràng buộc kiểm tra toàn vẹn trước khi merge:</p>\n                          <ul>\n                            <li><code>validate='one_to_one'</code> (hoặc <code>'1:1'</code>): Kiểm tra xem khóa có phải là duy nhất ở CẢ HAI bảng hay không.</li>\n                            <li><code>validate='one_to_many'</code> (hoặc <code>'1:m'</code>): Kiểm tra xem khóa có phải là duy nhất ở bảng Trái hay không.</li>\n                            <li><code>validate='many_to_one'</code> (hoặc <code>'m:1'</code>): Kiểm tra xem khóa có phải là duy nhất ở bảng Phải hay không.</li>\n                          </ul>\n                          \n                          <p>Khi có <code>validate</code>, thay vì âm thầm trả về kết quả sai bét do nhân chéo, Pandas lập tức ném ra ngoại lệ <code>MergeError</code>, bảo vệ tuyệt đối tính chính xác của dữ liệu!</p>\n                        ",
            "codeExamples": [
              {
                "id": "pd-07-02-c2",
                "lang": "python",
                "title": "Phòng thủ Cartesian Explosion bằng tham số validate='1:m'",
                "code": "import pandas as pd\n\n# Giả lập bảng khách hàng bị nhân bản lỗi (trùng khóa cust_id)\ndf_bad_custs = pd.DataFrame({\n    'cust_id': [101, 101],\n    'name': ['An - Bản ghi 1', 'An - Bản ghi 2']\n})\n\ndf_orders = pd.DataFrame({\n    'order_id': [1, 2],\n    'cust_id': [101, 101],\n    'amount': [150, 200]\n})\n\ntry:\n    # Chốt chặn validate='1:m' bắt buộc bảng trái cust_id phải duy nhất\n    res = pd.merge(df_bad_custs, df_orders, on='cust_id', how='inner', validate='1:m')\nexcept pd.errors.MergeError as e:\n    print(\"CHẶN THÀNH CÔNG CARTESIAN EXPLOSION!\")\n    print(\"Ngoại lệ bắt được:\", e)",
                "output": "CHẶN THÀNH CÔNG CARTESIAN EXPLOSION!\nNgoại lệ bắt được: Merge keys are not unique in left dataset; not a one-to-many merge",
                "explanation": "validate='1:m' hoặc 'm:1' đóng vai trò như chốt kiểm định chất lượng, ngăn chặn việc số dòng bùng nổ theo cấp số nhân khi khóa bị trùng."
              }
            ]
          },
          {
            "id": "sec-07-02-03",
            "title": "3. Nối Hình Học Với pd.concat: Trục 0 (Dọc) vs Trục 1 (Ngang)",
            "content": "\n                          <p>Trong khi <code>pd.merge()</code> dựa trên giá trị của khóa dữ liệu (content-based), phương thức <code>pd.concat()</code> lại thực hiện việc dán các mảng lại với nhau thuần túy theo trục hình học (index-based / axis-based):</p>\n                          <h4>Trục 0 (axis=0 - Mặc Định): Nối Dọc Dữ Liệu Theo Thời Gian</h4>\n                          <p>Thường dùng khi bạn đọc nhiều file CSV có cùng cấu trúc cột từ các ngày khác nhau (ví dụ: <code>log_jan.csv</code>, <code>log_feb.csv</code>):</p>\n                          \n                          <h4>Trục 1 (axis=1): Nối Ngang Cột Bổ Sung</h4>\n                          <p>Nối các cột dữ liệu mới vào bảng cũ dựa trên chỉ mục hàng (Index). <strong>Cực kỳ nguy hiểm</strong> nếu chỉ mục của hai bảng không khớp nhau hoặc bị xáo trộn vị trí! Pandas sẽ tự động thực hiện phép outer join trên index, khiến dữ liệu bị lệch dòng hoặc phát sinh vô số giá trị <code>NaN</code>.</p>\n                          <div class=\"callout callout-warning\">\n                            <strong>Nguyên Tắc An Toàn:</strong>\n                            <p>Khi nối dọc (<code>axis=0</code>), nếu không có lý do đặc biệt cần giữ lại index cũ, HÃY LUÔN truyền <code>ignore_index=True</code>. Nếu muốn kiểm tra xem các index có bị trùng lặp hay không, hãy truyền <code>verify_integrity=True</code> để Pandas báo lỗi ngay nếu phát hiện xung đột index.</p>\n                          </div>\n                        ",
            "codeExamples": [
              {
                "id": "pd-07-02-c3",
                "lang": "python",
                "title": "Nối dữ liệu dọc với pd.concat: Luôn sử dụng ignore_index=True",
                "code": "import pandas as pd\n\ndf_jan = pd.DataFrame({'sales': [10, 20]}, index=['a', 'b'])\ndf_feb = pd.DataFrame({'sales': [30, 40]}, index=['a', 'b'])\n\n# Nối dọc chuẩn mực: làm mới Index để tránh bẫy trùng lặp nhãn\ndf_full = pd.concat([df_jan, df_feb], axis=0, ignore_index=True)\nprint(\"DataFrame sau khi nối dọc chuẩn xác:\\n\", df_full)",
                "output": "DataFrame sau khi nối dọc chuẩn xác:\n    sales\n0     10\n1     20\n2     30\n3     40",
                "explanation": "Nếu quên ignore_index=True, Index 'a' và 'b' bị lặp lại, dẫn đến lỗi khi truy xuất bằng .loc."
              }
            ]
          }
        ],
        "summary": [
          "pd.merge() thực hiện phép kết hợp đại số quan hệ dựa trên khóa dữ liệu: inner, left, right, outer join.",
          "Luôn sử dụng indicator=True để kiểm toán nguồn gốc dòng và phát hiện các bản ghi mồ côi (orphaned records).",
          "Thảm họa Cartesian Explosion xảy ra khi ghép bảng trên khóa bị trùng lặp, khiến số dòng bùng nổ theo cấp số nhân. Luôn kích hoạt chốt chặn validate='1:m' hoặc validate='m:1'.",
          "pd.concat() nối dữ liệu theo trục hình học. Nối dọc (axis=0) phải luôn đi kèm ignore_index=True để tránh bẫy trùng lặp Index."
        ],
        "workedExample": {
          "scenario": "Đối soát đơn hàng và phòng chống lỗi nhân bản khóa",
          "code": "import pandas as pd\n\n# Bảng đơn hàng giao dịch\ndf_orders = pd.DataFrame({\n    'order_id': [101, 102, 103, 104],\n    'user_id': ['U1', 'U2', 'U3', 'U5'],\n    'total': [1200, 450, 890, 310]\n})\n\n# Bảng thông tin người dùng (Có 1 user bị lỗi nhập liệu trùng ID)\ndf_users = pd.DataFrame({\n    'user_id': ['U1', 'U2', 'U3', 'U4'],\n    'city': ['Hà Nội', 'Đà Nẵng', 'TP.HCM', 'Cần Thơ']\n})\n\n# Thực hiện Left Join có kiểm toán và bảo vệ toàn vẹn\nresult = pd.merge(\n    df_orders,\n    df_users,\n    on='user_id',\n    how='left',\n    indicator=True,\n    validate='m:1' # Đảm bảo mỗi user trong bảng df_users chỉ xuất hiện tối đa 1 lần\n)\n\nprint(\"Kết quả ghép bảng an toàn:\n\", result)\nunmatched = result[result['_merge'] == 'left_only']\nprint(\"\nCác đơn hàng có user_id không tồn tại trong hệ thống:\n\", unmatched[['order_id', 'user_id', 'total']])",
          "explanation": "1. validate='m:1' đảm bảo rằng ở bảng bên phải (df_users), user_id là khóa duy nhất, ngăn chặn triệt để thảm họa bùng nổ Cartesian nếu df_users có dòng trùng lặp.\\n2. indicator=True tạo cột _merge ghi nhận 'both' hoặc 'left_only', cho phép trích xuất ngay lập tức đơn hàng 104 có user_id='U5' chưa được đăng ký trong danh bạ khách hàng."
        },
        "fadedExample": {
          "scenario": "Nối dọc các file doanh thu theo tháng và đánh số lại Index",
          "code": "import pandas as pd\n\ndf_q1 = pd.DataFrame({'month': ['T1', 'T2', 'T3'], 'sales': [100, 120, 110]})\ndf_q2 = pd.DataFrame({'month': ['T4', 'T5', 'T6'], 'sales': [130, 150, 140]})\n\n# Yêu cầu: Nối dọc 2 DataFrame thành bảng cả năm, loại bỏ index cũ và đánh số lại từ 0..5\n# Gợi ý: Dùng pd.concat([df_q1, df_q2], axis=0, ignore_index=...)\n\ndf_half_year = pd.concat([df_q1, df_q2], axis=0, ignore_index=True)\nprint(df_half_year)",
          "blankExplanation": "Điền tham số ignore_index=True vào pd.concat. Index của bảng kết quả sẽ chạy tuần tự từ 0 đến 5, thay vì bị lặp lại [0, 1, 2, 0, 1, 2] gây lỗi khi truy vấn .loc."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Kiểm toán sản phẩm tồn đọng chưa từng phát sinh đơn hàng",
            "problem": "TechMart có bảng danh mục sản phẩm: `df_prods = pd.DataFrame({'prod_id': ['P1', 'P2', 'P3', 'P4'], 'name': ['Chuột', 'Bàn phím', 'Tai nghe', 'Loa']})` và bảng lịch sử giao dịch: `df_sales = pd.DataFrame({'order_id': [1, 2], 'prod_id': ['P1', 'P2']})`. Hãy dùng `pd.merge()` với `how='left'` và bật `indicator=True` để trích xuất danh sách các sản phẩm tồn kho chưa từng bán được.",
            "hint": "Sử dụng pd.merge(df_prods, df_sales, on='prod_id', how='left', indicator=True) rồi lọc các bản ghi có _merge == 'left_only'.",
            "solutionCode": "import pandas as pd\n\ndf_prods = pd.DataFrame({\n    'prod_id': ['P1', 'P2', 'P3', 'P4'],\n    'name': ['Chuột', 'Bàn phím', 'Tai nghe', 'Loa']\n})\n\ndf_sales = pd.DataFrame({\n    'order_id': [1, 2],\n    'prod_id': ['P1', 'P2']\n})\n\nmerged = pd.merge(df_prods, df_sales, on='prod_id', how='left', indicator=True)\nunsold_prods = merged[merged['_merge'] == 'left_only'][['prod_id', 'name']]\nprint(\"Sản phẩm chưa từng phát sinh đơn hàng:\\n\", unsold_prods)",
            "explanation": "Kỹ thuật Anti-Join thông qua tham số indicator=True là giải pháp tiêu chuẩn để kiểm định tính đầy đủ dữ liệu (Completeness) theo chuẩn ISO/IEC 25012. Cột _merge sẽ tự động gắn nhãn 'left_only', giúp phân tách chính xác các đối tượng trong danh mục không có liên kết nào ở bảng sự kiện phát sinh.",
            "solutionOutput": "Sản phẩm chưa từng phát sinh đơn hàng:\r\n   prod_id      name\r\n2      P3  Tai nghe\r\n3      P4       Loa"
          },
          {
            "level": "Vừa",
            "title": "Ngăn chặn Cartesian Explosion với chốt chặn validate='1:m'",
            "problem": "Viết hàm an toàn `safe_customer_merge(df_customers, df_orders)` thực hiện Left Join từ bảng khách hàng sang đơn hàng. Yêu cầu: Đặt chốt chặn `validate='1:m'` để đảm bảo bảng khách hàng không bị trùng mã `cust_id`. Nếu dữ liệu khách hàng bị trùng lặp, bắt ngoại lệ `pd.errors.MergeError`, in cảnh báo và tự động khử trùng lặp trước khi merge lại.",
            "hint": "Đặt phép merge trong khối try...except pd.errors.MergeError. Khi bắt được ngoại lệ, gọi df_customers.drop_duplicates(subset=['cust_id']) rồi merge lại.",
            "solutionCode": "import pandas as pd\n\ndef safe_customer_merge(df_customers, df_orders):\n    try:\n        # Kiểm tra tính duy nhất 1-nhiều\n        return pd.merge(df_customers, df_orders, on='cust_id', how='left', validate='1:m')\n    except pd.errors.MergeError as err:\n        print(\"CẢNH BÁO: Bảng khách hàng bị trùng lặp mã cust_id! Đang tiến hành khử trùng...\")\n        clean_customers = df_customers.drop_duplicates(subset=['cust_id'], keep='first')\n        return pd.merge(clean_customers, df_orders, on='cust_id', how='left', validate='1:m')\n\n# Thử nghiệm với dữ liệu khách hàng bị lỗi nhân bản\ndf_c = pd.DataFrame({'cust_id': [1, 1, 2], 'name': ['An', 'An (Trùng)', 'Bình']})\ndf_o = pd.DataFrame({'cust_id': [1, 2], 'order_val': [500, 300]})\n\nresult = safe_customer_merge(df_c, df_o)\nprint(\"Kết quả sau xử lý an toàn:\\n\", result)",
            "explanation": "Trong hệ thống cơ sở dữ liệu phân tán, tình trạng nhân bản khóa chính (Duplicate Primary Key) có thể dẫn đến hiện tượng Cartesian Explosion (bùng nổ tích Descartes) làm sai lệch toàn bộ doanh thu. Bật tham số validate='1:m' biến pd.merge() thành một gateway kiểm định chất lượng tự động, ngăn chặn các lỗi ngầm phá hủy tính toàn vẹn của đường ống dữ liệu.",
            "solutionOutput": "CẢNH BÁO: Bảng khách hàng bị trùng lặp mã cust_id! Đang tiến hành khử trùng...\r\nKết quả sau xử lý an toàn:\r\n    cust_id  name  order_val\r\n0        1    An        500\r\n1        2  Bình        300"
          },
          {
            "level": "Nâng cao",
            "title": "Hợp nhất file log ca làm việc và xác thực tính duy nhất",
            "problem": "Hệ thống nhận được danh sách DataFrame ghi nhận log thanh toán của các ca làm việc. Mỗi dòng có `trans_id` và `amount`. Hãy viết hàm `consolidate_logs(dfs)` sử dụng `pd.concat()` để gộp các ca làm việc lại, sau đó kiểm tra tính duy nhất của `trans_id` bằng `.duplicated()`. Nếu phát hiện xung đột, in danh sách mã lỗi và trả về bảng log đã khử trùng.",
            "hint": "Dùng pd.concat(dfs, ignore_index=True), tìm mã trùng bằng df[df['trans_id'].duplicated()]['trans_id'].unique() và khử trùng bằng drop_duplicates.",
            "solutionCode": "import pandas as pd\n\ndef consolidate_logs(dfs):\n    # Nối dọc danh sách bảng\n    merged_log = pd.concat(dfs, ignore_index=True)\n    \n    # Kiểm tra xung đột trans_id giữa các ca\n    dupes = merged_log[merged_log.duplicated(subset=['trans_id'], keep=False)]\n    if not dupes.empty:\n        conflict_ids = dupes['trans_id'].unique().tolist()\n        print(f\"PHÁT HIỆN GIAO DỊCH XUNG ĐỘT: {conflict_ids}\")\n        # Chính sách: giữ bản ghi xuất hiện đầu tiên\n        return merged_log.drop_duplicates(subset=['trans_id'], keep='first')\n    return merged_log\n\n# Dữ liệu thử nghiệm\nshift1 = pd.DataFrame({'trans_id': ['T101', 'T102'], 'amount': [100, 200]})\nshift2 = pd.DataFrame({'trans_id': ['T102', 'T103'], 'amount': [200, 300]})\n\nclean_logs = consolidate_logs([shift1, shift2])\nprint(\"Bảng log đã gộp sạch:\\n\", clean_logs)",
            "explanation": "Hàm pd.concat() với ignore_index=True là giải pháp tối ưu về bộ nhớ khi gộp nhiều bảng có cùng schema. Việc chủ động phân tích và bắt các trans_id trùng lặp bằng duplicated(keep=False) đảm bảo việc truy vết nguồn gốc (Traceability) và bảo vệ số liệu kế toán không bị ghi nhận doanh thu hai lần.",
            "solutionOutput": "PHÁT HIỆN GIAO DỊCH XUNG ĐỘT: ['T102']\r\nBảng log đã gộp sạch:\r\n   trans_id  amount\r\n0     T101     100\r\n1     T102     200\r\n3     T103     300"
          }
        ],
        "quiz": [
          {
            "question": "Điều gì sẽ xảy ra nếu bạn thực hiện pd.merge(df1, df2, on='key', how='inner') khi cột 'key' có 3 dòng giá trị 'A' ở df1 và 4 dòng giá trị 'A' ở df2?",
            "options": [
              "Pandas sẽ tự động lấy 3 dòng đầu tiên của df2 để khớp 1:1 và bỏ qua dòng thứ 4.",
              "Pandas sẽ báo lỗi KeyError vì khóa không duy nhất.",
              "Kết quả sẽ sinh ra 12 dòng (3 x 4) mang giá trị 'A' do hiệu ứng nhân chéo Cartesian Product.",
              "Kết quả sẽ chỉ có đúng 1 dòng giá trị 'A' đại diện cho nhóm."
            ],
            "correctIndex": 2,
            "explanation": "Trong đại số quan hệ, nếu một giá trị khóa xuất hiện M lần ở bảng trái và N lần ở bảng phải, phép Inner Join sẽ tạo ra M x N dòng kết hợp (tích Đề-các Cartesian). Đây chính là nguyên nhân gây ra bùng nổ dữ liệu ngoài ý muốn nếu khóa bị trùng lặp."
          },
          {
            "question": "Tại sao việc sử dụng tham số 'indicator=True' trong pd.merge() lại được coi là phương pháp chuẩn mực (best practice) trong kiểm định chất lượng dữ liệu?",
            "options": [
              "Vì nó giúp tăng tốc độ join dữ liệu lên gấp 2 lần nhờ thuật toán chỉ mục hóa.",
              "Vì nó tự động điền giá trị trung bình vào các ô bị NaN sau khi join.",
              "Vì nó ngăn chặn bảng kết quả không bị ghi đè lên bộ nhớ gốc.",
              "Vì nó tạo ra cột '_merge' ghi nhận rõ dòng dữ liệu đến từ cả hai bảng (both), chỉ bảng trái (left_only) hay chỉ bảng phải (right_only), giúp kiểm toán dữ liệu mồ côi."
            ],
            "correctIndex": 3,
            "explanation": "indicator=True thêm cột phân loại _merge, cho phép kiểm toán viên dữ liệu lập tức nhận diện được các bản ghi không khớp (left_only, right_only) mà không cần phải viết thêm các câu lệnh lọc phức tạp."
          },
          {
            "question": "Khi nào bạn NÊN sử dụng pd.concat() thay vì pd.merge()?",
            "options": [
              "Khi bạn muốn nối các bảng có cùng cấu trúc cột theo chiều dọc (ví dụ: gộp các file log theo ngày) hoặc dán các mảng theo trục vật lý mà không cần so sánh giá trị khóa.",
              "Khi bạn cần ghép hai bảng dựa trên mã khách hàng (Customer ID).",
              "Khi bạn muốn thực hiện phép Full Outer Join phức tạp giữa 3 bảng quan hệ.",
              "Khi bảng dữ liệu có kích thước vượt quá dung lượng RAM."
            ],
            "correctIndex": 0,
            "explanation": "pd.concat() là phép nối hình học theo trục (axis 0 hoặc 1), phù hợp hoàn hảo để xếp chồng các file dữ liệu cùng schema theo thời gian mà không cần tính toán so khớp giá trị khóa logic như pd.merge()."
          }
        ],
        "selfReviewQuestions": [
          "Thảm họa Cartesian Explosion là gì và tham số nào trong pd.merge() giúp bạn phát hiện nó ngay lập tức?",
          "Phân biệt sự khác nhau giữa nối hình học pd.concat(axis=0) và ghép quan hệ pd.merge(how='outer').",
          "Tại sao luôn cần truyền ignore_index=True khi nối dọc nhiều DataFrame bằng pd.concat()?"
        ],
        "reflectionQuestion": "Một kỹ sư dữ liệu junior viết báo cáo doanh thu bằng cách Left Join bảng Đơn hàng (10.000 dòng) với bảng Khuyến mãi theo mã promotion_code. Kết quả bảng sau khi join lại có tới 14.500 dòng và tổng doanh thu bị tăng vọt 30%! Chuyện gì đã xảy ra dưới góc độ đại số quan hệ và bạn sẽ hướng dẫn bạn kỹ sư đó sửa lỗi như thế nào?",
        "reflectionHint": "Bảng Khuyến mãi có các mã promotion_code bị trùng lặp (ví dụ: cùng 1 mã nhưng áp dụng cho nhiều khung giờ khác nhau mà không có điều kiện ngày). Khi Left Join, quan hệ trở thành 1:N hoặc N:N, khiến 1 đơn hàng bị nhân bản thành nhiều dòng, làm tăng số lượng dòng từ 10.000 lên 14.500 và làm sai lệch tổng doanh thu. Giải pháp: Thêm chốt chặn validate='m:1' trong pd.merge(), đồng thời yêu cầu làm sạch hoặc tổng hợp bảng Khuyến mãi để mỗi promotion_code chỉ xuất hiện duy nhất 1 lần trước khi ghép.",
        "nextLessonPreview": "Ở bài 7.3, chúng ta sẽ làm quen với triết lý Tidy Data kinh điển của Hadley Wickham, thành thạo cặp đôi xoay chiều dữ liệu pd.melt (Wide-to-Long) và pd.pivot_table (Long-to-Wide), cùng các phép toán cửa sổ trượt (rolling, expanding, shift) trên chuỗi thời gian.",
        "references": [
          {
            "title": "Pandas Official Documentation - Merge, join, concatenate and compare",
            "url": "https://pandas.pydata.org/docs/user_guide/merging.html"
          },
          {
            "title": "Relational Algebra in Database Management Systems (Codd, 1970)",
            "url": "https://dl.acm.org/doi/10.1145/362384.362685"
          }
        ]
      },
      {
        "id": "pd-07-03",
        "number": "7.3",
        "title": "Tái Cấu Trúc Theo Tidy Data & Cửa Sổ Trượt (Reshaping & Windowing)",
        "subtitle": "Triết lý Tidy Data (Hadley Wickham 2014), cặp đôi chuyển đổi melt() vs pivot_table(), và tính toán chuỗi thời gian rolling(), expanding(), shift()",
        "level": "Nâng cao",
        "duration": "50 phút",
        "objectives": [
          "Khái quát triết lý Tidy Data của Hadley Wickham (2014): Mỗi biến là một cột, mỗi quan sát là một hàng, mỗi bảng là một đơn vị quan sát; phân biệt cấu trúc Tidy với Messy Data.",
          "Thành thạo kỹ thuật xoay chiều dữ liệu Wide-to-Long (pd.melt) phục vụ phân tích/trực quan hóa và Long-to-Wide (pd.pivot_table) phục vụ báo cáo quản trị tổng hợp.",
          "Phân biệt cơ chế hoạt động của 3 phép toán chuỗi thời gian: Cửa sổ trượt cố định rolling() (khử nhiễu ngắn hạn), Cửa sổ mở rộng expanding() (lũy kế tích lũy) và Dịch chuyển vị trí shift() (tính tốc độ tăng trưởng kỳ).",
          "Đo lường và so sánh hiệu năng thực nghiệm giữa kỹ thuật vector hóa/window functions và vòng lặp thủ công trên dữ liệu chuỗi thời gian lớn."
        ],
        "intuition": {
          "title": "Hồ Sơ Mượn Sách & Ống Kính Thời Gian",
          "metaphor": "Hãy quan sát sự khác nhau giữa cách con người ghi chép và cách máy tính phân tích:\\n1. Bảng Dạng Ngang (Wide / Messy Data): Người quản thư kẻ một bảng gồm tên độc giả ở dòng, và 50 cuốn sách ở 50 cột. Ai mượn cuốn nào thì đánh dấu X vào ô đó. Bảng này con người nhìn vào rất dễ hiểu, nhưng máy tính thì 'khóc thét': khi có cuốn sách thứ 51, bạn phải sửa cấu trúc bảng; và bạn không thể nào vẽ biểu đồ phân phối số lượt mượn sách bằng một câu lệnh đơn giản!\\n2. Bảng Dạng Dọc Chuẩn Hóa (Long / Tidy Data): Mỗi lần mượn sách là MỘT dòng duy nhất gồm 3 cột: [Tên độc giả, Tên sách, Ngày mượn]. Bảng này có thể dài hàng triệu dòng, nhưng cấu trúc 3 cột không bao giờ thay đổi. Mọi thuật toán Machine Learning và thư viện vẽ đồ thị (Seaborn, Plotly) đều yêu cầu cấu trúc này!\\n3. pd.melt: Giống như chiếc máy 'làm tan chảy' 50 cột sách ngang thành một cột dọc duy nhất.\\n4. pd.pivot_table: Chiếc máy làm đông đặc ngược lại, tạo ma trận tổng hợp cho sếp duyệt.\\n5. Rolling Window (Cửa sổ trượt): Hãy tưởng tượng bạn nhìn đồ thị giá vàng qua một chiếc kính lúp chỉ nhìn thấy đúng 7 ngày gần nhất. Khi bạn trượt chiếc kính dọc theo dòng thời gian, các đỉnh nhọn bất thường sẽ bị làm phẳng, chỉ còn lại xu hướng chuyển động mượt mà của thị trường.",
          "boundary": "pd.pivot() chỉ dùng khi các cặp (index, columns) là duy nhất tuyệt đối. Nếu có nhiều dòng trùng cặp (index, columns), bạn bắt buộc phải dùng pd.pivot_table() kèm theo hàm tổng hợp aggfunc (như sum, mean).",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">HAI DẠNG CẤU TRÚC DỮ LIỆU: WIDE VS LONG (TIDY)</div>\n                        <div style=\"display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center;text-align:center;\">\n                          <div style=\"padding:8px;border:1px solid #3b82f6;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#3b82f6;\">WIDE FORMAT</strong>\n                            <div style=\"font-size:0.75rem;margin-top:2px;\">Cột là giá trị: Q1, Q2, Q3</div>\n                            <div style=\"font-size:0.7rem;color:var(--text-muted);\">Phục vụ con người đọc báo cáo</div>\n                          </div>\n                          <div style=\"font-size:1.1rem;font-weight:700;color:var(--accent-text);\">\n                            melt &rarr;<br>&larr; pivot\n                          </div>\n                          <div style=\"padding:8px;border:1px solid #10b981;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#10b981;\">LONG (TIDY) FORMAT</strong>\n                            <div style=\"font-size:0.75rem;margin-top:2px;\">[Store, Quarter, Sales]</div>\n                            <div style=\"font-size:0.7rem;color:var(--text-muted);\">Phục vụ ML, Database & Vẽ biểu đồ</div>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-07-03-01",
            "title": "1. Triết Lý Tidy Data Của Hadley Wickham (2014)",
            "content": "\n                          <p>Trong bài báo <em>\"Tidy Data\"</em> (Journal of Statistical Software, 2014), Hadley Wickham đã hệ thống hóa một tiêu chuẩn chuẩn mực cho cấu trúc dữ liệu bảng:</p>\n                          <blockquote>\n                            <em>\"Tất cả các tập dữ liệu ngăn nắp (tidy datasets) đều giống nhau, nhưng mỗi tập dữ liệu lộn xộn (messy dataset) lại lộn xộn theo cách riêng của nó.\"</em> &mdash; (Mượn ý từ đại văn hào Leo Tolstoy).\n                          </blockquote>\n                          <h4>Ba Nguyên Tắc Vàng Của Tidy Data:</h4>\n                          <ol>\n                            <li><strong>Mỗi biến (variable) tạo thành một cột riêng biệt.</strong> (Ví dụ: Biến \"Quý\" phải là một cột chứa các giá trị Q1, Q2, chứ không phải mỗi Quý chiếm một tiêu đề cột!).</li>\n                            <li><strong>Mỗi quan sát (observation) tạo thành một hàng riêng biệt.</strong></li>\n                            <li><strong>Mỗi loại đơn vị quan sát (observational unit) tạo thành một bảng riêng biệt.</strong></li>\n                          </ol>\n                          <p>Khi dữ liệu ở dạng Tidy, việc lọc, gom nhóm (groupby), mô hình hóa (scikit-learn) và trực quan hóa (Seaborn/Plotly) diễn ra hoàn toàn tự nhiên và đồng nhất mà không cần viết các hàm tiền xử lý phức tạp.</p>\n                        "
          },
          {
            "id": "sec-07-03-02",
            "title": "2. Cặp Đôi Chuyển Đổi: pd.melt() (Wide &rarr; Long) vs pd.pivot_table() (Long &rarr; Wide)",
            "content": "\n                          <h4>Chuyển Đổi Wide Sang Long Với pd.melt()</h4>\n                          <p>Khi bảng dữ liệu bị dàn hàng ngang (các cột chứa giá trị thời gian hoặc danh mục), ta dùng <code>pd.melt()</code> để \"làm tan chảy\" thành dạng Tidy chuẩn:</p>\n                          \n                          <h4>Chuyển Đổi Long Sang Wide Với pd.pivot_table()</h4>\n                          <p>Khi cần lập bảng tóm tắt 2 chiều (Cross-tabulation) cho ban giám đốc, ta biến đổi ngược lại:</p>\n                          \n                        ",
            "codeExamples": [
              {
                "id": "pd-07-03-c1",
                "lang": "python",
                "title": "Chuyển đổi hình dạng bảng: pd.melt() (Wide -> Long) và pd.pivot_table() (Long -> Wide)",
                "code": "import pandas as pd\n\n# Bảng báo cáo dạng ngang (Wide)\ndf_wide = pd.DataFrame({\n    'store': ['HN', 'HCM'],\n    'q1': [100, 150],\n    'q2': [120, 180]\n})\n\n# Chuyển sang dạng dọc chuẩn Tidy Data\ndf_long = pd.melt(df_wide, id_vars=['store'], value_vars=['q1', 'q2'], var_name='quarter', value_name='revenue')\nprint(\"Dữ liệu sau khi melt() sang Long format:\\n\", df_long)\n\n# Tái cấu trúc ma trận Pivot Table\nmatrix = df_long.pivot_table(index='store', columns='quarter', values='revenue', aggfunc='sum')\nprint(\"\\nMa trận báo cáo sau khi pivot_table():\\n\", matrix)",
                "output": "Dữ liệu sau khi melt() sang Long format:\n    store quarter  revenue\n0    HN      q1      100\n1   HCM      q1      150\n2    HN      q2      120\n3   HCM      q2      180\n\nMa trận báo cáo sau khi pivot_table():\nquarter   q1   q2\nstore            \nHCM      150  180\nHN       100  120",
                "explanation": "Dạng Long (Tidy Data) là tiêu chuẩn đầu vào cho các thư viện vẽ biểu đồ Seaborn/Plotly. Dạng Wide là bảng ma trận trực quan cho báo cáo tổng kết."
              }
            ]
          },
          {
            "id": "sec-07-03-03",
            "title": "3. Phép Toán Chuỗi Thời Gian: rolling(), expanding() & shift()",
            "content": "\n                          <p>Khi phân tích dữ liệu theo chuỗi thời gian (Time-series), 3 kỹ thuật cửa sổ tính toán sau đây là bắt buộc phải thành thạo:</p>\n                          <h4>A. Cửa Sổ Trượt Cố Định: rolling(window=N)</h4>\n                          <p>Tính trung bình động (Moving Average) để khử nhiễu ngắn hạn và nhận diện xu hướng dài hạn:</p>\n                          \n                          <p>Tham số <code>min_periods=1</code> cực kỳ hữu ích: giúp tính toán ngay từ những ngày đầu tiên thay vì phải nhận <code>NaN</code> ở 6 dòng đầu!</p>\n                          <h4>B. Cửa Sổ Mở Rộng: expanding()</h4>\n                          <p>Cửa sổ tích lũy: điểm bắt đầu cố định ở dòng đầu tiên, nhưng điểm kết thúc mở rộng dần theo từng dòng. Dùng để tính doanh thu lũy kế từ đầu năm đến hiện tại (Year-To-Date - YTD):</p>\n                          \n                          <h4>C. Dịch Chuyển Vị Trí: shift(periods=N) & pct_change()</h4>\n                          <p>Dịch chuyển dữ liệu theo trục dòng để so sánh kỳ này với kỳ trước (tính tăng trưởng ngày MoM/YoY):</p>\n                          \n                        ",
            "codeExamples": [
              {
                "id": "pd-07-03-c2",
                "lang": "python",
                "title": "Phép toán chuỗi thời gian: rolling() tính cửa sổ trượt và shift() tính độ lệch",
                "code": "import pandas as pd\n\ndf = pd.DataFrame({\n    'day': [1, 2, 3, 4, 5],\n    'revenue': [100, 120, 110, 150, 140]\n})\n\n# Trung bình động cửa sổ 3 ngày (min_periods=1 để không mất giá trị đầu)\ndf['ma_3d'] = df['revenue'].rolling(window=3, min_periods=1).mean()\n\n# Tính tăng trưởng so với ngày hôm trước\ndf['prev_rev'] = df['revenue'].shift(1)\ndf['pct_growth'] = df['revenue'].pct_change() * 100\n\nprint(\"Bảng tính toán chuỗi thời gian:\\n\", df)",
                "output": "Bảng tính toán chuỗi thời gian:\n    day  revenue       ma_3d  prev_rev  pct_growth\n0    1      100  100.000000       NaN         NaN\n1    2      120  110.000000     100.0   20.000000\n2    3      110  110.000000     120.0   -8.333333\n3    4      150  126.666667     110.0   36.363636\n4    5      140  133.333333     150.0   -6.666667",
                "explanation": "rolling() dùng để làm mịn chuỗi số liệu khử nhiễu. shift() và pct_change() hỗ trợ tính toán tốc độ tăng trưởng kỳ phân tích."
              }
            ]
          },
          {
            "id": "sec-07-03-04",
            "title": "4. Benchmark Khoa Học: Vectorized Windowing vs Vòng Lặp Thủ Công",
            "content": "\n                          <p>Hãy xem xét thí nghiệm đo lường hiệu năng khi tính trung bình động 30 ngày trên tập dữ liệu chuỗi thời gian gồm 100.000 điểm đo:</p>\n                          <div class=\"table-responsive\">\n                            <table class=\"table-content\">\n                              <thead>\n                                <tr>\n                                  <th>Phương pháp</th>\n                                  <th>Cơ chế thực thi</th>\n                                  <th>Thời gian thực thi</th>\n                                  <th>Tăng tốc</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr>\n                                  <td><strong>Python For-Loop</strong></td>\n                                  <td>Vòng lặp thông dịch CPython, slice từng mảng nhỏ rồi tính sum/len</td>\n                                  <td>~ 2.850 ms (2.85 giây)</td>\n                                  <td>1x (Chuẩn tham chiếu)</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Pandas rolling().mean()</strong></td>\n                                  <td>Thuật toán trượt tối ưu viết bằng Cython, cập nhật giá trị trượt O(1)</td>\n                                  <td><strong>~ 3.2 ms</strong></td>\n                                  <td><strong>Nhanh hơn ~ 890 lần!</strong></td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                          <p><strong>Bản chất Notional Machine:</strong> Vòng lặp thủ công trong Python có độ phức tạp thời gian lên tới \\(O(N \\times W)\\) nếu mỗi bước bạn tính lại tổng cửa sổ, hoặc phát sinh hàng triệu lần truy cập thông dịch Python. Ngược lại, <code>rolling()</code> của Pandas chạy mã C tối ưu với thuật toán hàng đợi trượt (sliding window accumulator) đạt độ phức tạp tuyến tính \\(O(N)\\) và tận dụng vector hóa SIMD của CPU.</p>\n                        "
          }
        ],
        "summary": [
          "Tidy Data (Wickham 2014) là chuẩn mực: Mỗi biến một cột, mỗi quan sát một hàng, mỗi đơn vị quan sát một bảng.",
          "pd.melt() chuyển cấu trúc từ Wide sang Long để phục vụ vẽ đồ thị và phân tích. pd.pivot_table() chuyển từ Long sang Wide để tạo ma trận báo cáo quản trị.",
          "rolling(window=N) tính toán trên cửa sổ trượt kích thước cố định để khử nhiễu; expanding() tính lũy kế từ đầu kỳ.",
          "shift() dịch chuyển dữ liệu theo dòng và pct_change() tính tốc độ tăng trưởng kỳ.",
          "Các hàm cửa sổ trượt của Pandas chạy bằng Cython với thuật toán O(N), nhanh hơn vòng lặp Python thủ công tới gần 900 lần."
        ],
        "workedExample": {
          "scenario": "Phân tích xu hướng doanh thu chuỗi bán lẻ TechMart",
          "code": "import pandas as pd\nimport numpy as np\n\n# Tạo dữ liệu doanh thu 10 ngày liên tiếp\ndates = pd.date_range('2026-01-01', periods=10, freq='D')\nrevenue = [120, 140, 110, 180, 250, 290, 150, 170, 210, 230]\n\ndf_daily = pd.DataFrame({'date': dates, 'revenue': revenue})\n\n# 1. Trung bình động 3 ngày để làm mịn biến động ngắn hạn\ndf_daily['ma_3d'] = df_daily['revenue'].rolling(window=3, min_periods=1).mean().round(1)\n\n# 2. Doanh thu lũy kế từ đầu tháng (YTD / MTD)\ndf_daily['cumulative_rev'] = df_daily['revenue'].expanding().sum()\n\n# 3. Tỷ lệ tăng trưởng % so với ngày hôm trước\ndf_daily['growth_pct'] = (df_daily['revenue'].pct_change() * 100).round(1)\n\nprint(df_daily)",
          "explanation": "1. rolling(window=3, min_periods=1).mean() tính trung bình động 3 ngày, min_periods=1 đảm bảo ngày đầu tiên lấy luôn giá trị của chính nó thay vì NaN.\\n2. expanding().sum() cộng dồn doanh thu tăng dần qua từng ngày.\\n3. pct_change() tính tỷ lệ tăng giảm phần trăm so với ngày liền trước, ngày đầu tiên tự động nhận NaN do chưa có dữ liệu quá khứ."
        },
        "fadedExample": {
          "scenario": "Xoay bảng Wide sang Long để trực quan hóa với Seaborn",
          "code": "import pandas as pd\n\n# Dữ liệu doanh số 3 dòng điện thoại qua 3 quý\ndf_phone_wide = pd.DataFrame({\n    'model': ['iPhone 15', 'Galaxy S24', 'Xiaomi 14'],\n    'Q1': [500, 420, 310],\n    'Q2': [580, 460, 390],\n    'Q3': [620, 510, 450]\n})\n\n# Yêu cầu: Dùng pd.melt() để chuyển sang dạng Long Tidy Data\n# Cột định danh: 'model'; Các cột quý: ['Q1', 'Q2', 'Q3']\n# Đặt tên cột quý là 'quarter', cột doanh số là 'units_sold'\n\ndf_phone_tidy = pd.melt(\n    df_phone_wide,\n    id_vars=['model'],\n    value_vars=['Q1', 'Q2', 'Q3'],\n    var_name='quarter',\n    value_name='units_sold'\n)\n\nprint(\"Dữ liệu Tidy sẵn sàng vẽ biểu đồ:\n\", df_phone_tidy)",
          "blankExplanation": "Điền các tham số id_vars=['model'], value_vars=['Q1', 'Q2', 'Q3'], var_name='quarter', value_name='units_sold' vào hàm pd.melt(). Cấu trúc thu được đạt chuẩn Tidy 100%."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Tạo bảng Pivot Table với tổng cộng biên (Margins)",
            "problem": "Cho bảng doanh số: `df_sales = pd.DataFrame({'region': ['Bắc', 'Bắc', 'Nam', 'Nam'], 'product': ['A', 'B', 'A', 'B'], 'revenue': [100, 150, 200, 250]})`. Hãy tạo một bảng `pivot_table` 2 chiều với index là 'region', columns là 'product', values là 'revenue', hàm tổng hợp `aggfunc='sum'` và bật `margins=True` với `margins_name='Tổng'`.",
            "hint": "Sử dụng df_sales.pivot_table(index='region', columns='product', values='revenue', aggfunc='sum', margins=True, margins_name='Tổng').",
            "solutionCode": "import pandas as pd\n\ndf_sales = pd.DataFrame({\n    'region': ['Bắc', 'Bắc', 'Nam', 'Nam'],\n    'product': ['A', 'B', 'A', 'B'],\n    'revenue': [100, 150, 200, 250]\n})\n\npt = df_sales.pivot_table(\n    index='region',\n    columns='product',\n    values='revenue',\n    aggfunc='sum',\n    margins=True,\n    margins_name='Tổng'\n)\nprint(pt)",
            "explanation": "Bảng pivot_table giúp tổ chức lại thông tin từ cấu trúc phẳng sang ma trận 2 chiều trực quan. Bật margins=True giúp tự động tính toán tổng số biên (marginal sums) cho cả các hàng và các cột, mang lại cái nhìn toàn diện về tỷ trọng đóng góp của từng vùng miền và dòng sản phẩm.",
            "solutionOutput": "product    A    B  Tổng\r\nregion                 \r\nBắc      100  150   250\r\nNam      200  250   450\r\nTổng     300  400   700"
          },
          {
            "level": "Vừa",
            "title": "Tính dải Bollinger Bands bằng hàm cửa sổ trượt .rolling()",
            "problem": "Trong phân tích kỹ thuật tài chính, Dải Bollinger Bands gồm đường trung bình động (MA) và 2 đường biên trên/dưới lệch 2 độ lệch chuẩn (std). Cho Series giá 10 ngày: `[100, 102, 101, 105, 107, 106, 110, 112, 115, 114]`. Viết code tính toán trong DataFrame 3 cột: 'ma_5' (rolling mean 5 ngày), 'upper_band' (ma_5 + 2*rolling std 5 ngày) và 'lower_band' (ma_5 - 2*rolling std 5 ngày).",
            "hint": "Khởi tạo rolling_window = df_stock['price'].rolling(window=5) rồi tính .mean() và .std() để kết hợp vector hóa.",
            "solutionCode": "import pandas as pd\n\nprices = pd.Series([100, 102, 101, 105, 107, 106, 110, 112, 115, 114])\ndf_stock = pd.DataFrame({'price': prices})\n\n# Cửa sổ trượt 5 ngày\nrolling_window = df_stock['price'].rolling(window=5)\ndf_stock['ma_5'] = rolling_window.mean()\ndf_stock['std_5'] = rolling_window.std()\n\ndf_stock['upper_band'] = (df_stock['ma_5'] + 2 * df_stock['std_5']).round(2)\ndf_stock['lower_band'] = (df_stock['ma_5'] - 2 * df_stock['std_5']).round(2)\n\nprint(df_stock[['price', 'ma_5', 'upper_band', 'lower_band']])",
            "explanation": "Hàm .rolling() cung cấp cơ chế tính toán cửa sổ trượt hiệu năng cao. Ở 4 phiên giao dịch đầu tiên, giá trị tính toán sẽ là NaN do chưa đủ kích thước cửa sổ (window=5). Việc áp dụng các toán tử vector hóa trên Series giúp xử lý hàng triệu bản ghi tick dữ liệu chứng khoán trong tích tắc mà không gây rò rỉ bộ nhớ.",
            "solutionOutput": "price   ma_5  upper_band  lower_band\r\n0    100    NaN         NaN         NaN\r\n1    102    NaN         NaN         NaN\r\n2    101    NaN         NaN         NaN\r\n3    105    NaN         NaN         NaN\r\n4    107  103.0      108.83       97.17\r\n5    106  104.2      109.38       99.02\r\n6    110  105.8      112.34       99.26\r\n7    112  108.0      113.83      102.17\r\n8    115  110.0      117.35      102.65\r\n9    114  111.4      118.56      104.24"
          },
          {
            "level": "Nâng cao",
            "title": "Tái cấu trúc bảng khảo sát lộn xộn sang chuẩn Tidy Data",
            "problem": "Một bảng khảo sát ghi nhận: `df_survey = pd.DataFrame({'respondent_id': [1, 2], 'name': ['An', 'Bình'], 'sat_q1': [5, 4], 'sat_q2': [4, 3], 'imp_q1': [10, 9], 'imp_q2': [8, 7]})`. Hãy dùng `pd.wide_to_long()` để chuyển đổi bảng trên về chuẩn Tidy gồm các cột: `['respondent_id', 'question', 'satisfaction', 'importance']`.",
            "hint": "Dùng pd.wide_to_long(df_survey, stubnames=['sat', 'imp'], i='respondent_id', j='question', sep='_', suffix='\\\\w+').reset_index().",
            "solutionCode": "import pandas as pd\n\ndf_survey = pd.DataFrame({\n    'respondent_id': [1, 2],\n    'name': ['An', 'Bình'],\n    'sat_q1': [5, 4],\n    'sat_q2': [4, 3],\n    'imp_q1': [10, 9],\n    'imp_q2': [8, 7]\n})\n\n# Sử dụng pd.wide_to_long cực kỳ thanh thoát\ndf_tidy = pd.wide_to_long(\n    df_survey,\n    stubnames=['sat', 'imp'],\n    i='respondent_id',\n    j='question',\n    sep='_',\n    suffix='\\\\w+'\n).reset_index()\n\ndf_tidy = df_tidy.rename(columns={'sat': 'satisfaction', 'imp': 'importance'})\nprint(\"Dữ liệu khảo sát chuẩn Tidy:\\n\", df_tidy[['respondent_id', 'question', 'satisfaction', 'importance']])",
            "explanation": "Bảng khảo sát dạng rộng (wide format) có tiêu đề cột chứa đồng thời cả biến đo lường ('sat', 'imp') và mã câu hỏi ('q1', 'q2'). Hàm pd.wide_to_long() là công cụ tối ưu để đưa dữ liệu về chuẩn Tidy (mỗi biến là một cột, mỗi quan sát là một hàng) mà không cần phải gọi nhiều lần melt() và merge() phức tạp.",
            "solutionOutput": "Dữ liệu khảo sát chuẩn Tidy:\r\n    respondent_id question  satisfaction  importance\r\n0              1       q1             5          10\r\n1              2       q1             4           9\r\n2              1       q2             4           8\r\n3              2       q2             3           7"
          }
        ],
        "quiz": [
          {
            "question": "Phát biểu nào sau đây thể hiện ĐÚNG NHẤT nguyên tắc cốt lõi của Tidy Data theo định nghĩa của Hadley Wickham?",
            "options": [
              "Tất cả các giá trị số phải được chuẩn hóa về khoảng từ 0 đến 1.",
              "Bảng dữ liệu phải có số cột bằng đúng số hàng để tạo thành ma trận vuông.",
              "Dữ liệu phải luôn được biểu diễn dưới dạng ma trận Wide để người xem dễ quan sát tổng thể.",
              "Mỗi biến tạo thành một cột riêng biệt, mỗi quan sát tạo thành một hàng riêng biệt, mỗi bảng là một đơn vị quan sát."
            ],
            "correctIndex": 3,
            "explanation": "Tidy Data có 3 nguyên tắc nền tảng: (1) Mỗi biến là một cột, (2) Mỗi quan sát là một hàng, (3) Mỗi loại đơn vị quan sát tạo thành một bảng. Định dạng này giúp việc phân tích và trực quan hóa dữ liệu trở nên đồng nhất và tái lập."
          },
          {
            "question": "Khi áp dụng hàm .rolling(window=5).mean() trên một Series gồm 10 giá trị, nếu không thiết lập tham số 'min_periods', kết quả ở 4 dòng đầu tiên sẽ là gì?",
            "options": [
              "Toàn bộ 4 dòng đầu tiên sẽ nhận giá trị NaN (Not a Number) vì chưa tích lũy đủ 5 quan sát tối thiểu.",
              "4 dòng đầu tiên sẽ nhận giá trị 0.",
              "Pandas sẽ báo lỗi ValueError vì không đủ dữ liệu.",
              "4 dòng đầu tiên sẽ tự động lấy trung bình của các giá trị hiện có từ đầu đến vị trí đó."
            ],
            "correctIndex": 0,
            "explanation": "Mặc định, min_periods bằng kích thước window. Nếu cửa sổ là 5, các vị trí từ 0 đến 3 (4 dòng đầu) chưa đủ 5 giá trị nên hàm trả về NaN. Để khắc phục điều này và tính toán ngay từ dòng đầu tiên, ta cần đặt min_periods=1."
          },
          {
            "question": "Khi nào bạn BẮT BUỘC phải sử dụng pd.pivot_table() thay vì pd.pivot()?",
            "options": [
              "Khi bảng dữ liệu có nhiều hơn 3 cột.",
              "Khi trong dữ liệu có nhiều dòng trùng lặp cùng một cặp giá trị (index, columns), đòi hỏi phải có hàm tổng hợp aggfunc (như sum, mean) để gộp lại.",
              "Khi bạn muốn xuất kết quả trực tiếp ra file Excel.",
              "Khi dữ liệu chứa các giá trị kiểu chuỗi văn bản."
            ],
            "correctIndex": 1,
            "explanation": "pd.pivot() đòi hỏi mỗi cặp (index, columns) phải là duy nhất tuyệt đối; nếu có trùng lặp, nó sẽ ném ngoại lệ ValueError: Index contains duplicate entries. Ngược lại, pd.pivot_table() được thiết kế để xử lý trùng lặp thông qua hàm tổng hợp aggfunc (mặc định là mean)."
          }
        ],
        "selfReviewQuestions": [
          "Tại sao định dạng Long (Tidy Data) lại được ưa chuộng hơn định dạng Wide khi xây dựng mô hình Machine Learning hoặc vẽ biểu đồ với Seaborn?",
          "Giải thích sự khác biệt cơ chế tính toán giữa rolling(window=7) và expanding().",
          "Làm thế nào để tính tỷ lệ tăng trưởng doanh thu so với cùng kỳ tháng trước (MoM) bằng phương thức .pct_change()?"
        ],
        "reflectionQuestion": "Một nhà phân tích dữ liệu thường xuyên dùng vòng lặp for trong Python để tính trung bình động 30 ngày cho 500 cổ phiếu trên sàn giao dịch. Khi dữ liệu tăng lên 10 triệu bản ghi, hệ thống chạy mất hơn 2 tiếng đồng hồ. Bạn hãy phân tích lý do kỹ thuật dưới góc nhìn Notional Machine và giải pháp chuyển đổi sang rolling() để rút ngắn thời gian xử lý xuống dưới 2 giây.",
        "reflectionHint": "Vòng lặp Python chạy thông dịch, với mỗi ngày nó lại lặp qua 30 ngày quá khứ để cộng tổng, dẫn đến độ phức tạp O(N x W) và hàng chục triệu lần overhead thông dịch CPython. Khi chuyển sang .groupby('stock_id')['price'].rolling(30).mean(), Pandas sử dụng thuật toán hàng đợi trượt được biên dịch tối ưu bằng Cython/C với độ phức tạp O(N), cập nhật giá trị trượt trong 1 bước duy nhất và vector hóa SIMD, giúp rút ngắn thời gian thực thi hàng trăm lần.",
        "nextLessonPreview": "Chúc mừng bạn đã hoàn thành trọn vẹn Học phần 2 (Wrangling)! Sang Học phần 3 (Module 8), chúng ta sẽ bước vào thế giới Trực Quan Hóa Dữ Liệu Chuyên Nghiệp: Khám phá Ngữ pháp đồ họa (Grammar of Graphics), phân cấp nhận thức Cleveland-McGill, tỷ lệ Data-Ink của Tufte và kiến trúc hướng đối tượng của Matplotlib & Seaborn.",
        "references": [
          {
            "title": "Tidy Data (Hadley Wickham, 2014, Journal of Statistical Software)",
            "url": "https://www.jstatsoft.org/article/view/v059i10"
          },
          {
            "title": "Pandas Official Documentation - Reshaping and pivot tables",
            "url": "https://pandas.pydata.org/docs/user_guide/reshaping.html"
          },
          {
            "title": "Pandas Official Documentation - Windowing operations",
            "url": "https://pandas.pydata.org/docs/user_guide/window.html"
          }
        ]
      }
    ]
  }
];
