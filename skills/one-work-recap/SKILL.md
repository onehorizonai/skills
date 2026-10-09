---
name: one-work-recap
description: Recap shipped, planned, and blocked work in One Horizon for a person or team. Use for "my recap", "team recap", "team status", "what have I done and what's next", or "what is everyone working on". Requires One Horizon MCP.
---

# Work Recap

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Recap shipped, planned, and blocked work. Use `one-standup-prep` for talking points or `one-work-summarizer` for a status report.

## Instructions

1. `list-completed-work` defaults to 24 hours; pass ISO `startDate`/`endDate` for longer windows. Planned and blocked lists reflect current state and take no dates.
2. Fetch `list-completed-work`, `list-planned-work`, and `list-blockers` in parallel.
3. For teams, resolve `teamId` with `list-my-teams` and add it to each call; ask if several teams exist and none is named. For one teammate, resolve `userId` with `find-team-member` and add it to each team call.
4. Present **Shipped**, **Planned**, **Blocked**, in that order. Put initiatives before bugs before Todos; group team sections by person. State empty sections plainly.

Lists omit descriptions. Use `get-task-details` only when an item needs more context.
