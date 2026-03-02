---
name: bug-triage-prep
description: Generate bug triage prep notes from One Horizon bug data. Use when asked "prepare bug triage", "summarize open bugs", or "prioritize defects for review". Requires One Horizon MCP.
---

# Bug Triage Prep

Prepare bug triage notes from current bug tasks.

## Instructions

1. Fetch bugs with `list-bugs`.
2. Optionally enrich selected bugs with `get-task-details`.
3. Call `bug-triage-prep`:

```json
bug-triage-prep({
  "bugs": "<json-array>",
  "criteria": "impact, customer reach, repro reliability"
})
```
