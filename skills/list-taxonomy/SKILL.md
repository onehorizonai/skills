---
name: list-taxonomy
description: Look up the labels that tie work back to goals, products, releases, and components. Use when asked "show taxonomy", "find label IDs", or "tag this initiative". Requires One Horizon MCP.
---

# List Taxonomy

Fetch taxonomy labels for task tagging and filtering.

## Instructions

Call `list-taxonomy`.

```json
list-taxonomy({
  "workspaceId": "<workspaceId>",
  "types": ["products", "releases", "components"]
})
```
