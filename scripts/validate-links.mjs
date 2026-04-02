#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const docFiles = [
  "README.md",
  "AGENTS.md",
  "plugin.json",
  ".cursor-plugin/plugin.json",
  ".codex-plugin/plugin.json",
  ".claude-plugin/marketplace.json",
  ".github/plugin/marketplace.json",
  ".agents/plugins/marketplace.json"
];

let errors = 0;
const seenUrls = new Set();

function fail(message) {
  console.error(`  ✗ ${message}`);
  errors += 1;
}

function pass(message) {
  console.log(`  ✓ ${message}`);
}

function resolveFromRoot(relativePath) {
  return path.join(rootDir, relativePath);
}

function checkLocalRef(filePath, ref, resolver = relative => path.join(path.dirname(filePath), relative)) {
  if (/^(https?:|mailto:|tel:|#)/i.test(ref)) return;
  const clean = ref.split("#")[0].split("?")[0];
  if (!clean) return;
  const resolved = resolver(clean);
  if (existsSync(resolved)) {
    pass(`${path.relative(rootDir, filePath)} -> ${ref}`);
  } else {
    fail(`${path.relative(rootDir, filePath)} -> ${ref} does not resolve`);
  }
}

console.log("\nChecking Markdown links...");
for (const relativePath of docFiles.filter(file => file.endsWith(".md"))) {
  const filePath = resolveFromRoot(relativePath);
  const content = readFileSync(filePath, "utf8");
  for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    checkLocalRef(filePath, match[1].trim());
  }
}

console.log("\nChecking manifest paths...");
for (const relativePath of ["plugin.json", ".cursor-plugin/plugin.json", ".codex-plugin/plugin.json"]) {
  const filePath = resolveFromRoot(relativePath);
  const manifest = JSON.parse(readFileSync(filePath, "utf8"));
  for (const key of ["skills", "mcpServers", "hooks"]) {
    if (manifest[key]) checkLocalRef(filePath, manifest[key], relative => resolveFromRoot(relative));
  }
  for (const key of ["logo"]) {
    if (manifest[key]) checkLocalRef(filePath, manifest[key], relative => resolveFromRoot(relative));
  }
  if (manifest.interface?.composerIcon) {
    checkLocalRef(filePath, manifest.interface.composerIcon, relative => resolveFromRoot(relative));
  }
  if (manifest.interface?.logo) {
    checkLocalRef(filePath, manifest.interface.logo, relative => resolveFromRoot(relative));
  }
}

console.log("\nChecking marketplace sources...");
for (const relativePath of [".claude-plugin/marketplace.json", ".github/plugin/marketplace.json"]) {
  const filePath = resolveFromRoot(relativePath);
  const marketplace = JSON.parse(readFileSync(filePath, "utf8"));
  for (const plugin of marketplace.plugins ?? []) {
    if (typeof plugin.source === "string") {
      checkLocalRef(filePath, plugin.source, relative => resolveFromRoot(relative));
    }
  }
}

{
  const filePath = resolveFromRoot(".agents/plugins/marketplace.json");
  const marketplace = JSON.parse(readFileSync(filePath, "utf8"));
  for (const plugin of marketplace.plugins ?? []) {
    if (plugin.source?.path) {
      checkLocalRef(filePath, plugin.source.path, relative => resolveFromRoot(relative));
    }
  }
}

console.log("\nChecking skill icon refs...");
const skillsDir = resolveFromRoot("skills");
for (const skillName of Object.keys(Object.fromEntries((await import("node:fs")).readdirSync(skillsDir).filter(name => !name.startsWith(".")).map(name => [name, true])))) {
  const skillDir = path.join(skillsDir, skillName);
  const yamlPath = path.join(skillDir, "agents", "openai.yaml");
  const yaml = readFileSync(yamlPath, "utf8");
  for (const match of yaml.matchAll(/icon_(?:small|large):\s*["']([^"']+)["']/g)) {
    checkLocalRef(yamlPath, match[1], relative => path.join(skillDir, relative));
  }
}

console.log("\nChecking external URLs...");
for (const relativePath of docFiles) {
  const filePath = resolveFromRoot(relativePath);
  const content = readFileSync(filePath, "utf8");
  for (const match of content.matchAll(/https?:\/\/[^"')\s`]+/g)) {
    const url = match[0];
    if (url === "http://www.w3.org/2000/svg") continue;
    seenUrls.add(url);
  }
}

for (const url of [...seenUrls].sort()) {
  try {
    const response = await fetch(url, { method: "GET", redirect: "follow" });
    const ok = (response.status >= 200 && response.status < 400) || response.status === 401 || response.status === 403;
    if (ok) {
      pass(`${response.status} ${url}`);
    } else {
      fail(`${response.status} ${url}`);
    }
  } catch (error) {
    fail(`ERR ${url} (${error})`);
  }
}

console.log("");
if (errors > 0) {
  console.error(`✗ ${errors} link/path check(s) failed.`);
  process.exit(1);
}

console.log("✓ All links and paths passed.");
