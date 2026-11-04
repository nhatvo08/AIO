export default {
  id: 'lp-c7-20',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.20',
  title: 'So sánh toàn diện công cụ định dạng, Bản quyền lựa chọn & string.Template',
  subtitle: 'Bảng đối chiếu tổng hợp 3 công cụ (% vs .format vs f-string), quan điểm của Mark Lutz về sự tự do của lập trình viên và chống áp đặt độc đoán, cùng Khung chuyên đề string.Template',
  level: 'Trung bình',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Tổng hợp và so sánh toàn diện ưu - nhược điểm của ba thế hệ công cụ định dạng chuỗi: Biểu thức %, Phương thức .format(), và Hằng chuỗi F-string.',
    'Thấu hiểu triết lý của tác giả Mark Lutz về bản quyền lựa chọn của lập trình viên: phản đối sự áp đặt độc đoán và bảo vệ quyền tự do quyết định công cụ phù hợp với dự án.',
    'Nhận biết công cụ định dạng thứ tư trong Python: module string.Template với cú pháp $identifier.',
    'Nắm vững ưu thế của string.Template: hy sinh các tính năng định dạng phức tạp để đổi lấy sự đơn giản và an toàn tuyệt đối khi nạp bản mẫu do người dùng cung cấp.'
  ],

  intuition: {
    title: 'Hộp đồ nghề bốn ngăn và sự tự do của người thợ thủ công',
    metaphor: 'Một người thợ mộc lành nghề bước vào xưởng gỗ không bao giờ vứt bỏ chiếc cưa tay chỉ vì xưởng mới trang bị thêm cưa máy điện. Trong hộp đồ nghề của anh ta: Biểu thức % là chiếc cưa tay bén ngót, tin cậy; Phương thức .format() là chiếc bàn cưa cố định vững chãi; F-string là chiếc máy cưa cầm tay siêu tốc; và string.Template là chiếc dao gọt an toàn dành cho học việc. Một chuyên gia thực thụ không bao giờ tranh cãi công cụ nào là "duy nhất đúng", mà anh ta tự hào vì mình có quyền tự do lựa chọn công cụ chính xác nhất cho từng thớ gỗ!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BỐN CÔNG CỤ ĐỊNH DẠNG CHUỖI TRONG PYTHON: ĐỐI CHIẾU MẪU BẢN MẪU</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="padding:10px 14px;background:var(--bg-surface);border-left:4px solid var(--accent-primary);border-radius:6px;">
            <strong>1. Biểu thức %:</strong> <code>'The %(num)s %(tool)ss' % dict(num=4, tool='formatter')</code>
          </div>
          <div style="padding:10px 14px;background:var(--bg-surface);border-left:4px solid var(--success);border-radius:6px;">
            <strong>2. Phương thức format:</strong> <code>'The {num} {tool}s'.format(num=4, tool='formatter')</code>
          </div>
          <div style="padding:10px 14px;background:var(--bg-surface);border-left:4px solid var(--warning);border-radius:6px;">
            <strong>3. F-String:</strong> <code>f'The {num} {tool}s'</code> <em>(khi num và tool là các biến trong phạm vi)</em>
          </div>
          <div style="padding:10px 14px;background:var(--bg-surface);border-left:4px solid #e06c75;border-radius:6px;">
            <strong>4. string.Template:</strong> <code>string.Template('The $num \${tool}s').substitute(...)</code>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. "Và Người Chiến Thắng Là...": Góc Nhìn Độc Lập Của Mark Lutz',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 48 / 52 – Trang 49 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Ấn bản trước của cuốn sách này đã tốn không ít giấy mực (khoảng bảy trang) để chỉ ra phương thức định dạng, vốn mới nhất vào thời điểm đó, đã dư thừa về mặt chức năng như thế nào so với biểu thức, nhằm nhấn mạnh những mặt trái của việc phình to tính năng (feature bloat) trong các ngôn ngữ lập trình. Xét thấy số lượng công cụ định dạng chính trong Python kể từ đó đã tăng từ hai lên ba, thông điệp đó có lẽ đã không hoàn toàn đạt được mục đích.</p>

        <p>Do đó, ấn bản này đã lược bỏ phần lớn những lời hùng biện đó, và quyết định để kết quả của cuộc đua này cho <strong>chính bạn tự định đoạt</strong>.</p>

        <p>Nhưng nếu bạn đang tìm kiếm một lời chỉ dẫn khách quan:</p>
        <ul>
          <li><strong>Không có lý lẽ quyết định nào để bác bỏ ngay lập tức bất kỳ tùy chọn định dạng nào cho mọi tình huống:</strong> Mỗi công cụ đều có điểm mạnh riêng trong hoàn cảnh lịch sử và kiến trúc cụ thể của nó.</li>
          <li><strong>Mã nguồn mới:</strong> F-string có thể là lựa chọn tốt nhất trong hầu hết mã nguồn mới, chỉ xét riêng trên phương diện hậu cần: cái mới hơn thì ít có nguy cơ bị loại bỏ sớm hơn bởi các bản cập nhật ngôn ngữ trong tương lai.</li>
          <li><strong>Mã nguồn bảo trì &amp; Tệp bên ngoài:</strong> Bạn sẽ thường xuyên bắt gặp biểu thức <code>%</code> và phương thức <code>format()</code> trong mã nguồn hiện có, và bắt buộc phải dùng đến chúng trong các vai trò mà f-string không giải quyết được (chẳng hạn như các phép thay thế an toàn trong văn bản nạp từ tệp tin hoặc cơ sở dữ liệu).</li>
        </ul>

        <div class="callout-box callout-tip" style="border-left:4px solid var(--accent-primary);margin-top:14px;">
          <div class="callout-header">
            <span>💡</span>
            <span><strong>Bản quyền lựa chọn của lập trình viên:</strong></span>
          </div>
          <div class="callout-body">
            <p><em>"Cuốn sách này không có chủ trương áp đặt bạn phải làm gì, và bạn hoàn toàn có thể tự do sử dụng bất kỳ tùy chọn định dạng nào bạn thích. Áp đặt các công cụ mới lên các lập trình viên là độc đoán, gây chia rẽ và có lẽ là khiếm nhã. Bất chấp những quy chuẩn trong ngành phần mềm ngày nay, sự lựa chọn các giải pháp phát triển phải là của bạn — và của riêng bạn — quyết định."</em> — Mark Lutz</p>
          </div>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Bảng So Sánh Tổng Hợp Ba Công Cụ Định Dạng',
      content: `
        <p>Bảng đối chiếu sau đây giúp bạn nhanh chóng cân nhắc lựa chọn công cụ phù hợp nhất cho bài toán của mình:</p>

        <div style="overflow-x:auto;margin:16px 0;">
          <table style="width:100%;border-collapse:collapse;font-size:0.86rem;line-height:1.6;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);text-align:left;">
                <th style="padding:10px;color:var(--accent-primary);">Tiêu chí so sánh</th>
                <th style="padding:10px;color:var(--text-primary);">Biểu thức %</th>
                <th style="padding:10px;color:var(--text-primary);">Phương thức .format()</th>
                <th style="padding:10px;color:var(--text-primary);">Hằng chuỗi F-string</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 10px;font-weight:700;">Phiên bản ra mắt</td>
                <td style="padding:8px 10px;">Python 1.x (nguyên bản)</td>
                <td style="padding:8px 10px;">Python 3.0 (và 2.6)</td>
                <td style="padding:8px 10px;">Python 3.6 (nâng cấp 3.12+)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);background:var(--bg-surface-alt);">
                <td style="padding:8px 10px;font-weight:700;">Nguồn gốc cảm hứng</td>
                <td style="padding:8px 10px;">Hàm <code>printf</code> của ngôn ngữ C</td>
                <td style="padding:8px 10px;">C# / .NET <code>String.Format</code></td>
                <td style="padding:8px 10px;">Nội suy chuỗi (Perl, Ruby, JS)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 10px;font-weight:700;">Độ dài mã lệnh</td>
                <td style="padding:8px 10px;">Rất ngắn gọn</td>
                <td style="padding:8px 10px;">Dài dòng nhất do cú pháp gọi hàm</td>
                <td style="padding:8px 10px;">Ngắn gọn, dễ đọc nhất</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);background:var(--bg-surface-alt);">
                <td style="padding:8px 10px;font-weight:700;">Truyền tham số</td>
                <td style="padding:8px 10px;">Giá trị đơn lẻ hoặc tuple / dict</td>
                <td style="padding:8px 10px;">Đối số vị trí &amp; đối số từ khóa</td>
                <td style="padding:8px 10px;">Nhúng biểu thức nội tuyến trực tiếp</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 10px;font-weight:700;">Hỗ trợ gom cụm Dict</td>
                <td style="padding:8px 10px;color:var(--success);font-weight:700;">Xuất sắc: <code>fmt % my_dict</code></td>
                <td style="padding:8px 10px;color:var(--success);font-weight:700;">Tốt: <code>fmt.format(**my_dict)</code></td>
                <td style="padding:8px 10px;color:var(--warning);">Dài dòng (phải lặp <code>my_dict[...]</code>)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);background:var(--bg-surface-alt);">
                <td style="padding:8px 10px;font-weight:700;">Nạp bản mẫu từ tệp</td>
                <td style="padding:8px 10px;color:var(--success);font-weight:700;">An toàn tuyệt đối (dữ liệu tĩnh)</td>
                <td style="padding:8px 10px;color:var(--success);font-weight:700;">An toàn tuyệt đối (dữ liệu tĩnh)</td>
                <td style="padding:8px 10px;color:var(--danger);font-weight:700;">Rủi ro cao (phải dùng <code>eval</code>)</td>
              </tr>
              <tr>
                <td style="padding:8px 10px;font-weight:700;">Hỗ trợ nhị phân / phẩy</td>
                <td style="padding:8px 10px;">Không hỗ trợ <code>{:b}</code> hay dấu <code>,</code></td>
                <td style="padding:8px 10px;">Hỗ trợ đầy đủ</td>
                <td style="padding:8px 10px;">Hỗ trợ đầy đủ + cờ gỡ lỗi <code>=</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Khung Chuyên Đề: Cộng Thêm Một Lựa Chọn — string.Template',
      content: `
        <p>Xét về mặt kỹ thuật, có tới <strong>bốn</strong> (chứ không phải ba) công cụ định dạng được dựng sẵn trong thư viện chuẩn Python ngày nay, nếu chúng ta tính cả công cụ <code>Template</code> ít người biết của module <code>string</code>.</p>

        <p>Hệ thống bản mẫu của module này cho phép các giá trị được tham chiếu theo tên có tiền tố là dấu <code>$</code> (hoặc <code>\${name}</code> nếu cần phân tách với ký tự liền kề), nhận dữ liệu dưới dạng từ điển hoặc các đối số từ khóa thông qua phương thức <code>substitute()</code>:</p>

        <p>Đặc điểm nổi bật của <code>string.Template</code>:</p>
        <ul>
          <li><strong>Không hỗ trợ định dạng nâng cao:</strong> Hoàn toàn không có các đặc tả như căn lề, đệm 0, hay số chữ số thập phân.</li>
          <li><strong>Đơn giản &amp; An toàn tuyệt đối:</strong> Chính vì không hỗ trợ biểu thức hay mã lệnh tùy ý, <code>string.Template</code> được thiết kế chuyên biệt cho các tình huống mà <em>bản mẫu văn bản do người dùng cuối hoặc người dịch thuật bên ngoài cung cấp</em>. Nó loại bỏ 100% rủi ro tiêm mã độc (code injection)!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng string.Template với từ điển và đối số từ khóa',
          code: `import string

# Tạo bản mẫu với cú pháp tiền tố $
t = string.Template('The $num \${tool}s')

# 1. Thay thế bằng các đối số từ khóa
res1 = t.substitute(num=4, tool='formatter')
print("res1:", res1)

# 2. Thay thế bằng từ điển dữ liệu
data = dict(num=4, tool='formatter')
res2 = t.substitute(data)
print("res2:", res2)`,
          output: `res1: The 4 formatters
res2: The 4 formatters`,
          annotations: [
            { line: 4, text: '\${tool}s dùng ngoặc nhọn để phân tách tên biến tool khỏi chữ cái s liền sau.' },
            { line: 7, text: 'substitute() điền trực tiếp giá trị vào các vị trí $num và \${tool}.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
      title: 'Khi Nào Nên Chọn string.Template Trong Thực Tế?',
      content: `Hãy chọn string.Template khi xây dựng hệ thống quốc tế hóa (i18n) cho ứng dụng, nơi các tệp bản dịch do cộng đồng hoặc dịch thuật viên gửi lên. Người dịch có thể dễ dàng chèn $username mà bạn không phải lo lắng họ vô tình làm sập ứng dụng vì lỗi cú pháp ngoặc nhọn hay chèn mã độc.`
      }
    ],
    pitfalls: [
      {
      title: 'Bẫy Phân Chia Thái Quá Trong Nhóm Phát Triển',
      content: `Mark Lutz cảnh báo rằng việc một lập trình viên hoặc trưởng nhóm cố chấp bắt buộc cả nhóm "chỉ được dùng f-string" và cấm tiệt biểu thức % là biểu hiện của cái tôi độc đoán. Hãy tôn trọng mã nguồn hiện có và lựa chọn công cụ dựa trên tiêu chí kỹ thuật thực tế thay vì chạy theo xu hướng nhất thời.`
      }
    ]
  },

  exercises: [
    {
      id: 'ex-1',
      title: 'Tạo thông báo chào mừng an toàn với string.Template',
      question: 'Sử dụng module string và lớp Template để tạo một bản mẫu email: "Xin chào $customer, đơn hàng #${order_id} của bạn đã được gửi thành công!". Sau đó gọi .substitute() với từ điển info = {"customer": "Minh", "order_id": 98765} và in ra kết quả.',
      starterCode: `import string

# Khai báo bản mẫu Template và dữ liệu:
info = {"customer": "Minh", "order_id": 98765}

# template = ...
# message = ...
# print(message)
`,
      solution: `import string

info = {"customer": "Minh", "order_id": 98765}

template = string.Template("Xin chào $customer, đơn hàng #\${order_id} của bạn đã được gửi thành công!")
message = template.substitute(info)

print(message)`,
      hints: [
        'Dùng string.Template(...) để khởi tạo đối tượng bản mẫu.',
        'Dùng $customer và \${order_id} trong chuỗi bản mẫu.',
        'Gọi template.substitute(info) để điền dữ liệu.'
      ]
    }
  ],

  quiz: [
    {
      question: 'Theo phân tích của Mark Lutz, trong tình huống nào biểu thức định dạng % hoặc phương thức .format() lại chiếm ưu thế rõ rệt so với f-string?',
      options: [
        'Khi cần in ra một biến đơn giản trong hàm print().',
        'Khi chuỗi bản mẫu được nạp từ tệp văn bản bên ngoài hoặc cơ sở dữ liệu tại thời gian chạy (coi bản mẫu là dữ liệu tĩnh an toàn, không cần chạy qua eval).',
        'Khi cần tính toán số mũ trong biểu thức toán học.',
        'Khi chạy trên phiên bản Python 3.12+.'
      ],
      correctIndex: 1,
      explanation: 'Khi bản mẫu nạp từ file bên ngoài, biểu thức % và format() xử lý nó dưới dạng dữ liệu văn bản tĩnh an toàn, trong khi f-string đòi hỏi phải chạy qua eval() với rủi ro bảo mật nghiêm trọng.'
    },
    {
      question: 'Cú pháp nhận diện các mục tiêu thay thế trong module string.Template là gì?',
      options: [
        'Cặp dấu ngoặc nhọn {name}',
        'Ký hiệu %name',
        'Tiền tố dấu đô la $identifier hoặc \${identifier}',
        'Thẻ mở đóng <name></name>'
      ],
      correctIndex: 2,
      explanation: 'string.Template sử dụng ký hiệu dấu đô la $ (ví dụ: $name hoặc \${name}) để định danh các vị trí thay thế.'
    }
  ],

  summary: {
    takeaways: [
      'Python sở hữu bốn công cụ định dạng chuỗi: Biểu thức %, Phương thức .format(), Hằng chuỗi F-string, và module string.Template.',
      'Không có công cụ nào hoàn hảo cho mọi trường hợp; F-string tối ưu cho mã viết mới trong chương trình, trong khi % và format() mạnh về dữ liệu gom từ điển và bản mẫu nạp ngoài.',
      'Mark Lutz khẳng định sự lựa chọn công cụ thuộc về bản quyền tự do của lập trình viên, chống lại sự áp đặt độc đoán trong phát triển phần mềm.',
      'string.Template là giải pháp đơn giản và an toàn tuyệt đối khi làm việc với chuỗi bản mẫu do người dùng ngoài cung cấp (hệ thống i18n/dịch thuật).'
    ],
    nextSteps: 'Trong bài tiếp theo (C7.21), chúng ta sẽ bước sang phần tổng kết lý thuyết cốt lõi của Chương 7: Phân loại kiểu dữ liệu tổng quát (Số, Dãy tuần tự, Ánh xạ) và nguyên lý Khả biến vs Bất biến.'
  }
};
