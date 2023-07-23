const knowledgeTemplate = exp => `<div class="card shadow col-md-3 mt-5">
  <div class="card-header bg-transparent">
    <h2 class="h4">${exp.name}</h2>
    <div class="row justify-content-md-center">
      ${generateExperenceItems(exp.items)}
    </div>
  </div>
</div>`

const experenceTemplate = d => `
<div class="col2 mr-5 text-center lateloadfadeIn">
<a href="${d.link}" target="blank" alt="${d.title}"><img src="${d.img}" loading="lazy" title="${d.title}" width="100px" height="100px" /></a>
<p>${d.title}</p><p><span class="${GetClass(d)}">${GetName(d)}</span></p>
</div>
`

const workTemplate = d =>
  `<div class="row justify-content-md-center">
<div class="col-md-2 mt-3"><img class="ImgRoundCorner border-right shadow" src="${d.img}" alt="${d.name}" loading="lazy" ></img></div>  
<div class="col-md-6 mt-3 offset-md-1">
    <h4 class="card-title">${d.name}</h4>
    <h5>${d.title}, ${d.timeworked}</h5>
    <p class="card-text">${d.summary}</p>
</div>
</div>`
const listTemplate = d => `<li class="list-group-item">${d.a}</li>`
const listSecondaryTemplate = item => `<li class="list-group-item list-group-item-secondary">${item.a}</li>`

const innerBind = (template, dataArray, elementName) => document.getElementById(elementName).insertAdjacentHTML('beforeend', dataArray.map(item => template(item)).join(''))

function loadPage() {
  getFile("./json/page.json").then(sourceData => {
    document.getElementById("welcome").innerHTML = sourceData.welcome
    innerBind(workTemplate, sourceData.Work, "work")
    innerBind(workTemplate, sourceData.School, "school")
    innerBind(listTemplate, sourceData.highlights, "highlights")
    innerBind(knowledgeTemplate, sourceData.Experence, "vbackend")
    innerBind(listSecondaryTemplate, sourceData.Hobbies, "interests")
    innerBind(listSecondaryTemplate, sourceData.volunteer, "Volunteer")
  })
  document.getElementById("year").innerHTML = new Date().getFullYear()

}
const generateExperenceItems = (items) => items.map(item => experenceTemplate(item)).join('')
loadPage()

function GetClass(item) {
  return item.level === 3 || item.level === 2
    ? "badge badge-pill bg-purple"
    : "badge badge-pill text-bg-success";
}

function GetName(item) {
  const levelNames = {
    3: "Professional",
    2: "Professional",
    default: "Hobbyist",
  };

  return levelNames[item.level] || levelNames.default;
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
      window.alert(error);
    });
}