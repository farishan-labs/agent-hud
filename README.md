# agent-hud

A tiny floating "agent mind" panel for headed Playwright runs. It injects a
bottom-right HUD into the page that prints what the agent is thinking, seeing,
and doing — so when you watch a headed browser, you can follow along.

## Usage

```js
const { chromium } = require('playwright-core');
const hud = require('./agent-hud.js');

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