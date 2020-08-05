/*Vue Components*/
Vue.component('Knowledge', {
    props:['item'],
    methods:{
        GetClass: function (item) {
            switch(item.level){
                case 3:
                case 2: return "badge badge-pill badge-primary bg-purple";
                default: return "badge badge-pill badge-info";
              }
        },
        GetName: function (item) {
            switch(item.level){
                case 3:
                case 2: return "Professional";
                default: return "Hobbyist";
              }
        }
    }
    ,
    template: `
    <div class="col2 mr-5 text-center lateloadfadeIn">
    <a v-bind:href="item.link" target="blank" v-bind:alt="item.title"><img v-bind:data-src="item.img" v-bind:title="item.title" width="100px" height="100px" style="display:none;" /></a>
    <p>{{item.title}}</p><p><span v-bind:class="GetClass(item)">{{GetName(item.level)}}</span></p>
  </div>`
  })

Vue.component('Work', {
    props:['job'],
    template: `  
    
    <div class="row justify-content-md-center">
    <div class="col-md-2 mt-3"><img class="ImgRoundCorner border-right shadow" v-bind:src="job.img" v-bind:alt="job.name"></img></div>  
    <div class="col-md-6 mt-3 offset-md-1">
        <h4 class="card-title">{{job.name}}</h4>
        <h5>{{job.title}}, {{job.timeworked}}</h5>
        <p class="card-text">{{job.summary}}</p>
    </div>
    </div>
    `
})


function WPCheck(){
    var elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
        let CanDo = elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
        return CanDo;
    }
    return false;
}

var sourceData = JSON.parse(getFile("./json/about.json"));
var WP = WPCheck;


//Vue.use(VueLazyload, {preLoad: 0, attempt: 1})

  
career = new Vue({
    el:"#career",
    data: {
        Work: sourceData.Work,
        WepPSupport: WP,
        highlights: sourceData.highlights,
        school: sourceData.School
    }, methods:{}
  });

backend = new Vue({el:"#vbackend",data:{Ex: sourceData.Experence, WepPSupport: WP}});
welcome = new Vue({el:"#welcome", data:{item: sourceData.welcome}});
About = new Vue({el:"#about", data:{Hobbies: sourceData.Hobbies, Vol: sourceData.volunteer}});


/**Vanilla JS */
const lateLoadFadeInObserver = new IntersectionObserver((entries, lateLoadFadeInObserver)=>{
    entries.forEach(entry =>{
      if (entry.isIntersecting){
        lateLoadFadeInObserver.unobserve(entry.target);
        let I = $(entry.target);
        let img = I.find("img");
        let dsrc = img.attr("data-src");
        img.attr("src",  SupportsWebp != 1 ? dsrc + ".png" : dsrc);
        img.fadeIn("slow");
      }
    });
  },{threshold: 1, rootMargin:"0px 0px 0px 0px"});
  document.querySelectorAll(".lateloadfadeIn").forEach(entry =>{lateLoadFadeInObserver.observe(entry);});
  
  
  /*region transparent Navbar */
  const header = document.querySelector("nav");
  const navObserver = new IntersectionObserver((entries, navObserver) =>{
    entries.forEach(entry =>{
      if (!entry.isIntersecting){
        header.classList.add("bg-dark");
        header.classList.add("transition");
      }else{
        header.classList.remove("bg-dark");
        header.classList.remove("transition");
      }
    });
  }, {rootMargin:"-250px 0px 0px 0px"});
  navObserver.observe(document.querySelector(".bgimg-1"));
  /*end region*/