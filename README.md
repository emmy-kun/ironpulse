# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

# IronPulse

IronPulse is a React and Vite frontend for a premium performance club. It includes the public marketing experience, training program details, member sign-in, membership selection, and a demo checkout flow.

## Run locally

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run lint
npm run build
```

## Membership tiers

- **Essential**: gym floor access, 8 group classes per month, locker room access, and mobile app tracking.
- **Elite**: unlimited classes, two coaching sessions per month, Recovery Lab access, the performance dashboard, and priority booking.
- **Performance**: everything in Elite, weekly one-on-one coaching, a custom nutrition plan, priority recovery access, and quarterly performance reviews.

The purchased plan and its entitlements are shown on the checkout success screen and stored locally for this demo.

## Current demo boundaries

Authentication and membership state use browser `localStorage`. Checkout simulates payment processing and does not charge a card. Before production, replace these pieces with a server-backed auth system and a payment provider such as Stripe Checkout or Payment Element. Never store passwords or payment details in browser storage.
