var month = ["", "Jan","Feb","Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function generateResume(){

let items = JSON.parse(getFile("./resume.json"));

//$.ajax({
//  url:  "./resume.json",
//    dataType: "text",	async: false,
//  error: function(jqXHR, textStatus, error) {window.alert(error);},
//  success: function(data, textStatus, jqXHR) {temp = data;}
//}).then( async function(item){
//let items = JSON.parse(item);
//let arrayOfPromises = [
        BuildExperence(items["work"]),
        BuildSkills(items["skills"]),
        BuildHeader(items["basics"]),
        BuildEdu(items["education"]),
        BuildBasic(items["basics"]),
        $("#summaryItem").text(items["basics"]["summary"])
  //  ];

      console.log(items["basics"]["summary"]);
      //await Promise.all(arrayOfPromises);
//});
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
return 1;
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
return 1;
}
function BuildSkills(skillsItems){
let main = $("#SkillItems");
let temp = $("#skillsTemp");
skillsItems.forEach(function (skill){
main.append(temp.tmpl(skill));

});return 1;
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
  });return 1;
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
