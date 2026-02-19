---
name: work-summarizer
description: Generate a concise, natural-sounding work summary from One Horizon task data. Use when asked to "summarize my work", "write a work report", "generate a summary of what I did", or "create a brief of my accomplishments". Requires One Horizon MCP.
---

# Work Summarizer

Generate a concise, natural-language summary of completed and planned work from One Horizon task data.

## When to Use

- "Summarize my work for this week"
- "Write a work report"
- "Give me a brief of what I've accomplished"
- "Generate a summary in bullet points"
- "Create a narrative of what the team shipped"

## Instructions

**Step 1:** Fetch the work data using `my-work-recap` or `list-completed-work`.

**Step 2:** Call the `work-summarizer` MCP prompt, passing the task data as JSON strings:

```
work-summarizer({
  completedTasks: JSON.stringify(completedActivities),
  plannedTasks: JSON.stringify(plannedActivities),  // optional
  period: "this week",                              // optional
  format: "bullet points",                          // optional
  audience: "team"                                  // optional
})
```

## Arguments

| Argument | Type | Required | Description |
|---|---|---|---|
| `completedTasks` | string | **Yes** | JSON array of completed task objects |
| `plannedTasks` | string | No | JSON array of planned task objects |
| `period` | string | No | e.g. `"today"`, `"this week"`, `"last sprint"` |
| `format` | string | No | `"bullet points"`, `"standup format"`, or prose (default) |
| `audience` | string | No | `"team"`, `"manager"`, `"standup"` |

## Output Style

- Natural, conversational — like a developer talking to a coworker
- Past tense for completed work
- Groups related changes together
- Uses real feature/service names, no buzzwords
- Concise: aim for clarity over completeness
