# One Horizon Agent Plugins

Plugins for [One Horizon](https://onehorizon.ai) that help agents work with One Horizon tasks directly from Cursor, Claude Code, or Codex.

Tasks include initiatives, bugs, feature requests, TODOs, standups, recaps, retrospectives, and handoffs.

> You'll need a One Horizon account to use these plugins. [Create one here](https://onehorizon.ai/app).

## Plugins

| Plugin | Description |
|---|---|
| [`plugins/one-horizon`](plugins/one-horizon/README.md) | 15 skills for Cursor, Claude Code, and Codex covering task management, delivery loops, bug/feature intake, standups, recaps, retrospectives, triage prep, and handoff notes |

## Install In Claude Code

Add this repository as a Claude Code marketplace:

```text
/plugin marketplace add onehorizonai/skills
```

Then install the One Horizon plugin:

```text
/plugin install one-horizon@onehorizonai-skills
```

Run `/reload-plugins`.

Then you can ask Claude things like:
- "What do I have planned?"
- "Find tasks about onboarding"
- "Prep my standup"
- "I found a bug in checkout, fix and log it"

## Example prompts

- "What do I have planned?"
- "Implement HubSpot lead sync"
- "I found a bug in checkout, fix and log it"
- "Write this work back and link it to initiative X"

## MCP server setup (manual)

Use this MCP server config in clients that support `mcp.json`:

```json
{
  "mcpServers": {
    "onehorizon": {
      "command": "npx",
      "args": [
        "mcp-remote@latest",
        "https://mcp.onehorizon.ai/mcp"
      ]
    }
  }
}
```

For plugin-specific install paths and package layout details, see [`plugins/one-horizon/README.md`](plugins/one-horizon/README.md).

## Structure

```text
plugins/
  {plugin-name}/
    shared/skills/     # Source of truth for skill definitions
    cursor/            # Cursor plugin package
    claude/            # Claude Code plugin package
    codex/             # Codex plugin package
    scripts/           # Build and sync utilities
```
