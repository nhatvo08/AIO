export default {
  id: 'p0b-03',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B1.3',
  title: 'Các ký hiệu Flowchart chuẩn quốc tế ISO 5807',
  subtitle: 'Bảng quy ước hình học chuẩn mực: Bầu dục, Chữ nhật, Hình thoi, Hình bình hành, Chữ nhật đôi, Lục giác và Điểm nối',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Làm chủ 7 hình khối hình học chuẩn mực theo tiêu chuẩn quốc tế ISO 5807 (Information processing — Documentation symbols).',
    'Phân biệt rõ chức năng chuyên biệt của từng khối: Bắt đầu/Kết thúc, Xử lý tính toán, Quyết định rẽ nhánh, Nhập/Xuất dữ liệu, Chương trình con, Chuẩn bị lặp, và Điểm nối.',
    'Nhận biết các biến thể quy ước giữa các giáo trình và thống nhất quy chuẩn ISO 5807 được áp dụng xuyên suốt toàn bộ khóa học.',
    'Hiểu nguyên tắc vẽ đường nối luồng (Flowline) và hướng mũi tên bắt buộc.'
  ],

  intuition: {
    title: 'Biển báo giao thông quốc tế trên xa lộ dữ liệu',
    metaphor: 'Khi bạn lái xe trên đường cao tốc ở bất kỳ quốc gia nào, bạn không cần biết ngôn ngữ địa phương vẫn hiểu ngay: biển hình tròn viền đỏ là cấm, biển hình chữ nhật xanh là chỉ dẫn, biển hình tam giác vàng là cảnh báo nguy hiểm. Ký hiệu Flowchart cũng chính là hệ thống biển báo giao thông chuẩn hóa toàn cầu của giới kỹ sư! Mỗi hình khối mang một ý nghĩa độc nhất: nhìn thấy Hình bình hành là biết có hàng hóa vào/ra (I/O), nhìn thấy Hình thoi là biết sắp tới ngã ba phải rẽ (Quyết định), nhìn thấy Hình chữ nhật là trạm thu phí xử lý (Tính toán). Khi cả thế giới cùng tuân theo một quy ước ISO 5807, bản vẽ của bạn sẽ không bao giờ bị hiểu nhầm.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">7 HÌNH KHỐI CHUẨN ISO 5807 (CHUẨN HÓA TRONG TOÀN KHÓA HỌC)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:10px;text-align:center;">
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--accent-primary);">Bầu dục / Pill</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">Bắt đầu / Kết thúc<br/>(Terminator)</div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--success);">Chữ nhật</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">Xử lý / Tính toán<br/>(Process)</div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--py-gold);">Hình thoi</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">Quyết định rẽ nhánh<br/>(Decision)</div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--info-text);">Hình bình hành</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">Nhập / Xuất dữ liệu<br/>(Data I/O)</div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--deep-text);">Chữ nhật đôi</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">Chương trình con / Hàm<br/>(Subroutine)</div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--warning-text);">Lục giác</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">Chuẩn bị / Vòng lặp<br/>(Preparation)</div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--danger-text);">Hình tròn</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">Điểm nối luồng<br/>(Connector)</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Chi tiết 7 Ký hiệu Hình học theo Chuẩn ISO 5807',
      badge: 'Tiêu chuẩn Quốc tế',
      content: `
        <p>Tiêu chuẩn <strong>ISO 5807</strong> (xuất bản bởi Tổ chức Tiêu chuẩn hóa Quốc tế ISO) quy định chặt chẽ ý nghĩa hình học của từng ký hiệu:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Hình khối</th>
                <th>Tên gọi kỹ thuật</th>
                <th>Chức năng & Ý nghĩa</th>
                <th>Tương ứng trong Python</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Hình bầu dục / Viên thuốc (Oval / Stadium)</strong></td>
                <td>Terminator (Điểm đầu / cuối)</td>
                <td>Đánh dấu điểm bắt đầu (Start) hoặc kết thúc (End / Stop) của toàn bộ lưu đồ thuật toán. Luôn chỉ có <strong>duy nhất 1 đường ra</strong> (Start) hoặc <strong>chỉ có đường vào</strong> (End).</td>
                <td>Bắt đầu file script, lệnh <code>return</code>, hoặc kết thúc chương trình.</td>
              </tr>
              <tr>
                <td><strong>Hình chữ nhật (Rectangle)</strong></td>
                <td>Process (Khối xử lý)</td>
                <td>Chứa một hành động xử lý đơn lẻ, phép gán biến, hoặc tính toán số học nội bộ trong RAM. Có 1 đường vào và 1 đường ra.</td>
                <td><code>x = 10</code>, <code>tong = a + b</code>, <code>ds.append(x)</code></td>
              </tr>
              <tr>
                <td><strong>Hình thoi (Diamond)</strong></td>
                <td>Decision (Khối quyết định)</td>
                <td>Kiểm tra một điều kiện logic dạng Đúng/Sai (True/False). Có 1 đường vào và <strong>tối thiểu 2 đường ra</strong> (mỗi đường ra bắt buộc phải có nhãn "Đúng" / "Sai").</td>
                <td><code>if điều_kiện:</code>, <code>while điều_kiện:</code></td>
              </tr>
              <tr>
                <td><strong>Hình bình hành (Parallelogram)</strong></td>
                <td>Data (Khối Nhập / Xuất)</td>
                <td>Đại diện cho thao tác trao đổi dữ liệu với thế giới bên ngoài (đọc bàn phím, in màn hình, đọc ghi file, gọi mạng).</td>
                <td><code>input()</code>, <code>print()</code>, <code>file.read()</code></td>
              </tr>
              <tr>
                <td><strong>Chữ nhật có 2 vạch đứng đôi (Predefined Process)</strong></td>
                <td>Subroutine (Chương trình con)</td>
                <td>Gọi thực thi một hàm con đã được định nghĩa chi tiết ở một lưu đồ khác.</td>
                <td>Lời gọi hàm: <code>tinh_can_bac_hai(x)</code></td>
              </tr>
              <tr>
                <td><strong>Hình lục giác (Hexagon)</strong></td>
                <td>Preparation (Khối chuẩn bị)</td>
                <td>Dùng để khởi tạo tham số vòng lặp, bước nhảy (ví dụ: thiết lập biến đếm từ 0 đến n với bước nhảy 1).</td>
                <td><code>for i in range(0, n, 1):</code></td>
              </tr>
              <tr>
                <td><strong>Hình tròn nhỏ (Connector)</strong></td>
                <td>Điểm nối luồng</td>
                <td>Gom nhiều nhánh rẽ tụ về cùng một điểm, hoặc nối sang trang khác mà không làm rối mắt đường vẽ.</td>
                <td>Điểm kết thúc khối if/else, hợp nhất luồng.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Mã nguồn SVG chuẩn minh họa trực quan các khối hình',
          code: `# Trực quan hóa hình khối bằng SVG thuần túy (Đúng chuẩn W3C, Responsive)
svg_demo = """
<svg viewBox="0 0 400 160" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
  <!-- 1. Terminator (Hình bầu dục rx=15) -->
  <rect x="20" y="20" width="100" height="36" rx="18" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2"/>
  <text x="70" y="43" text-anchor="middle" font-size="12" fill="var(--text-primary)">Bắt đầu</text>

  <!-- 2. Process (Chữ nhật) -->
  <rect x="150" y="20" width="100" height="36" rx="4" fill="var(--bg-surface)" stroke="var(--success)" stroke-width="2"/>
  <text x="200" y="43" text-anchor="middle" font-size="12" fill="var(--text-primary)">x = a + b</text>

  <!-- 3. Decision (Hình thoi polygon) -->
  <polygon points="330,18 380,38 330,58 280,38" fill="var(--bg-surface)" stroke="var(--py-gold)" stroke-width="2"/>
  <text x="330" y="42" text-anchor="middle" font-size="11" fill="var(--text-primary)">x > 0 ?</text>
</svg>
"""
print("Chuẩn hình học W3C SVG đã sẵn sàng nhúng trực tiếp vào trang web!")`,
          output: `Chuẩn hình học W3C SVG đã sẵn sàng nhúng trực tiếp vào trang web!`,
          annotations: [
            { line: 5, text: 'rx="18" bo tròn hai đầu tạo thành khối Terminator chuẩn.' },
            { line: 13, text: 'polygon 4 điểm tạo thành hình thoi khối Quyết định.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Ghi chú về Sự khác biệt giữa các Giáo trình & Thống nhất Quy ước',
      badge: 'Chuẩn hóa Thống nhất',
      content: `
        <p>Khi đọc các sách giáo khoa Tin học hoặc tài liệu nước ngoài, bạn có thể thấy một vài khác biệt nhỏ:</p>
        <ul>
          <li><strong>Hình chữ nhật bo tròn nhẹ:</strong> Một số giáo trình vẽ điểm Start/End bằng hình chữ nhật bo góc nhẹ thay vì hình viên thuốc hoàn toàn. Trong khóa học này, ta dùng <strong>hình viên thuốc (Stadium/Pill)</strong> để dễ phân biệt với hình chữ nhật Process.</li>
          <li><strong>Khối Nhập/Xuất (I/O):</strong> Một số sách dùng hình lá cờ bị xé góc dưới (Document symbol) cho lệnh in ra giấy. Ta thống nhất dùng <strong>Hình bình hành (Parallelogram)</strong> cho TẤT CẢ các thao tác vào/ra dữ liệu chuẩn.</li>
          <li><strong>Vòng lặp:</strong> Một số nơi vẽ vòng lặp bằng hình thoi thông thường, một số nơi dùng hình lục giác Preparation. Khóa học này hỗ trợ cả hai: dùng <strong>Hình thoi</strong> cho vòng lặp kiểm tra điều kiện (<code>while</code>), và dùng <strong>Lục giác</strong> cho vòng lặp đếm (<code>for range</code>).</li>
        </ul>
        <p><strong>Cam kết nhất quán:</strong> Toàn bộ 24 bài học của Phần 0B này sẽ tuân thủ tuyệt đối quy ước chuẩn ISO 5807 đã nêu ở bảng trên.</p>
      `
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Nhầm lẫn giữa Hình chữ nhật (Process) và Hình bình hành (I/O)',
        content: 'Lỗi sơ đẳng nhất của người mới học là đặt câu lệnh `Nhập x` hoặc `In ra kết quả` vào trong ô Hình chữ nhật. Hãy nhớ: Mọi thao tác giao tiếp với người dùng (bàn phím/màn hình) BẮT BUỘC phải dùng Hình bình hành!'
      },
      {
        title: 'Ô quyết định (Hình thoi) chỉ có 1 mũi tên đi ra',
        content: 'Một quyết định mà chỉ có 1 đường ra thì không còn là quyết định! Khối hình thoi luôn luôn phải có ít nhất 2 nhánh đi ra (một nhánh khi Đúng và một nhánh khi Sai).'
      }
    ],
    tips: [
      {
        title: 'Hướng chảy tự nhiên của Flowline',
        content: 'Đường nối luồng có mũi tên luôn chảy theo hướng từ TRÊN XUỐNG DƯỚI và từ TRÁI SANG PHẢI. Nếu luồng quay ngược lên trên, điều đó báo hiệu rõ ràng sự xuất hiện của một VÒNG LẶP.'
      }
    ],
    deepDive: null,
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Ghép cặp câu lệnh Python với hình khối Flowchart đúng',
      problem: 'Cho 4 dòng code Python sau:\\n1. `tong = a + b`\\n2. `if x > 10:`\\n3. `ten = input("Nhập tên: ")`\\n4. `ket_thuc()`\\nHãy cho biết mỗi dòng code trên tương ứng với hình khối hình học chuẩn ISO 5807 nào.',
      hint: '1 là tính toán, 2 là điều kiện, 3 là nhập dữ liệu, 4 là kết thúc.',
      solutionCode: `dap_an = {
    "tong = a + b": "Hình chữ nhật (Process - Xử lý tính toán)",
    "if x > 10:": "Hình thoi (Decision - Quyết định rẽ nhánh)",
    "ten = input(...)": "Hình bình hành (Data I/O - Nhập dữ liệu)",
    "ket_thuc() / End": "Hình bầu dục / Viên thuốc (Terminator - Kết thúc)"
}

for code, hinh in dap_an.items():
    print(f"Code: {code:<20} ──► {hinh}")`,
      solutionOutput: `Code: tong = a + b        ──► Hình chữ nhật (Process - Xử lý tính toán)
Code: if x > 10:           ──► Hình thoi (Decision - Quyết định rẽ nhánh)
Code: ten = input(...)     ──► Hình bình hành (Data I/O - Nhập dữ liệu)
Code: ket_thuc() / End     ──► Hình bầu dục / Viên thuốc (Terminator - Kết thúc)`,
      explanation: 'Nắm chắc tương quan 1-1 giữa câu lệnh ngôn ngữ và hình khối hình học là bước đầu tiên để đọc hiểu lưu đồ nhanh chóng.',
      annotations: [
        { line: 1, text: 'Bảng đối chiếu chuẩn mực.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Phát hiện ký hiệu sai quy chuẩn trong bản mô tả lưu đồ',
      problem: 'Một bạn học sinh vẽ lưu đồ cho thuật toán tính chu vi hình vuông như sau:\\n- Ô 1: Hình bầu dục "Bắt đầu"\\n- Ô 2: Hình chữ nhật "Nhập cạnh a"\\n- Ô 3: Hình bình hành "chu_vi = a * 4"\\n- Ô 4: Hình chữ nhật "In ra chu_vi"\\n- Ô 5: Hình bầu dục "Kết thúc"\\nHãy chỉ ra 2 ô bị vẽ sai ký hiệu và nêu cách sửa lại cho đúng chuẩn ISO 5807.',
      hint: 'Chú ý thao tác nhập dữ liệu và thao tác tính toán công thức.',
      solutionCode: `loi_sai = [
    "Ô 2: 'Nhập cạnh a' đang dùng Hình chữ nhật (Sai) -> Phải đổi thành HÌNH BÌNH HÀNH (Data Input)",
    "Ô 3: 'chu_vi = a * 4' đang dùng Hình bình hành (Sai) -> Phải đổi thành HÌNH CHỮ NHẬT (Process Tính toán)",
    "Ô 4: 'In ra chu_vi' đang dùng Hình chữ nhật (Sai) -> Phải đổi thành HÌNH BÌNH HÀNH (Data Output)"
]

print("PHÂN TÍCH LỖI SAI KÝ HIỆU:")
for item in loi_sai:
    print("-", item)`,
      solutionOutput: `PHÂN TÍCH LỖI SAI KÝ HIỆU:
- Ô 2: 'Nhập cạnh a' đang dùng Hình chữ nhật (Sai) -> Phải đổi thành HÌNH BÌNH HÀNH (Data Input)
- Ô 3: 'chu_vi = a * 4' đang dùng Hình bình hành (Sai) -> Phải đổi thành HÌNH CHỮ NHẬT (Process Tính toán)
- Ô 4: 'In ra chu_vi' đang dùng Hình chữ nhật (Sai) -> Phải đổi thành HÌNH BÌNH HÀNH (Data Output)`,
      explanation: 'Quy ước phân biệt rõ: Nhập xuất luôn dùng Hình bình hành; Tính toán gán giá trị luôn dùng Hình chữ nhật.',
      annotations: [
        { line: 1, text: 'Chỉ rõ vị trí nhầm lẫn giữa I/O và Process.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Theo tiêu chuẩn ISO 5807, hình khối nào được dùng để biểu diễn một phép toán gán giá trị hoặc xử lý tính toán trong bộ nhớ (ví dụ: `x = x + 1`)?',
      options: [
        'Hình bình hành (Parallelogram)',
        'Hình chữ nhật (Rectangle)',
        'Hình thoi (Diamond)',
        'Hình tròn (Circle)'
      ],
      correctIndex: 1,
      explanation: 'Hình chữ nhật là ký hiệu chuẩn của khối Process (Xử lý / Tính toán nội bộ).'
    },
    {
      question: 'Khối Quyết định (Hình thoi - Decision) trong Flowchart có đặc điểm bắt buộc nào sau đây?',
      options: [
        'Chỉ được phép có 1 đường ra duy nhất.',
        'Bắt buộc phải có ít nhất 2 đường ra và mỗi đường ra phải có nhãn rõ ràng (ví dụ: Đúng / Sai, Có / Không).',
        'Không được phép có mũi tên đi vào.',
        'Chỉ dùng cho phép chia cho số 0.'
      ],
      correctIndex: 1,
      explanation: 'Khối quyết định rẽ nhánh luồng dữ liệu dựa trên điều kiện logic nên luôn có từ 2 lối ra trở lên kèm nhãn kết quả điều kiện.'
    },
    {
      question: 'Ký hiệu hình chữ nhật có hai vạch đứng dọc đôi ở hai cạnh bên (Predefined Process) đại diện cho điều gì?',
      options: [
        'Một lỗi nghiêm trọng làm sập chương trình.',
        'Một Chương trình con (Subroutine) hoặc một Hàm độc lập đã được định nghĩa ở nơi khác.',
        'Một vòng lặp vô tận.',
        'Một cổng kết nối cơ sở dữ liệu.'
      ],
      correctIndex: 1,
      explanation: 'Ký hiệu hai cạnh dọc đôi đại diện cho Subroutine / Function (Chương trình con), tương ứng với các hàm `def` trong Python.'
    }
  ],

  summary: [
    'Tiêu chuẩn ISO 5807 quy định 7 hình khối hình học chuẩn mực cho lưu đồ thuật toán.',
    'Bầu dục: Bắt đầu / Kết thúc; Chữ nhật: Xử lý tính toán; Hình bình hành: Nhập / Xuất dữ liệu.',
    'Hình thoi: Quyết định rẽ nhánh (luôn có tối thiểu 2 lối ra có nhãn); Chữ nhật đôi: Chương trình con; Hình tròn: Điểm nối.',
    'Mũi tên chỉ hướng chảy tự nhiên từ trên xuống dưới và từ trái sang phải; mũi tên ngược lên trên báo hiệu vòng lặp.'
  ]
};
