---
name: update-initiative
description: Update initiative tasks in One Horizon, including status, ownership, parent linkage, and taxonomy labels. Use when asked to "update initiative status", "reassign initiative", or "move this under another initiative". Requires One Horizon MCP.
---

# Update Initiative

Update an existing initiative task.

## Instructions

Call `update-initiative`.

Always append to the existing description. Do not prepend or replace existing notes.

Delivery update example (implementation completed):

```json
update-initiative({
  "initiativeId": "<initiativeId>",
  "workspaceId": "<workspaceId>",
  "status": "In Progress",
  "description": "<existingDescription>\\n\\n---\\n\\n## Changes\\n- What changed: Implemented HubSpot OAuth callback and token persistence\\n- Why: Enable first end-to-end auth handshake for lead sync",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"]
})
```

Research/planning update example (no external delivery yet):

```json
update-initiative({
  "initiativeId": "<initiativeId>",
  "workspaceId": "<workspaceId>",
  "status": "In Review",
  "description": "<existingDescription>\\n\\n---\\n\\n## Update\\n- Summary: Researched HubSpot scope, risks, and implementation approach",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"],
  "parentInitiativeId": "<parentInitiativeId>",
  "taxonomyLabelIds": ["<labelId>"]
})
```

Resolve initiative IDs with `list-initiatives` first when needed.

Use `Changes/Why` only when real implementation work was delivered.
For research/planning-only updates, append `## Update` with a concise summary.
