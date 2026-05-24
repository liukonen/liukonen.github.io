import App from "./app";
import "./styles/main.sass";
import { hydrate } from "preact";

let mouseX = 0;
let mouseY = 0;
let ticking = false;

// Track mouse and update spotlight position
requestIdleCallback(() => {
  document.addEventListener("mousemove", (event: MouseEvent) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (!ticking) {
      requestAnimationFrame(() => {
        document.body.style.setProperty("--mouse-x", `${mouseX}px`);
        document.body.style.setProperty("--mouse-y", `${mouseY}px`);
        ticking = false;
      });
      ticking = true;
    }
  });

  globalThis.console.log(
    `%c~/ liukonen.dev
    -----------------------------------------
    Architecture : Preact (Fully Client-Side)
    Philosophy   : High-Value, Low-Ego
    Focus        : Stability // Modularity // Performance
    -----------------------------------------`,
    "color: #10b981; font-family: 'Cascadia Code', 'Cascadia Mono', monospace; font-size: 13px; line-height: 1.4;"
  );

  hydrate(<App />, document.getElementById("app")!);
});
