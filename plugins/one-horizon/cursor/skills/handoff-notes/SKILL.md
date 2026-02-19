---
name: handoff-notes
description: Create comprehensive handoff documentation from One Horizon work data. Use when asked to "write handoff notes", "create a handoff doc", "document my work for handoff", "I'm going on vacation", or "transition my work". Requires One Horizon MCP.
---

# Handoff Notes

Generate comprehensive handoff documentation from your One Horizon task data — for vacations, role transitions, project handovers, or temporary coverage.

## When to Use

- "Write handoff notes for my vacation"
- "Create a handoff doc before I leave"
- "Document my open work for handoff"
- "Help me transition my projects to [person]"

## Instructions

**Step 1:** Fetch your work using `my-work-recap` to get completed, planned, and blocked items.

**Step 2:** Call the `handoff-notes` MCP prompt:

```
handoff-notes({
  completedTasks: JSON.stringify(completedActivities),
  plannedTasks: JSON.stringify(plannedActivities),
  handoff_type: "vacation",        // optional
  duration: "2 weeks",             // optional
  focus_areas: "payments, auth"    // optional
})
```

## Arguments

| Argument | Type | Required | Description |
|---|---|---|---|
| `completedTasks` | string | **Yes** | JSON array of completed task objects |
| `plannedTasks` | string | **Yes** | JSON array of planned task objects |
| `handoff_type` | string | No | `"vacation"`, `"transition"`, `"project handover"`, `"temporary coverage"` |
| `duration` | string | No | e.g. `"2 weeks"`, `"permanent"` |
| `focus_areas` | string | No | Specific areas to emphasize in the handoff |

## Output Structure

1. **Current Status** — what's been completed, current state of work
2. **In Progress** — active tasks, status, and next steps
3. **Upcoming Priorities** — what needs attention and when
4. **Context & Dependencies** — important background not obvious from task titles
5. **Key Contacts** — who to reach for specific areas
6. **Access & Resources** — repositories, documentation, accounts to hand over
