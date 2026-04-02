---
name: work-summarizer
description: Turn One Horizon activity into a clean update for a manager, team, or stakeholder. Use when asked to "summarize my work", "write a status report", "create a weekly summary", or "brief my manager". Includes initiatives and blockers when provided. Requires One Horizon MCP.
---

# Work Summarizer

Create concise summaries from recap data.

## Instructions

1. Fetch source data with `my-work-recap`, `team-work-recap`, or `list-completed-work`.
2. Call `work-summarizer`:

```json
work-summarizer({
  "completedTasks": "<json-array>",
  "plannedTasks": "<json-array>",
  "initiatives": "<json-array>",
  "blockers": "<json-array>",
  "period": "this week",
  "format": "bullet points",
  "audience": "team"
})
```
## Output Style

- Natural, conversational — like a developer talking to a coworker
- Past tense for completed work
- Groups related changes together
- Uses real feature/service names, no buzzwords
- Concise: aim for clarity over completeness
