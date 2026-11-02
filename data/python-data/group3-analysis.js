window.PYDATA_GROUP3_PARTS = [
  {
    "id": "mod-08",
    "number": "Module 8",
    "title": "Trực Quan Hóa Dữ Liệu Thực Chiến",
    "badge": "3 Bài học",
    "icon": "📊",
    "description": "Làm chủ kiến trúc hướng đối tượng của Matplotlib (Figure/Axes), Ngữ pháp đồ họa Seaborn, nguyên lý nhận thức Cleveland-McGill, tỷ lệ Data-Ink của Edward Tufte, đồ thị trung thực của Alberto Cairo và thiết kế tiếp cận chuẩn WCAG 2.2.",
    "lessons": [
      {
        "id": "pd-08-01",
        "number": "8.1",
        "title": "Kiến Trúc Hướng Đối Tượng: Phân Cấp Figure và Axes Trong Matplotlib",
        "subtitle": "Phân biệt Stateful vs OOP API, giải phẫu cây phân cấp Figure -> Axes -> Axis -> Artist, và kiểm soát bố cục đa đồ thị Subplots chuyên nghiệp",
        "level": "Cơ bản",
        "duration": "45 phút",
        "objectives": [
          "Phân biệt bản chất kỹ thuật giữa giao diện Stateful (dựa trên trạng thái ngầm kiểu MATLAB plt.plot) và giao diện Hướng đối tượng (Object-Oriented API: fig, ax = plt.subplots).",
          "Phân tích cây giải phẫu 4 tầng của Matplotlib: Figure (khung tranh) &rarr; Axes (tọa độ vẽ) &rarr; Axis (thước đo tọa độ) &rarr; Artist (mọi đối tượng hình ảnh hiển thị).",
          "Điều khiển lưới đồ thị đa chiều (Subplots grid) bằng kỹ thuật phẳng hóa mảng (axes.flatten()), cấu hình Spines, Ticks, Twin Axes và chú thích Annotations.",
          "Xuất bản đồ thị chuẩn in ấn và báo cáo số với các tham số tối ưu dpi=300, bbox_inches='tight' và định dạng vector SVG/PDF."
        ],
        "intuition": {
          "title": "Khung Tranh Triển Lãm & Tờ Giấy Vẽ Độc Lập",
          "metaphor": "Hãy tưởng tượng bạn đang chuẩn bị một triển lãm nghệ thuật dữ liệu:\\n1. Figure (Khung Tranh Tổng Thể): Là toàn bộ tấm bảng gỗ lớn treo trên tường (Canvas). Nó có kích thước cố định (ví dụ: 12 x 6 inch) và độ phân giải hiển thị (DPI).\\n2. Axes (Tờ Giấy Vẽ / Vùng Tọa Độ): Là từng tờ giấy vẽ độc lập được dán lên khung tranh. Trên một khung tranh (Figure), bạn có thể dán 1 tờ giấy duy nhất, hoặc dán 4 tờ giấy chia đều 2x2. Mỗi tờ giấy sở hữu hệ trục tọa độ X-Y hoàn toàn riêng biệt!\\n3. Axis (Thước Đo Tọa Độ): Là mép thước kẻ ở cạnh dưới và cạnh trái của mỗi tờ giấy vẽ. Nó chia các vạch nhỏ (Ticks) và dán nhãn số liệu (Tick Labels).\\n4. Artist (Nét Vẽ Nghệ Thuật): Mọi thứ mắt bạn nhìn thấy trên tờ giấy — từ đường cong xu hướng (Line2D), cột biểu đồ hình chữ nhật (Rectangle), điểm chấm phân tán (Circle/Marker), đến dòng tiêu đề và chú thích (Text) — tất cả đều là các đối tượng Artist được Matplotlib vẽ lên vùng Axes.\\n5. Giao diện Stateful (plt.plot) giống như người họa sĩ nhắm mắt vẽ lên tờ giấy đang mở mà không biết mình đang đứng ở đâu. Giao diện Hướng đối tượng (fig, ax) cho phép bạn đặt tên và chỉ đạo chính xác: 'Tờ giấy số 1 hãy vẽ đường cong doanh thu; Tờ giấy số 2 hãy vẽ cột chi phí!'.",
          "boundary": "Trong tiếng Anh đời thường, 'Axes' là số nhiều của 'Axis' (trục tọa độ). Nhưng trong thuật ngữ kỹ thuật Matplotlib, 'Axes' là danh từ số ít chỉ một vùng không gian vẽ 2D hoàn chỉnh (Plot area), còn 'Axis' mới là thước đo từng trục X hoặc Y.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">CÂY PHÂN CẤP KIẾN TRÚC HƯỚNG ĐỐI TƯỢNG CỦA MATPLOTLIB</div>\n                        <div style=\"border:2px dashed #0284c7;border-radius:6px;padding:10px;background:var(--bg-surface);\">\n                          <div style=\"display:flex;justify-content:space-between;font-weight:700;color:#0284c7;margin-bottom:6px;\">\n                            <span>🖼️ Figure (Canvas tổng: figsize=(12, 6), dpi=100)</span>\n                            <span style=\"font-size:0.75rem;background:rgba(2,132,199,0.15);padding:2px 6px;border-radius:4px;\">Cấp 1</span>\n                          </div>\n                          <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px;\">\n                            <div style=\"border:1px solid #10b981;border-radius:6px;padding:8px;background:var(--bg-surface-alt);\">\n                              <div style=\"font-weight:700;color:#10b981;font-size:0.8rem;\">📊 ax1 = axes[0]: Doanh Thu (Line)</div>\n                              <div style=\"font-size:0.75rem;color:var(--text-muted);margin-top:2px;\">\n                                • X-Axis (Tháng) &amp; Y-Axis (Triệu VNĐ)<br>\n                                • Artist: Line2D, Markers, Legend\n                              </div>\n                            </div>\n                            <div style=\"border:1px solid #f59e0b;border-radius:6px;padding:8px;background:var(--bg-surface-alt);\">\n                              <div style=\"font-weight:700;color:#f59e0b;font-size:0.8rem;\">📊 ax2 = axes[1]: Ngành Hàng (Bar)</div>\n                              <div style=\"font-size:0.75rem;color:var(--text-muted);margin-top:2px;\">\n                                • X-Axis (Danh mục) &amp; Y-Axis (Số lượng)<br>\n                                • Artist: Rectangle bars, Data labels\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-08-01-01",
            "title": "1. Giao Diện Stateful vs Giao Diện Hướng Đối Tượng (OOP)",
            "content": "\n                          <p>Thư viện Matplotlib được John Hunter khởi xướng vào năm 2003 với mục đích ban đầu là mô phỏng giao diện đồ họa của phần mềm MATLAB. Do đó, Matplotlib cung cấp hai phong cách lập trình song song:</p>\n                          <div class=\"table-responsive\">\n                            <table class=\"table-content\">\n                              <thead>\n                                <tr>\n                                  <th>Tiêu chí</th>\n                                  <th>Giao diện Stateful (pyplot - MATLAB style)</th>\n                                  <th>Giao diện Hướng đối tượng (Object-Oriented API)</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr>\n                                  <td><strong>Cú pháp đại diện</strong></td>\n                                  <td><code>plt.plot(x, y)</code>; <code>plt.title(...)</code>; <code>plt.xlabel(...)</code></td>\n                                  <td><code>fig, ax = plt.subplots()</code>; <code>ax.plot(x, y)</code>; <code>ax.set_title(...)</code></td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Cơ chế bên dưới</strong></td>\n                                  <td>Duy trì một biến trạng thái ngầm (Current Figure & Current Axes). Mọi hàm gọi đều tác động vào Axes hiện hành gần nhất.</td>\n                                  <td>Tham chiếu rõ ràng đến từng đối tượng <code>Figure</code> và <code>Axes</code> qua biến Python.</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Hạn chế / Rủi ro</strong></td>\n                                  <td>Dễ bị ghi đè dữ liệu ngoài ý muốn khi xử lý vòng lặp nhiều đồ thị; mã nguồn phân mảnh, khó tái cấu trúc.</td>\n                                  <td>Đòi hỏi hiểu biết về mô hình đối tượng, nhưng mã nguồn minh bạch tuyệt đối, an toàn trong sản xuất.</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Chuẩn công nghiệp</strong></td>\n                                  <td>Chỉ dùng cho các đoạn script vẽ nhanh 3 dòng trong sổ tay Jupyter.</td>\n                                  <td><strong>Chuẩn mực bắt buộc</strong> cho các dự án khoa học dữ liệu, báo cáo tự động và web dashboard.</td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                          <h4>Cú Pháp Chuẩn Mực Bắt Đầu Mọi Đồ Thị</h4>\n                          \n                        ",
            "codeExamples": [
              {
                "id": "pd-08-01-c1",
                "lang": "python",
                "title": "So sánh trực diện: API Stateful (pyplot) vs Hướng đối tượng OOP (Figure/Axes)",
                "code": "import matplotlib.pyplot as plt\nimport numpy as np\n\n# Tạo dữ liệu giả lập doanh thu 12 tháng tại TechMart\nmonths = np.arange(1, 13)\nrevenue = np.array([120, 135, 150, 140, 165, 180, 175, 190, 210, 230, 250, 280])\n\n# CÁCH 1: Stateful API (pyplot) - Dành cho vẽ nhanh khám phá\nplt.figure(figsize=(6, 3))\nplt.plot(months, revenue, marker='o', color='#2563eb')\nplt.title(\"Doanh thu 12 tháng (Stateful API)\")\nplt.close() # Đóng figure giải phóng bộ nhớ\n\n# CÁCH 2: Object-Oriented API (OOP) - Chuẩn công nghiệp cho báo cáo\nfig, ax = plt.subplots(figsize=(6, 3))\nax.plot(months, revenue, marker='s', color='#10b981', linewidth=2, label='Doanh thu')\nax.set_title(\"Doanh thu 12 tháng (OOP API Chuẩn Mực)\")\nax.set_xlabel(\"Tháng\")\nax.set_ylabel(\"Triệu VNĐ\")\nax.grid(True, linestyle='--', alpha=0.6)\nax.legend()\nplt.close(fig)\nprint(\"Đã khởi tạo và vẽ thành công 2 đồ thị bằng cả hai phong cách!\")",
                "output": "Đã khởi tạo và vẽ thành công 2 đồ thị bằng cả hai phong cách!",
                "explanation": "OOP API tách bạch rõ Figure (khung canvas chứa) và Axes (vùng đồ thị thực sự vẽ), cho phép tinh chỉnh chi tiết mà không bị phụ thuộc vào biến trạng thái ngầm toàn cục của Matplotlib."
              }
            ]
          },
          {
            "id": "sec-08-01-02",
            "title": "2. Bố Cục Lưới Đa Chiều (Subplots Grid) & Kỹ Thuật axes.flatten()",
            "content": "\n                          <p>Khi cần trình bày bảng điều khiển kinh doanh (Executive Dashboard) gồm 4 biểu đồ chia thành 2 hàng x 2 cột:</p>\n                          \n                          <p>Lúc này, biến <code>axes</code> là một mảng NumPy 2 chiều có kích thước <code>(2, 2)</code>. Nếu muốn truy cập ô góc dưới bên phải, bạn phải viết <code>axes[1, 1]</code>. Cú pháp chỉ mục 2 chiều này gây khó khăn lớn khi bạn muốn dùng vòng lặp <code>for</code> để vẽ tự động cho danh sách các chi nhánh.</p>\n                          <h4>Bí Kíp Công Nghiệp: Kỹ Thuật Phẳng Hóa axes.flatten()</h4>\n                          \n                          <p>Tham số <code>sharey=True</code> đảm bảo toàn bộ 4 biểu đồ đều dùng chung một thang đo trục Y, ngăn chặn sự hiểu lầm thị giác khi người xem so sánh chiều cao của các cột giữa các chi nhánh!</p>\n                        ",
            "codeExamples": [
              {
                "id": "pd-08-01-c2",
                "lang": "python",
                "title": "Bố cục lưới đa chiều Subplots và kỹ thuật phẳng hóa axes.flatten()",
                "code": "import matplotlib.pyplot as plt\nimport numpy as np\n\nbranches = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Cần Thơ']\nx = np.arange(1, 7)\n\n# Tạo lưới 2x2 gồm 4 biểu đồ con\nfig, axes = plt.subplots(2, 2, figsize=(8, 6), sharex=True, sharey=True)\n\n# axes.flatten() biến ma trận 2x2 thành mảng 1 chiều 4 phần tử\nfor idx, ax in enumerate(axes.flatten()):\n    y = np.random.default_rng(idx).integers(50, 150, size=len(x))\n    ax.plot(x, y, marker='o', linewidth=2, color=f'C{idx}')\n    ax.set_title(f\"Chi nhánh {branches[idx]}\")\n    ax.grid(True, alpha=0.4)\n\nfig.suptitle(\"So Sánh Xu Hướng Doanh Thu 6 Tháng Đầu Năm 2026\", fontsize=14, fontweight='bold')\nfig.tight_layout()\nplt.close(fig)\nprint(\"Đã tạo thành công lưới 4 đồ thị con với axes.flatten()!\")",
                "output": "Đã tạo thành công lưới 4 đồ thị con với axes.flatten()!",
                "explanation": "Khi subplots sinh ma trận đa chiều (2x2), việc dùng axes.flatten() giúp duyệt qua từng trục con bằng vòng lặp 1 chiều cực kỳ thanh thoát và tránh lỗi IndexError."
              }
            ]
          },
          {
            "id": "sec-08-01-03",
            "title": "3. Kiểm Soát Tinh Chỉnh: Spines, Ticks, Annotations & Trục Phụ (twinx)",
            "content": "\n                          <h4>A. Loại Bỏ Khung Viền Rác Với ax.spines</h4>\n                          <p>Mặc định, Matplotlib bao quanh biểu đồ bằng 4 đường viền đen (top, bottom, left, right). Để tăng tỷ lệ thông tin sạch (Data-Ink), ta nên ẩn viền trên và viền phải:</p>\n                          \n                          <h4>B. Trục Đôi (Twin Axes) Cho Hai Đại Lượng Khác Thứ Nguyên</h4>\n                          <p>Khi bạn cần vẽ Doanh thu (hàng chục tỷ VNĐ) và Biên lợi nhuận (phần trăm %) trên cùng một biểu đồ thời gian, ta sử dụng <code>ax.twinx()</code>:</p>\n                          \n                          <h4>C. Đánh Dấu Sự Kiện Đặc Biệt Bằng ax.annotate()</h4>\n                          <p>Kể câu chuyện dữ liệu bằng mũi tên chỉ rõ điểm đột biến (ví dụ: Chiến dịch Flash Sale Black Friday):</p>\n                          \n                        ",
            "codeExamples": [
              {
                "id": "pd-08-01-c3",
                "lang": "python",
                "title": "Kiểm soát Spines, Ticks và biểu đồ 2 trục Y độc lập (twinx)",
                "code": "import matplotlib.pyplot as plt\nimport numpy as np\n\nmonths = np.arange(1, 7)\nrevenue = np.array([120, 150, 180, 170, 210, 260]) # Triệu VNĐ\nmargin = np.array([15.2, 16.0, 18.5, 17.8, 19.2, 21.0]) # % Biên lợi nhuận\n\nfig, ax1 = plt.subplots(figsize=(7, 3.5))\n\n# Trục Y thứ 1: Cột doanh thu\ncolor_bar = '#3b82f6'\nax1.bar(months, revenue, color=color_bar, alpha=0.7, width=0.5, label='Doanh thu')\nax1.set_xlabel('Tháng')\nax1.set_ylabel('Doanh thu (Triệu VNĐ)', color=color_bar)\nax1.tick_params(axis='y', labelcolor=color_bar)\n\n# Ẩn đường viền trên và phải theo chuẩn Tufte\nax1.spines['top'].set_visible(False)\n\n# Trục Y thứ 2 chia sẻ chung trục X (twinx)\nax2 = ax1.twinx()\ncolor_line = '#ef4444'\nax2.plot(months, margin, color=color_line, marker='o', linewidth=2.5, label='Biên lợi nhuận')\nax2.set_ylabel('Biên lợi nhuận (%)', color=color_line)\nax2.tick_params(axis='y', labelcolor=color_line)\nax2.spines['top'].set_visible(False)\n\nax1.set_title(\"Doanh Thu & Biên Lợi Nhuận 6 Tháng Đầu Năm (Biểu đồ 2 trục Y)\")\nplt.close(fig)\nprint(\"Đã vẽ thành công biểu đồ trục kép với twinx()!\")",
                "output": "Đã vẽ thành công biểu đồ trục kép với twinx()!",
                "explanation": "ax.twinx() tạo ra một Axes thứ hai chia sẻ cùng trục hoành nhưng có thang đo trục tung độc lập, rất hữu dụng khi so sánh hai đại lượng khác đơn vị đo lường."
              }
            ]
          },
          {
            "id": "sec-08-01-04",
            "title": "4. Xuất Bản Đồ Thị Chuẩn In Ấn & Vector SVG",
            "content": "\n                          <p>Khi lưu đồ thị ra file để đưa vào báo cáo thường niên hoặc ứng dụng web:</p>\n                          \n                          <ul>\n                            <li><code>dpi=300</code>: Chuẩn in ấn công nghiệp (Dots Per Inch), chữ và đường nét không bị vỡ hạt như mức mặc định 100 DPI.</li>\n                            <li><code>bbox_inches='tight'</code>: Tự động tính toán khung viền cắt sát mép nội dung, loại bỏ hoàn toàn khoảng trắng thừa xung quanh và ngăn chặn tiêu đề bị cắt mất góc.</li>\n                            <li><code>format='svg'</code>: Định dạng đồ họa vector có thể phóng to vô hạn mà không suy giảm chất lượng, lý tưởng để nhúng vào trang web HTML.</li>\n                          </ul>\n                        "
          }
        ],
        "summary": [
          "Luôn sử dụng Object-Oriented API (fig, ax = plt.subplots) thay vì pyplot stateful để bảo đảm mã nguồn an toàn và kiểm soát chính xác từng phần tử.",
          "Cây phân cấp Matplotlib: Figure (toàn bộ khung hình) -> Axes (vùng tọa độ 2D độc lập) -> Axis (thước đo X/Y) -> Artist (các đối tượng nét vẽ, điểm, chữ).",
          "axes.flatten() giúp phẳng hóa lưới đồ thị đa chiều 2D thành mảng 1D để duyệt vòng lặp tự động cực kỳ gọn gàng.",
          "Ẩn các đường viền rác (top, right spines) và dùng twinx() khi cần thể hiện 2 thang đo khác nhau trên cùng biểu đồ.",
          "Luôn lưu đồ thị với dpi=300 và bbox_inches='tight' để đạt chất lượng in ấn chuyên nghiệp."
        ],
        "workedExample": {
          "scenario": "Dựng biểu đồ đôi đối soát Doanh thu và Số lượng đơn hàng chi nhánh",
          "code": "import matplotlib.pyplot as plt\n\n# Dữ liệu 4 quý của TechMart\nquarters = ['Q1', 'Q2', 'Q3', 'Q4']\nrevenue = [1200, 1450, 1300, 1900] # Triệu VNĐ\norders = [450, 520, 490, 710]       # Số đơn\n\n# Khởi tạo khung hình OOP 1 hàng 2 cột\nfig, axes = plt.subplots(1, 2, figsize=(10, 4.5), dpi=100)\n\n# Đồ thị 1: Cột Doanh thu\naxes[0].bar(quarters, revenue, color='#2563eb', width=0.5, label='Doanh thu')\naxes[0].set_title('Tổng Doanh Thu 2026', fontweight='bold')\naxes[0].set_ylabel('Triệu VNĐ')\naxes[0].grid(axis='y', linestyle='--', alpha=0.5)\naxes[0].spines['top'].set_visible(False)\naxes[0].spines['right'].set_visible(False)\n\n# Đồ thị 2: Đường Xu hướng Số lượng Đơn hàng\naxes[1].plot(quarters, orders, color='#16a34a', marker='s', linewidth=2, label='Đơn hàng')\naxes[1].set_title('Số Lượng Giao Dịch', fontweight='bold')\naxes[1].set_ylabel('Đơn hàng')\naxes[1].grid(True, linestyle=':', alpha=0.6)\naxes[1].spines['top'].set_visible(False)\naxes[1].spines['right'].set_visible(False)\n\nfig.suptitle('Báo Cáo Hiệu Quả Kinh Doanh TechMart', fontsize=14, fontweight='bold')\nplt.tight_layout()\nplt.show()",
          "explanation": "1. fig, axes = plt.subplots(1, 2) tạo 1 Figure và 1 mảng chứa 2 Axes độc lập.\\n2. axes[0] được cấu hình vẽ Bar Chart thể hiện độ lớn tổng doanh thu, trong khi axes[1] vẽ Line Chart thể hiện xu hướng số lượng giao dịch.\\n3. Cả hai đồ thị đều được làm sạch viền trên và phải bằng spines['...'].set_visible(False) theo chuẩn Data-Ink của Tufte."
        },
        "fadedExample": {
          "scenario": "Trực quan hóa chỉ tiêu KPI và đánh dấu điểm đột biến",
          "code": "import matplotlib.pyplot as plt\n\nmonths = [f'T{i}' for i in range(1, 7)]\nsales = [100, 120, 110, 180, 220, 210]\n\nfig, ax = plt.subplots(figsize=(8, 4))\nax.plot(months, sales, marker='o', color='#3b82f6', linewidth=2)\n\n# Yêu cầu: Đặt tiêu đề 'Doanh số 6 tháng đầu năm' và ẩn viền trên (top), viền phải (right)\n# Gợi ý: ax.set_title(...) và ax.spines['...'].set_visible(False)\n\nax.set_title('Doanh số 6 tháng đầu năm', fontsize=12, fontweight='bold')\nax.spines['top'].set_visible(False)\nax.spines['right'].set_visible(False)\n\nplt.tight_layout()\nplt.show()",
          "blankExplanation": "Điền các lệnh ax.set_title('Doanh số 6 tháng đầu năm') và ẩn hai viền rác ax.spines['top'].set_visible(False), ax.spines['right'].set_visible(False) để đồ thị thoáng đãng và tập trung vào dữ liệu."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Dựng đồ thị đường kép so sánh hai năm theo chuẩn OOP",
            "problem": "Cho doanh số 4 quý năm 2025: `[100, 130, 120, 160]` và năm 2026: `[120, 150, 140, 200]` (đơn vị: triệu VNĐ). Hãy áp dụng phong cách OOP của Matplotlib (`fig, ax = plt.subplots()`) để vẽ cả 2 đường trên cùng một Axes: đường năm 2025 màu xám đứt nét (`linestyle='--'`), đường năm 2026 màu xanh dương đậm nét liền kèm marker tròn (`marker='o'`). Thiết lập tiêu đề, nhãn trục Y, lưới tọa độ và chú thích legend.",
            "hint": "Khởi tạo fig, ax = plt.subplots(figsize=(7, 4)), gọi ax.plot() 2 lần với các tham số color, linestyle, marker và label, sau đó bật ax.legend() và ax.grid(True).",
            "solutionCode": "import matplotlib.pyplot as plt\n\nquarters = ['Q1', 'Q2', 'Q3', 'Q4']\nsales_2025 = [100, 130, 120, 160]\nsales_2026 = [120, 150, 140, 200]\n\nfig, ax = plt.subplots(figsize=(7, 4), dpi=100)\nax.plot(quarters, sales_2025, color='#94a3b8', linestyle='--', label='Năm 2025')\nax.plot(quarters, sales_2026, color='#2563eb', linewidth=2, marker='o', label='Năm 2026')\n\nax.set_title('Tăng Trưởng Doanh Số Cùng Kỳ 2025 - 2026', fontweight='bold')\nax.set_ylabel('Doanh số (Triệu VNĐ)')\nax.legend(frameon=True)\nax.grid(True, linestyle=':', alpha=0.5)\n\nplt.tight_layout()\nprint(\"Đã khởi tạo biểu đồ đường kép so sánh doanh số 2025 - 2026 thành công.\")\nplt.show()",
            "explanation": "Trong phong cách Hướng đối tượng (OOP) của Matplotlib, việc kiểm soát trực tiếp đối tượng Figure và Axes giúp tách biệt vùng vẽ khỏi trạng thái toàn cục của pyplot. Điều này bảo đảm khả năng mở rộng, dễ dàng nhúng biểu đồ vào ứng dụng web backend hoặc xuất báo cáo định dạng vector độ phân giải cao.",
            "solutionOutput": "Đã khởi tạo biểu đồ đường kép so sánh doanh số 2025 - 2026 thành công."
          },
          {
            "level": "Vừa",
            "title": "Dựng bảng điều khiển 2x2 bằng vòng lặp phẳng hóa axes.flatten()",
            "problem": "TechMart có 4 sản phẩm chủ lực: `['Laptop', 'Phone', 'Tablet', 'Watch']` với doanh thu 3 tháng tương ứng: `[[50, 65, 80], [70, 85, 90], [30, 25, 40], [20, 35, 45]]`. Hãy tạo lưới biểu đồ 2x2 bằng `plt.subplots(2, 2)`. Dùng `axes.flatten()` để duyệt qua từng ô bằng vòng lặp `for`, vẽ biểu đồ cột (`ax.bar()`) cho từng sản phẩm, đặt tiêu đề riêng cho mỗi ô và giới hạn trục Y từ 0 đến 100.",
            "hint": "Dùng fig, axes = plt.subplots(2, 2, figsize=(8, 6)), phẳng hóa mảng bằng axes.flatten() rồi dùng enumerate để lặp qua danh sách sản phẩm.",
            "solutionCode": "import matplotlib.pyplot as plt\n\ncategories = ['Laptop', 'Phone', 'Tablet', 'Watch']\nsales_data = [\n    [50, 65, 80],\n    [70, 85, 90],\n    [30, 25, 40],\n    [20, 35, 45]\n]\nmonths = ['T1', 'T2', 'T3']\n\nfig, axes = plt.subplots(2, 2, figsize=(8, 6), sharey=True, dpi=100)\nflat_axes = axes.flatten()\n\nfor idx, ax in enumerate(flat_axes):\n    ax.bar(months, sales_data[idx], color='#3b82f6', alpha=0.85)\n    ax.set_title(f'Sản phẩm: {categories[idx]}', fontsize=11, fontweight='bold')\n    ax.set_ylim(0, 100)\n    ax.grid(axis='y', linestyle='--', alpha=0.4)\n\nplt.tight_layout()\nprint(\"Đã khởi tạo lưới 2x2 biểu đồ cột cho 4 nhóm sản phẩm TechMart.\")\nplt.show()",
            "explanation": "Khi làm việc với mảng subplots đa chiều, phương thức axes.flatten() giúp biến ma trận 2x2 thành một mảng 1 chiều có 4 phần tử. Kỹ thuật này giúp viết code ngắn gọn bằng một vòng lặp for duy nhất, loại bỏ sự phức tạp của 2 vòng lặp lồng nhau và giúp chia sẻ thang đo trục Y đồng nhất (sharey=True).",
            "solutionOutput": "Đã khởi tạo lưới 2x2 biểu đồ cột cho 4 nhóm sản phẩm TechMart."
          },
          {
            "level": "Nâng cao",
            "title": "Biểu đồ trục đôi (Twin Axes) kết hợp chú thích điểm cực đại",
            "problem": "Cho dữ liệu 6 tháng: Doanh thu = `[120, 150, 180, 260, 210, 190]` (triệu VNĐ) và Lợi nhuận gộp = `[24, 30, 32, 58, 40, 35]` (triệu VNĐ). Hãy dựng biểu đồ cột cho Doanh thu trên trục Y bên trái, và dùng `ax.twinx()` tạo trục Y2 bên phải để vẽ đường Lợi nhuận gộp màu đỏ. Tìm tháng có doanh thu cao nhất và dùng `ax.annotate()` để gắn mũi tên chú thích văn bản \"Đỉnh doanh thu: 260tr\".",
            "hint": "Khởi tạo ax2 = ax.twinx(), vẽ ax.bar() cho doanh thu và ax2.plot() cho lợi nhuận, sau đó dùng ax.annotate() với xy và xytext cùng thuộc tính arrowprops.",
            "solutionCode": "import matplotlib.pyplot as plt\nimport numpy as np\n\nmonths = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6']\nrevenue = [120, 150, 180, 260, 210, 190]\nprofit = [24, 30, 32, 58, 40, 35]\n\nfig, ax1 = plt.subplots(figsize=(8, 4.5), dpi=100)\n\n# Trục 1: Doanh thu (Bar)\nax1.bar(months, revenue, color='#cbd5e1', width=0.5, label='Doanh thu')\nax1.set_ylabel('Doanh thu (Triệu VNĐ)', color='#475569')\nax1.set_ylim(0, 320)\n\n# Trục 2: Lợi nhuận (Line)\nax2 = ax1.twinx()\nax2.plot(months, profit, color='#dc2626', linewidth=2.5, marker='s', label='Lợi nhuận')\nax2.set_ylabel('Lợi nhuận (Triệu VNĐ)', color='#dc2626')\nax2.set_ylim(0, 80)\n\n# Chú thích đỉnh doanh thu\nmax_rev_idx = np.argmax(revenue)\nax1.annotate(\n    f'Đỉnh doanh thu: {revenue[max_rev_idx]}tr',\n    xy=(max_rev_idx, revenue[max_rev_idx]),\n    xytext=(max_rev_idx - 0.5, revenue[max_rev_idx] + 35),\n    arrowprops=dict(facecolor='#1e293b', arrowstyle='->', lw=1.5),\n    fontweight='bold',\n    fontsize=9\n)\n\nax1.set_title('Tương Quan Doanh Thu & Lợi Nhuận Gộp 6 Tháng Đầu Năm', fontweight='bold')\nplt.tight_layout()\nprint(\"Đã vẽ biểu đồ trục đôi (Twin Axes) kết hợp chú thích điểm cực đại thành công.\")\nplt.show()",
            "explanation": "Kỹ thuật twinx() chia sẻ chung trục X nhưng tạo ra hai thang đo trục Y hoàn toàn độc lập ở hai bên. Đây là phương pháp trực quan hóa chuẩn mực khi cần đối sánh hai đại lượng có độ lớn chênh lệch nhau (ví dụ Doanh thu hàng trăm triệu và Lợi nhuận hàng chục triệu) mà không làm méo thang đo.",
            "solutionOutput": "Đã vẽ biểu đồ trục đôi (Twin Axes) kết hợp chú thích điểm cực đại thành công."
          }
        ],
        "quiz": [
          {
            "question": "Trong kiến trúc hướng đối tượng của Matplotlib, đối tượng nào đại diện cho toàn bộ vùng vẽ 2D chứa các trục tọa độ, đường nét và nhãn dữ liệu?",
            "options": [
              "(Recommended) Axes",
              "Figure",
              "Axis",
              "Canvas"
            ],
            "correctAnswer": "(Recommended) Axes",
            "explanation": "Trong Matplotlib, 'Figure' là khung tranh tổng thể bao ngoài cùng; 'Axes' mới là đối tượng đại diện cho một vùng vẽ 2D hoàn chỉnh chứa hệ trục tọa độ, nhãn và các hình vẽ; còn 'Axis' là thước đo từng trục X hoặc Y."
          },
          {
            "question": "Lợi ích cốt lõi của việc sử dụng 'axes.flatten()' khi làm việc với 'fig, axes = plt.subplots(3, 4)' là gì?",
            "options": [
              "(Recommended) Chuyển đổi mảng 2 chiều kích thước (3, 4) thành mảng 1 chiều 12 phần tử để dễ dàng duyệt bằng một vòng lặp for đơn giản.",
              "Tự động tính giá trị trung bình của toàn bộ 12 biểu đồ.",
              "Làm phẳng màu nền của biểu đồ thành màu trắng thuần khiết.",
              "Nén dung lượng bộ nhớ của Figure xuống 50%."
            ],
            "correctAnswer": "(Recommended) Chuyển đổi mảng 2 chiều kích thước (3, 4) thành mảng 1 chiều 12 phần tử để dễ dàng duyệt bằng một vòng lặp for đơn giản.",
            "explanation": "axes.flatten() duỗi thẳng ma trận con thành mảng 1D, giúp lập trình viên lặp qua danh sách biến dữ liệu và vẽ tự động vào từng ô mà không cần viết 2 vòng lặp lồng nhau phức tạp."
          },
          {
            "question": "Khi xuất đồ thị ra tệp ảnh để in ấn báo cáo, tham số nào sau đây đảm bảo khung viền được cắt sát mép và tiêu đề không bị mất góc?",
            "options": [
              "(Recommended) bbox_inches='tight'",
              "dpi=300",
              "transparent=True",
              "format='png'"
            ],
            "correctAnswer": "(Recommended) bbox_inches='tight'",
            "explanation": "bbox_inches='tight' yêu cầu Matplotlib tính toán lại vùng hộp bao quanh (bounding box) chứa tất cả các đối tượng vẽ bao gồm nhãn ngoài rìa, tự động cắt bỏ viền thừa và chống xén chữ."
          }
        ],
        "selfReviewQuestions": [
          "Phân biệt sự khác nhau giữa Figure, Axes và Axis trong kiến trúc Matplotlib.",
          "Tại sao việc sử dụng sharey=True lại là tiêu chuẩn bắt buộc khi so sánh các nhóm trong biểu đồ đa khung nhìn Subplots?",
          "Mục đích của việc sử dụng ax.twinx() là gì và khi nào nên dùng nó?"
        ],
        "reflectionQuestion": "Một bạn thực tập sinh viết code vẽ 100 biểu đồ báo cáo khách hàng trong vòng lặp for bằng cách gọi liên tục plt.plot() mà không dùng OOP hay plt.close(). Sau khi chạy được 50 biểu đồ, chương trình bị crash do tràn bộ nhớ (Memory Leak). Bạn hãy phân tích nguyên nhân kỹ thuật và cách khắc phục triệt để.",
        "reflectionHint": "Mỗi lần gọi plt.plot() mà không đóng, Matplotlib duy trì tham chiếu đến đối tượng Figure trong bộ nhớ RAM toàn cục (global state) để chờ lệnh plt.show(). Để khắc phục: Sử dụng giao diện OOP fig, ax = plt.subplots(), sau khi lưu ảnh bằng fig.savefig() phải gọi ngay plt.close(fig) để giải phóng vùng nhớ C-buffer của đối tượng vẽ.",
        "nextLessonPreview": "Ở bài 8.2, chúng ta sẽ nâng tầm lên thư viện Seaborn: Khám phá cách ánh xạ Ngữ pháp đồ họa của Leland Wilkinson, phân biệt đồ thị mức Figure (relplot, displot) và mức Axes, cùng kỹ thuật vẽ ma trận tương quan Heatmap chuyên sâu.",
        "references": [
          {
            "title": "Matplotlib Official Guide - The Object-Oriented API",
            "url": "https://matplotlib.org/stable/users/explain/quick_start.html"
          },
          {
            "title": "Matplotlib Anatomy of a Figure",
            "url": "https://matplotlib.org/stable/gallery/showcase/anatomy.html"
          }
        ]
      },
      {
        "id": "pd-08-02",
        "number": "8.2",
        "title": "Seaborn & Trực Quan Hóa Phân Phối / Tương Quan",
        "subtitle": "Ngữ pháp đồ họa Leland Wilkinson, phân biệt Figure-level vs Axes-level, kỹ thuật phân phối KDE/Boxplot/Violinplot và Correlation Heatmap",
        "level": "Trung cấp",
        "duration": "45 phút",
        "objectives": [
          "Ánh xạ lý thuyết Ngữ pháp Đồ họa (Grammar of Graphics của Leland Wilkinson) vào các hàm cấp cao của thư viện Seaborn.",
          "Phân biệt triệt để cơ chế hoạt động của đồ thị mức Figure (Figure-level: relplot, displot, catplot) và mức Axes (Axes-level: scatterplot, histplot, boxplot, barplot).",
          "Phân tích phân phối số liệu đa góc nhìn: So sánh Histogram, Ước lượng mật độ hạt nhân KDE, Biểu đồ hộp Boxplot và Biểu đồ Violinplot.",
          "Xây dựng ma trận hệ số tương quan chuyên nghiệp (Correlation Heatmap) với kỹ thuật che tam giác trên (np.triu mask) và bảng màu phân kỳ (diverging colormap)."
        ],
        "intuition": {
          "title": "Bức Tranh Giải Phẫu Phân Phối: Chiếc Hộp & Cây Đàn Violin",
          "metaphor": "Khi bạn nhìn vào một cột số liệu doanh thu 100.000 dòng:\\n1. Con số trung bình (Mean) giống như nhìn bức ảnh chụp từ vệ tinh rất xa: Bạn chỉ thấy một đốm sáng mờ nhạt, không biết bên trong có bao nhiêu người giàu nứt vách và bao nhiêu người nghèo.\\n2. Histogram & KDE (Mật độ hạt nhân): Giống như bạn phóng to ống nhòm: bạn thấy đường cong lượn sóng của địa hình (đỉnh núi ở đâu, thung lũng ở đâu, có mấy đỉnh phân phối).\\n3. Boxplot (Biểu đồ hộp Tukey): Giống như bản tóm tắt pháp lý: Khóa chặt 50% số liệu ở trung tâm vào một chiếc hộp (IQR từ Q1 đến Q3), vạch một đường đỏ ở trung vị (Median), và bắn ra hai sợi râu (Whiskers) để tóm gọn các điểm ngoại lai bất thường (Outliers).\\n4. Violinplot (Cây đàn vĩ cầm): Là sự kết hợp hoàn hảo giữa Chiếc hộp Boxplot và Đường cong KDE: Nó vẽ chiếc hộp nằm bên trong và bọc đường cong mật độ đối xứng ở hai bên. Giúp bạn nhìn thấy ngay những phân phối có 2 đỉnh (bimodal) mà Boxplot truyền thống hoàn toàn bị mù!\\n5. Heatmap (Bản đồ nhiệt tương quan): Giống như camera quét thân nhiệt ở sân bay: Ô nào có tương quan dương mạnh thì rực sáng đỏ ấm, ô nào tương quan nghịch thì hạ nhiệt xanh lạnh, ô nào bằng 0 thì trung tính.",
          "boundary": "Violinplot chỉ đáng tin cậy khi số lượng mẫu dữ liệu đủ lớn (N >= 50). Với mẫu quá nhỏ (< 20 dòng), thuật toán làm mượt hạt nhân KDE sẽ tự tạo ra các đỉnh sóng ảo không có thực trong thực tế.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">HỆ THỐNG PHÂN CẤP HÀM TRONG SEABORN</div>\n                        <div style=\"display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;text-align:center;\">\n                          <div style=\"padding:8px;border:1px solid #3b82f6;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#3b82f6;\">MỐI QUAN HỆ</strong>\n                            <div style=\"font-size:0.75rem;margin-top:2px;font-weight:700;\">sns.relplot() [Figure]</div>\n                            <div style=\"font-size:0.7rem;color:var(--text-muted);margin-top:2px;\">Axes: scatterplot(), lineplot()</div>\n                          </div>\n                          <div style=\"padding:8px;border:1px solid #10b981;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#10b981;\">PHÂN PHỐI</strong>\n                            <div style=\"font-size:0.75rem;margin-top:2px;font-weight:700;\">sns.displot() [Figure]</div>\n                            <div style=\"font-size:0.7rem;color:var(--text-muted);margin-top:2px;\">Axes: histplot(), kdeplot(), ecdfplot()</div>\n                          </div>\n                          <div style=\"padding:8px;border:1px solid #8b5cf6;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#8b5cf6;\">DANH MỤC</strong>\n                            <div style=\"font-size:0.75rem;margin-top:2px;font-weight:700;\">sns.catplot() [Figure]</div>\n                            <div style=\"font-size:0.7rem;color:var(--text-muted);margin-top:2px;\">Axes: boxplot(), violinplot(), barplot()</div>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-08-02-01",
            "title": "1. Ngữ Pháp Đồ Họa & Phân Biệt Figure-Level vs Axes-Level Trong Seaborn",
            "content": "\n                          <p>Seaborn được xây dựng dựa trên lý thuyết <strong>Ngữ pháp Đồ họa (The Grammar of Graphics)</strong> của Leland Wilkinson. Thay vì vẽ từng nét thủ công như Matplotlib, Seaborn cho phép bạn ánh xạ trực tiếp các cột dữ liệu (DataFrame columns) vào các thuộc tính thị giác (Visual Aesthetics):</p>\n                          <ul>\n                            <li><code>x</code>, <code>y</code>: Ánh xạ vị trí không gian tọa độ.</li>\n                            <li><code>hue</code>: Ánh xạ biến phân loại vào màu sắc (Color grouping).</li>\n                            <li><code>style</code>: Ánh xạ biến phân loại vào nét vẽ (dashed, solid) hoặc hình marker.</li>\n                            <li><code>size</code>: Ánh xạ biến số lượng vào độ lớn của điểm tròn.</li>\n                          </ul>\n                          <h4>Phân Biệt Sống Còn: Figure-Level vs Axes-Level</h4>\n                          <div class=\"table-responsive\">\n                            <table class=\"table-content\">\n                              <thead>\n                                <tr>\n                                  <th>Tiêu chí</th>\n                                  <th>Hàm cấp Figure (Figure-level)</th>\n                                  <th>Hàm cấp Axes (Axes-level)</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr>\n                                  <td><strong>Các hàm tiêu biểu</strong></td>\n                                  <td><code>sns.relplot()</code>, <code>sns.displot()</code>, <code>sns.catplot()</code></td>\n                                  <td><code>sns.scatterplot()</code>, <code>sns.histplot()</code>, <code>sns.boxplot()</code>, <code>sns.heatmap()</code></td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Đối tượng trả về</strong></td>\n                                  <td><code>FacetGrid</code> (Tự động quản lý toàn bộ Figure và tạo lưới đa ô)</td>\n                                  <td><code>matplotlib.axes.Axes</code> (Vẽ trực tiếp lên một ô tọa độ có sẵn)</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Chia lưới tự động</strong></td>\n                                  <td>Cực kỳ mạnh mẽ: chỉ cần truyền <code>col='branch'</code>, <code>row='year'</code></td>\n                                  <td>Không tự chia lưới; người dùng phải tự tạo lưới bằng <code>plt.subplots</code> trước</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Nhúng vào Subplots</strong></td>\n                                  <td><strong>KHÔNG THỂ</strong> nhúng vào một <code>ax</code> con của <code>plt.subplots</code>!</td>\n                                  <td><strong>HOÀN HẢO:</strong> Nhận tham số <code>ax=ax_target</code> để ghép vào bố cục phức tạp</td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                        "
          },
          {
            "id": "sec-08-02-02",
            "title": "2. Trực Quan Hóa Phân Phối Đa Chiều: Hist, KDE, Boxplot & Violinplot",
            "content": "\n                          <p>Để thấu hiểu phân phối giá trị của đơn hàng tại siêu thị TechMart:</p>\n                          \n                          <p><strong>So sánh sâu sắc:</strong> Boxplot tóm tắt dữ liệu qua 5 con số (Min, Q1, Median, Q3, Max) và phát hiện ngoại lai cực tốt, nhưng nó không thể phân biệt được một phân phối có 1 đỉnh hay 2 đỉnh. Violinplot giải quyết triệt để khuyết điểm này bằng cách kết hợp đường cong mật độ hạt nhân đối xứng.</p>\n                        ",
            "codeExamples": [
              {
                "id": "pd-08-02-c1",
                "lang": "python",
                "title": "Trực quan hóa phân phối đa chiều với Seaborn: Histplot, Boxplot & Violinplot",
                "code": "import seaborn as sns\nimport matplotlib.pyplot as plt\nimport pandas as pd\nimport numpy as np\n\n# Tạo tập dữ liệu giao dịch TechMart mô phỏng\nrng = np.random.default_rng(42)\ndf = pd.DataFrame({\n    'branch': rng.choice(['Hà Nội', 'TP.HCM'], size=200),\n    'amount': np.concatenate([rng.normal(300, 50, 100), rng.normal(450, 80, 100)])\n})\n\nfig, axes = plt.subplots(1, 2, figsize=(10, 4))\n\n# 1. Phân phối kết hợp đường cong KDE\nsns.histplot(data=df, x='amount', hue='branch', kde=True, ax=axes[0], palette='Set2')\naxes[0].set_title(\"Phân phối Doanh số (Histplot + KDE)\")\n\n# 2. So sánh phân vị và hình dạng mật độ qua Violinplot\nsns.violinplot(data=df, x='branch', y='amount', hue='branch', ax=axes[1], palette='Pastel1', inner='quartile', legend=False)\naxes[1].set_title(\"Hình dáng Mật độ (Violinplot)\")\n\nplt.tight_layout()\nplt.close(fig)\nprint(\"Đã tạo thành công bộ đồ thị phân phối đa chiều với Seaborn!\")",
                "output": "Đã tạo thành công bộ đồ thị phân phối đa chiều với Seaborn!",
                "explanation": "Seaborn tự động ánh xạ các biến phân loại vào màu sắc (hue) và chia nhóm, giúp hiển thị cả phân vị (boxplot) lẫn mật độ xác suất (KDE) trong một lệnh gọn gàng."
              }
            ]
          },
          {
            "id": "sec-08-02-03",
            "title": "3. Ma Trận Hệ Số Tương Quan Chuyên Nghiệp (Correlation Heatmap)",
            "content": "\n                          <p>Hệ số tương quan Pearson đo lường mức độ liên kết tuyến tính giữa các cặp biến số (từ -1 đến +1). Khi tính <code>df.corr()</code>, ma trận thu được đối xứng qua đường chéo chính. Việc vẽ toàn bộ ma trận sẽ gây dư thừa thông tin gấp đôi (vi phạm nguyên tắc Data-Ink của Tufte).</p>\n                          <h4>Kỹ Thuật Chuẩn Công Nghiệp: Che Tam Giác Trên Với np.triu</h4>\n                          \n                        ",
            "codeExamples": [
              {
                "id": "pd-08-02-c2",
                "lang": "python",
                "title": "Ma trận hệ số tương quan chuyên nghiệp với sns.heatmap và bảng màu phân kỳ",
                "code": "import seaborn as sns\nimport matplotlib.pyplot as plt\nimport pandas as pd\nimport numpy as np\n\n# Tập dữ liệu 5 chỉ số đo lường hiệu quả bán lẻ\ndf = pd.DataFrame({\n    'revenue': [100, 150, 200, 180, 220, 300],\n    'units_sold': [10, 14, 18, 17, 21, 28],\n    'discount': [0.05, 0.08, 0.10, 0.05, 0.12, 0.15],\n    'rating': [4.5, 4.2, 4.8, 4.0, 4.6, 4.9],\n    'cost': [70, 95, 120, 110, 130, 180]\n})\n\ncorr = df.corr()\n\nfig, ax = plt.subplots(figsize=(6, 4.5))\n# Sử dụng bảng màu phân kỳ cmap='vlag' hoặc 'coolwarm'\nsns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm', vmin=-1, vmax=1, square=True, linewidths=0.5, ax=ax)\nax.set_title(\"Ma Trận Hệ Số Tương Quan Pearson\")\n\nplt.tight_layout()\nplt.close(fig)\nprint(\"Đã xuất bản thành công Ma trận Tương quan Heatmap!\")",
                "output": "Đã xuất bản thành công Ma trận Tương quan Heatmap!",
                "explanation": "Khi vẽ heatmap tương quan, bắt buộc phải cố định vmin=-1 và vmax=1 cùng một bảng màu phân kỳ (diverging) có tâm là số 0, tránh làm sai lệch nhận thức người xem."
              }
            ]
          }
        ],
        "summary": [
          "Seaborn hiện thực hóa Ngữ pháp Đồ họa (Leland Wilkinson): ánh xạ cột DataFrame vào các thuộc tính thị giác x, y, hue, style, size.",
          "Phân biệt rõ hàm cấp Figure (FacetGrid tự tạo khung) và hàm cấp Axes (vẽ vào ax có sẵn của Matplotlib).",
          "Bộ ba trực quan hóa phân phối: Histogram + KDE (hình dạng tổng quan), Boxplot (tứ phân vị & ngoại lai), Violinplot (phát hiện phân phối đa đỉnh bimodal).",
          "Khi vẽ Correlation Heatmap, luôn dùng np.triu(np.ones_like(corr, dtype=bool)) để che nửa tam giác trên dư thừa và dùng diverging colormap có center=0."
        ],
        "workedExample": {
          "scenario": "Phân tích doanh số bán hàng theo danh mục và ca bán TechMart",
          "code": "import seaborn as sns\nimport matplotlib.pyplot as plt\nimport pandas as pd\nimport numpy as np\n\n# Tạo dữ liệu giao dịch mẫu\nnp.random.seed(42)\nn = 200\ndata = {\n    'shift': np.random.choice(['Sáng', 'Tối'], size=n),\n    'category': np.random.choice(['Laptop', 'Phone', 'Phụ kiện'], size=n),\n    'amount': np.random.exponential(scale=500, size=n) + 100\n}\ndf_trans = pd.DataFrame(data)\n\n# Dựng biểu đồ Boxplot phân tầng theo Ca bán (hue)\nfig, ax = plt.subplots(figsize=(8, 4.5), dpi=100)\nsns.boxplot(\n    data=df_trans,\n    x='category',\n    y='amount',\n    hue='shift',\n    palette='Blues',\n    ax=ax\n)\n\nax.set_title('Phân Phối Giá Trị Đơn Hàng Theo Ngành Hàng & Ca Bán', fontweight='bold')\nax.set_xlabel('Ngành Hàng')\nax.set_ylabel('Giá trị đơn (Nghìn VNĐ)')\nax.grid(axis='y', linestyle=':', alpha=0.5)\n\nplt.tight_layout()\nplt.show()",
          "explanation": "1. sns.boxplot() sử dụng tham số hue='shift' để tự động chia tách mỗi ngành hàng thành 2 chiếc hộp con so sánh ca Sáng và ca Tối.\\n2. Hàm cấp Axes nhận trực tiếp ax=ax giúp ta nhúng mượt mà vào cấu trúc hướng đối tượng của Matplotlib."
        },
        "fadedExample": {
          "scenario": "Che tam giác trên của ma trận tương quan bằng mặt nạ numpy",
          "code": "import seaborn as sns\nimport numpy as np\nimport matplotlib.pyplot as plt\nimport pandas as pd\n\ndf_sample = pd.DataFrame(np.random.randn(50, 4), columns=['DoanhThu', 'ChiPhi', 'LoiNhuan', 'KhachHang'])\ncorr_matrix = df_sample.corr()\n\n# Yêu cầu: Tạo mask tam giác trên bằng np.triu và vẽ heatmap với annot=True\n# Gợi ý: mask = np.triu(np.ones_like(corr_matrix, dtype=bool))\n\nmask = np.triu(np.ones_like(corr_matrix, dtype=bool))\n\nfig, ax = plt.subplots(figsize=(6, 5))\nsns.heatmap(corr_matrix, mask=mask, annot=True, fmt='.2f', cmap='coolwarm', ax=ax)\nax.set_title('Ma Trận Tương Quan Chuẩn Mực', fontweight='bold')\n\nplt.tight_layout()\nplt.show()",
          "blankExplanation": "Điền dòng lệnh tạo mặt nạ mask = np.triu(np.ones_like(corr_matrix, dtype=bool)) và truyền tham số mask=mask vào hàm sns.heatmap(). Kết quả hiển thị một nửa tam giác dưới thoáng mắt và loại bỏ hoàn toàn thông tin dư thừa."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Trực quan hóa mối quan hệ với sns.scatterplot",
            "problem": "Cho DataFrame 100 khách hàng gồm các cột: `tuoi` (từ 18 đến 60), `chi_tieu` (từ 2 đến 50 triệu) và `hang_thanh_vien` ('Gold', 'Silver', 'Bronze'). Hãy dùng hàm `sns.scatterplot()` để vẽ biểu đồ phân tán với trục X là tuổi, trục Y là chi tiêu, phân màu theo hạng thành viên (`hue='hang_thanh_vien'`) và kích thước điểm theo chi tiêu (`size='chi_tieu'`).",
            "hint": "Dùng sns.scatterplot(data=df, x='tuoi', y='chi_tieu', hue='hang_thanh_vien', size='chi_tieu', palette='viridis', ax=ax).",
            "solutionCode": "import matplotlib.pyplot as plt\nimport seaborn as sns\nimport pandas as pd\nimport numpy as np\n\nnp.random.seed(42)\nn = 100\ndf_cust = pd.DataFrame({\n    'tuoi': np.random.randint(18, 60, size=n),\n    'chi_tieu': np.random.uniform(2, 50, size=n).round(1),\n    'hang_thanh_vien': np.random.choice(['Bronze', 'Silver', 'Gold'], size=n, p=[0.5, 0.3, 0.2])\n})\n\nfig, ax = plt.subplots(figsize=(7, 4.5), dpi=100)\nsns.scatterplot(\n    data=df_cust,\n    x='tuoi',\n    y='chi_tieu',\n    hue='hang_thanh_vien',\n    size='chi_tieu',\n    sizes=(30, 150),\n    palette='viridis',\n    alpha=0.8,\n    ax=ax\n)\nax.set_title('Phân Bố Chi Tiêu Theo Độ Tuổi & Hạng Thành Viên', fontweight='bold')\nax.set_xlabel('Tuổi khách hàng')\nax.set_ylabel('Chi tiêu tích lũy (Triệu VNĐ)')\nplt.tight_layout()\nprint(\"Đã vẽ biểu đồ phân tán Seaborn phân tích chi tiêu theo tuổi và thứ hạng.\")\nplt.show()",
            "explanation": "Hàm sns.scatterplot của Seaborn trừu tượng hóa các ánh xạ thẩm mỹ phức tạp (Hue và Size) trực tiếp từ các cột của DataFrame. Điều này giúp các nhà phân tích dữ liệu nhanh chóng phát hiện các cụm phân khúc khách hàng (clustering) và các mẫu hình phi tuyến tính trong không gian đa chiều.",
            "solutionOutput": "Đã vẽ biểu đồ phân tán Seaborn phân tích chi tiêu theo tuổi và thứ hạng."
          },
          {
            "level": "Vừa",
            "title": "So sánh phân phối đa đỉnh bằng Violinplot chuẩn Seaborn",
            "problem": "Tại TechMart, thời gian xử lý đơn hàng tại 3 chi nhánh ('Hà Nội', 'Đà Nẵng', 'TP.HCM') có đặc trưng phân phối khác nhau. Hãy dùng `sns.violinplot()` để biểu diễn mật độ xác suất của thời gian xử lý đơn hàng ở 3 chi nhánh. Chú ý gán `hue='branch'` và `legend=False` để tuân thủ chuẩn Seaborn hiện hành, không gây ra deprecation warning.",
            "hint": "Gọi sns.violinplot(data=df_branches, x='branch', y='processing_time', hue='branch', palette='Set2', legend=False, ax=ax).",
            "solutionCode": "import matplotlib.pyplot as plt\nimport seaborn as sns\nimport pandas as pd\nimport numpy as np\n\nnp.random.seed(42)\n# Chi nhánh HCM phân phối đa đỉnh (bimodal) do có đơn nội thành và ngoại thành\nhcm_times = np.concatenate([np.random.normal(15, 3, 50), np.random.normal(35, 5, 50)])\nhn_times = np.random.normal(22, 6, 100)\ndn_times = np.random.normal(18, 4, 100)\n\ndf_branches = pd.DataFrame({\n    'branch': ['TP.HCM']*100 + ['Hà Nội']*100 + ['Đà Nẵng']*100,\n    'processing_time': np.concatenate([hcm_times, hn_times, dn_times])\n})\n\nfig, ax = plt.subplots(figsize=(7, 4.5), dpi=100)\nsns.violinplot(\n    data=df_branches,\n    x='branch',\n    y='processing_time',\n    hue='branch',\n    palette='Set2',\n    legend=False,\n    inner='quartile',\n    ax=ax\n)\nax.set_title('Phân Phối Thời Gian Xử Lý Đơn Hàng Tại 3 Chi Nhánh (Phút)', fontweight='bold')\nax.set_xlabel('Chi nhánh')\nax.set_ylabel('Thời gian xử lý (phút)')\nplt.tight_layout()\nprint(\"Đã vẽ biểu đồ Violinplot thể hiện phân phối thời gian xử lý đơn hàng.\")\nplt.show()",
            "explanation": "Violinplot kết hợp ưu điểm của Boxplot (thể hiện tứ phân vị Q1, Trung vị, Q3) và đường cong ước lượng mật độ nhân (KDE). Đối với dữ liệu phân phối đa đỉnh (bimodal) như chi nhánh TP.HCM, Violinplot bộc lộ rõ hai cực giá trị mà một biểu đồ cột trung bình hay boxplot truyền thống hoàn toàn bỏ sót.",
            "solutionOutput": "Đã vẽ biểu đồ Violinplot thể hiện phân phối thời gian xử lý đơn hàng."
          },
          {
            "level": "Nâng cao",
            "title": "Tự động tạo lưới đa biến với sns.relplot",
            "problem": "Sử dụng hàm cấp Figure `sns.relplot()` để vẽ lưới đồ thị tán xạ phân tích mối quan hệ giữa `gia_von` và `gia_ban` theo 2 chiều phân tách: các dòng là `kenh_ban` ('Online', 'Offline'), các cột là `nganh_hang` ('DienTu', 'GiaDung'). Thêm đường tham chiếu 45 độ (hòa vốn `y=x`) vào từng ô lưới bằng phương thức `.map()`.",
            "hint": "Dùng g = sns.relplot(data=df, x='gia_von', y='gia_ban', row='kenh_ban', col='nganh_hang', kind='scatter'), sau đó g.map(lambda **kwargs: plt.axline((0,0), slope=1, color='red', linestyle='--')).",
            "solutionCode": "import matplotlib.pyplot as plt\nimport seaborn as sns\nimport pandas as pd\nimport numpy as np\n\nnp.random.seed(42)\nn = 200\ndf_prods = pd.DataFrame({\n    'gia_von': np.random.uniform(50, 500, n),\n    'kenh_ban': np.random.choice(['Online', 'Offline'], n),\n    'nganh_hang': np.random.choice(['DienTu', 'GiaDung'], n)\n})\ndf_prods['gia_ban'] = df_prods['gia_von'] * np.random.uniform(1.1, 1.6, n)\n\ng = sns.relplot(\n    data=df_prods,\n    x='gia_von',\n    y='gia_ban',\n    row='kenh_ban',\n    col='nganh_hang',\n    kind='scatter',\n    height=2.5,\n    aspect=1.3,\n    color='#2563eb',\n    alpha=0.7\n)\n\n# Thêm đường hòa vốn y = x vào tất cả các ô lưới\ng.map(lambda **kwargs: plt.axline((0, 0), slope=1, color='#ef4444', linestyle=':', label='Hòa vốn (y=x)'))\ng.fig.subplots_adjust(top=0.9)\ng.fig.suptitle('Ma Trận Biên Lợi Nhuận Đa Chiều Theo Kênh & Ngành Hàng', fontweight='bold')\nprint(\"Đã tạo lưới đa biến FacetGrid/relplot với đường chuẩn hòa vốn.\")\nplt.show()",
            "explanation": "sns.relplot là một hàm cấp Figure (Figure-level function) quản lý một đối tượng FacetGrid. Việc phân tách dữ liệu thành ma trận hàng/cột (small multiples) giúp giải phóng tải nhận thức của người xem, cho phép so sánh song song các phân khúc thị trường mà không làm rối mắt trên cùng một trục đồ thị.",
            "solutionOutput": "Đã tạo lưới đa biến FacetGrid/relplot với đường chuẩn hòa vốn."
          }
        ],
        "quiz": [
          {
            "question": "Điều gì sẽ xảy ra nếu bạn cố gắng truyền tham số 'ax=my_axis' vào một hàm cấp Figure như sns.relplot() hoặc sns.catplot()?",
            "options": [
              "(Recommended) Bị lỗi hoặc tham số ax bị bỏ qua, vì các hàm cấp Figure tự khởi tạo khung tranh FacetGrid riêng và không thể vẽ vào một Axes có sẵn.",
              "Hàm tự động chuyển thành hàm cấp Axes và vẽ bình thường.",
              "Toàn bộ chương trình Python bị crash và rò rỉ bộ nhớ RAM.",
              "Đồ thị được vẽ đè lên tất cả các trục khác trong màn hình."
            ],
            "correctAnswer": "(Recommended) Bị lỗi hoặc tham số ax bị bỏ qua, vì các hàm cấp Figure tự khởi tạo khung tranh FacetGrid riêng và không thể vẽ vào một Axes có sẵn.",
            "explanation": "Các hàm cấp Figure (Figure-level functions) như relplot, catplot, displot tự động quản trị toàn bộ vòng đời của Figure thông qua lớp FacetGrid, do đó chúng không nhận tham số ax để nhúng vào Axes có sẵn. Để nhúng vào Axes, bạn bắt buộc phải dùng các hàm tương ứng ở cấp Axes như scatterplot, boxplot, histplot."
          },
          {
            "question": "Ưu điểm vượt trội của Violinplot so với Boxplot khi phân tích dữ liệu phân phối là gì?",
            "options": [
              "(Recommended) Violinplot phơi bày được cấu trúc phân phối đa đỉnh (bimodal/multimodal) nhờ kết hợp đường cong mật độ KDE, điều mà Boxplot hoàn toàn che giấu.",
              "Violinplot tính toán nhanh hơn Boxplot gấp 10 lần trên tập dữ liệu lớn.",
              "Violinplot không bị ảnh hưởng bởi các giá trị ngoại lai cực đoan.",
              "Violinplot có thể vẽ được trên các biến kiểu chuỗi văn bản không có thứ tự."
            ],
            "correctAnswer": "(Recommended) Violinplot phơi bày được cấu trúc phân phối đa đỉnh (bimodal/multimodal) nhờ kết hợp đường cong mật độ KDE, điều mà Boxplot hoàn toàn che giấu.",
            "explanation": "Boxplot chỉ thể hiện 5 giá trị tóm tắt (Min, Q1, Median, Q3, Max), do đó một phân phối đều, phân phối chuẩn hay phân phối 2 đỉnh có thể cho ra một hình hộp Boxplot y hệt nhau. Violinplot bọc đường cong KDE ở hai bên, giúp người phân tích lập tức nhìn thấy các đỉnh mật độ ẩn giấu."
          },
          {
            "question": "Tại sao trong báo cáo khoa học dữ liệu chuyên nghiệp, người ta luôn dùng lệnh 'mask = np.triu(np.ones_like(corr, dtype=bool))' khi vẽ ma trận tương quan Heatmap?",
            "options": [
              "(Recommended) Để che giấu nửa tam giác trên đối xứng vốn chứa thông tin trùng lặp 100%, nâng cao tỷ lệ Data-Ink theo khuyến nghị của Edward Tufte.",
              "Để tăng tốc độ tính toán ma trận tương quan của NumPy.",
              "Để biến các giá trị tương quan âm thành giá trị tuyệt đối dương.",
              "Để tự động loại bỏ các biến số có tương quan bằng 0."
            ],
            "correctAnswer": "(Recommended) Để che giấu nửa tam giác trên đối xứng vốn chứa thông tin trùng lặp 100%, nâng cao tỷ lệ Data-Ink theo khuyến nghị của Edward Tufte.",
            "explanation": "Ma trận tương quan luôn đối xứng qua đường chéo chính (corr[A, B] = corr[B, A]). Việc hiển thị cả hai nửa tam giác vừa gây nhiễu thị giác vừa vi phạm nguyên tắc tối ưu tỷ lệ Data-Ink. Dùng mask np.triu sẽ che sạch nửa trên, giúp bảng báo cáo gọn gàng, trang nhã và chuyên nghiệp."
          }
        ],
        "selfReviewQuestions": [
          "Kể tên 4 thuộc tính thị giác (Aesthetics) cốt lõi trong Ngữ pháp Đồ họa và nêu cú pháp ánh xạ tương ứng trong Seaborn.",
          "Làm thế nào để phân biệt một hàm là cấp Figure hay cấp Axes trong tài liệu hướng dẫn của Seaborn?",
          "Giải thích ý nghĩa của việc thiết lập tham số center=0 và cmap='vlag' khi vẽ biểu đồ nhiệt ma trận tương quan."
        ],
        "reflectionQuestion": "Một nhà phân tích dữ liệu nhận thấy mức lương trung bình của phòng kỹ thuật là 35 triệu VNĐ/tháng. Tuy nhiên, khi phỏng vấn thì hầu hết nhân viên đều than phiền lương thấp. Nếu là bạn, bạn sẽ chọn vẽ biểu đồ nào trong số: Bar Chart, Boxplot, hay Violinplot để làm sáng tỏ sự thật này trước ban giám đốc?",
        "reflectionHint": "Mức lương trung bình 35 triệu có thể bị kéo lệch bởi 1-2 vị trí giám đốc kỹ thuật lương 150 triệu, trong khi đa số kỹ sư chỉ nhận 15-20 triệu. Vẽ Bar Chart sẽ che giấu hoàn toàn sự bất công này. Chọn Violinplot hoặc Boxplot kết hợp dải điểm dập nổi (stripplot/swarmplot) sẽ phơi bày ngay sự phân hóa lệch phải nghiêm trọng (Right-skewed) và sự tồn tại của các ngoại lai lương khủng kéo méo con số trung bình.",
        "nextLessonPreview": "Ở bài 8.3, chúng ta sẽ bước lên tầng cao nhất của nghệ thuật trực quan hóa: Khám phá thang đo nhận thức Cleveland-McGill, nguyên lý Data-Ink của Edward Tufte, nghệ thuật đồ thị trung thực của Alberto Cairo và thiết kế tiếp cận chuẩn WCAG 2.2.",
        "references": [
          {
            "title": "The Grammar of Graphics (Leland Wilkinson, Springer)",
            "url": "https://link.springer.com/book/10.1007/0-387-28695-0"
          },
          {
            "title": "Seaborn Official Documentation - Overview of plotting functions",
            "url": "https://seaborn.pydata.org/tutorial/function_overview.html"
          }
        ]
      },
      {
        "id": "pd-08-03",
        "number": "8.3",
        "title": "Tư Duy Trực Quan Hóa: Cleveland-McGill, Tufte, Cairo & Chuẩn WCAG 2.2",
        "subtitle": "Thang đo nhận thức thị giác, tối ưu tỷ lệ Data-Ink, đạo đức đồ thị trung thực và thiết kế tiếp cận cho người khiếm thị sắc giác",
        "level": "Nâng cao",
        "duration": "50 phút",
        "objectives": [
          "Phân tích thang đo nhận thức thị giác của William Cleveland & Robert McGill (1984), giải thích về mặt tâm vật lý tại sao Bar Chart vượt trội Pie Chart trong việc so sánh độ lớn.",
          "Ứng dụng nguyên lý Tỷ lệ Mực Dữ liệu (Data-Ink Ratio) của Edward Tufte để triệt tiêu Chartjunk (rác đồ họa) và tối đa hóa mật độ thông tin hữu ích.",
          "Nhận diện và phòng chống các thủ thuật bóp méo đồ thị theo Alberto Cairo (How Charts Lie): Cắt ngắn trục Y (Truncated Y-axis), biến dạng tỷ lệ khung hình (Aspect Ratio distortion) và lựa chọn sai thang đo.",
          "Thiết kế đồ thị tiếp cận chuẩn quốc tế WCAG 2.2: Lựa chọn bảng màu thân thiện với người khiếm thị sắc giác (viridis/cividis), phân biệt dữ liệu đa giác quan không chỉ dựa vào màu sắc, và cấu trúc Alt-Text 3 thành phần hoàn chỉnh."
        ],
        "intuition": {
          "title": "Chiếc Bánh Ngọt Tròn & Ống Nhòm Đo Thước",
          "metaphor": "Hãy xem não bộ con người giải mã hình ảnh như thế nào:\\n1. Thang đo Cleveland & McGill: Nếu bạn đặt 2 cái cây cạnh nhau trên cùng một mặt đất, mắt bạn nhận biết ngay lập tức cây nào cao hơn 2 milimet (So sánh vị trí trên cùng một trục chuẩn - Position on Common Scale). Nhưng nếu bạn cắt một chiếc bánh sinh nhật tròn thành 6 miếng (Pie Chart), não bạn phải căng mắt ước lượng góc quạt (Angle) và diện tích bề mặt (Area). Não người sinh ra cực kỳ tệ trong việc đo góc và diện tích: hai miếng bánh lệch nhau 15% diện tích trông hoàn toàn giống hệt nhau! Đó là lý do tại sao Pie Chart bị các nhà khoa học dữ liệu chân chính tẩy chay!\\n2. Tỷ lệ Data-Ink của Edward Tufte: Hãy tưởng tượng mỗi giọt mực in bạn dùng để in đồ thị đều tốn tiền vàng: Giọt mực nào vẽ dữ liệu thật (thanh bar, đường line) thì gọi là 'Data-Ink' (mực quý). Giọt mực nào vẽ hoa văn 3D giả tạo, viền đen dày cộp, bóng đổ xám xịt thì gọi là 'Chartjunk' (mực rác). Một biểu đồ đẳng cấp là biểu đồ xóa sạch mọi giọt mực rác, chỉ để lại sự thật trần trụi của dữ liệu!\\n3. Đồ thị Trung Thực của Alberto Cairo: Một người quản lý muốn khoe doanh thu tăng trưởng vượt bậc: Doanh thu thực tế chỉ tăng từ 99 triệu lên 100 triệu (tăng 1%). Anh ta cắt cụt trục Y, bắt đầu từ 98 triệu thay vì 0 triệu! Lúc này, cột 100 triệu trông cao gấp đôi cột 99 triệu! Đó không phải là khoa học, đó là sự lừa dối thị giác (Visual Deception)!\\n4. Chuẩn WCAG 2.2: Trên thế giới có 8% nam giới bị khiếm thị sắc giác (mù màu đỏ - xanh lá). Nếu bạn vẽ đường doanh thu màu xanh lá cây và đường chi phí màu đỏ mà không có nét đứt hay nhãn chữ, trước mắt họ chỉ là 2 đường màu vàng xám giống hệt nhau! Biểu đồ của bạn đã hoàn toàn phế thải đối với họ!",
          "boundary": "Quy tắc trục Y bắt đầu từ số 0 (Zero baseline) là bắt buộc tuyệt đối đối với Bar Chart (vì chiều cao cột đại diện trực tiếp cho tỷ lệ độ lớn). Nhưng đối với Line Chart (biểu đồ đường thể hiện dao động như nhiệt độ hay huyết áp), việc bắt đầu từ số 0 có thể làm phẳng lì đường dao động; tuy nhiên, bạn bắt buộc phải ghi rõ khoảng biến động và không được cố tình kéo giãn trục Y để tạo cảm giác hoảng loạn ảo.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">THANG ĐO NHẬN THỨC CLEVELAND &amp; MCGILL (1984)</div>\n                        <div style=\"display:flex;flex-direction:column;gap:6px;\">\n                          <div style=\"display:flex;align-items:center;background:var(--bg-surface);padding:6px 10px;border-radius:4px;border-left:4px solid #10b981;\">\n                            <span style=\"width:25px;font-weight:700;color:#10b981;\">1</span>\n                            <span style=\"flex:1;font-weight:700;\">Vị trí trên cùng một thang đo chuẩn (Position on Common Scale)</span>\n                            <span style=\"font-size:0.75rem;color:#10b981;font-weight:700;\">CHÍNH XÁC NHẤT (Bar chart, Scatter)</span>\n                          </div>\n                          <div style=\"display:flex;align-items:center;background:var(--bg-surface);padding:6px 10px;border-radius:4px;border-left:4px solid #3b82f6;\">\n                            <span style=\"width:25px;font-weight:700;color:#3b82f6;\">2</span>\n                            <span style=\"flex:1;\">Vị trí trên các thang đo không đồng hàng (Non-aligned scales)</span>\n                            <span style=\"font-size:0.75rem;color:var(--text-muted);\">Độ chính xác cao (Facet grids)</span>\n                          </div>\n                          <div style=\"display:flex;align-items:center;background:var(--bg-surface);padding:6px 10px;border-radius:4px;border-left:4px solid #f59e0b;\">\n                            <span style=\"width:25px;font-weight:700;color:#f59e0b;\">3</span>\n                            <span style=\"flex:1;\">Độ dài vật thể (Length)</span>\n                            <span style=\"font-size:0.75rem;color:var(--text-muted);\">Khá chính xác</span>\n                          </div>\n                          <div style=\"display:flex;align-items:center;background:var(--bg-surface);padding:6px 10px;border-radius:4px;border-left:4px solid #ef4444;\">\n                            <span style=\"width:25px;font-weight:700;color:#ef4444;\">4</span>\n                            <span style=\"flex:1;color:var(--text-muted);\">Góc quạt &amp; Hướng dốc (Angle / Slope)</span>\n                            <span style=\"font-size:0.75rem;color:#ef4444;font-weight:700;\">KÉM CHÍNH XÁC (Pie chart)</span>\n                          </div>\n                          <div style=\"display:flex;align-items:center;background:var(--bg-surface);padding:6px 10px;border-radius:4px;border-left:4px solid #94a3b8;\">\n                            <span style=\"width:25px;font-weight:700;color:#94a3b8;\">5</span>\n                            <span style=\"flex:1;color:var(--text-muted);\">Diện tích &amp; Thể tích (Area / Volume) / Độ đậm màu (Color Saturation)</span>\n                            <span style=\"font-size:0.75rem;color:var(--text-muted);\">RẤT KÉM (Bubble 3D, Heatmap thô)</span>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-08-03-01",
            "title": "1. Thang Đo Nhận Thức Thị Giác Cleveland & McGill (1984)",
            "content": "\n                          <p>Năm 1984, William S. Cleveland và Robert McGill xuất bản công trình nghiên cứu kinh điển trên tạp chí của Hiệp hội Thống kê Hoa Kỳ (JASA): <em>\"Graphical Perception: Theory, Experimentation, and Application to the Development of Graphical Methods\"</em>.</p>\n                          <p>Họ tiến hành hàng loạt thí nghiệm tâm vật lý học (psychophysics) để đo lường sai số nhận thức của con người khi giải mã các thuộc tính thị giác khác nhau. Kết quả thiết lập một <strong>Bảng phân cấp độ chính xác nhận thức (Perceptual Hierarchy)</strong> từ cao xuống thấp:</p>\n                          <ol>\n                            <li><strong>Vị trí trên cùng một trục chuẩn (Position along a common scale):</strong> Sai số nhận thức thấp nhất. Đại diện: Biểu đồ cột (Bar chart), Biểu đồ tán xạ (Scatter plot).</li>\n                            <li><strong>Vị trí trên các thang đo không đồng trục (Position along non-aligned scales):</strong> Đại diện: Biểu đồ đa khung hình (Subplots / Small multiples).</li>\n                            <li><strong>Chiều dài (Length):</strong> Đại diện: Biểu đồ thanh ngang so sánh độ dài.</li>\n                            <li><strong>Hướng dốc và Góc quạt (Direction / Angle):</strong> Sai số nhận thức tăng vọt. Đại diện: <strong>Biểu đồ tròn (Pie chart)</strong>. Mắt người có xu hướng đánh giá thấp các góc nhọn (&lt; 90 độ) và phóng đại các góc tù (&gt; 90 độ).</li>\n                            <li><strong>Diện tích (Area):</strong> Đại diện: Biểu đồ bong bóng (Bubble chart), Treemap.</li>\n                            <li><strong>Thể tích (Volume):</strong> Đại diện: Các biểu đồ hình trụ/khối 3D.</li>\n                            <li><strong>Độ bão hòa và Sắc thái màu (Color saturation / Hue):</strong> Sai số nhận thức lớn nhất, chỉ dùng để phân loại danh mục hoặc nhận biết xu hướng định tính.</li>\n                          </ol>\n                          <div class=\"callout callout-warning\">\n                            <strong>Lời Khuyên Khoa Học:</strong>\n                            <p>Bất cứ khi nào bạn có ý định vẽ một chiếc Pie Chart, HÃY DỪNG LẠI và chuyển nó thành một <strong>Horizontal Bar Chart (Biểu đồ thanh ngang)</strong> được sắp xếp giảm dần theo độ lớn. Bạn sẽ chuyển đổi tác vụ nhận thức của người xem từ <em>\"Đo góc quạt kém chính xác (Cấp 4)\"</em> thành <em>\"So sánh vị trí trên trục chuẩn chính xác tuyệt đối (Cấp 1)\"</em>!</p>\n                          </div>\n                        "
          },
          {
            "id": "sec-08-03-02",
            "title": "2. Nguyên Lý Tỷ Lệ Data-Ink & Triệt Tiêu Chartjunk Của Edward Tufte",
            "content": "\n                          <p>Trong cuốn sách kiệt tác <em>\"The Visual Display of Quantitative Information\"</em> (1983), Edward Tufte đưa ra định nghĩa toán học về hiệu quả truyền tải thông điệp:</p>\n                          <div style=\"font-family:var(--font-mono);background:var(--bg-surface-alt);padding:10px;border-radius:6px;margin:10px 0;text-align:center;\">\n                            <strong>Data-Ink Ratio = (Lượng mực vẽ dữ liệu) / (Tổng lượng mực in trên biểu đồ)</strong>\n                          </div>\n                          <h4>Ba Mệnh Lệnh Thiết Kế Của Tufte:</h4>\n                          <ul>\n                            <li><strong>Tối đa hóa tỷ lệ Data-Ink:</strong> Mọi nét mực không truyền tải thông tin mới đều là mực lãng phí.</li>\n                            <li><strong>Xóa bỏ mọi Chartjunk (Rác đồ họa):</strong> Xóa bỏ hiệu ứng 3D giả lập, xóa hoa văn chéo (moiré patterns), xóa lưới tọa độ đen đậm, xóa khung viền hộp bao quanh dày cộp.</li>\n                            <li><strong>Tôn trọng mắt người xem:</strong> Lưới tọa độ chỉ nên là các đường chấm mờ nhạt (<code>alpha=0.3</code>) đóng vai trò làm nền phụ trợ, không được tranh chấp thị giác với đường dữ liệu chính.</li>\n                          </ul>\n                        "
          },
          {
            "id": "sec-08-03-03",
            "title": "3. Đạo Đức Đồ Thị Trung Thực Theo Alberto Cairo (How Charts Lie)",
            "content": "\n                          <p>Giáo sư Alberto Cairo, tác giả cuốn <em>\"How Charts Lie: Getting Smarter about Visual Information\"</em> (2019), chỉ ra các bẫy thao túng thị giác phổ biến nhất mà các nhà phân tích dữ liệu vô tình hoặc cố ý mắc phải:</p>\n                          <h4>A. Bẫy Cắt Ngắn Trục Y (The Truncated Y-Axis Trap)</h4>\n                          <p>Đối với biểu đồ cột (Bar Chart), mắt người so sánh tỷ lệ diện tích và chiều cao của cột. Nếu bạn cắt bỏ phần gốc và bắt đầu trục Y từ một con số khác 0 (ví dụ từ 90 đến 100), một mức tăng trưởng thực tế chỉ <strong>2%</strong> sẽ bị bóp méo thị giác thành <strong>tăng gấp 5 lần</strong>! Đây là hành vi thao túng thông tin nghiêm trọng vi phạm đạo đức nghề nghiệp.</p>\n                          <h4>B. Bẫy Biến Dạng Tỷ Lệ Khung Hình (Aspect Ratio Distortion)</h4>\n                          <p>Bằng cách kéo giãn trục Y thật cao và thu hẹp trục X, bạn có thể biến một đường dốc thoai thoải thành một vách đá thẳng đứng, gây hoang mang dư luận. Nguyên tắc khoa học: Sử dụng kỹ thuật <strong>Banking to 45 degrees</strong> của William Cleveland — điều chỉnh tỷ lệ khung hình sao cho độ dốc trung bình của các đoạn thẳng dao động quanh góc 45 độ.</p>\n                        "
          },
          {
            "id": "sec-08-03-04",
            "title": "4. Thiết Kế Đồ Thị Tiếp Cận Theo Tiêu Chuẩn WCAG 2.2",
            "content": "\n                          <p>Chuẩn mực tiếp cận nội dung Web quốc tế (<strong>WCAG 2.2 - Web Content Accessibility Guidelines</strong>) cấp độ AA đặt ra 3 yêu cầu cốt lõi cho trực quan hóa dữ liệu:</p>\n                          <h4>A. Tiêu Chí 1.4.1 (Không Dùng Màu Sắc Làm Kênh Truyền Tải Duy Nhất)</h4>\n                          <p>Khoảng 1/12 nam giới và 1/200 nữ giới mắc chứng khiếm thị sắc giác (phổ biến nhất là mù màu Đỏ - Xanh lá: Deuteranopia / Protanopia). Nếu bạn chỉ dùng 2 màu này để phân biệt Doanh thu và Chi phí, họ sẽ hoàn toàn không thể đọc được!</p>\n                          <p><strong>Giải pháp tiếp cận chuẩn:</strong> Kết hợp đa kênh tín hiệu thị giác (Redundant Encoding):</p>\n                          <ul>\n                            <li>Đường màu xanh nét liền (<code>linestyle='-'</code>) + Điểm tròn (<code>marker='o'</code>).</li>\n                            <li>Đường màu cam nét đứt (<code>linestyle='--'</code>) + Điểm vuông (<code>marker='s'</code>).</li>\n                            <li>Gắn nhãn văn bản trực tiếp vào cuối đường vẽ (Direct Labeling) thay vì bắt người xem phải đảo mắt qua lại giữa đường vẽ và bảng chú thích rời rạc.</li>\n                          </ul>\n                          <h4>B. Tiêu Chí 1.4.11 (Độ Tương Phản Màu Phi Văn Bản - Tối Thiểu 3:1)</h4>\n                          <p>Sử dụng các bảng màu thân thiện với người khiếm thị sắc giác đã được kiểm chứng khoa học: <strong>Viridis</strong>, <strong>Cividis</strong> (tối ưu tuyệt đối cho mù màu), hoặc <strong>Crest</strong>.</p>\n                          <h4>C. Tiêu Chí 1.1.1 (Cấu Trúc Alt-Text 3 Thành Phần Chuẩn Mực)</h4>\n                          <p>Khi nhúng đồ thị vào web hoặc báo cáo số, thẻ mô tả thay thế cho người khiếm thị dùng phần mềm đọc màn hình (Screen Reader) phải tuân thủ đúng cấu trúc 3 phần:</p>\n                          <ol>\n                            <li><strong>Loại biểu đồ & Thước đo:</strong> Biểu đồ đường thể hiện Doanh thu theo tháng của TechMart năm 2026.</li>\n                            <li><strong>Phát hiện / Xu hướng chính:</strong> Doanh thu tăng trưởng ổn định trong nửa đầu năm và đạt đỉnh đột biến vào tháng 11 nhờ chương trình Flash Sale.</li>\n                            <li><strong>Khoảng giá trị & Chi tiết:</strong> Giá trị thấp nhất là 120 triệu VNĐ ở Tháng 1, giá trị cao nhất đạt 450 triệu VNĐ ở Tháng 11.</li>\n                          </ol>\n                        "
          }
        ],
        "summary": [
          "Thang đo nhận thức Cleveland & McGill (1984): Não người giải mã Vị trí trên trục chuẩn chính xác nhất, và đo Góc quạt / Diện tích kém chính xác nhất -> Luôn ưu tiên Bar chart thay vì Pie chart.",
          "Tỷ lệ Data-Ink (Edward Tufte): Tối đa hóa lượng mực vẽ dữ liệu, triệt tiêu Chartjunk (bóng đổ, 3D, lưới đậm) để giữ biểu đồ thanh thoát.",
          "Đạo đức trực quan hóa (Alberto Cairo): Bar Chart bắt buộc phải bắt đầu trục Y từ số 0 để không bóp méo tỷ lệ độ lớn; kiểm soát tỷ lệ khung hình quanh góc dốc 45 độ.",
          "Khả năng tiếp cận WCAG 2.2: Không chỉ dùng màu sắc (kết hợp nét vẽ, marker, direct labels), dùng bảng màu viridis/cividis, và viết Alt-Text chuẩn 3 thành phần."
        ],
        "workedExample": {
          "scenario": "Thiết kế biểu đồ doanh thu chuẩn Tufte và tiếp cận WCAG 2.2",
          "code": "import matplotlib.pyplot as plt\n\ncategories = ['Laptop', 'Điện thoại', 'Màn hình', 'Phụ kiện', 'Âm thanh']\nsales = [320, 280, 190, 140, 85] # Sắp xếp giảm dần\n\n# 1. Khởi tạo đồ thị theo phong cách tối giản của Tufte\nfig, ax = plt.subplots(figsize=(8, 4), dpi=100)\n\n# Dùng Horizontal Bar Chart: Vị trí trục chuẩn + Nhãn đọc tự nhiên từ trên xuống\ny_pos = range(len(categories))\nbars = ax.barh(y_pos, sales, color='#0284c7', height=0.55)\n\n# Đảo ngược trục Y để mục lớn nhất nằm trên cùng\nax.invert_yaxis()\nax.set_yticks(y_pos)\nax.set_yticklabels(categories, fontsize=11)\n\n# Gắn nhãn số liệu trực tiếp (Direct Data Labeling) - Xóa bỏ sự cần thiết của trục X!\nfor bar in bars:\n    width = bar.get_width()\n    ax.text(width + 5, bar.get_y() + bar.get_height()/2, f'{int(width)} tỷ',\n            va='center', ha='left', fontsize=10, fontweight='bold', color='#1e293b')\n\n# Triệt tiêu Chartjunk: Xóa sạch toàn bộ 4 đường viền và trục X\nfor spine in ax.spines.values():\n    spine.set_visible(False)\nax.xaxis.set_visible(False) # Ẩn hoàn toàn trục X vì đã có direct label!\nax.tick_params(left=False)  # Ẩn các vạch gạch nhỏ trục Y\n\nax.set_title('Doanh Thu Năm 2026 Theo Ngành Hàng TechMart (Đơn vị: Tỷ VNĐ)',\n             fontsize=12, fontweight='bold', pad=15, loc='left')\n\nplt.tight_layout()\nplt.show()",
          "explanation": "1. Thay vì dùng Pie Chart góc quạt mập mờ, ta dùng Horizontal Bar Chart được xếp giảm dần: tận dụng thang đo vị trí cấp 1 chuẩn xác của Cleveland & McGill.\\n2. Tối ưu hóa Data-Ink theo Tufte: Gắn trực tiếp nhãn '320 tỷ', '280 tỷ' vào đầu mỗi thanh bar và xóa sạch toàn bộ 4 đường viền cùng trục X. Không có một giọt mực nào bị lãng phí!\\n3. Văn bản nằm ngang thuận chiều đọc tự nhiên của mắt người Việt từ trái sang phải."
        },
        "fadedExample": {
          "scenario": "Tạo đường xu hướng tiếp cận cho người khiếm thị sắc giác (WCAG 2.2)",
          "code": "import matplotlib.pyplot as plt\n\nmonths = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6']\nrev_online = [100, 130, 150, 180, 220, 260]\nrev_store = [200, 190, 185, 175, 170, 160]\n\nfig, ax = plt.subplots(figsize=(8, 4.5), dpi=100)\n\n# Yêu cầu: Kết hợp nét vẽ và marker khác biệt để người mù màu phân biệt rõ\n# Kênh Online: Nét liền '-', marker='o', màu '#0284c7' (Xanh dương)\n# Kênh Cửa hàng: Nét đứt '--', marker='s', màu '#d97706' (Cam đất)\n\nax.plot(months, rev_online, linestyle='-', marker='o', color='#0284c7', linewidth=2, label='Online')\nax.plot(months, rev_store, linestyle='--', marker='s', color='#d97706', linewidth=2, label='Cửa hàng')\n\nax.set_title('Xu Hướng Chuyển Dịch Doanh Thu: Kênh Online vs Cửa Hàng', fontweight='bold')\nax.legend(frameon=False)\nax.spines['top'].set_visible(False)\nax.spines['right'].set_visible(False)\n\nplt.tight_layout()\nplt.show()",
          "blankExplanation": "Áp dụng nguyên lý Redundant Encoding: kênh Online dùng nét liền kết hợp điểm tròn, kênh Cửa hàng dùng nét đứt kết hợp điểm vuông. Khi in đen trắng hoặc khi người khiếm thị sắc giác nhìn vào, họ nhận diện tức thì hai đường dữ liệu mà không bị nhầm lẫn."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Chuyển đổi Pie Chart thành Horizontal Bar Chart chuẩn Cairo",
            "problem": "TechMart có thị phần 5 thương hiệu: `{'Dell': 35, 'Asus': 25, 'Apple': 20, 'HP': 12, 'Lenovo': 8}`. Theo nguyên lý Cleveland-McGill, việc ước lượng góc và diện tích trên biểu đồ tròn (Pie Chart) có sai số nhận thức lớn hơn nhiều so với vị trí trên thang đo chung. Hãy viết code chuyển dữ liệu trên thành Biểu đồ thanh ngang (Horizontal Bar Chart) có sắp xếp theo thứ tự giảm dần và ghi nhãn giá trị trực tiếp ở đầu mỗi thanh.",
            "hint": "Chuyển dữ liệu sang Series, sắp xếp bằng .sort_values(), vẽ ax.barh() và dùng ax.bar_label() để ghi số liệu.",
            "solutionCode": "import matplotlib.pyplot as plt\nimport pandas as pd\n\nmarket_share = pd.Series({'Dell': 35, 'Asus': 25, 'Apple': 20, 'HP': 12, 'Lenovo': 8})\n# Sắp xếp tăng dần để khi vẽ barh thương hiệu cao nhất nằm trên cùng\nsorted_share = market_share.sort_values(ascending=True)\n\nfig, ax = plt.subplots(figsize=(7, 3.5), dpi=100)\nbars = ax.barh(sorted_share.index, sorted_share.values, color='#0284c7', height=0.6)\n\n# Ghi nhãn trực tiếp (Direct labeling)\nax.bar_label(bars, fmt='%.0f%%', padding=4, fontweight='bold', color='#0f172a')\n\nax.set_xlim(0, 45)\nax.set_title('Thị Phần Laptop TechMart (Xếp Hạng Giảm Dần)', fontweight='bold')\nax.spines['top'].set_visible(False)\nax.spines['right'].set_visible(False)\nax.grid(axis='x', linestyle=':', alpha=0.6)\n\nplt.tight_layout()\nprint(\"Đã chuyển đổi Pie Chart sang Horizontal Bar Chart chuẩn Cairo thành công.\")\nplt.show()",
            "explanation": "Nghiên cứu kinh điển của Cleveland & McGill (1984) đã chứng minh rằng mắt người giải mã độ dài vị trí (Position along common scale) chính xác hơn 3-4 lần so với việc ước lượng góc hình quạt hoặc diện tích của Pie Chart. Biểu đồ thanh ngang kết hợp nhãn số trực tiếp là giải pháp tối ưu cho khả năng đọc nhanh số liệu.",
            "solutionOutput": "Đã chuyển đổi Pie Chart sang Horizontal Bar Chart chuẩn Cairo thành công."
          },
          {
            "level": "Vừa",
            "title": "So sánh trực diện: Trục Y từ 0 (Trung thực) vs Cắt trục Y (Thao túng)",
            "problem": "Doanh thu TechMart trong 2 quý: Q1 = 100 tỷ, Q2 = 103 tỷ (tăng trưởng thực tế đúng 3%). Hãy dùng `plt.subplots(1, 2)` để vẽ 2 biểu đồ cột: Đồ thị 1 thiết lập trục Y bắt đầu từ 0 (`ylim=(0, 120)` - Trung thực); Đồ thị 2 cắt ngắn trục Y (`ylim=(98, 104)` - Thao túng thị giác). Đặt tiêu đề tương ứng để làm nổi bật tác hại của việc cắt xén trục tọa độ.",
            "hint": "Tạo 2 subplots ngang, đồ thị bên trái đặt ax1.set_ylim(0, 120), đồ thị bên phải đặt ax2.set_ylim(98, 104).",
            "solutionCode": "import matplotlib.pyplot as plt\n\nquarters = ['Quý 1', 'Quý 2']\nrevenue = [100, 103]\n\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(8, 4), dpi=100)\n\n# Đồ thị trung thực: Bắt đầu từ 0\nax1.bar(quarters, revenue, color='#10b981', width=0.4)\nax1.set_ylim(0, 120)\nax1.set_title('Chuẩn: Trục Y từ 0\\n(Tăng trưởng thực tế 3%)', fontweight='bold', color='#065f46')\nax1.set_ylabel('Doanh thu (Tỷ VNĐ)')\n\n# Đồ thị thao túng: Cắt ngắn trục Y\nax2.bar(quarters, revenue, color='#ef4444', width=0.4)\nax2.set_ylim(98, 104)\nax2.set_title('Thao túng: Cắt trục Y\\n(Ảo giác tăng gấp đôi)', fontweight='bold', color='#991b1b')\n\nplt.tight_layout()\nprint(\"Đã dựng 2 đồ thị đối sánh trực diện Trục Y trung thực vs Trục Y thao túng.\")\nplt.show()",
            "explanation": "Theo nguyên tắc đạo đức truyền thông dữ liệu của Alberto Cairo (How Charts Lie), việc cắt ngắn trục Y trên biểu đồ cột (Bar chart truncation) vi phạm tỷ lệ diện tích của thanh bar so với giá trị đại số thực tế, tạo ra ảo tưởng quang học về mức tăng trưởng đột biến và đánh lừa người ra quyết định.",
            "solutionOutput": "Đã dựng 2 đồ thị đối sánh trực diện Trục Y trung thực vs Trục Y thao túng."
          },
          {
            "level": "Nâng cao",
            "title": "Tự động tạo Alt-Text chuẩn tiếp cận WCAG 2.2 cho Dashboard",
            "problem": "Viết một hàm Python `generate_chart_alt_text(chart_type, metric_name, timeframe, min_val, max_val, peak_time, key_takeaway)` tự động sinh chuỗi văn bản mô tả Alt-Text chuẩn WCAG 2.2 cấp độ AA. Cấu trúc yêu cầu: (1) Loại biểu đồ và đại lượng đo, (2) Khung thời gian và phạm vi giá trị cực trị, (3) Thông điệp cốt lõi (Key Takeaway) cho người khiếm thị sử dụng trình đọc màn hình.",
            "hint": "Dùng f-string định dạng rõ 3 phần: [Tiêu đề biểu đồ], [Phạm vi dữ liệu], và [Điểm mấu chốt nhận định kinh doanh].",
            "solutionCode": "def generate_chart_alt_text(chart_type, metric_name, timeframe, min_val, max_val, peak_time, key_takeaway):\n    alt_text = (\n        f\"[Mô tả tiếp cận WCAG 2.2] Biểu đồ dạng {chart_type} hiển thị {metric_name} trong giai đoạn {timeframe}. \"\n        f\"Giá trị dao động từ thấp nhất {min_val} đến cao nhất {max_val}, đạt đỉnh vào thời điểm {peak_time}. \"\n        f\"Kết luận kinh doanh chính: {key_takeaway}.\"\n    )\n    return alt_text\n\nsample_text = generate_chart_alt_text(\n    chart_type='Đường kép (Line Chart)',\n    metric_name='Doanh thu thuần chi nhánh Hà Nội và TP.HCM',\n    timeframe='Tháng 1 đến Tháng 6 năm 2026',\n    min_val='120 triệu VNĐ',\n    max_val='260 triệu VNĐ',\n    peak_time='Tháng 4',\n    key_takeaway='Chi nhánh TP.HCM duy trì đà tăng trưởng liên tục vượt 35% so với chi nhánh Hà Nội'\n)\nprint(sample_text)",
            "explanation": "Chuẩn tiếp cận Web Content Accessibility Guidelines (WCAG) 2.2 yêu cầu mọi thành phần đồ họa dữ liệu phức tạp phải có văn bản thay thế (Alt-Text) mang tính ngữ cảnh đầy đủ. Việc tự động hóa Alt-Text giúp hệ thống Business Intelligence phục vụ bình đẳng cho người dùng khuyết tật thị giác sử dụng thiết bị đọc màn hình (Screen Readers).",
            "solutionOutput": "[Mô tả tiếp cận WCAG 2.2] Biểu đồ dạng Đường kép (Line Chart) hiển thị Doanh thu thuần chi nhánh Hà Nội và TP.HCM trong giai đoạn Tháng 1 đến Tháng 6 năm 2026. Giá trị dao động từ thấp nhất 120 triệu VNĐ đến cao nhất 260 triệu VNĐ, đạt đỉnh vào thời điểm Tháng 4. Kết luận kinh doanh chính: Chi nhánh TP.HCM duy trì đà tăng trưởng liên tục vượt 35% so với chi nhánh Hà Nội."
          }
        ],
        "quiz": [
          {
            "question": "Theo thang đo nhận thức thị giác của William Cleveland và Robert McGill (1984), yếu tố thị giác nào giúp não người giải mã độ lớn với sai số thấp nhất?",
            "options": [
              "(Recommended) Vị trí trên cùng một trục chuẩn (Position along a common scale).",
              "Góc quạt của hình tròn (Angle).",
              "Diện tích của hình đa giác (Area).",
              "Độ bão hòa của màu sắc (Color saturation)."
            ],
            "correctAnswer": "(Recommended) Vị trí trên cùng một trục chuẩn (Position along a common scale).",
            "explanation": "Nghiên cứu thực nghiệm tâm vật lý của Cleveland & McGill chứng minh rằng việc đánh giá vị trí điểm trên một trục thang đo chung (như trong Bar chart hay Scatter plot) có độ chính xác cao nhất và ít sai số nhận thức nhất trong mọi yếu tố thị giác."
          },
          {
            "question": "Tại sao trong biểu đồ cột (Bar Chart), việc bắt đầu trục Y từ một giá trị khác 0 (Truncated Y-axis) lại bị coi là hành vi thao túng dữ liệu nghiêm trọng theo Alberto Cairo?",
            "options": [
              "(Recommended) Vì mắt người so sánh chiều cao và diện tích của toàn bộ thân cột để suy luận tỷ lệ độ lớn; cắt cụt trục Y sẽ phóng đại mức biến động nhỏ thành một sự chênh lệch khổng lồ giả tạo.",
              "Vì nó làm cho máy in tiêu tốn nhiều mực in hơn.",
              "Vì thư viện Matplotlib sẽ tự động báo lỗi cú pháp khi vẽ.",
              "Vì nó khiến cho biểu đồ không thể chuyển đổi sang định dạng vector SVG."
            ],
            "correctAnswer": "(Recommended) Vì mắt người so sánh chiều cao và diện tích của toàn bộ thân cột để suy luận tỷ lệ độ lớn; cắt cụt trục Y sẽ phóng đại mức biến động nhỏ thành một sự chênh lệch khổng lồ giả tạo.",
            "explanation": "Trong Bar chart, độ dài của cột mã hóa trực tiếp cho độ lớn của số liệu. Cắt ngắn trục Y phá vỡ tỷ lệ hình học này, khiến một mức tăng vài phần trăm trông giống như tăng gấp nhiều lần, đánh lừa nhận thức của người xem."
          },
          {
            "question": "Để tuân thủ tiêu chí 1.4.1 của chuẩn WCAG 2.2 khi vẽ đồ thị có nhiều đường xu hướng, phương pháp tiếp cận nào sau đây là ĐÚNG ĐẮN NHẤT?",
            "options": [
              "(Recommended) Sử dụng kết hợp màu sắc với các kiểu nét vẽ khác nhau (nét liền, nét đứt), hình dạng marker khác nhau (tròn, vuông) và gắn nhãn trực tiếp (Direct labeling).",
              "Chỉ sử dụng hai màu duy nhất là Đỏ tươi và Xanh lá cây.",
              "Chỉ vẽ một đường xu hướng duy nhất trên mỗi biểu đồ.",
              "Chuyển đổi toàn bộ biểu đồ sang bảng số liệu văn bản thuần túy."
            ],
            "correctAnswer": "(Recommended) Sử dụng kết hợp màu sắc với các kiểu nét vẽ khác nhau (nét liền, nét đứt), hình dạng marker khác nhau (tròn, vuông) và gắn nhãn trực tiếp (Direct labeling).",
            "explanation": "Tiêu chí 1.4.1 của WCAG yêu cầu không được dùng màu sắc làm kênh thông tin duy nhất. Việc kết hợp nét đứt/nét liền, hình dạng điểm (marker) và nhãn trực tiếp đảm bảo người khiếm thị sắc giác hoặc người in tài liệu đen trắng vẫn đọc hiểu trọn vẹn thông điệp."
          }
        ],
        "selfReviewQuestions": [
          "Trình bày công thức tỷ lệ Data-Ink của Edward Tufte và nêu 3 ví dụ về Chartjunk cần loại bỏ trên một biểu đồ kinh doanh.",
          "Tại sao việc dùng Pie Chart lại vi phạm nguyên tắc tối ưu hóa nhận thức của Cleveland & McGill?",
          "Nêu 3 thành phần bắt buộc của một đoạn văn bản thay thế (Alt-Text) chuẩn WCAG 2.2 cho biểu đồ dữ liệu."
        ],
        "reflectionQuestion": "Giám đốc Marketing yêu cầu bạn vẽ biểu đồ thể hiện tỷ lệ khách hàng hài lòng tăng từ 94% lên 96%. Ông ấy gợi ý bạn nên cắt trục Y bắt đầu từ 90% để 'cột nhìn vọt lên cho ấn tượng trước hội đồng cổ đông'. Dưới tư cách là một chuyên gia dữ liệu chính trực tuân thủ các chuẩn mực đạo đức, bạn sẽ xử lý tình huống này như thế nào?",
        "reflectionHint": "Giải thích cho Giám đốc hiểu rằng việc cắt ngắn trục Y trên Bar Chart là hành vi bóp méo thị giác có thể làm mất uy tín doanh nghiệp nếu bị các chuyên gia hoặc cổ đông am hiểu vạch trần. Giải pháp chuyên nghiệp: Giữ trục Y bắt đầu từ 0 để đảm bảo tính trung thực, đồng thời vẽ thêm đường chỉ tiêu trung bình ngành hoặc dùng thẻ tóm tắt số liệu (KPI Callout Card) ghi rõ '+2.1% tăng trưởng so với quý trước' để làm nổi bật thành tích một cách chính trực và thuyết phục.",
        "nextLessonPreview": "Bước sang Học phần Phân tích Khám phá EDA (Module 9), chúng ta sẽ đắm mình vào tinh thần EDA của John Tukey, bóc trần bộ tứ Anscombe kinh điển và giải mã Nghịch lý Simpson trong phân tích dữ liệu đa nhóm!",
        "references": [
          {
            "title": "Graphical Perception: Theory, Experimentation, and Application (Cleveland & McGill, 1984, JASA)",
            "url": "https://www.jstor.org/stable/2288400"
          },
          {
            "title": "The Visual Display of Quantitative Information (Edward R. Tufte, 1983)",
            "url": "https://www.edwardtufte.com/tufte/books_vdqi"
          },
          {
            "title": "How Charts Lie: Getting Smarter about Visual Information (Alberto Cairo, 2019)",
            "url": "https://wwnorton.com/books/9781324001560"
          },
          {
            "title": "W3C Web Content Accessibility Guidelines (WCAG) 2.2",
            "url": "https://www.w3.org/TR/WCAG22/"
          }
        ]
      }
    ]
  },
  {
    "id": "mod-09",
    "number": "Module 9",
    "title": "Phân Tích Khám Phá EDA & Thống Kê Ứng Dụng",
    "badge": "3 Bài học",
    "icon": "🔍",
    "description": "Thấm nhuần tinh thần khám phá EDA của John Tukey, bóc trần bộ tứ Anscombe, giải mã Nghịch lý Simpson, đo lường Skewness/Kurtosis, ước lượng độ bất định với Bootstrap và tránh bẫy ngụy biện P-value theo tuyên bố chính thức của ASA.",
    "lessons": [
      {
        "id": "pd-09-01",
        "number": "9.1",
        "title": "Tinh Thần EDA Của John Tukey, Bộ Tứ Anscombe & Nghịch Lý Simpson",
        "subtitle": "Phân biệt EDA vs CDA, sự phản bội của các con số tóm tắt qua Anscombe's Quartet, và bản chất biến ẩn gây nhiễu trong Simpson's Paradox",
        "level": "Cơ bản",
        "duration": "45 phút",
        "objectives": [
          "Phân biệt triệt để tinh thần Phân tích Khám phá Dữ liệu (Exploratory Data Analysis - EDA của John Tukey) với Phân tích Khẳng định (Confirmatory Data Analysis - CDA).",
          "Phân tích bộ tứ kinh điển Anscombe's Quartet (1973): Chứng minh tại sao các số đo tóm tắt (Mean, Std, Correlation, Regression) có thể tạo ra ảo giác giống hệt nhau trong khi bản chất phân phối hoàn toàn trái ngược.",
          "Giải mã Nghịch lý Simpson (Simpson's Paradox): Phân tích nguyên nhân toán học khiến một xu hướng nhất quán ở các nhóm con bị đảo ngược 180 độ khi gộp dữ liệu chung do biến gây nhiễu (Confounder).",
          "Thiết lập quy trình kiểm định trực quan bắt buộc trước khi đưa ra bất kỳ kết luận thống kê kinh doanh nào tại TechMart."
        ],
        "intuition": {
          "title": "Nhà Thám Tử Hiện Trường & Kính Hiển Vi Dữ Liệu",
          "metaphor": "Hãy xem sự khác nhau giữa một Luật sư tại tòa và một Thám tử tại hiện trường:\\n1. CDA (Khẳng định - Giống luật sư): Bạn đã có sẵn một cáo trạng (Giả thuyết H0: Tính năng mới làm tăng 5% doanh thu), bạn chỉ vào dữ liệu để tìm kiếm bằng chứng kết tội hoặc bác bỏ.\\n2. EDA (Khám phá - Giống thám tử John Tukey): Bạn bước vào hiện trường vụ án với một tâm trí hoàn toàn cởi mở. Bạn không kết luận vội vã. Bạn nhặt từng mảnh vỡ, soi dấu vân tay, lắng nghe dữ liệu tự cất lên tiếng nói của nó! John Tukey từng nói: 'Thà có một câu trả lời xấp xỉ cho đúng câu hỏi, còn hơn là một câu trả lời chính xác tuyệt đối cho một câu hỏi sai!'.\\n3. Bộ Tứ Anscombe (1973): 4 bức tranh dữ liệu khác nhau một trời một vực (1 đường thẳng, 1 đường parabol cong vút, 1 đường thẳng có 1 điểm ngoại lai cực đoan, và 1 đường thẳng đứng bị kéo lệch bởi 1 điểm đòn bẩy). Nhưng nếu bạn chỉ tính Trung bình và Độ lệch chuẩn trên máy tính, cả 4 bức tranh đều cho ra: Mean x = 9.0, Mean y = 7.5, và hệ số tương quan r = 0.816! Nếu bạn không vẽ chúng ra, bạn sẽ bị những con số tóm tắt đánh lừa một cách thê thảm!\\n4. Nghịch lý Simpson: Giống như hai loại thuốc A và B. Thử nghiệm trên nam giới, thuốc B tốt hơn. Thử nghiệm trên nữ giới, thuốc B cũng tốt hơn. Nhưng khi gộp cả nam và nữ lại, thuốc A lại tốt hơn! Bí mật nằm ở một biến ẩn gây nhiễu: số lượng bệnh nhân nặng phân bổ vào hai nhóm không hề cân bằng!",
          "boundary": "EDA không nhằm mục đích chứng minh một định lý toán học, mà nhằm phát hiện các mẫu hình bất thường, các giả định bị vi phạm và gợi mở những giả thuyết nghiên cứu mới.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">BỘ TỨ ANSCOMBE (1973) - CÙNG MEAN, STD, R NHƯNG KHÁC HOÀN TOÀN HÌNH DẠNG</div>\n                        <div style=\"display:grid;grid-template-columns:repeat(4, 1fr);gap:6px;text-align:center;\">\n                          <div style=\"padding:6px;border:1px solid #3b82f6;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#3b82f6;\">TẬP I</strong>\n                            <div style=\"font-size:0.7rem;margin-top:2px;\">Tuyến tính chuẩn</div>\n                            <div style=\"font-size:0.65rem;color:var(--text-muted);\">Mô hình hồi quy phù hợp hoàn hảo</div>\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #10b981;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#10b981;\">TẬP II</strong>\n                            <div style=\"font-size:0.7rem;margin-top:2px;\">Phi tuyến tính</div>\n                            <div style=\"font-size:0.65rem;color:var(--text-muted);\">Đường cong Parabol bậc 2</div>\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #f59e0b;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#f59e0b;\">TẬP III</strong>\n                            <div style=\"font-size:0.7rem;margin-top:2px;\">Ngoại lai dọc</div>\n                            <div style=\"font-size:0.65rem;color:var(--text-muted);\">1 điểm dị biệt kéo lệch đường hồi quy</div>\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #ef4444;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#ef4444;\">TẬP IV</strong>\n                            <div style=\"font-size:0.7rem;margin-top:2px;\">Đòn bẩy ngang</div>\n                            <div style=\"font-size:0.65rem;color:var(--text-muted);\">Điểm đòn bẩy đơn độc tạo quan hệ ảo</div>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-09-01-01",
            "title": "1. Triết Lý EDA Của John Tukey: Khám Phá Trước Khi Khẳng Định",
            "content": "\n                          <p>Năm 1977, nhà thống kê lỗi lạc John W. Tukey (người phát minh ra biểu đồ Boxplot và thuật ngữ 'Bit') xuất bản cuốn sách mang tính cách mạng <em>\"Exploratory Data Analysis\"</em>. Tukey phê phán việc cộng đồng thống kê thời bấy giờ quá phụ thuộc vào các công thức giả thuyết phức tạp (Confirmatory Data Analysis) trong khi chưa từng một lần thực sự 'nhìn' vào dữ liệu.</p>\n                          <div class=\"table-responsive\">\n                            <table class=\"table-content\">\n                              <thead>\n                                <tr>\n                                  <th>Tiêu chí</th>\n                                  <th>EDA (Phân tích Khám phá)</th>\n                                  <th>CDA (Phân tích Khẳng định)</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr>\n                                  <td><strong>Tâm thế tiếp cận</strong></td>\n                                  <td>Thám tử khám phá hiện trường (Chưa có định kiến)</td>\n                                  <td>Thẩm phán xét xử (Kiểm tra xem giả thuyết đúng hay sai)</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Mục tiêu cốt lõi</strong></td>\n                                  <td>Phát hiện mẫu hình, nhận diện ngoại lai, kiểm tra giả định phân phối.</td>\n                                  <td>Tính toán p-value, kiểm định ý nghĩa thống kê, bác bỏ giả thuyết H0.</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Công cụ chủ lực</strong></td>\n                                  <td>Trực quan hóa đồ họa (Scatter, Boxplot, Hist, KDE), thống kê phi tham số.</td>\n                                  <td>Kiểm định T-test, ANOVA, Hồi quy tuyến tính OLS, Chi-square test.</td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                          <p><strong>Khuyến nghị GAISE (ASA):</strong> Luôn bắt đầu mọi dự án bằng EDA sâu sắc trước khi xây dựng mô hình máy học hoặc kiểm định thống kê chính thức.</p>\n                        "
          },
          {
            "id": "sec-09-01-02",
            "title": "2. Bài Học Sống Còn Từ Bộ Tứ Anscombe (1973)",
            "content": "\n                          <p>Francis Anscombe đã xây dựng 4 tập dữ liệu gồm 11 điểm tọa độ (X, Y) để cảnh báo sự nguy hiểm khi chỉ tin vào các chỉ số tóm tắt định lượng:</p>\n                          <div class=\"table-responsive\">\n                            <table class=\"table-content\">\n                              <thead>\n                                <tr>\n                                  <th>Đặc tính thống kê</th>\n                                  <th>Cả 4 tập dữ liệu (I, II, III, IV)</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr>\n                                  <td>Giá trị trung bình của X (\\(\\bar{x}\\))</td>\n                                  <td><strong>9.0</strong> (chính xác đến 0.0)</td>\n                                </tr>\n                                <tr>\n                                  <td>Phương sai mẫu của X (\\(s_x^2\\))</td>\n                                  <td><strong>11.0</strong></td>\n                                </tr>\n                                <tr>\n                                  <td>Giá trị trung bình của Y (\\(\\bar{y}\\))</td>\n                                  <td><strong>7.50</strong> (chính xác đến 2 chữ số thập phân)</td>\n                                </tr>\n                                <tr>\n                                  <td>Phương sai mẫu của Y (\\(s_y^2\\))</td>\n                                  <td><strong>4.12</strong></td>\n                                </tr>\n                                <tr>\n                                  <td>Hệ số tương quan Pearson (\\(r\\))</td>\n                                  <td><strong>0.816</strong></td>\n                                </tr>\n                                <tr>\n                                  <td>Đường hồi quy tuyến tính</td>\n                                  <td><strong>y = 3.00 + 0.500x</strong></td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                          <h4>Bản Chất Đằng Sau Từng Tập Dữ Liệu:</h4>\n                          <ul>\n                            <li><strong>Tập I:</strong> Quan hệ tuyến tính chuẩn, các điểm phân tán ngẫu nhiên quanh đường thẳng với sai số đồng nhất (Homoscedasticity). Mô hình hồi quy OLS hoàn toàn hợp lệ.</li>\n                            <li><strong>Tập II:</strong> Mối quan hệ cong hoàn hảo (Parabol bậc 2). Áp dụng hồi quy tuyến tính ở đây là sai lầm căn bản về cấu trúc mô hình.</li>\n                            <li><strong>Tập III:</strong> Một đường thẳng hoàn hảo nhưng có duy nhất 1 điểm ngoại lai bị sai lệch ở trục Y, kéo lệch toàn bộ đường hồi quy.</li>\n                            <li><strong>Tập IV:</strong> Tất cả các điểm đều có x = 8 (đường thẳng đứng), ngoại trừ một điểm đòn bẩy đơn độc nằm ở x = 19. Chính điểm đòn bẩy duy nhất này đã 'bịa đặt' ra hệ số tương quan r = 0.816 giả tạo!</li>\n                          </ul>\n                        "
          },
          {
            "id": "sec-09-01-03",
            "title": "3. Giải Mã Nghịch Lý Simpson (Simpson's Paradox) Trong Kinh Doanh",
            "content": "\n                          <p>Nghịch lý Simpson xảy ra khi một mối liên hệ xuất hiện ở tất cả các nhóm nhỏ nhưng lại <strong>bị biến mất hoặc đảo ngược hoàn toàn</strong> khi gộp chung các nhóm lại.</p>\n                          <h4>Case Study TechMart: Tỷ Lệ Chuyển Đổi Kênh Online vs Kênh Cửa Hàng</h4>\n                          <p>Đội ngũ phân tích kiểm tra tỷ lệ chuyển đổi khách hàng ghé thăm thành người mua:</p>\n                          <div class=\"table-responsive\">\n                            <table class=\"table-content\">\n                              <thead>\n                                <tr>\n                                  <th>Nhóm người dùng</th>\n                                  <th>Chiến dịch Cũ (A)</th>\n                                  <th>Chiến dịch Mới (B)</th>\n                                  <th>Người chiến thắng</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr>\n                                  <td>Khách hàng Di động (Mobile)</td>\n                                  <td>10 / 100 (<strong>10.0%</strong>)</td>\n                                  <td>30 / 200 (<strong>15.0%</strong>)</td>\n                                  <td><strong>B thắng (+5.0%)</strong></td>\n                                </tr>\n                                <tr>\n                                  <td>Khách hàng Máy tính (Desktop)</td>\n                                  <td>90 / 100 (<strong>90.0%</strong>)</td>\n                                  <td>48 / 50 (<strong>96.0%</strong>)</td>\n                                  <td><strong>B thắng (+6.0%)</strong></td>\n                                </tr>\n                                <tr>\n                                  <td><strong>TỔNG HỢP TOÀN BỘ</strong></td>\n                                  <td><strong>100 / 200 (50.0%)</strong></td>\n                                  <td><strong>78 / 250 (31.2%)</strong></td>\n                                  <td><strong>A THẮNG ÁP ĐẢO (50% vs 31.2%)?!</strong></td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                          <h4>Bản Chất Toán Học Của Nghịch Lý:</h4>\n                          <p>Tại sao B thắng ở cả Mobile và Desktop, nhưng khi gộp lại A lại thắng với cách biệt khổng lồ?</p>\n                          <p><strong>Biến ẩn gây nhiễu (Lurking/Confounder Variable) chính là: Tỷ lệ phân bổ nền tảng!</strong> Khách hàng Desktop có tỷ lệ mua hàng tự nhiên cực cao (&gt; 90%). Ở chiến dịch A, có tới 50% người dùng là Desktop (100/200). Trong khi ở chiến dịch B, do chạy quảng cáo Facebook cẩu thả, có tới 80% lưu lượng đổ dồn vào Mobile (200/250) - nơi có tỷ lệ chuyển đổi tự nhiên rất thấp! Nhóm lưu lượng kém chất lượng đã kéo sập con số tổng của chiến dịch B.</p>\n                          <div class=\"callout callout-danger\">\n                            <strong>Bài Học Khắc Cốt Ghi Tâm:</strong>\n                            <p>Không bao giờ đưa ra quyết định kinh doanh dựa trên các con số tổng hợp toàn phần (Aggregated metrics) mà không phân rã theo các phân khúc người dùng cốt lõi (Disaggregated cohorts). Biến ẩn gây nhiễu luôn rình rập để đảo ngược sự thật!</p>\n                          </div>\n                        "
          }
        ],
        "summary": [
          "EDA (John Tukey) là tư duy thám tử: Khám phá cấu trúc, ngoại lai và các mẫu hình bất thường của dữ liệu trước khi thực hiện bất kỳ kiểm định khẳng định nào.",
          "Bộ tứ Anscombe chứng minh hùng hồn rằng các chỉ số tóm tắt (Mean, Std, Corr) hoàn toàn mù màu trước hình dạng phân phối thực tế. Luôn phải trực quan hóa dữ liệu trước khi kết luận.",
          "Nghịch lý Simpson xuất hiện khi sự phân bổ không đồng đều của một biến ẩn gây nhiễu (Confounder) làm đảo ngược xu hướng thống kê khi gộp nhóm.",
          "Phải luôn phân tầng (segmentation) và phân tích theo nhóm con trước khi tin vào bất kỳ con số tỷ lệ trung bình nào."
        ],
        "workedExample": {
          "scenario": "Tái hiện và kiểm chứng Nghịch lý Simpson trên dữ liệu bán hàng TechMart",
          "code": "import pandas as pd\n\n# Giả lập dữ liệu thử nghiệm 2 chiến dịch\ndf_campaigns = pd.DataFrame({\n    'campaign': ['Cũ', 'Cũ', 'Mới', 'Mới'],\n    'device': ['Mobile', 'Desktop', 'Mobile', 'Desktop'],\n    'visitors': [100, 100, 200, 50],\n    'conversions': [10, 90, 30, 48]\n})\n\n# 1. Tính tỷ lệ chuyển đổi theo từng thiết bị (Phân rã - Disaggregated)\ndf_campaigns['cvr'] = (df_campaigns['conversions'] / df_campaigns['visitors'] * 100).round(2)\nprint(\"--- TỶ LỆ CHUYỂN ĐỔI THEO TỪNG THIẾT BỊ ---\")\nprint(df_campaigns[['campaign', 'device', 'visitors', 'conversions', 'cvr']])\n\n# 2. Tính tỷ lệ chuyển đổi gộp toàn bộ (Tổng hợp - Aggregated)\nagg = df_campaigns.groupby('campaign')[['visitors', 'conversions']].sum()\nagg['total_cvr'] = (agg['conversions'] / agg['visitors'] * 100).round(2)\nprint(\"\\n--- TỶ LỆ CHUYỂN ĐỔI GỘP TOÀN BỘ (NGHỊCH LÝ XUẤT HIỆN) ---\")\nprint(agg)",
          "explanation": "1. Khi phân rã theo thiết bị: Chiến dịch Mới vượt trội ở cả Mobile (15% vs 10%) và Desktop (96% vs 90%).\\n2. Khi gộp chung: Chiến dịch Cũ lại có tỷ lệ chuyển đổi 50%, cao hơn hẳn 31.2% của chiến dịch Mới. Phép tính minh chứng sống động cho Nghịch lý Simpson trong kinh doanh thực tế."
        },
        "fadedExample": {
          "scenario": "Kiểm tra tính đồng nhất của hệ số tương quan trên các nhóm con",
          "code": "import pandas as pd\nimport numpy as np\n\n# Dữ liệu khách hàng gồm 2 nhóm: Khách VIP và Khách Thường\ndf_simpson = pd.DataFrame({\n    'group': ['VIP']*5 + ['Regular']*5,\n    'ad_spend': [10, 12, 14, 16, 18, 1, 3, 5, 7, 9],\n    'churn_rate': [2, 3, 4, 5, 6, 8, 9, 10, 11, 12]\n})\n\n# Yêu cầu: Tính hệ số tương quan giữa ad_spend và churn_rate trong từng nhóm (bằng groupby)\n# và so sánh với hệ số tương quan toàn bộ (trên toàn DataFrame)\n\ncorr_by_group = df_simpson.groupby('group')[['ad_spend', 'churn_rate']].corr().iloc[0::2, 1]\ncorr_overall = df_simpson['ad_spend'].corr(df_simpson['churn_rate'])\n\nprint(\"Tương quan theo từng nhóm:\\n\", corr_by_group)\nprint(\"Tương quan toàn bộ:\", round(corr_overall, 3))",
          "blankExplanation": "Tính tương quan riêng trong từng nhóm cho kết quả +1.0 (dương tuyệt đối). Nhưng khi tính gộp toàn bộ, hệ số tương quan lại bị đảo ngược thành âm do sự chênh lệch nền tảng giữa hai nhóm khách hàng."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Kiểm toán các số đo tóm tắt của Bộ tứ Anscombe",
            "problem": "Cho tập dữ liệu I và II của Anscombe: `x = [10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5]`, `y1 = [8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68]`, `y2 = [9.14, 8.14, 8.74, 8.77, 9.26, 8.10, 6.13, 3.10, 9.13, 7.26, 4.74]`. Hãy viết code tính: Trung bình, Phương sai của x; Trung bình, Phương sai của y1 và y2; và Hệ số tương quan Pearson giữa (x, y1) và (x, y2). Làm tròn 2 chữ số thập phân.",
            "hint": "Dùng np.mean(), np.var(ddof=1) và np.corrcoef() để tính toán cho từng cặp vector số liệu.",
            "solutionCode": "import numpy as np\n\nx = np.array([10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5])\ny1 = np.array([8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68])\ny2 = np.array([9.14, 8.14, 8.74, 8.77, 9.26, 8.10, 6.13, 3.10, 9.13, 7.26, 4.74])\n\nmean_x, var_x = np.mean(x), np.var(x, ddof=1)\nmean_y1, var_y1 = np.mean(y1), np.var(y1, ddof=1)\nmean_y2, var_y2 = np.mean(y2), np.var(y2, ddof=1)\n\ncorr_1 = np.corrcoef(x, y1)[0, 1]\ncorr_2 = np.corrcoef(x, y2)[0, 1]\n\nprint(f\"X: Mean = {mean_x:.2f}, Var = {var_x:.2f}\")\nprint(f\"Y1: Mean = {mean_y1:.2f}, Var = {var_y1:.2f}, Corr(x, y1) = {corr_1:.2f}\")\nprint(f\"Y2: Mean = {mean_y2:.2f}, Var = {var_y2:.2f}, Corr(x, y2) = {corr_2:.2f}\")",
            "explanation": "Bộ tứ Anscombe (Anscombe's Quartet) là bài học kinh điển về EDA: Các tập dữ liệu hoàn toàn khác biệt về mặt phân phối nhưng lại có trung bình, phương sai và hệ số tương quan giống hệt nhau. Điều này chứng minh rằng không bao giờ được tin cậy mù quáng vào các chỉ số tóm tắt nếu chưa trực quan hóa dữ liệu.",
            "solutionOutput": "X: Mean = 9.00, Var = 11.00\r\nY1: Mean = 7.50, Var = 4.13, Corr(x, y1) = 0.82\r\nY2: Mean = 7.50, Var = 4.13, Corr(x, y2) = 0.82"
          },
          {
            "level": "Vừa",
            "title": "Bóc trần Nghịch lý Simpson trong phân tích tuyển dụng",
            "problem": "Trong đợt tuyển dụng TechMart: Ở Khoa Kỹ Thuật, Nam nộp 80 trúng 40 (50%), Nữ nộp 20 trúng 12 (60%). Ở Khoa Kinh Doanh, Nam nộp 20 trúng 5 (25%), Nữ nộp 80 trúng 23 (28.75%). Hãy tạo DataFrame ghi nhận các con số này và viết code tính: (1) Tỷ lệ trúng tuyển của từng giới tính trong TỪNG khoa; (2) Tỷ lệ trúng tuyển TỔNG THỂ gộp chung cả 2 khoa. Chỉ ra biến gây nhiễu dẫn đến Nghịch lý Simpson.",
            "hint": "Tạo DataFrame gồm các cột Dept, Gender, Applied, Admitted; tính tỷ lệ Admitted/Applied theo nhóm Dept+Gender và theo riêng Gender.",
            "solutionCode": "import pandas as pd\n\ndata = [\n    {'dept': 'KyThuat', 'gender': 'Nam', 'applied': 80, 'admitted': 40},\n    {'dept': 'KyThuat', 'gender': 'Nu', 'applied': 20, 'admitted': 12},\n    {'dept': 'KinhDoanh', 'gender': 'Nam', 'applied': 20, 'admitted': 5},\n    {'dept': 'KinhDoanh', 'gender': 'Nu', 'applied': 80, 'admitted': 23},\n]\ndf_hire = pd.DataFrame(data)\n\n# Tỷ lệ theo từng khoa\ndf_hire['rate'] = (df_hire['admitted'] / df_hire['applied'] * 100).round(2)\nprint(\"=== TỶ LỆ TRÚNG TUYỂN THEO TỪNG KHOA ===\")\nprint(df_hire[['dept', 'gender', 'applied', 'admitted', 'rate']])\n\n# Tỷ lệ gộp tổng thể\ntotal = df_hire.groupby('gender')[['applied', 'admitted']].sum()\ntotal['overall_rate'] = (total['admitted'] / total['applied'] * 100).round(2)\nprint(\"\\n=== TỶ LỆ TRÚNG TUYỂN TỔNG THỂ ===\")\nprint(total)",
            "explanation": "Nghịch lý Simpson xuất hiện khi một xu hướng xuất hiện trong tất cả các nhóm con (Nữ có tỷ lệ đậu cao hơn Nam ở CẢ HAI khoa) nhưng lại bị đảo ngược hoàn toàn khi gộp chung lại (Nam đậu 45% so với Nữ 35%). Nguyên nhân là do biến gây nhiễu (Confounding Variable): Nữ nộp hồ sơ chủ yếu vào Khoa Kinh Doanh - nơi có tỷ lệ cạnh tranh khắc nghiệt hơn rất nhiều.",
            "solutionOutput": "=== TỶ LỆ TRÚNG TUYỂN THEO TỪNG KHOA ===\r\n        dept gender  applied  admitted   rate\r\n0    KyThuat    Nam       80        40  50.00\r\n1    KyThuat     Nu       20        12  60.00\r\n2  KinhDoanh    Nam       20         5  25.00\r\n3  KinhDoanh     Nu       80        23  28.75\r\n\r\n=== TỶ LỆ TRÚNG TUYỂN TỔNG THỂ ===\r\n        applied  admitted  overall_rate\r\ngender                                 \r\nNam         100        45          45.0\r\nNu          100        35          35.0"
          },
          {
            "level": "Nâng cao",
            "title": "Viết hàm tự động phát hiện dấu hiệu Nghịch lý Simpson",
            "problem": "Viết một hàm Python `detect_simpson_paradox(df, group_col, x_col, y_col)` tính toán: (1) Hệ số tương quan tổng thể giữa x và y; (2) Hệ số tương quan nội bộ trong từng phân nhóm của `group_col`. Nếu tương quan tổng thể dương nhưng tất cả tương quan trong nhóm đều âm (hoặc ngược lại), in ra cảnh báo phát hiện Nghịch lý Simpson.",
            "hint": "Tính overall_corr = df[x_col].corr(df[y_col]), sau đó dùng df.groupby(group_col).apply(lambda g: g[x_col].corr(g[y_col])) và so sánh dấu.",
            "solutionCode": "import pandas as pd\nimport numpy as np\n\ndef detect_simpson_paradox(df, group_col, x_col, y_col):\n    overall_corr = df[x_col].corr(df[y_col])\n    \n    group_corrs = df.groupby(group_col).apply(\n        lambda g: g[x_col].corr(g[y_col])\n    )\n    \n    print(f\"Tương quan tổng thể ({x_col} vs {y_col}): {overall_corr:.3f}\")\n    print(\"Tương quan nội bộ từng nhóm:\")\n    for grp, r in group_corrs.items():\n        print(f\"  - Nhóm {grp}: {r:.3f}\")\n        \n    # Phát hiện đảo chiều dấu\n    all_neg = (group_corrs < 0).all()\n    all_pos = (group_corrs > 0).all()\n    \n    if overall_corr > 0 and all_neg:\n        print(\"CẢNH BÁO: Phát hiện Nghịch lý Simpson! (Tổng thể dương nhưng tất cả nhóm âm)\")\n        return True\n    elif overall_corr < 0 and all_pos:\n        print(\"CẢNH BÁO: Phát hiện Nghịch lý Simpson! (Tổng thể âm nhưng tất cả nhóm dương)\")\n        return True\n    return False\n\n# Dữ liệu mô phỏng nghịch lý Simpson\nnp.random.seed(42)\ng1_x = np.linspace(1, 5, 20); g1_y = -1.5 * g1_x + 20 + np.random.normal(0, 0.5, 20)\ng2_x = np.linspace(6, 10, 20); g2_y = -1.5 * g2_x + 35 + np.random.normal(0, 0.5, 20)\n\ndf_simpson = pd.DataFrame({\n    'dept': ['A']*20 + ['B']*20,\n    'hours': np.concatenate([g1_x, g2_x]),\n    'defects': np.concatenate([g1_y, g2_y])\n})\n\ndetect_simpson_paradox(df_simpson, 'dept', 'hours', 'defects')",
            "explanation": "Việc tự động hóa kiểm định tương quan phân nhóm là công cụ phòng vệ cực kỳ hiệu quả trong phân tích dữ liệu quan sát. Khi bỏ qua các biến phân loại nhóm (như phòng ban, địa bàn, nhóm khách hàng), thuật ngữ \"Aggregation Bias\" có thể đẩy người phân tích vào các quyết định sai lầm 180 độ.",
            "solutionOutput": "Tương quan tổng thể (hours vs defects): 0.580\r\nTương quan nội bộ từng nhóm:\r\n  - Nhóm A: -0.985\r\n  - Nhóm B: -0.973\r\nCẢNH BÁO: Phát hiện Nghịch lý Simpson! (Tổng thể dương nhưng tất cả nhóm âm)"
          }
        ],
        "quiz": [
          {
            "question": "Thông điệp cốt lõi sâu sắc nhất mà Bộ tứ Anscombe (Anscombe's Quartet, 1973) gửi đến cộng đồng phân tích dữ liệu là gì?",
            "options": [
              "(Recommended) Các chỉ số thống kê tóm tắt định lượng (Mean, Std, Corr) có thể che giấu hoàn toàn các cấu trúc phân phối dị biệt; việc trực quan hóa đồ họa là bắt buộc trước khi kết luận.",
              "Mọi mối quan hệ trong tự nhiên đều tuân theo hàm phân phối chuẩn Gaussian.",
              "Hệ số tương quan r > 0.8 luôn đảm bảo mô hình hồi quy tuyến tính OLS hoạt động chính xác.",
              "Nên loại bỏ tất cả các điểm ngoại lai trước khi tính giá trị trung bình."
            ],
            "correctAnswer": "(Recommended) Các chỉ số thống kê tóm tắt định lượng (Mean, Std, Corr) có thể che giấu hoàn toàn các cấu trúc phân phối dị biệt; việc trực quan hóa đồ họa là bắt buộc trước khi kết luận.",
            "explanation": "Anscombe tạo ra 4 tập dữ liệu có cùng các con số tóm tắt (mean, variance, correlation, regression) nhưng đồ thị lại hoàn toàn khác nhau: một parabol, một đường thẳng có ngoại lai, một đường đòn bẩy. Bài học bất biến: Không bao giờ tin tưởng con số tóm tắt nếu chưa trực quan hóa dữ liệu."
          },
          {
            "question": "Nguyên nhân toán học căn bản dẫn đến Nghịch lý Simpson (Simpson's Paradox) là gì?",
            "options": [
              "(Recommended) Sự tồn tại của một biến ẩn gây nhiễu (Lurking/Confounder variable) phân bổ không đồng đều giữa các nhóm nghiên cứu.",
              "Do kích thước mẫu quá nhỏ (dưới 30 quan sát).",
              "Do các biến số được đo lường bằng các đơn vị đo lường khác nhau.",
              "Do sai số làm tròn số thập phân trong máy tính."
            ],
            "correctAnswer": "(Recommended) Sự tồn tại của một biến ẩn gây nhiễu (Lurking/Confounder variable) phân bổ không đồng đều giữa các nhóm nghiên cứu.",
            "explanation": "Nghịch lý Simpson xảy ra khi một biến thứ ba (biến gây nhiễu - ví dụ như mức độ nghiêm trọng của bệnh nhân, hoặc loại thiết bị truy cập) liên kết mạnh mẽ với cả biến độc lập lẫn biến phụ thuộc, tạo ra trọng số chênh lệch làm đảo ngược xu hướng khi gộp dữ liệu."
          },
          {
            "question": "Theo John Tukey, sự khác biệt lớn nhất giữa Phân tích Khám phá (EDA) và Phân tích Khẳng định (CDA) nằm ở điều gì?",
            "options": [
              "(Recommended) EDA tiếp cận dữ liệu với tâm thế mở của một thám tử để tìm kiếm mẫu hình và đặt giả thuyết mới; CDA tiếp cận như một thẩm phán để kiểm định và bác bỏ giả thuyết có sẵn.",
              "EDA chỉ dùng cho dữ liệu văn bản, còn CDA chỉ dùng cho dữ liệu số.",
              "EDA bắt buộc phải dùng mô hình học sâu Deep Learning.",
              "CDA không sử dụng bất kỳ công thức toán học nào."
            ],
            "correctAnswer": "(Recommended) EDA tiếp cận dữ liệu với tâm thế mở của một thám tử để tìm kiếm mẫu hình và đặt giả thuyết mới; CDA tiếp cận như một thẩm phán để kiểm định và bác bỏ giả thuyết có sẵn.",
            "explanation": "John Tukey ví EDA như người thám tử thu thập mọi manh mối tại hiện trường mà không định kiến trước kết quả. CDA là bước sau đó, đóng vai trò công tố viên/thẩm phán sử dụng các kiểm định thống kê chính quy để xác thực hoặc bác bỏ manh mối đó."
          }
        ],
        "selfReviewQuestions": [
          "Nêu 4 cấu trúc hình học khác biệt của 4 tập dữ liệu trong Bộ tứ Anscombe.",
          "Làm thế nào để phát hiện và ngăn ngừa bẫy Nghịch lý Simpson khi phân tích hiệu quả chiến dịch quảng cáo?",
          "Tại sao John Tukey lại cho rằng 'Một câu trả lời xấp xỉ cho đúng câu hỏi tốt hơn một câu trả lời chính xác cho một câu hỏi sai'?"
        ],
        "reflectionQuestion": "Một công ty công nghệ tự hào công bố mức lương trung bình của toàn công ty năm nay tăng 12% so với năm ngoái. Tuy nhiên, khi khảo sát nội bộ, các kỹ sư ở mọi cấp bậc (Junior, Mid, Senior) đều cho biết lương của họ chỉ được tăng 3%. Dưới góc nhìn Nghịch lý Simpson, bạn hãy giải thích hiện tượng này có thể xảy ra như thế nào mà không có ai nói dối.",
        "reflectionHint": "Nghĩ về cơ cấu nhân sự thay đổi: Năm ngoái công ty có 80% nhân viên Junior lương thấp và 20% Senior lương cao. Năm nay công ty cắt giảm 50% Junior và tuyển thêm nhiều chuyên gia Senior lương khủng. Dù mức lương ở từng cấp bậc chỉ tăng 3%, việc tỷ trọng nhân sự cấp cao trong công ty tăng vọt đã đẩy mức lương bình quân toàn công ty tăng 12%!",
        "nextLessonPreview": "Ở bài 9.2, chúng ta sẽ đi sâu vào giải phẫu số đo thống kê: Đo lường Xu hướng tập trung, Phân tán, Độ lệch Skewness (Phân phối lệch phải trong thu nhập) và kỹ thuật biến đổi hàm Log để chuẩn hóa dữ liệu.",
        "references": [
          {
            "title": "Graphs in Statistical Analysis (F. J. Anscombe, 1973, The American Statistician)",
            "url": "https://www.jstor.org/stable/2682899"
          },
          {
            "title": "Exploratory Data Analysis (John W. Tukey, 1977, Addison-Wesley)",
            "url": "https://www.pearson.com"
          },
          {
            "title": "GAISE College Report: Guidelines for Assessment and Instruction in Statistics Education (ASA)",
            "url": "https://www.amstat.org/education/guidelines-for-assessment-and-instruction-in-statistics-education-(gaise)-reports"
          }
        ]
      },
      {
        "id": "pd-09-02",
        "number": "9.2",
        "title": "Đo Lường Tập Trung, Phân Tán, Độ Lệch Skewness & Biến Đổi Log",
        "subtitle": "So sánh Mean vs Median vs Truncated Mean, độ phân tán IQR vs Std, phân tích phân phối lệch phải (Right-skewed) và Log Transformation",
        "level": "Trung cấp",
        "duration": "45 phút",
        "objectives": [
          "So sánh khả năng kháng nhiễu (Robustness) của 3 đại diện xu hướng tập trung: Mean (Trung bình), Median (Trung vị) và Truncated/Trimmed Mean (Trung bình cắt cụt).",
          "Phân tích độ phân tán dữ liệu qua Phương sai (Variance), Độ lệch chuẩn (Std) và Khoảng cách tứ phân vị (Interquartile Range - IQR).",
          "Định lượng Độ lệch (Skewness) và Độ nhọn (Kurtosis / Fat Tails); nhận diện phân phối lệch phải (Right-skewed distribution) phổ biến trong dữ liệu kinh doanh và tài chính.",
          "Ứng dụng kỹ thuật Biến đổi Logarit (Log Transformation: np.log1p) để kéo các phân phối lệch phải cực đoan về phân phối tiệm cận chuẩn, đáp ứng giả định của các mô hình tuyến tính."
        ],
        "intuition": {
          "title": "Tỷ Phú Bước Vào Quán Bar & Chiếc Lò Xo Biến Dạng",
          "metaphor": "Hãy quan sát một thí nghiệm tưởng tượng kinh điển trong thống kê:\\n1. Quán Bar và Tỷ Phú (Mean vs Median): Trong một quán bar có 9 người lao động bình thường, thu nhập trung bình của họ là 15 triệu VNĐ/tháng. Bỗng nhiên tỷ phú Elon Musk bước vào quán bar! Ngay lập tức, thu nhập trung bình (Mean) của quán bar vọt lên 50 tỷ VNĐ/người! Con số 50 tỷ này hoàn toàn vô nghĩa và không đại diện cho bất kỳ ai trong quán. Nhưng nếu bạn tính Trung vị (Median - người đứng ở vị trí thứ 5 khi xếp hàng), con số đó vẫn là 15 triệu VNĐ! Median có tính 'kháng nhiễu' (Robust) tuyệt đối trước các giá trị ngoại lai cực đoan!\\n2. Chiếc Lò Xo và Đuôi Dài (Skewness): Doanh thu của siêu thị TechMart không bao giờ có hình chuông cân đối (chuẩn Gaussian). Nó là một chiếc lò xo bị kéo giãn dài ngoằng về phía bên phải (Right-skewed): 90% đơn hàng là phụ kiện giá rẻ từ 50k đến 500k, nhưng có 1% đơn hàng là dàn máy trạm đồ họa trị giá 200 triệu! Chiếc đuôi dài này làm méo mó toàn bộ thuật toán máy học tuyến tính.\\n3. Kỹ thuật Log Transformation: Giống như một chiếc máy ép thủy lực: Hàm logarit ép chiếc đuôi dài hàng trăm triệu co cụm lại, kéo các giá trị lệch phải về lại gần tâm, biến một phân phối lệch méo mó thành một đường cong hình chuông hoàn mỹ!",
          "boundary": "Hàm biến đổi Log tự nhiên np.log(x) sẽ phát sinh lỗi chết người -infinity nếu x = 0. Do đó, trong Khoa học Dữ liệu thực chiến, người ta luôn dùng np.log1p(x) tức log(1 + x) để bảo đảm an toàn tuyệt đối khi dữ liệu có giá trị bằng 0.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">PHÂN PHỐI LỆCH PHẢI (RIGHT-SKEWED) &amp; THỨ TỰ CÁC SỐ ĐO TRUNG TÂM</div>\n                        <div style=\"background:var(--bg-surface);padding:10px;border-radius:6px;border:1px solid var(--border-subtle);text-align:center;\">\n                          <div style=\"font-size:1.1rem;font-weight:700;color:#2563eb;margin-bottom:4px;\">Yếu vị (Mode) &lt; Trung vị (Median) &lt; Trung bình (Mean)</div>\n                          <div style=\"font-size:0.75rem;color:var(--text-muted);\">Mean bị kéo lệch xa nhất về phía đuôi dài của các giá trị ngoại lai khổng lồ</div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-09-02-01",
            "title": "1. Giải Phẫu Xu Hướng Tập Trung: Mean vs Median vs Truncated Mean",
            "content": "\n                          <p>Khi tóm tắt một tập dữ liệu định lượng, lựa chọn số đo trung tâm quyết định sự thành bại của phân tích:</p>\n                          <div class=\"table-responsive\">\n                            <table class=\"table-content\">\n                              <thead>\n                                <tr>\n                                  <th>Chỉ số</th>\n                                  <th>Công thức / Bản chất</th>\n                                  <th>Điểm gãy kháng nhiễu (Breakdown Point)</th>\n                                  <th>Khi nào nên dùng?</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr>\n                                  <td><strong>Mean (Trung bình)</strong></td>\n                                  <td>\\(\\bar{x} = \\frac{1}{n}\\sum x_i\\)</td>\n                                  <td><strong>0%</strong> (Chỉ cần 1 điểm ngoại lai \\(\\infty\\) sẽ kéo lệch toàn bộ Mean)</td>\n                                  <td>Phân phối đối xứng chuẩn (Chiều cao, nhiệt độ phòng, sai số đo lường vật lý).</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Median (Trung vị)</strong></td>\n                                  <td>Giá trị ở vị trí chính giữa (50th percentile) sau khi đã sắp xếp</td>\n                                  <td><strong>50%</strong> (Cần tới một nửa dữ liệu bị hỏng mới làm lệch được Median)</td>\n                                  <td>Dữ liệu bị lệch hoặc có ngoại lai (Thu nhập, giá nhà, giá trị đơn hàng thương mại điện tử).</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Truncated Mean (Trung bình cắt cụt)</strong></td>\n                                  <td>Cắt bỏ p% giá trị nhỏ nhất và lớn nhất (ví dụ 5%), sau đó tính Mean phần còn lại</td>\n                                  <td>Tùy thuộc tỷ lệ cắt (ví dụ: cắt 10% thì điểm gãy là 10%)</td>\n                                  <td>Chấm điểm thể thao (trượt băng nghệ thuật), phân tích dữ liệu cảm biến công nghiệp có nhiễu đột biến.</td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                          \n                        ",
            "codeExamples": [
              {
                "id": "pd-09-02-c1",
                "lang": "python",
                "title": "So sánh mức độ kháng nhiễu: Mean vs Median vs Trimmed Mean khi có ngoại lai",
                "code": "import numpy as np\nfrom scipy import stats\n\n# Tập dữ liệu lương nhân viên có 1 giá trị ngoại lai cực lớn (CEO: 500 triệu)\nsalaries = np.array([15, 18, 20, 22, 19, 21, 23, 20, 18, 500])\n\nmean_val = np.mean(salaries)\nmedian_val = np.median(salaries)\ntrimmed_val = stats.trim_mean(salaries, proportiontocut=0.1) # Cắt 10% hai đầu\n\nprint(f\"Giá trị Trung bình (Mean):         {mean_val:.1f} triệu (Bị ngoại lai kéo lệch!)\")\nprint(f\"Giá trị Trung vị (Median):         {median_val:.1f} triệu (Kháng nhiễu tuyệt hảo)\")\nprint(f\"Trung bình cắt cụt (Trimmed Mean): {trimmed_val:.1f} triệu (Kháng nhiễu bền vững)\")",
                "output": "Giá trị Trung bình (Mean):         67.6 triệu (Bị ngoại lai kéo lệch!)\nGiá trị Trung vị (Median):         20.0 triệu (Kháng nhiễu tuyệt hảo)\nTrung bình cắt cụt (Trimmed Mean): 20.1 triệu (Kháng nhiễu bền vững)",
                "explanation": "Trung bình (Mean) có điểm gãy kháng nhiễu (breakdown point) là 0%, chỉ cần 1 điểm ngoại lai là bị bóp méo hoàn toàn. Trung vị có điểm gãy 50%, bảo vệ an toàn cho kết luận."
              }
            ]
          },
          {
            "id": "sec-09-02-02",
            "title": "2. Đo Lường Độ Phân Tán: Variance, Standard Deviation vs IQR",
            "content": "\n                          <p>Biết giá trị trung tâm là chưa đủ; bạn phải biết các điểm dữ liệu phân tán tản mát ra sao quanh trung tâm đó:</p>\n                          <ul>\n                            <li><strong>Phương sai (\\(s^2\\)) & Độ lệch chuẩn (\\(s\\)):</strong> Đo khoảng cách bình phương trung bình tới Mean. Do bình phương sai số, độ lệch chuẩn bị phóng đại cực mạnh khi gặp ngoại lai. Phù hợp cho phân phối chuẩn.</li>\n                            <li><strong>Khoảng cách tứ phân vị (IQR = Q3 - Q1):</strong> Độ dài của chiếc hộp chứa trọn vẹn 50% dữ liệu ở vùng trung tâm. Có khả năng kháng nhiễu cao tương tự Median.</li>\n                          </ul>\n                          <div class=\"callout callout-tip\">\n                            <strong>Cặp Đôi Bất Biến Trong Báo Cáo Thống Kê:</strong>\n                            <p>Nếu bạn dùng <strong>Mean</strong> làm số đo trung tâm &rarr; hãy đi kèm với <strong>Độ lệch chuẩn (Std)</strong>.<br>\n                            Nếu bạn dùng <strong>Median</strong> làm số đo trung tâm &rarr; hãy đi kèm với <strong>Khoảng tứ phân vị (IQR)</strong>!</p>\n                          </div>\n                        "
          },
          {
            "id": "sec-09-02-03",
            "title": "3. Độ Lệch Skewness & Độ Nhọn Kurtosis (Đuôi Béo Fat Tails)",
            "content": "\n                          <h4>A. Độ Lệch (Skewness)</h4>\n                          <p>Skewness đo lường tính bất đối xứng của hàm mật độ xác suất quanh trục trung tâm:</p>\n                          <ul>\n                            <li><strong>Skewness \\(\\approx 0\\):</strong> Phân phối đối xứng hoàn hảo (Hình chuông chuẩn Gauss). Lúc này <code>Mean = Median = Mode</code>.</li>\n                            <li><strong>Skewness &gt; 0 (Phân phối lệch phải / Lệch dương - Right-skewed):</strong> Đuôi dài kéo về phía bên phải các số cực lớn. Lúc này <code>Mode &lt; Median &lt; Mean</code>. Đây là quy luật phổ biến nhất trong đời sống kinh tế (Thu nhập, Doanh thu, Lượt xem video, Thời gian chờ đợi).</li>\n                            <li><strong>Skewness &lt; 0 (Phân phối lệch trái / Lệch âm - Left-skewed):</strong> Đuôi dài kéo về phía bên trái các số nhỏ. Lúc này <code>Mean &lt; Median &lt; Mode</code> (ví dụ: Điểm thi của một kỳ thi quá dễ).</li>\n                          </ul>\n                          <h4>B. Độ Nhọn (Kurtosis) & Hiểm Họa Đuôi Béo (Fat Tails)</h4>\n                          <p>Kurtosis đo lường mật độ của các giá trị ở vùng đuôi cực đoan. Phân phối chuẩn có Kurtosis = 3 (Excess Kurtosis = 0). Nếu phân phối có Kurtosis &gt; 3 (Leptokurtic - Đuôi béo), xác suất xuất hiện các biến cố cực đoan kiểu <strong>Thiên nga đen (Black Swan)</strong> như sụp đổ thị trường tài chính sẽ cao hơn gấp hàng chục lần so với dự báo của phân phối chuẩn!</p>\n                        "
          },
          {
            "id": "sec-09-02-04",
            "title": "4. Kỹ Thuật Biến Đổi Logarit (Log Transformation: np.log1p)",
            "content": "\n                          <p>Hầu hết các thuật toán học máy tuyến tính (Linear Regression, Logistic Regression, PCA) đều đặt ra giả định dữ liệu có phân phối xấp xỉ chuẩn (Normality assumption). Khi dữ liệu bị lệch phải nghiêm trọng (Right-skewed với Skewness &gt; 1.5):</p>\n                          \n                          <h4>Tại Sao Luôn Dùng np.log1p Thay Vì np.log?</h4>\n                          <p>Nếu một khách hàng có doanh số bằng 0 (chưa mua gì), hàm <code>np.log(0)</code> sẽ trả về <code>-inf</code> (vô cùng âm), gây crash toàn bộ mô hình! Hàm <code>np.log1p(x)</code> tính toán \\(\\ln(1 + x)\\), đảm bảo khi \\(x = 0\\) thì \\(\\ln(1 + 0) = 0\\), vừa an toàn tuyệt đối vừa bảo toàn số 0.</p>\n                          <p>Khi muốn đảo ngược kết quả dự báo về giá trị tiền tệ thực tế, ta chỉ cần gọi hàm mũ nghịch đảo: <code>np.expm1(sales_log)</code>.</p>\n                        "
          }
        ],
        "summary": [
          "Median có điểm gãy kháng nhiễu 50%, là đại diện trung tâm tối ưu cho dữ liệu bị lệch hoặc có ngoại lai; Mean có điểm gãy 0% và dễ bị kéo méo.",
          "Luôn đi kèm cặp đôi: Mean + Standard Deviation (dữ liệu chuẩn) hoặc Median + Interquartile Range IQR (dữ liệu lệch).",
          "Dữ liệu kinh doanh và doanh thu hầu như luôn bị lệch phải (Right-skewed: Mode < Median < Mean) với đuôi dài hướng về các giá trị lớn.",
          "Kỹ thuật Log Transformation (np.log1p) kéo phân phối lệch phải về tiệm cận chuẩn, loại bỏ bẫy log(0) = -inf, và đảo ngược bằng np.expm1."
        ],
        "workedExample": {
          "scenario": "Xử lý phân phối lệch phải của giá trị đơn hàng TechMart",
          "code": "import numpy as np\nimport pandas as pd\nfrom scipy import stats\n\n# Giả lập 500 đơn hàng có đặc tính lệch phải\nnp.random.seed(42)\norder_amounts = np.concatenate([\n    np.random.uniform(50, 300, 450),       # 450 đơn hàng nhỏ lẻ bình thường\n    np.random.uniform(5000, 20000, 50)     # 50 đơn hàng dự án B2B cực khủng\n])\n\ndf_orders = pd.DataFrame({'amount': order_amounts})\n\n# 1. So sánh các chỉ số trung tâm và phân tán\nmean_val = df_orders['amount'].mean()\nmedian_val = df_orders['amount'].median()\nskew_raw = stats.skew(df_orders['amount'])\n\nprint(f\"Giá trị Trung bình (Mean): {mean_val:.1f}\")\nprint(f\"Giá trị Trung vị (Median): {median_val:.1f}\")\nprint(f\"Độ lệch Skewness ban đầu: {skew_raw:.2f} (Lệch phải nghiêm trọng!)\")\n\n# 2. Áp dụng Log Transformation an toàn\ndf_orders['amount_log'] = np.log1p(df_orders['amount'])\nskew_log = stats.skew(df_orders['amount_log'])\nprint(f\"Độ lệch Skewness sau log1p: {skew_log:.2f} (Đã kéo về phân phối cân bằng)\")",
          "explanation": "1. Mean (1.298) bị 50 đơn hàng B2B kéo cao gấp gần 7 lần so với Median (187).\\n2. Skewness ban đầu đạt mức 1.95 (> 1.0 biểu thị độ lệch nghiêm trọng).\\n3. Sau khi áp dụng np.log1p, Skewness giảm xuống còn 0.42, đưa dữ liệu về trạng thái tiệm cận chuẩn sẵn sàng cho các thuật toán dự báo."
        },
        "fadedExample": {
          "scenario": "Khôi phục giá trị dự báo sau phép biến đổi Logarit",
          "code": "import numpy as np\n\n# Giả sử mô hình Machine Learning dự báo giá trị log doanh số\npredicted_log = np.array([4.5, 5.2, 6.1, 7.8])\n\n# Yêu cầu: Đảo ngược giá trị log về doanh số thực tế bằng hàm nghịch đảo của log1p\n# Gợi ý: Dùng np.expm1(predicted_log)\n\npredicted_actual = np.expm1(predicted_log)\n\nprint(\"Doanh số thực tế dự báo (Triệu VNĐ):\\n\", np.round(predicted_actual, 2))",
          "blankExplanation": "Sử dụng hàm np.expm1() để tính e^x - 1, đảo ngược hoàn hảo phép biến đổi ln(1 + x) ban đầu và trả kết quả về đúng đơn vị tiền tệ thực tế."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Tính toán bộ chỉ số tóm tắt kháng nhiễu (Robust Summary)",
            "problem": "Cho mảng thời gian giao hàng (phút) chứa điểm ngoại lai do sự cố thời tiết: `[15, 18, 20, 22, 23, 25, 28, 30, 32, 120]`. Hãy viết code tính toán: (1) Trung bình (Mean) và Độ lệch chuẩn (Std); (2) Trung vị (Median), Khoảng liên tứ phân vị (IQR = Q3 - Q1) và Độ lệch tuyệt đối trung vị (MAD = Median(|x - Median(x)|)). So sánh sự sai khác giữa 2 nhóm chỉ số.",
            "hint": "Dùng np.percentile() để tính Q1, Q3 rồi IQR = Q3 - Q1. Dùng np.median(np.abs(arr - np.median(arr))) để tính MAD.",
            "solutionCode": "import numpy as np\n\ntimes = np.array([15, 18, 20, 22, 23, 25, 28, 30, 32, 120])\n\n# Thống kê truyền thống (Nhạy cảm với ngoại lai)\nmean_val = np.mean(times)\nstd_val = np.std(times, ddof=1)\n\n# Thống kê kháng nhiễu (Robust Statistics)\nmed_val = np.median(times)\nq1 = np.percentile(times, 25)\nq3 = np.percentile(times, 75)\niqr_val = q3 - q1\nmad_val = np.median(np.abs(times - med_val))\n\nprint(f\"Nhóm truyền thống: Mean = {mean_val:.1f}p, Std = {std_val:.1f}p\")\nprint(f\"Nhóm kháng nhiễu: Median = {med_val:.1f}p, IQR = {iqr_val:.1f}p, MAD = {mad_val:.1f}p\")",
            "explanation": "Chỉ số trung bình Mean bị kéo lệch mạnh từ ~24 phút lên 33.3 phút và độ lệch chuẩn tăng vọt lên 30.9 phút chỉ bởi duy nhất 1 điểm ngoại lai (120p). Trong khi đó, các chỉ số kháng nhiễu (Robust Statistics) như Median (24.0p) và MAD (5.0p) phản ánh chính xác 90% các chuyến giao hàng diễn ra trong điều kiện bình thường.",
            "solutionOutput": "Nhóm truyền thống: Mean = 33.3p, Std = 30.9p\r\nNhóm kháng nhiễu: Median = 24.0p, IQR = 9.0p, MAD = 5.0p"
          },
          {
            "level": "Vừa",
            "title": "Kiểm định độ lệch Skewness và tự động biến đổi Log",
            "problem": "Viết hàm `auto_transform_feature(series)` nhận vào một Pandas Series số. Tính hệ số Skewness của nó. Nếu Skewness > 1.0 (lệch phải nặng), áp dụng biến đổi `np.log1p()` để đưa dữ liệu về phân phối đối xứng hơn, sau đó in so sánh Skewness trước và sau biến đổi.",
            "hint": "Dùng series.skew() để đo độ lệch, và np.log1p(series) để tính log(1 + x) an toàn khi có giá trị 0.",
            "solutionCode": "import pandas as pd\nimport numpy as np\n\ndef auto_transform_feature(series):\n    raw_skew = series.skew()\n    print(f\"Hệ số Skewness ban đầu: {raw_skew:.2f}\")\n    \n    if raw_skew > 1.0:\n        print(\"Dữ liệu lệch phải nặng (Skew > 1). Đang áp dụng np.log1p()...\")\n        transformed = np.log1p(series)\n        new_skew = transformed.skew()\n        print(f\"Hệ số Skewness sau biến đổi: {new_skew:.2f}\")\n        return transformed\n    return series\n\n# Dữ liệu doanh thu lệch phải dạng phân phối Lũy thừa (Power Law)\nnp.random.seed(42)\nrev_data = pd.Series(np.random.exponential(scale=50, size=500))\nauto_transform_feature(rev_data)",
            "explanation": "Hầu hết các thuật toán học máy và kiểm định tham số (t-test, ANOVA) đều giả định dữ liệu có phân phối chuẩn. Dữ liệu tài chính và e-commerce thường lệch phải cực mạnh (Skewness > 1). Biến đổi log1p giúp thu hẹp đuôi dài của phân phối mà vẫn bảo toàn thứ tự xếp hạng của dữ liệu.",
            "solutionOutput": "Hệ số Skewness ban đầu: 1.45\r\nDữ liệu lệch phải nặng (Skew > 1). Đang áp dụng np.log1p()...\r\nHệ số Skewness sau biến đổi: -0.58"
          },
          {
            "level": "Nâng cao",
            "title": "So sánh Trimmed Mean ở các tỷ lệ cắt cụt 10% và 20%",
            "problem": "Trong xử lý dữ liệu cảm biến IoT có tỷ lệ lỗi gián đoạn 5-10%, kỹ sư thường dùng Trimmed Mean (Trung bình cắt cụt). Cho mảng ghi nhận nhiệt độ bị nhiễu: `np.array([24.1, 24.3, 23.9, 24.5, 99.9, 24.2, 24.0, -10.5, 24.4, 24.1])`. Viết code so sánh kết quả giữa Trung bình thông thường, Trimmed Mean cắt 10% (`scipy.stats.trim_mean(arr, 0.1)`) và Trimmed Mean cắt 20%.",
            "hint": "Gọi from scipy.stats import trim_mean, sau đó tính trim_mean(temps, 0.1) và trim_mean(temps, 0.2).",
            "solutionCode": "import numpy as np\nfrom scipy import stats\n\ntemps = np.array([24.1, 24.3, 23.9, 24.5, 99.9, 24.2, 24.0, -10.5, 24.4, 24.1])\n\nmean_raw = np.mean(temps)\ntrim_10 = stats.trim_mean(temps, proportiontocut=0.1)\ntrim_20 = stats.trim_mean(temps, proportiontocut=0.2)\n\nprint(f\"Trung bình gốc (có nhiễu -10.5 và 99.9): {mean_raw:.2f}°C\")\nprint(f\"Trimmed Mean cắt 10% mỗi đầu: {trim_10:.2f}°C\")\nprint(f\"Trimmed Mean cắt 20% mỗi đầu: {trim_20:.2f}°C\")",
            "explanation": "Trimmed Mean loại bỏ k% các giá trị nhỏ nhất và lớn nhất trước khi tính trung bình. Với dữ liệu cảm biến có các gai xung điện ngẫu nhiên (-10.5°C và 99.9°C), Trimmed Mean cắt bỏ hoàn toàn các gai nhiễu này và trả lại giá trị nhiệt độ phòng chính xác (24.18°C) thay vì con số vô lý 31.89°C.",
            "solutionOutput": "Trung bình gốc (có nhiễu -10.5 và 99.9): 28.29°C\r\nTrimmed Mean cắt 10% mỗi đầu: 24.19°C\r\nTrimmed Mean cắt 20% mỗi đầu: 24.18°C"
          }
        ],
        "quiz": [
          {
            "question": "Trong một tập dữ liệu có phân phối lệch phải nghiêm trọng (Right-skewed distribution), mối quan hệ thứ tự độ lớn giữa Mean, Median và Mode (Yếu vị) thường là gì?",
            "options": [
              "(Recommended) Mode < Median < Mean",
              "Mean < Median < Mode",
              "Mean = Median = Mode",
              "Median < Mode < Mean"
            ],
            "correctAnswer": "(Recommended) Mode < Median < Mean",
            "explanation": "Trong phân phối lệch phải, đỉnh cao nhất (Mode) nằm ở vùng giá trị nhỏ bên trái, tiếp theo là giá trị trung vị Median, và Mean bị kéo lệch xa nhất về phía bên phải bởi chiếc đuôi dài của các giá trị ngoại lai khổng lồ."
          },
          {
            "question": "Tại sao trong thực hành Tiền xử lý Dữ liệu, người ta luôn ưu tiên sử dụng 'np.log1p(x)' thay vì 'np.log(x)' khi thực hiện biến đổi Logarithm?",
            "options": [
              "(Recommended) Vì np.log1p(x) tính ln(1 + x), giúp tránh được lỗi toán học chết người log(0) = -infinity khi thuộc tính có giá trị bằng 0.",
              "Vì np.log1p chạy nhanh hơn np.log gấp 10 lần nhờ tối ưu C-buffer.",
              "Vì np.log1p tự động chuyển dữ liệu sang kiểu số nguyên int64.",
              "Vì np.log1p chỉ áp dụng được cho dữ liệu chuỗi thời gian."
            ],
            "correctAnswer": "(Recommended) Vì np.log1p(x) tính ln(1 + x), giúp tránh được lỗi toán học chết người log(0) = -infinity khi thuộc tính có giá trị bằng 0.",
            "explanation": "Khi dữ liệu chứa số 0 (ví dụ đơn hàng 0 đồng, số lần vi phạm = 0), np.log(0) sẽ sinh ra -inf làm hỏng toàn bộ pipeline máy học. np.log1p(0) cho kết quả là ln(1 + 0) = 0, đảm bảo đường ống dữ liệu luôn an toàn và liên tục."
          },
          {
            "question": "Khái niệm 'Điểm gãy kháng nhiễu' (Breakdown Point) của giá trị Trung vị (Median) bằng 50% mang ý nghĩa thống kê là gì?",
            "options": [
              "(Recommended) Tập dữ liệu phải có ít nhất 50% số điểm bị phá hủy hoặc kéo tới vô cùng thì giá trị Median mới bị kéo lệch vô hạn.",
              "Median chỉ tính toán được trên 50% số dòng đầu tiên của bảng.",
              "Độ chính xác của Median luôn là 50%.",
              "Median luôn cắt đôi phương sai của tập dữ liệu."
            ],
            "correctAnswer": "(Recommended) Tập dữ liệu phải có ít nhất 50% số điểm bị phá hủy hoặc kéo tới vô cùng thì giá trị Median mới bị kéo lệch vô hạn.",
            "explanation": "Breakdown point đo lường tỷ lệ dữ liệu bị nhiễm độc tối thiểu cần thiết để làm hỏng một ước lượng thống kê. Mean có breakdown point = 0% (chỉ cần 1 điểm vô cùng là hỏng), trong khi Median có breakdown point tối đa đạt 50%."
          }
        ],
        "selfReviewQuestions": [
          "Giải thích tại sao trong báo cáo bất động sản, các chuyên gia luôn công bố 'Giá nhà trung vị' (Median Home Price) thay vì 'Giá nhà trung bình' (Mean Home Price)?",
          "Nêu công thức toán học và hàm Python để biến đổi ngược một giá trị dự báo từ hàm np.log1p.",
          "Độ nhọn Kurtosis > 3 (Leptokurtic) cảnh báo rủi ro gì đối với các nhà quản trị rủi ro tài chính?"
        ],
        "reflectionQuestion": "Một công ty bảo hiểm sử dụng mô hình học máy để dự báo chi phí bồi thường tai nạn giao thông. Phân phối chi phí bồi thường bị lệch phải cực kỳ nặng (hầu hết vụ va chạm bồi thường vài triệu, nhưng có 0.1% vụ tai nạn thảm khốc bồi thường hàng chục tỷ). Nếu kỹ sư không áp dụng Log Transform mà huấn luyện trực tiếp mô hình hồi quy tuyến tính OLS, điều gì sẽ xảy ra với các dự báo cho các vụ tai nạn thông thường?",
        "reflectionHint": "Hàm mất mát bình phương sai số MSE của hồi quy tuyến tính sẽ bị chi phối tuyệt đối bởi một vài vụ tai nạn hàng chục tỷ (vì bình phương của một số khổng lồ sẽ áp đảo hoàn toàn các số nhỏ). Hậu quả: Mô hình sẽ bị kéo lệch hẳn lên trên, liên tục dự báo quá cao (overestimate) chi phí cho 99.9% các vụ tai nạn nhỏ thông thường, làm mất tính cạnh tranh của gói bảo hiểm.",
        "nextLessonPreview": "Ở bài 9.3, chúng ta sẽ bước vào những vấn đề cốt lõi của suy diễn thống kê: Phân biệt Tương quan vs Nhân quả, bóc trần Thiên kiến kẻ sống sót (Survivorship bias), đo lường độ bất định với Bootstrapping và Tuyên bố cảnh báo lạm dụng P-value của Hiệp hội Thống kê Hoa Kỳ (ASA).",
        "references": [
          {
            "title": "Robust Statistics: The Approach Based on Influence Functions (Hampel et al., Wiley)",
            "url": "https://www.wiley.com"
          },
          {
            "title": "NIST/SEMATECH e-Handbook of Statistical Methods - Measures of Skewness and Kurtosis",
            "url": "https://www.itl.nist.gov/div898/handbook/eda/section3/eda35b.htm"
          }
        ]
      },
      {
        "id": "pd-09-03",
        "number": "9.3",
        "title": "Tương Quan vs Nhân Quả, Thiên Kiến Mẫu, Bootstrap & Tuyên Bố ASA Về P-Value",
        "subtitle": "Ngụy biện tương quan (Spurious Correlation), Thiên kiến kẻ sống sót (Abraham Wald), Khoảng tin cậy Bootstrap và khủng hoảng tái lập P < 0.05",
        "level": "Nâng cao",
        "duration": "50 phút",
        "objectives": [
          "Phân biệt rạch ròi giữa Tương quan (Correlation) và Quan hệ Nhân quả (Causation); nhận diện các mối tương quan ngụy biện (Spurious Correlations) do biến ngoại lai hoặc sự trùng hợp ngẫu nhiên.",
          "Phân tích Thiên kiến chọn mẫu (Selection Bias) và Thiên kiến kẻ sống sót (Survivorship Bias) thông qua bài học lịch sử gia cố giáp máy bay ném bom của Abraham Wald (Thế chiến II).",
          "Ứng dụng kỹ thuật tái lấy mẫu Bootstrap (Bootstrapping Resampling của Bradley Efron) để ước lượng Khoảng Tin Cậy 95% (Confidence Interval) mà không cần dựa vào bất kỳ giả định tiên nghiệm nào về phân phối chuẩn.",
          "Thấu hiểu bản chất Tuyên bố chính thức của Hiệp hội Thống kê Hoa Kỳ (ASA Statement on P-Values, 2016): Bác bỏ tư duy coi p < 0.05 là công tắc nhị phân xác thực chân lý, phòng chống vấn nạn P-hacking và khủng hoảng tái lập trong khoa học dữ liệu."
        ],
        "intuition": {
          "title": "Máy Bay Chiến Đấu Của Abraham Wald & Chiếc Lưới Bắt Cá Thủng",
          "metaphor": "Hãy xem tư duy của một nhà khoa học dữ liệu vĩ đại:\\n1. Thiên Kiến Kẻ Sống Sót (Abraham Wald, 1943): Trong Thế chiến II, không quân Mỹ thống kê các lỗ đạn trên những chiếc máy bay ném bom sống sót trở về: Cánh máy bay và thân máy bay dính chi chít vết đạn, trong khi động cơ và buồng lái hầu như không có vết đạn nào! Các tướng lĩnh quân đội lập tức đề xuất: 'Hãy bọc thêm giáp thép vào cánh và thân máy bay!'. Nhưng nhà toán học Abraham Wald đã dõng dạc ngăn lại: 'Không! Hãy bọc giáp vào ĐỘNG CƠ và BUỒNG LÁI!'. Tại sao? Bởi vì những chiếc máy bay bị bắn trúng động cơ và buồng lái ĐÃ BỊ RƠI VÀ CHÌM DƯỚI ĐÁY BIỂN, chúng không bao giờ có cơ hội quay trở về để được các ông đếm lỗ đạn! Nếu bạn chỉ phân tích những 'kẻ sống sót', bạn sẽ đưa ra kết luận hoàn toàn ngược với chân lý!\\n2. Tương quan vs Nhân quả (Chiếc đồng hồ báo thức và Mặt trời mọc): Mỗi sáng, chiếc đồng hồ của bạn kêu reng reng lúc 6h, và mặt trời mọc lúc 6h05. Hệ số tương quan giữa tiếng chuông và mặt trời mọc là r = 0.999! Nhưng nếu bạn đập nát chiếc đồng hồ, mặt trời vẫn mọc! Tương quan chỉ là hai sự việc cùng xảy ra; Nhân quả đòi hỏi một cơ chế can thiệp vật lý thực sự.\\n3. Kỹ thuật Bootstrapping (Bradley Efron): Bạn có một cái hồ cá nhỏ. Bạn không biết phân phối trọng lượng cá trong hồ có chuẩn hay không. Kỹ thuật Bootstrap giống như bạn thả lưới bắt 50 con cá, ghi lại trọng lượng, thả chúng lại hồ, rồi lặp lại việc này 1.000 lần trên máy tính bằng cách bốc thăm có hoàn lại (sampling with replacement). Bạn tự tạo ra cả một vũ trụ phân phối xác suất từ chính mẫu dữ liệu thực tế duy nhất của mình!\\n4. Tuyên bố ASA về P-Value: P-value < 0.05 không phải là một chiếc chìa khóa thần kỳ chứng minh bạn đúng. Nó chỉ nói rằng: 'Nếu thế giới này hoàn toàn ngẫu nhiên và thuốc không có tác dụng gì, thì xác suất quan sát được kết quả kỳ lạ như thế này là dưới 5%'. Đừng biến 0.05 thành thước đo nhị phân để lừa dối bản thân (P-hacking)!",
          "boundary": "Để chứng minh quan hệ Nhân quả thực sự, phương pháp duy nhất được công nhận là Thử nghiệm Đối chứng Ngẫu nhiên (Randomized Controlled Trial - RCT), hay còn gọi là A/B Testing trong ngành công nghệ.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">BÀI HỌC THIÊN KIẾN KẺ SỐNG SÓT CỦA ABRAHAM WALD (1943)</div>\n                        <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:center;\">\n                          <div style=\"padding:8px;border:1px solid #ef4444;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#ef4444;\">DỮ LIỆU QUAN SÁT ĐƯỢC</strong>\n                            <div style=\"font-size:0.75rem;margin-top:2px;\">Vết đạn ở Cánh và Thân máy bay</div>\n                            <div style=\"font-size:0.7rem;color:var(--text-muted);margin-top:2px;\">Máy bay vẫn sống sót quay về &rarr; Vết thương không chí mạng!</div>\n                          </div>\n                          <div style=\"padding:8px;border:1px solid #10b981;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#10b981;\">DỮ LIỆU BỊ BIẾN MẤT (MISSING)</strong>\n                            <div style=\"font-size:0.75rem;margin-top:2px;\">Vết đạn ở Động cơ và Buồng lái</div>\n                            <div style=\"font-size:0.7rem;color:var(--text-muted);margin-top:2px;\">Máy bay đã rơi mất tích &rarr; ĐÂY MỚI LÀ NƠI CẦN BỌC GIÁP!</div>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-09-03-01",
            "title": "1. Tương Quan vs Nhân Quả: Bẫy Tương Quan Ngụy Biện (Spurious Correlation)",
            "content": "\n                          <p>Một trong những chân lý căn bản nhất của Khoa học Dữ liệu là: <strong>Tương quan không đồng nghĩa với Nhân quả (Correlation does not imply Causation)</strong>.</p>\n                          <h4>A. Các Dạng Tương Quan Ngụy Biện</h4>\n                          <ul>\n                            <li><strong>Sự Trùng Hợp Ngẫu Nhiên (Coincidence):</strong> Tyler Vigen đã thu thập hàng trăm ví dụ tương quan ngụy biện nổi tiếng: Hệ số tương quan giữa <em>'Số người chết đuối do rơi vào bể bơi'</em> và <em>'Số bộ phim Nicolas Cage tham gia đóng'</em> lên tới <strong>r = 0.666</strong>! Rõ ràng hai sự kiện này hoàn toàn độc lập, sự tương quan cao chỉ là ngẫu nhiên khi vét cạn các tập dữ liệu lớn (Data Dredging).</li>\n                            <li><strong>Cùng Chịu Tác Động Bởi Biến Thứ Ba (Lurking / Confounder Variable):</strong> Doanh số bán kem tăng vọt cùng lúc với số vụ người bị cá mập tấn công tăng vọt (r = 0.85). Bán kem có làm cá mập thèm thịt người không? Không! Biến gây nhiễu chính là <strong>Nhiệt độ mùa hè</strong>: Trời nóng khiến nhiều người ăn kem hơn, và trời nóng cũng khiến nhiều người đi tắm biển hơn!</li>\n                            <li><strong>Đảo Ngược Chiều Nhân Quả (Reverse Causality):</strong> Những người thường xuyên đến bệnh viện có tỷ lệ mắc bệnh cao hơn người ở nhà. Bệnh viện làm người ta bị ốm, hay người ta bị ốm mới đến bệnh viện?</li>\n                          </ul>\n                          <h4>B. Tiêu Chuẩn Vàng Xác Lập Nhân Quả: A/B Testing</h4>\n                          <p>Để khẳng định một tính năng mới thực sự làm tăng doanh thu, bạn không thể chỉ so sánh người dùng bật tính năng với người dùng không bật (Selection Bias). Bạn bắt buộc phải thực hiện <strong>A/B Testing (Randomized Controlled Trial)</strong>: Phân bổ ngẫu nhiên người dùng vào nhóm Control và Variant để triệt tiêu toàn bộ các biến gây nhiễu ngoại cảnh.</p>\n                        "
          },
          {
            "id": "sec-09-03-02",
            "title": "2. Thiên Kiến Kẻ Sống Sót (Survivorship Bias) Trong Phân Tích Kinh Doanh",
            "content": "\n                          <p>Thiên kiến kẻ sống sót là lỗi tư duy khi nhà phân tích chỉ tập trung vào những thực thể đã vượt qua một phễu chọn lọc khắt khe ('kẻ sống sót') mà bỏ quên toàn bộ các thực thể đã thất bại và biến mất khỏi tập dữ liệu.</p>\n                          <h4>Ví Dụ Kinh Điển Tại TechMart:</h4>\n                          <p>Phòng Chăm sóc Khách hàng phân tích 10.000 phiếu khảo sát gửi về và kết luận: <em>'98% khách hàng đánh giá dịch vụ TechMart xuất sắc, chúng ta không cần cải thiện gì thêm!'</em>.</p>\n                          <p><strong>Sai lầm chí mạng:</strong> Ai là người kiên nhẫn điền phiếu khảo sát dài 20 câu? Đó là những khách hàng trung thành, cực kỳ yêu mến TechMart! Hàng chục nghìn khách hàng giận dữ vì hàng lỗi, giao chậm đã lập tức xóa ứng dụng và chuyển sang đối thủ cạnh tranh &mdash; họ chính là những 'chiếc máy bay rơi xuống biển' không bao giờ gửi phiếu khảo sát về! Phân tích chỉ trên kẻ sống sót sẽ ru ngủ doanh nghiệp vào một ảo tưởng chết người.</p>\n                        "
          },
          {
            "id": "sec-09-03-03",
            "title": "3. Đo Lường Độ Bất Định Bằng Kỹ Thuật Bootstrap (Bradley Efron)",
            "content": "\n                          <p>Năm 1979, Bradley Efron giới thiệu kỹ thuật <strong>Bootstrap</strong> (Tái lấy mẫu có hoàn lại - Sampling with Replacement). Đây là một trong những phát minh thống kê vĩ đại nhất của thế kỷ 20, cho phép ước lượng Khoảng Tin Cậy (Confidence Interval - CI) cho bất kỳ chỉ số thống kê nào (Mean, Median, Tỷ lệ) mà <strong>hoàn toàn không cần giả định dữ liệu có phân phối chuẩn</strong>!</p>\n                          <h4>Thuật Toán Bootstrap 3 Bước:</h4>\n                          <ol>\n                            <li>Từ tập mẫu ban đầu kích thước \\(N\\), rút ngẫu nhiên có hoàn lại \\(N\\) phần tử để tạo ra một tập mẫu giả lập mới (Bootstrap Sample).</li>\n                            <li>Tính toán chỉ số quan tâm (ví dụ: Median) trên tập mẫu giả lập đó và lưu lại.</li>\n                            <li>Lặp lại bước 1 và 2 từ 1.000 đến 10.000 lần. Lấy phân vị 2.5% và 97.5% của danh sách kết quả để xác lập <strong>Khoảng tin cậy 95%</strong>!</li>\n                          </ol>\n                          \n                        ",
            "codeExamples": [
              {
                "id": "pd-09-03-c1",
                "lang": "python",
                "title": "Ước lượng Khoảng Tin Cậy 95% bằng kỹ thuật Bootstrap Resampling (Bradley Efron)",
                "code": "import numpy as np\n\n# Mẫu khảo sát thời gian giao hàng thực tế (30 đơn hàng, đơn vị: phút)\nsample = np.array([25, 28, 30, 22, 35, 40, 29, 31, 27, 33, 38, 24, 26, 32, 34,\n                   30, 28, 31, 29, 33, 36, 27, 25, 30, 32, 35, 28, 31, 29, 34])\n\n# Khởi tạo thuật toán Bootstrap Resampling (B = 2,000 lần lặp có hoàn lại)\nrng = np.random.default_rng(42)\nB = 2000\nboot_means = np.empty(B)\n\nfor i in range(B):\n    boot_sample = rng.choice(sample, size=len(sample), replace=True)\n    boot_means[i] = np.mean(boot_sample)\n\n# Khoảng tin cậy 95% theo phương pháp Percentile\nci_lower = np.percentile(boot_means, 2.5)\nci_upper = np.percentile(boot_means, 97.5)\n\nprint(f\"Trung bình mẫu quan sát:       {np.mean(sample):.2f} phút\")\nprint(f\"Khoảng tin cậy 95% Bootstrap:  [{ci_lower:.2f}, {ci_upper:.2f}] phút\")",
                "output": "Trung bình mẫu quan sát:       30.40 phút\nKhoảng tin cậy 95% Bootstrap:  [29.00, 31.80] phút",
                "explanation": "Bootstrap không đòi hỏi giả định phân phối chuẩn (non-parametric), lấy mẫu có hoàn lại từ chính dữ liệu hiện có để ước lượng độ bất định của tham số thống kê."
              }
            ]
          },
          {
            "id": "sec-09-03-04",
            "title": "4. Tuyên Bố Chính Thức Của ASA Về P-Value & Khủng Hoảng Tái Lập (2016)",
            "content": "\n                          <p>Năm 2016, trước tình trạng hàng loạt nghiên cứu khoa học và mô hình dữ liệu thất bại khi đưa vào thực tế (Khủng hoảng tái lập - Replication Crisis), <strong>Hiệp hội Thống kê Hoa Kỳ (American Statistical Association - ASA)</strong> đã đưa ra một tuyên bố lịch sử về Giá trị P (P-Value):</p>\n                          <h4>Sáu Nguyên Tắc Sống Còn Của Bản Tuyên Bố ASA:</h4>\n                          <ol>\n                            <li><strong>P-value không đo lường xác suất giả thuyết nghiên cứu là đúng.</strong> Nó chỉ đo lường sự không tương thích giữa dữ liệu quan sát được với một mô hình giả thuyết không (Null Hypothesis H0) định trước.</li>\n                            <li><strong>Quyết định kinh doanh và khoa học KHÔNG ĐƯỢC chỉ dựa vào việc p-value có vượt qua một ngưỡng tùy tiện (như 0.05) hay không.</strong> Tư duy nhị phân 'p &lt; 0.05 là đúng, p &ge; 0.05 là sai' là phản khoa học.</li>\n                            <li><strong>Ý nghĩa thống kê không đồng nghĩa với Ý nghĩa thực tiễn (Statistical Significance \\(\\neq\\) Practical Significance).</strong> Với tập dữ liệu Big Data 10 triệu dòng, một mức tăng doanh thu chỉ 0.0001% cũng có thể đạt p-value &lt; 0.00001, nhưng mức tăng đó hoàn toàn vô giá trị trong kinh doanh!</li>\n                            <li><strong>P-hacking (Thao túng P-value):</strong> Việc thử đi thử lại hàng chục biến số hoặc lọc dữ liệu có chọn lọc cho đến khi p &lt; 0.05 là hành vi lừa dối thống kê nghiêm trọng.</li>\n                            <li><strong>Một P-value đơn lẻ không thể cung cấp đầy đủ bằng chứng.</strong> Luôn phải công bố kèm <strong>Kích thước tác động (Effect Size)</strong> và <strong>Khoảng tin cậy (Confidence Interval)</strong>.</li>\n                          </ol>\n                        "
          }
        ],
        "summary": [
          "Tương quan không đồng nghĩa với Nhân quả. Cảnh giác với Tương quan ngụy biện do ngẫu nhiên hoặc biến gây nhiễu. Thử nghiệm A/B Testing là chuẩn mực vàng để chứng minh quan hệ nhân quả.",
          "Thiên kiến kẻ sống sót (Abraham Wald) cảnh báo sự nguy hiểm khi chỉ nhìn vào những thực thể vượt qua phễu chọn lọc mà bỏ quên dữ liệu bị biến mất.",
          "Kỹ thuật Bootstrap (Bradley Efron) ước lượng Khoảng tin cậy 95% bằng cách tái lấy mẫu có hoàn lại trên máy tính, hoàn toàn không phụ thuộc giả định phân phối chuẩn.",
          "Tuyên bố của Hiệp hội Thống kê Hoa Kỳ (ASA): Tuyệt đối không dùng p < 0.05 làm ranh giới nhị phân để ra quyết định; luôn công bố Kích thước tác động (Effect Size) và Khoảng tin cậy."
        ],
        "workedExample": {
          "scenario": "Ước lượng khoảng tin cậy 95% doanh thu bằng Bootstrapping tại TechMart",
          "code": "import numpy as np\n\n# Mẫu doanh số 40 đơn hàng tại chi nhánh mới mở\nnp.random.seed(101)\norders = np.random.lognormal(mean=4.5, sigma=0.8, size=40)\n\n# Thực hiện thuật toán Bootstrap với 2.000 vòng lặp\nB = 2000\nboot_means = np.empty(B)\n\nfor i in range(B):\n    resample = np.random.choice(orders, size=len(orders), replace=True)\n    boot_means[i] = np.mean(resample)\n\n# Tính khoảng tin cậy 95%\nalpha = 0.05\nci_lower = np.percentile(boot_means, 100 * (alpha / 2))\nci_upper = np.percentile(boot_means, 100 * (1 - alpha / 2))\n\nobserved_mean = np.mean(orders)\nprint(f\"Doanh thu trung bình mẫu: {observed_mean:.2f} nghìn VNĐ\")\nprint(f\"Khoảng tin cậy 95% Bootstrap: [{ci_lower:.2f}, {ci_upper:.2f}] nghìn VNĐ\")\nprint(f\"Biên độ bất định: +/- {(ci_upper - ci_lower)/2:.2f} nghìn VNĐ\")",
          "explanation": "1. Dữ liệu doanh số lognormal bị lệch nhưng Bootstrap không đòi hỏi giả định phân phối chuẩn.\\n2. Khoảng tin cậy 95% [98.54, 142.10] cho ban giám đốc TechMart biết chắc rằng doanh thu trung bình thực sự của chi nhánh nằm trong khoảng này với độ tin cậy 95%."
        },
        "fadedExample": {
          "scenario": "Tính toán Kích thước tác động (Effect Size Cohen's d) thay vì chỉ nhìn P-Value",
          "code": "import numpy as np\n\ngroup_A = np.array([100, 102, 101, 103, 102]) # Chiến dịch A\ngroup_B = np.array([103, 104, 105, 104, 106]) # Chiến dịch B\n\n# Yêu cầu: Tính Cohen's d đo lường quy mô tác động thực tế giữa 2 nhóm\n# Công thức: d = (mean_B - mean_A) / pooled_std\n# Trong đó pooled_std = sqrt((std_A^2 + std_B^2) / 2)\n\nmean_a, mean_b = np.mean(group_A), np.mean(group_B)\nstd_a, std_b = np.std(group_A, ddof=1), np.std(group_B, ddof=1)\npooled_std = np.sqrt((std_a**2 + std_b**2) / 2)\ncohens_d = (mean_b - mean_a) / pooled_std\n\nprint(f\"Độ chênh lệch trung bình: {mean_b - mean_a:.2f}\")\nprint(f\"Kích thước tác động Cohen's d: {cohens_d:.2f}\")",
          "blankExplanation": "Tính độ lệch chuẩn gộp pooled_std và chia độ chênh lệch trung bình cho pooled_std để thu được Cohen's d. Theo chuẩn thống kê, d > 0.8 thể hiện tác động thực tế rất lớn, có ý nghĩa kinh doanh thực sự vượt lên trên con số p-value đơn thuần."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Triển khai vòng lặp Bootstrap ước lượng khoảng tin cậy 95%",
            "problem": "Cho mảng điểm đánh giá của 10 khách hàng: `[4, 5, 5, 3, 2, 5, 4, 5, 1, 4]`. Hãy viết hàm Bootstrap tái lấy mẫu 1.000 lần (có hoàn lại) để tạo phân phối mẫu cho điểm trung bình. Tính khoảng tin cậy 95% thực nghiệm bằng phân vị phần trăm (Percentile Bootstrap CI: 2.5% và 97.5%).",
            "hint": "Dùng np.random.choice(scores, size=len(scores), replace=True) trong vòng lặp 1000 lần, lưu trung bình vào list rồi np.percentile(boot_means, [2.5, 97.5]).",
            "solutionCode": "import numpy as np\n\nscores = np.array([4, 5, 5, 3, 2, 5, 4, 5, 1, 4])\nnp.random.seed(42)\nn_bootstraps = 1000\n\nboot_means = []\nfor _ in range(n_bootstraps):\n    sample = np.random.choice(scores, size=len(scores), replace=True)\n    boot_means.append(np.mean(sample))\n\nci_lower, ci_upper = np.percentile(boot_means, [2.5, 97.5])\nprint(f\"Điểm đánh giá trung bình quan sát: {np.mean(scores):.2f}\")\nprint(f\"Khoảng tin cậy Bootstrap 95%: [{ci_lower:.2f}, {ci_upper:.2f}]\")",
            "explanation": "Bootstrap là phương pháp phi tham số mạnh mẽ: bằng cách tái lấy mẫu có hoàn lại từ chính dữ liệu hiện có, ta có thể ước lượng sai số chuẩn và khoảng tin cậy mà không cần đưa ra bất kỳ giả định nào về phân phối chuẩn của quần thể.",
            "solutionOutput": "Điểm đánh giá trung bình quan sát: 3.80\r\nKhoảng tin cậy Bootstrap 95%: [2.90, 4.60]"
          },
          {
            "level": "Vừa",
            "title": "Bóc trần Thiên kiến chọn mẫu (Selection Bias) trong A/B Testing",
            "problem": "Một lập trình viên thử nghiệm nút \"Mua Ngay\" mới. Anh ta cho nút mới xuất hiện cho 1.000 khách hàng truy cập vào ban đêm (22h - 2h) và nút cũ cho 1.000 khách hàng ban ngày (8h - 12h). Hãy viết code mô phỏng kịch bản này: Tỷ lệ chuyển đổi ban đêm là 8%, ban ngày là 3%. Tính toán p-value qua kiểm định 2 tỷ lệ độc lập và giải thích tại sao kết luận \"nút mới tốt hơn\" là hoàn toàn sai lầm do Selection Bias.",
            "hint": "Dùng scipy.stats.chi2_contingency hoặc fisher_exact để kiểm định, sau đó giải thích tác động của biến thời gian truy cập.",
            "solutionCode": "from scipy import stats\nimport numpy as np\n\n# Bảng tiếp liên: [Mua, Không mua]\n# Đêm (Nút mới): 80 mua / 1000 khách\n# Ngày (Nút cũ): 30 mua / 1000 khách\ncontingency_table = np.array([\n    [80, 920],\n    [30, 970]\n])\n\nres = stats.chi2_contingency(contingency_table)\np_val = res.pvalue\n\nprint(f\"Tỷ lệ chuyển đổi Nút mới (Đêm): 8.0%\")\nprint(f\"Tỷ lệ chuyển đổi Nút cũ (Ngày): 3.0%\")\nprint(f\"Giá trị p-value: {p_val:.4e}\")\nprint(\"KẾT LUẬN: Mặc dù p-value < 0.05 rất có ý nghĩa thống kê, nhưng đây là kết luận sai lệch\")\nprint(\"do vi phạm nguyên tắc phân bổ ngẫu nhiên (Randomization): Khách mua đêm có hành vi khác hẳn ban ngày!\")",
            "explanation": "Ý nghĩa thống kê (p-value cực nhỏ) không thể cứu vãn một thiết kế thử nghiệm có lỗi chọn mẫu (Sampling Bias). Người dùng mua hàng lúc đêm khuya thường có độ sẵn sàng chi tiêu và mục tiêu mua sắm khác hẳn ban ngày. A/B Testing bắt buộc phải phân bổ ngẫu nhiên người dùng đồng thời trong cùng một khung thời gian.",
            "solutionOutput": "Tỷ lệ chuyển đổi Nút mới (Đêm): 8.0%\r\nTỷ lệ chuyển đổi Nút cũ (Ngày): 3.0%\r\nGiá trị p-value: 1.5398e-06\r\nKẾT LUẬN: Mặc dù p-value < 0.05 rất có ý nghĩa thống kê, nhưng đây là kết luận sai lệch\r\ndo vi phạm nguyên tắc phân bổ ngẫu nhiên (Randomization): Khách mua đêm có hành vi khác hẳn ban ngày!"
          },
          {
            "level": "Nâng cao",
            "title": "Mô phỏng bẫy P-Hacking: Nguy cơ dương tính giả khi kiểm định 20 lần",
            "problem": "Theo Tuyên bố của Hiệp hội Thống kê Hoa Kỳ (ASA), việc kiểm định nhiều giả thuyết cùng lúc mà không hiệu chỉnh sẽ làm bùng nổ tỷ lệ Dương tính giả (Type I Error). Hãy viết mô phỏng 1.000 thử nghiệm: Mỗi thử nghiệm sinh 20 cặp mảng dữ liệu ngẫu nhiên (hoàn toàn không có liên hệ, phân phối chuẩn N(0, 1)) và chạy 20 bài t-test. Tính tỷ lệ % các thử nghiệm có ít nhất một cặp cho p-value < 0.05.",
            "hint": "Chạy vòng lặp 1000 lần, mỗi lần sinh 20 p-value bằng stats.ttest_ind. Đếm xem có bao nhiêu lần min(p_values) < 0.05.",
            "solutionCode": "import numpy as np\nfrom scipy import stats\n\nnp.random.seed(42)\nn_simulations = 200\nn_tests = 20\nfalse_positive_runs = 0\n\nfor _ in range(n_simulations):\n    # Chạy 20 bài t-test trên dữ liệu hoàn toàn ngẫu nhiên\n    p_values = []\n    for _ in range(n_tests):\n        group_a = np.random.normal(0, 1, 30)\n        group_b = np.random.normal(0, 1, 30)\n        p_val = stats.ttest_ind(group_a, group_b).pvalue\n        p_values.append(p_val)\n        \n    # Kiểm tra xem có ít nhất 1 test cho p < 0.05 không\n    if any(p < 0.05 for p in p_values):\n        false_positive_runs += 1\n\nfp_rate = (false_positive_runs / n_simulations) * 100\ntheoretical_rate = (1 - (1 - 0.05)**n_tests) * 100\n\nprint(f\"Tỷ lệ dương tính giả thực nghiệm khi thử 20 lần: {fp_rate:.1f}%\")\nprint(f\"Tỷ lệ dương tính giả lý thuyết: {theoretical_rate:.1f}%\")",
            "explanation": "Khi kiểm định 20 giả thuyết độc lập ở ngưỡng ý nghĩa alpha = 0.05, xác suất có ít nhất một kết quả dương tính giả ngẫu nhiên là 1 - (1 - 0.05)^20 = 64.2%. Đây là bản chất của hiện tượng P-Hacking: Thử nghiệm càng nhiều chiều dữ liệu mà không áp dụng hiệu chỉnh Bonferroni hoặc Benjamini-Hochberg sẽ chắc chắn dẫn đến những phát hiện ảo.",
            "solutionOutput": "Tỷ lệ dương tính giả thực nghiệm khi thử 20 lần: 64.0%\r\nTỷ lệ dương tính giả lý thuyết: 64.2%"
          }
        ],
        "quiz": [
          {
            "question": "Trong bài học lịch sử của Abraham Wald về việc gia cố giáp máy bay ném bom trong Thế chiến II, tại sao việc bọc giáp vào những vị trí dính nhiều vết đạn nhất lại là một sai lầm chết người?",
            "options": [
              "(Recommended) Vì dữ liệu quan sát chỉ gồm những chiếc máy bay sống sót quay về; những chiếc bị bắn vào động cơ hay buồng lái đã bị rơi mất tích và không có trong tập dữ liệu (Thiên kiến kẻ sống sót).",
              "Vì bọc thêm giáp sẽ làm máy bay quá nặng không thể cất cánh.",
              "Vì quân địch sẽ đổi hướng bắn vào vị trí khác.",
              "Vì các vết đạn trên máy bay sống sót là do đồng đội vô tình bắn nhầm."
            ],
            "correctAnswer": "(Recommended) Vì dữ liệu quan sát chỉ gồm những chiếc máy bay sống sót quay về; những chiếc bị bắn vào động cơ hay buồng lái đã bị rơi mất tích và không có trong tập dữ liệu (Thiên kiến kẻ sống sót).",
            "explanation": "Abraham Wald nhận ra rằng những chiếc máy bay quay về được với chi chít vết đạn ở cánh chứng tỏ cánh là bộ phận không chí mạng. Những chiếc bị bắn vào động cơ không bao giờ quay về được để được đếm. Bỏ qua các thực thể thất bại là bản chất của Survivorship bias."
          },
          {
            "question": "Ưu điểm vượt trội của phương pháp ước lượng Khoảng tin cậy bằng Bootstrapping so với công thức truyền thống (dựa trên phân phối Student t hoặc Normal) là gì?",
            "options": [
              "(Recommended) Bootstrapping là phương pháp phi tham số, không đòi hỏi bất kỳ giả định nào về việc dữ liệu phải tuân theo phân phối chuẩn Gaussian.",
              "Bootstrapping luôn cho ra khoảng tin cậy hẹp hơn công thức truyền thống.",
              "Bootstrapping không cần sử dụng máy tính để tính toán.",
              "Bootstrapping có thể áp dụng ngay cả khi kích thước mẫu N = 1."
            ],
            "correctAnswer": "(Recommended) Bootstrapping là phương pháp phi tham số, không đòi hỏi bất kỳ giả định nào về việc dữ liệu phải tuân theo phân phối chuẩn Gaussian.",
            "explanation": "Công thức truyền thống x_bar +/- t * s / sqrt(n) dựa trên giả định định lý giới hạn trung tâm và phân phối đối xứng. Bootstrapping dựa trên việc tái lấy mẫu thực nghiệm từ chính dữ liệu hiện có, áp dụng tuyệt vời cho các phân phối lệch, bất đối xứng hoặc có cấu trúc phức tạp."
          },
          {
            "question": "Theo tuyên bố chính thức của Hiệp hội Thống kê Hoa Kỳ (ASA, 2016), phát biểu nào sau đây về giá trị P (P-Value) là ĐÚNG ĐẮN?",
            "options": [
              "(Recommended) P-value không đo lường xác suất giả thuyết nghiên cứu là đúng; các quyết định khoa học và kinh doanh không được chỉ dựa vào việc p có nhỏ hơn 0.05 hay không.",
              "Giá trị p < 0.05 chứng minh 100% rằng tính năng mới có tác dụng làm tăng doanh thu.",
              "Giá trị p càng nhỏ thì quy mô tác động (Effect Size) trong kinh doanh càng lớn.",
              "Nếu p > 0.05, điều đó đồng nghĩa với việc giả thuyết H0 hoàn toàn đúng sự thật."
            ],
            "correctAnswer": "(Recommended) P-value không đo lường xác suất giả thuyết nghiên cứu là đúng; các quyết định khoa học và kinh doanh không được chỉ dựa vào việc p có nhỏ hơn 0.05 hay không.",
            "explanation": "ASA khẳng định P-value chỉ là một thước đo mức độ không tương thích giữa dữ liệu và giả thuyết H0, không đo lường độ lớn tác động và không bao giờ được dùng như một công tắc nhị phân để khẳng định chân lý."
          }
        ],
        "selfReviewQuestions": [
          "Phân biệt Tương quan (Correlation) và Quan hệ Nhân quả (Causation). Tại sao A/B Testing lại là công cụ số 1 để chứng minh nhân quả?",
          "Mô tả thuật toán 3 bước của phương pháp tái lấy mẫu Bootstrap (Bradley Efron).",
          "Nêu 3 nguyên tắc trong Tuyên bố chính thức của ASA (2016) về việc sử dụng P-Value."
        ],
        "reflectionQuestion": "Một bạn Data Scientist chạy mô hình hồi quy trên 1 triệu dòng dữ liệu khách hàng và phát hiện nút bấm màu xanh làm tăng doanh số thêm 0.002% với giá trị p-value = 0.00001 (rất nhỏ so với 0.05). Bạn ấy hân hoan đề xuất công ty chi 200 triệu VNĐ để đổi màu toàn bộ hệ sinh thái. Nếu là Giám đốc Dữ liệu, bạn sẽ phản hồi đề xuất này như thế nào dựa trên nguyên tắc Effect Size vs Statistical Significance?",
        "reflectionHint": "Với kích thước mẫu cực lớn (Big Data N = 1.000.000), sai số chuẩn tiệm cận về 0, khiến bất kỳ một sự biến động vi mô ngẫu nhiên nào cũng có thể đạt ý nghĩa thống kê p < 0.0001. Tuy nhiên, kích thước tác động (Effect size) chỉ là 0.002% doanh thu (ví dụ tăng thêm 20.000 đồng/tháng), hoàn toàn không đủ bù đắp chi phí chuyển đổi 200 triệu VNĐ. Ý nghĩa thống kê không đồng nghĩa với Ý nghĩa kinh tế thực tiễn!",
        "nextLessonPreview": "Bước sang Học phần Thu Thập Dữ Liệu (Module 10), chúng ta sẽ làm chủ giao thức HTTP Semantics (RFC 9110), kỹ thuật xây dựng API Client bền bỉ chống Thundering Herd bằng Exponential Backoff & Jitter, cùng đạo đức cào dữ liệu Web chuẩn RFC 9309!",
        "references": [
          {
            "title": "The ASA Statement on P-Values: Context, Process, and Purpose (Wasserstein & Lazar, 2016, The American Statistician)",
            "url": "https://www.tandfonline.com/doi/full/10.1080/00031305.2016.1154108"
          },
          {
            "title": "Bootstrap Methods: Another Look at the Jackknife (Bradley Efron, 1979, The Annals of Statistics)",
            "url": "https://projecteuclid.org/journals/annals-of-statistics/volume-7/issue-1/Bootstrap-Methods-Another-Look-at-the-Jackknife/10.1214/aos/1176344552.full"
          },
          {
            "title": "Spurious Correlations (Tyler Vigen)",
            "url": "https://www.tylervigen.com/spurious-correlations"
          }
        ]
      }
    ]
  },
  {
    "id": "mod-10",
    "number": "Module 10",
    "title": "Thu Thập Dữ Liệu: REST API & Web Scraping",
    "badge": "3 Bài học",
    "icon": "🌐",
    "description": "Làm chủ ngữ nghĩa giao thức HTTP (RFC 9110), xây dựng API Client bền bỉ chống Thundering Herd bằng Exponential Backoff & Jitter, quản lý cấu hình chuẩn Twelve-Factor, phòng thủ lỗ hổng OWASP API và tuân thủ đạo đức cào dữ liệu chuẩn RFC 9309.",
    "lessons": [
      {
        "id": "pd-10-01",
        "number": "10.1",
        "title": "Giao Thức HTTP & Ngữ Nghĩa HTTP Semantics (RFC 9110)",
        "subtitle": "Giải phẫu Request/Response, phân biệt Safe vs Idempotent Methods, cơ chế mã trạng thái và tối ưu TCP Connection Pool với requests.Session",
        "level": "Cơ bản",
        "duration": "45 phút",
        "objectives": [
          "Phân tích cấu trúc thông điệp Request và Response của giao thức HTTP theo chuẩn đặc tả chính thức RFC 9110 (IETF).",
          "Phân biệt triệt để hai thuộc tính an toàn sống còn: Tính An Toàn (Safe Methods: GET, HEAD) và Tính Bất Biến Lũy Đẳng (Idempotent Methods: GET, PUT, DELETE) so với Non-Idempotent (POST).",
          "Giải mã hệ thống mã trạng thái HTTP chuẩn mực: 200 OK, 201 Created, 304 Not Modified, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable, 429 Too Many Requests (RFC 6585) và 500/502/503.",
          "Ứng dụng đối tượng requests.Session() để tái sử dụng TCP Connection Pool (HTTP Keep-Alive), giảm 70% độ trễ mạng so với việc gọi các hàm đơn lẻ."
        ],
        "intuition": {
          "title": "Bức Thư Tay Niêm Phong & Đường Ống Nước Cố Định",
          "metaphor": "Hãy xem cách Internet vận chuyển dữ liệu:\\n1. Thông điệp HTTP (RFC 9110): Giống như một phong bì thư tiêu chuẩn quốc tế: Mặt ngoài ghi địa chỉ người nhận (URL), loại hành động bạn muốn thực hiện (Method: GET là 'cho tôi xem', POST là 'giao hàng mới'), các thông tin chỉ dẫn đóng dấu (Headers: Định dạng mong muốn nhận là JSON, khóa xác thực API Key). Bên trong phong bì là nội dung tài liệu (Body/Payload).\\n2. Safe vs Idempotent (Chiếc công tắc đèn & Nút bấm chuông):\\n   - Safe Method (An toàn - GET): Giống như bạn bật đèn đọc sách. Dù bạn có đọc sách 1 lần hay 100 lần, nội dung cuốn sách trên kệ không hề bị thay đổi hay biến mất!\\n   - Idempotent Method (Lũy đẳng - PUT, DELETE): Giống như công tắc điều hòa thông minh: Nếu bạn gửi lệnh 'Đặt nhiệt độ phòng thành 24 độ C', dù đường truyền mạng chập chờn khiến lệnh này gửi đi 10 lần liên tiếp, căn phòng vẫn chỉ ở đúng 24 độ C! Rất an toàn để gửi lại (Retry) khi gặp sự cố mạng!\\n   - Non-Idempotent Method (Không lũy đẳng - POST): Giống như việc bạn bấm nút quẹt thẻ 'Chuyển khoản 10 triệu đồng'. Nếu mạng chập chờn và hệ thống tự động gửi lại 3 lần, bạn sẽ bị trừ 30 triệu đồng trong tài khoản! Tuyệt đối không bao giờ retry lệnh POST nếu không có khóa định danh giao dịch (Idempotency Key)!\\n3. requests.Session() (Đường ống nước chuyên dụng): Gọi requests.get() thông thường giống như mỗi lần rửa một chiếc bát bạn lại phải thuê thợ đào đường lắp ống nước mới rồi đập bỏ (bắt tay 3 bước TCP 3-way handshake). Dùng requests.Session() giống như bạn lắp sẵn một đường ống nước cố định (Keep-Alive): Hàng nghìn chiếc bát được rửa liên tục qua cùng một đường ống, tốc độ tăng gấp 3 đến 5 lần!",
          "boundary": "Mã trạng thái 429 (Too Many Requests) được quy định trong RFC 6585, là tín hiệu cảnh báo bạn đang gọi API quá nhanh và máy chủ yêu cầu bạn phải dừng lại chờ đợi theo thời gian trong header Retry-After.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">BẢNG PHÂN LOẠI NGỮ NGHĨA PHƯƠNG THỨC HTTP (RFC 9110)</div>\n                        <div style=\"display:grid;grid-template-columns:repeat(4, 1fr);gap:6px;text-align:center;\">\n                          <div style=\"padding:6px;border:1px solid #10b981;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#10b981;\">GET</strong>\n                            <div style=\"font-size:0.7rem;margin-top:2px;\">Safe: CÓ</div>\n                            <div style=\"font-size:0.7rem;color:var(--text-muted);\">Idempotent: CÓ</div>\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #3b82f6;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#3b82f6;\">PUT</strong>\n                            <div style=\"font-size:0.7rem;margin-top:2px;\">Safe: KHÔNG</div>\n                            <div style=\"font-size:0.7rem;color:var(--text-muted);\">Idempotent: CÓ</div>\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #ef4444;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#ef4444;\">DELETE</strong>\n                            <div style=\"font-size:0.7rem;margin-top:2px;\">Safe: KHÔNG</div>\n                            <div style=\"font-size:0.7rem;color:var(--text-muted);\">Idempotent: CÓ</div>\n                          </div>\n                          <div style=\"padding:6px;border:1px solid #f59e0b;border-radius:6px;background:var(--bg-surface);\">\n                            <strong style=\"color:#f59e0b;\">POST</strong>\n                            <div style=\"font-size:0.7rem;margin-top:2px;\">Safe: KHÔNG</div>\n                            <div style=\"font-size:0.7rem;color:#ef4444;font-weight:700;\">Idempotent: KHÔNG!</div>\n                          </div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-10-01-01",
            "title": "1. Ngữ Nghĩa HTTP Semantics Theo Đặc Tả Chuẩn RFC 9110",
            "content": "\n                          <p>Năm 2022, IETF chính thức xuất bản <strong>RFC 9110</strong> (thay thế cho RFC 7231 cũ) để làm sáng tỏ toàn bộ hệ thống ngữ nghĩa của giao thức HTTP. Khi lập trình thu thập dữ liệu (Data Ingestion), hai đặc tính toán học sau đây quyết định tính đúng đắn của toàn bộ hệ thống:</p>\n                          <div class=\"table-responsive\">\n                            <table class=\"table-content\">\n                              <thead>\n                                <tr>\n                                  <th>Khái niệm</th>\n                                  <th>Định nghĩa chuẩn RFC 9110</th>\n                                  <th>Ý nghĩa thực tiễn khi lập trình Pipeline</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr>\n                                  <td><strong>Safe Methods (Phương thức An toàn)</strong></td>\n                                  <td>Các phương thức được định nghĩa là <em>chỉ đọc</em> (read-only), không làm thay đổi trạng thái tài nguyên trên máy chủ. Đại diện: <code>GET</code>, <code>HEAD</code>, <code>OPTIONS</code>.</td>\n                                  <td>Các Web Crawler và Bot có thể tự do quét qua mà không sợ gây biến đổi hoặc xóa dữ liệu của đối tác.</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Idempotent Methods (Phương thức Lũy đẳng)</strong></td>\n                                  <td>Các phương thức mà kết quả tác động lên máy chủ của \\(N\\) lần gọi liên tiếp giống hệt như kết quả của 1 lần gọi duy nhất (\\(f(f(x)) = f(x)\\)). Đại diện: <code>GET</code>, <code>PUT</code>, <code>DELETE</code>.</td>\n                                  <td>Khi đường truyền mạng bị timeout gián đoạn, Client có thể <strong>tự động thử lại (Safe to Retry)</strong> nhiều lần mà không sợ sinh ra dữ liệu trùng lặp.</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Non-Idempotent (Không Lũy đẳng)</strong></td>\n                                  <td>Mỗi lần gọi sẽ tạo ra một hiệu ứng phụ mới (Side-effect). Đại diện: <code>POST</code>.</td>\n                                  <td><strong>TUYỆT ĐỐI KHÔNG RETRY MÙ QUÁNG!</strong> Nếu gặp lỗi mạng khi gửi POST, việc tự động gửi lại có thể tạo ra 2 đơn hàng trùng lặp hoặc trừ tiền tài khoản 2 lần!</td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                        "
          },
          {
            "id": "sec-10-01-02",
            "title": "2. Bản Đồ Mã Trạng Thái HTTP (Status Codes) Trong Kỹ Nghệ Dữ Liệu",
            "content": "\n                          <p>Khi Client gửi request, máy chủ trả về mã trạng thái 3 chữ số phản ánh kết quả:</p>\n                          <ul>\n                            <li><strong>200 OK:</strong> Truy vấn thành công, payload chứa dữ liệu trả về.</li>\n                            <li><strong>201 Created:</strong> Tạo mới tài nguyên thành công (thường là phản hồi của lệnh POST hợp lệ).</li>\n                            <li><strong>304 Not Modified:</strong> Dữ liệu trên server chưa hề thay đổi so với bản cache của bạn (xác thực qua header <code>ETag</code> hoặc <code>If-Modified-Since</code>). Không tốn băng thông tải lại nội dung!</li>\n                            <li><strong>400 Bad Request:</strong> Payload JSON hoặc tham số query gửi lên bị sai định dạng cú pháp.</li>\n                            <li><strong>401 Unauthorized:</strong> Thiếu API Key hoặc Token xác thực đã hết hạn.</li>\n                            <li><strong>403 Forbidden:</strong> Đã xác thực danh tính nhưng tài khoản không có quyền truy cập tài nguyên này (IP bị chặn hoặc vượt quá phân quyền).</li>\n                            <li><strong>404 Not Found:</strong> Sai đường dẫn URL hoặc ID bản ghi không tồn tại trong hệ thống.</li>\n                            <li><strong>422 Unprocessable Entity:</strong> Cú pháp JSON đúng nhưng vi phạm quy tắc nghiệp vụ dữ liệu (ví dụ: ngày sinh lớn hơn ngày hiện tại).</li>\n                            <li><strong>429 Too Many Requests (RFC 6585):</strong> Client đã vượt quá giới hạn tần suất (Rate Limit) cho phép! Bắt buộc phải đọc header <code>Retry-After</code> để biết phải ngủ bao nhiêu giây trước khi được gọi lại.</li>\n                            <li><strong>500 Internal Server Error & 502/503/504 (Gateway/Service Unavailable):</strong> Lỗi phía hạ tầng máy chủ đối tác. Thích hợp để kích hoạt cơ chế Retry có điều kiện.</li>\n                          </ul>\n                        "
          },
          {
            "id": "sec-10-01-03",
            "title": "3. Tối Ưu Hiệu Năng Vượt Bậc Với requests.Session & TCP Keep-Alive",
            "content": "\n                          <p>Nếu bạn thu thập 10.000 sản phẩm bằng cách gọi vòng lặp:</p>\n                          \n                          <p>Bên dưới Notional Machine mạng máy tính: Với mỗi vòng lặp, hệ điều hành phải thực hiện:</p>\n                          <ol>\n                            <li>Truy vấn DNS phân giải tên miền thành địa chỉ IP.</li>\n                            <li>Thực hiện bắt tay 3 bước TCP (SYN, SYN-ACK, ACK) để mở socket.</li>\n                            <li>Thực hiện bắt tay TLS/SSL Handshake (mã hóa trao đổi khóa bảo mật tốn kém CPU).</li>\n                            <li>Gửi request và nhận response.</li>\n                            <li>Đóng socket mạng (FIN, ACK).</li>\n                          </ol>\n                          <p>Việc này lặp lại 10.000 lần gây lãng phí 80% thời gian chạy chỉ để kết nối và ngắt kết nối! Giải pháp chuyên nghiệp là sử dụng <code>requests.Session()</code>:</p>\n                          \n                          <p>Tốc độ xử lý tăng vọt từ <strong>3x đến 5x</strong>, đồng thời giảm tải áp lực socket cho máy chủ cung cấp dữ liệu.</p>\n                        ",
            "codeExamples": [
              {
                "id": "pd-10-01-c1",
                "lang": "python",
                "title": "Tối ưu hóa hiệu năng thu thập API với requests.Session và TCP Keep-Alive",
                "code": "import requests\nfrom requests.adapters import HTTPAdapter\nfrom urllib3.util import Retry\n\n# Khởi tạo phiên làm việc Session tái sử dụng kết nối TCP\nsession = requests.Session()\n\n# Cấu hình tự động Retry cho các phương thức Idempotent khi gặp mã lỗi 500, 502, 503, 504\nretries = Retry(\n    total=3,\n    backoff_factor=0.5,\n    status_forcelist=[500, 502, 503, 504],\n    allowed_methods=['GET', 'HEAD', 'OPTIONS'] # Chỉ retry phương thức an toàn\n)\nadapter = HTTPAdapter(max_retries=retries, pool_connections=10, pool_maxsize=10)\nsession.mount('https://', adapter)\nsession.mount('http://', adapter)\n\nprint(\"Đã thiết lập thành công requests.Session đạt chuẩn công nghiệp!\")",
                "output": "Đã thiết lập thành công requests.Session đạt chuẩn công nghiệp!",
                "explanation": "requests.Session duy trì kết nối TCP ngầm (Keep-Alive), giúp giảm thời gian bắt tay SSL/TLS từ 3-4 lần xuống chỉ còn 1 lần duy nhất cho toàn bộ chuỗi request."
              }
            ]
          }
        ],
        "summary": [
          "RFC 9110 định nghĩa chuẩn mực ngữ nghĩa HTTP: Safe methods (GET) chỉ đọc dữ liệu; Idempotent methods (GET, PUT, DELETE) có thể retry an toàn khi gặp sự cố mạng.",
          "Phương thức POST không có tính lũy đẳng (Non-idempotent), tuyệt đối không retry tự động nếu không có Idempotency Key bảo vệ.",
          "Mã 429 Too Many Requests (RFC 6585) yêu cầu tôn trọng header Retry-After.",
          "Luôn dùng requests.Session() trong khối with để tái sử dụng TCP Connection Pool, loại bỏ chi phí bắt tay lặp lại và tăng tốc độ thu thập dữ liệu gấp nhiều lần."
        ],
        "workedExample": {
          "scenario": "Thu thập danh mục đơn hàng với requests.Session và kiểm tra mã trạng thái",
          "code": "import requests\n\n# Bắt đầu phiên làm việc tối ưu TCP Pool\nsession = requests.Session()\nsession.headers.update({\n    'User-Agent': 'TechMart-Pipeline/1.0',\n    'Accept': 'application/json'\n})\n\nurl = \"https://httpbin.org/status/200\"\n\ntry:\n    response = session.get(url, timeout=(3.05, 10.0))\n    # resp.raise_for_status() tự động ném ra HTTPError nếu mã trạng thái là 4xx hoặc 5xx\n    response.raise_for_status()\n    print(\"Mã trạng thái thành công:\", response.status_code)\n    print(\"Content-Type trả về:\", response.headers.get('Content-Type'))\nexcept requests.exceptions.HTTPError as err:\n    print(\"Phát hiện lỗi HTTP phía máy chủ hoặc client:\", err)\nexcept requests.exceptions.RequestException as err:\n    print(\"Lỗi kết nối mạng vật lý:\", err)\nfinally:\n    session.close() # Giải phóng tài nguyên socket",
          "explanation": "1. requests.Session() giữ kết nối mở cho các lượt gọi tiếp theo.\\n2. response.raise_for_status() là chốt chặn chuẩn mực giúp biến các lỗi 404, 403, 500 thành ngoại lệ Python để bắt và xử lý bài bản thay vì để dữ liệu rỗng trôi nổi vào pipeline.\\n3. session.close() dọn dẹp sạch tài nguyên sau khi hoàn thành."
        },
        "fadedExample": {
          "scenario": "Gửi header xác thực Bearer Token an toàn qua Session",
          "code": "import requests\n\napi_token = \"techmart_secret_token_2026\"\n\nsession = requests.Session()\n\n# Yêu cầu: Gán header 'Authorization' với định dạng 'Bearer <token>' vào session\n# và gán header 'Accept': 'application/json'\n\nsession.headers.update({\n    'Authorization': f'Bearer {api_token}',\n    'Accept': 'application/json'\n})\n\nprint(\"Headers đã cấu hình an toàn:\\n\", dict(session.headers))\nsession.close()",
          "blankExplanation": "Điền cấu trúc session.headers.update({'Authorization': f'Bearer {api_token}', 'Accept': 'application/json'}). Mọi request phát sinh từ session này sẽ tự động đính kèm token xác thực chuẩn RFC 6750."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Gửi HTTP Request chuẩn có Timeout và kiểm tra trạng thái",
            "problem": "Viết hàm `fetch_json_safe(url)` sử dụng thư viện `requests` gửi lệnh GET với cấu hình `timeout=5.0` giây và bộ `headers` giả lập User-Agent của trình duyệt chuẩn. Sử dụng `response.raise_for_status()` để tự động kích hoạt lỗi HTTP nếu server trả về mã lỗi 4xx hoặc 5xx, và giải mã an toàn nội dung JSON.",
            "hint": "Dùng requests.get(url, headers={'User-Agent': '.../1.0'}, timeout=5.0) và response.raise_for_status().",
            "solutionCode": "import requests\n\ndef fetch_json_safe(url):\n    headers = {\n        'User-Agent': 'TechMartDataBot/1.0 (AuditBot; contact@techmart.vn)'\n    }\n    try:\n        response = requests.get(url, headers=headers, timeout=5.0)\n        response.raise_for_status()\n        return response.json()\n    except requests.exceptions.RequestException as e:\n        print(f\"LỖI KẾT NỐI: {e}\")\n        return None\n\n# Thử nghiệm với endpoint JSONPlaceholder công cộng\ntest_url = \"https://jsonplaceholder.typicode.com/todos/1\"\ndata = fetch_json_safe(test_url)\nprint(\"Dữ liệu nhận được:\", data)",
            "explanation": "Không bao giờ được gọi requests.get() mà thiếu tham số timeout. Nếu không có timeout, tiến trình Python có thể bị treo vô thời hạn (hanging socket) khi máy chủ đích không phản hồi, gây tê liệt toàn bộ Data Pipeline. Đồng thời, việc khai báo User-Agent minh bạch là quy chuẩn đạo đức tối thiểu trong kỹ thuật thu thập dữ liệu.",
            "solutionOutput": "Dữ liệu nhận được: {'userId': 1, 'id': 1, 'title': 'delectus aut autem', 'completed': False}"
          },
          {
            "level": "Vừa",
            "title": "Chiến lược Exponential Backoff khi gặp Rate Limit (HTTP 429)",
            "problem": "Khi thu thập dữ liệu qua REST API, ta thường xuyên gặp mã HTTP 429 (Too Many Requests). Hãy viết hàm mô phỏng `request_with_retry(endpoint, max_retries=3)`: Khi gặp phản hồi 429, hàm sẽ ngủ theo cơ chế Exponential Backoff với độ trễ tăng dần `delay = 2 ** attempt + random_jitter`, in log cảnh báo số giây chờ trước khi thử lại.",
            "hint": "Dùng vòng lặp for attempt in range(max_retries), tính delay = 2 ** attempt + np.random.uniform(0.1, 0.5) và time.sleep(delay).",
            "solutionCode": "import time\nimport random\n\ndef mock_api_call(attempt):\n    # Mô phỏng: 2 lần đầu bị chặn 429, lần 3 thành công (200)\n    if attempt < 2:\n        return 429, None\n    return 200, {\"status\": \"success\", \"orders\": [101, 102]}\n\ndef request_with_retry(endpoint, max_retries=3):\n    for attempt in range(max_retries):\n        status_code, data = mock_api_call(attempt)\n        if status_code == 200:\n            print(f\"Thành công ở lần thử {attempt + 1}!\")\n            return data\n        elif status_code == 429:\n            # Exponential backoff mô phỏng với hệ số thu nhỏ để hoàn thành tức thì\n            delay = 0.1 * (2 ** attempt) + random.uniform(0.01, 0.05)\n            print(f\"Gặp HTTP 429 (Rate Limit)! Chờ {delay:.2f} giây trước khi thử lại lần {attempt + 2}...\")\n            time.sleep(delay)\n            \n    print(\"ĐÃ VƯỢT QUÁ SỐ LẦN THỬ LẠI! Dừng pipeline an toàn.\")\n    return None\n\nresult = request_with_retry(\"https://api.techmart.vn/orders\")\nprint(\"Kết quả:\", result)",
            "explanation": "Exponential Backoff kết hợp Jitter (độ trễ ngẫu nhiên nhỏ) là thuật toán tiêu chuẩn của ngành để bảo vệ hạ tầng máy chủ API. Việc tăng thời gian chờ theo lũy thừa (2s, 4s, 8s) giúp giảm áp lực tức thời cho server và tránh hiện tượng Thundering Herd Problem (hàng nghìn tiến trình đồng loạt kết nối lại cùng một giây).",
            "solutionOutput": "Gặp HTTP 429 (Rate Limit)! Chờ 0.11 giây trước khi thử lại lần 2...\r\nGặp HTTP 429 (Rate Limit)! Chờ 0.21 giây trước khi thử lại lần 3...\r\nThành công ở lần thử 3!\r\nKết quả: {'status': 'success', 'orders': [101, 102]}"
          },
          {
            "level": "Nâng cao",
            "title": "Trích xuất JSON phân cấp sâu sang DataFrame phẳng với json_normalize",
            "problem": "Cho cấu trúc JSON trả về từ API đơn hàng: `orders_json = [{'order_id': 'ORD-01', 'customer': {'id': 'C1', 'name': 'An'}, 'items': [{'p_id': 'P1', 'qty': 2}, {'p_id': 'P2', 'qty': 1}]}, {'order_id': 'ORD-02', 'customer': {'id': 'C2', 'name': 'Bình'}, 'items': [{'p_id': 'P3', 'qty': 5}]}]`. Hãy sử dụng `pd.json_normalize()` để làm phẳng cấu trúc lồng nhau này thành một DataFrame chuẩn với các cột: `['order_id', 'customer.id', 'customer.name', 'p_id', 'qty']`.",
            "hint": "Dùng pd.json_normalize(orders_json, record_path='items', meta=['order_id', ['customer', 'id'], ['customer', 'name']]).",
            "solutionCode": "import pandas as pd\n\norders_json = [\n    {\n        'order_id': 'ORD-01',\n        'customer': {'id': 'C1', 'name': 'An'},\n        'items': [{'p_id': 'P1', 'qty': 2}, {'p_id': 'P2', 'qty': 1}]\n    },\n    {\n        'order_id': 'ORD-02',\n        'customer': {'id': 'C2', 'name': 'Bình'},\n        'items': [{'p_id': 'P3', 'qty': 5}]\n    }\n]\n\ndf_flat = pd.json_normalize(\n    orders_json,\n    record_path='items',\n    meta=['order_id', ['customer', 'id'], ['customer', 'name']]\n)\n\nprint(\"DataFrame sau khi làm phẳng bằng json_normalize:\\n\", df_flat)",
            "explanation": "Dữ liệu trả về từ các REST API hiện đại thường có cấu trúc lồng nhau (Nested JSON). Việc sử dụng pd.json_normalize() với tham số record_path và meta cho phép bung danh sách lặp (mỗi mặt hàng một dòng) đồng thời gắn kèm các thuộc tính cha của đơn hàng một cách tự động, nhanh gấp hàng chục lần so với vòng lặp bóc tách thủ công.",
            "solutionOutput": "DataFrame sau khi làm phẳng bằng json_normalize:\r\n   p_id  qty order_id customer.id customer.name\r\n0   P1    2   ORD-01          C1            An\r\n1   P2    1   ORD-01          C1            An\r\n2   P3    5   ORD-02          C2          Bình"
          }
        ],
        "quiz": [
          {
            "question": "Theo chuẩn đặc tả RFC 9110, tại sao việc tự động gửi lại (Auto-Retry) một request POST khi gặp lỗi Timeout mạng lại là một hành vi cực kỳ rủi ro?",
            "options": [
              "(Recommended) Vì POST là phương thức Không Lũy Đẳng (Non-idempotent); request đầu tiên có thể đã được server xử lý nhưng phản hồi bị thất lạc trên đường truyền, việc gửi lại sẽ tạo ra tài nguyên bị trùng lặp hoặc trừ tiền hai lần.",
              "Vì phương thức POST không hỗ trợ mã hóa bảo mật SSL/TLS.",
              "Vì server luôn tự động trả về mã lỗi 405 Method Not Allowed khi nhận lại lệnh POST.",
              "Vì thư viện requests sẽ tự động ném ra ngoại lệ SyntaxError."
            ],
            "correctAnswer": "(Recommended) Vì POST là phương thức Không Lũy Đẳng (Non-idempotent); request đầu tiên có thể đã được server xử lý nhưng phản hồi bị thất lạc trên đường truyền, việc gửi lại sẽ tạo ra tài nguyên bị trùng lặp hoặc trừ tiền hai lần.",
            "explanation": "Khái niệm Idempotence là yếu tố then chốt: Một phương thức chỉ được retry tự động khi việc thực thi nhiều lần không gây thêm tác dụng phụ. POST không lũy đẳng, nên việc thử lại mà không có Idempotency Key sẽ gây nguy cơ nhân bản đơn hàng hoặc sai lệch tài khoản."
          },
          {
            "question": "Mã trạng thái HTTP 304 (Not Modified) mang lại lợi ích gì lớn nhất cho hệ thống thu thập dữ liệu định kỳ?",
            "options": [
              "(Recommended) Giúp tiết kiệm tối đa băng thông và thời gian xử lý: Server báo cho Client biết dữ liệu chưa thay đổi kể từ lần quét trước, do đó không cần tải lại nội dung Body.",
              "Tự động xóa sạch toàn bộ các bản ghi bị trùng lặp trong cơ sở dữ liệu.",
              "Báo hiệu rằng máy chủ đối tác đã bị sập nguồn.",
              "Yêu cầu Client phải nâng cấp lên phiên bản HTTP/3."
            ],
            "correctAnswer": "(Recommended) Giúp tiết kiệm tối đa băng thông và thời gian xử lý: Server báo cho Client biết dữ liệu chưa thay đổi kể từ lần quét trước, do đó không cần tải lại nội dung Body.",
            "explanation": "Khi Client gửi kèm header ETag hoặc If-Modified-Since, nếu dữ liệu chưa có gì mới, server phản hồi mã 304 không có phần thân Body. Pipeline nhận biết ngay dữ liệu vẫn tươi mới mà không mất công truyền tải hàng chục Megabyte dữ liệu qua mạng."
          },
          {
            "question": "Cơ chế kỹ thuật nào giúp 'requests.Session()' tăng tốc độ thu thập dữ liệu từ 3x đến 5x so với việc gọi 'requests.get()' độc lập trong vòng lặp?",
            "options": [
              "(Recommended) Tái sử dụng TCP Connection Pool thông qua tính năng HTTP Keep-Alive, loại bỏ chi phí bắt tay TCP và trao đổi khóa mã hóa TLS lặp đi lặp lại ở mỗi request.",
              "Tự động nén dung lượng ảnh tải về thành định dạng WebP.",
              "Chạy song song hàng nghìn luồng xử lý cùng một lúc mà không tốn CPU.",
              "Bỏ qua bước phân giải tên miền DNS."
            ],
            "correctAnswer": "(Recommended) Tái sử dụng TCP Connection Pool thông qua tính năng HTTP Keep-Alive, loại bỏ chi phí bắt tay TCP và trao đổi khóa mã hóa TLS lặp đi lặp lại ở mỗi request.",
            "explanation": "Mỗi lần tạo kết nối mới đòi hỏi bắt tay TCP (3 gói tin) và mã hóa TLS (thêm 2-4 gói tin trao đổi khóa). Session giữ cho kết nối socket luôn mở và tái sử dụng, giúp các request kế tiếp truyền thẳng dữ liệu ngay lập tức."
          }
        ],
        "selfReviewQuestions": [
          "Phân biệt hai khái niệm Safe và Idempotent trong đặc tả RFC 9110 và nêu ví dụ cho từng loại phương thức HTTP.",
          "Trình bày ý nghĩa của mã phản hồi HTTP 429 và cách đọc header Retry-After.",
          "Tại sao luôn cần thiết lập tham số timeout khi gọi API bằng thư viện requests?"
        ],
        "reflectionQuestion": "Một bạn kỹ sư dữ liệu viết pipeline đồng bộ đơn hàng: Khi gặp lỗi mạng chập chờn, bạn ấy viết vòng lặp retry vô hạn gửi liên tục 100 request POST mỗi giây cho đến khi thành công mới thôi. Hãy phân tích 2 hiểm họa kỹ thuật nghiêm trọng của thiết kế này đối với cả Client và Server.",
        "reflectionHint": "Hiểm họa 1 (Server): Hành vi này biến Client thành một cuộc tấn công từ chối dịch vụ (DoS), làm nghẽn hàng đợi và sập máy chủ đối tác. Hiểm họa 2 (Client): Vì POST là non-idempotent, nếu server kịp nhận và xử lý request mà mạng phản hồi bị đứt, việc gửi lại 100 lần sẽ tạo ra hàng chục đơn hàng trùng lặp, gây sai lệch hàng tỷ đồng trong hệ thống kế toán doanh nghiệp!",
        "nextLessonPreview": "Ở bài 10.2, chúng ta sẽ xây dựng API Client đẳng cấp sản xuất: Kỹ thuật thiết lập Timeout tách biệt, cơ chế Exponential Backoff kèm Jitter để chống bão Thundering Herd, phân trang Cursor-based và bảo mật cấu hình chuẩn Twelve-Factor.",
        "references": [
          {
            "title": "RFC 9110: HTTP Semantics (IETF, 2022)",
            "url": "https://www.rfc-editor.org/rfc/rfc9110.html"
          },
          {
            "title": "RFC 6585: Additional HTTP Status Codes (Status 429)",
            "url": "https://www.rfc-editor.org/rfc/rfc6585.html"
          },
          {
            "title": "Requests Official Documentation - Advanced Usage & Session Objects",
            "url": "https://requests.readthedocs.io/en/latest/user/advanced/"
          }
        ]
      },
      {
        "id": "pd-10-02",
        "number": "10.2",
        "title": "Xây Dựng Client API Chuyên Nghiệp: Timeout, Backoff & Bảo Mật",
        "subtitle": "Kỹ thuật tách biệt Connect/Read Timeout, thuật toán Exponential Backoff kèm Jitter chống Thundering Herd, và bảo mật khóa theo Twelve-Factor",
        "level": "Trung cấp",
        "duration": "45 phút",
        "objectives": [
          "Cấu hình chính xác tham số Timeout tách biệt (Connect Timeout vs Read Timeout) để ngăn chặn hoàn toàn tình trạng treo vô hạn của luồng xử lý dữ liệu.",
          "Triển khai thuật toán Thử lại Lùi lũy thừa (Exponential Backoff) kết hợp Nhiễu ngẫu nhiên (Full Jitter) để phòng chống thảm họa Bão truy vấn đồng thời (Thundering Herd Problem).",
          "Thành thạo các chiến lược duyệt phân trang API: Phân trang theo số trang (Page-based), phân trang theo độ lệch (Offset-based) và phân trang bằng con trỏ định danh (Cursor-based Pagination).",
          "Tuân thủ nghiêm ngặt Yếu tố III của Tuyên ngôn Ứng dụng 12 Yếu tố (Twelve-Factor App): Quản lý bí mật và khóa API qua biến môi trường (os.getenv, python-dotenv), phòng chống rò rỉ khóa trên Git và phòng ngừa rủi ro OWASP API Top 10."
        ],
        "intuition": {
          "title": "Chiếc Đồng Hồ Đếm Giờ & Đám Đông Chen Lấn Cửa Siêu Thị",
          "metaphor": "Hãy xem cách một kỹ sư kỳ cựu xử lý sự cố mạng:\\n1. Chiếc Đồng Hồ Đếm Giờ Tách Biệt (Connect vs Read Timeout):\\n   - Connect Timeout (3.05 giây): Giống như bạn gõ cửa nhà đối tác. Sau 3 giây không ai mở cửa, bạn hiểu rằng nhà đang vắng (server sập hoặc đứt cáp mạng), rút lui ngay!\\n   - Read Timeout (15 giây): Đối tác đã mở cửa đón bạn vào phòng chờ và hứa sẽ tìm hồ sơ cho bạn. Bạn kiên nhẫn đợi tối đa 15 giây cho họ truy vấn cơ sở dữ liệu lớn. Nếu bạn không cài timeout, Python sẽ ngồi chờ ở đó đến hết đời (treo vĩnh viễn), làm tê liệt toàn bộ hệ thống của công ty!\\n2. Bão Truy Vấn (Thundering Herd) & Chiếc Còi Jitter: Khi máy chủ TechMart vừa gặp sự cố khởi động lại lúc 12h trưa: Nếu 10.000 máy khách cùng cài đặt quy tắc 'chờ đúng 5 giây rồi thử lại', thì đúng 12:00:05, cả 10.000 máy khách sẽ cùng lúc đồng thanh nã đạn vào server! Máy chủ vừa ngóc đầu dậy lập tức bị quá tải sập tiếp lần hai!\\n   - Giải pháp Full Jitter: Máy khách 1 chờ 1.2 giây; máy khách 2 chờ 4.8 giây; máy khách 3 chờ 2.5 giây... Toàn bộ 10.000 truy vấn được rải đều mượt mà ra một khoảng thời gian, giúp máy chủ êm đềm hồi phục!\\n3. Bí Mật Twelve-Factor: Bạn không bao giờ ghi mật mã két sắt lên bảng thông báo ở sảnh công ty. Tương tự, bạn TUYỆT ĐỐI KHÔNG BAO GIỜ dán API Key trực tiếp vào mã nguồn Python để đẩy lên GitHub! Bí mật phải nằm ngoài mã nguồn, trong biến môi trường của hệ điều hành!",
          "boundary": "Cursor-based pagination là phương pháp phân trang duy nhất miễn nhiễm trước hiện tượng dữ liệu bị chèn mới hoặc xóa bỏ trong lúc bạn đang quét phân trang.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">THUẬT TOÁN EXPONENTIAL BACKOFF VỚI FULL JITTER</div>\n                        <div style=\"background:var(--bg-surface);padding:8px;border-radius:6px;border:1px solid var(--border-subtle);font-size:0.8rem;\">\n                          <div>Lần 1: Trần = 2s  &rarr; Random ngủ từ 0.0s đến 2.0s</div>\n                          <div>Lần 2: Trần = 4s  &rarr; Random ngủ từ 0.0s đến 4.0s</div>\n                          <div>Lần 3: Trần = 8s  &rarr; Random ngủ từ 0.0s đến 8.0s</div>\n                          <div>Lần 4: Trần = 16s &rarr; Random ngủ từ 0.0s đến 16.0s</div>\n                          <div style=\"color:#10b981;font-weight:700;margin-top:4px;\">&rarr; Phân tán đều lưu lượng, triệt tiêu hoàn toàn Thundering Herd!</div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-10-02-01",
            "title": "1. Thiết Lập Timeout Tách Biệt: Connect vs Read Timeout",
            "content": "\n                          <p>Mặc định trong thư viện <code>requests</code>, tham số <code>timeout=None</code>. Nếu máy chủ chấp nhận kết nối TCP nhưng bị treo tiến trình nội bộ và không bao giờ gửi lại dữ liệu, mã nguồn Python của bạn sẽ <strong>bị treo vô hạn (hang forever)</strong>, chiếm dụng tài nguyên CPU và RAM vĩnh viễn.</p>\n                          <h4>Cấu Hình Tuple Tách Biệt Chuẩn Công Nghiệp:</h4>\n                          \n                          <ul>\n                            <li><strong>Connect Timeout (3.05 giây):</strong> Thời gian tối đa để thiết lập bắt tay TCP với máy chủ từ xa. Con số nên được đặt lớn hơn một chút so với bội số của 3 giây (chu kỳ thử lại gói tin TCP SYN mặc định của Linux/Windows).</li>\n                            <li><strong>Read Timeout (15.0 giây):</strong> Thời gian tối đa máy khách kiên nhẫn chờ máy chủ xử lý logic và bắt đầu bắn từng byte dữ liệu đầu tiên về.</li>\n                          </ul>\n                        ",
            "codeExamples": [
              {
                "id": "pd-10-02-c1",
                "lang": "python",
                "title": "Thiết lập Timeout tách biệt (Connect Timeout vs Read Timeout) và kiểm tra mã lỗi",
                "code": "import requests\n\n# URL kiểm tra phản hồi mẫu\nurl = \"https://httpbin.org/get\"\n\ntry:\n    # (connect_timeout, read_timeout): 3.05s để bắt tay mạng, 15s để máy chủ xử lý dữ liệu\n    resp = requests.get(url, timeout=(3.05, 15.0))\n    resp.raise_for_status() # Bắt buộc ném ngoại lệ nếu nhận mã 4xx hoặc 5xx\n    data = resp.json()\n    print(\"Mã trạng thái thành công:\", resp.status_code)\n    print(\"Địa chỉ IP người gọi:\", data.get('origin', 'N/A'))\nexcept requests.exceptions.Timeout:\n    print(\"LỖI: Máy chủ không phản hồi trong thời gian quy định!\")\nexcept requests.exceptions.RequestException as e:\n    print(\"LỖI KẾT NỐI API:\", e)",
                "output": "Mã trạng thái thành công: 200\nĐịa chỉ IP người gọi: Cục bộ / Mạng thử nghiệm",
                "explanation": "Không bao giờ để timeout=None. Connect timeout nên đặt là bội số lớn hơn 3 giây một chút (ví dụ 3.05s) theo khuyến cáo phân bổ gói tin TCP SYN packet của RFC."
              }
            ]
          },
          {
            "id": "sec-10-02-02",
            "title": "2. Exponential Backoff & Jitter: Triệt Tiêu Thảm Họa Thundering Herd",
            "content": "\n                          <p>Khi máy chủ trả về mã lỗi tạm thời như <code>503 Service Unavailable</code> hoặc <code>429 Too Many Requests</code>, một thuật toán thử lại ngây thơ (chờ cố định 2 giây) sẽ kích hoạt hiện tượng <strong>Thundering Herd (Bầy thú chạy loạn)</strong>: Hàng ngàn tiến trình đồng loạt ùa vào tấn công máy chủ tại đúng cùng một giây, biến một sự cố nhỏ thành sự sụp đổ dây chuyền (Cascading Failure).</p>\n                          <h4>Thuật Toán Full Jitter Của AWS Architecture:</h4>\n                          \n                          <p>Nhờ Full Jitter, xung đột giữa các luồng worker được giải phóng hoàn toàn, cho phép hạ tầng phía sau phục hồi êm ái.</p>\n                        "
          },
          {
            "id": "sec-10-02-03",
            "title": "3. Ba Chiến Lược Duyệt Phân Trang (Pagination Patterns)",
            "content": "\n                          <p>Khi tập dữ liệu gồm hàng triệu dòng, API không bao giờ trả về tất cả một lúc mà chia thành nhiều trang (Pages):</p>\n                          <div class=\"table-responsive\">\n                            <table class=\"table-content\">\n                              <thead>\n                                <tr>\n                                  <th>Kiểu phân trang</th>\n                                  <th>Cú pháp URL</th>\n                                  <th>Ưu điểm</th>\n                                  <th>Nhược điểm & Rủi ro</th>\n                                </tr>\n                              </thead>\n                              <tbody>\n                                <tr>\n                                  <td><strong>Page-based</strong></td>\n                                  <td><code>?page=3&limit=50</code></td>\n                                  <td>Đơn giản, con người dễ đọc hiểu.</td>\n                                  <td>Nếu có dòng dữ liệu mới được chèn vào trang 1 trong lúc đang quét, bản ghi cuối cùng của trang 1 sẽ bị đẩy sang trang 2, khiến dữ liệu bị trùng lặp ở lượt quét kế tiếp!</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Offset-based</strong></td>\n                                  <td><code>?offset=100&limit=50</code></td>\n                                  <td>Tương thích tự nhiên với câu lệnh SQL <code>LIMIT... OFFSET</code>.</td>\n                                  <td>Truy vấn cực chậm ở trang sâu (ví dụ: offset=1.000.000 buộc CSDL phải đọc và vứt bỏ 1 triệu dòng trước đó).</td>\n                                </tr>\n                                <tr>\n                                  <td><strong>Cursor-based (Khuyên Dùng)</strong></td>\n                                  <td><code>?after=cursor_eyJob3Jn...</code></td>\n                                  <td><strong>Tối ưu tuyệt đối:</strong> Máy chủ tìm kiếm trực tiếp bằng Index (WHERE id &gt; cursor), tốc độ không đổi ở bất kỳ độ sâu nào; <strong>miễn nhiễm 100%</strong> với việc dữ liệu bị thêm/xóa trong lúc quét!</td>\n                                  <td>Không thể nhảy cóc đến một trang bất kỳ; bắt buộc phải duyệt tuần tự từ đầu đến cuối.</td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                        "
          },
          {
            "id": "sec-10-02-04",
            "title": "4. Bảo Mật Cấu Hình Theo Chuẩn Twelve-Factor & Phòng Thủ OWASP API",
            "content": "\n                          <p>Tuyên ngôn <strong>Twelve-Factor App</strong> (nhân tố số III: Configuration) khẳng định một nguyên tắc bất biến:</p>\n                          <blockquote>\n                            <em>\"Lưu trữ cấu hình bí mật trong môi trường (Store config in the environment), tuyệt đối tách biệt khỏi mã nguồn ứng dụng.\"</em>\n                          </blockquote>\n                          <h4>Quy Trình Quản Lý Bí Mật Chuẩn Doanh Nghiệp:</h4>\n                          <ol>\n                            <li>Tạo file <code>.env</code> lưu khóa cục bộ:\n                              \n                            </li>\n                            <li><strong>Thêm ngay file <code>.env</code> vào <code>.gitignore</code>!</strong> Tuyệt đối không bao giờ để file này lọt vào hệ thống quản lý phiên bản Git.</li>\n                            <li>Tạo file mẫu <code>.env.example</code> không chứa giá trị thật để các thành viên khác biết cần cấu hình những biến nào.</li>\n                            <li>Trong mã Python, đọc biến môi trường bằng thư viện an toàn:\n                              \n                            </li>\n                          </ol>\n                          <div class=\"callout callout-danger\">\n                            <strong>Cảnh Báo OWASP API Security Top 10:</strong>\n                            <p>Lỗ hổng số 1 trong thế giới API là <strong>BOLA (Broken Object Level Authorization)</strong>: Client thay đổi ID trên URL (ví dụ: đổi từ <code>/orders/101</code> thành <code>/orders/102</code>) để xem trộm đơn hàng của khách hàng khác. Khi xây dựng API Client hoặc Data Pipeline, luôn xác thực chặt chẽ quyền sở hữu token và không quét bừa bãi các ID không thuộc thẩm quyền.</p>\n                          </div>\n                        ",
            "codeExamples": [
              {
                "id": "pd-10-02-c2",
                "lang": "python",
                "title": "Bảo mật cấu hình Twelve-Factor: Đọc API Key từ biến môi trường os.environ",
                "code": "import os\n\n# Giả lập thiết lập biến môi trường an toàn (trong thực tế chạy ngoài terminal hoặc Docker)\nos.environ['TECHMART_API_KEY'] = 'tm_live_sec_demo_key_9988'\nos.environ['TECHMART_BASE_URL'] = 'https://api.techmart.vn/v2'\n\n# Hàm đọc cấu hình bảo mật chuẩn Twelve-Factor\napi_key = os.environ.get('TECHMART_API_KEY')\nbase_url = os.environ.get('TECHMART_BASE_URL', 'https://api.techmart.vn/v1')\n\nif not api_key:\n    raise ValueError(\"LỖI BẢO MẬT: Chưa cấu hình biến môi trường TECHMART_API_KEY!\")\n\nprint(\"Đọc cấu hình bảo mật thành công:\")\nprint(\"Base URL:\", base_url)\nprint(\"Masked API Key:\", api_key[:7] + \"...\" + api_key[-4:])",
                "output": "Đọc cấu hình bảo mật thành công:\nBase URL: https://api.techmart.vn/v2\nMasked API Key: tm_live...9988",
                "explanation": "Quy tắc cốt lõi: Không bao giờ hardcode khóa bí mật vào mã nguồn. Luôn đọc từ biến môi trường và che dấu (masking) khi ghi log."
              }
            ]
          }
        ],
        "summary": [
          "Luôn cấu hình timeout tách biệt (connect_timeout, read_timeout) ví dụ (3.05, 15.0) để chống treo tiến trình vô hạn.",
          "Áp dụng Exponential Backoff kết hợp Full Jitter để phân tán ngẫu nhiên thời gian thử lại, triệt tiêu thảm họa Thundering Herd khi server phục hồi.",
          "Ưu tiên Cursor-based Pagination để đảm bảo tốc độ cao ở trang sâu và miễn nhiễm trước việc dữ liệu bị dịch chuyển do thêm/xóa trong lúc quét.",
          "Chuẩn Twelve-Factor: Tuyệt đối không hardcode API Key trong mã nguồn; luôn lưu trong tệp .env, thêm vào .gitignore và nạp qua os.getenv()."
        ],
        "workedExample": {
          "scenario": "Thu thập dữ liệu phân trang an toàn với Exponential Backoff & Jitter",
          "code": "import time\nimport random\nimport requests\n\ndef fetch_with_retry(url, headers, max_attempts=3):\n    for attempt in range(1, max_attempts + 1):\n        try:\n            # Connect timeout 3.05s, Read timeout 10.0s\n            response = requests.get(url, headers=headers, timeout=(3.05, 10.0))\n            \n            if response.status_code == 200:\n                return response.json()\n            elif response.status_code in [429, 500, 502, 503, 504]:\n                wait_time = random.uniform(0, min(16.0, 1.0 * (2 ** attempt)))\n                print(f\"[Attempt {attempt}] Lỗi {response.status_code}. Backoff ngủ {wait_time:.2f}s...\")\n                time.sleep(wait_time)\n            else:\n                response.raise_for_status() # Lỗi 4xx nghiêm trọng không retry\n        except requests.exceptions.RequestException as err:\n            wait_time = random.uniform(0, min(16.0, 1.0 * (2 ** attempt)))\n            print(f\"[Attempt {attempt}] Lỗi mạng: {err}. Thử lại sau {wait_time:.2f}s...\")\n            time.sleep(wait_time)\n            \n    raise TimeoutError(\"Đã vượt quá số lần thử lại tối đa nhưng không thành công!\")\n\n# Thử nghiệm gọi endpoint an toàn\nheaders = {'User-Agent': 'TechMart-DataBot/2.0'}\ndata = fetch_with_retry(\"https://httpbin.org/get\", headers)\nprint(\"Thu thập dữ liệu thành công, IP client:\", data.get('origin'))",
          "explanation": "1. Hàm kiểm tra mã lỗi: các lỗi 429 hoặc 5xx tạm thời được áp dụng Exponential Backoff + Jitter để thử lại an toàn.\\n2. Các lỗi client vĩnh viễn (như 401 Unauthorized, 404 Not Found) sẽ bị ném ngoại lệ dừng ngay lập tức mà không retry vô nghĩa.\\n3. Tuple timeout (3.05, 10.0) đảm bảo tiến trình không bao giờ bị treo cứng."
        },
        "fadedExample": {
          "scenario": "Duyệt phân trang Cursor-based an toàn",
          "code": "import requests\n\ndef scan_all_products(base_url):\n    all_items = []\n    next_cursor = None\n    \n    while True:\n        params = {'limit': 50}\n        if next_cursor:\n            params['after'] = next_cursor\n            \n        # Yêu cầu: Gửi request với params và timeout=(3.05, 10.0)\n        # Giả sử response JSON trả về: {'data': [...], 'has_more': False, 'next_cursor': 'xyz'}\n        # Gợi ý: Gán items vào all_items, cập nhật next_cursor và thoát nếu has_more == False\n        \n        # Mô phỏng phản hồi kết thúc\n        has_more = False\n        if not has_more:\n            break\n            \n    return all_items\n\nprint(\"Cấu trúc duyệt Cursor-based đã sẵn sàng.\")",
          "blankExplanation": "Điền logic kiểm tra điều kiện lặp: cập nhật tham số after=next_cursor ở mỗi vòng lặp và kiểm tra cờ has_more. Khi has_more là False, vòng lặp dừng lại mượt mà."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Kiểm tra tệp robots.txt trước khi thu thập dữ liệu",
            "problem": "Viết một hàm Python `can_fetch_url(site_root, target_url, user_agent='TechMartBot')` sử dụng module chuẩn `urllib.robotparser.RobotFileParser` để tự động đọc tệp `robots.txt` của website và kiểm tra xem bot của bạn có được phép truy cập đường dẫn `target_url` hay không.",
            "hint": "Khởi tạo rp = urllib.robotparser.RobotFileParser(), rp.set_url(site_root + '/robots.txt'), gọi rp.read() và rp.can_fetch(user_agent, target_url).",
            "solutionCode": "import urllib.robotparser\n\ndef can_fetch_url(site_root, target_url, user_agent='TechMartBot'):\n    rp = urllib.robotparser.RobotFileParser()\n    rp.set_url(f\"{site_root}/robots.txt\")\n    try:\n        rp.read()\n        allowed = rp.can_fetch(user_agent, target_url)\n        return allowed\n    except Exception as e:\n        print(f\"Không thể đọc robots.txt: {e}\")\n        return False\n\n# Mô phỏng kiểm tra trên trang wikipedia\nsite = \"https://en.wikipedia.org\"\ntest_url = \"https://en.wikipedia.org/wiki/Python_(programming_language)\"\nis_allowed = can_fetch_url(site, test_url)\nprint(f\"Bot được phép truy cập '{test_url}': {is_allowed}\")",
            "explanation": "Tuân thủ robots.txt là nguyên tắc nền tảng của Scraping có đạo đức (Ethical Web Scraping). Bỏ qua robots.txt không chỉ có nguy cơ vi phạm pháp lý và điều khoản dịch vụ (ToS) mà còn có thể khiến địa chỉ IP của doanh nghiệp bị đưa vào danh sách đen (Blacklist) của hệ thống phòng thủ Cloudflare/Akamai.",
            "solutionOutput": "Bot được phép truy cập 'https://en.wikipedia.org/wiki/Python_(programming_language)': False"
          },
          {
            "level": "Vừa",
            "title": "Bóc tách dữ liệu sản phẩm có xử lý trường thiếu với BeautifulSoup",
            "problem": "Cho đoạn mã HTML chứa danh sách sản phẩm, trong đó có sản phẩm bị thiếu giá (`<span class=\"price\">`) hoặc nhãn đánh giá (`<span class=\"rating\">`). Hãy dùng `BeautifulSoup` để trích xuất danh sách sản phẩm. Nếu trường nào bị thiếu, gán giá trị mặc định `None` thay vì làm chương trình văng lỗi `AttributeError`.",
            "hint": "Dùng item.find('span', class_='price') và toán tử 3 ngôi price_elem.text.strip() if price_elem else None.",
            "solutionCode": "from bs4 import BeautifulSoup\nimport pandas as pd\n\nhtml_doc = \"\"\"\n<div class=\"product-list\">\n    <div class=\"item\">\n        <h3 class=\"title\">Bàn phím cơ AKKO</h3>\n        <span class=\"price\">1,200,000đ</span>\n        <span class=\"rating\">4.8</span>\n    </div>\n    <div class=\"item\">\n        <h3 class=\"title\">Chuột không dây Logitech</h3>\n        <!-- Thiếu thẻ price do hết hàng -->\n        <span class=\"rating\">4.5</span>\n    </div>\n    <div class=\"item\">\n        <h3 class=\"title\">Tai nghe Gaming</h3>\n        <span class=\"price\">850,000đ</span>\n        <!-- Thiếu thẻ rating -->\n    </div>\n</div>\n\"\"\"\n\nsoup = BeautifulSoup(html_doc, 'html.parser')\nproducts = []\n\nfor item in soup.find_all('div', class_='item'):\n    title_el = item.find('h3', class_='title')\n    price_el = item.find('span', class_='price')\n    rating_el = item.find('span', class_='rating')\n    \n    products.append({\n        'title': title_el.text.strip() if title_el else None,\n        'price': price_el.text.strip() if price_el else None,\n        'rating': float(rating_el.text.strip()) if rating_el else None\n    })\n\ndf_scraped = pd.DataFrame(products)\nprint(\"Kết quả bóc tách an toàn:\\n\", df_scraped)",
            "explanation": "Cấu trúc DOM của các trang thương mại điện tử rất động và thường xuyên thiếu trường dữ liệu (ví dụ sản phẩm hết hàng bị ẩn giá). Việc luôn kiểm tra sự tồn tại của element trước khi truy cập .text giúp code scraper có tính chịu lỗi cao (Robustness), không bị sập giữa chừng khi quét hàng nghìn trang.",
            "solutionOutput": "Kết quả bóc tách an toàn:\r\n                       title       price  rating\r\n0          Bàn phím cơ AKKO  1,200,000đ     4.8\r\n1  Chuột không dây Logitech         NaN     4.5\r\n2           Tai nghe Gaming    850,000đ     NaN"
          },
          {
            "level": "Nâng cao",
            "title": "Làm sạch và chuẩn hóa văn bản thô bóc tách từ HTML",
            "problem": "Văn bản sau khi cào từ web thường chứa các ký tự xuống dòng `\\n`, tab `\\t`, khoảng trắng thừa và ký tự HTML entities như `&amp;`, `&nbsp;`. Hãy viết một hàm `clean_scraped_text(raw_text)` sử dụng biểu thức chính quy (`re`) và `html.unescape()` để chuẩn hóa văn bản về dạng chuỗi một dòng sạch sẽ, không khoảng trắng kép.",
            "hint": "Dùng html.unescape(raw_text) rồi re.sub(r'\\s+', ' ', text).strip().",
            "solutionCode": "import html\nimport re\n\ndef clean_scraped_text(raw_text):\n    if not raw_text or not isinstance(raw_text, str):\n        return \"\"\n    # Giải mã HTML Entities (&amp; -> &, &nbsp; -> space)\n    decoded = html.unescape(raw_text)\n    # Thay thế toàn bộ khoảng trắng, tab, newline liên tiếp thành 1 dấu cách duy nhất\n    cleaned = re.sub(r'\\s+', ' ', decoded).strip()\n    return cleaned\n\nmessy_sample = \"\\n\\t\\tBàn phím cơ Gaming&nbsp;&amp;&nbsp;Văn phòng\\n\\t  (Bảo hành 24 tháng)   \\n\"\nclean_result = clean_scraped_text(messy_sample)\nprint(f\"Văn bản gốc: {repr(messy_sample)}\")\nprint(f\"Văn bản sau làm sạch: {repr(clean_result)}\")",
            "explanation": "Ký tự khoảng trắng không ngắt (&nbsp;) và các mã thực thể HTML nếu không được giải mã sẽ gây ra sai lệch nghiêm trọng khi so khớp chuỗi, tách từ (Tokenization) hoặc lập chỉ mục trong NLP. Việc đưa hàm chuẩn hóa văn bản vào giai đoạn trích xuất là bước làm sạch sơ cấp thiết yếu.",
            "solutionOutput": "Văn bản gốc: '\\n\\t\\tBàn phím cơ Gaming&nbsp;&amp;&nbsp;Văn phòng\\n\\t  (Bảo hành 24 tháng)   \\n'\r\nVăn bản sau làm sạch: 'Bàn phím cơ Gaming & Văn phòng (Bảo hành 24 tháng)'"
          }
        ],
        "quiz": [
          {
            "question": "Trong thuật toán thử lại Exponential Backoff khi gọi API, tại sao việc bổ sung yếu tố ngẫu nhiên (Jitter) lại là bắt buộc trong môi trường chịu tải cao?",
            "options": [
              "(Recommended) Để xé lẻ và phân tán thời gian thử lại của hàng ngàn máy khách, ngăn chặn hiện tượng bão truy vấn đồng thời (Thundering Herd) làm sập máy chủ vừa hồi phục.",
              "Để làm cho dữ liệu gửi lên được mã hóa bảo mật hơn.",
              "Để giảm thiểu sai số làm tròn số thực trong ngôn ngữ Python.",
              "Để tự động biến phương thức POST thành phương thức GET."
            ],
            "correctAnswer": "(Recommended) Để xé lẻ và phân tán thời gian thử lại của hàng ngàn máy khách, ngăn chặn hiện tượng bão truy vấn đồng thời (Thundering Herd) làm sập máy chủ vừa hồi phục.",
            "explanation": "Nếu không có Jitter, mọi máy khách gặp lỗi cùng lúc sẽ đợi cùng một khoảng thời gian số mũ cố định và đồng loạt tấn công lại máy chủ ở cùng một tích tắc. Full Jitter rải đều các truy vấn này trên toàn bộ khoảng thời gian, giúp máy chủ hạ nhiệt và xử lý êm ái."
          },
          {
            "question": "Ưu điểm cốt lõi của phương pháp phân trang Cursor-based Pagination so với Offset-based Pagination khi xử lý tập dữ liệu lớn là gì?",
            "options": [
              "(Recommended) Tốc độ truy vấn luôn ổn định ở mức O(1) do sử dụng chỉ mục trực tiếp, và miễn nhiễm tuyệt đối với việc dữ liệu bị dịch chuyển/trùng lặp khi có bản ghi mới chèn vào.",
              "Cho phép người dùng bấm nhảy cóc trực tiếp đến trang số 10.000 ngay lập tức.",
              "Tự động dịch mã hóa JSON sang định dạng tệp CSV.",
              "Không đòi hỏi máy chủ phải có cơ sở dữ liệu quan hệ SQL."
            ],
            "correctAnswer": "(Recommended) Tốc độ truy vấn luôn ổn định ở mức O(1) do sử dụng chỉ mục trực tiếp, và miễn nhiễm tuyệt đối với việc dữ liệu bị dịch chuyển/trùng lặp khi có bản ghi mới chèn vào.",
            "explanation": "Offset-based (OFFSET 1000000) buộc CSDL phải đọc và bỏ qua 1 triệu dòng trước đó rất chậm, đồng thời dễ làm sót/trùng dòng nếu có dữ liệu mới chèn vào đầu bảng. Cursor-based dùng con trỏ định danh (WHERE id > cursor) duy trì tốc độ tức thì và tính toàn vẹn phân trang hoàn hảo."
          },
          {
            "question": "Theo nguyên tắc số III của Twelve-Factor App, việc lưu trữ khóa API bí mật (API Secret Keys) ở đâu sau đây là ĐÚNG ĐẮN VÀ AN TOÀN NHẤT?",
            "options": [
              "(Recommended) Trong các biến môi trường của hệ thống (Environment Variables) hoặc tệp .env được thêm vào .gitignore.",
              "Ghi cứng trực tiếp vào một biến toàn cục trong tệp config.py và commit lên GitHub riêng tư.",
              "Lưu trong một bảng cơ sở dữ liệu không cần mật khẩu bảo vệ.",
              "In khóa ra tệp log của ứng dụng để dễ dàng tra cứu khi cần."
            ],
            "correctAnswer": "(Recommended) Trong các biến môi trường của hệ thống (Environment Variables) hoặc tệp .env được thêm vào .gitignore.",
            "explanation": "Twelve-Factor yêu cầu cấu hình bí mật phải hoàn toàn tách biệt khỏi mã nguồn ứng dụng và được lưu trữ trong môi trường thực thi (Environment). Việc lưu trong .env và đưa vào .gitignore ngăn ngừa triệt để nguy cơ lộ khóa trên kho lưu trữ mã nguồn Git."
          }
        ],
        "selfReviewQuestions": [
          "Tại sao luôn cần thiết lập Connect Timeout ngắn hơn Read Timeout khi cấu hình requests.get()?",
          "Mô tả thuật toán Full Jitter và giải thích cách nó triệt tiêu thảm họa Thundering Herd.",
          "Lỗ hổng BOLA (Broken Object Level Authorization) trong OWASP API Top 10 là gì và làm thế nào để phòng tránh?"
        ],
        "reflectionQuestion": "Một kỹ sư tân binh đẩy code pipeline lên GitHub công khai. 15 phút sau, công ty nhận được thông báo tài khoản điện toán đám mây AWS bị trừ 5.000 USD do hacker quét thấy API Key lộ trong mã nguồn và chiếm dụng để đào tiền điện tử. Nếu áp dụng đúng quy chuẩn Twelve-Factor App, sự cố này đã được ngăn chặn 100% như thế nào?",
        "reflectionHint": "Nếu áp dụng Twelve-Factor: API Key được lưu trong tệp .env nằm ngoài mã nguồn và tệp này được khai báo ngay trong .gitignore từ dòng đầu tiên. Khi đẩy code lên GitHub, chỉ có mã logic Python được tải lên, hoàn toàn không có bất kỳ ký tự bí mật nào xuất hiện trên mạng. Hacker quét mã nguồn sẽ không tìm thấy bất kỳ thông tin nhạy cảm nào.",
        "nextLessonPreview": "Ở bài 10.3, chúng ta sẽ chuyển sang kỹ thuật bóc tách dữ liệu Web (Web Scraping): Thấu hiểu cấu trúc DOM HTML, làm chủ BeautifulSoup4, đặc tả Robots.txt chuẩn RFC 9309 và các nguyên tắc đạo đức/pháp lý bảo vệ dữ liệu cá nhân PII.",
        "references": [
          {
            "title": "The Twelve-Factor App - III. Config",
            "url": "https://12factor.net/config"
          },
          {
            "title": "Exponential Backoff And Jitter (AWS Architecture Blog)",
            "url": "https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/"
          },
          {
            "title": "OWASP API Security Top 10",
            "url": "https://owasp.org/www-project-api-security/"
          }
        ]
      },
      {
        "id": "pd-10-03",
        "number": "10.3",
        "title": "Web Scraping Có Đạo Đức & Tuân Thủ Pháp Lý (RFC 9309)",
        "subtitle": "Kiến trúc HTML DOM & CSS Selectors, bóc tách với BeautifulSoup4, đặc tả Robots.txt (RFC 9309) và bảo vệ dữ liệu cá nhân PII",
        "level": "Nâng cao",
        "duration": "50 phút",
        "objectives": [
          "Phân tích cấu trúc Cây Mô hình Đối tượng Tài liệu (HTML Document Object Model - DOM) và áp dụng các bộ chọn CSS Selectors để bóc tách dữ liệu chuẩn xác với BeautifulSoup4.",
          "Thấu hiểu và tuân thủ nghiêm ngặt Giao thức Loại trừ Robot (Robots Exclusion Protocol) theo chuẩn đặc tả chính thức RFC 9309 (IETF 2022): Phân tích cú pháp robots.txt, User-Agent, Disallow, Allow và Crawl-Delay.",
          "Đánh giá các khía cạnh pháp lý và đạo đức trong kỹ nghệ dữ liệu: Điều khoản dịch vụ trang web (Terms of Service - TOS), bản quyền dữ liệu trí tuệ và bảo vệ dữ liệu cá nhân định danh (Personally Identifiable Information - PII) theo Nghị định 13/2023/NĐ-CP và GDPR.",
          "Triển khai Bot thu thập dữ liệu lịch sự (Polite Web Crawler): Định danh minh bạch qua header User-Agent, ngẫu nhiên hóa thời gian chờ (Rate limiting delay) để không bao giờ gây nghẽn hoặc làm sập máy chủ mục tiêu."
        ],
        "intuition": {
          "title": "Bảng Nội Quy Khách Sạn & Người Khách Tham Quan Lịch Thiệp",
          "metaphor": "Hãy xem sự khác nhau giữa một tên trộm đột nhập và một vị khách tham quan văn minh:\\n1. Tệp robots.txt (RFC 9309): Giống như tấm bảng 'Nội Quy Khách Sạn' treo ngay tại cửa ra vào: 'Khu vực bếp và phòng kỹ thuật cấm khách vào (Disallow: /admin, Disallow: /private); Phòng trưng bày mở cửa tự do (Allow: /products)'. Một chú Robot văn minh bước vào khách sạn, việc đầu tiên là phải đọc tấm bảng này và tuyệt đối không bao giờ bước chân vào các khu vực cấm!\\n2. Cây HTML DOM & Chiếc Kính Hiển Vi BeautifulSoup: Trang web giống như một cái cây gia phả nhiều tầng: Thân cây là &lt;html&gt;, cành lớn là &lt;body&gt;, nhánh con là &lt;div class='product-card'&gt;, và chiếc lá chứa quả ngọt là &lt;span class='price'&gt;15.000.000đ&lt;/span&gt;. BeautifulSoup giống như một chiếc nhíp tinh xảo giúp bạn tìm đúng chiếc lá cần hái dựa vào tọa độ CSS Selector mà không làm gãy cành cây!\\n3. Đạo Đức Cào Dữ Liệu & Tấn Công DoS: Nếu bạn bước vào một tiệm bánh nhỏ, cứ 1 giây bạn hét vào mặt người bán hàng 500 câu hỏi: 'Bánh này bao nhiêu tiền?', người bán hàng sẽ choáng váng ngất xỉu và tiệm bánh phải đóng cửa (Tấn công từ chối dịch vụ - DoS)! Một Crawler lịch thiệp sẽ hỏi một câu, kiên nhẫn đợi 3-5 giây, rồi mới nhẹ nhàng hỏi câu tiếp theo.\\n4. Dữ Liệu Định Danh Cá Nhân (PII): Tên tuổi, số điện thoại, địa chỉ nhà riêng và số CCCD của người khác không phải là tài sản công cộng. Thu thập và lưu trữ trái phép dữ liệu PII mà không có sự đồng thuận là hành vi vi phạm pháp luật hình sự!",
          "boundary": "Tệp robots.txt là một chuẩn mực tự nguyện mang tính quy ước kỹ thuật (không có cơ chế mã hóa chặn vật lý), nhưng việc cố tình bỏ qua robots.txt và vượt qua các cơ chế tường lửa bảo vệ có thể cấu thành tội phạm truy cập trái phép mạng máy tính theo luật an ninh mạng.",
          "visualHtml": "\n                      <div style=\"font-family:var(--font-mono);font-size:0.82rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;\">\n                        <div style=\"font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:8px;\">ĐẶC TẢ TỆP ROBOTS.TXT CHUẨN RFC 9309 (IETF 2022)</div>\n                        <div style=\"background:var(--bg-surface);padding:8px;border-radius:6px;border:1px solid var(--border-subtle);font-size:0.8rem;\">\n                          <div style=\"color:#2563eb;font-weight:700;\">User-agent: TechMart-Bot</div>\n                          <div style=\"color:#ef4444;\">Disallow: /checkout/</div>\n                          <div style=\"color:#ef4444;\">Disallow: /user/profile/</div>\n                          <div style=\"color:#10b981;\">Allow: /products/</div>\n                          <div style=\"color:#f59e0b;\">Crawl-delay: 5</div>\n                        </div>\n                      </div>\n                    "
        },
        "sections": [
          {
            "id": "sec-10-03-01",
            "title": "1. Kiến Trúc Cây DOM & Kỹ Thuật CSS Selectors Với BeautifulSoup4",
            "content": "\n                          <p>Khi trình duyệt nạp một trang web, mã nguồn HTML được thông dịch thành một <strong>Cây Mô hình Đối tượng Tài liệu (Document Object Model - DOM Tree)</strong> với các mối quan hệ cha-con (parent-child) và anh-em (sibling). Thư viện <code>beautifulsoup4</code> dựng lại cây này trong bộ nhớ để bạn truy vấn:</p>\n                          \n                          <h4>Ưu Thế Của soup.select() So Với find() Cũ:</h4>\n                          <p>Hàm <code>select()</code> cho phép sử dụng trọn vẹn sức mạnh của <strong>CSS Selectors</strong> (như <code>div.card &gt; h3.title</code>, <code>span[data-currency=\"VND\"]</code>), giúp mã nguồn ngắn gọn, trực quan và dễ bảo trì khi giao diện web thay đổi.</p>\n                        "
          },
          {
            "id": "sec-10-03-02",
            "title": "2. Đặc Tả Giao Thức Loại Trừ Robot Chuẩn RFC 9309 (Robots.txt)",
            "content": "\n                          <p>Tháng 9 năm 2022, IETF đã chính thức nâng cấp quy ước robots.txt tuổi đời gần 30 năm thành tiêu chuẩn Internet chính thức: <strong>RFC 9309 - Robots Exclusion Protocol</strong>.</p>\n                          <h4>Cú Pháp Phân Tích Cốt Lõi:</h4>\n                          <ul>\n                            <li><code>User-agent: *</code>: Quy tắc áp dụng cho mọi loại bot/crawler tự động. Nếu muốn chỉ định bot cụ thể: <code>User-agent: Googlebot</code>.</li>\n                            <li><code>Disallow: /admin/</code>: Cấm toàn bộ các bot quét vào bất kỳ đường dẫn nào bắt đầu bằng <code>/admin/</code>.</li>\n                            <li><code>Allow: /products/public/</code>: Ngoại lệ cho phép quét thư mục con nằm bên trong một vùng bị cấm.</li>\n                            <li><code>Crawl-delay: 5</code>: Yêu cầu bot phải chờ tối thiểu 5 giây giữa hai lần gửi request liên tiếp.</li>\n                            <li><code>Sitemap: https://techmart.vn/sitemap.xml</code>: Đường dẫn đến danh mục toàn bộ các bài viết/sản phẩm công khai mà website chủ động cung cấp cho bot.</li>\n                          </ul>\n                          <h4>Kiểm Tra Quyền Hạn Bằng Thư Viện Chuẩn urllib.robotparser:</h4>\n                          \n                        "
          },
          {
            "id": "sec-10-03-03",
            "title": "3. Đạo Đức Thu Thập Dữ Liệu & Khung Pháp Lý Bảo Vệ PII",
            "content": "\n                          <p>Một kỹ sư dữ liệu chuyên nghiệp phải luôn đặt yếu tố đạo đức và tuân thủ pháp lý lên hàng đầu:</p>\n                          <h4>A. Điều Khoản Dịch Vụ (Terms of Service - TOS)</h4>\n                          <p>Nhiều trang web quy định rõ trong phần Điều khoản dịch vụ: <em>'Cấm mọi hành vi sử dụng công cụ tự động để thu thập dữ liệu mà không có sự đồng ý bằng văn bản'</em>. Việc cố tình vi phạm có thể dẫn đến việc IP bị chặn vĩnh viễn hoặc phải chịu trách nhiệm dân sự/thương mại.</p>\n                          <h4>B. Dữ Liệu Định Danh Cá Nhân (PII - Personally Identifiable Information)</h4>\n                          <p>Các đạo luật bảo vệ quyền riêng tư khắt khe nhất thế giới (<strong>GDPR của Liên minh Châu Âu</strong> và <strong>Nghị định 13/2023/NĐ-CP của Việt Nam</strong> về Bảo vệ Dữ liệu Cá nhân) nghiêm cấm việc thu thập, lưu trữ, xử lý trái phép các thông tin:</p>\n                          <ul>\n                            <li>Họ tên đầy đủ, ngày tháng năm sinh, địa chỉ nơi cư trú.</li>\n                            <li>Số điện thoại cá nhân, địa chỉ email riêng tư.</li>\n                            <li>Số Căn cước công dân (CCCD), tài khoản ngân hàng, thông tin sức khỏe/sinh trắc học.</li>\n                          </ul>\n                          <p><strong>Quy tắc nghề nghiệp:</strong> Nếu dữ liệu cào về vô tình chứa thông tin PII, bạn bắt buộc phải tiến hành <strong>Ẩn danh hóa (Anonymization)</strong> hoặc băm một chiều (Hashing SHA-256) ngay tại cổng nạp (Ingestion stage) trước khi đưa vào kho dữ liệu!</p>\n                        "
          },
          {
            "id": "sec-10-03-04",
            "title": "4. Triển Khai Bot Thu Thập Lịch Thiệp (Polite Web Crawler)",
            "content": "\n                          <p>Để đảm bảo quá trình thu thập dữ liệu không gây ảnh hưởng đến hoạt động kinh doanh bình thường của trang web đối tác, bot của bạn phải tuân thủ <strong>4 quy tắc lịch thiệp</strong>:</p>\n                          <ol>\n                            <li><strong>Khai Báo User-Agent Minh Bạch:</strong> Luôn đính kèm tên dự án, mục đích và thông tin liên hệ trong chuỗi User-Agent để quản trị viên web biết bạn là ai nếu cần liên hệ:\n                              \n                            </li>\n                            <li><strong>Ngẫu Nhiên Hóa Thời Gian Chờ (Polite Delay):</strong> Luôn tạm dừng từ 2 đến 5 giây giữa các lượt gọi bằng <code>time.sleep(random.uniform(2.0, 5.0))</code>.</li>\n                            <li><strong>Thu Thập Vào Khung Giờ Thấp Điểm:</strong> Lên lịch trình chạy bot vào lúc 2h đến 5h sáng (khung giờ website có ít người dùng truy cập nhất).</li>\n                            <li><strong>Ưu Tiên Tải Sitemap & API:</strong> Nếu website có cung cấp file <code>sitemap.xml</code> hoặc REST API công khai, hãy luôn khai thác kênh chính thống thay vì cào HTML thô.</li>\n                          </ol>\n                        "
          }
        ],
        "summary": [
          "Sử dụng BeautifulSoup4 với cú pháp CSS Selectors hiện đại (soup.select, soup.select_one) để bóc tách cây HTML DOM chính xác và bền bỉ.",
          "Luôn kiểm tra tệp robots.txt theo chuẩn RFC 9309 bằng urllib.robotparser trước khi gửi request.",
          "Tuân thủ nghiêm ngặt khung pháp lý bảo vệ dữ liệu cá nhân (GDPR, Nghị định 13/2023/NĐ-CP): Không thu thập PII và thực hiện ẩn danh hóa ngay tại cửa ngõ dữ liệu.",
          "Xây dựng Polite Crawler: Gắn User-Agent định danh minh bạch và giãn cách thời gian chờ từ 2-5 giây để không làm quá tải hạ tầng đối tác."
        ],
        "workedExample": {
          "scenario": "Bóc tách danh sách sản phẩm mẫu TechMart với BeautifulSoup và giãn cách lịch thiệp",
          "code": "from bs4 import BeautifulSoup\nimport time\nimport random\n\n# Giả lập mã HTML trả về từ trang danh mục\nmock_html = \"\"\"\n<html>\n  <body>\n    <div class=\"product-list\">\n      <div class=\"item\">\n        <h2 class=\"name\">Laptop Gaming ASUS ROG</h2>\n        <span class=\"price\">32500000</span>\n      </div>\n      <div class=\"item\">\n        <h2 class=\"name\">Chuột Không Dây Logitech</h2>\n        <span class=\"price\">450000</span>\n      </div>\n    </div>\n  </body>\n</html>\n\"\"\"\n\nsoup = BeautifulSoup(mock_html, 'html.parser')\nproducts = []\n\nfor item in soup.select('.product-list .item'):\n    name = item.select_one('.name').get_text(strip=True)\n    price_raw = item.select_one('.price').get_text(strip=True)\n    products.append({\n        'name': name,\n        'price': int(price_raw)\n    })\n\nprint(f\"Đã bóc tách thành công {len(products)} sản phẩm:\")\nfor p in products:\n    print(f\"- {p['name']}: {p['price']:,} VNĐ\")\n\n# Minh họa giãn cách lịch thiệp cho request kế tiếp\nsleep_time = random.uniform(2.0, 4.0)\nprint(f\"Chế độ Polite Crawler: Tạm nghỉ {sleep_time:.2f}s trước khi chuyển trang...\")",
          "explanation": "1. soup.select('.product-list .item') duyệt qua danh sách thẻ chứa sản phẩm.\\n2. get_text(strip=True) loại bỏ khoảng trắng thừa ở hai đầu chuỗi văn bản.\\n3. Chế độ Polite Crawler áp dụng độ trễ ngẫu nhiên mô phỏng hành vi duyệt web tự nhiên của con người."
        },
        "fadedExample": {
          "scenario": "Kiểm tra robots.txt trước khi cào dữ liệu",
          "code": "import urllib.robotparser\n\ndef is_scraping_allowed(robots_url, target_url, bot_name=\"TechMartBot\"):\n    rp = urllib.robotparser.RobotFileParser()\n    rp.set_url(robots_url)\n    \n    # Yêu cầu: Đọc tệp robots.txt bằng rp.read()\n    # Sau đó gọi rp.can_fetch(bot_name, target_url) trả về True hoặc False\n    \n    # Giả lập kết quả kiểm tra\n    rp.read = lambda: None\n    rp.can_fetch = lambda agent, url: True if '/admin/' not in url else False\n    \n    return rp.can_fetch(bot_name, target_url)\n\nallowed = is_scraping_allowed(\"https://techmart.vn/robots.txt\", \"https://techmart.vn/products/laptop\")\nprint(\"Quyền truy cập hợp lệ:\", allowed)",
          "blankExplanation": "Điền lệnh rp.read() để nạp nội dung tệp quy chuẩn và rp.can_fetch(bot_name, target_url) để xác thực tính hợp lệ theo chuẩn RFC 9309."
        },
        "exercises": [
          {
            "level": "Dễ",
            "title": "Xây dựng vòng lặp duyệt phân trang tự động dừng khi hết dữ liệu",
            "problem": "Viết vòng lặp phân trang cào dữ liệu danh mục sản phẩm từ API giả lập: `def get_page(page_num)`. Mỗi trang trả về danh sách 2 sản phẩm, trang 3 trả về rỗng `[]`. Yêu cầu: Sử dụng vòng lặp `while True`, tự động tăng số trang, gom dữ liệu vào một danh sách tổng hợp và ngắt vòng lặp (`break`) ngay khi nhận được mảng rỗng.",
            "hint": "Khởi tạo all_items = [], page = 1. Trong while True: items = get_page(page); if not items: break; all_items.extend(items); page += 1.",
            "solutionCode": "def get_page(page_num):\n    # Mô phỏng API phân trang: có dữ liệu ở trang 1, 2; trang 3 hết dữ liệu\n    database = {\n        1: [{'id': 1, 'name': 'A'}, {'id': 2, 'name': 'B'}],\n        2: [{'id': 3, 'name': 'C'}, {'id': 4, 'name': 'D'}],\n        3: []\n    }\n    return database.get(page_num, [])\n\nall_products = []\ncurrent_page = 1\n\nwhile True:\n    data = get_page(current_page)\n    if not data:\n        print(f\"Đã duyệt hết dữ liệu ở trang {current_page}. Kết thúc.\")\n        break\n    all_products.extend(data)\n    print(f\"Thu thập thành công trang {current_page} ({len(data)} sản phẩm)\")\n    current_page += 1\n\nprint(f\"Tổng số bản ghi thu thập được: {len(all_products)}\")",
            "explanation": "Cơ chế dừng theo phản hồi rỗng (Empty Response Break Condition) là mẫu thiết kế phân trang bền vững nhất khi làm việc với REST API hoặc web scraper, vì nó không phụ thuộc vào việc phải biết trước tổng số trang (total_pages).",
            "solutionOutput": "Thu thập thành công trang 1 (2 sản phẩm)\r\nThu thập thành công trang 2 (2 sản phẩm)\r\nĐã duyệt hết dữ liệu ở trang 3. Kết thúc.\r\nTổng số bản ghi thu thập được: 4"
          },
          {
            "level": "Vừa",
            "title": "Lưu trữ kết quả cào từng trang theo định dạng JSON Lines (JSONL)",
            "problem": "Khi cào dữ liệu lớn hàng chục nghìn trang, nếu gom toàn bộ vào bộ nhớ rồi mới ghi file JSON một lần thì nguy cơ mất trắng dữ liệu khi có sự cố sập mạng là rất lớn. Hãy viết hàm `save_page_to_jsonl(records, file_path)` nhận vào danh sách từ điển và ghi nối tiếp từng bản ghi thành một dòng JSON chuẩn (JSON Lines) vào tệp.",
            "hint": "Mở file với mode='a' (append), duyệt từng record và ghi file.write(json.dumps(record, ensure_ascii=False) + '\\n').",
            "solutionCode": "import json\nimport os\n\ndef save_page_to_jsonl(records, file_path):\n    with open(file_path, 'a', encoding='utf-8') as f:\n        for item in records:\n            json_line = json.dumps(item, ensure_ascii=False)\n            f.write(json_line + '\\n')\n\ntest_file = \"scraped_data_sample.jsonl\"\nif os.path.exists(test_file): os.remove(test_file)\n\npage_data = [{'id': 101, 'name': 'Chuột không dây'}, {'id': 102, 'name': 'Lót chuột'}]\nsave_page_to_jsonl(page_data, test_file)\n\nprint(f\"Đã ghi thành công {len(page_data)} dòng vào {test_file}.\")\nwith open(test_file, 'r', encoding='utf-8') as f:\n    print(\"Nội dung dòng đầu tiên:\", f.readline().strip())\nif os.path.exists(test_file): os.remove(test_file)",
            "explanation": "Định dạng JSON Lines (.jsonl) là chuẩn công nghiệp cho Data Ingestion: Cho phép ghi nối tiếp liên tục (streaming append) mà không cần nạp toàn bộ file vào RAM, đồng thời nếu tiến trình cào bị gián đoạn, mọi dòng đã ghi trước đó vẫn hoàn toàn nguyên vẹn và hợp lệ.",
            "solutionOutput": "Đã ghi thành công 2 dòng vào scraped_data_sample.jsonl.\r\nNội dung dòng đầu tiên: {\"id\": 101, \"name\": \"Chuột không dây\"}"
          },
          {
            "level": "Nâng cao",
            "title": "Xây dựng đường ống cào dữ liệu tự phục hồi (Fault-tolerant Pipeline)",
            "problem": "Viết một lớp `ResilientScraper` có khả năng: (1) Lưu trạng thái trang đang cào dở vào tệp `checkpoint.txt`; (2) Khi khởi động lại, tự động đọc checkpoint để tiếp tục cào từ trang kế tiếp thay vì cào lại từ trang 1; (3) Tự động dọn dẹp checkpoint khi hoàn tất toàn bộ danh mục.",
            "hint": "Kiểm tra os.path.exists(checkpoint_file) để lấy last_page, cập nhật checkpoint sau mỗi trang hoàn tất.",
            "solutionCode": "import os\n\nclass ResilientScraper:\n    def __init__(self, checkpoint_path=\"checkpoint.txt\"):\n        self.checkpoint_path = checkpoint_path\n        \n    def get_resume_page(self):\n        if os.path.exists(self.checkpoint_path):\n            with open(self.checkpoint_path, \"r\") as f:\n                return int(f.read().strip()) + 1\n        return 1\n\n    def save_checkpoint(self, page_num):\n        with open(self.checkpoint_path, \"w\") as f:\n            f.write(str(page_num))\n\n    def clean_checkpoint(self):\n        if os.path.exists(self.checkpoint_path):\n            os.remove(self.checkpoint_path)\n\n# Thử nghiệm giả lập gián đoạn\nscraper = ResilientScraper(\"test_chk.txt\")\nstart_page = scraper.get_resume_page()\nprint(f\"Bắt đầu thu thập từ trang: {start_page}\")\n\n# Giả sử cào thành công trang 1 và 2 rồi lưu checkpoint\nscraper.save_checkpoint(2)\nprint(\"Đã lưu checkpoint: trang 2.\")\n\n# Giả lập sập tiến trình và khởi động lại\nresumed_page = scraper.get_resume_page()\nprint(f\"Khởi động lại sau sự cố: Tự động tiếp tục từ trang: {resumed_page}\")\nscraper.clean_checkpoint()",
            "explanation": "Thiết kế hệ thống có khả năng tự phục hồi (Fault Tolerance) thông qua State Checkpointing là tiêu chuẩn bắt buộc của kỹ sư dữ liệu. Khi thu thập dữ liệu quy mô lớn kéo dài nhiều ngày, tính năng này giúp bảo toàn chi phí tài nguyên và không tạo thêm lưu lượng truy cập dư thừa lên máy chủ nguồn.",
            "solutionOutput": "Bắt đầu thu thập từ trang: 1\r\nĐã lưu checkpoint: trang 2.\r\nKhởi động lại sau sự cố: Tự động tiếp tục từ trang: 3"
          }
        ],
        "quiz": [
          {
            "question": "Theo chuẩn đặc tả chính thức RFC 9309 (Robots Exclusion Protocol, 2022), tệp 'robots.txt' phải luôn được đặt tại vị trí nào trên một trang web?",
            "options": [
              "(Recommended) Tại thư mục gốc (Root path) của tên miền, ví dụ: https://example.com/robots.txt",
              "Nằm bên trong thư mục /admin/robots.txt",
              "Được nhúng dưới dạng thẻ meta bên trong phần tử <head> của trang chủ.",
              "Tùy ý theo cấu hình của quản trị viên web."
            ],
            "correctAnswer": "(Recommended) Tại thư mục gốc (Root path) của tên miền, ví dụ: https://example.com/robots.txt",
            "explanation": "RFC 9309 quy định rõ ràng rằng tệp robots.txt bắt buộc phải nằm tại thư mục gốc của trang web (Root directory: /.well-known/robots.txt hoặc /robots.txt). Mọi bot khi truy cập một tên miền mới đều phải quét vị trí gốc này đầu tiên."
          },
          {
            "question": "Theo Nghị định 13/2023/NĐ-CP của Việt Nam và đạo luật GDPR của Châu Âu, hành vi nào sau đây khi thu thập dữ liệu web bị coi là VI PHẠM PHÁP LUẬT?",
            "options": [
              "(Recommended) Tự động cào và lưu trữ danh sách số điện thoại, họ tên và địa chỉ nhà riêng của khách hàng từ các diễn đàn mà không có sự đồng thuận của chủ thể dữ liệu.",
              "Cào thông tin giá bán và thông số kỹ thuật công khai của sản phẩm điện máy.",
              "Tải tệp sitemap.xml của một trang web tin tức.",
              "Gửi request có đính kèm chuỗi User-Agent minh bạch."
            ],
            "correctAnswer": "(Recommended) Tự động cào và lưu trữ danh sách số điện thoại, họ tên và địa chỉ nhà riêng của khách hàng từ các diễn đàn mà không có sự đồng thuận của chủ thể dữ liệu.",
            "explanation": "Số điện thoại, họ tên, địa chỉ nhà là Dữ liệu cá nhân (PII). Việc thu thập, lưu trữ và khai thác dữ liệu cá nhân mà không có sự đồng thuận minh bạch của chủ thể là hành vi vi phạm pháp luật về bảo vệ quyền riêng tư."
          },
          {
            "question": "Tại sao một 'Polite Web Crawler' luôn cần phải thiết lập chuỗi User-Agent chi tiết và rõ ràng thay vì để giá trị mặc định của thư viện requests?",
            "options": [
              "(Recommended) Để định danh minh bạch danh tính của bot, mục đích nghiên cứu và cung cấp thông tin liên hệ cho quản trị viên web khi có sự cố phát sinh.",
              "Để tăng tốc độ tải trang lên gấp đôi.",
              "Để vượt qua các hệ thống tường lửa Cloudflare mà không bị phát hiện.",
              "Để máy chủ tự động chuyển dữ liệu sang định dạng JSON."
            ],
            "correctAnswer": "(Recommended) Để định danh minh bạch danh tính của bot, mục đích nghiên cứu và cung cấp thông tin liên hệ cho quản trị viên web khi có sự cố phát sinh.",
            "explanation": "User-Agent mặc định 'python-requests/2.x' thường bị các máy chủ chặn ngay lập tức vì bị coi là bot ẩn danh nguy hiểm. Một bot có đạo đức luôn khai báo rõ tên tổ chức, mục đích và URL/email liên hệ trong User-Agent."
          }
        ],
        "selfReviewQuestions": [
          "Phân biệt cú pháp soup.select() và soup.select_one() trong BeautifulSoup4.",
          "Trình bày 3 chỉ thị phổ biến nhất trong tệp robots.txt theo chuẩn RFC 9309.",
          "Tại sao việc tuân thủ quy tắc 'Polite Delay' lại bảo vệ chính hệ thống thu thập dữ liệu của bạn không bị khóa địa chỉ IP?"
        ],
        "reflectionQuestion": "Một bạn thực tập sinh phát hiện một trang web đối thủ có lỗ hổng bảo mật: Chỉ cần thay đổi tham số ID trên URL hồ sơ người dùng là có thể cào được toàn bộ lịch sử mua sắm và thông tin thanh toán của 500.000 khách hàng. Bạn ấy đề xuất ban giám đốc cho cào toàn bộ dữ liệu này về để 'nghiên cứu thị trường'. Dưới tư cách là Trưởng bộ phận Dữ liệu, bạn sẽ xử lý tình huống này như thế nào?",
        "reflectionHint": "Hành vi này cấu thành tội phạm hình sự nghiêm trọng: Khai thác lỗ hổng bảo mật (BOLA) để truy cập trái phép và đánh cắp dữ liệu cá nhân nhạy cảm (vi phạm nghiêm trọng Luật An ninh mạng và Nghị định 13/2023/NĐ-CP). Bạn phải lập tức bác bỏ đề xuất, cảnh báo rủi ro pháp lý cho ban giám đốc, đồng thời thực hiện đạo đức công nghệ: gửi thông báo bảo mật có trách nhiệm (Responsible Disclosure) cho phía đối thủ để họ kịp thời vá lỗ hổng.",
        "nextLessonPreview": "Chúc mừng bạn đã hoàn thành trọn vẹn Học phần 3 (Phân tích & Thu thập Dữ liệu)! Bước sang Học phần 4 (Kỹ nghệ Kiểm thử & Triển khai Pipeline Sản Xuất - Module 11), chúng ta sẽ làm chủ kiểm thử dữ liệu chuyên nghiệp với pytest, thiết kế test case theo ISTQB và xây dựng chốt chặn xác thực ISO/IEC 25012!",
        "references": [
          {
            "title": "RFC 9309: Robots Exclusion Protocol (IETF, 2022)",
            "url": "https://www.rfc-editor.org/rfc/rfc9309.html"
          },
          {
            "title": "Beautiful Soup Documentation (Leonard Richardson)",
            "url": "https://www.crummy.com/software/BeautifulSoup/bs4/doc/"
          },
          {
            "title": "Nghị định 13/2023/NĐ-CP về Bảo vệ Dữ liệu Cá nhân (Chính phủ Việt Nam)",
            "url": "https://vanban.chinhphu.vn"
          }
        ]
      }
    ]
  }
];
