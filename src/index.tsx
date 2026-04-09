import { render } from 'preact'
import App from './app'
import './styles/main.sass'

// Track mouse and update spotlight position
document.addEventListener('mousemove', (event: MouseEvent) => {
  document.body.style.setProperty('--mouse-x', `${event.clientX}px`)
  document.body.style.setProperty('--mouse-y', `${event.clientY}px`)
})

render(<App />, document.getElementById('app')!)