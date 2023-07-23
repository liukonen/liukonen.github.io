var ActiveWeek = 0
var MaxWeek = 0

const MagicDate = new Date(2020, 2, 29);
const SearchItems = JSON.parse(getFile("https://liukonen.dev/furlough/keywords.json"))
var ActiveWeeks = []
var AllWeeks = []



const ContentObserver = new IntersectionObserver((entries,
  ContentObserver) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let S = entry.target.getAttribute("data-src")
      let item = S.split("|")
      entry.target.innerHTML = ExtractBlogItem(item[0], item[1])
      ContentObserver.unobserve(entry.target)
    }
  })
}, { threshold: 1, rootMargin: "0px 0px 0px 0px" })

function SearchFind2() { SearchFind(search.value.trim().toLowerCase()) }

function SearchFind(searchString) {
  let ResponseItem = SearchItems.filter(x => x.keyword == searchString)[0] || null
  if (ResponseItem != null) PopulateSearchResults(ResponseItem.files)
}


const navTemplate = data => `<li class="nav-item" id="li-${RmName(data.Name)}"><a class="nav-link" id="btn-${RmName(data.Name)}" onclick="PopulateWeek('${data.Link}', '${data.Name}')">${RmName(data.Name)}</a></li>`
const itemTemplate = d =>`<div class="col-md-12">
 <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow h-md-250 position-relative">
     <div class="col-md-12 p-4 d-flex flex-column position-static">
         <a href="${d.Link}" target="_blank">
             <h3 class="mb-0">${d.Name}</h3>
         </a>
         <div class="mb-1 text-muted">${CalcDate(d.ItemNumber).toDateString()}</div>
         <p class="card-text mb-auto">
             <div class="EItem" data-src="${d.Link}|${d.Name}"></div>
         </p>
     </div>
 </div>
</div>`

const innerBind = (template, dataArray, elementName) => document.getElementById(elementName).insertAdjacentHTML('beforeend', dataArray.map(item => template(item)).join(''))

const addDays = (date, days) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000)
const ReplaceAll = (fullText, replaceText, replaceWith) => fullText.replace(new RegExp(replaceText, "igm"), replaceWith)
const RmName = (name) => name.replace("Week ", "")
const furloughDiary = "https://liukonen.dev/furlough/index.html"
const baseUrl = () => `${new URL(furloughDiary).protocol}//${new URL(furloughDiary).host}`

const searchInput = document.getElementById('search')
const searchResults = document.getElementById('searchresults')



generateNavs()
GenerateKeywords()

//NEW REWORKED CODE GOES BELOW THIS LINE

function PopulateWeek(weekUrl, name) {
  let weekString = getFile(baseUrl() + weekUrl)
  const placeHolder = document.getElementById("PlaceHolderItem")
  placeHolder.innerHTML = ""
  ActiveWeek = parseInt(RmName(name))
  let currentDays = listLinkParser(weekString)
  innerBind(itemTemplate,currentDays.reverse(), "PlaceHolderItem")
  BindDynamic()
  SetActive(ActiveWeek)
}

function PopulateSearchResults(SearchResults) {
  const placeholder = document.getElementById("PlaceHolderItem")
  ActiveWeek = -1
  placeholder.innerHTML = ""
  const RI = SearchResults.map((sItem) => ({
    Name: FakeNewName(sItem),
    Link: `./furlough/days/${sItem.substring(0, sItem.length - 2)}html`,
    ItemNumber: parseInt(sItem.substring(3, 5)) 
  }))
  innerBind(itemTemplate, RI, "PlaceHolderItem")
  BindDynamic()
  SetActive(-1)
}

function generateNavs() {
  let weeksString = getFile(furloughDiary)
  AllWeeks = listLinkParser(weeksString)
  ActiveWeeks = AllWeeks.slice(AllWeeks.length - 4)
  innerBind(navTemplate, ActiveWeeks, "ulNav")
  const lastAttribute = ActiveWeeks[ActiveWeeks.length - 1]
  document.getElementById("li-" + RmName(lastAttribute.Name)).className = "page-item active"
  MaxWeek = parseInt(RmName(lastAttribute.Name))
  PopulateWeek(lastAttribute.Link, lastAttribute.Name)
}

function adjustNavs(direction) {
  let MainContainer = document.getElementById("ulNav")
  MainContainer.innerHTML = ""
  if (direction == 0) {
    let currentLow = ActiveWeeks[0].ItemNumber
    let newLow = (currentLow - 4 >= 1) ? currentLow - 4 : 1
    ActiveWeeks = AllWeeks.slice(newLow - 1, newLow + 3)
  } else {
    let newlow = ActiveWeeks[ActiveWeeks.length - 1].ItemNumber
    let length = (newlow + 4 >= MaxWeek) ? MaxWeek - newlow : 4
    ActiveWeeks = AllWeeks.slice(newlow, newlow + length)
  }
  innerBind(navTemplate, ActiveWeeks, "ulNav")
  SetActive(ActiveWeek)
}
function BindDynamic() {
  const DynamicContent = document.querySelectorAll(".EItem")
  DynamicContent.forEach(item => { ContentObserver.observe(item) })
}

function FakeNewName(name) {
  return name.replace(/^./, match => match.toUpperCase()).replace(/(.{3})/, "$1 ")
}

function SetActive(activeWeek) {
  ActiveWeeks.forEach(item => {
    document.querySelector("#btn-" + item.ItemNumber).classList.toggle("active", item.ItemNumber === activeWeek)
  })
  const prevButton = document.querySelector("#prev")
  const nextButton = document.querySelector("#next")
  prevButton.style.display = ActiveWeeks[0].ItemNumber === 1 ? "none" : "block"
  nextButton.style.display = ActiveWeeks[ActiveWeeks.length - 1].ItemNumber === MaxWeek ? "none" : "block"
}

function CalcDate(ItemNumber) {
  return (addDays(MagicDate, (ActiveWeek * 7) + ItemNumber))
}

function listLinkParser(file) {
  const response = []
  const ulRegex = /<ul>(.*?)<\/ul>/gs
  const liRegex = /<a\s+href="(.*?)">(.*?)<\/a>/gs
  let ulMatch
  while ((ulMatch = ulRegex.exec(file))) {
    const [, liContent] = ulMatch
    let liMatch
    let counter = 1
    while ((liMatch = liRegex.exec(liContent))) {
      const [, link, text] = liMatch
      response.push({ Name: text, Link: link, ItemNumber: counter })
      counter++
    }
  }

  return response
}

function ExtractBlogItem(dayUrl) { return ExtractBlogItem(dayUrl, "") }

function ExtractBlogItem(dayUrl, name) {
  const dayString = getFile(baseUrl() + dayUrl.substring(0, dayUrl.length - 4) + "md")
  const teststring = dayString.replace("#", "").trim()
  let modifiedDayString = teststring.startsWith(name) ? teststring.substring(name.length) : dayString
  const sstring = ReplaceAll(modifiedDayString, "# ", "### ")
  return marked.parse(sstring)
}

function GenerateKeywords() {
  const template = data => `<li class="list-group-item d-flex justify-content-between align-items-center">
    <a onclick="SearchFind('${data.keyword}')">${data.keyword}</a>
      <span class="badge text-bg-primary">${data.count}</span>
    </li>`
  innerBind(template, SearchItems.slice(0, 5), "ulKeywords")
}

searchInput.addEventListener('input', function () {
  const val = this.value.toLowerCase()
  const optionFound = Array.from(searchResults.options).some(option => option.value.toLowerCase() === val)
  if (optionFound) SearchFind(this.value)
})

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    SearchFind2()
  }
  else {
    searchResults.innerHTML = ""
    let searchString = searchInput.value.trim().toLowerCase()
    const filteredItems = SearchItems.filter(s => s.keyword.startsWith(searchString)).slice(0, 6)
    const template = data => `<option>${data.keyword}</option>`
    innerBind(template, filteredItems, "searchresults")
  }
})

const fileCache = {}

function getFile(fileUrl) {
let response = ""
  const cachedFile = sessionStorage.getItem(fileUrl)
  if (cachedFile) return cachedFile

  const xhr = new XMLHttpRequest()
  xhr.open("GET", fileUrl, false)

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = xhr.responseText
      sessionStorage.setItem(fileUrl, data)
      response = data
    } else {
      window.alert(`Failed to load file: ${xhr.status} ${xhr.statusText}`)
    }
  }

  xhr.onerror = function () { window.alert("Network error occurred while loading the file.") }
  xhr.send()
  return response
}

document.getElementById("year").innerHTML = new Date().getFullYear()