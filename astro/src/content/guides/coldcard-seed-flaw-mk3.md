---
title: "Coldcard Mk2 and Mk3: what to do about the seed flaw"
description: "Step by step for Mk2 and Mk3 owners on firmware 4.x, the most urgent group. Move your coins somewhere safe, then rebuild the device with dice, using the menu paths that actually exist on your device."
pubDate: 2026-07-31
updatedDate: 2026-07-31
category: "Bitcoin"
level: "Intermediate"
readingTime: "14 min read"
draft: false
---

For **Mk2 and Mk3 on firmware 4.0.0 through 4.1.9**. If you have not confirmed your model and firmware, [start here](/guides/coldcard-seed-flaw/). On firmware 3.2.2 or earlier you are not affected.

**Your position in one paragraph.** If your seed was created on this device using `New Wallet`, treat it as compromised. Coinkite puts the randomness in these seeds at about 40 bits against a 128-bit target, and the outside technical analysis puts the practical search lower still. Both ends of that range are within reach of one person with a gaming computer. There is no fix and none is coming: firmware 4.1.9 from June 2023 was the last Mk3 release, and no update can repair a seed that already exists. Your coins need to move to a new seed.

**Two things are different for you**, and most advice circulating this week gets both wrong.

Your menu says **`Advanced`**, not `Advanced/Tools`. That rename happened on the Mk4 line at firmware 5.0.2 and never reached the Mk3. Video walkthroughs published this week narrate the Mk4 path while discussing your device.

Your device **cannot hold two seeds**. The Mk4 has a Temporary Seed feature that lets its owners generate a replacement without erasing anything. The Mk3 never got it. That single fact shapes everything below, because it means your new seed cannot exist on this device until the old one is gone.

---

## Step 1: verify your backup, before anything else

You are about to depend on your written words completely. Confirm they are right while you still have the device working.

**`Advanced` → `Danger Zone` → `Seed Functions` → `View Seed Words`**

Compare against your paper, word by word, in order. Fix any discrepancy now.

On firmware **4.0.0, 4.0.1 or 4.0.2** there is no `Seed Functions` level; the items sit directly under `Danger Zone`.

This is a visual check. It proves your paper matches what the device holds; it does not prove the paper restores correctly. The stronger test needs a second device, or the steps in Step 3 done in the right order.

If you keep an **encrypted backup file**, `Advanced` → `File Management` → `Verify Backup` validates it. That file's password comes from the hardware generator and is not affected by this flaw.

---

## Step 2: decide where the coins are going

You cannot create the new seed on this device without first destroying the old one, so decide the destination before touching anything.

### Best: a second device, or a different manufacturer

Generate the new seed there, keep this device intact and holding your coins until the transfer is done and confirmed. Nothing irreversible happens on your side. Options include a Coldcard Mk4 or Q, or Passport, BitBox02, Blockstream Jade, Trezor Safe, SeedSigner, Krux.

Nobody has audited other MicroPython-based signers since this disclosure, so we are not telling you other vendors are cleared. We are saying that spreading risk across manufacturers is sound practice, and this is a reasonable prompt to start.

### If you have no second device: use a passphrase first

This is the answer if you cannot get other hardware today. A passphrase works on your existing device with nothing new, and it does not require erasing anything.

`Passphrase` sits on the main menu of your seeded device. Full rules on the [reference page](/guides/coldcard-seed-flaw-resources/#the-passphrase-bridge), and they matter more than the steps: assume an attacker already has your 24 words, which means the passphrase carries your entire security by itself. Six diceware words is the floor, eight is the recommendation, and it must come from dice or a word list, never from BIP-85 or anything the device derived.

Setting a passphrase creates a **new empty wallet**. Your coins stay where they are until you send them. That misunderstanding is the most dangerous one on this page.

### Last resort: dice on this device, after wiping

Only when your coins are already somewhere safe, because it destroys your current seed. Covered in Step 4.

---

## Step 3: move the coins

1. **Get a receive address** from the destination wallet and **verify it on that device's screen**, not just on your computer.
2. **Send a small test amount.** Confirm it arrives.
3. **Send the rest.**
4. **Treat every address derived from the old seed as burned.** Never reuse them.

> **The Mk3 limit that will stop you: 20 inputs.** Coinkite's own limitations documentation states the Mk3 can handle "up to 20 inputs to be signed at one time." If you have accumulated many small amounts over the years, a single sweep will fail at the signing step. Split the migration into several transactions of at most 20 inputs each. This bites long before the 384 kB transaction ceiling that gets quoted more often.

Sweeping in one go is simple and hard to botch, which is the right default under pressure. For the privacy-preserving version see [coin control](/guides/coldcard-seed-flaw-resources/#coin-control).

---

## Step 4: only afterwards, the device itself

Your coins are already safe by this point. This is housekeeping.

### To keep using this Coldcard with a fresh dice seed

**Erase the old seed first:** `Advanced` → `Danger Zone` → `Seed Functions` → `Destroy Seed`. On 4.0.x the items are directly under `Danger Zone`.

> **If you set a duress PIN, Destroy Seed will refuse**, telling you to empty the duress wallet and clear the duress PIN before clearing the main seed. Do that first at `Settings` → `PIN Options`, or you will hit a dead end mid-process.

**Then log back in and generate the dice seed:**

`Import Existing` → `Dice Rolls`

That location is counterintuitive and correct: on your firmware the dice option lives under **Import Existing**, not under New Wallet. It produces **24 words**; there is no 12-versus-24 choice on this path. (The 24 / 18 / 12 Words entries elsewhere in that menu are for typing an existing seed by hand.)

**Roll 100 times.** Not 99: each roll is worth 2.585 bits, so 99 lands at 255.9, just short of a full 256.

**Count on paper as you go.** Your firmware does **not** enforce a minimum. It will warn you and let you continue anyway. That safety block was added at firmware 5.1.0, on the Mk4 line, and never reached the Mk3. The counting is entirely your responsibility.

### Do not use the "add dice into the mix" prompt

After a normal `New Wallet`, the screen showing your words offers **"Press 4 to add some dice rolls into the mix."** Do not use it for this purpose.

That path starts its calculation from the seed the device already generated with the broken randomness, so the compromised value stays an input. It also silently switches off the roll-count warning, accepting a single roll without comment.

This matters more for you than for other owners, because respected Coldcard guides and Coinkite's own import documentation both recommend that path. Coinkite's docs say "since the entropy of the Coldcard is being used as a starting point, it is safe to add as few or as many rolls as desired." That was reasonable when the device's randomness was sound. It is the wrong instruction now.

**Use `Import Existing` → `Dice Rolls`, which starts from nothing and uses only your rolls.** It is also the only version you can verify afterwards; see [verifying dice](/guides/coldcard-seed-flaw-resources/#verifying-dice-offline).

### To retire the device instead

`Advanced` → `Settings` → `Login Settings` → `Trick PINs` offers **Brick Self**, which permanently disables the unit. Nuke Device is a Mk4 5.5.0 and Q 1.4.0Q feature and is not available to you.

---

## Worth knowing

**Do not update firmware expecting a fix.** 4.1.9 was the final Mk3 release and no update repairs an existing seed. Any letter, email or message telling you to upgrade because of this advisory is a scam; that exact pretext was in use against Coldcard owners before this happened. See [scams](/guides/coldcard-seed-flaw-resources/#scams).

**Multisig users:** the rule is a counting rule. You are safe only while fewer of your keys came from affected generation than the number of signatures required. An all-Coldcard 2-of-3 built from affected devices is not protected by rotating one key. See [multisig](/guides/coldcard-seed-flaw-resources/#multisig).

**Mk2 owners:** everything here applies to you. Coinkite's advisory does not mention the Mk2 in either direction, but the outside technical analysis places Mk2 on firmware 4.x in the same affected range, and the two models share one firmware image.

**One thing we could not verify.** The 12-word password on encrypted Coldcard backups is generated by the hardware random path, not the flawed one; we traced that through the source ourselves and it is sound. What we could not confirm is the exact error text your device shows on an oversized transaction, so if signing fails during migration, assume the input count and split the transaction.

---

Questions this raises, the technical explanation, the passphrase rules, dice verification, coin control, multisig and scam warnings are all on the [reference page](/guides/coldcard-seed-flaw-resources/).
