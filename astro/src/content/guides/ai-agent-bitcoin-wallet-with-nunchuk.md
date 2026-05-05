---
title: "Give your AI agent a Bitcoin wallet with Nunchuk"
description: "Set up a 2-of-3 multisig wallet where your AI agent holds bounded signing authority -- it can spend within limits you set, but can't raise its own cap without your cosigning."
pubDate: 2026-05-02
category: "Bitcoin"
level: "Intermediate"
readingTime: "15 min read"
draft: false
---

This walkthrough sets up a 2-of-3 multisig Bitcoin wallet where an AI agent (Claude) holds one key, Nunchuk's Platform holds another, and you hold the third. The agent can sign transactions within a daily spending limit you define. If it tries to exceed the cap or change its own policy, the transaction stalls until you cosign from your hardware wallet.

The result: your AI agent has bounded signing authority on real bitcoin. Not custody. Not unlimited access. A single key in a multisig with cryptographic policy enforcement.

## In this guide

1. [Connecting Claude to Nunchuk](#part-1--connecting-claude-to-nunchuk) -- CLI install, auth, agent skills
2. [What this is actually for](#part-2--what-this-is-actually-for) -- use cases and why it matters
3. [Building the wallet](#part-3--building-the-wallet) -- key generation, sandbox, policy, finalization
4. [Putting it to work](#part-4--putting-it-to-work) -- agent sends under cap, agent tries to exceed cap

---

## Part 1 -- Connecting Claude to Nunchuk

### 1.1 Install the CLI

**What you're doing:** Putting the `nunchuk` binary on your machine so Claude can call it as a shell tool. The CLI is a Node package -- it bundles the crypto, the Electrum client, and the Nunchuk API wrapper into one command.

**How:**
```bash
npm install -g nunchuk-cli
nunchuk --help
```

**What to tell Claude:** *"Install the Nunchuk CLI globally and confirm it's working."*

**Outcome:** `nunchuk --help` prints the command tree (auth, sandbox, wallet, tx, key, network, config). If it doesn't, Node or npm prefix is the problem -- Claude will diagnose `which nunchuk` for you.

---

### 1.2 Get an API key

**What you're doing:** Nunchuk's server is what brokers the multisig coordination (sandbox invites, encrypted PSBT relay, Platform key signing). You need an API key to identify yourself to it. This is not a custodial account -- the server never sees your private keys, only encrypted blobs.

**How:** Go to https://developer.nunchuk.io/, sign in, create an API key, copy it.

**What to tell Claude:** Nothing yet -- this is a manual browser step. Paste the key into your terminal when prompted.

**Outcome:** A key string in your clipboard you'll hand to `auth login`.

---

### 1.3 Authenticate

**What you're doing:** Writing the API key into `~/.nunchuk-cli/config.json` (mode 0600) and creating the encrypted local SQLite database at `~/.nunchuk-cli/data/<emailHash>/<network>/storage.sqlite`. This is where every key, sandbox, and wallet state lives -- AES-256-GCM encrypted row-by-row with a master key at `~/.nunchuk-cli/master.key` (mode 0400).

**How:**
```bash
nunchuk auth login --api-key <your-key>
```

**What to tell Claude:** *"Log into Nunchuk with this API key: `<key>`."*

**Outcome:** `auth status` reports you're logged in. Your local vault is now initialized.

---

### 1.4 Install agent skills

**What you're doing:** The Agent Skills framework (agentskills.io) is a markdown-based plugin system. Each skill is a `SKILL.md` file telling Claude *when* to use a capability and *how* to invoke it. Installing `nunchuk-io/agent-skills` drops six skill files into Claude's skill directory so Claude recognizes phrases like "create a 2-of-3 wallet" and knows the exact commands.

**How:**
```bash
npx skills add nunchuk-io/agent-skills --all --global
```

**What to tell Claude:** *"Install all Nunchuk agent skills globally."*

**Outcome:** Six skills become available -- `nunchuk-setup`, `nunchuk-wallet-creation`, `nunchuk-invitations`, `nunchuk-platform-key`, `nunchuk-wallet-management`, `nunchuk-wallet-transactions`. Restart your Claude Code session so they load.

---

### 1.5 Pick a network

**What you're doing:** Switching between mainnet (real BTC), testnet (free test coins), and signet. For testing, use testnet -- mistakes cost nothing. Network state is per-session and stored in config.

**How:**
```bash
nunchuk network set testnet
```

**What to tell Claude:** *"Switch Nunchuk to testnet."*

**Outcome:** All subsequent commands talk to testnet endpoints and use testnet-flavored BIP32 paths (`m/48h/1h/...` instead of `m/48h/0h/...`).

---

## Part 2 -- What this is actually for

Before the wallet demo, anchor the *why*. The combination of CLI + Skills + Platform key policies unlocks use cases that custodial apps can't touch and that hot wallets can't do safely:

- **AI treasury agent** -- give Claude a key in a 2-of-3 with a $500/day cap. It pays invoices, rebalances between cold storage, files receipts. If it goes rogue, the limit holds.
- **Automated payroll in BTC** -- monthly disbursement run by an agent with a spending cap equal to payroll + 10%. Humans cosign only if it tries to exceed.
- **Agent-to-agent micropayments** -- one AI buys data or compute from another, bounded by policy.
- **Bill-pay with a signing delay** -- 24-hour delay on all spends gives you a cancellation window if something's wrong.
- **Self-custody with a human safety net** -- you hold 1 key, Nunchuk Platform holds 1, Claude holds 1. Any 2 sign. You can recover from losing any single factor.
- **Auditable agent actions** -- every agent spend is a real Bitcoin transaction. No opaque "the AI did something" -- it's on-chain and in your wallet history.

The key principle: *the AI doesn't have the wallet. It has bounded signing authority on one key in a multisig.*

---

## Part 3 -- Building the wallet

### 3.1 Generate the agent's key

**What you're doing:** Creating a BIP39 24-word mnemonic, deriving a BIP32 root, and extracting the xpub at the multisig path `m/48h/1h/0h/2h` (testnet, native segwit). This key will live in encrypted SQLite on this machine -- Claude can use it to sign, but the mnemonic never leaves the device.

**How:**
```bash
nunchuk key generate --name "Agent"
```

**What to tell Claude:** *"Generate a new software key named Agent."*

**Outcome:** A fingerprint (8 hex chars) prints. The seed is stored encrypted. `nunchuk key list` shows it. **Write the mnemonic down** if this is a real wallet -- losing the device without a backup means losing the key.

---

### 3.2 Create the sandbox

**What you're doing:** A "sandbox" is the pre-finalization state of a multisig wallet -- it holds the wallet structure (M-of-N, address type, name) while participants add their keys. Once all N slots are filled, you finalize and it becomes a real wallet.

**How:**
```bash
nunchuk sandbox create --name "Agent Wallet" --m 2 --n 3 --address-type NATIVE_SEGWIT
```

**What to tell Claude:** *"Create a 2-of-3 native segwit sandbox called Agent Wallet."*

**Outcome:** A sandbox ID prints. `sandbox get <id>` shows 3 empty slots, status `PENDING`.

---

### 3.3 Enable the Platform key

**What you're doing:** Telling the sandbox that one of the 3 keys will be Nunchuk's HSM-backed Platform key. This is the key policies will apply to. You don't add an xpub for it -- the server contributes its own xpub to the descriptor.

**How:**
```bash
nunchuk sandbox platform-key enable <sandbox-id>
```

**What to tell Claude:** *"Enable the Platform key on sandbox `<id>`."*

**Outcome:** One slot is now filled by Nunchuk. Two slots remain for you + the agent.

---

### 3.4 Set the policy

**What you're doing:** Defining the bounded authority. A daily USD limit with auto-broadcast means: *the Platform key will co-sign any transaction under $100 that day without asking, and push it to the network*. Above the limit or after the cap is hit, it refuses -- and there's no way for the agent to override this without your cosigning a dummy PSBT (see 3.7).

**How:**
```bash
nunchuk sandbox platform-key set-policy <sandbox-id> \
  --auto-broadcast \
  --limit-amount 100 --limit-currency USD --limit-interval DAILY
```

**What to tell Claude:** *"Set a $100/day spending limit on the Platform key with auto-broadcast."*

**Outcome:** Policy is attached to the sandbox. `platform-key get-policy` shows it.

---

### 3.5 Add your key and the agent's key

**What you're doing:** Filling the remaining 2 slots. One slot is your human key (from a hardware wallet, Nunchuk mobile, or another software key); the other is the agent key you generated in 3.1.

**How:**
```bash
# Agent's software key -- already on this device
nunchuk sandbox add-key <sandbox-id> --slot 1 --fingerprint <agent-xfp>

# Your key -- paste descriptor exported from HWI, Coldcard, or Nunchuk mobile
nunchuk sandbox add-key <sandbox-id> --slot 2 \
  --descriptor "[abcd1234/48h/1h/0h/2h]xpub..."
```

**What to tell Claude:** *"Add the agent's key to slot 1. I'll paste my hardware wallet descriptor for slot 2."*

**Outcome:** `sandbox get <id>` shows all 3 slots filled.

---

### 3.6 Finalize

**What you're doing:** Turning the sandbox into a real wallet. The CLI assembles the multisig descriptor, computes the wallet ID (a hash of the descriptor), and stores the finalized wallet locally and server-side. After this, the wallet can receive funds.

**How:**
```bash
nunchuk sandbox finalize <sandbox-id>
nunchuk wallet address get <wallet-id>
nunchuk wallet export <wallet-id> > agent-wallet-backup.txt
```

**What to tell Claude:** *"Finalize the sandbox, give me a receive address, and export a backup."*

**Outcome:** A wallet ID, a testnet bech32 address (`tb1q...`), and a descriptor backup file. Send testnet coins to the address from a faucet.

---

### 3.7 Policy updates require cosigning

**What you're doing:** Showing that the agent cannot raise its own spending limit. To change the policy, Nunchuk constructs a "dummy PSBT" -- a non-broadcastable transaction that encodes the policy change. The wallet's M signers must sign it for the change to take effect. This is the same cryptographic rail that guards real spends, repurposed for governance.

**How:**
```bash
# Try to raise the limit
nunchuk sandbox platform-key set-policy <wallet-id> \
  --limit-amount 1000 --limit-currency USD --limit-interval DAILY

# Nunchuk returns a dummy tx ID requiring signatures
nunchuk wallet dummy-tx list <wallet-id>
nunchuk wallet dummy-tx sign <wallet-id> --dummy-tx-id <id>  # agent signs
# Human cosigns from hardware wallet -> policy updates
```

**What to tell Claude:** *"Try to raise the limit to $1,000/day. Show me the dummy transaction it generates."*

**Outcome:** Claude alone cannot push the change through -- you must cosign. This demonstrates the cryptographic enforcement: the same mechanism that protects real spends also protects policy changes.

---

## Part 4 -- Putting it to work

### 4.1 Agent sends under the cap

**What you're doing:** Watching the agent construct, sign, and broadcast a real transaction end-to-end -- all from a natural-language instruction.

**How:**
```bash
nunchuk tx create --wallet <wallet-id> --to <address> --amount 50 --currency USD
nunchuk tx sign --wallet <wallet-id> --tx-id <tx-id>
nunchuk tx broadcast --wallet <wallet-id> --tx-id <tx-id>
```

**What to tell Claude:** *"Send $50 from the agent wallet to `tb1q...`."*

**Outcome:** Claude runs all three commands. The Platform key auto-cosigns (under the $100 cap). Transaction hits testnet. Confirmed in a block explorer.

---

### 4.2 Agent tries to exceed the cap

**What you're doing:** Proving the fence holds.

**What to tell Claude:** *"Send $500 from the agent wallet."*

**Outcome:** `tx create` succeeds, `tx sign` with the agent key signs, but the Platform key refuses the second signature. Transaction stays `PENDING_SIGNATURE` until a human cosigns from their hardware wallet.
