Vue.use(VueLazyload, {
  preLoad: 0,
  attempt: 1,
});

var SupportsWebp = 2; // 2- not set, 1, true, 0, false
var pageObject = JSON.parse(getFile("./json/page.json"));

function getFile(fileUrl) {
  let temp;
  $.ajax({
    url: fileUrl,
    dataType: "text",
    async: false,
    error: (jqXHR, textStatus, error) => {
      window.alert(error);
    },
    success: (data, textStatus, jqXHR) => {
      temp = data;
    },
  });
  return temp;
}

$(window).on("load", function () {
  console.log("hit");
  switch (SupportsWebp) {
    case 1:
    case 0:
      break;
    default:
      let elem = document.createElement("canvas");
      if (
        !!(elem.getContext && elem.getContext("2d")) &&
        elem.toDataURL("image/webp").indexOf("data:image/webp") == 0
      ) {
        SupportsWebp = 1;
      } else {
        SupportsWebp = 0;
      }
  }
  if (SupportsWebp == 0) {
    console.log("WEBP Images NOT Supported");
    let imgs = $("img").toArray();
    imgs.forEach((img) => {
      var src = $(img).attr("src");
      if (
        typeof src !== typeof undefined &&
        src !== false &&
        src != "" &&
        src.substring(src.length - 4) == "webp"
      ) {
        $(img).attr("src", src + ".png");
      }
    });
    $(".bgimg-1").css("background-image", "url('../img/jumbotron.webp.png')");
  } else {
    console.log("WEBP Images Supported");
  }
});

if (
  navigator.appName.indexOf("Internet Explorer") != -1 ||
  navigator.userAgent.match(/Trident.*rv[ :]*11\./)
) {
  window.location = "ie.html";
}

/*Vue Components*/
Vue.component("alist", {
  props: {
    list: { type: Array },
    styles: { type: Number, default: 0 },
  },
  methods: {
    GetStyle(number) {
      return number == 1 ? "list-group text-dark shadow clearGlass" : "list-group clearGlass";
    },
  },
  template: `
  <ul :class="GetStyle(styles)">
   <li v-for="item in list" class="list-group-item pane">{{item.a}}</li>
  </ul>
  `,
});

Vue.component("Work", {
  props: {
    work: {type:Array}
  },
  data () {
    return {
      summary:''
    }
  },
  methods:{
say: function(value){alert(value);},
    setItem : function(value)
    {
      this.summary = value;
    },
    dtbind: function(value){return '#' + value.replaceAll(" ", "");},
    dtId: function(value){return value.replaceAll(" ", "");}
  },

  template: `
<div id="accordion" class="col-12 ClearGlass">
<div class="card whiteGlass" v-for="job in work">

<div class="card-header ">
    <button class="btn btn-link" style="color:black" data-toggle="collapse" :data-target="dtbind(job.timeworked)"
     aria-expanded="true" aria-controls="collapseOne" :aria-label="job.name">
     <img v-lazy="job.img" class="rounded shadow mx-2" :alt-text="job.name" width="32px" height="32px" />
      <b>{{job.name}}</b> {{job.timeworked}}
    </button>
</div>

<div :id="dtId(job.timeworked)" class="collapse" data-parent="#accordion">
  <div class="card-body">
    {{job.summary}}
  </div>
</div>
</div>
</div>

`,
});

Vue.component("School", {
  props: ["job"],
  template: `  
    <div class="row justify-content-md-center ">
     <div class="col-md-2 mt-3"><img class="ImgRoundCorner border-right shadow" v-lazy="job.img" v-bind:alt="job.name"></img></div>  
     <div class="col-md-6 mt-3 offset-md-1">
      <h4 class="card-title">{{job.name}}</h4>
      <h5>{{job.title}}, {{job.timeworked}}</h5>
      <p class="card-text">{{job.summary}}</p>
     </div>
    </div>`,
});

Vue.component("Thought", {
  props: ["item"],
  methods: {
    getClass: function (size) {
      return "card shadow col-md-" + size + " mt-5";
    },
    GetPill: function (item) {
      switch (item.level) {
        case 3:
        case 2:
          return "badge badge-pill bg-primary bg-purple";
        default:
          return "badge badge-pill bg-success";
      }
    },
    GetName: function (item) {
      switch (item.level) {
        case 3:
        case 2:
          return "Pro";
        default:
          return "Hobby";
      }
    }
  },
  template: `  
  <div class="col-md-4">
  <ul class="list-group shadow ml-2 mt-4 whiteGlass">
  <li class="list-group-item list-group-item-dark">{{item.name}}</li>
  <li v-for="item2 in item.items" class="list-group-item pane d-flex justify-content-between align-items-center">
  <div class="image-parent">
  <img v-lazy="item2.img" v-bind:alt="item2.title" width="32px" height="32px">
  </div>
  {{item2.title}}
  <span v-bind:class="GetPill(item2)">{{GetName(item2)}}</span>
  </li>
  </ul>
  </div>
`,
});

Vue.component("Project", {
  props: ["project"],
  methods: {
    GetImage(img) {
      this.WebPSupport = SupportsWebp;
      switch (this.WebPSupport) {
        case 1:
          return img;
        case 0:
          return img + ".png";
        default:
          let elem = document.createElement("canvas");
          if (
            !!(elem.getContext && elem.getContext("2d")) &&
            elem.toDataURL("image/webp").indexOf("data:image/webp") == 0
          ) {
            SupportsWebp = 1;
            return img;
          } else {
            SupportsWebp = 0;
            return img + "png";
          }
      }
    },
    DetermButtonColor(ItemType) {
      if (ItemType.toLowerCase() == "website") {
        return "btn btn-success shadow ml-2";
      }
      if (ItemType.toLowerCase() == "release") {
        return "btn btn-primary shadow ml-2";
      }
      return "btn btn-secondary shadow ml-2";
    },
  },
  template: `
  <div class="col mb-4 hoverItem d-flex align-items-stretch">
   <div class="card shadow whiteGlass">
    <div>
     <img v-lazy="GetImage(project.image)" class="card-img-top himg rImage250" v-bind:alt="project.Title"/>
    </div>
    <div class="card-body">
     <h5 class="card-title">{{project.Title}}</h5>
     <p class="card-text">
        {{project.SubTitle}}
        <button aria-label="expand" class="btn btn-link text-dark" onclick="ExpandText(this)">
          <i class="bi bi-question-square-fill"></i>
        </button>
     </p>
     <div class="content">{{project.Description}}</div>
     <p><a v-for="button in project.buttons" v-bind:class="DetermButtonColor(button.type)" v-bind:href="button.url" target="_blank" rel="noreferrer">{{button.type}}</a></p>
     <p>Learnings 
     <button aria-label="expand" class="btn btn-link text-dark" onclick="expandlearning(this)"><i class="bi bi-arrow-right-circle"></i></button>
     </p>
     <div class="content" style="display:none">
      <span v-for="tag in project.tags" class="badge badge-light font-weight-light">{{tag}}</span></p>
     </div>
    </div>
   </div>
  </div>`,
});
/*Vue Items */
backend = new Vue({
  el: "#vbackend",
  data: { Ex: pageObject.Experence, WepPSupport: SupportsWebp },
});

career = new Vue({
  el: "#career",
  data: {
    Work: pageObject.Work,
    WepPSupport: SupportsWebp,
    highlights: pageObject.highlights,
  },
});

career = new Vue({
  el: "#edu",
  data: {
    school: pageObject.School
  },
});

Nav = new Vue({
  el: "#navItem",
  methods: {
    validatePath(path) {
      let current = location.pathname.substring(1).toLowerCase();
      if (current == "") {
        current = "index.html";
      }
      if (path == current) return "active";
      return "";
    },
  },
  data: { MenuItems: pageObject.menu },
});

blogs = new Vue({
  el: "#Blogs",
  methods: {
    getImg(index) {
      let img = "./img/blog/blog" + index + ".webp";
      this.WebPSupport = SupportsWebp;
      switch (this.WebPSupport) {
        case 1:
          return img;
        case 0:
          return img + ".png";
        default:
          let elem = document.createElement("canvas");
          if (
            !!(elem.getContext && elem.getContext("2d")) &&
            elem.toDataURL("image/webp").indexOf("data:image/webp") == 0
          ) {
            SupportsWebp = 1;
            return img;
          } else {
            SupportsWebp = 0;
            return img + "png";
          }
      }
    },
    GetItems() {
      let M = Array.from(this.BlogItems);
      if (this.BlogItems.length > 3) {
        M = M.slice(0, 3);
      }
      var objArr = M.map(function (idx, i) {
        return {
          title: idx.querySelector("title").innerHTML,
          link: idx.querySelector("link").innerHTML,
          timestamp: idx.querySelector("pubDate").innerHTML,
          index: i,
        };
      });
      return objArr;
    },
  },
  data: {
    BlogItems: [],
  },
  created() {
    fetch("https://dev.to/feed/liukonen")
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => {
        this.BlogItems = data.querySelectorAll("item");
      });
  },
});

welcome = new Vue({ el: "#welcome", data: { item: pageObject.welcome } });
About = new Vue({
  el: "#about",
  data: {
    Hobbies: pageObject.Hobbies,
    Vol: pageObject.volunteer,
  },
});

vm = new Vue({
  el: "#app",
  data: {
    Products: pageObject.projects,
    WebPSupport: SupportsWebp,
  },
});

vm.$Lazyload.$on(
  "loaded",
  function (
    { bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error },
    formCache
  ) {
    let T = $(el);
    T.animate({ opacity: "1" }, 1500);
  }
);

/**Vanilla JS */

const lateLoadFadeInObserver = new IntersectionObserver(
  (entries, lateLoadFadeInObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        lateLoadFadeInObserver.unobserve(entry.target);
        let I = $(entry.target);
        let img = I.find("img");
        let dsrc = img.attr("data-src");
        img.attr("src", SupportsWebp != 1 ? dsrc + ".png" : dsrc);
        img.fadeIn("slow");
      }
    });
  },
  { threshold: 1, rootMargin: "0px 0px 0px 0px" }
);
document.querySelectorAll(".lateloadfadeIn").forEach((entry) => {
  lateLoadFadeInObserver.observe(entry);
});

/*region Lazy Load */
function preloadImg(img) {
  let src = img.getAttribute("data-src");
  if (src) {
    if (SupportsWebp != 1) {
      img.src = src + ".png";
    } else {
      img.src = src;
    }
  }
}

const imgObserver = new IntersectionObserver(
  (entries, imgObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        preloadImg(entry.target);
        imgObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 1, rootMargin: "0px 0px 300px 0px" }
);
document.querySelectorAll(".featurette-image").forEach((img) => {
  imgObserver.observe(img);
});

const bgObserver = new IntersectionObserver(
  (entries, imgObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        var image = entry.target;
        image.classList.remove("lazy");
        imgObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0 }
);
document.querySelectorAll(".lazy").forEach((item) => bgObserver.observe(item));

/*region fader */
const faderObsever = new IntersectionObserver(
  (entries, faderObsever) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $(entry.target).animate({ opacity: "1" }, 500);
        faderObsever.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px 0px 0px" }
);
document
  .querySelectorAll(".fade-in")
  .forEach((item) => faderObsever.observe(item));
/*end region fader */

function ExpandText(me) {
  var content = me.parentElement.nextElementSibling;
  ExpandContent(me, content, '<i class="bi bi-question-square-fill"></i>', "<i class='bi bi-arrows-angle-contract'></i>");
}
function expandlearning(item){expand(item, '<i class="bi bi-arrow-right-circle"></i>', '<i class="bi bi-arrow-left-circle"></i>');}

function expand(item, displayClosed, displayOpen) { ExpandContent(item, item.parentElement.nextElementSibling,  displayClosed, displayOpen);}

function ExpandContent(item, content, displayClosed, displayOpen)
{
  console.log(item, content);
let vis = content.style.display == "block";
item.innerHTML = vis ? displayClosed : displayOpen;
content.style.display  = vis ? "none" : "block";
}

/*region transparent Navbar */
// const header = document.querySelector("nav");
// const navObserver = new IntersectionObserver(
//   (entries, navObserver) => {
//     entries.forEach((entry) => {
//       if (!entry.isIntersecting) {
//         header.classList.add("bg-dark");
//         header.classList.add("transition");
//       } else {
//         header.classList.remove("bg-dark");
//         header.classList.remove("transition");
//       }
//     });
//   },
//   { rootMargin: "-50px 0px 0px 0px" }
// );
//navObserver.observe(document.querySelector(".bgimg-1"));

// $("body").scrollspy({ target: ".navbar" });
$(".navbar-toggler").click(function () {
  header.classList.add("bg-dark");
  header.classList.add("transition");
});

// var wts = document.createElement('script');
// wts.async = true;
// wts.src = 'https://wts.one/log7.js';
// document.head.appendChild(wts);
// wts.onload = function () {wtslog7(1983157, 4);};

var video = document.getElementById("myVideo");
// Get the button
var btn = document.getElementById("playPauseIcon");

// Pause and play the video, and change the button text
function playPause() {
  if (video.paused) {
    video.play();
    btn.className = "bi bi-pause-fill";
  } else {
    video.pause();
    btn.className= "bi bi-play-fill";
  }
}

