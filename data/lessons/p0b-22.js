export default {
  id: 'p0b-22',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B3.7',
  title: 'Máy trạng thái hữu hạn (FSM) và Các họ sơ đồ thuật toán',
  subtitle: 'Vượt qua giới hạn của Flowchart: Mô hình hóa Finite State Machine, State Diagram, UML Activity, Swimlane và Data Flow Diagram (DFD)',
  level: 'Chuyên sâu',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nhận biết chính xác giới hạn của Flowchart truyền thống khi đối mặt với các hệ thống hướng sự kiện (Event-driven).',
    'Làm chủ mô hình Máy trạng thái hữu hạn (Finite State Machine - FSM) và Biểu đồ chuyển trạng thái (State Diagram).',
    'Cài đặt Máy trạng thái tinh tế và hiện đại trong Python bằng cấu trúc `match...case`.',
    'Phân biệt rõ ràng vai trò của 5 họ sơ đồ kiến trúc: Flowchart, State Diagram, UML Activity, Swimlane và DFD.'
  ],

  intuition: {
    title: 'Cửa xoay soát vé tàu điện ngầm và Đèn giao thông ngã tư',
    metaphor: 'Một chiếc cửa xoay ở ga tàu điện ngầm không chạy từ dòng lệnh 1 đến dòng lệnh 10 rồi tắt ngấm. Nó đứng yên đó suốt 24/7 ở một trong hai "Trạng thái" (State): Khóa (LOCKED) hoặc Mở (UNLOCKED). Khi bạn quẹt thẻ (Sự kiện COIN/CARD), nó chuyển từ Khóa sang Mở. Khi bạn đẩy tay quay bước qua (Sự kiện PUSH), nó chuyển từ Mở về lại Khóa. Đây chính là Máy trạng thái hữu hạn (FSM). Nếu bạn cố vẽ cửa soát vé bằng Flowchart tuần tự, bạn sẽ tạo ra một mớ bòng bong! Nhưng với Biểu đồ trạng thái, nó hiện ra trong sáng chỉ với 2 vòng tròn và 2 mũi tên cong.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">FSM CỬA XOAY SOÁT VÉ (TURNSTILE STATE MACHINE)</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:30px;">
          <div style="padding:14px;border:2px solid var(--danger-text);border-radius:50%;background:var(--bg-surface);text-align:center;width:90px;height:90px;display:flex;flex-direction:column;justify-content:center;align-items:center;">
            <strong style="color:var(--danger-text);">LOCKED</strong>
            <span style="font-size:0.65rem;color:var(--text-muted);">(Đang khóa)</span>
          </div>
          <div style="font-size:0.8rem;text-align:center;color:var(--text-secondary);">
            Quẹt thẻ ➔<br/>
            ⬅ Đẩy qua
          </div>
          <div style="padding:14px;border:2px solid #10b981;border-radius:50%;background:var(--bg-surface);text-align:center;width:90px;height:90px;display:flex;flex-direction:column;justify-content:center;align-items:center;">
            <strong style="color:#10b981;">UNLOCKED</strong>
            <span style="font-size:0.65rem;color:var(--text-muted);">(Đã mở)</span>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Khái niệm Máy trạng thái hữu hạn (FSM)',
      badge: 'Mô hình hóa toán học',
      content: `
        <details class="deep-dive-details" open style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;padding:12px;margin-bottom:16px;">
          <summary style="cursor:pointer;font-weight:bold;color:var(--accent-primary);">Thu gọn / Mở rộng kiến thức Chuyên sâu Tầng 3</summary>
          <div style="margin-top:12px;">
            <p>Một <strong>Finite State Machine (FSM)</strong> được định nghĩa toán học gồm bộ 5 thành phần $(S, S_0, \Sigma, \delta, F)$:</p>
            <ul>
              <li><strong>$S$:</strong> Tập hợp hữu hạn các Trạng thái (ví dụ: Chờ, Đang nấu, Hoàn tất, Lỗi).</li>
              <li><strong>$S_0$:</strong> Trạng thái khởi đầu.</li>
              <li><strong>$\Sigma$:</strong> Tập hợp các Sự kiện đầu vào (Inputs/Events).</li>
              <li><strong>$\delta$:</strong> Hàm chuyển trạng thái: $S \times \Sigma \to S$.</li>
              <li><strong>$F$:</strong> Tập hợp các trạng thái kết thúc (nếu có).</li>
            </ul>
            <p>Khác với Flowchart (tập trung vào <em>hành động làm cái gì</em>), State Machine tập trung vào <em>hệ thống đang ở đâu và phản ứng thế nào với ngoại cảnh</em>.</p>
          </div>
        </details>
      `
    },
    {
      id: 'sec-2',
      title: 'Hiện thực hóa FSM trong Python hiện đại với match...case',
      badge: 'Pythonic Pattern',
      content: `
        <p>Cú pháp Structural Pattern Matching (<code>match...case</code>) của Python là công cụ lý tưởng nhất để hiện thực hóa máy trạng thái hữu hạn:</p>
      `,
      codeExamples: [
        {
          title: 'Cài đặt FSM cửa soát vé tàu điện ngầm',
          code: `class TurnstileFSM:
    def __init__(self):
        self.state = "LOCKED"

    def on_event(self, event):
        match (self.state, event):
            case ("LOCKED", "COIN"):
                self.state = "UNLOCKED"
                print("-> Nhận xu/thẻ: Mở khóa chốt quay!")
            case ("LOCKED", "PUSH"):
                print("-> Cảnh báo: Cửa đang khóa, không được xô đẩy!")
            case ("UNLOCKED", "PUSH"):
                self.state = "LOCKED"
                print("-> Khách đã đi qua: Khóa chốt lại!")
            case ("UNLOCKED", "COIN"):
                print("-> Cửa đã mở sẵn rồi, không cần quẹt thêm!")
            case _:
                print("-> Sự kiện không hợp lệ!")

gate = TurnstileFSM()
gate.on_event("PUSH")  # Cảnh báo
gate.on_event("COIN")  # Mở khóa chốt
gate.on_event("PUSH")  # Khóa lại an toàn`
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Bản đồ 5 Họ Sơ Đồ trong Kỹ thuật Phần mềm',
      badge: 'Toàn cảnh kiến trúc',
      content: `
        <p>Một kỹ sư cấp cao phải biết chọn đúng loại sơ đồ cho đúng ngữ cảnh bài toán:</p>
        <div class="table-responsive">
          <table class="lesson-table">
          <thead>
            <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);">
              <th style="padding:6px;border:1px solid var(--border-subtle);">Họ sơ đồ</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">Mục đích chính</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">Khi nào nên dùng?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);font-weight:bold;">Flowchart</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Mô tả thuật toán tính toán từng bước</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Khi logic có đầu vào, các phép toán tuần tự và đầu ra rõ ràng</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);font-weight:bold;">State Diagram</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Mô tả vòng đời và biến đổi trạng thái</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Hệ thống hướng sự kiện, game, parser cú pháp, giao thức mạng</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);font-weight:bold;">Swimlane Diagram</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Phân định ranh giới trách nhiệm theo làn</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Quy trình tương tác giữa User, Frontend, Backend, Third-party</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);font-weight:bold;">UML Activity</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Luồng nghiệp vụ có chia tách song song</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Hệ thống đa luồng (Multithreading), Fork và Join luồng</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);font-weight:bold;">DFD (Data Flow)</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Theo dõi dòng chảy và kho lưu trữ dữ liệu</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Thiết kế hệ thống thông tin, luồng Pipeline dữ liệu Big Data</td>
            </tr>
          </tbody>
        </table>
        </div>
      `
    }
  ],

  callouts: [
    {
      type: 'tip',
      title: 'Sơ đồ phân làn (Swimlane) trong thiết kế Web',
      content: 'Khi giải thích luồng xác thực đăng nhập (Login Authentication), sơ đồ Swimlane là vua: bạn vẽ 3 cột dọc (Làn Trình duyệt Browser, Làn Máy chủ Web Server, Làn Database). Mỗi bước xử lý nằm ở làn nào sẽ chỉ rõ phía nào chịu trách nhiệm thực thi thao tác đó.'
    }
  ],

  exercises: [
    {
      title: 'Bài tập: Thiết kế máy trạng thái cho Trình phát nhạc',
      description: 'Một trình phát nhạc có 3 trạng thái: STOPPED, PLAYING, PAUSED. Sự kiện bao gồm: PLAY, PAUSE, STOP. Hãy viết code FSM mô tả sự chuyển dịch này.',
      initialCode: `class AudioPlayerFSM:
    def __init__(self):
        self.state = "STOPPED"
        
    def trigger(self, event):
        # Viết match...case xử lý tại đây:
        pass
`,
      solution: `class AudioPlayerFSM:
    def __init__(self):
        self.state = "STOPPED"
        
    def trigger(self, event):
        match (self.state, event):
            case ("STOPPED", "PLAY"):
                self.state = "PLAYING"
            case ("PLAYING", "PAUSE"):
                self.state = "PAUSED"
            case ("PLAYING", "STOP") | ("PAUSED", "STOP"):
                self.state = "STOPPED"
            case ("PAUSED", "PLAY"):
                self.state = "PLAYING"
            case _:
                print(f"Bỏ qua sự kiện {event} khi đang ở trạng thái {self.state}")

player = AudioPlayerFSM()
player.trigger("PLAY")
assert player.state == "PLAYING"
player.trigger("PAUSE")
assert player.state == "PAUSED"
player.trigger("STOP")
assert player.state == "STOPPED"
print("FSM AudioPlayer hoạt động chính xác!")`
    }
  ],

  quiz: [
    {
      question: 'Khi thiết kế một quy trình thanh toán có sự tham gia của 3 bên: Khách hàng, Web Server và Cổng thanh toán Ngân hàng, loại sơ đồ nào là phù hợp nhất?',
      options: [
        'Flowchart tuần tự đơn thuần',
        'Sơ đồ phân làn (Swimlane Diagram)',
        'Cây nhị phân tìm kiếm',
        'Bảng mã ASCII'
      ],
      correctIndex: 1,
      explanation: 'Sơ đồ phân làn (Swimlane) chia không gian thành các cột dọc ứng với từng chủ thể (Khách hàng, Server, Ngân hàng), giúp phân định ranh giới trách nhiệm và các lời gọi API qua lại cực kỳ sáng sủa.'
    }
  ],

  summary: 'Máy trạng thái hữu hạn (FSM) là mô hình chuẩn mực cho các hệ thống hướng sự kiện. Biết cách kết hợp Flowchart, State Diagram, Swimlane và UML Activity giúp kỹ sư làm chủ toàn bộ ngôn ngữ giao tiếp trực quan trong kiến trúc phần mềm hiện đại.'
};
