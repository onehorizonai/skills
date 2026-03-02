---
name: find-team-member
description: Find a team member in One Horizon to get userId and teamId for task queries. Use when a person is named and you need to fetch their planned tasks, blockers, recap, or ownership context. Requires One Horizon MCP.
---

# Find Team Member

Resolve a person to IDs for team-scoped tools.

## Instructions

Call:

```json
find-team-member({ "query": "Jane" })
```

Use returned `userId` and `teamId` in `list-planned-work`, `list-completed-work`, `list-blockers`, and `team-work-recap`.
