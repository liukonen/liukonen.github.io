
Vue.use(VueLazyload, {
    preLoad: 0,
    attempt: 1
  })

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
  
  /*end region - lazy load*/
  
  /*region - navbar transparent effect*/
  const header = document.querySelector(".navbar-brand");
  const navObserver = new IntersectionObserver((entries, navObserver) =>{
    entries.forEach(entry =>{
      if (!entry.isIntersecting){
        header.parentElement.classList.add("bg-dark");
        header.parentElement.classList.add("transition");
      }else{
        header.parentElement.classList.remove("bg-dark");
        header.parentElement.classList.remove("transition");
      }
    });
  }, {rootMargin:"-50px 0px 0px 0px"});
  navObserver.observe(document.querySelector(".jumbotron"));
  
  /*end region navbar transparent effect */
  
  
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