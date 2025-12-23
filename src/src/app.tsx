import { useEffect, useState } from "preact/hooks"

import Education from "./components/education"
import Blogs from "./components/blogs"
import Projects from "./components/projects"
import Career from "./components/career"
import KnowledgeGrid from "./components/knowledgeGrid"
import About from "./components/about"
import { Modal } from "./components/modal";
import FooterB from "./components/footerb"
import './styles/main.sass'

const App = () => {
  const [jsonPayload, setJsonPayload] = useState<any>(null)
  const [open, setOpen] = useState<boolean>(false)

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
          <main class="glass-card">
            <div class="container text-center header-section">
              <div class="row justify-content-center">
                <div class="col-md-8">
                  <h1 class="display-2 mb-4 d-flex align-items-center justify-content-center gap-3">
                    <img
                      src="./img/favicons/apple-touch-icon.png"
                      class="rounded-circle user_img"
                      alt="Luke Liukonen"
                      style="height: 4rem; width: 4rem;"
                    />
                    Luke Liukonen
                  </h1>
                  <p class="lead mb-4">
                    <h2>Software Engineer / Instructor / Tech and A.I. enthusiast</h2>
                  </p>
                  <div class="social-links mb-4">  
                    <a class="px-3" href="https://github.com/liukonen" target="_blank"><i class="bi bi-github"></i> GitHub</a>
                    <a class="px-3" href="https://www.linkedin.com/in/lukeliukonen/" target="_blank"><i class="bi bi-linkedin"></i> LinkedIn</a>
                    <a class="px-3" href="https://dev.to/liukonen" target="_blank"><i class="bi bi-code-slash"></i> dev.to</a>

                  </div>
                  <div class="mb-4">
                    <button class="btn btn-primary px-3" onClick={() => setOpen(true)}><i class="bi bi-chat-right-dots-fill"></i> Contact</button>
                  </div>
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
      <Modal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default App
