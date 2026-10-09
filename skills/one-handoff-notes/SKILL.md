---
name: one-handoff-notes
description: Turn current work into handoff notes a teammate can continue from. Use when asked to "write handoff notes", "prepare transition docs", or "document my current ownership". Requires One Horizon MCP.
---

# Handoff Notes

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Prepare ownership notes for vacations or transitions.

## Instructions

1. Use the supplied handoff type, duration, and focus areas. Ask only when duration or recipient changes the notes.
2. Get your `userId` with `who-am-i`. In parallel, fetch `list-completed-work` (14 days by default, with `startDate`/`endDate`), `list-planned-work`, `list-blockers`, and `list-initiatives` filtered by your `assigneeIds`.
3. Call `get-task-details` for in-progress or blocked items so the handoff includes descriptions and comment context.
4. Write: current status; in progress; initiative status and ownership; upcoming priorities; risks, blockers, dependencies; key contacts and resources.

Use clear headings, linked work items, and actionable next steps. Prioritize the requested focus areas and include only supported facts.
