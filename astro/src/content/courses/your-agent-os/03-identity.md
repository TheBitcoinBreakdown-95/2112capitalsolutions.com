---
title: "Identity: Who You Are"
description: "The first layer. The file the agent reads before anything else -- your role, style, standards, hard rules. How to write one without quitting halfway."
draft: false
---


The file the agent reads first.

Before any prompt you type. Before any memory it has of you. Before any context file it reaches for. The agent reads this one first... and if it doesn't exist, it starts from zero. Every conversation. Every time.

This chapter is about that file. What it is. What goes in it. How to build one without quitting halfway.

---

## What it is

Identity is a plain text file that lives somewhere the agent reads on startup. It tells the agent who it's working for. It captures what doesn't change between conversations. Your role. Your style. Your standards. Your hard rules.

Without it, every conversation is the agent meeting you for the first time. With it, every conversation starts from where the last one left off.

---

## Why it matters

Generic AI gives generic output. Specific AI gives specific output. The gap between "this is fine" and "this is exactly what I needed" comes down to whether the agent knows who you are before you start typing.

A new colleague asks who you are on day one and never asks again on day two. That's identity in the human world. Stored once, referenced forever. An agent without an identity file is a colleague who introduces himself every morning. You get usable output. But you spend the first ten minutes of every conversation re-explaining things the agent should already know.

---

## The foundation property

The identity file is what the rest of the OS references. Every other layer assumes it's there and reads from it. Get it wrong and the agent still works. It just works less well, and you don't always know why.

That's the cost of skipping foundation work. The system runs. The output is slightly off. The source is invisible.

---

## What goes in

This isn't a template. Templates produce files that read as someone else's voice. Yours has to come from you. But useful identity files tend to cover four kinds of information.

1. **Who you are.** Your role, what you do, what you're working on. The version you'd give a new colleague on day one.
2. **How you communicate.** Direct or diplomatic. Bullets or prose. Short or thorough. The cadence you want the agent to match.
3. **What you value.** Concise over lengthy. Challenge over execute. Reasoning shown over answer-only. The defaults you bring to any task.
4. **What you don't want.** The list of things to never do. No flattery. No hedging. No emojis. No restating the question. The pet peeves.

The fourth one carries more weight than people expect. A sentence saying "never do X" prevents X for every conversation forever, instead of you correcting the same drift twenty times a week.

---

## Hard rules: what must always be true

The four kinds above describe how you want to work. There's a fifth thing the agent needs in writing... what must never break.

Hard rules are the lines you don't cross. Not goals. Not preferences. Yes-or-no tests the agent has to pass before any output ships. A few examples that translate to almost any knowledge worker:

- Client emails are drafted only. Never sent without my approval.
- Numbers in any draft are sourced from a real document. Never paraphrased or pattern-matched.
- Calendar invites quote the meeting brief verbatim.
- Anything destined for an external system gets logged to my audit file before it goes out.

These look restrictive. They're protective. Without them, the agent is optimizing in a space that includes the wrong answer. With them, the wrong answer is removed before the agent reaches for it.

Every hard rule turns into a verification check for free. "Numbers sourced" is a check. "Emails drafted only" is a check. The list you write becomes the guard rails the system runs against.

Two or three on day one is plenty. You don't need the full list before you start. You add a rule the next time you catch the agent doing something that should never have been possible.

---

## The brain-dump methodology

The part that matters more than what goes in.

Don't write the file from scratch by yourself. You will hate it. You will quit. The blank page wins.

So open the tool you're going to use. Tell it: "I'm building my identity file. Ask me fifteen questions about how I work, what I want, what I don't want, what frustrates me about AI today, and what rules I want enforced." Then answer. Out loud is even better if your tool supports voice... talking is faster than typing for this kind of self-disclosure.

The agent drafts. You edit. You ship a first version that's about seventy percent right. You patch over the next few weeks as you notice the gaps.

It works because you're not designing your identity file. You're discovering it.

---

## Two ways people quit

The first is the perfect-file trap. People sit down to write the perfect file. They produce something that reads like a personality test. They hate it and quit. The file sits at fourteen lines.

The second is the write-once trap. People build a useful first version and never touch it again. Six months later it describes a job they no longer have, in a voice they've moved past. The agent gives slightly off output and they don't know why.

Identity is a practice, not a project. Every time you correct the same drift twice, ask whether it should go in the file. Most of the time the answer is yes.

---

## Tool-specific footnote

What this file is called depends on the tool. The pattern is universal. The filename isn't.

| Tool | Identity file |
|------|---------------|
| Claude Code | `CLAUDE.md` |
| Cursor | `AGENTS.md` or `.cursorrules` |
| Codex | `AGENTS.md` |
| OpenClaw | `SOUL.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |

The content is portable. If you switch tools, the file moves with you.

---

## Build it

Hand this spec to your agent. Have it set up the identity file in the runtime you're using.

```
GOAL: Stand up the identity file for my Agent OS.

PROCESS:
- Ask me 15 questions about how I work, what I want, what I don't want,
  what frustrates me about AI today, and what rules I want enforced.
  Voice-mode if my runtime supports it.
- Draft a first version from my answers. Cover four sections:
  who I am, how I communicate, what I value, what I don't want.
- Place the file where my runtime reads it on session start.

CONSTRAINTS:
- Plain text or markdown only.
- One file. Under 200 lines on the first pass.
- Use my actual phrasing where you can. Don't sand the voice off.

THEN:
- Show me the file path and contents.
- Tell me one thing you'd ask if you wanted the file sharper.
```

Your agent knows where its identity file lives. Hand off the spec. Let the agent place it.

---

## Steward it

Every time you correct the same drift twice, the correction belongs in this file. That's the only rule. Identity files don't go stale because the file is wrong. They go stale because the world moved and you didn't update them.

Once a quarter, re-read the file cold. If a section describes a job you no longer have or a style you've moved past, edit it. The file represents you as you are now, not as you were when you started.

---

The next chapter introduces Layer 2: Context. Identity is who you are. Context is what you know.

---

*References for this chapter: Nufar Gaspar's [Agent OS program (AIDB, April 2026)](https://www.youtube.com/watch?v=ntvkDnk_5jA).*
