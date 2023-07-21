var month = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function generateResume() {
  getFile("./json/resume.json").then(items => {
    BuildExperence(items["work"]),
      //BuildSkills(items["skills"]),
      renderSkillsLists(items["skills"])
      BuildHeader(items["basics"]),
      BuildEdu(items["education"]),
      BuildBasic(items["basics"])
  })
}

function BuildBasic(basicItem) {
  const template = item => `
   <div class="card text-white gradient-card">
    <img class="card-img-top" src="img/original/${item.picture}" alt="me">
    <div class="card-body">
      ${item.summary}
      <ul class="list-group custom-transparent-list text-white mt-2">
        <li class="list-group-item d-flex justify-content-between align-items-start  custom-transparent-item">
          <div class="ms-2 me-auto">
            <div class="fw-bold"><a href="tel:${item.phone}">${item.phone}</a></div>
            Cellular
          </div>
          <i class="fa-solid fa-2x fa-phone"></i>      
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start  custom-transparent-item">
        <div class="ms-2 me-auto">
          <div class="fw-bold"><a href="mailto:${item.email}">${item.email}</a></div>
          personal
        </div>
        <i class="fa-solid fa-2x fa-envelope"></i>      
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start  custom-transparent-item">
        <div class="ms-2 me-auto">
          <div class="fw-bold">${item.region}</div>
          region I live in
        </div>
        <i class="fa-solid fa-2x fa-house"></i>      
        </li>
             ${buildprofiles(item.profiles)}
      </ul>
    <div>
  </div>`
  let response = template(basicItem)
  document.getElementById("BasicItems").innerHTML = response
}

function buildprofiles(listItems) {
  let str = []
  const template = item => `
  <li class="list-group-item d-flex justify-content-between align-items-start  custom-transparent-item">
    <div class="ms-2 me-auto">
      <div class="fw-bold"><a href="${item.url}" target="_blank">@${item.username}</a></div>
      ${item.network}
    </div>
    <i class="${socialMediaIcon(item.network)} fa-2x"></i>      
  </li>`
  listItems.forEach(element => {
    str.push(template(element))
  })
  return str.join("")
}

function BuildHeader(basicItem) {
  var template = basicItem => `
  <div class="lh-100"><h1 class="mb-0 text-white lh-100 display-1"> ${basicItem.name}</h1><p>
  ${basicItem.headline}</p></div>`
  document.getElementById("HeaderItem").innerHTML = template(basicItem)
}

function BuildEdu(eduItems) {
  let strings = []
  const temp = data => `
  <div>
    <img src="img/original/${data.institution}.webp" width="32" height="32" alt="${data.institution}" class="left"><br />
    <span class="lead">${data.area}</span><br/>
    <span class="text-muted">${data.studyType}</span><br/>
    <span class="lead">${data.institution}</span><br/>
    <span class="text-muted">${parseWorkDate(data.startDate)} - ${parseWorkDate(data.endDate)}</span>
  </div>`
  eduItems.forEach(edu => { strings.push(temp(edu)) })
  document.getElementById("EduItems").insertAdjacentHTML('beforeend', strings.join(""))
}

// Function to render the skills lists
function renderSkillsLists(skills) {
  const topSkillsContainer = document.getElementById('SkillItems');
  const otherSkillsContainer = document.getElementById('otherSkillsList');

  // Create the HTML for top skills list group
  const topSkillsHtml = skills.slice(0, 4).map(skill => `
    <li class="list-group-item custom-transparent-item">
      <h3 class="h5">${skill.name}</h3>
      <div class="custom-progress" id="customProgressBar">
      <div class="progress-bar" style="width: ${getProgressBarWidth(skill.rating)}%"></div>
      <div class="progress-dot" style="left: calc(${getProgressBarWidth(skill.rating)}% - 5px"></div>
    </div>

      </li>
  `).join('');

  // Append the top skills list to the container
  topSkillsContainer.innerHTML = topSkillsHtml;

  // Create the HTML for other skills using the provided template
  const otherSkillsHtml = skills.slice(4).map(skill => `
    
  <span class="badge line text-white custom-pill"> ${skill.name}</span>
    
  `).join('');

  // Append the other skills list to the container
  otherSkillsContainer.innerHTML = `
    <h4 class="card-title">Other Skills</h4>
    ${otherSkillsHtml}
  `;
}

function getProgressBarWidth(rating) {
  return rating * 20 || 50;
}


function BuildSkills(skillsItems) {
  let listItems = []
  const temp = d => `
<li class="list-group-item d-flex justify-content-between align-items-center">
<!-- <div class="progress">
    <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${d.name}</div>
  </div> -->
<div><img src="/img/original/${ImageHelper(d.name)}.webp" height="16" width="16" alt="${d.name} image" />${d.name}</div>
<span class="badge badge-dark badge-pill" title="${d.level} [${d.yearsOfExperience} years experence]">${d.level}</span>
</li>`
  skillsItems.forEach(element => {
    listItems.push(temp(element))
  });
  document.getElementById("SkillItems").innerHTML = listItems.join("")
}

function listBind(ObjectTag, SourceTag, ObjectsToBind) {
  let source = document.getElementById(SourceTag).innerHTML
  let temp = Handlebars.compile(source)
  let MainContainer = document.getElementById(ObjectTag)
  if (ObjectsToBind != null) {
    ObjectsToBind.forEach((item) => {
      let html = temp(item)
      MainContainer.insertAdjacentHTML('beforeend', html)
    })
  }
}

function BuildExperence(experenceItems) {
  let items = []
  let temp = d => `
  <div class="media text-muted pt-3 lh-125 border-bottom border-gray">
  <div class="container">
  <div class="row">
    <div class="col-md-9">
    <h2 class="h4">
    ${d.position} @ <span class="text-muted">${d.company}</span></h2>
    </div>
    <div class="col-md-3 text-right">
    ${d.location}
    <img class="" width="32" height="32" src="img/original/${d.company}.webp" alt="${d.company}" />
    </div>
  </div>
  <div class="row">
    <span class="lead"> <span class="text-primary">${parseWorkDate(d.startDate)} - ${parseWorkDate(d.endDate)}</span> ${calculateDuration(d.start, d.end)}
  </div>
  <div class="row">
  <div class="col">
  <p class="media-body pb-3 mb-0"> ${d.summary}
  <ul>${generateHighlightlist(d.highlights)}</ul>
  </p>
  </div>
  </div>
</div>   
  </div>
  `
  experenceItems.forEach(ex => {
    items.push(temp(ex))
  })
  document.getElementById("ExperenceItems").insertAdjacentHTML('beforeend', items.join(""))
  //document.getElementById("ExperenceItems").innerHTML = items.join("")
}

function calculateDuration(start, end) {
  const today = new Date();
  const startDate = new Date(start.year, start.month - 1);
  console.log(end)
  const endDate = end.year ? new Date(end.year, end.month - 1) : today;

  let yearDiff = endDate.getFullYear() - startDate.getFullYear();
  let monthDiff = endDate.getMonth() - startDate.getMonth();

  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }

  if (yearDiff === 0) {
    return `${monthDiff} ${monthDiff === 1 ? 'month' : 'months'}`;
  } else {
    const yearLabel = yearDiff === 1 ? 'year' : 'years';
    const monthLabel = monthDiff === 1 ? 'month' : 'months';
    if (monthDiff === 0) {
      return `${yearDiff} ${yearLabel}`;
    } else {
      return `${yearDiff} ${yearLabel} ${monthDiff} ${monthLabel}`;
    }
  }
}

function generateHighlightlist(highlights) {
  let temp = d => `<li>${d}</li>`
  let response = []
  highlights.forEach(highlight => {
    response.push(temp(highlight))
  })
  return response.join("")
}

function socialMediaIcon(media) {
  switch (media) {
    case "GitHub": return "fab fa-github-square";
    case "LinkedIn": return "fab fa-linkedin";
    case "Facebook": return "fab fa-facebook-square";
    default: return "far fa-user";
  }
}

function ImageHelper(media) {
  let lType = media.toLowerCase();
  if (lType == "c#") return "csharp"
  if (lType == "vb.net") return "vb"
  if (lType == "asp.net") return "ASP"
  if (lType == "python") return "python"
  if (lType.indexOf("scrum") > 0) return "scrum"
  if (lType.indexOf("jquery") > 0) return "javascript"
  if (lType.indexOf("sql") > 0) return "db"
  if (lType.indexOf("cognitive") > 0) return "bot"
  if (lType.indexOf("bot") > 0) return "bot"
  return "check";

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

function parseWorkDate(strDate) {
  if (strDate.length > 0) {
    let S = strDate.split("-");
    return month[parseInt(S[1])] + " " + S[0];
  } else {
    return "Present";
  }
}
generateResume()
