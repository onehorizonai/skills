---
name: one-update-task
description: Apply a direct update to known One Horizon work when the target and action are clear, such as changing status, reassigning, adding a comment, or reacting to a comment. Prefer one-task-management for ambiguous or multi-step operational requests. Requires One Horizon MCP.
---

# Update Task

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Update known work or its comments. Use `one-task-management` for ambiguous or multi-step requests.

## Instructions

- Resolve IDs with `one-list-work` or `get-task-details` as needed; choose the update tool by work type.
- Use comments for progress, never descriptions. After status changes, explain what changed and why. Bug-fix comments also include root cause and code changes.
- Initiative descriptions: `patch-document` with `workspaceId`, initiative `taskId`, and precise `ops` (`replace_text`, `insert_before`, `insert_after`, `delete_text`). The server resolves or creates the linked document.
- Initiative metadata: `update-initiative` only (`title`, `status`, `assigneeIds`, `teamIds`, `taxonomyLabelIds`, `parentInitiativeId`). When both change, patch first, then update metadata. Fetch refreshed details if needed.
- If a patch target/anchor is stale or missing, fetch `get-task-details` and retry with corrected operations.

| Work/action | Tool |
|---|---|
| Todo | `update-todo` with `taskId`, `workspaceId`, changed fields |
| Initiative metadata | `update-initiative` with `initiativeId`, `workspaceId`, changed fields |
| Bug | `update-bug` with `taskId`, `workspaceId`, changed fields |
| Feature request | `update-feature-request` with `taskId`, `workspaceId`, changed fields |
| Read comments | `list-task-comments` with `taskId`, `workspaceId` |
| Add comment | `add-task-comment` with `taskId`, `workspaceId`, `source: "skill"`, `content` |
| React | `toggle-task-comment-reaction` with `taskId`, `workspaceId`, `commentId`, `emoji`; adds if absent, removes if present |

## Comment formats

Delivery:

```markdown
**Changes**
- What changed: <delivered work>
- Why: <root cause or goal>
```

Research/planning without implementation:

```markdown
## Update
- Summary: <finding or decision>
```
