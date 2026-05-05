---
title: "Buy with bitcoin using Bitrefill"
description: "How automated Lightning payments, Bitrefill Visa cards, and checkout automation let you spend bitcoin at roughly 65% of online stores -- no bank account required."
pubDate: 2026-05-02
category: "Bitcoin"
level: "Intermediate"
readingTime: "5 min read"
draft: false
---

Most online retailers don't accept bitcoin directly. This guide explains a four-stage pipeline that bridges the gap: Lightning payment to Bitrefill, Bitrefill to prepaid Visa card, Visa card to automated checkout. The result is a system that lets you spend bitcoin at roughly 65% of e-commerce platforms without touching a bank account.

## In this guide

1. [The problem](#the-problem) -- why bitcoin spending friction exists
2. [How it works](#how-it-works) -- the four-stage pipeline
3. [Why this approach](#why-this-approach) -- technical rationale
4. [Platform coverage](#platform-coverage) -- what's supported
5. [The coupon finder](#the-coupon-finder) -- automated discount discovery
6. [Payment rail structure](#payment-rail-structure) -- how money flows
7. [Prerequisites](#prerequisites) -- what you need
8. [Skill components](#skill-components) -- the code
9. [Limitations](#limitations) -- what doesn't work yet

---

## The problem

Users holding bitcoin face friction when retailers don't accept cryptocurrency. This system addresses it through a four-stage pipeline: Lightning network to Bitrefill to prepaid Visa to automated checkout.

---

## How it works

**Stage 1 -- Platform Detection**
HTTP probes identify store type (Shopify, Stripe, WooCommerce) without browser automation; approximately 2 seconds.

**Stage 2 -- Coupons & Pricing**
Searches seven sources for discount codes, validates them via Shopify Storefront API, calculates exact totals including shipping and tax.

**Stage 3 -- Visa Purchase**
Buys exact-amount prepaid Visa cards through Bitrefill using Lightning, eliminating balance waste.

**Stage 4 -- Automated Checkout**
Fills checkout forms using platform-specific selectors in approximately 15 seconds.

### Approval gates

Two mandatory confirmation points:
1. User approves total before Visa purchase
2. User approves filled checkout form before submission

---

## Why this approach

### No buyer-side checkout API
PCI compliance requires card details go through the merchant's payment iframe. Browser automation is necessary for payment steps across all existing shopping agents.

### Hardcoded selectors vs. LLM navigation
Platform-specific selectors (like sneaker bots) provide speed advantages over LLM-driven navigation. Three modules cover 65% of e-commerce with ~15-second checkouts versus ~120 seconds with language model approaches.

### Self-custodial architecture
The payment system uses Lightning (via phoenixd) without KYC requirements. No banks, credit card companies, or payment processors access user identity.

---

## Platform coverage

| Platform | Coverage | Status |
|----------|----------|--------|
| Shopify | ~30% | Full support |
| Stripe Hosted Checkout | ~15% | Full support |
| WooCommerce + Braintree | ~10% | Full support |
| WooCommerce + Stripe | ~10% | Partial (manual payment entry required) |
| Custom/Amazon/CAPTCHA/Shop Pay | ~35% | Not covered |

---

## The coupon finder

Seven source search strategy:
1. Common pattern generation (~247 codes)
2. Store homepage scanning
3. Influencer/podcast code research
4. Google search
5. Reddit searching
6. X/Twitter search
7. Coupon aggregator sites

All codes validated via Shopify Storefront API. Advantages over similar tools: API-based validation speed, no privacy compromise, diverse sources including brute-force and social media channels.

---

## Payment rail structure

Lightning to Bitrefill to Prepaid Visa to Merchant

Bitrefill enables custom-amount purchases ($20.00--$500.00), eliminating waste on single-use cards. Average markup observed at 2.4% above face value.

**Transaction flow:**
1. Agent calculates exact checkout total
2. User approves amount
3. Agent purchases matching Visa card via Lightning
4. User approves Lightning payment
5. Agent redeems card details via PerfectGift.com
6. Agent completes checkout with card information

All transactions logged to append-only ledger with payment hashes and order data.

---

## Prerequisites

- Python 3.8+ with Playwright library
- Lightning wallet (phoenixd recommended)
- Bitrefill account
- Chromium-based browser (Brave suggested)
- AI agent framework

---

## Skill components

- `detect_platform.py` (970 lines) -- Platform identification and API integration
- `coupon_finder.py` (629 lines) -- Multi-source discount discovery
- `shopify_checkout.py` (826 lines) -- Shopify automation
- `stripe_checkout.py` (511 lines) -- Stripe Hosted Checkout automation
- `woocommerce_checkout.py` (542 lines) -- WooCommerce support
- Documentation and selector references

---

## Limitations

- **Stripe Elements** -- Card fields blocked by Stripe security on ~15--20% of embedded implementations
- **Shop Pay** -- Incompatible with single-use card model
- **CAPTCHA** -- Detected but unsolved
- **Custom Platforms** -- Approximately 35% of e-commerce unaddressed
- **Prepaid Card Decline Risk** -- Merchants occasionally decline prepaid cards (zero declines observed in testing)
