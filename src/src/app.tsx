import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

import Education from "./components/education"
import Navbar from "./components/navbar";
import Blogs from "./components/blogs";
import Projects from "./components/projects";
import Career from "./components/career";
import KnowledgeGrid from "./components/knowledgeGrid";
import About from "./components/about";
import FooterA from "./components/footera";
import FooterB from "./components/footerb";
import './styles/main.sass';

const App = () => {
  const [jsonPayload, setJsonPayload] = useState<any>(null);
  const [dynamicWallpaper, setDynamicWallpaper] = useState(false);

  const playPause = () => {
    setDynamicWallpaper((prev) => !prev);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        //const cached = sessionStorage.getItem("dev.liukonen.pageData");
        //if (cached) {
        //  setJsonPayload(JSON.parse(cached));
        //  console.log("PageData items pulled from cache");
        //} else {
          const response = await fetch("./page.json");
          const text = await response.text();
          sessionStorage.setItem("dev.liukonen.pageData", text);
          setJsonPayload(JSON.parse(text));
          console.log("PageData items pulled live");
       // }
      } catch (error) {
        console.error("Error loading JSON:", error);
      }
    };
    loadData();
  }, []);

  return (
    <>
      {dynamicWallpaper && (
        <video muted loop autoPlay id="myVideo">
          <source src="./video/typing.mp4" type="video/mp4" />
        </video>
      )}

      {jsonPayload && (
        <>
          <Navbar menuItems={jsonPayload.menu} />
          <main>
            <div class="container glass">
              <div class="row">
                <div class="col-md-9">
                  <h1 class="display-3 tshadow">
                    <img
                      src="img/90/me-bw.webp"
                      class="rounded-circle user_img"
                      alt="Luke Liukonen"
                    />{" "}
                    Hello world!
                  </h1>
                  <p class="d-none d-sm-block">
                    Software Engineer / Former Instructor / Tech enthusiast
                  </p>
                  <button class="btn btn-dark" id="myBtn" onClick={playPause}>
                    background{" "}
                    <i
                      id="playPauseIcon"
                      class={
                        dynamicWallpaper ? "bi bi-pause-fill" : "bi bi-play-fill"
                      }
                    />
                  </button>
                </div>

                <div class="col-md-3">
                  <div class="btn-group-vertical">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      class="btn btn-secondary d-flex justify-content-between align-items-center w-100"
                      href="https://github.com/liukonen"
                      role="button"
                      aria-label="Github"
                    >
                      <i class="bi bi-github" />
                      <span class="d-none d-sm-inline">GitHub</span>
                    </a>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      class="btn btn-primary bg-lnkdin d-flex justify-content-between align-items-center w-100"
                      href="https://www.linkedin.com/in/lukeliukonen/"
                      role="button"
                      aria-label="LinkedIn"
                    >
                      <i class="bi bi-linkedin" />
                      <span class="d-none d-sm-inline">LinkedIn</span>
                    </a>
                    <a
                      class="btn btn-danger d-flex justify-content-between align-items-center w-100"
                      rel="noreferrer"
                      href="mailto:liukonen@gmail.com?subject=GitHub_Home_Page"
                      role="button"
                      aria-label="email"
                    >
                      <i class="bi bi-envelope-fill" />
                      <span class="d-none d-sm-inline">email</span>
                    </a>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      class="btn btn-light d-flex justify-content-between align-items-center w-100"
                      href="https://dev.to/liukonen"
                      role="button"
                      aria-label="dev To"
                    >
                      <i class="bi bi-file-code-fill" />
                      <span class="d-none d-sm-inline">DEV Community</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Blogs />
            <Projects Projects={jsonPayload.projects} />
            <Career work={jsonPayload.Work} highlights={jsonPayload.highlights} />
            <Education items={jsonPayload.School} />
            <KnowledgeGrid items={jsonPayload.Experence} />
            <About
              greating={jsonPayload.welcome}
              InterestItems={jsonPayload.Hobbies}
              VolunteerItems={jsonPayload.volunteer}
            />
            <FooterA />
            <br />
            <br />
            <FooterB />
          </main>
        </>
      )}
    </>
  );
};

export default App;
