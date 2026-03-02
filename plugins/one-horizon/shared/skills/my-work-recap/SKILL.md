---
name: my-work-recap
description: Get a personal recap from One Horizon across completed, planned, and blocked tasks, with initiatives and open bug/feature sections. Use for "my recap", "my standup context", or "what have I done and what's next". Requires One Horizon MCP.
---

# My Work Recap

Fetch consolidated personal recap data.

## Instructions

Call `my-work-recap`.

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

Recap order prioritizes:
1. Initiatives
2. Bugs
3. TODOs

Recap/list output may omit descriptions; call `get-task-details` for any task that needs deeper context.
