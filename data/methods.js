/**
 * Cơ sở dữ liệu Đầy đủ 47 Phương thức Public của kiểu `str` trong Python 3.14.8
 * Đối chiếu khớp 100% với `[m for m in dir(str) if not m.startswith('_')]`
 */

export const METHOD_CATEGORIES = [
  { id: 'all', label: 'Tất cả (47)' },
  { id: 'case', label: 'Hoa / Thường (6)' },
  { id: 'search', label: 'Tìm kiếm (7)' },
  { id: 'strip', label: 'Cắt / Dọn (5)' },
  { id: 'splitjoin', label: 'Tách / Ghép (6)' },
  { id: 'replace', label: 'Thay thế (3)' },
  { id: 'align', label: 'Căn lề (5)' },
  { id: 'check', label: 'Kiểm tra is* (12)' },
  { id: 'other', label: 'Khác (3)' }
];

export const STR_METHODS = [
  // ================= 1. NHÓM CHỮ HOA / THƯỜNG (6) =================
  {
    name: 'upper',
    category: 'case',
    signature: 's.upper()',
    params: 'Không có tham số.',
    returns: 'str — Chuỗi mới với mọi ký tự có phân biệt hoa/thường được chuyển thành chữ HOA.',
    shortDesc: 'Chuyển toàn bộ chuỗi sang chữ in hoa.',
    example: `s = "Python 3.14 - Tiếng Việt"\nprint(s.upper())`,
    output: `PYTHON 3.14 - TIẾNG VIỆT`,
    pitfall: 'Trả về chuỗi mới, không sửa chuỗi gốc `s` tại chỗ (vì `str` bất biến).'
  },
  {
    name: 'lower',
    category: 'case',
    signature: 's.lower()',
    params: 'Không có tham số.',
    returns: 'str — Chuỗi mới với mọi ký tự chữ hoa chuyển thành chữ thường.',
    shortDesc: 'Chuyển toàn bộ chuỗi sang chữ thường chuẩn.',
    example: `s = "Xin Chào PYTHON 3.14"\nprint(s.lower())`,
    output: `xin chào python 3.14`,
    pitfall: 'Với so sánh không phân biệt hoa/thường đa ngôn ngữ (như tiếng Đức `"ß"`), hãy ưu tiên `casefold()` thay vì `lower()`.'
  },
  {
    name: 'title',
    category: 'case',
    signature: 's.title()',
    params: 'Không có tham số.',
    returns: 'str — Chuỗi mới viết hoa chữ cái đầu mỗi từ, các chữ còn lại viết thường.',
    shortDesc: 'Viết hoa chữ cái đầu của từng từ (Title Case).',
    example: `s = "học lập trình python 3.14"\nprint(s.title())\nprint("they're bill's friends".title())`,
    output: `Học Lập Trình Python 3.14\nThey'Re Bill'S Friends`,
    pitfall: '`title()` coi dấu nháy đơn `\'` là ranh giới từ nên `"bill\'s".title()` thành `"Bill\'S"`. Dùng `string.capwords()` nếu chỉ muốn tách theo khoảng trắng.'
  },
  {
    name: 'capitalize',
    category: 'case',
    signature: 's.capitalize()',
    params: 'Không có tham số.',
    returns: 'str — Chuỗi mới có ký tự đầu tiên viết hoa và toàn bộ phần còn lại viết thường.',
    shortDesc: 'Viết hoa duy nhất ký tự đầu tiên của cả chuỗi, hạ thường phần còn lại.',
    example: `s = "pYTHON 3.14 LÀ BẢN MỚI"\nprint(s.capitalize())`,
    output: `Python 3.14 là bản mới`,
    pitfall: 'Nhiều người nhầm rằng `capitalize()` giữ nguyên các chữ hoa ở giữa câu — thực tế nó chuyển tất cả ký tự từ vị trí index 1 trở đi sang chữ thường.'
  },
  {
    name: 'swapcase',
    category: 'case',
    signature: 's.swapcase()',
    params: 'Không có tham số.',
    returns: 'str — Chuỗi mới đảo ngược chữ hoa thành thường và chữ thường thành hoa.',
    shortDesc: 'Đảo chữ hoa thành thường và ngược lại.',
    example: `s = "PyThOn 3.14 - Xin Chào"\nprint(s.swapcase())`,
    output: `pYtHoN 3.14 - xIN cHÀO`,
    pitfall: 'Không phải lúc nào `s.swapcase().swapcase() == s` cũng đúng với mọi ký tự Unicode đặc biệt (ví dụ `"ß".swapcase()` thành `"SS"`, đảo lại thành `"ss"`).'
  },
  {
    name: 'casefold',
    category: 'case',
    signature: 's.casefold()',
    params: 'Không có tham số.',
    returns: 'str — Chuỗi đã chuẩn hóa chữ thường mạnh (aggressive lowercase) để so sánh không phân biệt hoa/thường.',
    shortDesc: 'Hạ chữ thường mạnh theo chuẩn Unicode để so sánh không phân biệt hoa/thường.',
    example: `german = "Straße"\nprint("lower():", german.lower())\nprint("casefold():", german.casefold())\nprint(german.casefold() == "STRASSE".casefold())`,
    output: `lower(): straße\ncasefold(): strasse\nTrue`,
    pitfall: 'Dùng để so sánh (`s1.casefold() == s2.casefold()`), không nên dùng để hiển thị văn bản cho người dùng vì có thể làm biến đổi ký tự như `ß` -> `ss`.'
  },

  // ================= 2. NHÓM TÌM KIẾM (7) =================
  {
    name: 'find',
    category: 'search',
    signature: 's.find(sub[, start[, end]])',
    params: 'sub (str): chuỗi con cần tìm; start, end (int, tùy chọn): phạm vi cắt lát [start:end].',
    returns: 'int — Chỉ số (index) nhỏ nhất tìm thấy `sub`, hoặc `-1` nếu không tìm thấy.',
    shortDesc: 'Tìm vị trí đầu tiên của chuỗi con từ trái sang phải (trả về -1 nếu không có).',
    example: `s = "banana"\nprint(s.find("na"))\nprint(s.find("na", 3))\nprint(s.find("xyz"))`,
    output: `2\n4\n-1`,
    pitfall: 'Đừng viết `if s.find(sub):` vì khi tìm thấy ở đầu chuỗi (`0`), `bool(0)` là `False`! Để kiểm tra tồn tại, hãy dùng `if sub in s:` hoặc `if s.find(sub) != -1:`.'
  },
  {
    name: 'rfind',
    category: 'search',
    signature: 's.rfind(sub[, start[, end]])',
    params: 'sub (str): chuỗi con cần tìm; start, end (int, tùy chọn): phạm vi [start:end].',
    returns: 'int — Chỉ số lớn nhất (cuối cùng) tìm thấy `sub`, hoặc `-1` nếu không tìm thấy.',
    shortDesc: 'Tìm vị trí xuất hiện cuối cùng của chuỗi con (từ phải sang trái).',
    example: `path = "/home/user/docs/report.pdf"\nprint(path.rfind("/"))\nprint(path[path.rfind("/") + 1:])`,
    output: `15\nreport.pdf`,
    pitfall: 'Chỉ số trả về vẫn là chỉ số dương tính từ đầu chuỗi (0-based), không phải chỉ số âm.'
  },
  {
    name: 'index',
    category: 'search',
    signature: 's.index(sub[, start[, end]])',
    params: 'sub (str): chuỗi con; start, end (int, tùy chọn): phạm vi tìm kiếm.',
    returns: 'int — Chỉ số đầu tiên tìm thấy `sub`. Ném `ValueError` nếu không tìm thấy.',
    shortDesc: 'Giống `find()`, nhưng ném ngoại lệ `ValueError` nếu không tìm thấy.',
    example: `s = "python 3.14"\nprint(s.index("3.14"))`,
    output: `7`,
    pitfall: 'Nếu không bọc `try...except ValueError` khi dữ liệu đầu vào không chắc chắn, chương trình sẽ dừng đột ngột với `ValueError: substring not found`.'
  },
  {
    name: 'rindex',
    category: 'search',
    signature: 's.rindex(sub[, start[, end]])',
    params: 'sub (str): chuỗi con; start, end (int, tùy chọn): phạm vi tìm kiếm.',
    returns: 'int — Chỉ số cuối cùng tìm thấy `sub`. Ném `ValueError` nếu không tìm thấy.',
    shortDesc: 'Giống `rfind()`, nhưng ném `ValueError` nếu không tìm thấy.',
    example: `s = "ab_cd_ef"\nprint(s.rindex("_"))`,
    output: `5`,
    pitfall: 'Ném `ValueError: substring not found` khi không có chuỗi con.'
  },
  {
    name: 'count',
    category: 'search',
    signature: 's.count(sub[, start[, end]])',
    params: 'sub (str): chuỗi con cần đếm; start, end (int, tùy chọn): phạm vi [start:end].',
    returns: 'int — Số lần xuất hiện KHÔNG chồng lấp (non-overlapping) của `sub`.',
    shortDesc: 'Đếm số lần xuất hiện không chồng lấp của chuỗi con.',
    example: `s = "aaaa"\nprint(s.count("aa"))\nprint("banana".count("a"))`,
    output: `2\n3`,
    pitfall: '`count()` chỉ đếm các lần xuất hiện không chồng lấp: `"aaaa".count("aa")` trả về `2` chứ không phải `3`. Ngoài ra `"abc".count("")` trả về `len(s) + 1` là `4`.'
  },
  {
    name: 'startswith',
    category: 'search',
    signature: 's.startswith(prefix[, start[, end]])',
    params: 'prefix (str | tuple[str, ...]): một chuỗi hoặc một tuple các chuỗi tiền tố.',
    returns: 'bool — `True` nếu bắt đầu bằng `prefix`, ngược lại `False`.',
    shortDesc: 'Kiểm tra chuỗi có bắt đầu bằng tiền tố (hoặc tuple các tiền tố) không.',
    example: `url = "https://python.org"\nprint(url.startswith("https://"))\nprint(url.startswith(("http://", "https://")))`,
    output: `True\nTrue`,
    pitfall: 'Khi truyền nhiều tiền tố, phải truyền một `tuple` `(a, b)`, KHÔNG truyền `list` `[a, b]` (sẽ gây `TypeError: startswith first arg must be str or a tuple of str, not list`).'
  },
  {
    name: 'endswith',
    category: 'search',
    signature: 's.endswith(suffix[, start[, end]])',
    params: 'suffix (str | tuple[str, ...]): một chuỗi hoặc một tuple các chuỗi hậu tố.',
    returns: 'bool — `True` nếu kết thúc bằng `suffix`, ngược lại `False`.',
    shortDesc: 'Kiểm tra chuỗi có kết thúc bằng hậu tố (hoặc tuple các hậu tố) không.',
    example: `filename = "archive.tar.gz"\nprint(filename.endswith((".zip", ".tar.gz", ".tgz")))`,
    output: `True`,
    pitfall: 'Tương tự `startswith`, tham số đầu tiên chỉ nhận `str` hoặc `tuple[str, ...]`, không nhận `list`.'
  },

  // ================= 3. NHÓM CẮT / DỌN (5) =================
  {
    name: 'strip',
    category: 'strip',
    signature: 's.strip([chars])',
    params: 'chars (str | None): tập hợp các ký tự cần loại bỏ ở 2 đầu. Mặc định `None` là mọi khoảng trắng Unicode.',
    returns: 'str — Chuỗi mới đã gọt bỏ các ký tự thuộc `chars` ở cả hai đầu trái và phải.',
    shortDesc: 'Loại bỏ khoảng trắng (hoặc tập ký tự chỉ định) ở cả hai đầu chuỗi.',
    example: `raw = "  \\t\\n Xin chào Python! \\n "\nprint(repr(raw.strip()))\nprint("www.example.com".strip("cmowz."))`,
    output: `'Xin chào Python!'\nexample`,
    pitfall: 'Tham số `chars` là một TẬP HỢP ký tự đơn lẻ, KHÔNG phải một tiền tố/hậu tố cố định! `"www.example.com".strip("w.")` sẽ cắt luôn chữ `w` hoặc `.` nếu lộ ra ở hai đầu. Để cắt tiền tố/hậu tố chính xác, dùng `removeprefix` / `removesuffix`.'
  },
  {
    name: 'lstrip',
    category: 'strip',
    signature: 's.lstrip([chars])',
    params: 'chars (str | None): tập hợp các ký tự cần loại bỏ ở đầu bên trái.',
    returns: 'str — Chuỗi mới đã gọt bỏ các ký tự ở đầu bên trái.',
    shortDesc: 'Loại bỏ khoảng trắng (hoặc tập ký tự) ở phía bên trái (đầu chuỗi).',
    example: `s = "00004200"\nprint(s.lstrip("0"))`,
    output: `4200`,
    pitfall: 'Lưu ý `"000".lstrip("0")` trả về chuỗi rỗng `""`. Nếu muốn bỏ một từ cố định ở đầu, dùng `removeprefix()`.'
  },
  {
    name: 'rstrip',
    category: 'strip',
    signature: 's.rstrip([chars])',
    params: 'chars (str | None): tập hợp các ký tự cần loại bỏ ở đầu bên phải.',
    returns: 'str — Chuỗi mới đã gọt bỏ các ký tự ở đầu bên phải.',
    shortDesc: 'Loại bỏ khoảng trắng/xuống dòng (hoặc tập ký tự) ở phía bên phải (cuối chuỗi).',
    example: `line = "Dữ liệu dòng 1\\r\\n"\nprint(repr(line.rstrip("\\r\\n")))`,
    output: `'Dữ liệu dòng 1'`,
    pitfall: 'Rất hữu ích khi đọc file từng dòng để bỏ `\\n` ở cuối mà vẫn giữ nguyên khoảng trắng thụt lề ở đầu dòng.'
  },
  {
    name: 'removeprefix',
    category: 'strip',
    signature: 's.removeprefix(prefix, /)',
    params: 'prefix (str): chuỗi tiền tố cố định cần gỡ bỏ (ra đời từ Python 3.9 - PEP 616).',
    returns: 'str — Chuỗi đã bỏ `prefix` ở đầu nếu khớp; nếu không khớp trả về bản sao chuỗi gốc.',
    shortDesc: 'Gỡ bỏ chính xác tiền tố một lần duy nhất ở đầu chuỗi (thay thế an toàn cho lstrip).',
    example: `test_fn = "test_test_login"\nprint(test_fn.removeprefix("test_"))`,
    output: `test_login`,
    pitfall: 'Chỉ gỡ bỏ đúng 1 lần tiền tố ở đầu chuỗi. Khác hoàn toàn với `lstrip("test_")` vốn xóa mọi chữ `t, e, s, _` liên tiếp.'
  },
  {
    name: 'removesuffix',
    category: 'strip',
    signature: 's.removesuffix(suffix, /)',
    params: 'suffix (str): chuỗi hậu tố cố định cần gỡ bỏ (ra đời từ Python 3.9 - PEP 616).',
    returns: 'str — Chuỗi đã bỏ `suffix` ở cuối nếu khớp; nếu không khớp trả về chuỗi gốc.',
    shortDesc: 'Gỡ bỏ chính xác hậu tố một lần duy nhất ở cuối chuỗi (thay thế an toàn cho rstrip).',
    example: `filename = "notes.txt"\nprint(filename.removesuffix(".txt"))\nprint("init.py".removesuffix(".txt"))`,
    output: `notes\ninit.py`,
    pitfall: 'Luôn dùng `removesuffix(".txt")` thay vì `rstrip(".txt")` (vì `"attest.txt".rstrip(".txt")` sẽ làm mất luôn chữ `t` cuối của từ `attest`!).'
  },

  // ================= 4. NHÓM TÁCH / GHÉP (6) =================
  {
    name: 'split',
    category: 'splitjoin',
    signature: 's.split(sep=None, maxsplit=-1)',
    params: 'sep (str | None): dấu phân cách; maxsplit (int): số lần tách tối đa (-1 là không giới hạn).',
    returns: 'list[str] — Danh sách các chuỗi con sau khi tách.',
    shortDesc: 'Tách chuỗi từ trái sang phải thành danh sách các phần tử.',
    example: `print("   a   b  c  ".split())\nprint("a,,b,c".split(","))\nprint("a:b:c:d".split(":", maxsplit=2))`,
    output: `['a', 'b', 'c']\n['a', '', 'b', 'c']\n['a', 'b', 'c:d']`,
    pitfall: 'Sự khác biệt cực lớn giữa `s.split()` (`sep=None`) và `s.split(" ")`: khi `sep=None`, Python gộp nhiều khoảng trắng liên tiếp thành 1 điểm cắt và tự bỏ khoảng trắng 2 đầu (`"".split()` trả về `[]`); còn `"".split(" ")` trả về `[\'\']`!'
  },
  {
    name: 'rsplit',
    category: 'splitjoin',
    signature: 's.rsplit(sep=None, maxsplit=-1)',
    params: 'sep (str | None): dấu phân cách; maxsplit (int): số lần tách tối đa tính từ phải sang trái.',
    returns: 'list[str] — Danh sách các chuỗi con sau khi tách.',
    shortDesc: 'Tách chuỗi ưu tiên từ phải sang trái (khác biệt khi dùng `maxsplit`).',
    example: `path = "a/b/c/file.txt"\nprint(path.rsplit("/", maxsplit=1))`,
    output: `['a/b/c', 'file.txt']`,
    pitfall: 'Nếu không truyền `maxsplit` (hoặc `maxsplit=-1`), kết quả của `rsplit()` giống hệt `split()`.'
  },
  {
    name: 'splitlines',
    category: 'splitjoin',
    signature: 's.splitlines(keepends=False)',
    params: 'keepends (bool): nếu `True`, giữ lại ký tự xuống dòng ở cuối mỗi phần tử.',
    returns: 'list[str] — Danh sách các dòng trong chuỗi.',
    shortDesc: 'Tách chuỗi theo mọi ranh giới dòng chuẩn Unicode (\\n, \\r\\n, \\r...).',
    example: `text = "Dòng 1\\nDòng 2\\r\\nDòng 3\\n"\nprint(text.splitlines())\nprint("".splitlines())`,
    output: `['Dòng 1', 'Dòng 2', 'Dòng 3']\n[]`,
    pitfall: 'Khác với `s.split("\\n")`: nếu chuỗi kết thúc bằng `\\n`, `splitlines()` KHÔNG sinh ra phần tử rỗng `""` dư thừa ở cuối danh sách, và `"".splitlines()` trả về `[]` thay vì `[\'\']`.'
  },
  {
    name: 'partition',
    category: 'splitjoin',
    signature: 's.partition(sep, /)',
    params: 'sep (str): chuỗi phân cách (bắt buộc không rỗng).',
    returns: 'tuple[str, str, str] — Bộ 3 phần tử `(head, sep, tail)` tại vị trí `sep` đầu tiên.',
    shortDesc: 'Chia chuỗi thành đúng 3 phần `(trước, dấu_ngăn, sau)` ở lần gặp đầu tiên.',
    example: `header = "Content-Type: application/json; charset=utf-8"\nkey, sep, val = header.partition(": ")\nprint(key, "|", val)\nprint("no_colon".partition(":"))`,
    output: `Content-Type | application/json; charset=utf-8\n('no_colon', '', '')`,
    pitfall: 'Luôn trả về tuple đúng 3 phần tử nên rất an toàn để unpack `a, sep, b = s.partition(...)` mà không sợ lỗi `ValueError: not enough values to unpack` như `split(sep, 1)`.'
  },
  {
    name: 'rpartition',
    category: 'splitjoin',
    signature: 's.rpartition(sep, /)',
    params: 'sep (str): chuỗi phân cách (bắt buộc không rỗng).',
    returns: 'tuple[str, str, str] — Bộ 3 phần tử `(head, sep, tail)` tại vị trí `sep` cuối cùng.',
    shortDesc: 'Chia chuỗi thành đúng 3 phần tại vị trí dấu phân cách cuối cùng (từ phải sang).',
    example: `filename = "archive.backup.tar.gz"\nstem, dot, ext = filename.rpartition(".")\nprint(stem, "|", ext)\nprint("README".rpartition("."))`,
    output: `archive.backup.tar | gz\n('', '', 'README')`,
    pitfall: 'Chú ý khi KHÔNG tìm thấy `sep`: `partition` trả về `(s, "", "")`, còn `rpartition` trả về `("", "", s)`!'
  },
  {
    name: 'join',
    category: 'splitjoin',
    signature: 'sep.join(iterable, /)',
    params: 'iterable (Iterable[str]): một đối tượng khả duyệt chứa toàn các phần tử kiểu `str`.',
    returns: 'str — Chuỗi ghép các phần tử của `iterable`, ngăn cách bởi chuỗi `sep`.',
    shortDesc: 'Ghép một iterable các chuỗi thành một chuỗi duy nhất với dấu nối `sep`.',
    example: `words = ["Python", "3.14", "t-string"]\nprint(" - ".join(words))\nprint("".join(["A", "B", "C"]))`,
    output: `Python - 3.14 - t-string\nABC`,
    pitfall: 'Nếu trong `iterable` có phần tử không phải `str` (ví dụ số `int`), Python sẽ ném `TypeError: sequence item 0: expected str instance, int found`. Hãy dùng `", ".join(map(str, items))`.'
  },

  // ================= 5. NHÓM THAY THẾ (3) =================
  {
    name: 'replace',
    category: 'replace',
    signature: 's.replace(old, new, /, count=-1)',
    params: 'old (str): chuỗi cần thay; new (str): chuỗi mới; count (int): số lần thay tối đa (từ Python 3.13+ hỗ trợ truyền dạng keyword `count=`).',
    returns: 'str — Chuỗi mới sau khi thay thế.',
    shortDesc: 'Thay thế chuỗi con `old` bằng `new` (tất cả hoặc giới hạn `count` lần).',
    example: `s = "one, one, one"\nprint(s.replace("one", "two", count=2))`,
    output: `two, two, one`,
    pitfall: 'Quên gán lại kết quả (`s.replace("a", "b")` không làm thay đổi biến `s`, phải viết `s = s.replace("a", "b")`).'
  },
  {
    name: 'translate',
    category: 'replace',
    signature: 's.translate(table, /)',
    params: 'table (Mapping[int, int | str | None]): bảng ánh xạ Unicode ordinal tạo bởi `str.maketrans()` hoặc một dict.',
    returns: 'str — Chuỗi mới đã biến đổi hoặc xóa từng ký tự theo bảng ánh xạ.',
    shortDesc: 'Thay thế hoặc xóa hàng loạt ký tự cực nhanh trong 1 lần duyệt bằng bảng ánh xạ.',
    example: `table = str.maketrans({"đ": "d", "Đ": "D"}, ".,!")\nprint("Đà Nẵng, Việt Nam!".translate(table))`,
    output: `Da Nẵng Việt Nam`,
    pitfall: 'Khóa của bảng `table` phải là mã Unicode số nguyên (`ord(c)`), không phải ký tự chuỗi, trừ khi được tạo thông qua `str.maketrans()`.'
  },
  {
    name: 'maketrans',
    category: 'replace',
    signature: 'str.maketrans(x[, y[, z]])',
    params: '1 tham số (dict), 2 tham số (chuỗi gốc `x`, chuỗi đích `y` cùng độ dài), hoặc 3 tham số (`z` là các ký tự cần xóa).',
    returns: 'dict[int, int | str | None] — Bảng tra cứu dùng cho `str.translate()`.',
    shortDesc: 'Phương thức tĩnh tạo bảng ánh xạ mã Unicode cho `str.translate()`.',
    example: `tbl = str.maketrans("aeiou", "12345", " ") \nprint("hello world".translate(tbl))`,
    output: `h2ll4w4rld`,
    pitfall: 'Khi dùng dạng 2 hoặc 3 tham số `str.maketrans(x, y, z)`, độ dài của chuỗi `x` và `y` bắt buộc phải bằng nhau, nếu không sẽ ném `ValueError`.'
  },

  // ================= 6. NHÓM CĂN LỀ (5) =================
  {
    name: 'center',
    category: 'align',
    signature: 's.center(width[, fillchar=" "])',
    params: 'width (int): tổng độ rộng mục tiêu; fillchar (str): đúng 1 ký tự đệm (mặc định là dấu cách).',
    returns: 'str — Chuỗi được căn giữa trong độ rộng `width`.',
    shortDesc: 'Căn giữa chuỗi với ký tự đệm hai bên.',
    example: `print("Python 3.14".center(21, "="))`,
    output: `=====Python 3.14=====`,
    pitfall: 'Nếu `width <= len(s)`, trả về nguyên chuỗi gốc mà không cắt ngắn. `fillchar` phải dài đúng 1 ký tự.'
  },
  {
    name: 'ljust',
    category: 'align',
    signature: 's.ljust(width[, fillchar=" "])',
    params: 'width (int): tổng độ rộng; fillchar (str): ký tự đệm bên phải.',
    returns: 'str — Chuỗi căn trái, đệm thêm `fillchar` vào bên phải.',
    shortDesc: 'Căn lề trái chuỗi trong độ rộng xác định.',
    example: `print("Mục 1".ljust(12, ".") + "Trang 5")`,
    output: `Mục 1.......Trang 5`,
    pitfall: '`fillchar` dài hơn 1 ký tự sẽ gây `TypeError: The fill character must be exactly one character long`.'
  },
  {
    name: 'rjust',
    category: 'align',
    signature: 's.rjust(width[, fillchar=" "])',
    params: 'width (int): tổng độ rộng; fillchar (str): ký tự đệm bên trái.',
    returns: 'str — Chuỗi căn phải, đệm thêm `fillchar` vào bên trái.',
    shortDesc: 'Căn lề phải chuỗi trong độ rộng xác định.',
    example: `print("42".rjust(6, " "))\nprint("-42".rjust(6, "0"))`,
    output: `    42\n000-42`,
    pitfall: 'Để đệm số 0 cho chuỗi số có dấu âm, KHÔNG dùng `rjust(6, "0")` vì nó ra `"000-42"`; hãy dùng `zfill(6)` để được `"-00042"`.'
  },
  {
    name: 'zfill',
    category: 'align',
    signature: 's.zfill(width, /)',
    params: 'width (int): tổng độ rộng tối thiểu của chuỗi kết quả.',
    returns: 'str — Chuỗi được đệm chữ số `"0"` vào bên trái, nhưng đứng SAU dấu `+` hoặc `-` ở đầu.',
    shortDesc: 'Đệm số 0 vào đầu chuỗi số (xử lý thông minh dấu âm/dương).',
    example: `print("42".zfill(5))\nprint("-42".zfill(5))\nprint("+42".zfill(5))`,
    output: `00042\n-0042\n+0042`,
    pitfall: 'Nếu chuỗi bắt đầu bằng dấu `+` hoặc `-`, `zfill` chèn số `0` vào sau dấu đó chứ không chèn trước dấu.'
  },
  {
    name: 'expandtabs',
    category: 'align',
    signature: 's.expandtabs(tabsize=8)',
    params: 'tabsize (int): kích thước mỗi điểm dừng tab (mặc định là 8 cột).',
    returns: 'str — Chuỗi đã thay ký tự `\\t` bằng số khoảng trắng tương ứng với cột tab.',
    shortDesc: 'Đổi các ký tự tab (\\t) thành khoảng trắng căn theo cột tab stop.',
    example: `row = "ID\\tTên\\tĐiểm"\nprint(repr(row.expandtabs(4)))`,
    output: `'ID  Tên Điểm'`,
    pitfall: '`expandtabs(4)` KHÔNG phải là thay mọi `\\t` bằng đúng 4 dấu cách, mà căn tới bội số tiếp theo của `tabsize` (cột 4, 8, 12...).'
  },

  // ================= 7. NHÓM KIỂM TRA TÍNH CHẤT IS* (12) =================
  {
    name: 'isdecimal',
    category: 'check',
    signature: 's.isdecimal()',
    params: 'Không có tham số.',
    returns: 'bool — `True` nếu chuỗi không rỗng và MỌI ký tự đều thuộc nhóm số thập phân hệ 10 (Unicode категория Nd, như 0-9).',
    shortDesc: 'Kiểm tra chặt chẽ nhất: chỉ các chữ số hệ thập phân (cơ số 10).',
    example: `print("2026".isdecimal())\nprint("²".isdecimal())     # Chỉ số trên\nprint("½".isdecimal())     # Phân số`,
    output: `True\nFalse\nFalse`,
    pitfall: 'An toàn nhất khi kiểm tra trước khi truyền vào `int(s)`. Các ký tự như `"²"` hay `"½"` trả về `False`.'
  },
  {
    name: 'isdigit',
    category: 'check',
    signature: 's.isdigit()',
    params: 'Không có tham số.',
    returns: 'bool — `True` nếu mọi ký tự là chữ số (bao gồm cả `isdecimal` + chữ số mũ/chỉ số trên như `²`, `³`, chữ số khoanh tròn `①`).',
    shortDesc: 'Kiểm tra chữ số (bao gồm cả chữ số thập phân và chỉ số mũ như ², ³).',
    example: `print("2026".isdigit())\nprint("²³".isdigit())\nprint("½".isdigit())`,
    output: `True\nTrue\nFalse`,
    pitfall: '`"²".isdigit()` là `True`, nhưng `int("²")` lại ném `ValueError`! Do đó nếu muốn ép kiểu `int(s)`, hãy dùng `s.isdecimal()`.'
  },
  {
    name: 'isnumeric',
    category: 'check',
    signature: 's.isnumeric()',
    params: 'Không có tham số.',
    returns: 'bool — `True` nếu mọi ký tự mang giá trị số trong Unicode (bao gồm `isdigit` + phân số `½`, số La Mã Unicode `Ⅷ`, chữ số Hán tự `四`).',
    shortDesc: 'Kiểm tra rộng nhất: mọi ký tự mang tính chất số (kể cả phân số ½, chữ Hán 四).',
    example: `print("2026".isnumeric())\nprint("²".isnumeric())\nprint("½".isnumeric())\nprint("四".isnumeric())`,
    output: `True\nTrue\nTrue\nTrue`,
    pitfall: 'Cả `"3.14"` (có dấu chấm) và `"-5"` (có dấu trừ) đều trả về `False` với cả 3 hàm `isdecimal`, `isdigit`, `isnumeric`!'
  },
  {
    name: 'isalpha',
    category: 'check',
    signature: 's.isalpha()',
    params: 'Không có tham số.',
    returns: 'bool — `True` nếu chuỗi không rỗng và mọi ký tự đều là chữ cái trong bảng mã Unicode (kể cả tiếng Việt có dấu).',
    shortDesc: 'Kiểm tra mọi ký tự có phải là chữ cái (không chứa số, dấu cách, dấu câu).',
    example: `print("ViệtNam".isalpha())\nprint("Việt Nam".isalpha()) # Có dấu cách`,
    output: `True\nFalse`,
    pitfall: 'Khoảng trắng `" "` không phải chữ cái nên `"Nguyễn Văn A".isalpha()` trả về `False`.'
  },
  {
    name: 'isalnum',
    category: 'check',
    signature: 's.isalnum()',
    params: 'Không có tham số.',
    returns: 'bool — `True` nếu chuỗi không rỗng và mọi ký tự là chữ cái (`isalpha`) hoặc số (`isnumeric`).',
    shortDesc: 'Kiểm tra chuỗi chỉ gồm chữ cái và/hoặc ký tự số.',
    example: `print("Python314".isalnum())\nprint("user_01".isalnum()) # Có dấu _`,
    output: `True\nFalse`,
    pitfall: 'Dấu gạch dưới `_` làm `isalnum()` trả về `False`.'
  },
  {
    name: 'isspace',
    category: 'check',
    signature: 's.isspace()',
    params: 'Không có tham số.',
    returns: 'bool — `True` nếu chuỗi không rỗng và chỉ chứa các ký tự khoảng trắng Unicode (`" "`, `\\t`, `\\n`, `\\r`, `\\u00a0`...).',
    shortDesc: 'Kiểm tra chuỗi chỉ chứa toàn khoảng trắng/xuống dòng.',
    example: `print("   \\t\\n".isspace())\nprint("".isspace())`,
    output: `True\nFalse`,
    pitfall: 'Chuỗi rỗng `""` trả về `False`.'
  },
  {
    name: 'islower',
    category: 'check',
    signature: 's.islower()',
    params: 'Không có tham số.',
    returns: 'bool — `True` nếu có ít nhất 1 ký tự phân biệt hoa/thường và tất cả các ký tự đó đều là chữ thường.',
    shortDesc: 'Kiểm tra mọi chữ cái trong chuỗi đều là chữ thường.',
    example: `print("python 3.14!".islower())\nprint("3.14".islower())`,
    output: `True\nFalse`,
    pitfall: 'Nếu chuỗi chỉ toàn số và ký tự đặc biệt (`"123!"`), cả `islower()` và `isupper()` đều trả về `False`.'
  },
  {
    name: 'isupper',
    category: 'check',
    signature: 's.isupper()',
    params: 'Không có tham số.',
    returns: 'bool — `True` nếu có ít nhất 1 ký tự phân biệt hoa/thường và tất cả đều là chữ HOA.',
    shortDesc: 'Kiểm tra mọi chữ cái trong chuỗi đều là chữ in hoa.',
    example: `print("PYTHON 3.14".isupper())\nprint("123".isupper())`,
    output: `True\nFalse`,
    pitfall: 'Cần có ít nhất một chữ cái phân biệt hoa/thường trong chuỗi thì mới có thể trả về `True`.'
  },
  {
    name: 'istitle',
    category: 'check',
    signature: 's.istitle()',
    params: 'Không có tham số.',
    returns: 'bool — `True` nếu chuỗi tuân theo quy tắc Title Case (chữ đầu từ viết hoa, các chữ tiếp theo trong từ viết thường).',
    shortDesc: 'Kiểm tra chuỗi có đang ở dạng Title Case hay không.',
    example: `print("Xin Chào Python".istitle())\nprint("Xin chào Python".istitle())`,
    output: `True\nFalse`,
    pitfall: 'Chữ viết tắt toàn hoa như `"Học HTML Cơ Bản".istitle()` sẽ trả về `False` vì `"HTML"` có các chữ sau chữ H cũng viết hoa.'
  },
  {
    name: 'isidentifier',
    category: 'check',
    signature: 's.isidentifier()',
    params: 'Không có tham số.',
    returns: 'bool — `True` nếu chuỗi là tên định danh (tên biến/hàm) hợp lệ theo cú pháp Python.',
    shortDesc: 'Kiểm tra chuỗi có thể làm tên biến hợp lệ trong Python hay không.',
    example: `print("user_name_1".isidentifier())\nprint("1_user".isidentifier())\nprint("for".isidentifier())`,
    output: `True\nFalse\nTrue`,
    pitfall: '`isidentifier()` KHÔNG kiểm tra từ khóa ngôn ngữ! `"for".isidentifier()` hay `"def".isidentifier()` vẫn trả về `True`. Hãy kết hợp `s.isidentifier() and not keyword.iskeyword(s)`.'
  },
  {
    name: 'isprintable',
    category: 'check',
    signature: 's.isprintable()',
    params: 'Không có tham số.',
    returns: 'bool — `True` nếu chuỗi rỗng hoặc mọi ký tự đều hiển thị được (không chứa ký tự điều khiển như `\\n`, `\\t`, `\\x00`).',
    shortDesc: 'Kiểm tra chuỗi không chứa ký tự điều khiển ẩn (như \\n, \\t).',
    example: `print("Xin chào!".isprintable())\nprint("Xin chào\\n".isprintable())\nprint("".isprintable())`,
    output: `True\nFalse\nTrue`,
    pitfall: 'Đây là một trong hai phương thức `is*` (cùng với `isascii`) trả về `True` cho chuỗi rỗng `""`! Ngoài ra `\\n` và `\\t` bị coi là KHÔNG printable.'
  },
  {
    name: 'isascii',
    category: 'check',
    signature: 's.isascii()',
    params: 'Không có tham số.',
    returns: 'bool — `True` nếu chuỗi rỗng hoặc mọi ký tự có code point trong khoảng `U+0000` đến `U+007F` (bảng mã ASCII 7-bit).',
    shortDesc: 'Kiểm tra mọi ký tự có nằm trong bảng mã ASCII (0–127) không.',
    example: `print("Python 3.14".isascii())\nprint("Tiếng Việt".isascii())\nprint("".isascii())`,
    output: `True\nFalse\nTrue`,
    pitfall: 'Chuỗi rỗng `"".isascii()` trả về `True`. Chuỗi tiếng Việt có dấu sẽ trả về `False`.'
  },

  // ================= 8. NHÓM KHÁC (3) =================
  {
    name: 'encode',
    category: 'other',
    signature: 's.encode(encoding="utf-8", errors="strict")',
    params: 'encoding (str): bảng mã đích (mặc định `"utf-8"`); errors (str): cách xử lý lỗi (`"strict"`, `"ignore"`, `"replace"`, `"backslashreplace"`, `"xmlcharrefreplace"`, `"namereplace"`).',
    returns: 'bytes — Đối tượng dãy byte đã mã hóa.',
    shortDesc: 'Mã hóa chuỗi văn bản `str` thành dãy `bytes` theo bảng mã chỉ định.',
    example: `s = "Phở"\nb = s.encode("utf-8")\nprint(b)\nprint(len(s), "code points ->", len(b), "bytes")`,
    output: `b'Ph\\xe1\\xbb\\x9f'\n3 code points -> 5 bytes`,
    pitfall: 'Kết quả trả về là kiểu `bytes` chứ không phải `str`. Để chuyển ngược từ `bytes` về `str`, dùng phương thức `b.decode("utf-8")` của đối tượng `bytes`.'
  },
  {
    name: 'format',
    category: 'other',
    signature: 's.format(*args, **kwargs)',
    params: '*args: các đối số vị trí; **kwargs: các đối số tên khóa thay vào ô `{...}`.',
    returns: 'str — Chuỗi đã định dạng.',
    shortDesc: 'Định dạng chuỗi bằng các ô giữ chỗ `{}` và Format Mini-Language.',
    example: `msg = "Chào {name}, điểm: {score:.2f}"\nprint(msg.format(name="An", score=9.5))`,
    output: `Chào An, điểm: 9.50`,
    pitfall: 'Để in dấu ngoặc nhọn nguyên bản `{` hoặc `}`, phải nhân đôi thành `{{` hoặc `}}`. Tuyệt đối không cho người dùng cuối nhập chuỗi mẫu `s` trực tiếp rồi gọi `s.format(...)` (lỗ hổng rò rỉ thuộc tính).'
  },
  {
    name: 'format_map',
    category: 'other',
    signature: 's.format_map(mapping, /)',
    params: 'mapping (Mapping): một đối tượng từ điển (`dict` hoặc lớp con của `dict`) truyền trực tiếp không cần giải nén `**`.',
    returns: 'str — Chuỗi đã định dạng.',
    shortDesc: 'Định dạng chuỗi dùng trực tiếp một đối tượng mapping (hỗ trợ `__missing__`).',
    example: `class SafeDict(dict):\n    def __missing__(self, key):\n        return f"<{key}>"\n\ntpl = "Xin chào {user}, vai trò: {role}"\nprint(tpl.format_map(SafeDict(user="Bình")))`,
    output: `Xin chào Bình, vai trò: <role>`,
    pitfall: 'Khác với `s.format(**d)` vốn sao chép dict và ném `KeyError` ngay khi thiếu khóa, `s.format_map(d)` truyền thẳng đối tượng `d` nên tận dụng được phương thức `__missing__` của lớp con `dict`.'
  }
];
