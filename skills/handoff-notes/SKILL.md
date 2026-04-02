---
name: handoff-notes
description: Turn current work into handoff notes someone else can pick up without guessing. Use when asked to "write handoff notes", "prepare transition docs", or "document my current ownership". Requires One Horizon MCP.
---

# Handoff Notes

Generate handoff notes for vacations and transitions.

## Instructions

1. Fetch source data with `my-work-recap`.
2. Call `handoff-notes`:

```json
handoff-notes({
  "completedTasks": "<json-array>",
  "plannedTasks": "<json-array>",
  "initiatives": "<json-array>",
  "handoff_type": "vacation",
  "duration": "2 weeks",
  "focus_areas": "integrations, checkout"
})
```
