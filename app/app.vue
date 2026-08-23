<template>
  <div class="wrap">
    <h1 class="mark">Daktus</h1>
    <div class="line" aria-hidden="true" />
    <p class="role">Webdizajn a vývoj</p>
    <p class="soon">Na stránke sa pracuje.</p>
    <footer>daktus.sk</footer>
  </div>
</template>

<style>
:root { --bg: #0F1113; --fg: #EDEDEA; --dim: #8A9092; --accent: #6FA8A2; }
* { box-sizing: border-box; }
html, body, #__nuxt { height: 100%; }
body {
  margin: 0; background: var(--bg); color: var(--fg);
  font-family: "Instrument Sans", -apple-system, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.wrap {
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  min-height: 100svh; padding: 32px; text-align: center;
}
.mark {
  font-family: "Archivo", "Helvetica Neue", Arial, sans-serif; font-weight: 800;
  font-size: clamp(52px, 14vw, 148px); line-height: .92; letter-spacing: -.03em;
  margin: 0; text-transform: uppercase;
}
.line {
  width: min(320px, 64vw); height: 2px; background: var(--accent); margin: 26px 0 24px;
  transform-origin: center; transform: scaleX(0);
  animation: draw 1.1s .25s cubic-bezier(.2, .8, .25, 1) forwards;
}
@keyframes draw { to { transform: scaleX(1); } }
@media (prefers-reduced-motion: reduce) { .line { animation: none; transform: scaleX(1); } }
.role { margin: 0; font-size: clamp(14px, 2.4vw, 17px); letter-spacing: .22em; text-transform: uppercase; color: var(--fg); }
.soon { margin: 14px 0 0; font-size: 15.5px; color: var(--dim); }
footer { position: fixed; bottom: 26px; left: 0; right: 0; font-size: 13px; color: var(--dim); letter-spacing: .04em; }
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
a:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
</style>
