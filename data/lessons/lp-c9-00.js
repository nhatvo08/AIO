export default {
  id: 'lp-c9-00',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.0',
  title: 'Mở đầu: Khám phá Tuple & File, 5 Đặc tính cốt lõi & Bảng 9-1, 9-2',
  subtitle: 'Khởi đầu chuyến hành trình hoàn thiện các kiểu đối tượng cốt lõi của Python, 5 đặc tính nền tảng của Tuple và hai bảng tra cứu tổng hợp Bảng 9-1, 9-2',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Xác định rõ vị trí của Chương 9 trong cấu trúc Phần II: hoàn thiện chuyến hành trình khám phá các kiểu dữ liệu cốt lõi bằng tuple và file.',
    'Nắm vững 5 đặc tính kỹ thuật cốt lõi của Tuple: tập hợp có thứ tự, truy cập theo vị trí bù (offset), dãy tuần tự bất biến, chiều dài cố định/dị thể/lồng nhau, và mảng tham chiếu đối tượng.',
    'Bao quát trọn vẹn Bảng 9-1: bức tranh toàn cảnh về 13 nhóm thao tác và giá trị nguyên bản (literal) phổ biến với kiểu Tuple.',
    'Bao quát trọn vẹn Bảng 9-2: bức tranh toàn cảnh về 16 thao tác phổ biến trên đối tượng File trong Python.',
    'Định hình phạm vi kiến thức: file ở đây tập trung vào nền tảng cốt lõi, phần nâng cao về Unicode chuyên sâu sẽ được mở rộng ở Chương 37.'
  ],

  intuition: {
    title: 'Viên nang thời gian niêm phong và Chiếc cổng xuất nhập luồng dữ liệu',
    metaphor: 'Sau khi đã nghiên cứu các kiểu số ở Chương 5, cơ chế tham chiếu ở Chương 6, chuỗi ký tự ở Chương 7, cùng list và dictionary ở Chương 8, chúng ta tiến vào chương cuối cùng của Phần II. Hãy hình dung Tuple giống như một viên nang thời gian: bạn có thể xếp vào đó các đồ vật tùy ý (số, chuỗi, hay thậm chí cả list), nhưng một khi đã niêm phong lại, trật tự và cấu trúc của viên nang là bất biến (immutable) — bạn không thể thêm bớt hay tráo đổi ngăn. Ngược lại, File không phải là một ngăn chứa thông thường trong bộ nhớ RAM, mà giống như một chiếc cổng kết nối (pipeline) vươn ra thế giới bên ngoài: nó kết nối trực tiếp chương trình Python với các tệp tin trên ổ đĩa cứng, cho phép truyền nhận dữ liệu bền vững theo thời gian.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">HAI MẢNH GHÉP CỐT LÕI CUỐI CÙNG TRONG HỆ THỐNG KIỂU DỮ LIỆU PYTHON</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;">
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:8px;">🔒 TUPLE: Dãy tuần tự bất biến (Immutable Sequence)</div>
            <div style="display:flex;gap:6px;justify-content:center;margin-bottom:8px;">
              <div style="display:flex;flex-direction:column;align-items:center;">
                <span style="font-size:0.7rem;color:var(--text-muted);">Offset 0</span>
                <span style="padding:6px 10px;background:var(--accent-soft);color:var(--accent-text);border:1px solid var(--accent-primary);border-radius:4px;font-weight:700;">'Pat'</span>
              </div>
              <div style="display:flex;flex-direction:column;align-items:center;">
                <span style="font-size:0.7rem;color:var(--text-muted);">Offset 1</span>
                <span style="padding:6px 10px;background:var(--accent-soft);color:var(--accent-text);border:1px solid var(--accent-primary);border-radius:4px;font-weight:700;">40.5</span>
              </div>
              <div style="display:flex;flex-direction:column;align-items:center;">
                <span style="font-size:0.7rem;color:var(--text-muted);">Offset 2</span>
                <span style="padding:6px 10px;background:var(--accent-soft);color:var(--accent-text);border:1px solid var(--accent-primary);border-radius:4px;font-weight:700;">['dev', 'mgr']</span>
              </div>
            </div>
            <div style="font-size:0.78rem;color:var(--text-secondary);text-align:center;">Dấu ngoặc đơn () • Cố định chiều dài • Toàn vẹn dữ liệu • Làm khóa Dict</div>
          </div>
          <div style="padding:14px;background:var(--bg-surface);border:1px solid #10b981;border-radius:8px;">
            <div style="font-weight:700;color:#10b981;margin-bottom:8px;">📂 FILE: Cổng giao tiếp Tệp tin bên ngoài (I/O Stream)</div>
            <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:8px;padding:8px;background:rgba(16,185,129,0.1);border-radius:6px;">
              <span style="font-size:0.8rem;font-weight:700;">Python open()</span>
              <span>⇄</span>
              <span style="font-size:0.75rem;padding:4px 8px;background:#10b981;color:#fff;border-radius:4px;">Bộ đệm I/O</span>
              <span>⇄</span>
              <span style="font-size:0.8rem;font-weight:700;">Ổ đĩa / OS File</span>
            </div>
            <div style="font-size:0.78rem;color:var(--text-secondary);text-align:center;">Chế độ r/w/a • Đọc từng dòng iterator • Không phải chuỗi/ánh xạ/số</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Vị trí của Chương 9 trong Cấu trúc Giáo trình',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác (Types and Operations) • Chương 9: Tuple, File và các đối tượng khác • <strong>PDF Trang 1 / 48 – Trang 3 / 48</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung, thuật ngữ và mã ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ nghiên cứu và tự học chuyên sâu.</em></p>
          </div>
        </div>

        <p>Chương 9 là chương cuối cùng của <strong>Phần II: Các kiểu dữ liệu và thao tác</strong> trong cuốn giáo trình kinh điển của Mark Lutz. Chương này đảm nhiệm hai trọng trách lớn:</p>
        <ul>
          <li><strong>Hoàn thiện hai kiểu đối tượng cốt lõi dựng sẵn cuối cùng:</strong> Khám phá chuyên sâu <strong>tuple</strong> (bộ giá trị bất biến dùng để cấu tạo nhóm dữ liệu cố định) và <strong>file</strong> (giao diện kết nối tới các tệp tin lưu trữ bên ngoài trên máy tính của bạn).</li>
          <li><strong>Tổng kết toàn diện bức tranh đối tượng của Python:</strong> Điểm lại các đặc tính chung nhất của toàn bộ thế giới kiểu dữ liệu — tính bằng nhau (<code>==</code>), định danh đối tượng (<code>is</code>), so sánh đệ quy, sao chép nông vs sao chép sâu (<code>copy</code> vs <code>deepcopy</code>), giá trị chân lý (<em>truthiness</em>), phân cấp kiểu, 4 cạm bẫy kinh điển, cùng 11 bài tập thực hành tổng kết Phần II.</li>
        </ul>

        <div class="callout-box callout-note">
          <div class="callout-header"><span>📌 Lưu ý về phạm vi tổ chức nội dung:</span> <span>Unicode và File</span></div>
          <div class="callout-body">
            <p>Tương tự như đối với chuỗi trong Chương 7, việc tìm hiểu về file ở Chương 9 sẽ tập trung vào những kiến thức nền tảng vững chắc nhất. Các file văn bản Unicode đã được giới thiệu sơ lược ở Chương 4, nhưng phần trình bày toàn diện về cơ chế mã hóa sẽ được đào sâu ở Chương 37. Đối với chương này, chúng ta giả định nội dung file văn bản được mã hóa và giải mã theo bảng mã mặc định của nền tảng.</p>
          </div>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Năm Đặc Tính Kỹ Thuật Nền Tảng của Tuple',
      content: `
        <p>Tuple là kiểu tập hợp cuối cùng trong chuyến khảo sát các kiểu đối tượng cốt lõi. Tuple hoạt động gần giống như list, ngoại trừ việc chúng không thể thay đổi tại chỗ (chúng là <strong>bất biến - immutable</strong>) và thường được viết trong cặp dấu ngoặc đơn <code>()</code> thay vì ngoặc vuông <code>[]</code>. Dưới đây là 5 đặc tính kỹ thuật cốt lõi được Mark Lutz đúc kết:</p>

        <ol>
          <li><strong>Tập hợp có thứ tự chứa các đối tượng tùy ý:</strong> Tương tự như chuỗi và list, tuple là các tập hợp đối tượng có thứ tự theo vị trí (duy trì thứ tự từ trái sang phải giữa các phần tử). Chúng có thể chứa bất kỳ kiểu đối tượng nào bên trong.</li>
          <li><strong>Truy cập theo vị trí bù (offset):</strong> Các phần tử trong một tuple được truy cập theo vị trí bù số học (bắt đầu từ 0), hỗ trợ mọi thao tác truy cập dãy tuần tự như đánh chỉ mục (indexing) và cắt lát (slicing).</li>
          <li><strong>Thuộc phân loại "dãy tuần tự bất biến" (immutable sequence):</strong> Giống như chuỗi và list, tuple là các dãy tuần tự; chúng chia sẻ các phép toán chung như ghép nối <code>+</code>, lặp lại <code>*</code>, <code>len()</code>. Tuy nhiên, giống như chuỗi, tuple là bất biến; chúng không hỗ trợ bất kỳ thao tác sửa đổi tại chỗ (in-place) nào.</li>
          <li><strong>Chiều dài cố định, dị thể, và có thể lồng nhau tùy ý:</strong> Vì bất biến, bạn không thể thay đổi kích thước của tuple nếu không tạo một bản sao mới. Tuple có thể chứa các đối tượng thuộc nhiều kiểu khác nhau (dị thể) và hỗ trợ lồng ghép tùy ý (tuple chứa list, dict hoặc các tuple khác).</li>
          <li><strong>Mảng các tham chiếu đối tượng:</strong> Trong CPython, tuple được cài đặt dưới dạng một mảng chứa các con trỏ tham chiếu đối tượng, giúp việc đánh chỉ mục vào một tuple diễn ra cực kỳ nhanh chóng với độ phức tạp thời gian $O(1)$.</li>
        </ol>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Bảng 9-1: Toàn Cảnh Giá Trị Nguyên Bản (Literal) & Thao Tác với Tuple',
      content: `
        <p><strong>Bảng 9-1</strong> nêu bật các giá trị nguyên bản và thao tác phổ biến với tuple trong Python. Trong bảng dưới đây, <code>T</code> đại diện cho một đối tượng tuple:</p>

        <div style="overflow-x:auto;margin:16px 0;">
          <table class="data-table" style="width:100%;border-collapse:collapse;font-size:0.88rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);text-align:left;">
                <th style="padding:10px 12px;width:42%;">Thao tác (Operation)</th>
                <th style="padding:10px 12px;">Ý nghĩa / Giải thích (Interpretation)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>()</code></td>
                <td style="padding:8px 12px;">Một tuple rỗng</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>T = (0,)</code></td>
                <td style="padding:8px 12px;">Tuple có một phần tử (dấu phẩy phân biệt với biểu thức nhóm)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>T = (0, 'Py', 1.2, 3)</code></td>
                <td style="padding:8px 12px;">Tuple có bốn phần tử dị thể</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>T = 0, 'Py', 1.2, 3</code></td>
                <td style="padding:8px 12px;">Một tuple bốn phần tử không dùng dấu ngoặc đơn (tương đương dòng trên)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>T = ('Pat', ('dev', 'mgr'))</code></td>
                <td style="padding:8px 12px;">Các tuple lồng nhau đa tầng</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>T = tuple('hack')</code></td>
                <td style="padding:8px 12px;">Tuple chứa các phần tử từ một đối tượng khả lặp (iterable): <code>('h', 'a', 'c', 'k')</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>T[i]<br>T[i][j]<br>T[i:j]<br>len(T)</code></td>
                <td style="padding:8px 12px;">Đánh chỉ mục, chỉ mục của chỉ mục, lát cắt (slicing), độ dài phần tử</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>T1 + T2<br>T * 3</code></td>
                <td style="padding:8px 12px;">Ghép nối hai tuple (tạo tuple mới), lặp lại tuple</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>T1 > T2, T1 == T2</code></td>
                <td style="padding:8px 12px;">So sánh: độ lớn tương đối, bằng nhau về giá trị</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>'code' in T<br>for x in T: print(x)<br>[x ** 2 for x in T]</code></td>
                <td style="padding:8px 12px;">Kiểm tra thành viên ($O(N)$), vòng lặp duyệt, list comprehension</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>T = (x, 0, y, *x)</code></td>
                <td style="padding:8px 12px;">Giải nén (unpacking) từ một iterable với dấu <code>*</code> (Python 3.5+)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>T.index('Py')<br>T.count('Py')</code></td>
                <td style="padding:8px 12px;">Phương thức của tuple: tìm chỉ mục xuất hiện, đếm số lần xuất hiện</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;"><code>namedtuple('Emp', ['name', 'jobs'])</code></td>
                <td style="padding:8px 12px;">Kiểu mở rộng named-tuple trong module <code>collections</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-4',
      title: '4. Giới thiệu Đối tượng File và Bảng 9-2',
      content: `
        <p>Khác với các đối tượng số học, chuỗi hay tập hợp, <strong>file (tệp tin)</strong> trong Python đóng vai trò là giao diện kết nối giữa chương trình của bạn và hệ thống lưu trữ bên ngoài do hệ điều hành quản lý. Hàm dựng sẵn <code>open</code> tạo ra đối tượng file này.</p>

        <p><strong>Bảng 9-2</strong> tóm tắt các thao tác phổ biến nhất khi làm việc với đối tượng file trong Python:</p>

        <div style="overflow-x:auto;margin:16px 0;">
          <table class="data-table" style="width:100%;border-collapse:collapse;font-size:0.88rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);text-align:left;">
                <th style="padding:10px 12px;width:42%;">Thao tác (Operation)</th>
                <th style="padding:10px 12px;">Ý nghĩa / Giải thích (Interpretation)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>output = open(r'C:\\data', 'w')</code></td>
                <td style="padding:8px 12px;">Tạo file đầu ra (đường dẫn Windows raw string, <code>'w'</code> = ghi)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>input = open('/home/me/data', 'r')</code></td>
                <td style="padding:8px 12px;">Mở file đầu vào (đường dẫn Unix, <code>'r'</code> = đọc)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>input = open('data')</code></td>
                <td style="padding:8px 12px;">Mở file đầu vào (thư mục hiện tại CWD, <code>'r'</code> là mặc định)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>aString = input.read()</code></td>
                <td style="padding:8px 12px;">Đọc toàn bộ file vào một chuỗi duy nhất</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>aString = input.read(N)</code></td>
                <td style="padding:8px 12px;">Đọc tối đa N ký tự (hoặc N byte đối với file nhị phân)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>aString = input.readline()</code></td>
                <td style="padding:8px 12px;">Đọc dòng tiếp theo (bao gồm cả ký tự xuống dòng <code>\\n</code>) vào chuỗi</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>aList = input.readlines()</code></td>
                <td style="padding:8px 12px;">Đọc toàn bộ file vào một list các chuỗi dòng (mỗi phần tử kèm <code>\\n</code>)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>output.write(aString)</code></td>
                <td style="padding:8px 12px;">Ghi một chuỗi các ký tự (hoặc chuỗi bytes) vào file</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>output.writelines(aList)</code></td>
                <td style="padding:8px 12px;">Ghi tất cả các chuỗi dòng trong một list vào file (nguyên văn, không tự thêm <code>\\n</code>)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>output.close()</code></td>
                <td style="padding:8px 12px;">Đóng thủ công (tự động thực hiện khi file được bộ thu gom rác giải phóng)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>output.flush()</code></td>
                <td style="padding:8px 12px;">Xả sạch bộ đệm đầu ra xuống đĩa cứng mà không cần đóng file</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>anyFile.seek(N)</code></td>
                <td style="padding:8px 12px;">Thay đổi vị trí con trỏ file tới vị trí bù N byte cho thao tác kế tiếp</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>for line in open('data'): use line</code></td>
                <td style="padding:8px 12px;">Bộ lặp file (file iterator) tự động đọc từng dòng một, tối ưu bộ nhớ</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>open('f.txt', encoding='utf-8')</code></td>
                <td style="padding:8px 12px;">File văn bản Unicode (truyền nhận chuỗi <code>str</code>)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>open('f.bin', 'rb')</code></td>
                <td style="padding:8px 12px;">File nhị phân (truyền nhận chuỗi <code>bytes</code>)</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;"><code>codecs.open('f.txt', ...)</code></td>
                <td style="padding:8px 12px;">Giao diện file văn bản Unicode nâng cao thay thế</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tuple không có các phương thức thay đổi tại chỗ của List',
        content: 'Hãy để ý rằng Bảng 9-1 không có các phương thức như <code>append()</code>, <code>extend()</code>, <code>insert()</code>, hay <code>sort()</code>. Vì là đối tượng bất biến, tuple chỉ sở hữu đúng hai phương thức tìm kiếm là <code>index()</code> và <code>count()</code>.'
      }
    ],
    pitfalls: [
      {
        title: 'File không phải là dãy tuần tự hay ánh xạ',
        content: 'Đối tượng file là một trường hợp ngoại lệ độc đáo: nó được sinh ra từ hàm dựng sẵn <code>open</code> nhưng không phản hồi các toán tử biểu thức (như phép cộng <code>+</code> hay cắt lát <code>[:]</code>). Mọi tương tác với file đều được thực hiện qua lời gọi phương thức hoặc bộ lặp.'
      }
    ]
  },

  exercises: [
    {
      title: 'Khởi tạo Tuple đa dạng và so sánh với List',
      level: 'Dễ',
      problem: 'Hãy viết một đoạn mã Python ngắn: (1) Khởi tạo một tuple rỗng, một tuple có duy nhất 1 phần tử là số 42, và một tuple gồm 4 phần tử dị thể (chuỗi, số nguyên, số thực, một list). (2) In ra kiểu dữ liệu của biến tuple một phần tử để chứng minh nó là tuple chứ không phải số nguyên.',
      hint: 'Tuple 1 phần tử bắt buộc phải có dấu phẩy: (42,).',
      solutionCode: `empty_tup = ()
single_tup = (42,)
mixed_tup = ('Python', 100, 3.14, ['nested', 'list'])

print("Single tuple:", single_tup, type(single_tup).__name__)
print("Mixed tuple length:", len(mixed_tup))
print("Phần tử cuối của mixed tuple:", mixed_tup[3])`,
      solutionOutput: `Single tuple: (42,) tuple
Mixed tuple length: 4
Phần tử cuối của mixed tuple: ['nested', 'list']`,
      explanation: 'Dấu phẩy trong (42,) là cú pháp bắt buộc để Python phân biệt tuple một phần tử với biểu thức đặt trong dấu ngoặc đơn số học thông thường.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây đúng nhất về kiểu dữ liệu Tuple trong Python?',
      options: [
        'Tuple là dãy tuần tự khả biến, có thể co giãn kích thước bằng phương thức append().',
        'Tuple là dãy tuần tự bất biến, có chiều dài cố định và duy trì thứ tự phần tử theo vị trí bù (offset).',
        'Tuple chỉ chứa được các kiểu dữ liệu số học và chuỗi, không thể chứa list hay dictionary.',
        'Tuple được truy cập theo khóa định danh tương tự như dictionary.'
      ],
      correctIndex: 1,
      explanation: 'Tuple là dãy tuần tự bất biến (immutable sequence), truy cập theo vị trí bù (offset), chiều dài cố định và có thể chứa bất kỳ đối tượng nào (dị thể và lồng nhau).'
    },
    {
      question: 'Trong Bảng 9-2, thao tác nào được coi là cách tốt nhất, tối ưu bộ nhớ nhất để đọc từng dòng từ một file văn bản lớn?',
      options: [
        'aString = input.read()',
        'aList = input.readlines()',
        'for line in open(\'data\'): use line (Bộ lặp file)',
        'aString = input.readline() gọi lặp lại trong vòng lặp while True'
      ],
      correctIndex: 2,
      explanation: 'Bộ lặp file (file iterator) tự động nạp từng dòng theo yêu cầu (on-demand), tiêu tốn cực ít bộ nhớ và đạt hiệu năng cao hơn so với việc nạp toàn bộ file vào RAM bằng read() hay readlines().'
    }
  ],

  summary: [
    'Chương 9 là chương cuối cùng của Phần II, hoàn thiện khảo sát hai kiểu đối tượng cốt lõi: Tuple và File, đồng thời tổng kết toàn diện các đặc tính của hệ thống kiểu dữ liệu Python.',
    'Tuple là dãy tuần tự bất biến: bảo toàn dữ liệu, chiều dài cố định, truy cập theo vị trí bù O(1), mảng con trỏ tham chiếu trong CPython, và chỉ có 2 phương thức dựng sẵn là index() và count().',
    'Bảng 9-1 cung cấp bức tranh toàn cảnh về cú pháp literal và các thao tác phổ biến với tuple, bao gồm kỹ thuật unpack với dấu *.',
    'File là giao diện kết nối tệp tin hệ thống do open() trả về, đóng vai trò luồng I/O độc lập với các kiểu dãy tuần tự hay ánh xạ.',
    'Bảng 9-2 tóm lược 16 thao tác phổ biến nhất khi thao tác với file, đặt nền móng cho các bài thực hành chi tiết tiếp theo.'
  ],

  nextSteps: 'Trong bài tiếp theo (C9.1), chúng ta sẽ khám phá chi tiết các điểm đặc thù trong cú pháp của Tuple: vì sao dấu phẩy tạo nên tuple, trường hợp bỏ dấu ngoặc đơn, phép gán dãy tuần tự và cạm bẫy khi dùng biểu thức lambda.'
};
