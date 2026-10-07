# Claude Skills

Bộ sưu tập các [Claude skill](https://docs.claude.com/en/docs/claude-code/skills) dùng cho Claude Code.

## Danh sách skill

| Skill | Mô tả |
|---|---|
| [code2srs](skills/code2srs/SKILL.md) | Đọc ngược source code của một web app để sinh tài liệu SRS bằng tiếng Việt: màn hình, flow nghiệp vụ, cron job, thuật ngữ, database |

## Cài đặt

Copy thư mục của skill cần dùng vào thư mục skills của Claude Code:

* Dùng cho mọi dự án: `~/.claude/skills/<tên-skill>/`
* Chỉ dùng cho một dự án: `<dự-án>/.claude/skills/<tên-skill>/`

Ví dụ với `code2srs`:

```bash
cp -r skills/code2srs ~/.claude/skills/code2srs
```

## Cấu trúc repo

```
skills/
  <tên-skill>/
    SKILL.md   # điểm vào của skill
    ...        # file phụ: convention, templates, scripts...
CLAUDE.md      # hướng dẫn cho Claude Code khi sửa repo này
README.md
```

## Thêm skill mới

1. Tạo thư mục `skills/<tên-skill>/` có `SKILL.md` (frontmatter gồm `name` và `description`).
2. Giữ thư mục skill tự chứa đủ: không tham chiếu file nằm ngoài thư mục đó.
3. Thêm một dòng vào bảng [Danh sách skill](#danh-sách-skill).
