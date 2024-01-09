<script>
  import Lazy from "svelte-lazy"
  export let items
</script>

<div class="container glass" id="edu">
  <h3 class="text-center h3 mt-5 tshadow">Education</h3>
  {#each items as school}
    <div class="row justify-content-md-center">
      <div class="col-md-2 mt-3">
        <Lazy keep="true">
          <img src={school.img} class="lzy ImgRoundCorner border-right shadow" alt={school.name} />
        </Lazy>
      </div>
      <div class="col-md-6 mt-3 offset-md-1">
        <h4 class="card-title">{school.name}</h4>
        <h5>{school.title}, {school.timeworked}</h5>
        <p class="card-text">{school.summary}</p>
      </div>
    </div>
  {/each}
</div>
