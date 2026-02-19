---
name: personal-standup-prep
description: Generate personal standup talking points from One Horizon work data. Use when asked to "prep my standup", "get me ready for standup", "what should I say in standup", or "standup update". Requires One Horizon MCP.
---

# Personal Standup Prep

Generate concise standup talking points from your One Horizon work data: what you completed, what you're working on, and any blockers.

## When to Use

- "Get me ready for standup"
- "What should I say in standup?"
- "Prep my standup notes"
- "Give me my standup update for today"

## Instructions

**Step 1:** Fetch work data using `my-work-recap` (recommended — gets completed + planned + blockers in one call).

**Step 2:** Call the `personal-standup-prep` MCP prompt:

```
personal-standup-prep({
  completedTasks: JSON.stringify(completedActivities),
  plannedTasks: JSON.stringify(plannedActivities),
  timeframe: "since last standup"  // optional
})
```

## Arguments

| Argument | Type | Required | Description |
|---|---|---|---|
| `completedTasks` | string | **Yes** | JSON array of completed task objects |
| `plannedTasks` | string | **Yes** | JSON array of planned task objects |
| `timeframe` | string | No | e.g. `"yesterday"`, `"since last standup"`, `"this week"` |

## Output Format

Three sections:
1. **What I completed** — finished work that moved things forward
2. **What I'm working on** — current priorities and next steps
3. **Blockers** — issues preventing progress, or "None"

Conversational tone, 1–2 sentences per point, specific about what was accomplished.
