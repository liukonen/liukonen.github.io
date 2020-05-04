var furloughDiary = "https://liukonen.github.io/furlough/index.html";

function getFile(fileUrl){
let temp;
  $.ajax({
    url:  fileUrl,
      dataType: "text",	async: false,
    error: function(jqXHR, textStatus, error) {window.alert(error);},
    success: function(data, textStatus, jqXHR) {temp = data;}
  });
  return temp;

}

function GenerateDiary(){
  let urlItem = new URL(furloughDiary);
  let baseUrl = urlItem.protocol + "//" + urlItem.host;
  let WeeksString = getFile(furloughDiary);
  let parsed = liLinkParser(WeeksString);
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
  return parent;
}

function generateSubListItem(parsedItem, baseUrl){
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.setAttribute("class", "showModal dropdown-item");
  a.setAttribute("href", "#");//baseUrl + parsedItem.Link);
  a.setAttribute("data-href", baseUrl + parsedItem.Link);
  a.setAttribute("data-toggle", "modal");
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
/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-webp-setclasses !*/
!function(e,n,A){function o(e,n){return typeof e===n}function t(){var e,n,A,t,a,i,l;for(var f in r)if(r.hasOwnProperty(f)){if(e=[],n=r[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(A=0;A<n.options.aliases.length;A++)e.push(n.options.aliases[A].toLowerCase());for(t=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],l=i.split("."),1===l.length?Modernizr[l[0]]=t:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=t),s.push((t?"":"no-")+l.join("-"))}}function a(e){var n=u.className,A=Modernizr._config.classPrefix||"";if(c&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+A+"no-js(\\s|$)");n=n.replace(o,"$1"+A+"js$2")}Modernizr._config.enableClasses&&(n+=" "+A+e.join(" "+A),c?u.className.baseVal=n:u.className=n)}function i(e,n){if("object"==typeof e)for(var A in e)f(e,A)&&i(A,e[A]);else{e=e.toLowerCase();var o=e.split("."),t=Modernizr[o[0]];if(2==o.length&&(t=t[o[1]]),"undefined"!=typeof t)return Modernizr;n="function"==typeof n?n():n,1==o.length?Modernizr[o[0]]=n:(!Modernizr[o[0]]||Modernizr[o[0]]instanceof Boolean||(Modernizr[o[0]]=new Boolean(Modernizr[o[0]])),Modernizr[o[0]][o[1]]=n),a([(n&&0!=n?"":"no-")+o.join("-")]),Modernizr._trigger(e,n)}return Modernizr}var s=[],r=[],l={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var A=this;setTimeout(function(){n(A[e])},0)},addTest:function(e,n,A){r.push({name:e,fn:n,options:A})},addAsyncTest:function(e){r.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr;var f,u=n.documentElement,c="svg"===u.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;f=o(e,"undefined")||o(e.call,"undefined")?function(e,n){return n in e&&o(e.constructor.prototype[n],"undefined")}:function(n,A){return e.call(n,A)}}(),l._l={},l.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},l._trigger=function(e,n){if(this._l[e]){var A=this._l[e];setTimeout(function(){var e,o;for(e=0;e<A.length;e++)(o=A[e])(n)},0),delete this._l[e]}},Modernizr._q.push(function(){l.addTest=i}),Modernizr.addAsyncTest(function(){function e(e,n,A){function o(n){var o=n&&"load"===n.type?1==t.width:!1,a="webp"===e;i(e,a&&o?new Boolean(o):o),A&&A(n)}var t=new Image;t.onerror=o,t.onload=o,t.src=n}var n=[{uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",name:"webp"},{uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",name:"webp.alpha"},{uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",name:"webp.animation"},{uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",name:"webp.lossless"}],A=n.shift();e(A.name,A.uri,function(A){if(A&&"load"===A.type)for(var o=0;o<n.length;o++)e(n[o].name,n[o].uri)})}),t(),a(s),delete l.addTest,delete l.addAsyncTest;for(var p=0;p<Modernizr._q.length;p++)Modernizr._q[p]();e.Modernizr=Modernizr}(window,document);

GenerateDiary();

$(document).ready(function() {
  $(".showModal").click(function(e) {
    e.preventDefault();
    var url = $(this).attr("data-href");
    console.log($(this));
    if (window.innerWidth >= 576){
      $("#staticBackdropLabel").text($(this).text());

      $("#dynamicModal iframe").attr("src", url);
      $("#dynamicModal").modal("show");
      $("#aSite").attr("href", url);
    }
  else {var win = window.open(url, '_blank'); win.focus();}
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



  $(window).on('load', function() {
    Modernizr.on('webp', function(result) {
      if (result) {
        console.log("Webp supported");
        // supported
      }
      else {
        console.log("webp not supported, fallback to png");
        $('img').each(function() {
          var $img = $(this);
          var src = $img.attr("src");
          src += ".png";
          $img.attr("src", src);
          $(".jumbotron").css("background-image", "url('../img/jumbotron.webp.png')");
        });
      }
    });


});





/*
$('img').each(function() {
     var $img = $(this);
     var imgsrc = $img.attr('src');

     var imgsrc1 = imgsrc.substr(imgsrc.lastIndexOf("img/"));
     imgsrc1     = imgsrc.substr(4);
     var imgalt  = imgsrc1.substr(4,imgsrc.length - 4);

     var imgsrc2 ='http://dl.dropbox.com/u/xxxxxx/img/' + imgsrc1;
     $img.attr('src',imgsrc2);
     $img.attr('alt',imgalt);
}
*/


//Sub Menu Support End
