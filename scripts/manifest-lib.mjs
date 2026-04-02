import { readFileSync } from "node:fs";
import path from "node:path";

export function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

export function loadBaseManifest(rootDir) {
  return readJson(path.join(rootDir, "plugin.json"));
}

export function buildCursorManifest(base) {
  return {
    ...base,
    logo: "./assets/logo.svg"
  };
}

export function buildCodexManifest(base) {
  const { hooks: _hooks, ...shared } = base;
  return {
    ...shared,
    interface: {
      displayName: "One Horizon",
      shortDescription: "Plan from the roadmap. Let AI agents build it.",
      longDescription:
        "Turn tasks, bugs, and initiatives into agent-ready specs. One Horizon pulls planned work into Codex, writes progress back as you ship, and keeps every task, commit, and PR tied back to the roadmap.",
      developerName: "One Horizon",
      category: "Productivity",
      capabilities: ["Interactive", "Write"],
      websiteURL: "https://onehorizon.ai",
      privacyPolicyURL: "https://onehorizon.ai/docs/legal/privacy-policy",
      termsOfServiceURL: "https://onehorizon.ai/docs/legal/terms-of-use",
      defaultPrompt: [
        "What do I have planned?",
        "Prep my standup.",
        "Run a weekly retro.",
        "I found a bug in checkout, fix and log it."
      ],
      brandColor: "#101011",
      composerIcon: "./assets/one-horizon-codex.svg",
      logo: "./assets/one-horizon-codex.svg"
    }
  };
}

export function buildMarketplace(base, source) {
  return {
    name: "onehorizonai-skills",
    owner: {
      name: base.author.name
    },
    metadata: {
      description: "Roadmap-first AI development starts here.",
      version: base.version
    },
    plugins: [
      {
        name: base.name,
        source,
        description:
          "Plan what matters, send tasks and initiatives to AI agents, and keep every task, commit, and PR tied back to the roadmap automatically.",
        version: base.version,
        author: {
          name: base.author.name
        },
        homepage: base.homepage,
        repository: base.repository,
        license: base.license,
        keywords: base.keywords
      }
    ]
  };
}

export function buildCodexLocalMarketplace(base) {
  return {
    name: "local-dev",
    interface: {
      displayName: "Local Dev"
    },
    plugins: [
      {
        name: base.name,
        source: {
          source: "local",
          path: "."
        },
        policy: {
          installation: "AVAILABLE",
          authentication: "ON_INSTALL"
        },
        category: "Productivity"
      }
    ]
  };
}
