# Your Agent OS — Outline

## Course shape

One framing chapter, seven layer chapters in Nufar's order, one closing chapter. Each chapter teaches the concept and shows one concrete example, then steps back. The course teaches what each layer is and why. The student decides how robust their own implementation gets.

| # | Chapter | What it teaches |
|---|---------|-----------------|
| 00 | Start Here | Condensed intro. The thesis at ~350 words. Hook for the rest of the course. |
| 01 | Stand Up Your Runtime | Install the harness, set up the vault, open the editor. Worked example: Claude Code + VS Code + a vault folder. Companion `your-agent-os-starter` repo. |
| 02 | The Director and the OS | Mental model. Why the system underneath matters more than the tool. The director mindset. The thing that compounds also accumulates. |
| 03 | Identity: Who You Are | The file the agent reads first. Identity vs. context. What makes a useful identity file. |
| 04 | Context: What You Know | The library the agent reaches for. Why generic AI advice is one Google search away and what isn't. |
| 05 | Skills: How You Work | Reusable workflows. The trigger-process-output pattern. Rule of Three. Retire faster than you encode. |
| 06 | Memory: What You Remember | Vault as substrate, wikilinks as graph, bounded files as discipline. Long-term curation vs. session-to-session continuity. QMD as portable retrieval. |
| 07 | Connections: What You Reach | CLIs first, MCPs second, scripts third. Read-only first. The gossiping-agent risk. Audit or rented attack surface. |
| 08 | Verification: How You Check | Telling true output from confident garbage. Per-task checks vs. system-level audits. The eight-week shelf life. |
| 09 | Automations: Running When You're Not Watching | Cron, scheduled jobs, drafts-only patterns. The 3am test. The audit frontline for entropy. |
| 10 | Where to Go From Here | The compounding payoff. The Claude Code Guided Course as the build sequel. Outsource the work, not the understanding. |

## Pedagogical pattern

Each chapter is structured as a series of beats. Short single-concept moments rather than long expository sections. Roughly 6-9 beats per chapter, each one self-contained.

A typical layer chapter follows this beat sequence:

1. **Concept.** What the layer is, in one paragraph.
2. **Why it matters.** What goes wrong without it.
3. **One example.** A specific instance, not a mandated structure.
4. **Common-failure.** What newcomers do wrong.
5. **Build your own.** General guidance for the student to apply at their level.
6. **Tool-specific footnote.** What this layer is called in Claude Code, Cursor, Codex, etc.
7. **Go deeper.** One link to extended material for readers who want more.

The beat structure is borrowed from the [Claude Code Guided Course](https://github.com/TheBitcoinBreakdown-95/Claude-Code-Guided-Course), which uses 11-beat modules. Same pattern, different distribution medium. That course is interactive (slash commands). This one is read-and-build.

## What carries over from the existing Agent Control Center

The existing course at `TBB/Content/how-to-learn-and-do-anything/` is treated as a quarry. Prose is mined where it works. The structure is rebuilt from scratch.

| ACC file | What survives |
|----------|---------------|
| `01-you-already-know-how-to-do-this.md` | The chat → vibe-code → direct spectrum (rebuilt as table). Most of the rest is replaced. |
| `02-installing-your-agent-control-center.md` | Almost all of it now carries into Chapter 01 (Stand Up Your Runtime) as the runtime-setup beat sequence -- the install/setup walkthrough that was missing in the first rewrite pass. |
| `03-setting-up-your-control-center.md` | The CLAUDE.md teaching at lines 72-130 carries into Chapter 03 (Identity). The "It Reads What's Already There" section at lines 60-69 carries into Chapter 04 (Context). |
| `04-how-to-learn-and-do-anything.md` | The Three Practices section (lines 55-63) carries into Chapter 08 (Verification). |
| `handout-best-practices.md` | Director vs. Searcher table (line 19), Verification section (lines 74-94, including the "what are you least confident about?" trick), Revision Workflow (lines 126-141), Common Mistakes (lines 144-154) all carry forward. |
| `OUTLINE.md` | The OUTLINE source list (Karpathy, Ango, Mollick, this workspace as living example) carries forward. |
| `appendix-troubleshooting.md` | Optional appendix, kept available. Revisited if the rebuild needs it. |
| `workshop-deck.md` | Reference only. Workshop format may be re-derived from the new course later. |

What does not carry: the "you've been training your whole life" intro, the framing that "the skill is talking" (replaced by "the skill is building the system"), and the Vibing/Vibe Coding/Directing spectrum's old framing (kept as concepts, repositioned to teach what survives across tools).

## Net-new content required

| Chapter | Net-new effort | Source material |
|---------|---------------|-----------------|
| 01 (Stand Up Your Runtime) | High, full new chapter | ACC `02-installing-your-agent-control-center.md` + Claude Code quickstart docs + companion `your-agent-os-starter` repo |
| 02 (Director) | High, new framing | Director model from ACC, Learning-CC Module 1, Guided Course Module 0 |
| 03 (Identity) | Low, mostly carries from ACC 03 | Plus Nufar identity-layer concepts |
| 04 (Context) | Medium | Nufar context layer + curation-practice framing |
| 05 (Skills) | High, basically untaught in ACC | Nufar skills layer + Rule of Three + Thin Skills Principle |
| 06 (Memory) | High, near-total rewrite from first pass | Nufar memory layer + Hermes bounded-files + wikilinks/Obsidian substrate + QMD retrieval + claude-mem reframe |
| 07 (Connections) | High, was Part 2 in ACC | Nufar connections layer + CLI-first portability principle |
| 08 (Verification) | Low, strong existing ACC content | Plus Nufar verification framing |
| 09 (Automations) | High, was Part 2 in ACC | Nufar automations layer + 3am test |
| 10 (Where to Go) | High, full new closing | The Guided Course as build sequel + Outsource the work, not the understanding + Hermes/claude-mem/LLM-wiki references |

## What this course does not teach

- Code. The student does not learn to write code, and does not need to.
- The Coaching layer (a Claude-Code-specific personal-preference pattern). The student is taught they can shape how the agent talks to them via the identity file. The deeper coaching apparatus is out of scope.
- Hooks (deterministic enforcement). Mentioned as one example of an automation pattern in Chapter 09. Full treatment is in the Claude Code Guided Course.
- Implementation depth in any specific layer. Each chapter teaches the concept and one example. The student decides how deep their own implementation goes.

## Source attribution

Cited explicitly in `THESIS.md` and at the end of each layer chapter:

- The seven-layer model: Nufar Gaspar's "Agent OS" program (AIDB, April 2026)
- The conceptual ancestor: Andrej Karpathy, "LLM OS" (2023)
- The portability principle: Steph Ango, "File Over App" (2023)
- The human-side framing: Ethan Mollick, *Co-Intelligence*
- Field-level architectures for "OS that builds on itself": Hermes Agent (bounded files + auto-curation), claude-mem (session-to-session continuity), LLM Wiki article (manual self-improving wiki). Cited in Chapter 10.
- Portable retrieval primitive: `qmd` (Query Markdown Documents). Cited in Chapter 06 (Memory) and Chapter 07 (Connections).
