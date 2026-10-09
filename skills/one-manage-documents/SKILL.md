---
name: one-manage-documents
description: Create, read, update, and delete standalone workspace documents in One Horizon. Use when asked to "create a spec", "write a requirement doc", "find all documents", "update this document", "delete this doc", or "show document content". For initiative description edits, use patch-document through one-task-management instead. Requires One Horizon MCP.
---

# Manage Documents

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Manage standalone workspace documents by `documentId`. For initiative descriptions, use `patch-document` with initiative `taskId` through `one-task-management`.

## Instructions

- Resolve unknown or multiple workspaces with `list-workspaces`.
- `find-documents` returns metadata plus `excerpt` only. Filter by `query` (title/name), `types`, `statuses`, `taskId`, creator, or `limit`.
- Use `find-documents` to select IDs, titles, statuses, task links, and excerpts. Use `get-document` with `documentId` for full document content before reading or summarizing it.
- `get-document`, `update-document`, and `delete-document` require `documentId`; discover it first if only a title or filter is known.

| Goal | Tool and fields |
|---|---|
| Create | `create-document`: `workspaceId`, `title`, markdown `content`, required `type`, optional `status` |
| Fetch | `get-document`: `workspaceId`, `documentId` |
| Replace fields | `update-document`: `workspaceId`, `documentId`, desired `title`, `content`, or `status`; omit unchanged fields |
| Targeted edit | `patch-document`: `workspaceId`, `documentId`, precise `ops` rather than a broad content replacement |
| Delete | `delete-document`: `workspaceId`, `documentId`; only after explicit user confirmation, because deletion is irreversible |

Types: `Requirement` for specs/requirements/design docs, `Task` for task-scoped documents. Statuses: `Draft` (default), `Completed`.

Example targeted edit:

```json
{ "workspaceId": "<workspaceId>", "documentId": "<documentId>", "ops": [{ "kind": "replace_text", "target": "Old wording", "replacement": "New wording" }] }
```

Never use `update-document` for initiative descriptions; patch by `taskId` instead.
