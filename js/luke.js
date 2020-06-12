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

//items below this line must be done here, since generate puts in the items needed for the functionality below
//function CheckFade()
//{
//  $('.fade-in').each( function(i){
//  var bottom_of_object = $(this).offset().top + $(this).outerHeight();
//  var bottom_of_window = $(window).scrollTop() + $(window).height();  
//  if( bottom_of_window > bottom_of_object ){ $(this).animate({'opacity':'1'},500);}
//  });
//}

//$(document).ready(function() {
//  CheckFade();    
  /* Every time the window is scrolled ... */
//  $(window).scroll( function(){
//            CheckFade();
//  });
  
//});
/*region Lazy Load */

const lloadImages = document.querySelectorAll(".featurette-image");
const observerOptions = {threshold:1, rootMargin:"0px 0px 300px 0px"};
function preloadImg(img){let src = img.getAttribute("data-src"); if (src){img.src = src; console.log(src);}}

const imgObserver = new IntersectionObserver((entries, 
  imgObserver)=> {
    entries.forEach(entry => {
      if (!entry.isIntersecting){
       console.log("Intersecting"); return;
      }  else {
         preloadImg(entry.target);
         imgObserver.unobserve(entry.target);  
      }
});

}, observerOptions);

//Load
lloadImages.forEach(img => {imgObserver.observe(img);});

/*end region - lazy load*/

/*region - navbar transparent effect*/
const header = document.querySelector(".navbar-brand");
const Jumbo = document.querySelector(".jumbotron");
const navOptions = {rootMargin:"-50px 0px 0px 0px"};

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

//load
navObserver.observe(Jumbo);
/*end region navbar transparent effect */


/*region fader */

const faderItems = document.querySelectorAll(".fade-in");
const faderOptions = {rootMargin:"0px 0px 0px 0px"};

const faderObsever = new IntersectionObserver((entries, faderObsever) => {
 entries.forEach(entry =>{
   if (entry.isIntersecting){$(entry.target).animate({'opacity':'1'},500); faderObsever.unobserve(entry.target); }
 });
}, faderOptions);
faderItems.forEach(item => faderObsever.observe(item));
/*end region fader */




