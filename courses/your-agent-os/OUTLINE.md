# Your Agent OS — Outline

## Course shape

One framing chapter, seven layer chapters in Nufar's order, one closing chapter. Each chapter teaches the concept and shows one concrete example, then steps back. The course teaches what each layer is and why. The student decides how robust their own implementation gets.

| # | Chapter | What it teaches |
|---|---------|-----------------|
| 01 | The Director and the OS | Mental model. Why the system underneath matters more than the tool. The director mindset. |
| 02 | Identity: Who You Are | The file the agent reads first. Identity vs. context. What makes a useful identity file. |
| 03 | Context: What You Know | The library the agent reaches for. Why generic AI advice is one Google search away and what isn't. |
| 04 | Skills: How You Work | Reusable workflows. The trigger-process-output pattern. When to write a skill and when not to. |
| 05 | Memory: What You Remember | Persistence across sessions. The deliberate-vs-automatic distinction. What gets remembered and what doesn't. |
| 06 | Connections: What You Reach | MCPs, CLIs, APIs. Read-only first. The gossiping-agent risk. |
| 07 | Verification: How You Check | Telling true output from confident garbage. Per-task checks vs. system-level audits. |
| 08 | Automations: Running When You're Not Watching | Cron, scheduled jobs, drafts-only patterns. What you should and shouldn't automate. |
| 09 | Where to Go From Here | The compounding payoff. The Claude Code Guided Course as the implementation companion. |

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
| `02-installing-your-agent-control-center.md` | Almost all of it carries into Chapter 02 (Identity) as the runtime-setup beat sequence. |
| `03-setting-up-your-control-center.md` | The CLAUDE.md teaching at lines 72-130 carries into Chapter 02. The "It Reads What's Already There" section at lines 60-69 carries into Chapter 03 (Context). |
| `04-how-to-learn-and-do-anything.md` | The Three Practices section (lines 55-63) carries into Chapter 07 (Verification). |
| `handout-best-practices.md` | Director vs. Searcher table (line 19), Verification section (lines 74-94, including the "what are you least confident about?" trick), Revision Workflow (lines 126-141), Common Mistakes (lines 144-154) all carry forward. |
| `OUTLINE.md` | The OUTLINE source list (Karpathy, Ango, Mollick, this workspace as living example) carries forward. |
| `appendix-troubleshooting.md` | Optional appendix, kept available. Revisited if the rebuild needs it. |
| `workshop-deck.md` | Reference only. Workshop format may be re-derived from the new course later. |

What does not carry: the "you've been training your whole life" intro, the framing that "the skill is talking" (replaced by "the skill is building the system"), and the Vibing/Vibe Coding/Directing spectrum's old framing (kept as concepts, repositioned to teach what survives across tools).

## Net-new content required

| Chapter | Net-new effort | Source material |
|---------|---------------|-----------------|
| 01 | High, full new framing | Director model from ACC, Learning-CC Module 1, Guided Course Module 0 |
| 02 (Identity) | Low, mostly carries from ACC 03 | Plus Nufar identity-layer concepts |
| 03 (Context) | Medium | Nufar context layer + KD `context-engineering.md` four-pillars structure |
| 04 (Skills) | High, basically untaught in ACC | Nufar skills layer + KD `skills.md` Rule of Three |
| 05 (Memory) | High, Identity/Memory distinction not drawn in ACC | Nufar memory layer + KD `memory-persistence.md` |
| 06 (Connections) | High, was Part 2 in ACC | Nufar connections layer + KD `mcp-servers.md` |
| 07 (Verification) | Low, strong existing ACC content | Plus Nufar verification framing |
| 08 (Automations) | High, was Part 2 in ACC | Nufar automations layer + KD `autonomous-agents.md` |
| 09 | High, full new closing | The Guided Course as next step + the compounding payoff frame |

## What this course does not teach

- Code. The student does not learn to write code, and does not need to.
- The Coaching layer (a Claude-Code-specific personal-preference pattern). The student is taught they can shape how the agent talks to them via the identity file. The deeper coaching apparatus is out of scope.
- Hooks (deterministic enforcement). Mentioned as one example of an automation pattern in Chapter 08. Full treatment is in the Claude Code Guided Course.
- Implementation depth in any specific layer. Each chapter teaches the concept and one example. The student decides how deep their own implementation goes.

## Source attribution

Cited explicitly in `THESIS.md` and at the end of each layer chapter:

- The seven-layer model: Nufar Gaspar's "Agent OS" program (AIDB, April 2026)
- The conceptual ancestor: Andrej Karpathy, "LLM OS" (2023)
- The portability principle: Steph Ango, "File Over App" (2023)
- The human-side framing: Ethan Mollick, *Co-Intelligence*
- Per-layer KD enrichments cited inline where used
