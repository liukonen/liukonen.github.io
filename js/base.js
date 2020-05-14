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
 * https://modernizr.com/download/?-webp-setclasses !
!function(e,n,A){function o(e,n){return typeof e===n}function t(){var e,n,A,t,a,i,l;for(var f in r)if(r.hasOwnProperty(f)){if(e=[],n=r[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(A=0;A<n.options.aliases.length;A++)e.push(n.options.aliases[A].toLowerCase());for(t=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],l=i.split("."),1===l.length?Modernizr[l[0]]=t:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=t),s.push((t?"":"no-")+l.join("-"))}}function a(e){var n=u.className,A=Modernizr._config.classPrefix||"";if(c&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+A+"no-js(\\s|$)");n=n.replace(o,"$1"+A+"js$2")}Modernizr._config.enableClasses&&(n+=" "+A+e.join(" "+A),c?u.className.baseVal=n:u.className=n)}function i(e,n){if("object"==typeof e)for(var A in e)f(e,A)&&i(A,e[A]);else{e=e.toLowerCase();var o=e.split("."),t=Modernizr[o[0]];if(2==o.length&&(t=t[o[1]]),"undefined"!=typeof t)return Modernizr;n="function"==typeof n?n():n,1==o.length?Modernizr[o[0]]=n:(!Modernizr[o[0]]||Modernizr[o[0]]instanceof Boolean||(Modernizr[o[0]]=new Boolean(Modernizr[o[0]])),Modernizr[o[0]][o[1]]=n),a([(n&&0!=n?"":"no-")+o.join("-")]),Modernizr._trigger(e,n)}return Modernizr}var s=[],r=[],l={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var A=this;setTimeout(function(){n(A[e])},0)},addTest:function(e,n,A){r.push({name:e,fn:n,options:A})},addAsyncTest:function(e){r.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr;var f,u=n.documentElement,c="svg"===u.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;f=o(e,"undefined")||o(e.call,"undefined")?function(e,n){return n in e&&o(e.constructor.prototype[n],"undefined")}:function(n,A){return e.call(n,A)}}(),l._l={},l.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},l._trigger=function(e,n){if(this._l[e]){var A=this._l[e];setTimeout(function(){var e,o;for(e=0;e<A.length;e++)(o=A[e])(n)},0),delete this._l[e]}},Modernizr._q.push(function(){l.addTest=i}),Modernizr.addAsyncTest(function(){function e(e,n,A){function o(n){var o=n&&"load"===n.type?1==t.width:!1,a="webp"===e;i(e,a&&o?new Boolean(o):o),A&&A(n)}var t=new Image;t.onerror=o,t.onload=o,t.src=n}var n=[{uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",name:"webp"},{uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",name:"webp.alpha"},{uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",name:"webp.animation"},{uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",name:"webp.lossless"}],A=n.shift();e(A.name,A.uri,function(A){if(A&&"load"===A.type)for(var o=0;o<n.length;o++)e(n[o].name,n[o].uri)})}),t(),a(s),delete l.addTest,delete l.addAsyncTest;for(var p=0;p<Modernizr._q.length;p++)Modernizr._q[p]();e.Modernizr=Modernizr}(window,document);
*/
/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-createelementattrs_createelement_attrs-webp !*/
 !function(e,n,t){function A(e,n){return typeof e===n}function a(){var e,n,t,a,o,i,s;for(var l in r)if(r.hasOwnProperty(l)){if(e=[],n=r[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(a=A(n.fn,"function")?n.fn():n.fn,o=0;o<e.length;o++)i=e[o],s=i.split("."),1===s.length?Modernizr[s[0]]=a:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=a),u.push((a?"":"no-")+s.join("-"))}}function o(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function i(e){var n=c.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var A=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(A,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?c.className.baseVal=n:c.className=n)}function s(e,n){if("object"==typeof e)for(var t in e)f(e,t)&&s(t,e[t]);else{e=e.toLowerCase();var A=e.split("."),a=Modernizr[A[0]];if(2==A.length&&(a=a[A[1]]),"undefined"!=typeof a)return Modernizr;n="function"==typeof n?n():n,1==A.length?Modernizr[A[0]]=n:(!Modernizr[A[0]]||Modernizr[A[0]]instanceof Boolean||(Modernizr[A[0]]=new Boolean(Modernizr[A[0]])),Modernizr[A[0]][A[1]]=n),i([(n&&0!=n?"":"no-")+A.join("-")]),Modernizr._trigger(e,n)}return Modernizr}var r=[],l={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){r.push({name:e,fn:n,options:t})},addAsyncTest:function(e){r.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr;var f,u=[];!function(){var e={}.hasOwnProperty;f=A(e,"undefined")||A(e.call,"undefined")?function(e,n){return n in e&&A(e.constructor.prototype[n],"undefined")}:function(n,t){return e.call(n,t)}}();var c=n.documentElement,p="svg"===c.nodeName.toLowerCase();Modernizr.addTest("createelementattrs",function(){try{return"test"==o('<input name="test" />').getAttribute("name")}catch(e){return!1}},{aliases:["createelement-attrs"]}),l._l={},l.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},l._trigger=function(e,n){if(this._l[e]){var t=this._l[e];setTimeout(function(){var e,A;for(e=0;e<t.length;e++)(A=t[e])(n)},0),delete this._l[e]}},Modernizr._q.push(function(){l.addTest=s}),Modernizr.addAsyncTest(function(){function e(e,n,t){function A(n){var A=n&&"load"===n.type?1==a.width:!1,o="webp"===e;s(e,o&&A?new Boolean(A):A),t&&t(n)}var a=new Image;a.onerror=A,a.onload=A,a.src=n}var n=[{uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",name:"webp"},{uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",name:"webp.alpha"},{uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",name:"webp.animation"},{uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",name:"webp.lossless"}],t=n.shift();e(t.name,t.uri,function(t){if(t&&"load"===t.type)for(var A=0;A<n.length;A++)e(n[A].name,n[A].uri)})}),a(),delete l.addTest,delete l.addAsyncTest;for(var d=0;d<Modernizr._q.length;d++)Modernizr._q[d]();e.Modernizr=Modernizr}(window,document);



//GenerateDiary();


//if (Modernizr("createelementattrs") || Modernizr("createelement-attrs")){alert("No Support");}
Modernizr.on("createelement", function(result){
  if (result){GenerateDiary();}
  else{
    $("#FD2020").innerHTML = "<li><a href='" + furloughDiary + "' target='_blank'>link</a></li>";
     }
})


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

          let EW = src.substring(src.length-5);

          if (EW == ".webp"){src += ".png"; $img.attr("src", src);}
          $(".jumbotron").css("background-image", "url('../img/jumbotron.webp.png')");
        });
      }
    });


});

//Sub Menu Support End
