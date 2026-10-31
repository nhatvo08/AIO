/**
 * Cấu trúc Chương trình Đào tạo Chuyên sâu Python 3.14.8
 * Hệ thống 4 Học phần Toàn diện (219 bài học, 18 phần):
 * - HỌC PHẦN I: Python Nền tảng & Số học Máy tính (3 Phần, 43 Bài học)
 * - HỌC PHẦN II: Làm chủ Chuỗi (str) & Unicode CPython (8 Phần, 28 Bài học, 47 Methods, 5 Widgets)
 * - HỌC PHẦN III: Learning Python — Cú pháp & Kiểu Dữ liệu (6 Phần, 138 Bài học)
 * - HỌC PHẦN IV: Learning Python — Câu lệnh Nâng cao & Thực thi (1 Phần, 10 Bài học)
 */

export const COURSE_META = {
  title: 'Chuyên sâu Python 3.14.8: Nền tảng, Chuỗi (str) & Các Kiểu Số (numbers)',
  version: 'Python 3.14.8',
  subtitle: 'Hệ thống học tập chuyên sâu: Nền tảng cốt lõi, Kiến trúc Chuỗi (Unicode, 47 methods, f/t-strings PEP 750, CPython PEP 393) & Số học Máy tính (IEEE 754, int vô hạn, Decimal & Fraction).',
  totalCourses: 4,
  totalParts: 19,
  totalLessons: 229,
  totalMethods: 47
};

export const COURSES = [
  {
    id: 'course-python',
    number: 'Học phần I',
    code: 'PYTHON',
    title: 'Python',
    shortTitle: 'Python',
    badge: 'Nền tảng & Số học',
    icon: '🐍',
    accentColor: '#10b981',
    tagline: 'Hiểu từ Bản chất đến Bộ nhớ — Nền tảng Cốt lõi, Mô hình Tên-Đối tượng và Số học Máy tính',
    description: 'Chương trình đào tạo Python chuyên sâu ưu tiên hiểu bản chất: vì sao Python cư xử như vậy, bên dưới bộ nhớ CPython hoạt động ra sao. Từ mô hình đối tượng, tính bất biến đến tư duy thuật toán và biểu diễn số học máy tính.',
    totalParts: 3,
    totalLessons: 43,
    totalMethods: 0,
    widgetsCount: 2,
    parts: [
      {
        id: 'part-0',
        number: 'Phần 0',
        title: 'Nền tảng Python',
        level: 'Cơ bản',
        description: 'Kiến thức nền tảng nhất để bắt đầu: bộ nhớ máy tính, mô hình tên - đối tượng, tính bất biến, truthiness, bản đồ 10 kiểu dữ liệu, hàm và đọc lỗi.',
        lessons: [
          {
            id: 'p0-01',
            number: '0.1',
            title: 'Máy tính lưu và xử lý thông tin như thế nào',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['bit', 'byte', 'nhị phân', 'hex', 'bù hai', 'str vs bytes', 'trình thông dịch']
          },
          {
            id: 'p0-02',
            number: '0.2',
            title: 'Python là gì và chương trình Python chạy ra sao',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['CPython', 'bytecode', 'PVM', 'kiểu động chặt chẽ', 'REPL', 'venv', 'pip']
          },
          {
            id: 'p0-03',
            number: '0.3',
            title: 'Mô hình đối tượng: Tên, đối tượng và phép gán',
            level: 'Cơ bản',
            duration: '35 phút',
            isNew314: false,
            keywords: ['id', 'type', 'value', 'biến là nhãn tên', 'aliasing', 'is vs ==', 'del', 'refcount', 'None']
          },
          {
            id: 'p0-04',
            number: '0.4',
            title: 'Kiểu dữ liệu và tính bất biến (Immutable vs Mutable)',
            level: 'Cơ bản',
            duration: '35 phút',
            isNew314: false,
            keywords: ['immutable', 'mutable', 'tuple chứa list', 'a += b', 'shallow copy', 'deep copy', 'hashable']
          },
          {
            id: 'p0-05',
            number: '0.5',
            title: 'Biểu thức, toán tử và tính "đúng/sai" (Truthiness)',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['biểu thức vs câu lệnh', 'so sánh dây chuyền', 'short-circuit', 'and or trả về toán hạng', 'truthiness', 'falsy']
          },
          {
            id: 'p0-06',
            number: '0.6',
            title: 'Bản đồ các kiểu dữ liệu có sẵn (Built-in Data Types)',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['int', 'float', 'complex', 'bool', 'str', 'bytes', 'list', 'tuple', 'dict giữ thứ tự', 'set']
          },
          {
            id: 'p0-07',
            number: '0.7',
            title: 'Nhập xuất dữ liệu: print, input, f-string và repr',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['print sep end', 'input luôn là str', 'ValueError', 'f-string', 'repr vs str']
          },
          {
            id: 'p0-08',
            number: '0.8',
            title: 'Điều khiển luồng: if, while, for và cơ chế Iterator',
            level: 'Cơ bản',
            duration: '35 phút',
            isNew314: false,
            keywords: ['if elif else', 'match case', 'for trên iterable', 'iterator', 'range lazy', 'break', 'continue', 'for else', 'thụt lề']
          },
          {
            id: 'p0-09',
            number: '0.9',
            title: 'Hàm: Đối tượng hạng nhất, cơ chế truyền tham số và phạm vi LEGB',
            level: 'Trung cấp',
            duration: '40 phút',
            isNew314: false,
            keywords: ['def', '*args', '**kwargs', 'first-class', 'pass-by-object-reference', 'bẫy default mutable', 'LEGB', 'nonlocal', 'recursion']
          },
          {
            id: 'p0-10',
            number: '0.10',
            title: 'Module, import và Thư viện chuẩn (Standard Library)',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['import', 'sys.modules', '__name__ == "__main__"', 'sys.path', 'package', 'batteries included']
          },
          {
            id: 'p0-11',
            number: '0.11',
            title: 'Lỗi và cách đọc lỗi: SyntaxError, Exception và Traceback',
            level: 'Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['syntax vs runtime vs logic', 'traceback từ dưới lên', '7 exceptions', 'try except else finally', 'raise', 'breakpoint']
          },
          {
            id: 'p0-12',
            number: '0.12',
            title: 'Thói quen tự khám phá và kiểm chứng trong REPL',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['help', 'dir', 'type', 'id', 'REPL', 'nghi ngờ thì chạy thử', 'docs.python.org']
          },
          {
            id: 'p0-13',
            number: '0.13',
            title: 'Những hiểu lầm phổ biến cần phá bỏ (Kèm ví dụ phản chứng)',
            level: 'Cơ bản',
            duration: '35 phút',
            isNew314: false,
            keywords: ['8 hiểu lầm', 'phản chứng', 'biến là nhãn tên', 'print vs return', 'thụt lề cú pháp', 'ranh giới nền tảng']
          }
        ]
      },
      {
        id: 'part-0b',
        number: 'Phần 0B',
        title: 'Flowchart và tư duy thuật toán',
        level: 'Từ cơ bản đến chuyên sâu',
        description: 'Rèn luyện tư duy phân tích bài toán, thiết kế thuật toán, đọc hiểu và kiểm tra logic qua 3 tầng: Nền tư duy (B1.1–B1.7), Rèn tư duy thực chiến (B2.1–B2.8) và Phân tích nâng cao (B3.1–B3.9).',
        lessons: [
          {
            id: 'p0b-01',
            number: 'B1.1',
            title: 'Thuật toán là gì và Mô hình Đầu vào – Xử lý – Đầu ra (IPO)',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['thuật toán', 'IPO', 'hữu hạn', 'rõ ràng', 'đầu vào đầu ra', 'phân tích bài toán']
          },
          {
            id: 'p0b-02',
            number: 'B1.2',
            title: 'Flowchart để làm gì và không làm gì: So sánh với Mã giả (Pseudocode)',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['flowchart', 'mã giả', 'pseudocode', 'công cụ tư duy', 'khi nào nên vẽ']
          },
          {
            id: 'p0b-03',
            number: 'B1.3',
            title: 'Các ký hiệu Flowchart chuẩn hóa theo tiêu chuẩn ISO 5807',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['ISO 5807', 'oval', 'hình thoi', 'hình chữ nhật', 'bình hành', 'lục giác', 'subroutine']
          },
          {
            id: 'p0b-04',
            number: 'B1.4',
            title: '7 Quy tắc vàng để vẽ Flowchart đúng và không gây hiểu lầm',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['quy tắc vẽ đúng', 'một điểm bắt đầu', 'nhánh cụt', 'nhãn rẽ nhánh', 'hướng chảy']
          },
          {
            id: 'p0b-05',
            number: 'B1.5',
            title: 'Ba cấu trúc điều khiển nền tảng: Tuần tự, Rẽ nhánh và Lặp',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['tuần tự', 'rẽ nhánh', 'lặp', 'sơ đồ đối chiếu code', 'if else', 'while']
          },
          {
            id: 'p0b-06',
            number: 'B1.6',
            title: '5 Ví dụ nền tảng: Chẵn/Lẻ, Max 3 số, Tổng 1..n, Đếm và Số nguyên tố',
            level: 'Cơ bản',
            duration: '35 phút',
            isNew314: false,
            keywords: ['chẵn lẻ', 'max 3 số', 'tổng 1..n', 'đếm', 'số nguyên tố cơ bản']
          },
          {
            id: 'p0b-07',
            number: 'B1.7',
            title: 'Bảng theo dõi giá trị biến (Trace Table) và Kỹ năng "Chạy tay" (Dry Run)',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['trace table', 'dry run', 'chạy tay', 'theo dõi biến', 'bắt lỗi logic']
          },
          {
            id: 'p0b-08',
            number: 'B2.1',
            title: 'Mổ xẻ các dạng vòng lặp: Pre-test, Post-test, Lồng nhau và Sentinel',
            level: 'Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['pre-test', 'post-test', 'do-while', 'vòng lặp lồng', 'lính canh sentinel']
          },
          {
            id: 'p0b-09',
            number: 'B2.2',
            title: '8 Mẫu thuật toán lặp kinh điển (Algorithmic Loop Patterns)',
            level: 'Trung cấp',
            duration: '40 phút',
            isNew314: false,
            keywords: ['counter', 'accumulator', 'flag', 'min max', 'swap', 'validation', 'linear search', 'for else']
          },
          {
            id: 'p0b-10',
            number: 'B2.3',
            title: 'Thuật toán kinh điển qua Flowchart: Euclid GCD, Nguyên tố tối ưu, Binary Search và Bubble Sort',
            level: 'Trung cấp',
            duration: '45 phút',
            isNew314: false,
            keywords: ['Euclid GCD', 'nguyên tố căn n', 'binary search', 'bubble sort', 'cờ hiệu tối ưu']
          },
          {
            id: 'p0b-11',
            number: 'B2.4',
            title: 'Kỹ thuật chia nhỏ bài toán (Modularization) và Flowchart nhiều cấp',
            level: 'Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['top-down', 'modularization', 'subroutine', 'predefined process', 'scope biến']
          },
          {
            id: 'p0b-12',
            number: 'B2.5',
            title: 'Xử lý ngoại lệ và Rẽ nhánh phòng ngừa: LBYL vs EAFP trên Flowchart',
            level: 'Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['LBYL', 'EAFP', 'try except', 'TOCTOU', 'phòng ngừa lỗi']
          },
          {
            id: 'p0b-13',
            number: 'B2.6',
            title: 'Từ Flowchart đến Kiểm thử: Bao phủ nhánh và Thiết kế Test Case',
            level: 'Trung cấp',
            duration: '40 phút',
            isNew314: false,
            keywords: ['branch coverage', 'kiểm thử hộp trắng', 'giá trị biên', 'boundary analysis', 'assert']
          },
          {
            id: 'p0b-14',
            number: 'B2.7',
            title: 'Dịch ngược: Từ Code Python ra Flowchart và Nhận diện Code Smell',
            level: 'Trung cấp',
            duration: '40 phút',
            isNew314: false,
            keywords: ['dịch ngược', 'reverse engineering', 'code smell', 'guard clauses', 'arrow anti-pattern']
          },
          {
            id: 'p0b-15',
            number: 'B2.8',
            title: '"Từ điển" Lỗi thường gặp trong Flowchart và Logic (Flowchart Debugging)',
            level: 'Trung cấp',
            duration: '45 phút',
            isNew314: false,
            keywords: ['infinite loop', 'off-by-one', 'nhánh cụt', 'mã chết', 'flowchart debugging']
          },
          {
            id: 'p0b-16',
            number: 'B3.1',
            title: 'Control Flow Graph (CFG) và Khối cơ bản (Basic Block)',
            level: 'Chuyên sâu',
            duration: '45 phút',
            isNew314: false,
            keywords: ['CFG', 'basic block', 'single entry single exit', 'trình biên dịch', 'dis', 'bytecode']
          },
          {
            id: 'p0b-17',
            number: 'B3.2',
            title: 'Định lý Böhm–Jacopini và Lập trình có cấu trúc (Structured Programming)',
            level: 'Chuyên sâu',
            duration: '40 phút',
            isNew314: false,
            keywords: ['Böhm-Jacopini', 'Dijkstra', 'GOTO considered harmful', 'SESE', 'spaghetti code']
          },
          {
            id: 'p0b-18',
            number: 'B3.3',
            title: 'Chứng minh tính đúng đắn của Thuật toán: Bất biến vòng lặp và Hàm giảm',
            level: 'Chuyên sâu',
            duration: '45 phút',
            isNew314: false,
            keywords: ['loop invariant', 'hàm giảm', 'variant function', 'tính dừng', 'Hoare triple']
          },
          {
            id: 'p0b-19',
            number: 'B3.4',
            title: 'Phân tích độ phức tạp thời gian từ hình dáng Flowchart (Big O Trực quan)',
            level: 'Chuyên sâu',
            duration: '40 phút',
            isNew314: false,
            keywords: ['Big O', 'tần suất cạnh', 'O(1)', 'O(n)', 'O(n^2)', 'O(log n)', 'bottlenecks']
          },
          {
            id: 'p0b-20',
            number: 'B3.5',
            title: 'Đo lường độ phức tạp chu trình (Cyclomatic Complexity — Chỉ số McCabe)',
            level: 'Chuyên sâu',
            duration: '45 phút',
            isNew314: false,
            keywords: ['McCabe', 'Cyclomatic Complexity', 'M = E - N + 2P', 'M = D + 1', 'số test case tối thiểu']
          },
          {
            id: 'p0b-21',
            number: 'B3.6',
            title: 'Đệ quy trong Flowchart và Call Stack (Recursion vs Iteration)',
            level: 'Chuyên sâu',
            duration: '45 phút',
            isNew314: false,
            keywords: ['đệ quy', 'call stack', 'stack frame', 'RecursionError', 'Fibonacci', 'khử đệ quy']
          },
          {
            id: 'p0b-22',
            number: 'B3.7',
            title: 'Máy trạng thái hữu hạn (FSM) và Các họ sơ đồ thuật toán',
            level: 'Chuyên sâu',
            duration: '45 phút',
            isNew314: false,
            keywords: ['FSM', 'state diagram', 'match case', 'Swimlane', 'UML Activity', 'DFD']
          },
          {
            id: 'p0b-23',
            number: 'B3.8',
            title: 'Giới hạn của Phân tích: Bài toán dừng (Halting Problem của Alan Turing)',
            level: 'Chuyên sâu',
            duration: '45 phút',
            isNew314: false,
            keywords: ['Halting Problem', 'Alan Turing', 'nghịch lý tự quy chiếu', 'bất khả quyết', 'timeout']
          },
          {
            id: 'p0b-24',
            number: 'B3.9',
            title: 'Đồ án Mini: Thiết kế Hệ thống Máy bán hàng tự động (Smart Vending Machine)',
            level: 'Chuyên sâu',
            duration: '60 phút',
            isNew314: false,
            keywords: ['đồ án mini', 'vending machine', 'FSM', 'greedy change', 'McCabe', 'đánh đổi thiết kế']
          }
        ]
      },
      {
        id: 'part-1',
        number: 'Phần 1',
        title: 'Các kiểu số trong Python',
        level: 'Chuyên sâu',
        description: 'Khám phá sâu bản chất các kiểu số trong Python 3.14: từ số nguyên vô hạn độ chính xác int, số thực IEEE 754 float 64-bit với cạm bẫy làm tròn, số phức complex & bool, đến Decimal tài chính, Fraction tối giản cùng ma trận nâng kiểu.',
        lessons: [
          {
            id: 'p9-01',
            number: '1.1',
            title: 'Bức tranh Tổng thể các Kiểu Số & Tháp Kiểu numbers',
            level: 'Nâng cao',
            duration: '30 phút',
            isNew314: false,
            keywords: ['số học', 'numbers', 'tháp số', 'Number', 'Complex', 'Real', 'Rational', 'Integral', 'int', 'float', 'complex', 'bool', 'Decimal', 'Fraction', 'PEP 3141']
          },
          {
            id: 'p9-02',
            number: '1.2',
            title: 'Số nguyên int: Độ chính xác Tùy ý & Cơ chế CPython',
            level: 'Nâng cao',
            duration: '35 phút',
            isNew314: false,
            keywords: ['int', 'bignum', 'arbitrary-precision', 'nhị phân', 'bát phân', 'hexadecimal', 'bitwise', 'bit_length', 'bit_count', 'floor division', 'divmod', 'pow 3 tham số', 'sys.set_int_max_str_digits', 'Small Integer Cache', 'is vs ==']
          },
          {
            id: 'p9-03',
            number: '1.3',
            title: 'Số thực float: Chuẩn IEEE 754 & Cạm bẫy Dấu phẩy động',
            level: 'Chuyên sâu',
            duration: '40 phút',
            isNew314: false,
            keywords: ['float', 'IEEE 754', 'binary64', '0.1 + 0.2 != 0.3', 'mantissa', 'exponent', 'bias 1023', 'machine epsilon', 'sys.float_info', 'ULP', '2**53', 'inf', 'nan', 'số 0 âm', 'math.isclose', 'Banker rounding', 'round(2.675, 2)', 'float.hex', 'as_integer_ratio']
          },
          {
            id: 'p9-04',
            number: '1.4',
            title: 'Số phức complex & Kiểu luận lý bool',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['complex', 'số phức', 'real', 'imag', 'conjugate', 'j', 'cmath', 'cmath.sqrt', 'polar', 'bool', 'bool là int', 'True + True', 'sum boolean', 'chỉ số bool']
          },
          {
            id: 'p9-05',
            number: '1.5',
            title: 'Số Thập phân Decimal & Số Hữu tỷ Fraction',
            level: 'Nâng cao',
            duration: '35 phút',
            isNew314: false,
            keywords: ['decimal', 'Decimal', 'IEEE 854', 'tiền tệ', 'ngân hàng', 'ROUND_HALF_UP', 'ROUND_HALF_EVEN', 'quantize', 'Decimal context', 'fractions', 'Fraction', 'số hữu tỷ', 'phân số tối giản', 'đánh đổi hiệu năng']
          },
          {
            id: 'p9-06',
            number: '1.6',
            title: 'Phép toán Liên kiểu, Ma trận Chọn kiểu & 6 Hiểu lầm Phổ biến',
            level: 'Chuyên sâu',
            duration: '40 phút',
            isNew314: false,
            keywords: ['nâng kiểu', 'type coercion', 'phép chia float', '1 == 1.0 == True', 'hash', 'set trùng lặp', 'dict key trùng', 'ma trận chọn kiểu', 'hiểu lầm số học', 'mythbusting']
          }
        ]
      }
    ]
  },
  {
    id: 'course-str',
    number: 'Học phần II',
    code: 'STR',
    title: 'Làm chủ Chuỗi (str) trong Python 3.14.8',
    shortTitle: 'Chuỗi (str)',
    badge: 'str Masterclass',
    icon: '🔤',
    accentColor: '#2563eb',
    tagline: 'Cấu trúc Thống nhất 8 Phần — Từ Nền tảng Unicode đến CPython Internals & Bảo mật Thực chiến',
    description: 'Hệ thống hóa toàn diện toàn bộ kiến thức về kiểu chuỗi str trong Python 3.14: trọn bộ 47 phương thức public, format mini-language, f-string & t-string (PEP 750), Unicode NFC/NFD, Regular Expressions, CPython PEP 393 và phòng chống các lỗ hổng Injection.',
    totalParts: 8,
    totalLessons: 28,
    totalMethods: 47,
    widgetsCount: 5,
    parts: [
      {
        id: 'part-1',
        number: 'Phần 1',
        title: 'Nền tảng (Cơ bản)',
        level: 'Cơ bản',
        description: 'Hiểu rõ bản chất kiểu str là dãy bất biến các Unicode code point, cách viết chuỗi, đánh chỉ số, cắt lát (slicing), tính bất biến và các toán tử cơ bản.',
        lessons: [
          {
            id: 'p1-01',
            number: '1.1',
            title: 'str là gì? Chuỗi Unicode bất biến, type() và len()',
            level: 'Cơ bản',
            duration: '20 phút',
            isNew314: false,
            keywords: ['str', 'unicode', 'code point', 'type', 'len', 'isinstance', 'chuỗi rỗng']
          },
          {
            id: 'p1-02',
            number: '1.2',
            title: 'Cách viết chuỗi: Nháy đơn/đôi/ba, Escape, Raw string, print & repr',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['escape', 'raw string', 'r""', 'triple quotes', 'print', 'repr', 'ascii', 'nối chuỗi ngầm định', '\\uXXXX', '\\N']
          },
          {
            id: 'p1-03',
            number: '1.3',
            title: 'Chỉ số (Indexing) và Cắt lát (Slicing): s[start:stop:step] & đối tượng slice',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['index', 'slice', 'slicing', 'start', 'stop', 'step', 'đảo chuỗi', '[::-1]', 'IndexError']
          },
          {
            id: 'p1-04',
            number: '1.4',
            title: 'Tính bất biến (Immutability): Vì sao s[0]="x" lỗi, tạo chuỗi mới & id()',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['immutability', 'bất biến', 'TypeError', 'id()', 'object identity', 'bộ nhớ']
          },
          {
            id: 'p1-05',
            number: '1.5',
            title: 'Toán tử & Hàm cơ bản: +, *, in, so sánh code point, min/max/sorted, enumerate, ord/chr',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['toán tử', 'in', 'not in', 'so sánh chuỗi', 'min', 'max', 'sorted', 'reversed', 'enumerate', 'ord', 'chr']
          }
        ]
      },
      {
        id: 'part-2',
        number: 'Phần 2',
        title: 'Phương thức của str (Trung cấp)',
        level: 'Trung cấp',
        description: 'Làm chủ toàn bộ 47 phương thức public của str trong Python 3.14 theo từng nhóm chức năng, kèm bảng tra cứu và trình khám phá tương tác.',
        lessons: [
          {
            id: 'p2-01',
            number: '2.1',
            title: 'Nhóm chữ hoa / thường: upper, lower, title, capitalize, swapcase, casefold',
            level: 'Trung cấp',
            duration: '25 phút',
            isNew314: false,
            keywords: ['upper', 'lower', 'title', 'capitalize', 'swapcase', 'casefold', 'chữ hoa', 'chữ thường']
          },
          {
            id: 'p2-02',
            number: '2.2',
            title: 'Nhóm tìm kiếm: find, rfind, index, rindex, count, startswith, endswith',
            level: 'Trung cấp',
            duration: '25 phút',
            isNew314: false,
            keywords: ['find', 'rfind', 'index', 'rindex', 'count', 'startswith', 'endswith', 'ValueError']
          },
          {
            id: 'p2-03',
            number: '2.3',
            title: 'Nhóm cắt dọn: strip, lstrip, rstrip, removeprefix, removesuffix',
            level: 'Trung cấp',
            duration: '25 phút',
            isNew314: false,
            keywords: ['strip', 'lstrip', 'rstrip', 'removeprefix', 'removesuffix', 'PEP 616', 'cắt khoảng trắng']
          },
          {
            id: 'p2-04',
            number: '2.4',
            title: 'Nhóm tách và ghép: split, rsplit, splitlines, partition, rpartition, join',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['split', 'rsplit', 'splitlines', 'partition', 'rpartition', 'join', 'maxsplit']
          },
          {
            id: 'p2-05',
            number: '2.5',
            title: 'Nhóm thay thế & căn lề: replace, translate, maketrans, center, ljust, rjust, zfill, expandtabs',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['replace', 'translate', 'maketrans', 'center', 'ljust', 'rjust', 'zfill', 'expandtabs']
          },
          {
            id: 'p2-06',
            number: '2.6',
            title: 'Nhóm kiểm tra is* & khác: Phân biệt isdecimal/isdigit/isnumeric, encode, format, format_map',
            level: 'Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['isalpha', 'isdigit', 'isdecimal', 'isnumeric', 'isalnum', 'isspace', 'isupper', 'islower', 'istitle', 'isidentifier', 'isprintable', 'isascii', 'encode', 'format', 'format_map']
          },
          {
            id: 'p2-07',
            number: '2.7',
            title: 'Bảng tra cứu đầy đủ 47 phương thức public của str (Đối chiếu dir(str) Python 3.14)',
            level: 'Trung cấp',
            duration: '25 phút',
            isNew314: false,
            keywords: ['dir(str)', '47 phương thức', 'tra cứu', 'cheat sheet phương thức', 'method explorer']
          }
        ]
      },
      {
        id: 'part-3',
        number: 'Phần 3',
        title: 'Định dạng chuỗi (Trung cấp → Nâng cao)',
        level: 'Nâng cao',
        description: 'So sánh 4 thế hệ định dạng chuỗi, Format Specification Mini-Language, f-string PEP 701, giao thức __format__ và điểm mới nổi bật nhất Python 3.14: Template Strings (t-strings, PEP 750).',
        lessons: [
          {
            id: 'p3-01',
            number: '3.1',
            title: 'So sánh 4 cách định dạng: %, str.format(), f-string và t-string',
            level: 'Trung cấp',
            duration: '25 phút',
            isNew314: true,
            keywords: ['%', 'printf', 'str.format', 'f-string', 't-string', 'so sánh định dạng']
          },
          {
            id: 'p3-02',
            number: '3.2',
            title: 'Format Specification Mini-Language đầy đủ: fill, align, sign, #, 0, width, grouping, precision, type',
            level: 'Nâng cao',
            duration: '35 phút',
            isNew314: false,
            keywords: ['format spec', 'mini-language', 'align', 'precision', 'grouping', 'hex', 'binary', 'datetime format']
          },
          {
            id: 'p3-03',
            number: '3.3',
            title: 'f-string chuyên sâu: !r !s !a, {x=}, format lồng nhau & cải tiến PEP 701 (Python 3.12+)',
            level: 'Nâng cao',
            duration: '30 phút',
            isNew314: false,
            keywords: ['f-string', 'conversion', '!r', '!s', '!a', '{x=}', 'PEP 701', 'nested format']
          },
          {
            id: 'p3-04',
            number: '3.4',
            title: '__format__, hàm format() và module string (Formatter, Template `$name`, hằng số)',
            level: 'Nâng cao',
            duration: '30 phút',
            isNew314: true,
            keywords: ['__format__', 'format()', 'string.Formatter', 'string.Template', 'ascii_letters', 'digits', 'string.templatelib']
          },
          {
            id: 'p3-05',
            number: '3.5',
            title: 'Template Strings (t-strings) trong Python 3.14 (PEP 750): Template, Interpolation & Ứng dụng thực tế',
            level: 'Nâng cao',
            duration: '45 phút',
            isNew314: true,
            keywords: ['t-string', 't""', 'PEP 750', 'string.templatelib', 'Template', 'Interpolation', 'convert', 'strings', 'interpolations', 'values', 'HTML escape', 'SQL parameterization']
          }
        ]
      },
      {
        id: 'part-4',
        number: 'Phần 4',
        title: 'Unicode, bytes và Mã hóa (Nâng cao)',
        level: 'Nâng cao',
        description: 'Hiểu sâu kiến trúc Unicode, UTF-8/16/32, chuyển đổi str ↔ bytes, bộ xử lý lỗi mã hóa, chuẩn hóa NFC/NFD cho Tiếng Việt và các cạm bẫy quốc tế hóa.',
        lessons: [
          {
            id: 'p4-01',
            number: '4.1',
            title: 'Code point, UTF-8/16/32, sự khác biệt str vs bytes/bytearray, encode & decode',
            level: 'Nâng cao',
            duration: '35 phút',
            isNew314: false,
            keywords: ['unicode', 'UTF-8', 'UTF-16', 'UTF-32', 'bytes', 'bytearray', 'encode', 'decode']
          },
          {
            id: 'p4-02',
            number: '4.2',
            title: 'Bộ xử lý lỗi mã hóa (Error Handlers) và module unicodedata (normalize, category, name)',
            level: 'Nâng cao',
            duration: '30 phút',
            isNew314: false,
            keywords: ['strict', 'ignore', 'replace', 'backslashreplace', 'xmlcharrefreplace', 'namereplace', 'surrogateescape', 'unicodedata', 'normalize', 'NFC', 'NFD', 'NFKC', 'NFKD']
          },
          {
            id: 'p4-03',
            number: '4.3',
            title: 'Tiếng Việt & Cạm bẫy Unicode: Dấu tổ hợp vs dựng sẵn, NFC, tạo slug, len("🇻🇳"), casefold & open()',
            level: 'Nâng cao',
            duration: '35 phút',
            isNew314: false,
            keywords: ['tiếng Việt', 'dấu tổ hợp', 'dấu dựng sẵn', 'NFC', 'NFD', 'slugify', 'grapheme cluster', 'len("🇻🇳")', 'casefold', 'ß', 'open encoding']
          }
        ]
      },
      {
        id: 'part-5',
        number: 'Phần 5',
        title: 'Xử lý văn bản nâng cao (Nâng cao)',
        level: 'Nâng cao',
        description: 'Làm chủ biểu thức chính quy (re) từ cơ bản đến nhóm nguyên tử/lượng từ chiếm hữu, phòng tránh catastrophic backtracking, cùng bộ công cụ textwrap, difflib, shlex, fnmatch, StringIO và ép kiểu số.',
        lessons: [
          {
            id: 'p5-01',
            number: '5.1',
            title: 'Module re (Phần 1): search, match, fullmatch, findall, finditer, sub, split, compile, nhóm có tên & cờ',
            level: 'Nâng cao',
            duration: '35 phút',
            isNew314: false,
            keywords: ['re', 'regex', 'search', 'match', 'fullmatch', 'findall', 'finditer', 'sub', 'split', 'compile', 'named group', 'IGNORECASE', 'MULTILINE', 'DOTALL']
          },
          {
            id: 'p5-02',
            number: '5.2',
            title: 'Module re (Phần 2): Tham lam vs Lười biếng, Lookaround, VERBOSE, Nhóm nguyên tử & Catastrophic Backtracking',
            level: 'Nâng cao',
            duration: '35 phút',
            isNew314: false,
            keywords: ['greedy', 'lazy', 'lookahead', 'lookbehind', 're.VERBOSE', 'atomic group', 'possessive quantifier', 'catastrophic backtracking', 'ReDoS']
          },
          {
            id: 'p5-03',
            number: '5.3',
            title: 'Công cụ văn bản (textwrap, difflib, shlex, fnmatch, StringIO) & Chuyển đổi chuỗi ↔ số (int, float, Decimal, literal_eval)',
            level: 'Nâng cao',
            duration: '35 phút',
            isNew314: false,
            keywords: ['textwrap', 'difflib', 'shlex', 'fnmatch', 'StringIO', 'int', 'float', 'Decimal', 'ValueError', 'ast.literal_eval']
          }
        ]
      },
      {
        id: 'part-6',
        number: 'Phần 6',
        title: 'Bên trong CPython và Hiệu năng (Chuyên sâu)',
        level: 'Chuyên sâu',
        description: 'Mổ xẻ cấu trúc bộ nhớ PEP 393 (Latin-1/UCS-2/UCS-4), cơ chế String Interning, thuật toán băm ngẫu nhiên PYTHONHASHSEED và đo kiểm hiệu năng nối chuỗi bằng timeit.',
        lessons: [
          {
            id: 'p6-01',
            number: '6.1',
            title: 'Biểu diễn bộ nhớ của str trong CPython (PEP 393: Latin-1 / UCS-2 / UCS-4) & sys.getsizeof',
            level: 'Chuyên sâu',
            duration: '35 phút',
            isNew314: false,
            keywords: ['CPython', 'PEP 393', 'Latin-1', 'UCS-2', 'UCS-4', 'sys.getsizeof', 'PyASCIIObject', 'PyCompactUnicodeObject']
          },
          {
            id: 'p6-02',
            number: '6.2',
            title: 'Interning (sys.intern), is vs ==, Băm chuỗi (PYTHONHASHSEED) & Hiệu năng += vs join (timeit)',
            level: 'Chuyên sâu',
            duration: '35 phút',
            isNew314: false,
            keywords: ['sys.intern', 'interning', 'is vs ==', 'hash', 'PYTHONHASHSEED', 'dict key', 'timeit', '+= vs join']
          }
        ]
      },
      {
        id: 'part-7',
        number: 'Phần 7',
        title: 'Thực chiến và Bảo mật (Chuyên sâu)',
        level: 'Chuyên sâu',
        description: 'Phòng chống lỗ hổng Injection (SQL, XSS, Shell, Format String), tấn công Homoglyph, Type Hints hiện đại (LiteralString, StrEnum), 5 dự án nhỏ và lịch sử tiến hóa chuỗi Python 3.6 → 3.14.',
        lessons: [
          {
            id: 'p7-01',
            number: '7.1',
            title: 'Bảo mật chuỗi, Lazy Logging & Type Hints: Injection, secrets.compare_digest, Homoglyph, LiteralString, StrEnum',
            level: 'Chuyên sâu',
            duration: '40 phút',
            isNew314: true,
            keywords: ['SQL injection', 'XSS', 'html.escape', 'shlex.quote', 'format injection', 'secrets.compare_digest', 'homoglyph', 'lazy logging', 'Literal', 'LiteralString', 'StrEnum']
          },
          {
            id: 'p7-02',
            number: '7.2',
            title: '5 Dự án nhỏ thực chiến & Bảng lịch sử tính năng chuỗi Python (3.6 → 3.14)',
            level: 'Chuyên sâu',
            duration: '45 phút',
            isNew314: true,
            keywords: ['dự án', 'slugify tiếng Việt', 'đếm từ', 'palindrome', 'mã Caesar', 'HTML builder t-string', 'lịch sử Python 3.6 3.8 3.9 3.11 3.12 3.14']
          }
        ]
      },
      {
        id: 'part-8',
        number: 'Phần 8',
        title: 'Tổng kết & Kiểm tra cuối khóa',
        level: 'Chuyên sâu',
        description: 'Cheat Sheet toàn diện trên một trang, cẩm nang chẩn đoán lỗi thường gặp, Bài kiểm tra cuối khóa và Dự án Capstone tổng hợp.',
        lessons: [
          {
            id: 'p8-01',
            number: '8.1',
            title: 'Tổng kết toàn khóa: Cheat Sheet 1 trang, Từ điển lỗi thường gặp, Bài kiểm tra cuối khóa & Dự án Capstone',
            level: 'Chuyên sâu',
            duration: '45 phút',
            isNew314: true,
            keywords: ['cheat sheet', 'tổng kết', 'TypeError', 'UnicodeDecodeError', 'ValueError', 'capstone', 'final exam', 'kiểm tra cuối khóa']
          }
        ]
      }
    ]
  },
  {
    id: 'course-learning-python',
    number: 'Học phần III',
    code: 'LP',
    title: 'Learning Python (Mark Lutz) — Part 2',
    shortTitle: 'Learning Python — Part 2',
    badge: 'Mark Lutz — 6th Edition',
    icon: '📖',
    accentColor: '#8b5cf6',
    tagline: 'Giáo trình Kinh điển — Khám phá Toàn diện Hệ thống Đối tượng và Thao tác',
    description: 'Chuyên mục học tập theo cuốn giáo trình kinh điển "Learning Python" của Mark Lutz. Khám phá từ bản chất đối tượng cốt lõi, mô hình phân cấp khái niệm đến các cấu trúc dữ liệu dựng sẵn.',
    totalParts: 6,
    totalLessons: 138,
    totalMethods: 0,
    widgetsCount: 0,
    parts: [
      {
        id: 'part-lp-c4',
        number: 'Chương 4',
        chapterNumber: 'Chương 4',
        chapterTitle: 'Giới thiệu các đối tượng Python',
        title: 'Giới thiệu các đối tượng Python',
        fullTitle: 'Chương 4: Giới thiệu các đối tượng Python',
        level: 'Cơ bản đến Trung cấp',
        description: 'Tổng quan nhanh về các kiểu đối tượng cốt lõi dựng sẵn của Python: số, chuỗi, danh sách, từ điển, tuple, tệp, set, bool, None và các khái niệm then chốt.',
        lessons: [
          {
            id: 'lp-c4-00',
            number: 'C4.0',
            title: 'Mở đầu: Giới thiệu các đối tượng Python',
            level: 'Cơ bản',
            duration: '20 phút',
            isNew314: false,
            keywords: ['đối tượng', 'thao tác', 'vùng bộ nhớ', 'mọi thứ là đối tượng', 'số 99']
          },
          {
            id: 'lp-c4-01',
            number: 'C4.1',
            title: 'Hệ thống cấp bậc khái niệm của Python',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['phân cấp', 'module', 'câu lệnh', 'biểu thức', 'đối tượng', '3 trụ cột truyền thống']
          },
          {
            id: 'lp-c4-02',
            number: 'C4.2',
            title: 'Tại sao nên dùng các đối tượng dựng sẵn?',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['đối tượng dựng sẵn', '4 lý do', 'ngăn xếp stack', 'tối ưu C', 'chuẩn hóa']
          },
          {
            id: 'lp-c4-03',
            number: 'C4.3',
            title: 'Các kiểu đối tượng cốt lõi của Python',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['Bảng 4-1', 'literal', 'định kiểu động', 'định kiểu mạnh', 'compiled-code', 'traceback']
          },
          {
            id: 'lp-c4-04',
            number: 'C4.4',
            title: 'Kiểu số (Numbers)',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['kiểu số', 'int', 'float', 'math', 'random', 'lũy thừa', 'DOS 4300 số']
          },
          {
            id: 'lp-c4-05-1',
            number: 'C4.5.1',
            title: 'Chuỗi ký tự: Các thao tác trên dãy tuần tự',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['dãy tuần tự', 'chỉ mục', 'độ dời âm', 'cắt lát', 'slicing', 'ghép nối', 'lặp lại', 'tính đa hình']
          },
          {
            id: 'lp-c4-05-2',
            number: 'C4.5.2',
            title: 'Chuỗi ký tự: Tính bất biến (Immutability)',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['tính bất biến', 'immutable', 'khả biến', 'mutable', 'bytearray', 'list join']
          },
          {
            id: 'lp-c4-05-3',
            number: 'C4.5.3',
            title: 'Chuỗi ký tự: Các phương thức đặc thù theo kiểu',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['phương thức', 'find', 'replace', 'split', 'upper', 'rstrip', 'method chaining']
          },
          {
            id: 'lp-c4-05-4',
            number: 'C4.5.4',
            title: 'Chuỗi ký tự: Định dạng chuỗi (Formatting)',
            level: 'Cơ bản',
            duration: '20 phút',
            isNew314: false,
            keywords: ['định dạng chuỗi', 'formatting', 'biểu thức %', 'format', 'f-string']
          },
          {
            id: 'lp-c4-05-5',
            number: 'C4.5.5',
            title: 'Chuỗi ký tự: Nhận sự trợ giúp (dir & help)',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['dir', 'help', 'Pydoc', '81 thuộc tính', '__add__', 'nạp chồng toán tử']
          },
          {
            id: 'lp-c4-05-6',
            number: 'C4.5.6',
            title: 'Chuỗi ký tự: Các cách khác để viết mã chuỗi',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['escape', 'ký tự thoát', 'nháy ba', 'chuỗi thô', 'raw string', 'byte không nhị phân']
          },
          {
            id: 'lp-c4-05-7',
            number: 'C4.5.7',
            title: 'Chuỗi ký tự: Chuỗi ký tự Unicode và Bytes',
            level: 'Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['Unicode', 'str vs bytes', 'code point', 'encode', 'decode', 'UTF-8', 'UTF-16', 'emoji', 'Latin-1']
          },
          {
            id: 'lp-c4-06-1',
            number: 'C4.6.1',
            title: 'Danh sách: Thao tác trên dãy tuần tự',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['danh sách', 'list', 'dãy tuần tự tổng quát', 'không cố định kích thước', 'khả biến', 'mutable', 'len', 'cắt lát']
          },
          {
            id: 'lp-c4-06-2',
            number: 'C4.6.2',
            title: 'Danh sách: Thao tác đặc thù kiểu dữ liệu',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['append', 'pop', 'del', 'sort', 'reverse', 'thay đổi tại chỗ', 'in-place', 'None']
          },
          {
            id: 'lp-c4-06-3',
            number: 'C4.6.3',
            title: 'Danh sách: Kiểm tra giới hạn biên (Bounds Checking)',
            level: 'Cơ bản',
            duration: '20 phút',
            isNew314: false,
            keywords: ['bounds checking', 'IndexError', 'gán ngoài biên', 'cắt lát an toàn']
          },
          {
            id: 'lp-c4-06-4',
            number: 'C4.6.4',
            title: 'Danh sách: Cấu trúc lồng nhau (Nesting)',
            level: 'Cơ bản',
            duration: '20 phút',
            isNew314: false,
            keywords: ['lồng nhau', 'nesting', 'ma trận', 'matrix 2D', 'M[i][j]', 'NumPy']
          },
          {
            id: 'lp-c4-06-5',
            number: 'C4.6.5',
            title: 'Danh sách: Cú pháp Comprehension',
            level: 'Trung bình',
            duration: '30 phút',
            isNew314: false,
            keywords: ['list comprehension', 'bộ lọc if', 'trích xuất cột', 'đường chéo', 'generator expression', 'next', 'set comprehension', 'dict comprehension']
          },
          {
            id: 'lp-c4-07-1',
            number: 'C4.7.1',
            title: 'Từ điển: Kiểu dữ liệu Ánh xạ (Mappings)',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['từ điển', 'dict', 'ánh xạ', 'mapping', 'khóa giá trị', 'key-value', 'gán tạo khóa mới', 'dict()']
          },
          {
            id: 'lp-c4-07-2',
            number: 'C4.7.2',
            title: 'Từ điển: Cấu trúc lồng nhau & Dọn rác tự động',
            level: 'Trung bình',
            duration: '25 phút',
            isNew314: false,
            keywords: ['từ điển lồng nhau', 'hồ sơ nhân sự', 'rec', 'bộ dọn rác', 'garbage collection', 'đếm tham chiếu', 'json', 'pickle']
          },
          {
            id: 'lp-c4-07-3',
            number: 'C4.7.3',
            title: 'Từ điển: Khóa không tồn tại & Các kỹ thuật kiểm tra',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['KeyError', 'toán tử in', 'not in', 'câu lệnh if', 'dấu hai chấm', 'thụt lề', 'get()', 'ternary']
          },
          {
            id: 'lp-c4-07-4',
            number: 'C4.7.4',
            title: 'Từ điển: Lặp qua Từ điển với Vòng lặp for',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['vòng lặp for', 'lặp ngầm định', 'D.keys()', 'D.values()', 'D.items()', 'sorted()', 'thứ tự chèn']
          },
          {
            id: 'lp-c4-07-5',
            number: 'C4.7.5',
            title: 'Từ điển: Giao thức Lặp & Phép gán Tuple',
            level: 'Trung bình',
            duration: '25 phút',
            isNew314: false,
            keywords: ['giao thức lặp', 'iteration protocol', 'iter()', 'next()', 'StopIteration', 'phép gán tuple', 'tuple assignment', 'unpacking']
          },
          {
            id: 'lp-c4-08',
            number: 'C4.8',
            title: 'Bộ giá trị (Tuples): Dãy tuần tự Bất biến',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['tuple', 'bộ giá trị', 'bất biến', 'immutable', 'index', 'count', 'bảo vệ toàn vẹn dữ liệu', 'khóa từ điển']
          },
          {
            id: 'lp-c4-09-1',
            number: 'C4.9.1',
            title: 'Tệp: Đối tượng Tệp cốt lõi và Thao tác Văn bản',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['tệp', 'file', 'open', 'write', 'read', 'close', 'không có cú pháp hằng', 'for line in open']
          },
          {
            id: 'lp-c4-09-2',
            number: 'C4.9.2',
            title: 'Tệp: Tệp Văn bản Unicode và Tệp Nhị phân',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['encoding utf-8', 'tệp nhị phân', 'bytes', 'b\'...\'', 'chuyển đổi CRLF Windows', 'bytearray']
          },
          {
            id: 'lp-c4-09-3',
            number: 'C4.9.3',
            title: 'Tệp: Các công cụ Nâng cao tương tự Tệp',
            level: 'Trung cấp',
            duration: '25 phút',
            isNew314: false,
            keywords: ['file-like', 'pipes', 'sockets mạng', 'shelve', 'DBM', 'io.StringIO', 'duck typing']
          },
          {
            id: 'lp-c4-10-1',
            number: 'C4.10.1',
            title: 'Các kiểu cốt lõi khác: Tập hợp (Sets)',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['tập hợp', 'set', 'tính duy nhất', 'toán tử tập hợp', 'giao &', 'hợp |', 'hiệu -', 'khử trùng lặp']
          },
          {
            id: 'lp-c4-10-2',
            number: 'C4.10.2',
            title: 'Các kiểu cốt lõi khác: Số Thập phân (Decimal) & Phân số (Fraction)',
            level: 'Trung cấp',
            duration: '25 phút',
            isNew314: false,
            keywords: ['sai số float', 'IEEE 754', 'Decimal', 'độ chính xác cố định', 'Fraction', 'phân số hữu tỉ']
          },
          {
            id: 'lp-c4-10-3',
            number: 'C4.10.3',
            title: 'Các kiểu cốt lõi khác: Boolean và Đối tượng đặc biệt None',
            level: 'Cơ bản',
            duration: '20 phút',
            isNew314: false,
            keywords: ['bool', 'True False', 'kế thừa int', 'truthiness', 'falsy', 'None', 'NoneType', 'is None']
          },
          {
            id: 'lp-c4-10-4',
            number: 'C4.10.4',
            title: 'Kiểu dữ liệu & Làm sao để Phá vỡ Độ linh hoạt của Mã',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['type()', 'isinstance()', 'phá vỡ độ linh hoạt', 'đa hình', 'polymorphism', 'duck typing', 'type hinting']
          },
          {
            id: 'lp-c4-10-5',
            number: 'C4.10.5',
            title: 'Các kiểu do Người dùng định nghĩa: Lớp (Classes) & Lớp Worker',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['class', 'lớp', 'thể hiện', 'instance', 'thuộc tính', 'attribute', 'phương thức', 'method', 'Worker']
          },
          {
            id: 'lp-c4-11',
            number: 'C4.11',
            title: 'Và Mọi thứ Còn lại: Triết lý "Mọi thứ đều là Đối tượng"',
            level: 'Trung cấp',
            duration: '20 phút',
            isNew314: false,
            keywords: ['ngựa thồ cốt lõi', 'đối tượng thực thi', 'hàm là đối tượng', 'mô-đun', 'mọi thứ là đối tượng']
          },
          {
            id: 'lp-c4-12',
            number: 'C4.12',
            title: 'Tóm tắt Chương 4 & Bài kiểm tra Tự đánh giá Kiến thức',
            level: 'Trung bình',
            duration: '35 phút',
            isNew314: false,
            keywords: ['tóm tắt Chương 4', 'bài kiểm tra tự đánh giá', '6 câu hỏi kinh điển', 'đáp án gợi ý', 'bản đồ đối tượng']
          }
        ]
      },
      {
        id: 'part-lp-c5',
        number: 'Chương 5',
        chapterNumber: 'Chương 5',
        chapterTitle: 'Số và biểu thức',
        title: 'Số và biểu thức',
        fullTitle: 'Chương 5: Số và biểu thức',
        level: 'Cơ bản đến Nâng cao',
        description: 'Khám phá chuyên sâu các kiểu đối tượng số cốt lõi và chuyên biệt của Python: số nguyên vô hạn, số thực dấu phẩy động, số phức, hệ đếm (hex, oct, bin), bitwise, dấu gạch dưới, module math/random/statistics, Decimal, Fraction, Set, Boolean và phần mở rộng bên thứ ba.',
        lessons: [
          {
            id: 'lp-c5-00',
            number: 'C5.0',
            title: 'Mở đầu: Khám phá chuyên sâu Đối tượng Số & Tổng quan công cụ',
            level: 'Cơ bản',
            duration: '20 phút',
            isNew314: false,
            keywords: ['đối tượng số', '8 nhóm công cụ', 'built-in', 'third-party', 'toán học cốt lõi']
          },
          {
            id: 'lp-c5-01',
            number: 'C5.1',
            title: 'Hằng số bằng chữ số học (Numeric Literals) & Bảng 5-1',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['literal', 'Bảng 5-1', 'hằng số bằng chữ', 'constructor', 'cú pháp số học']
          },
          {
            id: 'lp-c5-02',
            number: 'C5.2',
            title: 'Toán tử biểu thức Python, Bảng 5-2 & Khung chuyên đề "No-op"',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['biểu thức', 'Bảng 5-2', 'toán tử', '19 bậc ưu tiên', 'no-op', 'Ellipsis', 'type hinting']
          },
          {
            id: 'lp-c5-03',
            number: 'C5.3',
            title: 'Độ ưu tiên, Dấu ngoặc đơn, Nâng kiểu tự động & Tính đa hình',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['precedence', 'ngoặc đơn', 'nâng kiểu tự động', 'converted up', 'operator overloading', 'polymorphism']
          },
          {
            id: 'lp-c5-04',
            number: 'C5.4',
            title: 'Số học trong thực tế: Biến, Biểu thức & Phép gán cơ bản',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['biến', '4 quy tắc biến', 'phép gán', 'chú thích comment', 'NameError', 'REPL']
          },
          {
            id: 'lp-c5-05',
            number: 'C5.5',
            title: 'Định dạng hiển thị số & Phân biệt str với repr',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['định dạng hiển thị', 'sai số float', 'IEEE 754', 'str vs repr', '% formatting', 'f-string']
          },
          {
            id: 'lp-c5-06',
            number: 'C5.6',
            title: 'Toán tử so sánh, So sánh chuỗi & So sánh bằng Float',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['so sánh', 'chained comparisons', 'ngắn mạch', 'so sánh float', 'math.isclose']
          },
          {
            id: 'lp-c5-07',
            number: 'C5.7',
            title: 'Các toán tử chia: Chia thực (/), Chia sàn (//) và Cắt thập phân',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['chia thực', 'chia lấy sàn', 'floor division', 'math.trunc', 'math.floor', 'số âm']
          },
          {
            id: 'lp-c5-08',
            number: 'C5.8',
            title: 'Độ chính xác số nguyên không giới hạn & Giới hạn DOS chuỗi',
            level: 'Trung cấp',
            duration: '25 phút',
            isNew314: false,
            keywords: ['unlimited precision', 'bignum', 'nợ công', 'DOS protection', 'sys.set_int_max_str_digits']
          },
          {
            id: 'lp-c5-09',
            number: 'C5.9',
            title: 'Số phức (Complex Numbers) & Module cmath',
            level: 'Cơ bản',
            duration: '20 phút',
            isNew314: false,
            keywords: ['số phức', 'complex', 'phần thực', 'phần ảo', 'real', 'imag', 'cmath']
          },
          {
            id: 'lp-c5-10',
            number: 'C5.10',
            title: 'Hệ đếm Hex, Octal, Binary: Hằng số, Chuyển đổi & Định dạng',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['hex', 'octal', 'binary', 'oct()', 'hex()', 'bin()', 'int(str, base)', 'eval()', 'định dạng chuỗi']
          },
          {
            id: 'lp-c5-11',
            number: 'C5.11',
            title: 'Thao tác Bitwise: Dịch bit, Mặt nạ bit & bit_length()',
            level: 'Trung cấp',
            duration: '25 phút',
            isNew314: false,
            keywords: ['bitwise', 'dịch bit', 'mặt nạ bit', 'bit-masking', 'bit_length()']
          },
          {
            id: 'lp-c5-12',
            number: 'C5.12',
            title: 'Dấu gạch dưới phân cách trong số & Bẫy dấu phẩy tạo Tuple',
            level: 'Cơ bản',
            duration: '20 phút',
            isNew314: false,
            keywords: ['dấu gạch dưới', 'phân cách chữ số', 'bẫy dấu phẩy', 'tuple literal', 'int()', 'float()']
          },
          {
            id: 'lp-c5-13',
            number: 'C5.13',
            title: 'Công cụ số học dựng sẵn: Module math & 3 cách tính Căn bậc hai',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['math', 'pow', 'abs', 'round', 'căn bậc hai', 'builtins namespace', 'import']
          },
          {
            id: 'lp-c5-14',
            number: 'C5.14',
            title: 'Module Thống kê & Ngẫu nhiên: statistics và random',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['statistics', 'random', 'mean', 'median', 'randint', 'choice', 'shuffle']
          },
          {
            id: 'lp-c5-15',
            number: 'C5.15',
            title: 'Đối tượng Decimal: Số thực Thập phân Độ chính xác Cố định',
            level: 'Trung cấp',
            duration: '25 phút',
            isNew314: false,
            keywords: ['Decimal', 'độ chính xác cố định', 'cơ số 10', 'decimal.getcontext()', 'tiền tệ']
          },
          {
            id: 'lp-c5-16',
            number: 'C5.16',
            title: 'Đối tượng Phân số (Fraction Objects) & So sánh Độ chính xác Số học',
            level: 'Trung cấp',
            duration: '25 phút',
            isNew314: false,
            keywords: ['Fraction', 'phân số hữu tỉ', 'tử số', 'mẫu số', 'GCD', 'so sánh độ chính xác']
          },
          {
            id: 'lp-c5-17',
            number: 'C5.17',
            title: 'Đối tượng Tập hợp (Set): Khái niệm, Cú pháp & Thao tác Cơ bản',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['tập hợp', 'set', 'tính duy nhất', 'toán tử tập hợp', 'hiệu', 'hợp', 'giao', 'hiệu đối xứng']
          },
          {
            id: 'lp-c5-18',
            number: 'C5.18',
            title: 'Tập hợp nâng cao: Ràng buộc Bất biến, Frozenset & Comprehensions',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['hashable', 'bất biến', 'frozenset', 'set comprehension', 'toán tử vs phương thức']
          },
          {
            id: 'lp-c5-19',
            number: 'C5.19',
            title: 'Tại sao nên dùng Tập hợp? 4 Ứng dụng Thực tế & Tình huống Nhân sự',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['ứng dụng set', 'lọc trùng lặp', 'so sánh không thứ tự', 'duyệt đồ thị', 'case study nhân sự']
          },
          {
            id: 'lp-c5-20',
            number: 'C5.20',
            title: 'Đối tượng Boolean (bool) & "Sự ngụy trang" của Số nguyên',
            level: 'Cơ bản',
            duration: '20 phút',
            isNew314: false,
            keywords: ['bool', 'True', 'False', 'lớp con int', 'True + 4', 'while True', 'flag']
          },
          {
            id: 'lp-c5-21',
            number: 'C5.21',
            title: 'Các phần mở rộng số học: NumPy, SciPy, pandas & So sánh MATLAB',
            level: 'Cơ bản',
            duration: '20 phút',
            isNew314: false,
            keywords: ['NumPy', 'SciPy', 'pandas', 'matplotlib', 'Jupyter', 'MATLAB', 'khoa học dữ liệu']
          },
          {
            id: 'lp-c5-22',
            number: 'C5.22',
            title: 'Tóm tắt Chương 5 & Bộ 9 câu hỏi ôn tập kèm lời giải chi tiết',
            level: 'Trung bình',
            duration: '35 phút',
            isNew314: false,
            keywords: ['tóm tắt Chương 5', '9 câu hỏi ôn tập', 'đáp án gợi ý', 'kiểm tra kiến thức']
          }
        ]
      },
      {
        id: 'part-lp-c6',
        number: 'Chương 6',
        chapterNumber: 'Chương 6',
        chapterTitle: 'Khúc đệm về định kiểu động',
        title: 'Khúc đệm về định kiểu động',
        fullTitle: 'Chương 6: Khúc đệm về định kiểu động',
        level: 'Cơ bản đến Nâng cao',
        description: 'Khám phá toàn diện mô hình định kiểu động và cơ chế phép gán nền tảng trong Python: biến, đối tượng và tham chiếu, hai trường tiêu đề PyObject, thu gom rác tự động, tham chiếu vòng, tham chiếu chia sẻ và thay đổi tại chỗ, sao chép nông/sâu, so sánh == vs is, caching số nguyên nhỏ & đối tượng bất tử, tính đa hình, nghịch lý gợi ý kiểu (type hinting) và tham chiếu yếu.',
        lessons: [
          {
            id: 'lp-c6-00',
            number: 'C6.0',
            title: 'Mở đầu: Khúc đệm về Định kiểu Động & Bí ẩn Thiếu vắng Khai báo',
            level: 'Cơ bản',
            duration: '20 phút',
            isNew314: false,
            keywords: ['định kiểu động', 'tính đa hình', 'polymorphism', 'khai báo biến', 'biến đối tượng liên kết']
          },
          {
            id: 'lp-c6-01',
            number: 'C6.1',
            title: 'Biến, Đối tượng và Tham chiếu: 3 Bước của Phép gán & Sơ đồ Hình 6-1',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['khởi tạo biến', 'kiểu biến', 'sử dụng biến', '3 bước phép gán', 'Hình 6-1', 'bảng tên']
          },
          {
            id: 'lp-c6-02',
            number: 'C6.2',
            title: 'Cấu trúc Đối tượng CPython & Tham chiếu Python cho Lập trình viên C',
            level: 'Trung cấp',
            duration: '25 phút',
            isNew314: false,
            keywords: ['trường tiêu đề', 'type designator', 'reference counter', 'con trỏ C', 'dereferenced', 'void*']
          },
          {
            id: 'lp-c6-03',
            number: 'C6.3',
            title: 'Kiểu Dữ liệu Gắn liền với Đối tượng, Không phải Tên biến',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['kiểu đối tượng', 'tên biến generic', 'đổi tham chiếu', 'int str float', 'độ linh hoạt']
          },
          {
            id: 'lp-c6-04',
            number: 'C6.4',
            title: 'Đối tượng được Thu gom Rác Tự động: Vòng đời & Bộ đếm Tham chiếu',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['thu gom rác', 'garbage collection', 'vòng đời đối tượng', 'bộ đếm tham chiếu', 'free memory pool']
          },
          {
            id: 'lp-c6-05',
            number: 'C6.5',
            title: 'Chuyên đề Thu gom Rác: Tham chiếu Vòng (Cyclic References) & Module gc',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['tham chiếu vòng', 'circular references', 'L.append(L)', 'module gc', 'CPython vs PyPy']
          },
          {
            id: 'lp-c6-06',
            number: 'C6.6',
            title: 'Tham chiếu Chia sẻ (Shared References) với Đối tượng Bất biến',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['tham chiếu chia sẻ', 'shared reference', 'Hình 6-2', 'Hình 6-3', 'đối tượng bất biến', 'side effect']
          },
          {
            id: 'lp-c6-07',
            number: 'C6.7',
            title: 'Tham chiếu Chia sẻ & Các Thay đổi Tại chỗ (In-Place Changes) trên Kiểu Khả biến',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['thay đổi tại chỗ', 'in-place change', 'mutable', 'list dict set', 'tác động lan truyền', 'bẫy chia sẻ']
          },
          {
            id: 'lp-c6-08',
            number: 'C6.8',
            title: 'Kỹ thuật Sao chép Đối tượng: Slicing, copy() và Module copy (Shallow vs Deep)',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['sao chép', 'slicing L[:]', 'copy()', 'module copy', 'shallow copy', 'deep copy']
          },
          {
            id: 'lp-c6-09',
            number: 'C6.9',
            title: 'So sánh Bằng (==) vs So sánh Định danh (is) & Cơ chế Cache Số nguyên Nhỏ',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['so sánh ==', 'toán tử is', 'so sánh giá trị', 'định danh đối tượng', 'cache số nguyên', '99 is 99']
          },
          {
            id: 'lp-c6-10',
            number: 'C6.10',
            title: 'Kiểm tra Định danh bên dưới: id(), sys.getrefcount() & Khái niệm Đối tượng Bất tử',
            level: 'Trung cấp',
            duration: '25 phút',
            isNew314: false,
            keywords: ['id()', 'sys.getrefcount()', 'đối tượng bất tử', 'immortal objects', 'Python 3.12', 'Python 3.14']
          },
          {
            id: 'lp-c6-11',
            number: 'C6.11',
            title: 'Định kiểu Động ở Khắp Mọi nơi & Cội nguồn của Tính Đa hình (Polymorphism)',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['định kiểu động khắp nơi', 'mô hình phép gán', 'tham số hàm', 'for loop', 'import', 'đa hình']
          },
          {
            id: 'lp-c6-12',
            number: 'C6.12',
            title: 'Gợi ý Kiểu (Type Hinting): Cú pháp, __annotations__ & Bị phớt lờ khi Thực thi',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['type hinting', 'gợi ý kiểu', 'typing module', 'type alias', '__annotations__', 'mypy', 'runtime testing']
          },
          {
            id: 'lp-c6-13',
            number: 'C6.13',
            title: 'Nghịch lý Gợi ý Kiểu & Quan điểm của Mark Lutz về Bản sắc Ngôn ngữ Động',
            level: 'Trung cấp',
            duration: '25 phút',
            isNew314: false,
            keywords: ['nghịch lý type hinting', 'quan điểm Mark Lutz', 'bản sắc động', 'lời khuyên sư phạm']
          },
          {
            id: 'lp-c6-14',
            number: 'C6.14',
            title: 'Khung chuyên đề Nâng cao: Tham chiếu Yếu (Weak References) & Module weakref',
            level: 'Nâng cao',
            duration: '30 phút',
            isNew314: false,
            keywords: ['tham chiếu yếu', 'weak reference', 'weakref', 'bộ nhớ đệm cache', 'callback', 'OOP']
          },
          {
            id: 'lp-c6-15',
            number: 'C6.15',
            title: 'Tóm tắt Chương 6 & Bộ 3 Câu hỏi Ôn tập kèm Lời giải Chi tiết',
            level: 'Trung bình',
            duration: '35 phút',
            isNew314: false,
            keywords: ['tóm tắt Chương 6', '3 câu hỏi ôn tập', 'chuỗi bất biến', 'list in-place', 'slice copy', 'đáp án chi tiết']
          }
        ]
      },
      {
        id: 'part-lp-c7',
        number: 'Chương 7',
        chapterNumber: 'Chương 7',
        chapterTitle: 'Các nền tảng cơ bản về chuỗi',
        title: 'Các nền tảng cơ bản về chuỗi',
        fullTitle: 'Chương 7: Các nền tảng cơ bản về chuỗi',
        level: 'Cơ bản đến Nâng cao',
        description: 'Khám phá chuyên sâu kiểu đối tượng chuỗi (str) trong Python: hằng chuỗi, ký tự thoát, chuỗi thô, chuỗi khối nháy ba, chỉ mục & slice mở rộng, công cụ chuyển đổi chuỗi và mã ký tự (ord/chr), tính bất biến, 43 phương thức chuỗi, ba công cụ định dạng (biểu thức %, phương thức format, f-string Python 3.12+), string.Template và phân loại kiểu dữ liệu tổng quát.',
        lessons: [
          {
            id: 'lp-c7-00',
            number: 'C7.0',
            title: 'Mở đầu: Các nền tảng cơ bản về chuỗi & Bảng 7-1',
            level: 'Cơ bản',
            duration: '20 phút',
            isNew314: false,
            keywords: ['chuỗi str', 'dãy tuần tự', 'sequence', 'bất biến', 'Bảng 7-1', 'nền tảng chuỗi', 'Mark Lutz']
          },
          {
            id: 'lp-c7-01',
            number: 'C7.1',
            title: 'Hằng chuỗi: Dấu nháy đơn, Nháy kép & Tự động nối chuỗi',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['hằng chuỗi', 'string literal', 'nháy đơn', 'nháy kép', 'tự nối chuỗi ngầm định', 'bẫy dấu phẩy tuple']
          },
          {
            id: 'lp-c7-02',
            number: 'C7.2',
            title: 'Ký tự thoát (Escape Sequences), Bảng 7-2 & Cảnh báo Python 3.12+',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['escape sequence', 'ký tự thoát', 'Bảng 7-2', 'code point', 'ký tự NULL', 'SyntaxWarning', 'Python 3.12']
          },
          {
            id: 'lp-c7-03',
            number: 'C7.3',
            title: 'Chuỗi thô (Raw Strings): Tắt ký tự thoát & Điểm kỳ quặc',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['raw string', 'chuỗi thô', 'tiền tố r', 'đường dẫn Windows', 'lỗi dấu gạch chéo ngược cuối chuỗi']
          },
          {
            id: 'lp-c7-04',
            number: 'C7.4',
            title: 'Chuỗi khối nháy ba: Dữ liệu nhiều dòng, Docstring & Bẫy chú thích',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['nháy ba', 'chuỗi khối', 'block string', 'docstring', 'bẫy chú thích trong nháy ba', 'tắt khối mã']
          },
          {
            id: 'lp-c7-05',
            number: 'C7.5',
            title: 'Thao tác chuỗi cơ bản: Phép nối (+), Phép lặp (*), for & Toán tử in',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['phép nối chuỗi', 'phép lặp chuỗi', 'len', 'vòng lặp for', 'toán tử in', 'tính đa hình', 'định kiểu mạnh']
          },
          {
            id: 'lp-c7-06',
            number: 'C7.6',
            title: 'Đánh chỉ mục (Indexing), Cắt lát (Slicing) & Sơ đồ Hình 7-1',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['indexing', 'chỉ mục', 'slicing', 'cắt lát', 'chỉ mục âm', 'Hình 7-1', 'top-level copy', 'IndexError vs co giãn']
          },
          {
            id: 'lp-c7-07',
            number: 'C7.7',
            title: 'Slice mở rộng (Stride), Đảo ngược chuỗi & Đối tượng slice',
            level: 'Trung cấp',
            duration: '25 phút',
            isNew314: false,
            keywords: ['slice mở rộng', 'stride', 'bước nhảy', 'đảo ngược chuỗi ::-1', 'đối tượng slice', 'sys.argv', 'rstrip']
          },
          {
            id: 'lp-c7-08',
            number: 'C7.8',
            title: 'Chuyển đổi kiểu chuỗi: Số học (int/float/str/eval) & Mã ký tự (ord/chr)',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['chuyển đổi kiểu', 'int', 'float', 'str', 'eval', 'ord', 'chr', 'số học ký tự', 'từ chối phỏng đoán']
          },
          {
            id: 'lp-c7-09',
            number: 'C7.9',
            title: 'So sánh chuỗi & "Thay đổi" chuỗi Phần 1: Thao tác trên dãy tuần tự',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['so sánh chuỗi', 'lexicographical', 'tính bất biến', 'immutable', 'thu gom rác GC', 'bytearray']
          },
          {
            id: 'lp-c7-10',
            number: 'C7.10',
            title: 'Phương thức chuỗi: Cú pháp gọi (object.method) & Bảng 7-3',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['phương thức chuỗi', 'string methods', 'Bảng 7-3', '43 phương thức', 'truy xuất thuộc tính', 'lời gọi hàm']
          },
          {
            id: 'lp-c7-11',
            number: 'C7.11',
            title: '"Thay đổi" chuỗi Phần 2: Phương thức replace() & Tối ưu với list/join',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['replace', 'find', 'rfind', 'chuỗi bất biến', 'tối ưu hóa', 'list explode', 'join implode']
          },
          {
            id: 'lp-c7-12',
            number: 'C7.12',
            title: 'Phân tách văn bản: Slicing trích cột vs split() & Phương thức thông dụng',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['text parsing', 'phân tách văn bản', 'split', 'dấu phân tách', 'rstrip', 'upper', 'isalpha', 'endswith', 'startswith']
          },
          {
            id: 'lp-c7-13',
            number: 'C7.13',
            title: 'Định dạng chuỗi: Tổng quan "Ba môn phối hợp" & Triết lý Phình to tính năng',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['định dạng chuỗi', 'string formatting', 'ba môn phối hợp', 'biểu thức %', 'format method', 'f-string', 'feature bloat']
          },
          {
            id: 'lp-c7-14',
            number: 'C7.14',
            title: 'Biểu thức định dạng chuỗi (%): Cú pháp, Bảng 7-4 mã kiểu & Ví dụ nâng cao',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['biểu thức định dạng', '% formatting', 'Bảng 7-4', 'printf', 'flags', 'width', 'precision', '%s vạn năng']
          },
          {
            id: 'lp-c7-15',
            number: 'C7.15',
            title: 'Biểu thức định dạng dựa trên Từ điển (dict) & Hàm vars()',
            level: 'Trung cấp',
            duration: '25 phút',
            isNew314: false,
            keywords: ['định dạng từ điển', '%(key)s', 'template HTML XML', 'vars()', 'tái sử dụng giá trị']
          },
          {
            id: 'lp-c7-16',
            number: 'C7.16',
            title: 'Phương thức định dạng chuỗi (.format): Cú pháp, Thuộc tính & Ràng buộc chỉ mục',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['str.format', 'phương thức format', 'vị trí tương đối {}', 'vị trí tuyệt đối {0}', 'từ khóa {name}', 'thuộc tính {0.name}', 'ràng buộc chỉ mục']
          },
          {
            id: 'lp-c7-17',
            number: 'C7.17',
            title: 'Định dạng tùy chỉnh của Phương thức: Ngữ pháp formatspec, Dấu phân cách & Lồng nhau',
            level: 'Nâng cao',
            duration: '30 phút',
            isNew314: false,
            keywords: ['formatspec', 'fill align', 'dấu phân cách nghìn', 'tham số lồng nhau {}', 'hàm format()', '__format__']
          },
          {
            id: 'lp-c7-18',
            number: 'C7.18',
            title: 'Hằng chuỗi định dạng F-String: Cú pháp nền tảng & Điểm mới Python 3.12+',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['f-string', 'nội suy chuỗi', 'string interpolation', 'biểu thức nội tuyến', 'Python 3.12', 'PEP 701', 'dấu nháy lồng nhau']
          },
          {
            id: 'lp-c7-19',
            number: 'C7.19',
            title: 'Định dạng tùy chỉnh của F-String: Cờ gỡ lỗi (=), Chuyển đổi (!s/!r/!a) & Lồng động',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['f-string nâng cao', 'cờ gỡ lỗi =', '!s !r !a', 'formatspec lồng động', 'bản mẫu dictionary', 'hạn chế eval']
          },
          {
            id: 'lp-c7-20',
            number: 'C7.20',
            title: 'So sánh toàn diện công cụ định dạng, Bản quyền lựa chọn & string.Template',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['so sánh định dạng', 'string.Template', 'triết lý Mark Lutz', 'tự do lập trình viên', 'phình to tính năng']
          },
          {
            id: 'lp-c7-21',
            number: 'C7.21',
            title: 'Phân loại kiểu dữ liệu tổng quát (Số, Dãy, Ánh xạ) & Ràng buộc Khả biến / Bất biến',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['phân loại kiểu dữ liệu', 'số numbers', 'dãy tuần tự sequence', 'ánh xạ mapping', 'khả biến mutable', 'bất biến immutable']
          },
          {
            id: 'lp-c7-22',
            number: 'C7.22',
            title: 'Tóm tắt Chương 7 & Bộ 7 Câu hỏi Ôn tập kèm Lời giải Chi tiết từ Mark Lutz',
            level: 'Trung bình',
            duration: '35 phút',
            isNew314: false,
            keywords: ['tóm tắt Chương 7', '7 câu hỏi ôn tập', 'đáp án gợi ý', 'kiểm tra kiến thức', 'Mark Lutz']
          }
        ]
      },
      {
        id: 'part-lp-c8',
        number: 'Chương 8',
        chapterNumber: 'Chương 8',
        chapterTitle: 'List và Dictionary',
        title: 'List và Dictionary',
        fullTitle: 'Chương 8: List và Dictionary',
        level: 'Cơ bản đến Nâng cao',
        description: 'Khám phá toàn diện hai kiểu đối tượng tập hợp linh hoạt và mạnh mẽ nhất Python: List (dãy tuần tự khả biến, mảng tham chiếu CPython, slice assignment, sort, list comprehension, unpack *) và Dictionary (ánh xạ khả biến, bảng băm, thứ tự chèn 3.7+, dict comprehension, toán tử hợp | 3.9+, dictionary view set-like).',
        lessons: [
          {
            id: 'lp-c8-00',
            number: 'C8.0',
            title: 'Mở đầu: Khám phá List & Dictionary & Bảng 8-1, 8-2',
            level: 'Cơ bản',
            duration: '20 phút',
            isNew314: false,
            keywords: ['List', 'Dictionary', 'Bảng 8-1', 'Bảng 8-2', 'tập hợp khả biến', 'Mark Lutz', 'bản dịch tiếng Việt']
          },
          {
            id: 'lp-c8-01',
            number: 'C8.1',
            title: 'Căn bản về List: Đặc tính cốt lõi, Dãy tuần tự khả biến & Mảng tham chiếu trong CPython',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['list', 'đặc tính list', 'dãy tuần tự khả biến', 'mutable sequence', 'mảng tham chiếu', 'CPython', 'con trỏ C']
          },
          {
            id: 'lp-c8-02',
            number: 'C8.2',
            title: 'Thao tác cơ bản với List: Ghép nối (+), Lặp lại (*), Độ dài len() & So sánh List',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['ghép nối list', 'lặp lại list', 'len()', 'so sánh list', 'TypeError ghép nối', 'so sánh đa tầng']
          },
          {
            id: 'lp-c8-03',
            number: 'C8.3',
            title: 'Đánh chỉ mục (Indexing), Cắt lát (Slicing) & Ma trận đa chiều (Matrix) với List',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['indexing', 'slicing', 'chỉ mục âm', 'ma trận', 'matrix', 'sublist lồng nhau', 'mảng 2D']
          },
          {
            id: 'lp-c8-04',
            number: 'C8.4',
            title: 'Thay đổi List tại chỗ: Gán chỉ mục & Cơ chế Phép gán lát cắt (Trích xuất, Xóa và Chèn)',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['thay đổi tại chỗ', 'in-place', 'gán chỉ mục', 'gán lát cắt', 'slice assignment', 'trích xuất xóa chèn']
          },
          {
            id: 'lp-c8-05',
            number: 'C8.5',
            title: 'Các phương thức tăng kích thước List: append(), extend(), insert() & Toán tử +=',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['append', 'extend', 'insert', 'toán tử +=', 'in-place method', 'tăng kích thước']
          },
          {
            id: 'lp-c8-06',
            number: 'C8.6',
            title: 'Sắp xếp List: Phương thức sort(), Bẫy kiểu hỗn hợp & Hàm dựng sẵn sorted()',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['sort', 'sorted', 'reverse=True', 'key=str.lower', 'bẫy None', 'mixed types', 'TypeError so sánh']
          },
          {
            id: 'lp-c8-07',
            number: 'C8.7',
            title: 'Đảo ngược List (reverse vs reversed) & Cài đặt Ngăn xếp (Stack LIFO) với List',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['reverse', 'reversed', 'ngăn xếp', 'stack', 'LIFO', 'push', 'pop']
          },
          {
            id: 'lp-c8-08',
            number: 'C8.8',
            title: 'Các phương thức tìm kiếm và thu hẹp: remove(), pop(), count(), index()',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['remove', 'pop', 'count', 'index', 'thu hẹp list', 'tìm kiếm phần tử']
          },
          {
            id: 'lp-c8-09',
            number: 'C8.9',
            title: 'Duyệt lặp List: Toán tử in, Vòng lặp for & Hàm dựng sẵn range()',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['toán tử in', 'vòng lặp for', 'range()', 'phép lặp', 'iterable', 'duyệt list']
          },
          {
            id: 'lp-c8-10',
            number: 'C8.10',
            title: 'List Comprehension và Hàm map: Cú pháp cơ bản, Bộ lọc if & Vòng lặp lồng',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['list comprehension', 'map', 'bộ lọc if', 'vòng lặp lồng', 'comprehension vs loop']
          },
          {
            id: 'lp-c8-11',
            number: 'C8.11',
            title: 'Unpacking hằng số bằng chữ của List (* Unpacking), Câu lệnh del & Bản sao nông copy()',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['unpacking list', 'toán tử *', 'làm phẳng flatten', 'câu lệnh del', 'L.copy()', 'shallow copy']
          },
          {
            id: 'lp-c8-12',
            number: 'C8.12',
            title: 'Căn bản về Dictionary: Phân loại Ánh xạ khả biến, Cấu trúc Bảng băm & Thứ tự chèn',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['dictionary', 'dict', 'ánh xạ khả biến', 'mutable mapping', 'bảng băm', 'hash table', 'insertion order']
          },
          {
            id: 'lp-c8-13',
            number: 'C8.13',
            title: 'Thao tác cơ bản với Dictionary: Đánh chỉ mục theo khóa, len(), Toán tử in & View keys()',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['D[key]', 'len(D)', 'toán tử in trên dict', 'keys()', 'tra cứu khóa O(1)']
          },
          {
            id: 'lp-c8-14',
            number: 'C8.14',
            title: 'Thay đổi Dictionary tại chỗ: Gán khóa mới vs sửa khóa cũ, del & Lồng nhau đa tầng',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['thay đổi dict tại chỗ', 'gán khóa mới tự mở rộng', 'del D[key]', 'dict lồng nhau', 'in-place mutation']
          },
          {
            id: 'lp-c8-15',
            number: 'C8.15',
            title: 'Các phương thức cốt lõi của Dictionary: values(), items(), get(), update() & pop()',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['values', 'items', 'get', 'update', 'pop', 'tránh lỗi KeyError', 'phương thức dict']
          },
          {
            id: 'lp-c8-16',
            number: 'C8.16',
            title: 'Các kỹ thuật tạo Dictionary: 4 Cách kinh điển, dict(zip()), dict.fromkeys() & ** Unpacking',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['4 cách tạo dict', 'dict()', 'zip', 'fromkeys', 'unpacking **', 'xung đột khóa']
          },
          {
            id: 'lp-c8-17',
            number: 'C8.17',
            title: 'Dictionary Comprehension (Comprehension từ điển): Cú pháp, Zip & Ánh xạ biểu thức',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['dict comprehension', 'comprehension từ điển', 'zip dict', 'biểu thức khóa giá trị']
          },
          {
            id: 'lp-c8-18',
            number: 'C8.18',
            title: 'Thứ tự chèn khóa, Ngăn xếp LIFO với popitem(), Toán tử Hợp (| và |=) & Triết lý ngôn ngữ Mark Lutz',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['thứ tự chèn', 'popitem', 'toán tử hợp |', 'toán tử |=', 'Python 3.9', 'triết lý Mark Lutz']
          },
          {
            id: 'lp-c8-19',
            number: 'C8.19',
            title: 'Thực hành: Cơ sở dữ liệu sách, Kỹ thuật Ánh xạ ngược (Giá trị sang Khóa) & Đảo ngược Dict',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['cơ sở dữ liệu sách', 'ánh xạ ngược', 'giá trị sang khóa', 'đảo ngược dict', 'mapattrs.py']
          },
          {
            id: 'lp-c8-20',
            number: 'C8.20',
            title: 'Mẹo sử dụng Dictionary: Mô phỏng List (Khóa số nguyên), Ma trận thưa (Khóa Tuple) & Tránh thiếu khóa',
            level: 'Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['khóa số nguyên', 'ma trận thưa', 'sparse matrix', 'khóa tuple', 'tránh KeyError', 'get vs try/except']
          },
          {
            id: 'lp-c8-21',
            number: 'C8.21',
            title: 'Biểu diễn Bản ghi (Record / JSON), Đối tượng View Dictionary, Tính chất Set-like & So sánh Dict',
            level: 'Nâng cao',
            duration: '40 phút',
            isNew314: false,
            keywords: ['bản ghi record', 'JSON', 'view object', 'dict_keys', 'set-like view', 'toán tử & | - ^', 'so sánh dict ==']
          },
          {
            id: 'lp-c8-22',
            number: 'C8.22',
            title: 'Khung chuyên đề: List vs Dict vs Set, Tóm tắt Chương 8 & Bộ 5 Câu hỏi Ôn tập kèm Lời giải Chi tiết',
            level: 'Trung bình',
            duration: '45 phút',
            isNew314: false,
            keywords: ['List vs Dict vs Set', 'tóm tắt Chương 8', '5 câu hỏi ôn tập', 'đáp án chi tiết', 'Mark Lutz']
          }
        ]
      },
      {
        id: 'part-lp-c9',
        number: 'Chương 9',
        chapterNumber: 'Chương 9',
        chapterTitle: 'Tuple, File và các đối tượng khác',
        title: 'Tuple, File và các đối tượng khác',
        fullTitle: 'Chương 9: Tuple, File và các đối tượng khác',
        level: 'Cơ bản đến Nâng cao',
        description: 'Hoàn thiện chuyến hành trình chuyên sâu tìm hiểu các kiểu đối tượng cốt lõi trong Python: Tuple (bộ giá trị bất biến, unpacking, namedtuple), File (open, chế độ xử lý, bộ lặp file, file văn bản vs nhị phân, pickle, json, struct, csv, context manager with), Đánh giá và phân cấp kiểu dữ liệu, Tham chiếu so với bản sao (copy/deepcopy), So sánh đệ quy, Truthiness (None, bool), 4 Cạm bẫy đối tượng kinh điển kèm toàn bộ 11 bài tập thực hành tổng kết Phần II.',
        lessons: [
          {
            id: 'lp-c9-00',
            number: 'C9.0',
            title: 'Mở đầu: Khám phá Tuple & File, 5 Đặc tính cốt lõi & Bảng 9-1, 9-2',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['tuple', 'file', 'Bảng 9-1', 'Bảng 9-2', 'đặc tính cốt lõi', 'immutable sequence', 'Mark Lutz']
          },
          {
            id: 'lp-c9-01',
            number: 'C9.1',
            title: 'Cú pháp Tuple trong thực tế: Dấu phẩy tạo tuple, Bỏ ngoặc đơn & Phép gán dãy',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['cú pháp tuple', 'dấu phẩy tạo tuple', 'bỏ ngoặc đơn', 'phép gán dãy', 'unpacking *', 'bẫy lambda']
          },
          {
            id: 'lp-c9-02',
            number: 'C9.2',
            title: 'Thao tác Tuple: Chuyển đổi list, sorted, Comprehension giả lập & Tính bất biến một cấp',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['chuyển đổi tuple list', 'sorted', 'comprehension tuple', 'generator', 'index', 'count', 'bất biến một cấp']
          },
          {
            id: 'lp-c9-03',
            number: 'C9.3',
            title: 'Tại sao có cả List và Tuple? & Bản ghi mở rộng Named Tuple (namedtuple)',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['tại sao có tuple', 'toàn vẹn dữ liệu', 'khóa dictionary', 'bản ghi tuple', 'collections.namedtuple', '_asdict']
          },
          {
            id: 'lp-c9-04',
            number: 'C9.4',
            title: 'Căn bản về Đối tượng File: Hàm open(), Đường dẫn Windows/Unix & Chế độ xử lý',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['file', 'open', 'đường dẫn Windows', 'raw string', 'CWD', 'chế độ xử lý', 'mode r w a b +']
          },
          {
            id: 'lp-c9-05',
            number: 'C9.5',
            title: 'Sử dụng File trong thực tế: Đọc ghi readline, EOF, Bộ lặp file & Tự động đóng close()',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['write', 'readline', 'read', 'EOF', 'bộ lặp file', 'close', 'garbage collection', 'flush']
          },
          {
            id: 'lp-c9-06',
            number: 'C9.6',
            title: 'File văn bản vs File nhị phân (bytes) & Lưu trữ đối tượng kèm chuyển đổi (eval)',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['file văn bản', 'file nhị phân', 'bytes', 'b prefix', 'encoding', 'lưu đối tượng', 'parse file', 'eval']
          },
          {
            id: 'lp-c9-07',
            number: 'C9.7',
            title: 'Tuần tự hóa đối tượng nâng cao: Module pickle & Định dạng di động JSON',
            level: 'Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['pickle', 'pickle.dump', 'pickle.load', 'shelve', 'JSON', 'json.dumps', 'json.loads', 'json.dump', 'json.load']
          },
          {
            id: 'lp-c9-08',
            number: 'C9.8',
            title: 'Lưu trữ dữ liệu có định dạng (struct, csv) & Trình quản lý ngữ cảnh File (with)',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['struct', 'pack unpack', 'csv', 'csv.reader', 'context manager', 'with open', 'try finally', 'sys.stdout']
          },
          {
            id: 'lp-c9-09',
            number: 'C9.9',
            title: 'Đánh giá và Tóm tắt các kiểu cốt lõi: Bảng 9-3, Phân loại Thể loại & Nạp chồng toán tử',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['Bảng 9-3', 'phân loại đối tượng', 'thể loại', 'tính khả biến', 'nạp chồng toán tử', 'operator overloading', '__getitem__']
          },
          {
            id: 'lp-c9-10',
            number: 'C9.10',
            title: 'Tính linh hoạt của đối tượng: Cây lồng nhau & Phép gán Tham chiếu vs Bản sao (copy/deepcopy)',
            level: 'Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['cây đối tượng lồng nhau', 'Hình 9-1', 'Hình 9-2', 'tham chiếu được chia sẻ', 'bản sao nông copy', 'bản sao sâu deepcopy']
          },
          {
            id: 'lp-c9-11',
            number: 'C9.11',
            title: 'So sánh đối tượng: Đệ quy, == vs is, Caching chuỗi ngắn & Bảng chân lý Truthiness (None, bool)',
            level: 'Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['so sánh đệ quy', '== vs is', 'định danh đối tượng', 'caching chuỗi ngắn', 'so sánh dictionary', 'Bảng 9-4', 'truthiness', 'None', 'bool']
          },
          {
            id: 'lp-c9-12',
            number: 'C9.12',
            title: 'Phân cấp kiểu của Python: Đối tượng hạng nhất, Kiểu type, Kiểu mở rộng & Khung Range',
            level: 'Nâng cao',
            duration: '35 phút',
            isNew314: false,
            keywords: ['Hình 9-3', 'phân cấp kiểu', 'đối tượng hạng nhất', 'type', 'duck typing', 'isinstance', 'kiểu mở rộng', 'range']
          },
          {
            id: 'lp-c9-13',
            number: 'C9.13',
            title: 'Bốn cạm bẫy kinh điển của kiểu dựng sẵn: Tham chiếu chia sẻ, Nhân bản lồng, Cấu trúc vòng & Bất biến',
            level: 'Nâng cao',
            duration: '35 phút',
            isNew314: false,
            keywords: ['cạm bẫy kiểu dựng sẵn', 'tham chiếu chia sẻ', 'nhân bản lồng [L]*4', 'cấu trúc vòng', 'cyclic object [...]', 'đối tượng bất biến']
          },
          {
            id: 'lp-c9-14',
            number: 'C9.14',
            title: 'Tóm tắt Chương 9 & Bộ 6 Câu hỏi Trắc nghiệm Ôn tập kèm Lời giải Chi tiết',
            level: 'Trung bình',
            duration: '40 phút',
            isNew314: false,
            keywords: ['tóm tắt Chương 9', 'câu hỏi ôn tập', 'trắc nghiệm', 'đáp án chi tiết', 'Mark Lutz', 'chuyển tiếp Phần III']
          },
          {
            id: 'lp-c9-15',
            number: 'C9.15',
            title: 'Kiểm tra kiến thức Phần II (Bài 1): Thử nghiệm tương tác 9 nhóm thao tác kiểu dữ liệu cơ bản',
            level: 'Cơ bản đến Nâng cao',
            duration: '45 phút',
            isNew314: false,
            keywords: ['bài tập Phần II', 'bài 1', 'thao tác cơ bản', 'lũy thừa', 'chuỗi', 'tuple', 'list', 'dictionary', 'falsy']
          },
          {
            id: 'lp-c9-16',
            number: 'C9.16',
            title: 'Kiểm tra kiến thức Phần II (Bài 2, 3, 4): Trường hợp biên của Đánh chỉ mục, Cắt lát, del & Gán Tuple',
            level: 'Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['bài tập Phần II', 'bài 2', 'bài 3', 'bài 4', 'trường hợp biên', 'IndexError', 'slicing biên', 'del', 'hoán đổi tuple']
          },
          {
            id: 'lp-c9-17',
            number: 'C9.17',
            title: 'Kiểm tra kiến thức Phần II (Bài 5, 6, 7): Khóa Dict, Lỗi truy cập ngoài biên & Thao tác chung',
            level: 'Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['bài tập Phần II', 'bài 5', 'bài 6', 'bài 7', 'khóa dict', 'KeyError', 'thao tác chung', 'kiểu hỗn hợp TypeError']
          },
          {
            id: 'lp-c9-18',
            number: 'C9.18',
            title: 'Kiểm tra kiến thức Phần II (Bài 8, 9): Đánh chỉ mục chuỗi đệ quy & Kỹ thuật chuyển đổi kiểu bất biến',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['bài tập Phần II', 'bài 8', 'bài 9', 'đánh chỉ mục chuỗi đệ quy', 'S[0][0][0]', 'thay đổi chuỗi bất biến', 'cắt lát ghép nối']
          },
          {
            id: 'lp-c9-19',
            number: 'C9.19',
            title: 'Kiểm tra kiến thức Phần II (Bài 10, 11): Bản ghi thông tin cá nhân lồng nhau & Đọc Ghi File thực chiến',
            level: 'Trung cấp đến Nâng cao',
            duration: '45 phút',
            isNew314: false,
            keywords: ['bài tập Phần II', 'bài 10', 'bài 11', 'bản ghi cá nhân', 'cấu trúc lồng nhau', 'đọc ghi file', 'myfile.txt', 'CWD']
          }
        ]
      }
    ]
  },
  {
    id: 'course-learning-python-part3',
    number: 'Học phần IV',
    code: 'LP3',
    title: 'Learning Python (Mark Lutz) — Part 3',
    shortTitle: 'Learning Python — Part 3',
    badge: 'Mark Lutz — 6th Edition',
    icon: '📜',
    accentColor: '#ec4899',
    tagline: 'Câu lệnh và Cú pháp (Statements and Syntax) — Điều khiển Luồng và Cấu trúc Mã nguồn',
    description: 'Khám phá toàn diện Phần III trong giáo trình kinh điển của Mark Lutz: từ mô hình cú pháp dựa trên thụt lề độc đáo, các câu lệnh điều khiển luồng (if, while, for) đến kỹ thuật xử lý ngoại lệ và bài tập thực chiến.',
    totalParts: 2,
    totalLessons: 20,
    totalMethods: 0,
    widgetsCount: 0,
    parts: [
      {
        id: 'part-lp-c10',
        number: 'Chương 10',
        chapterNumber: 'Chương 10',
        chapterTitle: 'Giới thiệu các câu lệnh Python',
        title: 'Giới thiệu các câu lệnh Python',
        fullTitle: 'Chương 10: Giới thiệu các câu lệnh Python',
        level: 'Cơ bản đến Trung cấp',
        description: 'Mô hình cú pháp dựa trên thụt lề, khuôn mẫu câu lệnh phức hợp, bảng tổng quan 26 câu lệnh Python, các trường hợp đặc biệt và xây dựng vòng lặp tương tác REPL.',
        lessons: [
          {
            id: 'lp-c10-00',
            number: 'C10.0',
            title: 'Mở đầu Chương 10 & Phân cấp khái niệm trong Python',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['câu lệnh', 'statement', 'thủ tục', 'procedural', 'phân cấp khái niệm', 'module', 'biểu thức', 'đối tượng']
          },
          {
            id: 'lp-c10-01',
            number: 'C10.1',
            title: 'Toàn cảnh Bảng 10-1 — 26 Câu lệnh nền tảng của Python',
            level: 'Cơ bản đến Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['Bảng 10-1', '26 câu lệnh', 'print', 'yield', 'await', 'từ dành riêng', 'soft reserved words', 'match', 'case', 'type']
          },
          {
            id: 'lp-c10-02',
            number: 'C10.2',
            title: 'Câu chuyện về hai câu lệnh if — Dấu hai chấm & Những gì Python loại bỏ',
            level: 'Cơ bản',
            duration: '25 phút',
            isNew314: false,
            keywords: ['câu lệnh if', 'so sánh C vs Python', 'dấu hai chấm bắt buộc', 'header line', 'suite', 'SyntaxError', 'loại bỏ ngoặc đơn', 'hết dòng hết lệnh']
          },
          {
            id: 'lp-c10-03',
            number: 'C10.3',
            title: 'Cú pháp Thụt lề — Triết lý Trực quan & Bài học Dangling Else từ C',
            level: 'Cơ bản đến Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['thụt lề', 'indentation', 'IndentationError', 'dangling else', 'else lơ lửng', 'thấy sao chạy vậy', '4 khoảng trắng', 'cấm trộn tab space']
          },
          {
            id: 'lp-c10-04',
            number: 'C10.4',
            title: 'Các Trường hợp Đặc biệt của Câu lệnh — Dấu chấm phẩy, Dòng nối tiếp & Khối lệnh một dòng',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['dấu chấm phẩy phân tách', 'dòng nối tiếp', 'continuation line', 'cặp ngoặc vạn năng', 'backslash', 'lệnh một dòng', 'coverage']
          },
          {
            id: 'lp-c10-05',
            number: 'C10.5',
            title: 'Vòng lặp Tương tác Cơ bản — Mô hình REPL, while True & Toán tử Walrus :=',
            level: 'Cơ bản đến Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['vòng lặp tương tác', 'REPL', 'interact.py', 'while True', 'input', 'if một dòng', 'break', 'toán tử walrus', ':=', 'PEP 572']
          },
          {
            id: 'lp-c10-06',
            number: 'C10.6',
            title: 'Tính toán Số học & Bắt Lỗi Nhập liệu — str.isdigit() và Cấu trúc if/elif/else',
            level: 'Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['tính toán số học', 'TypeError', 'int', 'ValueError', 'str.isdigit', 'LBYL', 'if elif else', 'dọn dẹp sau vòng lặp', 'print Bye']
          },
          {
            id: 'lp-c10-07',
            number: 'C10.7',
            title: 'Xử lý Ngoại lệ với try/except/else — Tư duy EAFP & Hỗ trợ Số thực float',
            level: 'Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['câu lệnh try', 'except', 'else của try', 'EAFP', 'số thực float', 'không có isfloat', 'số mũ khoa học', 'exception handling']
          },
          {
            id: 'lp-c10-08',
            number: 'C10.8',
            title: 'Lồng Mã Nguồn Sâu Ba Cấp & Đào Sâu eval / exec',
            level: 'Trung cấp đến Nâng cao',
            duration: '35 phút',
            isNew314: false,
            keywords: ['lồng 3 cấp', 'thụt lề tăng tiến', 'eval', 'exec', 'compile', 'code injection', 'bytecode', 'rủi ro bảo mật']
          },
          {
            id: 'lp-c10-09',
            number: 'C10.9',
            title: 'Tóm tắt Chương 10 & Trọn bộ 8 Câu hỏi Ôn tập kèm Lời giải Chi tiết',
            level: 'Trung bình',
            duration: '40 phút',
            isNew314: false,
            keywords: ['tóm tắt Chương 10', '8 câu hỏi ôn tập', 'đáp án chi tiết', 'Mark Lutz', 'chuyển tiếp Chương 11', 'câu lệnh thủ tục']
          }
        ]
      },
      {
        id: 'part-lp-c11',
        number: 'Chương 11',
        chapterNumber: 'Chương 11',
        chapterTitle: 'Phép gán, Biểu thức và Lệnh print',
        title: 'Phép gán, Biểu thức và Lệnh print',
        fullTitle: 'Chương 11: Phép gán, Biểu thức và Lệnh print',
        level: 'Cơ bản đến Nâng cao',
        description: 'Bản chất phép gán đối tượng, 8 dạng cú pháp gán, giải nén mở rộng với *X, phép gán tăng cường và tối ưu in-place, toán tử walrus :=, quy tắc đặt tên và từ khóa, câu lệnh biểu thức, cùng kỹ thuật in ấn và chuyển hướng luồng I/O.',
        lessons: [
          {
            id: 'lp-c11-00',
            number: 'C11.0',
            title: 'Mở đầu Chương 11 & Bảng 11-1 — Bản chất Phép gán và Kỹ thuật Giải nén (Unpacking)',
            level: 'Cơ bản',
            duration: '30 phút',
            isNew314: false,
            keywords: ['phép gán', 'assignment', 'tham chiếu đối tượng', 'con trỏ', 'Bảng 11-1', 'unpacking', 'hoán đổi biến', 'type hinting']
          },
          {
            id: 'lp-c11-01',
            number: 'C11.1',
            title: 'Khuôn mẫu Gán Dãy tuần tự Nâng cao — Dãy lồng nhau, Mô phỏng Enum và Vòng lặp while',
            level: 'Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['dãy tuần tự lồng nhau', 'ValueError', 'cắt lát', 'slicing', 'enum', 'range', 'vòng lặp while', 'stack', 'pop']
          },
          {
            id: 'lp-c11-02',
            number: 'C11.2',
            title: 'Phép gán Giải nén Mở rộng với Dấu sao (*X) & Chuyên đề Các vì sao muôn màu',
            level: 'Trung cấp đến Nâng cao',
            duration: '40 phút',
            isNew314: false,
            keywords: ['giải nén mở rộng', 'extended unpacking', 'dấu sao *', 'PEP 3132', 'trường hợp biên', 'vòng lặp for', 'các vì sao muôn màu', 'PEP 448']
          },
          {
            id: 'lp-c11-03',
            number: 'C11.3',
            title: 'Phép gán Đa mục tiêu — Cơ chế Hoạt động & Cạm bẫy Tham chiếu Chia sẻ',
            level: 'Cơ bản đến Trung cấp',
            duration: '25 phút',
            isNew314: false,
            keywords: ['phép gán đa mục tiêu', 'multiple-target', 'tham chiếu chia sẻ', 'shared reference', 'mutable', 'immutable', 'cạm bẫy danh sách']
          },
          {
            id: 'lp-c11-04',
            number: 'C11.4',
            title: 'Phép gán Tăng cường (Augmented Assignment) — Bảng 11-2 & Tối ưu hóa Tại chỗ',
            level: 'Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['phép gán tăng cường', 'augmented assignment', 'Bảng 11-2', '+=', 'in-place', 'extend', 'tối ưu hóa bộ nhớ', 'tham chiếu chia sẻ']
          },
          {
            id: 'lp-c11-05',
            number: 'C11.5',
            title: 'Biểu thức Gán có tên (Toán tử Walrus :=) — Cú pháp, Ứng dụng và Thực hành Tối ưu',
            level: 'Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['biểu thức gán có tên', 'named assignment', 'walrus operator', ':=', 'PEP 572', 'vòng lặp while', 'đọc file', 'f-string']
          },
          {
            id: 'lp-c11-06',
            number: 'C11.6',
            title: 'Quy tắc và Quy ước Đặt tên Biến — Bảng 11-3 Từ khóa Dành riêng & Bản chất Động',
            level: 'Cơ bản đến Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['quy tắc đặt tên', 'Bảng 11-3', 'từ khóa dành riêng', 'reserved keywords', 'soft keywords', 'quy ước CPython', 'định kiểu động', 'const']
          },
          {
            id: 'lp-c11-07',
            number: 'C11.7',
            title: 'Câu lệnh Biểu thức — Bảng 11-4 & Cạm bẫy Gán đè Phương thức Thay đổi Tại chỗ',
            level: 'Cơ bản đến Trung cấp',
            duration: '30 phút',
            isNew314: false,
            keywords: ['câu lệnh biểu thức', 'expression statement', 'Bảng 11-4', 'side effect', 'cạm bẫy in-place', 'append trả về None', 'sort trả về None']
          },
          {
            id: 'lp-c11-08',
            number: 'C11.8',
            title: 'Thao tác In ấn Toàn diện — Hàm print(), 4 Tham số Từ khóa & Thực hành Định dạng',
            level: 'Cơ bản đến Trung cấp',
            duration: '35 phút',
            isNew314: false,
            keywords: ['thao tác in ấn', 'hàm print', 'sys.stdout', 'sep', 'end', 'file', 'flush', 'định dạng chuỗi', 'f-string']
          },
          {
            id: 'lp-c11-09',
            number: 'C11.9',
            title: 'Chuyển hướng Luồng in (Stream Redirection), Tóm tắt Chương 11 & Trọn bộ 4 Câu hỏi Ôn tập',
            level: 'Trung cấp đến Nâng cao',
            duration: '45 phút',
            isNew314: false,
            keywords: ['chuyển hướng luồng', 'stream redirection', 'sys.stdout', 'sys.stderr', 'FileFaker', 'đa hình', 'tóm tắt Chương 11', '4 câu hỏi ôn tập']
          }
        ]
      }
    ]
  }
];

/**
 * Danh sách phẳng tất cả các phần thuộc 2 học phần (tương thích ngược)
 */
export const CURRICULUM = COURSES.flatMap((course) =>
  course.parts.map((part) => ({
    ...part,
    courseId: course.id,
    courseNumber: course.number,
    courseTitle: course.title,
    courseShortTitle: course.shortTitle,
    courseIcon: course.icon,
    courseBadge: course.badge,
    courseAccent: course.accentColor
  }))
);

/**
 * Trả về danh sách phẳng tất cả 219 bài học theo thứ tự học tập của 4 học phần
 */
export function getFlatLessons() {
  const flat = [];
  for (const course of COURSES) {
    for (const part of course.parts) {
      for (const lesson of part.lessons) {
        flat.push({
          ...lesson,
          courseId: course.id,
          courseNumber: course.number,
          courseTitle: course.title,
          courseShortTitle: course.shortTitle,
          courseIcon: course.icon,
          courseBadge: course.badge,
          courseAccent: course.accentColor,
          partId: part.id,
          partNumber: part.number,
          partTitle: (part.chapterNumber || part.group) ? `${part.number}: ${part.title}` : `${part.number} – ${part.title}`,
          fullBreadcrumb: course.id === 'course-learning-python-part3'
            ? `Learning Python • Phần III • ${part.chapterNumber || part.number} • ${lesson.title}`
            : course.id === 'course-learning-python'
            ? `Learning Python • Phần II • ${part.chapterNumber || part.number} • ${lesson.title}`
            : `${course.number} • ${part.number} • Bài ${lesson.number}`
        });
      }
    }
  }
  return flat;
}

/**
 * Lấy thông tin Học phần theo ID
 */
export function getCourseById(courseId) {
  return COURSES.find((c) => c.id === courseId) || null;
}

/**
 * Tìm Học phần chứa bài học cụ thể
 */
export function getCourseByLessonId(lessonId) {
  for (const course of COURSES) {
    for (const part of course.parts) {
      if (part.lessons.some((l) => l.id === lessonId)) {
        return course;
      }
    }
  }
  return null;
}

