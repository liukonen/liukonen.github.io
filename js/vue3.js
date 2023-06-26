//IF Internet Exploder, go to generic IE page
if (navigator.userAgentData?.brands?.some(brand => brand.brand === 'Internet Explorer')) {
    window.location = "ie.html";
}

var SupportsWebp = true; // 2- not set, 1, true, 0, false
const elem = document.createElement('canvas');
try {
    SupportsWebp = (elem.getContext && elem.getContext('2d')) && elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
}
catch { SupportsWebp = false }
console.log(SupportsWebp ? "WEBP Supported" : "WEBP Not Supported")


window.addEventListener('load', function () {
    if (!SupportsWebp) {
        $("img[src$='webp']").attr("src", (i, src) => { (src.endsWith("webp")) ? src : `${src}.png` })
    }
})

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
    props: ["job"],
    mounted() {
        const images = Array.from(this.$el.querySelectorAll('.lzy'));
        lazyLoadImages(images);
    },

    template: `
    <div class="row justify-content-md-center whiteGlass">
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

const school = {
    props: ["job"],
    mounted() {
        const images = Array.from(this.$el.querySelectorAll('.lzy'));
        lazyLoadImages(images);
    },
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
    mounted() {
        const images = Array.from(this.$el.querySelectorAll('.lzy'));
        lazyLoadImages(images);
    },
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
    mounted() {
        const images = Array.from(this.$el.querySelectorAll('.lzy'));
        lazyLoadImages(images);
    },
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
        }
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
                    <button aria-label="expand" class="btn btn-link text-dark" onclick="ExpandText(this)">
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
                    <button aria-label="expand" class="btn btn-link text-dark" onclick="expandlearning(this)">
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
//SHARED
let sharedJsonDataPromise = null;

function loadJsonData() {
    if (sharedJsonDataPromise) {
        return sharedJsonDataPromise;
    }

    sharedJsonDataPromise = new Promise(async (resolve, reject) => {
        try {
            console.log("call to API")
            const response = await fetch('./json/page.json');
            if (!response.ok) {
                throw new Error('Failed to fetch JSON data');
            }
            const jsonData = await response.json();
            resolve(jsonData);
        } catch (error) {
            reject(error);
        }
    });

    return sharedJsonDataPromise;
}

/* Vues */

//Vue Menu
const Nav = Vue.createApp({
    data() {
        return {
            jsonData: null
        }
    },
    async created() {
        this.jsonData = await loadJsonData()
    },
    methods: {
        validatePath(path) {
            const current = location.pathname.substring(1).toLowerCase() || 'index.html'
            return path === current ? 'active' : ''
        }
    },
    setup() {
        const jsonData = Vue.reactive({})
        Vue.watchEffect(async () => {
            jsonData.value = await loadJsonData()
        })

        const MenuItems = Vue.computed(() => jsonData.value && jsonData.value.menu)

        return { MenuItems }
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
    data() {
        return {
            jsonData: null
        }
    },
    async created() {
        this.jsonData = await loadJsonData()
    },
    components: { Project },
    setup() {
        const jsonData = Vue.reactive({}) 
        Vue.watchEffect(async () => {
            jsonData.value = await loadJsonData()
        })

        const Products = Vue.computed(() => jsonData.value && jsonData.value.projects)
        const WebPSupport = SupportsWebp;
        return { Products, WebPSupport }
    }
})

const careerVue = Vue.createApp({ 
    data() {
        return {
            jsonData: null
        }
    },
    async created() {
        this.jsonData = await loadJsonData()
    },
    components: { Work, alist },
    setup() {
        const jsonData = Vue.reactive({})
        Vue.watchEffect(async () => {
            jsonData.value = await loadJsonData()
        })

        const Work = Vue.computed(() => jsonData.value && jsonData.value.Work) 
        console.log(Work)
        const WepPSupport = SupportsWebp;
        const highlights = Vue.computed(() => jsonData.value && jsonData.value.highlights) 
        return { Work, WepPSupport, highlights }
    }
})

const eduView = Vue.createApp({
    data() {
        return {
            jsonData: null
        }
    },
    async created() {
        this.jsonData = await loadJsonData()
    },
    components: { school },
    setup() {
        const jsonData = Vue.reactive({}) 
        Vue.watchEffect(async () => {
            jsonData.value = await loadJsonData()
        })

        const school = Vue.computed(() => jsonData.value && jsonData.value.School) 
        return { school }
    }
})


const backend = Vue.createApp({
    data() {
        return {
            jsonData: null
        }
    },
    async created() {
        this.jsonData = await loadJsonData()
    },
    components: { thought },
    setup() {
        const jsonData = Vue.reactive({})
        Vue.watchEffect(async () => {
            jsonData.value = await loadJsonData()
        })
        const Ex = Vue.computed(() => jsonData.value && jsonData.value.Experence)
        const WepPSupport = SupportsWebp;

        return { Ex, WepPSupport }
    }
})

const About = Vue.createApp({
    data() {
        return {
            jsonData: null
        }
    },
    async created() {
        this.jsonData = await loadJsonData()
    },
    components: { alist },
    setup() {
        const jsonData = Vue.reactive({}) 
        Vue.watchEffect(async () => {
            jsonData.value = await loadJsonData()
        })

        const item = Vue.computed(() => jsonData.value && jsonData.value.welcome)
        const Hobbies = Vue.computed(() => jsonData.value && jsonData.value.Hobbies)
        const Vol = Vue.computed(() => jsonData.value && jsonData.value.volunteer)
        return { item, Hobbies, Vol }
    }
})

/* vue mounts */
Nav.mount("#navItem")
blogs.mount("#Blogs")
vm.mount("#app")
careerVue.mount('#career')
eduView.mount("#edu")
backend.mount("#vbackend")
About.mount("#about")

/**Vanilla JS */
/// Lazy Load w/o extentions
function preloadImg(img) {
    return (!SupportsWebp) ? img + ".png" : img
}


function lazyLoadImages(images) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target
                target.setAttribute('src', preloadImg(target.dataset.src))
                $(target).fadeIn("slow")
                observer.unobserve(target)
            }
        })
    }, {
        threshold: 0.5
    })
    images.forEach((image) => observer.observe(image))
}

///Expand Text functionality
function ExpandText(me) {
    var content = me.parentElement.nextElementSibling;
    ExpandContent(me, content, '<i class="bi bi-question-square-fill"></i>', "<i class='bi bi-arrows-angle-contract'></i>");
}

function expandlearning(item) { expand(item, '<i class="bi bi-arrow-right-circle"></i>', '<i class="bi bi-arrow-left-circle"></i>'); }

function expand(item, displayClosed, displayOpen) { ExpandContent(item, item.parentElement.nextElementSibling, displayClosed, displayOpen); }

function ExpandContent(item, content, displayClosed, displayOpen) {
    let vis = content.style.display === "block"
    item.innerHTML = vis ? displayClosed : displayOpen
    content.style.display = vis ? "none" : "block"
}
var video = document.getElementById("myVideo")
var btn = document.getElementById("playPauseIcon")
///END EXPAND TEXT

function playPause() {
    video.paused ? (video.play(), btn.className = "bi bi-pause-fill") : (video.pause(), btn.className = "bi bi-play-fill")
}