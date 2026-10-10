<!--
TEMPLATE: common-words.md
- {{...}} are placeholders to fill in. Remove all comments when generating the doc.
- This is the ONLY place where the technical (SQL-like) condition of a term is written; other files only link here.
- Headings must be unique in the file, because other files link to them by anchor.
- Write according to convention.md.
-->
# Glossary & Enums

## 1. Terms

### {{Deleted user}}

{{Business explanation, 1–2 sentences.}}

**Condition:**
<!-- For several conditions, use the patterns in convention.md section 3. -->
* [`{{users.deleted_at}}`](database.md#{{users}}) {{is not NULL}}

## 2. Enums

### Enum {{users.status}}

* **Meaning:** {{status of the user}} ([`{{users.status}}`](database.md#{{users}}))

| DB value | Display text | Meaning | When this value is set |
|---|---|---|---|
| `{{1}}` | {{Active}} | {{...}} | {{After the user verifies their email}} |

## Sources

* `{{file defining the enum / scope / constant}}`
