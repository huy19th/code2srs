# CODE2SRS — Đặc tả output

## 1. Mục đích

Sinh tài liệu SRS (Software Requirements Specification) bằng cách đọc ngược từ source code. Tài liệu viết cho người đọc nghiệp vụ (BA, QA, PM, dev mới), mô tả **hệ thống đang làm gì** dựa trên code thực tế, không phải dựa trên suy đoán.

## 2. Quy ước chung

### 2.1. Ngôn ngữ
* Tài liệu viết bằng tiếng Việt.
* Text trên UI giữ nguyên văn như trong code/i18n. Nếu không phải tiếng Việt thì ghi kèm bản dịch: `Settings (Cài đặt)`.
* Tên bảng, tên cột, tên hàm, đường dẫn file giữ nguyên, đặt trong backtick: `users.email`.

### 2.2. Đặt tên file & thư mục
* Tên file và thư mục dùng `kebab-case`, không dấu, tiếng Anh. Ví dụ: `user-list.md`, `admin/`.
* Ảnh của một màn đặt trong `images/<group>/`, tên theo màn:
  * `<screen>.png`: screenshot chính
  * `<screen>-<n>.png`: screenshot bổ sung (modal, dropdown, trạng thái khác…)

### 2.3. Tham chiếu (hyperlink)
* Cột DB ghi theo dạng `<bảng>.<cột>` và link đến bảng: [`users.email`](../../database.md#users)
* Thuật ngữ và enum link đến heading tương ứng trong `common-words.md`: [user đã bị xóa](../../common-words.md#user-đã-bị-xóa)
* Màn khác: link đến file `.md` của màn đó.
* Mọi link dùng đường dẫn tương đối.
* Anchor của heading tạo theo quy tắc GitHub: chữ thường, giữ dấu tiếng Việt, khoảng trắng → `-`, bỏ dấu câu (`.`, `,`, `(`, `)`, `/`…). Ví dụ: `#### Enum users.status` → `#enum-usersstatus`.
* Heading được tham chiếu phải là duy nhất trong file. Nếu trùng, anchor sẽ bị thêm hậu tố `-1`, `-2` và link dễ sai.

### 2.4. Truy vết nguồn
* Mỗi màn, flow, cron job, bảng đều ghi **Nguồn**: đường dẫn file code chính (kèm dòng nếu cần), để kiểm chứng và cập nhật lại khi code thay đổi.

### 2.5. Đánh dấu điểm chưa chắc chắn
* Khi code không đủ để kết luận (logic phụ thuộc config/env, gọi service ngoài, code chết, logic mâu thuẫn…) thì **không suy đoán**, mà đánh dấu:
  ```
  > ⚠️ **Cần xác nhận:** <mô tả điều chưa rõ>
  ```

## 3. Cấu trúc output

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

## 4. Chi tiết từng phần

### 4.1. images

* Lưu screenshot màn hình. Khoanh và đánh số các thành phần trên màn. Ngoài button, input, link… thì đánh số cả các thành phần thỏa **ít nhất một** điều kiện sau:
  * Có điều kiện ẩn/hiện hoặc enable/disable
  * Click vào thì chuyển sang màn/trang khác
  * Hiển thị nội dung động (dữ liệu lấy từ DB/API, hoặc tính toán ra)
* Số trên ảnh phải khớp với cột **No** trong bảng thành phần ở mục 4.2.
* Lưu các hình ảnh khác ngoài screenshot nếu cần (sơ đồ…).
* Nếu không chụp được screenshot (app không chạy được, thiếu data…) thì vẫn viết bảng thành phần, chỗ ảnh để placeholder:
  ```
  > 📷 **Chưa có screenshot:** <lý do>
  ```

### 4.2. features

* Gom các màn theo nhóm tính năng, mỗi nhóm là một thư mục. Ví dụ: `admin`, `user`.
* Mỗi màn là một file `.md`. Modal/dialog/drawer **không** tách file riêng mà mô tả bên trong màn mở ra nó.
* Nội dung một file màn:

````markdown
# <Tên màn>

| Mục | Nội dung |
|---|---|
| Tên trên menu | <text trên sidebar/navbar, kèm bản dịch nếu không phải tiếng Việt> |
| URL | `/admin/users/:id` (giải thích các param nếu có) |
| Điều kiện truy cập | <role/permission/trạng thái cần có>. Không đủ điều kiện thì: <redirect đến đâu / hiển thị 403 / ẩn menu…> |
| Nguồn | `src/pages/admin/users/[id].tsx`, `src/api/users.controller.ts` |

> Không cần ghi trường hợp chưa đăng nhập bị redirect về màn login, vì đó là hành vi mặc định.

## 1. Screenshot
![<screen>](../../images/<group>/<screen>.png)

## 2. Các thành phần trên màn hình

| No | Tên | Loại | Mô tả |
|---|---|---|---|
| 1 | Bảng danh sách user | Table | ... |
| 2 | Nút "Xóa" | Button | ... |

## 3. Screenshot bổ sung
### 3.1. Modal xác nhận xóa (mở từ No.2)
![<screen>-1](../../images/<group>/<screen>-1.png)
<bảng thành phần của modal, nếu cần>

## 4. Logic xử lý
### 4.1. <Tên xử lý>
...
````

* Cột **Mô tả** trong bảng thành phần ghi các ý sau (ý nào không có thì bỏ qua):
  * **Hiển thị:** điều kiện ẩn/hiện
  * **Enable/Disable:** điều kiện enable/disable
  * **Dữ liệu:** hiển thị thông tin gì, theo dạng [`<bảng>.<cột>`](../../database.md#<bảng>)
    * Điều kiện lọc: mô tả theo nghiệp vụ, link đến thuật ngữ trong `common-words.md`. Ví dụ: "chỉ hiển thị user [đang hoạt động](../../common-words.md#user-đang-hoạt-động)"
    * Sắp xếp: sort theo cột nào, tăng/giảm dần
    * Phân trang: số bản ghi/trang (nếu có)
    * Format: định dạng ngày, số, tiền tệ… (nếu có)
  * **Enum:** nếu hiển thị giá trị enum thì nêu ý nghĩa và link đến enum trong `common-words.md`
  * **Input:** với các ô nhập liệu thì ghi validate (bắt buộc, độ dài, format, unique…), giá trị mặc định, và message lỗi
  * **Click:**
    * Chuyển sang màn khác: link đến file `.md` của màn đó
    * Mở thành phần UI khác (modal, dropdown…): link đến mục tương ứng trong phần "Screenshot bổ sung"
  * **Thay đổi dữ liệu:** thao tác gì trên bảng nào. Ví dụ: "Cập nhật thông tin user (`users`)". Nếu logic phức tạp (nhiều bảng, nhiều điều kiện, gọi service ngoài, gửi mail…) thì ghi "Xem [4.x](#4x-...)" và mô tả chi tiết ở phần **Logic xử lý**.
* **Logic xử lý:** mỗi xử lý phức tạp một mục, gồm:
  * Điều kiện tiên quyết
  * Các bước xử lý (theo thứ tự)
  * Các bảng bị tác động (insert/update/delete)
  * Các trường hợp lỗi và kết quả hiển thị cho người dùng
  * Tác động phụ: gửi mail, push notification, ghi log, gọi API ngoài…

### 4.3. flows

* Mục 4.2 chưa đủ để mô tả các tính năng trải qua nhiều màn, hoặc có liên quan đến cron job / hệ thống ngoài. Ví dụ: đăng ký → xác thực email → hoàn thiện hồ sơ.
* Mỗi flow là một file `.md`, gồm:
  * Tên flow, mục đích
  * Actor tham gia (role người dùng, cron job, hệ thống ngoài)
  * Điều kiện bắt đầu và kết quả khi kết thúc
  * Sơ đồ sequence (Mermaid):
    ```mermaid
    sequenceDiagram
      actor U as User
      participant S as Màn đăng ký
      participant C as Cron gửi mail
      U->>S: Nhập thông tin, bấm "Đăng ký"
      S->>S: Tạo bản ghi users (status = pending)
      C->>U: Gửi email xác thực
    ```
  * Bảng các bước: No, Actor, Thao tác, Màn/Cron job (có hyperlink), Thay đổi dữ liệu
  * Các nhánh rẽ / trường hợp lỗi
  * Nguồn

### 4.4. cron-jobs.md

* Viết dưới dạng bảng gồm các cột:

| Tên | Lịch chạy | Mô tả | Thao tác DB | Nguồn |
|---|---|---|---|---|
| `SendReminderMail` | `0 9 * * *` (9h hằng ngày, GMT+7) | Gửi mail nhắc user chưa hoàn thiện hồ sơ | update `users.reminded_at` | `src/jobs/send-reminder-mail.ts` |

* Cột **Lịch chạy:** ghi cả cron expression lẫn diễn giải, kèm timezone.
* Cột **Thao tác DB:** insert/update/delete bảng nào. Cột DB link đến `database.md`.
* Cron job có logic phức tạp thì thêm mục riêng bên dưới bảng, viết giống phần **Logic xử lý** ở mục 4.2.

### 4.5. common-words.md

File chứa diễn giải chi tiết của các thuật ngữ và enum, để các file khác tham chiếu đến. Gồm 2 phần:

#### 4.5.1. Thuật ngữ
Các thuật ngữ nghiệp vụ dự án sử dụng, kèm định nghĩa technical (điều kiện trong DB/code):

```markdown
#### User đã bị xóa
User bị xóa mềm, không hiển thị ở các màn danh sách.
* Điều kiện: `users.deleted_at IS NOT NULL`
```

#### 4.5.2. Enum
Mỗi enum là một heading `#### Enum <bảng>.<cột>`, gồm:
* Cột trong DB: `<bảng>.<cột>`
* Ý nghĩa của enum
* Nguồn: file định nghĩa enum trong code
* Bảng các giá trị:

| Giá trị (trong DB) | Text hiển thị | Ý nghĩa | Điều kiện / Khi nào chuyển sang |
|---|---|---|---|
| `1` | Active (Đang hoạt động) | ... | Sau khi user xác thực email |

### 4.6. overview.md
* Giới thiệu ngắn gọn về dự án: mục đích, đối tượng người dùng
* Các role/loại người dùng và quyền hạn tổng quát
* Tech stack chính (framework FE/BE, DB). Chỉ liệt kê, không đi sâu.
* Mục lục link đến tất cả các file trong `srs/`

### 4.7. layout.md
* Các thành phần UI lặp lại qua nhiều màn: header, sidebar, footer, breadcrumb, notification…
* Viết theo format giống mục 4.2 (screenshot + bảng thành phần).
* Các màn trong `features/` không mô tả lại các thành phần này, chỉ ghi "Layout chung: xem [layout.md](../../layout.md)".

### 4.8. database.md
* Sơ đồ quan hệ (ERD) bằng Mermaid `erDiagram`, nếu số bảng không quá lớn
* Mỗi bảng là một heading `### <tên bảng>` (dùng tên bảng thật để có anchor ổn định), gồm:
  * Mô tả bảng lưu gì
  * Bảng cột:

| Cột | Kiểu | Null | Mặc định | Mô tả |
|---|---|---|---|---|
| `id` | bigint | ✗ | auto | PK |
| `status` | tinyint | ✗ | `0` | Trạng thái user. Xem [enum](common-words.md#enum-usersstatus) |
| `company_id` | bigint | ✓ | | FK → [`companies.id`](#companies) |

  * Index / unique constraint quan trọng (nếu có)
  * **Được sử dụng bởi:** danh sách màn, cron job, flow tác động đến bảng này (có hyperlink), ghi rõ đọc (R) hay ghi (W)
  * Nguồn: file migration / model / schema
