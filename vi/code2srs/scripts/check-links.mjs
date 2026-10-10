#!/usr/bin/env node
// Kiểm tra link tương đối và anchor trong bộ tài liệu SRS.
// Usage: node check-links.mjs <srs-dir>
// Exit code 1 nếu có lỗi.

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || "srs");
if (!fs.existsSync(root)) {
  console.error(`Không tìm thấy thư mục: ${root}`);
  process.exit(2);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

// Bỏ code block để không bắt nhầm heading/link trong ví dụ
function stripCode(text) {
  return text.replace(/^(```|~~~)[\s\S]*?^\1/gm, "").replace(/`[^`\n]*`/g, (m) => m.replace(/[[\]()]/g, " "));
}

// Slug theo quy tắc GitHub: chữ thường, giữ chữ Unicode, bỏ dấu câu, khoảng trắng -> '-'
function slugify(heading) {
  return heading
    .normalize("NFC")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // link/ảnh -> text
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
      errors.push(`${rel(file)}: heading trùng "${m[1]}" (anchor thành #${base}-${n})`);
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
  anchorsOf(file); // ghi nhận heading trùng kể cả file không có link vào
  const text = stripCode(fs.readFileSync(file, "utf8"));
  for (const m of text.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const target = m[1];
    if (/^([a-z]+:|\/\/|mailto:)/i.test(target)) continue; // link ngoài
    linkCount++;
    const [rawPath, rawAnchor] = target.split("#");
    const decodedPath = decodeURIComponent(rawPath);
    const targetFile = decodedPath ? path.resolve(path.dirname(file), decodedPath) : file;

    if (!fs.existsSync(targetFile)) {
      errors.push(`${rel(file)}: file không tồn tại -> ${target}`);
      continue;
    }
    if (rawAnchor !== undefined && targetFile.endsWith(".md")) {
      const anchor = decodeURIComponent(rawAnchor).normalize("NFC");
      if (!anchorsOf(targetFile).has(anchor)) {
        errors.push(`${rel(file)}: anchor không khớp heading nào -> ${target}`);
      }
    }
  }
}

console.log(`Đã kiểm tra ${mdFiles.length} file, ${linkCount} link nội bộ.`);
if (errors.length) {
  console.log(`\n${errors.length} lỗi:`);
  for (const e of errors) console.log(`  - ${e}`);
  process.exit(1);
}
console.log("Không có lỗi.");
