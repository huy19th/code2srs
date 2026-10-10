<!--
TEMPLATE: doc for one screen (features/<group>/<screen>.md)
- {{...}} are placeholders to fill in. HTML comments are instructions. Remove all comments when generating the doc.
- Drop any section with no content (except section 2 and the Sources section).
- Write according to convention.md.
-->
# {{Screen name}}

* **Menu name:** {{text on the sidebar/navbar}} ({{translation, if not English}})
* **URL:** `{{path, without query params}}`
* **Access condition:**
  <!-- One condition → write it directly on one line. Several conditions → use the patterns in convention.md section 3. No need to write "logged in". -->
  Must satisfy one of the conditions below:
  * {{condition 1}}
  * {{condition 2}}

  Otherwise: {{redirect to where / 403 / …}}
* **Shared layout:** see [layout.md](../../layout.md)

{{Purpose of the screen, 1–2 sentences.}}

## 1. Screenshot

![{{screen}}](../../images/{{group}}/{{screen}}.png)

## 2. Components on the screen

<!--
"Description" column: each label starts on a new line (<br>), in the order below. Drop labels that don't apply.
  **Display:**         show/hide condition
  **Enable/Disable:**  enable/disable condition
  **Data:**            <meaning> ([`table.column`](../../database.md#table)), filter conditions (terms linked to common-words), sorting, pagination, format
  **Default:**         default value
  **Enum:**            display text, link to the enum in common-words
  **Input:**           validation (required, length, format…), error messages
  **Click:**           navigate to a screen (link .md) / open a modal (link section 3.x) / see Processing logic (link section 4.x)
  **Data changes:**    what data is added/updated/deleted (which table)
-->

| No | Name | Type | Description |
|---|---|---|---|
| 1 | {{Department dropdown}} | {{Select}} | **Data:** list of department names ([`departments.name`](../../database.md#departments)) containing at least one [active facility](../../common-words.md#active-facility)<br>**Default:** first department in the list |
| 2 | {{"Delete" button}} | {{Button}} | **Display:** Must satisfy the conditions below:<br>• {{condition 1}}<br>• {{condition 2}}<br>**Click:** open [{{Delete confirmation modal}}](#31-delete-confirmation-modal) |

## 3. Extra screenshots

### 3.1. {{Delete confirmation modal}}

* **Opened from:** No.{{x}}
* {{Other characteristics, e.g. cannot be closed by clicking outside}}

![{{screen}}-1](../../images/{{group}}/{{screen}}-1.png)

| No | Name | Type | Description |
|---|---|---|---|
| 1 | {{...}} | {{...}} | {{...}} |

## 4. Processing logic

<!-- Only for complex operations: many steps, many tables, many error branches, external service calls. -->

### 4.1. {{Process name}}

**Trigger:** {{click No.x / screen load / …}}

**Preconditions:**
Must satisfy the conditions below:
* {{condition 1}}
* {{condition 2}}

Otherwise: {{result shown}}

**Steps:**
1. {{step 1}}
2. {{step 2}}
   * {{branch: condition}} → {{result}}

**Data changed:**
* Create: {{meaning}} ([`{{table}}`](../../database.md#{{table}}))
* Update: {{meaning}} ([`{{table}}.{{column}}`](../../database.md#{{table}}))
* Delete: {{...}}

**Errors:**
* {{error case}} → {{result shown to the user}}

**Side effects:**
* {{send mail / write log / call external API / …}}

## Sources

* `{{file path}}`: {{short note, if needed}}
