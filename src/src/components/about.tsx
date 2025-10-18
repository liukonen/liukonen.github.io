import { FunctionalComponent } from 'preact'
import Welcome from './welcome'


interface AboutProps {
  greating: string
}

const About: FunctionalComponent<AboutProps> = ({ greating }) => {
  return (
    <div id="about" class="section">
      <Welcome greating={greating} />
    </div>
  )
}

export default About
