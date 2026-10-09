---
name: one-get-task-details
description: Fetch the full details for one known One Horizon task when the task ID is already available and the user needs exact task context. Prefer one-task-management when details are only one step in a larger operational request. Requires One Horizon MCP.
---

# Get Task Details

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Fetch full context for a known task. Use `one-task-management` when this is part of a larger operation.

## Instructions

Call `get-task-details` with required `taskId` and optional `workspaceId`. It supports Todos, initiatives, and bugs.

The text includes typed `Goals`, `Products`, and `Skills`; structured metadata includes `goals`, `products`, and `skills`. Use them to match roadmap labels, validate scope, or summarize work. Products may be product lines, feature areas, or services.
