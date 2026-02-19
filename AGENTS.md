# AGENTS.md

Guidance for AI coding agents working in this repository.

## Repository overview

Each plugin in `plugins/` bundles skills, MCP config, and agent instructions for Cursor and Claude Code.

## Repository structure

```
plugins/
  {plugin-name}/
    README.md                        # Plugin documentation
    shared/skills/                   # Source of truth — edit skills here
      {skill-name}/
        SKILL.md
    cursor/                          # Cursor plugin package
      .cursor-plugin/plugin.json     # Cursor manifest
      .mcp.json                      # MCP server config
      skills/                        # Synced from shared/
    claude/                          # Claude Code plugin package
      .claude-plugin/plugin.json     # Claude Code manifest
      .mcp.json                      # MCP server config
      skills/                        # Synced from shared/
    scripts/
      sync-skills.sh                 # Syncs shared/ into cursor/ and claude/
      validate.mjs                   # Validates both packages are in sync
```

## Working with skills

Skills live in `shared/skills/{skill-name}/SKILL.md`. Each `SKILL.md` has frontmatter and instructions for the agent.

### SKILL.md format

```markdown
---
name: {skill-name}          # Matches the folder name — no plugin prefix
description: {One sentence. Include trigger phrases like "prep my standup", "list blockers".}
---

# Skill title

What this skill does and when to use it.

## Instructions

Step-by-step instructions for the agent to follow when this skill is invoked.
```

### Rules

- `name` must match the folder name exactly — no plugin namespace prefix
- The slash command (`/{plugin-name}:{skill-name}`) is formed automatically from the folder name + manifest `name`
- Keep SKILL.md short: the full file loads into context on every invocation
- `description` determines when the agent picks up the skill — write it with trigger phrases

### Syncing to platform packages

After editing anything in `shared/skills/`:

```bash
bash ./scripts/sync-skills.sh
```

This copies skills into both `cursor/skills/` and `claude/skills/`. Don't edit the platform packages directly — changes will be overwritten on the next sync.

### Validating packages

```bash
node ./scripts/validate.mjs
```

Checks that both packages have the same skills and required manifests.

## Adding a new plugin

1. Create `plugins/{plugin-name}/` with the structure above
2. Add `shared/skills/{skill-name}/SKILL.md` for each skill
3. Create `cursor/.cursor-plugin/plugin.json` and `claude/.claude-plugin/plugin.json` manifests
4. Add `.mcp.json` to both platform directories if the plugin uses an MCP server
5. Run `bash ./scripts/sync-skills.sh` to populate the platform packages
6. Run `node ./scripts/validate.mjs` to confirm everything is in sync
7. Add the plugin to the table in the root `README.md`

## Plugin manifest fields

```json
{
  "name": "plugin-name",
  "description": "One sentence shown in the plugin manager.",
  "version": "1.0.0",
  "author": { "name": "Author Name" },
  "homepage": "https://example.com",
  "repository": "https://github.com/org/repo",
  "license": "MIT"
}
```

The `name` field sets the skill namespace. A skill in folder `my-skill` inside a plugin named `my-plugin` becomes `/my-plugin:my-skill`.
