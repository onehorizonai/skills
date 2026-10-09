---
name: one-create-task
description: Create a One Horizon Todo or roadmap initiative when the user asks for that exact work type and the scope is clear. Prefer one-task-management for ambiguous or multi-step operational requests. For bugs or feature requests, use one-report-issue instead. Requires One Horizon MCP.
---

# Create Task

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Create a Todo or roadmap initiative when scope and work type are clear. Use `one-task-management` for ambiguous work, `one-report-issue` for bugs or feature requests, and `one-initiative-brief` when a brief needs shaping.

## Instructions

- Use `create-initiative` for planned product work tied to roadmap goals, companies, components, or team progress. It supports title, description, status, workspace, assignees, teams, `parentInitiativeId`, and `taxonomyLabelIds`.
- Use `create-todo` for simple personal follow-up, not as a substitute for roadmap work. It supports title, description, status, topic, and workspace.
- Set `initiativeId` on a Todo representing a delivered initiative slice; this creates a `PART_OF` relation.
- For completed implementation write-back, create the Todo with `status: "Completed"`, then call `add-task-comment` with its task ID, workspace, and `source: "skill"`:

```markdown
**Changes**
- What changed: <delivered work>
- Why: <goal or root cause>
```
