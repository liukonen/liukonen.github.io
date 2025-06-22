import { FunctionalComponent } from "preact"

interface Button {
  type: string
  url: string
}

interface Project {
  SubTitle: string
  Title: string
  buttons: Button[]
  image: string
  Description: string
  tags: string[]
}

interface ProjectsProps {
  Projects: Project[]
}

const determButtonColor = (itemType: string) => {
  const type = itemType.toLowerCase()
  const colors: Record<string, string> = {
    website: "btn btn-success shadow ml-2",
    release: "btn btn-primary shadow ml-2",
  }
  return colors[type] || "btn btn-secondary shadow ml-2"
}

const ProjectsComponent: FunctionalComponent<ProjectsProps> = ({ Projects }) => {
  return (
    <div class="container glass" id="app">
      <h3 class="text-center h3 tshadow mt-5">Open Source Projects</h3>
      {Projects.map((project, index) => (
        <div class="card glass" key={index}>
          <div class="card-header d-flex justify-content-between align-items-center whiteGlass">
            <h4>
              {project.SubTitle} - {project.Title}
            </h4>
            <div>
              <div class="btn-group" role="group" aria-label="Basic example">
                {project.buttons.map((button) => (
                  <a
                    class={determButtonColor(button.type)}
                    href={button.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {button.type}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div class="row g-0">
            <div class="col-md-2">
              <img
                src={project.image}
                class="lzy img-fluid rounded-start"
                alt={project.Title}
              />
            </div>
            <div class="col-md-10">
              <div class="card-body">
                <p class="card-text">{project.Description}</p>
                <p class="card-text">
                  <small class="text-body-secondary">
                    keywords: {project.tags.join(", ")}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectsComponent
