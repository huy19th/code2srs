<!--
TEMPLATE: cron-jobs.md
- {{...}} là chỗ cần điền. Xóa toàn bộ comment khi sinh tài liệu.
- Lịch chạy: cron expression + diễn giải + timezone (lấy từ config, không tự giả định).
- Viết theo convention.md.
-->
# Cron job

| Tên | Lịch chạy | Mô tả | Dữ liệu bị thay đổi |
|---|---|---|---|
| [`{{SendReminderMail}}`](#{{sendremindermail}}) | `{{0 9 * * *}}`<br>{{9h hằng ngày (GMT+7)}} | {{Gửi mail nhắc user chưa hoàn thiện hồ sơ}} | Cập nhật: {{thời điểm nhắc}} ([`{{users.reminded_at}}`](database.md#{{users}})) |

<!-- Mỗi cron job có logic phức tạp thì thêm một mục riêng, viết giống phần Logic xử lý ở templates/screen.md. -->

## {{SendReminderMail}}

**Điều kiện xử lý:**
Phải thỏa mãn các điều kiện bên dưới:
* {{điều kiện 1}}
* {{điều kiện 2}}

**Các bước:**
1. {{...}}

**Lỗi:**
* {{trường hợp lỗi}} → {{xử lý}}

## Nguồn

* `{{đường dẫn file đăng ký lịch}}`
* `{{đường dẫn file xử lý của từng job}}`
