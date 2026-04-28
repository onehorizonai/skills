#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import {
  buildCodexLocalMarketplace,
  buildCodexManifest,
  buildCursorManifest,
  buildMarketplace,
  loadBaseManifest,
  readJson
} from "./manifest-lib.mjs";

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
let errors = 0;

function pass(message) {
  console.log(`  ✓ ${message}`);
}

function fail(message) {
  console.error(`  ✗ ${message}`);
  errors += 1;
}

function check(condition, success, failure) {
  if (condition) {
    pass(success);
  } else {
    fail(failure);
  }
}

function parseFrontmatter(filePath) {
  const content = readFileSync(filePath, "utf8");
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const result = {};
  for (const line of match[1].split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();
    if (key) result[key] = value;
  }
  return result;
}

function pluginRootPath(relativePath) {
  return path.join(rootDir, relativePath);
}

function skillPath(...parts) {
  return path.join(rootDir, "skills", ...parts);
}

function skillText(skillName) {
  return readFileSync(skillPath(skillName, "SKILL.md"), "utf8");
}

function checkDocumentMcpContract() {
  const manageDocuments = skillText("manage-documents");
  const taskManagement = skillText("task-management");
  const findDocumentsFullContentAssumptions = [
    /`?find-documents`?[^.\n]*(?:returns|includes|provides)[^.\n]*(?:full\s+(?:document\s+)?(?:content|body)|document bod(?:y|ies)|`content`)/i,
    /(?:read|load|extract|summarize)[^.\n]*(?:full\s+)?(?:document\s+)?(?:content|body)[^.\n]*(?:from|using)\s+`?find-documents`?/i,
    /use\s+`?find-documents`?[^.\n]*(?:to|for)[^.\n]*(?:read|load|extract|summarize)[^.\n]*(?:full\s+)?(?:document\s+)?(?:content|body)/i
  ];

  check(
    /find-documents[\s\S]{0,120}metadata plus `excerpt`/.test(manageDocuments),
    "manage-documents: find-documents metadata/excerpt contract documented",
    "manage-documents: find-documents must be documented as metadata plus excerpt only"
  );
  check(
    /Use `find-documents`[\s\S]{0,180}Use `get-document`[\s\S]{0,120}full document content/.test(manageDocuments),
    "manage-documents: get-document required for full content",
    "manage-documents: must direct agents to use get-document for full document content"
  );
  check(
    /find-documents[\s\S]{0,140}metadata plus `excerpt` only/.test(taskManagement),
    "task-management: document lookup treats find-documents as metadata/excerpt only",
    "task-management: document lookup must treat find-documents as metadata/excerpt only"
  );
  check(
    /full task context, call `get-task-details`/.test(taskManagement),
    "task-management: get-task-details remains the full task context path",
    "task-management: must continue recommending get-task-details for full task context"
  );

  for (const skillName of readdirSync(skillPath()).filter(name => !name.startsWith("."))) {
    const text = skillText(skillName);
    check(
      !findDocumentsFullContentAssumptions.some(pattern => pattern.test(text)),
      `skills/${skillName}: no full-content assumption for find-documents`,
      `skills/${skillName}: remove instructions that imply find-documents returns full content`
    );
  }
}

console.log("\nChecking root files...");
for (const required of [
  "plugin.json",
  ".mcp.json",
  "copilot-hooks.json",
  ".cursor-plugin/plugin.json",
  ".codex-plugin/plugin.json",
  ".claude-plugin/marketplace.json",
  ".github/plugin/marketplace.json",
  ".agents/plugins/marketplace.json",
  "assets/logo.svg",
  "assets/one-horizon-large.svg",
  "assets/one-horizon-codex.svg",
  "hooks/scripts/inject_one_horizon_policy.mjs"
]) {
  check(existsSync(pluginRootPath(required)), `${required} exists`, `${required} is missing`);
}

const base = loadBaseManifest(rootDir);
console.log("\nChecking canonical manifest...");
for (const field of ["name", "description", "version", "homepage", "repository", "license", "skills", "mcpServers", "hooks"]) {
  check(!!base[field], `plugin.json: ${field} present`, `plugin.json: ${field} missing`);
}
check(base.name === "one-horizon", 'plugin.json: name is "one-horizon"', `plugin.json: unexpected name "${base.name}"`);
check(base.repository === "https://github.com/onehorizonai/skills", "plugin.json: repository points at the live repo", `plugin.json: unexpected repository "${base.repository}"`);
check(base.skills === "./skills/", 'plugin.json: skills path is "./skills/"', `plugin.json: unexpected skills path "${base.skills}"`);
check(base.mcpServers === "./.mcp.json", 'plugin.json: MCP path is "./.mcp.json"', `plugin.json: unexpected MCP path "${base.mcpServers}"`);
check(base.hooks === "./copilot-hooks.json", 'plugin.json: hooks path is "./copilot-hooks.json"', `plugin.json: unexpected hooks path "${base.hooks}"`);

console.log("\nChecking generated manifests...");
const generated = [
  [".cursor-plugin/plugin.json", buildCursorManifest(base)],
  [".codex-plugin/plugin.json", buildCodexManifest(base)],
  [".claude-plugin/marketplace.json", buildMarketplace(base, ".")],
  [".github/plugin/marketplace.json", buildMarketplace(base, ".")],
  [".agents/plugins/marketplace.json", buildCodexLocalMarketplace(base)]
];

for (const [relativePath, expected] of generated) {
  const actual = readJson(pluginRootPath(relativePath));
  check(
    JSON.stringify(actual) === JSON.stringify(expected),
    `${relativePath} is in sync`,
    `${relativePath} is out of sync with plugin.json (run node ./scripts/build-manifests.mjs)`
  );
}

console.log("\nChecking skills...");
const skillDirs = readdirSync(skillPath()).filter(name => !name.startsWith("."));
check(skillDirs.length > 0, `found ${skillDirs.length} skills`, "no skills found");

for (const skillName of skillDirs) {
  const skillDir = skillPath(skillName);
  const skillMd = path.join(skillDir, "SKILL.md");
  const openaiYaml = path.join(skillDir, "agents", "openai.yaml");
  const logo = path.join(skillDir, "assets", "logo.svg");

  check(existsSync(skillMd), `skills/${skillName}/SKILL.md exists`, `skills/${skillName}/SKILL.md missing`);
  check(existsSync(openaiYaml), `skills/${skillName}/agents/openai.yaml exists`, `skills/${skillName}/agents/openai.yaml missing`);
  check(existsSync(logo), `skills/${skillName}/assets/logo.svg exists`, `skills/${skillName}/assets/logo.svg missing`);

  if (!existsSync(skillMd) || !existsSync(openaiYaml)) continue;

  const frontmatter = parseFrontmatter(skillMd);
  check(
    frontmatter.name === skillName,
    `skills/${skillName}: frontmatter name matches folder`,
    `skills/${skillName}: frontmatter name "${frontmatter.name}" does not match folder`
  );
  check(!!frontmatter.description, `skills/${skillName}: description present`, `skills/${skillName}: description missing`);

  const yaml = readFileSync(openaiYaml, "utf8");
  const iconPaths = [...yaml.matchAll(/icon_(?:small|large):\s*["']([^"']+)["']/g)].map(match => match[1]);
  check(iconPaths.length === 2, `skills/${skillName}: icon paths present`, `skills/${skillName}: icon_small/icon_large missing`);
  for (const iconPath of iconPaths) {
    const resolved = path.join(skillDir, iconPath);
    check(
      existsSync(resolved),
      `skills/${skillName}: ${iconPath} resolves`,
      `skills/${skillName}: ${iconPath} does not resolve from the skill root`
    );
  }
}

console.log("\nChecking document MCP contract...");
checkDocumentMcpContract();

console.log("");
if (errors > 0) {
  console.error(`✗ ${errors} validation check(s) failed.`);
  process.exit(1);
}

console.log("✓ All checks passed.");
