---
name: list-completed-work
description: Show completed tasks from One Horizon, including completed initiatives and TODOs plus related closed items. Use when asked "what did I ship", "what got done", or "what did we finish last sprint". Requires One Horizon MCP.
---

# List Completed Work

Fetch completed task activity by date and team/member filters.

## Instructions

Call `list-completed-work`.

```json
list-completed-work({
  "startDate": "2024-01-20T00:00:00Z",
  "endDate": "2024-01-26T23:59:59Z",
  "includeInitiatives": true
})
```

Descriptions are omitted by default in list output. Use `get-task-details` per task when deeper context is needed.
