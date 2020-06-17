var liWeeks;
var ActiveWeek = 0;
var MaxWeek = 0;
var lastName; var LastLink;
var MagicDate = new Date(2020,02,29);
var search = document.querySelector('#search');
var results = document.querySelector('#searchresults');
var SearchItems = JSON.parse( getFile("furlough/keywords.json"));
var ActiveWeeks = [];
var AllWeeks = [];
var days;


const observerOptions = {threshold:1, rootMargin:"0px 0px 0px 0px"};
const ContentObserver = new IntersectionObserver((entries, 
  ContentObserver)=> {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        let S = entry.target.getAttribute("data-src");
        let item = S.split("|");
        console.log(item);
        entry.target.innerHTML =  ExtractBlogItem(item[0], item[1]);
        ContentObserver.unobserve(entry.target);  
      }
});

}, observerOptions);

function baseUrl(){
  let item = new URL(furloughDiary);
  return item.protocol + "//" + item.host;
}

function generateNavs(){
  let weeksString = getFile(furloughDiary);
  let navTemp = $("#templateNav");
  let MainContainer = $("#ulNav");
  AllWeeks = liLinkParser2(weeksString);
  ActiveWeeks = AllWeeks.slice(AllWeeks.length -4);
  ActiveWeeks.forEach(item =>{navTemp.tmpl(item).appendTo(MainContainer); lastName = item.Name; LastLink=item.Link;});

  $("#li-"+ RmName(lastName)).attr("class", "page-item active");
  MaxWeek = parseInt(RmName(lastName));
  console.log(lastName);
  PopulateWeek(LastLink, lastName);
}

function adjustNavs(direction){
  let navTemp = $("#templateNav");
  let MainContainer = $("#ulNav");
  MainContainer.empty();
  if (direction == 0){

    let currentLow = ActiveWeeks[0].ItemNumber;
    let newLow = (currentLow-4 >= 1) ? currentLow -4 : 1;
    console.log(newLow-1, 4);
    ActiveWeeks = AllWeeks.slice(newLow-1, newLow + 3);
    console.log(AllWeeks);

  }else{
     let newlow = ActiveWeeks[ActiveWeeks.length -1].ItemNumber;
     let length = (newlow + 4 >= MaxWeek) ? MaxWeek - newlow : 4;
    ActiveWeeks = AllWeeks.slice(newlow, newlow + length);    
  }
  ActiveWeeks.forEach(item =>{navTemp.tmpl(item).appendTo(MainContainer);});
  SetActive(ActiveWeek);
}

function PopulateWeek(weekUrl, name){

  let weekString = getFile(baseUrl() + weekUrl);
  let blogTemp = $("#dTemp");
  let placeholder = $("#PlaceHolderItem");
  placeholder.empty();
  ActiveWeek = parseInt(RmName(name));
  days = liLinkParser2(weekString);
   days.reverse().forEach(item=>{blogTemp.tmpl(item).appendTo(placeholder)});
  BindDynamic();
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
  //LoadContent(RI);
  RI.forEach(item => {blogTemp.tmpl(item).appendTo(placeholder)});
  BindDynamic();
  SetActive(-1);  
}

function BindDynamic(){
  const DynamicContent = document.querySelectorAll(".EItem");
  ContentObserver.disconnect();
  console.log(DynamicContent);
  DynamicContent.forEach(item=>{ContentObserver.observe(item);});
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
    ActiveWeeks.forEach(item =>{
      $("#btn-" + item.ItemNumber).attr("class", (item.ItemNumber == activeWeek ? "nav-link active": "nav-link"));
    })
    $("#prev").show();
    $("#next").show();

  if (ActiveWeeks[0].ItemNumber == 1){$("#prev").hide();}
  if (ActiveWeeks[ActiveWeeks.length-1].ItemNumber == MaxWeek){$("#next").hide();}
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
  }
  return (addDays(MagicDate, (WeekNumber * 7)+ ItemNumber));
}

function ExtractBlogItem(dayUrl){ return ExtractBlogItem(dayUrl, "");}

function ExtractBlogItem(dayUrl, name){
//Ripping from MD files, which are WAY smaller in size
    let dayString = getFile(baseUrl() + dayUrl.substring(0, dayUrl.length -4) + "md");
    let sstring = dayString.replace("#", "").trim();
    if (sstring.startsWith(name)){sstring = sstring.substring(name.length);}
    if (sstring.length > 120){return sstring.substring(0,120) + "...";}
    return sstring;
}

function addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
  }


  function SearchFind2() {SearchFind(search.value.trim().toLowerCase());}

function SearchFind(searchString)
{
    let ResponseItem  = SearchItems.filter(x=> x.keyword == searchString)[0] || null;
    if (ResponseItem != null) PopulateSearchResults(ResponseItem.files);
}


function GenerateKeywords()
{
    let template = $("#tempKeywordList");
    for(i = 0; 5 > i; i++) {template.tmpl(SearchItems[i]).appendTo($("#ulKeywords"));}
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