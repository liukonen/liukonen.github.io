var month = ["", "Jan","Feb","Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function generateResume(){

  var items = JSON.parse(getFile("./resume.json"));
BuildExperence(items["work"]);
BuildSkills(items["skills"]);
BuildHeader(items["basics"]);
BuildEdu(items["education"]);
BuildBasic(items["basics"]);
console.log(items["basics"]["summary"]);
$("#summaryItem").text(items["basics"]["summary"]);

}


function getIconSM(name){
switch (name) {
  case "GitHub": return "fab fa-github-square";
    case "LinkedIn": return "fab fa-linkedin";
    case "Facebook": return "fab fa-facebook-square";
  default: return "far fa-user";
}

}

function BuildBasic(basicItem){
let Item = $("#basicsTemp").tmpl(basicItem);
basicItem["profiles"].forEach(function(item){
  Item.find("ul").append(buildBasicSM(item));
});
console.log(Item);
$("#BasicItems").append(Item);
}

function buildBasicSM(item){
return $("#basicsMediaTemp").tmpl(item);
}


function BuildHeader(basicItem){
//let main = ;
//let template = ;
$("#headerTemp").tmpl(basicItem).appendTo($("#HeaderItem"));
}

function BuildEdu(eduItems){
  let main = $("#EduItems");
  let template = $("#eduTemp");
  eduItems.forEach(function(item){
    template.tmpl(item).appendTo(main);
  });

}
function BuildSkills(skillsItems){
  let parent = document.createElement("ul");
  parent.setAttribute("class", "list-group");
  skillsItems.forEach(function(skill){
    let li = document.createElement("li");
    li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center")
    li.innerHTML ='<div>'
                  + getImage(skill.name, skill.rating)
                  + " "
                  + skill.name + '</div> '
                  + '<span class="badge badge-dark badge-pill" title="'
                  + skill.level
                  + '['
                  + skill.yearsOfExperience
                  + ' years experence]">'
                  + skill.rating
                  + '</span>';

                  parent.appendChild(li);
  });
  $("#SkillItems").append(parent);
}


function getImage(type, count){
  let img = '<i class="far fa-check-square"></i>';
  if (type == "C#"){img='<img src="img/csharp.webp" height="16" width="16" />';}
  if (type.indexOf("Scrum")> 0){img='<img src="img/scrum.webp" height="16" width="16" />';}
  if (type.indexOf("Jquery")> 0){img='<i class="fab fa-js"></i>'}
  if (type =="Python") {img='<i class="fab fa-python"></i>';}
  if (type.indexOf("SQL") > 0){img='<i class="fas fa-database"></i>';}
  if (type == "VB.Net"){img='<img src="img/vb.webp" height="16" width="16" />';}
  if (type == "ASP.Net"){img='<img src="img/ASP.webp" height="16" width="16" />';}
  if (type.indexOf("Cognitive") > 0){img='<img src="img/bot.webp" height="16" width="16" />';}
  if (type.indexOf("Bot")> 0){img='<img src="img/bot.webp" height="16" width="16" />';}
  return img;
}


function BuildExperence(experenceItems){
  let MainContainer = $("#ExperenceItems");
  let template = $("#experenceTemp");
  experenceItems.forEach(function(item){
    let response = template.tmpl(item);
    if (item["highlights"].length >=0){
      item["highlights"].forEach(function(item) {
        let li = document.createElement("li");
        li.innerHTML = item;
        response.find("ul").append(li);
        });
      }
    response.appendTo(MainContainer);
  });
}


function parseWorkDate(strDate){
  if (strDate.length > 0){
    let S = strDate.split("-");
    return month[parseInt(S[1])] + " " + S[0];
  } else {
    return "Present";
  }
}

generateResume();
console.log("pre hit");
GenerateDiary();
