# One Horizon for Cursor and Claude Code

[One Horizon](https://onehorizon.ai) connects your task data to Cursor and Claude Code. Ask about your work in plain English — what you shipped, what's on your plate, what's blocking your team — without opening another tab.

These skills connect the One Horizon MCP server to your agent so it can read and update your tasks alongside your code.

---

## What you can do

**Before standup:**

> "Prep my standup update for today"
> "Generate the team standup summary"

The agent pulls your completed and planned tasks from One Horizon and formats them into ready-to-paste standup notes — yours or your whole team's.

**When you need to know what's going on:**

> "What's on my plate this week?"
> "What did the platform team ship last sprint?"
> "What's blocking Sarah right now?"

Get a live view of planned work, completed work, and blockers — for yourself or any team member.

**When you ship something:**

> "Log this work — I just fixed the auth bug"
> "Mark that task as done"

Create and update tasks directly from the conversation.

**Before you go on vacation:**

> "Write handoff notes for my time off"

The agent generates a handoff doc — current status, in-progress work, upcoming priorities, key contacts — from your actual task data.

**For weekly reports or summaries:**

> "Summarize what I accomplished this week"
> "Write a work report for my manager"

Get a plain-language summary of your work, formatted for whoever's reading it.

---

## Skills

| Skill | What it does | Example trigger |
|---|---|---|
| `list-planned-work` | Show upcoming and in-progress tasks | "What's on my plate?" |
| `list-completed-work` | Show finished work by timeframe | "What did I ship last week?" |
| `list-blockers` | Surface blocked items for you or your team | "What's blocking me?" |
| `create-my-task` | Log new work | "Create a task for the auth fix I just shipped" |
| `update-my-task` | Change task status or details | "Mark that as done" |
| `my-work-recap` | Combined view of completed + planned + blockers | "Give me my work recap" |
| `team-work-recap` | Same view across the whole team | "What did the team ship this sprint?" |
| `list-my-teams` | List your workspaces, teams, and members | "What teams am I on?" |
| `find-team-member` | Look up a person by name | "Find Sarah's user ID" |
| `work-summarizer` | Plain-language work summary | "Summarize my week for my manager" |
| `personal-standup-prep` | Your personal standup update | "Prep my standup" |
| `team-standup-prep` | Full team standup summary | "Team standup summary for this morning" |
| `handoff-notes` | Handoff doc for vacation or transitions | "Write handoff notes, I'm off next week" |

---

## How it works

All skills talk to the One Horizon MCP server at `https://mcp.onehorizon.ai/mcp`. Sign in via OAuth the first time a tool runs — a browser window will open to authenticate.

No other configuration needed. The MCP connection is bundled with the plugin.

---

## Installation

### Cursor

**Option 1: Install link (recommended)**

Use the install link from [onehorizon.ai/integrations/cursor](https://onehorizon.ai/integrations/cursor).

**Option 2: Marketplace**

Install from the [Cursor Marketplace](https://cursor.com/marketplace) once listed.

**Option 3: Local (for testing)**

```bash
cursor --plugin-dir ./cursor
```

**Option 4: MCP only (no skills)**

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

**Option 2: Local (for testing)**

```bash
claude --plugin-dir ./claude
```

**Option 3: MCP only (no skills)**

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

1. Open **Settings → Connectors**
2. Add a custom connector
3. Paste: `https://mcp.onehorizon.ai/mcp`
4. Authenticate via the browser window that opens

> Connectors require an eligible Claude plan.

---

### ChatGPT

ChatGPT connects via Developer Mode rather than a plugin package.

1. Open **Settings → Apps → Advanced Settings** and toggle Developer Mode on
   - Requires a browser and ChatGPT Plus or higher
2. Go to **Settings → Apps → Create App**
3. Set **Name** to `One Horizon`, **MCP Endpoint** to `https://mcp.onehorizon.ai/mcp`, and **Authentication** to OAuth

Note: only works in regular chats, not Projects or Deep Research.

---

## Repository structure

```
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

### Keeping packages in sync

Edit skills in `shared/skills/`, then run:

```bash
bash ./scripts/sync-skills.sh
```

### Validating packages

```bash
node ./scripts/validate.mjs
```

Checks that both packages contain the same skill set and required manifests.
