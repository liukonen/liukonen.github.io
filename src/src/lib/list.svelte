<script>
  export let listItems
  export let listStyle
  const GetStyle = listStyle == 1 ? "list-group text-dark shadow whiteGlass" : "list-group whiteGlass"
</script>

<ul class={GetStyle}>
  {#each listItems as { a }}
    <li class="list-group-item pane">{a}</li>
  {/each}
</ul>