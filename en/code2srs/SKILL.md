---
name: code2srs
description: Reverse-engineer an SRS (Software Requirements Specification) from the source code of a web app — per-screen docs, business flows, cron jobs, glossary/enums and database design, following the skill's standard format. Use this skill when the user wants to "generate docs from code", "write an SRS for an existing project", "reverse engineer documentation", "document screens / database / cron jobs", update the srs/ docs after the code changes, or review/give feedback to fix the srs/ docs and the skill's format — even if the user never says "SRS".
---

# code2srs

Read the source code of a web app and generate a set of SRS documents in English into the `srs/` folder.

## Skill reference files

**Read all 3 sources below before writing any document.** SKILL.md only describes the *process*.

| File | Defines | Priority on conflict |
|---|---|---|
| [convention.md](convention.md) | **How to write**: tone, how to write conditions, DB reference format, technical level, links, naming | 1 |
| [templates/](templates/) | **Shape** of each file type: section order, headings, tables | 2 |
| [output.md](output.md) | **Content**: folder structure, what information each file must contain | 3 |

When using a template:
* Replace every `{{...}}`.
* Remove all HTML comments.
* Drop sections with no content, except the component table and the Sources section.

## Principles

1. **Code is the source of truth.** Only write what can be read from the code. Do not infer features from variable names, comments or TODOs.
2. **When unsure, mark it.** Logic that depends on env/config, calls to external services, contradictory code, branches that may never run → use the `⚠️ Needs confirmation` marker, do not guess.
3. **Write for business readers.** Describe behavior the user can see, per convention.md section 5. Technical details go into `common-words.md`, `database.md` and the Sources section.
4. **Skip dead code.** Screens with no route, components never imported, jobs never scheduled → do not document them. If in doubt, note it in the inventory.
5. **Every file has a Sources section** at the end.

## Inputs to determine

Ask the user (only what is still unclear):
- **Scope:** the whole project, or only some feature groups / specific screens
- **Output folder:** defaults to `srs/` at the repo root
- **Screenshots:** is the app running (URL, test account for each role)? If not, use placeholders and keep going, do not block.

## Process

Work **strictly in the order below**, because later steps link to the results of earlier steps.

For large projects, handle one feature group at a time and update the inventory after each group, so the work can be paused and resumed.

### Step 1 — Survey & build the inventory

Read the repo structure, identify the stack, then write the working file `.code2srs/inventory.md` at the repo root. This file lives outside `srs/`: it is the skill's notebook, not an output document. Contents:

- **Stack:** FE/BE framework, ORM, i18n library, auth/authorization mechanism
- **Screen list:** URL → component file → planned group → access condition → status (`todo` / `done`)
- **DB table list:** table name → migration/model file
- **Cron job list:** name → schedule → file
- **Flow candidates:** features that span several screens, or involve cron jobs/external systems
- **Notes:** suspected dead code, unclear points

Where to look:

| Information | Usual places |
|---|---|
| Routes / screens | `app/`, `pages/` (Next.js, Nuxt), router declaration files (react-router, vue-router, Angular), `routes/web.php` (Laravel), `config/routes.rb` (Rails), `urls.py` (Django) |
| Authorization | middleware, guards, policies, route meta, HOCs/wrappers around routes, menu render conditions |
| UI text | i18n/locale files (`*.json`, `lang/`), or text hard-coded in components |
| Database | migrations, `schema.prisma`, ORM entities/models, `schema.rb`, SQL dump files |
| Enums | constant/enum files, model casts, `enum` columns in migrations, i18n keys for statuses |
| Cron jobs | `app/Console/Kernel.php` / `routes/console.php` (Laravel), `@Cron` (NestJS), `node-cron`, `whenever`/`sidekiq-cron`, Celery beat, `crontab`, cloud scheduler config (serverless.yml, vercel.json, k8s CronJob) |

If the grouping is not obvious from the code (e.g. there is no `/admin` prefix), agree on it with the user before writing features.

### Step 2 — database.md

Template: `templates/database.md`.
- Type, null, default, FK come from migrations/schema.
- Column descriptions are inferred from how the code uses the column. If unclear, leave blank and mark it for confirmation.
- Leave the **Used by** section empty; fill it in at step 7.

### Step 3 — common-words.md

Template: `templates/common-words.md`.
- **Enums:** collect every enum, status and type from the code.
  - Display text comes from i18n.
  - "When this value is set" comes from where the code assigns that value.
- **Terms:** business concepts used repeatedly, including shared scopes/queries and common filter conditions. E.g. "active user", "paid order".
- Terms discovered in later steps are added to this file.
  - Purpose: screen docs can be written in business terms instead of technical conditions.

### Step 4 — layout.md

Template: `templates/layout.md`. The sidebar menu is a good source of **screen names** for step 5.

### Step 5 — features/

Template: `templates/screen.md`. For each screen in the inventory:
1. Read the screen's component, its child components, hooks/stores, API client and the matching backend handler.
2. List the components to number, per the criteria in output.md section 3.1. Number in reading order: top → bottom, left → right.
3. For each component, trace down to where the data is queried/written to fill in data, filter conditions, sorting, validation.
4. Complex data-writing operations → write a **Processing logic** section, covering every error branch.
5. Take a screenshot if possible (see Screenshots).
6. Review the file you just wrote against the **convention checklist** in step 9.
7. Mark it `done` in the inventory.

### Step 6 — cron-jobs.md

Template: `templates/cron-jobs.md`. Check the timezone in the scheduler/app config; do not assume it.

### Step 7 — flows/ & back-references

- Write flows for the candidates in the inventory, per `templates/flow.md`.
- Fill in the **Used by** section of `database.md`, based on the DB operations recorded in features, cron-jobs and flows.

### Step 8 — overview.md

Template: `templates/overview.md`. Write it last, because it needs the full table of contents.

### Step 9 — Verification

1. Run the link and anchor check script, then fix every error it reports:
   ```bash
   node <skill-dir>/scripts/check-links.mjs srs
   ```
2. **Convention checklist**, review each file:
   - [ ] No long paragraphs; conditions follow the patterns in convention.md section 3
   - [ ] Every `<table>.<column>` is preceded by its meaning: `name (departments.name)`
   - [ ] Component tables contain no param names, endpoints, function names or file paths
   - [ ] URLs contain only the path
   - [ ] Sources section at the end of the file, as a list
   - [ ] No `{{...}}` or template HTML comments left
   - [ ] None of the mistakes in convention.md's ❌ Wrong / ✅ Right tables are repeated
3. Cross-checks:
   - Numbers in screenshots match the No column
   - Every `<table>.<column>` exists in `database.md`
   - Every enum shown on a screen exists in `common-words.md`
4. Collect all `⚠️ Needs confirmation` markers to report to the user.

## Screenshots

Only when the user can provide a running app. Otherwise use placeholders.

- Use whatever browser tool is available (Playwright, browser MCP…). Log in with an account whose role fits the screen.
- **Automatic numbering:** before taking the screenshot, inject an overlay with JS:
  - For each component, get `getBoundingClientRect()`.
  - Draw a red `position:absolute` box with a number label at the top-left corner.
  - Take the screenshot. This guarantees the numbers in the image match the table.
- Modals/dropdowns: interact to open them, then capture into `<screen>-<n>.png`.
- Screens that need data to show all components but the environment has none: still capture, and note which components could not be shown.

## Handling feedback

When the user reviews the generated docs (inline comments, a review file, or actual/expected pairs), classify **each point** before fixing:

| Feedback type | Example | Where to fix |
|---|---|---|
| **Writing style**, applies generally | "conditions should be bullets", "don't write bare `table.column`" | `convention.md`: add/change the rule, **and** add a row to the ❌ Wrong / ✅ Right table of the relevant section, using the user's actual/expected text verbatim |
| **Shape** of a file | "Sources should be at the end of the file", "the header doesn't need to be a table" | the matching file in `templates/` |
| **Content** to include / drop | "add a pagination section", "no need to explain query params" | `output.md`, and the template if the shape is affected |
| **Mistake** in one specific doc | "No.16 counts the wrong status" | only that doc file in `srs/` |

After updating convention / template / output:
1. Briefly tell the user which rule changed and in which file.
2. Re-apply to the docs already generated in `srs/`:
   - Only fix the affected parts, do not regenerate from scratch.
   - If the scope is large (many files), ask the user first: fix now, or at the next generation.
3. Re-run step 9.

Do not "normalize" the convention on your own. Keep the exact wording of rules the user has settled.

## Updating docs when the code changes

1. Identify the changed code files: `git diff`/`git log` since the last generation, or the list the user gives.
2. Find docs in `srs/` whose **Sources** section points to those files, and cross-check with the inventory.
3. Regenerate only the affected docs, then do back-references (step 7) and verification (step 9).
4. Do not overwrite content a human has edited by hand or confirmed. If there is a conflict, ask the user.

## Final report

Keep it short:
- Number of screens / tables / cron jobs / flows documented
- Screens still missing screenshots
- List of `⚠️ Needs confirmation` points, with links
- Things skipped (dead code, out of scope)
