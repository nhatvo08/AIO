export default {
  id: 'lp-c7-22',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.22',
  title: 'Tóm tắt Chương 7 & Bộ 7 Câu hỏi Ôn tập kèm Lời giải Chi tiết',
  subtitle: 'Tổng kết toàn diện 23 bài học nền tảng về chuỗi và bộ 7 câu hỏi tự đánh giá kinh điển của Mark Lutz về phương thức, slice, ord/chr, tính bất biến, parsing và định dạng chuỗi',
  level: 'Trung bình',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Tổng hợp toàn diện toàn bộ các trụ cột kiến thức của Chương 7: hằng chuỗi, ký tự thoát, chuỗi thô, chuỗi nháy ba, thao tác dãy tuần tự, phương thức chuỗi, ba công cụ định dạng và phân loại kiểu tổng quát.',
    'Tự kiểm tra và củng cố hiểu biết sâu sắc thông qua bộ 7 câu hỏi ôn tập nguyên bản từ sách giáo trình của Mark Lutz.',
    'Nắm vững lời giải chi tiết và phân tích sâu sắc của tác giả cho từng câu hỏi: tính đặc thù kiểu của phương thức vs tính đa hình của slice, hàm ord/chr, cơ chế gián tiếp thay đổi chuỗi bất biến, và phân tách ký tự thoát.',
    'Chuẩn bị tâm thế và kiến thức nền tảng vững vàng để tiến tới Chương 8 (Danh sách và Từ điển).'
  ],

  intuition: {
    title: 'Trạm dừng chân toàn cảnh và bài kiểm tra 7 ngọn đuốc',
    metaphor: 'Sau hành trình dài 23 bài học băng qua toàn bộ xứ sở chuỗi ký tự — từ những ký tự thoát \\n hiểm trở, hẻm núi chuỗi thô r"...", đến những đại lộ thênh thang của các phương thức replace/split và ba môn phối hợp định dạng chuỗi — bài học này là trạm kiểm định cuối cùng trên đỉnh đèo. Tác giả Mark Lutz thắp lên 7 ngọn đuốc câu hỏi thử thách. Nếu bạn tự tin vượt qua cả 7 thử thách này, bạn đã thực sự làm chủ một trong những kiểu dữ liệu trung tâm và quyền năng nhất của Python!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BẢN ĐỒ KIẾN THỨC CỐT LÕI CHƯƠNG 7: CÁC NỀN TẢNG CƠ BẢN VỀ CHUỖI</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">1. Hằng &amp; Ký Tự Thoát</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Nháy đơn/kép/ba • Docstring<br>• Bảng 7-2 Escape codes (\\n, \\t, \\x)<br>• Chuỗi thô r"..." đường dẫn Windows</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);">2. Thao Tác Dãy Tuần Tự</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Nối +, lặp *, in, for loop<br>• Đánh chỉ mục S[i], slice S[i:j]<br>• Slice mở rộng S[i:j:k], đảo [::-1]</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--warning);border-radius:6px;">
            <div style="font-weight:700;color:var(--warning);">3. Phương Thức Chuỗi</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Bảng 7-3 Các phương thức cốt lõi<br>• replace(), find(), split(), join()<br>• Không đổi tại chỗ (bất biến)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #e06c75;border-radius:6px;">
            <div style="font-weight:700;color:#e06c75;">4. Ba Môn Phối Hợp Định Dạng</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Biểu thức % (Bảng 7-4, dict, vars)<br>• Phương thức .format() (formatspec)<br>• F-string (nội suy, Python 3.12+)</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Tóm Tắt Toàn Diện Kiến Thức Cốt Lõi Chương 7',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 51 / 52 – Trang 52 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Trong chương này, chúng ta đã thực hiện một chuyến khảo sát chuyên sâu lần thứ hai về kiểu đối tượng chuỗi trong Python. Chúng ta đã tích lũy được những kiến thức nền tảng quan trọng sau:</p>
        <ol>
          <li><strong>Hằng chuỗi và biến thể cú pháp:</strong> Làm chủ nháy đơn, nháy kép, chuỗi khối nháy ba đa năng dùng làm chú thích nhiều dòng hoặc docstring; bảng ký tự thoát Bảng 7-2; và giải pháp chuỗi thô (raw string) <code>r"..."</code> xử lý đường dẫn tệp Windows và biểu thức chính quy.</li>
          <li><strong>Thao tác dãy tuần tự tổng quát:</strong> Hiểu rõ phép nối <code>+</code>, phép lặp <code>*</code>, duyệt vòng lặp <code>for</code>, kiểm tra <code>in</code>, đánh chỉ mục âm và dương Hình 7-1, cắt lát cơ bản <code>S[i:j]</code> và cắt lát mở rộng bước nhảy <code>S[i:j:k]</code> với thủ thuật đảo ngược chuỗi kinh điển <code>[::-1]</code>.</li>
          <li><strong>Chuyển đổi số và mã ký tự:</strong> Thành thạo hàm <code>int()</code>, <code>float()</code>, <code>str()</code> và cặp hàm chuyển đổi mã số nguyên Unicode/ASCII: <code>ord()</code> và <code>chr()</code>.</li>
          <li><strong>Bản chất bất biến (Immutable):</strong> Chuỗi không thể thay đổi tại chỗ. Mọi thao tác sửa đổi đều phải tiến hành gián tiếp thông qua việc tạo ra một chuỗi mới (bằng phép nối, slice, replace, join) rồi gán lại cho biến.</li>
          <li><strong>Phương thức chuỗi chuyên dụng (Bảng 7-3):</strong> Sử dụng thành thạo <code>find()</code>, <code>replace()</code>, <code>split()</code>, <code>join()</code>, <code>strip()</code>... với ưu thế tốc độ vượt trội so với module <code>re</code>.</li>
          <li><strong>Ba môn phối hợp định dạng chuỗi:</strong> Phân tích sâu sắc ba thế hệ công cụ: Biểu thức <code>%</code> (Bảng 7-4, dict, <code>vars()</code>), Phương thức <code>.format()</code> (cú pháp <code>formatspec</code>, phân cách hàng nghìn <code>,</code> và <code>_</code>), Hằng chuỗi F-string (Python 3.6 và đột phá PEP 701 trong Python 3.12+), cùng công cụ bổ sung <code>string.Template</code>.</li>
          <li><strong>Phân loại kiểu dữ liệu tổng quát:</strong> Ba phân loại lớn (Số, Dãy tuần tự, Ánh xạ) chia sẻ tập hợp thao tác theo tính đa hình, và ranh giới Khả biến vs Bất biến.</li>
        </ol>

        <p>Trong chương tiếp theo (Chương 8), chúng ta sẽ tiếp tục chuyến hành trình tìm hiểu các kiểu dữ liệu với việc xem xét các tập hợp đối tượng tổng quát nhất trong Python: <strong>Danh sách (list)</strong> và <strong>Từ điển (dict)</strong>. Nhưng trước khi bước tiếp, hãy hoàn thành bài kiểm tra 7 câu hỏi ôn tập dưới đây!</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Bộ 7 Câu Hỏi Ôn Tập Kiểm Tra Kiến Thức Kinh Điển Của Mark Lutz',
      content: `
        <p>Hãy tự phân tích và suy nghĩ câu trả lời cho 7 câu hỏi dưới đây trước khi mở xem phần đáp án và giải thích chi tiết của Mark Lutz:</p>

        <div style="display:flex;flex-direction:column;gap:16px;margin-top:16px;">
          <!-- Câu 1 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu hỏi 1:</div>
            <div style="font-size:0.92rem;color:var(--text-primary);">Phương thức <code>find</code> của chuỗi có thể được dùng để tìm kiếm trên một danh sách (list) không?</div>
          </div>

          <!-- Câu 2 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu hỏi 2:</div>
            <div style="font-size:0.92rem;color:var(--text-primary);">Một biểu thức slice (cắt lát) chuỗi có thể được dùng trên một danh sách (list) không?</div>
          </div>

          <!-- Câu 3 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu hỏi 3:</div>
            <div style="font-size:0.92rem;color:var(--text-primary);">Làm thế nào để bạn chuyển đổi một ký tự thành mã số nguyên ASCII của nó? Làm thế nào để bạn chuyển đổi theo chiều ngược lại, từ một mã số nguyên thành một ký tự?</div>
          </div>

          <!-- Câu 4 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu hỏi 4:</div>
            <div style="font-size:0.92rem;color:var(--text-primary);">Bạn có thể tiến hành thay đổi một chuỗi trong Python như thế nào?</div>
          </div>

          <!-- Câu 5 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu hỏi 5:</div>
            <div style="font-size:0.92rem;color:var(--text-primary);">Cho một chuỗi <code>S</code> có giá trị <code>'c,od,e'</code>, hãy nêu hai cách khác nhau để trích xuất hai ký tự ở giữa (<code>'od'</code>).</div>
          </div>

          <!-- Câu 6 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu hỏi 6:</div>
            <div style="font-size:0.92rem;color:var(--text-primary);">Có bao nhiêu ký tự trong chuỗi <code>"a\\nb\\x1f\\000d"</code>?</div>
          </div>

          <!-- Câu 7 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu hỏi 7:</div>
            <div style="font-size:0.92rem;color:var(--text-primary);">Hãy viết một biểu thức (<code>%</code>), một lời gọi phương thức (<code>.format</code>), và một <code>f-string</code> để định dạng <code>'Python'</code> và <code>3.12</code> ở đầu và cuối một chuỗi.</div>
          </div>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Đáp Án Gợi Ý & Phân Tích Chi Tiết Từ Tác Giả Mark Lutz',
      content: `
        <div style="display:flex;flex-direction:column;gap:18px;margin-top:16px;">
          <!-- Đáp án 1 -->
          <div style="padding:16px;background:var(--bg-surface);border-left:4px solid var(--danger);border-radius:6px;">
            <div style="font-weight:700;color:var(--danger);margin-bottom:6px;">Đáp án Câu 1: KHÔNG</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">
              <p><strong>Không</strong>, vì các phương thức luôn <em>mang tính đặc thù riêng cho từng kiểu dữ liệu</em> (tức là chúng chỉ hoạt động trên một kiểu đối tượng duy nhất). Danh sách không có phương thức <code>find</code> (nó có phương thức <code>index</code> tương tự, nhưng sẽ báo lỗi <code>ValueError</code> nếu không tìm thấy thay vì trả về -1).</p>
              <p>Tuy nhiên, các biểu thức như <code>X + Y</code> và các hàm dựng sẵn như <code>len(X)</code> mang tính tổng quát, và có thể hoạt động trên nhiều kiểu dữ liệu khác nhau. Trong trường hợp này chẳng hạn, <strong>biểu thức quan hệ thành viên <code>in</code></strong> có hiệu ứng tương tự như phương thức <code>find</code> của chuỗi, nhưng nó có thể được dùng để tìm kiếm trên cả chuỗi lẫn danh sách. Python có nỗ lực đặt tên các phương thức tương tự nhau một cách nhất quán (chẳng hạn nhiều đối tượng có phương thức <code>copy</code>, và các đối tượng khả biến chia sẻ tên <code>pop</code>), nhưng các phương thức nhìn chung vẫn mang tính đặc thù kiểu hơn so với các tập hợp thao tác khác.</p>
            </div>
          </div>

          <!-- Đáp án 2 -->
          <div style="padding:16px;background:var(--bg-surface);border-left:4px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">Đáp án Câu 2: CÓ</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">
              <p><strong>Có</strong>. Không giống như các phương thức, các biểu thức mang tính tổng quát và áp dụng được cho nhiều kiểu dữ liệu.</p>
              <p>Trong trường hợp này, biểu thức cắt lát (<code>slice</code>) thực chất là một <strong>thao tác trên dãy tuần tự (sequence operation)</strong>—nó hoạt động trên bất kỳ kiểu đối tượng dãy tuần tự nào trong Python, bao gồm chuỗi (<code>str</code>), danh sách (<code>list</code>), và <code>tuple</code>. Sự khác biệt duy nhất là tính đa hình: khi bạn thực hiện slice trên một danh sách, bạn sẽ nhận lại một danh sách mới.</p>
            </div>
          </div>

          <!-- Đáp án 3 -->
          <div style="padding:16px;background:var(--bg-surface);border-left:4px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Đáp án Câu 3: Hàm ord() và chr()</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">
              <p>Hàm dựng sẵn <strong><code>ord(S)</code></strong> chuyển đổi từ một chuỗi gồm một ký tự thành một mã ký tự số nguyên (ví dụ: <code>ord('a')</code> trả về 97); hàm <strong><code>chr(I)</code></strong> chuyển đổi từ mã số nguyên ngược lại thành một ký tự (ví dụ: <code>chr(97)</code> trả về <code>'a'</code>).</p>
              <p>Tuy nhiên hãy ghi nhớ rằng, các số nguyên này chỉ là mã ASCII đối với văn bản có các ký tự hoàn toàn thuộc bộ 128 ký tự ASCII 7-bit. Trong mô hình Unicode hiện đại của Python, các chuỗi văn bản thực chất là các dãy tuần tự chứa các số nguyên định danh <em>code point Unicode</em>, vốn có thể lên tới 0x10FFFF (hơn 1.1 triệu mã ký tự).</p>
            </div>
          </div>

          <!-- Đáp án 4 -->
          <div style="padding:16px;background:var(--bg-surface);border-left:4px solid var(--warning);border-radius:6px;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:6px;">Đáp án Câu 4: Chuỗi Không Thể Bị Thay Đổi Trực Tiếp (Bất Biến)</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">
              <p><strong>Chuỗi không thể bị thay đổi tại chỗ; chúng có tính bất biến (immutable).</strong></p>
              <p>Tuy nhiên, bạn có thể đạt được hiệu ứng tương tự bằng cách <strong>tạo ra một đối tượng chuỗi mới</strong>—bằng cách nối chuỗi (<code>+</code>), cắt lát (<code>slice</code>), dùng lời gọi phương thức như <code>replace()</code>, hoặc thực hiện các thao tác định dạng (<code>%</code>, <code>format</code>, <code>f-string</code>)—rồi sau đó <strong>gán kết quả ngược trở lại cho tên biến ban đầu</strong> (ví dụ: <code>S = S[:2] + 'X' + S[3:]</code>).</p>
            </div>
          </div>

          <!-- Đáp án 5 -->
          <div style="padding:16px;background:var(--bg-surface);border-left:4px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">Đáp án Câu 5: Hai Cách Trích Xuất 'od'</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">
              <p>Cho <code>S = 'c,od,e'</code>:</p>
              <ol>
                <li><strong>Cách 1 (Dùng biểu thức cắt lát slice):</strong> <code>S[2:4]</code> trích xuất từ offset 2 đến 3, cho kết quả <code>'od'</code>.</li>
                <li><strong>Cách 2 (Dùng phương thức tách chuỗi split):</strong> <code>S.split(',')[1]</code> tách chuỗi theo dấu phẩy thành <code>['c', 'od', 'e']</code>, sau đó đánh chỉ mục phần tử thứ 1 để lấy <code>'od'</code>.</li>
              </ol>
            </div>
          </div>

          <!-- Đáp án 6 -->
          <div style="padding:16px;background:var(--bg-surface);border-left:4px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Đáp án Câu 6: SÁU (6) Ký Tự</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">
              <p>Chuỗi <code>"a\\nb\\x1f\\000d"</code> chứa đúng <strong>6 ký tự</strong>:</p>
              <ul>
                <li>Ký tự 1: <code>'a'</code></li>
                <li>Ký tự 2: <code>'\\n'</code> (ký tự dòng mới newline, ord = 10)</li>
                <li>Ký tự 3: <code>'b'</code></li>
                <li>Ký tự 4: <code>'\\x1f'</code> (ký tự thoát hex đại diện cho code point 31, ký tự điều khiển Unit Separator không in được)</li>
                <li>Ký tự 5: <code>'\\000'</code> (ký tự thoát bát phân đại diện cho byte nhị phân 0 / ký tự rỗng NUL)</li>
                <li>Ký tự 6: <code>'d'</code></li>
              </ul>
              <p>Bạn có thể truyền chuỗi này vào hàm <code>len()</code> để xác minh: <code>len("a\\nb\\x1f\\000d") == 6</code>.</p>
            </div>
          </div>

          <!-- Đáp án 7 -->
          <div style="padding:16px;background:var(--bg-surface);border-left:4px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">Đáp án Câu 7: Ba Cách Định Dạng</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">
              <p>Không có đáp án cố định duy nhất cho phần nằm ở giữa chuỗi kết quả, nhưng để làm ví dụ chuẩn mực:</p>
              <ul>
                <li><strong>Biểu thức %:</strong> <code>'%s is %s' % ('Python', 3.12)</code></li>
                <li><strong>Phương thức .format():</strong> <code>'{} is {}'.format('Python', 3.12)</code></li>
                <li><strong>Hằng chuỗi f-string:</strong> Hầu như không có lý do gì để dùng một f-string nếu mọi thành phần đều đã biết trước dạng hằng số tĩnh (viết <code>f"{'Python'} is {3.12}"</code> có vẻ ngớ ngẩn), nhưng f-string sẽ hữu ích hơn nhiều nếu các giá trị trước hết được gán cho các biến: <code>x = 'Python'; y = 3.12; f'{x} is {y}'</code> sẽ nhận trọn vẹn điểm!</li>
              </ul>
            </div>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm trực tiếp kiểm chứng 7 câu hỏi ôn tập trên máy tính',
          code: `# Câu 1: in hoạt động trên cả list và str; find chỉ có ở str
print("Câu 1:", 'od' in 'c,od,e', 'od' in ['c', 'od', 'e'])

# Câu 2: Slice hoạt động trên cả list và str (đa hình)
print("Câu 2:", [1, 2, 3, 4][1:3])

# Câu 3: ord() và chr()
print("Câu 3:", ord('a'), chr(97))

# Câu 4: Gián tiếp thay đổi chuỗi qua tạo mới
s = 'spam'
s = s[:2] + 'X' + s[3:]
print("Câu 4:", s)

# Câu 5: Hai cách trích xuất 'od' từ 'c,od,e'
S = 'c,od,e'
print("Câu 5 - Slice:", S[2:4])
print("Câu 5 - Split:", S.split(',')[1])

# Câu 6: Đo độ dài chuỗi ký tự thoát
test_str = "a\\nb\\x1f\\000d"
print("Câu 6 - Độ dài:", len(test_str))
print("Câu 6 - Danh sách mã ord:", [ord(ch) for ch in test_str])

# Câu 7: Ba cách định dạng chuỗi
x, y = 'Python', 3.12
print("Câu 7 - Biểu thức %:", '%s is %s' % (x, y))
print("Câu 7 - Phương thức:", '{} is {}'.format(x, y))
print("Câu 7 - F-string:", f'{x} is {y}')`,
          output: `Câu 1: True True
Câu 2: [2, 3]
Câu 3: 97 a
Câu 4: spXm
Câu 5 - Slice: od
Câu 5 - Split: od
Câu 6 - Độ dài: 6
Câu 6 - Danh sách mã ord: [97, 10, 98, 31, 0, 100]
Câu 7 - Biểu thức %: Python is 3.12
Câu 7 - Phương thức: Python is 3.12
Câu 7 - F-string: Python is 3.12`,
          annotations: [
            { line: 2, text: 'Toán tử in có tính đa hình, áp dụng được cho mọi dãy tuần tự.' },
            { line: 17, text: 'len("a\\nb\\x1f\\000d") cho kết quả đúng 6 ký tự.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
      title: 'Tự Đo Lường Độ Sâu Sắc Kiến Thức',
      content: `Bộ 7 câu hỏi ôn tập của Mark Lutz là một công cụ chẩn đoán tuyệt vời. Nếu bạn có thể tự mình giải thích trôi chảy cả 7 câu hỏi này cho một người khác hiểu, bạn đã thực sự đạt trình độ lập trình viên Python vững vàng về chuỗi!`
      }
    ],
    pitfalls: [
      {
      title: 'Bẫy Đếm Ký Tự Thoát Khi Nhìn Bằng Mắt Thường',
      content: `Khi nhìn vào mã nguồn "a\\nb\\x1f\\000d", mắt người đếm được 13 ký tự gõ trên bàn phím. Nhưng trong bộ nhớ Python, mỗi ký tự thoát (dù gõ bằng 2, 4 hay 6 ký tự) chỉ chiếm đúng MỘT vị trí offset và một code point số nguyên duy nhất. Luôn tin tưởng hàm len() thay vì đếm bằng mắt!`
      }
    ]
  },

  exercises: [
    {
      id: 'ex-1',
      title: 'Thử thách lập trình tổng hợp Chương 7',
      question: 'Viết một hàm clean_and_format(raw_log) nhận vào một dòng log có dạng "USER:john_doe,ROLE:admin,IP:192.168.1.10\\n". Hãy: 1) Loại bỏ ký tự ngắt dòng ở cuối; 2) Tách chuỗi theo dấu phẩy và dấu hai chấm để lấy tên người dùng và vai trò; 3) Trả về chuỗi kết quả được định dạng bằng F-string: "Người dùng JOHN_DOE (ADMIN) đã đăng nhập".',
      starterCode: `raw_log = "USER:john_doe,ROLE:admin,IP:192.168.1.10\\n"

def clean_and_format(log_line):
    # Viết mã xử lý chuỗi ở đây:
    pass

print(clean_and_format(raw_log))
`,
      solution: `raw_log = "USER:john_doe,ROLE:admin,IP:192.168.1.10\\n"

def clean_and_format(log_line):
    clean_line = log_line.rstrip()
    parts = clean_line.split(',')
    username = parts[0].split(':')[1].upper()
    role = parts[1].split(':')[1].upper()
    return f"Người dùng {username} ({role}) đã đăng nhập"

print(clean_and_format(raw_log))`,
      hints: [
        'Dùng rstrip() để loại bỏ ký tự ngắt dòng \\n.',
        'Dùng split(\',\') để tách thành các cặp trường.',
        'Dùng split(\':\')[1] và .upper() để trích xuất và viết hoa giá trị.',
        'Dùng f-string để ráp nối chuỗi kết quả.'
      ]
    }
  ],

  quiz: [
    {
      question: 'Có bao nhiêu ký tự trong chuỗi Python sau: len("\\t\\x41\\000\\n")?',
      options: [
        '10 ký tự',
        '8 ký tự',
        '4 ký tự',
        '12 ký tự'
      ],
      answer: 2,
      explanation: 'Chuỗi "\\t\\x41\\000\\n" chứa đúng 4 ký tự: \\t (tab, ord 9), \\x41 (chữ \'A\', ord 65), \\000 (byte 0 NUL, ord 0), và \\n (newline, ord 10).'
    },
    {
      question: 'Tại sao slice chuỗi hoạt động được trên list nhưng phương thức find() của chuỗi lại không hoạt động trên list?',
      options: [
        'Vì slice là biểu thức thao tác trên dãy tuần tự (sequence operation) mang tính đa hình chung, còn find() là phương thức gắn liền đặc thù riêng với kiểu đối tượng str.',
        'Vì list không có bộ nhớ để lưu trữ vị trí tìm kiếm.',
        'Vì Python cấm dùng phương thức trên các đối tượng có nhiều hơn 1 phần tử.',
        'Vì slice chạy trên CPU còn phương thức chạy trên RAM.'
      ],
      answer: 0,
      explanation: 'Biểu thức slice là thao tác tổng quát áp dụng cho mọi dãy tuần tự (str, list, tuple). Ngược lại, phương thức chuỗi như find() được định nghĩa riêng trong lớp str và chỉ hoạt động trên chuỗi.'
    }
  ],

  summary: {
    takeaways: [
      'Chương 7 đã trang bị toàn bộ nền tảng về chuỗi: hằng chuỗi, ký tự thoát, thao tác dãy tuần tự, phương thức chuyên dụng, và 3 công cụ định dạng.',
      'Bộ 7 câu hỏi ôn tập của Mark Lutz củng cố sự hiểu biết cốt lõi về tính đa hình của dãy tuần tự, tính đặc thù kiểu của phương thức, và bản chất bất biến của chuỗi.',
      'Ký tự thoát trong bộ nhớ Python chỉ chiếm đúng một đơn vị ký tự (len = 1) bất kể được viết bằng bao nhiêu ký tự trên mã nguồn.',
      'Toàn bộ kiến thức về dãy tuần tự trong chương này là bàn đạp trực tiếp để bước sang Chương 8: Danh sách (list) và Từ điển (dict).'
    ],
    nextSteps: 'Chúc mừng bạn đã hoàn thành trọn vẹn Chương 7! Hãy sẵn sàng bước sang Chương 8 để khám phá hai kiểu tập hợp đối tượng đa năng và linh hoạt nhất trong Python: Danh sách (List) và Từ điển (Dictionary).'
  }
};
