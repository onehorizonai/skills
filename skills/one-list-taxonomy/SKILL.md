---
name: one-list-taxonomy
description: Look up One Horizon taxonomy labels when the user explicitly asks for label IDs or available goals, companies, products, releases, components, skills, coding tools, or agents. Prefer one-task-management when taxonomy lookup is only one step in a larger operational request. Requires One Horizon MCP.
---

# List Taxonomy

Fetch taxonomy labels for tagging and filtering One Horizon work.

## Instructions

Call `list-taxonomy`.

```json
list-taxonomy({
  "workspaceId": "<workspaceId>",
  "types": ["products", "companies", "components", "skills", "coding tools"]
})
```

Supported `types`: `goals`, `companies`, `products`, `releases`, `components`, `skills`, `coding tools`, `agents`.

When `types` is omitted, the MCP tool returns all supported taxonomy types except `agents`; pass `agents` explicitly when agent labels are needed.
