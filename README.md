# One Horizon Agent Skills

One Horizon plugs into Claude Code, Cursor, and Codex so they can read planned work, bugs, and blockers, then write updates back without leaving the editor.

This repo keeps the plugin setup in one place:
- `skills/` contains every skill
- `plugin.json` is the canonical manifest
- app-specific manifests and marketplace files are generated from there

There is no separate copied `skills/` tree for each app.

> You need a One Horizon account to use the plugin. [Create one here](https://onehorizon.ai/app).

## Structure

```text
.agents/plugins/marketplace.json   # Local Codex marketplace
.claude-plugin/marketplace.json    # Claude Code marketplace
.codex-plugin/plugin.json          # Generated Codex manifest
.cursor-plugin/plugin.json         # Generated Cursor manifest
.github/plugin/marketplace.json    # GitHub/Copilot-style marketplace
assets/                            # Shared plugin assets
hooks/                             # Hook scripts
skills/                            # Source of truth for all skills
scripts/                           # Build and validation scripts
.mcp.json                          # Shared MCP config
copilot-hooks.json                 # Shared hook manifest
plugin.json                        # Canonical plugin manifest
```

## Install

### Claude Code

```text
/plugin marketplace add onehorizonai/skills
/plugin install one-horizon@onehorizonai-skills
/reload-plugins
```

### Codex

Use the repository root as the plugin root. The local development marketplace in [`./.agents/plugins/marketplace.json`](./.agents/plugins/marketplace.json) points at `.`.

### Cursor

This repo now exposes a root plugin with a generated Cursor manifest at [`./.cursor-plugin/plugin.json`](./.cursor-plugin/plugin.json).

## Example prompts

- "What do I have planned?"
- "Review my roadmap and suggest changes"
- "Implement HubSpot lead sync"
- "I found a bug in checkout, fix and log it"
- "Write this work back and link it to initiative X"

## Development

After editing `plugin.json`, rebuild generated manifests:

```bash
node ./scripts/build-manifests.mjs
```

Validate manifests and skills:

```bash
node ./scripts/validate.mjs
```

Validate local refs and external URLs:

```bash
node ./scripts/validate-links.mjs
```
