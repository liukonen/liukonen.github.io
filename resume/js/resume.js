const month = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function generateResume() {
  getFile("./json/resume.json").then(items => {
    BuildExperence(items["work"])
    renderSkillsLists(items["skills"])
    BuildHeader(items["basics"])
    BuildEdu(items["education"])
    BuildBasic(items["basics"])
  })
}

function BuildBasic(basicItem) {
  const template = item => `<div class="card text-white gradient-card">
  <div class="no-print"><img class="card-img-top" src="../img/original/${item.picture}" alt="me" /></div>
  <div class="card-body">${item.summary}
    <ul class="list-group custom-transparent-list text-white mt-2">
      <li class="list-group-item d-flex justify-content-between align-items-start  custom-transparent-item">
        <div class="ms-2 me-auto">
          <div class="fw-bold"><a href="tel:${item.phone}">${item.phone}</a></div>Cellular</div>
        <i class="fa-solid fa-2x fa-phone"></i>      
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-start  custom-transparent-item">
      <div class="ms-2 me-auto">
        <div class="fw-bold"><a href="mailto:${item.email}">${item.email}</a></div>personal</div>
      <i class="fa-solid fa-2x fa-envelope"></i>      
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-start  custom-transparent-item">
      <div class="ms-2 me-auto"><div class="fw-bold">${item.region}</div>region I live in</div>
      <i class="fa-solid fa-2x fa-house"></i>
      </li>
      ${buildprofiles(item.profiles)}
    </ul>
  <div>
</div>`
  singleBind(template, basicItem, "BasicItems")
}

function buildprofiles(listItems) {
  const template = item => `
  <li class="list-group-item d-flex justify-content-between align-items-start custom-transparent-item">
    <div class="ms-2 me-auto">
      <div class="fw-bold"><a href="${item.url}" target="_blank">@${item.username}</a></div>
      ${item.network}
    </div>
    <i class="${socialMediaIcon(item.network)} fa-2x"></i>      
  </li>`
  return templateArrayToString(template, listItems)
}

function BuildHeader(basicItem) {
  const template = basicItem => `<div class="lh-100"><h1 class="mb-0 text-white lh-100 display-1"> ${basicItem.name}</h1><p class="h2">${basicItem.headline}</p></div>`
  singleBind(template, basicItem, "HeaderItem")
}

function BuildEdu(eduItems) {
  const temp = data => `<div>
  <div class="card mb-3 bg-transparent">
    <div class="row g-0 transparent-list">
      <div class="col-md-8 transparent-list">
        <div class="card-body transparent-list">
          <h5 class="card-title transparent-list text-white">${data.studyType} @ The ${data.institution}</h5>
        </div>
      </div>
      <div class="col-md-4 transparent-list no-print">
        <img src="../img/original/${data.institution}.webp" class="img-fluid rounded-end" alt="${data.institution}">
      </div>
    </div>
    <div class="row g-0 transparent-list">
      <p class="card-text transparent-list text-white">Major: ${data.area}</p>
      <p class="card-text transparent-list text-white"><small class="text-white">${parseWorkDate(data.startDate)} - ${parseWorkDate(data.endDate)}</small></p>
    </div>
  </div>
</div>`
  innerBind(temp, eduItems, "EduItems")
}

// Function to render the skills lists
function renderSkillsLists(skills) {
  const topTemplate = skill => `<li class="list-group-item custom-transparent-item">
  <h3 class="h5">${skill.name}</h3>
  <div class="custom-progress" id="customProgressBar">
    <div class="progress-bar" style="width: ${getProgressBarWidth(skill.rating)}%"></div>
    <div class="progress-dot" style="left: calc(${getProgressBarWidth(skill.rating)}% - 5px"></div>
  </div>
</li>`
  innerBind(topTemplate, skills.slice(0, 4), "SkillItems")
  const otherSkillsTemplate = skill => `<span class="badge line text-white custom-pill"> ${skill.name}</span>`
  document.getElementById("otherSkillsList").innerHTML = `<h4 class="card-title">Other Skills</h4>${templateArrayToString(otherSkillsTemplate, skills.slice(4))}`

}

const getProgressBarWidth = (rating) => rating * 20 || 50
const singleBind = (template, data, elementName) => document.getElementById(elementName).innerHTML = template(data)
const innerBind = (template, dataArray, elementName) => document.getElementById(elementName).insertAdjacentHTML('beforeend', dataArray.map(item => template(item)).join(''))
const templateArrayToString = (template, dataArray) => dataArray.map(item => template(item)).join("");


function BuildExperence(experenceItems) {
  let temp = d => `<div class="media text-muted pt-3 lh-125 border-bottom border-gray">
  <div class="container">
    <div class="row text-PageBlue"><h2 class="h4">${d.position} @ ${d.company}</h2></div>
    <div class="row"><span class="lead"> <span class="text-PageBlue">${parseWorkDate(d.startDate)} - ${parseWorkDate(d.endDate)}</span> ${calculateDuration(d.start, d.end)} - ${d.location}</div>
    <div class="row"><div class="col"><p class="media-body pb-3 mb-0"> ${d.summary}<ul>${generateHighlightlist(d.highlights)}</ul></p></div></div>
  </div>   
</div>`
  innerBind(temp, experenceItems, "ExperenceItems")

}

function calculateDuration(start, end) {
  const startDate = new Date(start.year, start.month - 1)
  const endDate = end?.year ? new Date(end.year, end.month - 1) : new Date()
  const diffInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth() + 1
  const yearDiff = Math.floor(diffInMonths / 12)
  const monthDiff = diffInMonths % 12
  const yearLabel = yearDiff === 1 ? 'year' : 'years'
  const monthLabel = monthDiff === 1 ? 'month' : 'months'

  if (yearDiff === 0) return `${monthDiff} ${monthLabel}`
  else if (monthDiff === 0) return `${yearDiff} ${yearLabel}`
  return `${yearDiff} ${yearLabel} ${monthDiff} ${monthLabel}`
}

function generateHighlightlist(highlights) {
  let temp = d => `<li>${d}</li>`
  return templateArrayToString(temp, highlights)
}

function socialMediaIcon(media) {
  const iconMap = {
    "GitHub": "fab fa-github-square",
    "LinkedIn": "fab fa-linkedin",
    "Facebook": "fab fa-facebook-square",
    "dev.to": "fa-brands fa-dev",
  };
  return iconMap[media] || "far fa-user";
}

function getFile(fileUrl) {
  return fetch(fileUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status + ' ' + response.statusText);
      }
      return response.json();
    })
    .catch(error => {
      globalThis.alert(error);
    });
}

function parseWorkDate(strDate) {
  return strDate.length > 0 ? `${month[Number.parseInt(strDate.split("-")[1])]} ${strDate.split("-")[0]}` : "Present";
}
document.getElementById("year").innerHTML = new Date().getFullYear()
generateResume()