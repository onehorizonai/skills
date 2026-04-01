# One Horizon for Cursor, Claude Code, and Codex

[One Horizon](https://onehorizon.ai) lets your coding agent read planned work, bugs, write-backs, and standup or retrospective context without leaving the editor.

These skills connect the One Horizon MCP server to your agent so it can fetch and update initiatives, bugs, feature requests, and TODO tasks while you code.

---

## What you can do

**Run the full delivery loop:**

> "What do I have planned?"
> "Pick up this initiative and implement it"
> "Write this work back and link it to initiative X"

Use `work-item-delivery-loop` to fetch context, classify task type, implement, write back to One Horizon, and save local markdown notes.

**Handle unplanned fixes quickly:**

> "I found a bug in checkout, fix and log it"
> "Fix all bugs assigned to me"

Create or update bug tasks, link to initiatives, and keep a complete execution trail.

**Inspect full task context when list output is terse:**

> "Show details for task abc123"

Use `get-task-details` to retrieve full descriptions and metadata for a specific task, including label sections like `Goals` and `Products` (`Products` may represent product names, feature areas, or service names).

**Implement an initiative from a short prompt:**

> "Implement HubSpot lead sync"

The workflow resolves matching initiatives, confirms the target, pulls full task details, implements code, and writes back a completed linked TODO task.

**Prepare summaries, retros, and standups:**

> "Prep my standup"
> "Generate team standup summary"
> "Run a weekly engineering retrospective"
> "Prepare bug triage"

---

## Skills

| Skill | What it does | Example trigger |
|---|---|---|
| `work-item-delivery-loop` | End-to-end task execution loop with write-back and `.journal` logging | "Pick this up and implement it" |
| `list-work` | Show planned, completed, blocked, initiative, or bug tasks | "What do I have planned?" / "Show active bugs" |
| `get-task-details` | Get full details for one task (TODO, INITIATIVE, BUG) | "Show details for this task" |
| `create-task` | Create a TODO or initiative, optionally linked to a parent | "Log this as a todo" / "Create an initiative" |
| `update-task` | Update any task type, add comments, or react to comments | "Mark this done" / "Add a comment on that task" |
| `report-issue` | Report a bug or feature request | "I found a bug" / "Log this feature request" |
| `find-team` | List teams/members and resolve IDs | "What teams am I on?" / "Find Sarah" |
| `list-taxonomy` | List taxonomy labels for initiative tagging/filtering | "Show product and component labels" |
| `work-recap` | Personal or team recap of completed/planned/blocked tasks | "Give me my recap" / "Team status" |
| `retro` | Weekly engineering retrospective with trend tracking and team breakdowns | "Weekly retro" / "What did we ship?" |
| `standup-prep` | Generate personal or team standup talking points | "Prep my standup" / "Team standup summary" |
| `work-summarizer` | Generate concise status summaries | "Write a weekly report" |
| `initiative-summary` | Generate initiative status summaries | "Summarize these initiatives" |
| `bug-triage-prep` | Generate bug triage notes | "Prepare bug triage" |
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

### MCP server config (manual)

Use this config if you want to connect the One Horizon MCP server directly:

```json
{
  "mcpServers": {
    "onehorizon": {
      "command": "npx",
      "args": [
        "mcp-remote@latest",
        "https://mcp.onehorizon.ai/mcp"
      ]
    }
  }
}
```

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

### Codex

Use [`plugins/one-horizon/codex`](/Users/gijs/Sites/skills/plugins/one-horizon/codex) as the Codex plugin root. It contains the Codex manifest at [`plugins/one-horizon/codex/.codex-plugin/plugin.json`](/Users/gijs/Sites/skills/plugins/one-horizon/codex/.codex-plugin/plugin.json), the MCP config at [`plugins/one-horizon/codex/.mcp.json`](/Users/gijs/Sites/skills/plugins/one-horizon/codex/.mcp.json), and a synced copy of the shared skills.

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
/one-horizon:list-work
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
├── claude/              # Claude Code plugin package
│   ├── .claude-plugin/
│   │   └── plugin.json
│   ├── .mcp.json
│   └── skills/
└── codex/               # Codex plugin package
    ├── .codex-plugin/
    │   └── plugin.json
    ├── .mcp.json
    └── skills/
```

Edit skills in `shared/skills/`, then run `bash ./scripts/sync-skills.sh` and `node ./scripts/validate.mjs`.
