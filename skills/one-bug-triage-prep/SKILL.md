---
name: one-bug-triage-prep
description: Turn open bugs into prioritized triage notes. Use when asked "prepare bug triage", "summarize open bugs", or "prioritize defects for review". Requires One Horizon MCP.
---

# Bug Triage Prep

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Prioritize existing open bugs with enough evidence to decide next action. Use other skills for new bug intake or broader status reports; stop if there are no bugs.

## Instructions

1. Fetch `list-bugs` with active statuses unless the user requests a narrower slice. Use `get-task-details` when summaries are too thin for responsible triage.
2. Assess user impact, customer reach, repro reliability, scope boundaries, workaround, and evidence quality (logs, screenshots, support reports, exact steps).
3. Identify likely duplicate clusters and order by urgency, not alphabetically. Separate facts from assumptions and add judgment beyond the titles.
4. Start with a brief set summary, then consistent compact notes with linked bug-title `###` headings.

## Per-bug notes

Include a short overview of the failure, affected users, repro, and priority; then background; repro/evidence; known scope and unaffected/unconfirmed areas; impact/workaround; recommendation and next action; open questions. Prefer `###` headings. Keep business framing brief.

Priority:

- Highest: core workflow blocked, broad reach, or no workaround
- High: serious pain with solid evidence, short of a total blocker
- Medium: real issue with narrower scope, partial workaround, or weaker evidence
- Low: edge case, unclear repro, cosmetic issue, or low impact

State confidence for each recommendation:

- High: strong repro/evidence, clear impact, little ambiguity
- Medium: likely real, but repro, reach, or scope remains unclear
- Low: weak evidence, unclear repro, or likely duplicate/noise

Do not present uncertain recommendations as settled. Next actions may be investigate, assign, merge duplicates, gather evidence, or close.
