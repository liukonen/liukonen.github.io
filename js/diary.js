var liWeeks;
var ActiveWeek = 0;
var MaxWeek = 0;
var lastName; var LastLink;
var MagicDate = new Date(2020,02,29);

function baseUrl(){
let item = new URL(furloughDiary);
return item.protocol + "//" + item.host;

}

function generateNavs(){
let weeksString = getFile(furloughDiary);
let navTemp = $("#templateNav");
let MainContainer = $("#ulNav");

liLinkParser(weeksString).forEach(item =>{navTemp.tmpl(item).appendTo(MainContainer); lastName = item.Name; LastLink=item.Link;});
$("#li-"+ RmName(lastName)).attr("class", "page-item active");
MaxWeek = parseInt(RmName(lastName));
PopulateWeek(LastLink, lastName);
}

var days;

function PopulateWeek(weekUrl, name){

let weekString = getFile(baseUrl() + weekUrl);
let blogTemp = $("#dTemp");
let placeholder = $("#PlaceHolderItem");
placeholder.empty();
ActiveWeek = parseInt(RmName(name));
days = liLinkParser2(weekString);


days.reverse().forEach(item=>{blogTemp.tmpl(item).appendTo(placeholder)});

SetActive();
}

function SetActive()
{
    var i;
    for (i = 0; i <= MaxWeek; i++) {
      $("#li-" + i).attr("class", (i == ActiveWeek) ? "page-item active" : "page-item");
    }
 $("#prev").attr("class", (ActiveWeek == 1) ? "page-item disabled": "page-item");
 $("#next").attr("class", (ActiveWeek == MaxWeek) ? "page-item disabled" : "page-item");
}


function liLinkParser2(file){
    let response = [];
    let startIndex = file.indexOf("<ul>");
    let lastIndex = file.indexOf("</ul>");
    let sstring = file.substring(startIndex, lastIndex);
    let i = 0;
    let counter = 1;
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
        response.push({Name: text, Link:link, ItemNumber: counter});
        counter++;
        }
      }
    return response;
  }

function RmName(name){return name.replace("Week ", "");}

function CalcDate(ItemNumber, WeekNumber){
return (addDays(MagicDate, (WeekNumber * 7)+ ItemNumber));
}

function ExtractBlogItem(dayUrl){ return ExtractBlogItem(dayUrl, "");}

function ExtractBlogItem(dayUrl, name){

    let dayString = getFile(baseUrl() + dayUrl);
    let startIndex = dayString.indexOf('<section id="main_content"');
    let sstring = dayString.substring(startIndex);
    sstring = sstring.replace( /(<([^>]+)>)/ig, '');
    console.log(sstring.startsWith(name));
    sstring = sstring.trim();
    if (sstring.startsWith(name)){sstring = sstring.substring(name.length);}
    console.log(name);
    if (sstring.length > 120){return sstring.substring(0,120);}
    return sstring;
}

function addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
  }

/*region - navbar transparent effect*/
const header = document.querySelector("nav");
const Jumbo = document.querySelector(".jumbotron");
const navOptions = {rootMargin:"-50px 0px 0px 0px"};

const navObserver = new IntersectionObserver((entries, navObserver) =>{
  entries.forEach(entry =>{
    if (!entry.isIntersecting){
      console.log("dark");
      header.classList.add("bg-dark");
      header.classList.add("transition");
    }else{
      console.log("trans");
      header.classList.remove("bg-dark");
      header.classList.remove("transition");
    }
  });
}, {rootMargin:"-50px 0px 0px 0px"});

//load
console.log("observe");
console.log(header);
console.log(Jumbo);
navObserver.observe(Jumbo);
/*end region navbar transparent effect */

generateNavs();

