---
name: list-blockers
description: Show blocked tasks in One Horizon, including blocked initiatives, bugs, TODOs, and external issues. Use when asked "what's blocking me", "show blockers", or "what is the team blocked on". Requires One Horizon MCP.
---

# List Blockers

Fetch blocked task state by personal, team, or member scope.

## Instructions

Call `list-blockers`.

```json
list-blockers({ "includeInitiatives": true })
```

Team scope:

```json
list-blockers({ "teamId": "<teamId>", "includeInitiatives": true })
```

Descriptions are omitted in list output. Use `get-task-details` for full blocker context.
