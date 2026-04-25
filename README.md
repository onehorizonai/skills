# One Horizon Agent Skills

Lets Claude Code, Cursor, and Codex read your planned work, bugs, and blockers from One Horizon and write updates back without leaving the editor.

> Requires a One Horizon account. [Create one here](https://onehorizon.ai/app).

## Structure

All app-specific manifests and marketplace files are built from `plugin.json`. Skills live in `skills/` — there's no separate tree per app.

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

Use the repo root as the plugin root. The local development marketplace is at [`./.agents/plugins/marketplace.json`](./.agents/plugins/marketplace.json).

### Cursor

Generated Cursor manifest: [`./.cursor-plugin/plugin.json`](./.cursor-plugin/plugin.json).

## Try these

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
