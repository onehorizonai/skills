---
name: one-initiative-summary
description: Turn initiative data into a concise status update. Use when asked "summarize these initiatives", "give me initiative status", or "prepare initiative update notes". Requires One Horizon MCP.
---

# Initiative Summary

Summarize initiative progress for status updates.

## Instructions

1. Fetch initiatives with `list-initiatives`. It defaults to active statuses across every workspace; narrow it with `teamIds`, `assigneeIds`, or `statuses` when the user asks about a team, a person, or a stage.
2. The list returns summaries without descriptions. Call `get-task-details` only for initiatives that are blocked, at risk, or that the user asked about by name.
3. Write the summary. For each initiative include current status, progress highlights, owner, next steps, and blockers. Call out high-risk items and dependencies clearly, and put them first.
4. Match the audience: a few lines per initiative for executives, more delivery detail for the team. Use the format the user asked for.

Use only what the data shows. Do not infer progress from a title.
