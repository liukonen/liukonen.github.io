import App from "./app"
import "./styles/main.sass"
import { hydrate } from "preact"

let mouseX = 0
let mouseY = 0
let ticking = false

// Track mouse and update spotlight position
requestIdleCallback(() => {
  document.addEventListener("mousemove", (event: MouseEvent) => {
    mouseX = event.clientX
    mouseY = event.clientY

    if (!ticking) {
      requestAnimationFrame(() => {
        document.body.style.setProperty("--mouse-x", `${mouseX}px`)
        document.body.style.setProperty("--mouse-y", `${mouseY}px`)
        ticking = false
      })
      ticking = true
    }
  })

  hydrate(<App />, document.getElementById("app")!)
})
