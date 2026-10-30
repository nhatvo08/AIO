export default {
  id: 'p2-07',
  partId: 'part-2',
  partTitle: 'Phần 2 – Phương thức của str (Trung cấp)',
  number: '2.7',
  title: 'Bảng tra cứu đầy đủ 47 phương thức public của str (Đối chiếu dir(str) Python 3.14)',
  subtitle: 'Bản đồ tổng thể 47 phương thức chuẩn chia theo 8 nhóm chức năng và cẩm nang chọn công cụ tối ưu trong thực tế',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: 'method-explorer',

  objectives: [
    'Kiểm chứng và nắm trọn danh sách chính xác 47 phương thức public của lớp str thông qua hàm nội quan dir(str) trên Python 3.14.8.',
    'Hệ thống hóa toàn bộ 47 phương thức vào 8 nhóm chức năng kèm cú pháp, kiểu trả về và độ phức tạp.',
    'Nắm vững quy tắc chọn phương thức tối ưu trong thực tế (khi nào dùng toán tử in, khi nào dùng partition thay cho split, khi nào dùng removeprefix thay cho lstrip...).',
    'Kết hợp nhuần nhuyễn nhiều phương thức (method chaining) để xây dựng đường ống xử lý văn bản (text processing pipeline) sạch và hiệu năng cao.'
  ],

  intuition: {
    title: 'Bộ đồ nghề 47 món được phân ngăn khoa học của nghệ nhân Python',
    metaphor: 'Nếu coi việc xử lý văn bản là nghề chế tác kim hoàn, thì lớp str trang bị sẵn cho bạn một chiếc hộp đồ nghề gồm đúng 47 dụng cụ chính hãng (public methods). Nếu để cả 47 món lộn xộn theo thứ tự bảng chữ cái A-Z như kết quả của dir(str), bạn sẽ rất dễ bối rối khi cần tìm một công cụ. Nhưng khi xếp chúng vào đúng 8 ngăn kéo chuyên dụng (Hoa/thường, Tìm kiếm, Cắt dọn, Tách/ghép, Thay thế, Căn lề, Kiểm tra is*, và Định dạng/Mã hóa), bạn sẽ rút ra đúng món đồ mình cần chỉ trong tích tắc.',
    visualHtml: `
      <div class="table-responsive">
        <table class="lesson-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Nhóm chức năng</th>
              <th>Số lượng</th>
              <th>Danh sách phương thức thuộc nhóm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><strong>Chữ hoa / thường</strong></td>
              <td>6</td>
              <td><code>upper</code>, <code>lower</code>, <code>capitalize</code>, <code>title</code>, <code>swapcase</code>, <code>casefold</code></td>
            </tr>
            <tr>
              <td>2</td>
              <td><strong>Tìm kiếm & Đếm</strong></td>
              <td>7</td>
              <td><code>find</code>, <code>rfind</code>, <code>index</code>, <code>rindex</code>, <code>count</code>, <code>startswith</code>, <code>endswith</code></td>
            </tr>
            <tr>
              <td>3</td>
              <td><strong>Cắt dọn biên chuỗi</strong></td>
              <td>5</td>
              <td><code>strip</code>, <code>lstrip</code>, <code>rstrip</code>, <code>removeprefix</code>, <code>removesuffix</code></td>
            </tr>
            <tr>
              <td>4</td>
              <td><strong>Tách & Ghép chuỗi</strong></td>
              <td>6</td>
              <td><code>split</code>, <code>rsplit</code>, <code>splitlines</code>, <code>partition</code>, <code>rpartition</code>, <code>join</code></td>
            </tr>
            <tr>
              <td>5</td>
              <td><strong>Thay thế & Dịch mã</strong></td>
              <td>3</td>
              <td><code>replace</code>, <code>maketrans</code> (static), <code>translate</code></td>
            </tr>
            <tr>
              <td>6</td>
              <td><strong>Căn lề & Hiển thị</strong></td>
              <td>5</td>
              <td><code>center</code>, <code>ljust</code>, <code>rjust</code>, <code>zfill</code>, <code>expandtabs</code></td>
            </tr>
            <tr>
              <td>7</td>
              <td><strong>Kiểm tra đặc tính <code>is*</code></strong></td>
              <td>12</td>
              <td><code>isalnum</code>, <code>isalpha</code>, <code>isascii</code>, <code>isdecimal</code>, <code>isdigit</code>, <code>isidentifier</code>, <code>islower</code>, <code>isnumeric</code>, <code>isprintable</code>, <code>isspace</code>, <code>istitle</code>, <code>isupper</code></td>
            </tr>
            <tr>
              <td>8</td>
              <td><strong>Định dạng & Mã hóa</strong></td>
              <td>3</td>
              <td><code>format</code>, <code>format_map</code>, <code>encode</code></td>
            </tr>
            <tr>
              <td colspan="2"><strong>TỔNG CỘNG (Python 3.14.8)</strong></td>
              <td><strong>47</strong></td>
              <td><strong>Toàn bộ phương thức public không bắt đầu bằng dấu <code>_</code> trong <code>dir(str)</code></strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Kiểm chứng 47 phương thức public từ dir(str) trong Python 3.14.8',
      badge: 'Nội quan Python',
      content: `
        <p>Trong Python, hàm tích hợp sẵn <code>dir(str)</code> trả về danh sách toàn bộ các thuộc tính và phương thức của lớp <code>str</code>, bao gồm cả các phương thức đặc biệt (dunder methods như <code>__add__</code>, <code>__len__</code>, <code>__iter__</code>...) và các phương thức public dành cho lập trình viên.</p>
        <p>Khi lọc bỏ các tên bắt đầu bằng dấu gạch dưới <code>'_'</code> bằng biểu thức <code>[m for m in dir(str) if not m.startswith('_')]</code> trên Python 3.14.8, ta thu được <strong>chính xác 47 phương thức public</strong>:</p>
        <ul>
          <li><strong>46 phương thức thể hiện (instance methods):</strong> Gọi trực tiếp trên một đối tượng chuỗi <code>s.method(...)</code>.</li>
          <li><strong>1 phương thức tĩnh (static method):</strong> <code>str.maketrans(...)</code>, thường được gọi trực tiếp từ lớp <code>str</code> để tạo bảng dịch cho <code>s.translate()</code>.</li>
          <li><strong>Đặc tính bất biến xuyên suốt:</strong> Không một phương thức nào trong số 47 phương thức này làm thay đổi chuỗi gốc! Mọi phương thức biến đổi đều trả về một đối tượng <code>str</code> mới (hoặc <code>bytes</code>, <code>list</code>, <code>tuple</code>, <code>dict</code>, <code>int</code>, <code>bool</code>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Trích xuất và thống kê 47 phương thức public của str bằng code Python 3.14',
          code: `public_methods = [name for name in dir(str) if not name.startswith("_")]

print(f"Tổng số phương thức public của str: {len(public_methods)}")

# Chia thành từng dòng 6 phương thức để quan sát
for i in range(0, len(public_methods), 6):
    chunk = public_methods[i:i + 6]
    print("  " + ", ".join(f"{m:13}" for m in chunk))

# Kiểm tra các phương thức bắt đầu bằng 'is' và 'r'
is_methods = [m for m in public_methods if m.startswith("is")]
print(f"\\nSố phương thức nhóm is*: {len(is_methods)} -> {is_methods}")`,
          output: `Tổng số phương thức public của str: 47
  capitalize   , casefold     , center       , count        , encode       , endswith     
  expandtabs   , find         , format       , format_map   , index        , isalnum      
  isalpha      , isascii      , isdecimal    , isdigit      , isidentifier , islower      
  isnumeric    , isprintable  , isspace      , istitle      , isupper      , join         
  ljust        , lower        , lstrip       , maketrans    , partition    , removeprefix 
  removesuffix , replace      , rfind        , rindex       , rjust        , rpartition   
  rsplit       , rstrip       , split        , splitlines   , startswith   , strip        
  swapcase     , title        , translate    , upper        , zfill        

Số phương thức nhóm is*: 12 -> ['isalnum', 'isalpha', 'isascii', 'isdecimal', 'isdigit', 'isidentifier', 'islower', 'isnumeric', 'isprintable', 'isspace', 'istitle', 'isupper']`,
          annotations: [
            { line: 1, text: 'Lọc tất cả các tên thuộc tính trong dir(str) không bắt đầu bằng dấu gạch dưới "_".' },
            { line: 3, text: 'Con số 47 giữ nguyên ổn định từ Python 3.9 (khi thêm removeprefix/removesuffix) đến Python 3.14.8.' },
            { line: 11, text: 'Nhóm is* chiếm 12/47 phương thức (hơn 1/4 tổng số phương thức của str).' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Bảng tổng hợp đầy đủ 47 phương thức của str chia theo 8 nhóm',
      badge: 'Bảng tra cứu toàn diện',
      content: `
        <p>Dưới đây là bảng tra cứu toàn diện 47 phương thức public của <code>str</code> trong Python 3.14.8, được sắp xếp theo 8 nhóm chức năng để bạn tra cứu nhanh cú pháp, kiểu trả về và công dụng cốt lõi (bạn cũng có thể dùng công cụ tương tác <strong>Method Explorer</strong> ở trên để lọc và tìm kiếm tức thì):</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nhóm</th>
                <th>Cú pháp đầy đủ</th>
                <th>Kiểu trả về</th>
                <th>Mô tả ngắn gọn & Lưu ý</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Hoa/Thường</td><td><code>s.upper()</code></td><td><code>str</code></td><td>Chuyển mọi ký tự cased sang chữ HOA.</td></tr>
              <tr><td>2</td><td>Hoa/Thường</td><td><code>s.lower()</code></td><td><code>str</code></td><td>Chuyển mọi ký tự cased sang chữ thường chuẩn hiển thị.</td></tr>
              <tr><td>3</td><td>Hoa/Thường</td><td><code>s.capitalize()</code></td><td><code>str</code></td><td>Viết hoa ký tự ở index 0, toàn bộ phần còn lại viết thường.</td></tr>
              <tr><td>4</td><td>Hoa/Thường</td><td><code>s.title()</code></td><td><code>str</code></td><td>Viết hoa chữ cái đầu mỗi cụm chữ cái liên tiếp.</td></tr>
              <tr><td>5</td><td>Hoa/Thường</td><td><code>s.swapcase()</code></td><td><code>str</code></td><td>Đảo chữ hoa thành thường và chữ thường thành hoa.</td></tr>
              <tr><td>6</td><td>Hoa/Thường</td><td><code>s.casefold()</code></td><td><code>str</code></td><td>Hạ chữ thường triệt để (Unicode folding) để so sánh không phân biệt hoa/thường.</td></tr>
              <tr><td>7</td><td>Tìm kiếm</td><td><code>s.find(sub[, start[, end]])</code></td><td><code>int</code></td><td>Chỉ số đầu tiên của <code>sub</code> từ trái; trả về <code>-1</code> nếu không thấy.</td></tr>
              <tr><td>8</td><td>Tìm kiếm</td><td><code>s.rfind(sub[, start[, end]])</code></td><td><code>int</code></td><td>Chỉ số cao nhất của <code>sub</code> từ phải; trả về <code>-1</code> nếu không thấy.</td></tr>
              <tr><td>9</td><td>Tìm kiếm</td><td><code>s.index(sub[, start[, end]])</code></td><td><code>int</code></td><td>Giống <code>find()</code> nhưng ném <code>ValueError</code> nếu không thấy.</td></tr>
              <tr><td>10</td><td>Tìm kiếm</td><td><code>s.rindex(sub[, start[, end]])</code></td><td><code>int</code></td><td>Giống <code>rfind()</code> nhưng ném <code>ValueError</code> nếu không thấy.</td></tr>
              <tr><td>11</td><td>Tìm kiếm</td><td><code>s.count(sub[, start[, end]])</code></td><td><code>int</code></td><td>Đếm số lần xuất hiện không chồng lấp của <code>sub</code>.</td></tr>
              <tr><td>12</td><td>Tìm kiếm</td><td><code>s.startswith(prefix[, start[, end]])</code></td><td><code>bool</code></td><td>Kiểm tra tiền tố (nhận <code>str</code> hoặc <code>tuple[str, ...]</code>).</td></tr>
              <tr><td>13</td><td>Tìm kiếm</td><td><code>s.endswith(suffix[, start[, end]])</code></td><td><code>bool</code></td><td>Kiểm tra hậu tố (nhận <code>str</code> hoặc <code>tuple[str, ...]</code>).</td></tr>
              <tr><td>14</td><td>Cắt dọn</td><td><code>s.strip(chars=None)</code></td><td><code>str</code></td><td>Xóa tập ký tự <code>chars</code> (mặc định: khoảng trắng) ở cả 2 biên.</td></tr>
              <tr><td>15</td><td>Cắt dọn</td><td><code>s.lstrip(chars=None)</code></td><td><code>str</code></td><td>Xóa tập ký tự <code>chars</code> ở biên trái.</td></tr>
              <tr><td>16</td><td>Cắt dọn</td><td><code>s.rstrip(chars=None)</code></td><td><code>str</code></td><td>Xóa tập ký tự <code>chars</code> ở biên phải.</td></tr>
              <tr><td>17</td><td>Cắt dọn</td><td><code>s.removeprefix(prefix)</code></td><td><code>str</code></td><td>Cắt bỏ đúng 1 lần chuỗi con <code>prefix</code> ở đầu nếu khớp.</td></tr>
              <tr><td>18</td><td>Cắt dọn</td><td><code>s.removesuffix(suffix)</code></td><td><code>str</code></td><td>Cắt bỏ đúng 1 lần chuỗi con <code>suffix</code> ở cuối nếu khớp.</td></tr>
              <tr><td>19</td><td>Tách/Ghép</td><td><code>s.split(sep=None, maxsplit=-1)</code></td><td><code>list[str]</code></td><td>Tách chuỗi từ trái sang phải theo <code>sep</code>.</td></tr>
              <tr><td>20</td><td>Tách/Ghép</td><td><code>s.rsplit(sep=None, maxsplit=-1)</code></td><td><code>list[str]</code></td><td>Tách chuỗi từ phải sang trái (hữu ích khi dùng <code>maxsplit</code>).</td></tr>
              <tr><td>21</td><td>Tách/Ghép</td><td><code>s.splitlines(keepends=False)</code></td><td><code>list[str]</code></td><td>Tách chuỗi theo các ký tự ngắt dòng chuẩn Unicode.</td></tr>
              <tr><td>22</td><td>Tách/Ghép</td><td><code>s.partition(sep)</code></td><td><code>tuple[str, str, str]</code></td><td>Tách thành bộ 3 <code>(head, sep, tail)</code> tại khớp đầu tiên từ trái.</td></tr>
              <tr><td>23</td><td>Tách/Ghép</td><td><code>s.rpartition(sep)</code></td><td><code>tuple[str, str, str]</code></td><td>Tách thành bộ 3 <code>(head, sep, tail)</code> tại khớp cuối cùng từ phải.</td></tr>
              <tr><td>24</td><td>Tách/Ghép</td><td><code>sep.join(iterable)</code></td><td><code>str</code></td><td>Ghép các chuỗi trong <code>iterable</code> ngăn cách bởi <code>sep</code> với chi phí O(n).</td></tr>
              <tr><td>25</td><td>Thay thế</td><td><code>s.replace(old, new, count=-1)</code></td><td><code>str</code></td><td>Thay thế chuỗi con <code>old</code> bằng <code>new</code> (tối đa <code>count</code> lần).</td></tr>
              <tr><td>26</td><td>Thay thế</td><td><code>str.maketrans(x[, y[, z]])</code></td><td><code>dict[int, Any]</code></td><td>Phương thức tĩnh tạo bảng ánh xạ mã Unicode cho <code>translate()</code>.</td></tr>
              <tr><td>27</td><td>Thay thế</td><td><code>s.translate(table)</code></td><td><code>str</code></td><td>Dịch và xóa hàng loạt ký tự trong 1 lần duyệt theo <code>table</code>.</td></tr>
              <tr><td>28</td><td>Căn lề</td><td><code>s.center(width, fillchar=' ')</code></td><td><code>str</code></td><td>Căn giữa trong khung rộng <code>width</code>, đệm bằng <code>fillchar</code>.</td></tr>
              <tr><td>29</td><td>Căn lề</td><td><code>s.ljust(width, fillchar=' ')</code></td><td><code>str</code></td><td>Căn trái trong khung rộng <code>width</code>, đệm phải bằng <code>fillchar</code>.</td></tr>
              <tr><td>30</td><td>Căn lề</td><td><code>s.rjust(width, fillchar=' ')</code></td><td><code>str</code></td><td>Căn phải trong khung rộng <code>width</code>, đệm trái bằng <code>fillchar</code>.</td></tr>
              <tr><td>31</td><td>Căn lề</td><td><code>s.zfill(width)</code></td><td><code>str</code></td><td>Đệm số <code>'0'</code> bên trái cho đủ <code>width</code> (đặt sau dấu <code>+/-</code> nếu có).</td></tr>
              <tr><td>32</td><td>Căn lề</td><td><code>s.expandtabs(tabsize=8)</code></td><td><code>str</code></td><td>Đổi ký tự <code>\\t</code> thành dấu cách căn theo cột dừng bội số của <code>tabsize</code>.</td></tr>
              <tr><td>33</td><td>Kiểm tra is*</td><td><code>s.isdecimal()</code></td><td><code>bool</code></td><td><code>True</code> nếu mọi ký tự là chữ số hệ thập phân (Nd) — an toàn cho <code>int(s)</code>.</td></tr>
              <tr><td>34</td><td>Kiểm tra is*</td><td><code>s.isdigit()</code></td><td><code>bool</code></td><td><code>True</code> nếu mọi ký tự là chữ số (gồm cả <code>isdecimal</code> + số mũ <code>²</code>, <code>①</code>).</td></tr>
              <tr><td>35</td><td>Kiểm tra is*</td><td><code>s.isnumeric()</code></td><td><code>bool</code></td><td><code>True</code> nếu mọi ký tự mang giá trị số (gồm cả <code>isdigit</code> + <code>½</code>, <code>Ⅷ</code>, <code>四</code>).</td></tr>
              <tr><td>36</td><td>Kiểm tra is*</td><td><code>s.isalpha()</code></td><td><code>bool</code></td><td><code>True</code> nếu mọi ký tự là chữ cái Unicode (không khoảng trắng, không số).</td></tr>
              <tr><td>37</td><td>Kiểm tra is*</td><td><code>s.isalnum()</code></td><td><code>bool</code></td><td><code>True</code> nếu mọi ký tự là chữ cái (<code>isalpha</code>) hoặc số (<code>isnumeric</code>).</td></tr>
              <tr><td>38</td><td>Kiểm tra is*</td><td><code>s.isspace()</code></td><td><code>bool</code></td><td><code>True</code> nếu mọi ký tự là khoảng trắng Unicode (<code>' '</code>, <code>'\\t'</code>, <code>'\\n'</code>...).</td></tr>
              <tr><td>39</td><td>Kiểm tra is*</td><td><code>s.islower()</code></td><td><code>bool</code></td><td><code>True</code> nếu có ít nhất 1 chữ cased và mọi chữ cased đều viết thường.</td></tr>
              <tr><td>40</td><td>Kiểm tra is*</td><td><code>s.isupper()</code></td><td><code>bool</code></td><td><code>True</code> nếu có ít nhất 1 chữ cased và mọi chữ cased đều viết HOA.</td></tr>
              <tr><td>41</td><td>Kiểm tra is*</td><td><code>s.istitle()</code></td><td><code>bool</code></td><td><code>True</code> nếu chuỗi tuân thủ quy tắc viết hoa đầu từ của <code>title()</code>.</td></tr>
              <tr><td>42</td><td>Kiểm tra is*</td><td><code>s.isidentifier()</code></td><td><code>bool</code></td><td><code>True</code> nếu chuỗi đúng cú pháp tên định danh Python (kể cả từ khóa).</td></tr>
              <tr><td>43</td><td>Kiểm tra is*</td><td><code>s.isprintable()</code></td><td><code>bool</code></td><td><code>True</code> nếu mọi ký tự đều in được (không chứa <code>\\n</code>, <code>\\t</code>...; <code>""</code> là <code>True</code>).</td></tr>
              <tr><td>44</td><td>Kiểm tra is*</td><td><code>s.isascii()</code></td><td><code>bool</code></td><td><code>True</code> nếu mọi ký tự thuộc bảng ASCII 7-bit U+0000..U+007F (<code>""</code> là <code>True</code>).</td></tr>
              <tr><td>45</td><td>Định dạng/Mã hóa</td><td><code>s.format(*args, **kwargs)</code></td><td><code>str</code></td><td>Nội suy giá trị vào các ô giữ chỗ <code>{}</code> trong chuỗi mẫu.</td></tr>
              <tr><td>46</td><td>Định dạng/Mã hóa</td><td><code>s.format_map(mapping)</code></td><td><code>str</code></td><td>Nội suy trực tiếp từ đối tượng <code>mapping</code> (hỗ trợ <code>__missing__</code>).</td></tr>
              <tr><td>47</td><td>Định dạng/Mã hóa</td><td><code>s.encode(encoding='utf-8', errors='strict')</code></td><td><code>bytes</code></td><td>Mã hóa chuỗi văn bản sang dãy byte theo bảng mã chỉ định.</td></tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Kiểm chứng kiểu trả về của các đại diện từ 8 nhóm phương thức',
          code: `sample = "  python 3.14  "

results = {
    "1. Hoa/Thường (upper)"      : sample.strip().upper(),
    "2. Tìm kiếm (find)"         : sample.find("3.14"),
    "3. Cắt dọn (removeprefix)"  : "https://py.org".removeprefix("https://"),
    "4. Tách/Ghép (partition)"   : "host:8080".partition(":"),
    "5. Thay thế (replace)"      : sample.strip().replace(" ", "_"),
    "6. Căn lề (zfill)"          : "-42".zfill(6),
    "7. Kiểm tra (isdecimal)"    : "2026".isdecimal(),
    "8. Mã hóa (encode)"         : "Py".encode("utf-8"),
}

for group, val in results.items():
    print(f"{group:28} -> {val!r:26} ({type(val).__name__})")`,
          output: `1. Hoa/Thường (upper)        -> 'PYTHON 3.14'              (str)
2. Tìm kiếm (find)           -> 9                          (int)
3. Cắt dọn (removeprefix)    -> 'py.org'                   (str)
4. Tách/Ghép (partition)     -> ('host', ':', '8080')      (tuple)
5. Thay thế (replace)        -> 'python_3.14'              (str)
6. Căn lề (zfill)            -> '-00042'                   (str)
7. Kiểm tra (isdecimal)      -> True                       (bool)
8. Mã hóa (encode)           -> b'Py'                      (bytes)`,
          annotations: [
            { line: 4, text: 'Các nhóm biến đổi, cắt dọn, thay thế và căn lề luôn trả về đối tượng str mới.' },
            { line: 5, text: 'Nhóm tìm kiếm trả về int (find/index/count) hoặc bool (startswith/endswith).' },
            { line: 11, text: 'encode() là phương thức duy nhất trong 47 phương thức trả về kiểu bytes.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Cẩm nang chọn phương thức tối ưu trong thực tế (Decision Guide)',
      badge: 'Tư duy Pythonic',
      content: `
        <p>Biết cả 47 phương thức là điều tuyệt vời, nhưng chọn <strong>đúng công cụ cho đúng bài toán</strong> mới là phẩm chất của lập trình viên Python chuyên nghiệp. Dưới đây là 7 nguyên tắc lựa chọn thực chiến quan trọng nhất:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Bài toán thực tế</th>
                <th>Cách viết KHÔNG tối ưu / Dễ lỗi</th>
                <th>Giải pháp tối ưu chuẩn Python 3.14</th>
                <th>Lý do chọn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kiểm tra chuỗi con có tồn tại không</td>
                <td><code>if s.find("err") != -1:</code></td>
                <td><strong><code>if "err" in s:</code></strong></td>
                <td>Ngắn gọn, đọc như tiếng Anh tự nhiên và tránh bẫy <code>if s.find(...):</code>.</td>
              </tr>
              <tr>
                <td>So sánh 2 chuỗi không phân biệt hoa/thường</td>
                <td><code>a.lower() == b.lower()</code></td>
                <td><strong><code>a.casefold() == b.casefold()</code></strong></td>
                <td>Xử lý chính xác mọi ký tự quốc tế Unicode (như <code>ß == SS</code>).</td>
              </tr>
              <tr>
                <td>Bóc bỏ tiền tố/hậu tố cố định (URL, đuôi file)</td>
                <td><code>fn.rstrip(".py")</code></td>
                <td><strong><code>fn.removesuffix(".py")</code></strong></td>
                <td>Tránh lỗi xóa nhầm ký tự thuộc tên gốc (như <code>copy.py &rarr; co</code>).</td>
              </tr>
              <tr>
                <td>Tách chuỗi làm 2 phần quanh dấu phân cách đầu/cuối</td>
                <td><code>k, v = line.split("=", 1)</code></td>
                <td><strong><code>k, sep, v = line.partition("=")</code></strong></td>
                <td>Không bao giờ văng <code>ValueError</code> khi dòng dữ liệu thiếu dấu <code>"="</code>.</td>
              </tr>
              <tr>
                <td>Tách văn bản nhiều dòng từ file/mạng</td>
                <td><code>text.split("\\n")</code></td>
                <td><strong><code>text.splitlines()</code></strong></td>
                <td>Xử lý sạch cả <code>\\r\\n</code> của Windows và không tạo dòng rỗng thừa ở cuối.</td>
              </tr>
              <tr>
                <td>Xóa hoặc thay thế hàng chục ký tự đơn lẻ</td>
                <td>Gọi <code>.replace()</code> nối tiếp 10 lần</td>
                <td><strong><code>s.translate(str.maketrans(...))</code></strong></td>
                <td>Duyệt chuỗi đúng 1 lần, không tạo các chuỗi trung gian rác.</td>
              </tr>
              <tr>
                <td>Kiểm tra chuỗi số trước khi ép kiểu <code>int(s)</code></td>
                <td><code>if s.isdigit(): int(s)</code></td>
                <td><strong><code>if s.isdecimal(): int(s)</code></strong></td>
                <td><code>isdigit()</code> nhận cả <code>"²"</code> làm <code>int("²")</code> văng lỗi; <code>isdecimal()</code> an toàn 100%.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Xây dựng đường ống (Pipeline) làm sạch và phân tích log thực tế kết hợp 10 phương thức',
          code: `raw_logs = """
  [INFO] 2026-10-21 | user=Nguyen_Van_A | action=LOGIN | latency=45ms  
  [ERROR] 2026-10-21 | user=ADMIN_ROOT | action=UPLOAD_FILE | file=report_copy.py | latency=1200ms
  # Dòng ghi chú hệ thống cần bỏ qua
"""

for line in raw_logs.strip().splitlines():
    clean = line.strip()
    if not clean or clean.startswith("#"):
        continue
    
    # Bóc mức log [INFO] / [ERROR] và tách các trường bằng split("|")
    level_part, _, rest = clean.partition(" ")
    level = level_part.strip("[]")
    
    fields = {}
    for item in rest.split("|"):
        k, sep, v = item.strip().partition("=")
        if sep:
            fields[k] = v
            
    user = fields.get("user", "").casefold()
    latency_str = fields.get("latency", "").removesuffix("ms")
    latency = int(latency_str) if latency_str.isdecimal() else -1
    
    print(f"Level: {level:5} | User: {user:12} | Latency: {str(latency).rjust(4)} ms")`,
          output: `Level: INFO  | User: nguyen_van_a | Latency:   45 ms
Level: ERROR | User: admin_root   | Latency: 1200 ms`,
          annotations: [
            { line: 7, text: 'Kết hợp strip().splitlines() để lấy danh sách các dòng văn bản sạch.' },
            { line: 9, text: 'startswith("#") giúp bỏ qua các dòng comment nhanh chóng.' },
            { line: 13, text: 'partition(" ") tách từ đầu tiên ([INFO]) ra khỏi phần còn lại của dòng.' },
            { line: 23, text: 'removesuffix("ms") kết hợp isdecimal() giúp trích xuất số nguyên 45 và 1200 an toàn tuyệt đối.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Lạm dụng biểu thức chính quy (Regex) cho những tác vụ str đã hỗ trợ sẵn',
        content: 'Nhiều người dùng <code>re.sub()</code> hoặc <code>re.split()</code> cho những phép kiểm tra tiền tố, cắt đuôi file hoặc tách dòng đơn giản. Các phương thức tích hợp sẵn của <code>str</code> như <code>startswith()</code>, <code>removesuffix()</code>, <code>partition()</code> hay <code>translate()</code> được tối ưu trực tiếp bằng C và thường nhanh hơn Regex từ <strong>3 đến 10 lần</strong>!'
      },
      {
        title: 'Quên thứ tự thực thi khi nối chuỗi phương thức (Method Chaining)',
        content: 'Khi viết <code>s.removeprefix("ID:").strip()</code>, nếu chuỗi gốc có khoảng trắng ở đầu như <code>"  ID: 100"</code> thì <code>removeprefix("ID:")</code> chạy trước sẽ không khớp! Hãy luôn đặt <code>.strip()</code> ở đầu chuỗi xử lý: <code>s.strip().removeprefix("ID:").strip()</code>.'
      }
    ],
    tips: [
      {
        title: 'Tra cứu nhanh tài liệu của bất kỳ phương thức nào ngay trong terminal',
        content: 'Khi quên thứ tự tham số của một phương thức (ví dụ <code>str.maketrans</code> hay <code>str.rpartition</code>), bạn không cần mở trình duyệt mà chỉ cần gõ <code>python -c "help(str.rpartition)"</code> để xem docstring chuẩn từ Python 3.14.'
      }
    ],
    deepDive: {
      title: 'Tại sao lớp str không có phương thức reverse() như list?',
      content: `
        <p>Khi nhìn vào danh sách 47 phương thức của <code>str</code>, nhiều người thắc mắc tại sao không có <code>s.reverse()</code> hay <code>s.sort()</code>. Có hai lý do thiết kế cốt lõi từ cha đẻ Python Guido van Rossum:</p>
        <ul>
          <li>Thứ nhất, trong <code>list</code>, <code>lst.reverse()</code> và <code>lst.sort()</code> là các phương thức <strong>biến đổi tại chỗ (in-place mutation)</strong> và trả về <code>None</code>. Vì <code>str</code> là bất biến nên không thể có phương thức biến đổi tại chỗ.</li>
          <li>Thứ hai, cú pháp cắt lát bước âm <strong><code>s[::-1]</code></strong> của Python đã quá ngắn gọn, rõ ràng và được tối ưu ở mức C để đảo ngược chuỗi trong thời gian $O(n)$, nên việc thêm một phương thức riêng là dư thừa (vi phạm triết lý <em>"There should be one—and preferably only one—obvious way to do it"</em> trong Zen of Python).</li>
        </ul>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Phân nhóm tự động 47 phương thức của str bằng code Python',
      problem: 'Dùng `dir(str)` để lấy danh sách 47 phương thức public của `str`. Hãy viết đoạn mã tự động đếm và in ra: (1) Các phương thức bắt đầu bằng `"is"`, (2) Các phương thức có phiên bản đối xứng trái/phải (tức là tên bắt đầu bằng `"l"` hoặc `"r"` mà phần tên còn lại sau khi bỏ `"l"`/`"r"` cũng là một phương thức hợp lệ hoặc đối xứng nhau như `find`/`rfind`, `strip`/`lstrip`/`rstrip`).',
      hint: 'Tạo tập hợp `methods = {m for m in dir(str) if not m.startswith("_")}`. Kiểm tra xem với mỗi `m`, liệu `"r" + m` hoặc `"l" + m` có nằm trong `methods` hay không.',
      solutionCode: `methods = [m for m in dir(str) if not m.startswith("_")]
method_set = set(methods)

is_group = [m for m in methods if m.startswith("is")]
lr_pairs = [
    (m, f"l{m}" if f"l{m}" in method_set else "-", f"r{m}")
    for m in methods
    if f"r{m}" in method_set
]
just_pair = ("just", "ljust", "rjust")

print(f"Tổng số phương thức: {len(methods)}")
print(f"Nhóm is* ({len(is_group)}): {', '.join(is_group)}")
print("\\nCác bộ phương thức có hướng Trái / Phải:")
for base, left, right in lr_pairs + [just_pair]:
    print(f"  Gốc: {base:10} | Trái: {left:10} | Phải: {right:10}")`,
      solutionOutput: `Tổng số phương thức: 47
Nhóm is* (12): isalnum, isalpha, isascii, isdecimal, isdigit, isidentifier, islower, isnumeric, isprintable, isspace, istitle, isupper

Các bộ phương thức có hướng Trái / Phải:
  Gốc: find       | Trái: -          | Phải: rfind     
  Gốc: index      | Trái: -          | Phải: rindex    
  Gốc: partition  | Trái: -          | Phải: rpartition
  Gốc: split      | Trái: -          | Phải: rsplit    
  Gốc: strip      | Trái: lstrip     | Phải: rstrip    
  Gốc: just       | Trái: ljust      | Phải: rjust     `,
      explanation: 'Bằng cách dùng nội quan `dir(str)`, ta thấy ngay quy luật đặt tên cực kỳ nhất quán của Python: `find/index/partition/split` mặc định đã là hướng từ trái sang nên chỉ cần thêm tiền tố `r` cho hướng ngược lại; riêng `strip` mặc định là cả 2 đầu nên có đủ bộ ba `strip/lstrip/rstrip`, và `ljust/rjust` đối xứng với `center`.'
    },
    {
      level: 'Vừa',
      title: 'Chuẩn hóa bảng dữ liệu CSV bị bẩn bằng chuỗi phương thức',
      problem: 'Cho một chuỗi dữ liệu CSV thô bị lỗi định dạng gồm nhiều dòng, tên cột viết hoa thường lộn xộn, giá trị có khoảng trắng thừa và tiền tố `"ID-"` hoặc hậu tố `"_USD"`. Hãy kết hợp các phương thức của `str` để chuyển nó thành danh sách các `dict` sạch.',
      hint: 'Dùng `strip().splitlines()` để tách dòng, `split(",")` để tách cột, `strip().lower()` cho header, và `removeprefix("ID-")` / `removesuffix("_USD")` cho dữ liệu.',
      solutionCode: `raw_csv = """
  Order_ID , Customer_Name , Total_Amount 
  ID-00105 ,   nguyễn văn an , 250_USD  
  ID-00106 , trần thị BÌNH   , 1400_USD 
"""

lines = raw_csv.strip().splitlines()
headers = [h.strip().lower() for h in lines[0].split(",")]

records = []
for line in lines[1:]:
    cols = [c.strip() for c in line.split(",")]
    row = dict(zip(headers, cols))
    row["order_id"] = row["order_id"].removeprefix("ID-")
    row["customer_name"] = " ".join(row["customer_name"].split()).title()
    amt_str = row["total_amount"].removesuffix("_USD")
    row["total_amount"] = int(amt_str) if amt_str.isdecimal() else 0
    records.append(row)

for r in records:
    print(r)`,
      solutionOutput: `{'order_id': '00105', 'customer_name': 'Nguyễn Văn An', 'total_amount': 250}
{'order_id': '00106', 'customer_name': 'Trần Thị Bình', 'total_amount': 1400}`,
      explanation: 'Bài toán kết hợp mượt mà 7 phương thức thuộc các nhóm khác nhau: `strip`, `splitlines`, `split`, `lower`, `removeprefix`, `join`, `title`, `removesuffix` và `isdecimal`.'
    },
    {
      level: 'Khó',
      title: 'Trình tạo bảng Markdown tự động căn lề (Markdown Table Formatter)',
      problem: 'Viết hàm `format_markdown_table(headers, rows, alignments)` nhận vào danh sách tiêu đề cột `headers`, danh sách các hàng `rows` (mỗi hàng là list các chuỗi), và danh sách hướng căn lề `alignments` (`"L"` cho căn trái bằng `ljust`, `"R"` cho căn phải bằng `rjust`, `"C"` cho căn giữa bằng `center`). Hàm trả về chuỗi bảng Markdown đã được căn chỉnh độ rộng từng cột vừa khít với phần tử dài nhất của cột đó.',
      hint: 'Tính độ rộng lớn nhất `col_widths[i]` của từng cột `i`. Sau đó với mỗi ô ở cột `i`, chọn phương thức `ljust`, `rjust` hoặc `center` dựa vào `alignments[i]`.',
      solutionCode: `def format_markdown_table(
    headers: list[str], rows: list[list[str]], alignments: list[str]
) -> str:
    all_rows = [headers] + rows
    col_widths = [
        max(len(row[i]) for row in all_rows) for i in range(len(headers))
    ]

    def align_cell(text: str, width: int, align: str) -> str:
        if align == "R":
            return text.rjust(width)
        if align == "C":
            return text.center(width)
        return text.ljust(width)

    def format_row(row: list[str]) -> str:
        cells = [
            align_cell(cell, col_widths[i], alignments[i])
            for i, cell in enumerate(row)
        ]
        return "| " + " | ".join(cells) + " |"

    sep_cells = []
    for width, align in zip(col_widths, alignments):
        dashes = "-" * width
        if align == "R":
            sep_cells.append(dashes[:-1] + ":")
        elif align == "C":
            sep_cells.append(":" + dashes[1:-1] + ":")
        else:
            sep_cells.append(dashes)

    output_lines = [
        format_row(headers),
        "| " + " | ".join(sep_cells) + " |",
        *(format_row(r) for r in rows),
    ]
    return "\\n".join(output_lines)

headers = ["Phương thức", "Nhóm", "Độ phức tạp"]
rows = [
    ["casefold()", "Hoa/Thường", "O(n)"],
    ["partition()", "Tách/Ghép", "O(n)"],
    ["isdecimal()", "Kiểm tra", "O(n)"],
]
print(format_markdown_table(headers, rows, ["L", "C", "R"]))`,
      solutionOutput: `| Phương thức |    Nhóm    | Độ phức tạp |
| ----------- | :--------: | ----------: |
| casefold()  | Hoa/Thường |        O(n) |
| partition() | Tách/Ghép  |        O(n) |
| isdecimal() |  Kiểm tra  |        O(n) |`,
      explanation: 'Hàm tính toán độ rộng tối đa của mỗi cột rồi dùng `ljust()`, `center()`, `rjust()` để đệm khoảng trắng và dùng `" | ".join(...)` cùng `"\\n".join(...)` để xuất ra bảng Markdown hoàn chỉnh.'
    }
  ],

  quiz: [
    {
      question: 'Trong Python 3.14.8, lớp `str` có tổng cộng bao nhiêu phương thức public (không bắt đầu bằng dấu `_`)?',
      options: [
        '38 phương thức',
        '42 phương thức',
        '47 phương thức',
        '52 phương thức'
      ],
      correctIndex: 2,
      explanation: 'Khi lọc `[m for m in dir(str) if not m.startswith("_")]` trên Python 3.14.8, kết quả trả về đúng 47 phương thức public.'
    },
    {
      question: 'Phương thức nào duy nhất trong 47 phương thức public của `str` là một `staticmethod` (thường gọi qua `str.method(...)` để tạo bảng dữ liệu)?',
      options: [
        '`str.join`',
        '`str.maketrans`',
        '`str.format_map`',
        '`str.encode`'
      ],
      correctIndex: 1,
      explanation: '`str.maketrans()` là phương thức tĩnh (static method) duy nhất, dùng để tạo từ điển ánh xạ mã Unicode truyền vào cho `s.translate()`.'
    },
    {
      question: 'Cặp lựa chọn nào sau đây là TỐI ƯU và AN TOÀN nhất khi cần: (1) Cắt bỏ đuôi `".bak"` ở cuối tên file và (2) Kiểm tra chuỗi chỉ chứa chữ số hệ 10 để truyền vào `int()`?',
      options: [
        '`s.rstrip(".bak")` và `s.isdigit()`',
        '`s.removesuffix(".bak")` và `s.isdecimal()`',
        '`s.strip(".bak")` và `s.isnumeric()`',
        '`s.replace(".bak", "")` và `s.isalnum()`'
      ],
      correctIndex: 1,
      explanation: '`removesuffix(".bak")` cắt đúng chuỗi con ở cuối mà không xóa nhầm chữ `"k"`, `"a"`, `"b"` của tên file; còn `isdecimal()` đảm bảo 100% chuỗi chuyển được sang `int()` không bị lỗi bởi chỉ số trên `"²"` hay phân số `"½"`.'
    },
    {
      question: 'Phương thức nào trong 47 phương thức của `str` trả về một đối tượng kiểu `bytes` thay vì `str`?',
      options: [
        '`s.translate()`',
        '`s.casefold()`',
        '`s.encode()`',
        '`s.expandtabs()`'
      ],
      correctIndex: 2,
      explanation: '`s.encode(encoding="utf-8")` chuyển đổi chuỗi ký tự Unicode (`str`) sang dãy byte (`bytes`). Ngược lại, đối tượng `bytes` sẽ có phương thức `.decode()` để chuyển ngược về `str`.'
    }
  ],

  summary: [
    'Lớp str trong Python 3.14.8 sở hữu đúng 47 phương thức public, chia thành 8 nhóm: Hoa/thường (6), Tìm kiếm (7), Cắt dọn (5), Tách/Ghép (6), Thay thế (3), Căn lề (5), Kiểm tra is* (12), và Định dạng/Mã hóa (3).',
    'Mọi phương thức của str đều tuân thủ tính bất biến (immutability): không bao giờ sửa chuỗi gốc mà luôn trả về giá trị mới.',
    'Ưu tiên các phương thức chuyên biệt và an toàn: dùng in thay cho find() khi chỉ kiểm tra tồn tại, dùng casefold() khi so sánh, dùng removeprefix/removesuffix thay cho lstrip/rstrip khi cắt nhãn, và dùng partition thay cho split khi tách 1 điểm.',
    'Kết hợp Method Chaining (nối chuỗi phương thức) cùng join() và translate() giúp viết các đường ống xử lý văn bản ngắn gọn, dễ đọc và đạt hiệu năng cấp độ C.'
  ]
};
