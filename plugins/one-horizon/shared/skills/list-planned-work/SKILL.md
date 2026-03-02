---
name: list-planned-work
description: Show planned tasks from One Horizon across initiatives, bugs, TODOs, issues, and events. Use when asked "what do I have planned", "what's on my plate", "what is the team working on", or "what should I pick up next". Requires One Horizon MCP.
---

# List Planned Work

Fetch planned and in-progress tasks and related activities.

## Instructions

Call `list-planned-work`.

```json
list-planned-work()
```

Team scope:

```json
list-planned-work({ "teamId": "<teamId>", "includeInitiatives": true })
```

Member scope:

```json
list-planned-work({ "userId": "<userId>", "teamId": "<teamId>", "includeInitiatives": true })
```

Task descriptions are intentionally trimmed in list output. Use `get-task-details` for full description/context.
