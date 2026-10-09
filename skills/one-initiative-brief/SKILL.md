---
name: one-initiative-brief
description: Draft a structured initiative brief for roadmap-first planned work in One Horizon. Use for "write an initiative", "draft an initiative brief", "plan this initiative", or "scope this roadmap work". Requires One Horizon MCP.
---

# Initiative Brief

Use as few output tokens as possible while completing the task correctly. Write in plain English. Apply this to documents, progress messages, and final replies.

Shape a roadmap idea into a product brief, then create it or finalize an existing draft. Use `one-create-task` for ready-to-create briefs, `one-task-management` for operations, and `one-initiative-summary` for status reporting. Bugs, feature requests, ongoing work, and Todos belong elsewhere.

## Rules

- Understand the problem before solutions. Produce a product design document, not code, engineering tasks, or estimates. Default to feature-level scope; business goals are supporting context.
- Set a stable mode: a known initiative/task ID or draft means **existing initiative draft** (update); otherwise **new initiative** (create). Closing questions must match; never offer creation for an existing draft.
- Preserve canonical media exactly: `![alt](url)`, `[video](url#one-video=1)`, `[youtube](url#one-youtube=1)`, `[figma](url#one-figma=1)`, unless the user requests changes.
- Ask one question at a time, reuse answers, and take a position without filler hedging. Continue until shared understanding; even "just do it" or a formed plan still requires missing discovery and premise challenge. For company/GTM/customer/revenue work, ask harder evidence-based questions.

## Discovery and context

1. Fetch active `list-initiatives` and relevant `list-completed-work` for the team/workspace.
2. Establish what to build, for whom, fixed constraints, and existing ideas. Clarify workflow/JTBD, intended accomplishment, problem, solution direction (partial/TBD allowed), this phase's in/out scope, smallest useful version, observable success, and known product.
3. Ask why now/current shortcomings only if unclear. Ask product stage (pre-product/users/paying customers) only when adoption changes scope, evidence, or rollout; skip for internal or website content.
4. For interfaces/screens/flows, cover primary user/JTBD, interface success, devices/accessibility/performance/brand constraints, and real versus placeholder content. Each must be answered or explicitly deferred before drafting. For non-interface work, note "N/A — no user-facing interface" in the brief.
5. Search related work using 3-5 problem keywords and `search-tasks` with `categories: ["initiative"]`; fetch hit details with `get-task-details`. For strong overlap, link the initiative, explain overlap briefly, and ask whether to build on it or start fresh. Proceed silently if none; propose a clear parent.
6. Optional landscape: ask consent before external search, using generalized rather than proprietary/stealth terms. Skip if unavailable/declined; read 2-3 results, compare standard approaches, and state useful insights plainly.
7. Challenge and agree premises before drafting: right problem/cost of inaction; existing partial solutions; feature/phase scope; crisp boundaries; invariants; supporting evidence where users/paying customers exist. Present concise statements to agree/disagree; revise disagreements and repeat.
8. Resolve taxonomy after scope stabilizes, before creation when product/customer/company/goal/component signals exist. Prefer product labels; attach other labels only on confident matches. Ask about plausible alternatives. Resolve missing product/customer/segment context as needed.

## Brief

Keep one canonical markdown draft. No H1; brief TLDR first, `###` major sections, `####` subsections. Use tables for tradeoffs/owners/phases and Mermaid for flows/rollout only when useful. Link related work; store owner/parent in metadata, not body `Owner:` lines unless asked.

Preserve this content in compact sections:

- Problem: affected user, missing/broken behavior, why now
- Solution: direction for this phase; decided versus open
- Background: change, timing, cost of inaction; brief business reason
- Design (interfaces only): user/JTBD, success, constraints, real/placeholder content; omit if N/A
- Concrete feature/use-case headings (not "User story"): who, what changes, why; name user-facing surfaces/screens/entry points
- In scope: phase behavior, surfaces, flows, constraints
- Out of scope: each exclusion with a reason
- Acceptance criteria: observable, user-verifiable behavior, not metrics; one end-to-end verification step
- Invariants, when contracts/behavior must remain true
- Assumptions, risks, and open questions: blockers/decisions/uncertainty
- Rollout / handoff: pilot/first release/full rollout, contacts, post-launch owner

Draft only after discovery and premise agreement. Required context: user/workflow/JTBD, problem/direction, phase boundaries, observable success, and product if known. Put unresolved uncertainty in `### Open questions`.

## Finalize

After approval, resolve owner/team via `one-find-team`, taxonomy via `list-taxonomy`, and parent.

- New: confirm title, brief, workspace, owner/team, taxonomy, then `create-initiative` with markdown `description`, `status: "Open"`, `assigneeIds`, `teamIds`, optional `parentInitiativeId`/`taxonomyLabelIds`.
- Existing: `patch-document` with workspace, initiative `taskId`, and precise `ops` (`replace_text`, `insert_before`, `insert_after`, `delete_text`) for the description; `update-initiative` for metadata only. Use the same split for post-creation revisions.

Keep the brief body to product background, scope, boundaries, risks, and rollout rather than metadata.
