/**
 * Dữ liệu Khóa học Git & GitHub: Cấp 1 – Cơ bản
 * Gắn liền với dự án mã nguồn Python thực tế
 */

window.GH_LEVEL1_DATA = {
  id: 'part-gh-1',
  number: 'Cấp 1',
  title: 'Nền tảng & Thao tác Cơ bản',
  level: 'Cơ bản',
  badge: 'Cơ bản',
  description: 'Hiểu rõ bản chất kiểm soát phiên bản, phân biệt Git vs GitHub, cấu hình định danh, làm chủ chu trình commit, quản lý .gitignore cho dự án Python, xác thực SSH/Token và phân nhánh cơ bản.',
  lessons: [
    {
      id: 'gh-1-01',
      number: '1.1',
      title: 'Quản lý phiên bản (Version Control) là gì? Phân biệt rạch ròi Git và GitHub',
      subtitle: 'Xóa bỏ nỗi ám ảnh "code_final_v2_sua_lan_cuoi.py" và phân định rõ công cụ cục bộ vs nền tảng đám mây',
      level: 'Cơ bản',
      duration: '25 phút',
      objectives: [
        'Hiểu bản chất và lý do bắt buộc phải dùng hệ thống quản lý phiên bản (VCS) trong kỹ thuật phần mềm.',
        'Phân biệt tuyệt đối giữa Git (công cụ dòng lệnh phân tán trên máy bạn) và GitHub (nền tảng lưu trữ & cộng tác trên web).',
        'Nắm khái niệm Snapshot (ảnh chụp trạng thái toàn bộ dự án) thay vì lưu trữ dạng chênh lệch tệp (delta-based).',
        'Hiểu vì sao lập trình viên Python cần Git ngay từ ngày đầu tiên viết code.'
      ],
      intuition: {
        title: 'Cỗ máy thời gian và Thư viện lưu trữ quốc tế',
        metaphor: 'Hãy tưởng tượng bạn đang viết một cuốn sách dày. Thay vì mỗi lần sửa bạn lại lưu thành "chuong1_ban1.doc", "chuong1_ban2_final.doc" khiến bàn làm việc ngập rác, Git giống như một cỗ máy thời gian vô hình lắp đặt ngay trên bàn viết. Cứ mỗi khi bạn hoàn thành một chương hay một ý tưởng, bạn bấm nút chụp lại một bức ảnh không gian đa chiều (Commit). Bất kỳ lúc nào trong tương lai, bạn đều có thể quay lại đúng khoảnh khắc đó nguyên vẹn 100%. Còn GitHub giống như một nhà xuất bản/thư viện đám mây quốc tế: bạn mang bản thảo từ cỗ máy ở nhà tải lên đó để biên tập viên, đồng nghiệp khắp thế giới cùng đọc, góp ý và viết tiếp cùng bạn.',
        visualHtml: `
          <div class="gh-vs-grid">
            <div class="gh-vs-card git-card">
              <div class="gh-vs-title">
                <span>🔧</span>
                <span>GIT (Công cụ cục bộ)</span>
                <span class="gh-vs-tag">Local CLI</span>
              </div>
              <p class="gh-vs-desc">Hệ thống quản lý phiên bản phân tán (Distributed Version Control System) do Linus Torvalds tạo ra năm 2005.</p>
              <ul class="gh-vs-list">
                <li><span class="gh-vs-bullet">•</span> Cài đặt và chạy 100% trên máy tính cá nhân.</li>
                <li><span class="gh-vs-bullet">•</span> Không cần kết nối Internet vẫn tạo commit, tạo nhánh, xem lịch sử bình thường.</li>
                <li><span class="gh-vs-bullet">•</span> Thao tác qua dòng lệnh terminal (<code>git init</code>, <code>git commit</code>...).</li>
              </ul>
            </div>
            <div class="gh-vs-card github-card">
              <div class="gh-vs-title">
                <span>🐙</span>
                <span>GITHUB (Đám mây)</span>
                <span class="gh-vs-tag">Cloud Platform</span>
              </div>
              <p class="gh-vs-desc">Nền tảng dịch vụ lưu trữ trực tuyến trên đám mây dành cho các kho mã Git, thuộc tập đoàn Microsoft.</p>
              <ul class="gh-vs-list">
                <li><span class="gh-vs-bullet">•</span> Hoạt động trên nền web tại địa chỉ <code>github.com</code>.</li>
                <li><span class="gh-vs-bullet">•</span> Đòi hỏi mạng Internet để đồng bộ đẩy lên (push) hoặc tải về (pull).</li>
                <li><span class="gh-vs-bullet">•</span> Cung cấp tính năng cộng tác nhóm: Pull Request, Issue, Actions (CI/CD), Pages...</li>
              </ul>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Tại sao cách lưu tệp thủ công luôn thất bại?',
          content: `
            <p>Khi chưa dùng Git, quy trình phổ biến của người mới bắt đầu làm dự án Python thường là:</p>
            <ul>
              <li><code>main.py</code> (phiên bản gốc)</li>
              <li><code>main_sua_lan_1.py</code> (thêm hàm tính chuỗi)</li>
              <li><code>main_final.py</code> (chuẩn bị nộp)</li>
              <li><code>main_final_chac_chan_chay.py</code> (sửa nốt lỗi vừa phát hiện)</li>
            </ul>
            <p>Cách làm này có 3 nhược điểm chết người: <strong>(1)</strong> Tốn dung lượng ổ đĩa và gây hỗn loạn; <strong>(2)</strong> Không ai nhớ nổi sự khác biệt giữa hai tệp là dòng nào nếu không mở ra so từng chữ; <strong>(3)</strong> Khi làm việc cùng 2 người trở lên, việc ghép code qua Zalo hay Google Drive gần như chắc chắn sẽ ghi đè và làm mất mã nguồn của nhau.</p>
            <p>Hệ thống Version Control (VCS) ra đời để giải quyết triệt để vấn đề này bằng cách tự động lưu vết lịch sử mọi thay đổi: <em>Ai đã sửa? Sửa dòng nào? Vào ngày giờ nào? Và lý do sửa là gì?</em></p>
          `,
          codeExamples: []
        },
        {
          id: 'sec-2',
          title: '2. Cách Git lưu trữ dữ liệu: Snapshot thay vì Delta',
          content: `
            <p>Nhiều hệ thống cũ (như CVS, Subversion) lưu trữ dữ liệu dạng danh sách các dòng thay đổi thêm bớt (Delta-based). Ngược lại, <strong>Git coi dữ liệu là một tập hợp các ảnh chụp (Snapshot) của toàn bộ cây thư mục dự án</strong> tại một thời điểm.</p>
            <p>Mỗi khi bạn thực hiện một <code>commit</code>, Git chụp lại trạng thái hiện tại của tất cả các tệp. Nếu tệp nào không thay đổi, Git không nhân bản tệp đó mà chỉ tạo một liên kết (link) tới tệp đã lưu trước đó để tối ưu dung lượng và tốc độ cực nhanh.</p>
          `,
          codeExamples: [
            {
              title: 'Kiểm tra phiên bản Git trên máy tính của bạn',
              lang: 'Bash',
              code: `# Kiểm tra xem máy đã cài Git hay chưa
git --version`,
              output: `git version 2.44.0.windows.1`,
              annotations: [
                { line: 2, text: 'Lệnh hiển thị phiên bản Git hiện tại. Nếu báo "command not found", bạn cần cài đặt Git từ git-scm.com.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Ngộ nhận "Học Git tức là phải học giao diện GitHub"',
            content: 'Git là nền móng cốt lõi với các lệnh chạy trên máy tính của bạn. GitHub, GitLab hay Bitbucket chỉ là các "máy chủ từ xa" lưu trữ kho Git đó. Khi bạn thành thạo các câu lệnh Git bản chất, bạn có thể chuyển đổi giữa GitHub, GitLab hay máy chủ riêng của công ty mà không gặp bất kỳ trở ngại nào.'
          }
        ],
        tips: [
          {
            title: 'Tài liệu chuẩn mực chính thống',
            content: 'Khi cần tra cứu sâu bản chất cấu trúc nội bộ của Git, tài liệu chuẩn xác nhất là cuốn sách chính thức Pro Git (miễn phí) tại: https://git-scm.com/book/en/v2'
          }
        ]
      },
      exercises: [
        {
          level: 'Dễ',
          title: 'Kiểm tra môi trường và phân biệt công cụ',
          problem: 'Mở cửa sổ dòng lệnh (Terminal/PowerShell), gõ lệnh kiểm tra phiên bản Git. Hãy giải thích điều gì xảy ra nếu bạn ngắt kết nối mạng WiFi rồi tạo một tệp Python mới trên máy.',
          hint: 'Git hoạt động hoàn toàn cục bộ (local-first) trên ổ cứng của bạn.',
          solutionCode: `git --version`,
          solutionOutput: `git version 2.44.0 (hoặc phiên bản tương đương trên máy bạn)`,
          explanation: 'Khi ngắt mạng, Git vẫn ghi nhận thay đổi, vẫn tạo commit và quản lý lịch sử trên máy bình thường vì cơ sở dữ liệu của Git nằm trọn vẹn trong thư mục ẩn .git của bạn. Bạn chỉ cần mạng khi muốn tải dữ liệu lên GitHub (push) hoặc lấy về từ GitHub (pull).',
          annotations: [
            { line: 1, text: 'Lệnh kiểm tra công cụ Git đã sẵn sàng trong PATH hệ thống.' }
          ]
        }
      ],
      summary: [
        'Version Control giúp chụp lại trạng thái dự án theo thời gian, cho phép quay ngược quá khứ và cộng tác an toàn.',
        'Git là công cụ quản lý phiên bản dòng lệnh cục bộ; GitHub là nền tảng máy chủ đám mây để lưu trữ kho Git và cộng tác.',
        'Git hoạt động theo triết lý "Local-First": gần như mọi thao tác commit, log, diff đều diễn ra tức thì trên máy không cần mạng.'
      ]
    },
    {
      id: 'gh-1-02',
      number: '1.2',
      title: 'Cài đặt Git, Cấu hình định danh và Khởi tạo kho mã đầu tiên (`init`, `clone`)',
      subtitle: 'Thiết lập user.name, user.email, cấu hình nhánh main mặc định và mổ xẻ thư mục bí mật .git',
      level: 'Cơ bản',
      duration: '30 phút',
      objectives: [
        'Cài đặt Git chuẩn xác trên các hệ điều hành (Windows, macOS, Linux).',
        'Cấu hình thông tin tác giả bắt buộc: `user.name`, `user.email` và nhánh mặc định `init.defaultBranch main`.',
        'Khởi tạo một kho mã mới với `git init` và hiểu thư mục ẩn `.git`.',
        'Sao chép kho mã từ xa về máy bằng `git clone`.',
        'Nắm vững mô hình 3 vùng làm việc cốt lõi của Git.'
      ],
      intuition: {
        title: 'Thẻ căn cước và Khai sinh cuốn nhật ký hành trình',
        metaphor: 'Trước khi một công chứng viên đóng dấu vào văn bản, họ phải có con dấu ghi rõ họ tên và địa chỉ liên lạc. Việc cấu hình user.name và user.email trong Git chính là khắc con dấu định danh cá nhân của bạn — mọi commit bạn tạo ra sau này đều sẽ được đóng dấu bằng tên này. Khi bạn gõ `git init` trong một thư mục dự án Python, nó giống như việc bạn đặt một cuốn sổ nhật ký bí mật (`.git`) vào ngăn kéo bàn: kể từ khoảnh khắc đó, mọi biến động trong phòng làm việc đều được người quản thư ghi nhận.',
        visualHtml: `
          <div style="display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
            <div style="font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--accent-text);text-align:center;">MÔ HÌNH 3 VÙNG LÀM VIỆC CỐT LÕI CỦA GIT</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 175px), 1fr));gap:10px;text-align:center;">
              <div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
                <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--text-muted);white-space:nowrap;">VÙNG 1 (Thư mục code)</div>
                <div style="font-family:var(--font-mono);font-size:0.88rem;font-weight:700;color:var(--text-primary);margin:4px 0;white-space:nowrap;">Working Tree</div>
                <div style="font-size:0.8rem;line-height:1.5;color:var(--text-secondary);">Thư mục dự án bạn nhìn thấy &amp; đang gõ code Python (<code>main.py</code>)</div>
              </div>
              <div style="padding:10px 12px;background:var(--accent-soft);border:1px solid var(--accent-soft-border);border-radius:8px;">
                <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--accent-text);white-space:nowrap;">VÙNG 2 (Sân khấu chờ)</div>
                <div style="font-family:var(--font-mono);font-size:0.88rem;font-weight:700;color:var(--accent-primary);margin:4px 0;white-space:nowrap;">Staging Area</div>
                <div style="font-size:0.8rem;line-height:1.5;color:var(--accent-text);">Khu vực xếp hàng chờ sẵn để chuẩn bị đóng gói vào commit kế tiếp</div>
              </div>
              <div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
                <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--text-muted);white-space:nowrap;">VÙNG 3 (Kho lưu trữ)</div>
                <div style="font-family:var(--font-mono);font-size:0.88rem;font-weight:700;color:var(--success);margin:4px 0;white-space:nowrap;">Repository (.git)</div>
                <div style="font-size:0.8rem;line-height:1.5;color:var(--text-secondary);">Cơ sở dữ liệu an toàn lưu các snapshot commit vĩnh viễn</div>
              </div>
            </div>
            <div style="text-align:center;color:var(--text-muted);font-family:var(--font-mono);font-size:0.76rem;white-space:nowrap;overflow-x:auto;padding-top:2px;">
              [Working Tree] ── git add ──► [Staging Area] ── git commit ──► [Repository (.git)]
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Cấu hình định danh bắt buộc ngay sau khi cài đặt',
          content: `
            <p>Ngay sau khi cài đặt Git, bạn phải cấu hình họ tên và email. Email này nên trùng với email tài khoản GitHub của bạn để sau này khi đẩy code lên, GitHub nhận diện đúng avatar và tính điểm đóng góp (các ô vuông xanh trên profile).</p>
            <p>Ngoài ra, kể từ năm 2020, cộng đồng chuẩn hóa tên nhánh chính mặc định là <code>main</code> thay cho <code>master</code>. Hãy cấu hình để Git tự động dùng <code>main</code> khi tạo kho mới.</p>
          `,
          codeExamples: [
            {
              title: 'Cấu hình thông tin định danh toàn cục (Global Config)',
              lang: 'Bash',
              code: `# Đặt tên hiển thị của bạn
git config --global user.name "Nguyen Van A"

# Đặt địa chỉ email (khuyên dùng email đăng ký GitHub)
git config --global user.email "nguyenvana@example.com"

# Thiết lập nhánh mặc định khi khởi tạo là 'main'
git config --global init.defaultBranch main

# Kiểm tra lại toàn bộ cấu hình vừa đặt
git config --global --list`,
              output: `user.name=Nguyen Van A
user.email=nguyenvana@example.com
init.defaultbranch=main`,
              annotations: [
                { line: 2, text: 'Cờ --global áp dụng cấu hình này cho mọi dự án trên máy bạn (lưu tại ~/.gitconfig).' },
                { line: 5, text: 'Email này sẽ xuất hiện công khai trong lịch sử commit của kho mã.' },
                { line: 8, text: 'Tránh việc một số máy cũ vẫn mặc định tạo nhánh master.' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Khởi tạo kho mã mới (git init) và Sao chép kho mã (git clone)',
          content: `
            <p>Có 2 cách để bạn bắt đầu có một kho Git trên máy:</p>
            <ol>
              <li><strong>Tạo mới từ đầu (<code>git init</code>):</strong> Dùng khi bạn đang có một thư mục dự án Python trên máy và muốn bắt đầu theo dõi nó bằng Git. Lệnh này tạo ra một thư mục ẩn tên là <code>.git</code>. Tuyệt đối không xóa hoặc chỉnh sửa bằng tay thư mục này vì đây là "bộ não" chứa toàn bộ lịch sử dự án.</li>
              <li><strong>Sao chép từ một kho có sẵn trên GitHub (<code>git clone</code>):</strong> Tải toàn bộ mã nguồn, toàn bộ nhánh và toàn bộ lịch sử commit của kho trên mạng về một thư mục mới trên máy tính.</li>
            </ol>
          `,
          codeExamples: [
            {
              title: 'Khởi tạo dự án Python mới và theo dõi bằng Git',
              lang: 'Bash',
              code: `# Tạo thư mục dự án học xử lý chuỗi Python
mkdir du-an-python
cd du-an-python

# Khởi tạo kho Git trong thư mục này
git init

# Kiểm tra thư mục ẩn .git đã sinh ra
ls -la`,
              output: `Initialized empty Git repository in D:/str/du-an-python/.git/
drwxr-xr-x 1 user 197121 0 Oct 28 10:00 .
drwxr-xr-x 1 user 197121 0 Oct 28 09:59 ..
drwxr-xr-x 1 user 197121 0 Oct 28 10:00 .git`,
              annotations: [
                { line: 6, text: 'git init biến thư mục thường thành một Git repository hoàn chỉnh.' },
                { line: 9, text: 'Thư mục .git ẩn chứa toàn bộ object database, refs nhánh và cấu hình riêng của repo.' }
              ]
            },
            {
              title: 'Sao chép một kho mã nguồn mở từ GitHub về máy',
              lang: 'Bash',
              code: `# Sao chép kho mã kèm toàn bộ lịch sử về máy
git clone https://github.com/torvalds/linux.git --depth=1

# Hoặc sao chép một kho dự án mẫu của bạn
git clone https://github.com/octocat/Spoon-Knife.git`,
              output: `Cloning into 'Spoon-Knife'...
remote: Enumerating objects: 16, done.
remote: Total 16 (delta 0), reused 0 (delta 0), pack-reused 16
Receiving objects: 100% (16/16), done.`,
              annotations: [
                { line: 2, text: 'Cờ --depth=1 hữu ích cho kho mã khổng lồ khi bạn chỉ muốn lấy commit mới nhất để tiết kiệm băng thông.' },
                { line: 5, text: 'git clone tự động thiết lập liên kết remote "origin" trỏ về link GitHub tương ứng.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Lỗi gõ nhầm git init bên trong một kho Git đã có sẵn',
            content: 'Không bao giờ chạy `git init` bên trong một thư mục con của một kho Git khác (trừ khi cố ý dùng Submodule). Điều này tạo ra tình trạng "repo lồng repo" khiến các tệp bên trong không được theo dõi bình thường.'
          }
        ],
        tips: [
          {
            title: 'Cấu hình xử lý dấu xuống dòng (CRLF vs LF) trên Windows',
            content: 'Nếu bạn dùng Windows, hãy cấu hình `git config --global core.autocrlf true`. Git sẽ tự động đổi dấu xuống dòng CRLF (Windows) thành LF khi commit và ngược lại, tránh tình trạng toàn bộ tệp Python bị báo thay đổi chỉ vì định dạng xuống dòng.'
          }
        ]
      },
      exercises: [
        {
          level: 'Dễ',
          title: 'Khởi tạo kho Git cho dự án Python cá nhân',
          problem: 'Hãy mở terminal, tạo một thư mục mới tên là `python_mini_app`, chuyển vào thư mục đó, khởi tạo Git và kiểm tra trạng thái ban đầu bằng `git status`.',
          hint: 'Dùng lệnh mkdir, cd, git init và git status.',
          solutionCode: `mkdir python_mini_app
cd python_mini_app
git init
git status`,
          solutionOutput: `Initialized empty Git repository in .../python_mini_app/.git/
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)`,
          explanation: 'Git thông báo bạn đang ở trên nhánh chính (main), chưa có commit nào và thư mục làm việc đang hoàn toàn sạch sẽ.',
          annotations: [
            { line: 3, text: 'Khởi tạo kho mã rỗng.' },
            { line: 4, text: 'Xem trạng thái hiện thời của kho mã.' }
          ]
        }
      ],
      summary: [
        'Cấu hình user.name, user.email và init.defaultBranch main là bước bắt buộc trước khi tạo commit đầu tiên.',
        'git init tạo thư mục ẩn .git để biến thư mục hiện tại thành kho mã; git clone tải toàn bộ kho từ xa về máy.',
        'Mô hình 3 vùng: Working Tree (chỉnh sửa) -> Staging Area (chờ đóng gói) -> Git Directory (lưu vĩnh viễn).'
      ]
    },
    {
      id: 'gh-1-03',
      number: '1.3',
      title: 'Chu trình làm việc cốt lõi: `status`, `diff`, `add`, `commit`, `log`',
      subtitle: 'Làm chủ 5 câu lệnh bạn sẽ gõ hàng ngàn lần mỗi ngày trong đời lập trình viên',
      level: 'Cơ bản',
      duration: '35 phút',
      objectives: [
        'Hiểu và phân biệt được 4 trạng thái của tệp: Untracked, Unmodified, Modified, Staged.',
        'Sử dụng `git status` để nắm bắt hiện trạng dự án bất cứ lúc nào.',
        'So sánh chi tiết thay đổi từng dòng bằng `git diff` và `git diff --staged`.',
        'Chọn lọc tệp đưa vào vùng chờ bằng `git add` một cách chính xác.',
        'Tạo commit chuẩn mực với thông điệp rõ nghĩa và tra cứu lịch sử qua `git log` trực quan.'
      ],
      intuition: {
        title: 'Chuyến hàng và Thùng bưu kiện chuẩn bị gửi đi',
        metaphor: 'Hãy hình dung Staging Area như một chiếc thùng các-tông mở sẵn trên bàn. Bạn sửa đổi 5 tệp Python khác nhau (Working Tree). Bạn không muốn gom bừa tất cả vào một lần gửi. Bạn nhặt 2 tệp liên quan đến tính năng "Đăng nhập" bỏ vào thùng (`git add`). Sau đó bạn dán băng dính lại, dán một tờ nhãn ghi rõ "Thêm chức năng kiểm tra mật khẩu" rồi cất vào kho lưu trữ (`git commit -m`). Chiếc thùng đó đã được niêm phong vĩnh viễn, và bạn mở chiếc thùng tiếp theo cho công việc khác. Lệnh `git log` chính là cuốn sổ kê khai tất cả các thùng hàng đã được niêm phong từ trước đến nay.',
        visualHtml: `
          <div style="padding:14px 16px;background:var(--bg-code);color:#e2e8f0;border-radius:10px;font-family:var(--font-mono);font-size:0.82rem;line-height:1.65;white-space:nowrap;overflow-x:auto;">
            <div style="color:#38bdf8;font-weight:700;margin-bottom:6px;">VÒNG ĐỜI TRẠNG THÁI CỦA MỘT TỆP TRONG GIT:</div>
            <div>[Tệp mới] ──(tạo mới)──► <span style="color:#f87171;">Untracked (Chưa theo dõi)</span></div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ <span style="color:#a7f3d0;">git add</span></div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼</div>
            <div>[Sân khấu] ─────────────► <span style="color:#a7f3d0;">Staged (Đã đưa vào vùng chờ)</span></div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ <span style="color:#60a5fa;">git commit</span></div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼</div>
            <div>[Kho lưu] ──────────────► <span style="color:#94a3b8;">Unmodified (Đã cam kết, không đổi)</span></div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ (Sửa tệp code)</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼</div>
            <div>[Đang sửa] ─────────────► <span style="color:#fbbf24;">Modified (Đã sửa nhưng chưa stage)</span></div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Kiểm tra trạng thái và Soi sự khác biệt từng dòng code',
          content: `
            <p>Quy tắc vàng của mọi kỹ sư Git: <strong>Khi phân vân, hãy gõ <code>git status</code></strong>. Lệnh này cho bạn biết bạn đang ở nhánh nào, tệp nào vừa tạo mới, tệp nào vừa sửa đổi và tệp nào đã sẵn sàng commit.</p>
            <p>Trước khi đưa tệp lên Staging Area, hãy kiểm tra chính xác bạn đã thay đổi những ký tự nào bằng <code>git diff</code>:</p>
            <ul>
              <li><code>git diff</code>: Xem thay đổi giữa <em>Working Tree</em> và <em>Staging Area</em> (những gì bạn đã sửa nhưng chưa <code>git add</code>).</li>
              <li><code>git diff --staged</code> (hoặc <code>--cached</code>): Xem thay đổi giữa <em>Staging Area</em> và <em>Commit gần nhất</em> (những gì bạn chuẩn bị bấm commit).</li>
            </ul>
          `,
          codeExamples: [
            {
              title: 'Thực tế thao tác trên dự án Python: kiểm tra trạng thái và soi diff',
              lang: 'Bash',
              code: `# Tạo tệp code Python đầu tiên
echo 'def tinh_tong(a, b): return a + b' > tinh_toan.py

# Kiểm tra trạng thái
git status

# Đưa tệp vào Staging Area
git add tinh_toan.py

# Thêm một hàm mới vào tệp
echo 'def nhan(a, b): return a * b' >> tinh_toan.py

# Soi sự khác biệt chưa stage
git diff`,
              output: `diff --git a/tinh_toan.py b/tinh_toan.py
index a1b2c3d..e4f5a6b 100644
--- a/tinh_toan.py
+++ b/tinh_toan.py
@@ -1 +1,2 @@
 def tinh_tong(a, b): return a + b
+def nhan(a, b): return a * b`,
              annotations: [
                { line: 12, text: 'Dòng có dấu cộng (+) màu xanh là dòng mới được thêm vào so với phiên bản đã add.' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Đưa lên sân khấu (git add) và Đóng gói bản chụp (git commit)',
          content: `
            <p><code>git add &lt;tệp&gt;</code> cho phép bạn chọn lọc chính xác tệp nào muốn đưa vào commit. Nếu muốn thêm tất cả thay đổi trong thư mục hiện tại, dùng <code>git add .</code>.</p>
            <p><code>git commit -m "Thông điệp"</code> tạo ra một Snapshot kèm mã băm SHA-1 duy nhất (ví dụ <code>7a8b9c0</code>). Thông điệp commit cần ngắn gọn, bắt đầu bằng động từ thể mệnh lệnh (ngắn gọn dưới 50 ký tự), mô tả <em>bản chụp này làm gì</em>.</p>
          `,
          codeExamples: [
            {
              title: 'Tạo commit hoàn chỉnh và xem lịch sử',
              lang: 'Bash',
              code: `# Đưa tất cả thay đổi vào Staging Area
git add .

# Tạo commit đầu tiên
git commit -m "Khoi tao ham tinh_tong va ham nhan trong tinh_toan.py"

# Xem lịch sử rút gọn đẹp mắt dạng cây
git log --oneline --graph --decorate`,
              output: `[main (root-commit) 4f2a1b9] Khoi tao ham tinh_tong va ham nhan trong tinh_toan.py
 1 file changed, 2 insertions(+)
 create mode 100644 tinh_toan.py

* 4f2a1b9 (HEAD -> main) Khoi tao ham tinh_tong va ham nhan trong tinh_toan.py`,
              annotations: [
                { line: 5, text: 'Thông điệp commit rõ ràng giúp người đọc hiểu ngay mục đích mà không cần đọc từng dòng diff.' },
                { line: 8, text: 'Cờ --oneline rút gọn mỗi commit thành 1 dòng; --graph vẽ sơ đồ nhánh ASCII; --decorate hiển thị con trỏ nhánh.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Viết thông điệp commit vô nghĩa kiểu "fix bug", "update", "asdasd"',
            content: 'Sau 3 tháng nữa khi dự án gặp sự cố, bạn nhìn lại lịch sử có 50 commit đều tên là "update code" thì không thể biết được lỗi bắt đầu từ đâu. Hãy tập thói quen viết thông điệp có ý nghĩa: "Sửa lỗi chia cho 0 trong ham_tinh_ty_le", "Thêm unit test cho module chuỗi".'
          }
        ],
        tips: [
          {
            title: 'Kỹ thuật git add từng phần bằng cờ -p (Patch Mode)',
            content: 'Nếu trong một tệp bạn vừa sửa lỗi vừa thêm tính năng mới, gõ `git add -p tinh_toan.py`. Git sẽ hỏi bạn từng đoạn thay đổi (hunk) xem có muốn stage đoạn đó không (y/n), giúp tách 1 tệp thành 2 commit riêng biệt sạch sẽ.'
          }
        ]
      },
      exercises: [
        {
          level: 'Vừa',
          title: 'Thực hành chu trình 5 bước trên file Python',
          problem: 'Trong thư mục dự án của bạn, hãy tạo tệp `loi_chao.py` in dòng "Xin chào Git". Kiểm tra `git status`, dùng `git add` đưa vào stage, commit với thông điệp chuẩn, sau đó sửa nội dung tệp thành "Xin chào Git và Python", dùng `git diff` để kiểm tra sự khác biệt trước khi commit lần 2.',
          hint: 'Gõ tuần tự: echo -> git status -> git add -> git commit -> sửa file -> git diff.',
          solutionCode: `echo 'print("Xin chào Git")' > loi_chao.py
git status
git add loi_chao.py
git commit -m "Them file loi_chao.py ban dau"
echo 'print("Xin chào Git và Python")' > loi_chao.py
git diff`,
          solutionOutput: `diff --git a/loi_chao.py b/loi_chao.py
--- a/loi_chao.py
+++ b/loi_chao.py
@@ -1 +1 @@
-print("Xin chào Git")
+print("Xin chào Git và Python")`,
          explanation: 'Dấu trừ (-) đỏ cho thấy dòng cũ đã bị thay thế; dấu cộng (+) xanh cho thấy dòng mới vừa được ghi đè.',
          annotations: [
            { line: 4, text: 'Tạo commit đầu tiên.' },
            { line: 6, text: 'Soi chênh lệch chưa commit.' }
          ]
        }
      ],
      summary: [
        'git status: kim chỉ nam kiểm tra trạng thái tệp ở mọi thời điểm.',
        'git diff xem thay đổi chưa stage; git diff --staged xem thay đổi chuẩn bị commit.',
        'git add chọn lọc đưa tệp vào Staging Area; git commit lưu trữ một ảnh chụp hoàn chỉnh vĩnh viễn.'
      ]
    },
    {
      id: 'gh-1-04',
      number: '1.4',
      title: 'Tập tin `.gitignore` và Viết `README.md` chuẩn cho dự án Python',
      subtitle: 'Bảo vệ kho mã không bị ô nhiễm bởi rác bytecode, thư viện ảo và trình bày dự án chuyên nghiệp',
      level: 'Cơ bản',
      duration: '30 phút',
      objectives: [
        'Hiểu nguyên lý hoạt động của tập tin `.gitignore` và lý do tuyệt đối không đẩy rác lên Git.',
        'Xây dựng tệp `.gitignore` chuẩn mực cho dự án Python (`__pycache__/`, `.venv/`, `.env`, `*.pyc`).',
        'Xử lý trường hợp lỡ đẩy tệp rác lên kho bằng `git rm --cached`.',
        'Soạn thảo một tệp `README.md` tiêu chuẩn với định dạng Markdown chuyên nghiệp.'
      ],
      intuition: {
        title: 'Tấm biển "Miễn vào" tại cổng kiểm soát an ninh',
        metaphor: 'Khi bạn đóng đồ chuyển nhà, bạn không bao giờ bỏ vào thùng rác rưởi dưới gầm giường, vỏ lon nước ngọt uống dở hay chiếc chìa khóa nhà cũ. Tập tin `.gitignore` đóng vai trò như một danh sách đen treo trước cổng kho: mọi tệp và thư mục khớp với quy tắc trong danh sách này sẽ bị Git hoàn toàn làm ngơ, không bao giờ xuất hiện trong `git status` và không thể vô tình bị `git add` vào kho lưu trữ.',
        visualHtml: `
          <div style="display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
            <div style="font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--danger);text-align:center;">NHỮNG THỨ TUYỆT ĐỐI KHÔNG ĐƯA LÊN GIT TRONG DỰ ÁN PYTHON</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 240px), 1fr));gap:10px;">
              <div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
                <div style="color:var(--danger);font-weight:700;font-size:0.86rem;">1. Rác biên dịch tự sinh</div>
                <div style="color:var(--text-secondary);font-size:0.82rem;line-height:1.55;margin-top:4px;"><code>__pycache__/</code>, <code>*.pyc</code>, <code>.pytest_cache/</code> — Python tự sinh khi chạy, máy nào cũng tự tạo được.</div>
              </div>
              <div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
                <div style="color:var(--danger);font-weight:700;font-size:0.86rem;">2. Môi trường ảo (Virtual Env)</div>
                <div style="color:var(--text-secondary);font-size:0.82rem;line-height:1.55;margin-top:4px;"><code>.venv/</code>, <code>env/</code>, <code>venv/</code> — chứa hàng ngàn tệp thư viện nặng hàng trăm MB phụ thuộc HĐH.</div>
              </div>
              <div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
                <div style="color:var(--danger);font-weight:700;font-size:0.86rem;">3. Bí mật &amp; Mật khẩu</div>
                <div style="color:var(--text-secondary);font-size:0.82rem;line-height:1.55;margin-top:4px;"><code>.env</code>, <code>secrets.json</code>, <code>*.pem</code> — chứa API Key, mật khẩu DB; đẩy lên sẽ bị quét tự động.</div>
              </div>
              <div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
                <div style="color:var(--danger);font-weight:700;font-size:0.86rem;">4. Cấu hình IDE cá nhân</div>
                <div style="color:var(--text-secondary);font-size:0.82rem;line-height:1.55;margin-top:4px;"><code>.vscode/settings.json</code>, <code>.idea/</code>, <code>.DS_Store</code> — cấu hình riêng hoặc tệp rác hệ thống.</div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Cú pháp và Mẫu `.gitignore` chuẩn cho lập trình viên Python',
          content: `
            <p>Tệp <code>.gitignore</code> phải đặt ở thư mục gốc của kho Git. Cú pháp cơ bản:</p>
            <ul>
              <li><code>ten_thu_muc/</code>: Bỏ qua toàn bộ thư mục và nội dung bên trong.</li>
              <li><code>*.duoi_file</code>: Bỏ qua tất cả tệp có phần mở rộng này (dùng ký tự đại diện <code>*</code>).</li>
              <li><code># Chú thích</code>: Các dòng bắt đầu bằng dấu thăng được coi là chú thích.</li>
              <li><code>!file_quan_trong.py</code>: Dấu chấm than <code>!</code> để đảo ngược quy tắc (không bỏ qua tệp này).</li>
            </ul>
          `,
          codeExamples: [
            {
              title: 'Mẫu .gitignore hoàn chỉnh cho dự án Python',
              lang: 'gitignore',
              code: `# Bytecode & cache sinh bởi Python CPython
__pycache__/
*.py[cod]
*$py.class
.pytest_cache/

# Môi trường ảo (Virtual Environment)
.venv/
venv/
env/
ENV/

# Tệp chứa biến môi trường và bí mật nhạy cảm
.env
.env.local
secrets.json

# Cấu hình IDE & Hệ điều hành
.DS_Store
Thumbs.db
.idea/`,
              output: `# Lưu tệp này tại đường dẫn gốc: du-an-python/.gitignore`,
              annotations: [
                { line: 2, text: 'Chặn vĩnh viễn thư mục bytecode cache của Python.' },
                { line: 8, text: 'Người khác chỉ cần requirements.txt để tự tạo .venv trên máy họ, không bao giờ commit .venv lên Git.' },
                { line: 14, text: 'Bắt buộc bỏ qua .env để không lộ bí mật.' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Cứu hộ khi lỡ commit tệp nhạy cảm (git rm --cached) & Soạn README.md',
          content: `
            <p><strong>Cạm bẫy thường gặp:</strong> Nếu bạn đã lỡ gõ <code>git add .env</code> và commit nó từ trước, sau đó mới thêm dòng <code>.env</code> vào <code>.gitignore</code> thì Git vẫn tiếp tục theo dõi tệp đó! Vì <code>.gitignore</code> chỉ có tác dụng với các tệp <em>chưa từng được theo dõi (Untracked)</em>.</p>
            <p>Để bảo Git ngừng theo dõi tệp mà không xóa tệp đó khỏi ổ cứng của bạn, hãy dùng cờ <code>--cached</code>.</p>
            <p>Đồng thời, tệp <code>README.md</code> (viết bằng định dạng Markdown) là "bộ mặt" của kho mã trên GitHub, giúp bất kỳ ai ghé thăm cũng hiểu ngay dự án làm gì và cách cài đặt chạy thử trong 30 giây.</p>
          `,
          codeExamples: [
            {
              title: 'Ngừng theo dõi tệp đã lỡ commit và viết README mẫu',
              lang: 'Bash',
              code: `# Ngừng theo dõi tệp .env trên Git nhưng vẫn giữ lại file thật trên máy
git rm --cached .env

# Nếu là thư mục lỡ add (như .venv), thêm cờ -r (recursive)
git rm -r --cached .venv/

# Commit thay đổi này
git commit -m "Bo theo doi tep .env va thu muc .venv"`,
              output: `rm '.env'
[main 8c9d0e1] Bo theo doi tep .env va thu muc .venv
 1 file changed, 0 insertions(+), 0 deletions(-)
 delete mode 100644 .env`,
              annotations: [
                { line: 2, text: 'Lệnh này chỉ xóa chỉ mục trong Staging Area, tệp .env trên ổ đĩa của bạn vẫn nguyên vẹn.' }
              ]
            },
            {
              title: 'Cấu trúc tệp README.md chuẩn cho dự án Python',
              lang: 'Markdown',
              code: `# Ứng Dụng Xử Lý Chuỗi Python

Dự án thực hành chuyên sâu về kiểu dữ liệu \`str\` và thuật toán chuỗi trong Python 3.14.8.

## 🚀 Hướng dẫn Cài đặt & Chạy thử

\`\`\`bash
# 1. Sao chép kho mã
git clone https://github.com/<USER>/du-an-python.git
cd du-an-python

# 2. Tạo môi trường ảo và kích hoạt
python -m venv .venv
source .venv/bin/activate  # Trên Windows: .venv\\Scripts\\activate

# 3. Chạy chương trình
python main.py
\`\`\`

## 📌 Tính năng chính
- [x] Chuẩn hóa Unicode tiếng Việt (NFC/NFD)
- [x] Định dạng chuỗi hiện đại với f-string và t-string (PEP 750)`,
              output: `Hiển thị trực quan và định dạng đẹp mắt ngay trên trang chủ GitHub Repository.`,
              annotations: [
                { line: 1, text: 'Tiêu đề cấp 1 (#) là tên dự án nổi bật.' },
                { line: 7, text: 'Khối code ba dấu nháy ngược (```bash) giúp người dùng copy chạy lệnh dễ dàng.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Lỗi commit tệp .env chứa mật khẩu thật lên kho công khai',
            content: 'Nếu lỡ commit tệp chứa khóa bí mật thật, việc chỉ gõ `git rm --cached` và tạo commit mới vẫn để lại mật khẩu trong lịch sử commit cũ của Git! Bất kỳ ai cũng có thể dùng `git log` để xem lại. Trong trường hợp đó, bạn bắt buộc phải thu hồi và đổi mật khẩu/token đó ngay lập tức (xem Bài 3.6).'
          }
        ],
        tips: [
          {
            title: 'Trang web sinh .gitignore tự động nhanh chóng',
            content: 'Bạn có thể truy cập https://gitignore.io, gõ "Python", "Windows", "macOS", "Visual Studio Code" để tạo ngay một tệp .gitignore toàn diện không thiếu sót.'
          }
        ]
      },
      exercises: [
        {
          level: 'Dễ',
          title: 'Tạo .gitignore và kiểm chứng trạng thái bỏ qua',
          problem: 'Tạo một tệp `bi_mat.env` và một thư mục `__pycache__` chứa tệp `main.pyc`. Hãy tạo tệp `.gitignore` bỏ qua 2 thành phần này và dùng `git status` để xác nhận Git không thèm hiển thị chúng.',
          hint: 'Gõ dòng bi_mat.env và __pycache__/ vào tệp .gitignore.',
          solutionCode: `echo "SECRET_KEY=12345" > bi_mat.env
mkdir __pycache__
touch __pycache__/main.pyc
echo "bi_mat.env" >> .gitignore
echo "__pycache__/" >> .gitignore
git status`,
          solutionOutput: `On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore

nothing added to commit but untracked files present (use "git add" to track)`,
          explanation: 'Git status chỉ nhìn thấy tệp .gitignore mới tạo, hoàn toàn không thấy bi_mat.env hay thư mục __pycache__/.',
          annotations: [
            { line: 4, text: 'Thêm tên file vào danh sách đen .gitignore.' },
            { line: 6, text: 'Xác minh tệp rác đã biến mất khỏi tầm mắt của Git.' }
          ]
        }
      ],
      summary: [
        '.gitignore bảo vệ kho Git sạch sẽ, cấm vĩnh viễn rác bytecode, thư viện .venv và bí mật .env.',
        'Nếu tệp đã lỡ được theo dõi từ trước: dùng `git rm --cached <tệp>` để gỡ bỏ khỏi Git mà không xóa tệp thật.',
        'README.md là bộ mặt của dự án, cung cấp mô tả và lệnh chạy nhanh cho đồng đội.'
      ]
    },
    {
      id: 'gh-1-05',
      number: '1.5',
      title: 'Xác thực an toàn (SSH / HTTPS Token) và Đồng bộ từ xa (`remote`, `push`, `fetch`, `pull`)',
      subtitle: 'Nói không với mật khẩu tài khoản: Thiết lập SSH ed25519, Fine-grained PAT và làm chủ 4 lệnh đồng bộ',
      level: 'Cơ bản',
      duration: '40 phút',
      objectives: [
        'Hiểu lý do GitHub ngừng hỗ trợ mật khẩu tài khoản trực tiếp qua Git HTTPS từ tháng 8/2021.',
        'Tạo cặp khóa SSH chuẩn hiện đại `ed25519` và gắn khóa công khai (Public Key) vào GitHub.',
        'Tạo Fine-grained Personal Access Token (PAT) an toàn với phân quyền tối thiểu.',
        'Quản lý liên kết kho từ xa với `git remote add` và `git remote -v`.',
        'Đẩy code với `git push`, lấy dữ liệu an toàn với `git fetch` và phân biệt rạch ròi với `git pull`.'
      ],
      intuition: {
        title: 'Cặp chìa khóa sắt - ổ khóa đồng và Xe chở hàng hai chiều',
        metaphor: 'Cơ chế xác thực SSH giống như một cặp khóa kỳ diệu: Khóa công khai (Public Key) giống như chiếc ổ khóa đồng bạn gắn công khai trên cánh cổng nhà kho GitHub của bạn. Khóa riêng tư (Private Key) giống như chiếc chìa khóa duy nhất nằm trong túi quần máy tính của bạn. Bất kỳ ai nhìn thấy ổ khóa đồng cũng không thể đoán được chìa khóa trông ra sao. Khi máy tính bạn kết nối lên GitHub, hai bên thực hiện phép thử mật mã học mà không bao giờ cần gửi chiếc chìa khóa qua đường truyền Internet. Sau khi mở cổng, lệnh `git push` như xe tải chở các thùng hàng từ kho nhà bạn lên kho đám mây; còn `git fetch` là cử trinh sát lên xem kho đám mây có thùng hàng mới nào không, và `git pull` là tự động kéo thùng hàng mới đó về nhập vào bàn làm việc của bạn.',
        visualHtml: `
          <div style="display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
            <div style="font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--accent-text);text-align:center;">SO SÁNH BẢN CHẤT: GIT FETCH vs GIT PULL</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 240px), 1fr));gap:12px;">
              <div style="padding:12px 14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
                <div style="font-family:var(--font-mono);font-size:0.86rem;font-weight:700;color:var(--info);">git fetch (An toàn / Khuyên dùng)</div>
                <div style="font-size:0.84rem;line-height:1.58;color:var(--text-secondary);margin-top:6px;">Chỉ tải các commit mới từ GitHub về máy và cập nhật con trỏ <code>origin/main</code>. <strong>Tuyệt đối không đụng vào code đang gõ trên Working Tree</strong> — bạn xem xét trước rồi mới gộp.</div>
              </div>
              <div style="padding:12px 14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
                <div style="font-family:var(--font-mono);font-size:0.86rem;font-weight:700;color:var(--warning-text);">git pull (= fetch + merge)</div>
                <div style="font-size:0.84rem;line-height:1.58;color:var(--text-secondary);margin-top:6px;">Tải commit mới về rồi <strong>tự động gộp ngay lập tức</strong> vào nhánh đang đứng. Nếu code cục bộ và từ xa cùng sửa 1 dòng, xung đột (conflict) sẽ nổ ra ngay.</div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Xác thực an toàn: SSH Key hoặc Personal Access Token (PAT)',
          content: `
            <p><strong>Lưu ý bảo mật tối quan trọng:</strong> Từ ngày 13/08/2021, GitHub đã chấm dứt hoàn toàn việc sử dụng mật khẩu tài khoản cá nhân khi thực hiện các lệnh Git qua HTTPS. Bạn bắt buộc phải chọn 1 trong 2 phương pháp xác thực an toàn:</p>
            <ol>
              <li><strong>Khóa SSH (Khuyên dùng cho máy cá nhân):</strong> Thiết lập 1 lần duy nhất, mã hóa mạnh bằng thuật toán <code>ed25519</code>, không bao giờ phải gõ lại mật khẩu hay lo hết hạn token.</li>
              <li><strong>Personal Access Token (Fine-grained PAT):</strong> Dùng khi mạng công ty chặn cổng SSH (cổng 22). Token hoạt động như mật khẩu tạm thời có ngày hết hạn và được phân quyền tối thiểu (ví dụ chỉ được đọc/ghi đúng 1 kho mã).</li>
            </ol>
          `,
          codeExamples: [
            {
              title: 'Tạo cặp khóa SSH chuẩn ed25519 cho GitHub',
              lang: 'Bash',
              code: `# 1. Tạo cặp khóa SSH mới (thay bằng email GitHub của bạn)
ssh-keygen -t ed25519 -C "nguyenvana@example.com"
# Bấm Enter để chọn đường dẫn mặc định ~/.ssh/id_ed25519
# Nhập mật khẩu bảo vệ khóa (passphrase) hoặc bấm Enter để trống

# 2. In nội dung Khóa Công Khai (Public Key) ra màn hình
cat ~/.ssh/id_ed25519.pub

# 3. Sao chép dòng chữ bắt đầu bằng 'ssh-ed25519 AAAA...'
# Truy cập GitHub.com -> Settings -> SSH and GPG keys -> New SSH key -> Dán vào -> Lưu!

# 4. Kiểm tra kết nối an toàn với máy chủ GitHub
ssh -T git@github.com`,
              output: `Hi nguyenvana! You've successfully authenticated, but GitHub does not provide shell access.`,
              annotations: [
                { line: 2, text: 'Thuật toán ed25519 an toàn và nhanh hơn nhiều so với rsa cũ.' },
                { line: 7, text: 'Chỉ chia sẻ tệp có đuôi .pub (Public Key). Tuyệt đối không gửi tệp id_ed25519 (Private Key) cho bất kỳ ai!' },
                { line: 13, text: 'Thông báo thành công xác nhận GitHub đã nhận diện đúng danh tính của bạn.' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Liên kết kho từ xa (git remote) và Đẩy mã (git push)',
          content: `
            <p>Một kho Git cục bộ có thể liên kết với một hoặc nhiều máy chủ từ xa (gọi là <code>remote</code>). Mặc định, máy chủ chính được quy ước đặt tên là <code>origin</code>.</p>
            <p>Lần đầu tiên đẩy nhánh <code>main</code> lên GitHub, bạn dùng cờ <code>-u</code> (hoặc <code>--set-upstream</code>) để tạo liên kết theo dõi (upstream tracking). Những lần sau bạn chỉ cần gõ <code>git push</code> hoặc <code>git pull</code> ngắn gọn.</p>
          `,
          codeExamples: [
            {
              title: 'Liên kết kho từ xa và đẩy nhánh chính lên GitHub',
              lang: 'Bash',
              code: `# Kiểm tra danh sách remote hiện có (nếu chưa có gì thì lệnh không in gì)
git remote -v

# Thêm remote 'origin' qua đường dẫn SSH (hoặc HTTPS với token)
git remote add origin git@github.com:<TEN_TAI_KHOAN>/du-an-python.git

# Đẩy mã và thiết lập nhánh theo dõi upstream
git push -u origin main`,
              output: `Enumerating objects: 6, done.
Counting objects: 100% (6/6), done.
Writing objects: 100% (6/6), 850 bytes | 850.00 KiB/s, done.
Total 6 (delta 0), reused 0 (delta 0), pack-reused 0
To github.com:<TEN_TAI_KHOAN>/du-an-python.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.`,
              annotations: [
                { line: 5, text: 'Thay <TEN_TAI_KHOAN> bằng username thật trên GitHub của bạn.' },
                { line: 8, text: 'Cờ -u giúp các lần sau bạn chỉ cần gõ git push hoặc git pull là máy tự hiểu.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Lỗi "Permission denied (publickey)" khi push code',
            content: 'Lỗi này xảy ra khi máy tính của bạn chưa có SSH key hoặc chưa thêm khóa công khai vào tài khoản GitHub. Hãy chạy lại lệnh `ssh-keygen -t ed25519`, copy nội dung tệp `.pub` dán vào phần Settings > SSH and GPG keys của GitHub, rồi kiểm tra bằng `ssh -T git@github.com`.'
          }
        ],
        tips: [
          {
            title: 'Sử dụng Fine-grained Personal Access Token nếu dùng HTTPS',
            content: 'Khi tạo token tại GitHub > Settings > Developer Settings > Personal access tokens, không đặt token thật vào mã nguồn công khai. Dùng giá trị giữ chỗ `<TOKEN_CUA_BAN>` trong tài liệu và thiết lập thời hạn token dưới 90 ngày.'
          }
        ]
      },
      exercises: [
        {
          level: 'Vừa',
          title: 'Thực hành kết nối và kiểm tra remote',
          problem: 'Hãy gõ lệnh kiểm tra danh sách remote hiện tại trong thư mục của bạn. Thử thêm một remote giả lập có tên `test-origin`, kiểm tra lại bằng `git remote -v`, sau đó dùng lệnh `git remote remove test-origin` để dọn dẹp sạch sẽ.',
          hint: 'Dùng git remote add <tên> <url>, git remote -v, và git remote remove <tên>.',
          solutionCode: `git remote -v
git remote add test-origin https://github.com/octocat/Hello-World.git
git remote -v
git remote remove test-origin
git remote -v`,
          solutionOutput: `test-origin	https://github.com/octocat/Hello-World.git (fetch)
test-origin	https://github.com/octocat/Hello-World.git (push)
(sau khi remove thì remote biến mất hoàn toàn)`,
          explanation: 'git remote cho phép bạn xem, thêm và xóa liên kết máy chủ từ xa một cách an toàn mà không làm ảnh hưởng đến mã nguồn tệp.',
          annotations: [
            { line: 2, text: 'Thêm remote thử nghiệm.' },
            { line: 4, text: 'Xóa remote thử nghiệm an toàn.' }
          ]
        }
      ],
      summary: [
        'GitHub không còn hỗ trợ mật khẩu trực tiếp; hãy dùng SSH Key (ed25519) hoặc Fine-grained PAT.',
        'git remote add origin kết nối kho máy với kho đám mây; git push -u origin main thiết lập liên kết đẩy code đầu tiên.',
        'Ưu tiên dùng git fetch để xem xét thay đổi từ xa an toàn trước khi gộp bằng git merge (thay vì pull mù quáng).'
      ]
    },
    {
      id: 'gh-1-06',
      number: '1.6',
      title: 'Khái niệm Nhánh (Branch) và Gộp nhánh (`merge`) cơ bản',
      subtitle: 'Hiểu bản chất nhánh là con trỏ siêu nhẹ, lệnh git switch hiện đại và cơ chế Fast-forward',
      level: 'Cơ bản',
      duration: '35 phút',
      objectives: [
        'Nắm vững bản chất kỹ thuật: Nhánh trong Git chỉ là một con trỏ 41 byte trỏ vào một commit, không phải bản sao thư mục cồng kềnh.',
        'Sử dụng các lệnh nhánh hiện đại: `git switch` và `git switch -c` (yêu cầu **Git 2.23+**, so sánh với `git checkout -b` cũ).',
        'Hiểu con trỏ đặc biệt `HEAD` (chỉ ra bạn đang đứng ở đâu).',
        'Thực hiện gộp nhánh cơ bản (Fast-forward merge) và dọn dẹp nhánh an toàn với `git branch -d`.'
      ],
      intuition: {
        title: 'Vũ trụ song song và Tấm giấy nhớ đánh dấu trang sách',
        metaphor: 'Trong các hệ thống cũ, tạo một nhánh giống như sao chép toàn bộ thư mục 5GB sang một thư mục mới — vừa chậm vừa tốn ổ cứng. Trong Git, một nhánh chỉ là một chiếc giấy nhớ nhỏ màu vàng ghi tên (ví dụ: "tinh-nang-moi") dán lên mép của một commit cụ thể. Khi bạn commit tiếp, chiếc giấy nhớ tự động nhảy theo bước đi của bạn. Bạn có thể mở ra một "vũ trụ song song" để thử nghiệm ý tưởng mới mà không sợ làm hỏng nhánh `main` đang chạy ổn định. Khi ý tưởng thành công, bạn chỉ cần gộp (merge) những gì đã làm về lại vũ trụ chính.',
        visualHtml: `
          <div style="display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.82rem;">
            <div style="font-weight:700;color:var(--accent-text);text-align:center;">CƠ CHẾ FAST-FORWARD MERGE TRỰC QUAN</div>
            <div style="padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;line-height:1.7;white-space:nowrap;overflow-x:auto;">
              <div style="color:var(--text-muted);">Trước khi gộp:</div>
              <div>&nbsp;&nbsp;main: C1 ── C2 <span style="color:var(--text-muted);">(HEAD đang ở đây)</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── C3 ── C4 <span style="color:var(--accent-primary);">(feat/chuan-hoa)</span></div>
              <div style="margin-top:8px;color:var(--success);font-weight:700;">Sau khi gõ git merge feat/chuan-hoa (Fast-forward):</div>
              <div>&nbsp;&nbsp;main: C1 ── C2 ── C3 ── C4 <span style="color:var(--text-muted);">(main trượt thẳng tới C4, không sinh commit phụ)</span></div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Tạo và chuyển nhánh với lệnh hiện đại `git switch` (Git 2.23+)',
          content: `
            <p>Trước phiên bản Git 2.23 (phát hành tháng 8/2019), lệnh <code>git checkout</code> phải gánh quá nhiều trách nhiệm: vừa dùng để chuyển nhánh, vừa dùng để hoàn tác tệp. Để rạch ròi, Git đã tách thành 2 lệnh chuyên biệt:</p>
            <ul>
              <li><code>git switch</code>: Chỉ dùng cho các thao tác liên quan đến nhánh.</li>
              <li><code>git restore</code>: Chỉ dùng cho việc hoàn tác, khôi phục tệp.</li>
            </ul>
            <p><strong>Yêu cầu phiên bản:</strong> <code>git switch</code> yêu cầu Git phiên bản 2.23 trở lên. Với các máy rất cũ, lệnh tương đương là <code>git checkout -b &lt;ten-nhanh&gt;</code>.</p>
          `,
          codeExamples: [
            {
              title: 'Tạo nhánh mới, chuyển nhánh và kiểm tra danh sách nhánh',
              lang: 'Bash',
              code: `# Xem danh sách nhánh hiện tại (dấu * cho biết nhánh đang đứng)
git branch

# Tạo nhánh mới và chuyển sang đó ngay lập tức (Git 2.23+)
git switch -c feat/xu-ly-chuoi
# (Cách cũ trên Git < 2.23: git checkout -b feat/xu-ly-chuoi)

# Chuyển ngược lại về nhánh main
git switch main

# Chuyển lại sang nhánh tính năng
git switch feat/xu-ly-chuoi`,
              output: `* main

Switched to a new branch 'feat/xu-ly-chuoi'
Switched to branch 'main'
Switched to branch 'feat/xu-ly-chuoi'`,
              annotations: [
                { line: 5, text: 'Cờ -c (create) tạo nhánh mới và switch sang nhánh đó ngay lập tức.' },
                { line: 9, text: 'Lệnh switch không cần cờ gì khi chuyển sang nhánh đã tồn tại.' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Gộp nhánh cơ bản (Fast-forward Merge) và Dọn dẹp nhánh',
          content: `
            <p>Khi bạn tạo nhánh <code>feat/xu-ly-chuoi</code> từ <code>main</code>, làm việc trên đó vài commit, trong khi nhánh <code>main</code> chưa có thêm commit mới nào khác: việc gộp nhánh được gọi là <strong>Fast-forward</strong>. Git chỉ đơn giản là dời con trỏ <code>main</code> tiến thẳng tới commit mới nhất của nhánh tính năng mà không cần tạo commit gộp phụ.</p>
            <p>Sau khi gộp thành công, nhánh tính năng đã hoàn thành nhiệm vụ. Bạn nên xóa nó đi bằng <code>git branch -d</code> để giữ danh sách nhánh luôn gọn gàng.</p>
          `,
          codeExamples: [
            {
              title: 'Quy trình gộp nhánh và xóa nhánh đã gộp',
              lang: 'Bash',
              code: `# 1. Đang ở nhánh feat/xu-ly-chuoi, tạo một hàm mới
echo 'def slugify(text): return text.lower().replace(" ", "-")' >> text_utils.py
git add text_utils.py
git commit -m "Them ham slugify don gian"

# 2. Chuyển về nhánh main để chuẩn bị gộp
git switch main

# 3. Gộp nhánh tính năng vào main
git merge feat/xu-ly-chuoi

# 4. Xóa nhánh tính năng an toàn sau khi đã gộp
git branch -d feat/xu-ly-chuoi`,
              output: `[feat/xu-ly-chuoi 9b8a7c6] Them ham slugify don gian
 1 file changed, 1 insertion(+)
 create mode 100644 text_utils.py

Switched to branch 'main'
Updating 4f2a1b9..9b8a7c6
Fast-forward
 text_utils.py | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 text_utils.py

Deleted branch feat/xu-ly-chuoi (was 9b8a7c6).`,
              annotations: [
                { line: 10, text: 'Git thông báo kiểu gộp là Fast-forward vì nhánh main không có thay đổi nào xen ngang.' },
                { line: 13, text: 'Cờ -d (viết thường) là xóa an toàn: Git sẽ từ chối xóa nếu nhánh đó chưa được gộp vào main.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Lỗi đứng nhầm nhánh khi gộp code',
            content: 'Muốn gộp nhánh A vào nhánh B, bạn bắt buộc phải đứng ở nhánh B rồi gõ `git merge A`. Nếu bạn đang đứng ở nhánh A mà gõ `git merge main` thì bạn đang làm điều ngược lại (kéo main vào nhánh A).'
          }
        ],
        tips: [
          {
            title: 'Cảnh báo lệnh xóa cưỡng bức: git branch -D (Chữ hoa)',
            content: 'Lệnh `git branch -D <ten-nhanh>` sẽ ép Git xóa nhánh ngay cả khi nhánh đó chứa các commit chưa từng được gộp vào main! Hãy chỉ dùng -D khi bạn thực sự muốn vứt bỏ toàn bộ thử nghiệm thất bại đó.'
          }
        ]
      },
      exercises: [
        {
          level: 'Vừa',
          title: 'Tạo nhánh tính năng, commit và gộp Fast-forward',
          problem: 'Tạo nhánh mới `feat/phep-chia`, viết một hàm chia an toàn vào tệp `math_tools.py`, commit trên nhánh đó, rồi chuyển về `main`, gộp nhánh và xóa nhánh tính năng.',
          hint: 'Dùng git switch -c, echo, git add, git commit, git switch main, git merge, git branch -d.',
          solutionCode: `git switch -c feat/phep-chia
echo 'def chia(a, b): return a / b if b != 0 else None' > math_tools.py
git add math_tools.py
git commit -m "Them ham chia an toan chong ZeroDivisionError"
git switch main
git merge feat/phep-chia
git branch -d feat/phep-chia`,
          solutionOutput: `Switched to a new branch 'feat/phep-chia'
[feat/phep-chia a1c2e3] Them ham chia an toan chong ZeroDivisionError
Switched to branch 'main'
Updating ... Fast-forward
Deleted branch feat/phep-chia`,
          explanation: 'Quy trình hoàn tất mượt mà, nhánh main giờ đây đã sở hữu mã nguồn của hàm chia mới nhất.',
          annotations: [
            { line: 1, text: 'Tạo và chuyển sang nhánh mới.' },
            { line: 5, text: 'Quay về main trước khi gộp.' },
            { line: 7, text: 'Dọn dẹp nhánh sạch sẽ.' }
          ]
        }
      ],
      summary: [
        'Nhánh trong Git siêu nhẹ, chỉ là con trỏ tới commit; HEAD chỉ ra bạn đang đứng ở đâu.',
        'Dùng git switch và git switch -c (từ Git 2.23+) thay cho git checkout cũ.',
        'Fast-forward xảy ra khi nhánh chính chưa có commit xen ngang; dọn nhánh bằng `git branch -d` an toàn.'
      ]
    }
  ]
};
