---
name: agent-hud
description: >-
  Attach a floating "agent mind" HUD to a headed Playwright page so the browser
  shows a live log of what the agent thinks, sees, and does. Use when debugging
  or demonstrating browser automation in headed mode. Requires playwright-core.
requires: [shell]
optional: [playwright-core]
min-context: 16k
model-preference: cheap-fast
argument-hint: "[attach|think|see|act]"
---

# Agent HUD (floating mind panel)

Wrap a Playwright page with `agent-hud` so headed runs are narrated in-browser.

## Steps

1. Install via git URL to avoid drift: `npm install github:farishan-labs/agent-hud`
   (or clone once to `~/dev/labs/agent-hud` and require by absolute path).
2. In the script, `require('agent-hud')` (or the absolute path) and call `hud.attach(page)` after
   creating the page (before navigation is fine; it defers to DOM ready).
3. Narrate the run with `hud.think(page, ...)`, `hud.see(page, ...)`,
   `hud.act(page, ...)`, `hud.note(page, ...)`.
4. Run with `headless: false` so the HUD is visible.

Keep messages short; the panel keeps the last 40 lines.