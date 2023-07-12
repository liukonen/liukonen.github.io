<script>
  import { onMount } from "svelte"

  let Items

  function getImg(index) {
    const img = "./img/blog/blog" + index + ".webp"
    //if (!SupportsWebp) return img + ".png";
    return img;
  }

  function GetItems(BlogItems) {
    return Array.from(BlogItems)
      .slice(0, 3)
      .map((idx, i) => ({
        title: idx.querySelector("title").innerHTML,
        link: idx.querySelector("link").innerHTML,
        timestamp: idx.querySelector("pubDate").innerHTML,
        index: i
      }))
  }

  onMount(async () => {
    try {
      if(sessionStorage.getItem("dev.liukonen.blogstore")){
        Items = JSON.parse(sessionStorage.getItem("dev.liukonen.blogstore"))
        console.log("blog items pulled from cache")
        
      }else{
      fetch("https://dev.to/feed/liukonen")
        .then((response) => response.text())
        .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
        .then((data) => {
          Items = GetItems(data.querySelectorAll("item"));
          sessionStorage.setItem("dev.liukonen.blogstore", JSON.stringify(Items))
          console.log(Items)
        });
    }} catch (error) {
      console.error("Error loading JSON:", error)
    }
  
  })
</script>

<div id="Blogs" class="container glass">
  <h3 class="text-center h3 mt-5 tshadow">Recent Articles / Blogs</h3>
  <div class="row row-cols-1 row-cols-md-3 mt-5">
    {#if Items != null}
      {#each Items as article}
        <div class="col mb-4 hoverItem">
          <div class="card shadow whiteGlass">
            <img src={getImg(article.index)} class="card-img-top himg rImage250" alt={article.title} />
            <div class="card-body">
              <h5 class="card-title">
                <a href={article.link} rel="noreferrer" target="_blank">{article.title}</a>
              </h5>
              <p class="card-text">
                {article.timestamp.substring(0, article.timestamp.length - 9)}
              </p>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
  <div class="row">
    <h5>
      Want more? Check out my feed on DEV Community:
      <a class="btn btn-light" href="https://dev.to/liukonen" rel="noreferrer" target="_blank"><i class="bi bi-file-code-fill" />Dev.To/Liukonen</a>
    </h5>
  </div>
</div>
