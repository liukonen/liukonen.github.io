var furloughDiary = "https://liukonen.dev/furlough/index.html";
var SupportsWebp = 2; // 2- not set, 1, true, 0, false

function getFile(fileUrl){
let temp;
  $.ajax({
    url:  fileUrl, dataType: "text",	async: false, 
    error: (jqXHR, textStatus, error)=> {window.alert(error);}, 
    success: (data, textStatus, jqXHR)=> {temp = data;}
  });
  return temp;
}


if(navigator.appName.indexOf("Internet Explorer")!=-1 || navigator.userAgent.match(/Trident.*rv[ :]*11\./)){ window.location = "ie.html"; }


