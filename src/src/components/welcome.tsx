import { FunctionalComponent } from 'preact'

interface WelcomeProps {
  greating: string
}

const Welcome: FunctionalComponent<WelcomeProps> = ({ greating }) => {
  return (
    <div className="container glass">
      <div className="container">
        <div id="welcome" className="container">
          <h3 className="h3 text-center tshadow">Welcome</h3>
          <div>{greating}</div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
