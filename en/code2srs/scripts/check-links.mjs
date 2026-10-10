#!/usr/bin/env node
// Check relative links and anchors in a set of SRS docs.
// Usage: node check-links.mjs <srs-dir>
// Exit code 1 if there are errors.

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || "srs");
if (!fs.existsSync(root)) {
  console.error(`Folder not found: ${root}`);
  process.exit(2);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

// Strip code blocks so headings/links in examples are not picked up
function stripCode(text) {
  return text.replace(/^(```|~~~)[\s\S]*?^\1/gm, "").replace(/`[^`\n]*`/g, (m) => m.replace(/[[\]()]/g, " "));
}

// Slug per GitHub rules: lowercase, keep Unicode letters, drop punctuation, spaces -> '-'
function slugify(heading) {
  return heading
    .normalize("NFC")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // link/image -> text
    .replace(/<[^>]+>/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{M}\p{N}_\- ]/gu, "")
    .replace(/ /g, "-");
}

const anchorCache = new Map();
const errors = [];

function anchorsOf(file) {
  if (anchorCache.has(file)) return anchorCache.get(file);
  const text = fs.readFileSync(file, "utf8").replace(/^(```|~~~)[\s\S]*?^\1/gm, "");
  const anchors = new Set();
  const seen = new Map();
  for (const m of text.matchAll(/^#{1,6}\s+(.+?)\s*#*\s*$/gm)) {
    const base = slugify(m[1]);
    const n = seen.get(base) || 0;
    seen.set(base, n + 1);
    if (n > 0) {
      errors.push(`${rel(file)}: duplicate heading "${m[1]}" (anchor becomes #${base}-${n})`);
      anchors.add(`${base}-${n}`);
    } else {
      anchors.add(base);
    }
  }
  anchorCache.set(file, anchors);
  return anchors;
}

const rel = (p) => path.relative(root, p).replaceAll("\\", "/");

const mdFiles = walk(root).filter((f) => f.endsWith(".md"));
let linkCount = 0;

for (const file of mdFiles) {
  anchorsOf(file); // record duplicate headings even in files nothing links to
  const text = stripCode(fs.readFileSync(file, "utf8"));
  for (const m of text.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const target = m[1];
    if (/^([a-z]+:|\/\/|mailto:)/i.test(target)) continue; // external link
    linkCount++;
    const [rawPath, rawAnchor] = target.split("#");
    const decodedPath = decodeURIComponent(rawPath);
    const targetFile = decodedPath ? path.resolve(path.dirname(file), decodedPath) : file;

    if (!fs.existsSync(targetFile)) {
      errors.push(`${rel(file)}: file does not exist -> ${target}`);
      continue;
    }
    if (rawAnchor !== undefined && targetFile.endsWith(".md")) {
      const anchor = decodeURIComponent(rawAnchor).normalize("NFC");
      if (!anchorsOf(targetFile).has(anchor)) {
        errors.push(`${rel(file)}: anchor matches no heading -> ${target}`);
      }
    }
  }
}

console.log(`Checked ${mdFiles.length} files, ${linkCount} internal links.`);
if (errors.length) {
  console.log(`\n${errors.length} errors:`);
  for (const e of errors) console.log(`  - ${e}`);
  process.exit(1);
}
console.log("No errors.");
