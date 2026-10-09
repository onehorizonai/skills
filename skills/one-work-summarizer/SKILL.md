---
name: one-work-summarizer
description: Turn One Horizon activity into a concise update for a manager, team, or stakeholder. Use when asked to "summarize my work", "write a status report", "create a weekly summary", or "brief my manager". Includes initiatives and blockers when provided. Requires One Horizon MCP.
---

# Work Summarizer

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Write an activity update for a manager, team, or stakeholder. Use `one-standup-prep` for talking points and `one-handoff-notes` for ownership transfer.

## Instructions

1. Convert the requested period to `startDate`/`endDate`; `list-completed-work` defaults to 24 hours.
2. Fetch `list-completed-work`, `list-planned-work`, and `list-blockers` in parallel. For teams, resolve `teamId` with `list-my-teams` and add it to each call. Include `list-initiatives` when roadmap progress matters to the audience.
3. Group related outcomes by topic or initiative; explain what changed and include blocker context. Use only supported details and the requested format. For standups: completed, in progress, blockers.

Write conversationally with real feature/service names, no buzzwords, and past tense for completed work.
