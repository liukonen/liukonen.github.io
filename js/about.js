function BindPage(){   
  let I = JSON.parse(getFile("./json/about.json"));
  $("#welcome").text(I["welcome"]);
  //I["Experence"].forEach(element => {$("#eTemp").tmpl(element).appendTo($("#eContainer"));});
  I["Work"].forEach(e => {$("#tmpWork").tmpl(e).appendTo($("#work"));});
  I["highlights"].forEach(e =>{$("#tmpHighlights").tmpl(e).appendTo($("#highlights"))});
  I["Hobbies"].forEach(e=>{$("#tmpLi").tmpl(e).appendTo($("#interests"));});
  I["volunteer"].forEach(e=>{$("#tmpLi").tmpl(e).appendTo($("#volunteer"));});
  I["UI"].forEach(e=>{$("#tmpExp").tmpl(e).appendTo($("#UI"));});
  I["Backend"].forEach(e=>{$("#tmpExp").tmpl(e).appendTo($("#Backend"));});
  I["Database"].forEach(e=>{$("#tmpExp").tmpl(e).appendTo($("#Database"));});
  I["Frameworks"].forEach(e=>{$("#tmpExp").tmpl(e).appendTo($("#Frameworks"));});
  I["VersionControl"].forEach(e=>{$("#tmpExp").tmpl(e).appendTo($("#VersionControl"));});
  I["Tools"].forEach(e=>{$("#tmpExp").tmpl(e).appendTo($("#Tools"));});
  
  //Frameworks
}
function GetPercent(OneToFive){switch (OneToFive){case 5: return 95;case 4: return 80;case 3: return 60;case 2: return 40;default: return 20;}}
function GetName(OneToFive){switch (OneToFive){case 5: return "Expert"; case 4: return "Advanced"; case 3: return "Intermediate"; case 2: return "Beginner"; default: return "New";}}

    BindPage();




const lateLoadFadeInImages = document.querySelectorAll(".lateloadfadeIn");
const lateLoadFadeInObserver = new IntersectionObserver((entries, lateLoadFadeInObserver)=>{
  entries.forEach(entry =>{
    if (entry.isIntersecting){
      lateLoadFadeInObserver.unobserve(entry.target);
      let I = $(entry.target);
      let img = I.find("img");
      let dsrc = img.attr("data-src");
      img.attr("src",  SupportsWebp != 1 ? dsrc + ".png" : dsrc);
      console.log("Hit the fade");
      img.fadeIn("slow");
    }
  });
},{threshold: 1, rootMargin:"0px 0px 0px 0px"}
);
lateLoadFadeInImages.forEach(entry =>{lateLoadFadeInObserver.observe(entry);});

function expPillColor(level){
  switch(level){
    case 3: return "primary bg-purple";
    case 2: return "primary bg-purple";
    default: return "info";
  }
}
function expPillName(level){
  switch(level){
    case 3: return "Professional";
    case 2: return "Professional";
    default: return "Hobbyist";
  }
}

/*region transparent Navbar */
const header = document.querySelector("nav");
const firstImage = document.querySelector(".bgimg-1");

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

//load
navObserver.observe(firstImage);

/*end region*/

