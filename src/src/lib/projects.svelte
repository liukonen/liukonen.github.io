<script>
	import CollapsibleSection from './collapsableSection.svelte';
  import Lazy from "svelte-lazy";

  import { Accordion, AccordionItem } from 'svelte-collapsible'
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
  <div class="row row-cols-1 row-cols-md-3 mt-5">
    {#each Projects as project, index}
    <div class="col mb-4 hoverItem d-flex align-items-stretch">
        <div class="card shadow whiteGlass">
          <div>
            <Lazy keep="true">
            <img src="{project.image}" class="lzy card-img-top himg rImage250" alt="{project.Title}" />
        </Lazy>  
        </div>
          <div class="card-body">
            <h5 class="card-title">{ project.Title }</h5>
            <p class="card-text">
                <CollapsibleSection headerText={project.SubTitle} iconOpen="bi-arrows-angle-contract" iconClose="bi-question-square-fill" >
                    <div class="contents">
                        {project.Description}
                    </div>
                </CollapsibleSection>

              
            </p>
            <!-- <div class="content">{ project.Description }</div> -->
            <p>
                {#each project.buttons as button}
              <a class="{DetermButtonColor(button.type)}" href="{button.url}" target="_blank" rel="noreferrer">
                { button.type }
              </a>
              {/each}
            </p>
            
                <CollapsibleSection headerText={"Learnings"} iconOpen="bi-arrow-left-circle" iconClose="bi-arrow-right-circle" >
                    {#each project.tags as tag}
                    <span class="badge badge-light font-weight-light">
                      { tag }
                    </span>
                    {/each}
                </CollapsibleSection>

            
          </div>
        </div>
      </div>
    
    {/each}
  </div>
</div>
