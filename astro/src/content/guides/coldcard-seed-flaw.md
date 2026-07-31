---
title: "Coldcard seed flaw: what to do about it"
description: "A flaw in how Coldcard devices generated randomness means some seeds are guessable. One procedure, the same on every model, to move your bitcoin onto a seed the device did not invent by itself."
pubDate: 2026-07-31
updatedDate: 2026-07-31
category: "Bitcoin"
level: "Beginner"
readingTime: "4 min read"
draft: false
---

Deep breath. Open the wallet app you normally use with your Coldcard and look at your balance. If it is still there, you have time to do this properly. If it is not, [start here instead](/guides/coldcard-seed-flaw-resources/#if-your-coins-are-already-gone).

Coldcard firmware from March 2021 onward built new seed words from a broken source of randomness. The job is to move your bitcoin onto a seed the device did not invent by itself. That is the whole thing, and it is the same on a Mk2, Mk3, Mk4, Mk5 or Q.

**Last checked: 31 July 2026.** This is a live situation and this page will change.

## What to do

**1. Check whether this is even your problem.**
**A.** You rolled dice for your seed, or you typed in words made somewhere else. You are fine. Stop reading.
**B.** Anything else, including "I don't remember." Assume you are affected. Nothing on the device can settle it for you.

**2. Set up a temporary home for the coins.** It has to be a wallet whose recovery words you hold yourself, so not Cash App, Coinbase or Strike. A second hardware wallet you already trust is the best option. Otherwise Sparrow on a computer or Blue Wallet on a phone. Create a new wallet, write its recovery words on paper, and keep that paper until the last step. [Setting one up](/guides/coldcard-seed-flaw-resources/#parking-your-coins-somewhere-temporary)

**3. Send your bitcoin to it.** You do this from the software you already use with your Coldcard, usually Sparrow, Nunchuk or Electrum. Send a small amount first and do not send the rest until you see it arrive in the new wallet. [How to send from a Coldcard](/guides/coldcard-seed-flaw-resources/#moving-your-coins-safely)

**4. Update the firmware, if your device has an update.** Open the top menu. If it reads `Advanced/Tools`, you have a Mk4, Mk5 or Q: update to v5.6.0, or v1.5.0Q on a Q, before you make the new seed. It does not repair the seed you have. It fixes the generator for the one you are about to make. If your menu reads just `Advanced`, you have an older device, no update exists for it, and you skip this step. [How to update safely](/guides/coldcard-seed-flaw-resources/#upgrading-your-firmware)

**5. Once your full balance shows in the other wallet, wipe the Coldcard.** Nothing of value is left on it by this point, so there is nothing to lose: `Advanced/Tools` > `Danger Zone` > `Seed Functions` > `Destroy Seed`. Some devices show a shorter path. Take whichever yours shows.

**6. Make the new seed with dice.** On the now-blank device: `New Seed Words` > `Advanced` > `24 Word Dice Roll`. If your screen says `New Wallet` instead, yours is at `Import Existing` > `Dice Rolls`, which sounds wrong and is correct. Roll a real six-sided die at least 99 times and enter every roll. Do not use plain `24 Words`. [Why dice, and what the device checks](/guides/coldcard-seed-flaw-resources/#the-two-dice-paths)

**7. Write the new 24 words on paper.** Not a photo, not a note on your phone. The device will quiz you on them before it lets you continue.

**8. Add the new wallet to your software.** Your app still points at the seed you just destroyed. Until you set the Coldcard up in it again, you have nowhere safe to send the coins back to. Get a receive address and check it matches the device screen.

**9. Send the coins back**, small amount first again. Then delete the temporary wallet and destroy its paper words.

Take your time on steps 2, 6 and 7. Almost everyone who loses bitcoin over this loses it by rushing those three, not to the flaw.

Never type your seed words into anything except the Coldcard itself.

## How long would it take to guess your seed

| Your Coldcard | Time to guess it | Cost to whoever does |
|---|---|---|
| **Mk2 or Mk3** | 0.06 seconds to 16 days | nothing to $129 |
| **Mk4, Mk5 or Q** | 55 minutes to 115 million years | 31 cents to $343 billion |

**Mk2 or Mk3: treat your seed as already compromised.** There is no reading of your range that is safe. The patient end is 16 days on one gaming computer and the fast end is instant, so there is nothing here to weigh up. Move your coins.

**Mk4, Mk5 or Q: this is the one where the range is real.** At one end your seed falls in under an hour for pocket change. At the other it is beyond anyone alive. Nobody outside Coinkite can yet say where a given device sits, so plan against the fast end: being wrong in that direction costs everything you hold, and being wrong in the other costs you an evening. [Where these numbers come from](/guides/coldcard-seed-flaw-resources/#what-actually-went-wrong)

## Nobody is going to contact you about this

There is an active phishing campaign running on this news. Coinkite will not email, text, call or message you about your seed, and neither will we. Anyone who does is stealing from you. [More on the scams](/guides/coldcard-seed-flaw-resources/#scams)

## More detail

- [Verifying your backup, dice, passphrases, multisig, scams and the full technical account](/guides/coldcard-seed-flaw-resources/)
- [Mk2 and Mk3 specifics](/guides/coldcard-seed-flaw-mk3/)
- [Mk4, Mk5 and Q specifics](/guides/coldcard-seed-flaw-mk4-q/)
