const elem = document.createElement('canvas');
var SupportsWebp = 2; // 2- not set, 1, true, 0, false
try {
    SupportsWebp = !!(elem.getContext && elem.getContext('2d')) && elem.toDataURL('image/webp').indexOf('data:image/webp') === 0 ? 1 : 0;
} catch (e) {
    SupportsWebp = 0;
    console.log("Error trying to find if browsers supports WebP Images. Falling back to PNG")
}

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
    if (!SupportsWebp) {
        $("img[src$='webp']").attr("src", (i, src) => `${src}.png`);
    }
    console.log(SupportsWebp ? "WEBP Supported" : "WEBP Not Supported")
});

//IF Internet Exploder, go to generic IE page
if (/Trident.*rv[ :]*11./.test(navigator.userAgent) || navigator.appName.indexOf("Internet Explorer") !== -1) {
    window.location = "ie.html";
}


/*vue3 components */
const alist = {
    props: {
        list: { type: Array },
        styles: { type: Number, default: 0 },
    },
    methods: {
        GetStyle(number) {
            return number == 1 ? "list-group text-dark shadow whiteGlass" : "list-group whiteGlass";
        }
    },
    template: `
    <ul :class="GetStyle(styles)">
    <li v-for="item in list" class="list-group-item pane">{{item.a}}</li>
   </ul>
    `,
};

const Work = {
    props: {
        work: { type: Array }
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
        <div class="accordion ClearGlass" id="workitemsList">
          <div class="card whiteGlass" v-for="(job, index) in work" :key="job.id">
            <div class="accordion-item card-header whiteGlass">
              <div class="accordion-header" :id="index + '_header'">
                <button class="accordion-button collapsed btn whiteGlass" type="button" data-bs-toggle="collapse" :data-bs-target="'#Colapse_' + index">
                  <img :data-src="job.img" :alt="job.name" class="lzy rounded shadow mx-2" style="width: 32px" />  
                  <b>{{ job.name }}</b> {{ job.timeworked }}
                </button>
              </div>
              <div :id="'Colapse_' + index" class="accordion-collapse collapse" data-bs-parent="#workitemsList">
                <p>{{ job.summary }}</p>
              </div>
            </div>
          </div>
        </div>
    `,
}

const school = {
    props: ["job"],
    template: `
        <div class="row justify-content-md-center">
          <div class="col-md-2 mt-3">
            <img :data-src="job.img" class="lzy ImgRoundCorner border-right shadow" :alt="job.name" />
          </div>
          <div class="col-md-6 mt-3 offset-md-1">
            <h4 class="card-title">{{ job.name }}</h4>
            <h5>{{ job.title }}, {{ job.timeworked }}</h5>
            <p class="card-text">{{ job.summary }}</p>
          </div>
        </div>
`,
}

const thought = {
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
                    <li class="list-group-item list-group-item-dark">{{ item.name }}</li>
                    <li v-for="item2 in item.items" class="list-group-item pane d-flex justify-content-between align-items-center">
                        <div class="image-parent">
                            <img class="lzy" :data-src="item2.img" :alt="item2.title" style="width: 32px">
                        </div>
                        {{ item2.title }}
                        <span :class="GetPill(item2)">{{ GetName(item2) }}</span>
                    </li>
                </ul>
            </div>
        `
}

const Project = {
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
                  <img :data-src="GetImage(project.image)" class="lzy card-img-top himg rImage250" :alt="project.Title" />
                </div>
                <div class="card-body">
                  <h5 class="card-title">{{ project.Title }}</h5>
                  <p class="card-text">
                    {{ project.SubTitle }}
                    <button aria-label="expand" class="btn btn-link text-dark" @click="ExpandText()">
                      <i class="bi bi-question-square-fill"></i>
                    </button>
                  </p>
                  <div class="content">{{ project.Description }}</div>
                  <p>
                    <a v-for="button in project.buttons" :class="DetermButtonColor(button.type)" :href="button.url" target="_blank" rel="noreferrer">
                      {{ button.type }}
                    </a>
                  </p>
                  <p>Learnings
                    <button aria-label="expand" class="btn btn-link text-dark" @click="expandLearning()">
                      <i class="bi bi-arrow-right-circle"></i>
                    </button>
                  </p>
                  <div class="content" style="display: none">
                    <span v-for="tag in project.tags" class="badge badge-light font-weight-light">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
 `
}

/* Vues */
const Nav = Vue.createApp({
    methods: {
        validatePath(path) {
            const current = location.pathname.substring(1).toLowerCase() || "index.html";
            return (path === current) ? "active" : "";
        }
    },
    setup() {
        const MenuItems = pageObject.menu;
        return { MenuItems };
    }
})

const blogs = Vue.createApp({
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
    data() {
        return { BlogItems: [] };
    },
    created() {
        fetch("https://dev.to/feed/liukonen")
            .then((response) => response.text())
            .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
            .then((data) => {
                this.BlogItems = data.querySelectorAll("item");
            });
    }
})

const vm = Vue.createApp({
    components: { Project },
    setup() {
        const Products = pageObject.projects;
        const WebPSupport = SupportsWebp;
        return { Products, WebPSupport }
    }
})

const carrerVue = Vue.createApp({
    components: { Work, alist },
    setup() {
        const Work = pageObject.Work;
        const WepPSupport = SupportsWebp;
        const highlights = pageObject.highlights;
        return { Work, WepPSupport, highlights }
    }
})

const eduView = Vue.createApp({
    components: { school },
    setup() {
        const school = pageObject.School;
        return { school }
    }
});


const backend = Vue.createApp({
    components: { thought },
    setup() {
        const Ex = pageObject.Experence;
        const WepPSupport = SupportsWebp;

        return { Ex, WepPSupport }
    }
});

const About = Vue.createApp({
    components: { alist },
    setup() {
        const item = pageObject.welcome;
        const Hobbies = pageObject.Hobbies;
        const Vol = pageObject.volunteer;
        return { item, Hobbies, Vol }
    }
})

/* vue mouts */
Nav.mount("#navItem");
blogs.mount("#Blogs");
vm.mount("#app");
carrerVue.mount('#career');
eduView.mount("#edu");
backend.mount("#vbackend");
About.mount("#about");

/**Vanilla JS */
/// Lazy Load w/o extentions
function preloadImg(img) {
    return (SupportsWebp != 1) ? img + ".png" : img;
}
const images = document.querySelectorAll('.lzy')
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            target.setAttribute('src', preloadImg(target.dataset.src));
            $(target).fadeIn("slow");
            observer.unobserve(target);
        }
    })
}, {
    threshold: 0.5
});
images.forEach(image => observer.observe(image))
    ///End Lazy Load

///Expand Text functionality
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
///END EXPAND TEXT

function playPause() {
    video.paused ? (video.play(), btn.className = "bi bi-pause-fill") : (video.pause(), btn.className = "bi bi-play-fill");
}