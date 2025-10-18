import { useEffect, useState } from "preact/hooks"

import Education from "./components/education"
import Blogs from "./components/blogs"
import Projects from "./components/projects"
import Career from "./components/career"
import KnowledgeGrid from "./components/knowledgeGrid"
import About from "./components/about"

import FooterB from "./components/footerb"
import './styles/main.sass'

const App = () => {
  const [jsonPayload, setJsonPayload] = useState<any>(null)


  useEffect(() => {
    const loadData = async () => {
      try {
          const response = await fetch("./page.json")
          const text = await response.text()
          sessionStorage.setItem("dev.liukonen.pageData", text)
          setJsonPayload(JSON.parse(text))
          console.log("PageData items pulled live")
      } catch (error) {
        console.error("Error loading JSON:", error)
      }
    }
    loadData()
  }, [])

  return (
    <>
      {jsonPayload && (

          
          <main>
            <div class="container">
              <div class="row">
                <div class="col-md-9">
                  <h1 class="display-3">
                    <img
                      src="./img/favicons/apple-touch-icon.png"
                      class="rounded-circle user_img"
                      alt="Luke Liukonen"
                    />{" "}
                    Luke Liukonen
                  </h1>
                  <p class="d-sm-block">
                    Software Engineer / Instructor / Tech enthusiast
                  </p>
                  <p class="d-sm-block">
                    <div>  
                    <a class="p-3" href="https://github.com/liukonen" target="_blank"><i class="bi bi-github"></i> GitHub</a>
                    <a class="p-3" href="https://www.linkedin.com/in/lukeliukonen/" target="_blank"><i class="bi bi-linkedin"></i> LinkedIn</a>
                    <a class="p-3" href="mailto:liukonen@gmail.com?subject=GitHub_Home_Page"><i class="bi bi-envelope"></i> email</a>
                    <a class="p-3" href="https://dev.to/liukonen" target="_blank"><i class="bi bi-code-slash"></i> dev.to</a>
                    </div>
                  </p>
                </div>

              </div>
            </div>
            <About greating={jsonPayload.welcome} />
            <KnowledgeGrid items={jsonPayload.Experence} />
            <Blogs />
            <Projects Projects={jsonPayload.projects} />
            <Career work={jsonPayload.Work} />
            <Education items={jsonPayload.School} />

            <br />
            <br />
            <section class="pb-5"><FooterB /></section>
          </main>
      )}
    </>
  )
}

export default App
