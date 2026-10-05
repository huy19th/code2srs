---
name: code2srs
description: Sinh ngược tài liệu SRS (Software Requirements Specification) từ source code của một web app — gồm tài liệu theo màn hình, flow nghiệp vụ, cron job, thuật ngữ/enum và thiết kế database, theo format chuẩn trong output.md. Dùng skill này khi user muốn "gen tài liệu từ code", "viết SRS cho dự án có sẵn", "reverse engineer tài liệu", "tài liệu hóa màn hình / database / cron job", hoặc cập nhật lại bộ tài liệu srs/ sau khi code thay đổi — kể cả khi user không nhắc chữ "SRS".
---

# code2srs

Đọc source code của một web app và sinh bộ tài liệu SRS bằng tiếng Việt vào thư mục `srs/`.

**Đặc tả output nằm ở [output.md](output.md). Đọc toàn bộ file đó trước khi viết bất kỳ tài liệu nào.** SKILL.md chỉ mô tả *quy trình*; mọi quy định về cấu trúc, format, template, cách đặt tên và hyperlink đều theo output.md.

## Nguyên tắc

1. **Code là nguồn sự thật.** Chỉ ghi những gì đọc được từ code. Không suy diễn tính năng từ tên biến, comment hay TODO.
2. **Không chắc thì đánh dấu.** Logic phụ thuộc env/config, gọi service ngoài, code mâu thuẫn, nhánh không rõ có chạy không → dùng marker `⚠️ Cần xác nhận` (output.md mục 2.5), không đoán.
3. **Viết bằng ngôn ngữ nghiệp vụ.** Người đọc là BA/QA/PM. Viết "Chỉ hiển thị user đang hoạt động", không viết "filter `where status = 1`". Chi tiết technical để ở `common-words.md` và `database.md`, rồi link sang.
4. **Bỏ qua code chết.** Màn không có route, component không được import, job không được đăng ký lịch → không tài liệu hóa. Nếu nghi ngờ thì ghi chú vào inventory.
5. **Mọi thứ đều có Nguồn.** Mỗi màn, flow, cron job, bảng đều ghi file code tương ứng.

## Đầu vào cần xác định

Hỏi user (chỉ những gì chưa rõ):
- **Phạm vi:** toàn bộ dự án, hay chỉ một số nhóm tính năng / màn cụ thể
- **Thư mục output:** mặc định `srs/` ở root repo
- **Screenshot:** app có đang chạy không (URL, tài khoản test cho từng role)? Nếu không có thì dùng placeholder (output.md mục 4.1) và chạy tiếp, không block.

## Quy trình

Làm **tuần tự theo đúng thứ tự dưới đây**, vì các bước sau link đến kết quả của các bước trước (màn hình link tới database và common-words, overview link tới tất cả).

Với dự án lớn, xử lý từng nhóm tính năng một và cập nhật inventory sau mỗi nhóm, để có thể dừng giữa chừng rồi làm tiếp.

### Bước 1 — Khảo sát & lập inventory

Đọc cấu trúc repo, xác định stack, rồi ghi file làm việc `.code2srs/inventory.md` ở root repo (nằm ngoài `srs/`, là sổ tay của skill chứ không phải tài liệu output). Nội dung:

- **Stack:** framework FE/BE, ORM, thư viện i18n, cơ chế auth/phân quyền
- **Danh sách màn:** URL → file component → nhóm dự kiến → điều kiện truy cập → trạng thái (`todo` / `done`)
- **Danh sách bảng DB:** tên bảng → file migration/model
- **Danh sách cron job:** tên → lịch → file
- **Ứng viên flow:** các tính năng trải qua nhiều màn hoặc có cron job/hệ thống ngoài tham gia
- **Ghi chú:** code nghi là chết, điểm chưa rõ

Gợi ý chỗ tìm thông tin:

| Thông tin | Nơi thường gặp |
|---|---|
| Route / màn hình | `app/`, `pages/` (Next.js, Nuxt), file khai báo router (react-router, vue-router, Angular), `routes/web.php` (Laravel), `config/routes.rb` (Rails), `urls.py` (Django) |
| Phân quyền | middleware, guard, policy, route meta, HOC/wrapper bọc route, điều kiện render menu |
| Text UI | file i18n/locale (`*.json`, `lang/`), hoặc text cứng trong component |
| Database | migration, `schema.prisma`, entity/model ORM, `schema.rb`, file SQL dump |
| Enum | file constant/enum, cast của model, cột `enum` trong migration, i18n key của trạng thái |
| Cron job | `app/Console/Kernel.php` / `routes/console.php` (Laravel), `@Cron` (NestJS), `node-cron`, `whenever`/`sidekiq-cron`, Celery beat, `crontab`, file config scheduler của cloud (serverless.yml, vercel.json, k8s CronJob) |

Chốt cách chia nhóm với user trước khi viết features, nếu cách chia không hiển nhiên từ code (ví dụ không có prefix `/admin`).

### Bước 2 — database.md

- Mỗi bảng một heading `### <tên bảng>`, theo template output.md mục 4.8.
- Kiểu, null, default, FK lấy từ migration/schema. Mô tả cột suy ra từ cách code dùng cột đó. Không rõ thì để trống và đánh dấu cần xác nhận.
- Để trống mục **Được sử dụng bởi**, điền ở bước 7.

### Bước 3 — common-words.md

- **Enum:** gom toàn bộ enum, trạng thái, loại từ code. Mỗi enum một heading `#### Enum <bảng>.<cột>`. Text hiển thị lấy từ i18n. Cột "Điều kiện / Khi nào chuyển sang" lấy từ chỗ code gán giá trị đó.
- **Thuật ngữ:** các khái niệm nghiệp vụ dùng lặp lại (scope/query dùng chung, điều kiện lọc hay gặp như "user đang hoạt động", "đơn hàng đã thanh toán"). Mỗi thuật ngữ một heading, kèm điều kiện technical.
- Thuật ngữ phát hiện thêm ở các bước sau thì bổ sung vào file này.

### Bước 4 — layout.md

Header, sidebar, footer, breadcrumb, notification… là phần layout dùng chung. Viết theo format màn hình (output.md mục 4.7). Menu sidebar là nguồn tốt để lấy **tên màn** cho bước 5.

### Bước 5 — features/

Với từng màn trong inventory:
1. Đọc component của màn, cùng các component con, hook/store, API client và handler phía backend tương ứng.
2. Liệt kê các thành phần cần đánh số, theo tiêu chí ở output.md mục 4.1. Đánh số theo thứ tự đọc: trên → dưới, trái → phải.
3. Viết file theo template output.md mục 4.2. Với mỗi thành phần, truy đến tận nơi dữ liệu được query/ghi để điền cột DB, điều kiện lọc, sort, validate (validate có thể nằm ở cả FE lẫn BE, ghi cả hai nếu khác nhau).
4. Thao tác ghi dữ liệu phức tạp → viết mục **Logic xử lý**, và ghi đủ các nhánh lỗi.
5. Chụp screenshot nếu có thể (xem phần Screenshot bên dưới).
6. Đánh dấu `done` trong inventory.

### Bước 6 — cron-jobs.md

Một bảng theo output.md mục 4.4. Nhớ ghi timezone: kiểm tra timezone mặc định của scheduler/app config, đừng tự giả định.

### Bước 7 — flows/ & đối chiếu ngược

- Viết flows cho các ứng viên trong inventory (output.md mục 4.3). Flow chỉ tóm tắt từng bước và link về màn/cron job, không chép lại chi tiết.
- Điền mục **Được sử dụng bởi** trong `database.md`, dựa trên các thao tác DB đã ghi ở features, cron-jobs và flows.

### Bước 8 — overview.md

Viết cuối cùng, vì cần mục lục đầy đủ (output.md mục 4.6).

### Bước 9 — Kiểm tra

Chạy script kiểm tra link và anchor:

```bash
node <skill-dir>/scripts/check-links.mjs srs
```

Sửa hết lỗi script báo (file không tồn tại, anchor không khớp heading, heading trùng). Sau đó tự rà:
- Số trong screenshot khớp với cột No
- Mọi `<bảng>.<cột>` đều có trong `database.md`
- Mọi enum được hiển thị trên màn đều có trong `common-words.md`
- Danh sách các marker `⚠️ Cần xác nhận`: tổng hợp lại để báo cho user

## Screenshot

Chỉ làm khi user cung cấp được app đang chạy. Nếu không thì dùng placeholder.

- Dùng công cụ browser đang có (Playwright, browser MCP…). Đăng nhập bằng tài khoản có role phù hợp với màn.
- **Đánh số tự động:** trước khi chụp, chèn overlay bằng JS: với mỗi thành phần, lấy `getBoundingClientRect()`, vẽ một khung viền đỏ `position:absolute` cùng một nhãn số ở góc trên-trái, rồi chụp. Cách này đảm bảo số trên ảnh khớp với bảng.
- Modal/dropdown: thao tác để mở, rồi chụp vào `<screen>-<n>.png`.
- Màn cần dữ liệu mới hiện đủ thành phần mà môi trường không có dữ liệu → vẫn chụp, ghi chú thành phần nào không hiện được.

## Cập nhật tài liệu khi code thay đổi

Khi user yêu cầu cập nhật:
1. Xác định các file code thay đổi (`git diff`/`git log` từ lần sinh trước, hoặc theo danh sách user đưa).
2. Tìm trong `srs/` các tài liệu có **Nguồn** trỏ đến những file đó, và đối chiếu thêm với inventory.
3. Chỉ sinh lại các tài liệu bị ảnh hưởng, rồi đối chiếu ngược (bước 7) và kiểm tra link (bước 9).
4. Không ghi đè nội dung con người đã sửa tay hoặc đã xác nhận. Nếu có xung đột thì hỏi user.

## Báo cáo khi xong

Ngắn gọn:
- Số màn / bảng / cron job / flow đã tài liệu hóa
- Các màn còn thiếu screenshot
- Danh sách điểm `⚠️ Cần xác nhận`, kèm link
- Các thứ đã bỏ qua (code chết, ngoài phạm vi)
