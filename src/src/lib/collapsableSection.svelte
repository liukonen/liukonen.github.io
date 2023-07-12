<script>
    export let headerText
    export let iconOpen
    export let iconClose
    let expanded = false
    const icon = expanded ? iconOpen : iconClose   
</script>

<div class="collapsible">
  <h5>
    {headerText}
    <button class="btn btn-link text-dark" aria-expanded={expanded} on:click={() => expanded = !expanded}>
      <i class="bi {expanded ? iconOpen : iconClose}"></i>
    </button>
  </h5> 
  <div class='contents' hidden={!expanded}>
    <slot></slot>
  </div>
</div>
