---
name: one-retro
description: Turn recent work into an engineering retro with shipped work, patterns, carryover, and next focus. Use when asked to "weekly retro", "what did we ship", "engineering retrospective", "retro this sprint", or "team retro". Proactively suggest at the end of a work week or sprint. Requires One Horizon MCP.
---

# Retro

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Prepare a personal or team engineering retrospective from One Horizon; proactively suggest it at week/sprint end.

## Scope and data

- Default to team scope and `7d`; support `24h`, `14d`, `30d`, and `compare` with the immediately prior equal-length window. Use personal scope only when explicitly requested.
- Resolve team with `list-my-teams` (or `find-team-member` for a named person). Use the sole team automatically; ask if several exist and none is identified. Report exact dates in the user's local timezone.
- One Horizon is the source of truth; use git only if repository metrics are explicitly requested.
- Fetch `list-completed-work` with ISO `startDate`/`endDate`, plus current `list-planned-work` and `list-blockers`. Add `teamId` for teams and `userId` for member analysis.
- Fetch member-level work only for active contributors or named people, using the team member list. Use `get-task-details` only for major ships, ambiguous titles, or richer product/goal/component labels.

## Analysis

Build a summary table from available signals:

| Metric | Calculation |
|---|---|
| Completed items | Completed work in the window |
| Contributors | Distinct people completing work |
| Initiatives advanced | Linked completed items or completed initiative work |
| Bugs fixed | Bug tasks or explicit `isBugFix` |
| Planned still open | Current unfinished planned work |
| Current blockers | Currently blocked items |
| Active days | Distinct completion dates |
| Throughput/day | Completed items / active days |
| Interrupt ratio | Bug fixes or reactive work / completed items |
| Quality investment ratio | Test/refactor/docs/hardening / completed items |

Prefer `isBugFix`, `isTest`, `isDocumentation`, `isRefactor`, `isNewFeature`; otherwise infer conservatively from types/titles/labels and disclose inference.

Derive delivery mix, completed versus still-open plan, product/component/goal hotspots, carryover, and 1-3 biggest ships based on scope, description size, initiative importance, or repeated mentions.

For active contributors, compute completed count, bugs fixed, initiative work, quality share, top areas, and biggest ship. Briefly explain what shipped, 1-2 evidenced strengths, and one data-grounded growth investment. Do not negatively compare teammates; skip inactive/trivial writeups. With one contributor, use a deeper personal section.

Use timestamps for active/busiest days and obvious end-of-week clustering. Mention peak hours only if times exist; otherwise explain day-level granularity.

## History

Load the newest matching scope/window snapshot in `.context/retros/`, compare if present, and save `.context/retros/YYYY-MM-DD-N.json`. Include date, scope, teamId/teamName, window, startDate/endDate, metrics (`completed`, `contributors`, `initiativesAdvanced`, `bugsFixed`, `plannedStillOpen`, `blockers`, `activeDays`, `throughputPerDay`, `interruptRatio`, `qualityInvestmentRatio`), people summaries, and `shareableSummary`.

If no snapshot exists, state this is the first recorded retro for that scope/window.

## Output

Use this order, merging thin/repetitive sections rather than padding or emitting empty headings:

1. Short TLDR paragraph: scope/dates, main delivery signal, drag, next focus
2. `## Engineering Retro: <date range>`
3. Summary table
4. Trends vs last retro, only with history and meaningful deltas
5. Delivery mix and quality signals
6. Work patterns: timing, clustering, carryover, interruptions
7. `## Your week` for personal scope or one active contributor; otherwise `## Team highlights`, with per-person subsections only when useful
8. Wins: concrete shipped outcomes
9. Friction and follow-through: blockers, churn, carryover, process debt
10. Next-week focus: key follow-through work/habits

Keep stable `##` section titles, short analysis paragraphs, and naturally list-shaped examples/actions. Default to 2-4 bullets for the final three sections only when supported; no forced three-item lists or shareable-summary heading. Fold no-blocker status into a sentence.

Keep analysis candid, task/label/initiative-grounded, and free of celebratory filler. With little completed work, shorten and focus on carryover/blockers/next steps. With none, say so and suggest a longer window.
