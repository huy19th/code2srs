<!--
TEMPLATE: layout.md (các thành phần UI dùng chung giữa nhiều màn)
- {{...}} là chỗ cần điền. Xóa toàn bộ comment khi sinh tài liệu.
- Bảng thành phần viết giống templates/screen.md mục 2.
- Viết theo convention.md.
-->
# Layout chung

* **Áp dụng cho:** {{tất cả các màn sau khi đăng nhập / các màn nhóm admin / …}}

## 1. {{Header}}

![layout-header](images/layout/{{header}}.png)

| No | Tên | Loại | Mô tả |
|---|---|---|---|
| 1 | {{...}} | {{...}} | {{...}} |

## 2. {{Sidebar}}

![layout-sidebar](images/layout/{{sidebar}}.png)

| No | Tên | Loại | Mô tả |
|---|---|---|---|
| 1 | {{Menu "Dashboard"}} | Link | **Hiển thị:** {{điều kiện}}<br>**Click:** chuyển sang [{{Dashboard}}](features/{{group}}/{{screen}}.md) |

## Nguồn

* `{{đường dẫn file}}`
