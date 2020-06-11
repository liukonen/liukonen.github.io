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


function CheckFade()
{
  $('.fade-in').each( function(i){
  var bottom_of_object = $(this).offset().top + $(this).outerHeight();
  var bottom_of_window = $(window).scrollTop() + $(window).height();  
  if( bottom_of_window > bottom_of_object ){ $(this).animate({'opacity':'1'},500);}
  });
}

$(document).ready(function() {
  CheckFade();    
  /* Every time the window is scrolled ... */
  $(window).scroll( function(){
            CheckFade();
  });
  
});
