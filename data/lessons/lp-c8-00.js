export default {
  id: 'lp-c8-00',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.0',
  title: 'Mở đầu: Khám phá List & Dictionary & Bảng 8-1, 8-2',
  subtitle: 'Tổng quan hai kiểu tập hợp đối tượng cốt lõi linh hoạt nhất của Python, tính khả biến tại chỗ và hai bảng tra cứu tổng hợp Bảng 8-1, 8-2',
  level: 'Cơ bản',
  duration: '20 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Xác định rõ vị trí của Chương 8 trong Phần II: bước đột phá từ các kiểu dữ liệu nguyên tử (số, chuỗi) sang các tập hợp đối tượng đa năng.',
    'Nắm vững định nghĩa cốt lõi: List là dãy tuần tự khả biến truy cập theo vị trí bù (offset), còn Dictionary là ánh xạ khả biến truy cập theo khóa (key).',
    'Bao quát trọn vẹn Bảng 8-1: bức tranh toàn cảnh về 16 nhóm thao tác và hằng số bằng chữ phổ biến với kiểu List.',
    'Bao quát trọn vẹn Bảng 8-2: bức tranh toàn cảnh về 17 nhóm thao tác và hằng số bằng chữ phổ biến với kiểu Dictionary.'
  ],

  intuition: {
    title: 'Ngăn kéo đánh số thứ tự và Tủ khóa dán nhãn tên',
    metaphor: 'Sau khi đã làm chủ các đối tượng đơn lẻ như số nguyên và chuỗi ký tự bất biến ở các chương trước, bạn bước vào thế giới của các "vùng chứa" (containers) đa năng. Hãy hình dung List giống như một chiếc tủ có các ngăn kéo dài được đánh số thứ tự cố định từ trái sang phải (0, 1, 2, 3...). Bạn cất đồ vào và lấy đồ ra dựa vào số thứ tự của ngăn kéo. Ngược lại, Dictionary giống như một tủ gửi đồ thông minh ở siêu thị: mỗi ngăn tủ không gọi theo số thứ tự mà được dán một chiếc thẻ tên định danh (khóa - key) duy nhất như "tên", "tuổi", "email". Cả hai chiếc tủ này đều có một đặc tính phi thường mà chuỗi không có: chúng hoàn toàn khả biến (mutable) — bạn có thể mở tủ, thay thế món đồ bên trong, tháo bớt ngăn hoặc lắp thêm ngăn mới ngay tại chỗ mà không cần phải đập bỏ tủ cũ để đúc lại tủ mới!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH SO SÁNH HAI TRỤ CỘT TẬP HỢP KHẢ BIẾN (MUTABLE COLLECTIONS)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:14px;">
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:#10b981;margin-bottom:8px;">📦 LIST: Dãy tuần tự có thứ tự (Sequence)</div>
            <div style="display:flex;gap:6px;justify-content:center;margin-bottom:8px;">
              <div style="display:flex;flex-direction:column;align-items:center;">
                <span style="font-size:0.7rem;color:var(--text-muted);">Offset 0</span>
                <span style="padding:6px 10px;background:rgba(16,185,129,0.15);border:1px solid #10b981;border-radius:4px;font-weight:700;">123</span>
              </div>
              <div style="display:flex;flex-direction:column;align-items:center;">
                <span style="font-size:0.7rem;color:var(--text-muted);">Offset 1</span>
                <span style="padding:6px 10px;background:rgba(16,185,129,0.15);border:1px solid #10b981;border-radius:4px;font-weight:700;">'abc'</span>
              </div>
              <div style="display:flex;flex-direction:column;align-items:center;">
                <span style="font-size:0.7rem;color:var(--text-muted);">Offset 2</span>
                <span style="padding:6px 10px;background:rgba(16,185,129,0.15);border:1px solid #10b981;border-radius:4px;font-weight:700;">1.23</span>
              </div>
            </div>
            <div style="font-size:0.78rem;color:var(--text-secondary);text-align:center;">Truy cập theo vị trí số • Thay đổi tại chỗ (in-place) • Mở rộng tùy ý</div>
          </div>
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:#8b5cf6;margin-bottom:8px;">🗂️ DICTIONARY: Ánh xạ theo khóa (Mapping)</div>
            <div style="display:flex;gap:6px;justify-content:center;margin-bottom:8px;">
              <div style="display:flex;flex-direction:column;align-items:center;">
                <span style="font-size:0.7rem;color:var(--text-muted);">Khóa 'name'</span>
                <span style="padding:6px 10px;background:rgba(139,92,246,0.15);border:1px solid #8b5cf6;border-radius:4px;font-weight:700;">'Pat'</span>
              </div>
              <div style="display:flex;flex-direction:column;align-items:center;">
                <span style="font-size:0.7rem;color:var(--text-muted);">Khóa 'age'</span>
                <span style="padding:6px 10px;background:rgba(139,92,246,0.15);border:1px solid #8b5cf6;border-radius:4px;font-weight:700;">40.0</span>
              </div>
            </div>
            <div style="font-size:0.78rem;color:var(--text-secondary);text-align:center;">Truy cập theo khóa băm • Tra cứu O(1) cực nhanh • Giữ thứ tự chèn</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Vị trí của List và Dictionary trong Giáo trình',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác (Types and Operations) • Chương 8: List và Dictionary • <strong>PDF Trang 1 / 42 – Trang 3 / 42, Trang 16 / 42 – Trang 18 / 42</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung, thuật ngữ và mã ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ nghiên cứu và tự học chuyên sâu.</em></p>
          </div>
        </div>

        <p>Sau khi đã khám phá các kiểu số ở Chương 5, cơ chế tham chiếu đối tượng ở Chương 6, và kiểu chuỗi ở Chương 7, chương này tiếp tục mang đến bức tranh toàn diện về hai kiểu đối tượng tập hợp chủ lực trong hầu hết mọi tập lệnh (script) Python: <strong>list (danh sách khả biến)</strong> và <strong>dictionary (từ điển / dict)</strong>.</p>

        <p>Như tác giả Mark Lutz nhấn mạnh, cả hai kiểu dữ liệu này đều sở hữu tính linh hoạt vượt trội:</p>
        <ul>
          <li><strong>Khả biến (Mutable):</strong> Chúng có thể được sửa đổi trực tiếp tại chỗ (<em>in-place</em>) mà không đòi hỏi tạo ra một bản sao mới như chuỗi.</li>
          <li><strong>Tự động co giãn kích thước:</strong> Có thể tăng thêm hoặc thu hẹp số lượng phần tử tùy biến trong thời gian chạy của chương trình.</li>
          <li><strong>Chứa đựng và lồng ghép tùy ý:</strong> Chúng có thể chứa bất kỳ kiểu đối tượng nào khác (số, chuỗi, tệp, hàm, và chính các list hoặc dictionary khác) lồng nhau đến độ sâu tùy ý.</li>
        </ul>

        <p>Bằng cách tận dụng triệt để hai kiểu đối tượng dựng sẵn này, bạn có thể xây dựng và xử lý các cấu trúc thông tin phong phú, phức tạp trong ứng dụng của mình mà không cần phải tự định nghĩa các kiểu cấu trúc dữ liệu mới từ đầu.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Bảng 8-1: Toàn cảnh Hằng số bằng chữ & Thao tác với List',
      content: `
        <p>Để tiện cho việc học tập và tra cứu nhanh, <strong>Bảng 8-1</strong> tóm tắt các hằng số bằng chữ (literal) và các thao tác phổ biến, tiêu biểu nhất trên đối tượng list trong Python:</p>

        <div style="overflow-x:auto;margin:16px 0;">
          <table class="data-table" style="width:100%;border-collapse:collapse;font-size:0.88rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);text-align:left;">
                <th style="padding:10px 12px;width:40%;">Thao tác (Operation)</th>
                <th style="padding:10px 12px;">Ý nghĩa / Diễn giải (Interpretation)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>L = []</code></td>
                <td style="padding:8px 12px;">Một list rỗng (chiều dài bằng 0)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>L = [123, 'abc', 1.23, {}]</code></td>
                <td style="padding:8px 12px;">Bốn phần tử: các chỉ mục từ 0 đến 3 (chứa đối tượng dị thể)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>L = ['Pat', 40.0, ['dev', 'mgr']]</code></td>
                <td style="padding:8px 12px;">Các sublist lồng nhau (ma trận, bản ghi có cấu trúc)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>L = list('code')<br>L = list(range(-4, 4))</code></td>
                <td style="padding:8px 12px;">Tạo list từ các phần tử của một iterable, list các số nguyên liên tiếp</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>L[i]<br>L[i][j]<br>L[i:j]<br>len(L)</code></td>
                <td style="padding:8px 12px;">Chỉ mục, chỉ mục của chỉ mục (lồng nhau), lát cắt (slice), độ dài</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>L1 + L2<br>L * 3</code></td>
                <td style="padding:8px 12px;">Ghép nối (concatenation), lặp lại (repetition) trả về list mới</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>L1 &gt; L2, L1 == L2</code></td>
                <td style="padding:8px 12px;">So sánh: so sánh độ lớn, bằng nhau (tự động duyệt tuần tự từ trái sang phải)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>3 in L<br>for x in L: print(x)</code></td>
                <td style="padding:8px 12px;">Kiểm tra tư cách thành viên, duyệt lặp phần tử</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>L.append(4)<br>L.extend([5, 6, 7])<br>L.insert(i, X)</code></td>
                <td style="padding:8px 12px;">Các phương thức tăng kích thước list tại chỗ</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>L.index(X)<br>L.count(X)</code></td>
                <td style="padding:8px 12px;">Các phương thức tìm kiếm và đếm số lần xuất hiện (truy vấn thông tin)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>L.sort()<br>L.reverse()<br>L.copy()<br>L.clear()</code></td>
                <td style="padding:8px 12px;">Các phương thức sắp xếp, đảo ngược, sao chép nông, xóa rỗng</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>L.pop(i)<br>L.remove(X)<br>del L[i]<br>del L[i:j]<br>L[i:j] = []</code></td>
                <td style="padding:8px 12px;">Các phương thức và câu lệnh thu hẹp kích thước list</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>L[i] = 3<br>L[i:j] = [4, 5, 6]</code></td>
                <td style="padding:8px 12px;">Gán chỉ mục, gán lát cắt (thay đổi trực tiếp tại chỗ)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>L = [x, 0, y, *z]</code></td>
                <td style="padding:8px 12px;">Giải nén (unpacking) iterable trong list literal (Python 3.5+)</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;"><code>L = [x**2 for x in range(5)]<br>list(map(ord, 'python'))</code></td>
                <td style="padding:8px 12px;">List comprehension và hàm ánh xạ map()</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout-box callout-note">
          <div class="callout-header"><span>📌 Chú thích tác giả [1]:</span> <span>Tạo List động trong thực tế</span></div>
          <div class="callout-body">
            <p>Trong thực tế, bạn sẽ hiếm khi thấy các list lớn được viết cứng toàn bộ bằng cú pháp hằng chữ (literal). Phổ biến hơn là việc tạo động qua các hàm như <code>list(range(...))</code>, biểu thức list comprehension, kết quả từ các câu truy vấn cơ sở dữ liệu SQL, đọc tệp tin, giao diện GUI, v.v. Dù vậy, cú pháp hằng chữ vẫn là nền móng cốt yếu cần nắm vững.</p>
          </div>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Bảng 8-2: Toàn cảnh Hằng số bằng chữ & Thao tác với Dictionary',
      content: `
        <p>Bên cạnh list, <strong>dictionary (từ điển)</strong> là đại diện duy nhất trong số các kiểu cốt lõi dựng sẵn thuộc phân loại <em>ánh xạ (mapping)</em>. <strong>Bảng 8-2</strong> tóm tắt các thao tác phổ biến nhất trên dictionary:</p>

        <div style="overflow-x:auto;margin:16px 0;">
          <table class="data-table" style="width:100%;border-collapse:collapse;font-size:0.88rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);text-align:left;">
                <th style="padding:10px 12px;width:40%;">Thao tác (Operation)</th>
                <th style="padding:10px 12px;">Ý nghĩa / Diễn giải (Interpretation)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>D = {}</code></td>
                <td style="padding:8px 12px;">Dictionary rỗng</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>D = {'name': 'Pat', 'age': 40.0}</code></td>
                <td style="padding:8px 12px;">Dictionary hai phần tử (cặp key: value)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>E = {'cto': {'name': 'Sue', 'age': 40}}</code></td>
                <td style="padding:8px 12px;">Dictionary lồng nhau (nested dictionaries)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>D = dict(name='Bob', age=40)<br>D = dict([('name', 'Bob'), ('age', 40)])<br>D = dict(zip(keyslist, valueslist))<br>D = dict.fromkeys(['name', 'age'])</code></td>
                <td style="padding:8px 12px;">Các kỹ thuật khởi tạo thay thế: từ khóa, danh sách cặp tuple khóa/giá trị, zip danh sách khóa & giá trị, danh sách khóa mặc định</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>D['name']<br>E['cto']['age']</code></td>
                <td style="padding:8px 12px;">Đánh chỉ mục theo khóa, chỉ mục lồng nhau</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>'age' in D<br>for key in D: print(D[key])</code></td>
                <td style="padding:8px 12px;">Kiểm tra sự tồn tại của khóa (O(1)) và phép lặp qua các khóa</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>D.keys()<br>D.values()<br>D.items()<br>D.copy()<br>D.clear()<br>D.update(D2)<br>D.get(key, default?)<br>D.pop(key, default?)<br>D.setdefault(key, default?)<br>D.popitem()</code></td>
                <td style="padding:8px 12px;">Các phương thức: tất cả khóa, tất cả giá trị, các tuple (khóa, giá trị), sao chép nông, xóa toàn bộ, hợp nhất theo khóa, lấy an toàn có giá trị mặc định, xóa theo khóa, lấy/đặt mặc định, lấy & xóa cặp cuối cùng (LIFO)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>len(D)</code></td>
                <td style="padding:8px 12px;">Độ dài: số lượng mục (cặp khóa/giá trị) được lưu trữ</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>D[key] = 62</code></td>
                <td style="padding:8px 12px;">Thêm khóa mới (nếu chưa có) hoặc thay đổi giá trị (nếu đã có)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>del D[key]</code></td>
                <td style="padding:8px 12px;">Xóa mục theo khóa chỉ định</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>D1 == D2</code></td>
                <td style="padding:8px 12px;">So sánh: bằng nhau (duy nhất, bỏ qua thứ tự chèn)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>list(D.keys())<br>D1.keys() &amp; D2.keys()</code></td>
                <td style="padding:8px 12px;">Các đối tượng view (khung nhìn) và toán tử tập hợp trên view</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>D = {x, 'a': 1, y, **z}</code></td>
                <td style="padding:8px 12px;">Giải nén (unpacking) dictionary với <code>**</code> (Python 3.5+)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>D = {x: x*2 for x in range(10)}</code></td>
                <td style="padding:8px 12px;">Dictionary comprehension (tạo dict bằng biểu thức lặp)</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;"><code>D | E<br>D |= E</code></td>
                <td style="padding:8px 12px;">Biểu thức hợp nhất dictionary: sao chép + cập nhật (Python 3.9+)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout-box callout-note">
          <div class="callout-header"><span>📌 Chú thích tác giả [4]:</span> <span>Mở rộng Dictionary trong thời gian chạy</span></div>
          <div class="callout-body">
            <p>Cũng như list, dictionary thường được mở rộng động khi chương trình đang chạy. Điểm khác biệt mấu chốt là: bạn mở rộng dictionary bằng cách <em>gán trực tiếp cho các khóa mới</em> (<code>D['new_key'] = val</code>), trong khi list không cho phép gán chỉ mục ngoài biên mà phải dùng <code>append</code> hoặc <code>extend</code>.</p>
          </div>
        </div>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Quy luật khả biến (Mutable) và thay đổi tại chỗ (In-place)',
        content: 'Mọi thao tác sửa đổi trên chuỗi (str) ở Chương 7 đều tạo ra chuỗi mới. Nhưng với List và Dictionary ở Chương 8, phần lớn các phương thức (như <code>append</code>, <code>sort</code>, <code>update</code>) trực tiếp biến đổi đối tượng hiện tại tại chỗ mà không tạo đối tượng mới. Hãy luôn ghi nhớ điều này để tránh lỗi gán đè biến thành <code>None</code>!'
      }
    ],
    pitfalls: [
      {
        title: 'Bảng 8-1 và 8-2 là các biểu thức tổng kết mang tính khái niệm',
        content: 'Cũng giống như Bảng 7-1 ở chương trước, các biến <code>L</code>, <code>L1</code>, <code>L2</code>, <code>D</code>, <code>D1</code>, <code>D2</code> trong hai bảng trên là ký hiệu đại diện. Bạn cần khởi tạo giá trị thực tế trước khi chạy các thao tác đó trên trình thông dịch Python.'
      }
    ]
  },

  exercises: [
    {
      title: 'Khởi tạo và phân biệt cơ chế truy xuất của List và Dictionary',
      level: 'Dễ',
      problem: 'Hãy viết một đoạn mã Python ngắn: (1) Khởi tạo một list gồm 3 phần tử đại diện cho tên, tuổi và nghề nghiệp; truy xuất lấy phần tử nghề nghiệp theo chỉ số vị trí. (2) Khởi tạo một dictionary lưu trữ cùng 3 thông tin trên nhưng với các khóa có nhãn \'name\', \'age\', \'job\'; truy xuất lấy nghề nghiệp theo khóa.',
      hint: 'Dùng dấu ngoặc vuông [] cho list và ngoặc nhọn {} cho dictionary. Chỉ mục list bắt đầu từ 0.',
      solutionCode: `# 1. Tập hợp theo vị trí bù (List)
person_list = ['Pat', 40.0, 'developer']
job_from_list = person_list[2]

# 2. Tập hợp theo khóa nhãn (Dictionary)
person_dict = {'name': 'Pat', 'age': 40.0, 'job': 'developer'}
job_from_dict = person_dict['job']

print(f"Lấy từ List theo offset [2]: {job_from_list}")
print(f"Lấy từ Dict theo khóa ['job']: {job_from_dict}")`,
      solutionOutput: `Lấy từ List theo offset [2]: developer
Lấy từ Dict theo khóa ['job']: developer`,
      explanation: 'Ví dụ thể hiện sự khác biệt cốt lõi: List truy cập bằng chỉ số vị trí số học (offset 2), trong khi Dictionary truy cập bằng nhãn khóa biểu tượng (\'job\'), giúp dữ liệu có tính tự ghi tài liệu cao hơn.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây phân biệt CHÍNH XÁC NHẤT giữa List và Dictionary trong Python?',
      options: [
        'List là kiểu dữ liệu bất biến, còn Dictionary là kiểu dữ liệu khả biến.',
        'List là tập hợp có thứ tự truy cập theo vị trí bù (offset), còn Dictionary là ánh xạ truy cập theo khóa (key).',
        'List chỉ chứa được chuỗi, còn Dictionary chỉ chứa được số nguyên.',
        'Dictionary hỗ trợ các thao tác cắt lát (slice) tương tự như List.'
      ],
      correctIndex: 1,
      explanation: 'Cả List và Dictionary đều là kiểu dữ liệu khả biến (mutable), nhưng List là dãy tuần tự (sequence) truy cập theo vị trí bù số, còn Dictionary là ánh xạ (mapping) truy cập theo khóa.'
    },
    {
      question: 'Khi bạn gán giá trị cho một khóa chưa từng tồn tại trong Dictionary (ví dụ: D[\'new_key\'] = 100), điều gì sẽ xảy ra?',
      options: [
        'Chương trình sẽ báo lỗi IndexError giống như khi gán chỉ mục ngoài biên của List.',
        'Chương trình sẽ tự động tạo một mục mới trong Dictionary liên kết khóa đó với giá trị được gán.',
        'Chương trình sẽ bỏ qua phép gán mà không có cảnh báo nào.',
        'Chương trình sẽ xóa toàn bộ các phần tử hiện có trong Dictionary.'
      ],
      correctIndex: 1,
      explanation: 'Khác với List báo lỗi IndexError khi gán ngoài biên, phép gán khóa mới trong Dictionary sẽ tự động mở rộng và tạo thêm mục mới trong bảng.'
    }
  ],

  summary: [
    'Chương 8 là bước ngoặt quan trọng đưa người học từ các kiểu dữ liệu nguyên tử sang hai kiểu tập hợp đối tượng cốt lõi: List và Dictionary.',
    'List là dãy tuần tự khả biến (mutable sequence): có thứ tự vị trí từ trái sang phải, truy cập theo độ dời (offset), hỗ trợ nối chuỗi, cắt lát và co giãn động.',
    'Dictionary là ánh xạ khả biến (mutable mapping): lưu trữ các cặp khóa/giá trị, truy xuất cực nhanh theo cơ chế bảng băm O(1), và duy trì thứ tự chèn kể từ Python 3.7+.',
    'Bảng 8-1 và Bảng 8-2 đóng vai trò là bản đồ toàn cảnh, tóm tắt toàn bộ cú pháp literal và các nhóm thao tác thông dụng nhất sẽ được mổ xẻ chi tiết trong 22 bài học tiếp theo.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.1), chúng ta sẽ bắt đầu khảo sát chuyên sâu về List: 5 đặc tính cốt lõi, cơ chế phân loại dãy tuần tự khả biến và kiến trúc mảng tham chiếu bên trong CPython.'
};