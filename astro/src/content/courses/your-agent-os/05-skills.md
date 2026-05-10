---
title: "Skills: How You Work"
description: "Repeatable workflows the agent fires by name. Stop re-briefing every conversation -- turn one-off prompts into named procedures."
draft: false
---


Identity is who you are. Context is what you know. Skills are how you work.

If you've shipped a few projects with an agent already, you've felt this. The same patterns come up again and again. Drafting a stakeholder email. Prepping for a meeting. Writing a weekly update. Triaging the inbox.

The first time you do one of these with the agent, you brief it from scratch. The second time, you find yourself pasting the same instructions back in. The third time, you should be done explaining.

That's what skills are for.

---

## What it is

A skill is a saved workflow the agent can fire by name.

You write down once how a recurring task should be done. What triggers it. What process to follow. What sources to pull from. What format to output. The agent reads the skill on demand. You stop re-explaining. You start invoking.

It's the layer where your work patterns get encoded into a system that runs them consistently, in your voice, against your context, every time. And it's the first place the Agent OS stops waiting and starts firing.

---

## Why it matters

Without skills, every conversation is a fresh brief. You re-explain the format. You re-paste the source material. You complain that the agent writes in a weird voice. You re-fix the same drift.

A skill fixes that. Write it once. It fires forever.

The cost of not having skills is friction tax. Death by a thousand re-explanations. The agent is technically capable of producing the work. It just doesn't know your version of how the work should be done. Every conversation that should take one prompt takes five.

Most knowledge workers have twenty to thirty workflow patterns they repeat. The ones you encode become portable. The ones you don't stay locked inside your routine.

---

## The Rule of Three

Don't write a skill the first time you do something. You don't know enough yet.

- **First time:** exploration. You're figuring out how the task works.
- **Second time:** pattern recognition. You notice you've done this before.
- **Third time:** encode it. You're going to do it again.

This is the heuristic that prevents two opposite failure modes. Encode too early and the skill is a guess. Encode too late and you're paying friction tax for months. Three is the sweet spot.

When the skill is wrong, update it. Every mistake becomes a reusable safeguard.

---

## What goes in

Like the identity file, this isn't a template. The shape of a skill depends on what it's automating. But useful skills tend to specify four things.

1. **Trigger.** When the skill should fire. The phrases or conditions that activate it.
2. **Process.** How to do the task, step by step. Specific enough that two runs produce comparable output.
3. **Sources.** What context files or external data the skill should pull in.
4. **Output format.** What the result should look like.

Together: when *trigger*, do *process* using *sources*, produce *output*. That's the whole shape.

---

## Keep skills thin

A common failure is the kitchen-sink skill. Someone tries to encode their entire workflow library into one massive document. The skill becomes 1,400 lines. The agent loads it for everything and applies it well to nothing.

The opposite move works. Each skill stays around forty lines. It encodes one workflow, with two or three concrete examples and the gotchas that matter. Detailed reference docs live elsewhere. The skill just points to them when needed.

Thin skills compound. A library of fifteen tight skills covers more ground than three sprawling ones, and each one stays maintainable.

---

## What people get wrong

Three failure modes show up most often.

**The vague trigger.** A skill that says "use this for content tasks" matches everything and nothing. The trigger should be specific enough that you can predict when the skill will fire. Specificity beats coverage.

**The stale skill.** A skill written six months ago that still references a process you've since changed. It runs and produces the wrong shape of output. Worse than no skill at all because you trust it.

**The over-encoded skill.** Trying to capture a workflow before you've done it three times. The skill calcifies your first guess into a defaulted SOP. The Rule of Three is the antidote.

---

## Tool-specific footnote

What this layer is called varies by tool. The pattern is the same.

| Tool | Skills mechanism |
|------|------------------|
| Claude Code | `.claude/skills/` directory with `SKILL.md` files |
| Cursor | `.cursorrules` patterns and inline rules |
| Codex | `AGENTS.md` sections |
| OpenClaw | Skills system (see official docs) |
| GitHub Copilot | Custom instructions |

The naming differs. The shape (trigger + process + sources + output) doesn't.

---

## Build it

Hand this spec to your agent the next time you've done a workflow three times. Have it create the skill in the runtime you're using.

```
GOAL: Encode my recurring workflow as a reusable skill.

THE WORKFLOW:
- [Describe what you've done three times. The trigger phrase, what
  context you reach for, what the output looks like.]

PROCESS:
- Draft the skill with four sections: trigger, process, sources,
  output format.
- Cap it around 40 lines. If it's longer, the skill is doing too much.
- Place the file where my runtime reads skills on demand.
- Use [[wikilinks]] to point at the context, identity, or memory files
  the skill should pull in.

CONSTRAINTS:
- Plain markdown. No vendor-specific format that won't survive a
  tool switch.
- One workflow per skill. If I describe two workflows, propose
  splitting.

THEN:
- Show me the file path and contents.
- Tell me what specific phrase will fire the skill.
- Run the skill once on a real example so I can see what it produces.
```

Your agent knows where skills live in your runtime. Hand off the spec. Let the agent place it.

---

## Steward it

Skills go stale faster than identity or context files. The work changes. The skill doesn't. A skill that referenced last quarter's process produces last quarter's output, confidently.

Once a month, list every skill the agent has. For each one, the same three questions. Did it fire in the last 30 days? Did the output need fixing? Is the workflow it encodes still how I do this?

Any skill that fails the first question is a candidate for retirement. Any skill that fails the second is a candidate for a patch. Any skill that fails the third has to leave or get rewritten. The library shrinks before it grows. That's the point.

A skill you can't recite the purpose of is a skill the agent shouldn't be loading. Retire faster than you encode.

---

The next chapter introduces Layer 4: Memory. Identity is who you are. Context is what you know. Skills are how you work. Memory is what you remember.

---

*References for this chapter: Nufar Gaspar's [Agent OS program (AIDB, April 2026)](https://www.youtube.com/watch?v=ntvkDnk_5jA) and her [Agent Skills Masterclass](https://www.youtube.com/watch?v=fs_Y3gvj7lk).*
