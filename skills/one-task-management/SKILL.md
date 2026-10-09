---
name: one-task-management
description: Handle operational One Horizon requests that need work lookup, creation, updates, assignment, tagging, comments, or document lookup. Use when asked "mark this done", "assign this", "create a bug", "log a follow-up", "find the task for X", "find the spec for Y", "show comments", or "tag this initiative". Do not use for retros, standups, handoff notes, or stakeholder summaries. Requires One Horizon MCP.
---

# Task Management

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Handle operational lookup, creation, assignment, tagging, updates, and comments. Use the dedicated skills for retros, standups, handoffs, triage notes, or stakeholder summaries; use `one-initiative-brief` to shape an unfinished roadmap brief.

## Work types

- Initiative: planned product work, specs, integrations, or multi-step delivery that belongs in roadmap rollups, goals, products, companies, components, or team reporting.
- Bug: unplanned broken behavior, regression, failure, or incident.
- Ongoing: recurring owner-driven operations without an end date, when the workspace uses this type.
- Todo: small private follow-up, reminder, or owner-level action. A completed initiative slice may be a completed Todo linked to the initiative.
- Feature request: product ask or issue intake.

For "create a task", infer roadmap relevance, defect language, recurrence, and visibility in that order. Do not substitute Todos for roadmap work or initiatives for private/recurring work. If ongoing work has no direct create path, explain and ask before choosing another type.

## Instructions

1. Resolve workspace, target, type, assignee, and team as needed. Use `list-workspaces` for unknown/ambiguous workspaces, `who-am-i` for your ID, and `one-find-team` for team/member IDs.
2. Find work with `search-tasks`, or use `one-list-work` for active, completed, or blocked lists. If multiple matches remain, show the best matches and ask which to update. Infer work type first; ask only when mutation would otherwise be risky.
3. For full task context, call `get-task-details` before acting when summaries are insufficient.
4. For documents, `find-documents` with top-level `query` and optional `taskId`, `types`, `statuses` returns metadata plus `excerpt` only. Select a `documentId`, then use `get-document` when the full standalone body is needed.
5. For developer/coding-agent work, describe the goal/why, existing area/pattern to reuse, and done-when with real repo check commands; never invent them. Repo conventions win. Keep simple Bugs/Todos to a few lines; use `one-report-issue` for fuller bugs/features.
6. Apply the smallest action using the path below. Resolve relevant IDs and update only requested fields.
7. Confirm the change, title/status where relevant, new owner/labels, and unresolved follow-up. If a later step fails, report what changed, what did not, and missing input.

## Mutation paths

| Action | Tool |
|---|---|
| Personal follow-up | `create-todo`, `update-todo` |
| Roadmap creation | `create-initiative` |
| Initiative metadata | `update-initiative` |
| Initiative description | `patch-document` with initiative `taskId` |
| Defect | `report-bug`, `update-bug` |
| Product ask | `report-feature-request`, `update-feature-request` |
| Comments/reactions | `add-task-comment`, `list-task-comments`, `toggle-task-comment-reaction` |
| Initiative tagging | `list-taxonomy`, then `update-initiative` |

- Use comments for progress, delivery, or decisions; never rewrite descriptions to log status. Add a short what/why comment when status changes materially.
- Patch initiative descriptions with `workspaceId`, initiative `taskId`, and precise `ops`; the server resolves or creates the linked document. Prefer targeted edits over full rewrites.
- `update-initiative` changes metadata only: `title`, `status`, `assigneeIds`, `teamIds`, `taxonomyLabelIds`, `parentInitiativeId`.
- When description and metadata both change, patch first, then update. Fetch `get-task-details` afterward if refreshed content is needed. For stale/missing patch anchors, fetch details and retry with corrected operations.
- Look up taxonomy only for requested tagging/categorization/alignment, or when new-initiative placement/reporting depends on it. Do not tag speculatively.
