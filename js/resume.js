var month = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function generateResume() {

   getFile("./json/resume.json").then(items =>{

  BuildExperence(items["work"]),
    BuildSkills(items["skills"]),
    BuildHeader(items["basics"]),
    BuildEdu(items["education"]),
    BuildBasic(items["basics"]),
    document.getElementById("summaryItem").innerText = items["basics"]["summary"]
  })
}


function BuildBasic(basicItem) {
  basicBind("BasicItems", "basicsTemp", basicItem)
}

function buildBasicSM(item) {
  return $("#basicsMediaTemp").tmpl(item);
}


function BuildHeader(basicItem) {
  basicBind("HeaderItem", "headerTemp", basicItem)
}

function BuildEdu(eduItems) {
  listBind('EduItems', 'eduTemp', eduItems)
}
function BuildSkills(skillsItems) {
  listBind('SkillItems', 'skillsTemp', skillsItems)
}

function basicBind(ObjectTag, SourceTag, ObjectToBind) {
  let objSource = document.getElementById(ObjectTag)
  let source = document.getElementById(SourceTag).innerHTML
  let template = Handlebars.compile(source)
  objSource.innerHTML = template(ObjectToBind)
}

function listBind(ObjectTag, SourceTag, ObjectsToBind){
  let source = document.getElementById(SourceTag).innerHTML
  let temp = Handlebars.compile(source)
  let MainContainer = document.getElementById(ObjectTag)
  if (ObjectsToBind != null){
  ObjectsToBind.forEach((item) => {
    let html = temp(item)
    MainContainer.insertAdjacentHTML('beforeend', html)
  })}
}

function BuildExperence(experenceItems) {
  listBind('ExperenceItems', 'experenceTemp', experenceItems)
}


Handlebars.registerHelper("socialMediaIcon", (media) => {
  switch (media) {
    case "GitHub": return "fab fa-github-square";
    case "LinkedIn": return "fab fa-linkedin";
    case "Facebook": return "fab fa-facebook-square";
    default: return "far fa-user";
  }
})

Handlebars.registerHelper("ImageHelper", (media) =>{
  let lType = media.toLowerCase();
  if (lType == "c#")  return "csharp" 
  if (lType == "vb.net")  return "vb" 
  if (lType == "asp.net")  return "ASP" 
  if (lType == "python")  return "python" 
  if (lType.indexOf("scrum") > 0)  return "scrum" 
  if (lType.indexOf("jquery") > 0)  return "javascript" 
  if (lType.indexOf("sql") > 0)  return "db" 
  if (lType.indexOf("cognitive") > 0)  return "bot" 
  if (lType.indexOf("bot") > 0)  return "bot" 
  return "check";
})

Handlebars.registerHelper("parseWorkDate", function (strDate) {
  //function parseWorkDate(strDate){
  if (strDate.length > 0) {
    let S = strDate.split("-");
    return month[parseInt(S[1])] + " " + S[0];
  } else {
    return "Present";
  }
})

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
generateResume();
