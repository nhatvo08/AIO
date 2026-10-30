export default {
  id: 'lp-c7-00',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.0',
  title: 'Mở đầu: Các nền tảng cơ bản về chuỗi & Bảng 7-1',
  subtitle: 'Tổng quan về kiểu dữ liệu chuỗi (str), bản chất dãy tuần tự bất biến và Bảng 7-1 các thao tác chuỗi thông dụng',
  level: 'Cơ bản',
  duration: '20 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Xác định rõ vị trí của Chương 7: chuyến khảo sát chuyên sâu lần hai về chuỗi (str) sau cái nhìn lướt qua ở Chương 4.',
    'Nắm vững bản chất kỹ thuật: chuỗi là một dãy tuần tự bất biến (immutable sequence) chứa các ký tự có thứ tự vị trí từ trái sang phải.',
    'Hiểu ranh giới phạm vi giáo trình: kiến thức cốt yếu được làm chủ tại đây, trong khi các chủ đề mở rộng sang Unicode và chuỗi byte nằm ở Chương 37.',
    'Bao quát Bảng 7-1: bức tranh toàn cảnh về các dạng hằng chuỗi, toán tử biểu thức, phương thức và công cụ định dạng chuỗi trong Python.'
  ],

  intuition: {
    title: 'Băng chuyền ký tự được niêm phong vĩnh cửu',
    metaphor: 'Hãy tưởng tượng chuỗi ký tự trong Python giống như một băng chuyền gồm các ô kính trong suốt được đánh số thứ tự từ trái sang phải (0, 1, 2,...). Mỗi ô kính chứa một ký tự duy nhất. Băng chuyền này có hai đặc tính bất biến tuyệt đối: thứ nhất, các ô kính có thứ tự vị trí cố định không thể đảo lộn (dãy tuần tự - sequence); thứ hai, toàn bộ băng chuyền đã được niêm phong bằng lớp kính cường lực vĩnh cửu ngay khi được tạo ra (tính bất biến - immutable). Bạn có thể soi qua lớp kính để đọc ký tự ở bất kỳ vị trí nào, có thể sao chép một đoạn băng chuyền ra để đúc thành một băng chuyền mới tinh, nhưng tuyệt đối không thể thò tay vào để cạy hay thay thế ký tự trong băng chuyền cũ. Đó chính là bản chất của kiểu str trong Python.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH CHUỖI: DÃY TUẦN TỰ BẤT BIẾN (IMMUTABLE SEQUENCE)</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:8px;flex-wrap:wrap;padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
            <span style="font-size:0.75rem;color:var(--text-muted);">Offset 0</span>
            <span style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;background:var(--accent-soft);color:var(--accent-text);font-weight:700;border:1px solid var(--border-strong);border-radius:6px;font-size:1.1rem;">'P'</span>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
            <span style="font-size:0.75rem;color:var(--text-muted);">Offset 1</span>
            <span style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;background:var(--accent-soft);color:var(--accent-text);font-weight:700;border:1px solid var(--border-strong);border-radius:6px;font-size:1.1rem;">'y'</span>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
            <span style="font-size:0.75rem;color:var(--text-muted);">Offset 2</span>
            <span style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;background:var(--accent-soft);color:var(--accent-text);font-weight:700;border:1px solid var(--border-strong);border-radius:6px;font-size:1.1rem;">'t'</span>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
            <span style="font-size:0.75rem;color:var(--text-muted);">Offset 3</span>
            <span style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;background:var(--accent-soft);color:var(--accent-text);font-weight:700;border:1px solid var(--border-strong);border-radius:6px;font-size:1.1rem;">'h'</span>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
            <span style="font-size:0.75rem;color:var(--text-muted);">Offset 4</span>
            <span style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;background:var(--accent-soft);color:var(--accent-text);font-weight:700;border:1px solid var(--border-strong);border-radius:6px;font-size:1.1rem;">'o'</span>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
            <span style="font-size:0.75rem;color:var(--text-muted);">Offset 5</span>
            <span style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;background:var(--accent-soft);color:var(--accent-text);font-weight:700;border:1px solid var(--border-strong);border-radius:6px;font-size:1.1rem;">'n'</span>
          </div>
        </div>
        <div style="text-align:center;font-size:0.82rem;color:var(--text-muted);">
          <em>Có thứ tự từ trái sang phải • Truy cập theo độ lệch 0..N-1 • Không thể thay đổi tại chỗ</em>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khảo sát Chuyên sâu Lần hai: Vị trí của Chuỗi trong Giáo trình',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác (Objects and Operations) • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 1 / 52 – Trang 2 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Cho đến thời điểm này, chúng ta đã nghiên cứu về các kiểu số ở Chương 5 và khám phá mô hình định kiểu động cùng cơ chế tham chiếu của Python ở Chương 6. Kiểu dữ liệu chính tiếp theo trong chuyến hành trình tìm hiểu chuyên sâu về thế giới đối tượng là <strong>chuỗi (string / <code>str</code>)</strong> trong Python—một tập hợp có thứ tự các ký tự được dùng để lưu trữ và biểu diễn thông tin dạng văn bản cũng như dạng byte.</p>

        <p>Chúng ta đã điểm qua chuỗi một cách ngắn gọn ở Chương 4. Tại đây, chúng ta sẽ xem lại chúng một cách kỹ lưỡng để bổ sung toàn bộ những chi tiết nền tảng đã bỏ qua trước đó.</p>

        <p>Trước khi bắt đầu, tác giả Mark Lutz làm rõ ngay những nội dung sẽ <em>không</em> đề cập tại chương này. Chương 4 cũng đã giới thiệu sơ lược về chuỗi Unicode và tệp—những công cụ để xử lý văn bản phi-ASCII. Unicode là công cụ then chốt đối với các lập trình viên hiện đại, đặc biệt là những ai làm việc trong lĩnh vực internet, web, email, GUI, xử lý XML và JSON. Đồng thời, Unicode có thể là một chủ đề khá nặng đối với những lập trình viên mới bắt đầu, đòi hỏi phải dựa vào các công cụ tệp (file) mà chúng ta chưa học đầy đủ.</p>

        <p>Chính vì lẽ đó, giáo trình chia nội dung về chuỗi thành hai phần rõ rệt:</p>
        <ol>
          <li><strong>Những kiến thức cốt yếu tại Chương 7:</strong> Phần mà đại đa số các tập lệnh (script) sử dụng thường nhật, và hầu hết người học Python cần nắm vững ngay từ đầu.</li>
          <li><strong>Phần mở rộng sang Unicode cùng chuỗi byte tại Chương 37:</strong> Thuộc phần các chủ đề nâng cao ở cuối cuốn sách, hoàn tất thiên trường ca về chuỗi.</li>
        </ol>

        <p>Dù phạm vi có giới hạn như vậy, mọi điều chúng ta học ở đây cũng sẽ áp dụng trực tiếp cho việc xử lý Unicode và byte, bởi vì chuỗi văn bản trong Python bản chất chính là Unicode (ngay cả khi chỉ là văn bản ASCII thuần túy), còn chuỗi byte đơn giản là các chuỗi bị giới hạn ở các giá trị byte 8-bit.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Căn bản về Đối tượng Chuỗi: Dãy tuần tự Bất biến',
      content: `
        <p>Xét từ góc độ chức năng, chuỗi có thể được dùng để biểu diễn hầu như mọi thứ có thể mã hóa dưới dạng văn bản hoặc byte:</p>
        <ul>
          <li><strong>Mảng văn bản:</strong> Ký hiệu và từ ngữ (tên của bạn, địa chỉ), nội dung của các tệp văn bản nạp vào bộ nhớ RAM, địa chỉ internet (URL), và chính mã nguồn chương trình Python.</li>
          <li><strong>Mảng byte thô:</strong> Dữ liệu nhị phân của các tệp đa phương tiện (hình ảnh, âm thanh), dữ liệu truyền tải qua mạng internet, cùng cả hai dạng đã mã hóa (encoded) và đã giải mã (decoded) của văn bản Unicode phi-ASCII.</li>
        </ul>

        <p>Nếu bạn từng có kinh nghiệm lập trình trong các ngôn ngữ khác như C, chuỗi của Python đóng vai trò tương tự như <em>mảng ký tự (character arrays)</em>, nhưng chúng là một công cụ cấp cao hơn mảng rất nhiều. Chuỗi trong Python đi kèm với một bộ công cụ xử lý mạnh mẽ được viết sẵn, bộ nhớ được cấp phát và thu gom hoàn toàn tự động. Đồng thời, khác với C, <strong>Python không có kiểu dữ liệu riêng biệt cho các ký tự đơn lẻ (không có kiểu <code>char</code>)</strong>; thay vào đó, bạn chỉ cần dùng các chuỗi gồm một ký tự để biểu diễn thông tin gồm một ký tự.</p>

        <p>Nói một cách chặt chẽ theo thuật ngữ Python, chuỗi được xếp vào loại <strong>dãy tuần tự bất biến (immutable sequence)</strong>:</p>
        <ul>
          <li><strong>Dãy tuần tự (sequence):</strong> Các ký tự bên trong có thứ tự vị trí từ trái sang phải, hỗ trợ các thao tác theo vị trí như đánh chỉ mục (indexing), cắt lát (slicing), ghép nối và duyệt lặp.</li>
          <li><strong>Bất biến (immutable):</strong> Không thể thay đổi các ký tự bên trong chuỗi tại chỗ. Mọi thao tác "sửa đổi" thực chất đều sinh ra một đối tượng chuỗi mới tinh trong bộ nhớ.</li>
        </ul>

        <p>Trên thực tế, chuỗi là đại diện đầu tiên của nhóm đối tượng lớn hơn được gọi là dãy tuần tự (sequence) mà chúng ta khám phá chuyên sâu. Các thao tác trên dãy tuần tự được trình bày trong chương này sẽ hoạt động hoàn toàn tương tự trên các kiểu dãy tuần tự khác như <code>list</code> và <code>tuple</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Khám phá tính bất biến và không có kiểu char riêng trong Python',
          code: `# Python dùng chuỗi độ dài 1 thay cho kiểu char riêng biệt
char_sample = 'P'
print("Kiểu của 'P':", type(char_sample).__name__)
print("Độ dài:", len(char_sample))

# Thao tác đọc vị trí hoàn toàn hợp lệ
s = 'Python'
print("Ký tự đầu tiên:", s[0])

# Cố tình thay đổi ký tự tại chỗ sẽ gây lỗi TypeError!
try:
    s[0] = 'J'
except TypeError as e:
    print("Bắt lỗi thành công:", e)`,
          output: `Kiểu của 'P': str
Độ dài: 1
Ký tự đầu tiên: P
Bắt lỗi thành công: 'str' object does not support item assignment`,
          annotations: [
            { line: 3, text: 'Ký tự đơn lẻ \'P\' vẫn mang kiểu str, Python không có kiểu char như C hay Java.' },
            { line: 8, text: 'Truy cập ký tự theo chỉ mục 0 trả về chuỗi một ký tự \'P\'.' },
            { line: 12, text: 'Phép gán s[0] = \'J\' thất bại vì str là đối tượng bất biến (immutable).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Bảng 7-1: Toàn cảnh các Hằng chuỗi & Thao tác Thông dụng',
      content: `
        <p>Như bước đi đầu tiên, <strong>Bảng 7-1</strong> giới thiệu sơ lược về các hằng chuỗi (string literal) và những thao tác chuỗi thông dụng nhất được thảo luận trong toàn bộ Chương 7, thông qua các ví dụ trừu tượng tiêu biểu.</p>

        <div style="overflow-x:auto;margin:16px 0;">
          <table class="data-table" style="width:100%;border-collapse:collapse;font-size:0.88rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);text-align:left;">
                <th style="padding:10px 12px;width:35%;">Thao tác (Operation)</th>
                <th style="padding:10px 12px;">Ý nghĩa / Diễn giải (Interpretation)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>S = ''</code></td>
                <td style="padding:8px 12px;">Chuỗi rỗng (độ dài bằng 0)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>S = "app's"</code></td>
                <td style="padding:8px 12px;">Dấu nháy kép, tương tự như nháy đơn; nhúng được nháy đơn</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>S = 'c\\no\\td\\x00e'</code></td>
                <td style="padding:8px 12px;">Các ký tự thoát (escape sequence) biểu diễn ký tự đặc biệt</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>S = """…multiline…"""</code></td>
                <td style="padding:8px 12px;">Chuỗi khối nhiều dòng với dấu nháy ba (block string)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>S = r'\\temp\\data.txt'</code></td>
                <td style="padding:8px 12px;">Chuỗi thô (raw string) bỏ qua xử lý ký tự thoát</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>B = b'h\\xc4ck'</code></td>
                <td style="padding:8px 12px;">Chuỗi byte (Chương 4, Chương 37)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>S = 'py\\U0001F40D'</code></td>
                <td style="padding:8px 12px;">Chuỗi Unicode chứa code point 32-bit (Chương 4, Chương 37)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>S = u'py\\U0001F40D'</code></td>
                <td style="padding:8px 12px;">Tiền tố tương thích ngược Python 2.X (Chương 37)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>S1 + S2<br>S * 3</code></td>
                <td style="padding:8px 12px;">Nối chuỗi (concatenation) và lặp lại chuỗi (repetition)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>S[i]<br>S[i:j]<br>len(S)</code></td>
                <td style="padding:8px 12px;">Đánh chỉ mục (indexing), cắt lát (slicing) và tính độ dài</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>S1 > S2, S1 == S2</code></td>
                <td style="padding:8px 12px;">So sánh: so thứ tự từ điển (độ lớn code point) và bằng nhau</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>'a %s coder' % kind</code></td>
                <td style="padding:8px 12px;">Biểu thức định dạng chuỗi (Formatting expression kinh điển)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>'a {0} coder'.format(kind)</code></td>
                <td style="padding:8px 12px;">Phương thức định dạng chuỗi (Formatting method từ Python 3.0)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>f'a {kind} coder'</code></td>
                <td style="padding:8px 12px;">Hằng chuỗi định dạng (f-string từ Python 3.6+)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>S.find('od')<br>S.rstrip()<br>S.replace('od', 'ood')<br>S.split(',')<br>S.isdigit()<br>S.lower()<br>S.endswith('thon')<br>S.join(strlist)<br>S.encode('utf8')<br>B.decode('latin1')</code></td>
                <td style="padding:8px 12px;">Các phương thức chuỗi: tìm kiếm, loại bỏ khoảng trắng, thay thế, tách chuỗi, kiểm tra ký tự, chuyển chữ hoa/thường, ghép chuỗi, mã hóa/giải mã Unicode (xem Bảng 7-3)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>'py' in S.lower()<br>for x in S: print(x)<br>[c * 2 for c in S]<br>map(ord, S)</code></td>
                <td style="padding:8px 12px;">Kiểm tra tư cách thành viên, duyệt lặp bằng vòng lặp, comprehension, hàm ánh xạ</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;"><code>re.match('Py(.*)on', line)</code></td>
                <td style="padding:8px 12px;">Khớp mẫu văn bản nâng cao: module thư viện <code>re</code> (biểu thức chính quy)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>Vượt ra ngoài bộ công cụ chuỗi cốt lõi trong Bảng 7-1, Python còn hỗ trợ xử lý chuỗi dựa trên mẫu nâng cao hơn với module <code>re</code> (regular expression) và các bộ phân tích cú pháp HTML, JSON, XML. Tuy nhiên, cuốn sách này và toàn bộ Chương 7 tập trung trọn vẹn vào <strong>những nền tảng căn bản vững chắc nhất</strong> được đại diện bởi Bảng 7-1.</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Quy luật lan tỏa của các thao tác trên dãy tuần tự',
        content: 'Mọi thao tác dãy tuần tự mà bạn thành thạo trên chuỗi ở chương này (như chỉ mục âm, cắt lát <code>[i:j]</code>, sải bước <code>[::2]</code>, phép cộng <code>+</code>, phép nhân <code>*</code>, toán tử <code>in</code>, vòng lặp <code>for</code>) sẽ hoạt động y hệt trên <code>list</code> và <code>tuple</code>. Nắm vững chuỗi là bạn đã làm chủ 80% kỹ năng thao tác trên toàn bộ các kiểu dữ liệu tuần tự trong Python.'
      }
    ],
    pitfalls: [
      {
        title: 'Đừng trông đợi toàn bộ ví dụ trong Bảng 7-1 chạy trực tiếp',
        content: 'Như tác giả Mark Lutz lưu ý ngay tại trang 2, Bảng 7-1 là một bảng tổng kết khái niệm mang tính đại diện trừu tượng để bạn có cái nhìn toàn cảnh trước khi đi vào từng bài học. Các biến như <code>S1</code>, <code>S2</code>, <code>kind</code>, <code>strlist</code> cần được định nghĩa cụ thể trong từng ngữ cảnh trước khi thực thi.'
      }
    ]
  },

  exercises: [
    {
      title: 'Xác định các đặc tính cốt lõi của kiểu str trong Python',
      level: 'Dễ',
      problem: 'Hãy viết một đoạn mã Python ngắn chứng minh hai đặc tính cơ bản nhất của kiểu chuỗi: (1) Chuỗi là một dãy tuần tự có thứ tự (in ra ký tự tại vị trí đầu và cuối), và (2) Chuỗi là bất biến (dùng khối try/except để minh họa rằng việc sửa ký tự tại chỗ sẽ kích hoạt lỗi gì).',
      hint: 'Dùng chỉ mục 0 cho ký tự đầu, chỉ mục -1 cho ký tự cuối, và cố tình gán s[0] = ... trong khối try/except bắt TypeError.',
      solutionCode: `word = "Python"

# 1. Chứng minh tính dãy tuần tự (có thứ tự vị trí)
first_char = word[0]
last_char = word[-1]
print(f"Ký tự đầu: '{first_char}', Ký tự cuối: '{last_char}'")

# 2. Chứng minh tính bất biến (không thể gán tại chỗ)
try:
    word[0] = 'C'
except TypeError as err:
    print(f"Bắt lỗi: {type(err).__name__} - {err}")`,
      solutionOutput: `Ký tự đầu: 'P', Ký tự cuối: 'n'
Bắt lỗi: TypeError - 'str' object does not support item assignment`,
      explanation: 'Đoạn mã chứng minh trực quan: chuỗi hỗ trợ truy xuất theo độ lệch số (0 và -1) vì là dãy tuần tự, nhưng việc gán giá trị tại chỗ bị trình thông dịch từ chối với lỗi TypeError do chuỗi là kiểu dữ liệu bất biến.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây mô tả CHÍNH XÁC NHẤT về bản chất của kiểu dữ liệu chuỗi (str) trong Python?',
      options: [
        'Chuỗi là một mảng ký tự khả biến, có thể tùy ý sửa đổi từng phần tử tại chỗ giống như ngôn ngữ C.',
        'Chuỗi là một dãy tuần tự bất biến (immutable sequence) gồm các ký tự có thứ tự vị trí từ trái sang phải.',
        'Chuỗi là một cấu trúc dữ liệu ánh xạ (mapping) liên kết các chỉ mục số với các đối tượng byte.',
        'Python có kiểu dữ liệu char độc lập để chứa một ký tự đơn lẻ, và chuỗi là tập hợp các đối tượng char đó.'
      ],
      correctIndex: 1,
      explanation: 'Trong Python, chuỗi được định nghĩa chính thức là dãy tuần tự bất biến (immutable sequence). Python không có kiểu char riêng lẻ, mà sử dụng chuỗi gồm một ký tự.'
    },
    {
      question: 'Theo lộ trình của giáo trình Learning Python, chủ đề nào về chuỗi được hoãn lại đến Chương 37?',
      options: [
        'Các thao tác cắt lát (slicing) và đánh chỉ mục (indexing).',
        'Các phương thức tìm kiếm và thay thế như find() và replace().',
        'Chuyên đề mở rộng sang Unicode chuyên sâu và chuỗi byte (bytes).',
        'Ba công cụ định dạng chuỗi (%, format và f-string).'
      ],
      correctIndex: 2,
      explanation: 'Mark Lutz làm rõ ở đầu chương: những kiến thức cốt yếu được học ở Chương 7, còn phần mở rộng sang Unicode chuyên sâu và chuỗi byte được trình bày ở Chương 37 thuộc phần chủ đề nâng cao.'
    }
  ],

  summary: [
    'Chương 7 là chuyến khảo sát chuyên sâu lần hai về chuỗi (str) nhằm trang bị đầy đủ nền tảng vững chắc cho người học Python.',
    'Chuỗi là dãy tuần tự bất biến (immutable sequence): các phần tử có thứ tự vị trí xác định và không thể thay đổi tại chỗ.',
    'Python không có kiểu char riêng biệt; một ký tự đơn lẻ đơn thuần là một chuỗi có độ dài bằng 1.',
    'Phạm vi Chương 7 tập trung vào các công cụ cốt lõi phục vụ đại đa số các tập lệnh; chuyên đề Unicode nâng cao và chuỗi byte nằm ở Chương 37.',
    'Bảng 7-1 tổng kết 16 nhóm thao tác chuỗi thông dụng, đặt nền móng cho các bài học chi tiết tiếp theo.'
  ]
};
