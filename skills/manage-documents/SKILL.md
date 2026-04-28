---
name: manage-documents
description: Create, read, update, and delete standalone workspace documents in One Horizon. Use when asked to "create a spec", "write a requirement doc", "find all documents", "update this document", "delete this doc", or "show document content". For initiative description edits, use patch-document via task-management instead. Requires One Horizon MCP.
---

# Manage Documents

Create and manage standalone workspace documents. These are distinct from initiative descriptions.

**Do not use this skill for initiative description edits.** Use `patch-document` with `taskId` via `task-management` for that. This skill manages documents by `documentId`.

## Document model

**Types:** `Requirement` — specs, requirements, design docs | `Task` — task-scoped documents

**Statuses:** `Draft` (default) | `Completed`

## Tool selection

| Goal | Tool |
|---|---|
| Create a new document | `create-document` |
| Fetch a document by ID | `get-document` |
| Replace document fields (title, content, status) | `update-document` |
| Search or filter document metadata | `find-documents` |
| Delete a document | `delete-document` |

`update-document` replaces whole fields by `documentId`. It is not for initiative descriptions — use `patch-document` with `taskId` for those.

## Rules

- If `workspaceId` is unknown or the user has multiple workspaces, call `list-workspaces` first.
- `find-documents` is a discovery/list tool. It returns document metadata plus `excerpt`, not full `content`.
- Use `find-documents` for IDs, titles, statuses, task links, and excerpts. Use `get-document` with the selected `documentId` whenever full document content is needed.
- `get-document`, `update-document`, and `delete-document` all require `documentId`. Call `find-documents` first if you only have a title or filter criteria, then call `get-document` before reading or summarizing the full body.
- Do not use `update-document` for initiative description edits. Use `patch-document` with `taskId` instead.
- Do not call `delete-document` without explicit user confirmation — deletion is not reversible.

## Create a document

```json
create-document({
  "workspaceId": "<workspaceId>",
  "title": "Auth Flow Requirements",
  "content": "## Overview\n\nFull markdown content here.",
  "type": "Requirement",
  "status": "Draft"
})
```

`type` is required. Allowed values: `Requirement`, `Task`.

## Get a document

```json
get-document({
  "workspaceId": "<workspaceId>",
  "documentId": "<documentId>"
})
```

## Update a document

Replaces any provided fields. Omit fields you don't want to change.

```json
update-document({
  "workspaceId": "<workspaceId>",
  "documentId": "<documentId>",
  "title": "Updated title",
  "status": "Completed"
})
```

## Find documents

Filter by type, status, task link, or creator. The result is metadata plus `excerpt` only:

```json
find-documents({
  "workspaceId": "<workspaceId>",
  "types": ["Requirement"],
  "statuses": ["Draft"],
  "taskId": "<taskId>",
  "limit": 20
})
```

Use `query` for name/title search:

```json
find-documents({
  "workspaceId": "<workspaceId>",
  "query": "auth spec"
})
```

If the user needs the document body after choosing a result, call:

```json
get-document({
  "workspaceId": "<workspaceId>",
  "documentId": "<documentId>"
})
```

## Delete a document

Only call after the user has explicitly confirmed.

```json
delete-document({
  "workspaceId": "<workspaceId>",
  "documentId": "<documentId>"
})
```
