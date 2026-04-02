---
name: work-item-delivery-loop
description: Run the full loop from planned work or reported bugs to shipped work and write-back in One Horizon. Use for prompts like "what do I have planned", "pick this up and implement it", "I found a problem", "fix all bugs assigned to me", "implement HubSpot lead sync", and "write this back to One Horizon". Requires One Horizon MCP.
---

# Work Item Delivery Loop

Run work execution with strict sequencing and explicit write-back.

## Operating Rules

- Always fetch before editing: list -> details -> implement -> write-back.
- Never mark work complete without validation evidence.
- If initiative matching is ambiguous, ask for confirmation.
- A run is incomplete until MCP write-back is done.
- Never modify task descriptions to record progress. Use `add-task-comment` instead.
- Always pass `"source": "skill"` when calling `add-task-comment` so comments are tagged with their origin.
- Use `Changes/Why` comments only when real delivery happened (bug fix, completed personal TODO, completed initiative work).
- For research/planning/triage-only updates, add an `Update` comment instead.
- For prompts like "implement this bug" or "work on this initiative", use every relevant One Horizon tool and companion skill before writing back.
- Always follow skill/tool rules end-to-end: context fetch, detailed task lookup, implementation, validation, write-back, and initiative linking.
- If implementation work was requested, do not post a status-only write-back; add a comment with what changed and why.
- Stop before marking work complete: every completed bug, personal TODO, or initiative must have a corresponding MCP write-back update in the same run.
- Continuous write-back: after each completed delivery chunk (not only at the end), update the related bug, personal TODO, or initiative immediately.

## Work Type Heuristic

- Multi-day planned work -> initiative
- Recurring, owner-driven work without a defined end date -> ongoing work when the workspace uses it
- Unplanned defect fix -> bug
- Small personal follow-up -> TODO

## Standard Flow

1. Identify target from user prompt.
2. Fetch candidate tasks (`list-planned-work`, `list-initiatives`, or `list-bugs`).
3. Resolve exact IDs with `get-task-details`.
4. Implement code changes.
5. Run validation/tests.
6. Write MCP updates (`update-*` or `create-todo`) and add comments via `add-task-comment`.
7. Apply initiative links when requested.

## Plan Mode Rule

If the agent is in plan mode, or the user asks for a plan, include workflow tasks from this skill in the plan explicitly.

Required plan items:
1. Discover candidate tasks with list tools.
2. Resolve selected IDs and full context with `get-task-details`.
3. Implement the code changes.
4. Validate changes with tests/checks.
5. Write back to One Horizon (`update-*` or `create-todo`) and add a comment with progress notes.
6. Apply initiative links if requested.

For "Fix all bugs assigned to me", include per-bug execution/write-back steps.
For initiative implementation prompts, include initiative matching + confirmation before coding.

## Implementation Request Rule

When a user asks to implement a bug, initiative, or personal TODO, run the full flow and do not treat it as a status-only update.

Required sequence:
1. Use discovery/list tools to find targets (`list-bugs`, `list-initiatives`, `list-planned-work`).
2. Use `get-task-details` for each selected task before implementation.
3. Use related companion skills where relevant (`bug-triage-prep`, `initiative-summary`, recap/summarizer skills) before coding or writing updates.
4. Implement and validate code changes.
5. Update task status via `update-*` or `create-todo`, then add a comment via `add-task-comment` after each completed chunk.
6. Apply requested initiative links.

If any required step is skipped, the run is incomplete.
If implementation happened, the write-back must include a `**Changes**` block with both "What changed" and "Why".

## Workflow Rule: "Fix all bugs assigned to me"

Use this exact sequence:

1. Call `list-my-teams` to resolve user/team context.
2. Call `list-bugs` filtered to current user assignee and active statuses.
3. For each bug:
   - Call `get-task-details`.
   - Implement fix.
   - Validate fix with relevant tests/checks.
   - Call `update-bug` with latest status, then `add-task-comment` with fix notes.
4. If a bug is not fixed, still call `update-bug` with status and `add-task-comment` with blocker details.

Required `add-task-comment` content after `update-bug`:
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
6. Create implementation record with `create-todo` using `status: "Completed"` and `initiativeId` as soon as implementation is done.
7. Call `update-initiative` if status/progress should advance.

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
4. If creating a personal TODO, set primary `initiativeId` and add extra links with relation tooling.

## Prompting Pattern for Changes

When reporting progress back to the user, use this structure:

1. `Target`: which task is being processed
2. `Action`: what was changed
3. `Write-back`: which MCP tool was called and what was updated
4. `Links`: initiative IDs connected

Use `add-task-comment` for all progress notes. Never modify task descriptions.

Delivery comment (code shipped / fix completed / task completed):

```markdown
**Changes**
- What changed: <short summary>
- Why: <root cause or goal>
```

Research or planning comment (no external implementation delivered):

```markdown
## Update
- Summary: <what was researched/decided/triaged>
```

## Failure Handling

- Missing work details: call `get-task-details` before proceeding.
- Missing label context: use `get-task-details` output (`Goals`, `Products`, `labelsByType`) before deciding initiative linkage.
- No bug match for assignee: report none found and stop.
- Multiple initiative matches: require confirmation before coding.
- Validation fails: do not mark complete; write back current status + blocker.

## Stop Before Complete Check

Before declaring completion to the user, verify all completed tasks were updated in One Horizon:

1. Completed bug -> `update-bug` called with final status + `add-task-comment` with `**Changes**`.
2. Completed personal TODO -> `update-todo` called with final status + `add-task-comment` with `**Changes**`, or `create-todo` created as `Completed` + comment.
3. Completed initiative work -> `update-initiative` called with status + `add-task-comment` with progress notes.

If any completed item is missing write-back, stop and perform the update first.

## Completion Gate

A run is complete only when all are true:

1. Code changes implemented, or explicitly marked blocked.
2. MCP updates written back for every completed bug, personal TODO, or initiative.
3. Initiative links applied if requested.
