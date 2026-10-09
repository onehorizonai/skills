---
name: one-roadmap-suggestions
description: Suggest One Horizon roadmap improvements by reviewing initiatives, planned work, blockers, bugs, and taxonomy. Use when asked "suggest roadmap changes", "improve my roadmap", "what is missing from my roadmap", "review my roadmap", or "should this be an initiative or ongoing work". Requires One Horizon MCP.
---

# Roadmap Suggestions

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Recommend practical changes to roadmap hierarchy, work types, coverage, sequencing, and tagging. Suggest only; mutate only when explicitly requested.

## Instructions

1. Fetch active `list-initiatives` with `includeHierarchy: true`, `list-planned-work` and `list-blockers` with `includeInitiatives: true`.
2. Fetch active `list-bugs` when defect pressure suggests missing investment. Use `list-taxonomy` when goals/products/companies/components exist or category-like initiatives may be labels.
3. Use `get-task-details` before item-dependent reframing and `search-tasks` to confirm repeated themes.
4. Prefer 3-5 supported suggestions unless a full audit is requested. Sparse roadmaps may need a starter roadmap derived from planned work, blockers, bugs, and taxonomy.

## Decision rubric

Classify each recommendation into exactly one bucket:

- Hierarchy: reshape tightly related flat lists or mismatched children; merge overlapping scope/outcomes; split multiple products, goals, or delivery tracks.
- Work type: taxonomy for reusable grouping labels; ongoing for recurring work without an end state; bug/feature request for issue intake; Todo for small private follow-up, never roadmap work. Explain why the current type is wrong and the replacement fits.
- Coverage: missing investment supported by clusters of blockers, bugs, or planned work.
- Sequencing: dependent work precedes missing foundations such as auth, testing, onboarding, or integrations.
- Tagging: missing/misused taxonomy or grouping relative to existing labels.

Surface only recommendations with two supporting signals, one strong contradictory `get-task-details` signal, or a repeated mismatch across related tasks. Label weaker ideas as hypotheses rather than inventing initiatives.

## Response

Brief summary of roadmap quality/maturity and its main pattern; then suggestions with type, exact change, concrete evidence, why, and High/Medium/Low confidence. Include missing initiative titles only for clear gaps, hypotheses only for useful weak signals. Ask which subset to apply.

Use specific titles, skip roadmap theory, and suggest only small useful changes if the roadmap is coherent. State missing evidence when confidence is insufficient.

## Applying requested changes

Use `update-initiative` for hierarchy/title/status/team/assignee/taxonomy, `create-initiative` for new roadmap work, and `create-todo` only for private follow-up. Comment on material reframing; never rewrite descriptions to log progress.
