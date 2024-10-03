<script>
  import { onMount } from "svelte";

  let Items;

  function getImg(index) {
    const img = "./img/blog/blog" + index + ".webp";
    //if (!SupportsWebp) return img + ".png";
    return img;
  }

  function GetItems(BlogItems) {
    return Array.from(BlogItems)
      .slice(0, 3)
      .map((idx, i) => ({
        title: idx.title,
        link: idx.link,
        timestamp: idx.published,
        index: i
      }));
  }

  let CurrentIndex = 0;

  const nextSlide = () => {
    CurrentIndex = (CurrentIndex + 1) % Items.length;
  };

  const prevSlide = () => {
    CurrentIndex = (CurrentIndex - 1 + Items.length) % Items.length;
  };

  onMount(async () => {
    try {
      if (sessionStorage.getItem("dev.liukonen.blogstore")) {
        Items = JSON.parse(sessionStorage.getItem("dev.liukonen.blogstore"));
        console.log("blog items pulled from cache");
      } else {
        fetch("./json/feeds.json")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            Items = GetItems(data.items);
            sessionStorage.setItem(
              "dev.liukonen.blogstore",
              JSON.stringify(Items)
            );
            console.log(Items);
          });
      }
    } catch (error) {
      console.error("Error loading JSON:", error);
    }
  });
</script>

<style>
.white-overlay {
  position: relative;
}

.white-overlay::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  pointer-events: none;
}
</style>

<div id="Blogs" class="container glass">
  <h3 class="text-center h3 mt-5 tshadow">Recent Articles / Blogs</h3>

  {#if Items != null}
    <div id="blogCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        {#each Items as article, index}
          <div class="carousel-item {index === CurrentIndex ? 'active' : ''}">
            <img src={getImg(article.index)} class="rImage250 d-block w-100 white-overlay" alt={article.title} />
            <div class="carousel-caption d-none d-md-block whiterGlass text-dark">
              <h5>{article.title}</h5>
              <p>{article.timestamp.substring(0, article.timestamp.length - 9)}</p>
              <a href={article.link} rel="noreferrer" target="_blank" class="btn btn-primary">Go to article.</a>
            </div>
            <!-- <div class="card shadow whiteGlass">
              <div class="card-body">
                <h5 class="card-title">
                  <a href={article.link} rel="noreferrer" target="_blank"
                    >{article.title}</a
                  >
                </h5>
                <p class="card-text">
                  {article.timestamp.substring(0, article.timestamp.length - 9)}
                </p>
              </div>
            </div> -->
          </div>
        {/each}
      </div>
      <button class="carousel-control-prev" type="button" on:click={prevSlide}>
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" on:click={nextSlide}>
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  {/if}

  <div class="row mt-3">
    <h5>
      Want more? Check out my feed on DEV Community:
      <a
        class="btn btn-light"
        href="https://dev.to/liukonen"
        rel="noreferrer"
        target="_blank"><i class="bi bi-file-code-fill"></i>Dev.To/Liukonen</a
      >
    </h5>
  </div>
</div>
