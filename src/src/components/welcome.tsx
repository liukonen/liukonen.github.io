import { FunctionalComponent } from 'preact'

interface WelcomeProps {
  greating: string
}

const Welcome: FunctionalComponent<WelcomeProps> = ({ greating }) => {
  return (
    <div className="container">
      <div className="container">
        <div id="welcome" className="container">
          <h2 className="text-center tshadow">Hello world!</h2>
          <div>{greating}</div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
