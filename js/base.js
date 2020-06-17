var furloughDiary = "furlough/index.html";

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



function navActiveText(fileName){
  let currentPath = new URL(window.location.href).pathname;
if (currentPath.toLowerCase().includes(fileName) || (currentPath == "/" && fileName== "index.html")){
  return "(current)";
} return "";
}


function navActiveFormat(fileName){
  let currentPath = new URL(window.location.href).pathname;
  if (currentPath.toLowerCase().includes(fileName) || (currentPath == "/" && fileName== "index.html")){
    return "active";
  } return "";
}

function generateMenu(){
  JSON.parse(getFile("./json/header.json"))["menu"].forEach(item =>{
    $("#navTemp").tmpl(item).appendTo($("#navMenuBind"));  
  });
}


/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-createelementattrs_createelement_attrs-webp !*/
 !function(e,n,t){function A(e,n){return typeof e===n}function a(){var e,n,t,a,o,i,s;for(var l in r)if(r.hasOwnProperty(l)){if(e=[],n=r[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(a=A(n.fn,"function")?n.fn():n.fn,o=0;o<e.length;o++)i=e[o],s=i.split("."),1===s.length?Modernizr[s[0]]=a:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=a),u.push((a?"":"no-")+s.join("-"))}}function o(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function i(e){var n=c.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var A=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(A,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?c.className.baseVal=n:c.className=n)}function s(e,n){if("object"==typeof e)for(var t in e)f(e,t)&&s(t,e[t]);else{e=e.toLowerCase();var A=e.split("."),a=Modernizr[A[0]];if(2==A.length&&(a=a[A[1]]),"undefined"!=typeof a)return Modernizr;n="function"==typeof n?n():n,1==A.length?Modernizr[A[0]]=n:(!Modernizr[A[0]]||Modernizr[A[0]]instanceof Boolean||(Modernizr[A[0]]=new Boolean(Modernizr[A[0]])),Modernizr[A[0]][A[1]]=n),i([(n&&0!=n?"":"no-")+A.join("-")]),Modernizr._trigger(e,n)}return Modernizr}var r=[],l={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){r.push({name:e,fn:n,options:t})},addAsyncTest:function(e){r.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr;var f,u=[];!function(){var e={}.hasOwnProperty;f=A(e,"undefined")||A(e.call,"undefined")?function(e,n){return n in e&&A(e.constructor.prototype[n],"undefined")}:function(n,t){return e.call(n,t)}}();var c=n.documentElement,p="svg"===c.nodeName.toLowerCase();Modernizr.addTest("createelementattrs",function(){try{return"test"==o('<input name="test" />').getAttribute("name")}catch(e){return!1}},{aliases:["createelement-attrs"]}),l._l={},l.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},l._trigger=function(e,n){if(this._l[e]){var t=this._l[e];setTimeout(function(){var e,A;for(e=0;e<t.length;e++)(A=t[e])(n)},0),delete this._l[e]}},Modernizr._q.push(function(){l.addTest=s}),Modernizr.addAsyncTest(function(){function e(e,n,t){function A(n){var A=n&&"load"===n.type?1==a.width:!1,o="webp"===e;s(e,o&&A?new Boolean(A):A),t&&t(n)}var a=new Image;a.onerror=A,a.onload=A,a.src=n}var n=[{uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",name:"webp"},{uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",name:"webp.alpha"},{uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",name:"webp.animation"},{uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",name:"webp.lossless"}],t=n.shift();e(t.name,t.uri,function(t){if(t&&"load"===t.type)for(var A=0;A<n.length;A++)e(n[A].name,n[A].uri)})}),a(),delete l.addTest,delete l.addAsyncTest;for(var d=0;d<Modernizr._q.length;d++)Modernizr._q[d]();e.Modernizr=Modernizr}(window,document);


 if(navigator.appName.indexOf("Internet Explorer")!=-1 || navigator.userAgent.match(/Trident.*rv[ :]*11\./)){ window.location = "ie.html"; }








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
generateMenu();