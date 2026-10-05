<!--
TEMPLATE: database.md
- {{...}} là chỗ cần điền. Xóa toàn bộ comment khi sinh tài liệu.
- Mỗi bảng là một heading "## <tên bảng thật>" để có anchor ổn định (#<tên bảng>).
- ERD chỉ vẽ khi số bảng không quá lớn (~30 bảng).
- Viết theo convention.md.
-->
# Database

## Sơ đồ quan hệ

```mermaid
erDiagram
  {{companies}} ||--o{ {{users}} : "{{có}}"
```

## {{users}}

{{Bảng lưu gì, 1 câu.}}

| Cột | Kiểu | Null | Mặc định | Mô tả |
|---|---|---|---|---|
| `id` | bigint | ✗ | auto | PK |
| `{{status}}` | {{tinyint}} | ✗ | `{{0}}` | {{Trạng thái user}}. Xem [enum](common-words.md#enum-{{usersstatus}}) |
| `{{company_id}}` | bigint | ✓ | | FK → [`companies.id`](#{{companies}}) |

**Index / unique:**
* {{unique(`email`)}}

**Được sử dụng bởi:**
* [{{Danh sách user}}](features/{{group}}/{{screen}}.md): đọc (R)
* [{{SendReminderMail}}](cron-jobs.md#{{sendremindermail}}): ghi (W)

**Nguồn:**
* `{{file migration / model / schema}}`
