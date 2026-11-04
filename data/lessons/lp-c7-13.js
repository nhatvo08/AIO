export default {
  id: 'lp-c7-13',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.13',
  title: 'Định dạng chuỗi: Tổng quan "Ba môn phối hợp" & Triết lý Phình to tính năng',
  subtitle: 'Sự tiến hóa từ Biểu thức % (C printf), Phương thức .format() (Python 3.0), đến F-string (Python 3.6+), và góc nhìn phê bình của Mark Lutz về hiện tượng feature bloat',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu định nghĩa và vai trò của định dạng chuỗi (string formatting): thực hiện nhiều phép thay thế đặc thù theo kiểu trên chuỗi chỉ trong một bước duy nhất.',
    'Nhận diện ba ứng viên trong cuộc đua định dạng của Python: Biểu thức định dạng (%), Phương thức định dạng (.format), và Hằng chuỗi định dạng (f-string).',
    'Nắm vững góc nhìn triết lý của Mark Lutz về sự phình to tính năng (feature bloat) trong phát triển phần mềm và lý do người học bắt buộc phải hiểu cả ba công cụ.',
    'Hiểu mối quan hệ gối đầu giữa ba công cụ và lộ trình tiếp cận tuần tự tối ưu.'
  ],

  intuition: {
    title: 'Ba ngọn lao trong một môn thể thao phối hợp',
    metaphor: 'Hãy tưởng tượng bạn tham gia một cuộc thi ba môn phối hợp (triathlon). Thay vì chỉ có một cây gậy duy nhất để hoàn thành chặng đua, qua từng thời kỳ ban tổ chức lại trang bị thêm: thời sơ khai là cây lao truyền thống (Biểu thức %), đến năm 2008 bổ sung chiếc xe đạp carbon (Phương thức .format), và gần đây nhất là đôi giày trợ lực (F-string). Dù cộng đồng ngày nay tung hô đôi giày f-string là giải pháp thời thượng nhất, cây lao và chiếc xe đạp vẫn đang lăn xả trên hàng triệu dặm đường mã nguồn thực tế viết suốt hơn 30 năm qua. Bạn không thể nhắm mắt làm ngơ trước mã của người khác!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BA THẾ HỆ CÔNG CỤ ĐỊNH DẠNG CHUỖI TRONG PYTHON</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:4px;">1. Biểu Thức % (Python 1.x+)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">
              <code>'Hello %s' % 'World'</code><br>
              • Dựa trên <code>printf</code> của ngôn ngữ C<br>
              • Ngắn gọn, có mặt ở khắp mọi nơi<br>
              • Bắt buộc tuple khi nhiều giá trị
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--success);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:4px;">2. Phương Thức .format() (Python 3.0)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">
              <code>'Hello {}'.format('World')</code><br>
              • Học hỏi từ C# / .NET<br>
              • Hỗ trợ gọi thuộc tính, khóa, đối số vị trí/từ khóa<br>
              • Mã lệnh dài dòng hơn
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--warning);border-radius:8px;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:4px;">3. F-String (Python 3.6+)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">
              <code>f'Hello {name}'</code><br>
              • Nội suy chuỗi (string interpolation)<br>
              • Biểu thức nhúng trực tiếp, thời gian chạy<br>
              • Kế thừa formatspec từ .format()
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Định Dạng Chuỗi: "Ba Môn Phối Hợp" Trong Python',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 29 / 52 – Trang 31 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Mặc dù bạn có thể làm được rất nhiều việc với các phương thức chuỗi và thao tác trên dãy tuần tự mà chúng ta đã khám phá, Python còn cung cấp một cách nâng cao hơn để kết hợp các tác vụ xử lý chuỗi: <strong>định dạng chuỗi (string formatting)</strong> cho phép chúng ta thực hiện <em>nhiều phép thay thế đặc thù theo kiểu dữ liệu trên một chuỗi chỉ trong một bước duy nhất</em>.</p>

        <p>Về mặt kỹ thuật, định dạng chuỗi không bao giờ là bắt buộc tuyệt đối—bạn luôn có thể đạt được kết quả tương tự bằng cách nối nhiều chuỗi nhỏ lại với nhau và thực hiện các phép chuyển đổi kiểu tường minh qua hàm <code>str()</code>. Tuy nhiên, định dạng chuỗi lại cực kỳ tiện lợi, đặc biệt là khi cần bố cục văn bản, trình bày báo cáo hoặc hiển thị thông tin cho người dùng chương trình.</p>

        <p>Thế nhưng, câu chuyện về định dạng chuỗi trong Python đáng tiếc là khá phức tạp do lịch sử phát triển: <strong>ngày nay có tới ba công cụ định dạng chuỗi khác nhau với chức năng chồng chéo nhau trên diện rộng</strong>.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Góc Nhìn Phê Bình của Mark Lutz: Căn Bệnh Phình To Tính Năng (Feature Bloat)',
      content: `
        <p>Tình trạng kỳ lạ này phản ánh một quy luật rất phổ biến trong phát triển phần mềm: <em>các công cụ mới xuất hiện với lời hứa hẹn táo bạo rằng sẽ là những cải tiến triệt để so với quá khứ, chỉ để rồi lại bị thay thế bởi những công cụ thậm chí còn mới hơn đưa ra những tuyên bố y hệt như vậy</em>.</p>

        <p>Hệ quả tất yếu của quá trình này là khiến ngôn ngữ trở nên cồng kềnh vì sự dư thừa, còn người học thì phải đối mặt với một đường cong học tập dốc hơn mức cần thiết. Cụ thể:</p>
        <ul>
          <li><strong>Gánh nặng học tập nhân lên:</strong> Khi có <em>N</em> tùy chọn tương đương về mặt chức năng, yêu cầu học tập của người mới sẽ bị nhân lên <em>N</em> lần.</li>
          <li><strong>Không thể trốn tránh mã cũ:</strong> Mặc dù bạn hoàn toàn có quyền chỉ chọn một công cụ (chẳng hạn như f-string) cho công việc của riêng mình, thực tế là các công cụ tiền nhiệm đã tồn tại trong nhiều thập kỷ và được hàng triệu lập trình viên sử dụng. Gần như chắc chắn bạn sẽ bắt gặp chúng khi bảo trì hoặc tái sử dụng mã nguồn của người khác.</li>
          <li><strong>Cái mới không thể xóa bỏ cái cũ:</strong> Dù cố gắng đến đâu, cái mới cũng không thể xóa bỏ hoàn toàn cái cũ trong một hệ sinh thái đã trưởng thành.</li>
        </ul>

        <p>Vì vậy, giáo trình <em>Learning Python</em> trình bày đầy đủ cả ba công cụ định dạng vì mục tiêu trang bị kiến thức toàn diện cho bạn.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Điểm Danh Ba Ứng Viên Định Dạng & Lộ Trình Học Gối Đầu',
      content: `
        <p>Dưới đây là ba ứng viên tham gia vào cuộc đua định dạng chuỗi ngày nay:</p>
        <ol>
          <li>
            <strong>Biểu thức định dạng (Formatting expression): <code>'...%s...%s...' % (value, value)</code></strong><br>
            Kỹ thuật nguyên bản có sẵn từ thuở sơ khai của Python, dựa trên mô hình <code>printf</code> của ngôn ngữ C và được sử dụng rộng rãi trong hàng triệu dòng mã nguồn hiện có. Các giá trị bên phải toán tử <code>%</code> thay thế cho các mục tiêu chuyển đổi bên trái.
          </li>
          <li>
            <strong>Phương thức định dạng (Formatting method): <code>'...{}...{}...'.format(value, value)</code></strong><br>
            Một kỹ thuật mới hơn được bổ sung trong Python 3.0, bắt nguồn một phần từ công cụ cùng tên trong C#/.NET. Về cơ bản nó trùng lặp chức năng với biểu thức nhưng hướng tới việc xóa bỏ sự phân biệt giữa giá trị đơn và tuple của <code>%</code>.
          </li>
          <li>
            <strong>Hằng chuỗi định dạng (Formatted string literal / f-string): <code>f'...{value}...{value}...'</code></strong><br>
            Dạng mới nhất được bổ sung trong Python 3.6. Nó thực hiện phép nội suy chuỗi (string interpolation), thay thế trực tiếp các biểu thức nội tuyến bằng kết quả chạy của chúng tại thời gian chạy.
          </li>
        </ol>

        <p>Xét về mặt kỹ thuật, một công cụ bổ sung là <code>string.Template</code> thậm chí đã ra đời trước cả phương thức định dạng—nâng tổng số công cụ định dạng lên con số <strong>bốn</strong>! Tuy nhiên nó ít được sử dụng đến mức chỉ được xếp vào một khung chuyên đề ngắn ở cuối chương.</p>

        <div class="callout-box callout-tip" style="border-left:4px solid var(--accent-primary);margin-top:16px;">
          <div class="callout-header">
            <span>💡</span>
            <span><strong>Lời khuyên về lộ trình học từ Mark Lutz:</strong></span>
          </div>
          <div class="callout-body">
            <p>Dù bạn có thể muốn nhảy ngay đến f-string—thứ đang được cộng đồng blog ca ngợi—các bài học sau đây được <strong>xây dựng gối đầu lên nhau</strong>. Chẳng hạn, cú pháp đặc tả định dạng (<code>formatspec</code>) của f-string sử dụng lại toàn bộ cú pháp đã được thiết kế cho phương thức <code>format()</code>. Do đó, đi tuần tự từ Biểu thức ➔ Phương thức ➔ F-string là lộ trình vững chắc và tiết kiệm thời gian nhất!</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Đối chiếu nhanh ba phong cách định dạng chuỗi cơ bản',
          code: `tool = 'Python'
version = 3.12

# 1. Biểu thức định dạng (%)
res1 = 'Học %s phiên bản %.2f!' % (tool, version)

# 2. Phương thức định dạng (.format)
res2 = 'Học {} phiên bản {:.2f}!'.format(tool, version)

# 3. Hằng chuỗi định dạng (f-string)
res3 = f'Học {tool} phiên bản {version:.2f}!'

print(res1)
print(res2)
print(res3)
print("Kết quả ba cách có giống hệt nhau?", res1 == res2 == res3)`,
          output: `Học Python phiên bản 3.12!
Học Python phiên bản 3.12!
Học Python phiên bản 3.12!
Kết quả ba cách có giống hệt nhau? True`,
          annotations: [
            { line: 5, text: 'Biểu thức %: %s chuyển thành chuỗi, %.2f hiển thị 2 số lẻ thập phân.' },
            { line: 8, text: 'Phương thức .format(): {} lấy theo thứ tự vị trí.' },
            { line: 11, text: 'F-string: Biểu thức biến nhúng trực tiếp trong dấu ngoặc nhọn.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
      title: 'Mẹo Chọn Công Cụ Cho Dự Án Mới',
      content: `Nếu bạn viết mã hoàn toàn mới từ đầu trong Python hiện đại, f-string là lựa chọn tự nhiên và tiện lợi nhất. Tuy nhiên, khi xây dựng các ứng dụng cần nạp mẫu bản mẫu từ tệp cấu hình bên ngoài hoặc cơ sở dữ liệu tại thời gian chạy, Biểu thức % hoặc Phương thức .format() lại an toàn hơn f-string rất nhiều (vì f-string đòi hỏi phải chạy mã qua eval).`
      }
    ],
    pitfalls: [
      {
      title: 'Cạm Bẫy Kỳ Thị Mã Nguồn Cũ',
      content: `Nhiều tài liệu trực tuyến vội vã tuyên bố biểu thức % là "lỗi thời" (deprecated). Thực tế, Python core team chưa từng và không có kế hoạch loại bỏ toán tử % khỏi chuỗi vì khối lượng mã nguồn toàn cầu sử dụng nó quá khổng lồ. Đừng ngạc nhiên hay bối rối khi gặp % trong các thư viện lớn như logging, django, numpy!`
      }
    ]
  },

  exercises: [
    {
      id: 'ex-1',
      title: 'Thực nghiệm ba môn phối hợp định dạng',
      question: 'Cho hai biến: language = "Python", count = 3. Hãy viết ba dòng lệnh khác nhau lần lượt dùng Biểu thức %, Phương thức .format(), và F-string để tạo ra chuỗi kết quả: "Có 3 cách định dạng trong Python!".',
      starterCode: `language = "Python"
count = 3

# Viết 3 cách định dạng bên dưới:
# cách 1 (biểu thức %):
# cách 2 (phương thức format):
# cách 3 (f-string):
`,
      solution: `language = "Python"
count = 3

c1 = "Có %d cách định dạng trong %s!" % (count, language)
c2 = "Có {} cách định dạng trong {}!".format(count, language)
c3 = f"Có {count} cách định dạng trong {language}!"

print(c1)
print(c2)
print(c3)
print(c1 == c2 == c3)`,
      hints: [
        'Với biểu thức %, %d dùng cho số nguyên và %s dùng cho chuỗi, các giá trị gom trong tuple (count, language).',
        'Với phương thức format, gọi .format(count, language) trên chuỗi bản mẫu chứa {}.',
        'Với f-string, viết tiền tố f phía trước chuỗi và nhúng {count}, {language} trực tiếp.'
      ]
    }
  ],

  quiz: [
    {
      question: 'Tại sao tác giả Mark Lutz coi sự tồn tại của 3 công cụ định dạng chuỗi là một biểu hiện của hiện tượng "phình to tính năng" (feature bloat)?',
      options: [
        'Vì chúng có cú pháp hoàn toàn trái ngược nhau và không thể chạy trên cùng một phiên bản Python.',
        'Vì các công cụ mới ra đời với lời hứa hẹn cải tiến nhưng lại trùng lặp chức năng lớn với công cụ cũ, khiến kích thước ngôn ngữ cồng kềnh và nhân yêu cầu học tập của người mới lên nhiều lần.',
        'Vì f-string làm chậm tốc độ chạy của Python đi gấp 3 lần.',
        'Vì Python bắt buộc phải bỏ toán tử % thì mới chạy được f-string.'
      ],
      correctIndex: 1,
      explanation: 'Mark Lutz phê bình hiện tượng các công cụ mới xuất hiện hứa hẹn thay thế quá khứ nhưng không loại bỏ được công cụ cũ, dẫn đến việc N tùy chọn trùng lặp về mặt chức năng làm tăng gánh nặng học tập của người lập trình lên N lần.'
    },
    {
      question: 'Biểu thức định dạng chuỗi bằng toán tử % có nguồn gốc thiết kế từ đâu?',
      options: [
        'Hàm printf trong ngôn ngữ lập trình C.',
        'Kỹ thuật nội suy chuỗi trong Perl.',
        'Hàm String.Format() trong C# .NET.',
        'Cú pháp template string trong JavaScript ES6.'
      ],
      correctIndex: 0,
      explanation: 'Biểu thức % là công cụ nguyên bản từ thuở đầu của Python, được mô phỏng theo hàm printf kinh điển của ngôn ngữ C.'
    }
  ],

  summary: {
    takeaways: [
      'Định dạng chuỗi kết hợp nhiều phép thay thế theo kiểu trên chuỗi chỉ trong một bước duy nhất.',
      'Python sở hữu ba công cụ định dạng chính: Biểu thức % (nguyên bản từ C printf), Phương thức .format() (bổ sung từ Python 3.0), và F-string (bổ sung từ Python 3.6).',
      'string.Template là công cụ thứ tư nhưng ít dùng, chỉ được đề cập tóm tắt.',
      'Hiện tượng phình to tính năng tạo ra sự dư thừa, nhưng người học cần nắm cả ba để tự tin đọc hiểu mã nguồn thực tế và lựa chọn công cụ phù hợp.'
    ],
    nextSteps: 'Trong bài học tiếp theo (C7.14), chúng ta sẽ bắt đầu với công cụ nguyên bản: Biểu thức định dạng chuỗi với toán tử %, cú pháp mục tiêu chuyển đổi, Bảng 7-4 các mã kiểu, và các ví dụ nâng cao.'
  }
};
