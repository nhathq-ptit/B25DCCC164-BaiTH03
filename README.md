# ShopMini - Bài thực hành 03 (React + TypeScript + Redux Toolkit + Context API)

- **Sinh viên thực hiện:** Hoàng Quang Nhật
- **Mã sinh viên:** B25DCCC164

---

## Phân tích kiến trúc quản lý State trong ứng dụng

Ứng dụng chia dữ liệu (state) thành 3 cấp độ dựa trên phạm vi sử dụng, tần suất cập nhật và tính chất của dữ liệu:

### 1. Local State (`useState`)

Sử dụng cho các dữ liệu chỉ phục vụ nội bộ bên trong một component duy nhất, không cần chia sẻ sang các trang hoặc component khác:

- **Từ khóa tìm kiếm (`searchTerm` ở `HomePage`)**: Chỉ dùng để lọc danh sách sản phẩm hiển thị tại trang chủ, khi rời trang không cần lưu giữ toàn cục
- **Dữ liệu các trường nhập liệu trong Form (`username`, `password` ở `LoginPage`; `phone`, `address` ở `CheckoutPage`)**: State tạm thời phục vụ thao tác nhập liệu và kiểm tra dữ liệu trước khi submit
- **Trạng thái thông báo & dữ liệu chi tiết tạm thời (`error` khi đăng nhập sai, `isOrdered` khi đặt hàng thành công, `fetchedProduct` / `loading` khi tải lẻ 1 sản phẩm ở `ProductDetailPage`)**: Chỉ điều khiển giao diện cục bộ tại thời điểm người dùng tương tác

### 2. React Context API (`ThemeContext` & `AuthContext`)

Sử dụng cho các trạng thái toàn cục (global) cần dùng chung ở nhiều component khác nhau nhưng **ít thay đổi** và không có luồng biến đổi dữ liệu phức tạp:

- **`ThemeContext` (`theme`, `toggleTheme`)**: Lưu trạng thái giao diện sáng/tối (`light` / `dark`). Dữ liệu này áp dụng cho toàn bộ ứng dụng và chỉ thay đổi khi người dùng bấm nút chuyển đổi trên `Header`
- **`AuthContext` (`user`, `login`, `logout`)**: Quản lý phiên đăng nhập của người dùng. Thông tin `user` cần được truy cập ở `Header` (hiển thị tên và nút đăng xuất), `ProtectedRoute` (chặn truy cập `/checkout` nếu chưa đăng nhập) và `CheckoutPage` (hiển thị tên người nhận)

### 3. Redux Toolkit (`productsSlice` & `cartSlice`)

Sử dụng cho các dữ liệu nghiệp vụ cốt lõi có **cấu trúc phức tạp, tần suất cập nhật cao** và cần tách biệt logic xử lý ra khỏi giao diện:

- **`productsSlice` (`items`, `status`, `error`)**: Quản lý danh sách sản phẩm lấy từ API bất đồng bộ thông qua `createAsyncThunk` (`fetchProducts`). Redux giúp quản lý tập trung 3 trạng thái `loading`, `succeeded`, `failed` và lưu cache danh sách sản phẩm trong store để các trang (`HomePage`, `ProductDetailPage`) dùng lại mà không phải gọi lại API nhiều lần
- **`cartSlice` (`items` + các selectors `selectTotalQuantity`, `selectTotalPrice`)**: Quản lý giỏ hàng với nhiều thao tác biến đổi phức tạp (`addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`). Dữ liệu giỏ hàng liên tục thay đổi và cần đồng bộ tức thì giữa nhiều nơi: nút thêm ở `ProductCard`/`ProductDetailPage`, badge đếm số lượng ở `Header`, danh sách chỉnh sửa ở `CartPage` và bước xóa giỏ hàng khi đặt hàng ở `CheckoutPage`
