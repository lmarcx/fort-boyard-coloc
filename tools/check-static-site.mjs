import { access, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const entryFile = "index.html";
const requiredFiles = [entryFile, "style.css", "app.js"];
const localRefPattern = /\b(?:href|src)=["']([^"']+)["']/gi;

const ignoredProtocols = [
  "http:",
  "https:",
  "mailto:",
  "tel:",
  "data:",
  "blob:",
  "javascript:",
];

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

function normalizeLocalRef(rawRef) {
  const ref = rawRef.trim();

  if (!ref || ref.startsWith("#") || ref.startsWith("//")) {
    return null;
  }

  let parsed;
  try {
    parsed = new URL(ref, "https://example.test/");
  } catch {
    throw new Error(`Invalid URL reference: ${ref}`);
  }

  if (ignoredProtocols.includes(parsed.protocol)) {
    return null;
  }

  const pathname = decodeURIComponent(parsed.pathname).replace(/^\/+/, "");
  return pathname || null;
}

const failures = [];

for (const file of requiredFiles) {
  if (!(await exists(file))) {
    failures.push(`Missing required file: ${file}`);
  }
}

const html = await readFile(path.join(root, entryFile), "utf8");
const refs = [...html.matchAll(localRefPattern)].map((match) => match[1]);

for (const ref of refs) {
  const localPath = normalizeLocalRef(ref);
  if (localPath && !(await exists(localPath))) {
    failures.push(`Missing local asset referenced by ${entryFile}: ${ref}`);
  }
}

if (!html.includes('<meta charset="UTF-8">')) {
  failures.push(`${entryFile} should declare UTF-8 encoding`);
}

if (!html.includes('<html lang="fr">')) {
  failures.push(`${entryFile} should declare lang="fr"`);
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Static site check passed (${refs.length} local references scanned).`);
