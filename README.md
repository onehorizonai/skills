# One Horizon Agent Plugins

Plugins for [One Horizon](https://onehorizon.ai) that help agents work with One Horizon tasks directly from Cursor, Claude Code, or Codex.

Tasks include initiatives, bugs, feature requests, and TODOs, plus standup/recap workflows.

> You'll need a One Horizon account to use these plugins. [Create one here](https://onehorizon.ai/app).

## Plugins

| Plugin | Description |
|---|---|
| [`plugins/one-horizon`](plugins/one-horizon/README.md) | 14 skills for Cursor, Claude Code, and Codex covering task management, delivery loops, bug/feature intake, standups, recaps, triage prep, and handoff notes |

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
