export default {
  id: 'lp-c5-19',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.19',
  title: 'Tại sao nên dùng Tập hợp? 4 Ứng dụng Thực tế & Tình huống Nhân sự',
  subtitle: '4 ứng dụng cốt lõi: khử trùng lặp, tìm khác biệt, so sánh bằng không thứ tự, duyệt đồ thị và case study nhân sự',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thực hành 4 ứng dụng thực tế phổ biến nhất của tập hợp trong lập trình Python hàng ngày.',
    'Sử dụng idiom list(set(L)) để khử trùng lặp danh sách và hiểu sự đánh đổi về thứ tự phần tử.',
    'Thực hiện so sánh bằng không phụ thuộc thứ tự (order-neutral equality) giữa hai bộ dữ liệu bằng set() và sorted().',
    'Hiểu lý do tập hợp vượt trội so với danh sách (tốc độ O(1) vs O(N)) khi theo dõi trạng thái duyệt đồ thị tránh lặp vô hạn.',
    'Áp dụng toàn diện các toán tử tập hợp (in, &, |, -, ^, <, >) trong bài toán quản lý nhân sự thực tế.'
  ],

  intuition: {
    title: 'Bộ lọc danh sách khách mời và cuộc họp giao ban',
    metaphor: 'Tưởng tượng bạn tổ chức một sự kiện và nhận được danh sách khách mời từ nhiều nguồn: một người có thể đăng ký 3 lần và tên được điền lộn xộn. Bạn không thể ngồi dò từng dòng bằng mắt. Chỉ cần đổ danh sách vào một tập hợp set, mọi tên trùng lập tức biến mất trong chớp mắt! Sau đó, công ty muốn biết ai kiêm nhiệm cả chức danh kỹ sư lẫn quản lý phòng ban: thay vì viết 2 vòng lặp lồng nhau quét hàng ngàn nhân viên, bạn chỉ cần đặt dấu & (giao) giữa hai tập hợp. Kết quả trả về ngay trong tích tắc, vừa sáng rõ vừa không tốn tài nguyên máy tính.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">NGHIÊN CỨU TÌNH HUỐNG NHÂN SỰ VỚI PHÉP TOÁN TẬP HỢP</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">Kỹ sư (engineers)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">{'pat', 'ann', 'bob', 'sue'}</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);">Quản lý (managers)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">{'sue', 'tom'}</div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--bg-surface);border-radius:6px;font-size:0.8rem;">
          <span>Vừa kỹ sư vừa quản lý (<code>&amp;</code>): <strong>{'sue'}</strong></span>
          <span>Chỉ thuộc 1 nhóm (<code>^</code>): <strong>{'ann', 'bob', 'pat', 'tom'}</strong></span>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Bốn Ứng dụng Thực tế Phổ biến của Tập hợp',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 33 / 38 – Trang 35 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Các thao tác tập hợp có rất nhiều ứng dụng phổ biến, mang tính thực tế đời sống kỹ thuật hơn là toán học lý thuyết:</p>
        
        <h4>Ứng dụng 1: Loại bỏ các phần tử trùng lặp (Deduplication)</h4>
        <p>Vì các phần tử chỉ được lưu trữ một lần duy nhất, tập hợp là công cụ nhanh nhất để lọc phần tử trùng ra khỏi danh sách: <code>list(set(L))</code>. Tuy nhiên bạn phải chấp nhận sự đánh đổi: thứ tự xuất hiện ban đầu có thể bị xáo trộn vì tập hợp không duy trì thứ tự chèn.</p>

        <h4>Ứng dụng 2: Tách biệt các điểm khác biệt (Differences)</h4>
        <p>Tập hợp giúp so sánh hai bộ dữ liệu để tìm ra những mục chỉ có ở một bên bằng phép hiệu <code>-</code> (trên danh sách, chuỗi, hay cấu trúc hỗn hợp).</p>

        <h4>Ứng dụng 3: So sánh bằng không phụ thuộc thứ tự (Order-neutral equality)</h4>
        <p>Hai tập hợp bằng nhau khi và chỉ khi mọi phần tử của tập này đều có trong tập kia, bất kể thứ tự. Bạn có thể dùng <code>set(L1) == set(L2)</code> để so sánh đầu ra của hai tiến trình độc lập mà không cần phải gọi hàm <code>sorted()</code> tốn kém chi phí tính toán O(N log N).</p>

        <h4>Ứng dụng 4: Theo dõi trạng thái đã ghé thăm khi duyệt đồ thị (Graph Traversal)</h4>
        <p>Khi duyệt qua một đồ thị, cây kế thừa lớp, hoặc cấu trúc tuần hoàn (cyclic structure), bạn cần ghi nhớ các nút đã đi qua để tránh vòng lặp vô hạn. Dùng danh sách để tìm kiếm đòi hỏi quét tuyến tính <code>O(N)</code> rất chậm; trong khi tập hợp cho phép kiểm tra <code>node in visited</code> với tốc độ tức thì <strong><code>O(1)</code></strong> nhờ cấu trúc bảng băm.</p>
      `,
      codeExamples: [
        {
          title: 'Khử trùng lặp, tìm khác biệt và so sánh bằng không thứ tự',
          code: `>>> L = [1, 2, 1, 3, 2, 4, 5]
>>> L = list(set(L))                                   # Loại bỏ các phần tử trùng lặp
>>> L
[1, 2, 3, 4, 5]
>>> set([1, 3, 5, 7]) - set([1, 2, 4, 5, 6])          # Tìm điểm khác biệt giữa 2 list
{3, 7}
>>> set('abcdefg') - set('abdghij')                    # Tìm điểm khác biệt giữa 2 chuỗi
{'c', 'e', 'f'}
>>> L1, L2 = [1, 3, 5, 2, 4], [2, 5, 3, 4, 1]
>>> L1 == L2                                           # Thứ tự có ý nghĩa trong list -> False
False
>>> set(L1) == set(L2)                                 # So sánh bằng không phụ thuộc thứ tự!
True`,
          output: `[1, 2, 3, 4, 5]
{3, 7}
{'c', 'e', 'f'}
False
True`,
          annotations: [
            { line: 2, text: 'list(set(L)) lọc sạch các số 1 và 2 bị trùng lặp.' },
            { line: 5, text: 'Phép hiệu tìm ra số 3 và 7 chỉ xuất hiện ở danh sách thứ nhất.' },
            { line: 10, text: 'set(L1) == set(L2) khẳng định hai danh sách chứa cùng tập hợp phần tử.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Nghiên cứu Tình huống Thực tế: Quản lý Nhân sự',
      content: `
        <p>Để minh họa sức mạnh thực tế của các toán tử tập hợp, Mark Lutz đưa ra một ví dụ về nhân sự trong một công ty giả định:</p>
      `,
      codeExamples: [
        {
          title: 'Bài toán quản lý nhân sự với kỹ sư và quản lý',
          code: `>>> engineers = {'pat', 'ann', 'bob', 'sue'}
>>> managers = {'sue', 'tom'}
>>> 'pat' in engineers                                 # pat có phải là kỹ sư không?
True
>>> engineers & managers                               # Ai vừa là kỹ sư vừa là quản lý?
{'sue'}
>>> engineers | managers                               # Tất cả những người thuộc một trong hai nhóm
{'ann', 'sue', 'pat', 'tom', 'bob'}
>>> engineers - managers                               # Những kỹ sư không phải là quản lý
{'pat', 'ann', 'bob'}
>>> managers - engineers                               # Những quản lý không phải là kỹ sư
{'tom'}
>>> engineers > managers                               # Mọi quản lý đều là kỹ sư? (superset)
False
>>> {'sue', 'bob'} < engineers                         # Cả hai đều là kỹ sư? (subset)
True
>>> (managers | engineers) > managers                  # Tập hợp tất cả mọi người là tập cha của quản lý
True
>>> managers ^ engineers                               # Ai chỉ thuộc một nhóm chứ không thuộc cả hai?
{'ann', 'pat', 'tom', 'bob'}`,
          output: `True
{'sue'}
{'ann', 'sue', 'pat', 'tom', 'bob'}
{'pat', 'ann', 'bob'}
{'tom'}
False
True
True
{'ann', 'pat', 'tom', 'bob'}`,
          annotations: [
            { line: 5, text: 'engineers & managers tìm thấy "sue" kiêm nhiệm cả hai vai trò.' },
            { line: 7, text: 'engineers | managers gom toàn bộ nhân sự công ty thành một danh sách duy nhất.' },
            { line: 9, text: 'Phép hiệu loại bỏ quản lý sue để lấy kỹ sư chuyên trách.' },
            { line: 17, text: 'Toán tử ^ lọc ra những ai chỉ làm kỹ sư hoặc chỉ làm quản lý.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Bảo toàn thứ tự khi khử trùng lặp trong Python 3.7+',
        content: `
          <p>Vì <code>list(set(L))</code> làm mất thứ tự ban đầu, trong Python hiện đại nếu bạn muốn vừa khử trùng lặp vừa bảo toàn thứ tự xuất hiện ban đầu, hãy sử dụng <code>dict.fromkeys(L)</code>:</p>
          <pre class="code-block"><code>L = ['b', 'a', 'b', 'c', 'a']
unique_ordered = list(dict.fromkeys(L))   # Cho ra: ['b', 'a', 'c']</code></pre>
          <p>Cách này tận dụng tính chất bảo toàn thứ tự chèn của từ điển từ Python 3.7+.</p>
        `
      }
    ]
  },

  exercises: [
    {
      title: 'Phân tích kỹ năng ứng viên tuyển dụng',
      level: 'Dễ',
      problem: 'Một vị trí tuyển dụng yêu cầu tập hợp kỹ năng: <code>yeu_cau = {"Python", "SQL", "Git", "Docker"}</code>. Ứng viên A có các kỹ năng: <code>ung_vien = {"Python", "Git", "Java"}</code>. Hãy dùng toán tử tập hợp để tìm: 1) Các kỹ năng ứng viên còn thiếu; 2) Các kỹ năng phù hợp yêu cầu.',
      hint: 'Kỹ năng còn thiếu = yeu_cau - ung_vien; Kỹ năng phù hợp = yeu_cau & ung_vien.',
      solutionCode: `yeu_cau = {"Python", "SQL", "Git", "Docker"}
ung_vien = {"Python", "Git", "Java"}

con_thieu = yeu_cau - ung_vien
phu_hop = yeu_cau & ung_vien

print("Kỹ năng còn thiếu:", con_thieu)
print("Kỹ năng phù hợp yêu cầu:", phu_hop)`,
      solutionOutput: `Kỹ năng còn thiếu: {'Docker', 'SQL'}
Kỹ năng phù hợp yêu cầu: {'Git', 'Python'}`,
      explanation: 'Phép hiệu <code>yeu_cau - ung_vien</code> trả về {\'Docker\', \'SQL\'}. Phép giao <code>yeu_cau &amp; ung_vien</code> trả về {\'Git\', \'Python\'}.'
    }
  ],

  quiz: [
    {
      question: 'Khi sử dụng cú pháp L = list(set(L)) để loại bỏ các phần tử trùng lặp trong danh sách, điều gì cần lưu ý?',
      options: [
        'Danh sách chỉ có thể chứa các số nguyên, không chứa được chuỗi.',
        'Thứ tự ban đầu của các phần tử có thể bị xáo trộn vì tập hợp không có thứ tự vị trí.',
        'Các phần tử bị trùng lặp sẽ chuyển thành None.',
        'Hàm chỉ hoạt động nếu danh sách đã được sắp xếp trước.'
      ],
      correctIndex: 1,
      explanation: 'Tập hợp không duy trì thứ tự chèn. Do đó chuyển danh sách qua set rồi chuyển lại list có thể làm mất thứ tự ban đầu của các phần tử.'
    },
    {
      question: 'Tại sao nên dùng tập hợp (set) thay vì danh sách (list) để theo dõi các nút đã ghé thăm (visited) trong thuật toán duyệt đồ thị?',
      options: [
        'Vì tập hợp tự động sắp xếp các nút theo thứ tự bảng chữ cái.',
        'Vì kiểm tra thành viên "node in visited" trong tập hợp tốn thời gian tức thì O(1), trong khi danh sách tốn O(N).',
        'Vì danh sách không thể lưu trữ các chuỗi ký tự.',
        'Vì tập hợp tự động xóa các nút cũ sau 10 giây.'
      ],
      correctIndex: 1,
      explanation: 'Tập hợp sử dụng bảng băm cho phép kiểm tra thành viên với độ phức tạp thời gian trung bình O(1), vượt trội hoàn toàn so với việc quét tuyến tính O(N) của danh sách.'
    }
  ],

  summary: [
    'Tập hợp là công cụ khử trùng lặp danh sách siêu tốc bằng cú pháp list(set(L)).',
    'Phép hiệu (-) giúp bóc tách các điểm khác biệt giữa hai bộ dữ liệu một cách trực quan.',
    'set(L1) == set(L2) cho phép kiểm tra tính tương đương về mặt nội dung không phụ thuộc thứ tự.',
    'Tra cứu "item in set" đạt tốc độ O(1), lý tưởng cho việc đánh dấu trạng thái duyệt đồ thị tránh lặp vô hạn.',
    'Các toán tử &, |, -, ^ cho phép xử lý quan hệ dữ liệu nhân sự, quyền hạn và phân tích tập hợp cực kỳ thanh lịch.'
  ]
};