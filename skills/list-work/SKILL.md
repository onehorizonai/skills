---
name: list-work
description: See what is planned, shipped, blocked, or still open in One Horizon across roadmap work, bugs, and personal follow-ups. Use when asked "what's on my plate", "what did I ship", "show blockers", "what initiatives are active", "show open bugs", "what should I pick up next", or "what is the team working on". Requires One Horizon MCP.
---

# List Work

Query work in One Horizon. Pick the right MCP tool based on what the user is asking for.

## Instructions

Descriptions are trimmed in list output. Use `get-task-details` for full context on any task.

### Planned work

Call `list-planned-work`:

```json
list-planned-work()
```

Team or member scope:

```json
list-planned-work({ "teamId": "<teamId>", "userId": "<userId>", "includeInitiatives": true })
```

Planned work is the broad view. It can include roadmap initiatives, ongoing work, and linked follow-up items depending on how the workspace is used.

### Completed work

Call `list-completed-work`:

```json
list-completed-work({
  "startDate": "2024-01-20T00:00:00Z",
  "endDate": "2024-01-26T23:59:59Z",
  "includeInitiatives": true
})
```

### Blockers

Call `list-blockers`:

```json
list-blockers({ "includeInitiatives": true })
```

Team scope:

```json
list-blockers({ "teamId": "<teamId>", "includeInitiatives": true })
```

### Initiatives

Call `list-initiatives`:

```json
list-initiatives({
  "workspaceId": "<workspaceId>",
  "statuses": ["Open", "Planned", "In Progress", "In Review"],
  "includeHierarchy": true
})
```

If `statuses` is omitted, defaults to active statuses (Open, Planned, In Progress, In Review).

Use this when the user is asking specifically about roadmap work rather than the broader planned-work view.

### Bugs

Call `list-bugs`:

```json
list-bugs({
  "workspaceId": "<workspaceId>",
  "statuses": ["Open", "Planned", "In Progress", "In Review"],
  "teamIds": ["<teamId>"],
  "assigneeIds": ["<userId>"]
})
```

If `statuses` is omitted, defaults to active statuses.
