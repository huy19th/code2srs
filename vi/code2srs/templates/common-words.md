<!--
TEMPLATE: common-words.md
- {{...}} là chỗ cần điền. Xóa toàn bộ comment khi sinh tài liệu.
- Đây là nơi DUY NHẤT được ghi điều kiện technical (SQL-like) của thuật ngữ; các file khác chỉ link đến đây.
- Heading phải duy nhất trong file, vì các file khác link đến bằng anchor.
- Viết theo convention.md.
-->
# Thuật ngữ & Enum

## 1. Thuật ngữ

### {{User đã bị xóa}}

{{Giải thích nghiệp vụ, 1–2 câu.}}

**Điều kiện:**
<!-- Nhiều điều kiện thì dùng mẫu ở convention.md mục 3. -->
* [`{{users.deleted_at}}`](database.md#{{users}}) {{khác NULL}}

## 2. Enum

### Enum {{users.status}}

* **Ý nghĩa:** {{trạng thái của user}} ([`{{users.status}}`](database.md#{{users}}))

| Giá trị trong DB | Text hiển thị | Ý nghĩa | Khi nào có giá trị này |
|---|---|---|---|
| `{{1}}` | {{Active (Đang hoạt động)}} | {{...}} | {{Sau khi user xác thực email}} |

## Nguồn

* `{{file định nghĩa enum / scope / constant}}`
