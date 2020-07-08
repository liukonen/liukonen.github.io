
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
 