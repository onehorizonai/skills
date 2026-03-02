---
name: personal-standup-prep
description: Generate personal standup talking points from One Horizon task data, including completed/planned tasks, initiatives, and blockers. Use when asked to "prep my standup", "what should I say", or "give me my standup update". Requires One Horizon MCP.
---

# Personal Standup Prep

Generate concise personal standup updates.

## Instructions

1. Fetch data with `my-work-recap`.
2. Call `personal-standup-prep`:

```json
personal-standup-prep({
  "completedTasks": "<json-array>",
  "plannedTasks": "<json-array>",
  "initiatives": "<json-array>",
  "blockers": "<json-array>",
  "timeframe": "since last standup"
})
```
