---
name: list-taxonomy
description: Look up One Horizon taxonomy labels when the user explicitly asks for label IDs or available goals, products, companies, or components. Prefer task-management when taxonomy lookup is only one step in a larger operational request. Requires One Horizon MCP.
---

# List Taxonomy

Fetch taxonomy labels for task tagging and filtering.

## Instructions

Call `list-taxonomy`.

```json
list-taxonomy({
  "workspaceId": "<workspaceId>",
  "types": ["products", "companies", "components"]
})
```
