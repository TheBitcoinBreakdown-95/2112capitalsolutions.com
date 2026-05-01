---
title: "Hardware wallet setup, end-to-end"
description: "From threat model to first signed transaction. The procedure we use in client engagements, written down for everyone."
pubDate: 2026-04-21
category: "Bitcoin"
level: "Beginner"
readingTime: "18 min read"
draft: false
---

Self-custody is not a product you buy — it's a procedure you run. This guide walks the procedure end-to-end, the way we run it in client engagements. The same steps, the same checks, the same termination conditions. By the end of this, you should be able to receive Bitcoin to a hardware wallet you control, send it back out, and recover from a seed phrase if the device dies.

If you're not ready to do this on your own, we run the procedure for clients in a single 2–6 hour session. See [Services](/services#custody) for details. If you are ready to run it yourself, this guide is the runbook we'd hand you.

## Threat model first

Before you buy any hardware, decide what you're protecting against.

- **Online theft.** Malware on your laptop signing transactions you didn't authorize. Cold storage solves this.
- **Physical theft.** Someone takes the hardware wallet AND figures out the PIN. PIN + passphrase solves this.
- **Loss / damage.** Device burns in a fire, lost in a move, dead battery. Seed backup solves this.
- **Coercion.** Someone with leverage forces you to unlock. Multisig + geographically separated keys solves this.

Most retail users only need protection against the first three. Multisig is for amounts where coercion is a realistic threat — usually six figures and up. We default clients to single-sig with a passphrase until coercion enters the threat model.

## Hardware procurement

Buy direct from the manufacturer. Never from Amazon, eBay, or any reseller. Supply chain attacks are real, rare, but unrecoverable. Ten extra days of shipping is worth it.

Defaults we recommend, in priority order:

1. **Coldcard Mk4** — air-gapped via microSD, runs on AAA batteries, never touches a computer. Best single-purpose device.
2. **Trezor Safe 5** — color screen, easier UX, runs on USB. Better for first-time users.
3. **BitBox02** — Swiss-built, smartcard form factor, simple recovery flow.

What we don't recommend: Ledger (closed-source firmware + recovery service controversy in 2023), generic "crypto" hardware wallets without an established security track record.

## Seed ceremony

This is the only step that genuinely cannot be undone. The seed phrase the device generates IS your wallet. Anyone with the seed has the funds. You with no seed have nothing. Treat the next 30 minutes accordingly.

Before you start:

- Close every other application on the laptop, if you're using one. Unplug the network cable. Disable WiFi.
- Bring the device into a private room. No phones with cameras pointed at the desk. No smart speakers within earshot.
- Have a metal seed plate ready (Cryptotag, Steelwallet, or a stamped DIY plate). Paper backups are for testing, not for real funds.

Generate the seed on the device using its on-board entropy. Verify the entropy quality if the device exposes it (Coldcard does). Write the 24 words on the metal plate, in order, exactly as displayed. Read back to the device to confirm.

Do not type the seed into anything connected to the internet. Not your password manager, not a notes app, not a photo. Once it's on a metal plate, that plate is the source of truth.

## Multisig configuration (optional)

For amounts where a single seed feels like too much eggs in one basket, configure 2-of-3 multisig. Three devices, three seeds, three locations. Two signatures required to spend. Loss of any one device is recoverable.

We won't walk through multisig setup in this guide — it's a separate procedure. If you're ready for multisig, you're ready for an engagement; book a [consult](/contact).

## Recovery rehearsal

This is the step everyone skips. **Do not skip it.**

Before you put any meaningful amount of Bitcoin on the wallet, wipe the device, restore from the seed plate, and verify that the same addresses regenerate. If the addresses don't match, the seed is wrong, the passphrase is wrong, or the firmware version is incompatible. Better to find out now than during a real recovery.

Once recovery is verified, sign and date the runbook. The runbook is just a piece of paper that says: "On [date], I generated seed X on [device], verified recovery, and confirmed the first 5 receive addresses match." Keep the runbook with the seed plate, in a fireproof container, in a location that's not your home.

## First receive

Send a small amount — $20 worth — from an exchange or other wallet to the first receive address from the hardware wallet. Verify the address on the device screen, not on the laptop screen. Always verify on the device.

Once the transaction confirms, send it back out. Verify the send works. Now you have an end-to-end functional self-custody setup.

## What's next

- **[Multisig setup](/services#custody)** — when single-sig stops being enough
- **[Node deployment](/services#infrastructure)** — your own Bitcoin node, no third-party trust required
- **[Inheritance planning](/contact)** — what happens to the wallet when you don't

If you have questions or want us to run this procedure with you in a single session, [schedule a consult](/contact).
