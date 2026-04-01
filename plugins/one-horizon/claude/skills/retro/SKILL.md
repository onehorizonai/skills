---
name: retro
description: Weekly engineering retrospective from One Horizon work data. Analyzes task completion, work patterns, and code quality proxies with persistent history and trend tracking. Team-aware: breaks down per-person contributions with praise and growth areas. Use when asked to "weekly retro", "what did we ship", "engineering retrospective", "retro this sprint", or "team retro". Proactively suggest at the end of a work week or sprint. Requires One Horizon MCP.
---

# Retro

Generate a personal or team engineering retrospective from One Horizon.

## Instructions

### 1. Pick scope and window

- Default to the last `7d`.
- Accept `24h`, `7d`, `14d`, and `30d`.
- Accept `compare` to compare the current window against the immediately prior same-length window.
- Default to team scope.
- If the user asks about "team", "engineering", "sprint", or "what did we ship", use team scope.
- If the user explicitly asks for a personal retro, use personal scope.
- If team scope is needed and the team is not explicit, resolve it from `list-my-teams`.
- If `list-my-teams` returns exactly one team, use it.
- If multiple teams are available and the request does not identify one, ask the user which team the retro should cover before continuing.
- Always report exact start and end dates in the user's local timezone.

### 2. Gather source data from One Horizon

Use One Horizon as the source of truth. Do not fall back to git unless the user explicitly asks for repository-level metrics too.

For personal scope, fetch:

```json
my-work-recap({
  "startDate": "<iso-start>",
  "endDate": "<iso-end>"
})
```

```json
list-completed-work({
  "startDate": "<iso-start>",
  "endDate": "<iso-end>"
})
```

```json
list-planned-work()
```

```json
list-blockers()
```

For team scope:

1. Resolve the team with `list-my-teams` or `find-team-member` if the user named a person.
2. Fetch:

```json
team-work-recap({
  "teamId": "<teamId>",
  "startDate": "<iso-start>",
  "endDate": "<iso-end>"
})
```

```json
list-completed-work({
  "teamId": "<teamId>",
  "startDate": "<iso-start>",
  "endDate": "<iso-end>"
})
```

```json
list-planned-work({ "teamId": "<teamId>" })
```

```json
list-blockers({ "teamId": "<teamId>" })
```

For per-person analysis, use the team member list from `list-my-teams`, then fetch member-level work only for contributors active in the window or people called out by the user:

```json
list-completed-work({
  "teamId": "<teamId>",
  "userId": "<userId>",
  "startDate": "<iso-start>",
  "endDate": "<iso-end>"
})
```

```json
list-planned-work({
  "teamId": "<teamId>",
  "userId": "<userId>"
})
```

```json
list-blockers({
  "teamId": "<teamId>",
  "userId": "<userId>"
})
```

Use `get-task-details` only for the biggest ships, ambiguous task titles, or to extract richer `Products`, `Goals`, components, and labels for hotspot analysis.

### 3. Compute retro metrics

Build a summary table with the strongest available One Horizon signals:

| Metric | Meaning |
|---|---|
| Completed items | Total completed work in the window |
| Contributors | Distinct people with completed work |
| Initiatives advanced | Completed items linked to initiatives or initiative work surfaced in recap |
| Bugs fixed | Bug tasks or work explicitly marked `isBugFix` |
| Planned still open | Current planned work not finished yet |
| Current blockers | Open blocked items now |
| Active days | Distinct completion dates in the window |
| Throughput/day | Completed items divided by active days |
| Interrupt ratio | Bug fixes or reactive work divided by completed items |
| Quality investment ratio | Test, refactor, docs, or hardening work divided by completed items |

For code-quality metrics, prefer explicit booleans such as `isBugFix`, `isTest`, `isDocumentation`, `isRefactor`, and `isNewFeature` when present. If they are missing, infer conservatively from task type, title, and labels, and say the metric is inferred.

Also derive:

- Delivery mix: feature vs bug vs refactor/test/docs/chore work.
- Plan completion: completed work vs still-open planned work.
- Hot areas: most common products, components, or goals from task labels/details.
- Carryover: planned or blocked items that are still open at the end of the window.
- Biggest ships: 1-3 highest-impact completed items by scope, size of description, linked initiative importance, or repeated mentions across recap data.

### 4. Build team-aware analysis

For each active contributor, compute:

- Completed count
- Bugs fixed
- Initiative-related work
- Quality investment share
- Top areas from products/components/goals
- Biggest ship in the window

Write 2-4 sentences per person:

- `What they shipped`: concrete summary of their work and focus areas.
- `Praise`: 1-2 specific strengths anchored in actual completed items.
- `Growth area`: 1 concrete investment suggestion anchored in the data, framed as leveling up rather than criticism.

If only one person contributed, skip the team breakdown and write a deeper personal section instead.

### 5. Track history

Persist retro history in the current workspace under `.context/retros/`.

1. Load the newest prior snapshot that matches the same scope and window.
2. Compare current metrics to the prior snapshot when one exists.
3. Save the new snapshot as `.context/retros/YYYY-MM-DD-N.json`.

Use a compact schema like:

```json
{
  "date": "2026-04-01",
  "scope": "team",
  "teamId": "team_123",
  "teamName": "Platform",
  "window": "7d",
  "startDate": "2026-03-25T00:00:00+01:00",
  "endDate": "2026-04-01T23:59:59+02:00",
  "metrics": {
    "completed": 18,
    "contributors": 4,
    "initiativesAdvanced": 6,
    "bugsFixed": 5,
    "plannedStillOpen": 7,
    "blockers": 2,
    "activeDays": 5,
    "throughputPerDay": 3.6,
    "interruptRatio": 0.28,
    "qualityInvestmentRatio": 0.33
  },
  "people": {
    "Alex": {
      "completed": 7,
      "bugsFixed": 1,
      "topAreas": ["checkout", "crm"]
    }
  },
  "tweetable": "Week of Mar 25: 18 items shipped, 4 contributors, 6 initiative moves, 5 bug fixes, quality investment 33%"
}
```

If no prior retro exists, say that it is the first recorded retro for that scope and window.

### 6. Output format

Structure the response in this order:

1. Tweetable summary
2. `## Engineering Retro: <date range>`
3. Summary table
4. Trends vs last retro, if history exists
5. Delivery mix and quality signals
6. Work patterns
7. Your week
8. Team breakdown, if applicable
9. Top 3 wins
10. 3 things to improve
11. 3 habits for next week

For work-pattern analysis, use completion timestamps if the data includes them:

- Show active days and busiest days.
- Show end-of-week clustering or crunch if it is obvious.
- If timestamps include times, call out peak completion hours; otherwise stay at day granularity and say why.

### 7. Tone and guardrails

- Be specific and anchored in actual tasks, labels, and linked initiatives.
- Make clear when a metric is inferred rather than explicit in One Horizon.
- Do not compare teammates against each other negatively.
- If the window has no completed work, say so plainly and suggest a longer window.
- Keep the narrative candid and useful, not celebratory filler.
