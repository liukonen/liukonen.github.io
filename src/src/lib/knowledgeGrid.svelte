<script>
  import Lazy from "svelte-lazy"
  export let items

  function GetPill(item) {
    return item.level > 1
      ? "badge badge-pill bg-primary bg-purple text-white"
      : "badge badge-pill bg-success text-white"
  }
  function GetName(item) {
    return item.level > 1 ? "Pro" : "Hobby"
  }
</script>

<div class="container glass">
  <div class="container" id="Knowledge">
    <h3 class="text-center h3 tshadow mt-5">
      Systems / Ideas I've worked with
    </h3>
    <div class="row text-dark mt-5" id="vbackend">
      {#each items as category}
        <div class="col-md-4">
          <ul class="list-group shadow ml-2 mt-4 whiteGlass">
            <li class="list-group-item list-group-item-dark">
              {category.name}
            </li>

            {#each category.items as item}
              <li
                class="list-group-item pane d-flex justify-content-between align-items-center">
                <div class="image-parent">
                  <Lazy>
                    <img src={item.img} alt={item.title} style="width: 32px" />
                  </Lazy>
                </div>
                {item.title}
                <span class={GetPill(item)}>{GetName(item)}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</div>
