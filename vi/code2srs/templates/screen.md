<!--
TEMPLATE: tài liệu một màn hình (features/<group>/<screen>.md)
- {{...}} là chỗ cần điền. Comment HTML là hướng dẫn. Xóa toàn bộ comment khi sinh tài liệu.
- Mục nào không có nội dung thì bỏ cả mục (trừ mục 2 và mục Nguồn).
- Viết theo convention.md.
-->
# {{Tên màn}}

* **Tên trên menu:** {{text trên sidebar/navbar}} ({{bản dịch, nếu không phải tiếng Việt}})
* **URL:** `{{path, không có query param}}`
* **Điều kiện truy cập:**
  <!-- Một điều kiện thì viết thẳng một dòng. Nhiều điều kiện thì dùng mẫu ở convention.md mục 3. Không cần ghi "đã đăng nhập". -->
  Phải thỏa mãn một trong các điều kiện bên dưới:
  * {{điều kiện 1}}
  * {{điều kiện 2}}

  Không thỏa mãn thì: {{redirect đến đâu / 403 / …}}
* **Layout chung:** xem [layout.md](../../layout.md)

{{Mục đích của màn, 1–2 câu.}}

## 1. Screenshot

![{{screen}}](../../images/{{group}}/{{screen}}.png)

## 2. Các thành phần trên màn hình

<!--
Cột "Mô tả": mỗi nhãn bắt đầu ở một dòng mới (<br>), theo thứ tự dưới đây. Nhãn nào không có thì bỏ.
  **Hiển thị:**        điều kiện ẩn/hiện
  **Enable/Disable:**  điều kiện enable/disable
  **Dữ liệu:**         <ý nghĩa> ([`bảng.cột`](../../database.md#bảng)), điều kiện lọc (thuật ngữ link common-words), sắp xếp, phân trang, format
  **Mặc định:**        giá trị mặc định
  **Enum:**            text hiển thị, link enum trong common-words
  **Input:**           validate (bắt buộc, độ dài, format…), message lỗi
  **Click:**           chuyển màn (link .md) / mở modal (link mục 3.x) / xem Logic xử lý (link mục 4.x)
  **Thay đổi dữ liệu:** thêm/sửa/xóa dữ liệu gì (bảng nào)
-->

| No | Tên | Loại | Mô tả |
|---|---|---|---|
| 1 | {{Dropdown chi nhánh}} | {{Select}} | **Dữ liệu:** danh sách tên chi nhánh ([`departments.name`](../../database.md#departments)) có chứa ít nhất một [cơ sở đang hoạt động](../../common-words.md#cơ-sở-đang-hoạt-động)<br>**Mặc định:** chi nhánh đầu tiên trong danh sách |
| 2 | {{Nút "Xóa"}} | {{Button}} | **Hiển thị:** Phải thỏa mãn các điều kiện bên dưới:<br>• {{điều kiện 1}}<br>• {{điều kiện 2}}<br>**Click:** mở [{{Modal xác nhận xóa}}](#31-modal-xác-nhận-xóa) |

## 3. Screenshot bổ sung

### 3.1. {{Modal xác nhận xóa}}

* **Mở từ:** No.{{x}}
* {{Đặc điểm khác, ví dụ: không đóng được bằng cách bấm ra ngoài}}

![{{screen}}-1](../../images/{{group}}/{{screen}}-1.png)

| No | Tên | Loại | Mô tả |
|---|---|---|---|
| 1 | {{...}} | {{...}} | {{...}} |

## 4. Logic xử lý

<!-- Chỉ viết cho thao tác phức tạp: nhiều bước, nhiều bảng, nhiều nhánh lỗi, gọi service ngoài. -->

### 4.1. {{Tên xử lý}}

**Kích hoạt:** {{bấm No.x / tải màn hình / …}}

**Điều kiện tiên quyết:**
Phải thỏa mãn các điều kiện bên dưới:
* {{điều kiện 1}}
* {{điều kiện 2}}

Không thỏa mãn thì: {{kết quả hiển thị}}

**Các bước:**
1. {{bước 1}}
2. {{bước 2}}
   * {{nhánh: điều kiện}} → {{kết quả}}

**Dữ liệu bị thay đổi:**
* Thêm mới: {{ý nghĩa}} ([`{{bảng}}`](../../database.md#{{bảng}}))
* Cập nhật: {{ý nghĩa}} ([`{{bảng}}.{{cột}}`](../../database.md#{{bảng}}))
* Xóa: {{...}}

**Lỗi:**
* {{trường hợp lỗi}} → {{kết quả hiển thị cho người dùng}}

**Tác động phụ:**
* {{gửi mail / ghi log / gọi API ngoài / …}}

## Nguồn

* `{{đường dẫn file}}`: {{ghi chú ngắn, nếu cần}}
