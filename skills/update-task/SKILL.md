---
name: update-task
description: Apply a direct update to a known One Horizon task when the target and action are already clear, such as changing status, reassigning, adding a comment, or reacting to a comment. Prefer task-management for ambiguous or multi-step operational requests. Requires One Horizon MCP.
---

# Update Task

Update an existing task or interact with its comments. Pick the right MCP tool based on task type and action.

## Shared rules

- Never modify task descriptions to record progress. Use comments instead.
- When changing status (e.g. to `Completed`), add a comment explaining what changed and why.
- Resolve IDs first with `list-work` or `get-task-details` when needed.
- When editing an initiative description, use `patch-document` with `workspaceId`, `taskId` set to the initiative ID, and precise `ops`; the server resolves or creates the linked content document automatically.
- Prefer `replace_text`, `insert_before`, `insert_after`, and `delete_text` over rewriting the entire description.
- Use `update-initiative` only for initiative metadata: `title`, `status`, `assigneeIds`, `teamIds`, `taxonomyLabelIds`, and `parentInitiativeId`.
- If both description and metadata change, call `patch-document(taskId=initiativeId, ...)` first, then `update-initiative(...)`. If you need the refreshed full initiative, call `get-task-details` after the mutations.
- If a patch fails because the target or anchor is stale or missing, call `get-task-details`, then retry with corrected ops.

## By work type

### Personal task

Call `update-todo`:

```json
update-todo({
  "taskId": "<taskId>",
  "workspaceId": "<workspaceId>",
  "status": "Completed"
})
```

Then add a comment with what changed:

```json
add-task-comment({
  "taskId": "<taskId>",
  "source": "skill",
  "comment": "**Changes**\n- What changed: Added retry backoff and idempotency guard\n- Why: Prevent duplicate processing on transient failures"
})
```

### Roadmap initiative

Use `patch-document` for initiative description edits and `update-initiative` for metadata.

Description edit only:

```json
patch-document({
  "workspaceId": "<workspaceId>",
  "taskId": "<initiativeId>",
  "ops": [
    {
      "type": "replace_text",
      "target": "EMEA pilot",
      "replacement": "EU launch"
    }
  ]
})
```

Description plus metadata:

```json
patch-document({
  "workspaceId": "<workspaceId>",
  "taskId": "tsk_123",
  "ops": [
    {
      "type": "insert_after",
      "anchor": "### Rollout",
      "text": "\n- Roll out to two design partners first.\n"
    }
  ]
})
```

```json
update-initiative({
  "initiativeId": "tsk_123",
  "workspaceId": "<workspaceId>",
  "status": "In Progress"
})
```

Metadata only:

```json
update-initiative({
  "initiativeId": "<initiativeId>",
  "workspaceId": "<workspaceId>",
  "status": "In Progress",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"]
})
```

Then add a comment:

```json
add-task-comment({
  "taskId": "<initiativeId>",
  "source": "skill",
  "comment": "**Changes**\n- What changed: Implemented OAuth callback and token persistence\n- Why: Enable first end-to-end auth handshake"
})
```

### Bug

Call `update-bug`. When writing back a fix, add root cause, code changes, and why as a comment:

```json
update-bug({
  "taskId": "<taskId>",
  "workspaceId": "<workspaceId>",
  "status": "In Progress",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"]
})
```

```json
add-task-comment({
  "taskId": "<taskId>",
  "source": "skill",
  "comment": "**Changes**\n- What changed: Fixed stale cache key invalidation\n- Why: Totals were computed with outdated cache entries"
})
```

### Feature request

Call `update-feature-request`:

```json
update-feature-request({
  "taskId": "<taskId>",
  "workspaceId": "<workspaceId>",
  "status": "Planned",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"]
})
```

```json
add-task-comment({
  "taskId": "<taskId>",
  "source": "skill",
  "comment": "## Update\n- Summary: Scoped implementation approach and acceptance criteria"
})
```

## Comment formats

Delivery update (code shipped / fix completed):

```markdown
**Changes**
- What changed: <short summary>
- Why: <root cause or goal>
```

Research or planning update (no implementation delivered):

```markdown
## Update
- Summary: <what was researched/decided/triaged>
```

## List comments

```json
list-task-comments({ "taskId": "<taskId>" })
```

## React to a comment

Toggles an emoji reaction (adds if missing, removes if already present):

```json
toggle-comment-reaction({
  "commentId": "<commentId>",
  "emoji": "👍"
})
```
