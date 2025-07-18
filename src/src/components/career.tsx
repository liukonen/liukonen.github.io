import { FunctionalComponent } from 'preact'
import Workplaces from './workplaces'
import AList from './aList'

interface CareerProps {
  work: any[] // You can replace `any` with the correct shape of a workplace item
  highlights: any[] 
}

const Career: FunctionalComponent<CareerProps> = ({ work, highlights }) => {
  console.log(highlights)
  return (
    <div className="container glass" id="career">
      <h3 className="text-center h3 tshadow mt-5">Career So far</h3>
      <div id="career2" className="mt-5">
        <Workplaces items={work} />
        <br />
        <h3 className="text-center h3 tshadow mt-5">highlights</h3>
        <AList listItems={highlights} listStyle="1" />
      </div>
    </div>
  )
}

export default Career
