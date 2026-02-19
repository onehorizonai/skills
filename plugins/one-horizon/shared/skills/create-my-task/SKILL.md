---
name: create-my-task
description: Create a task in One Horizon to log completed work, plan future work, or track a blocker. Use when asked to "log this work", "add a task", "create a done item", "track this as a blocker", or "record what I just did". Requires One Horizon MCP.
---

# Create My Task

Create a new task in One Horizon. Works for logging completed work, planning upcoming work, and tracking blockers.

## When to Use

- "Log this work to my Done List"
- "Add a task for what I just built"
- "Create a planned task for [description]"
- "Track this as a blocker"
- "Record that I completed [work]"

## Instructions

Call the `create-my-task` MCP tool.

**Log completed work:**
```
create-my-task({
  title: "Fixed auth token refresh race condition",
  status: "Completed",
  topic: "Auth",
  isBugFix: true
})
```

**Create a planned task:**
```
create-my-task({
  title: "Add rate limiting to the search API",
  status: "Planned",
  topic: "API"
})
```

**Mark something as blocked:**
```
create-my-task({
  title: "Migrate payments service to new SDK",
  status: "Blocked",
  description: "Waiting on credentials from the payments team"
})
```

## Writing Good Task Titles

- Write like you're telling a coworker what you worked on
- Past tense for completed work: "Fixed X", "Added Y", "Refactored Z"
- Present/future tense for planned: "Add X", "Migrate Y"
- Be specific — use real names for features, systems, or services
- Keep it concise (under ~80 characters)
- Avoid corporate language: no "leveraged", "streamlined", "coordinated"

## Arguments

| Argument | Type | Required | Description |
|---|---|---|---|
| `title` | string | **Yes** | Concise task title |
| `description` | string | No | Additional context, unique from title |
| `status` | string | No | `"Completed"`, `"Planned"`, `"Blocked"`, `"In Review"`. Defaults to `"Planned"` |
| `topic` | string | No | 1–3 words for grouping, e.g. `"API"`, `"Auth"`, `"UI"` |
| `isNewFeature` | boolean | No | Mark as new feature |
| `isBugFix` | boolean | No | Mark as bug fix |
| `isRefactor` | boolean | No | Mark as refactor |
| `isDocumentation` | boolean | No | Mark as docs change |
| `isTest` | boolean | No | Mark as test change |
| `isInfrastructure` | boolean | No | Mark as infra change |
| `completedAt` | string | No | ISO date. Defaults to now when status is Completed |
| `workspaceId` | string | No | Workspace to create in. Uses default if omitted |

## Output

Confirm the task was created with its title. If multiple items were done, offer to log them as separate tasks.
