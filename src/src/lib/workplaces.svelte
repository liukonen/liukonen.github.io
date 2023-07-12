<script>
  import Lazy from "svelte-lazy"
  export let items
</script>

{#each items as jobLocation}
  <div class="row justify-content-md-center whiteGlass">
    <div class="col-md-2 mt-3">
      <Lazy>
        <img
          src={jobLocation.img}
          class="lzy ImgRoundCorner border-right shadow"
          alt={jobLocation.name}
        />
      </Lazy>
    </div>
    <div class="col-md-6 mt-3 offset-md-1">
      <h4 class="card-title">{jobLocation.name}</h4>
      <h5>{jobLocation.title}, {jobLocation.timeworked}</h5>
      <p class="card-text">{jobLocation.summary}</p>
    </div>
  </div>
{/each}
