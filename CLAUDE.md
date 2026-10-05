# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo này là gì

Repo chứa source của **code2srs**, một Claude skill.
* Skill đọc ngược source code của một web app để sinh tài liệu SRS (Software Requirements Specification) bằng tiếng Việt.
* Tài liệu được ghi vào thư mục `srs/` của *dự án đích*, không phải repo này.
* Repo này không phải một app. Gần như toàn bộ là file Markdown chứa hướng dẫn cho agent chạy skill.

Cài skill: copy cả thư mục vào `~/.claude/skills/code2srs/` (hoặc vào `.claude/skills/` của một dự án).

## Lệnh

Code duy nhất là một script Node (không có dependency, không cần build). Script kiểm tra link tương đối và anchor heading trong một thư mục `srs/` đã sinh:

```bash
node scripts/check-links.mjs <đường-dẫn-srs>
```

* Exit code 1 khi gặp một trong các lỗi:
  * file không tồn tại
  * anchor không khớp heading nào
  * heading trùng
* Anchor tạo theo quy tắc slug của GitHub: chữ thường, giữ dấu tiếng Việt, bỏ dấu câu, khoảng trắng → `-`.
* Muốn test thay đổi thì dựng một thư mục `srs/` mẫu nhỏ trong scratchpad.

## Các file của skill liên kết với nhau thế nào

| File | Vai trò |
|---|---|
| `SKILL.md` | Điểm vào và **quy trình**: 9 bước sinh tài liệu, chụp screenshot, xử lý feedback, cập nhật tài liệu khi code thay đổi |
| `convention.md` | **Cách viết**: mẫu viết điều kiện, format tham chiếu `<ý nghĩa> (<bảng>.<cột>)`, mức độ technical, quy tắc URL/link/đặt tên, marker |
| `templates/*.md` | **Hình dạng** từng file output. `{{...}}` là chỗ cần điền; comment HTML là hướng dẫn cho agent và bị xóa khỏi output |
| `output.md` | **Nội dung**: cấu trúc thư mục `srs/` và mỗi file cần có thông tin gì |

* Khi mâu thuẫn, ưu tiên theo thứ tự: convention.md → templates → output.md (thứ tự này được ghi trong SKILL.md).
* Mỗi quy tắc chỉ nên nằm ở **một** file. Khi sửa, đặt quy tắc vào đúng file rồi tham chiếu từ các file khác, không chép lặp.

Thứ tự sinh tài liệu trong SKILL.md là quan trọng, vì tài liệu sinh sau link đến tài liệu sinh trước:
1. inventory
2. database
3. common-words
4. layout
5. features
6. cron-jobs
7. flows, kèm điền ngược mục "Được sử dụng bởi" trong database.md
8. overview
9. kiểm tra

## Quy trình feedback

User cải thiện skill bằng cách review tài liệu đã sinh, thường dưới dạng cặp actual/expected. Mục "Xử lý feedback" trong SKILL.md quy định từng loại feedback sửa ở đâu:
* **Cách viết** → `convention.md`. Thêm quy tắc, và thêm nguyên văn cặp actual/expected của user thành một dòng trong bảng ❌ Sai / ✅ Đúng của mục tương ứng.
* **Hình dạng file** → file tương ứng trong `templates/`.
* **Nội dung cần có** → `output.md`.
* **Sai ở một tài liệu cụ thể** → chỉ sửa tài liệu đó.

Giữ nguyên câu chữ của các quy tắc user đã chốt, không diễn đạt lại.

## Ngôn ngữ

Toàn bộ nội dung skill và tài liệu sinh ra đều bằng tiếng Việt. Khi sửa thì giữ tiếng Việt, và viết theo đúng convention của chính skill: dùng bullet thay cho đoạn văn dài; điều kiện viết theo mẫu ở convention.md mục 3.
