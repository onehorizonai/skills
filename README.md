# One Horizon Agent Plugins

Plugins for [One Horizon](https://onehorizon.ai) that help agents work with One Horizon tasks directly from Cursor or Claude Code.

Tasks include initiatives, bugs, feature requests, and TODOs, plus standup/recap workflows.

> You'll need a One Horizon account to use these plugins. [Create one here](https://onehorizon.ai/app).

## Plugins

| Plugin | Description |
|---|---|
| [`plugins/one-horizon`](plugins/one-horizon/README.md) | Skills for Cursor and Claude Code covering planned tasks, delivery loops, initiative linking, bug/feature intake, standups, blockers, triage prep, and handoff notes |

## Example prompts

- "What do I have planned?"
- "Create an Asana integration"
- "I found a bug in checkout, fix and log it"
- "Write this work back and link it to initiative X"
- "Save a `.journal` entry for this change"

## Structure

```text
plugins/
  {plugin-name}/
    shared/skills/     # Source of truth for skill definitions
    cursor/            # Cursor plugin package
    claude/            # Claude Code plugin package
    scripts/           # Build and sync utilities
```
