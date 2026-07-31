---
title: "Coldcard seed flaw: find your firmware, then your instructions"
description: "A flaw in how Coldcard devices generated randomness means some seeds are weaker than they should be. Check your model and firmware here, then follow the page written for exactly your version."
pubDate: 2026-07-31
updatedDate: 2026-07-31
category: "Bitcoin"
level: "Beginner"
readingTime: "6 min read"
draft: false
---

A flaw in how Coldcard hardware wallets generated randomness means some seeds created on those devices are weaker than they should be. This page helps you find out whether yours is one of them, and sends you to instructions written for your exact firmware.

**Last checked: 31 July 2026, 03:00 UTC.** This is a live situation and this page will change. What we know, and what we do not, is set out below.

Two facts decide everything that follows.

**The firmware running today does not matter. What matters is the firmware that was running when you first created your seed, and updating cannot repair a seed that was already made.**

**Rushing is the other way people lose coins during a week like this.** Every path below starts by verifying your backup, before anything is changed. If you cannot do that carefully right now, the passphrase step buys you time to do it carefully tomorrow.

---

## Step 1: find your model and firmware

On the Coldcard: **`Advanced/Tools`** then **`Upgrade Firmware`** then **`Show Version`**. On a Mk3 the first item is labeled just **`Advanced`**.

The screen shows your firmware version on the second line and your model further down beside **Hardware**. One screen answers both questions.

Nothing there is sensitive, and nothing you press changes anything. If `Upgrade Firmware` is missing, a temporary seed is currently loaded; restart and log in normally.

**If you cannot check**, because the device is unavailable, or you have since updated and cannot recall what it ran when you set it up, use the [affected instructions](/guides/coldcard-seed-flaw-mk3/) for your model. An unnecessary migration costs time and fees. The other mistake costs everything.

---

## Step 2: find your version below

### Mk1, Mk2, Mk3 on firmware 3.2.2 or earlier

`3.2.2` `3.2.1` `3.2.0` `3.1.9` `3.1.8` `3.1.7` `3.1.6` `3.1.5` `3.1.4` `3.1.3` `3.1.2` `3.1.1` `3.1.0` `3.0.6` `3.0.5` `3.0.4` `3.0.3` `3.0.2` `3.0.1` `3.0.0` and all 2.x and 1.x

**Not affected by this flaw.** That firmware used the chip's hardware random generator directly. The defect arrived with the version 4.0.0 rewrite in March 2021.

Nothing to do. If you want to confirm rather than take our word for it, see [verifying your own backup](/guides/coldcard-seed-flaw-resources/#verify-your-backup).

### Mk2 and Mk3 on firmware 4.x

`4.1.9` `4.1.8` `4.1.7` `4.1.6` `4.1.5` `4.1.4` `4.1.3` `4.1.2` `4.1.1` `4.1.0` `4.0.2` `4.0.1` `4.0.0`

**Affected, and this is the most urgent group.** A developer has publicly reproduced private keys from this flaw. The Mk3 line ended at 4.1.9 in June 2023, so no fix is coming, and none could repair an existing seed anyway.

**→ [Mk2 and Mk3 instructions](/guides/coldcard-seed-flaw-mk3/)**

Note: Coinkite's advisory describes the range as "4.0.1 through 5.0.3." There is no 5.x firmware for the Mk3; that line tops out at 4.1.9, and 5.x belongs to the Mk4. Treat any 4.x as affected.

### Mk4 and Mk5 on firmware 5.x

`5.5.1` `5.5.0` `5.4.5` `5.4.4` `5.4.3` `5.4.2` `5.4.1` `5.4.0` `5.3.3` `5.3.2` `5.3.1` `5.3.0` `5.2.2` `5.2.1` `5.2.0` `5.1.4` `5.1.3` `5.1.2` `5.1.1` `5.1.0` `5.0.7` `5.0.6` `5.0.5` `5.0.4` `5.0.3` `5.0.2` `5.0.1` `5.0.0`

**The same flawed code is present in this firmware line.** We confirmed it in Coldcard's public source ourselves. How exploitable it is has not been established by anyone, and no key from one of these devices has been publicly recovered. This is not the same emergency as the group above, but it is not a clean bill of health either.

Coinkite states these models are not affected. That assessment was written before they received the outside technical report and has not been updated since. See [what we know and do not know](#what-we-know-and-what-we-do-not).

**→ [Mk4, Mk5 and Q instructions](/guides/coldcard-seed-flaw-mk4-q/)**

### Q on firmware 1.xQ

`1.4.1Q` `1.4.0Q` `1.3.5Q` `1.3.4Q` `1.3.3Q` `1.3.2Q` `1.3.1Q` `1.3.0Q` `1.2.3Q` `1.2.2Q` `1.2.1Q` `1.2.0Q` `1.1.0Q` `1.0.2Q` `1.0.1Q` `1.0.0Q` and the 0.0.xQ pre-releases

Same position as the Mk4 and Mk5 above.

**→ [Mk4, Mk5 and Q instructions](/guides/coldcard-seed-flaw-mk4-q/)**

---

## Situations that override the table

Check these regardless of which version you found.

| Situation | What it means |
|---|---|
| Your seed came from the **dice-roll menu** | Not affected. That path is a plain SHA256 hash of your rolls and never touches the device's random generator. Confirmed in the source of both firmware lines. But see [can I tell whether my seed came from dice?](/guides/coldcard-seed-flaw-resources/#can-i-tell-whether-my-seed-came-from-dice) before relying on this: the device keeps no record, so unless you still have your rolls you cannot confirm it. |
| Your seed was created **elsewhere** and typed or imported in | Not affected by this flaw. |
| You added dice using the **"Press 4 to add some dice rolls into the mix"** prompt | This is a different thing from the dice menu, and it does not remove the device's randomness from the result. See [the two dice paths](/guides/coldcard-seed-flaw-resources/#the-two-dice-paths). |
| An affected seed plus a **strong passphrase you chose yourself** | Risk reduced, not removed. Your protection is now only as strong as that passphrase. See [the passphrase bridge](/guides/coldcard-seed-flaw-resources/#the-passphrase-bridge). |
| An affected seed plus a **BIP-85 or device-generated passphrase** | No protection at all. It is calculated from the same seed. Treat as urgent. |
| **Multisig** with fewer affected keys than your signing threshold | Holding. Rotate keys until none came from affected generation. |
| **Multisig** where affected keys meet or exceed the threshold, common in an all-Coldcard 2-of-3 | Affected. Rotating one key is not enough. |
| **Seed XOR** split made with the "random" split option | Affected. The masks came from the flawed generator. The deterministic split is fine. |
| Your **encrypted backup file** | Not affected. The 12-word backup password comes from the hardware generator, not the flawed one. We traced this through the source on both firmware lines. |

---

## What we know and what we do not

**Confirmed, because we read the published code ourselves.** Coldcard's firmware disables MicroPython's hardware random generator, and the crypto library then checks whether that setting is *defined* rather than whether it is *enabled*. It is defined, just switched off, so the code falls through to a predictable software generator seeded from the device ID and clock. On the Mk4 line a later fix mixes in randomness from the secure chips, but keeps only four bytes of it. The same code path generates wallet seeds on current firmware.

**Confirmed: no update fixes this.** A seed is data, not software. And there is no patched release.

**Not established: how exploitable the newer models are.** The outside research team estimates one figure; an independent cryptographer models it differently and concludes the newer devices are far harder to attack. Nobody has publicly recovered a key from a Mk4, Mk5 or Q.

**Not established: what caused the large theft that preceded the advisory.** A substantial sweep of Bitcoin from single-signature wallets happened hours before the advisory. Timing and victim profile fit, but the link has not been proven, and the team that published the technical analysis explicitly declines to claim it. Our advice does not rest on that question; it rests on the code.

**Disclosure so you can weigh the sources.** The technical report came from Block, which makes a competing hardware wallet. Coinkite makes this one. Both have an interest, which is why we point at the public firmware source rather than asking you to trust a company. The code is readable by anyone.

---

## Why this page disagrees with other sources

Several trusted sources are wrong in specific ways this week. We name them because you will encounter them.

- **Coinkite's advisory** gives the Mk3 range as "4.0.1 through 5.0.3." No 5.x Mk3 firmware exists.
- **Coinkite's dice verification page** still says "The Coldcard does not limit the number of rolls, but will warn you if you apply too few rolls." True before firmware 5.1.1, false now on Mk4, Mk5 and Q, where it blocks.
- **Coinkite's import documentation** says of mixing dice into a generated seed that "since the entropy of the Coldcard is being used as a starting point, it is safe to add as few or as many rolls as desired." That rests on the device's randomness being sound, which is the assumption that just failed.
- **Widely recommended third-party guides** tell you to create a seed the normal way and then press 4 to add dice. Excellent advice a month ago; the wrong path for this problem.
- **Video walkthroughs published this week** narrate the Mk4 menu path while discussing the Mk3. The Mk3 has no `Advanced/Tools` item; it is `Advanced`. The rename happened on the Mk4 line at firmware 5.0.2.

Every correction above traces to published firmware source or Coinkite's own changelogs, so you can check it rather than take our word.

---

## Updates

This page changes when Coinkite publishes the fuller technical review they promised, when anyone demonstrates or refutes an attack against the newer models, or when the tables above need correcting. The date at the top is the last time we checked.

Watch the source directly at [blog.coinkite.com](https://blog.coinkite.com) and the [advisory itself](https://blog.coinkite.com/coldcard-mk3-seed-generation-warning/).
