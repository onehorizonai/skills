---
name: team-standup-prep
description: Generate a team standup summary from One Horizon work data across all team members. Use when asked for "team standup summary", "standup for the whole team", "what should we cover in team standup", or "team status for the meeting". Requires One Horizon MCP.
---

# Team Standup Prep

Generate a structured standup summary covering all team members' completed work, current priorities, and blockers.

## When to Use

- "Generate the team standup summary"
- "What should we cover in standup today?"
- "Team status for this morning's meeting"
- "Compile everyone's standup updates"

## Instructions

**Step 1:** Fetch team work using `team-work-recap` to get completed, planned, and blocked items across the team.

**Step 2:** Prepare team member updates as a JSON array grouping each person's work:

```json
[
  {
    "userId": "user-123",
    "teamName": "Platform",
    "completedTasks": [...],
    "plannedTasks": [...],
    "blockers": ["waiting on API keys from infra"]
  }
]
```

**Step 3:** Call the `team-standup-prep` MCP prompt:

```
team-standup-prep({
  teamMemberUpdates: JSON.stringify(updates),
  team_name: "Platform",       // optional
  timeframe: "yesterday"       // optional
})
```

## Arguments

| Argument | Type | Required | Description |
|---|---|---|---|
| `teamMemberUpdates` | string | **Yes** | JSON array of per-member update objects |
| `team_name` | string | No | Team to focus on (all teams if omitted) |
| `timeframe` | string | No | e.g. `"yesterday"`, `"this week"` |

## Output Structure

1. **Team Progress Overview** — high-level summary of collective accomplishments
2. **Individual Updates** — brief per-member summary
3. **Blockers & Dependencies** — team-wide issues and cross-team dependencies
4. **Upcoming Focus** — what the team is working on next
