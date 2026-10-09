---
name: one-list-taxonomy
description: Look up One Horizon taxonomy labels when the user explicitly asks for label IDs or available goals, companies, products, releases, components, skills, coding tools, or agents. Prefer one-task-management when taxonomy lookup is only one step in a larger operational request. Requires One Horizon MCP.
---

# List Taxonomy

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Look up labels for tagging and filtering work. Use `one-task-management` when lookup is part of a larger operation.

## Instructions

Call `list-taxonomy` with `workspaceId` and optional `types`: `goals`, `companies`, `products`, `releases`, `components`, `skills`, `coding tools`, `agents`.

Omitting `types` returns all except `agents`; request `agents` explicitly when needed.
