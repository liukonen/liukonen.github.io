<script>
    import { onMount } from "svelte"
  import Education from "./lib/education.svelte"

  //import * as myjson from "./page.json"
  import Navbar from "./lib/navbar.svelte"
  import Blogs from "./lib/blogs.svelte"
  import Projects from "./lib/projects.svelte"
  import Career from "./lib/career.svelte"
  import KnowledgeGrid from "./lib/knowledgeGrid.svelte"
  import About from "./lib/about.svelte"
  import FooterA from "./lib/footerA.svelte"
  import FooterB from "./lib/footerB.svelte"
  import "./base.sass"

  let jsonPayload

  let DynamicWallpaper = false;
  const playPause = () => {
    DynamicWallpaper = !DynamicWallpaper;
    document.getElementById("playPauseIcon").className = DynamicWallpaper ? "bi bi-pause-fill" : "bi bi-play-fill"
  }

  onMount(async () => {
    try {
      if(sessionStorage.getItem("dev.liukonen.pageData")){
        jsonPayload = JSON.parse(sessionStorage.getItem("dev.liukonen.pageData"))
        console.log("PageData items pulled from cache")
        
      }else{
      fetch("./page.json")
        .then((response) => response.text())
        .then((str) => {
          sessionStorage.setItem("dev.liukonen.pageData",str)
          return JSON.parse(str)
        })
        .then((data) => {
          jsonPayload = data
        })
        console.log("PageData items pulled live")
    }
  } catch (error) {
      console.error("Error loading JSON:", error)
    }
  })
</script>

{#if DynamicWallpaper}
  <video muted loop id="myVideo" autoplay>
    <source src="./video/typing.mp4" type="video/mp4" />
  </video>
{/if}

{#if jsonPayload}
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
          /> Hello world!
        </h1>
        <p class="d-none d-sm-block">
          Software Engineer / Former Instructor / Tech enthusiast
        </p>
        <button class="btn btn-dark" id="myBtn" on:click={playPause}>
          background <i id="playPauseIcon" class="bi bi-play-fill" />
        </button>
      </div>
      <div class="col-md-3">
        <div class="btn-group-vertical">
          <a
            target="_blank"
            rel="noreferrer"
            class="btn btn-secondary"
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
            class="btn btn-primary bg-lnkdin"
            href="https://www.linkedin.com/in/lukeliukonen/"
            role="button"
            aria-label="LinkedIn"
          >
            <i class="bi bi-linkedin" />
            <span class="d-none d-sm-inline">LinkedIn</span>
          </a>
          <a
            class="btn btn-danger"
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
            class="btn btn-light"
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
  <br /> <br />
  <FooterB />
</main>
{/if}
