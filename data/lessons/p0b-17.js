export default {
  id: 'p0b-17',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B3.2',
  title: 'Định lý Böhm–Jacopini và Lập trình có cấu trúc (Structured Programming)',
  subtitle: 'Cột mốc lịch sử giải cứu ngành phần mềm: Khai tử GOTO, định lý 3 cấu trúc và nguyên lý Single-Entry Single-Exit',
  level: 'Chuyên sâu',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu tầm vóc lịch sử của Định lý Böhm–Jacopini (1966) và cuộc tranh luận kinh điển của Edsger W. Dijkstra.',
    'Nắm vững chứng minh toán học: Mọi thuật toán trên đời đều biểu diễn được chỉ bằng 3 cấu trúc: Tuần tự, Rẽ nhánh, Lặp.',
    'Nhận diện và phòng tránh hiện tượng "Spaghetti Logic" (mã sợi mì) sinh ra do nhảy luồng tự do.',
    'Áp dụng nguyên lý SESE (Single-Entry, Single-Exit) để thiết kế các sơ đồ Flowchart có cấu trúc chuẩn mực.'
  ],

  intuition: {
    title: 'Giải mã bát mỳ Spaghetti và Những khối xếp hình Lego',
    metaphor: 'Vào những năm 1960, các lập trình viên sử dụng lệnh GOTO để nhảy tự do đến bất kỳ dòng code nào họ thích. Kết quả là các chương trình trở thành những "bát mỳ Spaghetti" rối tung: một sợi mỳ xoắn tít, chui qua chui lại, không ai biết điểm đầu ở đâu và điểm kết thúc ở đâu. Nếu bạn rút thử một sợi mỳ, cả bát mỳ sẽ đổ sập! Năm 1966, hai nhà toán học Corrado Böhm và Giuseppe Jacopini đã chứng minh một định lý chấn động: Bạn không cần bất kỳ sợi mỳ xoắn nào cả! Mọi công trình vĩ đại nhất của nhân loại đều có thể xây dựng từ 3 loại khối Lego cơ bản: Khối phẳng (Tuần tự), Khối ngã ba (Rẽ nhánh) và Khối xoay vòng (Lặp).',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">3 VIÊN GẠCH BÖHM–JACOPINI THAY THẾ TOÀN BỘ GOTO</div>
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;text-align:center;">
          <div style="padding:10px;border:2px solid var(--accent-primary);border-radius:8px;background:var(--bg-surface);">
            <strong style="color:var(--accent-primary);">1. SEQUENCE</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">A ➔ B ➔ C</span>
          </div>
          <div style="padding:10px;border:2px solid var(--py-gold);border-radius:8px;background:var(--bg-surface);">
            <strong style="color:var(--py-gold);">2. SELECTION</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">if / else</span>
          </div>
          <div style="padding:10px;border:2px solid #10b981;border-radius:8px;background:var(--bg-surface);">
            <strong style="color:#10b981;">3. ITERATION</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">while condition</span>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Định lý Böhm–Jacopini (1966) và Phát biểu Toán học',
      badge: 'Nền tảng lý thuyết',
      content: `
        <details class="deep-dive-details" open style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;padding:12px;margin-bottom:16px;">
          <summary style="cursor:pointer;font-weight:bold;color:var(--accent-primary);">Thu gọn / Mở rộng kiến thức Chuyên sâu Tầng 3</summary>
          <div style="margin-top:12px;">
            <p><strong>Nội dung định lý:</strong> Mọi hàm khả tính (computable function) và mọi lưu đồ thuật toán có một điểm vào và một điểm ra đều có thể được chuyển đổi thành một lưu đồ có cấu trúc tương đương chỉ sử dụng đúng ba cấu trúc điều khiển:</p>
            <ol>
              <li><strong>Sequence (Cấu trúc Tuần tự):</strong> Thực thi câu lệnh $A$ rồi tiếp tục câu lệnh $B$.</li>
              <li><strong>Selection (Cấu trúc Chọn lựa):</strong> Nếu điều kiện $C$ đúng thì làm $A$, ngược lại làm $B$.</li>
              <li><strong>Iteration (Cấu trúc Lặp):</strong> Trong khi điều kiện $C$ còn đúng thì tiếp tục thực thi $A$.</li>
            </ol>
            <p>Định lý này đã đặt nền móng lý thuyết vững chắc cho sự ra đời của phong trào <strong>Lập trình có cấu trúc (Structured Programming)</strong>, chứng minh rằng từ khóa <code>goto</code> hoàn toàn có thể bị loại bỏ vĩnh viễn khỏi các ngôn ngữ lập trình bậc cao mà không làm mất đi sức mạnh tính toán.</p>
          </div>
        </details>
      `
    },
    {
      id: 'sec-2',
      title: 'Edsger Dijkstra và Lá thư lịch sử "GOTO Considered Harmful" (1968)',
      badge: 'Lịch sử máy tính',
      content: `
        <p>Năm 1968, nhà khoa học máy tính huyền thoại Edsger W. Dijkstra đã gửi một lá thư ngắn nhưng chấn động toàn cầu tới tạp chí <em>Communications of the ACM</em> với tựa đề: <em>"A Case against the GO TO Statement"</em> (sau đó được biên tập viên đổi tên thành <strong>"Go To Statement Considered Harmful"</strong>).</p>
        <p>Lập luận cốt tử của Dijkstra:</p>
        <blockquote>
          "Tâm trí con người rất giỏi suy luận về các quá trình tĩnh (tại chỗ), nhưng lại cực kỳ kém cỏi trong việc hình dung các quá trình động nhảy vọt theo thời gian. Lệnh GOTO phá hủy mối quan hệ tương ứng trực quan giữa văn bản code (trên trang giấy) và tiến trình thực thi thực tế (trong bộ nhớ máy tính)."
        </blockquote>
        <p>Nhờ Dijkstra, các thế hệ ngôn ngữ lập trình hiện đại như Python được thiết kế với quyết định dứt khoát: <strong>Hoàn toàn không hỗ trợ lệnh <code>goto</code></strong>!</p>
      `
    },
    {
      id: 'sec-3',
      title: 'Nguyên lý SESE (Single-Entry, Single-Exit) trên Flowchart',
      badge: 'Chuẩn thiết kế',
      content: `
        <p>Để đảm bảo một Flowchart tuân thủ đúng chuẩn lập trình có cấu trúc, mỗi khối module con (dù là if hay while) đều phải thỏa mãn quy tắc <strong>SESE (Một cửa vào, Một cửa ra)</strong>:</p>
        <ul>
          <li>Mọi nhánh rẽ bên trong cấu trúc đều phải hội tụ lại tại một điểm nút duy nhất trước khi rời khỏi khối.</li>
          <li>Không được có bất kỳ mũi tên nào nhảy tắt từ bên ngoài đâm thẳng vào giữa thân của một vòng lặp.</li>
          <li>Không có đường cắt chéo (unstructured cross-jumps).</li>
        </ul>
      `
    }
  ],

  callouts: [
    {
      type: 'tip',
      title: 'Vì sao Python không có GOTO?',
      content: 'Guido van Rossum (cha đẻ Python) chủ trương sự rõ ràng và dễ bảo trì ("Readability counts"). Việc loại bỏ goto và áp dụng thụt lề bắt buộc (indentation) ép mọi lập trình viên Python phải viết mã tuân thủ tuyệt đối định lý Böhm–Jacopini.'
    }
  ],

  exercises: [
    {
      title: 'Bài tập: Biến đổi mã giả có GOTO thành cấu trúc while',
      description: 'Chuyển đoạn mã giả cổ điển dùng nhãn (Label) và GOTO sau đây thành mã Python có cấu trúc chuẩn:',
      initialCode: `# Mã giả cổ điển thập niên 1970:
# 10: i = 1
# 20: PRINT i
# 30: i = i + 1
# 40: IF i <= 5 GOTO 20
# 50: END
`,
      solution: `# Chuyển đổi thành cấu trúc Iteration chuẩn Böhm-Jacopini trong Python:
i = 1
while i <= 5:
    print(i)
    i += 1
`
    }
  ],

  quiz: [
    {
      question: 'Định lý Böhm–Jacopini (1966) đã chứng minh điều gì?',
      options: [
        'Ngôn ngữ máy tính nào có tốc độ xử lý nhanh nhất.',
        'Mọi thuật toán đều có thể được biểu diễn chỉ bằng 3 cấu trúc cơ bản: Tuần tự, Rẽ nhánh và Lặp.',
        'Lệnh GOTO là thành phần bắt buộc của máy tính Turing.',
        'Độ phức tạp của thuật toán luôn tỷ lệ thuận với số dòng code.'
      ],
      correctIndex: 1,
      explanation: 'Định lý Böhm–Jacopini chứng minh rằng 3 cấu trúc (Sequence, Selection, Iteration) là đầy đủ về mặt chức năng để mô tả bất kỳ thuật toán khả tính nào, mở đường cho việc loại bỏ hoàn toàn goto.'
    }
  ],

  summary: 'Định lý Böhm–Jacopini và bài luận của Dijkstra đã vĩnh viễn định hình nền công nghiệp phần mềm hiện đại. Loại bỏ các bước nhảy tự do và tuân thủ nguyên lý SESE (Một cửa vào, Một cửa ra) bảo đảm mã nguồn luôn trong sáng, an toàn và dễ chứng minh tính đúng đắn.'
};
