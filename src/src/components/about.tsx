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
    <div id="about">
      <Welcome greating={greating} />
      <div className="container glass">
        <div className="row">
          <div className="col-md-6">
            <h1 className="h3 tshadow">Interests</h1>
            <AList listItems={InterestItems} listStyle="0" />
          </div>
          <div className="col-md-6">
            <h1 className="h3 tshadow">Volunteer</h1>
            <AList listItems={VolunteerItems} listStyle="0" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
