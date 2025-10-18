import { FunctionalComponent } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import Workplaces from './workplaces'
import { createGitgraph, templateExtend } from '../lib/gitgraph-esm.js' 

interface CareerProps {
  work: any[] 
}

const Career: FunctionalComponent<CareerProps> = ({ work }) => {
  const graphContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!graphContainerRef.current) return

    // Initialize Gitgraph
    const gitgraph = createGitgraph(graphContainerRef.current, {
      orientation: 'vertical-reverse', // newest at top
      template: templateExtend('metro', {
        colors: ["#C0C0C0", //time 
                 "#f39c12", // UWM
                 "#e74c3c", // UW System 
                 "#1d77b5", // Trisept 
                 "#257bfc", // ITT 
                 "#79a1d0", 
                 "#547dff",
                "#fdaa45"],
        branch: { lineWidth: 4, spacing: 30 },
        commit: {
          displayHash: false,
          displayAuthor: false,
          message: { color: '#fff', displayHash: false, displayAuthor: false },
          dot: { size: 6 },
        },
      }),
    })

    const time = gitgraph.branch("Time")
     time.commit("2002")
    const uwm = time.branch({ name: "UWM", from: "2002" })
    uwm.commit("Start: University of Wisconsin Milwaukee").tag("2002-2006")
    uwm.commit("2004")
    const uwmTa = uwm.branch({ name: "University Of Wisconsin System", from: uwm })
    uwmTa.commit("TA (eb Services)").tag("Spring 2006")
    uwm.merge(uwmTa, "TA Experience Completed").tag("2006")
    time.merge(uwm, "Graduated - Bachelors in Business Administration").tag("2006")
    const Trisept = time.branch({ name: "Trisept Solutions", from: "2006" })
    Trisept.commit("Trisept Solutions").tag("2006 - 2020")
    time.commit("2008")
    const ITTOne = time.branch({ name: "ITT Technical Institute", from: "2008" })
    ITTOne.commit("Adjunct Instructor -Intro to Computers Summer 2008")
    Trisept.commit("2010")
    ITTOne.commit("Adjunct Instructor -Intro to Programming Summer 2010")
    time.merge(ITTOne, "Completed Adjunct Teaching")

    Trisept.commit("2012")
    const blue7 = Trisept.branch({ name: "Blue7 Solutions", from: Trisept })
    blue7.commit("Start: Blue 7 Solutions - Software Engineer")

    blue7.commit("2014")
    Trisept.merge(blue7, "Joint venture concluded").tag("2014")
    Trisept.commit("2016")
    Trisept.commit("2018")
    Trisept.commit("2020")

    time.merge(Trisept, "Furloughed from Trisept")
    const Brady = time.branch({ name: "Brady Corporation" })
    Brady.commit("Start: Brady Corporation - Senior Software Engineer")
    Brady.commit("2021")
    time.merge(Brady, "Left Brady")
    const NM = time.branch({ name: "Northwestern Mutual" })
    NM.commit("Start: Northwestern Mutual - Full Stack Software Engineer")

    NM.commit("2022")
    NM.commit("2024")
    NM.commit("2025")
    time.commit("Now")
  }, [])

  return (
    <div className="container" id="career">
      <h3 className="text-center h3 tshadow mt-5">Career So Far</h3>
      <Workplaces items={work} />
      <div id="career2" className="mt-5">
        <div
          ref={graphContainerRef}
          style={{ width: '100%'  }}
        />

        <br />
      </div>
    </div>
  )
}

export default Career
