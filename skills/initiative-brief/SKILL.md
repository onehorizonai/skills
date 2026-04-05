---
name: initiative-brief
description: Guide writing a structured initiative brief for roadmap-first planned work in One Horizon. Use when asked to "write an initiative", "draft an initiative brief", "plan this initiative", "turn this idea into an initiative", or "help me scope this roadmap work". This skill produces a design doc, not code. Requires One Horizon MCP.
---

# Initiative Brief

Turn a rough roadmap idea into a sharp initiative brief, then create the initiative in One Horizon.

## Core rule

- Understand the problem before proposing solutions.
- Produce a design doc, not code.
- Write the brief in markdown. Use tables and Mermaid diagrams when they make the design clearer.
- When editing an existing initiative description, use `patch-document` with the initiative `taskId`; the server will resolve or create the linked content document automatically. Use `update-initiative` only for metadata.
- Stay focused on what the initiative should do from a product perspective, not how a developer should implement it.
- Default to feature-level scoping unless the user clearly describes a broader product or company initiative.
- Treat business goals as supporting context, not the backbone of the brief.

## Use when

- The user is shaping roadmap-first planned work.
- The initiative is still fuzzy and needs better background, user story, scope, non-goals, risk, or rollout clarity.
- The user needs a brief others can review, align on, and execute from.

## Do not use when

- The user already has a complete initiative brief and just wants the record created.
- The request is really a bug, ongoing work, or a small personal task.
- The user wants an initiative status update rather than a new brief.

## Relationship to other skills

- Use `initiative-brief` to diagnose, shape, and draft new roadmap work.
- Use `create-task` only when the initiative is already clear enough to create directly.
- Use `task-management` for operational task lookup, assignment, tagging, or direct creation outside this drafting flow.
- Use `initiative-summary` for reporting on existing initiatives, not writing new ones.

## Initiative metadata rules

- Pull taxonomy before creation when product, customer, company, release, goal, or component signals are present.
- Apply taxonomy labels when they are clearly present in the discussion and improve routing or reporting.
- Prefer product labels first when the initiative obviously belongs to a product or product area.
- Also apply other relevant taxonomy such as goals, releases, components, and company/customer labels when the workspace supports them and the match is clear.
- Use `list-taxonomy` only after the core scope is stable enough to know what should be tagged.
- Attach labels only for exact or high-confidence matches.
- If multiple labels are plausible for the same concept, ask a disambiguation question instead of guessing.
- If this initiative clearly belongs under an existing roadmap effort, set `parentInitiativeId`.
- Do not guess taxonomy or parentage from weak signals. Resolve them first.
- Keep owner and parent linkage in structured initiative metadata. Do not add `Owner:` or `Related initiative:` lines to the markdown brief unless the user explicitly wants them in the document.
- If related initiatives, bugs, or other work items are mentioned in the brief or surfaced during discovery, reference them as URLs or markdown links, not plain text labels.

## Conversation rules

- Ask one question at a time and stop after each question.
- Reuse what the user already said. Skip answered questions.
- If the user says "just do it", shows impatience, or already has a fully formed plan, fast-track the discovery questions. Still do premise challenge, alternatives, and the brief.
- If the conversation shifts from builder mode to company mode because the user mentions customers, revenue, fundraising, or go-to-market pressure, raise the bar and ask harder evidence-driven questions.
- During the diagnostic phases, take a position. Do not hedge with filler like "that could work" or "you might want to consider".
- Do not drift into recommended implementation direction, engineering tasks, or effort estimates.

## Execution order

Follow this sequence to keep the interaction predictable:

1. Confirm this is initiative-shaped work, not a bug, feature request, or personal task.
2. Gather only the missing minimum context:
   - user or workflow
   - short background
   - in scope
   - out of scope
   - smallest useful version
3. Check for related initiatives and possible parent linkage.
4. Resolve taxonomy only after the scope is stable.
5. Draft the brief.
6. Resolve any final metadata gaps.
7. Create the initiative after approval.

## Minimum viable brief threshold

Stop asking discovery questions and draft the brief once you know:

- which user or workflow this is for
- what changes in this phase
- what is in scope
- what is out of scope
- which product this belongs to, if that context exists

Do not keep probing for strategy context once those fields are clear. Put remaining uncertainty in `### Open questions`.

## Output guidance

- The final deliverable is a markdown initiative brief.
- Use plain prose for narrative sections.
- Do not use an H1 in the generated brief.
- Start with a single-paragraph TLDR before any section headings.
- Prefer `###` for major sections and `####` for sub-sections.
- Avoid heavy heading nesting and avoid overusing `##`.
- Use tables when comparing product tradeoffs, owners, phases, or success metrics.
- Use Mermaid diagrams when a flow, system relationship, rollout sequence, or decision path is easier to understand visually than in prose.
- When referencing related initiatives, bugs, or other work items, use a URL or markdown link.
- Do not force tables or diagrams into every brief. Use them only when they improve clarity.
- If Mermaid is used, keep the syntax simple and readable.

## Response posture

- Be an enthusiastic, opinionated collaborator.
- Help the user find the most exciting version of the idea, not the safest phrasing.
- Suggest adjacent or unexpected ideas when they improve the brief.
- Use these operating principles:
  - Delight is the currency.
  - Ship something you can show people.
  - The best side projects solve your own problem.
  - Explore before you optimize.

## Phase 1: Context gathering

1. Load currently planned initiatives with `list-initiatives` using active statuses.
2. Load recently completed work for the relevant team or workspace with `list-completed-work`.
3. Ask this first: `What user story or workflow are we trying to improve?`
4. Assess product stage explicitly:
   - pre-product
   - has users
   - has paying customers
5. Ask for a short background only when it is still unclear:
   - Why does this matter right now?
   - What is happening today that is not good enough?
6. Ask only the missing scoping questions, one at a time:
   - Who is this for in this phase?
   - What should they be able to do after this ships?
   - What is definitely in scope for this phase?
   - What is explicitly out of scope?
   - What is the smallest version that is still useful?
   - Is there a business reason or goal we should capture in one short note?
7. If the product area or customer/account context is implied but not explicit, ask only the missing taxonomy questions:
   - Which product or product area is this for?
   - Is this tied to a specific customer, company, or segment we should tag?

## Phase 2: Related initiative discovery

1. After the user states the problem, extract 3-5 meaningful keywords.
2. Search existing initiatives with `search-tasks` using `categories: ["initiative"]`.
3. For relevant hits, call `get-task-details`.
4. If strong overlap exists, surface it:
   - `FYI: Related initiative found — [{title}](<url>). Key overlap: {one-line relevance}.`
5. Ask whether to build on the prior design or start fresh.
6. If no relevant match exists, proceed silently.
7. If one initiative is clearly the parent roadmap effort, propose linking the new initiative under it.

## Phase 3: Landscape awareness

- Before any external search, ask for consent because generalized category terms may be sent to a search provider.
- Use generalized search terms only. Do not search for the user's proprietary name or stealth framing.
- If search is unavailable or the user declines, skip this phase and continue with in-distribution knowledge only.
- Read 2-3 useful results and synthesize:
  - Layer 1: what everyone already knows about this space
  - Layer 2: what current search results and discourse are saying
  - Layer 3: based on this conversation, whether the conventional approach is wrong here
- If a real insight appears, name it clearly:
  - `EUREKA: Everyone does X because they assume Y. But here that assumption looks wrong because Z. This means ...`
- If no strong break from conventional wisdom exists, say so and build on the standard approach.

## Phase 4: Premise challenge

Before proposing solutions, force agreement on the key premises.

Check:
- Is this the right problem?
- What happens if we do nothing?
- What existing workflows, habits, or product patterns already partially solve this today?
- Is the user story clear enough to scope this as a feature or phase rather than a full product?
- Are the in-scope and out-of-scope boundaries crisp enough to avoid ambiguity?
- What should stay true for the user if this initiative succeeds?
- If the product stage includes users or paying customers, does the evidence support this direction?

Present premises like this and get agreement before moving on:

```text
PREMISES:
1. <statement> — agree/disagree?
2. <statement> — agree/disagree?
3. <statement> — agree/disagree?
```

If the user disagrees, revise the understanding and loop before continuing.

## Phase 5: Write the initiative brief

Keep one canonical markdown brief updated as the session progresses.

Add supporting structure when useful:
- A comparison table for product tradeoffs, scope boundaries, rollout phases, or success metrics
- A Mermaid diagram for workflow, system flow, rollout sequence, or ownership handoff

```markdown
Short TLDR paragraph:
In 2-4 sentences, summarize what this initiative is, which user or workflow it improves, what this phase includes, and the main boundary or constraint. Write this like a fast orientation for a reviewer.

### Background
- In one short paragraph: what is changing, why now, and what happens if we do nothing?
- If there is a business reason, keep it brief and secondary.

### Feature / use case sections
- Break the initiative into concrete feature or use case sections when that makes the scope clearer.
- Use descriptive section titles such as `### Add Login with Google` or `### Migrate admin-only login flow`.
- Under each section, write a short paragraph covering who it is for, what changes, and why it matters to that workflow.
- If helpful, include a brief user-story sentence in the paragraph, but do not use a literal `### User story` heading.

### In scope
- What are we committing to in this phase?
- Which behaviors, surfaces, or flows are included?
- What constraints matter for this phase?

### Out of scope
- What is explicitly not included?
- What related ideas should not get pulled into this initiative?

### Success
- How will we know this worked?
- What user signals, adoption signals, or qualitative outcomes should improve?
- Only include business metrics if they are clearly relevant.

### Assumptions, risks, and open questions
- What are we assuming?
- What could block or weaken this?
- What still needs a decision?

### Rollout / handoff
- Is this a pilot, first release, or full rollout?
- Who needs to be informed or enabled?
- Who owns it after launch?
```

## Create step

After the user reviews and approves the brief:

1. Resolve owner, team, taxonomy, and parent initiative metadata if needed.
2. Use `find-team` for owner/team resolution.
3. Use `list-taxonomy` to resolve product labels first, then attach matching customer/company and other relevant taxonomy labels when the match is clear.
4. If the new initiative belongs under an existing initiative, resolve and set `parentInitiativeId`.
5. Keep the brief body focused on background, feature or use case scope, boundaries, risks, and rollout.
6. Before creation, confirm the minimum create fields are ready:
   - title
   - markdown brief
   - workspace
   - any clear owner/team metadata
   - any clear taxonomy labels
7. Create the initiative with the brief markdown as the description.

```json
create-initiative({
  "title": "<initiative name>",
  "description": "<full initiative brief in markdown>",
  "status": "Open",
  "workspaceId": "<workspaceId>",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"],
  "parentInitiativeId": "<parentInitiativeId>",
  "taxonomyLabelIds": ["<productLabelId>", "<customerOrCompanyLabelId>"]
})
```

If the user later asks to revise the initiative description after creation:

- Use `patch-document` with `workspaceId`, `taskId`, and precise `ops`.
- Prefer `replace_text`, `insert_before`, `insert_after`, or `delete_text` over rewriting the entire description.
- Use `update-initiative` only for metadata.
