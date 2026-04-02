#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  buildCodexLocalMarketplace,
  buildCodexManifest,
  buildCursorManifest,
  buildMarketplace,
  loadBaseManifest
} from "./manifest-lib.mjs";

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const base = loadBaseManifest(rootDir);

const files = [
  [".cursor-plugin/plugin.json", buildCursorManifest(base)],
  [".codex-plugin/plugin.json", buildCodexManifest(base)],
  [".claude-plugin/marketplace.json", buildMarketplace(base, ".")],
  [".github/plugin/marketplace.json", buildMarketplace(base, ".")],
  [".agents/plugins/marketplace.json", buildCodexLocalMarketplace(base)]
];

for (const [relativePath, value] of files) {
  const targetPath = path.join(rootDir, relativePath);
  mkdirSync(path.dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, `${JSON.stringify(value, null, 2)}\n`);
  console.log(`wrote ${relativePath}`);
}
