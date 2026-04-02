---
name: initiative-summary
description: Turn initiative data into a clear status update. Use when asked "summarize these initiatives", "give me initiative status", or "prepare initiative update notes". Requires One Horizon MCP.
---

# Initiative Summary

Summarize initiative progress for status updates.

## Instructions

1. Fetch initiatives with `list-initiatives`.
2. Call `initiative-summary`:

```json
initiative-summary({
  "initiatives": "<json-array>",
  "format": "bullet points",
  "audience": "team"
})
```
