# Your Agent OS — Decisions

A log of strategic decisions made during the build. Read this before changing anything load-bearing.

## 2026-05-04 — Rebrand from "Agent Control Center" to "Your Agent OS"

- **Decision:** Rename and re-home the course. New name: "Your Agent OS." New home: `2112-website/courses/your-agent-os/`.
- **Context:** The existing course at `TBB/Content/how-to-learn-and-do-anything/` was built before the user had absorbed the field's converging Agent OS framing. The intro promised "the skill is talking" but the user no longer believes that. The skill is building the system underneath. Naming friction signaled model evolution.
- **Alternatives considered:**
  - Keep "Agent Control Center". Rejected. Cinematic but doesn't convey portability or compounding. The OS metaphor captures both.
  - Rename to "Agent Workspace". Rejected. Devalued by OpenAI's "Workspace agents" launch and Cursor's marketplace. Generic.
  - Coin a fully new term. Rejected. Following the field's converging vocabulary is more honest than inventing differentiation.
- **Rationale:** "Your Agent OS" matches the term emerging across the field (Nufar Gaspar, Karpathy LLM OS, Ango File Over App), captures the system-not-tool insight, and uses the possessive to make it feel owned by the reader rather than abstract.
- **Consequences:** Inherits comparison to Nufar's AIDB program, which is mitigated by explicit attribution and a 2112-specific implementation/audience. Existing ACC files become a quarry (mined for prose, not modified).

## 2026-05-04 — Adopt Nufar's 7-layer spine in his order, no edits

- **Decision:** Use Identity → Context → Skills → Memory → Connections → Verification → Automations as the course spine. No reorder, no extra layers, no embedded cross-cutting verification.
- **Context:** Initial KD-driven analysis proposed amendments (Verification-First reorder, Coaching as cross-cutting, embed verification in every layer). User rejected all three as over-engineering for a teaching course.
- **Alternatives considered:**
  - Verification-First (move Layer 6 to position 3). Rejected. Course teaches concepts. Students decide implementation depth.
  - Coaching cross-cutting. Rejected. That's a Claude-Code-specific personal-preference pattern, not student-facing content.
  - Add Hooks as 8th layer. Rejected. Tool-specific to Claude Code. Other harnesses have different mechanisms. Mentioned in Chapter 08 only.
- **Rationale:** A teaching course exposes concepts at the right level of generality and lets students build to their own needs. Nufar's order builds layer by layer in the way knowledge workers actually adopt them. The KD enrichments are reservoir material for "go deeper" footnotes, not required content.
- **Consequences:** The course stays general and ages well. Students wanting structure are pointed at Nufar's free AIDB program and our own Claude Code Guided Course at the end. Course doesn't become an implementation manual.

## 2026-05-04 — Move course from TBB to 2112

- **Decision:** Course lives at `2112-website/courses/your-agent-os/`. Existing ACC files at `TBB/Content/how-to-learn-and-do-anything/` are not modified, not deleted (kept as quarry).
- **Context:** TBB is the Bitcoin freedom-tech brand. 2112 is the AI/professional-empowerment brand. An AI agent course on TBB has always been a thematic stretch. It lived there because TBB was the only site that existed.
- **Alternatives considered:**
  - Keep on TBB. Rejected. Brand confusion, wrong audience.
  - Cross-post. Rejected. Dilutes both brands.
- **Rationale:** Per `project_2112_positioning.md`, 2112 is the natural home. Course audience (professionals adopting AI for knowledge work) maps directly to 2112's positioning.
- **Consequences:** TBB stays the Bitcoin authority site. 2112 gains its first major content asset. The Agent OS course is also flagged as the seed for 2112's eventual packaged services offering (per `project_2112_agent_os_packaging.md`).

## 2026-05-04 — Adopt beat-style pedagogy from the Claude Code Guided Course

- **Decision:** Each layer chapter is structured as 6-9 short single-concept beats with check-ins, not as a single long-form essay.
- **Context:** ACC's existing lessons are ~1400-word essays. The user's Claude Code Guided Course at github.com/TheBitcoinBreakdown-95/Claude-Code-Guided-Course uses 11-beat modules and the format works well. Three independent confirmations of the value of mental-model framing chapters (ACC, Learning-CC, Guided Course) suggest the beat structure is the right pedagogical unit.
- **Alternatives considered:** Keep the long-essay format. Rejected. Harder to skim, harder to update, harder to migrate between formats.
- **Rationale:** Beats are skimmable, individually editable, and lend themselves to multiple distribution formats (web reading, future Astro publishing, future slide deck or workshop derivation).
- **Consequences:** Lesson rewrites take more structural thought up front. Lessons are easier to maintain over time.

## 2026-05-04 — Treat THESIS, OUTLINE, lessons as separate artifacts in separate sessions

- **Decision:** Build THESIS first, then OUTLINE, then lessons. Don't draft all in the same conversation by default.
- **Context:** Per KD `failure-patterns.md` > Context Pollution. Long sessions with multiple unrelated drafts produce drift.
- **Alternatives considered:** Build all in one session for momentum. Accepted in this case (THESIS, OUTLINE, DECISIONS, README, and Lesson 01 written in the same session) because the conceptual content was fully settled before any drafting started. Subsequent layer chapters will be drafted in separate sessions to honor this rule.
- **Rationale:** Each artifact gets cleaner attention if it's the only thing being worked on. One-session burst is acceptable when the conceptual content is fully pre-decided.
- **Consequences:** Layer chapters 02-09 will each get their own session for drafting.

## 2026-05-04 — Adopt WBIGAF voice DNA profile as upstream voice reference

- **Decision:** Reference `WBIGAF/0-project/voice-dna/voice-dna-profile.md` as the upstream voice profile for all course writing. The course-level `VOICE.md` is the AI-topic-adapted derivative.
- **Context:** Initial `VOICE.md` was built from the conversation transcript and miscellaneous sources without consulting the existing WBIGAF profile. Result inverted several patterns (recommended em dashes, while WBIGAF bans them as a HIGH-signal AI-tell). Lesson 01 first draft and the THESIS sovereignty section both used em dashes and read one tier removed from the author's true voice.
- **Alternatives considered:** Keep building voice from scratch per project. Rejected. Duplicates work. Loses calibration. The author has one voice across projects, not one per topic.
- **Rationale:** The WBIGAF profile is the deepest existing voice reference (~27K tokens, 28 published posts analyzed across 7 layers). All future writing should hit against it. Topic adaptation (Bitcoin → AI) lives in the per-course `VOICE.md`. Form (rhythm, punctuation, structure) defers to WBIGAF.
- **Consequences:** Lesson 01 and THESIS already re-passed against WBIGAF patterns. Future chapters will use the same workflow. Voice file should be kept in sync as the WBIGAF profile evolves.
