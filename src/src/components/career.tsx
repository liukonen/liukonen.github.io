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
    const uwmTa = uwm.branch({ name: "UW System", from: uwm })
    uwmTa.commit("TA").tag("Spring 2006")
    uwm.merge(uwmTa, "TA Cmpl").tag("2006")
    time.merge(uwm, "Graduated - BBA").tag("2006")
    const Trisept = time.branch({ name: "Trisept Solutions", from: "2006" })
    Trisept.commit("Trisept Solutions").tag("2006 - 2020")
    time.commit("2008")
    const ITTOne = time.branch({ name: "ITT Technical Institute", from: "2008" })
    ITTOne.commit("ITT Tech - Adj. Instr. -Int Comp S2008")
    Trisept.commit("2010")
    ITTOne.commit("Adj. Instr. -Int Prog S2010")
    time.merge(ITTOne, "Cmpl Adj. Instr.")

    Trisept.commit("2012")
    const blue7 = Trisept.branch({ name: "Blue7 Solutions", from: Trisept })
    blue7.commit("Start: Blue 7 Solutions - BE SWE")

    blue7.commit("2014")
    Trisept.merge(blue7, "JV Concl").tag("2014")
    Trisept.commit("2016")
    Trisept.commit("2018")
    Trisept.commit("2020")

    time.merge(Trisept, " Furl - Trisept")
    const Brady = time.branch({ name: "Brady Corporation" })
    Brady.commit("Start: Brady Corporation - Sr. SWE")
    Brady.commit("2021")
    time.merge(Brady, "Cmpl Brady")
    const NM = time.branch({ name: "Northwestern Mutual" })
    NM.commit("Start: Northwestern Mutual - Fullstack SWE")

    NM.commit("2022")
    NM.commit("2024")
    NM.commit("2025")
    time.commit("Now")
  }, [])

  return (
    <div className="container" id="career">
      <h3 className="text-center h3 tshadow mt-5">Career So Far</h3>
      <Workplaces items={work} />
      <div id="career2" className="mt-5 overflow-hidden">
        <div
          ref={graphContainerRef}
          style={{ width: '100%', overflow: 'auto' }}
        />

        <br />
      </div>
    </div>
  )
}

export default Career
