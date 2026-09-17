---
name: one-work-recap
description: Recap shipped, planned, and blocked work in One Horizon for a person or team. Use for "my recap", "team recap", "team status", "what have I done and what's next", or "what is everyone working on". Requires One Horizon MCP.
---

# Work Recap

Recap shipped, planned, and blocked work for a person or a team. For standup talking points use `one-standup-prep`; for a written status report use `one-work-summarizer`.

## Instructions

### 1. Pick the window

- `list-completed-work` defaults to the last 24 hours. Pass `startDate` and `endDate` as ISO 8601 date-times for anything longer, such as "this week".
- Planned and blocked work are current state and take no dates.

### 2. Fetch the three lists

The calls are independent, so run them in parallel.

Personal recap:

```json
list-completed-work({ "startDate": "<iso-start>", "endDate": "<iso-end>" })
```

```json
list-planned-work()
```

```json
list-blockers()
```

Team recap. Resolve `teamId` with `list-my-teams` when the user names a team; ask which team when there are several and none is named:

```json
list-completed-work({ "teamId": "<teamId>", "startDate": "<iso-start>", "endDate": "<iso-end>" })
```

```json
list-planned-work({ "teamId": "<teamId>" })
```

```json
list-blockers({ "teamId": "<teamId>" })
```

For one teammate, add `"userId": "<userId>"` to each team call. Get the `userId` from `find-team-member`.

### 3. Present the recap

- Use three sections in this order: **Shipped**, **Planned**, **Blocked**.
- Within each section put roadmap initiatives first, then bugs, then Todos.
- For a team recap, group each section by person.
- Say so plainly when a section is empty. Do not pad it.
- The lists are summaries without descriptions. Call `get-task-details` only for an item that needs more context.
