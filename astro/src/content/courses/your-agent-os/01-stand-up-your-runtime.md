---
title: "Stand Up Your Runtime"
description: "Install the harness, set up the vault, open the editor. Half an hour of setup before the seven layers have a place to live."
draft: false
---


Before the seven layers, the substrate.

This course teaches what an Agent OS is and how to build one. None of that lands if you don't have a place to put it. So before Chapter 02 hands you the mental model, this chapter gets you a working runtime, a folder for the OS to live in, and an editor that can see both.

Half an hour. Mostly waiting for things to download.

---

## Three things you need

Before any layer chapter makes sense, you need three things on your machine.

1. **A harness.** The agentic tool itself. Claude Code, Cursor, Codex, OpenClaw, Hermes, your pick. The thing that reads files, runs commands, and acts on what you tell it.
2. **A vault.** A folder where your Agent OS lives. Identity files, context, skills, memory, all of it. Plain markdown in a folder you own.
3. **An editor.** Something that opens both the vault and the harness in the same window. VS Code is the cleanest because most harnesses run inside it.

That's the whole substrate. The seven layer chapters that follow assume all three exist.

---

## The worked-example stack

This course is tool-agnostic in spirit but every install path has to commit to a specific stack. Here's the one the worked examples use.

**Claude Code** as the harness. It's the easiest entry point right now. Free for individuals on a Pro plan, real plugin ecosystem, the most documentation per minute of search time. The seven layers map cleanly onto its primitives.

**A plain folder** as the vault. You can use Obsidian on top if you want a graph view and link autocomplete. Obsidian is optional. The folder is required.

**VS Code** as the editor. Claude Code runs inside its terminal. The vault opens as a workspace. Both visible in one window.

If you've already picked a different stack, the rest of this chapter still applies in shape. Substitute your tool's install path. The principle is the same. Stand up the harness, the vault, and the editor before Chapter 02.

---

## Install path

Five steps. Run them in order.

**1. Install Node.js.** Claude Code needs it. Grab the LTS version from [nodejs.org](https://nodejs.org). Confirm it works.

```
node --version
```

**2. Install Claude Code.**

```
npm install -g @anthropic-ai/claude-code
```

Then run `claude` from any folder. It'll walk you through authentication in your browser. First time only.

**3. Install VS Code if you don't have it.** Get it from [code.visualstudio.com](https://code.visualstudio.com). Open it once. That's enough.

**4. Clone the starter repo.**

```
git clone https://github.com/TheBitcoinBreakdown-95/your-agent-os-starter.git
cd your-agent-os-starter
```

The starter is the substrate the rest of the course fills in. A skeleton CLAUDE.md. A capped MEMORY.md. Empty context, skills, and decisions folders with READMEs explaining what goes where. You'll write into all of them as the chapters progress.

If you'd rather build the structure manually, the README in the repo describes the layout. Five folders and six files. About ten minutes by hand.

**5. Open the project in VS Code and start Claude Code.**

```
code .
```

Then in VS Code's integrated terminal, run:

```
claude
```

The agent boots. It reads the CLAUDE.md you just cloned. The runtime is live.

---

## Verify it works

One command before you move on. Type this into Claude Code:

> "Read CLAUDE.md and tell me what you know about who you're working for."

The agent should describe the placeholder identity from the starter repo. If it does, your substrate is wired up. The agent can read the vault. Chapter 02's mental model now has somewhere to land.

If it doesn't... walk back through the steps. Most failures here are authentication (step 2) or wrong working directory (step 5). Both are fixable in a minute.

---

## Tool-specific footnote

Claude Code is the worked example. The same shape works in other harnesses with different commands.

| Tool | Install command | Identity file the harness reads first |
|------|-----------------|---------------------------------------|
| Claude Code | `npm install -g @anthropic-ai/claude-code` | `CLAUDE.md` |
| Cursor | Download installer from cursor.sh | `.cursorrules` or `AGENTS.md` |
| Codex | Cloud-only, no install | `AGENTS.md` |
| OpenClaw | Per the OpenClaw install docs | `SOUL.md` |
| Hermes Agent | `npm install -g hermes-agent` | `~/.hermes/identity` |

If you're using one of these instead, the rest of the install path is the same in shape. Install the harness. Clone the starter repo. Rename the identity file to whatever your harness expects. Open the folder. Run the agent inside it.

The starter repo's README has notes on the rename for each major harness.

---

## Steward it

Reproducibility is the steward discipline for the runtime layer.

Once a quarter, on a fresh machine or VM, run the install path from scratch. If a step is broken, the docs are stale, the package name moved, or you're out of date on something. Patch the install path before the next reader hits the same wall.

This is the only layer where "steward it" means proving you can recreate it from zero. Every other layer compounds. This one needs to keep working from a cold start.

---

## What you have now

A working harness. A folder where the OS will live. An editor that opens both. Authentication wired. The agent can read your CLAUDE.md and answer about the placeholder identity it just loaded.

The substrate is in place. The seven layers will fill it.

---

The next chapter introduces the mental model that makes the rest of the course click. The Director and the OS.

---

*References for this chapter: [Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code/quickstart). The companion starter repo at [github.com/TheBitcoinBreakdown-95/your-agent-os-starter](https://github.com/TheBitcoinBreakdown-95/your-agent-os-starter). The [Claude Code Guided Course](https://github.com/TheBitcoinBreakdown-95/Claude-Code-Guided-Course) for the deeper Claude-Code-specific implementation walkthrough.*
