---
name: one-release-notes
description: Draft release notes for external customers, internal teams, or stakeholders. Use when asked to "write release notes", "draft changelog", "prepare what's new", "summarize this release", or "announce this version". Defaults to external customer-facing copy that excludes internal jargon. Optionally pulls shipped work from One Horizon. Requires One Horizon MCP when sourcing content from workspace data.
---

# Release Notes

Turn shipped work, a version bump, or a rough change list into clear release notes tailored to the audience.

## Core rule

- Lead with what changed for the reader, not how the team built it.
- Default audience is `external`: write for customers who do not know your stack, sprint names, or internal systems.
- Strip internal-only work from external notes unless it has a direct customer effect.
- Translate engineering changes into user-visible outcomes before drafting.
- One release note should read like one coherent announcement, not a dump of tickets
- Do not publish laundry lists of platforms, pages, browsers, or variants when one consolidated bullet will do

## Audience modes

| Mode | Reader | Tone | Include | Exclude |
|---|---|---|---|---|
| `external` (default) | Customers and end users | Clear, helpful, benefit-led | User-visible features, fixes, UX improvements, deprecations customers must act on | Refactors, migrations, infra, test work, internal tooling, ticket IDs, team jargon |
| `internal` | Engineering and product teammates | Direct, specific, searchable | Features, fixes, migrations, breaking changes, rollout notes, follow-ups, known issues | Marketing fluff, vague benefit language |
| `stakeholders` | Leadership, investors, partners | Outcome-focused, concise | Business impact, adoption signals, major launches, risk, rollout status | Low-level implementation detail, noisy bug lists |

If the user does not specify an audience, use `external`.

## Use when

- The user wants release notes, a changelog entry, or a "what's new" announcement.
- A version is shipping and the notes need audience-appropriate framing.
- Shipped work exists in One Horizon and should be turned into customer-facing copy.

## Do not use when

- The user wants a status update on in-flight work rather than a release announcement.
- The request is really an initiative brief, bug report, or handoff doc.
- The user only wants a raw list of completed tasks with no editorial pass.

## Relationship to other skills

- Use `one-release-notes` to draft audience-specific release copy.
- Use `one-list-work` or `one-work-recap` when the user only wants a work summary, not polished release notes.
- Use `one-initiative-brief` for roadmap planning, not release communication.
- Use `one-manage-documents` to save the final release notes as a standalone One Horizon document when requested.

## Conversation rules

- Ask one question at a time and stop after each answer.
- Reuse what the user already said. Skip answered questions.
- If the user says "just write it" or provides a complete change list, fast-track discovery and draft immediately.
- Challenge weak items before including them: if a change is not meaningful to the chosen audience, leave it out or ask whether to reframe it.
- Prefer plain language over clever marketing copy unless the user asks for a more promotional tone.

## Execution order

Follow this sequence to keep the interaction predictable:

1. Confirm this is a release-notes request, not a status recap or planning doc.
2. Set audience (`external` unless the user says otherwise).
3. Gather release metadata and source material.
4. Classify items: include, reframe, or exclude for the chosen audience.
5. Draft the release notes
6. Run a humanizer pass: remove AI patterns, collapse laundry lists, and ensure bullets have no trailing periods
7. Offer optional follow-ups: shorter version, email subject line, social post, or save to One Horizon

## Minimum viable draft threshold

Stop asking discovery questions and draft once you know:

- the product or surface being released
- the version or release name, if there is one
- the audience (`external`, `internal`, or `stakeholders`)
- at least three meaningful changes, or the user's explicit instruction to draft from what is available
- the release date or timeframe, if the user cares about timing language

Put remaining uncertainty in `### Open questions`.

## Output guidance

- The final deliverable is markdown release notes
- Do not use an H1 in the generated notes
- Start with a short intro paragraph that orients the reader
- Group related changes under clear `###` headings
- Use bullets for individual changes
- **Do not end bullets with periods** — this is mandatory for every list item in the release notes
- Lead each bullet with the outcome, then add brief supporting detail if needed
- For `external` notes, write from the user's perspective: "You can now ..." or "Fixed an issue where ..."
- For breaking changes or required actions, call them out explicitly near the top
- Do not include internal ticket IDs, PR numbers, or engineer names unless the audience is `internal` and the user asked for traceability
- If Mermaid or tables help compare before/after behavior, use them sparingly

### No laundry lists

Do not turn the same change into multiple bullets just because it touched several platforms, screens, browsers, locales, or variants.

**Consolidate parallel items into one readable bullet**
- If the same improvement applies across mobile, iPad, desktop, and wearable, write one bullet: `Checkout now loads faster across mobile and desktop`
- If the same fix applies to Chrome, Safari, and Firefox, write one bullet: `Fixed a login issue affecting major browsers`
- If the same UI tweak landed on five settings pages, name the area once: `Updated spacing and labels across account settings`

**Do not enumerate every surface unless the difference matters**
- Bad: separate bullets for iPhone, iPad, Mac, and Apple Watch
- Good: one bullet that captures the shared user-visible outcome
- Only split into multiple bullets when the behavior, rollout, or required action actually differs by surface

**Do not mirror source tickets one-to-one**
- Merge related fixes, polish items, and copy tweaks into grouped bullets
- A release note is curated communication, not a completed-work export

**Do not stack comma-separated inventories**
- Bad: `Improved search on Home, Projects, Tasks, Reports, and Settings`
- Good: `Improved search results across the main workspace views`

Before finalizing, scan for repeated structure like "Updated X for ...", "Fixed Y on ...", "Improved Z in ..." and collapse them where the reader outcome is the same.

### Writing rules

Apply these on every draft. Release notes should read like a clear human wrote them, not like generated marketing copy.

**Sound like a person**
- Write plainly. Say what changed and why it matters to the reader.
- Vary sentence length. Mix short bullets with a natural intro paragraph.
- Be specific. Name the screen, action, or problem fixed instead of vague claims.
- Use simple verbs: `is`, `are`, `has`, `can`, `fixed`, `added`. Do not dress up facts with inflated phrasing.

**Do not write like AI**
- Avoid AI-heavy words: `additionally`, `crucial`, `delve`, `enhance`, `fostering`, `highlight`, `landscape`, `pivotal`, `showcase`, `testament`, `underscore`, `vibrant`, `seamless`, `powerful`, `groundbreaking`.
- Do not puff up importance. Skip lines like "this release marks a pivotal step" or "reflects our commitment to innovation."
- Do not use promotional filler: `nestled`, `rich`, `profound`, `must-try`, `game-changing`, `revolutionary`.
- Do not add fake depth with trailing `-ing` phrases: `highlighting...`, `ensuring...`, `reflecting...`, `contributing to...`.
- Do not use negative parallelisms: "It's not just X, it's Y."
- Do not force rule-of-three adjective stacks: `fast, intuitive, and powerful`.
- Do not cycle synonyms to avoid repetition. Repeat the product or feature name if that is clearer.
- Do not use vague authority: `industry experts`, `observers note`, `many users say` unless you have a real source.
- Do not end with generic optimism: `exciting times ahead`, `the future looks bright`, `a major step forward`.

**Formatting habits to avoid**
- No emojis in headings or bullets
- No bold inline labels before every bullet (`**Performance:** ...`)
- No title case in headings. Use sentence case: `### Required actions`, not `### Required Actions`
- No periods at the end of bullets
- Use em dashes sparingly. Prefer commas or separate sentences
- No chatbot artifacts: `I hope this helps`, `Let me know if...`, `Here is...`, `Certainly!`
- Use straight quotes, not curly quotes

**What good release-note copy looks like**

Bad:
> This release serves as a testament to our commitment to delivering a seamless, intuitive, and powerful experience—highlighting our pivotal role in the evolving product landscape.

Good:
> This release adds CSV export on the Reports page and fixes a bug where filters reset after refresh.

Bad:
> Additionally, we've enhanced the onboarding experience, fostering a more vibrant first-run journey for new users.

Good:
> New users now see a shorter setup flow with clearer defaults for workspace creation

Bad:
> Improved checkout on mobile
> Improved checkout on iPad
> Improved checkout on desktop
> Improved checkout on wearable

Good:
> Checkout is faster across mobile and desktop

Bad:
> Fixed login on Chrome, Safari, Firefox, and Edge

Good:
> Fixed a login issue affecting major browsers

**Audience-specific tone**
- `external`: helpful and direct, never salesy. Explain the user benefit in plain language
- `internal`: specific and searchable, no marketing voice
- `stakeholders`: concise and outcome-led, not a feature dump dressed up as strategy

Before sharing the draft, do one humanizer pass: remove AI patterns, tighten wording, collapse laundry lists, and keep only concrete changes

## Phase 1: Release context

Ask only the missing questions, one at a time:

1. `Which product, app, or surface is this release for?`
2. `What version, release name, or date should appear in the notes?`
3. `Who is the audience for these notes: external customers, internal team, or stakeholders?`
   - If unspecified, assume `external`.
4. `Where will these notes be published?`
   - Examples: in-app changelog, public docs, email, Slack, GitHub release, sales enablement
   - Use the destination to calibrate length and tone.
5. `Is there a headline theme for this release?`
   - Examples: performance, new integrations, onboarding improvements, reliability
   - Skip if the release is a mixed bag of small fixes.

## Phase 2: Source material

Prefer One Horizon when the user wants notes based on shipped work.

1. If `workspaceId` is unknown, call `list-workspaces`.
2. If the release maps to a taxonomy label, call `list-taxonomy` with `types: ["releases", "products"]`.
3. Load shipped work with `list-completed-work` for the relevant window, team, or product context.
4. If the user names a release label, initiative, or version, also use `search-tasks` to find related completed items.
5. If the user provides a manual list, spreadsheet, PR summary, or commit range, use that as the primary source.
6. If both sources exist, merge them and deduplicate before drafting.

When reviewing source material, classify each item before writing:

- `include`: clearly matters to the chosen audience
- `reframe`: technically correct but needs translation into user-visible value
- `exclude`: internal-only, too minor, duplicate, or not yet customer-visible

For `external` notes, exclude by default:

- refactors and code cleanup with no user-visible effect
- dependency upgrades, infra, CI, monitoring, and test-only work
- internal admin tools or ops workflows
- work behind flags not yet enabled for customers
- vague items like "misc improvements" unless the user confirms a public wording

If an excluded item might matter internally, mention it only in `internal` or `stakeholders` modes.

## Phase 3: Audience calibration

Before drafting, confirm the framing rules for the chosen audience.

### External (default)

Ask only if still unclear:

- `Are any changes behind a feature flag or limited rollout?`
- `Are there breaking changes, deprecations, or actions customers must take?`
- `Should we mention migration steps, downtime, or support contact paths?`
- `Is there anything shipped that should stay internal for now?`

Writing rules:

- No internal system names unless customers already know them
- No sprint names, codenames, or engineering shorthand
- Translate technical fixes into the user problem that was solved
- Combine tiny related fixes into one readable bullet when appropriate
- Collapse same-outcome changes across devices, browsers, or screens into one bullet
- Prefer "Improved ..." or "Fixed ..." over implementation detail

### Internal

Ask only if still unclear:

- `Should this include PR links, task IDs, or owner names for traceability?`
- `Are there rollout steps, feature flags, or migration notes the team must know?`
- `What known issues or follow-ups should stay visible?`

Writing rules:

- Be specific about behavior, scope, and risk.
- Surface breaking changes, migrations, and operational follow-ups clearly.
- It is fine to name systems, services, and implementation areas.

### Stakeholders

Ask only if still unclear:

- `What business outcome should this release signal?`
- `Are there adoption, revenue, retention, or risk implications worth calling out?`
- `What should leadership watch after launch?`

Writing rules:

- Lead with outcomes and significance, not feature inventory.
- Group minor fixes into a short reliability or quality note.
- Keep the note short enough to scan in under a minute.

## Phase 4: Premise check

Before writing, confirm the release story is coherent.

Present a short checklist and get agreement:

```text
RELEASE FRAMING:
1. Audience: <external|internal|stakeholders>
2. Main theme: <theme or "mixed release">
3. Included: <count> customer-visible changes
4. Excluded: <count> internal-only items kept out of this draft
5. Breaking changes / required actions: <yes/no + summary>
```

If the user disagrees, revise classification before drafting.

## Phase 5: Write the release notes

Use the matching template below.

### External template

```markdown
Short intro paragraph:
In 2-4 sentences, explain what this release means for the reader and why it matters now. Avoid internal context.

### Highlights
- Lead with the most important customer-visible improvements
- Keep this section to the 2-5 changes most worth scanning first

### New
- User-visible features or capabilities
- Start with the outcome, then one short supporting detail if needed

### Improved
- UX, performance, reliability, or workflow improvements customers will notice
- Group parallel surface or device changes into one bullet when the outcome is the same

### Fixed
- Meaningful bug fixes described as user problems solved
- Combine minor related fixes when needed

### Deprecations or required actions
- Include only if customers must change behavior, update integrations, or plan for removal
- Omit this section if nothing requires action

### Open questions
- Anything still uncertain about wording, rollout, or inclusion
```

Bullet formatting rules for all templates:
- No trailing periods on bullets
- No one-bullet-per-platform, one-bullet-per-browser, or one-bullet-per-page laundry lists
- Merge same-outcome items before publishing

### Internal template

```markdown
Short intro paragraph:
State the version, release window, and the main engineering themes.

### Shipped
- Concrete changes with enough detail for teammates to understand impact
- Include migrations, flags, and rollout notes where relevant
- Group repeated surface-level changes when only the implementation target differs

### Breaking changes
- Behavior changes, schema changes, removed endpoints, or config changes

### Operational follow-ups
- Monitoring, backfills, cleanup, docs updates, or post-release tasks

### Known issues
- Issues intentionally left open or still under investigation

### Traceability
- Optional task links, PR links, or owner notes if the user asked for them
```

### Stakeholders template

```markdown
Short intro paragraph:
Summarize what shipped and why it matters to the business in 2-3 sentences.

### What changed
- Major launches and meaningful improvements framed as outcomes
- Avoid listing every surface or variant separately

### Why it matters
- Customer impact, adoption opportunity, quality signal, or risk reduction

### Rollout status
- GA, phased rollout, beta, or pilot status if relevant

### Watch next
- Metrics, customer feedback, or follow-on work leadership should track
```

## Finalize step

After the user reviews and approves the draft:

1. Offer a shorter variant if the notes are long:
   - changelog bullets only
   - email intro plus 3 highlights
   - social announcement
2. If the user wants the notes saved in One Horizon, use `create-document` with `type: "Requirement"` and `status: "Draft"` unless they want it marked complete.
3. If the user wants edits, patch the draft in place instead of rewriting from scratch.
4. Ask whether they want a follow-up artifact:
   - subject line for a release email
   - in-app "What's new" modal copy
   - support macro or FAQ additions for major changes

```json
create-document({
  "workspaceId": "<workspaceId>",
  "title": "Release notes - <product> <version>",
  "content": "<full release notes in markdown>",
  "type": "Requirement",
  "status": "Draft"
})
```

## Quality bar

Before presenting the draft, check:

- Would the chosen audience understand every bullet without insider context?
- Does every included item describe a real change, not a process note?
- Are breaking changes or required actions visible without digging?
- Is the note scannable in under 60 seconds for the intended destination?
- For `external` notes, would you be comfortable sending this to a paying customer as-is?
- Does it sound human when read aloud, with no AI vocabulary, promotional filler, or inflated significance?
- Is every bullet concrete enough that a reader knows what changed in the product?
- Does every bullet end without a period?
- Did you collapse laundry lists instead of repeating the same change across devices, browsers, pages, or variants?

If any answer is no, revise before sharing.
