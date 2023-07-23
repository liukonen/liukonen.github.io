const innerBind = (template, dataArray, elementName) => document.getElementById(elementName).insertAdjacentHTML('beforeend', dataArray.map(item => template(item)).join(''))
const innerhtml = (template, dataArray) => dataArray.map(item => template(item)).join('')

const projectTemplate  = d =>`<div v-for="product in this.Products">
    <div class="col mb-4 hoverItem">
        <div class="card shadow">
            <div class="">
                <img src="${d.image}" loading="lazy" class="card-img-top himg" alt="${d.Title}" />
            </div>
            <div class="card-body">
                <h5 class="card-title">${d.Title}</h5>
                <p class="card-text">${d.SubTitle}<button class="btn btn-link text-dark" onclick="ExpandText(this)">[+]</button></p>
                <div class="content">${d.Description}</div>
                <p>
                ${generateButtons(d.buttons)}
                <p>Learnings</p>
                <div>
                ${generateLearnings(d.tags)}
                </div>
            </div>
        </div>
    </div>
</div>
`
const buttonTemplate = d =>`<a class="${DetermButtonColor(d.type)}" href="${d.url}" target="_blank">${d.type}</a>`
const learningsTemplate = d =>`<span class="badge text-dark">${d}</span> `

function generateButtons(items){
    return innerhtml(buttonTemplate, items)
}
function generateLearnings(items){
    return innerhtml(learningsTemplate, items)
}
function loadProjects(){
    getFile("./json/page.json").then(sourceData => {
       innerBind(projectTemplate, sourceData.projects, "products")
    })
}
loadProjects()

function DetermButtonColor(ItemType){
    if (ItemType.toLowerCase() == "website") {return "btn btn-success shadow ml-2";}
    if (ItemType.toLowerCase() == "release") {return "btn btn-primary shadow ml-2";}
    return "btn btn-secondary shadow ml-2";
}

  function ExpandText(me){
    var content = me.parentElement.nextElementSibling;
    const isContentVisible = content.style.display === "block";
    me.innerHTML = isContentVisible ? "[+]" : "[-]";
    content.style.display = isContentVisible ? "none" : "block";
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
  document.getElementById("year").innerHTML = new Date().getFullYear()