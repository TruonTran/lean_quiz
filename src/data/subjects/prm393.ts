import type { Subject } from "../../types/Subject";

export const prm393: Subject = {
  id: "prm393",
  code: "PRM393",
  name: "Mobile Programming_Lập trình di động",

  questions: [
    {
      id: 1,
      question: "Which widget pattern protects authenticated routes?",
      options: ["Navigator", "Guard", "Route protection", "Middleware"],
      answer: 1,
      hint: "Mẫu thiết kế/mô hình nào thường dùng từ khóa 'Guard' (hoặc Route Guard) để bảo vệ và ngăn người dùng chưa đăng nhập truy cập route?",
      rationale:
        "Route Guards are structural patterns used to intercept navigation and restrict access to protected screens based on conditions like authentication state.",
    },
    {
      id: 2,
      question: "Why are tests important for refactoring?",
      options: [
        "Reduce UI work",
        "Ensure changes don't break functionality",
        "Improve animations",
        "Change layout",
      ],
      answer: 1,
      hint: "Viết Unit/Integration Test giúp bạn tự tin thay đổi cấu trúc mã nguồn mà không làm tái phát lỗi hay hỏng tính năng cũ.",
      rationale:
        "Tests serve as a safety net during refactoring, ensuring that structural code changes do not alter or break existing application functionality.",
    },
    {
      id: 3,
      question: "What is the role of BuildContext in Flutter?",
      options: [
        "Store application data",
        "Locate widgets in the widget tree",
        "Manage navigation history",
        "Render UI pixels",
      ],
      answer: 1,
      hint: "BuildContext đóng vai trò như một tay cầm (handle) trỏ tới vị trí của widget trong cây widget.",
      rationale:
        "BuildContext represents a handle to the location of a widget within the overall widget tree hierarchy.",
    },
    {
      id: 4,
      question:
        "What role does the Flutter framework play in application development?",
      options: [
        "It manages database servers",
        "It provides UI components and rendering logic",
        "It replaces the operating system",
        "It runs backend business logic",
      ],
      answer: 1,
      hint: "Flutter là một UI toolkit, nhiệm vụ chính của nó liên quan đến thành phần giao diện và logic hiển thị.",
      rationale:
        "Flutter provides rich UI component libraries (Material/Cupertino) and a custom rendering engine to draw interfaces.",
    },
    {
      id: 5,
      question: "How is the Flutter UI constructed internally?",
      options: [
        "Using XML layout files",
        "Using HTML and CSS",
        "Using a hierarchical widget tree",
        "Using native UI components only",
      ],
      answer: 2,
      hint: "Trong Flutter, 'Everything is a Widget' và giao diện được xếp chồng/lồng nhau dưới dạng một cấu trúc cây.",
      rationale:
        "Flutter builds user interfaces by nesting widgets into a declarative, hierarchical widget tree structure.",
    },
    {
      id: 6,
      question: "Which widget enables custom scroll effects in Flutter?",
      options: [
        "ListView",
        "SingleChildScrollView",
        "CustomScrollView",
        "Column",
      ],
      answer: 2,
      hint: "Widget kết hợp với các Slivers để tạo ra các hiệu ứng cuộn phức tạp.",
      rationale:
        "CustomScrollView allows developers to supply `Slivers` directly to create custom scrolling behaviors and effects.",
    },
    {
      id: 7,
      question: "Which practice improves rendering performance?",
      options: [
        "Large widget trees",
        "Splitting widgets",
        "Global state",
        "Frequent rebuilds",
      ],
      answer: 1,
      hint: "Chia nhỏ các widget lớn thành các StatelessWidget/StatefulWidget riêng biệt giúp khoanh vùng các đợt rebuild.",
      rationale:
        "Splitting monolithic widgets into smaller individual widgets isolates rebuild scopes and optimizes rendering efficiency.",
    },
    {
      id: 8,
      question: "What does an integration test verify?",
      options: [
        "Single function",
        "Widget rendering",
        "End-to-end app behavior",
        "Theme consistency",
      ],
      answer: 2,
      hint: "Integration test (End-to-End test) kiểm thử toàn bộ luồng hoạt động của ứng dụng từ đầu đến cuối trên thiết bị hoặc emulator.",
      rationale:
        "Integration tests test the whole application or a large part of it to verify that all integrated parts and services work correctly end-to-end.",
    },
    {
      id: 9,
      question: "Why is separating UI and state logic recommended?",
      options: [
        "Reduce code size",
        "Improve maintainability",
        "Faster execution",
        "Better animations",
      ],
      answer: 1,
      hint: "Tách rời giao diện và xử lý nghiệp vụ giúp mã nguồn rõ ràng, dễ bảo trì, dễ thay đổi và nâng cấp.",
      rationale:
        "Separating UI and state logic decouples the visual elements from business processing, leading to cleaner code and higher maintainability.",
    },
    {
      id: 10,
      question: "When does Flutter rebuild the widget tree?",
      options: [
        "On every frame",
        "When state changes",
        "Only when app restarts",
        "Only during hot restart",
      ],
      answer: 1,
      hint: "Flutter chỉ thực hiện rebuild lại cây widget khi có sự thay đổi về mặt dữ liệu/trạng thái (state).",
      rationale:
        "In Flutter's reactive framework, triggering state updates (e.g. calling `setState` or state change events) signals Flutter to rebuild the necessary parts of the widget tree.",
    },
    {
      id: 11,
      question: "Which concept does BLoC heavily rely on?",
      options: ["Future", "Stream", "Animation", "Theme"],
      answer: 1,
      hint: "BLoC (Business Logic Component) dựa trên lập trình bất đồng bộ luồng dữ liệu liên tục.",
      rationale:
        "BLoC architecture utilizes RxDart and Dart Streams to handle asynchronous input events and state outputs.",
    },
    {
      id: 12,
      question: "Why is version control critical?",
      options: [
        "UI changes",
        "Track and manage code changes",
        "Improve animations",
        "Store data",
      ],
      answer: 1,
      hint: "Hệ thống quản lý phiên bản (như Git) giúp lưu lại lịch sử, theo dõi và quản lý các sự thay đổi của mã nguồn.",
      rationale:
        "Version control systems allow teams to track code revisions, collaborate on features, and revert breaking changes when needed.",
    },
    {
      id: 13,
      question: "Why is immutability important in BLoC states?",
      options: [
        "UI speed",
        "Predictable state changes",
        "Memory usage",
        "Theme control",
      ],
      answer: 1,
      hint: "Trạng thái bất biến (Immutable State) giúp việc so sánh và dự đoán sự thay đổi của ứng dụng trở nên đáng tin cậy hơn.",
      rationale:
        "Immutable states ensure that every state emission is distinct and verifiable, making state changes predictable and easier to debug.",
    },
    {
      id: 14,
      question: "Which Flutter plugin provides SQLite support?",
      options: ["hive", "moor", "sqflite", "shared_preferences"],
      answer: 2,
      hint: "Tên thư viện là sự kết hợp giữa SQLite và Flutter.",
      rationale:
        "`sqflite` is the official and most widely used SQLite plugin for Flutter applications.",
    },
    {
      id: 15,
      question: "What is the main benefit of using Maps in Dart?",
      options: [
        "Storing values without keys",
        "Storing key-value pairs",
        "Rendering UI components",
        "Managing asynchronous tasks",
      ],
      answer: 1,
      hint: "Map trong Dart là cấu trúc dữ liệu dùng để lưu trữ các cặp dữ liệu đi kèm với khóa.",
      rationale:
        "A `Map` object in Dart is a collection of key-value pairs, where each key maps to a specific value.",
    },
    {
      id: 16,
      question: "Which tool helps analyze UI performance in Flutter?",
      options: ["Inspector", "DevTools", "Emulator", "Hot reload"],
      answer: 1,
      hint: "Bộ công cụ đo lường hiệu năng, CPU, bộ nhớ và UI render tổng thể của Flutter.",
      rationale:
        "Flutter DevTools provides comprehensive performance profiling, memory tracking, and UI frame analysis tools.",
    },
    {
      id: 17,
      question: "What does a Dart class primarily represent?",
      options: [
        "A UI widget only",
        "A blueprint for creating objects",
        "A database table",
        "A network request",
      ],
      answer: 1,
      hint: "Trong lập trình hướng đối tượng, Class được hiểu là bản thiết kế (blueprint) để tạo ra cái gì?",
      rationale:
        "In Dart and OOP, a Class serves as a blueprint or template for instantiating objects with properties and methods.",
    },
    {
      id: 18,
      question: "What is the purpose of SliverAppBar?",
      options: [
        "Static app bar",
        "Scrollable flexible app bar",
        "Bottom navigation",
        "Drawer control",
      ],
      answer: 1,
      hint: "SliverAppBar cung cấp thanh ứng dụng có thể cuộn, thu co hoặc mở rộng linh hoạt theo hành động cuộn.",
      rationale:
        "SliverAppBar is designed to integrate with custom scroll views to create expandable, collapsible, and flexible AppBars.",
    },
    {
      id: 19,
      question: "What is Hive mainly used for?",
      options: [
        "Remote database",
        "Lightweight local NoSQL storage",
        "State management",
        "Routing",
      ],
      answer: 1,
      hint: "Hive là một cơ sở dữ liệu Key-Value NoSQL siêu nhanh chạy cục bộ trên thiết bị.",
      rationale:
        "Hive is a lightweight, fast, key-value NoSQL database written pure Dart for local data persistence.",
    },
    {
      id: 20,
      question: "Which HTTP header is commonly used for authorization?",
      options: ["Content-Type", "Accept", "Authorization", "Cache-Control"],
      answer: 2,
      hint: "Header HTTP dùng để gửi kèm Access Token (như Bearer token) dùng cho xác thực.",
      rationale:
        "The `Authorization` HTTP request header contains credentials to authenticate a user agent with a server.",
    },
    {
      id: 21,
      question: "What does TextEditingController manage?",
      options: [
        "Theme",
        "Text input value",
        "Validation rules",
        "Layout constraints",
      ],
      answer: 1,
      hint: "Controller này dùng để lấy, cập nhật hoặc theo dõi giá trị nhập vào của `TextField`.",
      rationale:
        "`TextEditingController` manages the text value being edited in a TextField or TextFormField component.",
    },
    {
      id: 22,
      question: "Why is Dart considered suitable for Flutter development?",
      options: [
        "It is only used for backend systems",
        "It supports both UI and application logic efficiently",
        "It replaces native languages",
        "It does not support asynchronous programming",
      ],
      answer: 1,
      hint: "Dart được thiết kế tối ưu hóa cho Client UI, hỗ trợ cả biên dịch JIT cho phát triển và AOT cho bản phát hành.",
      rationale:
        "Dart is optimized for client-side development, combining fast developer iteration (JIT/Hot Reload) with fast native compilation (AOT) for UI and business logic.",
    },
    {
      id: 23,
      question: "What does the build() method return in a widget?",
      options: [
        "A screen",
        "A widget tree describing the UI",
        "Application state",
        "Rendered pixels",
      ],
      answer: 1,
      hint: "Phương thức `build()` trả về một đối tượng Widget (hoặc cây các widget con) mô tả giao diện.",
      rationale:
        "The `build()` method returns a Widget hierarchy describing the part of the user interface represented by that widget.",
    },
    {
      id: 24,
      question: "What represents the output of a BLoC?",
      options: ["Events", "Widgets", "States", "Controllers"],
      answer: 2,
      hint: "BLoC nhận đầu vào là Events và phát ra (emit) đầu ra là cái gì?",
      rationale:
        "In the BLoC pattern, Events are the inputs and States are the outputs emitted to drive the UI.",
    },
    {
      id: 25,
      question: "What is Cubit in BLoC?",
      options: [
        "UI widget",
        "Simplified BLoC without events",
        "Database layer",
        "Animation helper",
      ],
      answer: 1,
      hint: "Cubit là phiên bản tinh giản của BLoC, nơi các hàm (methods) được gọi trực tiếp thay vì phát ra Events.",
      rationale:
        "Cubit is a subset/simplified version of the BLoC pattern that uses functions instead of events to trigger state changes.",
    },
    {
      id: 26,
      question:
        "Which activity is typically performed after creating a new Flutter project?",
      options: [
        "Deploying to app stores",
        "Running the default app on a device",
        "Configuring authentication",
        "Optimizing database queries",
      ],
      answer: 1,
      hint: "Sau khi khởi tạo dự án bằng `flutter create`, bước kiểm tra môi trường đầu tiên thường là chạy ứng dụng mẫu (Counter app).",
      rationale:
        "After creating a new project, developers usually run the generated starter app on an emulator/device to verify setup.",
    },
    {
      id: 27,
      question: "Which practice improves deployment security?",
      options: [
        "Debug builds",
        "Secure signing keys",
        "Hardcoding secrets",
        "Skipping validation",
      ],
      answer: 1,
      hint: "Bảo vệ các khóa ký ứng dụng (Keystore / Signing credentials) là nguyên tắc an toàn hàng đầu khi triển khai.",
      rationale:
        "Securely managing app signing keys ensures authenticity and prevents unauthorized code modification during app distribution.",
    },
    {
      id: 28,
      question: "Why is Chapter 14 considered optional (Plus)?",
      options: [
        "Deployment is UI logic",
        "Apps can be tested without publishing",
        "It replaces authentication",
        "It handles APIs",
      ],
      answer: 1,
      hint: "Ứng dụng vẫn có thể chạy và kiểm thử bình thường mà chưa nhất thiết phải thực hiện các bước xuất bản lên App Store / Play Store.",
      rationale:
        "Publishing/deployment configurations are extra steps that are not required for functional development and local testing.",
    },
    {
      id: 29,
      question: "What is the primary purpose of ThemeData in Flutter?",
      options: [
        "Manage navigation",
        "Define application-wide visual styles",
        "Handle state changes",
        "Control animations",
      ],
      answer: 1,
      hint: "ThemeData dùng để cấu hình màu sắc, phông chữ và phong cách hiển thị tổng thể của cả ứng dụng.",
      rationale:
        "ThemeData configures the visual styling (colors, typography, component themes) globally across the Flutter application.",
    },
    {
      id: 30,
      question: "Which method is used to update the UI when state changes?",
      options: ["build()", "setState()", "initState()", "dispose()"],
      answer: 1,
      hint: "Phương thức thông báo cho `StatefulWidget` biết dữ liệu đã đổi và cần dựng lại giao diện.",
      rationale:
        "Calling `setState()` notifies the framework that the internal state of an object has changed, causing it to schedule a rebuild.",
    },
    {
      id: 31,
      question:
        "Which Flutter package is commonly used for simple key-value storage?",
      options: ["sqflite", "shared_preferences", "provider", "http"],
      answer: 1,
      hint: "Thư viện chuẩn dùng lưu trữ các cài đặt đơn giản (như theme mode, flag) dạng Key-Value.",
      rationale:
        "`shared_preferences` provides persistent local storage for simple key-value pairs across iOS, Android, and Web.",
    },
    {
      id: 32,
      question: "Why should architecture be decided early?",
      options: [
        "Avoid UI work",
        "Reduce refactoring cost",
        "Improve animations",
        "Change theme",
      ],
      answer: 1,
      hint: "Quyết định kiến trúc phần mềm ngay từ đầu giúp dự án phát triển có định hướng và hạn chế tốn chi phí đập đi viết lại.",
      rationale:
        "Establishing a solid architecture early prevents structural technical debt and reduces the costly need for massive refactoring later.",
    },
    {
      id: 33,
      question: "What is pagination used for?",
      options: [
        "UI animation",
        "Handling large datasets efficiently",
        "Theme management",
        "Authentication",
      ],
      answer: 1,
      hint: "Phân trang (Pagination) giúp tải danh sách dài theo từng trang nhỏ thay vì tải toàn bộ cùng lúc.",
      rationale:
        "Pagination divides large data results into smaller chunks or pages, reducing memory load and network traffic.",
    },
    {
      id: 34,
      question: "Which widget helps avoid rebuilding unchanged UI parts?",
      options: ["Container", "RepaintBoundary", "Column", "FutureBuilder"],
      answer: 1,
      hint: "Widget tạo một lớp vẽ tách biệt (paint layer) để không phải vẽ lại (repaint) vùng màn hình không liên quan.",
      rationale:
        "`RepaintBoundary` creates a separate display list/layer for its subtree, preventing unnecessary repaints when other parts of the screen change.",
    },
    {
      id: 35,
      question:
        "Which widget is used to handle asynchronous API responses in UI?",
      options: ["FutureBuilder", "ListView", "Provider", "Form"],
      answer: 0,
      hint: "Các phản hồi API trả về dạng `Future` đơn lẻ thường kết hợp với widget nào?",
      rationale:
        "`FutureBuilder` listens to a `Future` (like an HTTP API request) and dynamically builds UI depending on its state (loading, error, success).",
    },
    {
      id: 36,
      question:
        "Which Dart feature helps organize code into reusable libraries?",
      options: [
        "Widgets",
        "Packages and imports",
        "Hot reload",
        "Layout constraints",
      ],
      answer: 1,
      hint: "Dart cho phép bạn nhóm các file mã nguồn thành thư viện và liên kết chúng thông qua từ khóa `import`.",
      rationale:
        "Dart packages and `import` directives enable modularizing, reusing, and sharing code libraries.",
    },
    {
      id: 37,
      question: "What is refresh token used for?",
      options: [
        "UI refresh",
        "Extend session without re-login",
        "Theme update",
        "Navigation reset",
      ],
      answer: 1,
      hint: "Refresh token giúp cấp mới Access Token khi hết hạn mà không bắt người dùng phải nhập lại tài khoản/mật khẩu.",
      rationale:
        "A refresh token allows an application to obtain a new access token seamlessly without forcing the user to log in again.",
    },
    {
      id: 38,
      question: "What is rebuild scope optimization in Flutter?",
      options: [
        "Reducing widget tree depth",
        "Limiting rebuild to affected widgets",
        "Caching API responses",
        "Using global state",
      ],
      answer: 1,
      hint: "Tối ưu hóa phạm vi rebuild nghĩa là khu biệt thao tác dựng lại giao diện ở phạm vi hẹp nhất có thể.",
      rationale:
        "Rebuild scope optimization focuses on structuring state and widgets so that only the widgets that actually depend on changed data undergo rebuilds.",
    },
    {
      id: 39,
      question: "Why is BLoC suitable for large teams?",
      options: [
        "Less code",
        "Standardized architecture",
        "Faster builds",
        "UI reuse",
      ],
      answer: 1,
      hint: "BLoC đưa ra một quy chuẩn kiến trúc rõ ràng (Events -> Logic -> States) giúp các thành viên tuân thủ chung một mô hình.",
      rationale:
        "BLoC enforces a strict, standardized architecture that makes codebases predictable, testable, and easier for multi-developer teams to collaborate on.",
    },
    {
      id: 40,
      question: "Which widget reacts to async data from local storage?",
      options: ["FutureBuilder", "StreamBuilder", "ListView", "Provider"],
      answer: 0,
      hint: "Thao tác đọc dữ liệu một lần từ local storage thường trả về dưới dạng `Future`.",
      rationale:
        "`FutureBuilder` connects asynchronous data loading operations (like reading local disk/storage) to the widget rendering process.",
    },
    {
      id: 41,
      question: "What is a token in authentication systems?",
      options: [
        "UI key",
        "Temporary access credential",
        "Database ID",
        "Theme value",
      ],
      answer: 1,
      hint: "Token (như JWT) đóng vai trò như một chứng thư/thẻ truy cập có thời hạn để xác thực các yêu cầu API.",
      rationale:
        "An authentication token is a digital credential issued by a server to verify user identity for subsequent API requests.",
    },
    {
      id: 42,
      question: "What does a Tween define?",
      options: [
        "Animation speed",
        "Value range for animation",
        "UI layout",
        "State logic",
      ],
      answer: 1,
      hint: "Tween định nghĩa khoảng giá trị bắt đầu (begin) và kết thúc (end) của một animation.",
      rationale:
        "In Flutter animations, a `Tween` defines a linear interpolation between a start (begin) and end value.",
    },
    {
      id: 43,
      question:
        "Which Dart feature allows defining reusable, type-safe components?",
      options: ["Mixins", "Generics", "Futures", "Streams"],
      answer: 1,
      hint: "Tính năng cho phép dùng kiểu tham số hóa (như `<T>`) để đảm bảo an toàn kiểu dữ liệu.",
      rationale:
        "Generics (e.g. `List<T>`) allow writing flexible, reusable code while retaining static type safety at compile time.",
    },
    {
      id: 44,
      question: "Which widget animates between two widgets?",
      options: [
        "AnimatedSwitcher",
        "AnimatedOpacity",
        "AnimatedAlign",
        "AnimatedSize",
      ],
      answer: 0,
      hint: "Widget tự động tạo hiệu ứng chuyển cảnh (fade/scale) khi widget con của nó bị thay thế/chuyển đổi.",
      rationale:
        "`AnimatedSwitcher` automatically performs a transition animation when its child widget changes to a new one.",
    },
    {
      id: 45,
      question: "Why should setState() be called sparingly?",
      options: [
        "It increases app size",
        "It may trigger unnecessary rebuilds",
        "It blocks UI thread",
        "It causes memory leaks",
      ],
      answer: 1,
      hint: "Lạm dụng `setState()` ở widget cha cao cấp sẽ làm toàn bộ cây widget con phía dưới bị rebuild lại không cần thiết.",
      rationale:
        "Calling `setState()` forces a rebuild of the widget and its subtree, which can degrade performance if overused or called high in the tree.",
    },
    {
      id: 46,
      question: "What is test isolation?",
      options: [
        "Running all tests together",
        "Independence of test cases",
        "UI separation",
        "Mocking only",
      ],
      answer: 1,
      hint: "Tính cô lập của bài kiểm thử đảm bảo mỗi test case chạy độc lập và không phụ thuộc hay ảnh hưởng đến test case khác.",
      rationale:
        "Test isolation ensures that test cases execute independently of one another without shared mutable state or side effects.",
    },
    {
      id: 47,
      question: "What does crossAxisAlignment control?",
      options: [
        "Vertical alignment in Column",
        "Horizontal alignment in Column",
        "Child order",
        "Widget size",
      ],
      answer: 1,
      hint: "Trong Column, main axis là trục dọc (Vertical), vậy cross axis (trục phụ) là trục nào?",
      rationale:
        "For a `Column`, the main axis is vertical, so `crossAxisAlignment` controls horizontal alignment of its children.",
    },
    {
      id: 48,
      question: "Which tool is commonly used for version control?",
      options: ["SVN", "Git", "FTP", "ZIP"],
      answer: 1,
      hint: "Công cụ quản lý phiên bản mã nguồn phân tán phổ biến nhất hiện nay.",
      rationale:
        "Git is the industry-standard distributed version control system used to track source code changes during software development.",
    },

    {
      id: 1,
      question: "Which Dart feature supports objectoriented programming?",
      options: [
        "Widgets",
        "Classes and objects",
        "Hot reload",
        "Layout builders",
      ],
      answer: 1,
      hint: "Lập trình hướng đối tượng (OOP) dựa trên hai khái niệm cốt lõi nào?",
      rationale:
        "Classes and objects are the fundamental building blocks of Object-Oriented Programming (OOP) in Dart.",
    },
    {
      id: 2,
      question: "Which method retrieves data from SharedPreferences?",
      options: ["get()", "read()", "fetch()", "load()"],
      answer: 0,
      hint: "SharedPreferences sử dụng các phương thức như getString(), getBool(), getInt() hoặc tổng quát là gì?",
      rationale:
        "SharedPreferences uses get() (or specific typed methods like getString, getBool, getInt) to retrieve stored data.",
    },
    {
      id: 3,
      question: "What is Flutter primarily used for?",
      options: [
        "Designing databases for mobile apps",
        "Creating native applications from a single codebase",
        "Developing server-side applications only",
        "Building operating systems for mobile devices",
      ],
      answer: 1,
      hint: "Flutter là UI toolkit giúp biên dịch ra ứng dụng native từ bao nhiêu codebase?",
      rationale:
        "Flutter is Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.",
    },
    {
      id: 4,
      question: "Why should state be kept as local as possible?",
      options: [
        "Better animations",
        "Reduce unnecessary rebuilds",
        "Simplify Ul",
        "Improve navigation",
      ],
      answer: 1,
      hint: "Giữ state ở phạm vi hẹp giúp tránh việc render lại (rebuild) các phần không liên quan.",
      rationale:
        "Keeping state local limits the scope of widget rebuilds to only the necessary components, improving performance.",
    },
    {
      id: 5,
      question: "Which command builds a release APK?",
      options: [
        "flutter run",
        "flutter build apk",
        "flutter doctor",
        "flutter clean",
      ],
      answer: 1,
      hint: "Lệnh Flutter dùng từ khóa `build` kết hợp với định dạng file Android.",
      rationale:
        "`flutter build apk` compiles the Flutter app into a release APK for Android.",
    },
    {
      id: 6,
      question: "What happens after successful login?",
      options: [
        "App closes",
        "User session starts",
        "Theme changes",
        "Navigation resets",
      ],
      answer: 1,
      hint: "Khi người dùng đăng nhập thành công, hệ thống bắt đầu một phiên làm việc mới.",
      rationale:
        "Successful authentication initiates a user session, granting access to protected app resources/screens.",
    },
    {
      id: 7,
      question: "What is implicit animation?",
      options: [
        "Manual animation control",
        "Animation without controller",
        "API animation",
        "Navigation animation",
      ],
      answer: 1,
      hint: "Implicit animation (như AnimatedContainer) giúp tạo chuyển động mà không cần dùng đến AnimationController.",
      rationale:
        "Implicit animations (e.g., AnimatedContainer, AnimatedOpacity) manage their own AnimationController internally, requiring no manual controller management.",
    },
    {
      id: 8,
      question: "Which Flutter concept supports reactive Ul updates?",
      options: [
        "Manual refresh",
        "Widget rebuilding",
        "Hot restart",
        "Native callbacks",
      ],
      answer: 1,
      hint: "Mô hình phản ứng (reactive) của Flutter cập nhật UI bằng cách dựng lại cây widget.",
      rationale:
        "Flutter's reactive model automatically rebuilds the widget tree when the underlying state changes.",
    },
    {
      id: 9,
      question: "Why is clean architecture beneficial?",
      options: [
        "Fewer files",
        "Easier maintenance and testing",
        "Better UI",
        "Faster builds",
      ],
      answer: 1,
      hint: "Kiến trúc sạch chia tách trách nhiệm (separation of concerns) giúp code dễ bảo trì và viết test hơn.",
      rationale:
        "Clean Architecture decouples business logic from UI and data layers, making the codebase easier to maintain, test, and scale.",
    },
    {
      id: 10,
      question: "What is Dart primarily designed for in the Flutter ecosystem?",
      options: [
        "Database management",
        "User interface development",
        "General-purpose programming with UI focus",
        "Network security",
      ],
      answer: 2,
      hint: "Dart là ngôn ngữ đa mục đích nhưng được tối ưu hóa đặc biệt cho giao diện người dùng.",
      rationale:
        "Dart is a client-optimized, general-purpose programming language tailored specifically for fast UI development.",
    },
    {
      id: 11,
      question: "What is the benefit of composing widgets in Flutter?",
      options: [
        "Faster compilation",
        "Better code reuse and UI consistency",
        "Reduced memory usage",
        "Automatic navigation",
      ],
      answer: 1,
      hint: "Việc kết hợp nhiều widget nhỏ (composition) giúp ích gì cho việc tái sử dụng mã nguồn?",
      rationale:
        "Composing small, single-purpose widgets enhances code reusability, modularity, and visual consistency across the app.",
    },
    {
      id: 12,
      question: "Which Flutter test focuses on UI components?",
      options: ["Unit test", "Widget test", "Integration test", "Load test"],
      answer: 1,
      hint: "Loại kiểm thử nào kiểm tra sự tương tác và hiển thị của các thành phần Widget riêng lẻ?",
      rationale:
        "Widget tests (component tests) verify that UI widgets render correctly and respond as expected to user interactions.",
    },
    {
      id: 13,
      question: "Why are const widgets recommended?",
      options: [
        "They improve readability",
        "They reduce rebuild cost",
        "They add state",
        "They handle navigation",
      ],
      answer: 1,
      hint: "Từ khóa `const` giúp Flutter tái sử dụng widget không đổi để tránh tốn chi phí render lại.",
      rationale:
        "`const` widgets are instantiated once at compile-time and reused, preventing unnecessary rebuilds and conserving resources.",
    },
    {
      id: 14,
      question:
        "What happens if a non-nullable variable is not initialized in Dart?",
      options: [
        "The app runs normally",
        "A runtime exception occurs",
        "A compile-time error occurs",
        "The value becomes null automatically",
      ],
      answer: 2,
      hint: "Tính năng Null Safety của Dart sẽ phát hiện lỗi này ở thời điểm biên dịch hay thời điểm chạy?",
      rationale:
        "With Dart Sound Null Safety, declaring a non-nullable variable without an initial value triggers a compile-time error.",
    },
    {
      id: 15,
      question: "What is the main risk of improper state management?",
      options: [
        "UI inconsistency",
        "Longer compile time",
        "Package conflicts",
        "Build errors",
      ],
      answer: 0,
      hint: "Quản lý trạng thái không tốt dẫn đến việc dữ liệu hiển thị trên màn hình không đồng bộ.",
      rationale:
        "Poor state management can cause the UI to become out of sync with the underlying data, resulting in UI inconsistency and bugs.",
    },
    {
      id: 16,
      question: "What is technical debt?",
      options: [
        "UI lag",
        "Future cost of poor design decisions",
        "Memory usage",
        "API limit",
      ],
      answer: 1,
      hint: "Nợ kỹ thuật (Technical Debt) là chi phí phải trả trong tương lai do việc chấp nhận giải pháp tạm thời/kém chất lượng.",
      rationale:
        "Technical debt refers to the implied cost of additional rework caused by choosing an easy/expedient solution now instead of a better approach.",
    },
    {
      id: 17,
      question: "What does golden testing verify?",
      options: [
        "API responses",
        "UI appearance consistency",
        "Database state",
        "Authentication",
      ],
      answer: 1,
      hint: "Golden test so sánh hình ảnh pixel-by-pixel của UI thực tế với một hình ảnh mẫu (golden file).",
      rationale:
        "Golden testing compares a rendered widget's visual pixel output against a reference image file to ensure UI appearance consistency.",
    },
    {
      id: 18,
      question: "Which Flutter tool helps debug network requests?",
      options: ["DevTools", "Inspector", "Emulator", "Hot reload"],
      answer: 0,
      hint: "Bộ công cụ chẩn đoán và debug chính thức của Flutter bao gồm cả tab Network.",
      rationale:
        "Flutter DevTools includes a Network Profiler to inspect incoming/outgoing HTTP/HTTPS requests, responses, and performance.",
    },
    {
      id: 19,
      question:
        "Which platforms can Flutter applications target using a single codebase?",
      options: [
        "Android only",
        "iOS only",
        "Android, iOS, web, and desktop",
        "Web servers only",
      ],
      answer: 2,
      hint: "Flutter hỗ trợ cả mobile, web và desktop từ một codebase đơn nhất.",
      rationale:
        "Flutter provides cross-platform support for Android, iOS, Web, Windows, macOS, and Linux from a single codebase.",
    },
    {
      id: 20,
      question: "Which widget reacts to async data from local storage?",
      options: ["FutureBuilder", "StreamBuilder", "ListView", "Provider"],
      answer: 0,
      hint: "Dữ liệu bất đồng bộ trả về từ local storage thường ở dạng `Future`.",
      rationale:
        "FutureBuilder listens to a `Future` (commonly returned by local storage reads) and builds itself based on the latest snapshot of data.",
    },
    {
      id: 21,
      question: "Why are widgets lightweight in Flutter?",
      options: [
        "They manage system resources",
        "They are immutable descriptions",
        "They store UI state",
        "They handle rendering directly",
      ],
      answer: 1,
      hint: "Widgets trong Flutter chỉ là cấu hình bất biến (immutable), không tốn chi phí vẽ trực tiếp.",
      rationale:
        "Widgets are cheap, immutable configuration objects; heavy rendering and layout work is delegated to the RenderObject tree.",
    },
    {
      id: 22,
      question: "Which approach helps reduce unnecessary widget rebuilds?",
      options: [
        "Using global variables",
        "Fine-grained state updates",
        "Hot restart",
        "Large widgets",
      ],
      answer: 1,
      hint: "Cập nhật state một cách tinh chỉnh/chia nhỏ (fine-grained) giúp chỉ rebuild những widget thực sự cần thiết.",
      rationale:
        "Fine-grained state management targets state changes to specific, small widgets rather than rebuilding broad parts of the UI hierarchy.",
    },
    {
      id: 23,
      question: "Which action best demonstrates Flutter's reactive UI model?",
      options: [
        "Manually updating UI elements",
        "Rebuilding UI in response to state changes",
        "Editing layout XML",
        "Calling native APIs",
      ],
      answer: 1,
      hint: "Trong reactive UI, khi state thay đổi, giao diện sẽ phản ứng bằng cách làm gì?",
      rationale:
        "In a reactive framework like Flutter, UI is a function of state ($UI = f(state)$), rebuilding automatically as state evolves.",
    },
    {
      id: 24,
      question: "Which package supports BLoC architecture?",
      options: ["provider", "flutter_bloc", "sqflite", "http"],
      answer: 1,
      hint: "Thư viện chính thức phổ biến nhất để triển khai BLoC trong Flutter.",
      rationale:
        "`flutter_bloc` is the standard Flutter package designed specifically for integrating the BLoC (Business Logic Component) pattern.",
    },
    {
      id: 25,
      question:
        "Which widget can hide user input text when configured for password entry?",
      options: ["TextField", "ObscureText", "SecureInput", "PasswordField"],
      answer: 0,
      hint: "Widget nhập liệu chuẩn trong Flutter có thuộc tính `obscureText: true`.",
      rationale:
        "TextField is the standard text input widget, which hides password text when setting `obscureText: true`.",
    },
    {
      id: 26,
      question: "What is the purpose of SliverAppBar?",
      options: [
        "Static app bar",
        "Scrollable flexible app bar",
        "Bottom navigation",
        "Drawer control",
      ],
      answer: 1,
      hint: "SliverAppBar thường kết hợp với CustomScrollView để tạo hiệu ứng thanh ứng dụng co giãn theo cuộn trang.",
      rationale:
        "SliverAppBar integrates with custom scroll views to provide flexible, expandable, and collapsible app bar behaviors on scroll.",
    },
    {
      id: 27,
      question: "Which method resets all form fields?",
      options: ["clear()", "reset()", "dispose()", "remove()"],
      answer: 1,
      hint: "Phương thức của `FormState` dùng để đặt lại tất cả các trường dữ liệu về giá trị ban đầu.",
      rationale:
        "`FormState.reset()` resets all `FormField` descendants back to their initial values and clears validation errors.",
    },
    {
      id: 28,
      question: "Why is secure authentication critical in mobile apps?",
      options: [
        "UI quality",
        "Protect user data",
        "Reduce code",
        "Improve speed",
      ],
      answer: 1,
      hint: "Mục đích quan trọng nhất của xác thực bảo mật là bảo vệ cái gì của người dùng?",
      rationale:
        "Secure authentication protects sensitive user data and prevents unauthorized access to personal information.",
    },
    {
      id: 29,
      question: "Which HTTP method is typically used to retrieve data?",
      options: ["POST", "PUT", "GET", "DELETE"],
      answer: 2,
      hint: "Phương thức HTTP tiêu chuẩn dùng để truy vấn/lấy dữ liệu từ server.",
      rationale:
        "The HTTP GET method is designed to request and retrieve data from a specified server resource.",
    },
    {
      id: 30,
      question: "Why is Chapter 13 considered optional (Plus)?",
      options: [
        "It replaces core concepts",
        "Apps can work without deep optimization",
        "It manages navigation",
        "It handles authentication",
      ],
      answer: 1,
      hint: "Các kỹ thuật tối ưu hóa chuyên sâu nâng cao không bắt buộc để một ứng dụng cơ bản hoạt động.",
      rationale:
        "Advanced optimization topics are supplemental; basic applications function properly without deep, complex performance tuning.",
    },
    {
      id: 31,
      question: "Why should authentication state be centralized?",
      options: [
        "Reduce UI code",
        "Ensure consistent access control",
        "Improve animations",
        "Simplify layout",
      ],
      answer: 1,
      hint: "Tập trung quản lý trạng thái xác thực giúp kiểm soát quyền truy cập toàn ứng dụng một cách đồng nhất.",
      rationale:
        "Centralizing auth state provides a single source of truth for user credentials, ensuring consistent access control across all screens.",
    },
    {
      id: 32,
      question:
        "Which Dart keyword is used to define a constant value at compile time?",
      options: ["final", "static", "const", "var"],
      answer: 2,
      hint: "Từ khóa tạo hằng số biết trước ở thời điểm biên dịch (compile time).",
      rationale:
        "`const` is used for compile-time constants whose values must be known at build time.",
    },
    {
      id: 33,
      question: "Which status code indicates server error?",
      options: ["200", "301", "404", "500"],
      answer: 3,
      hint: "Mã trạng thái HTTP đầu 5xx thể hiện lỗi phía máy chủ.",
      rationale:
        "HTTP 500 Internal Server Error indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.",
    },
    {
      id: 34,
      question: "What is the role of events in BLoC?",
      options: [
        "Store UI",
        "Trigger state changes",
        "Render widgets",
        "Handle layout",
      ],
      answer: 1,
      hint: "Trong BLoC, đầu vào là Events và đầu ra là States. Events đóng vai trò gì?",
      rationale:
        "Events are inputs to a BLoC that represent user actions or system triggers, causing the BLoC to emit new states.",
    },
    {
      id: 35,
      question: "Which widget allows overlapping of its child widgets?",
      options: ["Column", "Row", "Stack", "Expanded"],
      answer: 2,
      hint: "Widget xếp chồng các widget con lên nhau theo trục Z.",
      rationale:
        "Stack layers multiple child widgets on top of one another along the Z-axis.",
    },
    {
      id: 36,
      question: "What does CurvedAnimation provide?",
      options: [
        "Layout control",
        "Animation curve behavior",
        "State updates",
        "Navigation",
      ],
      answer: 1,
      hint: "CurvedAnimation dùng để áp dụng một đường cong (curve) gia tốc/giảm tốc cho chuyển động.",
      rationale:
        "CurvedAnimation applies a non-linear rate of change (easing curves like Curves.easeInOut) to an animation progression.",
    },
    {
      id: 37,
      question: "Which type of test checks individual functions or classes?",
      options: ["Widget test", "Integration test", "Unit test", "System test"],
      answer: 2,
      hint: "Mức độ test nhỏ nhất kiểm tra một đơn vị mã (hàm, phương thức, class) độc lập.",
      rationale:
        "Unit tests focus on verifying the correctness of a single function, method, or class in isolation.",
    },
    {
      id: 38,
      question: "What is the main purpose of hot reload in Flutter?",
      options: [
        "Improve runtime performance",
        "Instantly reflect code changes in Ul",
        "Publish apps faster",
        "Reduce memory usage",
      ],
      answer: 1,
      hint: "Hot Reload giúp các thay đổi mã nguồn hiển thị ngay lập tức trên giao diện mà không làm mất state.",
      rationale:
        "Hot Reload injects updated code files into the running Dart VM, letting developers see UI changes instantly without restarting the app.",
    },
    {
      id: 39,
      question: "Which phase involves gathering requirements?",
      options: ["Implementation", "Design", "Analysis", "Testing"],
      answer: 2,
      hint: "Giai đoạn phân tích yêu cầu (Requirement Analysis) trong quy trình phát triển phần mềm.",
      rationale:
        "The Analysis phase focuses on collecting, organizing, and understanding software requirements and scope.",
    },
    {
      id: 40,
      question: "Why are forms important in mobile applications?",
      options: [
        "UI decoration",
        "User data collection",
        "State management",
        "Navigation",
      ],
      answer: 1,
      hint: "Form là công cụ chính để ứng dụng thu thập dữ liệu nhập từ người dùng.",
      rationale:
        "Forms allow mobile apps to collect, validate, and submit user inputs like login credentials or profile details.",
    },
    {
      id: 41,
      question: "Why should database operations be asynchronous?",
      options: [
        "Simplify syntax",
        "Avoid blocking UI thread",
        "Reduce code",
        "Improve theme",
      ],
      answer: 1,
      hint: "Thao tác I/O đĩa cứng tốn thời gian, nếu chạy đồng bộ sẽ làm giật/đơ giao diện.",
      rationale:
        "Database operations perform disk I/O; making them asynchronous prevents freezing or blocking the main UI thread.",
    },
    {
      id: 42,
      question:
        "Which widget applies a theme to an entire Flutter application?",
      options: ["Scaffold", "Theme", "MaterialApp", "Container"],
      answer: 2,
      hint: "Widget gốc cấu hình ứng dụng Material, chứa thuộc tính `theme: ThemeData(...)`.",
      rationale:
        "MaterialApp defines the application's overall `theme` and `darkTheme` properties applied across the entire widget tree.",
    },
    {
      id: 43,
      question: "What is the purpose of parsing JSON?",
      options: [
        "Encrypt data",
        "Convert JSON into Dart objects",
        "Send requests",
        "Cache responses",
      ],
      answer: 1,
      hint: "Parse JSON là quá trình chuyển đổi chuỗi JSON từ API thành các đối tượng/Data Models trong Dart.",
      rationale:
        "JSON parsing converts raw JSON string/map data received from network APIs into strongly-typed Dart model objects.",
    },
    {
      id: 44,
      question: "How can data be passed to a new screen?",
      options: [
        "Using global variables",
        "Via constructor arguments",
        "Using ThemeData",
        "Using Scaffold",
      ],
      answer: 1,
      hint: "Cách truyền dữ liệu phổ biến và an toàn nhất giữa các màn hình là thông qua tham số khởi tạo.",
      rationale:
        "Passing arguments through constructor parameters is the standard, strongly-typed way to share data when navigating to a new Widget/Screen.",
    },
    {
      id: 45,
      question:
        "What is the main benefit of Flutter's widget-based architecture?",
      options: [
        "Widgets are only used for layout design",
        "Widgets allow code reuse across platforms",
        "Widgets automatically manage databases",
        "Widgets replace backend services",
      ],
      answer: 1,
      hint: "Widget được render tự chủ bởi Flutter engine nên mã giao diện có thể tái sử dụng thế nào trên các nền tảng?",
      rationale:
        "Because Flutter renders widgets using its own engine, widget code behaves and renders identically across different platforms.",
    },
    {
      id: 46,
      question:
        "Which Dart data structure is best suited for storing an ordered collection of items?",
      options: ["Set", "Map", "List", "Queue"],
      answer: 2,
      hint: "Cấu trúc dữ liệu danh sách có thứ tự và chỉ số (index) trong Dart.",
      rationale:
        "`List` is an ordered collection of elements accessible by zero-based integer indices.",
    },
    {
      id: 47,
      question: "Which Flutter widget reacts to authentication state changes?",
      options: ["FutureBuilder", "StreamBuilder", "ListView", "Form"],
      answer: 1,
      hint: "Luồng trạng thái đăng nhập (Auth State) thường phát ra dưới dạng `Stream` liên tục.",
      rationale:
        "Auth state changes (like Firebase Auth state) are usually emitted as a `Stream`, which `StreamBuilder` listens to for reactive UI rebuilds.",
    },
    {
      id: 48,
      question: "Why should animations be disposed properly?",
      options: [
        "Improve UI",
        "Prevent memory leaks",
        "Speed up builds",
        "Fix layout",
      ],
      answer: 1,
      hint: "Hủy (dispose) AnimationController khi không còn dùng giúp giải phóng tài nguyên gì?",
      rationale:
        "Failing to dispose AnimationControllers leaves Tickers active in memory, causing memory leaks and performance degradation.",
    },
    {
      id: 49,
      question: "Which widget is best used to add fixed empty space?",
      options: ["Padding", "Expanded", "SizedBox", "Container"],
      answer: 2,
      hint: "Widget nhẹ nhất để tạo khoảng trống cố định theo width hoặc height.",
      rationale:
        "`SizedBox` with a fixed `width` or `height` is the most performant and clean way to insert fixed blank spacing.",
    },
    {
      id: 50,
      question:
        "Which step is required before running a Flutter app for the first time?",
      options: [
        "Publishing the app",
        "Setting up the Flutter SDK",
        "Configuring a database",
        "Writing backend APIs",
      ],
      answer: 1,
      hint: "Bước chuẩn bị công cụ môi trường phát triển bắt buộc đầu tiên.",
      rationale:
        "Setting up the Flutter SDK and configuring the development environment is necessary before building or running any Flutter project.",
    },

    {
      id: 1,
      question: "What is Flutter?",
      options: [
        "A new programming language developed by Google",
        "A UI toolkit by Google for building natively compiled apps from a single codebase",
        "A framework only for building web applications",
        "A mobile operating system by Google",
      ],
      answer: 1,
      hint: "Nhớ định nghĩa Flutter là gì theo bài giảng (SDK/UI toolkit của Google).",
      rationale:
        "Flutter là bộ công cụ UI (UI toolkit) của Google dùng để xây dựng ứng dụng biên dịch native từ một codebase duy nhất. A sai vì Flutter không phải là ngôn ngữ lập trình; C sai vì Flutter đa nền tảng chứ không chỉ web; D sai vì Flutter không phải hệ điều hành.",
    },
    {
      id: 2,
      question:
        "Which programming language and rendering engine does Flutter use?",
      options: [
        "Kotlin and Skia",
        "Dart and Skia",
        "Dart and V8",
        "Swift and Metal",
      ],
      answer: 1,
      hint: "Nhớ cặp ngôn ngữ và rendering engine mà Flutter sử dụng.",
      rationale:
        "Flutter sử dụng ngôn ngữ Dart cùng rendering engine Skia. Các đáp án A, C, D đều ghép sai ngôn ngữ/engine.",
    },
    {
      id: 3,
      question:
        "Flutter's architecture has three main layers. What is the correct top-to-bottom order (closest to the developer to closest to the hardware)?",
      options: [
        "Engine → Framework → Embedder",
        "Framework → Engine → Embedder",
        "Embedder → Framework → Engine",
        "Framework → Embedder → Engine",
      ],
      answer: 1,
      hint: "Nhớ thứ tự 3 lớp kiến trúc Flutter từ gần lập trình viên đến gần phần cứng.",
      rationale:
        "Thứ tự kiến trúc là Framework (Dart) → Engine (C++) → Embedder, đúng như slide 'Flutter Architecture Overview'. Các đáp án khác đảo ngược thứ tự sai.",
    },
    {
      id: 4,
      question:
        "Which layer of the Flutter architecture is written in C++ and uses Skia to handle rendering, accessibility, and text layout?",
      options: [
        "Framework Layer",
        "Engine Layer",
        "Embedder Layer",
        "Widget Layer",
      ],
      answer: 1,
      hint: "Nhớ lớp nào viết bằng C++ và dùng Skia để render.",
      rationale:
        "Lớp Engine viết bằng C++ và dùng Skia để xử lý rendering, accessibility và text layout. Framework Layer là lớp Dart phía trên; Embedder xử lý tích hợp nền tảng; 'Widget Layer' không phải tên chính thức của lớp kiến trúc này.",
    },
    {
      id: 5,
      question:
        "What is the main role of the Embedder Layer in Flutter's architecture?",
      options: [
        "Provide all Material and Cupertino widgets",
        "Compile Dart code to ARM machine code",
        "Platform-specific integration, handling input, lifecycle, and window management",
        "Perform JSON parsing from APIs",
      ],
      answer: 2,
      hint: "Nhớ vai trò chính của lớp Embedder trong kiến trúc Flutter.",
      rationale:
        "Lớp Embedder đảm nhận việc tích hợp nền tảng cụ thể, xử lý input, vòng đời (lifecycle) và quản lý cửa sổ (window management). A và D thuộc về lớp Framework/networking; B là công việc của trình biên dịch AOT chứ không phải Embedder.",
    },
    {
      id: 6,
      question:
        "A startup wants to build an MVP quickly, running on both Android and iOS, with a limited development team and no need for extreme graphics performance. According to the lecture, this situation is:",
      options: [
        "Not suitable for Flutter because Flutter only supports Android",
        "A reasonable fit for Flutter because it matches the goal of faster time-to-market and reduced development cost",
        "Better suited to pure native code because Flutter doesn't support MVPs",
        "Best done in Kotlin because Flutter is not optimized for commercial apps",
      ],
      answer: 1,
      hint: "Nhớ Flutter phù hợp với những trường hợp nào theo bài giảng (MVP, startup...).",
      rationale:
        "Bài giảng nêu Flutter phù hợp cho MVP, startup, giảm chi phí phát triển và rút ngắn thời gian ra thị trường — khớp chính xác với tình huống này. A, C, D đều mâu thuẫn với nội dung bài giảng.",
    },
    {
      id: 7,
      question:
        "Which of the following is the best example of a case where you should NOT choose Flutter and should build natively instead?",
      options: [
        "A simple movie ticket booking app",
        "An e-commerce app with a standard UI",
        "A real-time graphics-intensive game requiring low-level hardware access",
        "An internal enterprise management dashboard app",
      ],
      answer: 2,
      hint: "Nhớ trường hợp điển hình nên dùng native thay vì Flutter.",
      rationale:
        "Game đồ họa thời gian thực đòi hỏi truy cập phần cứng mức thấp là ví dụ kinh điển cho 'khi nào nên phát triển native'. A, B, D đều là các trường hợp Flutter vẫn phù hợp.",
    },
    {
      id: 8,
      question:
        "Flutter communicates with native features (Camera, Bluetooth, NFC...) that it does not support directly through which mechanism?",
      options: [
        "WebSocket",
        "Platform Channels",
        "REST API",
        "Automatic FFI Bridge",
      ],
      answer: 1,
      hint: "Nhớ cơ chế Flutter dùng để giao tiếp với tính năng native (Camera, Bluetooth...).",
      rationale:
        "Flutter tích hợp với các tính năng native qua Platform Channels. A, C, D không phải cơ chế được đề cập trong bài giảng.",
    },
    {
      id: 9,
      question:
        "Which combined compilation model does Dart use to support both fast development and optimized production performance?",
      options: [
        "JIT (Just-In-Time) only",
        "AOT (Ahead-Of-Time) only",
        "Both JIT (development) and AOT (production)",
        "Purely interpreted, no compilation",
      ],
      answer: 2,
      hint: "Nhớ Dart kết hợp mô hình biên dịch nào để vừa phát triển nhanh vừa tối ưu hiệu năng.",
      rationale:
        "Dart kết hợp cả JIT (phát triển nhanh, hot reload) và AOT (biên dịch hiệu năng cao cho production). A và B chỉ nêu một nửa sự thật; D hoàn toàn sai.",
    },
    {
      id: 10,
      question:
        "In the framework comparison table from Module 1, what is the core difference between Flutter and React Native?",
      options: [
        "Flutter uses Dart and compiles to native UI with its own engine, while React Native uses JavaScript and bridges to native components",
        "Both compile directly to native machine code without an engine",
        "React Native is faster because it needs no bridge",
        "Flutter cannot build for iOS, only Android",
      ],
      answer: 0,
      hint: "Nhớ bảng so sánh Flutter, React Native, Native ở Module 1.",
      rationale:
        "Flutter dùng Dart và biên dịch ra native UI với engine riêng, trong khi React Native dùng JavaScript và cầu nối (bridge) tới thành phần native. B sai vì React Native cần bridge; C và D là các khẳng định không có cơ sở.",
    },
    {
      id: 11,
      question:
        "In a Flutter project, which file is the entry point of the app?",
      options: [
        "pubspec.yaml",
        "lib/main.dart",
        "android/build.gradle",
        "web/index.html",
      ],
      answer: 1,
      hint: "Nhớ file nào là điểm bắt đầu của một dự án Flutter.",
      rationale:
        "`lib/main.dart` là entry point, theo bảng cấu trúc dự án. A là file cấu hình dependency; C, D là file cấu hình nền tảng, không phải entry point.",
    },
    {
      id: 12,
      question:
        "Which folder in the Flutter project structure holds dependency and asset configuration?",
      options: ["lib/", "test/", "pubspec.yaml", "android/"],
      answer: 2,
      hint: "Nhớ file nào chứa cấu hình dependency và asset trong dự án Flutter.",
      rationale:
        "`pubspec.yaml` chứa cấu hình dependencies và assets. A chứa mã Dart chính; B chứa unit test; D chứa mã riêng cho Android.",
    },
    {
      id: 13,
      question: "What is the `flutter doctor` command used for?",
      options: [
        "Automatically fix errors in Dart source code",
        "Check and confirm whether the Flutter SDK installation and related tools are ready",
        "Build the app into a release APK file",
        "Run unit tests for the whole project",
      ],
      answer: 1,
      hint: "Nhớ chức năng của lệnh `flutter doctor`.",
      rationale:
        "`flutter doctor` kiểm tra môi trường cài đặt SDK Flutter và các công cụ liên quan. A, C, D mô tả sai chức năng lệnh này.",
    },
    {
      id: 14,
      question:
        "A student creates an emulator on a low-spec PC. According to the lecture's recommendation, which emulator configuration is more suitable to reduce the load on the machine?",
      options: [
        "Pixel 8, API 33+",
        "Pixel 3a, API 30",
        "Pixel Tablet, API 34",
        "Pixel Fold, API 35",
      ],
      answer: 1,
      hint: "Nhớ cấu hình emulator được khuyến nghị cho máy cấu hình thấp.",
      rationale:
        "Bài giảng khuyến nghị Pixel 3a / API 30 cho máy cấu hình yếu. A, C, D là các cấu hình nặng hơn, không phù hợp cho máy yếu.",
    },
    {
      id: 15,
      question:
        "How does DartPad differ from VS Code/Android Studio when developing Flutter?",
      options: [
        "DartPad requires a full SDK installation just like Android Studio",
        "DartPad is an online environment, requires no installation, and runs directly in the browser",
        "DartPad does not support basic widgets like Text, Column",
        "DartPad can only be used for the Kotlin language",
      ],
      answer: 1,
      hint: "Nhớ đặc điểm khác biệt của DartPad so với VS Code/Android Studio.",
      rationale:
        "DartPad là môi trường trực tuyến, không cần cài đặt, chạy trực tiếp trên trình duyệt. A sai vì DartPad không cần SDK đầy đủ; C sai vì DartPad hỗ trợ Text, Column; D sai vì đây là Dart/Flutter chứ không phải Kotlin.",
    },
    {
      id: 16,
      question:
        "Consider the following code running in main.dart:\nimport 'package:flutter/material.dart';\nvoid main() => runApp(const MaterialApp(\n  home: Scaffold(\n    body: Center(\n      child: Text('Hello, World',\n        style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),\n    ),\n  ),\n));\nIf the `const` keyword before `MaterialApp` is removed, what happens to the app's behavior?",
      options: [
        "The app will fail to compile immediately",
        "The app still runs correctly, only losing the performance optimization benefit since Flutter can no longer reuse the same immutable widget instance",
        'The Text will fail to display "Hello, World"',
        "The Scaffold will no longer be able to have an AppBar later",
      ],
      answer: 1,
      hint: "Nhớ tác dụng của từ khóa `const` đối với việc tối ưu hóa widget.",
      rationale:
        "`const` giúp Flutter tối ưu việc so sánh cây widget (tree-diffing); bỏ `const` ứng dụng vẫn chạy đúng nhưng mất lợi ích tối ưu này. A sai vì không gây lỗi biên dịch; C sai vì Text vẫn hiển thị bình thường; D không liên quan.",
    },
    {
      id: 17,
      question:
        "According to Flutter's architecture, which statement best describes the concept of a 'Widget'?",
      options: [
        "Widgets are only components that display images",
        "In Flutter, everything on screen (layout, style, interaction) is built through Widgets",
        "Widgets only exist in the Engine Layer",
        "Widget is an Android-only concept, not used in Flutter",
      ],
      answer: 1,
      hint: "Nhớ khái niệm 'Everything is a Widget' trong Flutter.",
      rationale:
        "'Mọi thứ đều là Widget' — mọi thứ hiển thị trên màn hình đều được xây dựng qua Widget. A giới hạn sai phạm vi; C, D sai về nơi/loại widget tồn tại.",
    },
    {
      id: 18,
      question:
        "According to the development history timeline mentioned in the lecture, what platform support did Flutter 2.0 (2021) add?",
      options: [
        "Only added Android Wear support",
        "Web and Desktop",
        "Only added iOS support",
        "Only added watchOS support",
      ],
      answer: 1,
      hint: "Nhớ mốc thời gian Flutter 2.0 (2021) bổ sung nền tảng nào.",
      rationale:
        "Flutter 2.0 (2021) bổ sung hỗ trợ Web và Desktop theo mốc thời gian trong bài giảng. A, C, D không khớp với mốc được nêu.",
    },
    {
      id: 19,
      question: "What order does Flutter's rendering workflow follow?",
      options: [
        "GPU Rendering → Widget Tree → Render Tree → Composited Scene",
        "Widget Tree → Render Tree → Composited Scene → GPU Rendering",
        "Render Tree → Widget Tree → GPU Rendering → Composited Scene",
        "Composited Scene → Widget Tree → GPU Rendering → Render Tree",
      ],
      answer: 1,
      hint: "Nhớ thứ tự quy trình render của Flutter.",
      rationale:
        "Quy trình render: Widget Tree → Render Tree → Composited Scene → GPU Rendering, đúng thứ tự trong slide. Các đáp án khác đảo ngược thứ tự sai.",
    },
    {
      id: 20,
      question:
        "An instructor creates a new Flutter project with Organization ID `com.fptu.movies` and project name `movies`. What is the main purpose of the Organization ID during project creation?",
      options: [
        "Only used to set the display name shown on the device's home screen",
        "Determines the unique package name/bundle identifier for the app when packaged for Android/iOS",
        "Has no real effect, purely illustrative",
        "Used to set the app's color theme",
      ],
      answer: 1,
      hint: "Nhớ vai trò chính của Organization ID khi tạo dự án Flutter.",
      rationale:
        "Organization ID quyết định package name/bundle identifier duy nhất khi đóng gói ứng dụng cho Android/iOS. A, C, D mô tả sai vai trò kỹ thuật của nó.",
    },
    {
      id: 21,
      question:
        "According to the lecture, when should a development team consider using native code (Kotlin/Swift) instead of pure Flutter?",
      options: [
        "When the app needs very low-level hardware access or strict platform-specific UI/UX requirements",
        "When the app only needs to run on a simple single Android platform",
        "When the team has little experience with Kotlin/Swift",
        "When the app only displays a static list of text",
      ],
      answer: 0,
      hint: "Nhớ khi nào nên cân nhắc dùng native (Kotlin/Swift) thay vì Flutter thuần.",
      rationale:
        "Nên cân nhắc native khi ứng dụng cần truy cập phần cứng mức thấp hoặc yêu cầu UI/UX đặc thù nền tảng nghiêm ngặt — khớp với 'khi nào nên phát triển native'. B, C, D là các trường hợp Flutter vẫn phù hợp hoặc không liên quan.",
    },
    {
      id: 22,
      question:
        "In the 'Hello World' example run across three environments (DartPad, VS Code, Android Studio), what is the most important common point emphasized?",
      options: [
        "Each environment uses a different programming language",
        "All tools compile down to the same Flutter runtime, producing identical results",
        "Only Android Studio can run a real app",
        "DartPad cannot display TextStyle",
      ],
      answer: 1,
      hint: "Nhớ điểm chung quan trọng nhất khi chạy 'Hello World' trên 3 môi trường.",
      rationale:
        "Điểm chung quan trọng: tất cả công cụ đều biên dịch về cùng Flutter runtime, cho kết quả giống hệt nhau trên DartPad/VS Code/Android Studio. A, C, D đều sai theo bài giảng.",
    },
    {
      id: 23,
      question:
        "Given the comparison table: Flutter (Dart, Native UI + Engine), React Native (JS, Bridge to Native), Native (Kotlin/Swift, Pure Native). Which statement best analyzes the trade-off among these three approaches?",
      options: [
        "Native is always slower than Flutter because it has no dedicated engine",
        "React Native is fastest because it needs no compilation",
        "Flutter achieves near-native performance thanks to its own renderer engine (Skia) without needing a bridge like React Native, while Native achieves maximum performance but loses the shared-codebase advantage",
        "All three produce identical pure native code",
      ],
      answer: 2,
      hint: "Nhớ phân tích đánh đổi giữa Flutter, React Native và Native trong bảng so sánh.",
      rationale:
        "Flutter đạt hiệu năng gần native nhờ renderer engine riêng (Skia) mà không cần bridge như React Native, trong khi Native đạt hiệu năng tối đa nhưng mất lợi thế chia sẻ codebase — đây là đánh đổi chính xác theo bảng so sánh. A, B, D sai hoặc quá đơn giản hóa.",
    },
    {
      id: 24,
      question:
        "According to the lecture, what tool does macOS need to build a Flutter app for iOS?",
      options: ["Android Studio", "Xcode", "Visual Studio", "IntelliJ IDEA"],
      answer: 1,
      hint: "Nhớ công cụ macOS cần để build ứng dụng Flutter cho iOS.",
      rationale:
        "macOS cần Xcode để build cho iOS, theo ghi chú 'macOS users need Xcode for iOS builds'. A, C, D không phải công cụ được nêu cho mục đích này.",
    },
    {
      id: 25,
      question:
        "Which statement is FALSE regarding the reasons to choose Flutter ('Why Flutter')?",
      options: [
        "Hot Reload/Hot Restart enables fast development",
        "Provides Material & Cupertino widgets for a beautiful UI",
        "Can only run on a single platform",
        "Near-native performance",
      ],
      answer: 2,
      hint: "Nhớ các lý do đúng trong phần 'Why Flutter' để tìm ra phát biểu SAI.",
      rationale:
        "'Chỉ chạy được trên một nền tảng duy nhất' là SAI vì Flutter đa nền tảng (Android, iOS, Web, Desktop) — đây chính là điểm mạnh cốt lõi của Flutter, ngược hoàn toàn với những gì 'Why Flutter' nêu. A, B, D đều là các lý do hợp lệ được nêu trong bài giảng.",
    },
    {
      id: 26,
      question:
        "In Dart, what is the basic difference between `final` and `const`?",
      options: [
        "No difference, the two keywords are interchangeable in every case",
        "`final` is a compile-time constant, `const` is a runtime constant",
        "`final` is a value assigned once at runtime (runtime-constant), `const` is a compile-time constant",
        "`final` is only for numeric types, `const` is only for string types",
      ],
      answer: 2,
      hint: "Nhớ sự khác biệt cơ bản giữa `final` và `const` trong Dart.",
      rationale:
        "`final` là giá trị được gán một lần tại runtime; `const` là giá trị hằng được biết trước tại compile-time. B đảo ngược định nghĩa; D sai vì không có từ khóa nào giới hạn cho một kiểu dữ liệu cụ thể.",
    },
    {
      id: 27,
      question:
        'Consider:\ndynamic x = 10;\nx = "Hello";\nprint(x);\nWhat happens when this code runs?',
      options: [
        "Compile error because a String cannot be assigned to a variable already typed as int",
        'Prints "Hello" because `dynamic` allows the data type to change at runtime',
        "Prints 10 because the original data type is preserved",
        "Throws a TypeError exception at runtime",
      ],
      answer: 1,
      hint: "Nhớ đặc điểm của kiểu `dynamic` trong Dart cho phép thay đổi kiểu dữ liệu.",
      rationale:
        '`dynamic` cho phép kiểu dữ liệu thay đổi tại runtime, nên in ra "Hello". A sai vì đây là hành vi hợp lệ của `dynamic`; C, D sai vì không có lỗi và giá trị cuối cùng là "Hello".',
    },
    {
      id: 28,
      question:
        "Given:\nList<int> nums = [1, 2, 3, 4, 5];\nvar result = nums.map((e) => e * 2).where((e) => e > 4).toList();\nprint(result);\nWhat is printed?",
      options: [
        "[2, 4, 6, 8, 10]",
        "[6, 8, 10]",
        "[3, 4, 5]",
        "[1, 2, 3, 4, 5]",
      ],
      answer: 1,
      hint: "Nhớ cách thực hiện tuần tự `map` rồi `where` trên một List.",
      rationale:
        "`[1,2,3,4,5].map(x*2) = [2,4,6,8,10]`, sau đó `.where(e>4) = [6,8,10]`. A chỉ dừng ở bước map; C, D không khớp với phép biến đổi.",
    },
    {
      id: 29,
      question:
        "In Dart, `Set<int> s = {1, 2, 2, 3};` — after initialization, what is `s.length`?",
      options: [
        "4",
        "3",
        "2",
        "Compile error because Set doesn't allow duplicate elements in a declaration",
      ],
      answer: 1,
      hint: "Nhớ đặc điểm của Set về việc loại bỏ phần tử trùng lặp.",
      rationale:
        "Set tự động loại bỏ trùng lặp: `{1,2,2,3}` trở thành `{1,2,3}` → length = 3. A đếm nhầm phần tử trùng; C thiếu một phần tử; D sai vì Set vẫn cho phép khai báo trùng, chỉ tự loại bỏ khi lưu trữ.",
    },
    {
      id: 30,
      question:
        "Consider this named constructor code:\nclass Point {\n  int x, y;\n  Point(this.x, this.y);\n  Point.origin() : x = 0, y = 0;\n}\nvoid main() {\n  var p1 = Point(3, 4);\n  var p2 = Point.origin();\n  print('${p1.x},${p1.y} - ${p2.x},${p2.y}');\n}\nWhat is printed?",
      options: [
        "0,0 - 3,4",
        "3,4 - 0,0",
        "Error because Dart doesn't support multiple constructors in the same class",
        "null,null - 0,0",
      ],
      answer: 1,
      hint: "Nhớ cách constructor thường và constructor đặt tên gán giá trị khác nhau.",
      rationale:
        '`Point(3,4)` gán x=3,y=4; `Point.origin()` gán x=0,y=0 qua initializer list — in ra "3,4 - 0,0". A đảo ngược kết quả; C sai vì Dart hỗ trợ constructor đặt tên; D sai vì giá trị được gán đúng, không phải null.',
    },
    {
      id: 31,
      question: "What does the `??` operator do in Dart?",
      options: [
        "Type equality comparison",
        "Returns the left-hand value if it's not null, otherwise returns the right-hand value",
        "Forces a non-null cast, throwing an error if null",
        "Logical XOR operator",
      ],
      answer: 1,
      hint: "Nhớ chức năng của toán tử `??` trong Dart.",
      rationale:
        "`??` trả về giá trị bên trái nếu khác null, ngược lại trả về giá trị bên phải (null-coalescing). A, C, D mô tả sai chức năng toán tử này.",
    },
    {
      id: 32,
      question:
        'Given:\nString? name;\nprint(name ?? "Guest");\nname = "Minh";\nprint(name!.length);\nWhat is printed, in order?',
      options: [
        "null, 4",
        "Guest, 4",
        "Guest, 5",
        "Compile error because `!` cannot be used with a String? variable",
      ],
      answer: 1,
      hint: "Nhớ cách toán tử `??` và `!` hoạt động với biến nullable.",
      rationale:
        '`name` ban đầu là null nên in "Guest"; sau khi gán "Minh" (4 ký tự), `name!.length` = 4 → kết quả "Guest, 4". A sai giá trị đầu; C sai độ dài (phải là 4, không phải 5); D sai vì `!` hợp lệ về cú pháp khi biến chắc chắn khác null tại điểm đó.',
    },
    {
      id: 33,
      question:
        'In the following code, what is printed to the console?\nvoid main() {\n  try {\n    int result = 10 ~/ 0;\n    print(result);\n  } catch (e) {\n    print("Error: $e");\n  } finally {\n    print("Done");\n  }\n}',
      options: [
        "Error: ... then Done (integer division by zero throws IntegerDivisionByZeroException)",
        "10, without printing Done",
        "Infinity, Done",
        "The program crashes completely with no output",
      ],
      answer: 0,
      hint: "Nhớ điều gì xảy ra khi chia nguyên cho 0 bằng `~/` trong Dart.",
      rationale:
        'Chia nguyên cho 0 bằng `~/` ném ra `IntegerDivisionByZeroException`, được `catch` bắt, in "Error: ..." rồi "Done" (finally luôn chạy). B, C sai vì có ngoại lệ xảy ra; D sai vì catch xử lý lỗi, chương trình không crash hoàn toàn.',
    },
    {
      id: 34,
      question:
        "What is the difference between `for-in` and `forEach` when iterating a List in Dart?",
      options: [
        "`for-in` cannot be used with a List",
        "`forEach` is the classic index-based loop syntax, while `for-in` is a higher-order function",
        "`for-in` is syntax for iterating each element of a collection, while `forEach` calls a callback function in a functional programming style for each element",
        "The two syntaxes are entirely identical in performance and syntax, with no difference",
      ],
      answer: 2,
      hint: "Nhớ sự khác biệt giữa `for-in` và `forEach` khi duyệt List.",
      rationale:
        "`for-in` là cú pháp duyệt từng phần tử của collection; `forEach` là hàm bậc cao gọi callback theo phong cách lập trình hàm cho từng phần tử. A sai vì for-in dùng được với List; B đảo ngược mô tả; D sai vì có sự khác biệt về phong cách.",
    },
    {
      id: 35,
      question:
        'Given this function:\nvoid greet({String name = "Guest", int age = 18}) {\n  print("$name is $age");\n}\nWhat does calling `greet(name: "Lan");` print?',
      options: [
        "Error due to missing age parameter",
        "Lan is 18",
        "Guest is 18",
        "Lan is null",
      ],
      answer: 1,
      hint: "Nhớ cách tham số mặc định hoạt động khi gọi hàm với named parameter.",
      rationale:
        '`greet(name: "Lan")` chỉ truyền name; age dùng giá trị mặc định 18 → "Lan is 18". A sai vì age có giá trị mặc định; C sai vì name đã được truyền; D sai vì age rõ ràng có mặc định.',
    },
    {
      id: 36,
      question:
        'Consider this OOP code:\nclass Animal {\n  String sound() => "Some sound";\n}\nclass Dog extends Animal {\n  @override\n  String sound() => "Woof";\n}\nvoid main() {\n  Animal a = Dog();\n  print(a.sound());\n}\nWhat is printed, and which OOP concept does it illustrate?',
      options: [
        '"Some sound" — illustrates Encapsulation',
        '"Woof" — illustrates Polymorphism via method override',
        "Compile error because Dog cannot be assigned to an Animal-typed variable",
        '"Woof Some sound" — both functions are called',
      ],
      answer: 1,
      hint: "Nhớ khái niệm OOP minh họa qua việc override method và upcasting.",
      rationale:
        'Đây là minh họa Đa hình (Polymorphism): biến kiểu Animal gọi phương thức đã override của Dog tại runtime, in ra "Woof". A gán sai khái niệm; C sai vì upcasting hợp lệ; D sai vì chỉ một phương thức được gọi.',
    },
    {
      id: 37,
      question:
        'Given `Map<String, int> scores = {"Anna": 95};`, what happens when accessing `scores["Ben"]` (a nonexistent key)?',
      options: [
        "Throws an exception immediately",
        "Returns 0",
        "Returns null",
        'Returns an empty string ""',
      ],
      answer: 2,
      hint: "Nhớ Map trả về gì khi truy cập key không tồn tại.",
      rationale:
        "Truy cập Map với key không tồn tại trả về null trong Dart. A, B, D không khớp với hành vi mặc định của Map trong Dart.",
    },
    {
      id: 38,
      question:
        'Consider this code illustrating Dart\'s Event Loop:\nimport \'dart:async\';\nvoid main() {\n  print("A");\n  scheduleMicrotask(() => print("micro"));\n  Future(() => print("future"));\n  print("B");\n}\nWhat is the correct output order?',
      options: [
        "A, B, micro, future",
        "A, micro, future, B",
        "A, B, future, micro",
        "micro, A, B, future",
      ],
      answer: 0,
      hint: "Nhớ thứ tự ưu tiên giữa mã đồng bộ, Microtask và Event queue.",
      rationale:
        'Microtask có độ ưu tiên cao hơn Event queue nhưng vẫn chạy sau mã đồng bộ đang thực thi: in "A", "B" (đồng bộ trước), rồi microtask "micro" chạy trước Future "future". Đáp án đúng: A, B, micro, future.',
    },
    {
      id: 39,
      question:
        "Given this Stream code:\nStream<int> countUp() async* {\n  for (int i = 1; i <= 3; i++) {\n    yield i;\n  }\n}\nvoid main() async {\n  await for (var value in countUp()) {\n    print(value);\n  }\n}\nWhat is printed?",
      options: [
        "1",
        "1 2 3 (each number on its own line)",
        "3 2 1",
        "Error because `async` is not allowed for a function returning a Stream",
      ],
      answer: 1,
      hint: "Nhớ cách vòng lặp `async`/`yield` sinh ra các giá trị của Stream.",
      rationale:
        "Vòng lặp `async`/`yield` sinh ra 1, 2, 3 theo thứ tự, mỗi số một dòng qua `await for`. A chỉ liệt kê một giá trị; C đảo ngược thứ tự; D sai vì Dart hỗ trợ đầy đủ `async`.",
    },
    {
      id: 40,
      question:
        "In Dart's try/catch, what does the `catch (e, s)` syntax allow a developer to do?",
      options: [
        "Catch two different exception types at once",
        "Catch the error object and its corresponding stack trace",
        "Catch errors on two different threads",
        "Only applicable to String-type errors",
      ],
      answer: 1,
      hint: "Nhớ ý nghĩa của cú pháp `catch (e, s)`.",
      rationale:
        "`catch (e, s)` bắt cả đối tượng lỗi và stack trace tương ứng. A, C, D mô tả sai chức năng cú pháp này.",
    },
    {
      id: 41,
      question:
        "Which statement is correct about the differences between `List`, `Set`, and `Map` in Dart?",
      options: [
        "List is unordered and disallows duplicates, Set is ordered, Map stores key-value pairs",
        "List is an ordered collection, Set is a collection of unique (unordered) elements, Map stores key-value pairs",
        "All three are the same data type, just different names",
        "Set is ordered and allows duplicates, List does not",
      ],
      answer: 1,
      hint: "Nhớ đặc điểm cơ bản của List, Set, Map trong Dart.",
      rationale:
        "List có thứ tự; Set là tập hợp các phần tử duy nhất (không thứ tự); Map lưu cặp key-value — định nghĩa chuẩn. A, C, D đều mô tả sai đặc điểm cơ bản.",
    },
    {
      id: 42,
      question:
        'Given this string interpolation code:\nString name = "FPT University";\nprint("Hello $name");\nprint("Length: ${name.length}");\nprint("Upper: ${name.toUpperCase()[0]}");\nWhat character does the third line print?',
      options: [
        "f",
        "F",
        "FPT",
        "Error because you cannot index directly into a function result inside string interpolation",
      ],
      answer: 1,
      hint: "Nhớ cách indexing trực tiếp vào kết quả hàm trong string interpolation.",
      rationale:
        "`name.toUpperCase()` = \"FPT UNIVERSITY\", index [0] = 'F'. A sai chữ hoa/thường; C không phải một ký tự đơn; D sai vì Dart cho phép index trực tiếp vào kết quả hàm trong string interpolation.",
    },
    {
      id: 43,
      question: "In Dart, what is the `Never` type used for?",
      options: [
        "A variable that is never assigned a value",
        "A function that never returns normally (always throws an exception or loops infinitely)",
        "A data type equivalent to `void`",
        "A type used for asynchronous functions",
      ],
      answer: 1,
      hint: "Nhớ kiểu `Never` được dùng cho hàm có đặc điểm gì.",
      rationale:
        "`Never` dùng cho các hàm không bao giờ trả về bình thường (luôn throw hoặc lặp vô hạn). A, C, D mô tả sai mục đích của kiểu Never.",
    },
    {
      id: 44,
      question: "In Dart, what is the role of the `main()` function?",
      options: [
        "It's a callback called last when the app closes",
        "It's the entry point of execution for every Dart program",
        "Only used in Flutter, not in pure Dart",
        "A function used to define classes",
      ],
      answer: 1,
      hint: "Nhớ vai trò của hàm `main()` trong một chương trình Dart.",
      rationale:
        "`main()` là điểm bắt đầu thực thi của mọi chương trình Dart. A, C, D mô tả sai vai trò của hàm main.",
    },
    {
      id: 45,
      question:
        "What is the difference between an arrow function (`=>`) and a function block (`{ return ...; }`) in Dart?",
      options: [
        "Arrow functions can only be used for async functions",
        "An arrow function is shorthand for a function with a single return expression, while a function block allows multiple statements",
        "The two syntaxes have completely different meanings regarding return type",
        "Arrow functions are not allowed to take parameters",
      ],
      answer: 1,
      hint: "Nhớ sự khác biệt giữa hàm mũi tên (`=>`) và hàm dạng block.",
      rationale:
        "Hàm mũi tên là cách viết tắt cho hàm chỉ có một biểu thức trả về, còn hàm dạng block cho phép nhiều câu lệnh. A, C, D không khớp với đặc điểm cú pháp này.",
    },
    {
      id: 46,
      question:
        'Consider this code, predict the result:\nFuture<String> fetchData() async {\n  await Future.delayed(Duration(seconds: 1));\n  return "Data loaded";\n}\nvoid main() {\n  print("Start");\n  fetchData().then((value) => print(value));\n  print("End");\n}\nWhat order is printed to console?',
      options: [
        "Start, Data loaded, End",
        "Start, End, Data loaded",
        "Data loaded, Start, End",
        'Start, End (never prints "Data loaded")',
      ],
      answer: 1,
      hint: "Nhớ điều gì xảy ra khi gọi hàm async mà không await trong main().",
      rationale:
        'Vì `fetchData()` không được await trong `main()`, nó không chặn các lệnh tiếp theo — `.then()` không đồng bộ, nên "Start", "End" in trước, sau 1 giây "Data loaded" mới in ra. A, C sai thứ tự; D sai vì "Data loaded" vẫn được in ra cuối cùng.',
    },
    {
      id: 47,
      question:
        "In Dart's switch-case, why is `break` (or `return`) usually needed after each case?",
      options: [
        "Because Dart auto falls-through like C if there's no break, which can accidentally execute the next case",
        "Because Dart requires this syntax to compile, unrelated to behavior",
        "Because break is used to exit the main function",
        "Dart doesn't support switch-case",
      ],
      answer: 0,
      hint: "Nhớ lý do cần `break` (hoặc `return`) sau mỗi case trong switch-case.",
      rationale:
        "Dart rơi xuyên (fall-through) như C nếu thiếu break, có thể vô tình thực thi case kế tiếp. B, C, D mô tả sai vai trò của break trong switch-case.",
    },
    {
      id: 48,
      question:
        "In `List<int> nums = [1,2,3]; for(var x in nums) print(x);`, what is the main purpose of using `var` instead of `int` for variable `x`?",
      options: [
        "`var` must be used because `int` would cause an error",
        "Type inference — Dart automatically infers the data type (int) based on the List's elements, keeping code concise while still being strongly typed",
        "`var` makes variable x fully dynamic with no type checking at all",
        "No difference at all, it's just a coding habit",
      ],
      answer: 1,
      hint: "Nhớ vai trò của `var` khi duyệt for-in trên một List đã có kiểu.",
      rationale:
        "`var` giúp Dart suy luận kiểu (int) từ các phần tử của List, giữ code ngắn gọn nhưng vẫn strongly typed. A sai vì int cũng hợp lệ; C sai vì var khác dynamic; D sai vì vẫn có sự khác biệt về suy luận kiểu dù kết quả runtime trông giống nhau.",
    },
    {
      id: 49,
      question:
        "According to the lecture, what common pitfall is emphasized for students new to Dart?",
      options: [
        "Forgetting to close a class's curly braces",
        "Ignoring null-safety warnings and improperly mixing synchronous/asynchronous code",
        "Using too many async functions causing incorrect parallel execution",
        "Being unable to create a String-type variable",
      ],
      answer: 1,
      hint: "Nhớ những lỗi phổ biến được nhấn mạnh cho người mới học Dart.",
      rationale:
        "Các lỗi phổ biến được nêu: bỏ qua cảnh báo null-safety và trộn lẫn không đúng cách code đồng bộ/bất đồng bộ. A, C, D không phải nội dung được nhấn mạnh trong bài giảng.",
    },
    {
      id: 50,
      question:
        'Consider the Student class and mini-lab:\nclass Student {\n  String name;\n  Student(this.name);\n}\nvoid main() async {\n  var list = [Student("An"), Student("Binh")];\n  await Future.delayed(Duration(seconds: 1));\n  list.forEach((s) => print(s.name));\n}\nIf the `await` keyword before `Future.delayed(...)` is removed, what happens?',
      options: [
        "The program will show a compile error due to missing await",
        '`forEach` still prints student names in the correct order but may run before the 1-second delay finishes (since it no longer waits for the Future to complete), because `Future.delayed` without await is merely "started" without blocking execution',
        "The program will crash because the Future is unhandled",
        "The student list order will be reversed",
      ],
      answer: 1,
      hint: "Nhớ điều gì xảy ra khi bỏ `await` trước `Future.delayed`.",
      rationale:
        'Không await `Future.delayed` khiến `main()` tiếp tục thực thi các câu lệnh sau mà không chờ đủ 1 giây — dù `forEach` vẫn thực thi tên đúng thứ tự, nó có thể chạy trước khi "delay" hoàn tất (không có ảnh hưởng thực tế ở đây vì không có gì phụ thuộc vào delay). A sai vì không phải lỗi biên dịch; C sai vì không crash; D sai vì thứ tự tên vẫn được giữ nguyên.',
    },
    {
      id: 51,
      question: "What characterizes an abstract class in Dart?",
      options: [
        "It cannot have any methods with a body",
        "It defines structure without full behavior, forcing subclasses to implement the bodiless methods",
        "Only usable inside the Flutter Framework, not in pure Dart",
        "Can be instantiated directly with the `new` keyword",
      ],
      answer: 1,
      hint: "Nhớ đặc điểm của abstract class trong Dart.",
      rationale:
        "Abstract class định nghĩa cấu trúc mà không có đầy đủ hành vi, buộc lớp con phải implement các phương thức không có thân hàm. A sai vì abstract class có thể có phương thức có thân hàm; C sai vì hoạt động cả trong Dart thuần; D sai vì abstract class không thể khởi tạo trực tiếp.",
    },
    {
      id: 52,
      question:
        "In Flutter, `State<T>` is a textbook example of which concept from Module 3?",
      options: [
        "Mixin",
        "Abstract class — forcing StatefulWidgets to override methods to define behavior",
        "Generic Constraint",
        "Factory Constructor",
      ],
      answer: 1,
      hint: "Nhớ State<T> là ví dụ của khái niệm nào trong Module 3.",
      rationale:
        "`State<T>` là một abstract class, buộc StatefulWidget phải override phương thức để định nghĩa hành vi. A, C, D mô tả sai bản chất của State<T>.",
    },
    {
      id: 53,
      question:
        "Given the comparison table of `extends`, `implements`, `with`, which best describes `implements`?",
      options: [
        "Inherits all available behavior from the parent class",
        'Only inherits the "signature" of the class/interface, forcing you to rewrite all custom behavior — used to define a contract',
        "Used to share reusable code blocks without an inheritance relationship",
        "Not supported by Dart, only exists in Java",
      ],
      answer: 1,
      hint: "Nhớ bảng so sánh `extends`, `implements`, `with` để phân biệt `implements`.",
      rationale:
        "`implements` chỉ lấy 'chữ ký' (signature) của lớp/interface, buộc phải viết lại toàn bộ hành vi tùy chỉnh — dùng để định nghĩa một hợp đồng (contract). A mô tả `extends`; C mô tả `mixin`; D sai vì Dart hỗ trợ đầy đủ implements.",
    },
    {
      id: 54,
      question:
        'Given this code, predict the result of calling `Eagle().fly()`:\nclass Bird {\n  void fly() => print("Bird flying");\n}\nclass Eagle implements Bird {\n  @override\n  void fly() => print("Eagle gliding");\n}',
      options: [
        '"Bird flying" because implements also inherits the method body',
        '"Eagle gliding" — because implements only takes the interface (signature), Eagle must redefine fly() entirely itself',
        "Compile error because Eagle has not defined a constructor",
        'Both "Bird flying" and "Eagle gliding" are printed',
      ],
      answer: 1,
      hint: "Nhớ đặc điểm của `implements` khi không kế thừa thân hàm.",
      rationale:
        'Vì `implements` chỉ lấy signature, Eagle phải tự định nghĩa lại toàn bộ fly() → in ra "Eagle gliding". A sai vì implements không kế thừa thân hàm; C sai vì không cần constructor ở đây; D sai vì chỉ một phương thức được gọi.',
    },
    {
      id: 55,
      question: "What is a mixin used for in Dart?",
      options: [
        "Fully replaces constructors",
        "Sharing behavior across multiple classes without a traditional inheritance chain",
        "Used exclusively for JSON handling",
        "A special kind of variable in Dart",
      ],
      answer: 1,
      hint: "Nhớ mục đích sử dụng của mixin trong Dart.",
      rationale:
        "Mixin dùng để chia sẻ hành vi giữa nhiều lớp mà không cần chuỗi kế thừa truyền thống. A, C, D mô tả sai mục đích của mixin.",
    },
    {
      id: 56,
      question:
        'Consider this constrained mixin code:\nclass Pet {\n  String name;\n  Pet(this.name);\n}\nmixin CanBark on Pet {\n  void bark() => print("$name says woof!");\n}\nclass Dog extends Pet with CanBark {\n  Dog() : super("Buddy");\n}\nclass Fish {\n  // want to apply "with CanBark" here\n}\nIf class `Fish` (not extending `Pet`) tries to declare `class Fish with CanBark {}`, what happens?',
      options: [
        "Compiles successfully, Fish will have a working bark() method",
        "Compile error, because mixin `CanBark` is constrained `on Pet`, only classes extending Pet can apply this mixin",
        "Compiles but throws a runtime error when calling bark()",
        "Dart will automatically make Fish implicitly extend Pet",
      ],
      answer: 1,
      hint: "Nhớ ý nghĩa của ràng buộc `on Pet` trong khai báo mixin.",
      rationale:
        "Mixin `CanBark on Pet` bị ràng buộc chỉ áp dụng được cho các lớp kế thừa Pet; vì Fish không kế thừa Pet nên biên dịch lỗi. A, C, D không khớp với cách ràng buộc mixin hoạt động.",
    },
    {
      id: 57,
      question:
        "How does a factory constructor differ from a regular constructor in Dart?",
      options: [
        "A factory constructor always creates a completely new object, with no exceptions",
        "A factory constructor allows control over instance creation — it can return an existing instance (cache/singleton) or parse data (JSON) instead of always returning a new object",
        "A factory constructor cannot be named",
        "A factory constructor can only be used with an abstract class",
      ],
      answer: 1,
      hint: "Nhớ sự khác biệt giữa factory constructor và constructor thông thường.",
      rationale:
        "Factory constructor kiểm soát việc tạo instance — có thể trả về instance đã tồn tại hoặc parse dữ liệu, thay vì luôn tạo mới. A sai vì đây chính xác là điểm khác biệt; C, D sai về cú pháp/phạm vi.",
    },
    {
      id: 58,
      question:
        "Given:\nclass User {\n  final String name;\n  factory User.fromJson(Map j) => User._(j['name']);\n  User._(this.name);\n}\nWhy is the `User._` constructor made private (with `_`)?",
      options: [
        "Because Dart requires every factory constructor to have an accompanying private constructor",
        "To prevent code outside the class from directly calling the regular constructor, forcing usage through `User.fromJson` — controlling how objects are created",
        "Because `_` is a required naming convention for JSON parsing",
        "No particular reason, just a coding style choice",
      ],
      answer: 1,
      hint: "Nhớ lý do dùng constructor private (`_`) trong factory pattern.",
      rationale:
        "Đặt constructor ở chế độ private ngăn code bên ngoài gọi trực tiếp constructor thường, buộc phải dùng qua `fromJson` — kiểm soát cách tạo object. A, C, D không phải lý do chính xác trong factory pattern này.",
    },
    {
      id: 59,
      question:
        "What is the main benefit that generics (`List<T>`, `Future<T>`, `Map<K,V>`) bring in Dart?",
      options: [
        "Makes the program run faster on the CPU",
        "Ensures compile-time type safety, avoiding errors from misusing the dynamic type",
        "Allows completely skipping data type declarations",
        "Only works with primitive types (int, double)",
      ],
      answer: 1,
      hint: "Nhớ lợi ích chính mà generics mang lại trong Dart.",
      rationale:
        "Generics đảm bảo an toàn kiểu tại compile-time, tránh lỗi do lạm dụng kiểu dynamic. A, C, D mô tả sai lợi ích cốt lõi của generics.",
    },
    {
      id: 60,
      question:
        'Given this generic class code:\nclass Box<T> {\n  T value;\n  Box(this.value);\n  void show() => print("Value = $value");\n}\nvoid main() => Box<int>(10).show();\nIf `Box<int>(10)` is replaced with `Box<String>(10)`, what happens?',
      options: [
        'Runs normally, prints "Value = 10"',
        "Compile error because 10 is not a String, violating the generic type constraint",
        'Dart automatically converts 10 to "10"',
        "The program throws a runtime exception but still compiles",
      ],
      answer: 1,
      hint: "Nhớ hệ quả khi truyền sai kiểu dữ liệu vào lớp generic.",
      rationale:
        "`Box<String>(10)` biên dịch lỗi vì 10 (int) không khớp với kiểu String đã khai báo, vi phạm kiểm tra kiểu generic nghiêm ngặt. A, C, D không khớp với cách Dart kiểm tra kiểu generic chặt chẽ.",
    },
    {
      id: 61,
      question:
        'Given this generic constraint:\nabstract class Animal { String sound(); }\nclass Cat extends Animal { sound() => "Meow"; }\nclass Box<T extends Animal> {\n  T pet;\n  Box(this.pet);\n  void play() => print(pet.sound());\n}\nWhat does the `<T extends Animal>` syntax mean?',
      options: [
        "Box can only hold the exact Animal type, no subclasses accepted",
        "Restricts the generic type T to be Animal or a subclass of Animal, guaranteeing T always has a sound() method",
        "This is invalid syntax, Dart doesn't support generic constraints",
        "`extends` here means Box inherits from Animal",
      ],
      answer: 1,
      hint: "Nhớ ý nghĩa cú pháp `<T extends Animal>` trong ràng buộc generic.",
      rationale:
        "`<T extends Animal>` giới hạn kiểu generic T là Animal hoặc lớp con của Animal, đảm bảo T luôn có phương thức sound(). A sai vì lớp con vẫn được chấp nhận; C sai vì đây là cú pháp hợp lệ; D nhầm lẫn `extends` của ràng buộc generic với kế thừa lớp.",
    },
    {
      id: 62,
      question:
        "What does collection-if / collection-for syntax allow in Dart?",
      options: [
        "Only usable in a regular for loop, not in a List declaration",
        "Flexibly building a List/Set/Map by inserting conditional elements (`if`) or generating elements from a loop (`for`) directly inside the collection declaration",
        "Fully replaces the `var` keyword",
        "Only applies to Map, not to List",
      ],
      answer: 1,
      hint: "Nhớ cú pháp collection-if/collection-for cho phép làm gì khi khai báo collection.",
      rationale:
        "Collection-if/for cho phép xây dựng collection linh hoạt bằng cách chèn phần tử có điều kiện hoặc sinh phần tử từ vòng lặp ngay trong khai báo. A, C, D mô tả sai phạm vi áp dụng.",
    },
    {
      id: 63,
      question:
        "Given:\nvar base = [1, 2, 3];\nvar list = [\n  ...base,\n  if (true) 99,\n  for (var x in base) x * 10\n];\nprint(list);\nWhat is printed?",
      options: [
        "[1, 2, 3, 99, 10, 20, 30]",
        "[1, 2, 3, 10, 20, 30, 99]",
        "[99, 1, 2, 3, 10, 20, 30]",
        "Compile error because you cannot mix spread, if, and for in the same List",
      ],
      answer: 0,
      hint: "Nhớ cách kết hợp spread, if và for trong một khai báo List.",
      rationale:
        "`[...base, if(true) 99, for(x in base) x*10]` = [1,2,3, 99, 10,20,30]. B, C sai thứ tự; D sai vì Dart cho phép kết hợp các cú pháp này.",
    },
    {
      id: 64,
      question:
        "What benefit does a Custom Exception in Dart (e.g. `class LoginException implements Exception`) offer over throwing an ordinary error string?",
      options: [
        "No benefit, it just adds code complexity",
        "Provides specific business-domain error context, making it easier to debug and handle logic at the UI/Repository layer",
        "Custom Exceptions run faster than plain Strings",
        "Custom Exceptions can only be used with external APIs, not internally",
      ],
      answer: 1,
      hint: "Nhớ lợi ích của Custom Exception so với việc throw một chuỗi lỗi thông thường.",
      rationale:
        "Custom Exception cung cấp ngữ cảnh lỗi cụ thể theo nghiệp vụ, giúp dễ debug và xử lý logic ở tầng UI/Repository. A, C, D không khớp với lợi ích thực sự được nêu.",
    },
    {
      id: 65,
      question:
        "In Dart, which queue has HIGHER priority between the Microtask queue and the Event queue?",
      options: [
        "The Event queue has higher priority, always running before the Microtask queue",
        "The Microtask queue has higher priority — all microtasks run before Dart continues processing the Event queue (Futures, timers, UI events)",
        "Both run in parallel, with no priority order",
        "Priority depends on the declaration order in the code, not fixed",
      ],
      answer: 1,
      hint: "Nhớ hàng đợi nào có độ ưu tiên cao hơn giữa Microtask và Event queue.",
      rationale:
        "Microtask queue có độ ưu tiên cao hơn — tất cả microtask chạy trước khi Dart tiếp tục xử lý Event queue (Future, timer, sự kiện UI). A đảo ngược điều này; C, D không khớp với cơ chế event loop của Dart.",
    },
    {
      id: 66,
      question:
        "Given this Future chaining code:\nFuture(() => 1)\n  .then((v) => v + 1)\n  .then((v) => print(v));\nWhat value is printed?",
      options: ["1", "2", "0", "Nothing is printed because await is missing"],
      answer: 1,
      hint: "Nhớ cách tính giá trị qua chuỗi `.then()` liên tiếp.",
      rationale:
        "`Future(()=>1).then((v)=>v+1).then((v)=>print(v))` → 1+1 = 2, in ra 2. A, C sai giá trị; D sai vì code vẫn thực thi dù không có await tường minh ở main.",
    },
    {
      id: 67,
      question:
        "Comparing Future chaining (`.then()`) with `async/await`, which statement is most accurate?",
      options: [
        "`.then()` and `async/await` are entirely incompatible, cannot be used together in a project",
        "`.then()` suits simple async chains without needing intermediate variables; `async/await` makes async code read linearly, easier to follow when there are multiple dependent steps",
        "`async/await` runs fully synchronously, no longer asynchronous",
        "`.then()` is always faster than `async/await` in terms of performance",
      ],
      answer: 1,
      hint: "Nhớ so sánh giữa `.then()` và `async/await`.",
      rationale:
        "`.then()` phù hợp cho chuỗi bất đồng bộ đơn giản không cần biến trung gian; `async/await` giúp code đọc tuyến tính, dễ theo dõi khi có nhiều bước phụ thuộc nhau. A sai vì chúng có thể dùng cùng nhau; C sai vì async/await vẫn là bất đồng bộ; D không có cơ sở về hiệu năng tuyệt đối.",
    },
    {
      id: 68,
      question:
        "How does `StreamController.broadcast()` differ from the default single-subscription Stream?",
      options: [
        "Broadcast only allows exactly one listener",
        "Broadcast allows multiple listeners to listen simultaneously and receive shared events, while single-subscription only allows one listener, consuming sequentially",
        "No real difference, just a different name",
        "Broadcast only works with String data types",
      ],
      answer: 1,
      hint: "Nhớ sự khác biệt giữa broadcast Stream và single-subscription Stream.",
      rationale:
        "Broadcast cho phép nhiều listener nghe đồng thời và nhận sự kiện chia sẻ, còn single-subscription chỉ cho phép một listener. A đảo ngược điều này; C, D không khớp với đặc điểm thực sự của hai loại Stream.",
    },
    {
      id: 69,
      question:
        'Given this StreamController.broadcast() code:\nvar c = StreamController<int>.broadcast();\nc.stream.listen((v) => print("A:$v"));\nc.stream.listen((v) => print("B:$v"));\nc..add(1)..add(2);\nWhat is printed, in order?',
      options: [
        "A:1, A:2, B:1, B:2",
        "A:1, B:1, A:2, B:2",
        "Only A:1, A:2 are printed because listener B doesn't work",
        "Error because StreamController.broadcast() doesn't support multiple listeners",
      ],
      answer: 1,
      hint: "Nhớ thứ tự các listener nhận sự kiện khi dùng broadcast Stream.",
      rationale:
        "Với `c..add(1)..add(2)`, mỗi lần add sẽ kích hoạt cả hai listener A và B trước khi add tiếp theo: A:1, B:1, A:2, B:2. A sai thứ tự nhóm; C sai vì cả hai listener đều hoạt động; D sai vì broadcast hỗ trợ đầy đủ nhiều listener.",
    },
    {
      id: 70,
      question:
        "What is the main purpose behind introducing the Repository Pattern in Module 3?",
      options: [
        "Fully replaces Widgets in Flutter",
        "Separates data-fetching logic from the presentation/UI layer, making code easier to test and maintain, and forming the foundation for Bloc/Provider/Riverpod",
        "Only used for apps with no UI",
        "A replacement for SQLite",
      ],
      answer: 1,
      hint: "Nhớ mục đích chính của Repository Pattern được giới thiệu ở Module 3.",
      rationale:
        "Repository Pattern tách logic lấy dữ liệu khỏi tầng presentation/UI, giúp code dễ test và bảo trì hơn, đồng thời là nền tảng cho Bloc/Provider/Riverpod. A, C, D mô tả sai mục đích của nó.",
    },
    {
      id: 71,
      question:
        "Given this repository code using a Stream:\nStream<int> counter() async* {\n  for (int i = 1; i <= 3; i++) {\n    await Future.delayed(Duration(milliseconds: 300));\n    yield i;\n  }\n}\nWhen this Stream is bound to `StreamBuilder(stream: repo.counter(), ...)`, how will the UI behave?",
      options: [
        "The UI only builds once, after the entire loop finishes",
        "The UI automatically rebuilds each time a new value is `yield`-ed, creating a real-time update effect",
        "StreamBuilder doesn't support Streams generated from `async`",
        "The app will freeze (block the UI thread) for a full 900ms",
      ],
      answer: 1,
      hint: "Nhớ cách UI phản ứng khi Stream được bind vào StreamBuilder.",
      rationale:
        "UI tự động rebuild mỗi khi có giá trị mới được `yield`, tạo hiệu ứng cập nhật thời gian thực. A sai vì StreamBuilder rebuild theo từng sự kiện; C sai vì StreamBuilder hỗ trợ đầy đủ async*; D sai vì delay không chặn toàn bộ UI thread nhờ cơ chế bất đồng bộ.",
    },
    {
      id: 72,
      question:
        'According to the "Performance Best Practices" section of Module 3, which practice is NOT recommended?',
      options: [
        "Using const widgets to reduce rebuild cost",
        "Running a heavy loop directly on the main isolate while building the UI",
        "Using async functions for I/O operations",
        "Using Isolates for heavy CPU tasks",
      ],
      answer: 1,
      hint: "Nhớ thực hành nào KHÔNG được khuyến nghị trong phần 'Performance Best Practices'.",
      rationale:
        "Chạy một vòng lặp nặng trực tiếp trên main isolate trong khi build UI là thực hành KHÔNG nên làm (ngược với best practice). A, C, D đều là các thực hành được khuyến nghị.",
    },
    {
      id: 73,
      question:
        "In Dart, what is the core difference between an `abstract class` and an `implicit interface` (every class automatically has an interface)?",
      options: [
        "No difference, the two concepts are the same",
        "An abstract class can contain both bodied and bodiless methods and cannot be instantiated directly; while any regular class automatically defines an implicit interface that other classes can `implements`",
        "Interfaces only exist in Java, Dart has no such concept",
        "Abstract classes are always faster than interfaces at runtime",
      ],
      answer: 1,
      hint: "Nhớ sự khác biệt cốt lõi giữa abstract class và implicit interface trong Dart.",
      rationale:
        "Abstract class có thể chứa cả phương thức có thân và không thân hàm, không thể khởi tạo trực tiếp; trong khi mọi lớp thông thường tự động có một implicit interface mà lớp khác có thể `implements`. A sai vì có sự khác biệt rõ ràng; C sai vì Dart có khái niệm này qua implicit interface; D không có cơ sở về hiệu năng runtime tuyệt đối.",
    },
    {
      id: 74,
      question:
        "In the example `AnimationController implements Listenable` mentioned in the lecture, what does using `implements` instead of `extends` demonstrate?",
      options: [
        "AnimationController copies all of Listenable's existing code",
        "AnimationController only follows Listenable's contract and implements its own behavior, without inheriting existing implementation",
        "AnimationController and Listenable are unrelated to each other",
        "This is a syntax error, `extends` must be used",
      ],
      answer: 1,
      hint: "Nhớ ý nghĩa của việc dùng `implements` thay vì `extends` trong ví dụ AnimationController.",
      rationale:
        "`implements` nghĩa là AnimationController chỉ tuân theo hợp đồng (contract) của Listenable và tự triển khai hành vi riêng, không kế thừa cài đặt có sẵn. A sai vì implements không sao chép code; C sai vì có mối quan hệ rõ ràng qua implements; D sai vì đây là cú pháp Dart hợp lệ.",
    },
    {
      id: 75,
      question:
        'A student writes this Repository:\nclass Repo {\n  Future<String> getUser() async {\n    await Future.delayed(Duration(milliseconds: 300));\n    return "Anna";\n  }\n}\nand calls `var name = repo.getUser();` (without using `await`). What type and value will variable `name` have at the moment of assignment?',
      options: [
        'Type String, value "Anna" immediately',
        'Type Future<String>, a Future object still "pending" completion, not yet the actual String value',
        "Type dynamic, value null",
        "Compile error due to missing await",
      ],
      answer: 1,
      hint: "Nhớ kiểu dữ liệu của một hàm async khi gọi mà không await.",
      rationale:
        'Không await, `name` có kiểu `Future<String>` — một đối tượng Future đang "pending", chưa phải giá trị String thực sự. A, C, D không khớp với hành vi của Future trong Dart.',
    },
    {
      id: 76,
      question:
        'In Flutter, which widget acts as the "backbone" of a Material screen, providing AppBar, body, and FloatingActionButton?',
      options: ["Container", "Scaffold", "MaterialApp", "Column"],
      answer: 1,
      hint: "Nhớ widget nào là 'xương sống' của một màn hình Material.",
      rationale:
        "Scaffold là xương sống của một màn hình Material, cung cấp AppBar/body/FAB. A, C, D không mô tả đúng vai trò cấu trúc này.",
    },
    {
      id: 77,
      question:
        "A student places a `ListView` directly inside a `Column` without wrapping it in `Expanded` or `Flexible`. What common error occurs?",
      options: [
        "The app runs completely normally, no issues",
        'A "RenderFlex overflow" error or unbounded height constraint error, because both Column and ListView try to claim unlimited space along the main axis',
        "The ListView automatically shrinks to exactly 1 item",
        "The Column is completely hidden from the screen",
      ],
      answer: 1,
      hint: "Nhớ lỗi thường gặp khi đặt ListView trực tiếp trong Column.",
      rationale:
        "Đặt ListView trong Column mà không bọc Expanded/Flexible gây lỗi chiều cao không giới hạn (overflow). A sai vì đây chính xác là lỗi phổ biến; C, D không khớp với hành vi thực tế của Flutter.",
    },
    {
      id: 78,
      question:
        "In RadioListTile, what is the role of the `groupValue` property?",
      options: [
        "Determines that particular radio button's own value",
        "Holds the currently selected value for the entire group of RadioListTiles, used to compare against each item's `value` to determine selected state",
        "Has no effect, purely decorative",
        "Used to set the background color of RadioListTile",
      ],
      answer: 1,
      hint: "Nhớ vai trò của thuộc tính `groupValue` trong RadioListTile.",
      rationale:
        "`groupValue` lưu giá trị hiện đang được chọn của cả nhóm RadioListTile, dùng để so sánh với `value` của từng item. A, C, D mô tả sai chức năng này.",
    },
    {
      id: 79,
      question:
        "Given:\nclass _RadioScreenState extends State<RadioScreen> {\n  String? quality = 'HD';\n  @override\n  Widget build(BuildContext context) {\n    return Column(children: [\n      RadioListTile<String>(\n        title: const Text('SD'), value: 'SD',\n        groupValue: quality,\n        onChanged: (v) => setState(() => quality = v),\n      ),\n      RadioListTile<String>(\n        title: const Text('HD'), value: 'HD',\n        groupValue: quality,\n        onChanged: (v) => setState(() => quality = v),\n      ),\n    ]);\n  }\n}\nIf `setState()` is removed from `onChanged` (keeping only `quality = v`), what happens when the user taps 'SD'?",
      options: [
        "Variable `quality` is still updated to 'SD' but the UI doesn't rebuild to reflect the change, the radio still displays as before",
        "The app throws a runtime error immediately",
        "The radio button automatically rebuilds because Flutter always tracks every variable in State",
        "The value of quality won't change because setState is missing",
      ],
      answer: 0,
      hint: "Nhớ điều gì xảy ra khi bỏ `setState()` trong onChanged.",
      rationale:
        "Không có setState, `quality` vẫn được cập nhật trong bộ nhớ nhưng Flutter không biết để rebuild — giao diện không thay đổi. B sai vì không có lỗi runtime; C sai vì Flutter không tự động theo dõi mọi biến trong State; D sai vì quality vẫn thay đổi, chỉ có UI không cập nhật.",
    },
    {
      id: 80,
      question:
        "What is the difference between `Slider` and `Switch` in Flutter?",
      options: [
        "Slider selects a continuous value within a range, Switch only toggles a boolean value",
        "Both are used for boolean values",
        "Switch is for real numbers, Slider is for boolean",
        "No functional difference",
      ],
      answer: 0,
      hint: "Nhớ sự khác biệt giữa Slider và Switch.",
      rationale:
        "Slider chọn giá trị liên tục trong một khoảng, Switch chỉ bật/tắt giá trị boolean. B, C, D mô tả sai hoặc đảo ngược chức năng hai widget.",
    },
    {
      id: 81,
      question: "What does `ThemeMode.system` mean in `MaterialApp`?",
      options: [
        "Forces the app to always use the light theme",
        "Forces the app to always use the dark theme",
        "The app automatically follows the device's OS-level light/dark appearance setting",
        "Has no effect if darkTheme isn't declared",
      ],
      answer: 2,
      hint: "ThemeMode.system tự theo hệ điều hành.",
      rationale:
        'ThemeMode.system làm app tự động theo cài đặt sáng/tối của hệ điều hành thiết bị. A, B cố định một mode, mâu thuẫn với "system"; D sai vì themeMode vẫn có ý nghĩa nhưng cần darkTheme để có hiệu ứng đầy đủ.',
    },
    {
      id: 82,
      question:
        "Given theme/darkTheme/themeMode.dark setup, what is the correct syntax to access the current theme's style (e.g. `titleLarge`)?",
      options: [
        "ThemeData.of(context).textTheme.titleLarge",
        "Theme.of(context).textTheme.titleLarge",
        "context.theme.titleLarge",
        "MaterialApp.theme(context).titleLarge",
      ],
      answer: 1,
      hint: "Cú pháp truy cập Theme trong Flutter.",
      rationale:
        "Theme.of(context).textTheme.titleLarge là cú pháp đúng để truy cập theme hiện tại. A, C, D không phải API hợp lệ của Flutter.",
    },
    {
      id: 83,
      question: "How does `ListView.separated` differ from `ListView.builder`?",
      options: [
        "ListView.separated doesn't support itemBuilder",
        "ListView.separated allows inserting a separator widget between items via separatorBuilder, which ListView.builder lacks",
        "ListView.builder only displays up to 10 items",
        "The two are entirely identical in API",
      ],
      answer: 1,
      hint: "separatorBuilder là điểm khác biệt.",
      rationale:
        "ListView.separated cho phép chèn separator giữa các item qua separatorBuilder, điều mà ListView.builder không có. A sai vì vẫn có itemBuilder; C sai vì không có giới hạn 10 item; D sai vì hai API khác nhau.",
    },
    {
      id: 84,
      question:
        "In `m['title']!`, what does the `!` mean in the context of Dart's null-safety?",
      options: [
        "Logical negation (NOT) operator",
        'The "null assertion" operator — asserting to the compiler that the value is definitely non-null; if wrong, it throws a runtime error',
        "This operator is purely decorative, no effect on logic",
        "Converts a String type to int",
      ],
      answer: 1,
      hint: "! là null assertion operator.",
      rationale:
        "! là toán tử null assertion, khẳng định giá trị không null với compiler, sẽ throw runtime error nếu sai. A, C, D mô tả sai ý nghĩa của toán tử này trong null-safety.",
    },
    {
      id: 85,
      question:
        "In the showDatePicker example, what are the firstDate and lastDate parameters used for?",
      options: [
        "Determine the default current date",
        "Restrict the valid date range the user can select on the calendar",
        "No real effect, purely a required syntax parameter",
        "Determine the date display format (dd/mm/yyyy or mm/dd/yyyy)",
      ],
      answer: 1,
      hint: "firstDate/lastDate giới hạn khoảng ngày.",
      rationale:
        "firstDate/lastDate giới hạn khoảng ngày hợp lệ người dùng có thể chọn trên calendar. A, C, D mô tả sai chức năng hai tham số này.",
    },
    {
      id: 86,
      question:
        "Why is checking `if (date != null)` needed before calling setState after showDatePicker?",
      options: [
        "Because showDatePicker always returns null when working correctly",
        "Because the user might cancel/dismiss the date-picker dialog, in which case the Future returns null, and you shouldn't setState with an unwanted null value",
        "Because this is required Dart syntax for every async function",
        "Because DateTime is never allowed to be null in Flutter",
      ],
      answer: 1,
      hint: "Người dùng có thể hủy dialog.",
      rationale:
        "Cần kiểm tra null vì người dùng có thể hủy dialog, khiến Future trả về null, và không nên setState với giá trị null không mong muốn. A, C, D không đúng với lý do thực tế.",
    },
    {
      id: 87,
      question:
        "How does the Wrap widget differ from Row, and why does it suit a genre chip list?",
      options: [
        "Wrap is identical to Row, no difference",
        "Wrap automatically wraps child elements to a new line when there isn't enough horizontal space, avoiding the overflow error Row would encounter with too many elements",
        "Wrap only allows a maximum of 2 child elements",
        "Row auto-wraps but Wrap doesn't",
      ],
      answer: 1,
      hint: "Wrap tự xuống dòng khi hết chỗ.",
      rationale:
        "Wrap tự động xuống dòng khi hết không gian ngang, tránh lỗi overflow mà Row gặp phải khi có quá nhiều phần tử. A, C, D mô tả sai/đảo ngược đặc điểm hai widget.",
    },
    {
      id: 88,
      question:
        'What is the main benefit of extracting repeated UI into a separate function/widget like tile(), in the spirit of "Everything is a Widget"?',
      options: [
        "Makes Flutter run faster in absolute CPU terms",
        "Reuse and organize UI into blocks (LEGO blocks), making code more readable, maintainable, and consistent in spacing",
        "It's mandatory or Flutter will throw an error",
        "No real benefit, just a coding style",
      ],
      answer: 1,
      hint: "Tái sử dụng UI như LEGO block.",
      rationale:
        "Tách UI lặp lại thành hàm/widget riêng giúp tái sử dụng và tổ chức UI thành các block, làm code dễ đọc, dễ maintain và nhất quán về spacing hơn. A, C, D không đúng với lợi ích thực tế.",
    },
    {
      id: 89,
      question:
        "According to general recommendations, BottomNavigationBar best fits apps with how many main navigation tabs?",
      options: ["1 tab", "2-5 tabs", "10-15 tabs", "No limit on the number"],
      answer: 1,
      hint: "2-5 tab là phù hợp.",
      rationale:
        "BottomNavigationBar phù hợp nhất với 2-5 tab điều hướng chính theo khuyến nghị chung. A, C, D không đúng với số lượng khuyến nghị.",
    },
    {
      id: 90,
      question:
        "In the HomeTabs example, if index were not held inside a StatefulWidget (e.g. declared in a StatelessWidget), what would happen when the user taps a tab?",
      options: [
        "The app still works normally because StatelessWidget also supports setState",
        "setState cannot be called, and the UI cannot automatically update the corresponding screen when the user switches tabs, because StatelessWidget has no mechanism for mutable internal state",
        "The program will automatically switch to using InheritedWidget",
        "There's no difference between the two",
      ],
      answer: 1,
      hint: "StatelessWidget không có setState.",
      rationale:
        "StatelessWidget không có setState, nên không thể lưu và cập nhật state index khi người dùng chạm tab. A, C, D mô tả sai đặc điểm của StatelessWidget.",
    },
    {
      id: 91,
      question: "What is the difference between Image.network and Image.asset?",
      options: [
        "Image.network loads an image from an internet URL, Image.asset loads an image bundled within the project (declared in pubspec.yaml)",
        "Both only load images from local storage",
        "Image.asset only works on Web",
        "Image.network doesn't support BoxFit",
      ],
      answer: 0,
      hint: "network=URL, asset=trong project.",
      rationale:
        "Image.network load ảnh từ URL internet, Image.asset load ảnh đóng gói trong project (khai báo trong pubspec.yaml). B, C, D mô tả sai chức năng hai widget ảnh này.",
    },
    {
      id: 92,
      question:
        'In Module 4\'s "Common Errors & Fixes" list, what is the common cause of the UI "not updating" after data changes?',
      options: [
        "Network error",
        "Forgetting to call setState() after changing a variable's value in a StatefulWidget",
        "Missing Scaffold",
        "Incorrect import syntax",
      ],
      answer: 1,
      hint: "Quên gọi setState().",
      rationale:
        'Quên gọi setState() sau khi thay đổi giá trị biến trong StatefulWidget là nguyên nhân phổ biến khiến UI không cập nhật, theo checklist "Common Errors & Fixes". A, C, D không phải nguyên nhân được nêu trong bài giảng.',
    },
    {
      id: 93,
      question:
        "Why use ListView (instead of Column) as the root widget for an entire screen containing multiple sections?",
      options: [
        "Because ListView is mandatory inside every Scaffold",
        "Because ListView automatically allows scrolling when content exceeds screen height, while Column by default cannot scroll and easily causes overflow",
        "Because Column doesn't support padding",
        "No technical reason, it's a random choice",
      ],
      answer: 1,
      hint: "ListView tự scroll được.",
      rationale:
        "ListView tự động cho phép scroll khi nội dung vượt quá chiều cao màn hình, còn Column mặc định không scroll được và dễ gây overflow. A, C, D không đúng với lý do kỹ thuật thực tế.",
    },
    {
      id: 94,
      question:
        "According to the lecture, what are Material Icons in Flutter commonly used for?",
      options: [
        "Purely decorative, no function",
        "Navigation buttons, action buttons (add, delete), and status indicators",
        "Only used as a Scaffold background",
        "Completely replaces the Text widget",
      ],
      answer: 1,
      hint: "Icon dùng cho navigation/action/status.",
      rationale:
        "Material Icons dùng cho nút điều hướng, nút hành động, và chỉ báo trạng thái. A, C, D mô tả sai mục đích của chúng.",
    },
    {
      id: 95,
      question:
        "Comparing TimePicker and DatePicker for a booking flow combining both date and time, what is the correct approach per the lecture?",
      options: [
        "Only call one of the two, Flutter will automatically infer the other value",
        "Call two separate async functions sequentially (pickDate() and pickTime()), store the results in two separate State variables (DateTime? d, TimeOfDay? t), then display them combined in the UI",
        "Use a single built-in DateTimePicker widget in the Flutter SDK",
        "It's impossible to combine DatePicker and TimePicker on the same screen",
      ],
      answer: 1,
      hint: "Gọi 2 hàm async riêng biệt.",
      rationale:
        "Gọi hai hàm async riêng biệt pickDate() và pickTime(), lưu kết quả vào hai biến State riêng, rồi hiển thị kết hợp trên UI — đúng theo cách demo Booking đã dạy. A, C, D không phản ánh cách triển khai được dạy.",
    },
    {
      id: 96,
      question:
        'In VS Code, what does the "Wrap with Widget" feature support for a Flutter developer?',
      options: [
        "Automatically deploy the app to a store",
        "Quickly wrap a selected widget with another widget like Padding, Center, Expanded to refactor layout",
        "Automatically fix all syntax errors in the file",
        "Convert Dart to Kotlin",
      ],
      answer: 1,
      hint: "Bọc widget bằng Padding/Center/Expanded.",
      rationale:
        '"Wrap with Widget" giúp nhanh chóng bọc widget đã chọn bằng Padding/Center/Expanded để refactor layout. A, C, D không đúng với chức năng của feature này.',
    },
    {
      id: 97,
      question:
        "In a basic Scaffold example, where is floatingActionButton typically placed and what is it used for?",
      options: [
        "In the middle of the screen, as a background for the whole body",
        "Usually floats in the bottom-right corner of the screen, used for a prominent primary action (e.g. add new)",
        "Only displayed inside the AppBar",
        "No fixed position, always centered in the AppBar",
      ],
      answer: 1,
      hint: "Thường ở góc dưới phải.",
      rationale:
        "floatingActionButton thường nổi ở góc dưới phải màn hình, dùng cho một hành động chính nổi bật (ví dụ thêm mới). A, C, D mô tả sai vị trí/vai trò của nó.",
    },
    {
      id: 98,
      question:
        "What role does BuildContext context play when calling Theme.of(context)?",
      options: [
        "A parameter with no real effect, purely formal",
        "Represents the widget's position in the widget tree, allowing it to look up the nearest InheritedWidget data (like Theme) above it in the tree",
        "A global variable storing app state",
        "Only used to pass API data",
      ],
      answer: 1,
      hint: "BuildContext biểu diễn vị trí trong widget tree.",
      rationale:
        "BuildContext biểu diễn vị trí của widget trong widget tree, cho phép tìm kiếm InheritedWidget gần nhất (như Theme) phía trên nó. A, C, D mô tả sai vai trò của BuildContext.",
    },
    {
      id: 99,
      question:
        "According to Module 4, when should SingleChildScrollView or Flexible be used to fix overflow on small screens?",
      options: [
        "Never needed, Flutter automatically handles overflow",
        "When UI content exceeds the available screen size (especially on small screens), you need scrolling or flexible resizing to avoid layout overflow",
        "Only used for apps running on Desktop",
        "Only applicable to the Text widget",
      ],
      answer: 1,
      hint: "Dùng khi nội dung vượt kích thước màn hình.",
      rationale:
        "Dùng SingleChildScrollView/Flexible khi nội dung UI vượt quá kích thước màn hình khả dụng (đặc biệt màn hình nhỏ), cần scroll hoặc resize linh hoạt để tránh overflow. A sai vì Flutter không tự xử lý mọi trường hợp overflow; C, D giới hạn sai phạm vi sử dụng.",
    },
    {
      id: 100,
      question: "What is the correct way to call a SnackBar in Flutter?",
      options: [
        "Text(title).showSnackBar()",
        "ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(title)))",
        "Navigator.of(context).showSnackBar(title)",
        "SnackBar.show(context, title)",
      ],
      answer: 1,
      hint: "ScaffoldMessenger.of(context).showSnackBar(...).",
      rationale:
        "ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(title))) là cách gọi đúng. A, C, D không phải API hợp lệ trong Flutter.",
    },
    {
      id: 101,
      question: "In Flutter, what does Navigator.push() do?",
      options: [
        "Clears the entire navigation stack",
        "Adds (pushes) a new route/screen onto the top of the navigation stack",
        "Goes back to the previous screen",
        "Closes the app",
      ],
      answer: 1,
      hint: "push thêm route mới lên đỉnh stack.",
      rationale:
        "Navigator.push() thêm (push) một route/screen mới lên đỉnh của navigation stack. A, C, D mô tả sai chức năng của phương thức này.",
    },
    {
      id: 102,
      question: "What does the Navigator.pop(context) method do?",
      options: [
        "Pushes another new screen onto the stack",
        "Removes (pops) the screen currently at the top of the stack, revealing the screen below it",
        "Replaces the entire stack with a new route",
        "Restarts the app from scratch",
      ],
      answer: 1,
      hint: "pop gỡ route trên đỉnh stack.",
      rationale:
        "Navigator.pop(context) gỡ bỏ (pop) màn hình hiện đang ở đỉnh stack, hiển thị màn hình bên dưới nó. A, C, D mô tả sai hành vi này.",
    },
    {
      id: 103,
      question:
        "Why doesn't a plain Navigator.push code with SecondPage() run directly on DartPad?",
      options: [
        "DartPad doesn't support ElevatedButton",
        "Missing a complete program structure: DartPad requires main(), runApp(), and a root MaterialApp; providing only a lone widget like this without a valid Navigator context causes an error",
        "Navigator.push only works on real devices, not on DartPad",
        "MaterialPageRoute is an API that has been removed from Flutter",
      ],
      answer: 1,
      hint: "Thiếu main(), runApp(), MaterialApp.",
      rationale:
        "DartPad cần cấu trúc chương trình đầy đủ (main, runApp, MaterialApp); thiếu những thứ này hoặc class được tham chiếu chưa định nghĩa (như SecondPage) gây lỗi. A, C, D không đúng với giải thích của bài giảng.",
    },
    {
      id: 104,
      question:
        "What is the difference between Navigator.push() and Navigator.pushReplacement()?",
      options: [
        "No difference",
        "push() adds a new route on top of the current one (the old route stays in the stack), while pushReplacement() replaces the current route with a new one (the old route is removed from the stack)",
        "pushReplacement() can only be used with named routes",
        "push() doesn't allow going back with the back button",
      ],
      answer: 1,
      hint: "pushReplacement xóa route cũ.",
      rationale:
        "push() giữ route cũ trong stack, còn pushReplacement() xóa route cũ khi thêm route mới. A sai vì có sự khác biệt rõ; C, D không đúng đặc điểm kỹ thuật.",
    },
    {
      id: 105,
      question:
        "Why use Navigator.pushReplacementNamed(context, '/home') instead of pushNamed after a successful login?",
      options: [
        "pushReplacementNamed runs faster in terms of performance",
        "It prevents the user from pressing Back to return to the Login screen after successfully logging in, since the Login route has been removed from the stack",
        "pushNamed doesn't support passing parameters",
        "There's no real difference between the two calls",
      ],
      answer: 1,
      hint: "Ngăn Back về màn Login.",
      rationale:
        "pushReplacementNamed ngăn người dùng nhấn Back để quay lại Login vì route Login đã bị xóa khỏi stack. A, C, D không đúng lý do.",
    },
    {
      id: 106,
      question:
        "What benefit do Named Routes bring over calling MaterialPageRoute directly everywhere?",
      options: [
        "Named Routes run faster at runtime",
        "They increase readability and scalability in large apps, especially when parameters need to be passed or many screens need centralized management",
        "Named Routes are the only way Flutter supports navigation",
        "Named Routes only work with Navigator 2.0",
      ],
      answer: 1,
      hint: "Tăng khả năng đọc và mở rộng.",
      rationale:
        "Named Routes tăng khả năng đọc và mở rộng trong app lớn, đặc biệt khi cần truyền tham số hoặc quản lý tập trung nhiều màn hình. A, C, D không đúng với lợi ích thực tế.",
    },
    {
      id: 107,
      question:
        "What is the core difference between Navigator 1.0 and Navigator 2.0?",
      options: [
        "Navigator 1.0 uses a declarative model, Navigator 2.0 uses an imperative model",
        "Navigator 1.0 is imperative — manually calling push()/pop(); Navigator 2.0 is declarative — describing the desired stack state and letting the framework sync automatically",
        "Both are entirely identical, just different names across Flutter versions",
        "Navigator 2.0 doesn't support deep linking, only Navigator 1.0 does",
      ],
      answer: 1,
      hint: "1.0 imperative, 2.0 declarative.",
      rationale:
        "Navigator 1.0 là imperative (gọi push/pop thủ công); Navigator 2.0 là declarative (mô tả stack mong muốn, framework tự đồng bộ). A đảo ngược; C, D không đúng đặc điểm hai phiên bản.",
    },
    {
      id: 108,
      question:
        "What are the three main components in Navigator 2.0's architecture, as mentioned in the lecture?",
      options: [
        "Router, Controller, View",
        "RouterDelegate, RouteInformationParser, BackButtonDispatcher",
        "Navigator, Route, Stack",
        "Provider, Consumer, ChangeNotifier",
      ],
      answer: 1,
      hint: "RouterDelegate, RouteInformationParser, BackButtonDispatcher.",
      rationale:
        "Ba thành phần chính: RouterDelegate, RouteInformationParser, BackButtonDispatcher — đúng theo slide. A, C, D không đúng tên các thành phần này.",
    },
    {
      id: 109,
      question: "What does deep linking in Flutter allow?",
      options: [
        "Increases app build speed",
        "Lets the user open a specific screen in the app directly via a URL or external source (e.g. a web link or notification)",
        "Only applicable to apps running on Web",
        "A feature that fully replaces SharedPreferences",
      ],
      answer: 1,
      hint: "Mở màn hình cụ thể qua URL.",
      rationale:
        "Deep linking cho phép người dùng mở trực tiếp một màn hình cụ thể trong app qua URL hoặc nguồn bên ngoài (link web, notification). A, C, D mô tả sai mục đích của deep linking.",
    },
    {
      id: 110,
      question:
        "In an Android deep link intent-filter XML snippet, where does it belong and what does it mean?",
      options: [
        "In pubspec.yaml, used to declare a dependency",
        "In AndroidManifest.xml, declaring an intent-filter so the Android OS recognizes and routes links like movieapps://movies to the correct app",
        "In main.dart, used to define a Flutter route",
        "In Info.plist, only applicable to iOS",
      ],
      answer: 1,
      hint: "Khai báo trong AndroidManifest.xml.",
      rationale:
        "Đoạn này thuộc AndroidManifest.xml, khai báo intent-filter để Android OS nhận diện và định tuyến các link như movieapps://movies đến đúng app. A, C, D là vị trí file sai.",
    },
    {
      id: 111,
      question:
        "On iOS, to support a custom URL scheme (e.g. movieapps://), where does the configuration need to be added?",
      options: [
        "AndroidManifest.xml",
        "build.gradle",
        "Info.plist (add URL Types → URL Schemes)",
        "pubspec.yaml",
      ],
      answer: 2,
      hint: "Info.plist -> URL Types.",
      rationale:
        "Cấu hình custom URL scheme trên iOS nằm trong Info.plist (URL Types → URL Schemes). A, B, D không phải vị trí đúng.",
    },
    {
      id: 112,
      question:
        "What is the basic difference between StatelessWidget and StatefulWidget?",
      options: [
        "StatelessWidget can change its UI more flexibly than StatefulWidget",
        "StatelessWidget holds no mutable internal state and doesn't rebuild when internal data changes; StatefulWidget holds state (a State object) and can rebuild via setState()",
        "Only StatelessWidget has a build() method",
        "StatefulWidget is not allowed to contain child widgets",
      ],
      answer: 1,
      hint: "Stateful có State object và setState().",
      rationale:
        "StatelessWidget không có mutable state và không tự rebuild; StatefulWidget có State object và rebuild qua setState(). A, C, D mô tả sai đặc điểm cơ bản hai loại widget.",
    },
    {
      id: 113,
      question:
        "In the CounterPage example, if increment() only did count++; WITHOUT calling setState(), what happens?",
      options: [
        "count's value still correctly increases in memory, but Flutter won't know to rebuild the widget, so the UI's displayed count doesn't change",
        "The app throws an immediate compile error",
        "The UI still automatically updates because Flutter always tracks every variable in State",
        "The count value resets to 0 every time it rebuilds",
      ],
      answer: 0,
      hint: "Giá trị tăng nhưng UI không cập nhật.",
      rationale:
        "Không gọi setState, count vẫn tăng trong memory, nhưng Flutter không biết để rebuild — UI hiển thị giá trị không đổi. B sai vì không có lỗi compile; C sai vì Flutter không tự track mọi biến; D sai vì count không bị reset.",
    },
    {
      id: 114,
      question: 'What does "Lifting State Up" mean in Flutter?',
      options: [
        "Removing all state from the app",
        "Moving shared state up to a common ancestor widget so child widgets can access and sync data, reducing duplicated logic",
        "Moving all UI logic to the server side",
        "Only applicable when using Provider",
      ],
      answer: 1,
      hint: "Đưa state lên ancestor chung.",
      rationale:
        "Lifting State Up là đưa state chung lên widget ancestor chung để các widget con truy cập và đồng bộ dữ liệu, giảm logic trùng lặp. A, C, D mô tả sai khái niệm này.",
    },
    {
      id: 115,
      question:
        "In the AppData InheritedWidget example, what is its main purpose?",
      options: [
        "Only used to define navigation routes",
        "Efficiently passing data down to all child widgets in the widget tree without manually passing parameters through every intermediate constructor",
        "Fully replaces Scaffold",
        "Only used for storing offline data",
      ],
      answer: 1,
      hint: "Truyền dữ liệu xuống toàn bộ tree hiệu quả.",
      rationale:
        "InheritedWidget truyền dữ liệu xuống toàn bộ widget tree hiệu quả mà không cần truyền tham số qua từng constructor trung gian. A, C, D mô tả sai mục đích.",
    },
    {
      id: 116,
      question:
        "What foundation does Provider (ChangeNotifierProvider + Consumer) build on, and what benefit does it bring over plain InheritedWidget?",
      options: [
        "Built on SQLite, helps store offline data",
        "Built on top of InheritedWidget but reduces boilerplate code, making state sharing and listening much easier",
        "Unrelated to InheritedWidget at all",
        "Provider only works with the String data type",
      ],
      answer: 1,
      hint: "Provider xây trên InheritedWidget.",
      rationale:
        "Provider xây dựng trên InheritedWidget nhưng giảm boilerplate code, giúp chia sẻ và lắng nghe state dễ dàng hơn. A, C, D không đúng nền tảng kỹ thuật thực tế của Provider.",
    },
    {
      id: 117,
      question:
        "In CounterModel with ChangeNotifier, if notifyListeners() is removed from increment(), what happens?",
      options: [
        "The program shows a compile error",
        "count still increases in memory, but Consumer<CounterModel> widgets won't be notified to rebuild, so the UI doesn't show the new value",
        "notifyListeners() has no effect on the UI, it's just an internal log",
        "The app automatically calls notifyListeners() silently every second",
      ],
      answer: 1,
      hint: "Consumer không được thông báo rebuild.",
      rationale:
        "Không có notifyListeners(), count vẫn tăng trong memory nhưng widget Consumer không được thông báo để rebuild — UI không hiện giá trị mới. A, C, D mô tả sai hành vi này.",
    },
    {
      id: 118,
      question:
        "In code where appState.loggedIn determines the pushNamed route, what principle does this illustrate?",
      options: [
        "State is completely separate and unrelated to navigation",
        "App state determines the navigation flow — combining state management logic with the decision of which route to display",
        "This is incorrect code because if/else cannot be used with Navigator",
        "Only works when using Navigator 2.0",
      ],
      answer: 1,
      hint: "State quyết định luồng điều hướng.",
      rationale:
        "Đoạn code minh họa state của app quyết định luồng điều hướng — kết hợp logic quản lý state với quyết định hiển thị route nào. A, C, D mô tả sai ý nghĩa/tính hợp lệ của code.",
    },
    {
      id: 119,
      question:
        "In the Stateless/Stateful comparison table, which usage example fits StatelessWidget?",
      options: [
        "An input form with validation",
        "A counter that increases/decreases with user interaction",
        "A static logo, unchanging text",
        "A list where items can be added/removed",
      ],
      answer: 2,
      hint: "Logo tĩnh, text không đổi.",
      rationale:
        "Logo tĩnh/text không đổi phù hợp với StatelessWidget vì không cần rebuild. A, B, D đều cần StatefulWidget do có state thay đổi.",
    },
    {
      id: 120,
      question:
        "In Navigator 2.0, which component's role does the AppRouterDelegate build() code illustrate?",
      options: [
        "RouteInformationParser — responsible for parsing the URL",
        "RouterDelegate — responsible for building the current page stack (pages) and handling pop events, reflecting the desired navigation state",
        "BackButtonDispatcher — only handles the Android physical back button",
        "This is just a regular StatelessWidget unrelated to navigation",
      ],
      answer: 1,
      hint: "RouterDelegate xây dựng page stack.",
      rationale:
        "Đoạn code minh họa RouterDelegate — xây dựng page stack hiện tại và xử lý sự kiện pop. A, C, D gán sai vai trò cho thành phần khác của Navigator 2.0.",
    },
    {
      id: 121,
      question:
        "In the MovieDetailPage Hero Banner example (Stack with Image.network + Positioned gradient), why is Stack used instead of Column?",
      options: [
        "Because Stack runs faster than Column",
        "Because Stack allows child widgets to overlap at the same position, needed to place a gradient layer over the poster image",
        "Because Column doesn't support Image.network",
        "No difference, the two widgets are entirely equivalent",
      ],
      answer: 1,
      hint: "Stack cho phép các widget chồng lên nhau.",
      rationale:
        "Stack cho phép các widget con chồng lên nhau tại cùng vị trí, cần thiết để đặt lớp gradient lên trên ảnh poster. A, C, D không đúng lý do kỹ thuật của lựa chọn này.",
    },
    {
      id: 122,
      question: "What is the main purpose of onGenerateRoute in MaterialApp?",
      options: [
        "Only handles network errors",
        "Allows the app to parse the route name (and parameters) coming from an external link, then dynamically return the corresponding route/screen, commonly used to handle deep links",
        "Fully replaces Scaffold",
        "Only works when the app is offline",
      ],
      answer: 1,
      hint: "Parse route name từ deep link.",
      rationale:
        "onGenerateRoute cho phép app parse tên route (và tham số) từ link bên ngoài, rồi trả về route/screen tương ứng động, thường dùng để xử lý deep link. A, C, D mô tả sai mục đích.",
    },
    {
      id: 123,
      question: "What does the Route class in Flutter represent?",
      options: [
        "An API endpoint from a server",
        "A screen/page in the app, usually implemented via MaterialPageRoute",
        "A type of animation",
        "A JSON data structure",
      ],
      answer: 1,
      hint: "Route đại diện một màn hình.",
      rationale:
        "Route đại diện một screen/page trong app, thường triển khai qua MaterialPageRoute. A, C, D mô tả sai khái niệm Route.",
    },
    {
      id: 124,
      question:
        "Why is separating state (login/logout) into its own AppState class away from the UI considered good practice?",
      options: [
        "Because Flutter requires this to compile",
        "Because separation increases testability and clarifies the app's architecture; the UI only needs to listen for changes instead of managing business logic itself",
        "Because doing so makes the app run twice as fast",
        "No specific reason, just the instructor's personal preference",
      ],
      answer: 1,
      hint: "Tăng khả năng test và rõ ràng kiến trúc.",
      rationale:
        "Tách state khỏi UI tăng khả năng test và làm rõ kiến trúc app; UI chỉ cần lắng nghe thay đổi thay vì tự quản lý business logic. A, C, D không phải lý do đúng/hợp lệ.",
    },
    {
      id: 125,
      question:
        "According to Module 5's Summary, which state management techniques are covered, in order from basic to more advanced?",
      options: [
        "Provider → InheritedWidget → setState",
        "setState → InheritedWidget → Provider",
        "Only setState is covered, no other technique is mentioned",
        "BLoC → Riverpod → GetX",
      ],
      answer: 1,
      hint: "setState → InheritedWidget → Provider.",
      rationale:
        "Theo Summary, thứ tự từ cơ bản đến nâng cao là: setState → InheritedWidget → Provider. A đảo ngược thứ tự; C không đầy đủ; D không phải trọng tâm Module 5.",
    },
    {
      id: 126,
      question:
        'What is the core difference between "Responsive UI" and "Adaptive UI" per the lecture?',
      options: [
        "Responsive UI changes based on device type, Adaptive UI changes based on available space",
        "Responsive UI changes layout based on available space (e.g. Column → Row), while Adaptive UI changes based on device type (e.g. Bottom Nav → NavigationRail on tablet)",
        "The two concepts are identical, no real difference",
        "Adaptive UI only applies to Web apps",
      ],
      answer: 1,
      hint: "Responsive theo không gian, Adaptive theo thiết bị.",
      rationale:
        "Responsive UI thay đổi layout dựa trên không gian khả dụng, còn Adaptive UI thay đổi dựa trên loại thiết bị. A đảo ngược hai định nghĩa; C, D không đúng nội dung bài giảng.",
    },
    {
      id: 127,
      question:
        "What information does MediaQuery.of(context).size.width retrieve?",
      options: [
        "The width of the current widget itself",
        "The full width of the current device's screen",
        "The width of the virtual keyboard",
        "The number of child widgets in the tree",
      ],
      answer: 1,
      hint: "Chiều rộng toàn màn hình thiết bị.",
      rationale:
        "MediaQuery.of(context).size.width lấy chiều rộng toàn màn hình hiện tại của thiết bị. A, C, D mô tả sai phạm vi giá trị trả về.",
    },
    {
      id: 128,
      question:
        "When the device is rotated from portrait to landscape making width exceed 600px, what happens to a text depending on MediaQuery width?",
      options: [
        "Nothing changes because MediaQuery only reads the value once at app startup",
        'Flutter automatically rebuilds the widget when the screen size changes (e.g. due to rotation), so the text switches from "Mobile Layout" to "Tablet Layout"',
        "The app crashes because MediaQuery doesn't support screen rotation",
        "Only the Text is completely hidden until the app restarts",
      ],
      answer: 1,
      hint: "Flutter tự rebuild khi xoay màn hình.",
      rationale:
        'Flutter tự động rebuild widget khi kích thước màn hình thay đổi (ví dụ do xoay), nên text đổi từ "Mobile Layout" sang "Tablet Layout". A, C, D không đúng hành vi thực tế của MediaQuery/Flutter.',
    },
    {
      id: 129,
      question:
        "What is the core difference between LayoutBuilder and MediaQuery?",
      options: [
        "LayoutBuilder provides information about the direct parent widget's constraints, while MediaQuery provides the entire device screen's info",
        "Both are entirely identical in function",
        "LayoutBuilder only works on Web",
        "MediaQuery only provides the parent widget's constraints, not the full screen",
      ],
      answer: 0,
      hint: "LayoutBuilder = constraint cha, MediaQuery = toàn màn hình.",
      rationale:
        "LayoutBuilder cung cấp thông tin về constraint của widget cha trực tiếp, còn MediaQuery cung cấp thông tin toàn màn hình thiết bị. B, C, D đảo ngược/mô tả sai đặc điểm hai tool này.",
    },
    {
      id: 130,
      question:
        "If a LayoutBuilder is placed inside a Container with a fixed width of 300px (device screen 800px wide), which widget is displayed (maxWidth > 500 → WideCard)?",
      options: [
        "WideCard(), because the device screen is wider than 500px",
        "NarrowCard(), because c.maxWidth reflects the constraint from the direct parent widget (300px), not the full device screen",
        "Both widgets will be displayed at the same time",
        "This will cause an error because LayoutBuilder cannot be placed inside a fixed-size Container",
      ],
      answer: 1,
      hint: "c.maxWidth phản ánh constraint cha (300px).",
      rationale:
        "c.maxWidth phản ánh constraint của widget cha trực tiếp (300px), không phải toàn màn hình, nên NarrowCard() được hiển thị. A bỏ qua vai trò constraint cục bộ; C, D không đúng cách LayoutBuilder hoạt động.",
    },
    {
      id: 131,
      question: "What is OrientationBuilder used for?",
      options: [
        "Detecting device rotation (portrait/landscape) and changing the UI accordingly",
        "Only used to change the app's background color",
        "Checking the device's network connection",
        "Fully replaces MediaQuery in every case",
      ],
      answer: 0,
      hint: "Phát hiện xoay màn hình.",
      rationale:
        "OrientationBuilder phát hiện việc xoay thiết bị (portrait/landscape) và cho phép UI thay đổi tương ứng. B, C, D mô tả sai chức năng.",
    },
    {
      id: 132,
      question:
        'In the "Responsive Widgets Overview" list, which widget helps avoid overflow by letting a child take up the remaining space in a Row/Column?',
      options: ["Wrap", "Expanded", "AspectRatio", "FractionallySizedBox"],
      answer: 1,
      hint: "Expanded chiếm hết không gian còn lại.",
      rationale:
        "Expanded cho phép child chiếm hết không gian còn lại trong Row/Column, tránh overflow. A, C, D dùng cho mục đích khác, không phải chức năng này.",
    },
    {
      id: 133,
      question:
        "If width for GridView.count crossAxisCount is read ONCE in initState() instead of build() (from MediaQuery), what problem arises on screen rotation?",
      options: [
        "No problem at all because Flutter automatically syncs initState with build",
        "crossAxisCount won't be updated when the screen size changes (due to rotation), because initState only runs once when the widget is created, causing the layout to no longer reflect the current size",
        "GridView will automatically hide completely",
        "The app will show a compile error",
      ],
      answer: 1,
      hint: "initState chỉ chạy 1 lần.",
      rationale:
        "Đọc width chỉ một lần trong initState() khiến crossAxisCount không được cập nhật khi kích thước màn hình thay đổi (do xoay), vì initState chỉ chạy một lần khi widget được tạo. A, C, D không đúng hậu quả kỹ thuật thực tế.",
    },
    {
      id: 134,
      question:
        "What problem does SafeArea in Flutter solve on modern devices?",
      options: [
        "Increases the app's rendering speed",
        "Avoids UI content being obscured by unusable areas like notches, Dynamic Island, or curved screens",
        "Encrypts user data",
        "Automatically translates the UI language",
      ],
      answer: 1,
      hint: "Tránh bị che bởi notch/Dynamic Island.",
      rationale:
        "SafeArea tránh nội dung UI bị che bởi các vùng không dùng được như notch, Dynamic Island, hoặc màn hình cong. A, C, D mô tả sai mục đích của SafeArea.",
    },
    {
      id: 135,
      question:
        "A student forgets to wrap a search bar in SafeArea on a device with a notch. What is the most likely real-world consequence?",
      options: [
        "The app automatically crashes right at startup",
        "Part of the search bar's top area may be obscured or clipped by the notch/status bar, harming the user experience",
        "GridView automatically switches its layout to 2 columns",
        "No effect at all, SafeArea is purely cosmetic and unnecessary",
      ],
      answer: 1,
      hint: "Phần trên search bar có thể bị che.",
      rationale:
        "Thiếu SafeArea có thể khiến phần trên của search bar bị che/cắt bởi notch/status bar, ảnh hưởng đến UX. A, C, D không phản ánh hậu quả thực tế.",
    },
    {
      id: 136,
      question:
        'According to "Using Breakpoints" in the lecture, what layout-splitting rule based on width is proposed?',
      options: [
        "< 400px: Small, 400-800px: Medium, > 800px: Large",
        "< 100px: Small, 100-300px: Medium, > 300px: Large",
        "Only 2 levels: Mobile and Desktop, no intermediate level",
        "Breakpoint is always fixed at 1024px in every case",
      ],
      answer: 0,
      hint: "<400 Small, 400-800 Medium, >800 Large.",
      rationale:
        "Quy tắc breakpoint đề xuất: <400px Small, 400-800px Medium, >800px Large — đúng theo slide. B, C, D không đúng số liệu.",
    },
    {
      id: 137,
      question:
        'In the Genre Chips example, the lecture says "This behavior is achieved automatically by using Wrap, without conditional logic." What does this mean technically?',
      options: [
        "You need many if statements to check screen size then decide chips per row",
        "The Wrap widget automatically calculates and wraps elements to a new line based on available space, without the developer writing manual conditional logic for responsiveness",
        "Wrap only works correctly when combined with LayoutBuilder",
        "This description is wrong, Wrap always needs accompanying conditional logic",
      ],
      answer: 1,
      hint: "Wrap tự tính toán, không cần if.",
      rationale:
        "Widget Wrap tự động tính toán và xuống dòng các phần tử dựa trên không gian khả dụng, mà không cần lập trình viên viết logic điều kiện thủ công cho responsive. A, C, D không đúng ý nghĩa của câu nói này.",
    },
    {
      id: 138,
      question:
        "In the Responsive Movie Card example, what is the role of Expanded wrapping Text(title) in the Row?",
      options: [
        "Makes the Text automatically bold",
        "Lets the Text take up all remaining horizontal space after the image, while avoiding horizontal overflow when the title is long",
        "Expanded is purely cosmetic, unrelated to layout",
        "Expanded causes the image to shrink to match the Text's size",
      ],
      answer: 1,
      hint: "Cho Text chiếm hết không gian còn lại.",
      rationale:
        "Expanded cho Text chiếm hết không gian ngang còn lại sau ảnh, đồng thời tránh overflow ngang khi title dài. A, C, D mô tả sai vai trò kỹ thuật của Expanded ở đây.",
    },
    {
      id: 139,
      question:
        "What is the difference between Flexible and Expanded in a Row/Column?",
      options: [
        "No difference, the two widgets are entirely equivalent",
        "Expanded forces a child to occupy the entire allocated space by flex ratio, while Flexible allows a child to be smaller than the allocated space if it doesn't need it all (depending on fit: FlexFit.loose)",
        "Flexible can only be used inside GridView, not in Row/Column",
        "Expanded only works with the Text widget",
      ],
      answer: 1,
      hint: "Expanded chiếm hết, Flexible có thể nhỏ hơn.",
      rationale:
        "Expanded buộc child chiếm toàn bộ không gian được cấp theo tỷ lệ flex, còn Flexible cho phép child nhỏ hơn không gian được cấp nếu không cần dùng hết (fit: FlexFit.loose). A, C, D không đúng hành vi thực tế của chúng.",
    },
    {
      id: 140,
      question:
        "In Lab 6.3 (Tablet Layout Enhancement), for screens > 800px requiring a sidebar filter and 2-column list, what technique is recommended at the screen's root level?",
      options: [
        "Use Wrap alone, no other tool needed",
        "Use LayoutBuilder at the root level to detect the width constraint, deciding whether to show the tablet layout (sidebar + 2 columns) or the mobile layout",
        "Use OrientationBuilder instead of checking width",
        "It's impossible to build a distinct tablet layout in Flutter",
      ],
      answer: 1,
      hint: "Dùng LayoutBuilder ở cấp gốc.",
      rationale:
        "Dùng LayoutBuilder ở cấp gốc màn hình để phát hiện constraint chiều rộng là kỹ thuật được đề xuất. A, C, D không đúng kỹ thuật được đề xuất.",
    },
    {
      id: 141,
      question: "What problem does the AspectRatio widget help solve?",
      options: [
        "Helps images avoid being stretched/distorted when the container size changes, by maintaining a fixed aspect ratio",
        "Speeds up loading images from the network",
        "Only usable for video, not for images",
        "Fully replaces BoxFit",
      ],
      answer: 0,
      hint: "Giữ tỉ lệ khung hình cố định.",
      rationale:
        "AspectRatio giữ tỉ lệ khung hình cố định để ảnh không bị kéo dãn/biến dạng khi kích thước container thay đổi. B, C, D không đúng phạm vi/chức năng của nó.",
    },
    {
      id: 142,
      question:
        "A sort Dropdown inside a Row with MainAxisSize.max causes overflow on small screens. What is the most reasonable solution per Module 6?",
      options: [
        "Completely remove the Dropdown from small screens",
        "Wrap the flexible element (like the Dropdown or long text) with Flexible/Expanded, or use Wrap to auto-wrap to a new line when there isn't enough space",
        "Always give every element in the Row an absolute fixed size",
        "Convert the entire Row into a Stack",
      ],
      answer: 1,
      hint: "Bọc Flexible/Expanded hoặc dùng Wrap.",
      rationale:
        "Bọc phần tử linh hoạt bằng Flexible/Expanded, hoặc dùng Wrap để tự xuống dòng khi không đủ chỗ, là giải pháp được đề xuất. A, C, D không đúng nguyên tắc responsive đã dạy.",
    },
    {
      id: 143,
      question:
        'Per Module 6\'s "Best Practices," when should Wrap be prioritized over Row?',
      options: [
        "When displaying a long chip list that could overflow horizontal space",
        "When there's only exactly 1 child element",
        "When you need a fixed widget that never changes size",
        "Wrap should never be prioritized over Row",
      ],
      answer: 0,
      hint: "Chip list dài dễ overflow ngang.",
      rationale:
        "Wrap nên được ưu tiên cho danh sách chip dài có thể bị overflow ngang. B, C, D không đúng với best practice được nêu.",
    },
    {
      id: 144,
      question:
        "Comparing MediaQuery at full-screen level versus LayoutBuilder at a deeply nested child level, which statement is most accurate?",
      options: [
        "Both approaches always give identical results in every case",
        "MediaQuery returns the device's full screen width even though the child widget is much more constrained by its parent, while LayoutBuilder accurately reflects the real space (constraint) the child widget actually has — so use LayoutBuilder when you need to respond to local space",
        "LayoutBuilder cannot be used nested inside a Row",
        "MediaQuery only works inside a StatelessWidget",
      ],
      answer: 1,
      hint: "LayoutBuilder phản ánh không gian thực tế cục bộ.",
      rationale:
        "MediaQuery trả về chiều rộng toàn màn hình thiết bị dù widget con bị cha giới hạn nhiều hơn, còn LayoutBuilder phản ánh chính xác không gian thực tế mà widget con có. A, C, D không đúng đặc điểm kỹ thuật đã phân tích.",
    },
    {
      id: 145,
      question:
        "According to the lecture, which tool in Flutter Inspector helps debug responsive layout?",
      options: [
        "Layout Explorer",
        "Network Inspector",
        "Memory Profiler",
        "CPU Profiler",
      ],
      answer: 0,
      hint: "Layout Explorer trong Flutter Inspector.",
      rationale:
        '"Layout Explorer" trong Flutter Inspector giúp debug layout responsive, theo "Best Practices" của Module 6. B, C, D không phải tool được nêu cho mục đích này.',
    },
    {
      id: 146,
      question:
        'Why does the lecture recommend "Avoid fixed values" for apps running on diverse device sizes?',
      options: [
        "Because Flutter doesn't support fixed numbers in code",
        "Because fixed values (e.g. absolute pixel width/height) don't adapt to diverse screen sizes, easily causing overflow or wasted space on other devices",
        "Because fixed values increase the APK file size",
        "No specific technical reason",
      ],
      answer: 1,
      hint: "Giá trị cố định không thích ứng đa kích thước.",
      rationale:
        "Giá trị cố định không thích ứng với nhiều kích thước màn hình khác nhau, dễ gây overflow hoặc lãng phí không gian trên thiết bị khác. A, C, D không đúng lý do kỹ thuật thực tế.",
    },
    {
      id: 147,
      question:
        "For a responsive search bar as the first element in Scaffold's body with no SafeArea, what specific risk is most likely on a device with a notch?",
      options: [
        "The TextField will be automatically disabled",
        "The top of the search bar may be overlapped by the status bar/notch, making it hard for the user to tap the TextField accurately",
        "The virtual keyboard will never appear",
        "The app won't compile",
      ],
      answer: 1,
      hint: "Phần trên search bar bị notch che.",
      rationale:
        "Thiếu SafeArea có nguy cơ phần trên của search bar bị che bởi status bar/notch, khiến người dùng khó chạm chính xác vào TextField. A, C, D không phản ánh rủi ro thực tế.",
    },
    {
      id: 148,
      question:
        "What is FractionallySizedBox in the responsive widget list used for?",
      options: [
        "Sizing a widget as a percentage relative to its parent widget, instead of a fixed pixel value",
        "Only used for animations",
        "Cropping rounded corners on a widget",
        "Has no real function, purely illustrative in the slide",
      ],
      answer: 0,
      hint: "Kích thước theo tỷ lệ % so với cha.",
      rationale:
        "FractionallySizedBox định kích thước widget theo tỷ lệ phần trăm so với widget cha, thay vì giá trị pixel cố định. B, C, D mô tả sai chức năng.",
    },
    {
      id: 149,
      question:
        "Why does the lecture encourage testing responsive UI across multiple device sizes instead of just one single emulator?",
      options: [
        "Because Flutter requires testing on at least 3 devices to submit an assignment",
        "Because layout behavior (especially breakpoints, Wrap, GridView) can vary significantly across screen sizes, and overflow/misalignment bugs often only appear at specific sizes",
        "Because each device runs a different version of Dart",
        "No real reason, it's just an optional suggestion",
      ],
      answer: 1,
      hint: "Bug overflow chỉ xuất hiện ở kích thước cụ thể.",
      rationale:
        "Hành vi layout có thể thay đổi đáng kể giữa các kích thước màn hình, và bug thường chỉ xuất hiện ở kích thước cụ thể. A, C, D không đúng lý do kỹ thuật thực tế.",
    },
    {
      id: 150,
      question:
        "If breakpoint logic in a deeply nested child widget uses MediaQuery full-screen width instead of LayoutBuilder, what is the potential consequence?",
      options: [
        "No consequence at all because Flutter automatically syncs",
        "The responsive decision could be wrong: the widget might incorrectly choose TabletView even though the actual local space it has is very narrow (because parent widgets have constrained the space), leading to overflow or an unsuitable layout",
        "The app will always correctly show MobileView regardless of screen size",
        "This is the only recommended way to write this in every case",
      ],
      answer: 1,
      hint: "Quyết định responsive có thể sai.",
      rationale:
        "Dùng chiều rộng MediaQuery toàn màn hình thay vì constraint cục bộ có thể dẫn đến quyết định responsive sai, gây overflow hoặc layout không phù hợp. A, C, D không đúng hậu quả thực tế.",
    },
    {
      id: 151,
      question:
        "When should you use TextFormField instead of a plain TextField?",
      options: [
        "When you don't need any special functionality",
        "When the input needs to be inside a Form and needs validation functionality",
        "TextFormField can only be used for Web",
        "There's no difference between the two widgets",
      ],
      answer: 1,
      hint: "Dùng khi cần validation trong Form.",
      rationale:
        "Dùng TextFormField khi input cần nằm trong Form và cần chức năng validation. A, C, D mô tả sai khi nào nên dùng nó.",
    },
    {
      id: 152,
      question: "What is GlobalKey<FormState> used for in a Form?",
      options: [
        "Only used to set the form's color",
        "Allows accessing and controlling the Form's state from outside, e.g. calling validate(), save(), reset() on all fields in the form",
        "Syntactically required but has no real effect",
        "Used to encrypt the entered data",
      ],
      answer: 1,
      hint: "Truy cập validate()/save()/reset().",
      rationale:
        "GlobalKey<FormState> cho phép truy cập/điều khiển state của Form từ bên ngoài qua validate()/save()/reset(). A, C, D mô tả sai vai trò của nó.",
    },
    {
      id: 153,
      question:
        "If save() is called BEFORE validate() in a Form submit handler, what could happen?",
      options: [
        "No difference, the call order doesn't matter",
        "Invalid data could still be saved into state variables via onSaved, because save() doesn't itself check validity before saving — validate() must be called first to ensure only checked data gets saved",
        "The app will show a compile error",
        "save() will automatically call validate() implicitly before saving",
      ],
      answer: 1,
      hint: "Dữ liệu chưa hợp lệ có thể bị lưu.",
      rationale:
        "Gọi save() trước validate() có nguy cơ lưu dữ liệu chưa được validate qua onSaved, vì save() không tự kiểm tra tính hợp lệ. A sai vì thứ tự có ảnh hưởng; C sai vì không phải lỗi compile; D sai vì save() không tự gọi validate().",
    },
    {
      id: 154,
      question:
        "What is the standard signature of a validator function in TextFormField?",
      options: [
        "void Function(String value)",
        "String? Function(String? value)",
        "bool Function(String value)",
        "Future<String> Function(String? value)",
      ],
      answer: 1,
      hint: "String? Function(String? value).",
      rationale:
        "Chữ ký validator chuẩn là String? Function(String? value). A, C, D không đúng chữ ký chuẩn của Flutter Form validator.",
    },
    {
      id: 155,
      question: "If a validator function returns null, what does that mean?",
      options: [
        'The field is invalid, showing the error "null"',
        "The field is valid, no error shown",
        "The field has not been filled in by the user yet",
        "The Form will automatically reset to its initial value",
      ],
      answer: 1,
      hint: "null nghĩa là hợp lệ.",
      rationale:
        "Trả về null nghĩa là field hợp lệ, không hiện lỗi. A, C, D mô tả sai ý nghĩa của giá trị trả về null.",
    },
    {
      id: 156,
      question:
        'For a password validator checking empty/length/digit, with input "abcdefgh" (8 letters, no digits), what does it return?',
      options: [
        "null (valid)",
        '"Password is required"',
        '"Use at least 8 characters"',
        '"Include a number"',
      ],
      answer: 3,
      hint: 'Thiếu số -> "Include a number".',
      rationale:
        'Input 8 ký tự chữ cái thỏa 2 điều kiện đầu (không rỗng, đủ 8 ký tự) nhưng thiếu số, nên trả về "Include a number". A sai vì không hợp lệ; B, C sai vì các điều kiện đó đã thỏa.',
    },
    {
      id: 157,
      question:
        "The lecture recommends comparing confirm password against which variable, instead of comparing directly against another controller?",
      options: [
        "Compare against the state variable _password already stored in State (instead of directly comparing two TextEditingControllers) to keep the code clean",
        'Compare against the default value "123456"',
        "No comparison needed at all, just check the length",
        "Compare against the entered email",
      ],
      answer: 0,
      hint: "So sánh với biến state _password.",
      rationale:
        "Bài giảng đề xuất so sánh với biến state _password đã lưu trong State thay vì so sánh trực tiếp hai TextEditingController, để code sạch hơn. B, C, D không đúng đề xuất.",
    },
    {
      id: 158,
      question:
        "AutovalidateMode has disabled, always, and onUserInteraction. Which mode is recommended and why?",
      options: [
        "always — because showing errors right away helps users be more careful",
        "disabled — because never showing errors keeps the UI always clean",
        'onUserInteraction — because it avoids showing red errors right from the start (annoying) while still responding promptly once the user starts interacting with that field, balancing "too early" and "too late"',
        "No mode is recommended, it's arbitrary",
      ],
      answer: 2,
      hint: "onUserInteraction cân bằng sớm/muộn.",
      rationale:
        "onUserInteraction được đề xuất vì cân bằng giữa không hiện lỗi quá sớm (gây khó chịu) và không quá muộn (gây khó hiểu). A, B, D không đúng mode/lý do được đề xuất.",
    },
    {
      id: 159,
      question:
        'Per the "Error Messages & UX" section, which of the following is a GOOD UX example?',
      options: [
        '"ERROR_400_INVALID_FIELD"',
        '"Enter a valid email"',
        '"Invalid!!!"',
        '"Something went wrong somewhere"',
      ],
      answer: 1,
      hint: '"Enter a valid email" rõ ràng, cụ thể.',
      rationale:
        '"Enter a valid email" là ví dụ UX tốt: ngắn gọn, rõ ràng, cụ thể. A, C, D là ví dụ xấu (mã lỗi kỹ thuật, mơ hồ, không cụ thể).',
    },
    {
      id: 160,
      question:
        "What is FocusNode combined with textInputAction: TextInputAction.next and onFieldSubmitted used for?",
      options: [
        "Encrypting data entered into the field",
        'Controlling the shift of focus to the next input field when the user presses "Next" on the keyboard, improving the mobile input experience',
        "Completely hiding the keyboard when starting to type",
        "Automatically filling in data from an API",
      ],
      answer: 1,
      hint: "Chuyển focus sang field kế tiếp.",
      rationale:
        "Kết hợp này điều khiển việc chuyển focus sang field kế tiếp khi người dùng nhấn Next, cải thiện UX nhập liệu trên mobile. A, C, D mô tả sai mục đích.",
    },
    {
      id: 161,
      question:
        'For "Tap outside the form → keyboard hides," what is the common implementation approach in the lecture?',
      options: [
        "Call Navigator.pop(context) when the user taps outside",
        "Wrap the form in a GestureDetector with onTap calling FocusScope.of(context).unfocus() (hiding the keyboard when tapping outside the input fields)",
        "This cannot be done in Flutter",
        "The keyboard can only be hidden with the physical Back button",
      ],
      answer: 1,
      hint: "GestureDetector + FocusScope.unfocus().",
      rationale:
        "Bọc form trong GestureDetector với onTap gọi FocusScope.of(context).unfocus() là cách triển khai phổ biến. A, C, D không đúng cách tiếp cận chuẩn đã dạy.",
    },
    {
      id: 162,
      question:
        "Why should a long form be wrapped in ListView or SingleChildScrollView?",
      options: [
        "To increase the app's loading speed",
        "To avoid layout overflow errors when the virtual keyboard appears and covers part of the form on a small screen, while allowing scrolling to view all fields",
        "Because Form is syntactically required to be inside a ListView",
        "No specific reason",
      ],
      answer: 1,
      hint: "Tránh overflow khi bàn phím hiện lên.",
      rationale:
        "Bọc trong ListView/SingleChildScrollView tránh lỗi overflow khi bàn phím ảo che một phần form trên màn hình nhỏ, đồng thời cho phép scroll xem hết các field. A, C, D không đúng lý do thực tế.",
    },
    {
      id: 163,
      question:
        "In the Async Email Check code, the submit button is configured with onPressed: _isChecking ? null : _submit. What is the main purpose of this?",
      options: [
        "No specific purpose",
        "Prevent the user from tapping the button multiple times in a row (double-submit) while the async email check is running, avoiding sending multiple duplicate requests",
        "Automatically re-validates the form",
        "Encrypts the email before sending",
      ],
      answer: 1,
      hint: "Ngăn double-submit.",
      rationale:
        "Tắt nút khi _isChecking là true để ngăn người dùng chạm nút nhiều lần liên tiếp (double-submit) trong khi async check đang chạy. A, C, D không đúng mục đích thực tế.",
    },
    {
      id: 164,
      question:
        'In the async email check example, if the user enters "taken123@test.com", what message does the app show after 2 seconds?',
      options: [
        '"Account created for taken123@test.com"',
        '"This email is already taken"',
        "No message is shown",
        "The app will throw an exception because the email is invalid",
      ],
      answer: 1,
      hint: 'Email bắt đầu bằng "taken".',
      rationale:
        'Vì email bắt đầu bằng "taken", logic startsWith("taken") hiện "This email is already taken" sau 2 giây. A, C, D không đúng logic của đoạn code đã cho.',
    },
    {
      id: 165,
      question:
        'In the "From Form to Backend" flow, what is the correct order of the data-processing process?',
      options: [
        "Server response → Validation → POST Request → UI Update",
        "UI Form → Local Validation → POST Request → Server processes → Response → UI Update",
        "POST Request → UI Form → Validation → Response",
        "UI Update → Validation → POST Request → UI Form",
      ],
      answer: 1,
      hint: "UI Form → Validation → POST → Response → UI Update.",
      rationale:
        "Thứ tự đúng: UI Form → Local Validation → POST Request → Server processes → Response → UI Update. A, C, D đảo ngược trình tự đúng.",
    },
    {
      id: 166,
      question:
        "Why is checking value == null || value.trim().isEmpty (instead of just value.isEmpty) important in a required-field validator?",
      options: [
        "Because value in a validator is always type String and can't be null, so a null check isn't needed",
        "Because value has type String? (nullable) and the user could enter only whitespace; checking both null and the trimmed empty string prevents treating a whitespace-only string as valid",
        "Because trim() automatically fixes spelling errors",
        "There's no real difference at all",
      ],
      answer: 1,
      hint: "value là String? và có thể chỉ chứa khoảng trắng.",
      rationale:
        "value có kiểu String? (nullable) và người dùng có thể chỉ nhập khoảng trắng; kiểm tra cả null và chuỗi rỗng sau trim tránh coi chuỗi khoảng trắng là hợp lệ. A sai vì value có thể null; C, D mô tả sai.",
    },
    {
      id: 167,
      question:
        "When should you use Checkbox/Switch/Radio instead of TextFormField?",
      options: [
        "When the data is a boolean or discrete choice, not free-form text",
        "When you need to enter an email address",
        "When you need to enter a long password",
        "There's no suitable case for using these widgets",
      ],
      answer: 0,
      hint: "Dữ liệu boolean hoặc lựa chọn rời rạc.",
      rationale:
        "Checkbox/Switch/Radio phù hợp với dữ liệu boolean hoặc lựa chọn rời rạc, không phải văn bản tự do. B, C, D là các trường hợp cần TextFormField.",
    },
    {
      id: 168,
      question:
        'If an email validator only checks contains("@") skipping the dot check, what is the risk?',
      options: [
        "No risk, checking @ alone is enough to determine an absolutely valid email",
        'A string like "abc@com" (missing the domain\'s dot) would still be considered valid despite not matching the basic email format the lecture requires checking',
        "Dart will automatically add a dot if missing",
        "The app will show a compile error if the dot check is missing",
      ],
      answer: 1,
      hint: '"abc@com" vẫn được coi là hợp lệ.',
      rationale:
        'Bỏ qua kiểm tra dấu chấm khiến chuỗi như "abc@com" vẫn được coi là hợp lệ dù không đúng định dạng email cơ bản. A sai vì có rủi ro rõ ràng; C, D không đúng hành vi thực tế của Dart.',
    },
    {
      id: 169,
      question: "What does formKey.currentState!.reset() do?",
      options: [
        "Removes the entire Form from the widget tree",
        "Resets all fields in the form to their initial values and clears any existing error messages",
        "Sends the data to the server",
        "Only applies to the password field",
      ],
      answer: 1,
      hint: "Reset field về giá trị ban đầu.",
      rationale:
        "reset() đặt lại tất cả field trong form về giá trị ban đầu và xóa các thông báo lỗi hiện có. A, C, D mô tả sai chức năng này.",
    },
    {
      id: 170,
      question:
        'What is the "Multi-step wizard" mentioned in "Form Layout Patterns"?',
      options: [
        "A type of screen-transition animation",
        "A layout pattern that splits a long form into multiple smaller steps/screens, reducing the feeling of being overwhelmed by too many fields on one screen",
        "Only applicable to e-commerce apps",
        "Another name for GlobalKey",
      ],
      answer: 1,
      hint: "Chia form dài thành nhiều bước.",
      rationale:
        "Multi-step wizard là pattern chia form dài thành nhiều bước/màn hình nhỏ hơn, giảm cảm giác quá tải khi có quá nhiều field. A, C, D mô tả sai khái niệm này.",
    },
    {
      id: 171,
      question:
        "In a validator using value.isEmpty directly (without null check), what is the potential (null-safety) issue?",
      options: [
        "No issue at all, the code is entirely correct",
        "The value parameter in the validator has type String? (nullable); calling value.isEmpty directly without a null check first can cause a runtime error if value is null",
        "The validator's return type must be bool, not String",
        "isEmpty doesn't exist in Dart, you must use length == 0",
      ],
      answer: 1,
      hint: "value là String? có thể null.",
      rationale:
        "value trong validator có kiểu String? (nullable); gọi value.isEmpty trực tiếp mà không kiểm tra null trước có thể gây runtime error nếu value là null. A sai vì có vấn đề thực sự; C, D không đúng về API/kiểu trả về của Dart.",
    },
    {
      id: 172,
      question:
        "Per Demo 1 (Basic Signup Form), which fields are required and what are each field's specific validity conditions?",
      options: [
        "Only a valid Email is needed, other fields aren't required",
        "Name (not empty), Email (contains @ and .), Password (at least 6 characters) — all required",
        "Only Password with a minimum of 6 characters is needed",
        "There are no specific constraints, just not being empty",
      ],
      answer: 1,
      hint: "Name, Email, Password đều bắt buộc.",
      rationale:
        "Demo 1 yêu cầu: Name (không rỗng), Email (chứa @ và .), Password (ít nhất 6 ký tự) — tất cả đều bắt buộc. A, C, D không đầy đủ/không đúng yêu cầu đã nêu.",
    },
    {
      id: 173,
      question: "What is obscureText: true in TextFormField used for?",
      options: [
        "Completely hides the entire field from the UI",
        "Masks the entered characters (e.g. showing dots) — typically used for password fields",
        "Disables the ability to type into the field",
        "Automatically encrypts the data before sending to the server",
      ],
      answer: 1,
      hint: "Ẩn ký tự đã nhập, dùng cho password.",
      rationale:
        "obscureText: true ẩn các ký tự đã nhập (ví dụ hiện dấu chấm), thường dùng cho field password. A, C, D mô tả sai chức năng này.",
    },
    {
      id: 174,
      question:
        "With AutovalidateMode.onUserInteraction, after a mismatched confirm password error, then editing password again, what happens to the Confirm Password error?",
      options: [
        "The Confirm Password error message automatically disappears forever and never shows again",
        'Since AutovalidateMode.onUserInteraction tracks interaction per field, the "Passwords do not match" error at Confirm Password can keep showing until Confirm Password is updated to match the new Password (since the form typically only re-validates the field currently being interacted with)',
        "The entire Form resets automatically",
        "The password field becomes permanently disabled",
      ],
      answer: 1,
      hint: "onUserInteraction theo dõi từng field.",
      rationale:
        'Vì onUserInteraction theo dõi tương tác theo từng field, lỗi "Passwords do not match" ở Confirm Password có thể tiếp tục hiện cho đến khi field đó được cập nhật khớp với Password mới. A, C, D không đúng hành vi thực tế của autovalidate.',
    },
    {
      id: 175,
      question:
        "In the combined demo example (Full Signup Demo), which feature is NOT mentioned as part of the combined demo?",
      options: [
        "Show/hide password",
        "Async email check with a loading button",
        "Two-way sync with an SQLite database directly in the form",
        "Focus management (Next/Done)",
      ],
      answer: 2,
      hint: "SQLite sync không thuộc Module 7.",
      rationale:
        "Đồng bộ hai chiều với SQLite trực tiếp trong form KHÔNG thuộc Full Signup Demo (thuộc Module 9). A, B, D đều là các tính năng có trong Full Signup Demo.",
    },
    {
      id: 176,
      question:
        "What benefit and trade-off does upgrading from a simple contains email check to regex bring?",
      options: [
        "No trade-off at all, regex is always perfect with no downsides",
        "Regex checks the format much more precisely and strictly than contains, but increases code complexity, and a poorly written regex could unintentionally reject valid emails (false negative) or wrongly accept an incorrect format",
        "Regex only works on Web, not on Android/iOS",
        "Dart doesn't support RegExp in a validator",
      ],
      answer: 1,
      hint: "Chặt hơn nhưng phức tạp hơn, có rủi ro sai.",
      rationale:
        "Regex kiểm tra định dạng chính xác và chặt chẽ hơn contains, nhưng tăng độ phức tạp code, và một regex viết kém có thể vô tình từ chối email hợp lệ hoặc chấp nhận sai định dạng. A, C, D không đúng với trade-off thực tế khi dùng RegExp trong Dart.",
    },
    {
      id: 177,
      question:
        "In REST API programming, which HTTP status code range indicates SUCCESS?",
      options: ["200-299", "400-499", "500-599", "100-199"],
      answer: 0,
      hint: "200-299 là thành công.",
      rationale:
        "200-299 là khoảng mã trạng thái HTTP biểu thị thành công. B, C, D là các khoảng lỗi client, lỗi server, hoặc thông tin.",
    },
    {
      id: 178,
      question:
        "When JSON is received from an API in Flutter, what Dart data type does it have after json.decode()?",
      options: [
        "Always type String",
        "A JSON object corresponds to Map<String, dynamic>, a JSON array corresponds to List<dynamic>",
        "Always type int",
        "Dart cannot represent JSON in any form",
      ],
      answer: 1,
      hint: "Object -> Map, Array -> List.",
      rationale:
        "JSON object tương ứng Map<String, dynamic>, JSON array tương ứng List<dynamic> sau khi decode. A, C, D mô tả sai kiểu dữ liệu kết quả.",
    },
    {
      id: 179,
      question:
        "Why does fetchPosts() need to be declared async and use await before http.get(url)?",
      options: [
        "Because http.get() always runs synchronously so async is mandatory",
        "Because http.get() returns a Future<Response> — the network operation doesn't complete immediately, await pauses function execution until a response arrives, avoiding blocking the UI thread while waiting",
        "async/await is purely decorative syntax with no effect on behavior",
        "Because Dart doesn't support calling an asynchronous function without async",
      ],
      answer: 1,
      hint: "http.get() trả về Future, tránh block UI thread.",
      rationale:
        "http.get() trả về Future<Response>; await tạm dừng thực thi hàm cho đến khi có response, tránh block UI thread trong khi chờ. A, C, D mô tả sai lý do kỹ thuật thực tế.",
    },
    {
      id: 180,
      question: "What is FutureBuilder in Flutter used for?",
      options: [
        "Building static UI that never changes",
        "Integrating a Future (async operation) into the widget tree, automatically rebuilding the UI based on states: waiting, error, or data",
        "Only used to display images from the network",
        "Fully replaces ListView",
      ],
      answer: 1,
      hint: "Tích hợp Future vào widget tree.",
      rationale:
        "FutureBuilder tích hợp một Future vào widget tree, tự động rebuild UI dựa trên các trạng thái: waiting, error, hoặc data. A, C, D mô tả sai chức năng của nó.",
    },
    {
      id: 181,
      question:
        "In the FutureBuilder<List<Post>> code, if the API returns an empty JSON array [] (no network error), which branch executes?",
      options: [
        "The ConnectionState.waiting branch",
        "The snapshot.hasError branch",
        'The !snapshot.hasData || snapshot.data!.isEmpty branch — showing "No posts"',
        "The final branch shows a ListView with an empty list but no message",
      ],
      answer: 2,
      hint: 'data!.isEmpty đúng -> "No posts".',
      rationale:
        'Một array rỗng không phải lỗi cũng không còn waiting, nhưng data!.isEmpty là true → nhánh "No posts" thực thi. A, B sai vì không áp dụng; D sai vì nhánh cuối chỉ chạy khi data thực sự có nội dung.',
    },
    {
      id: 182,
      question:
        "Why create a model class (e.g. Post with fromJson) instead of directly manipulating Map<String, dynamic> throughout the app?",
      options: [
        "Because Dart doesn't allow using Map directly in the UI",
        "Model classes provide type safety, clear structure, and are easier to maintain and reuse than accessing directly via string keys, which is error-prone at runtime",
        "Model classes make the app run twice as fast",
        "No clear benefit, it just increases the number of files",
      ],
      answer: 1,
      hint: "Type safety, dễ maintain hơn Map.",
      rationale:
        "Model class cung cấp type safety, cấu trúc rõ ràng, và dễ maintain/reuse hơn so với truy cập trực tiếp qua string key, điều dễ gây lỗi runtime. A, C, D không đúng lợi ích thực tế.",
    },
    {
      id: 183,
      question:
        "If .toList() is removed from jsonList.map((e) => Post.fromJson(e)).toList(), what happens with a List<Post> return type?",
      options: [
        "The return type is still List<Post>, no issue",
        'The return type becomes Iterable<Post> (since .map() returns a "lazy" Iterable), not matching the declared List<Post> return type, causing a type mismatch error',
        "The program automatically converts Iterable to List silently, no warning",
        ".map() cannot be applied to List<dynamic>",
      ],
      answer: 1,
      hint: "map() trả về Iterable, không phải List.",
      rationale:
        "Nếu bỏ .toList(), kết quả trở thành Iterable<Post> (lazy), không khớp với kiểu trả về List<Post> đã khai báo, gây lỗi type mismatch. A, C, D không đúng hành vi thực tế của Dart với .map().",
    },
    {
      id: 184,
      question:
        "In Demo 8.3 (POST Request), what does json.encode({'title':..., 'body':..., 'userId': 1}) as the request body do?",
      options: [
        "Decodes JSON data received from the server",
        "Encodes a Dart Map into a JSON string to send in the body of a POST request",
        "Only used to format UI display",
        "Encrypts the user's password before saving locally",
      ],
      answer: 1,
      hint: "Encode Map thành JSON string.",
      rationale:
        "json.encode() mã hóa một Dart Map thành chuỗi JSON để gửi trong body của POST request. A, C, D mô tả sai chức năng này.",
    },
    {
      id: 185,
      question:
        "In the try/catch/finally block, why is setState(() => isLoading = false); placed in finally instead of just in try?",
      options: [
        "No difference between placing it in try or finally",
        'To ensure the loading state is always turned off whether the request succeeds or fails (throws an exception), avoiding the button getting "stuck" in loading state permanently on error',
        "finally runs before try, so it must be placed there to run earlier",
        "Placing it in finally causes isLoading to never become false",
      ],
      answer: 1,
      hint: "finally luôn chạy dù thành công hay lỗi.",
      rationale:
        'finally đảm bảo isLoading luôn được tắt dù request thành công hay thất bại, tránh nút bị "kẹt" ở trạng thái loading vĩnh viễn khi có lỗi. A, C, D không đúng vai trò/thứ tự thực thi thực tế của finally.',
    },
    {
      id: 186,
      question:
        "Which HTTP method is most suitable for sending new data to the server in order to create a new resource?",
      options: ["GET", "POST", "DELETE", "HEAD"],
      answer: 1,
      hint: "POST để tạo resource mới.",
      rationale:
        "POST phù hợp để gửi dữ liệu mới nhằm tạo một resource mới. A, C, D không đúng mục đích của phương thức HTTP này.",
    },
    {
      id: 187,
      question:
        'In Module 8\'s "Common Pitfalls & Best Practices," how is calling an API directly inside build() regarded?',
      options: [
        "A best practice that should be applied",
        "A common pitfall to avoid — since build() can be called repeatedly, leading to uncontrolled repeated API calls; you should call the API in initState() instead",
        "The only way to call an API in Flutter",
        "Only causes problems with POST, doesn't affect GET",
      ],
      answer: 1,
      hint: "build() có thể chạy lại nhiều lần.",
      rationale:
        "Gọi API trực tiếp trong build() là một pitfall cần tránh vì build() có thể chạy lại nhiều lần; nên gọi API trong initState() thay vào đó. A, C, D không đúng nội dung pitfall đã nêu.",
    },
    {
      id: 188,
      question:
        'What is the main benefit of the "Service Layer Pattern" design (like ApiService in Demo 8.4)?',
      options: [
        "Helps Flutter automatically generate the user interface",
        "Encapsulates all API-calling logic in a separate class, keeping UI (widget) code focused on display, while allowing the same service to be reused across multiple screens",
        "Fully replaces FutureBuilder",
        "Only has the effect of reducing app size",
      ],
      answer: 1,
      hint: "Đóng gói logic gọi API riêng biệt.",
      rationale:
        "Service Layer Pattern đóng gói toàn bộ logic gọi API trong một class riêng, giữ code UI tập trung vào hiển thị, đồng thời cho phép tái sử dụng service trên nhiều màn hình. A, C, D không đúng lợi ích thực tế.",
    },
    {
      id: 189,
      question:
        "What technique does ApiService({http.Client? client}) : client = client ?? http.Client(); illustrate?",
      options: [
        "Forces always using the same single global HTTP Client instance",
        'Allows "injecting" a custom http.Client from outside (useful for testing with a mock client); if none is passed, a default client is used',
        "This is invalid Dart syntax",
        "No clear purpose, just to shorten the code",
      ],
      answer: 1,
      hint: "Cho phép inject client tùy chỉnh (mock testing).",
      rationale:
        'Đoạn này minh họa kỹ thuật dependency injection — cho phép "inject" một http.Client tùy chỉnh từ bên ngoài; nếu không truyền vào, dùng client mặc định. A, C, D không đúng mục đích thực tế.',
    },
    {
      id: 190,
      question:
        "After successfully submitting a form to create a new post (createPost), what does the lecture suggest for updating the displayed list?",
      options: [
        "The whole app must be restarted",
        "Re-fetch (call the list API again) or optimistically update directly on the existing list",
        "Nothing needs to be done, the list will automatically update with no intervention",
        "Clear the entire device cache",
      ],
      answer: 1,
      hint: "Re-fetch hoặc optimistic update.",
      rationale:
        "Đề xuất là re-fetch (gọi lại API danh sách) hoặc optimistic update trực tiếp trên danh sách hiện có. A, C, D không đúng đề xuất của bài giảng.",
    },
    {
      id: 191,
      question:
        'What is the main reason "hardcoding URLs everywhere in the code" is listed as a pitfall?',
      options: [
        "Hardcoded URLs make the app run significantly slower",
        "It makes it difficult to change the base URL (e.g. switching dev/production environments), easily leading to mistakes and duplicated code when it must be edited in multiple places",
        "Dart doesn't allow declaring URL strings directly in code",
        "Only affects security, unrelated to code maintenance",
      ],
      answer: 1,
      hint: "Khó đổi base URL, dễ trùng lặp code.",
      rationale:
        "URL hardcode gây khó khăn khi cần đổi base URL, dễ dẫn đến sai sót và trùng lặp code khi phải sửa ở nhiều nơi. A, C, D không đúng lý do thực tế.",
    },
    {
      id: 192,
      question:
        "Comparing parsing JSON directly in build() versus in a separate function called from initState(), which statement about performance is most accurate?",
      options: [
        "No performance difference between the two approaches",
        "Parsing JSON in build() causes the heavy work (parsing) to be redone every time the widget rebuilds — which can happen very often — while parsing in a function called from initState() (with the result stored in a Future variable) only happens once per data load",
        "build() always runs faster than initState() regardless of content",
        "Where code is placed doesn't affect performance, only code organization",
      ],
      answer: 1,
      hint: "Parse lặp lại mỗi lần rebuild.",
      rationale:
        "Parse JSON trong build() khiến công việc nặng bị lặp lại mỗi lần widget rebuild, còn parse trong hàm gọi từ initState() chỉ chạy một lần mỗi lần load data. A, C, D không đúng phân tích hiệu năng thực tế.",
    },
    {
      id: 193,
      question:
        "According to the lecture, what are the three typical API data groups students can choose from for their project?",
      options: [
        "realtime, media, mock APIs",
        "authentication, storage, testing APIs",
        "Only JSONPlaceholder alone",
        "Firebase, SQLite, GraphQL",
      ],
      answer: 0,
      hint: "realtime, media, mock APIs.",
      rationale:
        "Ba nhóm điển hình: realtime, media, mock APIs — đúng theo slide. B, C, D không đúng nội dung đã nêu.",
    },
    {
      id: 194,
      question:
        'If the server returns the "id" field as a string ("id": "5") instead of a number, what happens when calling Post.fromJson with json[\'id\'] as int?',
      options: [
        'Dart automatically converts the String "5" to int 5 without error',
        "Throws a runtime error (type cast error) because json['id'] as int cannot directly cast a String to int",
        "The id field will have a default value of 0",
        "No effect at all because Dart doesn't check types at runtime",
      ],
      answer: 1,
      hint: "Không thể cast String sang int trực tiếp.",
      rationale:
        "json['id'] as int throw lỗi runtime type cast vì không thể cast trực tiếp String sang int. A, C, D không đúng hành vi type-casting thực tế của Dart với as.",
    },
    {
      id: 195,
      question:
        'In the "Steps to call an API in Flutter" process, which step happens RIGHT AFTER receiving the JSON response?',
      options: [
        "Immediately update the UI with no further processing",
        "Decode JSON → convert into a Dart model",
        "Re-send the request once more to confirm",
        "Delete all old data on the device",
      ],
      answer: 1,
      hint: "Decode JSON -> chuyển thành model.",
      rationale:
        "Ngay sau khi nhận response JSON, bước tiếp theo là decode JSON → chuyển đổi thành Dart model. A, C, D không đúng trình tự đúng.",
    },
    {
      id: 196,
      question:
        "In the Retry button calling setState(() {}) with an empty body, what effect does this have in the real retry pattern context?",
      options: [
        "No effect at all since the body is empty, retry won't work in any form",
        "In the real retry pattern (used with FutureBuilder), calling setState() again triggers a widget rebuild; combined with reassigning the Future variable (e.g. calling the fetch function again inside setState), this makes FutureBuilder rerun the request — the key point is reassigning a new Future inside setState for retry to work",
        "setState() always resets the entire app state to default",
        "The Retry button is purely cosmetic and has no technical function",
      ],
      answer: 1,
      hint: "Cần reassign Future mới trong setState.",
      rationale:
        "Trong pattern retry thực tế, gọi lại setState() kích hoạt rebuild; kết hợp với gán lại biến Future bên trong setState khiến FutureBuilder chạy lại request. A, C, D mô tả sai cách retry hoạt động thực tế.",
    },
    {
      id: 197,
      question:
        "In the HTTP status code table, which range indicates a SERVER-SIDE error?",
      options: ["200-299", "300-399", "400-499", "500-599"],
      answer: 3,
      hint: "500-599 là lỗi server.",
      rationale:
        "500-599 là khoảng mã lỗi phía server. A là thành công; B là redirection; C là lỗi phía client.",
    },
    {
      id: 198,
      question:
        "What happens if response.statusCode is not 200 but the code does NOT check this condition before calling json.decode(response.body)?",
      options: [
        "No issue at all, json.decode always succeeds with every response",
        "A parsing error may occur (if the server returns an error HTML page or error text instead of valid JSON), or the program continues processing invalid data as if the request succeeded",
        "The app will automatically retry the request",
        "json.decode will safely return an empty list in every error case",
      ],
      answer: 1,
      hint: "Có thể gây lỗi parsing hoặc xử lý sai dữ liệu.",
      rationale:
        "Bỏ qua kiểm tra status có nguy cơ gây lỗi parsing trên nội dung không phải JSON, hoặc xử lý dữ liệu không hợp lệ như thể request thành công. A, C, D không đúng hậu quả thực tế.",
    },
    {
      id: 199,
      question:
        "Why does wrapping HTTP logic in ApiService (Service Layer Pattern) make switching HTTP libraries later easier?",
      options: [
        "Because every HTTP package has an entirely identical API",
        "Because all networking logic is isolated in a single class; if the library needs to change, you only edit inside ApiService without touching every widget that consumes the data, minimizing risk and effort",
        "No benefit at all, switching libraries always requires rewriting the entire app",
        "The Service Layer Pattern only applies to the http package, not to other packages",
      ],
      answer: 1,
      hint: "Logic networking cô lập trong 1 class.",
      rationale:
        "Vì toàn bộ logic networking được cô lập trong một class duy nhất; nếu cần đổi thư viện, chỉ cần sửa trong ApiService mà không cần chạm vào mọi widget tiêu thụ dữ liệu. A, C, D không đúng nguyên tắc kiến trúc phần mềm này.",
    },
    {
      id: 200,
      question:
        "In Demo 8.2, when the user taps an item in the post list to open the detail screen, how is the Post data passed to PostDetailScreen?",
      options: [
        "Calling the API again to separately load the detail data",
        "Directly passing the already-available Post object through PostDetailScreen's constructor when navigating via MaterialPageRoute",
        "Saving it to SharedPreferences then reading it back on the detail screen",
        "Using a global variable to share the data",
      ],
      answer: 1,
      hint: "Truyền trực tiếp qua constructor.",
      rationale:
        "Đối tượng Post được truyền trực tiếp qua constructor của PostDetailScreen khi điều hướng bằng MaterialPageRoute. A, C, D không đúng cách triển khai thực tế của demo.",
    },
    {
      id: 201,
      question:
        "If a fetchPosts() function does NOT check response.statusCode before decoding, and the server returns a 500 error with non-JSON HTML content, what is most likely to happen?",
      options: [
        "The app still displays the post list normally",
        "json.decode() will throw a FormatException because the returned content isn't valid JSON, causing the Future to error out, which needs handling via catch or snapshot.hasError in FutureBuilder",
        "The server will automatically resend a correctly formatted response",
        "Dart will automatically ignore the error and return an empty list",
      ],
      answer: 1,
      hint: "json.decode() throw FormatException.",
      rationale:
        "json.decode() throw FormatException vì nội dung trả về không phải JSON hợp lệ, khiến Future bị lỗi, cần xử lý qua catch hoặc snapshot.hasError. A, C, D không đúng hành vi thực tế của json.decode() với input không hợp lệ.",
    },
    {
      id: 202,
      question: "What kind of data does SharedPreferences best suit?",
      options: [
        "Complex relational data with many linked tables",
        "Simple key-value data like flags or settings",
        "Large image files",
        "Long-duration video",
      ],
      answer: 1,
      hint: "Dữ liệu key-value đơn giản.",
      rationale:
        "SharedPreferences phù hợp nhất với dữ liệu key-value đơn giản như flag hoặc setting. A, C, D không phải trường hợp phù hợp cho SharedPreferences.",
    },
    {
      id: 203,
      question:
        'According to the "Types of Local Storage in Flutter" table, which case best fits using SQLite (sqflite)?',
      options: [
        'Storing a boolean flag "has onboarding been completed"',
        "Storing structured relational data, e.g. a Todo app with many records needing querying, filtering, sorting",
        "Storing only the light/dark theme",
        "Storing a simple text string that needs no querying",
      ],
      answer: 1,
      hint: "Dữ liệu quan hệ có cấu trúc.",
      rationale:
        "SQLite phù hợp nhất với dữ liệu quan hệ có cấu trúc cần query/filter/sort, ví dụ app Todo. A, C, D phù hợp hơn với SharedPreferences hoặc file đơn giản.",
    },
    {
      id: 204,
      question:
        'According to the "SharedPreferences Support Across Environments" table, why doesn\'t DartPad (Flutter Mode) actually support SharedPreferences?',
      options: [
        "Because DartPad only supports the JavaScript language",
        "Because DartPad has no access to real device storage (no native storage), so a mock class (like FakePrefs) is needed to simulate storage behavior in memory",
        "Because SharedPreferences only works on iOS",
        "Because DartPad doesn't support any Flutter widgets at all",
      ],
      answer: 1,
      hint: "DartPad không truy cập được storage thiết bị.",
      rationale:
        "DartPad không có quyền truy cập storage thiết bị thực, nên cần một mock class (như FakePrefs) để giả lập hành vi lưu trữ trong memory. A, C, D không đúng lý do kỹ thuật thực tế.",
    },
    {
      id: 205,
      question:
        "On Flutter Web, SharedPreferences operates based on which browser storage mechanism?",
      options: ["IndexedDB", "Cookie", "localStorage", "SessionStorage"],
      answer: 2,
      hint: "localStorage của browser.",
      rationale:
        "Trên Flutter Web, SharedPreferences hoạt động dựa trên localStorage của browser. A, B, D không đúng cơ chế đã nêu trong bảng so sánh.",
    },
    {
      id: 206,
      question: "In the FakePrefs code, why is _store declared static?",
      options: [
        "To limit the app to only one FakePrefs object existing",
        "So the stored data is shared across all instances of FakePrefs (mimicking the singleton-ish behavior of real SharedPreferences), instead of each instance having its own separate data copy",
        "static has no effect in this context",
        "To automatically save data permanently even after the app is closed",
      ],
      answer: 1,
      hint: "Dữ liệu chia sẻ giữa các instance.",
      rationale:
        "static khiến dữ liệu lưu trữ được chia sẻ giữa tất cả instance của FakePrefs, mô phỏng hành vi singleton-ish của SharedPreferences thật. A, C, D không đúng vai trò thực tế của static ở đây.",
    },
    {
      id: 207,
      question:
        'The note "data resets on reload (not persistent)" for FakePrefs on DartPad hints at what limitation?',
      options: [
        "Data stored in FakePrefs persists forever even after reloading the page",
        "Since FakePrefs only stores data in the RAM of the current session, the data is lost on hot-restart or page reload — unlike real SharedPreferences, which persists durably on the device",
        "FakePrefs only works with the String data type",
        "This is a Flutter bug that needs to be patched",
      ],
      answer: 1,
      hint: "FakePrefs chỉ lưu trong RAM session hiện tại.",
      rationale:
        "Vì FakePrefs chỉ lưu dữ liệu trong RAM của session hiện tại, dữ liệu bị mất khi hot-restart hoặc reload trang, khác với SharedPreferences thật. A, C, D không đúng hạn chế đã nêu.",
    },
    {
      id: 208,
      question:
        "Which package is mentioned for determining the app's storage directory when working with local JSON files?",
      options: ["shared_preferences", "path_provider", "sqflite", "http"],
      answer: 1,
      hint: "path_provider xác định thư mục lưu trữ.",
      rationale:
        "path_provider được dùng để xác định thư mục lưu trữ của app khi làm việc với file JSON local. A, C, D không phải package cho mục đích này.",
    },
    {
      id: 209,
      question:
        "If file.readAsString() is called IMMEDIATELY after writeAsString() WITHOUT awaiting writeAsString(), what is the potential risk?",
      options: [
        "No risk at all because both operations are completely synchronous",
        "Since writeAsString() is asynchronous (returns a Future), if not awaited, the subsequent read operation could run before the write finishes, leading to reading stale data or an incomplete file (a race condition)",
        "Dart automatically synchronizes the two calls in order regardless of whether await is used",
        "The app will show an immediate compile error",
      ],
      answer: 1,
      hint: "Race condition khi không await.",
      rationale:
        "Vì writeAsString() là bất đồng bộ, nếu không await, hoạt động đọc sau đó có thể chạy trước khi ghi hoàn tất, dẫn đến đọc dữ liệu cũ hoặc file chưa hoàn chỉnh (race condition). A, C, D không đúng bản chất bất đồng bộ của các hoạt động I/O này.",
    },
    {
      id: 210,
      question:
        'How does SQFlite differ from SQLite, per the "Why not name it SQLite?" explanation?',
      options: [
        "SQFlite and SQLite are two different names for the exact same concept, no technical difference",
        "SQLite is the actual storage engine, while SQFlite is a Flutter plugin/wrapper (written in Dart + native code) that lets Flutter communicate with SQLite — SQFlite is not a standalone database",
        "SQFlite runs 10 times faster than SQLite",
        "SQFlite only works on Web, SQLite only works on mobile",
      ],
      answer: 1,
      hint: "SQLite là engine, SQFlite là plugin Flutter.",
      rationale:
        "SQLite là storage engine thực sự, còn SQFlite là plugin/wrapper Flutter giúp Flutter giao tiếp với SQLite — SQFlite không phải một database độc lập. A, C, D không đúng với giải thích đã nêu.",
    },
    {
      id: 211,
      question:
        'Why does the lecture emphasize "SQFlite doesn\'t work on Web"?',
      options: [
        "Because SQL syntax isn't supported in web browsers in general",
        "Because SQFlite is a plugin that depends on native code (Android/iOS) to communicate with the OS's SQLite engine, while web browsers have no corresponding native SQLite engine for this plugin to bridge to",
        "Because web browsers don't support any form of local storage",
        "Because SQFlite requires an Internet connection to work",
      ],
      answer: 1,
      hint: "Nhớ SQFlite hoạt động dựa trên cầu nối native.",
      rationale:
        "SQFlite phụ thuộc vào code native để kết nối tới engine SQLite của hệ điều hành, mà trình duyệt web không có engine tương ứng — nên không hỗ trợ Web. A, C, D không đúng với lý do kỹ thuật thực sự.",
    },
    {
      id: 212,
      question:
        "In SQFlite, which function is called to open or create a database, and how often should it be called?",
      options: [
        "`openDatabase()` — should only be called once (singleton/service) to avoid opening multiple duplicate connections",
        "`createDatabase()` — should be called every time before querying",
        "`initDatabase()` — call frequency doesn't matter",
        "`connectDatabase()` — only usable with Web",
      ],
      answer: 0,
      hint: "Nhớ hàm mở database và nguyên tắc chỉ gọi một lần.",
      rationale:
        "`openDatabase()` chỉ nên được gọi một lần (dạng singleton/service) để tránh mở nhiều kết nối trùng lặp. B, C, D không đúng tên hàm/cách dùng khuyến nghị.",
    },
    {
      id: 213,
      question:
        "In SQFlite, what data type does the `query()` function return, and what's the necessary next step in a real app?",
      options: [
        "Directly returns `List<Model>`, no further processing needed",
        "Returns `List<Map<String, dynamic>>` — each Map represents one data row; you need to map each Map into corresponding Model objects (e.g. using `fromJson`/`fromMap`) for use in the app",
        "Returns a raw JSON string that needs manual parsing with RegExp",
        "Returns `Future<void>`, with no data returned",
      ],
      answer: 1,
      hint: "Nhớ kiểu dữ liệu trả về của query() và bước xử lý tiếp theo.",
      rationale:
        "`query()` trả về `List<Map<String, dynamic>>`, cần map sang Model để dùng trong app. A, C, D không đúng kiểu trả về thực tế.",
    },
    {
      id: 214,
      question:
        "In the SQL SELECT syntax reviewed in the lecture, which clause is used to FILTER data rows before returning the result?",
      options: ["ORDER BY", "WHERE", "LIMIT", "SELECT"],
      answer: 1,
      hint: "Nhớ mệnh đề dùng để lọc dữ liệu trong SQL.",
      rationale:
        "`WHERE` dùng để lọc các dòng dữ liệu trước khi trả kết quả. A, C, D phục vụ mục đích khác (sắp xếp, giới hạn, chọn cột).",
    },
    {
      id: 215,
      question:
        "When is the `GROUP BY` clause combined with `HAVING` typically used?",
      options: [
        "When you need to sort results alphabetically",
        "When you need to group rows by a criterion and apply a filter condition on aggregate functions like SUM, COUNT",
        "When you need to limit the number of returned records (pagination)",
        "When you need to rename a column in the query result",
      ],
      answer: 1,
      hint: "Nhớ mục đích kết hợp GROUP BY với HAVING.",
      rationale:
        "GROUP BY + HAVING dùng để nhóm dòng dữ liệu và lọc trên các hàm tổng hợp như SUM/COUNT. A, C, D không đúng mục đích của các mệnh đề này.",
    },
    {
      id: 216,
      question:
        "Given: a Todo app needs to display the task list paginated to avoid loading all data at once on mobile. Which SQL clause is most suitable for implementing pagination?",
      options: [
        "GROUP BY and HAVING",
        "LIMIT and OFFSET",
        "WHERE alone is sufficient",
        "SQLite doesn't support pagination",
      ],
      answer: 1,
      hint: "Nhớ cú pháp SQL chuẩn cho phân trang.",
      rationale:
        "`LIMIT` và `OFFSET` là cú pháp SQL chuẩn cho phân trang. A, C, D không phù hợp/không đúng cho mục đích này.",
    },
    {
      id: 217,
      question:
        '"Offline-First" is an app design strategy based on what principle?',
      options: [
        "The app only works with a stable Internet connection",
        "Prioritize loading and displaying local data first, then sync with the server when a network connection is available, keeping the app usable offline",
        "Never store data locally, always call the API every time data is needed",
        "Only applicable to game apps",
      ],
      answer: 1,
      hint: "Nhớ nguyên tắc ưu tiên dữ liệu local trước.",
      rationale:
        "Offline-First ưu tiên tải và hiển thị dữ liệu local trước, đồng bộ với server khi có mạng, giữ app dùng được offline. A, C, D mô tả sai nguyên tắc thiết kế này.",
    },
    {
      id: 218,
      question:
        'Per the "When to Use Which Storage?" table, if an app needs offline storage AND backend sync (offline-first + sync), what combined storage solution is recommended?',
      options: [
        "Only use SharedPreferences",
        "SQLite (sqflite) combined with a Firebase/REST backend",
        "Only use a local JSON file, no backend combination needed",
        "There's no suitable solution in Flutter",
      ],
      answer: 1,
      hint: "Nhớ giải pháp kết hợp cho offline-first + sync.",
      rationale:
        "Giải pháp khuyến nghị cho offline-first + sync là SQLite (sqflite) kết hợp backend Firebase/REST. A, C, D không đúng khuyến nghị trong bảng.",
    },
    {
      id: 219,
      question:
        "In Demo 9.3 (Offline Todo App), what role does the `key: ValueKey(todo.id)` attached to each list item play (directly related to performance and correctness when the list changes)?",
      options: [
        "Purely decorative for the interface",
        "Helps Flutter accurately identify each item widget when the list changes order/adds/removes items, avoiding state confusion between items during rebuild (especially important for lists that can be reordered or have elements deleted)",
        "Used to encrypt the todo data before saving to SQLite",
        "Mandatory for SQLite to work, unrelated to Flutter's Key concept",
      ],
      answer: 1,
      hint: "Nhớ vai trò của Key khi danh sách thay đổi.",
      rationale:
        "ValueKey(todo.id) giúp Flutter nhận diện chính xác từng widget item khi list thay đổi, tránh lẫn lộn trạng thái. A, C, D mô tả sai vai trò của Key.",
    },
    {
      id: 220,
      question:
        'An app needs to store "a list of short notes, exportable/importable as a file" but doesn\'t need complex queries (no WHERE, JOIN...). Per the storage recommendation table, what is the most reasonable option?',
      options: [
        "SharedPreferences, because it's the simplest in every case",
        "Local JSON File (dart:io), because it fits simple list-structured data, needs no SQL, and directly supports export/import",
        "SQLite, because it's always the best choice regardless of data complexity",
        "Don't store locally at all, always call the API every time the app opens",
      ],
      answer: 1,
      hint: "Nhớ lựa chọn phù hợp cho dữ liệu dạng list đơn giản cần export/import.",
      rationale:
        "Local JSON File phù hợp dữ liệu dạng list đơn giản, không cần SQL và hỗ trợ export/import trực tiếp. A, C, D không phù hợp nhất với yêu cầu này.",
    },
    {
      id: 221,
      question:
        'Why is SharedPreferences described as "NOT for complex objects or large data"?',
      options: [
        "Because SharedPreferences only supports storing integers",
        "Because SharedPreferences is designed for storing simple key-value values (String, bool, int, double, List<String>), which is unsuitable and inefficient for complex-structured or large-volume data",
        "Because SharedPreferences only works with a network connection",
        "Because SharedPreferences automatically deletes data after 24 hours",
      ],
      answer: 1,
      hint: "Nhớ bản chất SharedPreferences là lưu key-value đơn giản.",
      rationale:
        "SharedPreferences được thiết kế cho dữ liệu key-value đơn giản, không phù hợp/hiệu quả với dữ liệu phức tạp hoặc lớn. A, C, D không đúng lý do thực sự.",
    },
    {
      id: 222,
      question:
        'In SharedPreferences\' standard High-Level Flow: "Load storage instance → Read existing value → Update value based on user action → Save back to storage → Refresh the UI." If the "Refresh the UI" step (e.g. calling `setState()`) is skipped after saving the new value, what happens?',
      options: [
        "The value is still correctly saved to device storage (correct on the next app launch), but the current UI won't reflect the change immediately until another rebuild occurs",
        "The value won't be saved to storage if this step is missing",
        "The app will automatically crash",
        "SharedPreferences will automatically call setState implicitly",
      ],
      answer: 0,
      hint: "Nhớ việc lưu trữ và cập nhật UI là hai bước tách biệt.",
      rationale:
        "Giá trị vẫn được lưu đúng vào storage, nhưng UI hiện tại sẽ không phản ánh thay đổi cho đến lần rebuild tiếp theo. B, C, D không đúng hành vi thực tế của SharedPreferences/Flutter.",
    },
    {
      id: 223,
      question:
        'Which data type is NOT listed as a typical example suitable for Local Storage in "Why Local Storage?"',
      options: [
        "Dark mode settings",
        "Recently viewed items",
        "Real-time video call session token (real-time streaming data)",
        'Onboarding flag ("first-time user?")',
      ],
      answer: 2,
      hint: "Nhớ những ví dụ điển hình được liệt kê cho Local Storage.",
      rationale:
        "Token phiên gọi video real-time KHÔNG được liệt kê là ví dụ điển hình cho Local Storage. A, B, D đều là ví dụ được nêu rõ trong bài giảng.",
    },
    {
      id: 224,
      question:
        'Suppose a student uses SQLite to store a favorites list BUT chooses to store the entire list as ONE single JSON string in a TEXT column, instead of splitting it into proper relational rows. In the spirit of "Why SQLite?" (structured data, sorting & filtering, relationships), what is the drawback of this approach?',
      options: [
        "No drawback, this is the most optimal approach",
        "It loses SQLite's core advantage: you can't efficiently use WHERE/ORDER BY/GROUP BY on individual elements inside that JSON string, forcing you to parse the entire string into memory and filter with Dart code — reducing query performance and losing the ability to leverage data relationships",
        "SQLite will refuse to store JSON-string-format data",
        "This approach makes the app unable to work offline",
      ],
      answer: 1,
      hint: "Nhớ ưu điểm cốt lõi của SQLite bị mất khi nhồi cả list vào 1 cột TEXT.",
      rationale:
        "Lưu cả list dưới dạng 1 chuỗi JSON làm mất lợi thế truy vấn/quan hệ cốt lõi của SQLite, buộc phải lọc thủ công trong bộ nhớ bằng Dart. A, C, D không đúng nhược điểm kỹ thuật thực sự.",
    },
    {
      id: 225,
      question:
        "In Lab 9 (Offline-First Mini App), what part of the app is SharedPreferences suggested to be used for?",
      options: [
        "Storing the entire relationally-structured Todo list",
        "Storing the app's theme state (Dark/Light mode)",
        "Storing the data export/import JSON file",
        "Storing multi-table relational data",
      ],
      answer: 1,
      hint: "Nhớ vai trò cụ thể của SharedPreferences trong Lab 9.",
      rationale:
        "SharedPreferences được đề xuất để lưu trạng thái theme (Dark/Light mode) của app trong Lab 9. A, C, D phù hợp hơn với SQLite/JSON file.",
    },
    {
      id: 226,
      question:
        'Comparing the three storage types learned (SharedPreferences, JSON File, SQLite) against the offline-first principle "Store offline → Use offline → Sync online." When designing a notes app that will later sync to a server, which initial local storage choice makes future "Sync online" and "Resolve conflicts" easiest to implement, and why?',
      options: [
        "SharedPreferences, because it's the simplest to start coding with",
        "SQLite, because its clear row/column data structure makes it easy to track changes (e.g. by id, timestamp) for syncing and resolving conflicts with the server, compared to managing a single JSON string blob in SharedPreferences or a JSON file with no mechanism to query/track changes per element",
        "No local storage needed, always call the API every time the app opens to avoid conflicts",
        "JSON File, because files automatically sync in real-time with the server",
      ],
      answer: 1,
      hint: "Nhớ ưu thế cấu trúc dạng bảng của SQLite cho việc theo dõi thay đổi.",
      rationale:
        "Cấu trúc row/column rõ ràng của SQLite giúp theo dõi thay đổi (id, timestamp) để đồng bộ/giải quyết xung đột dễ hơn nhiều so với JSON blob hay file. A, C, D không đúng lý do kỹ thuật cho việc sync/conflict trong tương lai.",
    },
    {
      id: 227,
      question:
        "What is the difference between Authentication and Authorization?",
      options: [
        "The two concepts are entirely identical",
        'Authentication answers "Who are you?" (identity verification), Authorization answers "What are you allowed to do?" (access control)',
        "Authorization always happens before Authentication",
        "Authentication only applies to web, not mobile",
      ],
      answer: 1,
      hint: "Nhớ câu hỏi tương ứng của Authentication và Authorization.",
      rationale:
        'Authentication xác thực danh tính ("Bạn là ai?"); Authorization xác định quyền hạn ("Bạn được làm gì?"). A, C, D mô tả sai/đảo ngược hai khái niệm.',
    },
    {
      id: 228,
      question:
        "In the high-level Authentication Flow, after the backend verifies valid login credentials, what does the system usually return to the app?",
      options: [
        "The user's password in encrypted form",
        "A token (usually a JWT) for the app to store and use for subsequent requests",
        "The entire user database",
        "A list of other apps the user has installed",
      ],
      answer: 1,
      hint: "Nhớ thứ backend trả về sau khi xác thực thành công.",
      rationale:
        "Backend trả về một token (thường là JWT) để app lưu trữ và dùng cho các request tiếp theo. A, C, D không đúng với luồng authentication chuẩn.",
    },
    {
      id: 229,
      question: "What three main parts does a JWT (JSON Web Token) consist of?",
      options: [
        "Username, Password, Email",
        "Header, Payload, Signature",
        "Request, Response, Body",
        "Client, Server, Database",
      ],
      answer: 1,
      hint: "Nhớ ba phần cấu tạo của JWT.",
      rationale:
        "JWT gồm Header, Payload, Signature. A, C, D không đúng cấu trúc thực sự của JWT.",
    },
    {
      id: 230,
      question:
        "Per the instructor's note \"JWTs must not store passwords. Only identity claims,\" what is WRONG if a system stores a user's password directly in the JWT payload?",
      options: [
        "No problem at all since JWT is signed, making it always absolutely secure",
        "A JWT is only signed, not encrypted by default — meaning the payload can be decoded and read by anyone holding the token (e.g. via base64 decode), so storing sensitive info like a password is a serious security vulnerability",
        "A JWT cannot contain an object-type payload, only plain strings",
        "This is a standard, industry-recommended practice",
      ],
      answer: 1,
      hint: "Nhớ JWT chỉ được ký, không được mã hóa mặc định.",
      rationale:
        "JWT chỉ được ký (không mã hóa), nên payload có thể bị đọc bởi bất kỳ ai giữ token — lưu mật khẩu trong đó là lỗ hổng bảo mật nghiêm trọng. A, C, D không đúng đặc tính bảo mật thực sự của JWT.",
    },
    {
      id: 231,
      question:
        "What is the difference between an Access Token and a Refresh Token, per the lecture?",
      options: [
        "The Access Token has a longer lifetime than the Refresh Token",
        "The Access Token is usually short-lived (reducing risk if exposed) and sent with every request; the Refresh Token has stronger privileges, used to get a new Access Token when it expires, so it needs more secure storage (Secure Storage)",
        "The two token types have completely identical functions, just different names",
        "The Refresh Token is sent with every API request, while the Access Token is only used once",
      ],
      answer: 1,
      hint: "Nhớ vòng đời và mức độ nhạy cảm của hai loại token.",
      rationale:
        "Access Token sống ngắn và gửi kèm mỗi request; Refresh Token có quyền mạnh hơn, dùng để làm mới Access Token, cần lưu trữ an toàn hơn. A, C, D mô tả sai đặc điểm hai loại token.",
    },
    {
      id: 232,
      question:
        'In Demo 10.1, why does the lecture choose "Mock Authentication" (simulated auth inside AuthService) instead of calling a real API from the start?',
      options: [
        "Because Mock Authentication is theoretically faster in computation",
        "To ensure the demo works reliably in every learning environment (not dependent on network connectivity, since a real server could fail/timeout), suitable for the stage of learning basic concepts before moving to real API integration",
        "Because Real APIs always require payment",
        "Because Flutter doesn't support making real HTTP requests in mobile apps",
      ],
      answer: 1,
      hint: "Nhớ lý do sư phạm khi dùng Mock Authentication trong demo.",
      rationale:
        "Mock Authentication đảm bảo demo hoạt động ổn định ở mọi môi trường học, không phụ thuộc mạng, phù hợp giai đoạn học khái niệm cơ bản trước khi tích hợp API thật. A, C, D không đúng lý do thực sự.",
    },
    {
      id: 233,
      question:
        "Per the Mock API vs Real API comparison table, what is a disadvantage of Real API compared to Mock API in the teaching context?",
      options: [
        "Real API is always faster and more stable than Mock API",
        "Real API can encounter errors from network, server, TLS, or CORS — less stable than Mock API, which always works without needing the Internet",
        "Real API cannot be used to teach students about networking",
        "Mock API is never used in real-world projects or in teaching at all",
      ],
      answer: 1,
      hint: "Nhớ những lỗi thực tế mà Real API có thể gặp phải.",
      rationale:
        "Real API có thể gặp lỗi mạng/server/TLS/CORS, kém ổn định hơn Mock API vốn không cần Internet. A, C, D không đúng nội dung bảng so sánh.",
    },
    {
      id: 234,
      question:
        "In the Signup Flow process, which statement is correct about the relationship between AuthService used for Login (Demo 10.1) and Signup (Demo 10.2)?",
      options: [
        "Signup must create an entirely new service, completely separate from Login's AuthService",
        "Signup reuses the same `AuthService` class, only adding a new method (`signup(...)`), keeping the same architecture and error handling already established by Login",
        "Signup needs no service at all, handling everything directly in the widget",
        "AuthService is only used for logout",
      ],
      answer: 1,
      hint: "Nhớ nguyên tắc tái sử dụng AuthService cho Signup.",
      rationale:
        "Signup tái sử dụng cùng class AuthService, chỉ thêm phương thức signup() mới trong khi giữ nguyên kiến trúc/xử lý lỗi cũ. A, C, D không đúng nội dung phần tích hợp Signup.",
    },
    {
      id: 235,
      question:
        'Consider the password validation rules in the Signup Form: minimum 6-8 characters, at least 1 uppercase letter, at least 1 digit, no leading/trailing whitespace, and must match Confirm Password. With Password = " Abc1234" (leading space) and Confirm Password = " Abc1234" (identical, matching), what is the validation result per these rules?',
      options: [
        "Valid because Password and Confirm Password match completely",
        'Invalid, because it violates the "No leading / trailing whitespace" rule even though the two values match',
        "Valid because whitespace doesn't affect the password validation rules",
        "Undetermined because Dart doesn't allow passwords to contain whitespace",
      ],
      answer: 1,
      hint: "Nhớ áp dụng đầy đủ tất cả các quy tắc validate, không chỉ so khớp.",
      rationale:
        'Dù hai giá trị khớp nhau, mật khẩu vẫn không hợp lệ vì vi phạm quy tắc "không có khoảng trắng đầu/cuối". A, C, D không áp dụng đúng toàn bộ các quy tắc đã nêu.',
    },
    {
      id: 236,
      question: "What is `SharedPreferences` used for in Demo 10.3, mainly?",
      options: [
        "Storing the user's entire web browsing history",
        "Persisting the authentication token to implement auto-login, so the user doesn't need to log in again every time the app opens",
        "Storing the user's avatar image as binary data",
        "Fully replacing JWT",
      ],
      answer: 1,
      hint: "Nhớ mục đích chính của SharedPreferences trong Demo 10.3.",
      rationale:
        "SharedPreferences lưu trữ auth token để hiện thực auto-login, tránh phải đăng nhập lại mỗi lần mở app. A, C, D không đúng mục đích trong Demo 10.3.",
    },
    {
      id: 237,
      question:
        'In the Auto Login Flow: "Splash → (has token?) → Home / Login." If the token has expired but still exists in SharedPreferences (the app only checks "does a token exist" WITHOUT checking its expiry), what could happen?',
      options: [
        "The app will always accurately detect an expired token because SharedPreferences auto-validates it",
        "The app might mistakenly navigate the user to Home even though the token has expired, causing subsequent API requests to be rejected (401 Unauthorized) — showing the need to also check token expiry or handle 401 errors to force logout when needed",
        "The token will automatically refresh with no additional logic needed",
        "The app will always stay on the Splash screen forever",
      ],
      answer: 1,
      hint: "Nhớ hệ quả khi chỉ kiểm tra sự tồn tại của token mà không kiểm tra hạn.",
      rationale:
        "Nếu không kiểm tra hạn, app có thể sai lầm điều hướng vào Home dù token đã hết hạn, dẫn đến lỗi 401 ở các request sau đó — cho thấy cần kiểm tra hạn token hoặc xử lý lỗi 401. A, C, D không đúng hệ quả thực tế.",
    },
    {
      id: 238,
      question:
        'In the "Logout & Session Clearing" Test Scenario of Demo 10.3, what specific action happens to the token data after the user logs out?',
      options: [
        'The token switches to an "expired" state but is still kept in memory',
        "The token is removed from SharedPreferences, causing the next app launch to show the Login screen instead of automatically going to Home",
        "The token is sent back to the server for permanent storage",
        "Nothing changes, logout only temporarily hides the Home UI",
      ],
      answer: 1,
      hint: "Nhớ hành động cụ thể với token khi logout.",
      rationale:
        "Logout xóa token khỏi SharedPreferences, khiến lần mở app tiếp theo hiển thị màn Login thay vì tự động vào Home. A, C, D không đúng kịch bản test đã mô tả.",
    },
    {
      id: 239,
      question:
        "What main benefit does Firebase Authentication provide over building your own authentication system from scratch?",
      options: [
        "It requires writing a more complex custom backend",
        "Provides a secure, scalable login solution, supporting multiple methods (Google, Apple, Facebook, Email/Password) along with automatic session persistence and token refresh, reducing the effort of building an identity backend",
        "Only works for apps that don't need login",
        "Not compatible with Flutter",
      ],
      answer: 1,
      hint: "Nhớ lợi ích thực sự của Firebase Authentication.",
      rationale:
        "Firebase Auth cung cấp giải pháp đăng nhập an toàn, mở rộng tốt, hỗ trợ nhiều phương thức, tự động duy trì phiên/refresh token, giảm công sức xây backend định danh. A, C, D không đúng lợi ích thực sự.",
    },
    {
      id: 240,
      question:
        'In the Google Sign-In flow: "User taps Sign in with Google → Google account chooser → Google issues OAuth tokens → Convert to Firebase credential → Firebase signs in the user → App receives Firebase User object." What is the core meaning of the statement "Firebase handles identity → our app only handles UI + navigation"?',
      options: [
        "The Flutter app must write all the OAuth authentication logic itself from scratch",
        "Firebase handles all the complex parts of identity verification and OAuth token management; the Flutter developer only needs to focus on building the UI and handling navigation after a successful login",
        "Google Sign-In is unrelated to Firebase at all",
        "UI and navigation must be entirely handled on the server side",
      ],
      answer: 1,
      hint: "Nhớ phần việc Firebase đảm nhận và phần việc app đảm nhận.",
      rationale:
        "Firebase xử lý toàn bộ phần định danh/OAuth phức tạp, dev Flutter chỉ cần tập trung xây UI và điều hướng sau khi đăng nhập thành công. A, C, D không đúng ý nghĩa của phát biểu này.",
    },
    {
      id: 241,
      question:
        'Per the Google Sign-In "Common Errors & Fixes" table, the "DEVELOPER_ERROR" is usually caused by what?',
      options: [
        "Missing Internet connection",
        "Wrong package name not matching the Firebase configuration",
        "Missing pubspec.yaml file",
        "Too-new Flutter version",
      ],
      answer: 1,
      hint: "Nhớ nguyên nhân phổ biến gây lỗi DEVELOPER_ERROR.",
      rationale:
        '"DEVELOPER_ERROR" thường do package name không khớp với cấu hình Firebase. A, C, D không đúng nguyên nhân được nêu.',
    },
    {
      id: 242,
      question:
        "In the common errors table, if Google Sign-In returns null when tested on an emulator, what is the most common cause stated?",
      options: [
        "Missing camera permission",
        "The emulator lacks Google Play Services — use an emulator with the Play Store installed or a real device instead",
        "Wrong SharedPreferences configuration",
        "Expired JWT",
      ],
      answer: 1,
      hint: "Nhớ nguyên nhân Google Sign-In trả về null trên emulator.",
      rationale:
        "Nguyên nhân phổ biến là emulator thiếu Google Play Services — nên dùng emulator có Play Store hoặc thiết bị thật. A, C, D không đúng nguyên nhân được nêu.",
    },
    {
      id: 243,
      question:
        "What is the difference between Local Notification and Push Notification?",
      options: [
        "Local Notification is triggered by the app itself and needs no Internet; Push Notification is sent from a server and needs Internet plus backend support",
        "The two notification types are completely identical in mechanism",
        "Push Notification needs no backend, only Local Notification does",
        "Local Notification only works on iOS",
      ],
      answer: 0,
      hint: "Nhớ nguồn gốc kích hoạt của hai loại thông báo.",
      rationale:
        "Local Notification do app tự kích hoạt, không cần Internet; Push Notification gửi từ server, cần Internet và backend. B, C, D mô tả sai/đảo ngược hai loại này.",
    },
    {
      id: 244,
      question:
        "In Demo 10.5, at what point in the app's actual flow is the local notification triggered?",
      options: [
        "Right when the app opens, before login",
        "Right after a successful login",
        "Only when the app is fully in the background",
        "When the app is uninstalled",
      ],
      answer: 1,
      hint: "Nhớ thời điểm cụ thể kích hoạt local notification trong Demo 10.5.",
      rationale:
        "Local notification được kích hoạt ngay sau khi đăng nhập thành công. A, C, D không đúng luồng thực tế đã mô tả.",
    },
    {
      id: 245,
      question:
        'Per "Best Practices & Patterns for Authentication," why is `pushReplacementNamed()` recommended over `pushNamed()` when moving from the Splash/Login screen to Home after successful authentication?',
      options: [
        "Because `pushReplacementNamed()` runs faster in CPU speed",
        "To prevent the user from pressing Back to return to the Splash or Login screen that has already served its purpose, avoiding an illogical navigation experience (login → back → login again)",
        "Because `pushNamed()` doesn't support named routes",
        "There's no real difference between the two methods in this context",
      ],
      answer: 1,
      hint: "Nhớ lý do tránh cho phép quay lại màn Splash/Login đã dùng xong.",
      rationale:
        "pushReplacementNamed() ngăn người dùng bấm Back quay lại màn Splash/Login đã hoàn thành nhiệm vụ, tránh trải nghiệm điều hướng vô lý. A, C, D không đúng lý do thực sự.",
    },
    {
      id: 246,
      question:
        'Per the "Security" section of Best Practices, what practice is recommended regarding token storage?',
      options: [
        "Store the token as public plain text in a log file for easy debugging",
        "Don't store raw tokens insecurely — use a secure storage mechanism and always use HTTPS",
        "Send the token over an unencrypted HTTP channel to increase speed",
        "Share the token via social media to sync across multiple devices",
      ],
      answer: 1,
      hint: "Nhớ khuyến nghị bảo mật khi lưu trữ token.",
      rationale:
        "Khuyến nghị là lưu trữ an toàn và luôn dùng HTTPS, không lưu token thô một cách thiếu an toàn. A, C, D là các thực hành SAI, trái với khuyến nghị bảo mật.",
    },
    {
      id: 247,
      question:
        "An app does the following: (1) The user logs in and receives an Access Token that expires in 15 minutes; (2) The Access Token is stored in SharedPreferences; (3) No Refresh Token mechanism is implemented. What is the most likely real-world consequence after 15 minutes of continuous app use?",
      options: [
        "The app will automatically extend the token forever with no action needed",
        "API requests after the expiry point will start being rejected (401 Unauthorized), and since there's no Refresh Token, the user is forced to manually log in again to get a new Access Token — this is a limitation that should be fixed with a refresh token mechanism",
        "The Access Token will automatically become a Refresh Token",
        "The app will crash immediately when the Access Token expires",
      ],
      answer: 1,
      hint: "Nhớ hệ quả khi không có cơ chế Refresh Token.",
      rationale:
        "Không có cơ chế refresh, các request sau khi hết hạn sẽ bị lỗi 401, buộc người dùng đăng nhập lại thủ công — đây là hạn chế cần khắc phục bằng refresh token. A, C, D không đúng hệ quả thực tế.",
    },
    {
      id: 248,
      question:
        'In "Required Configurations" for Google Sign-In on Android, which file needs to be downloaded and placed in the `android/app/` folder?',
      options: [
        "Info.plist",
        "google-services.json",
        "build.gradle.template",
        "AndroidManifest.template",
      ],
      answer: 1,
      hint: "Nhớ tên file cấu hình Firebase cho Android.",
      rationale:
        "`google-services.json` cần được tải về và đặt trong `android/app/` để cấu hình Firebase cho Android. A, C, D không đúng tên/mục đích file.",
    },
    {
      id: 249,
      question:
        'Per the "Understanding User Session" section, what components does a typical session usually include?',
      options: [
        "Only the user's password",
        "Access token, user profile info, and the token expiry timestamp",
        "Only the app name and Flutter version",
        "The user's entire operation history on the device",
      ],
      answer: 1,
      hint: "Nhớ các thành phần điển hình của một session.",
      rationale:
        "Một session điển hình gồm: access token, thông tin hồ sơ người dùng, và thời điểm hết hạn token. A, C, D không đầy đủ/không đúng nội dung phần này.",
    },
    {
      id: 250,
      question:
        'Compare the AuthService (Singleton pattern) mentioned in "Architecture Patterns" with scattering authentication logic directly across individual screen widgets (LoginScreen, SignupScreen, HomeScreen each writing their own API-calling logic). In the spirit of the lecture, what is the main drawback of the scattered approach?',
      options: [
        "No drawback at all, both approaches are equivalent in quality",
        "The scattered approach leads to duplicated logic across screens, is hard to maintain consistently when the auth flow changes, and reduces reusability — while a centralized AuthService separates UI from business logic, making it easier to test and extend",
        "The scattered approach is always faster at runtime",
        "The Singleton AuthService is only suitable for apps that don't need login",
      ],
      answer: 1,
      hint: "Nhớ nhược điểm của việc rải logic xác thực khắp các màn hình.",
      rationale:
        "Cách rải logic gây trùng lặp code, khó bảo trì, giảm khả năng tái sử dụng; AuthService tập trung tách UI khỏi logic nghiệp vụ, dễ test/mở rộng hơn. A, C, D không đúng phân tích kiến trúc phần mềm.",
    },
    {
      id: 251,
      question:
        'Per "Why Notifications After Authentication?", what is the main purpose of sending a notification right after a successful login (e.g. "Login successful. Welcome back!")?',
      options: [
        "Fully replaces showing a SnackBar",
        "Connects notifications with the app's real business workflows (like confirming an important action that just occurred), increasing user engagement and awareness of their account status",
        "Only meant to check the device's Internet access permission",
        "Mandatory for the JWT to become valid",
      ],
      answer: 1,
      hint: "Nhớ mục đích chính của thông báo sau khi đăng nhập.",
      rationale:
        "Mục đích là kết nối notification với luồng nghiệp vụ thực tế, tăng tương tác và nhận thức của người dùng về trạng thái tài khoản. A, C, D không đúng mục đích thực sự.",
    },
    {
      id: 252,
      question:
        "What are the three main testing types in Flutter mentioned in the lecture?",
      options: [
        "Unit Test, Widget Test, Integration Test",
        "Alpha Test, Beta Test, Release Test",
        "Manual Test, Auto Test, Smoke Test",
        "Load Test, Stress Test, Security Test",
      ],
      answer: 0,
      hint: "Nhớ ba loại test chính được dạy trong Module 11.",
      rationale:
        "Ba loại test chính: Unit Test, Widget Test, Integration Test. B, C, D không phải phân loại được dạy trong Module 11.",
    },
    {
      id: 253,
      question:
        'Per the "Flutter Testing Pyramid," which test type should have the LARGEST quantity in a project, since it\'s fast, stable, and low cost?',
      options: [
        "Integration Test",
        "Widget Test",
        "Unit Test",
        "All three types should have equal quantities",
      ],
      answer: 2,
      hint: "Nhớ vị trí đáy của kim tự tháp testing.",
      rationale:
        "Unit Test nên nhiều nhất theo Testing Pyramid — nhanh, ổn định, chi phí thấp. A, B không đúng vị trí trong kim tự tháp; D sai vì phân bố không đều nhau.",
    },
    {
      id: 254,
      question:
        "In the testing pyramid, how many Integration Tests are recommended and for what purpose?",
      options: [
        "Use the most since it's the most comprehensive test type",
        "Use few, since they run slowly and cost more — should only be applied to critical, business-critical user flows",
        "Integration Tests should never be used under any circumstance",
        "Only used to test CPU performance",
      ],
      answer: 1,
      hint: "Nhớ nguyên tắc dùng ít Integration Test.",
      rationale:
        "Integration Test nên dùng ít vì chạy chậm/tốn kém — chỉ dành cho các luồng người dùng quan trọng. A, C, D không đúng nguyên tắc của Testing Pyramid.",
    },
    {
      id: 255,
      question:
        "Given this Unit Test: test('toggle() should switch completed state', () { final task = Task(id: '1', title: 'Demo task'); expect(task.completed, false); task.toggle(); expect(task.completed, true); task.toggle(); expect(task.completed, false); }); What common test structuring pattern does this test apply (even though not explicitly labeled with comments)?",
      options: [
        "Model-View-Controller (MVC)",
        "Arrange - Act - Assert (prepare data, perform an action, verify the result)",
        "Singleton Pattern",
        "Observer Pattern",
      ],
      answer: 1,
      hint: "Nhớ mẫu cấu trúc test phổ biến gồm 3 bước.",
      rationale:
        "Test này áp dụng mẫu Arrange - Act - Assert. A, C, D là các pattern kiến trúc/thiết kế không liên quan đến cấu trúc test.",
    },
    {
      id: 256,
      question: "How does a Widget Test in Flutter differ from a Unit Test?",
      options: [
        "Widget Test only checks pure logic unrelated to UI, exactly like a Unit Test",
        "Widget Test checks UI rendering and interaction (e.g. entering text, tapping buttons) on a widget or small widget tree, while Unit Test only checks logic/functions unrelated to UI",
        "Widget Test always runs slower than Integration Test",
        "Widget Test cannot simulate typing text or tapping",
      ],
      answer: 1,
      hint: "Nhớ đối tượng kiểm tra của Widget Test so với Unit Test.",
      rationale:
        "Widget Test kiểm tra render/tương tác UI trên widget tree; Unit Test kiểm tra logic thuần không liên quan UI. A, C, D mô tả sai đặc điểm của hai loại test.",
    },
    {
      id: 257,
      question:
        "Given a Widget Test that pumps a test app, checks empty state text, enters text, taps an add button, then pumps and checks the new text appears. If the line `await tester.pump();` after `tap()` is removed, what could happen to the assertion `expect(find.text('Buy milk'), findsOneWidget);`?",
      options: [
        "The assertion always still passes normally because tap() automatically rebuilds the UI instantly without needing pump()",
        "The assertion could fail, because `pump()` is responsible for triggering a new frame for Flutter to rebuild the UI after a state change",
        "The test will not compile without pump()",
        "pump() only affects animations, not text updates",
      ],
      answer: 1,
      hint: "Nhớ vai trò của pump() sau khi tap() gây thay đổi state.",
      rationale:
        "Thiếu pump() sau tap(), cây widget test có thể chưa phản ánh state mới nhất, dẫn đến rủi ro assertion thất bại. A, C, D không đúng vai trò thực sự của pump() trong flutter_test.",
    },
    {
      id: 258,
      question:
        "In a Navigation Test, how does `pumpAndSettle()` differ from a plain `pump()`?",
      options: [
        "No difference at all, the two functions are entirely equivalent",
        '`pumpAndSettle()` continuously "pumps" frames until no animation/transition is still running (fully settled), very useful for waiting for a screen-transition effect to finish before asserting',
        "`pumpAndSettle()` can only be used for Unit Test",
        "`pump()` always waits longer than `pumpAndSettle()`",
      ],
      answer: 1,
      hint: "Nhớ pumpAndSettle() chờ đến khi hết animation.",
      rationale:
        "pumpAndSettle() liên tục pump frame cho đến khi mọi animation kết thúc, hữu ích khi chờ hiệu ứng chuyển màn hoàn tất. A, C, D mô tả sai hàm này.",
    },
    {
      id: 259,
      question:
        'In Demo 11.4 (Integration Test: Full CRUD Flow), the test sequentially: adds a task → opens detail → edits the title → saves → checks the updated list. Why is this test type classified as "Integration Test" rather than a plain "Widget Test"?',
      options: [
        "Because it uses more lines of code than a typical Widget Test",
        "Because it validates the entire interaction flow across multiple app layers (UI → Provider → Repository) through consecutive steps, simulating a complete real user journey, rather than checking just a single isolated UI behavior",
        "Because it doesn't use any widgets at all",
        "Because Integration Test and Widget Test are the same concept, just different names",
      ],
      answer: 1,
      hint: "Nhớ lý do phân loại theo phạm vi luồng kiểm tra qua nhiều tầng.",
      rationale:
        "Được xếp là Integration Test vì kiểm chứng toàn bộ luồng qua UI → Provider → Repository, mô phỏng hành trình người dùng đầy đủ. A, C, D không đúng lý do phân loại.",
    },
    {
      id: 260,
      question:
        'Per the "How Tests Map to Real Flutter Problems" table, the "Wrong navigation" issue should mainly be detected by which test type?',
      options: [
        "Unit Test",
        "Navigation Test (part of the extended Widget Test group)",
        "Navigation issues cannot be tested at all",
        "Can only be detected via manual testing",
      ],
      answer: 1,
      hint: "Nhớ loại test phù hợp phát hiện lỗi điều hướng sai.",
      rationale:
        'Lỗi "Wrong navigation" chủ yếu được phát hiện bởi Navigation Test (mở rộng của Widget Test), theo bảng đã nêu. A, C, D không đúng nội dung bảng.',
    },
    {
      id: 261,
      question:
        "In the Taskly App's architecture (used as the running example throughout Module 11), which component is responsible for managing app-wide state?",
      options: [
        "TaskListScreen",
        "TaskProvider",
        "TaskRepository",
        "main.dart",
      ],
      answer: 1,
      hint: "Nhớ thành phần quản lý state toàn app trong Taskly.",
      rationale:
        "TaskProvider chịu trách nhiệm quản lý state toàn app trong kiến trúc Taskly. A, C, D không đúng trách nhiệm này.",
    },
    {
      id: 262,
      question:
        "In Taskly App, `TaskRepository` handles CRUD logic for tasks, while `TaskProvider` manages state. If a Widget Test wants to check UI behavior WITHOUT depending on the Repository's real database/API connection, what reasonable approach is recommended in Module 11's \"Best Practices\"?",
      options: [
        "Always connect directly to real data to ensure absolute test accuracy",
        "Mock the Repository when possible, letting Widget Tests run fast, reliably, and independently of real external data state",
        "Completely skip testing any widget related to the Repository",
        "Move all Repository logic inside the Widget to make testing easier",
      ],
      answer: 1,
      hint: "Nhớ khuyến nghị mock Repository trong Widget Test.",
      rationale:
        "Mock Repository khi có thể giúp Widget Test chạy nhanh, ổn định, độc lập với dữ liệu ngoài thực tế. A, C, D không đúng thực hành tốt được khuyến nghị.",
    },
    {
      id: 263,
      question:
        "What is `find.byKey(const Key('taskTextField'))` used for in a test?",
      options: [
        "Searching for displayed text on screen by string content",
        "Finding one specific widget exactly via its assigned Key, making widget identification in the test tree more reliable than searching by type or text (which can be duplicated or change)",
        "Finding all TextFields on screen regardless of Key",
        "Has no effect, purely illustrative",
      ],
      answer: 1,
      hint: "Nhớ độ tin cậy của việc tìm widget bằng Key so với text/type.",
      rationale:
        "find.byKey() giúp định vị chính xác một widget cụ thể qua Key, đáng tin cậy hơn tìm theo type/text. A, C, D mô tả sai chức năng của nó.",
    },
    {
      id: 264,
      question:
        'Per Module 11\'s "Best Practices," what does the "Avoid testing Flutter framework functionality" item advise?',
      options: [
        "You should write a test to verify that `Column` actually arranges elements vertically",
        "You should not write tests to re-verify behavior that the Flutter framework itself already guarantees works correctly (like the basic mechanism of built-in widgets); focus instead on testing your app's own business logic and custom behavior",
        "You are not allowed to use any built-in Flutter widget in the app",
        "The Flutter framework cannot be tested in any form",
      ],
      answer: 1,
      hint: "Nhớ nguyên tắc không test lại hành vi framework đã đảm bảo.",
      rationale:
        "Không nên viết test kiểm tra lại hành vi mà framework đã đảm bảo đúng; nên tập trung vào logic nghiệp vụ và hành vi tùy chỉnh của app. A, C, D không đúng lời khuyên thực sự.",
    },
    {
      id: 265,
      question:
        "What debugging aspects does DevTools in Flutter support, per Module 11?",
      options: [
        "Only supports syntax debugging",
        "Layout issues, failed state updates, slow performance, unnecessary rebuilds, and navigation issues",
        "Only supports checking network connectivity",
        "Only used to build the release app",
      ],
      answer: 1,
      hint: "Nhớ phạm vi hỗ trợ debug đầy đủ của DevTools.",
      rationale:
        'DevTools hỗ trợ debug layout, cập nhật state thất bại, hiệu năng, rebuild thừa, và điều hướng, theo "Debugging Goals in Flutter". A, C, D không bao quát hết phạm vi thực sự.',
    },
    {
      id: 266,
      question:
        "In the issue-to-test-type mapping table (Logic failure→Unit test, UI not updating→Widget test, Wrong navigation→Navigation test, Entire feature broken→Integration test): if a bug occurs because a Provider doesn't call `notifyListeners()` after updating data (causing the UI to not update even though the data changed in memory), which test type can most directly detect this issue?",
      options: [
        "A Unit Test checking just the data-update function alone, since it's unrelated to UI",
        "Widget Test — because it needs to verify that after the action occurs, the UI actually re-renders with the new data (something a pure-logic Unit Test cannot check)",
        "No test type can detect this bug",
        "Only Integration Test can detect it, Widget Test is entirely unsuitable",
      ],
      answer: 1,
      hint: "Nhớ loại test cần thiết để xác minh UI thực sự cập nhật.",
      rationale:
        "Widget Test là phù hợp nhất vì cần xác minh UI thực sự render lại với dữ liệu mới, điều mà Unit Test thuần logic không kiểm tra được. A, C, D không đúng cách phát hiện phù hợp.",
    },
    {
      id: 267,
      question: "What is `expect()` in flutter_test used for?",
      options: [
        "Initializing the widget tree for the test",
        'Comparing the actual value with the expected value, and failing if they don\'t match — this is the "Assert" step in the testing process',
        "Waiting for an animation to finish",
        "Generating random mock data",
      ],
      answer: 1,
      hint: "Nhớ expect() là bước Assert trong quy trình test.",
      rationale:
        "expect() so sánh giá trị thực tế với giá trị mong đợi, fail nếu không khớp — đây là bước Assert. A, C, D mô tả sai chức năng của expect().",
    },
    {
      id: 268,
      question:
        'Consider the lecture\'s explanation: "Most UI issues start from logic → unit tests catch problems early." Applying this practically: if the function counting incomplete tasks (`getIncompleteCount()`) in TaskProvider has a logic bug (calculates wrong), but the UI still shows the correct number by coincidence with small test data, which testing approach best and most reliably catches this bug early, regardless of data size?',
      options: [
        "Relying solely on manual UI observation with random datasets",
        'Write a dedicated Unit Test for `getIncompleteCount()` with multiple different datasets (edge cases: empty, all completed, mixed), isolating and verifying the calculation logic correctly without depending on whether the UI "happens" to display correctly',
        "Integration Test is the only way to catch this logic bug",
        "No automated testing form can detect a logic bug",
      ],
      answer: 1,
      hint: "Nhớ cách kiểm tra logic độc lập với hiển thị UI ngẫu nhiên đúng.",
      rationale:
        'Một Unit Test riêng với nhiều bộ dữ liệu biên (rỗng, hoàn thành hết, hỗn hợp) cô lập và xác minh chính xác logic tính toán, không phụ thuộc việc UI "tình cờ" hiển thị đúng. A, C, D không đúng cách phát hiện đáng tin cậy nhất.',
    },
    {
      id: 269,
      question: 'Why does the lecture recommend "Use keys for widget tests"?',
      options: [
        "Because a Key is syntactically mandatory for every Flutter widget",
        "Because assigning a Key helps accurately locate a specific widget in the test, avoiding confusion when multiple widgets of the same type or text content exist on screen",
        "Because a Key doubles the test's execution speed",
        "A Key only works with StatelessWidget, not with StatefulWidget",
      ],
      answer: 1,
      hint: "Nhớ Key giúp tránh nhầm lẫn giữa các widget giống nhau.",
      rationale:
        "Gán Key giúp định vị chính xác widget cụ thể trong test, tránh nhầm lẫn khi có nhiều widget cùng loại/text. A, C, D không đúng lý do khuyến nghị này.",
    },
    {
      id: 270,
      question:
        "What characteristic of the UI Overflow bug described in Module 11 makes it hard to detect if you only rely on running the app normally?",
      options: [
        "Overflow always makes the app crash instantly, so it's very easy to spot",
        'Overflow bugs typically don\'t crash the app (no exception stopping the program), so tools like tests or DevTools are needed to detect them, rather than just relying on the app "still running"',
        "Overflow only occurs on iOS devices",
        "Overflow is always automatically fixed by Dart at compile time",
      ],
      answer: 1,
      hint: "Nhớ đặc điểm lỗi overflow là không làm crash app.",
      rationale:
        'Lỗi Overflow thường không làm app crash, nên cần dùng test/DevTools để phát hiện thay vì chỉ dựa vào việc app "vẫn chạy". A, C, D không đúng đặc điểm thực sự của lỗi overflow.',
    },
    {
      id: 271,
      question:
        'In a test file, suppose the final assertion is `expect(find.text(\'Task Detail\'), findsOneWidget);` but the detail screen actually displays the title as "Task Details" (with an extra "s"). What is the test\'s result?',
      options: [
        "The test still passes because Flutter automatically does fuzzy text matching",
        'The test fails (findsOneWidget errors since no widget with the exact text "Task Detail" is found), because `find.text()` requires an exact string match',
        "The test automatically skips this assertion",
        "The test passes but prints a warning, not treated as a failure",
      ],
      answer: 1,
      hint: "Nhớ find.text() yêu cầu khớp chuỗi chính xác.",
      rationale:
        'find.text() yêu cầu khớp chuỗi chính xác, nên lệch "Task Detail" và "Task Details" khiến test fail. A, C, D không đúng hành vi thực sự của find.text().',
    },
    {
      id: 272,
      question:
        "Per Module 11's Summary, which skill is NOT listed as a learning objective of this module?",
      options: [
        "Writing Unit Tests to check model logic and behavior",
        "Writing Widget Tests to check UI rendering and interaction",
        "Building and signing a release APK file for publishing to Google Play",
        "Using DevTools to diagnose layout, rebuild, and navigation issues",
      ],
      answer: 2,
      hint: "Nhớ nội dung nào thuộc Module 12 thay vì Module 11.",
      rationale:
        "Build và ký release APK để publish lên Google Play thuộc chủ đề Module 12, KHÔNG phải mục tiêu học của Module 11. A, B, D đều là mục tiêu học chính xác của Module 11.",
    },
    {
      id: 273,
      question:
        'A student writes an Integration Test but insists on also testing whether "the AppBar\'s background color is exactly Colors.blue per Material Design\'s default" (a default framework behavior, not custom app logic). Per the "Best Practices" learned, why should this approach be avoided?',
      options: [
        "Because Integration Test is not allowed to check colors in any form",
        "Because this tests the Flutter framework's default behavior (not the app's custom business logic), wasting effort writing the test without adding any real value to ensuring app quality",
        "Because AppBar cannot be tested by any tool",
        "Because colors always change randomly between builds so they can't be tested",
      ],
      answer: 1,
      hint: "Nhớ tránh test lại hành vi mặc định của framework.",
      rationale:
        "Test hành vi mặc định của framework (thay vì logic nghiệp vụ) lãng phí công sức mà không thêm giá trị đảm bảo chất lượng thực sự. A, C, D không đúng lý do nên tránh.",
    },
    {
      id: 274,
      question:
        "What does `tester.pumpWidget(createTaskListTestApp())` do as the first step of a Widget Test?",
      options: [
        "Clears all previous test data",
        '"Pumps" (renders) the given widget tree into the virtual test environment, equivalent to launching the app for the first time to begin testing',
        "Builds the app into an APK file",
        "Connects to a real server to fetch data",
      ],
      answer: 1,
      hint: "Nhớ bước đầu tiên khi render widget tree vào môi trường test.",
      rationale:
        "pumpWidget() render widget tree đã cho vào môi trường test ảo, tương đương khởi chạy app để bắt đầu test. A, C, D mô tả sai chức năng này.",
    },
    {
      id: 275,
      question:
        'Consider: a student group writes VERY MANY Integration Tests (the vast majority of all tests) but almost no Unit Tests. Per the "Testing Pyramid" principle learned, what realistic consequence is likely?',
      options: [
        "No negative consequence at all, more Integration Tests is always better in every case",
        "The test suite will run significantly slower, cost more time/resources to maintain, and pinpointing the root cause when a bug occurs will be harder than having a solid Unit Test foundation to isolate logic bugs early",
        "Integration Tests are always faster than Unit Tests, so this is the optimal strategy",
        "The distribution of test types has no effect on speed or maintenance cost at all",
      ],
      answer: 1,
      hint: "Nhớ hệ quả khi vi phạm phân bổ hợp lý của Testing Pyramid.",
      rationale:
        "Quá nhiều Integration Test và quá ít Unit Test khiến bộ test chạy chậm, tốn chi phí bảo trì hơn, khó xác định gốc lỗi. A, C, D trái với nguyên tắc Testing Pyramid.",
    },
    {
      id: 276,
      question:
        'In "Debugging Goals in Flutter," the "Frequent unnecessary rebuilds" issue directly relates to which topic that will be explored deeper in Module 12?',
      options: [
        "Building local JSON files",
        "Performance Optimization",
        "Deep link configuration",
        "Setting up Firebase Authentication",
      ],
      answer: 1,
      hint: "Nhớ chủ đề Module 12 liên quan đến rebuild thừa.",
      rationale:
        '"Frequent unnecessary rebuilds" liên quan trực tiếp đến Performance Optimization, được khai thác sâu hơn ở Module 12. A, C, D không liên quan đến vấn đề rebuild này.',
    },
    {
      id: 277,
      question:
        "What frame-rate target (FPS) does Flutter aim for to ensure a smooth experience on standard devices?",
      options: ["24 FPS", "30 FPS", "60 FPS", "144 FPS"],
      answer: 2,
      hint: "Nhớ FPS mục tiêu chuẩn của Flutter.",
      rationale:
        "Flutter nhắm tới 60 FPS để đảm bảo trải nghiệm mượt trên thiết bị chuẩn. A, B, D không đúng con số đã nêu.",
    },
    {
      id: 278,
      question:
        "If a device runs at 60 FPS, roughly how many milliseconds does Flutter have to complete build, layout, and paint for EACH frame before a dropped frame (jank) occurs?",
      options: ["About 16.6ms", "About 100ms", "About 1ms", "About 1000ms"],
      answer: 0,
      hint: "Nhớ cách tính thời gian mỗi frame từ 60 FPS.",
      rationale:
        "Ở 60 FPS, Flutter có khoảng 16.6ms cho mỗi frame. B, C, D không khớp với con số tính toán trong bài giảng.",
    },
    {
      id: 279,
      question:
        'Per "How Flutter Builds the UI (Render Pipeline)," what are the respective roles of the three core concepts Widget, Element, RenderObject?',
      options: [
        "Widget is an immutable blueprint describing configuration, Element manages lifecycle & state, RenderObject performs the actual layout/painting/compositing",
        "Widget, Element, RenderObject are three different names for the same concept",
        "RenderObject is immutable, Widget performs painting directly to the screen",
        "Element only exists in Widget Test, not when the app actually runs",
      ],
      answer: 0,
      hint: "Nhớ vai trò tách biệt của Widget, Element, RenderObject.",
      rationale:
        "Widget = bản thiết kế bất biến, Element = quản lý vòng đời/state, RenderObject = thực hiện layout/paint/compositing. B, C, D mô tả sai vai trò của ba thành phần này.",
    },
    {
      id: 280,
      question:
        "Given code from Demo 12.1 where `context.watch<TaskProvider>()` is called right at the top-level widget (including the static InputRow) before rendering a ListView.builder of tasks: why does this cause a performance problem?",
      options: [
        "No problem at all, this is the recommended way to write it",
        "Any change in `TaskProvider` (even a small change to one task) causes the entire parent widget (including the unrelated static `InputRow`) to rebuild, wasting resources unnecessarily",
        "`context.watch` can only be used in a StatelessWidget, causing a compile error here",
        "The only problem is misplacing Expanded",
      ],
      answer: 1,
      hint: "Nhớ hệ quả khi watch ở cấp widget quá cao.",
      rationale:
        "Watch ở cấp cao nhất khiến ngay cả widget tĩnh không liên quan như InputRow cũng bị rebuild theo mỗi thay đổi của provider, lãng phí tài nguyên. A, C, D không đúng vấn đề hiệu năng thực sự.",
    },
    {
      id: 281,
      question:
        'What benefit does the "Use Selector to rebuild ONLY the list" solution in Demo 12.1 bring over a plain `context.watch<T>()`?',
      options: [
        "Selector allows fine-grained rebuilding — only the UI portion actually dependent on the changed data rebuilds, instead of the entire parent widget as with a broad-scope watch",
        "Selector and watch behave entirely identically regarding rebuilds",
        "Selector only works with the String data type",
        "Selector causes the entire app to always rebuild regardless of whether anything changed",
      ],
      answer: 0,
      hint: "Nhớ Selector cho phép rebuild có chọn lọc.",
      rationale:
        "Selector cho phép rebuild có chọn lọc, chỉ phần UI thực sự phụ thuộc dữ liệu thay đổi mới rebuild. B, C, D không đúng hành vi/lợi ích thực sự của Selector.",
    },
    {
      id: 282,
      question:
        'How does the `const` keyword before a widget (e.g. `const Text("Task Title")`) technically optimize performance?',
      options: [
        "`const` only makes the code look tidier, no runtime effect",
        "A widget marked `const` is fully immutable at compile-time; Flutter can recognize it as the same instance across rebuilds and skip rebuilding it (more efficient tree diffing), saving memory and reducing rebuild cost",
        "`const` causes the widget to always be redrawn every frame to ensure sync",
        "`const` can only be applied to StatefulWidgets",
      ],
      answer: 1,
      hint: "Nhớ const giúp Flutter bỏ qua việc rebuild widget không đổi.",
      rationale:
        "Widget const bất biến ở compile-time, giúp Flutter nhận diện là cùng instance qua các lần rebuild và bỏ qua rebuild nó, tiết kiệm bộ nhớ/chi phí. A, C, D không đúng cơ chế tối ưu thực sự của const.",
    },
    {
      id: 283,
      question:
        'Per "Optimization Technique 3: Avoid Heavy Work in build()," which of the following should NOT be done directly inside the `build()` function?',
      options: [
        "Returning a simple `Text` widget",
        "Calling an API, parsing JSON, sorting a list, or doing complex calculations",
        "Returning a `Column` containing a few static child widgets",
        "Reading a value from MediaQuery",
      ],
      answer: 1,
      hint: "Nhớ những việc nặng không nên làm trong build().",
      rationale:
        "Gọi API, parse JSON, sort, hoặc tính toán phức tạp KHÔNG nên làm trong build(). A, C, D là các thao tác bình thường, chi phí thấp, không gây vấn đề hiệu năng đáng kể.",
    },
    {
      id: 284,
      question:
        "Given an anti-pattern where `final sorted = tasks..sort();` is placed directly inside build(): what is the main problem, especially when the widget rebuilds frequently?",
      options: [
        "No problem at all since sort() always runs very fast in every case",
        "The `sort()` operation gets re-executed EVERY TIME `build()` is called (which could be dozens of times per second), wasting CPU unnecessarily — you should sort once and cache the result, only updating when the data actually changes",
        "`sort()` is automatically cached by Flutter, so there's no repeated cost",
        "This is the required way to write code to ensure the list is always correctly ordered",
      ],
      answer: 1,
      hint: "Nhớ vấn đề khi thực hiện tính toán nặng lặp lại trong build().",
      rationale:
        "sort() bị chạy lại mỗi lần build() được gọi (có thể hàng chục lần/giây), lãng phí CPU; nên sort một lần và cache kết quả. A, C, D không đúng vấn đề hiệu năng thực sự.",
    },
    {
      id: 285,
      question:
        'Per "Optimization Technique 4: Using Keys Properly," why is using `UniqueKey()` for each list item considered "Bad"?',
      options: [
        "`UniqueKey()` is syntactically invalid in Dart",
        '`UniqueKey()` generates an entirely NEW Key on every build, making Flutter always treat the widget as a "new widget" and forcing a full rebuild instead of reusing/updating the old widget — the exact opposite of Key\'s performance-optimization purpose',
        "`UniqueKey()` only works with the int data type",
        "`UniqueKey()` causes the app to crash immediately",
      ],
      answer: 1,
      hint: "Nhớ UniqueKey() luôn tạo Key mới mỗi lần build.",
      rationale:
        'UniqueKey() tạo Key mới mỗi lần build, buộc Flutter luôn coi widget là "mới" và rebuild toàn bộ — ngược lại mục đích tối ưu của Key. A, C, D không đúng lý do thực sự bị coi là xấu.',
    },
    {
      id: 286,
      question:
        'Compare `ValueKey(task.id)` with `UniqueKey()` in the context of a task list that can be deleted/added/reordered. Why is `ValueKey(task.id)` recommended ("Good")?',
      options: [
        "Because `ValueKey` is always random just like `UniqueKey`, no real difference",
        "Because `ValueKey(task.id)` ties the Key to a stable identifier value (id) of each task — Flutter can use it to accurately identify exactly which widget corresponds to which data across rebuilds, even when the list order changes, helping preserve state and optimize diffing",
        "`ValueKey` only works with lists of fewer than 10 elements",
        "`ValueKey` and using no Key at all (default null Key) always give identical performance results",
      ],
      answer: 1,
      hint: "Nhớ ValueKey gắn với id ổn định của dữ liệu.",
      rationale:
        "ValueKey gắn với id ổn định, giúp Flutter khớp đúng widget với dữ liệu qua các lần rebuild/đổi thứ tự, giữ state và tối ưu diffing. A, C, D không đúng đặc điểm/lợi ích thực sự của ValueKey.",
    },
    {
      id: 287,
      question:
        'Why does the lecture recommend running Flutter DevTools in "Profile Mode" instead of "Debug Mode" when measuring performance?',
      options: [
        "Because DevTools cannot be opened in Debug Mode",
        "Because Debug Mode has a lot of debugging overhead (assertions, extra checks) that make measured performance numbers not accurately reflect real release-mode performance; Profile Mode is closer to real-world performance",
        "Because Profile Mode runs slower than Debug Mode, making it suitable for finding bugs more thoroughly",
        "There's no difference between the two modes when measuring performance",
      ],
      answer: 1,
      hint: "Nhớ Debug Mode có overhead làm sai lệch số liệu hiệu năng.",
      rationale:
        "Overhead của Debug Mode làm sai lệch số liệu hiệu năng so với thực tế release; Profile Mode gần với thực tế hơn. A, C, D không đúng lý do khuyến nghị này.",
    },
    {
      id: 288,
      question:
        'In "Identifying Rebuild Issues," how should the statement "If state lives too high → entire UI rebuilds" be understood in the context of widget architecture design?',
      options: [
        "Placing state as high as possible in the widget tree is always the best way to optimize performance",
        "If state is placed on an ancestor widget too high in the tree (covering many unrelated UI parts), any change to that state triggers a rebuild of the entire subtree below it, including UI parts that don't actually depend on the changed data",
        "Where state is placed in the widget tree has no effect on rebuild scope",
        "State should only ever be placed at the app's root widget in every case",
      ],
      answer: 1,
      hint: "Nhớ vị trí đặt state ảnh hưởng đến phạm vi rebuild.",
      rationale:
        "Đặt state quá cao trong cây widget khiến phạm vi rebuild quá rộng, ảnh hưởng cả những phần UI không liên quan. A, C, D không đúng nguyên tắc kiến trúc này.",
    },
    {
      id: 289,
      question:
        'Per "Optimization Technique 2: Extract Widgets" (e.g. extracting `TaskTile` as its own widget), what is the main benefit of breaking a large widget into smaller pieces?',
      options: [
        "Significantly shrinks the APK file size",
        "When one item's data changes, only the corresponding child widget (like a specific `TaskTile`) needs to rebuild, instead of the entire list/parent screen rebuilding along with it, reducing rebuild scope and cost",
        "An extracted widget automatically gets its own key without needing to declare one",
        "No real benefit, just makes the code look tidier formally",
      ],
      answer: 1,
      hint: "Nhớ lợi ích thu hẹp phạm vi rebuild khi tách widget nhỏ.",
      rationale:
        "Tách widget giúp thu hẹp phạm vi rebuild chỉ còn item thay đổi, giảm chi phí rebuild tổng thể. A, C, D không đúng lợi ích kỹ thuật thực sự.",
    },
    {
      id: 290,
      question:
        'In "Demo 12.2 - Image Optimization," what does the `precacheImage()` technique do?',
      options: [
        "Removes an image from memory as soon as it's no longer used",
        "Pre-loads an image into the cache before it's actually needed for display, reducing lag when the image first appears on the UI",
        "Automatically compresses the image to a smaller format",
        "Only works with images fetched from the network, not with asset images",
      ],
      answer: 1,
      hint: "Nhớ precacheImage() tải trước ảnh vào cache.",
      rationale:
        "precacheImage() tải trước ảnh vào cache trước khi hiển thị, giảm giật lag khi ảnh xuất hiện lần đầu. A, C, D mô tả sai chức năng của hàm này.",
    },
    {
      id: 291,
      question:
        "Why does the lecture recommend resizing images before use, e.g. avoiding loading a 2000px image for a thumbnail that only displays at 50px?",
      options: [
        "Because Flutter doesn't support displaying images larger than 100px resolution",
        "Because decoding and storing in memory an image with a resolution far larger than the actual display size wastes significant memory and processing time, even though the final displayed result is just a small image",
        "Large images are always automatically rendered at low quality by Flutter regardless of original size",
        "No effect on performance at all, only affects server-side storage size",
      ],
      answer: 1,
      hint: "Nhớ chi phí giải mã/lưu ảnh lớn hơn nhiều so với kích thước hiển thị.",
      rationale:
        "Giải mã/lưu ảnh có độ phân giải lớn hơn nhiều so với kích thước hiển thị thực tế lãng phí đáng kể bộ nhớ và thời gian xử lý. A, C, D không đúng tác động hiệu năng thực sự.",
    },
    {
      id: 292,
      question:
        "Which command is used to analyze a detailed app-size breakdown by source code, assets, and packages?",
      options: [
        "flutter doctor",
        "flutter build apk --analyze-size",
        "flutter test",
        "flutter clean",
      ],
      answer: 1,
      hint: "Nhớ lệnh phân tích kích thước app chi tiết.",
      rationale:
        "`flutter build apk --analyze-size` dùng để phân tích chi tiết kích thước app. A, C, D không phải lệnh đúng cho mục đích này.",
    },
    {
      id: 293,
      question:
        'Per "Common Size Optimization Tips," what benefit does "Enable tree-shaking icons" (removing unused Material icons) bring to the released app?',
      options: [
        "Makes icons look visually nicer",
        "Removes Material Design icons not actually used in the app from the final build package, reducing the app's size",
        "Tree-shaking only affects app runtime speed, not size",
        "This technique only applies to images, not icons",
      ],
      answer: 1,
      hint: "Nhớ tree-shaking icon loại bỏ icon không dùng khỏi bản build.",
      rationale:
        "Tree-shaking icon loại bỏ các icon Material không dùng khỏi bản build cuối, giảm kích thước app. A, C, D không đúng lợi ích thực sự.",
    },
    {
      id: 294,
      question:
        "What is the difference between `flutter build apk --debug` and `flutter build apk --release`?",
      options: [
        "No difference at all in performance or size",
        "The debug build contains extensive debugging support info, not optimized for performance/size; the release build is optimized, removes debug overhead, giving performance and size closer to the real end-user experience",
        "`--release` only works on iOS, `--debug` only works on Android",
        "`--debug` always produces a smaller file size than `--release`",
      ],
      answer: 1,
      hint: "Nhớ debug build chưa được tối ưu như release build.",
      rationale:
        "Debug build mang overhead debug chưa tối ưu; release build được tối ưu, cho hiệu năng/kích thước gần với trải nghiệm thực tế người dùng cuối. A, C, D không đúng khác biệt thực sự giữa hai chế độ build.",
    },
    {
      id: 295,
      question:
        "What file format does Google Play require (instead of a traditional APK) when publishing an app to the store, and what is the corresponding build command?",
      options: [
        "A .aab file (Android App Bundle), built with the command `flutter build appbundle --release`",
        "A .ipa file, built with the command `flutter build ios --release`",
        "A .exe file, built with the command `flutter build windows --release`",
        "Google Play only accepts .apk files, no other format",
      ],
      answer: 0,
      hint: "Nhớ định dạng file Google Play yêu cầu thay cho APK.",
      rationale:
        "Google Play yêu cầu định dạng .aab, build bằng lệnh `flutter build appbundle --release`. B, C, D không đúng định dạng/lệnh cho Android trên Google Play.",
    },
    {
      id: 296,
      question:
        "What important rule governs `versionCode` in `android/app/build.gradle` when publishing consecutive updates?",
      options: [
        "It must always keep the same value across every release",
        "It must be an integer and must increase with every new release (every update pushed to the store)",
        "It doesn't matter, it can be any value including decreasing",
        "Only applies to apps running on iOS",
      ],
      answer: 1,
      hint: "Nhớ quy tắc versionCode phải tăng dần qua mỗi lần release.",
      rationale:
        "versionCode phải là số nguyên và phải tăng lên với mỗi lần phát hành mới. A, C, D không đúng quy tắc versioning bắt buộc này.",
    },
    {
      id: 297,
      question:
        'Before running `flutter build apk --release` for the official release, the lecture recommends first trying the app in "Profile Mode" (`flutter run --profile`). What is the most reasonable reason for this intermediate step?',
      options: [
        "Because Profile Mode is the only mandatory step to successfully build the release file",
        "Profile Mode removes most of Debug Mode's overhead while still allowing observation of near-real-world performance (smoothness/jank, build/render speed) before creating the official release build, helping catch performance issues early without waiting until the final packaging step",
        "Profile Mode and Release Mode are entirely identical so this step is unnecessary",
        "Profile Mode is only used to check syntax errors, unrelated to performance",
      ],
      answer: 1,
      hint: "Nhớ Profile Mode dùng để phát hiện sớm vấn đề hiệu năng.",
      rationale:
        "Profile Mode loại bỏ phần lớn overhead của Debug Mode nhưng vẫn quan sát được hiệu năng gần thực tế, giúp phát hiện sớm vấn đề trước khi build release chính thức. A, C, D không đúng lý do thực sự của bước này.",
    },
    {
      id: 298,
      question:
        'In the "Deployment Checklist" after completing Demo 12.4, which of the following items is mentioned?',
      options: [
        "Remove debug statements, clean up unused assets, ensure versionCode has been updated",
        "Double the number of animations in the app",
        "Delete the entire pubspec.yaml configuration file",
        "Convert the entire app to use Widget Test instead of Unit Test",
      ],
      answer: 0,
      hint: "Nhớ nội dung checklist trước khi deploy.",
      rationale:
        "Checklist nêu rõ việc xóa debug statement, dọn asset không dùng, đảm bảo versionCode đã cập nhật. B, C, D không phải mục hợp lý/được nêu trong checklist thực tế.",
    },
    {
      id: 299,
      question:
        "A student notices the Taskly app is janky when scrolling a long list (ListView). After applying: (1) extracting TaskTile with const, (2) using Selector instead of context.watch at screen level, (3) assigning ValueKey(task.id) to each item — how do these three changes work together to reduce scroll jank?",
      options: [
        "These three techniques are unrelated to each other and only one of them actually has an effect",
        "Widget extraction + const reduces the rebuild cost of each item when unnecessary; Selector narrows the scope of widgets rebuilt when data changes (only the list portion instead of the whole screen); and ValueKey helps Flutter correctly identify each item when the list changes to avoid mistaken rebuilds/state loss — the three techniques complement each other to reduce total per-frame workload",
        "Only ValueKey matters, the other two techniques have no measurable effect",
        "These techniques conflict with each other and should not be combined",
      ],
      answer: 1,
      hint: "Nhớ ba kỹ thuật bổ trợ nhau ở các khía cạnh khác nhau.",
      rationale:
        "Ba kỹ thuật bổ trợ nhau: extraction/const giảm chi phí rebuild từng item, Selector thu hẹp phạm vi rebuild, ValueKey đảm bảo nhận diện đúng item — cùng nhau giảm tổng khối lượng công việc mỗi frame. A, C, D không đúng cách các kỹ thuật này phối hợp thực sự.",
    },
    {
      id: 300,
      question:
        "Per Module 12's summary, what is the ultimate goal of the entire process of optimizing and packaging the Taskly app?",
      options: [
        "Simply to reduce the project's number of lines of code",
        "To produce a performance-optimized Release build, verify the app's size, and be ready for real-world deployment (production-ready)",
        "To completely eliminate the need for writing Unit Tests in future projects",
        "To convert the entire app from Flutter to a native platform",
      ],
      answer: 1,
      hint: "Nhớ mục tiêu cuối cùng của Module 12 là production-ready.",
      rationale:
        "Mục tiêu cuối cùng là tạo được Release build tối ưu hiệu năng, kiểm tra kích thước, sẵn sàng triển khai thực tế (production-ready). A, C, D không đúng mục tiêu cuối được nêu trong module.",
    },
    {
      id: 301,
      question:
        "What is the basic difference between Implicit Animation and Explicit Animation in Flutter?",
      options: [
        "Implicit Animation needs a manual AnimationController, Explicit Animation doesn't",
        "Implicit Animation automatically interpolates between old and new values when a property changes, without needing to manage an AnimationController manually; Explicit Animation requires explicitly declaring and controlling an AnimationController",
        "The two animation types are entirely identical, just different names",
        "Implicit Animation only works on iOS, Explicit Animation only works on Android",
      ],
      answer: 1,
      hint: "Nhớ Implicit Animation tự động nội suy, không cần controller thủ công.",
      rationale:
        "Implicit Animation tự động nội suy giá trị khi property thay đổi, không cần quản lý controller thủ công; Explicit Animation cần khai báo/điều khiển AnimationController rõ ràng. A, C, D không đúng đặc điểm kỹ thuật thực sự.",
    },
    {
      id: 302,
      question:
        "Which of the following widgets is a textbook example of Implicit Animation?",
      options: [
        "AnimationController",
        "AnimatedContainer",
        "Tween",
        "CurvedAnimation",
      ],
      answer: 1,
      hint: "Nhớ widget minh họa điển hình cho Implicit Animation.",
      rationale:
        "`AnimatedContainer` là ví dụ điển hình của Implicit Animation — tự động animate khi property (màu, kích thước...) thay đổi. A, C, D thuộc Explicit Animation hoặc công cụ hỗ trợ, không phải widget Implicit Animation.",
    },
    {
      id: 303,
      question:
        "What required parameter does `AnimationController` need to work, illustrating the connection between animation and widget lifecycle?",
      options: [
        "`context` — because animation must be tied to BuildContext",
        "`vsync` — usually provided by `TickerProviderStateMixin`, to sync the animation with displayed frames and avoid wasting resources when the widget isn't visible",
        "`theme` — so the animation applies the correct color",
        "`key` — so the animation can be tested",
      ],
      answer: 1,
      hint: "Nhớ tham số bắt buộc để đồng bộ animation với vòng đời widget.",
      rationale:
        "`vsync` (thường lấy từ TickerProviderStateMixin) đồng bộ animation với các frame hiển thị, tránh lãng phí tài nguyên khi widget không hiển thị. A, C, D không phải tham số bắt buộc của AnimationController.",
    },
    {
      id: 304,
      question:
        "Given an AnimationController with a repeating animation created in initState() using SingleTickerProviderStateMixin: if a developer forgets to call `_controller.dispose()` in `dispose()`, what is the most likely consequence?",
      options: [
        "No consequence at all because Dart automatically garbage-collects every object",
        "The `AnimationController` (especially while `repeat()`-ing) keeps running even after the widget is removed from the tree, causing a memory leak and wasting CPU resources",
        "The app crashes immediately when the widget is disposed",
        "The animation automatically stops because Flutter always tracks widget lifecycle",
      ],
      answer: 1,
      hint: "Nhớ hệ quả khi quên dispose() một controller đang repeat().",
      rationale:
        "Quên dispose() khiến AnimationController đang repeat() tiếp tục chạy sau khi widget đã bị gỡ, gây rò rỉ bộ nhớ và lãng phí CPU. A sai vì GC của Dart không thể thu hồi đối tượng vẫn được Ticker tham chiếu; C, D không đúng hành vi thực tế của Flutter.",
    },
    {
      id: 305,
      question: "What is `CurvedAnimation` in Flutter used for?",
      options: [
        "Drawing a geometric curve shape on screen",
        "Applying an easing curve (e.g. `Curves.easeIn`) onto an existing linear Animation, changing how the animation's value varies over time (uneven fast/slow) instead of linearly",
        "Fully replacing AnimationController",
        "Only usable with SliverAppBar",
      ],
      answer: 1,
      hint: "Nhớ CurvedAnimation áp dụng easing curve lên animation tuyến tính.",
      rationale:
        "CurvedAnimation áp dụng đường cong easing lên một Animation tuyến tính, làm giá trị animation thay đổi không đều theo thời gian. A, C, D mô tả sai chức năng của nó.",
    },
    {
      id: 306,
      question:
        "Compare using `AnimatedContainer` (implicit) versus manually writing `AnimationController` + `Tween` + `AnimatedBuilder` (explicit) for a simple background color-change effect on button tap. When should the explicit approach be preferred despite being more complex?",
      options: [
        "Never use explicit, implicit is always better in every case",
        "When you need detailed control over the animation (pausing, reversing, conditional repeating, synchronizing multiple animations at once, or reacting to complex events) — capabilities that a simple implicit widget doesn't provide",
        "Explicit is always faster than implicit in render performance so it should always be used",
        "Both approaches have an entirely identical API so there's no difference to consider",
      ],
      answer: 1,
      hint: "Nhớ dùng explicit khi cần kiểm soát chi tiết animation.",
      rationale:
        "Nên dùng explicit khi cần kiểm soát chi tiết (tạm dừng, đảo chiều, lặp có điều kiện, đồng bộ nhiều animation, phản ứng sự kiện phức tạp) — vượt quá khả năng của widget implicit đơn giản. A, C, D không đúng nguyên tắc lựa chọn thực sự.",
    },
    {
      id: 307,
      question:
        "BLoC (Business Logic Component) is a state-management architecture pattern in Flutter, based on which core concept?",
      options: [
        "A parent widget passes data directly to a child widget via the constructor",
        "The input stream is Events, the output stream is States — BLoC receives an Event, processes business logic, then emits a new State for the UI to listen to and update",
        "Only using SharedPreferences to store state",
        "There's no core concept, BLoC is just another name for setState",
      ],
      answer: 1,
      hint: "Nhớ luồng vào là Events, luồng ra là States trong BLoC.",
      rationale:
        "Khái niệm cốt lõi của BLoC: luồng vào = Events, luồng ra = States, xử lý logic nghiệp vụ ở giữa. A, C, D mô tả sai bản chất cơ bản của BLoC.",
    },
    {
      id: 308,
      question:
        "In the `flutter_bloc` package, what is the correct data-flow relationship between Event, Bloc, and State?",
      options: [
        "State → Bloc → Event",
        "UI sends an Event into the Bloc → Bloc processes and maps the Event into a new State → Bloc emits the State → UI listens to the State to rebuild",
        "Event and State are the same concept, interchangeable",
        "Bloc only receives State, not Event",
      ],
      answer: 1,
      hint: "Nhớ chiều luồng dữ liệu đúng: Event vào, State ra.",
      rationale:
        "Luồng đúng: UI gửi Event → Bloc xử lý/map thành State mới → emit State → UI lắng nghe và rebuild. A đảo ngược chiều; C, D mô tả sai mối quan hệ giữa Event/State/Bloc.",
    },
    {
      id: 309,
      question:
        "How does `Cubit` in the `flutter_bloc` package differ from a traditional `Bloc`?",
      options: [
        "Cubit cannot manage state, only Bloc can",
        "Cubit is a simplified version of Bloc — it doesn't need a separate Event class defined, instead directly calling methods to emit new States, reducing boilerplate compared to a full Bloc",
        "Cubit only works with int data",
        "Cubit and Bloc are entirely identical in API, no difference",
      ],
      answer: 1,
      hint: "Nhớ Cubit là phiên bản đơn giản hóa của Bloc.",
      rationale:
        "Cubit là phiên bản đơn giản của Bloc — không cần định nghĩa class Event riêng, gọi method trực tiếp để emit State mới, giảm boilerplate so với Bloc đầy đủ. A, C, D mô tả sai đặc điểm của Cubit.",
    },
    {
      id: 310,
      question:
        "Given a simple Cubit code (CounterCubit extends Cubit<int>, with increment() method calling emit(state + 1)). Which widget in `flutter_bloc` best listens to `CounterCubit` and automatically rebuilds the UI whenever the `state` value changes?",
      options: [
        "`FutureBuilder`",
        "`BlocBuilder<CounterCubit, int>`",
        "`StreamController`",
        "`InheritedWidget` (used directly, without the library)",
      ],
      answer: 1,
      hint: "Nhớ widget chuẩn của flutter_bloc để lắng nghe Cubit.",
      rationale:
        "`BlocBuilder<CounterCubit, int>` là API chuẩn của flutter_bloc để lắng nghe Cubit và tự động rebuild khi state đổi. A, C, D không phải widget/API phù hợp cho mục đích này.",
    },
    {
      id: 311,
      question:
        "Per BLoC pattern's design philosophy, why should business logic be entirely separated from the UI widget?",
      options: [
        "Because Flutter doesn't allow writing logic inside a widget",
        "To increase testability (testing logic independently without building the UI), reuse logic across different platforms/screens, and keep the widget focused on display",
        "Because BLoC runs faster if the logic is inside the widget",
        "No clear reason, it's just a naming convention",
      ],
      answer: 1,
      hint: "Nhớ mục đích tách biệt logic nghiệp vụ khỏi UI.",
      rationale:
        "Việc tách biệt giúp tăng khả năng test độc lập, tái sử dụng logic trên nhiều nền tảng/màn hình, và giữ widget tập trung vào hiển thị. A, C, D mô tả sai mục đích của triết lý thiết kế này.",
    },
    {
      id: 312,
      question:
        "What is the basic difference between `SliverAppBar` and a regular `AppBar`?",
      options: [
        "SliverAppBar can only display icons, not text",
        "SliverAppBar is designed to work inside a `CustomScrollView`, able to expand, shrink, or show/hide flexibly based on scroll behavior, while a regular AppBar has a fixed position",
        "SliverAppBar cannot contain action buttons",
        "The two widgets are entirely identical, just different names",
      ],
      answer: 1,
      hint: "Nhớ SliverAppBar hoạt động linh hoạt theo scroll trong CustomScrollView.",
      rationale:
        "SliverAppBar hoạt động trong CustomScrollView, có thể mở rộng/thu nhỏ/ẩn hiện linh hoạt theo scroll, khác với AppBar thường có vị trí cố định. A, C, D mô tả sai đặc điểm này.",
    },
    {
      id: 313,
      question:
        "Which parent widget is `SliverAppBar` usually used with to function correctly?",
      options: [
        "`Scaffold` directly, with no other wrapping widget needed",
        "`CustomScrollView`, placed inside the `slivers: [...]` property",
        "A regular `ListView` (non-sliver form)",
        "`Column`",
      ],
      answer: 1,
      hint: "Nhớ SliverAppBar thường dùng chung với CustomScrollView.",
      rationale:
        "SliverAppBar thường dùng với CustomScrollView, đặt bên trong `slivers: [...]`. A, C, D không đúng cách dùng chuẩn.",
    },
    {
      id: 314,
      question:
        "What are the `flexibleSpace` and `expandedHeight` properties of `SliverAppBar` used for?",
      options: [
        "`flexibleSpace` defines the content shown when the AppBar is in its expanded state (e.g. a large background image); `expandedHeight` sets the maximum height when the AppBar is fully expanded — as you scroll down, the AppBar gradually shrinks to its standard height",
        "These two properties only affect color, not size",
        "`expandedHeight` determines the maximum number of action buttons",
        "`flexibleSpace` only works when there's no `CustomScrollView`",
      ],
      answer: 0,
      hint: "Nhớ chức năng riêng biệt của flexibleSpace và expandedHeight.",
      rationale:
        "flexibleSpace định nghĩa nội dung khi AppBar mở rộng; expandedHeight đặt chiều cao tối đa khi mở rộng hoàn toàn, thu nhỏ dần khi scroll. B, C, D mô tả sai chức năng hai thuộc tính này.",
    },
    {
      id: 315,
      question:
        "In the Sliver ecosystem, how do `SliverList` and `SliverGrid` differ from a regular `ListView`/`GridView`?",
      options: [
        "No difference at all, the two types are entirely equivalent in every context",
        "`SliverList`/`SliverGrid` are designed to combine multiple different scrollable content types (like SliverAppBar, SliverList, SliverGrid) within a SINGLE `CustomScrollView` with a seamless scroll effect, while `ListView`/`GridView` are independent scrollable widgets, hard to coordinate scroll effects with other scrollable widgets",
        "SliverList only displays up to 10 elements",
        "SliverGrid doesn't support displaying images",
      ],
      answer: 1,
      hint: "Nhớ Sliver được thiết kế để kết hợp nhiều loại nội dung cuộn trong một CustomScrollView.",
      rationale:
        "SliverList/SliverGrid thiết kế để kết hợp liền mạch nhiều nội dung cuộn trong một CustomScrollView, khác với ListView/GridView độc lập, khó phối hợp hiệu ứng cuộn. A, C, D không đúng đặc điểm kỹ thuật thực sự.",
    },
    {
      id: 316,
      question: "What does Golden Testing in Flutter check?",
      options: [
        "Asynchronous data-processing logic (Future/Stream)",
        'Comparing a widget\'s rendered UI against a saved reference ("golden") image, to detect unintended visual regressions',
        "Checking API response speed",
        "Checking the app's security",
      ],
      answer: 1,
      hint: "Nhớ Golden Testing so sánh UI render với ảnh tham chiếu.",
      rationale:
        "Golden Testing so sánh UI render của widget với ảnh golden đã lưu để phát hiện hồi quy giao diện. A, C, D mô tả sai mục đích của loại test này.",
    },
    {
      id: 317,
      question:
        "In `flutter_test`, which function is used to compare the current widget against a saved golden image?",
      options: [
        "`expect(find.text(...), findsOneWidget)`",
        "`matchesGoldenFile('image_label.png')` combined with `expectLater()`",
        "`tester.pumpAndSettle()`",
        "`verify()`",
      ],
      answer: 1,
      hint: "Nhớ hàm chuẩn dùng để so sánh với golden image.",
      rationale:
        "`matchesGoldenFile()` kết hợp `expectLater()` là API chuẩn của flutter_test để so sánh với golden image. A, C, D không phải hàm đúng cho mục đích này.",
    },
    {
      id: 318,
      question:
        'A student group runs a Golden Test on Windows, but the original golden image was created on macOS, causing the test to fail repeatedly even though the UI looks "identical" to the naked eye. What is the most common cause of this issue?',
      options: [
        "Golden Tests never work reliably on any operating system",
        "Font rendering and anti-aliasing can differ slightly between operating systems/Flutter versions, causing pixel-by-pixel images to not match exactly even if hard to notice by eye — so Golden Tests are usually recommended to run consistently on the same environment (e.g. a fixed CI) to avoid false failures",
        "Because SliverAppBar is incompatible with Golden Test",
        "Because Windows doesn't support running `flutter test`",
      ],
      answer: 1,
      hint: "Nhớ khác biệt render font/anti-aliasing giữa các hệ điều hành.",
      rationale:
        "Sự khác biệt nhỏ về render font/anti-aliasing giữa các OS/phiên bản Flutter gây lệch pixel dù mắt thường khó nhận ra, nên nên chạy Golden Test trên môi trường nhất quán (CI cố định). A, C, D không đúng nguyên nhân kỹ thuật thực sự.",
    },
    {
      id: 319,
      question:
        'In the general Software Development Life Cycle (SDLC), what is the main role of the "Analysis" phase?',
      options: [
        "Writing detailed source code for each feature",
        "Gathering and clarifying requirements from users/clients before starting design and coding",
        "Packaging and publishing the product to a store",
        "Running the final automated test before release",
      ],
      answer: 1,
      hint: "Nhớ vai trò của giai đoạn Analysis trong SDLC.",
      rationale:
        "Giai đoạn Analysis tập trung thu thập/làm rõ yêu cầu trước khi thiết kế và code. A, C, D là các giai đoạn khác trong SDLC, không phải Analysis.",
    },
    {
      id: 320,
      question: 'What does "Technical Debt" refer to in software development?',
      options: [
        "A direct financial cost paid to a cloud service provider",
        'The future cost (time to fix bugs, difficulty maintaining, difficulty scaling) arising from rushed or unoptimized design/coding decisions made now, similar to a "debt" that must be paid off gradually over time',
        "The maximum number of lines of code allowed in a project",
        "A mandatory fee paid when publishing an app to Google Play/App Store",
      ],
      answer: 1,
      hint: "Nhớ Technical Debt là chi phí tương lai từ quyết định vội vàng hiện tại.",
      rationale:
        'Technical Debt là chi phí tương lai phát sinh từ các quyết định thiết kế/code vội vàng hiện tại, giống như một khoản "nợ" phải trả dần. A, C, D không đúng khái niệm thực sự.',
    },
    {
      id: 321,
      question:
        'A group of students intentionally skips writing Unit Tests and separating clear architecture (State/Repository) to "finish the project quickly," resulting in it later being very hard to fix bugs or add new features. What concept from the lecture does this illustrate, and how does it relate to Repository Pattern and Testing Pyramid?',
      options: [
        "This is unrelated to any concept taught in previous modules",
        'This is an example of "Technical Debt" — skipping clean architecture (Repository Pattern from Module 3) and testing (Testing Pyramid from Module 11) saves short-term time but increases long-term maintenance/bug-fixing costs, matching the "borrow now, pay interest later" nature of technical debt',
        "This is an example of Golden Testing",
        "This is the recommended approach for performance optimization per Module 12",
      ],
      answer: 1,
      hint: "Nhớ mối liên hệ giữa việc bỏ qua kiến trúc/test với Technical Debt.",
      rationale:
        'Đây là ví dụ về Technical Debt: bỏ qua kiến trúc sạch và testing tiết kiệm thời gian ngắn hạn nhưng tăng chi phí bảo trì dài hạn, đúng bản chất "vay trước, trả lãi sau" của nợ kỹ thuật. A, C, D không đúng khái niệm/mối liên hệ chính xác.',
    },
    {
      id: 322,
      question:
        'In the software development lifecycle, where is the "Testing" phase usually placed relative to "Implementation" (coding)?',
      options: [
        "Testing always happens before Implementation in every development model",
        "Testing usually happens after (or continuously in parallel with, depending on Agile/TDD models) the Implementation phase, to verify the written code works as required per the analysis",
        "Testing has no relationship with Implementation at all",
        "Testing is only ever done once, after the app has been released",
      ],
      answer: 1,
      hint: "Nhớ vị trí thông thường của Testing so với Implementation.",
      rationale:
        "Testing thường diễn ra sau (hoặc song song liên tục theo Agile/TDD) với Implementation, để xác minh code đáp ứng yêu cầu phân tích. A, C, D không đúng vị trí thông thường của Testing trong SDLC.",
    },
    {
      id: 323,
      question:
        "Consider the Taskly app rewritten with BLoC architecture instead of Provider: `TaskBloc` receives `AddTaskEvent`/`ToggleTaskEvent`, then emits a new `TaskState`. Compared to using `TaskProvider` (ChangeNotifier), what is the core difference in the processing flow?",
      options: [
        "No difference at all, BLoC and Provider are entirely identical in how they receive changes from the UI",
        'With ChangeNotifier (Provider), the UI directly calls a method on the Provider (e.g. `taskProvider.addTask(...)`) and the Provider mutates itself then calls `notifyListeners()`; with BLoC, the UI must "dispatch" an Event object (e.g. `bloc.add(AddTaskEvent(...))`) into the input stream, and the Bloc processes that Event to emit a new State, entirely decoupled from a direct call',
        "BLoC cannot be used to build a Todo app like Taskly",
        "Provider is required to use Events, just under a different name",
      ],
      answer: 1,
      hint: "Nhớ khác biệt giữa gọi method trực tiếp (Provider) và dispatch Event (BLoC).",
      rationale:
        "Provider dùng gọi method trực tiếp + notifyListeners(); BLoC dùng dispatch Event được xử lý thành State emit ra, tách biệt khỏi lệnh gọi trực tiếp — đây là khác biệt cốt lõi. A, C, D không đúng cách hai kiến trúc này thực sự hoạt động.",
    },
    {
      id: 324,
      question:
        "Why do many real-world Flutter projects choose BLoC instead of just `setState` for large-scale apps with many screens sharing complex state?",
      options: [
        "Because `setState` isn't supported by Flutter in large apps",
        "BLoC clearly separates the Event/State flow, making logic easier to test independently (without building UI), easier to trace data flow explicitly, and scales better when many screens need to share and react to the same complex state source — something local `setState` struggles with as an app grows",
        "`setState` only works with exactly 1 screen in the entire app",
        "BLoC is always faster than setState in absolute render performance in every case",
      ],
      answer: 1,
      hint: "Nhớ lý do BLoC mở rộng tốt hơn setState cho app lớn.",
      rationale:
        "Việc tách rõ Event/State giúp logic dễ test độc lập, dễ truy vết luồng dữ liệu, và mở rộng tốt hơn khi nhiều màn hình chia sẻ state phức tạp — điều setState cục bộ gặp khó khi app lớn dần. A, C, D không đúng lý do thực sự chọn BLoC.",
    },
    {
      id: 325,
      question:
        "In `flutter_bloc`, how does the `BlocListener` widget differ from `BlocBuilder`?",
      options: [
        "The two widgets are entirely identical, interchangeable in every case",
        "`BlocBuilder` is used to rebuild the UI based on the new state (returns a widget); `BlocListener` is used to perform one-time side-effects (e.g. navigation, showing a SnackBar/Dialog) when the state changes, WITHOUT rebuilding the UI",
        "`BlocListener` can only be used with Cubit, not with Bloc",
        "`BlocBuilder` is only used for Golden Testing",
      ],
      answer: 1,
      hint: "Nhớ BlocBuilder rebuild UI, BlocListener xử lý side-effect.",
      rationale:
        "BlocBuilder rebuild UI dựa trên state mới; BlocListener thực hiện side-effect một lần khi state đổi mà không rebuild UI. A, C, D mô tả sai khác biệt giữa hai widget này.",
    },
    {
      id: 326,
      question:
        "If a Golden Test is set up to run automatically in a CI/CD pipeline before merging code, what is the main purpose of doing this?",
      options: [
        "Increases the speed of building the release app",
        "Automatically catches unintended visual regressions caused by code changes early, before those changes get merged into the main branch, helping ensure UI consistency over time",
        "Fully replaces Unit Test and Widget Test",
        "Only has the effect of checking the app's network speed",
      ],
      answer: 1,
      hint: "Nhớ mục đích chạy Golden Test tự động trong CI/CD.",
      rationale:
        "Chạy Golden Test trong CI/CD giúp phát hiện sớm các hồi quy giao diện trước khi merge vào nhánh chính, đảm bảo tính nhất quán UI theo thời gian. A, C, D không đúng mục đích thực sự của việc tích hợp này.",
    },
  ],
};

export default prm393;
