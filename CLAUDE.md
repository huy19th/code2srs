# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This repo holds the source of several Claude skills.
* Skills are split by language: `en/` (English) and `vi/` (Vietnamese). Each skill is a subfolder of a language folder, with `SKILL.md` as its entry point.
* This repo is not an app. It is almost entirely Markdown files containing instructions for the agent running the skill.
* For the list of skills, see [README.md](README.md).

## Folder structure

```
en/
  <skill-name>/
    SKILL.md        # entry point, frontmatter has name + description
    ...             # the skill's supporting files: convention, templates, scripts...
vi/
  <skill-name>/
    ...
```

* The skill folder name matches the `name` in the `SKILL.md` frontmatter.
* The two language versions of a skill use the **same name** (`en/<skill-name>`, `vi/<skill-name>`), because a user installs only one of them. A skill does not have to exist in both languages.
* When a skill exists in both languages, the two versions must be **structurally identical**: same file list, same section order, same rules. When you change one version, make the matching change in the other, unless the user says to change only one.
* Each skill folder must be **self-contained**: do not link to or import files outside its folder, because only that folder is copied on install.
* Links between files within a skill use relative paths.

To install a skill: copy the `<language>/<skill-name>/` folder to `~/.claude/skills/<skill-name>/` (or to a project's `.claude/skills/`).

## Adding a new skill

* Create the folder `<language>/<skill-name>/` with a `SKILL.md`.
* Add a row to the skill table in `README.md`.
* If the skill has its own process or commands that an agent editing the skill should know about, add a `## Skill: <skill-name>` section at the end of this file.

## Language

* Skill content is written in the language of its parent folder: English under `en/`, Vietnamese under `vi/`.
* When editing, keep the language already in use.
* This file and the README are written in English.

## Skill: code2srs

Folders: `en/code2srs/` and `vi/code2srs/`. Paths in this section are relative to the skill folder.

* The skill reverse-reads the source code of a web app to generate SRS (Software Requirements Specification) documents. The `en/` version generates English docs; the `vi/` version generates Vietnamese docs.
* The docs are written to the `srs/` folder of the *target project*, not this repo.

### Commands

The only code is a Node script (no dependencies, no build). It checks relative links and heading anchors in a generated `srs/` folder:

```bash
node en/code2srs/scripts/check-links.mjs <srs-path>
node vi/code2srs/scripts/check-links.mjs <srs-path>
```

* The two script versions differ only in messages and comments. Their logic must stay identical.
* Exit code 1 on any of these errors:
  * file does not exist
  * anchor matches no heading
  * duplicate heading
* Anchors follow GitHub's slug rules: lowercase, Vietnamese diacritics kept, punctuation removed, spaces → `-`.
* To test a change, build a small sample `srs/` folder in the scratchpad.

### How the skill's files relate

| File | Role |
|---|---|
| `SKILL.md` | Entry point and **process**: the 9 generation steps, screenshots, handling feedback, updating docs when the code changes |
| `convention.md` | **How to write**: condition patterns, the `<meaning> (<table>.<column>)` reference format, technical level, URL/link/naming rules, markers |
| `templates/*.md` | **Shape** of each output file. `{{...}}` are placeholders; HTML comments are instructions for the agent and are removed from the output |
| `output.md` | **Content**: the `srs/` folder structure and what information each file must contain |

* On conflict, priority is: convention.md → templates → output.md (this order is stated in SKILL.md).
* Each rule should live in **one** file only. When editing, put the rule in the right file and reference it from the others; do not duplicate it.

The generation order in SKILL.md matters, because docs generated later link to docs generated earlier:
1. inventory
2. database
3. common-words
4. layout
5. features
6. cron-jobs
7. flows, plus back-filling the "Used by" section in database.md
8. overview
9. verification

### Feedback process

The user improves the skill by reviewing the generated docs, usually as actual/expected pairs. The "Handling feedback" section in SKILL.md defines where each type of feedback is fixed:
* **Writing style** → `convention.md`. Add the rule, and add the user's actual/expected pair verbatim as a row in the ❌ Wrong / ✅ Right table (vi version: ❌ Sai / ✅ Đúng) of the relevant section.
* **File shape** → the matching file in `templates/`.
* **Required content** → `output.md`.
* **Mistake in one specific doc** → fix only that doc.

Keep the exact wording of rules the user has settled; do not paraphrase them.

Feedback given for one version is applied to the other by translating it, including the actual/expected pair. The version in the same language as the feedback keeps it verbatim.

### Language

* Skill content and generated docs use the language of the folder: English under `en/`, Vietnamese under `vi/`.
* Fixed headings in the generated docs have matching names across the two versions. E.g. `Sources` ↔ `Nguồn`, `Needs confirmation` ↔ `Cần xác nhận`, `Used by` ↔ `Được sử dụng bởi`.
* When editing, follow the skill's own convention: bullets instead of long paragraphs; conditions follow the patterns in convention.md section 3.
