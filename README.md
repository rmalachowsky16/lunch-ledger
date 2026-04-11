# Lunch Ledger

An internal team app for tracking who owes lunch. Every small mistake at work earns you a lunch — this ledger keeps score.

## Running locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for production

```bash
npm run build
```

The output lands in `dist/`. Preview it locally with:

```bash
npm run preview
```

## Deploying to Vercel

### Option 1 — Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Vite and sets the build command (`npm run build`) and output directory (`dist`) for you.

### Option 2 — Vercel dashboard

1. Push this repo to GitHub (or GitLab / Bitbucket).
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import the repository.
4. Vercel will pre-fill the settings — just click **Deploy**.

Every push to `main` will trigger an automatic redeploy.

## Data persistence

All data is stored in the browser's `localStorage` under the key `lunch-ledger-members`. Counts survive page refreshes and browser restarts. Clearing site data or switching browsers will reset the ledger.
