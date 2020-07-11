function BindPage(){   
  let I = JSON.parse(getFile("./json/about.json"));
  $("#welcome").text(I["welcome"]);
  I.Work.forEach(e => {$("#tmpWork").tmpl(e).appendTo($("#work"));});
  I.highlights.forEach(e =>{$("#tmpHighlights").tmpl(e).appendTo($("#highlights"))});
  I.Hobbies.forEach(e=>{$("#tmpLi").tmpl(e).appendTo($("#interests"));});
  I.volunteer.forEach(e=>{$("#tmpLi").tmpl(e).appendTo($("#volunteer"));});
  
  I.Experence.UI.forEach(e=>{$("#tmpExp").tmpl(e).appendTo($("#UI"));});
  I.Experence.Backend.forEach(e=>{$("#tmpExp").tmpl(e).appendTo($("#Backend"));});
  I.Experence.Database.forEach(e=>{$("#tmpExp").tmpl(e).appendTo($("#Database"));});
  I.Experence.Frameworks.forEach(e=>{$("#tmpExp").tmpl(e).appendTo($("#Frameworks"));});
  I.Experence.VersionControl.forEach(e=>{$("#tmpExp").tmpl(e).appendTo($("#VersionControl"));});
  I.Experence.Tools.forEach(e=>{$("#tmpExp").tmpl(e).appendTo($("#Tools"));});
  I.Experence.UIFrameworks.forEach(e=>{$("#tmpExp").tmpl(e).appendTo("#UIFrameworks")}); //
}
BindPage();

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

function expPillColor(level){
  switch(level){
    case 3:
    case 2: return "primary bg-purple";
    default: return "info";
  }
}
function expPillName(level){
  switch(level){
    case 3:
    case 2: return "Professional";
    default: return "Hobbyist";
  }
}

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

