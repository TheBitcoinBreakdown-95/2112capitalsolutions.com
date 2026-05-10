---
title: "Memory: What You Remember"
description: "What survives between sessions. Decisions, constraints, working agreements -- captured in a vault you own, retrieved by tools you can swap, pruned weekly so it stays load-bearing."
draft: false
---


Identity is who you are. Context is what you know. Skills are how you work. Memory is what carries forward.

Every conversation you've had with the agent contains things worth remembering. A decision you made. A constraint you discovered. A workflow that finally worked. A pet peeve the agent picked up halfway through. A piece of context that took you twenty minutes to surface.

Most of it gets lost when you close the session. The agent forgets. You start the next session re-explaining what you already explained.

That's the problem memory solves.

---

## What it is

Memory is the layer that lets the agent retain knowledge across sessions. Not just within one conversation. Across all of them. The decisions you've made. The patterns you've corrected. The facts about your work that keep coming up.

Two questions decide what memory looks like in your OS. Where do the bytes live. And how does the agent get them back.

Get those two right and memory stops being a feature you enable. It starts being a place you keep things.

---

## The substrate is your vault

Most memory systems on the market store your knowledge in a database the vendor controls. Vector stores. SQLite files inside a plugin's folder. A cloud account you log into. Convenient on day one. A rental on day three hundred.

The portable version is plain markdown in a folder you own. An Obsidian vault is the obvious shape, but the principle is older than Obsidian. Plain text. One file per topic. `[[wikilinks]]` between them. A folder structure that maps to your work.

The vault is your memory. The agent reads it like you would. Wikilinks are the retrieval graph. No database, no migration, no lock-in. If the tool changes, the files don't move. Same pattern as the identity file. Same pattern as the context layer. Same pattern Bitcoin proved one layer down. You hold the artifact.

This is the part that survives every news cycle in the agent space. Models will get smarter. Harnesses will trade places. The vault is what makes none of that disrupt your accumulated knowledge.

---

## Why it matters

Without memory, every session is a reset. You re-explain. You re-decide. You re-correct the same drift. The work feels like Sisyphus.

With memory, the system accumulates. Decisions stay decided. Corrections stick. The agent gets smarter over time. Not because the model is improving, but because the context around it is growing.

Memory is also the layer that fights entropy directly. Every other organizational system you've ever set up has decayed. The wiki nobody updates. The shared doc that's six months out of date. The notes you stopped reviewing. Memory is where the Agent OS pushes back against that decay.

But only if you treat it as a living thing. A vault you write to once and never read again is the same dead notebook as every productivity app you abandoned. The vault has to be tended. That's the part most people skip.

---

## Bounded files, not buckets

The most counterintuitive memory pattern in the field right now comes from Hermes Agent. Cap the file. About 2KB for the agent's working notes. About 1.5KB for the user profile. The cap looks restrictive. It's the whole point.

Unbounded memory becomes a graveyard. You write things down. The file grows. The agent loads it. Most of the content has nothing to do with the current task. The good signal drowns in stale noise. You stop trusting it. You stop reading it. Six months later it's a thousand lines of nothing.

A bounded file forces curation. When the file is full, something has to leave for the new thing to enter. The constraint does the work. You stop hoarding. You start asking the question that matters. Is this still load-bearing? If yes, it stays. If no, it leaves.

The cap is the discipline.

This applies to MEMORY.md, DECISIONS.md, the user profile file, anything the agent loads on every task. Bigger reference material lives elsewhere in the vault, looked up on demand. The always-loaded files stay small.

---

## Two kinds of memory, two different problems

Memory in the wild is two different things stuffed under one word. Untangling them clarifies what to build and what to install.

**Long-term curated memory.** What you've decided. What you've learned. The patterns you've encoded. The relationships and constraints that shape your work. This is the vault. Markdown files. Wikilinks. Bounded. Curated by you (with the agent's help). It survives across years and across tools.

**Session-to-session continuity.** What happened in last week's debugging session. What the agent tried at 3pm yesterday. The breadcrumbs from the conversation you'd otherwise have to re-explain. This is a different problem with a different solution. Tools like `claude-mem` exist for this. They auto-capture activity, compress it with AI, and inject relevant slices into the next session. The vault doesn't replace this. They sit next to each other.

People conflate them and end up under-served on both. They install a session-bridge tool and assume their long-term knowledge is covered. It isn't. They build a vault and assume the agent knows what happened yesterday. It doesn't.

Both layers exist. Both matter. Treat them as separate.

---

## Retrieval is its own decision

Once the vault exists, the agent needs a way to find things in it.

Three options live on a spectrum. From least to most.

1. **The agent reads files directly.** Open the vault, follow wikilinks, glob for filenames. Works. Slow when the vault gets big. Uses lots of context window.
2. **A local CLI search tool.** Something like `qmd` (Query Markdown Documents). Hybrid keyword and vector search. Lives on your machine. Any agent that can run a shell command can use it. No vendor required. Cuts retrieval token cost dramatically because the agent fetches only what matched, not the whole pile.
3. **An MCP server in front of the same files.** Same vault, same files, but the agent gets typed tools (`search`, `get_chunk`) instead of raw file reads. Smoother in tools that support MCP (Claude Code, others adopting it). Locks the retrieval mechanism to a tool that supports MCP.

The portable default is the first two combined. Plain files plus a CLI search tool. MCP becomes a convenience on top of that, not a replacement for it. When you switch tools, the files come with you. The CLI comes with you. The MCP server is the only piece that might not.

Notice the shape. The substrate is yours. The retrieval engine is yours. The harness is replaceable. That's the pattern across the whole OS, not just memory.

---

## What goes in

Like the identity and context files, this isn't a template. The shape of your memory layer depends on your work. But useful memory tends to capture three kinds of information.

1. **Decisions.** What you decided, why, what alternatives you considered, what you'd revisit if conditions change. Future-you will need to know why X over Y.
2. **Learnings.** What worked, what didn't, the gotchas you discovered the hard way. Each one is a future safeguard.
3. **Relationship and situation context that won't fit in the regular context files.** The stakeholder who reacted poorly to charts. The vendor who responds faster on phone than email. The patterns that don't belong in a stakeholder map but matter in practice.

The first one carries more weight than people expect. Decisions you made six months ago shape the work you're doing today. Without a record, you re-litigate them every quarter.

---

## What people get wrong

Three failure modes show up most often.

**The auto-memory-only trap.** You assume the tool's built-in memory is doing all the work. It isn't. Auto-memory captures activity, not significance. The decisions, the constraints, the relationship context. Most of it never makes it in unless you put it there.

**The memory graveyard.** You start writing things down. You never go back to read them. Six months later you have a hundred notes none of which the agent ever surfaces because they're stale, contradictory, or irrelevant. This is the failure the bounded-file discipline prevents.

**The platform vault.** You let your memory live inside a vendor's app. Notion. A SaaS knowledge base. A note tool with an export button you've never tested. The features look good. The dependence is silent. When the vendor changes the terms, raises the price, or shuts the door, the memory you built is hostage. Plain markdown in your own folder doesn't have this problem.

---

## Outsource the work, not the understanding

The memory layer is the first place where an Agent OS starts to feel like it's running you instead of you running it. The agent writes more than you read. The vault grows faster than you tend it. Six months in you have a knowledge base you can no longer hold in your head.

That's the moment the OS becomes a thing you operate, not a thing you live in.

The fix is the same instinct that makes a Bitcoin self-custodian verify their own backups. You can outsource the *work* of writing the file. You can't outsource the *understanding* of what's in it. If the agent maintains a memory file, you read it once a week. If the agent retires a skill, you know why. If a wikilink connects two notes, you can still walk that connection in your head.

The minute you can't, the system is operating beyond your comprehension. That's the failure mode. Not the agent doing too little. The agent doing things you can't explain.

Bounded files help. Weekly review helps more. The discipline is keeping the OS small enough that you remain its director.

---

## Tool-specific footnote

Memory features vary widely and change fast. Check your tool.

| Tool | Notes |
|------|------------------|
| Claude Code | `CLAUDE.md`, project memory files, `claude-mem` plugin for session continuity |
| Cursor | Project-level memory, conversation summarization |
| Codex | Persistent context, session memory |
| OpenClaw | Native memory system |
| Hermes Agent | `MEMORY.md` and `USER.md` capped, FTS5 session search, optional external providers |

Two tools worth knowing about regardless of what you use:

- **`qmd`** ([github.com/tobi/qmd](https://github.com/tobi/qmd)). Local CLI search engine over your markdown vault. Hybrid BM25 plus vector. Format-agnostic. Cuts retrieval token cost on the order of 95%. Works with any agent that can run a shell command. The portable retrieval primitive.
- **`claude-mem`** ([github.com/thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)). Session-to-session continuity for Claude Code specifically. Auto-captures activity, compresses, injects into next session. Solves the "what happened yesterday" problem the vault doesn't.

Ask your tool directly: "Explain how your memory system works. What do you remember between sessions? What do you forget? Where are the files stored?" The answer calibrates your expectations and tells you what's portable.

---

## Build it

Hand this spec to your agent. Have it create the artifacts in the runtime you're using.

```
GOAL: Stand up the memory substrate for my Agent OS.

ARTIFACTS TO CREATE:
- A `MEMORY.md` file in the location my runtime reads on session start.
  Capped at ~2KB. Sections: Decisions, Learnings, Working Agreements.
- A `DECISIONS.md` file in my vault root for longer decision traces.
  Format per entry: date, decision, alternatives considered, rationale, consequences.
- A short `memory-hygiene.md` skill or note describing my weekly review:
  read MEMORY.md, prune stale lines, keep the file under cap.

CONSTRAINTS:
- Plain markdown only.
- Use [[wikilinks]] between MEMORY.md and DECISIONS.md where they reference
  the same topic.
- Do not store any of this in a database or vendor-specific format.

THEN:
- Show me the file paths and contents.
- Suggest one decision from our recent conversations worth recording first.
```

Your agent knows where its memory files live. Hand off the spec. Let the agent do the placement.

---

## Steward it

Once a week, open MEMORY.md. Read every line. Three questions per line. Is this still true? Is this still load-bearing? Could a future-me act on this? If any answer is no, the line leaves. The cap is the forcing function. The review is the discipline.

Every quarter, walk DECISIONS.md. Decisions you'd revisit get a "revisited on" line and an updated entry. Decisions that no longer apply get archived, not deleted. The audit trail stays.

If the file is growing faster than you can review it, the agent is writing too much. Pull the rate down before the graveyard forms.

---

The next chapter introduces Layer 5: Connections. Identity is who you are. Context is what you know. Skills are how you work. Memory is what you remember. Connections are what you reach.

---

*References for this chapter: Nufar Gaspar's [Agent OS program (AIDB, April 2026)](https://www.youtube.com/watch?v=ntvkDnk_5jA). Hermes Agent's bounded-memory + auto-curation architecture ([nousresearch/hermes-agent](https://github.com/nousresearch/hermes-agent)). `qmd` for portable retrieval ([tobi/qmd](https://github.com/tobi/qmd)). `claude-mem` for session-to-session continuity ([thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)).*
