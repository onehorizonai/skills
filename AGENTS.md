# AGENTS.md

Guidance for AI coding agents working in this repository.

## Repository overview

This is a single-plugin repository. `skills/` is the only source of truth for skills. App-specific manifests live at the repo root and are generated from `plugin.json`.

## Repository structure

```text
skills/
  {skill-name}/
    SKILL.md
    agents/openai.yaml
    assets/

assets/                             # Shared plugin assets
hooks/                              # Shared hook scripts
scripts/
  build-manifests.mjs               # Regenerates app-specific manifests
  validate.mjs                      # Validates manifests and skill metadata
  validate-links.mjs                # Validates local refs and external URLs

plugin.json                         # Canonical plugin manifest
.mcp.json                           # Shared MCP server config
copilot-hooks.json                  # Shared hook manifest
.cursor-plugin/plugin.json          # Generated Cursor manifest
.codex-plugin/plugin.json           # Generated Codex manifest
.claude-plugin/marketplace.json     # Claude marketplace
.agents/plugins/marketplace.json    # Local Codex marketplace
.github/plugin/marketplace.json     # GitHub/Copilot marketplace
```

## Working with skills

Skills live in `skills/{skill-name}/SKILL.md`. Each `SKILL.md` has frontmatter and instructions for the agent.

### SKILL.md format

```markdown
---
name: {skill-name}          # Matches the folder name — no plugin prefix
description: {One sentence. Include trigger phrases like "prep my standup", "list blockers".}
---

# Skill title

What this skill does and when to use it.

## Instructions

Step-by-step instructions for the agent to follow when this skill is invoked.
```

### Rules

- `name` must match the folder name exactly — no plugin namespace prefix
- The slash command (`/{plugin-name}:{skill-name}`) is formed automatically from the folder name + plugin manifest `name`
- Keep SKILL.md short: the full file loads into context on every invocation
- `description` determines when the agent picks up the skill — write it with trigger phrases
- Keep skill edits in `skills/` only
- Do not manually edit generated app manifests unless you are also updating `scripts/build-manifests.mjs`

### Building app manifests

After editing `plugin.json` or marketplace metadata logic:

```bash
node ./scripts/build-manifests.mjs
```

This regenerates `.cursor-plugin/plugin.json`, `.codex-plugin/plugin.json`, and marketplace files from the canonical root manifest.

### Validating manifests and skills

```bash
node ./scripts/validate.mjs
```

Checks manifest consistency, skill metadata, and required files.

### Validating links and paths

```bash
node ./scripts/validate-links.mjs
```

Checks local references and user-facing URLs in docs and manifests.

## Adding a new skill

1. Create `skills/{skill-name}/`
2. Add `SKILL.md`
3. Add `agents/openai.yaml`
4. Add `assets/logo.svg`
5. Run `node ./scripts/validate.mjs`
6. Run `node ./scripts/validate-links.mjs` if you added references or URLs

## Plugin manifest fields

```json
{
  "name": "plugin-name",
  "description": "One sentence shown in the plugin manager.",
  "version": "1.0.0",
  "author": { "name": "Author Name" },
  "homepage": "https://example.com",
  "repository": "https://github.com/onehorizonai/skills",
  "license": "MIT",
  "skills": "./skills/",
  "mcpServers": "./.mcp.json",
  "hooks": "./copilot-hooks.json"
}
```

The `name` field sets the skill namespace. A skill in folder `my-skill` inside a plugin named `my-plugin` becomes `/my-plugin:my-skill`.
`plugin.json` is canonical. Generated app manifests should stay aligned with it.
