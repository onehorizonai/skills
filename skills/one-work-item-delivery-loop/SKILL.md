---
name: one-work-item-delivery-loop
description: 'Run the full loop from planned work or reported bugs to implementation, validation, and One Horizon write-back. Use for prompts like "what do I have planned", "pick this up and implement it", "I found a problem", "fix all bugs assigned to me", "implement HubSpot lead sync", and "write this back to One Horizon". Requires One Horizon MCP.'
---

# Work Item Delivery Loop

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Deliver planned work or fixes through implementation, validation, and One Horizon write-back.

## Instructions

1. Identify the target with `list-planned-work`, `list-initiatives`, or `list-bugs`; fetch `get-task-details` before implementation. Confirm ambiguous initiative matches.
2. Use relevant tools and companion skills (`one-bug-triage-prep`, `one-initiative-summary`, recap/summarizer) before coding or write-back. Use text `Goals`, `Products`, `Skills` and metadata `goals`, `products`, `skills` to verify scope/linkage.
3. Implement, then validate with relevant checks. Never mark work complete without validation evidence.
4. After each delivered chunk, immediately use `update-bug`, `update-todo`, `update-initiative`, or completed `create-todo`, then comment. Do not stop at a status-only update after implementation. A run remains incomplete until write-back and requested initiative links are done.

In plan mode or when asked for a plan, explicitly include discovery, full details, implementation, validation, MCP status/comment write-back, and requested initiative links. Include per-bug implementation/write-back for batch fixes and matching/confirmation for initiatives. Do not skip required steps.

## Work types

Use initiatives for multi-day/roadmap planned work, bugs for unplanned defects, ongoing work for recurring owner-driven operations where supported, and Todos for small personal follow-ups. A completed initiative slice may be a completed Todo linked to its initiative.

## Specific flows

- **Fix all bugs assigned to me:** resolve user/team with `list-my-teams`; list active bugs filtered to the current assignee. For each: details → implement → validate → `update-bug` → comment with root cause, code changes, and current status. If not fixed, still update its current status and comment with the blocker. Stop if none match.
- **Implement an initiative:** list active initiatives; rank by title, then taxonomy/team; present top matches and confirm the selected target. Fetch details and verify label/scope fit. After implementation, immediately `create-todo` with `status: "Completed"`, `initiativeId`, workspace, and delivery description. Update initiative progress/status as appropriate and comment.
- **Connect to initiatives:** resolve each with `list-initiatives`, confirm ambiguity, then apply relation-capable tools. For Todos, set the primary `initiativeId` and use relations for additional links.

## Description and metadata edits

- Record progress in comments, never descriptions.
- Patch initiative descriptions with `patch-document`, `workspaceId`, initiative `taskId`, and precise `ops`: `replace_text`, `insert_before`, `insert_after`, `delete_text`. The server resolves or creates the linked document.
- Use `update-initiative` for metadata only: `title`, `status`, `assigneeIds`, `teamIds`, `taxonomyLabelIds`, `parentInitiativeId`. If both change, patch first, then update metadata.
- On stale/missing patch targets or anchors, fetch details and retry with corrected operations. Fetch again after mutation only if refreshed full content is needed.

## Write-back

Always use `source: "skill"` for `add-task-comment`.

Delivered work:

```markdown
**Changes**
- What changed: <delivered work>
- Why: <root cause or goal>
```

Research/planning/triage without delivery:

```markdown
## Update
- Summary: <finding or decision>
```

Report the target, action, MCP write-back, and linked initiative IDs briefly. If validation fails, keep work incomplete and write its current status/blocker. Missing task or label context requires details before proceeding.

Before declaring completion, ensure every completed bug/Todo/initiative has its status update (or completed Todo creation) and delivery comment in this run, and every requested initiative link is applied. Work must be implemented or explicitly blocked; perform missing write-back before finishing.
