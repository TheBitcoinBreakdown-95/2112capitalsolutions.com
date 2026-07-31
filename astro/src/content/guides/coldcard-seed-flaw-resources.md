---
title: "Coldcard seed flaw: reference, resources and questions"
description: "The passphrase rules, the two dice paths, verifying dice offline, coin control, multisig, scam warnings, the technical explanation, and every verified resource in one place."
pubDate: 2026-07-31
updatedDate: 2026-07-31
category: "Bitcoin"
level: "Intermediate"
readingTime: "18 min read"
draft: false
---

Reference for the Coldcard seed flaw. If you have not found your firmware yet, [start here](/guides/coldcard-seed-flaw/).

---

## Verify your backup

**Which backup, and when.** The one that matters is your NEW seed's words, checked before you send any coins back to it. Your old backup is not load-bearing on the main path: the old device signs the transaction that moves your coins, and a successful signature is itself proof the old seed works. Verify the old paper only if you intend to wipe the device and reuse it, and then immediately before the wipe rather than earlier. That order matters, because on a Mk3 verifying puts your seed on the screen, and on a Mk4 or Q it means retyping all 24 words, neither of which is free during an active phishing campaign.

**Mk4, Mk5, Q, the strong test.** This loads your written words into memory only; your real seed stays in the secure chip and nothing is erased.

1. `Advanced/Tools` → `View Identity`, note the 8-character **Master Key Fingerprint**
2. `Advanced/Tools` → `Temporary Seed`, press **4** at the warning
3. `Import Words` → `24 Words`, type the words **from your paper**
4. `Advanced/Tools` → `View Identity` again, compare the fingerprint
5. Match means your backup genuinely rebuilds your wallet. Return via `Restore Master` or restart.

**Any model including Mk3, the visual check.** `Advanced/Tools` → `Danger Zone` → `Seed Functions` → `View Seed Words` (on Mk3 the first item is `Advanced`; on firmware 4.0.x the items sit directly under `Danger Zone`). Compare word by word against your paper. This proves the paper matches, not that it restores.

**Encrypted backup files.** `Advanced/Tools` → `File Management` → `Verify Backup`. The 12-word password on these files comes from the hardware random generator, not the flawed one. We traced this through the firmware source on both lines, so encrypted Coldcard backups are trustworthy here.

---

## Upgrading your firmware

**Read this first: upgrading does not repair the seed you already have.** A seed is data, not software, so no release can strengthen a key that already exists. What v5.6.0, or v1.5.0Q on a Q, does fix is the generator itself, which is why Mk4, Mk5 and Q owners should update before creating a replacement seed. There is no such release for a Mk2 or Mk3; that line ended at 4.1.9 in June 2023 and nothing is coming.

**Mk3 owners cannot upgrade to anything useful.** Firmware 4.1.9 from June 2023 was the final Mk3 release, and it has no temporary seed feature at any version.

**About the scam warning.** Elsewhere we tell you that any message instructing you to upgrade your firmware should be treated as fraudulent. That still holds. The difference is direction: you came here and chose to read this, and the download comes from typing coldcard.com into your own browser. Nobody contacted you. If a letter, email, message or QR code prompted the upgrade, it is a scam regardless of what it claims.

### The safe procedure

Coinkite's own instructions are at [coldcard.com/docs/upgrade](https://coldcard.com/docs/upgrade/) and should be your primary reference. The essentials:

1. **Get the file only from [coldcard.com](https://coldcard.com).** Type the address yourself. Do not follow a link from a message, and do not download firmware from a mirror, a forum post, or a search result.
2. **Verify the signature before flashing.** Coinkite publishes a PGP-signed list of file hashes at [releases/signatures.txt](https://github.com/Coldcard/firmware/blob/master/releases/signatures.txt) in the firmware repository. Their documentation gives separate step-by-step procedures for macOS (GPG Keychain), Linux (`sha256sum` and `gpg --verify`) and Windows (Kleopatra or Gpg4win, plus `certutil`). The Coinkite signing key fingerprint is `4589779ADFC14F3327534EA8A3A31BAD5A2A5B10`.
3. **Copy the file to a MicroSD card** and install from the device: `Advanced/Tools` → `Upgrade Firmware` → `From MicroSD`. Newer devices also offer `From VirtDisk`.
4. **Do not interrupt it.** Let the device finish and reboot on its own.
5. **Confirm afterwards** at `Advanced/Tools` → `Upgrade Firmware` → `Show Version`.

**Your seed is not touched by an upgrade.** Your coins and your existing seed survive it. That said, do not upgrade before you have [verified your backup](#verify-your-backup) some other way, because the sensible order is always: know your backup is good, then change anything.

**One quirk to expect:** `Upgrade Firmware` is hidden from the menu while a temporary seed is loaded. If it is missing, restart the device and log in to your main seed.

- [Official upgrade instructions](https://coldcard.com/docs/upgrade/) Coinkite
- [Signed hash list](https://github.com/Coldcard/firmware/blob/master/releases/signatures.txt) Coldcard firmware repository
- [Security and verification hub](https://coldcard.com/resources/security/coldcard-security-and-verification) Coinkite
- [Verifying firmware, step by step for Windows](https://econoalchemist.github.io/COLDCARD-Paranoid/02%20Firmware.html) econoalchemist, the most complete walkthrough of the PGP chain for a non-technical user

---

## The two dice paths

Both involve dice. They are not variations of one feature, and only one is useful now.

**The dedicated dice menu.** The device starts from **nothing** and your rolls become the whole seed. In code, the accumulator begins empty and each roll is hashed in, so the result is SHA256 of your roll sequence and nothing else. The device's random generator is never consulted. On firmware 5.1.0 and later this path also enforces a minimum roll count and runs a check that rejects rolls where any number appears more than 30% of the time.

**"Press 4 to add some dice rolls into the mix."** This prompt appears on the screen displaying your new words. It takes the seed the device **already generated** and hashes your rolls on top:

```
md = sha256(seed)     # seed = the device's own output
md.update(roll)       # each roll appended
seed = md.digest()
```

So the result is SHA256 of (device's value ‖ your rolls). Both safety checks are switched off on this path: it accepts three rolls without comment.

**If you already used the mixing path**, your rolls genuinely were hashed in, so a large number of rolls does add real randomness. But you cannot verify the result offline, because you would need the device's starting value, which you never saw. And because nothing enforced a minimum, most people who used it rolled a handful. **If you cannot confirm you rolled at least 50 times, treat the seed as affected and migrate.**

The dedicated path is the one worth using now, for a specific reason: it is the only one you can **prove**.

---

## Can I tell whether my seed came from dice?

Short answer: **only if you still have your dice rolls.** Otherwise you cannot, and you should assume you did not use them.

**The device does not record it.** When a seed is committed, the firmware writes the secret into the secure element and nothing else. There is no origin field, no creation date, no marker of any kind. We checked this in the source on both firmware lines. A dice-generated seed and a device-generated seed are both just 24 words, and nothing distinguishes them, by design. That is a reasonable design choice for privacy, and it is unhelpful this week.

**The words themselves cannot tell you either.** Both paths end in a SHA256 hash, and hash output is indistinguishable from randomness. There is no pattern to look for, and any tool claiming to detect this from your words is lying to you or worse.

**If you kept your rolls, you can prove it.** This is a genuine proof, not a guess:

1. On an offline computer, run your recorded roll sequence through Coinkite's `rolls.py`
2. Compare the words it produces against your seed
3. **A match proves your seed came from those rolls and nothing else.** Your seed never touched the device's random generator.
4. No match means the rolls you kept are not the ones that made this seed

Only do this on a machine that is genuinely offline. See [verifying dice offline](#verifying-dice-offline) for the safer throwaway-rolls version of this procedure.

**One narrow exception.** If you created a temporary seed and saved it to the **Seed Vault**, that vault entry does record where it came from, shown as `Dice`, `TRNG Words`, `Imported`, or a passphrase note. That applies only to vault entries on Mk4, Mk5 and Q, never to your main seed, and not at all on Mk3.

**So the practical rule:** if you cannot produce the rolls and confirm them, treat your seed as device-generated and therefore affected. Trying to remember what you did three years ago is not evidence. An unnecessary migration costs time and fees; the other mistake costs everything.

---

## Verifying dice offline

The dice path is trustworthy precisely because you can check it. The device performs arithmetic you can reproduce.

The seed is SHA256 over your rolls as a plain text string. Coinkite's worked example: `sha256(b'123456')` produces `8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92`, which converts to the BIP39 words.

1. Do a **practice run with throwaway rolls**, for example 1-2-3-4-5-6
2. On an offline computer, run Coinkite's `rolls.py` (`rolls12.py` for 12 words): `echo 123456 | python3 rolls.py`
3. Compare against what the device produced
4. Once satisfied the device hashes honestly, **generate your real seed and check it nowhere**

Coinkite's warning, verbatim: "Do not use your actual dice rolls on a normal desktop system as that will completely compromise the security of your Coldcard." They recommend Tails, offline, no hard drives.

**A disclosure about that page.** Coinkite's own [dice math page](https://coldcard.com/docs/verifying-dice-roll-math/) takes a looser line than we do: it tells you to repeat the check using your real rolls on a properly air-gapped Tails machine. That is defensible if your air gap is genuinely sound. We recommend the stricter version, verify with throwaway rolls and then roll a completely fresh set for the wallet you will fund, because a mistaken air gap is unrecoverable. The same page also still states "The Coldcard does not limit the number of rolls, but will warn you if you apply too few rolls," which was true before firmware 5.1.1 and is false now on Mk4, Mk5 and Q.

---

## The passphrase bridge

Right for someone who cannot execute a migration carefully right now. It buys time. It is not the destination.

**How it protects you.** A passphrase is never stored on the device. It is combined with your seed each time you use it. So an attacker who reconstructs your 24 words still cannot reach the passphrase wallet.

**The rules, which matter more than the steps:**

- **Assume the attacker already has your 24 words for free.** The passphrase now carries your entire security by itself.
- **Four diceware words is not enough.** Six (about 78 bits) is the floor. Eight (about 103 bits) is the recommendation, and fits inside Coldcard's 100-character limit.
- **It must come from outside the device**, from physical dice or a diceware list. Never from BIP-85 or any device-generated password. Coldcard's own documentation states BIP-85 entropy "is mathematically derived from your COLDCARD's seed value," so anything derived that way inherits the compromised seed and adds nothing.
- **Setting a passphrase protects nothing by itself.** It creates a new, empty wallet with new addresses. Your coins stay in the old wallet until you send them on-chain. This is the most dangerous misunderstanding on this page.
- **Back it up separately from the seed words, exactly.** No validation happens: a typo silently produces a different valid wallet with no error message.
- **It is a stopgap.** Migrate afterwards.

**The steps.** `Passphrase` sits on the main menu of a seeded device on every model. Two exceptions: it is absent if the device was set up by importing an XPRV or raw master secret rather than seed words, and it disappears permanently after Lock Down Seed.

Select `Passphrase` → `Edit Phrase` (inside it, keys 1 to 4 switch between letters, numbers, symbols and case) → `APPLY`. Record the new 8-character fingerprint, restart, re-enter the passphrase, and confirm the same fingerprint appears. Then verify a receive address on the device screen, send a small test transaction, confirm it, and only then move the rest.

Kevin Loaec of Wizardsardine has publicly cautioned that a passphrase may not be a certain guarantee while the full vector remains unknown. Treat it as a bridge.

---

## Parking your coins somewhere temporary

The fastest way out of a weak seed is to move the coins somewhere else while you rebuild the device. That somewhere does not have to be permanent and it does not have to be perfect. It has to be a wallet whose recovery words you hold.

**Best: a second hardware wallet you already own and trust.** Nothing about your setup changes and there is no hot key involved at any point.

**Otherwise, a software wallet you create yourself.** Sparrow on a computer or Blue Wallet on a phone both let you generate a new wallet and write down its recovery words. Nunchuk also works, though it asks for an email address to register.

**An exchange account you already trust also works, with real tradeoffs.** River, Swan, Kraken, Cash App and Strike will all hold bitcoin for you, and for many people this is the fastest and least error-prone route, because the account already exists and there is no new seed to write down or lose. What you are accepting for those few hours is counterparty risk, that the company holds the keys rather than you, plus the chance of a withdrawal hold or a delay when you send the coins back out, and the privacy cost of your coins passing through a KYC account that ties them to your identity. Those are real, and none of them is worse than leaving bitcoin on a seed you know is weak. If you have the time and the confidence, a wallet you hold the keys to is better practice. If you do not, this is a legitimate choice rather than a failure.

**Know which kind you picked.** If your wallet showed you recovery words, write them on paper before you send anything and keep that paper until the coins are back on your rebuilt Coldcard. If it never showed you any, that is because the company holds the keys, which is expected for an exchange and means there is nothing for you to write down. What matters is not confusing the two: do not assume an app has a backup you can find later, and do not send to something you cannot get the coins back out of.

For a few hours this destination holds everything you own. It is temporary in purpose, not in how carefully you treat it.

---

## Moving your coins safely

**Which software do I even open?** Your Coldcard has no internet connection, so it never moves coins by itself. It signs transactions that some wallet software builds for it. That software is whatever you paired the device with when you set it up, most often Sparrow on a computer, or Nunchuk or Electrum. The shape of the job is always the same: build the transaction in the software, pass it to the Coldcard (on the microSD card, or by USB, or by QR code on a Q), approve it on the device screen, pass it back, and let the software broadcast it. If you genuinely cannot remember what you used, Sparrow is the most widely documented starting point and can talk to every Coldcard model.

Three rules once you are in there, whatever model you own.

1. **Verify the receive address on the destination device's own screen**, not just in the wallet software on your computer. This is the check that survives a compromised computer, and it costs nothing.
2. **Sweep once, at a fee that confirms in the next block or two.** Do not economise on the transaction that saves your coins.
3. **Only an outbound signature proves you can spend.** A payment arriving proves the wallet can receive, nothing more. Where control is genuinely in doubt, a passphrase wallet, a multisig, or a brand-new signer you have never spent from, send a small amount back out before you trust it with everything.

**Why the fee matters.** Your old seed may already be in somebody else's hands. Someone holding your key can spend the same coins with a higher fee and replace your transaction while it sits unconfirmed. A long, cheap window is a race you can lose. If an input limit forces you to split into several transactions, do not leave the later ones unconfirmed and do not walk away from a half-swept wallet.

**Before any destructive action** (`Destroy Seed`, `Lock Down Seed`, `Brick Me PIN`, `Nuke Device`), confirm all three: the last transaction has at least one confirmation, the old wallet reads exactly zero including change and every address type you used, and the new wallet shows the full expected balance. A normal send leaves change behind at an old-seed address, so a full sweep is what you want, not a send.

**You do not have to wipe at all.** An emptied device holding an abandoned seed harms nobody. Keeping it as a spare is fine once the coins are gone.

**Then turn off the things that still pay you.** Exchange withdrawal addresses, recurring buys, any saved extended public key in a watch-only or accounting tool, addresses you gave to clients or an employer, Lightning channel close addresses. Rename the old wallet in your software so it reads as retired, and make the new one the default, so it never offers you an old receive address again. Coins arriving at an old address after you migrate are exactly as exposed as the ones you just moved.

---

## Coin control

Optional. Skip it if you are in a hurry; getting coins to safety matters more than the privacy optimisation.

Sweeping everything in one transaction is simple, cheap and hard to botch, which makes it the right default under pressure. The cost is privacy: combining all your coins publicly proves they belonged to one person.

To keep them separate, Sparrow lets you choose which coins to spend. Go to the UTXOs screen, select the ones you want (Ctrl or Cmd click for several), and click **Send Selected**. Separate sends cost more, since each input adds roughly 114 bytes to a single-signature transaction.

**In an emergency, custody risk outranks privacy risk.** If choosing between a fast simple sweep and a slow private one, take the fast one.

- [How do I use coin control?](https://sparrowwallet.com/docs/faq.html#how-do-i-use-coin-control) Sparrow official
- [UTXO Management (Coin Control)](https://www.youtube.com/watch?v=yJpvfRl03Tw&t=4354s) BTC Sessions, chapter at 1:12:34
- [What is a bitcoin UTXO?](https://www.unchained.com/blog/what-is-a-utxo-bitcoin) Unchained
- [Transferring bitcoin safely and privately](https://www.athena-alpha.com/how-to-transfer-bitcoin-to-another-wallet/) Athena Alpha
- [More UTXOs, more problems](https://www.unchained.com/blog/too-many-bitcoin-utxos) Unchained, covers device signing limits

---

## Multisig

**The rule is a counting rule, not "rotate a key."** You are safe only while fewer of your keys came from affected generation than the number of signatures required. In an all-Coldcard 2-of-3 built from affected devices, rotating one key still leaves an attacker a full quorum.

Two mechanics people get wrong:

- **Replacing a cosigner creates a new wallet.** New descriptor, new addresses, an on-chain move. The work equals migrating outright.
- **Old addresses are not protected by the new key.** Any address from the prior multisig stays controlled by the prior quorum. Rotating without moving the coins protects nothing.

If you rebuild a quorum, register it on each signing device. That step defends against a substituted cosigner key and is the one most guides skip.

Reassuring and true: not one multisig was touched in the theft that preceded the advisory. All the stolen coins were single-signature.

- [When do I need to replace a key?](https://www.unchained.com/blog/replace-key-multisig-wallet) Unchained
- [Multisig.Guide](https://bitcoiner.guide/multisig/) Bitcoin Q+A
- [Building the 2-of-3](https://bitcoiner.guide/multisig/wallet/) Bitcoin Q+A, strong on registering the quorum on each device
- [Sparrow multisig tutorial](https://planb.academy/tutorials/wallet/desktop/sparrow-multisig-5860333b-6dd8-4aaa-8ab6-89ebc6276f1f) Plan B Academy
- [Coldcard multisig docs](https://coldcard.com/docs/multisig/) official
- [10x Bitcoin Security Guide](https://btcguide.github.io/) Michael Flaxman
- [If a hardware wallet is lost or stolen](https://help.unchained.com/hardware-wallet-lost-stolen) Unchained

---

## Scams

This advisory tells people to enter a passphrase and move funds. That is exactly the shape of a scam, which makes this week unusually dangerous. A phishing campaign against Coldcard owners was already running before it: physical letters in Coinkite's brand style demanding a firmware upgrade, with a QR code to a fake site that harvests your PIN and seed phrase.

- **No legitimate party will ever ask for your seed words, passphrase or PIN.** Not by mail, email, message, phone or website.
- **A physical letter about this advisory should be treated as fraudulent on sight.**
- **There is no official "am I affected?" checker.** If one appears, treat it as hostile.
- **The safe way to check is watch-only:** look up your address on a public block explorer. Never import keys anywhere to check.
- **Ignore anyone offering to check your seed for you.** That is the entire scam.
- **Expect scope inflation.** Older stories about unrelated wallet flaws are already circulating alongside this one.

### If your coins are already gone

Bitcoin transactions cannot be reversed, and nobody can undo one for you. Anyone who offers to is running the second theft. There is no recovery service, no fee you can pay, and no support line with a rollback button. Treat every unsolicited offer of help from here on as an attack, particularly the ones that arrive within hours and sound sympathetic.

What is still worth doing:

- **Move anything left.** Other coins on the same seed, other addresses, other accounts derived from it. A seed that produced one stolen address produced all of them.
- **Write down what you know** while it is fresh: the addresses, the times, the transaction IDs. You can read them off any block explorer.
- **Report it.** In the United States that is [IC3](https://www.ic3.gov/), the FBI's complaint centre. Elsewhere, your national cybercrime reporting body. This rarely returns coins and it does feed the pattern that identifies the attacker.
- **Tell Coinkite what happened**, through their own support channel that you navigate to yourself. Their forensic picture is built from reports like yours.
- **Do not reuse the seed for anything**, and do not restore it "just to check" on a device you intend to keep using.

If the loss is large enough to matter legally or for tax, talk to a professional before you move anything else.

---

## What actually went wrong

Two mistakes, stacked, both readable in Coldcard's public source.

**The fallback.** The firmware turns off MicroPython's hardware random generator with a setting called `MICROPY_HW_ENABLE_RNG`, set to 0. The crypto library then checks whether that setting is *defined* rather than whether it is *enabled*. It is defined, just switched off, so the check passes and the code quietly falls through to a software generator called Yasmarang, which is predictable: it seeds itself once from the device ID, a timer and the clock.

**The truncated reseed.** On Mk4, Mk5 and Q, the device does mix in randomness from its secure chips at startup, then keeps only four bytes of it and stirs a single 32-bit word of state.

**Why an update cannot fix it.** A seed is data, not software. Updating cannot strengthen a key that already exists. Coinkite shipped v5.6.0 and v1.5.0Q on 31 July 2026, which repairs the generator for seeds made from then on, and does nothing for seeds made before. No equivalent exists for the Mk2 or Mk3; that line ended at 4.1.9 in June 2023.

**What is not affected, and this is worth stating plainly:** Bitcoin's cryptography is untouched. A properly generated 256-bit key remains beyond reach. The problem is that these particular keys never occupied that full space to begin with. This is the same failure class as Milk Sad (2023) and other entropy-integration failures, not a break of Bitcoin itself.

---

## Questions

**Am I affected if I imported my seed, or made it before firmware 4.x?** No. The problem is confined to seeds the device generated with its own random generator.

**What if I cannot remember which firmware I was running?** Treat yourself as affected. An unnecessary migration costs time and fees; the other mistake costs everything.

**How do I know if I used dice?** Only by producing your original rolls and reproducing the seed from them. The device keeps no record. See [can I tell whether my seed came from dice?](#can-i-tell-whether-my-seed-came-from-dice)

**Should I update my firmware?** Not as a remedy. It fixes nothing here and cannot repair an existing seed. Updating is safe for your seed and there is a narrow case where it helps (a Mk4 or Mk5 below 5.0.7 gaining the Temporary Seed feature), but during this event any message telling you to upgrade should be treated as a scam.

**My Coldcard failed while signing a large transaction.** On a Mk3 the limit is 20 inputs at a time. Split the migration into several smaller transactions.

**Is Bitcoin itself broken?** No. See [what actually went wrong](#what-actually-went-wrong).

**Why does this page disagree with other sources?** Several trusted sources are wrong in specific ways this week, including the vendor's own documentation, and you will run into them. Coinkite's dice verification page still says the device "does not limit the number of rolls, but will warn you if you apply too few," which was true before firmware 5.1.0 and is false now on a Mk4, Mk5 or Q, where that path blocks. Coinkite's import documentation says that mixing dice into a generated seed is safe "since the entropy of the Coldcard is being used as a starting point," which rests on exactly the assumption that just failed. Widely recommended third-party guides tell you to create a seed normally and then press 4 to add dice, which was good advice a month ago and is the wrong path for this problem. And video walkthroughs published this week narrate Mk4 menu names while discussing the Mk3, which has no `Advanced/Tools` item. Every correction here traces to published firmware source or Coinkite's own changelogs, so you can check it rather than take our word.

---

## Primary sources

- [Coinkite's Mk3 Security Advisory](https://blog.coinkite.com/coldcard-mk3-seed-generation-warning/), 30 July 2026
- [Block's technical report](https://engineering.block.xyz/blog/predictable-rng-fallback-and-32-bit-reseed-in-coldcard-firmware), same day
- [Coldcard firmware source](https://github.com/Coldcard/firmware), the neutral arbiter for both
- [Coldcard menu tree](https://coldcard.com/docs/menu-tree/), Coinkite's own reference for Q and Mk4
- [Temporary Seeds documentation](https://coldcard.com/docs/temporary-seeds/), official

## Device documentation

- [BIP-39 Passphrase](https://coldcard.com/docs/passphrase/)
- [Verifying Dice Roll Math](https://coldcard.com/docs/verifying-dice-roll-math/), with the caveat noted above
- [Dice rolls with 256 bits of entropy](https://coldcard.com/docs/paranoid/#generating-seed-words-with-256-bits-of-entropy-by-dice-rolls)
- [Encrypted Backups](https://coldcard.com/docs/backups/)
- [Danger Zone](https://coldcard.com/docs/advanced/#danger-zone)

## Sparrow

- [Coldcard with Sparrow](https://sparrowwallet.com/docs/coldcard-wallet.html) official
- [Quick Start](https://sparrowwallet.com/docs/quick-start.html) official
- [Best Practices](https://sparrowwallet.com/docs/best-practices.html) official
- [In-depth Sparrow tutorial](https://www.youtube.com/watch?v=yJpvfRl03Tw) BTC Sessions, Coldcard section at 30:38

## Understanding the failure class

- [Milk Sad](https://milksad.info/), the 2023 Libbitcoin entropy failure, the closest precedent
- [Coin selection](https://bitcoinops.org/en/topics/coin-selection/) Bitcoin Optech
- [Common input ownership](https://en.bitcoin.it/wiki/Privacy#Common-input-ownership_heuristic) Bitcoin Wiki

**A note on third-party Coldcard guides.** Several well-regarded walkthroughs, including econoalchemist's otherwise excellent COLDCARD Paranoid guide, instruct you to create a seed the normal way and then press 4 to add dice rolls. That was sound advice before this week. It is the wrong path for this problem, because it starts from the device's own randomness. Use the dedicated dice menu instead. We are naming this because those guides remain valuable for everything else.
