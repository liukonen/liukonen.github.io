<script>
  import CollapsibleSection from "./collapsableSection.svelte";
  import Lazy from "svelte-lazy";

  export let Projects;

  //   function GetImage(img) {
  //         return (SupportsWebp) ? img : img + ".png";
  //     }
  function DetermButtonColor(ItemType) {
    const type = ItemType.toLowerCase();
    const colors = {
      website: "btn btn-success shadow ml-2",
      release: "btn btn-primary shadow ml-2"
    };
    return colors[type] || "btn btn-secondary shadow ml-2";
  }
</script>

<div class="container glass" id="app">
  <h3 class="text-center h3 tshadow mt-5">Open Source Projects</h3>
  <!-- <div class="row row-cols-1 row-cols-md-3 mt-5"> -->
  {#each Projects as project, index}
    <div class="card glass">
      <div
        class="card-header d-flex justify-content-between align-items-center whiteGlass"
      >
        <h4>{project.SubTitle} - {project.Title}</h4>
        <div>
          <div class="btn-group" role="group" aria-label="Basic example">
          {#each project.buttons as button}
            <a
              class={DetermButtonColor(button.type)}
              href={button.url}
              target="_blank"
              rel="noreferrer"
            >
              {button.type}
            </a>
          {/each}
        </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col-md-2">
          <!-- <Lazy keep="true"> -->
            <img
              src={project.image}
              class="lzy img-fluid rounded-start"
              alt={project.Title}
            />
          <!-- </Lazy> -->
        </div>
        <div class="col-md-10">
          <div class="card-body">
            <p class="card-text"> {project.Description}
            </p>
            <p class="card-text">
              <small class="text-body-secondary">
                keywords: {project.tags.join(", ")}
              </small>
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="card-footer text-body-secondary">
        {#each project.tags as tag}
          <span class="badge badge-light font-weight-light">
            {tag}
          </span>
        {/each}
      </div> -->
    </div>

    <!-- <div class="row justify-content-md-center whiteGlass mt-4">
      <div class="col-md-2 mt-3">
        <Lazy keep="true">
          <img
            src={project.image}
            class="lzy ImgRoundCorner border-right shadow"
            alt={project.Title}
          />
        </Lazy>
      </div>
      <div class="col-md-6 mt-3 offset-md-1">
        <h4 class="card-title">{project.SubTitle} - {project.Title}</h4>
        <p class="card-text">{project.Description}</p>
        <p>
        {#each project.buttons as button}
          <a class="{DetermButtonColor(button.type)}" href="{button.url}" target="_blank" rel="noreferrer">
            { button.type }
          </a>
        {/each}
      </p>
        {#each project.tags as tag}
        <span class="badge badge-light font-weight-light">
          { tag }
        </span>
        {/each}
      </div>
    </div>    -->
  {/each}
</div>
