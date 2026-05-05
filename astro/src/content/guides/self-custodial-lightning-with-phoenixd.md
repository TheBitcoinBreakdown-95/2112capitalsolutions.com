---
title: "Self-custodial Lightning with phoenixd"
description: "Install phoenixd on a Linux server, add Lightning payment capabilities to a web dashboard, set up a public Lightning address, and start receiving payments -- all self-custodial, no KYC."
pubDate: 2026-05-02
category: "Bitcoin"
level: "Intermediate"
readingTime: "45 min read"
draft: false
---

> Step-by-step guide to setting up a Lightning wallet, web dashboard, and public Lightning address. No KYC, no custodian, no channel management.

**Time:** ~2 hours (most of it waiting for channel confirmation)
**Requirements:** Ubuntu server (or similar Linux VPS), SSH access, a domain (for Lightning address)

---

## Table of contents

1. [Why phoenixd](#1-why-phoenixd)
2. [Install phoenixd](#2-install-phoenixd)
3. [Run as a systemd service](#3-run-as-a-systemd-service)
4. [Dashboard proxy routes](#4-dashboard-proxy-routes)
5. [Dashboard Lightning tab (frontend)](#5-dashboard-lightning-tab-frontend)
6. [Fund your first channel](#6-fund-your-first-channel)
7. [LNURL-pay server (Lightning address)](#7-lnurl-pay-server-lightning-address)
8. [Tailscale Funnel (public exposure)](#8-tailscale-funnel-public-exposure)
9. [DNS: the .well-known file](#9-dns-the-well-known-file)
10. [How a payment flows](#10-how-a-payment-flows)
11. [Maintenance](#11-maintenance)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Why phoenixd

phoenixd is the server version of the Phoenix mobile wallet by ACINQ. It's the right choice for self-hosted setups:

- **Self-custodial** -- you hold your own keys
- **No KYC** -- ACINQ's LSP opens channels automatically, no account needed
- **Zero channel management** -- ACINQ handles opens, splices, and liquidity
- **Clean HTTP API** -- single process, REST endpoints, HTTP Basic Auth
- **Lightweight** -- Kotlin Native binary, no JVM, no Docker

Alternatives like LND or CLN require manual channel management and are significantly more complex. phoenixd trades some control for simplicity -- the right trade for most setups.

---

## 2. Install phoenixd

SSH into your server:

```bash
# Check you have enough disk (needs < 100MB)
df -h /

# Download latest release (check https://github.com/ACINQ/phoenixd/releases for current version)
mkdir -p ~/phoenixd && cd ~/phoenixd
wget https://github.com/ACINQ/phoenixd/releases/download/v0.7.3/phoenixd-0.7.3-linux-x64.zip
unzip phoenixd-0.7.3-linux-x64.zip
```

### First run (seed generation)

The first run generates your 12-word seed and API passwords. It requires two interactive confirmations:

```bash
cd ~/phoenixd/phoenixd-0.7.3-linux-x64
echo -e "yes\nyes" | ./phoenixd
# Wait a few seconds for it to initialize, then Ctrl+C
```

This creates `~/.phoenix/` with:
- `seed.dat` -- **your master key. Back this up offline immediately.**
- `phoenix.conf` -- API passwords (full access + limited access) and webhook secret

### Verify the config

```bash
cat ~/.phoenix/phoenix.conf
```

You should see three lines: `http-password`, `http-password-limited-access`, and `webhook-secret`.

---

## 3. Run as a systemd service

If your user does not have sudo access, use `systemctl --user`:

```bash
mkdir -p ~/.config/systemd/user

cat > ~/.config/systemd/user/phoenixd.service << 'EOF'
[Unit]
Description=phoenixd Lightning node
After=network-online.target
Wants=network-online.target

[Service]
ExecStart=/home/YOUR_USERNAME/phoenixd/phoenixd-0.7.3-linux-x64/phoenixd --silent
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=default.target
EOF
```

**Replace `YOUR_USERNAME`** with your actual Linux username.

```bash
systemctl --user daemon-reload
systemctl --user enable phoenixd
systemctl --user start phoenixd
```

Verify it's running:

```bash
systemctl --user status phoenixd
# Should show "active (running)"

# Test the API
HTTP_PASS=$(grep "^http-password=" ~/.phoenix/phoenix.conf | head -1 | cut -d= -f2)
curl -u :$HTTP_PASS http://localhost:9740/getinfo
```

### Auto-start on boot

User services only start when the user is logged in. To start at boot without a login session:

```bash
loginctl enable-linger $USER
```

---

## 4. Dashboard proxy routes

If you're running a web dashboard as an Express.js app, you can proxy phoenixd through it so the Lightning API never touches the network directly. phoenixd runs on `127.0.0.1:9740` -- the dashboard forwards requests to it.

Add this to your `server.js` **before** `app.listen(...)`:

```javascript
// --- Lightning / phoenixd proxy ---
const fs = require('fs');

function phoenixdFetch(endpoint, options = {}) {
  const conf = fs.readFileSync(process.env.HOME + '/.phoenix/phoenix.conf', 'utf8');
  const pw1 = conf.match(/http-password=(.+)/)?.[1]?.trim();
  const pw2 = conf.match(/http-password-limited-access=(.+)/)?.[1]?.trim();
  const password = pw1 || pw2;
  const url = 'http://localhost:9740' + endpoint;
  options.headers = options.headers || {};
  options.headers['Authorization'] = 'Basic ' + Buffer.from(':' + password).toString('base64');
  if (options.body && !options.headers['Content-Type']) {
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  return fetch(url, options).then(res => {
    if (!res.ok) throw new Error('phoenixd ' + res.status);
    return res.json();
  });
}

app.get('/api/lightning/info', async (req, res) => {
  try { res.json(await phoenixdFetch('/getinfo')); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/lightning/balance', async (req, res) => {
  try { res.json(await phoenixdFetch('/getbalance')); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/lightning/payments', async (req, res) => {
  try {
    const [inc, out] = await Promise.all([
      phoenixdFetch('/payments/incoming?limit=50'),
      phoenixdFetch('/payments/outgoing?limit=50')
    ]);
    res.json({ incoming: inc, outgoing: out });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/lightning/invoice', async (req, res) => {
  try {
    const { amountSat, description } = req.body;
    if (!amountSat) return res.status(400).json({ error: 'amountSat required' });
    const params = new URLSearchParams({ amountSat: String(amountSat), description: description || 'Invoice' });
    res.json(await phoenixdFetch('/createinvoice', { method: 'POST', body: params.toString() }));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/lightning/channels', async (req, res) => {
  try { res.json(await phoenixdFetch('/channels')); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/lightning/offer', async (req, res) => {
  try {
    const conf = fs.readFileSync(process.env.HOME + '/.phoenix/phoenix.conf', 'utf8');
    const password = conf.match(/^http-password=(.+)/m)?.[1]?.trim();
    const auth = Buffer.from(':' + password).toString('base64');
    const r = await fetch('http://127.0.0.1:9740/getoffer', { headers: { 'Authorization': 'Basic ' + auth } });
    const raw = await r.text();
    const offer = raw.startsWith('"') ? JSON.parse(raw) : raw.trim();
    res.json({ offer });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/lightning/payinvoice', async (req, res) => {
  try {
    const { invoice } = req.body;
    if (!invoice) return res.status(400).json({ error: 'invoice required' });
    const params = new URLSearchParams({ invoice });
    res.json(await phoenixdFetch('/payinvoice', { method: 'POST', body: params.toString() }));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/lightning/lnurlpay', async (req, res) => {
  try {
    const { lnurl, amountSat, message } = req.body;
    if (!lnurl || !amountSat) return res.status(400).json({ error: 'lnurl and amountSat required' });
    const params = new URLSearchParams({ lnurl, amountSat: String(amountSat) });
    if (message) params.set('message', message);
    res.json(await phoenixdFetch('/lnurlpay', { method: 'POST', body: params.toString() }));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/lightning/paylnaddress', async (req, res) => {
  try {
    const { address, amountSat, message } = req.body;
    if (!address || !amountSat) return res.status(400).json({ error: 'address and amountSat required' });
    const params = new URLSearchParams({ address, amountSat: String(amountSat) });
    if (message) params.set('message', message);
    res.json(await phoenixdFetch('/paylnaddress', { method: 'POST', body: params.toString() }));
  } catch (e) { res.status(500).json({ error: e.message }); }
});
```

Restart your dashboard after adding this:

```bash
# However your dashboard restarts -- typically:
systemctl --user restart your-dashboard
# or: pm2 restart dashboard
# or: kill the process and re-run node server.js
```

---

## 5. Dashboard Lightning tab (frontend)

Add to your dashboard's `index.html`.

### Dependencies

Download qrcode.js (CDN may be unreachable from your server):

```bash
cd /path/to/your/dashboard/public
curl -sL https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js -o qrcode.min.js
# If curl fails, download on another machine and SCP it over
```

Add the script tag in `index.html` before your main `<script>`:

```html
<script src="/qrcode.min.js"></script>
```

### Navigation

Add a Lightning button to your nav:

```html
<button onclick="showSection('lightning',this)">
  <span class="icon">&#x26A1;</span><span class="nav-label">Lightning</span>
</button>
```

And a section div in your content area:

```html
<div id="lightning" class="section"></div>
```

Wire it up in your existing `showSection` function (or equivalent):

```javascript
if (id === 'lightning') loadLightning();
```

### JavaScript

Add this to your `<script>` block. This is the full Lightning tab -- balance, channels, receive (invoice + Bolt12 offer with QR), send (invoice/LNURL/address/Bolt12), and payment history:

```javascript
// --- Lightning tab ---
let lnSendTab = 'invoice';
let lnReceiveTab = 'invoice';

async function loadLightning() {
  const section = document.getElementById('lightning');
  section.innerHTML = '<div style="padding:20px;color:var(--text-dim)">Loading...</div>';
  try {
    const [bal, info, pmts, channels] = await Promise.all([
      fetch('/api/lightning/balance').then(r => r.json()),
      fetch('/api/lightning/info').then(r => r.json()),
      fetch('/api/lightning/payments').then(r => r.json()),
      fetch('/api/lightning/channels').then(r => r.json())
    ]);
    section.innerHTML =
      lnBalanceCard(bal, info) +
      lnChannelsCard(channels) +
      lnReceiveCard() +
      lnSendCard() +
      lnPaymentsCard(pmts);
    lnLoadOffer();
  } catch (e) {
    section.innerHTML =
      '<div class="card"><div class="card-body" style="color:var(--danger)">Could not reach phoenixd: ' + e.message + '</div></div>';
  }
}

function lnBalanceCard(bal, info) {
  var usd = (bal.balanceSat * 85000 / 1e8).toFixed(2);
  var chCount = Array.isArray(info.channels) ? info.channels.length : 0;
  return '<div class="card" id="ln-balance-card">' +
    '<div class="card-header" onclick="toggleCard(this)">Balance <span class="arrow">&#x25BE;</span></div>' +
    '<div class="card-body">' +
      '<div style="font-size:1.5rem;font-weight:700">' + bal.balanceSat.toLocaleString() + ' sats</div>' +
      '<div style="color:var(--text-dim);font-size:0.85rem">~$' + usd + ' USD</div>' +
      '<div style="margin-top:8px;color:var(--text-dim);font-size:0.8rem">' + chCount + ' channel' + (chCount !== 1 ? 's' : '') + '</div>' +
    '</div></div>';
}

function lnChannelsCard(channels) {
  if (!channels || !channels.length) return '';
  var list = channels.slice(0, 5).map(function(c) {
    return '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)">' +
      '<div style="font-size:0.8rem;word-break:break-all;max-width:70%">' + (c.alias || c.remoteId?.slice(0, 8) || 'Unknown') + '</div>' +
      '<div style="font-size:0.8rem;color:var(--text-dim)">' + (c.balanceMsat / 1000).toLocaleString() + ' sats</div></div>';
  }).join('');
  return '<div class="card"><div class="card-header" onclick="toggleCard(this)">Channels (' + channels.length + ') <span class="arrow">&#x25BE;</span></div>' +
    '<div class="card-body" style="padding:0">' + list + '</div></div>';
}

function lnSubNav(tabs, active, setFn) {
  return '<div style="display:flex;gap:4px;margin-bottom:12px">' +
    tabs.map(function(t) { return '<button class="btn btn-sm ' + (t.id === active ? '' : 'btn-ghost') + '" onclick="' + setFn + "('" + t.id + "')\">" + t.label + '</button>'; }).join('') +
    '</div>';
}

function lnSetReceiveTab(tab) { lnReceiveTab = tab; loadLightning(); }
function lnSetSendTab(tab) { lnSendTab = tab; loadLightning(); }

function lnReceiveCard() {
  var tabs = [{id:'invoice',label:'Invoice'},{id:'offer',label:'Offer'}];
  var body = lnSubNav(tabs, lnReceiveTab, 'lnSetReceiveTab');
  if (lnReceiveTab === 'invoice') {
    body +=
      '<div style="display:flex;gap:8px;margin-bottom:8px">' +
        '<input type="number" id="ln-inv-amount" placeholder="Amount (sats)" style="flex:1">' +
        '<input type="text" id="ln-inv-desc" placeholder="Description" style="flex:2">' +
        '<button class="btn btn-sm" onclick="lnCreateInvoice()">Create</button>' +
      '</div>' +
      '<div id="ln-invoice-result"></div>';
  } else {
    body +=
      '<div style="color:var(--text-dim);font-size:0.85rem;margin-bottom:10px">Your static Bolt12 offer -- share this to receive payments without creating a new invoice each time.</div>' +
      '<div id="ln-offer-result"><div style="color:var(--text-dim)">Loading offer...</div></div>';
    setTimeout(lnLoadOffer, 50);
  }
  return '<div class="card"><div class="card-header" onclick="toggleCard(this)">Receive <span class="arrow">&#x25BE;</span></div>' +
    '<div class="card-body" id="ln-receive-body">' + body + '</div></div>';
}

function lnSendCard() {
  var tabs = [{id:'invoice',label:'Invoice'},{id:'lnurl',label:'LNURL'},{id:'address',label:'Address'},{id:'bolt12',label:'Bolt12'}];
  var body = lnSubNav(tabs, lnSendTab, 'lnSetSendTab');
  body += lnSendFields(lnSendTab);
  return '<div class="card"><div class="card-header" onclick="toggleCard(this)">Pay <span class="arrow">&#x25BE;</span></div>' +
    '<div class="card-body" id="ln-send-body">' + body + '</div></div>';
}

function lnSendFields(tab) {
  if (tab === 'invoice') {
    return '<div style="display:flex;gap:8px;margin-bottom:8px">' +
        '<input type="text" id="ln-pay-invoice" placeholder="Paste Lightning invoice (lnbc...)" style="flex:1">' +
        '<button class="btn btn-sm" onclick="lnPayInvoice()">Pay</button>' +
      '</div><div id="ln-send-result"></div>';
  } else if (tab === 'lnurl') {
    return '<div style="display:flex;gap:8px;margin-bottom:8px">' +
        '<input type="text" id="ln-pay-lnurl" placeholder="LNURL..." style="flex:1">' +
        '<input type="number" id="ln-pay-lnurl-amount" placeholder="Amount (sats)" style="flex:1">' +
        '<button class="btn btn-sm" onclick="lnPayLnurl()">Pay</button>' +
      '</div><div id="ln-send-result"></div>';
  } else if (tab === 'address') {
    return '<div style="display:flex;gap:8px;margin-bottom:8px">' +
        '<input type="text" id="ln-pay-address" placeholder="user@provider.com" style="flex:1">' +
        '<input type="number" id="ln-pay-address-amount" placeholder="Amount (sats)" style="flex:1">' +
        '<button class="btn btn-sm" onclick="lnPayAddress()">Pay</button>' +
      '</div><div id="ln-send-result"></div>';
  } else if (tab === 'bolt12') {
    return '<div style="display:flex;gap:8px;margin-bottom:8px">' +
        '<input type="text" id="ln-pay-offer" placeholder="lno1..." style="flex:1">' +
        '<input type="number" id="ln-pay-offer-amount" placeholder="Amount (sats)" style="flex:1">' +
        '<button class="btn btn-sm" onclick="lnPayOffer()">Pay</button>' +
      '</div><div id="ln-send-result"></div>';
  }
  return '';
}

function lnPaymentsCard(pmts) {
  var inc = (pmts.incoming || []).filter(function(p) { return p.isPaid; }).map(function(p) { return Object.assign({}, p, {dir:'in'}); });
  var out = (pmts.outgoing || []).filter(function(p) { return p.isPaid; }).map(function(p) { return Object.assign({}, p, {dir:'out'}); });
  var all = inc.concat(out).sort(function(a,b) { return (b.completedAt||0)-(a.completedAt||0); });
  var body;
  if (!all.length) {
    body = '<div style="padding:14px;color:var(--text-dim)">No payments yet</div>';
  } else {
    body = '<div style="max-height:400px;overflow-y:auto">' +
      all.map(function(p) {
        var amt = p.dir === 'in' ? p.receivedSat : p.sent;
        var sign = p.dir === 'in' ? '+' : '-';
        var color = p.dir === 'in' ? 'var(--accent)' : 'var(--amber)';
        var desc = p.description || (p.dir === 'in' ? 'Received' : 'Sent');
        var date = p.completedAt ? new Date(p.completedAt).toLocaleString() : '';
        return '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid var(--border)">' +
          '<div><div style="font-size:0.85rem">' + desc + '</div><div style="font-size:0.75rem;color:var(--text-dim)">' + date + '</div></div>' +
          '<div style="font-weight:600;color:' + color + '">' + sign + (amt||0).toLocaleString() + ' sats</div>' +
          '</div>';
      }).join('') +
    '</div>';
  }
  return '<div class="card"><div class="card-header" onclick="toggleCard(this)">Payments (' + all.length + ') <span class="arrow">&#x25BE;</span></div>' +
    '<div class="card-body" style="padding:0">' + body + '</div></div>';
}

async function lnCreateInvoice() {
  var amountSat = document.getElementById('ln-inv-amount').value;
  var description = document.getElementById('ln-inv-desc').value;
  if (!amountSat) return alert('Amount required');
  var result = document.getElementById('ln-invoice-result');
  result.innerHTML = '<div style="color:var(--text-dim)">Creating...</div>';
  try {
    var r = await fetch('/api/lightning/invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amountSat: parseInt(amountSat), description: description })
    });
    var data = await r.json();
    if (data.error) throw new Error(data.error);
    result.innerHTML = '<div style="word-break:break-all;font-family:monospace;font-size:0.65rem;background:var(--bg);padding:10px;border-radius:6px;border:1px solid var(--border)">' + data.serialized + '</div>' +
      '<button class="btn-ghost btn-sm" style="margin-top:6px" onclick="navigator.clipboard.writeText(\'' + data.serialized + '\')" id="ln-inv-copy">Copy Invoice</button><div id="ln-invoice-qr" style="margin-top:10px"></div>';
    lnShowQR('ln-invoice-qr', data.serialized.toUpperCase());
  } catch (e) {
    result.innerHTML = '<div style="color:var(--danger)">' + e.message + '</div>';
  }
}

async function lnPayInvoice() {
  var invoice = document.getElementById('ln-pay-invoice').value.trim();
  if (!invoice) return alert('Invoice required');
  var result = document.getElementById('ln-send-result');
  result.innerHTML = '<div style="color:var(--text-dim)">Paying...</div>';
  try {
    var r = await fetch('/api/lightning/payinvoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoice: invoice })
    });
    var data = await r.json();
    if (data.error) throw new Error(data.error);
    result.innerHTML = '<div style="color:var(--accent)">Paid! ' + (data.amountMsat ? (data.amountMsat / 1000) + ' sats' : '') + '</div>';
    loadLightning();
  } catch (e) {
    result.innerHTML = '<div style="color:var(--danger)">' + e.message + '</div>';
  }
}

async function lnPayLnurl() {
  var lnurl = document.getElementById('ln-pay-lnurl').value.trim();
  var amountSat = parseInt(document.getElementById('ln-pay-lnurl-amount').value);
  if (!lnurl || !amountSat) return alert('LNURL and amount required');
  var result = document.getElementById('ln-send-result');
  result.innerHTML = '<div style="color:var(--text-dim)">Paying...</div>';
  try {
    var r = await fetch('/api/lightning/lnurlpay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lnurl: lnurl, amountSat: amountSat })
    });
    var data = await r.json();
    if (data.error) throw new Error(data.error);
    result.innerHTML = '<div style="color:var(--accent)">Paid!</div>';
    loadLightning();
  } catch (e) {
    result.innerHTML = '<div style="color:var(--danger)">' + e.message + '</div>';
  }
}

async function lnPayAddress() {
  var address = document.getElementById('ln-pay-address').value.trim();
  var amountSat = parseInt(document.getElementById('ln-pay-address-amount').value);
  if (!address || !amountSat) return alert('Address and amount required');
  var result = document.getElementById('ln-send-result');
  result.innerHTML = '<div style="color:var(--text-dim)">Paying...</div>';
  try {
    var r = await fetch('/api/lightning/paylnaddress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: address, amountSat: amountSat })
    });
    var data = await r.json();
    if (data.error) throw new Error(data.error);
    result.innerHTML = '<div style="color:var(--accent)">Paid!</div>';
    loadLightning();
  } catch (e) {
    result.innerHTML = '<div style="color:var(--danger)">' + e.message + '</div>';
  }
}

async function lnPayOffer() {
  var offer = document.getElementById('ln-pay-offer').value.trim();
  var amountSat = parseInt(document.getElementById('ln-pay-offer-amount').value);
  if (!offer) return alert('Offer required');
  var result = document.getElementById('ln-send-result');
  result.innerHTML = '<div style="color:var(--text-dim)">Paying...</div>';
  try {
    var r = await fetch('/api/lightning/payoffer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ offer: offer, amountSat: amountSat })
    });
    var data = await r.json();
    if (data.error) throw new Error(data.error);
    result.innerHTML = '<div style="color:var(--accent)">Paid!</div>';
    loadLightning();
  } catch (e) {
    result.innerHTML = '<div style="color:var(--danger)">' + e.message + '</div>';
  }
}

async function lnLoadOffer() {
  var result = document.getElementById('ln-offer-result');
  if (!result) return;
  try {
    var res = await fetch('/api/lightning/offer');
    var data = await res.json();
    if (data.error) throw new Error(data.error);
    result.innerHTML = '<div style="word-break:break-all;font-family:monospace;font-size:0.65rem;background:var(--bg);padding:10px;border-radius:6px;border:1px solid var(--border)">' + data.offer + '</div>' +
      '<button class="btn-ghost btn-sm" style="margin-top:6px" onclick="navigator.clipboard.writeText(\'' + data.offer + '\')" id="ln-offer-copy">Copy Offer</button><div id="ln-offer-qr" style="margin-top:10px"></div>';
    lnShowQR('ln-offer-qr', data.offer.toUpperCase());
  } catch (e) {
    result.innerHTML = '<div style="color:var(--text-dim)">No offer: ' + e.message + '</div>';
  }
}

function lnShowQR(containerId, data) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  new QRCode(container, {
    text: data,
    width: 200,
    height: 200,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M
  });
}
```

---

## 6. Fund your first channel

phoenixd uses ACINQ's LSP for automatic channel management. When you receive a Lightning payment and have no channel, ACINQ opens one automatically.

1. Create an invoice from your new Lightning tab (e.g., 50,000 sats)
2. Pay it from another wallet (Phoenix mobile, Wallet of Satoshi, etc.)
3. ACINQ opens a channel -- default capacity: 2,000,000 sats

**Fees on first receive:**
- Mining fee: varies with mempool (typically 100-500 sats)
- Service fee: ~1% of received amount
- Channel creation fee: 1,000 sats (one-time)

Check estimated fees before receiving:
```bash
HTTP_PASS=$(grep "^http-password=" ~/.phoenix/phoenix.conf | head -1 | cut -d= -f2)
curl -u :$HTTP_PASS "http://localhost:9740/estimateliquidityfees?amountSat=50000"
```

**Known issue:** ACINQ's dual-funding protocol sometimes returns `TxAbort: "channel funding error"` on the first attempt. Fix: restart phoenixd (`systemctl --user restart phoenixd`), create a fresh invoice, and pay again. Do not reuse the old invoice.

---

## 7. LNURL-pay server (Lightning address)

This is optional but powerful -- it gives your server a human-readable Lightning address like `agent@yourdomain.com` that anyone can pay from any wallet.

Add this to `server.js` **after** `app.listen(...)`:

```javascript
// --- LNURL-pay server ---
// Replace these three values with your own:
const LNURL_ADDRESS = 'agent@yourdomain.com';
const LNURL_CALLBACK = 'https://YOUR_FUNNEL_URL/lnurlp/agent/callback';
const LNURL_METADATA = JSON.stringify([
  ['text/identifier', LNURL_ADDRESS],
  ['text/plain', 'Pay via Lightning']
]);

function getLimitedPhoenixdPassword() {
  const conf = fs.readFileSync(process.env.HOME + '/.phoenix/phoenix.conf', 'utf8');
  return conf.match(/http-password-limited-access=(.+)/)?.[1]?.trim();
}

const lnurlApp = express();
lnurlApp.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Discovery endpoint -- wallets fetch this to learn how to pay you
lnurlApp.get('/lnurlp/agent', (req, res) => {
  res.json({
    tag: 'payRequest',
    callback: LNURL_CALLBACK,
    metadata: LNURL_METADATA,
    minSendable: 1000,        // 1 sat (in millisats)
    maxSendable: 10000000000  // 10M sats (in millisats)
  });
});

// Callback endpoint -- wallets call this with the amount, you return an invoice
lnurlApp.get('/lnurlp/agent/callback', async (req, res) => {
  const amountMsat = parseInt(req.query.amount);
  if (!amountMsat || amountMsat < 1000) {
    return res.status(400).json({ status: 'ERROR', reason: 'amount required, minimum 1 sat' });
  }
  try {
    const password = getLimitedPhoenixdPassword();
    const params = new URLSearchParams({
      description: LNURL_METADATA,
      amountSat: String(Math.floor(amountMsat / 1000))
    });
    const r = await fetch('http://127.0.0.1:9740/createinvoice', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(':' + password).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });
    if (!r.ok) throw new Error('phoenixd ' + r.status);
    const data = await r.json();
    res.json({ pr: data.serialized, routes: [] });
  } catch (e) {
    res.status(500).json({ status: 'ERROR', reason: e.message });
  }
});

lnurlApp.listen(8089, '127.0.0.1', () => {
  console.log('LNURL-pay server on 127.0.0.1:8089');
});
```

**Security note:** This server uses the limited-access password, which can create invoices but cannot spend funds. Even if the endpoint is compromised, your sats are safe.

---

## 8. Tailscale Funnel (public exposure)

The LNURL callback must be reachable from the public internet. Tailscale Funnel provides this without opening firewall ports or configuring nginx/caddy:

### Prerequisites

1. Tailscale installed and running on your server
2. Tailscale Funnel enabled in your Tailscale ACL policy (admin console at login.tailscale.com):

```json
// In your Tailscale ACL file, add:
"nodeAttrs": [
  {
    "target": ["autogroup:member"],
    "attr": ["funnel"]
  }
]
```

### Enable Funnel

```bash
tailscale funnel --bg 8089
```

This creates a public HTTPS URL like:
```
https://your-machine.tailnet-name.ts.net -> 127.0.0.1:8089
```

Verify:
```bash
tailscale funnel status
```

Your Funnel URL is the `LNURL_CALLBACK` base URL you set in step 7. For example, if your Funnel URL is `https://agent-box.taild1234.ts.net`, then:

```javascript
const LNURL_CALLBACK = 'https://agent-box.taild1234.ts.net/lnurlp/agent/callback';
```

Tailscale handles TLS certificates automatically.

---

## 9. DNS: the .well-known file

For `agent@yourdomain.com` to work, wallets look up:

```
https://yourdomain.com/.well-known/lnurlp/agent
```

This must return a JSON response (or redirect) that tells the wallet where to find the LNURL callback. The simplest approach: **a static file on your website**.

### Option A: Static file (GitHub Pages, any static host)

Create this file in your website's repo:

```
.well-known/lnurlp/agent
```

(No file extension. Just `agent` as the filename.)

Contents:

```json
{
  "tag": "payRequest",
  "callback": "https://YOUR_FUNNEL_URL/lnurlp/agent/callback",
  "metadata": "[[\"text/identifier\",\"agent@yourdomain.com\"],[\"text/plain\",\"Pay via Lightning\"]]",
  "minSendable": 1000,
  "maxSendable": 10000000000
}
```

**GitHub Pages note:** GitHub Pages may serve this as `application/octet-stream` instead of `application/json`. Wallets accept both -- this is fine.

### Option B: Redirect (if you control server config)

If your domain runs nginx, Apache, or similar, redirect the `.well-known` path to your Tailscale Funnel URL:

```nginx
# nginx example
location /.well-known/lnurlp/agent {
    return 301 https://YOUR_FUNNEL_URL/lnurlp/agent;
}
```

### Option C: Let your agent figure it out

If you have a domain and your agent has SSH access to the server or access to the DNS/hosting provider's API, you can tell it:

> "Set up a Lightning address for me at agent@mydomain.com. The LNURL callback is at https://MY_FUNNEL_URL/lnurlp/agent/callback. Create the .well-known file on my website."

The agent needs to know:
1. Where your website files are hosted (GitHub repo, VPS path, etc.)
2. The Tailscale Funnel URL (from `tailscale funnel status`)
3. The desired Lightning address username

---

## 10. How a payment flows

```
Sender's wallet
  -> fetches https://yourdomain.com/.well-known/lnurlp/agent
     (your website -- static file or redirect)
  -> reads callback URL from the JSON response
  -> calls https://YOUR_FUNNEL_URL/lnurlp/agent/callback?amount=50000000
     (Tailscale Funnel -> your machine)
  -> LNURL server creates invoice via phoenixd API
  -> returns invoice to wallet
  -> wallet pays the invoice over Lightning
  -> phoenixd receives the payment
  -> payment appears in your dashboard
```

---

## 11. Maintenance

### Check if phoenixd is running

```bash
systemctl --user status phoenixd
HTTP_PASS=$(grep "^http-password=" ~/.phoenix/phoenix.conf | head -1 | cut -d= -f2)
curl -u :$HTTP_PASS http://localhost:9740/getinfo
```

### View logs

```bash
journalctl --user -u phoenixd -n 50 --no-pager  # recent
journalctl --user -u phoenixd -f                  # live
```

### Upgrade phoenixd

```bash
cd ~/phoenixd
wget https://github.com/ACINQ/phoenixd/releases/download/vX.Y.Z/phoenixd-X.Y.Z-linux-x64.zip
unzip phoenixd-X.Y.Z-linux-x64.zip
# Update ExecStart path in ~/.config/systemd/user/phoenixd.service
systemctl --user daemon-reload
systemctl --user restart phoenixd
```

### Backup

Critical files:
- `~/.phoenix/seed.dat` -- master key (back up offline, never store digitally)
- `~/.phoenix/phoenix.conf` -- API passwords

---

## 12. Troubleshooting

| Problem | Fix |
|---------|-----|
| `phoenixd 401` on API calls | Check password in `~/.phoenix/phoenix.conf` matches what you're sending |
| Channel state `Aborted` | `systemctl --user restart phoenixd`, then create a fresh invoice |
| Invoice creation returns undefined | phoenixd returns `serialized`, not `invoice` -- check your frontend code |
| Tailscale Funnel not working | Check ACL policy allows Funnel; run `tailscale funnel status` |
| `.well-known` returns 404 | Verify file exists at the correct path with no extension; check CORS headers |
| QR code library not loading | Download `qrcode.min.js` locally instead of using CDN |
| phoenixd not starting after reboot | Run `loginctl enable-linger $USER` |
| `TxAbort: channel funding error` | Restart phoenixd, create new invoice, pay again (ACINQ transient issue) |

---

## Architecture summary

```
Public Internet
  |
  v
[Your Domain] .well-known/lnurlp/agent  (static file, GitHub Pages / any host)
  |
  | callback URL points to:
  v
[Tailscale Funnel] https://machine.tailnet.ts.net  (automatic TLS)
  |
  | proxies to:
  v
[LNURL Express Server] 127.0.0.1:8089  (creates invoices only)
  |
  | calls phoenixd API:
  v
[phoenixd] 127.0.0.1:9740  (Lightning node, self-custodial)
  |
  | proxied by:
  v
[Your Dashboard]  (web application)
```

Security boundaries:
- phoenixd: localhost only, never exposed
- Dashboard proxy: your private network only
- LNURL server: public via Funnel, but can only create invoices (limited-access password)
- No credentials in code -- passwords read from `phoenix.conf` at runtime
