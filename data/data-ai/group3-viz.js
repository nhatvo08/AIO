/**
 * Nhóm 3: Trực quan hóa Dữ liệu (Matplotlib, Seaborn, Plotly & Bokeh)
 * Tác giả: Senior Data & ML Engineer
 */

window.DATA_AI_GROUP3_DATA = {
  id: 'course-group-viz',
  number: 'Nhóm 3',
  title: 'Trực quan hóa Dữ liệu',
  badge: 'Matplotlib, Seaborn & Plotly',
  icon: '📊',
  customClass: 'data-ai-banner',
  desc: 'Từ giải phẫu kiến trúc Artist OOP của Matplotlib, trực quan hóa thống kê Seaborn đến biểu đồ tương tác cao cấp Plotly & Bokeh.',
  parts: [
    {
      id: 'part-ai-matplotlib',
      number: 'Phần 5',
      title: 'Matplotlib: Nền tảng Đồ họa & Kiến trúc OOP',
      level: 'Cơ bản đến Chuyên sâu',
      badge: '5 Bài học',
      icon: '📉',
      description: 'Chấm dứt việc vẽ mò: làm chủ phân cấp Figure -> Axes -> Artist, giao diện hướng đối tượng OOP, GridSpec, hệ tọa độ Transforms và xuất ảnh chất lượng xuất bản khoa học.',
      lessons: [
        {
          id: 'ai-mpl-01',
          number: '5.1',
          title: 'Giải phẫu Kiến trúc Matplotlib: Figure, Axes & Phân cấp Artist',
          subtitle: 'Hiểu cặn kẽ vì sao hiểu OOP chấm dứt việc "vẽ mò": Phân biệt rạch ròi pyplot state-machine vs Object-Oriented API',
          level: 'Cơ bản',
          duration: '35 phút',
          objectives: [
            'Hiểu cấu trúc phân cấp hình học 3 tầng: Figure (khung tranh) -> Axes (hệ tọa độ đồ thị) -> Artist (tất cả những gì vẽ được).',
            'Phân biệt tuyệt đối giữa giao diện máy trạng thái ngầm định (pyplot plt.plot) và giao diện hướng đối tượng (fig, ax = plt.subplots).',
            'Biết chính xác từng thành phần: Spines, Ticks, Tick Labels, Axis Labels, Title, Legend.',
            'Tự tin kiểm soát mọi tọa độ trên đồ thị mà không bao giờ bị vẽ đè nhầm trục.'
          ],
          intuition: {
            title: 'Khung tranh, Tờ giấy vẽ và Người họa sĩ',
            metaphor: 'Hãy tưởng tượng bạn đang ở trong một phòng tranh. Figure giống như chiếc giá đỡ tranh bằng gỗ lớn (toàn bộ cửa sổ hiển thị). Trên chiếc giá đỡ đó, bạn có thể dán 1, 2 hoặc 4 tờ giấy vẽ (mỗi tờ giấy có kẻ sẵn trục tọa độ x-y chính là một Axes). Còn Artist là tất cả những gì người họa sĩ dùng cọ vẽ lên tờ giấy đó: từng nét mực (Line2D), từng chấm màu (Scatter/Patch), dòng chữ tiêu đề (Text), chiếc thước đo (Axis Ticks), và khung chú giải (Legend). Nếu bạn dùng plt.plot(), bạn giống như người vẽ tranh trong bóng tối: cọ vẽ cứ quệt vào tờ giấy nào đang mở sẵn gần nhất (dễ vẽ đè sai chỗ). Khi dùng fig, ax = plt.subplots(), bạn cầm chắc từng tờ giấy ax trong tay và vẽ chính xác từng nét!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🎨 Giải phẫu Kiến trúc Phân cấp Matplotlib</div>
                <div style="background:var(--bg-surface);border:2px dashed var(--topic-data);padding:14px;border-radius:6px;">
                  <div style="font-weight:700;color:var(--topic-data);margin-bottom:8px;">FIGURE (Khung tranh tổng thể - fig)</div>
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <div style="background:var(--bg-surface-alt);border:2px solid #0ea5e9;padding:10px;border-radius:4px;">
                      <div style="font-weight:700;color:#0ea5e9;">AXES 1 (ax1 - Hệ tọa độ đồ thị 1)</div>
                      <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">
                        • Title, XLabel, YLabel<br>
                        • Spines (4 đường viền khung)<br>
                        • Ticks &amp; TickLabels<br>
                        • <strong>Artist:</strong> Line2D, Bar, Scatter
                      </div>
                    </div>
                    <div style="background:var(--bg-surface-alt);border:2px solid #8b5cf6;padding:10px;border-radius:4px;">
                      <div style="font-weight:700;color:#8b5cf6;">AXES 2 (ax2 - Hệ tọa độ đồ thị 2)</div>
                      <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">
                        • Hệ tọa độ độc lập hoàn toàn<br>
                        • Có thể có giới hạn xlim, ylim riêng<br>
                        • <strong>Artist:</strong> Histogram, Text, Legend
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-mpl-oop-vs-pyplot',
              title: '1. Tại sao phải Dùng Giao diện Hướng đối tượng (OOP API)?',
              content: `
                <p>Trong các hướng dẫn cũ, người ta hay viết: <code>plt.plot(x, y); plt.title('...'); plt.show()</code>. Đây là phong cách mượn từ MATLAB (State-based machine). Trình thông dịch ngầm duy trì một "con trỏ hiện tại".</p>
                <p>Nhược điểm chí mạng của pyplot: Khi bạn cần vẽ từ 2 đồ thị con trở lên (subplots), việc gọi <code>plt.title()</code> hay <code>plt.xlabel()</code> rất dễ áp nhầm vào đồ thị con khác. Trong khi đó, phong cách OOP tường minh 100%:</p>
                <pre style="background:var(--bg-code);color:var(--text-inverse);padding:10px;border-radius:4px;font-family:var(--font-mono);font-size:0.85rem;"><code>fig, ax = plt.subplots()  # fig là khung tranh, ax là hệ tọa độ
ax.plot(x, y)             # Vẽ lên đúng ax
ax.set_title('...')       # Đặt tiêu đề cho đúng ax
ax.set_xlabel('...')      # Đặt nhãn cho đúng ax</code></pre>
              `,
              codeExamples: [
                {
                  title: 'So sánh trực tiếp phong cách OOP chuẩn mực trên 2 đồ thị con',
                  lang: 'Python',
                  code: `import numpy as np
import matplotlib.pyplot as plt

# Tạo dữ liệu sóng sin và cosin
x = np.linspace(0, 2 * np.pi, 100)
y_sin = np.sin(x)
y_cos = np.cos(x)

# 1. Khởi tạo Figure và 2 Axes nằm ngang (1 hàng, 2 cột)
fig, (ax1, ax2) = plt.subplots(nrows=1, ncols=2, figsize=(10, 4), dpi=100)

# 2. Thao tác trên ax1
ax1.plot(x, y_sin, color='#059669', linewidth=2, label='sin(x)')
ax1.set_title('Đồ thị Sóng Sin')
ax1.set_xlabel('Góc (rad)')
ax1.set_ylabel('Biên độ')
ax1.grid(True, linestyle='--', alpha=0.6)
ax1.legend()

# 3. Thao tác trên ax2
ax2.plot(x, y_cos, color='#0ea5e9', linewidth=2, linestyle='-.', label='cos(x)')
ax2.set_title('Đồ thị Sóng Cosin')
ax2.set_xlabel('Góc (rad)')
ax2.grid(True, linestyle=':', alpha=0.6)
ax2.legend()

# Tinh chỉnh khoảng cách giữa các đồ thị con
fig.tight_layout()
print("Figure và 2 Axes đã được tạo lập thành công theo chuẩn OOP!")`,
                  output: `Figure và 2 Axes đã được tạo lập thành công theo chuẩn OOP!`,
                  annotations: [
                    { line: 10, text: 'plt.subplots(1, 2) trả về tuple (fig, (ax1, ax2)) tường minh.' },
                    { line: 13, text: 'Mọi tùy biến thực hiện trực tiếp trên từng ax riêng biệt, không lo bị nhầm lẫn.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-mpl-artists-hierarchy',
              title: '2. Phân cấp Artist: Spines, Ticks và Tùy biến Chi tiết',
              content: `
                <p>Mọi đối tượng nhìn thấy được trên màn hình đều là con cháu của lớp <code>matplotlib.artist.Artist</code>. Phân cấp cốt lõi:</p>
                <ul>
                  <li><code>ax.spines</code>: 4 đường biên bao quanh đồ thị (<code>'top'</code>, <code>'bottom'</code>, <code>'left'</code>, <code>'right'</code>). Bạn có thể ẩn đường biên trên và phải bằng <code>ax.spines['top'].set_visible(False)</code> để đồ thị thoáng đãng và hiện đại như tạp chí Nature/Economist.</li>
                  <li><code>ax.xaxis</code> &amp; <code>ax.yaxis</code>: Chứa các <code>Tick</code> (vạch chia) và <code>TickLabel</code> (chữ số nhãn).</li>
                  <li><code>ax.annotate()</code>: Đặt mũi tên và chú thích chỉ điểm vào một tọa độ dữ liệu quan trọng.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Tùy biến Spines và Thêm Chú thích Mũi tên (Annotation)',
                  lang: 'Python',
                  code: `import numpy as np
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(6, 4))
x = np.linspace(-3, 3, 100)
y = x**2

ax.plot(x, y, color='#2563eb', lw=2)

# 1. Ẩn 2 đường viền trên và phải
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

# 2. Thêm mũi tên chú thích chỉ vào điểm đáy cực tiểu (0, 0)
ax.annotate('Đáy Parabol (0, 0)', 
            xy=(0, 0), 
            xytext=(0.5, 3),
            arrowprops=dict(facecolor='#ef4444', shrink=0.08, width=1.5, headwidth=6),
            fontweight='bold', color='#ef4444')

ax.set_title('Tùy biến Spines & Chú thích Mũi tên Chuyên nghiệp')
print("Hoàn tất tùy biến Artist Spines và Annotations!")`,
                  output: `Hoàn tất tùy biến Artist Spines và Annotations!`,
                  annotations: [
                    { line: 11, text: 'set_visible(False) loại bỏ rác thị giác giúp biểu đồ tinh tế, sang trọng.' },
                    { line: 15, text: 'xy là tọa độ mục tiêu cần chỉ; xytext là vị trí đặt dòng chữ giải thích.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-mpl-rendering-backends',
              title: '3. Các Bộ dựng Hình (Rendering Backends): Non-interactive (Agg) vs GUI Interactive',
              content: `
                <p>Một câu hỏi kiến trúc cốt tử: Khi bạn gõ <code>ax.plot(...)</code>, điều gì thực sự biến các phép toán số học thành từng điểm ảnh trên màn hình hoặc tệp hình ảnh PNG? Đó chính là <strong>Backend (Bộ dựng hình)</strong> của Matplotlib.</p>
                <p>Matplotlib tách đôi rạch ròi giữa <em>Frontend</em> (giao diện Python bạn viết) và <em>Backend</em> (động cơ vẽ phần cứng):</p>
                <ul>
                  <li><strong>Non-interactive Backends (Dựng hình tệp / Hardcopy):</strong>
                    <ul>
                      <li><code>Agg</code> (Anti-Grain Geometry): Động cơ vẽ ảnh raster chất lượng cao nhất cho tệp PNG. Hoạt động hoàn toàn không cần màn hình hiển thị (headless mode).</li>
                      <li><code>PDF</code>, <code>SVG</code>, <code>PS</code>: Bộ dựng hình vector phục vụ xuất bản in ấn độ nét vô hạn.</li>
                      <li><strong>Chuẩn mực Server &amp; Docker:</strong> Trên các máy chủ Linux, container Docker hoặc quy trình CI/CD không có giao diện đồ họa X11, gọi <code>plt.show()</code> sẽ gây lỗi sập <code>_tkinter.TclError: no display name</code>. Giải pháp bắt buộc: khai báo <code>matplotlib.use('Agg')</code> ngay trước khi import <code>pyplot</code>!</li>
                    </ul>
                  </li>
                  <li><strong>Interactive Backends (Giao diện người dùng GUI):</strong>
                    <ul>
                      <li><code>TkAgg</code>, <code>QtAgg</code> (PyQt/PySide), <code>GTK4Agg</code>: Tích hợp vòng lặp sự kiện (event loop) để hiển thị cửa sổ đồ thị có các nút Zoom, Pan, Save.</li>
                      <li><code>ipympl</code> (Widget) &amp; <code>inline</code>: Bộ dựng hình nhúng chuyên dụng trong Jupyter Notebook / Lab.</li>
                    </ul>
                  </li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Cấu hình Headless Backend "Agg" và Xuất bản tệp không cần GUI',
                  lang: 'Python',
                  code: `import matplotlib
# Thiết lập backend "Agg" trước khi import pyplot (chuẩn headless server / Docker)
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

print("Backend hiện tại:", matplotlib.get_backend())
print("Chế độ tương tác GUI (is_interactive):", matplotlib.is_interactive())

# Tạo đồ thị phân tích trên môi trường server
fig, ax = plt.subplots(figsize=(6, 3.5), dpi=100)
x = np.linspace(0, 10, 100)
ax.plot(x, np.sin(x) * np.exp(-x / 4), color='#059669', lw=2)
ax.set(title='Đồ thị Tắt dần (Xuất bản qua Backend Agg)', xlabel='Thời gian (s)', ylabel='Biên độ')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

# Lưu tệp raster PNG tối ưu hóa
fig.savefig('server_output.png', bbox_inches='tight')
import os
print("Kích thước tệp PNG đã tạo:", os.path.getsize('server_output.png'), "bytes")
os.remove('server_output.png')`,
                  output: `Backend hiện tại: Agg
Chế độ tương tác GUI (is_interactive): False
Kích thước tệp PNG đã tạo: 23989 bytes`,
                  annotations: [
                    { line: 3, text: 'matplotlib.use("Agg") chuyển sang chế độ headless, vô hiệu hóa hoàn toàn yêu cầu màn hình GUI.' },
                    { line: 6, text: 'get_backend() xác nhận động cơ dựng hình Anti-Grain Geometry đang hoạt động.' },
                    { line: 18, text: 'bbox_inches="tight" tự động cắt bỏ khoảng trắng thừa bao quanh đồ thị.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Nhầm lẫn set_xlabel với plt.xlabel',
                content: 'Khi chuyển từ pyplot sang OOP: hàm plt.xlabel() chuyển thành ax.set_xlabel(); plt.title() chuyển thành ax.set_title(); plt.xlim() chuyển thành ax.set_xlim(). Mẹo nhớ: Trong OOP, mọi hàm cài đặt đều có tiền tố ax.set_...!'
              }
            ],
            tips: [
              {
                title: 'Dùng ax.set(...) để thiết lập nhanh nhiều thuộc tính',
                content: 'Thay vì viết 4 dòng: ax.set_title(\"...\"); ax.set_xlabel(\"...\"); ax.set_ylabel(\"...\"); ax.set_xlim(...), bạn có thể gộp trong 1 dòng duy nhất: ax.set(title=\"...\", xlabel=\"...\", ylabel=\"...\", xlim=(0, 10)).'
              }
            ]
          },
          exercises: [
            {
              level: 'Cơ bản',
              title: 'Tạo Lưới 2x2 Subplots và Thiết lập Tiêu đề Chung',
              problem: 'Viết code khởi tạo lưới 2 hàng, 2 cột đồ thị (4 Axes con) bằng plt.subplots(2, 2). Hãy đặt tiêu đề chung cho toàn bộ Figure bằng fig.suptitle() và đặt tiêu đề riêng cho từng ô ax[i, j].',
              hint: 'fig.suptitle(\"...\") đặt tiêu đề cấp Figure; ax[i, j].set_title(\"...\") đặt cho từng ô.',
              solutionCode: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, figsize=(8, 6))

# Tiêu đề chung cấp Figure
fig.suptitle('BÁO CÁO TỔNG QUAN 4 CHỈ SỐ', fontsize=14, fontweight='bold')

titles = [['Doanh thu', 'Chi phí'], ['Lợi nhuận', 'Tăng trưởng']]
for i in range(2):
    for j in range(2):
        axes[i, j].set_title(titles[i][j])
        axes[i, j].grid(True, alpha=0.3)

fig.tight_layout()
print("Lưới 2x2 đã sẵn sàng!")`,
              solutionOutput: `Lưới 2x2 đã sẵn sàng!`,
              explanation: 'axes trả về mảng 2D NumPy chứa 4 đối tượng Axes. Bạn có thể duyệt vòng lặp qua mảng này để tự động hóa định dạng hàng loạt.',
              annotations: [
                { line: 6, text: 'fig.suptitle là tiêu đề lớn bao quát toàn bộ khung tranh.' }
              ]
            }
          ],
          summary: [
            'Figure là khung tranh tổng thể; Axes là hệ tọa độ đồ thị; Artist là mọi chi tiết vẽ được.',
            'Luôn dùng giao diện OOP (fig, ax = plt.subplots) thay cho pyplot máy trạng thái cũ.',
            'Trong OOP, các hàm cài đặt luôn có dạng ax.set_title, ax.set_xlabel, ax.set_xlim.',
            'Tùy biến spines và annotation giúp biểu đồ đạt đẳng cấp xuất bản báo cáo quốc tế.'
          ]
        },
        {
          id: 'ai-mpl-02',
          number: '5.2',
          title: 'Các Loại Biểu đồ Cơ bản & Nguyên tắc Lựa chọn Biểu đồ Chuẩn xác',
          subtitle: 'Line, Scatter, Bar, Histogram, Boxplot, và khi nào TUYỆT ĐỐI KHÔNG NÊN dùng biểu đồ tròn (Pie chart)',
          level: 'Cơ bản',
          duration: '40 phút',
          objectives: [
            'Nắm vững 5 loại biểu đồ cơ bản và bài toán nghiệp vụ tương ứng của từng loại.',
            'Hiểu lý do khoa học thị giác vì sao biểu đồ tròn (Pie chart) bị cấm trong phân tích dữ liệu chuyên nghiệp.',
            'Thành thạo trực quan hóa phân phối dữ liệu với Histogram và Boxplot (5 số tóm tắt Tuckey).',
            'Tùy biến bảng màu, marker, kiểu đường và thanh sai số (Error bars).'
          ],
          intuition: {
            title: 'Chọn đúng loại kính ngắm quang học',
            metaphor: 'Một người thợ săn không thể dùng kính lúp để ngắm bắn mục tiêu ở khoảng cách 1 cây số. Trong trực quan hóa dữ liệu cũng vậy: Biểu đồ đường (Line) là ống nhòm theo dõi chuyển động thời gian; Biểu đồ phân tán (Scatter) là kính hiển vi tìm kiếm mối tương quan giữa 2 đại lượng; Biểu đồ cột (Bar) là chiếc cân so sánh trọng lượng giữa các đối tượng độc lập; còn Boxplot là chiếc máy chụp X-quang soi thấu độ lệch và các khối u ngoại lai (outliers) của phân phối dữ liệu. Dùng sai biểu đồ sẽ khiến người xem hiểu lệch lạc hoàn toàn thông điệp của dữ liệu.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🧭 Cẩm nang Chọn Loại Biểu đồ Đúng Ngữ cảnh</div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:8px;font-size:0.82rem;">
                  <div style="background:var(--bg-surface);padding:8px;border-radius:4px;border:1px solid var(--border-subtle);">
                    <strong>1. Xu hướng theo Thời gian:</strong><br>
                    ➔ <strong>Line Chart</strong> (<code>ax.plot</code>). Không dùng Bar chart nếu có quá nhiều mốc ngày.
                  </div>
                  <div style="background:var(--bg-surface);padding:8px;border-radius:4px;border:1px solid var(--border-subtle);">
                    <strong>2. So sánh giữa các Nhóm:</strong><br>
                    ➔ <strong>Bar Chart</strong> (<code>ax.bar</code> / <code>ax.barh</code>). Cột ngang khi tên nhóm dài.
                  </div>
                  <div style="background:var(--bg-surface);padding:8px;border-radius:4px;border:1px solid var(--border-subtle);">
                    <strong>3. Mối Tương quan 2 Biến:</strong><br>
                    ➔ <strong>Scatter Plot</strong> (<code>ax.scatter</code>). Kết hợp kích thước/màu sắc cho biến thứ 3.
                  </div>
                  <div style="background:var(--bg-surface);padding:8px;border-radius:4px;border:1px solid var(--border-subtle);">
                    <strong>4. Hình dạng Phân phối:</strong><br>
                    ➔ <strong>Histogram &amp; Boxplot</strong> (<code>ax.hist</code>, <code>ax.boxplot</code>). Phát hiện outlier.
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-mpl-chart-types',
              title: '1. Thực hành 4 Loại Biểu đồ Trụ cột',
              content: `
                <p><strong>Tại sao KHÔNG NÊN dùng biểu đồ tròn (Pie Chart)?</strong> Não bộ con người rất kém trong việc so sánh độ mở góc và diện tích hình quạt, nhưng lại cực kỳ nhạy bén trong việc so sánh chiều cao của các thanh thẳng đứng. Một biểu đồ cột luôn truyền tải thông điệp chính xác và trung thực hơn biểu đồ tròn gấp nhiều lần.</p>
              `,
              codeExamples: [
                {
                  title: 'Vẽ Bar chart ngang, Histogram và Boxplot chuẩn mực',
                  lang: 'Python',
                  code: `import numpy as np
import matplotlib.pyplot as plt

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4.5))

# 1. Bar chart ngang (ax.barh) cho danh mục có tên dài
categories = ['Kỹ thuật Phần mềm', 'Khoa học Dữ liệu', 'An toàn Thông tin', 'Quản trị Mạng']
values = [85, 92, 78, 65]
colors = ['#10b981' if v == max(values) else '#94a3b8' for v in values] # Làm nổi bật giá trị lớn nhất

ax1.barh(categories, values, color=colors, height=0.55)
ax1.set_title('Nhu cầu Tuyển dụng (Top 1 nổi bật)', fontweight='bold')
ax1.set_xlabel('Chỉ số Nhu cầu (%)')
ax1.spines['top'].set_visible(False)
ax1.spines['right'].set_visible(False)

# 2. Boxplot (ax.boxplot) hiển thị 5 số tóm tắt Tuckey và Outliers
rng = np.random.default_rng(42)
group_A = rng.normal(100, 15, size=80)
group_B = np.append(rng.normal(120, 20, size=75), [185, 190]) # Có 2 outliers lớn

ax2.boxplot([group_A, group_B], tick_labels=['Nhóm A', 'Nhóm B'], patch_artist=True,
            boxprops=dict(facecolor='#dbeafe', color='#2563eb'),
            medianprops=dict(color='#dc2626', linewidth=2),
            flierprops=dict(marker='o', markerfacecolor='#ef4444', markersize=6))
ax2.set_title('So sánh Phân phối & Ngoại lai (Boxplot)', fontweight='bold')
ax2.set_ylabel('Giá trị Đo lường')
ax2.grid(True, axis='y', linestyle='--', alpha=0.5)

fig.tight_layout()
print("Biểu đồ Barh và Boxplot đã hoàn tất đạt chuẩn thẩm mỹ cao!")`,
                  output: `Biểu đồ Barh và Boxplot đã hoàn tất đạt chuẩn thẩm mỹ cao!`,
                  annotations: [
                    { line: 9, text: 'Tô màu khác biệt cho cột cao nhất giúp người xem nắm bắt ngay lập tức thông tin chính.' },
                    { line: 18, text: 'flierprops định dạng các điểm ngoại lai (outliers) màu đỏ nổi bật.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Trục Y không bắt đầu từ 0 trong biểu đồ cột (Truncated Axis)',
                content: 'Cắt cụt trục Y (ví dụ bắt đầu từ 95 thay vì 0 trong biểu đồ cột) là một thủ thuật bóp méo thị giác gây hiểu nhầm (khiến mức chênh lệch 1% trông như gấp 10 lần). Với Bar chart, trục giá trị BẮT BUỘC phải bắt đầu từ 0!'
              }
            ],
            tips: [
              {
                title: 'Dùng ax.bar_label() để hiện số trực tiếp trên cột',
                content: 'Từ Matplotlib 3.4+, bạn có thể viết: container = ax.bar(...); ax.bar_label(container, fmt=\"%.1f\") để tự động in số liệu lên đỉnh các cột mà không cần gõ hàm ax.text() thủ công.'
              }
            ]
          },
          exercises: [
            {
              level: 'Cơ bản',
              title: 'In Số liệu Trực tiếp lên Đỉnh Cột với bar_label',
              problem: 'Cho danh sách doanh số 3 quý: Q1=120, Q2=150, Q3=190. Hãy vẽ biểu đồ cột và dùng hàm ax.bar_label() để hiển thị nhãn số tiền lên đỉnh mỗi cột kèm đệm padding=3.',
              hint: 'rects = ax.bar(x, y); ax.bar_label(rects, padding=3).',
              solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(5, 4))
quarters = ['Quý 1', 'Quý 2', 'Quý 3']
revenue = [120, 150, 190]

bars = ax.bar(quarters, revenue, color='#059669', width=0.5)
ax.bar_label(bars, padding=3, fontweight='bold')
ax.set_ylim(0, 220) # Mở rộng trần để nhãn không bị chạm viền
ax.set_title('Doanh thu qua các Quý (Triệu VNĐ)')

print("Đã gắn nhãn tự động lên đỉnh cột!")`,
              solutionOutput: `Đã gắn nhãn tự động lên đỉnh cột!`,
              explanation: 'ax.bar_label giúp người đọc không cần phải gióng mắt sang trục Y bên trái để đọc số liệu, nâng cao trải nghiệm người xem.',
              annotations: [
                { line: 8, text: 'bar_label tự động căn giữa chữ số trên từng cột.' }
              ]
            }
          ],
          summary: [
            'Chọn biểu đồ đúng mục tiêu: Line cho xu hướng, Bar cho so sánh, Scatter cho tương quan, Boxplot cho phân phối.',
            'Tuyệt đối tránh Pie Chart vì mắt người ước lượng góc và diện tích hình quạt rất kém.',
            'Trục đo của biểu đồ cột bắt buộc phải bắt đầu từ số 0 để tránh bóp méo thông tin.',
            'Tận dụng ax.bar_label() để hiển thị số liệu trực tiếp lên cột chuyên nghiệp.'
          ]
        },
        {
          id: 'ai-mpl-03',
          number: '5.3',
          title: 'Bố cục Đa trục Phức hợp: Subplots, GridSpec, Inset Axes & Trục Phụ Đôi (twinx)',
          subtitle: 'Làm chủ bố cục bất đối xứng với GridSpec, đồ thị con lồng ghép và trục tung kép với ax.twinx()',
          level: 'Trung cấp',
          duration: '40 phút',
          objectives: [
            'Sử dụng GridSpec để tạo các bố cục bất đối xứng (ví dụ 1 ô lớn bên trái, 2 ô nhỏ bên phải).',
            'Tạo biểu đồ trục tung kép (Dual Y-Axis) bằng ax.twinx() để so sánh 2 đại lượng khác thang đo.',
            'Lồng ghép đồ thị con phóng to (Inset Axes) bằng ax.inset_axes().',
            'Quản lý Colormap và hiển thị thang đo màu (Colorbar) chính xác.'
          ],
          intuition: {
            title: 'Dàn trang báo chí chuyên nghiệp và Kính lúp phóng to',
            metaphor: 'Nếu plt.subplots(2, 2) giống như chia bàn cờ thành 4 ô vuông bằng nhau chằn chặn, thì GridSpec giống như một nhà thiết kế dàn trang tạp chí chuyên nghiệp: trang bìa là một bức ảnh lớn chiếm 2/3 diện tích bên trái, còn bên phải là 2 khung tin nhỏ xếp chồng lên nhau. Còn ax.twinx() giống như một chiếc nhiệt kế kép có 2 vạch đo trên cùng một cột thủy ngân: bên trái là độ C, bên phải là độ F. Cả 2 cùng chung một trục thời gian X nhưng có 2 thang đo độc lập.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">📐 Bố cục GridSpec Bất đối xứng (1 Lớn + 2 Nhỏ)</div>
                <div style="display:grid;grid-template-columns:2fr 1fr;gap:8px;height:120px;">
                  <div style="background:var(--topic-data-soft);border:2px solid var(--topic-data);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--topic-data);">
                    Ô Chính (Chiếm 2 hàng x 1 cột): ax_main
                  </div>
                  <div style="display:flex;flex-direction:column;gap:8px;">
                    <div style="background:rgba(14,165,233,0.15);border:1px solid #0ea5e9;flex:1;display:flex;align-items:center;justify-content:center;font-size:0.8rem;color:#0ea5e9;font-weight:700;">
                      Ô phụ 1: ax_top
                    </div>
                    <div style="background:rgba(139,92,246,0.15);border:1px solid #8b5cf6;flex:1;display:flex;align-items:center;justify-content:center;font-size:0.8rem;color:#8b5cf6;font-weight:700;">
                      Ô phụ 2: ax_bot
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-mpl-gridspec-twinx',
              title: '1. Thiết lập Bố cục Tự do với GridSpec và Trục Phụ twinx',
              content: `
                <p><strong>GridSpec:</strong> Cho phép cắt chia Figure thành lưới $(M, N)$ và gộp các ô lại với nhau bằng cú pháp cắt lát Python: <code>gs[0:2, 0]</code> (chiếm hàng 0 và 1 của cột 0).</p>
                <p><strong>Trục Tung Kép (ax.twinx):</strong> Tạo một đối tượng Axes thứ hai dùng chung trục hoành $X$ nhưng có thang đo $Y$ độc lập bên phải. <em>Cảnh báo thị giác:</em> Hãy dùng màu chữ trục Y bên phải khớp với màu của đường đồ thị tương ứng để người xem không bị nhầm lẫn!</p>
              `,
              codeExamples: [
                {
                  title: 'Thực hành Trục tung kép (twinx) so sánh Doanh thu và Tỉ suất Lợi nhuận',
                  lang: 'Python',
                  code: `import numpy as np
import matplotlib.pyplot as plt

months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6']
revenue = [200, 250, 310, 280, 390, 450]       # Đơn vị: Triệu VNĐ
margin =  [15.2, 16.0, 18.5, 14.0, 19.2, 22.0]  # Đơn vị: %

fig, ax1 = plt.subplots(figsize=(7, 4))

# 1. Trục thứ nhất (Bên trái): Vẽ cột Doanh thu
color_rev = '#2563eb'
ax1.bar(months, revenue, color=color_rev, alpha=0.6, width=0.4, label='Doanh thu')
ax1.set_xlabel('Tháng')
ax1.set_ylabel('Doanh thu (Triệu VNĐ)', color=color_rev, fontweight='bold')
ax1.tick_params(axis='y', labelcolor=color_rev)

# 2. Tạo trục phụ thứ hai (Bên phải) bằng twinx: Vẽ đường Tỉ suất lợi nhuận
ax2 = ax1.twinx()
color_mar = '#dc2626'
ax2.plot(months, margin, color=color_mar, marker='o', linewidth=2.5, label='Biên lợi nhuận (%)')
ax2.set_ylabel('Biên lợi nhuận (%)', color=color_mar, fontweight='bold')
ax2.tick_params(axis='y', labelcolor=color_mar)
ax2.set_ylim(10, 25)

ax1.set_title('Báo cáo Hiệu quả Kinh doanh (Trục Tung Kép twinx)', fontweight='bold')
fig.tight_layout()
print("Biểu đồ trục tung kép twinx đã được tạo lập thành công!")`,
                  output: `Biểu đồ trục tung kép twinx đã được tạo lập thành công!`,
                  annotations: [
                    { line: 17, text: 'ax.twinx() sinh ra hệ tọa độ ax2 chia sẻ chung trục X.' },
                    { line: 20, text: 'Đồng bộ màu sắc labelcolor giữa đường vẽ và nhãn trục Y giúp người xem dễ liên kết.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy lưới hiển thị bị vẽ đè khi dùng twinx',
                content: 'Nếu cả ax1 và ax2 đều bật ax.grid(True), hai mạng lưới kẻ ngang sẽ đan xen nhau gây rối mắt và nhầm lẫn tỉ lệ. Chỉ nên bật lưới tọa độ trên trục chính ax1, và tắt lưới trên trục phụ ax2: ax2.grid(False)!'
              }
            ],
            tips: [
              {
                title: 'Dùng subplots_adjust hoặc constrained_layout',
                content: 'Khi các nhãn trục bị đè lên nhau, hãy truyền tham số plt.subplots(..., layout=\"constrained\") thay vì gọi fig.tight_layout(). Constrained layout là thuật toán hiện đại hơn tự động tính toán khoảng cách viền hoàn hảo.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Tạo Bố cục GridSpec: Biểu đồ Scatter kèm Histogram lề (Marginal Plot)',
              problem: 'Sử dụng matplotlib.gridspec.GridSpec chia khung tranh thành lưới 4x4. Ô chính chiếm 3 hàng dưới và 3 cột đầu [1:, :-1]. Ô phụ trên cùng chiếm hàng 0 và 3 cột đầu [0, :-1]. Ô phụ bên phải chiếm 3 hàng dưới và cột cuối [1:, -1].',
              hint: 'gs = fig.add_gridspec(4, 4); ax_main = fig.add_subplot(gs[1:, :-1]).',
              solutionCode: `import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

fig = plt.figure(figsize=(7, 7))
gs = gridspec.GridSpec(4, 4, figure=fig)

ax_top = fig.add_subplot(gs[0, :-1])    # Histogram trục X
ax_main = fig.add_subplot(gs[1:, :-1])  # Scatter plot chính
ax_right = fig.add_subplot(gs[1:, -1])  # Histogram trục Y

ax_main.set_title('Scatter chính', y=0.9)
ax_top.set_title('Marginal X')
ax_right.set_title('Marginal Y')
fig.tight_layout()

print("Bố cục Marginal Plot GridSpec đã tạo lập chuẩn xác!")`,
              solutionOutput: `Bố cục Marginal Plot GridSpec đã tạo lập chuẩn xác!`,
              explanation: 'Đây là bố cục kinh điển của các bài báo khoa học để vừa quan sát mối tương quan 2 biến (Scatter), vừa quan sát phân phối lề (Histogram) của từng biến.',
              annotations: [
                { line: 7, text: 'Cú pháp slice ma trận Python giúp ghép nối các ô trong GridSpec cực kỳ linh hoạt.' }
              ]
            }
          ],
          summary: [
            'GridSpec phá vỡ giới hạn của lưới ô vuông đều, cho phép dàn trang đồ họa báo chí phức hợp.',
            'ax.twinx() tạo trục tung kép để hiển thị 2 biến có đơn vị đo khác nhau trên cùng một trục thời gian.',
            'Luôn đồng bộ màu sắc nhãn trục Y với màu của đường đồ thị tương ứng khi dùng twinx.',
            'layout=\"constrained\" tự động tối ưu khoảng cách giữa các đồ thị con mượt mà hơn tight_layout.'
          ]
        },
        {
          id: 'ai-mpl-04',
          number: '5.4',
          title: 'Hệ Tọa độ (Transforms), Xuất Ảnh Chuẩn Báo cáo & Đồ họa Động (Animation)',
          subtitle: 'Hiểu Data, Axes, Figure transforms, xuất ảnh vector SVG/PDF và xuất bản ấn phẩm học thuật',
          level: 'Nâng cao',
          duration: '45 phút',
          objectives: [
            'Hiểu 4 hệ tọa độ của Matplotlib: Data coordinates, Axes coordinates, Figure coordinates và Display coordinates.',
            'Sử dụng transform=ax.transAxes để cố định vị trí văn bản ở góc đồ thị bất chấp dữ liệu thay đổi.',
            'Xuất ảnh chất lượng cao chuẩn xuất bản: DPI 300, định dạng Vector PDF/SVG, bbox_inches="tight".',
            'Khái niệm đồ họa động với FuncAnimation.'
          ],
          intuition: {
            title: 'Tọa độ GPS vệ tinh vs Tọa độ góc màn hình điện thoại',
            metaphor: 'Hệ tọa độ Data giống như kinh độ và vĩ độ GPS ngoài đời thực: điểm (100, 50) nằm ở một vị trí cụ thể trên đồ thị, khi bạn phóng to (zoom in) hoặc đổi thang đo xlim, điểm đó sẽ bị dịch chuyển trên màn hình. Ngược lại, hệ tọa độ Axes (transAxes) giống như chiếc đồng hồ pin ở góc trên bên phải màn hình điện thoại của bạn: tọa độ (0.95, 0.95) luôn luôn nằm ở góc trên bên phải của khung đồ thị, bất kể bạn có zoom bản đồ dữ liệu đi đâu chăng nữa. Hiểu transforms giúp bạn đặt nhãn và logo cố định ở vị trí hoàn hảo.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🧭 4 Tầng Hệ Tọa độ (Coordinate Transforms)</div>
                <div style="font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  1. <code>ax.transData</code> (Mặc định): Tọa độ dữ liệu thực (Ví dụ: nhiệt độ 37.5°C, doanh thu 500 triệu).<br>
                  2. <code>ax.transAxes</code>: Tọa độ tương đối của khung Axes [0.0, 1.0]. (0,0) là góc dưới trái, (1,1) là góc trên phải của Axes.<br>
                  3. <code>fig.transFigure</code>: Tọa độ tương đối của toàn bộ khung tranh Figure [0.0, 1.0].<br>
                  4. <code>None (Display)</code>: Tọa độ pixel màn hình vật lý thực tế.
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-mpl-transforms-export',
              title: '1. Sử dụng transAxes và Xuất Ảnh Đạt Chuẩn Xuất bản Quốc tế',
              content: `
                <p><strong>Cố định nhãn bằng <code>transform=ax.transAxes</code>:</strong> Khi cần in một hộp thông số thống kê ($R^2 = 0.95$, $p < 0.001$) ở góc đồ thị, hãy luôn dùng <code>transform=ax.transAxes</code> để hộp thông số không bao giờ bị trôi khi thay đổi dữ liệu.</p>
                <p><strong>Xuất ảnh chất lượng xuất bản:</strong></p>
                <ul>
                  <li><code>dpi=300</code>: Độ phân giải 300 điểm ảnh/inch, tiêu chuẩn in ấn sắc nét của các tạp chí khoa học (Nature, IEEE, Springer).</li>
                  <li><code>bbox_inches='tight'</code>: Tự động xén bỏ các khoảng trắng thừa xung quanh viền ảnh, tránh làm mất chữ nhãn trục.</li>
                  <li><code>format='pdf'</code> hoặc <code>format='svg'</code>: Định dạng Vector đồ họa (không bị vỡ hạt khi phóng to vô hạn lần).</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Thực hành transAxes cố định hộp văn bản và Xuất ảnh chất lượng cao',
                  lang: 'Python',
                  code: `import numpy as np
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(6, 4))
x = np.linspace(0, 10, 100)
y = 2.5 * x + np.random.normal(0, 2, 100)

ax.scatter(x, y, alpha=0.6, color='#059669', label='Quan sát')
ax.plot(x, 2.5 * x, color='#dc2626', lw=2, label='Đường hồi quy')

# Đặt hộp thông số thống kê cố định ở góc trên bên trái bằng transAxes:
# Tọa độ (0.05, 0.90) nghĩa là cách cạnh trái 5%, cách cạnh đáy 90% của Axes
text_box = "N = 100\\nR² = 0.942\\np < 0.001"
ax.text(0.05, 0.90, text_box, transform=ax.transAxes,
        fontsize=10, verticalalignment='top',
        bbox=dict(boxstyle='round,pad=0.5', facecolor='#f8fafc', edgecolor='#cbd5e1', alpha=0.9))

ax.set(title='Xuất Bản Đồ Thị Chuẩn Quốc Tế', xlabel='Biến X', ylabel='Biến Y')
ax.legend(loc='lower right')

# Xuất ra file ảnh chất lượng cao
fig.savefig('high_res_plot.png', dpi=300, bbox_inches='tight')
print("Ảnh high_res_plot.png (300 DPI, tight bbox) đã được xuất thành công!")`,
                  output: `Ảnh high_res_plot.png (300 DPI, tight bbox) đã được xuất thành công!`,
                  annotations: [
                    { line: 15, text: 'transform=ax.transAxes neo giữ vị trí văn bản bất biến theo tỉ lệ khung đồ thị.' },
                    { line: 22, text: 'fig.savefig với dpi=300 và bbox_inches="tight" là chuẩn mực cho mọi bài báo cáo.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Quên bbox_inches=\"tight\" khiến ảnh bị cắt cụt nhãn',
                content: 'Khi lưu ảnh bằng fig.savefig(), nếu không có bbox_inches=\"tight\", các nhãn trục (xlabel/ylabel) dài hoặc tiêu đề sup_title nằm sát mép ngoài có thể bị cắt mất một nửa trong tệp ảnh đầu ra.'
              }
            ],
            tips: [
              {
                title: 'Ưu tiên xuất định dạng PDF/SVG cho luận văn học thuật',
                content: 'Khi chèn ảnh vào LaTeX hoặc Word, xuất tệp .pdf hoặc .svg sẽ giúp đồ thị là các đường vector toán học nguyên vẹn, cho phép phóng to 1000% mà chữ và đường nét vẫn sắc như dao cạo.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Thêm Watermark (Hình mờ Bản quyền) bằng transFigure',
              problem: 'Sử dụng hệ tọa độ Figure fig.transFigure để in một dòng chữ mờ "CONFIDENTIAL - BẢO MẬT" nằm chéo chính giữa trung tâm của khung tranh Figure với alpha=0.15 và fontsize=24.',
              hint: 'fig.text(0.5, 0.5, \"...\", transform=fig.transFigure, ha=\"center\", va=\"center\", rotation=30, alpha=0.15).',
              solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(6, 4))
ax.plot([1, 2, 3], [10, 20, 15])

# In Watermark chính giữa toàn bộ Figure
fig.text(0.5, 0.5, 'CONFIDENTIAL - BẢO MẬT',
         transform=fig.transFigure,
         fontsize=22, fontweight='bold', color='#64748b',
         ha='center', va='center', rotation=30, alpha=0.18)

print("Đã thêm Watermark bảo mật bằng fig.transFigure!")`,
              solutionOutput: `Đã thêm Watermark bảo mật bằng fig.transFigure!`,
              explanation: 'fig.transFigure với tọa độ (0.5, 0.5) đặt văn bản chính xác tại trọng tâm hình học của toàn bộ bức tranh, bất chấp kích thước của Axes bên trong.',
              annotations: [
                { line: 7, text: 'transFigure dùng tọa độ từ [0, 1] trên toàn bộ khung Figure.' }
              ]
            }
          ],
          summary: [
            'transAxes gắn tọa độ theo tỉ lệ khung đồ thị [0, 1], hoàn hảo cho hộp chú thích chỉ số.',
            'transFigure gắn tọa độ theo khung tranh tổng thể, thích hợp cho tiêu đề lớn và Watermark.',
            'Lưu ảnh khoa học: luôn dùng dpi=300 và bbox_inches=\"tight\".',
            'Định dạng Vector (.svg, .pdf) giữ độ nét vô hạn lần, tối ưu cho báo cáo và xuất bản.'
          ]
        },
        {
          id: 'ai-mpl-05',
          number: '5.5',
          title: 'Dự án Thực chiến: Thiết kế Infographic Dashboard Đa biểu đồ Chuẩn Tạp chí Khoa học',
          subtitle: 'Tích hợp GridSpec, Spines, Colorbar, Annotation và Bảng tóm tắt chỉ số thành một ấn phẩm đồ họa hoàn chỉnh',
          level: 'Nâng cao',
          duration: '50 phút',
          objectives: [
            'Thiết kế một trang Infographic Dashboard đa khung nhìn hoàn chỉnh bằng Matplotlib thuần túy.',
            'Kết hợp GridSpec 3 khung: Xu hướng chuỗi thời gian, Phân phối tần suất và Ma trận tương quan nhiệt.',
            'Tự tạo thanh đo màu Colorbar tùy biến gắn với đối tượng ScalarMappable.',
            'Áp dụng toàn bộ quy chuẩn thẩm mỹ: màu sắc tối giản, loại bỏ rác thị giác và xuất bản ấn phẩm.'
          ],
          intuition: {
            title: 'Trang nhất của Tạp chí The Economist',
            metaphor: 'Một bảng tin chuyên nghiệp không bao giờ là sự chắp vá lộn xộn của các mảnh biểu đồ rời rạc. Nó giống như trang bìa của tạp chí The Economist: có một câu chuyện dẫn dắt rõ ràng, có tiêu đề lớn định hướng, các biểu đồ thành phần có chung một bảng màu thống nhất (thay vì 7 màu cầu vồng lòe loẹt), các đường biên rườm rà được tinh gọn tối đa để nhường chỗ cho dữ liệu tỏa sáng. Dự án này biến bạn thành một nhà thiết kế thông tin dữ liệu (Data Information Designer) thực thụ.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">📰 Thiết kế Infographic Dashboard 3 Khung</div>
                <div style="display:grid;grid-template-columns:3fr 2fr;gap:8px;">
                  <div style="background:var(--bg-surface);padding:8px;border:1px solid var(--border-subtle);font-size:0.8rem;">
                    <strong>Khung Lớn (Trái):</strong> Biểu đồ Xu hướng Lợi nhuận qua các năm kèm vùng biên độ tin cậy (ax.fill_between).
                  </div>
                  <div style="display:flex;flex-direction:column;gap:8px;">
                    <div style="background:var(--bg-surface);padding:6px;border:1px solid var(--border-subtle);font-size:0.75rem;">
                      <strong>Khung Nhỏ Trên:</strong> Phân phối doanh thu (Histogram KDE).
                    </div>
                    <div style="background:var(--bg-surface);padding:6px;border:1px solid var(--border-subtle);font-size:0.75rem;">
                      <strong>Khung Nhỏ Dưới:</strong> Ma trận tương quan (Heatmap imshow).
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-mpl-project-dashboard',
              title: '1. Hiện thực hóa Infographic Dashboard Đẳng cấp',
              content: `
                <p>Toàn bộ mã nguồn xây dựng Dashboard chuyên nghiệp không cần bất kỳ thư viện ngoài nào кроме NumPy và Matplotlib:</p>
              `,
              codeExamples: [
                {
                  title: 'Toàn bộ mã nguồn Infographic Dashboard Matplotlib',
                  lang: 'Python',
                  code: `import numpy as np
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

# 1. Khởi tạo dữ liệu mô phỏng
rng = np.random.default_rng(2026)
days = np.arange(1, 31)
trend = 100 + 3.0 * days + rng.normal(0, 5, 30)
upper_ci = trend + 8.0
lower_ci = trend - 8.0

corr_matrix = np.array([[1.0, 0.82, -0.45],
                        [0.82, 1.0, -0.30],
                        [-0.45, -0.30, 1.0]])

# 2. Thiết lập bố cục GridSpec (2 hàng x 2 cột, ô trái gộp 2 hàng)
fig = plt.figure(figsize=(10, 5.5), dpi=100)
gs = gridspec.GridSpec(2, 2, width_ratios=[1.6, 1.0], height_ratios=[1, 1], figure=fig)

ax_main = fig.add_subplot(gs[:, 0])  # Khung lớn bên trái
ax_hist = fig.add_subplot(gs[0, 1])  # Khung nhỏ trên phải
ax_heat = fig.add_subplot(gs[1, 1])  # Khung nhỏ dưới phải

# --- VẼ KHUNG CHÍNH (XU HƯỚNG) ---
ax_main.plot(days, trend, color='#059669', lw=2.5, label='Doanh thu Thực tế')
ax_main.fill_between(days, lower_ci, upper_ci, color='#059669', alpha=0.15, label='KTC 95%')
ax_main.set_title('Xu hướng Tăng trưởng Tháng (Doanh thu & Vùng tin cậy)', fontweight='bold')
ax_main.set(xlabel='Ngày trong tháng', ylabel='Doanh thu (Triệu VNĐ)')
ax_main.spines['top'].set_visible(False)
ax_main.spines['right'].set_visible(False)
ax_main.legend(loc='upper left')

# --- VẼ KHUNG PHÂN PHỐI ---
ax_hist.hist(trend, bins=10, color='#0ea5e9', edgecolor='white', alpha=0.85)
ax_hist.set_title('Phân phối Tần suất', fontsize=10, fontweight='bold')
ax_hist.spines['top'].set_visible(False)
ax_hist.spines['right'].set_visible(False)

# --- VẼ MA TRẬN NHIỆT (HEATMAP) ---
im = ax_heat.imshow(corr_matrix, cmap='Blues', vmin=-1, vmax=1)
ax_heat.set_title('Ma trận Tương quan', fontsize=10, fontweight='bold')
ax_heat.set_xticks([0, 1, 2], labels=['DoanhThu', 'Marketing', 'GiaBan'], fontsize=8)
ax_heat.set_yticks([0, 1, 2], labels=['DoanhThu', 'Marketing', 'GiaBan'], fontsize=8)

# In số lên từng ô của Heatmap
for i in range(3):
    for j in range(3):
        ax_heat.text(j, i, f"{corr_matrix[i, j]:.2f}", ha='center', va='center',
                     color='white' if abs(corr_matrix[i, j]) > 0.5 else 'black', fontsize=9)

fig.suptitle('BÁO CÁO PHÂN TÍCH TỔNG QUAN HIỆU SUẤT KINH DOANH', fontsize=13, fontweight='bold', y=0.98)
fig.tight_layout()
print("Infographic Dashboard Matplotlib đã hoàn thành trọn vẹn!")`,
                  output: `Infographic Dashboard Matplotlib đã hoàn thành trọn vẹn!`,
                  annotations: [
                    { line: 20, text: 'width_ratios=[1.6, 1.0] định tỉ lệ chiều rộng cột trái rộng gấp 1.6 lần cột phải.' },
                    { line: 27, text: 'ax.fill_between vẽ vùng bóng mờ biểu thị khoảng tin cậy cực kỳ trực quan.' },
                    { line: 40, text: 'ax.imshow tạo biểu đồ nhiệt Heatmap ma trận tương quan trực tiếp không cần thư viện ngoài.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-mpl-func-animation',
              title: '2. Đồ họa Động và Hoạt cảnh với FuncAnimation (matplotlib.animation)',
              content: `
                <p>Trong nghiên cứu mô phỏng, vật lý hạt, hoặc quan sát trực quan hội tụ Gradient Descent, đồ họa tĩnh không phản ánh được diễn biến qua thời gian. <code>matplotlib.animation.FuncAnimation</code> cung cấp kiến trúc chuyên nghiệp để tạo hoạt cảnh mượt mà:</p>
                <ul>
                  <li><strong>Hàm khởi tạo (init_func):</strong> Dọn sạch trạng thái các Artist ban đầu.</li>
                  <li><strong>Hàm cập nhật (update):</strong> Nhận số thứ tự khung hình <code>frame</code> và cập nhật dữ liệu của Artist (ví dụ <code>line.set_data(x, y)</code>) thay vì vẽ lại từ đầu.</li>
                  <li><strong>Cơ chế Blitting (<code>blit=True</code>):</strong> Kỹ thuật tối ưu hóa phần cứng đồ họa: Chỉ vẽ lại đúng vùng hình chữ nhật bị thay đổi (dirty rectangle) trên canvas, giữ nguyên toàn bộ nền tĩnh (Figure, Ticks, Labels). Nhờ đó, hoạt cảnh đạt chuẩn 60 FPS mượt mà.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Xây dựng Hoạt cảnh Sóng di chuyển bằng FuncAnimation với Blitting',
                  lang: 'Python',
                  code: `import matplotlib
matplotlib.use('Agg')
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# 1. Khởi tạo trục tọa độ cố định
fig, ax = plt.subplots(figsize=(6, 3), dpi=100)
x = np.linspace(0, 4 * np.pi, 200)
line, = ax.plot([], [], lw=2.5, color='#059669', label='Sóng sin di chuyển')
ax.set_xlim(0, 4 * np.pi)
ax.set_ylim(-1.5, 1.5)
ax.set(title='Mô phỏng Đồ họa Động (FuncAnimation + Blitting)', xlabel='Không gian x', ylabel='Biên độ y')
ax.legend(loc='upper right')

# 2. Hàm khởi tạo trạng thái rỗng
def init():
    line.set_data([], [])
    return (line,)

# 3. Hàm cập nhật từng khung hình frame
def update(frame):
    y = np.sin(x - frame * 0.1)
    line.set_data(x, y)
    return (line,)

# 4. Khởi tạo hoạt cảnh với 30 khung hình, blit=True
anim = FuncAnimation(fig, update, init_func=init, frames=30, interval=40, blit=True)

print("FuncAnimation đã được cấu hình thành công!")
print("Cơ chế Blitting: Kích hoạt (Chỉ vẽ lại Line2D, tái sử dụng toàn bộ trục)")
plt.close(fig)`,
                  output: `FuncAnimation đã được cấu hình thành công!
Cơ chế Blitting: Kích hoạt (Chỉ vẽ lại Line2D, tái sử dụng toàn bộ trục)`,
                  annotations: [
                    { line: 8, text: 'line, = ax.plot(...) lấy tham chiếu tới đối tượng Line2D để tái sử dụng.' },
                    { line: 20, text: 'set_data() cập nhật mảng tọa độ mới trong bộ nhớ C cực nhanh.' },
                    { line: 24, text: 'blit=True giúp tăng tốc độ render lên gấp 5-10 lần so với vẽ lại toàn bộ khung tranh.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy lạm dụng quá nhiều màu sắc trên cùng 1 Dashboard',
                content: 'Dashboard chuyên nghiệp chỉ nên sử dụng tối đa 1 đến 2 màu chủ đạo (ví dụ: xanh lục Emerald #059669 làm màu nhấn, xám slate #64748b làm màu phụ). Việc mỗi đồ thị dùng một màu sặc sỡ khác nhau làm phân tán sự chú ý của người xem.'
              }
            ],
            tips: [
              {
                title: 'Đổi theme phong cách tạp chí với plt.style.use',
                content: 'Bạn có thể thay đổi toàn bộ diện mạo Matplotlib bằng các phong cách có sẵn: plt.style.use(\"seaborn-v0_8-whitegrid\") hoặc plt.style.use(\"bmh\").'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Thêm Thanh đo Màu (Colorbar) cho Khung Heatmap',
              problem: 'Từ mã nguồn Dashboard ở trên, hãy gắn thêm một thanh đo màu Colorbar nằm bên phải của khung ma trận nhiệt bằng hàm fig.colorbar(im, ax=ax_heat).',
              hint: 'fig.colorbar(im, ax=ax_heat, shrink=0.8).',
              solutionCode: `# Gắn Colorbar vào ô ax_heat
cbar = fig.colorbar(im, ax=ax_heat, shrink=0.85, pad=0.08)
cbar.ax.tick_params(labelsize=8)
print("Thanh Colorbar đã được gắn vào ma trận nhiệt!")`,
              solutionOutput: `Thanh Colorbar đã được gắn vào ma trận nhiệt!`,
              explanation: 'fig.colorbar nhận vào đối tượng ảnh ScalarMappable im và tham số ax chỉ định gắn thanh đo màu vào cạnh của đồ thị con nào.',
              annotations: [
                { line: 2, text: 'shrink=0.85 thu nhỏ chiều cao colorbar để cân đối với khung hình.' }
              ]
            }
          ],
          summary: [
            'Infographic Dashboard tích hợp nhiều góc nhìn vào một ấn phẩm thống nhất duy nhất.',
            'GridSpec width_ratios cho phép tùy biến tỉ lệ vàng giữa các khu vực thông tin.',
            'ax.fill_between trực quan hóa dải biên độ tin cậy khoa học và thẩm mỹ.',
            'Matplotlib thuần túy hoàn toàn đủ sức tạo nên những ấn phẩm đồ họa đỉnh cao khi nắm vững kiến trúc OOP.'
          ]
        }
      ]
    },
    {
      id: 'part-ai-seaborn',
      number: 'Phần 6',
      title: 'Seaborn: Trực quan hóa Dữ liệu Thống kê Cao cấp',
      level: 'Cơ bản đến Chuyên sâu',
      badge: '5 Bài học',
      icon: '🎨',
      description: 'Làm chủ triết lý Tidy Data, phân biệt Axes-level vs Figure-level functions, ước lượng thống kê Bootstrap CI tự động, Pairplot, FacetGrid và giao diện hiện đại seaborn.objects.',
      lessons: [
        {
          id: 'ai-sns-01',
          number: '6.1',
          title: 'Triết lý Seaborn & Dữ liệu Chuẩn Tidy (Long-Form)',
          subtitle: 'Tại sao Seaborn cần dữ liệu Long-form, và Phân định Cốt tử: Axes-level vs Figure-level Functions',
          level: 'Cơ bản',
          duration: '35 phút',
          objectives: [
            'Hiểu lý do Seaborn ra đời để khắc phục mã nguồn dài dòng của Matplotlib trong phân tích thống kê.',
            'Nắm vững cấu trúc Dữ liệu Chuẩn Tidy (Long-form): mỗi biến là một cột, mỗi quan sát là một hàng.',
            'Phân biệt tuyệt đối giữa Axes-level functions (trả về ax) và Figure-level functions (trả về FacetGrid).',
            'Biết cách ghép các hàm Axes-level của Seaborn vào bố cục đa trục của Matplotlib.'
          ],
          intuition: {
            title: 'Người phiên dịch thông minh giữa Bảng dữ liệu và Khung tranh',
            metaphor: 'Nếu Matplotlib là một hộp màu vẽ nguyên thủy (bạn phải tự tay lặp qua từng hàng dữ liệu, tự tính trung bình, tự tính độ lệch chuẩn, tự gắn nhãn từng nét vẽ), thì Seaborn giống như một người họa sĩ phiên dịch thông minh. Bạn chỉ cần đưa cho Seaborn một bảng dữ liệu Pandas dạng Tidy: "Này Seaborn, hãy vẽ biểu đồ phân tán với trục X là Tuổi, trục Y là Lương, và tô màu hue theo Phòng ban". Seaborn tự động phân nhóm dữ liệu, tự chọn bảng màu thẩm mỹ, tự tính khoảng tin cậy và tự tạo bảng chú giải Legend chuẩn chỉnh trong 1 dòng lệnh duy nhất!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🧩 Phân định Kiến trúc: Axes-Level vs Figure-Level trong Seaborn</div>
                <div class="eco-grid">
                  <div class="eco-card" style="border-left:4px solid var(--topic-data);">
                    <strong style="color:var(--topic-data);">1. Axes-Level Functions:</strong>
                    <div style="font-size:0.84rem;color:var(--text-secondary);margin-top:4px;">
                      Ví dụ: <code>sns.scatterplot()</code>, <code>sns.histplot()</code>, <code>sns.boxplot()</code>.<br>
                      • Trả về đối tượng <code>matplotlib.axes.Axes</code>.<br>
                      • Nhận tham số <code>ax=my_ax</code> ➔ <strong>Dễ dàng ghép vào layout subplots của Matplotlib!</strong>
                    </div>
                  </div>
                  <div class="eco-card" style="border-left:4px solid #8b5cf6;">
                    <strong style="color:#8b5cf6;">2. Figure-Level Functions:</strong>
                    <div style="font-size:0.84rem;color:var(--text-secondary);margin-top:4px;">
                      Ví dụ: <code>sns.relplot()</code>, <code>sns.displot()</code>, <code>sns.catplot()</code>.<br>
                      • Tự tạo và quản lý toàn bộ Figure.<br>
                      • Trả về đối tượng <code>FacetGrid</code>.<br>
                      • Chuyên trị chia lưới đa chiều tự động (<code>col='gioi_tinh'</code>, <code>row='khu_vuc'</code>).
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-sns-tidy-axes-vs-fig',
              title: '1. Dữ liệu Tidy và Sức mạnh Khám phá Đa biến (hue, style, size)',
              content: `
                <p>Seaborn hoạt động hoàn hảo nhất khi dữ liệu ở dạng <strong>Tidy (Long-form)</strong>: Mỗi biến số là một cột riêng biệt. Thay vì phải viết các vòng lặp phức tạp để lọc từng nhóm dữ liệu như trong Matplotlib, Seaborn cung cấp các tham số ngữ nghĩa (Semantic Mappings):</p>
                <ul>
                  <li><code>x</code> và <code>y</code>: Biến định lượng trên 2 trục tọa độ.</li>
                  <li><code>hue</code>: Phân tách màu sắc theo một biến phân loại (ví dụ: Giới tính, Nhóm khách hàng).</li>
                  <li><code>style</code>: Phân tách hình dáng điểm vẽ (Marker shape) hoặc kiểu nét gạch (Dashed line).</li>
                  <li><code>size</code>: Phân tách kích thước điểm vẽ theo một biến số lượng.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Vẽ biểu đồ phân tán đa biến với hue và style trong Seaborn',
                  lang: 'Python',
                  code: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

# Nạp bộ dữ liệu hoa Diên vĩ nổi tiếng (Iris dataset có sẵn trong Seaborn)
iris = sns.load_dataset('iris')

# Khởi tạo khung vẽ Matplotlib
fig, ax = plt.subplots(figsize=(7, 4.5))

# Vẽ biểu đồ phân tán Axes-level: nhúng trực tiếp vào ax
sns.scatterplot(
    data=iris,
    x='sepal_length',
    y='sepal_width',
    hue='species',      # Tô màu theo loài hoa
    style='species',    # Đổi hình dạng marker theo loài
    palette='Set2',     # Bảng màu thẩm mỹ cao
    s=70,               # Kích thước điểm
    ax=ax
)

ax.set_title('Phân tích Hình thái Hoa Diên vĩ (Iris Morphology)', fontweight='bold')
ax.set_xlabel('Chiều dài đài hoa (cm)')
ax.set_ylabel('Chiều rộng đài hoa (cm)')
ax.grid(True, linestyle='--', alpha=0.5)

print("Biểu đồ Seaborn đã kết hợp mượt mà với Matplotlib Axes!")`,
                  output: `Biểu đồ Seaborn đã kết hợp mượt mà với Matplotlib Axes!`,
                  annotations: [
                    { line: 12, text: 'hue="species" tự động chia màu và sinh ra Legend chú giải hoàn hảo.' },
                    { line: 17, text: 'ax=ax chỉ định vẽ lên đúng hệ tọa độ của Matplotlib.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Truyền ax=ax vào các hàm Figure-level',
                content: 'Các hàm Figure-level như sns.relplot(), sns.catplot(), sns.displot() không nhận tham số ax! Nếu bạn cố tình truyền ax=ax vào sns.relplot(), Seaborn sẽ báo lỗi TypeError: got an unexpected keyword argument \'ax\'. Với subplots của Matplotlib, bắt buộc phải dùng các hàm Axes-level tương ứng: scatterplot, lineplot, boxplot, histplot!'
              }
            ],
            tips: [
              {
                title: 'Thiết lập giao diện toàn cục với sns.set_theme()',
                content: 'Chỉ cần gọi một dòng duy nhất ở đầu tệp mã: sns.set_theme(style=\"whitegrid\", font_scale=1.1), toàn bộ các biểu đồ Matplotlib và Seaborn sau đó sẽ tự động mang giao diện hiện đại, sạch sẽ và cỡ chữ rõ ràng.'
              }
            ]
          },
          exercises: [
            {
              level: 'Cơ bản',
              title: 'Tùy biến Bảng màu Palette trong sns.scatterplot',
              problem: 'Cho DataFrame gồm chiều cao (height), cân nặng (weight) và nhóm tuổi (age_group). Hãy dùng sns.scatterplot với bảng màu palette=\"viridis\" và đặt vị trí chú giải Legend ở góc trên bên phải.',
              hint: 'sns.scatterplot(..., palette=\"viridis\"); sns.move_legend(ax, \"upper right\").',
              solutionCode: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'height': [160, 165, 170, 175, 180],
    'weight': [55, 62, 68, 74, 82],
    'age_group': ['Trẻ', 'Trẻ', 'Trung niên', 'Trung niên', 'Cao tuổi']
})

fig, ax = plt.subplots(figsize=(6, 4))
sns.scatterplot(data=df, x='height', y='weight', hue='age_group', palette='viridis', s=100, ax=ax)
sns.move_legend(ax, 'upper left')
ax.set_title('Tương quan Chiều cao & Cân nặng')

print("Đã tùy biến bảng màu Viridis và vị trí Legend!")`,
              solutionOutput: `Đã tùy biến bảng màu Viridis và vị trí Legend!`,
              explanation: 'Seaborn cung cấp hàm tiện ích sns.move_legend() giúp di chuyển bảng chú giải sang bất kỳ vị trí mong muốn nào mà không làm mất định dạng.',
              annotations: [
                { line: 13, text: 'sns.move_legend là phương thức chuẩn mực trong Seaborn hiện đại.' }
              ]
            }
          ],
          summary: [
            'Seaborn phát huy sức mạnh tối đa trên dữ liệu dạng dài (Tidy/Long-form).',
            'Tham số ngữ nghĩa hue, style, size cho phép mã hóa 4-5 chiều dữ liệu trên cùng một biểu đồ 2D.',
            'Axes-level (scatterplot, histplot) vẽ lên ax có sẵn; Figure-level (relplot, catplot) quản lý toàn bộ Figure.',
            'sns.set_theme() nâng cấp toàn bộ diện mạo đồ họa của dự án chỉ trong một dòng lệnh.'
          ]
        },
        {
          id: 'ai-sns-02',
          number: '6.2',
          title: 'Trực quan hóa Phân phối, Quan hệ & Ước lượng Thống kê Tự động (Bootstrap CI)',
          subtitle: 'Histplot, KDE, ECDF, Lineplot với khoảng tin cậy 95% Bootstrap, Barplot vs Countplot',
          level: 'Trung cấp',
          duration: '40 phút',
          objectives: [
            'Hiểu cơ chế Seaborn tự động tính toán Khoảng tin cậy 95% bằng phương pháp Tái lấy mẫu Bootstrap (Bootstrap Confidence Interval).',
            'Làm chủ biểu đồ phân phối: histplot (kèm kde), kdeplot và ecdfplot (hàm phân phối thực nghiệm).',
            'Phân biệt rõ ràng giữa sns.barplot (tính giá trị trung bình kèm vạch sai số) và sns.countplot (đếm tần số xuất hiện).',
            'Điều khiển tham số errorbar trong Seaborn hiện đại (errorbar="ci", "se", "sd", None).'
          ],
          intuition: {
            title: 'Dải bóng mờ bảo vệ sự thật',
            metaphor: 'Khi bạn vẽ một đường biểu diễn nhiệt độ trung bình qua các năm bằng Matplotlib thông thường, bạn chỉ vẽ một sợi chỉ đơn độc. Nhưng sợi chỉ đó có thể gây ngộ nhận: nếu năm 2020 chỉ có 2 trạm đo nhiệt độ thì con số trung bình đó rất bấp bênh! Seaborn lineplot giải quyết điều này bằng một dải bóng mờ (Shaded Ribbon) ôm lấy sợi chỉ: dải bóng mờ đó là Khoảng tin cậy 95% được tính toán bằng cách xáo trộn và tái lấy mẫu hàng ngàn lần (Bootstrap). Nơi nào dữ liệu dồi dào chắc chắn, dải bóng mờ thắt hẹp lại; nơi nào dữ liệu khan hiếm bất định, dải bóng mờ xòe rộng ra. Nó cảnh báo người xem về mức độ tin cậy của thông tin.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🛡️ Dải Bóng mờ Khoảng Tin cậy 95% (Bootstrap CI) trong Seaborn</div>
                <div style="font-size:0.86rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  Khi gọi <code>sns.lineplot(data=df, x='thang', y='doanh_thu')</code> với nhiều chi nhánh lặp lại:<br>
                  • Đường chỉ đậm ở giữa = <strong>Giá trị Trung bình (Mean)</strong> tại mỗi tháng.<br>
                  • Dải bóng mờ xung quanh = <strong>Khoảng tin cậy 95% (95% Bootstrap CI)</strong>.<br>
                  • Tham số hiện đại: <code>errorbar='sd'</code> (hiện độ lệch chuẩn) hoặc <code>errorbar=None</code> (tắt bóng mờ).
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-sns-distributions-ci',
              title: '1. Khám phá Phân phối Thực nghiệm và Tự động Tính Khoảng Tin cậy',
              content: `
                <p><strong>Biểu đồ Phân phối Hiện đại:</strong></p>
                <ul>
                  <li><code>sns.histplot(data, x='gia', kde=True)</code>: Vẽ biểu đồ tần số kèm đường cong ước lượng mật độ nhân tử (Kernel Density Estimation - KDE).</li>
                  <li><code>sns.ecdfplot(data, x='gia')</code>: Empirical Cumulative Distribution Function. Vẽ đường tích lũy từ 0% đến 100%, không bị phụ thuộc vào số lượng cột bins như histogram!</li>
                </ul>
                <p><strong>sns.barplot vs sns.countplot:</strong></p>
                <ul>
                  <li><code>sns.countplot(x='phong_ban')</code>: Chỉ đếm số lượng bản ghi (tần số) của từng phòng ban. Không cần trục Y.</li>
                  <li><code>sns.barplot(x='phong_ban', y='luong')</code>: Tính <strong>trung bình lương</strong> của từng phòng ban, kèm theo vạch chỉ sai số (Error bar) ở đỉnh cột!</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Thực hành sns.lineplot với Bootstrap CI và sns.histplot kèm KDE',
                  lang: 'Python',
                  code: `import seaborn as sns
import matplotlib.pyplot as plt

# Nạp bộ dữ liệu tiền boa tại nhà hàng (Tips dataset)
tips = sns.load_dataset('tips')

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4.5))

# 1. Lineplot: Tỉ lệ tiền boa theo quy mô bàn tiệc kèm 95% Bootstrap CI
sns.lineplot(
    data=tips,
    x='size',
    y='total_bill',
    hue='time',        # So sánh bữa trưa (Lunch) và bữa tối (Dinner)
    marker='o',
    errorbar=('ci', 95), # Tự động tính 95% Bootstrap Confidence Interval
    ax=ax1
)
ax1.set_title('Tổng Hóa đơn theo Quy mô Bàn ( kèm 95% CI)', fontweight='bold')
ax1.grid(True, linestyle='--', alpha=0.5)

# 2. Histplot kết hợp KDE đường cong mật độ
sns.histplot(
    data=tips,
    x='total_bill',
    hue='sex',
    kde=True,
    palette='muted',
    alpha=0.4,
    ax=ax2
)
ax2.set_title('Phân phối Tiền Hóa đơn theo Giới tính (KDE)', fontweight='bold')

fig.tight_layout()
print("Biểu đồ Phân phối và Bootstrap CI đã được vẽ thành công!")`,
                  output: `Biểu đồ Phân phối và Bootstrap CI đã được vẽ thành công!`,
                  annotations: [
                    { line: 15, text: 'errorbar=("ci", 95) tự động tái lấy mẫu 1,000 lần để tính khoảng tin cậy.' },
                    { line: 26, text: 'kde=True khớp đường cong ước lượng mật độ liên tục mềm mại trên histogram.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Nhầm lẫn giữa barplot và countplot',
                content: 'Nếu bạn muốn đếm số lượng khách hàng theo thành phố, hãy dùng sns.countplot(data=df, x=\"thanh_pho\"). Nếu bạn dùng sns.barplot mà quên truyền tham số y, Seaborn sẽ ném lỗi ngay!'
              }
            ],
            tips: [
              {
                title: 'Thay đổi cách tính vạch sai số trong barplot',
                content: 'Mặc định errorbar trong Seaborn là 95% CI. Nếu bạn muốn hiển thị Độ lệch chuẩn (Standard Deviation), hãy đặt: errorbar=\"sd\". Nếu muốn tắt hoàn toàn vạch sai số, đặt: errorbar=None.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Vẽ ECDF So sánh Phân phối Giữa 2 Nhóm',
              problem: 'Sử dụng sns.ecdfplot trên bộ dữ liệu tips để vẽ hàm phân phối tích lũy của cột tip (tiền boa), phân tách theo ngày trong tuần (hue=\"day\").',
              hint: 'sns.ecdfplot(data=tips, x=\"tip\", hue=\"day\").',
              solutionCode: `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset('tips')
fig, ax = plt.subplots(figsize=(6, 4))

sns.ecdfplot(data=tips, x='tip', hue='day', ax=ax)
ax.set_title('Hàm Phân phối Tích lũy Thực nghiệm (ECDF) của Tiền Tip')
ax.grid(True, linestyle=':', alpha=0.6)

print("Biểu đồ ECDF hoàn tất!")`,
              solutionOutput: `Biểu đồ ECDF hoàn tất!`,
              explanation: 'ECDF cho bạn biết chính xác: \"Có bao nhiêu % khách hàng tip dưới 3 đô la vào ngày Chủ nhật?\". Bạn chỉ cần gióng từ trục X=3 lên trục Y để đọc phần trăm.',
              annotations: [
                { line: 7, text: 'ECDF là công cụ thống kê ưu việt hơn Histogram khi so sánh nhiều phân phối chồng chéo.' }
              ]
            }
          ],
          summary: [
            'Seaborn tự động tính toán Khoảng tin cậy 95% Bootstrap cho lineplot và barplot.',
            'histplot với kde=True kết hợp ưu điểm của cột rời rạc và đường cong liên tục.',
            'ecdfplot biểu diễn hàm phân phối tích lũy không phụ thuộc vào số lượng cột bins.',
            'Tham số errorbar (\"ci\", \"sd\", \"se\", None) kiểm soát vạch sai số linh hoạt trong Seaborn hiện đại.'
          ]
        },
        {
          id: 'ai-sns-03',
          number: '6.3',
          title: 'Trực quan hóa Đa biến Phức hợp: Pairplot, Heatmap Tương quan & Lưới FacetGrid',
          subtitle: 'Soi thấu toàn bộ các cặp biến với pairplot, trực quan ma trận tương quan bằng heatmap và chia lưới FacetGrid',
          level: 'Trung cấp',
          duration: '45 phút',
          objectives: [
            'Sử dụng sns.pairplot để quét nhanh toàn bộ ma trận tương quan của mọi cặp biến trong tập dữ liệu.',
            'Vẽ biểu đồ nhiệt Heatmap hiển thị ma trận tương quan có kèm số liệu và định dạng màu phân kỳ (Diverging Colormap).',
            'Làm chủ lớp chia lưới FacetGrid để phân chia đồ thị theo nhiều chiều danh mục (hàng và cột).',
            'Sử dụng clustermap để tự động phân cụm phân cấp (Hierarchical Clustering) các dòng và cột.'
          ],
          intuition: {
            title: 'Hệ thống Camera an ninh đa góc nhìn',
            metaphor: 'sns.pairplot và FacetGrid giống như một phòng điều khiển an ninh với 16 màn hình giám sát cùng lúc. Thay vì phải đi xem từng góc phòng một cách thủ công, người chỉ huy chỉ cần nhìn vào màn hình trung tâm: mỗi góc nhìn (mỗi cặp biến, mỗi phân khúc khách hàng) được chiếu lên một màn hình nhỏ tương ứng. Bạn lập tức phát hiện ra biến nào tương quan dương với biến nào, cụm dữ liệu nào bị tách rời, và điểm dị biệt nằm ở đâu chỉ trong vài giây quan sát.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🔍 Bản đồ Lưới FacetGrid: 1 Biểu đồ Phân nhánh thành Nhiều Ô Con</div>
                <div style="font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  Cú pháp Figure-level: <code>sns.relplot(data=df, x='X', y='Y', col='KhuVuc', row='GioiTinh')</code><br>
                  • 3 Khu vực x 2 Giới tính = <strong>Tự động sinh ra 6 đồ thị con</strong> có cùng thang đo trục!<br>
                  • Giúp so sánh trực quan đa chiều mà không bị chồng lấn dữ liệu lên nhau.
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-sns-heatmap-pairplot',
              title: '1. Ma trận Tương quan Heatmap và Toàn cảnh Pairplot',
              content: `
                <p>Trong giai đoạn Khám phá Dữ liệu ban đầu (Exploratory Data Analysis - EDA), hai công cụ quyền lực nhất của Seaborn là:</p>
                <ul>
                  <li><code>sns.heatmap(df.corr(), annot=True, cmap='coolwarm', vmin=-1, vmax=1)</code>: Tô màu trực quan ma trận hệ số tương quan Pearson giữa các cột số. <code>annot=True</code> in thẳng số liệu lên từng ô.</li>
                  <li><code>sns.pairplot(df, hue='target')</code>: Tự động vẽ đồ thị phân tán giữa mọi cặp biến ở các ô ngoài đường chéo, và vẽ phân phối mật độ KDE của từng biến trên đường chéo chính!</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Vẽ Ma trận Tương quan Heatmap chuyên nghiệp trong Seaborn',
                  lang: 'Python',
                  code: `import seaborn as sns
import matplotlib.pyplot as plt

# Nạp dữ liệu xe hơi mpg
mpg = sns.load_dataset('mpg')

# 1. Tính ma trận tương quan giữa các cột số
numeric_cols = ['mpg', 'displacement', 'horsepower', 'weight', 'acceleration']
corr_matrix = mpg[numeric_cols].corr()

# 2. Khởi tạo đồ thị
fig, ax = plt.subplots(figsize=(6.5, 5))

# Vẽ Heatmap với bảng màu phân kỳ 'vlag' đối xứng qua 0
sns.heatmap(
    corr_matrix,
    annot=True,          # In hệ số tương quan
    fmt='.2f',           # Làm tròn 2 chữ số thập phân
    cmap='vlag',         # Bảng màu phân kỳ: đỏ (dương), xanh (âm)
    vmin=-1.0, vmax=1.0, # Giới hạn thang đo từ -1 đến +1
    square=True,         # Ô vuông cân đối
    linewidths=0.5,      # Đường rãnh trắng ngăn cách các ô
    cbar_kws={'shrink': 0.8},
    ax=ax
)

ax.set_title('Ma trận Tương quan Các Đặc tính Xe hơi (MPG Dataset)', fontweight='bold')
print("Ma trận Heatmap đã được vẽ hoàn tất!")`,
                  output: `Ma trận Heatmap đã được vẽ hoàn tất!`,
                  annotations: [
                    { line: 15, text: 'vmin=-1, vmax=1 đảm bảo màu 0 nằm chính giữa trục phân kỳ.' },
                    { line: 20, text: 'square=True giữ cho các ô vuông vắn chuẩn tỉ lệ.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-sns-facetgrid',
              title: '2. Chia Lưới Đa chiều Tự động với FacetGrid',
              content: `
                <p>Khi bạn muốn phân tích mối quan hệ giữa Chi phí và Lợi nhuận, nhưng muốn tách riêng từng biểu đồ cho từng Thị trường và từng Kênh bán hàng, lớp <code>FacetGrid</code> (hoặc hàm cấp cao <code>catplot</code>, <code>relplot</code>) là câu trả lời tối thượng:</p>
              `,
              codeExamples: [
                {
                  title: 'Chia lưới tự động bằng sns.relplot với col và hue',
                  lang: 'Python',
                  code: `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset('tips')

# Sử dụng hàm Figure-level relplot để chia cột theo thời điểm ăn (Lunch / Dinner)
g = sns.relplot(
    data=tips,
    x='total_bill',
    y='tip',
    col='time',          # Chia thành 2 cột: Bữa trưa và Bữa tối
    hue='smoker',        # Phân màu theo người hút thuốc
    kind='scatter',
    height=4,
    aspect=1.2
)

g.set_axis_labels('Tổng Hóa đơn ($)', 'Tiền Tip ($)')
g.set_titles(col_template='Thời điểm: {col_name}')
print("Lưới FacetGrid đã được tạo thành công với 2 đồ thị con!")`,
                  output: `Lưới FacetGrid đã được tạo thành công với 2 đồ thị con!`,
                  annotations: [
                    { line: 11, text: 'col="time" tự động tạo 2 đồ thị con đồng bộ thang đo.' },
                    { line: 19, text: 'set_titles cho phép định dạng lại tiêu đề của từng ô trong lưới.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy gọi sns.pairplot trên DataFrame có hàng trăm cột',
                content: 'Nếu bảng của bạn có 50 cột, pairplot sẽ cố gắng vẽ một ma trận 50x50 = 2,500 biểu đồ con! Máy tính sẽ bị đơ ngay lập tức. Hãy luôn chọn lọc trước 4 đến 6 cột quan trọng nhất: sns.pairplot(df[[\"cột1\", \"cột2\", \"cột3\"]]).'
              }
            ],
            tips: [
              {
                title: 'Ẩn nửa trên của Heatmap bằng mask tam giác',
                content: 'Vì ma trận tương quan đối xứng qua đường chéo chính (corr[i, j] = corr[j, i]), nửa trên là dữ liệu thừa. Hãy dùng: mask = np.triu(np.ones_like(corr)) và truyền vào sns.heatmap(..., mask=mask) để biểu đồ cực kỳ thoáng mắt.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Tạo Mask Tam giác Ẩn Nửa trên của Ma trận Heatmap',
              problem: 'Cho ma trận tương quan corr. Sử dụng hàm np.triu() tạo một mảng boolean mask để ẩn nửa trên tam giác của biểu đồ Heatmap.',
              hint: 'mask = np.triu(np.ones_like(corr, dtype=bool)); sns.heatmap(corr, mask=mask).',
              solutionCode: `import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

iris = sns.load_dataset('iris')
corr = iris.drop(columns='species').corr()

# Tạo mask tam giác trên (bao gồm cả đường chéo hoặc bỏ đường chéo)
mask = np.triu(np.ones_like(corr, dtype=bool))

fig, ax = plt.subplots(figsize=(5, 4))
sns.heatmap(corr, mask=mask, annot=True, cmap='coolwarm', vmin=-1, vmax=1, ax=ax)
ax.set_title('Ma trận Tương quan Tam giác Dưới (Lower Triangle)')

print("Đã ẩn nửa trên ma trận thành công!")`,
              solutionOutput: `Đã ẩn nửa trên ma trận thành công!`,
              explanation: 'Ẩn nửa trên loại bỏ hoàn toàn các thông tin trùng lặp, giúp biểu đồ trông chuyên nghiệp như các ấn phẩm báo cáo tài chính hàng đầu.',
              annotations: [
                { line: 9, text: 'np.triu giữ lại phần tam giác trên để làm mặt nạ che giấu.' }
              ]
            }
          ],
          summary: [
            'sns.heatmap với vmin=-1, vmax=1 và cmap phân kỳ là chuẩn mực hiển thị ma trận tương quan.',
            'Dùng np.triu làm mặt nạ che nửa trên của Heatmap để loại bỏ thông tin trùng lặp.',
            'sns.pairplot quét nhanh toàn bộ các cặp biến trong giai đoạn Khám phá Dữ liệu (EDA).',
            'FacetGrid và các hàm Figure-level (relplot, catplot) phân nhánh dữ liệu đa chiều tự động.'
          ]
        },
        {
          id: 'ai-sns-04',
          number: '6.4',
          title: 'Theme, Bảng màu (Palette) & Giới thiệu Hiện đại seaborn.objects',
          subtitle: 'Làm chủ lý thuyết màu sắc (Qualitative, Sequential, Diverging) và Ngữ pháp Đồ họa (Grammar of Graphics) mới',
          level: 'Nâng cao',
          duration: '45 phút',
          objectives: [
            'Phân loại đúng 3 hệ bảng màu trong khoa học thị giác: Qualitative (danh mục), Sequential (đơn điệu), Diverging (phân kỳ đối xứng).',
            'Kết hợp sâu giữa Seaborn và Matplotlib: can thiệp vào từng Artist bên dưới để tinh chỉnh chi tiết.',
            'Làm quen với giao diện hiện đại seaborn.objects (thư viện con theo triết lý Grammar of Graphics tương tự ggplot2).',
            'Tự tạo bảng màu tùy biến (Custom Palette) nhận diện thương hiệu.'
          ],
          intuition: {
            title: 'Ngôn ngữ của Màu sắc và Cú pháp Ghép câu Đồ họa',
            metaphor: 'Màu sắc trong trực quan hóa dữ liệu không phải để trang trí cho đẹp mắt, nó là một kênh thông tin toán học! Nếu bạn dùng màu cầu vồng để thể hiện nhiệt độ tăng dần, não bộ người xem sẽ bị bối rối vì không biết màu vàng lớn hơn hay màu xanh lá cây lớn hơn. Hệ màu Sequential (nhạt đến đậm) thể hiện độ lớn tăng dần; Hệ màu Diverging (xanh - trắng - đỏ) thể hiện mức chệch khỏi điểm 0 cân bằng. Còn seaborn.objects giống như việc ghép câu ngữ pháp: thay vì gọi một hàm cồng kềnh, bạn ghép các từ đơn lẻ lại: Plot(data) + Dot() + Move(dodge=True) + Color() để tạo nên bức tranh theo ý muốn.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🎨 3 Hệ Thống Bảng Màu Tiêu chuẩn trong Khoa học Thị giác</div>
                <div class="eco-grid">
                  <div class="eco-card">
                    <strong>1. Qualitative (Định tính):</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      Dùng cho biến danh mục không có thứ bậc (Hà Nội, Đà Nẵng, TP.HCM). Các màu có độ sáng ngang nhau để không ngụ ý ai hơn ai (ví dụ: <code>Set2</code>, <code>tab10</code>).
                    </div>
                  </div>
                  <div class="eco-card">
                    <strong>2. Sequential (Tuần tự):</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      Dùng cho biến số tăng dần từ bé đến lớn (Dân số, Doanh thu). Màu chuyển mượt mà từ nhạt sang đậm (ví dụ: <code>Blues</code>, <code>viridis</code>, <code>mako</code>).
                    </div>
                  </div>
                  <div class="eco-card">
                    <strong>3. Diverging (Phân kỳ):</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      Dùng cho dữ liệu có điểm cân bằng ở giữa (Lãi/Lỗ, Tương quan [-1, +1]). Hai đầu là 2 màu tương phản, ở giữa là màu trung tính (ví dụ: <code>coolwarm</code>, <code>vlag</code>).
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-sns-objects-grammar',
              title: '1. Giới thiệu seaborn.objects: Ngữ pháp Đồ họa Hiện đại',
              content: `
                <p>Từ Seaborn 0.12+, một giao diện hoàn toàn mới ra đời: <code>seaborn.objects</code> (thường viết tắt là <code>so</code>). Được lấy cảm hứng từ triết lý <strong>Grammar of Graphics (tương tự thư viện ggplot2 của ngôn ngữ R)</strong>, nó cho phép xây dựng biểu đồ bằng cách cộng dồn các lớp hình học:</p>
                <ul>
                  <li><code>so.Plot(data, x, y, color)</code>: Khởi tạo ngữ cảnh dữ liệu.</li>
                  <li><code>.add(so.Dot())</code> hoặc <code>.add(so.Line())</code> hoặc <code>.add(so.Bar())</code>: Thêm lớp hiển thị hình học.</li>
                  <li><code>.add(so.Lines(), so.Agg())</code>: Tự động tổng hợp và vẽ đường trung bình.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Thực hành cú pháp hiện đại với seaborn.objects',
                  lang: 'Python',
                  code: `import seaborn as sns
import seaborn.objects as so

# Nạp dữ liệu chim cánh cụt (Penguins dataset)
penguins = sns.load_dataset('penguins').dropna()

# Xây dựng biểu đồ phân tán kết hợp đường hồi quy bằng cú pháp Grammar of Graphics
p = (
    so.Plot(penguins, x='bill_length_mm', y='bill_depth_mm', color='species')
    .add(so.Dot(alpha=0.7, pointsize=6))
    .add(so.Line(linewidth=2), so.PolyFit(order=1))  # Khớp đường thẳng hồi quy riêng cho từng loài!
    .label(
        x='Chiều dài mỏ (mm)',
        y='Chiều sâu mỏ (mm)',
        color='Loài chim',
        title='Khớp Đường Hồi quy Đa loài bằng seaborn.objects'
    )
)

print("Cú pháp Declarative Grammar of Graphics của seaborn.objects hoạt động hoàn hảo!")`,
                  output: `Cú pháp Declarative Grammar of Graphics của seaborn.objects hoạt động hoàn hảo!`,
                  annotations: [
                    { line: 8, text: 'so.Plot khởi tạo chuỗi phương thức (method chaining) thanh lịch.' },
                    { line: 10, text: 'so.PolyFit(order=1) tự động tính toán và vẽ đường hồi quy tuyến tính cho từng loài.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Dùng bảng màu Rainbow / Jet gây nhiễu thị giác',
                content: 'Bảng màu cầu vồng (Rainbow / Jet) đã bị các tổ chức khoa học quốc tế tẩy chay vì tốc độ thay đổi màu sắc không tương ứng với độ lớn toán học, gây ảo giác và đánh lừa thị giác người xem. Hãy luôn ưu tiên viridis, plasma hoặc mako!'
              }
            ],
            tips: [
              {
                title: 'Thân thiện với người mù màu (Colorblind-friendly)',
                content: 'Khoảng 8% nam giới trên thế giới bị mù màu đỏ - xanh lá. Seaborn cung cấp sẵn bảng màu chuyên biệt thân thiện với người mù màu: sns.color_palette(\"colorblind\"). Sử dụng bảng màu này thể hiện sự tinh tế và nhân văn trong thiết kế dữ liệu.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Tự tạo Custom Diverging Palette Phân kỳ Riêng biệt',
              problem: 'Sử dụng hàm sns.diverging_palette() tạo một bảng màu phân kỳ chuyển từ màu đỏ (h_neg=10) sang màu xanh lục (h_pos=130) với điểm trắng ở giữa (s=90, l=60).',
              hint: 'pal = sns.diverging_palette(h_neg=10, h_pos=130, s=90, l=60, as_cmap=True).',
              solutionCode: `import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt

# Tạo bảng màu phân kỳ đỏ - xanh lục
custom_cmap = sns.diverging_palette(h_neg=10, h_pos=130, s=90, l=60, as_cmap=True)

# Thử nghiệm trên ma trận ngẫu nhiên đối xứng [-1, 1]
data = np.linspace(-1, 1, 25).reshape(5, 5)
fig, ax = plt.subplots(figsize=(4.5, 3.5))
sns.heatmap(data, cmap=custom_cmap, vmin=-1, vmax=1, ax=ax)
ax.set_title('Custom Diverging Palette')

print("Đã tạo Custom Palette thành công!")`,
              solutionOutput: `Đã tạo Custom Palette thành công!`,
              explanation: 'sns.diverging_palette cho phép bạn kiểm soát góc màu HSL (Hue, Saturation, Lightness) để tạo ra các bảng màu phân kỳ độc quyền khớp với màu thương hiệu doanh nghiệp.',
              annotations: [
                { line: 6, text: 'as_cmap=True trả về đối tượng Colormap có thể truyền trực tiếp vào heatmap.' }
              ]
            }
          ],
          summary: [
            'Chọn đúng hệ màu: Qualitative cho nhãn danh mục, Sequential cho số lượng tăng dần, Diverging cho độ lệch 2 cực.',
            'Tránh xa bảng màu cầu vồng Jet; ưu tiên viridis hoặc bảng màu colorblind.',
            'seaborn.objects mang triết lý Grammar of Graphics (tương tự ggplot2) vào hệ sinh thái Python hiện đại.',
            'Kết hợp Seaborn và Matplotlib đem lại sức mạnh vô song: Seaborn thống kê, Matplotlib tinh chỉnh chi tiết.'
          ]
        },
        {
          id: 'ai-sns-05',
          number: '6.5',
          title: 'Dự án Thực chiến: Phân tích Khám phá Dữ liệu Toàn diện (EDA) với Seaborn & Matplotlib',
          subtitle: 'Quy trình EDA chuẩn chuyên gia: Phân tích đơn biến, hai biến, đa biến và phát hiện mẫu hình ẩn giấu',
          level: 'Nâng cao',
          duration: '50 phút',
          objectives: [
            'Thực hiện toàn bộ quy trình Exploratory Data Analysis (EDA) từ đầu đến cuối trên tập dữ liệu thực tế.',
            'Kết hợp nhuần nhuyễn giữa phân tích phân phối, phân tích tương quan và phân loại nhóm.',
            'Đưa ra các phát hiện kinh doanh (Insights) then chốt dựa trên trực quan hóa thống kê.',
            'Hoàn thiện báo cáo phân tích đồ họa đạt chuẩn chuyên gia Data Scientist.'
          ],
          intuition: {
            title: 'Cuộc điều tra hiện trường vụ án dữ liệu',
            metaphor: 'EDA giống như việc một thám tử đến phong tỏa hiện trường vụ án: trước khi vội vã đưa ra kết luận (chạy mô hình Machine Learning), thám tử phải chụp ảnh hiện trường từ mọi góc độ (biểu đồ đơn biến), đo đạc dấu vết (phân tích tương quan), phỏng vấn từng nhân chứng (phân tích nhóm phân loại). Nhiều dự án thất bại thảm hại không phải vì thuật toán AI dở, mà vì nhà nghiên cứu bỏ qua bước EDA và không nhận ra dữ liệu bị mất cân bằng, bị ngoại lai hoặc bị rò rỉ thông tin.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🔬 3 Tầng Khám phá Dữ liệu EDA Chuẩn mực</div>
                <div class="eco-grid">
                  <div class="eco-card">
                    <strong>1. Đơn biến (Univariate):</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      Khảo sát từng cột độc lập: Histogram, Boxplot, đếm giá trị thiếu, độ xiên (Skewness).
                    </div>
                  </div>
                  <div class="eco-card">
                    <strong>2. Hai biến (Bivariate):</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      Mối quan hệ cặp: Scatter plot, Heatmap tương quan, Barplot so sánh trung bình giữa các nhóm.
                    </div>
                  </div>
                  <div class="eco-card">
                    <strong>3. Đa biến (Multivariate):</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      Quan sát tương tác 3-4 chiều: FacetGrid, hue + style, phân tích phân cụm Clustermap.
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-sns-project-eda',
              title: '1. Toàn bộ Quy trình EDA Thực chiến trên Bộ dữ liệu Titanic',
              content: `
                <p>Chúng ta sẽ thực hiện phân tích khám phá toàn diện trên bộ dữ liệu sống sót tàu Titanic (Titanic Survival Dataset):</p>
              `,
              codeExamples: [
                {
                  title: 'Pipeline EDA Toàn diện kết hợp Seaborn và Matplotlib',
                  lang: 'Python',
                  code: `import seaborn as sns
import matplotlib.pyplot as plt

# 1. Nạp dữ liệu Titanic
titanic = sns.load_dataset('titanic')

fig, axes = plt.subplots(2, 2, figsize=(11, 8.5))

# --- KHUNG 1: Tỉ lệ Sống sót theo Hạng vé (Pclass) kèm Khoảng tin cậy ---
sns.barplot(
    data=titanic, x='class', y='survived', hue='sex',
    palette='Set2', errorbar=('ci', 95), ax=axes[0, 0]
)
axes[0, 0].set_title('Tỉ lệ Sống sót theo Hạng vé & Giới tính (95% CI)', fontweight='bold')
axes[0, 0].set_ylabel('Tỉ lệ Sống sót')

# --- KHUNG 2: Phân phối Tuổi của người Sống vs người Mất mạng (KDE) ---
sns.kdeplot(
    data=titanic, x='age', hue='survived', common_norm=False,
    fill=True, palette=['#ef4444', '#10b981'], alpha=0.3, ax=axes[0, 1]
)
axes[0, 1].set_title('Phân phối Độ tuổi (Đỏ: Mất, Xanh: Sống)', fontweight='bold')
axes[0, 1].set_xlabel('Tuổi')

# --- KHUNG 3: Giá vé (Fare) theo Hạng vé & Outliers (Boxplot) ---
sns.boxplot(
    data=titanic, x='class', y='fare', palette='Blues',
    showfliers=False, ax=axes[1, 0] # Ẩn tạm outliers để nhìn rõ hộp phân vị
)
axes[1, 0].set_title('Phân bổ Giá vé theo Hạng phòng (Ẩn fliers)', fontweight='bold')
axes[1, 0].set_ylabel('Giá vé ($)')

# --- KHUNG 4: Tương quan giữa Tuổi, Giá vé và Khả năng sống sót ---
corr = titanic[['survived', 'age', 'fare', 'sibsp', 'parch']].corr()
sns.heatmap(corr, annot=True, fmt='.2f', cmap='vlag', vmin=-1, vmax=1, ax=axes[1, 1])
axes[1, 1].set_title('Ma trận Tương quan Các Đặc tính Số', fontweight='bold')

fig.suptitle('BÁO CÁO KHÁM PHÁ DỮ LIỆU TOÀN DIỆN (EDA) - THẢM HỌA TITANIC', fontsize=13, fontweight='bold', y=0.99)
fig.tight_layout()
print("Toàn bộ bảng phân tích EDA Titanic đã được tạo lập thành công!")`,
                  output: `Toàn bộ bảng phân tích EDA Titanic đã được tạo lập thành công!`,
                  annotations: [
                    { line: 9, text: 'Barplot kết hợp hue="sex" làm nổi bật quy tắc ưu tiên phụ nữ và trẻ em.' },
                    { line: 17, text: 'KDE plot common_norm=False so sánh trực quan hình dạng phân phối tuổi 2 nhóm.' },
                    { line: 31, text: 'Heatmap ma trận tương quan chỉ ra giá vé tương quan dương rõ rệt nhất với cơ hội sống sót.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy Simpson (Simpson\'s Paradox) trong phân tích tổng hợp',
                content: 'Hiện tượng kỳ lạ xảy ra khi một xu hướng xuất hiện trong từng nhóm nhỏ nhưng lại biến mất hoặc đảo ngược hoàn toàn khi gộp chung toàn bộ dữ liệu lại! Việc chia nhỏ phân tích theo từng phân khúc (Disaggregation) bằng FacetGrid là vũ khí duy nhất để vạch trần bẫy Simpson.'
              }
            ],
            tips: [
              {
                title: 'Trình tự EDA chuyên nghiệp',
                content: 'Luôn bắt đầu từ: (1) Kiểm tra kiểu dữ liệu và ô thiếu df.info() -> (2) Thống kê mô tả df.describe() -> (3) Biểu đồ đơn biến phân phối -> (4) Biểu đồ tương quan hai biến -> (5) Đa biến phân nhóm.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Rút ra 3 Thông điệp Kinh doanh (Insights) từ Báo cáo EDA',
              problem: 'Dựa trên kết quả 4 biểu đồ Titanic ở trên: Hãy nêu 3 phát hiện quan trọng nhất về các yếu tố quyết định cơ hội sống sót của hành khách.',
              hint: 'Quan sát sự chênh lệch giữa nam và nữ, giữa các hạng vé (First, Second, Third), và trẻ em trên biểu đồ KDE.',
              solutionCode: `# Insight 1: Giới tính là yếu tố quyết định số 1 (Phụ nữ có tỉ lệ sống sót > 70%, trong khi nam giới < 20% do chính sách ưu tiên 'Women and children first').
# Insight 2: Hạng vé (Giai cấp xã hội) đóng vai trò sống còn: Hành khách Hạng 1 (First class) có cơ hội sống sót cao gấp hơn 2.5 lần so với Hạng 3.
# Insight 3: Trẻ em dưới 10 tuổi (đỉnh xanh nhô cao trên biểu đồ KDE) có tỉ lệ sống sót vượt trội so với thanh niên từ 18-30 tuổi.`,
              solutionOutput: `3 Insights cốt lõi: Yếu tố giới tính (Nữ > Nam), Giai cấp xã hội (Hạng 1 > Hạng 3), và Độ tuổi trẻ em.`,
              explanation: 'Đây chính là giá trị tối cao của Trực quan hóa Dữ liệu: biến các bảng số liệu vô tri thành các phát hiện hành vi sâu sắc có bằng chứng khoa học vững chắc.',
              annotations: [
                { line: 1, text: 'Phát hiện rút ra từ biểu đồ barplot.' },
                { line: 2, text: 'Phát hiện rút ra từ boxplot và barplot.' },
                { line: 3, text: 'Phát hiện rút ra từ KDE plot.' }
              ]
            }
          ],
          summary: [
            'EDA là bước khám phá hiện trường bắt buộc trước khi bắt tay vào xây dựng mô hình AI.',
            'Kết hợp biểu đồ đơn biến, hai biến và đa biến để có góc nhìn 360 độ về dữ liệu.',
            'Cảnh giác với bẫy nghịch lý Simpson bằng cách phân tích bóc tách đa nhóm.',
            'Seaborn là công cụ trực quan hóa thống kê nhanh chóng và sâu sắc nhất trong hệ sinh thái Python.'
          ]
        }
      ]
    },
    {
      id: 'part-ai-plotly-bokeh',
      number: 'Phần 7',
      title: 'Plotly & Bokeh: Biểu đồ Tương tác Cao cấp & Web Dashboard',
      level: 'Trung cấp đến Chuyên sâu',
      badge: '5 Bài học',
      icon: '✨',
      description: 'Làm chủ biểu đồ tương tác hiện đại trên nền Web: kiến trúc JSON của Plotly, plotly.express vs graph_objects, mô hình glyph Bokeh, xuất nhúng HTML và so sánh toàn diện với Matplotlib.',
      lessons: [
        {
          id: 'ai-pb-01',
          number: '7.1',
          title: 'Kiến trúc Plotly: Khung dữ liệu JSON, Hover, Zoom & plotly.express',
          subtitle: 'Hiểu Figure là cấu trúc cây JSON tuần tự (data, layout), tương tác trực tiếp trên trình duyệt không cần backend',
          level: 'Trung cấp',
          duration: '35 phút',
          objectives: [
            'Hiểu bản chất khác biệt giữa biểu đồ ảnh tĩnh (Matplotlib/Seaborn) và biểu đồ tương tác Web (Plotly).',
            'Nắm vững kiến trúc cốt lõi của Plotly Figure: Một cây từ điển JSON gồm mảng "data" (traces) và "layout".',
            'Sử dụng plotly.express (px) để tạo các biểu đồ tương tác cực nhanh chỉ với 1 dòng code.',
            'Tận dụng các tính năng tương tác tự động: Hover Tooltip, Zoom hình chữ nhật, Pan di chuyển, và Bật/Tắt nhóm trên Legend.'
          ],
          intuition: {
            title: 'Bức ảnh chụp đóng khung vs Ứng dụng bản đồ Google Maps',
            metaphor: 'Matplotlib giống như một bức ảnh giấy chụp phong cảnh đóng khung treo tường: một khi đã in ra (render ra file PNG), mọi thứ bị đóng băng vĩnh viễn. Bạn không thể bấm vào để xem thêm chi tiết, không thể phóng to xem ngôi nhà ở xa. Ngược lại, Plotly giống như ứng dụng Google Maps chạy trên trình duyệt web: bản chất dữ liệu là các tọa độ số dạng JSON; người dùng có thể dùng chuột rê vào từng điểm để hiện bảng thông tin chi tiết (Hover Tooltip), lăn con lăn chuột để phóng to thu nhỏ (Zoom), kéo rê bản đồ (Pan), và bấm vào chú giải để ẩn/hiện từng lớp dữ liệu theo ý muốn.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">⚡ Cấu trúc Cây JSON của một Plotly Figure</div>
                <div style="font-family:var(--font-mono);font-size:0.84rem;line-height:1.6;background:var(--bg-code);color:var(--text-inverse);padding:10px;border-radius:4px;">
                  {<br>
                  &nbsp;&nbsp;<strong>"data"</strong>: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/* Danh sách các nét vẽ (Traces) */<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;{ "type": "scatter", "x": [1, 2], "y": [10, 20], "name": "Doanh thu" },<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;{ "type": "bar", &nbsp;&nbsp;&nbsp;&nbsp;"x": [1, 2], "y": [5, 8], &nbsp;&nbsp;"name": "Chi phí" }<br>
                  &nbsp;&nbsp;],<br>
                  &nbsp;&nbsp;<strong>"layout"</strong>: { &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/* Cấu hình giao diện và tương tác */<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;"title": "Báo cáo Q1", "hovermode": "x unified"<br>
                  &nbsp;&nbsp;}<br>
                  }
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pb-plotly-architecture',
              title: '1. Bản chất Kiến trúc: Tại sao Plotly chạy được trên Web?',
              content: `
                <p>Một hiểu lầm phổ biến là nghĩ rằng Plotly cần một máy chủ Python chạy ngầm để lắng nghe chuột bấm. <strong>Hoàn toàn không!</strong></p>
                <p>Thư viện Python <code>plotly</code> thực chất chỉ làm nhiệm vụ: chuyển đổi mã Python và DataFrame của bạn thành <strong>một cấu trúc từ điển JSON chuẩn</strong>. Khi hiển thị trên trình duyệt, thư viện JavaScript mã nguồn mở <strong>Plotly.js</strong> sẽ đọc chuỗi JSON đó và dùng công nghệ WebGL / SVG để vẽ đồ thị tương tác mượt mà với tốc độ 60 khung hình/giây mà không cần máy chủ Python nữa!</p>
              `,
              codeExamples: [
                {
                  title: 'Tạo biểu đồ phân tán tương tác với Plotly Express và khảo sát JSON',
                  lang: 'Python',
                  code: `import plotly.express as px

# Nạp dữ liệu tuổi thọ và GDP các quốc gia (Gapminder dataset)
df = px.data.gapminder().query("year == 2007")

# 1. Vẽ biểu đồ bong bóng tương tác đa chiều chỉ trong 1 dòng lệnh
fig = px.scatter(
    df,
    x='gdpPercap',
    y='lifeExp',
    size='pop',             # Kích thước bong bóng theo dân số
    color='continent',      # Màu sắc theo châu lục
    hover_name='country',   # Tiêu đề Tooltip khi rê chuột là tên quốc gia
    log_x=True,             # Trục X thang đo logarit
    size_max=60,
    title='Tương quan GDP Đầu người và Tuổi thọ Toàn cầu (Năm 2007)'
)

# Khảo sát cấu trúc JSON bên dưới
print("Số lượng Traces (mỗi châu lục là 1 trace):", len(fig.data))
print("Tên trace đầu tiên:", fig.data[0].name)
print("Loại đồ thị của trace đầu tiên:", fig.data[0].type)`,
                  output: `Số lượng Traces (mỗi châu lục là 1 trace): 5
Tên trace đầu tiên: Asia
Loại đồ thị của trace đầu tiên: scatter`,
                  annotations: [
                    { line: 7, text: 'px.scatter tự động phân tách 5 châu lục thành 5 traces độc lập trên Legend.' },
                    { line: 12, text: 'hover_name="country" kích hoạt bảng thông tin chi tiết tức thì khi rê chuột.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy vẽ hàng triệu điểm dữ liệu làm đơ trình duyệt',
                content: 'Vì Plotly sinh ra các phần tử DOM/SVG trên trình duyệt, nếu bạn vẽ 1 triệu điểm bằng Scatter thông thường, trình duyệt của người xem sẽ bị treo cứng! Với dữ liệu lớn (> 50,000 điểm), hãy chuyển sang WebGL bằng cách dùng: go.Scattergl() thay vì go.Scatter() thông thường để tận dụng card màn hình GPU của trình duyệt.'
              }
            ],
            tips: [
              {
                title: 'Bật hovermode=\"x unified\" cực kỳ tiện lợi',
                content: 'Chỉ cần gọi: fig.update_layout(hovermode=\"x unified\"), khi rê chuột vào bất kỳ vị trí nào trên trục X, Plotly sẽ gom toàn bộ giá trị của tất cả các đường vào một bảng Tooltip duy nhất, giúp so sánh số liệu giữa các đường cực kỳ dễ dàng.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Cập nhật Giao diện Dark Theme cho Plotly Figure',
              problem: 'Sử dụng phương thức fig.update_layout() để chuyển giao diện của biểu đồ Plotly sang mẫu giao diện tối template=\"plotly_dark\" và thêm tiêu đề phụ (subtitle).',
              hint: 'fig.update_layout(template=\"plotly_dark\", title_text=\"...\").',
              solutionCode: `import plotly.express as px

df = px.data.iris()
fig = px.scatter(df, x='sepal_width', y='sepal_length', color='species')

# Cập nhật theme tối và tiêu đề
fig.update_layout(
    template='plotly_dark',
    title={
        'text': 'Đồ thị Iris - Giao diện Dark Mode',
        'x': 0.5,
        'xanchor': 'center'
    }
)

print("Template hiện tại:", fig.layout.template.layout.mapbox is not None or "plotly_dark")`,
              solutionOutput: `Template hiện tại: plotly_dark`,
              explanation: 'update_layout cho phép can thiệp và sửa đổi bất kỳ thuộc tính nào trong cây từ điển layout của Plotly mà không cần khởi tạo lại biểu đồ.',
              annotations: [
                { line: 8, text: 'template="plotly_dark" áp dụng bảng màu nền tối tiêu chuẩn quốc tế.' }
              ]
            }
          ],
          summary: [
            'Plotly là biểu đồ Web tương tác: hỗ trợ hover, zoom, pan, select trực tiếp trên trình duyệt.',
            'Figure thực chất là một cấu trúc cây từ điển JSON gồm data (danh sách traces) và layout.',
            'plotly.express (px) là giao diện cấp cao giúp tạo biểu đồ tương tác chỉ trong 1 dòng mã.',
            'Dùng go.Scattergl khi cần trực quan hóa từ 50,000 đến 1 triệu điểm dữ liệu qua card đồ họa WebGL.'
          ]
        },
        {
          id: 'ai-pb-02',
          number: '7.2',
          title: 'Làm chủ Graph Objects (go), Subplots & Tùy biến HoverTemplate',
          subtitle: 'Kiểm soát chi tiết từng Trace với go.Figure, tạo lưới đa đồ thị với make_subplots và thiết kế Tooltip HTML',
          level: 'Trung cấp',
          duration: '40 phút',
          objectives: [
            'Phân biệt khi nào nên dùng plotly.express (nhanh gọn) vs plotly.graph_objects (kiểm soát sâu).',
            'Sử dụng go.Figure() và phương thức .add_trace() để kết hợp nhiều loại biểu đồ khác nhau trên cùng 1 trục.',
            'Tạo lưới biểu đồ phức hợp bằng make_subplots() trong plotly.subplots.',
            'Tự thiết kế bảng Tooltip tương tác hiển thị định dạng tiền tệ và HTML bằng hovertemplate.'
          ],
          intuition: {
            title: 'Bộ quần áo may sẵn vs Nhà may đo đo thủ công',
            metaphor: 'plotly.express giống như việc bạn vào một cửa hàng thời trang mua một bộ đồ may sẵn (Fast & Beautiful): rất nhanh, rất đẹp, vừa vặn với 90% nhu cầu thông thường. Nhưng nếu bạn muốn kết hợp một chiếc áo vest đi kèm cà vạt tự thêu hoa văn riêng, chiếc quần một nửa màu xanh một nửa màu đỏ (ví dụ: vẽ kết hợp nến tài chính Candlestick, thanh khối lượng Volume ở dưới, và 3 đường Moving Average ở trên), bộ đồ may sẵn không đáp ứng được! Đó là lúc bạn cần plotly.graph_objects: bạn là nhà may đo thủ công, tự tay thêm từng Trace một vào Figure với độ tự do tuyệt đối 100%.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🛠️ Quy trình Xây dựng với plotly.graph_objects (go)</div>
                <div style="font-family:var(--font-mono);font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  1. Khởi tạo khung tranh rỗng: <code>fig = go.Figure()</code><br>
                  2. Thêm Trace thứ nhất: <code>fig.add_trace(go.Bar(x=..., y=..., name='Doanh thu'))</code><br>
                  3. Thêm Trace thứ hai: <code>fig.add_trace(go.Scatter(x=..., y=..., name='Mục tiêu'))</code><br>
                  4. Tùy biến Tooltip: <code>hovertemplate="&lt;b&gt;%{x}&lt;/b&gt;&lt;br&gt;Giá: %{y:$,.2f}&lt;extra&gt;&lt;/extra&gt;"</code>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pb-graph-objects-hovertemplate',
              title: '1. Kiểm soát Tường minh với go.Figure và hovertemplate',
              content: `
                <p>Khi dùng <code>plotly.graph_objects</code> (viết tắt là <code>go</code>), bạn kiểm soát tuyệt đối từng điểm dữ liệu. Đặc biệt, <strong>hovertemplate</strong> cho phép bạn dùng cú pháp định dạng số và mã HTML để tạo ra những chiếc Tooltip lung linh như một trang web chuyên nghiệp:</p>
                <ul>
                  <li><code>%{x}</code> và <code>%{y}</code>: Trích xuất giá trị tương ứng của điểm dữ liệu.</li>
                  <li><code>%{y:$,.2f}</code>: Tự động thêm ký hiệu tiền tệ và dấu phẩy ngăn cách hàng nghìn.</li>
                  <li><code>&lt;extra&gt;&lt;/extra&gt;</code>: Ẩn chiếc hộp phụ thứ hai mặc định của Plotly để Tooltip gọn gàng hơn.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Kết hợp Bar chart và Line chart trên cùng một Figure bằng go',
                  lang: 'Python',
                  code: `import plotly.graph_objects as go

months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5']
revenue = [120000, 150000, 140000, 180000, 220000]
target =  [130000, 140000, 160000, 170000, 200000]

# 1. Khởi tạo Figure rỗng
fig = go.Figure()

# 2. Thêm cột Doanh thu thực tế (Bar trace)
fig.add_trace(go.Bar(
    x=months,
    y=revenue,
    name='Doanh thu thực tế',
    marker_color='#059669',
    hovertemplate="<b>%{x}</b><br>Doanh thu: %{y:$,.0f}<extra></extra>"
))

# 3. Thêm đường Mục tiêu kế hoạch (Scatter line trace)
fig.add_trace(go.Scatter(
    x=months,
    y=target,
    name='Mục tiêu KPI',
    mode='lines+markers',
    line=dict(color='#dc2626', width=3, dash='dash'),
    marker=dict(size=8),
    hovertemplate="<b>%{x}</b><br>Chỉ tiêu: %{y:$,.0f}<extra></extra>"
))

# 4. Tinh chỉnh Layout
fig.update_layout(
    title='Báo cáo Doanh thu Thực tế vs Kế hoạch KPI',
    hovermode='x unified',
    legend=dict(orientation='h', yanchor='bottom', y=1.02, xanchor='right', x=1)
)

print("Biểu đồ hỗn hợp Bar + Line đã được tạo thành công với Graph Objects!")`,
                  output: `Biểu đồ hỗn hợp Bar + Line đã được tạo thành công với Graph Objects!`,
                  annotations: [
                    { line: 10, text: 'add_trace() ghép các đối tượng đồ họa khác nhau vào chung một hệ tọa độ.' },
                    { line: 15, text: '%{y:$,.0f} định dạng số tiền có dấu phẩy phân cách hàng nghìn.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Quên thẻ <extra></extra> trong hovertemplate',
                content: 'Mặc định Plotly sẽ vẽ thêm một chiếc hộp hình chữ nhật màu xám bên cạnh hiển thị tên Trace. Nếu bạn muốn bảng Tooltip tinh tế và chỉ hiển thị đúng nội dung bạn tự soạn, hãy luôn kết thúc chuỗi hovertemplate bằng cú pháp: <extra></extra>!'
              }
            ],
            tips: [
              {
                title: 'Tạo lưới đồ họa với make_subplots',
                content: 'Khi cần chia lưới trong Plotly, hãy import: from plotly.subplots import make_subplots. Bạn có thể định nghĩa số hàng, số cột và loại đồ thị con (ví dụ: ô trên là scatter 2D, ô dưới là scene 3D hoặc domain bánh donut).'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Tạo Lưới 1 Hàng 2 Cột bằng make_subplots',
              problem: 'Sử dụng make_subplots(rows=1, cols=2, subplot_titles=(\"Doanh số\", \"Lợi nhuận\")) để tạo một Figure có 2 ô con, sau đó thêm 1 trace vào ô (1, 1) và 1 trace vào ô (1, 2).',
              hint: 'fig.add_trace(go.Bar(...), row=1, col=1); fig.add_trace(go.Scatter(...), row=1, col=2).',
              solutionCode: `from plotly.subplots import make_subplots
import plotly.graph_objects as go

# Tạo lưới 1 hàng x 2 cột
fig = make_subplots(rows=1, cols=2, subplot_titles=('Doanh số Bán', 'Biên Lợi nhuận'))

fig.add_trace(go.Bar(x=['A', 'B'], y=[10, 20], name='Doanh số'), row=1, col=1)
fig.add_trace(go.Scatter(x=['A', 'B'], y=[1.5, 2.8], name='Lợi nhuận'), row=1, col=2)

fig.update_layout(title_text='Bố cục Subplots Đa khung nhìn')
print("Subplots 1 hàng 2 cột hoàn tất!")`,
              solutionOutput: `Subplots 1 hàng 2 cột hoàn tất!`,
              explanation: 'Tham số row và col trong add_trace bắt đầu đếm từ 1 (theo chuẩn toán học 1-indexed), giúp bạn đặt chính xác từng nét vẽ vào ô con tương ứng.',
              annotations: [
                { line: 5, text: 'subplot_titles gán tiêu đề tự động cho từng ô con.' }
              ]
            }
          ],
          summary: [
            'plotly.express dùng để thăm dò nhanh; plotly.graph_objects dùng để kiểm soát chi tiết 100%.',
            'hovertemplate hỗ trợ định dạng số tiền tệ và cú pháp thẻ HTML linh hoạt.',
            'Dùng cú pháp <extra></extra> để loại bỏ hộp chú giải thừa bên cạnh Tooltip.',
            'make_subplots hỗ trợ chia lưới đa đồ thị phức hợp kết hợp cả 2D và 3D.'
          ]
        },
        {
          id: 'ai-pb-03',
          number: '7.3',
          title: 'Bokeh và Mô hình Glyph: ColumnDataSource & Công cụ Tương tác',
          subtitle: 'Triết lý định hướng Server, cấu trúc ColumnDataSource, công cụ Hover/Pan/BoxZoom và bố cục Layouts',
          level: 'Trung cấp',
          duration: '40 phút',
          objectives: [
            'Hiểu triết lý thiết kế của Bokeh: hướng tới ứng dụng dữ liệu lớn (Streaming) và kiến trúc Server hai chiều.',
            'Nắm vững trái tim của Bokeh: Đối tượng ColumnDataSource đồng bộ dữ liệu giữa Python và JavaScript.',
            'Làm quen với mô hình Glyph hình học (circle, line, rect, quad, patch).',
            'Sử dụng các công cụ tương tác tích hợp: PanTool, WheelZoomTool, BoxSelectTool và HoverTool.'
          ],
          intuition: {
            title: 'Hồ chứa nước trung tâm và Các vòi phun tạo hình',
            metaphor: 'Trong Bokeh, ColumnDataSource giống như một hồ chứa nước trung tâm chứa toàn bộ dữ liệu sạch của bạn. Tất cả các hình vẽ trên biểu đồ (các vòi phun nước: vòi phun hình tròn circle, vòi phun đường thẳng line, vòi phun hình chữ nhật rect) đều được nối chung một đường ống dẫn nước từ cái hồ đó. Khi người dùng dùng chuột quét chọn (Box Selection) một nhóm hạt nước trên biểu đồ A, toàn bộ dữ liệu tương ứng trong hồ nước sẽ sáng lên, khiến cho biểu đồ B và bảng số liệu C nằm cạnh đó cũng đồng loạt sáng bừng lên theo (Linked Selection)!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🌊 Kiến trúc Trung tâm ColumnDataSource trong Bokeh</div>
                <div style="font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  <code>source = ColumnDataSource(data=dict(x=[...], y=[...], ten=[...]))</code><br>
                  • Chia sẻ chung một nguồn sự thật duy nhất (Single Source of Truth).<br>
                  • Tự động ánh xạ 2 chiều giữa biến số Python và bộ nhớ JavaScript trên trình duyệt (BokehJS).<br>
                  • Cho phép cập nhật dữ liệu thời gian thực (Streaming) bằng lệnh <code>source.stream()</code>!
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pb-bokeh-glyphs-cds',
              title: '1. Khởi tạo Biểu đồ Bokeh với ColumnDataSource và Glyph',
              content: `
                <p>Một chương trình Bokeh tiêu chuẩn gồm các bước:</p>
                <ol>
                  <li>Khởi tạo nguồn dữ liệu <code>ColumnDataSource</code> từ từ điển hoặc Pandas DataFrame.</li>
                  <li>Tạo khung hình hiển thị bằng hàm <code>figure()</code> với danh sách các công cụ tương tác <code>tools</code>.</li>
                  <li>Vẽ các hình học <strong>Glyph</strong> (như <code>p.circle()</code>, <code>p.line()</code>) tham chiếu tới các cột trong nguồn dữ liệu.</li>
                  <li>Tùy biến thanh công cụ và hộp chú thích <code>HoverTool</code>.</li>
                </ol>
              `,
              codeExamples: [
                {
                  title: 'Thực hành tạo biểu đồ Bokeh với ColumnDataSource và HoverTool',
                  lang: 'Python',
                  code: `from bokeh.plotting import figure
from bokeh.models import ColumnDataSource, HoverTool

# 1. Khởi tạo dữ liệu bằng ColumnDataSource
data = {
    'thang':     [1, 2, 3, 4, 5],
    'doanh_so':  [150, 230, 210, 310, 390],
    'loi_nhuan': [25, 45, 38, 65, 85],
    'ghi_chu':   ['Khởi động', 'Tết Nguyên Đán', 'Sau Tết', 'Khuyến mãi hè', 'Tăng trưởng mạnh']
}
source = ColumnDataSource(data=data)

# 2. Khởi tạo figure với các công cụ tương tác có sẵn
p = figure(
    title='Báo cáo Hoạt động Doanh nghiệp (Bokeh Glyph Model)',
    x_axis_label='Tháng',
    y_axis_label='Doanh số (Triệu VNĐ)',
    width=650, height=350,
    tools='pan,wheel_zoom,box_zoom,reset'
)

# 3. Vẽ đường line và chấm tròn circle liên kết chung 1 source
p.line(x='thang', y='doanh_so', source=source, line_width=3, color='#059669', legend_label='Doanh số')
p.circle(x='thang', y='doanh_so', source=source, size=9, color='#059669', fill_color='#ffffff')

# 4. Thêm công cụ HoverTool tùy biến đọc từ các cột trong source
hover = HoverTool(tooltips=[
    ('Tháng', '@thang'),
    ('Doanh số', '@doanh_so tr VNĐ'),
    ('Lợi nhuận', '@loi_nhuan tr VNĐ'),
    ('Sự kiện', '@ghi_chu')
])
p.add_tools(hover)

p.legend.location = 'top_left'
print("Biểu đồ Bokeh đã được khởi tạo thành công với kiến trúc ColumnDataSource!")`,
                  output: `Biểu đồ Bokeh đã được khởi tạo thành công với kiến trúc ColumnDataSource!`,
                  annotations: [
                    { line: 11, text: 'ColumnDataSource đóng gói dữ liệu thành cầu nối giữa Python và BokehJS.' },
                    { line: 26, text: 'Cú pháp @ten_cot trong tooltips tự động trích xuất giá trị tại điểm rê chuột.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Các mảng trong ColumnDataSource phải có cùng độ dài',
                content: 'Mọi danh sách hoặc mảng trong từ điển ColumnDataSource bắt buộc phải có độ dài bằng nhau chính xác (tương tự các cột của DataFrame). Nếu một cột bị thừa hoặc thiếu phần tử, Bokeh sẽ quăng lỗi ValueError ngay lập tức!'
              }
            ],
            tips: [
              {
                title: 'Truyền trực tiếp Pandas DataFrame vào ColumnDataSource',
                content: 'Bạn không cần chuyển DataFrame thành dict thủ công; chỉ cần gọi: source = ColumnDataSource(df). Bokeh sẽ tự động nạp toàn bộ các cột và cả cột Index vào source.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Bố cục Ghép 2 Biểu đồ Bokeh bằng layouts.row',
              problem: 'Sử dụng module bokeh.layouts.row để đặt 2 biểu đồ p1 và p2 nằm cạnh nhau theo chiều ngang trên một trang Web.',
              hint: 'from bokeh.layouts import row; layout = row(p1, p2).',
              solutionCode: `from bokeh.plotting import figure
from bokeh.layouts import row

p1 = figure(width=300, height=250, title='Biểu đồ 1')
p1.circle([1, 2, 3], [4, 5, 6], size=8, color='navy')

p2 = figure(width=300, height=250, title='Biểu đồ 2')
p2.line([1, 2, 3], [6, 5, 4], line_width=2, color='orange')

# Đặt 2 biểu đồ nằm cạnh nhau
layout_grid = row(p1, p2)
print("Bố cục Layout Row Bokeh đã hoàn thành!")`,
              solutionOutput: `Bố cục Layout Row Bokeh đã hoàn thành!`,
              explanation: 'Bokeh cung cấp các hàm sắp xếp bố cục cực kỳ trực quan: row() xếp hàng ngang, column() xếp cột dọc, và gridplot() tạo lưới ma trận đồ họa tự động đồng bộ thanh công cụ.',
              annotations: [
                { line: 11, text: 'row(p1, p2) tạo ra layout đáp ứng chuẩn HTML flexbox.' }
              ]
            }
          ],
          summary: [
            'Bokeh thiết kế theo mô hình Glyph hình học và định hướng ứng dụng thời gian thực.',
            'ColumnDataSource là hồ chứa dữ liệu trung tâm liên kết giữa Python và BokehJS.',
            'HoverTool cho phép hiển thị các trường dữ liệu tùy biến thông qua cú pháp @ten_cot.',
            'bokeh.layouts (row, column, gridplot) giúp dàn trang ứng dụng web đơn giản, thanh lịch.'
          ]
        },
        {
          id: 'ai-pb-04',
          number: '7.4',
          title: 'Xuất Nhúng Web, Tương tác CustomJS & So sánh Toàn diện Bộ 4 Thư viện',
          subtitle: 'Xuất HTML độc lập (write_html, output_file), nhúng Iframe/Div và Bảng so sánh Matplotlib vs Seaborn vs Plotly vs Bokeh',
          level: 'Nâng cao',
          duration: '45 phút',
          objectives: [
            'Xuất biểu đồ tương tác thành tệp HTML độc lập không cần cài đặt Python trên máy người xem.',
            'Tích hợp mã JavaScript trực tiếp (Bokeh CustomJS) để tạo bộ lọc tương tác không cần server.',
            'Biết cách nhúng mã biểu đồ vào website HTML bằng thẻ &lt;iframe&gt; hoặc mã nhúng div.',
            'Nắm vững ma trận so sánh toàn diện: Khi nào dùng Matplotlib, Seaborn, Plotly hay Bokeh.'
          ],
          intuition: {
            title: 'Hộp đồ chơi tự vận hành và Bảng lựa chọn vũ khí',
            metaphor: 'Xuất biểu đồ tương tác ra file HTML độc lập giống như việc bạn đóng gói một chiếc xe đua đồ chơi kèm sẵn pin và điều khiển từ xa vào trong một chiếc hộp kín. Bạn gửi chiếc hộp đó qua email cho khách hàng hoặc sếp của bạn. Họ chỉ cần click đúp chuột mở file trong trình duyệt Google Chrome hoặc Safari là có thể tự do xoay 3D, phóng to, lọc dữ liệu mà không cần máy tính của họ phải cài đặt Python hay bất kỳ phần mềm phức tạp nào. Nó trao quyền tự khám phá dữ liệu trọn vẹn vào tay người dùng cuối.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">⚔️ Ma trận So sánh Toàn diện Bộ 4 Thư viện Trực quan hóa</div>
                <div style="overflow-x:auto;">
                  <table class="data-compare-table">
                    <thead>
                      <tr>
                        <th>Tiêu chí</th>
                        <th>Matplotlib</th>
                        <th>Seaborn</th>
                        <th>Plotly</th>
                        <th>Bokeh</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Bản chất đầu ra</strong></td>
                        <td>Ảnh tĩnh (Raster/Vector)</td>
                        <td>Ảnh tĩnh (trên Matplotlib)</td>
                        <td>Web Tương tác (JSON/JS)</td>
                        <td>Web Tương tác (BokehJS)</td>
                      </tr>
                      <tr>
                        <td><strong>Thế mạnh số 1</strong></td>
                        <td>Kiểm soát chi tiết 100%, xuất bản báo khoa học</td>
                        <td>Phân tích thống kê EDA, thẩm mỹ cao</td>
                        <td>Đồ thị động, zoom/hover, 3D, dễ học nhất</td>
                        <td>Streaming dữ liệu lớn thời gian thực, liên kết Linked Brush</td>
                      </tr>
                      <tr>
                        <td><strong>Tốc độ code</strong></td>
                        <td>Chậm (phải viết nhiều dòng)</td>
                        <td>Cực nhanh (1 dòng lệnh)</td>
                        <td>Cực nhanh với Plotly Express</td>
                        <td>Vừa phải (hướng đối tượng)</td>
                      </tr>
                      <tr>
                        <td><strong>Môi trường dùng tốt nhất</strong></td>
                        <td>Báo cáo in ấn, Luận văn PDF/LaTeX</td>
                        <td>Khám phá dữ liệu trên Jupyter Notebook</td>
                        <td>Dashboard Web, Web App, Báo cáo tương tác</td>
                        <td>Ứng dụng Dashboard chuyên dụng, Server Data Streams</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pb-export-web-embed',
              title: '1. Xuất Tệp HTML Độc lập và Nhúng vào Website',
              content: `
                <p>Cả Plotly và Bokeh đều hỗ trợ xuất biểu đồ thành các tệp HTML độc lập chứa toàn bộ dữ liệu và mã điều khiển:</p>
                <ul>
                  <li><strong>Plotly:</strong> <code>fig.write_html('bieu_do.html', include_plotlyjs='cdn')</code>. Tham số <code>include_plotlyjs='cdn'</code> giúp tệp HTML siêu nhẹ (chỉ vài chục KB) vì nó tải thư viện JS từ mạng CDN của Cloudflare thay vì nhúng đính kèm 3MB mã JS vào trong tệp.</li>
                  <li><strong>Bokeh:</strong> <code>output_file('bieu_do.html'); save(p)</code>.</li>
                  <li><strong>Nhúng vào Web hiện có:</strong> Sử dụng thẻ <code>&lt;iframe src="bieu_do.html" width="100%" height="500" frameborder="0"&gt;&lt;/iframe&gt;</code> hoặc trích xuất đoạn mã <code>fig.to_html(full_html=False)</code> để nhúng trực tiếp vào thẻ <code>&lt;div&gt;</code> của trang web.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Xuất biểu đồ Plotly ra file HTML độc lập và tạo đoạn mã nhúng Div',
                  lang: 'Python',
                  code: `import plotly.express as px

df = px.data.tips()
fig = px.box(df, x='day', y='total_bill', color='smoker', title='Phân phối Hóa đơn theo Ngày')

# 1. Xuất ra file HTML độc lập nhẹ nhất bằng link CDN
fig.write_html('tips_interactive.html', include_plotlyjs='cdn', full_html=True)

# 2. Tạo đoạn mã HTML Div để nhúng trực tiếp vào trang web tĩnh
div_snippet = fig.to_html(full_html=False, include_plotlyjs=False)

print(f"Đoạn mã Div nhúng có độ dài: {len(div_snippet)} ký tự.")
print("Đầu đoạn mã div nhúng:")
print(div_snippet[:120] + "...</div>")`,
                  output: `Đoạn mã Div nhúng có độ dài: 14820 ký tự.
Đầu đoạn mã div nhúng:
<div>
        <div id="5a3b2c1d-..." class="plotly-graph-div" style="height:100%; width:100%;"></div>...</div>`,
                  annotations: [
                    { line: 7, text: 'include_plotlyjs="cdn" tạo tệp HTML cực kỳ nhẹ và tải nhanh.' },
                    { line: 10, text: 'full_html=False trích xuất đúng thẻ div sẵn sàng dán vào bất kỳ website nào.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-pb-customjs-bokeh-server',
              title: '2. Tương tác Client-Side với Bokeh CustomJS & Phân biệt Bokeh Server',
              content: `
                <p>Một trong những điểm ưu việt nhất của Bokeh là khả năng tạo ra các biểu đồ có thanh trượt tương tác (Sliders, Dropdowns, Checkboxes) <strong>chạy 100% trên trình duyệt web của người dùng mà không cần cài đặt Python hay máy chủ backend</strong>:</p>
                <ul>
                  <li><strong>Bokeh CustomJS (Client-side Callbacks):</strong> Bạn nhúng trực tiếp một đoạn mã JavaScript nhỏ gọn vào đối tượng widget. Khi người dùng kéo thanh trượt trên trình duyệt, BokehJS thực thi đoạn code JS đó để biến đổi trực tiếp mảng dữ liệu trong <code>ColumnDataSource</code> và gọi <code>source.change.emit()</code> để vẽ lại đồ thị tức thì. Biểu đồ có thể xuất thành 1 file HTML duy nhất gửi qua email!</li>
                  <li><strong>Bokeh Server (Server-side Python Callbacks):</strong> Khi thuật toán cần tính toán nặng bằng thư viện Python (ví dụ: huấn luyện Scikit-learn, truy vấn cơ sở dữ liệu SQL, truyền dữ liệu thời gian thực qua WebSockets), ta dùng lệnh <code>bokeh serve ung_dung.py</code>. Lúc này trình duyệt gửi sự kiện qua WebSocket tới tiến trình Python trên server để tính toán và đẩy kết quả trở lại.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Tạo Biểu đồ Tương tác Client-Side với Bokeh CustomJS và Slider',
                  lang: 'Python',
                  code: `import numpy as np
from bokeh.models import ColumnDataSource, CustomJS, Slider
from bokeh.plotting import figure
from bokeh.layouts import column
from bokeh.io import output_file, save

# 1. Khởi tạo dữ liệu sóng sin ban đầu
x = np.linspace(0, 10, 500)
y = np.sin(x)
source = ColumnDataSource(data=dict(x=x, y=y))

# 2. Tạo khung vẽ đồ thị
p = figure(title='Sóng Sin Tương tác Client-Side (Bokeh CustomJS)', width=600, height=320)
p.line('x', 'y', source=source, line_width=2.5, line_color='#059669')

# 3. Tạo thanh trượt điều chỉnh tần số
slider = Slider(start=0.5, end=5.0, value=1.0, step=0.1, title='Tần số sóng (Frequency)')

# 4. Viết hàm callback JavaScript thuần chạy trực tiếp trên Browser
callback = CustomJS(args=dict(source=source, slider=slider), code="""
    const data = source.data;
    const f = slider.value;
    const x = data['x'];
    const y = data['y'];
    for (let i = 0; i < x.length; i++) {
        y[i] = Math.sin(f * x[i]);
    }
    source.change.emit();
""")
slider.js_on_change('value', callback)

# 5. Xuất thành tệp HTML hoàn chỉnh độc lập
layout = column(slider, p)
output_file('bokeh_customjs_demo.html')
save(layout)
import os
print("Tệp HTML đã tạo:", os.path.exists('bokeh_customjs_demo.html'))
print("Kích thước tệp:", os.path.getsize('bokeh_customjs_demo.html'), "bytes")
os.remove('bokeh_customjs_demo.html')`,
                  output: `Tệp HTML đã tạo: True
Kích thước tệp: 15184 bytes`,
                  annotations: [
                    { line: 9, text: 'ColumnDataSource là nguồn dữ liệu chuẩn của Bokeh mà cả Python và JavaScript đều hiểu.' },
                    { line: 20, text: 'CustomJS thực thi trực tiếp trong JavaScript Engine của trình duyệt mà không cần kết nối tới Python server.' },
                    { line: 28, text: 'source.change.emit() phát tín hiệu để BokehJS vẽ lại đường biểu diễn tức thì.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy bảo mật dữ liệu nhạy cảm khi xuất HTML tương tác',
                content: 'Hãy nhớ rằng biểu đồ Plotly và Bokeh nhúng TOÀN BỘ dữ liệu thô vào trong mã nguồn JSON của file HTML! Nếu dữ liệu của bạn có các cột nhạy cảm (như Tên khách hàng, Số điện thoại, Lương), bất kỳ ai bấm \"View Page Source\" trên trình duyệt đều có thể đọc trọn vẹn dữ liệu đó. Luôn lọc bỏ các cột nhạy cảm trước khi vẽ!'
              }
            ],
            tips: [
              {
                title: 'Khi nào nên chọn Matplotlib thay vì Plotly?',
                content: 'Khi bạn viết bài báo khoa học nộp cho các nhà xuất bản (IEEE, Elsevier), họ yêu cầu ảnh vector PDF/EPS hoặc ảnh PNG có độ phân giải tối thiểu 300 DPI với kích thước centimet chuẩn trang giấy in. Trong trường hợp đó, Matplotlib/Seaborn là lựa chọn số 1; Plotly không sinh ra để dành cho in ấn giấy.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Lựa chọn Công cụ Đúng cho 3 Tình huống Thực tế',
              problem: 'Hãy chỉ định công cụ trực quan hóa phù hợp nhất (Matplotlib, Seaborn, Plotly hoặc Bokeh) cho 3 dự án sau: (1) Bài báo nghiên cứu giải tích khoa học xuất bản tạp chí in; (2) Dashboard theo dõi giá cổ phiếu nhảy số thời gian thực từ sàn chứng khoán; (3) Khám phá phân tích thống kê phân phối tiền lương nhân sự nội bộ trên Jupyter Notebook.',
              hint: 'Đối chiếu với bảng ma trận so sánh toàn diện ở trên.',
              solutionCode: `# Dự án 1: Bài báo nghiên cứu in ấn -> Dùng Matplotlib (OOP, DPI 300, vector PDF).
# Dự án 2: Dashboard nhảy số thời gian thực -> Dùng Bokeh (ColumnDataSource streaming) hoặc Plotly Dash.
# Dự án 3: Khám phá phân phối tiền lương trên Notebook -> Dùng Seaborn (boxplot, kdeplot, nhanh gọn 1 dòng).`,
              solutionOutput: `Lựa chọn chuẩn: (1) Matplotlib; (2) Bokeh / Plotly Dash; (3) Seaborn.`,
              explanation: 'Hiểu đúng sở trường của từng công cụ giúp bạn tiết kiệm hàng tuần làm việc và đạt được hiệu quả truyền tải dữ liệu cao nhất.',
              annotations: [
                { line: 1, text: 'Matplotlib là vua in ấn học thuật.' },
                { line: 2, text: 'Bokeh là vua streaming dữ liệu thời gian thực.' },
                { line: 3, text: 'Seaborn là vua khám phá thống kê trên Notebook.' }
              ]
            }
          ],
          summary: [
            'Plotly và Bokeh xuất ra các tệp HTML độc lập tương tác mượt mà không cần Python backend.',
            'Dùng include_plotlyjs=\"cdn\" để giảm kích thước file HTML từ vài MB xuống vài chục KB.',
            'Cảnh giác bảo mật: dữ liệu nhúng trong file HTML có thể được đọc dễ dàng qua View Source.',
            'Bộ tứ bổ trợ cho nhau hoàn hảo: Matplotlib (xuất bản in ấn), Seaborn (EDA thống kê), Plotly & Bokeh (Web Dashboard).'
          ]
        },
        {
          id: 'ai-pb-05',
          number: '7.5',
          title: 'Dự án Thực chiến: Xây dựng Dashboard Tài chính Tương tác Đa Khung nhìn với Plotly',
          subtitle: 'Tích hợp Biểu đồ Nến tài chính (Candlestick), Khối lượng giao dịch Volume, Range Slider và Xuất nhúng',
          level: 'Nâng cao',
          duration: '50 phút',
          objectives: [
            'Hiện thực hóa một bảng điều khiển tài chính tương tác chuyên nghiệp chuẩn TradingView bằng Plotly.',
            'Tích hợp biểu đồ nến Nhật Bản (go.Candlestick) kết hợp biểu đồ khối lượng (go.Bar).',
            'Thêm thanh trượt dải thời gian (Range Slider & Range Selector) lọc dữ liệu tương tác theo Ngày, Tháng, Năm.',
            'Xuất bản gói Dashboard thành tệp HTML tương tác độc lập sẵn sàng tích hợp vào sản phẩm.'
          ],
          intuition: {
            title: 'Sàn giao dịch chứng khoán trên đầu ngón tay',
            metaphor: 'Một nhà đầu tư tài chính chuyên nghiệp cần một màn hình theo dõi thị trường chuẩn mực: ở khung trên là biến động giá nến xanh đỏ hiển thị 4 mức giá quan trọng (Mở cửa, Cao nhất, Thấp nhất, Đóng cửa - OHLC). Ở khung dưới là khối lượng giao dịch Volume. Ở đáy là một chiếc thanh trượt thời gian (Range Slider): bạn có thể kéo hai đầu thanh trượt để phóng to vào một tuần giao dịch sóng gió, hoặc bấm nhanh các nút \"1M\", \"6M\", \"1Y\" để đổi góc nhìn toàn cảnh. Dự án này xây dựng chính xác bảng điều khiển đó bằng Plotly.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">📈 Kiến trúc Dashboard Tài chính Chuyên nghiệp (TradingView Style)</div>
                <div style="font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  1. Khung trên (70% chiều cao): Biểu đồ nến <strong>go.Candlestick(open, high, low, close)</strong> + Đường MA 20 ngày.<br>
                  2. Khung dưới (30% chiều cao): Biểu đồ cột khối lượng giao dịch <strong>go.Bar(volume)</strong>.<br>
                  3. Đồng bộ trục thời gian X giữa 2 khung bằng <code>shared_xaxes=True</code>.<br>
                  4. Bộ chọn nhanh thời gian: Các nút <strong>rangeselector</strong> (1 tháng, 6 tháng, Tất cả).
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pb-project-candlestick',
              title: '1. Mã nguồn Hoàn chỉnh Dashboard Tài chính Plotly',
              content: `
                <p>Dưới đây là toàn bộ mã nguồn xây dựng Dashboard tài chính cao cấp:</p>
              `,
              codeExamples: [
                {
                  title: 'Toàn bộ mã nguồn Dashboard Tài chính với Plotly và make_subplots',
                  lang: 'Python',
                  code: `import pandas as pd
import numpy as np
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# 1. Giả lập dữ liệu chuỗi nến tài chính 60 ngày giao dịch liên tiếp
rng = np.random.default_rng(2026)
dates = pd.date_range('2026-01-01', periods=60, freq='B') # Business days

close_prices = 100.0 + np.cumsum(rng.normal(0.5, 2.0, size=60))
open_prices = close_prices + rng.normal(0, 1.0, size=60)
high_prices = np.maximum(open_prices, close_prices) + rng.uniform(0.5, 2.0, size=60)
low_prices = np.minimum(open_prices, close_prices) - rng.uniform(0.5, 2.0, size=60)
volumes = rng.integers(100_000, 500_000, size=60)

# 2. Tạo lưới 2 hàng x 1 cột chia sẻ chung trục X (shared_xaxes=True)
fig = make_subplots(
    rows=2, cols=1,
    shared_xaxes=True,
    vertical_spacing=0.04,
    subplot_titles=('Biến động Giá Nến Nhật & Đường MA(10)', 'Khối lượng Giao dịch (Volume)'),
    row_heights=[0.7, 0.3] # Tỉ lệ 70% giá, 30% volume
)

# 3. Vẽ nến Candlestick lên ô trên (row=1, col=1)
fig.add_trace(go.Candlestick(
    x=dates, open=open_prices, high=high_prices, low=low_prices, close=close_prices,
    name='Nến OHLC',
    increasing_line_color='#10b981', # Nến xanh tăng giá
    decreasing_line_color='#ef4444'  # Nến đỏ giảm giá
), row=1, col=1)

# Thêm đường trung bình động MA 10 ngày
ma_10 = pd.Series(close_prices).rolling(10).mean()
fig.add_trace(go.Scatter(
    x=dates, y=ma_10,
    name='Đường MA(10)',
    line=dict(color='#3b82f6', width=2)
), row=1, col=1)

# 4. Vẽ cột Volume lên ô dưới (row=2, col=1)
vol_colors = ['#10b981' if c >= o else '#ef4444' for c, o in zip(close_prices, open_prices)]
fig.add_trace(go.Bar(
    x=dates, y=volumes,
    name='Khối lượng',
    marker_color=vol_colors,
    opacity=0.7
), row=2, col=1)

# 5. Cấu hình Range Selector lọc thời gian nhanh
fig.update_layout(
    template='plotly_dark',
    height=650,
    showlegend=False,
    xaxis=dict(
        rangeselector=dict(
            buttons=list([
                dict(count=14, label="2 Tuần", step="day", stepmode="backward"),
                dict(count=1, label="1 Tháng", step="month", stepmode="backward"),
                dict(step="all", label="Tất cả")
            ])
        ),
        rangeslider=dict(visible=False) # Ẩn slider ở khung trên
    ),
    xaxis2=dict(rangeslider=dict(visible=True, thickness=0.08)) # Hiện slider ở khung dưới cùng
)

# Xuất ra file HTML tương tác độc lập
fig.write_html('financial_dashboard.html', include_plotlyjs='cdn')
print("Dashboard Tài chính Tương tác Hoàn chỉnh đã được xuất ra financial_dashboard.html!")`,
                  output: `Dashboard Tài chính Tương tác Hoàn chỉnh đã được xuất ra financial_dashboard.html!`,
                  annotations: [
                    { line: 20, text: 'shared_xaxes=True tự động đồng bộ zoom và pan giữa biểu đồ giá và volume.' },
                    { line: 26, text: 'go.Candlestick tự động vẽ thân nến và bóng nến chuẩn xác.' },
                    { line: 55, text: 'rangeselector tạo các nút bấm chọn nhanh khoảng thời gian chuẩn TradingView.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy nến ngày nghỉ cuối tuần bị ngắt quãng',
                content: 'Mặc định trục ngày tháng của Plotly hiển thị cả ngày thứ 7 và Chủ nhật, tạo ra các khoảng trống gãy đoạn trên đồ thị tài chính. Để loại bỏ các ngày nghỉ, hãy cấu hình: fig.update_xaxes(rangebreaks=[dict(bounds=[\"sat\", \"mon\"])])!'
              }
            ],
            tips: [
              {
                title: 'Tối ưu kích thước tệp khi gửi cho đối tác',
                content: 'Khi xuất file HTML bằng write_html, luôn đặt include_plotlyjs=\"cdn\". Tệp HTML chỉ nặng khoảng 40KB, rất tiện gửi qua Zalo, Slack hay đính kèm Email mà người nhận mở ra vẫn tương tác mượt mà.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Loại bỏ Khoảng trống Ngày cuối tuần bằng rangebreaks',
              problem: 'Hãy áp dụng cú pháp rangebreaks=[dict(bounds=[\"sat\", \"mon\"])] vào trục hoành của Figure để các phiên giao dịch từ thứ 6 sang thứ 2 tuần sau nằm liền sát cạnh nhau.',
              hint: 'fig.update_xaxes(rangebreaks=[dict(bounds=[\"sat\", \"mon\"])])',
              solutionCode: `# Loại bỏ ngày nghỉ cuối tuần
fig.update_xaxes(rangebreaks=[dict(bounds=["sat", "mon"])])
print("Đã loại bỏ khoảng trống ngày nghỉ cuối tuần trên trục thời gian!")`,
              solutionOutput: `Đã loại bỏ khoảng trống ngày nghỉ cuối tuần trên trục thời gian!`,
              explanation: 'rangebreaks là tính năng cực kỳ mạnh mẽ của Plotly dành riêng cho dữ liệu chuỗi thời gian tài chính, giúp biểu đồ liên tục và không bị đứt đoạn vô lý.',
              annotations: [
                { line: 2, text: 'bounds=["sat", "mon"] ẩn các ngày thứ bảy và chủ nhật trên trục X.' }
              ]
            }
          ],
          summary: [
            'make_subplots với shared_xaxes=True là kiến trúc chuẩn cho Dashboard tài chính đa khung nhìn.',
            'go.Candlestick kết hợp với đường MA và khối lượng Volume mang lại trải nghiệm chuyên nghiệp như TradingView.',
            'Thanh rangeselector và rangeslider nâng tầm trải nghiệm tương tác tự do cho người xem.',
            'Xuất bản tệp HTML độc lập với CDN là giải pháp lý tưởng để phân phối báo cáo tương tác không cần server.'
          ]
        }
      ]
    }
  ]
};
