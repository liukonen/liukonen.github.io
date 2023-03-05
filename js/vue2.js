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


$(window).on("load", function() {
    if (SupportsWebp == 2) {
        try {
            const elem = document.createElement('canvas');
            SupportsWebp = !!(elem.getContext && elem.getContext('2d')) && elem.toDataURL('image/webp').indexOf('data:image/webp') === 0 ? 1 : 0;
        } catch (e) {
            SupportsWebp = 0;
        }
    }
    if (!SupportsWebp) {
        $("img[src$='webp']").attr("src", (i, src) => `${src}.png`);
        $(".bgimg-1").css("background-image", "url('../img/jumbotron.webp.png')")
    }
    console.log((SupportsWebp) ? "WEBP Supported" : "WEBP Not Supported")
});

if (/Trident.*rv[ :]*11./.test(navigator.userAgent) || navigator.appName.indexOf("Internet Explorer") !== -1) {
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
            return number == 1 ? "list-group text-dark shadow whiteGlass" : "list-group whiteGlass";
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
        work: { type: Array }
    },
    data() {
        return {
            summary: ''
        }
    },
    methods: {
        say: function(value) { alert(value); },
        setItem: function(value) {
            this.summary = value;
        },
        dtbind: function(value) { return '#' + value.replaceAll(" ", ""); },
        dtId: function(value) { return value.replaceAll(" ", ""); }
    },

    template: `
<div id="accordion" class="col-12 ClearGlass" id="workitemsList">
<div class="card whiteGlass" v-for="job in work">
  <div class="accordion-item card-header">
      <button class="accordion-button collapsed btn btn-link" style="color:black" type="button" data-bs-toggle="collapse"
       :data-bs-target="dtbind(job.timeworked)" aria-expanded="false" :aria-label="job.name" :aria-controls="dtbind(job.timeworked)">
      <img v-lazy="job.img" class="rounded shadow mx-2" :alt-text="job.name" width="32px" height="32px" />
      <b>{{job.name}}</b> {{job.timeworked}}
      </button>
    <div :id="dtId(job.timeworked)" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#workitemsList">
      <div class="accordion-body card-body">
      <p>{{job.summary}}</p> 
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
        getClass: function(size) {
            return "card shadow col-md-" + size + " mt-5";
        },
        GetPill: function(item) {

            return item.level > 1 ? "badge badge-pill bg-primary bg-purple text-white" : "badge badge-pill bg-success text-white";
        },
        GetName: function(item) {
            return item.level > 1 ? "Pro" : "Hobby";
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
            return (SupportsWebp) ? img : img + ".png";
        },
        DetermButtonColor(ItemType) {
            const type = ItemType.toLowerCase();
            const colors = {
                "website": "btn btn-success shadow ml-2",
                "release": "btn btn-primary shadow ml-2",
            };
            return colors[type] || "btn btn-secondary shadow ml-2";
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
            const current = location.pathname.substring(1).toLowerCase() || "index.html";
            return (path === current) ? "active" : "";
        },
    },
    data: { MenuItems: pageObject.menu },
});

blogs = new Vue({
    el: "#Blogs",
    methods: {
        getImg(index) {
            const img = "./img/blog/blog" + index + ".webp";
            if (!SupportsWebp) return img + ".png";
            return img;
        },
        GetItems() {
            return Array.from(this.BlogItems).slice(0, 3).map((idx, i) => ({
                title: idx.querySelector("title").innerHTML,
                link: idx.querySelector("link").innerHTML,
                timestamp: idx.querySelector("pubDate").innerHTML,
                index: i,
            }));
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
    function({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error },
        formCache
    ) {
        let T = $(el);
        T.animate({ opacity: "1" }, 1500);
    }
);

/**Vanilla JS */

const lateLoadFadeInObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const { target } = entry;
            $(target).find("img").attr("src", `${$(target).find("img").attr("data-src")}.${SupportsWebp !== 1 ? "png" : ""}`).fadeIn("slow");
            lateLoadFadeInObserver.unobserve(target);
        }
    });
}, { threshold: 1, rootMargin: "0px" });

document.querySelectorAll(".lateloadfadeIn").forEach((entry) => {
    lateLoadFadeInObserver.observe(entry);
});

function preloadImg(img) {
    const src = img.getAttribute("data-src");
    if (src) {
        img.src = SupportsWebp != 1 ? src + ".png" : src;
    }
}

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => entry.isIntersecting && (preloadImg(entry.target), imgObserver.unobserve(entry.target)));
}, { threshold: 1, rootMargin: "0px 0px 300px 0px" });

document.querySelectorAll(".featurette-image").forEach((img) => {
    imgObserver.observe(img);
});

const bgObserver = new IntersectionObserver(
    (entries, bgObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("lazy");
                bgObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0 }
);
document.querySelectorAll(".lazy").forEach((item) => bgObserver.observe(item));


const faderObsever = new IntersectionObserver(
    (entries, faderObsever) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                $(entry.target).animate({ opacity: "1" }, 500);
                faderObsever.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px 0px 0px" }
);
document
    .querySelectorAll(".fade-in")
    .forEach((item) => faderObsever.observe(item));


function ExpandText(me) {
    var content = me.parentElement.nextElementSibling;
    ExpandContent(me, content, '<i class="bi bi-question-square-fill"></i>', "<i class='bi bi-arrows-angle-contract'></i>");
}

function expandlearning(item) { expand(item, '<i class="bi bi-arrow-right-circle"></i>', '<i class="bi bi-arrow-left-circle"></i>'); }

function expand(item, displayClosed, displayOpen) { ExpandContent(item, item.parentElement.nextElementSibling, displayClosed, displayOpen); }

function ExpandContent(item, content, displayClosed, displayOpen) {
    let vis = content.style.display == "block";
    item.innerHTML = vis ? displayClosed : displayOpen;
    content.style.display = vis ? "none" : "block";
}
var video = document.getElementById("myVideo");
var btn = document.getElementById("playPauseIcon");

function playPause() {
    video.paused ? (video.play(), btn.className = "bi bi-pause-fill") : (video.pause(), btn.className = "bi bi-play-fill");
}