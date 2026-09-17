---
name: one-standup-prep
description: Turn recent work into standup talking points for one person or a whole team. Use when asked "prep my standup", "what should I say", "give me my standup update", "team standup summary", or "what should we cover in standup". Requires One Horizon MCP.
---

# Standup Prep

Generate standup talking points for a person or team. For a longer written update use `one-work-summarizer`.

## Instructions

### 1. Pick the window

Default to "since last standup": the last 24 hours, or since Friday when today is Monday. Pass it to `list-completed-work` as `startDate` and `endDate`.

### 2. Fetch the data

The calls are independent, so run them in parallel.

Personal standup:

```json
list-completed-work({ "startDate": "<iso-start>", "endDate": "<iso-end>" })
```

```json
list-planned-work()
```

```json
list-blockers()
```

Team standup. Resolve `teamId` with `list-my-teams`; ask which team when there are several and none is named:

```json
list-completed-work({ "teamId": "<teamId>", "startDate": "<iso-start>", "endDate": "<iso-end>" })
```

```json
list-planned-work({ "teamId": "<teamId>" })
```

```json
list-blockers({ "teamId": "<teamId>" })
```

### 3. Write the talking points

Personal standup, in these sections:

- **What I completed**
- **What I'm working on**
- **Initiatives I'm on**, only when the data includes initiatives
- **Blockers**, or "None"

Team standup, in these sections:

1. Team progress overview
2. Individual updates, grouped by person
3. Initiative progress
4. Blockers and dependencies
5. Upcoming focus

Style: specific and conversational, one or two sentences per point, no filler. Use only what the data shows; do not invent progress.
