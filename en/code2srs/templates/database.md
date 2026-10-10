<!--
TEMPLATE: database.md
- {{...}} are placeholders to fill in. Remove all comments when generating the doc.
- Each table is a heading "## <real table name>" so it has a stable anchor (#<table name>).
- Only draw the ERD when the number of tables is not too large (~30 tables).
- Write according to convention.md.
-->
# Database

## Entity relationship diagram

```mermaid
erDiagram
  {{companies}} ||--o{ {{users}} : "{{has}}"
```

## {{users}}

{{What the table stores, 1 sentence.}}

| Column | Type | Null | Default | Description |
|---|---|---|---|---|
| `id` | bigint | ✗ | auto | PK |
| `{{status}}` | {{tinyint}} | ✗ | `{{0}}` | {{User status}}. See [enum](common-words.md#enum-{{usersstatus}}) |
| `{{company_id}}` | bigint | ✓ | | FK → [`companies.id`](#{{companies}}) |

**Indexes / unique:**
* {{unique(`email`)}}

**Used by:**
* [{{User list}}](features/{{group}}/{{screen}}.md): read (R)
* [{{SendReminderMail}}](cron-jobs.md#{{sendremindermail}}): write (W)

**Sources:**
* `{{migration / model / schema file}}`
