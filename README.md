# One Horizon Agent Plugins

Plugins for [One Horizon](https://onehorizon.ai) — ask about your tasks, generate standup notes, surface blockers, all from Cursor or Claude Code.

> You'll need a One Horizon account to use these plugins. [Create one here](https://onehorizon.ai/app).

## Plugins

| Plugin | Description |
|---|---|
| [`plugins/one-horizon`](plugins/one-horizon/README.md) | Skills for Cursor and Claude Code — standups, task tracking, blockers, handoff notes, and more |

## Structure

```
plugins/
  {plugin-name}/
    shared/skills/     # Source of truth for skill definitions
    cursor/            # Cursor plugin package
    claude/            # Claude Code plugin package
    scripts/           # Build and sync utilities
```
