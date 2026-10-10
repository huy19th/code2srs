# CODE2SRS — Writing convention

This file defines **how to write**. What each file must contain: see [output.md](output.md); the shape of each file: see [templates/](templates/).

Applies to every file in `srs/`. When the user gives feedback on writing style, update this file (see SKILL.md, section "Handling feedback").

## 1. Language

* Docs are written in English.
* UI text is kept verbatim as in the code/i18n.
  * If it is not English, add a translation: `Cài đặt (Settings)`.
* Table names, column names and file paths are kept as-is, in backticks.

## 2. Layout: lists, not paragraphs

* One point per bullet, or one sentence per line.
* No paragraph longer than 2 sentences.
* Inside a markdown table cell, where line breaks are not possible, use `<br>`:
  * Level-1 bullet: `<br>• `
  * Level-2 bullet: `<br>&emsp;◦ `
* Each label (**Display:**, **Data:**, **Click:**…) starts on a new line.

| ❌ Wrong | ✅ Right |
|---|---|
| Logged in, and is admin, **or** a regular user satisfying both: (a) has at least one assigned facility…; (b) has at least one active facility… | Must satisfy one of the conditions below:<br>• Is admin<br>• Is a regular user:<br>&emsp;◦ Has at least one assigned facility<br>&emsp;◦ Has at least one active facility |

## 3. Writing conditions

Applies to all conditional content: access conditions, display, enable/disable, data filtering, branching in processing logic.

* Only **one** condition → write it directly on one line.
* **Several** conditions → use exactly one of the patterns below. One condition per line.

**Satisfy all (AND):**
```
Must satisfy the conditions below:
* condition 1
* condition 2
```

**Satisfy one of (OR):**
```
Must satisfy one of the conditions below:
* condition 1
* condition 2
```

**Combined (OR of AND groups):**
```
Must satisfy one of the conditions below:
* Condition group 1:
  * condition 1.1
  * condition 1.2
* Condition group 2:
  * condition 2.1
  * condition 2.2
```

* Each group means **all** conditions in the group must be satisfied. If the group has a business meaning, name it instead of "Condition group n". E.g. "Regular user:".
* The result when not satisfied goes on its own line, right after the list: `Otherwise: <result>`.
* Inside a table cell, write per section 2: `Must satisfy the conditions below:<br>• condition 1<br>• condition 2`

## 4. Referring to DB data

* Do not write a bare `<table>.<column>`. Use the format **`<meaning> (<table>.<column>)`**, where the `<table>.<column>` part links to the table in `database.md`:
  * `department name ([`departments.name`](../../database.md#departments))`
* For list data, say explicitly that it is a list:
  * `list of department names ([`departments.name`](../../database.md#departments))`
* Write filter conditions in business terms, linking to `common-words.md`. Do not write SQL conditions (`= 1`, `IS NULL`…) in screen docs.
* Enum values: write the display text, linking to the enum in `common-words.md`. Do not write the numeric DB value.

| ❌ Wrong | ✅ Right |
|---|---|
| **Data:** `facilities.name` of the selected facility. If none, `NA` | **Data:** name ([`facilities.name`](../../database.md#facilities)) of the selected facility.<br>If none, `NA` |
| **Data:** `departments.name` of departments containing at least one active facility | **Data:** list of department names ([`departments.name`](../../database.md#departments)) containing at least one [active facility](../../common-words.md#active-facility) |
| `roles.view = 1` | has [facility view permission](../../common-words.md#facility-view-permission) |

## 5. Technical level

The main readers are BA/QA/PM. Describe **behavior the user can see**, not how the code runs.

* In component tables, do **not** use:
  * query param, variable, function or class names
  * API endpoints, HTTP methods, status codes
  * code file paths
* Refer to other components on the screen as `No.x`.
* The **Processing logic** section may be more detailed, but still writes the business steps first. Class names and endpoints only when really needed for devs to look things up.
* All code file paths go into the **Sources** section at the end of the file.

| ❌ Wrong | ✅ Right |
|---|---|
| **Click:** reload the Dashboard with the `department_id`, `facility_id`, `setting_month` selected in No.1–3 | **Click:** reload the Dashboard, applying filters No.1–3 |
| **URL:** `/?department_id=:id&facility_id=:id&setting_month=:YYYY/MM`, all 3 params optional… | **URL:** `/` |

## 6. URL

* Path only. Path params are written as `:param`. E.g. `/admin/users/:id`.
* Do not write or explain query params.

## 7. Hyperlinks

* All links use relative paths, in the format `[text](path#anchor)`.
* DB columns: link to the table heading in `database.md`. See section 4.
* Terms, enums: link to the matching heading in `common-words.md`.
* Other screens: link to that screen's `.md` file. For screens not yet documented, write the screen name followed by "(not documented yet)".
* Heading anchors follow GitHub's rules:
  * lowercase, Unicode letters kept
  * spaces → `-`
  * punctuation removed (`.`, `,`, `(`, `)`, `/`…)
  * Example: `#### Enum users.status` → `#enum-usersstatus`
* A referenced heading must be unique within its file.

## 8. File & folder naming

* File and folder names use `kebab-case`, ASCII, English. E.g. `user-list.md`, `admin/`.
* A screen's images go in `images/<group>/`:
  * `<screen>.png`: main screenshot
  * `<screen>-<n>.png`: extra screenshots (modal, dropdown, other states…)

## 9. Sources

* Placed at the **end of the file**, under its own heading `## Sources`.
* Written as a list, one file per line, with a short note if needed:
  ```
  * `routes/web.php`: route `home.index`
  * `app/Http/Controllers/HomepageController.php`
  ```

## 10. Markers

* Uncertain points (logic depending on config/env, external service calls, contradictory code…). Do not guess; write:
  ```
  > ⚠️ **Needs confirmation:** <description of what is unclear>
  ```
* No screenshot yet:
  ```
  > 📷 **No screenshot yet:** <reason>
  ```
