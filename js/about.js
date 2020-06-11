function BindPage(){   
let I = JSON.parse(getFile("./json/about.json"));

$("#welcome").text(I["welcome"]);

I["Experence"].forEach(element => {$("#eTemp").tmpl(element).appendTo($("#eContainer"));});
I["Work"].forEach(e => {$("#tmpWork").tmpl(e).appendTo($("#work"));});
I["highlights"].forEach(e =>{$("#tmpHighlights").tmpl(e).appendTo($("#highlights"))});
I["Hobbies"].forEach(e=>{$("#tmpLi").tmpl(e).appendTo($("#interests"));});
I["volunteer"].forEach(e=>{$("#tmpLi").tmpl(e).appendTo($("#volunteer"));});
}
function GetPercent(OneToFive){switch (OneToFive){case 5: return 95;case 4: return 80;case 3: return 60;case 2: return 40;default: return 20;}}
function GetName(OneToFive){switch (OneToFive){case 5: return "Expert"; case 4: return "Advanced"; case 3: return "Intermediate"; case 2: return "Beginner"; default: return "New";}}

    BindPage();




    function DynamicProgress()
{
  $('.progress-bar').each( function(i){
  var bottom_of_object = $(this).offset().top + $(this).outerHeight();
  var bottom_of_window = $(window).scrollTop() + $(window).height();  
  if( bottom_of_window > bottom_of_object ){ 
    $(this).animate({
        width: $(this).attr("per")
    }, 750);
    
    $(this).addClass("progress-barAnimate");
    }
  });
}

    $(document).ready(function() {
        DynamicProgress();    
        /* Every time the window is scrolled ... */
        $(window).scroll( function(){
            DynamicProgress();
        });
        
      });