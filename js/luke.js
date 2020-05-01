var furloughDiary = "https://liukonen.github.io/furlough/index.html";



function GenerateDiary(){
  let urlItem = new URL(furloughDiary);
  let baseUrl = urlItem.protocol + "//" + urlItem.host;
  let WeeksString = getFile(furloughDiary);
  console.log(WeeksString);
  let parsed = liLinkParser(WeeksString);
  console.log(parsed);
  let master = document.getElementById("FD2020");
  parsed.forEach(function(el){
    master.appendChild(generateParentListItem(el, baseUrl));
  });
}

function generateParentListItem(parsedItem, baseUrl){
  let parent = document.createElement("li");
  parent.setAttribute("class", "dropdown-submenu");
  let parentTitle = document.createElement("a")
  parentTitle.setAttribute("class", "dropdown-item dropdown-toggle")
  parentTitle.setAttribute("href", baseUrl + parsedItem.Link);
  parentTitle.setAttribute("target", "_blank");
  parentTitle.innerHTML = parsedItem.Name;

  let parentSub = document.createElement("ul");
  parentSub.setAttribute("class", "dropdown-menu");
  liLinkParser(getFile(baseUrl + parsedItem.Link)).forEach(function(el){
    parentSub.appendChild(generateSubListItem(el, baseUrl));
  });

  parent.appendChild(parentTitle);
  parent.appendChild(parentSub);
  console.log(parent);
  return parent;
}

function generateSubListItem(parsedItem, baseUrl){
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.setAttribute("class", "showModal dropdown-item");
  a.setAttribute("href", "#");//baseUrl + parsedItem.Link);
  a.setAttribute("data-href", baseUrl + parsedItem.Link);
  a.setAttribute("data-toggle", "modal");
  //a.setAttribute("target", "_blank");
  a.innerHTML = parsedItem.Name;
  li.appendChild(a);
  return li;
}


function liLinkParser(file){
  let response = [];
  let startIndex = file.indexOf("<ul>");
  let lastIndex = file.indexOf("</ul>");
  let sstring = file.substring(startIndex, lastIndex);
  let i = 0;

  while (i >=0){
    i = sstring.indexOf("href", i);
if (i > 0){
  i +=6;
  let Y = sstring.indexOf('"', i);
  let link = sstring.substring(i, Y);
  i = Y;

  i = sstring.indexOf(">", i) +1;
  Y = sstring.indexOf("<", i);
  let text = sstring.substring(i,Y);
  response.push({Name: text, Link:link});
}


  }
  return response;
}




function getFile(fileUrl){
let temp;
  $.ajax({
    url:  fileUrl,
      dataType: "text",	async: false,
    error: function(jqXHR, textStatus, error) {window.alert(error);},
    success: function(data, textStatus, jqXHR) {temp = data;}
  });
console.log(temp);
  return temp;

}

function generate(){
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

generate();
GenerateDiary();


$(document).ready(function() {
  $(".showModal").click(function(e) {
    console.log("hit");
    e.preventDefault();
    var url = $(this).attr("data-href");
    console.log(url);
    $("#dynamicModal iframe").attr("src", url);
    $("#dynamicModal").modal("show");
  });
});

// Submenu support
$('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
  if (!$(this).next().hasClass('show')) {
    $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
  }
  var $subMenu = $(this).next(".dropdown-menu");
  $subMenu.toggleClass('show');
  $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
    $('.dropdown-submenu .show').removeClass("show");
  });
  return false;
});
//Sub Menu Support End
