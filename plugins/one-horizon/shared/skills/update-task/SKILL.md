---
name: update-task
description: Update any task in One Horizon (TODO, initiative, bug, or feature request), add comments, or react to comments. Use when asked "mark this done", "update this task", "reassign", "change status", "add a comment", "comment on this task", "react to that comment", or "show comments". Requires One Horizon MCP.
---

# Update Task

Update an existing task or interact with its comments. Pick the right MCP tool based on task type and action.

## Shared rules

- Never modify task descriptions to record progress. Use comments instead.
- When changing status (e.g. to `Completed`), add a comment explaining what changed and why.
- Resolve IDs first with `list-work` or `get-task-details` when needed.

## By task type

### TODO

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

### Initiative

Call `update-initiative`. Supports `assigneeIds`, `teamIds`, `parentInitiativeId`, and `taxonomyLabelIds`:

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
