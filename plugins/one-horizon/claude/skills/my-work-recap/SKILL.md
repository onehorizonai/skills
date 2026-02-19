---
name: my-work-recap
description: Get a full personal work recap from One Horizon including completed work, planned work, and blockers in a single call. Use when asked for "my standup", "work recap", "status update", "what have I done", or "prepare me for standup". Requires One Horizon MCP.
---

# My Work Recap

Fetch a comprehensive personal work recap: completed tasks, planned work, and active blockers — all in one call. Ideal for standup prep and status updates.

## When to Use

- "Give me my standup update"
- "What's my work recap for today?"
- "Show me a status summary of my work"
- "Prepare me for standup"
- "What have I done and what's next?"

## Instructions

Call the `my-work-recap` MCP tool.

**Default (completed work from past 72 hours):**
```
my-work-recap()
```

**With a custom date range:**
```
my-work-recap({
  startDate: "2024-01-20T00:00:00Z",
  endDate: "2024-01-26T23:59:59Z"
})
```

## Arguments

| Argument | Type | Required | Description |
|---|---|---|---|
| `startDate` | string | No | ISO date string. Defaults to 72 hours ago |
| `endDate` | string | No | ISO date string. Defaults to now |

## Output

Returns three sections: `COMPLETED WORK`, `PLANNED WORK`, `BLOCKED WORK`. Present these clearly, summarizing by theme when useful. Highlight any blockers that need attention.

After presenting the recap, offer to format it as a standup update using `personal-standup-prep`.
