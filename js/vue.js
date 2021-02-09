Vue.use(VueLazyload, {preLoad: 0, attempt: 1})

var furloughDiary = "https://liukonen.dev/furlough/index.html";
var SupportsWebp = 2; // 2- not set, 1, true, 0, false

function getFile(fileUrl){
let temp;
  $.ajax({
    url:  fileUrl, dataType: "text",	async: false, 
    error: (jqXHR, textStatus, error)=> {window.alert(error);}, 
    success: (data, textStatus, jqXHR)=> {temp = data;}
  });
  return temp;
}

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-createelementattrs_createelement_attrs-webp !*/
 !function(e,n,t){function A(e,n){return typeof e===n}function a(){var e,n,t,a,o,i,s;for(var l in r)if(r.hasOwnProperty(l)){if(e=[],n=r[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(a=A(n.fn,"function")?n.fn():n.fn,o=0;o<e.length;o++)i=e[o],s=i.split("."),1===s.length?Modernizr[s[0]]=a:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=a),u.push((a?"":"no-")+s.join("-"))}}function o(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function i(e){var n=c.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var A=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(A,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?c.className.baseVal=n:c.className=n)}function s(e,n){if("object"==typeof e)for(var t in e)f(e,t)&&s(t,e[t]);else{e=e.toLowerCase();var A=e.split("."),a=Modernizr[A[0]];if(2==A.length&&(a=a[A[1]]),"undefined"!=typeof a)return Modernizr;n="function"==typeof n?n():n,1==A.length?Modernizr[A[0]]=n:(!Modernizr[A[0]]||Modernizr[A[0]]instanceof Boolean||(Modernizr[A[0]]=new Boolean(Modernizr[A[0]])),Modernizr[A[0]][A[1]]=n),i([(n&&0!=n?"":"no-")+A.join("-")]),Modernizr._trigger(e,n)}return Modernizr}var r=[],l={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){r.push({name:e,fn:n,options:t})},addAsyncTest:function(e){r.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr;var f,u=[];!function(){var e={}.hasOwnProperty;f=A(e,"undefined")||A(e.call,"undefined")?function(e,n){return n in e&&A(e.constructor.prototype[n],"undefined")}:function(n,t){return e.call(n,t)}}();var c=n.documentElement,p="svg"===c.nodeName.toLowerCase();Modernizr.addTest("createelementattrs",function(){try{return"test"==o('<input name="test" />').getAttribute("name")}catch(e){return!1}},{aliases:["createelement-attrs"]}),l._l={},l.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},l._trigger=function(e,n){if(this._l[e]){var t=this._l[e];setTimeout(function(){var e,A;for(e=0;e<t.length;e++)(A=t[e])(n)},0),delete this._l[e]}},Modernizr._q.push(function(){l.addTest=s}),Modernizr.addAsyncTest(function(){function e(e,n,t){function A(n){var A=n&&"load"===n.type?1==a.width:!1,o="webp"===e;s(e,o&&A?new Boolean(A):A),t&&t(n)}var a=new Image;a.onerror=A,a.onload=A,a.src=n}var n=[{uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",name:"webp"},{uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",name:"webp.alpha"},{uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",name:"webp.animation"},{uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",name:"webp.lossless"}],t=n.shift();e(t.name,t.uri,function(t){if(t&&"load"===t.type)for(var A=0;A<n.length;A++)e(n[A].name,n[A].uri)})}),a(),delete l.addTest,delete l.addAsyncTest;for(var d=0;d<Modernizr._q.length;d++)Modernizr._q[d]();e.Modernizr=Modernizr}(window,document);

$(window).on('load', function() {
  Modernizr.on('webp', function(result) {
    if (result) {
      console.log("Webp supported");
      SupportsWebp = 1;
    } else {
      console.log("webp not supported, fallback to png");
      SupportsWebp = 0;
      let imgs = $("img").toArray();
      imgs.forEach((img) =>{
        var src = $(img).attr("src");
        if (typeof src !== typeof undefined && src !== false && src != "" && src.substring(src.length -4) == "webp") {
            $(img).attr("src", src + ".png");
        }
      });
      $(".jumbotron").css("background-image", "url('../img/jumbotron.webp.png')");
    }
  });
});

if(navigator.appName.indexOf("Internet Explorer")!=-1 || navigator.userAgent.match(/Trident.*rv[ :]*11\./)){ window.location = "ie.html"; }



var Nav = new Vue({
  el: '#navItem',

  methods: {

    validatePath(path){
      let current = location.pathname.substring(1).toLowerCase();
      if (current == "") {current = "index.html";}
      if (path == current) return "active";
      return "";
    }
  },
	data: {
      MenuItems: [],
    },
  async created(){
    await fetch("./json/header.json").then(response => response.json()).then(json =>{this.MenuItems = json.menu;});
  }
});


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
    <p>{{item.title}}</p><p><span v-bind:class="GetClass(item)">{{GetName(item)}}</span></p>
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

Vue.component('Project', {
props: ['project'],
template: `
<div class="col mb-4 hoverItem">
<div class="card shadow">
  <div class="">
  <img v-lazy="GetImage(project.image)"  style="height:250px;" class="card-img-top himg" v-bind:alt="product.Title"/>
  </div>
  <div class="card-body">
    <h5 class="card-title">{{project.Title}}</h5>
    <p class="card-text">{{project.SubTitle}}<button class="btn btn-link text-dark" onclick="ExpandText(this)">[+]</button></p>
    <div class="content">{{project.Description}}</div>
    <p><a v-for="button in project.buttons" v-bind:class="DetermButtonColor(button.type)" v-bind:href="button.url" target="_blank">{{button.type}}</a></p>
    <p>Learnings</p>
    <div>
      <span v-for="tag in project.tags" class="badge badge-light font-weight-lighter">{{tag}}</span></p>
    </div>
  </div>
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
  
vm = new Vue({
	el: '#app',
	data: {
      Products: [],
      WebPSupport : 2
    },
    async created(){
        await fetch("./json/content.json").then(response => response.json()).then(json =>{this.Products = json.items;});
    },
	methods: {
		 GetClass(index, valueType) {
            if(index%2==1){
                if (valueType == 0){return "col-md-5 fade-in"};
                return "col-md-7 fade-in";
            }else{
                if (valueType == 0) return "col-md-5 order-md-2 fade-in";
                return "col-md-7 order-md-1 fade-in";
            }
        },
        GetClass(valueType){
            if (valueType == 0){return "col-md-5 fade-in"};
            return "col-md-7 fade-in";
        },
        DetermButtonColor(ItemType){
            if (ItemType.toLowerCase() == "website") {return "btn btn-success shadow ml-2";}
            if (ItemType.toLowerCase() == "release") {return "btn btn-primary shadow ml-2";}
            return "btn btn-secondary shadow ml-2";
        },
        GetImage(img){
            if (this.WebPSupport == 1){return img;}
            if (this.WebPSupport == 2){
                var elem = document.createElement('canvas');
                if (!!(elem.getContext && elem.getContext('2d'))) {
                    let CanDo = elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
                    if (CanDo){ this.WebPSupport = 1; return img;}
                }
                this.WebPSupport = 0;
            }
            return img + ".png";
        },
        log(){console.log(this);}

	}
  })

  vm.$Lazyload.$on('loaded', function ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error }, formCache) {
    let T = $(el);
    T.animate({'opacity':'1'},1500);
  })
 
  /*region Lazy Load */
function preloadImg(img){
    let src = img.getAttribute("data-src"); 
    if (src){
      if (SupportsWebp != 1){img.src = src + ".png";}
      else{img.src = src;} 
      console.log(src);
    }
  }
  
  const imgObserver = new IntersectionObserver((entries, imgObserver)=> {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          preloadImg(entry.target);
          imgObserver.unobserve(entry.target);  
        }
  });
  }, {threshold:1, rootMargin:"0px 0px 300px 0px"});
  document.querySelectorAll(".featurette-image").forEach(img => {imgObserver.observe(img);});

  
  
  /*region fader */
  const faderObsever = new IntersectionObserver((entries, faderObsever) => {
   entries.forEach(entry =>{
     if (entry.isIntersecting){$(entry.target).animate({'opacity':'1'},500); faderObsever.unobserve(entry.target); }
   });
  }, {rootMargin:"0px 0px 0px 0px"});
  document.querySelectorAll(".fade-in").forEach(item => faderObsever.observe(item));
  /*end region fader */

  function ExpandText(me){
    var content = me.parentElement.nextElementSibling;
    ExpandContent(me, content);
  }



  function ExpandContent(item, content){
    if (content.style.display === "block") {
      item.innerHTML = '[+]';
      content.style.display = "none";
    } else {
      item.innerHTML ='[-]';
    content.style.display = "block";
    }

  }

    
  /*region transparent Navbar */
  const header = document.querySelector("nav");
  const navObserver = new IntersectionObserver((entries, navObserver) =>{
    entries.forEach(entry =>{
      if (!entry.isIntersecting){
        header.classList.add("bg-dark");
        header.classList.add("transition");
        console.log("Not intersecting");
      }else{
        header.classList.remove("bg-dark");
        header.classList.remove("transition");
        console.log("intersecting");
      }
    });
  }, {rootMargin:"-50px 0px 0px 0px"});
  navObserver.observe(document.querySelector(".jumbotron"));