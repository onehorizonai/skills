---
name: team-work-recap
description: Get a team recap from One Horizon across completed, planned, and blocked tasks, including initiative and open bug/feature sections. Use for "team recap", "team status", or "what is everyone working on". Requires One Horizon MCP.
---

# Team Work Recap

Fetch consolidated recap data for a team.

## Instructions

Call `team-work-recap`.

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

Recap order prioritizes initiatives, then bugs, then TODOs.
