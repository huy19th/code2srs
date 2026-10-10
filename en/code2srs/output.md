# CODE2SRS — Output specification

This file defines **what content each file must have**.
* How to write (tone, conditions, reference format…): [convention.md](convention.md)
* Shape of each file: [templates/](templates/)

## 1. Purpose

Generate SRS (Software Requirements Specification) documents by reverse-reading the source code.
* Readers: BA, QA, PM, new devs.
* The docs describe **what the system currently does**, based on the actual code, not on guesses.

## 2. Output structure

```
srs
├── overview.md             // project overview + table of contents
├── layout.md               // shared UI components (header, sidebar, footer…)
├── common-words.md         // glossary & enums
├── database.md             // database design
├── cron-jobs.md            // list of cron jobs
├── features                // per-screen docs, grouped
│   ├── <group-1>           // e.g. admin
│   │   ├── <screen-1>.md   // one file per screen
│   │   └── <screen-2>.md
│   └── <group-n>
├── flows                   // business flows spanning several screens / cron jobs
│   ├── <flow-1>.md
│   └── <flow-n>.md
└── images                  // screenshots & other images, same structure as features
    ├── <group-1>
    └── <group-n>
```

| File | Template |
|---|---|
| `features/<group>/<screen>.md` | [templates/screen.md](templates/screen.md) |
| `flows/<flow>.md` | [templates/flow.md](templates/flow.md) |
| `layout.md` | [templates/layout.md](templates/layout.md) |
| `cron-jobs.md` | [templates/cron-jobs.md](templates/cron-jobs.md) |
| `common-words.md` | [templates/common-words.md](templates/common-words.md) |
| `database.md` | [templates/database.md](templates/database.md) |
| `overview.md` | [templates/overview.md](templates/overview.md) |

Every file (except `overview.md`) ends with a **Sources** section: the list of corresponding code files, for verification and for updating when the code changes.

## 3. Details of each part

### 3.1. images

* Stores screen screenshots. Components on the screen are boxed and numbered.
* Besides buttons, inputs, links… also number components that satisfy **one of** the conditions below:
  * Have a show/hide or enable/disable condition
  * Navigate to another screen/page when clicked
  * Display dynamic content (data from DB/API, or computed)
* Numbers in the image must match the **No** column of the component table.
* Store other images besides screenshots if needed (diagrams…).
* If no screenshot can be taken, still write the component table, and add the "No screenshot yet" marker (convention.md section 10).

### 3.2. features

* Group screens by feature group, one folder per group. E.g. `admin`, `user`.
* One `.md` file per screen.
* Modals/dialogs/drawers do **not** get their own file; describe them in the "Extra screenshots" section of the screen that opens them.
* File header:
  * Menu name
  * URL
  * Access condition, and the result when not satisfied
    * No need to mention that logged-out users are redirected to login.
  * Purpose of the screen (1–2 sentences)
* **Component table**, the Description column contains the labels below (drop labels that don't apply):
  * **Display:** show/hide condition
  * **Enable/Disable:** enable/disable condition
  * **Data:** what information is shown, filter conditions, sorting, pagination, format
  * **Default:** default value
  * **Enum:** meaning of values, link to the enum
  * **Input:** validation (required, length, format, unique…) and error messages. If FE and BE validation differ, write both.
  * **Click:** navigate to another screen / open another UI component / run processing
  * **Data changes:** what data is added/updated/deleted. For complex logic, link to the Processing logic section.
* **Extra screenshots:** modals, dropdowns, other states of the screen. One section each, with its own component table if needed.
* **Processing logic:** written for complex operations (many steps, many tables, many error branches, external service calls). Each process contains:
  * Trigger
  * Preconditions
  * Processing steps (in order)
  * Data changed
  * Error cases and the result shown to the user
  * Side effects: sending mail, push notifications, logging, external API calls…

### 3.3. flows

* For features spanning several screens, or involving cron jobs / external systems. E.g. sign up → verify email → complete profile.
* One file per flow, containing:
  * Purpose, actors, start condition, end result
  * Sequence diagram (Mermaid)
  * Table of steps, linking to screens / cron jobs
  * Branches / errors

### 3.4. cron-jobs.md

* Summary table with: Name, Schedule (cron expression + explanation + timezone), Description, Data changed.
* Cron jobs with complex logic get their own section below the table.

### 3.5. common-words.md

The file holding detailed explanations of terms and enums, for other files to link to.

* **Terms:** business concepts used repeatedly. Each term has a business explanation and a technical condition.
  * This is the only place technical conditions are written; other files only link here.
* **Enums:** each enum is a heading `Enum <table>.<column>`, containing:
  * Meaning of the enum
  * Value table: DB value, display text, meaning, when this value is set

### 3.6. overview.md

* Short introduction: purpose, target users
* Roles and general permissions
* Main tech stack. List only, no deep dive.
* Table of contents linking to every file in `srs/`

### 3.7. layout.md

* UI components repeated across screens: header, sidebar, footer, breadcrumb, notifications…
* Screens in `features/` do not describe these components again, they only link to `layout.md`.

### 3.8. database.md

* Entity relationship diagram (ERD), if the number of tables is not too large
* Each table is a heading using the real table name, containing:
  * Description of what the table stores
  * Column table: name, type, null, default, description (FK, enum link)
  * Important indexes / unique constraints
  * **Used by:** screens, cron jobs, flows touching the table (with links), stating read (R) or write (W)
