# CODE2SRS — Đặc tả output

File này quy định **mỗi file cần có nội dung gì**.
* Cách viết (văn phong, điều kiện, format tham chiếu…): [convention.md](convention.md)
* Hình dạng từng file: [templates/](templates/)

## 1. Mục đích

Sinh tài liệu SRS (Software Requirements Specification) bằng cách đọc ngược từ source code.
* Người đọc: BA, QA, PM, dev mới.
* Tài liệu mô tả **hệ thống đang làm gì**, dựa trên code thực tế, không dựa trên suy đoán.

## 2. Cấu trúc output

```
srs
├── overview.md             // tổng quan dự án + mục lục
├── layout.md               // các thành phần UI dùng chung (header, sidebar, footer…)
├── common-words.md         // thuật ngữ & enum
├── database.md             // thiết kế database
├── cron-jobs.md            // danh sách cron job
├── features                // tài liệu theo màn hình, gom theo nhóm
│   ├── <group-1>           // ví dụ: admin
│   │   ├── <screen-1>.md   // mỗi màn một file
│   │   └── <screen-2>.md
│   └── <group-n>
├── flows                   // các luồng nghiệp vụ trải qua nhiều màn / cron job
│   ├── <flow-1>.md
│   └── <flow-n>.md
└── images                  // screenshot & hình ảnh khác, cấu trúc giống features
    ├── <group-1>
    └── <group-n>
```

| File | Template |
|---|---|
| `features/<group>/<screen>.md` | [templates/screen.md](templates/screen.md) |
| `flows/<flow>.md` | [templates/flow.md](templates/flow.md) |
| `layout.md` | [templates/layout.md](templates/layout.md) |
| `cron-jobs.md` | [templates/cron-jobs.md](templates/cron-jobs.md) |
| `common-words.md` | [templates/common-words.md](templates/common-words.md) |
| `database.md` | [templates/database.md](templates/database.md) |
| `overview.md` | [templates/overview.md](templates/overview.md) |

Mọi file (trừ `overview.md`) đều kết thúc bằng mục **Nguồn**: danh sách file code tương ứng, để kiểm chứng và cập nhật khi code thay đổi.

## 3. Chi tiết từng phần

### 3.1. images

* Lưu screenshot màn hình. Khoanh và đánh số các thành phần trên màn.
* Ngoài button, input, link… thì đánh số cả các thành phần thỏa **một trong** các điều kiện bên dưới:
  * Có điều kiện ẩn/hiện hoặc enable/disable
  * Click vào thì chuyển sang màn/trang khác
  * Hiển thị nội dung động (dữ liệu lấy từ DB/API, hoặc tính toán ra)
* Số trên ảnh phải khớp với cột **No** trong bảng thành phần.
* Lưu các hình ảnh khác ngoài screenshot nếu cần (sơ đồ…).
* Không chụp được screenshot thì vẫn viết bảng thành phần, và đặt marker "Chưa có screenshot" (convention.md mục 10).

### 3.2. features

* Gom các màn theo nhóm tính năng, mỗi nhóm là một thư mục. Ví dụ: `admin`, `user`.
* Mỗi màn là một file `.md`.
* Modal/dialog/drawer **không** tách file riêng mà mô tả trong mục "Screenshot bổ sung" của màn mở ra nó.
* Phần đầu file:
  * Tên trên menu
  * URL
  * Điều kiện truy cập, và kết quả khi không thỏa mãn
    * Không cần ghi trường hợp chưa đăng nhập bị redirect về login.
  * Mục đích của màn (1–2 câu)
* **Bảng thành phần**, cột Mô tả gồm các nhãn sau (nhãn nào không có thì bỏ):
  * **Hiển thị:** điều kiện ẩn/hiện
  * **Enable/Disable:** điều kiện enable/disable
  * **Dữ liệu:** hiển thị thông tin gì, điều kiện lọc, sắp xếp, phân trang, format
  * **Mặc định:** giá trị mặc định
  * **Enum:** ý nghĩa giá trị, link đến enum
  * **Input:** validate (bắt buộc, độ dài, format, unique…) và message lỗi. Validate FE và BE khác nhau thì ghi cả hai.
  * **Click:** chuyển sang màn khác / mở thành phần UI khác / chạy xử lý
  * **Thay đổi dữ liệu:** thêm/sửa/xóa dữ liệu gì. Logic phức tạp thì link sang mục Logic xử lý.
* **Screenshot bổ sung:** modal, dropdown, các trạng thái khác của màn. Mỗi cái một mục, có bảng thành phần riêng nếu cần.
* **Logic xử lý:** viết cho thao tác phức tạp (nhiều bước, nhiều bảng, nhiều nhánh lỗi, gọi service ngoài). Mỗi xử lý gồm:
  * Kích hoạt
  * Điều kiện tiên quyết
  * Các bước xử lý (theo thứ tự)
  * Dữ liệu bị thay đổi
  * Các trường hợp lỗi và kết quả hiển thị cho người dùng
  * Tác động phụ: gửi mail, push notification, ghi log, gọi API ngoài…

### 3.3. flows

* Dùng cho các tính năng trải qua nhiều màn, hoặc có cron job / hệ thống ngoài tham gia. Ví dụ: đăng ký → xác thực email → hoàn thiện hồ sơ.
* Mỗi flow là một file, gồm:
  * Mục đích, actor, điều kiện bắt đầu, kết quả khi kết thúc
  * Sơ đồ sequence (Mermaid)
  * Bảng các bước, link về màn / cron job
  * Nhánh rẽ / lỗi

### 3.4. cron-jobs.md

* Bảng tổng hợp gồm: Tên, Lịch chạy (cron expression + diễn giải + timezone), Mô tả, Dữ liệu bị thay đổi.
* Cron job có logic phức tạp thì thêm mục riêng bên dưới bảng.

### 3.5. common-words.md

File chứa diễn giải chi tiết của thuật ngữ và enum, để các file khác link đến.

* **Thuật ngữ:** các khái niệm nghiệp vụ dùng lặp lại. Mỗi thuật ngữ gồm giải thích nghiệp vụ và điều kiện technical.
  * Đây là nơi duy nhất ghi điều kiện technical; các file khác chỉ link đến.
* **Enum:** mỗi enum là một heading `Enum <bảng>.<cột>`, gồm:
  * Ý nghĩa enum
  * Bảng giá trị: giá trị trong DB, text hiển thị, ý nghĩa, khi nào có giá trị này

### 3.6. overview.md

* Giới thiệu ngắn gọn: mục đích, đối tượng người dùng
* Các role và quyền hạn tổng quát
* Tech stack chính. Chỉ liệt kê, không đi sâu.
* Mục lục link đến tất cả các file trong `srs/`

### 3.7. layout.md

* Các thành phần UI lặp lại qua nhiều màn: header, sidebar, footer, breadcrumb, notification…
* Các màn trong `features/` không mô tả lại các thành phần này, chỉ link đến `layout.md`.

### 3.8. database.md

* Sơ đồ quan hệ (ERD), nếu số bảng không quá lớn
* Mỗi bảng là một heading dùng tên bảng thật, gồm:
  * Mô tả bảng lưu gì
  * Bảng cột: tên, kiểu, null, mặc định, mô tả (FK, link enum)
  * Index / unique constraint quan trọng
  * **Được sử dụng bởi:** màn, cron job, flow tác động đến bảng (có link), ghi rõ đọc (R) hay ghi (W)
