# agent-hud

A tiny floating "agent mind" panel for headed Playwright runs. It injects a
bottom-right HUD into the page that prints what the agent is thinking, seeing,
and doing — so when you watch a headed browser, you can follow along.

## Install (avoid local copies / drift)

Pick one. The repo is the single source of truth.

```sh
# 1. Git URL (recommended, no npm publish needed)
npm install github:farishan-labs/agent-hud
# or with Bun:
bun add github:farishan-labs/agent-hud

# 2. Global (for ad-hoc scripts)
npm install -g github:farishan-labs/agent-hud

# 3. Clone once and require by path (single source)
git clone git@github-faris:farishan-labs/agent-hud.git ~/dev/labs/agent-hud
```

Then:

```js
const hud = require('agent-hud'); // if installed
// or: const hud = require('/Users/faris/dev/labs/agent-hud/agent-hud.js');
```

## Usage

```js
const { chromium } = require('playwright-core');
const hud = require('agent-hud');

const browser = await chromium.launch({ channel: 'chrome', headless: false });
const page = await browser.newPage();
await hud.attach(page);

await hud.think(page, 'Opening dashboard');
await page.goto('http://127.0.0.1:7778');
await hud.see(page, '4 machine cards rendered');
await hud.act(page, 'Checking grid columns');
await hud.note(page, 'Done');
```

## API

- `attach(page)` — inject the HUD (call once; also auto-injects on navigation).
- `think(page, text)` — amber "think" line.
- `see(page, text)` — green "see" line.
- `act(page, text)` — blue "act" line.
- `note(page, text)` — neutral note.

## Why

Headed Playwright is great for debugging, but the browser window doesn't tell you
*why* the agent clicked something. This HUD bridges that gap with a live
reasoning log overlaid on the page.

## License

Apache-2.0 (Faris Han Labs).