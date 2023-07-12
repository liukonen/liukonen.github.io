<script>
  export let menuItems;

  function validatePath(path) {
    const current = location.pathname.substring(1).toLowerCase() || "index.html"
    return path === current ? "active" : ""
  }
</script>

<nav
  class="navbar navbar-expand-md navbar-dark fixed-top bg-dark RoundedBottom">
   <div class="container-fluid">
    <a class="navbar-brand" href="#" aria-label="welcome">
      <img
        src="./img/favicons/favicon-32x32.png"
        alt="logo"
        style="padding-left: 12px;"
      />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="navItem">
        {#each menuItems as { name, value }}
          <li class={validatePath(value)}>
            <a class="nav-link" href={value}>{name}</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>
