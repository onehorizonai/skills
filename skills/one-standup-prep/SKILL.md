---
name: one-standup-prep
description: Turn recent work into standup talking points for one person or a whole team. Use when asked "prep my standup", "what should I say", "give me my standup update", "team standup summary", or "what should we cover in standup". Requires One Horizon MCP.
---

# Standup Prep

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Prepare personal or team talking points. Use `one-work-summarizer` for a longer written update.

## Instructions

1. Default to since last standup: 24 hours, or since Friday on Monday. Pass ISO `startDate` and `endDate` to `list-completed-work`.
2. In parallel, fetch `list-completed-work`, `list-planned-work`, and `list-blockers`. For teams, resolve `teamId` with `list-my-teams` and add it to each call. Ask which team if several exist and none is named.
3. Personal sections: **What I completed**, **What I'm working on**, **Initiatives I'm on** (only if present), **Blockers** (or "None").
4. Team sections: team progress overview; individual updates by person; initiative progress; blockers and dependencies; upcoming focus.

Use specific, conversational points without filler or invented progress.
