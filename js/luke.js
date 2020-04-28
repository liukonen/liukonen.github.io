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


//forEach((item, items) => {


//});

}

generate();
