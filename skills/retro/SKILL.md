---
name: retro
description: Turn recent work into an engineering retro with shipped work, patterns, and momentum in one place. Use when asked to "weekly retro", "what did we ship", "engineering retrospective", "retro this sprint", or "team retro". Proactively suggest at the end of a work week or sprint. Requires One Horizon MCP.
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

1. Short TLDR paragraph
2. `## Engineering Retro: <date range>`
3. Summary table
4. Trends vs last retro, if history exists
5. Delivery mix and quality signals
6. Work patterns
7. Scope-aware highlights:
   - For personal scope: `## Your week`
   - For team scope: `## Team highlights`
8. Wins
9. Friction and follow-through
10. Next-week focus

Formatting rules:

- Start with a short paragraph, not bullets, for the TLDR.
- The TLDR should cover:
  - scope and date window
  - main delivery signal
  - main constraint or source of drag
  - the most important next-step theme
- Do not force a "tweetable summary" heading.
- Use `##` for the main sections.
- Use bullets only when the content is naturally list-shaped.
- Default to 2-4 bullets for `Wins`, `Friction and follow-through`, and `Next-week focus`.
- Do not force exactly 3 items in those sections if the data does not support it.
- Keep the section titles stable, but let the content flex to the data.
- If one section would be thin or repetitive, merge it into the adjacent section instead of padding.
- Do not emit empty headings.
- Prefer short paragraphs for analysis sections and bullets for concrete examples or actions.

Section intent:

- `Summary table`: the compact factual snapshot.
- `Trends vs last retro`: only include meaningful deltas, not every metric.
- `Delivery mix and quality signals`: explain what kind of work dominated and whether the team invested in quality.
- `Work patterns`: call out timing, clustering, carryover, or interruption patterns.
- `Your week` or `Team highlights`: explain the concrete work that mattered most.
- `Wins`: specific shipped outcomes, not generic praise.
- `Friction and follow-through`: blockers, churn, carryover, or process debt that deserves attention.
- `Next-week focus`: the 2-4 most important follow-through items or habits.

Scope rules:

- For personal scope, use `## Your week` and do not include a team breakdown.
- For team scope with only one active contributor, also use `## Your week`.
- For team scope with multiple active contributors, use `## Team highlights` and include a short per-person subsection only when it adds signal.
- Do not force per-person writeups for inactive contributors or people with trivial activity.

Thin-data rules:

- If there is no prior retro, omit `Trends vs last retro` entirely and mention first-run status in the TLDR or closing line.
- If there are no blockers, fold that into `Friction and follow-through` as a short sentence instead of a padded list.
- If the window has very little completed work, shorten the retro and bias toward carryover, blockers, and next-step focus.

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
