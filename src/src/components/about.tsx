import { FunctionalComponent } from 'preact'
import Welcome from './welcome'
import AList  from './aList'


interface AboutProps {
  greating: string
  InterestItems: { a: string }[]
  VolunteerItems: { a: string }[];
}

const About: FunctionalComponent<AboutProps> = ({ greating, InterestItems, VolunteerItems }) => {
  return (
    <div id="about" class="section">
      <Welcome greating={greating} />
    </div>
  )
}

export default About
