---
title: "SSH into your Bitcoin node"
description: "Connect to your Bitcoin node over SSH, verify the money supply, check the mempool, and query the blockchain directly. No websites, no APIs, no trust required."
pubDate: 2026-05-02
category: "Bitcoin"
level: "Beginner"
readingTime: "45 min read"
draft: false
---

You bought a Bitcoin node. You plugged it in, synced the blockchain, and now it sits in your closet humming away. It's validating every transaction and every block -- enforcing Bitcoin's rules without asking anyone for permission.

But right now, you're taking its word for it. You haven't actually looked.

This guide changes that. By the end, you'll be able to ask your node direct questions -- how many bitcoin exist, what's in the mempool, how much would it cost to get a transaction confirmed right now -- and get answers that come from your own copy of the blockchain. Not a website. Not an app. Your hardware, your data, your verification.

## In this guide

1. [What we're building toward](#what-were-building-toward) -- what it looks like when you're done
2. [Setup](#setup) -- generate an SSH key, register it with StartOS, connect
3. [Security](#security) -- what SSH access means, how to stay safe
4. [Your first verification](#your-first-verification) -- verify the money supply, check the mempool, estimate fees
5. [What your node sees](#what-your-node-sees) -- network connections, peer activity, mining, difficulty
6. [Appendix A: Under the hood](#appendix-a-under-the-hood) -- container model, bitcoin-cli command reference
7. [Appendix B: Tips and troubleshooting](#appendix-b-tips-and-troubleshooting) -- common errors, server maintenance

---

## What we're building toward

Here's what it looks like when we're done. You open Claude (or any AI assistant with terminal access) and say:

> "Check my node's block height and tell me what's in the mempool."

Claude connects to your node over SSH, runs the commands, and comes back with:

> "Your node is at block 940,219 -- fully synced. The mempool has 45,231 unconfirmed transactions totaling 23.8 MB, with a minimum relay fee of 1 sat/vbyte. Next-block fee estimate is about 12 sats/vbyte."

Or you ask:

> "Verify the total bitcoin supply."

And a few minutes later:

> "Your node counted every unspent output in the blockchain. Total supply: 20,000,457.41 BTC across 164.9 million UTXOs. This matches the expected issuance schedule -- no extra bitcoin have been created."

That's the goal. Your node already knows all of this. We're just opening a channel so you can ask.

### What SSH is (one paragraph)

SSH (Secure Shell) is a way to remotely control a computer using text commands. Instead of sitting in front of your node, you type commands from your laptop and they execute on the node as if you were there. It uses a key pair for security -- a private key on your laptop (like a password file) and a public key on your node (like a lock). If they match, you're in. The connection is encrypted end-to-end, so nobody on your network can see what you're doing.

That's all SSH is. A secure text tunnel between your laptop and your node.

### Why this matters

Bitcoin's entire value proposition rests on one idea: you don't have to trust anyone. Not a bank, not an exchange, not a block explorer website. You can verify everything yourself.

But most node runners don't. They plug in the hardware, check the dashboard occasionally, and trust that it's working. The blockchain data sitting on that device is the most complete, independently verified financial record in existence -- and they never look at it directly.

When you check your balance on a block explorer, you're trusting that website to show you accurate data. When you look up a transaction on a third-party app, you're trusting their server. When you check the current block height on some dashboard, you're trusting whoever runs it.

None of that trust is necessary. Your node has the same data. It verified every byte of it. The only thing missing is a way to ask it questions.

That's what this guide sets up.

### How this guide works

The setup takes about 30 minutes. You'll generate an SSH key, register it with your node, and connect. After that, you (or Claude) can query your node anytime.

Throughout this guide, Claude runs most of the commands for you. You tell Claude what you want to know, and it handles the SSH connection and the `bitcoin-cli` syntax. This is practical -- the commands are long, the output is raw JSON, and Claude can translate both directions.

But there's a tension worth naming. A guide about not trusting third parties is asking you to trust an AI to talk to your node. We think that's the right trade-off for learning -- Claude is a tool running on your machine, executing commands you can see and audit. It's not a custodian or a gatekeeper. It can't move your bitcoin or change your node's configuration with the read-only commands we use here.

Still, you should know how to do this yourself. The main sections use Claude as the interface, but every command Claude runs is a `bitcoin-cli` command you could type manually. Appendix A covers the full command reference and the container architecture, so you can go direct whenever you want. And in [Your first verification](#your-first-verification), you'll run at least one command yourself -- no Claude, no shortcut -- so you feel what direct access is like.

### What you need

- A **StartOS node** running Bitcoin Core, fully synced
- A **laptop or desktop** on the same local network as your node
- **Claude Code** (or any AI assistant with terminal access) -- recommended but not required
- About **30 minutes** for the initial setup

No programming experience required. No Linux experience required. If you can type and follow instructions, you can do this.

---

## Setup

This section gets you from zero to connected. By the end, you'll have an SSH key, your node will recognize it, and you'll have typed your first command on a remote machine.

### Step 1: Generate an SSH key

Open a terminal on your computer (Terminal on Mac/Linux, PowerShell or Git Bash on Windows).

```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_mynode
```

- `-t ed25519` -- the algorithm. Ed25519 is modern, fast, and secure.
- `-f ~/.ssh/id_ed25519_mynode` -- where to save the key. Give it a descriptive name so you know what it's for.

It will ask you to set a **passphrase**. Do it. This encrypts the key file so that even if someone copies it off your machine, they can't use it without the passphrase.

This creates two files:
- `~/.ssh/id_ed25519_mynode` -- your **private key**. Never share this. Never move it off this machine.
- `~/.ssh/id_ed25519_mynode.pub` -- your **public key**. This goes on the node. Safe to share.

**Windows note:** `~` means `C:\Users\YourUsername`. The `.ssh` folder should already exist. If not, create it.

#### How key pairs work

Your private key and public key are mathematically linked. When you connect, your computer proves it has the private key without ever sending it. The node checks this proof against the public key you registered. If they match, you're in.

This is more secure than a password:
- The private key never leaves your machine
- There's nothing to guess or brute-force (256 bits of randomness)
- Each key pair is unique to you

### Step 2: Add your public key to StartOS

1. View your public key:
   ```bash
   # Mac/Linux
   cat ~/.ssh/id_ed25519_mynode.pub

   # Windows (PowerShell)
   type C:\Users\YourUsername\.ssh\id_ed25519_mynode.pub
   ```
2. Copy the entire output (it starts with `ssh-ed25519` and ends with your username)
3. Open your StartOS dashboard in a browser
4. Go to **System > SSH Keys**
5. Paste the public key and save

That's it. Your node now recognizes your laptop.

### Step 3: Find your node's address

You need your node's IP address on your local network. Check one of these:

- **StartOS dashboard:** the address bar in your browser already has it (something like `192.168.1.50`)
- **Router admin page:** look for connected devices -- find the one running StartOS
- **StartOS hostname:** StartOS assigns a `.local` hostname (like `wood-opals.local`), visible in the dashboard. This works on Mac and Linux but is unreliable on Windows.

Write down the IP address. You'll use it once, then we'll create a shortcut.

### Step 4: Connect

```bash
ssh -i ~/.ssh/id_ed25519_mynode start9@192.168.1.50
```

Replace `192.168.1.50` with your node's actual IP.

- `-i` points to your private key
- `start9` is the default username on StartOS

**First connection:** You'll see a message asking if you trust the server's fingerprint. Type `yes`. This only happens once -- SSH remembers the server after that.

**Passphrase prompt:** Enter the passphrase you set during key generation. This is your key's passphrase, not a server password.

If everything worked, your terminal prompt changes to something like:

```
start9@wood-opals:~$
```

You're on your node. Type `exit` to disconnect and return to your laptop's terminal.

### Step 5: Create a shortcut

Typing the full connection string every time is tedious. Create a config file so you never have to again.

Create or edit `~/.ssh/config` (on your laptop, not the node):

```
Host mynode
    HostName 192.168.1.50
    User start9
    IdentityFile ~/.ssh/id_ed25519_mynode
    IdentitiesOnly yes
```

Replace the IP with your node's address. Now connecting is just:

```bash
ssh mynode
```

And running a command without opening a full session:

```bash
ssh mynode "echo hello"
```

If that prints `hello`, your shortcut works.

### Step 6: Set up for Claude (optional)

If you want Claude Code (or another AI assistant) to run commands on your node, there's one extra step. Claude can't type passphrases interactively, so you need to load your key into an SSH agent first.

#### Mac/Linux

The SSH agent usually runs automatically. Just add your key:

```bash
ssh-add ~/.ssh/id_ed25519_mynode
```

Enter your passphrase once. The agent holds the decrypted key in memory until you log out or flush it.

#### Windows

Windows has its own SSH agent, but it needs to be started and you need to make sure your terminal uses the right SSH binary.

**In PowerShell (run as Administrator):**

```powershell
# Check if the agent is running
Get-Service ssh-agent

# If it says "Stopped", start it and set it to auto-start:
Set-Service -Name ssh-agent -StartupType Automatic
Start-Service ssh-agent

# Add your key (prompts for passphrase once)
C:\Windows\System32\OpenSSH\ssh-add.exe C:\Users\YourUsername\.ssh\id_ed25519_mynode
```

**Important for Git Bash users:** Git Bash ships its own SSH binary that does not talk to the Windows agent. If you use Git Bash (or Claude Code on Windows, which uses Git Bash), add these aliases to your `~/.bashrc`:

```bash
export GIT_SSH="/c/Windows/System32/OpenSSH/ssh.exe"
alias ssh='/c/Windows/System32/OpenSSH/ssh.exe'
alias scp='/c/Windows/System32/OpenSSH/scp.exe'
```

Then reload: `source ~/.bashrc`

#### Verify Claude can connect

With the agent loaded, test it:

```bash
ssh mynode "echo connected"
```

If it prints `connected` without asking for a passphrase, Claude can use it too.

#### When you're done for the day

Flush the keys from the agent:

```bash
# Mac/Linux
ssh-add -D

# Windows
C:\Windows\System32\OpenSSH\ssh-add.exe -D
```

This removes the decrypted key from memory. Your key file stays passphrase-protected on disk. More on why this matters in the next section.

### What just happened

You created a cryptographic key pair, registered the public half with your node, and established an encrypted tunnel between your laptop and your server. Every command that travels through this tunnel is encrypted -- nobody on your network can see what you're doing.

Your node is now accessible from your terminal. Next up: understanding what this access means and how to keep it safe.

---

## Security

You now have remote access to your Bitcoin node. That's a powerful thing, and it's worth understanding exactly what it means before you start using it.

This isn't a scare-you-into-quitting section. The risks are manageable and the setup you just completed is solid. But SSH access is full system access, and you should know what that implies.

### What you just opened

SSH gives you a command-line terminal on your server. On StartOS, the SSH user (`start9`) has passwordless `sudo` -- meaning there's no second gate between "logged in" and "full control." Once you're in, you can do anything on the server.

For this guide, we only use read-only commands. You're asking questions, not changing anything. But the access itself is broader than what we use it for.

### Who can reach your node?

This is the most important factor.

| Setup | Risk | Who can attempt to connect |
|-------|------|---------------------------|
| LAN-only (your setup) | Lower | Only devices on your home network |
| Port 22 forwarded on router | High | Anyone on the internet |
| SSH over Tor hidden service | Medium | Anyone who discovers the .onion address |

Your node is LAN-only by default. An attacker would need to be on your WiFi or compromise a device that is.

**Never forward port 22 on your router.** Automated bots scan the entire internet for open SSH ports around the clock. If you need remote access, use a VPN or Tor -- never raw SSH over the open internet.

### What's at stake

If someone obtained your SSH key and passphrase, here's what they could do:

**On the server:**
- Stop, start, or reconfigure services (Bitcoin Core, Electrs, etc.)
- Read configuration files (which contain RPC credentials)
- Modify settings or install malware
- Use your server to attack other devices on your network
- Wipe the blockchain data (hundreds of gigabytes to re-download)

**On Bitcoin Core:**
- View transaction history of any loaded wallet
- If a hot wallet is loaded with funds: potentially send bitcoin
- Change configuration to connect to malicious peers
- Shut down the node

**What they can NOT do:**
- **Steal bitcoin from a hardware wallet** connected through this node. The node validates transactions but never holds the hardware wallet's private keys.
- **Compromise the Bitcoin network.** Your node is one of tens of thousands. It has no special authority.
- **Access funds in external wallets** that connect via Electrum Server. Those wallets hold their own keys.

This is the key distinction: your node is a verification tool, not a custody tool. If you use a hardware wallet, SSH access is a privacy and convenience concern, not a funds-at-risk concern.

### Protecting your key

Your SSH private key is the credential. Protecting it is straightforward:

- **You already set a passphrase** -- this means even if someone copies your key file, they can't use it without cracking the passphrase
- **The private key never leaves your machine** -- SSH proves you have it without transmitting it
- **Key-only authentication** is enabled by default on StartOS -- password login is disabled, so there's nothing to brute-force

Keep the private key on your laptop. Don't copy it to cloud storage, USB drives, or other machines. If you need SSH access from a second device, generate a second key pair and register it separately.

### The SSH agent trade-off

If you set up the SSH agent in Step 6 (so Claude can connect without a passphrase prompt), there's a trade-off to understand:

- The agent holds your **decrypted key in memory**. Any process running as your user can silently ask the agent to sign an authentication challenge.
- This means malware, a compromised browser extension, or a rogue script could SSH to your server without your knowledge.
- The agent does **not** prompt you when a process uses the key -- it signs silently.

This is the same security model used by every developer with GitHub SSH keys. It's standard practice. But you should:

- **Flush the agent when you're done working:** `ssh-add -D`
- **Don't leave the agent loaded while running untrusted software**
- **Think of agent time as a session** -- load the key when you need it, flush it when you're done

### Hot wallets

Check if any wallets are loaded on your node:

```bash
ssh mynode "sudo podman exec bitcoind.embassy bitcoin-cli listwallets"
```

If wallets are loaded and unencrypted, anyone with SSH access can spend from them. This is why the standard recommendation is: **use a hardware wallet, and let the node handle validation only.**

Your node's job is to verify. Your hardware wallet's job is to hold keys. Keep those jobs separate.

### Checklist

Before moving on, confirm:

- [ ] You used an Ed25519 key with a strong passphrase
- [ ] Your node has key-only authentication (StartOS default -- no action needed)
- [ ] Port 22 is NOT forwarded on your router
- [ ] No hot wallets are loaded on the node (or if they are, you understand the risk)
- [ ] If using the SSH agent, you know to flush it when done (`ssh-add -D`)
- [ ] You're using a hardware wallet for any real funds

### The bottom line

SSH to a LAN-only node with a passphrase-protected key is a low-risk setup. The encrypted tunnel, the key pair authentication, and the LAN-only exposure give you a strong security posture without any additional configuration.

The rules are simple: protect your key, don't expose the port, don't store funds on the node, and flush the agent when you're done.

Now let's use this access for what it was built for.

---

## Your first verification

This is the section the setup was for. You're about to independently verify facts about Bitcoin using your own node -- no websites, no APIs, no trust required.

If you're using Claude, tell it what you want to know and it will run the commands over SSH. If you want to understand what's happening under the hood, [Appendix A](#appendix-a-under-the-hood) covers every command in detail.

### Is your node synced?

Before verifying anything, make sure your node is caught up with the network. Ask Claude:

> "Check if my node is fully synced."

Claude runs `getblockchaininfo` and checks two things:
- `blocks` equals `headers` (your node has downloaded and validated all known blocks)
- `verificationprogress` is at or near 1 (100% verified)

If your node is still syncing, the numbers below won't match the current state of the network. Wait until it's done.

#### What "synced" actually means

Your node downloaded every block ever produced -- starting from the genesis block in January 2009 -- and independently validated every transaction in every one of them. It checked every signature, verified every input was unspent, confirmed every coinbase reward was correct, and enforced every consensus rule. That's what `verificationprogress: 1` means. Not "I downloaded the data." But "I checked all of it."

### Verify the money supply

This is the command that makes running a node worth it.

Ask Claude:

> "Verify the total bitcoin supply on my node."

Claude runs `gettxoutsetinfo`, which scans every unspent transaction output (UTXO) in the entire blockchain. This takes several minutes -- it's counting over 160 million individual outputs and summing them.

The result will look something like:

| Field | Value | Meaning |
|-------|-------|---------|
| Total supply | ~20,000,457 BTC | Every bitcoin that currently exists |
| UTXO count | ~164.9 million | Individual unspent outputs |
| Transactions | ~114.4 million | Total transactions ever processed |
| UTXO set size | ~11.3 GB | How much space the state takes on disk |

#### What you just did

You independently verified that approximately 20 million bitcoin exist. Not because a website told you. Not because an exchange reported it. Because your node counted every single unspent output and summed them up.

This is what "don't trust, verify" looks like in practice.

Bitcoin's issuance schedule says roughly 19.8 million BTC should have been mined by now (the number creeps toward 21 million over the next century). Your node's count should match the expected issuance. If it didn't -- if someone had inflated the supply -- your node would have rejected the invalid blocks during sync. The fact that it synced successfully is itself a verification.

#### The UTXO set hash

The result also includes a field called `hash_serialized_3` -- a cryptographic fingerprint of the entire UTXO set. If your hash matches another node's hash at the same block height, you've both independently proven you agree on the exact state of every bitcoin in existence. No coordination needed. No trust required. Just math.

### Check the mempool

The mempool is where unconfirmed transactions wait to be included in a block. Every node maintains its own mempool.

Ask Claude:

> "What's in my node's mempool right now?"

The key numbers:

| Field | What it tells you |
|-------|------------------|
| Transaction count | How many transactions are waiting for confirmation |
| Total size | Combined size in bytes -- relates to how many blocks it would take to clear |
| Total fees | Sum of all fees waiting to be collected by miners |
| Minimum fee | The lowest fee rate your mempool will accept (rises when the mempool is full) |

#### Why this matters

When the mempool is large and fees are high, the network is busy. When it's small and fees are low, it's quiet. Your node sees this in real time, from its own perspective -- based on the transactions its peers have relayed to it.

This is the same data that fee estimation websites show you, but you're not trusting their server. You're reading it directly from your own node's memory.

### Estimate fees

If you're about to send a transaction, you want to know what fee rate will get it confirmed in a reasonable time.

Ask Claude:

> "What's the fee estimate for next-block confirmation? And for within an hour?"

Your node tracks recent blocks to estimate fee rates. The results:

- **Next block (1 block):** The fee rate needed to likely get into the very next block. This is the "urgent" rate.
- **Within an hour (6 blocks):** A more economical rate for transactions that can wait.
- **Within a day (144 blocks):** The cheapest rate that will still confirm eventually.

The fee rate is expressed in **sats/vbyte** -- satoshis per virtual byte of transaction data. A typical transaction is about 140 vbytes, so multiply the rate by 140 to estimate your total fee in satoshis.

Your node's estimate comes from its own observation of recent blocks and mempool conditions. It's not relying on a third-party API -- it watched the blocks come in and calculated the rates itself.

### Inspect a block

Every block has a height (its position in the chain) and a hash (its unique identifier).

Ask Claude:

> "Show me the latest block."

Or pick a specific one:

> "Show me block 100,000."

The interesting fields:

| Field | What it tells you |
|-------|------------------|
| Height | Position in the chain (0 = genesis block) |
| Transaction count | How many transactions the miner included |
| Timestamp | When the miner started working on it |
| Difficulty | Mining difficulty when this block was found |
| Confirmations | How many blocks have been built on top of it |
| Previous block hash | The block before this one -- this is what makes it a chain |

#### The Genesis Block

Block 0 -- mined by Satoshi Nakamoto on January 3, 2009. Ask Claude to pull it up. It contains the famous coinbase message: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks."

Every block since then links back to this one through an unbroken chain of hashes. Your node verified all of them.

### Look up a transaction

If you have a transaction ID (txid), your node can decode it:

> "Look up this transaction: [paste txid]"

You'll see:
- **Inputs:** where the bitcoin came from
- **Outputs:** where it went and how much
- **Fee:** how much the sender paid the miner
- **Block:** which block confirmed it (or "mempool" if it's still unconfirmed)

You can also check whether a specific output has been spent:

> "Is this output still unspent? [txid, output index]"

If it returns data, the bitcoin is still sitting there. If it returns nothing, it's been spent.

### Do it yourself

You've been letting Claude handle the commands. Now try one yourself.

Open your terminal and type this exactly:

```bash
ssh mynode "sudo podman exec bitcoind.embassy bitcoin-cli getblockcount"
```

That's it. One command. Your laptop connects to your node over SSH, reaches into the Bitcoin Core container, asks for the current block height, and prints the number.

No AI. No website. No intermediary. Your laptop asked your node a question and got a direct answer.

The number you see is the block height your node has verified -- every block from genesis to that number, independently validated by your hardware. Every block explorer in the world should show the same number. If one doesn't, the question isn't whether your node is wrong.

This is the feeling the rest of the guide is built on. Everything Claude does for you is this same command with different arguments. The convenience is real, but so is the ability to go direct.

---

## What your node sees

Your node isn't just a database of old blocks. It's an active participant in the Bitcoin network -- connected to other nodes, relaying transactions, validating new blocks as they arrive, and maintaining its own view of the network's current state.

This section is about understanding that view.

### Your peers

Your node is connected to a handful of other nodes around the world. These are your peers -- the nodes you exchange transactions and blocks with.

Ask Claude:

> "How many peers is my node connected to? Are any on Tor?"

A healthy node typically has 8-10 outbound connections (peers you reached out to) and may accept inbound connections too (peers who found you). The total is usually between 8 and 125, depending on your configuration.

#### Why peer count matters

Every transaction you receive and every block you validate comes through your peers. If you had zero peers, your node would be isolated -- it couldn't learn about new blocks or relay transactions. More peers means more redundancy: if one goes down or tries to feed you bad data, the others keep you honest.

You don't need many. Bitcoin is designed so that even a single honest peer is enough to keep you on the correct chain. But more connections mean faster propagation and better resilience.

#### What you can learn from peer details

Claude can pull detailed information about each peer: their IP address (or Tor `.onion` address), what version of Bitcoin Core they're running, how long you've been connected, and how much data you've exchanged.

Interesting things to ask about:

- **Tor peers:** Connections over the Tor network show up with `.onion` addresses. StartOS routes through Tor by default, so many of your peers may be Tor connections.
- **Inbound vs. outbound:** Outbound peers are ones you chose. Inbound peers found you. A mix of both is healthy.
- **Version diversity:** Your peers may run different versions of Bitcoin Core (or even different implementations). As long as they follow the consensus rules, this works fine -- and it's good for the network.
- **Data exchanged:** High byte counts mean active peers. If a peer has been connected for days but barely exchanged data, it might be a passive connection.

### The mempool in motion

You checked the mempool earlier in this guide. Here's the deeper picture of what's actually happening.

Every time someone broadcasts a transaction, it ripples through the network from node to node. Your node receives it from a peer, validates it (checks that the inputs are unspent, the signatures are valid, the fee meets the minimum), and adds it to its mempool. Then it relays the transaction to its other peers.

This means your mempool is *your node's view* of unconfirmed transactions. It's not identical to every other node's mempool -- transactions propagate at different speeds, nodes have different minimum fee policies, and mempool size limits vary. But in practice, well-connected nodes agree on most of the mempool most of the time.

#### When the mempool gets full

Your node allocates a fixed amount of memory for the mempool (300 MB by default). When it fills up, the node starts dropping the lowest-fee transactions to make room for higher-fee ones. The `mempoolminfee` field rises -- your node is being selective about what it keeps.

This is the market for block space in action. When demand exceeds supply (more transactions than can fit in the next block), fees rise. When demand drops, fees fall. Your node watches this happen in real time.

Ask Claude:

> "Is the mempool full right now? What's the minimum fee to get in?"

### Fee dynamics

Fee estimation isn't just a number -- it's your node's analysis of recent history.

Bitcoin Core looks at the last several hundred blocks and tracks which fee rates got confirmed in how many blocks. From this, it builds a statistical model: "Based on recent history, a transaction paying X sats/vbyte has a Y% chance of confirming within N blocks."

This is more sophisticated than most fee estimation websites, which often just look at the current mempool. Your node's estimate accounts for how quickly the mempool has been clearing, how fee rates have been trending, and how much variance there's been.

#### Reading fee trends

Ask Claude to compare estimates at different time horizons:

> "What are the fee estimates for 1 block, 6 blocks, and 144 blocks?"

If the gap between next-block and next-day is large, the network is congested -- there's a premium for urgency. If they're close together, the network is quiet and patience doesn't save much.

You can also ask for a snapshot over time:

> "What were the fee estimates yesterday? How do they compare to now?"

This gives you a sense of whether fees are trending up or down -- useful context before sending a transaction.

### Mining and difficulty

Your node tracks the current mining difficulty and estimates the total network hash rate.

#### Difficulty

Mining difficulty adjusts every 2,016 blocks (roughly two weeks). The adjustment keeps the average block time at 10 minutes regardless of how much computing power is on the network. If miners join, difficulty goes up. If they leave, it goes down.

Ask Claude:

> "What's the current mining difficulty? When was the last adjustment?"

#### Network hash rate

Your node estimates the total hash rate by looking at how quickly blocks are being found relative to the difficulty target. This is an estimate, not a measurement -- nobody can directly observe the total hash power.

> "What's the estimated network hash rate?"

The number is staggeringly large. As of early 2026, the Bitcoin network computes hundreds of exahashes per second -- more computational work per second than any other system in human history. This is what secures the ledger you just queried.

### Bandwidth

Your node sends and receives data constantly -- relaying transactions, sharing blocks, responding to peer requests.

Ask Claude:

> "How much data has my node sent and received since it last started?"

This is useful for monitoring. If you're on a metered connection or a low-bandwidth setup, knowing your node's data usage helps you plan. A fully synced node with default settings typically uses 50-200 GB per month, mostly from relaying transactions and serving blocks to peers.

### Your node's identity

Your node broadcasts a version string to its peers -- something like `/Satoshi:28.0.0/`. This tells the network what software you're running.

Ask Claude:

> "What version of Bitcoin Core is my node running? What networks is it connected to?"

The networks field shows whether your node is reachable over IPv4, IPv6, Tor, or I2P. StartOS nodes are typically Tor-connected, which provides privacy -- your peers see your `.onion` address, not your home IP.

### Putting it together

Your node is a window into the Bitcoin network. Through it, you can see:

- **The complete ledger:** every transaction ever confirmed, every UTXO in existence
- **The current market for block space:** mempool size, fee rates, confirmation estimates
- **The network's infrastructure:** your peers, their software, the data flowing between you
- **The security model:** hash rate, difficulty, block production rate

Every piece of this data is independently verified by your hardware. Your node didn't download someone else's conclusions -- it checked everything from scratch.

This is what it means to run a full node. Not just "I have one." But "I can see what it sees."

---

## Appendix A: Under the hood

This appendix covers what Claude does behind the scenes when it queries your node. If you want to run commands manually, understand the container model, or look up a specific `bitcoin-cli` command, this is the reference.

### The container model

StartOS doesn't run Bitcoin Core directly on the server. It runs inside a **Podman container** -- an isolated environment that packages the software with everything it needs.

Think of your server as an apartment building. Each service (Bitcoin Core, Electrum Server, Lightning) lives in its own apartment. They share the building's resources but can't interfere with each other.

This means you can't just type `bitcoin-cli` on the server. You need to reach into the container first:

```bash
sudo podman exec bitcoind.embassy bitcoin-cli <command>
```

`exec` means "execute this command inside the named container."

#### Opening an interactive shell

If you plan to run several commands, drop into the container directly:

```bash
sudo podman exec -it bitcoind.embassy bash
```

Now you can type `bitcoin-cli` commands without the `podman exec` prefix. Type `exit` to leave and return to the server shell.

#### Container management

| Command | What it does |
|---------|-------------|
| `sudo podman ps` | List running containers |
| `sudo podman logs bitcoind.embassy --tail 50` | Last 50 lines of Bitcoin Core logs |
| `sudo podman logs bitcoind.embassy --follow` | Follow logs in real time (Ctrl+C to stop) |
| `sudo podman restart bitcoind.embassy` | Restart Bitcoin Core (safe -- it picks up where it left off) |

#### Where data lives

Inside the container, Bitcoin Core's data is at `/root/.bitcoin/`:

| Path | What it is |
|------|-----------|
| `bitcoin.conf` | Configuration (settings, RPC credentials) |
| `blocks/` | The blockchain data (hundreds of GB) |
| `chainstate/` | UTXO set database |
| `wallets/` | Wallet files (if any) |
| `debug.log` | Bitcoin Core's log file |

You generally don't need to touch these. `bitcoin-cli` is the intended interface.

### Running commands manually

Every command Claude runs follows this pattern:

```bash
ssh mynode "sudo podman exec bitcoind.embassy bitcoin-cli <command>"
```

Or if you're already SSH'd in:

```bash
sudo podman exec bitcoind.embassy bitcoin-cli <command>
```

Or inside the container:

```bash
bitcoin-cli <command>
```

#### Create a shortcut

Add an alias to your server's `.bashrc` to skip the `podman exec` prefix:

```bash
ssh mynode
echo 'alias btc="sudo podman exec bitcoind.embassy bitcoin-cli"' >> ~/.bashrc
source ~/.bashrc
```

Now commands are just:

```bash
btc getblockcount
btc getmempoolinfo
btc estimatesmartfee 6
```

#### Run a command without logging in

You don't have to open a full SSH session:

```bash
ssh mynode "sudo podman exec bitcoind.embassy bitcoin-cli getblockcount"
```

Connects, runs the command, prints the result, disconnects.

### Command reference

All commands are read-only. You cannot break your node by running these.

#### Getting help

```bash
bitcoin-cli help                        # List all commands
bitcoin-cli help getblockchaininfo      # Detailed help for one command
```

The built-in help matches your exact version of Bitcoin Core -- it's the most reliable reference.

#### Blockchain

| Command | What it returns |
|---------|----------------|
| `getblockchaininfo` | Chain, height, sync status, pruning, disk size |
| `getblockcount` | Current block height (just the number) |
| `getbestblockhash` | Hash of the latest block |
| `getblock "hash"` | Full details of a specific block |
| `getblockhash <height>` | Block hash by height |
| `getblockstats <height>` | Detailed statistics for one block |
| `getdifficulty` | Current mining difficulty |
| `getchaintxstats` | Transaction rate over time (default: 30 days) |
| `getchaintxstats 144` | Transaction rate over last ~24 hours |

#### UTXO set

| Command | What it returns |
|---------|----------------|
| `gettxoutsetinfo` | Total supply, UTXO count, set size (takes minutes) |
| `gettxout "txid" n` | Whether a specific output is unspent |

#### Mempool

| Command | What it returns |
|---------|----------------|
| `getmempoolinfo` | Size, tx count, memory usage, min fee |
| `getrawmempool` | List of all unconfirmed transaction IDs |
| `getmempoolentry "txid"` | Details on one mempool transaction |
| `estimatesmartfee <blocks>` | Fee rate for confirmation in N blocks |

#### Network

| Command | What it returns |
|---------|----------------|
| `getnetworkinfo` | Version, protocol, connections, networks |
| `getpeerinfo` | Detailed info on every connected peer |
| `getconnectioncount` | Number of peers (just the number) |
| `getnettotals` | Total bytes sent and received |

#### Mining

| Command | What it returns |
|---------|----------------|
| `getmininginfo` | Difficulty, hash rate, current block |
| `getnetworkhashps` | Estimated network hash rate |
| `getnetworkhashps 2016` | Hash rate over one difficulty period |

#### Transactions

| Command | What it returns |
|---------|----------------|
| `getrawtransaction "txid" 1` | Decoded transaction (1 = human-readable) |
| `decoderawtransaction "hex"` | Decode raw transaction hex |

### Reading JSON output

Most commands return JSON. Here's how to read it:

```bash
bitcoin-cli getblockchaininfo
```

```json
{
  "chain": "main",
  "blocks": 940219,
  "headers": 940219,
  "bestblockhash": "00000000000000000000ba29...",
  "difficulty": 145042165424853.3,
  "verificationprogress": 1,
  "pruned": false,
  "size_on_disk": 826789612252
}
```

Key things to check:
- `"chain": "main"` -- you're on mainnet, not testnet
- `"blocks"` equals `"headers"` -- fully synced
- `"verificationprogress": 1` -- 100% verified
- `"pruned": false` -- running a full (non-pruned) node

### Server commands

These run on the server itself, outside the container:

| Command | What it does |
|---------|-------------|
| `df -h` | Disk space usage (is your drive getting full?) |
| `free -h` | Memory (RAM) usage |
| `uptime` | How long the server has been running |
| `top` | Live CPU/memory view (press `q` to quit) |
| `ls -la` | List files with details |
| `pwd` | Print current directory |

---

## Appendix B: Tips and troubleshooting

### Tips

#### Check your node from your phone

Most SSH apps (Termius, JuiceSSH) support key-based authentication. Import your private key and you can check your node from anywhere on your home network.

#### Quick status check

Three commands give you a fast snapshot:

```bash
ssh mynode "sudo podman exec bitcoind.embassy bitcoin-cli getblockcount"
ssh mynode "sudo podman exec bitcoind.embassy bitcoin-cli getconnectioncount"
ssh mynode "sudo podman exec bitcoind.embassy bitcoin-cli getmempoolinfo"
```

Block height, peer count, mempool size. If all three return reasonable numbers, your node is synced, connected, and healthy.

Or just ask Claude: "Is my node healthy?"

### Common errors

#### "Connection refused" when SSHing

```
ssh: connect to host 192.168.1.50 port 22: Connection refused
```

**Cause:** SSH server isn't running, or the IP address is wrong.

**Fix:**
- Check your node's IP address. IPs can change if you don't have a static lease on your router. Look up the current address in your router's device list or the StartOS dashboard.
- Restart the server if you have physical access.
- Confirm SSH is enabled in the StartOS dashboard under System > SSH.

#### "Permission denied (publickey)"

```
start9@192.168.1.50: Permission denied (publickey).
```

**Cause:** The server doesn't recognize your key.

**Fix:**
- Confirm you added the **public key** (`.pub` file), not the private key, to StartOS
- Check that you're pointing to the right private key: `ssh -i ~/.ssh/id_ed25519_mynode ...`
- Verify the username is `start9`
- Check file permissions on your key: `chmod 600 ~/.ssh/id_ed25519_mynode`

#### "Could not open a connection to your authentication agent"

```
Could not open a connection to your authentication agent.
```

**Cause:** `ssh-add` can't find a running SSH agent.

**Fix:**
- **Windows:** You may have two `ssh-add` binaries (Git Bash's and Windows OpenSSH's). Use the full path: `C:\Windows\System32\OpenSSH\ssh-add.exe`
- **Mac/Linux:** Start the agent first: `eval $(ssh-agent -s)`

#### "Host key verification failed"

```
WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!
```

**Cause:** Your node's fingerprint changed since your last connection. This happens if you reinstalled StartOS or reset the server.

**Fix:**
- If you know why it changed (reinstall, hardware swap), remove the old entry:
  ```bash
  ssh-keygen -R 192.168.1.50
  ```
- If you don't know why, investigate before connecting. This warning protects you from man-in-the-middle attacks.

#### "error: Could not connect to the server 127.0.0.1:8332"

```
error: Could not connect to the server 127.0.0.1:8332
```

**Cause:** Bitcoin Core isn't running, or you ran `bitcoin-cli` outside the container.

**Fix:**
- Make sure you're using the `podman exec` prefix: `sudo podman exec bitcoind.embassy bitcoin-cli ...`
- Check if the container is running: `sudo podman ps`
- Check Bitcoin Core's logs: `sudo podman logs bitcoind.embassy --tail 20`

#### "bitcoin-cli: command not found"

**Cause:** You're on the server shell, not inside the container.

**Fix:** Either exec into the container first (`sudo podman exec -it bitcoind.embassy bash`) or use the full `podman exec` command from the server shell.

### Server maintenance

#### Check disk space

```bash
ssh mynode "df -h"
```

A full (unpruned) node uses 800+ GB and growing. If your drive fills up, Bitcoin Core will stop syncing.

#### Check if services are running

```bash
ssh mynode "sudo podman ps"
```

You should see `bitcoind.embassy` in the list. If Electrs is installed, you'll see `electrs.embassy` too.

#### View Bitcoin Core logs

```bash
# Last 20 lines
ssh mynode "sudo podman logs bitcoind.embassy --tail 20"
```

#### Restart Bitcoin Core

Use the StartOS dashboard when possible (Services > Bitcoin Core > Restart). If you need to do it via SSH:

```bash
ssh mynode "sudo podman restart bitcoind.embassy"
```

This is safe. Bitcoin Core picks up where it left off.

### When to ask for help

If you see errors about database corruption, unexpected shutdowns, or "block validation failed," don't try to fix these yourself. These are rare but serious.

- **StartOS support:** community.start9.com
- **Bitcoin Core general:** bitcointalk.org or the bitcoin-dev mailing list
