---
title: "Connections: What You Reach"
description: "How the agent reaches outside your file system -- email, calendar, CRM, project trackers. The layer where the OS becomes infrastructure. Portable connections first. Vendor connections second."
draft: false
---


Identity is who you are. Context is what you know. Skills are how you work. Memory is what you remember. Connections is what you reach.

So far the system stays inside your file system. The agent reads your identity file. It pulls context from documents you wrote. It fires skills, writes to memory, walks wikilinks across your vault. All of that happens in folders you control.

But your work doesn't live only in folders. It lives in your inbox. Your calendar. Your project tracker. Your CRM. Your databases. The vendor portal. Slack threads. The dozen tools you reach into every day.

Connections are how the agent reaches them too.

---

## What it is

A connection is anything that lets the agent act in a system outside your file system. Read your inbox. Look at your calendar. Pull a row from your CRM. Post a draft to a Slack channel. Query a database. Run a search over your vault.

Without connections, the Agent OS is a smart text editor with persistent memory. With them, it becomes something closer to a colleague who can actually do the thing.

This is the layer where the system stops being a research and writing tool and starts being a working partner.

---

## Why it matters

Most knowledge work involves at least five tools. Email. Calendar. Some kind of task tracker. A document editor. A communication platform. The work that takes you the longest is rarely the actual thinking. It's the moving of information between tools. Briefing yourself for a meeting by stitching together what's in your inbox and what's on your calendar and what's in last week's notes.

That stitching is what connections automate. The agent reads from those sources directly. You stop being the integration layer.

The capability gap between an agent without connections and an agent with the right ones is large. It's the difference between "AI helps me write" and "AI helps me run."

---

## Three ways to connect

The mechanisms vary. The pattern is the same. The agent gets access to a system you already use, and you specify what it can and can't do there.

1. **CLI tools.** The agent runs command-line tools you'd otherwise type yourself. `gh` for GitHub. `aws` for cloud. `qmd` for searching your markdown vault. Whatever your system uses. The agent can read help text and adapt. The most portable mechanism. Any agent that can run a shell command can use any CLI you install.
2. **MCP (Model Context Protocol).** Open standard. A growing ecosystem of pre-built connectors for common tools (Gmail, Slack, GitHub, Notion, etc.). Smoother than CLI inside tools that support MCP. Less portable across tools that don't.
3. **Direct API or scripting.** Your own scripts that hit endpoints. More control, more setup. Useful for systems that don't have a CLI or MCP server yet.

The order matters. CLIs first because they're the most portable. The same `gh` install works inside Claude Code, inside Cursor, inside a Bash terminal you'd run yourself. MCP second because it's smoother where it's supported but not universal yet. Direct scripting third because you only build it when nothing else exists.

---

## Portable first, vendor second

The temptation will be to use whatever the marketplace surfaces. Click an MCP. Done. The friction is low. The lock-in is invisible.

The principle is the same one running through every layer of this course. The substrate has to outlive the tool. A CLI you install on your machine works in any harness that can shell out. An MCP server that ships only with one vendor's runtime works only there. Both are fine. The order of preference matters.

So when you can pick: CLI. When you can't: MCP. When neither: write the script.

This is also the reason memory retrieval lives at this layer too. Your vault sits inside your file system. But getting the agent to find things in it efficiently is a connection problem. A tool like `qmd` is a CLI. The same install works regardless of harness. Memory retrieval stays portable because you chose the connection layer carefully.

---

## Read-only first

The cardinal rule of connections.

When you wire the agent into a new system, give it read access only. Let it look at your inbox without sending. Let it see your calendar without scheduling. Let it pull from the CRM without writing back.

Use it for a few weeks. Watch what it tries to do. Notice what it gets wrong. Build the trust before you give it the keys.

Write access is a one-way door. Once the agent can take action in a real system, the cost of a mistake is real. A misfired email goes out. A wrong calendar invite gets sent. A row gets updated incorrectly. Read-only first is how you keep that cost low while the system earns trust.

---

## The gossiping agent

The gossiping agent is the canonical Connections horror story. It's worth knowing before you wire anything in.

Imagine you give your agent write access to your team's Slack. A colleague messages the agent and asks for "your notes on the Q3 planning meeting." The agent helpfully pastes them, including the part where you wrote a frank assessment of someone's performance. Or your private opinions about a vendor. Or draft feedback you hadn't intended to share.

The agent is doing what it was told. The privacy violation is still real.

Same principle as wallet permissions. You wouldn't give an unknown app signing access to your wallet on day one. Same instinct here. Least privilege is not paranoia. It's the default that prevents damage you couldn't have predicted.

---

## What people get wrong

Three failure modes show up most often.

**Too much access too fast.** The agent gets read AND write on day one across every system. It works fine until it doesn't. Then a misfired action is in production.

**No audit trail.** The agent acts in systems and you don't see what it did until you stumble across it. Logging is not optional for write-enabled connections.

**Wiring without revisiting.** A connection set up six months ago is now reading from a system that's been restructured. The agent operates on stale assumptions and produces stale output. Connections need the same hygiene as identity files and context.

---

## Tool-specific footnote

Connection mechanisms vary by tool. Check what your harness supports.

| Tool | Connection mechanisms |
|------|----------------------|
| Claude Code | Bash tool (any CLI), MCP servers, custom scripts |
| Cursor | MCP marketplace, terminal access, custom integrations |
| Codex | Function calling, tool ecosystem |
| OpenClaw | Native MCP, built-in connectors |
| Hermes Agent | CLI tools, optional MCP |

The portable layer is the CLI. Anything you install on your machine works in any harness with a shell. MCP is the smooth-where-supported layer on top. Worth biasing toward CLI-based connections when you have the choice.

---

## Build it

Hand this spec to your agent. Have it set up the connection in the runtime you're using.

```
GOAL: Wire one read-only connection into my Agent OS.

PICK ONE:
- The system I spend the most time pulling information out of (email,
  calendar, CRM, project tracker, GitHub, my own vault).

PREFERENCE ORDER:
- CLI tool first if one exists. Document the install command and three
  invocations I'd actually use.
- MCP server second if my runtime supports it and no CLI exists.
- Custom script third if neither.

CONSTRAINTS:
- Read-only on day one. No write capabilities.
- Log everything the agent does in this connection to a single file
  in my vault. I'll review it weekly.

THEN:
- Show me the install commands.
- Give me a one-line briefing prompt I can fire daily that uses the
  connection to summarize what changed.
```

Your agent knows what runtime it's in and which connection mechanisms exist there. Hand off the spec. Let the agent pick the cleanest path.

---

## Steward it

Once a month, list every connection the agent has. Three questions per connection. Do I still use the system on the other end? Is the access level still correct (still read-only where it should be)? Is the log still being read?

Every connection that fails any of those gets revoked, downgraded, or retired. Connections you don't audit accumulate silently and become the surface area for the failure modes above.

If you can't recite what each connection does and why it exists, you don't have a connection layer. You have rented attack surface.

---

The next chapter introduces Layer 6: Verification. Identity is who you are. Context is what you know. Skills are how you work. Memory is what you remember. Connections is what you reach. Verification is how you check.

---

*References for this chapter: Nufar Gaspar's [Agent OS program (AIDB, April 2026)](https://www.youtube.com/watch?v=ntvkDnk_5jA). `qmd` as portable retrieval CLI ([tobi/qmd](https://github.com/tobi/qmd)).*
