/**
 * Dữ liệu Khóa học Git & GitHub: Cấp 3 – Chuyên sâu & Phụ lục Tra cứu
 * Dành cho kỹ sư phần mềm cao cấp, DevOps, và quản trị kho mã chuyên nghiệp
 */

window.GH_LEVEL3_DATA = {
  id: 'part-gh-3',
  number: 'Cấp 3',
  title: 'Kỹ thuật Chuyên sâu & Quản trị Hệ thống',
  level: 'Chuyên sâu',
  badge: 'Chuyên sâu',
  description: 'Làm chủ Interactive Rebase, Cherry-pick, bộ ba hoàn tác Reset vs Revert vs Restore, hộp đen Reflog, truy vết lỗi nhị phân với Bisect, Worktree và Submodule, tự động hóa Git Hooks, các mô hình phân nhánh thực chiến, bảo vệ nhánh Rulesets, CI/CD với GitHub Actions, Dependabot, bảo mật mã nguồn và GitHub CLI.',
  lessons: [
    {
      id: 'gh-3-01',
      number: '3.1',
      title: 'Phẫu thuật lịch sử với Interactive Rebase (`rebase -i`) và `cherry-pick`',
      subtitle: 'Dọn dẹp commit nháp thành chuỗi lịch sử hoàn mỹ và nhặt commit nóng chọn lọc',
      level: 'Chuyên sâu',
      duration: '45 phút',
      objectives: [
        'Sử dụng `git rebase -i` để gộp (squash), sửa thông điệp (reword), bỏ bớt (drop) các commit nháp.',
        'Nhặt chọn lọc một commit sửa lỗi cụ thể sang nhánh khác với `git cherry-pick`.',
        'Hiểu bản chất nguy hiểm của `git push --force` và luôn ưu tiên lựa chọn an toàn hơn: `--force-with-lease`.',
        'Tuân thủ đạo đức nghề nghiệp: Chỉ phẫu thuật commit trên nhánh cá nhân chưa được phê duyệt.'
      ],
      intuition: {
        title: 'Bàn dựng phim và Chiếc kẹp gắp linh kiện chính xác',
        metaphor: 'Khi quay một bộ phim, đạo diễn bấm máy hàng chục lần hỏng, diễn viên nói vấp, cảnh quay thừa thãi (những commit nháp "thử lần 1", "chắc chắn chạy", "fix typo"). Trước khi chiếu ra rạp cho khán giả xem, người dựng phim ngồi vào bàn cắt gọt (`rebase -i`): cắt bỏ cảnh thừa (`drop`), ghép 3 đúp quay thành 1 cảnh mượt mà (`squash`), và đổi tên cảnh cho khớp kịch bản (`reword`). Khán giả chỉ thấy một tác phẩm hoàn hảo. Còn `cherry-pick` giống như một chiếc kẹp gắp linh kiện siêu chính xác: trên một chiếc xe hỏng ở xưởng thử nghiệm, bạn phát hiện ra chiếc bugi đánh lửa cực tốt; thay vì kéo cả chiếc xe nát đó về nhà, bạn dùng kẹp gắp đúng chiếc bugi đó gắn vào chiếc xe đang chạy trên đường đua.',
        visualHtml: `
          <div style="display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
            <div style="font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--accent-text);text-align:center;">6 LỆNH MA THUẬT TRONG BẢNG ĐIỀU KHIỂN GIT REBASE -I</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 240px), 1fr));gap:8px;font-size:0.84rem;line-height:1.5;">
              <div style="padding:8px 10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;"><code>pick</code> — Giữ nguyên commit này</div>
              <div style="padding:8px 10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;"><code>reword</code> — Giữ code, sửa thông điệp commit</div>
              <div style="padding:8px 10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;"><code>edit</code> — Tạm dừng ở commit này để sửa code</div>
              <div style="padding:8px 10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;"><code>squash</code> — Gộp vào commit trước &amp; ghép lời nhắn</div>
              <div style="padding:8px 10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;"><code>fixup</code> — Gộp vào commit trước, bỏ lời nhắn phụ</div>
              <div style="padding:8px 10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;"><code>drop</code> — Xóa bỏ hoàn toàn commit này</div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Quy trình dọn dẹp commit với Interactive Rebase (git rebase -i)',
          content: `
            <p>Để phẫu thuật lại <code>N</code> commit gần nhất trên nhánh tính năng của bạn, chạy lệnh:</p>
            <p><code>git rebase -i HEAD~N</code></p>
            <p>Git sẽ mở trình soạn thảo văn bản liệt kê <code>N</code> commit đó theo thứ tự <strong>từ cũ nhất (trên cùng) đến mới nhất (dưới cùng)</strong>. Bạn chỉ cần sửa chữ <code>pick</code> ở đầu dòng thành <code>squash</code> (hoặc <code>s</code>), <code>fixup</code> (hoặc <code>f</code>) rồi lưu lại.</p>
          `,
          codeExamples: [
            {
              title: 'Thao tác Interactive Rebase 3 commit gần nhất',
              lang: 'Bash',
              code: `# Mở giao diện interactive rebase cho 3 commit gần nhất
git rebase -i HEAD~3

# Trong trình soạn thảo hiện ra:
# pick a1b2c3d Them ham doc file json
# fixup e4f5a6b Sua loi typo trong doc file
# reword 7c8d9e0 Them test case cho doc file json
# (Lưu và đóng trình soạn thảo lại)

# Xem lịch sử sau khi gộp: 3 commit nháp đã biến thành 2 commit chuẩn mực!
git log --oneline -n 2`,
              output: `[detached HEAD 9f8e7d6] Them test case cho doc file json
Successfully rebased and updated refs/heads/feat/read-json.
9f8e7d6 Them test case cho doc file json
5b4a3c2 Them ham doc file json`,
              annotations: [
                { line: 2, text: 'HEAD~3 chỉ định phạm vi 3 commit tính ngược từ commit hiện tại.' },
                { line: 6, text: 'fixup sẽ hút commit sửa lỗi chính tả vào commit cha phía trước nó một cách âm thầm.' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Nhặt commit chọn lọc bằng `cherry-pick` & Cảnh báo an toàn Push',
          content: `
            <p>Lệnh <code>git cherry-pick &lt;commit-hash&gt;</code> cho phép bạn sao chép đúng một commit từ bất kỳ nhánh nào trong kho sang nhánh bạn đang đứng.</p>
            <p><strong>CẢNH BÁO BẮT BUỘC VỀ LỆNH NGUY HIỂM:</strong> Khi bạn đã rebase lịch sử cục bộ, các commit đã có mã hash mới. Lệnh <code>git push</code> thông thường sẽ bị GitHub từ chối. Nhiều người có thói quen gõ <code>git push --force</code> (hoặc <code>-f</code>). <strong>Điều này cực kỳ nguy hiểm</strong> vì nếu ai đó vừa đẩy thêm commit mới lên nhánh đó, <code>--force</code> sẽ ghi đè và làm mất vĩnh viễn code của đồng nghiệp!</p>
            <div class="callout-box callout-danger gh-danger-strong">
              <div class="callout-header">
                <span class="gh-badge-danger">NGUY HIỂM BẬC CAO</span>
                <span>Tuyệt đối không dùng <code>git push --force</code> mù quáng!</span>
              </div>
              <div class="callout-body">
                <p>Lệnh <code>--force</code> bỏ qua mọi kiểm tra an toàn. Hãy luôn sử dụng phương án an toàn hơn được ngành công nghiệp chuẩn hóa:</p>
                <div class="gh-safe-alternative">
                  <span class="gh-badge-safe">PHƯƠNG ÁN AN TOÀN HƠN</span>
                  <div style="margin-top:6px;"><strong>git push --force-with-lease</strong></div>
                  <div style="font-size:0.83rem;margin-top:4px;">Cờ <code>--force-with-lease</code> chỉ cho phép ghi đè nếu kho từ xa chưa có ai đẩy thêm commit mới nào khác kể từ lần kéo cuối cùng của bạn. Nếu có commit mới của đồng nghiệp, Git sẽ từ chối push để bảo vệ code của họ!</div>
                </div>
              </div>
            </div>
          `,
          codeExamples: [
            {
              title: 'Nhặt commit sửa lỗi nóng bằng cherry-pick và đẩy an toàn',
              lang: 'Bash',
              code: `# 1. Đang ở nhánh main, cần nhặt commit hotfix có mã 8c7b6a5 từ nhánh thu-nghiem
git switch main
git cherry-pick 8c7b6a5

# 2. Nếu sau khi rebase cần cập nhật nhánh PR cá nhân lên GitHub, dùng:
git push --force-with-lease origin feat/read-json`,
              output: `[main 3d2e1f0] Hotfix: Sua loi chia cho 0 trong tinh_toan.py
 Date: Wed Oct 28 11:00:00 2026 +0700
 1 file changed, 2 insertions(+)
To github.com:user/du-an-python.git
 + 9f8e7d6...3d2e1f0 feat/read-json -> feat/read-json (forced update)`,
              annotations: [
                { line: 3, text: 'cherry-pick sinh ra một commit mới trên main với cùng nội dung thay đổi nhưng mang hash mới.' },
                { line: 6, text: 'Luôn dùng --force-with-lease thay vì --force trần trụi.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Cherry-pick quá nhiều commit tạo ra rác lịch sử trùng lặp',
            content: 'Cherry-pick chỉ nên dùng cho các bản sửa lỗi nóng (Hotfix) đơn lẻ. Nếu bạn thấy mình đang cherry-pick 10 commit liên tiếp từ nhánh này sang nhánh khác, bạn nên dùng `merge` hoặc `rebase` nhánh đó thay vì nhặt lẻ tẻ.'
          }
        ],
        tips: [
          {
            title: 'Lưu vết nguồn gốc với cờ -x khi cherry-pick',
            content: 'Gõ `git cherry-pick -x <hash>`. Git sẽ tự động chèn thêm dòng `(cherry picked from commit <hash>)` vào cuối thông điệp commit, giúp cả đội dễ dàng tra cứu nguồn gốc sau này.'
          }
        ]
      },
      exercises: [
        {
          level: 'Khó',
          title: 'Thực hành nhặt commit bằng cherry-pick',
          problem: 'Tạo nhánh `nhanh-loi`, tạo 2 commit. Lấy mã SHA của commit thứ hai bằng `git log --oneline`. Chuyển về `main` và nhặt riêng đúng commit thứ hai đó bằng `git cherry-pick`.',
          hint: 'Dùng git log --oneline để lấy mã SHA ngắn (7 ký tự).',
          solutionCode: `git switch -c nhanh-loi
echo "commit 1" > c1.txt && git add c1.txt && git commit -m "Commit mot"
echo "commit 2" > c2.txt && git add c2.txt && git commit -m "Commit hai can nhat"
git log --oneline -n 1
git switch main
git cherry-pick <SHA_CUA_COMMIT_HAI>`,
          solutionOutput: `[main 7f8a9b0] Commit hai can nhat
 1 file changed, 1 insertion(+)
 create mode 100644 c2.txt`,
          explanation: 'Chỉ có tệp c2.txt được mang sang nhánh main, tệp c1.txt hoàn toàn không bị kéo theo.',
          annotations: [
            { line: 6, text: 'Nhặt chọn lọc commit mong muốn.' }
          ]
        }
      ],
      summary: [
        'git rebase -i HEAD~N cho phép cắt gọt, squash và dọn dẹp các commit nháp trước khi gửi PR.',
        'git cherry-pick nhặt chính xác một commit từ nhánh khác áp dụng sang nhánh hiện tại.',
        'Tuyệt đối cấm dùng `git push --force`; luôn ưu tiên phương án an toàn hơn: `git push --force-with-lease`.'
      ]
    },
    {
      id: 'gh-3-02',
      number: '3.2',
      title: 'Hoàn tác chuẩn xác (`reset` vs `revert` vs `restore`) và Cứu commit bằng `git reflog`',
      subtitle: 'Phân định rạch ròi 3 cơ chế quay ngược thời gian và khai thác hộp đen máy bay của Git',
      level: 'Chuyên sâu',
      duration: '45 phút',
      objectives: [
        'Phân biệt rõ ràng 3 công cụ hoàn tác: `git restore` (Working/Stage), `git revert` (nhánh public) và `git reset` (nhánh local).',
        'Nắm vững 3 chế độ của `git reset`: `--soft`, `--mixed`, `--hard`.',
        'Nhận thức sâu sắc cảnh báo đỏ nguy hiểm của `git reset --hard` và các giải pháp thay thế an toàn.',
        'Sử dụng `git reflog` để tìm lại mã SHA và hồi sinh commit/nhánh vừa lỡ tay xóa nhầm.'
      ],
      intuition: {
        title: 'Cục tẩy, Lời đính chính công khai và Hộp đen máy bay',
        metaphor: 'Khi bạn lỡ làm hỏng việc gì đó trong Git, có 3 cách ứng xử: Cách 1 là dùng cục tẩy xóa nhẹ vết bút chì vừa viết nháp trên bàn (`git restore`). Cách 2 là khi bạn đã lỡ tuyên bố điều gì đó với cả thế giới (nhánh công khai), bạn không thể bí mật xóa ký ức của mọi người; bạn phải đứng ra công khai xin lỗi và làm một hành động ngược lại để bù đắp (`git revert` - tạo commit mới triệt tiêu commit cũ). Cách 3 là lùi đồng hồ thời gian lại (`git reset`). Nhưng nếu bạn lùi đồng hồ và đốt sạch mọi bản thảo chưa lưu (`reset --hard`), bạn có nguy cơ mất sạch công sức. May mắn thay, Git có một chiếc "hộp đen máy bay" mang tên `git reflog`: nó âm thầm ghi lại mọi cử động của con trỏ HEAD. Dù bạn có reset hay xóa nhánh, dữ liệu vẫn nằm im trong kho 30 ngày chờ bạn lôi ra!',
        visualHtml: `
          <div style="display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
            <div style="font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--accent-text);text-align:center;">BẢNG SO SÁNH 3 CHẾ ĐỘ CỦA GIT RESET</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 175px), 1fr));gap:10px;">
              <div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
                <div style="font-family:var(--font-mono);font-size:0.85rem;font-weight:700;color:var(--success);white-space:nowrap;">--soft (An toàn)</div>
                <div style="font-size:0.81rem;line-height:1.55;margin-top:4px;color:var(--text-secondary);">Lùi HEAD. <strong>Giữ nguyên</strong> toàn bộ code trong Staging Area để gộp commit lại.</div>
              </div>
              <div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
                <div style="font-family:var(--font-mono);font-size:0.85rem;font-weight:700;color:var(--warning);white-space:nowrap;">--mixed (Mặc định)</div>
                <div style="font-size:0.81rem;line-height:1.55;margin-top:4px;color:var(--text-secondary);">Lùi HEAD &amp; bỏ Staging Area. <strong>Code vẫn an toàn trong Working Tree</strong> để sửa tiếp.</div>
              </div>
              <div style="padding:10px 12px;background:var(--danger-bg);border:1px solid var(--danger);border-radius:6px;">
                <div style="font-family:var(--font-mono);font-size:0.85rem;font-weight:700;color:var(--danger-text);white-space:nowrap;">--hard (Nguy hiểm!)</div>
                <div style="font-size:0.81rem;line-height:1.55;margin-top:4px;color:var(--danger-text);">Lùi HEAD &amp; <strong>XÓA SẠCH</strong> mọi thay đổi chưa lưu trong cả Staging và Working Tree!</div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Phân biệt chính xác: git restore vs git revert vs git reset',
          content: `
            <p><strong>git restore (Git 2.23+):</strong> Dùng khi bạn chỉ muốn bỏ thay đổi trên một tệp mà chưa commit:</p>
            <ul>
              <li><code>git restore main.py</code>: Vứt bỏ thay đổi chưa stage của tệp, đưa tệp về lại phiên bản commit gần nhất.</li>
              <li><code>git restore --staged main.py</code>: Bỏ tệp ra khỏi Staging Area (ngược lại với <code>git add</code>), code trên máy vẫn giữ nguyên.</li>
            </ul>
            <p><strong>git revert &lt;commit-hash&gt;:</strong> Lựa chọn <strong>hoàn hảo cho nhánh dùng chung</strong>. Lệnh này không xóa commit cũ mà tạo ra một commit mới có nội dung đảo ngược hoàn toàn (ví dụ: commit cũ thêm 10 dòng thì revert sẽ xóa đúng 10 dòng đó). Lịch sử không bị viết lại, đồng đội kéo về không bị xung đột.</p>
          `,
          codeExamples: [
            {
              title: 'Sử dụng git restore và git revert an toàn',
              lang: 'Bash',
              code: `# 1. Lỡ gõ bậy vào main.py nhưng chưa git add -> khôi phục lại ngay
git restore main.py

# 2. Lỡ git add file nhạy cảm -> rút khỏi Staging Area
git restore --staged bi_mat.env

# 3. Hoàn tác một commit lỗi đã đẩy lên GitHub
git revert 7a8b9c0 --no-edit`,
              output: `[main 1b2c3d4] Revert "Commit gay loi"
 1 file changed, 2 deletions(-)
 (Commit mới được tạo ra một cách an toàn mà không làm mất lịch sử cũ)`,
              annotations: [
                { line: 2, text: 'git restore chỉ tác động cục bộ lên tệp chỉ định.' },
                { line: 8, text: 'Cờ --no-edit tự động dùng thông điệp revert chuẩn Revert "..."' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Cảnh báo đỏ `git reset --hard` và Cứu hộ bằng `git reflog`',
          content: `
            <div class="callout-box callout-danger gh-danger-strong">
              <div class="callout-header">
                <span class="gh-badge-danger">CẢNH BÁO ĐỎ TỐI NGUY HIỂM</span>
                <span>Mất code vĩnh viễn khi dùng <code>git reset --hard</code>!</span>
              </div>
              <div class="callout-body">
                <p>Nếu bạn đang có các đoạn mã chưa được <code>commit</code> trong thư mục làm việc, lệnh <code>git reset --hard</code> sẽ <strong>xóa sạch vĩnh viễn không thể khôi phục bằng bất kỳ công cụ nào của Git!</strong></p>
                <div class="gh-safe-alternative">
                  <span class="gh-badge-safe">GIẢI PHÁP AN TOÀN HƠN</span>
                  <div style="margin-top:6px;">1. Luôn gõ <code>git stash -u</code> trước khi định reset, để nếu hối hận bạn vẫn còn bản lưu trong stash!</div>
                  <div>2. Nếu chỉ muốn hủy stage, dùng <code>git restore --staged .</code> hoặc <code>git reset --soft HEAD~1</code>.</div>
                </div>
              </div>
            </div>
            <p><strong>Cứu hộ bằng Hộp đen git reflog:</strong> Nếu bạn lỡ tay chạy <code>git reset --hard</code> và mất mất 3 commit quan trọng, hoặc lỡ tay gõ <code>git branch -D</code> xóa nhầm nhánh? Đừng tắt máy! Hãy gõ ngay <code>git reflog</code>.</p>
          `,
          codeExamples: [
            {
              title: 'Cứu lại commit tưởng như đã mất bằng git reflog',
              lang: 'Bash',
              code: `# 1. Xem nhật ký mọi bước di chuyển của con trỏ HEAD
git reflog

# Kết quả reflog hiện ra:
# e1d2c3b (HEAD -> main) HEAD@{0}: reset: moving to HEAD~1
# 4a5b6c7 HEAD@{1}: commit: Tinh nang cuc ky quan trong vua bi xoa nham!

# 2. Cứu hộ: Tạo ngay một nhánh mới trỏ vào mã SHA của commit vừa mất!
git switch -c nhanh-cuu-ho 4a5b6c7

# Hoặc reset HEAD quay lại đúng điểm đó:
# git reset --hard 4a5b6c7`,
              output: `Switched to a new branch 'nhanh-cuu-ho'
(Toàn bộ code tưởng chừng đã biến mất nay đã sống lại nguyên vẹn 100%!)`,
              annotations: [
                { line: 2, text: 'reflog lưu lại dấu vết ngay cả khi commit không còn thuộc nhánh nào.' },
                { line: 9, text: 'Tạo nhánh mới tại mã SHA tìm được trong reflog là cách cứu hộ an toàn và thông minh nhất.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Dùng git reset trên nhánh main đã đẩy lên remote',
            content: 'Nếu bạn reset lùi commit trên nhánh main mà đồng nghiệp đã kéo về, bạn sẽ phải dùng push --force làm hỏng toàn bộ kho của cả nhóm. Đối với commit đã push: BẮT BUỘC dùng `git revert`.'
          }
        ],
        tips: [
          {
            title: 'Hạn lưu trữ của git reflog',
            content: 'Mặc định Git giữ lại các bản ghi reflog trong 90 ngày (và 30 ngày với các commit không được nhánh nào trỏ tới) trước khi tiến trình thu gom rác gc dọn dẹp. Vì vậy bạn luôn có đủ thời gian để cứu code nếu biết tới reflog.'
          }
        ]
      },
      exercises: [
        {
          level: 'Khó',
          title: 'Thực hành xóa nhầm commit và hồi sinh bằng reflog',
          problem: 'Tạo một commit với tệp `kho_bau.txt`. Lấy mã SHA của nó. Sau đó chạy `git reset --hard HEAD~1` để xóa commit đó. Dùng `git reflog` tìm lại mã SHA của commit kho_bau và tạo nhánh `cuu-kho-bau` để hồi sinh nó.',
          hint: 'Dùng git reflog để tra cứu HEAD@{1}.',
          solutionCode: `echo "Vang bac chau bau" > kho_bau.txt
git add kho_bau.txt && git commit -m "Cat giau kho bau"
git reset --hard HEAD~1
git reflog -n 3
git switch -c cuu-kho-bau HEAD@{1}
cat kho_bau.txt`,
          solutionOutput: `HEAD is now at ...
... HEAD@{1}: commit: Cat giau kho bau
Switched to a new branch 'cuu-kho-bau'
Vang bac chau bau`,
          explanation: 'Tệp kho_bau.txt đã xuất hiện trở lại nguyên vẹn nhờ kỹ năng truy vết reflog siêu việt.',
          annotations: [
            { line: 3, text: 'Xóa nhầm commit.' },
            { line: 5, text: 'Hồi sinh tại đúng vị trí trong reflog.' }
          ]
        }
      ],
      summary: [
        'git restore khôi phục tệp chưa commit (Git 2.23+); git revert tạo commit đảo ngược an toàn cho nhánh public.',
        'CẢNH BÁO ĐỎ: git reset --hard xóa sạch code chưa commit vĩnh viễn; luôn ưu tiên stash hoặc reset --soft.',
        'git reflog là hộp đen máy bay cứu hộ tối thượng, giúp tìm lại mọi commit và nhánh bị xóa nhầm.'
      ]
    },
    {
      id: 'gh-3-03',
      number: '3.3',
      title: 'Truy vết lỗi bằng `git bisect`, Đa nhiệm với `git worktree` và `git submodule`',
      subtitle: 'Săn lùng commit gây lỗi bằng thuật toán nhị phân và làm việc song song nhiều nhánh không cần stash',
      level: 'Chuyên sâu',
      duration: '45 phút',
      objectives: [
        'Hiểu và ứng dụng thuật toán tìm kiếm nhị phân $O(\\log_2 N)$ của `git bisect` để truy tìm commit làm hỏng hệ thống.',
        'Tự động hóa hoàn toàn tiến trình bisect kết hợp với bộ kiểm thử Python `git bisect run pytest`.',
        'Sử dụng `git worktree` để mở đồng thời nhiều thư mục làm việc cho nhiều nhánh song song.',
        'Quản lý mã nguồn phụ thuộc lồng nhau với `git submodule`.'
      ],
      intuition: {
        title: 'Chặt đôi khúc gỗ tìm mối mọt và Bàn làm việc đa nhiệm',
        metaphor: 'Dự án của bạn có 500 commit trong 3 tháng qua. Hôm nay chạy kiểm thử thì thấy hàm tính chuỗi bị lỗi. Bạn không thể tự mở từng commit một ra chạy test (sẽ mất 500 lần thử). `git bisect` giống như thuật toán chặt đôi: Git nhảy thẳng về commit số 250 kiểm tra. Nếu còn tốt, lỗi nằm ở nửa sau; nếu hỏng, lỗi nằm ở nửa đầu. Chỉ sau đúng $\\approx 9$ lần thử ($2^9 = 512$), Git sẽ chỉ thẳng mặt commit chính xác đã gây ra lỗi! Còn `git worktree` giống như việc bạn kéo thêm một chiếc bàn phụ chữ L vào phòng: bạn đang code nhánh lớn ở bàn 1, sếp giục sửa lỗi nhánh khác thì bạn quay sang bàn 2 gõ ngay lập tức, không cần dọn dẹp cất đồ (`stash`) trên bàn 1.',
        visualHtml: `
          <div style="display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.81rem;">
            <div style="font-weight:700;color:var(--accent-text);text-align:center;">THUẬT TOÁN TÌM KIẾM NHỊ PHÂN O(log N) CỦA GIT BISECT</div>
            <div style="padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;line-height:1.7;white-space:nowrap;overflow-x:auto;">
              <div>[Commit 1: TỐT] ────────────────────────► [Commit 500: HỎNG]</div>
              <div style="color:var(--info);">Lần 1: Nhảy về #250 → pytest TỐT  ⇒ Khoanh vùng [251 .. 500]</div>
              <div style="color:var(--info);">Lần 2: Nhảy về #375 → pytest HỎNG ⇒ Khoanh vùng [251 .. 375]</div>
              <div style="color:var(--success);font-weight:700;">Sau tối đa 9 bước nhị phân: Chỉ đích danh commit #312 gây lỗi!</div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Săn tìm commit gây lỗi tự động với git bisect run pytest',
          content: `
            <p>Quy trình sử dụng <code>git bisect</code>:</p>
            <ol>
              <li>Khởi động: <code>git bisect start</code>.</li>
              <li>Báo commit hỏng hiện tại: <code>git bisect bad</code>.</li>
              <li>Báo một commit cũ trong quá khứ bạn chắc chắn còn chạy tốt: <code>git bisect good &lt;hash-cũ&gt;</code>.</li>
              <li><strong>Tự động hóa hoàn toàn:</strong> Thay vì ngồi gõ tay <code>good/bad</code> từng bước, bạn giao cho Git một script kiểm thử: <code>git bisect run pytest tests/test_chuoi.py</code>. Nếu test pass (exit code 0), Git coi là good; nếu test fail (exit code khác 0), Git coi là bad.</li>
              <li>Kết thúc và quay về nhánh cũ: <code>git bisect reset</code>.</li>
            </ol>
          `,
          codeExamples: [
            {
              title: 'Tự động hóa bisect truy tìm thủ phạm làm hỏng test Python',
              lang: 'Bash',
              code: `# 1. Khởi động quy trình bisect
git bisect start

# 2. Đánh dấu commit hiện tại là BAD (đang bị lỗi)
git bisect bad

# 3. Đánh dấu phiên bản v1.0.0 tuần trước là GOOD (lúc đó còn chạy đúng)
git bisect good v1.0.0

# 4. Giao cho pytest tự động chạy tìm kiếm nhị phân!
git bisect run pytest tests/test_chuan_hoa.py

# 5. Sau khi Git chỉ ra commit thủ phạm, kết thúc phiên bisect
git bisect reset`,
              output: `Bisecting: 15 revisions left to test after this (roughly 4 steps)
running pytest tests/test_chuan_hoa.py
...
7c8d9e0f1a2b3c4d is the first bad commit
commit 7c8d9e0f1a2b3c4d
Author: dev_b <dev_b@example.com>
Date:   Mon Oct 26 14:00:00 2026 +0700
    Doi sang dung ham casefold() gay loi logic tieng Viet`,
              annotations: [
                { line: 11, text: 'Git tự động chạy lặp qua các commit và in ra đúng tác giả và commit gây ra lỗi đầu tiên!' },
                { line: 14, text: 'Luôn gọi git bisect reset để đưa HEAD trở về trạng thái bình thường.' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Đa nhiệm không cần stash với `git worktree` và Quản lý `git submodule`',
          content: `
            <p><strong>git worktree:</strong> Cho phép bạn liên kết nhiều thư mục làm việc (working tree) độc lập với cùng một kho <code>.git</code>. Bạn có thể mở đồng thời 2 cửa sổ VS Code cho 2 nhánh khác nhau của cùng 1 dự án trên cùng 1 máy tính mà không cần stash hay clone lại từ đầu.</p>
            <p><strong>git submodule:</strong> Cho phép bạn nhúng một kho Git độc lập vào một thư mục con của dự án chính (ví dụ: dùng chung thư mục <code>shared_utils/</code>). Khi clone một repo có chứa submodule, bắt buộc phải dùng cờ <code>--recurse-submodules</code>.</p>
          `,
          codeExamples: [
            {
              title: 'Mở thư mục làm việc song song cho nhánh hotfix với worktree',
              lang: 'Bash',
              code: `# Tạo một thư mục riêng biệt ở ../du-an-hotfix gắn với nhánh hotfix-gap
git worktree add ../du-an-hotfix -b hotfix-gap

# Xem danh sách các worktree đang mở
git worktree list

# Sang thư mục mới sửa lỗi, commit và push bình thường!
cd ../du-an-hotfix
# (Sửa lỗi, commit, push PR...)

# Xong việc thì quay lại thư mục chính và xóa worktree phụ
cd ../du-an-python
git worktree remove ../du-an-hotfix`,
              output: `Preparing worktree (new branch 'hotfix-gap')
HEAD is now at 4a5b6c7 Khoi tao du an
D:/str/du-an-python  4a5b6c7 [main]
D:/str/du-an-hotfix  4a5b6c7 [hotfix-gap]`,
              annotations: [
                { line: 2, text: 'Cực kỳ tiện lợi: nhánh chính đang chạy máy ảo train mô hình nặng vẫn để nguyên không bị đụng chạm.' }
              ]
            },
            {
              title: 'Nhúng và đồng bộ kho con bằng submodule',
              lang: 'Bash',
              code: `# Nhúng kho thư viện tiện ích vào thư mục con lib/utils
git submodule add https://github.com/example/py-string-helpers.git lib/utils

# Khi người khác clone dự án về, họ cần tải cả submodule:
git clone --recurse-submodules https://github.com/user/du-an-python.git

# Hoặc nếu đã lỡ clone bình thường:
git submodule update --init --recursive`,
              output: `Cloning into 'D:/str/du-an-python/lib/utils'...
Submodule 'lib/utils' (https://github.com/example/py-string-helpers.git) registered for path 'lib/utils'`,
              annotations: [
                { line: 5, text: 'Cờ --recurse-submodules tự động clone cả kho chính lẫn tất cả kho con bên trong.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Submodule bị kẹt ở trạng thái Detached HEAD',
            content: 'Bên trong thư mục submodule, Git thường ở trạng thái không có nhánh (Detached HEAD). Nếu bạn muốn sửa code trong submodule, bạn bắt buộc phải `cd` vào đó và `git switch main` trước khi commit.'
          }
        ],
        tips: [
          {
            title: 'Cân nhắc dùng Package Manager (pip) thay vì Submodule',
            content: 'Trong hệ sinh thái Python, đóng gói thư viện dùng chung thành package và cài qua `pip install` hoặc Private PyPI thường dễ quản lý phiên bản hơn nhiều so với việc dùng Git Submodule.'
          }
        ]
      },
      exercises: [
        {
          level: 'Khó',
          title: 'Thực hành tạo và dọn dẹp Worktree',
          problem: 'Tạo một worktree mới tại đường dẫn `../worktree_demo` trỏ vào nhánh mới `feat/demo-wt`. Kiểm tra `git worktree list`. Sau đó xóa worktree đó an toàn.',
          hint: 'Dùng git worktree add, git worktree list, git worktree remove.',
          solutionCode: `git worktree add ../worktree_demo -b feat/demo-wt
git worktree list
git worktree remove ../worktree_demo
git branch -d feat/demo-wt`,
          solutionOutput: `Preparing worktree...
.../worktree_demo  [feat/demo-wt]
Deleted branch feat/demo-wt`,
          explanation: 'Worktree giúp bạn giải quyết dứt điểm nhu cầu mở nhiều nhánh cùng lúc mà không tốn dung lượng clone nhiều lần.',
          annotations: [
            { line: 1, text: 'Tạo thư mục nhánh song song.' },
            { line: 3, text: 'Dọn dẹp thư mục làm việc phụ.' }
          ]
        }
      ],
      summary: [
        'git bisect áp dụng tìm kiếm nhị phân $O(\\log N)$ để săn lùng commit gây lỗi; tự động hóa với `bisect run pytest`.',
        'git worktree mở nhiều thư mục làm việc song song cho nhiều nhánh cùng lúc mà không cần stash.',
        'git submodule nhúng kho con độc lập; luôn nhớ cờ `--recurse-submodules` khi clone.'
      ]
    },
    {
      id: 'gh-3-04',
      number: '3.4',
      title: 'Git Hooks, Mô hình phân nhánh (GitHub Flow / Trunk-Based), Bảo vệ nhánh & `CODEOWNERS`',
      subtitle: 'Tự động chặn lỗi trước khi commit và thiết lập quy tắc bảo vệ kho mã cấp doanh nghiệp',
      level: 'Chuyên sâu',
      duration: '45 phút',
      objectives: [
        'Viết và kích hoạt Git Hooks cục bộ (`pre-commit`, `commit-msg`) để tự động chạy linter/kiểm tra cú pháp Python.',
        'Cấu hình chia sẻ hooks cho cả nhóm thông qua `git config core.hooksPath`.',
        'So sánh ưu nhược điểm của 3 mô hình phân nhánh kinh điển: **GitHub Flow**, **Trunk-Based Development** và **Git Flow**.',
        'Thiết lập quy tắc bảo vệ nhánh (**Branch Protection Rules / Repository Rulesets**) cấm push đè lên `main`.',
        'Thiết lập tệp **`.github/CODEOWNERS`** để tự động chỉ định người bắt buộc phải duyệt PR.'
      ],
      intuition: {
        title: 'Cửa kiểm soát an ninh tự động và Luật chống vượt đèn đỏ',
        metaphor: 'Git Hooks giống như cánh cửa kiểm soát an ninh tự động có cảm biến trước khi bước vào máy bay: ngay khoảnh khắc bạn vừa gõ `git commit`, cánh cửa lập tức chạy một kịch bản kiểm tra xem code Python có bị lỗi cú pháp không, có lỡ tay để quên mật khẩu không. Nếu phát hiện vi phạm, cánh cửa khóa chặt lại và từ chối tạo commit, bắt bạn phải sửa ngay tại máy. Còn Branch Protection và CODEOWNERS giống như luật giao thông và quyền chữ ký: bất kỳ ai kể cả sếp cũng không được phép vượt đèn đỏ lái xe thẳng vào nhánh `main`. Muốn vào `main`, bắt buộc phải có đủ 2 chữ ký phê duyệt của đúng các chuyên gia chịu trách nhiệm về module đó (CODEOWNERS).',
        visualHtml: `
          <div style="display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
            <div style="font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--accent-text);text-align:center;">SO SÁNH 3 MÔ HÌNH PHÂN NHÁNH THỰC CHIẾN</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 175px), 1fr));gap:10px;">
              <div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
                <div style="font-family:var(--font-mono);font-size:0.85rem;font-weight:700;color:var(--accent-primary);white-space:nowrap;">1. GitHub Flow</div>
                <div style="font-size:0.81rem;line-height:1.55;margin-top:4px;color:var(--text-secondary);">Tinh gọn: <code>main</code> luôn sẵn sàng deploy. Tạo nhánh → PR → Merge → Deploy. Hợp cho Web/SaaS.</div>
              </div>
              <div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
                <div style="font-family:var(--font-mono);font-size:0.85rem;font-weight:700;color:var(--success);white-space:nowrap;">2. Trunk-Based</div>
                <div style="font-size:0.81rem;line-height:1.55;margin-top:4px;color:var(--text-secondary);">Nhánh cực ngắn (&lt; 1 ngày), merge liên tục vào <code>main</code> kèm Feature Flags. Chuẩn CI/CD tốc độ cao.</div>
              </div>
              <div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
                <div style="font-family:var(--font-mono);font-size:0.85rem;font-weight:700;color:var(--lp-purple);white-space:nowrap;">3. Git Flow</div>
                <div style="font-size:0.81rem;line-height:1.55;margin-top:4px;color:var(--text-secondary);">Nhiều nhánh: <code>main</code>, <code>develop</code>, <code>release/*</code>, <code>hotfix/*</code>. Hợp phần mềm đóng gói theo phiên bản.</div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Tự động kiểm tra code với Git Hooks cục bộ (pre-commit)',
          content: `
            <p>Git Hooks là các tập lệnh shell nằm trong thư mục ẩn <code>.git/hooks/</code>. Git sẽ tự động kích hoạt chúng khi có các sự kiện tương ứng:</p>
            <ul>
              <li><code>pre-commit</code>: Chạy trước khi commit được tạo. Nếu script trả về mã khác 0 (exit code != 0), tiến trình commit bị hủy bỏ ngay lập tức.</li>
              <li><code>commit-msg</code>: Kiểm tra xem thông điệp commit có đúng định dạng chuẩn không (ví dụ: bắt buộc có tiền tố <code>feat:</code> hoặc mã Issue).</li>
            </ul>
            <p><strong>Mẹo chia sẻ hooks cho cả nhóm:</strong> Vì thư mục <code>.git/hooks/</code> không được đẩy lên GitHub, hãy tạo một thư mục <code>.githooks/</code> trong dự án và cấu hình <code>git config core.hooksPath .githooks</code> để mọi thành viên đều dùng chung bộ hook này.</p>
          `,
          codeExamples: [
            {
              title: 'Tạo hook pre-commit tự động kiểm tra lỗi cú pháp Python',
              lang: 'Bash',
              code: `# 1. Thiết lập thư mục hooks dùng chung cho dự án
mkdir .githooks
git config core.hooksPath .githooks

# 2. Tạo tập lệnh pre-commit kiểm tra cú pháp Python
cat << 'EOF' > .githooks/pre-commit
#!/bin/sh
echo "🔍 Dang chay kiem tra cu phap Python truoc khi commit..."
# Kiem tra tat ca cac file .py vua duoc stage
for file in $(git diff --cached --name-only --diff-filter=ACM | grep '\.py$'); do
    python -m py_compile "$file"
    if [ $? -ne 0 ]; then
        echo "❌ Loi cu phap trong tep: $file. Huy bo commit!"
        exit 1
    fi
done
echo "✅ Cu phap hop le!"
exit 0
EOF

# 3. Cap quyen thuc thi cho hook
chmod +x .githooks/pre-commit`,
              output: `🔍 Dang chay kiem tra cu phap Python truoc khi commit...
✅ Cu phap hop le!`,
              annotations: [
                { line: 3, text: 'core.hooksPath giúp chia sẻ hook qua Git repository mà không cần cài đặt thủ công vào .git/hooks.' },
                { line: 9, text: 'python -m py_compile kiểm tra lỗi SyntaxError mà không cần chạy toàn bộ mã nguồn.' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Bảo vệ nhánh (Branch Protection / Rulesets) & Tệp CODEOWNERS',
          content: `
            <p><strong>Branch Protection / Repository Rulesets trên GitHub:</strong></p>
            <ul>
              <li><strong>Require a pull request before merging:</strong> Cấm tiệt mọi thành viên (kể cả Admin) gõ <code>git push origin main</code> trực tiếp. Mọi thay đổi bắt buộc phải qua PR.</li>
              <li><strong>Require approvals:</strong> Yêu cầu tối thiểu ít nhất 1 hoặc 2 người duyệt trước khi nút Merge sáng lên.</li>
              <li><strong>Require status checks to pass before merging:</strong> Bắt buộc bài kiểm thử tự động (GitHub Actions) phải báo xanh thì mới được gộp.</li>
              <li><strong>Do not allow bypassing the above settings:</strong> Áp dụng nghiêm ngặt cho cả chủ sở hữu kho mã.</li>
            </ul>
            <p><strong>Tệp <code>.github/CODEOWNERS</code>:</strong> Xác định ai chịu trách nhiệm về từng phần mã nguồn. Khi một PR sửa đổi tệp thuộc phạm vi đó, GitHub sẽ tự động thêm người đó vào danh sách Reviewer bắt buộc.</p>
          `,
          codeExamples: [
            {
              title: 'Cấu hình tệp .github/CODEOWNERS phân quyền tự động',
              lang: 'Bash',
              code: `# Mặc định: Gán toàn bộ repo cho đội ngũ core
*       @lead-architect

# Module xử lý chuỗi và thuật toán do chuyên gia Python phụ trách
/text_utils.py       @chuyen-gia-python
/tinh_toan.py        @chuyen-gia-python

# Cấu hình CI/CD và deployment do đội ngũ DevOps duyệt
/.github/workflows/  @devops-lead`,
              output: `Lưu tệp này tại: du-an-python/.github/CODEOWNERS`,
              annotations: [
                { line: 2, text: '@lead-architect là tên username hoặc team trên GitHub.' },
                { line: 9, text: 'Bất kỳ PR nào sửa file trong .github/workflows/ sẽ tự động yêu cầu @devops-lead duyệt.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Lạm dụng quy trình Git Flow quá cồng kềnh cho nhóm nhỏ',
            content: 'Nhiều nhóm nhỏ chỉ có 3-4 lập trình viên web nhưng cố gắng áp dụng mô hình Git Flow với hàng loạt nhánh develop, release, hotfix khiến việc merge code trở thành cực hình. Với các ứng dụng web triển khai liên tục, mô hình **GitHub Flow** hoặc **Trunk-Based** tinh gọn hơn rất nhiều.'
          }
        ],
        tips: [
          {
            title: 'Sử dụng framework pre-commit chuyên nghiệp cho Python',
            content: 'Trong các dự án Python thực tế, hãy dùng công cụ chuẩn hóa `pre-commit` (cài qua `pip install pre-commit`) với tệp `.pre-commit-config.yaml` để tự động tích hợp Black, Ruff, Flake8 và Mypy.'
          }
        ]
      },
      exercises: [
        {
          level: 'Vừa',
          title: 'Tạo tệp CODEOWNERS cho dự án Python',
          problem: 'Tạo tệp `.github/CODEOWNERS` chỉ định username GitHub của bạn phụ trách toàn bộ tệp đuôi `*.py` trong dự án. Commit tệp này vào kho.',
          hint: 'Dùng cú pháp *.py @<username>.',
          solutionCode: `echo "*.py @<TEN_GITHUB_CUA_BAN>" >> .github/CODEOWNERS
git add .github/CODEOWNERS
git commit -m "Them cau hinh CODEOWNERS cho cac file Python"`,
          solutionOutput: `[main 1b2c3d] Them cau hinh CODEOWNERS cho cac file Python
 1 file changed, 1 insertion(+)`,
          explanation: 'GitHub sẽ tự động nhận diện và hiển thị huy hiệu Code Owner trên các PR tương ứng.',
          annotations: [
            { line: 1, text: 'Thay <TEN_GITHUB_CUA_BAN> bằng username thật của bạn.' }
          ]
        }
      ],
      summary: [
        'Git Hooks tự động ngăn chặn code lỗi cú pháp ngay tại máy cục bộ trước khi tạo commit.',
        'GitHub Flow phù hợp cho web/SaaS; Trunk-Based phù hợp cho đội ngũ CI/CD tốc độ cao.',
        'Branch Protection Rules và `.github/CODEOWNERS` thiết lập kỷ luật và quyền chữ ký bảo vệ nhánh main.'
      ]
    },
    {
      id: 'gh-3-05',
      number: '3.5',
      title: 'Tự động hóa CI/CD cơ bản với GitHub Actions và Quản lý phụ thuộc bằng Dependabot',
      subtitle: 'Xây dựng đường ống tự động chạy pytest trên mỗi PR và tự động cập nhật thư viện an toàn',
      level: 'Chuyên sâu',
      duration: '45 phút',
      objectives: [
        'Hiểu kiến trúc nền tảng của GitHub Actions: Workflow, Event (`on`), Job, Runner, Step, Action.',
        'Soạn thảo một Workflow CI hoàn chỉnh bằng YAML để tự động cài đặt Python, thư viện và chạy `pytest`.',
        'Đọc hiểu kết quả báo đèn xanh/đỏ và tra cứu log gỡ lỗi trên tab Actions của GitHub.',
        'Cấu hình **Dependabot** (`.github/dependabot.yml`) để tự động quét lỗ hổng và đề xuất nâng cấp gói `pip`.'
      ],
      intuition: {
        title: 'Robot kiểm thử tự động và Trợ lý bảo trì thông minh',
        metaphor: 'Thay vì mỗi lần đồng nghiệp gửi code bạn phải tự kéo về máy, mở terminal, gõ `pytest` để xem code có chạy đúng không — GitHub Actions giống như một chú robot trực sẵn trên đám mây. Cứ mỗi khi có ai đẩy commit hoặc mở Pull Request, robot lập tức khởi động một chiếc máy tính ảo sạch tinh tươm (Ubuntu Runner), cài đặt đúng phiên bản Python 3.14, tải thư viện về và chạy toàn bộ bài test. Nếu có lỗi, robot lập tức giơ cờ đỏ báo động và khóa nút Merge lại. Còn Dependabot giống như một nhân viên kỹ thuật hằng tuần đi kiểm tra các linh kiện phụ tùng (`requirements.txt`), nếu phát hiện thư viện nào bị lỗi bảo mật, nó tự động mở một Pull Request có sẵn bản vá mời bạn duyệt!',
        visualHtml: `
          <div style="display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.81rem;">
            <div style="font-weight:700;color:var(--accent-text);text-align:center;">KIẾN TRÚC ĐƯỜNG ỐNG CI TRONG GITHUB ACTIONS</div>
            <div style="padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;line-height:1.7;white-space:nowrap;overflow-x:auto;">
              <div>1. Sự kiện kích hoạt: <code>push</code> / <code>pull_request</code> vào nhánh <code>main</code></div>
              <div>&nbsp;&nbsp;└── Khởi tạo máy ảo Runner: <code>ubuntu-latest</code></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── Bước 1: <code>actions/checkout</code> — Tải mã nguồn dự án</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── Bước 2: <code>actions/setup-python</code> — Cài Python 3.14</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── Bước 3: <code>pip install -r requirements.txt</code> — Cài thư viện</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── Bước 4: <strong>Chạy pytest</strong> → Báo Xanh (Pass) / Đỏ (Fail)</div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Soạn thảo tệp Workflow CI kiểm thử tự động cho Python (.github/workflows/ci.yml)',
          content: `
            <p>Mọi workflow của GitHub Actions đều là tệp YAML đặt trong thư mục <code>.github/workflows/</code>.</p>
            <p><strong>Lưu ý về tính chính xác:</strong> Cú pháp Actions và phiên bản các action chính thức (như <code>actions/checkout@v4</code>, <code>actions/setup-python@v5</code>) được cập nhật định kỳ. Luôn kiểm tra tài liệu chính thức tại <a href="https://docs.github.com/actions" target="_blank" rel="noopener">docs.github.com/actions</a> để đối chiếu phiên bản mới nhất.</p>
          `,
          codeExamples: [
            {
              title: 'Cấu hình Workflow CI hoàn chỉnh cho dự án Python (.github/workflows/ci.yml)',
              lang: 'YAML',
              code: `name: Python CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: 1. Tai ma nguon tu repo
        uses: actions/checkout@v4

      - name: 2. Cai dat moi truong Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.14'
          cache: 'pip'

      - name: 3. Cai dat thu vien kiem thu
        run: |
          python -m pip install --upgrade pip
          pip install pytest ruff

      - name: 4. Kiem tra dinh dang code bang Ruff
        run: |
          ruff check .

      - name: 5. Chay kiem thu tu dong bang Pytest
        run: |
          pytest`,
              output: `Lưu tệp này tại: du-an-python/.github/workflows/ci.yml`,
              annotations: [
                { line: 3, text: 'Kích hoạt tự động mỗi khi có push lên main hoặc có ai mở PR nhắm vào main.' },
                { line: 11, text: 'Runner chạy trên máy ảo đám mây Ubuntu do GitHub cung cấp miễn phí.' },
                { line: 20, text: 'cache: pip tự động lưu cache các gói thư viện để lần chạy sau chỉ tốn vài giây.' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Tự động kiểm tra lỗ hổng bảo mật với Dependabot (.github/dependabot.yml)',
          content: `
            <p>Dependabot là công cụ tích hợp sẵn miễn phí của GitHub giúp tự động quét các tệp định nghĩa thư viện (như <code>requirements.txt</code> hay <code>pyproject.toml</code>). Khi phát hiện gói nào có phiên bản mới hoặc dính lỗ hổng bảo mật đã công bố (CVE), Dependabot sẽ <strong>tự động mở Pull Request</strong> kèm chi tiết bản vá để bạn chỉ việc bấm nút gộp.</p>
          `,
          codeExamples: [
            {
              title: 'Cấu hình Dependabot quét hàng tuần (.github/dependabot.yml)',
              lang: 'YAML',
              code: `version: 2
updates:
  # Tự động cập nhật các gói thư viện Python (pip)
  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5

  # Tự động cập nhật các Action của GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"`,
              output: `Lưu tệp này tại: du-an-python/.github/dependabot.yml`,
              annotations: [
                { line: 4, text: 'package-ecosystem pip quét các tệp requirements.txt và pyproject.toml ở thư mục gốc.' },
                { line: 7, text: 'interval weekly quét định kỳ vào thứ Hai hàng tuần để không làm phiền bạn quá nhiều.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Lỗi thụt lề sai trong tệp YAML của GitHub Actions',
            content: 'Định dạng YAML cực kỳ nhạy cảm với khoảng trắng thụt lề (giống như Python). Dùng phím Space (2 khoảng trắng), tuyệt đối không dùng phím Tab trong tệp `.github/workflows/ci.yml` vì sẽ gây lỗi cú pháp parser error ngay lập tức.'
          }
        ],
        tips: [
          {
            title: 'Gắn huy hiệu trạng thái (Build Status Badge) vào README.md',
            content: 'Trên tab Actions của GitHub, bấm vào workflow "Python CI", chọn dấu 3 chấm (...) > "Create status badge", copy dòng mã Markdown dán lên đầu file README.md để trang chủ kho hiển thị huy hiệu `passing` xanh lá uy tín!'
          }
        ]
      },
      exercises: [
        {
          level: 'Vừa',
          title: 'Tạo tệp cấu hình Dependabot cho dự án',
          problem: 'Tạo tệp `.github/dependabot.yml` cấu hình quét hệ sinh thái `pip` hàng tuần, commit và kiểm tra trạng thái tệp trong Git.',
          hint: 'Tạo thư mục .github nếu chưa có, soạn tệp dependabot.yml theo mẫu chuẩn.',
          solutionCode: `mkdir -p .github
cat << 'EOF' > .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      interval: "weekly"
EOF
git add .github/dependabot.yml
git commit -m "Them cau hinh Dependabot tu dong quet lo hong"`,
          solutionOutput: `[main a3b4c5] Them cau hinh Dependabot tu dong quet lo hong
 1 file changed, 7 insertions(+)
 create mode 100644 .github/dependabot.yml`,
          explanation: 'Dependabot đã được kích hoạt và sẽ âm thầm bảo vệ kho mã của bạn khỏi các lỗ hổng thư viện cũ.',
          annotations: [
            { line: 2, text: 'Ghi cấu hình YAML chuẩn phiên bản 2.' }
          ]
        }
      ],
      summary: [
        'GitHub Actions tự động hóa kiểm thử và triển khai mã nguồn trên máy ảo đám mây.',
        'Workflow CI đảm bảo mọi PR đều phải pass toàn bộ bài test pytest trước khi được gộp.',
        'Dependabot tự động rà soát lỗ hổng bảo mật trong requirements.txt và mở PR cập nhật.'
      ]
    },
    {
      id: 'gh-3-06',
      number: '3.6',
      title: 'Bảo mật (Secret Scanning, Ký Commit, Xử lý lộ bí mật), Git LFS, GitHub CLI (`gh`) & Mã nguồn mở',
      subtitle: 'Quy trình ứng cứu khẩn cấp khi lỡ push API Key, quản lý file lớn và văn hóa đóng góp cộng đồng',
      level: 'Chuyên sâu',
      duration: '50 phút',
      objectives: [
        'Bật Secret Scanning & Push Protection để ngăn chặn rò rỉ khóa bảo mật ngay tại cửa khẩu.',
        'Ký xác thực commit (Signed Commits) bằng SSH Key (yêu cầu **Git 2.34+**) hoặc GPG để nhận huy hiệu `Verified`.',
        'Thực hiện **quy trình ứng cứu khẩn cấp 3 bước** khi lỡ đẩy bí mật/token thật lên GitHub công khai.',
        'Quản lý các tệp dữ liệu lớn (mô hình AI, dataset) bằng **Git LFS** (Large File Storage).',
        'Thao tác siêu tốc từ dòng lệnh bằng **GitHub CLI (`gh`)**.',
        'Nắm vững chuẩn mực và văn hóa đóng góp mã nguồn mở bền vững (`CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`).'
      ],
      intuition: {
        title: 'Chữ ký công chứng, Thùng hàng quá khổ và Bộ đàm chỉ huy',
        metaphor: 'Trong thế giới số, ai cũng có thể giả mạo tên `user.name` của bạn để commit. Ký commit giống như việc bạn dùng con dấu sáp niêm phong hoàng gia: GitHub nhìn thấy con dấu sẽ gắn ngay huy hiệu xanh `Verified` bảo đảm 100% commit này do chính tay bạn tạo ra. Khi dự án Python của bạn có các tệp mô hình AI 500MB, nếu nhét thẳng vào Git sẽ làm phình to kho mã đến mức không ai kéo về nổi; Git LFS giống như việc gửi thùng hàng quá khổ vào kho bãi riêng, chỉ để lại một tấm phiếu nhận hàng nhẹ 100 byte trong vali Git. Còn GitHub CLI (`gh`) giống như chiếc bộ đàm đặc nhiệm: thay vì phải mở trình duyệt chuột lách cách, bạn đứng ngay tại terminal gõ một câu lệnh là tạo xong PR, duyệt code và gộp nhánh trong chớp mắt.',
        visualHtml: `
          <div style="display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
            <div style="font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--danger);text-align:center;">QUY TRÌNH ỨNG CỨU KHẨN CẤP KHI LỠ PUSH BÍ MẬT / API KEY</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 175px), 1fr));gap:10px;text-align:center;">
              <div style="padding:10px 12px;background:var(--danger-bg);border:1px solid var(--danger);border-radius:6px;">
                <div style="font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--danger-text);white-space:nowrap;">1. THU HỒI NGAY</div>
                <div style="font-size:0.8rem;line-height:1.5;margin-top:4px;color:var(--danger-text);">Coi như khóa đã lộ 100%. Vào ngay nhà cung cấp (OpenAI, AWS, DB) thu hồi và đổi khóa mới!</div>
              </div>
              <div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
                <div style="font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--warning-text);white-space:nowrap;">2. DỌN LỊCH SỬ</div>
                <div style="font-size:0.8rem;line-height:1.5;margin-top:4px;color:var(--text-secondary);">Dùng công cụ <code>git-filter-repo</code> thanh lọc tệp bí mật khỏi toàn bộ lịch sử commit.</div>
              </div>
              <div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
                <div style="font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--success);white-space:nowrap;">3. PHÒNG NGỪA</div>
                <div style="font-size:0.8rem;line-height:1.5;margin-top:4px;color:var(--text-secondary);">Đưa tệp vào <code>.gitignore</code> và bật <strong>Push Protection</strong> trên Settings GitHub.</div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-1',
          title: '1. Ký xác thực Commit bằng SSH Key (Git 2.34+) & Xử lý khi lộ bí mật',
          content: `
            <p>Từ phiên bản <strong>Git 2.34</strong> (tháng 11/2021), bạn có thể dùng chính chiếc khóa SSH cá nhân sẵn có để ký xác thực commit mà không cần cài đặt phần mềm GPG phức tạp!</p>
            <p><strong>Xử lý khi lỡ push bí mật:</strong></p>
            <p>Hacker sử dụng các bot tự động quét toàn bộ commit mới trên GitHub chỉ trong vài giây sau khi push. Nếu bạn lỡ commit token, việc tạo commit mới để xóa tệp là <strong>hoàn toàn vô ích</strong> vì tệp vẫn nằm trong commit cũ. Bạn bắt buộc phải:</p>
            <ol>
              <li>Thu hồi (Revoke) khóa đó trên dịch vụ gốc ngay trong phút đầu tiên.</li>
              <li>Sử dụng công cụ chính thức được Git khuyến nghị: <code>git-filter-repo</code> (cài qua <code>pip install git-filter-repo</code>) để gỡ bỏ triệt để tệp nhạy cảm khỏi toàn bộ các snapshot lịch sử.</li>
            </ol>
          `,
          codeExamples: [
            {
              title: 'Cấu hình ký commit tự động bằng SSH Key (Git 2.34+)',
              lang: 'Bash',
              code: `# 1. Báo cho Git biết bạn muốn dùng SSH để ký
git config --global gpg.format ssh

# 2. Chỉ định đường dẫn tới khóa công khai SSH của bạn
git config --global user.signingkey ~/.ssh/id_ed25519.pub

# 3. Bật tự động ký cho mọi commit
git config --global commit.gpgsign true

# 4. Tạo commit thử nghiệm (sẽ tự động được ký bằng SSH)
git commit -m "Commit duoc ky xac thuc chinh chu"

# 5. Kiểm tra chữ ký xác thực
git log --show-signature -n 1`,
              output: `Good "git" signature for nguyenvana@example.com with ED25519 key SHA256:...
[main 8f7e6d5] Commit duoc ky xac thuc chinh chu`,
              annotations: [
                { line: 8, text: 'Trên GitHub, thêm khóa này vào mục "Signing Key" để nhận huy hiệu Verified xanh lá.' }
              ]
            },
            {
              title: 'Làm sạch tệp nhạy cảm khỏi toàn bộ lịch sử bằng git-filter-repo',
              lang: 'Bash',
              code: `# Cài đặt công cụ chuẩn quốc tế qua pip
pip install git-filter-repo

# Xóa sạch tệp bi_mat.env ra khỏi TOÀN BỘ lịch sử mọi commit của kho
git filter-repo --invert-paths --path bi_mat.env --force

# Đẩy lịch sử sạch lên GitHub với --force-with-lease
git push origin --force-with-lease --all`,
              output: `Parsed 48 commits
Rewriting history...
Completely finished after 0.12 seconds.`,
              annotations: [
                { line: 5, text: 'git-filter-repo thay thế hoàn toàn công cụ git filter-branch cũ vốn chậm và nguy hiểm.' }
              ]
            }
          ]
        },
        {
          id: 'sec-2',
          title: '2. Quản lý tệp lớn với Git LFS và Thao tác nhanh với GitHub CLI (`gh`)',
          content: `
            <p><strong>Git LFS (Large File Storage):</strong> Git mặc định giới hạn tệp tối đa 100MB trên GitHub. Nếu dự án Python của bạn có các tệp mô hình Machine Learning (<code>*.pkl</code>, <code>*.onnx</code>) hay tệp dữ liệu lớn (<code>*.csv</code>, <code>*.sqlite</code>):</p>
            <ul>
              <li>Cài đặt Git LFS: <code>git lfs install</code>.</li>
              <li>Khai báo theo dõi tệp lớn: <code>git lfs track "*.pkl"</code> (lệnh này tự sinh tệp cấu hình <code>.gitattributes</code>).</li>
              <li>Commit bình thường: Git sẽ chỉ lưu con trỏ 130 byte trong repo, còn dữ liệu nặng hàng GB được đẩy lên kho lưu trữ riêng của LFS.</li>
            </ul>
            <p><strong>GitHub CLI (lệnh <code>gh</code>):</strong> Công cụ dòng lệnh chính thức của GitHub giúp bạn không bao giờ phải rời mắt khỏi terminal.</p>
          `,
          codeExamples: [
            {
              title: 'Thao tác siêu tốc hàng ngày với GitHub CLI (gh)',
              lang: 'Bash',
              code: `# Đăng nhập tài khoản GitHub một lần duy nhất
gh auth login

# Tạo một Pull Request trực tiếp từ terminal
gh pr create --title "Them thu vien chuan hoa tieng Viet" --body "Chi tiet tai Issue #12"

# Liệt kê danh sách PR đang mở
gh pr list

# Kéo nhánh của một PR về máy để chạy thử nghiệm
gh pr checkout 42

# Duyệt và gộp PR ngay trên dòng lệnh
gh pr merge 42 --squash --delete-branch`,
              output: `https://github.com/user/du-an-python/pull/42
✓ Merged and deleted branch feat/chuan-hoa`,
              annotations: [
                { line: 5, text: 'Không cần mở trình duyệt web, PR được tạo ngay trong 3 giây!' },
                { line: 14, text: 'Gộp PR dạng squash và tự động xóa luôn nhánh trên remote.' }
              ]
            }
          ]
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Lỗi quên commit tệp .gitattributes sau khi dùng git lfs track',
            content: 'Khi gõ `git lfs track "*.pkl"`, Git tạo ra tệp `.gitattributes`. Bạn bắt buộc phải `git add .gitattributes` và commit nó; nếu không, đồng nghiệp kéo về sẽ bị tải toàn bộ tệp nặng dạng nhị phân thô gây phình to repo.'
          }
        ],
        tips: [
          {
            title: 'Quy chuẩn đóng góp mã nguồn mở bền vững',
            content: 'Khi muốn đóng góp cho dự án lớn: 1. Đọc kỹ `CONTRIBUTING.md` và `CODE_OF_CONDUCT.md`; 2. Mở Issue thảo luận ý tưởng trước khi bắt tay viết PR khổng lồ; 3. Luôn viết kèm bài kiểm thử (test case) và đảm bảo CI xanh 100%.'
          }
        ]
      },
      exercises: [
        {
          level: 'Vừa',
          title: 'Khởi tạo Git LFS theo dõi định dạng tệp',
          problem: 'Cài đặt git lfs trên kho mã cục bộ, cấu hình theo dõi các tệp mô hình có đuôi `*.model`, kiểm tra nội dung tệp `.gitattributes` vừa được tạo.',
          hint: 'Dùng git lfs install và git lfs track "*.model".',
          solutionCode: `git lfs install
git lfs track "*.model"
cat .gitattributes`,
          solutionOutput: `Git LFS initialized.
Tracking "*.model"
*.model filter=lfs diff=lfs merge=lfs -text`,
          explanation: 'Tệp .gitattributes đã thiết lập bộ lọc filter=lfs để tự động đưa các tệp *.model vào kho lưu trữ lớn riêng biệt.',
          annotations: [
            { line: 2, text: 'Đăng ký phần mở rộng tệp lớn với LFS.' }
          ]
        }
      ],
      summary: [
        'Ký commit bằng SSH Key (Git 2.34+) giúp chứng thực danh tính chính chủ và hiện huy hiệu Verified.',
        'Lỡ push bí mật: thu hồi khóa trên dịch vụ gốc ngay lập tức + dùng `git-filter-repo` làm sạch lịch sử.',
        'Git LFS quản lý tệp nặng hàng trăm MB; GitHub CLI (`gh`) tăng tốc toàn bộ quy trình làm việc từ terminal.'
      ]
    }
  ]
};

/**
 * Phụ lục Tra cứu: Cheat Sheet Toàn diện & Từ điển Thuật ngữ Git/GitHub
 */
window.GH_REFERENCE_DATA = {
  id: 'part-gh-ref',
  number: 'Phụ lục',
  title: 'Tra cứu Nhanh: Cheat Sheet & Bảng Thuật ngữ',
  level: 'Tra cứu',
  badge: 'Tra cứu',
  description: 'Bảng tra cứu lệnh Git/GitHub toàn diện phân nhóm theo tác vụ thực tế (kèm cảnh báo mức độ nguy hiểm) và từ điển giải nghĩa cô đọng hơn 30 thuật ngữ cốt lõi.',
  lessons: [
    {
      id: 'gh-ref-cheatsheet',
      number: 'PL.1',
      title: 'Bảng Tra cứu Nhanh các Lệnh Git & GitHub (Cheat Sheet)',
      subtitle: 'Cẩm nang tra cứu cú pháp chuẩn mực, phiên bản yêu cầu và chỉ dẫn an toàn đặt ngay trước bàn làm việc',
      level: 'Tra cứu',
      duration: '20 phút',
      objectives: [
        'Tra cứu nhanh cú pháp chính xác của mọi lệnh Git thường dùng trong 5 giây.',
        'Nhận biết ngay lập tức các cờ lệnh nguy hiểm có khả năng làm mất mã nguồn.',
        'Nắm phương án thay thế an toàn hơn cho từng tình huống.'
      ],
      intuition: {
        title: 'Bảng tuần hoàn các câu lệnh Git',
        metaphor: 'Không một kỹ sư nào trên thế giới cần phải thuộc lòng từng cờ lệnh của Git trong đầu. Những lập trình viên kỳ cựu nhất luôn có một bảng cheat sheet dán bên cạnh màn hình: khi cần xem một cờ ít dùng, họ liếc mắt 2 giây là gõ được ngay lệnh chuẩn xác.',
        visualHtml: `
          <div style="padding:10px 14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;font-family:var(--font-mono);font-size:0.72rem;">
            <span class="gh-badge-safe">XANH: An toàn tuyệt đối</span>
            <span style="padding:2px 8px;border-radius:4px;background:var(--warning-bg);border:1px solid var(--warning-border);color:var(--warning-text);font-weight:800;white-space:nowrap;">VÀNG: Chú ý ngữ cảnh</span>
            <span class="gh-badge-danger">ĐỎ: Nguy hiểm / Ghi đè lịch sử</span>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-sheet',
          title: 'Bảng tổng hợp lệnh theo nhóm tác vụ thực chiến',
          content: `
            <div class="table-responsive">
              <table class="lesson-table">
                <thead>
                  <tr>
                    <th>Nhóm tác vụ</th>
                    <th>Câu lệnh Git / GitHub</th>
                    <th>Giải thích chức năng</th>
                    <th>Mức an toàn / Lưu ý</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Nhóm 1 -->
                  <tr>
                    <td rowspan="3"><strong>1. Cấu hình &amp; Định danh</strong></td>
                    <td><code>git config --global user.name "Tên"</code></td>
                    <td>Đặt tên tác giả commit trên toàn máy</td>
                    <td><span class="gh-badge-safe">An toàn</span></td>
                  </tr>
                  <tr>
                    <td><code>git config --global user.email "email"</code></td>
                    <td>Đặt email tác giả (trùng email GitHub)</td>
                    <td><span class="gh-badge-safe">An toàn</span></td>
                  </tr>
                  <tr>
                    <td><code>git config --global init.defaultBranch main</code></td>
                    <td>Đặt tên nhánh chính mặc định là main</td>
                    <td><span class="gh-badge-safe">An toàn</span></td>
                  </tr>

                  <!-- Nhóm 2 -->
                  <tr>
                    <td rowspan="5"><strong>2. Chu trình hằng ngày</strong></td>
                    <td><code>git status</code></td>
                    <td>Xem trạng thái các tệp trong 3 vùng</td>
                    <td><span class="gh-badge-safe">An toàn</span></td>
                  </tr>
                  <tr>
                    <td><code>git diff</code></td>
                    <td>Soi chênh lệch tệp chưa stage</td>
                    <td><span class="gh-badge-safe">An toàn</span></td>
                  </tr>
                  <tr>
                    <td><code>git diff --staged</code></td>
                    <td>Soi chênh lệch tệp chuẩn bị commit</td>
                    <td><span class="gh-badge-safe">An toàn</span></td>
                  </tr>
                  <tr>
                    <td><code>git add &lt;tệp&gt;</code> / <code>git add .</code></td>
                    <td>Đưa tệp vào Staging Area (vùng chờ)</td>
                    <td><span class="gh-badge-safe">An toàn</span></td>
                  </tr>
                  <tr>
                    <td><code>git commit -m "Thông điệp"</code></td>
                    <td>Tạo Snapshot vĩnh viễn kèm lời nhắn</td>
                    <td><span class="gh-badge-safe">An toàn</span></td>
                  </tr>

                  <!-- Nhóm 3 -->
                  <tr>
                    <td rowspan="5"><strong>3. Nhánh &amp; Gộp</strong></td>
                    <td><code>git branch</code></td>
                    <td>Xem danh sách nhánh cục bộ</td>
                    <td><span class="gh-badge-safe">An toàn</span></td>
                  </tr>
                  <tr>
                    <td><code>git switch &lt;nhánh&gt;</code></td>
                    <td>Chuyển sang nhánh có sẵn (Git 2.23+)</td>
                    <td><span class="gh-badge-safe">An toàn</span></td>
                  </tr>
                  <tr>
                    <td><code>git switch -c &lt;nhánh-mới&gt;</code></td>
                    <td>Tạo và chuyển sang nhánh mới</td>
                    <td><span class="gh-badge-safe">An toàn</span></td>
                  </tr>
                  <tr>
                    <td><code>git merge &lt;nhánh&gt;</code></td>
                    <td>Gộp nhánh chỉ định vào nhánh đang đứng</td>
                    <td><span style="color:var(--warning-text);font-weight:700;">Chú ý conflict</span></td>
                  </tr>
                  <tr>
                    <td><code>git branch -d &lt;nhánh&gt;</code></td>
                    <td>Xóa nhánh đã gộp an toàn</td>
                    <td><span class="gh-badge-safe">An toàn</span> (tránh dùng <code>-D</code>)</td>
                  </tr>

                  <!-- Nhóm 4 -->
                  <tr>
                    <td rowspan="4"><strong>4. Từ xa &amp; Đồng bộ</strong></td>
                    <td><code>git remote -v</code></td>
                    <td>Xem danh sách máy chủ từ xa</td>
                    <td><span class="gh-badge-safe">An toàn</span></td>
                  </tr>
                  <tr>
                    <td><code>git push -u origin main</code></td>
                    <td>Đẩy nhánh và thiết lập theo dõi upstream</td>
                    <td><span class="gh-badge-safe">An toàn</span></td>
                  </tr>
                  <tr>
                    <td><code>git fetch origin</code></td>
                    <td>Tải commit mới về nhưng không chạm vào code</td>
                    <td><span class="gh-badge-safe">Rất an toàn</span></td>
                  </tr>
                  <tr>
                    <td><code>git pull</code></td>
                    <td>Tải về và tự động merge ngay lập tức</td>
                    <td><span style="color:var(--warning-text);font-weight:700;">Dễ dính conflict</span></td>
                  </tr>

                  <!-- Nhóm 5 -->
                  <tr>
                    <td rowspan="5"><strong>5. Hoàn tác &amp; Cứu hộ</strong></td>
                    <td><code>git restore &lt;tệp&gt;</code></td>
                    <td>Vứt bỏ sửa đổi chưa stage (Git 2.23+)</td>
                    <td><span style="color:var(--warning-text);font-weight:700;">Mất thay đổi tệp đó</span></td>
                  </tr>
                  <tr>
                    <td><code>git restore --staged &lt;tệp&gt;</code></td>
                    <td>Bỏ tệp ra khỏi Staging Area</td>
                    <td><span class="gh-badge-safe">An toàn</span> (code còn nguyên)</td>
                  </tr>
                  <tr>
                    <td><code>git revert &lt;hash&gt;</code></td>
                    <td>Tạo commit đảo ngược cho nhánh public</td>
                    <td><span class="gh-badge-safe">Rất an toàn</span></td>
                  </tr>
                  <tr>
                    <td><code>git reset --hard HEAD~1</code></td>
                    <td>Lùi commit và XÓA SẠCH thay đổi</td>
                    <td><span class="gh-badge-danger">⚠️ NGUY HIỂM</span></td>
                  </tr>
                  <tr>
                    <td><code>git reflog</code></td>
                    <td>Hộp đen cứu hộ mọi commit bị xóa nhầm</td>
                    <td><span class="gh-badge-safe">Cứu hộ thần kỳ</span></td>
                  </tr>

                  <!-- Nhóm 6 -->
                  <tr>
                    <td rowspan="4"><strong>6. Lịch sử Nâng cao</strong></td>
                    <td><code>git rebase -i HEAD~N</code></td>
                    <td>Cắt gọt, gộp commit nháp trên nhánh riêng</td>
                    <td><span style="color:var(--warning-text);font-weight:700;">Chỉ dùng cho nhánh local</span></td>
                  </tr>
                  <tr>
                    <td><code>git push --force-with-lease</code></td>
                    <td>Đẩy ép buộc an toàn sau khi rebase</td>
                    <td><span class="gh-badge-safe">Ưu tiên hơn --force</span></td>
                  </tr>
                  <tr>
                    <td><code>git cherry-pick &lt;hash&gt;</code></td>
                    <td>Nhặt một commit chọn lọc sang nhánh này</td>
                    <td><span class="gh-badge-safe">An toàn</span></td>
                  </tr>
                  <tr>
                    <td><code>git bisect start/bad/good</code></td>
                    <td>Tìm kiếm nhị phân commit gây lỗi</td>
                    <td><span class="gh-badge-safe">An toàn</span> (nhớ <code>reset</code>)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `,
          codeExamples: []
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Quy tắc vàng cứu mạng lập trình viên',
            content: 'Khi gặp bất kỳ tình huống rối loạn nào: gõ `git status` trước tiên. Nếu đang merge dở bị kẹt, gõ `git merge --abort`. Nếu đang rebase dở bị kẹt, gõ `git rebase --abort`. Tuyệt đối không xóa bừa thư mục `.git`!'
          }
        ]
      },
      exercises: [],
      summary: [
        'Tra cứu cú pháp theo nhóm tác vụ giúp thao tác chính xác, không cần nhớ máy móc.',
        'Tuyệt đối cẩn trọng với các lệnh có cờ `--hard`, `--force`, `-D`.',
        'Luôn ghi nhớ các lệnh thoát hiểm: `git merge --abort`, `git rebase --abort` và `git reflog`.'
      ]
    },
    {
      id: 'gh-ref-glossary',
      number: 'PL.2',
      title: 'Bảng Thuật ngữ Git & GitHub (Glossary)',
      subtitle: 'Giải nghĩa ngắn gọn, chuẩn xác và dễ hiểu hơn 30 khái niệm kỹ thuật cốt lõi',
      level: 'Tra cứu',
      duration: '20 phút',
      objectives: [
        'Hiểu bản chất chính xác của các thuật ngữ chuyên ngành tiếng Anh trong Git và GitHub.',
        'Tự tin giao tiếp và đọc tài liệu kỹ thuật quốc tế không bị nhầm lẫn.'
      ],
      intuition: {
        title: 'Cuốn từ điển song ngữ của Kỹ sư Phần mềm',
        metaphor: 'Học Git giống như học một ngôn ngữ mới. Khi bạn hiểu chính xác "Commit" không phải là lưu file, "Branch" không phải là thư mục, và "Pull Request" không phải là kéo code — toàn bộ bức tranh kiến trúc sẽ trở nên rõ ràng và sáng tỏ.',
        visualHtml: ''
      },
      sections: [
        {
          id: 'sec-glossary',
          title: 'Từ điển giải nghĩa hơn 30 thuật ngữ then chốt',
          content: `
            <div class="gh-glossary-grid">
              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Repository (Repo)</span>
                  <span class="gh-glossary-cat">Cơ bản</span>
                </div>
                <div class="gh-glossary-def">Kho chứa toàn bộ tệp, thư mục và toàn bộ lịch sử các phiên bản của dự án, được quản lý thông qua thư mục ẩn <code>.git</code>.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Commit</span>
                  <span class="gh-glossary-cat">Cơ bản</span>
                </div>
                <div class="gh-glossary-def">Một ảnh chụp (Snapshot) toàn bộ trạng thái kho mã tại một thời điểm nhất định, gắn liền với mã định danh băm SHA, tác giả và thông điệp mô tả.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Working Tree</span>
                  <span class="gh-glossary-cat">Cơ bản</span>
                </div>
                <div class="gh-glossary-def">Thư mục làm việc thực tế trên ổ đĩa của bạn, nơi bạn trực tiếp tạo, mở và gõ code Python.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Staging Area (Index)</span>
                  <span class="gh-glossary-cat">Cơ bản</span>
                </div>
                <div class="gh-glossary-def">Vùng đệm trung gian nơi các tệp sau khi <code>git add</code> được xếp hàng sẵn sàng để đóng gói vào commit kế tiếp.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>HEAD</span>
                  <span class="gh-glossary-cat">Cơ bản</span>
                </div>
                <div class="gh-glossary-def">Con trỏ đặc biệt chỉ ra vị trí hiện tại bạn đang đứng trong lịch sử (thường trỏ vào ngọn của nhánh đang kích hoạt).</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Branch (Nhánh)</span>
                  <span class="gh-glossary-cat">Cơ bản</span>
                </div>
                <div class="gh-glossary-def">Một con trỏ nhẹ di động trỏ vào một commit cụ thể, cho phép bạn tách luồng phát triển độc lập mà không ảnh hưởng nhánh chính.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Merge</span>
                  <span class="gh-glossary-cat">Cơ bản</span>
                </div>
                <div class="gh-glossary-def">Hành động tích hợp các thay đổi từ một nhánh khác vào nhánh hiện tại của bạn.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Fast-forward</span>
                  <span class="gh-glossary-cat">Cơ bản</span>
                </div>
                <div class="gh-glossary-def">Cơ chế gộp khi nhánh đích chưa có commit mới xen ngang, Git chỉ đơn giản dời con trỏ nhánh tiến thẳng tới commit mới mà không cần tạo commit gộp phụ.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Merge Conflict</span>
                  <span class="gh-glossary-cat">Trung cấp</span>
                </div>
                <div class="gh-glossary-def">Xung đột xảy ra khi hai nhánh cùng chỉnh sửa những dòng mã giống nhau; Git tạm dừng để con người chọn lọc bản sửa chuẩn xác.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Remote &amp; Origin</span>
                  <span class="gh-glossary-cat">Cơ bản</span>
                </div>
                <div class="gh-glossary-def">Remote là máy chủ lưu trữ kho mã từ xa (như GitHub). Origin là bí danh mặc định của remote chính mà bạn clone hoặc push lên.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Upstream</span>
                  <span class="gh-glossary-cat">Trung cấp</span>
                </div>
                <div class="gh-glossary-def">Bí danh quy ước cho kho mã gốc của tác giả khi bạn làm việc với một kho Fork.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Clone vs Fork</span>
                  <span class="gh-glossary-cat">Trung cấp</span>
                </div>
                <div class="gh-glossary-def">Clone là tải kho mã về máy cá nhân. Fork là tạo một bản sao độc lập của kho mã đó trên tài khoản GitHub của bạn trên đám mây.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Fetch vs Pull</span>
                  <span class="gh-glossary-cat">Cơ bản</span>
                </div>
                <div class="gh-glossary-def">Fetch chỉ tải commit mới về máy mà không sửa code đang gõ. Pull tự động tải về và gộp ngay vào nhánh làm việc hiện tại (Pull = Fetch + Merge).</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Pull Request (PR)</span>
                  <span class="gh-glossary-cat">Trung cấp</span>
                </div>
                <div class="gh-glossary-def">Lời đề nghị chính thức gửi tới chủ sở hữu kho mã yêu cầu xem xét (Code Review) và gộp các thay đổi từ nhánh của bạn vào nhánh chính.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Stash</span>
                  <span class="gh-glossary-cat">Trung cấp</span>
                </div>
                <div class="gh-glossary-def">Ngăn kéo cất tạm thời các thay đổi dở dang chưa commit vào ngăn xếp để trả lại Working Tree sạch sẽ phục vụ chuyển nhánh gấp.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Tag &amp; Release</span>
                  <span class="gh-glossary-cat">Trung cấp</span>
                </div>
                <div class="gh-glossary-def">Tag là nhãn đánh dấu mốc phiên bản cụ thể trong lịch sử (v1.0.0). Release là trang đóng gói phát hành trên GitHub đính kèm ghi chú và tệp tải về.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Rebase</span>
                  <span class="gh-glossary-cat">Trung cấp</span>
                </div>
                <div class="gh-glossary-def">Hành động dời gốc của một nhánh sang một commit khác và phát lại lần lượt các commit của nhánh đó theo một đường thẳng tuyến tính.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Interactive Rebase (-i)</span>
                  <span class="gh-glossary-cat">Chuyên sâu</span>
                </div>
                <div class="gh-glossary-def">Chế độ tương tác cho phép sửa thông điệp, gộp (squash), tách, xóa bỏ hoặc đổi thứ tự các commit cũ trước khi công khai mã nguồn.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Cherry-pick</span>
                  <span class="gh-glossary-cat">Chuyên sâu</span>
                </div>
                <div class="gh-glossary-def">Nhặt một commit cụ thể từ một nhánh bất kỳ và sao chép áp dụng vào nhánh bạn đang đứng.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Reflog</span>
                  <span class="gh-glossary-cat">Chuyên sâu</span>
                </div>
                <div class="gh-glossary-def">Hộp đen nhật ký ghi nhận mọi lần di chuyển của con trỏ HEAD, công cụ cứu hộ tối thượng để hồi sinh commit hoặc nhánh vừa xóa nhầm.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Bisect</span>
                  <span class="gh-glossary-cat">Chuyên sâu</span>
                </div>
                <div class="gh-glossary-def">Công cụ tìm kiếm nhị phân $O(\\log N)$ giúp truy tìm chính xác commit đầu tiên làm phát sinh lỗi kiểm thử trong lịch sử dự án.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Worktree</span>
                  <span class="gh-glossary-cat">Chuyên sâu</span>
                </div>
                <div class="gh-glossary-def">Tính năng cho phép mở đồng thời nhiều thư mục làm việc cho nhiều nhánh khác nhau trên cùng một kho Git mà không cần clone lại.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Submodule</span>
                  <span class="gh-glossary-cat">Chuyên sâu</span>
                </div>
                <div class="gh-glossary-def">Kỹ thuật nhúng một kho Git độc lập vào làm một thư mục con của một kho Git cha.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Git Hooks</span>
                  <span class="gh-glossary-cat">Chuyên sâu</span>
                </div>
                <div class="gh-glossary-def">Các tập lệnh shell tự động kích hoạt trước hoặc sau các sự kiện như commit, push, merge để kiểm tra chất lượng mã nguồn tự động.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>GitHub Actions (CI/CD)</span>
                  <span class="gh-glossary-cat">Chuyên sâu</span>
                </div>
                <div class="gh-glossary-def">Nền tảng tự động hóa tích hợp liên tục (CI) và triển khai liên tục (CD) chạy trên máy ảo đám mây của GitHub.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Git LFS</span>
                  <span class="gh-glossary-cat">Chuyên sâu</span>
                </div>
                <div class="gh-glossary-def">Large File Storage - Phần mở rộng của Git giúp lưu trữ các tệp dung lượng lớn (audio, video, mô hình AI) ra ngoài repo chính để tránh làm phình to kho mã.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>PAT (Personal Access Token)</span>
                  <span class="gh-glossary-cat">Cơ bản</span>
                </div>
                <div class="gh-glossary-def">Chuỗi token bảo mật dùng để xác thực quyền truy cập vào GitHub thay cho mật khẩu tài khoản khi dùng Git qua HTTPS.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>GitHub CLI (gh)</span>
                  <span class="gh-glossary-cat">Chuyên sâu</span>
                </div>
                <div class="gh-glossary-def">Công cụ dòng lệnh chính thức giúp bạn tương tác với Issues, Pull Requests và GitHub Actions trực tiếp từ terminal.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Dependabot</span>
                  <span class="gh-glossary-cat">Chuyên sâu</span>
                </div>
                <div class="gh-glossary-def">Robot tự động của GitHub giúp phát hiện lỗ hổng bảo mật trong các thư viện phụ thuộc (như <code>requirements.txt</code> trong Python) và tự tạo Pull Request cập nhật bản vá.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Secret Scanning</span>
                  <span class="gh-glossary-cat">Chuyên sâu</span>
                </div>
                <div class="gh-glossary-def">Tính năng tự động quét mã nguồn của GitHub nhằm phát hiện kịp thời các khóa API, Token hoặc chuỗi nhạy cảm bị sơ suất đẩy lên kho mã.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>CODEOWNERS</span>
                  <span class="gh-glossary-cat">Chuyên sâu</span>
                </div>
                <div class="gh-glossary-def">Tệp cấu hình quy định thành viên hoặc nhóm kỹ sư chịu trách nhiệm phản biện (Code Review) cho từng thư mục hoặc tệp mã nguồn cụ thể.</div>
              </div>

              <div class="gh-glossary-card">
                <div class="gh-glossary-term">
                  <span>Trunk-based Development</span>
                  <span class="gh-glossary-cat">Chuyên sâu</span>
                </div>
                <div class="gh-glossary-def">Mô hình phân nhánh hiện đại trong văn hóa DevOps, nơi các lập trình viên liên tục gộp các nhánh ngắn hạn vào nhánh chính nhiều lần mỗi ngày.</div>
              </div>
            </div>
          `,
          codeExamples: []
        }
      ],
      callouts: {
        tips: [
          {
            title: 'Học bằng cách đối chiếu thực tế',
            content: 'Khi gặp một thuật ngữ mới, hãy liên hệ ngay với ví dụ dự án Python bạn đang xây dựng để hiểu rõ vai trò thực sự của nó thay vì chỉ học vẹt định nghĩa.'
          }
        ]
      },
      exercises: [],
      summary: [
        'Hơn 30 thuật ngữ cốt lõi bao quát toàn bộ hệ sinh thái quản lý phiên bản từ Git cục bộ đến dịch vụ đám mây GitHub.',
        'Hiểu bản chất khái niệm là chìa khóa để làm chủ dòng lệnh và cộng tác tự tin trong môi trường kỹ thuật quốc tế.'
      ]
    }
  ]
};
