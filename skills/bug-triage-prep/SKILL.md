---
name: bug-triage-prep
description: Turn open bugs into triage notes a team can actually use. Use when asked "prepare bug triage", "summarize open bugs", or "prioritize defects for review". Requires One Horizon MCP.
---

# Bug Triage Prep

Turn a list of open bugs into clear triage notes with enough context to decide priority and next action.

## Core rule

- Focus on the affected user workflow, repro quality, scope boundaries, and next decision.
- Keep business framing brief. The important thing is whether the bug is real, broad, severe, and actionable.
- Separate confirmed facts from assumptions.
- Do not just restate bug titles. Add triage judgment.

## Use when

- The user needs triage prep for bug review.
- The team wants a prioritized defect summary.
- Open bugs need clearer notes before assignment or escalation.

## Do not use when

- The user wants to create a new bug instead of triaging existing ones.
- The user needs a full status report across initiatives and tasks.
- There are no bugs to review.

## Triage dimensions

Assess each bug using concrete signals:

- User impact: what the user cannot do or what breaks in the workflow.
- Customer reach: how many users, customers, or segments are likely affected.
- Repro reliability: always, intermittent, or unclear.
- Scope boundary: where it happens and where it does not.
- Workaround: whether users can still complete the job some other way.
- Evidence quality: logs, screenshots, support reports, or exact repro steps.

## Workflow

1. Fetch bugs with `list-bugs`.
2. Use active statuses unless the user asks for a narrower slice.
3. Enrich bugs with `get-task-details` when the title or summary is too thin to triage responsibly.
4. If multiple bugs describe the same failure mode, call that out as a likely duplicate cluster.
5. Order the notes by triage urgency, not alphabetically.
6. Use the same note structure for every bug so the output is easy to scan and compare.

## Output guidance

- Start with a short triage summary for the whole set.
- Then write one note per bug.
- Prefer `###` headings for bug titles.
- Use markdown links for related work items when available.
- Keep each note compact but decision-ready.

## Per-bug note format

```markdown
### <bug title>

Short TLDR paragraph:
In 2-4 sentences, summarize what is broken, who is affected, how reliable the repro is, and why this bug should or should not be prioritized now.

### Background
- One short paragraph on the affected workflow and what is happening today.

### Repro and evidence
- Best known repro steps or trigger conditions.
- Evidence quality: confirmed, partial, or unclear.

### Known scope / boundaries
- Where this bug shows up.
- What appears unaffected or still unconfirmed.

### Impact and workaround
- What the user cannot do.
- Whether a workaround exists.

### Triage recommendation
- Suggested priority with a short reason.
- Suggested next action such as investigate, assign, merge with duplicate, wait for more evidence, or close.

### Open questions
- What is still missing to make a confident call?
```

## Priority posture

Use direct language:

- `Highest priority`: blocks a core workflow, has broad reach, or has no workaround.
- `High priority`: serious user pain with solid evidence, but not a total blocker.
- `Medium priority`: real issue, narrower scope, partial workaround, or weaker evidence.
- `Low priority`: edge case, unclear repro, cosmetic issue, or low user impact.

If confidence is low, say that clearly instead of pretending the triage is settled.

## Confidence rule

For every triage recommendation, be explicit about confidence:

- `High confidence`: strong repro or evidence, clear impact, little ambiguity.
- `Medium confidence`: likely real, but one of repro, reach, or scope is still fuzzy.
- `Low confidence`: weak evidence, unclear repro, or likely duplicate/noise.

Do not present a shaky recommendation as definitive.
