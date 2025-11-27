import { FunctionalComponent } from 'preact'

interface WelcomeProps {
  greating: string
}

const Welcome: FunctionalComponent<WelcomeProps> = ({ greating }) => {
  return (
    <div className="container">
      <div className="container">
        <div id="welcome" className="container">
          <div className="welcome-text">{greating}</div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
