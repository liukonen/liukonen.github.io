var liWeeks;
var ActiveWeek = 0;
var MaxWeek = 0;
var lastName; var LastLink;
var MagicDate = new Date(2020,02,29);
var search = document.querySelector('#search');
var results = document.querySelector('#searchresults');
var SearchItems = JSON.parse( getFile("https://liukonen.github.io/furlough/keywords.json"));



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
console.log(lastName);
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
  SetActive(ActiveWeek);
}

function PopulateSearchResults(SearchResults){
  console.log("Hit");
  let blogTemp = $("#dTemp");
  let placeholder = $("#PlaceHolderItem");
  let RI = [];
  ActiveWeek = -1;
  //let counter = 1;
  placeholder.empty();
  SearchResults.forEach(sItem => {
    let NewURL = "./furlough/days/" + sItem.substring(0, sItem.length -2) + "html";
    let counter = parseInt(sItem.substring(3).substring(0,2));
    RI.push({Name: FakeNewName(sItem), Link:NewURL, ItemNumber: counter});
    counter++;
  });
  RI.forEach(item => {blogTemp.tmpl(item).appendTo(placeholder)});
  SetActive(-1);  
}

function FakeNewName(name)
{
  let X = name[0].toUpperCase() + name.substring(1);
let Y = X.substring(0, 3) + " " + X.substring(3);
return Y.substring(0, Y.length -3);
}

function SetActive(activeWeek)
{
    var i;
    for (i = 0; i <= MaxWeek; i++) {
      $("#btn-" + i).attr("class", (i == activeWeek ? "btn btn-primary": "btn btn-light"));
    }
 //$("#prev").attr("class", (activeWeek == 1 || activeWeek == -1) ? "page-item disabled": "page-item");
 //$("#next").attr("class", (activeWeek == MaxWeek || activeWeek == -1) ? "page-item disabled" : "page-item");
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
  if (WeekNumber == -1) {
console.log(ItemNumber);
  let calcWeek = parseInt(ItemNumber / 5) + 1;
  let CalcDay = parseInt(ItemNumber % 5) + 1;
  return CalcDate(CalcDay, calcWeek); 
    //let P = "day05.md".substring(3).substring(0,2)
    return new Date(0);}
  return (addDays(MagicDate, (WeekNumber * 7)+ ItemNumber));
}

function ExtractBlogItem(dayUrl){ return ExtractBlogItem(dayUrl, "");}

function ExtractBlogItem(dayUrl, name){
//Ripping from MD files, which are WAY smaller in size
    let dayString = getFile(baseUrl() + dayUrl.substring(0, dayUrl.length -4) + "md");
    let sstring = dayString.replace("#", "").trim();
    if (sstring.startsWith(name)){sstring = sstring.substring(name.length);}
    if (sstring.length > 120){return sstring.substring(0,120);}
    return sstring;
}

function addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
  }


  function SearchFind2()
{

    let searchString = search.value.trim().toLowerCase();
    SearchFind(searchString);

}

function SearchFind(searchString)
{
    let ResponseItem  = SearchItems.filter(x=> x.keyword == searchString)[0] || null;
    if (ResponseItem != null){
        PopulateSearchResults(ResponseItem.files);
    }
}


function GenerateKeywords()
{
    let template = $("#tempKeywordList");
    for(i = 0; 5 > i; i++)
    {
        console.log(SearchItems[i]);
        template.tmpl(SearchItems[i]).appendTo($("#ulKeywords"));
    }

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
GenerateKeywords();

function showModal(obj, e){
  console.log("hit");
  //obj.preventDefault();
  let url = obj.getAttribute("href");
  try{
  if (window.innerWidth >= 576){
    
    $("#staticBackdropLabel").text($(this).text());
    $("#dynamicModal iframe").attr("src", url);
    $("#dynamicModal").modal("show");
    $("#aSite").attr("href", url);
  }
  else {var win = window.open(url, '_blank'); win.focus();}
  e.preventDefault();
  return false;
}
catch{}//do nothing
}

search.addEventListener('keyup', (event) =>
{

	if (event.keyCode === 13)
	{
        SearchFind2();
	}
	else
	{
		while (results.firstChild) results.removeChild(results.lastChild);
		let counter = 0;
		let searchString = search.value.trim().toLowerCase();
		SearchItems.forEach(searchItem =>
		{
			if (counter != 6)
			{
				let S = searchItem.keyword;
				if (searchItem.keyword.startsWith(searchString))
				{
					counter++;
					let item = document.createElement("option");
					item.text = searchItem.keyword;
					results.appendChild(item);
				}
			}
		});
	}
});

$("#search").on('input', function() {
  var val = this.value;
  console.log(val);
  if($('#searchresults option').filter(function() {
    console.log(this);
    console.log(this.value);
      return this.value.toLowerCase() === val.toLowerCase();        
  }).length) {SearchFind(this.value); }
});
