/**
 * Dữ liệu Khóa học Git & GitHub: Cấp 2 – Trung cấp
 * Gắn liền với quy trình làm việc nhóm và cộng tác thực tế trên GitHub
 */

window.GH_LEVEL2_DATA = {
  id: 'part-gh-2',
  number: 'Cấp 2',
  title: 'Cộng tác Nhóm & Kỹ năng Trung cấp',
  level: 'Trung cấp',
  badge: 'Trung cấp',
  description: 'Làm chủ quy trình làm việc với nhánh tính năng, Pull Request, giải phẫu xung đột (Merge Conflict), Fork và Upstream, quản lý dự án với Issues/Projects, cất tạm thay đổi (Stash), đánh số phiên bản (Tag/Releases), Rebase vs Merge và chuẩn hóa tài liệu dự án.',
  lessons: [
    {
      id: 'gh-2-01',
      number: '2.1',
      title: 'Quy trình nhánh tính năng (Feature Branch), Pull Request và Code Review',
      subtitle: 'Quy chuẩn làm việc chuyên nghiệp trong mọi công ty công nghệ và văn hóa đánh giá mã nguồn',
      level: 'Trung cấp',
      duration: '35 phút',
      objectives: [
        'Hiểu vì sao không bao giờ được commit trực tiếp vào nhánh `main` trong môi trường làm việc nhóm.',
        'Thành thạo vòng đời của một Feature Branch từ lúc sinh ra đến lúc bị xóa bỏ sau khi gộp.',
        'Tạo Pull Request (PR) chuẩn mực trên GitHub kèm mô tả, gắn thẻ reviewer và tạo Draft PR.',
        'Tiến hành Code Review: nhận xét từng dòng, đề xuất code sửa trực tiếp (Suggestions) và duyệt PR.',
        'Phân biệt 3 chế độ gộp PR trên GitHub: Merge commit, Squash and merge, Rebase and merge.'
      ],
      intuition: {
        title: 'Bản vẽ nháp và Hội đồng thẩm định thiết kế',
        metaphor: 'Trong một công ty xây dựng, nhánh `main` giống như tòa nhà thật đang mở cửa đón khách. Bạn không thể cầm búa xông thẳng vào sảnh chính để đập tường thử nghiệm. Bạn phải vẽ một bản vẽ nháp riêng ở phòng thí nghiệm (Feature Branch). Khi vẽ xong, bạn gửi bản thảo đó lên bàn của Hội đồng thẩm định và xin ý kiến: "Tôi đề xuất thay đổi cấu trúc này, xin các kỹ sư trưởng xem xét!" — Đó chính là Pull Request. Đồng nghiệp sẽ vào soi từng chi tiết, để lại ghi chú "Dòng này có nguy cơ sập, hãy sửa lại theo cách này". Chỉ khi các kỹ sư đồng ý bấm nút Approve, thay đổi mới được chính thức thi công vào tòa nhà `main`.',
        visualHtml: `
          <div style="display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
            <div style="font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--accent-text);text-align:center;">VÒNG ĐỜI QUY CHUẨN CỦA MỘT PULL REQUEST (PR)</div>
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:nowrap;gap:5px;font-family:var(--font-mono);font-size:0.76rem;white-space:nowrap;overflow-x:auto;padding-bottom:2px;">
              <span style="padding:6px 8px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">1. Tạo branch</span>
              <span style="color:var(--text-muted);">→</span>
              <span style="padding:6px 8px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">2. Commit &amp; Push</span>
              <span style="color:var(--text-muted);">→</span>
              <span style="padding:6px 8px;background:var(--accent-soft);border:1px solid var(--accent-soft-border);border-radius:6px;color:var(--accent-text);font-weight:700;">3. Mở PR</span>
              <span style="color:var(--text-muted);">→</span>
              <span style="padding:6px 8px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">4. Review &amp; CI</span>
              <span style="color:var(--text-muted);">→</span>
              <span style="padding:6px 8px;background:var(--success-bg);border:1px solid var(--success-border);border-radius:6px;color:var(--success-text);font-weight:700;">5. Merge PR</span>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Quy trình mở Pull Request từ dòng lệnh lên GitHub',
          content: `
            <p>Quy tắc đặt tên nhánh tính năng phổ biến:</p>
            <ul>
              <li><code>feat/ten-tinh-nang</code>: Thêm tính năng mới (ví dụ <code>feat/t-string-parser</code>).</li>
              <li><code>fix/ten-loi</code>: Sửa lỗi (ví dụ <code>fix/index-error-empty-str</code>).</li>
              <li><code>docs/ten-tai-lieu</code>: Cải thiện tài liệu hướng dẫn.</li>
            </ul>
            <p>Sau khi đẩy nhánh lên GitHub, giao diện web sẽ hiện ngay nút màu vàng <strong>"Compare &amp; pull request"</strong>. Bạn điền tiêu đề rõ nghĩa, mô tả tóm tắt những thay đổi và gắn nhãn thành viên duyệt code (Reviewers).</p>
          `,
          codeExamples: [
            {
              title: 'Tạo nhánh tính năng, đẩy lên origin và mở PR',
              lang: 'Bash',
              code: `# 1. Đảm bảo nhánh main ở máy bạn là mới nhất
git switch main
git pull

# 2. Tạo nhánh tính năng mới từ main
git switch -c feat/dem-tu-python

# 3. Viết code, thêm test và commit
echo 'def dem_tu(s): return len(s.split())' >> text_utils.py
git add text_utils.py
git commit -m "Them ham dem_tu tach chuoi bang whitespace"

# 4. Đẩy nhánh này lên GitHub
git push -u origin feat/dem-tu-python`,
              output: `Total 3 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Create a pull request for 'feat/dem-tu-python' on GitHub by visiting:
remote:      https://github.com/user/du-an-python/pull/new/feat/dem-tu-python
To github.com:user/du-an-python.git
 * [new branch]      feat/dem-tu-python -> feat/dem-tu-python`,
              annotations: [
                { line: 3, text: 'Luôn kéo code mới nhất của main trước khi rẽ nhánh mới để tránh xung đột.' },
                { line: 15, text: 'GitHub trả về ngay một đường link URL bấm vào là mở sẵn trang tạo PR!' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Ba chế độ gộp PR trên GitHub: Khi nào nên chọn cách nào?',
          content: `
            <p>Khi bấm nút gộp PR trên GitHub, bạn có 3 lựa chọn với 3 triết lý lịch sử khác nhau:</p>
            <div class="table-responsive">
              <table class="lesson-table">
                <thead>
                  <tr>
                    <th>Chế độ gộp</th>
                    <th>Cơ chế hoạt động</th>
                    <th>Khi nào nên dùng?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Create a merge commit</strong></td>
                    <td>Giữ nguyên toàn bộ từng commit nhỏ của nhánh và tạo thêm 1 commit gộp (2 commit cha).</td>
                    <td>Nhánh tính năng lớn gồm nhiều bước quan trọng muốn bảo toàn trọn vẹn ngữ cảnh lịch sử.</td>
                  </tr>
                  <tr>
                    <td><strong>Squash and merge (Khuyên dùng)</strong></td>
                    <td>Gộp tất cả 5-10 commit vụn vặt của PR thành đúng 1 commit duy nhất trên nhánh <code>main</code>.</td>
                    <td>Hầu hết các PR hằng ngày; giữ lịch sử của <code>main</code> cực kỳ sạch sẽ, 1 tính năng = 1 commit.</td>
                  </tr>
                  <tr>
                    <td><strong>Rebase and merge</strong></td>
                    <td>Phát lại từng commit của nhánh tính năng lên đầu <code>main</code> theo đường thẳng.</td>
                    <td>Đội ngũ muốn lịch sử thẳng tắp mà không sinh commit gộp phụ.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `,
          codeExamples: [
            {
              title: 'Dọn dẹp nhánh sau khi PR đã gộp trên GitHub',
              lang: 'Bash',
              code: `# 1. Sau khi PR đã merge trên GitHub, quay về main
git switch main

# 2. Cập nhật nhánh main từ xa về máy
git pull

# 3. Xóa nhánh cục bộ an toàn
git branch -d feat/dem-tu-python

# 4. (Nếu cần) xóa nhánh từ xa trên GitHub qua terminal
git push origin --delete feat/dem-tu-python`,
              output: `Switched to branch 'main'
Updating 4f2a1b9..e8d7c6b
Fast-forward
Deleted branch feat/dem-tu-python (was e8d7c6b).
To github.com:user/du-an-python.git
 - [deleted]         feat/dem-tu-python`,
              annotations: [
                { line: 8, text: 'git branch -d xóa an toàn nhánh cục bộ.' },
                { line: 11, text: 'Xóa nhánh trên GitHub server để tránh tích tụ hàng trăm nhánh rác cũ.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Tạo một PR khổng lồ chứa hơn 1.000 dòng thay đổi',
            content: 'PR càng dài thì người review càng ngại đọc và nguy cơ bỏ lọt lỗi nghiêm trọng càng cao ("10 lines of code = 10 issues found; 1000 lines of code = LGTM"). Hãy chia nhỏ công việc thành các PR nhỏ gọn dưới 200-300 dòng để đồng đội review kỹ trong 10 phút.'
          }
        ],
        tips: [
          {
            title: 'Sử dụng Draft Pull Request khi đang làm dở',
            content: 'Khi bấm tạo PR, bạn có thể chọn mũi tên cạnh nút Create và chọn "Create Draft Pull Request". Nhánh sẽ không thể bị gộp nhầm và thông báo cho mọi người biết tính năng vẫn đang trong giai đoạn phác thảo cần góp ý sớm.'
          }
        ]
      },
      exercises: [
        {
          level: 'Vừa',
          title: 'Mô phỏng quy trình Feature Branch chuẩn mực',
          problem: 'Tạo nhánh `feat/ham-dao-nguoc`, viết hàm đảo ngược chuỗi bằng slicing `s[::-1]` vào `text_utils.py`, commit trên nhánh, kiểm tra xem lệnh `git branch --merged` có hiển thị nó chưa, sau đó gộp vào main và kiểm tra lại.',
          hint: 'Dùng git branch --merged để xem nhánh nào đã an toàn gộp vào nhánh hiện tại.',
          solutionCode: `git switch -c feat/ham-dao-nguoc
echo 'def dao_nguoc(s): return s[::-1]' >> text_utils.py
git add text_utils.py
git commit -m "Them ham dao_nguoc bang slicing"
git switch main
git branch --merged
git merge feat/ham-dao-nguoc
git branch --merged
git branch -d feat/ham-dao-nguoc`,
          solutionOutput: `* main (khi chưa merge)
* feat/ham-dao-nguoc
  main (sau khi merge, cả 2 nhánh đều xuất hiện trong danh sách merged)
Deleted branch feat/ham-dao-nguoc`,
          explanation: 'Lệnh git branch --merged là công cụ kiểm tra độ an toàn tuyệt đối trước khi bạn quyết định xóa bất kỳ nhánh nào.',
          annotations: [
            { line: 6, text: 'Kiểm tra danh sách nhánh đã an toàn để xóa.' }
          ]
        }
      ],
      summary: [
        'Không bao giờ code thẳng vào main; luôn đi theo chu trình: tạo nhánh -> PR -> Code Review -> Merge.',
        'Squash and merge là lựa chọn tối ưu cho hầu hết dự án để giữ lịch sử main gọn đẹp.',
        'Luôn dọn dẹp nhánh cục bộ (`branch -d`) và nhánh remote sau khi PR đã hoàn tất.'
      ]
    },
    {
      id: 'gh-2-02',
      number: '2.2',
      title: 'Giải phẫu và Xử lý xung đột gộp nhánh (Merge Conflict)',
      subtitle: 'Bình tĩnh giải mã các ký hiệu <<<<<<<, =======, >>>>>>> và quy trình thoát hiểm an toàn',
      level: 'Trung cấp',
      duration: '40 phút',
      objectives: [
        'Hiểu bản chất khoa học: Khi nào Git tự động gộp được và khi nào bắt buộc con người phải can thiệp.',
        'Đọc hiểu chính xác cấu trúc 3 phần của một khối xung đột Git sinh ra trong mã nguồn.',
        'Thực hiện quy trình 4 bước xử lý xung đột chuẩn xác trên tệp Python.',
        'Sử dụng lệnh cứu cánh `git merge --abort` để hủy bỏ và đưa kho về trạng thái an toàn ban đầu khi bối rối.'
      ],
      intuition: {
        title: 'Hai người sửa cùng một bức tranh tại cùng một góc vẽ',
        metaphor: 'Nếu bạn vẽ thêm một cái cây ở góc trái bức tranh (tệp A), còn đồng đội vẽ thêm một con thuyền ở góc phải (tệp B), Git cực kỳ thông minh: nó tự động ghép cả cây và thuyền vào bức tranh chung mà không cần hỏi bạn một câu nào. Nhưng nếu cả hai người cùng cầm cọ sửa đúng một điểm ảnh: bạn tô màu xanh lá, đồng đội tô màu tím than — Git không biết ai đúng ai sai, và nó không bao giờ dám tự tiện đoán mò. Git sẽ dừng lại, khoanh vùng chỗ đó lại bằng các nét kẻ phấn (`<<<<<<<`, `=======`, `>>>>>>>`) và bảo bạn: "Hai người hãy bàn bạc xem chỗ này chọn màu gì, sau khi chọn xong hãy xóa vạch phấn đi rồi bảo tôi!".',
        visualHtml: `
          <div style="padding:14px 16px;background:var(--bg-code);color:#e2e8f0;border-radius:10px;font-family:var(--font-mono);font-size:0.81rem;line-height:1.65;white-space:nowrap;overflow-x:auto;">
            <div style="color:#ef4444;font-weight:700;margin-bottom:6px;">GIẢI MÃ CẤU TRÚC KHỐI XUNG ĐỘT (MERGE CONFLICT MARKERS):</div>
            <div><span style="color:#ef4444;font-weight:700;">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</span> <span style="color:#94a3b8;">(Code hiện tại trên nhánh đang đứng, vd: main)</span></div>
            <div style="color:#86efac;padding-left:14px;">def chuan_hoa(s):</div>
            <div style="color:#86efac;padding-left:28px;">return s.strip().lower()     # Bản sửa của bạn</div>
            <div><span style="color:#fbbf24;font-weight:700;">=======</span> <span style="color:#94a3b8;">(Vạch phân cách chính giữa hai bên)</span></div>
            <div style="color:#93c5fd;padding-left:14px;">def chuan_hoa(s):</div>
            <div style="color:#93c5fd;padding-left:28px;">return s.strip().casefold()  # Bản sửa từ nhánh đồng đội</div>
            <div><span style="color:#60a5fa;font-weight:700;">&gt;&gt;&gt;&gt;&gt;&gt;&gt; feat/chuan-hoa-unicode</span> <span style="color:#94a3b8;">(Kết thúc: Tên nhánh gộp vào)</span></div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Tại sao xung đột xảy ra và cách Git cảnh báo',
          content: `
            <p>Xung đột gộp nhánh (Merge Conflict) chỉ xảy ra khi và chỉ khi:</p>
            <ul>
              <li>Hai nhánh cùng chỉnh sửa <strong>cùng một dòng (hoặc các dòng liền kề)</strong> trong cùng một tệp kể từ thời điểm rẽ nhánh chung.</li>
              <li>Hoặc một nhánh sửa tệp trong khi nhánh kia lại xóa tệp đó.</li>
            </ul>
            <p>Khi gặp xung đột, Git sẽ tạm dừng tiến trình gộp, thông báo <code>CONFLICT (content): Merge conflict in &lt;tệp&gt;</code> và thêm trạng thái <code>(main|MERGING)</code> trên dấu nhắc dòng lệnh.</p>
          `,
          codeExamples: [
            {
              title: 'Cố ý tạo ra và quan sát thông báo Merge Conflict',
              lang: 'Bash',
              code: `# Nhánh main sửa dòng 1
git switch main
echo 'PI = 3.14' > hang_so.py
git commit -am "Dat PI = 3.14 tren main"

# Nhánh tinh-toan-chinh-xac sửa cùng dòng 1 theo cách khác
git switch -c tinh-toan-chinh-xac
echo 'PI = 3.1415926535' > hang_so.py
git commit -am "Dat PI voi do chinh xac cao hon"

# Quay lại main và gộp nhánh
git switch main
git merge tinh-toan-chinh-xac`,
              output: `Auto-merging hang_so.py
CONFLICT (content): Merge conflict in hang_so.py
Automatic merge failed; fix conflicts and then commit the result.`,
              annotations: [
                { line: 15, text: 'Git dừng lại và yêu cầu bạn giải quyết xung đột thủ công trước khi commit tiếp.' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Quy trình 4 bước giải quyết xung đột chuẩn mực & Lệnh thoát hiểm',
          content: `
            <p>Quy trình 4 bước xử lý chuyên nghiệp:</p>
            <ol>
              <li><strong>Bước 1 (Xác định tệp lỗi):</strong> Gõ <code>git status</code> để xem danh sách các tệp nằm trong mục <em>Unmerged paths</em>.</li>
              <li><strong>Bước 2 (Mở tệp và chọn lọc):</strong> Mở tệp Python bị lỗi trong VS Code hoặc editor. Chọn giữ lại bản của bạn, bản của đồng đội hoặc kết hợp logic cả hai. <strong>Bắt buộc phải xóa sạch toàn bộ các dòng đánh dấu <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code></strong>.</li>
              <li><strong>Bước 3 (Kiểm thử):</strong> Chạy lại lệnh test (ví dụ <code>python hang_so.py</code> hoặc <code>pytest</code>) để bảo đảm code Python không bị lỗi cú pháp <code>SyntaxError</code>.</li>
              <li><strong>Bước 4 (Hoàn tất):</strong> Gõ <code>git add hang_so.py</code> rồi <code>git commit</code> (không cần gõ <code>-m</code>, Git sẽ tự điền sẵn thông điệp merge tiêu chuẩn).</li>
            </ol>
            <p><strong>Cứu cánh khẩn cấp:</strong> Nếu bạn đang sửa dở mà thấy quá rối hoặc chưa muốn gộp lúc này, chỉ cần gõ <code>git merge --abort</code>. Git sẽ đưa toàn bộ dự án quay trở về đúng trạng thái nguyên vẹn trước khi gõ lệnh merge!</p>
          `,
          codeExamples: [
            {
              title: 'Quy trình giải quyết xung đột và hoàn tất commit gộp',
              lang: 'Bash',
              code: `# Xem nội dung tệp đang bị conflict
cat hang_so.py

# Sau khi thảo luận, ta quyết định dùng giá trị chính xác hơn:
echo 'PI = 3.1415926535  # Chot phien ban chinh xac' > hang_so.py

# Đánh dấu đã giải quyết xong bằng git add
git add hang_so.py

# Kiểm tra trạng thái: tệp đã chuyển sang All conflicts fixed but you are still merging
git status

# Hoàn tất commit gộp
git commit -m "Giai quyet xung dot: Thong nhat dung PI do chinh xac cao"`,
              output: `[main 1a2b3c4] Giai quyet xung dot: Thong nhat dung PI do chinh xac cao`,
              annotations: [
                { line: 8, text: 'git add báo cho Git biết bạn đã xử lý xong xung đột trong tệp này.' },
                { line: 14, text: 'Commit này là một Merge Commit chính thức kết thúc trạng thái MERGING.' }
              ]
            },
            {
              title: 'Lệnh thoát hiểm an toàn khi không muốn gộp nữa',
              lang: 'Bash',
              code: `# Hủy bỏ tiến trình gộp, quay lại trạng thái sạch ban đầu
git merge --abort`,
              output: `(Dự án lập tức quay về trạng thái trước khi merge, tệp không bị dính vạch phấn conflict)`,
              annotations: [
                { line: 2, text: 'Lệnh an toàn tuyệt đối, không làm mất bất kỳ commit nào của cả 2 nhánh.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Để sót ký tự đánh dấu <<<<<<< trong code Python',
            content: 'Nếu bạn quên không xóa các dòng `<<<<<<< HEAD` hay `=======`, khi chạy code Python sẽ văng lỗi `SyntaxError: invalid syntax` ngay lập tức. Luôn tìm kiếm toàn bộ dự án với từ khóa `<<<<<<<` trước khi commit.'
          }
        ],
        tips: [
          {
            title: 'Sử dụng công cụ giải quyết xung đột trực quan của VS Code',
            content: 'Khi mở tệp bị xung đột trong Visual Studio Code, ngay trên khối conflict sẽ có 4 nút bấm tiện lợi: "Accept Current Change", "Accept Incoming Change", "Accept Both Changes", "Compare Changes". Bấm một nút là VS Code tự xóa sạch các vạch phân cách cho bạn.'
          }
        ]
      },
      exercises: [
        {
          level: 'Vừa',
          title: 'Tạo xung đột và thoát hiểm bằng --abort',
          problem: 'Tạo một tình huống xung đột trên tệp `config.py`. Khi thấy trạng thái MERGING xuất hiện, hãy kiểm tra `git status`, sau đó dùng lệnh thoát hiểm `git merge --abort` và kiểm tra lại trạng thái.',
          hint: 'Dùng git merge --abort để hủy tiến trình gộp.',
          solutionCode: `git merge --abort
git status`,
          solutionOutput: `On branch main
nothing to commit, working tree clean`,
          explanation: 'git merge --abort là phao cứu sinh quan trọng nhất giúp lập trình viên không bao giờ hoảng sợ khi gặp conflict.',
          annotations: [
            { line: 1, text: 'Lập tức rút lui an toàn.' }
          ]
        }
      ],
      summary: [
        'Xung đột xảy ra khi hai người cùng sửa 1 dòng; Git dừng lại để con người quyết định.',
        'Quy trình 4 bước: xem status -> sửa code & xóa sạch vạch phấn -> git add -> git commit.',
        'Khi bối rối: luôn có `git merge --abort` để quay về điểm xuất phát an toàn 100%.'
      ]
    },
    {
      id: 'gh-2-03',
      number: '2.3',
      title: 'Fork, Đóng góp dự án người khác & Quản lý với Issues, Labels, Milestones, Projects',
      subtitle: 'Quy trình Fork & Upstream cho mã nguồn mở, cùng bộ công cụ quản lý công việc toàn diện trên GitHub',
      level: 'Trung cấp',
      duration: '40 phút',
      objectives: [
        'Phân biệt rõ ràng giữa `git clone` (trực tiếp) và `Fork` (nhân bản kho sang tài khoản cá nhân).',
        'Thiết lập remote `upstream` để liên tục đồng bộ mã nguồn mới nhất từ dự án gốc.',
        'Quản lý yêu cầu & lỗi phần mềm bằng **GitHub Issues** và phân loại qua **Labels**.',
        'Theo dõi tiến độ phát hành qua **Milestones** và tổ chức bảng Kanban với **GitHub Projects**.',
        'Sử dụng các từ khóa liên kết tự động đóng Issue khi gộp PR (ví dụ `Closes #12`).'
      ],
      intuition: {
        title: 'Bản sao nhượng quyền và Bảng phân việc của ban quản trị',
        metaphor: 'Bạn không thể tự tiện bước vào bếp của nhà hàng nổi tiếng thế giới để nêm thêm muối vào nồi súp của bếp trưởng. Cơ chế Fork giống như việc bạn mở một chi nhánh nhượng quyền mang tên bạn: bạn sở hữu 100% quyền quản trị trên chi nhánh đó, tự do thử nghiệm công thức nêm nếm mới. Sau khi nấu xong món súp ngon tuyệt, bạn gửi một bát mẫu tới bếp trưởng gốc (Pull Request). Nếu bếp trưởng thấy ngon, họ sẽ đưa công thức đó vào thực đơn chính của toàn cầu. Còn Issues, Labels và Projects giống như tấm bảng Kanban phân chia nhiệm vụ trong văn phòng: mỗi công việc là một tấm thẻ, được dán nhãn màu "Lỗi", "Tính năng mới", gắn người chịu trách nhiệm và kéo thả từ cột "Đang làm" sang "Đã xong".',
        visualHtml: `
          <div style="display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
            <div style="font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--accent-text);text-align:center;">MÔ HÌNH FORK &amp; ĐỒNG BỘ 2 CHIỀU (UPSTREAM vs ORIGIN)</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 240px), 1fr));gap:12px;">
              <div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
                <div style="font-family:var(--font-mono);font-size:0.85rem;font-weight:700;color:var(--accent-primary);">1. Kho gốc (Upstream Remote)</div>
                <div style="font-size:0.83rem;line-height:1.55;color:var(--text-secondary);margin-top:4px;"><code>github.com/psf/requests.git</code> — Bạn không có quyền push trực tiếp; chỉ <code>fetch</code> cập nhật về máy.</div>
              </div>
              <div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
                <div style="font-family:var(--font-mono);font-size:0.85rem;font-weight:700;color:var(--success);">2. Kho Fork của bạn (Origin Remote)</div>
                <div style="font-size:0.83rem;line-height:1.55;color:var(--text-secondary);margin-top:4px;"><code>github.com/ban/requests.git</code> — Bạn có toàn quyền <code>push</code>; dùng để mở PR sang kho gốc.</div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Quy trình Fork và Cấu hình đồng bộ remote Upstream',
          content: `
            <p>Khi đóng góp cho dự án mã nguồn mở (Open Source) hoặc các dự án công ty phân quyền chặt chẽ:</p>
            <ol>
              <li>Bấm nút <strong>Fork</strong> trên góc phải trang GitHub của dự án gốc.</li>
              <li>Clone kho Fork trên tài khoản của bạn về máy (kho này tự động là <code>origin</code>).</li>
              <li>Thêm một liên kết remote thứ hai tên là <code>upstream</code> trỏ về dự án gốc để kéo code mới nhất về khi đồng nghiệp cập nhật.</li>
            </ol>
          `,
          codeExamples: [
            {
              title: 'Cấu hình và đồng bộ upstream cho kho Fork',
              lang: 'Bash',
              code: `# 1. Clone kho Fork của bạn về máy
git clone git@github.com:<TEN_BAN>/thu-vien-python.git
cd thu-vien-python

# 2. Thêm remote upstream trỏ về tác giả gốc
git remote add upstream git@github.com:<TAC_GIA_GOC>/thu-vien-python.git

# 3. Kiểm tra danh sách: bạn có cả origin (của bạn) và upstream (gốc)
git remote -v

# 4. Cách đồng bộ code mới nhất từ kho gốc về nhánh main trên máy
git switch main
git fetch upstream
git merge upstream/main
git push origin main`,
              output: `origin    git@github.com:<TEN_BAN>/thu-vien-python.git (fetch)
origin    git@github.com:<TEN_BAN>/thu-vien-python.git (push)
upstream  git@github.com:<TAC_GIA_GOC>/thu-vien-python.git (fetch)
upstream  git@github.com:<TAC_GIA_GOC>/thu-vien-python.git (push)
Updating 1a2b3c..9d8e7f
Fast-forward`,
              annotations: [
                { line: 6, text: 'upstream là quy ước quốc tế cho kho tác giả gốc.' },
                { line: 14, text: 'Kéo commit mới từ upstream/main về main của bạn rồi đẩy lên origin cá nhân.' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Quản lý công việc: Issues, Labels, Milestones và GitHub Projects',
          content: `
            <p>GitHub cung cấp một hệ sinh thái quản lý công việc (Project Management) cực kỳ mạnh mẽ tích hợp sẵn trong kho:</p>
            <ul>
              <li><strong>GitHub Issues:</strong> Nơi báo cáo lỗi (Bug report), yêu cầu tính năng mới (Feature request) hoặc thảo luận kiến trúc. Mỗi Issue có một số thứ tự duy nhất như <code>#42</code>.</li>
              <li><strong>Labels:</strong> Nhãn dán phân loại trực quan (ví dụ: <code>bug</code> - màu đỏ, <code>enhancement</code> - màu xanh dương, <code>good first issue</code> - màu tím dành cho người mới).</li>
              <li><strong>Milestones:</strong> Cột mốc phát hành (ví dụ: "Phiên bản 1.0.0 - Hạn chót 30/11"), giúp gom các Issue và PR cần hoàn thành trước khi ra mắt sản phẩm.</li>
              <li><strong>GitHub Projects:</strong> Bảng Kanban trực quan (các cột: Todo, In Progress, Done) tự động di chuyển thẻ khi trạng thái PR thay đổi.</li>
            </ul>
            <p><strong>Mẹo liên kết thần kỳ:</strong> Trong phần mô tả của PR hoặc thông điệp commit, nếu bạn viết <code>Closes #42</code> hoặc <code>Fixes #42</code>, khi PR được gộp vào <code>main</code>, GitHub sẽ <strong>tự động đóng Issue #42 đó ngay lập tức</strong> mà bạn không cần vào bấm chuột thủ công!</p>
          `,
          codeExamples: [
            {
              title: 'Cú pháp thông điệp commit hoặc mô tả PR tự động đóng Issue',
              lang: 'Bash',
              code: `# Commit chứa từ khóa tự động đóng Issue số 15
git commit -m "Sua loi chia cho 0 trong ham tinh_ty_le (Closes #15)"

# Các từ khóa được GitHub hỗ trợ tự động đóng:
# - close, closes, closed
# - fix, fixes, fixed
# - resolve, resolves, resolved`,
              output: `[feat/fix-zero 4a5b6c7] Sua loi chia cho 0 trong ham tinh_ty_le (Closes #15)
 1 file changed, 3 insertions(+)`,
              annotations: [
                { line: 2, text: 'Khi commit này được merge vào nhánh chính qua PR, Issue #15 sẽ tự động đóng kèm link tới commit này.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Mở PR từ nhánh main của kho Fork',
            content: 'Không bao giờ dùng nhánh `main` trên kho Fork để mở PR sang kho gốc. Nếu bạn mở PR từ `main`, bạn sẽ không thể mở tiếp PR thứ hai cho tính năng khác. Luôn tạo nhánh riêng `feat/ten-tinh-nang` trên kho Fork để mở PR.'
          }
        ],
        tips: [
          {
            title: 'Tìm việc làm mã nguồn mở với nhãn "good first issue"',
            content: 'Trên thanh tìm kiếm GitHub, gõ `label:"good first issue" language:python` để tìm hàng ngàn bài toán nhỏ được các dự án Python lớn dành riêng cho người mới bắt đầu làm quen đóng góp.'
          }
        ]
      },
      exercises: [
        {
          level: 'Dễ',
          title: 'Thực hành cú pháp liên kết Issue',
          problem: 'Giả sử dự án của bạn có Issue #8 mang tên "Thiếu hàm tính lũy thừa". Hãy viết câu lệnh commit cho tệp `math_tools.py` bổ sung hàm `luy_thua(a, b)` sao cho tự động giải quyết dứt điểm Issue #8 khi được gộp.',
          hint: 'Dùng từ khóa Fixes #8 hoặc Closes #8 trong thông điệp commit.',
          solutionCode: `git commit -m "Them ham luy_thua su dung toan tu ** (Fixes #8)"`,
          solutionOutput: `[main c1d2e3] Them ham luy_thua su dung toan tu ** (Fixes #8)`,
          explanation: 'GitHub sẽ tự động liên kết commit với Issue #8 và ghi nhật ký đóng Issue ngay khi PR chứa commit này được duyệt.',
          annotations: [
            { line: 1, text: 'Cú pháp chuẩn mực của kỹ sư GitHub chuyên nghiệp.' }
          ]
        }
      ],
      summary: [
        'Fork là nhân bản kho sang tài khoản cá nhân; upstream là liên kết trỏ về kho tác giả gốc.',
        'Issues và Labels giúp theo dõi lỗi và đầu việc; Projects cung cấp bảng Kanban trực quan.',
        'Sử dụng `Closes #<số>` trong PR để GitHub tự động đóng Issue khi gộp mã.'
      ]
    },
    {
      id: 'gh-2-04',
      number: '2.4',
      title: 'Cất tạm thay đổi (`git stash`) và Đánh dấu phiên bản (`tag` & GitHub Releases)',
      subtitle: 'Xử lý tình huống khẩn cấp đang code dở và đóng dấu mốc phiên bản phát hành phần mềm',
      level: 'Trung cấp',
      duration: '35 phút',
      objectives: [
        'Sử dụng `git stash` để cất an toàn các thay đổi dở dang khi cần chuyển nhánh gấp.',
        'Khôi phục lại thay đổi với `git stash pop` và `git stash apply`.',
        'Phân biệt Lightweight Tag và Annotated Tag trong quản lý mốc phiên bản (Semantic Versioning).',
        'Đẩy tag lên GitHub và tạo bản phát hành **GitHub Releases** đính kèm tệp nhị phân/changelog.'
      ],
      intuition: {
        title: 'Chiếc ngăn kéo giấu đồ tạm và Tấm huy chương chứng nhận',
        metaphor: 'Bạn đang dở tay tháo rời các linh kiện động cơ Python trên bàn làm việc thì khách hàng gọi điện báo có đám cháy ở phòng bên cạnh cần bạn sang dập lửa ngay lập tức. Bạn không thể commit đống linh kiện dở dang này vì code sẽ lỗi, cũng không thể bỏ mặc nó trên bàn vì không thể chuyển nhánh (`switch`). Lệnh `git stash` giống như một chiếc ngăn kéo ma thuật: bạn quét toàn bộ đống linh kiện dở dang cất gọn vào ngăn kéo, bàn làm việc lập tức sạch bóng như mới. Bạn thoải mái chuyển nhánh dập lửa xong xuôi, quay lại bàn và gõ `git stash pop` để lôi đống đồ ra lắp tiếp. Còn `git tag` giống như tấm huy chương vàng đóng dấu: "Tại thời điểm này, động cơ đạt chuẩn Version 1.0.0!".',
        visualHtml: `
          <div style="display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
            <div style="font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--accent-text);text-align:center;">QUY TRÌNH SỬ DỤNG GIT STASH KHI CÓ VIỆC GẤP</div>
            <div style="padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;font-size:0.85rem;line-height:1.75;white-space:nowrap;overflow-x:auto;">
              <div><strong>1.</strong> Đang sửa dở <code>main.py</code> → Cần chuyển nhánh xử lý <code>hotfix</code> khẩn cấp</div>
              <div style="color:var(--accent-primary);font-weight:600;"><strong>2.</strong> Cất tạm vào ngăn kéo: <code>git stash push -m "Dang viet do ham parse"</code></div>
              <div><strong>3.</strong> Working Tree sạch sẽ → Chuyển nhánh <code>git switch main</code> để sửa lỗi</div>
              <div style="color:var(--success);font-weight:600;"><strong>4.</strong> Quay lại nhánh cũ và khôi phục code dở: <code>git stash pop</code></div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Làm chủ các thao tác với ngăn kéo tạm Git Stash',
          content: `
            <p>Mặc định, <code>git stash</code> chỉ cất các tệp đã được Git theo dõi (Tracked files). Nếu bạn có tệp mới tinh vừa tạo chưa <code>git add</code>, hãy dùng cờ <code>-u</code> (hoặc <code>--include-untracked</code>) để cất cả tệp mới.</p>
            <p>Phân biệt <code>pop</code> và <code>apply</code>:</p>
            <ul>
              <li><code>git stash pop</code>: Lấy thay đổi ra áp dụng lại vào code VÀ <strong>xóa luôn</strong> bản lưu đó khỏi ngăn kéo.</li>
              <li><code>git stash apply</code>: Lấy thay đổi ra áp dụng nhưng <strong>vẫn giữ lại</strong> bản sao lưu trong ngăn kéo (hữu ích khi muốn thử áp dụng cùng một thay đổi lên nhiều nhánh).</li>
            </ul>
          `,
          codeExamples: [
            {
              title: 'Cất và khôi phục thay đổi với ghi chú rõ ràng',
              lang: 'Bash',
              code: `# Cất toàn bộ thay đổi dở dang (kèm cả tệp untracked mới) có đặt tên ghi nhớ
git stash push -u -m "Dang viet do tinh nang dem ky tu tieng Viet"

# Xem danh sách các lần stash đang lưu trong ngăn kéo
git stash list

# Lấy lại lần cất gần nhất và xóa khỏi stash stack
git stash pop

# Xóa một bản stash cụ thể nếu không cần nữa
git stash drop stash@{0}

# Xóa sạch toàn bộ ngăn kéo
git stash clear`,
              output: `Saved working directory and index state On feat/unicode: Dang viet do tinh nang dem ky tu tieng Viet
stash@{0}: On feat/unicode: Dang viet do tinh nang dem ky tu tieng Viet
Dropped stash@{0} (a1b2c3d4e5f6...)`,
              annotations: [
                { line: 2, text: 'Luôn dùng cờ -m để đặt tên mô tả cho stash, tránh bị quên sau vài ngày.' },
                { line: 5, text: 'stash list đánh số thứ tự từ stash@{0} (mới nhất) trở đi.' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Đánh số phiên bản với Git Tag và Tạo GitHub Release',
          content: `
            <p>Trong kỹ thuật phần mềm, các phiên bản được đánh số theo chuẩn <strong>Semantic Versioning (SemVer)</strong> dạng <code>vMAJOR.MINOR.PATCH</code> (ví dụ: <code>v1.2.0</code>):</p>
            <ul>
              <li><code>MAJOR</code>: Thay đổi lớn, có thể làm hỏng tính tương thích ngược (Breaking changes).</li>
              <li><code>MINOR</code>: Thêm tính năng mới nhưng vẫn tương thích ngược với code cũ.</li>
              <li><code>PATCH</code>: Bản vá lỗi nhỏ, không đổi cấu trúc hàm.</li>
            </ul>
            <p>Luôn ưu tiên tạo <strong>Annotated Tag</strong> (thẻ có chú thích, cờ <code>-a</code>) vì nó lưu lại tên người tạo, ngày giờ và thông điệp phát hành được ký xác thực.</p>
          `,
          codeExamples: [
            {
              title: 'Tạo Annotated Tag và đẩy lên máy chủ GitHub',
              lang: 'Bash',
              code: `# Tạo thẻ phiên bản v1.0.0 có chú thích
git tag -a v1.0.0 -m "Phat hanh phien ban 1.0.0 - Hoan tat module xu ly chuoi"

# Xem chi tiết thông tin của tag
git show v1.0.0

# Lưu ý quan trọng: git push mặc định KHÔNG đẩy tag lên!
# Phải chỉ định rõ tên tag khi push:
git push origin v1.0.0

# Hoặc đẩy toàn bộ các tag chưa push:
git push origin --tags`,
              output: `tag v1.0.0
Tagger: Nguyen Van A <nguyenvana@example.com>
Date:   Wed Oct 28 10:00:00 2026 +0700

Phat hanh phien ban 1.0.0 - Hoan tat module xu ly chuoi
To github.com:user/du-an-python.git
 * [new tag]         v1.0.0 -> v1.0.0`,
              annotations: [
                { line: 2, text: 'Cờ -a tạo Annotated Tag kèm thông điệp đầy đủ.' },
                { line: 9, text: 'Nhớ rõ quy tắc: git push bình thường không đẩy tag; phải dùng git push origin <tag>.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Quên mất các tệp mới tạo khi dùng lệnh git stash trần trụi',
            content: 'Nếu bạn vừa tạo tệp mới `ham_moi.py` mà chưa từng `git add`, khi bạn gõ `git stash` trần trụi, tệp đó sẽ BỊ BỎ LẠI trên thư mục làm việc thay vì được cất đi. Luôn nhớ thêm cờ `-u`: `git stash -u`.'
          }
        ],
        tips: [
          {
            title: 'Tạo GitHub Release chuyên nghiệp đính kèm Changelog',
            content: 'Sau khi đẩy tag lên GitHub, truy cập mục Releases > "Draft a new release", chọn tag `v1.0.0`, bấm nút "Generate release notes" để GitHub tự động liệt kê tất cả các Pull Request và tác giả đóng góp trong phiên bản này.'
          }
        ]
      },
      exercises: [
        {
          level: 'Vừa',
          title: 'Thực hành Stash và Tag',
          problem: 'Sửa tệp `main.py`, dùng `git stash push -u -m "Tam hoan"` để cất đi, xác nhận thư mục làm việc sạch sẽ, sau đó khôi phục lại bằng `git stash pop`. Cuối cùng, tạo một Annotated Tag tên là `v0.1.0` cho commit hiện tại.',
          hint: 'Dùng git stash push -u -m, git status, git stash pop, git tag -a v0.1.0 -m.',
          solutionCode: `echo "# Code dang viet do" >> main.py
git stash push -u -m "Tam hoan"
git status
git stash pop
git tag -a v0.1.0 -m "Bao ve phien ban thu nghiem 0.1.0"
git tag`,
          solutionOutput: `Saved working directory...
nothing to commit, working tree clean
On branch main... Changes not staged for commit
v0.1.0`,
          explanation: 'Mọi thay đổi dở dang được bảo toàn hoàn hảo, và mốc phiên bản v0.1.0 đã được đánh dấu vào lịch sử.',
          annotations: [
            { line: 2, text: 'Cất an toàn vào ngăn kéo.' },
            { line: 4, text: 'Lấy lại code nguyên vẹn.' }
          ]
        }
      ],
      summary: [
        'git stash push -u -m "..." cất an toàn thay đổi dở dang để chuyển nhánh gấp.',
        'git stash pop lấy lại thay đổi và xóa khỏi ngăn kéo; git stash apply lấy ra nhưng giữ lại bản sao.',
        'Semantic Versioning đánh số vMAJOR.MINOR.PATCH; đẩy tag lên mạng bằng `git push origin <tag>`.'
      ]
    },
    {
      id: 'gh-2-05',
      number: '2.5',
      title: 'Đặt lên bàn cân: `git rebase` và `git merge`',
      subtitle: 'Hiểu cặn kẽ bản chất viết lại lịch sử commit và Quy tắc vàng bất khả xâm phạm của Rebase',
      level: 'Trung cấp',
      duration: '40 phút',
      objectives: [
        'Hiểu bản chất toán học: Merge kết hợp 2 nhánh bằng 1 commit gộp (3-way merge); Rebase di chuyển gốc của nhánh và phát lại từng commit.',
        'So sánh ưu điểm và nhược điểm của hai trường phái: Lịch sử bảo toàn ngữ cảnh vs Lịch sử thẳng tắp.',
        'Thực hiện quy trình rebase nhánh tính năng trên `main` mới nhất kèm cách xử lý xung đột.',
        'Nắm vững **Quy tắc vàng của Rebase**: Tuyệt đối không bao giờ rebase trên các nhánh công khai đã đẩy lên remote.'
      ],
      intuition: {
        title: 'Nút thắt nối hai sợi chỉ và Cắt cành ghép sang gốc mới',
        metaphor: 'Hãy tưởng tượng bạn rẽ nhánh ra viết code từ thứ Hai. Đến thứ Năm, nhánh `main` đã có thêm 3 commit mới của đồng đội. Cách của `merge` giống như việc bạn lấy một sợi dây buộc nối ngọn nhánh của bạn vào ngọn nhánh `main`: lịch sử rẽ nhánh được giữ nguyên, tạo thành một nút thắt (Merge commit) kết nối hai luồng thời gian. Còn cách của `rebase` giống như việc bạn nhổ toàn bộ các cành nhánh bạn đã vẽ từ thứ Hai, cưa gốc của nó rồi đem ghép cắm lên ngọn mới nhất của ngày thứ Năm. Lịch sử trông như thể bạn vừa mới bắt đầu viết code từ sáng hôm nay trên một đường thẳng tắp không tì vết!',
        visualHtml: `
          <div style="display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
            <div style="font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--accent-text);text-align:center;">SO SÁNH BẢN CHẤT: MERGE vs REBASE</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 245px), 1fr));gap:12px;">
              <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
                <div style="font-family:var(--font-mono);font-size:0.84rem;font-weight:700;color:var(--accent-primary);">1. KẾT QUẢ KHI MERGE</div>
                <div style="font-family:var(--font-mono);font-size:0.76rem;line-height:1.55;padding:8px 10px;margin:8px 0;background:var(--bg-code);color:#e2e8f0;border-radius:6px;white-space:nowrap;overflow-x:auto;">
                  <div>main: C1 ── C2 ───── C4 (Merge)</div>
                  <div style="color:#93c5fd;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── C3 ──┘</div>
                </div>
                <div style="font-size:0.81rem;line-height:1.5;color:var(--success-text);"><strong>Ưu điểm:</strong> Bảo toàn 100% lịch sử thời gian thực, không đổi hash commit cũ.</div>
              </div>
              <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
                <div style="font-family:var(--font-mono);font-size:0.84rem;font-weight:700;color:var(--warning-text);">2. KẾT QUẢ KHI REBASE</div>
                <div style="font-family:var(--font-mono);font-size:0.76rem;line-height:1.55;padding:8px 10px;margin:8px 0;background:var(--bg-code);color:#e2e8f0;border-radius:6px;white-space:nowrap;overflow-x:auto;">
                  <div>main: C1 ── C2 ── <span style="color:#fbbf24;">C3' (Hash mới)</span></div>
                  <div style="color:#94a3b8;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Lịch sử thẳng tắp 1 hàng)</div>
                </div>
                <div style="font-size:0.81rem;line-height:1.5;color:var(--accent-text);"><strong>Ưu điểm:</strong> Nhánh thẳng mượt không commit thừa, xem <code>git log</code> rất gọn.</div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Quy trình thực hiện Git Rebase trên nhánh tính năng cá nhân',
          content: `
            <p>Tình huống điển hình: Bạn đang làm nhánh <code>feat/t-string</code>. Nhánh <code>main</code> trên GitHub vừa có thêm commit mới của đồng đội. Để nhánh của bạn chạy trên nền tảng code mới nhất trước khi mở PR:</p>
            <ol>
              <li>Đứng tại nhánh tính năng của bạn: <code>git switch feat/t-string</code>.</li>
              <li>Chạy lệnh: <code>git rebase main</code>.</li>
              <li>Git sẽ tạm thời cất các commit của bạn đi, kéo nhánh tính năng tiến về cùng điểm với <code>main</code>, rồi lần lượt áp dụng lại (replay) từng commit của bạn lên trên đỉnh.</li>
            </ol>
            <p>Nếu gặp xung đột trong lúc rebase, Git sẽ dừng lại ở đúng commit đó. Bạn sửa xung đột, gõ <code>git add &lt;tệp&gt;</code> rồi gõ <code>git rebase --continue</code> (<strong>tuyệt đối không gõ git commit</strong> khi đang rebase!).</p>
          `,
          codeExamples: [
            {
              title: 'Cập nhật nhánh tính năng bằng rebase trên main mới nhất',
              lang: 'Bash',
              code: `# 1. Cập nhật nhánh main cục bộ mới nhất
git switch main
git pull origin main

# 2. Chuyển sang nhánh tính năng và tiến hành rebase
git switch feat/t-string
git rebase main

# Nếu có xung đột, sửa tệp xong thì gõ:
# git add <tệp-đã-sửa>
# git rebase --continue

# Nếu muốn bỏ cuộc giữa chừng, quay lại trạng thái cũ:
# git rebase --abort`,
              output: `Successfully rebased and updated refs/heads/feat/t-string.`,
              annotations: [
                { line: 7, text: 'Gốc của nhánh feat/t-string giờ đây đã được dời lên commit mới nhất của main.' },
                { line: 11, text: 'git rebase --continue tiếp tục áp dụng các commit kế tiếp sau khi đã giải quyết conflict.' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Quy tắc vàng của Rebase (The Golden Rule of Rebase)',
          content: `
            <p><strong>QUY TẮC BẤT KHẢ XÂM PHẠM:</strong> <em>Tuyệt đối không bao giờ rebase các commit đã được đẩy lên một nhánh công khai dùng chung (như <code>main</code>, <code>develop</code> hay nhánh có nhiều người cùng kéo về)!</em></p>
            <p><strong>Lý do:</strong> Rebase làm thay đổi mã băm (SHA hash) của tất cả commit được dời gốc. Khi bạn đổi hash của các commit mà đồng nghiệp đã kéo về máy họ, lịch sử của bạn và đồng nghiệp sẽ bị rẽ đôi, gây ra một thảm họa xung đột dây chuyền (conflict loop) cực kỳ khó gỡ cho toàn đội ngũ.</p>
            <p><strong>Tóm tắt nguyên tắc vàng:</strong> Chỉ rebase trên các nhánh tính năng <em>cá nhân</em> của bạn trên máy mình trước khi chia sẻ cho người khác.</p>
          `,
          codeExamples: []
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Lỗi rebase nhánh main lên nhánh cá nhân',
            content: 'Tuyệt đối không đứng ở nhánh `main` rồi gõ `git rebase feat/xyz`. Điều đó sẽ làm đảo lộn toàn bộ lịch sử của nhánh chính! Luôn nhớ: Đứng ở nhánh cá nhân để rebase code từ `main` vào.'
          }
        ],
        tips: [
          {
            title: 'So sánh ngắn gọn để lựa chọn',
            content: 'Dùng Rebase khi bạn muốn dọn dẹp lịch sử nhánh cá nhân cho thẳng và đẹp trước khi nộp PR. Dùng Merge khi bạn tích hợp các nhánh hoàn chỉnh vào main để bảo toàn trung thực lịch sử phát triển.'
          }
        ]
      },
      exercises: [
        {
          level: 'Khó',
          title: 'Thực hành Rebase an toàn trên nhánh thử nghiệm',
          problem: 'Tạo nhánh `feat/thu-rebase`, commit 1 tệp mới. Quay lại `main`, commit 1 tệp khác. Sau đó chuyển sang `feat/thu-rebase` và thực hiện `git rebase main`. Dùng `git log --oneline --graph` để xác nhận lịch sử đã trở thành một đường thẳng tắp.',
          hint: 'Dùng git rebase main khi đang đứng ở feat/thu-rebase.',
          solutionCode: `git switch -c feat/thu-rebase
echo "feature" > f.txt && git add f.txt && git commit -m "Commit tren feat"
git switch main
echo "main update" > m.txt && git add m.txt && git commit -m "Commit tren main"
git switch feat/thu-rebase
git rebase main
git log --oneline --graph`,
          solutionOutput: `* e1f2a3b (HEAD -> feat/thu-rebase) Commit tren feat
* 9a8b7c6 (main) Commit tren main
* ...`,
          explanation: 'Commit trên feat giờ đây nằm ngay phía trên commit của main theo một đường thẳng tắp, không có nhánh rẽ nào xuất hiện trong đồ thị graph.',
          annotations: [
            { line: 6, text: 'Thực hiện dời gốc tuyến tính.' },
            { line: 7, text: 'Kiểm tra đồ thị thẳng tắp.' }
          ]
        }
      ],
      summary: [
        'Merge bảo tồn nguyên vẹn ngữ cảnh rẽ nhánh; Rebase viết lại lịch sử thành một đường thẳng tuyến tính.',
        'Đang rebase gặp conflict: sửa tệp -> git add -> git rebase --continue (không commit).',
        'Quy tắc vàng: Tuyệt đối không bao giờ rebase các commit đã đẩy lên nhánh công khai dùng chung.'
      ]
    },
    {
      id: 'gh-2-06',
      number: '2.6',
      title: 'Viết Markdown tốt, Giấy phép `LICENSE`, GitHub Pages và Mẫu thư mục `.github/`',
      subtitle: 'Chuẩn hóa kho mã chuyên nghiệp chuẩn mực quốc tế từ tài liệu đến cấu hình cộng tác',
      level: 'Trung cấp',
      duration: '35 phút',
      objectives: [
        'Làm chủ cú pháp GitHub Flavored Markdown (GFM): bảng, task list, tô màu cú pháp, hộp cảnh báo `[!NOTE]`, `[!WARNING]`.',
        'Hiểu tầm quan trọng pháp lý của tệp `LICENSE` và phân biệt ngắn gọn `MIT`, `Apache-2.0`, `GPL-3.0`.',
        'Xuất bản trang web tài liệu tĩnh miễn phí trực tiếp từ kho mã bằng **GitHub Pages**.',
        'Chuẩn hóa thư mục `.github/` với Issue Templates và Pull Request Template.'
      ],
      intuition: {
        title: 'Bảng nội quy, Giấy phép bản quyền và Cổng đón tiếp dự án',
        metaphor: 'Một kho mã không có README và LICENSE giống như một món đồ bỏ hoang ngoài lề đường: người đi qua không biết nó dùng để làm gì và không dám nhặt về dùng vì sợ vi phạm pháp luật bản quyền. Việc thêm `LICENSE` giống như gắn tấm giấy môn bài công nhận quyền sử dụng; viết Markdown tốt giống như cuốn cẩm nang sử dụng in màu bóng bẩy; GitHub Pages biến kho mã thành một showroom trưng bày lộng lẫy trên Internet; còn thư mục `.github/` với các mẫu form sẵn giống như bàn lễ tân phát sẵn mẫu đơn có sẵn các ô cần điền cho khách đến giao dịch, không để ai gửi đơn lộn xộn.',
        visualHtml: `
          <div style="display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.81rem;">
            <div style="font-weight:700;color:var(--accent-text);text-align:center;">CẤU TRÚC THƯ MỤC CHUẨN MỰC CỦA DỰ ÁN GITHUB QUỐC TẾ</div>
            <div style="padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;line-height:1.65;white-space:nowrap;overflow-x:auto;">
              <div>du-an-python/</div>
              <div>├── .github/</div>
              <div>│&nbsp;&nbsp;&nbsp;├── ISSUE_TEMPLATE/</div>
              <div>│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── bug_report.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:var(--text-muted);"># Mẫu điền khi báo lỗi</span></div>
              <div>│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── feature_request.md&nbsp;&nbsp;<span style="color:var(--text-muted);"># Mẫu đề xuất tính năng</span></div>
              <div>│&nbsp;&nbsp;&nbsp;└── PULL_REQUEST_TEMPLATE.md&nbsp;<span style="color:var(--text-muted);"># Mẫu khung khi mở PR</span></div>
              <div>├── .gitignore&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:var(--text-muted);"># Danh sách đen tệp rác</span></div>
              <div>├── LICENSE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:var(--text-muted);"># Giấy phép MIT / Apache</span></div>
              <div>├── README.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:var(--text-muted);"># Giới thiệu &amp; cách chạy</span></div>
              <div>└── main.py&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:var(--text-muted);"># Mã nguồn ứng dụng</span></div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Bản quyền phần mềm: Vì sao không có LICENSE thì không ai dám dùng?',
          content: `
            <p><strong>Cạm bẫy pháp lý lớn nhất:</strong> Nếu bạn đẩy code lên GitHub công khai nhưng <em>không có tệp LICENSE</em>, theo luật sở hữu trí tuệ quốc tế, mã nguồn đó mặc định là <strong>"All Rights Reserved" (Bảo lưu mọi quyền)</strong>. Người khác có thể xem code của bạn nhưng không công ty hay lập trình viên nào được phép tải về, tái sử dụng hay tích hợp vào sản phẩm thương mại của họ!</p>
            <p>Ba loại giấy phép mã nguồn mở phổ biến nhất:</p>
            <ul>
              <li><strong>MIT License (Khuyên dùng):</strong> Cực kỳ tự do và ngắn gọn. Bất kỳ ai cũng được quyền sao chép, sửa đổi, đóng gói bán thương mại tùy thích, chỉ cần giữ lại thông báo bản quyền gốc.</li>
              <li><strong>Apache 2.0:</strong> Tương tự MIT nhưng bổ sung điều khoản chặt chẽ bảo vệ quyền sở hữu bằng sáng chế (Patent grant). Thích hợp cho dự án doanh nghiệp lớn.</li>
              <li><strong>GNU GPL v3:</strong> Giấy phép copyleft mạnh mẽ. Ai sử dụng mã nguồn này thì phần mềm phát sinh bắt buộc cũng phải mở mã nguồn dưới cùng giấy phép GPL v3.</li>
            </ul>
          `,
          codeExamples: [
            {
              title: 'Nội dung tệp LICENSE chuẩn theo giấy phép MIT',
              lang: 'Markdown',
              code: `MIT License

Copyright (c) 2026 Nguyen Van A

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.`,
              output: `Lưu tệp này tại thư mục gốc: du-an-python/LICENSE`,
              annotations: [
                { line: 3, text: 'Ghi rõ năm và họ tên tác giả sở hữu bản quyền.' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Xuất bản web với GitHub Pages và Mẫu thư mục `.github/`',
          content: `
            <p><strong>GitHub Pages:</strong> Dịch vụ lưu trữ web tĩnh miễn phí trực tiếp từ kho mã GitHub. Bạn chỉ cần vào Settings > Pages > chọn nhánh <code>main</code> (thư mục <code>/root</code> hoặc <code>/docs</code>) và bấm Save. Sau 1 phút, trang web tĩnh HTML/CSS/JS của bạn sẽ chạy thực tế tại địa chỉ <code>https://&lt;username&gt;.github.io/&lt;ten-repo&gt;/</code>.</p>
            <p><strong>Mẫu Issue &amp; PR trong `.github/`:</strong> Khi bạn tạo tệp <code>.github/PULL_REQUEST_TEMPLATE.md</code>, bất kỳ ai bấm nút mở PR sẽ tự động thấy một khung biểu mẫu định sẵn với các câu hỏi: <em>PR này sửa lỗi gì? Các bước kiểm thử đã thực hiện ra sao?</em></p>
          `,
          codeExamples: [
            {
              title: 'Mẫu khung Pull Request chuẩn đặt trong .github/PULL_REQUEST_TEMPLATE.md',
              lang: 'Markdown',
              code: `## 📌 Mô tả thay đổi
Tóm tắt ngắn gọn tính năng hoặc lỗi được xử lý trong PR này.

## 🔗 Liên kết Issue liên quan
- Closes #<số_issue>

## 🧪 Danh sách kiểm thử (Checklist)
- [ ] Mã nguồn đã được kiểm tra bằng lệnh pytest không có lỗi
- [ ] Đã bổ sung tài liệu hướng dẫn trong README nếu có hàm mới
- [ ] Đã tuân thủ quy tắc định dạng code PEP 8`,
              output: `Khung biểu mẫu tự động nạp vào ô mô tả mỗi khi có ai mở PR mới trong kho.`,
              annotations: [
                { line: 5, text: 'Cú pháp Closes # giúp tự động đóng issue liên quan khi PR được gộp.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'GitHub Pages chỉ chạy được mã nguồn tĩnh (Front-end)',
            content: 'GitHub Pages chỉ phục vụ các tệp tĩnh như HTML, CSS, JavaScript thuần và ảnh. Bạn không thể chạy server backend Python Flask/FastAPI hay cơ sở dữ liệu động trực tiếp trên GitHub Pages.'
          }
        ],
        tips: [
          {
            title: 'Sử dụng khối cảnh báo thế hệ mới của GitHub Markdown',
            content: 'Trong file README hoặc Issue trên GitHub, bạn có thể tạo hộp cảnh báo nổi bật bằng cú pháp: `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`.'
          }
        ]
      },
      exercises: [
        {
          level: 'Dễ',
          title: 'Tạo mẫu PR Template trong thư mục ẩn .github',
          problem: 'Hãy tạo thư mục `.github`, bên trong tạo tệp `PULL_REQUEST_TEMPLATE.md` với một danh sách kiểm tra gồm 2 mục: "[ ] Đã chạy test" và "[ ] Đã cập nhật docs". Commit tệp này vào Git.',
          hint: 'Dùng mkdir .github, soạn tệp Markdown và git commit.',
          solutionCode: `mkdir -p .github
echo -e "## Checklist\\n- [ ] Da chay test\\n- [ ] Da cap nhat docs" > .github/PULL_REQUEST_TEMPLATE.md
git add .github/PULL_REQUEST_TEMPLATE.md
git commit -m "Them mau PR template chuan hoa cho du an"`,
          solutionOutput: `[main a2b3c4] Them mau PR template chuan hoa cho du an
 1 file changed, 3 insertions(+)
 create mode 100644 .github/PULL_REQUEST_TEMPLATE.md`,
          explanation: 'Kể từ commit này, GitHub sẽ tự động điền checklist này mỗi khi ai mở PR mới.',
          annotations: [
            { line: 1, text: 'Tạo thư mục ẩn .github.' }
          ]
        }
      ],
      summary: [
        'Không có LICENSE đồng nghĩa người khác không có quyền dùng code của bạn hợp pháp; MIT là lựa chọn phổ biến nhất.',
        'GitHub Pages host web tĩnh HTML/CSS/JS miễn phí từ nhánh main trong 60 giây.',
        'Thư mục `.github/` chứa các mẫu Issue và PR template giúp chuẩn hóa việc cộng tác nhóm.'
      ]
    }
  ]
};
