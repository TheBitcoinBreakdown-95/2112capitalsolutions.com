# Your Agent OS

> The complete course in one document. Get your thinking off rented infrastructure and onto your own.

---

## Why This Course Exists

This course is about how to build the system underneath every AI tool you use.

### The shift

Every serious agentic tool is racing toward the same set of capabilities. Claude Code. Cursor. Codex. OpenClaw. The next harness no one has named yet. Within a year the differences will be aesthetic, not architectural. The tool you pick won't matter as much as you think.

What you build under it will.

That's the shift. From asking AI to using AI. From sessions to systems. From a tool you visit to a system you live in.

### Three claims this rests on

**1. The tool you pick matters less and less.** OpenAI shipped Workspace agents the day this thesis was written. Cursor added agents and automations. Claude Code added auto-memory. Within a year, the differences will be aesthetic and ergonomic, not architectural. Your tool decision is short-lived. Your system decision compounds.

**2. Going from files to an Agent OS is an execution upgrade, not a storage upgrade.** Paper-to-digital was a storage upgrade. Same workflow, faster retrieval. Files-to-Agent-OS is a different shape. The medium isn't changing again. What's changing is whether the system can act on your files. Your old contact list sat in a Rolodex. The digital one sat in your phone. The Agent OS one sends the follow-up.

**3. The OS gets more valuable, not less, as agents get more autonomous.** A more autonomous agent acting on a vague identity, scattered context, and untested skills causes more damage faster. The OS is the brake, the steering, and the manual all in one. The smarter the engine, the more the chassis matters.

### Sovereignty as capability

For most of modern history, managing your own money, your communications, or your knowledge meant going through a trusted third party. The last fifteen years have been an unwinding of that arrangement. The Agent OS is that pattern applied to knowledge work and decision-making.

ChatGPT in a browser is a trusted third party for thought. An Agent OS on your own machine, reading files you control, running on a tool you can swap out tomorrow, is the alternative.

This is a 2112 course. Building an Agent OS is the same shape as running your own node, holding your own keys, hosting your own files. Different layer, same principle.

Sovereignty isn't just protection. It's capability. Owning your system is about producing work that stops looking like one person's work. The integration is the unlock. An agent that knows everything about you, can reach into every tool you use, and runs the workflows you've named. That agent doesn't exist when your AI lives in a browser tab.

A compounding context machine that turns scattered knowledge into executable work.

By the end of this course you'll have a working understanding of the seven layers and a starting version of your own OS, built up using the agentic tool you prefer.

---

## Chapter 1: Stand Up Your Runtime

Before the seven layers, the substrate. None of what comes next lands if you don't have a place to put it.

### Three things you need

1. **A harness.** The agentic tool itself. Claude Code, Cursor, Codex, OpenClaw, Hermes, your pick. The thing that reads files, runs commands, and acts on what you tell it.
2. **A vault.** A folder where your Agent OS lives. Identity files, context, skills, memory, all of it. Plain markdown in a folder you own.
3. **An editor.** Something that opens both the vault and the harness in the same window. VS Code is the cleanest because most harnesses run inside it.

### The worked-example stack

This course is tool-agnostic in spirit but every install path has to commit. The worked examples use:

- **Claude Code** as the harness. Easiest entry point right now. Free for individuals on a Pro plan, real plugin ecosystem, the most documentation per minute of search time.
- **A plain folder** as the vault. Obsidian on top is optional.
- **VS Code** as the editor. Claude Code runs inside its terminal.

If you've picked a different stack, the rest applies in shape. Substitute your tool's install path.

### The starter repo

Clone the [your-agent-os-starter](https://github.com/TheBitcoinBreakdown-95/your-agent-os-starter) repo to skip the manual scaffolding. Skeleton CLAUDE.md, capped MEMORY.md and USER.md, empty context and skills folders with READMEs explaining what goes where. The seven layer chapters fill it in.

```bash
git clone https://github.com/TheBitcoinBreakdown-95/your-agent-os-starter.git
cd your-agent-os-starter
code .
claude
```

### Verify it works

Type into the agent: "Read CLAUDE.md and tell me what you know about who you're working for." If it describes the placeholder identity from the starter, your substrate is wired. The seven layer chapters now have somewhere to land.

### Steward the install path

Once a quarter, run the install on a fresh machine or VM. If a step is broken, the docs are stale or a package moved. Patch before the next reader hits the wall. Reproducibility is the steward discipline for this layer.

---

## Chapter 2: The Director and the OS

Before you build an agent operating system, you need the mental model. No installation, no setup, no commands. Just the shift in thinking that has to happen first.

### The three ways people use AI

Most people are stuck on the first one. The third is what this course teaches.

| | Vibing | Vibe Coding | Directing |
|---|---|---|---|
| **What it looks like** | Chatting with AI in a browser | Watching AI write code | Running an agent in your own files |
| **What survives the session** | A chat history (in someone else's platform) | Source code | Real files in your folders |
| **What carries between tools** | Nothing | The code | Your entire system |
| **What compounds over time** | Nothing | Marginal | Everything |

**Vibing** is asking ChatGPT a question. Fine for quick one-offs. The conversation is locked inside a platform, and when you close the tab, it's gone.

**Vibe coding** is letting AI write code while you watch. Not relevant unless your job is to ship software.

**Directing** is what this course teaches. You're running an agent on your own machine. It reads files you control, creates new ones, organizes your work, and remembers who you are between sessions. You're not renting intelligence by the question. You're building infrastructure.

### Director, not coder, not chatter

You are not learning to code. You are also not just chatting better. You are learning to direct.

A director on a film set doesn't operate the camera. The crew does. The director sets the vision and reviews what comes back. The agent has the technical reach. You bring taste, judgment, the brief.

You direct. It executes. You review. You redirect.

The skill that carries you isn't typing. It's the same skill that makes you good at your job. Knowing what you want. Communicating it cleanly. Recognizing when what came back is right.

### AI is the accelerant, not the source

Two things are easy to get wrong here.

The first. AI is not the source of thought. You bring the idea, the judgment, the standards. AI brings speed. The thinking is still yours. It just happens faster.

The second. The real skill isn't asking better questions. It's building the right environment around the AI so it already understands your situation before you say a word. Better prompts have a ceiling. Better systems don't.

### It's not a chatbot. It's an interface that runs.

Most professionals' relationship to AI is reactive. You open the tool. You type. You close the tab. Nothing carries forward. Nothing organizes itself.

You've felt this somewhere else already. The project tracker you stopped updating. The contact list that drifted out of sync. The CRM everyone agrees is essential and nobody actually maintains. Manual organization always loses to entropy.

The Agent OS is the opposite shape. It runs in the background. It maintains its own context. It organizes work across projects. It coordinates across skills. It tracks what matters.

A chatbot session is like renting a whiteboard for twenty minutes. The Agent OS is closer to a working studio. Your files are there. Your style guide is there. Your projects are there. Your agents know the house rules.

It's still context engineering. The system reads your identity file, pulls in your context, follows the patterns you've encoded. But it's also activation. The system fires skills, runs scheduled jobs, updates its own memory, and coordinates across agents and projects without you having to remember to ask. Both at once.

It's also not a super app. A super app contains features. The Agent OS coordinates work across them.

That's what makes the work compound. Manual systems decay. Active systems improve.

### The seven primitives

Every serious agentic tool ships the same seven primitives, under different names. Identity files the tool reads first. Context files it reaches for on demand. Reusable workflows you fire by name. Persistent memory that survives sessions. Connections to your real systems. Verification. Unattended execution.

The next seven chapters walk through each layer.

### The compounding payoff

A working Agent OS pays off the way infrastructure does. Slowly at first. Then suddenly.

The first agent you build is hard. The second agent takes you an afternoon. It already knows you, your context, your voice, your standards. The third, fifth, tenth agent each get faster. The OS is what compounds. Your individual agents are thin instances riding on top of it.

You won't feel this on day one. You'll feel it three months in.

### The thing that compounds also accumulates

Whatever compounds also accumulates. The same property that makes the OS pay off over time makes it grow into something you may stop being able to operate.

Three months in you have a lot of files. Skills you forgot you wrote. Context that was true two quarters ago. Memory you haven't pruned. Automations running against assumptions that no longer hold. The OS keeps producing output. You stop being able to recite what it does or why.

The fix isn't a smaller system. It's a discipline. Outsource the work. Don't outsource the understanding. You'll see this thread again in every layer.

### The point that survives every news cycle

You'll hear that agents are about to get much more autonomous. That careful infrastructure today will be obsolete soon.

The opposite is true. A more autonomous agent acting on a vague identity, scattered context, and untested workflows causes more damage faster. The OS is the brake, the steering, and the manual all in one. The smarter the engine, the more the chassis matters.

---

## Chapter 3: Identity

Identity is who you are. The file the agent reads first.

Before any prompt you type. Before any memory it has of you. Before any context file it reaches for. The agent reads this one first. If it doesn't exist, the agent starts from zero. Every conversation. Every time.

### What it is

Identity is a plain text file that lives somewhere the agent reads on startup. It tells the agent who it's working for. It captures what doesn't change between conversations. Your role. Your style. Your standards. Your hard rules.

Without it, every conversation is the agent meeting you for the first time. With it, every conversation starts from where the last one left off.

### Why it matters

Generic AI gives generic output. Specific AI gives specific output. The gap between "this is fine" and "this is exactly what I needed" comes down to whether the agent knows who you are before you start typing.

A new colleague asks who you are on day one and never asks again on day two. That's identity in the human world. Stored once, referenced forever. An agent without an identity file is a colleague who introduces himself every morning.

### The foundation property

The identity file is what the rest of the OS references. Every other layer assumes it's there and reads from it. Get it wrong and the agent still works. It just works less well, and you don't always know why.

### What goes in

Useful identity files cover four kinds of information.

1. **Who you are.** Your role, what you do, what you're working on. The version you'd give a new colleague on day one.
2. **How you communicate.** Direct or diplomatic. Bullets or prose. Short or thorough.
3. **What you value.** Concise over lengthy. Challenge over execute. Reasoning shown over answer-only.
4. **What you don't want.** No flattery. No hedging. No emojis. No restating the question. The pet peeves.

The fourth one carries more weight than people expect. A sentence saying "never do X" prevents X for every conversation forever, instead of you correcting the same drift twenty times a week.

### Hard rules: what must always be true

The four kinds above describe how you want to work. There's a fifth thing the agent needs in writing... what must never break.

Hard rules are the lines you don't cross. Not goals. Not preferences. Yes-or-no tests the agent has to pass before any output ships. Examples: "Client emails are drafted only, never sent without my approval." "Numbers in any draft are sourced from a real document, never paraphrased." "Anything destined for an external system gets logged to my audit file."

These look restrictive. They're protective. Without them, the agent is optimizing in a space that includes the wrong answer. With them, the wrong answer is removed before the agent reaches for it. And every hard rule turns into a verification check for free.

Two or three on day one is plenty. Add a rule the next time you catch the agent doing something that should never have been possible.

### The brain-dump methodology

Don't write the file from scratch by yourself. You will hate it. You will quit.

Open the tool. Tell it: "I'm building my identity file. Ask me fifteen questions about how I work, what I want, what I don't want." Then answer. The agent drafts. You edit. You ship a first version that's about seventy percent right. You patch over the next few weeks.

It works because you're not designing your identity file. You're discovering it.

### Two ways people quit

The first is the perfect-file trap. People sit down to write the perfect file. They produce something that reads like a personality test. They hate it and quit.

The second is the write-once trap. They build a useful first version and never touch it again. Six months later it describes a job they no longer have.

Identity is a practice, not a project. Every time you correct the same drift twice, ask whether it should go in the file. Most of the time the answer is yes.

---

## Chapter 4: Context

Identity is who you are. Context is what you know.

Generic AI advice is one Google search away. What isn't on the public internet is your situation. Your roadmap. Your customers. Your stakeholders. Your priorities for the next quarter. The agent doesn't know any of it unless you put it somewhere the agent can read.

### What it is

Context lives in files separate from your identity file. The identity file tells the agent who it's working for. Context files tell the agent what's true about the work it's doing.

These aren't part of any prompt you type. They sit in your workspace, in folders the agent can navigate. The agent pulls them in on demand.

It's the part of the system that lives on your machine and stays there. The files are yours. Other tools can read them if you switch.

### Why it matters

The single biggest predictor of generic vs specific output is whether the agent has access to context the public internet doesn't.

A consultant asked "what should I prioritize this quarter?" gives a generic answer. The same consultant with your stakeholder map, your roadmap, and your last three OKR cycles gives you something you can act on. The difference isn't intelligence. It's information access.

Better models won't help. No model release will know what you're shipping next quarter or who your stakeholders are. That information has to come from you. Always.

### The 3-5 file rule

The most common failure isn't the absence of context. It's context done badly.

People sit down to "context engineer" their workspace and produce a single forty-page document covering everything. They never update it. Six months later it's a stale novel.

What works: three to five focused files, each one page, each on a single topic. Stakeholders. Strategy. Customers. Quarter. Operating principles. Each file dated. Each updated when something changes.

The instinct will tell you to go big. The discipline is to stay small and current.

### What goes in

Five files most knowledge workers benefit from having.

1. **People.** Who you work with. Who reports to you. Who you report to. Your key cross-functional partners. What each one cares about.
2. **Strategy.** What you're trying to achieve this year. What's been deprioritized.
3. **Operating principles.** How decisions get made. What you push back on. What you escalate.
4. **Active projects.** What's in flight. What's blocked. What's due when.
5. **Past decisions.** What got decided, why, what alternatives were considered.

You don't need all five on day one. You need one. The one you reach for most often. Then the next one.

### The curation practice

Context is not a project. It's a practice.

Every time you catch yourself re-explaining your situation to the agent, that thing should have been in a context file. Write it down. Add it to the library. Move on.

The signal that the practice is working: you stop pasting the same paragraph into the start of every conversation. The library does it.

---

## Chapter 5: Skills

Skills are how you work.

If you've shipped a few projects with an agent, you've felt this. The same patterns come up again and again. Drafting a stakeholder email. Prepping for a meeting. Writing a weekly update. Triaging the inbox.

The first time you do one with the agent, you brief it from scratch. The second time, you find yourself pasting the same instructions back in. The third time, you should be done explaining.

### What it is

A skill is a saved workflow the agent can fire by name.

You write down once how a recurring task should be done. What triggers it. What process to follow. What sources to pull from. What format to output. The agent reads the skill on demand. You stop re-explaining. You start invoking.

It's the layer where your work patterns get encoded into a system that runs them consistently, in your voice, against your context, every time. And it's the first place the Agent OS stops waiting and starts firing.

### Why it matters

Without skills, every conversation is a fresh brief. You re-explain the format. You re-paste the source material. You complain that the agent writes in a weird voice.

A skill fixes that. Write it once. It fires forever.

The cost of not having skills is friction tax. Death by a thousand re-explanations. Every conversation that should take one prompt takes five.

Most knowledge workers have twenty to thirty workflow patterns they repeat. The ones you encode become portable. The ones you don't stay locked inside your routine.

### The Rule of Three

Don't write a skill the first time you do something. You don't know enough yet.

- **First time:** exploration. You're figuring out how the task works.
- **Second time:** pattern recognition. You notice you've done this before.
- **Third time:** encode it. You're going to do it again.

Encode too early and the skill is a guess. Encode too late and you're paying friction tax for months. Three is the sweet spot.

### What goes in

Useful skills tend to specify four things.

1. **Trigger.** When the skill should fire.
2. **Process.** How to do the task, step by step.
3. **Sources.** What context files or external data the skill should pull in.
4. **Output format.** What the result should look like.

Together: when *trigger*, do *process* using *sources*, produce *output*. That's the whole shape.

### Keep skills thin

A common failure is the kitchen-sink skill. Someone tries to encode their entire workflow library into one massive document. The skill becomes 1,400 lines. The agent loads it for everything and applies it well to nothing.

The opposite move works. Each skill stays around forty lines. It encodes one workflow, with two or three concrete examples. Detailed reference docs live elsewhere. The skill points to them.

Thin skills compound. A library of fifteen tight skills covers more ground than three sprawling ones.

### What people get wrong

Three failure modes show up most often.

**The vague trigger.** "Use this for content tasks" matches everything and nothing.

**The stale skill.** A skill written six months ago that references a process you've since changed. Worse than no skill at all because you trust it.

**The over-encoded skill.** Trying to capture a workflow before you've done it three times. Calcifies your first guess.

---

## Chapter 6: Memory

Memory is what carries forward.

Every conversation you've had with the agent contains things worth remembering. A decision you made. A constraint you discovered. A workflow that finally worked. Most of it gets lost when you close the session. The agent forgets. You start the next session re-explaining what you already explained.

### What it is

Memory is the layer that lets the agent retain knowledge across sessions. Not just within one conversation. Across all of them. The decisions you've made. The patterns you've corrected. The facts about your work that keep coming up.

Two questions decide what memory looks like in your OS. Where do the bytes live. And how does the agent get them back. Get those right and memory stops being a feature you enable. It starts being a place you keep things.

### The substrate is your vault

Most memory systems on the market store your knowledge in a database the vendor controls. Convenient on day one. A rental on day three hundred.

The portable version is plain markdown in a folder you own. An Obsidian vault is the obvious shape. Plain text. One file per topic. `[[wikilinks]]` between them. A folder structure that maps to your work.

The vault is your memory. The agent reads it like you would. Wikilinks are the retrieval graph. No database, no migration, no lock-in. You hold the artifact.

### Bounded files, not buckets

The most counterintuitive memory pattern in the field comes from Hermes Agent. Cap the file. About 2KB for the agent's working notes. About 1.5KB for the user profile. The cap looks restrictive. It's the whole point.

Unbounded memory becomes a graveyard. The good signal drowns in stale noise. You stop reading it. A bounded file forces curation. When the file is full, something has to leave for the new thing to enter. The constraint does the work.

The cap is the discipline.

### Two kinds of memory, two different problems

Memory in the wild is two different things stuffed under one word.

**Long-term curated memory.** What you've decided. What you've learned. The patterns you've encoded. This is the vault. Markdown files. Wikilinks. Bounded. Curated. Survives years and tools.

**Session-to-session continuity.** What happened in last week's debugging session. What the agent tried at 3pm yesterday. Tools like `claude-mem` exist for this. Auto-capture activity, AI-compress it, inject relevant slices into the next session. The vault doesn't replace this. They sit next to each other.

People conflate them and end up under-served on both. Treat them as separate.

### Retrieval is its own decision

Once the vault exists, the agent needs a way to find things in it. Three options on a spectrum.

1. **The agent reads files directly.** Open the vault, follow wikilinks, glob for filenames. Slow when the vault gets big.
2. **A local CLI search tool.** Something like `qmd`. Hybrid keyword and vector search. Lives on your machine. Any agent that can run a shell command can use it. No vendor required.
3. **An MCP server in front of the same files.** Smoother in tools that support MCP. Locks the retrieval mechanism to a specific tool.

The portable default is the first two combined. Plain files plus a CLI search tool. MCP becomes a convenience on top of that, not a replacement for it.

### What goes in

Useful memory captures three kinds of information.

1. **Decisions.** What you decided, why, what alternatives you considered.
2. **Learnings.** What worked, what didn't, the gotchas you discovered the hard way.
3. **Relationship and situation context that won't fit in the regular context files.**

The first one carries more weight than people expect. Decisions you made six months ago shape the work you're doing today. Without a record, you re-litigate them every quarter.

### What people get wrong

**The auto-memory-only trap.** You assume the tool's built-in memory is doing all the work. It isn't. Auto-memory captures activity, not significance.

**The memory graveyard.** You write things down. You never read them. Six months later it's a hundred notes none of which the agent ever surfaces. The bounded-file discipline prevents this.

**The platform vault.** You let your memory live inside a vendor's app. The features look good. The dependence is silent. When the vendor changes the terms, the memory you built is hostage. Plain markdown in your own folder doesn't have this problem.

### Outsource the work, not the understanding

Memory is the first place where an Agent OS starts to feel like it's running you instead of you running it. The agent writes more than you read. The vault grows faster than you tend it.

You can outsource the *work* of writing the file. You can't outsource the *understanding* of what's in it. If the agent maintains a memory file, you read it once a week. If a wikilink connects two notes, you can still walk that connection in your head. The minute you can't, the system is operating beyond your comprehension.

Bounded files help. Weekly review helps more. The discipline is keeping the OS small enough that you remain its director.

---

## Chapter 7: Connections

Connections is what you reach.

So far the system stays inside your file system. The agent reads your identity file. It pulls context from documents you wrote. It fires skills and writes to memory. All of that happens in folders you control.

But your work doesn't live only in folders. It lives in your inbox. Your calendar. Your project tracker. Your CRM. Your databases. Slack threads. The dozen tools you reach into every day.

Connections are how the agent reaches them too.

### What it is

A connection is anything that lets the agent act in a system outside your file system. Read your inbox. Look at your calendar. Pull a row from your CRM. Post a draft to a Slack channel.

Without connections, the Agent OS is a smart text editor with persistent memory. With them, it becomes something closer to a colleague who can actually do the thing.

This is the layer where the system stops being a research and writing tool and starts being a working partner.

### Why it matters

Most knowledge work involves at least five tools. The work that takes you the longest is rarely the actual thinking. It's the moving of information between tools. Briefing yourself for a meeting by stitching together what's in your inbox and what's on your calendar and what's in last week's notes.

That stitching is what connections automate. The agent reads from those sources directly. You stop being the integration layer.

The capability gap between an agent without connections and an agent with the right ones is large. It's the difference between "AI helps me write" and "AI helps me run."

### Three ways to connect

The mechanisms vary. The pattern is the same. Order of preference matters.

1. **CLI tools.** The agent runs command-line tools you'd otherwise type yourself. `gh` for GitHub. `aws` for cloud. `qmd` for searching your markdown vault. The most portable mechanism. Any agent that can run a shell command can use any CLI you install.
2. **MCP (Model Context Protocol).** Open standard. A growing ecosystem of pre-built connectors. Smoother than CLI inside tools that support MCP. Less portable across tools that don't.
3. **Direct API or scripting.** Your own scripts that hit endpoints. More control, more setup. Useful for systems that don't have a CLI or MCP server yet.

CLIs first because they're the most portable. The same `gh` install works inside Claude Code, Cursor, or a Bash terminal you'd run yourself. MCP second because it's smoother where supported but not universal. Scripting third because you only build it when nothing else exists.

### Portable first, vendor second

The substrate has to outlive the tool. A CLI you install on your machine works in any harness that can shell out. An MCP server that ships only with one vendor's runtime works only there. Both are fine. The order of preference matters. So when you can pick: CLI. When you can't: MCP. When neither: write the script.

### Read-only first

The cardinal rule of connections.

When you wire the agent into a new system, give it read access only. Let it look at your inbox without sending. Let it see your calendar without scheduling.

Use it for a few weeks. Build the trust before you give it the keys.

Write access is a one-way door. Once the agent can take action in a real system, the cost of a mistake is real. A misfired email goes out. A wrong calendar invite gets sent. Read-only first is how you keep that cost low while the system earns trust.

### The gossiping agent

The canonical Connections horror story.

You give your agent write access to your team's Slack. A colleague messages the agent and asks for "your notes on the Q3 planning meeting." The agent helpfully pastes them, including the part where you wrote a frank assessment of someone's performance.

The agent is doing what it was told. The privacy violation is still real.

You wouldn't give a new contractor the master keys to your house on day one. Same instinct here. Least privilege is not paranoia. It's the default that prevents damage you couldn't have predicted.

---

## Chapter 8: Verification

Verification is how you check.

The worst failure mode of an Agent OS isn't that it fails. The worst failure mode is that it works confidently, produces something that looks right, and ships before you notice it isn't.

### What it is

Verification is the habit of checking the agent's work before you trust it. Two flavors run at the same time.

**Per-task verification.** Quick checks on every output. Did the email actually say what I told it to say? Does the budget add up? Are the numbers cited from real sources?

**System-level verification.** Periodic audits of the whole Agent OS. Are the skills still working? Are the context files still fresh?

Both layers matter. Most people skip both.

### Why it matters

AI output looks confident. Always. The model is built to produce text that reads as authoritative whether or not it's right.

That's the problem. A confidently wrong answer, accepted without checking, is worse than a refusal. Refusals are visible. Errors that look right are not. They get shipped, get acted on, and the cost compounds before anyone notices the source.

### The cheapest tool you'll ever have

Before any other verification trick, learn this one. Ask the agent:

> "What are you least confident about in this output?"

The agent will tell you. The places it was guessing. The claims it pulled from thin air. These are the spots to check first.

This single question replaces hours of fishing for errors. It's not a substitute for verification. It's the trick that tells you where to verify.

### Three to five checks per task

Beyond the "least confident" question, build a habit. Three to five quick checks per task type. Each one under a minute.

For drafts: tone match. Fact spot-check. Names spelled correctly. Sources real.

For analyses: numbers run. Methodology stated. Counter-cases considered.

For decisions: alternatives named. Constraints respected. The case against actually steelmanned.

After a few weeks the right checks for the work you do most become automatic.

### Verify artifacts, not self-reports

The most important verification principle. Check what the system actually produced. Not what it says it produced.

The agent will tell you "I've drafted the email and added it to your outbox." Open the outbox. Read the draft. The agent will tell you "All the citations are real." Click two of them.

Self-reports are a prediction of what happened. The artifact is proof. They diverge more often than you'd expect.

### The shelf-life problem

The system-level version of verification is the periodic audit. Your Agent OS has a shelf life of about eight weeks before things start to drift. Skills that referenced a process you've changed. Context files that describe a project that's been deprioritized.

The fix is a calendar reminder. Once a month or so, walk the layers. Read the identity file. Skim the context files. Run a few skills. Open the memory file and prune what's no longer load-bearing. Audit the connections.

Most tools will help you do this. Ask yours: "What's not being used? What hasn't been updated?"

Without the audit, the OS has a shelf life. With it, the OS compounds forever.

### What people get wrong

**Trusting confident output.** The most common one. Fix: the "least confident" question and the three-check habit.

**Verifying only when something feels off.** By the time it feels off, you've usually accepted three earlier outputs that should have been checked.

**Skipping the system audit.** Per-task verification stays diligent. Whole-system staleness check never happens.

---

## Chapter 9: Automations

Automations is how it runs unattended.

Until now the system has been reactive. You sit down. You fire a skill or open a session. The agent does the work.

Automations is where the system stops needing you in the loop. Scheduled jobs that fire on their own. Briefings that arrive before you ask. Monitors that ping you when something changes.

This is the layer where the Agent OS becomes actual infrastructure.

### What it is

An automation is anything the agent does without being prompted by you in real time. Two main flavors.

**Scheduled.** Cron jobs and time-based triggers. Daily morning briefing at 7am. Weekly status summary on Friday. Monthly OS audit.

**Event-triggered.** Something happens. An email arrives, a file changes, a deadline approaches. The automation fires in response.

Both share the same property. The agent acts when you're not watching.

### Why it matters

Without automations, you're still the trigger. With automations, the agent starts producing work on the schedule you set, against the rules you wrote, on the systems you've connected.

The compounding gets steep here. A working set of automations means you wake up to a daily brief that pulled from your inbox, your calendar, and your project tracker. Your weekly review writes itself. Your inbox gets triaged before you open it.

This is also the layer with the most risk.

### The three rules

Non-negotiable. Memorize them before wiring anything.

**1. Only automate workflows you've run manually enough times to trust.** If you haven't done a task by hand at least five or ten times, you don't yet know what good looks like. Automating an untested workflow is automating a guess.

**2. Start with automations that produce drafts for review, not outputs that go to other people.** The agent drafts the email. You approve before it sends. Drafts-for-review is the slow lane that lets you catch the failures the system would otherwise commit on your behalf.

**3. Always log what ran and what it did.** When something goes wrong at 3am, and eventually it will, the log is what tells you what happened. No log, no diagnosis.

### The 3am test

Before you turn an automation on, run it through the 3am test.

If this automation fires at 3am and gets it wrong, what's the worst that happens?

If the answer is "an email goes to a client that I'd want to retract," don't ship it as a direct-output automation. Ship it as drafts-for-review.

If the answer is "I get a slightly off morning briefing," fine, ship it. The cost of a bad brief is low.

The 3am test calibrates your appetite for direct-output automations. Most things you'd be tempted to automate fail it. That's fine. Drafts-for-review still saves you the work of starting from blank.

### Kill criteria

Before you turn an automation on, decide what would make you turn it off.

Two drafts in a row I had to fully rewrite. Three runs that produced nothing. One run that cost more than five dollars. A log entry that includes a name I don't recognize. Pick three or four. Write them down. Wire them as auto-pause conditions if your runtime supports it. Calendar reminder if it doesn't.

The 3am test asks "what's the worst that happens." Kill criteria asks "at what threshold do I pull the plug." Different shape. Both matter. An automation without a kill condition is just a process you stopped looking at.

### What people get wrong

**Automating before the manual version is trusted.** You haven't done the task by hand enough times to know the failure modes.

**Automations that go directly to others.** Every direct-output automation is a 3am risk. Most should be drafts-for-review for the first few months.

**No logs, or logs you never read.** Logs that aren't reviewed are scenery. Once a week, scan what the automations did. Notice what surprised you.

The goal isn't full automation. The goal is the right amount of automation for each kind of work.

---

## Where to Go From Here

You've now seen all seven layers.

Identity. Context. Skills. Memory. Connections. Verification. Automations.

Each one is its own concept. Together they're the system underneath whatever agentic tool you choose. The Agent OS is what survives when the tool changes. It's also what compounds when the tool stays the same and you keep building.

### The system that compounds

The first version of your Agent OS will feel like a lot of files.

A CLAUDE.md or AGENTS.md for identity. A handful of context files. Two or three skills you've encoded. A MEMORY.md for decisions worth keeping. One read-only connection. A verification habit. Maybe one drafts-for-review automation.

That's the starter. It's not impressive on day one.

Three months in, it changes. The agent doesn't feel like a chatbot. It feels like a partner that knows the work.

That's the compounding payoff. It doesn't arrive all at once. It arrives as the system you maintain.

### The hard part is starting

Most people who fail at this fail at the same place. They read about the seven layers, plan an elaborate first version, and never ship.

Start with one of each.

One identity file. Three lines. One context file. One skill, after the third time you do something. One memory file, opened the next time you make a decision. One read-only connection. The "What are you least confident about?" question, asked at the end of every important task. One automation, optional, later.

Within a month you have a working Agent OS. Not impressive yet. But operational. The system improves from there.

### What you're actually building

The thing you're building isn't an agent. It isn't a chatbot. It isn't even a productivity system in the usual sense. It's a piece of personal infrastructure.

Hold your own files. Own your own context. The platform becomes optional.

You're not building this because the tools are bad. You're building it because the layer underneath the tools is what makes the work yours. The system you accumulate is what survives every tool change, every model release, every platform pivot. Infrastructure compounds. Rentals don't.

### The OS that builds on itself

The next question, after the layers are running, is how the system grows without becoming something you can't operate. Three projects worth studying.

- **Hermes Agent.** Open-source self-improving agent. Bounded MEMORY.md and USER.md, agent-curated. Auto-creates skills when a task crosses a complexity threshold. The most mechanically rigorous treatment of "improvement without graveyard."
- **claude-mem.** Session-to-session continuity for Claude Code. Captures activity, AI-compresses it, injects relevant slices into the next session. The "what happened yesterday" layer.
- **LLM Wiki.** A contrarian take on building a self-improving wiki without Obsidian. Worth reading even if you stay on the vault path.

Three different shapes for the same problem. None is THE answer. They're the design space you're choosing inside of.

### Outsource the work, not the understanding

The closing principle. Carry it into everything you build from here.

The Agent OS lets you outsource the typing, the summarizing, the searching, the drafting, the scheduling, and the file-shuffling. It cannot outsource the part where you know what's in your system and why. The minute it does, you stop being the director and start being a passenger in your own work.

So you outsource the work. You keep the understanding. You read what the agent writes to your memory file. You can recite what each skill does. You can defend what each automation produces. You retire what you no longer use. The system stays small enough that you remain its operator.

This is the discipline that turns a compounding system into one you still control three years in. The seven layers are how you build it. This is how you keep it.

You now have the system. The work is yours.

Stop vibing. Start building.

---

## Tool-Specific Implementation

What each layer is called depends on your tool. The pattern is universal. The filename isn't.

| Layer | Claude Code | Cursor | Codex | OpenClaw | Hermes Agent |
|-------|-------------|--------|-------|----------|--------------|
| **Identity** | `CLAUDE.md` | `AGENTS.md` or `.cursorrules` | `AGENTS.md` | `SOUL.md` | `~/.hermes/identity` |
| **Context** | files in project folder | `@filename` references | project context | context files | files + `qmd` retrieval |
| **Skills** | `.claude/skills/SKILL.md` | `.cursorrules` patterns | `AGENTS.md` sections | Skills system | `~/.hermes/skills/` |
| **Memory** | `MEMORY.md` + `claude-mem` plugin | Project memory, summarization | Persistent context | Native memory | bounded `MEMORY.md` + `USER.md` + FTS5 |
| **Connections** | Bash + MCP servers | MCP marketplace + terminal | Function calling | Native MCP | CLI + optional MCP |
| **Verification** | `--dry-run`, hooks, custom skills | Diff review, accept/reject | Run-before-merge | Native audit | custom skills |
| **Automations** | Hooks, scheduled tasks, cron | Background agents | GitHub Actions | Native cron | scheduled skills |

Plus the universal one. The "What are you least confident about?" question works in every tool.

For Claude Code-specific implementation, see the [Claude Code Guided Course](https://github.com/TheBitcoinBreakdown-95/Claude-Code-Guided-Course).

---

## Sources & References

The seven-layer Agent OS model is the field's converging consensus, packaged most recently by Nufar Gaspar in [The AI Daily Brief's Agent OS program](https://www.youtube.com/watch?v=ntvkDnk_5jA). For the chief-of-staff running example and the deepest version of each layer, that's the canonical resource.

For Claude Code-specific implementation: [Claude Code Guided Course](https://github.com/TheBitcoinBreakdown-95/Claude-Code-Guided-Course). This course is the spec. That course is the build.

Conceptual ancestors:

- Andrej Karpathy, "LLM as an Operating System" (2023). The original framing of LLMs as the OS layer for new computing.
- Steph Ango, "File Over App" (2023). The portability principle that makes the Agent OS viable.
- Ethan Mollick, *Co-Intelligence*. The human-side framing of how to actually work with AI.

Architectures for the OS that builds on itself:

- Hermes Agent ([nousresearch/hermes-agent](https://github.com/nousresearch/hermes-agent)). Bounded memory, agent-curated skills, self-improvement at the skill and memory layer. The mechanically rigorous version of the entropy-management problem.
- claude-mem ([thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)). Session-to-session continuity for Claude Code. The "what happened yesterday" layer.
- qmd ([tobi/qmd](https://github.com/tobi/qmd)). Local CLI hybrid search engine for markdown. The portable retrieval primitive.

For the deepest engineering-flavored treatment, the AIOS research papers are worth searching. They're more academic but they cover the ground systematically.

For the broader 2112 Capital Solutions work on personal infrastructure across more than just the AI layer, see [2112capitalsolutions.com](https://2112capitalsolutions.com).

---

*This document is the single-page version of the full ten-chapter course at `/courses/your-agent-os` on the 2112 site. Chapter-level files live at `astro/src/content/courses/your-agent-os/`. Source/working docs live at `courses/your-agent-os/`.*
