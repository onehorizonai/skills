# One Horizon for Cursor and Claude Code

[One Horizon](https://onehorizon.ai) connects your task data to Cursor and Claude Code. Ask about planned tasks, ship changes, and write updates back without leaving your editor.

These skills connect the One Horizon MCP server to your agent so it can fetch and update initiatives, bugs, feature requests, and TODO tasks while you code.

---

## What you can do

**Run the full delivery loop:**

> "What do I have planned?"
> "Pick up this initiative and implement it"
> "Write this work back and link it to initiative X"
> "Save a `.journal` entry for this change"

Use `work-item-delivery-loop` to fetch context, classify task type, implement, write back to One Horizon, and save local markdown notes.

**Handle unplanned fixes quickly:**

> "I found a bug in checkout, fix and log it"
> "Fix all bugs assigned to me"

Create or update bug tasks, link to initiatives, and keep a complete execution trail.

**Inspect full task context when list output is terse:**

> "Show details for task abc123"

Use `get-task-details` to retrieve full descriptions and metadata for a specific task, including label sections like `Goals` and `Products` (`Products` may represent product names, feature areas, or service names).

**Implement an initiative from a short prompt:**

> "Implement asana"

The workflow resolves matching initiatives, confirms the target, pulls full task details, implements code, and writes back a completed linked TODO task.

**Prepare summaries and standups:**

> "Prep my standup"
> "Generate team standup summary"
> "Prepare bug triage"

---

## Skills

| Skill | What it does | Example trigger |
|---|---|---|
| `work-item-delivery-loop` | End-to-end task execution loop with write-back and `.journal` logging | "Pick this up and implement it" |
| `list-planned-work` | Show planned/in-progress tasks across initiatives, bugs, TODOs, and related sources | "What do I have planned?" |
| `list-completed-work` | Show completed tasks over a period | "What did we finish last sprint?" |
| `list-blockers` | Show blocked initiatives, bugs, TODOs, and related blockers | "What is blocking us?" |
| `my-work-recap` | Personal recap of completed/planned/blocked tasks | "Give me my recap" |
| `team-work-recap` | Team-level recap across members | "Team status update" |
| `get-task-details` | Get full details for one task (TODO, INITIATIVE, BUG) | "Show details for this task" |
| `create-todo` | Create a TODO task, optionally linked to an initiative | "Log this as a todo" |
| `update-todo` | Update an existing TODO task | "Mark this todo done" |
| `list-initiatives` | List initiatives with optional hierarchy and statuses | "Find the right initiative for this" |
| `create-initiative` | Create a new initiative task | "Create an initiative for Asana integration" |
| `update-initiative` | Update status/ownership/labels/parent for an initiative | "Move this initiative to In Progress" |
| `list-bugs` | List bug tasks with default active statuses | "Show active bugs" |
| `report-bug` | Report a bug intake task | "Log this defect" |
| `update-bug` | Update bug status, ownership, and details | "Reassign this bug to platform" |
| `report-feature-request` | Report feature-request intake task | "Track this enhancement request" |
| `update-feature-request` | Update feature-request details and state | "Update this feature request" |
| `list-taxonomy` | List taxonomy labels for initiative tagging/filtering | "Show product and component labels" |
| `list-my-teams` | List workspaces, teams, and members | "What teams am I on?" |
| `find-team-member` | Resolve person name to user/team IDs | "Find Sarah in One Horizon" |
| `work-summarizer` | Generate concise status summaries | "Write a weekly report" |
| `initiative-summary` | Generate initiative status summaries | "Summarize these initiatives" |
| `bug-triage-prep` | Generate bug triage notes | "Prepare bug triage" |
| `personal-standup-prep` | Generate personal standup talking points | "Prep my standup" |
| `team-standup-prep` | Generate team standup summary | "Standup summary for the team" |
| `handoff-notes` | Generate handoff docs from task data | "Write handoff notes for next week" |

---

## Notes on task details

List and recap tools may omit long task descriptions by default.

Use `get-task-details` when you need full context for a specific task. It now includes typed label output and structured label metadata (`labelsByType`, `goals`).

---

## How it works

All skills talk to the One Horizon MCP server at `https://mcp.onehorizon.ai/mcp`. Sign in via OAuth the first time a tool runs.

No extra setup is required. MCP config is bundled with the plugin.

---

## Installation

### Cursor

**Option 1: Install link (recommended)**

Use the install link from [onehorizon.ai/integrations/cursor](https://onehorizon.ai/integrations/cursor).

**Option 2: Marketplace**

Install from the [Cursor Marketplace](https://cursor.com/marketplace) once listed.

**Option 3: MCP only (no skills)**

Add to `~/.cursor/mcp.json` (all projects) or `.cursor/mcp.json` (current project):

```json
{
  "mcpServers": {
    "onehorizon": {
      "command": "npx",
      "args": ["mcp-remote@latest", "https://mcp.onehorizon.ai/mcp"]
    }
  }
}
```

---

### Claude Code

**Option 1: Marketplace**

Install from the Claude Code plugin marketplace once listed.

**Option 2: MCP only (no skills)**

Add to your MCP config:

```json
{
  "mcpServers": {
    "onehorizon": {
      "command": "npx",
      "args": ["mcp-remote@latest", "https://mcp.onehorizon.ai/mcp"]
    }
  }
}
```

---

### Claude Desktop / Claude.ai

1. Open **Settings -> Connectors**
2. Add a custom connector
3. Paste: `https://mcp.onehorizon.ai/mcp`
4. Authenticate via the browser window that opens

---

### ChatGPT

1. Open **Settings -> Apps -> Advanced Settings** and enable Developer Mode
2. Go to **Settings -> Apps -> Create App**
3. Set **Name** to `One Horizon`, **MCP Endpoint** to `https://mcp.onehorizon.ai/mcp`, and **Authentication** to OAuth

Note: works in regular chats, not Projects or Deep Research.

---

## Testing locally

### Claude Code

1. Open a terminal at `plugins/one-horizon/`
2. Load the plugin:

```bash
claude --plugin-dir ./claude
```

3. Trigger a skill:

```text
/one-horizon:list-planned-work
```

After editing `shared/skills/`, sync and restart Claude Code:

```bash
bash ./scripts/sync-skills.sh
```

### Validate before shipping

```bash
node ./scripts/validate.mjs
```

---

## Repository structure

```text
plugins/one-horizon/
├── README.md
├── shared/
│   └── skills/          # Source of truth — edit skills here
├── cursor/              # Cursor plugin package
│   ├── .cursor-plugin/
│   │   └── plugin.json
│   ├── .mcp.json
│   └── skills/
└── claude/              # Claude Code plugin package
    ├── .claude-plugin/
    │   └── plugin.json
    ├── .mcp.json
    └── skills/
```

Edit skills in `shared/skills/`, then run `bash ./scripts/sync-skills.sh` and `node ./scripts/validate.mjs`.
