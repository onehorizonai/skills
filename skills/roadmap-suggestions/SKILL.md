---
name: roadmap-suggestions
description: Suggest One Horizon roadmap improvements by reviewing initiatives, planned work, blockers, bugs, and taxonomy. Use when asked "suggest roadmap changes", "improve my roadmap", "what is missing from my roadmap", "review my roadmap", or "should this be an initiative or ongoing work". Requires One Horizon MCP.
---

# Roadmap Suggestions

Review a One Horizon workspace and suggest how to improve roadmap structure, sequencing, and scope.

## Core rules

- Default to suggestions only. Do not mutate roadmap items unless the user explicitly asks you to apply changes.
- Ground every recommendation in current workspace data, not generic startup advice.
- Prefer 3-5 high-signal suggestions over an exhaustive dump unless the user asks for a full audit.
- If the roadmap is sparse, use planned work, blockers, bugs, and taxonomy to propose a starter roadmap.
- Do not invent missing initiatives from weak signals. If the evidence is thin, label it as a hypothesis.
- Do not recommend a work-type conversion unless you can explain why the current type is wrong and which type fits better.

## Gather context

1. Call `list-initiatives` with active statuses and `includeHierarchy: true`.
2. Call `list-planned-work` with `includeInitiatives: true`.
3. Call `list-bugs` for active bugs when defect pressure may imply missing roadmap investment.
4. Call `list-blockers` with `includeInitiatives: true`.
5. Call `list-taxonomy` when the workspace uses goals, products, companies, or components, or when category-like initiatives may really be taxonomy.
6. If a recommendation depends on a specific item, call `get-task-details` before suggesting a reframe.
7. Use `search-tasks` when you need to confirm a repeated theme across the workspace.

## Decision rubric

Before giving a recommendation, classify it into exactly one of these buckets:

- `Hierarchy`: parent-child reshaping, merge, dedupe, or split.
- `Work type`: initiative vs taxonomy vs ongoing work vs bug vs feature request vs personal task.
- `Coverage`: missing roadmap investment or missing foundational work.
- `Sequencing`: roadmap order is likely wrong or incomplete.
- `Tagging`: taxonomy is missing or misused.

Only surface a recommendation when at least one of these is true:

- There are at least 2 supporting signals across initiatives, planned work, blockers, bugs, or taxonomy.
- There is 1 strong signal from `get-task-details` that clearly contradicts the current roadmap shape.
- The same gap or mismatch appears in multiple related tasks.

## Heuristics

### Hierarchy

- Suggest parent and child reshaping when there are flat lists of tightly related initiatives, mismatched children, or child items that are really standalone efforts.
- Suggest merging or deduplicating initiatives with overlapping titles, scope, or outcomes.
- Suggest splitting initiatives that bundle multiple products, goals, or delivery tracks.

### Work type

- Suggest taxonomy when the item behaves like a reusable label or grouping concept such as a product area, customer, market, or goal rather than a deliverable.
- Suggest ongoing work when the item is recurring and owner-driven with no clear end state.
- Suggest a bug or feature request when the item is really issue intake rather than planned roadmap work.
- Suggest a personal task only for small private follow-up work, not roadmap items.

### Coverage and maturity

- Suggest missing initiatives when blockers, bugs, or planned work cluster around the same gap.
- Suggest sequencing changes when later work depends on missing foundations such as auth, testing, onboarding, or integrations.
- Call out where the roadmap is under-tagged or under-grouped relative to existing taxonomy.

## Response shape

- `Summary`: 2-4 sentences on the current roadmap quality, maturity, and biggest pattern.
- `Suggestions`: for each recommendation, use this format:
  - `Type`: one bucket from the decision rubric
  - `Change`: the exact change to make
  - `Evidence`: the concrete tasks, blockers, bugs, taxonomy, or hierarchy pattern that support it
  - `Why`: why this improves the roadmap
  - `Confidence`: `High`, `Medium`, or `Low`
- `Missing initiatives`: include only when there are clear gaps, with concrete initiative titles.
- `Hypotheses`: include only low-confidence ideas that may be useful but are not well supported yet.
- `Next step`: ask whether to apply any subset using One Horizon tools.

## Quality bar

- Be direct. Do not pad the answer with roadmap theory.
- Prefer specific initiative titles over abstract categories.
- If the workspace already looks coherent, say so and suggest only the smallest useful improvements.
- If there is not enough evidence for a confident recommendation, say what is missing.

## If the user wants changes applied

- Use `update-initiative` for hierarchy, title, status, team, assignee, or taxonomy changes.
- Use `create-initiative` for new roadmap items.
- Use `create-todo` only when the recommendation is really a private follow-up.
- Add a task comment when you materially reframe an existing initiative so the reasoning is visible.
- Never rewrite descriptions just to log progress.
