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

## Use when

- The user is shaping roadmap-first planned work.
- The initiative is still fuzzy and needs better problem, outcome, scope, risk, or rollout clarity.
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

- Apply taxonomy labels when they are clearly present in the discussion and improve routing or reporting.
- Prefer product labels first when the initiative obviously belongs to a product or product area.
- Also apply other relevant taxonomy such as goals, releases, components, and company/customer labels when the workspace supports them and the match is clear.
- If this initiative clearly belongs under an existing roadmap effort, set `parentInitiativeId`.
- Do not guess taxonomy or parentage from weak signals. Resolve them first.

## Conversation rules

- Ask one question at a time and stop after each question.
- Reuse what the user already said. Skip answered questions.
- If the user says "just do it", shows impatience, or already has a fully formed plan, fast-track the discovery questions. Still do premise challenge, alternatives, and the brief.
- If the conversation shifts from builder mode to company mode because the user mentions customers, revenue, fundraising, or go-to-market pressure, raise the bar and ask harder evidence-driven questions.
- During the diagnostic phases, take a position. Do not hedge with filler like "that could work" or "you might want to consider".
- End with concrete build direction, not generic validation homework.

## Output guidance

- The final deliverable is a markdown initiative brief.
- Use plain prose for narrative sections.
- Use tables when comparing approaches, tradeoffs, owners, phases, or success metrics.
- Use Mermaid diagrams when a flow, system relationship, rollout sequence, or decision path is easier to understand visually than in prose.
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
3. Ask this first: `What's your goal with this?`
4. Assess product stage explicitly:
   - pre-product
   - has users
   - has paying customers
5. Ask only the missing generative questions, one at a time:
   - What's the coolest version of this?
   - Who would you show this to?
   - What's the fastest path to something you can actually use or share?
   - What existing thing is closest to this, and how is yours different?
   - What would you add if you had unlimited time?

## Phase 2: Related initiative discovery

1. After the user states the problem, extract 3-5 meaningful keywords.
2. Search existing initiatives with `search-tasks` using `categories: ["initiative"]`.
3. For relevant hits, call `get-task-details`.
4. If strong overlap exists, surface it:
   - `FYI: Related initiative found — "{title}". Key overlap: {one-line relevance}.`
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
- What existing patterns, code, workflows, or tools already partially solve this?
- If the initiative likely produces a new artifact, how will users actually get it? Include distribution or explicitly defer it.
- If the product stage includes users or paying customers, does the evidence support this direction?

Present premises like this and get agreement before moving on:

```text
PREMISES:
1. <statement> — agree/disagree?
2. <statement> — agree/disagree?
3. <statement> — agree/disagree?
```

If the user disagrees, revise the understanding and loop before continuing.

## Phase 5: Alternatives generation

Produce at least 2 approaches, 3 when the design is non-trivial.

Required shape:

```text
APPROACH A: <name>
Summary: <1-2 sentences>
Effort: <S/M/L/XL>
Risk: <Low/Med/High>
Pros:
- ...
- ...
Cons:
- ...
- ...
Reuses:
- ...

APPROACH B: <name>
...
```

Rules:
- One approach must be the minimal viable path.
- One approach must be the ideal long-term architecture.
- One approach can be creative or lateral if it is genuinely different.
- A comparison table is preferred when it helps the user evaluate the approaches quickly.

## Phase 6: Write the initiative brief

Keep one canonical markdown brief updated as the session progresses.

Add supporting structure when useful:
- A comparison table for alternatives, scope boundaries, rollout phases, or success metrics
- A Mermaid diagram for workflow, system flow, rollout sequence, or ownership handoff

```markdown
# Initiative Brief

## Initiative
- What is the initiative called?
- In one sentence, what are we doing?
- Who owns the outcome?

## Why this matters
- What problem or opportunity does this address?
- Why is this worth doing now?
- What happens if we do nothing?

## Intended outcome
- What business outcome do we want?
- What user or customer outcome do we want?
- What should be true when this succeeds?

## Scope
- What are we committing to in this phase?
- What is explicitly not included?

## Who it affects
- Who is this primarily for?
- Which teams or functions does it touch?

## Success
- How will we know this worked?
- What metrics or signals should move?

## Assumptions, risks, and open questions
- What are we assuming?
- What could block or weaken this?
- What still needs a decision?

## Rollout / handoff
- Is this a pilot, first release, or full rollout?
- Who needs to be informed or enabled?
- Who owns it after launch?
```

## Create step

After the user reviews and approves the brief:

1. Resolve owner, team, taxonomy, and parent initiative metadata if needed.
2. Use `find-team` for owner/team resolution.
3. Use `list-taxonomy` to resolve product and other relevant taxonomy labels before creation.
4. If the new initiative belongs under an existing initiative, resolve and set `parentInitiativeId`.
5. Create the initiative with the brief markdown as the description.

```json
create-initiative({
  "title": "<initiative name>",
  "description": "<full initiative brief in markdown>",
  "status": "Open",
  "workspaceId": "<workspaceId>",
  "assigneeIds": ["<userId>"],
  "teamIds": ["<teamId>"],
  "parentInitiativeId": "<parentInitiativeId>",
  "taxonomyLabelIds": ["<labelId>"]
})
```
