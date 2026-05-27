---
name: one-work-recap
description: Recap shipped, planned, and blocked work in One Horizon for a person or team. Use for "my recap", "team recap", "team status", "what have I done and what's next", or "what is everyone working on". Requires One Horizon MCP.
---

# Work Recap

Fetch consolidated recap data for a person or team.

## Instructions

### Personal recap

Call `my-work-recap`:

```json
my-work-recap({ "includeInitiatives": true })
```

With date range:

```json
my-work-recap({
  "startDate": "2024-01-20T00:00:00Z",
  "endDate": "2024-01-26T23:59:59Z",
  "includeInitiatives": true
})
```

### Team recap

Call `team-work-recap`:

```json
team-work-recap({ "teamId": "<teamId>", "includeInitiatives": true })
```

With date range:

```json
team-work-recap({
  "teamId": "<teamId>",
  "startDate": "2024-01-20T00:00:00Z",
  "endDate": "2024-01-26T23:59:59Z",
  "includeInitiatives": true
})
```

Recap order prioritizes roadmap work first, then bugs, then Todos.

Recap/list output may omit descriptions; call `get-task-details` for any task that needs deeper context.
