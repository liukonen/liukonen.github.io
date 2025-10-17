import { FunctionalComponent } from "preact";

interface Button {
  type: string;
  url: string;
}

interface Project {
  SubTitle: string;
  Title: string;
  buttons: Button[];
  image: string;
  Description: string;
  tags: string[];
}

interface ProjectsProps {
  Projects: Project[];
}

const determButtonColor = (itemType: string) => {
  const type = itemType.toLowerCase();
  const colors: Record<string, string> = {
    website: "btn btn-success shadow ml-2",
    release: "btn btn-primary shadow ml-2"
  };
  return colors[type] || "btn btn-secondary shadow ml-2";
};

const buttonIcon = (itemType: string) => {
  const type = itemType.toLowerCase();
  if (type === "website") return "bi bi-box-arrow-up-right";
  if (type === "release") return "bi bi-box-seam";
  return "bi bi-file-code";
};

const ProjectsComponent: FunctionalComponent<ProjectsProps> = ({
  Projects
}) => {
  return (
    <div class="container">
      <h3 class="text-center h3 tshadow mt-5">Open Source Projects</h3>
  <div class="row mt-5 row-cols-1 row-cols-md-2">
      
      {Projects.map(project =>
          <div class="col-md-6">
            <div class="row">
          <div class="col-2">
            <img
              src={project.image}
              class="lzy img-fluid rounded"
              alt={project.Title}
            />
          </div>
          <div class="col-8">
            <h1 class="display-3 tshadow">
              <h4>
                {project.SubTitle}
              </h4>
            </h1>
            <p class="d-sm-block">
              <div>
                {project.buttons.map(button =>
                  <a class="p-3" href={button.url} target="_blank" rel="noreferrer">
                    <i class={buttonIcon(button.type)} /> {button.type}
                  </a>
                )}
              </div>
            </p>
          </div>
          </div>
          </div>
      )}
        </div>
      
    </div>
  );
};

export default ProjectsComponent;
