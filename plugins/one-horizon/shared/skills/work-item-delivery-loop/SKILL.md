---
name: work-item-delivery-loop
description: Execute an end-to-end One Horizon task workflow with deterministic steps: discover tasks, select target, fetch full details, implement code, write updates back, link initiatives, and save a local .journal record. Use for prompts like "what do I have planned", "pick this up and implement it", "I found a problem", "fix all bugs assigned to me", "implement HubSpot lead sync", and "write this back to One Horizon". Requires One Horizon MCP.
---

# Work Item Delivery Loop

Run task execution with strict sequencing and explicit write-back.

## Operating Rules

- Always fetch before editing: list -> details -> implement -> write-back.
- Never mark a task complete without validation evidence.
- If initiative matching is ambiguous, ask for confirmation.
- A run is incomplete until MCP write-back and `.journal` logging are done.
- Append updates to existing task descriptions; do not prepend.
- Use `Changes/Why` only when real delivery happened (bug fix, completed TODO, completed initiative work).
- For research/planning/triage-only updates, append a short `Update` summary instead.
- For prompts like "implement this bug" or "work on this initiative", use every relevant One Horizon tool and companion skill before writing back.
- Always follow skill/tool rules end-to-end: context fetch, detailed task lookup, implementation, validation, append-only write-back, initiative linking, and `.journal` logging.
- If implementation work was requested, do not post a status-only write-back; include what changed and why.

## Task Type Heuristic

- Multi-day scoped work -> initiative
- Unplanned defect fix -> bug
- Small one-off change -> TODO

## Standard Flow

1. Identify target from user prompt.
2. Fetch candidate tasks (`list-planned-work`, `list-initiatives`, or `list-bugs`).
3. Resolve exact task IDs with `get-task-details`.
4. Implement code changes.
5. Run validation/tests.
6. Write MCP updates (`update-*` or `create-todo`) using append-only descriptions.
7. Apply initiative links when requested.
8. Save `.journal` entry.

## Plan Mode Rule

If the agent is in plan mode, or the user asks for a plan, include workflow tasks from this skill in the plan explicitly.

Required plan items:
1. Discover candidate tasks with list tools.
2. Resolve selected task IDs and full context with `get-task-details`.
3. Implement the code changes.
4. Validate changes with tests/checks.
5. Write back to One Horizon (`update-*` or `create-todo`) with append-only notes.
6. Apply initiative links if requested.
7. Save `.journal` entry.

For "Fix all bugs assigned to me", include per-bug execution/write-back and a final journal/logging step.
For initiative implementation prompts, include initiative matching + confirmation before coding.

## Implementation Request Rule

When a user asks to implement a bug/initiative/todo, run the full flow and do not treat it as a status-only update.

Required sequence:
1. Use discovery/list tools to find targets (`list-bugs`, `list-initiatives`, `list-planned-work`).
2. Use `get-task-details` for each selected task before implementation.
3. Use related companion skills where relevant (`bug-triage-prep`, `initiative-summary`, recap/summarizer skills) before coding or writing updates.
4. Implement and validate code changes.
5. Apply append-only task write-back using `update-*` or `create-todo`.
6. Apply requested initiative links.
7. Save `.journal` entry.

If any required step is skipped, the run is incomplete.
If implementation happened, the write-back must include a `## Changes` block with both "What changed" and "Why".

## Workflow Rule: "Fix all bugs assigned to me"

Use this exact sequence:

1. Call `list-my-teams` to resolve user/team context.
2. Call `list-bugs` filtered to current user assignee and active statuses.
3. For each bug task:
   - Call `get-task-details`.
   - Implement fix.
   - Validate fix with relevant tests/checks.
   - Call `update-bug` with latest status and fix notes.
4. If a bug is not fixed, still call `update-bug` with blocker details.
5. Save `.journal` entry per bug (or batch entry listing all processed bug IDs).

Required `update-bug` content:
- root cause
- code changes made
- current status

## Workflow Rule: "Implement <initiative keyword>" (example: "Implement HubSpot lead sync")

Use this exact sequence:

1. Call `list-initiatives` with active statuses.
2. Rank candidates by title match, then taxonomy/team match.
3. Present top matches and confirm selected initiative.
4. Call `get-task-details` for selected initiative, then use `Goals`, `Products`, and `labelsByType` to verify fit.
5. Implement requested code.
6. Create implementation record with `create-todo` using `status: "Completed"` and `initiativeId`.
7. Call `update-initiative` if status/progress should advance.
8. Save `.journal` entry including initiative ID and created TODO ID.

`create-todo` write-back shape:

```json
create-todo({
  "title": "Implemented HubSpot lead sync integration",
  "description": "Added OAuth flow, sync job, and mapping logic. Validated with integration tests.",
  "status": "Completed",
  "initiativeId": "<initiativeId>",
  "workspaceId": "<workspaceId>"
})
```

## Workflow Rule: "Connect this to initiative A / B / C"

1. Resolve each initiative via `list-initiatives`.
2. Confirm ambiguous matches.
3. Apply links using relation-capable tooling.
4. If creating a TODO, set primary `initiativeId` and add extra links with relation tooling.
5. Record all linked initiative IDs in `.journal`.

## Prompting Pattern for Changes

When reporting progress back to the user, use this structure:

1. `Target`: which task/initiative/bug is being processed
2. `Action`: what was changed
3. `Write-back`: which MCP tool was called and what was updated
4. `Links`: initiative IDs connected

Use append-only description blocks when calling `update-*` tools.

Delivery update (code shipped / fix completed / task completed):

```markdown
## Changes
- What changed: <short summary>
- Why: <root cause or goal>
```

Research or planning update (no external implementation delivered):

```markdown
## Update
- Summary: <what was researched/decided/triaged>
```

Append format:

```markdown
<existing description>

---

<new block>
```

## Failure Handling

- Missing task details: call `get-task-details` before proceeding.
- Missing label context: use `get-task-details` output (`Goals`, `Products`, `labelsByType`) before deciding initiative linkage.
- No bug match for assignee: report none found and stop.
- Multiple initiative matches: require confirmation before coding.
- Validation fails: do not mark complete; write back current status + blocker.

## Completion Gate

A run is complete only when all are true:

1. Code changes implemented, or explicitly marked blocked.
2. MCP updates written back.
3. Initiative links applied if requested.
4. `.journal` entry saved with task IDs and validation notes.

## Local Journal Contract

Default folder: `.journal`
Default file: `.journal/YYYY-MM-DD-<task-slug>.md`

Required sections:
1. User request
2. Selected task(s) and IDs
3. Why this approach
4. What changed
5. One Horizon updates (tool calls, IDs, initiative links)
