export default {
  id: 'lp-c5-21',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.21',
  title: 'Các phần mở rộng số học: NumPy, SciPy, pandas & So sánh MATLAB',
  subtitle: 'Hệ sinh thái tính toán khoa học mã nguồn mở: giải pháp thay thế MATLAB và triết lý đào tạo nền tảng của Mark Lutz',
  level: 'Cơ bản',
  duration: '20 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Khảo sát bộ công cụ tiêu chuẩn cho lập trình số học nâng cao trong hệ sinh thái Python: NumPy, SciPy, pandas, matplotlib, Jupyter.',
    'Hiểu vì sao sự kết hợp giữa Python và các thư viện số học lại trở thành giải pháp thay thế hàng đầu cho hệ thống thương mại MATLAB.',
    'Nhận biết các lĩnh vực ứng dụng quy mô lớn: nghiên cứu khoa học, định chế tài chính, kỹ thuật hàng không vũ trụ và trí tuệ nhân tạo.',
    'Nắm vững triết lý sư phạm của Mark Lutz: làm chủ ngôn ngữ Python nền tảng trước khi chuyên sâu vào bất kỳ thư viện chuyên ngành nào.'
  ],

  intuition: {
    title: 'Động cơ phản lực lắp trên khung gầm vững chắc',
    metaphor: 'Nếu bản thân ngôn ngữ Python cốt lõi là một chiếc khung gầm ô tô được thiết kế thanh thoát, an toàn và cực kỳ linh hoạt; thì các thư viện mở rộng như NumPy hay pandas chính là những khối động cơ phản lực được đúc bằng C/Fortran gắn thêm vào. Python cung cấp cú pháp điều khiển tuyệt đẹp và mô hình đối tượng nhất quán, trong khi NumPy đảm nhiệm việc tính toán hàng tỷ phép toán ma trận ở tốc độ phần cứng máy tính. Bạn không cần phải mua những phần mềm bản quyền đắt đỏ như MATLAB để làm khoa học dữ liệu — cả thế giới nghiên cứu đỉnh cao hiện nay đều đang vận hành trên nền tảng Python mã nguồn mở.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">HỆ SINH THÁI TÍNH TOÁN KHOA HỌC PYTHON MÃ NGUỒN MỞ</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:10px;text-align:center;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">NumPy</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Mảng đa chiều N-d, đại số tuyến tính</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);">SciPy</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Tích phân, tối ưu hóa, xử lý tín hiệu</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--warning);">pandas</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Cấu trúc bảng DataFrame, chuỗi thời gian</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-secondary);">matplotlib & Jupyter</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Trực quan hóa đồ thị & sổ tay tương tác</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Hệ Sinh thái Tính toán Số học của Bên thứ ba',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 35 / 38 – Trang 36 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Mặc dù các đối tượng số học cốt lõi của Python mang lại sức mạnh dồi dào cho hầu hết các ứng dụng thông thường, nhưng vẫn có một danh mục phong phú các <strong>phần mở rộng mã nguồn mở của bên thứ ba</strong> sẵn sàng đáp ứng những nhu cầu số học chuyên sâu hơn.</p>
        <p>Ngày nay, trong cộng đồng công nghệ toàn cầu đã hình thành một <strong>bộ công cụ tiêu chuẩn</strong> rất phổ biến cho lập trình số học nâng cao trong Python:</p>
        <ul>
          <li><strong>NumPy:</strong> Cung cấp cấu trúc mảng đa chiều đồng nhất (ndarray) tốc độ cao, các phép biến đổi ma trận và đại số tuyến tính tối ưu hóa bằng C và Fortran.</li>
          <li><strong>SciPy:</strong> Bổ sung các thuật toán toán học cao cấp phục vụ kỹ thuật: tính tích phân, giải phương trình vi phân, tối ưu hóa và xử lý ảnh số.</li>
          <li><strong>pandas:</strong> Xử lý dữ liệu bảng (DataFrame), lọc dữ liệu tài chính, phân tích chuỗi thời gian quy mô lớn.</li>
          <li><strong>matplotlib và Seaborn:</strong> Vẽ các biểu đồ khoa học 2D/3D chuyên nghiệp.</li>
          <li><strong>Jupyter Notebook:</strong> Giao diện web tương tác kết hợp văn bản, công thức toán LaTeX và mã nguồn thực thi trực tiếp.</li>
        </ul>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Ứng dụng Toàn cầu và Giải pháp Thay thế MATLAB',
      content: `
        <p>Bộ công cụ này được sử dụng bởi các tổ chức nghiên cứu khoa học hàng đầu, các định chế tài chính Phố Wall và các tập đoàn hàng không vũ trụ trên toàn thế giới, đảm nhiệm những tác vụ tính toán khổng lồ mà trước đây từng bắt buộc phải viết bằng các ngôn ngữ cấp thấp như C++ hoặc Fortran.</p>
        <p>Nhiều chuyên gia và nhà nghiên cứu trong lĩnh vực này ví sự kết hợp giữa <strong>Python và các phần mở rộng số học như một giải pháp thay thế hoàn toàn miễn phí, linh hoạt và mạnh mẽ cho các hệ sinh thái thương mại đắt tiền như MATLAB</strong>.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Triết lý Đào tạo Nền tảng của Giáo trình Learning Python',
      content: `
        <p>Dù là một lĩnh vực phổ biến và đầy hấp dẫn, Mark Lutz đặc biệt lưu ý bạn đọc:</p>
        <blockquote>
          "Lập trình số học bằng Python cũng chỉ là một trong nhiều hướng ứng dụng ngôn ngữ này (chẳng hạn, phát triển web với Python cũng có quy mô tương đương) và bản thân nó đủ phong phú để lấp đầy những cuốn sách chuyên khảo riêng biệt. Do đó, cuốn sách này không đi sâu vào các phần mở rộng số học mà thay vào đó tập trung dạy bạn <strong>ngôn ngữ Python nền tảng vốn được dùng trong mọi lĩnh vực</strong>."
        </blockquote>
        <p>Một khi bạn đã nắm vững bản thân ngôn ngữ Python—mô hình đối tượng, cơ chế tham chiếu, quy tắc phạm vi hàm, và lập trình hướng đối tượng—bạn sẽ dễ dàng tiếp cận và làm chủ bất kỳ thư viện chuyên ngành nào mà bạn cần trong sự nghiệp.</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Cài đặt các gói phần mở rộng số học bằng pip',
        content: `
          <p>Khi sẵn sàng nâng cao trình độ sang khoa học dữ liệu, bạn có thể cài đặt toàn bộ hệ sinh thái số học này thông qua trình quản lý gói của Python:</p>
          <pre class="code-block"><code>pip install numpy scipy pandas matplotlib jupyter</code></pre>
        `
      }
    ]
  },

  exercises: [
    {
      title: 'Nhận diện vai trò của các thư viện số học',
      level: 'Dễ',
      problem: 'Hãy ghép nối từng thư viện sau với vai trò kỹ thuật chính xác của nó: 1) NumPy, 2) pandas, 3) matplotlib. Các vai trò: a) Vẽ biểu đồ trực quan; b) Thao tác bảng dữ liệu DataFrame; c) Mảng tính toán đa chiều hiệu năng cao.',
      hint: 'NumPy làm việc với mảng n-d, pandas làm việc với DataFrame, matplotlib vẽ hình.',
      solutionCode: `# Bản đồ vai trò của bộ công cụ khoa học dữ liệu
roles = {
    "NumPy": "Mảng tính toán đa chiều hiệu năng cao (ndarrays)",
    "pandas": "Thao tác bảng dữ liệu DataFrame và chuỗi thời gian",
    "matplotlib": "Vẽ biểu đồ và trực quan hóa dữ liệu 2D/3D"
}

for lib, role in roles.items():
    print(f"- {lib:<12}: {role}")`,
      solutionOutput: `- NumPy       : Mảng tính toán đa chiều hiệu năng cao (ndarrays)
- pandas      : Thao tác bảng dữ liệu DataFrame và chuỗi thời gian
- matplotlib  : Vẽ biểu đồ và trực quan hóa dữ liệu 2D/3D`,
      explanation: 'NumPy cung cấp mảng dữ liệu tốc độ C, pandas cung cấp cấu trúc bảng dữ liệu phân tích, và matplotlib xuất bản các đồ thị khoa học.'
    }
  ],

  quiz: [
    {
      question: 'Sự kết hợp giữa Python và các gói mở rộng số học (NumPy, SciPy...) thường được so sánh như một giải pháp thay thế mã nguồn mở cho hệ thống thương mại nào?',
      options: [
        'Hệ điều hành Windows.',
        'Hệ thống toán học MATLAB.',
        'Trình duyệt Google Chrome.',
        'Hệ quản trị cơ sở dữ liệu Oracle Database.'
      ],
      correctIndex: 1,
      explanation: 'Mark Lutz nêu rõ: nhiều người làm việc trong lĩnh vực tính toán khoa học ví sự kết hợp giữa Python và các phần mở rộng số học như một giải pháp thay thế miễn phí, linh hoạt và mạnh mẽ cho MATLAB.'
    },
    {
      question: 'Tại sao cuốn giáo trình "Learning Python" không đi sâu vào chi tiết các hàm của thư viện NumPy hay SciPy?',
      options: [
        'Vì tác giả không biết lập trình số học.',
        'Vì các thư viện này sắp bị loại bỏ khỏi Python.',
        'Vì cuốn sách tập trung dạy ngôn ngữ Python cốt lõi vững chắc làm nền tảng chung cho mọi lĩnh vực ứng dụng.',
        'Vì NumPy bắt buộc phải trả phí bản quyền.'
      ],
      correctIndex: 2,
      explanation: 'Mục tiêu cốt lõi của cuốn sách là trang bị bản chất ngôn ngữ Python nền tảng; khi đã nắm vững ngôn ngữ, người học có thể tự tin áp dụng cho bất kỳ thư viện chuyên ngành nào.'
    }
  ],

  summary: [
    'Hệ sinh thái số học của bên thứ ba gồm NumPy, SciPy, pandas, matplotlib và Jupyter.',
    'Các phần mở rộng này được viết bằng C/Fortran bên dưới, mang lại tốc độ tính toán ma trận tương đương ngôn ngữ cấp thấp.',
    'Python + thư viện số học là giải pháp thay thế mã nguồn mở phổ biến nhất cho MATLAB trong khoa học và tài chính.',
    'Nắm vững ngôn ngữ Python cốt lõi là bước đệm bắt buộc trước khi bước vào thế giới khoa học dữ liệu và AI.',
    'Ý chính: Sức mạnh của Python đến từ sự kết hợp hoàn hảo giữa cú pháp bậc cao trong sáng và các thư viện mở rộng siêu tốc.'
  ]
};