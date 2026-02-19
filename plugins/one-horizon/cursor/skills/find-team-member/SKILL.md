---
name: find-team-member
description: Find a team member by name in One Horizon to get their userId and teamId. Use whenever you need to look up a person before fetching their work, blockers, or planned tasks. Requires One Horizon MCP.
---

# Find Team Member

Search for a team member by name to get their `userId` and `teamId`, which are required by several other One Horizon tools.

## When to Use

Use this **before** calling:
- `list-planned-work` with a specific person
- `list-completed-work` with a specific person
- `list-blockers` with a specific person

Trigger phrases:
- "What did Jane work on?"
- "Show blockers for Alex"
- "What's on Marcus's plate?"

Whenever the user refers to someone by name and you need their userId or teamId.

## Instructions

Call the `find-team-member` MCP tool with the person's name:

```
find-team-member({ query: "Jane" })
```

The tool returns all team members across your workspaces and teams. Find the right person, then use their `userId` and `teamId` in the next call.

## Arguments

| Argument | Type | Required | Description |
|---|---|---|---|
| `query` | string | **Yes** | Name (or partial name) of the person to find |

## Output

Returns a list of matching members with their `userId`, `teamId`, name, and roles. If multiple people match, ask the user to clarify before proceeding.
