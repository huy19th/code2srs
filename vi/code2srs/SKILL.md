---
name: code2srs
description: Sinh ngược tài liệu SRS (Software Requirements Specification) từ source code của một web app — gồm tài liệu theo màn hình, flow nghiệp vụ, cron job, thuật ngữ/enum và thiết kế database, theo format chuẩn của skill. Dùng skill này khi user muốn "gen tài liệu từ code", "viết SRS cho dự án có sẵn", "reverse engineer tài liệu", "tài liệu hóa màn hình / database / cron job", cập nhật lại bộ tài liệu srs/ sau khi code thay đổi, hoặc review/feedback để sửa tài liệu srs/ và format của skill — kể cả khi user không nhắc chữ "SRS".
---

# code2srs

Đọc source code của một web app và sinh bộ tài liệu SRS bằng tiếng Việt vào thư mục `srs/`.

## Tài liệu tham chiếu của skill

**Đọc đủ 3 nguồn dưới đây trước khi viết bất kỳ tài liệu nào.** SKILL.md chỉ mô tả *quy trình*.

| File | Quy định | Ưu tiên khi mâu thuẫn |
|---|---|---|
| [convention.md](convention.md) | **Cách viết**: văn phong, cách viết điều kiện, format tham chiếu DB, mức độ technical, link, đặt tên | 1 |
| [templates/](templates/) | **Hình dạng** từng loại file: thứ tự mục, heading, bảng | 2 |
| [output.md](output.md) | **Nội dung**: cấu trúc thư mục, mỗi file cần có thông tin gì | 3 |

Khi dùng template:
* Thay hết các `{{...}}`.
* Xóa toàn bộ comment HTML.
* Bỏ các mục không có nội dung, trừ bảng thành phần và mục Nguồn.

## Nguyên tắc

1. **Code là nguồn sự thật.** Chỉ ghi những gì đọc được từ code. Không suy diễn tính năng từ tên biến, comment hay TODO.
2. **Không chắc thì đánh dấu.** Logic phụ thuộc env/config, gọi service ngoài, code mâu thuẫn, nhánh không rõ có chạy không → dùng marker `⚠️ Cần xác nhận`, không đoán.
3. **Viết cho người đọc nghiệp vụ.** Mô tả hành vi người dùng thấy được, theo convention.md mục 5. Chi tiết technical để ở `common-words.md`, `database.md` và mục Nguồn.
4. **Bỏ qua code chết.** Màn không có route, component không được import, job không được đăng ký lịch → không tài liệu hóa. Nếu nghi ngờ thì ghi chú vào inventory.
5. **Mọi file đều có Nguồn** ở cuối file.

## Đầu vào cần xác định

Hỏi user (chỉ những gì chưa rõ):
- **Phạm vi:** toàn bộ dự án, hay chỉ một số nhóm tính năng / màn cụ thể
- **Thư mục output:** mặc định `srs/` ở root repo
- **Screenshot:** app có đang chạy không (URL, tài khoản test cho từng role)? Nếu không thì dùng placeholder và chạy tiếp, không block.

## Quy trình

Làm **tuần tự theo đúng thứ tự dưới đây**, vì các bước sau link đến kết quả của các bước trước.

Với dự án lớn, xử lý từng nhóm tính năng một và cập nhật inventory sau mỗi nhóm, để có thể dừng giữa chừng rồi làm tiếp.

### Bước 1 — Khảo sát & lập inventory

Đọc cấu trúc repo, xác định stack, rồi ghi file làm việc `.code2srs/inventory.md` ở root repo. File này nằm ngoài `srs/`: là sổ tay của skill, không phải tài liệu output. Nội dung:

- **Stack:** framework FE/BE, ORM, thư viện i18n, cơ chế auth/phân quyền
- **Danh sách màn:** URL → file component → nhóm dự kiến → điều kiện truy cập → trạng thái (`todo` / `done`)
- **Danh sách bảng DB:** tên bảng → file migration/model
- **Danh sách cron job:** tên → lịch → file
- **Ứng viên flow:** các tính năng trải qua nhiều màn, hoặc có cron job/hệ thống ngoài tham gia
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

Nếu cách chia nhóm không hiển nhiên từ code (ví dụ không có prefix `/admin`), chốt với user trước khi viết features.

### Bước 2 — database.md

Template: `templates/database.md`.
- Kiểu, null, default, FK lấy từ migration/schema.
- Mô tả cột suy ra từ cách code dùng cột đó. Không rõ thì để trống và đánh dấu cần xác nhận.
- Để trống mục **Được sử dụng bởi**, điền ở bước 7.

### Bước 3 — common-words.md

Template: `templates/common-words.md`.
- **Enum:** gom toàn bộ enum, trạng thái, loại từ code.
  - Text hiển thị lấy từ i18n.
  - "Khi nào có giá trị này" lấy từ chỗ code gán giá trị đó.
- **Thuật ngữ:** các khái niệm nghiệp vụ dùng lặp lại, gồm scope/query dùng chung và điều kiện lọc hay gặp. Ví dụ: "user đang hoạt động", "đơn hàng đã thanh toán".
- Thuật ngữ phát hiện thêm ở các bước sau thì bổ sung vào file này.
  - Mục đích: tài liệu màn hình viết được bằng thuật ngữ nghiệp vụ, thay vì điều kiện technical.

### Bước 4 — layout.md

Template: `templates/layout.md`. Menu sidebar là nguồn tốt để lấy **tên màn** cho bước 5.

### Bước 5 — features/

Template: `templates/screen.md`. Với từng màn trong inventory:
1. Đọc component của màn, cùng các component con, hook/store, API client và handler phía backend tương ứng.
2. Liệt kê các thành phần cần đánh số, theo tiêu chí ở output.md mục 3.1. Đánh số theo thứ tự đọc: trên → dưới, trái → phải.
3. Với mỗi thành phần, truy đến tận nơi dữ liệu được query/ghi để điền dữ liệu, điều kiện lọc, sort, validate.
4. Thao tác ghi dữ liệu phức tạp → viết mục **Logic xử lý**, và ghi đủ các nhánh lỗi.
5. Chụp screenshot nếu có thể (xem phần Screenshot).
6. Tự rà file vừa viết theo **checklist convention** ở bước 9.
7. Đánh dấu `done` trong inventory.

### Bước 6 — cron-jobs.md

Template: `templates/cron-jobs.md`. Timezone phải kiểm tra trong config của scheduler/app, đừng tự giả định.

### Bước 7 — flows/ & đối chiếu ngược

- Viết flows cho các ứng viên trong inventory, theo `templates/flow.md`.
- Điền mục **Được sử dụng bởi** trong `database.md`, dựa trên các thao tác DB đã ghi ở features, cron-jobs và flows.

### Bước 8 — overview.md

Template: `templates/overview.md`. Viết cuối cùng, vì cần mục lục đầy đủ.

### Bước 9 — Kiểm tra

1. Chạy script kiểm tra link và anchor, rồi sửa hết lỗi script báo:
   ```bash
   node <skill-dir>/scripts/check-links.mjs srs
   ```
2. **Checklist convention**, rà từng file:
   - [ ] Không có đoạn văn dài; các điều kiện viết theo mẫu ở convention.md mục 3
   - [ ] Mọi `<bảng>.<cột>` có ý nghĩa đi trước: `tên (departments.name)`
   - [ ] Bảng thành phần không có tên param, endpoint, tên hàm, đường dẫn file
   - [ ] URL chỉ có path
   - [ ] Mục Nguồn ở cuối file, dạng danh sách
   - [ ] Không còn `{{...}}` hay comment HTML của template
   - [ ] Không lặp lại lỗi nào trong các bảng ❌ Sai / ✅ Đúng của convention.md
3. Kiểm tra chéo:
   - Số trong screenshot khớp với cột No
   - Mọi `<bảng>.<cột>` đều có trong `database.md`
   - Mọi enum hiển thị trên màn đều có trong `common-words.md`
4. Tổng hợp các marker `⚠️ Cần xác nhận` để báo cho user.

## Screenshot

Chỉ làm khi user cung cấp được app đang chạy. Nếu không thì dùng placeholder.

- Dùng công cụ browser đang có (Playwright, browser MCP…). Đăng nhập bằng tài khoản có role phù hợp với màn.
- **Đánh số tự động:** trước khi chụp, chèn overlay bằng JS:
  - Với mỗi thành phần, lấy `getBoundingClientRect()`.
  - Vẽ một khung viền đỏ `position:absolute`, kèm nhãn số ở góc trên-trái.
  - Chụp. Cách này đảm bảo số trên ảnh khớp với bảng.
- Modal/dropdown: thao tác để mở, rồi chụp vào `<screen>-<n>.png`.
- Màn cần dữ liệu mới hiện đủ thành phần mà môi trường không có dữ liệu: vẫn chụp, và ghi chú thành phần nào không hiện được.

## Xử lý feedback

Khi user review tài liệu đã sinh (comment trực tiếp, file review, hoặc dạng actual/expected), phân loại **từng ý** trước khi sửa:

| Loại feedback | Ví dụ | Sửa ở đâu |
|---|---|---|
| **Cách viết** áp dụng chung | "điều kiện nên viết theo bullet", "đừng ghi `bảng.cột` trơn" | `convention.md`: thêm/sửa quy tắc, **và** thêm một dòng vào bảng ❌ Sai / ✅ Đúng của mục liên quan, lấy đúng câu actual/expected của user |
| **Hình dạng** file | "Nguồn nên để cuối file", "phần đầu không cần là bảng" | file tương ứng trong `templates/` |
| **Nội dung** cần có / bỏ | "thêm mục phân trang", "không cần giải thích query param" | `output.md`, và template nếu ảnh hưởng hình dạng |
| **Sai** ở một tài liệu cụ thể | "No.16 đếm sai trạng thái" | chỉ sửa file tài liệu đó trong `srs/` |

Sau khi cập nhật convention / template / output:
1. Báo lại cho user ngắn gọn: đã đổi quy tắc nào, ở file nào.
2. Áp dụng lại cho các tài liệu đã sinh trong `srs/`:
   - Chỉ sửa phần bị ảnh hưởng, không sinh lại từ đầu.
   - Phạm vi lớn (nhiều file) thì hỏi user trước: sửa ngay, hay để lần sinh sau.
3. Chạy lại bước 9.

Không tự ý "chuẩn hóa" convention theo ý mình. Quy tắc nào user đã chốt thì giữ nguyên câu chữ đó.

## Cập nhật tài liệu khi code thay đổi

1. Xác định các file code thay đổi: `git diff`/`git log` từ lần sinh trước, hoặc theo danh sách user đưa.
2. Tìm trong `srs/` các tài liệu có mục **Nguồn** trỏ đến những file đó, và đối chiếu thêm với inventory.
3. Chỉ sinh lại các tài liệu bị ảnh hưởng, rồi đối chiếu ngược (bước 7) và kiểm tra (bước 9).
4. Không ghi đè nội dung con người đã sửa tay hoặc đã xác nhận. Nếu có xung đột thì hỏi user.

## Báo cáo khi xong

Ngắn gọn:
- Số màn / bảng / cron job / flow đã tài liệu hóa
- Các màn còn thiếu screenshot
- Danh sách điểm `⚠️ Cần xác nhận`, kèm link
- Các thứ đã bỏ qua (code chết, ngoài phạm vi)
