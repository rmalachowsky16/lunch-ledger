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

#######################################################################################################################################

## index.html
This one is nearly empty on purpose. Its only real job is to load the JavaScript bundle that Vite compiles, and provide a single <div id="root"> as a mounting point. React takes over that div and renders the entire UI inside it dynamically. You never add content to this file manually.

## src/main.jsx
This is the bootstrapper. It imports React and the App component, then calls ReactDOM.createRoot() targeting that #root div, and mounts <App /> into it. One time, on page load. That's it.

## src/App.jsx
This is where everything actually happens. A few things worth understanding here:

- React components are just JavaScript functions that return JSX (HTML-like syntax that Vite compiles down to regular JS). App and MemberRow are both functional components.
- State is managed with useState hooks. State is essentially reactive variables — when they change, React automatically re-renders the affected parts of the UI. The member list and their counts live in a state variable
- The +/– buttons call functions that use setMembers to update that state, which triggers a re-render with the new count displayed.

## src/App.css / src/index.css
Just CSS. index.css sets global base styles and CSS custom properties (variables like --green: #4bcd3e). App.css imports and uses those variables for component-level styling.

## vite.config.js
Tells Vite to use the @vitejs/plugin-react plugin, which runs Babel under the hood to transpile JSX into plain JavaScript that browsers can actually execute. Without this, the browser wouldn't understand the HTML-looking syntax inside .jsx files.

## package.json
The manifest for the project. It declares dependencies (react, react-dom, vite), dev dependencies, and the npm scripts (dev, build, preview). When you run npm install, npm reads this file and downloads everything listed into node_modules/.