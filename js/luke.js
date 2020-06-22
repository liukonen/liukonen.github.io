function generate(){
  console.log("generate");
  let MainContainer = $("#mainContainer");
  let alter = true;
  let items = JSON.parse(getFile("./json/content.json"))["items"];
  let template = $("#itemTemplate");
  let template2 = $("#itemTemplate2");
  items.forEach(function(item){
    if (alter){ template.tmpl(item).appendTo(MainContainer);}
    else{template2.tmpl(item).appendTo(MainContainer);}
    alter =  !alter;
  });

}

function DetermButtonColor(release){return (release.startsWith("https://liukonen.github.io")) ? "success" : "primary";}
function DetermButtonName(release){return release.startsWith("https://liukonen.github.io")? "Website" : "Release";}

generate();

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





