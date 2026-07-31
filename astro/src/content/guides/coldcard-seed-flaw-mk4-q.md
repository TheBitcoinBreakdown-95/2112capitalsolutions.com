---
title: "Coldcard Mk4, Mk5 and Q: what to do about the seed flaw"
description: "Step by step for Mk4, Mk5 and Q owners, including how to verify your existing backup and generate a new dice seed without wiping the device or buying a second one."
pubDate: 2026-07-31
updatedDate: 2026-07-31
category: "Bitcoin"
level: "Intermediate"
readingTime: "14 min read"
draft: false
---

For **Mk4 and Mk5 on firmware 5.x**, and **Q on firmware 1.xQ**. If you have not confirmed your model and firmware, [start here](/guides/coldcard-seed-flaw/).

**Your position in one paragraph.** The flawed code is present in your firmware; we confirmed it in Coldcard's public source. Nobody has demonstrated an attack against these models, and no key from one has been publicly recovered. Coinkite says these models are unaffected, but that assessment was written before they received the outside technical report and has not been updated. So: act deliberately, not in a panic, and do not create new seeds using the device's own randomness while this is unresolved.

**The good news specific to your device.** You can verify your backup and generate a replacement seed **without wiping anything and without a second device**. The Mk3 cannot do this. Your steps are below.

---

## Before anything: verify your backup works

Do this first, every time, whatever else you decide. The most likely way to lose money this week is not the flaw, it is acting on a backup that turns out to be wrong.

This test loads your written words into memory only. Your real seed stays untouched in the secure chip, and nothing is erased.

> **Check what your firmware calls this feature before you start.** It has changed name, and on older firmware it does not exist at all.
>
> | Your firmware | What to look for in `Advanced/Tools` |
> |---|---|
> | Mk4 or Mk5 on **5.2.0 or later**, and **every Q** | **`Temporary Seed`** |
> | Mk4 or Mk5 on **5.0.7 to 5.1.4** | **`Ephemeral Seed`**. Same feature, same place, older name. Everything below applies, just substitute the label. |
> | Mk4 on **5.0.0 to 5.0.6** | **Not present.** The feature did not exist yet. You must [upgrade your firmware](/guides/coldcard-seed-flaw-resources/#upgrading-your-firmware) before you can use any of the steps on this page. |
>
> If you look and the item is simply not there on firmware that should have it, a temporary seed may already be loaded. Restart the device and log in normally.

1. **`Advanced/Tools` → `View Identity`.** Write down the 8-character **Master Key Fingerprint**. This is your wallet's ID.
2. **`Advanced/Tools` → `Temporary Seed`** (or `Ephemeral Seed` on 5.0.7 to 5.1.4). A warning screen appears. Scroll to the bottom and press **4**. The checkmark does not advance this screen.
3. **`Import Words` → `24 Words`** (or 12 or 18, matching your backup). Type in the words **from your paper**, not from memory.
4. **`Advanced/Tools` → `View Identity`** again. Compare the fingerprint.
5. **Same fingerprint means your backup genuinely rebuilds your wallet.** Different means your written copy is wrong, and fixing that is now your most urgent task, ahead of everything else on this page.
6. Return to your real seed with **`Restore Master`** on the home menu, or by restarting the device.

If you keep an **encrypted backup file** rather than written words, use `Advanced/Tools` → `File Management` → `Verify Backup`. That file's password comes from the hardware generator and is not affected by this flaw.

---

## Your options

Pick one. They are ordered by how well each survives the open questions.

### Option 1: a dice seed, generated on your own device

The strongest choice, because it does not depend on how the disagreement about these models gets resolved. The dice path is a plain SHA256 hash of your roll sequence with no device randomness in it at all, confirmed in the firmware source, and you can prove it yourself afterwards.

**Optional first, if you want the new seed to survive a restart:** turn on Seed Vault at `Advanced/Tools` → `Danger Zone` → `Seed Vault` → `Enable`. **Do this before generating**, because the offer to save only appears at the moment of creation. Back up the Coldcard afterwards, since vault changes are not in your old backup.

**Generate it:**

1. `Advanced/Tools` → `Temporary Seed` → **press 4** at the warning
2. `Generate Words` → `24 Word Dice Roll`
3. **Roll 100 times.** Not 99. Each roll of a six-sided die is worth 2.585 bits, so 99 rolls lands at 255.9, just short of a full 256. The extra roll costs nothing.
4. Count on paper as you go. Do not trust the device to stop you.
5. Write the words down. Pass the quiz.
6. If you enabled Seed Vault, press **1** at the save prompt. Any other key skips it.

**Two rules while you do this:**

- Use fair casino-style dice, and never photograph your rolls or type them into a networked computer.
- **Do not press 4 on the screen showing your new words.** That prompt reads "Press (4) to add some dice rolls into the mix" and it appears even after a clean dice seed. Pressing it restarts the calculation from a different starting value and destroys your ability to verify the result.

**Menu note by firmware.** The path above is for the `Temporary Seed` route, which is the same across all your versions. If you instead generate on a device with no seed on it, the location has moved over time: on **5.3.0 and later** and **Q 1.2.0Q and later** it is `New Seed Words` → `Advanced` → `24 Word Dice Roll`; on **5.0.2 through 5.2.2** and **Q 1.0.0Q to 1.1.0Q** the dice entries sit directly under `New Seed Words` with no `Advanced` level; on **5.0.0 and 5.0.1** it is under `Import Existing` → `Dice Rolls`.

### Option 2: a device from a different manufacturer

Passport, BitBox02, Blockstream Jade, Trezor Safe, Ledger, or the user-entropy signers SeedSigner and Krux.

Honest caveat: nobody has audited other MicroPython-based signers since this disclosure. We are not telling you other vendors are cleared. We are saying that spreading risk across manufacturers is sound practice regardless, and that this event is a reasonable prompt to do it.

### Option 3: both, which costs nothing extra

Generate a dice seed and import it into a non-Coldcard signer. Immune both to the open question about these models and to any Coldcard-specific issue nobody has found yet.

### Option 4: a passphrase, as a bridge and not a destination

Right if you cannot execute a migration carefully right now. It works on your existing device with no new hardware. See [the passphrase bridge](/guides/coldcard-seed-flaw-resources/#the-passphrase-bridge) for the rules, which matter more than the steps: assume an attacker already has your 24 words, so the passphrase is carrying your entire security by itself.

---

## Moving your coins

Once your new seed exists, in this order:

1. **While the new temporary seed is still loaded**, export the wallet to your software (Sparrow, Nunchuk, whatever you use) or note a receive address, and **verify that address on the Coldcard screen**.
2. **Return to your master seed** with `Restore Master`, or restart.
3. **Send a small test amount** to the new wallet. Confirm it arrives.
4. **Send the rest.**
5. **Treat every address derived from the old seed as burned.** Never reuse them.

Sweeping everything in one transaction is simple and hard to botch, which makes it the right default under pressure. If you want to preserve the privacy separation between your coins, see [coin control](/guides/coldcard-seed-flaw-resources/#coin-control).

---

## Afterwards: what to do with the device

Only once your coins are safely moved and confirmed.

**Keep using it with the new seed.** Promote the temporary seed with `Advanced/Tools` → `Danger Zone` → `Seed Functions` → `Lock Down Seed`, then press 4.

> **Lock Down Seed is the most destructive action in this guide.** Its own confirmation screen states that the old master seed words are erased forever and its settings blanked, and that saved temporary seed settings and your Seed Vault are lost. It destroys the vault that may be holding the seed you just made. Have your new words written down and verified on paper before you touch it, and do not use it until your coins have already moved.

**Or wipe and start clean.** `Advanced/Tools` → `Danger Zone` → `Seed Functions` → `Destroy Seed`. Two confirmations follow. Note this item is hidden while a temporary seed is loaded, so restart to your master seed first.

**Or retire it.** Nuke Device is available on Mk4 5.5.0 and later and Q 1.4.0Q and later, at `Advanced/Tools` → `Danger Zone`.

---

## Worth knowing

**Temporary seeds are a deliberate exception to the device's design.** Coinkite's own documentation says they "completely defeat the design of Coldcard's security model, based on secure elements" and that they do not recommend handling unencrypted seed material regularly. That is fair, and it is why this is a one-off migration procedure rather than a habit. The alternative for a single-device owner is wiping on the strength of an untested backup, which is worse.

**Do not update firmware expecting a fix.** There is no patched release, and updating cannot repair an existing seed. Any letter, email or message telling you to upgrade because of this advisory should be treated as a scam; that exact pretext was already being used against Coldcard owners before this happened. See [scams](/guides/coldcard-seed-flaw-resources/#scams).

**Multisig users:** the rule is a counting rule. You are safe only while fewer of your keys came from affected generation than the number of signatures required. See [multisig](/guides/coldcard-seed-flaw-resources/#multisig).

**One thing we could not verify.** We could not establish whether the dice path inside `Temporary Seed` enforces the 99-roll minimum and the distribution check the way the `New Seed Words` path demonstrably does. We exhausted the documentation, changelogs, videos and the firmware issue tracker. So roll the full count on every path and never rely on being stopped.

---

Questions this raises, the technical explanation, the passphrase rules, dice verification, coin control, multisig and scam warnings are all on the [reference page](/guides/coldcard-seed-flaw-resources/).
