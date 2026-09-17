---
name: one-handoff-notes
description: Turn current work into handoff notes a teammate can continue from. Use when asked to "write handoff notes", "prepare transition docs", or "document my current ownership". Requires One Horizon MCP.
---

# Handoff Notes

Generate handoff notes for vacations, transitions, and ownership changes.

## Instructions

### 1. Clarify the handoff

Use what the user gave you: the type (vacation, transition), the duration, and any focus areas. Ask only when the duration or the recipient changes what you would write.

### 2. Fetch the current ownership

The calls are independent, so run them in parallel. Use a completed window long enough to show recent context, 14 days by default:

```json
list-completed-work({ "startDate": "<iso-start>", "endDate": "<iso-end>" })
```

```json
list-planned-work()
```

```json
list-blockers()
```

```json
list-initiatives({ "assigneeIds": ["<my-userId>"] })
```

Get your own `userId` from `who-am-i`. Call `get-task-details` for in-progress or blocked items, because the person taking over needs the description and the comment thread, not just the title.

### 3. Write the notes

Use this structure:

1. Current status
2. In progress
3. Initiative status and ownership
4. Upcoming priorities
5. Risks, blockers, dependencies
6. Key contacts and resources

Style: clear headings and actionable next steps. Link each work item. Prioritize the user's focus areas. Do not write generic statements that are not backed by the data.
