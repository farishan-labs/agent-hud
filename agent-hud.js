// Agent Mind HUD — inject a floating panel into a Playwright page that prints
// what the agent thinks / sees / does while driving the browser in headed mode.
// Usage (Node, with playwright-core):
//   const { chromium } = require('playwright-core');
//   const hud = require('./agent-hud.js');
//   const browser = await chromium.launch({ headless: false });
//   const page = await browser.newPage();
//   await hud.attach(page);
//   await hud.think(page, 'Opening machines dashboard');
//   await page.goto('http://127.0.0.1:7778');
//   await hud.see(page, '4 machine cards rendered, mac marked as current');
//   await hud.act(page, 'Checking grid column count');
function injectScript() {
  return `(() => {
    function build() {
      if (window.__agentHud) return;
      if (!document.body) { setTimeout(build, 50); return; }
      const root = document.createElement('div');
      root.id = '__agentHud';
      Object.assign(root.style, {
        position: 'fixed', bottom: '12px', right: '12px', zIndex: '2147483647',
        width: '360px', maxHeight: '45vh', overflow: 'auto',
        background: 'rgba(15,15,20,0.88)', color: '#e6e6e6',
        font: '12px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace',
        padding: '10px 12px', borderRadius: '10px',
        boxShadow: '0 8px 24px rgba(0,0,0,.4)', backdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,.12)',
      });
      const title = document.createElement('div');
      title.textContent = '🧠 agent mind';
      Object.assign(title.style, { fontWeight: '700', marginBottom: '6px', color: '#a5b4fc' });
      root.appendChild(title);
      const log = document.createElement('div');
      root.appendChild(log);
      document.body.appendChild(root);
      window.__agentHud = {
        push(kind, text) {
          const row = document.createElement('div');
          const colors = { think: '#fbbf24', see: '#34d399', act: '#60a5fa', note: '#e6e6e6' };
          row.style.borderLeft = '3px solid ' + (colors[kind] || '#888');
          row.style.padding = '2px 8px'; row.style.margin = '2px 0';
          row.style.whiteSpace = 'pre-wrap'; row.style.wordBreak = 'break-word';
          const tag = document.createElement('span');
          tag.textContent = kind + '  ';
          tag.style.color = colors[kind] || '#888'; tag.style.fontWeight = '700';
          row.appendChild(tag);
          row.appendChild(document.createTextNode(text));
          log.appendChild(row);
          log.scrollTop = log.scrollHeight;
          while (log.childElementCount > 40) log.removeChild(log.firstChild);
        }
      };
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', build, { once: true });
    } else {
      build();
    }
  })();`;
}

async function attach(page) {
  await page.addInitScript(injectScript());
}

async function push(page, kind, text) {
  await page.evaluate(injectScript()).catch(() => {});
  await page.evaluate(({ kind, text }) => {
    window.__agentHud && window.__agentHud.push(kind, String(text));
  }, { kind, text }).catch(() => {});
}

module.exports = {
  attach,
  think: (page, t) => push(page, 'think', t),
  see: (page, t) => push(page, 'see', t),
  act: (page, t) => push(page, 'act', t),
  note: (page, t) => push(page, 'note', t),
  injectScript,
};