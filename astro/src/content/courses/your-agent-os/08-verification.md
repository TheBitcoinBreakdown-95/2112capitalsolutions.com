---
title: "Verification: How You Check"
description: "How you keep the system honest. Catching the failure mode where the agent looks confident, ships work that seems right, and you don't notice until later."
draft: false
---


Identity is who you are. Context is what you know. Skills are how you work. Memory is what you remember. Connections is what you reach. Verification is how you check.

The worst failure mode of an Agent OS isn't that it fails. The worst failure mode is that it works confidently, produces something that looks right, and ships before you notice it isn't.

This chapter is about how you catch that. How you keep the system honest.

---

## What it is

Verification is the habit of checking the agent's work before you trust it. Two flavors run at the same time.

**Per-task verification.** Quick checks you run on every output. Did the email actually say what I told it to say? Does the budget add up? Are the numbers cited from real sources?

**System-level verification.** Periodic audits of the whole Agent OS. Are the skills still working? Are the context files still fresh? Is the identity file still current with how I actually work?

Both layers matter. Most people skip both.

---

## Why it matters

AI output looks confident. Always. The model is built to produce text that reads as authoritative whether or not it's right.

That's the problem. A confidently wrong answer, accepted without checking, is worse than a refusal. Refusals are visible. Errors that look right are not. They get shipped, get acted on, and the cost of the mistake compounds before anyone notices the source.

Verification is the layer that keeps the OS honest. Without it, every other layer is suspect by default.

---

## The cheapest tool you'll ever have

Before any other verification trick, learn this one. Ask the agent:

> "What are you least confident about in this output?"

The agent will tell you. The places it was guessing. The claims it pulled from thin air. The spots where it's pattern-matching instead of reasoning. These are the spots to check first.

This single question replaces hours of fishing for errors. It's not a substitute for verification. It's the trick that tells you where to verify.

---

## Three to five checks per task

Beyond the "least confident" question, build a habit. Three to five quick checks per task type. Each one under a minute.

For drafts: tone match. Fact spot-check. Names spelled correctly. Sources real.

For analyses: numbers run. Methodology stated. Counter-cases considered.

For decisions: alternatives named. Constraints respected. The case against actually steelmanned.

The checks compound. After a few weeks the right checks for the work you do most become automatic. You stop verifying everything. You verify the high-stakes ones. The low-stakes ones get a glance and a ship.

---

## Verify artifacts, not self-reports

The most important verification principle. Check what the system actually produced. Not what it says it produced.

The agent will tell you "I've drafted the email and added it to your outbox." Open the outbox. Read the draft. Confirm both the content and the destination.

The agent will tell you "All the citations are real." Click two of them. Make sure they go where the agent said.

The agent will tell you "I've updated the file." Open the file. Look at the change.

Self-reports are a prediction of what happened. The artifact is proof. They diverge more often than you'd expect.

---

## The shelf-life problem

The system-level version of verification is the periodic audit. Your Agent OS has a shelf life of about eight weeks before things start to drift. Skills that referenced a process you've changed. Context files that describe a project that's been deprioritized. An identity file that reflects how you worked six months ago, not how you work now.

The fix is a calendar reminder. Once a month or so, walk the layers. Read the identity file. Skim the context files for staleness. Run a few skills and notice what feels off. Open the memory file and prune what's no longer load-bearing. Audit the connections. What does the agent still have access to that it shouldn't?

Most tools will help you do this. Ask yours: "What's not being used? What hasn't been updated in a while?" The answer points you at the staleness.

Without the audit, the OS has a shelf life. With it, the OS compounds forever.

---

## What people get wrong

Three failure modes show up most often.

**Trusting confident output.** The most common one. The output reads well, you accept it, you find the error after it's shipped. The fix is the "least confident" question and the three-check habit.

**Verifying only when something feels off.** Verification triggered by intuition is verification you're already late on. By the time it feels off, you've usually accepted three earlier outputs that should have been checked.

**Skipping the system audit.** Per-task verification stays diligent. The whole-system staleness check never happens. Six months later the OS is producing slightly off output across the board and you can't trace why.

---

## Tool-specific footnote

Verification mechanisms vary, but most of the techniques in this chapter are tool-independent.

| Tool | Verification mechanisms |
|------|------------------------|
| Claude Code | `--dry-run` flags, hooks, custom verification skills |
| Cursor | Diff review, accept/reject controls |
| Codex | Run-before-merge checks, test integration |
| OpenClaw | Native verification + audit features |
| All tools | The "What are you least confident about?" question works everywhere |

The last row is the highest-leverage one. It's tool-independent and free.

---

## Build it

Hand this spec to your agent. Have it set up your verification habit and schedule the system audit.

```
GOAL: Stand up the verification layer for my Agent OS.

PROCESS:
- Pick one task I do with the agent at least weekly.
- Draft 3-5 quick checks specific to that task type. Each check
  should be runnable in under a minute.
- Save them as a thin verification skill the agent fires after that
  task type. Trigger phrase included.
- Schedule a monthly system audit. Calendar reminder, automation,
  or recurring task in my runtime. The audit walks all seven layers
  and asks what's stale.

CONSTRAINTS:
- The "What are you least confident about?" question must be the
  first check on any high-stakes task. It's free and tool-independent.
- Verification checks the artifact, not the agent's report of the
  artifact. Open the file. Read the draft. Click the link.

THEN:
- Show me the verification skill and the audit schedule.
- Run the verification skill once on a real recent output so I can see
  what it catches.
```

Your agent knows where skills and scheduled tasks live in your runtime. Hand off the spec. Let the agent place them.

---

## Steward it

Verification habits ossify if you don't review them. A check that never catches anything is dead weight on every task. Drop it. A check that keeps catching the same kind of error points at a deeper fix in the layer that produced the error. Make it.

The monthly audit is non-negotiable. Without it the OS has an eight-week shelf life. The skills, the context files, the memory layer, the connections all drift quietly. The audit is the only thing that catches the drift before it produces output you can't trace back.

If you skip the audit twice in a row, every output the agent produces is suspect by default until you've walked the layers.

---

The next chapter introduces Layer 7: Automations. Identity is who you are. Context is what you know. Skills are how you work. Memory is what you remember. Connections is what you reach. Verification is how you check. Automations is how it runs unattended.

---

*References for this chapter: Nufar Gaspar's [Agent OS program (AIDB, April 2026)](https://www.youtube.com/watch?v=ntvkDnk_5jA).*
