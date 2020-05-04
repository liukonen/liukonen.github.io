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
let main = $("#SkillItems");
let temp = $("#skillsTemp");
skillsItems.forEach(function (skill){
main.append(temp.tmpl(skill));

});


  //let parent = document.createElement("ul");
  //parent.setAttribute("class", "list-group");
  //skillsItems.forEach(function(skill){
  //  let li = document.createElement("li");
  //  li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center")
  //  li.innerHTML ='<div>'
  //                + getImage(skill.name, skill.rating)
  //                + " "
  //                + skill.name + '</div> '
  //                + '<span class="badge badge-dark badge-pill" title="'
  //                + skill.level
  //                + '['
  //                + skill.yearsOfExperience
  //                + ' years experence]">'
  //                + skill.rating
  //                + '</span>';

  //                parent.appendChild(li);
  //});
  //$("#SkillItems").append(parent);
}




function getImg(imgUrl){
  let lType = imgUrl.toLowerCase();
  if (lType == "c#"){return "csharp";}
  if (lType == "vb.net"){return "vb";}
  if (lType == "asp.net"){return "ASP";}
  if (lType == "python"){return "python";}
  if (lType.indexOf("scrum") > 0){return "scrum";}
  if (lType.indexOf("jquery")> 0){return "javascript";}
  if (lType.indexOf("sql") > 0){return "db";}
  if (lType.indexOf("cognitive") > 0){ return "bot";}
  if (lType.indexOf("bot") > 0){ return "bot";}
  return "check";
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
