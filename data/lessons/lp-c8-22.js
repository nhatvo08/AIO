export default {
  id: 'lp-c8-22',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.22',
  title: 'Khung chuyên đề: List vs Dict vs Set, Tóm tắt Chương 8 & Bộ 5 Câu hỏi Ôn tập kèm Lời giải Chi tiết',
  subtitle: 'Khung phân tích kiến trúc chọn kiểu dữ liệu (List vs Dict vs Set), tổng kết toàn diện Chương 8 và bộ 5 câu hỏi ôn tập kinh điển của Mark Lutz',
  level: 'Trung bình',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thấu suốt khung phân tích kiến trúc: khi nào nên lựa chọn List, Dictionary hoặc Set để biểu diễn dữ liệu và bản ghi cấu trúc.',
    'So sánh trực quan giữa bản ghi dựa trên List (đánh chỉ mục theo vị trí) và bản ghi dựa trên Dictionary (đánh chỉ mục theo nhãn trường).',
    'Hiểu rõ mối liên hệ giữa Dictionary và Set trong bài toán tra cứu sự tồn tại với độ phức tạp thời gian O(1).',
    'Tổng hợp toàn bộ kiến thức cốt lõi của Chương 8: dãy tuần tự khả biến (List) và ánh xạ khả biến (Dictionary), bảng băm và các thao tác thay đổi tại chỗ.',
    'Tự kiểm tra và củng cố hiểu biết với bộ 5 câu hỏi ôn tập nguyên bản từ sách giáo trình của Mark Lutz kèm lời giải chi tiết và phân tích sâu sắc.'
  ],

  intuition: {
    title: 'Ngã ba đường kiến trúc dữ liệu và trạm kiểm định đỉnh đèo',
    metaphor: 'Sau hành trình khám phá tường tận hai cấu trúc dữ liệu khả biến quyền lực nhất của Python — List (mảng con trỏ tuần tự theo vị trí) và Dictionary (bảng băm tra cứu theo khóa O(1)) — bạn đứng trước ngã ba đường kiến trúc: Khi nào dùng List? Khi nào dùng Dictionary? Và khi nào nên gọi tên Set? Bài học cuối cùng này cung cấp la bàn kiến trúc giúp bạn ra quyết định chuẩn xác, đồng thời đúc kết toàn bộ Chương 8 và thử thách bản lĩnh bằng bộ 5 câu hỏi ôn tập kinh điển của Mark Lutz.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MA TRẬN LỰA CHỌN KIỂU DỮ LIỆU: LIST vs DICTIONARY vs SET</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">1. LIST (Dãy Tuần Tự)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Thứ tự theo vị trí (0, 1, 2...)<br>• Dữ liệu đồng nhất, danh sách tuần tự<br>• Hỗ trợ slice, ghép nối +, sắp xếp<br>• Bản ghi vô danh hoặc ma trận đa chiều</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--warning);border-radius:6px;">
            <div style="font-weight:700;color:var(--warning);">2. DICTIONARY (Ánh Xạ)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Tra cứu theo nhãn khóa O(1)<br>• Bản ghi thực thể có tên trường gợi tả<br>• Cấu trúc dữ liệu thưa thớt (sparse)<br>• Đếm tần suất, bảng định tuyến</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);">3. SET (Tập Hợp)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Bảng băm chỉ chứa khóa (không value)<br>• Kiểm tra thành viên siêu tốc O(1)<br>• Khử trùng lặp phần tử tự động<br>• Phép toán tập hợp: giao &, hợp |, hiệu -</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khung Chuyên Đề: Lý Do Bạn Cần Quan Tâm — List so với Dictionary so với Set',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 8: List và Dictionary • Khung chuyên đề bên lề: <em>"Lý do bạn cần quan tâm: List so với Dictionary so với Set"</em> • <strong>PDF Trang 40 / 42 – Trang 42 / 42</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học thuật: Đây là phần phân tích kiến trúc thực tế được Mark Lutz nhấn mạnh đặc biệt nhằm giúp kỹ sư phần mềm định hình tư duy mô hình hóa dữ liệu đúng đắn trước khi bước sang các kiểu dữ liệu nâng cao hơn.</em></p>
          </div>
        </div>

        <p>Trong quá trình thiết kế ứng dụng, câu hỏi thường trực nhất là: <em>"Tôi nên lưu trữ tập hợp dữ liệu này bằng List, Dictionary hay Set?"</em> Cả ba đều là các tập hợp đối tượng khả biến, linh hoạt và có thể co giãn kích thước tùy ý. Tuy nhiên, kiến trúc bên trong và mục đích sử dụng của chúng phân hóa rất rõ ràng:</p>

        <h3>1.1. Bản ghi dựa trên List so với Bản ghi dựa trên Dictionary</h3>
        <p>Hãy xem xét một bản ghi mô tả thông tin nhân viên gồm tên, tuổi và danh sách chức vụ:</p>
        <ul>
          <li><strong>Mô hình hóa bằng List:</strong>
            <pre><code>L = ['Pat', 40.5, ['dev', 'mgr']]
print(L[0], L[1])  # 'Pat' 40.5</code></pre>
            <p>Trong mô hình này, chúng ta phải <em>ghi nhớ bằng trí óc</em> rằng vị trí 0 là tên, vị trí 1 là tuổi, và vị trí 2 là danh sách công việc. Nếu một lập trình viên khác chèn thêm trường giới tính vào trước tuổi, mã truy cập <code>L[1]</code> của toàn bộ chương trình sẽ bị gãy vỡ âm thầm!</p>
          </li>
          <li><strong>Mô hình hóa bằng Dictionary:</strong>
            <pre><code>D = {'name': 'Pat', 'age': 40.5, 'jobs': ['dev', 'mgr']}
# hoặc tạo bằng: D = dict(name='Pat', age=40.5, jobs=['dev', 'mgr'])
print(D['name'], D['age'])  # 'Pat' 40.5
D['jobs'].remove('mgr')     # sửa đổi list lồng nhau bên trong dict</code></pre>
            <p>Ở đây, mỗi trường dữ liệu gắn liền với một <strong>nhãn ngữ nghĩa (meaningful semantic label)</strong>. Thứ tự các trường không còn là điều kiện tiên quyết. Mã nguồn tự dẫn giải và bền bỉ tuyệt đối trước việc bổ sung hoặc tái cấu trúc các trường thông tin.</p>
          </li>
        </ul>

        <h3>1.2. Khi nào nên dùng List? Khi nào nên dùng Dictionary?</h3>
        <ul>
          <li><strong>Chọn List khi:</strong>
            <ul>
              <li>Dữ liệu mang tính tuần tự tự nhiên (ví dụ: các dòng trong một file văn bản, danh sách công việc cần làm xếp theo hàng đợi FIFO, điểm số kiểm tra theo thời gian).</li>
              <li>Bạn cần các thao tác dựa trên vị trí: cắt lát (slicing), đảo ngược danh sách, ghép nối (concatenation <code>+</code>).</li>
              <li>Cấu trúc mảng nhiều chiều toán học (như ma trận <code>[[1, 2], [3, 4]]</code>).</li>
              <li>Dữ liệu là tập hợp các đối tượng độc lập không có khóa định danh riêng biệt.</li>
            </ul>
          </li>
          <li><strong>Chọn Dictionary khi:</strong>
            <ul>
              <li>Bạn cần tra cứu dữ liệu siêu tốc bằng định danh (ID, mã số sinh viên, tên biến, địa chỉ email). Phép tra cứu <code>D[k]</code> hoặc <code>k in D</code> mất thời gian <strong>O(1)</strong> không phụ thuộc vào kích thước bảng, trong khi tìm trên List mất thời gian <strong>O(N)</strong>.</li>
              <li>Biểu diễn các bản ghi thực thể (Record, JSON-like struct) với các trường có tên rõ ràng.</li>
              <li>Biểu diễn các cấu trúc thưa thớt (sparse structures), chẳng hạn ma trận thưa với khóa tuple <code>(row, col)</code> chỉ lưu các ô khác không.</li>
              <li>Đếm tần suất xuất hiện (histogram) hoặc tạo bảng định tuyến ánh xạ (routing dispatch table).</li>
            </ul>
          </li>
        </ul>

        <h3>1.3. Liên hệ với Set (Tập hợp)</h3>
        <p>Trong các phiên bản Python ban đầu trước khi có kiểu <code>set</code> chính thức, các lập trình viên thường dùng dictionary để mô phỏng tập hợp: gán khóa là phần tử cần lưu, còn giá trị gán tạm là <code>True</code> hoặc <code>None</code>:</p>
        <pre><code># Cách cũ mô phỏng tập hợp bằng dict:
visited = {}
visited['state1'] = True
if 'state1' in visited:
    print('Đã ghé thăm!')

# Cách hiện đại chuẩn mực dùng Set (Chương 5 & Chương 9):
visited = set()
visited.add('state1')
if 'state1' in visited:
    print('Đã ghé thăm!')</code></pre>
        <p>Về bản chất cơ chế bộ nhớ, <strong>Set chính là một Dictionary không có giá trị (values)</strong> — nó chỉ bao gồm bảng băm của các khóa bất biến. Vì vậy, Set cũng sở hữu tốc độ kiểm tra thành viên <code>in</code> thần tốc O(1) như Dictionary, đồng thời hỗ trợ các phép toán đại số tập hợp mạnh mẽ (hợp <code>|</code>, giao <code>&amp;</code>, hiệu <code>-</code>, hiệu đối xứng <code>^</code>).</p>

        <h3>1.4. Nhìn xa hơn: Bản ghi nâng cao ở các chương sau</h3>
        <p>Mark Lutz lưu ý rằng ngoài List và Dictionary, Python còn cung cấp nhiều công cụ biểu diễn bản ghi chuyên dụng khác:</p>
        <ul>
          <li><strong>Tuple và namedtuple (Chương 9):</strong> Bản ghi bất biến, nhẹ bộ nhớ, cho phép truy cập theo tên trường như thuộc tính <code>rec.name</code>.</li>
          <li><strong>Class (Chương 27):</strong> Đỉnh cao của hướng đối tượng trong Python, cho phép kết hợp cả trạng thái dữ liệu (thuộc tính) và hành vi (phương thức) với cơ chế kế thừa mạnh mẽ.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'So sánh thao tác trên Bản ghi List vs Bản ghi Dict vs Set',
          code: `# 1. Bản ghi dạng List: Truy cập theo offset số nguyên
rec_list = ['Pat', 40.5, ['dev', 'mgr']]
print("List record:", rec_list[0], rec_list[1])
# Nếu muốn sửa chức vụ:
rec_list[2].remove('mgr')
print("Sau khi xóa 'mgr':", rec_list)

# 2. Bản ghi dạng Dict: Truy cập theo nhãn khóa ngữ nghĩa
rec_dict = {'name': 'Pat', 'age': 40.5, 'jobs': ['dev', 'mgr']}
print("Dict record:", rec_dict['name'], rec_dict['age'])
rec_dict['jobs'].remove('mgr')
print("Sau khi xóa 'mgr' trong dict:", rec_dict['jobs'])

# 3. Dùng Set để theo dõi trạng thái độc nhất
visited = set()
visited.add('node_A')
visited.add('node_B')
visited.add('node_A')  # trùng lặp bị khử tự động
print("Visited set:", visited)
print("'node_A' in visited:", 'node_A' in visited)`,
          output: `List record: Pat 40.5
Sau khi xóa 'mgr': ['Pat', 40.5, ['dev']]
Dict record: Pat 40.5
Sau khi xóa 'mgr' trong dict: ['dev']
Visited set: {'node_A', 'node_B'}
'node_A' in visited: True`,
          annotations: [
            { line: 3, text: 'List bắt buộc người lập trình nhớ thứ tự vị trí các trường.' },
            { line: 9, text: 'Dict tự ghi chú ý nghĩa trường, không phụ thuộc thứ tự chèn.' },
            { line: 18, text: 'Set khử trùng lặp và kiểm tra in với tốc độ băm O(1).' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Tóm Tắt Toàn Diện Kiến Thức Cốt Lõi Chương 8',
      content: `
        <p>Trong Chương 8, chúng ta đã tiến hành khảo sát chuyên sâu hai kiểu tập hợp đối tượng linh hoạt và được sử dụng rộng rãi nhất trong ngôn ngữ Python:</p>

        <ol>
          <li><strong>Danh sách (List) — Dãy tuần tự khả biến:</strong>
            <ul>
              <li><strong>Cấu trúc bộ nhớ:</strong> Là mảng các con trỏ đối tượng kiểu C (<code>PyListObject</code>) có thể thay đổi kích thước linh hoạt, hỗ trợ lưu trữ kiểu hỗn hợp và lồng nhau vô hạn.</li>
              <li><strong>Thao tác dãy tuần tự:</strong> Chia sẻ mọi tính đa hình của dãy tuần tự giống chuỗi: nối <code>+</code>, lặp <code>*</code>, đánh chỉ mục <code>L[i]</code>, cắt lát <code>L[i:j]</code>, cắt lát mở rộng <code>L[i:j:k]</code> và lặp <code>for</code>.</li>
              <li><strong>Thay đổi tại chỗ (In-place Mutation):</strong> Gán chỉ mục <code>L[i] = val</code>, cơ chế gán lát cắt mạnh mẽ <em>xóa + chèn</em> <code>L[i:j] = [...]</code> thay đổi độ dài danh sách.</li>
              <li><strong>Các phương thức đặc thù (Bảng 8-1):</strong> <code>append()</code>, <code>extend()</code>, <code>insert()</code>, <code>pop()</code>, <code>remove()</code>, <code>sort()</code>, <code>reverse()</code>. Luôn ghi nhớ nguyên tắc: các phương thức thay đổi tại chỗ trả về <code>None</code>!</li>
              <li><strong>List Comprehension:</strong> Cú pháp biểu thức tạo danh sách tốc độ cao ở tầng C: <code>[expr for x in iterable if cond]</code>.</li>
            </ul>
          </li>
          <li><strong>Từ điển (Dictionary) — Ánh xạ khả biến:</strong>
            <ul>
              <li><strong>Cơ chế bảng băm (Hash Table):</strong> Lưu trữ các cặp khóa-giá trị <code>key: value</code>. Khóa phải là đối tượng bất biến (chuỗi, số, tuple bất biến). Phép tra cứu khóa có độ phức tạp thời gian <strong>O(1)</strong>.</li>
              <li><strong>Thứ tự chèn:</strong> Từ Python 3.7+ (và chính thức theo đặc tả ngôn ngữ), dictionary bảo toàn thứ tự chèn khóa ban đầu.</li>
              <li><strong>Tự động mở rộng khi gán:</strong> Gán khóa mới <code>D['new_key'] = val</code> tự động mở rộng từ điển, hoàn toàn trái ngược với lỗi <code>IndexError</code> khi gán ngoài biên ở List!</li>
              <li><strong>Các phương thức đặc thù (Bảng 8-2):</strong> <code>keys()</code>, <code>values()</code>, <code>items()</code> (trả về các đối tượng view động có tính chất set-like), <code>get()</code> (tra cứu an toàn tránh KeyError), <code>update()</code> (hợp nhất tại chỗ), <code>pop()</code>, <code>popitem()</code> (loại bỏ theo thứ tự LIFO).</li>
              <li><strong>Các biến thể cú pháp tạo Dict:</strong> Hằng ngoặc nhọn <code>{}</code>, hàm dựng <code>dict(k=v)</code>, hàm nén <code>dict(zip(keys, vals))</code>, <code>dict.fromkeys()</code>, Dictionary Comprehension và toán tử gộp từ điển <code>|</code> và <code>|=</code> (Python 3.9+).</li>
            </ul>
          </li>
        </ol>

        <p>Trong chương tiếp theo (<strong>Chương 9: Tuple, Tập tin và Các đối tượng khác</strong>), chúng ta sẽ hoàn tất bức tranh toàn cảnh về hệ thống kiểu cốt lõi của Python với việc nghiên cứu <code>tuple</code> (phiên bản bất biến của list) và đối tượng <code>file</code> (xử lý dữ liệu tệp tin trên ổ cứng). Còn bây giờ, hãy đối mặt với bộ 5 câu hỏi ôn tập kinh điển dưới đây!</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Bộ 5 Câu Hỏi Ôn Tập Kiểm Tra Kiến Thức Kinh Điển Của Mark Lutz',
      content: `
        <p>Hãy tự phân tích, suy nghĩ và viết nháp câu trả lời cho 5 câu hỏi cốt lõi dưới đây trước khi đối chiếu với lời giải chi tiết của Mark Lutz:</p>

        <div style="display:flex;flex-direction:column;gap:16px;margin-top:16px;">
          <!-- Câu 1 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu hỏi 1:</div>
            <div style="font-size:0.92rem;color:var(--text-primary);">Nêu hai cách khác nhau để xây dựng một danh sách (list) chứa năm số nguyên 0.</div>
          </div>

          <!-- Câu 2 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu hỏi 2:</div>
            <div style="font-size:0.92rem;color:var(--text-primary);">Nêu hai cách khác nhau để xây dựng một từ điển (dictionary) có hai khóa, <code>'a'</code> và <code>'b'</code>, mỗi khóa có giá trị liên kết là <code>0</code>.</div>
          </div>

          <!-- Câu 3 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu hỏi 3:</div>
            <div style="font-size:0.92rem;color:var(--text-primary);">Nêu bốn thao tác khác nhau làm thay đổi một đối tượng danh sách (list) tại chỗ (in-place).</div>
          </div>

          <!-- Câu 4 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu hỏi 4:</div>
            <div style="font-size:0.92rem;color:var(--text-primary);">Nêu bốn thao tác khác nhau làm thay đổi một đối tượng từ điển (dictionary) tại chỗ (in-place).</div>
          </div>

          <!-- Câu 5 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu hỏi 5:</div>
            <div style="font-size:0.92rem;color:var(--text-primary);">Tại sao bạn lại có thể lựa chọn sử dụng một từ điển (dictionary) thay vì một danh sách (list)?</div>
          </div>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-4',
      title: '4. Lời Giải Chi Tiết & Phân Tích Sâu Sắc Từ Tác Giả Mark Lutz',
      content: `
        <div style="display:flex;flex-direction:column;gap:18px;margin-top:16px;">
          <!-- Đáp án 1 -->
          <div style="padding:16px;background:var(--bg-surface);border-left:4px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Đáp án Câu 1: Xây dựng List chứa năm số 0</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">
              <p>Bạn có thể xây dựng một danh sách chứa năm số 0 bằng một <strong>hằng danh sách (literal)</strong> trực tiếp:</p>
              <pre><code>L = [0, 0, 0, 0, 0]</code></pre>
              <p>Hoặc bằng <strong>biểu thức lặp lại dãy tuần tự (repetition expression)</strong>:</p>
              <pre><code>L = [0] * 5</code></pre>
              <p><em>(Các giải pháp hợp lệ khác của Python nâng cao bao gồm: List comprehension <code>[0 for _ in range(5)]</code>, hàm tạo <code>list([0] * 5)</code>, hoặc tạo một list rỗng rồi dùng vòng lặp <code>for</code> gọi <code>L.append(0)</code> năm lần).</em></p>
            </div>
          </div>

          <!-- Đáp án 2 -->
          <div style="padding:16px;background:var(--bg-surface);border-left:4px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">Đáp án Câu 2: Xây dựng Dictionary có hai khóa 'a' và 'b' với giá trị 0</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">
              <p>Bạn có thể xây dựng từ điển này bằng một <strong>hằng từ điển (literal)</strong>:</p>
              <pre><code>D = {'a': 0, 'b': 0}</code></pre>
              <p>Hoặc bằng cách <strong>gán từng khóa riêng lẻ</strong> vào một từ điển rỗng ban đầu:</p>
              <pre><code>D = {}
D['a'] = 0
D['b'] = 0</code></pre>
              <p>Hoặc truyền <strong>đối số từ khóa (keyword arguments)</strong> vào hàm dựng <code>dict()</code>:</p>
              <pre><code>D = dict(a=0, b=0)</code></pre>
              <p>Hoặc nén danh sách khóa và danh sách giá trị bằng <strong><code>dict(zip())</code></strong>:</p>
              <pre><code>D = dict(zip(['a', 'b'], [0, 0]))</code></pre>
              <p>Hoặc dùng phương thức chuyên dụng <strong><code>dict.fromkeys()</code></strong>:</p>
              <pre><code>D = dict.fromkeys(['a', 'b'], 0)</code></pre>
              <p>Hoặc dùng <strong>Dictionary Comprehension</strong>:</p>
              <pre><code>D = {k: 0 for k in ['a', 'b']}</code></pre>
            </div>
          </div>

          <!-- Đáp án 3 -->
          <div style="padding:16px;background:var(--bg-surface);border-left:4px solid var(--warning);border-radius:6px;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:6px;">Đáp án Câu 3: Bốn thao tác làm thay đổi List tại chỗ (In-place)</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">
              <p>Các thao tác làm thay đổi một danh sách tại chỗ bao gồm rất nhiều lựa chọn:</p>
              <ol>
                <li><strong>Gán chỉ mục (Index assignment):</strong> <code>L[i] = val</code></li>
                <li><strong>Gán lát cắt (Slice assignment):</strong> <code>L[i:j] = [val1, val2]</code></li>
                <li><strong>Các lời gọi phương thức tại chỗ:</strong> <code>L.append(val)</code>, <code>L.extend(seq)</code>, <code>L.insert(i, val)</code>, <code>L.remove(val)</code>, <code>L.pop()</code>, <code>L.sort()</code>, <code>L.reverse()</code>, <code>L.clear()</code>.</li>
                <li><strong>Câu lệnh xóa:</strong> <code>del L[i]</code> hoặc <code>del L[i:j]</code>.</li>
                <li><strong>Toán tử gán tăng cường tại chỗ:</strong> <code>L += [val]</code> (tương đương <code>L.extend([val])</code>).</li>
              </ol>
            </div>
          </div>

          <!-- Đáp án 4 -->
          <div style="padding:16px;background:var(--bg-surface);border-left:4px solid var(--danger);border-radius:6px;">
            <div style="font-weight:700;color:var(--danger);margin-bottom:6px;">Đáp án Câu 4: Bốn thao tác làm thay đổi Dictionary tại chỗ (In-place)</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">
              <p>Các thao tác làm thay đổi một từ điển tại chỗ bao gồm:</p>
              <ol>
                <li><strong>Gán khóa (Key assignment):</strong> <code>D[key] = value</code> (thêm mới hoặc ghi đè giá trị liên kết của khóa).</li>
                <li><strong>Lời gọi phương thức hợp nhất:</strong> <code>D.update(D2)</code>.</li>
                <li><strong>Các phương thức loại bỏ phần tử:</strong> <code>D.pop(key)</code>, <code>D.popitem()</code>, <code>D.clear()</code>.</li>
                <li><strong>Câu lệnh xóa khóa:</strong> <code>del D[key]</code>.</li>
                <li><strong>Toán tử hợp nhất tại chỗ (Python 3.9+):</strong> <code>D |= D2</code>.</li>
              </ol>
            </div>
          </div>

          <!-- Đáp án 5 -->
          <div style="padding:16px;background:var(--bg-surface);border-left:4px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Đáp án Câu 5: Tại sao chọn Dictionary thay vì List?</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">
              <p>Bạn nên sử dụng một dictionary thay vì một list bất cứ khi nào tập hợp dữ liệu được cấu trúc dưới dạng <strong>các cặp khóa-giá trị (key-value pairs)</strong>, chẳng hạn như một bản ghi nhân viên với các trường có tên ngữ nghĩa (<code>'name'</code>, <code>'age'</code>, <code>'job'</code>).</p>
              <p>Dictionary mang lại hai ưu thế tuyệt đối:</p>
              <ul>
                <li><strong>Tính rõ ràng và dễ bảo trì:</strong> Các phần tử được tra cứu trực tiếp theo <em>tên trường mang ý nghĩa gợi tả</em> (mnemonic field names) thay vì các vị trí chỉ số số nguyên tương đối trừu tượng (vốn đòi hỏi lập trình viên phải nhớ offset nào ứng với dữ liệu nào).</li>
                <li><strong>Hiệu năng tra cứu siêu tốc O(1):</strong> Bảng băm cho phép tìm kiếm trực tiếp theo khóa chỉ trong một bước tính toán, không cần duyệt quét qua toàn bộ tập dữ liệu như khi tìm kiếm trên danh sách O(N).</li>
                <li><strong>Biểu diễn cấu trúc thưa (Sparse collections):</strong> Dictionary chỉ lưu các ô có giá trị thực sự (ví dụ ma trận thưa với khóa tọa độ), giúp tiết kiệm bộ nhớ vượt trội so với việc phải cấp phát một ma trận list đầy đủ chứa hàng nghìn phần tử 0 lãng phí.</li>
              </ul>
            </div>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm trực tiếp kiểm chứng 5 câu hỏi ôn tập trên máy tính',
          code: `# Câu 1: Hai cách tạo list năm số 0
L1 = [0, 0, 0, 0, 0]
L2 = [0] * 5
print("Câu 1:", L1 == L2, L1)

# Câu 2: Các cách tạo dict {'a': 0, 'b': 0}
D1 = {'a': 0, 'b': 0}
D2 = dict(a=0, b=0)
D3 = dict.fromkeys(['a', 'b'], 0)
print("Câu 2:", D1 == D2 == D3, D1)

# Câu 3: Bốn thao tác sửa list tại chỗ
L = [1, 2, 3]
L[0] = 99        # 1. Gán chỉ mục
L.append(4)      # 2. Phương thức append
L.extend([5, 6]) # 3. Phương thức extend
del L[1]         # 4. del
print("Câu 3:", L)

# Câu 4: Bốn thao tác sửa dict tại chỗ
D = {'x': 10}
D['y'] = 20      # 1. Gán khóa
D.update({'z': 30}) # 2. update()
val = D.pop('x') # 3. pop()
del D['y']       # 4. del
print("Câu 4:", D, "Giá trị pop:", val)

# Câu 5: Minh họa tra cứu theo nhãn vs tra cứu theo offset
person_list = ['Alice', 25, 'Engineer']
person_dict = {'name': 'Alice', 'age': 25, 'role': 'Engineer'}
print("Câu 5 - Dict label:", person_dict['role'])
print("Câu 5 - List index:", person_list[2])`,
          output: `Câu 1: True [0, 0, 0, 0, 0]
Câu 2: True {'a': 0, 'b': 0}
Câu 3: [99, 3, 4, 5, 6]
Câu 4: {'z': 30} Giá trị pop: 10
Câu 5 - Dict label: Engineer
Câu 5 - List index: Engineer`,
          annotations: [
            { line: 3, text: '[0] * 5 nhân bản tham chiếu của số nguyên 0 bất biến.' },
            { line: 9, text: 'dict.fromkeys tạo dict cực nhanh từ danh sách khóa cho trước.' },
            { line: 20, text: 'Các thao tác sửa dict tại chỗ không tạo dict mới trong bộ nhớ.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Mẹo Thiết Kế Cấu Trúc Dữ Liệu Trong Thực Tế',
        content: `Khi thiết kế một phần mềm thực tế, hãy bắt đầu bằng Dictionary nếu dữ liệu của bạn có các thuộc tính mang tên rõ ràng (user profile, config setting, HTTP headers). Dùng List khi bạn có một hàng đợi các phần tử cần xử lý theo thứ tự hoặc một chuỗi các bước thao tác. Sự kết hợp phổ biến và mạnh mẽ nhất chính là: một List chứa các Dictionary (danh sách bản ghi)!`
      }
    ],
    pitfalls: [
      {
        title: 'Bẫy Nhân Bản Đối Tượng Khả Biến [[]] * N',
        content: `Khi áp dụng phép lặp lại [0] * 5 để tạo list năm số 0, thao tác này hoàn toàn an toàn vì số 0 là đối tượng bất biến. Nhưng TUYỆT ĐỐI KHÔNG dùng [[0]] * 5 để tạo ma trận đa chiều, vì cả 5 hàng sẽ cùng trỏ vào MỘT đối tượng list duy nhất trong bộ nhớ! Trong trường hợp đó, hãy luôn dùng list comprehension: [[0] for _ in range(5)].`
      }
    ]
  },

  exercises: [
    {
      id: 'ex-1',
      title: 'Thử thách lập trình tổng hợp Chương 8: Hệ thống quản lý kho hàng',
      question: 'Cho cấu trúc dữ liệu mô phỏng kho hàng dạng danh sách các từ điển:\\n\\ninventory = [\\n    {"id": 101, "name": "Laptop", "price": 1200, "tags": ["tech", "work"]},\\n    {"id": 102, "name": "Desk Lamp", "price": 45, "tags": ["office", "light"]},\\n    {"id": 103, "name": "Monitor", "price": 300, "tags": ["tech", "display"]}\\n]\\n\\nHãy viết một hàm process_inventory(inventory, min_price) thực hiện:\\n1) Dùng list comprehension để lọc ra tên (viết hoa in hoa) của các sản phẩm có giá >= min_price;\\n2) Tạo một dictionary mới ánh xạ id -> name cho tất cả các sản phẩm bằng dict comprehension;\\n3) Trả về một tuple (filtered_names, id_to_name_dict).',
      starterCode: `inventory = [
    {"id": 101, "name": "Laptop", "price": 1200, "tags": ["tech", "work"]},
    {"id": 102, "name": "Desk Lamp", "price": 45, "tags": ["office", "light"]},
    {"id": 103, "name": "Monitor", "price": 300, "tags": ["tech", "display"]}
]

def process_inventory(items, min_price):
    # 1. Lọc tên viết hoa của sản phẩm có price >= min_price:
    filtered_names = []
    # 2. Tạo dict id -> name:
    id_to_name = {}
    return filtered_names, id_to_name

print(process_inventory(inventory, 200))
`,
      solution: `inventory = [
    {"id": 101, "name": "Laptop", "price": 1200, "tags": ["tech", "work"]},
    {"id": 102, "name": "Desk Lamp", "price": 45, "tags": ["office", "light"]},
    {"id": 103, "name": "Monitor", "price": 300, "tags": ["tech", "display"]}
]

def process_inventory(items, min_price):
    filtered_names = [item["name"].upper() for item in items if item["price"] >= min_price]
    id_to_name = {item["id"]: item["name"] for item in items}
    return filtered_names, id_to_name

print(process_inventory(inventory, 200))`,
      hints: [
        'Dùng list comprehension kết hợp điều kiện if: [item["name"].upper() for item in items if item["price"] >= min_price].',
        'Dùng dict comprehension: {item["id"]: item["name"] for item in items}.',
        'Trả về cả hai cấu trúc dưới dạng tuple: return filtered_names, id_to_name.'
      ]
    }
  ],

  quiz: [
    {
      question: 'Phép lặp nào dưới đây an toàn để tạo một danh sách gồm 3 danh sách con độc lập?',
      options: [
        'L = [[]] * 3',
        'L = [[] for _ in range(3)]',
        'L = list([] * 3)',
        'L = [[] + [] + []]'
      ],
      correctIndex: 1,
      explanation: 'List comprehension [[] for _ in range(3)] tạo ra 3 đối tượng list con rỗng hoàn toàn độc lập ở 3 ô nhớ khác nhau. Phép nhân [[]] * 3 sẽ tạo ra 3 tham chiếu trỏ cùng vào một list duy nhất.'
    },
    {
      question: 'Vì sao phép kiểm tra thành viên "key in D" trên Dictionary lại có hiệu năng vượt trội hơn "item in L" trên List lớn?',
      options: [
        'Vì Dictionary sử dụng thuật toán tìm kiếm nhị phân trên các phần tử đã sắp xếp.',
        'Vì Dictionary sử dụng bảng băm (hash table) tính toán địa chỉ ô nhớ trực tiếp trong thời gian hằng số O(1), trong khi List phải duyệt tuần tự từ đầu đến cuối O(N).',
        'Vì List được lưu trên ổ đĩa còn Dictionary được lưu trong bộ nhớ đệm CPU.',
        'Vì Python biên dịch trước mọi Dictionary thành mã máy nhị phân C.'
      ],
      correctIndex: 1,
      explanation: 'Bảng băm cho phép tính toán hash code của khóa rồi định vị tức thì ô nhớ tương ứng với độ phức tạp thời gian trung bình O(1), không phụ thuộc vào kích thước hàng triệu phần tử của từ điển.'
    }
  ],

  summary: {
    takeaways: [
      'Chương 8 đã trang bị toàn bộ nền tảng về hai kiểu tập hợp đối tượng linh hoạt nhất của Python: List (dãy tuần tự khả biến) và Dictionary (ánh xạ khả biến).',
      'List tổ chức các đối tượng theo vị trí thứ tự, phù hợp cho dữ liệu tuần tự và các thao tác cắt lát; Dictionary tổ chức theo bảng băm khóa-giá trị, mang lại hiệu năng tra cứu O(1) và tính gợi tả ngữ nghĩa cho bản ghi.',
      'Set là dạng bảng băm chỉ có khóa, là công cụ tối ưu cho bài toán kiểm tra sự tồn tại O(1) và khử trùng lặp.',
      'Bộ 5 câu hỏi ôn tập của Mark Lutz củng cố sâu sắc các kỹ thuật khởi tạo đa dạng và danh mục đầy đủ các thao tác thay đổi đối tượng tại chỗ.',
      'Toàn bộ kiến thức về cấu trúc khả biến trong chương này là nền móng cốt lõi để bước sang Chương 9: Tuple, Tập tin và Các đối tượng khác.'
    ],
    nextSteps: 'Chúc mừng bạn đã hoàn thành trọn vẹn toàn bộ 23 bài học của Chương 8! Hãy sẵn sàng bước sang Chương 9 để khám phá Tuple (dãy tuần tự bất biến) và File (tương tác đọc ghi tệp tin với hệ điều hành).'
  }
};
