---
name: one-list-work
description: List planned, shipped, blocked, and open work across One Horizon initiatives, bugs, and Todos. Use when asked "what's on my plate", "what did I ship", "show blockers", "what initiatives are active", "show open bugs", "what should I pick up next", or "what is the team working on". Requires One Horizon MCP.
---

# List Work

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Choose the tool matching the user's work question. List descriptions are trimmed; use `get-task-details` for full context.

## Instructions

| Work | Tool and scope |
|---|---|
| Planned | `list-planned-work`; optional `teamId`, `userId`, `includeInitiatives: true`. Broad view of initiatives, ongoing work, and linked follow-ups, depending on workspace |
| Completed | `list-completed-work`; pass ISO `startDate`, `endDate`, and `includeInitiatives: true` |
| Blocked | `list-blockers`; optional `teamId`, `includeInitiatives: true` |
| Roadmap | `list-initiatives`; optional `workspaceId`, `statuses`, `includeHierarchy: true` |
| Bugs | `list-bugs`; optional `workspaceId`, `statuses`, `teamIds`, `assigneeIds` |

Initiative statuses default to `Open`, `Planned`, `In Progress`, `In Review`; bug defaults also include `Idea`. Use initiatives for roadmap-specific questions and planned work for the broader view.
