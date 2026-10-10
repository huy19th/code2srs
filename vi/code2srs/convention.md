# CODE2SRS — Convention viết tài liệu

File này quy định **cách viết**. Nội dung từng file cần có gì xem [output.md](output.md); hình dạng từng file xem [templates/](templates/).

Áp dụng cho mọi file trong `srs/`. Khi user feedback về cách viết, cập nhật file này (xem SKILL.md, mục "Xử lý feedback").

## 1. Ngôn ngữ

* Tài liệu viết bằng tiếng Việt.
* Text trên UI giữ nguyên văn như trong code/i18n.
  * Nếu không phải tiếng Việt thì kèm bản dịch: `Settings (Cài đặt)`.
* Tên bảng, tên cột, đường dẫn file giữ nguyên, đặt trong backtick.

## 2. Trình bày: danh sách, không viết đoạn văn

* Mỗi ý một bullet, hoặc mỗi câu một dòng.
* Không viết đoạn văn quá 2 câu.
* Trong ô bảng markdown không xuống dòng được thì dùng `<br>`:
  * Bullet cấp 1: `<br>• `
  * Bullet cấp 2: `<br>&emsp;◦ `
* Mỗi nhãn (**Hiển thị:**, **Dữ liệu:**, **Click:**…) bắt đầu ở một dòng mới.

| ❌ Sai | ✅ Đúng |
|---|---|
| Đã đăng nhập, và là admin, **hoặc** user thường thoả cả 2: (a) có ít nhất một cơ sở được phân quyền…; (b) có ít nhất một cơ sở đang hoạt động… | Phải thỏa mãn một trong các điều kiện bên dưới:<br>• Là admin<br>• Là user thường:<br>&emsp;◦ Có ít nhất một cơ sở được phân quyền<br>&emsp;◦ Có ít nhất một cơ sở đang hoạt động |

## 3. Viết điều kiện

Áp dụng cho mọi nội dung có điều kiện: điều kiện truy cập, hiển thị, enable/disable, lọc dữ liệu, rẽ nhánh trong logic xử lý.

* Chỉ có **một** điều kiện thì viết thẳng một dòng.
* Có **nhiều** điều kiện thì dùng đúng một trong các mẫu dưới đây. Mỗi điều kiện một dòng.

**Thỏa mãn tất cả (AND):**
```
Phải thỏa mãn các điều kiện bên dưới:
* điều kiện 1
* điều kiện 2
```

**Thỏa mãn một trong (OR):**
```
Phải thỏa mãn một trong các điều kiện bên dưới:
* điều kiện 1
* điều kiện 2
```

**Kết hợp (OR của các nhóm AND):**
```
Phải thỏa mãn một trong các điều kiện bên dưới:
* Nhóm điều kiện 1:
  * điều kiện 1.1
  * điều kiện 1.2
* Nhóm điều kiện 2:
  * điều kiện 2.1
  * điều kiện 2.2
```

* Mỗi nhóm hiểu là phải thỏa mãn **tất cả** điều kiện trong nhóm. Nếu nhóm có ý nghĩa nghiệp vụ thì đặt tên thay cho "Nhóm điều kiện n". Ví dụ: "User thường:".
* Kết quả khi không thỏa mãn thì ghi ở dòng riêng, ngay sau danh sách: `Không thỏa mãn thì: <kết quả>`.
* Trong ô bảng thì viết theo mục 2: `Phải thỏa mãn các điều kiện bên dưới:<br>• điều kiện 1<br>• điều kiện 2`

## 4. Nhắc đến dữ liệu trong DB

* Không viết `<bảng>.<cột>` trơn. Viết theo format **`<ý nghĩa> (<bảng>.<cột>)`**, trong đó phần `<bảng>.<cột>` link đến bảng trong `database.md`:
  * `tên chi nhánh ([`departments.name`](../../database.md#departments))`
* Dữ liệu dạng danh sách thì nói rõ là danh sách:
  * `danh sách tên chi nhánh ([`departments.name`](../../database.md#departments))`
* Điều kiện lọc viết bằng thuật ngữ nghiệp vụ, link đến `common-words.md`. Không viết điều kiện SQL (`= 1`, `IS NULL`…) trong tài liệu màn hình.
* Giá trị enum: ghi text hiển thị, link đến enum trong `common-words.md`. Không ghi giá trị số trong DB.

| ❌ Sai | ✅ Đúng |
|---|---|
| **Dữ liệu:** `facilities.name` của cơ sở đang chọn. Không có thì `NA` | **Dữ liệu:** tên ([`facilities.name`](../../database.md#facilities)) của cơ sở đang chọn.<br>Không có thì `NA` |
| **Dữ liệu:** `departments.name` của các chi nhánh có chứa ít nhất một cơ sở đang hoạt động | **Dữ liệu:** danh sách tên chi nhánh ([`departments.name`](../../database.md#departments)) có chứa ít nhất một [cơ sở đang hoạt động](../../common-words.md#cơ-sở-đang-hoạt-động) |
| `roles.view = 1` | có [quyền xem cơ sở](../../common-words.md#quyền-xem-cơ-sở) |

## 5. Mức độ technical

Người đọc chính là BA/QA/PM. Mô tả **hành vi người dùng thấy được**, không mô tả cách code chạy.

* Trong bảng thành phần, **không** dùng:
  * tên query param, biến, hàm, class
  * endpoint API, HTTP method, status code
  * đường dẫn file code
* Nhắc đến thành phần khác trên màn thì gọi bằng `No.x`.
* Phần **Logic xử lý** được phép chi tiết hơn, nhưng vẫn viết bước nghiệp vụ trước. Tên class, endpoint chỉ ghi khi thật cần để dev tra cứu.
* Mọi đường dẫn file code gom vào mục **Nguồn** ở cuối file.

| ❌ Sai | ✅ Đúng |
|---|---|
| **Click:** tải lại Dashboard với `department_id`, `facility_id`, `setting_month` đang chọn ở No.1–3 | **Click:** tải lại Dashboard, áp dụng bộ lọc No.1–3 |
| **URL:** `/?department_id=:id&facility_id=:id&setting_month=:YYYY/MM`, cả 3 tham số không bắt buộc… | **URL:** `/` |

## 6. URL

* Chỉ ghi path. Path param thì ghi dạng `:param`. Ví dụ: `/admin/users/:id`.
* Không ghi và không giải thích query param.

## 7. Hyperlink

* Mọi link dùng đường dẫn tương đối, theo format `[text](path#anchor)`.
* Cột DB: link đến heading bảng trong `database.md`. Xem mục 4.
* Thuật ngữ, enum: link đến heading tương ứng trong `common-words.md`.
* Màn khác: link đến file `.md` của màn đó. Màn chưa tài liệu hóa thì ghi tên màn kèm "(chưa tài liệu hóa)".
* Anchor của heading tạo theo quy tắc GitHub:
  * chữ thường, giữ dấu tiếng Việt
  * khoảng trắng → `-`
  * bỏ dấu câu (`.`, `,`, `(`, `)`, `/`…)
  * Ví dụ: `#### Enum users.status` → `#enum-usersstatus`
* Heading được tham chiếu phải là duy nhất trong file.

## 8. Đặt tên file & thư mục

* Tên file và thư mục dùng `kebab-case`, không dấu, tiếng Anh. Ví dụ: `user-list.md`, `admin/`.
* Ảnh của một màn đặt trong `images/<group>/`:
  * `<screen>.png`: screenshot chính
  * `<screen>-<n>.png`: screenshot bổ sung (modal, dropdown, trạng thái khác…)

## 9. Nguồn

* Đặt ở **cuối file**, là heading riêng `## Nguồn`.
* Viết dạng danh sách, mỗi file một dòng, kèm ghi chú ngắn nếu cần:
  ```
  * `routes/web.php`: route `home.index`
  * `app/Http/Controllers/HomepageController.php`
  ```

## 10. Marker

* Điểm chưa chắc chắn (logic phụ thuộc config/env, gọi service ngoài, code mâu thuẫn…). Không suy đoán, mà ghi:
  ```
  > ⚠️ **Cần xác nhận:** <mô tả điều chưa rõ>
  ```
* Chưa có screenshot:
  ```
  > 📷 **Chưa có screenshot:** <lý do>
  ```
