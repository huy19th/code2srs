<!--
TEMPLATE: layout.md (UI components shared across many screens)
- {{...}} are placeholders to fill in. Remove all comments when generating the doc.
- Component tables are written like section 2 of templates/screen.md.
- Write according to convention.md.
-->
# Shared layout

* **Applies to:** {{all screens after login / screens in the admin group / …}}

## 1. {{Header}}

![layout-header](images/layout/{{header}}.png)

| No | Name | Type | Description |
|---|---|---|---|
| 1 | {{...}} | {{...}} | {{...}} |

## 2. {{Sidebar}}

![layout-sidebar](images/layout/{{sidebar}}.png)

| No | Name | Type | Description |
|---|---|---|---|
| 1 | {{"Dashboard" menu}} | Link | **Display:** {{condition}}<br>**Click:** go to [{{Dashboard}}](features/{{group}}/{{screen}}.md) |

## Sources

* `{{file path}}`
