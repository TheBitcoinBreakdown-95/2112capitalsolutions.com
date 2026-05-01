---
title: "Local AI on your own machine"
description: "Ollama plus a local model plus a workflow. What runs offline, what doesn't, and the trade-offs worth knowing about."
pubDate: 2026-03-18
category: "AI"
level: "Intermediate"
readingTime: "24 min read"
draft: false
---

Most "AI assistant" workflows route every keystroke through OpenAI, Anthropic, or Google. The convenience is real. The privacy cost is also real, and not always visible. This guide walks through running a capable AI workflow entirely on your own machine — what it costs, what it can and can't do, and where the trade-offs are.

This is not a "local AI is better than cloud AI" piece. It's a "here's how to run local AI competently if you've decided you want to" piece. The decision of whether you want to is yours.

## What "local AI" actually means

You download a model file (anywhere from 2 GB to 70 GB depending on capability), and your computer runs the model directly when you ask it questions. Nothing leaves the machine. No API calls, no telemetry, no rate limits.

The trade-offs:

- **Capability.** A 70-billion-parameter local model is roughly equivalent to GPT-3.5 from 2022. The frontier (GPT-5, Claude Opus 4.7, Gemini Ultra) is currently a year or two ahead of what you can run on consumer hardware.
- **Speed.** A frontier cloud model returns 100+ tokens per second. A local model on a MacBook M4 Pro runs at 30–60 tokens per second for medium-sized models.
- **Hardware.** You need at least 16 GB unified memory (Mac) or 16 GB VRAM (NVIDIA) to run anything useful. 32 GB is the comfortable floor; 64 GB lets you run the biggest models worth running.
- **Setup.** Cloud is one API key. Local is one install + one model download + some config.

The tradeoff math: if your work involves anything sensitive (legal documents, business strategy, code under NDA, personal communications), local AI is probably worth the capability hit. If your work is routine and the privacy stakes are low, cloud is faster.

## The stack we use

For most clients, this is the local stack:

1. **Ollama** ([ollama.com](https://ollama.com)) — the runtime. Manages models, exposes a local API at `localhost:11434`.
2. **A model.** We default to `llama3.3:70b` for general work, `qwen2.5-coder:32b` for code, `mistral:7b` for fast iteration on small tasks.
3. **A client.** Pick one: [Open WebUI](https://github.com/open-webui/open-webui) for browser-style chat, [BoltAI](https://boltai.com) on Mac for native integration, or just `curl` to the API for scripts.

That's the whole stack. No accounts, no subscriptions, no data leaving the machine.

## Install

On Mac:

```bash
brew install ollama
ollama serve   # leave this running in a terminal
```

In another terminal:

```bash
ollama pull llama3.3:70b
ollama run llama3.3:70b
```

The first pull is slow — 40 GB on a typical home connection takes 1–2 hours. Once pulled, subsequent runs start in seconds.

On Linux: same as above but use the install script from ollama.com instead of brew.

On Windows: there's a native installer. WSL2 also works if you prefer the Linux flow.

## What runs offline

Once installed and pulled:

- Chat — conversation, drafting, summarization, reasoning
- Code generation, code review, debugging help
- Document analysis (paste in long documents, ask questions)
- Translation, structured extraction, formatting

What does not run offline (yet, on consumer hardware):

- Image generation at frontier quality (Midjourney, DALL-E level)
- Real-time voice (some workflows exist but are awkward)
- Anything involving live web search (the model doesn't know about events after its training cutoff)
- Multimodal video understanding

## Workflow integration

Two patterns we install with clients:

**Pattern A — replace ChatGPT.** Open WebUI runs at `localhost:3000`. Bookmark it as your "AI assistant." Behaviorally identical to ChatGPT, but zero data leaves the machine. Best for users who used ChatGPT for one specific workflow.

**Pattern B — script the API.** Most useful work isn't chat — it's scripts. Build a small library of bash scripts that call `localhost:11434` for specific tasks: summarize this transcript, extract structured data from these emails, draft a response in this voice. Each script is 10–20 lines.

## Where local AI fails

Be honest about the failure modes:

- **It's slower.** If you're used to Claude responding in 2 seconds, local will feel laggy.
- **It's dumber.** Frontier models genuinely think better. You'll notice on hard reasoning tasks.
- **It's awkward to update.** New models come out monthly. Updating means pulling another 40 GB.
- **It uses real electricity.** Generating a long response on a M-series Mac warms the room. Not a metaphor.

For most users, the right answer is hybrid: local for sensitive or routine work, cloud frontier for hard problems where capability matters. The decision per task, not per setup.

## What's next

- **[Privacy stack audit](/services)** — full review of what data leaves your machine
- **[Self-hosted infrastructure](/services)** — extend the local-first principle past AI
- **[Schedule a call](/contact)** — we'll set up the local stack with you

This guide will be updated as the local-model landscape changes — the cutoff above is current as of publication, and the frontier moves fast.
