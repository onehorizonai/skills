---
name: one-work-summarizer
description: Turn One Horizon activity into a concise update for a manager, team, or stakeholder. Use when asked to "summarize my work", "write a status report", "create a weekly summary", or "brief my manager". Includes initiatives and blockers when provided. Requires One Horizon MCP.
---

# Work Summarizer

Turn One Horizon activity into a concise update for a manager, team, or stakeholder. For standup talking points use `one-standup-prep`; for ownership transfer use `one-handoff-notes`.

## Instructions

### 1. Pick the scope and window

Take the period from the request ("today", "this week", "last sprint") and convert it to `startDate` and `endDate`. `list-completed-work` defaults to the last 24 hours.

### 2. Fetch the data

The calls are independent, so run them in parallel. Personal summary:

```json
list-completed-work({ "startDate": "<iso-start>", "endDate": "<iso-end>" })
```

```json
list-planned-work()
```

```json
list-blockers()
```

For a team summary add `"teamId": "<teamId>"` to each call; resolve it with `list-my-teams`. Add `list-initiatives` when the audience cares about roadmap progress.

### 3. Write the summary

1. Focus on concrete outcomes and what changed.
2. Group related items by topic or initiative.
3. Include blocker context when there are blockers.
4. Do not invent details that are not in the data.
5. Respect the requested format. For a standup audience use: completed, in progress, blockers.

## Output style

- Natural and conversational, like a developer talking to a coworker
- Past tense for completed work
- Groups related changes together
- Uses real feature/service names, no buzzwords
- Concise: aim for clarity over completeness
