---
title: "Context: What You Know"
description: "The library the agent reaches into. Documents that tell it your situation, roadmap, customers, stakeholders -- everything generic AI can't know."
draft: false
---


Identity is who you are. Context is what you know.

Generic AI advice is one Google search away. What isn't on the public internet is your situation. Your roadmap. Your customers. Your stakeholders. Your priorities for the next quarter. The agent doesn't know any of it... unless you put it somewhere the agent can read.

This chapter is about the documents the agent reaches for when it needs to know something specific about your work. The library.

---

## What it is

Context lives in files separate from your identity file. The identity file tells the agent who it's working for. Context files tell the agent what's true about the work it's doing.

These aren't part of any prompt you type. They sit in your workspace, in folders the agent can navigate. The agent pulls them in on demand, when a task requires them.

It's the part of the system that lives on your machine and stays there. The files are yours. Other tools can read them if you switch.

---

## Why it matters

The single biggest predictor of generic vs. specific output is whether the agent has access to context the public internet doesn't.

A consultant asked "what should I prioritize this quarter?" gives a generic answer. The same consultant with your stakeholder map, your roadmap, and your last three OKR cycles gives you something you can act on. The difference isn't intelligence. It's information access.

That's what context files solve. The agent already knows the public stuff. You give it the private stuff. The output stops being generic and starts being yours.

And here's the part that won't change. Better models won't help. No model release ever announced will know what you're shipping next quarter or who your stakeholders are. That information has to come from you. Always.

---

## The 3-5 file rule

The most common failure isn't the absence of context. It's context done badly.

People sit down to "context engineer" their workspace and produce a single forty-page document covering everything. They never update it. Six months later it's a stale novel... the agent loads it but doesn't use it well, and you have a false sense of being context-loaded when you're actually drifting.

So what works instead: three to five focused files, each one page, each on a single topic. Stakeholders. Strategy. Customers. Quarter. Operating principles. Each file dated. Each updated when something changes. Each small enough that the agent can pull it into a task without burning the context window on history that doesn't matter.

The instinct will tell you to go big. The discipline is to stay small and current.

---

## What goes in

Like the identity file, this isn't a template. The shape of your context library depends on your work. But here are five files most knowledge workers benefit from having.

1. **People.** Who you work with, who reports to you, who you report to, your key cross-functional partners. What each one cares about.
2. **Strategy.** What you're trying to achieve this year. What the organization is focused on. What's been deprioritized.
3. **Operating principles.** How decisions get made. What you push back on. What you escalate.
4. **Active projects.** What's in flight, what's blocked, what's due when. The version of your project tracker the agent can read.
5. **Past decisions.** What got decided, why, what alternatives were considered. The decisions you'll forget you made by Q4.

You don't need all five on day one. You need one. The one you reach for most often. Then the next one, the week you notice you're re-explaining something the agent should already know.

---

## The curation practice

Context is not a project that has a beginning or an end. It's a practice.

Every time you catch yourself re-explaining your situation to the agent, that thing should have been in a context file. Write it down. Add it to the library. Move on.

The signal that the practice is working is small but unmistakable. You stop pasting the same paragraph into the start of every conversation. You stop saying "remember, the customer here is X." You stop briefing the agent on what your team's priorities are. The library does it.

But the signal that the practice is failing is the same one as the identity file failing. The output starts feeling slightly off and you don't know why. Re-read the files. Most of the time something's stale.

---

## Tool-specific footnote

Context files don't have a single conventional name the way identity files do. The pattern is the same. Plain text or markdown files in a folder the agent can read.

Some tools support `@filename` references that pull a specific file into a conversation. Others auto-load all files matching a pattern. Some let you mark files as "always include." Check what your tool supports... it'll change how you organize.

What's portable is the files themselves. What's not is the loading mechanism. Plan for the files to outlive the tool.

---

## Build it

Hand this spec to your agent. Have it set up the first context file in the runtime you're using.

```
GOAL: Create the first context file in my Agent OS.

PICK ONE TOPIC:
- The piece of context I most often re-explain to the agent.
  (Likely candidates: stakeholders, current strategy, active projects,
  operating principles, key past decisions.)

PROCESS:
- Ask me 5-8 questions to surface what's in my head about that topic.
- Draft a one-page version. Markdown. Dated.
- Place the file in my vault somewhere the agent can pull it on demand.

CONSTRAINTS:
- One topic per file. Don't combine.
- Under one page. If it grows past that, propose a split.
- Use [[wikilinks]] to point at related context, identity, or memory files.

THEN:
- Show me the file path and contents.
- Suggest the next topic worth a file based on our conversation history.
```

Your agent knows where context files live in your runtime. Hand off the spec. Let the agent place it.

---

## Steward it

Every time you catch yourself re-explaining your situation to the agent, that thing should have been in a context file. Add it. Move on.

Date every file. Once a month, scan the dates. Anything older than your last big change in that area is suspect. Re-read it. If it's wrong, patch it. If it's irrelevant, archive it.

The signal that the practice is working is small but unmistakable. You stop pasting the same paragraph into the start of every conversation. You stop saying "remember, the customer here is X." The library does it.

---

The next chapter introduces Layer 3: Skills. Identity is who you are. Context is what you know. Skills are how you work.

---

*References for this chapter: Nufar Gaspar's [Agent OS program (AIDB, April 2026)](https://www.youtube.com/watch?v=ntvkDnk_5jA).*
