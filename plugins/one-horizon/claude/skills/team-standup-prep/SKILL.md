---
name: team-standup-prep
description: Generate team standup summaries from One Horizon task data across members, including initiative and blocker context. Use when asked for "team standup summary" or "what should we cover in standup". Requires One Horizon MCP.
---

# Team Standup Prep

Generate a structured team standup summary.

## Instructions

1. Fetch source data with `team-work-recap`.
2. Build member updates.
3. Call `team-standup-prep`:

```json
team-standup-prep({
  "teamMemberUpdates": "<json-array>",
  "team_name": "Platform",
  "timeframe": "yesterday"
})
```
