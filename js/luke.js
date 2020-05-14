function generate(){
  console.log("generate");
  let MainContainer = $("#mainContainer");
  let alter = true;
  let items = JSON.parse(getFile("./content.json"))["items"];
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
