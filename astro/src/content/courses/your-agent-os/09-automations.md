---
title: "Automations: How It Runs Unattended"
description: "The layer that runs without you. Scheduled jobs, briefings, monitors, cross-agent coordination -- where the Agent OS becomes actual infrastructure."
draft: false
---


Identity is who you are. Context is what you know. Skills are how you work. Memory is what you remember. Connections is what you reach. Verification is how you check. Automations is how it runs unattended.

Until this chapter, the system has been reactive. You sit down. You fire a skill or open a session. The agent does the work. You close it.

Automations is where the system stops needing you in the loop. Scheduled jobs that fire on their own. Briefings that arrive before you ask. Monitors that ping you when something changes. Cross-agent coordination that runs in the background while you do other things.

This is the layer where the Agent OS becomes actual infrastructure.

---

## What it is

An automation is anything the agent does without being prompted by you in real time. Two main flavors.

**Scheduled.** Cron jobs and time-based triggers. Daily morning briefing at 7am. Weekly status summary at end of day Friday. Monthly OS audit on the first.

**Event-triggered.** Something happens. An email arrives, a file changes, a deadline approaches. The automation fires in response.

Both share the same property. The agent acts when you're not watching.

---

## Why it matters

This is the layer that makes the OS feel like an actual operating system, not just a smart tool.

Without automations, you're still the trigger. Every piece of work the agent produces requires you to initiate it. With automations, the agent starts producing work on the schedule you set, against the rules you wrote, on the systems you've connected.

The compounding gets steep here. A working set of automations means you wake up to a daily brief that pulled from your inbox, your calendar, and your project tracker. Your weekly review writes itself. Your inbox gets triaged before you open it. The work that used to start your day becomes the work that arrives finished.

This is also the layer with the most risk.

---

## The three rules

Nufar's three rules for automations are non-negotiable. Memorize them before wiring anything.

**1. Only automate workflows you've run manually enough times to trust.** If you haven't done a task by hand at least five or ten times, you don't yet know what good looks like, what edge cases exist, or what should happen when something unexpected hits. Automating an untested workflow is automating a guess.

**2. Start with automations that produce drafts for review, not outputs that go to other people.** The agent drafts the email. You approve before it sends. The agent drafts the calendar invite. You review before it posts. Drafts-for-review is the slow lane that lets you catch the failures the system would otherwise commit on your behalf.

**3. Always log what ran and what it did.** When something goes wrong at 3am, and eventually it will, the log is what tells you what happened. No log, no diagnosis. No diagnosis, no fix. No fix, the same failure repeats next week.

These three rules aren't optional safety theater. They're the difference between an automation layer that compounds and one that quietly produces damage you discover three months in.

---

## The 3am test

Before you turn an automation on, run it through the 3am test.

If this automation fires at 3am and gets it wrong, what's the worst that happens?

If the answer is "an email goes to a client that I'd want to retract," don't ship it as a direct-output automation. Ship it as drafts-for-review.

If the answer is "a wrong row gets written to the CRM," same thing. Make the automation propose, not commit.

If the answer is "I get a slightly off morning briefing," fine, ship it. The cost of a bad brief is low. Read with skepticism, move on.

The 3am test calibrates your appetite for direct-output automations. Most things you'd be tempted to automate fail it. That's fine. Drafts-for-review still saves you the work of starting from blank.

---

## Kill criteria

Before you turn an automation on, decide what would make you turn it off.

Two drafts in a row I had to fully rewrite. Three runs that produced nothing. One run that cost more than five dollars. A log entry that includes a name I don't recognize. Pick three or four. Write them down. Wire them as auto-pause conditions if your runtime supports it. Calendar reminder if it doesn't.

The 3am test asks "what's the worst that happens." Kill criteria asks "at what threshold do I pull the plug." Different shape. Both matter.

An automation without a kill condition is just a process you stopped looking at. Decide where the off-ramp is before you need it.

---

## What people get wrong

Three failure modes show up most often.

**Automating before the manual version is trusted.** You haven't done the task by hand enough times to know the failure modes. The automation captures your first guess at what the workflow should be. It calcifies before it's right.

**Automations that go directly to others.** Every direct-output automation is a 3am risk. Most of them should be drafts-for-review for the first few months at minimum.

**No logs, or logs you never read.** Logs that aren't reviewed are scenery. Once a week, scan what the automations did. Notice what surprised you.

---

## Tool-specific footnote

Automation mechanisms vary widely.

| Tool | Automation mechanisms |
|------|----------------------|
| Claude Code | Hooks (event-triggered), scheduled tasks, cron via OS |
| Cursor | Background agents, scheduled tasks |
| Codex | Scheduled jobs, GitHub Actions integration |
| OpenClaw | Native cron + heartbeat, automation marketplace |
| All tools | OS-level cron + scripts as a fallback |

A note on hooks. Hooks are a Claude Code-specific mechanism for *deterministic* enforcement. Non-agent code that runs on tool-use events to block, validate, or modify what the agent tries to do. They're a sibling to automations, not a replacement. Other tools have different mechanisms for the same idea.

---

## Build it

Hand this spec to your agent. Pick one workflow first. Don't ship a full automation library on day one.

```
GOAL: Ship one drafts-for-review automation in my Agent OS.

THE WORKFLOW:
- [Describe the workflow. Confirm I've run it manually at least 10 times
  and know the failure modes.]

PROCESS:
- Pass the 3am test out loud. If this fires at 3am and gets it wrong,
  what's the worst that happens? If the answer is anything that goes
  to another person directly, ship as drafts-for-review only.
- Set up the schedule or trigger in my runtime.
- Wire logging. Every run writes to a single audit log in my vault.
- The output is a draft I review. Not a direct send.

CONSTRAINTS:
- Drafts-for-review only on the first version. No direct outputs.
- Log everything: when it ran, what it read, what it produced, what I
  changed before approving.
- One automation per spec. Don't bundle.

THEN:
- Show me the schedule, the log path, and the first sample run.
- Tell me what I should watch for in the first month.
```

Your agent knows where scheduled tasks live in your runtime. Hand off the spec. Let the agent wire it.

---

## Steward it

Automations are the layer that quietly accumulates. You ship one. You forget about it. Three months later it's still running, against assumptions that no longer hold, producing output nobody reads.

Once a month, list every automation. For each one, two questions. What does this do? Why does it still exist? If you can't answer both in one sentence each, the automation goes off until you can.

This is the entropy frontline. Automations don't fail loudly. They fail by drifting. The audit is the only thing that catches drift before it ships work in your name that you can't account for.

If you can't recite what each automation does and why, you don't have an automations layer. You have a black box producing artifacts you'll be asked to defend.

---

The next chapter is the closing chapter. You've now seen all seven layers. Where to go from here.

---

*References for this chapter: Nufar Gaspar's [Agent OS program (AIDB, April 2026)](https://www.youtube.com/watch?v=ntvkDnk_5jA).*
